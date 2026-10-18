"""`run.py all`: a flaky source is forgiven, a retired one (410) is not."""
import argparse
import io
import sys
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

import requests

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import run  # noqa: E402

SOURCES = ("molecular", "incidence", "oncotree", "civic", "gwas",
           "survival", "trials", "targets", "literature")


def http_error(status):
    r = requests.Response()
    r.status_code = status
    return requests.HTTPError(f"{status}", response=r)


def run_all(failing_step, exc):
    """cmd_all with every step stubbed: sources return 0, audit and emit pass."""
    patches = [mock.patch.object(run, f"cmd_{s}", return_value=0) for s in SOURCES]
    patches.append(mock.patch.object(run, f"cmd_{failing_step}", side_effect=exc))
    patches += [mock.patch.object(run, name, return_value=0)
                for name in ("cmd_audit", "cmd_emit", "cmd_sync", "cmd_manual")]
    for p in patches:
        p.start()
    try:
        out = io.StringIO()
        with redirect_stdout(out):
            rc = run.cmd_all(argparse.Namespace(refresh=False, check=False))
        return rc, out.getvalue()
    finally:
        for p in reversed(patches):
            p.stop()


class Gone(unittest.TestCase):
    def test_a_flaky_source_leaves_the_run_passing(self):
        rc, out = run_all("gwas", http_error(503))
        self.assertEqual(rc, 0)
        self.assertIn("sources that failed (facts left stale): gwas", out)

    def test_a_retired_source_fails_the_run(self):
        rc, out = run_all("gwas", http_error(410))
        self.assertEqual(rc, 1)
        self.assertIn("retired upstream (HTTP 410)", out)

    def test_a_transport_error_without_a_response_is_flaky(self):
        rc, _ = run_all("civic", requests.ConnectionError("reset"))
        self.assertEqual(rc, 0)


if __name__ == "__main__":
    unittest.main()
