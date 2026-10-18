"""Tests for cxp/gate.py, the audit's pass bar.

    cd pipeline
    python -m unittest discover -s tests

Hermetic: every case builds its report dict by hand, so the result never
depends on which audit last ran.
"""
import sys
import unittest
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE))

from cxp import cancers, gate  # noqa: E402
from cxp.cancers import Waiver  # noqa: E402


def driver(node, gene, verdict, metric="amplification", hand=80.0, computed=70.9, of=55):
    return {"node": node, "gene": gene, "metric": metric, "verdict": verdict,
            "hand": hand, "computed": computed, "of": of}


def report(**sections):
    base = {"comparisons": [], "quoted_counts": [], "prevalence": [], "overview": [],
            "druggability": [], "source_coverage": {"dangling_reference_ids": []}}
    base.update(sections)
    return base


class Verdicts(unittest.TestCase):
    def test_clean_report_passes(self):
        r = gate.evaluate(report(comparisons=[driver("n", "TP53", "MATCH")],
                                 overview=[{"what": "baseline.lifetimeRisk", "verdict": "MATCH"}]))
        self.assertTrue(r.passed)
        self.assertEqual(r.checked, 3)   # two rows plus the dangling-reference check

    def test_divergent_fails_without_a_waiver(self):
        r = gate.evaluate(report(comparisons=[driver("her2", "ERBB2", "DIVERGENT")]))
        self.assertFalse(r.passed)
        self.assertEqual(r.failures[0].key, "her2/ERBB2/amplification")

    def test_close_fails_without_a_waiver(self):
        self.assertFalse(gate.evaluate(report(comparisons=[driver("her2", "ERBB2", "CLOSE")])).passed)

    def test_low_n_passes_by_rule(self):
        self.assertTrue(gate.evaluate(report(comparisons=[driver("n", "TP53", "LOW N", of=8)])).passed)

    def test_not_computed_passes_only_for_a_non_gene(self):
        self.assertTrue(gate.evaluate(report(comparisons=[driver("n", "APOBEC", "NOT COMPUTED")])).passed)
        self.assertFalse(gate.evaluate(report(comparisons=[driver("n", "MYC", "NOT COMPUTED")])).passed)

    def test_quoted_counts_must_match(self):
        for v in ("PCT WRONG", "UNTRACED"):
            row = {"node": "state-metastatic", "quoted": "13.0% (112 of 862)", "verdict": v}
            self.assertFalse(gate.evaluate(report(quoted_counts=[row])).passed, v)

    def test_druggability(self):
        for v in ("SUPPORTED", "AGREED", "REVIEWED"):
            self.assertTrue(gate.evaluate(report(druggability=[{"gene": "X", "verdict": v}])).passed, v)
        for v in ("MISSED", "UNSUPPORTED"):
            self.assertFalse(gate.evaluate(report(druggability=[{"gene": "X", "verdict": v}])).passed, v)

    def test_prevalence_and_overview_fail_off_match(self):
        self.assertFalse(gate.evaluate(report(prevalence=[{"node": "tnbc", "verdict": "CLOSE"}])).passed)
        self.assertFalse(gate.evaluate(report(overview=[{"what": "stage X (share)", "verdict": "NOT IN SEER"}])).passed)

    def test_dangling_reference_fails(self):
        r = gate.evaluate(report(source_coverage={"dangling_reference_ids": ["smith-2020"]}))
        self.assertFalse(r.passed)
        self.assertIn("smith-2020", r.failures[0].detail)

    def test_unknown_verdict_fails(self):
        self.assertFalse(gate.evaluate(report(comparisons=[driver("n", "TP53", "SOMETHING NEW")])).passed)


class Waivers(unittest.TestCase):
    W = Waiver("comparisons", "her2/ERBB2/amplification", "CLOSE", "threshold reading")

    def test_waiver_lets_its_verdict_through(self):
        r = gate.evaluate(report(comparisons=[driver("her2", "ERBB2", "CLOSE")]), (self.W,))
        self.assertTrue(r.passed)
        self.assertEqual([ln.key for ln in r.waived], ["her2/ERBB2/amplification"])

    def test_waiver_is_pinned_to_its_verdict(self):
        r = gate.evaluate(report(comparisons=[driver("her2", "ERBB2", "DIVERGENT")]), (self.W,))
        self.assertFalse(r.passed)
        self.assertIn("covers CLOSE, not DIVERGENT", r.failures[0].detail)

    def test_waiver_on_a_passing_row_is_stale_and_fails(self):
        r = gate.evaluate(report(comparisons=[driver("her2", "ERBB2", "MATCH")]), (self.W,))
        self.assertFalse(r.passed)
        self.assertEqual((len(r.stale), len(r.failures)), (1, 0))
        self.assertEqual(gate.render(r)[0].split("  ")[0], "gate: FAIL -- 1 stale waiver(s)")

    def test_waiver_for_a_missing_row_is_stale_and_fails(self):
        r = gate.evaluate(report(), (self.W,))
        self.assertFalse(r.passed)
        self.assertIn("no such row", r.stale[0].detail)

    def test_debt_passes_but_is_listed_as_debt(self):
        w = Waiver("druggability", "RB1", "MISSED", "never read", debt=True)
        r = gate.evaluate(report(druggability=[{"gene": "RB1", "verdict": "MISSED"}]), (w,))
        self.assertTrue(r.passed)
        self.assertEqual((len(r.debt), len(r.waived)), (1, 0))

    def test_waiver_only_covers_its_own_row(self):
        r = gate.evaluate(report(comparisons=[driver("basal", "ERBB2", "CLOSE")]), (self.W,))
        self.assertFalse(r.passed)

    def test_bad_waivers_fail(self):
        typo = Waiver("comparison", "x", "CLOSE", "typo in the section name")
        self.assertFalse(gate.evaluate(report(), (typo,)).passed)
        self.assertFalse(gate.evaluate(report(), (self.W, self.W)).passed)

    def test_render_leads_with_the_verdict(self):
        ok = gate.render(gate.evaluate(report()))
        bad = gate.render(gate.evaluate(report(comparisons=[driver("n", "TP53", "DIVERGENT")])))
        self.assertTrue(ok[0].startswith("gate: PASS"))
        self.assertTrue(bad[0].startswith("gate: FAIL"))


class DeclaredWaivers(unittest.TestCase):
    """The waivers in cancers.py are well formed. Whether they still match the
    data is `run.py audit`'s job, on a freshly written report; tools/verify.py
    runs it for every cancer."""

    def test_declared_waivers_are_well_formed(self):
        for cid in cancers.ids():
            waivers = cancers.get(cid).audit_waivers
            with self.subTest(cancer=cid):
                self.assertEqual([str(x) for x in gate.evaluate(report(), waivers).failures], [])
                for w in waivers:
                    self.assertTrue(w.reason.strip(), f"{w.key}: a waiver needs a reason")
                    self.assertNotIn(w.verdict, gate.PASSING[w.section], f"{w.key}: waives a passing verdict")


if __name__ == "__main__":
    unittest.main()
