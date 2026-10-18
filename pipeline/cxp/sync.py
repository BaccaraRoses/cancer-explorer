"""Write computed figures back into the curated markdown in cancer_research/.

This is the only code in the pipeline that writes outside cancer-explorer/, and
it is deliberately narrow. It owns two kinds of region and nothing else:

  1. Marked blocks -- everything between `<!-- pipeline:NAME -->` and
     `<!-- /pipeline:NAME -->`. The block is replaced wholesale, so anything a
     human types inside one is lost on the next run. That is the contract, and
     the marker says so in the document itself.

  2. One anchored row in SOURCES.md, rewritten between a fixed bold label and
     the next table cell.

Prose outside those regions is never touched. A regex that rewrites numbers in
running text cannot tell "70.1% of cases" from "a 70.1% response rate", and
would eventually corrupt a sentence in a way nobody would notice for months --
so `run.py manual` reports that prose instead, and a human edits it.
"""
from __future__ import annotations

import csv
import re
from pathlib import Path
from typing import Any

from .files import write_lf

# Presentation is curated, values are computed. The receptor marks and the
# "also called" wording are editorial choices the registry does not supply, so
# they live here and only the numbers come from facts.
SEER_ROWS = [
    ("HR+/HER2-", "**+**", "**+**", "**−**", "HR+/HER2−", "Luminal A / Luminal B (HER2−)"),
    ("HR+/HER2+", "**+**", "**+**", "**+**", "**Triple positive**", "Luminal B (HER2+), HR+/HER2+"),
    ("HR-/HER2+", "**−**", "**−**", "**+**", "HER2-enriched", "HER2+/HR−"),
    ("HR-/HER2-", "**−**", "**−**", "**−**", "**Triple negative (TNBC)**", "Basal-like (mostly)"),
    ("Unknown", "?", "?", "?", "*Receptor status unknown*", "not reported to registry"),
]

# The order the SOURCES.md claim lists its pairs in.
SOURCES_ORDER = ["HR+/HER2-", "HR-/HER2-", "HR+/HER2+", "HR-/HER2+"]
SOURCES_LABEL = {"HR+/HER2-": "HR+/HER2−", "HR-/HER2-": "TNBC",
                 "HR+/HER2+": "HR+/HER2+", "HR-/HER2+": "HR−/HER2+"}
SOURCES_ANCHOR = "**Receptor-subtype shares and 5-year relative survival**"


def _block_re(name: str) -> re.Pattern[str]:
    return re.compile(
        r"(?P<open><!--\s*pipeline:" + re.escape(name) + r"\b.*?-->)"
        r"(?P<body>.*?)"
        r"(?P<close><!--\s*/pipeline:" + re.escape(name) + r"\s*-->)",
        re.DOTALL,
    )


def replace_block(text: str, name: str, body: str) -> tuple[str, str]:
    """Swap a marked block's contents. Returns (text, outcome)."""
    pat = _block_re(name)
    m = pat.search(text)
    if not m:
        return text, "missing"
    new = m.group("open") + "\n" + body.strip("\n") + "\n" + m.group("close")
    if new == m.group(0):
        return text, "unchanged"
    return text[:m.start()] + new + text[m.end():], "updated"


def _period(incidence: dict) -> tuple[str, str]:
    """'SEER 21, 2019-2023' -> ('SEER 21', '2019–2023'), en dash for prose."""
    raw = str(incidence.get("period") or "")
    registry, _, years = raw.partition(",")
    return registry.strip(), years.strip().replace("-", "–")


def seer_table(incidence: dict) -> str:
    registry, years = _period(incidence)
    subs = incidence.get("subtypes") or {}
    lines = [
        f"Shares below are **{registry} registry figures ({years})**, not estimates — "
        f"see [SEER Cancer Stat Facts: Female Breast Cancer Subtypes]({incidence.get('url', '')}).",
        "",
        "| ER | PR | HER2 | Subtype label | Also called | % of cases | 5-yr relative survival |",
        "|:--:|:--:|:----:|---|---|--:|--:|",
    ]
    for key, er, pr, her2, label, also in SEER_ROWS:
        v = subs.get(key) or {}
        pct = v.get("percent_of_cases")
        surv = v.get("five_year_relative_survival")
        lines.append(
            f"| {er} | {pr} | {her2} | {label} | {also} | "
            f"**{pct}%** | {surv if surv is not None else '—'}"
            + ("%" if surv is not None else "") + " |"
        )
    return "\n".join(lines)


