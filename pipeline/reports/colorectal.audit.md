# Audit — computed facts vs hand-written `data/colorectal.js`

**Cohort:** `crc_msk_2017` — Metastatic Colorectal Cancer (MSK, Cancer Cell 2018) (n=1099 patients, from 1134 samples)  
**Hand-written file:** `data/colorectal.js`  
**Parsed:** 27 nodes, 87 drivers

## Summary

| Verdict | Count | Meaning |
|---|--:|---|
| MATCH | 81 | within ±2 percentage points |
| CLOSE | 0 | within ±10 pp |
| DIVERGENT | 0 | more than ±10 pp apart |
| LOW N | 6 | denominator < 20; not evidence either way |
| NOT COMPUTED | 0 | no comparable computed metric |

## Driver frequencies

| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |
|---|---|---|--:|--:|---|--:|---|---|
| rep-pole | POLE | mutation | 100.0% | 100.0% | 10/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| rep-pole | APC | mutation | 100.0% | 100.0% | 10/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| rep-pole | PIK3CA | mutation | 80.0% | 80.0% | 8/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| rep-pole | MSH6 | mutation | 70.0% | 70.0% | 7/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| rep-pole | TP53 | mutation | 40.0% | 40.0% | 4/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| rep-pole | KRAS | mutation | 30.0% | 30.0% | 3/10 | +0.0 | LOW N | denominator 10 < 20; computed % is not meaningful |
| site-rectum | APC | mutation | 78.0% | 77.5% | 107/138 | +0.5 | MATCH |  |
| rep-dmmr | FBXW7 | mutation | 37.0% | 36.5% | 23/63 | +0.5 | MATCH |  |
| rep-pmmr-other | NRAS | mutation | 8.0% | 7.5% | 29/386 | +0.5 | MATCH |  |
| cms2 | APC | mutation | 83.0% | 82.5% | 52/63 | +0.5 | MATCH |  |
| cms3 | BRAF V600E | mutation | 15.0% | 14.5% | 8/55 | +0.5 | MATCH |  |
| cms4 | APC | mutation | 70.0% | 70.5% | 43/61 | -0.5 | MATCH |  |
| cms4 | TP53 | mutation | 52.0% | 52.5% | 32/61 | -0.5 | MATCH |  |
| drv-her2-amp | TP53 | mutation | 85.0% | 84.6% | 22/26 | +0.4 | MATCH |  |
| drv-her2-amp | SMAD4 | mutation | 15.0% | 15.4% | 4/26 | -0.4 | MATCH |  |
| drv-kras-g12c | SMAD4 | mutation | 23.0% | 22.6% | 7/31 | +0.4 | MATCH |  |
| drv-ras-other | PIK3CA | mutation | 24.0% | 24.4% | 107/438 | -0.4 | MATCH |  |
| drv-wild-type | TP53 | mutation | 90.0% | 90.4% | 407/450 | -0.4 | MATCH |  |
| site-proximal | PIK3CA | mutation | 39.0% | 39.4% | 76/193 | -0.4 | MATCH |  |
| site-proximal | SOX9 | mutation | 18.0% | 17.6% | 34/193 | +0.4 | MATCH |  |
| site-distal | PIK3CA | mutation | 22.0% | 21.6% | 24/111 | +0.4 | MATCH |  |
| site-distal | TCF7L2 | mutation | 13.0% | 12.6% | 14/111 | +0.4 | MATCH |  |
| rep-dmmr | BRAF V600E | mutation | 56.0% | 55.6% | 35/63 | +0.4 | MATCH |  |
| cms1 | APC | mutation | 32.0% | 31.6% | 12/38 | +0.4 | MATCH |  |
| cms1 | TP53 | mutation | 18.0% | 18.4% | 7/38 | -0.4 | MATCH |  |
| cms1 | KRAS | mutation | 3.0% | 2.6% | 1/38 | +0.4 | MATCH |  |
| cms2 | KRAS | mutation | 25.0% | 25.4% | 16/63 | -0.4 | MATCH |  |
| cms-mixed | KRAS | mutation | 34.0% | 34.4% | 22/64 | -0.4 | MATCH |  |
| drv-ras-other | TP53 | mutation | 64.0% | 63.7% | 279/438 | +0.3 | MATCH |  |
| drv-ras-other | NRAS | mutation | 9.0% | 8.7% | 38/438 | +0.3 | MATCH |  |
| drv-wild-type | SMAD4 | mutation | 11.0% | 11.3% | 51/450 | -0.3 | MATCH |  |
| drv-wild-type | PIK3CA | mutation | 11.0% | 10.7% | 48/450 | +0.3 | MATCH |  |
| drv-wild-type | BRAF | mutation | 5.0% | 5.3% | 24/450 | -0.3 | MATCH |  |
| site-proximal | APC | mutation | 66.0% | 66.3% | 128/193 | -0.3 | MATCH |  |
| site-proximal | TP53 | mutation | 50.0% | 50.3% | 97/193 | -0.3 | MATCH |  |
| site-proximal | KRAS | mutation | 50.0% | 49.7% | 96/193 | +0.3 | MATCH |  |
| site-proximal | BRAF V600E | mutation | 19.0% | 18.7% | 36/193 | +0.3 | MATCH |  |
| site-proximal | FBXW7 | mutation | 19.0% | 18.7% | 36/193 | +0.3 | MATCH |  |
| site-distal | APC | mutation | 79.0% | 79.3% | 88/111 | -0.3 | MATCH |  |
| site-rectum | TP53 | mutation | 70.0% | 70.3% | 97/138 | -0.3 | MATCH |  |
| site-rectum | FBXW7 | mutation | 17.0% | 16.7% | 23/138 | +0.3 | MATCH |  |
| rep-dmmr | PIK3CA | mutation | 40.0% | 39.7% | 25/63 | +0.3 | MATCH |  |
| rep-dmmr | APC | mutation | 40.0% | 39.7% | 25/63 | +0.3 | MATCH |  |
| rep-dmmr | KRAS | mutation | 32.0% | 31.7% | 20/63 | +0.3 | MATCH |  |
| rep-dmmr | TP53 | mutation | 32.0% | 31.7% | 20/63 | +0.3 | MATCH |  |
| rep-pmmr-other | APC | mutation | 85.0% | 84.7% | 327/386 | +0.3 | MATCH |  |
| rep-pmmr-other | TP53 | mutation | 71.0% | 70.7% | 273/386 | +0.3 | MATCH |  |
| cms2 | TP53 | mutation | 60.0% | 60.3% | 38/63 | -0.3 | MATCH |  |
| cms3 | KRAS | mutation | 67.0% | 67.3% | 37/55 | -0.3 | MATCH |  |
| cms3 | TP53 | mutation | 27.0% | 27.3% | 15/55 | -0.3 | MATCH |  |
| cms4 | KRAS | mutation | 39.0% | 39.3% | 24/61 | -0.3 | MATCH |  |
| drv-ras-other | KRAS | mutation | 92.0% | 91.8% | 402/438 | +0.2 | MATCH |  |
| drv-ras-other | APC | mutation | 81.0% | 80.8% | 354/438 | +0.2 | MATCH |  |
| drv-wild-type | APC | mutation | 80.0% | 79.8% | 359/450 | +0.2 | MATCH |  |
| site-distal | TP53 | mutation | 66.0% | 65.8% | 73/111 | +0.2 | MATCH |  |
| site-distal | FBXW7 | mutation | 11.0% | 10.8% | 12/111 | +0.2 | MATCH |  |
| site-distal | BRAF V600E | mutation | 2.0% | 1.8% | 2/111 | +0.2 | MATCH |  |
| site-rectum | KRAS | mutation | 35.0% | 34.8% | 48/138 | +0.2 | MATCH |  |
| site-rectum | PIK3CA | mutation | 14.0% | 13.8% | 19/138 | +0.2 | MATCH |  |
| site-rectum | SMAD4 | mutation | 14.0% | 13.8% | 19/138 | +0.2 | MATCH |  |
| cms1 | BRAF V600E | mutation | 84.0% | 84.2% | 32/38 | -0.2 | MATCH |  |
| cms3 | APC | mutation | 78.0% | 78.2% | 43/55 | -0.2 | MATCH |  |
| cms-mixed | TP53 | mutation | 42.0% | 42.2% | 27/64 | -0.2 | MATCH |  |
| cms-mixed | BRAF V600E | mutation | 19.0% | 18.8% | 12/64 | +0.2 | MATCH |  |
| drv-her2-amp | APC | mutation | 77.0% | 76.9% | 20/26 | +0.1 | MATCH |  |
| drv-kras-g12c | APC | mutation | 87.0% | 87.1% | 27/31 | -0.1 | MATCH |  |
| drv-kras-g12c | TP53 | mutation | 58.0% | 58.1% | 18/31 | -0.1 | MATCH |  |
| drv-kras-g12c | PIK3CA | mutation | 13.0% | 12.9% | 4/31 | +0.1 | MATCH |  |
| drv-ras-other | SMAD4 | mutation | 17.0% | 17.1% | 75/438 | -0.1 | MATCH |  |
| drv-ras-other | FBXW7 | mutation | 12.0% | 11.9% | 52/438 | +0.1 | MATCH |  |
| drv-wild-type | EGFR | amplification | 3.0% | 2.9% | 13/450 | +0.1 | MATCH |  |
| site-distal | KRAS | mutation | 28.0% | 27.9% | 31/111 | +0.1 | MATCH |  |
| site-rectum | NRAS | mutation | 11.0% | 10.9% | 15/138 | +0.1 | MATCH |  |
| rep-pmmr-other | KRAS | mutation | 46.0% | 46.1% | 178/386 | -0.1 | MATCH |  |
| rep-pmmr-other | PIK3CA | mutation | 25.0% | 24.9% | 96/386 | +0.1 | MATCH |  |
| rep-pmmr-other | ERBB2 | amplification | 4.0% | 4.1% | 16/386 | -0.1 | MATCH |  |
| cms-mixed | APC | mutation | 72.0% | 71.9% | 46/64 | +0.1 | MATCH |  |
| drv-braf-v600e | BRAF V600E | mutation | 100.0% | 100.0% | 50/50 | +0.0 | MATCH |  |
| drv-braf-v600e | TP53 | mutation | 74.0% | 74.0% | 37/50 | +0.0 | MATCH |  |
| drv-braf-v600e | APC | mutation | 38.0% | 38.0% | 19/50 | +0.0 | MATCH |  |
| drv-braf-v600e | SMAD4 | mutation | 30.0% | 30.0% | 15/50 | +0.0 | MATCH |  |
| drv-braf-v600e | PIK3CA | mutation | 24.0% | 24.0% | 12/50 | +0.0 | MATCH |  |
| drv-her2-amp | ERBB2 | amplification | 100.0% | 100.0% | 26/26 | +0.0 | MATCH |  |
| drv-kras-g12c | KRAS G12C | mutation | 100.0% | 100.0% | 31/31 | +0.0 | MATCH |  |
| rep-dmmr | MMR | mutation | 46.0% | 46.0% | 29/63 | +0.0 | MATCH |  |
| rep-pmmr-other | FBXW7 | mutation | 14.0% | 14.0% | 54/386 | +0.0 | MATCH |  |
| rep-pmmr-other | SMAD4 | mutation | 13.0% | 13.0% | 50/386 | +0.0 | MATCH |  |

