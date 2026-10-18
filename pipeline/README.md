# Cancer Explorer pipeline

Makes the data layer **reproducible**. The viewer's `data/breast.js` was
originally hand-written and hand-verified, which meant re-checking it in three
months would mean redoing that work. This turns the deterministic half into
something you re-run, and turns "is my data stale?" into a diff.

```bash
pip install -r requirements.txt

python run.py molecular    # driver frequencies + the concordance matrix (cBioPortal)
python run.py incidence    # subtype shares + 5-yr survival (SEER, no key needed)
python run.py trials       # refresh trial phase/status from ClinicalTrials.gov
python run.py targets      # domains, hotspots, structures, drugs, gaps -> data/<cancer>.targets.js
python run.py literature   # papers per agent (Europe PMC) -> data/<cancer>.literature.js
python run.py audit        # diff computed facts against hand-written data/<cancer>.js
python run.py emit         # write data/<cancer>.facts.js
python run.py keys         # credential status + where to register + live probe
python run.py sync         # write computed figures back into the markdown
python run.py sync --check # ...or just report drift, exit 1 if stale
python run.py manual       # what is left for a human, grouped by file
python run.py all
python run.py --refresh all   # ignore the HTTP cache (a global flag: before the step)

python run.py --cancer prostate molecular   # ...any of the above, for a second cancer
```

## Which cancer

Every path, cohort, URL and disease string is declared in **`cxp/cancers.py`**
and selected with `--cancer` (default `breast`). Nothing in `cxp/` names a
cancer any more, so a run cannot write `prostate.molecular.json` out of breast's
cohort.

The field that matters most is `subtype_to_node`: the map from a cohort's own
subtype labels to node ids in `data/<cancer>.js`. The pipeline writes those ids
into the overlay and the viewer merges by id, so a wrong id raises nothing — it
silently drops every computed figure for that subtype. `molecular` logs a
warning for any cohort label the map does not cover.

Adding a cancer means adding a `Cancer(...)` to that file. It does not mean
editing anything in `cxp/`.

**Where a cancer has no source, the step says so rather than failing or
returning an empty success.** Prostate has no SEER subtypes page (there is no
`prost-subtypes.html`, and the NCCN risk-group field is behind a data-use
agreement), so `incidence` prints why and still writes the whole-disease
figures. `targets` refuses outright until a curated drug CSV exists. `oncotree`
emits the tissue catalogue to pick codes from and warns that nothing is coded
yet.

## End to end

`run.py all` is the whole flow, in dependency order: the ten source steps
write `facts/<cancer>.*.json` (`targets` and `literature` also write their own
overlays), `audit` diffs the facts against the curated `data/<cancer>.js`,
`emit` writes `data/<cancer>.facts.js`, `sync` pushes registry figures back into
the markdown in `cancer_research/` (breast only — no other cancer declares a
landscape document, and the step says so), and `manual` prints what a human
still has to do. Source steps are non-fatal — one flaky endpoint leaves its facts file
stale rather than failing the run — so only `audit` and `emit` gate the exit
code, with one exception: a source that answers **410 Gone** fails the run.
A 410 is not flakiness but an API retired upstream, and its stale facts file
would otherwise ship forever (the GWAS Catalog's v1 API went that way in
2026; every September file came from it). The client needs porting; re-running
will not help.

`audit` fails on any row outside the passing verdicts unless a waiver in
`cxp/cancers.py` names that row and that verdict, and it also fails on a
**stale waiver** — one whose row now passes or no longer exists. A waiver that
outlives its row would let the next regression through unseen, so it is
deleted, not kept "just in case".

```
cancer_research/<cancer csv> ──► trials ──┐
cBioPortal · SEER · CIViC · GWAS ·        ├──► facts/*.json ──► audit ──► reports/<cancer>.audit.*
OncoTree · ClinicalTrials.gov ────────────┘          │
                                                     ├──► emit ──► data/<cancer>.facts.js ──► index.html
                                                     └──► sync ──► cancer_research/*.md
```

`sync` is the only step that writes outside `cancer-explorer/`, and it is the
only reason the arrow ever points back at `cancer_research/`.

### `run.py sync`

Regenerates machine-owned regions of `breast-cancer-landscape.md` and
`SOURCES.md`. It owns exactly three things and nothing else:

| Region | How it is claimed |
|---|---|
| SEER subtype table (§2) | `<!-- pipeline:seer-table -->` … `<!-- /pipeline:seer-table -->` |
| Trial status appendix (§9) | `<!-- pipeline:trial-status -->` … `<!-- /pipeline:trial-status -->` |
| The SEER claim row in `SOURCES.md`, and the SEER period wherever it is spelled out | anchored substitution on a fixed label |

