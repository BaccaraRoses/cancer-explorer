"""The pathway cards' cohort figures, re-derived from cBioPortal without cxp.

Ported from the melanoma plan's phase-2 and phase-3 audits (notes/melanoma-audits-2026-09-15/
audit2.py and audit3.py). Source: MSK-IMPACT 50K (msk_impact_50k_2026). One melanoma sample per
patient: the first by sample id among the melanoma OncoTree codes below, grouped into the five
pathway cards (OM, "Ocular Melanoma", sits on uveal; MEL, "Melanoma", on skin).

A mutation is any call whose mutationType is not Silent; a TERT promoter call is protein change
"Promoter" or mutationType 5'Flank. A row named "TERT promoter mutation" is checked against
promoter calls, unless its own note says it counts any TERT call (INV-13); amplification and deep deletion are discrete CNA 2 and -2 in the
_gistic profile.

Checked against the dataset:
  - n_samples of the five path-* nodes in melanoma.facts.js
  - the plan's table, 17 rows x 5 pathways: n and of of each row in melanoma.facts.js
  - every curated driver frequency on the path-* cards in melanoma.js
  - the cohort counts the path-* cards and two driver cards quote in prose
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _audit import ANY_TERT_NOTE, DRIVER_ROW, Report, facts, node_block, num, pct, printed  # noqa: E402
from _http import CBIO, clinical, post_json  # noqa: E402

STUDY = "msk_impact_50k_2026"
PATH = {"SKCM": "skin", "MEL": "skin", "DESM": "skin", "SKLMM": "skin", "SPZM": "skin", "ACRM": "acral",
        "ARMM": "mucosal", "VMM": "mucosal", "HNMUCM": "mucosal", "ESMM": "mucosal", "URMM": "mucosal",
        "UM": "uveal", "OM": "uveal", "MUP": "unknown"}
ORDER = ["skin", "acral", "mucosal", "uveal", "unknown"]
GENES = {"BRAF": 673, "NRAS": 4893, "NF1": 4763, "KIT": 3815, "GNAQ": 2776, "GNA11": 2767, "SF3B1": 23451,
         "BAP1": 8314, "EIF1AX": 1964, "TP53": 7157, "CDKN2A": 1029, "CCND1": 595, "CDK4": 1019,
         "TERT": 7015, "MDM2": 4193}
BY_ID = {v: k for k, v in GENES.items()}

r = Report("melanoma pathway cards, MSK-IMPACT 50K, re-derived without cxp")
text = printed("melanoma.js")
overlay = facts("melanoma.facts.js")

# ---- cohort: one melanoma sample per patient
rows = clinical(STUDY, "ONCOTREE_CODE")
first, cm_patients = {}, set()
for row in sorted(rows, key=lambda x: x["sampleId"]):
    if row["value"] == "CM":
        cm_patients.add(row["patientId"])
    if row["value"] in PATH and row["patientId"] not in first:
        first[row["patientId"]] = (row["sampleId"], PATH[row["value"]], row["value"])
group_of = {s: g for s, g, _ in first.values()}
members = defaultdict(set)
for s, g in group_of.items():
    members[g].add(s)
denom = {g: len(members[g]) for g in ORDER}

for g in ORDER:
    r.check(f"path-{g} n_samples (facts)", denom[g], (overlay["nodes"].get(f"path-{g}") or {}).get("n_samples"))

# ---- calls
samples = sorted(group_of)
muts = post_json(f"{CBIO}/molecular-profiles/{STUDY}_mutations/mutations/fetch?projection=SUMMARY",
                 {"sampleIds": samples, "entrezGeneIds": sorted(GENES.values())})
cna = post_json(f"{CBIO}/molecular-profiles/{STUDY}_gistic/discrete-copy-number/fetch"
                f"?discreteCopyNumberEventType=HOMDEL_AND_AMP&projection=SUMMARY",
                {"sampleIds": samples, "entrezGeneIds": sorted(GENES.values())})
hits = defaultdict(set)
for m in muts:
    g, s, p = BY_ID[m["entrezGeneId"]], m["sampleId"], m.get("proteinChange") or ""
    if (m.get("mutationType") or "") == "Silent":
        continue
    hits[(g, "mutation")].add(s)
    if g == "TERT" and (p == "Promoter" or m.get("mutationType") == "5'Flank"):
        hits["TERT promoter"].add(s)
    if g == "BRAF" and p.startswith("V600"):
        hits["BRAF V600"].add(s)
    if g == "BRAF" and p == "V600E":
        hits["BRAF V600E"].add(s)
    if g == "BRAF" and p == "V600K":
        hits["BRAF V600K"].add(s)
    if g == "NRAS" and re.match(r"^[GQ](12|13|61)", p):
        hits["NRAS G12, G13 or Q61"].add(s)
    if g in ("GNAQ", "GNA11") and re.match(r"^(Q209|R183)", p):
        hits["GNAQ or GNA11 Q209/R183"].add(s)
        hits[g + " hotspot"].add(s)
    if g == "SF3B1" and p.startswith("R625"):
        hits["SF3B1 R625"].add(s)
for c in cna:
    if c["alteration"] in (2, -2):
        hits[(BY_ID[c["entrezGeneId"]], "amplification" if c["alteration"] == 2 else "deep deletion")].add(c["sampleId"])


def count(key, g):
    return len(hits[key] & members[g])


def key_of(gene: str, alteration: str):
    """A dataset row (gene label, alteration) -> the hits key that counts it."""
    return gene if gene in hits else (gene, alteration)


# ---- the plan's table, against the overlay's n and of
TABLE = [("BRAF V600", "mutation"), ("BRAF V600E", "mutation"), ("BRAF V600K", "mutation"),
         ("NRAS G12, G13 or Q61", "mutation"), ("NF1", "mutation"), ("KIT", "mutation"), ("KIT", "amplification"),
         ("CCND1", "amplification"), ("CDK4", "amplification"), ("TERT", "amplification"),
         ("MDM2", "amplification"), ("SF3B1 R625", "mutation"), ("GNAQ or GNA11 Q209/R183", "mutation"),
         ("BAP1", "mutation"), ("EIF1AX", "mutation"), ("CDKN2A", "deep deletion"), ("TP53", "mutation")]
for gene, metric in TABLE:
    for g in ORDER:
        rec = next((d for d in overlay["nodes"][f"path-{g}"]["drivers"]
                    if d["gene"] == gene and d["metric"] == metric), None)
        # A row the overlay leaves out has n 0 (it lists only genes with a call).
        want = (rec["n"], rec["of"]) if rec else (0, denom[g])
        r.check(f"path-{g} {gene} {metric} n/of (facts)", (count(key_of(gene, metric), g), denom[g]), want)

# ---- curated driver rows on the path-* cards
for g in ORDER:
    block = node_block(text, f"path-{g}")
    for gm in re.finditer(DRIVER_ROW, block):
        gene, alt, freq, rest = gm.group(1), gm.group(2), float(gm.group(3)), gm.group(4)
        if gene == "TERT" and alt == "promoter mutation":
            # INV-13: a row named for promoter calls counts promoter calls, unless its own note says
            # it counts any TERT call -- then the figure is any calls and the note's counts are checked.
            n_any, n_pro = count(("TERT", "mutation"), g), count("TERT promoter", g)
            d = re.search(ANY_TERT_NOTE, rest)
            if d:
                r.check(f"path-{g} TERT promoter mutation frequency, noted as any TERT call (melanoma.js)",
                        pct(n_any, denom[g]), freq)
                r.check(f"path-{g} TERT row note: promoter calls of any TERT call", (n_pro, n_any),
                        (num(d.group(1)), num(d.group(2))))
            else:
                r.check(f"path-{g} TERT promoter mutation frequency, promoter calls only (melanoma.js)",
                        pct(n_pro, denom[g]), freq)
            continue
        k = count(key_of(gene, alt), g)
        r.check(f"path-{g} {gene} {alt} frequency (melanoma.js)", pct(k, denom[g]), freq)

# ---- prose on the cards
skin, acral, muc, uv, unk = (node_block(text, f"path-{g}") for g in ORDER)
r.prose("path-skin: BRAF V600 in P% (n of N)", skin, r"BRAF V600 is in ([\d.]+)% \(([\d,]+) of ([\d,]+)\)",
        (pct(count("BRAF V600", "skin"), denom["skin"]), count("BRAF V600", "skin"), denom["skin"]))
r.prose("path-skin: NRAS hotspot and NF1 shares", skin, r"an NRAS hotspot in ([\d.]+)% and an NF1 mutation in ([\d.]+)%",
        (pct(count("NRAS G12, G13 or Q61", "skin"), denom["skin"]), pct(count(("NF1", "mutation"), "skin"), denom["skin"])))
r.prose("path-skin: patients filed as MEL", skin, r"([\d,]+) of these patients were filed as melanoma with no subtype",
        (sum(1 for _, g, c in first.values() if c == "MEL"),))
r.prose("path-skin: V600E and V600K", skin, r"V600E in ([\d,]+) patients \(([\d.]+)%\) and V600K in ([\d,]+) \(([\d.]+)%\)",
        (count("BRAF V600E", "skin"), pct(count("BRAF V600E", "skin"), denom["skin"]),
         count("BRAF V600K", "skin"), pct(count("BRAF V600K", "skin"), denom["skin"])))
r.prose("path-skin: KIT mutation on the mucosal card", skin, r"Against ([\d.]+)% on the mucosal card",
        (pct(count(("KIT", "mutation"), "mucosal"), denom["mucosal"]),))
r.prose("path-acral: CCND1, CDK4, TERT amp, against skin", acral,
        r"CCND1 amplified in ([\d.]+)%, CDK4 in ([\d.]+)% and TERT in ([\d.]+)%, against ([\d.]+)%, ([\d.]+)% and ([\d.]+)% on the skin card",
        tuple(pct(count((gene, "amplification"), g), denom[g]) for g in ("acral", "skin") for gene in ("CCND1", "CDK4", "TERT")))
r.prose("path-acral: BRAF V600 share and patients", acral, r"BRAF V600 is in ([\d.]+)%\. With ([\d,]+) patients",
        (pct(count("BRAF V600", "acral"), denom["acral"]), denom["acral"]))
r.prose("path-acral: every V600 call is V600E", acral, r"All ([\d,]+) are V600E",
        (count("BRAF V600E", "acral"),) if count("BRAF V600E", "acral") == count("BRAF V600", "acral") else (None,))
r.prose("path-mucosal: KIT mut, KIT amp, SF3B1 R625, BRAF V600", muc,
        r"KIT is mutated in ([\d.]+)% and amplified in ([\d.]+)%, SF3B1 R625 is in ([\d.]+)%, and BRAF V600 in ([\d.]+)%",
        tuple(pct(count(k, "mucosal"), denom["mucosal"])
              for k in (("KIT", "mutation"), ("KIT", "amplification"), "SF3B1 R625", "BRAF V600")))
gq, g11 = hits["GNAQ hotspot"] & members["uveal"], hits["GNA11 hotspot"] & members["uveal"]
r.prose("path-uveal: GNAQ/GNA11 hotspot n of N (P%)", uv, r"MSK cohort ([\d,]+) of ([\d,]+) patients \(([\d.]+)%\)",
        (count("GNAQ or GNA11 Q209/R183", "uveal"), denom["uveal"], pct(count("GNAQ or GNA11 Q209/R183", "uveal"), denom["uveal"])))
r.prose("path-uveal summary: GNAQ, GNA11", uv, r"GNAQ in ([\d,]+) and GNA11 in ([\d,]+), never both", (len(gq), len(g11)))
r.claim("path-uveal: 'never both' -- no patient has a GNAQ and a GNA11 hotspot", not (gq & g11), f"{len(gq & g11)} have both")
r.prose("path-uveal note: GNAQ, GNA11, the union", uv,
        r"GNAQ in ([\d,]+) patients and GNA11 in ([\d,]+); the two add to the ([\d,]+) counted", (len(gq), len(g11), len(gq | g11)))
r.claim("path-uveal: 'none carries BRAF V600'", "none carries BRAF V600" in uv and count("BRAF V600", "uveal") == 0,
        f"{count('BRAF V600', 'uveal')} carry it")
r.prose("path-uveal: patients filed as OM", uv, r"([\d,]+) of these patients were filed as ocular melanoma",
        (sum(1 for _, g, c in first.values() if c == "OM"),))
r.prose("path-ocular-other: conjunctival melanoma patients", node_block(text, "path-ocular-other"),
        r"holds ([\d,]+) patients with conjunctival melanoma", (len(cm_patients),))
r.prose("path-unknown: BRAF V600 and TERT, against skin; GNAQ/11 against uveal", unk,
        r"BRAF V600 in ([\d.]+)% and a TERT mutation in ([\d.]+)%, against ([\d.]+)% and ([\d.]+)% on skin — and a GNAQ or "
        r"GNA11 hotspot is in ([\d.]+)%, against ([\d.]+)% on the uveal card",
        (pct(count("BRAF V600", "unknown"), denom["unknown"]), pct(count(("TERT", "mutation"), "unknown"), denom["unknown"]),
         pct(count("BRAF V600", "skin"), denom["skin"]), pct(count(("TERT", "mutation"), "skin"), denom["skin"]),
         pct(count("GNAQ or GNA11 Q209/R183", "unknown"), denom["unknown"]),
         pct(count("GNAQ or GNA11 Q209/R183", "uveal"), denom["uveal"])))
r.prose("path-unknown: V600E and V600K", unk, r"V600E in ([\d,]+) patients \(([\d.]+)%\) and V600K in ([\d,]+) \(([\d.]+)%\)",
        (count("BRAF V600E", "unknown"), pct(count("BRAF V600E", "unknown"), denom["unknown"]),
         count("BRAF V600K", "unknown"), pct(count("BRAF V600K", "unknown"), denom["unknown"])))
v600 = node_block(text, "drv-braf-v600")
r.prose("drv-braf-v600: the skin card's BRAF V600, from the 50K cohort", v600,
        r"BRAF V600 in ([\d.]+)% of ([\d,]+) skin melanomas", (pct(count("BRAF V600", "skin"), denom["skin"]), denom["skin"]))
r.prose("drv-braf-v600: no BRAF V600 in the uveal melanomas", v600, r"no BRAF V600 in ([\d,]+) uveal melanomas",
        (denom["uveal"],) if count("BRAF V600", "uveal") == 0 else (None,))
r.prose("drv-kit: KIT mutation on the mucosal card, from the 50K cohort", node_block(text, "drv-kit"),
        r"KIT is mutated in ([\d.]+)% of mucosal melanomas", (pct(count(("KIT", "mutation"), "mucosal"), denom["mucosal"]),))

r.finish()
