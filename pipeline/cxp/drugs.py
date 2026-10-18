"""Read the curated drug pipeline and join it to ClinicalTrials.gov.

../cancer_research/pipeline.csv is hand-maintained: one row per agent, with the
target it hits, its modality, the trial that carries it, and how far along it
is. That file already existed and was cited in the README as documentation --
this module is what finally makes it reachable from the app.

The join is on nct_id against pipeline/facts/<cancer>.trials.json, which supplies
recruitment status, sponsor, enrolment and dates straight from the registry. So
"phase 3" in the CSV is a curator's claim, and the registry record beside it is
the check on that claim -- the same curated-vs-computed discipline the driver
frequencies already follow.
"""
from __future__ import annotations

import csv
import json
import logging
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

log = logging.getLogger("cxp.drugs")

# CSV subtype label -> node ids in data/<cancer>.js. One agent can serve several
# nodes; a label naming a receptor context rather than one box maps to all of it.
#
# Per cancer, and note WHICH axis each cancer's labels land on: breast's map onto
# the receptor axis, because that is what picks its drugs. Prostate's map onto
# the disease-state axis, because that is what picks its drugs. The difference is
# not cosmetic — it is the clearest evidence that the state axis is the treatment
# axis for this disease.
SUBTYPE_TO_NODES_BY_CANCER: dict[str, dict[str, list[str]]] = {}
TARGET_TO_GENES_BY_CANCER: dict[str, dict[str, list[str]]] = {}

SUBTYPE_TO_NODES = {
    "HR+/HER2-": ["hr-pos-her2-neg"],
    "TNBC": ["tnbc"],
    "HER2+": ["her2-pos-hr-neg", "triple-positive"],
    "Triple positive": ["triple-positive"],
    "HER2-low": ["her2-low"],
    "HER2-low / HER2-ultralow": ["her2-low", "her2-ultralow"],
    "HER2-negative (HR+ or TNBC)": ["hr-pos-her2-neg", "tnbc"],
}

# CSV target label -> HGNC symbols the target actually is. The CSV names targets
# the way a clinician does ("CDK4/6", "pan-HER (TKI)"); the protein view needs
# genes. Keeping the mapping explicit beats string-matching it at render time —
# and every label must appear here, because a label that silently maps to
# nothing removes real programs from the crowded-vs-open analysis. Eight of the
# HER2 agents are named by mechanism rather than by target, so string matching
# on "HER2" alone would have dropped half of them.
TARGET_TO_GENES = {
    # HER2 family — mechanism-named, all ERBB2
    "HER2": ["ERBB2"],
    "HER2 (Fc-engineered)": ["ERBB2"],
    "HER2 (TKI)": ["ERBB2"],
    "HER2 biparatopic": ["ERBB2"],
    "HER2 dimerization": ["ERBB2"],
    "HER2 + ER": ["ERBB2", "ESR1"],
    "HER2/EGFR (TKI)": ["ERBB2", "EGFR"],
    "pan-HER (TKI)": ["ERBB2", "ERBB3", "EGFR"],

    # ER
    "ER (oral SERD)": ["ESR1"],
    "ER (PROTAC degrader)": ["ESR1"],

    # cell cycle
    "CDK4/6": ["CDK4", "CDK6"],
    "CDK2/4/6": ["CDK4", "CDK6"],
    "CDK4-selective": ["CDK4"],
    "CDK4-selective (CDK6-sparing)": ["CDK4"],
    "PLK4": ["PLK4"],

    # PI3K / AKT / mTOR
    "PI3K-alpha": ["PIK3CA"],
    "PI3K-gamma": ["PIK3CG"],
    "pan-class I PI3K + mTORC1/2": ["PIK3CA", "MTOR"],
    "AKT": ["AKT1"],
    "AKT1-selective": ["AKT1"],
    "mTOR": ["MTOR"],

    # DNA repair
    "PARP": ["PARP1"],

    # surface antigens / immune
    "TROP2": ["TACSTD2"],
    "TROP2 + PD-1": ["TACSTD2", "PDCD1"],
    "PD-1": ["PDCD1"],
    "PD-L1": ["CD274"],
    "platinum + PD-1": ["PDCD1"],
    "CCR5": ["CCR5"],
    "IL-2 (beta-enhanced superkine)": ["IL2RB"],
}