Anything typed inside a marked block is overwritten on the next run — the
marker comment says so in the document itself. Prose outside those regions is
never touched: a regex that rewrites numbers in running text cannot tell
"70.1% of cases" from "a 70.1% response rate", so `manual` reports that prose
instead and a human edits it.

The table generator reproduces the original hand-written table byte for byte,
which is the check that it is formatting the same thing the author intended
rather than something new that merely happens to parse.

Use `--check` in CI: it reports what would change and exits 1 if the markdown
has drifted from the facts.

Nothing generates `index.html`; it is a static shell.

### `run.py manual`

Reads the artefacts the run just produced and turns them into a to-do list.
It writes nothing, never fails, and reports four places a human has to act.
Each section runs when its own input exists: a cancer with no landscape
markdown still gets its audit and trial checks, and says which section does
not apply rather than refusing the whole report.

| File | Flagged when |
|---|---|
| `data/<cancer>.js` | rows in `reports/<cancer>.audit.json` come back `DIVERGENT`/`CLOSE`, prevalence disagrees with SEER, or CIViC evidence contradicts a `druggable` flag (`MISSED`/`UNSUPPORTED`) |
| `../../cancer_research/<cancer csv>` | an NCT id will not resolve, or a trial is `TERMINATED`/`WITHDRAWN`/`SUSPENDED`, or its record is `UNKNOWN` because the sponsor stopped updating it |
| `breast-cancer-landscape.md`, `SOURCES.md` | an inline figure outside the generated blocks contradicts the registry (breast only) |
| `index.html` | `data/<cancer>.facts.js` is emitted but no `<script>` tag loads it |

Reports are per cancer for the same reason facts are. A single
`reports/audit.json` used to be overwritten by whichever cancer ran last, and
`manual` would then print lung's drift under breast's file name. The report
also carries a `cancer` stamp, and `manual` refuses one stamped for another
cancer.

The prose check runs on what `sync` does *not* own, and is tuned for precision
over recall — a false positive sends someone to edit a sentence that was fine,
which is worse than a miss. It fires on two patterns only: `"<n>% of cases"`
attributed to the nearest subtype named before it, and a heading whose subject
is a subtype (`### 5.4 Triple-negative (10.8%)`). Attribution is by proximity
because a sentence often names a second subtype in passing — "…less
endocrine-sensitive than HR+/HER2− disease" must not claim the figure earlier
in that same sentence.

It cannot tell you the sentence around a number is still *true*. It tells you
the number disagrees with the registry, which is the half that rots silently.

## Credentials

**None are required.** cBioPortal, ClinicalTrials.gov and SEER's published
statistics are all open. Two entries in the registry deserve specific
explanation, because both look like blockers and neither is:

**NCI SEER — the API is gated, the statistics are not.** `api.seer.cancer.gov`
requires a government-authorised Login.gov account that most users cannot
obtain. We do not depend on it. `cxp/seer.py` parses
`seer.cancer.gov/statfacts/html/breast-subtypes.html`, which serves the same
registry figures as machine-readable HTML with no key. `run.py incidence`
works out of the box.

This is scraping, so the parser is defensive: it raises on a changed layout
rather than silently emitting nothing, and `run.py all` treats a SEER failure
as non-fatal so one restyled page cannot break the whole run.

```bash
cp .env.example .env      # fill in what you have
python run.py keys        # status + where to register + live probe of each
```

`run.py keys` reports each credential as SET or missing, prints the exact
registration URL and how the key is transmitted, and — for any key you have
set — makes a real call to confirm it works.

| Service | Env var | Needed? | Passed as |
|---|---|---|---|
| NCI SEER | `SEER_API_KEY` | **No** — published tables used instead | `X-SEERAPI-Key` header |
| NCBI E-utilities | `NCBI_API_KEY` | Optional — raises 3→10 req/sec | `api_key` param |
| openFDA | `OPENFDA_API_KEY` | Optional — raises 1k→120k req/day | `api_key` param |
| OncoKB | `ONCOKB_TOKEN` | Optional, licence required | `Authorization: Bearer` |

The OncoKB entry is **unverified** — oncokb.org is a JS app the doc fetcher
could not render, so confirm its current terms yourself before relying on it.

**Secret hygiene.** `.env` is gitignored. Credentials are injected per host at
request time, deliberately excluded from the HTTP cache key (so rotating a key
does not invalidate the cache) and stripped from the cached response envelope
(so no key is ever written to disk).

## The one design rule

**Machine-derived facts and human judgement live in separate files and are
merged, never interleaved.**

| Directory | Owner | Re-run behaviour |
|---|---|---|
| `cache/` | the pipeline | content-addressed raw responses; safe to delete |
| `facts/` | the pipeline | overwritten freely |
| `reports/` | the pipeline | overwritten freely |
| `../data/<cancer>.js` | **a human** | **never written by the pipeline** |

