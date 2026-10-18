# Dataset schema

The contract between a data file and the engine. The engine knows only this —
it contains no cancer-specific logic, so anything expressible here renders.

A dataset is one JS file in `data/` that calls `CancerExplorer.register({...})`.

> **Why JS and not JSON?** Browsers block `fetch()` from `file://` under CORS, so
> a `data/breast.json` would force everyone through a local web server.
> Self-registering scripts let `index.html` work on a double-click.

---

## Top level

| Field | Type | Required | Notes |
|---|---|:--:|---|
| `id` | string | ✅ | Unique, url-safe. Appears in the hash route (`#breast/ihc/tnbc`). |
| `name` | string | ✅ | Shown in the cancer picker and page title. |
| `synonyms` | string[] | | Not yet surfaced in the UI; reserved for search. |
| `overview` | string | | Subtitle under the title. |
| `incidence` | string | | Free text, shown in the footer. |
| `lastVerified` | string | | `YYYY-MM-DD`. Shown in the footer — please keep it honest. |
| `markers` | Marker[] | | Biomarkers this cancer is classified by. |
| `axes` | Axis[] | ✅ | At least one. |
| `nodes` | Node[] | ✅ | At least one, and one root per axis. |
| `profile` | Profile | | What this cancer is, why it is classified as it is, and the report vocabulary. Powers the **Start lens**. |
| `baseline` | Baseline | | Population lifetime risk. The denominator every `factors[]` RR converts against. |
| `factors` | Factor[] | | Risk factors, deduplicated and rankable. Powers the **risk lens**. |
| `detection` | Detection | | Screening modalities and stage-at-diagnosis outcomes. |
| `targets` | Target[] | | Curated clinical framing per druggable protein. Thin — see below. |
| `glossary` | Glossary | | This cancer's own words, and its examples for the engine's shared ones. See **Glossary** below. |
| `geneAliases` | {gene: string[]} | | Extra "also written" names, merged over the engine's table. |
| `pdbGloss` | {pdbId: string} | | Plain-language captions for this cancer's curated structures. |

## Lenses

A **lens** chooses what the canvas partitions; an **axis** chooses which tree over
tumours, and only applies inside the subtypes lens.

| Lens | Partitions | Needs | Views |
|---|---|---|---|
| `start` | nothing — it is prose and signposts | `profile` or `facts.overview` | single view |
| `risk` | risk factors — a statement about **people** | `factors` or `detection` | ranked · detection · table |
| `subtypes` | the tumour taxonomy | `axes` + `nodes` | treemap · tree · table |
| `targets` | druggable proteins | `targetData` overlay | single view |
| `literature` | papers, by the problem they address | `literatureData` overlay | single view |
| `evidence` | claims by provenance | `facts` overlay and/or `sources` | single view |

The risk lens appears automatically once a dataset declares `factors` or
`detection`, and is skipped entirely when it declares neither. The route is
`#<dataset>/<lens>/<axis|->/<selected|->/<view>`; the older four-part
`#<dataset>/<axis>/<selected>/<view>` still resolves, to the subtypes lens.

**Risk factors are not a fifth axis, and must not be modelled as one.** An axis is
a tree whose `prevalence` sums to the parent's value. Risk factors overlap freely —
one person can be BRCA1-positive, postmenopausal, obese and a drinker — so they
partition nothing and the sum rule would be meaningless over them. They are a
separate top-level collection for the same reason the four axes are separate from
each other.

## Profile (Layer 0)

Optional. Present it and the **Start lens** appears and becomes the default landing;
omit it and the app opens on the taxonomy as before. Existing hash links are unaffected
either way — a legacy four-part hash still resolves to `subtypes`.

```js
profile: {
  definition: '…',                 // what this cancer is
  definitionMore: '…',             // optional second paragraph
  world: { newCasesPerYear, deathsPerYear, label, note, source },
  classification: '…',             // what "classified several ways" means
  classificationClose: '…',        // the disagreement, after the axis cards
  reportIntro: '…',                // what a pathology report IS — the join
  reportTerms: [{ term, plain, axis?, axisRole?, marker?, biomarker?,
                  goTo?, goToLens?, goToView? }],
  lensExamples: { risk?, subtypes?, targets?, literature?, evidence? },
  registryCovers: '…',             // optional: what the registry counted, when narrower than the dataset
  sources: [{ label, url }]
}
```

**`registryCovers` names the part the SEER tiles describe.** SEER's melanoma page counts
melanoma of the skin, while the melanoma dataset also covers mucosal and uveal melanoma. A
tile read on its own — "2.2% lifetime risk" — would describe that part as the whole. Set it
to a lower-case phrase (`'melanoma of the skin'`) and every Start tile caption ends
"· melanoma of the skin only". Leave it off when the registry page and the dataset cover the
same disease; nothing renders.

**`lensExamples` overrides the "where to go from here" cards.** Each card ends
with one concrete example, and those used to be five breast facts typed into
`render.js` — *"HR+/HER2− is 70% of cases"*, *"only 3 of 22 risk factors are
lifestyle ones"*. Under a second dataset they became confident lies on the first
screen a reader sees.

So the card now **computes** its example from the loaded data: the two largest
root children with their real prevalence, the modifiable count over the factor
count, the paper and target totals from the overlays. A card that cannot compute
one omits the line rather than showing another cancer's. Supply a string here
only when the generated sentence is not the one worth making — and prefer
generating, because a typed number goes stale silently and a computed one
cannot.

**The numbers are deliberately not here.** Incidence, mortality, survival, lifetime risk,
median age and the age distribution all come from `pipeline/facts/breast.overview.json`
(`run.py incidence`) and arrive at `ds.facts.overview`. They move; prose does not.

**The four classifications are not here either.** `classification` says what it *means* for
a cancer to be sorted four ways at once; the cards naming the four are generated from
`axes[]`, so they cannot drift from the picker. `classificationClose` runs after them and
carries the disagreement — it is the sentence that makes four axes a feature rather than a
mess.

### reportTerms — the bridge into the explorer

Each card names a word that appears on a real pathology report. `goTo` names a node;
`goToLens` (with optional `goToView`) names a lens. A term that links nowhere warns — it
explains a word without connecting it to anything, which is the one thing this block exists
to avoid.

`axis` names which of the classifications above the word feeds, rendered as a chip that
switches to it. **Leave it off when the honest answer is "none".** Grade and stage are on
every report and are not among the four; filling the field in to make the set look complete
would manufacture exactly the confusion this section removes. An unknown axis id is an error.

