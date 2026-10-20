# Cancer Subtype Explorer

An interactive map of a cancer, read from either end: what moves an ordinary
person's risk and how the disease gets caught, or the full subtype taxonomy down
to molecular drivers and provenance.

**Breast cancer ships as the first dataset. The engine is cancer-agnostic:
adding another cancer means writing one data file, not touching the renderer.**

## Five lenses, one ladder

Detailed subtype material is abundant; what is missing is a comparative overview
aimed at someone deciding whether any of it applies to them. Those are not the
same question at different depths — they have different **subjects**:

| Lens | Subject | Question |
|---|---|---|
| **Start** | the disease | *what is this, how common is it, and where do I click?* |
| **Risk & detection** | people | *does this affect me, and what actually moves it?* |
| **Subtypes** | tumours | *what kinds are there, and how do they behave?* |
| **Targets** | molecules | *where is the protein broken, what binds it, how far along is that — and what is nobody doing?* |
| **Literature** | the frontier | *what is being published right now about the problems with those drugs?* |
| **Evidence** | the sources | *where did each number come from, and where do they disagree?* |

The lens picks what the canvas partitions. Within a lens, depth is **scroll order,
not a gate** — every drawer runs plain-language summary first and provenance last,
so a reader stops where their interest stops and nothing is withheld from anyone.

Every lens appears only when the dataset can feed it, so a cancer with no
`factors[]` simply never shows a risk button. **Start is the default landing**;
any existing link keeps its own lens, and the original four-part
`#breast/ihc/tnbc/treemap` form still resolves to Subtypes.

## The front page

`Start` answers, in order, the five questions someone arriving cold actually
asks: what is this, how common is it, how bad is it, how is it sorted out, and
where do I click. It ends in five cards, one per lens, each saying who it is for.

**"How is it sorted out" is where the page used to break.** It asserted that four
classifications exist without naming them, leaving the reader to work out that
the `Classify by` dropdown was the same four. Now the section renders one card
per entry in `axes[]` — the question it answers, what is physically measured,
what changes as a result, how many groups it splits into, and a button that
switches to it. Because the cards are generated from `axes[]`, the heading's
count, the card names and the picker cannot drift apart.

The section that follows it is the join, not a second list: **all four
classifications are read off one document**, so the page says what a pathology
report is before using the phrase as a heading, and each word on it names which
of the four it feeds. Two of them — grade and stage — deliberately name none,
because they are on every report and are not among the four. Claiming otherwise
to fill the field in would manufacture the confusion the section removes.

**Its hard problem is the numbers.** SEER's headline figures have four different
denominators:

| Figure | Denominator |
|---|---|
| 132.5 new cases per 100,000 | US women, per year, age-adjusted |
| 18.9 deaths per 100,000 | US women, per year, age-adjusted |
| 13.0% lifetime risk | US women, over an entire life |
| 91.9% five-year survival | of those diagnosed, relative to a matched population |

Lining those up in a tile row without saying so invites *"91.9% survive, so 8.1%
die"* — wrong twice: it is **relative** survival, and it is conditional on
diagnosis. So no figure is ever drawn without its denominator attached, and the
page states plainly that they do not divide into one another.

The same care applies to the localised five-year figure, which SEER now reports
as **100.0%**. That does not mean nobody dies of it — relative survival compares
against a matched general population, and can even exceed 100%. The page says so.

US figures are scraped from SEER; the world column is modelled GLOBOCAN data,
kept visually separate and explicitly labelled not comparable.

### It checks itself against the source

`run.py audit` now diffs the curated front-page figures against the live SEER
page, the same way it already diffs driver frequencies against cBioPortal. That
check immediately caught real drift the first time it ran — SEER had moved
Distant five-year survival to 33.8% and Unstaged to 70.6%, while `breast.js`
still carried 31.9% and 58.0%. Those were transcriptions with no judgement in
them, so they were re-synced; the check is what stops them going stale silently
again.

The evidence lens surfaces what was previously only on disk: the cohort behind
every computed figure, the PAM50 × IHC concordance matrix — the quantitative form
of the "why several axes" argument, showing that only 83% of basal-like tumours are
triple-negative and that HER2-enriched scatters across all four receptor groups —
every curated-vs-computed gap ranked by size, and all citations in one list.

## Run it

Double-click `index.html`. That's the whole setup — no server, no build step,
no npm install, no CDN. It works offline.

> Datasets are self-registering `<script>` files rather than fetched JSON
> precisely so this works. Browsers block `fetch()` from `file://` under CORS,
> which would otherwise force everyone through a local web server.

### From a published copy

