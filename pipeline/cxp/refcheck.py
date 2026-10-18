"""Resolve every PMID a curated dataset cites, and check it is the paper the entry describes.

Recalled PMIDs have already gone wrong here three times: two lung ones resolved
to a crayfish-virus paper and a cystic-fibrosis paper, and colorectal's
CheckMate 8HW PMID was another trial's. Each was caught by hand. This makes it
a check: every `pmid` in data/<cancer>.js `references[]` is looked up in Europe
PMC (through the cached Http, so the answer is kept verbatim on disk) and
compared with what the entry itself says about the paper.

Each check runs only when the entry says enough to run it, otherwise "skip":

  resolves   Europe PMC has a MEDLINE record with exactly this PMID
  url        a PubMed, PMC or DOI url names the same paper as the PMID
  year       the year in `journal` is one of the record's publication years
             (print, electronic, first publication -- they straddle New Year)
  journal    the name in `journal` is the record's journal
  author     the label's first author is the record's first author, or a
             group the record lists as an author
  title      most of the label's title words are in the record's title
  swap       no other PMID in the same dataset matches the label's title
             better than its own does
  retracted  the record is not flagged as a retracted publication

`title` and `swap` do different jobs. A threshold on shared words catches a
PMID for another paper altogether, but it cannot tell a paper from its sibling
in a series: Dinnes 2018's visual-inspection and dermoscopy reviews share 83% of
their title words, while a correct but loose paraphrase (lung meza-2021) shares
62%. What does tell them apart is relative -- a swapped label reads more like
its neighbour's paper than its own -- so `swap` compares the two directly. On
2026-09-19 every correct entry beat its nearest neighbour by at least 0.17.

A label must read 'Surname et al — title' (or 'Group — title'): the author and
title checks are the ones that tell two papers apart, so an entry that gives
them nothing to read fails instead of skipping. The author check is the one
that matters most. Journals print a one-page letter under the same title as the
paper it answers, in the same issue: breast's cgh-menarche cited Britt's
letter (23084520) for ten claims from the Collaborative Group meta-analysis
(23084519), and only the author told them apart.

A row fails if any check fails. There are no waivers: a wrong PMID is never
right for a reason, so the fix is always in the data -- or in this file, if a
check misreads a correct entry. The cache never expires, so a retraction
published after the first fetch shows only after `--refresh references`.

QUOTES
------
A claim may cite `{ ref: 'holman-2023', quote: '...' }` instead of the bare id
(SCHEMA.md, "`source` — footnotes"): the sentence in the paper that states the
figure. The right PMID says which paper; the quote says where in it. Each one
must pass:

  cited      `ref` is a references[] entry that has a PMID (or a set id:
             LABELS, below)
  figure     the quote states a number (it is there to ground one): a digit
             that starts a token, so "receptor-1" or "PD-1" alone is not one
  verbatim   it appears in the paper's abstract, or in its full text where
             Europe PMC serves one (its open-access subset). An ellipsis
             splits a quote into pieces that must appear in order.

"Verbatim" forgives what copying cannot preserve and nothing else: case,
spacing, tags, typographic quotes and dashes, and the Lancet's mid-dot
decimal (0·75). Whether the quote supports the claim is not checked here --
that needs a reader, and is the Skeptic pass's job.

LABELS
------
A US drug label is a source too, and for an indication the only one. An entry
that carries `setid` -- the label's SPL set id, as openFDA and DailyMed name it
-- is a label, and a quote may cite it as it cites a paper, naming the label
section it was read from (SCHEMA.md, "`quote` — where in the paper"):

  { ref: 'label-nivolumab-relatlimab', section: 'indications_and_usage', quote: '...' }

The label is fetched raw from openFDA (drug/label.json, search=set_id:<id>)
through the same cached Http, so the JSON that was read is kept verbatim under
pipeline/cache/ like a PMID record, and the quote is looked for in that one
section's text with the same normalisation. A summary of a label is never what
is checked (INV-19). Each label entry is checked like a PMID entry, "skip"
where it says too little to run a check:

  resolves   openFDA holds exactly one label with this set id
  url        a url naming a set_id names the same one
  product    the label's first words -- 'Opdualag (nivolumab and relatlimab-rmbw)
             US prescribing information' -- name the product: the words before
             the bracket are a brand or generic name openFDA lists for this set
             id. It is what tells a wrong set id apart, as `author` does for a
             PMID; a label not written that way fails instead of skipping.
  effective  a date the label gives ('effective 8 June 2026', 'effective
             2026-06-08') is this version's effective_time

and a quote that cites a label must also pass

  section    it names a section, and the label has that section: a field of
             the openFDA record that holds text (indications_and_usage,
             clinical_studies, mechanism_of_action, a *_table, ...)

and is looked for in that section only. A `section` on a quote that cites a
paper is an error rather than ignored, and an entry with both `pmid` and
`setid` fails: it is one source or the other.

openFDA serves only a label's current version, and the cache never expires, so
the text checked is the version first fetched. `--refresh references` reads
today's; a revised label then fails `effective` until the entry's date is
brought up to it, which is the moment its quotes are worth re-reading.
"""
from __future__ import annotations