# Ordered worst -> best so "furthest along" is a max().
PHASE_RANK = {
    "discontinued": -1,
    "preclinical": 0,
    "phase 1": 1,
    "phase 1/2": 2,
    "phase 2": 3,
    "phase 2/3": 4,
    "phase 3": 5,
    "filed": 6,
    "approved": 7,
}


def _clean(s: str | None) -> str:
    return (s or "").strip()


def read_csv(path: Path, cancer_id: str = "breast") -> list[dict[str, Any]]:
    if not path.exists():
        log.warning("drugs: %s not found — the drug layer will be empty", path)
        return []
    with path.open(encoding="utf-8-sig", newline="") as fh:
        rows = list(csv.DictReader(fh))

    out = []
    for i, r in enumerate(rows):
        phase = _clean(r.get("phase")).lower()
        target = _clean(r.get("target"))
        subtype = _clean(r.get("subtype"))
        if not _clean(r.get("drug_name")):
            continue
        out.append({
            "id": f"drug-{i}",
            "name": _clean(r.get("drug_name")),
            "code": _clean(r.get("code_name")),
            "target": target,
            "genes": _target_map(cancer_id).get(target, []),
            "modality": _clean(r.get("modality")),
            "company": _clean(r.get("company")),
            "partner": _clean(r.get("partner")),
            "phase": phase,
            "phase_rank": PHASE_RANK.get(phase, 0),
            "trial_name": _clean(r.get("trial_name")),
            "nct_id": _clean(r.get("nct_id")),
            "line": _clean(r.get("line_of_therapy")),
            "status": _clean(r.get("status")),
            "readout": _clean(r.get("key_readout")),
            "readout_date": _clean(r.get("readout_date")),
            "subtype_label": subtype,
            "nodes": _subtype_map(cancer_id).get(subtype, []),
            "receptor_context": _clean(r.get("receptor_context")),
            "source_url": _clean(r.get("source_url")),
        })
    return out


def attach_registry(drugs: list[dict], trials_path: Path) -> dict[str, Any]:
    """Fold the ClinicalTrials.gov record onto each agent, where one exists."""
    reg: dict[str, Any] = {}
    if trials_path.exists():
        reg = (json.loads(trials_path.read_text(encoding="utf-8")) or {}).get("trials") or {}

    matched = 0
    for d in drugs:
        rec = reg.get(d["nct_id"])
        if not rec:
            continue
        matched += 1
        d["registry"] = {
            "title": rec.get("brief_title"),
            "overall_status": rec.get("overall_status"),
            "phase": rec.get("phase"),
            "sponsor": rec.get("lead_sponsor"),
            "enrollment": rec.get("enrollment"),
            "start_date": rec.get("start_date"),
            "primary_completion_date": rec.get("primary_completion_date"),
            "last_update_posted": rec.get("last_update_posted"),
            "url": f"https://clinicaltrials.gov/study/{d['nct_id']}",
        }
        # A curated phase that disagrees with the registry is worth surfacing
        # rather than silently preferring one of them.
        curated, registered = d["phase"], _clean(rec.get("phase")).lower()
        if curated and registered and curated not in ("approved", "filed"):
            if curated.replace(" ", "") != registered.replace(" ", ""):
                d["phase_disagreement"] = {"curated": curated, "registry": registered}
    return {"matched": matched, "of": len(drugs), "registry_entries": len(reg)}


SUBTYPE_TO_NODES_BY_CANCER["breast"] = SUBTYPE_TO_NODES
TARGET_TO_GENES_BY_CANCER["breast"] = TARGET_TO_GENES

SUBTYPE_TO_NODES_BY_CANCER["prostate"] = {
    "mCRPC": ["state-crpc", "state-crpc-adeno"],
    "nmCRPC": ["state-crpc"],
    "mHSPC": ["state-metastatic", "state-hspc"],
    "nmHSPC": ["state-confined"],
    "Any metastatic": ["state-metastatic"],
    "HRR-mutated mCRPC": ["state-crpc-adeno"],
    "BRCA-mutated mCRPC": ["state-crpc-adeno"],
    "BRCA-mutated mHSPC": ["state-metastatic"],
    "PSMA-positive mCRPC": ["state-crpc-adeno"],
    "PSMA-positive mHSPC": ["state-metastatic"],
    "PTEN-deficient mHSPC": ["state-metastatic"],
    "MMR-deficient": ["state-crpc-adeno"],
}

