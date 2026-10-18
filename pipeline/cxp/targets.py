"""Assemble the target view, and compute where the field is NOT looking.

Per gene this joins five independent sources: UniProt (what the protein is),
cBioPortal (where it is altered, and how often), RCSB (what it looks like),
the curated drug pipeline (what binds it and how far along), and CIViC (what
the evidence says). None of those alone answers "should anyone care about this
target"; together they do.

The four gap surfaces at the bottom are the point of the whole module. A target
page is a lookup. The value for someone looking for a new idea is in the
mismatches -- a frequently-altered gene nobody is drugging, a target with eight
programs beside an equally common one with none, an agent approved in one
subtype whose target is just as altered in another, and biology that is
published but has never reached a trial.

Everything here is arithmetic over sourced numbers. None of it is a
recommendation, and the repositioning list in particular is a list of questions,
not of answers.
"""
from __future__ import annotations

import json
import logging
import re
from collections import defaultdict
from pathlib import Path
from typing import Any

log = logging.getLogger("cxp.targets")

# The actionable set: every gene with an agent against it in the curated
# pipeline, plus the ones whose UNdruggability is itself the story (TP53, MYC,
# RB1 -- transcription factors and tumour suppressors with no pocket).
TARGET_GENES_BY_CANCER: dict[str, list[str]] = {}
PDB_CHOICE_BY_CANCER: dict[str, dict[str, str]] = {}

TARGET_GENES = [
    "ESR1", "ERBB2", "ERBB3", "PIK3CA", "PIK3R1", "AKT1", "PTEN", "MTOR",
    "CDK4", "CDK6", "CCND1", "RB1", "BRCA1", "BRCA2", "PARP1",
    "TACSTD2", "CD274", "PDCD1", "TP53", "MYC", "AR", "FGFR1",
]

# Curated choice of the structure that tells each target's story, verified
# against RCSB at fetch time so a wrong id surfaces as a wrong title.
PDB_CHOICE = {
    "PIK3CA": "4JPS",   # PI3Kalpha with isoform-selective inhibitors
    "ERBB2": "1N8Z",    # HER2 ectodomain + trastuzumab Fab
    "ERBB3": "4P59",    # HER3 ectodomain + Fab
    "ESR1": "3ERT",     # ERalpha LBD + 4-hydroxytamoxifen
    "AKT1": "4GV1",     # PKBalpha + AZD5363 (capivasertib)
    "MTOR": "4JSV",     # mTOR kinase
    "CDK6": "5L2I",     # CDK6 + palbociclib
    "CDK4": "2W96",     # CDK4 + D-type cyclin
    "CCND1": "2W96",    # the same complex, seen from the cyclin side
    "PARP1": "7KK4",    # PARP1 catalytic domain + olaparib
    "BRCA1": "1JNX",    # BRCA1 BRCT repeats
    "BRCA2": "1MJE",    # BRCA2-DSS1-ssDNA
    "TP53": "1TUP",     # p53 core domain on DNA -- shows why hotspots are contacts
    "MYC": "1NKP",      # Myc-Max on DNA -- shows why there is no pocket
    "RB1": "1GUX",      # RB pocket + LXCXE motif
    "PTEN": "1D5R",     # PTEN phosphatase
    "TACSTD2": "7PEE",  # Trop2 ectodomain -- the ADC's address
    "CD274": "5X8L",    # PD-L1 + atezolizumab
    "PDCD1": "5GGS",    # PD-1 + pembrolizumab Fab
    "AR": "2AM9",       # AR LBD + testosterone
    "FGFR1": "4V05",    # FGFR1 + AZD4547
}

# A gene counts as meaningfully altered above this share in at least one subtype.
ALTERED_PCT = 5.0
# Two frequencies within this ratio count as comparable for repositioning.
COMPARABLE = 0.6
# Below this many mutated samples, a gene with approved drugs is flagged as a
# cohort blind spot rather than as uninteresting.
BLIND_SPOT_N = 5
# A subtype below this many profiled tumours cannot set a gene's peak frequency.
# normal-like carries n=8 here, which is enough to produce a 50% that means
# nothing; the existing audit already tracks the same LOW N problem.
MIN_DENOM = 20

# WHY a drug against this target works — and therefore what evidence would ever
# show the target mattering. Getting this wrong is not cosmetic: TROP2 and ER
# are never "mutated", so a landscape that ranks targets purely by genomic
# alteration would say nobody should drug them, which is the opposite of the
# truth. Trodelvy works because TROP2 is EXPRESSED; olaparib works because a
# DIFFERENT gene (BRCA1/2) is broken.
#
#   genomic          the target gene itself is mutated or amplified
#   expression       protein level selects the patient; genomics is silent
#   pathway          the target is rarely altered, the pathway around it is
#   synthetic-lethal a lesion in another gene creates the dependency
#   unselected       no tumour test selects the drug at all (colorectal's
#                    anti-angiogenic agents)
#   marker           a test of something other than the target selects it, with
#                    no synthetic-lethal mechanism (PD-1 blockade by repair status);
#                    biomarker_gene then names the test, not a gene
#   germline         a test of the PATIENT selects it, not of the tumour
#                    (melanoma's PMEL: tebentafusp needs HLA-A*02:01); the tumour's
#                    alteration frequency says nothing about who is eligible, so
#                    it is never comparable. The dataset's targets[].germline
#                    carries the test and the share of patients positive.
#                    A synthetic-lethal target chosen by a germline test (breast's
#                    PARP1) keeps its own basis and carries the entry alone.
TARGET_GENES_BY_CANCER["breast"] = TARGET_GENES
PDB_CHOICE_BY_CANCER["breast"] = PDB_CHOICE

# Twelve of these are shared with breast and computed by the same code: AR,
# PTEN, TP53, RB1, BRCA1/2, PARP1, AKT1, PIK3CA, MYC, CDK12, ATM.
TARGET_GENES_BY_CANCER["prostate"] = [
    "AR", "FOLH1", "PARP1", "BRCA1", "BRCA2", "ATM", "CDK12", "CHEK2", "PALB2",
    "PTEN", "AKT1", "PIK3CA", "TP53", "RB1", "MYC", "SPOP", "FOXA1", "CHD1",
    "STEAP1", "CYP17A1", "MSH2", "ERG",
]

PDB_CHOICE_BY_CANCER["prostate"] = {
    "AR": "2AM9",       # androgen receptor LBD + testosterone
    "PARP1": "7KK4",    # PARP1 catalytic domain + olaparib
    "BRCA1": "1JNX",
    "BRCA2": "1MJE",
    "TP53": "1TUP",
    "MYC": "1NKP",
    "PTEN": "1D5R",
    "AKT1": "4GV1",     # + AZD5363, which is capivasertib -- now a prostate drug
    "RB1": "1GUX",
    "PIK3CA": "4JPS",
}


