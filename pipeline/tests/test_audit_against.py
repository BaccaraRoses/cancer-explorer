"""A curated node can be audited against a cohort computed for another node.

Prostate's whole-disease and castration-resistant nodes quote cohorts the
pipeline computes under other node ids, so their twelve figures had no audit
row at all until 2026-10-17. Cancer.audit_against names the cohort; these tests
hold that a lent node is compared like any other (a moved figure fails), that a
name which does not resolve raises instead of comparing nothing, and that every
cancer's real entries resolve against its committed facts and dataset.
"""
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp import audit, cancers  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]

DATASET = """CancerExplorer.register({
  id: 'demo',
  nodes: [
    { id: 'root', axis: 'a', label: 'All',
      molecular: { drivers: [
        { gene: 'PTEN', alteration: 'deep deletion', frequency: 15 },
        { gene: 'TP53', alteration: 'mutation', frequency: 10 }
      ] } },
    { id: 'whole', axis: 's', label: 'Whole cohort' },
    { id: 'sub', axis: 'b', label: 'A subtype' }
  ]
});
"""

FACTS = {
    "drivers_by_subtype": {"sub": {"genes": {}}},
    "drivers_by_cohort": {"whole": {"genes": {
        "PTEN": {"deep_deletion": {"n": 50, "of": 333, "pct": 15.0}},
        "TP53": {"mutation": {"n": 23, "of": 333, "pct": 6.9}},
    }}},
}


def parse(text):
    with tempfile.TemporaryDirectory() as d:
        p = Path(d) / "demo.js"
        p.write_bytes(text.encode("utf-8"))
        return audit.parse_breast_js(p)


class Lent(unittest.TestCase):
    def setUp(self):
        self.hand = parse(DATASET)

    def test_without_it_the_node_has_no_rows(self):
        rows = audit.compare_drivers(self.hand, audit.computed_nodes(FACTS, self.hand))
        self.assertEqual([r for r in rows if r["node"] == "root"], [])

    def test_lent_node_is_compared_with_the_cohort(self):
        computed = audit.computed_nodes(FACTS, self.hand, {"root": "whole"})
        rows = {r["gene"]: r for r in audit.compare_drivers(self.hand, computed) if r["node"] == "root"}
        self.assertEqual(rows["PTEN"]["verdict"], "MATCH")
        self.assertEqual(rows["PTEN"]["computed"], 15.0)
        # 10 against 6.9: a figure that has moved off its cohort is caught.
        self.assertEqual(rows["TP53"]["verdict"], "CLOSE")

    def test_unknown_cohort_raises(self):
        with self.assertRaisesRegex(RuntimeError, "does not compute"):
            audit.computed_nodes(FACTS, self.hand, {"root": "whole-typo"})

    def test_node_computed_in_its_own_right_raises(self):
        with self.assertRaisesRegex(RuntimeError, "own right"):
            audit.computed_nodes(FACTS, self.hand, {"sub": "whole"})

    def test_node_missing_from_the_dataset_raises(self):
        with self.assertRaisesRegex(RuntimeError, "not a node"):
            audit.computed_nodes(FACTS, self.hand, {"rooot": "whole"})


class Configured(unittest.TestCase):
    def test_every_entry_resolves(self):
        checked = 0
        for cid in cancers.ids():
            cfg = cancers.get(cid)
            if not cfg.audit_against:
                continue
            facts = json.loads((ROOT / "pipeline" / "facts" / f"{cid}.molecular.json").read_text(encoding="utf-8"))
            hand = audit.parse_breast_js(ROOT / "data" / cfg.dataset_js)
            computed = audit.computed_nodes(facts, hand, cfg.audit_against)
            # The report run.py wrote: if the step stopped passing the field,
            # the lent rows would vanish from it and nothing else would fail.
            report = json.loads((ROOT / "pipeline" / "reports" / f"{cid}.audit.json").read_text(encoding="utf-8"))
            reported = {r["node"] for r in report["comparisons"]}
            for node in cfg.audit_against:
                with self.subTest(cancer=cid, node=node):
                    rows = audit.compare_drivers(hand, {node: computed[node]})
                    self.assertTrue(rows, f"{cid}: {node} lent a cohort but has no driver figure to compare")
                    self.assertIn(node, reported, f"reports/{cid}.audit.json has no row for {node}; "
                                                  f"re-run `run.py --cancer {cid} audit`")
            checked += 1
        self.assertGreater(checked, 0, "no cancer declares audit_against; the test checks nothing")


if __name__ == "__main__":
    unittest.main()