`axisRole` overrides the chip's verb, which defaults to `sorts by`. Ki-67 uses
`stands in for` because it is an IHC surrogate for PAM50, not part of it.

`marker` and `biomarker` are pointers into `markers[]` and `ihc-root.molecular.biomarkers`,
so the assay and threshold are **pulled, not restated**. A `marker` that is not declared is
an error.

### `{{term}}` — author-marked definitions in prose

Any string the renderer passes through `Render.prose` may mark a word for definition:

```js
plain: 'Positive means the tumour is fed by estrogen — which is bad news made ' +
       'useful, because it can be starved with {{endocrine therapy}}.'
```

`{{key}}` looks the key up in `js/glossary.js`; `{{key|shown words}}` when the sentence
needs different wording than the entry name (`{{duct|ducts or lobules}}`).

**Nothing is scanned.** The renderer never walks prose looking for known words — "stage" is
also a verb, "primary" means two things on this site, and gene symbols collide with ordinary
English. A person decides that *this* occurrence of *this* word is where a reader gets stuck.
A wrong definition is worse than an absent one.

A marker with no glossary entry renders as plain text — correct, and invisible, which is how
a page of dead markers would accumulate. So both halves are checked: the validator walks the
whole dataset for them, and `Render.prose` warns to the console for markers written in
renderer ledes, which the dataset walk cannot see.

### The rule this layer exists to enforce

SEER's headline figures have four different denominators — a yearly rate per 100,000, a
lifetime cumulative risk, and a five-year *relative* survival conditional on diagnosis. A
tile row that lines them up without saying so invites "91.9% survive, so 8.1% die", which is
wrong twice. So **no figure is rendered without its denominator attached**, and the section
states plainly that they do not divide into one another.

Relative survival needs its own gloss and gets one via `detection.relativeSurvivalNote`:
100% means *no different from the general population*, not that nobody dies — and it can
exceed 100%.

## Baseline

```js
baseline: {
  population: 'US women',
  lifetimeRisk: 13,                    // percent, NUMBER — the conversion denominator
  lifetimeRiskLabel: 'about 1 in 8',
  note: 'Averaged over an entire lifetime and an entire population…',
  strata: [{ label: 'US men', lifetimeRisk: 0.13, note: '' }],
  source: { label: 'SEER / NCI DevCan', url: 'https://…' }
}
```

Once present, the renderer converts every convertible `rr` into absolute terms and
shows both. **A relative risk displayed on its own is read as an absolute one by
almost every non-specialist** — that is the single most common way this material
misleads, and `baseline` exists to close it.

A wrong baseline is worse than an absent one, since it silently rescales every
factor. The validator errors on a missing or out-of-range `lifetimeRisk` and warns
when there is no `population` or `source`.

## Factor

```js
{
  id: 'alcohol',                    // unique across factors
  label: 'Alcohol',
  category: 'Lifestyle',            // free text; groups like Trigger.category
  modifiable: true,                 // REQUIRED — drives the two groups in the ranked view
  direction: 'increases',           // increases | decreases | mixed
  rr: [1.07, 1.10],                 // relative-risk range … OR …
  absoluteLifetime: [55, 72],       // … an absolute lifetime risk. Never both.
  per: 'drink/day',                 // the unit the rr applies to, when not whole-exposure
  magnitude: '~7–10% per drink/day',// the display string; keep the published wording
  evidence: 'strong',               // strong | moderate | limited
  scope: 'overall',                 // 'overall' | a node id — see below
  outcome: 'incidence',             // incidence (default) | mortality — see below
  referent: 'unexposed',            // population | unexposed | other — relative to whom; see below
  stratum: 'US men',                // a baseline.strata label, when not the default population
  affects: ['hr-pos-her2-neg'],     // node ids — the link from Book I into the taxonomy
  note: 'One or two sentences.',
  source: { label: '…', url: '…' }
}
```

`modifiable` is **required and must be a boolean.** Guessing it would tell someone
they can change something they cannot, so the validator errors rather than defaulting.

### `rr` vs `absoluteLifetime` — never both

They are different claims. `rr` is a multiplier *on* the baseline; `absoluteLifetime`
*replaces* it. BRCA1 is quoted as 72% by age 80, not as "×5 of 13%", so it
gets `absoluteLifetime`. On the ranked axis such a factor is positioned by its
implied ratio (absolute ÷ baseline) while its label keeps showing the real figure.

Despite the field's name, most such figures are counted **to an age** (by 75, by 80),
and a range may span ages, sexes or countries (prostate BRCA2: 27% by 75, 60% by 85).
So `magnitude` must name the age and what the range spans, and the renderer never
labels the value "lifetime": the drawer shows `magnitude` alone, and the table says
"already absolute". The ranked position is therefore approximate for these rows.

### `scope` — the guard on the conversion

An RR may only be multiplied by the whole-disease baseline if it was **measured**
against the whole disease. `~2× incidence` for Black ancestry is 2× the rate of
*triple-negative* disease; converting it against the 13% overall baseline would
manufacture a 26% figure no study supports.

- `scope: 'overall'` (the default) — convertible.
- `scope: '<node id>'` — not converted. The UI says so explicitly, naming the node.

### `outcome` — the second guard, and the one `scope` cannot catch

`scope` asks *measured against which subtype*. `outcome` asks *a multiplier on
what*. They are independent, and a factor can pass the first and fail the second.

`baseline.lifetimeRisk` is a probability of being **diagnosed**. So only a
multiplier on incidence may be multiplied by it.

- `outcome: 'incidence'` (the default, so nothing written before this field
  existed changes meaning) — convertible.
- `outcome: 'mortality'` — never converted. The UI says so, and says why.

The case that forced it: Black/African ancestry in prostate carries roughly
**1.67× the incidence and 2.06× the mortality**. Both are true, both are
whole-disease figures, and both would sail past the `scope` guard. Converting the
second against a diagnosis baseline yields a number that is neither a risk of
diagnosis nor a risk of death — and it looks completely reasonable on the page,
which is exactly why it is blocked in code rather than left to the author.

Two entries, not one field with two numbers: they are two claims about two
different events, the same reason `rr` and `absoluteLifetime` are separate.

`outcome: 'mortality'` with `absoluteLifetime` is an error — an absolute
*lifetime* risk in this schema is a risk of diagnosis, so one of the two is wrong.

### `referent` — the third guard: relative to whom

`scope` asks *measured against which subtype*, `outcome` asks *a multiplier on
what*. `referent` asks *relative to whom*, and it is the one a common, strong
exposure breaks.

