# Audit — computed facts vs hand-written `data/lung.js`

**Cohort:** `lung_msk_2017` — Non-Small Cell Cancer (MSK, Cancer Discov 2017) (n=860 patients, from 915 samples)  
**Hand-written file:** `data/lung.js`  
**Parsed:** 27 nodes, 44 drivers

## Summary

| Verdict | Count | Meaning |
|---|--:|---|
| MATCH | 41 | within ±2 percentage points |
| CLOSE | 0 | within ±10 pp |
| DIVERGENT | 0 | more than ±10 pp apart |
| LOW N | 3 | denominator < 20; not evidence either way |
| NOT COMPUTED | 0 | no comparable computed metric |

## Driver frequencies

| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |
|---|---|---|--:|--:|---|--:|---|---|
| drv-egfr-ex20 | EGFR exon 20 insertion | mutation | 89.0% | 88.9% | 16/18 | +0.1 | LOW N | denominator 18 < 20; computed % is not meaningful |
| drv-ret | RET | fusion | 93.0% | 92.9% | 13/14 | +0.1 | LOW N | denominator 14 < 20; computed % is not meaningful |
| drv-braf | BRAF V600E | mutation | 100.0% | 100.0% | 18/18 | +0.0 | LOW N | denominator 18 < 20; computed % is not meaningful |
| hist-squamous | NFE2L2 | mutation | 15.0% | 14.5% | 70/484 | +0.5 | MATCH |  |
| hist-sclc | RB1 | mutation | 73.0% | 72.5% | 87/120 | +0.5 | MATCH |  |
| res-naive | TP53 | mutation | 62.0% | 61.5% | 224/364 | +0.5 | MATCH |  |
| res-treated | TP53 | mutation | 69.0% | 68.5% | 150/219 | +0.5 | MATCH |  |
| drv-egfr | EGFR exon 19 deletion | mutation | 52.0% | 51.6% | 110/213 | +0.4 | MATCH |  |
| drv-egfr | EGFR L858R | mutation | 32.0% | 32.4% | 69/213 | -0.4 | MATCH |  |
| drv-kras | KRAS G12C | mutation | 41.0% | 41.4% | 89/215 | -0.4 | MATCH |  |
| drv-kras | STK11 | mutation | 33.0% | 32.6% | 70/215 | +0.4 | MATCH |  |
| hist-adeno | KRAS | mutation | 32.0% | 32.4% | 214/660 | -0.4 | MATCH |  |
| hist-squamous | TP53 | mutation | 86.0% | 86.4% | 418/484 | -0.4 | MATCH |  |
| hist-squamous | SOX2 | amplification | 42.0% | 42.4% | 205/484 | -0.4 | MATCH |  |
| res-treated | EGFR C797X | mutation | 5.0% | 4.6% | 10/219 | +0.4 | MATCH |  |
| drv-egfr | EGFR | amplification | 26.0% | 26.3% | 56/213 | -0.3 | MATCH |  |
| drv-egfr | EGFR T790M | mutation | 18.0% | 18.3% | 39/213 | -0.3 | MATCH |  |
| drv-met | MET | mutation | 92.0% | 92.3% | 24/26 | -0.3 | MATCH |  |
| drv-none | TP53 | mutation | 60.0% | 59.7% | 71/119 | +0.3 | MATCH |  |
| drv-ros1 | ROS1 | fusion | 96.0% | 95.7% | 22/23 | +0.3 | MATCH |  |
| hist-adeno | KEAP1 | mutation | 17.0% | 16.7% | 110/660 | +0.3 | MATCH |  |
| hist-squamous | CDKN2A | deep_deletion | 27.0% | 26.7% | 129/484 | +0.3 | MATCH | other reading: incl. hemizygous 78.3% |
| res-naive | EGFR | amplification | 19.0% | 18.7% | 68/364 | +0.3 | MATCH |  |
| res-treated | RB1 | mutation | 9.0% | 8.7% | 19/219 | +0.3 | MATCH |  |
| drv-alk | ALK | fusion | 94.0% | 93.8% | 30/32 | +0.2 | MATCH |  |
| drv-erbb2 | ERBB2 | amplification | 21.0% | 20.8% | 5/24 | +0.2 | MATCH |  |
| drv-kras | TP53 | mutation | 36.0% | 35.8% | 77/215 | +0.2 | MATCH |  |
| hist-adeno | EGFR | mutation | 16.0% | 15.8% | 104/660 | +0.2 | MATCH |  |
| hist-adeno | STK11 | mutation | 16.0% | 15.8% | 104/660 | +0.2 | MATCH |  |
| hist-sclc | TP53 | mutation | 86.0% | 85.8% | 103/120 | +0.2 | MATCH |  |
| res-naive | EGFR T790M | mutation | 6.0% | 5.8% | 21/364 | +0.2 | MATCH |  |
| drv-kras | KRAS | mutation | 99.0% | 99.1% | 213/215 | -0.1 | MATCH |  |
| drv-kras | KEAP1 | mutation | 28.0% | 27.9% | 60/215 | +0.1 | MATCH |  |
| hist-adeno | TP53 | mutation | 54.0% | 54.1% | 357/660 | -0.1 | MATCH |  |
| hist-squamous | PIK3CA | amplification | 40.0% | 40.1% | 194/484 | -0.1 | MATCH |  |
| hist-squamous | FGFR1 | amplification | 17.0% | 17.1% | 83/484 | -0.1 | MATCH |  |
| res-naive | MET | amplification | 2.0% | 1.9% | 7/364 | +0.1 | MATCH |  |
| res-treated | EGFR | amplification | 31.0% | 31.1% | 68/219 | -0.1 | MATCH |  |
| drv-egfr | TP53 | mutation | 62.0% | 62.0% | 132/213 | +0.0 | MATCH |  |
| drv-erbb2 | ERBB2 | mutation | 100.0% | 100.0% | 24/24 | +0.0 | MATCH |  |
| hist-adeno | NKX2-1 | amplification | 12.0% | 12.0% | 79/660 | +0.0 | MATCH |  |
| res-naive | EGFR C797X | mutation | 0.5% | 0.5% | 2/364 | +0.0 | MATCH |  |
| res-treated | EGFR T790M | mutation | 21.0% | 21.0% | 46/219 | +0.0 | MATCH |  |
| res-treated | MET | amplification | 10.0% | 10.0% | 22/219 | +0.0 | MATCH |  |