The public repository is a snapshot of a private one, made by `tools/publish.py`,
which refuses to publish anything that names a person, a machine or a secret.
Two things differ from the author's own checkout. The curated drug tables and
landscape markdown sit in `cancer_research/` inside the repository, where
`pipeline/run.py` looks first (the author keeps them in a sibling folder). And
two inputs of `tools/verify.py` are deliberately not published: `invariants`
reads the project's working rules (`CLAUDE.md`), and `sitescan` reads a private
list of strings that must never ship. In a clone both report FAIL. They are
missing their input, which says nothing about the data. `validator` needs
Windows (`mshta`), and `render` needs Chrome, Chromium or Edge (`CX_CHROME`
names one). The other checks run as they do for the author, and the
first run fetches what `refs` and `audits` need, because the cache is not
published either.

Code is under the MIT licence (`LICENSE`). The data is not: every figure keeps
the terms of the source it came from, listed in `ATTRIBUTION.md`.

## What you get

| Control | What it does |
|---|---|
| **Lens** | Start, Risk & detection, Subtypes, Targets, Literature or Evidence. Changes what the canvas shows. |
| **Start** | What the disease is, how common, how it is classified, and which lens to click. |
| **Classify by** | Switches the classification axis (subtypes lens only). Breast has five: receptor IHC, PAM50 intrinsic, histology, HER2 expression level, and disease state. |
| **Ranked** | Risk factors on a ratio axis, grouped by whether you can change them. |
| **Detection** | Survival by stage at diagnosis, screening modalities, what each one misses. |
| **Treemap** | Nested rectangles, area ∝ share of cases. Click a cell to zoom in; click the background or a breadcrumb to zoom out. |
| **Tree** | Branching hierarchy, circle size ∝ share of cases. Dashed arcs show cross-cutting relationships. |
| **Table** | The same data as rows — the accessible fallback, and the fastest way to scan everything at once. Present in both lenses. |
| **Relationships** | Toggles the dashed cross-cutting edges in the tree view. |
| **Search** | Lists every match in the current cancer under the box, grouped by kind: subtypes on every axis, risk factors, targets, drugs, glossary terms and papers. A result opens where it lives, crossing lenses with a "← back" pill, and says which field matched when it is not the name. Matching is by words, so "triple negative" finds "Triple-negative". The treemap, tree and ranked views also dim what does not match. |
| **On a phone** | Below 640px the cancers become tabs in a strip held at the top, beside the search button; the lenses become a bar fixed to the bottom; search opens as a full-screen sheet. Classify by gives way to the Sorted-by switcher at the head of the Subtypes lens, which is the same choice. |
| **Targets, on a narrow screen** | Up to 1000px, where a target's card sits under the whole lens, every target also gets a button under the landscape chart (its dots are too close to tap), and opening one from a button, a dot or a gap table scrolls straight to the card. "↑ Back to …" at the top and end of the card returns to the place it was opened from. |

Click any node for marker chips, trigger causes with effect sizes and evidence
strength, molecular drivers with frequency bars, pathways, biomarkers, prognosis,
therapies, related subtypes and sources. Click any risk factor for its effect
size, its conversion into absolute terms, and the subtypes it pushes toward —
which is also the hand-off into the taxonomy.

The URL hash tracks state — `#breast/risk/-/alcohol/ranked`,
`#breast/subtypes/ihc/tnbc/treemap` — so any view is linkable. The older
`#breast/ihc/tnbc/treemap` form still works.

## The two rules the risk lens enforces

These are the reason this view exists rather than linking out to a health site.

**Every relative risk is also shown in absolute terms.** A dataset declares a
`baseline` (breast: ~13% lifetime, US women) and the renderer converts against it:

```
Alcohol            ↑  ~7–10% per drink/day        strong
                      about 13%  →  about 14%
```

An RR presented alone reads as an absolute risk to almost every non-specialist.

**The conversion has two guards, and they catch different things.** `scope` marks
an RR measured against one subtype rather than the whole disease. `outcome` marks
an RR that multiplies the chance of **dying** of the cancer rather than the chance
of **getting** it — and the baseline is a risk of diagnosis, so multiplying by it
would produce a number that is neither. Both are refused, and the UI says which
guard fired. `stratum` switches the denominator where it differs, so Klinefelter's
RR ~20–50 converts against the 0.13% male baseline, not the 13% one.

The second guard exists because the first cannot see the problem: prostate's
ancestry disparity is ~1.67× the incidence and ~2.06× the mortality, both
whole-disease figures, and only the first is convertible.

**A third guard, `referent`, asks relative to whom.** Lung forced it. A relative
risk against never smokers, multiplied by a baseline that is mostly made of
smokers, counts the exposure twice: in Villeneuve & Mao's figures 13.2 × 9.6% =
127%. An RR relative to the whole population converts exactly; one relative to
the unexposed converts only against a stratum for the unexposed group, or is
shown as a bound ("at most about 20%"); one relative to a group outside the
population (low-dose Hodgkin survivors) is not converted. Any conversion that
would exceed 100% is a validator error. Lung's smoking rows therefore carry
smokers' own lifetime risk beside never smokers', and nothing is multiplied.