`emit` writes `data/<cancer>.facts.js`, a *separate* overlay keyed by node id —
not a rewrite of `<cancer>.js`. The curated file holds prose, trigger causes,
evidence grades and relationship framing that no API produces; regenerating it
from a fetch would destroy the expensive half of the work. Keeping them apart
is also what stops an assertion from being laundered into looking like a
fetched fact.

`index.html` loads every overlay beside its curated file — `<cancer>.facts.js`,
`<cancer>.targets.js`, `<cancer>.literature.js` — and `js/facts.js` merges the
first by node id at boot (`window.CancerExplorerFacts.<cancer>`). A new cancer
needs those script tags added by hand; `manual` flags an emitted overlay that no
tag loads.

## What is actually computed

### Driver frequencies

Queried from cBioPortal against **`brca_tcga_pub`** — deliberately, because
that *is* the TCGA Nature 2012 cohort (n=825) the published figures describe,
and it carries `PAM50_SUBTYPE` plus `ER/PR/HER2_STATUS`. Auditing against
PanCanAtlas (n=1084) would manufacture differences that are really just a
different cohort.

Four metrics per gene per subtype, each with numerator and denominator:
`mutation`, `amplification`, `deep_deletion`, and `any_loss` (deep + hemizygous).

That last distinction matters more than it looks. Published "PTEN loss ~35%"
figures include hemizygous loss; deep deletions alone are ~5%. Comparing the
wrong pair produces a 30-point phantom discrepancy.

### Cohort nodes — several studies, one axis

`driver_frequencies` splits **one** study by a subtype attribute. `cohort_nodes`
is the other shape: several **whole** studies, each pinned to one node id.

It exists because a disease-state axis cannot be built any other way. The
treated disease is a different cohort, not a subtype of the untreated one, so no
per-subtype split of a primary-tumour study can show what happens after therapy.
Prostate declares three:

| node | study | patients (samples) |
|---|---|--:|
| `state-confined` | `prad_tcga_pub` — primary, treatment-naive | 333 (333) |
| `state-crpc-adeno` | `prad_su2c_2019` — metastatic castration-resistant | 429 (444) |
| `state-nepc` | `nepc_wcm_2016` — neuroendocrine | 81 (114) |

Same gene panel, same metrics, same record shape — so the emitter and the
viewer need no new vocabulary. What they gain is a comparison the site could not
previously make:

| | primary | castration-resistant |
|---|--:|--:|
| AR amplification | 0.9% | **48.7%** |
| TP53 mutation | 6.9% | 37.1% |
| PTEN deep deletion | 15.0% | 25.9% |
| RB1 deep deletion | 0.3% | 9.8% |
| HRR mutation *(the PARP-eligible fraction)* | 9.3% | **22.1%** |
| SPOP mutation | 11.1% | 5.8% |

These were 48.9 / 36.7 / 25.7 / 9.7 / 22.5 / 5.6 until the pipeline began
counting one sample per patient (see below). The neuroendocrine study moved
most: its RB1 mutation rate fell from 7.0% (8/114 samples) to 2.5% (2/81 men),
because the same two men's mutations had been counted in eight samples.

A cohort node can also be a **slice** of a study: `sample_filter` keeps samples
whose clinical attributes take the listed values, and `requires` keeps tumours
carrying any of the listed alleles. Lung uses the first to put TCGA's pan-lung
adenocarcinomas and squamous carcinomas on separate histology nodes, and phase 6
uses both to split one study before and after targeted therapy.

A slice filters first and then keeps one sample per patient, which is right for
a slice that stands alone. Nodes that **partition** one study's patients need
the opposite order, and `sample_scope` gives it: each patient's one sample is
chosen within the scope first, and `sample_filter` then decides which node it
lands on. Melanoma forced it. Its pathway nodes slice `msk_impact_50k_2026` by
OncoTree code, and on 2026-09-14 eight patients had melanoma samples filed under
two pathways; filtering first counted skin 1,088, uveal 140 and unknown primary
176, a total of 1,705 from 1,697 patients. Choosing first gives 1,082 / 98 / 203
/ 139 / 175, one node per patient. Nodes without a scope count exactly as before.

