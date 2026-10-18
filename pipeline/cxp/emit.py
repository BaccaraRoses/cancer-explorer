"""Emit a JS fragment carrying machine-computed molecular facts.

Deliberately NOT a whole-dataset generator. data/<cancer>.js holds prose,
trigger causes, evidence grades and relationship framing that no API produces
-- overwriting it from a fetch would destroy the expensive half of the work.

Instead this writes data/<cancer>.facts.js, a separate self-registering
overlay keyed by node id. The viewer can merge it over the curated dataset,
so a re-run refreshes numbers without touching judgement. That is the whole
point of keeping `facts/` and `curation/` apart.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .files import write_lf

# Which computed metric backs each alteration wording used in the dataset.
METRIC_LABEL = {
    "mutation": "mutation",
    "amplification": "amplification",
    "deep_deletion": "deep deletion",
    "any_loss": "loss (incl. hemizygous)",
    # any structural variant with the gene at a breakpoint -- see sv_samples()
    "fusion": "fusion",
}


def _js_string(s: str) -> str:
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ") + "'"


def _driver_rows(genes: dict[str, Any]) -> list[dict[str, Any]]:
    """Flatten gene -> metric -> count into the overlay's driver rows, largest first."""
    rows = [{"gene": gene,
             "metric": METRIC_LABEL.get(metric, metric),
             "frequency": val["pct"],
             "n": val["n"],
             "of": val["of"]}
            for gene, metrics in genes.items()
            for metric, val in metrics.items()
            if val["of"] and val["n"]]
    rows.sort(key=lambda g: -g["frequency"])
    return rows


def build_overlay(facts: dict[str, Any], cancer_id: str | None = None) -> dict[str, Any]:
    study = facts["study"]
    # The facts file stamps which cancer produced it. The argument is a
    # fallback for files written before that stamp existed, and the literal
    # is the last resort -- an overlay registered under the wrong cancer id
    # would be merged onto the wrong dataset and silently mismatch every node.
    cancer_id = facts.get("cancer") or cancer_id or "breast"
    nodes: dict[str, Any] = {}

    for node_id, node in facts["drivers_by_subtype"].items():
        nodes[node_id] = {
            "subtype_label": node.get("subtype_label"),
            "n_samples": node["n_samples"],
            "n_sequenced": node["n_sequenced"],
            "n_cna_profiled": node["n_cna_profiled"],
            "drivers": _driver_rows(node["genes"]),
        }

    # Whole-cohort records land in the same `nodes` map, so the viewer needs no
    # new vocabulary. They carry their OWN cohort block, because they did not
    # come from the study named at the top of the file -- and a figure shown
    # under the wrong cohort is worse than one not shown.
    for node_id, rec in (facts.get("drivers_by_cohort") or {}).items():
        nodes[node_id] = {
            "subtype_label": rec.get("subtype_label"),
            "n_samples": rec["n_samples"],
            "n_sequenced": rec["n_sequenced"],
            "n_cna_profiled": rec["n_cna_profiled"],
            "drivers": _driver_rows(rec["genes"]),
            "cohort": rec.get("cohort"),
            "cohort_note": rec.get("cohort_note"),
        }
        # Controls the node's prose quotes (cancers.py `contrasts`). Emitted so the
        # figures regenerate with everything else; `audit` checks the prose against them.
        if rec.get("contrasts"):
            nodes[node_id]["contrasts"] = [
                {"key": c["key"], "label": c["label"], "study": c["study"],
                 "filter": c["filter"], "n_samples": c["n_samples"],
                 "drivers": _driver_rows(c["genes"]),
                 **({"share": c["share"]} if c.get("share") else {})}
                for c in rec["contrasts"]]

    out = {
        "cancer": cancer_id,
        "cohort": {
            "study": study["id"],
            "name": study["name"],
            "n": study["n_samples"],
            # Every count is taken one sample per patient, so this is the n the
            # figures actually rest on. Equal to `n` for the TCGA cohorts.
            "n_patients": study.get("n_patients"),
            "url": f"https://www.cbioportal.org/study/summary?id={study['id']}",
        },
        "nodes": nodes,
        "concordance": facts.get("concordance", {}),
    }
    # A derived classification carries its whole split, excluded classes
    # included, so an axis note can say how many tumours it leaves out and
    # quote a computed count rather than a remembered one.
    if facts.get("classification"):
        out["classification"] = facts["classification"]
    return out


