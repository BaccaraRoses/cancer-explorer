"""GWAS Catalog (EMBL-EBI) — common-variant risk loci for one cancer's trait(s).

READ THIS BEFORE WIRING THE OUTPUT INTO THE UI.

These are **polygenic common-variant** associations, typical odds ratios around
1.05-1.5. They are a categorically different thing from the **monogenic**
penetrance figures in `triggers` (a rare inherited variant's lifetime risk). One
describes a small shift in population risk from a common SNP; the other
describes a rare variant that dominates an individual's risk.

Listing them together would be actively misleading, so the emitted overlay keeps
them in a separate `polygenic` block. Do not merge them into `triggers`.

API: REST v2. The legacy v1 API answers 410 Gone ("This legacy GWAS Catalog
REST API is no longer available"); the move is described in
https://www.ebi.ac.uk/gwas/docs/news/rest-api-v2-migration-guide (2026-08-19).
Two v2 behaviours this client depends on:

  * `/efo-traits?efo_trait=` is a fuzzy search ("breast carcinoma" returns
    "luminal B breast carcinoma" first), so the trait is the hit whose name
    matches exactly, ignoring case, and no hit is an error, not a guess.
  * `/associations?efo_id=` includes child traits unless
    `show_child_traits=false`; with it, the count matches v1's per-trait list
    (breast carcinoma: 2,094 in both, 2026-10-17).

Author-reported genes moved off the association record onto its loci, so they
are fetched for the top loci only.
"""
from __future__ import annotations

import json
import logging
import re
from typing import Any

from .http import Http

log = logging.getLogger("cxp.gwas")

API = "https://www.ebi.ac.uk/gwas/rest/api/v2"

# Genome-wide significance. Anything weaker is noise at this scale.
P_THRESHOLD = 5e-8
TOP_N = 50
# The band the interpretation counts: common variants, small effects.
COMMON_OR = (1.0, 1.5)

# v2 writes beta as text: "1.45702 unit increase", or "-" for none.
_BETA = re.compile(r"\s*(\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)\s*(.*)")