def _csv_context(csv_path: Path) -> dict[str, dict[str, str]]:
    """First pipeline.csv row per NCT id, for the drug/subtype columns."""
    out: dict[str, dict[str, str]] = {}
    if not csv_path.exists():
        return out
    with csv_path.open(encoding="utf-8-sig", newline="") as fh:
        for row in csv.DictReader(fh):
            for nct in re.findall(r"NCT\d{8}", row.get("nct_id") or ""):
                out.setdefault(nct, row)
    return out


def trial_status(trials: dict, csv_path: Path) -> str:
    ctx = _csv_context(csv_path)
    recs = [t for t in (trials.get("trials") or {}).values() if t.get("nct_id")]
    recs.sort(key=lambda t: ((t.get("overall_status") or "ZZZ"), t["nct_id"]))

    lines = [
        f"*{len(recs)} trials · source: {trials.get('source', 'ClinicalTrials.gov')} · "
        f"{trials.get('n_returned')}/{trials.get('n_requested')} resolved*",
        "",
        "| NCT | Trial | Drug | Registry phase | Registry status | Last update |",
        "|---|---|---|---|---|---|",
    ]
    for t in recs:
        row = ctx.get(t["nct_id"], {})
        name = (row.get("trial_name") or t.get("acronym") or t.get("brief_title") or "—")
        if len(name) > 46:
            name = name[:45].rstrip() + "…"
        drug = row.get("drug_name") or "—"
        if t.get("error"):
            phase, status = "—", f"**{t['error']}**"
        else:
            phase = t.get("phase") or "—"
            status = (t.get("overall_status") or "—").replace("_", " ").title()
            if (t.get("overall_status") or "") in {"TERMINATED", "WITHDRAWN", "SUSPENDED"}:
                status = f"**{status}**"
        url = f"https://clinicaltrials.gov/study/{t['nct_id']}"
        lines.append(f"| [{t['nct_id']}]({url}) | {name} | {drug} | {phase} | {status} | "
                     f"{t.get('last_update_posted') or '—'} |")
    return "\n".join(lines)


def sources_claim(text: str, incidence: dict) -> tuple[str, str]:
    """Rewrite the one SOURCES.md row that quotes the SEER figures.

    Anchored on the bold label and terminated by the next table cell, so the
    tier and citation columns beside it are left exactly as written.
    """
    i = text.find(SOURCES_ANCHOR)
    if i < 0:
        return text, "missing"
    start = i + len(SOURCES_ANCHOR)
    end = text.find(" | ", start)
    if end < 0:
        return text, "missing"

    subs = incidence.get("subtypes") or {}
    parts = []
    for key in SOURCES_ORDER:
        v = subs.get(key) or {}
        parts.append(f"{SOURCES_LABEL[key]} {v.get('percent_of_cases')}%/"
                     f"{v.get('five_year_relative_survival')}%")
    unknown = (subs.get("Unknown") or {}).get("percent_of_cases")
    body = " — " + ", ".join(parts) + f", unknown status {unknown}%"

    if text[start:end] == body:
        return text, "unchanged"
    return text[:start] + body + text[end:], "updated"


# Two ways the period is written outside the generated blocks. Both anchors
# name SEER explicitly, so a bare year range elsewhere in the prose ("Regulatory
# actions, 2025–2026") can never be caught by them.
PERIOD_PATTERNS = [
    (re.compile(r"\(SEER\s+\d+,\s*\d{4}[–-]\d{4}\)"), "({registry}, {years})"),
    (re.compile(r"SEER\s+\d+\s+registry figures\s+\(\d{4}[–-]\d{4}\)"),
     "{registry} registry figures ({years})"),
]


def _period_strings(text: str, incidence: dict) -> tuple[str, str]:
    """Refresh the SEER period wherever it is written out in prose."""
    registry, years = _period(incidence)
    original = text
    for pat, template in PERIOD_PATTERNS:
        text = pat.sub(template.format(registry=registry, years=years), text)
    return (text, "unchanged") if text == original else (text, "updated")


# --- reporting on the prose sync deliberately does not own -----------------

# How each SEER row is referred to in running text. Used only to decide which
# subtype a line is about, never to rewrite anything.
SUBTYPE_ALIASES = {
    "HR+/HER2-": ["HR+/HER2−"],
    "HR+/HER2+": ["Triple positive", "triple positive", "HR+/HER2+"],
    "HR-/HER2+": ["HER2-enriched", "HR−/HER2+"],
    "HR-/HER2-": ["Triple-negative", "Triple negative", "triple-negative",
                  "triple negative", "TNBC"],
}
PCT_RE = re.compile(r"(\d+(?:\.\d+)?)\s*%")
OF_CASES_RE = re.compile(r"(\d+(?:\.\d+)?)\s*% of cases")
HEADING_RE = re.compile(r"^#{2,4}\s+(?:[\d.]+\s+)?(.*)$")


