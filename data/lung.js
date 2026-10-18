/* data/lung.js — Lung cancer dataset for the Cancer Subtype Explorer.
 *
 * Four axes: histology (the default), driver class, PD-L1 expression, and the
 * EGFR resistance contrast. Targets and literature follow in phase 7.
 *
 * Three of the four describe only part of the disease, and say so with
 * `axes[].population`. The fourth is not a partition at all — its two nodes
 * are compared cohorts that share 32 patients — and says so with
 * `partition: false`.
 *
 * ---- The axis that flips ------------------------------------------------
 *
 * In breast the molecular classification "decides little, directly"; in
 * prostate it "decides nothing, today". In lung it is the classification
 * treatment follows: a named driver picks the first drug. So the driver axis
 * is not a curiosity kept for its disagreement with the report — it is the
 * report's most consequential line.
 *
 * ---- TWO DIFFERENT BASES, and a third thing that is not a share ----------
 *
 *   - HISTOLOGY shares are of ALL lung cancer, derived from ACS Cancer Facts &
 *     Figures 2023, special section Figure S2 (NAACCR, US, 2015–2019). The
 *     figure reports men and women separately and gives the non-small-cell
 *     types as shares of NON-SMALL-CELL cases, so each number below is
 *     (sex's NSCLC share × subtype share of NSCLC), weighted by ACS's own 2023
 *     case estimates on the same page: 117,550 men and 120,790 women.
 *       adenocarcinoma  0.82×52 (men), 0.80×62 (women)  -> 46.2
 *       squamous        0.82×35,       0.80×24          -> 23.9
 *       other NSCLC     0.82×11,       0.80×12          ->  9.3
 *       large cell      0.82×2,        0.80×1           ->  1.2
 *       NSCLC 82 / 80 -> 81.0   SCLC 13 / 14 -> 13.5   other 5 / 6 -> 5.5
 *     The source rounds to whole percents, so each derived share carries about
 *     a point of uncertainty. SEER has no lungb-subtypes page (404, checked
 *     2026-09-13), which is why this is curated rather than fetched.
 *   - DRIVER shares are of ADENOCARCINOMA only, computed by pipeline/run.py
 *     from MSK lung_msk_2017 (860 patients, one tumour each). The axis says so
 *     with `population`, and every share it prints reads "of adenocarcinoma".
 *   - The computed figures ON histology nodes come from other cohorts again:
 *     TCGA pan-lung for adenocarcinoma and squamous, Cologne for small cell.
 *     Each node's overlay record carries its own cohort block.
 *
 * Node ids on the driver axis are a CONTRACT with pipeline/cxp/cancers.py:
 * drv-kras, drv-egfr, drv-egfr-ex20, drv-alk, drv-ros1, drv-ret, drv-met,
 * drv-braf, drv-erbb2, drv-other, drv-none. Histology ids hist-adeno,
 * hist-squamous and hist-sclc are a contract for the cohort nodes.
 *
 * Verified 2026-09-13.
 */
