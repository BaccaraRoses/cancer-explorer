"""tools/verify.py -- every deterministic check in the project, one exit code.

    python tools/verify.py                 # all cancers
    python tools/verify.py --cancer lung   # one (repeatable); shared checks still run
    python tools/verify.py --json out.json # also write a machine-readable summary

Run it with the pipeline's interpreter; every check below is started with the
same one. Exit 0 only when every check passes.

  tests            pipeline/tests (the gate's own unit tests) and tools/tests (the
                   Skeptic's verdict code, and one planted defect per rule of
                   sitescan, publish and render)
  audit:<cancer>   run.py --cancer X audit -- computed facts against the curated
                   dataset, judged by cxp/gate.py. Offline: reads facts/, and
                   rewrites reports/ exactly as a manual `audit` would.
  sync:<cancer>    run.py --cancer X sync --check -- only where cancers.py
                   declares a landscape markdown
  refs:<cancer>    run.py --cancer X references -- every PMID in references[]
                   resolved in Europe PMC and checked against its entry's
                   author, title, journal, year and url. Network only for a
                   PMID not yet in pipeline/cache/; a lookup that fails fails.
  validator        js/validate.js over every dataset index.html loads, with the
                   overlays attached as the viewer attaches them (tools/validate.hta
                   under mshta). Fails on any error, any warning, or a numeric
                   claim without a source (checkable below 100%).
  chartaudit       tools/chartaudit.py -- breast's charts re-derived from the data
  invariants       the **INV-N** tags in CLAUDE.md: unique, no gaps (tools/skeptic.py
                   parses them; the Skeptic may cite only these)
  pysyntax         every .py file under pipeline/ and tools/ parses. A JS comment
                   outside a string is a syntax error, and a module no test imports
                   would otherwise carry one unseen.
  sitescan         tools/sitescan.py over the four site paths: no identity string
                   (read from ~/.claude/CLAUDE.md, never stored here), no value from
                   pipeline/.env, no local path, host, e-mail, credential shape,
                   file that must not ship, or image metadata. Run it on a staged
                   copy too: `python tools/sitescan.py <folder>`.
  render           tools/rendercheck.py -- the site in headless Chrome, Chromium or
                   Edge (tools/cdp.py, stdlib only): no sideways scroll, no control
                   cut off, off-screen or overlapping, the page end clear of the
                   phone's lens bar, at 320/393/800/1400px over every cancer, lens,
                   view and classification; a search drawn from each cancer's data
                   finds each kind and opens it; no hover tip left after a tap; in
                   the Targets lens every target has a button, a tap on a button,
                   dot or table row brings its card on screen and the way back
                   returns, and a desktop click does not move the page; no
                   uncaught exception. Fails when no such browser is found.
  audits           every tools/audits/*.py (not _*.py helpers) exits 0. Each one
                   re-derives figures the site prints by its own code -- stdlib
                   only, never cxp -- and compares them with data/. A script named
                   <cancer>_*.py runs only when that cancer is checked. Network
                   only on a cache miss (tools/audits/cache/, git-ignored).

This is what the autophase runner runs after a session reports a phase done,
so a phase's gate is decided here rather than by the session that did the work.
`render` sees what is cut off, hidden or dead in a rendered page, not whether
it reads right; looking at the page stays with the session.

    python tools/verify.py --fingerprint out.json

writes hashes of the rules instead of running anything: GUARD (the pass bar
itself -- this file, the gate, the harness, the tests, every audit waiver, the
Skeptic's code and prompt, the runner and its config, the text of every INV
rule, and every audit script committed at HEAD) and CHECKERS (code the checks
run on). The runner takes one at the start of a phase and one at the end. A
phase that changed the rules is blocked for the user; a changed checker is
allowed and logged, because fixing a checker bug is real work (phase 7 fixed
audit.py's citation regex). tools/audits/ is append-only: a script a phase adds
is not yet at HEAD and changes nothing (a new check only strengthens the gate),
while editing or deleting a committed one blocks like any other rule change.
"""
from __future__ import annotations

import argparse
import ast
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PIPELINE = ROOT / "pipeline"
sys.path.insert(0, str(PIPELINE))

from cxp import cancers  # noqa: E402

sys.path.insert(0, str(ROOT / "tools"))
import skeptic  # noqa: E402

VALIDATOR_TIMEOUT_S = 180
RENDER_TIMEOUT_S = 600

