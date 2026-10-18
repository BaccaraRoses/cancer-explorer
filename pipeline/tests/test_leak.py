"""No cancer's output carries another cancer's sources (INV-14).

run.py once wrote breast's METABRIC survival block and caveat into every
cancer's overlay (2026-10-17), and nothing failed: each file was valid, it was
just about the wrong disease. This reads the identifiers each cancer's config
owns -- its cBioPortal study ids and its survival caveat -- and fails if one
turns up in another cancer's facts or overlays. An id two cancers both use
(a pan-cancer study) belongs to neither and is not checked.
"""
import dataclasses
import sys
import unittest
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE))
from cxp.cancers import REGISTRY  # noqa: E402

DATA = PIPELINE.parent / "data"
FACTS = PIPELINE / "facts"
OWN_FIELDS = {"study", "survival_study", "survival_caveat"}


def owned(obj, out=None):
    """Every string a config holds under a study or caveat field, at any depth."""
    out = set() if out is None else out
    if dataclasses.is_dataclass(obj):
        for f in dataclasses.fields(obj):
            v = getattr(obj, f.name)
            if f.name in OWN_FIELDS and isinstance(v, str) and v:
                out.add(v)
            else:
                owned(v, out)
    elif isinstance(obj, dict):
        for v in obj.values():
            owned(v, out)
    elif isinstance(obj, (tuple, list, set, frozenset)):
        for v in obj:
            owned(v, out)
    return out


def outputs(cid):
    return [*sorted(DATA.glob(f"{cid}.*.js")), *sorted(FACTS.glob(f"{cid}.*.json"))]


class CrossCancerLeak(unittest.TestCase):
    def test_no_output_names_another_cancers_source(self):
        own = {cid: owned(c) for cid, c in REGISTRY.items()}
        for cid, strings in own.items():
            self.assertTrue(strings, f"{cid}: no study id found; the walker no longer reads the config")
        leaks = []
        for cid in REGISTRY:
            foreign = {s: other for other, ss in own.items() if other != cid
                       for s in ss if s not in own[cid]}
            for p in outputs(cid):
                text = p.read_text(encoding="utf-8")
                for s, other in sorted(foreign.items()):
                    if s in text:
                        leaks.append(f"{p.relative_to(PIPELINE.parent).as_posix()}: {other}'s {s[:50]!r}")
        self.assertEqual(leaks, [])

    def test_the_check_sees_a_planted_leak(self):
        breast = owned(REGISTRY["breast"])
        self.assertIn("brca_metabric", breast)
        self.assertTrue(any(s.startswith("METABRIC accrued") for s in breast))


if __name__ == "__main__":
    unittest.main()