class Gwas:
    def __init__(self, http: Http, trait_name: str | tuple[str, ...]):
        self.http = http
        # One trait name, or several. Colorectal's extra traits added 9 of 1,014
        # distinct hits and one name was kept; melanoma's do not overlap that way
        # ("cutaneous melanoma" and "melanoma" share 19 of 242 distinct
        # significant alleles, measured 2026-09-14), so a tuple is read whole.
        self.trait_name = trait_name
        self.trait_names = (trait_name,) if isinstance(trait_name, str) else tuple(trait_name)
        if not all(self.trait_names):
            raise ValueError("a GWAS trait name is required")

    def trait(self, name: str | None = None) -> dict:
        name = name or self.trait_names[0]
        hits: list[dict] = []
        page = 0
        while True:
            d = self.http.get(f"{API}/efo-traits",
                              params={"efo_trait": name, "size": 100, "page": page})
            batch = (d.get("_embedded") or {}).get("efo_traits") or []
            hits.extend(batch)
            exact = [t for t in batch if (t.get("efo_trait") or "").casefold() == name.casefold()]
            if exact:
                return exact[0]
            page += 1
            if page >= (d.get("page") or {}).get("totalPages", 1):
                break
        near = ", ".join(repr(t.get("efo_trait")) for t in hits[:5]) or "nothing"
        raise RuntimeError(f"GWAS Catalog knows no trait named exactly {name!r} "
                           f"(the search returned {near})")

    def associations(self, efo_id: str, size: int = 500) -> list[dict]:
        out: list[dict] = []
        page, total = 0, None
        while True:
            d = self.http.get(f"{API}/associations",
                              params={"efo_id": efo_id, "show_child_traits": "false",
                                      "size": size, "page": page})
            out.extend((d.get("_embedded") or {}).get("associations") or [])
            info = d.get("page") or {}
            total = info.get("totalElements")
            page += 1
            if page >= info.get("totalPages", 1):
                break
        # No page cap: v1 stopped at six pages of 500, which prostate (2,911)
        # was close to. Reading every page and checking the count means a
        # short read fails here instead of shrinking the figures.
        ids = {self._identity(a) for a in out}
        if total is not None and (len(out) != total or len(ids) != total):
            raise RuntimeError(f"GWAS Catalog {efo_id}: {total} associations reported, "
                               f"{len(out)} read ({len(ids)} distinct)")
        return out

    def reported_genes(self, association_id: Any) -> list[str]:
        d = self.http.get(f"{API}/associations/{association_id}/loci")
        genes: list[str] = []
        for lo in (d.get("_embedded") or {}).get("loci") or []:
            for g in lo.get("author_reported_genes") or []:
                name = g.get("gene_name") if isinstance(g, dict) else g
                if name and name not in genes:
                    genes.append(name)
        return genes

    @staticmethod
    def _identity(a: dict) -> str:
        """One association can be mapped to several traits; count it once."""
        if a.get("association_id") is not None:
            return str(a["association_id"])
        href = (((a.get("_links") or {}).get("self") or {}).get("href"))
        return href or json.dumps(a, sort_keys=True)

    @staticmethod
    def _beta(text: Any) -> tuple[float | None, str | None]:
        m = _BETA.fullmatch(text) if isinstance(text, str) else None
        if not m:
            return None, None
        return float(m.group(1)), (m.group(2) or None)

    @staticmethod
    def _flatten(a: dict) -> dict | None:
        p = a.get("p_value")
        orv = a.get("or_per_copy_num")
        beta, beta_unit = Gwas._beta(a.get("beta"))
        if p is None or (orv is None and beta is None):
            return None
        alleles = [x for x in a.get("snp_effect_allele") or [] if x]
        return {
            "association_id": a.get("association_id"),
            "risk_allele": alleles[0] if alleles else None,
            # A multi-SNP association names every variant; "first" is only the
            # API's order (v1 and v2 list colorectal's rs824918 pair differently).
            **({"risk_alleles": alleles} if len(alleles) > 1 else {}),
            "reported_genes": [],
            "mapped_genes": list(a.get("mapped_genes") or []),
            "odds_ratio": orv,
            "beta": beta,
            "beta_unit": beta_unit,
            "pvalue": p,
            "pvalue_description": a.get("pvalue_description") or None,
            "risk_allele_frequency": a.get("risk_frequency"),
            "study": a.get("accession_id"),
            "pubmed_id": a.get("pubmed_id"),
        }

    def collect(self) -> dict[str, Any]:
        resolved = []
        raw: list[dict] = []
        seen: set[str] = set()
        for name in self.trait_names:
            t = self.trait(name)
            batch = self.associations(t.get("efo_id"))
            fresh = [a for a in batch if self._identity(a) not in seen]
            seen.update(self._identity(a) for a in fresh)
            raw.extend(fresh)
            resolved.append((t, len(batch), len(fresh)))
        t = resolved[0][0]

        rows = [r for r in (self._flatten(a) for a in raw) if r]
        significant = [r for r in rows if r["pvalue"] and r["pvalue"] < P_THRESHOLD]
        # Rank by effect size, not p-value: a huge cohort makes tiny effects
        # significant, and effect size is what a reader should weigh. The id
        # breaks ties, so the top list does not depend on the API's page order.
        significant.sort(key=lambda r: (-(r["odds_ratio"] or 0), int(r["association_id"] or 0)))
        top = significant[:TOP_N]
        for r in top:
            r["reported_genes"] = self.reported_genes(r["association_id"])

        ors = [r["odds_ratio"] for r in top if r["odds_ratio"]]
        sig_ors = [r["odds_ratio"] for r in significant if r["odds_ratio"]]
        lo, hi = COMMON_OR
        n_common = sum(1 for x in sig_ors if lo <= x <= hi)
        share = (f"{n_common:,} of the {len(sig_ors):,} genome-wide significant associations "
                 f"that report an odds ratio ({100 * n_common / len(sig_ors):.0f}%) sit at "
                 f"OR {lo}-{hi} (common variants, small effects)") if sig_ors else \
                "No genome-wide significant association here reports an odds ratio"
        out = {
            "source": "GWAS Catalog (EMBL-EBI)",
            "api": API,
            "trait": {"name": t.get("efo_trait"), "short_form": t.get("efo_id"), "uri": t.get("uri")},
            "interpretation": (
                f"Association study results, odds ratio per risk allele. {share}. Because "
                "top_loci is ranked by effect size it deliberately surfaces the tail: "
                "rarer variants with larger ORs. Even those are NOT equivalent to the "
                "monogenic penetrance figures in `triggers` (a rare inherited variant's "
                "lifetime risk) — an odds ratio is a relative shift in population risk, "
                "not an individual's lifetime probability. Do not present the two in the "
                "same list."
            ),
            "p_threshold": P_THRESHOLD,
            "n_associations_fetched": len(raw),
            "n_with_effect_size": len(rows),
            "n_genome_wide_significant": len(significant),
            "or_range": [min(ors), max(ors)] if ors else None,
            "top_loci": top,
        }
        if len(self.trait_names) > 1:
            # Only for several traits, so a single-trait file keeps its shape.
            out["traits"] = [
                {"name": tr.get("efo_trait"), "short_form": tr.get("efo_id"), "uri": tr.get("uri"),
                 "n_associations": n, "n_not_seen_under_an_earlier_trait": n_new}
                for tr, n, n_new in resolved
            ]
        return out