A curated node can quote a cohort computed for **another** node: prostate's
whole-disease `mol-root` quotes the TCGA cohort computed whole for
`state-confined`, and `state-crpc` the SU2C cohort computed for
`state-crpc-adeno`, as each node's caveat says. The audit compares figures node
by node, so those twelve had no audit row until 2026-10-17. `audit_against` maps
such a node to the cohort it quotes, and the audit then diffs it under the same
bands and gate as any other (each row's note names the cohort). A name that does
not resolve raises; `tests/test_audit_against.py` also fails if the written
report has no row for a declared node. Prostate now compares all 27 of its
driver figures; all twelve new rows sit within 0.5 points.

**Each cohort node carries its own `cohort` block**, and `js/facts.js` prefers it
over the overlay-level one. Without that, the castration-resistant card would
show SU2C's numbers under TCGA's name — every figure misattributed, and nothing
on the page saying so.

Watch the denominators: the neuroendocrine study has **0 CNA-profiled samples**,
so its amplification and deletion figures are *absent*, not zero. The viewer
prints `n=81 (81 sequenced, 0 CNA-profiled)` so a reader can see the
difference.

**Breast declares two**, and the second is a slice for a reason worth copying:

| node | study | patients |
|---|---|--:|
| `state-early` | `brca_tcga_pub` — primary tumours | 825 (507 sequenced) |
| `state-metastatic` | `breast_msk_2018`, `SAMPLE_TYPE = Metastasis` | 905 |

| mutation | primary | metastatic |
|---|--:|--:|
| ESR1 | 0.4% | **13.0%** |
| ERBB2 | 1.4% | 5.4% |
| TP53 | 37.5% | 39.0% |
| PIK3CA | 35.3% | 35.9% |

Razavi 2018 sequenced primary tumours as well as metastases, so the whole study
reads ESR1 7.5% (131/1756) — a blend. Slicing it also supplies the control a
cross-cohort comparison lacks: the same study's own primaries, on the same panel,
read 2.1% (19/893). Restricted to `HR_STATUS = Positive`, primaries read 2.4%
(19/777) and metastases 16.7% (112/672). TP53 is the subtype-mix check — it is
mutated far more often in ER-negative disease, so a cohort skewed either way
would move it, and it does not.

Two further slices were counted and deliberately **not** made into nodes.
Splitting the MSK metastases by `STAGE_AT_DIAGNOSIS` barely separates ESR1
(stage IV 11.9%, 24/202; stages I–III 13.2%, 91/690), because stage at diagnosis
says nothing about treatment before the biopsy. And an unrelated cohort,
`brca_mbcproject_2022`, shows the same step split by `CALC_TREATMENT_NAIVE`:
2.0% (3/147) before any treatment, 16.8% (20/119) after — quoted in
`data/breast.js` as independent replication. Copy-number figures do **not**
compare across the two breast nodes: TCGA called them from SNP arrays and MSK
from a targeted panel.

**Contrasts — the controls regenerate too.** Every slice in the two paragraphs
above is declared as a `Contrast` on the `state-metastatic` cohort node in
`cancers.py`, with its full filter (not added to the node's own — the control
for a metastasis slice is a primary slice). `run.py molecular` counts them with
`whole_cohort_frequencies`, one sample per patient, and `emit` writes them into
the overlay as `nodes[<id>].contrasts`. The viewer does not read them yet; they
exist so the prose can be checked. `run.py audit` finds every "X% (n of N)" on a
cohort node in `data/<cancer>.js` and matches it against the node's figures and
its contrasts: MATCH, PCT WRONG (the count exists, the percentage was mistyped),
or UNTRACED (no slice with that numerator and denominator — declare one, or cite
the figure to a publication). Breast: 4/4 match. A contrast may also name another
on the same node as its `of`, and is then counted as a share of it in patients —
colorectal's early-onset controls ("31.3% (256 of 817)" of patients diagnosed before
50 had a rectal primary) are counts of people, not of a gene, and are checked this way.

| contrast | filter | ESR1 |
|---|---|--:|
| `msk-primary` | `SAMPLE_TYPE = Primary` | 2.1% (19/893) |
| `msk-primary-hr-pos` | … `; HR_STATUS = Positive` | 2.4% (19/777) |
| `msk-metastasis-hr-pos` | `SAMPLE_TYPE = Metastasis; HR_STATUS = Positive` | 16.7% (112/672) |
| `msk-metastasis-stage-iv` | … `; STAGE_AT_DIAGNOSIS = IV` | 11.9% (24/202) |
| `msk-metastasis-stage-i-iii` | … `; STAGE_AT_DIAGNOSIS = IA–IIIC` | 13.2% (91/690) |
| `mbcproject-naive` | `brca_mbcproject_2022`, `CALC_TREATMENT_NAIVE = YES` | 2.0% (3/147) |
| `mbcproject-treated` | `brca_mbcproject_2022`, `CALC_TREATMENT_NAIVE = NO` | 16.8% (20/119) |

The check reads only the "(n of N)" form. A figure written as a bare percentage
("13.0% of metastatic biopsies") is not matched, so write controls with their
counts.

### Three counting rules lung forced

Each was satisfied by the TCGA cohorts breast and prostate started from, but
only by accident, and a regenerated breast overlay is byte-identical under all
three.