GUARD = ("tools/verify.py", "tools/validate.hta", "pipeline/cxp/gate.py", "tools/skeptic.py",
         "tools/autophase/skeptic-prompt.md", "tools/autophase/run-phases.ps1",
         "tools/autophase/phase-prompt.md", "tools/autophase/loop.json", "tools/sitescan.py",
         "tools/rendercheck.py", "tools/rendercheck.js")
RULES_FILE = "CLAUDE.md"
SYNTAX_DIRS = ("pipeline", "tools")
SYNTAX_SKIP = {"cache", "__pycache__", "logs"}
CHECKERS = ("pipeline/cxp/audit.py", "pipeline/cxp/refcheck.py", "js/validate.js", "tools/chartaudit.py",
            "tools/cdp.py")
AUDITS_DIR = "tools/audits"
AUDIT_TIMEOUT_S = 900
CXP_IMPORT = re.compile(r"^\s*(?:from|import)\s+cxp\b", re.M)


def committed_digest(root: Path, rel_dir: str) -> str:
    """One hash over the files under rel_dir that HEAD tracks, read from the
    working tree. A file added since HEAD is not in it, so adding one changes
    nothing; editing or deleting a committed one does. Without git (or a HEAD)
    every file there is hashed, so an addition counts as a change: fail closed."""
    p = subprocess.run(["git", "-C", str(root), "ls-tree", "-r", "-z", "--name-only", "HEAD", "--", rel_dir],
                       capture_output=True)
    if p.returncode == 0:
        names = sorted(n for n in p.stdout.decode("utf-8").split("\0") if n)
    else:
        names = sorted(q.relative_to(root).as_posix() for q in (root / rel_dir).rglob("*")
                       if q.is_file() and not SYNTAX_SKIP & set(q.relative_to(root).parts))
    h = hashlib.sha256()
    for name in names:
        f = root / name
        h.update(name.encode("utf-8") + b"\0" + (f.read_bytes() if f.is_file() else b"<absent>") + b"\0")
    return h.hexdigest()[:16]


def fingerprint() -> dict:
    def sha(data: bytes) -> str:
        return hashlib.sha256(data).hexdigest()[:16]
    guard = {rel: sha((ROOT / rel).read_bytes()) if (ROOT / rel).is_file() else "absent" for rel in GUARD}
    for rel in sorted((ROOT / "tools" / "autophase" / "plans").glob("*.md")):
        guard[rel.relative_to(ROOT).as_posix()] = sha(rel.read_bytes())
    for tests in (PIPELINE / "tests", ROOT / "tools" / "tests"):
        guard.update({p.relative_to(ROOT).as_posix(): sha(p.read_bytes()) for p in sorted(tests.glob("*.py"))})
    rules, _ = skeptic.parse_rules((ROOT / RULES_FILE).read_text(encoding="utf-8"))
    guard[f"INV rules in {RULES_FILE}"] = skeptic.rules_digest(rules)
    waivers = repr([(cid, cancers.get(cid).audit_waivers) for cid in cancers.ids()])
    guard["audit_waivers in pipeline/cxp/cancers.py"] = sha(waivers.encode("utf-8"))
    guard[f"{AUDITS_DIR} (scripts committed at HEAD)"] = committed_digest(ROOT, AUDITS_DIR)
    return {"guard": guard, "checkers": {rel: sha((ROOT / rel).read_bytes()) for rel in CHECKERS}}


def _run(args: list[str], cwd: Path, timeout: float | None = None) -> tuple[int, str]:
    env = {**os.environ, "PYTHONUNBUFFERED": "1", "PYTHONIOENCODING": "utf-8"}
    p = subprocess.run(args, cwd=cwd, env=env, capture_output=True, text=True,
                       encoding="utf-8", errors="replace", timeout=timeout)
    return p.returncode, (p.stdout + p.stderr)


def check_tests() -> dict:
    ok, summary, details = True, [], []
    for where in (PIPELINE, ROOT / "tools"):
        code, out = _run([sys.executable, "-m", "unittest", "discover", "-s", "tests"], where)
        tail = [ln for ln in out.splitlines() if ln.startswith(("Ran ", "OK", "FAILED"))]
        fails = [ln for ln in out.splitlines() if ln.startswith(("FAIL:", "ERROR:"))]
        ok = ok and code == 0
        summary.append(f"{where.name}/tests: " + (" ".join(tail) or f"exit {code}"))
        details += fails or ([] if code == 0 else out.splitlines()[-15:])
    return {"name": "tests", "ok": ok, "summary": "; ".join(summary), "details": details}


