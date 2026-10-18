"""Every tracked output is written LF on both stations (cxp/files.py)."""
import re
import sys
import tempfile
import unittest
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE))
from cxp.files import write_lf  # noqa: E402


class WriteLf(unittest.TestCase):
    def test_bytes_are_lf_and_utf8(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "x.json"
            write_lf(p, '{\n  "a": "—"\n}\n')
            self.assertEqual(p.read_bytes(), '{\n  "a": "—"\n}\n'.encode("utf-8"))

    def test_no_module_writes_text_another_way(self):
        # Path.write_text writes CRLF on Windows: one call site left on it turns
        # every cross-station re-run of that file into a whole-file diff.
        offenders = []
        for p in [PIPELINE / "run.py", *sorted((PIPELINE / "cxp").glob("*.py"))]:
            if p.name == "files.py":
                continue
            for n, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
                if re.search(r"\.write_text\(", line):
                    offenders.append(f"{p.relative_to(PIPELINE).as_posix()}:{n}")
        self.assertEqual(offenders, [], "use cxp.files.write_lf")


if __name__ == "__main__":
    unittest.main()
