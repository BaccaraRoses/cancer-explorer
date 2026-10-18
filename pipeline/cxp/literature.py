"""The frontier: what is being published about the problems with current drugs.

The drug pipeline in ../cancer_research/pipeline.csv is already history by the
time it reaches a trial register. The mechanism that will limit T-DXd, or
replace it, appears in the literature months to years earlier. This module
fetches that layer and — crucially — attaches enough metadata that nobody can
mistake a mouse preprint for a result.

Source is Europe PMC: no API key, covers PubMed and PMC and preprints
(bioRxiv/medRxiv arrive as source "PPR"), returns publication types, MeSH
headings and abstracts.

WHAT THIS MODULE WILL NOT DO
----------------------------
Rank promise. `citedByCount` is 0 for everything recent, so citations cannot
order the frontier, and no heuristic can tell which new mechanism will work.
The output says what is being tried, against which known problem, at what
evidence tier. It never says which is best, and there is deliberately no
"most promising" sort for the renderer to reach for.
"""
from __future__ import annotations

import logging
import re
from typing import Any

from .http import Http

log = logging.getLogger("cxp.literature")

SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"

# Without this every query leaks. An alpelisib + hyperglycaemia search returned
# a venous-malformation paper, which is true of alpelisib and useless here.
SCOPE_BY_CANCER: dict[str, str] = {
    "breast": '(TITLE_ABS:"breast cancer" OR TITLE_ABS:"breast tumour" OR TITLE_ABS:"breast tumor")',
    # Prostate needs the adjectival form too: an enormous share of the
    # relevant literature says "prostatic adenocarcinoma" or "mCRPC" and
    # never the phrase "prostate cancer" in the title or abstract.
    "prostate": ('(TITLE_ABS:"prostate cancer" OR TITLE_ABS:"prostatic carcinoma" '
                 'OR TITLE_ABS:"prostatic adenocarcinoma" OR TITLE_ABS:"mCRPC" '
                 'OR TITLE_ABS:"castration-resistant prostate")'),
    # Lung papers name the histology far more often than the organ.
    "lung": ('(TITLE_ABS:"lung cancer" OR TITLE_ABS:"NSCLC" OR TITLE_ABS:"SCLC" '
             'OR TITLE_ABS:"lung adenocarcinoma" OR TITLE_ABS:"non-small cell lung" '
             'OR TITLE_ABS:"small cell lung")'),
}

SCOPE = SCOPE_BY_CANCER["breast"]

# How far back to look. Long enough that a quiet target still shows something,
# short enough that "the frontier" means it.
SINCE = "2024-01-01"

MAX_PER_QUERY = 25


# --------------------------------------------------------------------------
# The curated half: what is actually wrong with each agent class.
#
# This is a classification the query construction depends on, not narrative, so
# it lives beside the computation — the same argument SCHEMA.md makes for
# targets.py's `basis`. Getting a term wrong here does not produce a wrong
# number, it produces an irrelevant paper, and every row carries its match
# reason so that failure is visible rather than silent.
# --------------------------------------------------------------------------

DRAWBACKS_BY_CANCER: dict[str, dict[str, dict[str, Any]]] = {}

