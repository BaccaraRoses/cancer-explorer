"""FDA label facts for the agents in the drug pipeline.

The Literature lens already knows each agent's known problems, but only as a
CURATED search vocabulary — my judgement that T-DXd's limiting toxicity is
interstitial lung disease. openFDA turns that into a citation: the boxed warning
on Enhertu's own label says INTERSTITIAL LUNG DISEASE in capitals. Same fact,
sourced instead of asserted.

WHAT IS EXTRACTED AND WHY NOT MORE
----------------------------------
`adverse_reactions` runs to 73,000 characters for Enhertu. Embedding that would
quintuple the overlay and give a reader a wall of text they cannot act on. What
is kept is the part with the highest information per byte:

  boxed warning      the most serious tier, short, and verbatim
  named warnings     the section headings of WARNINGS AND PRECAUTIONS
  common reactions   the label's own "most common adverse reactions were ..."
                     sentence, which often carries real percentages

Everything else is a link to the label.

THIS IS LABEL TEXT, NOT ADVICE
------------------------------
A side-effect list read as "what will happen to me" is a different object from
an excerpt of a regulatory document. Every record therefore carries the label's
effective date and a link, frequencies are kept attached to their reactions
rather than being summarised, and nothing here is ranked, filtered by severity,
or softened.
"""
from __future__ import annotations

import logging
import re
from typing import Any

from .http import Http

log = logging.getLogger("cxp.labels")

API = "https://api.fda.gov/drug/label.json"

# Section headings that are not adverse events, and boilerplate that the
# heading regex would otherwise pick up as a warning.
NOT_A_WARNING = {
    "warnings and precautions", "adverse reactions", "boxed warning",
    "contraindications", "indications and usage", "dosage and administration",
    "see warnings and precautions", "warnings", "precautions",
}