**The app will not compute a personal risk score.** Relative risks from different
studies do not multiply; the risk lens says so where a reader would try. See the
non-goal in SCHEMA.md.

## The targets lens

For each of 22 actionable proteins, five sources are joined into one chain:

| Link | Source |
|---|---|
| what the protein is, and its domain architecture | UniProt (reviewed human entries) |
| where it is altered, and how often | cBioPortal, `proteinPosStart` per mutation |
| what it looks like | RCSB PDB — a curated structure choice, verified on fetch |
| what binds it and how far along that is | `../cancer_research/pipeline.csv`, joined to ClinicalTrials.gov by NCT id |
| what the evidence says | CIViC, levels A–E |

A domain ribbon with lollipops at recurrent residues is drawn in the same vanilla
SVG as everything else. Structure images are **static deposited renders** fetched
once and committed under `data/img/` (~1.2 MB for 20 entries). That is a
deliberate trade: every in-browser 3D viewer is 0.5–1 MB of JavaScript and would
end the no-dependency, no-CDN, works-offline, CSP-safe promises at a stroke.
Deep links to RCSB and AlphaFold cover the interactive case.

### Three rules that keep it honest

**Not every target is selected by mutation.** Each carries a `basis` —
`genomic`, `expression`, `pathway` or `synthetic-lethal` — and only genomic ones
appear on the alteration-frequency axis. TROP2 shows 0% altered and has eight
programmes, because Trodelvy binds a protein that is *expressed*, not mutated.
Ranking targets purely by mutation rate would conclude nobody should drug TROP2
or ER, which is the reverse of the truth.

**The target is not always the broken gene.** Olaparib inhibits PARP1, which is
unremarkable in these tumours; the lesion is in BRCA1/2. Genes reached this way
are listed as *"reached only through a partner"* rather than as untargeted.

**Some absences are the cohort, not the biology.** ESR1 shows 2 mutations in 507
sequenced tumours despite seven approved agents — because Y537S and D538G are
*acquired* under endocrine therapy in metastatic disease, and TCGA is primary
tumours. The lens flags this as a blind spot rather than letting an empty track
imply the target is unimportant.

### The landscape chart, and the misreading it invited

Programs against alteration frequency, with the bottom-right shaded. It was
labelled with **one** corner — *"the interesting corner: frequently broken,
nobody working on it"* — and the obvious inference from that is wrong, because
"nothing in development" is the whole bottom **row**, not the corner. Six of the
ten plotted proteins sit on it.

Three changes, all aimed at that:

- The band is now **bounded on the left** by a dashed edge at the threshold and
  labelled *"altered above 29% · at most one program"*, so it reads as a region
  rather than a caption on the axis.
- A four-cell key names each region **including the boring one** — bottom-left is
  rarely broken *and* undrugged, which is the correct allocation of effort and has
  nothing to argue about. Naming it is what makes bottom-right mean something.
- The key is **built from the data**, not written as four idealised quadrants,
  because on this cohort the top-left is empty. An invented example there would
  be teaching a chart that is not on screen.

The key also states the chart's own limitation: it looks bottom-heavy partly
because **8 of the most heavily worked-on targets — 35 programs between them —
cannot be plotted on an alteration-frequency axis at all**. TROP2 and ER are
never mutated; they are selected by protein expression. Those sit in the note
under the chart, and the chart understates how crowded the field is.

### What it surfaces

Beyond the per-target page, five computed gap surfaces — the part meant to lead
somewhere:

- **Altered often, nothing against it** — TP53 (82.8% of basal-like), MYC
  (31.5%), FGFR1 (18%), RB1 (6.5%)
- **Reached only through a partner** — CCND1 via CDK4/6, BRCA1/2 via PARP1,
  PTEN via AKT1
- **Approved elsewhere, altered here** — PIK3CA is mutated in 40.4% (23/57) of
  HER2-enriched tumours, while alpelisib is indicated for HR+/HER2−. Stated
  across two axes on purpose and labelled as a question, not a recommendation
- **Evidence without a programme** — CIViC level C/D genes with no tracked agent
- **What this cohort cannot see** — the ESR1 case above

These are arithmetic over sourced numbers. None of it is advice.

## The literature lens

A trial register is already history — an agent reaches one years after the idea.
This lens is the rung above the drug pipeline: **595 papers since 2024** (breast, fetched 2026-09-13), pulled
from Europe PMC (PubMed + PMC + preprint servers, no API key), each attached to
a specific problem with a specific drug.