# Lung: the ten genes selected by an alteration, the four selected by protein
# (an ADC address, the checkpoint pair, a T-cell engager's antigen), and the ten
# most altered genes with nothing — or nothing established — aimed at them.
# NRG1, TACSTD2 and DLL3 are on neither MSK panel, so they carry no frequency.
TARGET_GENES_BY_CANCER["lung"] = [
    "EGFR", "KRAS", "ALK", "ROS1", "MET", "RET", "BRAF", "ERBB2", "NTRK1", "NRG1",
    "TACSTD2", "CD274", "PDCD1", "DLL3",
    "TP53", "STK11", "KEAP1", "SMARCA4", "CDKN2A", "RB1", "NFE2L2", "SOX2", "FGFR1", "PIK3CA",
]

# Each id checked against RCSB's own title on 2026-09-13. DLL3 has none here:
# the candidate tried was a TCR complex, and no structure is better than a wrong one.
PDB_CHOICE_BY_CANCER["lung"] = {
    "EGFR": "4ZAU",     # AZD9291 (osimertinib) bound to EGFR
    "ALK": "2XP2",      # ALK kinase + crizotinib
    "KRAS": "6OIM",     # KRAS G12C covalently bound to AMG 510 (sotorasib)
    "RET": "7JU6",      # RET kinase + selpercatinib
    "MET": "2WGJ",      # c-Met kinase + PF-02341066 (crizotinib)
    "ROS1": "3ZBF",     # ROS1 kinase + crizotinib
    "BRAF": "4XV2",     # BRAF V600E + dabrafenib
    "ERBB2": "3PP0",    # HER2 kinase domain
    "NTRK1": "4AOJ",    # TrkA + AZ-23
    "NRG1": "1HAE",     # heregulin-alpha EGF-like domain
    "STK11": "2WTK",    # LKB1-STRADalpha-MO25alpha
    "KEAP1": "1U6D",    # Keap1 Kelch domain
    "NFE2L2": "2FLU",   # Keap1 Kelch bound to the Nrf2 Neh2 peptide
    "SOX2": "1GT0",     # POU/HMG/DNA ternary complex
    "SMARCA4": "2GRC",  # BRG1 bromodomain
    "CDKN2A": "1BI7",   # CDK6-p16INK4a
    "TACSTD2": "7PEE",  # Trop2 ectodomain -- the ADC's address
    "CD274": "5X8L",    # PD-L1 + atezolizumab
    "PDCD1": "5GGS",    # PD-1 + pembrolizumab Fab
    "TP53": "1TUP",
    "RB1": "1GUX",
    "PIK3CA": "4JPS",
    "FGFR1": "4V05",
}


BASIS_BY_CANCER: dict[str, dict] = {}

BASIS = {
    "ERBB2":   ("genomic", None, "Amplified and over-expressed; both the alteration and the "
                                 "protein level select therapy, which is why HER2-low exists."),
    "PIK3CA":  ("genomic", None, "Activating hotspot mutations, directly targeted by alpelisib."),
    "AKT1":    ("genomic", None, "E17K and pathway activation select capivasertib."),
    "ERBB3":   ("genomic", None, "Mutations activate HER2/HER3 heterodimers."),
    "FGFR1":   ("genomic", None, "Amplification is the selector."),
    "ESR1":    ("expression", None, "ER protein by IHC selects endocrine therapy. Point mutations "
                                    "matter only later, as acquired resistance."),
    "TACSTD2": ("expression", None, "TROP2 is an ADC delivery address, not a driver — expression "
                                    "is the whole selection criterion."),
    "CD274":   ("expression", None, "PD-L1 by IHC (CPS) selects checkpoint blockade."),
    "PDCD1":   ("expression", None, "Target is on the T cell, not the tumour."),
    "AR":      ("expression", None, "AR-positive by IHC defines the LAR TNBC subset."),
    "CDK4":    ("pathway", "CCND1", "Rarely mutated. The dependency comes from cyclin D–CDK4/6–RB "
                                    "deregulation upstream."),
    "CDK6":    ("pathway", "CCND1", "As CDK4 — the pathway is the target, not the gene."),
    "MTOR":    ("pathway", "PIK3CA", "Downstream node; PI3K pathway activation drives the dependency."),
    "CCND1":   ("pathway", None, "Amplified often, but drugged indirectly through CDK4/6."),
    "PARP1":   ("synthetic-lethal", "BRCA1/BRCA2",
                "PARP1 is not the altered gene. Inhibiting it kills cells that have already lost "
                "homologous recombination — the biomarker is BRCA1/2, not PARP1."),
    "BRCA1":   ("synthetic-lethal", "PARP1", "The lesion that creates PARP dependency."),
    "BRCA2":   ("synthetic-lethal", "PARP1", "The lesion that creates PARP dependency."),
    "TP53":    ("genomic", None, "The most altered gene in the disease and still undrugged — no "
                                 "pocket, and restoring a lost function is harder than blocking one."),
    "MYC":     ("genomic", None, "Amplified frequently. A transcription factor with a "
                                 "protein–protein interface rather than a druggable cleft."),
    "RB1":     ("genomic", None, "Loss predicts CDK4/6 inhibitor resistance — informative as a "
                                 "negative biomarker rather than as a target."),
    "PTEN":    ("genomic", "AKT1", "Loss activates PI3K/AKT; addressed downstream rather than directly."),
    "PIK3R1":  ("genomic", "PIK3CA", "Regulatory subunit; mutations activate the same pathway as PIK3CA."),
}


BASIS_BY_CANCER["breast"] = BASIS

