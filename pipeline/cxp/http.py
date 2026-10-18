"""HTTP with a content-addressed disk cache and polite retries.

Every network read goes through here so that:
  * re-runs are cheap and offline-capable (cache hit)
  * raw responses are kept verbatim, so a surprising number can always be
    traced back to exactly what the server said
  * rate limits and transient 5xx do not fail a whole run
"""
from __future__ import annotations

import hashlib
import json
import logging
import time
from pathlib import Path
from typing import Any

import requests

from . import config

log = logging.getLogger("cxp.http")

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache"

UA = "cancer-explorer-pipeline/0.1 (research; contact: repo owner)"
RETRY_ON = {429, 500, 502, 503, 504}


class Http:
    def __init__(self, cache_dir: Path | None = None, refresh: bool = False,
                 timeout: int = 90, max_retries: int = 4):
        self.cache_dir = Path(cache_dir or CACHE)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.refresh = refresh
        self.timeout = timeout
        self.max_retries = max_retries
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": UA, "Accept": "application/json"})
        self.stats = {"hit": 0, "miss": 0, "retry": 0}

    # ---- cache -------------------------------------------------------

    def _key(self, method: str, url: str, params: Any, body: Any, text: bool = False) -> str:
        spec = {"m": method, "u": url, "p": params, "b": body}
        if text:
            # Only text reads add the flag, so every JSON key already in the
            # cache is unchanged.
            spec["t"] = True
        blob = json.dumps(spec, sort_keys=True, default=str)
        return hashlib.sha256(blob.encode()).hexdigest()[:32]

    def _path(self, key: str) -> Path:
        return self.cache_dir / f"{key}.json"

    # ---- core --------------------------------------------------------

    def request(self, method: str, url: str, *, params=None, json_body=None, text: bool = False) -> Any:
        # Credentials are injected per host, and are deliberately excluded from
        # the cache key so a key rotation does not invalidate the whole cache
        # and so no secret is ever written into a cache filename.
        auth_headers, auth_params = config.auth_for(url)
        if text:
            # The session asks for JSON; Europe PMC's XML endpoint answers that
            # with 406 Not Acceptable.
            auth_headers = {**(auth_headers or {}), "Accept": "*/*"}
        key = self._key(method, url, params, json_body, text)
        path = self._path(key)
        if auth_params:
            params = {**(params or {}), **auth_params}

        if path.exists() and not self.refresh:
            self.stats["hit"] += 1
            with path.open(encoding="utf-8") as fh:
                return json.load(fh)["data"]

        self.stats["miss"] += 1
        last_err: Exception | None = None

        for attempt in range(self.max_retries):
            try:
                r = self.session.request(
                    method, url, params=params, json=json_body,
                    headers=auth_headers or None, timeout=self.timeout
                )
                if r.status_code in RETRY_ON:
                    wait = min(2 ** attempt, 20)
                    self.stats["retry"] += 1
                    log.warning("%s %s -> %s, retrying in %ss", method, url, r.status_code, wait)
                    time.sleep(wait)
                    continue
                r.raise_for_status()
                data = r.text if text else r.json()
            except Exception as exc:  # noqa: BLE001 - retry any transport failure
                # A 4xx other than 429 is an answer, not a transport failure.
                # openFDA replies 404 to "no label matches"; retrying that
                # cost ~15 s of backoff per drug and logged like an outage.
                status = getattr(getattr(exc, "response", None), "status_code", None)
                if status is not None and 400 <= status < 500:
                    raise
                last_err = exc
                wait = min(2 ** attempt, 20)
                self.stats["retry"] += 1
                log.warning("%s %s failed (%s), retrying in %ss",
                            method, url, type(exc).__name__, wait)
                time.sleep(wait)
                continue

            # Strip any credential before persisting — cache files are plain
            # JSON on disk and must never contain a key.
            safe_params = {k: v for k, v in (params or {}).items()
                           if k not in auth_params} or None
            envelope = {
                "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "method": method,
                "url": url,
                "params": safe_params,
                "body": json_body,
                "data": data,
            }
            tmp = path.with_suffix(".tmp")
            with tmp.open("w", encoding="utf-8") as fh:
                json.dump(envelope, fh)
            tmp.replace(path)
            return data

        raise RuntimeError(f"{method} {url} failed after {self.max_retries} attempts: {last_err}")

    def get(self, url: str, params=None) -> Any:
        return self.request("GET", url, params=params)

    def get_text(self, url: str, params=None) -> str:
        """A body that is not JSON (Europe PMC full-text XML), cached the same way."""
        return self.request("GET", url, params=params, text=True)

    def post(self, url: str, json_body, params=None) -> Any:
        return self.request("POST", url, params=params, json_body=json_body)