Three relationships, not a keyword sweep:

| Kind | What it finds |
|---|---|
| `resistance` | why an agent stops working — CDK4/6 with RB1 loss and CCNE1, PARP with reversion mutations, endocrine with ESR1 Y537S |
| `toxicity` | the side-effect that limits it — T-DXd with interstitial lung disease, alpelisib with hyperglycaemia, trastuzumab with cardiotoxicity |
| `new-approach` | other modalities aimed at the same target — degraders, bispecifics, molecular glues, radioligands |

Each search pairs an agent with **its own** known problems rather than a generic
"resistance" query, and every search is scoped to breast cancer. A curated
vocabulary covers 13 agent classes.

### Five rules the renderer enforces

Most of this material is preclinical, and *"cured in mice"* is the most
misreported category of science writing there is. So:

1. **No bare titles.** Evidence tier and species sit in the same block as the
   title — `PREPRINT · not peer reviewed · cell line`, never a footnote.
2. **`unclear` is printed as `unclear`.** 41 papers could not be classified and
   say so rather than being guessed into "human".
3. **Nothing is ranked by promise**, because it cannot be. Citation counts are
   zero for recent work and no rule predicts which mechanism will succeed. There
   is deliberately no "most promising" sort.
4. **Every row states which term actually matched** — checked against the title
   and abstract, not just the query. Only 5 of 595 matched on full text alone,
   and those say so.
5. **It is a dated snapshot.** The fetch date is in the overlay header and on
   the lens; literature moves daily, unlike SEER or TCGA.

## The glossary

The app renders controlled vocabularies everywhere — a cell says `ADC`, a badge
says `preprint`, a chip says `synthetic-lethal`. Those are precise words doing
real work, invisible to anyone who knows them and opaque to everyone else.
"Modality: ADC" defines nothing.

**71 shared terms** in `js/glossary.js` plus whatever the loaded dataset adds —
80 with breast — grouped into six vocabularies, reachable three ways:

- **On controlled vocabulary.** Modality, phase, evidence tier, species flag,
  basis chip and alteration metric all carry a dotted underline and open a
  plain-language definition on click. These are known positions with known
  values, so the lookup is exact and cannot mislabel anything.
- **In prose, where an author marked it.** Any string passed through
  `Render.prose` may write `{{pathology report}}` or `{{duct|ducts or lobules}}`.
  The front page's opening paragraphs, the classification section and every
  report-term card use this.
- **In full**, at `Start → Glossary`, grouped and browsable.

Every entry is a plain sentence plus a **why it matters here** line naming where
in this app the term appears and what it changes. A definition without that is a
dictionary entry; the point is to unblock someone mid-page.

Three rules held throughout:

**The engine's definitions must be true of any cancer.** A definition that names
ER, PAM50 or a mammogram is a fact about breast, not about cancer, so it lives in
`data/breast.js` under `glossary` and travels with that dataset. Nine terms moved
out when the second dataset made the distinction load-bearing — HER2, PAM50,
triple negative, receptor status, SERD, Ki-67, dense breast, duct, HER2-low — and
another thirty had their examples handed back to breast the same way. A dataset
overrides a whole entry by supplying its own `d`, or just the "why it matters
here" line by omitting one. See SCHEMA.md → Glossary.

**Where a term is routinely misread, the misreading is named.** *Relative
survival* says outright that 100% does not mean nobody dies. *Relative risk* says
it multiplies your chances rather than being your chances. Those two mislead more
readers here than any other words on the site.

**Lookup is by exact token, never by scanning prose.** "Stage" is also a verb,
"primary" means two different things here, and gene symbols collide with ordinary
English — auto-linking text would produce confident wrong definitions, which are
worse than absent ones. The `{{…}}` markers are not a loophole in that rule but
an application of it: a person decided that *this* occurrence of *this* word, in
*this* sentence, is where a reader gets stuck.

A marker with no entry behind it renders as plain text — correct, and invisible,
which is how a page of dead markers would quietly accumulate. So both halves are
checked: the **validator** walks the dataset for them, and **`Render.prose`**
warns to the console for markers written in renderer ledes, which the dataset
walk cannot see.

### Drugs are a view, not an axis

A recurring question: should drugs be a fifth classification axis? **No.** An
`axis` is a tree over tumours whose `prevalence` sums to 100% and the validator
enforces it. One agent serves several subtypes (T-DXd covers HER2-positive,
HER2-low and HER2-ultralow) and every subtype has several agents — it is
many-to-many, so drugs partition nothing. Forcing them into an axis would break
the sum rule and imply a nesting the biology does not support, which is the
failure `SCHEMA.md`'s "one axis per classification system" rule exists to
prevent. Same reasoning that kept risk factors out.