## Prevalence vs SEER

_Skipped — no `facts/lung.incidence.json` (SEER publishes a subtypes page for breast only)._


## Druggability vs CIViC evidence

`druggable: true` in `data/lung.js` was assigned by hand. CIViC records formal, PMID-cited evidence (1256 items for lung cancer). Disagreement in either direction is worth reading.

> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence means a variant predicts response to a therapy — *including predicting non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the gene is itself a drug target. A MISSED row is a prompt to look, not a defect; a REVIEWED row is one that has been looked at, and its note says what was decided (`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; a higher level held only by items still pending review is named in the note.

| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |
|---|:--:|:--:|:--:|--:|---|---|
| CDKN2A | no | B | yes | 6 | REVIEWED | all three level-B items pick a drug aimed at something else: TAPUR treated 29 patients with CDKN2A-altered NSCLC and no RB mutations with palbociclib for a 31% disease control rate -- one partial response and six with stable disease (EID 11665; PMID 35050752 states each of those in its abstract, and CIViC files the ASCO abstract of the same study separately, as EID 7444, DOES_NOT_SUPPORT resistance) -- and MTAP with CDKN2A co-underexpression predicted response to pemetrexed-based chemotherapy (EID 12723, SUBMITTED; PMID 35379845 is a urothelial-carcinoma trial whose full text carries the lung cohort: of 72 BATTLE-2 lung adenocarcinomas, objective responses were 54% in the CDKN2A-low/MTAP-low group against 24% in the rest, p = 0.018). No CDK4/6 inhibitor is in lung-pipeline.csv, so the page keeps CDKN2A as an unflagged tumour suppressor on the squamous node and the Targets lens lists it under 'Altered often, nothing against it' |
| FGFR1 | no | B | yes | 14 | REVIEWED | both level-B items are single-arm trials of FGFR inhibitors that no approval followed: FGFR1 amplification with infigratinib (EID 1908; PMID 27870574 calls the drug BGJ398 and reports seven partial responses, six of them confirmed, across FGFR1-amplified squamous NSCLC and FGFR3-mutant bladder or urothelial cancer -- the "disease control in 18 of 36" is the item's, not the paper's) and with dovitinib (EID 3027; PMID 27315356 gives an overall response rate of 11.5% in its 26 patients, with a 50% disease control rate). No FGFR inhibitor is in lung-pipeline.csv, and the page keeps FGFR1 as an unflagged oncogene on the squamous node |
| KEAP1 | no | B | yes | 7 | REVIEWED | its one level-A item is a regimen chosen on KEAP1 status, not a drug aimed at KEAP1 -- and that item is **still SUBMITTED in CIViC** (EID 12419), not accepted. In POSEIDON, among patients with an STK11 and/or KEAP1 mutation, median overall survival was 15.8 months on tremelimumab with durvalumab and chemotherapy against 7.3 months on durvalumab with chemotherapy (PMID 39385035, read as full text; HR 0.64, 95% CI 0.40-1.04); against chemotherapy alone the paper gives HR 0.50 (0.29-0.87) and quotes no medians. CIViC's own description of the item puts the 7.3 months in the chemotherapy-only arm and pairs it with that 0.50 -- the paper was read, not the item (INV-19). All three level-B items predict RESISTANCE: to a cisplatin, pembrolizumab and pemetrexed regimen, alone and with an STK11 co-mutation (EIDs 12339 and 12340, both SUBMITTED; the same paper's retrospective cohort of 871 patients), and to a platinum doublet alongside NFE2L2 or CUL3 (EID 12558; PMID 31548347, time to treatment failure 2.8 against 8.3 months). The page keeps KEAP1 unflagged on two nodes, and its Targets-lens row already calls it 'a marker, not a target'; a proposal to add the POSEIDON biomarker row is open for the user, not taken here; pending CIViC items, not yet accepted by an editor, reach level A |
| NFE2L2 | no | B | yes | 3 | REVIEWED | two of the three level-B items are ASCO abstracts of the TORC1/2 inhibitor sapanisertib in NFE2L2-mutant squamous NSCLC, neither with a PMID, and both counts are the items' own: one partial response of four (EID 7425, SUBMITTED) and two of seven (EID 7446). The third predicts RESISTANCE to a platinum doublet for NFE2L2, KEAP1 or CUL3 mutation (EID 12558; PMID 31548347). No agent aimed at NFE2L2 is in lung-pipeline.csv, and the page keeps it as an unflagged transcription factor on the squamous node |
| PIK3CA | no | B | yes | 20 | REVIEWED | neither level-B item supports a PI3K drug in lung: PIK3CA mutation predicted RESISTANCE to EGFR tyrosine kinase inhibitors (EID 2355, which names gefitinib and erlotinib; PMID 21258250 says only "EGFR-TKIs", and reports PIK3CA mutation in 4.1% of 166 patients, with shorter time to progression and worse overall survival), and the Lung-MAP sub-study of taselisib in PI3K-positive squamous NSCLC closed for futility at a 5% response rate (EID 7400, SUBMITTED, DOES_NOT_SUPPORT; PMID 31158500). The other 18 predictive items are level C or D. Breast flags PIK3CA druggable and lung does not, and the difference is real: no PI3K inhibitor is in lung-pipeline.csv. The page keeps PIK3CA as an unflagged amplification on the squamous node |
| RB1 | no | B | yes | 3 | REVIEWED | one level-B item is RB1 mutation predicting better response to first-line chemotherapy in extensive-stage small cell lung cancer (EID 1866; PMID 26802149, odds ratio 5.58 for mutant against wild type); the other selects on RB1 being WILD TYPE alongside CDKN2A loss, for palbociclib (EID 11665; PMID 35050752) -- the opposite of an RB1 alteration being a target. The page keeps RB1 as an unflagged tumour suppressor on the small-cell node, whose note already says mutation calls understate how often RB1 is inactivated |
| STK11 | no | B | yes | 18 | REVIEWED | nine level-B items, and nothing in them is a drug aimed at STK11. Five predict RESISTANCE -- to PD-1 and PD-L1 inhibitors in KRAS-mutant adenocarcinoma (EID 6441; PMID 29773717, objective response 7.4% with an STK11 co-mutation against 35.7% with TP53), to chemo-immunotherapy alone and with a KEAP1 co-mutation (EIDs 12338 and 12340, both SUBMITTED; PMID 39385035's 871-patient cohort), to radiotherapy in stage III disease (EID 12911, SUBMITTED; PMID 33323404 reports higher loco-regional recurrence, p = 0.0108, and shorter disease-free survival, HR 2.53 -- CIViC files the therapy as Chemoradiotherapy, the paper as radiotherapy with or without concurrent chemotherapy), and to radiotherapy again (EID 12912, SUBMITTED; PMID 35958336 is a four-page correspondence that validates that finding in public cohorts -- in TCGA's 736 non-metastatic NSCLC, overall-survival HR 3.03 among the 83 who received radiotherapy, and no association in the 547 who did not). Three assert sensitivity to sirolimus, and not one of their sources mentions the drug: the items (EIDs 2314, 2316, 2317, all SUBMITTED) carry one identical description -- "STK11 is mutated and inactivated in 20-30% of non-small cell lung cancers" -- over a cell-line panel (PMID 15021901), a mutation-frequency study (PMID 12097271) and a 188-tumour sequencing study (PMID 18948947), none of which reports a treated patient. And the one trial that did test mTORC1/2 inhibition in STK11-deficient NSCLC did not support it (EID 12514, DOES_NOT_SUPPORT; PMID 40069402, 49 STK11-deficient patients given vistusertib, "vistusertib cannot be recommended in this context" -- the item says the trial produced no responses, while the paper reports two in its KRAS-mutant arm). The page keeps STK11 unflagged, with a target card of its own, and its Targets-lens row already calls it 'not itself a target' |
| TP53 | no | B | yes | 10 | REVIEWED | both level-B items come from one LACE-Bio pooled analysis of four adjuvant cisplatin trials (EIDs 1148 and 1149; PMID 26899019). The paper is more careful than the pair of items suggests: TP53 mutation was "marginally predictive" of benefit from adjuvant chemotherapy (interaction p = 0.06 for overall survival), with wild-type disease showing a tendency toward better outcomes on chemotherapy than on observation (HR 0.77, 95% CI 0.62-0.95) and mutant disease showing none. Either way the selection is of chemotherapy on TP53 status; nothing is aimed at TP53, which is what its target card says |

Totals: **AGREED** 4, **REVIEWED** 8, **SUPPORTED** 12


## Driver class (MSK) × Smoking history concordance

Classified 860 samples having both.

| Question | Measured | n/N | Hand-written claim |
|---|--:|---|---|
| EGFR-driven tumours in people who never smoked | 58.7% | 125/213 | — |
| Never smokers whose tumour is EGFR-driven | 45.1% | 125/277 | — |
| KRAS-driven tumours in people who never smoked | 6.5% | 14/215 | — |
| Never smokers whose tumour is KRAS-driven | 5.1% | 14/277 | — |

### Full matrix (rows = Driver class (MSK), columns = Smoking history)

| Driver class (MSK) | Current heavy | Former heavy | Former light | Never | total |
|---|---|---|---|---|---|
| ALK fusion | 0 | 4 | 5 | 23 | 32 |
| BRAF V600 | 0 | 5 | 4 | 9 | 18 |
| EGFR (common) | 1 | 27 | 60 | 125 | 213 |
| EGFR exon 20 insertion | 0 | 1 | 5 | 12 | 18 |
| HER2 (ERBB2) mutant | 0 | 4 | 6 | 14 | 24 |
| KRAS | 4 | 180 | 17 | 14 | 215 |
| MET exon 14 | 0 | 7 | 8 | 11 | 26 |
| No driver identified | 2 | 80 | 16 | 21 | 119 |
| Other named alteration | 3 | 108 | 24 | 23 | 158 |
| RET fusion | 0 | 3 | 3 | 8 | 14 |
| ROS1 fusion | 0 | 1 | 5 | 17 | 23 |

## Front-page figures vs SEER

Curated figures in `data/lung.js` against the live whole-disease page ([SEER](https://seer.cancer.gov/statfacts/html/lungb.html)). These are transcriptions, not judgement — a DIVERGENT row here means the page moved and the dataset did not.

| Figure | lung.js | SEER | Δ | Verdict | Note |
|---|---:|---:|---:|---|---|
| baseline.lifetimeRisk | 5.2 | 5.2 | +0.0 | MATCH | the denominator every risk-factor conversion uses |
| stage Localised (share) | 24.0 | 24.0 | +0.0 | MATCH |  |
| stage Localised (5-year) | 65.5 | 65.5 | +0.0 | MATCH |  |
| stage Regional (share) | 21.0 | 21.0 | +0.0 | MATCH |  |
| stage Regional (5-year) | 38.2 | 38.2 | +0.0 | MATCH |  |
| stage Distant (share) | 51.0 | 51.0 | +0.0 | MATCH |  |
| stage Distant (5-year) | 10.5 | 10.5 | +0.0 | MATCH |  |
| stage Unknown (share) | 4.0 | 4.0 | +0.0 | MATCH |  |
| stage Unknown (5-year) | 17.5 | 17.5 | +0.0 | MATCH |  |

All 9 figures agree.

## Citation coverage

How many curated claims carry a citation. The computed half of this project is checked against its sources every run; this is the same discipline applied to the hand-written half.

`references[]` declared: **31**

| Claim type | Cited | Total | |
|---|---:|---:|---|
| Risk factors (public-facing) | 15 | 15 | OK |
| Per-node triggers | 0 | 0 | — (none made) |
| Therapies | 0 | 0 | — (none made) |

Nodes carrying a `sources[]` block: 30