TARGET_TO_GENES_BY_CANCER["prostate"] = {
    "AR": ["AR"],
    "CYP17A1": ["CYP17A1"],
    "CYP11A1": ["CYP11A1"],
    "GNRHR": ["GNRHR"],
    "PARP": ["PARP1"],
    "AKT": ["AKT1"],
    "PD-1": ["PDCD1"],
    # PSMA is the protein; FOLH1 is the gene. The radioligands are named for
    # the protein everywhere in the literature, so the CSV says PSMA-by-another
    # -name and this is where the two are reconciled.
    "FOLH1": ["FOLH1"],
    "STEAP1": ["STEAP1"],
    "TUBB": ["TUBB"],
    # Sipuleucel-T targets prostatic acid phosphatase, whose gene symbol is ACPP
    # (now ACP3). Kept as ACPP because that is what the sequence databases use.
    "ACPP": ["ACPP"],
    # Radium-223 has no molecular target at all: it is a calcium mimic that goes
    # where bone is remodelling. Mapping it to a gene would invent a mechanism.
    "bone-seeking alpha": [],
}


# Lung maps onto BOTH molecular axes and histology: a targeted drug is selected
# by its driver node, a checkpoint inhibitor by PD-L1 band or histology, and a
# small-cell drug by the histology node. That spread is itself the finding —
# lung is the one cancer here treated by the molecular classification.
SUBTYPE_TO_NODES_BY_CANCER["lung"] = {
    "EGFR-mutant": ["drv-egfr"],
    "EGFR-mutant, resected": ["drv-egfr"],
    "EGFR-mutant, after EGFR TKI": ["res-treated"],
    "EGFR exon 20 insertion": ["drv-egfr-ex20"],
    "ALK-positive": ["drv-alk"],
    "ALK-positive, resected": ["drv-alk"],
    "ROS1-positive": ["drv-ros1"],
    "RET fusion": ["drv-ret"],
    "MET exon 14": ["drv-met"],
    "BRAF V600E": ["drv-braf"],
    "KRAS G12C": ["drv-kras"],
    "HER2-mutant": ["drv-erbb2"],
    "NTRK fusion": ["drv-other"],
    "NSCLC, PD-L1 high": ["pdl1-high"],
    "NSCLC, PD-L1 1% or more": ["pdl1-low", "pdl1-high"],
    "NSCLC, any PD-L1": ["pdl1-root"],
    "Non-squamous NSCLC": ["hist-adeno", "hist-nsclc-other", "hist-large"],
    "Squamous NSCLC": ["hist-squamous"],
    "NSCLC, resectable or stage III": ["hist-nsclc"],
    "NSCLC, after platinum": ["hist-nsclc"],
    "Small cell lung cancer": ["hist-sclc"],
}

TARGET_TO_GENES_BY_CANCER["lung"] = {
    "EGFR": ["EGFR"],
    "EGFR + MET": ["EGFR", "MET"],
    "ALK": ["ALK"],
    "ALK + ROS1": ["ALK", "ROS1"],
    "ROS1": ["ROS1"],
    "ROS1 + TRK": ["ROS1", "NTRK1"],
    "RET": ["RET"],
    "MET": ["MET"],
    "BRAF + MEK": ["BRAF", "MAP2K1"],
    "KRAS G12C": ["KRAS"],
    "HER2": ["ERBB2"],
    "HER2 (TKI)": ["ERBB2"],
    "TRK": ["NTRK1"],
    "PD-1": ["PDCD1"],
    "PD-L1": ["CD274"],
    "PD-1 + CTLA-4": ["PDCD1", "CTLA4"],
    "DLL3": ["DLL3"],
    "TROP2": ["TACSTD2"],
    "VEGFR2": ["KDR"],
    # Lurbinectedin acts on transcription and DNA rather than on one protein a
    # cancer gene encodes; mapping it to a gene would invent a mechanism.
    "transcription (alkylating)": [],
}


