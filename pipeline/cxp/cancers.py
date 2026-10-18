"""Which cancer the pipeline is running for.

Every module-level constant that named breast used to live in the module that
used it: the cBioPortal study id in cbioportal.py, the SEER URLs in seer.py, the
CIViC disease string in civic.py, the output paths in run.py. With one dataset
that reads as configuration. With two it is a bug waiting for someone to run
`molecular` and quietly get breast's cohort under a prostate filename.

So the pipeline now takes `--cancer`, and everything cancer-specific is declared
here, in one place, where it can be read side by side and diffed.

Adding a cancer means adding a Cancer() below. It does not mean editing cxp/.

---- The node ids matter -------------------------------------------------

`subtype_to_node` maps a cohort's own subtype label onto a node id in
`data/<id>.js`. The pipeline writes those ids into the generated overlay, and
the viewer merges the overlay onto the dataset by id — so a typo here does not
raise anything, it just silently drops the computed figures for that subtype.
The ids for a cancer whose dataset is not written yet are a commitment: whoever
writes the dataset has to use them.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class HeadlineCell:
    """One cell of a concordance matrix worth quoting in both directions.

    The key names are explicit rather than slugged from row/col, because they
    appear in generated JSON that other code already reads. Deriving them would
    make a rename look like a data change.
    """
    row: str
    col: str
    forward_key: str          # share of this ROW that falls in this col
    reverse_key: str          # share of this COL that falls in this row
    forward_label: str = ""
    reverse_label: str = ""
    claim: str = ""           # what the hand-written dataset asserts, for the audit


@dataclass(frozen=True)
class Concordance:
    """Two classifications, cross-tabulated on the same samples.

    The rows come from a clinical attribute, or -- with `row_classifier` -- from
    the cancer's own derived classifier (colorectal: no cohort records the
    driver class, so the rows are computed exactly as the axis nodes are). The
    columns come either from another attribute (prostate: a Gleason category
    read straight off the record) or from a named derivation (breast: an IHC
    subtype composed from three separate stains). Derivations live in
    cbioportal.py because they are logic, not configuration.
    """
    row_attr: tuple[str, ...]
    row_label: str
    col_label: str
    col_attr: tuple[str, ...] = ()
    col_derive: str | None = None
    row_classifier: bool = False
    row_labels: dict[str, str] = field(default_factory=dict)
    col_labels: dict[str, str] = field(default_factory=dict)
    # The order to DRAW them in. Without this the viewer falls back to whatever
    # order the samples happened to arrive in, which is meaningless for a
    # nominal scale and actively wrong for an ordinal one -- prostate's Gleason
    # columns came out 3+3, 4+3, >=8, 3+4.
    row_order: tuple[str, ...] = ()
    col_order: tuple[str, ...] = ()
    headline: tuple[HeadlineCell, ...] = ()
    note: str = ""


@dataclass(frozen=True)
class Allele:
    """A named mutation, matched against the calls rather than read off a label.

    Drugs are selected by the exact change, not by the gene: sotorasib treats
    KRAS G12C and nothing else in KRAS, and osimertinib resistance is EGFR
    C797S, not "EGFR mutant". `protein` is a regex on cBioPortal's
    proteinChange; `types` and `pos` let a class of change be named where no
    single string covers it (exon 19 in-frame deletions span codons 729-761).
    """
    label: str
    gene: str
    protein: str = ""
    types: tuple[str, ...] = ()
    pos: tuple[int, int] | tuple = ()


@dataclass(frozen=True)
class ClassRule:
    """One class of a derived classification.

    A rule names the evidence that PUTS a tumour in its class: a clinical
    attribute value, a mutation call matching an Allele, or high-level
    amplification of a gene. Any one piece of evidence is enough. A rule with
    no evidence at all is the remainder class, and has to come last.

    `negative` lists the attribute values that are a genuine "no". Anything
    else -- missing, equivocal, a value nobody listed -- means the test could
    not be read, and the tumour is not allowed to fall through into a later
    class it was never shown to belong to.
    """
    label: str
    attr: str = ""
    positive: tuple[str, ...] = ()
    negative: tuple[str, ...] = ()
    alleles: tuple[Allele, ...] = ()
    amplified: tuple[str, ...] = ()

    @property
    def is_remainder(self) -> bool:
        return not (self.attr or self.alleles or self.amplified)


@dataclass(frozen=True)
class Classifier:
    """An ordered classification computed from the calls, for cohorts that ship no label.

    Lung's driver axis could read MSK's DRIVER_MUTATIONS off the record.
    Colorectal cannot: no cohort records "BRAF V600E" or "RAS wild type" as a
    class, and the classes a treatment decision is made on overlap -- a tumour
    can carry a KRAS mutation and an ERBB2 amplification at once. So the rules
    are tried in the order the decision is made, and the first match wins.

    The last class is usually defined by absence (wild type = none of the
    above), which is only true of a tumour that was TESTED for all of the
    above. cbioportal.classify() enforces that.
    """
    name: str
    rules: tuple[ClassRule, ...]
    note: str = ""

    def __post_init__(self):
        labels = [r.label for r in self.rules]
        if len(set(labels)) != len(labels):
            raise ValueError(f"classifier {self.name}: duplicate class labels")
        if any(r.is_remainder for r in self.rules[:-1]):
            raise ValueError(f"classifier {self.name}: only the last rule may have no evidence")


@dataclass(frozen=True)
class Contrast:
    """A control slice quoted beside a cohort node's own figures.

    A cross-cohort comparison is only as good as its controls: "13.0% of
    metastases" means little until the same study's primaries, on the same
    panel, read 2.1%. Those controls end up in the node's prose. Declaring them
    here means the pipeline counts them on every run and `audit` checks every
    "X% (n of N)" in the node against what was counted -- instead of the figures
    living in a README table nobody regenerates.

    `sample_filter` is the WHOLE filter, not added to the node's: the control
    for a metastasis slice is usually a primary-tumour slice. `study` defaults
    to the node's own.
    """
    key: str
    label: str
    genes: tuple[str, ...]
    sample_filter: tuple[tuple[str, tuple[str, ...]], ...] = ()
    filter_note: str = ""
    study: str | None = None
    # The key of another contrast on the same node that this slice is a share
    # OF. Colorectal quotes "31.3% (256 of 817)" -- rectal primaries among
    # early-onset patients -- which is a count of patients, not of a gene, so it
    # can only be checked if the pipeline counts both slices and divides.
    of: str = ""


@dataclass(frozen=True)
class CohortNode:
    """A cBioPortal study -- or a declared slice of one -- pinned to one node.

    `driver_frequencies` splits ONE study by a subtype attribute. This is the
    other shape: several studies, each describing a different point in the
    disease, each computed whole and attached to the node that names it.

    It is what makes a disease-state axis evidence rather than assertion. AR is
    amplified in 0.9% of primary prostate tumours and 48.7% of castration-
    resistant ones; those are two cohorts, not two subtypes of one, and no
    per-subtype split can produce that pair.

    `sample_filter` and `requires` narrow the study before counting. Lung needs
    both: its before-and-after-targeted-therapy contrast lives inside ONE study,
    split by a sample attribute (PRE_SAMPLE_TARGETED) and restricted to tumours
    with the genotype the therapy was given for. `requires` is any-of.
    """
    node: str
    study: str
    label: str
    note: str = ""
    sample_filter: tuple[tuple[str, tuple[str, ...]], ...] = ()
    requires: tuple[Allele, ...] = ()
    filter_note: str = ""
    contrasts: tuple[Contrast, ...] = ()
    # The samples each patient's ONE sample is chosen from, before sample_filter
    # narrows. Empty means filter first, then choose -- right for a slice that
    # stands alone. Set it when several nodes split one study's patients by a
    # sample attribute. Melanoma's pathway nodes slice msk_impact_50k_2026 by
    # OncoTree code, and on 2026-09-14 eight patients there had melanoma samples
    # filed under two pathways (skin and acral, skin and unknown primary...).
    # Filtering first counted each of them on both nodes; choosing first, among
    # every melanoma sample, puts each patient on exactly one.
    sample_scope: tuple[tuple[str, tuple[str, ...]], ...] = ()


@dataclass(frozen=True)
class Waiver:
    """One audit row the gate lets through, and why (see cxp/gate.py).

    A waiver is pinned to the verdict it was granted for: if the ERBB2 row it
    covers moves from CLOSE to DIVERGENT, the row is judged afresh and fails.
    `key` names the row the way the gate prints it -- node/gene/metric for a
    driver comparison, "node: quoted text" for a quoted count, the node for
    prevalence, the field for an overview row, the gene for druggability.

    `debt=True` marks a row nobody has reviewed yet. It is waived so the list
    cannot grow unnoticed, not because it is right; the gate prints it as debt
    on every run. Reviewing one means fixing the data, or writing the decision
    where the audit reads it (civic_reviewed for CIViC rows) and deleting the
    waiver.
    """
    section: str    # comparisons | quoted_counts | prevalence | overview | druggability
    key: str
    verdict: str
    reason: str
    debt: bool = False


@dataclass(frozen=True)
class Cancer:
    id: str
    name: str

    # ---- cBioPortal ----
    study: str
    genes: tuple[str, ...]
    subtype_attr: tuple[str, ...]              # tried in order; first hit wins
    subtype_to_node: dict[str, str]            # display label -> node id
    subtype_labels: dict[str, str] = field(default_factory=dict)  # raw -> display
    # For a cohort that ships no label: classes computed from the calls, in
    # decision order (see Classifier). When set, subtype_attr is not read.
    subtype_classifier: Classifier | None = None
    # Classes the classifier assigns that sit on NO node, by design rather than
    # by typo -- listed so the unmapped-label warning keeps meaning something.
    subtype_excluded: tuple[str, ...] = ()
    combos: dict[str, tuple[str, ...]] = field(default_factory=dict)
    alleles: tuple[Allele, ...] = ()
    concordance: Concordance | None = None
    cohort_nodes: tuple[CohortNode, ...] = ()
    survival_study: str | None = None
    # The subtype attribute inside survival_study, and what its follow-up can and
    # cannot be read for. Both belong to that study: run.py once wrote breast's
    # METABRIC caveat into every cancer's overlay (2026-10-17).
    survival_study_attr: str = "SUBTYPE"
    survival_caveat: str | None = None
    survival_attr: str = "SUBTYPE"

    # ---- SEER ----
    seer_overview_url: str = ""
    seer_subtypes_url: str | None = None
    seer_subtypes_note: str = ""

    # ---- other sources ----
    # One CIViC disease name, or several when the cancer is filed under many
    # (lung: non-small cell, adenocarcinoma, squamous, small cell...).
    civic_disease: str | tuple[str, ...] = ""
    # CIViC prompts that have been read: gene -> what was decided and why. The
    # audit reports such a gene as REVIEWED with this note instead of MISSED.
    civic_reviewed: dict[str, str] = field(default_factory=dict)
    # Audit rows the gate lets through (see Waiver). Everything else that is
    # not a passing verdict fails `run.py audit`.
    audit_waivers: tuple[Waiver, ...] = ()
    # Curated node -> computed node whose cohort its driver figures were written
    # from, for a node the pipeline does not compute in its own right. The audit
    # then compares that node's figures with the named cohort, row by row, under
    # the same bands and gate as any other. Each name must resolve, or the audit
    # raises: a typo here would compare nothing and look clean.
    audit_against: dict[str, str] = field(default_factory=dict)
    # One GWAS Catalog trait name, or several read together and de-duplicated.
    gwas_trait: str | tuple[str, ...] = ""
    # One OncoTree tissue, or several when the cancer's codes are filed under
    # different organs (melanoma: Skin, Eye, and each mucosal site's own organ).
    oncotree_tissue: str | tuple[str, ...] = ""

    # ---- phase 7: curated drug pipeline and literature ----
    pipeline_csv: str | None = None
    landscape_md: str | None = None

    @property
    def dataset_js(self) -> str:
        return f"{self.id}.js"

    def facts_json(self, kind: str) -> str:
        """facts/<cancer>.<kind>.json — the pipeline's own intermediate files."""
        return f"{self.id}.{kind}.json"


