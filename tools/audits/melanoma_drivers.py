"""The driver-class cards' figures, re-derived from cBioPortal without cxp.

Ported from the melanoma plan's phase-2 and phase-5 audits (notes/melanoma-audits-2026-09-15/
audit2.py, driver part, and audit5.py). Source: MSK's mel_mskimpact_2020, one sample per patient
(the first by sample id), grouped by the study's own DRIVER_CLASS sample attribute.

A mutation is any call whose mutationType is not Silent; a TERT promoter call is protein change
"Promoter" or mutationType 5'Flank, and a row named "TERT promoter mutation" is checked against
promoter calls unless its own note says it counts any TERT call (INV-13); amplification and deep deletion are discrete CNA 2 and -2;
a BRAF fusion is any structural variant call naming BRAF. Primary site is
DMT_PRIMARY_SITE_CLASSIFIED (Upper/Lower Extremity print as Upper/Lower limb, Unknown as
Unknown primary).

Checked against the dataset:
  - n_samples of the nine drv-* nodes in melanoma.facts.js, and the concordance table there
    (every cell, n_classified, the six headline shares)
  - prevalence and "n of the N patients (p%)" on every driver card in melanoma.js
  - every curated driver frequency on the driver cards
  - the counts the driver axis and cards quote in prose (alleles, co-occurring calls, sites,
    cancer type and sample type)
"""
from __future__ import annotations

import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _audit import ANY_TERT_NOTE, DRIVER_ROW, Report, facts, node_block, num, pct, printed  # noqa: E402
from _http import CBIO, clinical, get_json, post_json  # noqa: E402

STUDY = "mel_mskimpact_2020"
CLASS = {"BRAF_CLASS_1_V600E": ("drv-braf-v600e", "BRAF V600E"),
         "BRAF_CLASS_1_Other": ("drv-braf-v600-other", "BRAF V600, not E"),
         "BRAF_CLASS_2_3": ("drv-braf-class23", "BRAF class 2 or 3"),
         "NRAS_Q61": ("drv-nras-q61", "NRAS Q61"), "RAS_OTHER": ("drv-ras-other", "Other RAS"),
         "NF1": ("drv-nf1", "NF1"), "KIT_PDGFRA": ("drv-kit", "KIT or PDGFRA"),
         "Other_Driver": ("drv-other", "Other driver"), "Unknown_Driver": ("drv-unknown", "Unknown driver")}
SITE = {"Head": "Head", "Trunk": "Trunk", "Upper Extremity": "Upper limb", "Lower Extremity": "Lower limb",
        "Unknown": "Unknown primary"}
GENES = {"BRAF": 673, "NRAS": 4893, "NF1": 4763, "TERT": 7015, "TP53": 7157, "PTEN": 5728, "CDKN2A": 1029,
         "KIT": 3815, "MAP2K1": 5604, "KRAS": 3845, "HRAS": 3265, "GNAQ": 2776, "GNA11": 2767, "PDGFRA": 5156}
BY_ID = {v: k for k, v in GENES.items()}

r = Report("melanoma driver-class cards, mel_mskimpact_2020, re-derived without cxp")
text = printed("melanoma.js")
overlay = facts("melanoma.facts.js")

# ---- cohort: one sample per patient, and its attributes
samples = get_json(f"{CBIO}/studies/{STUDY}/samples?pageSize=100000")
first = {}
for s in sorted(samples, key=lambda s: s["sampleId"]):
    first.setdefault(s["patientId"], s["sampleId"])
chosen = set(first.values())
N = len(chosen)


def attr(a):
    return {row["sampleId"]: row["value"] for row in clinical(STUDY, a) if row["sampleId"] in chosen}


drv, site = attr("DRIVER_CLASS"), attr("DMT_PRIMARY_SITE_CLASSIFIED")
ctype, stype = Counter(attr("CANCER_TYPE_DETAILED").values()), Counter(attr("SAMPLE_TYPE").values())
node_of = {s: CLASS[v][0] for s, v in drv.items()}
members = defaultdict(set)
for s, n in node_of.items():
    members[n].add(s)
size = {n: len(members[n]) for n, _ in CLASS.values()}

# ---- calls
muts = post_json(f"{CBIO}/molecular-profiles/{STUDY}_mutations/mutations/fetch?projection=SUMMARY",
                 {"sampleListId": f"{STUDY}_all", "entrezGeneIds": sorted(GENES.values())})
calls = defaultdict(lambda: defaultdict(list))
for m in muts:
    if m["sampleId"] in chosen and m.get("mutationType") != "Silent":
        calls[BY_ID[m["entrezGeneId"]]][m["sampleId"]].append((m.get("proteinChange") or "", m.get("mutationType") or ""))