def check_invariants() -> dict:
    if not (ROOT / RULES_FILE).is_file():
        # A published snapshot (tools/publish.py) leaves the rules file out. Absent is
        # a failure, not a pass, but not a crash that stops every check after it.
        return {"name": "invariants", "ok": False, "summary": f"no {RULES_FILE} here",
                "details": [f"{RULES_FILE} holds the INV rules; a published snapshot does not include it"]}
    rules, problems = skeptic.parse_rules((ROOT / RULES_FILE).read_text(encoding="utf-8"))
    if not rules:
        problems = [f"no **INV-N** tags in {RULES_FILE}"]
    active = sum(not r.retired for r in rules)
    return {"name": "invariants", "ok": not problems,
            "summary": f"{len(rules)} rules in {RULES_FILE} ({active} active)", "details": problems}


def check_pysyntax() -> dict:
    bad, n = [], 0
    for top in SYNTAX_DIRS:
        for p in sorted((ROOT / top).rglob("*.py")):
            if SYNTAX_SKIP & set(p.relative_to(ROOT).parts):
                continue
            n += 1
            try:
                ast.parse(p.read_text(encoding="utf-8"), filename=str(p))
            except SyntaxError as e:
                bad.append(f"{p.relative_to(ROOT).as_posix()}:{e.lineno}: {e.msg}: {(e.text or '').strip()[:80]}")
    return {"name": "pysyntax", "ok": not bad,
            "summary": f"{n} Python files parse" if not bad else f"{len(bad)} of {n} files do not parse",
            "details": bad}


def check_audit(cid: str) -> dict:
    code, out = _run([sys.executable, "run.py", "--cancer", cid, "audit"], PIPELINE)
    lines = out.splitlines()
    at = next((i for i, ln in enumerate(lines) if ln.strip().startswith("gate:")), None)
    if at is None:
        # The audit stopped before judging anything (no facts file, a parse failure).
        return {"name": f"audit:{cid}", "ok": False, "summary": f"no gate verdict (exit {code})",
                "details": lines[-12:]}
    gate_lines = [ln.strip() for ln in lines[at:]]
    failing = [ln for ln in gate_lines[1:] if ln.startswith("FAIL")]
    stale = [ln for ln in gate_lines[1:] if ln.startswith("stale")]
    return {"name": f"audit:{cid}", "ok": code == 0, "summary": gate_lines[0],
            "details": failing + stale}


def check_sync(cid: str) -> dict:
    code, out = _run([sys.executable, "run.py", "--cancer", cid, "sync", "--check"], PIPELINE)
    changed = [ln.strip() for ln in out.splitlines()
               if ln.strip() and not ln.strip().endswith("unchanged") and "  " in ln]
    return {"name": f"sync:{cid}", "ok": code == 0,
            "summary": "markdown current" if code == 0 else "markdown has drifted from the facts",
            "details": [] if code == 0 else changed[-12:]}


def check_references(cid: str) -> dict:
    code, out = _run([sys.executable, "run.py", "--cancer", cid, "references"], PIPELINE)
    lines = [ln.rstrip() for ln in out.splitlines()]
    verdict = next((ln.strip() for ln in lines if ln.strip().startswith("references:")), None)
    if verdict is None:
        return {"name": f"refs:{cid}", "ok": False, "summary": f"no verdict (exit {code})",
                "details": lines[-12:]}
    # Each failing row prints as "    VERDICT id (PMID n, data/x.js:line)"
    # followed by one deeper-indented line per problem.
    details = [ln.strip() for ln in lines if ln.startswith("    ")]
    return {"name": f"refs:{cid}", "ok": code == 0,
            "summary": verdict.removeprefix("references:").strip(), "details": details}


def check_sitescan() -> dict:
    code, out = _run([sys.executable, str(ROOT / "tools" / "sitescan.py")], ROOT)
    lines = [ln for ln in out.splitlines() if ln.strip()]
    last = lines[-1] if lines else f"exit {code}"
    return {"name": "sitescan", "ok": code == 0,
            "summary": last.split(" -- ", 1)[-1] if code == 0 else last,
            "details": [] if code == 0 else lines[:-1]}


def check_render(only: set[str] | None) -> dict:
    args = [sys.executable, str(ROOT / "tools" / "rendercheck.py")]
    for cid in sorted(only or ()):
        args += ["--cancer", cid]
    try:
        code, out = _run(args, ROOT, timeout=RENDER_TIMEOUT_S)
    except subprocess.TimeoutExpired:
        return {"name": "render", "ok": False, "summary": f"still running after {RENDER_TIMEOUT_S}s; killed",
                "details": []}
    lines = [ln for ln in out.splitlines() if ln.strip()]
    last = lines[-1] if lines else f"exit {code}"
    return {"name": "render", "ok": code == 0, "summary": last.split(" -- ", 1)[-1],
            "details": [] if code == 0 else lines[:-1]}


