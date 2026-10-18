# Audit — computed facts vs hand-written `data/melanoma.js`

**Cohort:** `mel_mskimpact_2020` — Melanoma (MSK, Clin Cancer Res 2021) (n=696)  
**Hand-written file:** `data/melanoma.js`  
**Parsed:** 20 nodes, 82 drivers

## Summary

| Verdict | Count | Meaning |
|---|--:|---|
| MATCH | 78 | within ±2 percentage points |
| CLOSE | 0 | within ±10 pp |
| DIVERGENT | 0 | more than ±10 pp apart |
| LOW N | 4 | denominator < 20; not evidence either way |
| NOT COMPUTED | 0 | no comparable computed metric |

## Driver frequencies

| Node | Gene | Metric | Hand | Computed | n/N | Δ pp | Verdict | Note |
|---|---|---|--:|--:|---|--:|---|---|
| drv-kit | KIT | mutation | 100.0% | 100.0% | 14/14 | +0.0 | LOW N | denominator 14 < 20; computed % is not meaningful |
| drv-kit | TERT | mutation | 85.7% | 85.7% | 12/14 | +0.0 | LOW N | denominator 14 < 20; computed % is not meaningful |
| drv-kit | TP53 | mutation | 50.0% | 50.0% | 7/14 | +0.0 | LOW N | denominator 14 < 20; computed % is not meaningful |
| drv-kit | KIT | amplification | 28.6% | 28.6% | 4/14 | +0.0 | LOW N | denominator 14 < 20; computed % is not meaningful |
| drv-braf-v600-other | BRAF V600K | mutation | 83.7% | 83.7% | 36/43 | +0.0 | MATCH |  |
| drv-braf-v600-other | TERT | mutation | 81.4% | 81.4% | 35/43 | +0.0 | MATCH |  |
| drv-braf-v600-other | PTEN | mutation | 23.3% | 23.3% | 10/43 | +0.0 | MATCH |  |
| drv-braf-v600-other | CDKN2A | deep_deletion | 16.3% | 16.3% | 7/43 | +0.0 | MATCH | other reading: incl. hemizygous 16.3% |
| drv-braf-v600-other | TP53 | mutation | 16.3% | 16.3% | 7/43 | +0.0 | MATCH |  |
| drv-braf-v600-other | MAP2K1 | mutation | 14.0% | 14.0% | 6/43 | +0.0 | MATCH |  |
| drv-braf-v600e | BRAF V600E | mutation | 100.0% | 100.0% | 172/172 | +0.0 | MATCH |  |
| drv-braf-v600e | TERT | mutation | 76.2% | 76.2% | 131/172 | +0.0 | MATCH |  |
| drv-braf-v600e | CDKN2A | deep_deletion | 27.3% | 27.3% | 47/172 | +0.0 | MATCH | other reading: incl. hemizygous 27.3% |
| drv-braf-v600e | TP53 | mutation | 17.4% | 17.4% | 30/172 | +0.0 | MATCH |  |
| drv-braf-v600e | PTEN | mutation | 14.0% | 14.0% | 24/172 | +0.0 | MATCH |  |
| drv-braf-class23 | TERT | mutation | 81.8% | 81.8% | 36/44 | +0.0 | MATCH |  |
| drv-braf-class23 | BRAF | mutation | 65.9% | 65.9% | 29/44 | +0.0 | MATCH |  |
| drv-braf-class23 | BRAF | fusion | 38.6% | 38.6% | 17/44 | +0.0 | MATCH |  |
| drv-braf-class23 | CDKN2A | deep_deletion | 29.5% | 29.5% | 13/44 | +0.0 | MATCH | other reading: incl. hemizygous 29.5% |
| drv-braf-class23 | PTEN | mutation | 22.7% | 22.7% | 10/44 | +0.0 | MATCH |  |
| drv-braf-class23 | BRAF V600 | mutation | 6.8% | 6.8% | 3/44 | +0.0 | MATCH |  |
| drv-nf1 | NF1 | mutation | 98.7% | 98.7% | 153/155 | +0.0 | MATCH |  |
| drv-nf1 | TERT | mutation | 89.7% | 89.7% | 139/155 | +0.0 | MATCH |  |
| drv-nf1 | TP53 | mutation | 47.7% | 47.7% | 74/155 | +0.0 | MATCH |  |
| drv-nf1 | CDKN2A | mutation | 31.6% | 31.6% | 49/155 | +0.0 | MATCH |  |
| drv-nf1 | BRAF | mutation | 21.9% | 21.9% | 34/155 | +0.0 | MATCH |  |
| drv-nf1 | NRAS G12, G13 or Q61 | mutation | 12.9% | 12.9% | 20/155 | +0.0 | MATCH |  |
| drv-nras-q61 | NRAS G12, G13 or Q61 | mutation | 100.0% | 100.0% | 172/172 | +0.0 | MATCH |  |
| drv-nras-q61 | TERT | mutation | 90.7% | 90.7% | 156/172 | +0.0 | MATCH |  |
| drv-nras-q61 | CDKN2A | deep_deletion | 31.4% | 31.4% | 54/172 | +0.0 | MATCH | other reading: incl. hemizygous 31.4% |
| drv-nras-q61 | TP53 | mutation | 19.8% | 19.8% | 34/172 | +0.0 | MATCH |  |
| drv-nras-q61 | MAP2K1 | mutation | 7.0% | 7.0% | 12/172 | +0.0 | MATCH |  |
| drv-ras-other | TERT | mutation | 88.0% | 88.0% | 22/25 | +0.0 | MATCH |  |
| drv-ras-other | NRAS | mutation | 48.0% | 48.0% | 12/25 | +0.0 | MATCH |  |
| drv-ras-other | CDKN2A | deep_deletion | 36.0% | 36.0% | 9/25 | +0.0 | MATCH | other reading: incl. hemizygous 36.0% |
| drv-ras-other | TP53 | mutation | 28.0% | 28.0% | 7/25 | +0.0 | MATCH |  |
| drv-ras-other | KRAS | mutation | 24.0% | 24.0% | 6/25 | +0.0 | MATCH |  |
| drv-ras-other | HRAS | mutation | 24.0% | 24.0% | 6/25 | +0.0 | MATCH |  |
| drv-other | TERT | mutation | 67.4% | 67.4% | 29/43 | +0.0 | MATCH |  |
| drv-other | MAP2K1 | mutation | 37.2% | 37.2% | 16/43 | +0.0 | MATCH |  |
| drv-other | TP53 | mutation | 27.9% | 27.9% | 12/43 | +0.0 | MATCH |  |
| drv-other | CDKN2A | deep_deletion | 18.6% | 18.6% | 8/43 | +0.0 | MATCH | other reading: incl. hemizygous 18.6% |
| drv-other | GNAQ or GNA11 Q209/R183 | mutation | 14.0% | 14.0% | 6/43 | +0.0 | MATCH |  |
| drv-unknown | TERT | mutation | 53.6% | 53.6% | 15/28 | +0.0 | MATCH |  |
| drv-unknown | CDKN2A | deep_deletion | 32.1% | 32.1% | 9/28 | +0.0 | MATCH | other reading: incl. hemizygous 32.1% |
| drv-unknown | CDKN2A | mutation | 21.4% | 21.4% | 6/28 | +0.0 | MATCH |  |
| drv-unknown | TP53 | mutation | 17.9% | 17.9% | 5/28 | +0.0 | MATCH |  |
| drv-unknown | PTEN | mutation | 17.9% | 17.9% | 5/28 | +0.0 | MATCH |  |
| path-skin | TERT | mutation | 76.2% | 76.2% | 825/1082 | +0.0 | MATCH |  |
| path-skin | BRAF V600 | mutation | 31.1% | 31.1% | 337/1082 | +0.0 | MATCH |  |
| path-skin | NRAS G12, G13 or Q61 | mutation | 28.1% | 28.1% | 304/1082 | +0.0 | MATCH |  |
| path-skin | NF1 | mutation | 26.1% | 26.1% | 282/1082 | +0.0 | MATCH |  |
| path-skin | CDKN2A | deep_deletion | 25.7% | 25.7% | 278/1082 | +0.0 | MATCH | other reading: incl. hemizygous 25.7% |
| path-skin | TP53 | mutation | 22.4% | 22.4% | 242/1082 | +0.0 | MATCH |  |
| path-skin | KIT | mutation | 5.4% | 5.4% | 58/1082 | +0.0 | MATCH |  |
| path-acral | CDKN2A | deep_deletion | 23.5% | 23.5% | 23/98 | +0.0 | MATCH | other reading: incl. hemizygous 23.5% |
| path-acral | CCND1 | amplification | 21.4% | 21.4% | 21/98 | +0.0 | MATCH |  |
| path-acral | NRAS G12, G13 or Q61 | mutation | 20.4% | 20.4% | 20/98 | +0.0 | MATCH |  |
| path-acral | CDK4 | amplification | 19.4% | 19.4% | 19/98 | +0.0 | MATCH |  |
| path-acral | TERT | amplification | 16.3% | 16.3% | 16/98 | +0.0 | MATCH |  |
| path-acral | MDM2 | amplification | 14.3% | 14.3% | 14/98 | +0.0 | MATCH |  |
| path-acral | BRAF V600 | mutation | 11.2% | 11.2% | 11/98 | +0.0 | MATCH |  |
| path-acral | KIT | mutation | 6.1% | 6.1% | 6/98 | +0.0 | MATCH |  |
| path-mucosal | CDKN2A | deep_deletion | 24.6% | 24.6% | 50/203 | +0.0 | MATCH | other reading: incl. hemizygous 24.6% |
| path-mucosal | SF3B1 R625 | mutation | 24.1% | 24.1% | 49/203 | +0.0 | MATCH |  |
| path-mucosal | NF1 | mutation | 21.7% | 21.7% | 44/203 | +0.0 | MATCH |  |
| path-mucosal | KIT | mutation | 20.2% | 20.2% | 41/203 | +0.0 | MATCH |  |
| path-mucosal | KIT | amplification | 15.8% | 15.8% | 32/203 | +0.0 | MATCH |  |
| path-mucosal | TP53 | mutation | 15.8% | 15.8% | 32/203 | +0.0 | MATCH |  |
| path-mucosal | NRAS G12, G13 or Q61 | mutation | 13.8% | 13.8% | 28/203 | +0.0 | MATCH |  |
| path-mucosal | BRAF V600 | mutation | 3.0% | 3.0% | 6/203 | +0.0 | MATCH |  |
| path-uveal | GNAQ or GNA11 Q209/R183 | mutation | 91.4% | 91.4% | 127/139 | +0.0 | MATCH |  |
| path-uveal | BAP1 | mutation | 43.9% | 43.9% | 61/139 | +0.0 | MATCH |  |
| path-uveal | SF3B1 R625 | mutation | 29.5% | 29.5% | 41/139 | +0.0 | MATCH |  |
| path-uveal | EIF1AX | mutation | 15.8% | 15.8% | 22/139 | +0.0 | MATCH |  |
| path-uveal | CDKN2A | deep_deletion | 5.8% | 5.8% | 8/139 | +0.0 | MATCH | other reading: incl. hemizygous 5.8% |
| path-unknown | TERT | mutation | 77.1% | 77.1% | 135/175 | +0.0 | MATCH |  |
| path-unknown | TP53 | mutation | 34.9% | 34.9% | 61/175 | +0.0 | MATCH |  |
| path-unknown | BRAF V600 | mutation | 32.6% | 32.6% | 57/175 | +0.0 | MATCH |  |
| path-unknown | NF1 | mutation | 32.6% | 32.6% | 57/175 | +0.0 | MATCH |  |
| path-unknown | NRAS G12, G13 or Q61 | mutation | 25.1% | 25.1% | 44/175 | +0.0 | MATCH |  |
| path-unknown | CDKN2A | deep_deletion | 25.1% | 25.1% | 44/175 | +0.0 | MATCH | other reading: incl. hemizygous 25.1% |

