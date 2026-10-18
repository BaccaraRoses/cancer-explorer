"""tools/audits/_audit.py -- reading data/ and reporting, for the audit scripts.

Stdlib only, and never cxp. The scripts read the dataset the way a reader sees
it: comments stripped (a figure only in a /* ... */ block is not printed), string
literals joined across `' +` line breaks, and `\\'` unescaped. They read facts
overlays as the JSON the pipeline wrote.

Where the dataset is read from:

    python tools/audits/melanoma_x.py                  # <root>/data
    python tools/audits/melanoma_x.py --data DIR       # DIR/melanoma.js, DIR/melanoma.facts.js ...
    CX_AUDIT_DATA=DIR python tools/audits/melanoma_x.py

The override exists to prove a script can fail: copy data/, change one figure in
the copy, point the script at it, and it must exit 1 on that figure's line.

Output contract (tools/verify.py, `audits`): one line per figure, `ok` or `BAD`,
then a last line `audit: PASS n/n` or `audit: FAIL k of n`; exit 0 only on PASS.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def data_dir() -> Path:
    args = sys.argv[1:]
    if "--data" in args:
        return Path(args[args.index("--data") + 1]).resolve()
    if os.environ.get("CX_AUDIT_DATA"):
        return Path(os.environ["CX_AUDIT_DATA"]).resolve()
    return ROOT / "data"


def strip_comments(src: str) -> str:
    """JS source with /* */ and // comments removed; string literals kept whole."""
    out, i, n, quote = [], 0, len(src), None
    while i < n:
        c = src[i]
        if quote:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(src[i + 1])
                i += 2
                continue
            if c == quote:
                quote = None
            i += 1
            continue
        if c in "'\"`":
            quote = c
            out.append(c)
            i += 1
        elif src.startswith("/*", i):
            j = src.find("*/", i + 2)
            i = n if j < 0 else j + 2
            out.append(" ")
        elif src.startswith("//", i) and (i == 0 or src[i - 1] != ":"):
            j = src.find("\n", i)
            i = n if j < 0 else j
        else:
            out.append(c)
            i += 1
    return "".join(out)


def printed(name: str) -> str:
    """data/<name> as the page reads it: no comments, concatenated literals joined."""
    code = strip_comments((data_dir() / name).read_text(encoding="utf-8"))
    code = re.sub(r"'\s*\+\s*'", "", code)
    return code.replace("\\'", "'")


def facts(name: str) -> dict:
    """The JSON object a data/<cancer>.<kind>.js overlay assigns."""
    text = (data_dir() / name).read_text(encoding="utf-8")
    start = re.search(r"\]\s*=\s*\{", text).end() - 1
    return json.loads(text[start:text.rindex("}") + 1])


def node_block(text: str, node_id: str) -> str:
    """The text of one node object in a dataset: from its `id:` to the next node's."""
    m = re.search(r"\{\s*id: '" + re.escape(node_id) + r"',", text)
    if not m:
        return ""
    nxt = re.search(r"\n  \{\s*\n\s*id: '", text[m.end():])
    return text[m.start(): m.end() + (nxt.start() if nxt else len(text))]


# One curated driver row, with whatever follows its frequency (role, druggable, note) up to its `}`.
DRIVER_ROW = r"\{ gene: '([^']+)', alteration: '([^']+)', frequency: ([\d.]+)([^}]*)\}"
# The note that lets a row named "promoter mutation" print the share of ANY TERT call (INV-13: the
# metric is named exactly, or the row itself says what it counts). Groups: promoter calls, any calls.
ANY_TERT_NOTE = (r"note: '([\d,]+) of the ([\d,]+) patients with a TERT call have one in the promoter[^']*?"
                 r"the row counts any TERT mutation call")


def num(s: str):
    """'1,082' -> 1082, '24.0' -> 24.0; None stays None."""
    if s is None:
        return None
    s = s.replace(",", "")
    return float(s) if "." in s else int(s)


def pct(k: int, n: int) -> float:
    return round(100 * k / n, 1) if n else float("nan")


class Report:
    def __init__(self, title: str):
        self.title, self.n, self.bad = title, 0, []
        print(f"== {title} (data: {data_dir()})")

    def check(self, label: str, got, want) -> bool:
        """got: what the audit re-derived; want: what the dataset prints (None = not found)."""
        self.n += 1
        ok = want is not None and got == want
        print(f"{'ok ' if ok else 'BAD'} {label}: derived {got!r}, data {'(not found)' if want is None else repr(want)}")
        if not ok:
            self.bad.append(label)
        return ok

    def prose(self, label: str, text: str, pattern: str, derived: tuple):
        """Read the groups of `pattern` from text as numbers and compare them with derived."""
        m = re.search(pattern, text)
        return self.check(label, tuple(derived), tuple(num(g) for g in m.groups()) if m else None)

    def claim(self, label: str, holds: bool, detail: str = ""):
        """A worded claim, not a number: the source says what the dataset says."""
        self.n += 1
        print(f"{'ok ' if holds else 'BAD'} {label}" + ("" if holds else f"  :: {detail[:240]}"))
        if not holds:
            self.bad.append(label)

    def finish(self) -> None:
        if self.n == 0:
            print("audit: FAIL no figures checked")
            sys.exit(1)
        if self.bad:
            print(f"audit: FAIL {len(self.bad)} of {self.n}")
            sys.exit(1)
        print(f"audit: PASS {self.n}/{self.n}")
        sys.exit(0)
