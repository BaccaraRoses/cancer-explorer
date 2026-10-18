"""Tests for tools/publish.py: one planted defect per gate rule, the near misses it must
pass, and the export, persona, commit and provenance steps against throwaway repos.

The identity tokens, station names and secrets are made up here, and anything the
gate would refuse is built from parts: this file is itself in every snapshot.
"""
import os
import subprocess
import sys
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import publish  # noqa: E402

IDENTITY = ["jdoe-pseudo", "janedoe", "C:" + "\\" + "Users", ".env"]
SECRETS = {"NCBI_API_KEY": "s3cr3t-value-0123456789"}
LOCAL = {"login name": "boxuser", "host name": "box-1234"}
PERSONA = ("Pseudo Owner", "123+pseudo-owner@users.noreply.github.com", "git@github-pseudo:pseudo-owner/mirror.git")


def put(root: Path, rel: str, text: str) -> None:
    p = root / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(text.encode("utf-8"))


def sh(cwd: Path, *args: str) -> str:
    """git with a throwaway identity, for building the test repos."""
    p = subprocess.run(["git", "-c", "user.name=Tester", "-c", "user.email=tester@example.invalid", *args],
                       cwd=cwd, capture_output=True, text=True)
    if p.returncode:
        raise AssertionError(f"git {' '.join(args)}: {p.stderr}")
    return p.stdout.strip()