def _flat(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def boxed(label: dict) -> dict[str, Any] | None:
    """The boxed warning, with its capitalised headline pulled out."""
    raw = (label.get("boxed_warning") or [None])[0]
    if not raw:
        return None
    t = _flat(raw)
    m = re.match(r"(WARNING[S]?:?\s*[A-Z0-9 ,/\-()]+?)(?=[A-Z][a-z])", t)
    headline = _flat(m.group(1)) if m else _flat(t[:110])
    return {
        "headline": headline.rstrip(" -,"),
        # enough to convey severity without reproducing the whole section
        "text": t[:600] + ("…" if len(t) > 600 else ""),
    }


def named_warnings(label: dict) -> list[str]:
    """Headings of the WARNINGS AND PRECAUTIONS section.

    The label writes them as "Name : advice" or "• Name: advice". The section
    title itself matches that shape, so it is filtered out explicitly rather
    than left to leak in as a warning called 'WARNINGS AND PRECAUTIONS
    Neutropenia'.
    """
    raw = (label.get("warnings_and_cautions") or [None])[0]
    if not raw:
        return []
    t = _flat(raw)
    t = re.sub(r"^\s*\d*\s*WARNINGS AND PRECAUTIONS\s*", "", t, flags=re.I)

    out: list[str] = []
    for m in re.finditer(r"[••]?\s*([A-Z][A-Za-z0-9 /\-,()]{3,45}?)\s*:\s", t):
        name = m.group(1).strip(" •·")
        low = name.lower()
        if low in NOT_A_WARNING or len(name) < 4:
            continue
        # a sentence fragment, not a heading ("Median time to first onset was")
        if re.search(r"\b(was|were|is|are|has|have|of the|in the)\b", low):
            continue
        # cross-references into the label's own tables and figures. Herceptin's
        # section reads "... see Table 1 : ..." which the heading shape matches
        # perfectly and which is not a warning about anything.
        if re.match(r"^(table|figure|section|see)\b", low):
            continue
        # a truncated parenthetical, e.g. "Herceptin containing regimens (AC-TH"
        if name.count("(") != name.count(")"):
            continue
        if re.search(r"\b(regimen|regimens|study|studies|trial|trials)\b", low):
            continue
        if name not in out:
            out.append(name)
    return out[:12]


def common_reactions(label: dict) -> dict[str, Any] | None:
    """The label's own 'most common adverse reactions' sentence.

    Kept as the label phrases it, with any percentages left attached to their
    reaction. Rewriting it into a tidy list is where a frequency gets separated
    from the thing it is a frequency of.
    """
    raw = (label.get("adverse_reactions") or [None])[0]
    if not raw:
        return None
    t = _flat(raw)
    m = re.search(
        r"most common(?:ly reported)?[^.]{0,140}?adverse reactions?[^.]{0,100}?"
        r"(?:were|are|include[sd]?)\s*[:\-]?\s*(.{40,500}?)\.(?:\s|$)",
        t, re.I)
    if not m:
        return None
    body = _flat(m.group(1))
    return {
        "text": body,
        "has_frequencies": bool(re.search(r"\(\s*\d+(?:\.\d+)?\s*%\s*\)", body)),
    }


class Labels:
    def __init__(self, http: Http):
        self.http = http
        self.failed = False  # a lookup for the current agent failed, so "no label" is unknown

    def _query(self, expr: str, limit: int = 5) -> list[dict]:
        try:
            data = self.http.get(API, params={"search": expr, "limit": str(limit)})
        except Exception as exc:  # noqa: BLE001 - classified below
            status = getattr(getattr(exc, "response", None), "status_code", None)
            if status == 404:  # openFDA's answer to "no label matches"
                return []
            # Anything else is an unanswered question, not an answer of "none".
            log.warning("labels: %s -> %s", expr, exc)
            self.failed = True
            return []
        return (data or {}).get("results") or []

    @staticmethod
    def _score(result: dict, want: str) -> tuple[int, int]:
        """Prefer the single-ingredient product for the drug actually asked about.

        The first hit is often a combination or an alternative formulation:
        querying KISQALI returned the letrozole co-pack, and KEYTRUDA returned
        the subcutaneous pembrolizumab-berahyaluronidase product. Both carry the
        right warnings but they are not the same product, and a reader comparing
        two agents deserves the plain one. Sorted best-first by (exact generic
        match, fewer ingredients).
        """
        of = result.get("openfda") or {}
        gens = [g.lower() for g in (of.get("generic_name") or [])]
        joined = " ".join(gens)
        exact = 1 if any(g.strip() == want.lower() for g in gens) else 0
        # " AND " / "," between ingredients marks a combination product
        parts = len(re.split(r"\band\b|,|;|/", joined)) if joined else 9
        return (-exact, parts)

    def find(self, brand: str | None, generic: str | None) -> tuple[dict, str, tuple] | None:
        """Brand first, then generic — but ranked, not first-hit-wins. Returns the
        label, the search that found it, and the (brand, generic) names the label
        gives itself."""
        for expr, want in filter(None, [
            (f'openfda.brand_name:"{brand}"', generic or brand) if brand else None,
            (f'openfda.generic_name:"{generic}"', generic) if generic else None,
        ]):
            hits = self._query(expr)
            if hits:
                label = sorted(hits, key=lambda r: self._score(r, want or ""))[0]
                of = label.get("openfda") or {}
                return label, expr, ((of.get("brand_name") or [None])[0],
                                     (of.get("generic_name") or [None])[0])
        return self._by_product_line(brand, generic)

    @staticmethod
    def product_line(label: dict) -> list[str]:
        """The SPL's own product line, which openFDA serves whether or not it has
        harmonised the label: "TAGRISSO osimertinib OSIMERTINIB ..." (name, active
        ingredients, then inactive ones)."""
        return " ".join(label.get("spl_product_data_elements") or []).split()

    @staticmethod
    def _names_generic(words: list[str], at: int, generic: list[str]) -> bool:
        """The generic starts at `at`; "tarlatamab-dlle" counts as tarlatamab."""
        got = words[at:at + len(generic)]
        return len(got) == len(generic) and all(w == g or w.startswith(g + "-") for w, g in zip(got, generic))

    def _by_product_line(self, brand: str | None, generic: str | None) -> tuple[dict, str, tuple] | None:
        """openFDA leaves the harmonised `openfda` block empty on some labels, and
        the two searches above read only that block. On 2026-10-17 that hid 19
        labels openFDA still served, TAGRISSO's and TECENTRIQ's among them, and the
        page called those approved agents investigational. Here the label is found
        by its own product line, and taken only when that line names the product:

          with a brand    the line starts with it (the first of "Tukysa + Herceptin",
                          which goes with the first generic), then an optional code
                          in brackets ("IMDELLTRA (AMG757) Tarlatamab-dlle"), then
                          the generic. A brand found further along is another
                          product. The most recent label wins.
          without one     the generic follows a product name of one to three
                          words, and only one product does: two products naming it
                          (TECENTRIQ, Tecentriq Hybreza) is a question this cannot
                          answer, so it answers nothing.
        """
        brand = (brand or "").split("+")[0].strip() or None
        term = brand or generic
        if not term:
            return None
        expr = f'spl_product_data_elements:"{term}"'
        want_b = brand.lower().split() if brand else []
        want_g = generic.lower().split() if generic else []
        found = []  # (label, product name, generic as the label writes it)
        for label in self._query(expr):
            raw = self.product_line(label)
            words = [w.lower() for w in raw]
            if brand:
                if words[:len(want_b)] != want_b:
                    continue
                at = len(want_b)
                while at < len(words) and words[at].startswith("(") and words[at].endswith(")"):
                    at += 1
                if want_g and not self._names_generic(words, at, want_g):
                    continue
                found.append((label, " ".join(raw[:len(want_b)]), " ".join(raw[at:at + len(want_g)]) or None))
            else:
                at = next((k for k in (1, 2, 3) if self._names_generic(words, k, want_g)), None)
                if at is not None:
                    found.append((label, " ".join(raw[:at]), " ".join(raw[at:at + len(want_g)])))
        if not found:
            return None
        if not brand and len({name.lower() for _, name, _ in found}) > 1:
            log.info("labels: %s names %d products; none taken", expr, len({n.lower() for _, n, _ in found}))
            return None
        label, name, gen = max(found, key=lambda f: f[0].get("effective_time") or "")
        return label, expr, (name, gen)

    def for_drug(self, name: str, code: str | None = None) -> dict[str, Any] | None:
        """`name` is the pipeline.csv drug_name, e.g. 'Enhertu (T-DXd)'."""
        # "Trastuzumab deruxtecan (Enhertu)" -> brand Enhertu, generic the rest
        brand = None
        m = re.search(r"\(([^)]+)\)", name)
        if m and not re.search(r"\d", m.group(1)):
            brand = m.group(1).strip()
        generic = _flat(re.sub(r"\([^)]*\)", "", name))
        generic = re.sub(r"\s*\+.*$", "", generic).strip()

        found = self.find(brand, generic)
        if not found:
            return None
        label, expr, (matched_brand, matched_generic) = found

        of = label.get("openfda") or {}
        rec: dict[str, Any] = {
            "matched_brand": matched_brand,
            "matched_generic": matched_generic,
            "manufacturer": (of.get("manufacturer_name") or [None])[0],
            "effective_time": label.get("effective_time"),
            "spl_id": (label.get("id") or None),
            "boxed": boxed(label),
            "warnings": named_warnings(label),
            "common": common_reactions(label),
        }
        sid = of.get("spl_set_id") or ([label["set_id"]] if label.get("set_id") else [])
        rec["url"] = ("https://labels.fda.gov/" if not sid else
                      f"https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/{sid[0]}/spl-doc")
        rec["openfda_url"] = API + "?search=" + expr
        if not of:
            rec["harmonised"] = False  # openFDA's `openfda` block was empty
        return rec

    def collect(self, drugs: list[dict]) -> dict[str, Any]:
        out: dict[str, Any] = {}
        matched = 0
        failed = []
        for d in drugs:
            self.failed = False
            rec = self.for_drug(d.get("name") or "", d.get("code"))
            if rec:
                matched += 1
                out[d["id"]] = rec
            elif self.failed:
                failed.append(d["id"])

        boxed_n = sum(1 for r in out.values() if r.get("boxed"))
        freq_n = sum(1 for r in out.values() if (r.get("common") or {}).get("has_frequencies"))
        return {
            "source": "openFDA drug label API (US FDA Structured Product Labeling)",
            "api": API,
            "licence": "openFDA is a US federal government resource; label content is "
                       "publicly available regulatory text",
            "n_drugs": len(drugs),
            "n_with_label": matched,
            "n_boxed_warnings": boxed_n,
            "n_with_frequencies": freq_n,
            # agents whose lookup failed: their having no label is unknown, not "none"
            "lookup_failed": failed,
            "caveat": "Excerpts of US FDA labels, not a safety summary and not advice. "
                      "An agent without a label here is one openFDA returned no US label "
                      "for: an investigational agent has none yet, and an approved one "
                      "may be approved outside the US or missed by the search. Neither "
                      "means it has no side effects.",
            "labels": out,
        }