# Why each prostate target is selected. Same three-part shape: how selection is
# made, which gene carries the biomarker if it is not this one, and one line of
# reasoning. "genomic" means an alteration in this gene picks the drug;
# "expression" means a protein level does; "pathway" means the dependency is
# upstream; "synthetic-lethal" means the drug needs a DIFFERENT gene to be broken.
BASIS_BY_CANCER["prostate"] = {
    "AR":      ("expression", None, "The receptor is the target whether or not it is altered. "
                                    "Alterations appear after treatment, not before it."),
    "FOLH1":   ("expression", None, "PSMA is an address for a radioactive payload, not a driver. "
                                    "Selection is by PET imaging, not by sequencing."),
    "STEAP1":  ("expression", None, "A surface antigen for a T-cell engager; expression is the "
                                    "whole selection criterion."),
    "CYP17A1": ("pathway", None, "Not a cancer gene. Abiraterone blocks the enzyme that makes "
                                 "androgens, starving the receptor rather than blocking it."),
    "PARP1":   ("synthetic-lethal", "BRCA2", "Not altered here and drugged anyway: PARP inhibition "
                                             "only works once homologous recombination is already lost."),
    "BRCA2":   ("genomic", None, "A deleterious alteration selects a PARP inhibitor, and is also "
                                 "the strongest inherited risk factor for this cancer."),
    "BRCA1":   ("genomic", None, "As BRCA2, and rarer in prostate."),
    "ATM":     ("genomic", None, "Counted in the HRR panel that selects PARP inhibitors, on "
                                 "weaker evidence than BRCA2."),
    "CDK12":   ("genomic", None, "Biallelic loss defines an immunologically distinct group; part "
                                 "of the HRR panel."),
    "CHEK2":   ("genomic", None, "HRR panel gene; a moderate-penetrance risk allele as well."),
    "PALB2":   ("genomic", None, "HRR panel gene."),
    "PTEN":    ("genomic", None, "Deletion selects capivasertib with abiraterone. The gene itself "
                                 "cannot be restored; what it releases can be blocked."),
    "AKT1":    ("pathway", "PTEN", "Rarely mutated here. The dependency comes from PTEN loss "
                                   "upstream, which is what the biomarker actually measures."),
    "PIK3CA":  ("pathway", "PTEN", "Same pathway, same upstream selector."),
    "TP53":    ("genomic", None, "The most altered gene in advanced disease and the one with "
                                 "nothing aimed at it."),
    "RB1":     ("genomic", None, "Undruggable, and the loudest warning of lineage change."),
    "MYC":     ("genomic", None, "Amplified in a quarter of castration-resistant tumours; a "
                                 "protein-protein interface rather than a pocket."),
    "SPOP":    ("genomic", None, "Defines a molecular class and selects nothing. Included because "
                                 "what it predicts is interesting, not because it is druggable."),
    "FOXA1":   ("genomic", None, "Reshapes where the androgen receptor can bind rather than how "
                                 "much of it there is."),
    "CHD1":    ("genomic", None, "The characteristic SPOP co-deletion."),
    "MSH2":    ("genomic", None, "Mismatch-repair loss selects pembrolizumab, tissue-agnostically. "
                                 "Rare in prostate."),
    "ERG":     ("genomic", None, "The commonest event in the disease and not a target: a fusion "
                                 "product with no drug against it."),
}


# Why each lung target is selected. Kept to the selection logic; the figures
# live in the overlay, where they carry their denominators.
BASIS_BY_CANCER["lung"] = {
    "EGFR":    ("genomic", None, "Sensitising mutations select an EGFR inhibitor; exon 20 insertions "
                                 "select different drugs."),
    "KRAS":    ("genomic", None, "Only the G12C allele is drugged. The rest of KRAS is still open."),
    "ALK":     ("genomic", None, "A fusion selects an ALK inhibitor. Mutation calls cannot see it."),
    "ROS1":    ("genomic", None, "A fusion selects a ROS1 inhibitor; several also act on ALK or TRK."),
    "MET":     ("genomic", None, "Exon 14 skipping selects a MET inhibitor; amplification is also a "
                                 "route of resistance to EGFR drugs."),
    "RET":     ("genomic", None, "A fusion selects a selective RET inhibitor."),
    "BRAF":    ("genomic", None, "V600E selects combined BRAF and MEK inhibition."),
    "ERBB2":   ("genomic", None, "In lung it is HER2 mutation, not amplification, that the recent "
                                 "approvals select on."),
    "NTRK1":   ("genomic", None, "A fusion selects a TRK inhibitor, whatever the tumour type."),
    "NRG1":    ("genomic", None, "Fusions signal through HER3. Not on the panels behind the cohort "
                                 "here, so the track is empty by construction."),
    "TACSTD2": ("expression", None, "An antibody-drug conjugate's address, not a driver."),
    "CD274":   ("expression", None, "PD-L1 by IHC (tumour proportion score) guides checkpoint blockade."),
    "PDCD1":   ("expression", None, "The target is on the T cell, not the tumour."),
    "DLL3":    ("expression", None, "A surface antigen on small cell lung cancer, used as a T-cell "
                                    "engager's address."),
    "TP53":    ("genomic", None, "The most altered gene in lung cancer and still undrugged."),
    "STK11":   ("genomic", None, "Loss is studied as a marker of poorer response to checkpoint "
                                 "blockade; not itself a target."),
    "KEAP1":   ("genomic", None, "Loss switches on NRF2 signalling; a marker, not a target."),
    "SMARCA4": ("genomic", None, "A chromatin-remodelling loss with nothing aimed at it."),
    "CDKN2A":  ("genomic", None, "Deleted often, in squamous disease especially."),
    "RB1":     ("genomic", None, "Lost in nearly all small cell lung cancer; in EGFR-mutant disease, "
                                 "a warning of lineage change."),
    # The frequencies behind this panel come from MSK's adenocarcinomas, so the
    # squamous-cell genes below read low for a reason that is the cohort's, not
    # the disease's. Said in the gene's own line, where the low number is shown.
    "NFE2L2":  ("genomic", None, "The transcription factor KEAP1 holds back, activated by mutation "
                                 "in squamous disease — which the adenocarcinoma cohort here does not contain."),
    "SOX2":    ("genomic", None, "Amplified in squamous cell carcinoma, which the adenocarcinoma cohort "
                                 "here does not contain; a transcription factor with no pocket."),
    "FGFR1":   ("genomic", None, "Amplified in squamous cell carcinoma, which the adenocarcinoma cohort "
                                 "here does not contain."),
    "PIK3CA":  ("genomic", None, "Amplified in squamous disease and mutated in a minority of "
                                 "adenocarcinomas."),
}


# Colorectal: the plan's 22 cohort genes plus PDCD1 and VEGFA, without which the
# checkpoint inhibitors (selected by the repair axis) and bevacizumab would have
# no gene card. Their frequencies are whatever the MSK panels measured.
TARGET_GENES_BY_CANCER["colorectal"] = [
    "KRAS", "NRAS", "BRAF", "ERBB2", "NTRK1", "RET",
    "EGFR", "KDR", "VEGFA", "PDCD1",
    "MLH1", "MSH2", "MSH6", "PMS2", "POLE",
    "APC", "TP53", "SMAD4", "PIK3CA", "FBXW7", "CTNNB1", "SOX9", "AMER1", "TCF7L2",
]

