"""tools/audits/_http.py -- the one network path the independent audits share.

Stdlib only, and never cxp: an audit re-derives a figure by its own code, so it
cannot borrow the pipeline's fetcher or its cache.

    from _http import get_json, post_json, get_text

Every response is cached on disk under tools/audits/cache/ (git-ignored), keyed
by method, url and body, so verify runs offline after the first fetch. A cached
file is what the audit judged, and it stays until someone deletes it: delete the
folder to re-check a figure against today's source. Only a 200 is cached.

502, 503 and 504 (cBioPortal gives them under load) and dropped connections are
retried with backoff; any other HTTP error raises, so a wrong url fails the audit
instead of reading as an empty result.

cBioPortal trap (CLAUDE.md, "Looking things up"): fetching clinical data for all
attributes at a huge pageSize truncates silently. Always filter by attributeId --
`clinical(study, attribute)` below is the only way these audits ask for it.
"""
from __future__ import annotations

import gzip
import hashlib
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

CACHE = Path(__file__).resolve().parent / "cache"
RETRY_CODES = (502, 503, 504)
TRIES = 6
TIMEOUT_S = 600
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CBIO = "https://www.cbioportal.org/api"


def _key(method: str, url: str, body: bytes | None) -> str:
    h = hashlib.sha256()
    h.update(method.encode("utf-8") + b"\n" + url.encode("utf-8") + b"\n" + (body or b""))
    return h.hexdigest()[:32]


def fetch(url: str, body=None, accept: str = "application/json") -> bytes:
    """The response body for GET url (body None) or POST url with body as JSON."""
    data = None if body is None else json.dumps(body, sort_keys=True, separators=(",", ":")).encode("utf-8")
    method = "GET" if data is None else "POST"
    path = CACHE / (_key(method, url, data) + ".gz")
    if path.is_file():
        return gzip.decompress(path.read_bytes())
    headers = {"Accept": accept, "User-Agent": UA}
    if data is not None:
        headers["Content-Type"] = "application/json"
    last = None
    for attempt in range(TRIES):
        if attempt:
            time.sleep(min(60, 5 * 2 ** (attempt - 1)))
        try:
            req = urllib.request.Request(url, data=data, method=method, headers=headers)
            with urllib.request.urlopen(req, timeout=TIMEOUT_S) as r:
                raw = r.read()
            break
        except urllib.error.HTTPError as e:
            if e.code not in RETRY_CODES:
                raise
            last = e
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            last = e
    else:
        raise RuntimeError(f"{method} {url}: gave up after {TRIES} tries ({last})")
    CACHE.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(f".{os.getpid()}.tmp")
    tmp.write_bytes(gzip.compress(raw))
    os.replace(tmp, path)
    return raw


def get_text(url: str) -> str:
    return fetch(url, accept="*/*").decode("utf-8", errors="replace")


def get_json(url: str):
    return json.loads(fetch(url).decode("utf-8"))


def post_json(url: str, body):
    return json.loads(fetch(url, body).decode("utf-8"))


def clinical(study: str, attribute: str, kind: str = "SAMPLE") -> list[dict]:
    """cBioPortal clinical data for ONE attribute (never all of them: that truncates)."""
    q = urllib.parse.urlencode({"clinicalDataType": kind, "attributeId": attribute,
                                "projection": "SUMMARY", "pageSize": 500000})
    return get_json(f"{CBIO}/studies/{study}/clinical-data?{q}")
