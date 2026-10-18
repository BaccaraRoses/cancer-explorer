"""Write data/breast.targets.js — the protein/drug/gap overlay.

Kept separate from breast.facts.js on purpose. facts.js answers "how often is
this altered"; this answers "what is the protein, what binds it, how far along
is that, and what is nobody doing". They have different refresh cadences (a
cohort is fixed; a drug pipeline moves monthly) and different failure modes, so
one file going stale should not drag the other with it.

Like every generated file here it is optional: drop the <script> tag and the
viewer loses the targets lens and keeps everything else.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .files import write_lf


def write_js(payload: dict[str, Any], out_path: Path, generated_at: str) -> Path:
    body = json.dumps(payload, indent=2, ensure_ascii=False)
    cohort = payload.get("cohort") or {}
    summary = payload.get("drug_summary") or {}

    header = (
        "/* GENERATED FILE - DO NOT EDIT BY HAND.\n"
        " *\n"
        f" * Produced by pipeline/run.py targets on {generated_at}\n"
        f" * Targets: {payload.get('n_targets')}   "
        f"Drugs: {summary.get('n_drugs')} "
        f"({summary.get('registry_matched')} matched to ClinicalTrials.gov)\n"
        f" * Alteration cohort: {cohort.get('id')} ({cohort.get('name')}, n={cohort.get('n_samples')})\n"
        " *\n"
        " * Protein length and domains: UniProt (reviewed human entries).\n"
        " * Structure images: RCSB PDB, public domain. Static deposited renders,\n"
        " * not pocket views and not rotatable — the RCSB link is the real viewer.\n"
        f" * Drugs: {(payload.get('sources') or {}).get('drugs') or 'a curated csv'}, "
        "joined to ClinicalTrials.gov by NCT id.\n"
        " *\n"
        " * The `gaps` block is arithmetic over these sources, not advice. The\n"
        " * repositioning list in particular is a list of questions to ask, and\n"
        " * mixes two classification axes on purpose — see its axis_note.\n"
        " */\n"
    )
    js = (
        "window.CancerExplorerTargets = window.CancerExplorerTargets || {};\n"
        f"window.CancerExplorerTargets['{payload['cancer']}'] = {body};\n"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    write_lf(out_path, header + js)
    return out_path