# =====================================================================
# breast — the reference implementation. Every value here was a constant
# somewhere in cxp/ before this file existed; nothing is new.
# =====================================================================

BREAST = Cancer(
    id="breast",
    name="Breast Cancer",

    # brca_tcga_pub IS the TCGA Nature 2012 cohort (n=825) the published
    # frequencies come from, and it carries PAM50_SUBTYPE plus ER/PR/HER2_STATUS
    # -- so comparisons against the paper are like-for-like. Auditing against
    # PanCanAtlas (n=1084) would manufacture differences that are really just a
    # different cohort.
    study="brca_tcga_pub",
    genes=(
        "TP53", "PIK3CA", "GATA3", "MAP3K1", "CDH1", "MAP2K4", "PIK3R1",
        "PTEN", "BRCA1", "BRCA2", "RB1", "INPP4B",
        "ERBB2", "MYC", "CCND1", "MDM2",
        # Added for the disease-state axis. Near zero in every PAM50 subtype, and
        # that near-zero is the point: it is what the metastatic node is read against.
        "ESR1",
    ),
    subtype_attr=("PAM50_SUBTYPE", "SUBTYPE"),
    # PanCanAtlas spells the same calls differently.
    subtype_labels={
        "BRCA_LumA": "Luminal A", "BRCA_LumB": "Luminal B",
        "BRCA_Basal": "Basal-like", "BRCA_Her2": "HER2-enriched",
        "BRCA_Normal": "Normal-like",
    },
    subtype_to_node={
        "Luminal A": "luminal-a",
        "Luminal B": "luminal-b",
        "HER2-enriched": "her2-enriched",
        "Basal-like": "basal-like",
        "Normal-like": "normal-like",
    },
    # Labels the hand-written data uses that are unions of real genes.
    combos={"BRCA1/2": ("BRCA1", "BRCA2")},
    concordance=Concordance(
        row_attr=("PAM50_SUBTYPE", "SUBTYPE"),
        row_label="Intrinsic subtype (PAM50)",
        col_derive="breast_ihc",
        col_label="Receptor status (IHC)",
        # Luminal A through Normal-like is the order the PAM50 paper uses, and
        # the receptor classes run from most to least endocrine-responsive.
        row_order=("Luminal A", "Luminal B", "HER2-enriched", "Basal-like", "Normal-like"),
        col_order=("HR+/HER2-", "Triple positive", "HER2+/HR-", "TNBC"),
        headline=(
            HeadlineCell(
                row="Basal-like", col="TNBC",
                forward_key="basal_like_that_is_TNBC",
                reverse_key="TNBC_that_is_basal_like",
                forward_label="Basal-like tumours that are TNBC",
                reverse_label="TNBC tumours that are basal-like",
                claim='"~80% overlap"',
            ),
            HeadlineCell(
                row="HER2-enriched", col="HER2+/HR-",
                forward_key="HER2enriched_that_is_HER2pos_HRneg",
                reverse_key="HER2pos_HRneg_that_is_HER2enriched",
                forward_label="HER2-enriched that is HER2+/HR−",
                reverse_label="HER2+/HR− that is HER2-enriched",
                claim='"strong but imperfect"',
            ),
        ),
    ),
    # The disease-state axis, computed. Prostate got one first; breast needed it
    # more than anyone had written down, because its central resistance story --
    # ESR1 mutation under aromatase-inhibitor pressure -- is invisible in any
    # primary-tumour cohort by construction.
    #
    # Only two nodes carry figures, and the metastatic one is a SLICE: Razavi
    # 2018 sequenced primary tumours as well as metastases, and the whole-study
    # figure (ESR1 7.5%) blends the two. Its own primaries sit at 2.1% on the same
    # panel, so the rise to 13.0% is not an artefact of a different assay.
    # Splitting the metastases by stage at diagnosis was tried and does not
    # separate them (de novo 11.9%, relapsed 13.2%): stage IV at diagnosis says
    # nothing about when the biopsy was taken relative to therapy, so those two
    # child nodes carry curated shares and no computed figures.
    cohort_nodes=(
        CohortNode(node="state-early", study="brca_tcga_pub",
                   label="Primary tumours (TCGA)",
                   note="Surgically resected primary tumours, unselected for outcome. Most of these "
                        "women's disease never becomes metastatic, which is why this cohort stands "
                        "for the node -- and some of it will, which is the node's caveat."),
        CohortNode(node="state-metastatic", study="breast_msk_2018",
                   label="Metastases (MSK)",
                   sample_filter=(("SAMPLE_TYPE", ("Metastasis",)),),
                   filter_note="SAMPLE_TYPE = Metastasis",
                   note="Biopsies of metastatic deposits sequenced on MSK-IMPACT (Razavi et al, Cancer "
                        "Cell 2018), which reports 692 of its 1,918 tumours as previously exposed to "
                        "hormonal therapy. The study's own primary tumours are excluded here. One "
                        "sample per patient.",
                   # Every figure data/breast.js quotes beside this node's own card, plus the
                   # stage split that was tried and rejected (kept so nobody re-derives it).
                   contrasts=(
                       Contrast(key="msk-primary", label="Same study, primary tumours",
                                genes=("ESR1",),
                                sample_filter=(("SAMPLE_TYPE", ("Primary",)),),
                                filter_note="SAMPLE_TYPE = Primary"),
                       Contrast(key="msk-primary-hr-pos", label="Same study, HR+ primary tumours",
                                genes=("ESR1",),
                                sample_filter=(("SAMPLE_TYPE", ("Primary",)), ("HR_STATUS", ("Positive",))),
                                filter_note="SAMPLE_TYPE = Primary; HR_STATUS = Positive"),
                       Contrast(key="msk-metastasis-hr-pos", label="HR+ metastases",
                                genes=("ESR1",),
                                sample_filter=(("SAMPLE_TYPE", ("Metastasis",)), ("HR_STATUS", ("Positive",))),
                                filter_note="SAMPLE_TYPE = Metastasis; HR_STATUS = Positive"),
                       Contrast(key="msk-metastasis-stage-iv", label="Metastases, stage IV at diagnosis",
                                genes=("ESR1",),
                                sample_filter=(("SAMPLE_TYPE", ("Metastasis",)), ("STAGE_AT_DIAGNOSIS", ("IV",))),
                                filter_note="SAMPLE_TYPE = Metastasis; STAGE_AT_DIAGNOSIS = IV"),
                       Contrast(key="msk-metastasis-stage-i-iii", label="Metastases, stage I–III at diagnosis",
                                genes=("ESR1",),
                                sample_filter=(("SAMPLE_TYPE", ("Metastasis",)),
                                               ("STAGE_AT_DIAGNOSIS", ("IA", "IB", "IIA", "IIB", "IIIA", "IIIB", "IIIC"))),
                                filter_note="SAMPLE_TYPE = Metastasis; STAGE_AT_DIAGNOSIS = IA–IIIC"),
                       Contrast(key="mbcproject-naive", label="MBCproject, sampled before any treatment",
                                genes=("ESR1",), study="brca_mbcproject_2022",
                                sample_filter=(("CALC_TREATMENT_NAIVE", ("YES",)),),
                                filter_note="CALC_TREATMENT_NAIVE = YES"),
                       Contrast(key="mbcproject-treated", label="MBCproject, sampled after treatment",
                                genes=("ESR1",), study="brca_mbcproject_2022",
                                sample_filter=(("CALC_TREATMENT_NAIVE", ("NO",)),),
                                filter_note="CALC_TREATMENT_NAIVE = NO"),
                   )),
    ),
    survival_study="brca_metabric",
    survival_study_attr="CLAUDIN_SUBTYPE",
    survival_caveat=("METABRIC accrued largely before 2000, so absolute survival understates "
                     "outcomes achievable today. These figures are valid for RELATIVE ranking "
                     "between subtypes, not as current prognosis."),
    survival_attr="PAM50_SUBTYPE",

    seer_overview_url="https://seer.cancer.gov/statfacts/html/breast.html",
    seer_subtypes_url="https://seer.cancer.gov/statfacts/html/breast-subtypes.html",

    civic_disease="Breast Cancer",
    gwas_trait="breast carcinoma",
    oncotree_tissue="Breast",

    # Genes the audit reported MISSED, each read against CIViC's breast items on
    # 2026-09-19 and left unflagged on purpose. Every PMID here was resolved in
    # Europe PMC the same day. CIViC "predictive" includes predicting NON-response,
    # and for three of these four that is the whole of the level-B evidence.
    #
    # SCOPE, measured 2026-09-20: the diseaseName filter matches by substring, so
    # "Breast Cancer" already pulls in CIViC's HER2-positive, HER2-negative, ER-positive
    # and triple-negative subsets -- 500 of the 520 items under any Breast* name. The 20
    # it misses are filed as Breast Carcinoma and its variants, and none of them names
    # CCND1, FOXA1, RB1, TP53 or MET, so no note below turns on the gap. Prostate is the
    # one where it does; see that config.
    #
    # ATTRIBUTION, swept 2026-09-20 (Skeptic P1-R2-1): a claim is written against a PMID
    # only where the paper's own readable text -- title, abstract, or the full text Europe
    # PMC serves -- states it. Where a figure, a drug name or a direction is only in the
    # CIViC item, it is written against the item (EID n): a curated description is not the
    # source (INV-19). An item whose CIViC status is not ACCEPTED says so.
    civic_reviewed={
        "CCND1": "both level-B items are about tamoxifen rather than about hitting cyclin D1: CCND1 "
                 "overexpression predicting RESISTANCE to tamoxifen (EID 856; PMID 15138475 says so in "
                 "its title, and reports that the 46 strongly ER-positive, cyclin-D1-overexpressing "
                 "tumours of 167 showed no survival difference between tamoxifen and no treatment) and "
                 "CCND1 amplification failing to predict it in MA.12 (EID 858, DOES_NOT_SUPPORT; "
                 "PMID 24367492, \"no statistically significant interaction with treatment was "
                 "observed\", CCND1 copy number measured in 442 patients). The only item about a "
                 "CDK4/6 inhibitor is level D, in cell lines (EID 1562; PMID 19874578, a panel of 47 "
                 "breast cancer cell lines treated with palbociclib). The page keeps CCND1 as an "
                 "unflagged oncogene, and the Targets lens already shows it under 'Reached only "
                 "through a partner', via CDK4 and CDK6",
        "FOXA1": "a single level-B item, FOXA1 mutation predicting RESISTANCE to aromatase inhibitors "
                 "(EID 12910, still SUBMITTED in CIViC; PMID 32888433, whose abstract states that "
                 "FOXA1 mutations \"associate with a lower response to aromatase inhibitors\"). The "
                 "cohort figures -- 17 mutant of 304 -- are the item's and not the paper's: the "
                 "abstract does not give them, and Europe PMC serves no full text for it. No drug here "
                 "is aimed at FOXA1, and the page carries it as an unflagged ER pioneer factor",
        "RB1": "both level-B items predict RESISTANCE -- RB1 phosphorylation with alpelisib (EID 1609; "
               "PMID 25002028, which calls the drug BYL719 and reports that responding tumours "
               "suppressed phospho-Rb while non-responders sustained it), and RB1 mutation among the "
               "alterations selected on palbociclib plus fulvestrant in PALOMA-3 (EID 12045; "
               "PMID 30206110, \"RB1 mutations emerged only in the palbociclib plus fulvestrant arm "
               "... 6/127, 4.7%\") -- as does the level-C item, RB1 mutations emerging after CDK4/6 "
               "inhibition (EID 6097, SUBMITTED; PMID 29236940, three patients). That is what the page "
               "already says: the CDK4 target card calls RB1 a negative biomarker rather than a "
               "target, and the Targets lens lists it under 'Altered often, nothing against it'",
        "TP53": "each of the three level-B items selects an older drug on TP53 status, and two of the "
                "three are the paper's own: DNA-binding-domain (EID 2783) and L3-domain (EID 3036, "
                "SUBMITTED) mutations predicting RESISTANCE to tamoxifen, PMID 10786679 reporting that "
                "tumours mutated in codons that directly contact DNA, or in the zinc-binding L3 loop, "
                "had the lowest response to tamoxifen (18% and 15%, against 66% for wild type). The "
                "third, R249 predicting response to doxorubicin, is **the item's and not the paper's** "
                "(EID 399, \"more responsive to doxorubicin than breast tumors with wild type TP53\"): "
                "PMID 9569050 names no therapy in its abstract, which reports relapse-free and overall "
                "survival only, and Europe PMC's PMC2150115 record is flagged is-scanned, its body "
                "served as page images with no text layer, so the 9,641 characters it returns are "
                "front matter and that same abstract -- 0 hits for doxorubicin, chemotherap or "
                "tamoxifen. The article body cannot be read at all. Attribute it to EID 399 (INV-19). "
                "None of the three is a drug aimed at TP53, which is what the glossary line and the "
                "'Altered often, nothing against it' list say",
    },

    audit_waivers=(
        Waiver("comparisons", "basal-like/MYC/amplification", "CLOSE",
               "40% hand is TCGA 2012 Table 1's 'MYC focal gain (40%)', a gain where this row says "
               "amplification; the paper's own count for the MYC region is 25/81 (Supplementary "
               "Table XIII.1), computed 31.5%. Not relabelled yet: that changes what the audit "
               "compares (notes/pipeline-tightening-2026-10-17.md)"),
        Waiver("druggability", "MET", "UNSUPPORTED",
               "flagged druggable with no CIViC predictive evidence for breast; not reviewed",
               debt=True),
    ),

    pipeline_csv="pipeline.csv",
    landscape_md="breast-cancer-landscape.md",
)