- **One sample per patient.** `lung_msk_2017` has 915 samples from 860 patients;
  `nepc_wcm_2016` has 114 from 81. Every count — subtype split, whole cohort,
  concordance, survival — keeps one sample per patient: the first by sample id,
  preferring one that was actually profiled.
- **Fusions are a fifth metric.** `fusion` counts samples with a structural
  variant touching the gene at either breakpoint, from the study's
  `STRUCTURAL_VARIANT` profile. Without it ALK, ROS1 and RET read ~0% in the
  classes they define, and prostate's ERG fusion read as a 58.6% copy-number
  *loss*. It counts rearrangements, not only in-frame fusions — the same
  definition cBioPortal's own frequency uses.
- **A gene not on the panel was not tested.** MSK tumours were sequenced on
  IMPACT341 and IMPACT410. Each gene's denominator is restricted to samples
  whose panel covers it; a gene on no panel gets no figure and a logged warning
  rather than a false 0%. Whole-exome studies carry no panel and are unaffected.

Named **alleles** (`Allele` in `cancers.py`) are counted from the mutation calls
the same way: `KRAS G12C`, `EGFR L858R`, `EGFR exon 19 deletion` (in-frame
deletions at codons 729–761), `EGFR T790M`. They appear in the overlay as
mutation-only rows beside the genes, because a drug is selected by the change
and not by the gene.

