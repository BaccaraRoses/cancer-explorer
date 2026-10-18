"""Hermetic tests for the audit's reading of data/<cancer>.js: which array holds
the nodes, and which reference ids a claim cites."""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp import audit  # noqa: E402

DATASET = """CancerExplorer.register({
  id: 'demo',
  baseline: { lifetimeRisk: 2.2 },
  targets: [
    { gene: 'EGFR', rows: [
        { nodes: ['n-a'], agents: 'drug [one]', source: 'label-x' }
    ] }
  ],
  markers: [
    { id: 'ER', label: 'Estrogen receptor' }
  ],
  nodes: [
    { id: 'n-a', axis: 'driver', label: 'A',
      molecular: { drivers: [
        { gene: 'EGFR', alteration: 'mutation', frequency: 12.5 }
      ] } },
    { id: 'n-b', axis: 'driver', label: 'B // not a comment ]' }
  ],
  glossary: { thing: { id: 'not-a-node' } }
});
"""


class TopLevelNodes(unittest.TestCase):
    def parse(self, text):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "demo.js"
            p.write_bytes(text.encode("utf-8"))
            return audit.parse_breast_js(p), audit.parse_breast_js_header(p)

    def test_nested_node_lists_and_later_blocks_are_not_nodes(self):
        parsed, _ = self.parse(DATASET)
        self.assertEqual(list(parsed["nodes"]), ["n-a", "n-b"])   # not ER, not not-a-node
        self.assertEqual(parsed["counts"], {"nodes": 2, "drivers": 1})

    def test_header_ends_at_the_top_level_array(self):
        _, header = self.parse(DATASET)
        self.assertEqual(header["lifetime_risk_pct"], 2.2)

    def test_missing_array_fails_loudly(self):
        with self.assertRaises(RuntimeError):
            self.parse(DATASET.replace("  nodes: [", "  nodez: ["))


class SourceIds(unittest.TestCase):
    def test_every_source_in_the_part_is_read(self):
        part = "{ id: 'f1', rr: { value: 2, source: 'good-ref' }, note: 'x', source: 'bad-ref' }"
        self.assertEqual(audit.source_ids(part), ["good-ref", "bad-ref"])

    def test_a_bracket_inside_a_quote_does_not_end_the_array(self):
        part = "{ id: 'f1', source: [{ ref: 'good-ref', quote: 'HR 2.1 [95% CI 1.2-3.4]' }, 'bad-ref'] }"
        self.assertEqual(audit.source_ids(part), ["good-ref", "bad-ref"])

    def test_quote_text_is_never_an_id(self):
        part = "{ id: 'f1', source: { ref: 'good-ref', quote: 'melanoma' } }"
        self.assertEqual(audit.source_ids(part), ["good-ref"])

    def test_inline_label_url_objects_cite_no_id(self):
        part = "{ id: 'f1', source: { label: 'SEER Stat Facts', url: 'https://seer.cancer.gov/x' } }"
        self.assertEqual(audit.source_ids(part), [])

    def test_node_sources_plural_is_not_a_claim_source(self):
        self.assertEqual(audit.source_ids("{ id: 'n', sources: ['a-ref'] }"), [])


if __name__ == "__main__":
    unittest.main()