They are a **view** inside the Targets lens: `[ Targets | Drugs ]`.

### Side effects come from the FDA label, not from me

`run.py targets` now also queries **openFDA** and attaches, per agent:

- the **boxed warning** verbatim — Enhertu: *INTERSTITIAL LUNG DISEASE and
  EMBRYO-FETAL TOXICITY*; Trodelvy: *NEUTROPENIA AND DIARRHEA*
- the **named warnings** from WARNINGS AND PRECAUTIONS
- the label's own **most-common-reactions** sentence, with percentages where it
  gives them

In breast, 40 of 51 agents have a US label and 18 carry a boxed warning
(2026-10-17). The other 11 are investigational and say so explicitly — *no
approved label exists yet*, which is a different statement from *no side
effects*, and the UI makes that distinction rather than showing a blank.

That distinction was wrong for a while. On 2026-10-17 openFDA was still serving
TAGRISSO's, TECENTRIQ's and 17 other labels, but with their harmonised `openfda`
block empty, and both searches the pipeline ran read only that block. Twenty-four
agent rows across the five cancers lost their label, and the page called those
approved drugs investigational. The lookup now falls back to the label's own
product line ("TAGRISSO osimertinib …"), taken only when that line names the
product, and every record says which search found it. The page no longer infers
"investigational" from a missing label. It reads each agent's phase: an approved
agent without a label says openFDA returned none, and a lookup that failed says
it failed.

This also turns the Literature lens's curated toxicity vocabulary into something
sourced: my hand-written guess that T-DXd's limiting toxicity is interstitial
lung disease is now backed by the boxed warning on its own label.

**A boxed warning is the one place the reserved status palette is honest**, since
it is a severity statement from the regulator rather than an inference of ours.

Three extraction bugs worth knowing about, all now fixed: brand-name lookup
initially matched the *letrozole co-pack* for ribociclib and the *subcutaneous*
product for pembrolizumab, so matching now ranks single-ingredient products
first; and the warnings regex was pulling `Table 1 · Table 2` out of Herceptin's
label as if they were warnings.

### How the lenses reach each other

Material is only useful if it interconnects, so the same paper and the same gene
are reachable from wherever you happen to be standing:

| From | To | How |
|---|---|---|
| a driver gene in any subtype drawer | that gene's **target page** — structure, hotspots, what binds it | the gene name is a button when a target page exists; plain text when it does not |
| a **druggable** driver | the agents that actually hit it | listed inline under the bar, with `!` where the label carries a boxed warning; a gene flagged druggable with nothing against it says so |
| a subtype (say HR+/HER2−) | **papers on the agents used in it** | the pipeline maps gene → agents → the subtypes those agents treat, so 406 papers reach HR+/HER2− |
| a target (say PIK3CA) | **papers on its drugs' problems** | *"What is being published now"* in the target drawer |
| a factor in the Risk lens | the **subtypes it pushes toward** | `affects[]` |
| a primer term on the Start page | the node or lens that explains it | `goTo` / `goToLens` |
| a classification card on the Start page | the **Subtypes lens on that axis** | `ctx.setAxis`, one card per entry in `axes[]` |
| any axis in the Subtypes lens | **the same tumours sorted another way** | the lens head lists the others as one-click pills |
| a word on the pathology report | **which classification it feeds** | `reportTerms[].axis` — absent where the honest answer is "none" |
| the age chart on the Start page | **the other 21 risk factors** | a hand-off line, because age is the only factor that page shows |

A parent subtype inherits its children's papers, so selecting a top-level box is
never empty just because the agents were mapped one level down.

Each lens also opens by naming **the rung below it**, so no page starts cold:
Targets opens *"the Subtypes lens says what kind of tumour it is; this one asks
which single protein is broken"*, Literature opens *"the drug pipeline in the
Targets lens is already history"*, Evidence opens *"every other lens shows you a
number; this one shows where it came from"*. Provenance sentences — the five
database names, the label-text caveat — now follow that rather than replacing it.

### Where the ladder closes

Open **MYC** in the Targets lens. It is amplified in 31.5% of basal-like tumours
and the drug pipeline has *nothing* against it — a transcription factor with no
pocket. Scroll to *"What is being published now"* and there are 25 papers,
including a stapled-peptide MYC degrader and ClpP activators, both flagged
`MOUSE`.

That is the whole point of the vertical: the pipeline says nothing exists, the
literature says people are trying anyway, and the badge tells you it is still in
animals.

## Attribution and citation

`ATTRIBUTION.md` is generated by `run.py attribution` from a registry of all
**12 sources**, and the same data appears in the Evidence lens so a reader can
see whose numbers they are looking at without leaving the app.