# Each id checked against RCSB's own title on 2026-09-14. No encorafenib-bound
# BRAF entry was found, so BRAF shows the V600E kinase with dabrafenib — a drug
# whose own label rules colorectal cancer out, which BRAF's line below says.
# POLE has none: the proofreading-domain searches returned bacterial enzymes.
PDB_CHOICE_BY_CANCER["colorectal"] = {
    "EGFR": "1YY9",     # EGFR extracellular domain + cetuximab Fab
    "KRAS": "6OIM",     # KRAS G12C covalently bound to AMG 510 (sotorasib)
    "NRAS": "3CON",     # NRAS GTPase bound to GDP
    "BRAF": "4XV2",     # BRAF V600E kinase + dabrafenib
    "ERBB2": "1N8Z",    # HER2 extracellular domain + trastuzumab Fab, tucatinib's partner
    "NTRK1": "4AOJ",    # TrkA + AZ-23
    "RET": "7JU6",      # RET kinase + selpercatinib
    "KDR": "3V2A",      # VEGFR-2 bound to VEGF-A -- the contact the anti-angiogenic agents block
    "VEGFA": "6BFT",    # VEGF + a bevacizumab Fab variant
    "PDCD1": "5GGS",    # PD-1 + pembrolizumab Fab
    "MLH1": "4P7A",     # human MLH1
    "MSH2": "2O8B",     # MutSalpha (MSH2/MSH6) on a G-T mispair
    "MSH6": "2O8B",     # the same complex, seen from MSH6
    "PMS2": "1H7S",     # PMS2 N-terminal fragment
    "APC": "1TH1",      # beta-catenin + a phosphorylated APC 20-residue repeat
    "CTNNB1": "1JDH",   # beta-catenin + TCF4
    "TCF7L2": "1JDH",   # the same complex, TCF4 is TCF7L2
    "AMER1": "4YJE",    # APC armadillo repeats + an AMER1 fragment
    "SMAD4": "1DD1",    # SMAD4 active fragment
    "FBXW7": "2OVP",    # Skp1-Fbw7
    "SOX9": "4EUW",     # SOX9 HMG domain on DNA
    "TP53": "1TUP",
    "PIK3CA": "4JPS",
}

# Why each colorectal target is selected. MLH1, MSH2, MSH6, PMS2 and POLE carry
# the caveat that matters most here: the driver-class nodes their figures come
# from leave MSI-H and POLE-mutant tumours out by design, so a low figure is the
# classifier's, not the disease's. EGFR carries no biomarker gene on purpose:
# naming KRAS/NRAS would make the gap arithmetic call NRAS "addressed via EGFR",
# when the EGFR antibodies are exactly what an NRAS mutation rules out.
BASIS_BY_CANCER["colorectal"] = {
    "KRAS":    ("genomic", None, "Only G12C has approved drugs in colorectal cancer, each given with an "
                                 "anti-EGFR antibody. Any other KRAS change rules those antibodies out."),
    "NRAS":    ("genomic", None, "A mutation rules out the anti-EGFR antibodies, whose panitumumab label "
                                 "defines wild type in both KRAS and NRAS. No agent here is aimed at NRAS."),
    "BRAF":    ("genomic", None, "V600E selects encorafenib, labelled only with cetuximab. The dabrafenib "
                                 "label says it is not indicated for colorectal cancer because of known "
                                 "intrinsic resistance to BRAF inhibition."),
    "ERBB2":   ("genomic", None, "HER2 positivity selects tucatinib with trastuzumab only in RAS wild-type "
                                 "disease; trastuzumab deruxtecan is labelled for HER2-positive (IHC 3+) "
                                 "solid tumours."),
    "NTRK1":   ("genomic", None, "A fusion selects a TRK inhibitor under a label written for any solid tumour."),
    "RET":     ("genomic", None, "A fusion selects selpercatinib under a label written for any solid tumour."),
    "EGFR":    ("expression", None, "The test that decides eligibility is for RAS, not EGFR; cetuximab's label "
                                    "also asks for EGFR-expressing disease."),
    "KDR":     ("unselected", None, "No tumour test selects ramucirumab, fruquintinib or regorafenib. The "
                                    "receptor is on the cells lining blood vessels, not on the tumour."),
    "VEGFA":   ("unselected", None, "Bevacizumab and ziv-aflibercept bind the growth factor itself, and no "
                                    "tumour test selects either."),
    "PDCD1":   ("marker", "mismatch repair status",
                "The target is on the T cell. In colorectal cancer the labels select by mismatch repair "
                "deficiency or MSI-H, not by PD-L1."),
    "MLH1":    ("genomic", None, "One of the four repair proteins on the stain. MSI-H tumours are outside "
                                 "the driver-class nodes these figures come from."),
    "MSH2":    ("genomic", None, "One of the four repair proteins on the stain. MSI-H tumours are outside "
                                 "the driver-class nodes these figures come from."),
    "MSH6":    ("genomic", None, "One of the four repair proteins on the stain. MSI-H tumours are outside "
                                 "the driver-class nodes these figures come from."),
    "PMS2":    ("genomic", None, "One of the four repair proteins on the stain. MSI-H tumours are outside "
                                 "the driver-class nodes these figures come from."),
    "POLE":    ("genomic", None, "Proofreading-domain mutations leave a tumour hypermutated. POLE-mutant "
                                 "tumours are outside the driver-class nodes these figures come from."),
    "APC":     ("genomic", None, "A tumour suppressor in WNT signalling. What is lost cannot be blocked, "
                                 "and no agent here is aimed at it."),
    "TP53":    ("genomic", None, "Still undrugged: restoring a lost function is harder than blocking one."),
    "SMAD4":   ("genomic", None, "A tumour suppressor in TGF-beta signalling, lost rather than switched on, "
                                 "with no agent here aimed at it."),
    "PIK3CA":  ("genomic", None, "Activating mutations, as in breast cancer, with no agent here aimed at "
                                 "them in colorectal cancer."),
    "FBXW7":   ("genomic", None, "A tumour suppressor that marks growth proteins for destruction; no agent "
                                 "here is aimed at it."),
    "CTNNB1":  ("genomic", None, "Beta-catenin, which APC normally helps break down; no agent here is "
                                 "aimed at it."),
    "SOX9":    ("genomic", None, "A transcription factor; no agent here is aimed at it."),
    "AMER1":   ("genomic", None, "Binds APC in the complex that breaks beta-catenin down; no agent here is "
                                 "aimed at it."),
    "TCF7L2":  ("genomic", None, "TCF4, the transcription factor beta-catenin binds; no agent here is "
                                 "aimed at it."),
}


