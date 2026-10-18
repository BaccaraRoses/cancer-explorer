"""The page flags a curated figure at the same distance the audit fails it."""
import re
import sys
import unittest
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE))
from cxp import audit  # noqa: E402


class DriftBand(unittest.TestCase):
    def test_render_drift_threshold_is_match_pp(self):
        js = (PIPELINE.parent / "js" / "render.js").read_text(encoding="utf-8")
        found = re.findall(r"var drift = c\.delta != null && Math\.abs\(c\.delta\) > ([\d.]+);", js)
        self.assertEqual(len(found), 1, "the drift line in js/render.js moved; update this test")
        self.assertEqual(float(found[0]), audit.MATCH_PP)


if __name__ == "__main__":
    unittest.main()
