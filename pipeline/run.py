#!/usr/bin/env python
"""Cancer Explorer pipeline CLI.

    python run.py molecular          # compute driver freqs + the concordance matrix
    python run.py --cancer prostate molecular    # ...for a different cancer
    python run.py trials             # refresh trial status from ClinicalTrials.gov
    python run.py targets            # protein domains, hotspots, structures, drugs, gaps
    python run.py audit              # diff computed facts vs the hand-written dataset
    python run.py references         # resolve every cited PMID; is it the paper named?
    python run.py manual             # list the hand-edits the pipeline cannot make
    python run.py all                # all of the above, in dependency order
    python run.py --refresh all      # ignore the cache and re-fetch (flag before the step)

Facts land in facts/ and may be regenerated freely.
Reports land in reports/.
Nothing here ever writes to curation/.

`all` ends with `manual`, which reads the run's own artefacts and prints the
remaining to-do list grouped by the file a human has to open. The pipeline
computes numbers; it does not write prose, and it never edits pipeline.csv.
"""
from __future__ import annotations

import argparse
import json
import logging
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from cxp import attribution  # noqa: E402
from cxp import config  # noqa: E402
from cxp.audit import run as run_audit  # noqa: E402
from cxp import cancers  # noqa: E402
from cxp.cbioportal import CBioPortal  # noqa: E402
from cxp.ctgov import CtGov, nct_ids_from_csv  # noqa: E402
from cxp.civic import Civic  # noqa: E402
from cxp import drugs as drugs_mod  # noqa: E402
from cxp import gate  # noqa: E402
from cxp import structures  # noqa: E402
from cxp.emit import run as run_emit  # noqa: E402
from cxp.emit_literature import write_js as write_literature_js  # noqa: E402
from cxp.emit_targets import write_js as write_targets_js  # noqa: E402
from cxp.files import write_lf  # noqa: E402
from cxp.gwas import Gwas  # noqa: E402
from cxp.literature import Literature  # noqa: E402
from cxp.http import Http  # noqa: E402
from cxp.labels import Labels  # noqa: E402
from cxp.oncotree import OncoTree  # noqa: E402
from cxp import refcheck  # noqa: E402
from cxp import seer as seer_mod  # noqa: E402
from cxp.seer import Seer  # noqa: E402
from cxp.sync import run as run_sync, stale_prose  # noqa: E402
from cxp import targets as targets_mod  # noqa: E402
from cxp.targets import build as build_targets  # noqa: E402
from cxp.uniprot import UniProt  # noqa: E402

FACTS = HERE / "facts"
REPORTS = HERE / "reports"
PROJECT = HERE.parent                      # cancer-explorer/
# The curated drug tables and landscape markdown. On the author's stations they are
# a sibling repository; a published snapshot (tools/publish.py) carries them inside.
RESEARCH = (PROJECT / "cancer_research" if (PROJECT / "cancer_research").is_dir()
            else PROJECT.parent / "cancer_research")
SOURCES_MD = RESEARCH / "SOURCES.md"

# Which cancer this run is for. Set once from --cancer in main(); everything
# else derives from it, so there is no path in this file that can name one
# cancer while the fetch names another.
CANCER = cancers.get(None)


def _facts(kind: str) -> Path:
    """pipeline/facts/<cancer>.<kind>.json"""
    return FACTS / f"{CANCER.id}.{kind}.json"


def _data(suffix: str) -> Path:
    """cancer-explorer/data/<cancer>.<suffix>"""
    return PROJECT / "data" / f"{CANCER.id}.{suffix}"


def _dataset_js() -> Path:
    return PROJECT / "data" / CANCER.dataset_js


def _report(ext: str) -> Path:
    """pipeline/reports/<cancer>.audit.<ext>

    Per cancer, like facts/. A single reports/audit.json was overwritten by
    whichever cancer ran last, and `manual` then printed that cancer's drift
    under another cancer's file name.
    """
    return REPORTS / f"{CANCER.id}.audit.{ext}"


def _pipeline_csv() -> Path | None:
    """The curated drug × indication rows, if cancers.py declares any."""
    return RESEARCH / CANCER.pipeline_csv if CANCER.pipeline_csv else None


def _landscape_md() -> Path | None:
    return RESEARCH / CANCER.landscape_md if CANCER.landscape_md else None


def _target_genes() -> list[str]:
    """The gene panel for this cancer's targets lens."""
    return targets_mod.TARGET_GENES_BY_CANCER.get(CANCER.id, [])


def _pdb_choice() -> dict[str, str]:
    return targets_mod.PDB_CHOICE_BY_CANCER.get(CANCER.id, {})


def _needs_curation(what: str) -> int:
    """Refuse, with the reason, rather than half-running against no input."""
    print(f"  ! {CANCER.id} has no curated {what} yet "
          f"(cxp/cancers.py declares none), so this step cannot run.")
    print(f"    Write it under ../cancer_research/ and point cancers.py at it first.")
    return 1

# Registry statuses that mean a pipeline.csv row is citing a dead or stalled
# trial. UNKNOWN is separate: it means the sponsor stopped updating the record,
# not that the trial stopped.
DEAD_TRIAL_STATUS = {"TERMINATED", "WITHDRAWN", "SUSPENDED", "NO_LONGER_AVAILABLE"}


def _log(verbose: bool) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(levelname)-7s %(name)-16s %(message)s",
    )


