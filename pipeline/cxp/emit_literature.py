"""Write data/breast.literature.js — the frontier overlay.

Its own file, like breast.targets.js, because it has a different refresh
cadence from everything else: a cohort is fixed and a drug pipeline moves
monthly, but literature moves daily. A stale overlay here should not drag the
others with it, and the header carries the fetch date so staleness is visible
rather than assumed.

Abstracts are deliberately NOT emitted. They would multiply the file size
roughly fivefold and the app has nothing to do with them that a link does not
do better.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .files import write_lf


def write_js(payload: dict[str, Any], out_path: Path, generated_at: str) -> Path:
    # indent=1: still diffable, but 713 records at indent=2 cost ~200KB in
    # whitespace alone.
    body = json.dumps(payload, indent=1, ensure_ascii=False)
    tiers = payload.get("by_tier") or {}
    kinds = payload.get("by_kind") or {}

    header = (
        "/* GENERATED FILE - DO NOT EDIT BY HAND.\n"
        " *\n"
        f" * Produced by pipeline/run.py literature on {generated_at}\n"
        f" * {payload.get('n_papers')} papers since {payload.get('since')}"
        f"  (from {payload.get('n_raw_hits')} raw hits, deduplicated)\n"
        f" * By tier: {', '.join(f'{k} {v}' for k, v in sorted(tiers.items()))}\n"
        f" * By kind: {', '.join(f'{k} {v}' for k, v in sorted(kinds.items()))}\n"
        " *\n"
        " * Source: Europe PMC (PubMed + PMC + preprint servers), no API key.\n"
        " *\n"
        " * THIS IS A DATED SNAPSHOT of a literature that moves daily, and most of\n"
        " * it is preclinical. Every record carries an evidence tier, a species\n"
        " * flag, and the terms that matched it, so a preprint about mice cannot\n"
        " * be mistaken for a result. Nothing is ranked by promise: citation\n"
        " * counts are zero for recent work and no heuristic can tell which new\n"
        " * mechanism will succeed.\n"
        " */\n"
    )
    js = (
        "window.CancerExplorerLiterature = window.CancerExplorerLiterature || {};\n"
        f"window.CancerExplorerLiterature['{payload['cancer']}'] = {body};\n"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    write_lf(out_path, header + js)
    return out_path