# =====================================================================
# prostate — the second dataset. data/prostate.js does not exist yet, so
# `subtype_to_node` below is a CONTRACT with whoever writes it.
# =====================================================================

PROSTATE = Cancer(
    id="prostate",
    name="Prostate Cancer",

    # prad_tcga_pub IS the TCGA Cell 2015 cohort (n=333) the seven-class
    # taxonomy comes from, and it carries SUBTYPE plus REVIEWED_GLEASON_CATEGORY
    # on every patient -- which is what makes the concordance matrix computable
    # with no missing values at all.
    study="prad_tcga_pub",
    genes=(
        "AR", "TP53", "PTEN", "RB1", "SPOP", "FOXA1", "BRCA1", "BRCA2",
        "ATM", "CDK12", "CHEK2", "PALB2", "RAD51C", "RAD51D",
        "MYC", "CHD1", "APC", "CTNNB1", "PIK3CA", "AKT1", "PIK3R1",
        "MSH2", "MSH6", "MLH1", "ERG", "ETV1", "ETV4", "FLI1",
        "KMT2C", "KMT2D", "ZBTB16", "NCOA2", "SPINK1", "IDH1", "ZFHX3",
    ),
    subtype_attr=("SUBTYPE",),
    # TCGA ships these numbered, so they sort into the paper's own order.
    subtype_labels={
        "1-ERG": "ERG fusion",
        "2-ETV1": "ETV1 fusion",
        "3-ETV4": "ETV4 fusion",
        "4-FLI1": "FLI1 fusion",
        "5-SPOP": "SPOP mutant",
        "6-FOXA1": "FOXA1 mutant",
        "7-IDH1": "IDH1 mutant",
        "8-other": "Unclassified",
    },
    # CONTRACT: data/prostate.js must use exactly these node ids on its
    # molecular axis, or the overlay silently drops every computed figure.
    subtype_to_node={
        "ERG fusion": "mol-erg",
        "ETV1 fusion": "mol-etv1",
        "ETV4 fusion": "mol-etv4",
        "FLI1 fusion": "mol-fli1",
        "SPOP mutant": "mol-spop",
        "FOXA1 mutant": "mol-foxa1",
        "IDH1 mutant": "mol-idh1",
        "Unclassified": "mol-other",
    },
    combos={
        "BRCA1/2": ("BRCA1", "BRCA2"),
        # Homologous-recombination repair as one call, because that is how the
        # PARP-inhibitor indications are written -- not gene by gene.
        "HRR": ("BRCA1", "BRCA2", "ATM", "CDK12", "CHEK2", "PALB2",
                "RAD51C", "RAD51D"),
        # Mismatch repair, likewise: the pembrolizumab indication is dMMR/MSI-H,
        # not any one of these genes.
        "MMR": ("MSH2", "MSH6", "MLH1"),
    },
    concordance=Concordance(
        row_attr=("SUBTYPE",),
        row_label="Molecular class (TCGA)",
        col_attr=("REVIEWED_GLEASON_CATEGORY", "CLINICAL_GLEASON_CATEGORY"),
        col_label="Gleason pattern at prostatectomy",
        row_labels={
            "1-ERG": "ERG fusion", "2-ETV1": "ETV1 fusion", "3-ETV4": "ETV4 fusion",
            "4-FLI1": "FLI1 fusion", "5-SPOP": "SPOP mutant", "6-FOXA1": "FOXA1 mutant",
            "7-IDH1": "IDH1 mutant", "8-other": "Unclassified",
        },
        col_labels={
            "3+3": "Gleason 3+3", "3+4": "Gleason 3+4",
            "4+3": "Gleason 4+3", ">=8": "Gleason ≥8",
        },
        row_order=("ERG fusion", "ETV1 fusion", "ETV4 fusion", "FLI1 fusion",
                   "SPOP mutant", "FOXA1 mutant", "IDH1 mutant", "Unclassified"),
        # Ordinal, and the whole point of the axis. Drawn out of order it reads
        # as a nominal scale and the gradient across the row means nothing.
        col_order=("Gleason 3+3", "Gleason 3+4", "Gleason 4+3", "Gleason ≥8"),
        headline=(
            HeadlineCell(
                row="ERG fusion", col="Gleason ≥8",
                forward_key="ERG_that_is_high_grade",
                reverse_key="high_grade_that_is_ERG",
                forward_label="ERG-fused tumours that are Gleason ≥8",
                reverse_label="Gleason ≥8 tumours that are ERG-fused",
            ),
            HeadlineCell(
                row="SPOP mutant", col="Gleason ≥8",
                forward_key="SPOP_that_is_high_grade",
                reverse_key="high_grade_that_is_SPOP",
                forward_label="SPOP-mutant tumours that are Gleason ≥8",
                reverse_label="Gleason ≥8 tumours that are SPOP-mutant",
            ),
        ),
        note="A prostatectomy cohort, so it under-represents the low-grade disease that "
             "never reaches surgery. Read the row shares against the cohort's own grade "
             "distribution rather than against the population.",
    ),
    # The disease-state axis, computed. Three cohorts, three points in the same
    # disease: untreated primary tumours, the same disease after hormone therapy
    # has stopped working, and the neuroendocrine form some of it turns into.
    # Breast wired the same shape second (primary vs metastatic, for ESR1).
    cohort_nodes=(
        CohortNode(node="state-confined", study="prad_tcga_pub",
                   label="Primary, treatment-naive",
                   note="Prostatectomy specimens: disease that was operable and had not been "
                        "treated with anything systemic when it was sampled."),
        CohortNode(node="state-crpc-adeno", study="prad_su2c_2019",
                   label="Metastatic castration-resistant",
                   note="Biopsies of metastases taken after androgen deprivation stopped working. "
                        "Most had also had abiraterone or enzalutamide."),
        CohortNode(node="state-nepc", study="nepc_wcm_2016",
                   label="Neuroendocrine",
                   note="The transformed form, sampled directly. A small cohort, and the only one "
                        "that shows what the transformation does to the genome."),
    ),
    survival_study=None,
    survival_attr="SUBTYPE",

    # Twelve figures with no audit row until 2026-10-17. Each node's caveat
    # names its cohort: mol-root "Computed from 333 prostatectomy specimens"
    # (prad_tcga_pub, computed whole for state-confined), state-crpc "computed
    # from SU2C/PCF metastatic biopsies (429 men, one biopsy each)"
    # (prad_su2c_2019, computed for state-crpc-adeno).
    audit_against={
        "mol-root": "state-confined",
        "state-crpc": "state-crpc-adeno",
    },

    seer_overview_url="https://seer.cancer.gov/statfacts/html/prost.html",
    # There is no prost-subtypes.html. Checked 2026-09-05: SEER returns 404, and
    # the NCCN Risk Group field lives in a restricted-access specialised database
    # requiring a signed data-use agreement. So subtype shares for prostate are
    # CURATED, the way baseline.lifetimeRisk already is for breast -- and the
    # dataset has to say so with a `basis`.
    seer_subtypes_url=None,
    seer_subtypes_note=(
        "SEER publishes no prostate subtypes page (breast-subtypes.html has no analogue) "
        "and gates its NCCN Risk Group field behind a data-use agreement. Grade-axis "
        "prevalence must be curated from a published analysis with a stated vintage."
    ),

    civic_disease="Prostate Cancer",
    gwas_trait="prostate carcinoma",
    oncotree_tissue="Prostate",

    # The gene the audit reported MISSED, read against CIViC's prostate items on
    # 2026-09-19 and left unflagged on purpose; every PMID here was resolved in
    # Europe PMC the same day.
    #
    # SCOPE, measured 2026-09-20: the diseaseName filter matches by substring, and
    # "Prostate Cancer" is not a substring of "Castration-resistant Prostate Carcinoma".
    # CIViC holds 120 items under a Prostate* name; this config fetches the 89 filed
    # under "Prostate Cancer" and misses 31, of which 26 are predictive level A or B --
    # nearly all of them PARP-inhibitor items on the HRR genes. Widening this to a tuple
    # (as lung already is) is a real fix and a page change, so it sits with the user in
    # HANDOFF Open rather than being taken by a phase.
    #
    # ATTRIBUTION, swept 2026-09-20: as in BREAST above -- a claim is written against a PMID
    # only where the paper's own readable text states it, against the CIViC item (EID n)
    # otherwise, and an item whose status is not ACCEPTED says so.
    civic_reviewed={
        "ATM": "read against the 89 items CIViC files under 'Prostate Cancer', the name this dataset "
               "queries and the set its items column counts. There the two level-B items disagree, "
               "both are SUBMITTED, and neither makes ATM a drug target: no man with an ATM mutation "
               "had a PSA50 response to olaparib in a retrospective series (EID 7458, "
               "DOES_NOT_SUPPORT; PMID 30797618 reports 0% (0 of 6) against 76% (13 of 17) for "
               "BRCA1/2), while TOPARP-B reported one RECIST response in twelve (EID 7472; CIViC cites "
               "an ASCO abstract, which has no PMID, so the 1 of 12 is the item's). The three level-C "
               "items are all from Mateo 2015 (PMID 26510020) and all ACCEPTED: two describe a single "
               "responder each (EIDs 647, 648) and the third states what the paper's abstract states, "
               "a response in 4 of 5 patients with ATM aberrations (EID 1960). **Scope:** CIViC files "
               "26 further predictive items under 'Castration-resistant Prostate Carcinoma', a name "
               "this filter does not match, and one is level A -- ATM mutation with olaparib in "
               "PROfound (EID 8505, ACCEPTED; PMID 32343890, whose abstract names ATM in cohort A). "
               "Two level-B items there point the other way, both SUBMITTED and both DOES_NOT_SUPPORT: "
               "talazoparib with enzalutamide in TALAPRO-2 (EID 11736 -- the ATM subgroup, HR 0.76, "
               "95% CI 0.30-1.94, is the item's, because PMID 38049622 puts its per-gene subgroups in "
               "Fig. 3a, an image, and its text gives only the combined HRR-deficient result) and "
               "rucaparib in TRITON3 (EID 13268; PMID 36795891's abstract gives the exploratory ATM "
               "subgroup as 8.1 against 6.8 months, HR 0.95). So the evidence is split however it is "
               "scoped. The drug is a PARP inhibitor, aimed at PARP1, so the page flags BRCA2 "
               "druggable, keeps ATM as an unflagged DNA-damage-response driver, names it on the HRR "
               "panel row and in the PARP1 target card, and its Targets-lens row under 'Altered often, "
               "nothing against it' already reads 'on weaker evidence than BRCA2'. Widening "
               "civic_disease is proposed to the user (HANDOFF Open), not done here: it would change "
               "what the Targets lens prints",
    },

    audit_waivers=(
        Waiver("druggability", "HRR", "UNSUPPORTED",
               "HRR is a gene panel, not a gene, so CIViC files nothing under that name; its "
               "member genes have not been checked one by one", debt=True),
    ),

    pipeline_csv="prostate-pipeline.csv",
    # No landscape markdown for prostate — `sync` and `manual` write computed
    # figures back into that document, and there is nothing to write into yet.
    landscape_md=None,
)


