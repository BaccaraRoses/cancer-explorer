"""tools/skeptic.py -- the Skeptic pass: a fresh session reviews a phase's diff, code decides.

A gate has two halves. The deterministic half is a verify command. The other
half is judgement -- does this quote support the claim, did the change drop
something a rule requires -- and only a reader can do it. The Skeptic is that
reader, in a fresh session with no stake in the phase passing. Three things
keep it honest, and all three are code in this file rather than instructions
to the model:

  1. It must cite and quote. Every objection names at least one rule (INV-N
     from the rules file), repo file (path or path:line) or URL, and quotes
     verbatim the text it objects to -- from the diff, a cited file or the
     rules. judge drops an objection whose cites do not resolve or whose quote
     is not there, and records why. An invented objection costs the worker a
     loop; an invented citation makes a review look checked when it isn't.
  2. Its verdict is computed. The model's own overall assessment is ignored:
     judge blocks when a surviving objection is at or above --block-at.
  3. It fails closed. A reply that is not the JSON contract is never a pass,
     and a Skeptic run that changed files is caught by `tampered`.

Nothing here names a project: it knows a rules file, a tag pattern and git.

    python tools/skeptic.py rules    [--rules CLAUDE.md]       # list tags; exit 1 on duplicates or gaps
    python tools/skeptic.py snapshot                           # stage everything, print the tree id
    python tools/skeptic.py prompt   --template T --base TREE --phase N --status S --out P
                                     # writes the prompt and the diff; prints "<end tree> <round>"
    python tools/skeptic.py tampered --since TREE              # exit 1 and list paths changed since TREE
    python tools/skeptic.py judge    --base TREE --phase N --round K --result R [--block-at medium]
    python tools/skeptic.py brief    --phase N --round K       # the blocking objections, for the worker
    python tools/skeptic.py kept     --phase N                 # objections the user ruled keep
    python tools/skeptic.py report   --phase N --round K       # writes phase-N-report.md for the user

judge exits 0 pass, 1 block, 2 no valid verdict (the runner retries once, then blocks).
Round numbers continue across re-runs of a phase, so an objection id (P3-R2-1)
names one objection forever. Rulings live in <store>/rulings.txt, one per line:

    P3-R2-1 drop <why>     the objection is wrong; the Skeptic may not raise it again
    P3-R2-1 keep <why>     it stands; the worker must fix it when the phase re-runs
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RULES = "CLAUDE.md"
DEFAULT_STORE = "tools/autophase/skeptic"       # tracked: objections and rulings are the loop's state
DEFAULT_SCRATCH = "tools/autophase/logs"        # ignored: diffs and prompts are derivable
# Written by the runner while a phase or a Skeptic runs: never part of the work under review.
RUNNER_OWNED = ("tools/autophase/runner.log", "tools/autophase/status.json", DEFAULT_STORE)
SEVERITIES = ("low", "medium", "high")
MIN_QUOTE = 8

TAG = re.compile(r"^(?P<indent>\s*)(?:[-*]\s+)?(?P<strike>~~)?\*\*INV-(?P<n>\d+)\*\*")
CITE_INV = re.compile(r"^INV-(\d+)$")
CITE_URL = re.compile(r"^https?://[^\s<>\"]+$")
CITE_PATH = re.compile(r"^(?P<path>[\w./-]+?)(?::(?P<a>\d+)(?:-(?P<b>\d+))?)?$")


# ---------------------------------------------------------------- rules

@dataclass
class Rule:
    n: int
    text: str
    retired: bool
    line: int


def parse_rules(text: str) -> tuple[list[Rule], list[str]]:
    """Every INV-N tag with the text of its bullet, plus problems (duplicates, gaps).

    A rule's text runs from its tag to the end of its bullet: continuation lines
    are indented deeper than the bullet and stop at a blank line, a heading or
    the next bullet.
    """
    lines = text.splitlines()
    rules: list[Rule] = []
    i = 0
    while i < len(lines):
        m = TAG.match(lines[i])
        if not m:
            i += 1
            continue
        indent = len(m.group("indent"))
        body = [lines[i][m.end():].strip()]
        j = i + 1
        while j < len(lines):
            ln = lines[j]
            if not ln.strip() or ln.lstrip().startswith("#") or len(ln) - len(ln.lstrip()) <= indent:
                break
            body.append(ln.strip())
            j += 1
        text = " ".join(b for b in body if b)
        if m.group("strike"):
            text = text.removesuffix("~~").strip()
        rules.append(Rule(int(m.group("n")), text, bool(m.group("strike")), i + 1))
        i = j
    problems = []
    seen: dict[int, int] = {}
    for r in rules:
        if r.n in seen:
            problems.append(f"INV-{r.n} is tagged twice (lines {seen[r.n]} and {r.line})")
        seen.setdefault(r.n, r.line)
    if seen:
        gaps = [n for n in range(1, max(seen) + 1) if n not in seen]
        if gaps:
            problems.append("numbers missing (a rule was deleted or renumbered; strike it through "
                            "instead): " + ", ".join(f"INV-{n}" for n in gaps))
    return rules, problems


def rules_digest(rules: list[Rule]) -> str:
    """Stable hash of the rule texts, for a runner's fingerprint of what judges a phase."""
    blob = "\n".join(f"{r.n}|{int(r.retired)}|{r.text}" for r in sorted(rules, key=lambda r: r.n))
    return hashlib.sha256(blob.encode("utf-8")).hexdigest()[:16]


