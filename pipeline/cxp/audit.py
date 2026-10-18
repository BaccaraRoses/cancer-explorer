"""Diff machine-computed facts against the hand-written data/breast.js.

The point of the pipeline is not only to regenerate data -- it is to tell you
where the hand-built version was wrong, and to keep telling you as the
underlying sources move.

data/breast.js is JavaScript, not JSON (unquoted keys, single quotes,
comments), so it is parsed with targeted regexes rather than a JSON loader.
That is fragile in general, but the file's shape is regular and the parser
self-checks: `parse_breast_js` reports counts that must match what the
in-browser validator reports, and `run` fails loudly if it extracts nothing.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from .civic import LEVEL_RANK
from .files import write_lf

# --- tolerance bands for comparing a hand-written % against a computed % ---
# 2 points, not 5 (2026-10-17): of the 242 driver rows across all five cancers
# that are neither LOW N nor already waived, 233 agreed within 1, and the nine
# beyond it were all breast's hand-copied figures, 8 of 9 below the cohort's
# count. js/render.js draws the curated figure as the bar and flags drift past
# this same number, so it is what a reader sees without a warning.
MATCH_PP = 2.0
CLOSE_PP = 10.0
# Below this denominator a computed percentage is noise, not evidence.
MIN_N = 20

# Differences we expect and can explain, so they are reported but not alarming.
EXPECTED_DIVERGENCE = {
    ("basal-like", "BRCA1"): "hand value counts germline+somatic; cBioPortal mutation calls are somatic only",
    ("basal-like", "BRCA2"): "hand value counts germline+somatic; cBioPortal mutation calls are somatic only",
    ("basal-like", "BRCA1/2"): "hand value counts germline+somatic; cBioPortal mutation calls are somatic only",
}

# Entries that are not genes at all, so "not computed" is correct, not a gap.
NOT_A_GENE = {
    "APOBEC": "a mutational signature, not a gene — no per-gene frequency exists",
}

NODE_ID_RE = re.compile(r"\bid:\s*'([^']+)'")
FIELD_RE = {
    "axis": re.compile(r"\baxis:\s*'([^']+)'"),
    "label": re.compile(r"\blabel:\s*'((?:[^'\\]|\\.)*)'"),
    "prevalence": re.compile(r"\bprevalence:\s*([0-9.]+)"),
}
GENE_SPLIT_RE = re.compile(r"\{\s*gene:")
GENE_RE = re.compile(r"^\s*'([^']+)'")
ALT_RE = re.compile(r"alteration:\s*'((?:[^'\\]|\\.)*)'")
FREQ_RE = re.compile(r"frequency:\s*([0-9.]+)")
DRUGGABLE_RE = re.compile(r"druggable:\s*true")
# "16.7% (112 of 672)", or "2.0% of women whose sample was taken before any
# treatment (3 of 147)" -- a percentage and, later in the same clause, its count.
# Run on the node text with JS string concatenations already joined.
QUOTED_RE = re.compile(r"(\d+(?:\.\d+)?)%[^%();.]{0,80}?\((\d[\d,]*) of (\d[\d,]*)\)")
JS_CONCAT_RE = re.compile(r"'\s*\+\s*'")


TOP_NODES_RE = re.compile(r"^  nodes:\s*\[", re.M)


def _closing_bracket(text: str, at: int) -> int:
    """Index of the ']' that closes the '[' at `at`, skipping strings and comments."""
    depth, j, n = 0, at, len(text)
    while j < n:
        c = text[j]
        if c in "'\"`":
            j += 1
            while j < n and text[j] != c:
                j += 2 if text[j] == "\\" else 1
        elif text.startswith("//", j):
            j = text.find("\n", j)
            if j < 0:
                break
        elif text.startswith("/*", j):
            j = text.find("*/", j) + 1
            if j <= 0:
                break
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return j
        j += 1
    raise RuntimeError("unbalanced brackets after the top-level nodes array opens")


def top_level_nodes(text: str) -> tuple[int, int]:
    """(start, end) of the dataset's own `nodes: [...]`: the key at the register
    object's top level, not the first `nodes: [` in the file. Biomarker and
    target rows carry `nodes: ['id', ...]` lists too; matching the first one read
    every id from there to the end of the file as a node (breast counted 55)."""
    m = TOP_NODES_RE.search(text)
    if not m:
        raise RuntimeError("could not locate a top-level '  nodes: [' -- file shape changed")
    return m.start(), _closing_bracket(text, m.end() - 1) + 1


def parse_breast_js(path: Path) -> dict[str, Any]:
    """Extract nodes and their molecular drivers from the JS dataset."""
    text = path.read_text(encoding="utf-8")

    try:
        start, end = top_level_nodes(text)
    except RuntimeError as e:
        raise RuntimeError(f"{path}: {e}") from None
    body = text[start:end]

    marks = [(m.start(), m.group(1)) for m in NODE_ID_RE.finditer(body)]
    if not marks:
        raise RuntimeError(f"{path}: found no node ids -- parser needs updating")

    nodes: dict[str, Any] = {}
    for i, (pos, node_id) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(body)
        chunk = body[pos:end]

        rec: dict[str, Any] = {"id": node_id}
        for key, rx in FIELD_RE.items():
            m = rx.search(chunk)
            if m:
                rec[key] = float(m.group(1)) if key == "prevalence" else m.group(1)

        drivers = []
        parts = GENE_SPLIT_RE.split(chunk)
        for frag in parts[1:]:
            gm = GENE_RE.match(frag)
            if not gm:
                continue
            # confine the search to this driver object
            nxt = frag.find("\n        {")
            scope = frag[:nxt] if nxt > 0 else frag
            fm = FREQ_RE.search(scope)
            am = ALT_RE.search(scope)
            drivers.append({
                "gene": gm.group(1),
                "alteration": am.group(1) if am else None,
                "frequency": float(fm.group(1)) if fm else None,
                "druggable": bool(DRUGGABLE_RE.search(scope)),
            })
        rec["drivers"] = drivers
        joined = JS_CONCAT_RE.sub("", chunk)
        rec["quoted"] = [{"pct": float(m.group(1)),
                          "n": int(m.group(2).replace(",", "")),
                          "of": int(m.group(3).replace(",", "")),
                          "text": m.group(0)}
                         for m in QUOTED_RE.finditer(joined)]
        nodes[node_id] = rec

    return {
        "path": str(path),
        "nodes": nodes,
        "counts": {
            "nodes": len(nodes),
            "drivers": sum(len(n["drivers"]) for n in nodes.values()),
        },
    }


STAGE_RE = re.compile(
    r"\{\s*stage:\s*'([^']+)'\s*,\s*share:\s*([\d.]+)\s*,\s*fiveYear:\s*([\d.]+)")
LIFETIME_RE = re.compile(r"lifetimeRisk:\s*([\d.]+)")


def parse_breast_js_header(path: Path) -> dict[str, Any]:
    """Read the blocks that sit ABOVE `nodes: [` — baseline and detection.

    parse_breast_js() starts at the node array, so the front-page figures were
    invisible to the audit. They are transcriptions of a live SEER page and
    therefore exactly the kind of number that goes stale quietly.
    """
    text = path.read_text(encoding="utf-8")
    m = TOP_NODES_RE.search(text)
    head = text[:m.start()] if m else text

    m = LIFETIME_RE.search(head)
    stages = [{"stage": s, "share": float(sh), "five_year": float(fy)}
              for s, sh, fy in STAGE_RE.findall(head)]
    return {
        "lifetime_risk_pct": float(m.group(1)) if m else None,
        "stage_outcomes": stages,
    }


# A claim's `source:` in any form SCHEMA.md accepts — an id, an inline object,
# or an array of either. Matching only the quoted-id form counted a claim citing
# SEVERAL references as uncited: melanoma's age and race rows read 14 of 16.
SOURCE_RE = re.compile(r"source: (?:'[a-z0-9-]+'|\[|\{)")
QUOTED_ID_RE = re.compile(r"'([a-z0-9-]+)'")


# Free text inside a source value. Removed before ids are read, so a quote can
# neither hide an id (a ']' in it ended the array early) nor pose as one (a
# one-word quote looks like an id).
SOURCE_TEXT_RE = re.compile(r"\b(?:quote|label|url):\s*'(?:[^'\\]|\\.)*'")
SOURCE_KEY_RE = re.compile(r"\bsource:\s*")


def source_ids(part: str) -> list[str]:
    """Every references[] id the text cites, in every `source:` it contains --
    bare, in an array, or as the ref of a { ref, quote } -- ignoring inline
    {label, url} objects. Reading only the first `source:` of a factor let a bad
    id in its second citation through."""
    clean = SOURCE_TEXT_RE.sub("", part)
    ids: list[str] = []
    for m in SOURCE_KEY_RE.finditer(clean):
        k = m.end()
        if k >= len(clean):
            break
        if clean[k] == "'":
            q = QUOTED_ID_RE.match(clean, k)
            if q:
                ids.append(q.group(1))
        elif clean[k] in "[{":
            depth, j = 0, k
            while j < len(clean):
                if clean[j] in "[{":
                    depth += 1
                elif clean[j] in "]}":
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            ids.extend(QUOTED_ID_RE.findall(clean[k:j + 1]))
    return ids
REF_ID_RE = re.compile(r"\{ id: '([a-z0-9-]+)', label:")


def source_coverage(path: Path) -> dict[str, Any]:
    """How many curated claims carry a citation.

    The computed half of this project is audited every run; the curated half was
    not measured at all, and 26 risk-factor effect sizes sat in the most
    public-facing view with nothing behind them. This makes that a number, so it
    can only improve or visibly regress.
    """
    text = path.read_text(encoding="utf-8")

    def block(name: str) -> str:
        i = text.find(f"\n  {name}: [")
        if i < 0:
            return ""
        j = text.find("\n  ],", i)
        return text[i:j] if j > i else text[i:]

    refs = block("references")
    ref_ids = set(REF_ID_RE.findall(refs))

    def count(name: str, item_re: str) -> tuple[int, int, list[str]]:
        b = block(name)
        if not b:
            return 0, 0, []
        parts = re.split(r"\n(?=    \{ )", b)[1:]
        total = 0
        cited = 0
        dangling = []
        for p in parts:
            if not re.match(r"\s*\{ " + item_re, p):
                continue
            total += 1
            if SOURCE_RE.search(p):
                cited += 1
                dangling.extend(i for i in source_ids(p) if i not in ref_ids)
        return cited, total, dangling

    f_cited, f_total, f_bad = count("factors", r"id: '")
    trig_total = len(re.findall(r"\{ factor: '", text))
    trig_cited = len(re.findall(r"\{ factor: '(?:[^{}]|\{[^{}]*\})*?source:", text, re.S))
    ther_total = len(re.findall(r"\{ name: '[^']+', class: '", text))
    ther_cited = len(re.findall(r"\{ name: '[^']+', class: '(?:[^{}])*?source:", text))
    nodes_with_src = len(re.findall(r"sources: \[", text))

    return {
        "references_declared": len(ref_ids),
        "factors": {"cited": f_cited, "total": f_total},
        "triggers": {"cited": trig_cited, "total": trig_total},
        "therapies": {"cited": ther_cited, "total": ther_total},
        "nodes_with_sources": nodes_with_src,
        "dangling_reference_ids": sorted(set(f_bad)),
    }


def _norm_stage(s: str) -> str:
    return (s or "").strip().lower().replace("localised", "localized").replace("unstaged", "unknown")


def compare_overview(header: dict[str, Any], overview: dict[str, Any] | None) -> list[dict]:
    """Curated front-page figures against the live SEER whole-disease page."""
    if not overview:
        return []
    rows: list[dict] = []

    seer_life = overview.get("lifetime_risk_pct")
    hand_life = header.get("lifetime_risk_pct")
    if seer_life is not None and hand_life is not None:
        d = round(hand_life - seer_life, 1)
        rows.append({
            "what": "baseline.lifetimeRisk",
            "hand": hand_life, "seer": seer_life, "delta": d,
            "verdict": "MATCH" if abs(d) < 0.5 else "DIVERGENT",
            "note": "the denominator every risk-factor conversion uses",
        })

    by_stage = {_norm_stage(s["stage"]): s for s in overview.get("stage", [])}
    for h in header.get("stage_outcomes", []):
        s = by_stage.get(_norm_stage(h["stage"]))
        if not s:
            rows.append({"what": f"stage {h['stage']} (share)", "hand": h["share"],
                         "seer": None, "delta": None, "verdict": "NOT IN SEER", "note": ""})
            continue
        for field, hv, sv in (("share", h["share"], s.get("percent_of_cases")),
                              ("5-year", h["five_year"], s.get("five_year_relative_survival"))):
            if sv is None:
                continue
            d = round(hv - sv, 1)
            rows.append({
                "what": f"stage {h['stage']} ({field})",
                "hand": hv, "seer": sv, "delta": d,
                "verdict": "MATCH" if abs(d) <= 1.0 else "CLOSE" if abs(d) <= 3.0 else "DIVERGENT",
                "note": "",
            })
    return rows


def _metric_for(alteration: str | None) -> str:
    """Map a prose alteration description onto a computed metric.

    Order matters: 'loss-of-function' describes a MUTATION, so it must be
    tested before the bare 'loss' rule that means copy-number loss. Getting
    this backwards silently compares a mutation rate against a deletion rate
    and manufactures large fake discrepancies.
    """
    a = (alteration or "").lower()
    # A fusion is a rearrangement. Before S3 there was no metric for it, so
    # prostate's "fusion to an androgen-responsive promoter" fell through to
    # mutation and was compared against the wrong thing entirely.
    if "fusion" in a or "rearrange" in a:
        return "fusion"
    if "loss-of-function" in a or "loss of function" in a:
        return "mutation"
    if "amplification" in a or "amplified" in a:
        return "amplification"
    # Check the specific reading before the general one: "deep deletion"
    # contains "deletion", so a naive order sends it to the wrong metric.
    if "deep" in a or "homdel" in a:
        return "deep_deletion"
    # Published "PTEN loss" style figures include hemizygous loss, not just
    # deep deletions, so compare those against the union.
    if "loss" in a or "deletion" in a:
        return "any_loss"
    return "mutation"


def compare_drivers(hand: dict[str, Any], computed: dict[str, Any]) -> list[dict]:
    rows: list[dict] = []
    for node_id, node in computed.items():
        hand_node = hand["nodes"].get(node_id)
        if not hand_node:
            continue
        for hd in hand_node["drivers"]:
            gene = hd["gene"]
            if hd["frequency"] is None:
                continue
            entry = node["genes"].get(gene)
            metric = _metric_for(hd["alteration"])
            if entry is None or metric not in entry:
                rows.append({
                    "node": node_id, "gene": gene, "metric": metric,
                    "hand": hd["frequency"], "computed": None,
                    "n": None, "of": None, "alt": None,
                    "delta": None, "verdict": "NOT COMPUTED",
                    "note": NOT_A_GENE.get(gene, "gene outside the computed panel, or metric unavailable"),
                })
                continue
            comp = entry[metric]
            delta = round(hd["frequency"] - comp["pct"], 1)
            adelta = abs(delta)
            note = EXPECTED_DIVERGENCE.get((node_id, gene), "")
            if comp["of"] < MIN_N:
                verdict = "LOW N"
                note = note or f"denominator {comp['of']} < {MIN_N}; computed % is not meaningful"
            elif adelta <= MATCH_PP:
                verdict = "MATCH"
            elif adelta <= CLOSE_PP:
                verdict = "CLOSE"
            else:
                verdict = "DIVERGENT"
            # A bare "loss" is ambiguous between deep deletion and any loss;
            # surface the other reading so the ambiguity is visible rather
            # than silently resolved by whichever one we happened to pick.
            alt = None
            if metric == "any_loss" and "deep_deletion" in entry:
                alt = f"deep-deletion-only {entry['deep_deletion']['pct']}%"
            elif metric == "deep_deletion" and "any_loss" in entry:
                alt = f"incl. hemizygous {entry['any_loss']['pct']}%"

            rows.append({
                "node": node_id, "gene": gene, "metric": metric,
                "hand": hd["frequency"], "computed": comp["pct"],
                "n": comp["n"], "of": comp["of"], "alt": alt,
                "delta": delta, "verdict": verdict, "note": note,
            })
    rows.sort(key=lambda r: (r["verdict"] == "MATCH",
                             -(abs(r["delta"]) if r["delta"] is not None else 999)))
    return rows


def compare_quoted_counts(hand: dict[str, Any], by_cohort: dict[str, Any]) -> list[dict]:
    """Every "X% (n of N)" written on a cohort node, against what was counted.

    A cohort node's prose quotes controls -- the same study's primaries, a
    receptor-positive slice, a second cohort -- that are not on its card. Those
    figures are declared as `contrasts` in cancers.py and counted every run; this
    is what stops the prose drifting from them. A quoted count that matches
    nothing emitted is UNTRACED: either declare the slice or cite the figure.
    """
    rows: list[dict] = []
    for node_id, rec in by_cohort.items():
        hand_node = hand["nodes"].get(node_id)
        if not hand_node or not hand_node.get("quoted"):
            continue
        pool = [("node", rec.get("subtype_label") or node_id, g, m, v)
                for g, ms in rec["genes"].items() for m, v in ms.items()]
        for c in rec.get("contrasts") or []:
            pool += [("contrast", c["label"], g, m, v)
                     for g, ms in c["genes"].items() for m, v in ms.items()]
            # A slice counted as a share of another slice (cancers.Contrast.of).
            if c.get("share"):
                pool.append(("contrast", c["label"], "patients", "share", c["share"]))
        for q in hand_node["quoted"]:
            same = [p for p in pool if p[4]["n"] == q["n"] and p[4]["of"] == q["of"]]
            exact = [p for p in same if abs(p[4]["pct"] - q["pct"]) <= 0.05]
            hit = (exact or same or [None])[0]
            rows.append({
                "node": node_id, "quoted": q["text"],
                "pct": q["pct"], "n": q["n"], "of": q["of"],
                "computed": None if hit is None else hit[4]["pct"],
                "matched": None if hit is None else f"{hit[0]}: {hit[1]} · {hit[2]} {hit[3]}",
                "verdict": "MATCH" if exact else ("PCT WRONG" if same else "UNTRACED"),
            })
    return rows


def compare_prevalence(hand: dict[str, Any], incidence: dict[str, Any] | None) -> list[dict]:
    """Diff each node's prevalence against SEER's published share of cases.

    This exists because a hand-edited prevalence silently drifting out of step
    with its source is exactly the failure this pipeline is meant to catch.
    """
    if not incidence or not incidence.get("by_node"):
        return []
    rows: list[dict] = []
    for node_id, vals in incidence["by_node"].items():
        seer = vals.get("percent_of_cases")
        node = hand["nodes"].get(node_id)
        if seer is None:
            continue
        if node is None:
            rows.append({"node": node_id, "seer_label": vals.get("seer_label"),
                         "hand": None, "seer": seer, "delta": None,
                         "verdict": "MISSING NODE",
                         "note": "SEER reports this subtype but data/breast.js has no such node"})
            continue
        got = node.get("prevalence")
        if got is None:
            rows.append({"node": node_id, "seer_label": vals.get("seer_label"),
                         "hand": None, "seer": seer, "delta": None,
                         "verdict": "NO PREVALENCE", "note": "node carries no prevalence"})
            continue
        delta = round(got - seer, 1)
        a = abs(delta)
        verdict = "MATCH" if a <= 1.0 else "CLOSE" if a <= 3.0 else "DIVERGENT"
        rows.append({"node": node_id, "seer_label": vals.get("seer_label"),
                     "hand": got, "seer": seer, "delta": delta,
                     "verdict": verdict, "note": ""})
    rows.sort(key=lambda r: (r["verdict"] == "MATCH",
                             -(abs(r["delta"]) if r["delta"] is not None else 999)))
    return rows


def compare_druggability(hand: dict[str, Any], civic: dict[str, Any] | None,
                         cancer_name: str = "breast cancer",
                         reviewed: dict[str, str] | None = None) -> list[dict]:
    """Check a judgement call, not a number.

    `druggable: true` in data/breast.js was assigned by hand. CIViC records
    formal, PMID-cited predictive evidence. Disagreement in either direction is
    interesting: a gene flagged druggable with no predictive evidence behind it,
    or a gene with level-A evidence that the dataset never flagged.
    """
    if not civic or not civic.get("genes"):
        return []

    cg = civic["genes"]

    def civic_lookup(label: str) -> tuple[dict | None, str]:
        """Resolve a dataset gene label against CIViC's plain symbols.

        The dataset uses display labels -- 'CD274 (PD-L1)', 'BRCA1/2' -- that no
        external source uses. Comparing them raw produced four false
        'UNSUPPORTED' rows, which is exactly how an audit teaches people to
        ignore it. Normalise first, and for combined labels take the strongest
        member.
        """
        base = re.sub(r"\s*\(.*?\)", "", label).strip()      # 'CD274 (PD-L1)' -> 'CD274'
        if base in cg:
            return cg[base], base
        if "/" in base:                                       # 'BRCA1/2' -> BRCA1, BRCA2
            head = re.match(r"^([A-Za-z]+)(\d+)", base)
            members = []
            if head:
                stem = head.group(1)
                members = [stem + part if part.isdigit() else part
                           for part in base.replace(stem, "").split("/") if part]
            hits = [(m, cg[m]) for m in members if m in cg]
            if hits:
                best = max(hits, key=lambda kv: LEVEL_RANK.get(kv[1].get("best_level") or "", 0))
                return best[1], f"{base} → {best[0]}"
        # Named alleles — 'KRAS G12C', 'EGFR exon 19 deletion' — carry their
        # gene as the first word. CIViC files the evidence under the gene, so
        # without this every drugged allele read as UNSUPPORTED: five false
        # alarms on lung's first audit, on exactly the rows that are drugged.
        head = base.split()[0] if " " in base else None
        if head and head in cg:
            return cg[head], f"{base} → {head}"
        return None, base

    marked: dict[str, bool] = {}
    for node in hand["nodes"].values():
        for d in node["drivers"]:
            gene = d["gene"]
            marked[gene] = marked.get(gene, False) or bool(d.get("druggable"))

    # A gene counts as flagged when ANY row naming it is. Colorectal flags the
    # drugged allele ('BRAF V600E') and lists plain 'BRAF' unflagged on other
    # nodes, so the plain row read as MISSED beside its own SUPPORTED allele row.
    def symbol(label: str) -> str:
        return civic_lookup(label)[1].split("→")[-1].strip()

    flagged_as: dict[str, list[str]] = {}
    for label, is_marked in marked.items():
        if is_marked:
            flagged_as.setdefault(symbol(label), []).append(label)

    rows: list[dict] = []
    for gene, is_marked in sorted(marked.items()):
        entry, resolved = civic_lookup(gene)
        best = entry.get("best_level") if entry else None
        n_items = entry.get("n_evidence_items") if entry else 0
        # The strongest PREDICTIVE item, not the strongest item of any type: POLE in
        # colorectal has level-B prognostic items and only level-C predictive ones,
        # and was reported as "level-B predictive evidence exists". A civic.json
        # written before the field existed falls back to the old reading.
        best_pred = entry.get("best_predictive_level", best) if entry else None
        # Accepted items only (cxp/civic.py). evidence_types counts pending items
        # too, so it cannot say whether reviewed predictive evidence exists.
        predictive = best_pred is not None
        pending = entry.get("best_predictive_level_submitted") if entry else None
        strong = predictive and best_pred in ("A", "B")
        reason = (reviewed or {}).get(symbol(gene)) or (reviewed or {}).get(gene)
        note = "" if resolved == gene else f"matched CIViC as {resolved}"
        elsewhere = [l for l in flagged_as.get(symbol(gene), []) if l != gene]

        if not is_marked and elsewhere:
            verdict = "AGREED"
            note = (note + "; " if note else "") + f"flagged on {', '.join(elsewhere)}"
        elif is_marked and predictive:
            verdict = "SUPPORTED"
        elif is_marked and not predictive:
            verdict = "UNSUPPORTED"
            note = (note + "; " if note else "") + (
                f"no accepted predictive evidence in CIViC for {cancer_name} — may be "
                "druggable in principle rather than in practice")
        elif not is_marked and strong and reason:
            # A MISSED prompt somebody has read. The reason lives in cancers.py
            # (`civic_reviewed`) so the decision is written down where the next
            # run finds it, rather than re-raised as if nobody had looked.
            verdict = "REVIEWED"
            note = (note + "; " if note else "") + reason
        elif not is_marked and strong:
            verdict = "MISSED"
            note = (note + "; " if note else "") + (
                f"CIViC level-{best_pred} predictive evidence exists. Note CIViC "
                "'predictive' includes predicting NON-response (e.g. RB1 loss and "
                "CDK4/6 inhibitors), which is not the same as the gene being a drug target")
        else:
            verdict = "AGREED"
        if pending:
            note = (note + "; " if note else "") + (
                f"pending CIViC items, not yet accepted by an editor, reach level {pending}")

        rows.append({"gene": gene, "resolved_as": resolved, "marked_druggable": is_marked,
                     "civic_best_level": best, "civic_best_predictive_level": best_pred,
                     "civic_pending_predictive_level": pending,
                     "civic_predictive": predictive,
                     "civic_items": n_items, "verdict": verdict, "note": note})

    order = {"MISSED": 0, "UNSUPPORTED": 1, "REVIEWED": 2, "SUPPORTED": 3, "AGREED": 4}
    rows.sort(key=lambda r: (order.get(r["verdict"], 9), r["gene"]))
    return rows


def render_markdown(facts: dict, hand: dict, rows: list[dict],
                    prev_rows: list[dict] | None = None,
                    incidence: dict | None = None,
                    drug_rows: list[dict] | None = None,
                    civic: dict | None = None,
                    cancer_name: str = "breast cancer") -> str:
    study = facts["study"]
    conc = facts.get("concordance", {})
    out: list[str] = []
    a = out.append
    js = Path(hand["path"]).name
    cid = js.split(".")[0]

    a(f"# Audit — computed facts vs hand-written `data/{js}`\n")
    # Patients, not samples: every computed figure counts one sample per
    # patient, so the study's sample total is not the denominator of anything
    # below. It is still shown when it differs, because that gap is the reason.
    n_pat, n_smp = study.get("n_patients"), study.get("n_samples")
    if n_pat is None:
        n_txt = f"n={n_smp} samples"
    elif n_smp is not None and n_smp != n_pat:
        n_txt = f"n={n_pat} patients, from {n_smp} samples"
    else:
        n_txt = f"n={n_pat}"
    a(f"**Cohort:** `{study['id']}` — {study['name']} ({n_txt})  ")
    # Relative, not hand['path']: the absolute path printed the station's login
    # name into every committed report (found building tools/publish.py, 2026-10-17).
    a(f"**Hand-written file:** `data/{js}`  ")
    a(f"**Parsed:** {hand['counts']['nodes']} nodes, {hand['counts']['drivers']} drivers\n")

    tally: dict[str, int] = {}
    for r in rows:
        tally[r["verdict"]] = tally.get(r["verdict"], 0) + 1
    a("## Summary\n")
    a("| Verdict | Count | Meaning |")
    a("|---|--:|---|")
    a(f"| MATCH | {tally.get('MATCH', 0)} | within ±{MATCH_PP:g} percentage points |")
    a(f"| CLOSE | {tally.get('CLOSE', 0)} | within ±{CLOSE_PP:g} pp |")
    a(f"| DIVERGENT | {tally.get('DIVERGENT', 0)} | more than ±{CLOSE_PP:g} pp apart |")
    a(f"| LOW N | {tally.get('LOW N', 0)} | denominator < {MIN_N}; not evidence either way |")
    a(f"| NOT COMPUTED | {tally.get('NOT COMPUTED', 0)} | no comparable computed metric |")
    a("")

    a("## Driver frequencies\n")
    a("| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |")
    a("|---|---|---|--:|--:|---|--:|---|---|")
    for r in rows:
        comp = "—" if r["computed"] is None else f"{r['computed']}%"
        nof = f"{r['n']}/{r['of']}" if r.get("of") else "—"
        d = "—" if r["delta"] is None else f"{r['delta']:+.1f}"
        note = r["note"]
        if r.get("alt"):
            note = (note + "; " if note else "") + f"other reading: {r['alt']}"
        a(f"| {r['node']} | {r['gene']} | {r['metric']} | {r['hand']}% | {comp} | {nof} | {d} | {r['verdict']} | {note} |")
    a("")

    a("## Prevalence vs SEER\n")
    if not prev_rows:
        a(f"_Skipped — no `facts/{cid}.incidence.json` (SEER publishes a subtypes page for breast only)._\n")
    else:
        src = (incidence or {}).get("period") or "SEER"
        a(f"Share of cases in `data/{js}` against the published registry figures ({src}).\n")
        a(f"| Node | SEER subtype | {js} | SEER | Δ pp | Verdict | Note |")
        a("|---|---|--:|--:|--:|---|---|")
        for r in prev_rows:
            hand_v = "—" if r["hand"] is None else f"{r['hand']}%"
            d = "—" if r["delta"] is None else f"{r['delta']:+.1f}"
            a(f"| {r['node']} | {r.get('seer_label') or '—'} | {hand_v} | {r['seer']}% | {d} | "
              f"{r['verdict']} | {r['note']} |")
        a("")
        bad = [r for r in prev_rows if r["verdict"] not in ("MATCH",)]
        if bad:
            a(f"**{len(bad)} node(s) out of step with SEER.**\n")
    a("")

    a("## Druggability vs CIViC evidence\n")
    if not drug_rows:
        a(f"_Skipped — no `facts/{cid}.civic.json`. Run `python run.py civic` first._\n")
    else:
        a(f"`druggable: true` in `data/{js}` was assigned by hand. CIViC records "
          f"formal, PMID-cited evidence ({(civic or {}).get('total_reported', '?')} items "
          f"for {cancer_name}). Disagreement in either direction is worth reading.\n")
        a("> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence "
          "means a variant predicts response to a therapy — *including predicting "
          "non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the "
          "gene is itself a drug target. A MISSED row is a prompt to look, not a defect; "
          "a REVIEWED row is one that has been looked at, and its note says what was decided "
          "(`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest "
          "PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; "
          "a higher level held only by items still pending review is named in the note.\n")
        interesting = [r for r in drug_rows if r["verdict"] in ("MISSED", "UNSUPPORTED", "REVIEWED")]
        a("| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |")
        a("|---|:--:|:--:|:--:|--:|---|---|")
        for r in (interesting or drug_rows[:12]):
            a(f"| {r['gene']} | {'yes' if r['marked_druggable'] else 'no'} | "
              f"{r.get('civic_best_predictive_level') or '—'} | {'yes' if r['civic_predictive'] else 'no'} | "
              f"{r['civic_items']} | {r['verdict']} | {r['note']} |")
        a("")
        tally: dict[str, int] = {}
        for r in drug_rows:
            tally[r["verdict"]] = tally.get(r["verdict"], 0) + 1
        a("Totals: " + ", ".join(f"**{k}** {v}" for k, v in sorted(tally.items())) + "\n")
    a("")

    rl = conc.get("row_label") or "one classification"
    cl = conc.get("col_label") or "another"
    a(f"## {rl} × {cl} concordance\n")
    if not conc.get("available"):
        a(f"_Not available: {conc.get('reason')}_\n")
    else:
        a(f"Classified {conc['n_classified']} samples having both.\n")
        # Whatever cells cxp/cancers.py declared worth quoting, in its order.
        # Naming the keys here is exactly what broke the first time this ran
        # for a second cancer, so nothing is named.
        a("| Question | Measured | n/N | Hand-written claim |")
        a("|---|--:|---|---|")
        for key, h in (conc.get("headline") or {}).items():
            a(f"| {h.get('label') or key} | {h['pct']}% | "
              f"{h['n']}/{h['of']} | {h.get('claim') or '—'} |")
        a("")
        a(f"### Full matrix (rows = {rl}, columns = {cl})\n")
        cols = sorted({c for row in conc["matrix"].values() for c in row})
        a(f"| {rl} | " + " | ".join(cols) + " | total |")
        a("|---" * (len(cols) + 2) + "|")
        for pam, row in sorted(conc["matrix"].items()):
            cells = [str(row.get(c, 0)) for c in cols]
            a(f"| {pam} | " + " | ".join(cells) + f" | {sum(row.values())} |")
        a("")

    return "\n".join(out)


def _load_optional(path: Path | None) -> dict | None:
    """Every supplementary facts file is optional: `audit` must run standalone."""
    if path and path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return None


def computed_nodes(facts: dict[str, Any], hand: dict[str, Any],
                   against: dict[str, str] | None = None) -> dict[str, Any]:
    """Every computed record the curated drivers are compared with, by node id.

    `against` (Cancer.audit_against) lends a computed cohort to a curated node
    the pipeline does not compute in its own right but whose figures were
    written from that cohort -- a whole-disease root quoting the cohort computed
    whole for another node. Without it such a node gets no audit row at all.
    Every name must resolve: a typo would compare nothing and look clean.
    """
    computed = {**facts["drivers_by_subtype"], **(facts.get("drivers_by_cohort") or {})}
    lent = {}
    for node, target in (against or {}).items():
        if node in computed:
            raise RuntimeError(f"audit_against: {node!r} is computed in its own right -- drop the entry")
        if target not in computed:
            raise RuntimeError(f"audit_against: {node!r} -> {target!r}, which the pipeline does not compute")
        if node not in hand["nodes"]:
            raise RuntimeError(f"audit_against: {node!r} is not a node in the dataset")
        lent[node] = computed[target]
    return {**computed, **lent}


def run(facts_path: Path, breast_js: Path, out_md: Path, out_json: Path,
        incidence_path: Path | None = None, civic_path: Path | None = None,
        overview_path: Path | None = None, cancer_name: str = "breast cancer",
        civic_reviewed: dict[str, str] | None = None,
        audit_against: dict[str, str] | None = None) -> dict:
    facts = json.loads(facts_path.read_text(encoding="utf-8"))
    hand = parse_breast_js(breast_js)
    if hand["counts"]["drivers"] == 0:
        raise RuntimeError("parsed 0 drivers from data/breast.js -- parser is broken")

    incidence = _load_optional(incidence_path)
    civic = _load_optional(civic_path)
    overview = _load_optional(overview_path)

    # Cohort-node records are audited as well. They were left out when
    # cohort_nodes arrived, so every curated figure on a node computed from its
    # own cohort -- prostate's castration-resistant disease, lung's histology and
    # resistance nodes -- went undiffed against the numbers it was written from.
    computed = computed_nodes(facts, hand, audit_against)
    rows = compare_drivers(hand, computed)
    # Say on the row which cohort a lent node was compared with.
    for r in rows:
        if r["node"] in (audit_against or {}):
            lent = f"against {audit_against[r['node']]}'s cohort (audit_against)"
            r["note"] = f"{lent}; {r['note']}" if r["note"] else lent
    quoted_rows = compare_quoted_counts(hand, facts.get("drivers_by_cohort") or {})
    prev_rows = compare_prevalence(hand, incidence)
    drug_rows = compare_druggability(hand, civic, cancer_name, reviewed=civic_reviewed)
    header = parse_breast_js_header(breast_js)
    overview_rows = compare_overview(header, overview)
    coverage = source_coverage(breast_js)

    md = render_markdown(facts, hand, rows, prev_rows, incidence, drug_rows, civic, cancer_name)
    if overview_rows:
        md += _render_overview_section(overview, overview_rows, Path(breast_js).name)
    if quoted_rows:
        md += _render_quoted_section(quoted_rows, Path(breast_js).name)
    md += _render_coverage_section(coverage)

    out_md.parent.mkdir(parents=True, exist_ok=True)
    write_lf(out_md, md)
    write_lf(out_json, json.dumps(
        # Stamped like the facts it reads, so a report can never be taken
        # for another cancer's.
        {"cancer": facts.get("cancer"),
         "cohort": facts["study"], "hand_counts": hand["counts"],
         "comparisons": rows, "quoted_counts": quoted_rows,
         "prevalence": prev_rows, "druggability": drug_rows,
         "overview": overview_rows, "source_coverage": coverage,
         "concordance": facts.get("concordance")},
        indent=2))
    return {"rows": rows, "quoted": quoted_rows, "prevalence": prev_rows,
            "druggability": drug_rows, "overview": overview_rows,
            "coverage": coverage, "hand": hand}


def _render_quoted_section(rows: list[dict], js: str) -> str:
    out = ["\n## Counts quoted in cohort-node prose\n"]
    out.append(f"Every \"X% (n of N)\" written on a cohort node in `data/{js}`, against the "
               "node's own figures and the `contrasts` declared for it in `cxp/cancers.py`. "
               "UNTRACED means the pipeline counts nothing with that numerator and "
               "denominator — declare the slice, or cite the figure to a publication.\n")
    out.append("| Node | Quoted | Computed | Matched | Verdict |")
    out.append("|---|---|---:|---|---|")
    for r in rows:
        comp = "—" if r["computed"] is None else f"{r['computed']}%"
        out.append(f"| {r['node']} | {r['quoted']} | {comp} | {r['matched'] or '—'} | {r['verdict']} |")
    return "\n".join(out) + "\n"


def _render_coverage_section(cov: dict) -> str:
    out = ["\n## Citation coverage\n"]
    out.append("How many curated claims carry a citation. The computed half of this project "
               "is checked against its sources every run; this is the same discipline applied "
               "to the hand-written half.\n")
    out.append(f"`references[]` declared: **{cov['references_declared']}**\n")
    out.append("| Claim type | Cited | Total | |")
    out.append("|---|---:|---:|---|")
    for key, label in (("factors", "Risk factors (public-facing)"),
                       ("triggers", "Per-node triggers"),
                       ("therapies", "Therapies")):
        c, t = cov[key]["cited"], cov[key]["total"]
        bar = "— (none made)" if t == 0 else ("OK" if c == t else ("none" if c == 0 else "partial"))
        out.append(f"| {label} | {c} | {t} | {bar} |")
    out.append(f"\nNodes carrying a `sources[]` block: {cov['nodes_with_sources']}")
    if cov["dangling_reference_ids"]:
        out.append(f"\n**Dangling reference ids** (cited but not declared): "
                   f"{', '.join(cov['dangling_reference_ids'])}")
    return "\n".join(out) + "\n"


def _render_overview_section(overview: dict | None, rows: list[dict], js: str = "breast.js") -> str:
    out = ["\n## Front-page figures vs SEER\n"]
    src = (overview or {}).get("url", "SEER")
    out.append(f"Curated figures in `data/{js}` against the live whole-disease page "
               f"([SEER]({src})). These are transcriptions, not judgement — a DIVERGENT row "
               f"here means the page moved and the dataset did not.\n")
    out.append(f"| Figure | {js} | SEER | Δ | Verdict | Note |")
    out.append("|---|---:|---:|---:|---|---|")
    for r in rows:
        seer = "—" if r["seer"] is None else r["seer"]
        d = "—" if r["delta"] is None else f"{r['delta']:+}"
        out.append(f"| {r['what']} | {r['hand']} | {seer} | {d} | {r['verdict']} | {r['note']} |")
    bad = [r for r in rows if r["verdict"] == "DIVERGENT"]
    out.append("")
    out.append(f"**{len(bad)} divergent** of {len(rows)} checked."
               if bad else f"All {len(rows)} figures agree.")
    return "\n".join(out) + "\n"