## Prevalence vs SEER

_Skipped — no `facts/melanoma.incidence.json` (SEER publishes a subtypes page for breast only)._


## Druggability vs CIViC evidence

`druggable: true` in `data/melanoma.js` was assigned by hand. CIViC records formal, PMID-cited evidence (404 items for melanoma). Disagreement in either direction is worth reading.

> The two concepts are close but not identical. CIViC **PREDICTIVE** evidence means a variant predicts response to a therapy — *including predicting non-response*, as with RB1 loss and CDK4/6 inhibitors. `druggable` means the gene is itself a drug target. A MISSED row is a prompt to look, not a defect; a REVIEWED row is one that has been looked at, and its note says what was decided (`civic_reviewed` in `cxp/cancers.py`). The level shown is the strongest PREDICTIVE item an editor has ACCEPTED, not the strongest item of any type; a higher level held only by items still pending review is named in the note.

| Gene | flagged druggable | CIViC predictive level | predictive | items | Verdict | Note |
|---|:--:|:--:|:--:|--:|---|---|
| CCND1 | no | B | yes | 1 | REVIEWED | its single level-B item is CCND1 amplification predicting response to carboplatin, paclitaxel and sorafenib (26307133); no CDK4/6 inhibitor carries a melanoma indication |
| GNAQ or GNA11 Q209/R183 | no | B | yes | 8 | REVIEWED | matched CIViC as GNAQ or GNA11 Q209/R183 → GNAQ; the level-B items are GNAQ mutation predicting response to trametinib (22805292) and cabozantinib (28103611), and Q209 predicting non-response to selumetinib (24938562) -- trial results in uveal melanoma, none of them an approval; the one drug approved for uveal melanoma is chosen by the patient's HLA type, not by GNAQ |
| KIT | no | B | yes | 20 | REVIEWED | the level-B items are KIT mutation predicting response to imatinib (21690468, 23775962) and nilotinib (26424760), and KIT amplification predicting resistance to imatinib (23775962); no KIT inhibitor carries a US melanoma indication, and the KIT card says so |
| KRAS | no | B | yes | 4 | REVIEWED | the level-B items are KRAS amplification with sorafenib, carboplatin and docetaxel (26307133) and BRAF V600E alongside a KRAS mutation predicting resistance to vemurafenib and dabrafenib (24265155); no drug here is aimed at KRAS |
| NRAS | no | B | yes | 49 | REVIEWED | the level-B items are NRAS mutation predicting response to binimetinib (PMIDs 28284557, 23414587) and NRAS Q61 predicting resistance to vemurafenib (23569304); binimetinib's US label covers only BRAF V600 disease with encorafenib, so no drug here is aimed at NRAS, and the resistance side is quoted on the BRAF V600 card from Van Allen 2014 |
| NRAS G12, G13 or Q61 | no | B | yes | 49 | REVIEWED | matched CIViC as NRAS G12, G13 or Q61 → NRAS; the level-B items are NRAS mutation predicting response to binimetinib (PMIDs 28284557, 23414587) and NRAS Q61 predicting resistance to vemurafenib (23569304); binimetinib's US label covers only BRAF V600 disease with encorafenib, so no drug here is aimed at NRAS, and the resistance side is quoted on the BRAF V600 card from Van Allen 2014 |

