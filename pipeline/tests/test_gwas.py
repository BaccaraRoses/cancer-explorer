"""The GWAS Catalog v2 client (cxp/gwas.py), against canned v2 replies."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp.gwas import API, Gwas  # noqa: E402


def assoc(i, orv=None, beta="-", p=1e-9, allele="rs1-A", genes=()):
    return {"association_id": i, "or_per_copy_num": orv, "beta": beta, "p_value": p,
            "snp_effect_allele": [allele], "mapped_genes": list(genes),
            "risk_frequency": "NR", "pvalue_description": "", "accession_id": f"GCST{i}",
            "pubmed_id": str(i)}


class FakeHttp:
    """v2 shapes, as read from the live API on 2026-10-17."""

    def __init__(self, traits, assocs, page_size=2, loci=None, total=None):
        self.traits, self.assocs, self.page_size = traits, assocs, page_size
        self.loci = loci or {}
        self.total = total

    def get(self, url, params=None):
        params = params or {}
        if url == f"{API}/efo-traits":
            return {"_embedded": {"efo_traits": self.traits}, "page": {"totalPages": 1}}
        if url == f"{API}/associations":
            assert params["show_child_traits"] == "false"
            n, size = params["page"], self.page_size
            pages = max(1, -(-len(self.assocs) // size))
            return {"_embedded": {"associations": self.assocs[n * size:(n + 1) * size]},
                    "page": {"totalPages": pages,
                             "totalElements": self.total if self.total is not None else len(self.assocs)}}
        if url.endswith("/loci"):
            aid = int(url.split("/")[-2])
            return {"_embedded": {"loci": [{"author_reported_genes": [
                {"gene_name": g} for g in self.loci.get(aid, [])]}]}}
        raise AssertionError(url)


TRAITS = [{"efo_trait": "luminal B demo carcinoma", "efo_id": "MONDO_2", "uri": "u2"},
          {"efo_trait": "Demo Carcinoma", "efo_id": "MONDO_1", "uri": "u1"}]


class V2(unittest.TestCase):
    def test_trait_is_the_exact_name_not_the_first_hit(self):
        t = Gwas(FakeHttp(TRAITS, []), "demo carcinoma").trait()
        self.assertEqual(t["efo_id"], "MONDO_1")

    def test_no_exact_name_is_an_error(self):
        with self.assertRaises(RuntimeError):
            Gwas(FakeHttp(TRAITS[:1], []), "demo carcinoma").trait()

    def test_a_trait_name_is_required(self):
        with self.assertRaises(ValueError):
            Gwas(FakeHttp(TRAITS, []), "")

    def test_beta_text_is_parsed_and_dash_is_none(self):
        self.assertEqual(Gwas._beta("1.45702 unit increase"), (1.45702, "unit increase"))
        self.assertEqual(Gwas._beta("-"), (None, None))
        self.assertEqual(Gwas._beta(None), (None, None))

    def test_every_page_is_read_and_counted(self):
        rows = [assoc(i, orv=1.1 + i / 100) for i in range(5)]
        out = Gwas(FakeHttp(TRAITS, rows), "demo carcinoma").collect()
        self.assertEqual(out["n_associations_fetched"], 5)
        self.assertEqual(out["trait"], {"name": "Demo Carcinoma", "short_form": "MONDO_1", "uri": "u1"})

    def test_a_short_read_fails(self):
        rows = [assoc(i, orv=1.2) for i in range(3)]
        with self.assertRaises(RuntimeError):
            Gwas(FakeHttp(TRAITS, rows, total=4), "demo carcinoma").collect()

    def test_effect_size_needs_or_or_beta_and_top_loci_get_reported_genes(self):
        rows = [assoc(1, orv=2.5), assoc(2, beta="0.3 unit increase"), assoc(3), assoc(4, orv=1.2, p=1e-3)]
        out = Gwas(FakeHttp(TRAITS, rows, loci={1: ["GENE1", "NR"]}), "demo carcinoma").collect()
        self.assertEqual(out["n_with_effect_size"], 3)
        self.assertEqual(out["n_genome_wide_significant"], 2)
        self.assertEqual(out["top_loci"][0]["reported_genes"], ["GENE1", "NR"])
        self.assertEqual(out["or_range"], [2.5, 2.5])

    def test_interpretation_counts_the_common_band_from_the_data(self):
        rows = [assoc(1, orv=1.1), assoc(2, orv=1.4), assoc(3, orv=3.0)]
        text = Gwas(FakeHttp(TRAITS, rows), "demo carcinoma").collect()["interpretation"]
        self.assertIn("2 of the 3 genome-wide significant associations", text)
        self.assertIn("(67%)", text)

    def test_a_multi_snp_association_keeps_every_allele(self):
        two = assoc(1, orv=1.78)
        two["snp_effect_allele"] = ["rs16825454-?", "rs824918-?"]
        top = Gwas(FakeHttp(TRAITS, [two, assoc(2, orv=1.5)]), "demo carcinoma").collect()["top_loci"]
        self.assertEqual(top[0]["risk_alleles"], ["rs16825454-?", "rs824918-?"])
        self.assertNotIn("risk_alleles", top[1])

    def test_ties_rank_by_id_not_page_order(self):
        rows = [assoc(9, orv=2.0), assoc(3, orv=2.0)]
        top = Gwas(FakeHttp(TRAITS, rows), "demo carcinoma").collect()["top_loci"]
        self.assertEqual([r["association_id"] for r in top], [3, 9])


if __name__ == "__main__":
    unittest.main()