import html
import re
import unicodedata
from pathlib import Path
from typing import Any
from urllib.parse import unquote

SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
LABEL = "https://api.fda.gov/drug/label.json"

# The share of the label's title words that must appear in the record's title.
# Labels paraphrase (sentence case, a dropped subtitle, "(Table 1)" appended),
# so this is not an equality test; it separates "the same paper, reworded" from
# "a different paper on the same disease".
TITLE_MIN = 0.6

# ---------------------------------------------------------------- parsing ---

ENTRY_RE = re.compile(r"\{ id: '([a-z0-9-]+)',")
STR_FIELD = r"\b{key}:\s*'((?:[^'\\]|\\.)*)'"
FIELDS = ("label", "journal", "pmid", "setid", "url")


def _unescape(s: str) -> str:
    return re.sub(r"\\(.)", r"\1", s)


def parse_references(text: str) -> list[dict[str, Any]]:
    """The `references: [` block of a dataset, one dict per entry.

    The dataset is JavaScript, so this reads it the way audit.py does: with
    targeted regexes over a regular shape, and a self-check that fails loudly
    when the shape moves rather than returning a short list.
    """
    start = text.find("\n  references: [")
    if start < 0:
        return []
    end = text.find("\n  ],", start)
    block = text[start:end if end > start else len(text)]
    base_line = text.count("\n", 0, start) + 1

    marks = list(ENTRY_RE.finditer(block))
    refs = []
    for i, m in enumerate(marks):
        chunk = block[m.start():marks[i + 1].start() if i + 1 < len(marks) else len(block)]
        ref: dict[str, Any] = {"id": m.group(1),
                               "line": base_line + block.count("\n", 0, m.start())}
        for key in FIELDS:
            fm = re.search(STR_FIELD.format(key=key), chunk)
            ref[key] = _unescape(fm.group(1)) if fm else None
        refs.append(ref)

    for key in ("pmid", "setid"):
        declared = len(re.findall(rf"\b{key}:", block))
        found = sum(1 for r in refs if r[key])
        if declared != found:
            raise RuntimeError(f"references[]: {declared} `{key}:` keys but {found} parsed -- "
                               "an entry's shape changed; update cxp/refcheck.py")
    return refs


# ------------------------------------------------------------- resolving ---

def fetch(http, pmid: str) -> dict[str, Any] | None:
    """The Europe PMC core record for one PMID, or None if there is none."""
    data = http.get(SEARCH, params={"query": f"EXT_ID:{pmid} AND SRC:MED", "format": "json",
                                    "resultType": "core", "pageSize": "2"})
    for rec in (data.get("resultList") or {}).get("result") or []:
        if str(rec.get("pmid")) == pmid:
            return rec
    return None