Each source carries a `confidence` — `stated` (the source publishes this term and
it is quoted), `likely` (its category makes it near-certain), or **`verify`** (the
terms have not been read for this project). `verify` is not a placeholder to be
quietly upgraded. Five sources currently sit there. WHO ICD-11 was the sixth,
and the one with the tightest terms, until it was dropped on 2026-10-17: its
licence puts "mapping or producing crosswalks between other classifications and
terminologies" outside the licence, which is what a node-to-code table is, and
OncoTree already codes the histology nodes.

Redistribution is tracked separately from licence, because they are different
acts. This repo **commits** 20 RCSB structure images (~1.2 MB) rather than
linking them — the only place third-party binary content is shipped.

**None of this is legal advice**, and the file says so. It records what each
source states so a human can check the ones that matter.

### Citations are counted, not assumed

`run.py audit` now reports citation coverage alongside the numeric checks:

```
citation coverage (17 references declared):
  risk factors    22/22
  triggers        57/57
  therapies        0/29    <-- uncited claims
```

Citations live in a top-level `references[]` and are cited by id, so a URL is
declared once and a dangling id is a validator error rather than a plausible
looking link. Every PMID and DOI was looked up against Europe PMC rather than
typed from memory.

The therapies row is the honest remaining gap — 29 approval statuses currently
rest on prose. It is visible precisely so it cannot be forgotten.

## Why detection is not optional

Of the 22 risk factors in the breast dataset, three are modifiable lifestyle
levers. The rest are age, sex, ancestry, germline variants and reproductive
history. A prevention-framed page built on the factor list alone would tell people
they control far more than they do — while the dataset's own prognosis text says
*"stage at diagnosis dominates subtype in predicting outcome."*

The detection view carries that: 100.0% five-year relative survival for localised
disease against 33.8% for distant. That gap is wider than any subtype difference
and far wider than any modifiable factor in the file.

It also carries the other half, which is the part usually left out. **Screening
is a trade**, and `tradeoff` renders both sides on one denominator — per 1,000
women screened biennially from 40 to 74, the USPSTF's own modelling gives 8.2
breast cancer deaths averted against 1,376 false positives and 14 overdiagnosed
cancers. Listing benefits without harms is a validation *error*, not a style
preference: a block with only the upside is an advertisement. Where the sources
disagree about the size of the benefit — and for mammography they disagree a lot —
`disagreement` says so instead of picking a winner.

And a survival table can be accurate and still mislead through its **window**.
Prostate reports 100.0% five-year survival for localised *and* regional disease;
every figure is right, and the reader concludes lymph-node spread is harmless. So
the validator warns when the top two stages are within a percentage point and the
dataset has not said what its horizon does not capture.

## Why several axes instead of one tree

Breast cancer has several valid classification systems that genuinely disagree.
About 20% of triple-negative tumours are **not** basal-like. HER2-low cuts
across hormone-receptor status rather than sitting under it. Lobular histology
correlates with ER-positivity without defining it.

A single merged hierarchy would have to pick winners and imply a nesting the
biology does not support. Instead each classification system is its own tree,
and cross-cutting truths are explicit `related` edges you can see and click.
This is not breast-specific — most cancers have the same problem.

The cost of that decision is a reader who does not know why there are several
options in a dropdown, and it is paid twice: once on the front page, where each
axis gets a card saying what it asks, measures and decides, and again at the top
of the Subtypes lens, which names the active one, says how many there are, and
offers the others. Both are built from `axes[]` — see **SCHEMA.md § Axis** for
the required fields.

Breast's fifth axis is a different kind. The first four sort the tumour; the
**disease-state** axis sorts the course of the disease — never metastatic,
metastatic at diagnosis, or returning as metastatic disease — and it is the only
place the site can show what treatment selects for: ESR1 is mutated in 0.4% of
TCGA primary tumours and 13.0% of MSK metastatic biopsies, while TP53 and PIK3CA
do not move.

Two axis fields exist because lung broke the assumption that every axis
partitions the whole disease. **`population`** names the part an axis covers —
lung's driver classes are shares of adenocarcinoma, its PD-L1 bands of advanced
non-small-cell disease — and every share on that axis then reads "of
adenocarcinoma" rather than "of cases". **`partition: false`** marks an axis of
compared cohorts rather than shares: lung's before- and after-targeted-therapy
nodes share 32 patients, so neither carries a prevalence, the cells are drawn
equal, and the legend says size means nothing there.

## Adding a new cancer

Breast, prostate and lung were each added this way; the examples below use a
hypothetical `colorectal`.

1. Copy `data/_template.js` → `data/colorectal.js`
2. Fill in `markers`, `axes`, `nodes` (see **SCHEMA.md**). Each axis needs
   `asks` / `measures` / `decides` as well as `label` — those three are what the
   front page and the lens head are built from, and the validator warns without
   them.
