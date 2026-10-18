"""Tests for tools/verify.py's audits check and its append-only fingerprint.

tools/audits/ is the one guarded place a phase may add to: a new script only
strengthens the gate, so it must not change the fingerprint, while editing or
deleting a committed script must. Both halves are pinned here against a real
git repository in a temporary directory.
"""
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import verify  # noqa: E402

GIT = ["git", "-c", "user.name=test", "-c", "user.email=test@example.invalid"]


def git(root: Path, *args: str) -> None:
    subprocess.run(GIT + ["-C", str(root), *args], check=True, capture_output=True)


def write(root: Path, rel: str, text: str) -> Path:
    p = root / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(text.encode("utf-8"))
    return p


class CommittedDigest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        git(self.root, "init", "-q")
        write(self.root, "tools/audits/melanoma_counts.py", "raise SystemExit(0)\n")
        write(self.root, "tools/audits/_http.py", "CACHE = 'cache'\n")
        git(self.root, "add", "-A")
        git(self.root, "commit", "-q", "-m", "audits")
        self.before = verify.committed_digest(self.root, "tools/audits")

    def tearDown(self):
        self.tmp.cleanup()

    def digest(self):
        return verify.committed_digest(self.root, "tools/audits")

    def test_adding_a_script_changes_nothing(self):
        write(self.root, "tools/audits/breast_counts.py", "raise SystemExit(0)\n")
        self.assertEqual(self.digest(), self.before)

    def test_staging_a_new_script_changes_nothing(self):
        write(self.root, "tools/audits/breast_counts.py", "raise SystemExit(0)\n")
        git(self.root, "add", "-A")
        self.assertEqual(self.digest(), self.before)

    def test_the_cache_filling_changes_nothing(self):
        write(self.root, "tools/audits/cache/ab12.json", "{}")
        self.assertEqual(self.digest(), self.before)

    def test_editing_a_committed_script_changes_it(self):
        write(self.root, "tools/audits/melanoma_counts.py", "raise SystemExit(0)  # loosened\n")
        self.assertNotEqual(self.digest(), self.before)

    def test_editing_a_committed_helper_changes_it(self):
        write(self.root, "tools/audits/_http.py", "CACHE = 'elsewhere'\n")
        self.assertNotEqual(self.digest(), self.before)

    def test_deleting_a_committed_script_changes_it(self):
        (self.root / "tools/audits/melanoma_counts.py").unlink()
        self.assertNotEqual(self.digest(), self.before)

    def test_committing_a_new_script_during_a_phase_changes_it(self):
        # A phase never commits; if one did, the addition is no longer invisible.
        write(self.root, "tools/audits/breast_counts.py", "raise SystemExit(0)\n")
        git(self.root, "add", "-A")
        git(self.root, "commit", "-q", "-m", "sneaked")
        self.assertNotEqual(self.digest(), self.before)

    def test_without_git_an_addition_counts(self):
        with tempfile.TemporaryDirectory() as bare:
            root = Path(bare)
            write(root, "tools/audits/melanoma_counts.py", "raise SystemExit(0)\n")
            first = verify.committed_digest(root, "tools/audits")
            write(root, "tools/audits/breast_counts.py", "raise SystemExit(0)\n")
            self.assertNotEqual(verify.committed_digest(root, "tools/audits"), first)


class CheckAudits(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)

    def tearDown(self):
        self.tmp.cleanup()

    def run_check(self, only=None):
        return verify.check_audits(only, root=self.root)

    def test_no_scripts_passes_and_says_so(self):
        r = self.run_check()
        self.assertTrue(r["ok"])
        self.assertEqual(r["summary"], "no audit scripts yet")

    def test_passing_script(self):
        write(self.root, "tools/audits/melanoma_counts.py", "print('audit: PASS 3/3')\n")
        r = self.run_check()
        self.assertTrue(r["ok"], r)
        self.assertEqual(r["summary"], "1 audit script(s) pass")

    def test_failing_script_fails_with_its_output(self):
        write(self.root, "tools/audits/melanoma_counts.py",
              "print('BAD drv-nf1 n 154, data says 155')\nraise SystemExit(1)\n")
        r = self.run_check()
        self.assertFalse(r["ok"])
        self.assertIn("tools/audits/melanoma_counts.py: exit 1", r["details"])
        self.assertTrue(any("BAD drv-nf1" in d for d in r["details"]))

    def test_importing_cxp_fails_without_running(self):
        write(self.root, "tools/audits/melanoma_counts.py",
              "from cxp import audit\nopen('ran', 'w').close()\n")
        r = self.run_check()
        self.assertFalse(r["ok"])
        self.assertTrue(any("imports cxp" in d for d in r["details"]))
        self.assertFalse((self.root / "ran").exists())

    def test_a_helper_importing_cxp_fails(self):
        write(self.root, "tools/audits/melanoma_counts.py", "raise SystemExit(0)\n")
        write(self.root, "tools/audits/_http.py", "import cxp.cancers\n")
        r = self.run_check()
        self.assertFalse(r["ok"])
        self.assertTrue(any(d.startswith("tools/audits/_http.py: imports cxp") for d in r["details"]))

    def test_helpers_are_not_run(self):
        write(self.root, "tools/audits/_http.py", "raise SystemExit(1)\n")
        self.assertTrue(self.run_check()["ok"])

    def test_a_cancer_script_runs_only_for_its_cancer(self):
        write(self.root, "tools/audits/melanoma_counts.py", "raise SystemExit(1)\n")
        self.assertTrue(self.run_check(only={"breast"})["ok"])
        self.assertFalse(self.run_check(only={"melanoma"})["ok"])

    def test_a_script_no_cancer_owns_always_runs(self):
        write(self.root, "tools/audits/crosscheck.py", "raise SystemExit(1)\n")
        self.assertFalse(self.run_check(only={"breast"})["ok"])


if __name__ == "__main__":
    unittest.main()