def cmd_molecular(args) -> int:
    http = Http(refresh=args.refresh)
    cb = CBioPortal(http, study=args.study, cancer=CANCER)
    print(f"  cancer: {CANCER.id}   cohort: {cb.study}")
    facts = cb.collect()

    # Extra whole-study cohorts, each pinned to one node. This is how a
    # disease-state axis gets evidence: the treated disease is a different
    # cohort, not a subtype of the untreated one, so no per-subtype split can
    # produce the comparison. Each is non-fatal on its own -- one unavailable
    # study must not cost the run its main result.
    by_state: dict[str, dict] = {}
    for cn in CANCER.cohort_nodes:
        try:
            sub = CBioPortal(http, study=cn.study, cancer=CANCER)
            rec = sub.whole_cohort_frequencies(node=cn)
            meta = sub.study_meta()
            rec["subtype_label"] = cn.label
            rec["cohort"] = {
                "study": cn.study,
                "name": meta.get("name"),
                # Patients counted, one sample each -- not the study's sample
                # total, which double-counts anyone biopsied twice.
                "n": rec["n_samples"],
                "url": f"https://www.cbioportal.org/study/summary?id={cn.study}",
            }
            if cn.filter_note or cn.sample_filter or cn.requires:
                rec["cohort"]["filter"] = cn.filter_note or "; ".join(
                    [f"{a} in {'/'.join(v)}" for a, v in cn.sample_filter] +
                    ([" or ".join(r.label for r in cn.requires)] if cn.requires else []))
            if cn.note:
                rec["cohort_note"] = cn.note
            by_state[cn.node] = rec
            print(f"    {cn.node:20} {cn.study:34} n={rec['n_samples']:>4} patients, "
                  f"{rec['n_sequenced']:>4} sequenced, {rec['n_cna_profiled']:>4} CNA")
            # The controls the node's prose quotes. Each is non-fatal on its own,
            # like the node itself; `audit` reports any quoted count left untraced.
            contrasts = []
            for c in cn.contrasts:
                try:
                    study = c.study or cn.study
                    csub = sub if study == cn.study else CBioPortal(http, study=study, cancer=CANCER)
                    probe = cancers.CohortNode(node=cn.node, study=study, label=c.label,
                                               sample_filter=c.sample_filter)
                    crec = csub.whole_cohort_frequencies(genes=list(c.genes), node=probe)
                    contrasts.append({"key": c.key, "label": c.label, "study": study,
                                      "filter": c.filter_note, "n_samples": crec["n_samples"],
                                      "genes": crec["genes"]})
                    line = "  ".join(f"{g} {m['pct']}% ({m['n']}/{m['of']})"
                                     for g, ms in crec["genes"].items()
                                     for k, m in ms.items() if k == "mutation")
                    print(f"      contrast {c.key:28} n={crec['n_samples']:>4}  {line}")
                except Exception as exc:  # noqa: BLE001
                    print(f"      ! contrast {c.key} ({c.study or cn.study}) failed: "
                          f"{type(exc).__name__}: {str(exc)[:90]}")
            # A contrast declared `of` another is a share of it, in patients.
            keyed = {c["key"]: c for c in contrasts}
            for c in cn.contrasts:
                got, base = keyed.get(c.key), keyed.get(c.of) if c.of else None
                if got and base and base["n_samples"]:
                    got["share"] = {"n": got["n_samples"], "of": base["n_samples"],
                                    "pct": round(100 * got["n_samples"] / base["n_samples"], 1)}
                    print(f"      share    {c.key:28} {got['share']['pct']}% "
                          f"({got['n_samples']}/{base['n_samples']}) of {c.of}")
            if contrasts:
                rec["contrasts"] = contrasts
        except Exception as exc:  # noqa: BLE001
            print(f"    ! {cn.node} ({cn.study}) failed: "
                  f"{type(exc).__name__}: {str(exc)[:90]}")
    if by_state:
        facts["drivers_by_cohort"] = by_state
    FACTS.mkdir(parents=True, exist_ok=True)
    out = _facts("molecular")
    write_lf(out, json.dumps(facts, indent=2))

    for node, d in facts["drivers_by_subtype"].items():
        print(f"    {node:16} n={d['n_samples']:>4}  sequenced={d['n_sequenced']:>4}  cna={d['n_cna_profiled']:>4}")
    cls = facts.get("classification")
    if cls:
        print(f"    classifier {cls['name']}: {cls['n_classified']} of {cls['n_patients']} patients classified")
        for c in cls["classes"]:
            where = "excluded by design" if c["excluded"] else (c["node"] or "! NO NODE")
            print(f"      {c['label']:22} {c['n']:>5}  {c['pct']:>5}%  -> {where}")
        for label, n in cls["unreadable_samples"].items():
            print(f"      ! {n} sample(s) stopped unreadable at '{label}'")
    conc = facts["concordance"]
    if conc.get("available"):
        print(f"    concordance: {conc.get('row_label', 'rows')} x "
              f"{conc.get('col_label', 'columns')}, n={conc['n_classified']}")
        # Whatever cells cancers.py declared worth quoting, both ways round.
        for key, h in (conc.get("headline") or {}).items():
            print(f"      {key:36} {h['pct']}% ({h['n']}/{h['of']})")
    else:
        print(f"    concordance unavailable: {conc.get('reason')}")
    print(f"  wrote {out}   (cache hit={http.stats['hit']} miss={http.stats['miss']})")
    return 0


def cmd_trials(args) -> int:
    csv_path = Path(args.csv) if args.csv else _pipeline_csv()
    if csv_path is None:
        return _needs_curation("drug pipeline csv")
    if not csv_path.exists():
        print(f"  ! no CSV at {csv_path} — skipping trial refresh")
        return 1
    ids = nct_ids_from_csv(csv_path)
    print(f"  {len(ids)} NCT ids in {csv_path.name}")
    http = Http(refresh=args.refresh)
    facts = CtGov(http).collect(ids)
    FACTS.mkdir(parents=True, exist_ok=True)
    out = _facts("trials")
    write_lf(out, json.dumps(facts, indent=2))
    print(f"    returned {facts['n_returned']}/{facts['n_requested']}")
    for t in facts["trials"].values():
        if t.get("error"):
            continue
        print(f"    {t['nct_id']}  {str(t.get('phase')):16} {t.get('overall_status')}")
    print(f"  wrote {out}   (cache hit={http.stats['hit']} miss={http.stats['miss']})")
    return 0