Totals: **AGREED** 13, **REVIEWED** 6, **SUPPORTED** 3


## Driver class (MSK) × Where the primary melanoma arose concordance

Classified 695 samples having both.

| Question | Measured | n/N | Hand-written claim |
|---|--:|---|---|
| NF1-class melanomas that arose on the head | 43.5% | 67/154 | — |
| Head melanomas that are NF1-class | 41.4% | 67/162 | — |
| NF1-class melanomas that arose on the trunk | 13.6% | 21/154 | — |
| Trunk melanomas that are NF1-class | 11.6% | 21/181 | — |
| BRAF V600E melanomas that arose on the head | 14.0% | 24/172 | — |
| Head melanomas that are BRAF V600E | 14.8% | 24/162 | — |

### Full matrix (rows = Driver class (MSK), columns = Where the primary melanoma arose)

| Driver class (MSK) | Head | Lower limb | Trunk | Unknown primary | Upper limb | total |
|---|---|---|---|---|---|---|
| BRAF V600, not E | 17 | 3 | 11 | 7 | 5 | 43 |
| BRAF V600E | 24 | 33 | 58 | 38 | 19 | 172 |
| BRAF class 2 or 3 | 9 | 5 | 18 | 6 | 6 | 44 |
| KIT or PDGFRA | 7 | 4 | 0 | 2 | 1 | 14 |
| NF1 | 67 | 5 | 21 | 34 | 27 | 154 |
| NRAS Q61 | 19 | 39 | 52 | 29 | 33 | 172 |
| Other RAS | 1 | 3 | 4 | 8 | 9 | 25 |
| Other driver | 13 | 9 | 11 | 9 | 1 | 43 |
| Unknown driver | 5 | 9 | 6 | 7 | 1 | 28 |