# Colorectal maps onto three axes, and the split is the finding: the antibody,
# BRAF, KRAS and HER2 combinations land on driver-class nodes, the checkpoint
# inhibitors on repair status, and the anti-angiogenic and late-line agents —
# which no tumour test selects — on the whole disease. A tissue-agnostic label
# names no colorectal node, so it maps to the whole disease too; its subtype
# label says why. HER2-positive by the label's test is drawn on the amplified
# node, which is the nearest box the cohort can compute, not the same test.
SUBTYPE_TO_NODES_BY_CANCER["colorectal"] = {
    "RAS wild type": ["drv-ras-wt"],
    "KRAS G12C": ["drv-kras-g12c"],
    "BRAF V600E": ["drv-braf-v600e"],
    "HER2-positive, RAS wild type": ["drv-her2-amp"],
    "HER2-positive (IHC 3+), tissue-agnostic": ["drv-her2-amp"],
    "MSI-H or dMMR": ["rep-dmmr"],
    "dMMR, tissue-agnostic": ["rep-dmmr"],
    "dMMR/MSI-H locally advanced rectal": ["rep-dmmr", "site-rectum"],
    "MSS or MSI-low metastatic": ["rep-pmmr"],
    "Metastatic, any molecular class": ["site-root"],
    "NTRK fusion, tissue-agnostic": ["site-root"],
    "RET fusion, tissue-agnostic": ["site-root"],
}

TARGET_TO_GENES_BY_CANCER["colorectal"] = {
    "EGFR": ["EGFR"],
    "KRAS G12C + EGFR": ["KRAS", "EGFR"],
    "BRAF + EGFR": ["BRAF", "EGFR"],
    "HER2": ["ERBB2"],
    "HER2 (TKI + antibody)": ["ERBB2"],
    # From each label's mechanism section, read 2026-09-14: bevacizumab binds VEGF;
    # ziv-aflibercept binds VEGF-A, VEGF-B and PlGF; ramucirumab binds VEGFR2;
    # fruquintinib inhibits VEGFR-1, -2 and -3.
    "VEGF-A": ["VEGFA"],
    "VEGF-A, VEGF-B, PlGF": ["VEGFA", "VEGFB", "PGF"],
    "VEGFR2": ["KDR"],
    "VEGFR1-3": ["FLT1", "KDR", "FLT4"],
    # Regorafenib's label lists twenty kinases, RET and BRAF among them. It is
    # mapped to the VEGF receptors only: counted as a BRAF or RET program it would
    # sit beside encorafenib and selpercatinib, which a test selects and it does not.
    "multikinase (VEGFR1-3 and others)": ["FLT1", "KDR", "FLT4"],
    # Trifluridine is built into DNA and tipiracil stops its breakdown. Neither
    # acts on a protein a cancer gene encodes.
    "DNA synthesis (nucleoside analogue)": [],
    "DNA synthesis + VEGF-A": ["VEGFA"],
    "PD-1": ["PDCD1"],
    "PD-1 + CTLA-4": ["PDCD1", "CTLA4"],
    "TRK": ["NTRK1"],
    "RET": ["RET"],
    # No source read for this project names zanzalintinib's kinases (the registry
    # record calls it XL092 and says no more), so only its partner is mapped.
    "multikinase + PD-L1": ["CD274"],
}


# Melanoma maps onto both axes, and the split says what each drug is chosen by:
# the BRAF and MEK combinations land on driver-class nodes, because a V600 result
# is what selects them; everything else lands on the pathway axis, because no
# tumour test selects it — a checkpoint antibody is labelled for melanoma, the
# oncolytic virus for melanoma with injectable lesions, and tebentafusp for uveal
# melanoma in patients whose BLOOD carries HLA-A*02:01. Adjuvant indications name
# a stage rather than a subtype, so they sit on the whole disease too; the two
# labels that say "cutaneous" (ipilimumab's adjuvant indication, Tudriqev) name
# the cutaneous node instead.
SUBTYPE_TO_NODES_BY_CANCER["melanoma"] = {
    "BRAF V600E": ["drv-braf-v600e"],
    "BRAF V600E or V600K": ["drv-braf-v600"],
    "BRAF V600E or V600K, resected": ["drv-braf-v600"],
    "BRAF V600": ["drv-braf-v600"],
    "Unresectable or metastatic melanoma": ["path-root"],
    "Resected melanoma, node-positive": ["path-cutaneous"],
    "Resected melanoma, stage III or IV": ["path-root"],
    "Resected melanoma, stage IIB or IIC": ["path-root"],
    "Resected melanoma, stage IIB, IIC or III": ["path-root"],
    "Melanoma recurrent after surgery": ["path-root"],
    "Cutaneous melanoma after PD-1": ["path-cutaneous"],
    "After a PD-1 antibody": ["path-root"],
    "HLA-A*02:01-positive uveal melanoma": ["path-uveal"],
    "Resected cutaneous melanoma, stage IIB to IV": ["path-cutaneous"],
}