DRAWBACKS: dict[str, dict[str, Any]] = {
    "T-DXd (trastuzumab deruxtecan)": {
        "drug_terms": ['"trastuzumab deruxtecan"', '"T-DXd"', '"DS-8201"', '"Enhertu"'],
        "genes": ["ERBB2"],
        "toxicity": ['"interstitial lung disease"', "pneumonitis", "neutropenia"],
        "resistance": ['"HER2 loss"', "SLC46A3", '"payload efflux"', '"ADC resistance"'],
    },
    "Trastuzumab": {
        "drug_terms": ['"trastuzumab"', '"Herceptin"'],
        "genes": ["ERBB2"],
        "toxicity": ["cardiotoxicity", '"cardiac dysfunction"', '"ejection fraction"'],
        "resistance": ['"trastuzumab resistance"', "PIK3CA", '"PTEN loss"'],
    },
    "Tucatinib / HER2 TKIs": {
        "drug_terms": ['"tucatinib"', '"neratinib"', '"lapatinib"'],
        "genes": ["ERBB2"],
        "toxicity": ["diarrhoea", "diarrhea", "hepatotoxicity"],
        "resistance": ['"HER2 mutation"', '"brain metastases"'],
    },
    "Sacituzumab govitecan (TROP2 ADC)": {
        "drug_terms": ['"sacituzumab govitecan"', '"Trodelvy"', '"datopotamab"'],
        "genes": ["TACSTD2"],
        "toxicity": ["neutropenia", "diarrhoea", "diarrhea", "stomatitis"],
        "resistance": ['"TROP2 loss"', "TACSTD2", '"topoisomerase"'],
    },
    "CDK4/6 inhibitors": {
        "drug_terms": ['"CDK4/6 inhibitor"', '"palbociclib"', '"ribociclib"', '"abemaciclib"'],
        "genes": ["CDK4", "CDK6", "CCND1"],
        "toxicity": ["neutropenia", '"QT prolongation"', "hepatotoxicity"],
        "resistance": ['"RB1 loss"', "CCNE1", '"CDK4/6 inhibitor resistance"', "AURKA"],
    },
    "Alpelisib / PI3K inhibitors": {
        "drug_terms": ['"alpelisib"', '"inavolisib"', '"Piqray"'],
        "genes": ["PIK3CA", "PIK3R1"],
        "toxicity": ["hyperglycemia", "hyperglycaemia", "rash", "stomatitis"],
        "resistance": ['"PI3K inhibitor resistance"', '"PTEN loss"', "ESR1"],
    },
    "Capivasertib (AKT)": {
        "drug_terms": ['"capivasertib"', '"AZD5363"', '"Truqap"'],
        "genes": ["AKT1"],
        "toxicity": ["diarrhoea", "diarrhea", "rash", "hyperglycemia"],
        "resistance": ['"AKT inhibitor resistance"'],
    },
    "Everolimus (mTOR)": {
        "drug_terms": ['"everolimus"', '"Afinitor"'],
        "genes": ["MTOR"],
        "toxicity": ["stomatitis", "pneumonitis", "hyperglycemia"],
        "resistance": ['"mTOR inhibitor resistance"'],
    },
    "PARP inhibitors": {
        "drug_terms": ['"olaparib"', '"talazoparib"', '"PARP inhibitor"'],
        "genes": ["PARP1", "BRCA1", "BRCA2"],
        "toxicity": ["myelodysplastic", '"myelodysplastic syndrome"', "anaemia", "anemia"],
        "resistance": ['"reversion mutation"', '"BRCA reversion"', '"PARP inhibitor resistance"',
                       '"restoration of homologous recombination"'],
    },
    "Oral SERDs / endocrine therapy": {
        "drug_terms": ['"elacestrant"', '"camizestrant"', '"imlunestrant"', '"fulvestrant"',
                       '"oral SERD"', '"aromatase inhibitor"'],
        "genes": ["ESR1"],
        "toxicity": ["arthralgia", '"bone density"', '"hot flashes"'],
        "resistance": ['"ESR1 mutation"', '"endocrine resistance"', "Y537S", "D538G"],
    },
    "Vepdegestrant (ER degrader)": {
        "drug_terms": ['"vepdegestrant"', '"ARV-471"', '"PROTAC"'],
        "genes": ["ESR1"],
        "resistance": ['"endocrine resistance"', '"ESR1 mutation"'],
    },
    "Checkpoint inhibitors": {
        "drug_terms": ['"pembrolizumab"', '"atezolizumab"', '"immune checkpoint"'],
        "genes": ["PDCD1", "CD274"],
        "toxicity": ['"immune-related adverse"', "thyroiditis", "colitis", "myocarditis"],
        "resistance": ['"immunotherapy resistance"', '"immune evasion"', '"cold tumor"'],
    },
    "Margetuximab / Fc-engineered": {
        "drug_terms": ['"margetuximab"', '"zanidatamab"'],
        "genes": ["ERBB2"],
        "toxicity": ['"infusion reaction"'],
        "resistance": ['"HER2 resistance"'],
    },
}

# Novelty vocabulary for the per-gene "what else is being aimed at this" pass.
#
# Every term here has to name a MODALITY, not a molecule that appears in any
# paper. A bare "mRNA" was tried and pulled an ordinary cell-line study about
# transcript levels into the frontier list — the word is in half of molecular
# biology. Terms must be specific enough that their presence is itself the
# claim of novelty.
NOVELTY = ['"first-in-class"', '"novel mechanism"', "degrader", "PROTAC", "bispecific",
           '"CAR-T"', '"CAR T"', '"mRNA vaccine"', '"molecular glue"',
           '"antibody-drug conjugate"', '"targeted protein degradation"',
           '"radioligand"', '"trispecific"']

# --------------------------------------------------------------------------
# Tier and species. Deterministic and explainable — no model involved.
# --------------------------------------------------------------------------

