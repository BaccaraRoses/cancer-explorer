"""SEER incidence and survival, without the gated API.

The SEER *API* (api.seer.cancer.gov) requires a government-authorised account,
which most users cannot get. The SEER *published statistics* are open: the
Cancer Stat Facts pages carry the same registry numbers as plain HTML tables,
no key required.

So this parses the published tables rather than querying the API. It is
scraping, and scraping is brittle -- so the parser asserts on structure and
fails loudly rather than silently returning nothing. If SEER restyles the
page, this raises instead of quietly emitting an empty dataset.

Which pages to parse comes from cxp/cancers.py. Only breast has a
subtypes page; every cancer has a whole-disease one.
"""
from __future__ import annotations

import logging
import re
from html.parser import HTMLParser
from typing import Any

from . import cancers
from .http import Http

log = logging.getLogger("cxp.seer")

# Breast is the only cancer SEER publishes a subtypes page for, so these
# stay here as that page's vocabulary rather than moving to the config.
# The URLs themselves come from cxp/cancers.py.
STATFACTS_URL = cancers.BREAST.seer_subtypes_url

# SEER's subtype labels -> node ids in data/breast.js
SUBTYPE_TO_NODE = {
    "HR+/HER2-": "hr-pos-her2-neg",
    "HR+/HER2+": "triple-positive",
    "HR-/HER2+": "her2-pos-hr-neg",
    "HR-/HER2-": "tnbc",
}


class NoSubtypePage(RuntimeError):
    """This cancer has no SEER subtypes page to parse.

    Raised rather than returning {} because an empty result is
    indistinguishable from a cancer with no subtypes, and the caller needs
    to know the difference: one is a missing source, the other is a fact.
    """