# Melanoma: the plan's 24. Six selected by an alteration or carrying resistance,
# four selected by no tumour test at all (the checkpoint targets, and PMEL, which
# a test of the PATIENT selects), six the uveal and mucosal drivers, and eight
# altered across the pathways with nothing aimed at them.
TARGET_GENES_BY_CANCER["melanoma"] = [
    "BRAF", "NRAS", "KIT", "MAP2K1", "MAP2K2", "NF1",
    "PMEL", "PDCD1", "CTLA4", "LAG3",
    "GNAQ", "GNA11", "SF3B1", "BAP1", "EIF1AX", "CYSLTR2",
    "CDKN2A", "CDK4", "CCND1", "TERT", "PTEN", "TP53", "MITF", "MDM2",
]

# Each id checked against RCSB's own title on 2026-09-15. GNA11 has none: every
# search returned another protein, and no structure is better than a wrong one.
PDB_CHOICE_BY_CANCER["melanoma"] = {
    "BRAF": "4XV2",     # BRAF V600E kinase + dabrafenib
    "NRAS": "3CON",     # NRAS GTPase bound to GDP
    "KIT": "1T46",      # KIT autoinhibited, with imatinib
    "MAP2K1": "3EQC",   # MEK1 ternary complex with an inhibitor
    "MAP2K2": "1S9I",   # MEK2 with a bound ligand
    "NF1": "1NF1",      # the GAP-related domain -- the RAS brake this loses
    "PMEL": "6VM7",     # a T-cell receptor on HLA-A2 presenting a gp100 peptide
    "PDCD1": "5GGS",    # PD-1 + pembrolizumab Fab
    "CTLA4": "5TRU",    # CTLA-4 + ipilimumab
    "LAG3": "9BF9",     # LAG-3 bound to HLA-DR1, the contact relatlimab blocks
    "GNAQ": "3AH8",     # Galpha-q beta gamma with the inhibitor YM-254890
    "SF3B1": "6EN4",    # SF3b core + a splicing modulator
    "BAP1": "8SVF",     # BAP1/ASXL1 on a ubiquitinated nucleosome
    "EIF1AX": "1D7Q",   # human translation initiation factor eIF1A
    "CYSLTR2": "6RZ9",  # the CysLT2 receptor -- not the CysLT1 entries beside it
    "CDKN2A": "1BI7",   # CDK6-p16INK4a
    "CDK4": "2W96",     # CDK4 + a D-type cyclin
    "CCND1": "2W96",    # the same complex, seen from the cyclin side
    "TERT": "5UGW",     # the human telomerase thumb domain
    "PTEN": "1D5R",
    "TP53": "1TUP",
    "MITF": "4ATI",     # MITF on its M-box DNA motif
    "MDM2": "1YCR",     # MDM2 holding the p53 transactivation domain
}

# Why each melanoma target is selected, from the US labels read 2026-09-15.
# Melanoma is the first dataset where the commonest selector is NO tumour test:
# every checkpoint antibody is labelled for the disease, not for a marker, and
# PMEL is chosen by genotyping the patient's blood. The `germline` basis is
# phase 6's; the renderer refuses to plot an alteration frequency for it.
BASIS_BY_CANCER["melanoma"] = {
    "BRAF":    ("genomic", None, "A V600E or V600K result selects a BRAF inhibitor with a MEK inhibitor. "
                                 "The labels name those two changes, not the gene."),
    "NRAS":    ("genomic", None, "No agent here is aimed at NRAS. It appears instead where a BRAF inhibitor "
                                 "stops working, which is why it sits on the BRAF V600 card."),
    "KIT":     ("genomic", None, "Mutated most often in mucosal melanoma, and no KIT inhibitor carries a US "
                                 "melanoma indication."),
    "MAP2K1":  ("pathway", "BRAF", "MEK1 is what the MEK inhibitors block, but a BRAF result is what selects "
                                   "them; a change in MEK1 selects nothing."),
    "MAP2K2":  ("pathway", "BRAF", "MEK2, blocked by the same drugs and selected by the same BRAF result."),
    "NF1":     ("genomic", None, "Loss releases the brake on RAS. What is lost cannot be blocked, and no agent "
                                 "here is aimed at it."),
    "PMEL":    ("germline", "HLA-A*02:01",
                "Tebentafusp binds a gp100 peptide only where HLA-A*02:01 presents it, so a blood test of the "
                "PATIENT decides eligibility. Nothing measured in the tumour, PMEL included, says who can "
                "receive it, and the dataset's targets[].germline carries the counted share."),
    "PDCD1":   ("unselected", None, "The target is on the T cell. No melanoma label asks for a PD-L1 or any "
                                    "other tumour test before a PD-1 antibody."),
    "CTLA4":   ("unselected", None, "Also on the T cell, and also selected by no tumour test."),
    "LAG3":    ("unselected", None, "The third checkpoint with a melanoma label, given with a PD-1 antibody "
                                    "and selected by no tumour test."),
    "GNAQ":    ("genomic", None, "The hotspot most uveal melanomas carry, with nothing aimed at it. The cohort "
                                 "behind these figures holds skin and unknown-primary melanoma, so the number "
                                 "here is not uveal melanoma's."),
    "GNA11":   ("genomic", "GNAQ", "The same hotspot in the other alpha subunit; the two are counted together "
                                   "on the uveal card and neither is drugged."),
    "SF3B1":   ("genomic", None, "A splicing-factor hotspot in uveal and mucosal melanoma, undrugged."),
    "BAP1":    ("genomic", None, "Lost in much uveal melanoma and read as a prognostic marker, not a target."),
    "EIF1AX":  ("genomic", None, "The third uveal driver, and the one with the least aimed at it."),
    "CYSLTR2": ("genomic", None, "A receptor that switches on the same pathway as GNAQ in a minority of uveal "
                                 "melanomas; on neither MSK panel here, so it carries no frequency."),
    "CDKN2A":  ("genomic", None, "Deleted across every pathway. Its loss is studied as a reason BRAF inhibitors "
                                 "stop working rather than as a target."),
    "CDK4":    ("pathway", "CCND1", "Amplified in acral melanoma. No CDK4/6 inhibitor carries a melanoma "
                                    "indication, so the dependency is shown, not drugged."),
    "CCND1":   ("pathway", None, "Amplified with CDK4 in acral melanoma, and addressed only through CDK4/6."),
    "TERT":    ("genomic", None, "The commonest change in skin melanoma and almost always in the promoter, "
                                 "outside the protein. There is nothing to block."),
    "PTEN":    ("genomic", None, "Loss activates PI3K/AKT. No agent here is aimed at it."),
    "TP53":    ("genomic", None, "Still undrugged: restoring a lost function is harder than blocking one."),
    "MITF":    ("genomic", None, "The melanocyte lineage's master transcription factor, amplified in a minority "
                                 "and with no pocket to bind."),
    "MDM2":    ("genomic", None, "Amplified in acral melanoma, where it holds p53 down."),
}


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def _frequency_index(by_subtype: dict) -> dict[str, dict[str, Any]]:
    """gene -> {by_node, max_pct, max_node, max_metric}.

    A subtype below MIN_DENOM profiled tumours is recorded but never allowed to
    set the peak — otherwise normal-like (n=8) hands PIK3CA a headline 50% that
    is four samples.
    """
    out: dict[str, dict[str, Any]] = {}
    for node_id, node in (by_subtype or {}).items():
        for gene, metrics in (node.get("genes") or {}).items():
            rec = out.setdefault(gene, {"by_node": {}, "max_pct": 0.0,
                                        "max_node": None, "max_metric": None})
            keep = {}
            for metric, val in metrics.items():
                if not val or not val.get("of"):
                    continue
                keep[metric] = val
                # any_loss subsumes deep deletions, so it never sets the peak
                if metric == "any_loss" or val["of"] < MIN_DENOM:
                    continue
                if (val.get("pct") or 0) > rec["max_pct"]:
                    rec["max_pct"] = val["pct"]
                    rec["max_node"] = node_id
                    rec["max_metric"] = metric
            if keep:
                rec["by_node"][node_id] = keep
    return out


