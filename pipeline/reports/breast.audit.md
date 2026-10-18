# Audit — computed facts vs hand-written `data/breast.js`

**Cohort:** `brca_tcga_pub` — Breast Invasive Carcinoma (TCGA, Nature 2012) (n=825)  
**Hand-written file:** `data/breast.js`  
**Parsed:** 46 nodes, 116 drivers

## Summary

| Verdict | Count | Meaning |
|---|--:|---|
| MATCH | 28 | within ±2 percentage points |
| CLOSE | 1 | within ±10 pp |
| DIVERGENT | 0 | more than ±10 pp apart |
| LOW N | 1 | denominator < 20; not evidence either way |
| NOT COMPUTED | 1 | no comparable computed metric |

## Driver frequencies

| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |
|---|---|---|--:|--:|---|--:|---|---|
| her2-enriched | APOBEC | mutation | 40.0% | — | — | — | NOT COMPUTED | a mutational signature, not a gene — no per-gene frequency exists |
| normal-like | TP53 | mutation | 15.0% | 50.0% | 4/8 | -35.0 | LOW N | denominator 8 < 20; computed % is not meaningful |
| basal-like | MYC | amplification | 40.0% | 31.5% | 29/92 | +8.5 | CLOSE |  |
| luminal-a | CDH1 | mutation | 12.0% | 10.3% | 23/224 | +1.7 | MATCH |  |
| basal-like | PIK3CA | mutation | 7.0% | 8.6% | 8/93 | -1.6 | MATCH |  |
| her2-enriched | PIK3CA | mutation | 42.0% | 40.4% | 23/57 | +1.6 | MATCH |  |
| luminal-a | PIK3CA | mutation | 45.0% | 46.4% | 104/224 | -1.4 | MATCH |  |
| basal-like | TP53 | mutation | 84.0% | 82.8% | 77/93 | +1.2 | MATCH |  |
| her2-enriched | PIK3R1 | mutation | 8.0% | 7.0% | 4/57 | +1.0 | MATCH |  |
| luminal-b | MDM2 | amplification | 10.0% | 9.0% | 11/122 | +1.0 | MATCH |  |
| luminal-a | MAP2K4 | mutation | 8.0% | 7.1% | 16/224 | +0.9 | MATCH |  |
| basal-like | INPP4B | any_loss | 30.0% | 29.3% | 27/92 | +0.7 | MATCH | other reading: deep-deletion-only 0.0% |
| luminal-a | MAP3K1 | mutation | 14.0% | 13.4% | 30/224 | +0.6 | MATCH |  |
| luminal-b | TP53 | mutation | 32.0% | 31.5% | 39/124 | +0.5 | MATCH |  |
| luminal-b | PIK3CA | mutation | 32.0% | 31.5% | 39/124 | +0.5 | MATCH |  |
| basal-like | BRCA1/2 | mutation | 20.0% | 20.4% | 19/93 | -0.4 | MATCH | hand value counts germline+somatic; cBioPortal mutation calls are somatic only |
| her2-enriched | TP53 | mutation | 75.0% | 75.4% | 43/57 | -0.4 | MATCH |  |
| luminal-a | GATA3 | mutation | 14.0% | 14.3% | 32/224 | -0.3 | MATCH |  |
| luminal-b | GATA3 | mutation | 15.0% | 15.3% | 19/124 | -0.3 | MATCH |  |
| basal-like | PTEN | any_loss | 35.0% | 34.8% | 32/92 | +0.2 | MATCH | other reading: deep-deletion-only 5.4% |
| her2-enriched | ERBB2 | amplification | 71.0% | 70.9% | 39/55 | +0.1 | MATCH |  |
| luminal-a | TP53 | mutation | 12.0% | 12.1% | 27/224 | -0.1 | MATCH |  |
| basal-like | RB1 | deep_deletion | 6.5% | 6.5% | 6/92 | +0.0 | MATCH | other reading: incl. hemizygous 43.5% |
| state-early | TP53 | mutation | 37.5% | 37.5% | 190/507 | +0.0 | MATCH |  |
| state-early | PIK3CA | mutation | 35.3% | 35.3% | 179/507 | +0.0 | MATCH |  |
| state-early | ESR1 | mutation | 0.4% | 0.4% | 2/507 | +0.0 | MATCH |  |
| state-early | ERBB2 | mutation | 1.4% | 1.4% | 7/507 | +0.0 | MATCH |  |
| state-metastatic | ESR1 | mutation | 13.0% | 13.0% | 118/905 | +0.0 | MATCH |  |
| state-metastatic | TP53 | mutation | 39.0% | 39.0% | 353/905 | +0.0 | MATCH |  |
| state-metastatic | PIK3CA | mutation | 35.9% | 35.9% | 325/905 | +0.0 | MATCH |  |
| state-metastatic | ERBB2 | mutation | 5.4% | 5.4% | 49/905 | +0.0 | MATCH |  |