# Order is precedence, and it is not obvious. Animal terms come first because
# "patient-derived xenograft" contains "patient". Clinical terms come SECOND,
# ahead of cell-line terms, because a paper that studied people and also ran
# cell work is human evidence — checking cell lines first mislabelled a Phase I
# study in patients as a cell-line paper.
SPECIES_KEYWORDS = [
    ("mouse", ("mice", "murine", " mouse", "xenograft", " pdx ", "in vivo model",
               "biodistribution")),
    ("human", ("patients", "participants", "randomised", "randomized", "cohort",
               "phase 1", "phase i ", "phase 2", "phase ii", "phase 3", "phase iii",
               "real-world", "enrolled", "clinical trial")),
    ("cell line", ("cell line", "cell lines", "in vitro", "organoid", "spheroid")),
]


def classify(item: dict) -> dict[str, Any]:
    """Evidence tier, species, and where the species inference came from."""
    pts = [str(p).lower() for p in ((item.get("pubTypeList") or {}).get("pubType") or [])]
    if item.get("source") == "PPR" or "preprint" in pts:
        tier = "preprint"
    elif "meta-analysis" in pts:
        tier = "meta-analysis"
    elif "systematic review" in pts:
        tier = "systematic review"
    elif any("randomized controlled trial" in p or "clinical trial" in p for p in pts):
        tier = "trial"
    elif "review" in pts:
        tier = "review"
    else:
        tier = "primary"

    mesh = [(m or {}).get("descriptorName", "")
            for m in ((item.get("meshHeadingList") or {}).get("meshHeading") or [])]

    species, source = None, None
    if mesh:
        has_human = "Humans" in mesh
        has_animal = "Animals" in mesh or "Mice" in mesh
        if has_human and not has_animal:
            species, source = "human", "mesh"
        elif has_animal:
            species, source = "mouse", "mesh"

    # MeSH indexing lags, and it lags worst on exactly the newest papers — 37%
    # of 2026 papers had none. So fall back to the text, and record that the
    # inference is the weaker kind.
    if not species:
        txt = ((item.get("title") or "") + " " + (item.get("abstractText") or "")).lower()
        for name, words in SPECIES_KEYWORDS:
            if any(w in txt for w in words):
                species, source = name, "keywords"
                break

    # A registered clinical trial was run in people, whatever else its abstract
    # mentions. This overrides a keyword guess but never overrides MeSH.
    if tier == "trial" and source != "mesh":
        species, source = "human", "pubtype"

    return {
        "tier": tier,
        "peer_reviewed": tier != "preprint",
        "species": species or "unclear",
        "species_from": source or "none",
    }


def _clean_title(s: str | None) -> str:
    """Strip the markup Europe PMC embeds in titles (<i>ERBB2</i>, <sup>).

    Unescape BEFORE stripping: the tags arrive HTML-escaped, so removing real
    tags first leaves `&lt;i&gt;` to be unescaped into visible `<i>` afterwards.
    """
    t = s or ""
    for a, b in (("&lt;", "<"), ("&gt;", ">"), ("&quot;", '"'), ("&apos;", "'")):
        t = t.replace(a, b)
    t = re.sub(r"<[^>]+>", "", t)
    return re.sub(r"\s+", " ", t.replace("&amp;", "&")).strip()


def _terms_present(item: dict, terms: list[str]) -> list[str]:
    """Which of the query's terms this paper ACTUALLY contains.

    Europe PMC searches full text, so a paper can satisfy a query without any
    of the terms appearing in its title or abstract, and a query listing three
    synonyms matches on any one of them. Reporting the whole query as the match
    reason would therefore assert things the paper does not say — which is the
    exact failure this column exists to prevent.
    """
    hay = ((item.get("title") or "") + " " + (item.get("abstractText") or "")).lower()
    found = [t.strip('"') for t in terms if t.strip('"').lower() in hay]
    return found[:4]


def _record(item: dict, kind: str, subject: str, terms: list[str]) -> dict[str, Any]:
    cls = classify(item)
    return {
        "id": item.get("id"),
        "src": item.get("source"),
        "pmid": item.get("pmid"),
        "doi": item.get("doi"),
        "title": _clean_title(item.get("title")),
        "journal": ((item.get("journalInfo") or {}).get("journal") or {}).get("title"),
        "date": item.get("firstPublicationDate"),
        "authors": (item.get("authorString") or "")[:80],
        "oa": item.get("isOpenAccess") == "Y",
        "url": ("https://europepmc.org/article/" + str(item.get("source", "MED")) +
                "/" + str(item.get("id"))),
        # why this paper is on this page at all
        "kind": kind,
        "subject": subject,
        "matched": _terms_present(item, terms),
        **cls,
    }


DRAWBACKS_BY_CANCER["breast"] = DRAWBACKS

