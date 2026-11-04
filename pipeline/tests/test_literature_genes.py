"""A paper's `genes` are the genes its own searches aimed at, never another paper's.

Every paper one agent's search returned was handed the same list object from
the agent's config, so when the merge step added a gene to one of them (a paper
two searches both found), every paper of that agent carried it. On 2026-11-03,
966 of 1,977 papers across the five cancers held a gene none of their searches
aimed at: breast showed 232 papers under PIK3CA, 73 of them really filed there.
"""
import sys
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp import literature as L  # noqa: E402


class FakeHttp:
    """Europe PMC stand-in: a query naming a drug term returns that term's papers."""

    def __init__(self, by_term):
        self.by_term = by_term

    def get(self, url, params=None):
        q = (params or {}).get("query", "")
        for term, items in self.by_term.items():
            if term in q:
                return {"resultList": {"result": items}}
        return {"resultList": {"result": []}}


def item(n, title):
    return {"id": str(n), "source": "MED", "pmid": str(n), "doi": "10.0/%d" % n,
            "title": title, "firstPublicationDate": "2025-01-0%d" % n}


class GenesAreNotShared(unittest.TestCase):
    def setUp(self):
        self.spec = {
            "Agent A": {"drug_terms": ['"druga"'], "genes": ["GENEA"], "toxicity": ["rash"]},
            "Agent B": {"drug_terms": ['"drugb"'], "genes": ["GENEB"], "toxicity": ["rash"]},
        }
        both = item(1, "druga with drugb: rash")      # found by both agents' searches
        only_a = item(2, "druga alone: rash")         # found by agent A's search only
        http = FakeHttp({'TITLE_ABS:"druga"': [both, only_a], 'TITLE_ABS:"drugb"': [both]})
        with mock.patch.dict(L.DRAWBACKS_BY_CANCER, {"testcancer": self.spec}):
            out = L.Literature(http, cancer_id="testcancer", cancer_name="test cancer").collect([])
        self.by_id = {p["id"]: p for p in out["papers"]}

    def test_a_paper_both_searches_found_carries_both_genes(self):
        self.assertEqual(sorted(self.by_id["1"]["genes"]), ["GENEA", "GENEB"])

    def test_the_merge_does_not_leak_into_another_paper(self):
        self.assertEqual(self.by_id["2"]["genes"], ["GENEA"])

    def test_the_config_is_not_rewritten(self):
        self.assertEqual(self.spec["Agent A"]["genes"], ["GENEA"])
        self.assertEqual(self.spec["Agent B"]["genes"], ["GENEB"])


if __name__ == "__main__":
    unittest.main()