## Prevalence vs SEER

Share of cases in `data/breast.js` against the published registry figures (SEER 21, 2019-2023).

| Node | SEER subtype | breast.js | SEER | Δ pp | Verdict | Note |
|---|---|--:|--:|--:|---|---|
| hr-pos-her2-neg | HR+/HER2- | 70.1% | 70.1% | +0.0 | MATCH |  |
| tnbc | HR-/HER2- | 10.8% | 10.8% | +0.0 | MATCH |  |
| triple-positive | HR+/HER2+ | 9.3% | 9.3% | +0.0 | MATCH |  |
| her2-pos-hr-neg | HR-/HER2+ | 4.0% | 4.0% | +0.0 | MATCH |  |


## Druggability vs CIViC evidence

`druggable: true` in `data/breast.js` was assigned by hand. CIViC records formal, PMID-cited evidence (507 items for breast cancer). Disagreement in either direction is worth reading.

> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence means a variant predicts response to a therapy — *including predicting non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the gene is itself a drug target. A MISSED row is a prompt to look, not a defect; a REVIEWED row is one that has been looked at, and its note says what was decided (`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; a higher level held only by items still pending review is named in the note.

| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |
|---|:--:|:--:|:--:|--:|---|---|
| CD274 (PD-L1) | yes | — | no | 4 | UNSUPPORTED | matched CIViC as CD274; no accepted predictive evidence in CIViC for breast cancer — may be druggable in principle rather than in practice; pending CIViC items, not yet accepted by an editor, reach level B |
| EGFR | yes | — | no | 2 | UNSUPPORTED | no accepted predictive evidence in CIViC for breast cancer — may be druggable in principle rather than in practice; pending CIViC items, not yet accepted by an editor, reach level C |
| MET | yes | — | no | 0 | UNSUPPORTED | no accepted predictive evidence in CIViC for breast cancer — may be druggable in principle rather than in practice |
| TACSTD2 (TROP2) | yes | — | no | 1 | UNSUPPORTED | matched CIViC as TACSTD2; no accepted predictive evidence in CIViC for breast cancer — may be druggable in principle rather than in practice; pending CIViC items, not yet accepted by an editor, reach level B |
| CCND1 | no | B | yes | 5 | REVIEWED | both level-B items are about tamoxifen rather than about hitting cyclin D1: CCND1 overexpression predicting RESISTANCE to tamoxifen (EID 856; PMID 15138475 says so in its title, and reports that the 46 strongly ER-positive, cyclin-D1-overexpressing tumours of 167 showed no survival difference between tamoxifen and no treatment) and CCND1 amplification failing to predict it in MA.12 (EID 858, DOES_NOT_SUPPORT; PMID 24367492, "no statistically significant interaction with treatment was observed", CCND1 copy number measured in 442 patients). The only item about a CDK4/6 inhibitor is level D, in cell lines (EID 1562; PMID 19874578, a panel of 47 breast cancer cell lines treated with palbociclib). The page keeps CCND1 as an unflagged oncogene, and the Targets lens already shows it under 'Reached only through a partner', via CDK4 and CDK6 |
| RB1 | no | B | yes | 9 | REVIEWED | both level-B items predict RESISTANCE -- RB1 phosphorylation with alpelisib (EID 1609; PMID 25002028, which calls the drug BYL719 and reports that responding tumours suppressed phospho-Rb while non-responders sustained it), and RB1 mutation among the alterations selected on palbociclib plus fulvestrant in PALOMA-3 (EID 12045; PMID 30206110, "RB1 mutations emerged only in the palbociclib plus fulvestrant arm ... 6/127, 4.7%") -- as does the level-C item, RB1 mutations emerging after CDK4/6 inhibition (EID 6097, SUBMITTED; PMID 29236940, three patients). That is what the page already says: the CDK4 target card calls RB1 a negative biomarker rather than a target, and the Targets lens lists it under 'Altered often, nothing against it' |
| TP53 | no | B | yes | 19 | REVIEWED | each of the three level-B items selects an older drug on TP53 status, and two of the three are the paper's own: DNA-binding-domain (EID 2783) and L3-domain (EID 3036, SUBMITTED) mutations predicting RESISTANCE to tamoxifen, PMID 10786679 reporting that tumours mutated in codons that directly contact DNA, or in the zinc-binding L3 loop, had the lowest response to tamoxifen (18% and 15%, against 66% for wild type). The third, R249 predicting response to doxorubicin, is **the item's and not the paper's** (EID 399, "more responsive to doxorubicin than breast tumors with wild type TP53"): PMID 9569050 names no therapy in its abstract, which reports relapse-free and overall survival only, and Europe PMC's PMC2150115 record is flagged is-scanned, its body served as page images with no text layer, so the 9,641 characters it returns are front matter and that same abstract -- 0 hits for doxorubicin, chemotherap or tamoxifen. The article body cannot be read at all. Attribute it to EID 399 (INV-19). None of the three is a drug aimed at TP53, which is what the glossary line and the 'Altered often, nothing against it' list say |

Totals: **AGREED** 12, **REVIEWED** 3, **SUPPORTED** 8, **UNSUPPORTED** 4


## Intrinsic subtype (PAM50) × Receptor status (IHC) concordance

Classified 496 samples having both.

| Question | Measured | n/N | Hand-written claim |
|---|--:|---|---|
| Basal-like tumours that are TNBC | 82.6% | 76/92 | "~80% overlap" |
| TNBC tumours that are basal-like | 86.4% | 76/88 | "~80% overlap" |
| HER2-enriched that is HER2+/HR− | 35.8% | 19/53 | "strong but imperfect" |
| HER2+/HR− that is HER2-enriched | 100.0% | 19/19 | "strong but imperfect" |

### Full matrix (rows = Intrinsic subtype (PAM50), columns = Receptor status (IHC))

| Intrinsic subtype (PAM50) | HER2+/HR- | HR+/HER2- | TNBC | Triple positive | total |
|---|---|---|---|---|---|
| Basal-like | 0 | 14 | 76 | 2 | 92 |
| HER2-enriched | 19 | 11 | 5 | 18 | 53 |
| Luminal A | 0 | 203 | 4 | 14 | 221 |
| Luminal B | 0 | 101 | 1 | 20 | 122 |
| Normal-like | 0 | 6 | 2 | 0 | 8 |

## Front-page figures vs SEER

Curated figures in `data/breast.js` against the live whole-disease page ([SEER](https://seer.cancer.gov/statfacts/html/breast.html)). These are transcriptions, not judgement — a DIVERGENT row here means the page moved and the dataset did not.

| Figure | breast.js | SEER | Δ | Verdict | Note |
|---|---:|---:|---:|---|---|
| baseline.lifetimeRisk | 13.0 | 13.0 | +0.0 | MATCH | the denominator every risk-factor conversion uses |
| stage Localised (share) | 64.0 | 64.0 | +0.0 | MATCH |  |
| stage Localised (5-year) | 100.0 | 100.0 | +0.0 | MATCH |  |
| stage Regional (share) | 27.0 | 27.0 | +0.0 | MATCH |  |
| stage Regional (5-year) | 87.5 | 87.5 | +0.0 | MATCH |  |
| stage Distant (share) | 6.0 | 6.0 | +0.0 | MATCH |  |
| stage Distant (5-year) | 33.8 | 33.8 | +0.0 | MATCH |  |
| stage Unstaged (share) | 2.0 | 2.0 | +0.0 | MATCH |  |
| stage Unstaged (5-year) | 70.6 | 70.6 | +0.0 | MATCH |  |

All 9 figures agree.

## Counts quoted in cohort-node prose

Every "X% (n of N)" written on a cohort node in `data/breast.js`, against the node's own figures and the `contrasts` declared for it in `cxp/cancers.py`. UNTRACED means the pipeline counts nothing with that numerator and denominator — declare the slice, or cite the figure to a publication.

| Node | Quoted | Computed | Matched | Verdict |
|---|---|---:|---|---|
| state-metastatic | 16.7% (112 of 672) | 16.7% | contrast: HR+ metastases · ESR1 mutation | MATCH |
| state-metastatic | 2.4% (19 of 777) | 2.4% | contrast: Same study, HR+ primary tumours · ESR1 mutation | MATCH |
| state-metastatic | 2.0% of women whose sample was taken before any treatment (3 of 147) | 2.0% | contrast: MBCproject, sampled before any treatment · ESR1 mutation | MATCH |
| state-metastatic | 16.8% of women whose sample was taken after it (20 of 119) | 16.8% | contrast: MBCproject, sampled after treatment · ESR1 mutation | MATCH |

## Citation coverage

How many curated claims carry a citation. The computed half of this project is checked against its sources every run; this is the same discipline applied to the hand-written half.

`references[]` declared: **35**

| Claim type | Cited | Total | |
|---|---:|---:|---|
| Risk factors (public-facing) | 22 | 22 | OK |
| Per-node triggers | 43 | 57 | partial |
| Therapies | 27 | 31 | partial |

Nodes carrying a `sources[]` block: 12