3. Declare the words your cancer owns in `glossary` (SCHEMA.md → Glossary). The
   engine's 71 terms are cancer-neutral; anything that names your biology has to
   travel with your dataset, or a reader of a different cancer gets served your
   definitions.
4. Add an entry to `pipeline/cxp/cancers.py` if you want computed figures: the
   cBioPortal study, the genes, and — this is the one that bites — the map from
   the cohort's own subtype labels to **your node ids**. A typo there raises
   nothing; the overlay simply has no numbers for that subtype. Then:
   ```
   python run.py --cancer colorectal molecular
   python run.py --cancer colorectal emit
   ```
5. Add one line to `index.html`, after the engine scripts:
   ```html
   <script src="data/colorectal.js"></script>
   ```
   Plus `<script src="data/colorectal.facts.js"></script>` if you ran the pipeline
   for it — the overlay is optional and the viewer works without it.
6. Reload. The cancer picker appears automatically once a second dataset is registered.

Validation runs on every boot and prints a report to the browser console. Lung's,
as it stands (stats abridged):

```
[validate] lung: 0 error(s), 0 warning(s)
  stats   {"nodes":27,"axes":4,"markers":8,"factors":15,"references":27,"targets":13,"reportTerms":9,"stages":4,"modalities":4,"relations":13,"drivers":44}
```

`factors`, `stages` and `modalities` are 0 for a dataset that has no Book I
material — the risk lens simply does not appear, and the rest works as before.

Note that `prevalence` is percent of the **whole cancer**, not of the parent — a
node's children sum to that node's own value. See SCHEMA.md.

Optionally from the command line, if you have Node:

```
node tools/validate.mjs data/colorectal.js
```

Node is **not** required — the CLI wrapper just reuses `js/validate.js`, which
already runs in the browser.

## Layout

```
index.html            shell — zero cancer-specific content
css/explorer.css      theme-aware styles (light + dark both explicitly designed)
js/layouts.js         squarified treemap, tidy tree, ranked log rows — pure geometry, no DOM
js/validate.js        schema checks; shared by browser and CLI
js/facts.js           merges the pipeline's computed overlay onto a dataset
js/render.js          SVG drawing, both drawers, legends, tooltips, risk arithmetic
js/explorer.js        registry, state, lens + axis switching, hash routing
data/_template.js     scaffold — copy this
data/breast.js        first dataset — curated
data/breast.facts.js  generated overlay (pipeline/run.py emit) — optional
data/breast.targets.js generated overlay (pipeline/run.py targets) — optional
data/breast.literature.js generated overlay (pipeline/run.py literature) — optional
data/prostate.*.js    second dataset — curated file plus the same three overlays
data/lung.*.js        third dataset — curated file plus the same three overlays
tools/chartaudit.py   re-derives every chart's geometry and checks its claim
tools/rendercheck.py  the site in headless Chromium: phone layout, search, hover tips, Targets taps (+ rendercheck.js)
tools/cdp.py          drives that browser over the DevTools protocol, stdlib only
data/img/             structure renders from RCSB, public domain (~1.2 MB)
tools/validate.mjs    optional Node CLI wrapper
SCHEMA.md             the data contract
```

## Curated figures vs computed ones

`data/breast.js` is hand-written and holds judgement. `data/breast.facts.js` is
generated by `pipeline/run.py emit` and holds only numbers with an explicit
numerator and denominator. `js/facts.js` joins them at boot.

The merge **never overwrites a curated figure.** It attaches the computed one
beside it, so where the two disagree the drawer shows both and labels the gap:

```
MYC  amplification                    40%
     ████████████░░░░░░░░░░░░
     COMPUTED 31.5%  29/92 · amplification  (-8.5 pts vs curated)
```

Silently preferring one number would resolve the disagreement in favour of
whichever file was written last and hide the fact that there was ever a
question. Chasing those gaps down is what `pipeline/reports/<cancer>.audit.md` is for.

Computed drivers cover the **PAM50 axis** — cBioPortal reports them by
intrinsic subtype — and **two disease-state nodes**, each computed from its own
cohort: TCGA's primary tumours and MSK's metastatic biopsies. The IHC, histology
and HER2-expression axes show curated figures alone. OncoTree codes attach to the histology nodes.

The overlay is optional. Delete the `<script>` tag, or never run the pipeline,
and the viewer renders the curated dataset exactly as before.

No dependencies. The treemap (squarified, Bruls et al. 2000) and tree layouts
are ~110 lines of vanilla JS between them — a charting library would have added
~250KB and broken the strict-CSP case for no benefit at this scale.

## Every chart, audited against what it claims

Nine charts were re-derived from the data and checked against the invariant each
one states. Four were lying, all in the same direction — **flattering small
values by normalising to whatever the largest thing on screen happened to be**.