def _blank_blocks(text: str) -> str:
    """Blank out generated blocks, preserving line numbers for reporting."""
    for name in ("seer-table", "trial-status"):
        m = _block_re(name).search(text)
        if m:
            text = text[:m.start()] + "\n" * m.group(0).count("\n") + text[m.end():]
    return text


# How far back a "% of cases" figure may sit from the subtype it describes.
ATTRIBUTION_WINDOW = 140


def _nearest_subtype(line: str, before: int) -> str | None:
    """Which subtype a figure belongs to: the last one named before it.

    A sentence often mentions a second subtype in passing ("...less
    endocrine-sensitive than HR+/HER2- disease"), so merely appearing on the
    same line is not enough to own a number. Proximity is.
    """
    best_key, best_pos = None, -1
    for key, aliases in SUBTYPE_ALIASES.items():
        for alias in aliases:
            pos = line.rfind(alias, 0, before)
            if pos > best_pos:
                best_key, best_pos = key, pos
    if best_key is None or best_pos < 0:
        return None
    return best_key if before - best_pos <= ATTRIBUTION_WINDOW else None


def stale_prose(text: str, incidence: dict) -> list[dict[str, Any]]:
    """Find inline figures that contradict the registry.

    Two narrow rules, chosen for precision over recall -- a false positive here
    sends someone to edit a sentence that was fine, which is worse than a miss:

      1. "<n>% of cases", attributed to the nearest subtype named before it.
      2. A heading whose *subject* is a subtype, e.g. "### 5.4 Triple-negative
         (10.8%)". Matching on the subject and not merely on the line keeps
         "### 5.2 HER2-positive (~15-20% including triple positive)" out of it.
    """
    subs = incidence.get("subtypes") or {}
    out: list[dict[str, Any]] = []
    for i, line in enumerate(_blank_blocks(text).splitlines(), 1):
        for m in OF_CASES_RE.finditer(line):
            key = _nearest_subtype(line, m.start())
            current = (subs.get(key) or {}).get("percent_of_cases") if key else None
            if current is not None and float(m.group(1)) != current:
                out.append({"line": i, "subtype": key, "where": "share of cases",
                            "found": [float(m.group(1))], "current": current})

        heading = HEADING_RE.match(line)
        if not heading:
            continue
        subject = heading.group(1)
        for key, aliases in SUBTYPE_ALIASES.items():
            current = (subs.get(key) or {}).get("percent_of_cases")
            if current is None or not any(subject.startswith(a) for a in aliases):
                continue
            found = [float(x) for x in PCT_RE.findall(subject)]
            if found and current not in found:
                out.append({"line": i, "subtype": key, "where": "heading",
                            "found": found, "current": current})
    return out


def run(landscape: Path, sources: Path, incidence: dict | None,
        trials: dict | None, csv_path: Path, write: bool = True) -> dict[str, Any]:
    """Regenerate every machine-owned region. Returns a per-region outcome map."""
    results: dict[str, str] = {}
    changed: set[Path] = set()

    if landscape.exists():
        text = original = landscape.read_text(encoding="utf-8")
        if incidence:
            text, results["landscape/seer-table"] = replace_block(
                text, "seer-table", seer_table(incidence))
            text, results["landscape/seer-period"] = _period_strings(text, incidence)
        else:
            results["landscape/seer-table"] = "skipped (no incidence facts)"
        if trials:
            text, results["landscape/trial-status"] = replace_block(
                text, "trial-status", trial_status(trials, csv_path))
        else:
            results["landscape/trial-status"] = "skipped (no trial facts)"
        if text != original:
            changed.add(landscape)
            if write:
                write_lf(landscape, text)
    else:
        results["landscape"] = "missing"

    if sources.exists():
        text = original = sources.read_text(encoding="utf-8")
        if incidence:
            text, results["sources/seer-claim"] = sources_claim(text, incidence)
            text, results["sources/seer-period"] = _period_strings(text, incidence)
        else:
            results["sources/seer-claim"] = "skipped (no incidence facts)"
        if text != original:
            changed.add(sources)
            if write:
                write_lf(sources, text)
    else:
        results["sources"] = "missing"

    return {"results": results, "changed": sorted(str(p) for p in changed), "written": write}
