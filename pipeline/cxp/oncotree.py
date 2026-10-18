"""OncoTree (MSK) — canonical cancer-type codes.

Our node ids (`tnbc`, `ilc`, `dcis`) are convenient but local. OncoTree codes
are the identifiers cBioPortal and much of the field already use, so attaching
them makes cross-source joins reliable instead of name-based.

The node -> OncoTree mapping is an explicit dict, deliberately. Fuzzy-matching
oncology terms is how "Invasive Breast Carcinoma" quietly becomes "Breast
Invasive Carcinosarcoma". An unmapped node stays unmapped and is reported.
"""
from __future__ import annotations

import logging
from typing import Any

from . import cancers
from .http import Http

log = logging.getLogger("cxp.oncotree")

API = "https://oncotree.mskcc.org/api/tumorTypes"

# node id -> OncoTree code, per cancer. This is content, not configuration:
# the keys are histology-axis node ids, so a cancer gets an entry here when
# its dataset is written, not before. OncoTree carries 36 breast codes and
# only 6 prostate ones, so the prostate map will be much thinner by nature.
NODE_TO_CODE_BY_CANCER: dict[str, dict[str, str]] = {}

NODE_TO_CODE: dict[str, str] = {
    # histology axis
    "idc-nst":      "IDC",     # Breast Invasive Ductal Carcinoma
    "ilc":          "ILC",     # Breast Invasive Lobular Carcinoma
    "dcis":         "DCIS",    # Breast Ductal Carcinoma In Situ
    "metaplastic":  "MBC",     # Metaplastic Breast Cancer
    "mucinous":     "IMMC",    # Breast Invasive Mixed Mucinous Carcinoma
    "papillary":    "BRCNOS",  # no dedicated papillary code; falls back to NOS
    "hist-root":    "BREAST",
    # receptor axis roots
    "ihc-root":     "BRCA",    # Invasive Breast Carcinoma
}

# Codes we expect to exist; a miss means OncoTree changed and we should know.
EXPECTED = {"BREAST", "BRCA", "IDC", "ILC", "DCIS", "MBC", "IMMC", "BRCNOS"}

NODE_TO_CODE_BY_CANCER["breast"] = NODE_TO_CODE
EXPECTED_BY_CANCER: dict[str, set[str]] = {"breast": EXPECTED}

# Lung: OncoTree nests the classes the way WHO does, including one detail that
# matters — SCLC sits under Lung Neuroendocrine Tumor, not beside NSCLC.
NODE_TO_CODE_BY_CANCER["lung"] = {
    "hist-root":     "LUNG",
    "hist-nsclc":    "NSCLC",    # Non-Small Cell Lung Cancer
    "hist-adeno":    "LUAD",     # Lung Adenocarcinoma
    "hist-squamous": "LUSC",     # Lung Squamous Cell Carcinoma
    "hist-large":    "LCLC",     # Large Cell Lung Carcinoma
    "hist-sclc":     "SCLC",     # Small Cell Lung Cancer
    "drv-root":      "LUAD",     # the driver axis partitions adenocarcinoma
}
EXPECTED_BY_CANCER["lung"] = {"LUNG", "NSCLC", "LUAD", "LUSC", "LCLC", "SCLC", "LNET"}

# Colorectal: OncoTree splits colon from rectum but has no code for proximal or
# distal colon, so the site axis's leaves stay uncoded rather than borrowing COAD.
NODE_TO_CODE_BY_CANCER["colorectal"] = {
    "site-root":   "COADREAD",   # Colorectal Adenocarcinoma
    "site-colon":  "COAD",       # Colon Adenocarcinoma
    "site-rectum": "READ",       # Rectal Adenocarcinoma
    "rep-root":    "COADREAD",   # the repair axis sorts all of it
    "drv-root":    "COADREAD",   # metastatic disease, colon and rectum alike
    "cms-root":    "COAD",       # the CMS axis's cohort is colon cancer only
}
EXPECTED_BY_CANCER["colorectal"] = {"COADREAD", "COAD", "READ", "MACR", "SRCCR"}