A `combos` entry whose members are all allele labels is a union of changes, not
of genes, and stays mutation-only like its members: melanoma's `GNAQ or GNA11
Q209/R183` is one fact about uveal melanoma spread over two genes. A gene union
(BRCA1/2, HRR, MMR) keeps its copy-number and fusion entries as before.

A **derived classifier** (`Classifier` in `cancers.py`, `classify()` in
`cbioportal.py`) builds the subtype split when no cohort ships the label.
Colorectal forced it: nothing records "BRAF V600E" or "RAS wild type" as a class.
Rules are tried in decision order, and each names the evidence that puts a
tumour in its class: an attribute value, an `Allele`, or an amplification. The
last rule has no evidence and takes the remainder. **A tumour is never assigned
a later class because an earlier test could not be read.** If a gene is off its
panel, it has no copy-number profile, or its attribute value is not listed as a
`negative`, it stops unclassified. Otherwise every untested tumour would land in
wild type, the class defined by nothing being found. `subtype_excluded` names
classes kept off every node on purpose (colorectal's MSI-H and POLE tumours),
and the whole split, excluded classes included, is emitted as `classification`.

For colorectal (`crc_msk_2017`, 2026-09-13) the classifier labels all 1,099
patients, with none unreadable, and matches the plan's independent probe class
for class. The RAS class follows the panitumumab label: KRAS and NRAS exons 2–4
(codons 12, 13, 59, 61, 117, 146), with HRAS left out. Leaving HRAS out moves no
count, because both HRAS calls at those codons are in MSI-H tumours, which are
classified first.

### Concordance — two classifications, cross-tabulated

The headline value-add: the hand-written dataset *asserted* "~80% overlap"
between TNBC and basal-like. This measures it, with an *n*.

The rows come from a clinical attribute, or (colorectal) from the derived
classifier, so a matrix row and an axis node cannot disagree about a tumour. The columns come either from
another attribute — prostate reads a Gleason category straight off the record —
or from a **derivation**, because breast's receptor class is not stored
anywhere: it is composed from three separate stains, any of which can come back
equivocal. Derivations are logic and live in `cbioportal.py`; `cancers.py` names
the one to use.

#### breast — `brca_tcga_pub`, 496 classifiable samples

| | Measured |
|---|--:|
| Basal-like that is TNBC | 82.6% (76/92) |
| TNBC that is basal-like | 86.4% (76/88) |
| HER2+/HR− that is HER2-enriched | **100% (19/19)** |
| HER2-enriched that is HER2+/HR− | **35.8% (19/53)** |

That last pair is the interesting one and it corrected the dataset. The
relationship is strongly *asymmetric*: every HER2+/HR− tumour is PAM50
HER2-enriched, but only about a third of HER2-enriched tumours are HER2+/HR−.
The dataset originally described it as "strong but imperfect" in both
directions, which the data does not support.

#### prostate — `prad_tcga_pub`, all 333 samples

Molecular class against Gleason pattern at prostatectomy. Every patient in this
cohort has both, so there is nothing to exclude — the denominator is the whole
study.

| | 3+3 | 3+4 | 4+3 | ≥8 | total |
|---|--:|--:|--:|--:|--:|
| ERG fusion | 27 | 47 | 41 | 37 | 152 |
| ETV1 fusion | 3 | 10 | 7 | 8 | 28 |
| ETV4 fusion | 2 | 3 | 5 | 4 | 14 |
| FLI1 fusion | 3 | 0 | 0 | 1 | 4 |
| SPOP mutant | 6 | 6 | 8 | 17 | 37 |
| FOXA1 mutant | 0 | 4 | 0 | 5 | 9 |
| IDH1 mutant | 1 | 2 | 0 | 0 | 3 |
| Unclassified | 23 | 30 | 17 | 16 | 86 |
| **total** | **65** | **102** | **78** | **88** | **333** |

The cohort's grade split is 19.5 / 30.6 / 23.4 / 26.4%. **ERG-fused tumours
track it almost exactly** (17.8 / 30.9 / 27.0 / 24.3) — knowing a tumour is
ERG-fused tells you nothing about its grade, which is the prostate version of
the point the breast matrix makes. SPOP sits higher (45.9% at ≥8) and the
unclassified group lower.

Read it as a **prostatectomy** cohort: it under-represents the low-grade disease
that never reaches surgery, which is why the block carries a `note` saying so.

#### colorectal — `crc_msk_2017`, 1,085 patients with a recorded side

The derived driver class against the side of the primary tumour. The study
records side as Left or Right only, and files its rectal primaries under Left,
so that column is left colon plus rectum. 14 of the 1,099 patients have no side
recorded.

| | Left colon or rectum | Right colon | total |
|---|--:|--:|--:|
| MSI-H | 29 | 66 | 95 |
| POLE ultramutated | 3 | 5 | 8 |
| BRAF V600E | 22 | 28 | 50 |
| KRAS G12C | 22 | 8 | 30 |
| Other KRAS/NRAS | 272 | 159 | 431 |
| HER2 amplified | 24 | 2 | 26 |
| RAS/BRAF wild type | 387 | 58 | 445 |
| **total** | **759** | **326** | **1,085** |

**51.0% of left-sided or rectal tumours are RAS/BRAF wild type (387/759),
against 17.8% of right-sided ones (58/326).** In metastatic disease, that split
decides whether an anti-EGFR antibody is an option. 69.5% of MSI-H tumours are
right-sided (66/95), and 24 of the 26 HER2-amplified tumours are on the left.
The MSI-H and POLE rows stay in the matrix even though the driver axis leaves
them out. Removing them would shift both column denominators.

### Subtype incidence and survival (SEER)

Parsed from the published Cancer Stat Facts tables — **SEER 21, 2019–2023**:

| Subtype | % of cases | rate/100k | 5-yr relative survival |
|---|--:|--:|--:|
| HR+/HER2− | 70.1 | 92.9 | 95.8% |
| HR−/HER2− (TNBC) | 10.8 | 14.3 | 78.7% |
| HR+/HER2+ | 9.3 | 12.3 | 92.2% |
| HR−/HER2+ | 4.0 | 5.3 | 87.0% |
| Unknown status | 5.5 | 7.3 | — |

This replaced hand-estimated shares in `data/breast.js`. The TNBC figure had
been carried at 15% — inflated by about 40% relative to the registry. The
audit now diffs every node against this table, so the same drift gets caught
mechanically rather than by someone noticing.

The unknown-status row is kept as a real node rather than normalised away: it
is larger than the entire HER2+/HR− group, and it measures how complete
receptor testing actually is.

### Canonical codes — OncoTree

`run.py oncotree` maps nodes to OncoTree codes (`IDC`, `ILC`, `DCIS`, `MBC`),
the identifiers cBioPortal and much of the field already use. The mapping is an
explicit dict in `cxp/oncotree.py`, never a fuzzy string match — that is how
"Invasive Breast Carcinoma" quietly becomes "Breast Invasive Carcinosarcoma".

WHO ICD-11 codes were carried until 2026-10-17 (`run.py icd`, breast and lung)
and are dropped. The classification is licensed CC BY-ND 3.0 IGO with WHO's
own clarifications (https://icd.who.int/en/docs/icd11-license.pdf), and §1.2.4
of those reads: "Mapping or producing crosswalks between other classifications
and terminologies and Classifications and producing translations are not
covered by the Classifications License and are subject to a separate written
agreement from WHO." A table from this project's nodes to ICD codes is such a
map. OncoTree codes the same histology nodes with no such clause, so the codes
went rather than the question. The step, its keyword gate (ICD-11 search always
returns *something*, so a hit without a distinguishing keyword was withheld)
and the WHO token exchange are in the history before the removal, if a written
agreement ever makes them worth restoring.

### CIViC — evidence levels, and an audit of judgement

`run.py civic` pages through all 507 breast evidence items (refreshed 2026-10-17). Each carries a
formal level (A–E), a PMID and a review status.

**Only accepted evidence sets a level.** CIViC lists new evidence as submitted
until an editor accepts it ("Curation is listed as a “Submitted” (i.e., pending)
until it is accepted by an Editor",
https://civic.readthedocs.io/en/latest/curating/evidence.html). Until 2026-10-17
the pipeline ranked every item, so one pending item could set a gene's level:
lung KEAP1 read level A from a single submitted item, and its accepted evidence
reaches B. `best_level` and `best_predictive_level` now count ACCEPTED items;
when pending items reach higher, `best_level_submitted` names that level beside
it, and the page shows it as "B pending review", never in the level's place.
REJECTED items set nothing. 326 of breast's 507 items are accepted, and 37 of its
95 genes have a higher level held only by pending items.

This powers the most interesting check in `reports/breast.audit.md`: **druggability vs
CIViC**. `druggable: true` in `data/breast.js` was assigned by hand; CIViC has
PMID-cited evidence. Current tally (2026-10-17): **AGREED 12, SUPPORTED 8,
UNSUPPORTED 4, REVIEWED 3**. Three of the four UNSUPPORTED rows (CD274, EGFR,
TACSTD2) have predictive evidence in CIViC, but none of it is accepted yet; the
audit row says which level the pending items reach.

The concepts are close but not identical, and the report says so: CIViC
"PREDICTIVE" includes predicting **non**-response (RB1 loss and CDK4/6
inhibitors), whereas `druggable` means the gene is itself a target. A MISSED row
is a prompt to look, not a defect.

Gene labels are normalised before comparison — `CD274 (PD-L1)` → `CD274`,
`BRCA1/2` → strongest of BRCA1/BRCA2. Skipping that step produced four false
UNSUPPORTED rows, which is how an audit teaches people to ignore it.

### GWAS Catalog — polygenic risk, kept separate on purpose

`run.py gwas` pulls 2,094 breast associations (2026-10-17, through the REST v2
API; the September v1 run returned the same 2,094, the July run 2,178 — the cause
of that drop was not investigated), keeps the 1,156 that are genome-wide
significant (p < 5e-8), and reports the top 50 **by effect size** rather than by
p-value — with a large cohort, significance is cheap and effect size is what a
reader should weigh. Ties break on the association id, so the list does not
depend on the order the API pages arrive in.

The v1 API answers 410 Gone since 2026; `cxp/gwas.py` documents the two v2
behaviours it depends on (a fuzzy trait search, so the exact name is required;
`show_child_traits=false`, so a trait's count matches v1's). It reads every
page and fails if the count differs from what the API reports, where v1 stopped
silently at six pages. Author-reported genes now live on each association's
loci and are fetched for the top 50 only.

These are **not** merged into `triggers`, and must not be. An odds ratio of 1.6
for a common variant is a categorically different statement from BRCA1's 55–72%
lifetime penetrance: a relative shift in population risk versus an individual's
probability. The overlay keeps them in a separate `polygenic` block, and its
`interpretation` text says so in words that fit any cancer (until 2026-10-17 it
named BRCA1 in all five files).

### Survival — cohort choice is the whole game

`run.py survival` computes median overall survival per subtype, and demonstrates
why the cohort matters more than the code:

| Subtype (METABRIC) | n | deaths | median OS |
|---|--:|--:|--:|
| Basal | 209 | 115 | 36.4 mo |
| HER2-enriched | 224 | 157 | 65.1 mo |
| Luminal B | 475 | 315 | 85.3 mo |
| Luminal A | 700 | 378 | 115.1 mo |

TCGA **cannot** support this — 11 deaths among 98 basal-like cases, so every
subtype returns "not reached". The function guards on event fraction (>50%
required for a defined median) and returns `null` with a reason rather than a
number computed from a minority of events.

**The vintage caveat is recorded in the facts file itself**, not only here,
and it is part of the study's config (`survival_caveat` beside
`survival_study` in `cxp/cancers.py`), so only a cancer with that study can
carry it. Until 2026-10-17 it was a constant in `run.py`, and every cancer's
overlay printed breast's METABRIC caveat over an empty survival block;
`tests/test_leak.py` now fails if a cancer's output names another cancer's
study id or caveat. A cancer with no survival cohort writes no survival file.
METABRIC accrued largely pre-2000 and pre-trastuzumab. These medians rank
subtypes correctly but understate modern outcomes — most misleadingly for
HER2-enriched, the subtype whose prognosis HER2-directed therapy transformed.

### Trial status

Resolves every NCT id in `../../cancer_research/pipeline.csv` against
ClinicalTrials.gov API v2. On the first run this caught a real error: the
atirmociclib row cited `NCT04730349`, which is the **Phase 1/2a study and is
now TERMINATED**, not the Phase 3. Corrected to `NCT06760637` (FOURLIGHT-3,
Phase 3, active).

## Audit results

`reports/breast.audit.md`, run of 2026-10-17: **28 MATCH, 1 CLOSE, 0 DIVERGENT, 1 NOT
COMPUTED, 1 LOW N** across 116 parsed drivers, with MATCH now meaning within
±2 points (it was ±5 until 2026-10-17; the page flags drift at the same number).

The PAM50 nodes' curated mutation figures are Table 1 of TCGA 2012, the paper
behind `brca_tcga_pub`, cited on each node's p53 (and HER2-enriched's HER2)
pathway row. The paper prints a second set in its text — luminal B TP53 and
PIK3CA 29%, basal-like TP53 80%, HER2-enriched TP53 72%, PIK3R1 4%, ERBB2 80% —
with no denominator; Table 1's counts are in its Supplementary Table XIII.1
(209 luminal A, 112 luminal B, 81 basal-like, 53 HER2-enriched). The per-patient
count here sits within 2 points of Table 1 on 10 of 11 rows and of the text on
3 of 8, so when the band tightened the text figures failed six times; they were
replaced on 2026-10-17. Luminal A PIK3CA keeps the text's 45% (Table 1 49,
computed 46.4). Luminal B CCND1 "25%" was traced nowhere in the paper or its
supplement, so the figure was deleted (INV-9) and only the computed one shows.

The one CLOSE row is waived: basal-like MYC 40% is Table 1's "MYC focal gain", a
gain where the row says amplification, and the paper's own count for the MYC
region is 25/81 (31%), against 31.5% computed. The NOT COMPUTED row is `APOBEC`,
which is a mutational signature rather than a gene, so no per-gene frequency
exists. The LOW N row is normal-like TP53 (n=8).

Several hand-transcribed figures came back essentially exact: TP53 in luminal A
(12 vs 12.1), GATA3 (14 vs 14.3), PTEN loss in basal-like (35 vs 34.8),
MAP3K1 (14 vs 13.4).

## Layout

```
pipeline/
  run.py                  CLI; --cancer selects everything below
  cxp/cancers.py          every per-cancer study, gene, node map and URL
  cxp/config.py           credentials from .env; `run.py keys`
  cxp/http.py             cached GET/POST, retry/backoff, verbatim response envelopes

  sources
  cxp/cbioportal.py       driver frequencies, cohort nodes, concordance, survival
  cxp/seer.py             SEER Cancer Stat Facts pages (whole disease + subtypes)
  cxp/civic.py            CIViC GraphQL evidence items
  cxp/gwas.py             GWAS Catalog associations
  cxp/oncotree.py         OncoTree codes (explicit map, no fuzzy match)
  cxp/ctgov.py            ClinicalTrials.gov API v2
  cxp/uniprot.py          UniProt domains + AlphaFold links
  cxp/structures.py       RCSB PDB entries
  cxp/labels.py           openFDA drug labels
  cxp/literature.py       Europe PMC search, per agent × problem

  joins and outputs
  cxp/drugs.py            curated drug CSV -> nodes and genes
  cxp/targets.py          gene records, gaps, repositioning
  cxp/audit.py            computed facts vs the hand-written data/<cancer>.js
  cxp/attribution.py      per-source licence and citation lines
  cxp/emit.py             facts -> data/<cancer>.facts.js
  cxp/emit_targets.py     -> data/<cancer>.targets.js
  cxp/emit_literature.py  -> data/<cancer>.literature.js
  cxp/sync.py             facts -> marked blocks in cancer_research/*.md (breast)

  cache/                  content-addressed responses; safe to delete
  facts/                  <cancer>.<kind>.json
  reports/                <cancer>.audit.md, <cancer>.audit.json
```

Curated inputs live outside this tree and are never written to:

```
../../cancer_research/
  pipeline.csv                drug × indication rows; source of NCT ids
  breast-cancer-landscape.md  prose report
  SOURCES.md                  tiered citation list
```

## Known limits

- **`audit.py` parses JavaScript with regexes.** `data/<cancer>.js` is JS, not
  JSON. The parser fails loudly on zero drivers, but a large refactor of a
  data file's layout would need it updated. The citation-coverage counts
  depend on that layout too: a block written in a different shape reads as
  `0/0`, which the report prints as "none made" rather than a failure.
- **Regulatory news is not wired up.** Every source in the layout above has a
  real API. `fda.gov` approval announcements and several trade-press hosts
  return 403 to automated fetching, and company IR pages are bespoke HTML, so
  approval dates in the drug CSVs remain human-verified (openFDA label text
  confirms indications, not dates).
- **Judgement is not automated and should not be.** Which axes exist, evidence
  grading, and prose all stay in `data/breast.js`.

## Environment note

This env had no CA bundle (`ssl.get_default_verify_paths().cafile` was `None`),
so Python fell back to the Windows CurrentUser store — which has Let's Encrypt
but not GoDaddy G2. cBioPortal worked while ClinicalTrials.gov and PubMed
failed TLS verification. `certifi` in `requirements.txt` fixes it portably; do
not "fix" this by disabling verification.
