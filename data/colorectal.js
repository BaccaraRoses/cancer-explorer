/* data/colorectal.js — Colorectal cancer dataset for the Cancer Subtype Explorer.
 *
 * Four axes: tumour site (the default), mismatch repair status, the RAS / BRAF /
 * HER2 class of metastatic disease, and the consensus molecular subtype (CMS) of
 * colon cancer — with the profile, baseline, 19 factors and the detection block.
 * Targets and literature follow in phases 6 and 7.
 *
 * ---- Why site is the default --------------------------------------------
 *
 * Colorectal cancer has no histology fork like lung's small cell / non-small
 * cell split. The first thing that changes care is where it sits —
 * colon and rectal cancer have separate NCI treatment summaries — and within
 * the colon, side travels with biology: in TCGA, 48 of the 63 MSI tumours are
 * proximal.
 *
 * ---- FOUR DIFFERENT BASES ------------------------------------------------
 *
 *   - SITE shares are of the AGE-ADJUSTED INCIDENCE RATE, not of case counts:
 *     Siegel et al, CA Cancer J Clin 2026 (PMID 41769777), Table 2, US
 *     2018–2022, both sexes, all ages, per 100,000:
 *       colorectum 35.3 = colon 24.2 + rectum 11.1
 *       colon 24.2 = proximal 13.3 + distal 8.7 + large intestine NOS 2.2
 *     so  site-colon 68.6 {site-proximal 37.7, site-distal 24.6,
 *         site-colon-nos 6.2}, site-rectum 31.4.
 *     Groups use that paper's ICD-O-3 definitions: colon C18.0, C18.2–C18.9 and
 *     C26.0; rectum C19.9 and C20.9; proximal C18.0 and C18.2–C18.5 (so the
 *     splenic flexure is proximal); distal C18.6–C18.7; NOS C18.8, C18.9 and
 *     C26.0. The appendix (C18.1) is excluded. The computed figures on the site
 *     nodes (TCGA PanCanAtlas) are filtered by the same codes — see
 *     pipeline/cxp/cancers.py.
 *   - REPAIR shares come from Domingo et al, Lancet Gastroenterol Hepatol 2016
 *     (PMID 28404093): of 6,277 tumours with both repair status and POLE
 *     status, 833 deficient (13.3), 66 POLE-mutant (1.1), 5,378 neither (85.7);
 *     POLE and deficiency never co-occurred (0 of 66). Mostly stage II/III.
 *     Lynch syndrome 2.8 is from a DIFFERENT series — Hampel et al, JCO 2008
 *     (PMID 18809606), 44 of 1,566 — so rep-sporadic 10.5 = 13.3 − 2.8 is a
 *     difference between two studies, and the axis note says so. Hampel's
 *     2005 NEJM series (19.5% "microsatellite instability") is not used: its
 *     instability definition could not be confirmed from the abstract.
 *   - DRIVER-CLASS shares are of METASTATIC disease without its MSI-H and POLE
 *     tumours, computed by pipeline/run.py from MSK crc_msk_2017 (1,099
 *     patients, one tumour each) with the derived classifier in cancers.py. The
 *     104 MSI-H or POLE patients are left out, so the classes are shares of the
 *     995 left, and the axis says so with `population`. POLE tumours are left
 *     out by the classifier's order, not because their repair fails — it works —
 *     so the population is named by what it leaves out, never as "proficient".
 *   - CMS shares are of PRIMARY COLON CANCER in one cohort, AC-ICAM
 *     (coad_silu_2022, Roelands et al, Nat Med 2023): 348 patients, a CMS call on
 *     every one. The consortium's shares (Guinney 2015: 14, 37, 13, 23 and 13
 *     mixed) differ, CMS2 most, and the axis note sets them side by side.
 *
 * ---- Two axes declined, recorded so nobody re-derives them --------------
 *
 * Disease state. None of the cohorts checked sampled tumours after anti-EGFR
 * therapy, the resistance colorectal cancer is known for. MSK 2017 records
 * whether chemotherapy came before the sequenced specimen, and across it BRAF
 * V600E FALLS (7.7% to 3.2% outside MSI-H and POLE). Selection, surviving to a
 * second biopsy and which tumours get re-sampled all fit, and the design cannot
 * separate them. The counts are on the drv-root card. (The plan's 10.0% to 3.1%
 * counted a different way; these are the pipeline's per-patient counts.)
 *
 * Early onset. Age belongs to the person, not the tumour. It is in the profile
 * (registry figures) and in controls on the site-rectum and rep-dmmr cards from
 * crc_eo_2020, which the pipeline counts as contrasts.
 *
 * BRAF V600E and KRAS/NRAS label-codon mutations never share a tumour in the
 * driver axis's population: 0 of the 50 BRAF V600E patients, where 23.6 would
 * be expected if independent (469 of 995 carry a label-codon mutation). All
 * three overlaps in the whole cohort are MSI-H. TCGA PanCanAtlas showed 0 of 13
 * when counted for phase 3.
 *
 * Node ids site-proximal, site-distal, site-rectum, rep-dmmr, rep-pole,
 * rep-pmmr-other, cms1–cms4 and cms-mixed are a CONTRACT with the cohort nodes in
 * pipeline/cxp/cancers.py; drv-braf-v600e, drv-kras-g12c, drv-ras-other,
 * drv-her2-amp and drv-wild-type with its subtype_to_node.
 *
 * Verified 2026-09-13.
 */
