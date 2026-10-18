"""The germline entries' figures and label claims, re-derived from their sources without cxp.

Ported from the melanoma plan's phase-6 audit (notes/melanoma-audits-2026-09-15/audit6.py).
Phase 6 built targets[].germline: melanoma's PMEL entry (tebentafusp, selected by genotyping
blood for HLA-A*02:01) and breast's PARP1 entry (olaparib and talazoparib, written for germline
BRCA only). Both are checked here because one phase built both.

Sources, fetched fresh on a cache miss: the openFDA labels (by the set_id each references[] url
names), the Europe PMC full texts of Cohen 2026 and Olivier 2023 (by the PMCID each references[]
url names), PubMed esummary for their PMIDs, the Nathan 2021 trial abstract, and UniProt P40967.

Checked against the dataset: each label's effective date as the references[] label prints it;
the share 551 of 1,072 and the three CIWD allele frequencies; and the worded claims (indication,
patient selection, mechanism, the caution, alleles not people, germline against germline or
somatic) each against the sentence of the source that states it.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _audit import Report, node_block, printed  # noqa: E402
from _http import get_json, get_text  # noqa: E402

r = Report("germline entries (melanoma PMEL, breast PARP1), re-derived without cxp")
mel = printed("melanoma.js")
brc = printed("breast.js")


def flat(xml: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", xml)))


def ref(text: str, rid: str) -> str:
    """The references[] entry with this id, as one string (label, journal, pmid, url)."""
    m = re.search(r"\{ id: '" + re.escape(rid) + r"',.*?\}", text, flags=re.S)
    return m.group(0) if m else ""


def label_of(text: str, rid: str) -> dict | None:
    m = re.search(r"set_id:([0-9a-f-]{36})", ref(text, rid))
    if not m:
        return None
    return get_json(f"https://api.fda.gov/drug/label.json?search=set_id:{m.group(1)}")["results"][0]


def effective(text: str, rid: str, lab: dict | None):
    printed_date = re.search(r"effective (\d{4}-\d{2}-\d{2})", ref(text, rid))
    got = None if lab is None else f"{lab['effective_time'][:4]}-{lab['effective_time'][4:6]}-{lab['effective_time'][6:8]}"
    r.check(f"{rid}: label effective date", got, printed_date.group(1) if printed_date else None)


def section(lab: dict, key: str) -> str:
    return re.sub(r"\s+", " ", " ".join(lab.get(key) or []))


def pmc(text: str, rid: str) -> str:
    m = re.search(r"articles/(PMC\d+)", ref(text, rid))
    if not m:
        return ""
    return flat(get_text(f"https://www.ebi.ac.uk/europepmc/webservices/rest/{m.group(1)}/fullTextXML"))


# ---- melanoma: the tebentafusp label
pmel = mel[mel.index("{ gene: 'PMEL',"):mel.index("{ gene: 'BRAF',")]
germ = re.search(r"germline: \[\{(.*?)\}\]", pmel, flags=re.S)
germ = germ.group(1) if germ else ""
lab = label_of(mel, "label-tebentafusp")
effective(mel, "label-tebentafusp", lab)
ind, sel, moa = (section(lab or {}, k) for k in ("indications_and_usage", "dosage_and_administration", "mechanism_of_action"))
r.claim("label indication: unresectable or metastatic uveal melanoma, HLA-A*02:01-positive; the entry's agents say so",
        "HLA-A*02:01-positive adult patients with unresectable or metastatic uveal melanoma" in ind
        and "agents: 'tebentafusp (Kimmtrak), in unresectable or metastatic uveal melanoma'" in germ, ind)
r.claim("label 2.1: selection by a HLA-A*02:01 genotyping test of a whole blood sample; the entry's test says so",
        "positive HLA-A*02:01 genotyping test of a whole blood sample" in sel
        and "test: 'HLA-A*02:01 genotyping of a whole blood sample'" in germ, sel[:300])
r.claim("label 12.1: binds a gp100 peptide presented by HLA-A*02:01, and CD3; the PMEL summary says so",
        "binds to a gp100 peptide presented by human leukocyte antigen-A*02:01" in moa and "CD3" in moa
        and "binds a gp100 peptide as HLA-A*02:01 presents it" in pmel and "binds CD3" in pmel, moa)

# ---- Cohen 2026: the share
coh = pmc(mel, "cohen-2026")
m = re.search(r"IMCgp100-202 trial, ([\d,]+) patients were screened for HLA, of which (\d+) \((\d+)%\) were HLA-A\*02:01 positive", coh)
share = re.search(r"share: \{ n: (\d+), of: (\d+)", germ)
r.check("Cohen 2026: HLA-A*02:01 positive of those screened (n, of) against the entry's share",
        (int(m.group(2)), int(m.group(1).replace(",", ""))) if m else None,
        (int(share.group(1)), int(share.group(2))) if share else None)
r.claim("Cohen 2026: read with caution for biases such as countries; the note says so",
        "interpreted with caution due to potential biases, such as countries in which the study was conducted" in coh
        and "read with caution for biases such as the countries it ran in" in germ)

# ---- Olivier 2023: the allele frequencies
oli = pmc(mel, "olivier-2023")
t2 = re.search(r"Table 2\. Most Frequent HLA-A Alleles.*?A\*02:01 ([\d.]+) \([^)]*\) ([\d.]+) \([^)]*\) ([\d.]+) \([^)]*\) ([\d.]+) \(", oli)
note = re.search(r"the allele is ([\d.]+)% of HLA-A alleles in people of European descent, ([\d.]+)% in African or African "
                 r"American people and ([\d.]+)% in Asian or Pacific Islander people", germ)
r.check("Olivier 2023 Table 2, A*02:01: European, African/African American, Asian/Pacific Islander",
        (float(t2.group(4)), float(t2.group(2)), float(t2.group(3))) if t2 else None,
        tuple(float(x) for x in note.groups()) if note else None)
r.claim("Olivier 2023: the column is allele frequency; the note calls them shares of alleles, not of people",
        "Allele frequency, % (95% CI)" in oli and "shares of alleles, not of people" in germ)
r.claim("Olivier 2023: CIWD 3.0.0 combines multiple registries; the note says across the registries",
        "CIWD" in oli and "This data set combines multiple registries" in oli
        and "Across the registries of the CIWD 3.0.0 catalogue" in germ)

# ---- the PMIDs, and the trial report the share is not taken from
ids = {rid: re.search(r"pmid: '(\d+)'", ref(mel, rid)) for rid in ("cohen-2026", "olivier-2023")}
summ = get_json("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id="
                + ",".join(m.group(1) for m in ids.values() if m))["result"]
c, o = (summ.get(m.group(1), {}) if m else {} for m in ids.values())
r.claim("cohen-2026's PMID is Cohen's tebentafusp product review",
        "Product review" in c.get("title", "") and (c.get("authors") or [{}])[0].get("name") == "Cohen JE", str(c)[:200])
r.claim("olivier-2023's PMID is Olivier's HLA eligibility paper",
        "Eligibility for Human Leukocyte Antigen-Based Therapeutics" in o.get("title", ""), str(o)[:200])
nat = get_text("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=34551229&rettype=abstract&retmode=text")
r.claim("Nathan 2021 (PMID 34551229) abstract gives no screening count, and the dataset cites no share to it",
        "Overall Survival Benefit with Tebentafusp" in nat and "screened" not in nat.lower() and "1,072" not in nat
        and "34551229" not in mel, nat[:200])

# ---- UniProt: PMEL is gp100
up = get_json("https://rest.uniprot.org/uniprotkb/P40967.json")
alts = [a["fullName"]["value"] for a in up["proteinDescription"].get("alternativeNames", [])]
r.claim("UniProt P40967 is PMEL, alternative name ... GP100; the PMEL source says so",
        up["genes"][0]["geneName"]["value"] == "PMEL" and any("GP100" in a for a in alts)
        and "UniProt P40967 — melanocyte protein PMEL; alternative name melanocytes lineage-specific antigen GP100" in pmel,
        str(alts))

# ---- breast: both PARP inhibitor labels are germline-only in breast, not in prostate
parp = brc[brc.index("{ gene: 'PARP1',"):brc.index("{ gene: 'BRCA1',")]
bgerm = re.search(r"germline: \[\{(.*?)\}\]", parp, flags=re.S)
bgerm = bgerm.group(1) if bgerm else ""
lyn = label_of(brc, "label-olaparib")
effective(brc, "label-olaparib", lyn)
lind = section(lyn or {}, "indications_and_usage")
# Indication sentences only; "Patients with HR-positive breast cancer should have been
# treated with a prior endocrine therapy" is a condition, not an indication.
bre = [s for s in re.findall(r"[^.]*breast cancer[^.]*\.", lind) if "treatment of adult patients" in s]
r.claim("olaparib label: every breast indication is germline BRCA-mutated",
        len(bre) >= 2 and all(re.search(r"g\s?BRCA\s?m|germline BRCA", s) for s in bre), str(bre)[:300])
r.claim("olaparib label: both breast indications are HER2-negative; the entry's agents say so",
        len(bre) >= 2 and all("HER2" in s and "negative" in s for s in bre)
        and "agents: 'olaparib and talazoparib, in HER2-negative disease'" in bgerm, str(bre)[:300])
r.claim("olaparib label: the prostate HRR indication is germline or somatic (so prostate has no germline entry)",
        "germline or somatic homologous recombination repair (HRR) gene-mutated metastatic castration-resistant prostate cancer" in lind
        and "germline:" not in printed("prostate.js"))
tal = label_of(brc, "label-talazoparib")
effective(brc, "label-talazoparib", tal)
tind, tsel = section(tal or {}, "indications_and_usage"), section(tal or {}, "dosage_and_administration")
r.claim("talazoparib label: deleterious or suspected deleterious germline BRCA-mutated HER2-negative breast cancer; "
        "the entry's test says so",
        "deleterious or suspected deleterious germline BRCA -mutated (g BRCA m) HER2-negative locally advanced or metastatic breast cancer" in tind
        and "test: 'germline BRCA1 or BRCA2, deleterious or suspected deleterious'" in bgerm, tind[:300])
r.claim("talazoparib label 2.1: select on germline BRCA mutations", "based on the presence of germline BRCA mutations" in tsel, tsel[:300])
r.claim("talazoparib label: the prostate indication names no germline restriction",
        bool(re.search(r"HRR gene-mutated metastatic castration-resistant", tind)) and "germline HRR" not in tind, tind[:300])
r.claim("breast PARP1 germline entry cites both labels, on the HER2-negative nodes",
        "source: ['label-olaparib', 'label-talazoparib']" in bgerm and "nodes: ['hr-pos-her2-neg', 'tnbc']" in bgerm, bgerm)

r.finish()
