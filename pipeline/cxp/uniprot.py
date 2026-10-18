"""UniProt: canonical protein length and domain architecture.

Supplies the x-axis and the domain track for the protein view. A mutation
position means nothing on its own — "H1047R" only becomes informative once you
can see it lands in the kinase domain, and E545K in the helical domain, which
is why the two respond differently to different inhibitor classes.

Reviewed (Swiss-Prot) human entries only. An unreviewed entry would give a
length that disagrees with the one cBioPortal's protein positions are indexed
against, which would silently shift every lollipop.
"""
from __future__ import annotations

import logging
from typing import Any

from .http import Http

log = logging.getLogger("cxp.uniprot")

SEARCH = "https://rest.uniprot.org/uniprotkb/search"

# Feature types worth drawing. UniProt emits dozens; these are the ones that
# carry structural meaning at the scale of a whole-protein track.
DRAWN = ("Domain", "Region", "Zinc finger", "DNA binding", "Repeat")


def _features(entry: dict, wanted: tuple[str, ...]) -> list[dict]:
    out = []
    for f in entry.get("features", []):
        if f.get("type") not in wanted:
            continue
        loc = f.get("location") or {}
        start = (loc.get("start") or {}).get("value")
        end = (loc.get("end") or {}).get("value")
        if not isinstance(start, int) or not isinstance(end, int):
            continue
        out.append({
            "kind": f["type"],
            "name": f.get("description") or f["type"],
            "start": start,
            "end": end,
        })
    out.sort(key=lambda d: d["start"])
    return out


class UniProt:
    def __init__(self, http: Http):
        self.http = http

    def entry(self, symbol: str) -> dict[str, Any] | None:
        """Reviewed human entry for a gene symbol, or None."""
        data = self.http.get(SEARCH, params={
            "query": f"gene_exact:{symbol} AND organism_id:9606 AND reviewed:true",
            "fields": "accession,id,protein_name,length,ft_domain,ft_region,ft_zn_fing,"
                      "ft_dna_bind,ft_repeat,xref_pdb",
            "format": "json",
            "size": "1",
        })
        results = (data or {}).get("results") or []
        if not results:
            log.warning("uniprot: no reviewed human entry for %s", symbol)
            return None
        e = results[0]

        name = ((e.get("proteinDescription") or {}).get("recommendedName") or {})
        full = ((name.get("fullName") or {}).get("value")) or symbol

        pdb = [x["id"] for x in e.get("uniProtKBCrossReferences", [])
               if x.get("database") == "PDB"]

        return {
            "gene": symbol,
            "accession": e["primaryAccession"],
            "entry_name": e.get("uniProtkbId"),
            "protein": full,
            "length": (e.get("sequence") or {}).get("length"),
            "domains": _features(e, DRAWN),
            "pdb_count": len(pdb),
            "pdb_ids": pdb[:40],
            "url": f"https://www.uniprot.org/uniprotkb/{e['primaryAccession']}",
            "alphafold": f"https://alphafold.ebi.ac.uk/entry/{e['primaryAccession']}",
        }

    def collect(self, symbols: list[str]) -> dict[str, Any]:
        out: dict[str, Any] = {}
        for s in symbols:
            rec = self.entry(s)
            if rec:
                out[s] = rec
        return {
            "source": "UniProt (Swiss-Prot, reviewed human entries)",
            "api": SEARCH,
            "licence": "CC BY 4.0",
            "n_genes": len(out),
            "genes": out,
        }