# Melanoma: no OncoTree code spans skin, eye and mucosa, so the pathway root,
# the cutaneous group and the mucosal node (one code per organ) stay uncoded.
# MEL would be wrong for the cutaneous group: it is also the parent of MUP.
# That is what makes it right for the driver axis's root, whose population is
# cutaneous melanoma and melanoma of unknown primary together.
# OM is Ocular Melanoma, the parent of UM and CM, which is exactly the ocular node.
NODE_TO_CODE_BY_CANCER["melanoma"] = {
    "path-skin":    "SKCM",   # Cutaneous Melanoma
    "path-acral":   "ACRM",   # Acral Melanoma
    "path-ocular":  "OM",     # Ocular Melanoma
    "path-uveal":   "UM",     # Uveal Melanoma
    "path-unknown": "MUP",    # Melanoma of Unknown Primary
    "drv-root":     "MEL",    # Melanoma: over both SKCM and MUP
}
# Every code the pathway cohort nodes filter on in cancers.py: a miss means
# OncoTree changed under the cohort filters, not only under this map.
EXPECTED_BY_CANCER["melanoma"] = {"MEL", "SKCM", "DESM", "SKLMM", "SPZM", "ACRM", "ARMM", "VMM",
                                  "HNMUCM", "ESMM", "URMM", "OM", "UM", "MUP"}


class OncoTree:
    def __init__(self, http: Http, cancer: cancers.Cancer | None = None):
        self.http = http
        self.cancer = cancer or cancers.BREAST

    def tumor_types(self) -> list[dict]:
        return self.http.get(API)

    def collect(self) -> dict[str, Any]:
        tissue = self.cancer.oncotree_tissue
        node_map = NODE_TO_CODE_BY_CANCER.get(self.cancer.id, {})
        expected = EXPECTED_BY_CANCER.get(self.cancer.id, set())

        # One tissue for most cancers. Melanoma spans several: OncoTree files skin
        # and acral melanoma under Skin, uveal under Eye, and each mucosal melanoma
        # under its own organ (anorectal under Bowel, vulvovaginal under
        # Vulva/Vagina). Filtering on Skin alone would report every uveal and
        # mucosal node as "code not present".
        tissues = (tissue,) if isinstance(tissue, str) else tuple(tissue)
        types = self.tumor_types()
        mine = [t for t in types if (t.get("tissue") or "") in tissues]
        by_code = {t["code"]: t for t in mine}

        missing = sorted(expected - set(by_code))
        if missing:
            log.warning("expected OncoTree codes absent: %s", ", ".join(missing))
        if not node_map:
            # Not an error, and not silence either: the catalogue below is
            # still useful for choosing codes when the dataset is written.
            log.warning("%s: no node->code map declared yet, so no node is coded. "
                        "The %s catalogue (%d codes) is emitted for picking from.",
                        self.cancer.id, ", ".join(tissues), len(mine))

        nodes: dict[str, Any] = {}
        for node_id, code in node_map.items():
            t = by_code.get(code)
            if not t:
                nodes[node_id] = {"code": code, "match": "missing",
                                  "note": f"code not present in the {tissue} tissue set"}
                continue
            refs = t.get("externalReferences") or {}
            nodes[node_id] = {
                "code": code,
                "name": t.get("name"),
                "parent": t.get("parent"),
                "main_type": (t.get("mainType") or None),
                "level": t.get("level"),
                "nci": refs.get("NCI"),
                "umls": refs.get("UMLS"),
                "match": "ok",
            }

        return {
            "source": "OncoTree (Memorial Sloan Kettering)",
            "api": API,
            "cancer": self.cancer.id,
            "tissue": tissue,
            "n_total_types": len(types),
            "n_tissue_types": len(mine),
            "missing_expected_codes": missing,
            "nodes": nodes,
            "catalogue": sorted(
                ({"code": t["code"], "name": t.get("name"), "parent": t.get("parent")}
                 for t in mine),
                key=lambda d: d["code"],
            ),
        }
