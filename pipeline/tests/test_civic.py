"""Only evidence a CIViC editor has accepted sets a level (cxp/civic.py)."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp.civic import Civic  # noqa: E402


def item(i, gene, level, status, kind="PREDICTIVE"):
    return {"id": i, "evidenceLevel": level, "evidenceType": kind, "status": status,
            "therapies": [{"name": "drug"}], "source": {"citationId": str(i), "sourceType": "PUBMED"},
            "molecularProfile": {"name": f"{gene} Mutation",
                                 "variants": [{"feature": {"name": gene, "featureType": "GENE"}}]}}


class FakeHttp:
    def __init__(self, nodes):
        self.nodes = nodes

    def post(self, url, json_body):
        return {"data": {"evidenceItems": {"totalCount": len(self.nodes),
                                           "pageInfo": {"hasNextPage": False},
                                           "nodes": self.nodes}}}


def collect(*nodes):
    return Civic(FakeHttp(list(nodes)), disease="Demo Cancer").collect()["genes"]


class StatusRule(unittest.TestCase):
    def test_pending_item_does_not_raise_the_level(self):
        # colorectal APC, 2026-10-17: accepted D, one pending B
        g = collect(item(1, "APC", "D", "ACCEPTED"), item(2, "APC", "B", "SUBMITTED"))["APC"]
        self.assertEqual(g["best_predictive_level"], "D")
        self.assertEqual(g["best_level"], "D")
        self.assertEqual(g["best_predictive_level_submitted"], "B")
        self.assertEqual(g["best_level_submitted"], "B")
        self.assertEqual((g["n_evidence_items"], g["n_accepted"]), (2, 1))

    def test_only_pending_items_leave_no_accepted_level(self):
        g = collect(item(1, "CD274", "B", "SUBMITTED"))["CD274"]
        self.assertIsNone(g["best_predictive_level"])
        self.assertEqual(g["best_predictive_level_submitted"], "B")

    def test_pending_level_is_omitted_when_it_does_not_outrank(self):
        g = collect(item(1, "KRAS", "A", "ACCEPTED"), item(2, "KRAS", "B", "SUBMITTED"))["KRAS"]
        self.assertEqual(g["best_predictive_level"], "A")
        self.assertNotIn("best_predictive_level_submitted", g)
        self.assertNotIn("best_level_submitted", g)

    def test_rejected_items_set_neither_level(self):
        g = collect(item(1, "TP53", "A", "REJECTED"))["TP53"]
        self.assertIsNone(g["best_level"])
        self.assertNotIn("best_level_submitted", g)

    def test_a_prognostic_item_is_not_predictive(self):
        g = collect(item(1, "POLE", "B", "ACCEPTED", kind="PROGNOSTIC"),
                    item(2, "POLE", "C", "ACCEPTED"))["POLE"]
        self.assertEqual((g["best_level"], g["best_predictive_level"]), ("B", "C"))


if __name__ == "__main__":
    unittest.main()