class IsolatedGit(unittest.TestCase):
    """No test may read the station's own git config: it holds the real name."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.base = Path(self.tmp.name)
        put(self.base, "global.gitconfig", "[user]\n\tname = Real Person\n\temail = real.person@example.org\n")
        env = mock.patch.dict(os.environ, {"GIT_CONFIG_GLOBAL": str(self.base / "global.gitconfig"),
                                           "GIT_CONFIG_NOSYSTEM": "1"})
        env.start()
        self.addCleanup(env.stop)

    def tearDown(self):
        self.tmp.cleanup()


class Gate(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        put(self.root, "index.html", "<!doctype html><title>x</title>")
        put(self.root, "css/explorer.css", "a { color: red }")
        put(self.root, "js/explorer.js", "var a = 1;\n")
        put(self.root, "data/breast.js", "var refs = [{ url: 'https://pubmed.ncbi.nlm.nih.gov/1/' }];\n")
        put(self.root, "pipeline/run.py", "# reads ../cancer_research/ or ./cancer_research/\nHOST = 'localhost'\n")
        put(self.root, "pipeline/.env.example", "# Copy to .env\nNCBI_API_KEY=\nONCOKB_TOKEN=\n")
        put(self.root, "tools/tests/test_x.py", "EMAIL = 'tester@example.invalid'\n")
        put(self.root, "cancer_research/pipeline.csv", "drug,phase\nx,3\n")
        put(self.root, ".gitignore", "pipeline/.env\n")
        put(self.root, ".gitattributes", "* -text\n")
        put(self.root, "README.md", "See https://example.org/home/page for more.\n")

    def tearDown(self):
        self.tmp.cleanup()

    def gate(self):
        return publish.gate(self.root, IDENTITY, SECRETS, LOCAL)

    def assertRefuses(self, kind, rel_prefix):
        problems = self.gate()
        hits = [p for p in problems if p.startswith(rel_prefix) and f" {kind}:" in p]
        self.assertTrue(hits, f"expected a {kind} refusal for {rel_prefix}; got {problems}")
        return hits

    def test_clean_tree_and_near_misses_pass(self):
        # localhost and an e-mail in code, a web address with /home/ in it, an empty .env.example
        self.assertEqual(self.gate(), [])

    def test_env_file(self):
        put(self.root, "pipeline/.env", "NCBI_API_KEY=abc")
        self.assertRefuses("file", "pipeline/.env")

    def test_env_example_with_a_value(self):
        put(self.root, "pipeline/.env.example", "NCBI_API_KEY=abc123\n")
        self.assertRefuses("secret", "pipeline/.env.example:1")

    def test_dot_folders_caches_and_bytecode(self):
        for rel in (".claude/settings.json", ".git/config", "pipeline/__pycache__/run.cpython-312.pyc",
                    "tools/audits/cache/a.json", "tools/autophase/logs/run.log"):
            put(self.root, rel, "x")
            self.assertRefuses("file", rel)

    def test_identity_in_code_any_case(self):
        put(self.root, "pipeline/cxp/x.py", "# written by JaneDoe\n")
        self.assertRefuses("identity", "pipeline/cxp/x.py:1")

    def test_identity_windows_path_as_json_writes_it(self):
        put(self.root, "pipeline/facts/x.json", '{"p": "C:' + "\\\\" + 'Users' + "\\\\" + 'x"}')
        self.assertRefuses("identity", "pipeline/facts/x.json")

    def test_identity_in_a_file_name(self):
        put(self.root, "notes-janedoe.md", "x")
        self.assertRefuses("identity", "notes-janedoe.md")

    def test_station_names(self):
        put(self.root, "pipeline/reports/x.md", "ran on box-1234 as boxuser\n")
        hits = self.assertRefuses("local", "pipeline/reports/x.md")
        self.assertEqual(len(hits), 2)

    def test_home_folder_path(self):
        put(self.root, "pipeline/reports/breast.audit.md", "**Hand-written file:** `/" + "home/someone/data/x.js`\n")
        self.assertRefuses("local", "pipeline/reports/breast.audit.md:1")

    def test_env_value_never_printed(self):
        put(self.root, "pipeline/cxp/k.py", "KEY = 's3cr3t-value-0123456789'\n")
        hits = self.assertRefuses("secret", "pipeline/cxp/k.py")
        self.assertFalse(any("s3cr3t" in h for h in hits))

    def test_credential_shape_never_printed(self):
        key = "sk-" + "a1b2c3d4e5" * 3
        put(self.root, "tools/x.py", f"KEY = '{key}'\n")
        hits = self.assertRefuses("secret", "tools/x.py:1")
        self.assertFalse(any(key in h for h in hits))

    def test_site_rules_apply_to_the_four_site_paths(self):
        put(self.root, "js/explorer.js", "fetch('http://localhost:8000/x');\n")
        self.assertTrue(any(p.startswith("site: js/explorer.js") and " host:" in p for p in self.gate()))

    def test_symbolic_link(self):
        try:
            os.symlink(self.root / "README.md", self.root / "link.md")
        except (OSError, NotImplementedError):
            self.skipTest("this platform will not make a symbolic link")
        self.assertRefuses("file", "link.md")


class Export(IsolatedGit):
    def setUp(self):
        super().setUp()
        self.root = self.base / "cancer-explorer"
        self.research = self.base / "cancer_research"
        for rel in ("index.html", "css/a.css", "js/a.js", "data/a.js", "pipeline/run.py", "tools/sitescan.py",
                    "tools/autophase/run-phases.ps1", "README.md", "SCHEMA.md", "ATTRIBUTION.md", "LICENSE",
                    ".gitattributes", ".gitignore", "notes/deploy.md", "HANDOFF.md", "CLAUDE.md"):
            put(self.root, rel, f"committed {rel}\n")
        sh(self.base, "init", "-q", "-b", "master", str(self.root))
        sh(self.root, "add", "-A")
        sh(self.root, "commit", "-q", "-m", "x")
        put(self.root, "README.md", "an uncommitted edit\n")
        put(self.root, "pipeline/.env", "NCBI_API_KEY=abc\n")
        for rel in ("SOURCES.md", "pipeline.csv", "lung-pipeline.csv", "breast-cancer-landscape.md",
                    "HANDOFF.md", ".gitignore", "scratch.txt"):
            put(self.research, rel, f"committed {rel}\n")
        sh(self.base, "init", "-q", "-b", "master", str(self.research))
        sh(self.research, "add", "-A")
        sh(self.research, "commit", "-q", "-m", "x")

    def test_only_committed_allowlisted_files(self):
        dest = self.base / "out"
        head, research_head = publish.export(dest, self.root, self.research)
        got = sorted(p.relative_to(dest).as_posix() for p in dest.rglob("*") if p.is_file())
        self.assertEqual(got, sorted([
            ".gitattributes", ".gitignore", "ATTRIBUTION.md", "LICENSE", "README.md", "SCHEMA.md",
            "css/a.css", "data/a.js", "index.html", "js/a.js", "pipeline/run.py", "tools/sitescan.py",
            "cancer_research/SOURCES.md", "cancer_research/breast-cancer-landscape.md",
            "cancer_research/lung-pipeline.csv", "cancer_research/pipeline.csv"]))
        self.assertEqual((dest / "README.md").read_text(), "committed README.md\n")
        self.assertEqual(len(head), 40)
        self.assertEqual(len(research_head), 40)

    def test_a_missing_allowlisted_path_refuses(self):
        sh(self.root, "rm", "-q", "LICENSE")
        sh(self.root, "commit", "-q", "-m", "drop the licence")
        with self.assertRaises(publish.Refusal):
            publish.export(self.base / "out", self.root, self.research)


class Persona(unittest.TestCase):
    def test_the_good_persona(self):
        self.assertEqual(publish.persona_problems(*PERSONA, IDENTITY), [])

    def test_github_itself_and_https_refused(self):
        name, email, _ = PERSONA
        for url in ("git@github.com:pseudo-owner/mirror.git", "https://github.com/pseudo-owner/mirror.git"):
            self.assertTrue(any(p.startswith("remote:") for p in publish.persona_problems(name, email, url, IDENTITY)))

    def test_email_must_be_the_owners_noreply(self):
        name, _, url = PERSONA
        for email in ("pseudo@example.org", "456+someone-else@users.noreply.github.com"):
            self.assertTrue(any(p.startswith("email:") for p in publish.persona_problems(name, email, url, IDENTITY)))

    def test_identity_in_the_persona(self):
        _, email, url = PERSONA
        self.assertTrue(any(p.startswith("name:") for p in publish.persona_problems("Jane JanEDoe", email, url, IDENTITY)))


class Commit(IsolatedGit):
    def setUp(self):
        super().setUp()
        # No local user config: the commit must take the persona from the tool alone,
        # with the global config holding a real name it must not use.
        self.mirror = self.base / "mirror"
        sh(self.base, "init", "-q", "-b", "main", str(self.mirror))
        self.snap = self.base / "snap"
        put(self.snap, "README.md", "one\n")
        put(self.snap, "data/a.js", "var a = 1;\n")

    def log(self, fmt):
        return sh(self.mirror, "log", "-1", "--date=raw", f"--format={fmt}")

    def test_commits_as_the_persona_at_utc_midnight_whatever_the_global_config(self):
        name, email, _ = PERSONA
        new = publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", name, email)
        self.assertEqual(new, sh(self.mirror, "rev-parse", "HEAD"))
        self.assertEqual(self.log("%an|%ae|%cn|%ce"), f"{name}|{email}|{name}|{email}")
        stamp, zone = self.log("%ad").split()
        self.assertEqual(zone, "+0000")
        self.assertEqual(int(stamp) % 86400, 0)
        self.assertEqual(publish.history_problems(self.mirror, name, email, IDENTITY), [])
        self.assertEqual(sh(self.mirror, "ls-files"), "README.md\ndata/a.js")

    def test_a_second_run_with_no_change_commits_nothing(self):
        name, email, _ = PERSONA
        publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", name, email)
        self.assertIsNone(publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", name, email))

    def test_files_gone_from_the_snapshot_leave_the_mirror(self):
        name, email, _ = PERSONA
        publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", name, email)
        (self.snap / "data/a.js").unlink()
        publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "y", name, email)
        self.assertEqual(sh(self.mirror, "ls-files"), "README.md")

    def test_a_commit_not_made_by_the_tool_is_found(self):
        name, email, _ = PERSONA
        put(self.mirror, "x.txt", "by hand")
        sh(self.mirror, "add", "x.txt")
        subprocess.run(["git", "commit", "-q", "-m", "by hand"], cwd=self.mirror, capture_output=True)
        problems = publish.history_problems(self.mirror, name, email, IDENTITY)
        self.assertTrue(any("not a snapshot" in p for p in problems))
        self.assertTrue(any("date not in UTC" in p for p in problems) or self.log("%ad").endswith("+0000"))

    def test_a_dirty_mirror_refuses(self):
        put(self.mirror, "stray.txt", "x")
        with self.assertRaises(publish.Refusal):
            publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", *PERSONA[:2])

    def test_a_file_the_snapshot_ignores_refuses(self):
        put(self.snap, ".gitignore", "kept-out.txt\n")
        put(self.snap, "kept-out.txt", "x")
        with self.assertRaises(publish.Refusal):
            publish.commit_snapshot(self.mirror, self.snap, publish.MESSAGE_PREFIX + "x", *PERSONA[:2])

    def test_utc_day(self):
        evening_pacific = datetime(2026, 10, 17, 23, 59, tzinfo=timezone(timedelta(hours=-7)))
        expected = int(datetime(2026, 10, 18, tzinfo=timezone.utc).timestamp())
        self.assertEqual(publish.utc_day(evening_pacific), f"@{expected} +0000")


class Provenance(IsolatedGit):
    def setUp(self):
        super().setUp()
        self.repo = self.base / "cancer-explorer"
        put(self.repo, "README.md", "x\n")
        sh(self.base, "init", "-q", "-b", "master", str(self.repo))
        sh(self.repo, "add", "-A")
        sh(self.repo, "commit", "-q", "-m", "x")

    def test_head_must_be_on_a_remote_branch(self):
        self.assertTrue(any("on no remote branch" in p for p in publish.provenance_problems(self.repo)))
        sh(self.base, "init", "-q", "--bare", str(self.base / "private.git"))
        sh(self.repo, "remote", "add", "origin", str(self.base / "private.git"))
        sh(self.repo, "push", "-q", "origin", "master")
        self.assertEqual(publish.provenance_problems(self.repo), [])

    def test_a_hosted_remote_refuses(self):
        sh(self.repo, "remote", "add", "gh", "git@github-pseudo:pseudo-owner/cancer-explorer.git")
        self.assertTrue(any("hosted service" in p for p in publish.provenance_problems(self.repo)))


if __name__ == "__main__":
    unittest.main()