DRAWBACKS_BY_CANCER["prostate"] = {
    "AR pathway inhibitors (abiraterone, enzalutamide)": {
        "drug_terms": ['"abiraterone"', '"enzalutamide"', '"apalutamide"', '"darolutamide"',
                       '"androgen receptor pathway inhibitor"'],
        "genes": ["AR"],
        "toxicity": ["fatigue", "hypertension", "falls", '"cognitive"', '"seizure"'],
        "resistance": ['"AR-V7"', '"AR splice variant"', '"AR amplification"',
                       '"lineage plasticity"', '"glucocorticoid receptor"'],
    },
    "PARP inhibitors": {
        "drug_terms": ['"olaparib"', '"rucaparib"', '"niraparib"', '"talazoparib"',
                       '"PARP inhibitor"'],
        "genes": ["PARP1", "BRCA2", "BRCA1", "ATM", "CDK12"],
        "toxicity": ["anaemia", "anemia", "thrombocytopenia",
                     '"myelodysplastic syndrome"', "fatigue"],
        "resistance": ['"BRCA reversion"', '"reversion mutation"',
                       '"restoration of homologous recombination"'],
    },
    "PSMA radioligand therapy": {
        "drug_terms": ['"177Lu-PSMA-617"', '"lutetium-177 PSMA"', '"Pluvicto"',
                       '"radioligand therapy"'],
        "genes": ["FOLH1"],
        "toxicity": ["xerostomia", '"dry mouth"', "myelosuppression",
                     "thrombocytopenia", '"renal toxicity"'],
        "resistance": ['"PSMA loss"', '"PSMA-negative"', '"PSMA heterogeneity"',
                       '"FDG-positive"'],
    },
    "Taxanes": {
        "drug_terms": ['"docetaxel"', '"cabazitaxel"'],
        "genes": ["TUBB"],
        "toxicity": ['"peripheral neuropathy"', "neutropenia",
                     '"febrile neutropenia"', "alopecia"],
        "resistance": ['"taxane resistance"', '"tubulin"',
                       '"AR nuclear translocation"', '"ABCB1"'],
    },
    "Androgen deprivation (GnRH)": {
        "drug_terms": ['"androgen deprivation therapy"', '"leuprolide"',
                       '"degarelix"', '"relugolix"'],
        "genes": [],
        "toxicity": ['"bone mineral density"', '"cardiovascular"',
                     '"metabolic syndrome"', '"hot flashes"', "sarcopenia"],
        "resistance": ['"castration resistance"', '"time to castration resistance"'],
    },
    "Radium-223": {
        "drug_terms": ['"radium-223"', '"Xofigo"', '"radium dichloride"'],
        "genes": [],
        "toxicity": ["myelosuppression", '"fracture"', "thrombocytopenia"],
        "resistance": ['"visceral progression"'],
    },
    "AKT inhibition (capivasertib)": {
        "drug_terms": ['"capivasertib"', '"ipatasertib"', '"AKT inhibitor"'],
        "genes": ["AKT1", "PTEN", "PIK3CA"],
        "toxicity": ["hyperglycaemia", "hyperglycemia", "rash", "diarrhoea", "diarrhea"],
        "resistance": ['"PI3K pathway reactivation"', '"PTEN loss"'],
    },
    "Checkpoint inhibitors": {
        "drug_terms": ['"pembrolizumab"', '"nivolumab"', '"checkpoint inhibitor"'],
        "genes": ["PDCD1", "MSH2"],
        "toxicity": ['"immune-related adverse event"', "colitis",
                     "pneumonitis", "thyroiditis"],
        "resistance": ['"immune cold"', '"tumor microenvironment"',
                       '"low tumor mutational burden"'],
    },
    "T-cell engagers (STEAP1)": {
        "drug_terms": ['"xaluritamig"', '"AMG 509"', '"STEAP1"', '"T-cell engager"'],
        "genes": ["STEAP1"],
        "toxicity": ['"cytokine release syndrome"', '"neurotoxicity"', "fatigue"],
        "resistance": ['"antigen loss"', '"T cell exhaustion"'],
    },
    "CYP11A1 inhibition (opevesostat)": {
        "drug_terms": ['"opevesostat"', '"MK-5684"', '"CYP11A1"'],
        "genes": ["CYP17A1"],
        "toxicity": ['"adrenal insufficiency"', '"glucocorticoid replacement"',
                     "hypertension", "hypokalaemia", "hypokalemia"],
        "resistance": ['"steroidogenesis"', '"androgen synthesis"'],
    },
}


