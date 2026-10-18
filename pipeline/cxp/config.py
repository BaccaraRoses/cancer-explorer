"""Credential registry and loader.

Keys live in environment variables, optionally seeded from pipeline/.env.
Nothing here ever writes a key to disk, and `.env` is gitignored.

Every entry documents where to register, so `run.py keys` can tell you exactly
what to do rather than just reporting "missing".
"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env"


@dataclass
class Credential:
    env: str                      # environment variable name
    service: str
    register_url: str
    how_passed: str
    required_for: str
    notes: str = ""
    extra_env: list[str] = field(default_factory=list)   # e.g. a paired secret


CREDENTIALS: list[Credential] = [
    Credential(
        env="SEER_API_KEY",
        service="NCI SEER",
        register_url="https://api.seer.cancer.gov/ — but see note; most users cannot get an account",
        how_passed="X-SEERAPI-Key header",
        required_for="NOT REQUIRED — subtype incidence and survival already come from the "
                     "published Cancer Stat Facts tables, which need no key (see cxp/seer.py)",
        notes="The SEER API is restricted to government-authorised users (Login.gov). "
              "We do not depend on it: seer.cancer.gov/statfacts/html/breast-subtypes.html "
              "serves the same registry figures as parseable HTML. Set this only if you "
              "already have access and want custom queries. 5,000 calls/hour if so.",
    ),
    Credential(
        env="NCBI_API_KEY",
        service="NCBI E-utilities",
        register_url="https://www.ncbi.nlm.nih.gov/account/ → Settings → API Key Management",
        how_passed="api_key query parameter",
        required_for="PubMed / ClinVar lookups at volume",
        notes="Optional — works without a key at 3 req/sec, rises to 10 req/sec with one. "
              "One key per account; generating a new one invalidates the old.",
    ),
    Credential(
        env="OPENFDA_API_KEY",
        service="openFDA",
        register_url="https://open.fda.gov/apis/authentication/",
        how_passed="api_key query parameter",
        required_for="FDA label / approval lookups at volume",
        notes="Optional — 1,000 req/day without a key, 120,000/day with one.",
    ),
    Credential(
        env="ONCOKB_TOKEN",
        service="OncoKB",
        register_url="https://www.oncokb.org/account/register (licence required)",
        how_passed="Authorization: Bearer <token>",
        required_for="curated therapeutic actionability levels",
        notes="UNVERIFIED in this session — the site is a JS app the doc fetcher could not "
              "render. Free for academic/non-commercial use; commercial use needs a licence. "
              "Confirm terms at oncokb.org before relying on it.",
    ),
]

BY_ENV = {c.env: c for c in CREDENTIALS}


def load_env(path: Path | None = None) -> dict[str, str]:
    """Read KEY=VALUE lines from .env into os.environ (existing vars win)."""
    path = path or ENV_FILE
    loaded: dict[str, str] = {}
    if not path.exists():
        return loaded
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key, val = key.strip(), val.strip().strip('"').strip("'")
        if not val:
            continue
        loaded[key] = val
        os.environ.setdefault(key, val)
    return loaded


def get(env_name: str) -> str | None:
    return os.environ.get(env_name) or None


def status() -> list[tuple[Credential, bool]]:
    """Which credentials are present (including any paired secret)."""
    out = []
    for c in CREDENTIALS:
        names = [c.env, *c.extra_env]
        out.append((c, all(get(n) for n in names)))
    return out


# --- host-based injection -------------------------------------------------

def auth_for(url: str) -> tuple[dict, dict]:
    """Return (extra_headers, extra_params) appropriate to the URL's host."""
    headers: dict[str, str] = {}
    params: dict[str, str] = {}

    if "api.seer.cancer.gov" in url:
        if k := get("SEER_API_KEY"):
            headers["X-SEERAPI-Key"] = k
    elif "eutils.ncbi.nlm.nih.gov" in url:
        if k := get("NCBI_API_KEY"):
            params["api_key"] = k
    elif "api.fda.gov" in url:
        if k := get("OPENFDA_API_KEY"):
            params["api_key"] = k
    elif "oncokb.org" in url:
        if k := get("ONCOKB_TOKEN"):
            headers["Authorization"] = f"Bearer {k}"

    return headers, params