def _ihc_for_pam50(concordance: dict) -> dict[str, str]:
    """PAM50 label -> the receptor class most of it actually falls into.

    Used only to stop the repositioning list restating what a drug already does.
    It is a majority mapping over a matrix that exists BECAUSE the two axes
    disagree, so it is a filter, never a claim of equivalence.
    """
    matrix = (concordance or {}).get("matrix") or {}
    out = {}
    for pam50, row in matrix.items():
        if row:
            out[pam50] = max(row.items(), key=lambda kv: kv[1])[0]
    return out


def _gene_records(uniprot, hotspots, structures, drugs, freq, civic_genes,
                  panel: list[str] | None = None,
                  basis: dict | None = None) -> dict[str, Any]:
    by_gene: dict[str, list[dict]] = defaultdict(list)
    for d in drugs.get("drugs") or []:
        for g in d.get("genes") or []:
            by_gene[g].append(d)

    genes: dict[str, Any] = {}
    # The panel is passed in. Reading the module constant here is what made
    # `--cancer prostate targets` emit breast's gene list under prostate's key.
    for sym in (panel if panel is not None else TARGET_GENES):
        agents = sorted(by_gene.get(sym, []), key=lambda d: -d["phase_rank"])
        hs = hotspots.get(sym) or {}
        cv = civic_genes.get(sym) or {}
        fq = freq.get(sym) or {}

        basis_, biomarker, why = (basis or BASIS).get(sym, ("genomic", None, None))
        genes[sym] = {
            "gene": sym,
            "basis": basis_,
            "biomarker_gene": biomarker,
            "why": why,
            "uniprot": (uniprot.get("genes") or {}).get(sym),
            "structure": (structures.get("structures") or {}).get(sym),
            "hotspots": hs.get("hotspots") or [],
            "n_mutated_samples": hs.get("n_mutated_samples"),
            "n_distinct_changes": hs.get("n_distinct_changes"),
            "sequenced_of": hs.get("of"),
            "frequency": fq or None,
            "drugs": [d["id"] for d in agents],
            "n_programs": len(agents),
            "best_phase": agents[0]["phase"] if agents else None,
            "best_phase_rank": agents[0]["phase_rank"] if agents else None,
            "civic": {
                "n_evidence_items": cv.get("n_evidence_items"),
                "n_accepted": cv.get("n_accepted"),
                "best_level": cv.get("best_level"),
                **({"best_level_submitted": cv["best_level_submitted"]}
                   if cv.get("best_level_submitted") else {}),
                "levels": cv.get("levels"),
                "evidence_types": cv.get("evidence_types"),
                "top_therapies": cv.get("top_therapies"),
            } if cv else None,
        }
    _apply_selectors(genes, drugs)
    return genes


_ALLELE_RE = r"\b{}\s+[A-Z]\d+[A-Z]?\b"


def _selector(sym: str, agents: list[dict]) -> str | None:
    """What the approvals against this gene are written on, when every label says.

    'fusion' when each one names a fusion or rearrangement; 'allele' when each
    names one protein change in this gene (KRAS G12C, BRAF V600E). Otherwise
    None, and every metric stays comparable. A gene-level mutation frequency
    cannot answer an allele-written approval, and a mutation frequency is not
    what a fusion-written one selects on: colorectal's KRAS read 91.8% "mutated"
    in the class DEFINED by its other mutations, and lung's RET a 7.0% mutation
    rate beside a fusion-only approval.
    """
    if not agents:
        return None
    texts = [" ".join((d.get("target") or "", d.get("subtype_label") or "",
                       d.get("receptor_context") or "")) for d in agents]
    if all(re.search(r"fusion|rearrange", t, re.I) for t in texts):
        return "fusion"
    pat = re.compile(_ALLELE_RE.format(re.escape(sym)))
    if all(pat.search(t) for t in texts):
        return "allele"
    return None


def _apply_selectors(genes: dict, drugs: dict) -> None:
    """Record each gene's selector, and re-pick a fusion-written gene's peak from fusions only.

    A fusion measured at 0% in every node still gets a node, so the landscape
    plots it at zero rather than calling it unsequenced.
    """
    by_id = {d["id"]: d for d in drugs.get("drugs") or []}
    for sym, g in genes.items():
        agents = [by_id[i] for i in g["drugs"] if i in by_id]
        approved = [d for d in agents if d.get("phase") == "approved"] or agents
        sel = _selector(sym, approved)
        g["selected_on"] = sel
        fq = g.get("frequency")
        if sel != "fusion" or not fq:
            continue
        best_pct, best_node = -1.0, None
        for node_id, metrics in (fq.get("by_node") or {}).items():
            v = metrics.get("fusion")
            if v and (v.get("of") or 0) >= MIN_DENOM and (v.get("pct") or 0) > best_pct:
                best_pct, best_node = v.get("pct") or 0.0, node_id
        fq["max_pct"] = max(best_pct, 0.0)
        fq["max_node"] = best_node
        fq["max_metric"] = "fusion" if best_node else None


# ---------------------------------------------------------------- gap surfaces