| Chart | Was | Now |
|---|---|---|
| **Tree** circles | `r = 4.5 + √p × 1.9`, clamped at 17. Area per unit share varied **23×**, and 100%, 70.1% and 55.7% drew the **identical** circle — while the legend said "Circle size ∝ share of cases" | `r = 1.7 × √p`, so **area** is proportional. Exact above 4.2%; below that a 3.5px floor binds, and the legend says so |
| **Driver bars** in subtype drawers | width = `frequency ÷ that drawer's maximum`. TP53 at 80% in TNBC and PIK3CA at 45% in ER/PR-positive both drew a **full-length bar** | fixed 0–100% domain, with the grey track as the reference. Comparing one drawer against another is the point of the app |
| **Alteration frequency** in target drawers | same per-panel normalisation, so TROP2's 1.8% and ERBB2's 70.9% would both fill the track | fixed 0–100%. TROP2 being flat is the finding, not a rendering fault |
| **Lollipop stems** | `√n` on a **length** channel. PIK3CA H1047R (n=75) drew as 6.1× the height of R88Q (n=2) when the true ratio is **37.5×** | linear in n. The head keeps `√n` for its radius, which makes its *area* linear — the correct pairing, not an inconsistency |

Passing unchanged: treemap area (children sum to parent on all four axes), the
ranked risk log axis (×0.75 and ×1.33 land equidistant from the origin; all six
factors with no comparable effect size are shown, not dropped), stage-survival
bars, the age distribution, and the concordance matrix (cells sum to exactly the
496 tumours the header claims).

Two second-order defects fell out of the fixes and were repaired:

- Linear stems put most lollipops at the 8px floor, so their labels bunched into
  one band and a neighbouring **head printed through a label**. Label placement
  now seeds its collision map with every head, not just the other labels — the
  same rule the landscape scatter needed.
- The stage-survival bars happened to be exact only because SEER's localised
  figure is currently 100.0. The domain is now literally 100, so the next time
  the source moves the bars do not silently inflate.

**Where a chart departs from proportionality, the legend says so** rather than
stating the ideal. The tree names its floor and the threshold it binds below;
the treemap admits nested cells lose the parent's label strip; the protein track
says which stems are floored and to read those from the head instead.

`tools/chartaudit.py` recomputes all of this from the data files and prints
`no problems found` or the list. Worth re-running after any layout change:

```
python tools/chartaudit.py
```

It needs no dependencies — it parses the JS data files directly, since there is
no JS runtime on the machine this was built on.

## Colour

The categorical palette is the validated reference instance: fixed slot order,
never cycled, chosen so adjacent pairs stay distinguishable under colour-vision
deficiency. Colour follows the entity's top-level group, never its rank in the
current view — so zooming or searching never repaints the survivors.

Because a treemap puts arbitrary pairs of cells side by side, **every cell is
directly labelled** and a table view is always available. Identity is never
carried by colour alone. Label ink is chosen per-cell by measured luminance
rather than assumed white.

The palette is defined twice — in `css/explorer.css` as custom properties and in
`js/render.js` as hex arrays. The duplication is deliberate: contrast maths needs
the resolved hex, and `var()` cannot be read back out of an SVG presentation
attribute. Keep the two in sync.

## Data provenance

Breast molecular driver frequencies come from the TCGA *Comprehensive molecular
portraits of human breast tumours* (Nature 2012,
[open access](https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/)). Therapy and
approval status was verified 2026-07-26 against FDA announcements, company IR
releases and ClinicalTrials.gov — see `../cancer_research/SOURCES.md` for the
full citation list, and `../cancer_research/pipeline.csv` for the drug-level data.

Prostate's molecular figures come from TCGA's prostate study (Cell 2015), with
castration-resistant and neuroendocrine disease from SU2C/PCF and WCM cohorts;
its drug rows are in `../cancer_research/prostate-pipeline.csv`.

Lung's driver axis is computed from MSK's `lung_msk_2017` (Jordan et al, Cancer
Discov 2017; 860 patients), histology figures from TCGA pan-lung and the Cologne
small cell cohort, and the before-and-after therapy contrast from MSK's 2023
metastatic adenocarcinoma cohort. Histology shares are derived from ACS Cancer
Facts & Figures 2023, Figure S2 (derivation in the `data/lung.js` header). Every
NCT id in `../cancer_research/lung-pipeline.csv` was resolved against
ClinicalTrials.gov, and every approved agent checked for a lung indication on its
openFDA label, on 2026-09-13.

Prevalence figures are approximate. They exist to size the treemap and vary by
population, registry and screening intensity — they are not registry statistics.

## Caveat

Research and educational reference only. Not medical advice. Treatment decisions
belong with a treating oncologist.