# --------------------------------------------------------------- judging ---

STOP = frozenset("""a an and are as at by for from in into is its of on or the to with without
    versus vs via after before among between during over under than that this these those
    their what which who whom whose how why when where not no new""".split())


# A tag starts with a letter. Europe PMC abstracts carry a bare "<" for
# less-than ("<0.001", "compared with <15"), and a looser pattern deleted
# everything from there to the next ">". Inline tags go without a trace --
# "(<i>N</i> = 181)" is "(N = 181)" -- and block tags leave a space.
TAG_RE = re.compile(r"</?([A-Za-z][\w:.-]*)(?:\s[^<>]*)?/?>")
INLINE_TAGS = frozenset("""i b u em strong sup sub italic bold underline sc span a font small
    monospace named-content ext-link xref inline-formula""".split())


def _strip_tags(s: str) -> str:
    return TAG_RE.sub(lambda m: "" if m.group(1).lower() in INLINE_TAGS else " ", s or "")


def _fold(s: str) -> str:
    """Lower case, accents off, HTML entities and tags gone."""
    s = html.unescape(_strip_tags(s or ""))
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c)).lower()


def _words(s: str) -> set[str]:
    out = set()
    for w in re.findall(r"[a-z0-9]+", _fold(s)):
        if w in STOP or (len(w) < 3 and not w.isdigit()):
            continue
        # A plural and its singular are the same word for this purpose.
        if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        out.add(w)
    return out


def _name(s: str) -> str:
    return re.sub(r"[^a-z]", "", _fold(s))


def label_parts(label: str) -> tuple[str | None, str | None]:
    """(first author or group, title) from 'Holman et al — acral lentiginous ...'.

    Returns (None, None) for a label that is not written that way.
    """
    head, sep, title = (label or "").partition(" — ")
    if not sep:
        return None, None
    head = head.strip()
    for cut in (" et al", ",", " and ", " & "):
        if cut in head:
            head = head.split(cut, 1)[0]
            break
    # Words the label adds that the title does not have: "(Table 1)",
    # "(Cochrane review)", "(MSK-IMPACT 50K)".
    title = re.sub(r"\s*\([^)]*\)", "", title).strip()
    return head.strip() or None, title or None


def _record_years(rec: dict[str, Any]) -> set[str]:
    ji = rec.get("journalInfo") or {}
    dates = (rec.get("pubYear"), rec.get("firstPublicationDate"), rec.get("electronicPublicationDate"),
             ji.get("printPublicationDate"), ji.get("yearOfPublication"))
    return {str(d)[:4] for d in dates if d}


def _authors(rec: dict[str, Any]) -> list[dict[str, Any]]:
    return (rec.get("authorList") or {}).get("author") or []


def _first_author(rec: dict[str, Any]) -> str | None:
    a = _authors(rec)
    if not a:
        return None
    return a[0].get("lastName") or a[0].get("collectiveName")


def _pub_types(rec: dict[str, Any]) -> list[str]:
    return list((rec.get("pubTypeList") or {}).get("pubType") or [])