cna = post_json(f"{CBIO}/molecular-profiles/{STUDY}_cna/discrete-copy-number/fetch"
                f"?discreteCopyNumberEventType=HOMDEL_AND_AMP&projection=SUMMARY",
                {"sampleListId": f"{STUDY}_all", "entrezGeneIds": sorted(GENES.values())})
amp, homdel = defaultdict(set), defaultdict(set)
for c in cna:
    if c["sampleId"] in chosen and c["alteration"] in (2, -2):
        (amp if c["alteration"] == 2 else homdel)[BY_ID[c["entrezGeneId"]]].add(c["sampleId"])
svs = post_json(f"{CBIO}/structural-variant/fetch",
                {"molecularProfileIds": [f"{STUDY}_structural_variants"], "entrezGeneIds": [GENES["BRAF"]]})
braf_fusion = {v["sampleId"] for v in svs if v["sampleId"] in chosen}


def has(gene, s, pattern=None):
    cs = calls[gene].get(s, [])
    return bool(cs) if pattern is None else any(re.search(pattern, p) for p, _ in cs)


def tert_promoter(s):
    return any(p == "Promoter" or t == "5'Flank" for p, t in calls["TERT"].get(s, []))


TESTS = {"BRAF V600E": lambda s: has("BRAF", s, r"^V600E$"), "BRAF V600K": lambda s: has("BRAF", s, r"^V600K$"),
         "BRAF V600R": lambda s: has("BRAF", s, r"^V600R$"), "BRAF V600": lambda s: has("BRAF", s, r"^V600"),
         "NRAS G12, G13 or Q61": lambda s: has("NRAS", s, r"^[GQ](?:12|13|61)"),
         "GNAQ or GNA11 Q209/R183": lambda s: has("GNAQ", s, r"^(?:Q209|R183)") or has("GNA11", s, r"^(?:Q209|R183)"),
         "BRAF|fusion": lambda s: s in braf_fusion}
for g in GENES:
    TESTS[f"{g}|mutation"] = lambda s, g=g: has(g, s)
    TESTS[f"{g}|deep deletion"] = lambda s, g=g: s in homdel[g]
    TESTS[f"{g}|amplification"] = lambda s, g=g: s in amp[g]
TESTS["TERT|promoter"] = lambda s: tert_promoter(s)


def k(test, node):
    return sum(1 for s in members[node] if TESTS[test](s))


# ---- class sizes, against the overlay and the cards
for raw, (nid, _) in CLASS.items():
    r.check(f"{nid} n_samples (facts)", size[nid], (overlay["nodes"].get(nid) or {}).get("n_samples"))
v600 = size["drv-braf-v600e"] + size["drv-braf-v600-other"]
for nid in [n for n, _ in CLASS.values()] + ["drv-braf-v600"]:
    block = node_block(text, nid)
    n = v600 if nid == "drv-braf-v600" else size[nid]
    m = re.search(r"prevalence: ([\d.]+)", block)
    r.check(f"{nid} prevalence (melanoma.js)", pct(n, N), float(m.group(1)) if m else None)
    r.prose(f"{nid} summary: n of the N patients (p%)", block, r"summary: '([\d,]+) of the ([\d,]+) patients \(([\d.]+)%\)",
            (n, N, pct(n, N)))

# ---- curated driver rows
for nid, _ in CLASS.values():
    block = node_block(text, nid)
    for gm in re.finditer(DRIVER_ROW, block):
        gene, alt, freq, rest = gm.group(1), gm.group(2), float(gm.group(3)), gm.group(4)
        if gene == "TERT" and alt == "promoter mutation":
            # INV-13: a row named for promoter calls counts promoter calls, unless its own note says
            # it counts any TERT call -- then the figure is any calls and the note's counts are checked.
            n_any, n_pro = k("TERT|mutation", nid), k("TERT|promoter", nid)
            d = re.search(ANY_TERT_NOTE, rest)
            if d:
                r.check(f"{nid} TERT promoter mutation frequency, noted as any TERT call (melanoma.js)",
                        pct(n_any, size[nid]), freq)
                r.check(f"{nid} TERT row note: promoter calls of any TERT call", (n_pro, n_any), (num(d.group(1)), num(d.group(2))))
            else:
                r.check(f"{nid} TERT promoter mutation frequency, promoter calls only (melanoma.js)", pct(n_pro, size[nid]), freq)
            continue
        test = gene if gene in TESTS else f"{gene}|{alt}"
        if test not in TESTS:
            r.check(f"{nid} {gene} {alt}: no independent test", None, freq)
            continue
        r.check(f"{nid} {gene} {alt} frequency (melanoma.js)", pct(k(test, nid), size[nid]), freq)