TARGET_TO_GENES_BY_CANCER["melanoma"] = {
    "BRAF": ["BRAF"],
    # Each MEK inhibitor's label mechanism section, read 2026-09-15, says MEK1
    # AND MEK2: trametinib, cobimetinib and binimetinib alike. Mapping "MEK" to
    # MAP2K1 only would leave MAP2K2 looking undrugged.
    "MEK": ["MAP2K1", "MAP2K2"],
    "BRAF + MEK": ["BRAF", "MAP2K1", "MAP2K2"],
    "PD-L1 + BRAF + MEK": ["CD274", "BRAF", "MAP2K1", "MAP2K2"],
    "CTLA-4": ["CTLA4"],
    "PD-1": ["PDCD1"],
    "PD-1 + CTLA-4": ["PDCD1", "CTLA4"],
    "PD-1 + LAG-3": ["PDCD1", "LAG3"],
    # Tebentafusp's other arm binds CD3, which is a complex of several chains and
    # the label names none of them. PMEL is what it recognises, so PMEL is what
    # is mapped; inventing a chain would invent a target.
    "gp100 peptide-HLA-A*02:01 + CD3": ["PMEL"],
    # A virus and a patient's own T cells act on no protein a cancer gene
    # encodes. Declared as mapping to nothing, which is a statement, not a gap.
    "oncolytic virus (HSV-1, GM-CSF)": [],
    "oncolytic virus (HSV-1) + PD-1": ["PDCD1"],
    "autologous tumour-infiltrating lymphocytes": [],
    "individualised neoantigen mRNA + PD-1": ["PDCD1"],
}


def _subtype_map(cancer_id: str) -> dict[str, list[str]]:
    return SUBTYPE_TO_NODES_BY_CANCER.get(cancer_id, {})


def _target_map(cancer_id: str) -> dict[str, list[str]]:
    return TARGET_TO_GENES_BY_CANCER.get(cancer_id, {})


def collect(csv_path: Path, trials_path: Path, cancer_id: str = "breast") -> dict[str, Any]:
    drugs = read_csv(csv_path, cancer_id)
    join = attach_registry(drugs, trials_path)

    by_gene: dict[str, list[str]] = defaultdict(list)
    for d in drugs:
        for g in d["genes"]:
            by_gene[g].append(d["id"])

    # A target DECLARED as mapping to no gene is a statement, not an
    # omission: radium-223 is a calcium mimic that goes where bone is
    # remodelling, and inventing a gene for it would invent a mechanism.
    # Only labels missing from the map entirely are worth a warning.
    known = _target_map(cancer_id)
    unmapped = sorted({d["target"] for d in drugs
                       if not d["genes"] and d["target"] not in known})
    unmapped_subtypes = sorted({d["subtype_label"] for d in drugs if not d["nodes"]})
    if unmapped:
        log.warning("drugs: %d target label(s) map to no gene: %s", len(unmapped), unmapped)
    if unmapped_subtypes:
        log.warning("drugs: %d subtype label(s) map to no node: %s",
                    len(unmapped_subtypes), unmapped_subtypes)

    return {
        # Printed on the public Targets lens, so they name the source, never a
        # local path or build file (2026-09-28: they showed ../cancer_research/
        # and pipeline/facts/ to every visitor). Named per cancer: these were
        # once literals, and prostate's and lung's lens credited breast's CSV.
        "source": f"curated {cancer_id} drug pipeline",
        "joined_to": "ClinicalTrials.gov registry records, joined by NCT id",
        "n_drugs": len(drugs),
        "registry_matched": join["matched"],
        "phases": dict(Counter(d["phase"] for d in drugs)),
        "modalities": dict(Counter(d["modality"] for d in drugs)),
        "by_gene": {g: ids for g, ids in sorted(by_gene.items())},
        "unmapped_targets": unmapped,
        "unmapped_subtypes": unmapped_subtypes,
        "drugs": drugs,
    }
