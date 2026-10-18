"""Hermetic tests for tools/skeptic.py: the code that decides a Skeptic round.

The model's reply is only ever input here. Every verdict below is computed from
citations and quotes that code can check, which is the point of the design.
"""
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import skeptic  # noqa: E402

RULES = """# Rules

- **INV-1** **Absent is not zero.** A cohort with no profile prints "0 profiled",
  never 0%.
- ~~**INV-2** An old rule that was retired.~~
- **INV-3** Never cite something adjacent: that looks checked when it isn't.
"""

DIFF = """diff --git a/data/x.js b/data/x.js
--- a/data/x.js
+++ b/data/x.js
@@ -1,2 +1,2 @@
-  frequency: 0.12, note: "old figure",
+  frequency: 0.0, note: “no CNA profile in this cohort”,
"""

THIS_FILE = "tools/tests/test_skeptic.py"
ANCHOR = "a sentence that exists only in this test file"


def finding(**kw):
    f = {"question": "missing", "cites": ["INV-1"], "quote": "frequency: 0.0",
         "concern": "prints 0% for a cohort that was never profiled", "severity": "high"}
    f.update(kw)
    return f


def run(findings, *, block_at="medium", dropped_by_user=None, raw=None, assessment="weak"):
    rules, _ = skeptic.parse_rules(RULES)
    if raw is None:
        raw = json.dumps({"findings": findings, "overall_assessment": assessment})
    return skeptic.judge(raw, rules=rules, rules_text=RULES, diff=DIFF, base="HEAD", phase=3, rnd=1,
                         block_at=block_at, dropped_by_user=dropped_by_user or {})


class ParseRules(unittest.TestCase):
    def test_tags_continuations_and_retired(self):
        rules, problems = skeptic.parse_rules(RULES)
        self.assertEqual([r.n for r in rules], [1, 2, 3])
        self.assertEqual(problems, [])
        self.assertIn('never 0%', rules[0].text)          # continuation line joined
        self.assertTrue(rules[0].text.startswith("**Absent is not zero.**"), rules[0].text)
        self.assertEqual(rules[1].text, "An old rule that was retired.")
        self.assertTrue(rules[1].retired)
        self.assertFalse(rules[2].retired)

    def test_duplicate_and_gap_are_problems(self):
        _, problems = skeptic.parse_rules("- **INV-1** a\n- **INV-1** b\n- **INV-4** c\n")
        self.assertTrue(any("tagged twice" in p for p in problems))
        self.assertTrue(any("INV-2, INV-3" in p for p in problems))

    def test_digest_changes_with_text(self):
        a, _ = skeptic.parse_rules(RULES)
        b, _ = skeptic.parse_rules(RULES.replace("never 0%", "never 0 %"))
        self.assertNotEqual(skeptic.rules_digest(a), skeptic.rules_digest(b))


class LoadResult(unittest.TestCase):
    def test_plain_fenced_and_prefixed(self):
        obj = {"findings": [], "overall_assessment": "holds_up"}
        self.assertEqual(skeptic.load_result(json.dumps(obj)), obj)
        self.assertEqual(skeptic.load_result("Here it is:\n```json\n" + json.dumps(obj) + "\n```"), obj)
        self.assertEqual(skeptic.load_result("Review done. " + json.dumps(obj)), obj)

    def test_not_the_contract(self):
        self.assertIsNone(skeptic.load_result("The change looks fine to me."))
        self.assertIsNone(skeptic.load_result('{"verdict": "pass"}'))


