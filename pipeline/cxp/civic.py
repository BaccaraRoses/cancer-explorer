"""CIViC — curated, evidence-levelled variant/therapy statements.

This is the source that most directly checks judgement rather than arithmetic.
`data/breast.js` carries `evidence: strong|moderate|limited` on triggers and an
implicit confidence in each therapy claim, all assigned by hand. CIViC assigns
formal evidence levels (A-E) to each statement and cites a PMID for every one.

Evidence levels (CIViC's own definitions, condensed):
    A  validated association  — proven in clinical practice / guidelines
    B  clinical evidence      — clinical trial or other primary patient data
    C  case study             — individual case reports
    D  preclinical            — in vivo / in vitro models
    E  inferential            — indirect association

Everything is CC0.

One disease string is enough for breast and prostate. Lung is not one CIViC
disease: its evidence is spread across "Lung Non-small Cell Carcinoma", "Lung
Adenocarcinoma", "Lung Small Cell Carcinoma" and a dozen more, and querying only
the first silently drops every item filed under the others. So `disease` may be
a tuple; items are fetched per disease and de-duplicated by id.
"""
from __future__ import annotations

import logging
import re
from collections import defaultdict
from typing import Any

from .http import Http

log = logging.getLogger("cxp.civic")

API = "https://civicdb.org/api/graphql"
DISEASE = "Breast Cancer"

QUERY = """
query($disease: String, $after: String) {
  evidenceItems(diseaseName: $disease, first: 50, after: $after) {
    totalCount
    pageInfo { hasNextPage endCursor }
    nodes {
      id
      evidenceLevel
      evidenceType
      evidenceDirection
      significance
      status
      therapies { name }
      molecularProfile { name variants { feature { name featureType } } }
      source { citationId sourceType }
    }
  }
}
"""

# Rank so "best level" means the strongest, not the alphabetically first.
LEVEL_RANK = {"A": 5, "B": 4, "C": 3, "D": 2, "E": 1}

# Molecular profile names look like "PIK3CA Mutation" or
# "BRCA1 Loss-of-function" or "PIK3CA Q546E OR PIK3CA Q546K".
GENE_RE = re.compile(r"\b([A-Z][A-Z0-9]{1,9})\b")

# Tokens that look like gene symbols but are not.
NOT_GENES = {
    "OR", "AND", "NOT", "DNA", "RNA", "MSI", "TMB", "HR", "HRD", "CNS", "IHC",
    "FISH", "PCR", "WT", "LOH", "EXPRESSION", "MUTATION", "AMPLIFICATION",
    "DELETION", "FUSION", "LOSS", "GAIN", "POSITIVE", "NEGATIVE", "HIGH", "LOW",
}


# Protein-change notation looks like a gene symbol to a naive regex:
# H1047R, E545K, K111N, V600E. Without this filter those become phantom "genes"
# that outrank real ones in the output.
PROTEIN_CHANGE = re.compile(r"^[A-Z]\d+[A-Z*]?$|^[A-Z]\d+[A-Z]{2,3}$")


def genes_in(profile: dict | str | None) -> list[str]:
    """Gene symbols behind a molecular profile.

    Read from the profile's variant features where CIViC supplies them: a GENE
    feature is its own symbol, a FUSION feature ("EML4::ALK") names both
    partners, and anything else (a factor such as TMB) names no gene. Splitting
    the profile NAME into capitalised words is only the fallback, because it
    turned "HLA-C COPY-NEUTRAL LOSS OF HETEROZYGOSITY" into four genes — HLA,
    COPY, NEUTRAL and OF — and breast's profiles into TRUNCATING and NUCLEAR.
    """
    if isinstance(profile, dict):
        variants = profile.get("variants") or []
        if variants:
            out: list[str] = []
            for v in variants:
                feat = (v or {}).get("feature") or {}
                kind, name = feat.get("featureType"), feat.get("name") or ""
                parts = name.split("::") if kind == "FUSION" else [name] if kind == "GENE" else []
                for p in (s.strip() for s in parts):
                    # CIViC writes an unspecified fusion partner as "v" ("v::ALK").
                    if p == "v":
                        continue
                    if p and p not in out:
                        out.append(p)
            return out
        profile = profile.get("name")
    profile_name = profile
    if not profile_name:
        return []
    out = []
    for tok in GENE_RE.findall(profile_name):
        if tok in NOT_GENES or tok in out:
            continue
        if PROTEIN_CHANGE.match(tok):
            continue
        out.append(tok)
    return out