# =====================================================================
# lung — the third dataset. The driver axis is the one that decides treatment,
# so its node ids below are a CONTRACT with data/lung.js.
# =====================================================================

# MSK's DRIVER_MUTATIONS labels, collapsed into the classes a treatment decision
# is made on. The source spells one event several ways ("CDKN2A del",
# "CDKN2A_del", "CDKN2A loss"), and most labels name an alteration with no
# approved drug behind it; those become one "other named alteration" class
# rather than thirty nodes of one to seventeen patients each.
_LUNG_OTHER = (
    "NF1_truncating", "PIK3CA", "BRAF non-V600", "MET_AMP", "MET AMP", "BRCA", "NRAS",
    "EGFR_WT_AMP", "CDKN2A del", "CDKN2A_del", "CDKN2A loss", "ERBB2_WT_AMP", "MDM2_AMP",
    "MAP2K1", "TSC1/2", "PTEN_truncating", "FGFR1", "CDK4 AMP", "GNAS", "AKT1", "FGFR2",
    "ARAF", "RAF1", "CD74-NRG", "FGFR3-TACC3", "MTOR", "KIT", "ERBB3_MUT", "HRAS",
)
LUNG_DRIVER_LABELS = {
    "KRAS": "KRAS",
    "EGFR": "EGFR (common)",
    "EGFR_exon20": "EGFR exon 20 insertion",
    "ALK": "ALK fusion",
    "ROS1": "ROS1 fusion",
    "RET": "RET fusion",
    "MET": "MET exon 14",
    "BRAF": "BRAF V600",
    "ERBB2": "HER2 (ERBB2) mutant",
    "ERBB2_AMP_MUT": "HER2 (ERBB2) mutant",
    "UNKNOWN DRIVER": "No driver identified",
    "No mutations": "No driver identified",
    **{raw: "Other named alteration" for raw in _LUNG_OTHER},
}

LUNG_EGFR_SENSITISING = (
    Allele("EGFR L858R", "EGFR", protein=r"^L858R$"),
    Allele("EGFR exon 19 deletion", "EGFR", types=("In_Frame_Del",), pos=(729, 761)),
)