DRAWBACKS_BY_CANCER["lung"] = {
    "EGFR TKIs (osimertinib and earlier)": {
        "drug_terms": ['"osimertinib"', '"erlotinib"', '"gefitinib"', '"afatinib"', '"dacomitinib"',
                       '"lazertinib"', '"EGFR-TKI"', '"EGFR tyrosine kinase inhibitor"'],
        "genes": ["EGFR"],
        "toxicity": ["rash", "diarrhoea", "diarrhea", '"interstitial lung disease"', '"QT prolongation"'],
        "resistance": ['"MET amplification"', "C797S", '"small cell transformation"',
                       '"histologic transformation"', '"osimertinib resistance"'],
    },
    "Amivantamab (EGFR-MET bispecific)": {
        "drug_terms": ['"amivantamab"', '"Rybrevant"'],
        "genes": ["EGFR", "MET"],
        "toxicity": ['"infusion-related reaction"', "paronychia", "rash", '"venous thromboembolism"'],
        "resistance": ['"amivantamab resistance"', '"MET amplification"'],
    },
    "ALK TKIs": {
        "drug_terms": ['"alectinib"', '"lorlatinib"', '"brigatinib"', '"crizotinib"', '"ALK inhibitor"'],
        "genes": ["ALK"],
        "toxicity": ["hyperlipidemia", "hypercholesterolemia", '"cognitive effects"', "edema",
                     "bradycardia"],
        "resistance": ["G1202R", '"compound mutations"', '"ALK resistance"', '"lorlatinib resistance"'],
    },
    "KRAS G12C inhibitors": {
        "drug_terms": ['"sotorasib"', '"adagrasib"', '"divarasib"', '"KRAS G12C inhibitor"'],
        "genes": ["KRAS"],
        "toxicity": ["hepatotoxicity", '"liver enzyme"', "diarrhoea", "diarrhea"],
        "resistance": ['"acquired RAS"', '"KRAS amplification"', '"adaptive resistance"',
                       '"KRAS G12C inhibitor resistance"'],
    },
    "Checkpoint inhibitors": {
        "drug_terms": ['"pembrolizumab"', '"nivolumab"', '"atezolizumab"', '"durvalumab"',
                       '"cemiplimab"', '"immune checkpoint inhibitor"'],
        "genes": ["PDCD1", "CD274"],
        "toxicity": ["pneumonitis", '"immune-related adverse"', "colitis", "thyroiditis"],
        "resistance": ["STK11", "KEAP1", '"primary resistance"', '"acquired resistance to immunotherapy"'],
    },
    "TROP2 and HER2 antibody-drug conjugates": {
        "drug_terms": ['"datopotamab deruxtecan"', '"Dato-DXd"', '"trastuzumab deruxtecan"', '"T-DXd"',
                       '"sacituzumab govitecan"'],
        "genes": ["TACSTD2", "ERBB2"],
        "toxicity": ['"interstitial lung disease"', "stomatitis", "neutropenia"],
        "resistance": ['"ADC resistance"', '"payload resistance"', '"TROP2 expression"'],
    },
    "Tarlatamab (DLL3 T-cell engager)": {
        "drug_terms": ['"tarlatamab"', '"Imdelltra"', '"DLL3-targeted"'],
        "genes": ["DLL3"],
        "toxicity": ['"cytokine release syndrome"', "ICANS", "neurotoxicity"],
        "resistance": ['"DLL3 loss"', '"antigen escape"', '"DLL3 expression"'],
    },
    "HER2, ROS1, RET and MET TKIs": {
        "drug_terms": ['"zongertinib"', '"sevabertinib"', '"repotrectinib"', '"zidesamtinib"',
                       '"selpercatinib"', '"pralsetinib"', '"capmatinib"', '"tepotinib"', '"entrectinib"'],
        "genes": ["ERBB2", "ROS1", "RET", "MET"],
        "toxicity": ["hepatotoxicity", "edema", "dizziness", "hypertension"],
        "resistance": ['"solvent front"', '"on-target resistance"', '"bypass signaling"'],
    },
}


# Colorectal papers say "mCRC" and name the colon or rectum on their own at least
# as often as they say "colorectal cancer".
SCOPE_BY_CANCER["colorectal"] = (
    '(TITLE_ABS:"colorectal cancer" OR TITLE_ABS:"colorectal carcinoma" OR TITLE_ABS:"mCRC" '
    'OR TITLE_ABS:"colon cancer" OR TITLE_ABS:"rectal cancer")')