CancerExplorer.register({

  id: 'colorectal',
  name: 'Colorectal Cancer',
  synonyms: ['colon cancer', 'rectal cancer', 'bowel cancer', 'CRC', 'colorectal carcinoma'],
  overview: 'Sorted first by where in the large bowel it started — colon or rectum, and which ' +
            'part of the colon — and then by whether the tumour can still repair its own DNA ' +
            'copying errors, which is what decides whether immunotherapy comes first.',
  incidence: '~158,850 new US cases and ~55,230 deaths estimated for 2026; 8.8% of all cancer deaths',
  lastVerified: '2026-09-13',

  references: [
    { id: 'seer-colorectal', label: 'SEER Cancer Stat Facts: Colorectal Cancer — incidence, mortality, stage and survival',
      journal: 'NCI SEER, 2026 estimates', url: 'https://seer.cancer.gov/statfacts/html/colorect.html' },
    { id: 'siegel-2026', label: 'Siegel et al — Colorectal cancer statistics, 2026 (Table 2: incidence by subsite, 2018–2022)',
      journal: 'CA Cancer J Clin 2026', pmid: '41769777', url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
    { id: 'domingo-2016', label: 'Domingo et al — somatic POLE proofreading domain mutation, immune response, and prognosis in colorectal cancer: a pooled biomarker study',
      journal: 'Lancet Gastroenterol Hepatol 2016', pmid: '28404093', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
    { id: 'hampel-2008', label: 'Hampel et al — feasibility of screening for Lynch syndrome among patients with colorectal cancer (1,566 patients)',
      journal: 'J Clin Oncol 2008', pmid: '18809606', url: 'https://pubmed.ncbi.nlm.nih.gov/18809606/' },
    { id: 'tcga-2012', label: 'Cancer Genome Atlas Network — comprehensive molecular characterization of human colon and rectal cancer',
      journal: 'Nature 2012', pmid: '22810696', url: 'https://pubmed.ncbi.nlm.nih.gov/22810696/' },
    { id: 'tcga-pancan', label: 'Hoadley et al — cell-of-origin patterns dominate the molecular classification of 10,000 tumors (TCGA PanCanAtlas; colorectal cohort)',
      journal: 'Cell 2018', pmid: '29625048', url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' },
    { id: 'liu-2018', label: 'Liu et al — comparative molecular analysis of gastrointestinal adenocarcinomas (TCGA molecular classes CIN, GS, MSI, POLE)',
      journal: 'Cancer Cell 2018', pmid: '29622466', url: 'https://pubmed.ncbi.nlm.nih.gov/29622466/' },
    { id: 'msk-crc-2017', label: 'Yaeger et al — clinical sequencing defines the genomic landscape of metastatic colorectal cancer (MSK)',
      journal: 'Cancer Cell 2018', pmid: '29316426', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' },
    { id: 'keynote-177', label: 'André et al — pembrolizumab in microsatellite-instability-high advanced colorectal cancer (KEYNOTE-177)',
      journal: 'N Engl J Med 2020', pmid: '33264544', url: 'https://pubmed.ncbi.nlm.nih.gov/33264544/' },
    { id: 'checkmate-8hw', label: 'André et al — nivolumab plus ipilimumab in microsatellite-instability-high metastatic colorectal cancer (CheckMate 8HW)',
      journal: 'N Engl J Med 2024', pmid: '39602630', url: 'https://pubmed.ncbi.nlm.nih.gov/39602630/' },
    { id: 'nci-colon-hp', label: 'NCI PDQ — Colon Cancer Treatment (Health Professional Version), updated February 12, 2025',
      journal: 'National Cancer Institute', url: 'https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq' },
    { id: 'nci-rectal-hp', label: 'NCI PDQ — Rectal Cancer Treatment (Health Professional Version), updated February 12, 2025',
      journal: 'National Cancer Institute', url: 'https://www.cancer.gov/types/colorectal/hp/rectal-treatment-pdq' },
    { id: 'nci-colon-patient', label: 'NCI PDQ — Colon Cancer Treatment (Patient Version): signs and symptoms, updated May 16, 2025',
      journal: 'National Cancer Institute', url: 'https://www.cancer.gov/types/colorectal/patient/colon-treatment-pdq' },
    { id: 'who-crc-2026', label: 'World Health Organization — Colorectal cancer fact sheet (GLOBOCAN 2022 estimates), 13 February 2026',
      journal: 'WHO', url: 'https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer' },
    { id: 'bray-2024', label: 'Bray et al — Global cancer statistics 2022 (GLOBOCAN)',
      journal: 'CA Cancer J Clin 2024', pmid: '38572751', url: 'https://pubmed.ncbi.nlm.nih.gov/38572751/' },
    { id: 'plsd-2020', label: 'Dominguez-Valentin et al — cancer risks by gene, age, and gender in 6,350 carriers of pathogenic mismatch repair variants (Prospective Lynch Syndrome Database, Table 1)',
      journal: 'Genet Med 2020', pmid: '31337882', url: 'https://pubmed.ncbi.nlm.nih.gov/31337882/' },
    { id: 'genereviews-fap', label: 'GeneReviews — APC-associated polyposis conditions (last update May 12, 2022)',
      journal: 'NCBI Bookshelf', url: 'https://www.ncbi.nlm.nih.gov/books/NBK1345/' },
    { id: 'win-2014', label: 'Win et al — risk of colorectal cancer for carriers of mutations in MUTYH, with and without a family history of cancer',
      journal: 'Gastroenterology 2014', pmid: '24444654', url: 'https://pubmed.ncbi.nlm.nih.gov/24444654/' },
    { id: 'olen-uc-2020', label: 'Olén et al — colorectal cancer in ulcerative colitis: a Scandinavian population-based cohort study (96,447 patients)',
      journal: 'Lancet 2020', pmid: '31929014', url: 'https://pubmed.ncbi.nlm.nih.gov/31929014/' },
    { id: 'olen-cd-2020', label: 'Olén et al — colorectal cancer in Crohn\'s disease: a Scandinavian population-based cohort study (47,035 patients)',
      journal: 'Lancet Gastroenterol Hepatol 2020', pmid: '32066530', url: 'https://pubmed.ncbi.nlm.nih.gov/32066530/' },
    { id: 'rothwell-2010', label: 'Rothwell et al — long-term effect of aspirin on colorectal cancer incidence and mortality: 20-year follow-up of five randomised trials',
      journal: 'Lancet 2010', pmid: '20970847', url: 'https://pubmed.ncbi.nlm.nih.gov/20970847/' },
    { id: 'uspstf-2021', label: 'US Preventive Services Task Force — screening for colorectal cancer, recommendation statement',
      journal: 'JAMA 2021', pmid: '34003218', url: 'https://pubmed.ncbi.nlm.nih.gov/34003218/' },
    { id: 'knudsen-2021', label: 'Knudsen et al — colorectal cancer screening: an updated modeling study for the USPSTF (CISNET, Table 3)',
      journal: 'JAMA 2021', pmid: '34003219', url: 'https://pubmed.ncbi.nlm.nih.gov/34003219/' },
    { id: 'lin-2021', label: 'Lin et al — screening for colorectal cancer: updated evidence report and systematic review for the USPSTF',
      journal: 'JAMA 2021', pmid: '34003220', url: 'https://pubmed.ncbi.nlm.nih.gov/34003220/' },
    { id: 'nordicc-2022', label: 'Bretthauer et al — effect of colonoscopy screening on risks of colorectal cancer and related death (NordICC)',
      journal: 'N Engl J Med 2022', pmid: '36214590', url: 'https://pubmed.ncbi.nlm.nih.gov/36214590/' },
    { id: 'lee-2014', label: 'Lee et al — accuracy of fecal immunochemical tests for colorectal cancer: systematic review and meta-analysis (19 studies)',
      journal: 'Ann Intern Med 2014', pmid: '24658694', url: 'https://pubmed.ncbi.nlm.nih.gov/24658694/' },
    { id: 'imperiale-2014', label: 'Imperiale et al — multitarget stool DNA testing for colorectal-cancer screening (9,989 participants)',
      journal: 'N Engl J Med 2014', pmid: '24645800', url: 'https://pubmed.ncbi.nlm.nih.gov/24645800/' },
    { id: 'johnson-2008', label: 'Johnson et al — accuracy of CT colonography for detection of large adenomas and cancers (ACRIN 6664)',
      journal: 'N Engl J Med 2008', pmid: '18799557', url: 'https://pubmed.ncbi.nlm.nih.gov/18799557/' },
    { id: 'schoen-2012', label: 'Schoen et al — colorectal-cancer incidence and mortality with screening flexible sigmoidoscopy (PLCO)',
      journal: 'N Engl J Med 2012', pmid: '22612596', url: 'https://pubmed.ncbi.nlm.nih.gov/22612596/' },
    { id: 'chung-2024', label: 'Chung et al — a cell-free DNA blood-based test for colorectal cancer screening (ECLIPSE)',
      journal: 'N Engl J Med 2024', pmid: '38477985', url: 'https://pubmed.ncbi.nlm.nih.gov/38477985/' },
    { id: 'fda-simplescreen', label: 'US FDA — premarket approval P250029, SimpleScreen CRC (Freenome): decision date 24 July 2026, and the approved indication',
      journal: 'FDA PMA database', url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P250029' },
    { id: 'cercek-2021', label: 'Cercek et al — a comprehensive comparison of early-onset and average-onset colorectal cancers (MSK)',
      journal: 'J Natl Cancer Inst 2021', pmid: '34405229', url: 'https://pubmed.ncbi.nlm.nih.gov/34405229/' },
    { id: 'guinney-2015', label: 'Guinney et al — the consensus molecular subtypes of colorectal cancer',
      journal: 'Nat Med 2015', pmid: '26457759', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
    { id: 'alascca-2025', label: 'Martling et al — low-dose aspirin for PI3K-altered localized colorectal cancer (ALASCCA, randomised, placebo-controlled)',
      journal: 'N Engl J Med 2025', pmid: '40961426', url: 'https://pubmed.ncbi.nlm.nih.gov/40961426/' },
    { id: 'deroock-2010', label: 'De Roock et al — effects of KRAS, BRAF, NRAS and PIK3CA mutations on cetuximab plus chemotherapy in chemotherapy-refractory metastatic colorectal cancer (retrospective consortium analysis)',
      journal: 'Lancet Oncol 2010', pmid: '20619739', url: 'https://pubmed.ncbi.nlm.nih.gov/20619739/' },
    { id: 'roelands-2023', label: 'Roelands et al — an integrated tumor, immune and microbiome atlas of colon cancer (AC-ICAM, 348 patients)',
      journal: 'Nat Med 2023', pmid: '37202560', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' },
    { id: 'label-panitumumab', label: 'Vectibix (panitumumab) US prescribing information — indications and limitations of use (effective 23 June 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:e0fa4bca-f245-4d92-ae29-b0c630a315c2' },
    { id: 'label-cetuximab', label: 'Erbitux (cetuximab) US prescribing information — indications and limitations of use (effective 16 April 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:8bc6397e-4bd8-4d37-a007-a327e4da34d9' },
    { id: 'label-encorafenib', label: 'Braftovi (encorafenib) US prescribing information — indications (effective 26 February 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:235dfc38-0f0b-4037-b501-7a9f4294740c' },
    { id: 'label-sotorasib', label: 'Lumakras (sotorasib) US prescribing information — indications (effective 22 January 2025)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:c80a362c-7ac3-4894-a076-0691e68ef8c1' },
    { id: 'label-tucatinib', label: 'Tukysa (tucatinib) US prescribing information — indications (effective 4 November 2024)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:f27eb1b9-b7fc-424e-988f-84dd7bb195a3' },
    { id: 'breakwater-2025', label: 'Elez et al — encorafenib, cetuximab, and mFOLFOX6 in BRAF-mutated colorectal cancer (BREAKWATER)',
      journal: 'N Engl J Med 2025', pmid: '40444708', url: 'https://pubmed.ncbi.nlm.nih.gov/40444708/' },
    { id: 'codebreak300-2023', label: 'Fakih et al — sotorasib plus panitumumab in refractory colorectal cancer with mutated KRAS G12C (CodeBreaK 300)',
      journal: 'N Engl J Med 2023', pmid: '37870968', url: 'https://pubmed.ncbi.nlm.nih.gov/37870968/' },
    { id: 'casak-2023', label: 'Casak et al — FDA approval summary: tucatinib with trastuzumab for HER2-positive, RAS wild-type colorectal cancer (MOUNTAINEER)',
      journal: 'Clin Cancer Res 2023', pmid: '37318379', url: 'https://pubmed.ncbi.nlm.nih.gov/37318379/' },

    /* Labels read through openFDA on 2026-09-14 for the targets entries and
       the curated colorectal drug pipeline. Each id is the label's set_id. */
    { id: 'label-adagrasib', label: 'Krazati (adagrasib) US prescribing information — colorectal indication, accelerated approval (effective 25 March 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:0b8bf078-34c2-4f45-9012-38a8ac082b01' },
    { id: 'label-dabrafenib', label: 'Tafinlar (dabrafenib) US prescribing information — limitations of use (effective 20 May 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea' },
    { id: 'label-pembrolizumab', label: 'Keytruda (pembrolizumab) US prescribing information — MSI-H or dMMR indications (effective 10 July 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:9333c79b-d487-4538-a9f0-71b91a02b287' },
    { id: 'label-nivolumab', label: 'Opdivo (nivolumab) US prescribing information — colorectal indications (effective 12 August 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:f570b9c4-6846-4de2-abfa-4d0a4ae4e394' },
    { id: 'label-dostarlimab', label: 'Jemperli (dostarlimab) US prescribing information — dMMR solid tumours, accelerated approval (effective 2 September 2025)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:095eab9f-545a-4f12-bfb7-19477fb901a5' },
    { id: 'label-bevacizumab', label: 'Avastin (bevacizumab) US prescribing information — indications, limitations of use and mechanism (effective 6 January 2025)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:939b5d1f-9fb2-4499-80ef-0607aa6b114e' },
    { id: 'label-ziv-aflibercept', label: 'Zaltrap (ziv-aflibercept) US prescribing information — indication and mechanism (effective 6 October 2025)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:f6725df6-50ee-4b0a-b900-d02ba634395d' },
    { id: 'label-ramucirumab', label: 'Cyramza (ramucirumab) US prescribing information — colorectal indication and mechanism (effective 9 June 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:c6080942-dee6-423e-b688-1272c2ae90d4' },
    { id: 'label-regorafenib', label: 'Stivarga (regorafenib) US prescribing information — colorectal indication and mechanism (effective 9 February 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:824f19c9-0546-4a8a-8d8f-c4055c04f7c7' },
    { id: 'label-fruquintinib', label: 'Fruzaqla (fruquintinib) US prescribing information — indication and mechanism (effective 31 July 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:186d786e-dc8a-45f2-b5e1-01ac0201879f' },
    { id: 'label-larotrectinib', label: 'Vitrakvi (larotrectinib) US prescribing information — NTRK gene fusion solid tumours (effective 22 May 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:0c8ca614-58b2-4aa4-83d3-0387a8f782fd' },
    { id: 'label-entrectinib', label: 'Rozlytrek (entrectinib) US prescribing information — NTRK gene fusion solid tumours (effective 4 December 2025)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:c7c71b0c-2549-4495-86b6-c2807fa54908' },
    { id: 'label-repotrectinib', label: 'Augtyro (repotrectinib) US prescribing information — NTRK gene fusion solid tumours (effective 13 June 2024)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:fb526827-40ba-4462-94cf-179ae3b0cb8a' },
    { id: 'label-selpercatinib', label: 'Retevmo (selpercatinib) US prescribing information — RET fusion-positive solid tumours (effective 14 July 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:7fa848ba-a59c-4144-9f52-64d090f4d828' },
    { id: 'label-trastuzumab-deruxtecan', label: 'Enhertu (fam-trastuzumab deruxtecan-nxki) US prescribing information — HER2-positive (IHC 3+) solid tumours and DESTINY-CRC02 (effective 15 May 2026)',
      journal: 'FDA label, via openFDA', setid: '7e67e73e-ddf4-4e4d-8b50-09d7514910b6',
      url: 'https://api.fda.gov/drug/label.json?search=set_id:7e67e73e-ddf4-4e4d-8b50-09d7514910b6' }
  ],

  /* ---- profile (Layer 0) --------------------------------------------
     The front door. The registry numbers come from the generated overlay;
     what lives here is framing. Most readers arrive at this cancer already
     knowing one thing about it — that it is appearing in younger people — so
     that is the second paragraph, with the registry figures behind it. It is
     not an axis: age belongs to the person, not the tumour.
  -------------------------------------------------------------------- */
  profile: {
    definition:
      'Colorectal cancer starts in the lining of the colon or rectum. It is the second most common ' +
      'cause of cancer death in the US, and the first in adults younger than 50. It can begin as a ' +
      '{{polyp|precancerous growth}} that {{screening}} finds and removes, which makes it one of the ' +
      'few cancers screening can prevent as well as find early.',

    definitionMore:
      'It is no longer only a disease of older people. From 2013 to 2022 incidence fell 0.9% a year ' +
      'overall, driven by a 2.5% yearly fall at 65 and older, while it rose 3% a year in adults aged ' +
      '20 to 49. The risk follows when someone was born more than how old they are — it has risen in ' +
      'every generation born since about 1950, a {{birth cohort}} effect whose cause is still largely ' +
      'unknown — and the rise sits in the {{distal colon}} and rectum: in adults 20 to 49, sigmoid ' +
      'colon cancer went from 2.1 to 3.7 per 100,000 between 1998 and 2022, and rectal cancer from ' +
      '3.6 to 6.6. Three in four people diagnosed before 50 have advanced disease, 27% with distant ' +
      'spread against 21–23% of older patients — partly because they are not screened, and partly ' +
      'because their symptoms are put down to something more common. A comparison of 759 early-onset ' +
      'and 687 average-onset patients at one US cancer centre found the younger patients\' tumours more ' +
      'often left-sided, and otherwise clinically and genomically indistinguishable.',

    world: {
      newCasesPerYear: 1900000,
      deathsPerYear: 900000,
      label: 'World',
      note: 'Modelled estimates for 2022: about 1.9 million new cases and more than 900,000 deaths. ' +
            'Colorectal cancer is the third most common cancer worldwide, about 10% of all cases, and ' +
            'the second leading cause of cancer death. Not a registry count, and not comparable with ' +
            'the US column beside it.',
      source: { label: 'World Health Organization — Colorectal cancer fact sheet, 13 February 2026 (GLOBOCAN 2022)',
                url: 'https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer' }
    },

    classification:
      'There is no single correct way to sort colorectal cancer. Several are in use at once, and each ' +
      'sorts every tumour into groups on its own — so a tumour has several answers, all true. Each is ' +
      'a {{classification axis}} here. For this cancer the first two are a place and a repair system: ' +
      'where in the bowel the tumour started, and whether it can still fix the errors it makes copying ' +
      'its own DNA.',

    classificationClose:
      'The two are not independent. In TCGA\'s colorectal cohort, 48 of the 63 {{MSI-H|MSI}} tumours ' +
      '(76.2%) were in the {{proximal colon}} — while the rise in younger adults runs the other way, ' +
      'toward the distal colon and rectum. So where a tumour sits already says something about its ' +
      'biology, and the age of the person says something about where it sits. Neither is a subtype. ' +
      'Both are measured links, and the site and repair cards carry the counts behind them.',

    reportIntro:
      'Those classifications are read off the {{pathology report}} and the tests run on the tumour: ' +
      'where the specimen came from, and four repair-protein stains or a DNA instability test. These ' +
      'are the words they use, and each one is a rung into the rest of this site.',

    reportTerms: [
      { term: 'Caecum … sigmoid colon', axis: 'site',
        plain: 'Where in the colon the tumour was found. The registry groups the parts up to the ' +
               'splenic flexure as {{proximal colon|proximal}}, and the descending and sigmoid colon ' +
               'as {{distal colon|distal}}.',
        goTo: 'site-proximal' },

      { term: 'Rectum', axis: 'site',
        plain: 'The last part of the large bowel. A rectal tumour is staged with MRI and its radiation ' +
               'and chemotherapy can come before surgery, so the word changes the plan.',
        goTo: 'site-rectum' },

      { term: 'MLH1, MSH2, MSH6, PMS2', marker: 'MMR', axis: 'repair', axisRole: 'measures',
        plain: 'Four stains, one for each repair protein. If any one is missing from the tumour, ' +
               'repair is {{dMMR|deficient}}.',
        goTo: 'rep-dmmr' },

      { term: 'MSI-H / MSS', marker: 'MSI', axis: 'repair', axisRole: 'measures',
        plain: 'The DNA-test version of the same question: {{MSI-H|unstable}} means repair has failed, ' +
               '{{MSS|stable}} means it works.',
        goTo: 'rep-dmmr' },

      { term: 'POLE', marker: 'POLE', axis: 'repair',
        plain: 'A rarer route to a {{hypermutated}} tumour, read by sequencing, in which mismatch repair ' +
               'still works.',
        goTo: 'rep-pole' },

      { term: 'KRAS, NRAS, BRAF', marker: 'RAS', axis: 'driver', axisRole: 'measures',
        plain: 'Genes tested once the cancer has spread. A KRAS or NRAS mutation rules out the ' +
               '{{anti-EGFR antibody|anti-EGFR antibodies}}; BRAF V600E and HER2 each have a ' +
               'combination of their own.',
        goTo: 'drv-ras-mutant' },

      /* No `axis`: stage is on every report and is not one of the classifications. */
      { term: 'Stage',
        plain: 'How far it has spread. For colorectal cancer the commonest stage at diagnosis is ' +
               'regional — spread to nearby lymph nodes.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Adenoma / polyp',
        plain: 'A precancerous growth, found and removed at {{colonoscopy}}. Not cancer: it is what ' +
               'screening removes before it can become one.',
        goToLens: 'risk', goToView: 'detection' }
    ],

    /* The generated Subtypes example would read "Colon is 68.6% of cases; Rectum
       is 31.4% and behaves very differently" — wrong twice here: the site shares
       are of the age-adjusted incidence RATE, not of cases, and the site-colon
       node itself says colon against rectum is the smaller molecular split. */
    lensExamples: {
      subtypes: 'The proximal colon is the largest site, 37.7% of the colorectal incidence rate. The ' +
                'rectum, 31.4%, is staged with MRI, and its treatment can begin before surgery.'
    },

    sources: [
      { label: 'SEER Cancer Stat Facts: Colorectal Cancer', url: 'https://seer.cancer.gov/statfacts/html/colorect.html' },
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Colorectal cancer statistics, 2026',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'World Health Organization — Colorectal cancer fact sheet, 13 February 2026 (GLOBOCAN 2022)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer' },
      { label: 'Cercek et al, J Natl Cancer Inst 2021 — early-onset against average-onset colorectal cancer',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34405229/' }
    ]
  },

  /* ---- baseline -----------------------------------------------------
     The denominator every convertible multiplier converts against, fetched by
     pipeline/run.py incidence off the SEER page. No strata: unlike lung's
     smoking, no exposure here is both common and strong enough to push
     baseline × rr past a probability, and every relative risk below that is
     measured against an unexposed group is shown as a bound.
  -------------------------------------------------------------------- */
  baseline: {
    population: 'US men and women',
    lifetimeRisk: 3.9,
    lifetimeRiskLabel: 'about 4 in 100',
    note: 'Averaged over a whole lifetime at current rates, and over a population that includes people ' +
          'with Lynch syndrome and inflammatory bowel disease. For colorectal cancer that average is ' +
          'also moving: incidence has risen in every generation born since about 1950 while it falls ' +
          'in older adults, and Siegel et al expect the burden in those generations to keep growing ' +
          'as they age.',
    source: { label: 'SEER Cancer Stat Facts: Colorectal Cancer — lifetime risk',
              url: 'https://seer.cancer.gov/statfacts/html/colorect.html' }
  },

  /* ---- factors ------------------------------------------------------
     Nineteen. Most relative risks come from one table — Siegel 2026 Table 5,
     "Established colorectal cancer risk factors" — which names the
     meta-analysis behind each row; where the table gives a range, the range
     is case–control against cohort studies, not a confidence interval.

     Three guards get used:
       - absoluteLifetime for Lynch, FAP and MUTYH. The PLSD and MUTYH figures
         are cumulative to 75 and 70, not whole-life, and the magnitude says so.
       - referent 'unexposed' (shown as a bound) for everything measured
         against people without the exposure.
       - scope 'site-colon' for aspirin and physical activity, whose effects
         were measured on colon cancer only — so neither is converted against
         a whole-colorectum baseline.
  -------------------------------------------------------------------- */
  factors: [

    { id: 'age', label: 'Increasing age', category: 'Demographic', modifiable: false,
      source: 'seer-colorectal',
      direction: 'increases', magnitude: 'median age at diagnosis 66', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'Median age 66 at diagnosis and 72 at death. The lifetime risk is itself an age-integrated ' +
            'number, so no single multiplier captures age — and for this cancer the age curve is ' +
            'shifting younger, which the Start lens describes.' },

    { id: 'sex', label: 'Male sex', category: 'Demographic', modifiable: false,
      source: [{ ref: 'siegel-2026', quote: 'Colorectal cancer incidence rates by tumor subsite and age, 2018–2022, United States … ' +
                                            'Colorectum 35.3 40.5 30.7' },
               { ref: 'siegel-2026', quote: 'CRC incidence rates in men are only 19% higher than in women younger than 50 years versus ' +
                                            '44% higher in those aged 50–64 years … incidence is 9% higher in men for proximal colon ' +
                                            'tumors but 41% higher for distal colon tumors and 57% higher for rectal tumors' },
               { ref: 'siegel-2026', quote: 'the death rate during 2019–2023 was 42% higher in men' }],
      direction: 'increases', magnitude: '40.5 per 100,000 in men against 30.7 in women', evidence: 'strong',
      scope: 'overall', affects: ['site-root', 'site-distal', 'site-rectum'],
      note: 'Age-adjusted incidence, 2018–2022. The gap depends on age and site: 19% higher in men under ' +
            '50 against 44% at 50–64, and 9% higher for proximal colon tumours against 41% distal and 57% ' +
            'rectal. The death rate in 2019–2023 was 42% higher in men.' },

    { id: 'race-ethnicity', label: 'Race and ethnicity', category: 'Demographic', modifiable: false,
      source: { ref: 'siegel-2026', quote: 'While Black–White disparities in incidence have narrowed from 22% higher rates in Black ' +
                                           'individuals in 2013 to 11% higher in 2022, AIAN–White disparities have widened from 39% ' +
                                           'to 48% higher rates' },
      direction: 'increases',
      magnitude: 'incidence 48% higher in American Indian and Alaska Native, and 11% higher in Black, than in White individuals (2022)',
      evidence: 'strong', scope: 'overall', affects: ['site-root'],
      note: 'Siegel et al attribute these gaps to differences in exposure to risk factors and in access to ' +
            'high-quality screening and treatment. The Black–White gap narrowed from 22% ' +
            'in 2013; the gap for American Indian and Alaska Native people widened from 39%.' },

    /* ---- family and inherited ---- */

    { id: 'family-history', label: 'Affected first-degree relative', category: 'Family history', modifiable: false,
      source: { ref: 'siegel-2026', quote: 'At least one first-degree relative (Roos 2019 … ) 1.7–2.2 At least one first-degree ' +
                                           'relative with diagnosis before age 50 years (Roos 2019 … ) 3.3–3.6 At least two ' +
                                           'first-degree relative relatives (Roos 2019 … ) 2.4–2.8 At least one second-degree ' +
                                           'relative (Roos 2019 … ) 1.1–1.9' },
      direction: 'increases', rr: [1.7, 2.2], referent: 'unexposed',
      magnitude: '1.7–2.2× with at least one affected parent, sibling or child', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From Roos 2019, as tabulated by Siegel 2026. The range separates case–control from cohort ' +
            'studies. Two or more affected first-degree relatives carry 2.4–2.8×; one affected ' +
            'second-degree relative 1.1–1.9×.' },

    { id: 'family-history-young', label: 'First-degree relative diagnosed before 50', category: 'Family history', modifiable: false,
      source: { ref: 'siegel-2026', quote: 'At least one first-degree relative (Roos 2019 … ) 1.7–2.2 At least one first-degree ' +
                                           'relative with diagnosis before age 50 years (Roos 2019 … ) 3.3–3.6' },
      direction: 'increases', rr: [3.3, 3.6], referent: 'unexposed',
      magnitude: '3.3–3.6×', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From Roos 2019, as tabulated by Siegel 2026, against 1.7–2.2× for any affected first-degree relative.' },

    { id: 'lynch-mlh1-msh2', label: 'Lynch syndrome — MLH1 or MSH2', category: 'Germline', modifiable: false,
      source: [{ ref: 'plsd-2020', quote: 'path_MLH1 path_MSH2 path_MSH6 path_PMS2 ICD-9 organ age females males females males ' +
                                          'females males both … 153, 154 colorectal … 75 48.3 [40.9–57.4] 57.1 [48.7–67.9] ' +
                                          '46.6 [39.1–55.4] 51.4 [41.0–65.0]' },
               { ref: 'plsd-2020', quote: 'After validation the cohorts were merged providing 6350 participants' }],
      direction: 'increases', absoluteLifetime: [46.6, 57.1],
      magnitude: 'colorectal cancer by age 75: 46.6–57.1%', evidence: 'strong',
      scope: 'overall', affects: ['rep-lynch'],
      note: 'Cumulative to 75, by gene and sex: MLH1 48.3% in women and 57.1% in men; MSH2 46.6% and ' +
            '51.4%. Counted prospectively in 6,350 carriers from each one\'s first planned colonoscopy, ' +
            'while they were followed under local surveillance guidelines — risks observed under ' +
            'surveillance. Risk to 75 rather than lifetime.' },

    { id: 'lynch-msh6-pms2', label: 'Lynch syndrome — MSH6 or PMS2', category: 'Germline', modifiable: false,
      source: { ref: 'plsd-2020', quote: 'path_MLH1 path_MSH2 path_MSH6 path_PMS2 ICD-9 organ age females males females males ' +
                                         'females males both … 153, 154 colorectal … 75 48.3 [40.9–57.4] 57.1 [48.7–67.9] ' +
                                         '46.6 [39.1–55.4] 51.4 [41.0–65.0] 20.3 [11.8–40.5] 18.2 [7.9–43.2] 10.4 [2.9–40.8]' },
      direction: 'increases', absoluteLifetime: [10.4, 20.3],
      magnitude: 'colorectal cancer by age 75: 10.4–20.3%', evidence: 'moderate',
      scope: 'overall', affects: ['rep-lynch'],
      note: 'MSH6 20.3% in women and 18.2% in men; PMS2 10.4% (both sexes, 95% CI 2.9–40.8). The study ' +
            'did not find a significantly increased cancer risk for PMS2 carriers, and the interval shows ' +
            'why the estimate is uncertain.' },

    { id: 'fap', label: 'Familial adenomatous polyposis (classic)', category: 'Germline', modifiable: false,
      source: 'genereviews-fap',
      direction: 'increases', absoluteLifetime: [93, 93],
      magnitude: '93% by age 50 without colectomy', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'Without removal of the colon, colorectal cancer is essentially inevitable: 87% by 45 and 93% ' +
            'by 50, at a mean age of 39. Rare — estimates run from 1 in 6,850 to 1 in 31,250 births.' },

    { id: 'mutyh-monoallelic', label: 'One faulty copy of MUTYH', category: 'Germline', modifiable: false,
      source: [{ ref: 'win-2014', quote: 'We studied 2332 individuals with monoallelic mutations in MUTYH among 9504 relatives of ' +
                                         '264 colorectal cancer (CRC) cases with a MUTYH mutation. We estimated CRC risks through ' +
                                         '70 years of age of 7.2% for male carriers … and 5.6% for female carriers' },
               { ref: 'win-2014', quote: 'with a first-degree relative with CRC diagnosed by 50 years of age who does not have the ' +
                                         'MUTYH mutation, risks of CRC were 12.5% for men (95% CI, 8.6%-17.7%) and 10% for women' }],
      direction: 'increases', absoluteLifetime: [5.6, 7.2],
      magnitude: '7.2% for men and 5.6% for women by age 70', evidence: 'moderate',
      scope: 'overall', affects: ['site-root'],
      note: 'Estimated from 2,332 carriers among the relatives of 264 people with MUTYH-mutated colorectal ' +
            'cancer. With a first-degree relative diagnosed by 50 who does not carry the mutation, 12.5% ' +
            'for men and 10% for women. Risk to 70 rather than lifetime.' },

    /* ---- medical history ---- */

    { id: 'ulcerative-colitis', label: 'Ulcerative colitis', category: 'Medical', modifiable: false,
      source: [{ ref: 'olen-uc-2020', quote: 'In this population-based cohort study of 96 447 patients with UC in Denmark (n=32 919) ' +
                                             'and Sweden (n=63 528), patients were followed up for CRC incidence and CRC mortality ' +
                                             'between Jan 1, 1969, and Dec 31, 2017' },
               { ref: 'olen-uc-2020', quote: '9544 incident CRCs in reference individuals (0·82 per 1000 person-years; HR 1·66, 95% ' +
                                             'CI 1·57-1·76) … HR 1·59, 95% CI 1·46-1·72' },
               { ref: 'olen-uc-2020', quote: 'during the last 5 years of follow-up (2013-17, Sweden only), the HR for incident CRC in ' +
                                             'people with UC was 1·38 (95% CI 1·20-1·60' }],
      direction: 'increases', rr: [1.57, 1.76], referent: 'unexposed',
      magnitude: 'HR 1.66 (1.57–1.76) against matched people without it', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: '96,447 patients in Denmark and Sweden, 1969–2017. The excess has declined: in 2013–2017 ' +
            '(Sweden only) the hazard ratio was 1.38 (1.20–1.60). The risk of dying of colorectal cancer ' +
            'was also higher, HR 1.59.' },

    { id: 'crohns', label: 'Crohn\'s disease', category: 'Medical', modifiable: false,
      source: [{ ref: 'olen-cd-2020', quote: 'we identified 47 035 patients with incident Crohn\'s disease (13 056 in Denmark and ' +
                                             '33 979 in Sweden)' },
               { ref: 'olen-cd-2020', quote: 'corresponding to an overall adjusted HR of 1·40 (95% CI 1·27-1·53)' },
               { ref: 'olen-cd-2020', quote: 'in patients potentially eligible for CRC surveillance we only found significantly ' +
                                             'increased risks in patients diagnosed with Crohn\'s disease before the age of 40 years, ' +
                                             'patients with disease activity in the colon only, or patients with PSC' }],
      direction: 'increases', rr: [1.27, 1.53], referent: 'unexposed',
      magnitude: 'HR 1.40 (1.27–1.53) against matched people without it', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: '47,035 patients in Denmark and Sweden. Among those followed long enough to be offered ' +
            'surveillance, the increase was significant only for people diagnosed before 40, with ' +
            'disease in the colon only, or with primary sclerosing cholangitis.' },

    { id: 'diabetes', label: 'Type 2 diabetes', category: 'Medical', modifiable: false,
      source: { ref: 'siegel-2026', quote: 'Type 2 diabetes (Zhang 2021 … ) 1.3' },
      direction: 'increases', rr: [1.3, 1.3], referent: 'unexposed',
      magnitude: 'about 1.3×', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From Zhang 2021, as tabulated by Siegel 2026.' },

    /* ---- lifestyle ---- */

    { id: 'alcohol', label: 'Very heavy alcohol use', category: 'Lifestyle', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Very heavy alcohol consumption: Daily average ≥3 drinks (McNabb 2020 … ) 1.3 … ' +
                                           'Meta-analysis of 16 studies of the association of alcohol with colorectal cancer' },
      direction: 'increases', rr: [1.3, 1.3], referent: 'unexposed',
      magnitude: 'about 1.3× at a daily average of 3 or more drinks', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From McNabb 2020, a meta-analysis of 16 studies, as tabulated by Siegel 2026. The ratio ' +
            'describes the heaviest drinkers, not a per-drink effect.' },

    { id: 'obesity', label: 'Obesity', category: 'Lifestyle', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Obesity: Body mass index ≥30 … (Zhang 2021 … ) 1.3 Colon (Xue 2017 … ) Male 1.5 ' +
                                           'Female 1.1 Rectum (Xue 2017 … ) Male 1.3 Female 1.1' },
      direction: 'increases', rr: [1.3, 1.3], referent: 'unexposed',
      magnitude: 'about 1.3× at a body mass index of 30 or more', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'The same table splits it by site and sex (Xue 2017): colon 1.5× in men and 1.1× in women, ' +
            'rectum 1.3× and 1.1×.' },

    { id: 'meat', label: 'Red and processed meat', category: 'Diet', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Red meat consumption: High vs. low (Schwingshackl 2018 … ) 1.1 Processed meat ' +
                                           'consumption: High vs. low (Schwingshackl 2018 … ) 1.1' },
      direction: 'increases', rr: [1.1, 1.1], referent: 'unexposed',
      magnitude: 'about 1.1× each, highest against lowest intake', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From Schwingshackl 2018, as tabulated by Siegel 2026 — one row each for red and for processed ' +
            'meat, with the same ratio.' },

    { id: 'smoking', label: 'Current smoking', category: 'Lifestyle', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Smoking: Current vs. never (Zhang 2021 … ) 1.2' },
      direction: 'increases', rr: [1.2, 1.2], referent: 'unexposed',
      magnitude: 'about 1.2× against never smokers', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'From Zhang 2021, as tabulated by Siegel 2026.' },

    { id: 'physical-activity', label: 'Lifetime physical activity', category: 'Lifestyle', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Lifetime physical activity: Colon (Hidayat 2019 … ) 0.8' },
      direction: 'decreases', rr: [0.8, 0.8], referent: 'unexposed',
      magnitude: 'about 0.8× for colon cancer', evidence: 'strong',
      scope: 'site-colon', affects: ['site-colon'],
      note: 'From Hidayat 2019, as tabulated by Siegel 2026. Measured for colon cancer, so it is not ' +
            'converted against the whole-colorectum baseline.' },

    { id: 'fibre-dairy', label: 'Dietary fibre, whole grains and dairy', category: 'Diet', modifiable: true,
      source: { ref: 'siegel-2026', quote: 'Dairy consumption: High vs. low (Schwingshackl 2018 … ) 0.8 Whole grains: High vs. low ' +
                                           '(Schwingshackl 2018 … ) 0.9 Total dietary fiber: High vs. low (Reynolds 2019 … ) 0.8' },
      direction: 'decreases', rr: [0.8, 0.9], referent: 'unexposed',
      magnitude: 'about 0.8–0.9×, highest against lowest intake', evidence: 'strong',
      scope: 'overall', affects: ['site-root'],
      note: 'Total dietary fibre 0.8 (Reynolds 2019), dairy 0.8 and whole grains 0.9 (Schwingshackl 2018). ' +
            'The range spans different foods, not a confidence interval.' },

    { id: 'aspirin', label: 'Aspirin taken for years', category: 'Medication', modifiable: true,
      source: [{ ref: 'rothwell-2010', quote: 'In the four trials of aspirin versus control (mean duration of scheduled treatment ' +
                                              '6·0 years), 391 (2·8%) of 14 033 patients had colorectal cancer during a median ' +
                                              'follow-up of 18·3 years. Allocation to aspirin reduced the 20-year risk of colon ' +
                                              'cancer (incidence hazard ratio [HR] 0·76, 0·60-0·96, p=0·02; … but not rectal cancer ' +
                                              '(0·90, 0·63-1·30' },
               { ref: 'rothwell-2010', quote: 'allocation to aspirin of 5 years or longer reduced risk of proximal colon cancer by ' +
                                              'about 70% … There was no increase in benefit at doses of aspirin greater than 75 mg daily' },
               { ref: 'rothwell-2010', quote: 'High-dose aspirin (≥500 mg daily) reduces long-term incidence of colorectal cancer, but ' +
                                              'adverse effects might limit its potential for long-term prevention' }],
      direction: 'decreases', rr: [0.60, 0.96], referent: 'unexposed',
      magnitude: 'HR 0.76 (0.60–0.96) for colon cancer over 20 years', evidence: 'strong',
      scope: 'site-colon', affects: ['site-colon', 'site-proximal'],
      note: 'Randomised: four trials of aspirin against control, with about 6 years of scheduled treatment ' +
            'and 18.3 years of median follow-up. It did not reduce rectal cancer overall (0.90, 0.63–1.30). ' +
            'Five years or more reduced proximal colon cancer by about 70%, and doses above 75 mg a day ' +
            'added no benefit. The trials were run to prevent vascular events, and the paper notes ' +
            'adverse effects might limit high-dose aspirin\'s potential for long-term prevention.' }
  ],

  /* ---- detection ----------------------------------------------------
     The trade here is not breast's (how big is the benefit) or lung's (how
     few it reaches). It is what is being measured: a model that assumes
     everyone does every test, and a trial that measured what an invitation
     achieves.

     Reading CISNET Table 3 (Knudsen 2021): its "CRC cases" and "CRC deaths"
     columns are cancers and deaths STILL OCCURRING under the strategy, not
     averted. The same paper's text puts averted cases at 16–74 and averted
     deaths at 15–32 per 1,000 across all strategies, and colonoscopy 45–75's
     table values (12–34 and 3–8) sit below both floors; unscreened, the models
     give 77–85 cases and 32–34 deaths. The rows below say "still", with the
     unscreened figure beside each.
  -------------------------------------------------------------------- */
  detection: {
    note: 'Screening does two jobs for this cancer: it removes precancerous growths before they become ' +
          'cancer, and it finds cancer before symptoms, when it is more treatable.',

    relativeSurvivalNote: 'Relative survival compares people who have the diagnosis with people of ' +
      'the same age who do not. It removes deaths from other causes rather than counting them, so ' +
      'it is not the share of people alive. Every survival figure on this page is relative.',

    stageOutcomes: [
      { stage: 'Localised', share: 34, fiveYear: 91.3, source: 'seer-colorectal',
        note: 'Confined to the colon or rectum.' },
      { stage: 'Regional', share: 37, fiveYear: 75.2, source: 'seer-colorectal',
        note: 'Spread to nearby lymph nodes — the largest single group at diagnosis.' },
      { stage: 'Distant', share: 23, fiveYear: 16.9, source: ['seer-colorectal',
        { ref: 'siegel-2026', quote: 'Three in four patients younger than age 50 are diagnosed with advanced disease, including ' +
                                     '27% with distant metastases versus 21%–23% of older patients … with the largest gap for ' +
                                     'distant-stage disease (23% vs. 17% in those aged 50–64 years and 10% in individuals aged ' +
                                     '65 years and older' }],
        note: 'Metastatic at diagnosis. Younger patients are found here more often than older ones, and ' +
              'yet survive longer once they are.' },
      { stage: 'Unknown', share: 6, fiveYear: 49.7, source: 'seer-colorectal',
        note: 'Incomplete staging in the registry record.' }
    ],

    tradeoff: {
      note: 'Screening prevents colorectal cancer as well as finding it, and it costs colonoscopies and ' +
            'their complications. The models behind the 2021 US recommendation put both on one ' +
            'denominator — on the assumption that everyone completes every test.',
      basis: 'per 1,000 unscreened 40-year-olds at average risk, offered colonoscopy every 10 years from ' +
             '45 to 75 and followed for life, assuming everyone completes every test (CISNET; each value ' +
             'is the range across three models)',
      rows: [
        { kind: 'benefit', value: '301–369', label: 'life-years gained' },
        { kind: 'benefit', value: '12–34', label: 'colorectal cancers still diagnosed, against 77–85 with no screening' },
        { kind: 'benefit', value: '3–8', label: 'colorectal cancer deaths still occurring, against 32–34 with no screening' },
        { kind: 'harm', value: '4,212–4,300', label: 'colonoscopies over a lifetime',
          note: 'The burden the models weigh against the benefit.' },
        { kind: 'harm', value: '15–17', label: 'complications from screening' }
      ],
      effect: {
        measure: 'RR', point: 0.82, ci: [0.70, 0.93],
        of: 'colorectal cancer in people invited to a single screening colonoscopy, against usual care (intention to screen)',
        followUp: 'median 10 years, 84,585 people aged 55–64 in Poland, Norway and Sweden (NordICC)',
        note: 'A risk of 0.98% against 1.20% at 10 years: 455 people had to be invited to prevent one cancer.'
      },
      disagreement: 'The model assumes everyone is screened. In NordICC, 42.0% of the people invited had ' +
        'the colonoscopy, and the trial measured the invitation. Its risk of dying of colorectal cancer ' +
        'was 0.28% against 0.31% (RR 0.90, 0.64–1.16), an interval that includes no difference at ten ' +
        'years. The two measure different things: what the test does when it is done, and what offering ' +
        'it achieves. In the US, 65% of adults 45 and older were up to date with screening in 2023, and ' +
        '37% of those aged 45–49.',
      sources: [
        { label: 'Knudsen et al, JAMA 2021 — CISNET modelling for the USPSTF', url: 'https://pubmed.ncbi.nlm.nih.gov/34003219/' },
        { label: 'Bretthauer et al, NEJM 2022 — NordICC', url: 'https://pubmed.ncbi.nlm.nih.gov/36214590/' },
        { label: 'Siegel et al, CA Cancer J Clin 2026 — screening prevalence, Table 8',
          url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' }
      ]
    },

    modalities: [
      { name: 'Colonoscopy', role: 'Population screening, and the follow-up for every other test',
        catches: 'Cancers and the precancerous polyps before them, which can be removed during the same ' +
                 'examination.',
        misses: 'People who never have it. In the only randomised trial, 42.0% of the people invited ' +
                'attended.',
        harms: 'Perforation in 3.1 and major bleeding in 14.6 of every 10,000 screening colonoscopies, ' +
               'pooled in the evidence review behind the US recommendation.',
        interval: 'Counted as up to date for 10 years in US screening surveys.',
        note: 'Every abnormal result from the other tests below leads here.',
        catchesSource: 'siegel-2026',
        missesSource: { ref: 'nordicc-2022', quote: '28,220 in the invited group, 11,843 of whom (42.0%) underwent screening' },
        harmsSource: { ref: 'lin-2021', quote: 'Serious harms of screening colonoscopy included perforations (3.1/10 000 procedures) ' +
                                       'and major bleeding (14.6/10 000 procedures)' },
        intervalSource: { ref: 'siegel-2026', quote: 'FOBT/FIT, sDNA, sigmoidoscopy, colonoscopy, or CT colonography in the past 1, 3, 5, 10, and 5 years, respectively' } },

      { name: 'Faecal immunochemical test (FIT)', role: 'Population screening, at home',
        catches: 'Traces of blood in a stool sample. Pooled sensitivity for cancer was 74% at 94% ' +
                 'specificity across 14 studies in the US evidence review; an earlier meta-analysis of 19 ' +
                 'studies found 79%.',
        misses: 'Most precancerous polyps: in a head-to-head trial FIT detected 23.8% of advanced ' +
                'precancerous lesions. And a positive result needs the colonoscopy after it — in one ' +
                'study of nearly 33,000 people with a positive stool test, 53% had one within a year.',
        harms: 'False positives send people to colonoscopy, with its own risks. Sensitivity rises at lower ' +
               'positivity cut-offs, and specificity falls with it.',
        interval: 'Counted as up to date for 1 year in US screening surveys.',
        catchesSource: [{ ref: 'lin-2021', quote: 'commonly evaluated FITs (14 studies, n = 45 403) (sensitivity, 0.74; ' +
                                          'specificity, 0.94)' },
                        { ref: 'lee-2014', quote: 'Nineteen eligible studies were included and meta-analyzed. The pooled ' +
                                                  'sensitivity … of FITs for CRC were 0.79 (95% CI, 0.69 to 0.86)' }],
        missesSource: [{ ref: 'imperiale-2014', quote: 'The sensitivity for detecting advanced precancerous lesions was 42.4% ' +
                                               'with DNA testing and 23.8% with FIT' },
                       { ref: 'siegel-2026', quote: 'a recent study of nearly 33,000 individuals who had a positive stool ' +
                                                    'test reported that only 53% received a colonoscopy within 1 year' }],
        harmsSource: { ref: 'lee-2014', quote: 'Sensitivity for CRC improved with lower assay cutoff values for a positive test ' +
                                       'result (for example, 0.89 [CI, 0.80 to 0.95] at a cutoff value less than 20 µg/g vs. ' +
                                       '0.70 [CI, 0.55 to 0.81] at cutoff values of 20 to 50 µg/g) but with a corresponding ' +
                                       'decrease in specificity' },
        intervalSource: { ref: 'siegel-2026', quote: 'FOBT/FIT, sDNA, sigmoidoscopy, colonoscopy, or CT colonography in the past 1, 3, 5, 10, and 5 years, respectively' } },

      { name: 'Multitarget stool DNA test', role: 'Population screening, at home',
        catches: 'In 9,989 people, 92.3% of cancers and 42.4% of advanced precancerous lesions, against ' +
                 '73.8% and 23.8% for FIT in the same people.',
        misses: 'More than half of advanced precancerous lesions.',
        harms: 'More false positives than FIT: specificity 86.6% against 94.9% among people with ' +
               'non-advanced or negative findings, and each positive result leads to a colonoscopy.',
        interval: 'Counted as up to date for 3 years in US screening surveys.',
        catchesSource: { ref: 'imperiale-2014', quote: 'Of the 9989 participants who could be evaluated … The sensitivity for ' +
                                               'detecting colorectal cancer was 92.3% with DNA testing and 73.8% with FIT … ' +
                                               'The sensitivity for detecting advanced precancerous lesions was 42.4% with ' +
                                               'DNA testing and 23.8% with FIT' },
        missesSource: { ref: 'imperiale-2014', quote: 'The sensitivity for detecting advanced precancerous lesions was 42.4% with ' +
                                              'DNA testing' },
        harmsSource: { ref: 'imperiale-2014', quote: 'Specificities with DNA testing and FIT were 86.6% and 94.9%, respectively, ' +
                                             'among participants with nonadvanced or negative findings' },
        intervalSource: { ref: 'siegel-2026', quote: 'FOBT/FIT, sDNA, sigmoidoscopy, colonoscopy, or CT colonography in the past 1, 3, 5, 10, and 5 years, respectively' } },

      { name: 'CT colonography', role: 'Population screening',
        catches: 'In 2,531 adults, 90% of the people who had an adenoma or cancer 10 mm or larger.',
        misses: 'Smaller lesions: per-patient sensitivity for adenomas 6 mm or larger was 78%.',
        harms: 'Low-dose radiation, and findings outside the colon whose net benefit or harm is unclear.',
        interval: 'Counted as up to date for 5 years in US screening surveys.',
        catchesSource: { ref: 'johnson-2008', quote: 'Complete data were available for 2531 participants (97%). … CT colonographic ' +
                                             'screening identified 90% of subjects with adenomas or cancers measuring 10 mm or ' +
                                             'more in diameter' },
        missesSource: { ref: 'johnson-2008', quote: 'The per-patient sensitivity for detecting adenomas that were 6 mm or more in ' +
                                            'diameter was 0.78' },
        harmsSource: 'lin-2021',
        intervalSource: { ref: 'siegel-2026', quote: 'FOBT/FIT, sDNA, sigmoidoscopy, colonoscopy, or CT colonography in the past 1, 3, 5, 10, and 5 years, respectively' } },

      { name: 'Flexible sigmoidoscopy', role: 'Population screening',
        catches: 'Cancers and polyps in the lower bowel. In PLCO\'s 154,900 people, screening cut ' +
                 'colorectal cancer incidence by 21% (RR 0.79, 0.72–0.85) and deaths by 26% (RR 0.74, ' +
                 '0.63–0.87).',
        misses: 'The proximal colon: deaths from proximal cancers did not change (RR 0.97, 0.77–1.22), ' +
                'while deaths from distal cancers halved (RR 0.50, 0.38–0.64).',
        harms: 'An examination of the bowel, and in the models behind the US recommendation every ' +
               'abnormal result is followed by colonoscopy.',
        interval: 'Counted as up to date for 5 years in US screening surveys.',
        catchesSource: { ref: 'schoen-2012', quote: 'we randomly assigned 154,900 men and women … which represents a 21% reduction ' +
                                            '(relative risk, 0.79; 95% confidence interval [CI], 0.72 to 0.85 … which represents ' +
                                            'a 26% reduction (relative risk, 0.74; 95% CI, 0.63 to 0.87' },
        missesSource: { ref: 'schoen-2012', quote: 'Mortality from distal colorectal cancer was reduced by 50% (87 deaths in the ' +
                                           'intervention group vs. 175 in the usual-care group; relative risk, 0.50; 95% CI, ' +
                                           '0.38 to 0.64; P<0.001); mortality from proximal colorectal cancer was unaffected ' +
                                           '(143 and 147 deaths, respectively; relative risk, 0.97; 95% CI, 0.77 to 1.22' },
        harmsSource: 'knudsen-2021',
        intervalSource: { ref: 'siegel-2026', quote: 'FOBT/FIT, sDNA, sigmoidoscopy, colonoscopy, or CT colonography in the past 1, 3, 5, 10, and 5 years, respectively' } },

      { name: 'Blood-based cell-free DNA test', role: 'Screening for adults at average risk',
        catches: 'In 7,861 evaluable people, 83.1% of the cancers colonoscopy found (95% CI 72.2–90.3), ' +
                 'and 87.5% of stage I–III cancers.',
        misses: 'Nearly all precancerous lesions: sensitivity for advanced precancerous lesions was 13.2%.',
        harms: '10.4% of people with no advanced neoplasia tested positive, and a positive result should ' +
               'be followed by colonoscopy.',
        interval: 'Not among the strategies the 2021 US recommendation\'s models compared.',
        note: 'The trial figures are for the first approved test, Shield. A second, SimpleScreen CRC, was ' +
              'approved by the FDA on 24 July 2026 for screening adults 45 and older at average risk, and ' +
              'its approval states it is not a replacement for diagnostic colonoscopy.',
        noteSource: 'fda-simplescreen',
        catchesSource: { ref: 'chung-2024', quote: '7861 of whom met eligibility criteria and were evaluable … a sensitivity of the ' +
                                           'cfDNA test for detection of colorectal cancer of 83.1% (95% confidence interval ' +
                                           '[CI], 72.2 to 90.3). Sensitivity for stage I, II, or III colorectal cancer was 87.5%' },
        missesSource: { ref: 'chung-2024', quote: 'sensitivity for advanced precancerous lesions was 13.2%' },
        harmsSource: [{ ref: 'chung-2024', quote: 'A total of 89.6% of the participants without any advanced colorectal ' +
                                         'neoplasia … identified on colonoscopy had a negative cfDNA blood-based test, ' +
                                         'whereas 10.4% had a positive cfDNA blood-based test' }, 'fda-simplescreen'],
        intervalSource: { ref: 'knudsen-2021', quote: 'Screening from ages 45, 50, or 55 years to ages 70, 75, 80, or 85 years ' +
                                              'with fecal immunochemical testing (FIT), multitarget stool DNA testing, flexible ' +
                                              'sigmoidoscopy alone or with FIT, computed tomography colonography, or colonoscopy' } }
    ],

    signs: [
      'Blood, bright red or very dark, in the stool',
      'A change in bowel habits — diarrhoea, constipation, a feeling the bowel does not empty, or stools narrower than usual',
      'General abdominal discomfort: frequent gas pains, bloating, fullness or cramps',
      'Weight loss with no known reason',
      'Fatigue',
      'Vomiting',
      'All of these can have other causes. In people under 50, rectal bleeding is a more common first sign than in older patients, and symptoms are often first put down to something more common'
    ],

    sources: [
      { label: 'NCI PDQ — Colon Cancer Treatment (Patient Version): signs and symptoms',
        url: 'https://www.cancer.gov/types/colorectal/patient/colon-treatment-pdq' },
      { label: 'SEER Cancer Stat Facts: Colorectal Cancer — stage distribution and survival',
        url: 'https://seer.cancer.gov/statfacts/html/colorect.html' },
      { label: 'USPSTF colorectal cancer screening recommendation (JAMA 2021)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34003218/' },
      { label: 'Siegel et al, CA Cancer J Clin 2026 — early-onset presentation and screening',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'US FDA — premarket approval P250029, SimpleScreen CRC',
        url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P250029' }
    ]
  },

  /* ---- targets (curated layer) ----------------------------------------
     EGFR is the case that forced `excludedBy`: both anti-EGFR antibody labels
     rule out RAS-mutant disease, so what decides who may receive the drug is the
     absence of a change in another gene. Each share printed is drv-ras-mutant's
     own. Every other entry is written from US labels read through openFDA on
     2026-09-14 and says only what those labels say; the figures beside each
     gene come from the generated overlay.
  -------------------------------------------------------------------- */
  targets: [
    { gene: 'EGFR',
      summary: 'Both labels call their drug an EGFR antagonist, and neither asks for a change in EGFR. ' +
               'Panitumumab\'s asks for wild-type RAS, defined in both KRAS and NRAS; cetuximab\'s for ' +
               'K-Ras wild-type, EGFR-expressing disease.',
      source: ['label-panitumumab', 'label-cetuximab'],
      excludedBy: [
        { nodes: ['drv-ras-mutant'],
          agents: 'cetuximab and panitumumab',
          except: { nodes: ['drv-kras-g12c'], agents: 'panitumumab with sotorasib, after chemotherapy' },
          source: ['label-panitumumab', 'label-cetuximab'] }
      ] },

    { gene: 'ERBB2',
      summary: 'Tucatinib with trastuzumab is indicated for HER2-positive disease only when RAS is also wild ' +
               'type, after fluoropyrimidine-, oxaliplatin- and irinotecan-based chemotherapy, under ' +
               'accelerated approval.',
      caveat: 'Trastuzumab deruxtecan is labelled for HER2-positive (IHC 3+) solid tumours after prior ' +
              'treatment; its label counts 64 patients with colorectal cancer from DESTINY-CRC02.',
      source: 'label-tucatinib',
      caveatSource: [{ ref: 'label-trastuzumab-deruxtecan', section: 'indications_and_usage',
                       quote: 'ENHERTU, as monotherapy, is indicated for the treatment of adult patients with ' +
                              'unresectable or metastatic HER2-positive (IHC 3+) solid tumors who have received prior ' +
                              'systemic treatment' },
                     { ref: 'label-trastuzumab-deruxtecan', section: 'clinical_studies',
                       quote: 'DESTINY-CRC02 (NCT04744831) was a multicenter, randomized, 2-arm trial that included 64 ' +
                              'patients with previously treated, unresectable or metastatic centrally confirmed ' +
                              'HER2-positive (IHC 3+) colorectal cancer (CRC).' },
                     { nct: 'NCT04744831', label: 'DESTINY-CRC02' }],
      excludedBy: [
        { nodes: ['drv-ras-mutant'], agents: 'tucatinib with trastuzumab', source: 'label-tucatinib' }
      ] },

    { gene: 'KRAS',
      summary: 'Two G12C inhibitors carry colorectal indications, each given with an anti-EGFR antibody: ' +
               'sotorasib with panitumumab and adagrasib with cetuximab, both after fluoropyrimidine-, ' +
               'oxaliplatin- and irinotecan-based chemotherapy.',
      caveat: 'Neither label covers a KRAS change other than G12C, and adagrasib\'s colorectal indication is ' +
              'an accelerated approval.',
      source: ['label-sotorasib', 'label-adagrasib'],
      caveatSource: ['label-sotorasib', 'label-adagrasib'] },

    { gene: 'BRAF',
      summary: 'Encorafenib carries two colorectal indications for BRAF V600E, both with cetuximab: with ' +
               'fluorouracil-based chemotherapy, and without it after prior therapy.',
      caveat: 'The dabrafenib label states that it is not indicated for colorectal cancer because of known ' +
              'intrinsic resistance to BRAF inhibition.',
      source: 'label-encorafenib',
      caveatSource: 'label-dabrafenib' },

    { gene: 'PDCD1',
      summary: 'Three PD-1 antibodies are labelled where mismatch repair is deficient: pembrolizumab, and ' +
               'nivolumab alone or with ipilimumab, for MSI-H or dMMR colorectal cancer; dostarlimab for dMMR ' +
               'solid tumours that have progressed after prior treatment.',
      caveat: 'None of these indications asks for a PD-L1 test, and dostarlimab\'s is an accelerated approval.',
      watch: 'Dostarlimab for previously untreated stage II and III dMMR/MSI-H locally advanced rectal cancer ' +
             'is under FDA priority review, with a target action date in February 2027.',
      source: ['label-pembrolizumab', 'label-nivolumab', 'label-dostarlimab'],
      caveatSource: ['label-pembrolizumab', 'label-nivolumab', 'label-dostarlimab'],
      watchSource: [{ label: 'GSK — Jemperli sBLA accepted for FDA priority review (24 August 2026)',
                      url: 'https://us.gsk.com/en-us/media/press-releases/jemperli-dostarlimab-gxly-accepted-for-priority-review-by-the-us-fda/' },
                    { nct: 'NCT05723562', label: 'AZUR-1' }] },

    { gene: 'VEGFA',
      summary: 'Bevacizumab binds VEGF and is labelled with fluorouracil-based chemotherapy for metastatic ' +
               'colorectal cancer. Ziv-aflibercept binds VEGF-A, VEGF-B and PlGF, and is labelled with FOLFIRI ' +
               'after an oxaliplatin-containing regimen.',
      caveat: 'Neither indication names a tumour test. The bevacizumab label says it is not indicated for ' +
              'adjuvant treatment of colon cancer.',
      source: ['label-bevacizumab', 'label-ziv-aflibercept'],
      caveatSource: ['label-bevacizumab', 'label-ziv-aflibercept'] },

    { gene: 'KDR',
      summary: 'Ramucirumab binds VEGFR2 and is labelled with FOLFIRI after bevacizumab, oxaliplatin and a ' +
               'fluoropyrimidine. Fruquintinib inhibits all three VEGF receptors, and regorafenib a longer list ' +
               'of kinases that includes them.',
      caveat: 'Fruquintinib and regorafenib are labelled only after chemotherapy, an anti-VEGF therapy and, if ' +
              'the tumour is RAS wild type, an anti-EGFR therapy.',
      source: ['label-ramucirumab', 'label-fruquintinib', 'label-regorafenib'],
      caveatSource: ['label-fruquintinib', 'label-regorafenib'] },

    { gene: 'NTRK1',
      summary: 'Three TRK inhibitors — larotrectinib, entrectinib and repotrectinib — are labelled for solid ' +
               'tumours with an NTRK gene fusion, whatever the organ.',
      caveat: 'The labels name a fusion in any NTRK gene; the fusion track on this card counts NTRK1 alone.',
      source: ['label-larotrectinib', 'label-entrectinib', 'label-repotrectinib'] },

    { gene: 'RET',
      summary: 'Selpercatinib is labelled for solid tumours with a RET gene fusion, whatever the organ.',
      source: 'label-selpercatinib' }
  ],

  /* ---- markers -------------------------------------------------------
     The repair axis is read two ways — four stains, or an instability test —
     and POLE by sequencing. The driver-axis markers (RAS, BRAF, HER2) are
     declared now so later nodes can use them.
  -------------------------------------------------------------------- */
  markers: [
    { id: 'MMR', label: 'Mismatch repair proteins (MLH1, MSH2, MSH6, PMS2)', assay: 'IHC',
      positiveThreshold: 'deficient when any one of the four is lost from the tumour cell nuclei' },
    { id: 'MSI', label: 'Microsatellite instability', assay: 'PCR or DNA sequencing' },
    { id: 'POLE', label: 'POLE proofreading-domain mutation', assay: 'DNA sequencing' },
    { id: 'RAS', label: 'KRAS / NRAS mutation', assay: 'DNA sequencing of the tumour' },
    { id: 'BRAF', label: 'BRAF V600E mutation', assay: 'DNA sequencing' },
    { id: 'HER2', label: 'HER2 (ERBB2) amplification', assay: 'IHC, ISH or DNA sequencing' }
  ],

  /* ---- glossary -----------------------------------------------------
     An entry WITH `d` replaces the engine term; an entry with only `w` keeps
     the engine definition and replaces the example.
  -------------------------------------------------------------------- */
  glossary: {

    groups: [
      { id: 'classification', label: 'How colorectal cancer is sorted' }
    ],

    terms: [

      /* ---- words this cancer owns ---- */

      { t: 'mismatch repair', g: 'classification', alias: ['MMR', 'DNA mismatch repair'],
        d: 'The cell\'s system for fixing the small errors made when DNA is copied. Four proteins ' +
           'do most of the work: MLH1, MSH2, MSH6 and PMS2.',
        w: 'The second axis here sorts every tumour by whether this system still works.' },

      { t: 'dMMR', g: 'classification', full: 'Mismatch repair deficient',
        alias: ['mismatch repair deficient', 'mismatch repair deficiency', 'MMR-deficient', 'MMR-D'],
        d: 'A tumour that has lost mismatch repair, usually seen as one of the four repair proteins ' +
           'missing from a stain.',
        w: 'The node that selects immunotherapy first for metastatic colorectal cancer.' },

      { t: 'pMMR', g: 'classification', full: 'Mismatch repair proficient',
        alias: ['mismatch repair proficient', 'MMR-proficient', 'MMR-P'],
        d: 'A tumour whose mismatch repair still works: all four repair proteins are present.',
        w: 'Most colorectal cancer. POLE-mutant tumours sit inside it, because their mismatch ' +
           'repair works too.' },

      { t: 'MSI-H', g: 'classification', full: 'Microsatellite instability–high',
        alias: ['MSI', 'microsatellite instability', 'microsatellite unstable', 'MSI-high'],
        d: 'Short repeated stretches of DNA (microsatellites) that have changed length in the ' +
           'tumour — the trace lost mismatch repair leaves behind. Tested on DNA rather than by stain.',
        w: 'Read as the same group as dMMR on this site. Both trials on the dMMR node enrolled ' +
           '"MSI-H or dMMR" tumours, accepting either test.' },

      { t: 'MSS', g: 'classification', full: 'Microsatellite stable',
        alias: ['microsatellite stable'],
        d: 'A tumour whose microsatellites have not changed length — the DNA-test counterpart of ' +
           'proficient mismatch repair.',
        w: 'The wording a molecular report uses where a stain report would say pMMR.' },

      { t: 'Lynch syndrome', g: 'classification', alias: ['Lynch', 'hereditary nonpolyposis colorectal cancer', 'HNPCC'],
        d: 'An inherited variant in a mismatch repair gene (or EPCAM), which raises the lifetime ' +
           'risk of colorectal and several other cancers.',
        w: 'The inherited part of the repair-deficient node. Finding it in a tumour changes what ' +
           'the patient\'s relatives are offered.' },

      { t: 'POLE', g: 'classification', alias: ['polymerase epsilon', 'POLE-mutant', 'POLE ultramutated'],
        d: 'The gene for DNA polymerase epsilon, which proofreads its own copying. Certain mutations ' +
           'in its proofreading domain leave a tumour hypermutated.',
        w: 'A small node under proficient repair: these tumours are hypermutated, like repair-deficient ' +
           'ones, but their mismatch repair works.' },

      { t: 'hypermutated', g: 'molecular', alias: ['hypermutation', 'ultramutated'],
        d: 'Carrying far more mutations than a typical tumour of the same kind, usually because a ' +
           'DNA repair or proofreading system is broken.',
        w: 'What repair-deficient and POLE-mutant colorectal tumours have in common, by two ' +
           'different routes.' },

      { t: 'proximal colon', g: 'classification', alias: ['proximal', 'right colon', 'right-sided colon'],
        d: 'The first part of the colon: caecum, ascending colon, hepatic flexure, transverse colon ' +
           'and, in the registry definition used here, the splenic flexure.',
        w: 'The largest box on the site axis, and where most repair-deficient tumours are.' },

      { t: 'distal colon', g: 'classification', alias: ['distal', 'left colon', 'left-sided colon'],
        d: 'The descending and sigmoid colon — the last parts before the rectum.',
        w: 'One of the two sites where the rise in colorectal cancer among younger generations is ' +
           'concentrated.' },

      { t: 'sidedness', g: 'classification', alias: ['left-sided', 'right-sided', 'side of the primary tumour', 'tumour side'],
        d: 'A two-way split, left or right, that some studies use instead of proximal and distal. ' +
           'Where the line falls varies between studies.',
        w: 'The MSK cohort records only Left or Right and files rectal tumours under Left — so its ' +
           'side is not the same grouping as this site\'s proximal and distal nodes.' },

      { t: 'rectosigmoid junction', g: 'classification', alias: ['rectosigmoid'],
        d: 'Where the sigmoid colon meets the rectum.',
        w: 'Counted with the rectum here, as the registry analysis behind the site axis counts it.' },

      { t: 'CMS', g: 'classification', full: 'Consensus molecular subtypes',
        alias: ['consensus molecular subtypes', 'CMS1', 'CMS2', 'CMS3', 'CMS4'],
        d: 'Four colorectal cancer subtypes, CMS1 to CMS4, defined from gene expression by an ' +
           'international consortium.',
        w: 'A research classification, not part of a routine report. The fourth axis here, measured ' +
           'in one cohort of colon cancer.' },

      { t: 'RAS wild type', g: 'classification', alias: ['wild-type RAS', 'RAS wild-type', 'RAS/BRAF wild type'],
        d: 'No mutation found in KRAS or NRAS. The panitumumab label defines it in both genes, as ' +
           'determined by an approved test.',
        w: 'What the anti-EGFR antibody labels ask for in metastatic colorectal cancer.' },

      { t: 'anti-EGFR antibody', g: 'drugs', alias: ['anti-EGFR antibodies', 'anti-EGFR', 'cetuximab', 'panitumumab'],
        d: 'An antibody that blocks the epidermal growth factor receptor (EGFR). Cetuximab and ' +
           'panitumumab are the two used in colorectal cancer.',
        w: 'Neither is indicated for RAS-mutant colorectal cancer — except panitumumab given with ' +
           'sotorasib for KRAS G12C.' },

      { t: 'early-onset colorectal cancer', g: 'classification', alias: ['early-onset', 'early onset', 'average-onset'],
        d: 'Colorectal cancer diagnosed before age 50; average-onset means at 50 or older.',
        w: 'Not a subtype on this site: it belongs to the person, not the tumour, so it appears as a ' +
           'comparison on the rectum and repair-deficient cards rather than as an axis.' },

      { t: 'mucinous', g: 'classification', alias: ['mucinous adenocarcinoma'],
        d: 'An adenocarcinoma in which much of the tumour is made of mucus outside the cells.',
        w: 'OncoTree gives it its own code (MACR). This site does not draw it as a node.' },

      { t: 'ICD-O-3', g: 'numbers', alias: ['ICD-O', 'site code', 'topography code'],
        d: 'The International Classification of Diseases for Oncology. Its site codes record where ' +
           'in the body a tumour arose — C18 for the colon, C20 for the rectum.',
        w: 'The site axis is built on these codes, so its boxes mean exactly what the registry means.' },

      { t: 'polyp', g: 'detection', alias: ['polyps', 'adenoma', 'adenomas', 'precancerous growth'],
        d: 'A growth on the inner lining of the bowel. Adenomas are the kind that can become cancer, and ' +
           'they can be removed during a colonoscopy.',
        w: 'What colorectal screening removes, which is why it can prevent this cancer and not only find it.' },

      { t: 'colonoscopy', g: 'detection', alias: ['colonoscopies'],
        d: 'An examination of the whole colon and rectum with a camera on a flexible tube. Polyps found ' +
           'during it can be removed at the same time.',
        w: 'The test every other colorectal screening test sends a positive result to.' },

      { t: 'birth cohort', g: 'numbers', alias: ['birth-cohort effect', 'birth cohort effect'],
        d: 'Everyone born in the same span of years. A birth-cohort effect is a risk that follows when ' +
           'people were born more closely than how old they are when diagnosed.',
        w: 'Colorectal cancer in younger adults: incidence has risen in every generation born since about 1950.' },

      /* ---- engine definitions, colorectal examples ---- */

      { t: 'germline',
        w: 'Lynch syndrome is the germline cause on this site: an inherited repair-gene variant ' +
           'present in every cell, not only the tumour.' },

      { t: 'IHC',
        w: 'Four stains — MLH1, MSH2, MSH6 and PMS2 — are one of the two ways a colorectal tumour is ' +
           'tested for mismatch repair; a DNA test for microsatellite instability is the other.' },

      { t: 'prevalence',
        w: 'Two bases on this site. Site shares are shares of the age-adjusted incidence rate; repair ' +
           'shares come from a pooled series of mostly stage II and III tumours. Each axis note says which.' },

      { t: 'age-adjusted',
        w: 'The site shares are shares of age-adjusted rates, not of case counts — a younger or older ' +
           'population would not change them.' },

      { t: 'cohort',
        w: 'The site and repair nodes carry figures from TCGA PanCanAtlas, the driver-class nodes from ' +
           'MSK\'s patients with metastatic disease, and the CMS nodes from the AC-ICAM colon cancer ' +
           'cohort. Each card names its own.' }
    ]
  },

  /* ---- axes ---------------------------------------------------------- */
  axes: [
    { id: 'site', label: 'Tumour site (ICD-O-3)', shortLabel: 'Site', default: true,
      shareOf: 'the age-adjusted incidence rate',
      asks: 'Where in the large bowel did it start?',
      measures: 'Where the tumour sits, found at colonoscopy, imaging or surgery, and recorded by the ' +
                'cancer registry as a site code.',
      decides: 'How it is staged and treated: NCI keeps separate treatment summaries for colon and ' +
               'rectal cancer, and rectal cancer is staged with MRI. Within the colon, side ' +
               'travels with biology — repair-deficient tumours cluster in the proximal colon.',
      note: 'Shares are of the age-adjusted incidence rate, not of case counts: Siegel 2026 Table 2, ' +
            'US 2018–2022, both sexes — colorectum 35.3 per 100,000, colon 24.2 (proximal 13.3, ' +
            'distal 8.7, unspecified 2.2) and rectum 11.1. The groups use that paper\'s site-code ' +
            'definitions and exclude the appendix. The same paper puts rectal cancer at 32% of ' +
            'colorectal cancers in 2022 alone, against 31.4% of the 2018–2022 rate here: a single ' +
            'year and a five-year average are different numbers.' },

    { id: 'repair', label: 'Mismatch repair status', shortLabel: 'Repair', default: false,
      asks: 'Can the tumour still fix the errors it makes copying its DNA?',
      measures: 'Four stains on the tumour — MLH1, MSH2, MSH6 and PMS2 — where the loss of any one ' +
                'means repair is deficient; or a DNA test for microsatellite instability, the trace ' +
                'that loss leaves. POLE mutation is read by sequencing.',
      decides: 'Whether immunotherapy comes first when the cancer has spread, and whether the person ' +
               'is referred for germline testing for Lynch syndrome.',
      note: 'Shares from Domingo 2016: 6,277 tumours tested for both repair status and POLE, pooled ' +
            'from trials and cohorts of mostly stage II and III disease. In metastatic disease the ' +
            'share is smaller — about 4% of stage IV colorectal cancer in NCI\'s treatment summary, ' +
            'and 96 of 1,099 patients (8.7%) by the MSK metastatic cohort\'s own MSI call. The Lynch ' +
            'share comes from a different series (Hampel 2008, 1,566 patients), so sporadic ' +
            'deficiency — 13.3 minus 2.8 — is a difference between two studies, not a count. POLE ' +
            'sits under proficient because none of Domingo\'s 66 POLE-mutant tumours was repair ' +
            'deficient.' },

    { id: 'driver', label: 'RAS / BRAF / HER2 class (derived, MSK)', shortLabel: 'Driver class', default: false,
      population: { label: 'Metastatic colorectal cancer, leaving out MSI-H and POLE-mutant tumours (MSK, 995 patients)',
                    short: 'metastatic disease outside MSI-H and POLE', source: 'msk-crc-2017' },
      asks: 'Once the cancer has spread, which gene change picks the drug?',
      measures: 'Sequencing of the tumour for KRAS, NRAS and BRAF mutations, and a test for HER2 (ERBB2). ' +
                'Here the class is computed from MSK\'s own mutation and copy-number calls, because no ' +
                'cohort records it.',
      decides: 'Which combination is used. BRAF V600E, KRAS G12C and HER2 each have an approved one. A KRAS ' +
               'or NRAS mutation rules the anti-EGFR antibodies out — the only class here selected by what ' +
               'a tumour lacks rather than what it has.',
      note: 'Shares computed by the pipeline from MSK\'s crc_msk_2017 — 1,099 patients with metastatic disease, ' +
            'one tumour each — sorted in the order a treatment decision is made: BRAF V600E, then KRAS G12C, ' +
            'then any other KRAS or NRAS change at the codons the anti-EGFR labels name, then ERBB2 ' +
            'amplification, and last none of these. The 104 MSI-H or POLE-mutant tumours belong to the repair ' +
            'axis and are left out, so every share is of the 995 that remain. POLE-mutant tumours are left out ' +
            'by the classifier\'s order although their mismatch repair works. MSK is a referral centre, so ' +
            'these are not population shares. There is no disease-state axis beside this one; the root card ' +
            'says why.' },

    { id: 'cms', label: 'Consensus molecular subtype (CMS)', shortLabel: 'CMS', default: false,
      population: { label: 'Primary colon cancer, all stages, in one cohort (AC-ICAM, Leiden, 348 patients)',
                    short: 'colon cancer in AC-ICAM',
                    source: { ref: 'roelands-2023', quote: 'we performed comprehensive genomic analyses on fresh-frozen ' +
                                                         'samples from 348 patients affected by primary colon cancer' } },
      asks: 'Which pattern of gene activity does the tumour show?',
      measures: 'Gene expression across the tumour — here from RNA sequencing — sorted into four subtypes, ' +
                'or left mixed when its features do not fit one.',
      decides: 'No treatment on this site is selected by it. The consortium that defined it proposed it as ' +
               'the basis for future clinical stratification, and in the cohort shown here an immune gene ' +
               'signature outperformed it as a prognostic marker.',
      note: 'Shares from AC-ICAM, where all 348 patients have a CMS call: CMS1 12.4%, CMS2 21.8%, CMS3 19.0%, ' +
            'CMS4 23.6% and mixed 23.3%. The consortium\'s shares across the datasets it pooled were 14%, 37%, ' +
            '13%, 23% and 13% mixed. The two sets are shown side by side, not reconciled; CMS2 differs most. ' +
            'The cohort is colon cancer only, so this axis says nothing about rectal cancer.' }
  ],

  nodes: [

  /* ============================== AXIS 1 — SITE ============================== */

  {
    id: 'site-root', axis: 'site', parent: null,
    label: 'All colorectal cancer', shortLabel: 'All colorectal',
    prevalence: 100,
    summary: 'Cancer of the colon or rectum, sorted by where it started. It is now the leading cause ' +
             'of cancer death in US adults younger than 50.',
    prognosis: {
      source: 'seer-colorectal',
      relativeOutlook: 'An estimated 55,230 US deaths in 2026, 8.8% of all cancer deaths.',
      fiveYearNote: '65.4% five-year relative survival across all stages — 91.3% when found ' +
                    'localised, 16.9% once it has reached distant organs.',
      caveat: 'An average over every site and stage. Only a third of cases are found localised.'
    },
    molecular: {
      biomarkers: [
        { name: 'PI3K-pathway alteration (PIK3CA, PIK3R1 or PTEN), after surgery for stage I–III rectal or II–III colon cancer',
          use: 'low-dose aspirin, 160 mg daily for 3 years, against placebo (ALASCCA) — a trial result; no label here names it',
          threshold: '3-year recurrence 7.7% against 14.1% with a PIK3CA exon 9 or 20 hotspot mutation (HR 0.49, ' +
                     '0.24–0.98), and 7.7% against 16.8% with another PIK3CA, PIK3R1 or PTEN variant (HR 0.42, ' +
                     '0.21–0.83); severe adverse events 16.8% against 11.6%. The trial found an alteration in 1,103 ' +
                     'of 2,980 patients with complete genomic data (37.0%)',
          source: { ref: 'alascca-2025', quote: 'The patients were assigned in a 1:1 ratio to receive 160 mg of aspirin or ' +
                                                'matched placebo once daily for 3 years. Patients with prespecified PIK3CA ' +
                                                'hotspot mutations in exon 9 or 20 (group A alterations) and those with other ' +
                                                'moderate- or high-impact somatic variants in PIK3CA, PIK3R1, or PTEN (group B ' +
                                                'alterations) … Alterations in PI3K pathway genes ' +
                                                'were detected in 1103 of 2980 patients (37.0%) with complete genomic data. … ' +
                                                'The estimated 3-year cumulative incidence of recurrence was 7.7% with aspirin ' +
                                                'and 14.1% with placebo (hazard ratio, 0.49; 95% confidence interval [CI], 0.24 ' +
                                                'to 0.98; P = 0.04) among patients with group A alterations and 7.7% and 16.8%, ' +
                                                'respectively (hazard ratio, 0.42; 95% CI, 0.21 to 0.83) … Severe adverse events ' +
                                                'occurred in 16.8% of aspirin recipients and 11.6% of placebo recipients' } }
      ]
    },
    related: [
      { to: 'rep-root', kind: 'overlaps', strength: 1,
        note: 'The same disease, sorted by repair status instead of place.' }
    ],
    sources: [
      { label: 'SEER Cancer Stat Facts: Colorectal Cancer', url: 'https://seer.cancer.gov/statfacts/html/colorect.html' },
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Colorectal cancer statistics, 2026',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' }
    ]
  },

  {
    id: 'site-colon', axis: 'site', parent: 'site-root',
    label: 'Colon', shortLabel: 'Colon',
    prevalence: 68.6,
    summary: 'About two thirds of the colorectal incidence rate: 24.2 of 35.3 per 100,000. The colon ' +
             'is long, and its two ends differ — in how often each sex gets cancer there, in how the ' +
             'rate is changing, and in the tumour\'s genome. Colon against rectum is a smaller ' +
             'molecular split: excluding hypermutated tumours, TCGA found the two to have ' +
             'considerably similar patterns of genomic alteration.',
    sources: [
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Table 2', url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'Cancer Genome Atlas Network, Nature 2012', url: 'https://pubmed.ncbi.nlm.nih.gov/22810696/' }
    ]
  },

  {
    id: 'site-proximal', axis: 'site', parent: 'site-colon',
    label: 'Proximal colon', shortLabel: 'Proximal',
    prevalence: 37.7,
    summary: 'Caecum to splenic flexure (site codes C18.0 and C18.2–C18.5), and the largest single ' +
             'site: 13.3 per 100,000. Incidence here is only 9% higher in men than in women, against ' +
             '41% in the distal colon and 57% in the rectum. Its genome differs most: in TCGA, 48 of ' +
             'the 175 proximal tumours with a molecular class (27.4%) are MSI, against 4 of 93 distal ' +
             '(4.3%) and 3 of 115 rectal (2.6%), and BRAF V600E is in 36 of 193 sequenced (18.7%).',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 66, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 50, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 50, role: 'oncogene' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 39, role: 'oncogene' },
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 19, role: 'activating allele',
          note: 'Against 1.8% of distal and 0.7% of rectal tumours in the same cohort.' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 19, role: 'tumour suppressor' },
        { gene: 'SOX9', alteration: 'mutation', frequency: 18, role: 'transcription factor' }
      ]
    },
    related: [
      { to: 'rep-dmmr', kind: 'overlaps',
        note: 'In TCGA, 48 of the 63 MSI tumours (76.2%) are proximal. The overlap is large and it is ' +
              'not identity: most proximal tumours are not MSI.' }
    ],
    sources: [
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Table 2 and subsite definitions',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal (site codes and molecular classes)',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' },
      { label: 'Liu et al, Cancer Cell 2018 — TCGA molecular classes', url: 'https://pubmed.ncbi.nlm.nih.gov/29622466/' }
    ]
  },

  {
    id: 'site-distal', axis: 'site', parent: 'site-colon',
    label: 'Distal colon', shortLabel: 'Distal',
    prevalence: 24.6,
    summary: 'The descending and sigmoid colon (C18.6–C18.7): 8.7 per 100,000, and 41% higher in men ' +
             'than in women. The rise in colorectal cancer among people born after about 1950 is ' +
             'dominated by tumours here — especially the sigmoid colon — and in the rectum. In TCGA ' +
             'its genome sits nearer the rectum\'s than the proximal colon\'s: TP53 is mutated in 65.8% ' +
             '(73 of 111), against 70.3% rectal and 50.3% proximal, and BRAF V600E in 1.8% (2 of 111).',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 79, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 66, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 28, role: 'oncogene' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 22, role: 'oncogene' },
        { gene: 'TCF7L2', alteration: 'mutation', frequency: 13, role: 'WNT transcription factor' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 11, role: 'tumour suppressor' },
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 2, role: 'activating allele' }
      ]
    },
    sources: [
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Table 2, sex differences and birth-cohort trends',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' }
    ]
  },

  {
    id: 'site-colon-nos', axis: 'site', parent: 'site-colon',
    label: 'Colon, part not recorded', shortLabel: 'Colon NOS',
    prevalence: 6.2,
    summary: 'Colon cancers the registry could not place as proximal or distal (codes C18.8, C18.9 and ' +
             'C26.0): 2.2 per 100,000. A statement about the record, not a kind of cancer. Research ' +
             'records share the gap — 97 of the 594 patients in TCGA\'s colorectal cohort carry C18.9 — ' +
             'which is why this node has no genome figures.',
    sources: [
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Table 2 and subsite definitions',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal (ICD-O-3 site codes)',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' }
    ]
  },

  {
    id: 'site-rectum', axis: 'site', parent: 'site-root',
    label: 'Rectum and rectosigmoid junction', shortLabel: 'Rectum',
    prevalence: 31.4,
    summary: 'The last part of the large bowel (C19.9 and C20.9): 11.1 per 100,000, and 57% higher in ' +
             'men than in women. After decades of decline its incidence rose 1% a year from 2018 to ' +
             '2022, and it was 32% of colorectal cancers in 2022, up from 27% in 2004. It is staged with ' +
             'MRI of the abdomen and pelvis, which judges how deep the tumour goes and whether surgery ' +
             'can clear its margins, and all of its radiation and chemotherapy can be given before ' +
             'surgery. NCI keeps a treatment summary for it separate from colon cancer\'s.',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 78, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 70, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 35, role: 'oncogene' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 17, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 14, role: 'oncogene' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 14, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'NRAS', alteration: 'mutation', frequency: 11, role: 'oncogene' }
      ],
      pathways: [
        { name: 'Mismatch repair deficiency', status: 'in 5% to 10% of rectal adenocarcinomas',
          note: 'NCI\'s figure. In TCGA, 3 of the 115 rectal tumours with a molecular class are MSI.',
          source: 'nci-rectal-hp' },
        { name: 'Among people diagnosed before 50',
          status: 'a rectal primary in 31.3% (256 of 817) of patients diagnosed before 50, against 22.2% (155 of 698) at 50 or older',
          note: 'MSK\'s early-onset comparison, one tumour each. A right-sided primary runs the other way: ' +
                '15.7% (128 of 817) against 35.2% (246 of 698). 865 of the 1,459 patients with a recorded ' +
                'stage had stage IV disease, so neither is a population share — the registry figures on the ' +
                'Start lens are. The published analysis, which left out repair-deficient tumours, hereditary ' +
                'syndromes and inflammatory bowel disease, found early-onset tumours more often left-sided ' +
                'and otherwise clinically and genomically indistinguishable.',
          source: ['cercek-2021',
                   { ref: 'cercek-2021', quote: 'Patients with mismatch repair deficient tumors, CRC-related hereditary ' +
                                               'syndromes, and inflammatory bowel disease were excluded from all but the ' +
                                               'germline analysis. … Left-sided tumors (35 years and younger = 80.8%; ' +
                                               '36-49 years = 83.7%; AO = 63.9%; P < .001 for both comparisons)' }] }
      ]
    },
    sources: [
      { label: 'Siegel et al, CA Cancer J Clin 2026 — Table 2 and rectal trends', url: 'https://pubmed.ncbi.nlm.nih.gov/41769777/' },
      { label: 'NCI PDQ — Rectal Cancer Treatment (Health Professional Version)',
        url: 'https://www.cancer.gov/types/colorectal/hp/rectal-treatment-pdq' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' }
    ]
  },

  /* ============================== AXIS 2 — MISMATCH REPAIR ============================== */

  {
    id: 'rep-root', axis: 'repair', parent: null,
    label: 'All colorectal cancer, by repair status', shortLabel: 'All colorectal',
    prevalence: 100,
    summary: 'The same disease as the site axis, sorted by whether the tumour can still repair the ' +
             'errors it makes copying its DNA. A tumour that cannot is hypermutated, and when the ' +
             'cancer has spread that status selects immunotherapy as the first treatment.',
    related: [
      { to: 'site-root', kind: 'overlaps', strength: 1,
        note: 'The same disease, sorted by place instead.' }
    ],
    sources: [
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
      { label: 'Cancer Genome Atlas Network, Nature 2012', url: 'https://pubmed.ncbi.nlm.nih.gov/22810696/' }
    ]
  },

  {
    id: 'rep-dmmr', axis: 'repair', parent: 'rep-root',
    label: 'Mismatch repair deficient (dMMR / MSI-H)', shortLabel: 'dMMR',
    prevalence: 13.3,
    markers: { MMR: 'loss of at least one protein', MSI: 'high' },
    summary: '833 of the 6,277 tumours in Domingo\'s pooled series (13.3%), mostly stage II and III. ' +
             'Two routes lead here: an inherited repair-gene variant (Lynch syndrome), or a repair gene ' +
             'switched off in the tumour alone. In TCGA, these tumours sit mostly in the proximal colon ' +
             '(48 of 63) and carry a BRAF mutation far more often than the rest — 58.7% (37 of 63) ' +
             'against 4.4% (17 of 386) of CIN and GS tumours.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 56, role: 'activating allele' },
        { gene: 'MMR', alteration: 'mutation', frequency: 46, role: 'mismatch repair genes',
          note: 'Any mutation in MLH1, MSH2, MSH6 or PMS2. TCGA found most MSI tumours silence MLH1 ' +
                'by methylation, which a mutation call does not see — so this is not the share with ' +
                'a broken repair gene.' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 40, role: 'oncogene' },
        { gene: 'APC', alteration: 'mutation', frequency: 40, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 37, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 32, role: 'oncogene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 32, role: 'tumour suppressor' }
      ],
      pathways: [
        { name: 'Share in stage IV disease', status: 'about 4% of stage IV colorectal cancer',
          source: 'nci-colon-hp' },
        { name: 'Share in a metastatic referral cohort', status: '96 of 1,099 patients (8.7%) by the study\'s own MSI call',
          note: 'MSK patients with metastatic disease, one tumour each.',
          source: 'msk-crc-2017' },
        { name: 'Among people diagnosed before 50',
          status: 'MSI in 3.8% (31 of 817) of patients diagnosed before 50, against 9.6% (67 of 698) at 50 or older',
          note: 'MSK\'s early-onset comparison, by the study\'s own MSI call, one tumour each. Its published ' +
                'analysis left repair-deficient tumours out of every comparison except the germline one.',
          source: 'cercek-2021' }
      ],
      biomarkers: [
        { name: 'MSI-H or dMMR', use: 'selects first-line pembrolizumab for metastatic disease',
          threshold: 'median progression-free survival 16.5 against 8.2 months on chemotherapy (HR 0.60, 0.45–0.80), 307 patients',
          source: { ref: 'keynote-177', quote: '307 patients with metastatic MSI-H-dMMR colorectal cancer … (median, 16.5 ' +
                                               'vs. 8.2 months; hazard ratio, 0.60; 95% confidence interval [CI], 0.45 to 0.80' } },
        { name: 'MSI-H or dMMR', use: 'selects first-line nivolumab plus ipilimumab for metastatic disease',
          threshold: 'longer progression-free survival than chemotherapy in 255 patients with centrally confirmed status',
          source: { ref: 'checkmate-8hw', quote: '255 patients had centrally confirmed MSI-H or dMMR tumors' } }
      ]
    },
    sources: [
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016 — 6,277 tumours', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal (MSI class)',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' },
      { label: 'Cancer Genome Atlas Network, Nature 2012 — MSI with MLH1 silencing', url: 'https://pubmed.ncbi.nlm.nih.gov/22810696/' }
    ]
  },

  {
    id: 'rep-lynch', axis: 'repair', parent: 'rep-dmmr',
    label: 'Lynch syndrome', shortLabel: 'Lynch',
    prevalence: 2.8,
    markers: { MMR: 'loss of at least one protein' },
    summary: 'Repair deficiency that was inherited. When every colorectal cancer in a population-based ' +
             'series of 1,566 patients was tested, 44 (2.8%, 95% CI 2.1–3.8) had Lynch syndrome. Tumour ' +
             'stains found it about as reliably as MSI testing, and the Bethesda family-history ' +
             'guidelines would have missed 28% of the cases. The share comes from a different series ' +
             'than its parent\'s.',
    molecular: {
      biomarkers: [
        { name: 'Tumour screening (stains or MSI)', use: 'finds Lynch syndrome in patients the family-history criteria would miss',
          source: 'hampel-2008' }
      ]
    },
    sources: [
      { label: 'Hampel et al, J Clin Oncol 2008 — 1,566 patients, Columbus, Ohio', url: 'https://pubmed.ncbi.nlm.nih.gov/18809606/' }
    ]
  },

  {
    id: 'rep-sporadic', axis: 'repair', parent: 'rep-dmmr',
    label: 'Sporadic repair deficiency', shortLabel: 'Sporadic',
    prevalence: 10.5,
    markers: { MMR: 'loss of at least one protein' },
    summary: 'Repair deficiency that arose in the tumour alone. In TCGA\'s 2012 analysis most MSI tumours ' +
             'had hypermethylation with MLH1 silenced. The share is what is left of 13.3 once 2.8 is ' +
             'taken away — two different studies, so an estimate of the remainder rather than a count.',
    sources: [
      { label: 'Cancer Genome Atlas Network, Nature 2012', url: 'https://pubmed.ncbi.nlm.nih.gov/22810696/' },
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
      { label: 'Hampel et al, J Clin Oncol 2008', url: 'https://pubmed.ncbi.nlm.nih.gov/18809606/' }
    ]
  },

  {
    id: 'rep-pmmr', axis: 'repair', parent: 'rep-root',
    label: 'Mismatch repair proficient (pMMR / MSS)', shortLabel: 'pMMR',
    prevalence: 86.7,
    markers: { MMR: 'all four present', MSI: 'stable' },
    summary: 'Repair works: 5,444 of Domingo\'s 6,277 tumours (86.7%) — most colorectal cancer. ' +
             'POLE-mutant tumours sit here too, because their mismatch repair works.',
    sources: [
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' }
    ]
  },

  {
    id: 'rep-pole', axis: 'repair', parent: 'rep-pmmr',
    label: 'POLE proofreading mutation', shortLabel: 'POLE',
    prevalence: 1.1,
    markers: { POLE: 'pathogenic proofreading-domain mutation', MMR: 'all four present' },
    summary: 'Hypermutated by a different route: the polymerase that copies DNA has lost its ' +
             'proofreading, while mismatch repair still works. Domingo found a pathogenic POLE ' +
             'mutation in 66 of 6,517 tumours (1.0%). In TCGA the class holds 10 patients, so every ' +
             'bar on this card is a count out of ten.',
    molecular: {
      drivers: [
        { gene: 'POLE', alteration: 'mutation', frequency: 100, role: 'proofreading polymerase' },
        { gene: 'APC', alteration: 'mutation', frequency: 100, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 80, role: 'oncogene' },
        { gene: 'MSH6', alteration: 'mutation', frequency: 70, role: 'mismatch repair gene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 40, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 30, role: 'oncogene' }
      ]
    },
    prognosis: {
      source: [{ ref: 'domingo-2016', quote: 'We subsequently investigated its association with prognosis in stage ' +
                                             'II/III colorectal cancer by Cox regression of pooled individual patient ' +
                                             'data from more than 4500 cases … Both POLE mutation and MMR-D were ' +
                                             'associated with significantly reduced risk of recurrence compared with ' +
                                             'MMR-P colorectal cancers in multivariable analysis (HR 0·34 [95% CI ' +
                                             '0·11-0·76]' },
               { ref: 'domingo-2016', quote: 'Pathogenic somatic POLE mutations were detected in 66 (1·0%) of 6517 ' +
                                             'colorectal cancers' }],
      relativeOutlook: 'Less likely to recur than other repair-proficient tumours.',
      fiveYearNote: 'Hazard ratio for recurrence 0.34 (95% CI 0.11–0.76) against repair-proficient ' +
                    'tumours, pooled from trials and cohorts of stage II and III disease.',
      caveat: 'The mutation was found in 66 of 6,517 tumours (1.0%) across the pooled studies, so few ' +
              'patients carry it and the interval is wide. The abstract does not say how many of them ' +
              'entered the recurrence analysis.'
    },
    related: [
      { to: 'rep-dmmr', kind: 'mutually-exclusive',
        note: 'Measured, not assumed: none of Domingo\'s 66 POLE-mutant tumours was repair deficient, ' +
              'against 833 (13.4%) of the 6,211 without the mutation.' }
    ],
    sources: [
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal (POLE class)',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' }
    ]
  },

  {
    id: 'rep-pmmr-other', axis: 'repair', parent: 'rep-pmmr',
    label: 'Proficient, no POLE mutation', shortLabel: 'pMMR, not POLE',
    prevalence: 85.7,
    markers: { MMR: 'all four present', MSI: 'stable' },
    summary: 'The bulk of colorectal cancer: 5,378 of Domingo\'s 6,277 tumours (85.7%). In TCGA these ' +
             'are the chromosomally unstable and genomically stable classes, 386 patients: APC is ' +
             'mutated in 84.7%, TP53 in 70.7% and KRAS in 46.1%.',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 85, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 71, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 46, role: 'oncogene' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 25, role: 'oncogene' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 14, role: 'tumour suppressor' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 13, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'NRAS', alteration: 'mutation', frequency: 8, role: 'oncogene' },
        { gene: 'ERBB2', alteration: 'amplification', frequency: 4, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'Domingo et al, Lancet Gastroenterol Hepatol 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/28404093/' },
      { label: 'TCGA PanCanAtlas colorectal cohort, via cBioPortal (CIN and GS classes)',
        url: 'https://www.cbioportal.org/study/summary?id=coadread_tcga_pan_can_atlas_2018' },
      { label: 'Liu et al, Cancer Cell 2018 — TCGA molecular classes', url: 'https://pubmed.ncbi.nlm.nih.gov/29622466/' }
    ]
  },

  /* ============================== AXIS 3 — DRIVER CLASS ============================== */

  {
    id: 'drv-root', axis: 'driver', parent: null,
    label: 'Metastatic colorectal cancer, by driver class', shortLabel: 'All classes',
    prevalence: 100,
    summary: 'The 995 of MSK\'s 1,099 patients with metastatic disease whose tumours are neither MSI-H nor ' +
             'POLE-mutant, sorted by the gene change a drug is chosen on. No cohort records this class, so ' +
             'it is computed from the mutation and copy-number calls. The first split is RAS: a KRAS or NRAS ' +
             'mutation at the codons the anti-EGFR labels name, or none.',
    molecular: {
      pathways: [
        { name: 'Before and after chemotherapy — why there is no disease-state axis',
          status: 'BRAF V600E in 7.7% (39 of 506) of patients sampled before chemotherapy, and 3.2% (16 of 503) after',
          note: 'MSK records whether chemotherapy came before the sequenced specimen. On the breast and ' +
                'prostate sites the driver treatment selects for rises in the treated cohort. Here BRAF V600E ' +
                'falls, while TP53 rises from 73.7% to 79.9% with no drug aimed at it. Selection, surviving ' +
                'long enough for a second biopsy, and which tumours get re-sampled would each fit, and this ' +
                'design cannot tell them apart. None of the cohorts checked sampled tumours after anti-EGFR ' +
                'therapy, so no disease-state axis is drawn. Across all 1,099 patients the fall is the same ' +
                'shape: 10.6% (62 of 586) before, 3.4% (18 of 527) after.',
          source: 'msk-crc-2017' }
      ]
    },
    related: [
      { to: 'rep-pmmr', kind: 'overlaps',
        note: 'This population is the spread disease of the proficient node, less its POLE-mutant tumours.' }
    ],
    sources: [
      { label: 'Yaeger et al, Cancer Cell 2018 — MSK metastatic colorectal cancer, 1,099 patients',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29316426/' },
      { label: 'MSK crc_msk_2017 on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' }
    ]
  },

  {
    id: 'drv-ras-mutant', axis: 'driver', parent: 'drv-root',
    label: 'RAS mutant (KRAS or NRAS at the label codons)', shortLabel: 'RAS mutant',
    prevalence: 47.1,
    markers: { RAS: 'mutant' },
    summary: '469 of the 995 patients (47.1%) carry a KRAS or NRAS mutation at codon 12, 13, 59, 61, 117 ' +
             'or 146 — the codons the panitumumab label names. This class is defined by the drugs it rules ' +
             'out: neither anti-EGFR antibody is indicated for RAS-mutant colorectal cancer, except ' +
             'panitumumab given with sotorasib for KRAS G12C.',
    molecular: {
      biomarkers: [
        { name: 'RAS mutation (KRAS or NRAS)', use: 'rules out panitumumab, except with sotorasib for KRAS G12C',
          threshold: 'not indicated for RAS-mutant disease, or when RAS status is unknown',
          source: 'label-panitumumab' },
        { name: 'Ras mutation', use: 'rules out cetuximab',
          threshold: 'not indicated for Ras-mutant colorectal cancer, or when the Ras test results are unknown',
          source: 'label-cetuximab' }
      ]
    },
    related: [
      { to: 'drv-braf-v600e', kind: 'mutually-exclusive',
        note: 'Measured, not assumed: none of the 50 BRAF V600E tumours carries a label-codon RAS mutation, ' +
              'where independence would predict about 24. All three tumours in the whole cohort with both ' +
              'are MSI-H.' }
    ],
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' }
    ]
  },

  {
    id: 'drv-kras-g12c', axis: 'driver', parent: 'drv-ras-mutant',
    label: 'KRAS G12C', shortLabel: 'KRAS G12C',
    prevalence: 3.1,
    markers: { RAS: 'KRAS G12C' },
    summary: 'KRAS G12C in 31 of the 995 patients (3.1%): the one RAS mutation with a drug of its own. ' +
             'Sotorasib is approved with panitumumab after fluoropyrimidine-, oxaliplatin- and ' +
             'irinotecan-based chemotherapy. Its trial paired the two because a G12C inhibitor alone had ' +
             'yielded only modest efficacy in this cancer.',
    molecular: {
      drivers: [
        { gene: 'KRAS G12C', alteration: 'mutation', frequency: 100, role: 'drugged allele', druggable: true },
        { gene: 'APC', alteration: 'mutation', frequency: 87, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 58, role: 'tumour suppressor' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 23, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 13, role: 'oncogene' }
      ],
      biomarkers: [
        { name: 'KRAS G12C', use: 'selects sotorasib with panitumumab after chemotherapy',
          source: 'label-sotorasib' },
        { name: 'KRAS G12C, chemorefractory', use: 'sotorasib 960 mg with panitumumab against standard care (CodeBreaK 300)',
          threshold: 'median progression-free survival 5.6 against 2.2 months (HR 0.49, 0.30–0.80); objective ' +
                     'response 26.4% against 0%; grade 3 or higher treatment-related adverse events 35.8% ' +
                     'against 43.1%',
          source: { ref: 'codebreak300-2023', quote: 'sotorasib at a dose of 960 mg once daily plus panitumumab … the ' +
                                                     'median progression-free survival was 5.6 months … as compared with 2.2 ' +
                                                     'months … was 0.49 (95% CI, 0.30 to 0.80 … The objective response was ' +
                                                     '26.4% … and 0% … Treatment-related adverse events of grade 3 or higher ' +
                                                     'occurred in 35.8%, 30.2%, and 43.1% of patients' } }
      ]
    },
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' },
      { label: 'Fakih et al, N Engl J Med 2023 — CodeBreaK 300', url: 'https://pubmed.ncbi.nlm.nih.gov/37870968/' }
    ]
  },

  {
    id: 'drv-ras-other', axis: 'driver', parent: 'drv-ras-mutant',
    label: 'Other KRAS or NRAS mutation', shortLabel: 'Other RAS',
    prevalence: 44.0,
    markers: { RAS: 'mutant, not KRAS G12C' },
    summary: 'The largest class: 438 of the 995 patients (44.0%), with a KRAS or NRAS mutation at the label ' +
             'codons other than KRAS G12C — KRAS in 402 of them and NRAS in 37. No drug is selected by the ' +
             'mutation itself, and both anti-EGFR antibodies are ruled out.',
    molecular: {
      drivers: [
        { gene: 'KRAS', alteration: 'mutation', frequency: 92, role: 'oncogene' },
        { gene: 'APC', alteration: 'mutation', frequency: 81, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 64, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 24, role: 'oncogene' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 17, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'FBXW7', alteration: 'mutation', frequency: 12, role: 'tumour suppressor' },
        { gene: 'NRAS', alteration: 'mutation', frequency: 9, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' }
    ]
  },

  {
    id: 'drv-ras-wt', axis: 'driver', parent: 'drv-root',
    label: 'RAS wild type', shortLabel: 'RAS wild type',
    prevalence: 52.9,
    markers: { RAS: 'wild type' },
    summary: '526 of the 995 patients (52.9%) have no KRAS or NRAS mutation at the label codons. That absence ' +
             'is what the anti-EGFR antibody labels ask for: panitumumab is indicated for wild-type RAS, ' +
             'defined in both KRAS and NRAS, and cetuximab for K-Ras wild-type, EGFR-expressing disease. ' +
             'Three classes sit inside it, because a tumour can lack a RAS mutation and still carry another ' +
             'change a drug is chosen on.',
    molecular: {
      biomarkers: [
        { name: 'Wild-type RAS (KRAS and NRAS)', use: 'selects panitumumab, first-line with FOLFOX or alone after chemotherapy',
          source: 'label-panitumumab' },
        { name: 'K-Ras wild-type, EGFR-expressing', use: 'selects cetuximab, first-line with FOLFIRI, with irinotecan, or alone',
          source: 'label-cetuximab' },
        { name: 'PIK3CA exon 20 mutation, in KRAS wild-type tumours',
          use: 'cetuximab with chemotherapy after chemotherapy had failed — a retrospective analysis, not a label criterion',
          threshold: 'response 0% (0 of 9) against 36.8% (121 of 329); median progression-free survival 11.5 against ' +
                     '24 weeks (HR 2.52, 1.33–4.78). PIK3CA exon 9 mutations had no effect',
          source: { ref: 'deroock-2010', quote: 'PIK3CA exon 9 mutations had no effect, whereas exon 20 mutations were ' +
                                                'associated with a worse outcome compared with wild types, with a response ' +
                                                'rate of 0.0% (0/9) versus 36.8% (121/329; OR 0.00, 0.00-0.89; p=0.029), a ' +
                                                'median PFS of 11.5 weeks versus 24 weeks (HR 2.52, 1.33-4.78' } }
      ]
    },
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' }
    ]
  },

  {
    id: 'drv-braf-v600e', axis: 'driver', parent: 'drv-ras-wt',
    label: 'BRAF V600E', shortLabel: 'BRAF V600E',
    prevalence: 5.0,
    markers: { BRAF: 'V600E', RAS: 'wild type' },
    summary: 'BRAF V600E in 50 of the 995 patients (5.0%). More often in the right colon than the classes ' +
             'around it: 28 of the 50. Encorafenib with cetuximab is approved for it, with fluorouracil-based ' +
             'chemotherapy or, after prior therapy, without. APC is mutated in 38% of these tumours, against ' +
             'about 80% of the RAS-mutant and wild-type classes. The same mutation is common in MSI-H ' +
             'tumours too, which this axis leaves to the repair axis.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 100, role: 'drugged allele', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 74, role: 'tumour suppressor' },
        { gene: 'APC', alteration: 'mutation', frequency: 38, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 30, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 24, role: 'oncogene' }
      ],
      biomarkers: [
        { name: 'BRAF V600E', use: 'selects encorafenib with cetuximab — with fluorouracil-based chemotherapy, or after prior therapy without it',
          source: 'label-encorafenib' },
        { name: 'BRAF V600E, untreated metastatic disease', use: 'encorafenib, cetuximab and mFOLFOX6 against standard care (BREAKWATER)',
          threshold: 'median progression-free survival 12.8 against 7.1 months (HR 0.53, 0.41–0.68); overall ' +
                     'survival 30.3 against 15.1 months at an interim analysis (HR 0.49, 0.38–0.63); serious ' +
                     'adverse events 46.1% against 38.9%',
          source: { ref: 'breakwater-2025', quote: '(median, 12.8 vs. 7.1 months; hazard ratio for progression or death, ' +
                                                   '0.53; 95% confidence interval [CI], 0.41 to 0.68; P<0.001). In an interim ' +
                                                   'analysis, overall survival was significantly longer with EC+mFOLFOX6 than ' +
                                                   'with standard care (median, 30.3 vs. 15.1 months; hazard ratio for death, ' +
                                                   '0.49; 95% CI, 0.38 to 0.63; P<0.001). The incidence of serious adverse ' +
                                                   'events during treatment was 46.1% with EC+mFOLFOX6 and 38.9% with standard ' +
                                                   'care' } }
      ]
    },
    related: [
      { to: 'drv-ras-mutant', kind: 'mutually-exclusive',
        note: 'None of these 50 tumours carries a label-codon RAS mutation — see the RAS-mutant card.' },
      { to: 'rep-dmmr', kind: 'overlaps',
        note: 'BRAF V600E is on the repair-deficient card too, where it is far commoner. Those tumours are ' +
              'not counted here.' }
    ],
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class and side', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' },
      { label: 'Elez et al, N Engl J Med 2025 — BREAKWATER', url: 'https://pubmed.ncbi.nlm.nih.gov/40444708/' }
    ]
  },

  {
    id: 'drv-her2-amp', axis: 'driver', parent: 'drv-ras-wt',
    label: 'HER2 (ERBB2) amplified', shortLabel: 'HER2 amplified',
    prevalence: 2.6,
    markers: { HER2: 'amplified', RAS: 'wild type' },
    summary: 'ERBB2 amplified in 26 of the 995 patients (2.6%), 24 of them left-sided or rectal. A tumour ' +
             'with both an amplification and a RAS or BRAF V600E mutation is counted in that earlier class, ' +
             'because the classifier tries them first. Tucatinib with trastuzumab has accelerated approval ' +
             'for RAS wild-type, HER2-positive disease after chemotherapy. The label says HER2-positive; this ' +
             'card counts an amplification call from sequencing, and the two are not the same measurement.',
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'amplification', frequency: 100, role: 'oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 85, role: 'tumour suppressor' },
        { gene: 'APC', alteration: 'mutation', frequency: 77, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 15, role: 'tumour suppressor (TGF-β pathway)' }
      ],
      biomarkers: [
        { name: 'HER2-positive, RAS wild type', use: 'selects tucatinib with trastuzumab after fluoropyrimidine-, oxaliplatin- and irinotecan-based chemotherapy (accelerated approval)',
          source: 'label-tucatinib' },
        { name: 'HER2-positive, RAS wild type, chemotherapy-refractory', use: 'tucatinib with trastuzumab in MOUNTAINEER, the basis of the approval',
          threshold: 'overall response 38% (95% CI 28–49) in 84 patients; median duration of response 12.4 months',
          source: { ref: 'casak-2023', quote: 'Eighty-four eligible patients received the combination tucatinib and ' +
                                              'trastuzumab. With a median follow-up of 16 months, the ORR was 38% [95% ' +
                                              'confidence interval (CI): 28-49] and median DOR was 12.4 months' } }
      ]
    },
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class and side', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' },
      { label: 'Casak et al, Clin Cancer Res 2023 — FDA approval summary', url: 'https://pubmed.ncbi.nlm.nih.gov/37318379/' }
    ]
  },

  {
    id: 'drv-wild-type', axis: 'driver', parent: 'drv-ras-wt',
    label: 'RAS and BRAF wild type, HER2 not amplified', shortLabel: 'Wild type',
    prevalence: 45.2,
    markers: { RAS: 'wild type', BRAF: 'no V600E', HER2: 'not amplified' },
    summary: 'None of the changes above: 450 of the 995 patients (45.2%). A class defined by absence, which ' +
             'only holds for a tumour tested for all of it — the classifier leaves an untested tumour ' +
             'unclassified rather than counting it here, and none needed to be. Side matters most for this ' +
             'class: of every tumour in the cohort with a side recorded, 387 of the 759 left-sided or rectal ' +
             'ones are wild type (51.0%), against 58 of the 326 right-sided (17.8%).',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 90, role: 'tumour suppressor' },
        { gene: 'APC', alteration: 'mutation', frequency: 80, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'SMAD4', alteration: 'mutation', frequency: 11, role: 'tumour suppressor (TGF-β pathway)' },
        { gene: 'PIK3CA', alteration: 'mutation', frequency: 11, role: 'oncogene' },
        { gene: 'BRAF', alteration: 'mutation', frequency: 5, role: 'oncogene',
          note: 'BRAF changes other than V600E, which is a class of its own.' },
        { gene: 'EGFR', alteration: 'amplification', frequency: 3, role: 'oncogene' }
      ]
    },
    related: [
      { to: 'site-distal', kind: 'overlaps',
        note: 'MSK records side only as Left or Right, with rectal tumours under Left, so its left is not the ' +
              'site axis\'s distal colon. Both point the same way: wild type is most common on the left.' }
    ],
    sources: [
      { label: 'MSK crc_msk_2017 on cBioPortal — derived class by side (concordance)', url: 'https://www.cbioportal.org/study/summary?id=crc_msk_2017' }
    ]
  },

  /* ============================== AXIS 4 — CMS ============================== */

  {
    id: 'cms-root', axis: 'cms', parent: null,
    label: 'Colon cancer, by consensus molecular subtype', shortLabel: 'All colon (AC-ICAM)',
    prevalence: 100,
    summary: 'Four subtypes defined in 2015 by an international consortium, from six expression-based ' +
             'classifications that coalesced into them, plus tumours with mixed features. The shares here are ' +
             'one cohort\'s: 348 patients with primary colon cancer in Leiden, a CMS call on every one, 281 of ' +
             'them with exome sequencing behind the figures on each card.',
    related: [
      { to: 'site-colon', kind: 'overlaps', strength: 1, note: 'The CMS cohort is colon cancer only.' }
    ],
    sources: [
      { label: 'Guinney et al, Nat Med 2015 — the consensus molecular subtypes', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'Roelands et al, Nat Med 2023 — AC-ICAM, via cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  },

  {
    id: 'cms1', axis: 'cms', parent: 'cms-root',
    label: 'CMS1 — MSI immune', shortLabel: 'CMS1',
    prevalence: 12.4,
    summary: 'In the consortium\'s description, hypermutated, microsatellite unstable and with strong immune ' +
             'activation: 14% of its tumours. In AC-ICAM, 43 of 348, and BRAF V600E is in 84.2% (32 of 38) of ' +
             'those sequenced.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 84, role: 'activating allele' },
        { gene: 'APC', alteration: 'mutation', frequency: 32, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 18, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 3, role: 'oncogene' }
      ]
    },
    related: [
      { to: 'rep-dmmr', kind: 'overlaps',
        note: 'The consortium named CMS1 for microsatellite instability. AC-ICAM\'s cBioPortal record carries no ' +
              'MSI call, so the overlap is not counted here.' }
    ],
    sources: [
      { label: 'Guinney et al, Nat Med 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'AC-ICAM (coad_silu_2022) on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  },

  {
    id: 'cms2', axis: 'cms', parent: 'cms-root',
    label: 'CMS2 — canonical', shortLabel: 'CMS2',
    prevalence: 21.8,
    summary: 'Epithelial, with marked WNT and MYC signalling — the consortium\'s largest group, 37% of its ' +
             'tumours. In AC-ICAM it is 76 of 348, the widest gap between the two sets of shares. APC is ' +
             'mutated in 82.5% (52 of 63) of those sequenced, and BRAF V600E in none.',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 83, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 60, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 25, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'Guinney et al, Nat Med 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'AC-ICAM (coad_silu_2022) on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  },

  {
    id: 'cms3', axis: 'cms', parent: 'cms-root',
    label: 'CMS3 — metabolic', shortLabel: 'CMS3',
    prevalence: 19.0,
    summary: 'Epithelial, with evident metabolic dysregulation: 13% of the consortium\'s tumours, and 66 of ' +
             '348 in AC-ICAM. KRAS is mutated in 67.3% (37 of 55) of those sequenced, the highest of the five ' +
             'groups here.',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 78, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 67, role: 'oncogene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 27, role: 'tumour suppressor' },
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 15, role: 'activating allele' }
      ]
    },
    sources: [
      { label: 'Guinney et al, Nat Med 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'AC-ICAM (coad_silu_2022) on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  },

  {
    id: 'cms4', axis: 'cms', parent: 'cms-root',
    label: 'CMS4 — mesenchymal', shortLabel: 'CMS4',
    prevalence: 23.6,
    summary: 'Prominent TGF-β activation, stromal invasion and angiogenesis: 23% of the consortium\'s tumours, ' +
             'and 82 of 348 in AC-ICAM — the one group whose two shares agree. TP53 is mutated in 52.5% ' +
             '(32 of 61) of those sequenced and KRAS in 39.3% (24 of 61).',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 70, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 52, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 39, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'Guinney et al, Nat Med 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'AC-ICAM (coad_silu_2022) on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  },

  {
    id: 'cms-mixed', axis: 'cms', parent: 'cms-root',
    label: 'Mixed features', shortLabel: 'Mixed',
    prevalence: 23.3,
    summary: 'Tumours that fit no single subtype. The consortium put them at 13% and suggested they may be a ' +
             'transition between subtypes or a tumour holding more than one; in AC-ICAM they are 81 of 348, ' +
             'almost as many as the largest subtype.',
    molecular: {
      drivers: [
        { gene: 'APC', alteration: 'mutation', frequency: 72, role: 'tumour suppressor (WNT pathway)' },
        { gene: 'TP53', alteration: 'mutation', frequency: 42, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 34, role: 'oncogene' },
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 19, role: 'activating allele' }
      ]
    },
    sources: [
      { label: 'Guinney et al, Nat Med 2015', url: 'https://pubmed.ncbi.nlm.nih.gov/26457759/' },
      { label: 'AC-ICAM (coad_silu_2022) on cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=coad_silu_2022' }
    ]
  }
  ]
});