def cmd_audit(args) -> int:
    facts_path = _facts("molecular")
    if not facts_path.exists():
        print("  ! run `python run.py molecular` first")
        return 1
    REPORTS.mkdir(parents=True, exist_ok=True)
    res = run_audit(facts_path, _dataset_js(), _report("md"), _report("json"),
                    incidence_path=_facts("incidence"),
                    civic_path=_facts("civic"),
                    overview_path=_facts("overview"),
                    cancer_name=CANCER.name.lower(),
                    civic_reviewed=CANCER.civic_reviewed,
                    audit_against=CANCER.audit_against)
    counts = res["hand"]["counts"]
    print(f"  parsed {counts['nodes']} nodes / {counts['drivers']} drivers "
          f"from data/{CANCER.dataset_js}")
    tally: dict[str, int] = {}
    for r in res["rows"]:
        tally[r["verdict"]] = tally.get(r["verdict"], 0) + 1
    for k in ("MATCH", "CLOSE", "DIVERGENT", "NOT COMPUTED"):
        if tally.get(k):
            print(f"    {k:14} {tally[k]}")
    worst = [r for r in res["rows"] if r["verdict"] in ("DIVERGENT", "CLOSE")]
    for r in worst[:12]:
        print(f"      {r['node']:14} {r['gene']:8} hand={r['hand']:>5}%  computed={r['computed']}%  Δ{r['delta']:+.1f}")

    quoted = res.get("quoted") or []
    if quoted:
        off = [r for r in quoted if r["verdict"] != "MATCH"]
        print(f"    counts quoted on cohort nodes: {len(quoted) - len(off)}/{len(quoted)} match")
        for r in off:
            print(f"      {r['node']:18} {r['quoted'][:48]:48} {r['verdict']}")

    prev = res.get("prevalence") or []
    if prev:
        off = [r for r in prev if r["verdict"] != "MATCH"]
        print(f"    prevalence vs SEER: {len(prev) - len(off)}/{len(prev)} match")
        for r in off:
            hv = "—" if r["hand"] is None else f"{r['hand']}%"
            print(f"      {r['node']:18} {CANCER.dataset_js}={hv:>7}  SEER={r['seer']}%  {r['verdict']}")
    else:
        # `incidence` only writes this file where SEER publishes a subtypes
        # page, so telling prostate or lung to run it sends them in a circle.
        print(f"    prevalence vs SEER: skipped (no facts/{CANCER.id}.incidence.json — "
              f"`incidence` writes it only where SEER publishes a subtypes page)")

    cov = res.get("coverage") or {}
    if cov:
        print(f"    citation coverage ({cov['references_declared']} references declared):")
        for k, label in (("factors", "risk factors"), ("triggers", "triggers"),
                         ("therapies", "therapies")):
            c, t = cov[k]["cited"], cov[k]["total"]
            # 0/0 means the dataset makes no such claims, not that it cites none.
            flag = "" if c == t else "   <-- uncited claims"
            print(f"      {label:14} {c:>3}/{t:<3}{flag}")
        if cov["dangling_reference_ids"]:
            print(f"      ! cited but not declared: {', '.join(cov['dangling_reference_ids'])}")

    ov = res.get("overview") or []
    if ov:
        off = [r for r in ov if r["verdict"] not in ("MATCH",)]
        print(f"    front-page figures vs SEER: {len(ov) - len(off)}/{len(ov)} match")
        for r in off:
            seer = "—" if r["seer"] is None else r["seer"]
            print(f"      {r['what']:26} {CANCER.dataset_js}={r['hand']:>6}  SEER={seer:>6}  {r['verdict']}")

    drug = res.get("druggability") or []
    if drug:
        t: dict[str, int] = {}
        for r in drug:
            t[r["verdict"]] = t.get(r["verdict"], 0) + 1
        print("    druggability vs CIViC: " + ", ".join(f"{k} {v}" for k, v in sorted(t.items())))
        for r in [x for x in drug if x["verdict"] in ("MISSED", "UNSUPPORTED")][:8]:
            print(f"      {r['gene']:10} flagged={'yes' if r['marked_druggable'] else 'no ':3} "
                  f"civic={r['civic_best_level'] or '—'}  {r['verdict']}")
    else:
        print("    druggability vs CIViC: skipped (run `python run.py civic` first)")
    print(f"  wrote {_report('md')}")

    # The verdicts above used to be advisory: audit exited 0 whatever they
    # said. The gate reads the report just written, so it judges exactly what
    # `manual` and a reader see.
    report = json.loads(_report("json").read_text(encoding="utf-8"))
    verdict = gate.evaluate(report, CANCER.audit_waivers)
    for line in gate.render(verdict):
        print(f"  {line}")
    return 0 if verdict.passed else 1


def cmd_references(args) -> int:
    """Resolve every PMID and label set id in references[]; is each the source its entry names?"""
    http = Http(refresh=args.refresh)
    res = refcheck.run(http, _dataset_js())
    FACTS.mkdir(parents=True, exist_ok=True)
    out = _facts("references")
    write_lf(out, json.dumps(res, indent=2, ensure_ascii=False))
    print(f"  {res['n_pmid']} PMIDs and {res['n_label']} label set ids among {res['n_references']} "
          f"references in data/{CANCER.dataset_js}")
    for r in res["rows"]:
        if r["verdict"] == "OK":
            continue
        what = f"set_id {r['setid']}" if r.get("setid") else f"PMID {r['pmid']}"
        print(f"    {r['verdict']:10} {r['id']} ({what}, data/{CANCER.dataset_js}:{r['line']})")
        for p in r["problems"]:
            print(f"      {p}")
    for q in res["quotes"]:
        if q["verdict"] != "OK":
            print(f"    QUOTE FAIL {q['ref']} (data/{CANCER.dataset_js}:{q['line']}) {q['quote'][:70]!r}")
            print(f"      {q['problem']}")
    print(f"  wrote {out}   (cache hit={http.stats['hit']} miss={http.stats['miss']})")
    n, nl = res["n_pmid"], res["n_label"]
    bad = sum(1 for r in res["rows"] if r["verdict"] != "OK" and not r.get("setid"))
    badl = sum(1 for r in res["rows"] if r["verdict"] != "OK" and r.get("setid"))
    nq, badq = len(res["quotes"]), len(res["failing_quotes"])
    head = "PASS" if not (bad or badl or badq) else f"FAIL -- {bad + badl + badq} row(s)"
    labels = f"{nl - badl} of {nl} labels name the product their entry describes; " if nl else ""
    print(f"  references: {head}  ({n - bad} of {n} PMIDs name the paper their entry describes; "
          f"{labels}{nq - badq} of {nq} quotes found verbatim)")
    return 0 if not (bad or badl or badq) else 1