def write(path: Path, text: str) -> None:
    """LF on every station: Path.write_text turns each newline into CRLF on Windows."""
    path.write_bytes(text.encode("utf-8"))


# ---------------------------------------------------------------- git

def git(*args: str, check: bool = True) -> subprocess.CompletedProcess:
    p = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    if check and p.returncode != 0:
        raise SystemExit(f"git {' '.join(args)} failed: {p.stderr.strip()}")
    return p


def snapshot() -> str:
    """Tree id of the whole working tree as .gitignore sees it. Stages everything
    (the index is the runner's scratch space) and commits nothing."""
    git("add", "-A")
    return git("write-tree").stdout.strip()


def pathspec(exclude: tuple[str, ...]) -> list[str]:
    return ["--", "."] + [f":(exclude){p}" for p in exclude]


def diff_text(base: str, end: str, exclude: tuple[str, ...] = RUNNER_OWNED) -> str:
    return git("diff", "--no-color", "--no-ext-diff", base, end, *pathspec(exclude)).stdout


def changed_lines(diff: str) -> str:
    """Added and removed lines of a diff, markers stripped: text a quote may come from."""
    return "\n".join(ln[1:] for ln in diff.splitlines()
                     if ln.startswith(("+", "-")) and not ln.startswith(("+++", "---")))


_LOOSE = str.maketrans({"\u2018": "'", "\u2019": "'", "\u201c": '"', "\u201d": '"',
                        "\u2013": "-", "\u2014": "-", "*": None, "`": None})


def loose(s: str) -> str:
    """For locating a quote: whitespace collapsed, markdown emphasis and code ticks
    dropped, curly quotes and dashes straightened. Finding the place is the point;
    a quote still has to be the text that is there."""
    return " ".join(s.translate(_LOOSE).split())


# ---------------------------------------------------------------- judging

def load_result(raw: str) -> dict | None:
    """The Skeptic's JSON object: the whole reply, a fenced block, or the outermost braces."""
    raw = raw.strip()
    candidates = [raw] + re.findall(r"```(?:json)?\s*(\{.*?\})\s*```", raw, flags=re.S)
    first, last = raw.find("{"), raw.rfind("}")
    if 0 <= first < last:
        candidates.append(raw[first:last + 1])
    for c in candidates:
        try:
            obj = json.loads(c)
        except ValueError:
            continue
        if isinstance(obj, dict) and isinstance(obj.get("findings"), list):
            return obj
    return None


def fingerprint_of(f: dict) -> str:
    cites = sorted(str(c).strip() for c in f.get("cites") or [])
    blob = loose(str(f.get("quote") or "")) + "|" + "|".join(cites)
    return hashlib.sha256(blob.encode("utf-8")).hexdigest()[:12]


def resolve_cite(cite: str, active: set[int], retired: set[int], base: str) -> tuple[bool, str, Path | None]:
    """(valid, why not, a local file to look for the quote in)."""
    cite = cite.strip()
    m = CITE_INV.match(cite)
    if m:
        n = int(m.group(1))
        if n in active:
            return True, "", None
        return False, (f"{cite} is retired" if n in retired else f"{cite} is not a rule"), None
    if CITE_URL.match(cite):
        return True, "", None
    m = CITE_PATH.match(cite.replace("\\", "/"))
    if not m or not ("/" in m.group("path") or "." in m.group("path")):
        return False, f"{cite!r} is not an INV-N, a repo path or a URL", None
    rel = m.group("path")
    p = ROOT / rel
    if not p.is_file():
        if git("cat-file", "-e", f"{base}:{rel}", check=False).returncode == 0:
            return True, "", None          # deleted during the phase; the diff holds its text
        return False, f"{cite}: no such file", None
    if m.group("a"):
        n_lines = len(p.read_text(encoding="utf-8", errors="replace").splitlines())
        lo, hi = int(m.group("a")), int(m.group("b") or m.group("a"))
        if lo < 1 or hi < lo or hi > n_lines:
            return False, f"{cite}: the file has {n_lines} lines", None
    return True, "", p


