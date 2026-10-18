"""Tests for tools/sitescan.py: one planted defect per rule, and the near misses it must pass.

Every test builds a clean four-path site in a temporary folder, plants one thing,
and checks the scan names it with the right kind. The identity tokens and the
.env value are made up here: the real ones live outside this repository.
"""
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import sitescan  # noqa: E402

# The planted tokens and credential shapes below are built from parts, so this file
# never holds one whole: tools/publish.py refuses any file that does.
IDENTITY = ["jdoe-pseudo", "janedoe", "C:" + "\\" + "Users", ".env"]
SECRETS = {"NCBI_API_KEY": "s3cr3t-value-0123456789"}

# a JPEG with only JFIF (APP0): no metadata
JPEG_CLEAN = b"\xff\xd8" + b"\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00" + b"\xff\xda\x00\x02"
JPEG_EXIF = b"\xff\xd8" + b"\xff\xe1\x00\x08Exif\x00\x00" + b"\xff\xda\x00\x02"
PNG_TEXT = (b"\x89PNG\r\n\x1a\n" + (0).to_bytes(4, "big") + b"IHDR" + b"\x00" * 4
            + (6).to_bytes(4, "big") + b"tEXtAuthor" + b"\x00" * 4)


class SiteScan(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.put("index.html", "<!doctype html><title>x</title><script src='js/app.js'></script>")
        self.put("css/site.css", "a:hover { color: red } @media (max-width: 600px) { a { x: 1 } }")
        self.put("js/app.js", "/* reads data/<cancer>.facts.js, produced by pipeline/run.py */\nvar a = 1;\n")
        self.put("data/breast.js", "var refs = [{ label: 'Peng X et al', url: 'https://pubmed.ncbi.nlm.nih.gov/1/' }];\n")
        (self.root / "data/img").mkdir(parents=True)
        (self.root / "data/img/1abc.jpg").write_bytes(JPEG_CLEAN)

    def tearDown(self):
        self.tmp.cleanup()

    def put(self, rel, text):
        p = self.root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(text.encode("utf-8"))

    def scan(self, staged=False):
        return sitescan.scan(self.root, IDENTITY, SECRETS, staged=staged)

    def assertFlags(self, kind, rel_prefix):
        hits = [p for p in self.scan() if p.startswith(rel_prefix) and f" {kind}:" in p]
        self.assertTrue(hits, f"expected a {kind} problem in {rel_prefix}; got {self.scan()}")

    # --- the clean site and its near misses ---------------------------------------
    def test_clean_site_passes(self):
        self.assertEqual(self.scan(), [])
        self.assertEqual(self.scan(staged=True), [])

    def test_near_misses_pass(self):
        # a slug that contains "sk-", a DOI, a URL scheme, a CSS pseudo-class, an
        # author named like the user's surname, JPEG-ish bytes around an "@"
        self.put("data/lung.js",
                 "var n = { id: 'risk-metastasis-stage-i-iii-and-more-text' };\n"
                 "var d = 'https://doi.org/10.1016/j.cell.2018.03.022';\n"
                 "var s = 'file size .@2.rO'; var h = 'PD-L1 in HER2+ CDK4/6';\n")
        self.assertEqual(self.scan(), [])

    # --- the regression: the three shapes that were live until 2026-09-28 -------------
    def test_the_live_leak_2026_09_28(self):
        self.put("data/breast.targets.js",
                 '{"drugs": "curated drug pipeline (../cancer_research/pipeline.csv)",\n'
                 ' "trials": "ClinicalTrials.gov via pipeline/facts/breast.trials.json",\n'
                 ' "drug_source": "cancer_research\\\\pipeline.csv"}\n')
        problems = [p for p in self.scan() if p.startswith("data/breast.targets.js")]
        self.assertEqual({p.split(":")[1] for p in problems}, {"1", "2", "3"})
        self.assertTrue(all(" path:" in p for p in problems))

    def test_pipeline_path_in_a_comment_is_allowed(self):
        self.put("data/prostate.js", "/* They come from pipeline/facts/prostate.overview.json */\n")
        self.assertEqual(self.scan(), [])

    # --- one per rule ---------------------------------------------------------------
    def test_env_file(self):
        self.put(".env", "X=1")
        self.assertTrue(any(p.startswith(".env") and " file:" in p for p in self.scan(staged=True)))
        self.put("data/.env", "X=1")
        self.assertFlags("file", "data/.env")

    def test_pipeline_folder_and_python(self):
        self.put("data/pipeline/run.py", "print(1)")
        self.assertFlags("file", "data/pipeline/run.py")

    def test_git_and_sourcemap(self):
        self.put("js/.git/config", "[core]")
        self.put("js/app.js.map", "{}")
        self.assertFlags("file", "js/.git/config")
        self.assertFlags("file", "js/app.js.map")

    def test_staged_copy_holds_only_the_four_paths(self):
        self.put("HANDOFF.md", "notes")
        (self.root / "css").rename(self.root / "styles")
        problems = self.scan(staged=True)
        self.assertIn("HANDOFF.md: file: not one of the four site paths", problems)
        self.assertIn("css: file: site path missing", problems)

    def test_identity_string_any_case_and_in_binary(self):
        self.put("js/app.js", "// by JaneDoe\n")
        self.assertFlags("identity", "js/app.js")
        (self.root / "data/img/2xyz.jpg").write_bytes(JPEG_CLEAN + b"jdoe-pseudo")
        self.assertFlags("identity", "data/img/2xyz.jpg")

    def test_identity_windows_path(self):
        self.put("data/colorectal.js", "var p = 'C:\\\\Users\\\\someone\\\\x';\n")
        self.assertFlags("identity", "data/colorectal.js")
        self.assertFlags("path", "data/colorectal.js")

    def test_env_value(self):
        self.put("data/melanoma.js", "var k = 's3cr3t-value-0123456789';\n")
        problems = [p for p in self.scan() if " secret:" in p]
        self.assertTrue(problems)
        self.assertFalse(any("s3cr3t" in p for p in problems), "the value must never be printed")

    def test_credential_shapes(self):
        for text in ("var k = 'sk-" + "abcdefghijklmnopqrstuvwxyz';",
                     "fetch('https://api.example.org/x?api" + "_key=abc')",
                     "u = 'https://eutils.ncbi.nlm.nih.gov/x?tool=a&em" + "ail=z'",
                     "-----BEGIN RSA PRIVATE" + " KEY-----"):
            self.put("js/k.js", text)
            self.assertFlags("secret", "js/k.js")

    def test_paths(self):
        for text in ("x = '/" + "Users/someone/site'", "x = 'C:/Developer/site'", "AppData\\Local",
                     "x = 'file:///C:/Developer/x.html'"):
            self.put("js/p.js", text)
            self.assertFlags("path", "js/p.js")

    def test_hosts(self):
        for text in ("http://localhost:8000/", "http://192.168.1.20/", "http://box-1234.local:3000"):
            self.put("js/h.js", text)
            self.assertFlags("host", "js/h.js")

    def test_git_remote_host_whole_names_only(self):
        self.put("js/h.js", "var u = 'ssh://gitbox/x';\n")
        problems = sitescan.scan(self.root, IDENTITY, SECRETS, hosts=["gitbox"])
        self.assertTrue(any(p.startswith("js/h.js:1: host:") for p in problems), problems)
        self.put("js/h.js", "var u = 'gitboxes, my-gitbox-chart, mygitbox';\n")
        self.assertEqual(sitescan.scan(self.root, IDENTITY, SECRETS, hosts=["gitbox"]), [])

    def test_git_hosts_reads_remotes_and_skips_hosted_services(self):
        with tempfile.TemporaryDirectory() as d:
            subprocess.run(["git", "init", "-q", d], check=True)
            for name, url in (("a", "ssh://git@gitbox:2222/o/r.git"), ("b", "git@lanbox:o/r.git"),
                              ("c", "https://github.com/o/r"), ("d", "git@github-alias:o/r.git"),
                              ("e", "/srv/r.git")):
                subprocess.run(["git", "-C", d, "remote", "add", name, url], check=True)
            self.assertEqual(sitescan.git_hosts(Path(d)), ["gitbox", "lanbox"])

    def test_email(self):
        self.put("index.html", "<p>contact jane.doe@example.org</p>")
        self.assertFlags("email", "index.html")

    def test_jpeg_exif_and_png_text(self):
        (self.root / "data/img/3exf.jpg").write_bytes(JPEG_EXIF)
        (self.root / "data/img/4txt.png").write_bytes(PNG_TEXT)
        self.assertFlags("metadata", "data/img/3exf.jpg")
        self.assertFlags("metadata", "data/img/4txt.png")


class IdentityList(unittest.TestCase):
    def test_reads_the_backticked_tokens_of_the_section(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "CLAUDE.md"
            p.write_text("# x\n\n## Identity\n\nscan for `aa`, `bb` and `.env`.\n\n## Next\n\n`cc`\n",
                         encoding="utf-8")
            self.assertEqual(sitescan.identity_terms(p), ["aa", "bb", ".env"])

    def test_missing_list_is_none_so_the_scan_fails(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertIsNone(sitescan.identity_terms(Path(d) / "absent.md"))
            p = Path(d) / "CLAUDE.md"
            p.write_text("# x\n\n## Other\n\n`aa`\n", encoding="utf-8")
            self.assertIsNone(sitescan.identity_terms(p))

    def test_env_values_skip_comments_and_short_values(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / ".env"
            p.write_text("# A=commented-out-value\nSHORT=abc\nLONG=\"a-long-enough-value\"\n\n", encoding="utf-8")
            self.assertEqual(sitescan.env_values(p), {"LONG": "a-long-enough-value"})


if __name__ == "__main__":
    unittest.main()
