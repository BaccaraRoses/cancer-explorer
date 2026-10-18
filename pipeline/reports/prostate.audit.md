# Audit — computed facts vs hand-written `data/prostate.js`

**Cohort:** `prad_tcga_pub` — Prostate Adenocarcinoma (TCGA, Cell 2015) (n=333)  
**Hand-written file:** `data/prostate.js`  
**Parsed:** 32 nodes, 29 drivers

## Summary

| Verdict | Count | Meaning |
|---|--:|---|
| MATCH | 26 | within ±2 percentage points |
| CLOSE | 0 | within ±10 pp |
| DIVERGENT | 0 | more than ±10 pp apart |
| LOW N | 1 | denominator < 20; not evidence either way |
| NOT COMPUTED | 0 | no comparable computed metric |

## Driver frequencies

| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |
|---|---|---|--:|--:|---|--:|---|---|
| mol-foxa1 | FOXA1 | mutation | 100.0% | 100.0% | 9/9 | +0.0 | LOW N | denominator 9 < 20; computed % is not meaningful |
| state-crpc | MYC | amplification | 24.0% | 23.5% | 101/429 | +0.5 | MATCH | against state-crpc-adeno's cohort (audit_against) |
| state-nepc | SPOP | mutation | 9.0% | 8.6% | 7/81 | +0.4 | MATCH |  |
| mol-erg | PTEN | deep_deletion | 26.0% | 26.3% | 40/152 | -0.3 | MATCH | other reading: incl. hemizygous 41.4% |
| state-crpc-adeno | AR | amplification | 49.0% | 48.7% | 209/429 | +0.3 | MATCH |  |
| state-crpc-adeno | FOXA1 | mutation | 9.0% | 9.3% | 40/429 | -0.3 | MATCH |  |
| state-nepc | TP53 | mutation | 25.0% | 24.7% | 20/81 | +0.3 | MATCH |  |
| mol-root | BRCA2 | mutation | 3.0% | 2.7% | 9/333 | +0.3 | MATCH | against state-confined's cohort (audit_against) |
| state-crpc | AR | amplification | 49.0% | 48.7% | 209/429 | +0.3 | MATCH | against state-crpc-adeno's cohort (audit_against) |
| state-crpc | RB1 | deep_deletion | 10.0% | 9.8% | 42/429 | +0.2 | MATCH | against state-crpc-adeno's cohort (audit_against); other reading: incl. hemizygous 60.1% |
| mol-spop | CHD1 | deep_deletion | 46.0% | 45.9% | 17/37 | +0.1 | MATCH | other reading: incl. hemizygous 78.4% |
| state-crpc-adeno | AR | mutation | 13.0% | 13.1% | 56/429 | -0.1 | MATCH |  |
| state-crpc-adeno | TP53 | mutation | 37.0% | 37.1% | 159/429 | -0.1 | MATCH |  |
| state-crpc-adeno | BRCA2 | mutation | 8.0% | 7.9% | 34/429 | +0.1 | MATCH |  |
| mol-root | SPOP | mutation | 11.0% | 11.1% | 37/333 | -0.1 | MATCH | against state-confined's cohort (audit_against) |
| mol-root | TP53 | mutation | 7.0% | 6.9% | 23/333 | +0.1 | MATCH | against state-confined's cohort (audit_against) |
| mol-root | FOXA1 | mutation | 4.0% | 3.9% | 13/333 | +0.1 | MATCH | against state-confined's cohort (audit_against) |
| mol-root | ATM | mutation | 4.0% | 3.9% | 13/333 | +0.1 | MATCH | against state-confined's cohort (audit_against) |
| state-crpc | TP53 | mutation | 37.0% | 37.1% | 159/429 | -0.1 | MATCH | against state-crpc-adeno's cohort (audit_against) |
| state-crpc | PTEN | deep_deletion | 26.0% | 25.9% | 111/429 | +0.1 | MATCH | against state-crpc-adeno's cohort (audit_against); other reading: incl. hemizygous 51.3% |
| state-crpc | HRR | mutation | 22.0% | 22.1% | 95/429 | -0.1 | MATCH | against state-crpc-adeno's cohort (audit_against) |
| mol-erg | ERG | fusion | 100.0% | 100.0% | 152/152 | +0.0 | MATCH |  |
| mol-etv1 | ETV1 | fusion | 100.0% | 100.0% | 28/28 | +0.0 | MATCH |  |
| mol-spop | SPOP | mutation | 100.0% | 100.0% | 37/37 | +0.0 | MATCH |  |
| mol-other | ZFHX3 | any_loss | 36.0% | 36.0% | 31/86 | +0.0 | MATCH | other reading: deep-deletion-only 9.3% |
| state-nepc | RB1 | mutation | 2.5% | 2.5% | 2/81 | +0.0 | MATCH |  |
| mol-root | PTEN | deep_deletion | 15.0% | 15.0% | 50/333 | +0.0 | MATCH | against state-confined's cohort (audit_against); other reading: incl. hemizygous 27.9% |

