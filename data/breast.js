/* data/breast.js — Breast cancer dataset for the Cancer Subtype Explorer.
 *
 * Molecular driver frequencies are from the TCGA Nature 2012 comprehensive
 * analysis (open access: PMC3465532) unless noted. Prevalence figures are
 * approximate and vary by population, registry and screening intensity —
 * they exist to size the treemap, not to be quoted as epidemiology.
 *
 * Pipeline/therapy status verified 2026-07-26. Sources: the curated drug pipeline's own notes.
 *
 * The disease-state axis (added 2026-09-13) is the exception to the TCGA rule:
 * its metastatic node is computed from MSK's metastatic biopsies (Razavi 2018).
 */
CancerExplorer.register({
  id: 'breast',
  name: 'Breast Cancer',
  synonyms: ['mammary carcinoma'],
  overview: 'Classified four different ways at once — receptor status, intrinsic gene expression, ' +
            'histology, and HER2 expression level — and followed a fifth, by whether it ever ' +
            'becomes metastatic. The four disagree, so the axis selector matters.',
  incidence: '~2.3M new cases worldwide per year; ~1% occur in men',
  lastVerified: '2026-07-26',

  /* Citations, declared once and referenced by id from factors, triggers and
     therapies. Repeating a URL ninety times is how citation coverage rots; a
     registry makes "which claims are sourced" a countable number, which
     `run.py audit` now reports.

     Every PMID and DOI below was looked up against Europe PMC rather than typed
     from memory. Where no single paper is the right citation — an age
     distribution, a registry rate — the source is the registry itself. */
  references: [
    { id: 'cgh-alcohol', label: 'Collaborative Group on Hormonal Factors in Breast Cancer — alcohol, tobacco and breast cancer (53 studies)',
      journal: 'Br J Cancer 2002', pmid: '12439712', url: 'https://doi.org/10.1038/sj.bjc.6600596' },
    { id: 'cgh-breastfeeding', label: 'Collaborative Group — breast cancer and breastfeeding (47 studies)',
      journal: 'Lancet 2002', pmid: '12133652', url: 'https://doi.org/10.1016/s0140-6736(02)09454-0' },
    { id: 'cgh-family', label: 'Collaborative Group — familial breast cancer (52 studies)',
      journal: 'Lancet 2001', pmid: '11705483', url: 'https://doi.org/10.1016/s0140-6736(01)06524-2' },
    { id: 'cgh-menarche', label: 'Collaborative Group on Hormonal Factors in Breast Cancer — menarche, menopause, and breast cancer risk: individual participant meta-analysis (117 studies)',
      journal: 'Lancet Oncol 2012', pmid: '23084519', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3488186/' },
    { id: 'cgh-mht', label: 'Collaborative Group — type and timing of menopausal hormone therapy and breast cancer risk',
      journal: 'Lancet 2019', pmid: '31474332', url: 'https://doi.org/10.1016/s0140-6736(19)31709-x' },
    { id: 'kuchenbaecker-brca', label: 'Kuchenbaecker et al — risks of breast and ovarian cancer for BRCA1/2 carriers',
      journal: 'JAMA 2017', pmid: '28632866', url: 'https://doi.org/10.1001/jama.2017.7112' },
    { id: 'tai-male-brca', label: 'Tai et al — breast cancer risk among male BRCA1 and BRCA2 mutation carriers',
      journal: 'J Natl Cancer Inst 2007', pmid: '18042939', url: 'https://pubmed.ncbi.nlm.nih.gov/18042939/' },
    { id: 'yang-palb2', label: 'Yang et al — cancer risks associated with germline PALB2 pathogenic variants',
      journal: 'J Clin Oncol 2020', pmid: '31841383', url: 'https://doi.org/10.1200/jco.19.01907' },
    { id: 'hansford-cdh1', label: 'Hansford et al — hereditary diffuse gastric cancer syndrome, CDH1 and beyond',
      journal: 'JAMA Oncol 2015', pmid: '26182300', url: 'https://doi.org/10.1001/jamaoncol.2014.168' },
    { id: 'boyd-density', label: 'Boyd et al — mammographic density and the risk and detection of breast cancer',
      journal: 'N Engl J Med 2007', pmid: '17229950', url: 'https://doi.org/10.1056/nejmoa062790' },
    { id: 'travis-rt', label: 'Travis et al — breast cancer following radiotherapy and chemotherapy for Hodgkin disease',
      journal: 'JAMA 2003', pmid: '12876089', url: 'https://doi.org/10.1001/jama.290.4.465' },
    { id: 'swerdlow-klinefelter', label: 'Brinton — breast cancer risk among patients with Klinefelter syndrome (review)',
      journal: 'Acta Paediatr 2011', pmid: '21241366', url: 'https://doi.org/10.1111/j.1651-2227.2010.02131.x' },
    { id: 'palmer-tnbc-repro', label: 'Ma et al — reproductive factors and triple-negative breast cancer risk in white and African-American women (pooled)',
      journal: 'Breast Cancer Res 2017', pmid: '28086982', url: 'https://doi.org/10.1186/s13058-016-0799-9' },

    /* Registry and guideline sources — the right citation for a rate or a
       threshold is the body that publishes it, not a paper. */
    { id: 'asco-cap-er', label: 'Allison et al — estrogen and progesterone receptor testing in breast cancer, ASCO/CAP guideline update (the 1% rule)',
      journal: 'J Clin Oncol 2020', pmid: '31928404', url: 'https://pubmed.ncbi.nlm.nih.gov/31928404/' },
    { id: 'asco-cap-her2', label: 'Wolff et al — HER2 testing in breast cancer, ASCO / College of American Pathologists guideline update (IHC 3+ and ISH criteria, HER2-low reporting)',
      journal: 'J Clin Oncol 2023', pmid: '37284804', url: 'https://pubmed.ncbi.nlm.nih.gov/37284804/' },
    { id: 'ki67-iwg', label: 'Nielsen et al — assessment of Ki67 in breast cancer, updated recommendations from the International Ki67 in Breast Cancer Working Group',
      journal: 'J Natl Cancer Inst 2021', pmid: '33369635', url: 'https://pubmed.ncbi.nlm.nih.gov/33369635/' },
    { id: 'shanghai-bse', label: 'Thomas et al — randomized trial of breast self-examination in Shanghai: final results',
      journal: 'J Natl Cancer Inst 2002', pmid: '12359854', url: 'https://pubmed.ncbi.nlm.nih.gov/12359854/' },
    { id: 'dbt-bcsc', label: 'Alabousi et al — performance of digital breast tomosynthesis, synthetic mammography, and digital mammography in breast cancer screening: a systematic review and meta-analysis',
      journal: 'J Natl Cancer Inst 2021', pmid: '33372954', url: 'https://pubmed.ncbi.nlm.nih.gov/33372954/' },
    { id: 'kuhl-mri', label: 'Kuhl et al — supplemental breast MR imaging screening of women at average risk of breast cancer',
      journal: 'Radiology 2017', pmid: '28221097', url: 'https://pubmed.ncbi.nlm.nih.gov/28221097/' },
    { id: 'saslow-2007', label: 'Saslow et al — American Cancer Society guidelines for breast screening with MRI as an adjunct to mammography',
      journal: 'CA Cancer J Clin 2007', pmid: '17392385', url: 'https://pubmed.ncbi.nlm.nih.gov/17392385/' },
    { id: 'agent-pipeline', label: 'This app\'s own tracked agent pipeline — the curated drug list behind the Targets lens, with every trial id re-resolved against ClinicalTrials.gov on each pipeline run',
      journal: 'Curated breast drug pipeline', url: 'https://clinicaltrials.gov/' },
    { id: 'metabric', label: 'Pereira et al — the somatic mutation profiles of 2,433 breast cancers (METABRIC)',
      journal: 'Nat Commun 2016', pmid: '27161491', url: 'https://www.cbioportal.org/study/summary?id=brca_metabric' },
    { id: 'seer-subtypes', label: 'SEER Cancer Stat Facts: Female Breast Cancer Subtypes (SEER 21, 2019–2023)',
      url: 'https://seer.cancer.gov/statfacts/html/breast-subtypes.html' },
    { id: 'seer-breast', label: 'SEER Cancer Stat Facts: Female Breast Cancer',
      url: 'https://seer.cancer.gov/statfacts/html/breast.html' },
    { id: 'tcga-2012', label: 'Cancer Genome Atlas Network — comprehensive molecular portraits of human breast tumours (TCGA)',
      journal: 'Nature 2012', pmid: '23000897', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' },
    { id: 'wcrf-cup', label: 'WCRF/AICR Continuous Update Project — diet, nutrition, physical activity and breast cancer',
      url: 'https://www.wcrf.org/research-policy/evidence-for-our-recommendations/' },
    { id: 'uspstf-screening', label: 'USPSTF — breast cancer screening recommendation',
      url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening' },

    /* Added with the disease-state axis, each looked up against Europe PMC or
       read off the publisher's page in the session it was written. ACS states
       both halves of the metastatic share -- the chance of developing breast
       cancer and of dying of it -- on one page, so that derivation rests on one
       source rather than two from different years. */
    { id: 'acs-key-stats', label: 'American Cancer Society — Key Statistics for Breast Cancer (lifetime chance of developing and of dying of breast cancer; updated June 2026)',
      url: 'https://www.cancer.org/cancer/types/breast-cancer/about/how-common-is-breast-cancer.html' },
    { id: 'razavi-2018', label: 'Razavi et al — the genomic landscape of endocrine-resistant advanced breast cancers (MSK, 1,918 tumours)',
      journal: 'Cancer Cell 2018', pmid: '30205045', url: 'https://doi.org/10.1016/j.ccell.2018.08.008' },
    { id: 'pan-2017', label: 'Pan et al (EBCTCG) — 20-year risks of breast-cancer recurrence after stopping endocrine therapy at 5 years',
      journal: 'N Engl J Med 2017', pmid: '29117498', url: 'https://doi.org/10.1056/nejmoa1701830' },
    { id: 'mariotto-2017', label: 'Mariotto et al — estimation of the number of women living with metastatic breast cancer in the United States',
      journal: 'Cancer Epidemiol Biomarkers Prev 2017', pmid: '28522448', url: 'https://doi.org/10.1158/1055-9965.EPI-16-0889' },

    /* Replace an uncited "~30% after AI exposure" on the HR+/HER2− ESR1 row. Both
       abstracts were read off PubMed / Europe PMC on 2026-09-13; the figures quoted
       are theirs verbatim. Neither measures tumour tissue -- both are blood tests. */
    { id: 'chandarlapaty-2016', label: 'Chandarlapaty et al — prevalence of ESR1 mutations in cell-free DNA, BOLERO-2 secondary analysis (541 baseline plasma samples)',
      journal: 'JAMA Oncol 2016', pmid: '27532364', url: 'https://doi.org/10.1001/jamaoncol.2016.1279' },
    { id: 'schiavon-2015', label: 'Schiavon et al — analysis of ESR1 mutation in circulating tumor DNA demonstrates evolution during therapy for metastatic breast cancer (ESR1 by setting of first aromatase-inhibitor exposure)',
      journal: 'Sci Transl Med 2015', pmid: '26560360', url: 'https://doi.org/10.1126/scitranslmed.aac7551' },

    /* Added with the germline-selected target check (melanoma plan, phase 6),
       read through openFDA on 2026-09-15. Both breast indications are written
       for germline BRCA variants only; the prostate indications of the same
       drugs say germline or somatic, which is why prostate carries no entry. */
    { id: 'label-olaparib', label: 'LYNPARZA (olaparib) US prescribing information, via openFDA — indications 1.4 and 1.5, germline BRCA-mutated HER2-negative breast cancer; effective 2025-07-10',
      journal: 'US FDA label', url: 'https://api.fda.gov/drug/label.json?search=set_id:741ff3e3-dc1a-45a6-84e5-2481b27131aa' },
    { id: 'label-talazoparib', label: 'TALZENNA (talazoparib) US prescribing information, via openFDA — indication 1.1 and patient selection 2.1, germline BRCA-mutated HER2-negative breast cancer; effective 2026-06-01',
      journal: 'US FDA label', url: 'https://api.fda.gov/drug/label.json?search=set_id:13839d4f-6acf-4ffb-a128-79df59319273' }
  ],

  /* Layer 0 — the front door. Everything below this point assumes you already
     know what breast cancer is and which lens you want; this block is what a
     person who knows neither reads first.

     The numbers are NOT here. They come from pipeline/facts/breast.overview.json
     (SEER, scraped) and land at ds.facts.overview, because they move. What lives
     here is the framing: what the disease is, why it is classified several ways
     at once, and the words a person will actually meet on a report. */
  profile: {
    /* {{term}} marks a word the author judged a reader gets stuck on. It is
       rendered as a clickable definition; nothing is scanned or guessed, and
       the validator reports any marker with no glossary entry behind it. */
    definition:
      'Breast cancer is not one disease. It is a family of diseases that start in the same ' +
      'organ — usually in the milk {{duct|ducts}} or the {{duct|lobules}} that feed them — and ' +
      'then behave so differently from each other that they are treated as separate illnesses. ' +
      'Which one someone has changes the treatment, the outlook, and the questions worth asking.',

    definitionMore:
      'It is not infectious and cannot be passed from person to person. Most cases are not ' +
      'inherited either: only about 5–10% come from a high-penetrance {{germline}} variant. ' +
      'Roughly 1 in 100 cases occur in men, which is rare enough that male breast cancer is ' +
      'usually diagnosed later than it needs to be. Which kind a tumour is cannot be known ' +
      'from a scan — it takes a {{biopsy}}, and everything below follows from what that finds.',

    /* Modelled global estimates. Kept apart from the SEER column on purpose —
       a registry count and a statistical model are not the same kind of number. */
    world: {
      newCasesPerYear: 2300000,
      deathsPerYear: 670000,
      label: 'World',
      note: 'Modelled estimates for all countries, not a registry count. Not comparable with ' +
            'the US column — different methods, and survival differs far more between health ' +
            'systems than between the subtypes on this site.',
      source: { label: 'WHO / IARC Global Cancer Observatory (GLOBOCAN)',
                url: 'https://gco.iarc.fr/' }
    },

    /* Names the concept; the cards under it are generated from axes[] so they
       cannot drift from the picker. The closing paragraph is the join into the
       report section — without it the page reads as two unrelated lists.

       Five axes, not five of a kind: four sort the tumour and the fifth sorts
       the course of the disease. Saying so stops the page claiming a tumour
       "has five answers at once" when one of them is not known at diagnosis. */
    classification:
      'There is no single correct way to sort breast cancer, and this site does not pretend ' +
      'otherwise. Four are in routine use at the same time. They are not four levels of ' +
      'detail — each one sorts every tumour into groups on its own, so any tumour has four ' +
      'answers at once, and all four are true. A fifth sorts something different: not the ' +
      'tumour but the course of the disease, by whether it ever becomes {{metastatic}} — and ' +
      'it is the only one that shows what treatment selects for. Each is a ' +
      '{{classification axis}} here, and the "Classify by" picker in the bar above switches ' +
      'between them.',

    classificationClose:
      'They genuinely disagree, which is the reason to keep them apart: only 83% of tumours ' +
      'called "basal-like" by {{gene expression}} are {{triple negative}} by staining. Merging ' +
      'them into one tidy hierarchy would hide exactly that disagreement, so each is kept as ' +
      'its own view, the overlaps are drawn as links, and the Evidence lens counts the ' +
      'mismatch rather than smoothing it.',

    /* Answers "what IS a pathology report" before using the phrase as a heading,
       and says where the tumour classifications above came from. That sentence is
       the transition: sections 4 and 5 are the same thing from two ends — the
       report is the source document, the axes are what this site does with it.
       The disease-state axis is the exception, and the sentence says so. */
    reportIntro:
      'The first four of those classifications are read off one document; the fifth is only ' +
      'known in hindsight. After a {{biopsy}}, a ' +
      '{{pathologist}} examines the tissue under a microscope, runs the stains, and writes a ' +
      '{{pathology report}}: what the cells look like, which switches are on, how abnormal ' +
      'they are, and how far they had spread. It describes the tumour; it does not recommend ' +
      'anything. These are the words it uses, and each one is a rung into the rest of this site.',

    /* The bridge into the explorer: the words on a real pathology report, each
       pointing at the node or lens that explains it. `marker` and `biomarker`
       pull the assay and threshold from markers[] / molecular.biomarkers rather
       than restating them. */
    reportTerms: [
      /* Ordered the way a report is actually read, not alphabetically: has it
         broken out, what is it made of, which switches are on, how bad does it
         look, how far has it gone. `axis` names which of the five classifications
         above the term feeds, so the two sections visibly join up. */
      { term: 'Invasive / in situ', axis: 'histology',
        plain: 'The first thing worth finding. {{in situ}} means the cells have not broken out ' +
               'of the {{duct|duct or lobule}} they started in and cannot yet spread; ' +
               '{{invasive}} means they have. Almost everything else on this site is about ' +
               'invasive disease.',
        goTo: 'insitu' },

      { term: 'Ductal / lobular', axis: 'histology',
        plain: 'Which part of the plumbing it started in, and how it grows. Lobular travels in ' +
               'single-file lines instead of forming a lump, which is why it is the kind a ' +
               'mammogram most often misses.',
        goTo: 'ilc' },

      { term: 'ER / PR', marker: 'ER', axis: 'ihc',
        plain: 'The hormone switches. Positive means the tumour is fed by estrogen — which is ' +
               'bad news made useful, because it can be starved with {{endocrine therapy}}.',
        goTo: 'hr-pos-her2-neg' },

      { term: 'HER2', marker: 'HER2', axis: 'ihc',
        plain: 'A growth-signal amplifier. Positive used to be the worst news in the report; ' +
               'it is now one of the most treatable findings in the whole disease. The amount ' +
               'matters too, which is what the {{HER2-low}} classification is about.',
        goTo: 'her2-pos-hr-neg' },

      { term: 'Triple negative', axis: 'ihc',
        plain: 'None of the three switches are on, so none of the three targeted approaches ' +
               'apply. It is a description of what is absent, not a single disease.',
        goTo: 'tnbc' },

      /* Deliberately no `axis`: grade and stage are on every report and are NOT
         among the classifications here. Claiming otherwise to fill the field in
         would be the exact confusion this section exists to remove. Stage is the
         tempting one now that a disease-state axis exists, and it is still not
         that axis: stage is a snapshot taken at diagnosis, and the state axis
         records the furthest the disease ever goes. Stage IV at diagnosis is one
         way into the metastatic node, and not the commoner one. */
      { term: 'Grade',
        plain: 'How abnormal the cells look, from 1 to 3. Not one of the classifications ' +
               'above — it cuts across all of them. Often confused with {{stage}}: {{grade}} ' +
               'is about appearance, stage is about spread, and stage matters far more.',
        goTo: 'ihc-root' },

      { term: 'Stage',
        plain: 'How far it has spread when it is found, from 0 to IV. Not one of the ' +
               'classifications either — and it matters more for outlook than any subtype on ' +
               'this site, which is why detection has its own view. It is close to the ' +
               'disease-state axis without being it: stage is fixed at diagnosis, while that ' +
               'axis follows the disease for the rest of its course.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Ki-67', biomarker: 'Ki-67', axis: 'pam50', axisRole: 'stands in for',
        plain: 'How fast the cells are dividing. A stain, not a gene test — but it is what ' +
               'separates the slow luminal A pattern from the faster luminal B one when the ' +
               'full {{gene expression}} assay has not been run, and the three main stains ' +
               'cannot tell those two apart.',
        goTo: 'luminal-a' }
    ],

    sources: [
      { label: 'SEER Cancer Stat Facts: Female Breast Cancer',
        url: 'https://seer.cancer.gov/statfacts/html/breast.html' }
    ]
  },

  /* The anchor. Every relative risk in factors[] is a multiplier on this number,
     and the renderer refuses to show an RR without converting it back to absolute
     terms. An RR quoted alone is the most common way this material misleads. */
  baseline: {
    population: 'US women',
    lifetimeRisk: 13,
    lifetimeRiskLabel: 'about 1 in 8',
    note: 'Averaged over an entire lifetime and an entire population. It is not the risk ' +
          'this year, and it is not one person\'s risk. Risk before 40 is a small fraction ' +
          'of it; most of the 13% accumulates after 60.',
    strata: [
      { label: 'US women, by age 40', lifetimeRisk: 0.6,
        note: 'Roughly 1 in 170. The steep part of the curve is later.' },
      { label: 'US women, by age 60', lifetimeRisk: 4.1,
        note: 'Roughly 1 in 24.' },
      { label: 'US men', lifetimeRisk: 0.13,
        note: 'Roughly 1 in 750 — about 1% of all breast cancer.' }
    ],
        source: { label: 'SEER / NCI DevCan — lifetime probability of developing breast cancer',
              url: 'https://seer.cancer.gov/statfacts/html/breast.html' }
  },

  /* Book I, layer 2 — the same evidence as the per-node triggers[], deduplicated and
     ranked. 57 trigger entries collapse to 21 distinct factors: alcohol appears on
     three nodes, obesity on four, BRCA1 on three. Per-node triggers[] are unchanged
     and still drive the subtype drawer; this is an index over them, not a replacement.

     Two fields carry the honesty rules:

     `scope` — an RR is only convertible against the whole-disease baseline when it was
     measured against the whole disease. "~2× incidence" for Black ancestry is 2× the
     rate of TRIPLE-NEGATIVE disease; multiplying it by the 13% overall baseline would
     manufacture a 26% figure that no study supports. scope names what the multiplier is
     of, and the renderer only converts when scope === 'overall'.

     `stratum` — points at a baseline.strata label when the denominator is not the
     default population. BRCA2 confers ~45–70% lifetime risk in women and ~6–8% in men;
     those are two different facts, not one range.

     `referent` — what the RR is relative TO. 'population' converts exactly (Klinefelter's
     ratio is against men generally). 'unexposed' — never users, non-drinkers, the least
     dense breasts — converts only as a bound, because the 13% baseline already contains
     the exposed; for these modest, uncommon exposures the bound is close. 'other' is a
     comparison group outside the population: chest radiation's RR is against Hodgkin
     survivors given low doses, so it is not converted at all. */
  factors: [

    /* ---- Demographic — none of these are levers, and saying so is the point ---- */
    { id: 'age', label: 'Increasing age', category: 'Demographic', modifiable: false,
  source: 'seer-breast',
      direction: 'increases', magnitude: 'strongest single factor', evidence: 'strong',
      scope: 'overall', affects: ['ihc-root'],
      note: 'Median age at diagnosis is early 60s; risk rises steeply after 40. No single ' +
            'multiplier captures it because the whole 13% baseline is an age-integrated number.' },

    { id: 'female-sex', label: 'Female sex', category: 'Demographic', modifiable: false,
      source: 'seer-breast',
      direction: 'increases', magnitude: '~100:1', evidence: 'strong',
      scope: 'overall', affects: ['ihc-root', 'male-bc'],
      note: 'A ratio between two populations rather than a multiplier on one, so it is not ' +
            'converted. Men are ~1% of cases — see male breast cancer on the histology axis.' },

    { id: 'dense-breast', label: 'Dense breast tissue', category: 'Demographic', modifiable: false,
      source: { ref: 'boyd-density', quote: 'as compared with women with density in less than 10% of the  ' +
                           'mammogram, women with density in 75% or more had an increased risk of breast  ' +
                           'cancer (odds ratio, 4.7; 95% confidence interval [CI], 3.0 to 7.4)' },
      direction: 'increases', magnitude: 'OR 4.7, densest vs least dense', evidence: 'strong',
      scope: 'overall', affects: ['ihc-root'],
      note: 'Density in 75% or more of the mammogram against less than 10%: the two ends of the scale, ' +
            'not dense breasts against everyone else. Most women sit between the two, so the ratio is not ' +
            'placed on the axis or converted to a lifetime risk. Does double duty: a genuine risk factor, and a ' +
            'masking effect that lowers mammographic sensitivity. The second half is a detection problem, not a ' +
            'risk one.' },

    { id: 'black-ancestry', label: 'Black / African ancestry (US data)', category: 'Demographic', modifiable: false,
      source: 'palmer-tnbc-repro',
      direction: 'increases', magnitude: 'more often diagnosed with triple-negative disease', evidence: 'strong',
      scope: 'tnbc', affects: ['tnbc', 'basal-like', 'inflammatory'],
      note: 'A higher triple-negative incidence than in white women in US data, plus worse ' +
            'stage-adjusted outcomes. Scoped to TNBC, not to breast cancer overall.' },

    /* ---- Germline — high magnitude, low population attributable fraction ---- */
    { id: 'family-history', label: 'Family history (first-degree relative)', category: 'Germline', modifiable: false,
      source: { ref: 'cgh-family', quote: 'the ratios were 1.80 (99% CI 1.69-1.91), 2.93 (2.36-3.64), and 3.90 ' +
                                         '(2.03-7.49), respectively, for one, two, and three or more affected ' +
                                         'first-degree relatives' },
      direction: 'increases', rr: [2, 4], magnitude: 'RR 2–4', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', affects: ['ihc-root', 'triple-positive'],
      note: 'From one affected first-degree relative (1.80) to three or more (3.90), rounded to whole ' +
            'numbers. Only a small share of breast cancer is attributable to a high-penetrance germline ' +
            'variant, so most people with a family history carry no identified mutation.' },

    { id: 'brca1', label: 'BRCA1 germline variant', category: 'Germline', modifiable: false,
      source: { ref: 'kuchenbaecker-brca', quote: 'The cumulative breast cancer risk to age 80 years was 72%  ' +
                           '(95% CI, 65%-79%) for BRCA1 and 69% (95% CI, 61%-77%) for BRCA2 carriers' },
      direction: 'increases', absoluteLifetime: [72, 72], magnitude: '72% by age 80', evidence: 'strong',
      scope: 'overall', affects: ['tnbc', 'basal-like', 'medullary'],
      note: 'Women carrying the variant, followed forward in time: cumulative risk to age 80, 95% CI 65–79%. ' +
            'An absolute risk, not a multiplier. Strongly skewed toward triple-negative disease.' },

    { id: 'brca2', label: 'BRCA2 germline variant', category: 'Germline', modifiable: false,
      source: { ref: 'kuchenbaecker-brca', quote: 'The cumulative breast cancer risk to age 80 years was 72%  ' +
                           '(95% CI, 65%-79%) for BRCA1 and 69% (95% CI, 61%-77%) for BRCA2 carriers' },
      direction: 'increases', absoluteLifetime: [69, 69], magnitude: '69% by age 80', evidence: 'strong',
      scope: 'overall', affects: ['hr-pos-her2-neg'],
      note: 'Women carrying the variant, followed forward in time: cumulative risk to age 80, 95% CI 61–77%. ' +
            'Skews hormone-receptor positive, unlike BRCA1. See the male stratum separately — ' +
            'the same variant carries a very different absolute risk in men.' },

    { id: 'brca2-male', label: 'BRCA2 germline variant (men)', category: 'Germline', modifiable: false,
      source: 'tai-male-brca',
      direction: 'increases', magnitude: 'not quantified here', evidence: 'strong',
      scope: 'overall', stratum: 'US men', affects: ['male-bc'],
      note: 'Listed apart from the female factor on purpose: the risk in men and the risk in women ' +
            'are two facts, not one range.' },

    { id: 'palb2', label: 'PALB2 germline variant', category: 'Germline', modifiable: false,
      source: { ref: 'yang-palb2', quote: 'the estimated risks to age 80 years were 53% (95% CI, 44% to 63%)  ' +
                           'for female breast cancer' },
      direction: 'increases', absoluteLifetime: [53, 53], magnitude: '53% by age 80', evidence: 'strong',
      scope: 'overall', affects: ['tnbc'],
      note: 'Female breast cancer, cumulative risk to age 80, 95% CI 44–63%. The main ' +
            'moderate-penetrance gene now in routine panels.' },

    { id: 'cdh1-germline', label: 'CDH1 germline variant', category: 'Germline', modifiable: false,
      source: { ref: 'hansford-cdh1', quote: 'By the age of 80 years ... the risk of breast cancer for females  ' +
                           'was 42% (95% CI, 23%-68%)' },
      direction: 'increases', absoluteLifetime: [42, 42], magnitude: '42% by age 80', evidence: 'strong',
      scope: 'overall', affects: ['ilc'],
      note: 'Women carrying the variant, cumulative risk to age 80. The 95% CI runs from 23% to 68%, so ' +
            'this figure is far less certain than the BRCA1 and BRCA2 ones. ' +
            'Hereditary diffuse gastric cancer syndrome. Carriers also face high gastric cancer ' +
            'risk — the finding changes management well beyond the breast.' },

    { id: 'tp53-germline', label: 'TP53 germline variant (Li-Fraumeni)', category: 'Germline', modifiable: false,
      source: 'tcga-2012',
      direction: 'increases', magnitude: 'very high', evidence: 'strong',
      scope: 'overall', affects: ['her2-pos-hr-neg', 'her2-enriched'],
      note: 'No single clean lifetime figure is quoted here because published estimates vary widely ' +
            'by ascertainment. Li-Fraumeni breast cancers are enriched for HER2 positivity.' },

    { id: 'klinefelter', label: 'Klinefelter syndrome (47,XXY)', category: 'Germline', modifiable: false,
      source: { ref: 'swerdlow-klinefelter', quote: 'The largest study found 19.2- and 57.8-fold increases in  ' +
                           'incidence and mortality, respectively' },
      direction: 'increases', rr: [19.2, 19.2], magnitude: '19.2-fold incidence', evidence: 'strong',
      referent: 'population', scope: 'overall', stratum: 'US men', affects: ['male-bc'],
      note: 'The largest study, as this review reports it. Its 57.8-fold figure is for mortality, a ' +
            'different outcome, and is not used. Converted against men generally: the syndrome is rare ' +
            'enough that men without it and all men have almost the same risk. An altered ' +
            'androgen-to-estrogen ratio is one of the explanations offered. A large multiplier on a very ' +
            'small baseline.' },

    /* ---- Hormonal ---- */
    { id: 'mht-combined', label: 'Combined menopausal hormone therapy', category: 'Hormonal', modifiable: true,
      source: [{ ref: 'cgh-mht', quote: 'Among current users, these excess risks were definite even during years  ' +
                           '1-4 (oestrogen-progestagen RR 1.60, 95% CI 1.52-1.69; oestrogen-only RR 1.17,  ' +
                           '1.10-1.26), and were twice as great during years 5-14 (oestrogen-progestagen  ' +
                           'RR 2.08, 2.02-2.15; oestrogen-only RR 1.33, 1.28-1.37)' },
               { ref: 'cgh-mht', quote: '5 years of MHT, starting at age 50 years, would increase breast cancer  ' +
                           'incidence at ages 50-69 years by about one in every 50 users of oestrogen plus  ' +
                           'daily progestagen preparations' }],
      direction: 'increases', magnitude: 'RR 1.60 (years 1–4) to 2.08 (years 5–14) of current use', evidence: 'strong',
      scope: 'overall', affects: ['hr-pos-her2-neg', 'ilc'],
      note: 'Estrogen plus progestagen, current users against never users; estrogen-only HT carries a ' +
            'weaker association (RR 1.17 to 1.33). The ratio holds while HT is being taken, not over a ' +
            'lifetime, so it is not converted against the lifetime baseline. The paper gives its own ' +
            'absolute figure: 5 years of use from age 50 adds about one breast cancer by age 69 for every ' +
            '50 users of estrogen plus daily progestagen. Risk declines after stopping.' },

    { id: 'menarche-menopause', label: 'Early menarche / late menopause', category: 'Hormonal', modifiable: false,
      source: { ref: 'cgh-menarche', quote: 'Breast cancer risk increased by a factor of 1·050 (95% CI 1·044–1·057; p<0·0001) ' +
                           'for every year younger at menarche, and independently by a smaller amount (1·029, 1·025–1·032; ' +
                           'p<0·0001), for every year older at menopause' },
      direction: 'increases', magnitude: 'small per year', evidence: 'strong',
      scope: 'overall', affects: ['hr-pos-her2-neg', 'luminal-a'],
      note: 'Both extend lifetime estrogen exposure. Small per year, but they act over decades.' },

    { id: 'pregnancy-early', label: 'Early full-term pregnancy', category: 'Hormonal', modifiable: false,
      source: [{ ref: 'palmer-tnbc-repro', quote: 'Among parous women, older age at first completed pregnancy was not ' +
                                                  'associated with any ER/PR/HER2-defined specific subtypes, except for ' +
                                                  'the luminal A-like subtype (P trend = 0.05)' },
               { ref: 'palmer-tnbc-repro', quote: 'TNBC risk decreased with increasing duration of breastfeeding ' +
                                                  '(P trend = 0.006), but age at menarche, age at first completed ' +
                                                  'pregnancy, and nulliparity were not associated with risk of TNBC' }],
      direction: 'decreases', magnitude: 'not quantified here', evidence: 'strong',
      scope: 'overall', affects: ['hr-pos-her2-neg'],
      note: 'Marked unmodifiable deliberately: it is a life circumstance, not a health intervention, ' +
            'and presenting it as a prevention lever would be wrong. Protective for HR-positive, HER2-negative ' +
            'disease only — the effect does not hold for TNBC.' },

    { id: 'breastfeeding', label: 'Breastfeeding', category: 'Hormonal', modifiable: true,
      source: [{ ref: 'cgh-breastfeeding', quote: 'The relative risk of breast cancer decreased by 4.3% (95% CI ' +
                                                  '2.9-5.8; p<0.0001) for every 12 months of breastfeeding' },
               { ref: 'palmer-tnbc-repro', quote: 'Parous women who breastfed for at least one year had a 31% lower ' +
                                                  'risk of TNBC than parous women who had never breastfed (odds ' +
                                                  'ratio, OR = 0.69' },
               { ref: 'palmer-tnbc-repro', quote: 'Parous African-American women aged 20-44 years who breastfed for ' +
                                                  '6 months or longer had an 82% lower risk of TNBC than their ' +
                                                  'counterparts who had never breastfed (OR = 0.18' }],
      direction: 'decreases', rr: [0.96, 0.96], per: '12 months', magnitude: '~4% per 12 months', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', affects: ['tnbc', 'basal-like'],
      note: 'The overall figure is a 4.3% fall in relative risk for every 12 months, rounded. The ' +
            'strongest modifiable protector against triple-negative disease specifically, where the ' +
            'effect is far larger than the overall figure: OR 0.69 at ≥12 months among parous women, ' +
            'and OR 0.18 at ≥6 months in one pooled subgroup of parous Black women aged 20–44.' },

    { id: 'parity-no-breastfeeding', label: 'High parity without breastfeeding', category: 'Hormonal', modifiable: true,
      source: 'palmer-tnbc-repro',
      direction: 'increases', magnitude: 'modest', evidence: 'moderate',
      scope: 'tnbc', affects: ['tnbc'],
      note: 'The parity paradox — multiple births lower HR-positive risk but raise TNBC risk when ' +
            'not offset by lactation. Scoped to TNBC; the overall direction is the opposite.' },

    { id: 'gynecomastia', label: 'Gynecomastia / elevated estrogen states', category: 'Hormonal', modifiable: true,
      source: 'seer-breast',
      direction: 'increases', magnitude: 'variable', evidence: 'moderate',
      scope: 'overall', stratum: 'US men', affects: ['male-bc'],
      note: 'Includes cirrhosis and obesity.' },

    /* ---- Lifestyle — only three of twenty-one factors, and that is the honest ratio ---- */
    { id: 'alcohol', label: 'Alcohol', category: 'Lifestyle', modifiable: true,
      source: { ref: 'cgh-alcohol', quote: 'The relative risk of breast cancer increased by 7.1% (95% CI 5.5-8.7%;  ' +
                           'p<0.00001) for each additional 10 g per day intake of alcohol, i.e. for each  ' +
                           'extra unit or drink of alcohol consumed on a daily basis' },
      direction: 'increases', rr: [1.071, 1.071], per: '10 g/day', magnitude: '7.1% per 10 g/day',
      evidence: 'strong', referent: 'unexposed',
      scope: 'overall', affects: ['ihc-root', 'hr-pos-her2-neg', 'ilc'],
      note: 'The paper counts 10 g of alcohol a day as one drink a day. ' +
            'Dose-dependent with no clear safe threshold; strongest for HR-positive disease. ' +
            'The per-drink framing matters — the risk is counted per drink a day, every day.' },

    { id: 'obesity-postmeno', label: 'Obesity after menopause', category: 'Lifestyle', modifiable: true,
      source: 'wcrf-cup',
      direction: 'increases', rr: [1.2, 1.5], magnitude: 'RR ~1.2–1.5', evidence: 'strong', referent: 'unexposed',
      scope: 'overall', affects: ['hr-pos-her2-neg', 'luminal-a', 'luminal-b', 'inflammatory'],
      note: 'Adipose aromatase becomes the main estrogen source once ovarian output stops. ' +
            'Before menopause the association reverses — this is not a lifelong constant.' },

    { id: 'physical-activity', label: 'Physical activity', category: 'Lifestyle', modifiable: true,
      source: 'wcrf-cup',
      direction: 'decreases', rr: [0.8, 0.9], magnitude: 'RR ~0.8–0.9', evidence: 'moderate', referent: 'unexposed',
      scope: 'overall', affects: ['ihc-root'],
      note: 'Partly independent of its effect on body weight.' },

    /* ---- Environmental ---- */
    { id: 'chest-radiation', label: 'Therapeutic chest radiation at age 30 or younger', category: 'Environmental', modifiable: false,
      source: { ref: 'travis-rt', quote: 'cohort of 3817 female 1-year survivors of HD diagnosed at age 30 years or ' +
                                        'younger … A radiation dose of 4 Gy or more delivered to the breast was ' +
                                        'associated with a 3.2-fold … Risk increased to 8-fold (95% CI, 2.6-26.4) ' +
                                        'with a dose of more than 40 Gy' },
      direction: 'increases', rr: [8, 8], magnitude: 'RR up to 8 (>40 Gy to the breast)', evidence: 'strong',
      referent: 'other', scope: 'overall', affects: ['ihc-root', 'male-bc'],
      note: 'Classically after Hodgkin lymphoma treatment. The plotted value is the upper bound, ' +
            'not a central estimate: 3.2× at 4 Gy or more, rising to 8× above 40 Gy. The comparison ' +
            'group is Hodgkin survivors given lower doses, not women generally, so it is not ' +
            'converted against the population baseline. Drives early supplemental screening.' }
  ],

  /* Book I, layer 3 — the layer that keeps the framing truthful.

     Of the 21 factors above, three are lifestyle levers. The rest are age, sex, ancestry,
     germline variants and reproductive history — largely fixed. A page built only on
     factors[] would therefore imply people control more of this than they do. What most
     people actually control is when it gets found, and stageOutcomes is the number that
     shows it: the gap between localised and distant detection is larger than the gap
     between any two subtypes, and far larger than any modifiable risk factor. */
  detection: {
    note: 'Stage at diagnosis dominates subtype in predicting outcome. Nothing else in this ' +
          'dataset moves survival as far as the localised-to-distant gap below.',

    /* Transcribed from the SEER whole-disease page, and checked against it on
       every `run.py audit` — these are not judgement, so when the page moves
       they are simply wrong. Last synced 2026-07-27. */
    relativeSurvivalNote: 'Relative survival compares people who have the diagnosis with people ' +
      'of the same age and sex who do not. 100% means five-year survival is no different from ' +
      'the general population — it does not mean nobody dies of it, and a figure can even exceed ' +
      '100%. Every survival number on this page is relative, not absolute.',

    /* The window these numbers are measured over, said before them rather than
       after. Five years separates breast's stages cleanly — 100.0 / 87.5 / 33.8
       is not an ambiguous table — but it is still the wrong window for the
       largest subtype on this site, and the reader has no way to know that from
       the figures alone. */
    horizonNote: 'Every figure below is five-year survival, which is the standard reporting window ' +
      'and is long enough to separate these stages. It is not long enough to describe this ' +
      'disease. Hormone-receptor-positive breast cancer — 70% of cases here — keeps recurring past ' +
      'ten years and past twenty, so a five-year figure flatters it. Triple-negative disease ' +
      'relapses early or not at all, so the same five years covers most of what will happen to it. ' +
      'The two are not comparable on this axis even though they are printed on it together.',

    stageOutcomes: [
      { stage: 'Localised', share: 64, fiveYear: 100.0,
        note: 'Confined to the breast. Most screen-detected cancers land here. See the note ' +
              'above on what a relative survival of 100% does and does not mean.',
        source: 'seer-breast' },
      { stage: 'Regional', share: 27, fiveYear: 87.5,
        note: 'Spread to nearby lymph nodes.' },
      { stage: 'Distant', share: 6, fiveYear: 33.8,
        note: 'Metastatic at diagnosis. The share is small, but it carries most of the mortality.' },
      { stage: 'Unstaged', share: 2, fiveYear: 70.6,
        note: 'Incomplete staging information in the registry record.' }
    ],

    /* Benefit and cost on one denominator, because the two are almost never
       printed together and that is exactly why most people cannot state what
       the test they were advised to take costs them. Figures are the USPSTF's
       own CISNET modelling for its 2024 grade B recommendation. */
    tradeoff: {
      note: 'Screening is a trade, not a free good. These are the numbers the USPSTF used to ' +
            'decide the trade was worth making — all of them, in one place.',
      basis: 'per 1,000 women screened every two years from age 40 to 74, counted over a lifetime',
      rows: [
        { kind: 'benefit', value: '8.2', label: 'breast cancer deaths averted',
          note: 'Median across the six CISNET models. The models disagree, and this is the middle of them.' },
        { kind: 'harm', value: '1,376', label: 'false-positive results',
          note: 'A screen that leads to more imaging or a biopsy and turns out to be nothing. ' +
                'Roughly 1 in 3 women screened this way will have at least one.' },
        { kind: 'harm', value: '14', label: 'cancers overdiagnosed',
          note: 'Found and treated, but would never have caused harm in that lifetime. Nobody can ' +
                'tell which 14. The model range is 4 to 37 — the widest uncertainty on this page.' }
      ],
      effect: {
        measure: 'RR', point: 0.85, ci: [0.73, 0.98],
        of: 'breast cancer mortality in women aged 40–74 invited to screening',
        followUp: 'pooled randomised trials, 11–20 years depending on the trial',
        note: 'A 15% relative reduction. Note what it is relative to: the risk of dying of breast ' +
              'cancer, not of dying. The benefit is real and it is smaller than most people assume.'
      },
      disagreement: 'The Cochrane review reads the same trials and reaches a different place. ' +
        'Across all seven it finds RR 0.81 (0.74–0.87); across only the three with adequate ' +
        'randomisation, 0.90 (0.79–1.02) — no longer statistically significant. It also finds no ' +
        'effect on all-cause mortality at 13 years (RR 0.99, 0.95–1.03), and argues that breast ' +
        'cancer mortality is itself biased toward screening because cause of death is ' +
        'misclassified differently in the two arms. The UK (Marmot) review, reading much the same ' +
        'evidence, settled on a 20% reduction. This site shows the disagreement rather than ' +
        'picking a winner, because which number you believe depends on which trials you count.',
      sources: [
        { label: 'USPSTF Breast Cancer Screening (2024, grade B) — CISNET modelled benefits and harms',
          url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening' },
        { label: 'Cochrane — Screening for breast cancer with mammography (Gøtzsche & Jørgensen)',
          url: 'https://www.cochrane.org/evidence/CD001877_screening-breast-cancer-mammography' }
      ]
    },

    modalities: [
      { name: 'Mammography', role: 'Population screening',
        catches: 'Most invasive cancers and the great majority of DCIS, often before anything is palpable.',
        misses: 'Roughly 1 in 5 cancers overall, and substantially more in dense breasts.',
        harms: 'Over biennial screening from 40 to 74: about 1,376 false positives and 14 ' +
                'overdiagnosed cancers per 1,000 women — treated, and never going to have caused harm.',
        sensitivity: 'falls in extremely dense breasts',
        interval: 'Guidelines differ — biennial from 40 or 50, annual in some. Discuss with a clinician.',
        note: 'The only modality with randomised evidence of a mortality reduction in average-risk women.',
        harmsSource: 'uspstf-screening',
        missesSource: 'uspstf-screening',
        sensitivitySource: 'boyd-density',
        intervalSource: 'uspstf-screening' },

      { name: 'Digital breast tomosynthesis (3D)', role: 'Population screening',
        catches: 'Slightly more invasive cancer than 2D mammography, with fewer false-positive recalls.',
        misses: 'Same dense-breast limitation as 2D, though somewhat reduced.',
        harms: 'Fewer false-positive recalls than 2D, but it inherits the same overdiagnosis ' +
               'question — finding more cancer only helps if the extra cancers were going to matter.',
        note: 'Now the default in many centres; the incremental benefit over 2D is real but modest.',
        harmsSource: 'dbt-bcsc',
        catchesSource: 'dbt-bcsc',
        missesSource: 'dbt-bcsc' },

      { name: 'Breast MRI', role: 'Supplemental — high risk only',
        catches: 'Highest sensitivity of any modality, and largely unaffected by breast density.',
        misses: 'Few cancers, but generates more false positives and biopsies.',
        harms: 'The highest false-positive rate of any modality here, and the biopsies that follow ' +
               'from it. That cost is why it is reserved for high risk rather than offered to everyone.',
        note: 'The American Cancer Society\'s 2007 guideline recommends it for women with an approximately ' +
              '20–25% or greater lifetime risk, including a strong family history of breast or ovarian ' +
              'cancer and women treated for Hodgkin disease.',
        noteSource: { ref: 'saslow-2007', quote: 'Screening MRI is recommended for women with an approximately 20-25% ' +
                                                 'or greater lifetime risk of breast cancer, including women with a ' +
                                                 'strong family history of breast or ovarian cancer and women who ' +
                                                 'were treated for Hodgkin disease.' } },

      { name: 'Supplemental ultrasound', role: 'Supplemental — dense breasts',
        catches: 'A small number of additional cancers mammography missed in dense tissue.',
        misses: 'Poor at detecting DCIS, which mammography finds via microcalcifications.',
        harms: 'Raises detection and false positives together, with no demonstrated mortality ' +
               'benefit — so the extra biopsies are a certain cost against an unproven gain.',
        note: 'Raises detection and false positives together; no mortality benefit has been demonstrated.' },

      { name: 'Breast self-examination', role: 'Awareness, not screening',
        catches: 'Palpable changes — typically larger and later than screen-detected disease.',
        misses: 'Everything below the size threshold of touch.',
        harms: 'In the Shanghai trial (266,064 women) the taught group had more than twice as many ' +
               'benign lesions found — 1,457 against 623 — and no fewer breast cancer deaths.',
        note: 'Formal self-examination programmes have not shown a mortality reduction in randomised ' +
              'trials. Included here because it is widely promoted as if they had. Knowing what is ' +
              'normal for you and reporting a change promptly is still worth doing — it is just not screening.',
        harmsSource: { ref: 'shanghai-bse', quote: '266,064 women associated with 519 factories in Shanghai were ' +
                                                   'randomly assigned … There were 135 (0.10%) breast cancer deaths in ' +
                                                   'the instruction group and 131 (0.10%) in the control group. … more ' +
                                                   'benign breast lesions were diagnosed in the instruction group than ' +
                                                   'in the control group' } }
    ],

    signs: [
      'A new lump or thickening in the breast or armpit',
      'Skin dimpling, puckering, or an orange-peel texture',
      'Nipple retraction, or discharge that is bloody or spontaneous',
      'Persistent redness, warmth or swelling of the breast (inflammatory carcinoma — see the histology axis)',
      'A scaly or eczema-like change of the nipple (Paget disease)'
    ],

    sources: [
      { label: 'SEER Cancer Stat Facts: Female Breast Cancer — stage distribution and survival',
        url: 'https://seer.cancer.gov/statfacts/html/breast.html' },
      { label: 'USPSTF Breast Cancer Screening recommendation',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening' }
    ]
  },

  /* Book IV, curated layer — clinical context the pipeline cannot compute.
     The generated overlay (data/breast.targets.js) supplies protein length,
     domains, hotspot positions, structures, agents and evidence counts; those
     are all numbers with a provenance. What follows is judgement, and it lives
     here for the same reason node summaries do.

     Partial by design: 10 of 22 targets carry an entry. A target with none
     falls back to the one-line rationale in the overlay, and nothing breaks. */
  targets: [
    { gene: 'ESR1',
      summary: 'The receptor the whole HR-positive disease is named after, and the reason endocrine ' +
               'therapy exists. Selection is by IHC, not by sequencing.',
      caveat: 'Almost absent from the mutation track above, and that is the cohort, not the biology. ' +
              'Y537S and D538G emerge under aromatase-inhibitor pressure in metastatic disease and are ' +
              'exactly what elacestrant, imlunestrant and camizestrant were built for. A primary-tumour ' +
              'cohort like TCGA is blind to them by construction. The disease-state axis sets the ' +
              'two side by side: ESR1 is mutated in 0.4% of primary tumours and 13.0% of metastatic ' +
              'biopsies.',
      caveatSource: ['tcga-2012', 'razavi-2018'],
      watch: 'ctDNA ESR1 monitoring (SERENA-6) is the first attempt to act on a resistance mutation ' +
             'before it shows up as progression on a scan.',
      watchSource: { nct: 'NCT04964934', label: 'SERENA-6' } },

    { gene: 'ERBB2',
      summary: 'The template for everything targeted in this disease: amplified, over-expressed, and ' +
               'attackable by antibodies, TKIs and antibody-drug conjugates at once — 15 tracked agents, ' +
               'more than any other target here.',
      caveat: 'HER2 is now a continuum rather than a switch. T-DXd works at expression levels that were ' +
              'called negative for twenty years, which means the IHC 0 vs 1+ call now gates access to an ' +
              'effective drug at exactly the boundary pathologists agree least about.',
      source: 'agent-pipeline',
      caveatSource: [{ ref: 'asco-cap-her2', quote: 'best practices to distinguish IHC 0 from 1+ are now clinically ' +
                                                    'relevant' },
                     { nct: 'NCT03734029', label: 'DESTINY-Breast04' }] },

    { gene: 'PIK3CA',
      summary: 'The most mutated oncogene in breast cancer, and unusually clean: two hotspot clusters, ' +
              'both activating, both in domains you can see on the track.',
      caveat: 'H1047R sits in the kinase domain and E545K in the helical domain, and they are not ' +
              'interchangeable — they activate the enzyme by different mechanisms and differ in their ' +
              'dependence on RAS binding. Reporting them as one "PIK3CA-mutant" bucket is a simplification ' +
              'that trial design has started to unpick.',
      watch: 'Alpelisib toxicity (hyperglycaemia, rash) limits real-world duration more than resistance does.' },

    { gene: 'TP53',
      summary: 'The most altered gene in the disease — 82.8% of basal-like tumours — and the largest ' +
               'open target in this dataset. Nothing in the tracked pipeline is aimed at it.',
      caveat: 'The reason is structural, not neglect. The hotspots cluster in the DNA-binding domain ' +
              'and split into two kinds: contact mutants (R248, R273) that lose grip on DNA, and ' +
              'conformational mutants (R175, Y220) that unfold the domain. Restoring a lost function is ' +
              'a harder pharmacological problem than blocking a gained one, and small molecules have ' +
              'no obvious pocket to bind.',
      watch: 'Y220C is the exception — it opens a small druggable crevice, and reactivator programmes ' +
             'exist in other tumour types. None appears in this breast pipeline.',
      source: 'tcga-2012' },

    { gene: 'MYC',
      summary: 'Amplified in roughly a third of basal-like tumours and, like TP53, untouched by the pipeline.',
      caveat: 'A transcription factor whose business end is a coiled-coil interface with MAX, not a ' +
              'cleft. The structure shown is the Myc-Max heterodimer on DNA — look at it and the ' +
              'difficulty is obvious: there is nothing to put a small molecule into.' },

    { gene: 'PARP1',
      summary: 'The clearest example in the dataset of a target that is not the altered gene. ' +
               'Olaparib and talazoparib inhibit PARP1, which is unremarkable in these tumours.',
      caveat: 'The lesion is in BRCA1 or BRCA2. Inhibiting PARP1 is lethal only because homologous ' +
              'recombination is already gone — so the biomarker and the target are different proteins. ' +
              'Reading the PARP1 track looking for the reason the drug works will not find it.',
      /* Both breast labels are written for germline BRCA variants only (read
         2026-09-15). No share: none was sourced, and the BRCA mutation rates on
         this site's cards are tumour figures. */
      germline: [{
        test: 'germline BRCA1 or BRCA2, deleterious or suspected deleterious',
        agents: 'olaparib and talazoparib, in HER2-negative disease',
        nodes: ['hr-pos-her2-neg', 'tnbc'],
        source: ['label-olaparib', 'label-talazoparib']
      }] },

    { gene: 'BRCA1',
      summary: 'A germline lesion that is simultaneously the strongest inherited risk factor in the ' +
               'risk lens and the selector for PARP inhibition here.',
      caveat: 'Shown as "reached only through a partner" because no agent targets BRCA1 itself. ' +
              'Reversion mutations that restore the reading frame are the dominant acquired resistance ' +
              'mechanism, and they are invisible to a primary-tumour cohort.' },

    { gene: 'CDK4',
      summary: 'Rarely mutated, heavily drugged — six tracked agents. The dependency comes from ' +
               'cyclin D over-activity upstream, not from anything wrong with CDK4.',
      caveat: 'RB1 loss predicts resistance to this whole class, which is why RB1 appears in the ' +
              'untargeted list as a negative biomarker rather than as a target.' },

    { gene: 'TACSTD2',
      summary: 'TROP2 is a delivery address, not a driver. Sacituzumab govitecan and its successors ' +
               'bind it to get a topoisomerase payload inside the cell.',
      caveat: 'Never appears as a genomic alteration, so it sits off the landscape chart entirely. ' +
              'A view that ranked targets by mutation rate would conclude nobody should drug TROP2, ' +
              'which is the reverse of what eight active programmes say.' },

    { gene: 'FGFR1',
      summary: 'Amplified in around 18% of luminal B tumours, with FGFR inhibitors approved in other ' +
               'cancers — and no agent in this breast pipeline.',
      caveat: 'One of the more answerable questions in the gap list, though amplification has been a ' +
              'far less reliable predictor of FGFR-inhibitor benefit than fusion or mutation has in ' +
              'the tumour types where the class did work.',
      source: 'tcga-2012' }
  ],

  markers: [
    { id: 'ER',   label: 'Estrogen receptor',    assay: 'IHC', positiveThreshold: '≥1% nuclear staining (ASCO/CAP)' },
    { id: 'PR',   label: 'Progesterone receptor', assay: 'IHC', positiveThreshold: '≥1% nuclear staining (ASCO/CAP)' },
    { id: 'HER2', label: 'HER2 / ERBB2',          assay: 'IHC + ISH', positiveThreshold: 'IHC 3+, or IHC 2+ with ISH amplification' }
  ],

  /* ---- glossary -----------------------------------------------------
     The words this cancer owns, plus the examples that make the engine's
     neutral definitions concrete.

     Two shapes, both documented in js/glossary.js. An entry carrying its own
     `d` REPLACES the engine term — those are the words that mean something
     specific to breast, and a prostate reader must never be handed them. An
     entry with only a `w` keeps the engine's definition and restores the
     breast example; that is most of this block, because "ADC" means the same
     thing in every cancer while the agents it points at do not.

     Everything here was in js/glossary.js until a second dataset made the
     distinction load-bearing.
  -------------------------------------------------------------------- */
  glossary: {

    groups: [
      { id: 'classification', label: 'How breast cancer is sorted' }
    ],

    terms: [

      /* ================= words breast owns ================= */

      { t: 'receptor status', g: 'classification', alias: ['ER', 'PR', 'HR'],
        d: 'Whether the tumour carries the receptors for estrogen (ER) and progesterone (PR) — ' +
           'the docking points hormones use to tell the cell to grow. "Hormone receptor positive" ' +
           '(HR+) means at least one is present, and that the tumour can be starved of hormones.',
        w: 'The default classification on this site, and the one that decides first treatment.' },

      { t: 'HER2', g: 'classification', alias: ['ERBB2', 'neu'],
        d: 'A protein on the cell surface that pushes growth. Some tumours carry far too many ' +
           'copies of it, which used to be very bad news and is now one of the most treatable ' +
           'findings in the disease.',
        w: 'One of the three stains, and the target of more agents here than anything else.' },

      { t: 'HER2-low', g: 'classification',
        d: 'A middling amount of HER2 — not enough to be called positive by the old rules, but ' +
           'enough for newer antibody-drug conjugates to work.',
        w: 'It cuts across hormone receptor status rather than sitting under it, which is why it ' +
           'is its own classification here rather than a fifth box.' },

      { t: 'triple negative', g: 'classification', alias: ['TNBC'],
        d: 'None of the three switches — no ER, no PR, no HER2. Defined entirely by what is ' +
           'absent, which is the problem: it is a bag of several different diseases with nothing ' +
           'in common except that three tests were negative.',
        w: 'About 11% of cases, and the group with the fewest targeted options.' },

      { t: 'PAM50', g: 'classification', alias: ['intrinsic subtype'],
        d: 'A classification based on which genes the tumour is actively using, rather than on ' +
           'three stains. It sorts tumours into luminal A, luminal B, HER2-enriched, basal-like ' +
           'and normal-like.',
        w: 'It disagrees with the stain-based classification on purpose — only 83% of basal-like ' +
           'tumours are triple negative. The Evidence lens shows the full disagreement.' },

      { t: 'duct', g: 'classification', full: 'Ducts and lobules', alias: ['lobule', 'ductal', 'lobular'],
        d: 'The plumbing of the breast. Lobules are the small glands that make milk; ducts are ' +
           'the tubes that carry it. Breast cancer almost always starts in the lining of one or ' +
           'the other, and which one it started in is part of its name.',
        w: 'It is the whole basis of the histology classification — ductal versus lobular. ' +
           'Lobular spreads in single-file lines rather than a lump, which is why it is harder ' +
           'to see on a mammogram.' },

      { t: 'in situ', g: 'classification', alias: ['DCIS', 'LCIS', 'stage 0'],
        d: 'Abnormal cells that have not broken out of the duct or lobule they started in. Not ' +
           'yet invasive; some would never become so, and we cannot reliably tell which.',
        w: 'DCIS incidence rose sharply once screening began — that is detection, not a rise in ' +
           'disease, and it is why over-diagnosis is a real argument in screening.' },

      { t: 'grade', g: 'classification',
        d: 'How abnormal the cells look, from 1 to 3. Grade 3 cells look least like normal breast ' +
           'tissue and tend to grow faster. It is about appearance.',
        w: 'Routinely confused with stage. Grade is how the cells look; stage is how far they ' +
           'have spread. Stage matters far more for outlook.' },

      { t: 'classification axis', g: 'classification', alias: ['axis', 'classify by'],
        d: 'One complete way of sorting every tumour into groups, where the groups do not ' +
           'overlap and together account for all of them. Four sort the tumour and are in ' +
           'routine use for breast cancer; a fifth here sorts the course of the disease. They ' +
           'answer different questions.',
        w: 'The "Classify by" picker chooses which one the Subtypes lens draws. Risk factors and ' +
           'drugs are deliberately NOT axes — a tumour can have many of either, so they sort ' +
           'nothing.' },

      { t: 'SERD', g: 'drugs', full: 'Selective estrogen receptor degrader',
        d: 'A drug that makes the estrogen receptor break down, rather than merely blocking it. ' +
           'The oral ones are recent; fulvestrant, the older injectable, works the same way.',
        w: 'Elacestrant, imlunestrant and camizestrant are oral SERDs, aimed at the resistance ' +
           'that emerges after standard endocrine therapy.' },

      { t: 'endocrine therapy', g: 'drugs', alias: ['hormone therapy', 'anti-estrogen'],
        d: 'Treatment that removes the tumour\'s estrogen supply or blocks its ability to use ' +
           'it — usually a daily pill taken for five to ten years. It only works if the tumour ' +
           'has the estrogen receptor.',
        w: 'This is what "ER-positive is good news" actually means: it is the switch that makes ' +
           'this option exist. It is why the ER stain is worth doing on every tumour.' },

      { t: 'Ki-67', g: 'molecular', full: 'Ki-67 proliferation index',
        d: 'A stain that shows what percentage of the tumour cells are in the act of dividing. ' +
           'A high number means a fast-growing tumour — which is worse news, and also means ' +
           'chemotherapy has more to hit.',
        w: 'It is what separates luminal A from luminal B, two subtypes that look identical on ' +
           'the three main stains. There is no agreed cut-off, which is a real weakness of that ' +
           'boundary.' },

      { t: 'dense breast', g: 'detection',
        d: 'Breast tissue with more glandular and fibrous tissue than fat. It shows up white on a ' +
           'mammogram — and so do tumours, so they are harder to see.',
        w: 'Does double duty here: a genuine risk factor AND a reason the test works less well.' },

      /* `prevalence` is deliberately NOT overridden. The engine definition is
         complete without an example, and the example it used to carry —
         "HR-positive / HER2-negative is 70% of cases" — is now generated onto
         the Subtypes card from the data, so it cannot drift out of step with
         the treemap the way a typed number would. */

      { t: 'stage', g: 'numbers',
        d: 'How far the cancer has spread, from 0 to IV. Localised means confined to the breast; ' +
           'distant means it has reached other organs.',
        /* Transcribed from detection.stageOutcomes, not from the older SEER release the
           engine copy used to quote — 99.6% and 31.9% were both a period out of date. */
        w: 'The single largest effect on this site. Localised five-year relative survival is ' +
           '100.0%; distant is 33.8% — a bigger gap than between any two subtypes.' },

      { t: 'lifetime risk', g: 'numbers',
        d: 'The chance of being diagnosed at some point across a whole life. About 13%, or 1 in ' +
           '8, for women in the US. It is averaged over an entire lifetime and an entire ' +
           'population — it is not your risk this year, and it is not one person\'s risk.',
        w: 'The anchor every relative risk on this site is converted against.' },

      { t: 'sensitivity', g: 'detection',
        d: 'How good a test is at finding what is there. Mammography is about 85% sensitive ' +
           'overall — meaning roughly 1 in 7 cancers present at the time is missed.',
        w: 'It falls to 50-70% in dense breasts, which is why density is both a risk factor and ' +
           'a detection problem.' },

      /* ============ engine definitions, breast examples ============
         No `d` on any of these: the definition is the engine's and stays
         shared, only the "why it appears here" line is ours. */

      { t: 'ADC',
        w: 'The modality of 13 agents here, including Enhertu and Trodelvy. It is why TROP2 ' +
           'matters as a target even though it is never mutated: it is an address, not a driver.' },

      { t: 'mAb',
        w: 'Trastuzumab and pertuzumab are monoclonal antibodies against HER2.' },

      { t: 'small molecule',
        w: 'The most common modality here — palbociclib, alpelisib, olaparib are all pills.' },

      { t: 'TKI',
        w: 'Tucatinib, neratinib and lapatinib work this way against HER2.' },

      { t: 'degrader',
        w: 'Vepdegestrant destroys the estrogen receptor rather than blocking it — a newer ' +
           'approach to the same target endocrine therapy has used for decades.' },

      { t: 'bispecific',
        w: 'Zanidatamab grabs two separate spots on HER2 at the same time.' },

      { t: 'immunotherapy',
        w: 'Pembrolizumab and atezolizumab. This is why PD-1 and PD-L1 appear as targets even ' +
           'though PD-1 sits on the immune cell, not on the tumour.' },

      { t: 'phase 3',
        w: 'Ten agents here are at phase 3 — the closest tier to approval.' },

      { t: 'filed',
        w: 'Two agents here are filed. Filing is not approval.' },

      { t: 'approved',
        w: '31 agents here are approved. Approval is always for a specific situation, not for ' +
           'breast cancer in general — the "used at" line says which.' },

      { t: 'gene expression',
        w: 'The PAM50 classification is built from this, which is why it can disagree with the ' +
           'stain-based one: they are measuring two different things about the same tumour.' },

      { t: 'IHC',
        w: 'The whole ER / PR / HER2 classification comes from three of these stains. It is a ' +
           'human judgement about a colour, which is why borderline calls are genuinely difficult.' },

      { t: 'ISH',
        w: 'A HER2 stain scored 2+ is ambiguous, so ISH decides it by counting HER2 gene copies.' },

      { t: 'histology',
        w: 'One of the five classifications here. Lobular is the one with a real link to ' +
           'receptor status: it is almost always ER-positive.' },

      { t: 'carcinoma',
        w: 'It is the noun in almost every subtype name here — "invasive ductal carcinoma", ' +
           '"lobular carcinoma". The informative part of those names is always the adjective.' },

      { t: 'amplification',
        w: 'HER2-positive breast cancer is ERBB2 amplification. It is why some targets matter ' +
           'without any typo being involved.' },

      { t: 'oncogene',
        w: 'PIK3CA, ERBB2 and MYC are oncogenes. Two of the three are druggable.' },

      { t: 'tumour suppressor',
        w: 'TP53 is the most altered gene in breast cancer and has no drug against it. That is ' +
           'the reason.' },

      { t: 'germline',
        w: 'BRCA1 and BRCA2 are germline. Only about 5-10% of breast cancer is inherited this way.' },

      { t: 'pathway',
        w: 'PI3K/AKT/mTOR is the main escape route from endocrine therapy in HR-positive disease.' },

      { t: 'biomarker',
        w: 'ER, HER2 and PIK3CA mutation status are all biomarkers: each selects a therapy.' },

      { t: 'alteration frequency',
        w: 'Always quoted for the subtype where it is highest, not averaged across all breast ' +
           'cancer, because a gene broken in 80% of one subtype and never elsewhere is a real ' +
           'target — and averaging would hide it.' },

      { t: 'relative risk',
        w: 'Every risk factor here is shown both ways for exactly this reason: alcohol\'s ' +
           'relative risk becomes "about 13% becomes about 14%" in absolute terms.' },

      { t: 'modifiable',
        w: 'The Risk lens splits factors on this, and the honest result is uncomfortable: only 3 ' +
           'of 22 factors are modifiable lifestyle ones.' },

      { t: 'xenograft',
        w: '146 of the 595 papers in the Literature lens are mouse work, and each says so.' },

      { t: 'cohort',
        w: 'The genomic figures here come from 825 tumours in TCGA. Because that cohort is ' +
           'primary tumours, it cannot see ESR1 resistance mutations at all.' },

      { t: 'over-diagnosis',
        w: 'The real argument against screening more, and why DCIS incidence rising is not simply ' +
           'good news.' }
    ]
  },

  /* AR is shared with any hormone-driven cancer, so the engine's caption for
     this structure stays neutral and breast adds what AR means *here*. */
  pdbGloss: {
    '2AM9': 'The androgen receptor holding testosterone — the target in AR-positive triple-negative disease, ' +
            'the one TNBC subtype with a hormone switch to aim at.'
  },

  /* Each axis carries two registers of description, and both are load-bearing.

     `asks` / `measures` / `decides` are the plain-language triple. They are what
     the front page's classification cards and the Subtypes lens head are built
     from, so a reader meeting the word "axis" for the first time can tell these
     five apart without knowing any of them already. Keeping them in the axis
     record rather than in profile prose means the front page cannot fall out of
     step with the picker: add a fifth axis and a fifth card appears.

     `note` stays what it was — the caveat for someone who already understands
     the axis and needs to know what it is a proxy for. */
  axes: [
    { id: 'ihc', label: 'Receptor status (IHC)', shortLabel: 'Receptor (IHC)', default: true,
      asks: 'Which of three switches are on?',
      measures: 'Three stains on a slice of the tumour — ER, PR and HER2. A pathologist scores ' +
                'each as present or absent.',
      decides: 'The first treatment offered. This is the classification on nearly every ' +
               'pathology report, and the one most people mean by "what kind I have".',
      note: 'The working clinical classification — and a proxy for biology, not biology itself. ' +
            'Shares of cases on this axis are SEER 21 registry figures (2019–2023), not estimates.' },
    { id: 'pam50', label: 'Intrinsic subtype (PAM50)', shortLabel: 'PAM50',
      asks: 'Which genes is the tumour actually using?',
      measures: 'The activity of 50 genes, read together as a pattern. A laboratory test, not ' +
                'a look down a microscope.',
      decides: 'Little, directly — but it is the closest thing to what the tumour biologically ' +
               'is, and it is where the disagreement with the stains shows up.',
      note: 'It disagrees with the IHC axis on purpose, and by a measured amount: in the TCGA 2012 ' +
            'cohort 14% of triple-negative tumours were not basal-like, and 14 basal-like tumours ' +
            'were hormone-receptor positive.' },
    { id: 'histology', label: 'Histology', shortLabel: 'Histology',
      asks: 'What does it look like, and where did it start?',
      measures: 'The shape and arrangement of the cells under a microscope — which duct or ' +
                'lobule they came from and how they are growing.',
      decides: 'How it is likely to be found and how surgery is planned. Lobular spreads in ' +
               'single-file lines rather than a lump, so it hides on a mammogram.',
      note: 'Largely independent of receptor status, with one strong link: lobular carcinoma is ' +
            'CDH1-driven and almost always ER-positive.' },
    { id: 'her2exp', label: 'HER2 expression level', shortLabel: 'HER2 level',
      asks: 'How much HER2 is there, on a sliding scale?',
      measures: 'The same HER2 stain as the first axis, but read as an amount rather than a ' +
                'yes or no.',
      decides: 'Access to antibody-drug conjugates. It exists because a drug worked in ' +
               'patients the old yes/no rule called negative.',
      note: 'A therapy-selection axis, not a biological taxonomy: ASCO/CAP holds that HER2-low is ' +
            'not a distinct subtype — yet it now gates access to effective drugs.' },
    { id: 'state', label: 'Disease state', shortLabel: 'State',
      asks: 'Does it ever reach distant organs — and what has treatment done to it by then?',
      measures: 'Not the tumour on the day it is found. Scans and biopsies at diagnosis and in the ' +
                'years that follow — the course of the disease rather than its appearance.',
      decides: 'The aim of treatment. Early breast cancer is treated to cure it; metastatic breast ' +
               'cancer is treated to control it, and the drugs chosen then depend on what earlier ' +
               'treatment left behind — an ESR1 mutation is the clearest case.',
      note: 'Partitions by the FURTHEST state the disease ever reaches in each patient, so every case ' +
            'falls in one box and the boxes sum to the whole disease — the same rule as prostate\'s ' +
            'state axis. The 82/18 split is derived, and is a floor: the American Cancer Society puts ' +
            'the lifetime chance of dying of breast cancer at about 1 in 43 against about 1 in 8 ' +
            'diagnosed, so about 18% of diagnoses end in death from it, and essentially every such ' +
            'death passes through metastatic disease. Women whose disease becomes metastatic but who ' +
            'die of something else are not in that count. Only two nodes carry computed figures, from ' +
            'two different cohorts sequenced on two different assays.' }
  ],

  nodes: [

  /* ============================== AXIS 1 — RECEPTOR IHC ============================== */

  {
    id: 'ihc-root', axis: 'ihc', parent: null,
    label: 'All breast cancer', shortLabel: 'All breast cancer',
    prevalence: 100,
    summary: 'Three stains — ER, PR, HER2 — split breast cancer into four treatment groups. ER and PR are ' +
             'collapsed into "hormone receptor" (HR) status: HR-positive means ER-positive and/or PR-positive.',
    triggers: [
      { factor: 'Increasing age', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: 'strongest single factor',
        evidence: 'strong', note: 'Median age at diagnosis is early 60s; risk rises steeply after 40.' },
      { factor: 'Female sex', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: '~100:1',
        evidence: 'strong', note: 'Men account for roughly 1% of cases — see male breast cancer under the histology axis.' },
      { factor: 'Family history / germline predisposition', category: 'Germline',
        source: [{ ref: 'cgh-family', quote: 'the ratios were 1.80 (99% CI 1.69-1.91), 2.93 (2.36-3.64), and 3.90 ' +
                                             '(2.03-7.49), respectively, for one, two, and three or more affected ' +
                                             'first-degree relatives' }, 'kuchenbaecker-brca'],
        direction: 'increases', magnitude: 'RR 2–4 (first-degree); far higher for BRCA1/2', evidence: 'strong',
        note: 'RR 1.80 for one affected first-degree relative to 3.90 for three or more, rounded to whole ' +
              'numbers. Only a small share of breast cancer is attributable to a high-penetrance germline variant.' },
      { factor: 'Dense breast tissue', category: 'Demographic', direction: 'increases',
        source: { ref: 'boyd-density', quote: 'as compared with women with density in less than 10% of the  ' +
                           'mammogram, women with density in 75% or more had an increased risk of breast  ' +
                           'cancer (odds ratio, 4.7; 95% confidence interval [CI], 3.0 to 7.4)' },
        magnitude: 'OR 4.7, densest vs least dense', evidence: 'strong', note: 'Both a genuine risk factor and a masking effect that lowers mammographic sensitivity.' },
      { factor: 'Alcohol', category: 'Lifestyle', direction: 'increases', magnitude: '7.1% per 10 g/day',
        source: { ref: 'cgh-alcohol', quote: 'The relative risk of breast cancer increased by 7.1% (95% CI 5.5-8.7%;  ' +
                           'p<0.00001) for each additional 10 g per day intake of alcohol, i.e. for each  ' +
                           'extra unit or drink of alcohol consumed on a daily basis' },
        evidence: 'strong', note: 'Dose-dependent with no clear safe threshold; effect is strongest for HR-positive disease.' },
      { factor: 'Obesity after menopause', category: 'Lifestyle', source: 'wcrf-cup', direction: 'increases', magnitude: 'RR ~1.2–1.5',
        evidence: 'strong', note: 'Adipose aromatase becomes the main estrogen source once ovarian output stops. ' +
                                  'Before menopause the association reverses.' },
      { factor: 'Combined menopausal hormone therapy', category: 'Hormonal', direction: 'increases',
        source: { ref: 'cgh-mht', quote: 'Among current users, these excess risks were definite even during years  ' +
                           '1-4 (oestrogen-progestagen RR 1.60, 95% CI 1.52-1.69; oestrogen-only RR 1.17,  ' +
                           '1.10-1.26), and were twice as great during years 5-14 (oestrogen-progestagen  ' +
                           'RR 2.08, 2.02-2.15; oestrogen-only RR 1.33, 1.28-1.37)' },
        magnitude: 'RR 1.60 to 2.08, by years of current use', evidence: 'strong', note: 'Estrogen-only HT carries a weaker association.' },
      { factor: 'Therapeutic chest radiation at age 30 or younger', category: 'Environmental',
        source: { ref: 'travis-rt', quote: 'cohort of 3817 female 1-year survivors of HD diagnosed at age 30 years or younger' },
        direction: 'increases',
        evidence: 'strong', note: 'Classically after Hodgkin lymphoma treatment; drives early screening.' },
      { factor: 'Early menarche / late menopause', category: 'Hormonal',
        source: { ref: 'cgh-menarche', quote: 'Breast cancer risk increased by a factor of 1·050 (95% CI 1·044–1·057; p<0·0001) ' +
                  'for every year younger at menarche, and independently by a smaller amount (1·029, 1·025–1·032; ' +
                  'p<0·0001), for every year older at menopause' },
        direction: 'increases', magnitude: 'small per year', evidence: 'strong', note: 'Both extend lifetime estrogen exposure.' },
      { factor: 'Early full-term pregnancy', category: 'Hormonal', direction: 'decreases',
        evidence: 'strong', note: 'Protective for HR-positive disease; the effect does not hold for TNBC.' },
      { factor: 'Breastfeeding', category: 'Hormonal',
        source: { ref: 'cgh-breastfeeding', quote: 'The relative risk of breast cancer decreased by 4.3% (95% CI ' +
                                                   '2.9-5.8; p<0.0001) for every 12 months of breastfeeding' },
        direction: 'decreases', magnitude: '~4% per 12 months', evidence: 'strong',
        note: 'A 4.3% fall in relative risk, rounded. The single strongest modifiable protector against ' +
              'triple-negative disease specifically.' },
      { factor: 'Physical activity', category: 'Lifestyle', direction: 'decreases', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'loss-of-function mutation', frequency: 37, role: 'tumour suppressor',
          note: 'Frequency swings enormously by subtype — 12% in luminal A, 84% in basal-like.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 36, role: 'oncogene', druggable: true,
          note: 'Targetable with alpelisib. Note gedatolisib is approved for the PIK3CA wild-type population instead.' },
        { gene: 'GATA3', alteration: 'mutation', frequency: 11, role: 'luminal lineage transcription factor' }
      ],
      pathways: [
        { name: 'Estrogen receptor signalling', status: 'active in hormone-receptor-positive disease', note: 'The single most druggable axis in oncology.', source: 'tcga-2012' },
        { name: 'HER2 / ERBB2', status: 'amplified in a minority', source: 'tcga-2012' },
        { name: 'PI3K / AKT / mTOR', status: 'frequently altered', source: 'tcga-2012' },
        { name: 'Homologous recombination repair', status: 'deficient in a minority', note: 'BRCA1/2 and beyond; confers PARP-inhibitor sensitivity.', source: 'tcga-2012' }
      ],
      biomarkers: [
        { name: 'ER / PR', use: 'predicts endocrine therapy benefit', threshold: '≥1% by IHC',
          source: { ref: 'asco-cap-er', quote: 'Breast cancer samples with 1% to 100% of tumor nuclei positive should ' +
                                               'be interpreted as ER positive.' } },
        { name: 'HER2', use: 'predicts HER2-directed therapy benefit', threshold: 'IHC 3+ or ISH-amplified', source: 'asco-cap-her2' },
        { name: 'Ki-67', use: 'proliferation index; separates luminal A from B', threshold: 'no universal cutoff', source: 'ki67-iwg' },
        { name: 'Oncotype DX / MammaPrint', use: 'chemotherapy benefit in early HR+/HER2− disease' },
        { name: 'ctDNA ESR1', use: 'detects emergent endocrine resistance', threshold: 'see camizestrant / SERENA-6', source: { nct: 'NCT04964934', label: 'SERENA-6' } }
      ]
    },
    prognosis: {
    source: 'seer-breast',
      relativeOutlook: 'Highly variable by subtype and stage — from near-normal life expectancy to aggressive metastatic disease.',
      fiveYearNote: 'Overall 5-year relative survival ~90% in high-income settings; ~99% for localised disease, ~30% for distant.',
      caveat: 'Stage at diagnosis dominates subtype in predicting outcome.'
    },
    sources: [
      { label: 'SEER Cancer Stat Facts: Female Breast Cancer Subtypes (SEER 21, 2019–2023) — prevalence and 5-year survival on this axis',
        url: 'https://seer.cancer.gov/statfacts/html/breast-subtypes.html' },
      { label: 'TCGA — Comprehensive molecular portraits of human breast tumours (Nature 2012)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' },
      { label: 'ASCO–CAP HER2 testing guideline update (JCO)', url: 'https://ascopubs.org/doi/10.1200/JCO.22.02864' }
    ]
  },

  {
    id: 'hr-pos-her2-neg', axis: 'ihc', parent: 'ihc-root',
    label: 'HR-positive / HER2-negative', shortLabel: 'HR+/HER2−',
    prevalence: 70.1,
    markers: { ER: '+', PR: '+', HER2: '−' },
    summary: 'The largest group by a wide margin. Driven by estrogen receptor signalling, so endocrine therapy ' +
             'is the backbone. The central clinical problem is not initial response but what to do after ' +
             'CDK4/6 inhibitor resistance emerges.',
    triggers: [
      { factor: 'Cumulative estrogen exposure', category: 'Hormonal', source: 'palmer-tnbc-repro', direction: 'increases',
        magnitude: 'aggregate of menarche, parity, menopause', evidence: 'strong',
        note: 'The classic hormonal risk profile maps onto this subtype far more than onto TNBC.' },
      { factor: 'Combined menopausal hormone therapy', category: 'Hormonal', direction: 'increases',
        source: { ref: 'cgh-mht', quote: 'Among current users, these excess risks were definite even during years  ' +
                           '1-4 (oestrogen-progestagen RR 1.60, 95% CI 1.52-1.69; oestrogen-only RR 1.17,  ' +
                           '1.10-1.26), and were twice as great during years 5-14 (oestrogen-progestagen  ' +
                           'RR 2.08, 2.02-2.15; oestrogen-only RR 1.33, 1.28-1.37)' },
        magnitude: 'RR 1.60 to 2.08, by years of current use', evidence: 'strong' },
      { factor: 'Obesity after menopause', category: 'Lifestyle', source: 'wcrf-cup', direction: 'increases', magnitude: 'RR ~1.2–1.5',
        evidence: 'strong', note: 'Peripheral aromatisation in adipose tissue sustains estrogen after ovarian shutdown.' },
      { factor: 'Alcohol', category: 'Lifestyle', direction: 'increases', magnitude: '7.1% per 10 g/day',
        source: { ref: 'cgh-alcohol', quote: 'The relative risk of breast cancer increased by 7.1% (95% CI 5.5-8.7%;  ' +
                           'p<0.00001) for each additional 10 g per day intake of alcohol, i.e. for each  ' +
                           'extra unit or drink of alcohol consumed on a daily basis' }, evidence: 'strong' },
      { factor: 'Early full-term pregnancy', category: 'Hormonal',
        source: { ref: 'palmer-tnbc-repro', quote: 'Among parous women, older age at first completed pregnancy was not ' +
                                                   'associated with any ER/PR/HER2-defined specific subtypes, except for ' +
                                                   'the luminal A-like subtype (P trend = 0.05)' },
        direction: 'decreases', evidence: 'strong' },
      { factor: 'BRCA2 germline variant', category: 'Germline', direction: 'increases',
        source: { ref: 'kuchenbaecker-brca', quote: 'The cumulative breast cancer risk to age 80 years was 72%  ' +
                           '(95% CI, 65%-79%) for BRCA1 and 69% (95% CI, 61%-77%) for BRCA2 carriers' },
        magnitude: '69% by age 80', evidence: 'strong',
        note: 'BRCA2-associated tumours are more often ER-positive — the opposite of the BRCA1 pattern.' }
    ],
    molecular: {
      drivers: [
        { gene: 'PIK3CA', alteration: 'activating mutation (H1047R, E545K)', frequency: 40, role: 'oncogene', druggable: true,
          note: 'Alpelisib and capivasertib target this axis; gedatolisib serves the wild-type remainder.' },
        /* No `frequency` on purpose. The ~30% that used to sit here was uncited, and
           a bar on this node means "share of HR+/HER2− tumours" -- which no source
           measures for ESR1. What is published is a share of women tested in blood
           after aromatase-inhibitor exposure, and it depends on the setting; those
           figures are on the ctDNA biomarker below, each with its footnote. */
        { gene: 'ESR1', alteration: 'ligand-independent activating mutation', role: 'acquired resistance', druggable: true,
          note: 'Rare at diagnosis. Common after an aromatase inhibitor given for metastatic disease, rare after one ' +
                'given as adjuvant therapy — the blood-test biomarker below carries the figures. Targeted by oral SERDs.' },
        { gene: 'GATA3', alteration: 'mutation', frequency: 14, role: 'luminal lineage factor' },
        { gene: 'MAP3K1', alteration: 'loss-of-function', frequency: 14, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 17, role: 'tumour suppressor', note: 'Much lower than in ER-negative disease.' },
        { gene: 'CDH1', alteration: 'loss-of-function', frequency: 10, role: 'cell adhesion', note: 'Concentrated in lobular histology.' },
        { gene: 'CCND1', alteration: 'amplification', frequency: 15, role: 'oncogene', note: 'Feeds the CDK4/6–RB axis.' }
      ],
      pathways: [
        { name: 'ER signalling', status: 'the driver', note: 'Blocked by AIs, SERMs, SERDs and now PROTAC degraders.' },
        { name: 'Cyclin D–CDK4/6–RB', status: 'active', note: 'Target of palbociclib, ribociclib, abemaciclib and the CDK4-selective next generation.' },
        { name: 'PI3K/AKT/mTOR', status: 'the main escape route from endocrine blockade' }
      ],
      biomarkers: [
        { name: 'ESR1 mutation (ctDNA)', use: 'selects oral SERD therapy',
          threshold: 'found in the blood of 28.8% of women with aromatase-inhibitor-exposed metastatic disease ' +
                     '(156 of 541, BOLERO-2; only the two commonest mutations tested). It depends on when the ' +
                     'inhibitor was first given: 5.8% if as adjuvant therapy (3 of 52), 36.4% if for metastatic ' +
                     'disease (16 of 44)',
          source: [{ ref: 'chandarlapaty-2016', quote: 'The study enrolled postmenopausal women with a diagnosis of MBC and ' +
                                                       'prior exposure to an aromatase inhibitor. … The 2 most frequent ' +
                                                       'mutations in ESR1 (Y537S and D538G) were analyzed from cfDNA … Of ' +
                                                       '541 evaluable patients, 156 (28.8%) had ESR1 mutation' },
                   { ref: 'schiavon-2015', quote: 'ESR1 mutation prevalence differed markedly between patients who were ' +
                                                  'first exposed to AI during the adjuvant and metastatic settings [5.8% ' +
                                                  '(3 of 52) versus 36.4% (16 of 44), respectively' }] },
        { name: 'PIK3CA / AKT1 / PTEN', use: 'selects alpelisib or capivasertib' },
        { name: 'PIK3CA wild-type', use: 'selects gedatolisib', source: ['tcga-2012', { nct: 'NCT05501886', label: 'VIKTORIA-1' }] },
        { name: 'Oncotype DX recurrence score', use: 'chemotherapy benefit in early disease' }
      ]
    },
    prognosis: {
    source: 'seer-subtypes',
      relativeOutlook: 'Best of the four groups, but with a long tail — late recurrence beyond 10 years is characteristic.',
      fiveYearNote: '5-year relative survival 95.8% (SEER 21, 2019–2023). The headline number hides the tail: ' +
                    'recurrence hazard persists for 20 years, unlike TNBC.',
      caveat: 'Luminal A and luminal B behave quite differently inside this single IHC box.'
    },
    therapies: [
      { name: 'Aromatase inhibitors / tamoxifen', class: 'endocrine', setting: 'adjuvant + metastatic', status: 'standard' },
      { name: 'Palbociclib / ribociclib / abemaciclib', class: 'CDK4/6 inhibitor', setting: '1L metastatic; adjuvant high-risk', status: 'approved',
    source: [{ nct: 'NCT01740427', label: 'PALOMA-2 / PALOMA-3' }, { nct: 'NCT01958021', label: 'MONALEESA-2/3/7; NATALEE (adjuvant)' }, { nct: 'NCT02107703', label: 'MONARCH-2/3; monarchE (adjuvant)' }] },
      { name: 'Elacestrant, imlunestrant, vepdegestrant', class: 'oral SERD / degrader', setting: 'ESR1-mutant 2L+', status: 'approved',
    source: [{ nct: 'NCT03778931', label: 'EMERALD' }, { nct: 'NCT04975308', label: 'EMBER-3' }, { nct: 'NCT05654623', label: 'VERITAC-2' }] },
      { name: 'Gedatolisib (Revtorpyk)', class: 'pan-PI3K/mTOR', setting: 'PIK3CA wild-type 2L+', status: 'approved 2026-07-14',
    source: [{ nct: 'NCT05501886', label: 'VIKTORIA-1 (PIK3CA wild-type cohort)' }] },
      { name: 'Alpelisib / capivasertib', class: 'PI3K / AKT', setting: 'biomarker-selected 2L+', status: 'approved',
    source: [{ nct: 'NCT02437318', label: 'SOLAR-1' }, { nct: 'NCT04305496', label: 'CAPItello-291' }] },
      { name: 'Giredestrant', class: 'oral SERD', setting: 'adjuvant early-stage', status: 'PDUFA 2026-11-30',
    source: [{ nct: 'NCT04961996', label: 'lidERA Breast Cancer' }] },
      { name: 'Atirmociclib', class: 'CDK4-selective', setting: 'post-CDK4/6i', status: 'phase 3',
    source: [{ nct: 'NCT06760637', label: 'FOURLIGHT-3 (with letrozole)' }] }
    ],
    related: [
      { to: 'luminal-a', kind: 'overlaps', note: 'Most luminal A tumours sit here, but the two categories are not interchangeable.' },
      { to: 'luminal-b', kind: 'overlaps', note: 'The HER2-negative half of luminal B.' },
      { to: 'her2-low', kind: 'overlaps', note: 'About half of this group is HER2-low and therefore T-DXd eligible.' },
      { to: 'ilc', kind: 'shares-driver', note: 'Lobular carcinoma is overwhelmingly ER-positive and CDH1-driven.' },
      { to: 'state-metastatic', kind: 'progresses-to',
        note: 'ESR1 mutation is rare at diagnosis and common after endocrine therapy. The disease-state ' +
              'axis measures that directly, in primary tumours against metastatic biopsies.' }
    ],
    sources: [
      { label: 'TCGA (Nature 2012)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' },
      { label: 'Celcuity — gedatolisib FDA approval', url: 'https://ir.celcuity.com/news-releases/news-release-details/celcuity-announces-fda-approval-revtorpyktm-gedatolisib' }
    ]
  },

  {
    id: 'er-pr-pos', axis: 'ihc', parent: 'hr-pos-her2-neg',
    label: 'ER+ / PR+ (classic luminal)', shortLabel: 'ER+/PR+',
    prevalence: 55.7,
    markers: { ER: '+', PR: '+', HER2: '−' },
    summary: 'Both hormone receptors intact — the most endocrine-responsive pattern. An intact PR is evidence ' +
             'that the ER pathway is functioning, since PR is itself an ER-driven gene product.',
    molecular: {
      drivers: [
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 45, role: 'oncogene', druggable: true },
        { gene: 'GATA3', alteration: 'mutation', frequency: 14, role: 'luminal lineage factor' },
        { gene: 'MAP3K1', alteration: 'loss-of-function', frequency: 14, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 12, role: 'tumour suppressor', note: 'Low — the TP53 pathway is largely intact here.' }
      ]
    },
    prognosis: { relativeOutlook: 'Most favourable receptor pattern.' },
    related: [{ to: 'luminal-a', kind: 'overlaps', note: 'Closest IHC approximation of luminal A.' }]
  },

  {
    id: 'er-pos-pr-neg', axis: 'ihc', parent: 'hr-pos-her2-neg',
    label: 'ER+ / PR-negative', shortLabel: 'ER+/PR−',
    prevalence: 12.4,
    markers: { ER: '+', PR: '−', HER2: '−' },
    summary: 'A real and prognostically meaningful pattern, not a testing error. Loss of PR suggests a partly ' +
             'dysfunctional ER pathway — these tumours are more proliferative and derive less benefit from ' +
             'endocrine therapy than ER+/PR+ disease.',
    triggers: [
      { factor: 'Older age at diagnosis', category: 'Demographic', source: 'tcga-2012', direction: 'increases', magnitude: 'modest', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 33, role: 'oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 25, role: 'tumour suppressor' }
      ],
      pathways: [{ name: 'Growth factor crosstalk', status: 'elevated', note: 'Proposed mechanism for PR loss despite ER positivity.' }]
    },
    prognosis: { relativeOutlook: 'Intermediate — worse than ER+/PR+, better than triple-negative.' },
    related: [{ to: 'luminal-b', kind: 'overlaps', note: 'Enriched for luminal B biology.' }]
  },

  {
    id: 'er-low', axis: 'ihc', parent: 'hr-pos-her2-neg',
    label: 'ER-low positive (1–10%)', shortLabel: 'ER-low',
    prevalence: 2,
    markers: { ER: '1–10%', PR: '−', HER2: '−' },
    summary: 'A deliberate artefact of where the line was drawn. ASCO/CAP set ER positivity at ≥1% to avoid ' +
             'withholding endocrine therapy from anyone who might benefit — but tumours in the 1–10% band ' +
             'behave far more like triple-negative disease than like classic luminal cancers.',
    triggers: [
      { factor: 'Same profile as triple-negative disease', category: 'Demographic', source: 'tcga-2012', direction: 'increases',
        magnitude: '—', evidence: 'moderate', note: 'Epidemiologically this group tracks TNBC, not HR-positive disease.' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 60, role: 'tumour suppressor', note: 'Much closer to the basal-like profile.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 15, role: 'oncogene', druggable: true }
      ],
      biomarkers: [{ name: 'ER percentage', use: 'the classification boundary itself', threshold: '1% — consensus, not biology',
                     source: { ref: 'asco-cap-er', quote: 'Breast cancer samples with 1% to 100% of tumor nuclei positive should ' +
                                                          'be interpreted as ER positive.' } }]
    },
    prognosis: {
      relativeOutlook: 'Tracks triple-negative outcomes more closely than HR-positive outcomes.',
      caveat: 'Endocrine therapy is usually still offered, but expected benefit is small.'
    },
    related: [
      { to: 'tnbc', kind: 'overlaps', note: 'Behaves like TNBC despite being labelled hormone-receptor positive.' },
      { to: 'basal-like', kind: 'shares-driver', note: 'Frequently basal-like by expression profiling.' }
    ]
  },

  {
    id: 'triple-positive', axis: 'ihc', parent: 'ihc-root',
    label: 'Triple positive (ER+/PR+/HER2+)', shortLabel: 'Triple positive',
    prevalence: 9.3,
    markers: { ER: '+', PR: '+', HER2: '+' },
    summary: 'All three receptors positive — the only subtype where both major targeted pathways are attacked ' +
             'at once. Less endocrine-sensitive than HR+/HER2− disease because HER2 signalling provides an ' +
             'escape route around ER blockade.',
    triggers: [
      { factor: 'Hormonal and reproductive factors', category: 'Hormonal', direction: 'increases',
        magnitude: 'intermediate', evidence: 'moderate', note: 'Weaker association than for HR+/HER2− disease.' },
      { factor: 'Family history', category: 'Germline', direction: 'increases', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'amplification', frequency: 100, role: 'defining oncogene', druggable: true,
          note: 'Definitional for the group.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 39, role: 'oncogene', druggable: true,
          note: 'Associated with reduced benefit from HER2-directed therapy.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 50, role: 'tumour suppressor' },
        { gene: 'CCND1', alteration: 'amplification', frequency: 20, role: 'oncogene' }
      ],
      pathways: [
        { name: 'ER signalling', status: 'active but subordinate' },
        { name: 'HER2 / ERBB2', status: 'the dominant driver' },
        { name: 'ER–HER2 crosstalk', status: 'bidirectional resistance', note: 'Blocking one pathway upregulates the other — the reason both are targeted together.' }
      ]
    },
    prognosis: {
    source: 'seer-subtypes',
      relativeOutlook: 'Good with modern dual-pathway therapy; historically worse than HR+/HER2−.',
      fiveYearNote: '5-year relative survival 92.2% (SEER 21, 2019–2023).',
      caveat: 'Rarely studied as its own population — usually a subgroup analysis inside HER2+ trials.'
    },
    therapies: [
      { name: 'Trastuzumab + pertuzumab + endocrine therapy', class: 'HER2 mAb + ET', setting: 'metastatic', status: 'standard',
    source: [{ nct: 'NCT04784715', label: 'DESTINY-Breast09' }, { nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }] },
      { name: 'T-DXd (Enhertu)', class: 'HER2 ADC', setting: '2L metastatic; early-stage', status: 'approved',
    source: [{ nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }, { nct: 'NCT03529110', label: 'DESTINY-Breast03' }] },
      { name: 'Endocrine maintenance', class: 'endocrine', setting: 'after chemotherapy', status: 'standard' },
      { name: 'Atirmociclib + letrozole', class: 'CDK4-selective', setting: '1L HR+/HER2+ metastatic', status: 'phase 2',
    source: [{ nct: 'NCT06760637', label: 'FOURLIGHT-3 (with letrozole)' }] }
    ],
    related: [
      { to: 'luminal-b', kind: 'overlaps', note: 'Most triple-positive tumours classify as luminal B by PAM50.' },
      { to: 'her2-positive', kind: 'subset-of', note: 'The hormone-receptor-positive half of HER2-positive disease.' }
    ]
  },

  {
    id: 'her2-pos-hr-neg', axis: 'ihc', parent: 'ihc-root',
    label: 'HER2-positive / HR-negative', shortLabel: 'HER2+/HR−',
    prevalence: 4.0,
    markers: { ER: '−', PR: '−', HER2: '+' },
    summary: 'Two receptors negative, one strongly positive — what people often loosely call "double negative". ' +
             'Aggressive untreated, but among the most therapy-responsive subtypes: HER2 amplification is a ' +
             'clean, high-dependency target.',
    triggers: [
      { factor: 'Younger age at diagnosis', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: 'modest', evidence: 'moderate' },
      { factor: 'Hormonal/reproductive factors', category: 'Hormonal', direction: 'mixed', magnitude: 'weak or absent',
        evidence: 'limited', note: 'The classic estrogen-exposure risk model largely does not apply here.' },
      { factor: 'TP53 germline variant (Li-Fraumeni)', category: 'Germline', source: 'tcga-2012', direction: 'increases',
        magnitude: 'very high', evidence: 'strong', note: 'Li-Fraumeni breast cancers are enriched for HER2 positivity.' }
    ],
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'amplification / overexpression', frequency: 100, role: 'defining oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 72, role: 'tumour suppressor', note: 'TCGA HER2-enriched figure.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 39, role: 'oncogene', druggable: true },
        { gene: 'PIK3R1', alteration: 'mutation', frequency: 4, role: 'PI3K regulatory subunit' },
        { gene: 'MYC', alteration: 'amplification', frequency: 30, role: 'oncogene' }
      ],
      pathways: [
        { name: 'HER2 / ERBB2', status: 'the driver — high dependency', note: 'Explains why ADCs and TKIs work so well here.' },
        { name: 'PI3K/AKT', status: 'frequent co-alteration', note: 'Associated with HER2-therapy resistance.' }
      ],
      biomarkers: [{ name: 'HER2 IHC / ISH', use: 'selects all HER2-directed therapy', threshold: 'IHC 3+ or IHC 2+/ISH+', source: 'asco-cap-her2' }]
    },
    prognosis: {
    source: 'seer-subtypes',
      relativeOutlook: 'Transformed by HER2-directed therapy — from among the worst outcomes pre-1998 to among the best.',
      fiveYearNote: '5-year relative survival 87.0% (SEER 21, 2019–2023). High risk of CNS metastasis ' +
                    'remains a distinctive problem.',
      caveat: 'Brain metastases occur in up to ~50% of metastatic cases, driving the value of CNS-active agents.'
    },
    therapies: [
      { name: 'Trastuzumab + pertuzumab (THP)', class: 'HER2 mAb', setting: '1L metastatic; adjuvant', status: 'standard',
    source: [{ nct: 'NCT04784715', label: 'DESTINY-Breast09' }, { nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }] },
      { name: 'T-DXd (Enhertu)', class: 'HER2 ADC', setting: '2L metastatic; neoadjuvant + adjuvant early', status: 'approved 2026-05-15',
    source: [{ nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }, { nct: 'NCT03529110', label: 'DESTINY-Breast03' }] },
      { name: 'T-DM1 (Kadcyla)', class: 'HER2 ADC', setting: 'adjuvant residual disease', status: 'approved',
    source: [{ nct: 'NCT00829166', label: 'EMILIA; KATHERINE' }] },
      { name: 'Tucatinib', class: 'HER2 TKI', setting: '2L+, CNS-active', status: 'approved',
    source: [{ nct: 'NCT02614794', label: 'HER2CLIMB' }] },
      { name: 'Zanidatamab', class: 'HER2 bispecific', setting: 'post-T-DXd; neoadjuvant monotherapy', status: 'phase 2',
    source: [{ nct: 'NCT05035836', label: 'NeoZanHER' }] }
    ],
    related: [
      { to: 'her2-enriched', kind: 'subset-of', strength: 1.0,
        note: 'The relationship is strongly one-directional. In the TCGA 2012 cohort every HER2+/HR− tumour was ' +
              'PAM50 HER2-enriched (19/19) — but only 36% of HER2-enriched tumours were HER2+/HR− (19/53). ' +
              'HER2-enriched is the much broader category.' },
      { to: 'her2-positive', kind: 'subset-of', note: 'The hormone-receptor-negative half of HER2-positive disease.' }
    ]
  },

  {
    id: 'tnbc', axis: 'ihc', parent: 'ihc-root',
    label: 'Triple negative (TNBC)', shortLabel: 'TNBC',
    prevalence: 10.8,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Defined by what it lacks — no endocrine target, no HER2 target. That negative definition is the ' +
             'core problem: it lumps together at least six transcriptionally distinct diseases, which is why ' +
             'trials in unselected TNBC have historically underperformed.',
    triggers: [
      { factor: 'BRCA1 germline variant', category: 'Germline', direction: 'increases',
        source: { ref: 'kuchenbaecker-brca', quote: 'The cumulative breast cancer risk to age 80 years was 72%  ' +
                           '(95% CI, 65%-79%) for BRCA1 and 69% (95% CI, 61%-77%) for BRCA2 carriers' },
        magnitude: '72% by age 80', evidence: 'strong',
        note: 'The strongest single link. BRCA1 tumours are predominantly triple-negative and basal-like, and ' +
              'are frequently diagnosed young.' },
      { factor: 'Younger age at diagnosis', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: 'marked',
        evidence: 'strong', note: 'TNBC is over-represented in premenopausal diagnoses.' },
      { factor: 'Black / African ancestry (US data)', category: 'Demographic', source: 'palmer-tnbc-repro', direction: 'increases',
        magnitude: 'more often diagnosed with triple-negative disease', evidence: 'strong',
        note: 'Black women in the US have a higher TNBC incidence than white women and worse stage-adjusted outcomes. ' +
              'Access and structural factors contribute alongside tumour biology.' },
      { factor: 'Breastfeeding ≥12 months', category: 'Hormonal',
        source: { ref: 'palmer-tnbc-repro', quote: 'Parous women who breastfed for at least one year had a 31% lower ' +
                                                   'risk of TNBC than parous women who had never breastfed (odds ' +
                                                   'ratio, OR = 0.69' },
        direction: 'decreases', magnitude: 'OR 0.69',
        evidence: 'strong', note: 'Parous women who breastfed ≥1 year had 31% lower TNBC risk than parous women who never breastfed.' },
      { factor: 'Breastfeeding ≥6 months (parous Black women aged 20–44)', category: 'Hormonal',
        source: { ref: 'palmer-tnbc-repro', quote: 'Parous African-American women aged 20-44 years who breastfed for ' +
                                                   '6 months or longer had an 82% lower risk of TNBC than their ' +
                                                   'counterparts who had never breastfed (OR = 0.18' },
        direction: 'decreases', magnitude: 'OR 0.18', evidence: 'moderate', note: 'An 82% risk reduction in this specific pooled subgroup.' },
      { factor: 'High parity without breastfeeding', category: 'Hormonal', source: 'cgh-breastfeeding', direction: 'increases',
        magnitude: 'modest', evidence: 'moderate',
        note: 'The parity paradox — multiple births lower HR-positive risk but raise TNBC risk when not offset by lactation.' },
      { factor: 'PALB2 germline variant', category: 'Germline', direction: 'increases',
        source: { ref: 'yang-palb2', quote: 'the estimated risks to age 80 years were 53% (95% CI, 44% to 63%)  ' +
                           'for female breast cancer' },
        magnitude: '53% by age 80', evidence: 'strong' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'loss-of-function mutation', frequency: 80, role: 'tumour suppressor',
          note: 'Mostly nonsense and frameshift. Near-universal, and still not druggable.' },
        { gene: 'BRCA1/2', alteration: 'germline and/or somatic variant', frequency: 20, role: 'homologous recombination repair',
          druggable: true, note: 'Confers PARP-inhibitor and platinum sensitivity.' },
        { gene: 'MYC', alteration: 'amplification', frequency: 40, role: 'oncogene' },
        { gene: 'PTEN', alteration: 'loss (incl. hemizygous)', frequency: 35, role: 'tumour suppressor', druggable: true },
        { gene: 'INPP4B', alteration: 'loss (incl. hemizygous)', frequency: 30, role: 'PI3K pathway brake' },
        { gene: 'RB1', alteration: 'deep deletion', frequency: 6.5, role: 'tumour suppressor',
          note: 'Loss of RB1 with cyclin E1 amplification predicts CDK4/6-inhibitor futility. ' +
                'Deep deletions only; including hemizygous loss the figure is ~44%.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 9, role: 'oncogene', druggable: true,
          note: 'Uncommon here, in sharp contrast to luminal disease.' }
      ],
      pathways: [
        { name: 'p53', status: 'frequently inactivated', source: 'tcga-2012' },
        { name: 'Homologous recombination repair', status: 'deficient in a substantial minority', note: 'The basis for PARP inhibitors and platinum.' },
        { name: 'RB / cyclin E', status: 'frequently disrupted' },
        { name: 'Immune infiltration', status: 'high in the immunomodulatory subset', note: 'Underlies checkpoint-inhibitor benefit.' }
      ],
      biomarkers: [
        { name: 'PD-L1 CPS', use: 'selects pembrolizumab in metastatic disease', threshold: '≥10', source: { nct: 'NCT02819518', label: 'KEYNOTE-355' } },
        { name: 'germline BRCA1/2', use: 'selects olaparib or talazoparib' },
        { name: 'TROP2', use: 'ADC target — but expression does not predict benefit', threshold: 'not used for selection' }
      ]
    },
    prognosis: {
    source: 'seer-subtypes',
      relativeOutlook: 'Worst of the four groups, with a distinctive early recurrence peak at 2–3 years.',
      fiveYearNote: '5-year relative survival 78.7% (SEER 21, 2019–2023) — the lowest of the four receptor groups. ' +
                    'Risk falls sharply after ~5 years; unlike HR-positive disease, late recurrence is uncommon.',
      caveat: 'Achieving a pathologic complete response after neoadjuvant therapy predicts excellent long-term outcome.'
    },
    therapies: [
      { name: 'Pembrolizumab + chemotherapy', class: 'PD-1 immunotherapy', setting: 'neoadjuvant/adjuvant early; PD-L1+ metastatic', status: 'standard',
    source: [{ nct: 'NCT03036488', label: 'KEYNOTE-522' }, { nct: 'NCT02819518', label: 'KEYNOTE-355' }, { nct: 'NCT05633654', label: 'OptimICE-RD / ASCENT-05' }] },
      { name: 'Sacituzumab govitecan (Trodelvy)', class: 'TROP2 ADC', setting: '1L metastatic ± pembrolizumab', status: 'approved 2026-06-24',
    source: [{ nct: 'NCT03901339', label: 'TROPiCS-02' }, { nct: 'NCT02574455', label: 'ASCENT' }, { nct: 'NCT05382299', label: 'ASCENT-03 / ASCENT-04' }] },
      { name: 'Datopotamab deruxtecan (Datroway)', class: 'TROP2 ADC', setting: '1L metastatic, IO-ineligible', status: 'approved 2026-05-22',
    source: [{ nct: 'NCT05104866', label: 'TROPION-Breast01' }, { nct: 'NCT05374512', label: 'TROPION-Breast02' }, { nct: 'NCT06103864', label: 'TROPION-Breast04' }] },
      { name: 'Olaparib / talazoparib', class: 'PARP inhibitor', setting: 'germline BRCA1/2', status: 'approved',
    source: [{ nct: 'NCT02000622', label: 'OlympiAD; OlympiA (adjuvant)' }, { nct: 'NCT01945775', label: 'EMBRACA' }] },
      { name: 'Atezolizumab', class: 'PD-L1 immunotherapy', setting: '1L metastatic PD-L1+', status: 'withdrawn (US, 2021)',
    source: [{ nct: 'NCT02425891', label: 'IMpassion130 / IMpassion131' }] }
    ],
    related: [
      { to: 'basal-like', kind: 'overlaps', strength: 0.86,
        note: 'Measured in the TCGA 2012 cohort: 86% of TNBC is basal-like (76/88) and 83% of basal-like is TNBC (76/92). ' +
              'The residue is the point — 14 basal-like tumours there were HR+/HER2− by IHC.' },
      { to: 'er-low', kind: 'overlaps', note: 'ER-low (1–10%) tumours behave like this group.' },
      { to: 'her2-low', kind: 'overlaps', note: 'A substantial share of TNBC is HER2-low and therefore T-DXd eligible.' },
      { to: 'metaplastic', kind: 'shares-driver', note: 'Metaplastic carcinoma is almost always triple-negative.' }
    ],
    sources: [
      { label: 'Reproductive factors and TNBC risk — pooled analysis', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5237290/' },
      { label: 'BRCA1/2 mutations and triple-negative breast cancers', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3870050/' },
      { label: 'TCGA (Nature 2012)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' }
    ]
  },

  /* --- Lehmann transcriptional subtypes of TNBC --- */
  {
    id: 'tnbc-bl1', axis: 'ihc', parent: 'tnbc',
    label: 'Basal-like 1 (BL1)', shortLabel: 'BL1', prevalence: 2.6,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Cell-cycle and DNA-damage-response driven, with the highest proliferation of the TNBC subtypes. ' +
             'The group most likely to respond to platinum and PARP inhibition.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 90, role: 'tumour suppressor' },
        { gene: 'BRCA1/2', alteration: 'variant / HRD', frequency: 30, role: 'DNA repair', druggable: true },
        { gene: 'MKI67', alteration: 'high expression', frequency: 80, role: 'proliferation marker' }
      ],
      pathways: [{ name: 'DNA damage response', status: 'enriched', note: 'The rationale for platinum-based regimens.' }]
    },
    prognosis: { relativeOutlook: 'Highest pCR rate to neoadjuvant chemotherapy among TNBC subtypes.' },
    therapies: [{ name: 'Platinum chemotherapy', class: 'DNA-damaging', setting: 'neoadjuvant', status: 'evidence-supported' }]
  },
  {
    id: 'tnbc-bl2', axis: 'ihc', parent: 'tnbc',
    label: 'Basal-like 2 (BL2)', shortLabel: 'BL2', prevalence: 1.2,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Growth-factor signalling and myoepithelial features. Lower chemotherapy response than BL1.',
    molecular: {
      drivers: [
        { gene: 'EGFR', alteration: 'overexpression', frequency: 40, role: 'growth factor receptor', druggable: true },
        { gene: 'MET', alteration: 'overexpression', frequency: 25, role: 'growth factor receptor', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 80, role: 'tumour suppressor' }
      ]
    },
    prognosis: { relativeOutlook: 'Poorer chemotherapy response than BL1.' }
  },
  {
    id: 'tnbc-m', axis: 'ihc', parent: 'tnbc',
    label: 'Mesenchymal (M)', shortLabel: 'M', prevalence: 2.2,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Motility, epithelial-to-mesenchymal transition and stem-like differentiation. Overlaps heavily ' +
             'with metaplastic histology and is characteristically chemoresistant.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 75, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 25, role: 'oncogene', druggable: true,
          note: 'Higher here than in TNBC overall.' },
        { gene: 'PTEN', alteration: 'loss', frequency: 30, role: 'tumour suppressor' }
      ],
      pathways: [{ name: 'EMT / Wnt', status: 'active', note: 'Drives the chemoresistant phenotype.' }]
    },
    prognosis: { relativeOutlook: 'Chemoresistant; poor outcomes.' },
    related: [{ to: 'metaplastic', kind: 'overlaps', note: 'Metaplastic carcinomas cluster here transcriptionally.' }]
  },
  {
    id: 'tnbc-msl', axis: 'ihc', parent: 'tnbc',
    label: 'Mesenchymal stem-like (MSL)', shortLabel: 'MSL', prevalence: 1.2,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Low proliferation, angiogenesis and stromal signatures. Later refinements collapsed MSL into the ' +
             'mesenchymal group after showing much of the signal came from infiltrating stroma rather than tumour cells.',
    molecular: {
      drivers: [{ gene: 'TP53', alteration: 'mutation', frequency: 70, role: 'tumour suppressor' }],
      pathways: [{ name: 'Angiogenesis', status: 'enriched' }]
    },
    prognosis: { caveat: 'Classification is contested — treat this node as historical.' }
  },
  {
    id: 'tnbc-im', axis: 'ihc', parent: 'tnbc',
    label: 'Immunomodulatory (IM)', shortLabel: 'IM', prevalence: 2.0,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Heavily immune-infiltrated. The subset most likely to benefit from checkpoint inhibition, and the ' +
             'group carrying the best prognosis within TNBC.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 78, role: 'tumour suppressor' },
        { gene: 'CD274 (PD-L1)', alteration: 'expression', frequency: 55, role: 'immune checkpoint', druggable: true }
      ],
      pathways: [{ name: 'Interferon / antigen presentation', status: 'active', note: 'Underlies the checkpoint-inhibitor rationale.' }],
      biomarkers: [
        { name: 'Tumour-infiltrating lymphocytes (TILs)', use: 'prognostic and predictive in TNBC' },
        { name: 'PD-L1 CPS', use: 'selects pembrolizumab', threshold: '≥10', source: { nct: 'NCT02819518', label: 'KEYNOTE-355' } }
      ]
    },
    prognosis: { relativeOutlook: 'Best prognosis within TNBC; high TIL density predicts favourable outcome.' },
    therapies: [{ name: 'Pembrolizumab', class: 'PD-1 immunotherapy', setting: 'PD-L1+ metastatic; early-stage', status: 'approved',
    source: [{ nct: 'NCT03036488', label: 'KEYNOTE-522' }, { nct: 'NCT02819518', label: 'KEYNOTE-355' }, { nct: 'NCT05633654', label: 'OptimICE-RD / ASCENT-05' }] }]
  },
  {
    id: 'tnbc-lar', axis: 'ihc', parent: 'tnbc',
    label: 'Luminal androgen receptor (LAR)', shortLabel: 'LAR', prevalence: 1.6,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Androgen-receptor driven despite being ER-negative — hormonally addicted disease hiding inside a ' +
             'category defined by hormone-receptor negativity. Low proliferation, and unusually enriched for PIK3CA mutation.',
    molecular: {
      drivers: [
        { gene: 'AR', alteration: 'overexpression', frequency: 90, role: 'nuclear hormone receptor', druggable: true,
          note: 'Rationale for anti-androgen strategies such as bicalutamide and enzalutamide.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 40, role: 'oncogene', druggable: true,
          note: 'Far higher than TNBC overall (9%) — a genuinely actionable difference.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 55, role: 'tumour suppressor' },
        { gene: 'CDH1', alteration: 'loss', frequency: 20, role: 'cell adhesion' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Lower proliferation but poorer chemotherapy response; outcomes are mixed.',
      caveat: 'Low pCR rates make this a poor fit for chemotherapy-escalation strategies.'
    },
    therapies: [{ name: 'AR antagonists (bicalutamide, enzalutamide)', class: 'anti-androgen', setting: 'investigational', status: 'phase 2', source: [{ nct: 'NCT00468715', label: 'Bicalutamide in AR-positive, ER/PR-negative metastatic breast cancer (TBCRC 011)' }, { nct: 'NCT01889238', label: 'Enzalutamide in advanced AR-positive triple-negative breast cancer' }] }]
  },

  {
    id: 'ihc-unknown', axis: 'ihc', parent: 'ihc-root',
    label: 'Receptor status unknown / not reported', shortLabel: 'Status unknown',
    prevalence: 5.5,
    markers: { ER: '?', PR: '?', HER2: '?' },
    summary: 'Cases where receptor status was never established or never reported to the registry. ' +
             'This is not a biological subtype — it is a measure of how complete testing actually is, ' +
             'and it is larger than the entire HER2+/HR− group. Normalising it away would quietly ' +
             'overstate how well characterised breast cancer is in practice.',
    triggers: [
      { factor: 'Incomplete pathology reporting', category: 'Demographic', source: 'seer-subtypes', direction: 'mixed',
        magnitude: '5.5% of registry cases', evidence: 'strong',
        note: 'Concentrated in older patients, smaller facilities, and cases diagnosed at autopsy or by ' +
              'death certificate only.' }
    ],
    prognosis: {
      relativeOutlook: 'Not interpretable as a group — it mixes every underlying subtype.',
      caveat: 'Outcomes in this bucket are systematically worse than average, but that reflects who goes ' +
              'untested rather than any property of the tumours.'
    },
    sources: [
      { label: 'SEER Cancer Stat Facts: Female Breast Cancer Subtypes (SEER 21, 2019–2023)',
        url: 'https://seer.cancer.gov/statfacts/html/breast-subtypes.html' }
    ]
  },

  /* ============================== AXIS 2 — PAM50 INTRINSIC ============================== */

  {
    id: 'pam50-root', axis: 'pam50', parent: null,
    label: 'Intrinsic subtypes (PAM50)', shortLabel: 'PAM50',
    prevalence: 100,
    summary: 'A 50-gene expression classifier that predates and partly contradicts the IHC axis. It captures ' +
             'the underlying cell-of-origin biology rather than three protein stains — which is why the two ' +
             'systems disagree, and why quoting one as if it were the other is a common error.',
    molecular: {
      biomarkers: [
        { name: 'PAM50 / Prosigna', use: 'intrinsic subtype + risk of recurrence score' },
        { name: 'Ki-67', use: 'separates luminal A from luminal B in the absence of expression profiling' }
      ]
    },
    prognosis: {
    source: 'metabric',
      relativeOutlook: 'Intrinsic subtype adds prognostic information beyond IHC, particularly within HR-positive disease.',
      fiveYearNote: 'Median overall survival separates the subtypes cleanly in METABRIC (n=1,980): ' +
                    'basal 36.4, HER2-enriched 65.1, luminal B 85.3, luminal A 115.1 months.',
      caveat: 'Those medians come from an older cohort, accrued largely before ' +
              'trastuzumab. They rank the subtypes correctly but understate modern outcomes.'
    },
    sources: [
      { label: 'TCGA (Nature 2012)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' },
      { label: 'METABRIC via cBioPortal — median overall survival by intrinsic subtype',
        url: 'https://www.cbioportal.org/study/summary?id=brca_metabric' }
    ]
  },
  {
    id: 'luminal-a', axis: 'pam50', parent: 'pam50-root',
    label: 'Luminal A', shortLabel: 'Luminal A', prevalence: 40,
    markers: { ER: '+', PR: '+', HER2: '−' },
    summary: 'High ER signalling, low proliferation, PR-retained. The best-prognosis subtype and the one most ' +
             'often safely spared chemotherapy. Notably, the TP53 pathway is largely intact here.',
    triggers: [
      { factor: 'Classic estrogen-exposure profile', category: 'Hormonal', direction: 'increases',
        magnitude: 'strongest of the intrinsic subtypes', evidence: 'strong' },
      { factor: 'Obesity after menopause', category: 'Lifestyle', direction: 'increases', evidence: 'strong' }
    ],
    molecular: {
      drivers: [
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 45, role: 'oncogene', druggable: true,
          note: 'The highest PIK3CA frequency of any subtype.' },
        { gene: 'GATA3', alteration: 'mutation', frequency: 14, role: 'luminal lineage factor',
          note: 'Near-exclusive to luminal disease.' },
        { gene: 'MAP3K1', alteration: 'loss-of-function', frequency: 14, role: 'tumour suppressor',
          note: 'Occurs almost exclusively in this subtype.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 12, role: 'tumour suppressor',
          note: 'Strikingly low — the defining contrast with basal-like disease.' },
        { gene: 'CDH1', alteration: 'loss-of-function', frequency: 12, role: 'cell adhesion',
          note: '30 of 36 CDH1-mutant cases in TCGA were lobular histology.' },
        { gene: 'MAP2K4', alteration: 'loss-of-function', frequency: 8, role: 'tumour suppressor' }
      ],
      pathways: [
        { name: 'ER signalling', status: 'highest activity of any subtype' },
        { name: 'p53', status: 'largely intact', note: 'The key difference from luminal B.' }
      ]
    },
    prognosis: {
    source: 'metabric',
      relativeOutlook: 'Best prognosis of the intrinsic subtypes.',
      fiveYearNote: 'Excellent early survival, but a persistent late-recurrence hazard. ' +
                    'Median overall survival 115.1 months in METABRIC (n=700, 378 deaths) — the longest ' +
                    'of any intrinsic subtype.',
      caveat: 'METABRIC is an older cohort, so absolute survival understates what is ' +
              'achievable today. Use these medians to rank subtypes against each other, not as current prognosis.'
    },
    related: [
      { to: 'hr-pos-her2-neg', kind: 'overlaps', note: 'Most luminal A tumours are HR+/HER2− by IHC, but the mapping is not one-to-one.' },
      { to: 'ilc', kind: 'shares-driver', note: 'CDH1 loss links luminal A to lobular histology.' }
    ]
  },
  {
    id: 'luminal-b', axis: 'pam50', parent: 'pam50-root',
    label: 'Luminal B', shortLabel: 'Luminal B', prevalence: 20,
    markers: { ER: '+', PR: 'low/−', HER2: '+/−' },
    summary: 'ER-positive but more proliferative, with lower PR and frequent TP53 inactivation. More likely to ' +
             'need chemotherapy and to recur early compared with luminal A.',
    triggers: [
      { factor: 'Hormonal factors', category: 'Hormonal', direction: 'increases', magnitude: 'moderate', evidence: 'moderate' },
      { factor: 'Obesity', category: 'Lifestyle', direction: 'increases', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 32, role: 'tumour suppressor',
          note: 'About 2.7× luminal A — the main molecular distinction.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 32, role: 'oncogene', druggable: true },
        { gene: 'GATA3', alteration: 'frameshift (exon 5)', frequency: 15, role: 'luminal lineage factor',
          note: 'A distinctive exon-5 frameshift pattern was seen in 7 of 9 TCGA luminal B cases.' },
        { gene: 'CCND1', alteration: 'amplification', role: 'oncogene' },
        { gene: 'MDM2', alteration: 'amplification', frequency: 10, role: 'p53 negative regulator' }
      ],
      pathways: [
        { name: 'ER signalling', status: 'active but lower than luminal A' },
        { name: 'p53', status: 'frequently inactivated (TP53 mutated in 32%)',
          source: { ref: 'tcga-2012', quote: 'Summary of disease subtypes findings … TP53 mut (32%)' } },
        { name: 'Cyclin D–CDK4/6', status: 'amplified' }
      ]
    },
    prognosis: {
    source: 'metabric',
      relativeOutlook: 'Worse than luminal A; earlier recurrence and greater chemotherapy benefit.',
      fiveYearNote: 'Median overall survival 85.3 months in METABRIC (n=475, 315 deaths), ' +
                    'about 30 months short of luminal A.',
      caveat: 'METABRIC is a pre-2000 cohort — valid for ranking subtypes, not as current prognosis.'
    },
    related: [
      { to: 'triple-positive', kind: 'overlaps', note: 'HER2-positive luminal B corresponds to triple-positive disease.' },
      { to: 'er-pos-pr-neg', kind: 'overlaps', note: 'PR loss is characteristic of luminal B.' }
    ]
  },
  {
    id: 'her2-enriched', axis: 'pam50', parent: 'pam50-root',
    label: 'HER2-enriched', shortLabel: 'HER2-enriched', prevalence: 15,
    markers: { ER: '−', PR: '−', HER2: '+' },
    summary: 'A hybrid molecular pattern: high ERBB2 amplification alongside high TP53 mutation. Note the label ' +
             'trap — PAM50 "HER2-enriched" and IHC "HER2-positive" are not the same set. In the TCGA 2012 cohort ' +
             'roughly 30% of HER2-enriched tumours were HER2-negative by IHC (16/53), and only 36% matched the ' +
             'HER2+/HR− receptor pattern.',
    triggers: [
      { factor: 'TP53 germline variant (Li-Fraumeni)', category: 'Germline', source: 'tcga-2012', direction: 'increases',
        magnitude: 'very high', evidence: 'strong' },
      { factor: 'Younger age', category: 'Demographic', source: 'tcga-2012', direction: 'increases', magnitude: 'modest', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'amplification', frequency: 71, role: 'defining oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 75, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 42, role: 'oncogene', druggable: true },
        { gene: 'PIK3R1', alteration: 'mutation', frequency: 8, role: 'PI3K regulatory subunit' },
        { gene: 'APOBEC', alteration: 'mutational signature', frequency: 40, role: 'mutagenic process' }
      ],
      pathways: [
        { name: 'HER2 / ERBB2', status: 'the driver (17q12 focal amplification in 71%)',
          source: { ref: 'tcga-2012', quote: 'Summary of disease subtypes findings … 17q12 focal ERRB2 amp (71%)' } },
        { name: 'p53', status: 'inactivated in most cases (TP53 mutated in 75%)',
          source: { ref: 'tcga-2012', quote: 'Summary of disease subtypes findings … TP53 mut (75%)' } }
      ]
    },
    prognosis: {
    source: 'metabric',
      relativeOutlook: 'Aggressive but highly treatable with HER2-directed therapy.',
      fiveYearNote: 'Median overall survival 65.1 months in METABRIC (n=224, 157 deaths). ' +
                    'That cohort largely predates trastuzumab, so it measures the natural history ' +
                    'of HER2-enriched disease rather than its outcome under modern treatment.',
      caveat: 'The most misleading of the METABRIC medians if read as current prognosis — this is ' +
              'precisely the subtype whose outcomes HER2-directed therapy transformed.'
    },
    related: [{ to: 'her2-pos-hr-neg', kind: 'overlaps', strength: 0.36,
      note: 'Measured in the TCGA 2012 cohort: only 36% of HER2-enriched tumours are HER2+/HR− by IHC (19/53). ' +
            'Of the rest, 18 were triple-positive, 11 were HR+/HER2− and 5 were triple-negative. ' +
            'Treating the two labels as interchangeable is a common and material error.' }]
  },
  {
    id: 'basal-like', axis: 'pam50', parent: 'pam50-root',
    label: 'Basal-like', shortLabel: 'Basal-like', prevalence: 15,
    markers: { ER: '−', PR: '−', HER2: '−' },
    summary: 'Expression resembling basal/myoepithelial cells. Measured against IHC in the TCGA 2012 ' +
             'cohort: 83% of basal-like tumours are TNBC (76/92) and 86% of TNBC is basal-like (76/88). ' +
             'The residue in both directions is exactly why both classification axes are kept.',
    triggers: [
      { factor: 'BRCA1 germline variant', category: 'Germline', direction: 'increases',
        source: { ref: 'kuchenbaecker-brca', quote: 'The cumulative breast cancer risk to age 80 years was 72%  ' +
                           '(95% CI, 65%-79%) for BRCA1 and 69% (95% CI, 61%-77%) for BRCA2 carriers' },
        magnitude: '72% by age 80', evidence: 'strong',
        note: 'BRCA1-associated tumours are overwhelmingly basal-like.' },
      { factor: 'Younger age at diagnosis', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: 'marked', evidence: 'strong' },
      { factor: 'Black / African ancestry (US data)', category: 'Demographic', source: 'palmer-tnbc-repro', direction: 'increases', evidence: 'strong' },
      { factor: 'Breastfeeding', category: 'Hormonal', direction: 'decreases', evidence: 'strong' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'nonsense / frameshift mutation', frequency: 84, role: 'tumour suppressor',
          note: 'Near-universal, and predominantly truncating rather than missense.' },
        { gene: 'MYC', alteration: 'amplification', frequency: 40, role: 'oncogene' },
        { gene: 'PTEN', alteration: 'loss (incl. hemizygous)', frequency: 35, role: 'tumour suppressor', druggable: true },
        { gene: 'INPP4B', alteration: 'loss (incl. hemizygous)', frequency: 30, role: 'PI3K pathway brake' },
        { gene: 'BRCA1/2', alteration: 'germline and/or somatic variant', frequency: 20, role: 'DNA repair', druggable: true },
        { gene: 'RB1', alteration: 'deep deletion', frequency: 6.5, role: 'tumour suppressor',
          note: 'Co-occurs with cyclin E1 amplification. Deep deletions only (6/92 in TCGA 2012); ' +
                'counting hemizygous loss as well raises this to 44%, which is why published "RB1 loss" figures vary so widely.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 7, role: 'oncogene', druggable: true,
          note: 'Rare here — the mirror image of luminal A at 45%.' }
      ],
      pathways: [
        { name: 'p53', status: 'inactivated in most cases (TP53 mutated in 84%)',
          source: { ref: 'tcga-2012', quote: 'Summary of disease subtypes findings … TP53 mut (84%)' } },
        { name: 'RB / cyclin E', status: 'disrupted', note: 'Predicts CDK4/6-inhibitor resistance.' },
        { name: 'Homologous recombination repair', status: 'frequently deficient' },
        { name: 'PI3K', status: 'activated via PTEN/INPP4B loss rather than PIK3CA mutation' }
      ]
    },
    prognosis: {
    source: 'metabric',
      relativeOutlook: 'Aggressive, with an early recurrence peak.',
      fiveYearNote: 'Median overall survival 36.4 months in METABRIC (n=209, 115 deaths) — the ' +
                    'shortest of any intrinsic subtype, roughly a third of luminal A.',
      caveat: 'Shares the molecular architecture of high-grade serous ovarian cancer more than that ' +
              'of luminal breast cancer. METABRIC is a pre-2000 cohort: rank subtypes with these ' +
              'medians, do not read them as current prognosis.'
    },
    related: [
      { to: 'tnbc', kind: 'overlaps', strength: 0.83,
        note: 'Measured 83% in the TCGA 2012 cohort (76/92) — concordance, not identity.' },
      { to: 'metaplastic', kind: 'shares-driver' }
    ]
  },
  {
    id: 'normal-like', axis: 'pam50', parent: 'pam50-root',
    label: 'Normal-like', shortLabel: 'Normal-like', prevalence: 10,
    markers: { ER: '+', PR: '+', HER2: '−' },
    summary: 'The most contested PAM50 class. Widely suspected to be a sampling artefact — tumour specimens ' +
             'with a high proportion of normal breast tissue — rather than a real biological entity.',
    molecular: {
      drivers: [{ gene: 'TP53', alteration: 'mutation', frequency: 15, role: 'tumour suppressor' }],
      pathways: [{ name: 'Adipose / normal breast signature', status: 'dominant', note: 'The basis of the contamination hypothesis.' }]
    },
    prognosis: { caveat: 'Often excluded from analyses. Treat any prognostic claim about this class with suspicion.' }
  },

  /* ============================== AXIS 3 — HISTOLOGY ============================== */

  {
    id: 'hist-root', axis: 'histology', parent: null,
    label: 'Histologic types', shortLabel: 'Histology', prevalence: 100,
    summary: 'What the tumour looks like and how it grows. Mostly independent of receptor status, with two ' +
             'strong exceptions: lobular carcinoma is CDH1-driven and nearly always ER-positive, and metaplastic ' +
             'carcinoma is nearly always triple-negative.',
    molecular: {
      biomarkers: [{ name: 'E-cadherin (CDH1) IHC', use: 'distinguishes lobular from ductal', threshold: 'loss indicates lobular' }]
    },
    sources: [{ label: 'TCGA (Nature 2012)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3465532/' }]
  },
  {
    id: 'idc-nst', axis: 'histology', parent: 'hist-root',
    label: 'Invasive ductal carcinoma (NST)', shortLabel: 'IDC / NST', prevalence: 70,
    codes: { oncotree: 'IDC' },
    summary: 'The default diagnosis — "no special type" literally means it lacks the features that would place ' +
             'it elsewhere. Spans the full range of receptor subtypes and prognoses.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 35, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 35, role: 'oncogene', druggable: true }
      ]
    },
    prognosis: { relativeOutlook: 'Entirely dependent on grade, stage and receptor subtype.' },
    related: [{ to: 'dcis', kind: 'precursor-of', note: 'DCIS is the non-invasive precursor lesion.' }]
  },
  {
    id: 'ilc', axis: 'histology', parent: 'hist-root',
    label: 'Invasive lobular carcinoma', shortLabel: 'Lobular (ILC)', prevalence: 13,
    codes: { oncotree: 'ILC' },
    summary: 'Defined by E-cadherin loss, which makes the cells non-cohesive: they infiltrate in single-file ' +
             'strands instead of forming a mass. That growth pattern makes ILC frequently invisible on ' +
             'mammography and routinely underestimated on imaging — a practical, not just academic, problem.',
    triggers: [
      { factor: 'Germline CDH1 variant (hereditary diffuse gastric cancer)', category: 'Germline', direction: 'increases',
        source: { ref: 'hansford-cdh1', quote: 'By the age of 80 years ... the risk of breast cancer for females  ' +
                           'was 42% (95% CI, 23%-68%)' },
        magnitude: '42% by age 80', evidence: 'strong',
        note: 'Carriers also face high diffuse gastric cancer risk — the germline finding changes management well beyond the breast.' },
      { factor: 'Combined menopausal hormone therapy', category: 'Hormonal', source: 'cgh-mht', direction: 'increases',
        magnitude: 'stronger than for ductal', evidence: 'strong', note: 'HT is more strongly associated with lobular than ductal histology.' },
      { factor: 'Alcohol', category: 'Lifestyle', direction: 'increases', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'CDH1', alteration: 'biallelic loss-of-function', frequency: 85, role: 'cell adhesion',
          note: 'Definitional. 30 of 36 CDH1-mutant TCGA cases were lobular.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 45, role: 'oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 10, role: 'tumour suppressor', note: 'Low, consistent with luminal biology.' },
        { gene: 'FOXA1', alteration: 'mutation', frequency: 9, role: 'ER pioneer factor' },
        { gene: 'ERBB2', alteration: 'activating mutation (not amplification)', frequency: 5, role: 'oncogene', druggable: true,
          note: 'Point mutations rather than amplification — enriched in pleomorphic lobular disease.' }
      ],
      pathways: [{ name: 'Cell adhesion', status: 'lost', note: 'Drives the single-file infiltrative pattern.' }],
      biomarkers: [{ name: 'E-cadherin IHC', use: 'confirms lobular histology', threshold: 'loss of membranous staining' }]
    },
    prognosis: {
      relativeOutlook: 'Similar or slightly better than ductal at 5 years, but worse long-term due to late recurrence.',
      caveat: 'Distinctive metastatic pattern — peritoneum, GI tract, ovaries and leptomeninges rather than lung.'
    },
    related: [
      { to: 'hr-pos-her2-neg', kind: 'overlaps', note: '>90% of lobular carcinoma is HR-positive/HER2-negative.' },
      { to: 'luminal-a', kind: 'shares-driver', note: 'CDH1 loss is concentrated in luminal A.' },
      { to: 'lcis', kind: 'precursor-of', note: 'LCIS is a risk marker rather than an obligate precursor.' }
    ]
  },
  {
    id: 'insitu', axis: 'histology', parent: 'hist-root',
    label: 'In situ (non-invasive)', shortLabel: 'In situ', prevalence: 9,
    summary: 'Malignant cells confined by the basement membrane. Not yet capable of metastasis, which makes ' +
             'the central question one of over-treatment rather than under-treatment.',
    prognosis: { relativeOutlook: 'Excellent — near-normal life expectancy when managed.' }
  },
  {
    id: 'dcis', axis: 'histology', parent: 'insitu',
    label: 'Ductal carcinoma in situ (DCIS)', shortLabel: 'DCIS', prevalence: 7,
    codes: { oncotree: 'DCIS' },
    summary: 'Stage 0. Receptor status is still assessed, because ER-positive DCIS benefits from endocrine risk ' +
             'reduction. The unresolved question in the field is which DCIS would never have progressed at all — ' +
             'active-surveillance trials are ongoing.',
    triggers: [
      { factor: 'Screening mammography', category: 'Environmental', source: 'uspstf-screening', direction: 'increases', magnitude: 'detection effect',
        evidence: 'strong', note: 'DCIS incidence rose sharply with screening programmes — this is detection, not causation.' },
      { factor: 'Same hormonal risk profile as invasive ductal carcinoma', category: 'Hormonal', direction: 'increases',
        magnitude: '—', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 40, role: 'oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 20, role: 'tumour suppressor', note: 'Higher in high-grade DCIS.' },
        { gene: 'ERBB2', alteration: 'amplification', frequency: 30, role: 'oncogene',
          note: 'Paradoxically more common in DCIS than in invasive disease.' }
      ],
      biomarkers: [{ name: 'Nuclear grade + comedo necrosis', use: 'stratifies progression risk' }]
    },
    prognosis: {
      relativeOutlook: 'Excellent; breast-cancer mortality after treated DCIS is very low.',
      caveat: 'Over-diagnosis is a genuine harm here, not a hypothetical one.'
    },
    related: [{ to: 'idc-nst', kind: 'progresses-to', note: 'A subset progresses to invasive ductal carcinoma; most probably do not.' }]
  },
  {
    id: 'lcis', axis: 'histology', parent: 'insitu',
    label: 'Lobular carcinoma in situ (LCIS)', shortLabel: 'LCIS', prevalence: 2,
    summary: 'Despite the name, classical LCIS is treated as a risk marker rather than a true precursor — it ' +
             'signals elevated risk in both breasts, not a lesion destined to become cancer at that site.',
    molecular: {
      drivers: [{ gene: 'CDH1', alteration: 'loss-of-function', frequency: 80, role: 'cell adhesion' }]
    },
    prognosis: { relativeOutlook: 'Not cancer per se; confers roughly 1–2% annual risk of subsequent invasive cancer.' },
    related: [{ to: 'ilc', kind: 'precursor-of', note: 'Shares CDH1 loss with invasive lobular carcinoma.' }]
  },
  {
    id: 'special-hist', axis: 'histology', parent: 'hist-root',
    label: 'Special histologic types', shortLabel: 'Special types', prevalence: 8,
    summary: 'Uncommon patterns with distinctive behaviour. Some (mucinous, tubular) carry excellent prognoses; ' +
             'others (metaplastic, inflammatory) are among the most aggressive breast cancers.',
    prognosis: { relativeOutlook: 'Ranges from better-than-average to markedly worse depending on type.' }
  },
  {
    id: 'mucinous', axis: 'histology', parent: 'special-hist',
    label: 'Mucinous (colloid) carcinoma', shortLabel: 'Mucinous', prevalence: 2,
    summary: 'Tumour cells floating in extracellular mucin. Almost always ER-positive, low grade, and ' +
             'node-negative — one of the best-prognosis invasive histologies.',
    molecular: { drivers: [{ gene: 'TP53', alteration: 'mutation', frequency: 5, role: 'tumour suppressor', note: 'Very low.' }] },
    prognosis: { relativeOutlook: 'Excellent — better than IDC of equivalent stage.' }
  },
  {
    id: 'tubular', axis: 'histology', parent: 'special-hist',
    label: 'Tubular carcinoma', shortLabel: 'Tubular', prevalence: 1.5,
    summary: 'Well-formed tubular structures, low grade, almost always ER-positive. Excellent prognosis; often ' +
             'managed with de-escalated systemic therapy.',
    prognosis: { relativeOutlook: 'Excellent — survival approaches that of the general population.' }
  },
  {
    id: 'metaplastic', axis: 'histology', parent: 'special-hist',
    label: 'Metaplastic carcinoma', shortLabel: 'Metaplastic', prevalence: 1,
    codes: { oncotree: 'MBC' },
    summary: 'Carcinoma showing squamous, spindle-cell, chondroid or osseous differentiation. Almost always ' +
             'triple-negative and characteristically chemoresistant — among the hardest breast cancers to treat.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 70, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 45, role: 'oncogene', druggable: true,
          note: 'Unusually high for a triple-negative histology — a rare actionable opening.' },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 25, role: 'telomerase activation' },
        { gene: 'PTEN', alteration: 'loss', frequency: 30, role: 'tumour suppressor' }
      ],
      pathways: [{ name: 'EMT / Wnt', status: 'active', note: 'Drives chemoresistance.' }]
    },
    prognosis: { relativeOutlook: 'Poor — worse than conventional TNBC of matched stage.' },
    related: [
      { to: 'tnbc', kind: 'subset-of', note: 'Nearly always triple-negative.' },
      { to: 'tnbc-m', kind: 'overlaps', note: 'Clusters with the mesenchymal TNBC subtype.' }
    ]
  },
  {
    id: 'inflammatory', axis: 'histology', parent: 'special-hist',
    label: 'Inflammatory breast cancer', shortLabel: 'Inflammatory', prevalence: 0.5,
    summary: 'A clinical diagnosis, not a histologic one — redness, warmth and peau d\'orange caused by tumour ' +
             'emboli blocking dermal lymphatics. Frequently mistaken for mastitis, which delays diagnosis. ' +
             'Always at least stage IIIB by definition.',
    triggers: [
      { factor: 'Younger age at diagnosis', category: 'Demographic', source: 'seer-breast', direction: 'increases', magnitude: 'marked', evidence: 'strong' },
      { factor: 'Black ancestry (US data)', category: 'Demographic', source: 'palmer-tnbc-repro', direction: 'increases', magnitude: 'elevated incidence', evidence: 'moderate' },
      { factor: 'Obesity', category: 'Lifestyle', direction: 'increases', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 60, role: 'tumour suppressor' },
        { gene: 'ERBB2', alteration: 'amplification', frequency: 40, role: 'oncogene', druggable: true,
          note: 'Enriched relative to breast cancer overall.' }
      ],
      pathways: [{ name: 'Lymphovascular invasion', status: 'definitional', note: 'Dermal lymphatic tumour emboli cause the clinical picture.' }]
    },
    prognosis: {
      relativeOutlook: 'Among the poorest of any breast cancer presentation.',
      caveat: 'Diagnosed clinically — a skin biopsy showing dermal lymphatic invasion supports but is not required.'
    }
  },
  {
    id: 'papillary', axis: 'histology', parent: 'special-hist',
    label: 'Papillary carcinoma', shortLabel: 'Papillary', prevalence: 0.8,
    summary: 'Frond-like growth around fibrovascular cores. Usually ER-positive, often in older patients, with a favourable outlook.',
    prognosis: { relativeOutlook: 'Favourable.' }
  },
  {
    id: 'medullary', axis: 'histology', parent: 'special-hist',
    label: 'Medullary carcinoma', shortLabel: 'Medullary', prevalence: 0.7,
    summary: 'Densely lymphocyte-infiltrated, high-grade, usually triple-negative — yet with a better prognosis ' +
             'than its grade predicts. The immune infiltrate is the likely explanation, making it a natural ' +
             'analogue of the immunomodulatory TNBC subtype.',
    triggers: [
      { factor: 'BRCA1 germline variant', category: 'Germline', source: 'kuchenbaecker-brca', direction: 'increases', magnitude: 'enriched', evidence: 'strong' }
    ],
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 75, role: 'tumour suppressor' },
        { gene: 'BRCA1', alteration: 'germline variant', frequency: 30, role: 'DNA repair', druggable: true }
      ],
      pathways: [{ name: 'Immune infiltration', status: 'high', note: 'Likely explains the prognosis-grade mismatch.' }]
    },
    prognosis: { relativeOutlook: 'Better than grade alone would predict.' },
    related: [{ to: 'tnbc-im', kind: 'shares-driver', note: 'The histologic counterpart of the immunomodulatory TNBC subtype.' }]
  },
  {
    id: 'paget', axis: 'histology', parent: 'special-hist',
    label: 'Paget disease of the nipple', shortLabel: 'Paget', prevalence: 0.5,
    summary: 'Eczema-like change of the nipple-areolar skin caused by malignant cells migrating into the ' +
             'epidermis. Nearly always signals an underlying DCIS or invasive carcinoma, so the skin finding ' +
             'is a prompt to search deeper rather than a diagnosis in itself.',
    molecular: {
      drivers: [{ gene: 'ERBB2', alteration: 'overexpression', frequency: 80, role: 'oncogene', druggable: true,
        note: 'Unusually high — a hallmark of the Paget cell.' }]
    },
    prognosis: { relativeOutlook: 'Determined by the underlying tumour, not by the skin change.' },
    related: [{ to: 'dcis', kind: 'overlaps', note: 'Underlying DCIS is present in the large majority of cases.' }]
  },
  {
    id: 'male-bc', axis: 'histology', parent: 'special-hist',
    label: 'Male breast cancer', shortLabel: 'Male BC', prevalence: 1,
    summary: 'About 1% of breast cancer. Overwhelmingly ER-positive and ductal — lobular carcinoma is rare ' +
             'because men lack developed lobules. Historically excluded from trials, so much of its management ' +
             'is extrapolated from female disease rather than evidenced directly.',
    markers: { ER: '+', PR: '+', HER2: '−' },
    triggers: [
      { factor: 'BRCA2 germline variant', category: 'Germline', source: 'tai-male-brca', direction: 'increases',
        evidence: 'strong', note: 'The dominant hereditary factor in men — far more than BRCA1.' },
      { factor: 'Klinefelter syndrome (47,XXY)', category: 'Germline', direction: 'increases', magnitude: '19.2-fold incidence',
        source: { ref: 'swerdlow-klinefelter', quote: 'The largest study found 19.2- and 57.8-fold increases in  ' +
                           'incidence and mortality, respectively' },
        evidence: 'strong', note: 'An altered androgen-to-estrogen ratio is one of the explanations offered.' },
      { factor: 'Gynecomastia / elevated estrogen states', category: 'Hormonal', source: 'wcrf-cup', direction: 'increases',
        magnitude: 'variable', evidence: 'moderate', note: 'Includes cirrhosis and obesity.' },
      { factor: 'Chest radiation', category: 'Environmental', direction: 'increases', magnitude: 'elevated', evidence: 'moderate' }
    ],
    molecular: {
      drivers: [
        { gene: 'BRCA2', alteration: 'germline variant', frequency: 10, role: 'DNA repair', druggable: true },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 20, role: 'oncogene', druggable: true },
        { gene: 'GATA3', alteration: 'mutation', frequency: 15, role: 'luminal lineage factor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 15, role: 'tumour suppressor', note: 'Lower than in female breast cancer.' }
      ]
    },
    prognosis: {
      relativeOutlook: 'Stage-for-stage similar to female breast cancer.',
      caveat: 'Later stage at presentation is common, largely from low awareness and delayed diagnosis.'
    },
    therapies: [{ name: 'Tamoxifen', class: 'endocrine', setting: 'adjuvant', status: 'standard — preferred over AIs as monotherapy in men' }],
    related: [{ to: 'hr-pos-her2-neg', kind: 'overlaps', note: 'The great majority is HR-positive/HER2-negative.' }]
  },

  /* ============================== AXIS 4 — HER2 EXPRESSION ============================== */

  {
    id: 'her2-root', axis: 'her2exp', parent: null,
    label: 'HER2 expression spectrum', shortLabel: 'HER2 spectrum', prevalence: 100,
    summary: 'A therapy-selection axis invented by a drug, not a taxonomy discovered by pathologists. ' +
             'Trastuzumab deruxtecan carries a cytotoxic payload that kills the cell and its neighbours, so it ' +
             'works far below the classic amplification threshold — which forced the field to subdivide ' +
             '"HER2-negative" into categories it had never needed before.',
    molecular: {
      biomarkers: [{ name: 'HER2 IHC', use: 'now gates ADC eligibility across the whole 0–3+ range',
        threshold: 'the 0 vs 1+ boundary is the contested one',
        source: { ref: 'asco-cap-her2', quote: 'a new indication for trastuzumab deruxtecan when HER2 is not overexpressed ' +
                                               'or amplified but is immunohistochemistry (IHC) 1+ or 2+ without ' +
                                               'amplification by in situ hybridization. … best practices to ' +
                                               'distinguish IHC 0 from 1+ are now clinically relevant' } }]
    },
    prognosis: { caveat: 'ASCO/CAP holds that HER2-low is not a distinct biological subtype with its own prognosis.' },
    sources: [{ label: 'ASCO–CAP HER2 testing guideline update (JCO)', url: 'https://ascopubs.org/doi/10.1200/JCO.22.02864' }]
  },
  {
    id: 'her2-positive', axis: 'her2exp', parent: 'her2-root',
    label: 'HER2-positive (IHC 3+ or ISH+)', shortLabel: 'HER2+', prevalence: 15,
    markers: { HER2: '3+ or ISH+' },
    summary: 'Classic HER2 amplification — genuine oncogene addiction, and the group for which the entire ' +
             'HER2-directed armamentarium was built.',
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'amplification', frequency: 100, role: 'defining oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 65, role: 'tumour suppressor' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 35, role: 'oncogene', druggable: true }
      ]
    },
    prognosis: { relativeOutlook: 'Excellent with HER2-directed therapy; poor without it.' },
    therapies: [
      { name: 'Trastuzumab, pertuzumab, T-DM1, T-DXd, tucatinib', class: 'HER2-directed', setting: 'all settings', status: 'approved',
    source: [{ nct: 'NCT04784715', label: 'DESTINY-Breast09' }, { nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }] }
    ],
    related: [
      { to: 'her2-pos-hr-neg', kind: 'overlaps' },
      { to: 'triple-positive', kind: 'overlaps' }
    ]
  },
  {
    id: 'her2-low', axis: 'her2exp', parent: 'her2-root',
    label: 'HER2-low (IHC 1+, or 2+/ISH−)', shortLabel: 'HER2-low', prevalence: 45,
    markers: { HER2: '1+ or 2+/ISH−' },
    summary: 'Roughly half of all HER2-negative disease. Cuts across HR status entirely — it is not a fifth box ' +
             'in the receptor matrix but a layer sitting on top of it. Created by DESTINY-Breast04, which showed ' +
             'T-DXd works at expression levels long considered irrelevant.',
    triggers: [
      { factor: 'No distinct risk profile', category: 'Demographic', source: 'tcga-2012', direction: 'mixed', magnitude: '—',
        evidence: 'moderate', note: 'HER2-low tumours inherit the risk profile of their underlying HR subtype. ' +
                                    'This is a therapy category, not an etiologic one.' }
    ],
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'low-level expression without amplification', frequency: 100, role: 'ADC target', druggable: true,
          note: 'Not a driver — a delivery address for the payload.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 35, role: 'oncogene', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 35, role: 'tumour suppressor' }
      ],
      biomarkers: [{ name: 'HER2 IHC 1+ / 2+ ISH-negative', use: 'selects T-DXd',
        threshold: 'poorly reproducible at the 0 vs 1+ boundary',
        source: [{ ref: 'asco-cap-her2', quote: 'a new indication for trastuzumab deruxtecan when HER2 is not overexpressed ' +
                                                'or amplified but is immunohistochemistry (IHC) 1+ or 2+ without ' +
                                                'amplification by in situ hybridization. … best practices to ' +
                                                'distinguish IHC 0 from 1+ are now clinically relevant' },
                 { nct: 'NCT03734029', label: 'DESTINY-Breast04' }] }]
    },
    prognosis: {
      relativeOutlook: 'Prognosis tracks the underlying HR subtype, not HER2-low status itself.',
      caveat: 'The IHC 0 vs 1+ call is unstable between pathologists and across samples from the same patient — ' +
              'so a category that now gates access to an effective drug rests on a measurement the field ' +
              'openly admits is unreliable at exactly the boundary that matters.'
    },
    therapies: [{ name: 'T-DXd (Enhertu)', class: 'HER2 ADC', setting: '2L+ metastatic', status: 'approved 2022-08-05',
    source: [{ nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }, { nct: 'NCT03529110', label: 'DESTINY-Breast03' }] }],
    related: [
      { to: 'hr-pos-her2-neg', kind: 'overlaps', note: 'The majority of HER2-low disease is hormone-receptor positive.' },
      { to: 'tnbc', kind: 'overlaps', note: 'A substantial minority of TNBC is HER2-low.' }
    ]
  },
  {
    id: 'her2-ultralow', axis: 'her2exp', parent: 'her2-root',
    label: 'HER2-ultralow (IHC 0 with faint staining)', shortLabel: 'HER2-ultralow', prevalence: 15,
    markers: { HER2: '0 with faint incomplete staining' },
    summary: 'IHC 0 but with faint, incomplete membrane staining in ≤10% of cells. Introduced by ' +
             'DESTINY-Breast06, which extended T-DXd benefit below even the HER2-low floor — pushing the ' +
             'useful threshold down to a level pathologists were never asked to report.',
    molecular: {
      drivers: [{ gene: 'ERBB2', alteration: 'minimal expression', frequency: 100, role: 'ADC target', druggable: true }],
      biomarkers: [{ name: 'HER2 IHC 0 with faint incomplete staining', use: 'selects T-DXd after endocrine therapy',
        threshold: 'faint and incomplete', source: ['asco-cap-her2', { nct: 'NCT04494425', label: 'DESTINY-Breast06' }] }]
    },
    prognosis: { caveat: 'Reproducibility here is worse than for HER2-low. Assays purpose-built for the low range are an active area of work.' },
    therapies: [{ name: 'T-DXd (Enhertu)', class: 'HER2 ADC', setting: 'after ≥1 line endocrine therapy', status: 'approved 2025-01-27',
    source: [{ nct: 'NCT03734029', label: 'DESTINY-Breast04' }, { nct: 'NCT04494425', label: 'DESTINY-Breast06' }, { nct: 'NCT03529110', label: 'DESTINY-Breast03' }] }],
    related: [{ to: 'her2-low', kind: 'overlaps', note: 'The boundary between them is the least reproducible call in the whole axis.' }]
  },
  {
    id: 'her2-zero', axis: 'her2exp', parent: 'her2-root',
    label: 'HER2-zero (IHC 0, no staining)', shortLabel: 'HER2-zero', prevalence: 25,
    markers: { HER2: '0' },
    summary: 'No detectable HER2 at all. The only group with no HER2-directed option — which is precisely why ' +
             'TROP2-targeted ADCs matter here: they ignore HER2 status entirely and so sidestep the ' +
             'unreliable IHC 0-vs-1+ call.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 45, role: 'tumour suppressor' },
        { gene: 'TACSTD2 (TROP2)', alteration: 'expression', frequency: 80, role: 'alternative ADC target', druggable: true,
          note: 'Expression does not predict TROP2-ADC benefit — the drugs work regardless.' }
      ]
    },
    therapies: [
      { name: 'Sacituzumab govitecan / datopotamab deruxtecan', class: 'TROP2 ADC', setting: 'metastatic', status: 'approved',
    source: [{ nct: 'NCT03901339', label: 'TROPiCS-02' }, { nct: 'NCT05104866', label: 'TROPION-Breast01' }, { nct: 'NCT02574455', label: 'ASCENT' }] }
    ],
    related: [{ to: 'her2-ultralow', kind: 'overlaps', note: 'Separated only by faint staining that is hard to call consistently.' }]
  },

  /* ============================== AXIS 5 — DISEASE STATE ==============================

     Built second, after prostate's, on the same pipeline concept. Two nodes carry
     figures computed from two DIFFERENT cohorts — TCGA's primary tumours and MSK's
     metastatic biopsies — because the treated disease is a different cohort and
     not a subtype of the untreated one. `state-early` and `state-metastatic` are a
     contract with pipeline/cxp/cancers.py `cohort_nodes`.

     The metastatic cohort is a SLICE of Razavi 2018, which also sequenced primary
     tumours; its whole-study ESR1 rate (7.5%) blends the two. The de novo and
     recurrent children carry curated shares only: splitting the MSK metastases by
     stage at diagnosis was tried and barely separates them (see pipeline/README.md).

     Figures quoted in notes that are not on the node's own computed card (the
     hormone-receptor-positive slices, the MBCproject split) are declared as
     `contrasts` on the metastatic cohort node in pipeline/cxp/cancers.py, counted
     on every `run.py molecular`, and emitted into breast.facts.js. `run.py audit`
     checks every "X% (n of N)" on a cohort node against them.
  ==================================================================================== */

  {
    id: 'state-root', axis: 'state', parent: null,
    label: 'All breast cancer', shortLabel: 'All breast cancer',
    prevalence: 100,
    summary: 'Every other axis here sorts the tumour as it looks when it is found. This one follows ' +
             'the disease afterwards and splits it by the furthest point it ever reaches: most breast ' +
             'cancer is treated and never reaches distant organs; some already has when it is found; ' +
             'and some comes back years later, somewhere else. The disease that comes back has been ' +
             'through treatment, and the genes of metastatic biopsies show it.',
    molecular: {
      pathways: [
        { name: 'Estrogen receptor signalling', status: 'the treatment target, and then the escape route',
          note: 'ESR1, the gene for the receptor itself, is mutated in 0.4% of primary tumours and 13.0% ' +
                'of metastatic biopsies in the two cohorts on this axis. The mutations switch the ' +
                'receptor on without estrogen, which is exactly what an aromatase inhibitor takes away.',
          source: ['tcga-2012', 'razavi-2018'] }
      ]
    },
    prognosis: {
      source: ['acs-key-stats', 'seer-breast'],
      relativeOutlook: 'From a disease most women are cured of, to one treated for years and not cured.',
      fiveYearNote: 'About 1 in 8 US women is diagnosed with breast cancer in her lifetime and about 1 ' +
                    'in 43 dies of it. Five-year relative survival is 100.0% for disease found ' +
                    'localised and 33.8% for disease found already metastatic.',
      caveat: 'The two nodes with computed figures come from different cohorts, sequenced on ' +
              'different assays. That is unavoidable — nobody samples the same tumour before and ' +
              'after years of treatment at this scale — and it means every comparison on this axis ' +
              'is between populations, not within patients.'
    },
    sources: [
      { label: 'TCGA primary tumours (825 women, 507 sequenced) and MSK metastatic biopsies (905 women, one each) via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=breast_msk_2018' }
    ]
  },

  {
    id: 'state-early', axis: 'state', parent: 'state-root',
    label: 'Never becomes metastatic', shortLabel: 'Never metastatic',
    prevalence: 82,
    summary: 'Most breast cancer. This node covers everyone whose disease never spreads beyond the ' +
             'breast and the nearby lymph nodes — cured by surgery, radiotherapy and drug treatment, ' +
             'or coming back only in the breast or chest wall, where it is still treated with the ' +
             'aim of cure.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 37.5, role: 'tumour suppressor',
          note: 'Essentially the same as in the metastatic biopsies (39.0%). TP53 is the check on this ' +
                'axis: it is mutated far more often in ER-negative disease, so if the two cohorts held ' +
                'different mixes of subtypes, this is the number that would move.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 35.3, role: 'oncogene', druggable: true,
          note: 'Also unchanged (35.9% in metastases): a driver present from the start, not one ' +
                'selected by treatment.' },
        { gene: 'ESR1', alteration: 'activating mutation', frequency: 0.4, role: 'acquired resistance', druggable: true,
          note: 'Two tumours in 507. Almost absent before treatment, which is why a primary-tumour ' +
                'cohort cannot see the resistance the oral SERDs were built for.' },
        { gene: 'ERBB2', alteration: 'activating mutation', frequency: 1.4, role: 'oncogene', druggable: true,
          note: 'Point mutation, not the familiar amplification — which this cohort finds in 12.9% of tumours.' }
      ]
    },
    prognosis: {
      source: ['seer-breast', { ref: 'pan-2017', quote: 'women with ER-positive breast cancer who were disease-free after 5 years of ' +
                                                'scheduled endocrine therapy … Breast-cancer recurrences occurred at a steady ' +
                                                'rate throughout the study period from 5 to 20 years. … with risks ranging ' +
                                                'from 10 to 41%, depending on TN status and tumor grade' }],
      relativeOutlook: 'Normal or near-normal life expectancy for most.',
      fiveYearNote: 'Five-year relative survival is 100.0% for disease found localised and 87.5% for ' +
                    'disease found in the regional lymph nodes.',
      caveat: 'The figures on this node are computed from TCGA primary tumours, which stand in for ' +
              'the node rather than define it: some of those women\'s disease will have become ' +
              'metastatic later, and nothing in a primary-tumour cohort says whose. For hormone-' +
              'receptor-positive disease that uncertainty lasts decades. Among women free of ' +
              'recurrence after five years of endocrine therapy, the EBCTCG overview found distant ' +
              'recurrence continuing steadily from year 5 to year 20, at 10% to 41% depending on ' +
              'tumour size, nodal status and grade.'
    }
  },

  {
    id: 'state-metastatic', axis: 'state', parent: 'state-root',
    label: 'Becomes metastatic', shortLabel: 'Metastatic',
    prevalence: 18,
    summary: 'About one diagnosis in six ends here, and about a third of those are already metastatic ' +
             'when they are found. Metastatic breast cancer is treated for years and, today, not ' +
             'cured. It is also where treatment leaves a mark on the genome that a primary tumour ' +
             'almost never carries.',
    molecular: {
      drivers: [
        { gene: 'ESR1', alteration: 'ligand-independent activating mutation', frequency: 13.0, role: 'acquired resistance', druggable: true,
          note: 'Against 0.4% in primary tumours. Counting only hormone-receptor-positive metastases, the ' +
                'same cohort gives 16.7% (112 of 672); its own primary tumours, sequenced on the same ' +
                'panel, give 2.4% (19 of 777) — so the rise is not an artefact of comparing two assays.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 39.0, role: 'tumour suppressor',
          note: 'Unchanged from primary tumours (37.5%) — the sign that the two cohorts are not simply ' +
                'different mixes of subtypes.' },
        { gene: 'PIK3CA', alteration: 'activating mutation', frequency: 35.9, role: 'oncogene', druggable: true,
          note: 'Unchanged (35.3% in primary tumours).' },
        { gene: 'ERBB2', alteration: 'activating mutation', frequency: 5.4, role: 'oncogene', druggable: true,
          note: 'Nearly four times the primary-tumour rate (1.4%).' }
      ],
      pathways: [
        { name: 'Estrogen receptor, switched on without estrogen', status: 'the main escape from aromatase inhibitors',
          note: 'Seen in a second, unrelated cohort as well. In the Metastatic Breast Cancer Project, a ' +
                'patient-partnered study, ESR1 is mutated in 2.0% of women whose sample was taken before ' +
                'any treatment (3 of 147) and 16.8% of women whose sample was taken after it (20 of 119).',
          source: { label: 'The Metastatic Breast Cancer Project, provisional December 2021 release — split by CALC_TREATMENT_NAIVE, one sample per patient (cBioPortal)',
                    url: 'https://www.cbioportal.org/study/summary?id=brca_mbcproject_2022' } }
      ],
      biomarkers: [
        { name: 'ESR1 mutation (ctDNA)', use: 'selects an oral SERD once endocrine therapy has failed',
          source: [{ nct: 'NCT03778931', label: 'EMERALD' }, { nct: 'NCT04975308', label: 'EMBER-3' }] }
      ]
    },
    prognosis: {
      source: ['seer-breast', { ref: 'razavi-2018', quote: 'We integrated the genomic sequencing of 1,918 breast ' +
                                                          'cancers … In 692 tumors previously exposed to hormonal ' +
                                                          'therapy' }],
      relativeOutlook: 'Treated for years, through a sequence of endocrine, targeted and chemotherapy ' +
                       'options. Not curable today.',
      fiveYearNote: 'Five-year relative survival for breast cancer found already metastatic is 33.8%.',
      caveat: 'The figures on this node are computed from biopsies of metastases in the MSK cohort ' +
              '(905 women, one biopsy each), not from primary tumours. The study reports 692 of its ' +
              '1,918 tumours as previously exposed to hormonal therapy, so much of what it measures ' +
              'is disease that had already been treated — which is the point of the node, and also ' +
              'why these percentages describe biopsied metastatic disease at a referral centre, not an ' +
              'average patient. Copy-number figures do not compare with the primary-tumour node: the ' +
              'two cohorts were measured on different assays, so an apparent fall in MYC amplification ' +
              'cannot be read as biology. CDH1 and GATA3 mutations are also more common here, and ' +
              'nothing in these two cohorts says why.'
    },
    therapies: [
      { name: 'Elacestrant, imlunestrant, vepdegestrant', class: 'oral SERD / degrader',
        setting: 'ESR1-mutant, after endocrine therapy', status: 'approved',
        source: [{ nct: 'NCT03778931', label: 'EMERALD' }, { nct: 'NCT04975308', label: 'EMBER-3' }, { nct: 'NCT05654623', label: 'VERITAC-2' }] },
      { name: 'Camizestrant, switched in when an ESR1 mutation appears in blood', class: 'oral SERD',
        setting: 'first-line, before progression shows on a scan', status: 'filed',
        source: [{ nct: 'NCT04964934', label: 'SERENA-6' }] }
    ],
    related: [
      { to: 'hr-pos-her2-neg', kind: 'overlaps',
        note: 'The receptor group in which ESR1 resistance mostly arises. It is essentially absent from ' +
              'hormone-receptor-negative metastases.' }
    ],
    sources: [
      { label: 'Breast Cancer (MSK, Cancer Cell 2018) — metastatic biopsies, 905 women',
        url: 'https://www.cbioportal.org/study/summary?id=breast_msk_2018' }
    ]
  },

  {
    id: 'state-denovo', axis: 'state', parent: 'state-metastatic',
    label: 'Metastatic when first found', shortLabel: 'De novo',
    prevalence: 6,
    summary: 'Breast cancer that has already spread to distant organs by the time it is diagnosed. ' +
             'It has had no treatment before that point, so whatever resistance it later shows was ' +
             'selected afterwards.',
    prognosis: {
      source: 'seer-breast',
      fiveYearNote: 'SEER finds 6% of breast cancers metastatic at diagnosis, with five-year relative ' +
                    'survival of 33.8%.',
      caveat: 'No computed figures on this node, deliberately. The MSK cohort records stage at ' +
              'diagnosis, but splitting its metastatic biopsies that way barely separates ESR1 ' +
              'mutation rates — stage at diagnosis says nothing about how much treatment came before ' +
              'the biopsy.'
    }
  },

  {
    id: 'state-recurrent', axis: 'state', parent: 'state-metastatic',
    label: 'Returns as metastatic disease', shortLabel: 'Recurrent',
    prevalence: 12,
    summary: 'Breast cancer treated as early disease that comes back in distant organs — bone, liver, ' +
             'lung or brain — sometimes within a few years and sometimes two decades later. This is ' +
             'most metastatic breast cancer. In hormone-receptor-positive disease it has usually been ' +
             'through years of endocrine therapy before it returns, which is exactly the pressure an ' +
             'ESR1 mutation answers.',
    prognosis: {
      source: ['acs-key-stats', 'seer-breast',
               { ref: 'mariotto-2017', quote: 'there will be 154,794 women living with MBC in the United States, ' +
                                              'three in four initially diagnosed with stage I-III breast cancer who ' +
                                              'later progressed to MBC' },
               { ref: 'pan-2017', quote: 'women with ER-positive breast cancer who were disease-free after 5 years of ' +
                                                 'scheduled endocrine therapy … Breast-cancer recurrences occurred at a steady ' +
                                                 'rate throughout the study period from 5 to 20 years. … with risks ranging ' +
                                                 'from 10 to 41%, depending on TN status and tumor grade' }],
      fiveYearNote: 'About 12% of all diagnoses, estimated by subtraction: about 18% become metastatic ' +
                    'and 6% are metastatic when found. Counted a different way — among US women living ' +
                    'with metastatic breast cancer — about three in four were first diagnosed at stage ' +
                    'I to III.',
      caveat: 'Estimated, not counted: this node is the remainder after the two figures above. The ' +
              'risk behind it is long. Among women free of recurrence after five years of endocrine ' +
              'therapy, the EBCTCG overview found distant recurrence continuing steadily from year 5 ' +
              'to year 20, at 10% to 41% depending on tumour size, nodal status and grade.'
    },
    related: [
      { to: 'hr-pos-her2-neg', kind: 'overlaps',
        note: 'Late recurrence is characteristic of this receptor group, and it is where ESR1 ' +
              'resistance arises.' }
    ]
  }

  ]
});