def check_url(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    url = ref.get("url") or ""
    m = re.search(r"(?:pubmed\.ncbi\.nlm\.nih\.gov/|ncbi\.nlm\.nih\.gov/pubmed/)(\d+)", url)
    if m:
        return (("ok", "") if m.group(1) == ref["pmid"]
                else ("fail", f"url is PubMed {m.group(1)}, not {ref['pmid']}"))
    m = re.search(r"\b(PMC\d+)\b", url)
    if m:
        pmcid = rec.get("pmcid")
        return (("ok", "") if m.group(1) == pmcid
                else ("fail", f"url is {m.group(1)}; this PMID's PMC id is {pmcid or 'none'}"))
    m = re.search(r"doi\.org/(.+)$", url)
    if m:
        doi = unquote(m.group(1)).rstrip("/").lower()
        rdoi = (rec.get("doi") or "").lower()
        return (("ok", "") if doi == rdoi
                else ("fail", f"url is doi {doi}; this PMID's doi is {rdoi or 'none'}"))
    return "skip", "url names no PubMed, PMC or DOI id"


def check_year(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    years = re.findall(r"\b(?:19|20)\d{2}\b", ref.get("journal") or "")
    if not years:
        return "skip", "journal names no year"
    have = _record_years(rec)
    return (("ok", "") if years[-1] in have
            else ("fail", f"journal says {years[-1]}; the record says {'/'.join(sorted(have)) or 'nothing'}"))


NO_FORM = "the label is not written 'Surname et al — title', so the paper cannot be told apart"


def check_journal(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    """The journal `journal` names is the one the record was published in.

    Compared letters-only, so 'J Natl Cancer Inst' and 'J. Natl. Cancer Inst.'
    are one name; the label may use the MEDLINE or ISO abbreviation or the full
    title, less a place in brackets ('Cancer Prev Res (Phila)').
    """
    text = ref.get("journal") or ""
    m = list(re.finditer(r"\b(?:19|20)\d{2}\b", text))
    if not m:
        return "skip", "journal names no year"
    want = _name(text[:m[-1].start()])
    j = (rec.get("journalInfo") or {}).get("journal") or {}
    names = [j.get(k) for k in ("medlineAbbreviation", "isoabbreviation", "title") if j.get(k)]
    if any(_name(re.sub(r"\([^)]*\)", "", n)) == want for n in names):
        return "ok", ""
    return "fail", f"journal says {text[:m[-1].start()].strip()!r}; the record is in {names[0] if names else 'nothing'!r}"


def check_author(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    head, _ = label_parts(ref.get("label") or "")
    if not head:
        return "fail", NO_FORM
    want = _name(head)
    authors = _authors(rec)
    if not authors:
        return "fail", "the record lists no authors"
    # A group is an author of record wherever it sits in the list: the alcohol
    # reanalysis files Hamajima first and the Collaborative Group after 200 names.
    for a in authors:
        group = _name(a.get("collectiveName") or "")
        if group and want and (want in group or group in want):
            return "ok", ""
    # The first author -- or, for a consensus paper filed under its group
    # first, the first person on it, whom a label may name instead.
    first = authors[0]
    person = first if first.get("lastName") else next((a for a in authors if a.get("lastName")), None)
    if person and _name(person["lastName"]) == want:
        return "ok", ""
    got = authors[0].get("lastName") or authors[0].get("collectiveName") or ""
    return "fail", f"label names {head!r}; the record's first author is {got!r}"


def title_overlap(label_title: str, record_title: str) -> float:
    want = _words(label_title)
    if not want:
        return 1.0
    return len(want & _words(record_title)) / len(want)


def check_title(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    _, title = label_parts(ref.get("label") or "")
    if not title:
        return "fail", NO_FORM
    share = title_overlap(title, rec.get("title") or "")
    return (("ok", f"{share:.0%}") if share >= TITLE_MIN
            else ("fail", f"{share:.0%} of the label's title words are in {rec.get('title')!r}"))


def check_retracted(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    types = _pub_types(rec)
    return (("fail", "Europe PMC lists it as a retracted publication")
            if any(t.lower() == "retracted publication" for t in types) else ("ok", ""))


CHECKS = (("url", check_url), ("year", check_year), ("journal", check_journal), ("author", check_author),
          ("title", check_title), ("retracted", check_retracted))


def judge(ref: dict[str, Any], rec: dict[str, Any] | None) -> dict[str, Any]:
    """One row: the entry, what Europe PMC says, each check, and a verdict."""
    row: dict[str, Any] = {"id": ref["id"], "pmid": ref["pmid"], "line": ref.get("line")}
    if rec is None:
        row.update(verdict="UNRESOLVED", checks={"resolves": "fail"},
                   problems=[f"Europe PMC has no MEDLINE record with PMID {ref['pmid']}"])
        return row
    checks = {"resolves": "ok"}
    problems = []
    notes = {}
    for name, fn in CHECKS:
        status, why = fn(ref, rec)
        checks[name] = status
        if status == "fail":
            problems.append(f"{name}: {why}")
        elif why:
            notes[name] = why
    row.update(
        verdict="OK" if not problems else "MISMATCH",
        checks=checks, problems=problems, notes=notes,
        record={"title": re.sub(r"\s+", " ", html.unescape(_strip_tags(rec.get("title") or ""))).strip(),
                "first_author": _first_author(rec), "year": rec.get("pubYear"),
                "journal": ((rec.get("journalInfo") or {}).get("journal") or {}).get("medlineAbbreviation"),
                "pmcid": rec.get("pmcid"), "doi": rec.get("doi"), "pub_types": _pub_types(rec)},
    )
    return row


def check_swaps(pairs: list[tuple[dict[str, Any], dict[str, Any] | None, dict[str, Any]]]) -> None:
    """Fail a row whose label matches another entry's paper better than its own.

    `pairs` is (entry, record, row) for one dataset; failing rows are updated
    in place. Only rows whose own title could be judged take part.
    """
    judged = [(ref, rec, row) for ref, rec, row in pairs
              if rec is not None and row["checks"].get("title") in ("ok", "fail")]
    for ref, rec, row in judged:
        _, title = label_parts(ref.get("label") or "")
        own = title_overlap(title, rec.get("title") or "")
        best = max(((title_overlap(title, r2.get("title") or ""), ref2) for ref2, r2, _ in judged
                    if ref2["pmid"] != ref["pmid"]), key=lambda x: x[0], default=(0.0, None))
        if best[1] is not None and best[0] > own:
            row["checks"]["swap"] = "fail"
            row["problems"].append(f"swap: the label matches {best[1]['id']}'s paper (PMID {best[1]['pmid']}) "
                                   f"better than its own -- {best[0]:.0%} of its title words against {own:.0%}")
            row["verdict"] = "MISMATCH"
        else:
            row["checks"]["swap"] = "ok"


# ---------------------------------------------------------------- labels ---

SETID_RE = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
MONTHS = {m: i for i, m in enumerate("january february march april may june july august september "
                                     "october november december".split(), 1)}


class NoLabel(LookupError):
    """openFDA answered, and holds no label with the set id asked for."""


def fetch_label(http, setid: str) -> dict[str, Any] | None:
    """The openFDA label record for one set id, or None if there is none.

    openFDA answers 404 when nothing matches; Http raises that rather than
    retry it. Anything else that goes wrong raises, because a lookup that could
    not run is not a pass.
    """
    if not SETID_RE.match(setid or ""):
        return None
    try:
        data = http.get(LABEL, params={"search": f"set_id:{setid}", "limit": "2"})
    except Exception as exc:  # noqa: BLE001 - only a 404 means "no such label"
        if getattr(getattr(exc, "response", None), "status_code", None) == 404:
            return None
        raise
    hits = [r for r in data.get("results") or [] if r.get("set_id") == setid]
    return hits[0] if len(hits) == 1 else None


def label_sections(rec: dict[str, Any]) -> dict[str, str]:
    """{section: its text} for every field of a label record that holds text."""
    return {k: " ".join(v) for k, v in rec.items()
            if k != "openfda" and isinstance(v, list) and v and all(isinstance(x, str) for x in v)}


def _label_date(label: str) -> str | None:
    """'effective 8 June 2026' or 'effective 2026-06-08' as 20260608."""
    m = re.search(r"effective\s+(\d{4})-(\d{2})-(\d{2})\b", label or "")
    if m:
        return "".join(m.groups())
    m = re.search(r"effective\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\b", label or "")
    if m and m.group(2).lower() in MONTHS:
        return f"{m.group(3)}{MONTHS[m.group(2).lower()]:02d}{int(m.group(1)):02d}"
    return None


def check_label_url(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    m = re.search(r"set_?id[:=](?:%22|\")?([0-9a-f-]{36})", ref.get("url") or "", re.I)
    if not m:
        return "skip", "url names no set_id"
    return (("ok", "") if m.group(1).lower() == ref["setid"]
            else ("fail", f"url names set_id {m.group(1)}, not {ref['setid']}"))


def check_product(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    head, sep, _ = (ref.get("label") or "").partition(" (")
    if not sep or not head.strip():
        return "fail", "the label is not written 'Brand (generic) …', so the product cannot be told apart"
    of = rec.get("openfda") or {}
    names = [n for k in ("brand_name", "generic_name") for n in of.get(k) or []]
    if any(_name(n) == _name(head) for n in names):
        return "ok", ""
    return "fail", f"label names {head.strip()!r}; openFDA lists {', '.join(names) or 'no product name'} for this set id"


def check_effective(ref: dict[str, Any], rec: dict[str, Any]) -> tuple[str, str]:
    want = _label_date(ref.get("label") or "")
    if not want:
        return "skip", "label gives no effective date"
    got = str(rec.get("effective_time") or "")
    return (("ok", "") if got == want
            else ("fail", f"label says effective {want}; openFDA's version is effective {got or 'unknown'}"))


LABEL_CHECKS = (("url", check_label_url), ("product", check_product), ("effective", check_effective))


def judge_label(ref: dict[str, Any], rec: dict[str, Any] | None) -> dict[str, Any]:
    """One row for a label entry, shaped like a PMID row."""
    row: dict[str, Any] = {"id": ref["id"], "pmid": None, "setid": ref["setid"], "line": ref.get("line")}
    if ref.get("pmid"):
        row.update(verdict="MISMATCH", checks={"resolves": "skip"},
                   problems=["an entry is a paper (pmid) or a label (setid), not both"])
        return row
    if rec is None:
        why = ("is not a set id (8-4-4-4-12 lower-case hex)" if not SETID_RE.match(ref["setid"])
               else "matches no label on openFDA")
        row.update(verdict="UNRESOLVED", checks={"resolves": "fail"}, problems=[f"set_id {ref['setid']} {why}"])
        return row
    checks = {"resolves": "ok"}
    problems, notes = [], {}
    for name, fn in LABEL_CHECKS:
        status, why = fn(ref, rec)
        checks[name] = status
        if status == "fail":
            problems.append(f"{name}: {why}")
        elif why:
            notes[name] = why
    of = rec.get("openfda") or {}
    row.update(verdict="OK" if not problems else "MISMATCH", checks=checks, problems=problems, notes=notes,
               record={"brand_name": of.get("brand_name"), "generic_name": of.get("generic_name"),
                       "effective_time": rec.get("effective_time"), "version": rec.get("version")})
    return row


# ---------------------------------------------------------------- quotes ---

FULLTEXT = "https://www.ebi.ac.uk/europepmc/webservices/rest/{pmcid}/fullTextXML"

JS_STR = r"'(?:[^'\\]|\\.)*'"
# `section` is optional here and required of a label quote by check_quotes, so
# a label quote without one is read and failed rather than left unparsed.
QUOTE_RE = re.compile(r"\{\s*ref:\s*'([a-z0-9-]+)',\s*(?:section:\s*(" + JS_STR + r"),\s*)?"
                      r"quote:\s*(" + JS_STR + r"(?:\s*\+\s*" + JS_STR + r")*)\s*\}")
# A digit that starts a token (INV-7). After a hyphen it does only when no
# letter precedes the hyphen: "receptor-1", "PD-1" and "gene-3" are names, as
# js/validate.js reads them, while "-0.5" and "2.3-19.6" are figures.
FIGURE_RE = re.compile(r"(?:^|[\s(~≥≤<>=+,]|(?<![A-Za-z])-)\d")
DASHES = dict.fromkeys(map(ord, "‐‑‒–—−"), "-")
DASHES.update({ord("‘"): "'", ord("’"): "'", ord("“"): '"', ord("”"): '"',
               ord("·"): "."})


def normalise(s: str) -> str:
    """Text as a quote is compared: no tags, one space, one kind of dash, any case."""
    s = unicodedata.normalize("NFKC", html.unescape(_strip_tags(s))).translate(DASHES)
    return re.sub(r"\s+", " ", s).strip().casefold()


def parse_quotes(text: str) -> list[dict[str, Any]]:
    """Every { ref, quote } source in a dataset, with its line (and section, if any).

    Self-checking like parse_references: a `quote:` this regex cannot read
    (keys the other way round, an unclosed string) is an error, because an
    unparsed quote would pass the validator and never be checked here.
    """
    out = []
    for m in QUOTE_RE.finditer(text):
        parts = re.findall(JS_STR, m.group(3))
        out.append({"ref": m.group(1), "line": text.count("\n", 0, m.start()) + 1,
                    "section": _unescape(m.group(2)[1:-1]) if m.group(2) else None,
                    "quote": "".join(_unescape(p[1:-1]) for p in parts)})
    declared = len(re.findall(r"\bquote:", text))
    if declared != len(out):
        raise RuntimeError(f"{declared} `quote:` keys but {len(out)} parsed -- write each as "
                           "{ ref: 'id', quote: '...' }, ref first (a label's: ref, section, quote)")
    return out


def paper_text(http, rec: dict[str, Any]) -> dict[str, str]:
    """{where: normalised text} for one paper: its abstract, and its full text if served."""
    out = {}
    if rec.get("abstractText"):
        out["abstract"] = normalise(rec["abstractText"])
    # Europe PMC serves full text for its open-access subset only, and answers
    # 500 -- not 404 -- for the rest, author manuscripts included (18 melanoma
    # papers probed 2026-09-19: all 5 marked open access served XML, all 13
    # others 500). So the record's own flag decides, and a failure on an
    # open-access paper is a real one: it raises rather than pass for "not there".
    if rec.get("pmcid") and rec.get("isOpenAccess") == "Y":
        xml = http.get_text(FULLTEXT.format(pmcid=rec["pmcid"]))
        if "<body" in xml:
            out["full text"] = normalise(xml)
    return out


def _found(quote: str, texts: dict[str, str]) -> str | None:
    pieces = [normalise(p) for p in re.split(r"\.\.\.|…", quote) if normalise(p)]
    for where, body in texts.items():
        at = 0
        for p in pieces:
            at = body.find(p, at)
            if at < 0:
                break
            at += len(p)
        else:
            return where
    return None


def _source_text(http, ref: dict[str, Any], section: str | None) -> tuple[dict[str, str] | None, str]:
    """({where: normalised text}, "") for the paper or label section a quote
    cites, or (None, why) when there is no text to look in."""
    if ref.get("pmid") and ref.get("setid"):
        return None, f"cited: {ref['id']!r} names both a pmid and a setid"
    if ref.get("setid"):
        if not section:
            return None, (f"section: {ref['id']!r} is a label; name the section the quote was read from, "
                          "as { ref, section: 'indications_and_usage', quote }")
        rec = fetch_label(http, ref["setid"])
        if rec is None:
            return None, f"verbatim: openFDA has no label with set_id {ref['setid']}"
        sections = label_sections(rec)
        if section not in sections:
            return None, f"section: the label has no section {section!r}; it has {', '.join(sorted(sections))}"
        return {f"label section {section}": normalise(sections[section])}, ""
    if not ref.get("pmid"):
        return None, f"cited: {ref['id']!r} has neither a PMID nor a set id, so there is nothing to find the quote in"
    if section:
        return None, f"section: {ref['id']!r} is a paper; `section` names where in a drug label a quote was read"
    rec = fetch(http, ref["pmid"])
    return (paper_text(http, rec) if rec else {}), ""


def check_quotes(http, text: str, refs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_id = {r["id"]: r for r in refs}
    sources: dict[tuple[str, str | None], tuple[dict[str, str] | None, str]] = {}
    rows = []
    for q in parse_quotes(text):
        row = {"ref": q["ref"], "line": q["line"], "quote": q["quote"]}
        if q["section"]:
            row["section"] = q["section"]
        ref = by_id.get(q["ref"])
        if ref is None:
            rows.append({**row, "verdict": "FAIL", "problem": f"cited: {q['ref']!r} is not a references[] id"})
            continue
        key = (q["ref"], q["section"])
        if key not in sources:
            try:
                sources[key] = _source_text(http, ref, q["section"])
            except Exception as exc:  # noqa: BLE001 - a lookup that could not run is not a pass
                what = f"set_id {ref['setid']}" if ref.get("setid") else f"PMID {ref['pmid']}"
                sources[key] = (None, f"verbatim: could not fetch {what} ({type(exc).__name__}: {str(exc)[:120]})")
        texts, why = sources[key]
        if texts is None:
            rows.append({**row, "verdict": "FAIL", "problem": why})
            continue
        if not FIGURE_RE.search(q["quote"]):
            rows.append({**row, "verdict": "FAIL", "problem": "figure: the quote states no number"})
            continue
        where = _found(q["quote"], texts)
        if where:
            rows.append({**row, "verdict": "OK", "found_in": where})
        else:
            searched = " or ".join(texts) or "nothing (no abstract, no full text)"
            owner = f"set_id {ref['setid']}'s" if ref.get("setid") else f"PMID {ref['pmid']}'s"
            rows.append({**row, "verdict": "FAIL", "problem": f"verbatim: not in {owner} {searched}"})
    return rows


def run(http, dataset_js: Path) -> dict[str, Any]:
    """Every PMID and label set id in one dataset's references[], resolved and judged; then every quote."""
    text = dataset_js.read_text(encoding="utf-8")
    refs = parse_references(text)
    rows = []
    pairs = []
    for ref in refs:
        if not ref.get("pmid"):
            continue
        try:
            rec = fetch(http, ref["pmid"])
        except Exception as exc:  # noqa: BLE001 - a lookup that could not run is not a pass
            rows.append({"id": ref["id"], "pmid": ref["pmid"], "line": ref.get("line"),
                         "verdict": "UNCHECKED", "checks": {"resolves": "fail"},
                         "problems": [f"Europe PMC lookup failed: {type(exc).__name__}: {str(exc)[:160]}"]})
            continue
        rows.append(judge(ref, rec))
        pairs.append((ref, rec, rows[-1]))
    check_swaps(pairs)
    n_pmid = len(rows)
    for ref in refs:
        if not ref.get("setid"):
            continue
        try:
            rec = fetch_label(http, ref["setid"])
        except Exception as exc:  # noqa: BLE001 - a lookup that could not run is not a pass
            rows.append({"id": ref["id"], "pmid": None, "setid": ref["setid"], "line": ref.get("line"),
                         "verdict": "UNCHECKED", "checks": {"resolves": "fail"},
                         "problems": [f"openFDA lookup failed: {type(exc).__name__}: {str(exc)[:160]}"]})
            continue
        rows.append(judge_label(ref, rec))
    quotes = check_quotes(http, text, refs)
    return {"dataset": dataset_js.name, "n_references": len(refs),
            "n_pmid": n_pmid, "n_label": len(rows) - n_pmid, "rows": rows,
            "failing": [r["id"] for r in rows if r["verdict"] != "OK"],
            "quotes": quotes,
            "failing_quotes": [f"{q['ref']}@{q['line']}" for q in quotes if q["verdict"] != "OK"]}