def cmd_incidence(args) -> int:
    """SEER incidence and survival, parsed from the published tables.

    Two artefacts from the same source family: per-subtype figures from the
    subtypes page, and whole-disease figures from the main page. The second is
    what the front page needs and the subtype page has never carried.
    """
    http = Http(refresh=args.refresh)
    seer = Seer(http, cancer=CANCER)
    try:
        facts = seer.collect()
    except seer_mod.NoSubtypePage as exc:
        # Not a failure of the fetch. Say which it is, and keep going --
        # the whole-disease page below is a separate source and still works.
        print(f"  ! {exc}")
        facts = None
    FACTS.mkdir(parents=True, exist_ok=True)
    out = _facts("incidence")
    if facts is not None:
        write_lf(out, json.dumps(facts, indent=2))

    ov = seer.collect_overview()
    ov_path = _facts("overview")
    write_lf(ov_path, json.dumps(ov, indent=2))
    g, r = ov["at_a_glance"], ov["rates_per_100k"]
    print(f"  overview: {ov['population']}, estimates for {ov['estimate_year']}")
    print(f"    {int(g['estimated_new_cases']):,} new cases  ·  {int(g['estimated_deaths']):,} deaths")
    who = ov.get("population_sex") or "people"
    print(f"    {r['new_cases']} new / {r['deaths']} deaths per 100,000 {who} per year ({r['basis']})")
    print(f"    {g['five_year_relative_survival']}% 5-year relative survival  ·  "
          f"lifetime risk {ov['lifetime_risk_pct']}%  ·  median age {int(ov['median_age']['diagnosis'])}")
    for s in ov["stage"]:
        print(f"    {s['stage']:10} {s['percent_of_cases']}% of cases, "
              f"{s['five_year_relative_survival']}% 5-year")
    print(f"  wrote {ov_path}")

    if facts is None:
        print("  no per-subtype table for this cancer — the whole-disease figures above "
              "are the only registry source, and subtype shares must be curated")
        return 0

    print(f"  source: {facts['source']}")
    print(f"  period: {facts['period']}")
    print(f"    {'subtype':12} {'% of cases':>11} {'rate/100k':>10} {'5yr surv':>9}")
    for label, v in facts["subtypes"].items():
        print(f"    {label:12} {str(v.get('percent_of_cases','—')):>11} "
              f"{str(v.get('rate_per_100k','—')):>10} {str(v.get('five_year_relative_survival','—')):>9}")
    print(f"    total percent: {facts['percent_total']}")
    print(f"  wrote {out}")
    return 0


def _write(name: str, payload: dict) -> Path:
    FACTS.mkdir(parents=True, exist_ok=True)
    out = FACTS / name
    write_lf(out, json.dumps(payload, indent=2))
    return out


def cmd_oncotree(args) -> int:
    http = Http(refresh=args.refresh)
    facts = OncoTree(http, cancer=CANCER).collect()
    out = _write(_facts("oncotree"), facts)
    print(f"  {facts['n_tissue_types']} {facts['tissue']} types "
          f"of {facts['n_total_types']} total")
    if facts["missing_expected_codes"]:
        print(f"  ! expected codes missing: {facts['missing_expected_codes']}")
    for node, r in facts["nodes"].items():
        print(f"    {node:13} {r['code']:9} {str(r.get('name'))[:46]:46} {r['match']}")
    print(f"  wrote {out}")
    return 0


def cmd_civic(args) -> int:
    http = Http(refresh=args.refresh)
    facts = Civic(http, disease=CANCER.civic_disease).collect()
    out = _write(_facts("civic"), facts)
    print(f"  fetched {facts['n_fetched']}/{facts['total_reported']} evidence items")
    top = list(facts["genes"].items())[:12]
    print(f"    {'gene':10} {'items':>5} {'best':>4}  top therapies")
    for gene, g in top:
        ther = ", ".join(g["top_therapies"][:3])
        print(f"    {gene:10} {g['n_evidence_items']:>5} {str(g['best_level']):>4}  {ther[:44]}")
    print(f"  wrote {out}")
    return 0


def cmd_gwas(args) -> int:
    http = Http(refresh=args.refresh)
    facts = Gwas(http, trait_name=CANCER.gwas_trait).collect()
    out = _write(_facts("gwas"), facts)
    print(f"  trait {facts['trait']['short_form']} — {facts['n_associations_fetched']} fetched, "
          f"{facts['n_genome_wide_significant']} genome-wide significant")
    for tr in facts.get("traits") or []:
        print(f"    {tr['short_form']:15} {tr['name']:28} {tr['n_associations']:>5} associations, "
              f"{tr['n_not_seen_under_an_earlier_trait']:>5} not under an earlier trait")
    if facts["or_range"]:
        print(f"  OR range in top {len(facts['top_loci'])}: "
              f"{facts['or_range'][0]}–{facts['or_range'][1]}")
    for r in facts["top_loci"][:8]:
        genes = ",".join(r["reported_genes"])[:24] or "(intergenic)"
        print(f"    OR={r['odds_ratio']:<7.2f} p={r['pvalue']:<8.0e} "
              f"{str(r['risk_allele']):16} {genes}")
    print(f"  wrote {out}")
    return 0


