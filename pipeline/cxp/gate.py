"""The audit's pass bar: which verdicts fail a run, and what is waived instead.

`audit` used to print its verdicts and exit 0 whatever they said, so a DIVERGENT
row failed nothing -- the only thing standing between it and a finished phase
was whoever read the output. The gate turns the verdicts into an exit code.

The rule is deliberately blunt. A row passes if its verdict is in PASSING for
its section. Any other verdict fails the run unless the cancer declares a
Waiver for that exact row and that exact verdict (cancers.py). A waiver is a
written reason, and `debt=True` says the reason is "nobody has looked yet": the
row still passes, and the gate prints it on every run so the list can only
shrink on purpose. A waiver that excuses nothing -- its row passes, or is gone --
fails the run until it is deleted: 13 of them sat as warnings for a month
(2026-09-23 to 2026-10-17).

Code decides; nothing here reads prose or weighs a note. The audit's own notes
explain a row; they never excuse one.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from .audit import NOT_A_GENE

# Verdicts that pass without a waiver, per report section.
PASSING: dict[str, frozenset[str]] = {
    # LOW N: the denominator is under audit.MIN_N, so the computed figure is not
    # evidence either way. The rule is the audit's, not a judgement per row.
    "comparisons": frozenset({"MATCH", "LOW N"}),
    "quoted_counts": frozenset({"MATCH"}),
    "prevalence": frozenset({"MATCH"}),
    "overview": frozenset({"MATCH"}),
    # REVIEWED: a CIViC prompt someone read and answered in civic_reviewed.
    "druggability": frozenset({"SUPPORTED", "AGREED", "REVIEWED"}),
}


def row_key(section: str, row: dict[str, Any]) -> str:
    """How a Waiver names a row. Also what the gate prints."""
    if section == "comparisons":
        return f"{row.get('node')}/{row.get('gene')}/{row.get('metric')}"
    if section == "quoted_counts":
        return f"{row.get('node')}: {row.get('quoted')}"
    if section == "prevalence":
        return str(row.get("node"))
    if section == "overview":
        return str(row.get("what"))
    if section == "druggability":
        return str(row.get("gene"))
    raise KeyError(section)


def _figures(section: str, row: dict[str, Any]) -> str:
    if section == "comparisons":
        return f"hand {row.get('hand')}%, computed {row.get('computed')}% (n={row.get('of')})"
    if section == "quoted_counts":
        return f"counted {row.get('computed')}"
    if section in ("prevalence", "overview"):
        return f"hand {row.get('hand')}, SEER {row.get('seer')}"
    if section == "druggability":
        pending = row.get("civic_pending_predictive_level")
        return (f"marked druggable={row.get('marked_druggable')}, "
                f"CIViC best predictive level {row.get('civic_best_predictive_level')}"
                + (f" (pending review: {pending})" if pending else ""))
    return ""


@dataclass
class Line:
    section: str
    key: str
    verdict: str
    detail: str

    def __str__(self) -> str:
        return f"{self.section} {self.key} {self.verdict} -- {self.detail}"


@dataclass
class GateResult:
    checked: int = 0
    failures: list[Line] = field(default_factory=list)
    waived: list[Line] = field(default_factory=list)
    debt: list[Line] = field(default_factory=list)
    stale: list[Line] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return not self.failures and not self.stale


def evaluate(report: dict[str, Any], waivers: tuple = ()) -> GateResult:
    """Judge one cancer's audit report (the dict written to reports/<cancer>.audit.json)."""
    res = GateResult()
    by_key: dict[tuple[str, str], Any] = {}
    for w in waivers:
        if w.section not in PASSING:
            res.failures.append(Line(w.section, w.key, "BAD WAIVER",
                                     f"no report section is called {w.section!r}"))
            continue
        if (w.section, w.key) in by_key:
            res.failures.append(Line(w.section, w.key, "BAD WAIVER", "declared twice"))
            continue
        by_key[(w.section, w.key)] = w
    used: set[tuple[str, str]] = set()

    for section, passing in PASSING.items():
        for row in report.get(section) or []:
            res.checked += 1
            verdict = row.get("verdict")
            key = row_key(section, row)
            w = by_key.get((section, key))
            if w is not None:
                used.add((section, key))
            if verdict in passing:
                if w is not None:
                    res.stale.append(Line(section, key, verdict,
                                          f"waived for {w.verdict}, now passes -- delete the waiver"))
                continue
            if section == "comparisons" and verdict == "NOT COMPUTED" and row.get("gene") in NOT_A_GENE:
                continue
            if w is not None and w.verdict == verdict:
                (res.debt if w.debt else res.waived).append(Line(section, key, verdict, w.reason))
                continue
            detail = _figures(section, row)
            if w is not None:
                detail += f"; the waiver covers {w.verdict}, not {verdict}"
            res.failures.append(Line(section, key, verdict, detail))

    # A waiver whose row has gone must not outlive it quietly, or the list
    # stops meaning anything. It excuses nothing, and it fails the run.
    for (section, key), w in by_key.items():
        if (section, key) not in used:
            res.stale.append(Line(section, key, w.verdict, "no such row in the report -- delete the waiver"))

    dangling = (report.get("source_coverage") or {}).get("dangling_reference_ids") or []
    res.checked += 1
    if dangling:
        res.failures.append(Line("source_coverage", "dangling_reference_ids", "DANGLING",
                                 ", ".join(dangling)))
    return res


def render(res: GateResult) -> list[str]:
    """Console lines for `run.py audit`. The first says PASS or FAIL."""
    head = "PASS" if res.passed else "FAIL -- " + ", ".join(
        part for part in (f"{len(res.failures)} row(s)" if res.failures else "",
                          f"{len(res.stale)} stale waiver(s)" if res.stale else "") if part)
    extra = []
    if res.waived:
        extra.append(f"{len(res.waived)} waived")
    if res.debt:
        extra.append(f"{len(res.debt)} unreviewed, carried as debt")
    out = [f"gate: {head}  ({res.checked} checked" + (", " + ", ".join(extra) if extra else "") + ")"]
    for tag, lines in (("FAIL  ", res.failures), ("waived", res.waived),
                       ("debt  ", res.debt), ("stale ", res.stale)):
        out.extend(f"  {tag} {ln}" for ln in lines)
    return out