DRAWBACKS_BY_CANCER["colorectal"] = {
    "Anti-EGFR antibodies (cetuximab, panitumumab)": {
        "drug_terms": ['"cetuximab"', '"panitumumab"', '"anti-EGFR"'],
        "genes": ["EGFR"],
        "toxicity": ['"acneiform"', "rash", "hypomagnesemia", "hypomagnesaemia", '"infusion reaction"'],
        "resistance": ['"acquired RAS"', '"EGFR ectodomain"', '"anti-EGFR resistance"', "rechallenge"],
    },
    "BRAF V600E: encorafenib with cetuximab": {
        "drug_terms": ['"encorafenib"', '"BRAF inhibitor"'],
        "genes": ["BRAF", "EGFR"],
        "toxicity": ["fatigue", "arthralgia", "nausea", "rash"],
        "resistance": ['"MAPK reactivation"', '"pathway reactivation"', '"acquired resistance"'],
    },
    "KRAS G12C inhibitors with anti-EGFR antibodies": {
        "drug_terms": ['"sotorasib"', '"adagrasib"', '"divarasib"', '"KRAS G12C inhibitor"'],
        "genes": ["KRAS", "EGFR"],
        "toxicity": ["hepatotoxicity", "diarrhoea", "diarrhea", "rash"],
        "resistance": ['"acquired RAS"', '"KRAS amplification"', '"adaptive resistance"',
                       '"receptor tyrosine kinase"'],
    },
    "Checkpoint inhibitors in MSI-H disease": {
        "drug_terms": ['"pembrolizumab"', '"nivolumab"', '"ipilimumab"', '"immune checkpoint inhibitor"'],
        "genes": ["PDCD1"],
        "toxicity": ['"immune-related adverse"', "colitis", "hepatitis", "thyroiditis"],
        "resistance": ['"primary resistance"', "B2M", "JAK1", "pseudoprogression"],
    },
    # Widened 2026-09-14 by the user's call: the four drug names matched 3 toxicity
    # and 1 resistance paper. Trastuzumab (the MOUNTAINEER partner) and the disease
    # descriptors took the drug-only hits from 66 to 126, and the papers kept only
    # from 4 to about 6 — the class is small because this literature is.
    "HER2-directed therapy": {
        "drug_terms": ['"tucatinib"', '"trastuzumab deruxtecan"', '"T-DXd"', '"pertuzumab"',
                       '"trastuzumab"', '"HER2-positive"', '"HER2-amplified"'],
        "genes": ["ERBB2"],
        "toxicity": ["diarrhoea", "diarrhea", '"interstitial lung disease"', "hepatotoxicity"],
        "resistance": ['"HER2 loss"', '"HER2 heterogeneity"', '"RAS mutation"'],
    },
    "Anti-angiogenic agents": {
        "drug_terms": ['"bevacizumab"', '"ramucirumab"', '"aflibercept"', '"regorafenib"', '"fruquintinib"'],
        "genes": ["VEGFA", "KDR"],
        "toxicity": ["hypertension", "proteinuria", "haemorrhage", "hemorrhage",
                     '"gastrointestinal perforation"', '"hand-foot skin reaction"'],
        # The first three matched 0 papers since 2024 (probed 2026-09-14); papers name
        # the drug, not the class. Each added phrase matched 1-8 on its own.
        "resistance": ['"anti-angiogenic resistance"', '"antiangiogenic resistance"', '"VEGF resistance"',
                       '"bevacizumab resistance"', '"resistance to bevacizumab"', '"regorafenib resistance"',
                       '"fruquintinib resistance"', '"acquired resistance"'],
    },
    # The problem the rectal filing raises is whether a complete response lasts
    # without surgery. Tumour regrowth after one is a failure of the drug, so it
    # is filed as resistance; the matched term on each paper says which it was.
    "Dostarlimab in repair-deficient rectal cancer": {
        "drug_terms": ['"dostarlimab"', '"PD-1 blockade"'],
        "genes": ["PDCD1"],
        "toxicity": ['"immune-related adverse"'],
        "resistance": ["regrowth", '"local recurrence"'],
    },
}


# Melanoma is named in full in its own literature -- there is no abbreviation to
# add, and "melanoma" alone already scopes to the disease.
SCOPE_BY_CANCER["melanoma"] = '(TITLE_ABS:"melanoma")'