def cmd_survival(args) -> int:
    http = Http(refresh=args.refresh)
    payload = {"source": "cBioPortal clinical data"}
    if CANCER.survival_caveat:
        payload["caveat"] = CANCER.survival_caveat
    payload["cohorts"] = {}
    pairs = [(args.study, CANCER.survival_attr)]
    if CANCER.survival_study:
        # A second cohort with mature follow-up, where one exists. Median OS
        # is undefined until half the group has had the event, and the
        # primary TCGA cohorts are nowhere near that.
        pairs.insert(0, (CANCER.survival_study, CANCER.survival_study_attr))
    else:
        print(f"  {CANCER.id}: no mature-follow-up cohort declared; "
              "median OS from the primary cohort alone will mostly read "
              "'not reached'")
    for study, attr in pairs:
        cb = CBioPortal(http, study=study, cancer=CANCER)
        res = cb.survival(attr)
        payload["cohorts"][study] = res
        print(f"  {study} ({attr})")
        if not res.get("available"):
            print(f"    unavailable: {res.get('reason')}")
            continue
        for label, v in res["by_subtype"].items():
            med = v["median_os_months"]
            shown = f"{med} mo" if med is not None else "not reached"
            print(f"    {label:14} n={v['n']:>5} deaths={v['deaths']:>5}  median OS {shown}")
    if not any(r.get("available") for r in payload["cohorts"].values()):
        # A file of nothing but "unavailable" is emitted into the overlay as a
        # survival block, which reads as data where there is none.
        print(f"  no cohort carries survival for {CANCER.id}; nothing written")
        return 0
    out = _write(_facts("survival"), payload)
    print(f"  wrote {out}")
    return 0


def cmd_keys(args) -> int:
    """Report which credentials are present, where to get the rest, and probe them."""
    import requests

    loaded = config.load_env()
    if loaded:
        print(f"  loaded {len(loaded)} value(s) from {config.ENV_FILE.name}")
    else:
        print(f"  no {config.ENV_FILE.name} found (env vars still honoured)")
    print()

    session = requests.Session()
    session.headers.update({"User-Agent": "cancer-explorer-pipeline/0.1 (research)"})

    def probe(cred) -> str:
        try:
            if cred.env == "SEER_API_KEY":
                r = session.get("https://api.seer.cancer.gov/rest/rate_session/csr",
                                headers={"X-SEERAPI-Key": config.get("SEER_API_KEY")}, timeout=25)
                left = r.headers.get("X-RateLimit-Remaining")
                return f"HTTP {r.status_code}" + (f", {left} calls left this hour" if left else "")
            if cred.env == "NCBI_API_KEY":
                r = session.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
                                params={"db": "pubmed", "term": f"{CANCER.name}", "retmode": "json",
                                        "retmax": 1, "api_key": config.get("NCBI_API_KEY")}, timeout=25)
                return f"HTTP {r.status_code}"
            if cred.env == "OPENFDA_API_KEY":
                r = session.get("https://api.fda.gov/drug/label.json",
                                params={"search": 'openfda.brand_name:"TRODELVY"', "limit": 1,
                                        "api_key": config.get("OPENFDA_API_KEY")}, timeout=25)
                return f"HTTP {r.status_code}"
            if cred.env == "ONCOKB_TOKEN":
                r = session.get("https://www.oncokb.org/api/v1/info",
                                headers={"Authorization": f"Bearer {config.get('ONCOKB_TOKEN')}"},
                                timeout=25)
                return f"HTTP {r.status_code}"
        except Exception as exc:  # noqa: BLE001
            return f"{type(exc).__name__}: {str(exc)[:50]}"
        return "no probe defined"

    missing = 0
    for cred, present in config.status():
        mark = "SET " if present else "----"
        print(f"  [{mark}] {cred.service}  ({cred.env}{''.join(' + ' + e for e in cred.extra_env)})")
        if present:
            print(f"         probe: {probe(cred)}")
        else:
            missing += 1
            print(f"         needed for : {cred.required_for}")
            print(f"         register at: {cred.register_url}")
            print(f"         passed as  : {cred.how_passed}")
        if cred.notes:
            print(f"         note       : {cred.notes}")
        print()

    if missing:
        print(f"  {missing} credential(s) not set.")
        print(f"  Copy .env.example to .env and fill in what you have:")
        print(f"      cp pipeline/.env.example pipeline/.env")
        print("  .env is gitignored. Nothing is written to the HTTP cache.")
    else:
        print("  all credentials present.")
    return 0


def cmd_emit(args) -> int:
    facts_path = _facts("molecular")
    if not facts_path.exists():
        print("  ! run `python run.py molecular` first")
        return 1
    stamp = time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime())
    res = run_emit(facts_path, _data("facts.js"), stamp, facts_dir=FACTS)
    print(f"  {res['nodes']} nodes, {res['drivers']} computed driver figures")
    print(f"  extra blocks: {', '.join(res['blocks']) or 'none'}")
    print(f"  wrote {res['path']}")
    print(f"  (curated prose in data/{CANCER.dataset_js} is untouched by design)")
    return 0