def check_chartaudit() -> dict:
    code, out = _run([sys.executable, str(ROOT / "tools" / "chartaudit.py")], ROOT)
    lines = out.splitlines()
    at = next((i for i, ln in enumerate(lines) if ln.strip() == "VERDICT"), None)
    verdict = [ln.strip() for ln in lines[at + 2:]] if at is not None else lines[-12:]
    return {"name": "chartaudit", "ok": code == 0,
            "summary": "no problems found" if code == 0 else f"{len(verdict)} problem(s) (exit {code})",
            "details": [] if code == 0 else verdict}


def audit_scripts(root: Path, only: set[str] | None) -> list[Path]:
    """The scripts the audits check runs: tools/audits/*.py less _*.py helpers,
    and less <cancer>_*.py for a cancer not being checked."""
    out = []
    for p in sorted((root / AUDITS_DIR).glob("*.py")):
        owner = p.stem.split("_", 1)[0]
        if p.name.startswith("_") or (only and owner in cancers.ids() and owner not in only):
            continue
        out.append(p)
    return out


def check_audits(only: set[str] | None, root: Path = ROOT) -> dict:
    details, passed = [], 0
    # An audit that imports the pipeline re-runs the pipeline's reading of the
    # data, and agrees with it for that reason alone. Helpers count too.
    for p in sorted((root / AUDITS_DIR).glob("*.py")):
        if CXP_IMPORT.search(p.read_text(encoding="utf-8")):
            details.append(f"{p.relative_to(root).as_posix()}: imports cxp -- an audit re-derives by its own code")
    scripts = audit_scripts(root, only)
    for p in scripts:
        rel = p.relative_to(root).as_posix()
        if any(d.startswith(rel + ":") for d in details):
            continue
        try:
            code, out = _run([sys.executable, str(p)], root, timeout=AUDIT_TIMEOUT_S)
        except subprocess.TimeoutExpired:
            details.append(f"{rel}: still running after {AUDIT_TIMEOUT_S}s; killed")
            continue
        if code == 0:
            passed += 1
            continue
        details.append(f"{rel}: exit {code}")
        details += ["  " + ln.strip() for ln in out.splitlines() if ln.strip()][-8:]
    if details:
        failing = sum(not d.startswith("  ") for d in details)
        summary = f"{failing} failing in {AUDITS_DIR} ({passed} of {len(scripts)} script(s) pass)"
    else:
        summary = f"{passed} audit script(s) pass" if scripts else "no audit scripts yet"
    return {"name": "audits", "ok": not details, "summary": summary, "details": details}


def _checkable_gaps(checkable: dict | None) -> list[str]:
    gaps = []
    for kind, frac in (checkable or {}).items():
        cited, _, total = str(frac).partition("/")
        if cited != total:
            gaps.append(f"{kind} {frac}")
    return gaps


def check_validator(only: set[str] | None) -> dict:
    name = "validator"
    if os.name != "nt":
        # tools/validate.mjs validates a bare dataset without the overlays the
        # viewer merges, so it is not the same check. Port this before relying
        # on verify.py off Windows.
        return {"name": name, "ok": False, "summary": "no validator runner on this platform",
                "details": ["tools/validate.hta needs Windows mshta; port it (Node + the "
                            "overlay merge) before running verify.py here"]}
    mshta = Path(os.environ.get("SystemRoot", r"C:\Windows")) / "System32" / "mshta.exe"
    fd, out_path = tempfile.mkstemp(prefix="cxvalidate-", suffix=".json")
    os.close(fd)
    os.remove(out_path)
    try:
        proc = subprocess.Popen([str(mshta), str(ROOT / "tools" / "validate.hta")],
                                env={**os.environ, "CX_VALIDATE_OUT": out_path})
        try:
            proc.wait(timeout=VALIDATOR_TIMEOUT_S)
        except subprocess.TimeoutExpired:
            proc.kill()   # this process only -- never mshta by image name
            return {"name": name, "ok": False, "summary": f"hung past {VALIDATOR_TIMEOUT_S}s and was killed",
                    "details": ["an uncaught script error may have raised a modal dialog"]}
        for _ in range(20):
            if os.path.exists(out_path) and os.path.getsize(out_path):
                break
            time.sleep(0.5)
        if not os.path.exists(out_path):
            return {"name": name, "ok": False, "summary": "the harness wrote no result", "details": []}
        with open(out_path, encoding="utf-8-sig") as fh:
            res = json.load(fh)
    finally:
        if os.path.exists(out_path):
            os.remove(out_path)

    _VALIDATOR["result"] = res
    details: list[str] = []
    if res.get("harness_error"):
        details.append(f"harness: {res['harness_error']}")
    details += [f"load: {e}" for e in res.get("load_errors") or []]
    seen = []
    for ds in res.get("datasets") or []:
        if only and ds["id"] not in only:
            continue
        seen.append(ds["id"])
        details += [f"{ds['id']} ERROR {e}" for e in ds["errors"]]
        details += [f"{ds['id']} WARNING {w}" for w in ds["warnings"]]
        details += [f"{ds['id']} unsourced numeric claims: {g}" for g in _checkable_gaps(ds["checkable"])]
    if not seen:
        details.append("no dataset registered")
    return {"name": name, "ok": not details,
            "summary": f"{len(seen)} dataset(s): " + ("0 errors, 0 warnings, every numeric claim sourced"
                                                     if not details else f"{len(details)} problem(s)"),
            "details": details}