def _partners(genes: dict) -> dict[str, set[str]]:
    """Gene -> genes that carry programs on its behalf, in both directions.

    BRCA1 has no agent against BRCA1 — it has olaparib, which hits PARP1. CCND1
    has no agent either; CDK4/6 inhibitors are the answer to cyclin D
    amplification. Calling those two "untargeted" would be the single most
    misleading thing this module could output, so the link is followed forward
    (my biomarker gene) and backward (genes that name me as theirs).
    """
    link: dict[str, set[str]] = {g: set() for g in genes}
    for sym, g in genes.items():
        bm = g.get("biomarker_gene")
        if not bm:
            continue
        for part in [p.strip() for p in bm.replace("/", " ").split()]:
            if part in genes:
                link[sym].add(part)
                link[part].add(sym)
    return link


def _druggable_untargeted(genes: dict) -> dict[str, list[dict]]:
    """Altered often enough to matter, split by whether ANYTHING addresses it."""
    link = _partners(genes)
    direct, indirect = [], []

    for sym, g in genes.items():
        if g["n_programs"]:
            continue
        fq = g.get("frequency") or {}
        pct = fq.get("max_pct") or 0
        if pct < ALTERED_PCT:
            continue
        cv = g.get("civic") or {}
        via = sorted(p for p in link.get(sym, set()) if (genes.get(p) or {}).get("n_programs"))
        row = {
            "gene": sym,
            "basis": g.get("basis"),
            "max_pct": pct,
            "max_node": fq.get("max_node"),
            "max_metric": fq.get("max_metric"),
            "civic_best_level": cv.get("best_level"),
            **({"civic_best_level_submitted": cv["best_level_submitted"]}
               if cv.get("best_level_submitted") else {}),
            "civic_items": cv.get("n_evidence_items"),
            "civic_therapies": (cv.get("top_therapies") or [])[:4],
            "why": g.get("why"),
        }
        if via:
            row["addressed_via"] = via
            row["via_programs"] = sum((genes[p]["n_programs"] or 0) for p in via)
            indirect.append(row)
        else:
            direct.append(row)

    direct.sort(key=lambda d: -d["max_pct"])
    indirect.sort(key=lambda d: -d["max_pct"])
    return {"druggable_untargeted": direct, "addressed_indirectly": indirect}


def _landscape(genes: dict) -> list[dict]:
    """Programs per target against how often the target is altered.

    `comparable` marks whether the x-axis figure means anything for this target.
    Only genomically-selected targets can be placed on an alteration-frequency
    axis at all; TROP2 at "0% altered" with eight programs is not an anomaly to
    explain, it is a category error to avoid making.
    """
    out = []
    for sym, g in genes.items():
        fq = g.get("frequency") or {}
        basis = g.get("basis")
        out.append({
            "gene": sym,
            "basis": basis,
            "biomarker_gene": g.get("biomarker_gene"),
            # Genomic AND measured. NRG1 is on neither MSK panel, and plotting it at
            # 0% would say "rarely broken" about a gene the cohort never read.
            "comparable": basis == "genomic" and fq.get("max_node") is not None,
            "programs": g["n_programs"],
            "best_phase": g["best_phase"],
            "max_pct": fq.get("max_pct") or 0,
            "max_node": fq.get("max_node"),
            "max_metric": fq.get("max_metric"),
            "hotspot_n": g.get("n_mutated_samples") or 0,
            "civic_best_level": (g.get("civic") or {}).get("best_level"),
        })
    out.sort(key=lambda d: (-d["programs"], -d["max_pct"]))
    return out


def _repositioning(genes: dict, drugs: dict, pam50_to_ihc: dict) -> list[dict]:
    """Approved agents whose target is comparably altered where they are NOT used.

    Two guards keep this from being noise. Only genomically-selected targets
    qualify — "TROP2 is 0% altered in luminal A" is not a question worth asking.
    And a PAM50 subtype whose majority receptor class the drug already covers is
    skipped, or the list just restates that HER2 drugs work in HER2-enriched
    disease.

    The axis mismatch is still real and is carried on every row: approval is on
    the receptor-IHC axis, frequency on the PAM50 axis. The majority mapping is
    a filter, not a claim that the two partitions are the same.
    """
    out = []
    for sym, g in genes.items():
        if g.get("basis") != "genomic":
            continue
        # An approval written for one allele is not a question about the gene's
        # other mutations (see _selector).
        if g.get("selected_on") == "allele":
            continue
        fq = (g.get("frequency") or {}).get("by_node") or {}
        peak = (g.get("frequency") or {}).get("max_pct") or 0
        if not fq or not g["n_programs"] or peak <= 0:
            continue

        approved = [d for d in (drugs.get("drugs") or [])
                    if d["id"] in g["drugs"] and d["phase"] == "approved"]
        if not approved:
            continue
        covered_nodes = {n for d in approved for n in d["nodes"]}
        covered_labels = {d["subtype_label"] for d in approved}

        for node_id, metrics in fq.items():
            vals = [(k, v) for k, v in metrics.items() if k != "any_loss" and v.get("of")]
            # A fusion-written approval is compared on fusions only; colorectal's
            # RET otherwise surfaced a 6.5% MUTATION rate beside selpercatinib.
            if g.get("selected_on") == "fusion":
                vals = [(k, v) for k, v in vals if k == "fusion"]
            vals = [(k, v) for k, v in vals if v["of"] >= MIN_DENOM]
            if not vals:
                continue
            metric, val = max(vals, key=lambda kv: kv[1].get("pct") or 0)
            best = val.get("pct") or 0
            if best < ALTERED_PCT or best < peak * COMPARABLE:
                continue
            # A node the approved agents already name is not a question. Breast
            # never reached this — its frequencies sit on PAM50 and its approvals
            # on IHC — but lung's approvals are on the same driver nodes the
            # frequencies are, and without this every EGFR drug was listed as a
            # "repositioning question" in EGFR-driven disease.
            if node_id in covered_nodes:
                continue

            # Skip where the drug already operates, judged by the receptor class
            # this PAM50 subtype mostly falls into.
            label = _PAM50_LABEL.get(node_id)
            majority_ihc = pam50_to_ihc.get(label) if label else None
            if majority_ihc and majority_ihc in _IHC_LABEL_ALIASES:
                if _IHC_LABEL_ALIASES[majority_ihc] & covered_nodes:
                    continue

            out.append({
                "gene": sym,
                "subtype_node": node_id,
                "subtype_label": label,
                "majority_receptor_class": majority_ihc,
                "metric": metric,
                "pct": best,
                "n": val.get("n"),
                "of": val.get("of"),
                "approved_agents": [d["name"] for d in approved][:3],
                "approved_in": sorted(covered_labels),
                "approved_node_ids": sorted(covered_nodes),
                "axis_note": ("approval is on the receptor-IHC axis; the frequency is on the "
                              "PAM50 axis — different partitions, deliberately not merged")
                             if label else
                             ("approval is recorded on the nodes the curated pipeline names; the "
                              "frequency is from the cohort's own subtype split"),
            })
    out.sort(key=lambda d: -d["pct"])
    return out