def write_js(overlay: dict[str, Any], out_path: Path, generated_at: str) -> Path:
    payload = json.dumps(overlay, indent=2, ensure_ascii=False)
    header = (
        "/* GENERATED FILE - DO NOT EDIT BY HAND.\n"
        " *\n"
        f" * Produced by pipeline/run.py on {generated_at}\n"
        f" * Cohort: {overlay['cohort']['study']} ({overlay['cohort']['name']}, n={overlay['cohort']['n']})\n"
        " *\n"
        " * Every number here is computed from cBioPortal with an explicit\n"
        f" * numerator and denominator. Curated prose lives in data/{overlay['cancer']}.js\n"
        " * and is never touched by the pipeline.\n"
        " */\n"
    )
    body = (
        "window.CancerExplorerFacts = window.CancerExplorerFacts || {};\n"
        f"window.CancerExplorerFacts['{overlay['cancer']}'] = {payload};\n"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    write_lf(out_path, header + body)
    return out_path


def _load(path: Path | None) -> dict | None:
    if path and path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return None


def run(facts_path: Path, out_path: Path, generated_at: str,
        facts_dir: Path | None = None, cancer_id: str | None = None) -> dict[str, Any]:
    facts = json.loads(facts_path.read_text(encoding="utf-8"))
    overlay = build_overlay(facts, cancer_id)
    cid = overlay["cancer"]

    # Supplementary sources are optional; the overlay degrades rather than fails.
    d = facts_dir or facts_path.parent
    extras = {
        "codes": _merge_codes(_load(d / f"{cid}.oncotree.json")),
        "civic": _load(d / f"{cid}.civic.json"),
        "polygenic": _load(d / f"{cid}.gwas.json"),
        "survival": _load(d / f"{cid}.survival.json"),
        "incidence": _load(d / f"{cid}.incidence.json"),
        # whole-disease figures — what the front page needs and the per-subtype
        # incidence block has never carried
        "overview": _load(d / f"{cid}.overview.json"),
        # whose data this is, and what each source says about reuse
        "attribution": _load(d / f"{cid}.attribution.json"),
    }
    for key, val in extras.items():
        if val:
            overlay[key] = val

    write_js(overlay, out_path, generated_at)
    return {
        "nodes": len(overlay["nodes"]),
        "drivers": sum(len(n["drivers"]) for n in overlay["nodes"].values()),
        "blocks": sorted(k for k, v in extras.items() if v),
        "path": str(out_path),
    }


def _merge_codes(oncotree: dict | None) -> dict | None:
    """One codes block per node, so the viewer has a single place to look. OncoTree
    is the one code system: WHO ICD-11 was dropped on 2026-10-17, because its
    licence puts a node-to-code map outside its terms (notes/deploy.md)."""
    if not oncotree:
        return None
    out: dict[str, Any] = {"nodes": {}}
    out["oncotree_source"] = oncotree.get("source")
    for node, rec in (oncotree.get("nodes") or {}).items():
        if rec.get("match") == "ok":
            out["nodes"].setdefault(node, {})["oncotree"] = {
                "code": rec.get("code"), "name": rec.get("name"),
                "nci": rec.get("nci"), "umls": rec.get("umls"),
            }
    # A codes block with no coded nodes is worse than no block: the overlay
    # advertises a source it has nothing from. A cancer whose histology axis is
    # not written yet fetches the catalogue but codes nothing, and that is the
    # state this guards.
    if not out["nodes"]:
        return None
    return out