_VALIDATOR: dict = {}


def check_parser_parity(ids: list[str]) -> dict:
    """The audit reads data/<cancer>.js with regexes; the viewer loads it as
    JavaScript. When the two disagree on how many nodes and drivers there are,
    the audit is judging a different dataset from the one people see (it read
    breast as 55 nodes, counting biomarker and target rows, until 2026-09-19)."""
    name = "auditparse"
    res = _VALIDATOR.get("result")
    if not res:
        return {"name": name, "ok": False, "summary": "no validator counts to compare against",
                "details": ["the validator check did not produce a result"]}
    from cxp import audit
    counts = {ds["id"]: ds.get("counts") or {} for ds in res.get("datasets") or []}
    details, n = [], 0
    for cid in ids:
        want = counts.get(cid)
        if not want or want.get("nodes") is None:
            details.append(f"{cid}: the validator reported no counts")
            continue
        got = audit.parse_breast_js(ROOT / "data" / f"{cid}.js")["counts"]
        n += 1
        for key in ("nodes", "drivers"):
            if got[key] != want[key]:
                details.append(f"{cid}: audit parser reads {got[key]} {key}, the viewer loads {want[key]}")
    return {"name": name, "ok": not details,
            "summary": f"{n} dataset(s): audit parser and viewer agree on nodes and drivers"
                       if not details else f"{len(details)} disagreement(s)",
            "details": details}


def main() -> int:
    ap = argparse.ArgumentParser(description="Run every deterministic check; exit 0 only if all pass.")
    ap.add_argument("--cancer", action="append", choices=cancers.ids(),
                    help="limit the per-cancer checks (repeatable)")
    ap.add_argument("--json", help="also write the results here")
    ap.add_argument("--fingerprint", metavar="OUT", help="write hashes of the rules to OUT and run nothing")
    args = ap.parse_args()
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    if args.fingerprint:
        Path(args.fingerprint).write_text(json.dumps(fingerprint(), indent=2), encoding="utf-8")
        return 0

    ids = args.cancer or cancers.ids()
    checks = [check_tests, check_invariants, check_pysyntax]
    for cid in ids:
        checks.append(lambda cid=cid: check_audit(cid))
        if cancers.get(cid).landscape_md:
            checks.append(lambda cid=cid: check_sync(cid))
        checks.append(lambda cid=cid: check_references(cid))
    checks.append(lambda: check_validator(set(args.cancer) if args.cancer else None))
    checks.append(lambda: check_parser_parity(ids))
    checks.append(check_chartaudit)
    checks.append(check_sitescan)
    checks.append(lambda: check_render(set(args.cancer) if args.cancer else None))
    checks.append(lambda: check_audits(set(args.cancer) if args.cancer else None))

    results = []
    t0 = time.time()
    for fn in checks:
        r = fn()
        results.append(r)
        print(f"{'PASS' if r['ok'] else 'FAIL'}  {r['name']:18} {r['summary']}")
        for d in r["details"][:25]:
            print(f"        {d}")
        if len(r["details"]) > 25:
            print(f"        ... {len(r['details']) - 25} more")
    ok = all(r["ok"] for r in results)
    failed = [r["name"] for r in results if not r["ok"]]
    print(f"\nverify: {'PASS' if ok else 'FAIL'} -- {len(results) - len(failed)}/{len(results)} checks "
          f"passed in {time.time() - t0:.0f}s" + (f"; failing: {', '.join(failed)}" if failed else ""))
    if args.json:
        Path(args.json).write_text(json.dumps({"ok": ok, "failing": failed, "checks": results}, indent=2),
                                   encoding="utf-8")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