A relative risk from a cohort study nearly always compares the exposed with the
**unexposed** — never smokers, non-carriers, non-drinkers. But
`baseline.lifetimeRisk` describes the **whole** population, exposed included. The
unexposed group's own risk is therefore *below* the baseline whenever the exposure
raises risk, and baseline × rr counts the exposure twice. For alcohol in breast
cancer the error is small. For smoking in lung cancer it is not: in Villeneuve &
Mao's Canadian figures, current smokers carry 13.2× the lifetime risk of never
smokers against an all-men baseline of 9.6%, and 13.2 × 9.6% = **127%**.

| `referent` | Relative to | What the renderer does |
|---|---|---|
| `population` | the whole population the baseline (or `stratum`) describes | converts exactly: baseline × rr |
| `unexposed` + `stratum` | the unexposed group, whose own lifetime risk that `baseline.strata` entry gives | converts exactly against the stratum |
| `unexposed`, no `stratum` | the unexposed, with no figure for their own risk | shows a **bound**: "at most about X" when rr > 1, "at least about X" when rr < 1, with a note saying why it is a limit and not an estimate |
| `other` | a comparison group outside the baseline population (Hodgkin survivors given low doses) | never converts, and says why |

The bound is exact, not a heuristic: whatever share of the population is exposed,
the exposed group's risk lies between the baseline and baseline × rr. It is close
when the exposure is uncommon and far off when it is common.

Validator:

- a convertible `rr` with no `referent` **warns** — the default is `population`, so
  nothing written before the field existed changes meaning, but the author is asked
  to say which it is;
- a convertible `rr` whose upper bound × its denominator exceeds 100 is an
  **error**. For `unexposed` without a `stratum` the message says to add the
  unexposed group's own lifetime risk as a stratum.

### `stratum` — a different denominator

BRCA2 carries a ~45–70% lifetime risk in women and ~6–8% in men. Those are two facts,
not one range, so they are two factor entries and the male one sets
`stratum: 'US men'`. The renderer then converts against that stratum's
`lifetimeRisk`, and the ranked view notes that such rows are not positionally
comparable with the rest.

### What the ranked view does with a factor it cannot place

A factor with neither `rr` nor `absoluteLifetime` (age, for instance, whose magnitude
is `'strongest single factor'`) has no position on a ratio axis. It is listed in an
explicit *"no comparable effect size — shown, not ranked"* band rather than dropped.
Silently omitting the strongest factor on a chart about risk would be worse than
showing it without a coordinate.

## Detection

```js
detection: {
  note: 'Stage at diagnosis dominates subtype in predicting outcome.',
  relativeSurvivalNote: '…',        // what "relative" means; 100% ≠ nobody dies
  horizonNote: '…',                 // what the reporting window does NOT capture
  stageOutcomes: [{ stage: 'Localised', share: 65, fiveYear: 99.6, tenYear: 95.1, note: '' }],
  tradeoff: { … },                  // see below
  modalities:    [{ name: 'Mammography', role: 'Population screening',
                    catches: '…', misses: '…', harms: '…',
                    sensitivity: '…', interval: '…', note: '' }],
  signs:   ['A new lump or thickening…'],
  sources: [{ label: '…', url: '…' }]
}
```

`stageOutcomes[].share` is a partition of all cases, so the shares are checked
against ~100% (±5).

This block is what keeps a risk page honest. In breast, only 3 of 22 factors are
modifiable lifestyle levers — a page built on `factors[]` alone would imply people
control far more of the outcome than they do, when the dataset's own prognosis text
says stage at diagnosis dominates. The localised-to-distant survival gap is larger
than any modifiable factor in the file.

### `horizonNote` and `tenYear` — when the window is doing the misleading

A survival table can be entirely accurate and still say the wrong thing, because
five years is long relative to some cancers and short relative to others.

Prostate reports **100.0% five-year relative survival for both localised and
regional disease**. Every figure is correct. The reader concludes that spread to
the lymph nodes does not matter, which is false — five years is simply far inside
the horizon on which prostate cancer kills.

So the validator **warns when the two best-surviving stages are within 1
percentage point of each other and no `horizonNote` is set**. It is not asking
for better numbers; it is asking the dataset to say what its window does and does
not capture. `tenYear` is optional and renders beside `fiveYear` rather than
replacing it — the gap between the two is the point.

Breast sets a `horizonNote` even though its stages separate cleanly, because
five years still flatters the HR-positive majority, which recurs past twenty.

### `modalities[].harms` — what the test costs

`catches` and `misses` are both about accuracy. Neither can hold *"1 in 6 men get
a false positive"* or *"1% of biopsies end in hospital"*. A screening test
described only by what it finds reads as a recommendation to take it, so the
validator **warns when a modality whose `role` mentions screening has no
`harms`**.

### `tradeoff` — benefit and harm on one denominator

```js
tradeoff: {
  note: '…',
  basis: 'per 1,000 women screened every two years from 40 to 74, over a lifetime',
  rows: [
    { kind: 'benefit', value: '8.2',   label: 'breast cancer deaths averted', note: '…' },
    { kind: 'harm',    value: '1,376', label: 'false-positive results',       note: '…' }
  ],
  effect: { measure: 'RR', point: 0.85, ci: [0.73, 0.98],
            of: '…', followUp: '…', note: '…' },
  disagreement: '…',
  sources: [{ label: '…', url: '…' }]
}
```

Three rules, all enforced:

- **`basis` is required.** "8 deaths averted" and "1,376 false positives" are
  only comparable because both are per 1,000 women screened the same way. It is
  printed once, above both columns.
- **Benefits without harms is an error.** Screening always costs something; a
  block listing only the upside is an advertisement. Harms with no benefit is a
  warning instead — if the evidence shows no benefit, say so as a row rather
  than by leaving the column out.
- **`effect.point` must lie inside `effect.ci`**, and a missing `followUp`
  warns: a mortality rate ratio without the length of follow-up behind it is not
  a finding.

`disagreement` is where sources contradict each other, said rather than resolved.
Breast uses it for the gap between the USPSTF's pooled RR 0.85 and Cochrane's
reading of the same trials — which is the kind of thing this site exists to show.

The columns render side by side and are not allowed to stack above phone width.
A benefit paragraph followed three screens later by a harms paragraph is the
normal presentation of this material, and is why most people cannot state the
cost of a test they have been advised to take.

## Targets (curated layer)