LUNG = Cancer(
    id="lung",
    name="Lung Cancer",

    # lung_msk_2017 (Jordan et al, Cancer Discov 2017) is the only cohort with
    # a curated driver label on every tumour, and it records smoking history
    # on every patient. 915 samples from 860 patients, all adenocarcinoma --
    # so the driver axis partitions adenocarcinoma, not all lung cancer, and
    # data/lung.js must say so with axes[].population.
    study="lung_msk_2017",
    genes=(
        "EGFR", "KRAS", "ALK", "ROS1", "MET", "RET", "BRAF", "ERBB2", "NTRK1",
        "TP53", "STK11", "KEAP1", "SMARCA4", "CDKN2A", "RB1", "NFE2L2", "SOX2",
        "FGFR1", "PIK3CA", "NKX2-1", "MYC", "NF1",
    ),
    subtype_attr=("DRIVER_MUTATIONS",),
    subtype_labels=LUNG_DRIVER_LABELS,
    # CONTRACT: data/lung.js must use exactly these node ids on its driver axis.
    subtype_to_node={
        "KRAS": "drv-kras",
        "EGFR (common)": "drv-egfr",
        "EGFR exon 20 insertion": "drv-egfr-ex20",
        "ALK fusion": "drv-alk",
        "ROS1 fusion": "drv-ros1",
        "RET fusion": "drv-ret",
        "MET exon 14": "drv-met",
        "BRAF V600": "drv-braf",
        "HER2 (ERBB2) mutant": "drv-erbb2",
        "Other named alteration": "drv-other",
        "No driver identified": "drv-none",
    },
    alleles=(
        Allele("KRAS G12C", "KRAS", protein=r"^G12C$"),
        *LUNG_EGFR_SENSITISING,
        Allele("EGFR exon 20 insertion", "EGFR", types=("In_Frame_Ins",), pos=(762, 823)),
        Allele("EGFR T790M", "EGFR", protein=r"^T790M$"),
        Allele("EGFR C797X", "EGFR", protein=r"^C797[A-Z]$"),
        Allele("BRAF V600E", "BRAF", protein=r"^V600E$"),
    ),
    concordance=Concordance(
        row_attr=("DRIVER_MUTATIONS",),
        row_label="Driver class (MSK)",
        col_attr=("SMOKING_HISTORY",),
        col_label="Smoking history",
        row_labels=LUNG_DRIVER_LABELS,
        row_order=("EGFR (common)", "KRAS", "ALK fusion", "ROS1 fusion", "MET exon 14",
                   "HER2 (ERBB2) mutant", "EGFR exon 20 insertion", "BRAF V600", "RET fusion",
                   "Other named alteration", "No driver identified"),
        # Ordinal by exposure. MSK records only 10 current smokers, so that
        # column is too small to read on its own and the note says so.
        col_order=("Never", "Former light", "Former heavy", "Current heavy"),
        headline=(
            HeadlineCell(
                row="EGFR (common)", col="Never",
                forward_key="EGFR_that_is_never_smoker",
                reverse_key="never_smoker_that_is_EGFR",
                forward_label="EGFR-driven tumours in people who never smoked",
                reverse_label="Never smokers whose tumour is EGFR-driven",
            ),
            HeadlineCell(
                row="KRAS", col="Never",
                forward_key="KRAS_that_is_never_smoker",
                reverse_key="never_smoker_that_is_KRAS",
                forward_label="KRAS-driven tumours in people who never smoked",
                reverse_label="Never smokers whose tumour is KRAS-driven",
            ),
        ),
        note="A referral-centre cohort of adenocarcinomas in which 32% never smoked, so EGFR is "
             "over-represented against unselected disease. Only 10 patients are recorded as "
             "current smokers; read that column as too small to interpret on its own.",
    ),
    # Histology-node figures from cohorts that are not MSK's adenocarcinomas.
    # TCGA's pan-lung study carries both major non-small-cell types; small-cell
    # lung cancer needs its own study. The ids are a contract with data/lung.js.
    cohort_nodes=(
        CohortNode(node="hist-adeno", study="nsclc_tcga_broad_2016",
                   label="Adenocarcinoma (TCGA)",
                   sample_filter=(("CANCER_TYPE_DETAILED", ("Lung Adenocarcinoma",)),),
                   filter_note="CANCER_TYPE_DETAILED = Lung Adenocarcinoma",
                   note="Resected tumours from the TCGA pan-lung analysis, mostly early-stage "
                        "and unselected for driver — unlike the referral cohort behind the driver axis."),
        CohortNode(node="hist-squamous", study="nsclc_tcga_broad_2016",
                   label="Squamous cell carcinoma (TCGA)",
                   sample_filter=(("CANCER_TYPE_DETAILED", ("Lung Squamous Cell Carcinoma",)),),
                   filter_note="CANCER_TYPE_DETAILED = Lung Squamous Cell Carcinoma",
                   note="Resected tumours from the TCGA pan-lung analysis."),
        CohortNode(node="hist-sclc", study="sclc_ucologne_2015",
                   label="Small cell lung cancer (Cologne)",
                   note="120 tumours sequenced whole-genome (George et al, Nature 2015). Small-cell "
                        "lung cancer is rarely resected, so any sequenced cohort of it is small."),
        # The resistance contrast, from ONE study split two ways: by whether the
        # sample was taken after targeted therapy, and by the genotype that
        # therapy is given for. The attribute does not name the drug, so neither
        # node may be described as resistance to any particular one.
        CohortNode(node="res-naive", study="luad_mskcc_2023_met_organotropism",
                   label="EGFR-mutant, sampled before targeted therapy",
                   sample_filter=(("PRE_SAMPLE_TARGETED", ("No",)),),
                   requires=LUNG_EGFR_SENSITISING,
                   filter_note="PRE_SAMPLE_TARGETED = No; EGFR L858R or exon 19 deletion",
                   note="Tumours with a sensitising EGFR mutation, sampled before any targeted "
                        "therapy was recorded. One sample per patient."),
        CohortNode(node="res-treated", study="luad_mskcc_2023_met_organotropism",
                   label="EGFR-mutant, sampled after targeted therapy",
                   sample_filter=(("PRE_SAMPLE_TARGETED", ("Yes",)),),
                   requires=LUNG_EGFR_SENSITISING,
                   filter_note="PRE_SAMPLE_TARGETED = Yes; EGFR L858R or exon 19 deletion",
                   note="The same genotype, sampled after targeted therapy. The study records THAT "
                        "a targeted therapy preceded the sample, not which drug."),
    ),
    survival_study=None,
    survival_attr="SUBTYPE",

    seer_overview_url="https://seer.cancer.gov/statfacts/html/lungb.html",
    # Checked 2026-09-13: there is no lungb-subtypes.html. Histology shares come
    # from ACS Cancer Facts & Figures 2023, special section Figure S2 (NAACCR
    # 2015-2019), which reports them by sex and as shares of NSCLC -- so
    # data/lung.js derives the whole-disease shares and says how.
    seer_subtypes_url=None,
    seer_subtypes_note=(
        "SEER publishes no lung subtypes page (lungb-subtypes.html returns 404). Histology "
        "shares must be curated from a registry table with a stated vintage."
    ),

    # CIViC files lung evidence under fifteen disease records, and its name
    # filter matches substrings, so overlapping names are de-duplicated by id.
    civic_disease=(
        "Lung Non-small Cell Carcinoma", "Lung Adenocarcinoma", "Lung Squamous Cell Carcinoma",
        "Lung Small Cell Carcinoma", "Lung Carcinoma", "Lung Cancer", "Lung Large Cell Carcinoma",
        "Adenosquamous Lung Carcinoma", "Lung Acinar Adenocarcinoma", "Mucinous Lung Adenocarcinoma",
        "Lung Combined Type Small Cell Adenocarcinoma", "Lung Mucoepidermoid Carcinoma",
        "Lung Non-Squamous Non-Small Cell Carcinoma", "Lung Sarcomatoid Carcinoma",
        "Nonsquamous Non-small Cell Lung Cancer",
    ),
    gwas_trait="lung carcinoma",
    oncotree_tissue="Lung",

    # Genes the audit reported MISSED, each read against CIViC's lung items on
    # 2026-09-19 and left unflagged on purpose. Every PMID here was resolved in
    # Europe PMC the same day; where CIViC's source is an ASCO abstract there is no
    # PMID, and it is named as an abstract rather than given one.
    #
    # ATTRIBUTION, swept 2026-09-20: as in BREAST above -- a claim is written against a PMID
    # only where the paper's own readable text states it, against the CIViC item (EID n)
    # otherwise, and an item whose status is not ACCEPTED says so.
    civic_reviewed={
        "CDKN2A": "all three level-B items pick a drug aimed at something else: TAPUR treated 29 "
                  "patients with CDKN2A-altered NSCLC and no RB mutations with palbociclib for a 31% "
                  "disease control rate -- one partial response and six with stable disease "
                  "(EID 11665; PMID 35050752 states each of those in its abstract, and CIViC files the "
                  "ASCO abstract of the same study separately, as EID 7444, DOES_NOT_SUPPORT "
                  "resistance) -- and MTAP with CDKN2A co-underexpression predicted response to "
                  "pemetrexed-based chemotherapy (EID 12723, SUBMITTED; PMID 35379845 is a "
                  "urothelial-carcinoma trial whose full text carries the lung cohort: of 72 BATTLE-2 "
                  "lung adenocarcinomas, objective responses were 54% in the CDKN2A-low/MTAP-low group "
                  "against 24% in the rest, p = 0.018). No CDK4/6 inhibitor is in lung-pipeline.csv, "
                  "so the page keeps CDKN2A as an unflagged tumour suppressor on the squamous node and "
                  "the Targets lens lists it under 'Altered often, nothing against it'",
        "FGFR1": "both level-B items are single-arm trials of FGFR inhibitors that no approval "
                 "followed: FGFR1 amplification with infigratinib (EID 1908; PMID 27870574 calls the "
                 "drug BGJ398 and reports seven partial responses, six of them confirmed, across "
                 "FGFR1-amplified squamous NSCLC and FGFR3-mutant bladder or urothelial cancer -- the "
                 "\"disease control in 18 of 36\" is the item's, not the paper's) and with dovitinib "
                 "(EID 3027; PMID 27315356 gives an overall response rate of 11.5% in its 26 patients, "
                 "with a 50% disease control rate). No FGFR inhibitor is in lung-pipeline.csv, and the "
                 "page keeps FGFR1 as an unflagged oncogene on the squamous node",
        "KEAP1": "its one level-A item is a regimen chosen on KEAP1 status, not a drug aimed at KEAP1 "
                 "-- and that item is **still SUBMITTED in CIViC** (EID 12419), not accepted. In "
                 "POSEIDON, among patients with an STK11 and/or KEAP1 mutation, median overall "
                 "survival was 15.8 months on tremelimumab with durvalumab and chemotherapy against "
                 "7.3 months on durvalumab with chemotherapy (PMID 39385035, read as full text; HR "
                 "0.64, 95% CI 0.40-1.04); against chemotherapy alone the paper gives HR 0.50 "
                 "(0.29-0.87) and quotes no medians. CIViC's own description of the item puts the 7.3 "
                 "months in the chemotherapy-only arm and pairs it with that 0.50 -- the paper was "
                 "read, not the item (INV-19). All three level-B items predict RESISTANCE: to a "
                 "cisplatin, pembrolizumab and pemetrexed regimen, alone and with an STK11 co-mutation "
                 "(EIDs 12339 and 12340, both SUBMITTED; the same paper's retrospective cohort of 871 "
                 "patients), and to a platinum doublet alongside NFE2L2 or CUL3 (EID 12558; "
                 "PMID 31548347, time to treatment failure 2.8 against 8.3 months). The page keeps "
                 "KEAP1 unflagged on two nodes, and its Targets-lens row already calls it 'a marker, "
                 "not a target'; a proposal to add the POSEIDON biomarker row is open for the user, "
                 "not taken here",
        "NFE2L2": "two of the three level-B items are ASCO abstracts of the TORC1/2 inhibitor "
                  "sapanisertib in NFE2L2-mutant squamous NSCLC, neither with a PMID, and both counts "
                  "are the items' own: one partial response of four (EID 7425, SUBMITTED) and two of "
                  "seven (EID 7446). The third predicts RESISTANCE to a platinum doublet for NFE2L2, "
                  "KEAP1 or CUL3 mutation (EID 12558; PMID 31548347). No agent aimed at NFE2L2 is in "
                  "lung-pipeline.csv, and the page keeps it as an unflagged transcription factor on "
                  "the squamous node",
        "PIK3CA": "neither level-B item supports a PI3K drug in lung: PIK3CA mutation predicted "
                  "RESISTANCE to EGFR tyrosine kinase inhibitors (EID 2355, which names gefitinib and "
                  "erlotinib; PMID 21258250 says only \"EGFR-TKIs\", and reports PIK3CA mutation in "
                  "4.1% of 166 patients, with shorter time to progression and worse overall survival), "
                  "and the Lung-MAP sub-study of taselisib in PI3K-positive squamous NSCLC closed for "
                  "futility at a 5% response rate (EID 7400, SUBMITTED, DOES_NOT_SUPPORT; "
                  "PMID 31158500). The other 18 predictive items are level C or D. Breast flags PIK3CA "
                  "druggable and lung does not, and the difference is real: no PI3K inhibitor is in "
                  "lung-pipeline.csv. The page keeps PIK3CA as an unflagged amplification on the "
                  "squamous node",
        "RB1": "one level-B item is RB1 mutation predicting better response to first-line chemotherapy "
               "in extensive-stage small cell lung cancer (EID 1866; PMID 26802149, odds ratio 5.58 "
               "for mutant against wild type); the other selects on RB1 being WILD TYPE alongside "
               "CDKN2A loss, for palbociclib (EID 11665; PMID 35050752) -- the opposite of an RB1 "
               "alteration being a target. The page keeps RB1 as an unflagged tumour suppressor on the "
               "small-cell node, whose note already says mutation calls understate how often RB1 is "
               "inactivated",
        "STK11": "nine level-B items, and nothing in them is a drug aimed at STK11. Five predict "
                 "RESISTANCE -- to PD-1 and PD-L1 inhibitors in KRAS-mutant adenocarcinoma (EID 6441; "
                 "PMID 29773717, objective response 7.4% with an STK11 co-mutation against 35.7% with "
                 "TP53), to chemo-immunotherapy alone and with a KEAP1 co-mutation (EIDs 12338 and "
                 "12340, both SUBMITTED; PMID 39385035's 871-patient cohort), to radiotherapy in stage "
                 "III disease (EID 12911, SUBMITTED; PMID 33323404 reports higher loco-regional "
                 "recurrence, p = 0.0108, and shorter disease-free survival, HR 2.53 -- CIViC files "
                 "the therapy as Chemoradiotherapy, the paper as radiotherapy with or without "
                 "concurrent chemotherapy), and to radiotherapy again (EID 12912, SUBMITTED; "
                 "PMID 35958336 is a four-page correspondence that validates that finding in public "
                 "cohorts -- in TCGA's 736 non-metastatic NSCLC, overall-survival HR 3.03 among the 83 "
                 "who received radiotherapy, and no association in the 547 who did not). Three assert "
                 "sensitivity to sirolimus, and not one of their sources mentions the drug: the items "
                 "(EIDs 2314, 2316, 2317, all SUBMITTED) carry one identical description -- \"STK11 is "
                 "mutated and inactivated in 20-30% of non-small cell lung cancers\" -- over a "
                 "cell-line panel (PMID 15021901), a mutation-frequency study (PMID 12097271) and a "
                 "188-tumour sequencing study (PMID 18948947), none of which reports a treated "
                 "patient. And the one trial that did test mTORC1/2 inhibition in STK11-deficient "
                 "NSCLC did not support it (EID 12514, DOES_NOT_SUPPORT; PMID 40069402, 49 "
                 "STK11-deficient patients given vistusertib, \"vistusertib cannot be recommended in "
                 "this context\" -- the item says the trial produced no responses, while the paper "
                 "reports two in its KRAS-mutant arm). The page keeps STK11 unflagged, with a target "
                 "card of its own, and its Targets-lens row already calls it 'not itself a target'",
        "TP53": "both level-B items come from one LACE-Bio pooled analysis of four adjuvant cisplatin "
                "trials (EIDs 1148 and 1149; PMID 26899019). The paper is more careful than the pair "
                "of items suggests: TP53 mutation was \"marginally predictive\" of benefit from "
                "adjuvant chemotherapy (interaction p = 0.06 for overall survival), with wild-type "
                "disease showing a tendency toward better outcomes on chemotherapy than on observation "
                "(HR 0.77, 95% CI 0.62-0.95) and mutant disease showing none. Either way the selection "
                "is of chemotherapy on TP53 status; nothing is aimed at TP53, which is what its target "
                "card says",
    },

    audit_waivers=(),

    # Every NCT id in it was resolved against ClinicalTrials.gov, and every
    # "approved" row checked for a lung indication on its openFDA label, before
    # the file was written (2026-09-13).
    pipeline_csv="lung-pipeline.csv",
    landscape_md=None,
)