## Prevalence vs SEER

_Skipped — no `facts/prostate.incidence.json` (SEER publishes a subtypes page for breast only)._


## Druggability vs CIViC evidence

`druggable: true` in `data/prostate.js` was assigned by hand. CIViC records formal, PMID-cited evidence (89 items for prostate cancer). Disagreement in either direction is worth reading.

> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence means a variant predicts response to a therapy — *including predicting non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the gene is itself a drug target. A MISSED row is a prompt to look, not a defect; a REVIEWED row is one that has been looked at, and its note says what was decided (`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; a higher level held only by items still pending review is named in the note.

| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |
|---|:--:|:--:|:--:|--:|---|---|
| HRR | yes | — | no | 0 | UNSUPPORTED | no accepted predictive evidence in CIViC for prostate cancer — may be druggable in principle rather than in practice |

Totals: **AGREED** 11, **SUPPORTED** 3, **UNSUPPORTED** 1


## Molecular class (TCGA) × Gleason pattern at prostatectomy concordance

Classified 333 samples having both.

| Question | Measured | n/N | Hand-written claim |
|---|--:|---|---|
| ERG-fused tumours that are Gleason ≥8 | 24.3% | 37/152 | — |
| Gleason ≥8 tumours that are ERG-fused | 42.0% | 37/88 | — |
| SPOP-mutant tumours that are Gleason ≥8 | 45.9% | 17/37 | — |
| Gleason ≥8 tumours that are SPOP-mutant | 19.3% | 17/88 | — |

### Full matrix (rows = Molecular class (TCGA), columns = Gleason pattern at prostatectomy)

| Molecular class (TCGA) | Gleason 3+3 | Gleason 3+4 | Gleason 4+3 | Gleason ≥8 | total |
|---|---|---|---|---|---|
| ERG fusion | 27 | 47 | 41 | 37 | 152 |
| ETV1 fusion | 3 | 10 | 7 | 8 | 28 |
| ETV4 fusion | 2 | 3 | 5 | 4 | 14 |
| FLI1 fusion | 3 | 0 | 0 | 1 | 4 |
| FOXA1 mutant | 0 | 4 | 0 | 5 | 9 |
| IDH1 mutant | 1 | 2 | 0 | 0 | 3 |
| SPOP mutant | 6 | 6 | 8 | 17 | 37 |
| Unclassified | 23 | 30 | 17 | 16 | 86 |

## Front-page figures vs SEER

Curated figures in `data/prostate.js` against the live whole-disease page ([SEER](https://seer.cancer.gov/statfacts/html/prost.html)). These are transcriptions, not judgement — a DIVERGENT row here means the page moved and the dataset did not.

| Figure | prostate.js | SEER | Δ | Verdict | Note |
|---|---:|---:|---:|---|---|
| baseline.lifetimeRisk | 13.2 | 13.2 | +0.0 | MATCH | the denominator every risk-factor conversion uses |
| stage Localised (share) | 69.0 | 69.0 | +0.0 | MATCH |  |
| stage Localised (5-year) | 100.0 | 100.0 | +0.0 | MATCH |  |
| stage Regional (share) | 14.0 | 14.0 | +0.0 | MATCH |  |
| stage Regional (5-year) | 100.0 | 100.0 | +0.0 | MATCH |  |
| stage Distant (share) | 9.0 | 9.0 | +0.0 | MATCH |  |
| stage Distant (5-year) | 40.1 | 40.1 | +0.0 | MATCH |  |
| stage Unknown (share) | 8.0 | 8.0 | +0.0 | MATCH |  |
| stage Unknown (5-year) | 94.1 | 94.1 | +0.0 | MATCH |  |

All 9 figures agree.

## Citation coverage

How many curated claims carry a citation. The computed half of this project is checked against its sources every run; this is the same discipline applied to the hand-written half.

`references[]` declared: **29**

| Claim type | Cited | Total | |
|---|---:|---:|---|
| Risk factors (public-facing) | 17 | 17 | OK |
| Per-node triggers | 0 | 0 | — (none made) |
| Therapies | 5 | 15 | partial |

Nodes carrying a `sources[]` block: 12