Optional, and deliberately thin. The heavy lifting is done by the generated
overlay `data/breast.targets.js` (`pipeline/run.py targets`), which supplies
protein length, domains, hotspot positions, structures, agents, trial status and
evidence counts — all numbers with a provenance. `targets[]` in the dataset adds
only what a pipeline cannot know.

```js
targets: [{
  gene: 'TP53',                  // REQUIRED, must be unique; matches the overlay by symbol
  summary: 'Clinical framing, one or two sentences.',
  caveat:  'What would mislead if omitted.',
  watch:   'The thing to keep an eye on.',
  excludedBy: [{                 // optional — who its drugs are ruled OUT for, below
    nodes:  ['drv-ras-mutant'],  // REQUIRED: the excluded groups; one axis, none inside another
    agents: 'cetuximab and panitumumab',   // REQUIRED: the indication this belongs to
    except: { nodes: ['drv-kras-g12c'], agents: 'panitumumab with sotorasib, after chemotherapy' },
    note:   'Optional prose.',   // noteSource if it needs a different source
    source: ['label-panitumumab', 'label-cetuximab']   // REQUIRED
  }],
  germline: [{                   // optional — its drugs are chosen by a test of the PATIENT, below
    test:   'HLA-A*02:01 genotyping of a whole blood sample',   // REQUIRED: what is tested
    agents: 'tebentafusp (Kimmtrak), in unresectable or metastatic uveal melanoma',  // REQUIRED
    nodes:  ['path-uveal'],      // optional: where the indication applies; one axis, none inside another
    share:  { n: 551, of: 1072,  // optional: people tested and people positive, never a typed percent
              population: 'patients with metastatic uveal melanoma screened for the IMCgp100-202 trial',  // REQUIRED
              source: ['cohen-2026', 'olivier-2023'] },   // REQUIRED
    note:   'Optional prose.',   // noteSource if it needs a different source
    source: 'label-tebentafusp'  // REQUIRED
  }]
}]
```

Partial coverage is normal and expected: a gene with no entry falls back to the
overlay's one-line rationale, and a gene with an entry but no overlay record
still renders its prose. The validator errors on a missing or duplicate `gene`
and warns on an entry that carries neither `summary` nor `caveat` — that entry
adds nothing over the generated text.

**The overlay is not part of this contract.** It is a generated artefact with its
own header documenting its sources, and the app degrades to three lenses without
it. Do not hand-edit it.

### `excludedBy` — a drug ruled out by what the tumour carries

Every `basis` value describes what rules a drug **in**. Colorectal cancer's EGFR
is ruled in by nothing in EGFR: both anti-EGFR antibody labels rule out
RAS-mutant disease, so eligibility is the *absence* of a change in another gene.
Drawn on its own alteration frequency, EGFR would read as rarely broken and
heavily drugged — the misreading TROP2 once invited, with a different cause.

It is not a fifth `basis`, because the exclusion belongs to an **indication**,
not a gene. The same panitumumab label that rules out RAS-mutant disease
approves panitumumab with sotorasib in KRAS G12C, which is RAS-mutant; that is
what `except` carries. And tucatinib's HER2 indication in colorectal cancer
carries the same RAS exclusion on a target that *is* genomically selected. An
entry therefore names its `agents`, and one gene may carry several entries.

**It names nodes, not a number.** The share printed is the sum of the named
nodes' `prevalence`, captioned with their axis `population`, so it cannot drift
from the taxonomy. The consequence is that an exclusion can only be stated where
the dataset has a node for the excluded group. Breast's gedatolisib (indicated
for PIK3CA wild-type disease) has no PIK3CA-mutant node to point at, and is not
wired.

The check the plan asked for — is any existing target secretly this shape —
found lung's checkpoint inhibitors: the pembrolizumab, nivolumab and
atezolizumab labels rule out "EGFR or ALK genomic tumor aberrations" in their
first-line lung indications, and cemiplimab's adds ROS1. Lung's `CD274` and
`PDCD1` entries carry them. Their shares are of adenocarcinoma, because that is
the population the driver axis partitions.

Where it renders: a block on the target card (share, excluded groups, agents,
exception), one line under "Where it is altered", a clause in the list of
targets the landscape cannot plot, a dashed ring with a note on the
landscape scatter, and a "Drugs ruled out here" section under the summary in
the drawer of each node the entry names directly (not their descendants): the
target as a link, the agents, the exception, the label as footnote. The pipeline's gap arithmetic does not
read it.

### `germline` — a drug chosen by a test of the patient

Every other field here describes the tumour. Tebentafusp (Kimmtrak) is indicated
for **HLA-A\*02:01-positive** adults with uveal melanoma, and its label selects
patients by genotyping a whole blood sample. An HLA type is inherited; the tumour
does not carry it as an alteration. Drawn on PMEL's alteration frequency, the
card and the landscape would print a share of tumours as if it were the share of
patients who can receive the drug. `marker` is no better: it would file a tissue
type as a tumour marker.