## Front-page figures vs SEER

Curated figures in `data/melanoma.js` against the live whole-disease page ([SEER](https://seer.cancer.gov/statfacts/html/melan.html)). These are transcriptions, not judgement — a DIVERGENT row here means the page moved and the dataset did not.

| Figure | melanoma.js | SEER | Δ | Verdict | Note |
|---|---:|---:|---:|---|---|
| baseline.lifetimeRisk | 2.2 | 2.2 | +0.0 | MATCH | the denominator every risk-factor conversion uses |
| stage Localised (share) | 77.0 | 77.0 | +0.0 | MATCH |  |
| stage Localised (5-year) | 100.0 | 100.0 | +0.0 | MATCH |  |
| stage Regional (share) | 10.0 | 10.0 | +0.0 | MATCH |  |
| stage Regional (5-year) | 76.0 | 76.0 | +0.0 | MATCH |  |
| stage Distant (share) | 5.0 | 5.0 | +0.0 | MATCH |  |
| stage Distant (5-year) | 34.0 | 34.0 | +0.0 | MATCH |  |
| stage Unknown (share) | 9.0 | 9.0 | +0.0 | MATCH |  |
| stage Unknown (5-year) | 95.4 | 95.4 | +0.0 | MATCH |  |

All 9 figures agree.

## Counts quoted in cohort-node prose

Every "X% (n of N)" written on a cohort node in `data/melanoma.js`, against the node's own figures and the `contrasts` declared for it in `cxp/cancers.py`. UNTRACED means the pipeline counts nothing with that numerator and denominator — declare the slice, or cite the figure to a publication.

| Node | Quoted | Computed | Matched | Verdict |
|---|---|---:|---|---|
| path-skin | 31.1% (337 of 1,082) | 31.1% | node: Skin melanoma (MSK-IMPACT 50K) · BRAF V600 mutation | MATCH |

## Citation coverage

How many curated claims carry a citation. The computed half of this project is checked against its sources every run; this is the same discipline applied to the hand-written half.

`references[]` declared: **48**

| Claim type | Cited | Total | |
|---|---:|---:|---|
| Risk factors (public-facing) | 16 | 16 | OK |
| Per-node triggers | 0 | 0 | — (none made) |
| Therapies | 0 | 0 | — (none made) |

Nodes carrying a `sources[]` block: 23