# Every term below was counted against Europe PMC on 2026-09-15 before being
# written here, and the ones that matched nothing were dropped rather than left
# in to look thorough: "hand-foot", "BRAF amplification", "MEK1 mutation" and
# "dabrafenib resistance" for the BRAF class, "acquired resistance to
# immunotherapy" for the checkpoint class, "antigen loss" and "tumor escape" for
# the cell-therapy class, "cellulitis", "antiviral immunity" and "viral
# clearance" for the viruses, "antigen escape" and "uveal melanoma resistance"
# for tebentafusp, and every toxicity term tried for the vaccines -- that class
# therefore asks about resistance only, which is what its literature is.
DRAWBACKS_BY_CANCER["melanoma"] = {
    "BRAF and MEK inhibitors": {
        "drug_terms": ['"vemurafenib"', '"dabrafenib"', '"encorafenib"', '"trametinib"', '"cobimetinib"',
                       '"binimetinib"', '"BRAF inhibitor"', '"MEK inhibitor"'],
        "genes": ["BRAF", "MAP2K1", "MAP2K2"],
        "toxicity": ['"cutaneous squamous cell carcinoma"', "pyrexia", "photosensitivity", "rash", "arthralgia",
                     '"serous retinopathy"', '"QT prolongation"'],
        "resistance": ['"MAPK reactivation"', '"acquired resistance"', '"NRAS mutation"', '"vemurafenib resistance"',
                       '"BRAF inhibitor resistance"', '"BRAF/MEK inhibitor resistance"'],
    },
    "Anti-PD-1 and anti-CTLA-4 antibodies": {
        "drug_terms": ['"pembrolizumab"', '"nivolumab"', '"ipilimumab"', '"immune checkpoint inhibitor"',
                       '"PD-1 blockade"'],
        "genes": ["PDCD1", "CTLA4"],
        "toxicity": ['"immune-related adverse"', "colitis", "hypophysitis", "thyroiditis", "myocarditis",
                     "pneumonitis"],
        "resistance": ['"primary resistance"', "B2M", "JAK1", '"interferon signaling"', '"antigen presentation"',
                       '"immunotherapy resistance"'],
    },
    "LAG-3 blockade": {
        "drug_terms": ['"relatlimab"', '"Opdualag"', '"LAG-3 blockade"', '"anti-LAG-3"'],
        "genes": ["LAG3", "PDCD1"],
        "toxicity": ['"immune-related adverse"', "myocarditis", "hepatitis"],
        "resistance": ['"LAG-3 expression"', '"acquired resistance"', '"T cell exhaustion"'],
    },
    "Tumour-infiltrating lymphocyte therapy": {
        "drug_terms": ['"lifileucel"', '"tumor-infiltrating lymphocyte"', '"tumour-infiltrating lymphocyte"',
                       '"TIL therapy"', '"adoptive cell therapy"'],
        "genes": [],
        "toxicity": ['"capillary leak"', "cytopenia", "lymphodepletion", '"interleukin-2"', '"febrile neutropenia"'],
        "resistance": ['"T cell exhaustion"', '"TIL persistence"'],
    },
    "Oncolytic viruses": {
        "drug_terms": ['"talimogene laherparepvec"', '"T-VEC"', '"oncolytic virus"', '"oncolytic viral"',
                       '"RP1"', '"vusolimogene"'],
        "genes": [],
        "toxicity": ['"injection site"', "pyrexia", '"herpetic infection"'],
        "resistance": ['"interferon"', '"resistance to oncolytic"'],
    },
    "Tebentafusp in uveal melanoma": {
        "drug_terms": ['"tebentafusp"', '"KIMMTRAK"', '"gp100"', '"ImmTAC"'],
        "genes": ["PMEL"],
        "toxicity": ['"cytokine release syndrome"', "rash", "pyrexia", "hypotension"],
        "resistance": ['"HLA loss"', '"acquired resistance"'],
    },
    "Individualised mRNA neoantigen vaccines": {
        "drug_terms": ['"mRNA-4157"', '"intismeran"', '"individualized neoantigen"', '"neoantigen vaccine"',
                       '"personalized cancer vaccine"', '"V940"'],
        "genes": [],
        "resistance": ['"antigen presentation"'],
    },
}