An entry names the `test`, the `agents` and a `source`, and may name the `nodes`
where the indication applies (checked like `excludedBy`'s). **Its share is
counted, not typed:** `n` patients positive of `of` tested, with the
`population` they were counted in and its own `source`. A typed percent is
refused, because the figure most easily found for an HLA allele is its allele
frequency, which counts chromosomes rather than people. Melanoma's share is the
IMCgp100-202 screening count, 551 of 1,072; the allele frequencies by ancestry go
in the `note`, said to be shares of alleles.

Where it renders: a block on the target card (the test, the counted share, the
agents, where), a line under "Where it is altered" saying the bars are what the
tumours carry and not who is eligible, a clause in the off-chart list, and a
"Drugs chosen by a germline test" section in the drawer of each node it names.
A germline-selected target is **never plotted** on the landscape and never gets
a repositioning, blind-spot or untargeted row, whether the curated entry or the
overlay's `basis: 'germline'` says so — the pipeline's fallback for a gene it has
no basis for is `genomic`, and that fallback alone must not put PMEL on the axis.
With the overlay attached, the validator warns when the two disagree.

The check the plan asked for — is any breast or prostate agent chosen by an
inherited variant already this shape — found breast's PARP inhibitors: both the
olaparib and talazoparib breast indications are written for germline BRCA
variants only, so breast's `PARP1` carries an entry (no share: none was sourced).
Prostate's PARP inhibitor labels say germline or somatic, or name no origin, so a
tumour test can select them and prostate carries none. A synthetic-lethal target
chosen this way keeps its own `basis`; the entry alone adds the test.

### Why `basis` lives in the pipeline, not here

Each target carries `basis` ∈ `genomic` | `expression` | `pathway` |
`synthetic-lethal` | `unselected` | `marker` | `germline`. Colorectal added
`unselected` for agents no tumour test selects (the anti-angiogenic drugs), and
`marker` for a target picked by a test of something else with no synthetic-lethal
mechanism behind it (PD-1 blockade by mismatch repair status, whose
`biomarker_gene` names the test rather than a gene). Melanoma added `germline`
(above). None of the three can sit on the alteration-frequency axis. That is a classification the **gap arithmetic depends on** —
it decides which targets can legitimately sit on an alteration-frequency axis and
which repositioning questions are worth asking — so it lives beside the
computation in `pipeline/cxp/targets.py`, not in this file. Narrative about a
target belongs here; the switch that changes a computed result does not.

## Literature (generated only)

There is **no curated counterpart** for this lens — it is entirely
`data/breast.literature.js`, produced by `run.py literature`, and nothing in the
dataset contract describes it. Drop the `<script>` tag and the lens disappears
while everything else keeps working.

The drawback vocabulary that drives the queries lives in
`pipeline/cxp/literature.py:DRAWBACKS`, beside `targets.py`'s `BASIS` and
`PDB_CHOICE`, for the same reason: it is a classification the computation
depends on, not narrative. A wrong term there produces an irrelevant paper, not
a wrong number — and because every record carries the terms it actually matched,
that failure is visible rather than silent.

### Per-record fields the renderer must never drop

| Field | Why it is load-bearing |
|---|---|
| `tier` | preprint / primary / review / systematic review / meta-analysis / trial |
| `peer_reviewed` | false for preprints; drives the second badge |
| `species` | `human` \| `mouse` \| `cell line` \| `unclear` — **never guessed** |
| `species_from` | `mesh` \| `keywords` \| `pubtype` \| `none` — how strong that inference is |
| `matched` | the query terms actually present in the title or abstract |
| `kind` + `subject` | which question this paper is an answer to |

Species precedence is deliberate and non-obvious: animal terms are checked
first (because "patient-derived xenograft" contains "patient"), clinical terms
second, cell-line terms last — a paper that studied people and also ran cell
work is human evidence. A registered trial is forced to `human` unless MeSH says
otherwise. MeSH is preferred where present, but it is absent on roughly a third
of recent papers and absent most often on the newest ones, which is exactly
where this layer looks.

## Non-goal: personal risk scores

The app must not multiply factors together to produce an individual's risk, and the
risk lens says so where a reader would try. RRs come from different studies and
populations, they overlap, and several are modified by menopausal status. A naive
product of them is wrong in a way that looks authoritative — which is
"leave a field out rather than guessing" applied to a computation.

## Marker

The reusability hinge. Breast declares ER/PR/HER2; lung would declare
EGFR/ALK/ROS1/PD-L1. The renderer treats them generically — it never
hard-codes a marker name.

```js
{ id: 'ER', label: 'Estrogen receptor', assay: 'IHC', positiveThreshold: '≥1% nuclear staining' }
```

Any key used in a node's `markers` object **must** be declared here, or
validation raises an error.

## Glossary

`js/glossary.js` holds the terms that are true of **any** cancer — modality,
phase 3, relative survival, over-diagnosis. A dataset supplies the rest.

```js
glossary: {
  groups: [{ id: 'classification', label: 'How breast cancer is sorted' }],
  terms: [
    { t: 'HER2', g: 'classification', alias: ['ERBB2'], d: 'A protein…', w: 'One of three stains…' },
    { t: 'ADC', w: 'The modality of 13 agents here, including Enhertu and Trodelvy.' }
  ]
}
```

| Field | Meaning |
|---|---|
| `t` | The term. Lookup key, case-insensitive. |
| `g` | Group id — an engine group, or one declared in `groups`. |
| `d` | Definition. **Its presence decides the override shape.** |
| `w` | Why it appears *here* — required in spirit, warned when missing. |
| `full` | Expansion of an abbreviation, shown as a chip. |
| `alias` | Other spellings that resolve to this entry. |

**Two override shapes, and the difference is the whole point.**

- **With `d`** — replaces the engine entry outright. Use it for a word this
  cancer owns (HER2, PAM50, Gleason, PSMA) or one the engine has never heard of.
- **Without `d`** — keeps the engine's neutral definition and replaces only the
  fields named, in practice `w`. Most overrides are this shape: "ADC" means the
  same thing in every cancer, but the agents it points at do not.

A dataset can never inherit from another dataset — the base is always the
engine's neutral entry. That is what stops someone reading about Gleason
patterns being handed the meaning of a HER2 stain.

**Validation.** An entry with no `d` and no engine term of that name is an
error: it would render as a heading with nothing under it. A brand-new term
with no `g` is an error too — the glossary page is built group by group, so an
unplaced term is defined and never shown. An unknown `g` is an error. A missing
`w` is a warning.

Group labels are overridden by id; unknown group ids are appended after the
engine's six. The active vocabulary follows the cancer picker: `Glossary.use(ds)`
is called from `reindex()`, the single point every dataset change passes
through. `Glossary.lookup(token, ds)` takes an explicit dataset — the validator
needs it, because boot checks every registered dataset in one loop and each must
be judged against its own words.

## Axis

One independent tree per classification system.

**An axis does not have to partition by a property of the tumour.** Prostate's
disease-state axis partitions by *the furthest state a man's disease ever
reaches* — localised, metastatic, castration-resistant, neuroendocrine. Every
case falls in exactly one box and the boxes still sum to the whole disease, so
the prevalence rule holds unchanged. A *snapshot* of who is in which state today
would not: it double-counts everyone who moved. If you build such an axis, say
which of the two it is in the axis `note`, because the treemap looks identical
either way and only one of them is a partition.

Such an axis is also where a node's computed figures usually come from a
different cohort than the rest of the dataset (prostate's and breast's state
axes, lung's histology and resistance axes) — see **Cohort nodes** in
`pipeline/README.md`. A node record in the facts overlay may carry its own
`cohort` block, and the viewer prefers it; showing castration-resistant
frequencies under a primary-tumour cohort's name would misattribute every number
on the card.

```js
{ id: 'ihc', label: 'Receptor status (IHC)', shortLabel: 'Receptor (IHC)', default: true,
  asks:     'Which of three switches are on?',
  measures: 'Three stains on a slice of the tumour — ER, PR and HER2.',
  decides:  'The first treatment offered.',
  note:     'A proxy for biology, not biology itself.' }
```

| Field | Required | Notes |
|---|:--:|---|
| `id` | ✅ | Referenced by `node.axis`. |
| `label` | ✅ | Shown in the axis selector and as the segment's tooltip. |
| `shortLabel` | ⚠️ | Shown in the Subtypes lens switcher, where all axes sit side by side. Keep it to ~14 characters — without it the full `label` is used and four segments crowd the row. |
| `default` | | Exactly one axis should set it. Otherwise the first is used. |
| `asks` | ⚠️ | The question this classification answers, in one line. Rendered in quotes. |
| `measures` | ⚠️ | What is physically measured, and by whom. |
| `decides` | ⚠️ | What changes as a result. **If nothing does, say so** — `pam50` says "little, directly". |
| `note` | | Rendered above the chart. Use it to say what the axis *is not*. |
| `population` | | `{ label, short, share, source }`. Set it when the axis partitions only **part** of the disease — see below. |
| `shareOf` | | A phrase naming what the shares divide, when it is the whole disease but **not case counts** — see below. |
| `partition` | | `false` when the nodes are **compared cohorts** rather than shares. No node on such an axis may carry `prevalence` (error); cells are drawn equal and the legend says size means nothing. |

⚠️ = warning-level. The app runs without them and reads as four unexplained
options in a dropdown.

### `population` — an axis that covers part of the disease

Some classifications are only ever applied to a subgroup. Lung's driver classes
describe adenocarcinoma; its PD-L1 bands come from advanced non-small-cell disease;
prostate's PSMA status exists only for men who had the scan. Forcing such an axis
into "share of the whole cancer" needs a never-assessed node nobody publishes, and
leaving it unmarked lets "25%" beside KRAS read as a quarter of all lung cancer.

```js
{ id: 'driver', label: 'Driver class', …,
  population: { label: 'Lung adenocarcinoma', short: 'adenocarcinoma',
                share: 46, source: 'acs-cff-2023' } }
```

On such an axis **`prevalence` is share of the named population**: root-level
siblings sum to ~100 of that group, and children still sum to their parent. Every
share the renderer prints for a node on the axis says "of adenocarcinoma" instead
of "of cases", and the axis head, the front-page card and every node's drawer carry a
**Covers** line. The treemap and tree legends say "share of adenocarcinoma" too.

| Field | Required | Notes |
|---|:--:|---|
| `label` | ✅ | Who the shares describe. Error if missing. |
| `short` | ⚠️ | Used in the "% of …" captions. |
| `share` | | Percent of the whole cancer this group is. A figure, so it needs `source`. |
| `source` | | A `references[]` id or `{ label, url }`. |

### `shareOf` — shares of something other than cases

A share can fail to be "of cases" in a second way: it covers the whole disease,
but divides a different quantity. Colorectal's site axis comes from a registry
table of **age-adjusted incidence rates** — proximal colon 13.3 per 100,000 of a
colorectal 35.3 — and no table publishes the same split as case counts. Printing
"37.7% of cases" beside that node contradicts the axis note above the chart.

```js
{ id: 'site', label: 'Tumour site (ICD-O-3)', …,
  shareOf: 'the age-adjusted incidence rate' }
```

Every place `population.short` would be printed — tooltip, drawer, front-page
card, treemap and tree legends — prints this phrase instead of "cases". Prevalence
arithmetic is unchanged: siblings still sum to ~100 and children to their parent.

Validator: an **error** if it is not a non-empty string, if it starts with "of"
(the renderer supplies that word), or if the axis also sets `population` — a
caption names one whole, so a subgroup measured in rates says both in its
population label. A **warning** on a `partition: false` axis, which has no shares.

### `partition: false` — an axis of comparisons

Lung's resistance axis sets tumours sampled **before** targeted therapy beside tumours
sampled **after** it. That is the most informative contrast in the dataset and it is not
a partition: some patients were sampled both times, and nobody publishes what share of
EGFR-mutant disease is "after". Giving the two nodes prevalences would invent a split.

`partition: false` makes that statement in the data. The validator refuses a
`prevalence` on any node of such an axis, the treemap and tree draw the cells equal,
the legend replaces "area ∝ share of cases" with "size means nothing here", and the
**Covers** line says the nodes are compared cohorts rather than shares.

### Two registers, and why both

`note` is the caveat for a reader who already understands the axis. The
`asks`/`measures`/`decides` triple is for one who has never met it — and it is
what the front page's classification cards and the Subtypes lens head are built
from, so **the front page cannot fall out of step with the picker**: add a fifth
axis and a fifth card appears, with the count in the heading following it.

Keep the two registers apart. Repeating the description in `note` produces
visible duplication — the lens head and the note strip sit a few pixels apart.

**Use separate axes when classification systems genuinely disagree.** Do not
merge them into one hierarchy because it looks tidier — that is the failure
mode this schema exists to prevent.

## Node

| Field | Type | Required | Notes |
|---|---|:--:|---|
| `id` | string | ✅ | Unique across the **whole dataset**, not just its axis. |
| `axis` | string | ✅ | Must match an `axes[].id`. |
| `parent` | string \| null | ✅ | `null` marks the axis root. Must be on the **same axis**. |
| `label` | string | ✅ | Full name. |
| `shortLabel` | string | | Used where space is tight (treemap cells, legend). |
| `prevalence` | number | | Percent **of the whole cancer**, not of the parent — see below. Drives treemap area and tree circle radius. |
| `markers` | object | | `{ ER: '+', HER2: '2+' }` — values are free text. |
| `codes` | object | | Canonical identifiers, e.g. `{ oncotree: 'ILC' }`. Populated from `pipeline/facts/`; see below. |
| `summary` | string | | One or two sentences in the drawer. |
| `triggers` | Trigger[] | | Why people get it. |
| `molecular` | Molecular | | Drivers, pathways, biomarkers. |
| `prognosis` | Prognosis | | |
| `therapies` | Therapy[] | | |
| `related` | Relation[] | | Cross-cutting links — **may cross axes**. |
| `sources` | Source[] | | `{ label, url }`. |

Nodes without `prevalence` still render; the treemap substitutes the sibling
mean and the validator warns.

**`prevalence` is share of the whole cancer, not share of the parent.** So a
node's children sum to *that node's* value, and only root-level siblings sum to
~100. Breast's HR+/HER2− is 68, and its three children sum to 68 — not 100.

This is what makes nested treemap areas honest: a cell's area is its true slice
of the whole disease at every depth, so you can compare a cell at depth 2 with
one at depth 1 directly. The validator enforces it (tolerance ±8% of the
parent's value, floor ±2).

### Trigger

```js
{
  factor: 'BRCA1 germline variant',
  category: 'Germline',          // free text; groups the drawer section
  direction: 'increases',        // increases | decreases | mixed
  magnitude: 'lifetime risk ~55–72%',
  evidence: 'strong',            // strong | moderate | limited
  note: 'One sentence of context.',
  source: 'optional citation'
}
```

`category` is deliberately free text so each cancer can use its own grouping
(breast uses Germline / Hormonal / Lifestyle / Environmental / Demographic; a
virally-driven cancer would add Infectious). Missing categories fall into "Other".

**Quote real effect sizes in `magnitude`.** A trigger list without magnitudes
implies every factor matters equally, which is the most common way these
visualizations mislead.

### Molecular

```js
{
  drivers: [{
    gene: 'TP53',
    alteration: 'loss-of-function mutation',
    frequency: 80,            // percent as a NUMBER — drives the bar width
    frequencyNote: '',        // use instead when there is no clean number
    role: 'tumour suppressor',
    druggable: true,          // adds a tag and recolours the bar
    note: 'Why it matters.'
  }],
  pathways:   [{ name: 'p53', status: 'inactivated in ~80%', note: '' }],
  biomarkers: [{ name: 'PD-L1 CPS', use: 'selects pembrolizumab', threshold: '≥10' }]
}
```

Bars are scaled to the **largest frequency within that node**, not to 100 — so a
node whose top driver is 45% still fills its bar. Frequencies are comparable
within a node, not across nodes.

### Relation

```js
{ to: 'basal-like', kind: 'overlaps', strength: 0.8, note: 'About 80% overlap — not identity.' }
```

`kind` ∈ `overlaps` | `progresses-to` | `reclassified-as` | `shares-driver` |
`precursor-of` | `subset-of` | `mutually-exclusive`.

**`mutually-exclusive` is the only kind that asserts an absence.** Every other
kind says two nodes have something in common; this one says they measurably do
not co-occur, which in cancer genomics is a finding rather than a gap. Prostate's
ETS fusions and SPOP mutations almost never appear in the same tumour — 1.4%
against 33.2% in unselected disease — and that non-overlap is the strongest
structure on its molecular axis. `shares-driver` is its opposite.

`to` may point at a node on **another axis** — that is the mechanism for
modelling categories that refuse to nest. In the tree view, relations whose
target is off-axis are skipped (there is nowhere to draw them); they still
appear as clickable links in the drawer, and clicking one switches axes.

### Prognosis / Therapy / Source

```js
prognosis: { relativeOutlook: '…', fiveYearNote: '…', caveat: '…', source: 'seer-breast' }
therapies: [{ name: 'Trodelvy', class: 'TROP2 ADC', setting: '1L metastatic', status: 'approved 2026-06-24',
              source: [{ nct: 'NCT02574455', label: 'ASCENT' }] }]
sources:   [{ label: 'TCGA (Nature 2012)', url: 'https://…' }]
```

`sources[]` vouches for a whole block. `source` attaches to one claim, and is
what the footnotes are built from — see below.

---

## `source` — footnotes on individual claims

A `sources[]` list under a node says "these papers stand behind everything on
this panel". That is not enough for a number. A reader who wants to check
"5-year relative survival 78.7%" against a list of four URLs has to guess which
one it came from, and most will not bother — which makes the list decorative.

So any field that states a figure may carry its own `source`, and the renderer
turns it into a numbered superscript with the reference printed at the foot of
the drawer.

**Four accepted forms**, plus an array of them:

```js
source: 'seer-breast'                              // an id from references[]
source: { ref: 'holman-2023', quote: '…' }         // the same, plus the sentence that states it
source: { ref: 'label-x', section: 'indications_and_usage', quote: '…' }   // the same, from a drug label
source: { label: 'FDA label', url: 'https://…' }   // a one-off, inline
source: { nct: 'NCT02574455', label: 'ASCENT' }    // a trial, linked to the registry
source: ['tcga-prad', { nct: 'NCT03511664', label: 'VISION' }]   // several
```

Prefer the **`references[]` id**: it is checked (an unknown id is an error, not
a warning), and the reference is written once and cited many times. Prefer the
**registry form** over a hand-typed URL where a trial is the source — the NCT
id is re-resolved against ClinicalTrials.gov on every pipeline run, so it
cannot rot into a dead link the way a pasted URL does.

**Where `source` is read.** The key is `source` where the object states one
thing, and `<field>Source` where an object states several things that come from
different places:

| Block | Keys |
|---|---|
| `prognosis` | `source` |
| `therapies[]` | `source` |
| `molecular.pathways[]` | `source` |
| `molecular.biomarkers[]` | `source` |
| `targets[]` | `source` (summary), `caveatSource`, `watchSource` |
| `targets[].excludedBy[]` | `source` (required), `noteSource` |
| `detection.stageOutcomes[]` | `source` |
| `detection.modalities[]` | `source` (all fields), or `harmsSource`, `catchesSource`, `missesSource`, `sensitivitySource`, `intervalSource`, `noteSource` |

### `quote` — where in the paper

The right PMID says which paper a figure came from; a `quote` says where in
it. Write the form `{ ref: '<references[] id>', quote: '<the sentence>' }`,
`ref` first, and copy the sentence as the paper prints it — an ellipsis (`…`)
may skip words, and each piece must still appear in order. The renderer prints
it under the footnote and on the marker's tooltip.

`python run.py references` (and so `tools/verify.py`) fails a quote unless:

- `ref` names a `references[]` entry that has a `pmid` or a `setid` (below) — a
  quote on a page the pipeline cannot fetch would look checked and not be;
- it states a number — a digit that starts a token, as in INV-7, so
  `receptor-1` or `PD-1` alone does not count; it is there to ground one;
- it appears in that paper's abstract, or its full text where Europe PMC serves
  one (open-access papers only). Case, spacing, typographic quotes and dashes,
  and the mid-dot decimal (`0·75`) are forgiven; anything else is not verbatim.
  A figure that only a paywalled paper's full text states cannot be quoted yet.

Every PMID in `references[]` is checked on the same run: it must resolve, and its
record must match the entry's first author, title, journal, year and url. So a
PMID entry's `label` is written `'Surname et al — title'` (or `'Group — title'`),
and its `journal` `'<MEDLINE abbreviation> <year>'`. See `pipeline/cxp/refcheck.py`.

**Quotes from a drug label.** A US label is the source for an indication, and a
figure in it (an age limit, a dose, a trial's result in section 14) can be
quoted too. Give the label's `references[]` entry a `setid` — its SPL set id,
the one in the openFDA url — and name the section the quote was read from, `ref`
first, then `section`, then `quote`:

```js
{ id: 'label-nivolumab-relatlimab',
  label: 'Opdualag (nivolumab and relatlimab-rmbw) US prescribing information — indication and mechanism of action (effective 8 June 2026)',
  journal: 'US FDA label, via openFDA', setid: 'b22c9d83-3256-4e17-85f7-f331a504adc6',
  url: 'https://api.fda.gov/drug/label.json?search=set_id:b22c9d83-3256-4e17-85f7-f331a504adc6' }

source: { ref: 'label-nivolumab-relatlimab', section: 'indications_and_usage',
          quote: 'OPDUALAG is a combination of nivolumab, … indicated for the treatment of adult and ' +
                 'pediatric patients 12 years of age or older with unresectable or metastatic melanoma.' }
```

`section` is the name of a field in the openFDA label record, as the raw JSON
spells it: `indications_and_usage`, `dosage_and_administration`,
`clinical_studies`, `clinical_studies_table`, `mechanism_of_action`, and so on.
The pipeline fetches the label raw from openFDA by set id (cached under
`pipeline/cache/`), and looks for the quote in that section only, normalised as
a paper's is. A label quote without a `section` fails, and so does a `section`
on a quote that cites a paper. The entry itself is checked on the same run: the
set id must resolve to exactly one label; a set id in its `url` must be the same
one; its `label` must begin `'Brand (generic) …'` with a brand or generic name
openFDA lists for that set id (what tells a wrong set id apart); and a date
written `effective 8 June 2026` or `effective 2026-06-08` must be that version's
effective date. An entry has a `pmid` or a `setid`, never both. openFDA serves
only the current version of a label: a revised label fails `effective` after
`--refresh references`, which is the cue to re-read its quotes.

Whether a quote actually supports the figure beside it is not checked by code.

A block-level `sources[]` entry that the footnotes already cite is **not**
printed again underneath them — the leftovers render under "Other sources for
this…", and a block whose every source got a number shows no list at all.

**What counts as needing one.** A claim needs a source when it contains a digit
that *starts* a token: `~78%`, `1,376`, `≥10`, `June 2026`. A digit inside a
name does not — `HER2`, `p53`, `CDK4/6`, `PD-L1` are names, not quantities, and
flagging them would teach the reader that the warning means nothing.

`Validate.dataset()` reports the result as `stats.checkable`, per kind and
overall:

```
checkable numeric claims: 61/61
  (pathway 6/6 · biomarker 12/12 · prognosis 10/10 · therapy 18/18
   · target 5/5 · stage 1/1 · modality 9/9)
```

---

## Validation

Runs automatically in the browser on boot (check the console). Optionally from
the CLI: `node tools/validate.mjs data/breast.js`.

**Errors** — the engine may misbehave:

- missing `id` / `name` / `axes` / `nodes`
- duplicate node, axis, marker or **factor** `id`
- `axis` referencing an unknown axis
- `parent` referencing an unknown node, or one on a **different axis**
- an axis with nodes but no root
- `related.to` pointing at an unknown node
- a node using a marker key not declared in `markers`
- non-numeric `prevalence`
- `baseline.lifetimeRisk` missing, non-numeric, or outside 0–100
- a `targets[]` entry with no `gene`, or two entries for the same gene
- a `targets[].excludedBy` entry with no `nodes`, an unknown node, nodes on different axes or one
  inside another, nodes on a `partition: false` axis, no `agents`, or a missing or unknown `source`
- an `excludedBy.except` with no `nodes`, no `agents`, or a node that is not inside the excluded ones
- a `profile.reportTerms[]` entry with no `term`
- `reportTerms[].goTo` naming an unknown node, or `goToLens` naming an unknown lens
- `reportTerms[].marker` not declared in `markers[]`
- a factor with no `modifiable` boolean
- a factor carrying **both** `rr` and `absoluteLifetime`
- a factor whose `rr` contradicts its `direction` (`increases` with rr < 1)
- `scope` that is neither `'overall'` nor a known node id
- `stratum` matching no `baseline.strata` label
- `referent` outside `population` / `unexposed` / `other`
- a convertible `rr` whose upper bound × its denominator exceeds 100% — and for an
  `unexposed` referent with no `stratum`, the message asks for one
- an axis `population` with no `label`, or a `share` outside 0–100
- an axis `shareOf` that is empty, starts with "of", or sits beside `population`
- `affects[]` pointing at an unknown node
- a `source` naming an id that is not in `references[]`

**Warnings** — renders, but the data is probably wrong:

- children not summing to their parent's `prevalence` (root level: not summing to ~100)
- some siblings missing `prevalence` while others have it
- `direction` / `evidence` / `kind` outside the documented sets
- no axis marked `default`, or more than one
- an axis with no nodes
- a trigger with no `category`
- a factor with `rr` but no `baseline` to convert against
- a factor with a numeric effect size but no `scope` (defaults to `'overall'`)
- a convertible `rr` with no `referent` (defaults to `'population'`)
- an axis `population` with no `short` name
- a factor with neither a `magnitude` string nor a numeric effect size
- a factor that `affects` nothing — it will not link back to the taxonomy
- `detection.stageOutcomes` shares not summing to ~100%
- a claim stating a figure with no `source`, whose block has no `sources[]` either
- an `excludedBy` node with no `prevalence` — the exclusion renders without saying how many it rules out

---

## Design rules worth keeping

1. **One axis per classification system that disagrees with the others.** Merging
   them hides exactly the disagreement worth showing.
2. **`related` is for cross-cutting truth.** If a category refuses to nest —
   HER2-low spans HR-positive and triple-negative — that is a relation, not a parent.
3. **Leave a field out rather than guessing.** Blank renders as absent; a wrong
   number renders as fact.
4. **Prevalences are for sizing.** Approximate is fine and expected; say so in
   the axis `note` rather than implying registry precision.
5. **Never show a relative risk without its absolute form.** The conversion is
   cheap and the omission is the failure mode this data is most often used to
   commit. Where a conversion would be invalid, say why in the UI rather than
   leaving the reader to assume one.
6. **Refusing to compute is a feature.** A personal risk score, a stacked
   multiplier, a survival estimate for an individual — the honest answer is the
   published figure plus what it is not.