# node id -> the PAM50 label used in the concordance matrix
_PAM50_LABEL = {
    "luminal-a": "Luminal A", "luminal-b": "Luminal B",
    "her2-enriched": "HER2-enriched", "basal-like": "Basal-like",
    "normal-like": "Normal-like",
}

# concordance column label -> the IHC node ids a drug could be approved in
_IHC_LABEL_ALIASES = {
    "TNBC": {"tnbc"},
    "HR+/HER2-": {"hr-pos-her2-neg"},
    "Triple positive": {"triple-positive"},
    "HER2+/HR-": {"her2-pos-hr-neg"},
}


def _evidence_without_program(genes: dict, civic_genes: dict) -> list[dict]:
    """CIViC associations for genes with no agent in the tracked pipeline."""
    out = []
    for sym, cv in civic_genes.items():
        g = genes.get(sym)
        if g and g["n_programs"]:
            continue
        # The accepted level; a gene whose every item is still pending review
        # is listed at its pending level, and says so. A higher pending level
        # beside an accepted one is carried too (colorectal APC: D, B pending).
        lvl = cv.get("best_level") or cv.get("best_level_submitted")
        if lvl not in ("C", "D", "E"):
            continue
        out.append({
            "gene": sym,
            "best_level": lvl,
            **({"pending": True} if not cv.get("best_level") else
               {"best_level_submitted": cv["best_level_submitted"]} if cv.get("best_level_submitted") else {}),
            "n_evidence_items": cv.get("n_evidence_items"),
            "evidence_types": cv.get("evidence_types"),
            "top_therapies": (cv.get("top_therapies") or [])[:4],
            "in_target_set": sym in genes,
        })
    out.sort(key=lambda d: (d["best_level"], -(d["n_evidence_items"] or 0)))
    return out


# Targets whose clinically important mutations are ACQUIRED under treatment and
# therefore structurally invisible to a primary-tumour cohort. ESR1 is the case
# that matters: Y537S/D538G arise under aromatase-inhibitor pressure in
# metastatic disease and are what elacestrant and camizestrant are for. TCGA
# sees 2 of 507. Without this, the protein view would show a near-empty track
# for one of the most consequential targets in the disease.
ACQUIRED_IN_METASTATIC = {
    "ESR1": "Y537S / D538G and neighbours arise under aromatase-inhibitor pressure in "
            "metastatic disease. A primary-tumour cohort cannot see them by construction — "
            "an empty track here is a property of the cohort, not of the gene.",
}


def _blind_spots(genes: dict) -> dict[str, list[dict]]:
    """Separate 'the cohort cannot see this' from 'mutations were never the point'.

    Lumping them together would be the error: TROP2 carrying no mutations is
    exactly what an ADC target looks like, whereas ESR1 carrying none is a limit
    of the cohort. Only the second is a caveat.
    """
    blind, expected = [], []
    for sym, g in genes.items():
        n = g.get("n_mutated_samples") or 0
        if not g["n_programs"] or n >= BLIND_SPOT_N:
            continue
        row = {
            "gene": sym,
            "basis": g.get("basis"),
            "n_mutated_samples": n,
            "of": g.get("sequenced_of"),
            "n_programs": g["n_programs"],
            "best_phase": g["best_phase"],
        }
        if sym in ACQUIRED_IN_METASTATIC:
            row["reason"] = ACQUIRED_IN_METASTATIC[sym]
            blind.append(row)
        elif g.get("basis") == "genomic":
            row["reason"] = ("Genomically selected, yet barely mutated in this cohort — "
                             "worth checking whether the cohort or the selection is wrong.")
            blind.append(row)
        else:
            row["reason"] = g.get("why")
            expected.append(row)
    blind.sort(key=lambda d: -d["n_programs"])
    expected.sort(key=lambda d: -d["n_programs"])
    return {"cohort_blind_spots": blind, "not_mutation_selected": expected}


def build(facts_dir: Path, uniprot: dict, hotspots: dict, structures: dict,
          drugs: dict, by_subtype: dict | None = None,
          cancer_id: str = "breast") -> dict[str, Any]:
    molecular = _load(facts_dir / f"{cancer_id}.molecular.json")
    civic = _load(facts_dir / f"{cancer_id}.civic.json")
    civic_genes = civic.get("genes") or {}
    concordance = molecular.get("concordance") or {}

    # Frequencies for the target set are computed fresh for these genes; the
    # facts file only ever covered the original audit gene list, so falling back
    # to it would leave two thirds of the targets sitting at a false 0%.
    freq = _frequency_index(by_subtype or molecular.get("drivers_by_subtype") or {})
    genes = _gene_records(uniprot, hotspots, structures, drugs, freq, civic_genes,
                          panel=TARGET_GENES_BY_CANCER.get(cancer_id),
                          basis=BASIS_BY_CANCER.get(cancer_id))
    pam50_to_ihc = _ihc_for_pam50(concordance)

    return {
        "cancer": cancer_id,
        "cohort": (molecular.get("study") or {}),
        "sources": {
            "protein": uniprot.get("source"),
            "structure": structures.get("source"),
            "structure_note": structures.get("note"),
            "alterations": molecular.get("source"),
            "drugs": drugs.get("source"),
            "trials": drugs.get("joined_to"),
            "evidence": civic.get("source"),
        },
        "n_targets": len(genes),
        "genes": genes,
        "drugs": drugs.get("drugs") or [],
        "drug_summary": {
            "n_drugs": drugs.get("n_drugs"),
            "registry_matched": drugs.get("registry_matched"),
            "phases": drugs.get("phases"),
            "modalities": drugs.get("modalities"),
            "unmapped_targets": drugs.get("unmapped_targets"),
        },
        "gaps": {
            **_druggable_untargeted(genes),
            "landscape": _landscape(genes),
            "repositioning": _repositioning(genes, drugs, pam50_to_ihc),
            "evidence_without_program": _evidence_without_program(genes, civic_genes),
            **_blind_spots(genes),
            "thresholds": {
                "altered_pct": ALTERED_PCT,
                "comparable_ratio": COMPARABLE,
                "blind_spot_n": BLIND_SPOT_N,
                "min_denominator": MIN_DENOM,
            },
        },
    }