def judge(result_raw: str, *, rules: list[Rule], rules_text: str, diff: str, base: str,
          phase: int, rnd: int, block_at: str, dropped_by_user: dict[str, str]) -> dict:
    """Decide one round. `dropped_by_user` maps fingerprint -> the id the user ruled drop."""
    obj = load_result(result_raw)
    if obj is None:
        return {"phase": phase, "round": rnd, "verdict": "invalid", "block_at": block_at,
                "why": "the reply is not a JSON object with a findings list",
                "blocking": [], "valid": [], "dropped": []}
    active = {r.n for r in rules if not r.retired}
    retired = {r.n for r in rules if r.retired}
    haystacks = [loose(changed_lines(diff)), loose(rules_text)]
    valid, dropped = [], []
    for k, f in enumerate(obj["findings"], 1):
        if not isinstance(f, dict):
            dropped.append({"id": f"P{phase}-R{rnd}-{k}", "why": "not an object", "finding": f})
            continue
        f = {**f, "id": f"P{phase}-R{rnd}-{k}"}
        f["fp"] = fingerprint_of(f)
        cites = [str(c) for c in (f.get("cites") or [])]
        quote = loose(str(f.get("quote") or ""))
        sev = str(f.get("severity") or "").lower()
        if sev not in SEVERITIES:
            f["severity_note"] = f"severity {sev or 'missing'!r} read as high"
            sev = "high"
        f["severity"] = sev
        if f["fp"] in dropped_by_user:
            dropped.append({**f, "why": f"the user ruled {dropped_by_user[f['fp']]} drop"})
            continue
        if not cites:
            dropped.append({**f, "why": "cites nothing"})
            continue
        good, bad, files = [], [], []
        for c in cites:
            ok, why, path = resolve_cite(c, active, retired, base)
            if ok:
                good.append(c)
                if path:
                    files.append(path)
            else:
                bad.append(why)
        if not good:
            dropped.append({**f, "why": "no citation resolves: " + "; ".join(bad)})
            continue
        if len(quote) < MIN_QUOTE:
            dropped.append({**f, "why": f"the quote is under {MIN_QUOTE} characters, which anchors nothing"})
            continue
        found = any(quote in h for h in haystacks) or any(
            quote in loose(p.read_text(encoding="utf-8", errors="replace")) for p in files)
        if not found:
            dropped.append({**f, "why": "the quote is not in the diff, a cited file or the rules"})
            continue
        if bad:
            f["unresolved_cites"] = bad
        valid.append(f)
    bar = SEVERITIES.index(block_at)
    blocking = [f["id"] for f in valid if SEVERITIES.index(f["severity"]) >= bar]
    return {"phase": phase, "round": rnd, "verdict": "block" if blocking else "pass",
            "block_at": block_at, "blocking": blocking, "valid": valid, "dropped": dropped,
            "model_assessment": obj.get("overall_assessment")}


# ---------------------------------------------------------------- store

class Store:
    def __init__(self, rel: str):
        self.dir = ROOT / rel
        self.dir.mkdir(parents=True, exist_ok=True)

    def round_file(self, phase: int, rnd: int) -> Path:
        return self.dir / f"phase-{phase}-round-{rnd}.json"

    def rounds(self, phase: int | None = None) -> list[dict]:
        out = []
        for f in self.dir.glob("phase-*-round-*.json"):
            m = re.match(r"phase-(\d+)-round-(\d+)\.json$", f.name)
            if m and (phase is None or int(m.group(1)) == phase):
                out.append(json.loads(f.read_text(encoding="utf-8")))
        return sorted(out, key=lambda r: (r["phase"], r["round"]))

    def next_round(self, phase: int) -> int:
        return max((r["round"] for r in self.rounds(phase)), default=0) + 1

    def objections(self, phase: int | None = None) -> dict[str, dict]:
        return {o["id"]: o for r in self.rounds(phase) for o in r.get("valid", [])}

    def rulings(self) -> dict[str, tuple[str, str]]:
        out = {}
        f = self.dir / "rulings.txt"
        if f.is_file():
            for ln in f.read_text(encoding="utf-8").splitlines():
                m = re.match(r"^\s*(P\d+-R\d+-\d+)\s+(drop|keep)\b\s*(.*)$", ln, flags=re.I)
                if m:
                    out[m.group(1)] = (m.group(2).lower(), m.group(3).strip())
        return out

    def ruled(self, phase: int, kind: str) -> list[tuple[dict, str]]:
        objs = self.objections(phase)
        return [(objs[i], why) for i, (r, why) in sorted(self.rulings().items())
                if r == kind and i in objs]