# =====================================================================
# colorectal — the fourth dataset. Its driver class is DERIVED: no cohort
# carries it as a label, so the classifier below decides every count, and the
# node ids in subtype_to_node are a contract with data/colorectal.js.
# =====================================================================

# What the anti-EGFR label calls "RAS mutant": exon 2 (codons 12 and 13), exon 3
# (codons 59 and 61) and exon 4 (codons 117 and 146) of both KRAS and NRAS.
# Panitumumab label section 2.1, openFDA set_id e0fa4bca-f245-4d92-ae29-b0c630a315c2,
# effective 2026-06-23. HRAS is not named, so it is not here.
# Missense only: on 2026-09-13 every KRAS and NRAS call at these codons in
# crc_msk_2017 was missense (490 and 38), so the restriction moves no count in
# this cohort. Re-check it before pointing the classifier at another one.
_RAS_LABEL_CODONS = r"^[A-Z](?:12|13|59|61|117|146)[A-Z]$"
CRC_BRAF_V600E = Allele("BRAF V600E", "BRAF", protein=r"^V600E$")
CRC_KRAS_G12C = Allele("KRAS G12C", "KRAS", protein=r"^G12C$")
CRC_KRAS_LABEL_CODON = Allele("KRAS (anti-EGFR label codons)", "KRAS",
                              protein=_RAS_LABEL_CODONS, types=("Missense_Mutation",))
CRC_NRAS_LABEL_CODON = Allele("NRAS (anti-EGFR label codons)", "NRAS",
                              protein=_RAS_LABEL_CODONS, types=("Missense_Mutation",))

# Repair status comes from MOLECULAR_SUBTYPE, the study's own call and the only
# repair field present on every sample. On 2026-09-13 it read MSI 99, POLE 8,
# and the literal value "MSI Status" on the remaining 1,027 samples -- the
# study's placeholder for neither. MSI_STATUS was not used: it is missing on 327
# samples and disagrees with MOLECULAR_SUBTYPE on 12 of the rest.
CRC_DRIVER_CLASSIFIER = Classifier(
    name="colorectal driver class",
    rules=(
        ClassRule("MSI-H", attr="MOLECULAR_SUBTYPE",
                  positive=("MSI",), negative=("MSI Status", "POLE")),
        ClassRule("POLE ultramutated", attr="MOLECULAR_SUBTYPE",
                  positive=("POLE",), negative=("MSI Status",)),
        ClassRule("BRAF V600E", alleles=(CRC_BRAF_V600E,)),
        ClassRule("KRAS G12C", alleles=(CRC_KRAS_G12C,)),
        ClassRule("Other KRAS/NRAS", alleles=(CRC_KRAS_LABEL_CODON, CRC_NRAS_LABEL_CODON)),
        ClassRule("HER2 amplified", amplified=("ERBB2",)),
        ClassRule("RAS/BRAF wild type"),
    ),
    note="Computed from the study's repair call and its mutation and copy-number calls, not read "
         "off a label, in the order a treatment decision is made: MSI-H, then POLE, then BRAF V600E, "
         "KRAS G12C, any other KRAS or NRAS change at the codons the anti-EGFR labels name, ERBB2 "
         "amplification, and last, none of these. A tumour whose test for an earlier class could "
         "not be read is left unclassified rather than counted as wild type. HRAS is not counted "
         "as RAS, because the labels do not name it.",
)

# Early onset belongs to the person, not the tumour, so it was declined as an
# axis (2026-09-13). Its cohort figures are controls quoted on two cards instead:
# site-rectum (where the primary sits) and rep-dmmr (MSI). The study is
# crc_eo_2020 (Cercek et al, JNCI 2021). AGE_GROUPS is the paper's split, under 50
# against 50 and older: on 2026-09-13 EO ages ran 14-49 and AO 50-93. The
# cBioPortal release keeps the repair-deficient tumours the paper's main analysis
# left out, so these counts are the release's, not the paper's tables.
_EO_STUDY = "crc_eo_2020"
_EO_ALL = Contrast(key="eo-all", label="Diagnosed before 50 (MSK early-onset study)",
                   genes=("BRAF",), sample_filter=(("AGE_GROUPS", ("EO",)),),
                   filter_note="AGE_GROUPS = EO", study=_EO_STUDY)
_AO_ALL = Contrast(key="ao-all", label="Diagnosed at 50 or older (same study)",
                   genes=("BRAF",), sample_filter=(("AGE_GROUPS", ("AO",)),),
                   filter_note="AGE_GROUPS = AO", study=_EO_STUDY)


def _eo_slice(key: str, label: str, attr: str, value: str) -> tuple[Contrast, Contrast]:
    """One attribute value, counted in each age group as a share of that group."""
    return (
        Contrast(key=f"eo-{key}", label=f"Before 50, {label}", genes=("BRAF",),
                 sample_filter=(("AGE_GROUPS", ("EO",)), (attr, (value,))),
                 filter_note=f"AGE_GROUPS = EO; {attr} = {value}", study=_EO_STUDY, of="eo-all"),
        Contrast(key=f"ao-{key}", label=f"50 or older, {label}", genes=("BRAF",),
                 sample_filter=(("AGE_GROUPS", ("AO",)), (attr, (value,))),
                 filter_note=f"AGE_GROUPS = AO; {attr} = {value}", study=_EO_STUDY, of="ao-all"),
    )


CRC_EO_SITE_CONTRASTS = (_EO_ALL, _AO_ALL,
                         *_eo_slice("rectum", "rectal primary", "PRIMARY_TUMOR_LOCATION", "Rectum"),
                         *_eo_slice("right", "right-sided primary", "PRIMARY_TUMOR_LOCATION", "Right"))
CRC_EO_REPAIR_CONTRASTS = (_EO_ALL, _AO_ALL,
                           *_eo_slice("msi", "MSI", "MOLECULAR_SUBTYPE", "MSI"))
# The rep-dmmr card sets its BRAF rate beside the rest of TCGA's cohort (CIN and
# GS together), which is the rep-pmmr-other node's slice counted here again so
# the quoted "(17 of 386)" is checked on the card that quotes it.
CRC_TCGA_CIN_GS = Contrast(key="tcga-cin-gs", label="TCGA CIN and GS classes", genes=("BRAF",),
                           sample_filter=(("SUBTYPE", ("COAD_CIN", "READ_CIN", "COAD_GS", "READ_GS")),),
                           filter_note="SUBTYPE = COAD_CIN, READ_CIN, COAD_GS or READ_GS")