def cmd_targets(args) -> int:
    """Protein architecture, hotspots, structures, drugs, and the gap analysis."""
    if _pipeline_csv() is None:
        return _needs_curation("drug pipeline csv")
    http = Http(refresh=args.refresh)
    cb = CBioPortal(http, study=args.study, cancer=CANCER)

    print(f"  cohort {args.study}")
    print(f"  {len(_target_genes())} target genes")

    print("  - UniProt: protein length and domain architecture")
    uni = UniProt(http).collect(_target_genes())
    print(f"    {uni['n_genes']}/{len(_target_genes())} resolved")

    print("  - cBioPortal: recurrent protein changes with residue positions")
    hs = cb.mutation_hotspots(_target_genes())
    n_hot = sum(len(v.get("hotspots") or []) for v in hs.values())
    print(f"    {n_hot} recurrent change(s) across {len(hs)} gene(s)")

    print("  - RCSB: verifying curated PDB choices and caching renders")
    st = structures.collect(http, _pdb_choice(), PROJECT / "data" / "img",
                            refresh=args.refresh)
    print(f"    {st['n_structures']} structure(s), "
          f"{st['image_bytes_total'] // 1024} KB of images")

    print("  - curated drug pipeline, joined to ClinicalTrials.gov")
    dr = drugs_mod.collect(_pipeline_csv(), _facts("trials"), CANCER.id)
    print(f"    {dr['n_drugs']} agent(s), {dr['registry_matched']} matched to a registry record")
    if dr["unmapped_targets"]:
        print(f"    ! target label(s) with no gene mapping: {', '.join(dr['unmapped_targets'])}")

    # Alteration frequencies for the TARGET gene set specifically. Computed here
    # rather than read from breast.molecular.json, which only ever covered the
    # audit's 16 genes — reusing it would leave two thirds of the targets
    # sitting at a false 0% and make the landscape say the opposite of the truth.
    print("  - cBioPortal: alteration frequency per subtype for the target set")
    by_subtype = cb.driver_frequencies(genes=_target_genes())
    print(f"    {len(by_subtype)} subtype(s) x {len(_target_genes())} gene(s)")

    # FDA label facts per agent. Attached here rather than in a separate step
    # because a side effect belongs to a drug, and the drug records live in this
    # payload. Investigational agents simply have no label — that absence is
    # meaningful and is recorded rather than left blank. A lookup that failed is
    # recorded too: there the absence means nothing.
    print("  - openFDA: boxed warnings, named warnings and common reactions")
    lab = Labels(http).collect(dr.get("drugs") or [])
    for d in dr.get("drugs") or []:
        if lab["labels"].get(d["id"]):
            d["label"] = lab["labels"][d["id"]]
        elif d["id"] in lab["lookup_failed"]:
            d["label_lookup"] = "failed"  # the viewer must not read this as "no label"
    print(f"    {lab['n_with_label']}/{lab['n_drugs']} agent(s) have a US label · "
          f"{lab['n_boxed_warnings']} boxed warning(s) · "
          f"{lab['n_with_frequencies']} with reported frequencies")
    if lab["lookup_failed"]:
        print(f"    ! {len(lab['lookup_failed'])} lookup(s) failed, so whether they have a label "
              f"is unknown: {', '.join(lab['lookup_failed'])}")

    payload = build_targets(FACTS, uni, hs, st, dr, by_subtype=by_subtype,
                            cancer_id=CANCER.id)
    payload["labels_summary"] = {k: v for k, v in lab.items() if k != "labels"}
    # No local CSV path in the payload: all of it is copied into the public
    # data/<cancer>.targets.js. The CSV read is _pipeline_csv().

    FACTS.mkdir(parents=True, exist_ok=True)
    write_lf(_facts("targets"),
        json.dumps(payload, indent=2, ensure_ascii=False))

    stamp = time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime())
    out = write_targets_js(payload, _data("targets.js"), stamp)

    gaps = payload["gaps"]
    print()
    print("  gaps found:")
    print(f"    {len(gaps['druggable_untargeted'])} altered gene(s) with nothing against them at all")
    print(f"    {len(gaps['addressed_indirectly'])} altered gene(s) addressed only via a partner target")
    print(f"    {len(gaps['repositioning'])} cross-subtype question(s)")
    print(f"    {len(gaps['evidence_without_program'])} CIViC gene(s) with evidence but no program")
    print(f"    {len(gaps['cohort_blind_spots'])} cohort blind spot(s) "
          "(drugged target the cohort cannot see)")
    print(f"    {len(gaps['not_mutation_selected'])} target(s) selected by something other "
          "than mutation (expected, not a gap)")
    print(f"  wrote {out}")
    return 0


def cmd_literature(args) -> int:
    """The frontier: what is being published about the problems with current drugs."""
    http = Http(refresh=args.refresh)
    lit = Literature(http, cancer_id=CANCER.id, cancer_name=CANCER.name)

    print(f"  Europe PMC · {len(lit.drawbacks)} agent classes, "
          f"{len(_target_genes())} target genes, since {lit.since}")

    # gene -> the subtype nodes whose agents hit it, taken from the drug records
    # the targets step already built. This is what lets a T-DXd toxicity paper
    # appear on the HER2-positive subtype instead of only on ERBB2.
    gene_to_nodes: dict[str, list[str]] = {}
    tpath = _facts("targets")
    if tpath.exists():
        tdata = json.loads(tpath.read_text(encoding="utf-8"))
        for drug in tdata.get("drugs") or []:
            for g in drug.get("genes") or []:
                bucket = gene_to_nodes.setdefault(g, [])
                for n in drug.get("nodes") or []:
                    if n not in bucket:
                        bucket.append(n)
        print(f"  gene->subtype map from {len(tdata.get('drugs') or [])} agents: "
              f"{len(gene_to_nodes)} gene(s) linked to subtypes")
    else:
        print(f"  ! no {_facts('targets').name} — run `python run.py targets` first "
              "for subtype links; papers will still be linked to genes")

    payload = lit.collect(_target_genes(), gene_to_nodes)
    payload["cancer"] = CANCER.id
    payload["gene_to_nodes"] = gene_to_nodes

    FACTS.mkdir(parents=True, exist_ok=True)
    write_lf(_facts("literature"),
        json.dumps(payload, indent=2, ensure_ascii=False))

    stamp = time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime())
    out = write_literature_js(payload, _data("literature.js"), stamp)

    print(f"    {payload['n_papers']} papers kept from {payload['n_raw_hits']} raw hits")
    print("    by kind:    " + "  ".join(f"{k}={v}" for k, v in sorted(payload['by_kind'].items())))
    print("    by tier:    " + "  ".join(f"{k}={v}" for k, v in sorted(payload['by_tier'].items())))
    print("    by species: " + "  ".join(f"{k}={v}" for k, v in sorted(payload['by_species'].items())))

    # The two numbers most likely to be misread, called out rather than buried.
    pre = payload["by_tier"].get("preprint", 0)
    nonhuman = sum(v for k, v in payload["by_species"].items() if k != "human")
    print(f"    {pre} preprint(s) — not peer reviewed")
    print(f"    {nonhuman} paper(s) not established as human work")
    print(f"  wrote {out}")
    return 0