# ---- concordance: driver class x primary site
xt = defaultdict(Counter)
for s in chosen:
    if s in site and s in node_of:
        xt[drv[s]][SITE[site[s]]] += 1
conc = overlay["concordance"]
r.check("concordance n_classified (facts)", sum(sum(c.values()) for c in xt.values()), conc.get("n_classified"))
for raw, (nid, label) in CLASS.items():
    for col in SITE.values():
        r.check(f"concordance {label} x {col} (facts)", xt[raw][col], conc["matrix"].get(label, {}).get(col, 0))
col_total = Counter()
for row in xt.values():
    col_total.update(row)
row_total = {raw: sum(xt[raw].values()) for raw in CLASS}


def cell(raw, col):
    return xt[raw][col]


HEAD = {"nf1_that_is_head": ("NF1", "Head", "row"), "head_that_is_nf1": ("NF1", "Head", "col"),
        "nf1_that_is_trunk": ("NF1", "Trunk", "row"), "trunk_that_is_nf1": ("NF1", "Trunk", "col"),
        "v600e_that_is_head": ("BRAF_CLASS_1_V600E", "Head", "row"),
        "head_that_is_v600e": ("BRAF_CLASS_1_V600E", "Head", "col")}
for key, (raw, col, by) in HEAD.items():
    of = row_total[raw] if by == "row" else col_total[col]
    h = conc["headline"].get(key) or {}
    r.check(f"concordance headline {key} (facts)", (cell(raw, col), of, pct(cell(raw, col), of)),
            (h.get("n"), h.get("of"), h.get("pct")) if h else None)

# ---- prose
# The axis object ends where the dataset's top-level `nodes: [` begins (a germline entry's
# `nodes: ['path-uveal']` comes earlier, so match the indentation).
axis = text[text.index("{ id: 'driver'"):re.search(r"\n  nodes: \[", text).start()]
root = node_block(text, "drv-root")
H, T = col_total["Head"], col_total["Trunk"]
cut, mup = ctype.get("Cutaneous Melanoma", 0), ctype.get("Melanoma of Unknown Primary", 0)
r.prose("driver axis population: patients", axis, r"at MSK \(([\d,]+) patients\)", (N,))
r.prose("driver axis note: patients, cutaneous, unknown primary, metastasis or recurrence, primary", axis,
        r"([\d,]+) patients, one tumour each — ([\d,]+) cutaneous melanomas and ([\d,]+) of unknown primary, ([\d,]+) "
        r"sequenced from a recurrence or metastasis and ([\d,]+) from the primary",
        (N, cut, mup, stype.get("Metastasis", 0) + stype.get("Local Recurrence", 0), stype.get("Primary", 0)))
nf1_nras = k("NRAS G12, G13 or Q61", "drv-nf1")
r.prose("driver axis note: NF1-class with an NRAS hotspot", axis, r"([\d,]+) of the ([\d,]+) NF1-class tumours also carry an NRAS",
        (nf1_nras, size["drv-nf1"]))
tert_any = sum(1 for s in chosen if calls["TERT"].get(s))
tert_prom = sum(1 for s in chosen if tert_promoter(s))
r.prose("driver axis note: TERT promoter of any TERT call", axis, r"and ([\d,]+) of the ([\d,]+) patients with one have it in the promoter",
        (tert_prom, tert_any))
r.prose("drv-root summary: patients, cutaneous, unknown primary", root,
        r"The ([\d,]+) patients in MSK's melanoma study — ([\d,]+) with cutaneous melanoma and ([\d,]+) with melanoma of",
        (N, cut, mup))
r.prose("drv-root: NF1, V600E, NRAS Q61 shares of head and trunk melanomas", root,
        r"NF1-class in ([\d.]+)% of head melanomas \(([\d,]+) of ([\d,]+)\) and ([\d.]+)% of trunk melanomas \(([\d,]+) of "
        r"([\d,]+)\); BRAF V600E in ([\d.]+)% \(([\d,]+) of ([\d,]+)\) and ([\d.]+)% \(([\d,]+) of ([\d,]+)\); NRAS Q61 in "
        r"([\d.]+)% \(([\d,]+) of ([\d,]+)\) and ([\d.]+)% \(([\d,]+) of ([\d,]+)\)",
        tuple(v for raw in ("NF1", "BRAF_CLASS_1_V600E", "NRAS_Q61") for col, tot in (("Head", H), ("Trunk", T))
              for v in (pct(cell(raw, col), tot), cell(raw, col), tot)))
r.prose("drv-root note: patients with a site recorded", root, r"whole table, ([\d,]+) patients with a site recorded",
        (sum(col_total.values()),))