def describe(f: dict) -> str:
    return (f"[{f['id']}] {f['severity'].upper()} ({f.get('question', 'general')}) cites "
            f"{', '.join(map(str, f.get('cites') or []))}\n"
            f"    quote:   {f.get('quote', '')}\n"
            f"    concern: {f.get('concern', '')}")


# ---------------------------------------------------------------- commands

def cmd_rules(a) -> int:
    rules, problems = parse_rules((ROOT / a.rules).read_text(encoding="utf-8"))
    active = [r for r in rules if not r.retired]
    print(f"{len(rules)} rules tagged ({len(active)} active, {len(rules) - len(active)} retired); "
          f"digest {rules_digest(rules)}")
    for p in problems:
        print(f"  PROBLEM {p}")
    if not rules:
        print(f"  PROBLEM no **INV-N** tags in {a.rules}")
    return 1 if problems or not rules else 0


def cmd_snapshot(a) -> int:
    print(snapshot())
    return 0


def cmd_tampered(a) -> int:
    now = snapshot()
    changed = git("diff", "--name-only", a.since, now, *pathspec(RUNNER_OWNED)).stdout.split()
    for c in changed:
        print(c)
    return 1 if changed else 0


def cmd_prompt(a) -> int:
    rules_text = (ROOT / a.rules).read_text(encoding="utf-8")
    rules, _ = parse_rules(rules_text)
    store = Store(a.store)
    rnd = store.next_round(a.phase)
    end = snapshot()
    scratch = ROOT / a.scratch
    scratch.mkdir(parents=True, exist_ok=True)
    diff_file = scratch / f"skeptic-phase-{a.phase}-round-{rnd}.diff"
    write(diff_file, diff_text(a.base, end))
    stat = git("diff", "--stat=160", a.base, end, *pathspec(RUNNER_OWNED)).stdout.rstrip()
    prior = list(store.objections(a.phase).values())
    gate = "(the session wrote no gate text)"
    if a.status and Path(a.status).is_file():
        st = json.loads(Path(a.status).read_text(encoding="utf-8-sig"))
        gate = " ".join(str(st.get(k) or "") for k in ("gate", "reason")).strip() or gate
    fill = {
        "{{PHASE}}": str(a.phase),
        "{{ROUND}}": str(rnd),
        "{{GATE}}": gate,
        "{{RULES_FILE}}": a.rules,
        "{{RULES}}": "\n".join(f"- INV-{r.n}{' (RETIRED: do not cite)' if r.retired else ''}: {r.text}"
                               for r in rules),
        "{{DIFF_FILE}}": diff_file.relative_to(ROOT).as_posix(),
        "{{DIFF_STAT}}": stat or "(no changes)",
        "{{BASE}}": a.base,
        "{{END}}": end,
        "{{PRIOR}}": "\n\n".join(describe(f) for f in prior) or "(none: this is the first round)",
        "{{DROPPED}}": "\n\n".join(describe(f) + f"\n    ruling:  drop -- {why}"
                                   for f, why in store.ruled(a.phase, "drop")) or "(none)",
    }
    text = (ROOT / a.template).read_text(encoding="utf-8")
    for k, v in fill.items():
        text = text.replace(k, v)
    write(Path(a.out), text)
    print(end, rnd)
    return 0


def cmd_judge(a) -> int:
    rules_text = (ROOT / a.rules).read_text(encoding="utf-8")
    rules, _ = parse_rules(rules_text)
    store = Store(a.store)
    dropped_by_user = {f["fp"]: f["id"] for f, _ in store.ruled(a.phase, "drop")}
    res = judge(Path(a.result).read_text(encoding="utf-8", errors="replace"), rules=rules,
                rules_text=rules_text, diff=diff_text(a.base, a.end or snapshot()), base=a.base,
                phase=a.phase, rnd=a.round, block_at=a.block_at, dropped_by_user=dropped_by_user)
    write(store.round_file(a.phase, a.round), json.dumps(res, indent=2, ensure_ascii=False) + "\n")
    print(f"skeptic: {res['verdict'].upper()} -- {len(res['valid'])} cited objection(s), "
          f"{len(res['blocking'])} at or above {a.block_at}, {len(res['dropped'])} dropped"
          + (f" ({res['why']})" if res["verdict"] == "invalid" else ""))
    return {"pass": 0, "block": 1}.get(res["verdict"], 2)


