"""Melanoma's SEER figures, re-derived from the SEER Stat Facts page without cxp.

Ported from the melanoma plan's phase-4 audit (notes/melanoma-audits-2026-09-15/audit4.py), the
part of it that re-derives: the trend table (SEER 8 observed incidence, US observed death rate).
audit4's other half searched a session's scratch sources for every number in the new sections,
a reading aid and not a check; it is not ported (notes/evidence-2026-09-19.md, phase 2).

Also checked here, because the same page states them and nothing independent checked them: the
at-a-glance figures, the stage table, the median ages and the trend sentences, against the
overview in melanoma.facts.js and the prose in melanoma.js that repeats them.
"""
from __future__ import annotations

import html
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _audit import Report, facts, node_block, num, printed  # noqa: E402
from _http import get_text  # noqa: E402

URL = "https://seer.cancer.gov/statfacts/html/melan.html"
D = r"\D{1,3}"  # a dash, however the page encodes it

r = Report("melanoma SEER figures, re-derived from the Stat Facts page without cxp")
text = printed("melanoma.js")
ov = facts("melanoma.facts.js")["overview"]
raw = get_text(URL)
page = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"<script.*?</script>", " ", raw, flags=re.S))))

# ---- the trend table: Year | SEER 8 observed, modeled | SEER 12 observed, modeled | death observed, modeled | ...
table = next(t for t in re.findall(r"<table.*?</table>", raw, flags=re.S) if "Death Rate" in t and "SEER 8" in t)
rows = {}
for year, rest in re.findall(r"<tr>\s*<td>(\d{4})</td>(.*?)</tr>", table, flags=re.S):
    cells = [c.strip() for c in re.findall(r"<td>(.*?)</td>", rest, flags=re.S)]
    rows[int(year)] = cells
inc = {y: float(c[0]) for y, c in rows.items() if re.fullmatch(r"[\d.]+", c[0])}
dth = {y: float(c[4]) for y, c in rows.items() if re.fullmatch(r"[\d.]+", c[4])}
y0, y1, d0, d1 = min(inc), max(inc), min(dth), max(dth)
peak = max(dth[y] for y in dth if d0 < y < d1)
more = text[text.index("definitionMore:"):text.index("world:")]
r.prose("SEER 8 observed incidence, first and last year", more,
        r"went from ([\d.]+) per 100,000 people in (\d{4}) to ([\d.]+) in (\d{4})", (inc[y0], y0, inc[y1], y1))
ratio = inc[y1] / inc[y0]
r.claim(f"'more than three times the rate': {inc[y1]} / {inc[y0]} = {ratio:.2f}",
        "more than three times the rate" in more and 3 < ratio < 4, f"ratio {ratio:.2f}")
r.prose("US observed death rate, first and last year", more,
        r"death rate was ([\d.]+) per 100,000 in (\d{4}) and ([\d.]+) in (\d{4})", (dth[d0], d0, dth[d1], d1))
r.prose("US observed death rate, highest in between", more, r"never above ([\d.]+) in between", (peak,))
m = re.search(r"new melanoma of the skin cases have been rising on average ([\d.]+)% each year over (\d{4})" + D + r"(\d{4})\. "
              r"Age-adjusted death rates have been falling on average ([\d.]+)% each year over (\d{4})" + D + r"(\d{4})", page)
r.prose("modelled trend: new cases rising, deaths falling", more,
        r"new cases rising ([\d.]+)% a year over (\d{4})" + D + r"(\d{4}), and deaths falling ([\d.]+)% a year over (\d{4})" + D + r"(\d{4})",
        tuple(num(g) for g in m.groups()) if m else (None,))

# ---- at a glance
glance = {}
for key, pat in (("estimated_new_cases", r"Estimated New Cases in (\d{4}) ([\d,]+)"),
                 ("pct_of_all_new_cancers", r"% of All New Cancer Cases ([\d.]+)%"),
                 ("estimated_deaths", r"Estimated Deaths in (\d{4}) ([\d,]+)"),
                 ("pct_of_all_cancer_deaths", r"% of All Cancer Deaths ([\d.]+)%"),
                 ("five_year_relative_survival", r"5-Year Relative Survival ([\d.]+)%")):
    g = re.search(pat, page)
    glance[key] = None if not g else float(num(g.groups()[-1]))
    if g and len(g.groups()) == 2:
        glance["year"] = int(g.group(1))
    r.check(f"at a glance {key} (facts)", glance[key], ov["at_a_glance"].get(key))
r.check("estimate year (facts)", glance.get("year"), ov.get("estimate_year"))
r.prose("incidence line: new cases, deaths, year", text,
        r"incidence: '~([\d,]+) new US cases and ~([\d,]+) deaths estimated for (\d{4})",
        (int(glance["estimated_new_cases"] or 0), int(glance["estimated_deaths"] or 0), glance.get("year")))
cut = node_block(text, "path-cutaneous")
r.prose("path-cutaneous outlook: deaths, year, share of cancer deaths", cut,
        r"An estimated ([\d,]+) US deaths from melanoma of the skin in (\d{4}), ([\d.]+)% of all cancer deaths",
        (int(glance["estimated_deaths"] or 0), glance.get("year"), glance["pct_of_all_cancer_deaths"]))

# ---- stage: share of cases and five-year survival
stage = {}
for name in ("Localized", "Regional", "Distant", "Unknown"):
    g = re.search(name + r" [A-Z][A-Za-z ]+? (\d+)% ([\d.]+)%", page)
    stage[name] = (float(g.group(1)), float(g.group(2))) if g else None
    rec = next((s for s in ov["stage"] if s["stage"] == name), None)
    r.check(f"stage {name}: share of cases, five-year survival (facts)", stage[name],
            (rec["percent_of_cases"], rec["five_year_relative_survival"]) if rec else None)
r.prose("path-cutaneous: five-year survival, localised, distant", cut,
        r"([\d.]+)% five-year relative survival for melanoma of the skin — ([\d.]+)% when found localised, ([\d.]+)% once",
        (glance["five_year_relative_survival"], (stage["Localized"] or (0, 0))[1], (stage["Distant"] or (0, 0))[1]))

# ---- ages
dx = re.search(r"Median Age At Diagnosis (\d+)", page)
death = re.search(r"Median Age At Death (\d+)", page)
band = re.search(r"Percent of New Cases <20.*?65" + D + r"74 ([\d.]+)%", page)
r.check("median age at diagnosis (facts)", float(dx.group(1)) if dx else None, ov["median_age"].get("diagnosis"))
r.check("median age at death (facts)", float(death.group(1)) if death else None, ov["median_age"].get("death"))
age = text[text.index("{ id: 'age',"):text.index("{ id: 'sex',")]
r.prose("age factor: median ages and the 65-74 share of new cases", age,
        r"median age ([\d]+) at diagnosis and ([\d]+) at death, and ([\d.]+)% of new cases are found",
        (int(dx.group(1)) if dx else None, int(death.group(1)) if death else None, float(band.group(1)) if band else None))
r.prose("age factor magnitude: median age at diagnosis", age, r"magnitude: 'median age at diagnosis ([\d]+)'",
        (int(dx.group(1)) if dx else None,))
r.prose("definitionMore: median age at diagnosis", more, r"the median age at diagnosis is ([\d]+)",
        (int(dx.group(1)) if dx else None,))

r.finish()