def cmd_attribution(args) -> int:
    """Regenerate ATTRIBUTION.md and every dataset's attribution block.

    Project-wide on purpose, so --cancer is ignored: ATTRIBUTION.md covers every
    dataset, and a per-cancer run would overwrite it with one cancer's sources.
    Each block is read off that dataset's own facts; run `emit` to embed it.
    """
    FACTS.mkdir(parents=True, exist_ok=True)
    summaries = []
    for c in cancers.REGISTRY.values():
        summ = attribution.summary(c, FACTS, PROJECT, RESEARCH)
        summaries.append(summ)
        out_json = FACTS / f"{c.id}.attribution.json"
        write_lf(out_json, json.dumps(summ, indent=2, ensure_ascii=False))
        print(f"  {c.id:11} {summ['n_sources']:>2} source(s)   wrote {out_json.name}")
        if summ["binary_redistribution"]:
            print(f"    ! content COMMITTED into this repo from: "
                  f"{', '.join(summ['binary_redistribution'])}")
        if summ["needs_verification"]:
            print(f"    ! terms NOT read for this project — verify before publishing: "
                  f"{', '.join(summ['needs_verification'])}")

    out_md = PROJECT / "ATTRIBUTION.md"
    write_lf(out_md, attribution.render_markdown(summaries))
    print(f"  wrote {out_md}")
    print("  run `emit` for each cancer to carry its block into data/<cancer>.facts.js")
    return 0


def _load_json(path: Path) -> dict | None:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


def cmd_sync(args) -> int:
    """Push computed figures back into the curated markdown.

    The only step that writes outside cancer-explorer/. `--check` reports what
    would change without touching anything, which is what you want in CI.
    """
    if _landscape_md() is None or _pipeline_csv() is None:
        return _needs_curation("landscape markdown")
    res = run_sync(
        _landscape_md(), SOURCES_MD,
        _load_json(_facts("incidence")),
        _load_json(_facts("trials")),
        _pipeline_csv(),
        write=not args.check,
    )
    for region, outcome in res["results"].items():
        print(f"    {region:26} {outcome}")
    if not res["changed"]:
        print("  markdown already current")
        return 0
    verb = "would rewrite" if args.check else "rewrote"
    for path in res["changed"]:
        print(f"  {verb} {path}")
    # --check is a staleness gate: non-zero means "the prose has drifted".
    return 1 if args.check else 0


def cmd_manual(args) -> int:
    """List the hand-edits the pipeline cannot make for you.

    Everything the pipeline can compute, it already wrote. What is left is
    curation: prose, judgement calls, and the drug rows in pipeline.csv. This
    reads the artefacts of the last run and turns them into a to-do list,
    grouped by the file you have to open. Purely a report -- it writes nothing
    and never fails the run.

    Each section runs if its own input exists. A cancer with no landscape
    markdown still has an audit and a drug CSV worth reporting on; refusing
    the whole step for want of the markdown left prostate and lung with no
    to-do list at all.
    """
    audit = _load_json(_report("json"))
    trials = _load_json(_facts("trials"))
    incidence = _load_json(_facts("incidence"))
    todo = 0
    unchecked = 0

    print(f"  data/{CANCER.dataset_js}  — curated prose and figures, never written by the pipeline")
    if audit is None:
        unchecked += 1
        print(f"    ? no reports/{_report('json').name} — run `python run.py --cancer {CANCER.id} audit` first")
    elif audit.get("cancer") not in (None, CANCER.id):
        unchecked += 1
        print(f"    ? reports/{_report('json').name} is stamped {audit['cancer']!r}, not {CANCER.id!r} — re-run audit")
    else:
        drift = [r for r in audit.get("comparisons") or []
                 if r["verdict"] in ("DIVERGENT", "CLOSE")]
        for r in sorted(drift, key=lambda r: (r["verdict"] != "DIVERGENT", -abs(r["delta"] or 0))):
            print(f"    [{r['verdict']:11}] {r['node']:14} {r['gene']:8} "
                  f"{CANCER.dataset_js}={r['hand']}%  computed={r['computed']}%  Δ{r['delta']:+.1f}")
        prev = [r for r in audit.get("prevalence") or [] if r["verdict"] != "MATCH"]
        for r in prev:
            hv = "—" if r["hand"] is None else f"{r['hand']}%"
            print(f"    [{r['verdict']:11}] {r['node']:14} prevalence  "
                  f"{CANCER.dataset_js}={hv}  SEER={r['seer']}%")
        drug = [r for r in audit.get("druggability") or []
                if r["verdict"] in ("MISSED", "UNSUPPORTED")]
        for r in drug:
            verb = "add" if r["verdict"] == "MISSED" else "re-check"
            print(f"    [{r['verdict']:11}] {r['gene']:14} {verb} druggable flag  "
                  f"(CIViC level {r['civic_best_level'] or '—'}, {r['civic_items']} items)")
        todo += len(drift) + len(prev) + len(drug)
        if not (drift or prev or drug):
            print("    nothing to reconcile — hand figures agree with computed ones")

    csv_path = _pipeline_csv()
    if csv_path is None:
        print(f"\n  (no drug CSV declared for {CANCER.id} in cxp/cancers.py — trial checks do not apply)")
    else:
        print(f"\n  {csv_path.relative_to(RESEARCH.parent).as_posix()}  — hand-maintained drug × indication rows")
        if trials is None:
            unchecked += 1
            print(f"    ? no facts/{CANCER.id}.trials.json — run `python run.py --cancer {CANCER.id} trials` first")
        else:
            rows = list(trials["trials"].values())
            bad = [t for t in rows if t.get("error")]
            dead = [t for t in rows if (t.get("overall_status") or "") in DEAD_TRIAL_STATUS]
            stale = [t for t in rows if t.get("overall_status") == "UNKNOWN"]
            for t in bad:
                print(f"    [{'BAD ID':11}] {t['nct_id']}  not resolvable — fix the nct_id column")
            for t in dead:
                print(f"    [{t['overall_status']:11}] {t['nct_id']}  {str(t.get('brief_title'))[:44]}")
            for t in stale:
                print(f"    [{'UNKNOWN':11}] {t['nct_id']}  sponsor stopped updating — verify by hand")
            todo += len(bad) + len(dead) + len(stale)
            if not (bad or dead or stale):
                print(f"    all {len(rows)} trials resolve and none are terminated or stale")

    if _landscape_md() is None:
        print(f"\n  (no landscape markdown declared for {CANCER.id} — inline-prose check does not apply)")
    else:
        print(f"\n  {_landscape_md().name} + {SOURCES_MD.name}  — inline prose, not owned by `sync`")
        if incidence is None:
            unchecked += 1
            print(f"    ? no facts/{CANCER.id}.incidence.json — run `python run.py --cancer {CANCER.id} incidence` first")
        else:
            drifted = []
            for path in (_landscape_md(), SOURCES_MD):
                if not path.exists():
                    unchecked += 1
                    print(f"    ? {path} not found")
                    continue
                for r in stale_prose(path.read_text(encoding="utf-8", errors="replace"), incidence):
                    drifted.append((path.name, r))
            for name, r in drifted:
                found = ", ".join(f"{v}%" for v in r["found"])
                print(f"    [{'STALE':11}] {name}:{r['line']}  {r['subtype']:10} {r['where']} "
                      f"says {found}, registry says {r['current']}%")
            todo += len(drifted)
            if not drifted:
                print(f"    inline figures agree with the registry ({incidence['period']});")
                print(f"    the tables themselves are machine-owned — see `run.py sync`")

    print(f"\n  index.html  — static shell, hand-edited; nothing generates it")
    overlay = _data("facts.js")
    index = PROJECT / "index.html"
    index_text = index.read_text(encoding="utf-8", errors="replace") if index.exists() else ""
    if overlay.exists() and overlay.name not in index_text:
        todo += 1
        print(f"    [{'NOT LOADED':11}] data/{overlay.name} is emitted but index.html "
              f"never loads it —")
        print(f"                  every computed number is currently invisible to the viewer")
    print(f"    adding a new cancer needs one <script src=\"data/<cancer>.js\"> line")

    summary = f"{todo} item(s) needing a human." if todo else "Nothing needs a human."
    if unchecked:
        summary += f"  ({unchecked} check(s) skipped — see ? lines above.)"
    print(f"\n  {summary}")
    return 0


