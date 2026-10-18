/* data/prostate.js — Prostate cancer dataset for the Cancer Subtype Explorer.
 *
 * Four axes: grade, molecular, disease state, histology. Risk factors and
 * detection are here; the profile block, targets and literature are not.
 *
 * ---- The fifth axis, and why it is not here ---------------------------
 *
 * PSMA expression level was planned as the counterpart of breast's HER2-level
 * axis — a therapy-selection scale rather than a taxonomy, invented because a
 * drug worked in patients an older binary called negative. It is not built,
 * and the reason is a real limit rather than a missing afternoon.
 *
 * `prevalence` means share of the WHOLE cancer, which is what lets treemap
 * areas be compared across axes. PSMA status is only ever measured in the men
 * who get a PSMA PET — high-risk and advanced disease. The trial figures that
 * exist (VISION: 12.6% of screened men failed the PSMA criteria) describe men
 * with metastatic castration-resistant disease being assessed for one drug,
 * not a share of everyone diagnosed. Turning that into a whole-disease
 * partition needs a "never assessed" node whose size nobody publishes, and
 * inventing it would put a manufactured number on a treemap whose entire
 * premise is that its areas are honest.
 *
 * So: build it when there is a sourced denominator, or when the schema can say
 * "this axis partitions a subpopulation" out loud. Not before.
 *
 * TWO DIFFERENT BASES, and they are not interchangeable:
 *
 *   - The GRADE axis carries population shares from a published SEER analysis
 *     of 310,062 men diagnosed 2004–2015. Registry-counted, and dated: grade
 *     migration since 2015 has been large and the axis note says so.
 *   - The MOLECULAR axis carries shares COMPUTED from TCGA prad_tcga_pub
 *     (n=333) by pipeline/run.py. Exact for that cohort, and that cohort is
 *     prostatectomy specimens — so it under-represents the low-grade disease
 *     that never reaches surgery.
 *
 * Mixing them would be wrong. They are on separate axes, which is the point.
 *
 * Node ids on the molecular axis are a CONTRACT with pipeline/cxp/cancers.py:
 * mol-erg, mol-etv1, mol-etv4, mol-fli1, mol-spop, mol-foxa1, mol-idh1,
 * mol-other. Rename one here and the computed overlay silently stops merging.
 *
 * Verified 2026-09-05.
 */