r.prose("drv-root related: cutaneous of all", root, r"'([\d,]+) of the ([\d,]+) patients here have cutaneous melanoma", (cut, N))
r.prose("drv-root related: unknown primary", root, r"The other ([\d,]+) have melanoma of unknown primary", (mup,))
r.prose("drv-braf-v600 summary: V600E and other V600", node_block(text, "drv-braf-v600"),
        r"V600E in ([\d,]+) and another V600 change in ([\d,]+)", (size["drv-braf-v600e"], size["drv-braf-v600-other"]))
r.prose("drv-braf-v600e: trunk and head", node_block(text, "drv-braf-v600e"),
        r"arose on the trunk in ([\d,]+) patients and on the head in ([\d,]+)",
        (cell("BRAF_CLASS_1_V600E", "Trunk"), cell("BRAF_CLASS_1_V600E", "Head")))
other = node_block(text, "drv-braf-v600-other")
r.prose("drv-braf-v600-other: V600K and V600R", other, r"V600K in ([\d,]+) and V600R in ([\d,]+)",
        (k("BRAF V600K", "drv-braf-v600-other"), k("BRAF V600R", "drv-braf-v600-other")))
r.prose("drv-braf-v600-other: head", other, r"([\d,]+) of the ([\d,]+) arose on the head",
        (cell("BRAF_CLASS_1_Other", "Head"), size["drv-braf-v600-other"]))
c23 = node_block(text, "drv-braf-class23")
r.prose("drv-braf-class23: BRAF mutation call and BRAF fusion", c23, r"a BRAF mutation call in ([\d,]+) and a BRAF fusion in ([\d,]+)",
        (k("BRAF|mutation", "drv-braf-class23"), k("BRAF|fusion", "drv-braf-class23")))
r.prose("drv-braf-class23: V600 call as well", c23, r"([\d,]+) of the ([\d,]+) carry a V600 call as well",
        (k("BRAF V600", "drv-braf-class23"), size["drv-braf-class23"]))
r.prose("drv-nras-q61: trunk and head", node_block(text, "drv-nras-q61"),
        r"arose on the trunk in ([\d,]+) patients and on the head in ([\d,]+)", (cell("NRAS_Q61", "Trunk"), cell("NRAS_Q61", "Head")))
ras = node_block(text, "drv-ras-other")
r.prose("drv-ras-other: NRAS, KRAS, HRAS calls", ras, r"an NRAS call in ([\d,]+), KRAS in ([\d,]+) and HRAS in ([\d,]+)",
        tuple(k(f"{g}|mutation", "drv-ras-other") for g in ("NRAS", "KRAS", "HRAS")))
r.prose("drv-ras-other: patients, and points per patient", ras, r"With ([\d,]+) patients, each one is ([\d,]+) percentage points",
        (size["drv-ras-other"], round(100 / size["drv-ras-other"])))
nf1 = node_block(text, "drv-nf1")
r.prose("drv-nf1 summary: share of head and trunk melanomas", nf1, r"tumours are ([\d.]+)% of head melanomas and ([\d.]+)% of trunk",
        (pct(cell("NF1", "Head"), H), pct(cell("NF1", "Trunk"), T)))
r.prose("drv-nf1: NRAS hotspot note", nf1, r"'([\d,]+) of the ([\d,]+)\. The class", (nf1_nras, size["drv-nf1"]))
r.prose("drv-nf1 primary site: head and trunk of those with a site", nf1,
        r"'([\d,]+) of the ([\d,]+) NF1-class patients with a site recorded \(([\d.]+)%\) arose on the head, and ([\d,]+) \(([\d.]+)%\)",
        (cell("NF1", "Head"), row_total["NF1"], pct(cell("NF1", "Head"), row_total["NF1"]),
         cell("NF1", "Trunk"), pct(cell("NF1", "Trunk"), row_total["NF1"])))
kit = node_block(text, "drv-kit")
r.claim("drv-kit: 'every one with a KIT mutation'", "every one with a KIT mutation" in kit and
        k("KIT|mutation", "drv-kit") == size["drv-kit"], f"{k('KIT|mutation', 'drv-kit')} of {size['drv-kit']}")
r.prose("drv-kit: patients, and points per patient", kit, r"With ([\d,]+) patients, each one is about ([\d,]+)",
        (size["drv-kit"], round(100 / size["drv-kit"])))
oth = node_block(text, "drv-other")
r.prose("drv-other: MAP2K1 and GNAQ/GNA11 hotspot", oth, r"MAP2K1 is mutated in ([\d,]+) of them\. A GNAQ or GNA11 hotspot, "
        r"the change most uveal melanomas carry, is in ([\d,]+)\.",
        (k("MAP2K1|mutation", "drv-other"), k("GNAQ or GNA11 Q209/R183", "drv-other")))

r.finish()
