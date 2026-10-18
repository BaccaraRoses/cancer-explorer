"""Fetch verified PDB metadata and a pre-rendered structure image per target.

Why pre-rendered rather than an interactive viewer: every in-browser molecular
viewer (3Dmol.js, NGL, Mol*) is 0.5-1MB of JavaScript and needs a script host.
Adopting one would end this project's four load-bearing promises at once --
no dependencies, no CDN, works offline on a double-click, strict-CSP-safe. A
JPEG committed next to the data keeps all four and still shows the molecule.

The trade-off is honest and should stay visible in the UI: these are static
deposited-structure renders, not a pocket view composed for the drug in
question, and they cannot be rotated. The deep link to RCSB/AlphaFold is there
for anyone who needs the real thing.

The PDB choice per target is CURATED (a judgement about which complex tells the
story) and VERIFIED here (the title and ligands come back from RCSB, so a wrong
id shows up as a wrong title rather than a plausible-looking lie).
"""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import certifi
import requests

log = logging.getLogger("cxp.structures")

ENTRY = "https://data.rcsb.org/rest/v1/core/entry/{pdb}"
IMAGE = "https://cdn.rcsb.org/images/structures/{pdb}_assembly-1.jpeg"
PAGE = "https://www.rcsb.org/structure/{pdb}"

UA = "cancer-explorer-pipeline/0.1 (research; contact: repo owner)"


def entry_meta(http, pdb: str) -> dict[str, Any] | None:
    """Title, method, resolution and bound ligands for one PDB entry."""
    try:
        e = http.get(ENTRY.format(pdb=pdb.lower()))
    except Exception as exc:  # noqa: BLE001 - one bad id must not kill the run
        log.warning("structures: %s metadata failed (%s)", pdb, exc)
        return None
    if not e:
        return None

    info = e.get("rcsb_entry_info") or {}
    res = info.get("resolution_combined") or []
    methods = [m.get("method") for m in (e.get("exptl") or []) if m.get("method")]

    return {
        "pdb": pdb.upper(),
        "title": (e.get("struct") or {}).get("title"),
        "method": methods[0] if methods else None,
        "resolution": res[0] if res else None,
        "ligands": info.get("nonpolymer_bound_components") or [],
        "deposited": (e.get("rcsb_accession_info") or {}).get("initial_release_date", "")[:10] or None,
        "url": PAGE.format(pdb=pdb.upper()),
    }


def fetch_image(pdb: str, out_dir: Path, refresh: bool = False) -> dict[str, Any] | None:
    """Download the deposited-structure render. Returns a repo-relative path.

    Images are binary, so they bypass the JSON cache in http.py and are cached
    by their own presence on disk — the committed file IS the cache.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    name = f"{pdb.lower()}.jpg"
    dest = out_dir / name

    if dest.exists() and not refresh:
        return {"file": name, "bytes": dest.stat().st_size, "cached": True}

    url = IMAGE.format(pdb=pdb.lower())
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=60, verify=certifi.where())
        r.raise_for_status()
        if not r.headers.get("Content-Type", "").startswith("image/"):
            log.warning("structures: %s did not return an image", url)
            return None
        dest.write_bytes(r.content)
    except Exception as exc:  # noqa: BLE001
        log.warning("structures: image for %s failed (%s)", pdb, exc)
        return None

    return {"file": name, "bytes": dest.stat().st_size, "cached": False}


def collect(http, choices: dict[str, str], img_dir: Path,
            refresh: bool = False) -> dict[str, Any]:
    """choices: gene symbol -> curated PDB id."""
    out: dict[str, Any] = {}
    total_bytes = 0
    for gene, pdb in choices.items():
        meta = entry_meta(http, pdb)
        if not meta:
            continue
        img = fetch_image(pdb, img_dir, refresh=refresh)
        if img:
            meta["image"] = "img/" + img["file"]
            meta["image_bytes"] = img["bytes"]
            total_bytes += img["bytes"]
        out[gene] = meta

    return {
        "source": "RCSB PDB",
        "api": "https://data.rcsb.org/",
        # Corrected: the PDB ARCHIVE (coordinate files) is free of copyright, but
        # images rendered by RCSB are RCSB's own content under its usage policy.
        # Conflating the two matters here because this project commits the images
        # rather than linking them. See cxp/attribution.py.
        "licence": "PDB archive data files are free of copyright restrictions; "
                   "RCSB-generated images fall under RCSB's usage policy — verify "
                   "before redistributing",
        "licence_url": "https://www.rcsb.org/pages/usage-policy",
        "note": "Static deposited-structure renders. Not pocket views, and not rotatable — "
                "follow the RCSB link for an interactive viewer.",
        "n_structures": len(out),
        "image_bytes_total": total_bytes,
        "structures": out,
    }