class Civic:
    def __init__(self, http: Http, disease: str | tuple[str, ...] = DISEASE):
        self.http = http
        self.diseases: tuple[str, ...] = (disease,) if isinstance(disease, str) else tuple(disease)
        if not self.diseases:
            raise ValueError("Civic needs at least one disease name")

    def _one_disease(self, disease: str, max_pages: int) -> tuple[list[dict], int]:
        """Page through everything — the first page is only 50 of ~496."""
        items: list[dict] = []
        after: str | None = None
        total = 0
        for _ in range(max_pages):
            data = self.http.post(
                API, json_body={"query": QUERY,
                                "variables": {"disease": disease, "after": after}}
            )
            if "errors" in data:
                raise RuntimeError(f"CIViC GraphQL error: {data['errors'][:1]}")
            block = data["data"]["evidenceItems"]
            total = block.get("totalCount", total)
            items.extend(block.get("nodes") or [])
            info = block.get("pageInfo") or {}
            if not info.get("hasNextPage"):
                break
            after = info.get("endCursor")
        return items, total

    def evidence_items(self, max_pages: int = 40) -> tuple[list[dict], int, dict[str, dict]]:
        """Every item across every declared disease, each item counted once.

        CIViC's diseaseName filter is not guaranteed to be an exact match, so
        two declared names can return overlapping items; the id decides.
        """
        seen: set = set()
        items: list[dict] = []
        total = 0
        per: dict[str, dict] = {}
        for disease in self.diseases:
            got, reported = self._one_disease(disease, max_pages)
            fresh = [it for it in got if it.get("id") not in seen]
            seen.update(it.get("id") for it in fresh)
            items.extend(fresh)
            total += reported
            per[disease] = {"total_reported": reported, "n_fetched": len(got),
                            "n_new": len(fresh)}
        return items, total, per

    def collect(self) -> dict[str, Any]:
        items, total, per = self.evidence_items()

        by_gene: dict[str, dict[str, Any]] = defaultdict(
            lambda: {"n": 0, "n_accepted": 0, "best_level": None, "best_predictive": None,
                     "best_level_sub": None, "best_predictive_sub": None,
                     "levels": defaultdict(int),
                     "therapies": defaultdict(int), "types": defaultdict(int),
                     "pmids": []}
        )

        for it in items:
            lvl = it.get("evidenceLevel")
            profile = it.get("molecularProfile") or {}
            src = it.get("source") or {}
            pmid = src.get("citationId") if src.get("sourceType") == "PUBMED" else None

            # Only an item an editor has ACCEPTED sets a level. A SUBMITTED one is
            # pending review ("Curation is listed as a 'Submitted' (i.e., pending)
            # until it is accepted by an Editor", civic.readthedocs.io, curating/
            # evidence), and about half of every disease's items are. Ranked
            # together, one pending level-B item failed colorectal's gate on APC
            # and put "level A" on lung KEAP1's card (2026-10-17). Its level is
            # kept apart so a reader still sees what is waiting.
            status = it.get("status")
            best, pred = (("best_level", "best_predictive") if status == "ACCEPTED" else
                          ("best_level_sub", "best_predictive_sub") if status == "SUBMITTED" else
                          (None, None))
            for gene in genes_in(profile):
                g = by_gene[gene]
                g["n"] += 1
                if status == "ACCEPTED":
                    g["n_accepted"] += 1
                if lvl:
                    g["levels"][lvl] += 1
                    if best and LEVEL_RANK.get(lvl, 0) > LEVEL_RANK.get(g[best] or "", 0):
                        g[best] = lvl
                    # Kept apart from best_level: colorectal POLE's level-B items are
                    # prognostic and its predictive ones level C, and the audit read
                    # the B as "level-B predictive evidence exists".
                    if (pred and it.get("evidenceType") == "PREDICTIVE" and
                            LEVEL_RANK.get(lvl, 0) > LEVEL_RANK.get(g[pred] or "", 0)):
                        g[pred] = lvl
                for t in (it.get("therapies") or []):
                    if t.get("name"):
                        g["therapies"][t["name"]] += 1
                if it.get("evidenceType"):
                    g["types"][it["evidenceType"]] += 1
                if pmid and pmid not in g["pmids"]:
                    g["pmids"].append(pmid)

        def outranks(sub: str | None, acc: str | None) -> str | None:
            return sub if LEVEL_RANK.get(sub or "", 0) > LEVEL_RANK.get(acc or "", 0) else None

        genes = {
            gene: {
                "n_evidence_items": v["n"],
                "n_accepted": v["n_accepted"],
                "best_level": v["best_level"],
                "best_predictive_level": v["best_predictive"],
                # Present only where a pending item outranks every accepted one.
                **({"best_level_submitted": s} if (s := outranks(v["best_level_sub"],
                                                                 v["best_level"])) else {}),
                **({"best_predictive_level_submitted": s}
                   if (s := outranks(v["best_predictive_sub"], v["best_predictive"])) else {}),
                "levels": dict(sorted(v["levels"].items())),
                "evidence_types": dict(sorted(v["types"].items())),
                "top_therapies": [t for t, _ in sorted(
                    v["therapies"].items(), key=lambda kv: -kv[1])[:6]],
                "pmids": v["pmids"][:12],
            }
            for gene, v in sorted(by_gene.items(), key=lambda kv: -kv[1]["n"])
        }

        out: dict[str, Any] = {
            "source": "CIViC (Clinical Interpretation of Variants in Cancer)",
            "api": API,
            "licence": "CC0",
            # A single disease keeps the plain string every earlier file carries.
            "disease": self.diseases[0] if len(self.diseases) == 1 else list(self.diseases),
            "total_reported": total,
            "n_fetched": len(items),
            "status_rule": ("best_level and best_predictive_level count ACCEPTED items only; "
                            "*_submitted names a higher level held only by items still "
                            "pending editor review"),
            "level_key": {
                "A": "validated association (practice / guidelines)",
                "B": "clinical evidence (trial or primary patient data)",
                "C": "case study",
                "D": "preclinical",
                "E": "inferential",
            },
            "genes": genes,
        }
        if len(self.diseases) > 1:
            out["by_disease"] = per
        return out