COLORECTAL = Cancer(
    id="colorectal",
    name="Colorectal Cancer",

    # crc_msk_2017 (MSK, Cancer Cell 2018): 1,134 samples from 1,099 patients with
    # metastatic disease, sequenced on MSK-IMPACT, every one also CNA-profiled.
    # The driver axis partitions this population without its MSI-H and POLE
    # tumours, and data/colorectal.js must say so with axes[].population.
    study="crc_msk_2017",
    # The plan's 22: genes that select a drug by alteration, the repair axis's
    # own genes, targets selected some other way, and the altered-but-undrugged.
    genes=(
        "KRAS", "NRAS", "BRAF", "ERBB2", "NTRK1", "RET",
        "MLH1", "MSH2", "MSH6", "PMS2", "POLE",
        "EGFR", "KDR",
        "APC", "TP53", "SMAD4", "PIK3CA", "FBXW7", "CTNNB1", "SOX9", "AMER1", "TCF7L2",
    ),
    subtype_attr=(),
    subtype_classifier=CRC_DRIVER_CLASSIFIER,
    # CONTRACT: data/colorectal.js must use exactly these node ids on its
    # driver-class axis, or the overlay silently drops every computed figure.
    subtype_to_node={
        "BRAF V600E": "drv-braf-v600e",
        "KRAS G12C": "drv-kras-g12c",
        "Other KRAS/NRAS": "drv-ras-other",
        "HER2 amplified": "drv-her2-amp",
        "RAS/BRAF wild type": "drv-wild-type",
    },
    # The user decided on 2026-09-13 that the driver-class axis leaves out MSI-H
    # tumours, which belong to the repair axis. POLE tumours are held out too
    # because the plan's precedence grouped them with MSI-H; that part was NOT
    # separately decided, and it matters for wording, since POLE tumours have
    # working mismatch repair. See the population note in data/colorectal.js.
    subtype_excluded=("MSI-H", "POLE ultramutated"),
    combos={
        # Mismatch repair as one call, the way the checkpoint-inhibitor
        # indications are written.
        "MMR": ("MLH1", "MSH2", "MSH6", "PMS2"),
    },
    alleles=(CRC_BRAF_V600E, CRC_KRAS_G12C, CRC_KRAS_LABEL_CODON, CRC_NRAS_LABEL_CODON),
    concordance=Concordance(
        row_attr=(),
        row_classifier=True,
        row_label="Driver class (derived, MSK)",
        col_attr=("PRIMARY_TUMOR_LOCATION",),
        col_label="Side of the primary tumour",
        col_labels={"Left": "Left colon or rectum", "Right": "Right colon"},
        row_order=("MSI-H", "POLE ultramutated", "BRAF V600E", "KRAS G12C",
                   "Other KRAS/NRAS", "HER2 amplified", "RAS/BRAF wild type"),
        col_order=("Left colon or rectum", "Right colon"),
        headline=(
            HeadlineCell(
                row="RAS/BRAF wild type", col="Left colon or rectum",
                forward_key="wild_type_that_is_left",
                reverse_key="left_that_is_wild_type",
                forward_label="RAS/BRAF wild-type tumours on the left or in the rectum",
                reverse_label="Left-sided or rectal tumours that are RAS/BRAF wild type",
            ),
            HeadlineCell(
                row="RAS/BRAF wild type", col="Right colon",
                forward_key="wild_type_that_is_right",
                reverse_key="right_that_is_wild_type",
                forward_label="RAS/BRAF wild-type tumours in the right colon",
                reverse_label="Right-sided tumours that are RAS/BRAF wild type",
            ),
            HeadlineCell(
                row="MSI-H", col="Right colon",
                forward_key="msi_that_is_right",
                reverse_key="right_that_is_msi",
                forward_label="MSI-H tumours in the right colon",
                reverse_label="Right-sided tumours that are MSI-H",
            ),
        ),
        note="A referral cohort of metastatic disease. The study records side as Left or Right "
             "only: its rectal primaries are filed under Left, and transverse-colon primaries "
             "appear under both. The MSI-H and POLE rows stay in this matrix although the driver "
             "axis leaves them out, because removing them would change every column's denominator.",
    ),
    # Site- and repair-axis figures from TCGA PanCanAtlas, which records both on
    # the patient: ICD_O_3_SITE for where the tumour arose, SUBTYPE for the
    # study's molecular class (CIN, GS, MSI or POLE, prefixed COAD_ or READ_).
    # Site groups use Siegel 2026's own code definitions, so the computed figures
    # and the curated shares describe the same boxes: proximal C18.0 and
    # C18.2-C18.5, distal C18.6-C18.7, rectum C19.9 and C20.9. The cohort holds no
    # appendix code (C18.1). Colon NOS (C18.9, 97 patients on 2026-09-13) gets no
    # cohort node: the genome of "site not recorded" describes no place. Lynch and
    # sporadic repair deficiency get none either, because TCGA does not separate
    # them. The node ids are a contract with data/colorectal.js.
    cohort_nodes=(
        CohortNode(node="site-proximal", study="coadread_tcga_pan_can_atlas_2018",
                   label="Proximal colon (TCGA)",
                   sample_filter=(("ICD_O_3_SITE", ("C18.0", "C18.2", "C18.3", "C18.4", "C18.5")),),
                   filter_note="ICD_O_3_SITE = C18.0 or C18.2–C18.5",
                   note="Primary tumours from TCGA PanCanAtlas whose site code falls in the proximal "
                        "colon as Siegel 2026 defines it: caecum through splenic flexure. One sample "
                        "per patient."),
        CohortNode(node="site-distal", study="coadread_tcga_pan_can_atlas_2018",
                   label="Distal colon (TCGA)",
                   sample_filter=(("ICD_O_3_SITE", ("C18.6", "C18.7")),),
                   filter_note="ICD_O_3_SITE = C18.6 or C18.7",
                   note="Primary tumours from TCGA PanCanAtlas in the descending or sigmoid colon. "
                        "One sample per patient."),
        CohortNode(node="site-rectum", study="coadread_tcga_pan_can_atlas_2018",
                   label="Rectum and rectosigmoid junction (TCGA)",
                   sample_filter=(("ICD_O_3_SITE", ("C19.9", "C20.9")),),
                   filter_note="ICD_O_3_SITE = C19.9 or C20.9",
                   note="Primary tumours from TCGA PanCanAtlas at the rectosigmoid junction or in the "
                        "rectum, grouped together as Siegel 2026 groups them. One sample per patient.",
                   contrasts=CRC_EO_SITE_CONTRASTS),
        CohortNode(node="rep-dmmr", study="coadread_tcga_pan_can_atlas_2018",
                   label="MSI class (TCGA)",
                   sample_filter=(("SUBTYPE", ("COAD_MSI", "READ_MSI")),),
                   filter_note="SUBTYPE = COAD_MSI or READ_MSI",
                   note="TCGA's own MSI molecular class, which stands in for repair deficiency here. It "
                        "is the study's call rather than the four-protein stain a pathology report "
                        "gives, and it does not separate Lynch syndrome from sporadic tumours. One "
                        "sample per patient.",
                   contrasts=(*CRC_EO_REPAIR_CONTRASTS, CRC_TCGA_CIN_GS)),
        CohortNode(node="rep-pole", study="coadread_tcga_pan_can_atlas_2018",
                   label="POLE class (TCGA)",
                   sample_filter=(("SUBTYPE", ("COAD_POLE", "READ_POLE")),),
                   filter_note="SUBTYPE = COAD_POLE or READ_POLE",
                   note="TCGA's own POLE molecular class. A small group in any cohort, so read every "
                        "figure on this card with its denominator. One sample per patient."),
        CohortNode(node="rep-pmmr-other", study="coadread_tcga_pan_can_atlas_2018",
                   label="CIN and GS classes (TCGA)",
                   sample_filter=(("SUBTYPE", ("COAD_CIN", "READ_CIN", "COAD_GS", "READ_GS")),),
                   filter_note="SUBTYPE = COAD_CIN, READ_CIN, COAD_GS or READ_GS",
                   note="TCGA's chromosomally unstable (CIN) and genomically stable (GS) classes "
                        "together: every tumour the study placed in neither its MSI nor its POLE "
                        "class. One sample per patient."),
        # CMS-axis figures from coad_silu_2022 (Roelands et al, Nat Med 2023; the
        # AC-ICAM cohort, Leiden): 348 primary colon cancers with a CMS call on
        # every patient, 281 of them with exome mutation and copy-number calls on
        # 2026-09-13 -- so each card's denominators are smaller than its class.
        # The ids are a contract with data/colorectal.js.
        *(CohortNode(node=node, study="coad_silu_2022", label=f"{label} (AC-ICAM)",
                     sample_filter=(("CMS", (value,)),), filter_note=f"CMS = {value}",
                     note="Primary colon cancers from the AC-ICAM cohort (Leiden) that the study "
                          f"called {label}. One sample per patient.")
          for node, value, label in (("cms1", "CMS1", "CMS1"), ("cms2", "CMS2", "CMS2"),
                                     ("cms3", "CMS3", "CMS3"), ("cms4", "CMS4", "CMS4"),
                                     ("cms-mixed", "mixed", "mixed CMS features"))),
    ),
    survival_study=None,
    survival_attr="SUBTYPE",

    seer_overview_url="https://seer.cancer.gov/statfacts/html/colorect.html",
    # Checked 2026-09-13: colorect-subtypes.html returns 404. Tumour-site shares
    # come from Siegel 2026 Table 2, as shares of age-adjusted rates.
    seer_subtypes_url=None,
    seer_subtypes_note=(
        "SEER publishes no colorectal subtypes page (colorect-subtypes.html returns 404). "
        "Tumour-site shares must be curated from a registry table with a stated vintage."
    ),

    civic_disease=(
        "Colorectal Cancer", "Colorectal Adenocarcinoma", "Colon Cancer", "Colon Adenocarcinoma",
        "Colon Carcinoma", "Colon Mucinous Adenocarcinoma", "Colon Signet Ring Adenocarcinoma",
        "Rectum Adenocarcinoma", "Rectum Cancer",
    ),
    # Genes the audit reported MISSED, each read against CIViC's colorectal items on
    # 2026-09-14 and left unflagged on purpose. POLE dropped out once the audit took
    # the strongest PREDICTIVE level: its level-B items are prognostic.
    civic_reviewed={
        "NRAS": "the level-A item is NRAS mutation predicting resistance to cetuximab and panitumumab "
                "(PMID 28275037) -- the RAS exclusion both labels carry, recorded as excludedBy on the "
                "EGFR target; no drug here is aimed at NRAS",
        "EGFR": "level-B items are EGFR expression predicting panitumumab response (PMID 17470858) and "
                "ectodomain variants predicting anti-EGFR resistance (PMID 29196463, SUBMITTED); the labels "
                "select on RAS status, so EGFR carries excludedBy instead of a druggable driver row",
        "PIK3CA": "wired as sourced biomarker rows rather than a druggable flag: ALASCCA aspirin "
                  "(PMID 40961426) on site-root, PIK3CA exon 20 and cetuximab (PMID 20619739) on drv-ras-wt; "
                  "no drug here is aimed at PIK3CA",
        "SMAD4": "level-B items are resistance to cetuximab and panitumumab (PMID 26508446) and SMAD4 "
                 "deletion with fluorouracil (PMID 12237773); single studies, not stated on any card",
        "FBXW7": "one level-B item, FBXW7 mutation and anti-EGFR resistance (PMID 26508446); a single "
                 "study, not stated on any card",
        "TP53": "one level-B item, TP53 wild type and benefit from capecitabine, oxaliplatin and cetuximab "
                "(PMID 24957073); a single study, not stated on any card",
    },
    # One trait is enough, measured 2026-09-13 through cxp/gwas.py: "colorectal
    # cancer" (MONDO_0005575) holds 1,031 significant associations; "colorectal
    # carcinoma" and "colorectal adenocarcinoma" add 9 distinct ones between them.
    gwas_trait="colorectal cancer",
    # Bowel also holds anal, appendiceal and small-bowel codes. Harmless: emit
    # reads only oncotree.NODE_TO_CODE_BY_CANCER, never the tissue catalogue, so
    # colorectal nodes map to COADREAD-subtree codes there.
    oncotree_tissue="Bowel",

    # Approved agents with a colorectal or tissue-agnostic indication on their
    # openFDA label, plus two filed applications, each read 2026-09-14. Every NCT
    # id was resolved against ClinicalTrials.gov that day, and each trial acronym
    # searched separately, before the file was written.
    pipeline_csv="colorectal-pipeline.csv",
    landscape_md=None,
)


# =====================================================================
# melanoma -- the fifth dataset. Two cohorts do two jobs. MSK's melanoma study
# ships a driver-class label on every patient, so the driver axis is READ, as
# lung's is. The MSK-IMPACT 50K pan-cancer cohort holds enough acral, mucosal
# and uveal melanomas to give each pathway node figures of its own. Both sets
# of node ids below are a CONTRACT with data/melanoma.js.
# =====================================================================

# DRIVER_CLASS as mel_mskimpact_2020 spells it -> the class the axis shows. On
# 2026-09-14 every one of its 696 patients (one sample each) carried a value.
MEL_DRIVER_LABELS = {
    "BRAF_CLASS_1_V600E": "BRAF V600E",
    "BRAF_CLASS_1_Other": "BRAF V600, not E",
    "BRAF_CLASS_2_3": "BRAF class 2 or 3",
    "NRAS_Q61": "NRAS Q61",
    "RAS_OTHER": "Other RAS",
    "NF1": "NF1",
    "KIT_PDGFRA": "KIT or PDGFRA",
    "Other_Driver": "Other driver",
    "Unknown_Driver": "Unknown driver",
}

# The melanoma pathways as OncoTree codes, grouped as the plan grouped them.
# OncoTree files skin, acral and unknown-primary melanoma under MEL in Skin,
# each mucosal melanoma under its own organ, and uveal melanoma under OM
# (Ocular Melanoma) in Eye. Two parent codes carry patients of their own, and
# the node notes say so: MEL, melanoma with no subtype recorded, counted as
# skin; and OM, ocular melanoma with no site in the eye recorded, counted as
# uveal. In msk_impact_50k_2026 on 2026-09-14, 201 patients had a MEL sample
# and 188 landed on the skin node by it; 18 had an OM sample and 15 landed on
# the uveal node. Two codes sit on no node: CM (conjunctival, 6 patients) and
# PCNSM (primary CNS, 2), neither one of the five pathways the axis names.
# SPZM (Spitzoid) had no patients.
MEL_PATHWAY_CODES = {
    "skin": ("SKCM", "MEL", "DESM", "SKLMM", "SPZM"),
    "acral": ("ACRM",),
    "mucosal": ("ARMM", "VMM", "HNMUCM", "ESMM", "URMM"),
    "uveal": ("UM", "OM"),
    "unknown": ("MUP",),
}
_MEL_PATHWAY_SCOPE = (("ONCOTREE_CODE", tuple(c for codes in MEL_PATHWAY_CODES.values() for c in codes)),)

MEL_BRAF_V600 = Allele("BRAF V600", "BRAF", protein=r"^V600")
MEL_BRAF_V600E = Allele("BRAF V600E", "BRAF", protein=r"^V600E$")
MEL_BRAF_V600K = Allele("BRAF V600K", "BRAF", protein=r"^V600K$")
MEL_NRAS_HOTSPOT = Allele("NRAS G12, G13 or Q61", "NRAS", protein=r"^[GQ](?:12|13|61)")
MEL_GNAQ_HOTSPOT = Allele("GNAQ Q209 or R183", "GNAQ", protein=r"^(?:Q209|R183)")
MEL_GNA11_HOTSPOT = Allele("GNA11 Q209 or R183", "GNA11", protein=r"^(?:Q209|R183)")
MEL_SF3B1_R625 = Allele("SF3B1 R625", "SF3B1", protein=r"^R625")


