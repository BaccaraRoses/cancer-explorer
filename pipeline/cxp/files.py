"""One way to write a text file, so both stations write the same bytes.

Path.write_text turns every newline into CRLF on Windows and leaves it LF on
Linux. Facts and overlays are tracked so that a re-run diffs against the last
one; written by the other station, every line differed and a three-week data
change (18k lines) hid inside a 346k-line rewrite (2026-10-17).
"""
from __future__ import annotations

from pathlib import Path


def write_lf(path: Path, text: str) -> Path:
    """UTF-8, LF line endings, on every station."""
    path.write_bytes(text.encode("utf-8"))
    return path