class Judge(unittest.TestCase):
    def test_cited_quoted_high_blocks(self):
        res = run([finding()])
        self.assertEqual(res["verdict"], "block")
        self.assertEqual(res["blocking"], ["P3-R1-1"])

    def test_verdict_is_computed_not_taken_from_the_model(self):
        res = run([finding()], assessment="holds_up")
        self.assertEqual(res["verdict"], "block")

    def test_low_is_recorded_but_does_not_block(self):
        res = run([finding(severity="low")])
        self.assertEqual(res["verdict"], "pass")
        self.assertEqual(len(res["valid"]), 1)

    def test_block_at_is_the_bar(self):
        self.assertEqual(run([finding(severity="medium")])["verdict"], "block")
        self.assertEqual(run([finding(severity="medium")], block_at="high")["verdict"], "pass")

    def test_missing_severity_fails_closed(self):
        res = run([finding(severity=None)])
        self.assertEqual(res["valid"][0]["severity"], "high")
        self.assertEqual(res["verdict"], "block")

    def test_no_findings_passes(self):
        self.assertEqual(run([], assessment="holds_up")["verdict"], "pass")

    def test_uncited_is_dropped(self):
        res = run([finding(cites=[])])
        self.assertEqual(res["verdict"], "pass")
        self.assertIn("cites nothing", res["dropped"][0]["why"])

    def test_unknown_and_retired_rules_do_not_resolve(self):
        for cite, why in (("INV-9", "not a rule"), ("INV-2", "retired"), ("my opinion", "not an INV-N")):
            res = run([finding(cites=[cite])])
            self.assertEqual(res["verdict"], "pass", cite)
            self.assertIn(why, res["dropped"][0]["why"])

    def test_invented_quote_is_dropped(self):
        res = run([finding(quote="frequency: 0.5, note: invented")])
        self.assertIn("not in the diff", res["dropped"][0]["why"])

    def test_short_quote_anchors_nothing(self):
        res = run([finding(quote="0.0")])
        self.assertIn("under", res["dropped"][0]["why"])

    def test_quote_from_removed_line_and_curly_quotes(self):
        self.assertEqual(run([finding(quote='note: "old figure"')])["verdict"], "block")
        self.assertEqual(run([finding(quote='note: "no CNA profile in this cohort"')])["verdict"], "block")

    def test_quote_from_rules_with_markdown_stripped(self):
        res = run([finding(cites=["INV-3", "https://example.org/paper"],
                           quote="Never cite something adjacent")])
        self.assertEqual(res["verdict"], "block")

    def test_quote_from_a_cited_repo_file(self):
        self.assertEqual(run([finding(cites=[THIS_FILE], quote=ANCHOR)])["verdict"], "block")
        self.assertEqual(run([finding(cites=[THIS_FILE + ":10"], quote=ANCHOR)])["verdict"], "block")
        # the same quote without citing the file has nowhere to be found
        self.assertEqual(run([finding(cites=["INV-1"], quote=ANCHOR)])["verdict"], "pass")

    def test_path_that_does_not_exist_or_line_out_of_range(self):
        res = run([finding(cites=["tools/no_such_file.py"])])
        self.assertIn("no such file", res["dropped"][0]["why"])
        res = run([finding(cites=[THIS_FILE + ":99999"], quote=ANCHOR)])
        self.assertIn("lines", res["dropped"][0]["why"])

    def test_one_bad_cite_beside_a_good_one_is_kept_and_noted(self):
        res = run([finding(cites=["INV-1", "INV-9"])])
        self.assertEqual(res["verdict"], "block")
        self.assertEqual(res["valid"][0]["unresolved_cites"], ["INV-9 is not a rule"])

    def test_user_dropped_objection_cannot_return(self):
        fp = skeptic.fingerprint_of(finding())
        res = run([finding(concern="reworded, same quote and cites")], dropped_by_user={fp: "P3-R1-1"})
        self.assertEqual(res["verdict"], "pass")
        self.assertIn("ruled P3-R1-1 drop", res["dropped"][0]["why"])

    def test_not_json_is_invalid_never_pass(self):
        res = run(None, raw="I reviewed it and it holds up.")
        self.assertEqual(res["verdict"], "invalid")


class StoreFiles(unittest.TestCase):
    def test_rounds_continue_and_rulings_resolve(self):
        with tempfile.TemporaryDirectory() as d:
            store = skeptic.Store(d)
            self.assertEqual(store.next_round(3), 1)
            first = run([finding()])
            store.round_file(3, 1).write_text(json.dumps(first), encoding="utf-8")
            self.assertEqual(store.next_round(3), 2)
            self.assertEqual(store.next_round(4), 1)
            (Path(d) / "rulings.txt").write_text(
                "P3-R1-1 drop the cohort was profiled; see facts\n# a comment\nP9-R1-1 keep\n", encoding="utf-8")
            dropped = store.ruled(3, "drop")
            self.assertEqual([(f["id"], why) for f, why in dropped], [("P3-R1-1", "the cohort was profiled; see facts")])
            self.assertEqual(store.ruled(3, "keep"), [])     # P9's ruling names no phase-3 objection


if __name__ == "__main__":
    unittest.main()