class _Tables(HTMLParser):
    """Collect every <table> as a list of rows of cell text."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tables: list[list[list[str]]] = []
        self._t: list[list[str]] | None = None
        self._row: list[str] | None = None
        self._cell: list[str] | None = None

    def handle_starttag(self, tag, attrs):
        if tag == "table":
            self._t = []
        elif tag == "tr" and self._t is not None:
            self._row = []
        elif tag in ("td", "th") and self._row is not None:
            self._cell = []

    def handle_endtag(self, tag):
        if tag == "table" and self._t is not None:
            self.tables.append(self._t)
            self._t = None
        elif tag == "tr" and self._t is not None and self._row is not None:
            if any(c.strip() for c in self._row):
                self._t.append(self._row)
            self._row = None
        elif tag in ("td", "th") and self._cell is not None and self._row is not None:
            self._row.append(re.sub(r"\s+", " ", "".join(self._cell)).strip())
            self._cell = None

    def handle_data(self, data):
        if self._cell is not None:
            self._cell.append(data)


def _num(s: str, places: int = 1) -> float | None:
    """SEER renders some percentages at full float precision (70.1054781980336);
    that is spurious accuracy, so round at the parse boundary."""
    m = re.search(r"-?\d+(?:\.\d+)?", (s or "").replace(",", ""))
    return round(float(m.group(0)), places) if m else None


def _find_table(tables, header_contains: str) -> list[list[str]] | None:
    for t in tables:
        if not t:
            continue
        header = " ".join(t[0]).lower()
        if header_contains.lower() in header:
            return t
    return None


def parse(html: str, url: str | None = None) -> dict[str, Any]:
    p = _Tables()
    p.feed(html)
    tables = p.tables
    if not tables:
        raise RuntimeError("SEER stat-facts page contained no tables — layout changed")

    # data period, e.g. "SEER 21 2019-2023". The dash arrives as an HTML
    # entity, so normalise before matching.
    flat = re.sub(r"<[^>]+>", " ", html)
    flat = flat.replace("&ndash;", "-").replace("&mdash;", "-").replace("–", "-").replace("—", "-")
    flat = re.sub(r"\s+", " ", flat)
    period = None
    m = re.search(r"SEER\s*(\d+)\s*(\d{4})\s*-\s*(\d{4})", flat)
    if m:
        period = f"SEER {m.group(1)}, {m.group(2)}-{m.group(3)}"

    out: dict[str, Any] = {
        "source": "SEER Cancer Stat Facts: Female Breast Cancer Subtypes",
        "url": url or STATFACTS_URL,
        "period": period,
        "subtypes": {},
    }

    # --- incidence rate per 100,000 -------------------------------------
    t = _find_table(tables, "new cases")
    if t:
        for row in t[1:]:
            if len(row) < 2:
                continue
            label, val = row[0].strip(), _num(row[1])
            if label in SUBTYPE_TO_NODE or label == "Unknown":
                out["subtypes"].setdefault(label, {})["rate_per_100k"] = val

    # --- percent of cases ------------------------------------------------
    # This table's label cells can be empty in the markup, so fall back to
    # SEER's fixed subtype ordering, then sanity-check the total.
    t = _find_table(tables, "percent of cases")
    if t:
        order = ["HR+/HER2-", "HR-/HER2-", "HR+/HER2+", "HR-/HER2+", "Unknown"]
        pct_vals = []
        for row in t[1:]:
            labelled = [c for c in row if c.strip()]
            if len(labelled) >= 2 and labelled[0] in order:
                out["subtypes"].setdefault(labelled[0], {})["percent_of_cases"] = _num(labelled[1])
            elif len(labelled) == 1 and "%" in labelled[0]:
                pct_vals.append(_num(labelled[0]))
        if pct_vals and not any("percent_of_cases" in v for v in out["subtypes"].values()):
            if len(pct_vals) != len(order):
                raise RuntimeError(
                    f"percent-of-cases table had {len(pct_vals)} values, expected {len(order)} "
                    "— SEER changed the layout, refusing to guess the mapping"
                )
            for label, v in zip(order, pct_vals):
                out["subtypes"].setdefault(label, {})["percent_of_cases"] = v

    # --- 5-year relative survival ---------------------------------------
    t = _find_table(tables, "relative survival")
    if t:
        for row in t[1:]:
            if len(row) < 2:
                continue
            label, val = row[0].strip(), _num(row[1])
            if label in SUBTYPE_TO_NODE:
                out["subtypes"].setdefault(label, {})["five_year_relative_survival"] = val

    if not out["subtypes"]:
        raise RuntimeError("parsed no subtype rows from SEER stat facts — layout changed")

    total = sum(v.get("percent_of_cases") or 0 for v in out["subtypes"].values())
    out["percent_total"] = round(total, 1)
    if total and abs(total - 100) > 2:
        log.warning("SEER percentages sum to %.1f%%, not ~100%% — check the parse", total)

    # map onto our node ids
    out["by_node"] = {
        SUBTYPE_TO_NODE[label]: dict(vals, seer_label=label)
        for label, vals in out["subtypes"].items()
        if label in SUBTYPE_TO_NODE
    }
    return out


def _flat(html: str) -> str:
    """Tag-stripped, dash-normalised, whitespace-collapsed page text.

    Several of the headline figures are not in tables at all — they live in the
    'At a Glance' panel and in sentences. SEER states them in words, which is
    actually more stable than their position in the markup, so those are read
    from the prose and the tables are used only where a table exists.
    """
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", html, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    for a, b in (("&ndash;", "-"), ("&mdash;", "-"), ("&nbsp;", " "),
                 ("–", "-"), ("—", "-"), ("&amp;", "&"), ("&#8211;", "-")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t)


def _grab(flat: str, pattern: str, places: int = 1) -> float | None:
    m = re.search(pattern, flat, re.I)
    return _num(m.group(1), places) if m else None


def _age_table(tables, header: str) -> list[dict[str, Any]]:
    t = _find_table(tables, header)
    out = []
    for row in (t or [])[1:]:
        if len(row) < 2:
            continue
        label = row[0].replace("–", "-").replace("—", "-").strip()
        pct = _num(row[1])
        if label and pct is not None:
            out.append({"range": label, "percent": pct})
    return out


def parse_overview(html: str, url: str | None = None) -> dict[str, Any]:
    """Whole-disease figures from the main Cancer Stat Facts page.

    Fails loudly on a layout change, like parse() — a silently empty overview
    would leave the front page asserting nothing while looking fine.
    """
    p = _Tables()
    p.feed(html)
    tables = p.tables
    flat = _flat(html)

    year = None
    m = re.search(r"Estimated New Cases in (\d{4})", flat, re.I)
    if m:
        year = int(m.group(1))

    # Which population the page is about, read from its own wording rather than
    # assumed. The breast page says "women", the prostate page "men" and the
    # lung page "men and women"; assuming the first gave prostate a rates basis
    # reading "US women" and a null lifetime risk — the one figure the whole
    # risk lens converts against. The longest alternative must come first.
    who = "people"
    m_who = re.search(r"per 100,000 (men and women|men|women|people) per year", flat)
    if m_who:
        who = m_who.group(1)

    # The page names itself in its <h1> ("Cancer Stat Facts: Prostate Cancer").
    # This label used to be a literal naming breast, and prostate's Start lens
    # cited "Female Breast Cancer" as its source for as long as it was.
    title = None
    m_h1 = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)
    if m_h1:
        title = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m_h1.group(1))).strip() or None
    if not title or "Cancer Stat Facts" not in title:
        raise RuntimeError("SEER overview page: <h1> no longer names the page — "
                           "refusing to guess which cancer the source label should cite")

    out: dict[str, Any] = {
        "source": f"SEER {title}",
        "url": url,
        "population": "United States",
        "population_sex": who,
        "estimate_year": year,
        "at_a_glance": {
            "estimated_new_cases": _grab(flat, r"Estimated New Cases in \d{4}\s*([\d,]+)", 0),
            "pct_of_all_new_cancers": _grab(flat, r"% of All New Cancer Cases\s*([\d.]+)%"),
            "estimated_deaths": _grab(flat, r"Estimated Deaths in \d{4}\s*([\d,]+)", 0),
            "pct_of_all_cancer_deaths": _grab(flat, r"% of All Cancer Deaths\s*([\d.]+)%"),
            "five_year_relative_survival": _grab(flat, r"5-Year Relative Survival\s*([\d.]+)%"),
        },
        # Stated in a sentence rather than a table, and unambiguous there.
        "rates_per_100k": {
            "new_cases": _grab(flat, r"rate of new cases[^.]*?was\s*([\d.]+)\s*per 100,000"),
            "deaths": _grab(flat, r"death rate was\s*([\d.]+)\s*per 100,000"),
            "basis": f"age-adjusted, US {who}, per year",
        },
        # Worded per population on each page; lung's is "men and women".
        "lifetime_risk_pct": _grab(
            flat, r"Approximately\s*([\d.]+)\s*percent of (?:men and women|men|women|people) "
                  r"will be diagnosed"),
        "median_age": {
            "diagnosis": _grab(flat, r"Median Age At Diagnosis\s*(\d+)", 0),
            "death": _grab(flat, r"Median Age At Death\s*(\d+)", 0),
        },
        "age_distribution": {
            "new_cases": _age_table(tables, "percent of new cases"),
            "deaths": _age_table(tables, "percent of deaths"),
        },
        "stage": [],
    }

    # Stage distribution and survival, which is the largest effect on the page.
    t = _find_table(tables, "percent of cases")
    for row in (t or [])[1:]:
        if len(row) < 3:
            continue
        label = re.sub(r"\s+", " ", row[0]).strip()
        # SEER glues the definition onto the label: "Localized Confined to
        # Primary Site". Keep the first word as the stage, the rest as its gloss.
        parts = label.split(" ", 1)
        out["stage"].append({
            "stage": parts[0],
            "definition": parts[1] if len(parts) > 1 else None,
            "percent_of_cases": _num(row[1]),
            "five_year_relative_survival": _num(row[2]),
        })

    missing = [k for k, v in out["at_a_glance"].items() if v is None]
    if missing:
        raise RuntimeError(
            "SEER overview page: could not read " + ", ".join(missing) +
            " — the 'At a Glance' layout changed")
    if out["rates_per_100k"]["new_cases"] is None or out["rates_per_100k"]["deaths"] is None:
        raise RuntimeError("SEER overview page: incidence/mortality sentence changed")
    if not out["stage"]:
        raise RuntimeError("SEER overview page: stage table not found")

    return out


class Seer:
    def __init__(self, http: Http, cancer: cancers.Cancer | None = None):
        self.http = http
        self.cancer = cancer or cancers.BREAST

    def collect(self) -> dict[str, Any]:
        """Per-subtype incidence and survival, where SEER publishes it.

        Only breast has such a page. Prostate does not, and its NCCN risk
        group field sits behind a data-use agreement -- so its subtype
        shares have to be curated with a stated vintage, and this says so
        instead of pretending the fetch is merely broken.
        """
        url = self.cancer.seer_subtypes_url
        if not url:
            raise NoSubtypePage(
                f"{self.cancer.id}: no SEER subtypes page. "
                + (self.cancer.seer_subtypes_note or "Curate these shares instead.")
            )
        # The stat-facts page is HTML, so bypass the JSON cache path.
        r = self.http.session.get(url, timeout=self.http.timeout)
        r.raise_for_status()
        return parse(r.text, url)

    def collect_overview(self) -> dict[str, Any]:
        """Whole-disease figures. Every cancer has one of these pages.

        The parser reads SEER's shared page furniture, but the regexes were
        written against the breast page's wording -- check a new cancer's
        output rather than assuming it transferred.
        """
        url = self.cancer.seer_overview_url
        r = self.http.session.get(url, timeout=self.http.timeout)
        r.raise_for_status()
        return parse_overview(r.text, url)