class Literature:
    def __init__(self, http: Http, since: str = SINCE, cancer_id: str = "breast",
                 cancer_name: str = "breast cancer"):
        self.http = http
        self.since = since
        self.cancer_id = cancer_id
        self.cancer_name = cancer_name
        # Every search is scoped to one disease. An empty set here would
        # silently return an empty literature lens rather than an error.
        self.drawbacks = DRAWBACKS_BY_CANCER.get(cancer_id, {})
        if not self.drawbacks:
            log.warning("%s: no agent classes declared, literature will be empty",
                        cancer_id)

    def _search(self, query: str) -> list[dict]:
        try:
            data = self.http.get(SEARCH, params={
                "query": query, "format": "json", "pageSize": str(MAX_PER_QUERY),
                "resultType": "core", "sort": "P_PDATE_D desc",
            })
        except Exception as exc:  # noqa: BLE001 — one bad query must not kill the run
            log.warning("literature: query failed (%s): %s", exc, query[:110])
            return []
        return ((data or {}).get("resultList") or {}).get("result") or []

    def _dated(self, clause: str) -> str:
        scope = SCOPE_BY_CANCER.get(self.cancer_id, SCOPE)
        return f"({clause}) AND {scope} AND (FIRST_PDATE:[{self.since} TO 2099-12-31])"

    def drawback_papers(self) -> list[dict]:
        """Papers addressing a known problem with a current agent."""
        out: list[dict] = []
        for agent, spec in self.drawbacks.items():
            drugs = " OR ".join("TITLE_ABS:" + t for t in spec["drug_terms"])
            for kind in ("toxicity", "resistance"):
                terms = spec.get(kind) or []
                if not terms:
                    continue
                probs = " OR ".join("TITLE_ABS:" + t for t in terms)
                q = self._dated(f"({drugs}) AND ({probs})")
                for item in self._search(q):
                    rec = _record(item, kind, agent, terms)
                    rec["genes"] = spec.get("genes") or []
                    out.append(rec)
        return out

    def new_approach_papers(self, genes: list[str]) -> list[dict]:
        """Novel modalities aimed at a target, whatever is approved for it today."""
        novelty = " OR ".join("TITLE_ABS:" + t for t in NOVELTY)
        out: list[dict] = []
        for gene in genes:
            q = self._dated(f"(TITLE_ABS:{gene}) AND ({novelty})")
            for item in self._search(q):
                rec = _record(item, "new-approach", gene, NOVELTY)
                rec["genes"] = [gene]
                out.append(rec)
        return out

    def collect(self, genes: list[str], gene_to_nodes: dict[str, list[str]] | None = None
                ) -> dict[str, Any]:
        """`gene_to_nodes` maps a gene to the subtype nodes whose drugs hit it,
        so a paper about T-DXd's lung toxicity can surface on the HER2-positive
        subtype without the renderer having to guess the connection."""
        papers = self.drawback_papers() + self.new_approach_papers(genes)

        # Attach subtype nodes via the agents that target the paper's genes.
        # This is the one join that lets the Subtypes lens show literature:
        # paper -> gene -> the agents against it -> the subtypes those are used in.
        nmap = gene_to_nodes or {}
        for p in papers:
            nodes: list[str] = []
            for g in p.get("genes") or []:
                for n in nmap.get(g, []):
                    if n not in nodes:
                        nodes.append(n)
            p["nodes"] = nodes

        # One paper can answer several queries (an ADC review hits both T-DXd
        # toxicity and sacituzumab toxicity). Keep one record and accumulate the
        # reasons, rather than showing it three times as three findings.
        merged: dict[str, dict] = {}
        for p in papers:
            key = (p.get("doi") or p.get("pmid") or p.get("id") or p["title"]).lower()
            if key in merged:
                m = merged[key]
                m.setdefault("also", [])
                tag = {"kind": p["kind"], "subject": p["subject"]}
                if tag not in m["also"] and (p["kind"], p["subject"]) != (m["kind"], m["subject"]):
                    m["also"].append(tag)
                for g in p.get("genes") or []:
                    if g not in m["genes"]:
                        m["genes"].append(g)
                for n in p.get("nodes") or []:
                    if n not in m.setdefault("nodes", []):
                        m["nodes"].append(n)
            else:
                merged[key] = p

        final = sorted(merged.values(), key=lambda p: (p.get("date") or ""), reverse=True)

        by_tier: dict[str, int] = {}
        by_kind: dict[str, int] = {}
        by_species: dict[str, int] = {}
        for p in final:
            by_tier[p["tier"]] = by_tier.get(p["tier"], 0) + 1
            by_kind[p["kind"]] = by_kind.get(p["kind"], 0) + 1
            by_species[p["species"]] = by_species.get(p["species"], 0) + 1

        return {
            "source": "Europe PMC (PubMed + PMC + preprint servers)",
            "api": SEARCH,
            "licence": "metadata under Europe PMC terms; abstracts not redistributed here",
            "since": self.since,
            "n_papers": len(final),
            "n_raw_hits": len(papers),
            "agents_queried": sorted(self.drawbacks),
            "genes_queried": genes,
            "by_tier": by_tier,
            "by_kind": by_kind,
            "by_species": by_species,
            "caveat": "A dated snapshot of a moving literature. Evidence tier and species are "
                      "shown on every row because most of this is preclinical. Nothing here is "
                      "ranked by promise — that cannot be computed.",
            "papers": final,
        }