def _round(a) -> dict:
    return json.loads(Store(a.store).round_file(a.phase, a.round).read_text(encoding="utf-8"))


def cmd_brief(a) -> int:
    res = _round(a)
    ids = set(res["blocking"])
    print("\n\n".join(describe(f) for f in res["valid"] if f["id"] in ids))
    return 0


def cmd_kept(a) -> int:
    kept = Store(a.store).ruled(a.phase, "keep")
    print("\n\n".join(describe(f) + (f"\n    user:    {why}" if why else "") for f, why in kept))
    return 0


def cmd_report(a) -> int:
    res = _round(a)
    store = Store(a.store)
    ids = set(res["blocking"])
    rel = store.dir.relative_to(ROOT).as_posix()
    lines = [f"# Skeptic: phase {res['phase']} blocked after round {res['round']}", "",
             f"Each objection below cites a rule, file or URL that resolves, quotes text that is really there, and "
             f"is at or above `{res['block_at']}`. Rule on each in `{rel}/rulings.txt`, one line per id:", "",
             "    <id> drop <why>    the objection is wrong; the Skeptic may not raise it again",
             "    <id> keep <why>    it stands; the worker fixes it when the phase re-runs", "",
             "Then re-launch the runner; it re-runs this phase.", ""]
    for f in res["valid"]:
        if f["id"] in ids:
            lines += [f"## {f['id']} — {f['severity']} ({f.get('question', 'general')})", "",
                      f"- **Cites:** {', '.join(map(str, f.get('cites') or []))}",
                      f"- **Quote:** {f.get('quote', '')}",
                      f"- **Concern:** {f.get('concern', '')}", ""]
    below = [f for f in res["valid"] if f["id"] not in ids]
    if below:
        lines += ["## Below the bar (recorded, not blocking)", ""]
        lines += [f"- {f['id']} ({f['severity']}): {f.get('concern', '')}" for f in below] + [""]
    if res["dropped"]:
        lines += ["## Dropped by the checks", ""]
        lines += [f"- {d.get('id', '?')}: {d['why']}" for d in res["dropped"]] + [""]
    out = store.dir / f"phase-{res['phase']}-report.md"
    write(out, "\n".join(lines) + "\n")
    print(out.relative_to(ROOT).as_posix())
    return 0


def main(argv: list[str] | None = None) -> int:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)

    def cmd(name, *, rules=False, base=False, phase=False, rnd=False):
        p = sub.add_parser(name)
        p.add_argument("--store", default=DEFAULT_STORE)
        if rules:
            p.add_argument("--rules", default=DEFAULT_RULES)
        if base:
            p.add_argument("--base", required=True, help="tree id from `snapshot` at phase start")
        if phase:
            p.add_argument("--phase", type=int, required=True)
        if rnd:
            p.add_argument("--round", type=int, required=True)
        return p

    cmd("rules", rules=True)
    cmd("snapshot")
    cmd("tampered").add_argument("--since", required=True)
    p = cmd("prompt", rules=True, base=True, phase=True)
    p.add_argument("--template", required=True)
    p.add_argument("--status", help="status.json the session wrote; its gate and reason are quoted")
    p.add_argument("--scratch", default=DEFAULT_SCRATCH)
    p.add_argument("--out", required=True)
    p = cmd("judge", rules=True, base=True, phase=True, rnd=True)
    p.add_argument("--end", help="tree the review saw (from `prompt`); default: snapshot now")
    p.add_argument("--result", required=True)
    p.add_argument("--block-at", choices=SEVERITIES, default="medium")
    cmd("brief", phase=True, rnd=True)
    cmd("kept", phase=True)
    cmd("report", phase=True, rnd=True)
    a = ap.parse_args(argv)
    return {"rules": cmd_rules, "snapshot": cmd_snapshot, "tampered": cmd_tampered, "prompt": cmd_prompt,
            "judge": cmd_judge, "brief": cmd_brief, "kept": cmd_kept, "report": cmd_report}[a.cmd](a)


if __name__ == "__main__":
    raise SystemExit(main())