## Prevalence vs SEER

_Skipped — no `facts/colorectal.incidence.json` (SEER publishes a subtypes page for breast only)._


## Druggability vs CIViC evidence

`druggable: true` in `data/colorectal.js` was assigned by hand. CIViC records formal, PMID-cited evidence (755 items for colorectal cancer). Disagreement in either direction is worth reading.

> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence means a variant predicts response to a therapy — *including predicting non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the gene is itself a drug target. A MISSED row is a prompt to look, not a defect; a REVIEWED row is one that has been looked at, and its note says what was decided (`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; a higher level held only by items still pending review is named in the note.

| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |
|---|:--:|:--:|:--:|--:|---|---|
| EGFR | no | B | yes | 52 | REVIEWED | level-B items are EGFR expression predicting panitumumab response (PMID 17470858) and ectodomain variants predicting anti-EGFR resistance (PMID 29196463, SUBMITTED); the labels select on RAS status, so EGFR carries excludedBy instead of a druggable driver row |
| FBXW7 | no | B | yes | 7 | REVIEWED | one level-B item, FBXW7 mutation and anti-EGFR resistance (PMID 26508446); a single study, not stated on any card |
| NRAS | no | A | yes | 39 | REVIEWED | the level-A item is NRAS mutation predicting resistance to cetuximab and panitumumab (PMID 28275037) -- the RAS exclusion both labels carry, recorded as excludedBy on the EGFR target; no drug here is aimed at NRAS |
| PIK3CA | no | B | yes | 61 | REVIEWED | wired as sourced biomarker rows rather than a druggable flag: ALASCCA aspirin (PMID 40961426) on site-root, PIK3CA exon 20 and cetuximab (PMID 20619739) on drv-ras-wt; no drug here is aimed at PIK3CA |
| SMAD4 | no | B | yes | 5 | REVIEWED | level-B items are resistance to cetuximab and panitumumab (PMID 26508446) and SMAD4 deletion with fluorouracil (PMID 12237773); single studies, not stated on any card |
| TP53 | no | B | yes | 4 | REVIEWED | one level-B item, TP53 wild type and benefit from capecitabine, oxaliplatin and cetuximab (PMID 24957073); a single study, not stated on any card |

Totals: **AGREED** 8, **REVIEWED** 6, **SUPPORTED** 3


## Driver class (derived, MSK) × Side of the primary tumour concordance

Classified 1085 samples having both.

| Question | Measured | n/N | Hand-written claim |
|---|--:|---|---|
| RAS/BRAF wild-type tumours on the left or in the rectum | 87.0% | 387/445 | — |
| Left-sided or rectal tumours that are RAS/BRAF wild type | 51.0% | 387/759 | — |
| RAS/BRAF wild-type tumours in the right colon | 13.0% | 58/445 | — |
| Right-sided tumours that are RAS/BRAF wild type | 17.8% | 58/326 | — |
| MSI-H tumours in the right colon | 69.5% | 66/95 | — |
| Right-sided tumours that are MSI-H | 20.2% | 66/326 | — |

### Full matrix (rows = Driver class (derived, MSK), columns = Side of the primary tumour)

| Driver class (derived, MSK) | Left colon or rectum | Right colon | total |
|---|---|---|---|
| BRAF V600E | 22 | 28 | 50 |
| HER2 amplified | 24 | 2 | 26 |
| KRAS G12C | 22 | 8 | 30 |
| MSI-H | 29 | 66 | 95 |
| Other KRAS/NRAS | 272 | 159 | 431 |
| POLE ultramutated | 3 | 5 | 8 |
| RAS/BRAF wild type | 387 | 58 | 445 |

## Front-page figures vs SEER

Curated figures in `data/colorectal.js` against the live whole-disease page ([SEER](https://seer.cancer.gov/statfacts/html/colorect.html)). These are transcriptions, not judgement — a DIVERGENT row here means the page moved and the dataset did not.

| Figure | colorectal.js | SEER | Δ | Verdict | Note |
|---|---:|---:|---:|---|---|
| baseline.lifetimeRisk | 3.9 | 3.9 | +0.0 | MATCH | the denominator every risk-factor conversion uses |
| stage Localised (share) | 34.0 | 34.0 | +0.0 | MATCH |  |
| stage Localised (5-year) | 91.3 | 91.3 | +0.0 | MATCH |  |
| stage Regional (share) | 37.0 | 37.0 | +0.0 | MATCH |  |
| stage Regional (5-year) | 75.2 | 75.2 | +0.0 | MATCH |  |
| stage Distant (share) | 23.0 | 23.0 | +0.0 | MATCH |  |
| stage Distant (5-year) | 16.9 | 16.9 | +0.0 | MATCH |  |
| stage Unknown (share) | 6.0 | 6.0 | +0.0 | MATCH |  |
| stage Unknown (5-year) | 49.7 | 49.7 | +0.0 | MATCH |  |

All 9 figures agree.

## Counts quoted in cohort-node prose

Every "X% (n of N)" written on a cohort node in `data/colorectal.js`, against the node's own figures and the `contrasts` declared for it in `cxp/cancers.py`. UNTRACED means the pipeline counts nothing with that numerator and denominator — declare the slice, or cite the figure to a publication.

| Node | Quoted | Computed | Matched | Verdict |
|---|---|---:|---|---|
| site-distal | 65.8% (73 of 111) | 65.8% | node: Distal colon (TCGA) · TP53 mutation | MATCH |
| site-distal | 1.8% (2 of 111) | 1.8% | node: Distal colon (TCGA) · NTRK1 mutation | MATCH |
| site-rectum | 31.3% (256 of 817) | 31.3% | contrast: Before 50, rectal primary · patients share | MATCH |
| site-rectum | 22.2% (155 of 698) | 22.2% | contrast: 50 or older, rectal primary · patients share | MATCH |
| site-rectum | 15.7% (128 of 817) | 15.7% | contrast: Before 50, right-sided primary · patients share | MATCH |
| site-rectum | 35.2% (246 of 698) | 35.2% | contrast: 50 or older, right-sided primary · patients share | MATCH |
| rep-dmmr | 58.7% (37 of 63) | 58.7% | node: MSI class (TCGA) · BRAF mutation | MATCH |
| rep-dmmr | 4.4% (17 of 386) | 4.4% | contrast: TCGA CIN and GS classes · BRAF mutation | MATCH |
| rep-dmmr | 3.8% (31 of 817) | 3.8% | contrast: Before 50, MSI · patients share | MATCH |
| rep-dmmr | 9.6% (67 of 698) | 9.6% | contrast: 50 or older, MSI · patients share | MATCH |
| cms1 | 84.2% (32 of 38) | 84.2% | node: CMS1 (AC-ICAM) · BRAF V600E mutation | MATCH |
| cms2 | 82.5% (52 of 63) | 82.5% | node: CMS2 (AC-ICAM) · APC mutation | MATCH |
| cms3 | 67.3% (37 of 55) | 67.3% | node: CMS3 (AC-ICAM) · KRAS mutation | MATCH |
| cms4 | 52.5% (32 of 61) | 52.5% | node: CMS4 (AC-ICAM) · TP53 mutation | MATCH |
| cms4 | 39.3% (24 of 61) | 39.3% | node: CMS4 (AC-ICAM) · KRAS mutation | MATCH |

## Citation coverage

How many curated claims carry a citation. The computed half of this project is checked against its sources every run; this is the same discipline applied to the hand-written half.

`references[]` declared: **59**

| Claim type | Cited | Total | |
|---|---:|---:|---|
| Risk factors (public-facing) | 19 | 19 | OK |
| Per-node triggers | 0 | 0 | — (none made) |
| Therapies | 0 | 0 | — (none made) |

Nodes carrying a `sources[]` block: 30