def cmd_all(args) -> int:
    """Every external source is non-fatal: one flaky endpoint must not
    invalidate an otherwise good run. Only audit and emit gate the exit code --
    and a source that answers 410 Gone, which is no flake: the API it was written
    against is retired, and every later run would keep stale facts while exiting 0
    (GWAS Catalog's legacy REST API, found 2026-10-17)."""
    rc = 0
    steps = [
        ("molecular", cmd_molecular),
        ("incidence", cmd_incidence),
        ("oncotree", cmd_oncotree),
        ("civic", cmd_civic),
        ("gwas", cmd_gwas),
        ("survival", cmd_survival),
        ("trials", cmd_trials),
        # after trials, because it joins pipeline.csv to the registry records
        ("targets", cmd_targets),
        # after targets, because it queries the same gene list
        ("literature", cmd_literature),
    ]
    failed, gone = [], []
    total = len(steps) + 4
    for i, (name, fn) in enumerate(steps, 1):
        print(f"[{i}/{total}] {name}")
        try:
            fn(args)
        except Exception as exc:  # noqa: BLE001
            failed.append(name)
            print(f"  ! {name} failed ({type(exc).__name__}: {str(exc)[:120]})")
            if getattr(getattr(exc, "response", None), "status_code", None) == 410:
                gone.append(name)

    print(f"[{total - 3}/{total}] audit")
    rc |= cmd_audit(args)
    print(f"[{total - 2}/{total}] emit")
    rc |= cmd_emit(args)
    # sync writes to the curated markdown, so it runs with --check off here but
    # must never gate the run: a prose rewrite failing is not a data failure.
    print(f"[{total - 1}/{total}] sync — computed figures back into the markdown")
    sync_args = argparse.Namespace(**{**vars(args), "check": False})
    cmd_sync(sync_args)
    print(f"[{total}/{total}] manual — what the pipeline cannot do for you")
    cmd_manual(args)

    if failed:
        print(f"\n  sources that failed (facts left stale): {', '.join(failed)}")
    if gone:
        print(f"  ! retired upstream (HTTP 410), so the client needs porting: {', '.join(gone)}")
        rc |= 1
    return rc


def main() -> int:
    p = argparse.ArgumentParser(description="Cancer Explorer data pipeline")
    p.add_argument("-v", "--verbose", action="store_true")
    p.add_argument("--refresh", action="store_true", help="bypass the HTTP cache")
    p.add_argument("--cancer", default=cancers.DEFAULT, choices=cancers.ids(),
                   help=f"which dataset to build (default {cancers.DEFAULT})")
    p.add_argument("--study", default=None,
                   help="cBioPortal study id; defaults to the cancer's own cohort")
    p.add_argument("--csv", help="path to pipeline.csv for trial ids")
    sub = p.add_subparsers(dest="cmd", required=True)
    parsers = {}
    for name, fn in [("keys", cmd_keys), ("molecular", cmd_molecular), ("incidence", cmd_incidence),
                     ("oncotree", cmd_oncotree), ("civic", cmd_civic),
                     ("gwas", cmd_gwas), ("survival", cmd_survival),
                     ("trials", cmd_trials), ("audit", cmd_audit), ("references", cmd_references),
                     ("emit", cmd_emit),
                     ("targets", cmd_targets), ("literature", cmd_literature),
                     ("attribution", cmd_attribution),
                     ("sync", cmd_sync), ("manual", cmd_manual), ("all", cmd_all)]:
        sp = sub.add_parser(name)
        sp.set_defaults(func=fn, check=False)
        parsers[name] = sp
    parsers["sync"].add_argument("--check", action="store_true",
                                 help="report drift without writing (exit 1 if stale)")

    # A default Windows console is cp1252 and cannot encode the characters
    # this CLI prints (delta, arrows, en-dashes). Reconfigure rather than
    # avoid them: the alternative is a UnicodeEncodeError traceback in the
    # middle of an otherwise successful run.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass

    args = p.parse_args()
    global CANCER
    CANCER = cancers.get(args.cancer)
    # --study is an override, not a default: leaving it unset must follow
    # --cancer rather than silently pinning every cancer to breast's cohort.
    if not args.study:
        args.study = CANCER.study
    _log(args.verbose)
    config.load_env()          # seed credentials before any fetch
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