CancerExplorer.register({

  id: 'lung',
  name: 'Lung Cancer',
  synonyms: ['lung carcinoma', 'bronchogenic carcinoma', 'NSCLC', 'SCLC'],
  overview: 'Sorted first by what the cells look like, which is the fork every later decision ' +
            'hangs from, and then — for adenocarcinoma — by which single gene is driving it. ' +
            'Here, unlike breast or prostate, the molecular classification is the one treatment follows.',
  incidence: '~229,410 new US cases and ~124,990 deaths estimated for 2026; 20.0% of all cancer deaths',
  lastVerified: '2026-09-13',

  references: [
    { id: 'seer-lung', label: 'SEER Cancer Stat Facts: Lung and Bronchus Cancer — incidence, mortality, stage and survival',
      journal: 'NCI SEER, 2026 estimates', url: 'https://seer.cancer.gov/statfacts/html/lungb.html' },
    { id: 'acs-cff-2023', label: 'American Cancer Society — Cancer Facts & Figures 2023, Special Section: Lung Cancer (histology Figure S2, survival Figure S11)',
      journal: 'ACS 2023', url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' },
    { id: 'msk-2017', label: 'Jordan et al — prospective comprehensive molecular characterization of lung adenocarcinomas (860 patients, MSK)',
      journal: 'Cancer Discov 2017', pmid: '28336552', url: 'https://www.cbioportal.org/study/summary?id=lung_msk_2017' },
    { id: 'tcga-panlung', label: 'Campbell et al — distinct patterns of somatic genome alterations in lung adenocarcinomas and squamous cell carcinomas (TCGA, 1,144 tumours)',
      journal: 'Nat Genet 2016', pmid: '27158780', url: 'https://www.cbioportal.org/study/summary?id=nsclc_tcga_broad_2016' },
    { id: 'george-sclc', label: 'George et al — comprehensive genomic profiles of small cell lung cancer',
      journal: 'Nature 2015', pmid: '26168399', url: 'https://www.cbioportal.org/study/summary?id=sclc_ucologne_2015' },
    { id: 'rudin-sclc', label: 'Rudin et al — molecular subtypes of small cell lung cancer: a synthesis of human and mouse model data',
      journal: 'Nat Rev Cancer 2019', pmid: '30926931', url: 'https://pubmed.ncbi.nlm.nih.gov/30926931/' },
    { id: 'who-2021', label: 'Nicholson et al — The 2021 WHO Classification of Lung Tumors: impact of advances since 2015',
      journal: 'J Thorac Oncol 2022', pmid: '34808341', url: 'https://pubmed.ncbi.nlm.nih.gov/34808341/' },
    { id: 'travis-2013', label: 'Travis et al — diagnosis of lung cancer in small biopsies and cytology (IASLC/ATS/ERS)',
      journal: 'Arch Pathol Lab Med 2013', pmid: '22970842', url: 'https://pubmed.ncbi.nlm.nih.gov/22970842/' },
    { id: 'gainor-alk', label: 'Gainor et al — ALK rearrangements are mutually exclusive with mutations in EGFR or KRAS (1,683 patients)',
      journal: 'Clin Cancer Res 2013', pmid: '23729361', url: 'https://pubmed.ncbi.nlm.nih.gov/23729361/' },
    { id: 'oser-transform', label: 'Oser et al — transformation from non-small-cell lung cancer to small-cell lung cancer',
      journal: 'Lancet Oncol 2015', pmid: '25846096', url: 'https://pubmed.ncbi.nlm.nih.gov/25846096/' },
    { id: 'civic-lung', label: 'CIViC — curated predictive evidence across the fifteen lung cancer disease records',
      journal: 'queried 2026-09-13', url: 'https://civicdb.org/' },
    { id: 'villeneuve-mao', label: 'Villeneuve & Mao — lifetime probability of developing lung cancer, by smoking status, Canada',
      journal: 'Can J Public Health 1994', pmid: '7895211', url: 'https://pubmed.ncbi.nlm.nih.gov/7895211/' },
    { id: 'thun-2013', label: 'Thun et al — 50-year trends in smoking-related mortality in the United States',
      journal: 'N Engl J Med 2013', pmid: '23343064', url: 'https://pubmed.ncbi.nlm.nih.gov/23343064/' },
    { id: 'peto-2000', label: 'Peto et al — smoking, smoking cessation, and lung cancer in the UK since 1950',
      journal: 'BMJ 2000', pmid: '10926586', url: 'https://pubmed.ncbi.nlm.nih.gov/10926586/' },
    { id: 'zhong-ets', label: 'Zhong et al — exposure to environmental tobacco smoke and the risk of lung cancer: a meta-analysis',
      journal: 'Lung Cancer 2000', pmid: '10672779', url: 'https://pubmed.ncbi.nlm.nih.gov/10672779/' },
    { id: 'darby-radon', label: 'Darby et al — radon in homes and risk of lung cancer: 13 European case-control studies',
      journal: 'BMJ 2005', pmid: '15613366', url: 'https://pubmed.ncbi.nlm.nih.gov/15613366/' },
    { id: 'nlst-2011', label: 'National Lung Screening Trial Research Team — reduced lung-cancer mortality with low-dose CT screening',
      journal: 'N Engl J Med 2011', pmid: '21714641', url: 'https://pubmed.ncbi.nlm.nih.gov/21714641/' },
    { id: 'nelson-2020', label: 'de Koning et al — reduced lung-cancer mortality with volume CT screening (NELSON)',
      journal: 'N Engl J Med 2020', pmid: '31995683', url: 'https://pubmed.ncbi.nlm.nih.gov/31995683/' },
    { id: 'plco-2011', label: 'Oken et al — screening by chest radiograph and lung cancer mortality (PLCO)',
      journal: 'JAMA 2011', pmid: '22031728', url: 'https://pubmed.ncbi.nlm.nih.gov/22031728/' },
    { id: 'meza-2021', label: 'Meza et al — benefits and harms of low-dose CT screening: CISNET modelling for the USPSTF',
      journal: 'JAMA 2021', pmid: '33687469', url: 'https://pubmed.ncbi.nlm.nih.gov/33687469/' },
    { id: 'uspstf-2021', label: 'US Preventive Services Task Force — screening for lung cancer, recommendation statement',
      journal: 'JAMA 2021', pmid: '33687470', url: 'https://pubmed.ncbi.nlm.nih.gov/33687470/' },
    { id: 'bandi-2025', label: 'Bandi et al — lung cancer deaths prevented and life-years gained from screening (ACS release)',
      journal: 'JAMA 2025', pmid: '41259039', url: 'https://pressroom.cancer.org/2025-lung-cancer-data' },
    { id: 'zanazanian-2026', label: 'Zanazanian et al — screening eligibility and completion among adults diagnosed with lung cancer (NHIS 2024)',
      journal: 'Cancer Causes Control 2026', pmid: '42616166', url: 'https://pubmed.ncbi.nlm.nih.gov/42616166/' },
    { id: 'bray-2024', label: 'Bray et al — Global cancer statistics 2022 (GLOBOCAN)',
      journal: 'CA Cancer J Clin 2024', pmid: '38572751', url: 'https://pubmed.ncbi.nlm.nih.gov/38572751/' },
    { id: 'express-2019', label: 'Dietel et al — real-world prevalence of PD-L1 expression in advanced NSCLC (EXPRESS, 2,368 patients)',
      journal: 'Lung Cancer 2019', pmid: '31319978', url: 'https://pubmed.ncbi.nlm.nih.gov/31319978/' },
    { id: 'chmielecki-2023', label: 'Chmielecki et al — candidate mechanisms of acquired resistance to first-line osimertinib (FLAURA)',
      journal: 'Nat Commun 2023', pmid: '36849494', url: 'https://pubmed.ncbi.nlm.nih.gov/36849494/' },
    { id: 'msk-met-2023', label: 'Lengel et al — genomic mapping of metastatic organotropism in lung adenocarcinoma (MSK cohort on cBioPortal; samples annotated for prior targeted therapy)',
      journal: 'Cancer Cell 2023', pmid: '37084736', url: 'https://www.cbioportal.org/study/summary?id=luad_mskcc_2023_met_organotropism' },
    { id: 'label-pembrolizumab', label: 'Keytruda (pembrolizumab) US prescribing information — indications (effective 10 July 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:9333c79b-d487-4538-a9f0-71b91a02b287' },
    { id: 'label-nivolumab', label: 'Opdivo (nivolumab) US prescribing information — indications (effective 12 August 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:f570b9c4-6846-4de2-abfa-4d0a4ae4e394' },
    { id: 'label-atezolizumab', label: 'Tecentriq (atezolizumab) US prescribing information — indications (effective 20 May 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:6fa682c9-a312-4932-9831-f286908660ee' },
    { id: 'label-cemiplimab', label: 'Libtayo (cemiplimab) US prescribing information — indications (effective 31 August 2026)',
      journal: 'FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:4347ae1f-d397-4f18-8b70-03897e1c054a' }
  ],

  /* ---- profile (Layer 0) --------------------------------------------
     The front door. The registry numbers come from the generated overlay;
     what lives here is framing. For this cancer the first question someone
     arriving cold asks is usually not "which kind" but "did smoking cause it"
     — and the honest answer has two halves, so both are here.
  -------------------------------------------------------------------- */
  profile: {
    definition:
      'Lung cancer is the leading cause of cancer death in the US and in the world. It starts in ' +
      'the cells lining the airways and air sacs, grows without symptoms for a long time, and is ' +
      'usually found late: about half of all cases have already reached distant organs when they ' +
      'are diagnosed. Smoking is its most important cause — and it is not the only one.',

    definitionMore:
      'It is not infectious. It is also not one disease: a {{pathologist}} first decides whether ' +
      'it is {{SCLC|small cell}} or {{NSCLC|non-small cell}}, and the two are treated as different ' +
      'illnesses. For the commonest kind, {{adenocarcinoma}}, a second test now matters as much as ' +
      'the first — {{next-generation sequencing|sequencing}} the tumour for a {{driver}} such as ' +
      '{{EGFR}} or {{ALK}}, because a named driver usually decides the first drug. What a tumour is ' +
      'takes a {{biopsy}} to know; everything below follows from what that finds.',

    world: {
      newCasesPerYear: 2500000,
      deathsPerYear: 1800000,
      label: 'World',
      note: 'Modelled estimates for 2022 — almost 2.5 million new cases and 1.8 million deaths. Lung ' +
            'cancer is both the most commonly diagnosed cancer (12.4% of all cases) and the leading ' +
            'cause of cancer death (18.7%). Not a registry count, and not comparable with the US ' +
            'column beside it.',
      source: { label: 'Global cancer statistics 2022 (GLOBOCAN) — Bray et al, CA Cancer J Clin 2024',
                url: 'https://pubmed.ncbi.nlm.nih.gov/38572751/' }
    },

    classification:
      'There is no single correct way to sort lung cancer. Several are in use at once, and each ' +
      'sorts every tumour into groups on its own — so a tumour has several answers, all true. Each ' +
      'is a {{classification axis}} here. What is unusual about lung cancer is which one carries the ' +
      'weight: in breast and prostate the molecular classification decides little, and here it is ' +
      'the one treatment follows.',

    classificationClose:
      'The classifications reach into the person as well as the tumour. In the 860 adenocarcinomas ' +
      'the driver axis is built from, 58.7% of EGFR-driven tumours were in people who had never ' +
      'smoked, against 6.5% of KRAS-driven ones. That is not a subtype; it is a measured link ' +
      'between what someone breathed and which gene broke, and the Evidence lens draws the whole ' +
      'table rather than quoting the two cells that make the point.',

    reportIntro:
      'Those classifications are read off two documents. The {{pathology report}} names the ' +
      'histology, often with the stains that settled it. For adenocarcinoma a separate molecular ' +
      'report names the driver. These are the words the two use, and each one is a rung into the ' +
      'rest of this site.',

    reportTerms: [
      { term: 'Adenocarcinoma', axis: 'histology',
        plain: 'The commonest lung cancer, starting in the gland cells that make mucus. The word ' +
               'that sends a sample for driver testing.',
        goTo: 'hist-adeno' },

      { term: 'Squamous cell carcinoma', axis: 'histology',
        plain: 'A cancer of the flat cells lining the airways. Its targeted drugs are largely ' +
               'different ones from adenocarcinoma\'s.',
        goTo: 'hist-squamous' },

      { term: 'Small cell carcinoma', axis: 'histology',
        plain: 'The fast-spreading kind, treated as a separate disease from everything else on the ' +
               'report.',
        goTo: 'hist-sclc' },

      { term: 'TTF-1 / p40', marker: 'TTF1', axis: 'histology', axisRole: 'measures',
        plain: 'Two stains. {{TTF-1}} positive points to adenocarcinoma, {{p40}} positive to ' +
               'squamous — how a small biopsy that will not declare itself by eye gets classified.',
        goTo: 'hist-adeno' },

      { term: 'NSCLC, not otherwise specified', axis: 'histology',
        plain: 'A sample too small or too poorly differentiated to classify further. It is a ' +
               'statement about the biopsy, not a type of cancer.',
        goTo: 'hist-nsclc-other' },

      { term: 'EGFR, ALK, KRAS G12C', axis: 'driver',
        plain: 'Names on the molecular report. Each is a {{driver}}, and each selects a different ' +
               'drug — which is why the molecular report can matter more than the pathology one.',
        goTo: 'drv-egfr' },

      { term: 'PD-L1 TPS', marker: 'PDL1', axis: 'pdl1',
        plain: 'A stain scored as the percentage of tumour cells showing {{PD-L1}}, reported in ' +
               'bands. It guides how immunotherapy is used.',
        goTo: 'pdl1-high' },

      /* No `axis`: stage is on every report and is not one of the classifications. */
      { term: 'Stage',
        plain: 'How far it has spread — and for lung cancer, the number most found late. Half of ' +
               'all cases are distant at diagnosis.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Pack-years',
        plain: 'Packs smoked per day times years smoked. Not on a pathology report, but on the ' +
               'form that decides who is offered screening.',
        goToLens: 'risk', goToView: 'detection' }
    ],

    sources: [
      { label: 'SEER Cancer Stat Facts: Lung and Bronchus Cancer',
        url: 'https://seer.cancer.gov/statfacts/html/lungb.html' },
      { label: 'Global cancer statistics 2022 (GLOBOCAN) — Bray et al, CA Cancer J Clin 2024',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38572751/' }
    ]
  },

  /* ---- baseline -----------------------------------------------------
     The denominator every convertible multiplier converts against, fetched by
     pipeline/run.py incidence off the SEER page ("men and women" — the regex
     that read it was one of the phase-1 fixes).

     The strata are the reason `factors[].referent` exists. Smoking's relative
     risk is measured against never smokers, and the population baseline is
     mostly made of smokers. Villeneuve & Mao give both sides in one source:
     lifetime risk 17.2% for male current smokers, 1.3% for men who never
     smoked, 9.6% for all men. Multiply the never-smoker ratio (13.2) by the
     all-men figure and you get 127%. So the smoking rows carry smokers' own
     lifetime risk, against these never-smoker strata, and nothing multiplies
     across the two.
  -------------------------------------------------------------------- */
  baseline: {
    population: 'US men and women',
    lifetimeRisk: 5.2,
    lifetimeRiskLabel: 'about 1 in 19',
    note: 'Averaged over an entire lifetime and a population that includes smokers, former ' +
          'smokers and people who never smoked. For lung cancer that average describes almost ' +
          'nobody: the lifetime risk of a current smoker and of a never smoker differ roughly ' +
          'ten-fold, which is why the strata below exist.',
    strata: [
      { label: 'Canadian men who never smoked (1987–89 rates)', lifetimeRisk: 1.3,
        note: '13 in 1,000. Villeneuve & Mao; the same source puts all men at 9.6%.' },
      { label: 'Canadian women who never smoked (1987–89 rates)', lifetimeRisk: 1.4,
        note: '14 in 1,000. The same source puts all women at 4.3%.' }
    ],
    source: { label: 'SEER Cancer Stat Facts: Lung and Bronchus Cancer — lifetime risk',
              url: 'https://seer.cancer.gov/statfacts/html/lungb.html' }
  },

  /* ---- factors ------------------------------------------------------
     Fifteen. Every relative risk says what it is relative to. The first four
     are the reason for that field: smoking is the one exposure on this site
     common enough and strong enough that the difference between "relative to
     everyone" and "relative to never smokers" is the difference between a
     probability and nonsense.
  -------------------------------------------------------------------- */
  factors: [

    { id: 'age', label: 'Increasing age', category: 'Demographic', modifiable: false,
      source: 'seer-lung',
      direction: 'increases', magnitude: 'median age at diagnosis 71', evidence: 'strong',
      scope: 'overall', affects: ['hist-root'],
      note: 'Median age 71 at diagnosis and 73 at death. The lifetime risk is itself an ' +
            'age-integrated number, so no single multiplier captures age.' },

    /* ---- tobacco ---- */

    { id: 'smoking-men', label: 'Current smoking — men', category: 'Tobacco', modifiable: true,
      source: { ref: 'villeneuve-mao',
                quote: 'Canadian rates observed over the period 1987 to 1989. It was found that 172/1,000 of male ' +
                       'current smokers will eventually develop lung cancer … Only 13/1,000 males … When smoking ' +
                       'status is not adjusted for, the lifetime risk of developing lung cancer is approximately ' +
                       '96/1,000' },
      direction: 'increases', absoluteLifetime: [17.2, 17.2],
      magnitude: 'lifetime risk 17.2%, against 1.3% for men who never smoked', evidence: 'strong',
      scope: 'overall', stratum: 'Canadian men who never smoked (1987–89 rates)',
      affects: ['hist-root', 'drv-kras'],
      note: '172 in 1,000 male current smokers will develop lung cancer, against 13 in 1,000 men who ' +
            'never smoked. Quoted as an absolute risk because the source reports it that way — and ' +
            'because the obvious shortcut fails: 13.2 times the all-men lifetime risk of 9.6% is ' +
            '127%, which is not a probability. Canadian rates from 1987–89; the size of the gap, not ' +
            'the exact figure, is the durable finding.' },

    { id: 'smoking-women', label: 'Current smoking — women', category: 'Tobacco', modifiable: true,
      source: { ref: 'villeneuve-mao',
                quote: 'Canadian rates observed over the period 1987 to 1989. … the similar probability among ' +
                       'female current smokers was 116/1,000. … Only 13/1,000 males and 14/1,000 females in this ' +
                       'category will develop lung cancer.' },
      direction: 'increases', absoluteLifetime: [11.6, 11.6],
      magnitude: 'lifetime risk 11.6%, against 1.4% for women who never smoked', evidence: 'strong',
      scope: 'overall', stratum: 'Canadian women who never smoked (1987–89 rates)',
      affects: ['hist-root', 'drv-kras'],
      note: '116 in 1,000 female current smokers, against 14 in 1,000 women who never smoked. The ' +
            'figure for women is lower than for men because, in those years, women had smoked for ' +
            'fewer decades — the mortality row below shows how that gap later closed.' },

    { id: 'smoking-mortality', label: 'Current smoking — dying of it', category: 'Tobacco', modifiable: true,
      source: { ref: 'thun-2013',
                quote: 'three time periods (1959-1965, 1982-1988, and 2000-2010) … For women who were current ' +
                       'smokers, as compared with women who had never smoked, the relative risks of death from ' +
                       'lung cancer were 2.73, 12.65, and 25.66 in the 1960s, 1980s, and contemporary cohorts, ' +
                       'respectively; corresponding relative risks for male current smokers, as compared with men ' +
                       'who had never smoked, were 12.22, 23.81, and 24.97.' },
      direction: 'increases', rr: [24.97, 25.66], referent: 'unexposed', outcome: 'mortality',
      magnitude: '~25× the lung cancer death rate of never smokers', evidence: 'strong',
      scope: 'overall', affects: ['hist-root'],
      note: 'In US cohorts followed 2000–2010: 24.97 for men and 25.66 for women. For women the same ' +
            'ratio was 2.73 in the 1960s and 12.65 in the 1980s — the risk rose as women\'s smoking ' +
            'histories lengthened, until it matched men\'s. A multiplier on dying, not on being ' +
            'diagnosed, so it is not converted.' },

    { id: 'quitting', label: 'Stopping smoking', category: 'Tobacco', modifiable: true,
      source: { ref: 'peto-2000',
                quote: 'Among both men and women in 1990, however, the former smokers had only a fraction of the ' +
                       'lung cancer rate of continuing smokers, and this fraction fell steeply with time since ' +
                       'stopping. By 1990 cessation had almost halved the number of lung cancers that would have ' +
                       'been expected if the former smokers had continued.' },
      direction: 'decreases', outcome: 'mortality',
      magnitude: 'a fraction of a continuing smoker\'s risk, falling steeply with years since stopping',
      evidence: 'strong', scope: 'overall', affects: ['hist-root'],
      note: 'In UK data, former smokers had only a fraction of the lung cancer rate of ' +
            'continuing smokers, and the fraction fell steeply with time since stopping. By 1990, ' +
            'stopping had almost halved the number of lung cancers the country would otherwise ' +
            'have had. The single largest lever on this list.' },

    { id: 'secondhand-smoke', label: 'Secondhand smoke', category: 'Tobacco', modifiable: true,
      source: { ref: 'zhong-ets',
                quote: 'The relative risk of lung cancer among non smoking women ever exposed to ETS from their ' +
                       'husbands … was 1.20 (95% confidence interval (CI): 1.12-1.29). … the relative risk of lung ' +
                       'cancer for ever being exposed to ETS at work was a 1.16 (95% CI: 1.05-1.28).' },
      direction: 'increases', rr: [1.12, 1.29], referent: 'unexposed',
      magnitude: 'RR 1.20 (1.12–1.29), never-smoking women with a smoking spouse', evidence: 'strong',
      scope: 'overall', stratum: 'Canadian women who never smoked (1987–89 rates)',
      affects: ['hist-root', 'hist-sclc'],
      note: 'Measured in never smokers, so converted against a never-smoker stratum rather than the ' +
            'population. Workplace exposure carried 1.16 (1.05–1.28). The American Cancer Society ' +
            'names secondhand smoke the third most common cause of lung cancer in the US, with the ' +
            'greatest risk for small cell lung cancer.' },

    { id: 'cigars-pipes', label: 'Cigars and pipes', category: 'Tobacco', modifiable: true,
      source: 'acs-cff-2023',
      direction: 'increases', rr: [3, 3], referent: 'unexposed', outcome: 'mortality',
      magnitude: 'current cigar users more than 3× as likely to die of lung cancer', evidence: 'strong',
      scope: 'overall', affects: ['hist-root'],
      note: 'Against people who never used any combustible tobacco. "More than three times" is a ' +
            'floor, and it is plotted at that floor.' },

    /* ---- environment and work ---- */

    { id: 'radon', label: 'Radon in the home', category: 'Environmental', modifiable: true,
      source: { ref: 'darby-radon',
                quote: 'Collaborative analysis of individual data from 13 case-control studies of residential ' +
                       'radon and lung cancer. … Nine European countries. … This corresponds to an increase of ' +
                       '16% (5% to 31%) per 100 Bq/m3 increase in usual radon' },
      direction: 'increases', rr: [1.05, 1.31], per: '100 Bq/m³ of household radon', referent: 'unexposed',
      magnitude: '+16% (5–31%) per 100 Bq/m³', evidence: 'strong',
      scope: 'overall', affects: ['hist-root'],
      note: 'Pooled from 13 European studies: linear, with no threshold below which it was safe, and ' +
            'the hazard was greatest for smokers and recent ex-smokers. Modifiable because a home can ' +
            'be tested and, where needed, mitigated.' },

    { id: 'asbestos', label: 'Heavy asbestos exposure at work', category: 'Occupational', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', rr: [1.7, 1.7], referent: 'unexposed',
      magnitude: 'about 70% higher risk', evidence: 'strong',
      scope: 'overall', affects: ['hist-root'],
      note: 'Longer and thinner fibres carry more risk. Marked not modifiable because the lever is ' +
            'workplace regulation, not something an exposed worker can undo.' },

    { id: 'occupational-other', label: 'Other occupational exposures', category: 'Occupational', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', magnitude: 'elevated; size depends on the exposure', evidence: 'moderate',
      scope: 'overall', affects: ['hist-root'],
      note: 'Soot, coal-tar pitch, nickel and chromium, and work in aluminium production, painting and ' +
            'steel founding.' },

    { id: 'air-pollution', label: 'Outdoor air pollution', category: 'Environmental', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', magnitude: '8–9% higher risk with particulate matter', evidence: 'moderate',
      scope: 'overall', affects: ['hist-root'],
      note: 'Estimated to account for about 1–2% of US lung cancer deaths. No multiplier is converted ' +
            'here because the source does not state the exposure increment the 8–9% refers to.' },

    { id: 'arsenic', label: 'Arsenic in drinking water', category: 'Environmental', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', magnitude: 'strong at very high levels; unclear at US levels', evidence: 'moderate',
      scope: 'overall', affects: ['hist-root'],
      note: 'Strongly associated at several hundred micrograms per litre, in Chile and Taiwan. Few US ' +
            'counties exceed the EPA limit of 10 µg/L, and the risk at those lower levels is unclear.' },

    /* ---- personal history ---- */

    { id: 'family-history', label: 'Affected first-degree relative', category: 'Germline', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', rr: [1.5, 1.5], referent: 'unexposed',
      magnitude: '~1.5×; ~1.8× for an affected sibling', evidence: 'moderate',
      scope: 'overall', affects: ['hist-root'],
      note: 'The International Lung Cancer Consortium estimate. Families share smoking habits as well ' +
            'as genes, which is part of why the figure is modest and hard to separate.' },

    { id: 'lung-disease', label: 'History of lung disease', category: 'Medical', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', rr: [1.16, 2.5], referent: 'unexposed',
      magnitude: 'from +16% (asthma) to 2.5× (COPD)', evidence: 'moderate',
      scope: 'overall', affects: ['hist-root'],
      note: 'Asthma, chronic bronchitis, COPD, emphysema, pneumonia and tuberculosis, thought to act ' +
            'through chronic inflammation. The range spans different diseases, not a confidence ' +
            'interval.' },

    { id: 'inherited-variants', label: 'Rare inherited variants', category: 'Germline', modifiable: false,
      source: 'acs-cff-2023',
      direction: 'increases', magnitude: 'rare; size not well quantified', evidence: 'limited',
      scope: 'overall', affects: ['hist-root', 'drv-egfr'],
      note: 'Li-Fraumeni syndrome (germline TP53), germline EGFR variants, and possibly BRCA2 — ' +
            'associated with onset about 12 years earlier.' }
  ],

  /* ---- detection ----------------------------------------------------
     Prostate's trade was a real benefit against heavy over-diagnosis. Lung's
     benefit is larger and its harms are real, but the defining numbers are how
     few of the people it could help it reaches.
  -------------------------------------------------------------------- */
  detection: {
    note: 'Stopping smoking is the lever that prevents it. What follows is the other one: finding it ' +
          'while it is still local, which for lung cancer is the exception rather than the rule.',

    relativeSurvivalNote: 'Relative survival compares people who have the diagnosis with people of ' +
      'the same age who do not. It removes deaths from other causes rather than counting them, so ' +
      'it is not the share of people alive. Every survival figure on this page is relative.',

    stageOutcomes: [
      { stage: 'Localised', share: 24, fiveYear: 65.5,
        note: 'Confined to the lung. About a quarter of cases — the group screening exists to enlarge.' },
      { stage: 'Regional', share: 21, fiveYear: 38.2,
        note: 'Spread to nearby lymph nodes or tissue. Survival is already less than half of the ' +
              'localised figure.' },
      { stage: 'Distant', share: 51, fiveYear: 10.5,
        note: 'Metastatic at diagnosis — the largest single group, and the reverse of breast and ' +
              'prostate, where most disease is found localised.' },
      { stage: 'Unknown', share: 4, fiveYear: 17.5,
        note: 'Incomplete staging in the registry record.' }
    ],

    tradeoff: {
      note: 'Screening with low-dose CT reduces lung cancer deaths in people at high risk, and it costs ' +
            'over-diagnosis and a small number of radiation-caused cancers. The models behind the 2021 ' +
            'US recommendation put both on one denominator.',
      basis: 'per 100,000 people in the 1950 and 1960 US birth cohorts, screened annually from age 50 ' +
             'or 55 to 80 on a 20 pack-year criterion, assuming everyone eligible is screened (CISNET)',
      rows: [
        { kind: 'benefit', value: '469–558', label: 'lung cancer deaths averted',
          note: 'Against 381 under the older 2013 criteria, which the 2021 recommendation replaced.' },
        { kind: 'benefit', value: '6,018–7,596', label: 'life-years gained' },
        { kind: 'harm', value: '83–94', label: 'cancers over-diagnosed',
          note: 'Cancers found by screening that would never have caused harm in that person\'s life.' },
        { kind: 'harm', value: '29.0–42.5', label: 'lung cancer deaths caused by the scans\' radiation' }
      ],
      effect: {
        measure: 'RR', point: 0.76, ci: [0.61, 0.94],
        of: 'lung cancer mortality in men screened with volume CT, against no screening',
        followUp: '10 years, 13,195 men (NELSON)',
        note: 'A 24% relative reduction. The US trial, NLST, compared low-dose CT with chest X-ray ' +
              'rather than with nothing and found a 20.0% reduction (6.8–26.7) in 53,454 people.'
      },
      disagreement: 'The modelled benefit assumes everyone eligible is screened, and almost nobody is. ' +
        'In 2024, 18.7% of the 12.76 million eligible US adults were up to date; at that uptake an ' +
        'estimated 14,970 deaths are prevented over five years, against 62,110 if everyone eligible ' +
        'were screened. The criteria also miss people: in a 2024 national survey of adults already ' +
        'diagnosed with lung cancer, 52.3% (58 of 111) had met them, and 32.7% (36 of 110) had been ' +
        'screened before diagnosis. That survey sampled 115 people, so read it as a direction ' +
        'rather than a rate.',
      sources: [
        { label: 'Meza et al, JAMA 2021 — CISNET modelling for the USPSTF',
          url: 'https://pubmed.ncbi.nlm.nih.gov/33687469/' },
        { label: 'de Koning et al, NEJM 2020 — NELSON', url: 'https://pubmed.ncbi.nlm.nih.gov/31995683/' },
        { label: 'NLST Research Team, NEJM 2011', url: 'https://pubmed.ncbi.nlm.nih.gov/21714641/' },
        { label: 'Bandi et al, JAMA 2025 — American Cancer Society release',
          url: 'https://pressroom.cancer.org/2025-lung-cancer-data' },
        { label: 'Zanazanian et al, Cancer Causes Control 2026', url: 'https://pubmed.ncbi.nlm.nih.gov/42616166/' }
      ]
    },

    modalities: [
      { name: 'Low-dose CT', role: 'Population screening — high risk only',
        catches: 'Cancers at an earlier stage in people who smoked heavily. In NLST it cut lung cancer ' +
                 'deaths by 20.0% against chest X-ray.',
        misses: 'Everyone outside the criteria — including most people who never smoked, and about ' +
                'half of the people who go on to be diagnosed.',
        harms: 'In NLST 24.2% of low-dose CT screens over three rounds were positive, and 96.4% of the ' +
               'positives were false positives. The models add over-diagnosis and radiation-caused cancers — see ' +
               'the trade above.',
        interval: 'Annual, ages 50–80, 20 pack-years or more, currently smoking or quit within the ' +
                  'past 15 years.',
        note: 'The only lung cancer screening test shown to reduce deaths.',
        catchesSource: { ref: 'nlst-2011',
                         quote: 'There were 247 deaths from lung cancer per 100,000 person-years in the low-dose ' +
                                'CT group and 309 deaths per 100,000 person-years in the radiography group, ' +
                                'representing a relative reduction in mortality from lung cancer with low-dose CT ' +
                                'screening of 20.0%' },
        missesSource: { ref: 'zanazanian-2026',
                        quote: 'Among those with known eligibility, 52.3% (58/11) met screening criteria at ' +
                               'diagnosis. … Among US adults with lung cancer, approximately half were ' +
                               'screening-eligible' },
        harmsSource: { ref: 'nlst-2011',
                       quote: 'Participants were randomly assigned to undergo three annual screenings … The rate ' +
                              'of positive screening tests was 24.2% with low-dose CT and 6.9% with radiography ' +
                              'over all three rounds. A total of 96.4% of the positive screening results in the ' +
                              'low-dose CT group' },
        intervalSource: { ref: 'uspstf-2021',
                          quote: 'The USPSTF recommends annual screening for lung cancer with LDCT in adults aged ' +
                                 '50 to 80 years who have a 20 pack-year smoking history and currently smoke or ' +
                                 'have quit within the past 15 years.' } },

      { name: 'Chest X-ray', role: 'Not a screening test',
        catches: 'Larger tumours, often found while looking for something else.',
        misses: 'Enough that screening with it does not work: in PLCO, a trial of 154,901 people, those ' +
                'offered annual chest X-rays had the same lung cancer mortality as usual care (RR 0.99, ' +
                '0.87–1.22).',
        harms: 'False reassurance, and follow-up tests for findings that turn out to be nothing.',
        note: 'Still the first image many people with symptoms get.',
        missesSource: { ref: 'plco-2011',
                        quote: 'Randomized controlled trial that involved 154,901 participants aged 55 through 74 ' +
                               'years, 77,445 of whom were assigned to annual screenings and 77,456 to usual care ' +
                               '… (mortality RR, 0.99; 95% CI, 0.87-1.22)' } },

      { name: 'Biopsy or cytology', role: 'Diagnosis',
        catches: 'The tissue both classifications on this site are read from — histology first, then ' +
                 'the driver.',
        misses: 'A small sample may not classify further than "non-small cell carcinoma, not otherwise ' +
                'specified".',
        harms: 'An invasive procedure, and one sample has to serve the microscope, the stains and the ' +
               'sequencer. Guidelines ask pathologists to spend as little tissue as possible on the ' +
               'first two.',
        note: 'Nothing on either axis exists without this step.',
        missesSource: 'travis-2013',
        harmsSource: 'travis-2013' },

      { name: 'Tumour sequencing', role: 'Treatment selection',
        catches: 'The driver that selects first-line therapy. In the cohort behind the driver axis, ' +
                 '37.1% of 860 patients received a therapy matched to their tumour\'s profile.',
        misses: 'Drivers outside the panel, and not every fusion: the study labelled 32 tumours ' +
                'ALK-driven, and the structural-variant calls found an ALK rearrangement in 30.',
        harms: 'Time and tissue. A result that arrives after treatment has started cannot choose it.',
        note: 'For adenocarcinoma this report can matter more than the pathology report.',
        catchesSource: { ref: 'msk-2017',
                         quote: 'Here, we report the experience of 860 patients with metastatic lung ' +
                                'adenocarcinoma … Overall, 37.1% (319/860) of patients received a matched therapy ' +
                                'guided by their tumor molecular profile.' },
        missesSource: 'msk-2017' }
    ],

    signs: [
      'A cough that does not go away or gets worse over time',
      'Coughing up blood, or blood in mucus',
      'Chest discomfort or pain, trouble breathing, or wheezing',
      'Hoarseness, or trouble swallowing',
      'Loss of appetite, weight loss with no known reason, or fatigue',
      'Swelling in the face or in the veins of the neck',
      'All of these can have other causes — and early lung cancer usually causes none of them, which is why so much of it is found late'
    ],

    sources: [
      { label: 'NCI PDQ — Non-Small Cell Lung Cancer Treatment (patient version): signs and symptoms',
        url: 'https://www.cancer.gov/types/lung/patient/non-small-cell-lung-treatment-pdq' },
      { label: 'SEER Cancer Stat Facts: Lung and Bronchus Cancer — stage distribution and survival',
        url: 'https://seer.cancer.gov/statfacts/html/lungb.html' },
      { label: 'USPSTF lung cancer screening recommendation (JAMA 2021)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33687470/' },
      { label: 'PLCO chest radiograph screening (JAMA 2011)', url: 'https://pubmed.ncbi.nlm.nih.gov/22031728/' }
    ]
  },

  /* ---- targets (curated layer) --------------------------------------
     Clinical framing the pipeline cannot compute. The generated overlay
     (data/lung.targets.js) supplies domains, hotspots, structures, the 47 agents
     in the curated lung drug pipeline and their FDA labels. Every figure
     below is either computed in this session's overlays or read off a source
     named beside it.
  -------------------------------------------------------------------- */
  targets: [
    { gene: 'EGFR',
      summary: 'The largest drugged class in lung cancer. 213 of the 860 patients behind the driver ' +
               'axis carried a common sensitising mutation — an exon 19 deletion in 110, L858R in 69.',
      caveat: 'Exon 20 insertions sit on the same gene and are a different drug problem, with their ' +
              'own trials and their own node.',
      watch: 'Resistance is where the gene is now studied. After targeted therapy T790M rises from ' +
             '5.8% to 21.0% and MET amplification from 1.9% to 10.0% in one MSK cohort — while after ' +
             'first-line osimertinib in FLAURA no T790M was found at all.',
      source: { ref: 'msk-2017',
                quote: 'Here, we report the experience of 860 patients with metastatic lung adenocarcinoma ' +
                       'analyzed prospectively' },
      caveatSource: { nct: 'NCT04538664', label: 'PAPILLON' },
      watchSource: ['msk-met-2023',
                    { ref: 'chmielecki-2023',
                      quote: 'In the osimertinib arm acquired resistance analysis subset, 38/109 (35%) patients ' +
                             'had a detectable acquired resistance mechanism, 71 (65%) had no detectable ' +
                             'candidate mechanism of resistance, and there was no evidence of acquired EGFR ' +
                             'T790M' }] },

    { gene: 'KRAS',
      summary: 'The commonest driver in the cohort, and for decades the undruggable one. G12C, the one ' +
               'allele with approved drugs, was found in 89 of the 215 KRAS-driven tumours. Nothing in ' +
               'the tracked pipeline is aimed at any other KRAS allele.',
      caveat: 'Both G12C inhibitors are approved after prior systemic therapy, not as first treatment.',
      watch: 'STK11 and KEAP1 are mutated in 32.6% and 27.9% of the KRAS-driven tumours here.',
      source: 'msk-2017',
      caveatSource: [{ nct: 'NCT03600883', label: 'CodeBreaK 100' }, { nct: 'NCT03785249', label: 'KRYSTAL-1' }],
      watchSource: 'msk-2017' },

    { gene: 'ALK',
      summary: 'A fusion, and invisible to mutation calls: 32 patients were labelled ALK-driven, the ' +
               'structural-variant calls find the rearrangement in 30, and EML4 is the partner in most ' +
               'of them. ' +
               '23 of the 32 never smoked.',
      caveat: 'Four ALK inhibitors are approved first line, each tested against crizotinib or ' +
              'chemotherapy rather than against one another.',
      watch: 'Alectinib is now approved after complete resection as well as in metastatic disease.',
      source: 'msk-2017',
      caveatSource: [{ nct: 'NCT02075840', label: 'ALEX' }, { nct: 'NCT03052608', label: 'CROWN' },
                     { nct: 'NCT02737501', label: 'ALTA-1L' }, { nct: 'NCT01154140', label: 'PROFILE 1014' }],
      watchSource: { nct: 'NCT03456076', label: 'ALINA' } },

    { gene: 'ROS1',
      summary: 'Another kinase fusion, in 23 patients here with CD74 the partner in 12. Several of the ' +
               'drugs against it are also ALK or TRK inhibitors.',
      watch: 'Zidesamtinib was approved in July 2026 for disease that has already had a ROS1 ' +
             'inhibitor — resistance to the first drug is now a treatment setting of its own.',
      source: 'msk-2017',
      watchSource: [{ nct: 'NCT05118789', label: 'ARROS-1' },
                    { label: 'FDA — zidesamtinib approval',
                      url: 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-zidesamtinib-ros1-positive-non-small-cell-lung-cancer' }] },

    { gene: 'MET',
      summary: '26 patients labelled MET-mutant, and each of them with a MET mutation carries one at ' +
               'codons 963–1010 — exon 14 and its splice sites.',
      caveat: 'MET amplification is a different event: labelled apart in this cohort, and a route of ' +
              'resistance to EGFR inhibitors — 1.9% before targeted therapy, 10.0% after.',
      source: 'msk-2017',
      caveatSource: 'msk-met-2023' },

    { gene: 'RET',
      summary: 'A fusion in 14 patients here, KIF5B the commonest partner. Two selective RET inhibitors ' +
               'carry lung indications.',
      source: ['msk-2017', { nct: 'NCT03157128', label: 'LIBRETTO-001' }, { nct: 'NCT03037385', label: 'ARROW' }] },

    { gene: 'ERBB2',
      summary: 'In lung it is HER2 mutation, not amplification, that selects the drugs. 24 patients ' +
               'here: 19 labelled mutant, 5 mutant and amplified.',
      watch: 'Two HER2 tyrosine kinase inhibitors reached first-line accelerated approval in 2026 — ' +
             'zongertinib in February (ORR 76%, n=72) and sevabertinib in September (ORR 75%, n=69).',
      source: 'msk-2017',
      watchSource: [{ label: 'FDA — zongertinib accelerated approval',
                      url: 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-zongertinib-unresectable-or-metastatic-non-squamous-non-small-cell' },
                    { label: 'FDA — sevabertinib accelerated approval',
                      url: 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-sevabertinib-locally-advanced-or-metastatic-non-squamous-non-small' }] },

    { gene: 'CD274',
      summary: 'PD-L1 is read with a stain, not a sequencer, so its mutation track is empty by design. ' +
               'In 2,368 patients with advanced non-small cell disease, 22% scored 50% or more and 48% ' +
               'scored below 1%.',
      caveat: 'Pembrolizumab alone was tested in tumours with "strong" PD-L1 expression. The band ' +
              'names on this site come from the EXPRESS study, not from that trial.',
      source: { ref: 'express-2019',
                quote: 'Of 2617 patients who met inclusion criteria, 2368 (90%) had PD-L1 data; 530 (22%) ' +
                       'patients had PD-L1 TPS ≥ 50%, 1232 (52%) had PD-L1 TPS ≥ 1%, and 1136 (48%) had PD-L1 ' +
                       'TPS < 1%.' },
      caveatSource: { nct: 'NCT02142738', label: 'KEYNOTE-024' },
      excludedBy: [
        { nodes: ['drv-egfr', 'drv-egfr-ex20', 'drv-alk'],
          agents: 'atezolizumab as first treatment for metastatic disease, alone or in combination',
          note: 'The label rules out EGFR or ALK genomic tumour aberrations. The share counts only the EGFR ' +
                'and ALK classes this axis names.',
          source: 'label-atezolizumab' }
      ] },

    { gene: 'PDCD1',
      summary: 'Pembrolizumab, nivolumab and cemiplimab each block it.',
      source: ['label-pembrolizumab', 'label-nivolumab', 'label-cemiplimab'],
      excludedBy: [
        { nodes: ['drv-egfr', 'drv-egfr-ex20', 'drv-alk'],
          agents: 'pembrolizumab as first treatment, alone or with pemetrexed and platinum, and nivolumab as ' +
                  'first treatment with ipilimumab or before surgery with chemotherapy',
          note: 'The share counts only the EGFR and ALK classes this axis names.',
          source: ['label-pembrolizumab', 'label-nivolumab'] },
        { nodes: ['drv-egfr', 'drv-egfr-ex20', 'drv-alk', 'drv-ros1'],
          agents: 'cemiplimab as first treatment, alone or with platinum chemotherapy',
          note: 'The share counts only the EGFR, ALK and ROS1 classes this axis names.',
          source: 'label-cemiplimab' }
      ] },

    { gene: 'TACSTD2',
      summary: 'TROP2 is an address for an antibody-drug conjugate, not a driver. Datopotamab ' +
               'deruxtecan is approved in EGFR-mutated disease after EGFR-directed therapy and platinum ' +
               'chemotherapy.',
      source: [{ nct: 'NCT04484142', label: 'TROPION-Lung05' },
               { label: 'openFDA — Datroway label', url: 'https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22DATROWAY%22' }] },

    { gene: 'DLL3',
      summary: 'The target of tarlatamab, a T-cell engager approved in small cell lung cancer after ' +
               'platinum chemotherapy: overall survival 13.6 against 8.3 months (HR 0.60, 0.47–0.77).',
      caveat: 'DLL3 is on neither MSK sequencing panel and is selected by expression, so nothing on the ' +
              'alteration track here speaks to it.',
      source: [{ nct: 'NCT05740566', label: 'DeLLphi-304' },
               { label: 'FDA — tarlatamab traditional approval',
                 url: 'https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-traditional-approval-tarlatamab-dlle-extensive-stage-small-cell-lung-cancer' }] },

    { gene: 'STK11',
      summary: 'Mutated in 32.6% of KRAS-driven tumours here. The study behind the driver axis nominated ' +
               'STK11 and KEAP1 as possible drivers in tumours with no known actionable alteration.',
      source: 'msk-2017' },

    { gene: 'SOX2',
      summary: 'A lineage transcription factor, amplified in 42.4% of TCGA\'s squamous cell carcinomas ' +
               '(205 of 484) — after TP53 mutation, the commonest mutation, amplification or deep ' +
               'deletion counted in that disease here.',
      caveat: 'The frequency chart on this lens reads MSK\'s adenocarcinomas only, so SOX2 sits near 0% ' +
              'there. That is a property of the cohort, not of lung cancer: the squamous figure lives on ' +
              'the histology node.',
      source: 'tcga-panlung',
      caveatSource: 'msk-2017' },

    { gene: 'TP53',
      summary: 'The most altered gene in lung cancer — 86% of squamous and small cell tumours and 54% of ' +
               'adenocarcinomas in the cohorts here — and nothing is aimed at it.',
      source: ['tcga-panlung', 'george-sclc'] }
  ],

  /* ---- markers -------------------------------------------------------
     Two stains that settle histology when the eye cannot, one panel that
     confirms neuroendocrine lineage, and the four alterations a sequencing
     report is read for first. PD-L1 joins with its axis in phase 6.
  -------------------------------------------------------------------- */
  markers: [
    { id: 'TTF1', label: 'TTF-1 (NKX2-1)', assay: 'IHC',
      positiveThreshold: 'nuclear staining — the gland-lineage marker' },
    { id: 'P40', label: 'p40 (ΔNp63)', assay: 'IHC',
      positiveThreshold: 'nuclear staining — the squamous-lineage marker' },
    { id: 'NE', label: 'Neuroendocrine markers', assay: 'IHC (chromogranin, synaptophysin, INSM1)' },
    { id: 'EGFR', label: 'EGFR mutation', assay: 'DNA sequencing of tumour or plasma' },
    { id: 'KRAS', label: 'KRAS mutation', assay: 'DNA sequencing of tumour or plasma' },
    { id: 'ALK', label: 'ALK rearrangement', assay: 'IHC, FISH, or DNA/RNA sequencing' },
    { id: 'ROS1', label: 'ROS1 rearrangement', assay: 'FISH or DNA/RNA sequencing' },
    { id: 'PDL1', label: 'PD-L1 tumour proportion score', assay: 'IHC, 22C3 assay',
      positiveThreshold: 'percentage of tumour cells with membrane staining' }
  ],

  /* ---- glossary -----------------------------------------------------
     The words lung owns. An entry WITH `d` replaces the engine term; an entry
     with only `w` keeps the engine definition and replaces the example.
  -------------------------------------------------------------------- */
  glossary: {

    groups: [
      { id: 'classification', label: 'How lung cancer is sorted' }
    ],

    terms: [

      /* ---- words this cancer owns ---- */

      { t: 'NSCLC', g: 'classification', full: 'Non-small cell lung cancer',
        alias: ['non-small cell lung cancer', 'non-small cell', 'non-small-cell lung cancer'],
        d: 'Every lung cancer that is not small cell. A grouping by exclusion rather than one ' +
           'disease: it holds adenocarcinoma, squamous cell carcinoma and large cell carcinoma.',
        w: 'The larger branch of the first fork on the histology axis — about four lung cancers ' +
           'in five.' },

      { t: 'SCLC', g: 'classification', full: 'Small cell lung cancer',
        alias: ['small cell lung cancer', 'small cell', 'oat cell'],
        d: 'A lung cancer named for its small, round cells under the microscope. It grows and ' +
           'spreads fast, and it is treated as a different disease from non-small cell lung cancer.',
        w: 'The other branch of the first fork. Almost nothing downstream of that fork — driver ' +
           'testing, the targeted drugs — applies to it.' },

      { t: 'adenocarcinoma', g: 'classification', alias: ['adeno', 'lung adenocarcinoma', 'LUAD'],
        d: 'A cancer of gland cells — in the lung, the cells that make mucus. The commonest lung ' +
           'cancer.',
        w: 'The histology node the driver axis sorts. Nearly every targeted drug in lung cancer ' +
           'is for a subtype of it.' },

      { t: 'squamous cell carcinoma', g: 'classification',
        alias: ['squamous', 'SqCC', 'LUSC', 'squamous cell'],
        d: 'A cancer of the flat cells that line the airways.',
        w: 'The second commonest lung cancer. Its genome resembles squamous cancers elsewhere in ' +
           'the body more than it resembles lung adenocarcinoma.' },

      { t: 'large cell carcinoma', g: 'classification', alias: ['large cell', 'LCLC'],
        d: 'Non-small cell carcinoma that shows neither gland nor squamous features — a diagnosis ' +
           'of what a tumour is not.',
        w: 'The smallest named box on the histology axis.' },

      { t: 'TTF-1', g: 'classification', alias: ['TTF1', 'NKX2-1', 'thyroid transcription factor 1'],
        d: 'A protein made by lung gland cells (and thyroid cells), detected with a stain. A ' +
           'positive stain points to adenocarcinoma.',
        w: 'One of the two stains a pathologist reaches for when a small biopsy will not declare ' +
           'itself. Its gene, NKX2-1, is also amplified in some adenocarcinomas.' },

      { t: 'p40', g: 'classification', alias: ['ΔNp63', 'p63', 'P40'],
        d: 'A protein made by squamous cells, detected with a stain. A positive stain points to ' +
           'squamous cell carcinoma.',
        w: 'TTF-1\'s partner on the slide: one gland marker and one squamous marker classify most ' +
           'tumours that cannot be called by eye.' },

      { t: 'neuroendocrine', g: 'classification', alias: ['NE', 'neuroendocrine carcinoma'],
        d: 'Describing cells that behave partly like nerve cells and partly like hormone-secreting ' +
           'cells. Small cell lung cancer is a neuroendocrine carcinoma.',
        w: 'The lineage small cell lung cancer belongs to, and the one some EGFR-mutant ' +
           'adenocarcinomas turn into under treatment.' },

      { t: 'fusion', g: 'molecular', alias: ['gene fusion', 'rearrangement', 'rearranged', 'translocation'],
        d: 'Two genes broken and joined together. When the joined gene includes a kinase, the ' +
           'kinase can end up switched on all the time.',
        w: 'How ALK, ROS1 and RET drive lung cancer. A mutation test cannot see a fusion, which is ' +
           'why the pipeline counts rearrangements as a separate metric.' },

      { t: 'EGFR', g: 'molecular', full: 'Epidermal growth factor receptor',
        alias: ['epidermal growth factor receptor', 'ERBB1'],
        d: 'A receptor on the cell surface that tells the cell to grow when a signal arrives. ' +
           'Certain mutations leave it signalling without one.',
        w: 'The largest drugged driver class on this site. Its common mutations and its exon 20 ' +
           'insertions are separate nodes because they are selected for different drugs.' },

      { t: 'ALK', g: 'molecular', full: 'Anaplastic lymphoma kinase',
        d: 'A kinase gene that drives some lung cancers when it is fused to another gene.',
        w: 'The commonest fusion driver here, found mostly in people who never smoked.' },

      { t: 'exon 19 deletion', g: 'molecular', alias: ['ex19del', 'exon 19'],
        d: 'A small piece removed from the EGFR gene, in the stretch that encodes part of its ' +
           'kinase. One of the two common sensitising EGFR mutations.',
        w: 'The larger half of the EGFR node. The pipeline counts it as an in-frame deletion ' +
           'between codons 729 and 761.' },

      { t: 'L858R', g: 'molecular',
        d: 'A single-letter change in EGFR: leucine at position 858 replaced by arginine. The ' +
           'other common sensitising EGFR mutation.',
        w: 'The second half of the EGFR node.' },

      { t: 'G12C', g: 'molecular', alias: ['KRAS G12C'],
        d: 'A single change in KRAS: glycine at position 12 replaced by cysteine. The one KRAS ' +
           'mutation drugs have been built against.',
        w: 'Counted from the mutation calls on the KRAS node, because the study\'s label says only ' +
           '"KRAS" and the drug is for this allele.' },

      { t: 'never smoker', g: 'numbers', alias: ['never-smoker', 'never smoked', 'never smokers'],
        d: 'Someone recorded as never having smoked. Studies set the cut-off differently, so ' +
           'check the source before comparing across them.',
        w: 'The first column of the Evidence lens matrix, where it separates EGFR-driven tumours ' +
           'from KRAS-driven ones more sharply than any other variable in this cohort.' },

      { t: 'next-generation sequencing', g: 'molecular',
        alias: ['NGS', 'comprehensive genomic profiling', 'panel sequencing'],
        d: 'Reading many genes from one sample at once. A lung cancer panel reads hundreds of ' +
           'genes, looking for any of the alterations a drug is matched to.',
        w: 'How the driver axis is measured. The MSK cohort here was read on panels of 341 and ' +
           '410 genes.' },

      { t: 'PD-L1', g: 'molecular', alias: ['PDL1', 'CD274', 'programmed death-ligand 1'],
        d: 'A protein some tumour cells put on their surface that switches off the immune cells ' +
           'attacking them. Checkpoint inhibitors work by blocking that switch.',
        w: 'The third axis here, measured with a stain rather than a sequencer.' },

      { t: 'TPS', g: 'numbers', full: 'Tumour proportion score',
        alias: ['tumour proportion score', 'tumor proportion score'],
        d: 'The percentage of tumour cells whose membranes stain for PD-L1.',
        w: 'Reported in three bands on the PD-L1 axis. A reading of one sample, taken at one time.' },

      { t: 'T790M', g: 'molecular',
        d: 'A change in EGFR at position 790, threonine replaced by methionine — a resistance ' +
           'mutation that appears as tumours escape earlier EGFR inhibitors.',
        w: 'The largest mover on the resistance axis. After first-line osimertinib the FLAURA ' +
           'analysis found none.' },

      { t: 'C797S', g: 'molecular', alias: ['C797X', 'C797'],
        d: 'A change in EGFR at position 797, where cysteine is replaced. One of the resistance ' +
           'mutations found after osimertinib.',
        w: 'Counted on the resistance axis as any change at C797.' },

      /* ---- engine definitions, lung examples ---- */

      { t: 'histology',
        w: 'The default classification for lung cancer, because its first cut — small cell or ' +
           'not — changes everything after it.' },

      { t: 'carcinoma',
        w: 'Nearly all lung cancer is carcinoma. The word that matters is the one before it: ' +
           'adeno-, squamous, large cell or small cell.' },

      { t: 'driver',
        w: 'In lung cancer a driver is a treatment decision. Finding one — EGFR, ALK, KRAS G12C — ' +
           'usually decides the first drug.' },

      { t: 'oncogene',
        w: 'Every class on the driver axis except the last two is named for one.' },

      { t: 'tumour suppressor',
        w: 'TP53 and RB1 are lost in nearly every small cell lung cancer — obligatory, in the ' +
           'words of the study that sequenced them.' },

      { t: 'amplification',
        w: 'SOX2 and PIK3CA amplifications are the commonest events in squamous cell carcinoma ' +
           'after TP53 — and neither is a treatment class.' },

      { t: 'cohort',
        w: 'The driver figures come from 860 patients with metastatic adenocarcinoma at one US ' +
           'cancer centre — a referral cohort in which 277 had never smoked, so EGFR is ' +
           'over-represented against unselected disease.' },

      { t: 'alteration frequency',
        w: 'Watch the metric: ALK, ROS1 and RET are drivers because they are fused, and a mutation ' +
           'frequency for them measures the wrong thing.' },

      { t: 'prevalence',
        w: 'Two bases on this site. Histology shares are of all lung cancer; driver shares are of ' +
           'adenocarcinoma only, and every one of them says so.' },

      { t: 'TKI',
        w: 'The drug class the EGFR, ALK, ROS1 and RET nodes are matched to.' },

      { t: 'IHC',
        w: 'TTF-1 and p40 are the two stains that classify most lung cancers too poorly ' +
           'differentiated to call by eye.' }
    ]
  },

  /* ---- axes ---------------------------------------------------------- */
  axes: [
    { id: 'histology', label: 'Histology (WHO 2021)', shortLabel: 'Histology', default: true,
      asks: 'Is it small cell or not — and if not, which kind of non-small cell?',
      measures: 'A pathologist\'s reading of a biopsy or cytology sample. When the cells are too ' +
                'poorly differentiated to call by eye, one gland marker (TTF-1) and one squamous ' +
                'marker (p40) classify most of them.',
      decides: 'The first fork in everything. Small cell and non-small cell lung cancer are treated ' +
               'as different diseases, and within non-small cell several treatments are available ' +
               'for adenocarcinoma but not for squamous cell carcinoma.',
      note: 'Shares are of all lung cancer, derived from the ACS 2023 special section (NAACCR, US, ' +
            '2015–2019). That figure gives men and women separately and the non-small-cell types ' +
            'as shares of non-small-cell cases, so each share here combines the two sexes using ' +
            'ACS\'s own 2023 case estimates. The source rounds to whole percents: read each share ' +
            'as good to about a point.' },

    { id: 'driver', label: 'Driver class (MSK)', shortLabel: 'Driver', default: false,
      population: { label: 'Lung adenocarcinoma', short: 'adenocarcinoma',
                    share: 46.2, source: 'acs-cff-2023' },
      asks: 'Which single gene is driving it?',
      measures: 'Sequencing of the tumour — here panels of more than 300 cancer genes — read for ' +
                'the one alteration driving it: a mutation in EGFR, KRAS, BRAF, MET or HER2, or a ' +
                'fusion of ALK, ROS1 or RET.',
      decides: 'The first drug, wherever a targetable driver is found. This is the classification ' +
               'lung cancer is treated by — the reverse of breast and prostate, where the ' +
               'molecular classification decides little or nothing.',
      note: 'Shares are computed by the pipeline from MSK\'s lung_msk_2017 — 860 patients with ' +
            'metastatic adenocarcinoma, one tumour each, labelled by the study\'s own curated driver ' +
            'call and collapsed into the classes a treatment decision is made on. A referral-centre ' +
            'cohort in which 277 of the 860 never smoked, so EGFR is over-represented: TCGA\'s ' +
            'resected adenocarcinomas carry an EGFR mutation in 15.8% (104 of 660). A mutation call ' +
            'and a driver label are not the same definition, so both are shown rather than reconciled.' },

    { id: 'pdl1', label: 'PD-L1 expression (22C3 TPS)', shortLabel: 'PD-L1', default: false,
      population: { label: 'Stage IIIB/IV non-small cell lung cancer', short: 'advanced NSCLC',
                    source: 'express-2019' },
      asks: 'How much PD-L1 is on the tumour cells?',
      measures: 'An immunohistochemistry stain (the 22C3 assay), scored as the tumour proportion ' +
                'score: the share of tumour cells whose membranes stain.',
      decides: 'How immunotherapy is used. PD-L1 is the brake checkpoint inhibitors release, and ' +
               'the score sorts patients into the bands those drugs were tested in.',
      note: 'Shares from EXPRESS: 2,368 patients with stage IIIB/IV non-small cell lung cancer in 45 ' +
            'centres across 18 countries, each scored locally on tissue taken before treatment. The ' +
            'study reports TPS 50% or more (530) and TPS 1% or more (1,232); the 1–49% band here is ' +
            'the difference between the two.' },

    { id: 'resistance', label: 'Before and after targeted therapy (EGFR-mutant)', shortLabel: 'Resistance',
      default: false, partition: false,
      population: { label: 'Lung adenocarcinoma with EGFR L858R or an exon 19 deletion',
                    short: 'EGFR-mutant adenocarcinoma', source: 'msk-met-2023' },
      asks: 'What has the tumour changed once a targeted drug has been used against it?',
      measures: 'Sequencing of tumours with the same EGFR mutation, sampled before and after ' +
                'targeted therapy — here, one study split both ways.',
      decides: 'What can follow, where the tumour has acquired a change a drug can act on.',
      note: 'Not a partition, so nothing here is sized. Both nodes come from one MSK study: tumours ' +
            'carrying EGFR L858R or an exon 19 deletion, split by whether the study records a ' +
            'targeted therapy before the sample — 364 patients before, 219 after, one sample each, ' +
            'and 32 patients in both. The study records THAT a targeted therapy came first, not ' +
            'which drug, so neither node is resistance to a named drug. The trial of first-line ' +
            'osimertinib found no T790M at all at progression.' }
  ],

  nodes: [

  /* ============================== AXIS 1 — HISTOLOGY ============================== */

  {
    id: 'hist-root', axis: 'histology', parent: null,
    label: 'All lung cancer', shortLabel: 'All lung cancer',
    prevalence: 100,
    summary: 'Lung cancer is sorted first by what its cells look like, and the first cut is the ' +
             'one that matters most: small cell or not. Every other classification on ' +
             'this site sits under one of those two branches.',
    prognosis: {
      source: 'seer-lung',
      relativeOutlook: 'The deadliest common cancer in the US: one cancer death in five.',
      fiveYearNote: '29.5% five-year relative survival across all stages — 65.5% when found ' +
                    'localised, 10.5% once it has reached distant organs.',
      caveat: 'An average over diseases that behave very differently. The nodes below carry their ' +
              'own figures, and they are far apart.'
    },
    sources: [
      { label: 'SEER Cancer Stat Facts: Lung and Bronchus Cancer', url: 'https://seer.cancer.gov/statfacts/html/lungb.html' },
      { label: 'ACS Cancer Facts & Figures 2023 — Special Section: Lung Cancer',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' }
    ]
  },

  {
    id: 'hist-nsclc', axis: 'histology', parent: 'hist-root',
    label: 'Non-small cell lung cancer', shortLabel: 'NSCLC',
    prevalence: 81.0,
    summary: 'Everything that is not small cell — about four lung cancers in five. A grouping by ' +
             'exclusion rather than one disease: it holds adenocarcinoma, squamous cell carcinoma ' +
             'and large cell carcinoma, which differ in where they start, what drives them and ' +
             'which drugs work.',
    prognosis: {
      source: 'acs-cff-2023',
      relativeOutlook: 'Far better than small cell, and improving: two-year relative survival rose ' +
                       'from 25% to 43% in men and from 32% to 54% in women between 1975–76 and 2017–18.',
      fiveYearNote: 'Five-year relative survival 23% in men and 33% in women across all stages ' +
                    '(US, diagnosed 2012–2018): 59% and 70% when localised, 7% and 11% when distant.',
      caveat: 'Given by sex because that is how the source reports it. The gap between men and ' +
              'women is real and persists within every stage.'
    },
    sources: [
      { label: 'ACS Cancer Facts & Figures 2023 — Figures S2, S8 and S11',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' }
    ]
  },

  {
    id: 'hist-adeno', axis: 'histology', parent: 'hist-nsclc',
    label: 'Adenocarcinoma', shortLabel: 'Adeno',
    prevalence: 46.2,
    markers: { TTF1: '+ (usually)', P40: '−' },
    summary: 'The commonest lung cancer. It starts in the mucus-making gland cells, tends to grow ' +
             'in the outer lung, and is the type most likely to carry a mutation a drug can ' +
             'target — which is why the driver axis sorts this node and no other. It overtook ' +
             'squamous cell carcinoma after filters were added to cigarettes, which are thought to ' +
             'have carried smoke deeper into the lung.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 54, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 32, role: 'oncogene', druggable: true,
          note: 'G12C, the drugged allele, in 14.5% of these tumours.' },
        { gene: 'KEAP1', alteration: 'mutation', frequency: 17, role: 'oxidative-stress regulator' },
        { gene: 'EGFR', alteration: 'mutation', frequency: 16, role: 'oncogene', druggable: true,
          note: 'Against 24.8% labelled EGFR-driven in the MSK cohort behind the driver axis — a ' +
                'resected, unselected cohort against a referral one.' },
        { gene: 'STK11', alteration: 'mutation', frequency: 16, role: 'tumour suppressor' },
        { gene: 'NKX2-1', alteration: 'amplification', frequency: 12, role: 'lineage transcription factor',
          note: 'The gene behind the TTF-1 stain, amplified rather than merely expressed.' }
      ]
    },
    related: [
      { to: 'drv-root', kind: 'overlaps', strength: 1,
        note: 'The driver axis is this node, sorted by the one gene driving each tumour.' },
      { to: 'hist-sclc', kind: 'progresses-to',
        note: 'A subset of EGFR-mutant adenocarcinomas return as small cell lung cancer when ' +
              'resistance to EGFR inhibitors develops — the same tumour, a different lineage.' }
    ],
    sources: [
      { label: 'ACS Cancer Facts & Figures 2023 — What are the different types of lung cancer?',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' },
      { label: 'Campbell et al, Nat Genet 2016 — TCGA pan-lung, 660 adenocarcinomas',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27158780/' },
      { label: 'Oser et al, Lancet Oncol 2015 — transformation to small cell lung cancer',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25846096/' }
    ]
  },

  {
    id: 'hist-squamous', axis: 'histology', parent: 'hist-nsclc',
    label: 'Squamous cell carcinoma', shortLabel: 'Squamous',
    prevalence: 23.9,
    markers: { TTF1: '−', P40: '+' },
    summary: 'Starts in the flat cells lining the airways, and is more aggressive than ' +
             'adenocarcinoma. It was the commonest lung cancer until filtered cigarettes. Its genome ' +
             'looks more like squamous cancers elsewhere in the body than like lung adenocarcinoma, ' +
             'and the targeted drugs for the two are largely different ones.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 86, role: 'tumour suppressor' },
        { gene: 'SOX2', alteration: 'amplification', frequency: 42, role: 'lineage transcription factor' },
        { gene: 'PIK3CA', alteration: 'amplification', frequency: 40, role: 'oncogene' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 27, role: 'tumour suppressor' },
        { gene: 'FGFR1', alteration: 'amplification', frequency: 17, role: 'oncogene' },
        { gene: 'NFE2L2', alteration: 'mutation', frequency: 15, role: 'oxidative-stress transcription factor' }
      ]
    },
    sources: [
      { label: 'Campbell et al, Nat Genet 2016 — TCGA pan-lung, 484 squamous cell carcinomas',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27158780/' },
      { label: 'ACS Cancer Facts & Figures 2023 — Special Section: Lung Cancer',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' }
    ]
  },

  {
    id: 'hist-large', axis: 'histology', parent: 'hist-nsclc',
    label: 'Large cell carcinoma', shortLabel: 'Large cell',
    prevalence: 1.2,
    markers: { TTF1: '−', P40: '−' },
    summary: 'Non-small cell carcinoma that shows neither gland nor squamous features. It can start ' +
             'anywhere in the lung and is more aggressive than the other two non-small cell types. ' +
             'The smallest named box on this axis.',
    sources: [
      { label: 'ACS Cancer Facts & Figures 2023 — Special Section: Lung Cancer',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' }
    ]
  },

  {
    id: 'hist-nsclc-other', axis: 'histology', parent: 'hist-nsclc',
    label: 'Other or unspecified non-small cell', shortLabel: 'Other NSCLC',
    prevalence: 9.3,
    summary: 'Non-small cell cancers recorded as none of the three types beside it. The source ' +
             'figure does not break this group down, so neither does this node. One category that ' +
             'sits outside the three: a small biopsy that morphology and stains cannot classify ' +
             'further is reported as non-small cell carcinoma, not otherwise specified.',
    sources: [
      { label: 'Travis et al, Arch Pathol Lab Med 2013 — diagnosis in small biopsies and cytology',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22970842/' }
    ]
  },

  {
    id: 'hist-sclc', axis: 'histology', parent: 'hist-root',
    label: 'Small cell lung cancer', shortLabel: 'SCLC',
    prevalence: 13.5,
    markers: { P40: '−', NE: '+' },
    summary: 'Named for its small, round cells, and a different disease from everything under ' +
             'non-small cell. It spreads early: 94% of people with small cell lung cancer have ' +
             'disease beyond the lungs when it is found, against 70% with non-small cell, and ' +
             'chemotherapy — the main treatment — brings long-term control to few. Its genome is ' +
             'defined by loss: both copies of TP53 and RB1 are inactivated in nearly every tumour ' +
             'sequenced.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 86, role: 'tumour suppressor' },
        { gene: 'RB1', alteration: 'mutation', frequency: 73, role: 'tumour suppressor',
          note: 'Mutation calls only. The study found RB1 inactivated in nearly all tumours, some ' +
                'by complex rearrangements a mutation count does not include.' }
      ],
      pathways: [
        { name: 'Transcriptional subtypes (SCLC-A, -N, -P, -Y)', status: 'proposed; research use',
          note: 'Four subtypes named for the regulator each tumour expresses most — ASCL1, ' +
                'NEUROD1, POU2F3 and YAP1. They come from research samples and are not part of a ' +
                'routine report, which is why they are described here rather than drawn as an axis.',
          source: 'rudin-sclc' }
      ]
    },
    prognosis: {
      source: 'acs-cff-2023',
      relativeOutlook: 'The worst outlook of the lung cancers.',
      fiveYearNote: 'Five-year relative survival 6% in men and 8% in women across all stages ' +
                    '(US, diagnosed 2012–2018); 2% and 4% once distant.',
      caveat: 'Slightly more common in women (14% of their lung cancers) than in men (13%).'
    },
    sources: [
      { label: 'ACS Cancer Facts & Figures 2023 — Special Section: Lung Cancer',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' },
      { label: 'George et al, Nature 2015 — 110 small cell lung cancer genomes',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26168399/' },
      { label: 'Rudin et al, Nat Rev Cancer 2019 — molecular subtypes of SCLC',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30926931/' }
    ]
  },

  {
    id: 'hist-other', axis: 'histology', parent: 'hist-root',
    label: 'Other or unspecified type', shortLabel: 'Other',
    prevalence: 5.5,
    summary: 'Lung cancers the registry records as neither non-small cell nor small cell. The ' +
             'source figure does not break this group down, and this node does not guess.',
    sources: [
      { label: 'ACS Cancer Facts & Figures 2023 — Figure S2',
        url: 'https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2023/2023-cff-special-section-lung-cancer.pdf' }
    ]
  },

  /* ============================== AXIS 2 — DRIVER CLASS ============================== */

  {
    id: 'drv-root', axis: 'driver', parent: null,
    label: 'Adenocarcinoma, by driver', shortLabel: 'All adenocarcinoma',
    prevalence: 100,
    summary: 'The same adenocarcinomas as the histology node, sorted by the one alteration driving ' +
             'each. In lung cancer this is the classification treatment follows. In the study these ' +
             'shares come from, 37.1% of patients (319 of 860) received a therapy matched to their ' +
             'tumour\'s profile.',
    related: [
      { to: 'hist-adeno', kind: 'overlaps', strength: 1,
        note: 'Every node on this axis is a piece of adenocarcinoma.' }
    ],
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — 860 patients, MSK', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-egfr', axis: 'driver', parent: 'drv-root',
    label: 'EGFR — common sensitising mutations', shortLabel: 'EGFR',
    prevalence: 24.8,
    markers: { EGFR: 'exon 19 deletion or L858R, mostly' },
    summary: 'The largest drugged class. Two changes make up most of it: an exon 19 deletion ' +
             '(110 of these 213 patients) and the substitution L858R (69). Both select an EGFR ' +
             'tyrosine kinase inhibitor. 125 of the 213 had never smoked.',
    molecular: {
      drivers: [
        { gene: 'EGFR exon 19 deletion', alteration: 'mutation', frequency: 52, role: 'sensitising allele', druggable: true },
        { gene: 'EGFR L858R', alteration: 'mutation', frequency: 32, role: 'sensitising allele', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 62, role: 'tumour suppressor' },
        { gene: 'EGFR', alteration: 'amplification', frequency: 26, role: 'oncogene' },
        { gene: 'EGFR T790M', alteration: 'mutation', frequency: 18, role: 'resistance allele',
          note: '39 of 213. The study records whether each sample was taken before lung-cancer ' +
                'therapy, and 37 of the 39 are in samples it does not record as pre-therapy.' }
      ],
      biomarkers: [
        { name: 'EGFR mutation', use: 'selects an EGFR tyrosine kinase inhibitor',
          threshold: 'exon 19 deletion or L858R', source: 'civic-lung' }
      ]
    },
    related: [
      { to: 'drv-kras', kind: 'mutually-exclusive',
        note: 'Measured, not assumed: of 179 patients with a sensitising EGFR mutation, 2 (1.1%) also ' +
              'carried a KRAS mutation, against 33.9% of everyone else. Independence would predict ' +
              'about 48.' },
      { to: 'drv-egfr-ex20', kind: 'shares-driver',
        note: 'The same gene, a different class of change, and different drugs.' },
      { to: 'hist-sclc', kind: 'progresses-to',
        note: 'Some EGFR-mutant tumours return as small cell lung cancer when resistance to EGFR ' +
              'inhibitors develops.' }
    ],
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' },
      { label: 'CIViC — predictive evidence for EGFR in lung cancer', url: 'https://civicdb.org/' }
    ]
  },

  {
    id: 'drv-kras', axis: 'driver', parent: 'drv-root',
    label: 'KRAS', shortLabel: 'KRAS',
    prevalence: 25.0,
    markers: { KRAS: 'mutant' },
    summary: 'The commonest driver here, and for most of its history the undruggable one. One ' +
             'allele is now drugged: G12C, in 89 of these 215 patients, is the target of KRAS ' +
             'G12C inhibitors such as sotorasib. KRAS-driven tumours are smokers\' tumours — 14 of ' +
             'the 215 patients had never smoked.',
    molecular: {
      drivers: [
        { gene: 'KRAS', alteration: 'mutation', frequency: 99, role: 'oncogene', druggable: true },
        { gene: 'KRAS G12C', alteration: 'mutation', frequency: 41, role: 'drugged allele', druggable: true },
        { gene: 'TP53', alteration: 'mutation', frequency: 36, role: 'tumour suppressor' },
        { gene: 'STK11', alteration: 'mutation', frequency: 33, role: 'tumour suppressor' },
        { gene: 'KEAP1', alteration: 'mutation', frequency: 28, role: 'oxidative-stress regulator' }
      ],
      biomarkers: [
        { name: 'KRAS G12C', use: 'selects a KRAS G12C inhibitor', source: 'civic-lung' }
      ]
    },
    related: [
      { to: 'drv-egfr', kind: 'mutually-exclusive',
        note: 'The two largest classes almost never share a tumour — see the EGFR node for the count.' }
    ],
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' },
      { label: 'CIViC — predictive evidence for KRAS in lung cancer', url: 'https://civicdb.org/' }
    ]
  },

  {
    id: 'drv-egfr-ex20', axis: 'driver', parent: 'drv-root',
    label: 'EGFR exon 20 insertion', shortLabel: 'EGFR ex20',
    prevalence: 2.1,
    markers: { EGFR: 'exon 20 insertion' },
    summary: 'The same gene as the common EGFR class, labelled separately by the study and kept ' +
             'separate here because it is selected for different drugs.',
    molecular: {
      drivers: [
        { gene: 'EGFR exon 20 insertion', alteration: 'mutation', frequency: 89, role: 'activating insertion', druggable: true,
          note: '16 of the 18 by the pipeline\'s own rule: an in-frame insertion between codons 762 and 823.' }
      ]
    },
    related: [
      { to: 'drv-egfr', kind: 'shares-driver',
        note: 'Same gene, different drugs.' }
    ],
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' },
      { label: 'CIViC — predictive evidence for EGFR exon 20 insertions', url: 'https://civicdb.org/' }
    ]
  },

  {
    id: 'drv-alk', axis: 'driver', parent: 'drv-root',
    label: 'ALK fusion', shortLabel: 'ALK',
    prevalence: 3.7,
    markers: { ALK: 'rearranged' },
    summary: 'A fusion rather than a mutation: part of ALK joined to another gene — EML4 in 28 ' +
             'of these 32 patients. 23 of the 32 had never smoked. ALK fusions keep to themselves: ' +
             'none of these tumours carried an EGFR or KRAS mutation.',
    molecular: {
      drivers: [
        { gene: 'ALK', alteration: 'fusion', frequency: 94, role: 'oncogenic kinase fusion', druggable: true,
          note: 'The study labelled 32; the structural-variant calls find an ALK rearrangement in 30.' }
      ]
    },
    related: [
      { to: 'drv-egfr', kind: 'mutually-exclusive',
        note: 'None of these 32 carried an EGFR mutation, and in 1,683 patients screened at another ' +
              'centre EGFR mutations and ALK rearrangements never co-occurred.' },
      { to: 'drv-kras', kind: 'mutually-exclusive',
        note: 'None of these 32 carried a KRAS mutation either.' }
    ],
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' },
      { label: 'Gainor et al, Clin Cancer Res 2013 — 1,683 patients', url: 'https://pubmed.ncbi.nlm.nih.gov/23729361/' }
    ]
  },

  {
    id: 'drv-ros1', axis: 'driver', parent: 'drv-root',
    label: 'ROS1 fusion', shortLabel: 'ROS1',
    prevalence: 2.7,
    markers: { ROS1: 'rearranged' },
    summary: 'Another kinase fusion, and like ALK found mostly in people who never smoked: 17 of ' +
             'these 23 patients. ROS1 takes more partners than ALK does; CD74 is the commonest, in 12.',
    molecular: {
      drivers: [
        { gene: 'ROS1', alteration: 'fusion', frequency: 96, role: 'oncogenic kinase fusion', druggable: true,
          note: 'The structural-variant calls find a ROS1 rearrangement in 22 of the 23.' }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-ret', axis: 'driver', parent: 'drv-root',
    label: 'RET fusion', shortLabel: 'RET',
    prevalence: 1.6,
    summary: 'The rarest fusion class here — 14 patients, 11 of them with KIF5B as the partner. ' +
             'Small enough that every computed figure on it describes these tumours rather than ' +
             'estimates anything.',
    molecular: {
      drivers: [
        { gene: 'RET', alteration: 'fusion', frequency: 93, role: 'oncogenic kinase fusion', druggable: true,
          note: 'The structural-variant calls find a RET rearrangement in 13 of the 14.' }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-met', axis: 'driver', parent: 'drv-root',
    label: 'MET exon 14', shortLabel: 'MET ex14',
    prevalence: 3.0,
    summary: 'Tumours the study labelled as MET-mutant — and every MET mutation among them sits at ' +
             'codons 963 to 1010, the splice sites and body of exon 14, rather than scattered across ' +
             'the gene. Kept apart from the MET amplifications the study labels separately, which ' +
             'are counted under other named alterations.',
    molecular: {
      drivers: [
        { gene: 'MET', alteration: 'mutation', frequency: 92, role: 'oncogenic kinase', druggable: true,
          note: '24 of the 26 carry a MET mutation call, all 24 within codons 963–1010.' }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-braf', axis: 'driver', parent: 'drv-root',
    label: 'BRAF V600', shortLabel: 'BRAF V600',
    prevalence: 2.1,
    summary: '18 patients, every one carrying V600E by the mutation calls. The study labels BRAF ' +
             'changes outside V600 separately, and those are counted under other named alterations.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 100, role: 'oncogenic kinase', druggable: true }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-erbb2', axis: 'driver', parent: 'drv-root',
    label: 'HER2 (ERBB2) mutant', shortLabel: 'HER2',
    prevalence: 2.8,
    summary: 'Mutations in HER2 — the gene amplified in HER2-positive breast cancer, altered here ' +
             'in a different way. 24 patients: 19 labelled HER2-mutant and 5 both mutated and ' +
             'amplified. Tumours with HER2 amplification alone are counted under other named ' +
             'alterations.',
    molecular: {
      drivers: [
        { gene: 'ERBB2', alteration: 'mutation', frequency: 100, role: 'oncogenic kinase', druggable: true },
        { gene: 'ERBB2', alteration: 'amplification', frequency: 21, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-other', axis: 'driver', parent: 'drv-root',
    label: 'Other named alteration', shortLabel: 'Other',
    prevalence: 18.4,
    summary: 'Tumours the study labelled with one of 29 other driver labels — the largest being NF1 ' +
             'truncation (17 patients), PIK3CA mutation (16), BRAF changes outside V600 (11), MET ' +
             'amplification (12) and BRCA (11). A few are the same event spelled two ways in the ' +
             'source. Grouped because each is too rare here to size on its own.',
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  {
    id: 'drv-none', axis: 'driver', parent: 'drv-root',
    label: 'No driver identified', shortLabel: 'None found',
    prevalence: 13.8,
    summary: 'Tumours in which the study named no driver: 102 labelled "unknown driver" and 17 in ' +
             'which the panel found no mutations at all. Not "no cause" — the panel reads a few ' +
             'hundred genes, and a driver outside it, or of a kind it cannot detect, lands here. In ' +
             'the study, the genes mutated more often in tumours without a known actionable ' +
             'alteration pointed to STK11 and KEAP1.',
    molecular: {
      drivers: [
        { gene: 'TP53', alteration: 'mutation', frequency: 60, role: 'tumour suppressor' }
      ]
    },
    sources: [
      { label: 'Jordan et al, Cancer Discov 2017 — MSK lung_msk_2017', url: 'https://pubmed.ncbi.nlm.nih.gov/28336552/' }
    ]
  },

  /* ============================== AXIS 3 — PD-L1 ============================== */

  {
    id: 'pdl1-root', axis: 'pdl1', parent: null,
    label: 'Advanced NSCLC, by PD-L1', shortLabel: 'All advanced NSCLC',
    prevalence: 100,
    summary: 'Non-small cell lung cancer scored a third way: not by what the cells look like or which ' +
             'gene drives them, but by how strongly they signal the immune system to stand down.',
    related: [
      { to: 'hist-nsclc', kind: 'overlaps',
        note: 'This axis covers the advanced part of non-small cell lung cancer.' }
    ],
    sources: [
      { label: 'Dietel et al, Lung Cancer 2019 — EXPRESS', url: 'https://pubmed.ncbi.nlm.nih.gov/31319978/' }
    ]
  },

  {
    id: 'pdl1-neg', axis: 'pdl1', parent: 'pdl1-root',
    label: 'TPS below 1%', shortLabel: 'TPS <1%',
    prevalence: 48.0,
    markers: { PDL1: '<1%' },
    summary: 'Little or no PD-L1 on the tumour cells — the largest band, 1,136 of 2,368 patients.',
    sources: [
      { label: 'Dietel et al, Lung Cancer 2019 — EXPRESS', url: 'https://pubmed.ncbi.nlm.nih.gov/31319978/' }
    ]
  },

  {
    id: 'pdl1-low', axis: 'pdl1', parent: 'pdl1-root',
    label: 'TPS 1–49%', shortLabel: 'TPS 1–49%',
    prevalence: 29.6,
    markers: { PDL1: '1–49%' },
    summary: '702 of 2,368 patients — the study\'s 1,232 at 1% or more, less its 530 at 50% or more.',
    sources: [
      { label: 'Dietel et al, Lung Cancer 2019 — EXPRESS', url: 'https://pubmed.ncbi.nlm.nih.gov/31319978/' }
    ]
  },

  {
    id: 'pdl1-high', axis: 'pdl1', parent: 'pdl1-root',
    label: 'TPS 50% or more', shortLabel: 'TPS ≥50%',
    prevalence: 22.4,
    markers: { PDL1: '≥50%' },
    summary: '530 of 2,368 patients: half or more of the tumour cells stain. The share was similar ' +
             'across the world regions the study covered.',
    sources: [
      { label: 'Dietel et al, Lung Cancer 2019 — EXPRESS', url: 'https://pubmed.ncbi.nlm.nih.gov/31319978/' }
    ]
  },

  /* ============================== AXIS 4 — RESISTANCE ============================== */

  {
    id: 'res-root', axis: 'resistance', parent: null,
    label: 'EGFR-mutant adenocarcinoma', shortLabel: 'EGFR-mutant',
    summary: 'One genotype followed across treatment. The two nodes below are the same kind of ' +
             'tumour sampled at two points; what changes between them is what the tumour acquired, ' +
             'and what does not change is the comparison that makes the change believable.',
    related: [
      { to: 'drv-egfr', kind: 'overlaps',
        note: 'The same genotype as the common EGFR class on the driver axis, from a different MSK cohort.' }
    ],
    sources: [
      { label: 'MSK Lung Adenocarcinoma Met Organotropism, via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=luad_mskcc_2023_met_organotropism' }
    ]
  },

  {
    id: 'res-naive', axis: 'resistance', parent: 'res-root',
    label: 'Sampled before targeted therapy', shortLabel: 'Before',
    summary: 'The baseline the other node is read against: 364 patients whose sample the study ' +
             'records as taken before any targeted therapy.',
    molecular: {
      drivers: [
        { gene: 'EGFR T790M', alteration: 'mutation', frequency: 6, role: 'resistance allele' },
        { gene: 'EGFR C797X', alteration: 'mutation', frequency: 0.5, role: 'resistance allele' },
        { gene: 'MET', alteration: 'amplification', frequency: 2, role: 'bypass oncogene' },
        { gene: 'EGFR', alteration: 'amplification', frequency: 19, role: 'oncogene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 62, role: 'tumour suppressor' }
      ]
    },
    sources: [
      { label: 'MSK Lung Adenocarcinoma Met Organotropism, via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=luad_mskcc_2023_met_organotropism' }
    ]
  },

  {
    id: 'res-treated', axis: 'resistance', parent: 'res-root',
    label: 'Sampled after targeted therapy', shortLabel: 'After',
    summary: 'The same genotype after targeted therapy, in 219 patients. T790M rises from 5.8% to ' +
             '21.0%, MET amplification from 1.9% to 10.0%, and changes at EGFR C797 from 0.5% to ' +
             '4.6%. TP53, which no EGFR drug acts on, moves far less — 61.5% to 68.5%.',
    molecular: {
      drivers: [
        { gene: 'EGFR T790M', alteration: 'mutation', frequency: 21, role: 'resistance allele' },
        { gene: 'EGFR C797X', alteration: 'mutation', frequency: 5, role: 'resistance allele' },
        { gene: 'MET', alteration: 'amplification', frequency: 10, role: 'bypass oncogene' },
        { gene: 'EGFR', alteration: 'amplification', frequency: 31, role: 'oncogene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 69, role: 'tumour suppressor' },
        { gene: 'RB1', alteration: 'mutation', frequency: 9, role: 'tumour suppressor' }
      ],
      pathways: [
        { name: 'After first-line osimertinib (FLAURA)', status: 'MET amplification 16%, C797S 6%, no T790M',
          note: 'Plasma DNA at progression or discontinuation in 109 patients from the osimertinib ' +
                'arm; many had more than one mechanism, so the figures do not add up to a whole. A ' +
                'named drug, a blood test and a trial population — a different measurement from the ' +
                'tissue cohort above, which is why the two T790M figures disagree.',
          source: { ref: 'chmielecki-2023',
                    quote: 'No EGFR T790M-mediated acquired resistance are observed; most frequent resistance ' +
                           'mechanisms are MET amplification (n = 17; 16%) and EGFR C797S mutations (n = 7; 6%). ' +
                           '… 109/137 (80%) in the osimertinib arm … More than one acquired resistance mechanism ' +
                           'was detected in 15 (14%) patients' } }
      ]
    },
    related: [
      { to: 'hist-sclc', kind: 'progresses-to',
        note: 'Some EGFR-mutant tumours return as small cell lung cancer when resistance develops — ' +
              'a change of lineage no sequencing panel for EGFR would report.' }
    ],
    sources: [
      { label: 'MSK Lung Adenocarcinoma Met Organotropism, via cBioPortal',
        url: 'https://www.cbioportal.org/study/summary?id=luad_mskcc_2023_met_organotropism' },
      { label: 'Chmielecki et al, Nat Commun 2023 — FLAURA resistance analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36849494/' },
      { label: 'Oser et al, Lancet Oncol 2015 — transformation to small cell lung cancer',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25846096/' }
    ]
  }
  ]
});