def _mel_pathway(node: str, key: str, label: str, codes_named: str) -> CohortNode:
    """One pathway node: its OncoTree codes, one melanoma sample per patient."""
    codes = MEL_PATHWAY_CODES[key]
    return CohortNode(
        node=node, study="msk_impact_50k_2026", label=f"{label} (MSK-IMPACT 50K)",
        sample_scope=_MEL_PATHWAY_SCOPE,
        sample_filter=(("ONCOTREE_CODE", codes),),
        filter_note=f"ONCOTREE_CODE = {' or '.join(codes)}; each patient counted once, by "
                    "the first of their melanoma samples",
        note=f"Melanomas filed as {codes_named} in the MSK-IMPACT 50K cohort (Cancer Cell "
             "2026), tumours sequenced on targeted panels at one referral centre. A patient "
             "with melanoma samples under two pathways is counted once, on the pathway of "
             "their first sample.")


MELANOMA = Cancer(
    id="melanoma",
    name="Melanoma",

    # mel_mskimpact_2020 (Clin Cancer Res 2021): 696 patients, one sample each,
    # 556 cutaneous and 140 of unknown primary, most samples metastases. Its
    # DRIVER_CLASS label is on every patient, so the driver axis partitions THIS
    # population -- skin and unknown-primary melanoma, not uveal or mucosal --
    # and data/melanoma.js must say so with axes[].population.
    study="mel_mskimpact_2020",
    # The plan's alteration panel: the MAPK drivers that define the skin classes
    # (with KRAS, HRAS and PDGFRA, which the driver label names), what the
    # acral, mucosal and uveal pathways carry instead, and the genes altered
    # across all of them. Targets selected by no tumour alteration (PMEL, PDCD1,
    # CTLA4, LAG3) belong to the targets panel, not here.
    genes=(
        "BRAF", "NRAS", "KRAS", "HRAS", "NF1", "KIT", "PDGFRA", "MAP2K1", "MAP2K2",
        "GNAQ", "GNA11", "CYSLTR2", "SF3B1", "BAP1", "EIF1AX",
        "CDKN2A", "CDK4", "CCND1", "TERT", "MDM2", "PTEN", "TP53", "MITF",
    ),
    subtype_attr=("DRIVER_CLASS",),
    subtype_labels=MEL_DRIVER_LABELS,
    # CONTRACT: data/melanoma.js must use exactly these node ids on its
    # driver-class axis, or the overlay silently drops every computed figure.
    subtype_to_node={
        "BRAF V600E": "drv-braf-v600e",
        "BRAF V600, not E": "drv-braf-v600-other",
        "BRAF class 2 or 3": "drv-braf-class23",
        "NRAS Q61": "drv-nras-q61",
        "Other RAS": "drv-ras-other",
        "NF1": "drv-nf1",
        "KIT or PDGFRA": "drv-kit",
        "Other driver": "drv-other",
        "Unknown driver": "drv-unknown",
    },
    combos={
        # One fact about uveal melanoma spread over two genes. A union of
        # alleles, so it is counted as a mutation and nothing else.
        "GNAQ or GNA11 Q209/R183": ("GNAQ Q209 or R183", "GNA11 Q209 or R183"),
    },
    alleles=(MEL_BRAF_V600, MEL_BRAF_V600E, MEL_BRAF_V600K, MEL_NRAS_HOTSPOT,
             MEL_GNAQ_HOTSPOT, MEL_GNA11_HOTSPOT, MEL_SF3B1_R625),
    # Driver class against where the primary tumour arose, both read off the
    # record. DMT_PRIMARY_SITE_CLASSIFIED is a sample attribute; on 2026-09-15
    # 695 of the 696 patients carried one: Head 162, Trunk 181, Upper Extremity
    # 102, Lower Extremity 110 and Unknown 140, the melanomas of unknown primary.
    # The one patient with no site is NF1-class, so that row holds 154, not 155.
    concordance=Concordance(
        row_attr=("DRIVER_CLASS",),
        row_label="Driver class (MSK)",
        col_attr=("DMT_PRIMARY_SITE_CLASSIFIED",),
        col_label="Where the primary melanoma arose",
        row_labels=MEL_DRIVER_LABELS,
        col_labels={"Upper Extremity": "Upper limb", "Lower Extremity": "Lower limb",
                    "Unknown": "Unknown primary"},
        row_order=("BRAF V600E", "BRAF V600, not E", "BRAF class 2 or 3", "NRAS Q61", "Other RAS",
                   "NF1", "KIT or PDGFRA", "Other driver", "Unknown driver"),
        # Head to foot, then no primary found, so the unknown primaries cannot
        # land between two body sites.
        col_order=("Head", "Trunk", "Upper limb", "Lower limb", "Unknown primary"),
        headline=(
            HeadlineCell(
                row="NF1", col="Head",
                forward_key="nf1_that_is_head",
                reverse_key="head_that_is_nf1",
                forward_label="NF1-class melanomas that arose on the head",
                reverse_label="Head melanomas that are NF1-class",
            ),
            HeadlineCell(
                row="NF1", col="Trunk",
                forward_key="nf1_that_is_trunk",
                reverse_key="trunk_that_is_nf1",
                forward_label="NF1-class melanomas that arose on the trunk",
                reverse_label="Trunk melanomas that are NF1-class",
            ),
            HeadlineCell(
                row="BRAF V600E", col="Head",
                forward_key="v600e_that_is_head",
                reverse_key="head_that_is_v600e",
                forward_label="BRAF V600E melanomas that arose on the head",
                reverse_label="Head melanomas that are BRAF V600E",
            ),
        ),
        note="A referral cohort of cutaneous melanoma and melanoma of unknown primary, sequenced "
             "mostly from metastases; the unknown-primary column is those 140 patients. The study "
             "records the site as Head, Trunk, Upper Extremity, Lower Extremity or Unknown, and its "
             "paper's Table 1 calls the head column face. One patient has no site recorded.",
    ),
    # Pathway-axis figures. The ids are a contract with data/melanoma.js.
    cohort_nodes=(
        _mel_pathway("path-skin", "skin", "Skin melanoma",
                     "cutaneous, desmoplastic, lentigo maligna or Spitzoid melanoma, or as "
                     "melanoma with no subtype recorded, which OncoTree files under skin (SKCM, "
                     "DESM, SKLMM, SPZM, MEL)"),
        _mel_pathway("path-acral", "acral", "Acral melanoma", "acral melanoma (ACRM)"),
        _mel_pathway("path-mucosal", "mucosal", "Mucosal melanoma",
                     "anorectal, vulvovaginal, head and neck, oesophageal or urethral mucosal "
                     "melanoma (ARMM, VMM, HNMUCM, ESMM, URMM)"),
        _mel_pathway("path-uveal", "uveal", "Uveal melanoma",
                     "uveal melanoma, or as ocular melanoma with no site in the eye recorded "
                     "(UM, OM)"),
        _mel_pathway("path-unknown", "unknown", "Melanoma of unknown primary",
                     "melanoma of unknown primary (MUP)"),
    ),
    survival_study=None,
    survival_attr="SUBTYPE",

    # Melanoma OF THE SKIN, invasive only: SEER counts eye and mucosal melanoma
    # with those organs. The Start lens has to say so (plan M2, phase 4).
    seer_overview_url="https://seer.cancer.gov/statfacts/html/melan.html",
    # Checked 2026-09-14: melan-subtypes.html returns 404. Pathway shares are curated.
    seer_subtypes_url=None,
    seer_subtypes_note=(
        "SEER publishes no melanoma subtypes page (melan-subtypes.html returns 404). "
        "Pathway shares must be curated from a registry table with a stated vintage."
    ),

    # Measured 2026-09-14 through cxp/civic.py: "Melanoma" alone returns all 401
    # unique melanoma items; every narrower record (Skin, Uveal, Mucosal, Acral
    # Lentiginous...) adds none, because CIViC's name filter matches substrings.
    civic_disease=("Melanoma",),
    # Measured 2026-09-14 through cxp/gwas.py: 395 + 206 + 46 = 647 associations,
    # 336 genome-wide significant, none filed under two of these traits. The
    # catalogue has no mucosal or acral melanoma trait.
    gwas_trait=("cutaneous melanoma", "melanoma", "uveal melanoma"),
    oncotree_tissue=("Skin", "Eye", "Bowel", "Vulva/Vagina", "Head and Neck",
                     "Esophagus/Stomach", "Bladder/Urinary Tract"),

    # Genes the audit reported MISSED, each read against CIViC's melanoma items on
    # 2026-09-15 and left unflagged on purpose. BRAF is not here: its rows carry
    # druggable: true, which is what the three approved BRAF and MEK combinations
    # select on.
    civic_reviewed={
        "NRAS": "the level-B items are NRAS mutation predicting response to binimetinib (PMIDs 28284557, 23414587) "
                "and NRAS Q61 predicting resistance to vemurafenib (23569304); binimetinib's US label covers only "
                "BRAF V600 disease with encorafenib, so no drug here is aimed at NRAS, and the resistance side is "
                "quoted on the BRAF V600 card from Van Allen 2014",
        "KIT": "the level-B items are KIT mutation predicting response to imatinib (21690468, 23775962) and "
               "nilotinib (26424760), and KIT amplification predicting resistance to imatinib (23775962); no KIT "
               "inhibitor carries a US melanoma indication, and the KIT card says so",
        "GNAQ": "the level-B items are GNAQ mutation predicting response to trametinib (22805292) and cabozantinib "
                "(28103611), and Q209 predicting non-response to selumetinib (24938562) -- trial results in uveal "
                "melanoma, none of them an approval; the one drug approved for uveal melanoma is chosen by the "
                "patient's HLA type, not by GNAQ",
        "CDKN2A": "its only strong predictive item is CDKN2A loss predicting RESISTANCE to vemurafenib and "
                  "dabrafenib (24265155); nothing here is aimed at CDKN2A",
        "CCND1": "its single level-B item is CCND1 amplification predicting response to carboplatin, paclitaxel and "
                 "sorafenib (26307133); no CDK4/6 inhibitor carries a melanoma indication",
        "KRAS": "the level-B items are KRAS amplification with sorafenib, carboplatin and docetaxel (26307133) and "
                "BRAF V600E alongside a KRAS mutation predicting resistance to vemurafenib and dabrafenib "
                "(24265155); no drug here is aimed at KRAS",
    },

    # Approved US indications for melanoma, plus one phase 3 vaccine trial, each
    # label read through openFDA and each NCT id resolved against
    # ClinicalTrials.gov on 2026-09-15. Two labels name no trial (Zelboraf,
    # Imlygic) and one is a cell therapy whose label cites none (Amtagvi); those
    # rows were matched by registry title and intervention instead.
    pipeline_csv="melanoma-pipeline.csv",
    landscape_md=None,
)


REGISTRY: dict[str, Cancer] = {c.id: c for c in (BREAST, PROSTATE, LUNG, COLORECTAL, MELANOMA)}
DEFAULT = BREAST.id


def get(cancer_id: str | None) -> Cancer:
    key = (cancer_id or DEFAULT).lower()
    if key not in REGISTRY:
        known = ", ".join(sorted(REGISTRY))
        raise SystemExit(f"unknown --cancer '{cancer_id}'. Known: {known}")
    return REGISTRY[key]


def ids() -> list[str]:
    return sorted(REGISTRY)
