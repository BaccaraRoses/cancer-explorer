"""ClinicalTrials.gov API v2 -- refresh trial phase/status so staleness shows up.

The trial layer is the part of this dataset that rots fastest. Six FDA actions
in breast cancer landed between May and July 2026 alone, so a hand-maintained
status column is wrong within a quarter. This turns "is my data stale?" into a
diff instead of a memory test.
"""
from __future__ import annotations

import csv
import logging
import re
from pathlib import Path
from typing import Any, Iterable

from .http import Http

log = logging.getLogger("cxp.ctgov")

API = "https://clinicaltrials.gov/api/v2/studies"

FIELDS = [
    "NCTId", "BriefTitle", "OfficialTitle", "OverallStatus", "Phase",
    "LeadSponsorName", "StartDate", "PrimaryCompletionDate", "CompletionDate",
    "EnrollmentCount", "StudyType", "LastUpdatePostDate",
]

NCT_RE = re.compile(r"NCT\d{8}")


def nct_ids_from_csv(path: Path, column: str = "nct_id") -> list[str]:
    """Pull NCT ids out of the existing pipeline.csv."""
    ids: list[str] = []
    with path.open(encoding="utf-8-sig", newline="") as fh:
        for row in csv.DictReader(fh):
            raw = (row.get(column) or "").strip()
            for m in NCT_RE.findall(raw):
                if m not in ids:
                    ids.append(m)
    return ids


def _flatten(study: dict) -> dict[str, Any]:
    """API v2 returns nested protocolSection; pull out what we track."""
    p = study.get("protocolSection", {})
    ident = p.get("identificationModule", {})
    status = p.get("statusModule", {})
    design = p.get("designModule", {})
    sponsor = p.get("sponsorCollaboratorsModule", {})

    def date(node: str) -> str | None:
        d = status.get(node) or {}
        return d.get("date") if isinstance(d, dict) else d

    phases = design.get("phases") or []
    return {
        "nct_id": ident.get("nctId"),
        "brief_title": ident.get("briefTitle"),
        "acronym": ident.get("acronym"),
        "overall_status": status.get("overallStatus"),
        "phase": "/".join(ph.replace("PHASE", "Phase ") for ph in phases) or None,
        "lead_sponsor": (sponsor.get("leadSponsor") or {}).get("name"),
        "start_date": date("startDateStruct"),
        "primary_completion_date": date("primaryCompletionDateStruct"),
        "completion_date": date("completionDateStruct"),
        "enrollment": (design.get("enrollmentInfo") or {}).get("count"),
        "last_update_posted": date("lastUpdatePostDateStruct"),
    }


class CtGov:
    def __init__(self, http: Http, batch_size: int = 20):
        self.http = http
        self.batch_size = batch_size

    def fetch(self, nct_ids: Iterable[str]) -> dict[str, dict]:
        ids = [i for i in dict.fromkeys(nct_ids) if i]
        out: dict[str, dict] = {}
        for i in range(0, len(ids), self.batch_size):
            chunk = ids[i:i + self.batch_size]
            data = self.http.get(
                API,
                params={
                    "filter.ids": ",".join(chunk),
                    "fields": ",".join(FIELDS),
                    "pageSize": len(chunk),
                    "format": "json",
                },
            )
            for study in data.get("studies", []):
                rec = _flatten(study)
                if rec["nct_id"]:
                    out[rec["nct_id"]] = rec
            missing = [c for c in chunk if c not in out]
            if missing:
                log.warning("not returned by ClinicalTrials.gov: %s", ", ".join(missing))
                for m in missing:
                    out[m] = {"nct_id": m, "overall_status": None,
                              "error": "not found in API response"}
        return out

    def collect(self, nct_ids: Iterable[str]) -> dict[str, Any]:
        trials = self.fetch(nct_ids)
        return {"source": "ClinicalTrials.gov API v2", "api": API,
                "n_requested": len(list(dict.fromkeys(nct_ids))),
                "n_returned": sum(1 for t in trials.values() if not t.get("error")),
                "trials": trials}