CancerExplorer.register({

  id: 'prostate',
  name: 'Prostate Cancer',
  synonyms: ['prostatic adenocarcinoma', 'PCa'],
  overview: 'Sorted two ways that disagree on purpose — by how the cells look, which decides ' +
            'whether to treat at all, and by which gene is driving them, which currently decides ' +
            'nothing. The gap between those two facts is the most interesting thing here.',
  incidence: '~333,830 new US cases and ~36,320 deaths estimated for 2026; 15.8% of all new cancers',
  lastVerified: '2026-09-05',

  references: [
    { id: 'seer-prostate', label: 'SEER Cancer Stat Facts: Prostate Cancer — incidence, mortality, stage and survival',
      journal: 'NCI SEER, 2026 estimates', url: 'https://seer.cancer.gov/statfacts/html/prost.html' },
    { id: 'tcga-prad', label: 'The Cancer Genome Atlas Research Network — The Molecular Taxonomy of Primary Prostate Cancer',
      journal: 'Cell 2015', pmid: '26544944', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4695400/' },
    { id: 'seer-gleason-dist', label: 'Population-Based Comparison of Different Risk Stratification Systems Among Prostate Cancer Patients — SEER 2004–2015, n=310,062',
      journal: 'Front Oncol 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8076565' },
    { id: 'epstein-gg', label: 'Epstein et al — prognostic Gleason grade grouping, and its validation across surgical and radiation cohorts',
      journal: 'Eur Urol 2016 / validation studies', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5626925/' },
    { id: 'gg1-nodes', label: 'Nationwide and multi-institutional series — pelvic lymph-node metastasis in pure Gleason 3+3 disease',
      journal: 'Pathology 2016 / Eur Urol', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0031302516305785' },
    { id: 'gg1-rename', label: 'Renaming Gleason Score 6 Prostate to Noncancer: A Flawed Idea Scientifically and for Patient Care',
      journal: 'J Clin Oncol 2022', url: 'https://ascopubs.org/doi/10.1200/JCO.22.00926' },
    { id: 'spop-clinical', label: 'Clinical and genomic features of SPOP-mutant prostate cancer',
      journal: 'Prostate 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8688331/' },
    { id: 'erg-outcomes', label: 'The TMPRSS2:ERG rearrangement, ERG expression, and prostate cancer outcomes — cohort study and meta-analysis',
      journal: 'Cancer Epidemiol Biomarkers Prev 2012', url: 'https://aacrjournals.org/cebp/article/21/9/1497/69263/' },
    { id: 'erg-deletion', label: 'Linn et al — deletion of interstitial genes between TMPRSS2 and ERG promotes prostate cancer progression',
      journal: 'Cancer Res 2016', pmid: '26880803', url: 'https://pubmed.ncbi.nlm.nih.gov/26880803/' },
    { id: 'protect-15', label: 'Fifteen-year outcomes after monitoring, surgery, or radiotherapy for localised prostate cancer (ProtecT)',
      journal: 'N Engl J Med 2023', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10704979/' },
    { id: 'va-surveillance', label: 'Active surveillance for low-risk prostate cancer in the US Veterans Health system, 2005–2024',
      journal: 'JAMA 2026', url: 'https://www.ucsf.edu/news/2026/08/432386/early-prostate-cancer-active-surveillance-now-first-choice' },
    { id: 'su2c-2019', label: 'Abida et al — genomic correlates of clinical outcome in advanced prostate cancer (SU2C/PCF)',
      journal: 'Proc Natl Acad Sci U S A 2019', pmid: '31061129', url: 'https://www.cbioportal.org/study/summary?id=prad_su2c_2019' },
    { id: 'nepc-2016', label: 'Beltran et al — divergent clonal evolution of castration-resistant neuroendocrine prostate cancer',
      journal: 'Nat Med 2016', pmid: '26855148', url: 'https://www.cbioportal.org/study/summary?id=nepc_wcm_2016' },
    { id: 'fda-onc-approvals', label: 'FDA oncology approval notifications — new and updated indications, dated by the notification',
      journal: 'US FDA', url: 'https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancer-hematologic-malignancies-approval-notifications' },
    { id: 'va-bcr', label: 'Recurrence, metastasis and survival after radical prostatectomy in 22,033 US veterans',
      journal: 'J Clin Oncol 2022 (abstr 5090)', url: 'https://ascopubs.org/doi/10.1200/JCO.2022.40.16_suppl.5090' },
    { id: 'mcrpc-epi', label: 'Candelieri-Surette et al — epidemiology of metastatic castration-resistant prostate cancer in veterans nationwide',
      journal: 'J Natl Compr Canc Netw 2025', pmid: '40659047', url: 'https://pubmed.ncbi.nlm.nih.gov/40659047/' },
    { id: 'nccn-prostate', label: 'Spratt et al — NCCN Guidelines Insights: prostate cancer, version 5.2026',
      journal: 'J Natl Compr Canc Netw 2026', pmid: '42134408', url: 'https://pubmed.ncbi.nlm.nih.gov/42134408/' },
    { id: 'zeegers-family', label: 'Zeegers et al — empiric risk of prostate carcinoma for relatives of patients, meta-analysis of 33 studies',
      journal: 'Cancer 2003', pmid: '12673715', url: 'https://pubmed.ncbi.nlm.nih.gov/12673715/' },
    { id: 'nyberg-brca', label: 'Nyberg et al — prostate cancer risks for male BRCA1 and BRCA2 carriers, prospective cohort (IMPACT)',
      journal: 'Eur Urol 2020', pmid: '31495749', url: 'https://pubmed.ncbi.nlm.nih.gov/31495749/' },
    { id: 'hoxb13-meta', label: 'Homeobox B13 G84E mutation and prostate cancer risk — systematic review and meta-analysis',
      journal: 'Eur Urol 2019', url: 'https://www.sciencedirect.com/science/article/pii/S0302283818308728' },
    { id: 'ddr-aggressive', label: 'ATM, BRCA2, CHEK2, HOXB13 and PALB2 in aggressive and metastatic prostate cancer',
      journal: 'Eur Urol / JCO', url: 'https://www.hematologyandoncology.net/archives/may-2025/genetics-of-prostate-cancer/' },
    { id: 'wcrf-prostate', label: 'World Cancer Research Fund / AICR Continuous Update Project — diet, nutrition, physical activity and prostate cancer',
      journal: 'WCRF 2018', url: 'https://www.wcrf.org/preventing-cancer/cancer-types/prostate-cancer/' },
    { id: 'smoking-meta', label: 'Huncharek et al — smoking as a risk factor for prostate cancer: a meta-analysis of 24 prospective cohort studies',
      journal: 'Am J Public Health 2010', pmid: '19608952', url: 'https://ajph.aphapublications.org/doi/full/10.2105/AJPH.2008.150508' },
    { id: 'smoking-mortality', label: 'Islami et al — a systematic review and meta-analysis of tobacco use and prostate cancer mortality and incidence in prospective cohort studies',
      journal: 'Eur Urol 2014', pmid: '25242554', url: 'https://pubmed.ncbi.nlm.nih.gov/25242554/' },
    { id: 'pcpt-bias', label: 'Redman et al — finasteride does not increase the risk of high-grade prostate cancer: a bias-adjusted modeling approach',
      journal: 'Cancer Prev Res 2008', pmid: '19138953', url: 'https://pubmed.ncbi.nlm.nih.gov/19138953/' },
    { id: 'erspc-23', label: 'European study of prostate cancer screening — 23-year follow-up (ERSPC)',
      journal: 'N Engl J Med 2025', url: 'https://ascopost.com/news/november-2025/extended-erspc-analysis-demonstrates-long-term-mortality-benefit-of-psa-screening-for-prostate-cancer/' },
    { id: 'uspstf-prostate', label: 'USPSTF — prostate cancer screening recommendation (2018, grade C for 55–69, grade D for 70+)',
      journal: 'JAMA 2018', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening' },
    { id: 'propsma', label: 'Hofman et al — prostate-specific membrane antigen PET-CT in patients with high-risk prostate cancer before curative-intent surgery or radiotherapy (proPSMA: PSMA PET-CT versus conventional imaging)',
      journal: 'Lancet 2020', pmid: '32209449', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30314-7/abstract' },
    { id: 'goteborg2', label: 'GÖTEBORG-2 — screening with PSA and MRI followed by targeted biopsy only',
      journal: 'N Engl J Med 2022', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2209454' }
  ],

  /* ---- profile (Layer 0) --------------------------------------------
     The front door. Numbers do not live here — incidence, mortality, survival
     and the age distribution all come from the generated overlay and move on
     their own. What lives here is framing: what this disease is, why it is
     sorted the way it is, and the words a man meets on a report.

     Written to answer the questions someone arriving cold actually asks, in
     the order they ask them, which for this cancer is not the same order as
     for breast: the first question here is not "which kind is it" but
     "does it need treating at all".
  -------------------------------------------------------------------- */
  profile: {
    definition:
      'Prostate cancer is the most commonly diagnosed cancer in men, and most men who have it ' +
      'die of something else. Both halves of that sentence are true at once, and holding them ' +
      'together is the whole difficulty. It starts in the gland cells that make prostate fluid, ' +
      'usually grows slowly, and produces no symptoms until it is advanced — so it is nearly ' +
      'always found by a blood test rather than because something felt wrong.',

    definitionMore:
      'It is not infectious and cannot be passed from person to person. Most cases are not ' +
      'inherited either, though the inherited fraction matters more here than in most cancers: ' +
      'a {{germline}} BRCA2 variant carries a lifetime risk around 60% by age 85. Autopsy ' +
      'studies find microscopic prostate cancer in a large share of older men who died of ' +
      'unrelated causes, which is the clearest statement of the problem — the disease is far ' +
      'more common than the illness. What a tumour is cannot be known from a scan alone; it ' +
      'takes a {{biopsy}}, and everything below follows from what that finds.',

    /* Modelled global estimates. Kept apart from the SEER column on purpose —
       a registry count and a statistical model are not the same kind of number,
       and prostate's international variation is larger than almost any other
       cancer's, most of it driven by who gets tested. */
    world: {
      newCasesPerYear: 1467854,
      deathsPerYear: 397000,
      label: 'World',
      note: 'Modelled estimates for all countries, not a registry count. Not comparable with ' +
            'the US column beside it. International variation in prostate cancer is extreme — ' +
            'incidence rates differ about 13-fold between world regions and mortality about ' +
            '9.5-fold — and much of the incidence gap is how much PSA testing is done rather ' +
            'than how much disease exists.',
      source: { label: 'WHO / IARC Global Cancer Observatory (GLOBOCAN 2022)',
                url: 'https://gco.iarc.fr/' }
    },

    classification:
      'There is no single correct way to sort prostate cancer, and this site does not pretend ' +
      'otherwise. Four are in routine use at the same time. They are not four levels of detail ' +
      '— each one sorts every tumour into groups on its own, so any tumour has four answers at ' +
      'once, and all four are true. Each is a {{classification axis}} here, and the ' +
      '"Classify by" picker in the bar above switches between them. One of the four is unusual ' +
      'and worth noticing: disease state sorts by WHERE IN THE COURSE a man is rather than by ' +
      'anything about the tumour under a microscope, and it is the one that decides treatment.',

    classificationClose:
      'They genuinely disagree, and the disagreement is measured rather than asserted. ' +
      'SPOP-mutant tumours are the clearest case: 45.9% of them are {{Gleason score|Gleason ≥8}} ' +
      'against 26.4% of the cohort overall — worse under the microscope — and yet they stay ' +
      'sensitive to hormone therapy for longer than average. The grade axis and the molecular ' +
      'axis say opposite things about the same tumour and both are right. Merging them into one ' +
      'tidy score would hide exactly that, so each is kept as its own view, the overlaps are ' +
      'drawn as links, and the Evidence lens counts the mismatch rather than smoothing it.',

    reportIntro:
      'Those classifications are read off one document. After a {{biopsy}}, a {{pathologist}} ' +
      'examines the cores under a microscope and writes a {{pathology report}}: how disordered ' +
      'the cells look, how many cores contained cancer, whether any adverse growth patterns are ' +
      'present, and how far it appears to have spread. It describes the tumour; it does not ' +
      'recommend anything. These are the words it uses, and each one is a rung into the rest of ' +
      'this site.',

    reportTerms: [
      { term: 'PSA',
        plain: 'The blood test that usually started all of this. {{PSA}} is specific to the ' +
               'prostate and not to cancer — an enlarged gland, an infection or a bike ride ' +
               'will raise it. It is why prostate cancer is found early so often, and why so ' +
               'much of what is found would never have caused harm.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Gleason score', axis: 'grade',
        plain: 'The pathologist picks the two commonest growth patterns, scores each from 3 to ' +
               '5, and adds them. "3+4" and "4+3" both total 7 and are not the same disease — ' +
               'the first number is the one there is more of.',
        goTo: 'gg2' },

      { term: 'Grade Group', marker: 'GG', axis: 'grade',
        plain: 'The same information as 1 to 5, because "Gleason 6 out of 10" sounds like a ' +
               'middling score and is in fact the mildest thing you can be told. Grade Group 1 ' +
               'now usually means {{active surveillance}} rather than treatment.',
        goTo: 'gg1' },

      { term: 'Cribriform / intraductal', axis: 'grade', axisRole: 'modifies',
        plain: 'Adverse growth patterns reported separately from the Grade Group because they ' +
               'predict worse outcomes than the group alone does. Their presence can move a man ' +
               'from surveillance to treatment without the Grade Group changing at all.',
        goTo: 'gg3' },

      /* Deliberately no `axis`: stage is on every report and is NOT one of the
         four classifications here. Filling the field in to make the set look
         complete is the exact confusion this section exists to remove. */
      { term: 'Stage',
        plain: 'How far it has spread. Not one of the four classifications above. Read the ' +
               'survival table with care: localised and regional disease both report 100% at ' +
               'five years, which is true and does not mean lymph-node spread is harmless.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Biochemical recurrence', axis: 'state',
        plain: 'PSA rising again after treatment meant to remove or destroy the tumour. It ' +
               'means cells are still making PSA somewhere. It is not the same as symptoms and ' +
               'it is a long way from death — most men whose PSA recurs never develop ' +
               'metastases.',
        goTo: 'state-confined' },

      { term: 'Castration-resistant', axis: 'state',
        plain: 'The disease growing again despite testosterone being suppressed to almost ' +
               'nothing. It is the turning point: almost every death from prostate cancer ' +
               'happens on this side of that line, usually because the tumour has started ' +
               'making far more {{androgen|androgen receptor}}.',
        goTo: 'state-crpc' },

      { term: 'PSMA PET',
        plain: 'A scan that finds spread conventional imaging cannot see — 85% sensitivity ' +
               'against 38% for CT plus bone scan. The same protein it images is what a ' +
               'radioligand treatment is aimed at, so the scan both stages the disease and ' +
               'decides eligibility for one of its drugs.',
        goToLens: 'targets' }
    ],

    sources: [
      { label: 'SEER Cancer Stat Facts: Prostate Cancer',
        url: 'https://seer.cancer.gov/statfacts/html/prost.html' },
      { label: 'Global cancer statistics 2022 (GLOBOCAN) — Bray et al, CA Cancer J Clin 2024',
        url: 'https://acsjournals.onlinelibrary.wiley.com/doi/full/10.3322/caac.21834' }
    ]
  },

  /* ---- baseline -----------------------------------------------------
     The denominator every convertible multiplier below is converted against.
     Fetched, not curated: pipeline/run.py incidence parses it off the SEER
     page, and `run.py audit` checks this figure against that one.

     Almost exactly breast's 13.0% for women, which is a coincidence worth
     noticing and not worth reading anything into — the two diseases share
     nothing but the arithmetic.
  -------------------------------------------------------------------- */
  baseline: {
    population: 'US men',
    lifetimeRisk: 13.2,
    lifetimeRiskLabel: 'about 1 in 8',
    note: 'Averaged over an entire lifetime and the entire male population. It is not the risk ' +
          'this year and it is not one person\'s risk. Most of it accumulates after 65 — median ' +
          'age at diagnosis is 68.',
    source: { label: 'SEER Cancer Stat Facts: Prostate Cancer (2021–2023 basis)',
              url: 'https://seer.cancer.gov/statfacts/html/prost.html' }
  },

  /* ---- factors ------------------------------------------------------
     Seventeen, and the shape of them is the point. Prostate cancer has almost
     no strong modifiable risk factors: the largest lifestyle association here
     is +8% per 5 kg/m² of BMI, and it applies only to advanced disease. Breast
     has alcohol, hormone therapy and post-menopausal obesity all at RR 1.2–1.5.

     So a prostate risk page built on this list alone would be close to useless
     — which is exactly why `detection` below carries the weight.

     NOTE: the risk lens still opens on the ranked factor chart, because the
     engine takes the first view in its list. For this cancer the Detection view
     is the one worth landing on, and there is no way for a dataset to say so.
     A `detection.leadWith` hint would fix it; not built.

     Two factors here are the first real users of `outcome: 'mortality'`, and
     one of them is the clearest case for that field existing at all: smoking
     LOWERS the chance of being diagnosed and RAISES the chance of dying of it.
  -------------------------------------------------------------------- */
  factors: [

    /* ---- demographic: none of these are levers ---- */

    { id: 'age', label: 'Increasing age', category: 'Demographic', modifiable: false,
  source: 'seer-prostate',
      direction: 'increases', magnitude: 'strongest single factor', evidence: 'strong',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Median age at diagnosis is 68 and at death 79. No single multiplier captures it, ' +
            'because the 13.2% baseline is itself an age-integrated number. Autopsy series find ' +
            'histological prostate cancer in a large share of men who died of something else.' },

    { id: 'black-ancestry', label: 'Black / African ancestry — being diagnosed', category: 'Demographic',
      modifiable: false, source: 'seer-prostate',
      direction: 'increases', rr: [1.6, 1.8], magnitude: '~1.7× incidence', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Roughly 180 against 108 new diagnoses per 100,000 men per year in US registry data. ' +
            'Converted here because it was measured against whole-disease incidence, which is ' +
            'what the baseline counts.' },

    { id: 'black-ancestry-mortality', label: 'Black / African ancestry — dying of it', category: 'Demographic',
      modifiable: false, source: 'seer-prostate',
      direction: 'increases', rr: [1.9, 2.2], magnitude: '~2.1× mortality', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'mortality', affects: ['gg-high'],
      note: 'About 36 against 17 deaths per 100,000 men per year. The mortality gap is wider than ' +
            'the incidence gap, and that difference — not either number alone — is the finding. ' +
            'It is shown as its own factor because it is a claim about a different event, and it ' +
            'is deliberately not converted against a baseline that counts diagnoses.' },

    { id: 'height', label: 'Being tall', category: 'Demographic', modifiable: false,
      source: 'wcrf-prostate',
      direction: 'increases', magnitude: 'probable, small per 5 cm', evidence: 'moderate',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Graded probable by the WCRF Continuous Update Project. Included because it is real ' +
            'and because it is a useful reminder that "risk factor" does not mean "cause you ' +
            'chose".' },

    /* ---- inherited ---- */

    { id: 'family-history', label: 'Affected first-degree relative', category: 'Germline',
      modifiable: false,
      source: { ref: 'zeegers-family',
                quote: 'Thirty-three epidemiologic studies were included in the current review. S(lambda) was ' +
                       '2.53 (95% confidence interval, 2.24-2.85) for first-degree family members.' },
      direction: 'increases', rr: [2.24, 2.85], magnitude: 'RR 2.53 (2.24–2.85)', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Meta-analysis of 33 studies. An affected brother carries more risk than an affected ' +
            'father, and a relative diagnosed before 50 raises it to about 5.5× — so "family ' +
            'history" is really several different facts wearing one label.' },

    { id: 'brca2', label: 'BRCA2 germline variant', category: 'Germline', modifiable: false,
      source: { ref: 'nyberg-brca',
                quote: 'BRCA2 carriers had an SIR of 4.45 (95% confidence interval [CI] 2.99-6.61) and absolute ' +
                       'PCa risk of 27% (95% CI 17-41%) and 60% (95% CI 43-78%) by ages 75 and 85 yr, respectively.' },
      direction: 'increases', absoluteLifetime: [27, 60], magnitude: 'absolute risk 27% by 75, 60% by 85',
      evidence: 'strong', scope: 'overall', outcome: 'incidence', affects: ['grade-root', 'gg-high'],
      note: 'Standardised incidence ratio 4.45 (2.99–6.61) in a prospective cohort. Quoted as an ' +
            'absolute risk rather than a multiplier because that is how the study reports it — and ' +
            'the two figures here are ages, not a confidence interval. BRCA2 carriers also tend to ' +
            'have more aggressive disease, and BRCA2 status now selects PARP inhibitors.' },

    { id: 'brca1', label: 'BRCA1 germline variant', category: 'Germline', modifiable: false,
      source: [{ ref: 'nyberg-brca',
                 quote: 'The estimated absolute risk of PCa was 21% (95% CI 13-34%) by age 75 yr and 29% (95% CI ' +
                        '17-45%) by age 85 yr for BRCA1 carriers.' },
               { ref: 'nyberg-brca',
                 quote: 'For BRCA1 carriers, the overall SIR was 2.35 (95% CI 1.43-3.88); the corresponding SIR at ' +
                        'age <65 yr was 3.57 (95% CI 1.68-7.58).' }],
      direction: 'increases', absoluteLifetime: [21, 29], magnitude: 'absolute risk 21% by 75, 29% by 85',
      evidence: 'moderate', scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Standardised incidence ratio 2.35 (1.43–3.88), and 3.57 under age 65. Weaker than ' +
            'BRCA2 here — the reverse of the pattern in breast cancer, where BRCA1 carries the ' +
            'higher risk.' },

    { id: 'hoxb13', label: 'HOXB13 G84E variant', category: 'Germline', modifiable: false,
      source: 'hoxb13-meta',
      direction: 'increases', rr: [2.78, 4.23], magnitude: 'RR 3.43 (2.78–4.23)', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'A prostate-specific susceptibility variant with no comparable role in other cancers. ' +
            'Absolute risk by 85 runs from about 60% with no family history to 98% with two ' +
            'young-onset relatives — so the multiplier is an average over very different people.' },

    { id: 'ddr-genes', label: 'ATM, CHEK2 or PALB2 variant', category: 'Germline', modifiable: false,
      source: 'ddr-aggressive',
      direction: 'increases', rr: [2.18, 5.96], magnitude: 'OR 2.2–6.0 for aggressive disease', referent: 'unexposed',
      evidence: 'moderate', scope: 'gg-high', outcome: 'incidence', affects: ['gg-high'],
      note: 'Measured against aggressive and metastatic disease specifically, not against being ' +
            'diagnosed at all — so it is not converted against the whole-disease baseline. ' +
            'Pathogenic variants in this group appear in about 4% of aggressive cases.' },

    { id: 'lynch-mmr', label: 'Lynch syndrome (mismatch repair variant)', category: 'Germline',
      modifiable: false, source: 'ddr-aggressive',
      direction: 'increases', magnitude: 'roughly doubled, evidence thinner than for BRCA2',
      evidence: 'limited', scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Rare here, and worth testing for anyway: mismatch-repair deficiency is the one ' +
            'finding that makes prostate cancer eligible for immunotherapy.' },

    { id: 'polygenic', label: 'Polygenic risk score', category: 'Germline', modifiable: false,
      source: 'ddr-aggressive',
      direction: 'mixed', magnitude: 'no single multiplier — it is a position on a distribution',
      evidence: 'moderate', scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Hundreds of common variants, each tiny, summed. In one analysis, carriers of a ' +
            'pathogenic variant who also had a family history and a score in the top decile had ' +
            'seven times the overall and 34 times the metastatic risk of average — but that is ' +
            'three things stacked, not the score alone. Not the same kind of number as a ' +
            'monogenic penetrance and should not be listed beside one.' },

    /* ---- things that can in principle be changed, and are all small ---- */

    { id: 'obesity-advanced', label: 'Obesity — advanced disease', category: 'Lifestyle', modifiable: true,
      source: 'wcrf-prostate',
      direction: 'increases', rr: [1.08, 1.08], per: '5 kg/m² of BMI', referent: 'unexposed',
      magnitude: '+8% per 5 kg/m², advanced disease only', evidence: 'moderate',
      scope: 'gg-high', outcome: 'incidence', affects: ['gg-high'],
      note: 'The WCRF grades body fatness as a probable cause of ADVANCED prostate cancer, not of ' +
            'prostate cancer generally. Scoped accordingly, so it is not multiplied by a baseline ' +
            'that counts every diagnosis.' },

    { id: 'obesity-mortality', label: 'Obesity — dying of it', category: 'Lifestyle', modifiable: true,
      source: 'wcrf-prostate',
      direction: 'increases', rr: [1.11, 1.11], per: '5 kg/m² of BMI', referent: 'unexposed',
      magnitude: '+11% mortality per 5 kg/m²', evidence: 'moderate',
      scope: 'overall', outcome: 'mortality', affects: ['gg-high'],
      note: 'Same exposure, different event, slightly larger effect. Not converted, for the same ' +
            'reason as the ancestry mortality figure above.' },

    { id: 'smoking-incidence', label: 'Smoking — being diagnosed', category: 'Lifestyle', modifiable: true,
      source: { ref: 'smoking-mortality',
                quote: 'Current cigarette smoking was inversely associated with incident PCa (RR: 0.90; 95% CI, ' +
                       '0.85-0.96), with high heterogeneity in the results.' },
      direction: 'decreases', magnitude: 'inversely associated; size not quoted here', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Smokers are diagnosed with prostate cancer LESS often. Almost certainly detection ' +
            'rather than protection: smokers have lower PSA levels and are screened less. Read ' +
            'this row together with the next one and not on its own.' },

    { id: 'smoking-mortality', label: 'Smoking — dying of it', category: 'Lifestyle', modifiable: true,
      source: { ref: 'smoking-mortality',
                quote: 'Current cigarette smoking was associated with an increased risk of PCa death (RR: 1.24; 95% ' +
                       'CI, 1.18-1.31), with little evidence for heterogeneity and publication bias. The number of ' +
                       'cigarettes smoked per day had a dose-response association with PCa mortality (p=0.02; RR ' +
                       'for 20 cigarettes per day: 1.20).' },
      direction: 'increases', rr: [1.18, 1.31], magnitude: 'RR 1.24 (1.18–1.31)', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'mortality', affects: ['gg-high'],
      note: 'The same men, the other event. Current smokers are diagnosed less and die of it more, ' +
            'with a dose-response by cigarettes per day and worse survival after diagnosis. This pair is the clearest illustration on the ' +
            'site of why a relative risk means nothing until you know what it is a risk OF.' },

    { id: 'dairy-calcium', label: 'High dairy or calcium intake', category: 'Lifestyle', modifiable: true,
      source: 'wcrf-prostate',
      direction: 'increases', magnitude: 'probable, size not well quantified', evidence: 'limited',
      scope: 'overall', outcome: 'incidence', affects: ['grade-root'],
      note: 'Graded probable by WCRF and consistently weaker than the headlines it generates. No ' +
            'multiplier is quoted here because none is stable across studies.' },

    { id: 'five-ari', label: '5-alpha reductase inhibitors (finasteride, dutasteride)', category: 'Medical',
      modifiable: true,
      source: { ref: 'pcpt-bias',
                quote: 'Finasteride taken for 7 years in the Prostate Cancer Prevention Trial (PCPT) reduced the ' +
                       'risk of prostate cancer by 25%, but with an apparent increased risk of high-grade disease.' },
      direction: 'decreases', magnitude: '~25% fewer cancers detected', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', outcome: 'incidence', affects: ['gg1', 'gg2'],
      note: 'The most interesting entry on this list. A randomised trial of finasteride (the PCPT) ' +
            'found a quarter fewer prostate cancers — and an apparent EXCESS of high-grade ones, which ' +
            'stopped the drugs being used for prevention. Later modelling showed the excess was an ' +
            'artefact: the drug shrinks the prostate, so the same biopsy samples it more densely and ' +
            'grades it more accurately. Adjusting for these biases left no significant excess of ' +
            'high-grade disease, and longer follow-up found no excess mortality. A real harm that ' +
            'turned out to be a measurement.' }
  ],

  /* ---- detection ----------------------------------------------------
     The lens that justifies choosing this cancer. Prostate screening is the
     best-quantified benefit-and-harm trade in oncology, and nearly every
     number below has no equivalent in the breast dataset.
  -------------------------------------------------------------------- */
  detection: {
    note: 'Almost nothing above is a lever. What follows is: whether to test at all, what the ' +
          'test costs, and what the field decided to do about the answer.',

    relativeSurvivalNote: 'Relative survival compares men who have the diagnosis with men of the ' +
      'same age who do not. 100% means five-year survival is no different from the general ' +
      'population — it does not mean nobody dies of it, and a figure can exceed 100%. Every ' +
      'survival number on this page is relative, not absolute.',

    /* The case detection.horizonNote was added for. Localised and regional both
       report 100.0%, which is accurate and reads as "spread to the nodes does
       not matter". The validator warns when the top two stages are within a
       point of each other and this note is missing. */
    horizonNote: 'Look at the first two rows before reading anything else: localised and regional ' +
      'disease both report 100.0% five-year relative survival. That is correct, and it does not ' +
      'mean lymph-node spread is harmless. Five years is simply far inside the window in which ' +
      'this disease kills — median age at diagnosis is 68 and median age at death is 79. The ' +
      'five-year figure separates the stages of a fast cancer; for a slow one it mostly measures ' +
      'how long five years is.',

    stageOutcomes: [
      { stage: 'Localised', share: 69, fiveYear: 100.0,
        note: 'Confined to the prostate. Most PSA-detected disease lands here, and most of it ' +
              'would never have surfaced.' },
      { stage: 'Regional', share: 14, fiveYear: 100.0,
        note: 'Spread to nearby tissue or lymph nodes — and still indistinguishable from localised ' +
              'at five years. See the note above.' },
      { stage: 'Distant', share: 9, fiveYear: 40.1,
        note: 'Metastatic at diagnosis. The only row where the five-year window sees anything, and ' +
              'it carries most of the mortality.' },
      { stage: 'Unknown', share: 8, fiveYear: 94.1,
        note: 'Incomplete staging in the registry record — four times breast\'s unstaged share, ' +
              'largely because many men are never fully staged when the plan is surveillance.' }
    ],

    tradeoff: {
      note: 'Screening for prostate cancer buys a real reduction in deaths and costs a large ' +
            'amount of over-diagnosis. Both halves are quantified, and both are below.',
      basis: 'per 1,000 men invited to PSA screening, followed for 23 years (ERSPC)',
      rows: [
        { kind: 'benefit', value: '2.2', label: 'prostate cancer deaths prevented',
          note: 'An absolute risk reduction of 0.22%. Put the other way: 456 men invited, or 12 ' +
                'diagnosed, to prevent one death.' },
        { kind: 'harm', value: '+30%', label: 'excess cancers diagnosed',
          note: 'Excess incidence rate ratio 1.30 (1.26–1.33) — cumulative incidence 14% in the ' +
                'screened arm against 12% in the control arm. Most of that excess is disease that ' +
                'would never have surfaced.' },
        { kind: 'harm', value: '20–50%', label: 'of screen-detected cancers over-diagnosed',
          note: 'The USPSTF range. Nobody can tell which ones at the time of diagnosis, which is ' +
                'the entire problem.' },
        { kind: 'harm', value: '1 in 6', label: 'men get a false-positive result',
          note: 'And about 1% of the biopsies that follow cause a complication needing hospital ' +
                'admission.' }
      ],
      effect: {
        measure: 'RR', point: 0.87, ci: [0.80, 0.95],
        of: 'prostate cancer mortality in men invited to screening',
        followUp: '23 years, 162,236 men randomised (ERSPC)',
        note: 'A 13% relative reduction, and it grew with follow-up: the same trial read 20% at 16 ' +
              'years on a smaller absolute base. The benefit is real, delayed, and smaller than ' +
              'most people expect.'
      },
      disagreement: 'The largest US trial, PLCO, found no mortality benefit at all — but most men ' +
        'in its control arm were screened anyway, so it compared screening with screening. That is ' +
        'why the ERSPC figures are quoted here and why the disagreement is not simply averaged ' +
        'away. The more interesting resolution is what the field did next: rather than stop ' +
        'looking, it stopped treating what it found. Active surveillance for low-risk disease in ' +
        'the US Veterans system went from 27% of men in 2005 to 93% in 2024. Over-diagnosis is ' +
        'only a harm if it is followed by over-treatment.',
      sources: [
        { label: 'ERSPC 23-year follow-up (NEJM 2025)',
          url: 'https://ascopost.com/news/november-2025/extended-erspc-analysis-demonstrates-long-term-mortality-benefit-of-psa-screening-for-prostate-cancer/' },
        { label: 'USPSTF prostate cancer screening recommendation (2018)',
          url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening' },
        { label: 'Active surveillance 27% → 93%, US Veterans system (JAMA 2026)',
          url: 'https://www.ucsf.edu/news/2026/08/432386/early-prostate-cancer-active-surveillance-now-first-choice' }
      ]
    },

    modalities: [
      { name: 'PSA blood test', role: 'Population screening',
        catches: 'Disease years before it causes symptoms, including most of what is curable.',
        misses: 'Some aggressive cancers produce little PSA. A normal result is not a clear one.',
        harms: 'About 1 in 6 screened men get a false positive; 20–50% of what is found is ' +
               'over-diagnosed; roughly 1% of the biopsies that follow need hospital admission. ' +
               'USPSTF grades it C for ages 55–69 — decide individually — and D over 70.',
        sensitivity: 'no clean threshold; 3 ng/mL is a convention, not a boundary',
        interval: 'Typically 2–4 yearly where offered. Guidelines differ and none recommend it universally.',
        note: 'Specific to the prostate, not to cancer: an enlarged gland, an infection or a bike ' +
              'ride will raise it.',
        harmsSource: 'uspstf-prostate',
        sensitivitySource: 'uspstf-prostate',
        intervalSource: 'erspc-23' },

      { name: 'Digital rectal examination', role: 'Screening adjunct',
        catches: 'Palpable tumours, mostly in the part of the gland a finger can reach.',
        misses: 'Most early disease, and everything in the anterior prostate.',
        harms: 'Low physical risk. Its real cost is false reassurance and the fact that its ' +
               'unpleasantness deters men from being assessed at all.',
        note: 'No longer recommended as a standalone screening test in most guidelines.' },

      { name: 'Multiparametric MRI before biopsy', role: 'Triage — before biopsy',
        catches: 'Clinically significant disease, and shows where in the gland to sample.',
        misses: 'Some Grade Group 1 disease — which is largely the point.',
        harms: 'Reader-dependent, and not universally available. Skipping biopsy on a negative MRI ' +
               'misses a small number of significant cancers.',
        note: 'GÖTEBORG-2 tested omitting systematic biopsy when MRI is negative and found ' +
              'substantially fewer clinically insignificant cancers detected, with significant ' +
              'cancer detection maintained. The most effective single change made to this pathway.',
        missesSource: 'goteborg2' },

      { name: 'Prostate biopsy', role: 'Diagnosis',
        catches: 'The tissue every Grade Group on this site is read from.',
        misses: 'Sampling error. A Grade Group 1 result can be an under-sampled higher grade, which ' +
                'is what repeat biopsy during surveillance is looking for.',
        harms: 'Bleeding, and infection serious enough to need hospital admission in roughly 1% of ' +
               'procedures. Transperineal sampling has largely replaced transrectal to reduce this.',
        note: 'Nothing on the grade axis exists without this step.',
        harmsSource: 'uspstf-prostate',
        missesSource: 'nccn-prostate' },

      { name: 'PSMA PET-CT', role: 'Staging — high risk',
        catches: 'Spread that conventional imaging cannot see. Sensitivity 85% against 38% for CT ' +
                 'plus bone scan, specificity 98% against 91%.',
        misses: 'Tumours with low PSMA expression — the same limitation that gates radioligand therapy.',
        harms: 'Changes management in about 28% of cases, which is a benefit when the change is ' +
               'right and a harm when it is not. Radiation exposure is roughly half that of ' +
               'conventional imaging (8.4 against 19.2 mSv).',
        note: 'proPSMA, a randomised trial: accuracy 92% against 65%, with fewer equivocal findings.',
        noteSource: { ref: 'propsma',
                      quote: 'PSMA PET-CT had a 27% (95% CI 23-31) greater accuracy than that of conventional ' +
                             'imaging (92% [88-95] vs 65% [60-69]; p<0.0001). … had more equivocal findings (23% ' +
                             '[17-31] vs 7% [4-13]) than PSMA PET-CT did.' },
        harmsSource: { ref: 'propsma',
                       quote: 'First-line conventional imaging conferred management change less frequently (23 ' +
                              '[15%] men [10-22] vs 41 [28%] men [21-36]; p=0.008) … Radiation exposure was 10.9 mSv ' +
                              '(95% CI 9.8-12.0) higher for conventional imaging than for PSMA PET-CT (19.2 mSv vs ' +
                              '8.4 mSv; p<0.001).' },
        catchesSource: { ref: 'propsma',
                         quote: 'We found a lower sensitivity (38% [24-52] vs 85% [74-96]) and specificity (91% ' +
                                '[85-97] vs 98% [95-100]) for conventional imaging compared with PSMA PET-CT.' } },

      { name: 'Genomic classifiers (Decipher, Prolaris, Oncotype GPS)', role: 'Risk refinement',
        catches: 'Aggressive biology inside a low or intermediate Grade Group.',
        misses: 'They refine an existing risk estimate rather than replacing it.',
        harms: 'They can disagree with each other, so which test you were given can change the ' +
               'advice you get.' }
    ],

    signs: [
      'Difficulty starting or stopping urination, or a weak stream — far more often an enlarged prostate than cancer',
      'Blood in the urine or semen',
      'New, persistent bone pain, especially in the back, hips or pelvis',
      'Unexplained weight loss alongside any of the above',
      'Most early prostate cancer causes no symptoms at all, which is why the detection question is a screening question'
    ],

    sources: [
      { label: 'SEER Cancer Stat Facts: Prostate Cancer — stage distribution and survival',
        url: 'https://seer.cancer.gov/statfacts/html/prost.html' },
      { label: 'USPSTF prostate cancer screening recommendation',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening' },
      { label: 'proPSMA — PSMA PET-CT versus conventional imaging (Lancet 2020)',
        url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30314-7/abstract' },
      { label: 'GÖTEBORG-2 — MRI-targeted biopsy only (NEJM 2022)',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2209454' }
    ]
  },

  /* ---- targets (curated layer) --------------------------------------
     Clinical framing the pipeline cannot compute. The generated overlay
     (data/prostate.targets.js) supplies protein length, domains, hotspot
     positions, structures, 30 agents and their FDA labels — all numbers with a
     provenance. What follows is judgement.

     Partial by design: 10 of 22 targets carry an entry, the same proportion
     breast ships. A target with none falls back to the one-line rationale in
     the overlay and nothing breaks.
  -------------------------------------------------------------------- */
  targets: [
    { gene: 'AR',
      summary: 'The target almost every prostate drug acts on, directly or upstream — and the ' +
               'clearest case in oncology of a tumour defeating a drug by making more of what the ' +
               'drug blocks. Amplified in 0.9% of primary tumours and 48.7% of castration-resistant ' +
               'ones, both computed here from separate cohorts.',
      caveat: 'Nearly invisible in the primary-tumour track above, and that is the cohort rather ' +
              'than the biology. AR alterations are what happens AFTER treatment, so a cohort of ' +
              'untreated prostatectomy specimens is blind to them by construction — the same trap ' +
              'ESR1 sets in the breast dataset.',
      watch: 'AR-V7, a splice variant with no ligand-binding domain, cannot be blocked by anything ' +
             'that works by occupying that domain. Degraders and CYP11A1 inhibitors are two ' +
             'different attempts to get behind it.',
      source: ['tcga-prad', 'su2c-2019'] },

    { gene: 'FOLH1',
      summary: 'PSMA — not a driver, and barely a cancer gene. It is an address: a protein sitting ' +
               'on the cell surface in enough quantity to aim a radioactive payload at. The whole ' +
               'radioligand programme rests on it.',
      caveat: 'Selection is by PET imaging, not by sequencing, so nothing in the mutation or ' +
              'copy-number track above says anything about who is eligible. In VISION 12.6% of men ' +
              'screened failed the imaging criteria.',
      watch: 'The July 2026 approval moved radioligand therapy into hormone-sensitive disease, ' +
             'which is a much larger population than the one the drug was built for.',
      caveatSource: { nct: 'NCT03511664', label: 'VISION' },
      watchSource: [{ nct: 'NCT04720157', label: 'PSMAddition' }, 'fda-onc-approvals'] },

    { gene: 'PARP1',
      summary: 'Not altered in prostate cancer and drugged anyway. PARP inhibitors work by ' +
               'synthetic lethality: they are useless unless the tumour has already lost its ' +
               'homologous recombination repair, which is why the biomarker is BRCA2 or ATM and ' +
               'never PARP1 itself.',
      caveat: 'Four PARP inhibitors are approved here on four differently-worded biomarkers — ' +
              'BRCA only, HRR-altered, or all comers in combination. Which trial a man would have ' +
              'qualified for depends on wording as much as on biology.',
      watch: 'BRCA reversion mutations restore the repair pathway and take the drug with them. ' +
             'They are detectable in ctDNA before progression shows on a scan.' },

    { gene: 'BRCA2',
      summary: 'The strongest inherited risk factor for this cancer AND one of its best treatment ' +
               'biomarkers — the same gene doing both jobs. Mutated in 2.7% of primary tumours and ' +
               '7.9% of castration-resistant ones.',
      caveat: 'Germline and somatic alterations are treated alike for drug selection and are not ' +
              'alike for a family. A somatic BRCA2 mutation says nothing about anyone else; a ' +
              'germline one is a conversation with relatives.',
      watch: 'Carriers tend to present with higher-grade disease, so the same gene that selects the ' +
             'drug also predicts needing it.',
      source: ['tcga-prad', 'su2c-2019'] },

    { gene: 'PTEN',
      summary: 'The commonest tumour-suppressor loss here — deleted outright in 15% of primary ' +
               'tumours, one of the highest homozygous deletion rates of any cancer studied, and ' +
               '26% in castration-resistant disease.',
      caveat: 'Undruggable itself, as tumour suppressors are: you cannot restore something that has ' +
              'been deleted. What is druggable is what its loss switches on.',
      watch: 'Capivasertib with abiraterone was approved in June 2026 for PTEN-deficient disease — ' +
             'the same AKT inhibitor already used in breast cancer, on the same pathway logic.',
      source: ['tcga-prad', 'su2c-2019'],
      watchSource: 'fda-onc-approvals' },

    { gene: 'AKT1',
      summary: 'The node PTEN loss releases. Rarely mutated in prostate cancer and clinically ' +
               'important anyway, because the pathway is switched on by something else upstream.',
      caveat: 'The alteration frequency track will look empty and the drug is approved regardless. ' +
              'That is not a contradiction — selection is by PTEN status, not by AKT1 mutation.',
      watch: 'Capivasertib is the clearest bridge between the two datasets on this site: same drug, ' +
             'same pathway, breast and prostate.' },

    { gene: 'TP53',
      summary: 'Mutated in 6.9% of primary tumours and 37.1% of castration-resistant ones — a ' +
               'five-fold rise that is the single best marker of how far the disease has travelled.',
      caveat: 'No drug against it, here or anywhere. The most altered gene in advanced prostate ' +
              'cancer is also the one with nothing aimed at it.',
      watch: 'TP53 loss together with RB1 loss is the route into neuroendocrine transformation, ' +
             'which is a change of disease rather than a change of stage.',
      source: ['tcga-prad', 'su2c-2019'] },

    { gene: 'RB1',
      summary: 'Barely touched in primary disease (0.3% deep deletion) and lost in about 10% of ' +
               'castration-resistant tumours. The clearest single-gene signal of lineage change.',
      caveat: 'Like TP53, undruggable and prognostically loud. Its value is as a warning rather ' +
              'than as a target.',
      watch: 'Where RB1 and TP53 have both gone, expect the androgen receptor to stop mattering — ' +
             'and expect PSA to stop tracking the disease.',
      source: ['tcga-prad', 'su2c-2019'] },

    { gene: 'SPOP',
      summary: 'Mutated in 11% of primary tumours and defines its own molecular class. Not a drug ' +
               'target, and the most interesting gene on this list for what it predicts: high grade ' +
               'at diagnosis and unusually durable hormone sensitivity at the same time.',
      caveat: 'Nothing is approved on SPOP status and nothing is likely to be soon. It is here ' +
              'because it is the strongest argument on this site for keeping a molecular axis that ' +
              'currently decides nothing.',
      watch: 'Whether SPOP status should modify how long hormone therapy is persisted with is an ' +
             'open question, not a recommendation.',
      source: ['tcga-prad', 'spop-clinical'] },

    { gene: 'CYP17A1',
      summary: 'Not a cancer gene at all — an enzyme in the pathway that makes androgens. ' +
               'Abiraterone blocks it, which starves the tumour rather than blocking its receptor.',
      caveat: 'The alteration track is meaningless here. Selection is by disease state, not by ' +
              'any property of the tumour genome, which is what a pathway-dependency target looks ' +
              'like.',
      watch: 'Opevesostat blocks CYP11A1, one step further upstream, and is in two phase 3 trials. ' +
             'Cutting off the supply earlier is the same idea taken further back.',
      watchSource: [{ nct: 'NCT06136624', label: 'OMAHA-003' }, { nct: 'NCT06136650', label: 'Opevesostat versus alternative NHA (MK-5684-004)' }] }
  ],

  /* ---- markers ------------------------------------------------------
     The things this cancer's two axes are keyed off. Grade Group is not a
     stain, but it is a scored, thresholded reading of a slide that decides
     management — which is exactly what this block is for.
  -------------------------------------------------------------------- */
  markers: [
    { id: 'GG', label: 'Grade Group (ISUP)', assay: 'H&E microscopy, scored by a pathologist',
      positiveThreshold: '1–5, from the two commonest Gleason patterns' },
    { id: 'ERG', label: 'ERG (usually TMPRSS2–ERG fusion)', assay: 'IHC or fusion sequencing',
      positiveThreshold: 'nuclear ERG staining, or a detected rearrangement' },
    { id: 'ETV1', label: 'ETV1 rearrangement', assay: 'fusion sequencing / outlier expression' },
    { id: 'ETV4', label: 'ETV4 rearrangement', assay: 'fusion sequencing / outlier expression' },
    { id: 'FLI1', label: 'FLI1 rearrangement', assay: 'fusion sequencing / outlier expression' },
    { id: 'SPOP', label: 'SPOP mutation', assay: 'targeted sequencing',
      positiveThreshold: 'missense in the MATH substrate-binding domain' },
    { id: 'FOXA1', label: 'FOXA1 mutation', assay: 'targeted sequencing' },
    { id: 'IDH1', label: 'IDH1 mutation', assay: 'targeted sequencing',
      positiveThreshold: 'R132 hotspot' }
  ],

  /* ---- glossary -----------------------------------------------------
     The words prostate owns. js/glossary.js holds the ~71 terms true of any
     cancer; anything naming this biology has to travel with this file, or a
     breast reader would be served Gleason definitions and vice versa.

     An entry WITH `d` replaces the engine term outright. An entry with only
     `w` keeps the engine definition and replaces the example.
  -------------------------------------------------------------------- */
  glossary: {

    groups: [
      { id: 'classification', label: 'How prostate cancer is sorted' }
    ],

    terms: [

      /* ---- words this cancer owns ---- */

      { t: 'Gleason score', g: 'classification', alias: ['Gleason', 'Gleason pattern'],
        d: 'A pathologist looks at the tumour, decides which two growth patterns are commonest, ' +
           'scores each from 3 to 5, and adds them. "3+4" and "4+3" both total 7 but are not the ' +
           'same disease — the first number is the one there is more of.',
        w: 'The oldest number on the report and still the most important. It is the basis of the ' +
           'Grade Group axis, and the reason that axis has five boxes rather than four.' },

      { t: 'Grade Group', g: 'classification', alias: ['GG', 'ISUP grade', 'grade group'],
        d: 'The Gleason scores collapsed into five plain numbers, 1 to 5. Grade Group 1 is ' +
           'Gleason 6 or below, 2 is 3+4, 3 is 4+3, 4 is 8, and 5 is 9 or 10. It exists because ' +
           '"Gleason 6 out of 10" sounds like a middling score and is in fact the mildest thing ' +
           'you can be told.',
        w: 'The default classification here, and the one that decides whether there is any ' +
           'treatment at all rather than which treatment.' },

      { t: 'grade', g: 'classification',
        d: 'How abnormal the cells look. In prostate the scale runs 1 to 5 as Grade Groups, not ' +
           '1 to 3 as in most cancers — and it is derived from a pattern score, not from a ' +
           'single judgement of how ugly the cells are.',
        w: 'Routinely confused with stage. Grade is how the cells look; stage is how far they ' +
           'have spread. Here grade is doing more work than usual, because it is what decides ' +
           'whether to treat.' },

      { t: 'PSA', g: 'detection', full: 'Prostate-specific antigen',
        d: 'A protein the prostate makes, measured in a blood test. A high level can mean cancer ' +
           '— and can equally mean an enlarged prostate, an infection, or a recent bike ride. ' +
           'It is specific to the prostate, not to cancer.',
        w: 'The reason prostate cancer is found early so often, and the reason so much of what is ' +
           'found would never have caused harm.' },

      { t: 'active surveillance', g: 'drugs', alias: ['watchful waiting', 'monitoring'],
        d: 'Deciding not to treat, and checking regularly instead — PSA, repeat biopsies, MRI. ' +
           'Treatment starts if the disease shows it is progressing. It is a plan, not an absence ' +
           'of one.',
        w: 'The standard first option for Grade Group 1. In the US Veterans system its use for ' +
           'low-risk disease rose from 27% in 2005 to 93% in 2024 — the field\'s answer to ' +
           'over-diagnosis was to stop treating, not to stop looking.' },

      { t: 'biochemical recurrence', g: 'numbers', alias: ['BCR', 'PSA recurrence'],
        d: 'PSA rising again after treatment that was meant to remove or destroy the tumour. It ' +
           'means cancer cells are still making PSA somewhere. It is not the same as symptoms, ' +
           'and it is a long way from death.',
        w: 'The endpoint most grade-group outcome figures use, including the ones on this site, ' +
           'because it happens years before anything else does. Read it as "the treatment did ' +
           'not finish the job", not as "the cancer is back and dangerous".' },

      { t: 'ETS fusion', g: 'molecular', alias: ['TMPRSS2-ERG', 'TMPRSS2:ERG', 'ETS'],
        d: 'Two genes accidentally joined together. A switch that the prostate normally uses to ' +
           'respond to testosterone gets wired onto a growth gene — usually ERG — so the growth ' +
           'gene turns on every time testosterone arrives.',
        w: 'The single commonest event in prostate cancer, in roughly half of cases, and the ' +
           'defining feature of four of the eight molecular classes here.' },

      { t: 'cribriform', g: 'classification', alias: ['cribriform pattern', 'IDC-P', 'intraductal carcinoma'],
        d: 'A sieve-like growth pattern — sheets of cells punched through with holes. Along with ' +
           'intraductal carcinoma, it is the adverse feature pathologists now report separately ' +
           'because it predicts worse outcomes than the Grade Group alone does.',
        w: 'Why two tumours in the same Grade Group can be managed differently. It is a modifier ' +
           'on this axis rather than a box of its own.' },

      { t: 'prostatectomy', g: 'drugs', alias: ['radical prostatectomy', 'RP'],
        d: 'Surgery to remove the whole prostate. It is one of three standard options for ' +
           'localised disease, alongside radiotherapy and active surveillance.',
        w: 'Also the source of most of the pathology on this site: a "prostatectomy cohort" is a ' +
           'set of tumours that were operated on, which is not a random sample of tumours.' },

      { t: 'androgen', g: 'molecular', alias: ['testosterone', 'AR', 'androgen receptor'],
        d: 'The male sex hormones, testosterone chief among them, and the receptor they act ' +
           'through. Prostate cells are built to grow in response to them, and so are most ' +
           'prostate cancers.',
        w: 'The axis nearly every prostate drug acts on. It is the direct counterpart of the ' +
           'estrogen receptor in breast cancer — same idea, different hormone.' },

      { t: 'endocrine therapy', g: 'drugs', alias: ['hormone therapy', 'ADT', 'androgen deprivation'],
        d: 'Treatment that removes the tumour\'s testosterone supply or blocks its ability to use ' +
           'it. In prostate cancer this is called androgen deprivation therapy, and it is the ' +
           'backbone of treatment once disease is no longer confined to the gland.',
        w: 'It works because the prostate is a hormone-driven organ — the same reason endocrine ' +
           'therapy works in ER-positive breast cancer, and the reason resistance eventually ' +
           'looks similar in both.' },

      /* ---- engine definitions, prostate examples ---- */

      { t: 'histology',
        w: 'A classification axis here, and a thin one: over 90% of prostate cancer is acinar ' +
           'adenocarcinoma, so the axis mostly separates rare things from one very large box.' },

      { t: 'carcinoma',
        w: 'Nearly all prostate cancer is acinar adenocarcinoma — a carcinoma of the gland cells. ' +
           'The word rules almost nothing out.' },

      { t: 'oncogene',
        w: 'ERG is the clearest example here: not mutated, not amplified, just switched on by ' +
           'being joined to the wrong promoter.' },

      { t: 'tumour suppressor',
        w: 'PTEN is the one to watch in prostate: deleted outright in about 15% of primary ' +
           'tumours, and the target of a drug approved in 2026 that works by blocking what PTEN ' +
           'loss switches on.' },

      { t: 'amplification',
        w: 'Rare in primary prostate cancer and central in advanced disease: AR amplification is ' +
           'the single commonest event once hormone therapy stops working.' },

      { t: 'cohort',
        w: 'The computed figures here come from 333 tumours in TCGA — all prostatectomy ' +
           'specimens. That cohort cannot see the low-grade disease nobody operates on, and it ' +
           'cannot see what happens after treatment.' },

      { t: 'alteration frequency',
        w: 'Quoted for the molecular class where it is highest. Watch the metric as well as the ' +
           'number: a "loss" call at ERG usually means the deletion that CREATES the fusion, ' +
           'which is a gain of function wearing a loss\'s clothes.' },

      { t: 'prevalence',
        w: 'Two different bases on this site, on two different axes, and they must not be mixed. ' +
           'The grade shares are registry counts from 310,062 men; the molecular shares are ' +
           'computed from 333 prostatectomy specimens.' }
    ]
  },

  /* ---- axes ---------------------------------------------------------
     Two, for now. Histology, PSMA expression level and disease state are
     planned and not built. Both of these are real classifications in daily
     use, and they answer different questions — which is why they are separate
     trees rather than one.
  -------------------------------------------------------------------- */
  axes: [
    { id: 'grade', label: 'Grade Group (ISUP / Gleason)', shortLabel: 'Grade Group', default: true,
      asks: 'How disordered does the tissue look?',
      measures: 'A pathologist reads the two commonest growth patterns on the biopsy, scores each ' +
                'from 3 to 5, and adds them. The sum is collapsed into a Grade Group from 1 to 5.',
      decides: 'Whether there is any treatment at all. Grade Group 1 now usually means active ' +
               'surveillance; Grade Group 5 means treatment starts immediately. No other number ' +
               'on the report moves the decision as far.',
      note: 'Shares are registry counts for 310,062 US men diagnosed 2004–2015 — the most recent ' +
            'population-scale Gleason distribution published. SEER has no prostate subtypes page ' +
            'and gates its risk-group field behind a data-use agreement, so this is curated, not ' +
            'fetched. Treat the shares as a decade out of date: Grade Group 1 has been falling ' +
            'sharply since, because MRI-first diagnosis and active surveillance changed who gets ' +
            'biopsied and what gets counted.' },

    { id: 'state', label: 'Disease state', shortLabel: 'State', default: false,
      asks: 'Where in the course is this, right now?',
      measures: 'Not the tumour. Testosterone level, PSA over time, and what shows up on a scan — ' +
                'the disease\'s behaviour rather than its appearance.',
      decides: 'Essentially every systemic treatment. Prostate oncology is organised around this ' +
               'axis and not around the other three: what a man is offered depends on whether his ' +
               'disease has spread and whether it still responds to hormone therapy.',
      note: 'The axis the other cancers on this site do not have, and the one that most repays ' +
            'reading. It partitions by the FURTHEST state a man\'s disease ever reaches, so every ' +
            'case falls in exactly one box and the boxes sum to the whole disease — a snapshot ' +
            'would double-count anyone who moved. The 83/17 split is derived: about 1 in 44 men ' +
            'die of prostate cancer against 1 in 8 diagnosed, so roughly a sixth of diagnoses ' +
            'end in death from it, and essentially every such death passes through metastatic ' +
            'disease. The splits below that are approximate and labelled where they are.' },

    { id: 'molecular', label: 'Molecular class (TCGA)', shortLabel: 'Molecular', default: false,
      asks: 'Which gene is actually driving it?',
      measures: 'Sequencing and expression, looking for one of seven defining events — a fusion ' +
                'involving ERG, ETV1, ETV4 or FLI1, or a mutation in SPOP, FOXA1 or IDH1.',
      decides: 'Nothing, today. No prostate treatment is chosen by molecular class. It is here ' +
               'because it is the closest thing to what the tumour biologically is, and because ' +
               'it disagrees with the grade axis in a measurable way.',
      note: 'Shares are computed from TCGA prad_tcga_pub (n=333) by the pipeline, not estimated. ' +
            'That cohort is prostatectomy specimens, so it under-represents the low-grade disease ' +
            'that never reaches surgery. A quarter of tumours fit none of the seven classes and ' +
            'are shown as such rather than forced into one.' },

    { id: 'histology', label: 'Histology', shortLabel: 'Histology', default: false,
      asks: 'What does it look like under the microscope, and which cells did it start in?',
      measures: 'The shape and arrangement of the cells on the slide, before any grading is done.',
      decides: 'Little for the 95% that is ordinary acinar adenocarcinoma. A great deal for the ' +
               'rest: small cell carcinoma is not treated like prostate cancer at all.',
      note: 'The thinnest axis here, and honestly so. Over 90% of prostate cancer is one thing, ' +
            'so this axis mostly separates rare entities from one very large box — where breast\'s ' +
            'histology axis has 15 meaningful nodes and 36 registry codes to draw on, OncoTree ' +
            'carries 6 codes for the whole prostate. Shares below acinar are approximate: no ' +
            'registry publishes a stable partition at this resolution and published series ' +
            'disagree by multiples.' }
  ],

  nodes: [

  /* ============================== AXIS 1 — GRADE GROUP ============================== */

  {
    id: 'grade-root', axis: 'grade', parent: null,
    label: 'All prostate cancer', shortLabel: 'All prostate cancer',
    prevalence: 100,
    summary: 'One number, read off a slide, decides more here than anywhere else in this app: ' +
             'whether to treat at all. Grade Group 1 is usually watched rather than treated; ' +
             'Grade Group 5 is treated at once. The five groups are not five severities of the ' +
             'same thing so much as a line drawn through a continuum, and where the line falls ' +
             'has moved twice in living memory.',
    molecular: {
      pathways: [
        { name: 'Androgen receptor signalling', status: 'the driver in almost every case',
          note: 'The prostate is built to grow in response to testosterone, and so is nearly ' +
                'every prostate cancer. It is the direct counterpart of {{endocrine therapy|ER ' +
                'signalling in breast cancer}}.' },
        { name: 'PI3K / AKT / PTEN', status: 'PTEN deleted in ~15% of primary tumours',
          note: 'The commonest tumour-suppressor loss here, and since 2026 a drug indication.', source: 'tcga-prad' },
        { name: 'DNA damage repair', status: 'defective in ~19% of primary tumours',
          note: 'BRCA2, ATM, CDK12 and others. Selects PARP inhibitors in advanced disease.',
          source: { ref: 'tcga-prad', quote: 'DNA repair genes were inactivated in 19%.' } }
      ],
      biomarkers: [
        { name: 'Grade Group', use: 'decides whether to treat or watch', threshold: '1–5', source: 'epstein-gg' },
        { name: 'PSA', use: 'triggers investigation, then tracks response', threshold: 'no clean cutoff' },
        { name: 'Cribriform / intraductal pattern', use: 'upgrades management within a Grade Group' },
        { name: 'Genomic classifiers (Decipher, Prolaris, Oncotype GPS)',
          use: 'refines risk within low and intermediate grade; NCCN allows their use' }
      ]
    },
    prognosis: {
    source: 'seer-prostate',
      relativeOutlook: 'Better than any other common cancer on the whole, and much worse than the ' +
                       'headline suggests for the minority who present with spread.',
      fiveYearNote: '98.2% five-year relative survival overall (SEER 21, 2016–2022) — the highest ' +
                    'of any common cancer here. Localised and regional disease both read 100.0%, ' +
                    'which is true and misleading: five years is far inside the window in which ' +
                    'this disease kills. Median age at diagnosis is 68 and at death is 79.',
      caveat: 'Grade matters more than stage for the 83% who present with localised or regional ' +
              'disease, because almost none of them die within the reporting window either way.'
    },
    sources: [
      { label: 'SEER Cancer Stat Facts: Prostate Cancer — 2026 estimates, stage and survival',
        url: 'https://seer.cancer.gov/statfacts/html/prost.html' },
      { label: 'SEER 2004–2015 (n=310,062) — the Gleason distribution these shares come from',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8076565' },
      { label: 'Grade Group validation across surgical and radiation cohorts',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5626925/' }
    ]
  },

  {
    id: 'gg1', axis: 'grade', parent: 'grade-root',
    label: 'Grade Group 1 (Gleason ≤6)', shortLabel: 'GG1',
    prevalence: 45.4,
    markers: { GG: '1' },
    summary: 'The largest group, and the one the field argues about. Across more than 14,000 ' +
             'radical prostatectomy specimens of pure Grade Group 1 disease, not one had spread ' +
             'to a pelvic lymph node. Every apparent counter-example, on review, turned out to ' +
             'have been under-graded. It does grow locally — extension beyond the gland happens ' +
             'in around 4% — but by the usual definition of cancer, the ability to spread ' +
             'discontinuously, this barely qualifies.',
    prognosis: {
    source: 'epstein-gg',
      relativeOutlook: 'Excellent, and largely independent of what is done about it.',
      fiveYearNote: '4-year biochemical recurrence-free survival after prostatectomy is 96.1%, ' +
                    'and 91.3% when graded on the biopsy rather than the removed gland. Note the ' +
                    'endpoint: PSA rising, not death.',
      caveat: 'The main risk in Grade Group 1 is not the tumour. It is that the biopsy under-' +
              'sampled a higher-grade area, which is what repeat biopsy and MRI during active ' +
              'surveillance are looking for.'
    },
    therapies: [
      { name: 'Active surveillance', class: 'monitoring', setting: 'first choice', status: 'standard' },
      { name: 'Prostatectomy or radiotherapy', class: 'radical treatment', setting: 'on progression',
        status: 'standard, but not first' }
    ],
    related: [
      { to: 'mol-other', kind: 'overlaps',
        note: 'The unclassified molecular group is the one enriched for low-grade disease — 23 of ' +
              'its 86 tumours are Gleason 3+3, against 65 of 333 in the cohort overall.' }
    ],
    caveat: 'A live argument, not a settled fact. A 2022 JCO paper argued that renaming this ' +
            '"non-cancer" is scientifically flawed and would harm patient care, chiefly because ' +
            'the label is what keeps people in surveillance programmes at all.',
    sources: [
      { label: 'Nationwide series — lymph-node metastasis in pure Gleason 3+3 disease',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0031302516305785' },
      { label: 'Renaming Gleason 6 to non-cancer: a flawed idea (J Clin Oncol 2022)',
        url: 'https://ascopubs.org/doi/10.1200/JCO.22.00926' }
    ]
  },

  {
    id: 'gg-intermediate', axis: 'grade', parent: 'grade-root',
    label: 'Intermediate grade (Grade Group 2–3)', shortLabel: 'Intermediate',
    prevalence: 40.5,
    summary: 'Both of these total Gleason 7, and splitting them was the single most useful change ' +
             'the Grade Group system made. 3+4 and 4+3 contain the same two patterns in different ' +
             'proportions, and behave differently enough that one is often watched and the other ' +
             'usually is not.',
    prognosis: {
      relativeOutlook: 'The decision zone. Most of the genuine treat-or-watch difficulty in ' +
                       'prostate cancer lives in these two boxes.',
      caveat: 'Cribriform architecture and intraductal carcinoma, where present, predict worse ' +
              'outcomes than the Grade Group alone — which is why they are now reported separately.'
    }
  },

  {
    id: 'gg2', axis: 'grade', parent: 'gg-intermediate',
    label: 'Grade Group 2 (Gleason 3+4)', shortLabel: 'GG2',
    prevalence: 28.6,
    markers: { GG: '2' },
    summary: 'Mostly the mild pattern with some of the aggressive one mixed in. Often called ' +
             'favourable intermediate risk, and increasingly managed with surveillance rather ' +
             'than immediate treatment — provided the pattern-4 fraction is small and there is no ' +
             'cribriform growth.',
    prognosis: {
    source: 'epstein-gg',
      relativeOutlook: 'Good, and materially better than Grade Group 3 despite both totalling 7.',
      fiveYearNote: '4-year biochemical recurrence-free survival 86.7% after prostatectomy, ' +
                    '81.6% on biopsy grade.',
      caveat: 'The percentage of pattern 4 matters and is not captured by the group label. 5% ' +
              'pattern 4 and 45% pattern 4 are both "3+4".'
    },
    therapies: [
      { name: 'Active surveillance', class: 'monitoring', setting: 'selected favourable cases', status: 'increasingly standard' },
      { name: 'Prostatectomy or radiotherapy', class: 'radical treatment', setting: 'localised', status: 'standard' }
    ],
    related: [
      { to: 'mol-erg', kind: 'overlaps',
        note: 'The largest single cell of the concordance matrix: 47 of the 152 ERG-fused tumours ' +
              'in TCGA are Gleason 3+4. That is not a finding about ERG — it is what the cohort ' +
              'looks like.' }
    ]
  },

  {
    id: 'gg3', axis: 'grade', parent: 'gg-intermediate',
    label: 'Grade Group 3 (Gleason 4+3)', shortLabel: 'GG3',
    prevalence: 11.9,
    markers: { GG: '3' },
    summary: 'The same two patterns as Grade Group 2, the other way round — more of the ' +
             'aggressive one than the mild one. Usually called unfavourable intermediate risk, ' +
             'and usually treated.',
    prognosis: {
    source: 'epstein-gg',
      relativeOutlook: 'Meaningfully worse than Grade Group 2. The step from 3+4 to 4+3 is larger ' +
                       'than the step from 4+3 to Gleason 8.',
      fiveYearNote: '4-year biochemical recurrence-free survival 67.0% after prostatectomy, ' +
                    '69.8% on biopsy grade — a drop of about 20 points from Grade Group 2.',
      caveat: 'This is where the Grade Group system earns its keep. Under the old scoring both ' +
              'this and Grade Group 2 were "Gleason 7", which flattened a real difference.'
    },
    therapies: [
      { name: 'Prostatectomy or radiotherapy', class: 'radical treatment', setting: 'localised', status: 'standard' },
      { name: 'Radiotherapy with androgen deprivation', class: 'combined', setting: 'unfavourable intermediate', status: 'standard' }
    ]
  },

  {
    id: 'gg-high', axis: 'grade', parent: 'grade-root',
    label: 'High grade (Grade Group 4–5)', shortLabel: 'High grade',
    prevalence: 14.2,
    summary: 'Gleason 8 and above. Treated immediately and usually with more than one modality. ' +
             'This is the seventh of cases that carries most of the mortality — and, on the ' +
             'molecular axis, the group where SPOP-mutant tumours are most concentrated.',
    prognosis: {
      relativeOutlook: 'The group where prostate cancer behaves like the cancers people expect.',
      caveat: 'Still not uniform: a Gleason 8 and a Gleason 10 are both "high grade" and are not ' +
              'the same prospect.'
    },
    related: [
      { to: 'mol-spop', kind: 'overlaps',
        note: 'Computed from TCGA: 17 of 37 SPOP-mutant tumours (45.9%) are Gleason ≥8, against ' +
              '26.4% of the cohort overall. High grade and hormone-sensitive at once — see that node.' }
    ]
  },

  {
    id: 'gg4', axis: 'grade', parent: 'gg-high',
    label: 'Grade Group 4 (Gleason 8)', shortLabel: 'GG4',
    prevalence: 8.3,
    markers: { GG: '4' },
    summary: 'Predominantly the aggressive growth pattern. High-risk disease by every ' +
             'stratification system in use.',
    prognosis: {
    source: 'epstein-gg',
      relativeOutlook: 'Poor relative to the rest of localised prostate cancer; still often curable.',
      fiveYearNote: '4-year biochemical recurrence-free survival 63.1% after prostatectomy, ' +
                    '60.3% on biopsy grade.'
    },
    therapies: [
      { name: 'Radiotherapy with long-course androgen deprivation', class: 'combined', setting: 'localised high risk', status: 'standard' },
      { name: 'Prostatectomy with extended lymph node dissection', class: 'surgery', setting: 'selected', status: 'standard' }
    ]
  },

  {
    id: 'gg5', axis: 'grade', parent: 'gg-high',
    label: 'Grade Group 5 (Gleason 9–10)', shortLabel: 'GG5',
    prevalence: 5.9,
    markers: { GG: '5' },
    summary: 'The most disordered tissue the system describes — little or no recognisable gland ' +
             'formation. Highest risk of spread before diagnosis, and the group most likely to ' +
             'need systemic treatment from the start.',
    prognosis: {
    source: 'epstein-gg',
      relativeOutlook: 'The worst outlook on this axis, and the group where the five-year survival ' +
                       'headline is least applicable.',
      fiveYearNote: '4-year biochemical recurrence-free survival 41.0% after prostatectomy, ' +
                    '44.4% on biopsy grade — less than half of Grade Group 1.',
      caveat: 'Also the group in which treatment-emergent neuroendocrine transformation is most ' +
              'often seen later. That belongs to the histology and disease-state axes, which are ' +
              'not built yet.'
    },
    therapies: [
      { name: 'Radiotherapy with long-course androgen deprivation', class: 'combined', setting: 'localised very high risk', status: 'standard' },
      { name: 'Androgen deprivation intensified with an AR pathway inhibitor', class: 'systemic', setting: 'metastatic at presentation', status: 'standard' }
    ]
  },

  /* ============================== AXIS 2 — MOLECULAR CLASS ============================== */

  {
    id: 'mol-root', axis: 'molecular', parent: null,
    label: 'All prostate cancer', shortLabel: 'All prostate cancer',
    prevalence: 100,
    summary: 'Seven defining events sort about three quarters of primary prostate cancers into ' +
             'classes; the remaining quarter fit none of them. Four of the seven are fusions that ' +
             'put an ETS-family growth gene under the control of an androgen-responsive switch. ' +
             'The other three are point mutations. Nothing on this axis currently changes ' +
             'treatment, and saying so plainly is more useful than implying otherwise.',
    molecular: {
      drivers: [
        { gene: 'PTEN', alteration: 'deep deletion', frequency: 15, role: 'tumour suppressor', druggable: true,
          note: 'One of the highest rates of homozygous deletion of any tumour type studied. ' +
                'Capivasertib was approved with abiraterone for PTEN-deficient disease in June 2026.' },
        { gene: 'SPOP', alteration: 'missense mutation in the MATH domain', frequency: 11, role: 'ubiquitin ligase adaptor',
          note: 'Defines its own class, and is nearly mutually exclusive with the ETS fusions.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 7, role: 'tumour suppressor',
          note: 'Low in primary disease and five times higher in castration-resistant disease.' },
        { gene: 'FOXA1', alteration: 'mutation', frequency: 4, role: 'pioneer transcription factor',
          note: 'Opens chromatin for the androgen receptor. Mutations change where AR can bind.' },
        { gene: 'ATM', alteration: 'mutation', frequency: 4, role: 'DNA damage response' },
        { gene: 'BRCA2', alteration: 'mutation', frequency: 3, role: 'homologous recombination', druggable: true,
          note: 'Selects PARP inhibitors. Also the strongest inherited risk factor for this cancer.' }
      ],
      pathways: [
        { name: 'ETS transcription factor activation', status: 'fused in ~59% of cases',
          note: 'ERG, ETV1, ETV4 or FLI1, joined to an androgen-responsive promoter.', source: 'tcga-prad' },
        { name: 'PI3K / AKT / PTEN', status: 'actionable lesion in ~25%, counted together with MAPK',
          source: { ref: 'tcga-prad',
                    quote: '25% of the prostate cancers had a presumed actionable lesion in the PI3K or MAPK ' +
                           'signaling pathways' } },
        { name: 'DNA damage repair', status: 'defective in ~19%',
          note: 'BRCA2 3%, FANCD2 7%, RAD51C 3%, CDK12 1% and others.',
          source: { ref: 'tcga-prad', quote: 'DNA repair genes were inactivated in 19%.' } },
        { name: 'Androgen receptor signalling', status: 'near-universal, rarely altered in primary disease',
          note: 'The receptor itself is almost never amplified before treatment. That changes ' +
                'completely afterwards.' }
      ],
      biomarkers: [
        { name: 'ERG by IHC', use: 'a cheap read-out of the commonest fusion' },
        { name: 'Homologous recombination repair panel', use: 'selects PARP inhibitors in advanced disease' },
        { name: 'PTEN loss', use: 'selects capivasertib with abiraterone (approved June 2026)', source: 'fda-onc-approvals' },
        { name: 'MSI-H / dMMR', use: 'selects pembrolizumab; rare here' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Not currently predictable from molecular class. That is the honest state ' +
                       'of the evidence rather than a gap in this page.',
      caveat: 'Computed from 333 prostatectomy specimens. Alteration frequencies in this cohort ' +
              'describe primary, untreated, operable disease and should not be read as describing ' +
              'advanced disease, where they are very different.'
    },
    sources: [
      { label: 'TCGA — The Molecular Taxonomy of Primary Prostate Cancer (Cell 2015)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4695400/' },
      { label: 'Computed from cBioPortal study prad_tcga_pub (n=333)',
        url: 'https://www.cbioportal.org/study/summary?id=prad_tcga_pub' }
    ]
  },

  {
    id: 'mol-ets', axis: 'molecular', parent: 'mol-root',
    label: 'ETS fusion-positive', shortLabel: 'ETS fusion',
    prevalence: 59.4,
    summary: 'Four classes, one mechanism. A gene the prostate uses to respond to testosterone — ' +
             'usually TMPRSS2 — ends up joined to an ETS-family transcription factor, so the ' +
             'growth gene switches on whenever androgen arrives. The join happens either by a ' +
             'chromosome translocation or by deleting the roughly 3 megabases that sit between ' +
             'the two genes.',
    molecular: {
      pathways: [
        { name: 'Androgen-driven ETS transcription', status: 'the defining event',
          note: 'The fusion is bypassed in late-stage AR-negative disease — the mechanism that ' +
                'creates these tumours stops mattering once the tumour stops needing androgen.' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Indistinguishable from fusion-negative disease on the evidence to date.',
      caveat: 'Which is itself worth knowing: the commonest genetic event in this cancer has no ' +
              'established prognostic value.'
    },
    related: [
      { to: 'mol-spop', kind: 'mutually-exclusive',
        note: 'ETS fusion and SPOP mutation almost never co-occur. In one clinical series, ' +
              'TMPRSS2–ERG was found in 1.4% of SPOP-mutant tumours against 33.2% of unselected ones.' }
    ]
  },

  {
    id: 'mol-erg', axis: 'molecular', parent: 'mol-ets',
    label: 'ERG fusion', shortLabel: 'ERG',
    prevalence: 45.6,
    markers: { ERG: '+' },
    summary: 'The commonest single class, and computed here rather than estimated: 152 of the 333 ' +
             'tumours in TCGA. Almost always TMPRSS2–ERG. The most useful thing measured about it ' +
             'on this site is a negative result — it tells you nothing about the grade.',
    molecular: {
      drivers: [
        { gene: 'ERG', alteration: 'fusion to an androgen-responsive promoter', frequency: 100, role: 'oncogene',
          note: 'Definitional for this class, and now measured too: the structural-variant calls ' +
                'find an ERG rearrangement in all 152 tumours. The copy-number LOSS the pipeline ' +
                'also reports at the ERG locus in most of them is the interstitial deletion that ' +
                'creates the fusion — a gain of function that a copy-number caller reads as a ' +
                'deletion. Do not read it as ERG loss.' },
        { gene: 'PTEN', alteration: 'deep deletion', frequency: 26, role: 'tumour suppressor',
          note: 'Against 15% across the whole cohort — so PTEN loss is genuinely concentrated in ' +
                'ERG-fused tumours rather than merely common in both. One of the few things on ' +
                'this axis that ERG status does predict.' }
      ],
      biomarkers: [
        { name: 'ERG by IHC', use: 'a nuclear stain that stands in for the fusion', threshold: 'any nuclear staining' }
      ]
    },
    prognosis: {
      relativeOutlook: 'No established difference from fusion-negative disease.',
      caveat: 'Numerous studies have found no association between TMPRSS2–ERG and tumour grade, ' +
              'stage, Gleason score, PSA recurrence or mortality. The measured concordance on this ' +
              'site agrees: ERG-fused tumours split across the grades 17.8 / 30.9 / 27.0 / 24.3%, ' +
              'against a cohort distribution of 19.5 / 30.6 / 23.4 / 26.4%.'
    },
    related: [
      { to: 'gg2', kind: 'overlaps',
        note: '47 of 152 ERG tumours are Gleason 3+4 — the largest cell in the matrix, and a fact ' +
              'about how common 3+4 is rather than about ERG.' },
      { to: 'mol-spop', kind: 'mutually-exclusive',
        note: 'The two commonest classes essentially never overlap.' }
    ],
    sources: [
      { label: 'TMPRSS2:ERG and prostate cancer outcomes — cohort study and meta-analysis',
        url: 'https://aacrjournals.org/cebp/article/21/9/1497/69263/' },
      { label: 'Deletion of interstitial genes between TMPRSS2 and ERG (Cancer Res 2016)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26880803/' }
    ]
  },

  {
    id: 'mol-etv1', axis: 'molecular', parent: 'mol-ets',
    label: 'ETV1 fusion', shortLabel: 'ETV1',
    prevalence: 8.4,
    markers: { ETV1: '+' },
    summary: 'The second ETS class. Unlike ERG, ETV1 takes many different partner genes rather ' +
             'than nearly always the same one, and is often identified by outlier expression ' +
             'rather than by finding the fusion itself.',
    molecular: {
      drivers: [
        { gene: 'ETV1', alteration: 'rearrangement or outlier overexpression', frequency: 100, role: 'oncogene',
          note: 'Definitional for this class. The structural-variant calls find an ETV1 ' +
                'rearrangement in all 28 tumours.' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Too few cases here to say anything useful — 28 tumours.',
      caveat: 'A class defined on 28 samples. Any per-class figure below n≈30 on this axis should ' +
              'be read as descriptive of this cohort, not as an estimate of anything.'
    }
  },

  {
    id: 'mol-etv4', axis: 'molecular', parent: 'mol-ets',
    label: 'ETV4 fusion', shortLabel: 'ETV4',
    prevalence: 4.2,
    markers: { ETV4: '+' },
    summary: 'A rarer ETS rearrangement, 14 tumours in the cohort. Same mechanism as ERG and ' +
             'ETV1, different family member.',
    prognosis: {
      relativeOutlook: 'Not established.',
      caveat: '14 samples. Shown because the class exists in the published taxonomy, not because ' +
              'anything can be concluded from it here.'
    }
  },

  {
    id: 'mol-fli1', axis: 'molecular', parent: 'mol-ets',
    label: 'FLI1 fusion', shortLabel: 'FLI1',
    prevalence: 1.2,
    markers: { FLI1: '+' },
    summary: 'The rarest ETS class — four tumours. FLI1 is better known as the fusion partner in ' +
             'Ewing sarcoma; here it plays the same role ERG usually does.',
    prognosis: {
      relativeOutlook: 'Not established.',
      caveat: 'Four samples. Included for completeness of the taxonomy and for nothing else.'
    }
  },

  {
    id: 'mol-spop', axis: 'molecular', parent: 'mol-root',
    label: 'SPOP mutant', shortLabel: 'SPOP',
    prevalence: 11.1,
    markers: { SPOP: 'mutant' },
    summary: 'The most distinct class on this axis, and the one that makes the case for having a ' +
             'molecular axis at all. SPOP is the recognition part of a machine that tags proteins ' +
             'for disposal; the mutations stop it recognising its targets, so those targets — ' +
             'several of them androgen receptor co-activators — build up. It comes with a ' +
             'characteristic package: CHD1 deletion, high DNA methylation, unusually uniform gene ' +
             'expression, and frequent SPINK1 overexpression.',
    molecular: {
      drivers: [
        { gene: 'SPOP', alteration: 'missense mutation in the MATH substrate-binding domain', frequency: 100,
          role: 'ubiquitin ligase adaptor', frequencyNote: 'definitional for this class' },
        { gene: 'CHD1', alteration: 'deep deletion', frequency: 46, role: 'chromatin remodeller',
          note: 'The characteristic co-deletion. SPOP-mutant and CHD1-deleted are close to the ' +
                'same set of tumours.' },
        /* No `frequency` on these two on purpose. The figures worth quoting for
           them come from a clinical sequencing series of mostly advanced
           disease, and the computed column beside them is this TCGA cohort of
           primary prostatectomy specimens. Putting the first number in a field
           that gets diffed against the second manufactures a disagreement
           between two populations rather than between two accounts of one. */
        { gene: 'APC', alteration: 'mutation', role: 'Wnt pathway',
          note: 'The commonest co-mutation in a clinical SPOP-mutant series, at 22% — that series ' +
                'is not this cohort, so no percentage is claimed here.' },
        { gene: 'PTEN', alteration: 'loss', role: 'tumour suppressor',
          note: 'Reported at 18% in that same clinical series and computed at 5.4% here. Both are ' +
                'right about their own population: one is advanced disease sent for sequencing, ' +
                'the other is primary tumours that reached surgery.' }
      ],
      biomarkers: [
        { name: 'SPINK1 overexpression', use: 'frequently marks this class; used as a surrogate where sequencing is unavailable' }
      ]
    },
    prognosis: {
    source: ['spop-clinical', 'tcga-prad'],
      relativeOutlook: 'Two things at once, and they point opposite ways.',
      fiveYearNote: 'High grade at diagnosis — 45.9% are Gleason ≥8 in this cohort against 26.4% ' +
                    'overall, and a separate clinical series found 69.4% at Grade Group 4–5. Yet ' +
                    'median time to castration resistance was 42.0 months (95% CI 25.7–60.8), ' +
                    'longer than expected in unselected patients, with durable responses to ' +
                    'abiraterone and enzalutamide.',
      caveat: 'So the grade axis and the molecular axis disagree about this tumour, and both are ' +
              'right: it looks worse under the microscope and behaves better on hormone therapy. ' +
              'That is the clearest argument on this site for keeping two axes rather than ' +
              'merging them into one score.'
    },
    related: [
      { to: 'gg-high', kind: 'overlaps',
        note: '17 of 37 SPOP-mutant tumours are Gleason ≥8 — the strongest association in the ' +
              'measured matrix, and the opposite of what the treatment response would suggest.' },
      { to: 'mol-ets', kind: 'mutually-exclusive',
        note: 'Near-total mutual exclusivity with the ETS fusions.' }
    ],
    sources: [
      { label: 'Clinical and genomic features of SPOP-mutant prostate cancer',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8688331/' },
      { label: 'TCGA — molecular taxonomy of primary prostate cancer (Cell 2015)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4695400/' }
    ]
  },

  {
    id: 'mol-foxa1', axis: 'molecular', parent: 'mol-root',
    label: 'FOXA1 mutant', shortLabel: 'FOXA1',
    prevalence: 2.7,
    markers: { FOXA1: 'mutant' },
    summary: 'FOXA1 is a pioneer factor: it opens packed chromatin so the androgen receptor can ' +
             'reach the DNA underneath. Mutating it changes where the receptor is able to bind, ' +
             'which redirects the whole androgen programme rather than simply amplifying it.',
    molecular: {
      drivers: [
        { gene: 'FOXA1', alteration: 'mutation', frequency: 100, role: 'pioneer transcription factor',
          frequencyNote: 'definitional for this class' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Not established from nine tumours.',
      caveat: 'FOXA1 is far more prominent in advanced disease than these nine cases suggest — ' +
              'another limit of a primary-tumour cohort.'
    }
  },

  {
    id: 'mol-idh1', axis: 'molecular', parent: 'mol-root',
    label: 'IDH1 mutant', shortLabel: 'IDH1',
    prevalence: 0.9,
    markers: { IDH1: 'R132' },
    summary: 'Three tumours, and worth its own node anyway. The same R132 hotspot that defines a ' +
             'large fraction of gliomas, in a cancer that otherwise has nothing in common with ' +
             'them. It marks a distinct methylation phenotype and tends to occur in younger men.',
    prognosis: {
      relativeOutlook: 'Unknown at this sample size.',
      caveat: 'Three samples. Listed because a rare class named in the source taxonomy should not ' +
              'be quietly dropped for being small — the alternative is a page that implies the ' +
              'taxonomy has four classes when it has seven.'
    }
  },

  {
    id: 'mol-other', axis: 'molecular', parent: 'mol-root',
    label: 'Unclassified', shortLabel: 'Unclassified',
    prevalence: 25.8,
    summary: 'A quarter of tumours carry none of the seven defining events. This is not a class — ' +
             'it is the part of the taxonomy that does not work yet, and it is the second largest ' +
             'group on the axis.',
    molecular: {
      drivers: [
        { gene: 'ZFHX3', alteration: 'loss', frequency: 36, role: 'transcription factor',
          note: 'The commonest computed alteration in this group, which is a statement about what ' +
                'is left over rather than about a shared biology.' }
      ]
    },
    prognosis: {
    source: 'tcga-prad',
      relativeOutlook: 'Skews low grade in this cohort.',
      fiveYearNote: '23 of 86 are Gleason 3+3 and 30 are 3+4 — 62% at Grade Group 1–2 against ' +
                    '50% of the cohort overall.',
      caveat: 'Being unclassified is a property of the classification, not of the tumour. Naming ' +
              'the group honestly is the only thing that keeps the other seven percentages meaningful.'
    },
    related: [
      { to: 'gg1', kind: 'overlaps',
        note: 'The molecular class most enriched for the grade group that is usually not treated.' }
    ]
  },

  /* ============================== AXIS 3 — DISEASE STATE ==============================

     The axis breast does not have. Three of its nodes carry figures computed
     from three DIFFERENT cohorts — primary tumours, castration-resistant
     metastases, and the neuroendocrine form — because the treated disease is a
     different cohort and not a subtype of the untreated one. Node ids here are
     a contract with pipeline/cxp/cancers.py `cohort_nodes`.
  ==================================================================================== */

  {
    id: 'state-root', axis: 'state', parent: null,
    label: 'All prostate cancer', shortLabel: 'All prostate cancer',
    prevalence: 100,
    summary: 'Prostate cancer is not really one disease that varies; it is one disease that ' +
             'travels. The same tumour is managed completely differently depending on where in ' +
             'the journey it is, and the genome changes as it goes. This axis is the journey, ' +
             'partitioned by the furthest point each man\'s disease ever reaches.',
    molecular: {
      pathways: [
        { name: 'Androgen receptor signalling', status: 'the driver, and then the resistance mechanism',
          note: 'Almost never altered before treatment and altered in most tumours after it. That ' +
                'single fact is what this axis exists to show.' },
        { name: 'DNA damage repair', status: 'HRR mutated in 9.3% of primary and 22.1% of castration-resistant disease',
          note: 'Computed across two cohorts. This is the fraction eligible for a PARP inhibitor, ' +
                'and it more than doubles as the disease advances.', source: ['tcga-prad', 'su2c-2019'] }
      ]
    },
    prognosis: {
      relativeOutlook: 'Ranges from a disease most men die with rather than of, to a median ' +
                       'survival measured in a couple of years.',
      caveat: 'Every figure on this axis comes from a different cohort than the one beside it. ' +
              'That is unavoidable — nobody can sample the same tumour before and after a decade ' +
              'of treatment at scale — and it means the comparisons are between populations, not ' +
              'paired within patients.'
    },
    sources: [
      { label: 'SEER Cancer Stat Facts: Prostate Cancer — stage at diagnosis and mortality',
        url: 'https://seer.cancer.gov/statfacts/html/prost.html' },
      { label: 'TCGA primary (333 men), SU2C/PCF castration-resistant (429 men), and WCM neuroendocrine (81 men, 114 samples) via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=prad_su2c_2019' }
    ]
  },

  {
    id: 'state-confined', axis: 'state', parent: 'state-root',
    label: 'Never leaves the prostate', shortLabel: 'Confined',
    prevalence: 83,
    summary: 'Most men diagnosed with prostate cancer die of something else. This node covers ' +
             'everyone whose disease never becomes metastatic — those cured by surgery or ' +
             'radiotherapy, those watched and never treated, and those whose PSA rises after ' +
             'treatment without the cancer ever showing up on a scan.',
    molecular: {
      biomarkers: [
        { name: 'PSA after treatment', use: 'the earliest sign the treatment did not finish the job',
          threshold: 'a rise from an undetectable level' }
      ]
    },
    prognosis: {
    source: 'va-bcr',
      relativeOutlook: 'Normal or near-normal life expectancy.',
      fiveYearNote: 'Biochemical recurrence is common and metastasis after it is not: in a US ' +
                    'Veterans series of 22,033 men after prostatectomy, 27% had a PSA recurrence, ' +
                    'and of those, 11% went on to develop metastases. So most recurrence stays ' +
                    'in this node.',
      caveat: 'Biochemical recurrence is not given its own box here because no published series ' +
              'partitions the whole diagnosed population that way — the figures above are from ' +
              'men who had surgery, and nearly half of diagnoses now never do.'
    },
    related: [
      { to: 'gg1', kind: 'overlaps',
        note: 'Grade Group 1 disease essentially never leaves the prostate — no pelvic lymph-node ' +
              'metastasis in over 14,000 prostatectomy specimens.' }
    ]
  },

  {
    id: 'state-metastatic', axis: 'state', parent: 'state-root',
    label: 'Becomes metastatic', shortLabel: 'Metastatic',
    prevalence: 17,
    summary: 'Roughly one diagnosis in six ends here. About 9% of all diagnoses are already ' +
             'metastatic when they are made; the rest arrive later, typically years after ' +
             'treatment for apparently localised disease. Once it has spread, prostate cancer is ' +
             'treatable for a long time and not curable.',
    molecular: {
      pathways: [
        { name: 'Androgen deprivation', status: 'works, then stops working',
          note: 'Median time to castration resistance is about 16 months for men who presented ' +
                'metastatic and 28 months for those who progressed from localised disease.' }
      ]
    },
    prognosis: {
    source: 'seer-prostate',
      relativeOutlook: 'Median overall survival from metastatic hormone-sensitive disease is ' +
                       'several years and has been improving.',
      fiveYearNote: 'SEER puts five-year relative survival for distant disease at 40.1%, against ' +
                    '100.0% for localised and regional.',
      caveat: 'Men who present metastatic do worse than men who progress to it — median overall ' +
              'survival about 56 months against 85 — partly because presenting that way selects ' +
              'for more aggressive biology and partly because it means nobody was looking.'
    },
    related: [
      { to: 'gg5', kind: 'overlaps',
        note: 'Grade Group 5 is the grade most likely to have spread before diagnosis.' }
    ]
  },

  {
    id: 'state-hspc', axis: 'state', parent: 'state-metastatic',
    label: 'Still hormone-sensitive at the end', shortLabel: 'Hormone-sensitive',
    prevalence: 2,
    summary: 'A minority of men with metastatic disease die of something else, or of prostate ' +
             'cancer, while the tumour is still responding to hormone therapy. For everyone else ' +
             'the hormone blockade eventually fails, which is the next node.',
    prognosis: {
      relativeOutlook: 'Determined by whatever else is happening rather than by the cancer.',
      caveat: 'Estimated by subtraction rather than counted. Hormone-sensitive disease is a phase ' +
              'almost everyone passes through, so a node for "stopped here" is inherently small ' +
              'and inherently approximate.'
    }
  },

  {
    id: 'state-crpc', axis: 'state', parent: 'state-metastatic',
    label: 'Becomes castration-resistant', shortLabel: 'Castration-resistant',
    prevalence: 15,
    summary: 'The turning point, and the reason prostate cancer kills anyone. Androgen ' +
             'deprivation does not cure metastatic disease; it holds it. When the tumour learns ' +
             'to grow without testosterone — usually by making far more androgen receptor — the ' +
             'disease becomes castration-resistant, and almost every prostate cancer death ' +
             'happens on this side of that line.',
    molecular: {
      drivers: [
        { gene: 'AR', alteration: 'amplification', frequency: 49, role: 'the drug target itself', druggable: true,
          note: 'Against 0.9% in primary tumours. The disease responds to having its receptor ' +
                'blocked by building more receptor. Plus 13.1% carrying AR mutations.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 37, role: 'tumour suppressor',
          note: 'Five times the primary-tumour rate.' },
        { gene: 'PTEN', alteration: 'deep deletion', frequency: 26, role: 'tumour suppressor', druggable: true },
        { gene: 'MYC', alteration: 'amplification', frequency: 24, role: 'oncogene' },
        { gene: 'HRR', alteration: 'mutation', frequency: 22, role: 'DNA repair', druggable: true,
          note: 'BRCA1/2, ATM, CDK12, CHEK2, PALB2 and RAD51C/D counted together, because that is ' +
                'how the PARP-inhibitor indications are written. 9.3% in primary disease.' },
        { gene: 'RB1', alteration: 'deep deletion', frequency: 10, role: 'tumour suppressor',
          note: 'Against 0.3% in primary tumours. With TP53 loss, the route into neuroendocrine ' +
                'transformation.' }
      ],
      pathways: [
        { name: 'Androgen receptor, reactivated', status: 'altered in most tumours',
          note: 'Amplification, mutation, splice variants such as AR-V7 that no longer need a ' +
                'hormone to bind, and enhancer amplification. Several routes to the same escape.', source: 'su2c-2019' }
      ],
      biomarkers: [
        { name: 'HRR mutation', use: 'selects a PARP inhibitor', threshold: 'BRCA1/2 and related genes' },
        { name: 'PTEN loss', use: 'selects capivasertib with abiraterone (approved June 2026)', source: 'fda-onc-approvals' },
        { name: 'AR-V7', use: 'predicts poor response to further AR-directed therapy' }
      ]
    },
    prognosis: {
    source: { ref: 'mcrpc-epi',
              quote: 'Median overall survival increased from 1.23 years (95% CI, 1.19-1.27) in 2005 to 2011, to ' +
                     '1.75 years (95% CI, 1.70-1.80) in 2012 to 2017, to 2.17 years (95% CI, 2.11-2.22) in 2018 ' +
                     'to 2024' },
      relativeOutlook: 'Median overall survival has risen by close to a year since 2005–2011 and is ' +
                       'still measured in years, not decades.',
      fiveYearNote: 'Real-world median overall survival in metastatic castration-resistant ' +
                    'disease rose from about 1.2 years in 2005–2011 to 2.2 years in 2018–2024 ' +
                    '(1.23 and 2.17 years, rounded).',
      caveat: 'Figures on this node are computed from SU2C/PCF metastatic biopsies (429 men, one ' +
              'biopsy each), not ' +
              'from the primary-tumour cohort the rest of this dataset uses. That is the point of ' +
              'the node, and it also means these percentages describe men whose disease was ' +
              'biopsied after treatment failed — not an average patient.'
    },
    therapies: [
      { name: 'Abiraterone, enzalutamide, apalutamide, darolutamide', class: 'AR pathway inhibitor',
        setting: 'castration-resistant and hormone-sensitive metastatic', status: 'standard',
        source: [{ nct: 'NCT00887198', label: 'COU-AA-302' }, { nct: 'NCT01212991', label: 'PREVAIL' }, { nct: 'NCT00974311', label: 'AFFIRM' }] },
      { name: 'Olaparib, rucaparib, niraparib + abiraterone, talazoparib + enzalutamide',
        class: 'PARP inhibitor', setting: 'HRR- or BRCA-mutated', status: 'approved',
        source: [{ nct: 'NCT03732820', label: 'PROpel' }, { nct: 'NCT03748641', label: 'MAGNITUDE' }, { nct: 'NCT04497844', label: 'AMPLITUDE' }] },
      { name: 'Lutetium-177 PSMA-617 (Pluvicto)', class: 'radioligand',
        setting: 'PSMA-positive; extended to hormone-sensitive disease July 2026', status: 'approved',
        source: [{ nct: 'NCT03511664', label: 'VISION' }, { nct: 'NCT04689828', label: 'PSMAfore' }, { nct: 'NCT04720157', label: 'PSMAddition' }] },
      { name: 'Capivasertib + abiraterone', class: 'AKT inhibitor',
        setting: 'PTEN-deficient, approved June 2026', status: 'approved',
        source: [{ nct: 'NCT04493853', label: 'CAPItello-281' }, { nct: 'NCT00887198', label: 'COU-AA-302' }, { nct: 'NCT03732820', label: 'PROpel' }] },
      { name: 'Docetaxel, cabazitaxel', class: 'chemotherapy', setting: 'metastatic', status: 'standard',
        source: [{ nct: 'NCT02799602', label: 'ARASENS' }, { nct: 'NCT00003945', label: 'TAX 327' }, { nct: 'NCT00417079', label: 'TROPIC' }] },
      { name: 'Radium-223', class: 'alpha emitter', setting: 'bone-predominant metastatic', status: 'approved',
        source: [{ nct: 'NCT00699751', label: 'ALSYMPCA' }] }
    ],
    related: [
      { to: 'mol-erg', kind: 'overlaps',
        note: 'The ETS fusion that defines the largest primary class is bypassed here — once the ' +
              'tumour no longer depends on androgen, the androgen-driven promoter that created it ' +
              'stops mattering.' }
    ],
    sources: [
      { label: 'SU2C/PCF Dream Team — metastatic castration-resistant prostate adenocarcinoma (444 biopsies from 429 men)',
        url: 'https://www.cbioportal.org/study/summary?id=prad_su2c_2019' }
    ]
  },

  {
    id: 'state-crpc-adeno', axis: 'state', parent: 'state-crpc',
    label: 'Castration-resistant adenocarcinoma', shortLabel: 'CRPC adeno',
    prevalence: 12.5,
    summary: 'Castration-resistant disease that is still recognisably prostate adenocarcinoma and ' +
             'still, in most cases, driven by the androgen receptor. Every figure on this node is ' +
             'computed from metastatic biopsies rather than from primary tumours.',
    molecular: {
      drivers: [
        { gene: 'AR', alteration: 'amplification', frequency: 49, role: 'the drug target itself', druggable: true },
        { gene: 'AR', alteration: 'mutation', frequency: 13, role: 'ligand-binding change',
          note: 'Some of these let anti-androgens act as agonists instead of blockers.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 37, role: 'tumour suppressor' },
        { gene: 'FOXA1', alteration: 'mutation', frequency: 9, role: 'pioneer transcription factor',
          note: 'More than twice the primary-tumour rate — the receptor\'s access to DNA is ' +
                'remodelled as well as its abundance.' },
        { gene: 'BRCA2', alteration: 'mutation', frequency: 8, role: 'homologous recombination', druggable: true }
      ]
    },
    prognosis: {
      relativeOutlook: 'The state most prostate cancer drugs are approved in, and most men reach.',
      caveat: 'The cohort is biopsies of metastases from men whose treatment had failed. It is ' +
              'the right denominator for "what does resistant disease look like" and the wrong ' +
              'one for "what will happen to me".'
    }
  },

  {
    id: 'state-nepc', axis: 'state', parent: 'state-crpc',
    label: 'Neuroendocrine transformation', shortLabel: 'Neuroendocrine',
    prevalence: 2.5,
    summary: 'The escape route that stops being prostate cancer in any useful sense. Under ' +
             'sustained androgen blockade, roughly a fifth of castration-resistant tumours change ' +
             'lineage: they stop expressing the androgen receptor, stop making PSA, and start ' +
             'looking and behaving like small cell carcinoma. Blocking the androgen receptor ' +
             'harder does nothing, because the tumour is no longer listening.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 25, role: 'tumour suppressor' },
        { gene: 'RB1', alteration: 'mutation', frequency: 2.5, role: 'tumour suppressor',
          note: 'Two men of 81. This row read 7% until the pipeline began counting one sample per ' +
                'man: the cohort has 114 samples from 81 men, and the same two men\'s RB1 mutations ' +
                'had been counted in eight samples. Combined RB1 and TP53 loss is still the classic ' +
                'route into this state — RB1 deep deletion rises from 0.3% in primary disease to ' +
                'about 10% in castration-resistant disease — but mutation is not how RB1 is lost ' +
                'here, and this cohort cannot see deletions.' },
        { gene: 'SPOP', alteration: 'mutation', frequency: 9, role: 'ubiquitin ligase adaptor' }
      ],
      biomarkers: [
        { name: 'Chromogranin A, synaptophysin', use: 'neuroendocrine markers on the biopsy' },
        { name: 'Falling PSA with rising disease burden',
          use: 'the clinical clue — a tumour that grows while its marker drops has usually stopped being adenocarcinoma' }
      ]
    },
    prognosis: {
      relativeOutlook: 'The worst on this axis, and treated with platinum chemotherapy rather ' +
                       'than with anything prostate-specific.',
      caveat: 'Note what is MISSING from the figures above. The neuroendocrine cohort here ' +
              '(81 men, 114 samples) has no copy-number profiling at all, so amplifications and deletions are ' +
              'not measured rather than measured at zero. AR amplification, which is the ' +
              'defining feature of the node above, simply cannot be read here — and the ' +
              'biologically interesting claim is that it should be absent, which this cohort ' +
              'cannot confirm.'
    },
    related: [
      { to: 'gg5', kind: 'overlaps',
        note: 'Most often arises from disease that was high grade to begin with.' },
      { to: 'hist-small-cell', kind: 'reclassified-as',
        note: 'Once transformed it is diagnosed as small cell carcinoma on the histology axis — ' +
              'the same tumour, reclassified.' }
    ],
    sources: [
      { label: 'Neuroendocrine prostate cancer, multi-institutional cohort (Nat Med 2016, 114 samples from 81 men)',
        url: 'https://www.cbioportal.org/study/summary?id=nepc_wcm_2016' }
    ]
  },

  /* ============================== AXIS 4 — HISTOLOGY ============================== */

  {
    id: 'hist-root', axis: 'histology', parent: null,
    label: 'All prostate cancer', shortLabel: 'All prostate cancer',
    prevalence: 100,
    summary: 'The thinnest axis here, and it is thin because the disease is. Over nine in ten ' +
             'prostate cancers are ordinary acinar adenocarcinoma, so this axis is mostly a very ' +
             'large box and a handful of rare entities that behave completely differently.',
    prognosis: {
      relativeOutlook: 'Determined by grade and state rather than by histology, for the great majority.',
      caveat: 'The exception matters enormously: small cell carcinoma of the prostate is not ' +
              'treated as prostate cancer at all.'
    },
    sources: [
      { label: 'OncoTree (Memorial Sloan Kettering) — 6 prostate codes against 36 for breast',
        url: 'https://oncotree.mskcc.org/' }
    ]
  },

  {
    id: 'hist-acinar', axis: 'histology', parent: 'hist-root',
    label: 'Acinar adenocarcinoma', shortLabel: 'Acinar',
    prevalence: 95,
    summary: 'The default, and everything else on this site describes it. Cancer of the gland ' +
             'cells that make prostate fluid. Every Grade Group, every molecular class and every ' +
             'disease state on the other axes is about this box.',
    molecular: {
      biomarkers: [
        { name: 'Cribriform architecture and intraductal carcinoma', use: 'adverse patterns WITHIN acinar disease',
          note: 'Reported separately now because they predict worse outcomes than the Grade Group ' +
                'alone. They are patterns, not a histological type, which is why they are not a ' +
                'box on this axis.' }
      ]
    },
    prognosis: {
      relativeOutlook: 'The full range, from never-treated to lethal.',
      caveat: 'A category this large is not doing much classifying. That is the honest state of ' +
              'prostate histology and the reason the other three axes exist.'
    },
    related: [
      { to: 'grade-root', kind: 'overlaps',
        note: 'The grade axis is entirely a subdivision of this node.' }
    ]
  },

  {
    id: 'hist-ductal', axis: 'histology', parent: 'hist-root',
    label: 'Ductal adenocarcinoma', shortLabel: 'Ductal',
    prevalence: 1,
    summary: 'Arises in the larger prostatic ducts rather than the acini. Often produces less PSA ' +
             'for its size, so it can be more advanced than the blood test suggests, and it is ' +
             'usually treated as high-risk disease regardless of its Gleason pattern.',
    prognosis: {
      relativeOutlook: 'Worse stage for stage than acinar disease.',
      caveat: 'Rare enough that most evidence is retrospective and series disagree.'
    }
  },

  {
    id: 'hist-ne', axis: 'histology', parent: 'hist-root',
    label: 'Neuroendocrine carcinoma', shortLabel: 'Neuroendocrine',
    prevalence: 1,
    summary: 'Present at diagnosis in under 2% of cases — one large insured-population series put ' +
             'it at 0.4%. Far commoner as a transformation later, which belongs to the disease ' +
             'state axis rather than to this one.',
    prognosis: {
      relativeOutlook: 'Aggressive, and not androgen-driven.',
      caveat: 'De novo neuroendocrine carcinoma and treatment-emergent transformation look ' +
              'similar down a microscope and arrive by different routes. This node is the first; ' +
              'the state axis carries the second.'
    },
    related: [
      { to: 'state-nepc', kind: 'reclassified-as',
        note: 'The same appearance, reached from castration-resistant adenocarcinoma rather than ' +
              'present from the start.' }
    ]
  },

  {
    id: 'hist-small-cell', axis: 'histology', parent: 'hist-ne',
    label: 'Small cell carcinoma', shortLabel: 'Small cell',
    prevalence: 0.8,
    markers: { GG: 'not applicable' },
    summary: 'The one histology on this axis that changes everything. It does not respond to ' +
             'androgen deprivation, is not usefully graded by Gleason pattern, often makes little ' +
             'PSA, and is treated with platinum chemotherapy like small cell lung cancer.',
    prognosis: {
      relativeOutlook: 'Poor, and measured in months rather than years.',
      caveat: 'Gleason grading is not applied to it — which is why the grade axis quietly does ' +
              'not cover this node.'
    }
  },

  {
    id: 'hist-lcnec', axis: 'histology', parent: 'hist-ne',
    label: 'Large cell neuroendocrine carcinoma', shortLabel: 'Large cell NE',
    prevalence: 0.2,
    summary: 'Rarer still, and usually seen after prolonged hormone therapy rather than at ' +
             'presentation.',
    prognosis: {
      relativeOutlook: 'Poor.',
      caveat: 'Individual case series only.'
    }
  },

  {
    id: 'hist-other', axis: 'histology', parent: 'hist-root',
    label: 'Other rare types', shortLabel: 'Other rare',
    prevalence: 3,
    summary: 'Mucinous, signet-ring, basal cell, squamous, sarcomatoid and mixed types, together ' +
             'with the acinar variants that some pathologists report separately. Individually ' +
             'rare, collectively a few per cent, and grouped here rather than given boxes the ' +
             'evidence cannot size.',
    prognosis: {
      relativeOutlook: 'Varies by type and is mostly reported in case series.',
      caveat: 'This node exists to hold the remainder honestly. Splitting it into named boxes ' +
              'would give the treemap a precision that no registry supports — OncoTree carries ' +
              'six prostate codes in total.'
    }
  }

  ]
});
