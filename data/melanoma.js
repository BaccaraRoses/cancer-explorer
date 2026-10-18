/* data/melanoma.js — Melanoma dataset for the Cancer Subtype Explorer.
 *
 * Phases 3 to 5 of the plan "Melanoma After Colorectal": the pathway axis
 * (the default), the markers and the glossary (phase 3); the profile,
 * baseline, factors and detection (phase 4); the driver-class axis and the
 * resistance contrast (phase 5); the PMEL target entry, chosen by a germline
 * test (phase 6). The rest of the targets and the literature follow in phase 7.
 *
 * ---- PMEL, the target no tumour test selects (phase 6) ----------------------
 *
 * Tebentafusp's label selects patients by genotyping blood for HLA-A*02:01, so
 * PMEL's tumour alteration frequency is not who can receive it. The entry uses
 * targets[].germline (SCHEMA.md): the share is counted, 551 of 1,072 patients
 * screened for IMCgp100-202 (Cohen 2026, and 51.4% in Olivier 2023); the CIWD
 * allele frequencies stay in the note, called shares of alleles. Phase 7 must
 * file PMEL as basis "germline" in pipeline/cxp/targets.py.
 *
 * ---- Why pathway is the default --------------------------------------------
 *
 * The 2018 WHO classification sorts melanomas first by whether sun exposure
 * caused them, judged by mutational signature, anatomic site and epidemiology
 * (Elder et al 2020, PMID 32057276). That is the fork where the genome changes:
 * in the MSK-IMPACT 50K cohort BRAF V600 is in 31.1% of skin melanomas and in 0
 * of 139 uveal melanomas, which carry a GNAQ or GNA11 hotspot in 127. It applies
 * to every melanoma, which the driver-class axis (skin and unknown primary only)
 * does not.
 *
 * ---- Shares, and the three places they come from ---------------------------
 *
 *   - National Cancer Data Base, 84,836 melanomas diagnosed 1985–1994 (Chang et
 *     al, Cancer 1998, PMID 9781962): cutaneous 91.2, ocular 5.2, mucosal 1.3,
 *     unknown primary 2.2. Old, from hospital registries, and the axis note
 *     says so. SEER counts only melanoma of the skin, so it cannot split them.
 *   - The same report: 85.0% of ocular melanomas uveal, 4.8% conjunctival and
 *     10.2% at other eye sites. path-uveal 4.4 = 5.2 × 85.0%; the other 0.8 is
 *     the rest.
 *   - Acral melanoma from a DIFFERENT study: Holman et al, Prev Med 2023 (PMID
 *     37659614), Table 1, US registries covering 99% of the population,
 *     2010–2019. Acral lentiginous melanoma (ICD-O-3 8744) 8,036 cases against
 *     746,698 other malignant melanomas (8720–8743, 8745–8790), summed over the
 *     table's six race and ethnicity groups: 1.1% of melanoma. path-skin 90.1 =
 *     91.2 − 1.1, a difference between two studies. The count is a histology
 *     code, not a site, so acral melanomas recorded under another histology are
 *     missing from it: a floor, and the node says so.
 *
 * ---- Structure the plan did not name -----------------------------------------
 *
 * Two intermediate nodes carry the registry groups the shares come in:
 * path-cutaneous (skin and acral) and path-ocular (uveal and the rest of the
 * eye). path-ocular-other holds conjunctival melanoma, which MSK's cohort has 6
 * patients of, too few for a card. None of these three is a cohort node.
 *
 * ---- TERT --------------------------------------------------------------------
 *
 * The overlay's "TERT mutation" counts any non-silent TERT call, and in this
 * cohort nearly all are promoter calls (5' flank, protein change "Promoter"):
 * 814 of the 825 skin patients with a call, 134 of 135 unknown primary. The
 * rows say promoter; the figure stays the computed one.
 *
 * ---- The driver-class axis (phase 5) ---------------------------------------
 *
 * Read, not derived: MSK's mel_mskimpact_2020 records the study's own driver
 * group on every one of its 696 patients (Shoushtari et al, Clin Cancer Res
 * 2021, PMID 33509808, read in full on PMC). The cohort is cutaneous melanoma
 * and melanoma of unknown primary, mostly metastases, so the axis carries a
 * `population` and no `share`: no source gives that group's share of all
 * melanoma, and a sum of two registry shares would describe diagnoses, not a
 * referral centre's sequenced metastases.
 *
 * One node the pipeline does not name: drv-braf-v600, over V600E and the other
 * V600 changes, because the BRAF and MEK combinations are approved on V600E or
 * V600K (NCI PDQ) — the colorectal precedent of drv-ras-mutant.
 *
 * The resistance contrast (decision 4: no axis) is a `pathways` row on that
 * card, not a `biomarkers` row as the plan wrote: a biomarker row renders no
 * note, and the note — single agents, no copy-number data, NF1 and PTEN level
 * for contrast — is what keeps 1 of 39 against 7 of 39 honest. Counts recomputed
 * from skcm_broad_brafresist_2012 on 2026-09-15; the drug split (31 vemurafenib,
 * 14 dabrafenib) is its MEDICATION attribute.
 *
 * TERT rows on the driver cards say promoter: in this cohort 572 of the 575
 * patients with a TERT call have one in the promoter (5' flank).
 *
 * Node ids path-skin, path-acral, path-mucosal, path-uveal and path-unknown,
 * and drv-braf-v600e, drv-braf-v600-other, drv-braf-class23, drv-nras-q61,
 * drv-ras-other, drv-nf1, drv-kit, drv-other and drv-unknown, are a CONTRACT
 * with pipeline/cxp/cancers.py.
 *
 * Verified 2026-09-14; the driver-class axis 2026-09-15.
 */
CancerExplorer.register({

  id: 'melanoma',
  name: 'Melanoma',
  synonyms: ['malignant melanoma', 'cutaneous melanoma', 'acral melanoma', 'mucosal melanoma', 'uveal melanoma'],
  overview: 'Sorted first by where it started — skin, the palms and soles, a mucous membrane, the eye, ' +
            'or nowhere that could be found — because each of those routes carries a different genome.',
  incidence: '~112,000 new US cases and ~8,510 deaths estimated for 2026 — melanoma of the skin only, as SEER counts it',
  lastVerified: '2026-09-15',

  references: [
    { id: 'seer-melanoma', label: 'SEER Cancer Stat Facts: Melanoma of the Skin — incidence, mortality, stage and survival',
      journal: 'NCI SEER, 2026 estimates', url: 'https://seer.cancer.gov/statfacts/html/melan.html' },
    { id: 'ncdb-1998', label: 'Chang, Karnell and Menck — the National Cancer Data Base report on cutaneous and noncutaneous melanoma: a summary of 84,836 cases from the past decade',
      journal: 'Cancer 1998', pmid: '9781962', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
    { id: 'holman-2023', label: 'Holman et al — acral lentiginous melanoma incidence by sex, race, ethnicity, and stage in the United States, 2010–2019 (Table 1)',
      journal: 'Prev Med 2023', pmid: '37659614', url: 'https://pubmed.ncbi.nlm.nih.gov/37659614/' },
    { id: 'elder-2020', label: 'Elder et al — the 2018 World Health Organization classification of cutaneous, mucosal, and uveal melanoma: 9 distinct subtypes defined by their evolutionary pathway',
      journal: 'Arch Pathol Lab Med 2020', pmid: '32057276', url: 'https://pubmed.ncbi.nlm.nih.gov/32057276/' },
    { id: 'msk-50k-2026', label: 'Bandlamudi et al — cancer type-specific variation in patterns of driver alterations across 50,000 tumors (MSK-IMPACT 50K)',
      journal: 'Cancer Cell 2026', pmid: '41895280', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' },
    { id: 'lattanzi-2019', label: 'Lattanzi et al — primary melanoma histologic subtype: impact on survival and response to therapy',
      journal: 'J Natl Cancer Inst 2019', pmid: '29912415', url: 'https://pubmed.ncbi.nlm.nih.gov/29912415/' },
    { id: 'nci-melanoma-hp', label: 'NCI PDQ — Melanoma Treatment (Health Professional Version), updated May 2, 2025',
      journal: 'National Cancer Institute', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' },
    { id: 'nci-melanoma-patient', label: 'NCI PDQ — Melanoma Treatment (Patient Version): stages, ulceration and sentinel lymph node biopsy, updated May 16, 2025',
      journal: 'National Cancer Institute', url: 'https://www.cancer.gov/types/skin/patient/melanoma-treatment-pdq' },

    /* ---- phase 4: world figures, risk and detection ---- */
    { id: 'globocan-2024-melanoma', label: 'IARC Global Cancer Observatory — GLOBOCAN 2024 fact sheet: melanoma of skin (8 July 2026)',
      journal: 'International Agency for Research on Cancer', url: 'https://gco.iarc.who.int/media/globocan/factsheets/cancers/16-melanoma-of-skin-fact-sheet.pdf' },
    { id: 'uspstf-2023', label: 'US Preventive Services Task Force — Screening for skin cancer: recommendation statement',
      journal: 'JAMA 2023', pmid: '37071089', url: 'https://pubmed.ncbi.nlm.nih.gov/37071089/' },
    { id: 'henrikson-2023', label: 'Henrikson et al — skin cancer screening: updated evidence report and systematic review for the USPSTF',
      journal: 'JAMA 2023', pmid: '37071090', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13178561/' },
    { id: 'henrikson-2018', label: 'Henrikson et al — behavioral counseling for skin cancer prevention: evidence report for the USPSTF',
      journal: 'JAMA 2018', pmid: '29558557', url: 'https://pubmed.ncbi.nlm.nih.gov/29558557/' },
    { id: 'linos-2009', label: 'Linos et al — increasing burden of melanoma in the United States',
      journal: 'J Invest Dermatol 2009', pmid: '19131946', url: 'https://pubmed.ncbi.nlm.nih.gov/19131946/' },
    { id: 'welch-2005', label: 'Welch, Woloshin and Schwartz — skin biopsy rates and incidence of melanoma: population based ecological study',
      journal: 'BMJ 2005', pmid: '16081427', url: 'https://pubmed.ncbi.nlm.nih.gov/16081427/' },
    { id: 'adamson-2022', label: 'Adamson, Suarez and Welch — estimating overdiagnosis of melanoma using trends among Black and White patients in the US',
      journal: 'JAMA Dermatol 2022', pmid: '35293957', url: 'https://pubmed.ncbi.nlm.nih.gov/35293957/' },
    { id: 'gandini-2005-naevi', label: 'Gandini et al — meta-analysis of risk factors for cutaneous melanoma: I. Common and atypical naevi',
      journal: 'Eur J Cancer 2005', pmid: '15617989', url: 'https://pubmed.ncbi.nlm.nih.gov/15617989/' },
    { id: 'gandini-2005-phenotype', label: 'Gandini et al — meta-analysis of risk factors for cutaneous melanoma: III. Family history, actinic damage and phenotypic factors',
      journal: 'Eur J Cancer 2005', pmid: '16125929', url: 'https://pubmed.ncbi.nlm.nih.gov/16125929/' },
    { id: 'boniol-2012', label: 'Boniol et al — cutaneous melanoma attributable to sunbed use: systematic review and meta-analysis',
      journal: 'BMJ 2012', pmid: '22833605', url: 'https://pubmed.ncbi.nlm.nih.gov/22833605/' },
    { id: 'bishop-2002', label: 'Bishop et al — geographical variation in the penetrance of CDKN2A mutations for melanoma',
      journal: 'J Natl Cancer Inst 2002', pmid: '12072543', url: 'https://pubmed.ncbi.nlm.nih.gov/12072543/' },
    { id: 'engels-2011', label: 'Engels et al — spectrum of cancer risk among US solid organ transplant recipients (Table 2)',
      journal: 'JAMA 2011', pmid: '22045767', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3310893/' },
    { id: 'dinnes-2018-visual', label: 'Dinnes et al — visual inspection for diagnosing cutaneous melanoma in adults (Cochrane review)',
      journal: 'Cochrane Database Syst Rev 2018', pmid: '30521684', url: 'https://pubmed.ncbi.nlm.nih.gov/30521684/' },
    { id: 'dinnes-2018-dermoscopy', label: 'Dinnes et al — dermoscopy, with and without visual inspection, for diagnosing melanoma in adults (Cochrane review)',
      journal: 'Cochrane Database Syst Rev 2018', pmid: '30521682', url: 'https://pubmed.ncbi.nlm.nih.gov/30521682/' },
    { id: 'berwick-1996', label: 'Berwick et al — screening for cutaneous melanoma by skin self-examination',
      journal: 'J Natl Cancer Inst 1996', pmid: '8847720', url: 'https://pubmed.ncbi.nlm.nih.gov/8847720/' },
    { id: 'paddock-2016', label: 'Paddock et al — skin self-examination and long-term melanoma survival',
      journal: 'Melanoma Res 2016', pmid: '26990272', url: 'https://pubmed.ncbi.nlm.nih.gov/26990272/' },
    { id: 'chuchu-2018', label: 'Chuchu et al — smartphone applications for triaging adults with skin lesions suspicious for melanoma (Cochrane review)',
      journal: 'Cochrane Database Syst Rev 2018', pmid: '30521685', url: 'https://pubmed.ncbi.nlm.nih.gov/30521685/' },
    { id: 'ji-xu-2021', label: 'Ji-Xu, Dinnes and Matin — total body photography for the diagnosis of cutaneous melanoma in adults: systematic review and meta-analysis',
      journal: 'Br J Dermatol 2021', pmid: '33369727', url: 'https://pubmed.ncbi.nlm.nih.gov/33369727/' },
    { id: 'elmore-2017', label: 'Elmore et al — pathologists\' diagnosis of invasive melanoma and melanocytic proliferations: observer accuracy and reproducibility',
      journal: 'BMJ 2017', pmid: '28659278', url: 'https://pubmed.ncbi.nlm.nih.gov/28659278/' },

    /* ---- phase 5: the driver-class axis and the resistance contrast ---- */
    { id: 'shoushtari-2021', label: 'Shoushtari et al — therapeutic implications of detecting MAPK-activating alterations in cutaneous and unknown primary melanomas',
      journal: 'Clin Cancer Res 2021', pmid: '33509808', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' },
    { id: 'cbio-mel-mskimpact-2020', label: 'Melanoma (MSK, Clin Cancer Res 2021) on cBioPortal — mel_mskimpact_2020, DRIVER_CLASS and DMT_PRIMARY_SITE_CLASSIFIED',
      journal: 'cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
    { id: 'van-allen-2014', label: 'Van Allen et al — the genetic landscape of clinical resistance to RAF inhibition in metastatic melanoma',
      journal: 'Cancer Discov 2014', pmid: '24265153', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3947264/' },
    { id: 'cbio-brafresist-2012', label: 'Skin Cutaneous Melanoma (Broad, Cancer Discov 2014) on cBioPortal — skcm_broad_brafresist_2012, samples named _Pre and _Post, MEDICATION',
      journal: 'cBioPortal', url: 'https://www.cbioportal.org/study/summary?id=skcm_broad_brafresist_2012' },

    /* Phase 6, the germline-selected target (plan check M1), each read on
       2026-09-15: the Kimmtrak label through openFDA; Cohen 2026 and Olivier
       2023 in full on PMC. The trial report (Nathan 2021, PMID 34551229) is not
       open, so the screening count is cited from the two papers that quote it. */
    { id: 'label-tebentafusp', label: 'KIMMTRAK (tebentafusp-tebn) US prescribing information, via openFDA — indication, patient selection (2.1) and mechanism of action (12.1); effective 2026-08-20',
      journal: 'US FDA label', url: 'https://api.fda.gov/drug/label.json?search=set_id:24a49f57-d2fc-4ffe-9eb1-fe0460c6b067' },
    { id: 'cohen-2026', label: 'Cohen, Mehmi, Avner, Moyers and Hamid — tebentafusp (IMCgp100) for HLA-A*02:01 positive uveal melanoma: product review',
      journal: 'Hum Vaccin Immunother 2026', pmid: '42163062', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13196628/' },
    { id: 'olivier-2023', label: 'Olivier, Haslam, Tuia and Prasad — eligibility for human leukocyte antigen-based therapeutics by race and ethnicity (Table 2: HLA-A allele frequencies from the CIWD 3.0.0 catalogue)',
      journal: 'JAMA Netw Open 2023', pmid: '37883087', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10603498/' },

    /* Phase 7. Every melanoma indication in the curated melanoma drug pipeline,
       read through openFDA on 2026-09-15; the date on each is the label's own
       effective date, and the link is the openFDA record it was read from. */
    { id: 'label-vemurafenib', label: 'Zelboraf (vemurafenib) US prescribing information — indication and limitation of use (effective 28 August 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:38eea320-7e0c-485a-bc30-98c3c45e2763' },
    { id: 'label-cobimetinib', label: 'Cotellic (cobimetinib) US prescribing information — melanoma indication and mechanism of action (effective 29 July 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:c387579e-cee0-4334-bd1e-73f93ac1bde6' },
    { id: 'label-dabrafenib', label: 'Tafinlar (dabrafenib) US prescribing information — melanoma indications, single agent and with trametinib (effective 20 May 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea' },
    { id: 'label-trametinib', label: 'Mekinist (trametinib) US prescribing information — melanoma indications, mechanism of action, and the section on activity after BRAF-inhibitor therapy (effective 7 May 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:0002ad27-779d-42ab-83b5-bc65453412a1' },
    { id: 'label-encorafenib', label: 'Braftovi (encorafenib) US prescribing information — melanoma indication and limitations of use (effective 26 February 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:235dfc38-0f0b-4037-b501-7a9f4294740c' },
    { id: 'label-binimetinib', label: 'Mektovi (binimetinib) US prescribing information — melanoma indication and mechanism of action (effective 20 March 2025)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:6c3408ac-d401-4925-8a03-26591afbc240' },
    { id: 'label-atezolizumab', label: 'Tecentriq (atezolizumab) US prescribing information — melanoma indication with cobimetinib and vemurafenib (effective 20 May 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:6fa682c9-a312-4932-9831-f286908660ee' },
    { id: 'label-ipilimumab', label: 'Yervoy (ipilimumab) US prescribing information — melanoma indications and the adjuvant trial (E1609) it cites (effective 20 August 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:2265ef30-253e-11df-8a39-0800200c9a66' },
    { id: 'label-nivolumab', label: 'Opdivo (nivolumab) US prescribing information — melanoma indications, single agent, with ipilimumab, and adjuvant (effective 12 August 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:f570b9c4-6846-4de2-abfa-4d0a4ae4e394' },
    { id: 'label-pembrolizumab', label: 'Keytruda (pembrolizumab) US prescribing information — melanoma indications, metastatic and adjuvant (effective 10 July 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:9333c79b-d487-4538-a9f0-71b91a02b287' },
    { id: 'label-nivolumab-relatlimab', label: 'Opdualag (nivolumab and relatlimab-rmbw) US prescribing information — indication and mechanism of action (effective 8 June 2026)',
      journal: 'US FDA label, via openFDA', setid: 'b22c9d83-3256-4e17-85f7-f331a504adc6',
      url: 'https://api.fda.gov/drug/label.json?search=set_id:b22c9d83-3256-4e17-85f7-f331a504adc6' },
    { id: 'label-talimogene', label: 'Imlygic (talimogene laherparepvec) US prescribing information — indication and mechanism of action (effective 4 April 2025)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:64ffb680-ea8c-42fc-9649-9e8c0eb77ddb' },
    { id: 'label-lifileucel', label: 'Amtagvi (lifileucel) US prescribing information — indication, accelerated approval and boxed warning (effective 14 October 2025)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:4121bd3f-2d6e-3bdd-e063-6294a90a3088' },
    { id: 'label-vusolimogene', label: 'Tudriqev (vusolimogene oderparepvec-wtpg) US prescribing information — indication with nivolumab and accelerated approval (effective 1 September 2026)',
      journal: 'US FDA label, via openFDA', url: 'https://api.fda.gov/drug/label.json?search=set_id:26627b8d-91ac-4f76-a213-7e25efd024d1' }
  ],

  /* ---- profile ------------------------------------------------------
     The front door. The registry tiles come from the SEER overlay, and SEER
     counts melanoma of the skin only, so `registryCovers` makes every tile say
     so (plan check M2). Most readers arrive knowing two things: that melanoma
     is a skin cancer, and that it is common. The second paragraph is the fact
     the page is built around — diagnoses have tripled while deaths have not
     moved — read off SEER's own trend table on 2026-09-14.
  -------------------------------------------------------------------- */
  profile: {
    definition:
      'Melanoma is cancer of the {{melanocyte|melanocytes}}, the cells that make the pigment in skin. Most ' +
      'melanomas start in the skin — more than half of them in skin that looked normal, not in an existing ' +
      '{{naevus|mole}} — but melanocytes also live in the mucous membranes and the eye, and melanoma can start ' +
      'there too. Invasive melanoma is about 1% of skin cancers and causes the most skin cancer deaths.',

    definitionMore:
      'Its diagnoses and its deaths have parted company. In SEER\'s longest-running registries, new melanomas ' +
      'of the skin went from 8.80 per 100,000 people in 1975 to 28.26 in 2023 — more than three times the ' +
      'rate — while the US death rate was 2.06 per 100,000 in 1975 and 2.00 in 2024, and never above 2.81 in ' +
      'between. SEER\'s models still have new cases rising 1.1% a year over 2014–2023, and deaths falling 2.2% ' +
      'a year over 2015–2024. How much of the rise is more melanoma and how much is more looking is disputed, ' +
      'and the detection page gives both sides. Nor is it only a disease of older people: the median age at ' +
      'diagnosis is 67, yet NCI notes that melanoma is the most common cancer in adults aged 25 to 29.',

    world: {
      newCasesPerYear: 337969,
      deathsPerYear: 58398,
      label: 'World',
      note: 'Modelled estimates in GLOBOCAN 2024: about 338,000 new cases of melanoma of the skin and 58,000 ' +
            'deaths, the 17th most common cancer and the 22nd cause of cancer death worldwide. 44.6% of the new ' +
            'cases were in Europe, 33.0% in Northern America and 2.3% in Africa. Not a registry count, and not ' +
            'comparable with the US column beside it.',
      source: { label: 'IARC Global Cancer Observatory — GLOBOCAN 2024 fact sheet: melanoma of skin (8 July 2026)',
                url: 'https://gco.iarc.who.int/media/globocan/factsheets/cancers/16-melanoma-of-skin-fact-sheet.pdf' }
    },

    registryCovers: 'melanoma of the skin',

    classification:
      'There is no single correct way to sort melanoma. Several are in use at once, and each sorts every ' +
      'tumour on its own — so a tumour has several answers, all true. Each is a {{classification axis}} here. ' +
      'The first is where it started: the 2018 WHO classification separates the melanomas sun exposure causes ' +
      'from those it does not, reading each {{evolutionary pathway}} from the mutational signature, the ' +
      'anatomic site and the epidemiology. The second, for skin melanoma and melanoma of unknown primary, is ' +
      'the gene change that switched on the tumour\'s growth signal — the one that decides whether BRAF and ' +
      'MEK inhibitors are an option.',

    classificationClose:
      'Where a melanoma starts says a great deal about its genome. In the MSK-IMPACT cohort {{BRAF V600}} is ' +
      'in 31.1% of skin melanomas and in none of 139 uveal melanomas, 127 of which carry a {{GNAQ|GNAQ or ' +
      'GNA11}} hotspot instead. The older way of sorting, by histologic subtype, is still written on pathology ' +
      'reports, and the sources disagree about what it adds: NCI calls the subtype names of historical ' +
      'interest, while a SEER analysis found {{nodular melanoma}} carried a higher risk of death than ' +
      '{{superficial spreading melanoma}} after thickness, ulceration and stage were accounted for.',

    reportIntro:
      'A skin melanoma is described on the {{pathology report}} from its {{biopsy}}: how thick it is, whether ' +
      'its surface has broken down, which histologic subtype it looks like, and — if one was removed — whether ' +
      'the {{sentinel lymph node}} holds melanoma. The tissue may also be tested for gene changes, which can ' +
      'help plan treatment. These are the words they use, and each one is a rung into the rest of this site.',

    /* Only BRAF V600 names an axis. The four histologic subtypes are report
       terms, not a classification here (decision 3), and staging words are on
       every report without being one. */
    reportTerms: [
      { term: 'Breslow thickness',
        plain: 'How deep the melanoma goes, in millimetres, from the skin surface to its deepest part. With ' +
               '{{ulceration}}, it sets the T category of the stage.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Ulceration',
        plain: 'Whether the skin over the melanoma has broken down. An ulcerated tumour is staged higher than ' +
               'one of the same thickness without it.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Sentinel lymph node',
        plain: 'The first node lymph from the tumour drains to, removed to look for melanoma too small to find ' +
               'by examination or imaging. Whether it holds melanoma helps set the stage.',
        goToLens: 'risk', goToView: 'detection' },

      { term: 'Superficial spreading melanoma',
        plain: 'A histologic subtype name, and a {{CSD|low-CSD}} melanoma in the WHO scheme. It names a skin ' +
               'melanoma; this site does not split skin melanoma by subtype.',
        goTo: 'path-skin' },

      { term: 'Nodular melanoma',
        plain: 'A histologic subtype name. In SEER it carried a higher risk of death than superficial spreading ' +
               'melanoma once thickness, ulceration and stage were accounted for; NCI gives subtype names no ' +
               'independent prognostic weight.',
        goTo: 'path-skin' },

      { term: 'Lentigo maligna melanoma',
        plain: 'A histologic subtype name for a {{CSD|high-CSD}} melanoma, arising in skin with heavy ' +
               'cumulative sun damage.',
        goTo: 'path-skin' },

      { term: 'Acral lentiginous melanoma',
        plain: 'The histologic subtype for melanoma of the palms, soles and nail beds, and the code registries ' +
               'count {{acral melanoma}} by — which is why the acral share here is a floor.',
        goTo: 'path-acral' },

      { term: 'BRAF V600', marker: 'BRAF',
        plain: 'A DNA test of the tumour. A V600 mutation decides whether BRAF and MEK inhibitors are an option; ' +
               'it is common in skin melanoma and absent from the uveal melanomas on this site.',
        axis: 'driver', goTo: 'drv-braf-v600' },

      { term: 'Stage',
        plain: 'How far it has spread. Most melanoma of the skin — 77% — is found while it is still localised.',
        goToLens: 'risk', goToView: 'detection' }
    ],

    /* The generated Subtypes example reads "Cutaneous is 91.2% of cases; Ocular
       is 5.2% and behaves very differently" — true in outline, but ocular holds
       conjunctival melanoma too, and "very differently" says nothing the data
       cannot say exactly. */
    lensExamples: {
      subtypes: 'Cutaneous melanoma is 91.2% of melanomas in the National Cancer Data Base. Uveal melanoma, ' +
                'about 4.4%, carries a GNAQ or GNA11 hotspot in 127 of 139 tumours here, and BRAF V600 in none.'
    },

    sources: [
      { label: 'SEER Cancer Stat Facts: Melanoma of the Skin — rates, trend table, median age',
        url: 'https://seer.cancer.gov/statfacts/html/melan.html' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version): clinical features, incidence',
        url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' },
      { label: 'NCI PDQ — Melanoma Treatment (Patient Version): biopsy and gene testing',
        url: 'https://www.cancer.gov/types/skin/patient/melanoma-treatment-pdq' },
      { label: 'US Preventive Services Task Force, JAMA 2023 — melanoma is about 1% of skin cancers',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37071089/' },
      { label: 'Elder et al, Arch Pathol Lab Med 2020 — the 2018 WHO classification',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32057276/' },
      { label: 'MSK-IMPACT 50K on cBioPortal — BRAF V600 and GNAQ/GNA11 by pathway',
        url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' },
      { label: 'Lattanzi et al, J Natl Cancer Inst 2019 — nodular against superficial spreading melanoma',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29912415/' }
    ]
  },

  /* ---- baseline -----------------------------------------------------
     SEER's lifetime risk, which is melanoma of the skin only. No strata.
  -------------------------------------------------------------------- */
  baseline: {
    population: 'US men and women, melanoma of the skin',
    lifetimeRisk: 2.2,
    lifetimeRiskLabel: 'about 2 in 100',
    note: 'Melanoma of the skin only, as SEER counts it: mucosal and uveal melanoma are not in it. Averaged over ' +
          'a whole lifetime at current rates, and over everyone — from people with many moles or an inherited ' +
          'CDKN2A mutation to people whose skin is dark, whose rates are a small fraction of it. Every factor ' +
          'below was measured on cutaneous melanoma, not on melanoma as a whole, so none is converted against ' +
          'this figure.',
    source: { label: 'SEER Cancer Stat Facts: Melanoma of the Skin — lifetime risk, 2021–2023',
              url: 'https://seer.cancer.gov/statfacts/html/melan.html' }
  },

  /* ---- factors ------------------------------------------------------
     Sixteen. The heaviest use of `scope` yet: every row carries
     scope 'path-cutaneous', because every study behind them counted cutaneous
     melanoma, and none of them describes mucosal or uveal melanoma. The
     renderer therefore converts none of them — which is also why the baseline
     note says so. (Cutaneous is the population SEER's baseline counts too; an
     engine field saying "the baseline is this node" would let the transplant
     row, measured against the general population, convert exactly. Not built.)

     Referents: the meta-analysis rows compare the most exposed group with the
     least exposed one inside the same population (fewer than 15 naevi, dark
     skin, never used a sunbed), which SCHEMA.md calls 'unexposed'. The plan's
     guard table said 'other' for naevi; 'other' is for a group outside the
     baseline population, and people with few moles are not.

     Sources are abstracts read on 2026-09-14, and Engels 2011 Table 2 in full.
     Gandini's sun-exposure meta-analysis (part II) gives no pooled figures in
     its abstract, so sunburn and intermittent exposure are not rows.
  -------------------------------------------------------------------- */
  factors: [

    { id: 'age', label: 'Increasing age', category: 'Demographic', modifiable: false,
      source: ['seer-melanoma', 'nci-melanoma-hp'],
      direction: 'increases', magnitude: 'median age at diagnosis 67', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Melanoma of the skin: median age 67 at diagnosis and 73 at death, and 27.8% of new cases are found ' +
            'at 65–74. It is still the most common cancer in adults aged 25 to 29, NCI notes. The lifetime risk ' +
            'is itself an age-integrated number, so no single multiplier captures age.' },

    { id: 'sex', label: 'Male sex', category: 'Demographic', modifiable: false,
      source: 'seer-melanoma',
      direction: 'increases', magnitude: '28.3 new cases per 100,000 men against 17.9 per 100,000 women',
      evidence: 'strong', scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Age-adjusted rates for melanoma of the skin. The death rate was 2.9 per 100,000 men against 1.3 ' +
            'per 100,000 women.' },

    { id: 'race-ethnicity', label: 'Race and ethnicity', category: 'Demographic', modifiable: false,
      source: [{ ref: 'uspstf-2023', quote: 'Melanoma is about 30 times more common in White persons than in Black persons.' },
               'seer-melanoma', 'holman-2023', 'henrikson-2023'],
      direction: 'increases', magnitude: 'about 30 times as common in White as in Black persons',
      evidence: 'strong', scope: 'path-cutaneous', affects: ['path-skin', 'path-acral'],
      note: 'SEER: 40.7 new cases per 100,000 non-Hispanic White men against 1.1 per 100,000 non-Hispanic Black ' +
            'men. Acral lentiginous melanoma does not share the gap — 2.3 per million in non-Hispanic White and ' +
            '1.8 in non-Hispanic Black persons in 2010–2019 — so it is a far larger share of melanoma where ' +
            'other melanomas are rare. People with darker skin are often diagnosed at later stages, and with ' +
            'stage I or localised melanoma, Black, Asian American and Pacific Islander, American Indian and ' +
            'Alaska Native, and Hispanic adults had higher melanoma mortality than White adults at the same stage.' },

    /* ---- family and inherited ---- */

    { id: 'family-history', label: 'Family history of melanoma', category: 'Family history', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'pooled estimates for family history (RR = 1.74, 1.41-2.14)' },
      direction: 'increases', rr: [1.41, 2.14], referent: 'unexposed',
      magnitude: 'RR 1.74 (1.41–2.14)', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Pooled from observational studies of cutaneous melanoma published before September 2002; the ' +
            'meta-analysis drew on 60 studies across the factors it covered.' },

    { id: 'cdkn2a', label: 'Inherited CDKN2A mutation', category: 'Germline', modifiable: false,
      source: 'bishop-2002',
      direction: 'increases', absoluteLifetime: [58, 91],
      magnitude: 'melanoma by age 80: 58% in Europe, 76% in the US, 91% in Australia', evidence: 'moderate',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Estimated in 80 families from Europe, Australia and the US, each with a documented mutation and ' +
            'several cases of cutaneous melanoma: 67% by 80 overall (95% CI 31–96) and 30% by 50. Penetrance ' +
            'rose with the population\'s own melanoma rate, and the authors suggest the same factors drive both. ' +
            'Measured in families selected for many melanomas, and to 80 rather than lifetime.' },

    /* ---- moles and pigmentation ---- */

    { id: 'naevi-common', label: 'Many common moles', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-naevi', quote: '101-120 naevi compared with <15 (pooled Relative Risk (RR) = 6.89; 95% Confidential ' +
                                                  'Interval (CI): 4.63, 10.25)' },
      direction: 'increases', rr: [4.63, 10.25], referent: 'unexposed',
      magnitude: 'RR 6.89 (4.63–10.25), 101–120 moles', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'People with 101–120 common moles against people with fewer than 15, pooled from 46 studies ' +
            'published before September 2002. Case–control studies, especially those ' +
            'recruiting in hospitals, gave lower and more precise estimates than cohort studies.' },

    { id: 'naevi-atypical', label: 'Atypical moles', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-naevi', quote: 'the number of atypical naevi (RR = 6.36 95%; CI: 3.80, 10.33; for 5 versus 0)' },
      direction: 'increases', rr: [3.80, 10.33], referent: 'unexposed',
      magnitude: 'RR 6.36 (3.80–10.33) with 5 atypical moles against none', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'The same meta-analysis as common moles.' },

    { id: 'red-hair', label: 'Red hair', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'hair colour (Red vs. Dark: RR = 3.64, 2.56-5.37)' },
      direction: 'increases', rr: [2.56, 5.37], referent: 'unexposed',
      magnitude: 'RR 3.64 (2.56–5.37), red against dark hair', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Latitude and whether a study adjusted for other phenotype factors changed the estimates in this ' +
            'meta-analysis.' },

    { id: 'freckles', label: 'Many freckles', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'high density of freckles (RR = 2.10, 1.80-2.45)' },
      direction: 'increases', rr: [1.80, 2.45], referent: 'unexposed',
      magnitude: 'RR 2.10 (1.80–2.45) for a high density of freckles', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'] },

    { id: 'skin-type', label: 'Skin type I', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'skin type (I vs. IV: RR = 2.09, 1.67-2.58)' },
      direction: 'increases', rr: [1.67, 2.58], referent: 'unexposed',
      magnitude: 'RR 2.09 (1.67–2.58), skin type I against IV', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'] },

    { id: 'fair-skin', label: 'Fair skin', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'skin colour (Fair vs. Dark: RR = 2.06, 1.68-2.52)' },
      direction: 'increases', rr: [1.68, 2.52], referent: 'unexposed',
      magnitude: 'RR 2.06 (1.68–2.52), fair against dark skin colour', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'] },

    { id: 'eye-colour', label: 'Blue eyes', category: 'Phenotype', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'eye colour (Blue vs. Dark: RR = 1.47, 1.28-1.69)' },
      direction: 'increases', rr: [1.28, 1.69], referent: 'unexposed',
      magnitude: 'RR 1.47 (1.28–1.69), blue against dark eyes', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'] },

    /* ---- sun and skin history ---- */

    { id: 'actinic-damage', label: 'Signs of sun damage on the skin', category: 'Sun exposure', modifiable: false,
      source: { ref: 'gandini-2005-phenotype', quote: 'actinic damage indicators (RR = 2.02, 1.24-3.29)' },
      direction: 'increases', rr: [1.24, 3.29], referent: 'unexposed',
      magnitude: 'RR 2.02 (1.24–3.29) for indicators of actinic damage', evidence: 'moderate',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'Actinic damage is the meta-analysis\'s term for skin damage caused by sunlight.' },

    { id: 'sunbed', label: 'Sunbed use', category: 'Sun exposure', modifiable: true,
      source: { ref: 'boniol-2012', quote: 'Based on 27 studies ever use of sunbeds was associated with a summary relative risk of ' +
                                           '1.20 (95% confidence interval 1.08 to 1.34)' },
      direction: 'increases', rr: [1.08, 1.34], referent: 'unexposed',
      magnitude: 'RR 1.20 (1.08–1.34) for ever use', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: 'From 27 studies; 1.25 (1.09–1.43) in cohort and population-based studies alone. First use before ' +
            'age 35: 1.87 (1.41–2.48), from 13 studies. Each additional session a year added 1.8% (95% CI ' +
            '0–3.8%) to the risk.' },

    { id: 'prior-skin-lesions', label: 'Earlier skin cancer or premalignant skin lesions', category: 'Medical',
      modifiable: false, source: { ref: 'gandini-2005-phenotype', quote: 'pre-malignant and skin cancer lesions (RR = 4.28, 2.80-6.55)' },
      direction: 'increases', rr: [2.80, 6.55], referent: 'unexposed',
      magnitude: 'RR 4.28 (2.80–6.55)', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'] },

    { id: 'organ-transplant', label: 'Solid organ transplant', category: 'Medical', modifiable: false,
      source: 'engels-2011',
      direction: 'increases', rr: [2.14, 2.63], referent: 'population',
      magnitude: 'SIR 2.38 (2.14–2.63) against the general population', evidence: 'strong',
      scope: 'path-cutaneous', affects: ['path-cutaneous'],
      note: '175,732 US transplants, 1987–2008: 381 melanomas against 160.3 expected, 28.5 extra per 100,000 ' +
            'person-years. The authors attribute transplant recipients\' raised cancer risk to immunosuppression ' +
            'and viral infections, and count melanoma among the cancers unrelated to infection. Cancers of the ' +
            'eye were counted separately.' }
  ],

  /* ---- detection ----------------------------------------------------
     The trade here is unlike breast's, prostate's or colorectal's: there is no
     trial, so no benefit estimate. USPSTF 2023 gives visual skin examination
     an I statement, and its evidence review found only nonrandomised studies.
     The tradeoff block says that as rows rather than leaving a column empty.

     The disagreement is about the rise itself. The plan named Welch et al,
     NEJM 2021 (PMID 33406334) for the overdiagnosis side "once read in full".
     It could not be read: nejm.org returns 403, PubMed carries no abstract,
     it is closed access and has no archived copy. So it is not quoted, and
     the same group's argument is quoted from two papers whose abstracts give
     their figures (Welch 2005, Adamson 2022).

     Stage figures are SEER's, as in the overlay; the hazard ratios in the
     stage notes are from the USPSTF evidence review's table (one US study of
     185,219 people), read in full on PMC.
  -------------------------------------------------------------------- */
  detection: {
    note: 'Most melanoma of the skin is found early — 77% while still localised — and it grows where it can be ' +
          'seen. What is disputed is what looking harder achieves: since 1975 the rate of new cases has more than ' +
          'tripled, while the death rate has not risen.',

    relativeSurvivalNote: 'Relative survival compares people who have the diagnosis with people of the same ' +
      'age who do not. It removes deaths from other causes rather than counting them, so it is not the share ' +
      'of people alive, and 100% does not mean no one died of the cancer. Every survival figure on this page is ' +
      'relative.',

    horizonNote: 'Localised melanoma of the skin reports 100.0% five-year relative survival: people found with ' +
      'it were as likely to be alive five years on as people of the same age without it. That is not the same ' +
      'as no one dying of it, and it says nothing about the years after five. The evidence review behind the ' +
      'US screening statement also warns that relative survival is more open than population death rates to ' +
      'lead-time bias — an earlier diagnosis making survival look longer — and to overdiagnosis.',

    stageOutcomes: [
      { stage: 'Localised', share: 77, fiveYear: 100.0, source: ['seer-melanoma', 'henrikson-2023'],
        note: 'Confined to the skin where it started. Against melanoma in situ, localised melanoma still carried ' +
              'an adjusted hazard ratio for melanoma death of 5.8 (5.3–6.3), in one US study of 185,219 people.' },
      { stage: 'Regional', share: 10, fiveYear: 76.0, source: ['seer-melanoma', 'henrikson-2023'],
        note: 'Spread to nearby lymph nodes. Hazard ratio 31.5 (28.9–34.2) against in situ, in the same study.' },
      { stage: 'Distant', share: 5, fiveYear: 34.0, source: ['seer-melanoma', 'henrikson-2023'],
        note: 'Spread to distant organs. Hazard ratio 169.6 (154.2–186.6) against in situ.' },
      { stage: 'Unknown', share: 9, fiveYear: 95.4, source: 'seer-melanoma',
        note: 'Unstaged in the registry record.' }
    ],

    tradeoff: {
      note: 'No randomised trial has tested screening for melanoma, so there is no benefit estimate to weigh ' +
            'against the harms. The US Preventive Services Task Force gives visual skin examination by a ' +
            'clinician an I statement: the evidence is insufficient to assess the balance of benefits and harms ' +
            'in adolescents and adults without symptoms.',
      basis: 'the evidence the USPSTF weighed in 2023 for clinician skin examination of people without symptoms — ' +
             'nonrandomised studies with no shared denominator, so each row names its own study',
      rows: [
        { kind: 'benefit', value: 'none shown',
          label: 'melanoma deaths averted at population level, in 3 nonrandomised analyses of 2 German screening ' +
                 'programmes followed for 4 to 10 years',
          note: 'In the SCREEN pilot 360,288 people were examined in Schleswig-Holstein in 2003–2004. A 49% lower ' +
                'melanoma mortality reported at five years attenuated by ten.' },
        { kind: 'benefit', value: 'not associated',
          label: 'routine clinician examination, against usual care, with earlier stage at melanoma detection ' +
                 '(3 studies)',
          note: 'Whether it finds thinner melanomas was inconsistent across 3 studies.' },
        { kind: 'harm', value: '4 of 56',
          label: 'shave-biopsy sites rated as having a poor cosmetic result 6 months on, in one German study' },
        { kind: 'harm', value: 'normal range',
          label: 'anxiety and depression scores 5 and 8 months after screening, in one US study of 187 adults' },
        { kind: 'harm', value: 'not studied',
          label: 'overdiagnosis and overtreatment: the review found no study of either, and names both as ' +
                 'potential harms of screening' }
      ],
      disagreement: 'The sources disagree about the rise itself. Linos et al, reading SEER for non-Hispanic ' +
        'White people in 1992–2004, found incidence rising 3.1% a year, with significant rises in every ' +
        'histologic subtype and every thickness, including tumours thicker than 4 mm, and incidence doubling ' +
        'over ten years in every socioeconomic group while mortality did not rise significantly. They concluded ' +
        'that screening-associated diagnosis of thinner melanomas cannot explain the rise in thicker ones among ' +
        'people with poorer access to screening. Welch and colleagues read the rise as mostly diagnostic ' +
        'scrutiny. Among people 65 and older in nine SEER areas, skin biopsy rates rose 2.5-fold from 1986 to ' +
        '2001 and melanoma incidence 2.4-fold, the extra cases confined to early-stage melanoma while mortality ' +
        'changed little. From SEER trends in Black and White patients over 1975–2014, Adamson et al estimated ' +
        'that 59% (95% CI 45–70) of White women and 60% (32–75) of White men diagnosed with melanoma in 2014 ' +
        'were overdiagnosed.',
      sources: [
        { label: 'US Preventive Services Task Force, JAMA 2023 — screening for skin cancer', url: 'https://pubmed.ncbi.nlm.nih.gov/37071089/' },
        { label: 'Henrikson et al, JAMA 2023 — evidence report for the USPSTF', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13178561/' },
        { label: 'Linos et al, J Invest Dermatol 2009 — increasing burden of melanoma in the United States', url: 'https://pubmed.ncbi.nlm.nih.gov/19131946/' },
        { label: 'Welch et al, BMJ 2005 — skin biopsy rates and incidence of melanoma', url: 'https://pubmed.ncbi.nlm.nih.gov/16081427/' },
        { label: 'Adamson et al, JAMA Dermatol 2022 — estimating overdiagnosis of melanoma', url: 'https://pubmed.ncbi.nlm.nih.gov/35293957/' }
      ]
    },

    modalities: [
      { name: 'Visual skin examination by a clinician', role: 'Screening, where the USPSTF finds the evidence insufficient',
        catches: 'Among suspicious lesions in people with limited prior testing, in-person visual inspection found ' +
                 '92.4% of melanomas (95% CI 26.2–99.8) at a specificity of 79.7%, pooled from only 3 datasets.',
        misses: 'Against usual care, routine clinician examination was not associated with finding more skin ' +
                'cancer or precursor lesions (5 studies), or with earlier stage at melanoma detection (3 studies).',
        harms: 'Biopsies and their scars: 4 of 56 shave-biopsy sites were rated poor cosmetically at 6 months in ' +
               'one study. No study examined overdiagnosis or overtreatment, which the review names as potential ' +
               'harms.',
        interval: 'None recommended: the USPSTF\'s 2023 statement is an I statement, neither for nor against.',
        catchesSource: 'dinnes-2018-visual',
        missesSource: 'henrikson-2023',
        harmsSource: 'henrikson-2023',
        intervalSource: 'uspstf-2023' },

      { name: 'Dermoscopy', role: 'Examining a lesion that looks suspicious',
        catches: 'Added to in-person visual inspection, at a fixed specificity of 80% it found 92% of melanomas, ' +
                 'against 76% for visual inspection alone (26 and 13 evaluations).',
        misses: 'Where it has not been studied: data from primary care are limited, and most studies included ' +
                'only lesions already chosen for biopsy or excision. It was more accurate in experienced hands.',
        harms: 'In a hypothetical 1,000 lesions at the studies\' median prevalence, its gain in sensitivity meant ' +
               '19 fewer melanomas missed, with 176 false-positive results at that specificity.',
        note: 'A magnifier with its own light, which shows the skin in more detail than the naked eye.',
        catchesSource: 'dinnes-2018-dermoscopy',
        missesSource: 'dinnes-2018-dermoscopy',
        harmsSource: 'dinnes-2018-dermoscopy',
        noteSource: 'dinnes-2018-dermoscopy' },

      { name: 'Skin self-examination', role: 'Checking one\'s own skin',
        catches: 'In a Connecticut case–control study the 15% of people who examined their own skin had fewer ' +
                 'melanomas (adjusted OR 0.66, 0.44–0.99), and the authors estimated that, if both of their ' +
                 'estimates held, it could lower melanoma mortality by 63%.',
        misses: 'Twenty years on in the same patients, the adjusted hazard ratio for melanoma death with ' +
                'self-examination was 1.12 (0.61–2.06), no benefit shown; general skin awareness was associated ' +
                'with lower risk (HR 0.46).',
        harms: 'In one trial of 1,356 adults, an intervention to increase self-examination raised skin procedures ' +
               'in the first 6 months (8.0% against 3.6%) but not over the next 6 (3.9% against 3.3%), and the ' +
               'review found no additional atypical moles or skin cancers detected.',
        note: 'Smartphone apps that assess a photographed mole have not shown enough accuracy: in a Cochrane ' +
              'review, four AI-based apps had sensitivities from 7% to 73% for melanoma, from two small studies.',
        catchesSource: 'berwick-1996',
        missesSource: 'paddock-2016',
        harmsSource: 'henrikson-2018',
        noteSource: { ref: 'chuchu-2018', quote: 'Across the four artificial intelligence-based applications … sensitivities ranged from ' +
                                                 '7% (95% CI 2% to 16%) to 73% (95% CI 52% to 88%)' } },

      { name: 'Total body photography', role: 'Follow-up of people at high risk',
        catches: 'Across 10 studies of 41,703 patients and 6,203 biopsies, 15% of biopsies (95% CI 10–21) found ' +
                 'melanoma in situ or invasive melanoma.',
        misses: 'The studies differ in who was photographed and how, so its accuracy is still unclear; the review ' +
                'calls for prospective accuracy studies.',
        harms: 'Biopsies of moles that are not melanoma: 8.6 biopsies for each melanoma found (range 2.3–19.6), ' +
               'and 7.6 benign moles for each melanoma among them.',
        note: 'Photographs of the whole skin, used at follow-up visits.',
        catchesSource: { ref: 'ji-xu-2021', quote: 'In total, 10 studies were included, comprising 41 703 patients who underwent TBP and ' +
                                                   '6203 biopsies. … mean percentage of biopsies positive for MIS or melanoma was 15% [95% ' +
                                                   'confidence interval (CI) 10-21]' },
        missesSource: 'ji-xu-2021',
        harmsSource: { ref: 'ji-xu-2021', quote: 'number needed to biopsy (NNB) was 8·6 (range 2·3-19·6), naevus : melanoma ratio was 7·6 ' +
                                                 '(range 1·3-18·6)' } },

      { name: 'Biopsy read by a pathologist', role: 'Diagnosis',
        catches: 'Against a consensus of experienced pathologists, 187 US pathologists were accurate on 92% of ' +
                 'benign cases such as moles with mild atypia, and on 72% of invasive melanomas staged pT1b or ' +
                 'beyond.',
        misses: 'The middle: accuracy was 25% for moderate atypia, 40% for severe atypia or melanoma in situ, ' +
                'and 43% for early invasive (pT1a) melanoma.',
        harms: 'At a population level an estimated 8.0% of melanocytic biopsy diagnoses would be overinterpreted ' +
               'and 9.2% underinterpreted. NCI advises considering a second review by an independent pathologist.',
        catchesSource: { ref: 'elmore-2017', quote: 'In phase 1, 187 pathologists completed 8976 independent case interpretations … I, 92% ' +
                                                    '(95% confidence interval 90% to 94%) … and V, 72% (69% to 75%)' },
        missesSource: { ref: 'elmore-2017', quote: 'II, 25% (22% to 28%); III, 40% (37% to 44%); IV, 43% (39% to 46%)' },
        harmsSource: [{ ref: 'elmore-2017', quote: 'with 8.0% (6.2% to 9.9%) of cases overinterpreted by the initial pathologist and 9.2% ' +
                                                   '(8.8% to 9.6%) underinterpreted' }, 'nci-melanoma-hp'] }
    ],

    signs: [
      'A mole that changes in size, shape or colour',
      'A mole with irregular edges or borders',
      'A mole with more than one colour',
      'An asymmetrical mole, whose two halves differ in size or shape',
      'A mole that itches, oozes, bleeds or is ulcerated',
      'A change in pigmented skin, or satellite moles: new moles growing near an existing one',
      'ABCDE is the reminder: asymmetry, border, colour, diameter (melanoma is usually larger than 6 millimetres) and evolving. All of these can have other causes'
    ],

    sources: [
      { label: 'NCI PDQ — Melanoma Treatment (Patient Version): signs of melanoma',
        url: 'https://www.cancer.gov/types/skin/patient/melanoma-treatment-pdq' },
      { label: 'SEER Cancer Stat Facts: Melanoma of the Skin — stage distribution and survival',
        url: 'https://seer.cancer.gov/statfacts/html/melan.html' },
      { label: 'US Preventive Services Task Force, JAMA 2023 — screening for skin cancer',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37071089/' },
      { label: 'Henrikson et al, JAMA 2023 — evidence report for the USPSTF',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13178561/' }
    ]
  },

  /* ---- targets ------------------------------------------------------
     Phase 6 writes one entry, the target no tumour test selects. The rest of
     the panel, and the overlay that gives each card its protein, alteration
     frequencies and agents, come with phase 7; until then this entry renders
     in the uveal drawer only.
  -------------------------------------------------------------------- */
  targets: [
    { gene: 'PMEL',
      summary: 'PMEL encodes gp100, a melanocyte protein. Tebentafusp binds a gp100 peptide as HLA-A*02:01 ' +
               'presents it on the uveal melanoma cell surface, and binds CD3 on T cells with its other arm.',
      caveat: 'The patient is selected by genotyping a whole blood sample for HLA-A*02:01, a tissue type the ' +
              'patient inherits. Nothing measured in the tumour, PMEL included, says who can receive the drug.',
      source: ['label-tebentafusp',
               { label: 'UniProt P40967 — melanocyte protein PMEL; alternative name melanocytes lineage-specific antigen GP100',
                 url: 'https://www.uniprot.org/uniprotkb/P40967/entry' }],
      caveatSource: 'label-tebentafusp',
      germline: [{
        test: 'HLA-A*02:01 genotyping of a whole blood sample',
        agents: 'tebentafusp (Kimmtrak), in unresectable or metastatic uveal melanoma',
        nodes: ['path-uveal'],
        share: { n: 551, of: 1072,
                 population: 'patients with metastatic uveal melanoma screened for the IMCgp100-202 trial',
                 source: [{ ref: 'cohen-2026', quote: 'In the registrational IMCgp100-202 trial, 1,072 patients were screened for HLA, of which ' +
                                                      '551 (51%) were HLA-A*02:01 positive.' }, 'olivier-2023'] },
        note: 'A share of the patients one trial screened, which Cohen 2026 says to read with caution for biases ' +
              'such as the countries it ran in. Across the registries of the CIWD 3.0.0 catalogue the allele is ' +
              '27.1% of HLA-A alleles in people of European descent, 11.9% in African or African American people ' +
              'and 6.5% in Asian or Pacific Islander people: shares of alleles, not of people.',
        noteSource: ['cohen-2026', { ref: 'olivier-2023', quote: 'its frequency varied from 11.9% (95% CI, 11.8%-12.0%) in individuals of African or ' +
                                                                 'African American descent to 27.1% (95% CI, 27.1%-27.1%) in individuals of European or ' +
                                                                 'European descent … was present in only 6.5% (95% CI, 6.5%-6.5%) of individuals’ alleles' }],
        source: 'label-tebentafusp'
      }] },

    { gene: 'BRAF',
      summary: 'Three BRAF and MEK pairs carry melanoma indications — dabrafenib with trametinib, vemurafenib with ' +
               'cobimetinib, and encorafenib with binimetinib — each for unresectable or metastatic melanoma with ' +
               'BRAF V600E or V600K confirmed by an approved test. Dabrafenib and vemurafenib are also labelled ' +
               'alone for V600E, and atezolizumab is labelled with cobimetinib and vemurafenib for BRAF V600 disease.',
      caveat: 'The vemurafenib and encorafenib labels both state that they are not indicated for wild-type BRAF ' +
              'melanoma. Dabrafenib with trametinib is labelled after complete resection as well, where lymph ' +
              'nodes are involved.',
      source: ['label-dabrafenib', 'label-trametinib', 'label-vemurafenib', 'label-cobimetinib',
               'label-encorafenib', 'label-binimetinib', 'label-atezolizumab'],
      caveatSource: ['label-vemurafenib', 'label-encorafenib', 'label-dabrafenib'] },

    { gene: 'MAP2K1',
      summary: 'MEK1 is what the MEK inhibitors block, but a BRAF V600 result is what selects them: trametinib, ' +
               'cobimetinib and binimetinib are each labelled alongside a BRAF inhibitor, and no melanoma ' +
               'indication asks for a test of MEK.',
      caveat: 'Trametinib alone is labelled only for patients who have not already had a BRAF inhibitor, and its ' +
              'label carries a section reporting a lack of clinical activity in metastatic melanoma after ' +
              'BRAF-inhibitor therapy.',
      source: ['label-trametinib', 'label-cobimetinib', 'label-binimetinib'],
      caveatSource: 'label-trametinib' },

    { gene: 'MAP2K2',
      summary: 'MEK2 is blocked by the same three drugs — each label\'s mechanism section names MEK1 and MEK2 — ' +
               'and is selected by the same BRAF result.',
      caveat: 'MEK2 is also where a melanoma escapes: MAP2K2 mutations turn up in tumours sampled at resistance ' +
              'to a BRAF inhibitor given alone, the contrast quoted on the BRAF V600 card.',
      source: ['label-trametinib', 'label-cobimetinib', 'label-binimetinib'],
      caveatSource: 'van-allen-2014' },

    { gene: 'NRAS',
      summary: 'No approved melanoma drug is aimed at NRAS. It is the commonest alternative to BRAF V600 in skin ' +
               'melanoma, and where a BRAF inhibitor is given alone it is the change most often found when the ' +
               'drug stops working.',
      caveat: 'A MEK inhibitor has been tested against NRAS-mutant melanoma, but binimetinib\'s US label covers ' +
              'only BRAF V600 disease, with encorafenib.',
      source: ['nci-melanoma-hp', 'van-allen-2014'],
      caveatSource: 'label-binimetinib' },

    { gene: 'KIT',
      summary: 'KIT is mutated most often in mucosal melanoma, and no KIT inhibitor carries a US melanoma ' +
               'indication. NCI\'s summary notes early data suggesting that mucosal or acral melanomas with ' +
               'activating KIT variants or amplifications may be sensitive to c-KIT inhibitors.',
      caveat: 'The KIT or PDGFRA class in this cohort holds 14 patients, too few for the overlay to let it set ' +
              'this gene\'s peak, so the figure shown comes from another class.',
      source: 'nci-melanoma-hp',
      caveatSource: 'cbio-mel-mskimpact-2020' },

    { gene: 'PDCD1',
      summary: 'Pembrolizumab and nivolumab are both labelled for unresectable or metastatic melanoma and after ' +
               'complete resection, nivolumab also in combination with ipilimumab and, as Opdualag, with ' +
               'relatlimab.',
      caveat: 'No melanoma indication here asks for a PD-L1 test or any other tumour test. The target is on the ' +
              'T cell rather than the tumour, so the alteration frequency beside it describes this cohort, not ' +
              'who is eligible.',
      source: ['label-pembrolizumab', 'label-nivolumab', 'label-nivolumab-relatlimab'],
      caveatSource: ['label-pembrolizumab', 'label-nivolumab'] },

    { gene: 'CTLA4',
      summary: 'Ipilimumab is labelled for unresectable or metastatic melanoma, alone or with nivolumab, in adults ' +
               'and children 12 years and older, and for adjuvant treatment of cutaneous melanoma with involved ' +
               'regional nodes larger than 1 mm after complete resection.',
      caveat: 'Selected by no tumour test either; the adjuvant trial its label cites compared two ipilimumab ' +
              'doses against high-dose interferon alfa-2b rather than against no treatment.',
      source: 'label-ipilimumab',
      caveatSource: ['label-ipilimumab', { nct: 'NCT01274338', label: 'E1609' }] },

    { gene: 'LAG3',
      summary: 'Relatlimab reaches patients only as a fixed combination with nivolumab (Opdualag), labelled for ' +
               'unresectable or metastatic melanoma in adults and children 12 years of age or older.',
      caveat: 'LAG-3 is not on the sequencing panels behind this cohort, so the track here is empty by ' +
              'construction — that is a property of the panel, not of the gene.',
      source: { ref: 'label-nivolumab-relatlimab', section: 'indications_and_usage',
                quote: 'OPDUALAG is a combination of nivolumab, a programmed death receptor-1 (PD-1) blocking antibody, ' +
                       'and relatlimab, a lymphocyte activation gene-3 (LAG-3) blocking antibody, indicated for the ' +
                       'treatment of adult and pediatric patients 12 years of age or older with unresectable or ' +
                       'metastatic melanoma.' },
      caveatSource: 'cbio-mel-mskimpact-2020' },

    { gene: 'GNAQ',
      summary: 'A GNAQ or GNA11 hotspot switches on the same pathway in most uveal melanomas, and nothing approved ' +
               'is aimed at either gene.',
      caveat: 'The figures on this card come from MSK\'s cohort of skin and unknown-primary melanoma, which holds ' +
              'no uveal melanoma at all; the uveal share is on the uveal card, from a different cohort.',
      source: ['nci-melanoma-hp', 'msk-50k-2026'],
      caveatSource: 'cbio-mel-mskimpact-2020' }
  ],

  /* ---- markers -------------------------------------------------------
     The tumour tests the pathway cards turn on. BRAF V600 decides whether
     BRAF and MEK inhibitors are an option; the other three are what the
     non-skin pathways carry instead.
  -------------------------------------------------------------------- */
  markers: [
    { id: 'BRAF', label: 'BRAF V600 mutation', assay: 'DNA test of the tumour',
      positiveThreshold: 'a mutation at V600, most often V600E and next V600K' },
    { id: 'NRAS', label: 'NRAS mutation', assay: 'DNA sequencing of the tumour' },
    { id: 'KIT', label: 'KIT mutation or amplification', assay: 'DNA sequencing of the tumour' },
    { id: 'GNAQ', label: 'GNAQ or GNA11 mutation', assay: 'DNA sequencing of the tumour' }
  ],

  /* ---- glossary -----------------------------------------------------
     An entry WITH `d` replaces the engine term; an entry with only `w` keeps
     the engine definition and replaces the example. Definitions of staging
     words follow NCI's two PDQ summaries; the WHO words follow Elder 2020.
  -------------------------------------------------------------------- */
  glossary: {

    groups: [
      { id: 'classification', label: 'How melanoma is sorted' },
      { id: 'staging', label: 'Staging a melanoma' }
    ],

    terms: [

      /* ---- the pathway axis ---- */

      { t: 'melanocyte', g: 'classification', alias: ['melanocytes', 'pigment cell'],
        d: 'The cell that makes melanin, the pigment that colours the skin. In the skin, melanocytes sit in ' +
           'the deepest layer of the epidermis; they are also found in mucous membranes and in the eye.',
        w: 'Melanoma is cancer of these cells, which is why it can start in the skin, a mucous membrane or ' +
           'the eye — the three places the pathway axis sorts by.' },

      { t: 'evolutionary pathway', g: 'classification', alias: ['WHO pathway', 'melanoma pathway'],
        d: 'The 2018 WHO classification\'s way of grouping melanomas. Each type sits at the end of a route ' +
           'from its own precursor, and the types are first separated by whether sun exposure caused them, ' +
           'judged by the mutational signature, the anatomic site and the epidemiology.',
        w: 'The first axis here. Its boxes are the routes this site has figures for — skin, acral, mucosal, ' +
           'uveal and unknown primary — not every WHO type.' },

      { t: 'CSD', g: 'classification', full: 'Cumulative solar damage',
        alias: ['cumulative solar damage', 'cumulative sun damage', 'low-CSD', 'high-CSD', 'solar elastosis'],
        d: 'How much sun damage the skin around a melanoma shows under the microscope, read from solar ' +
           'elastosis. The WHO classification splits melanoma on sun-exposed skin into low-CSD and high-CSD.',
        w: 'Low-CSD melanomas include superficial spreading melanoma; high-CSD ones include lentigo maligna ' +
           'and desmoplastic melanoma. Both sit inside the skin box here, which this site does not split.' },

      { t: 'acral melanoma', g: 'classification', alias: ['acral'],
        d: 'Melanoma of the palms, soles or nail beds. The 2018 WHO classification places it among the ' +
           'melanomas not caused by sun exposure.',
        w: 'Its own box on the pathway axis, inside cutaneous melanoma. Its card shows more copy-number gains ' +
           'than the skin card.' },

      { t: 'mucosal melanoma', g: 'classification', alias: ['mucosal'],
        d: 'Melanoma arising from melanocytes in the mucous membranes lining the respiratory, gastrointestinal ' +
           'or genitourinary tracts.',
        w: 'Its own box. The AJCC staging system used for skin melanoma does not stage it.' },

      { t: 'uveal melanoma', g: 'classification', alias: ['uveal', 'uvea', 'intraocular melanoma'],
        d: 'Melanoma arising in the uveal tract of the eye. NCI describes it as differing from skin melanoma ' +
           'in incidence, prognostic factors, molecular characteristics and treatment.',
        w: 'Its own box, inside ocular melanoma, and the sharpest genomic contrast on this site: GNAQ or ' +
           'GNA11 in place of BRAF.' },

      { t: 'melanoma of unknown primary', g: 'classification', alias: ['unknown primary', 'MUP'],
        d: 'Melanoma found where it has spread — in lymph nodes, under the skin or in an organ — with no ' +
           'primary tumour found.',
        w: 'Its own box on the pathway axis. The registry report behind its share split these patients by ' +
           'whether the melanoma was confined to one region or at several sites.' },

      /* ---- report terms: the histologic subtypes (not an axis) ---- */

      { t: 'superficial spreading melanoma', g: 'classification', alias: ['superficial spreading', 'SSM'],
        d: 'One of the traditional histologic subtypes a pathology report can name for a skin melanoma. The ' +
           '2018 WHO classification counts it as a low cumulative sun damage melanoma.',
        w: 'A report term, not a box on this site. NCI calls these subtype names of historical interest, ' +
           'without independent prognostic or therapeutic significance; a large SEER analysis disagrees for ' +
           'nodular melanoma, and the skin card gives both.' },

      { t: 'nodular melanoma', g: 'classification', alias: ['nodular', 'NM'],
        d: 'One of the traditional histologic subtypes a pathology report can name for a skin melanoma.',
        w: 'A report term, not a box. In SEER it carried a higher risk of death than superficial spreading ' +
           'melanoma after thickness, ulceration and stage were accounted for; the figures are on the skin card.' },

      { t: 'lentigo maligna melanoma', g: 'classification', alias: ['lentigo maligna', 'LMM'],
        d: 'One of the traditional histologic subtypes a pathology report can name for a skin melanoma. The ' +
           '2018 WHO classification counts it as a high cumulative sun damage melanoma.',
        w: 'A report term. OncoTree gives it its own code (SKLMM), and the skin box here counts it.' },

      { t: 'acral lentiginous melanoma', g: 'classification', alias: ['acral lentiginous', 'ALM'],
        d: 'The traditional histologic subtype for melanoma of the palms, soles and nail beds.',
        w: 'A histology code, not a site. Registries count it by that code, which is why the acral box\'s ' +
           'share is a floor rather than a count of every acral melanoma.' },

      /* ---- staging ---- */

      { t: 'Breslow thickness', g: 'staging', alias: ['Breslow', 'tumour thickness', 'tumor thickness'],
        d: 'How deep a skin melanoma goes: its thickness in millimetres, measured under the microscope from ' +
           'the surface of the skin to the deepest part of the tumour.',
        w: 'With ulceration, it sets the T category of a skin melanoma\'s stage. NCI\'s summary says it should ' +
           'always be reported, and that it is more reproducible than the older Clark level.' },

      { t: 'ulceration', g: 'staging', alias: ['ulcerated', 'ulcer'],
        d: 'A break in the skin over the melanoma: the top layer of cells has broken down and the tissue ' +
           'below shows through. The pathologist records whether it is present.',
        w: 'The second input to a skin melanoma\'s T category: an ulcerated tumour is staged higher than one ' +
           'of the same thickness without it.' },

      { t: 'sentinel lymph node', g: 'staging',
        alias: ['sentinel node', 'sentinel lymph node biopsy', 'sentinel node biopsy', 'SLNB'],
        d: 'The first lymph node that lymph from the tumour drains to. In a sentinel lymph node biopsy it is ' +
           'found by lymph node mapping and removed, to look for cancer too small to find by examination or ' +
           'imaging.',
        w: 'Whether it holds melanoma helps set the stage. NCI notes it can identify people who may benefit ' +
           'from treatment after surgery, and people who can avoid removal of the other nodes.' },

      /* ---- genes the pathway cards turn on ---- */

      { t: 'BRAF V600', g: 'molecular', alias: ['V600E', 'V600K', 'BRAF V600E', 'BRAF V600K', 'V600'],
        d: 'An activating mutation at amino acid 600 of BRAF, a kinase in the MAPK signalling pathway. V600E ' +
           'is the commonest form and V600K the next.',
        w: 'The BRAF-altered melanoma that BRAF and MEK inhibitors are approved for. Common on the skin and ' +
           'unknown-primary cards, and absent from the uveal card.' },

      { t: 'NRAS', g: 'molecular',
        d: 'One of the three RAS genes. Mutations at codons 12, 13 and 61 keep its protein switched on.',
        w: 'Each pathway card counts NRAS changes at those three codons as one row.' },

      { t: 'NF1', g: 'molecular', alias: ['neurofibromin'],
        d: 'A tumour suppressor gene that holds RAS signalling in check. TCGA made NF1-altered one of four ' +
           'genomic subtypes of skin melanoma, beside BRAF-altered, RAS-altered and triple wild type.',
        w: 'Its rows on the pathway cards count any non-silent mutation, including ones that are not drivers.' },

      { t: 'GNAQ', g: 'molecular', alias: ['GNA11', 'GNAQ or GNA11'],
        d: 'GNAQ and GNA11 each encode a G-protein alpha subunit. A hotspot mutation at Q209 or R183 leaves ' +
           'the protein constitutively active.',
        w: 'The mutation most uveal melanomas carry in place of BRAF or NRAS. The uveal card counts the two ' +
           'genes together.' },

      { t: 'SF3B1', g: 'molecular',
        d: 'A gene for part of the machinery that splices RNA. R625 is its hotspot in melanoma.',
        w: 'Common on the mucosal and uveal cards, rare on the skin card.' },

      { t: 'TERT promoter', g: 'molecular', alias: ['TERT promoter mutation', 'TERT'],
        d: 'The regulatory stretch of DNA in front of TERT, the gene for telomerase. Sequencing reports call ' +
           'mutations there as 5\' flank, outside the protein-coding sequence.',
        w: 'The commonest TERT change on the skin and unknown-primary cards. Their TERT rows count any TERT ' +
           'mutation call, and nearly all of those calls are in the promoter.' },

      /* ---- risk and detection (phase 4) ---- */

      { t: 'naevus', g: 'detection', alias: ['naevi', 'nevus', 'nevi', 'mole', 'moles'],
        d: 'A mole: a common, benign growth of melanocytes in the skin. An atypical naevus looks irregular — ' +
           'uneven in shape or colour — without being a melanoma.',
        w: 'Many moles, and atypical ones, are among the strongest risk factors on the risk page. Yet NCI notes ' +
           'that more than half of melanomas arise in skin that looked normal, not in an existing mole.' },

      /* ---- engine definitions, melanoma examples ---- */

      { t: 'hotspot',
        w: 'Four are counted as rows of their own on the pathway cards: BRAF V600, NRAS codons 12, 13 and 61, ' +
           'GNAQ or GNA11 Q209 and R183, and SF3B1 R625.' },

      { t: 'amplification',
        w: 'CCND1, CDK4, TERT and MDM2 amplification set the acral card apart from the skin card.' },

      { t: 'prevalence',
        w: 'Pathway shares are of all melanoma in an old US hospital registry series, and acral melanoma\'s ' +
           'comes from a different, newer registry analysis. The axis note says which.' },

      { t: 'cohort',
        w: 'The pathway cards carry figures from the MSK-IMPACT 50K cohort: one melanoma sample per patient, ' +
           'from tumours sequenced at one referral centre, mostly from metastases.' }
    ]
  },

  /* ---- axes ---------------------------------------------------------- */
  axes: [
    { id: 'pathway', label: 'Pathway (WHO 2018)', shortLabel: 'Pathway', default: true,
      asks: 'Where did the melanoma start, and was sunlight part of the cause?',
      measures: 'Where the primary tumour arose — on the skin, on the palms, soles or nail beds, in a mucous ' +
                'membrane or in the eye — or that none was found. The WHO scheme also reads the sun damage in ' +
                'the skin around a skin melanoma under the microscope, which this axis does not split.',
      decides: 'Which genome to expect, and so which tumour tests matter. BRAF V600, the change BRAF and MEK ' +
               'inhibitors are approved for, is common in skin melanoma and absent from uveal melanoma here, ' +
               'which carries GNAQ or GNA11 instead. Staging differs too: the AJCC system for skin melanoma does ' +
               'not stage uveal, conjunctival or mucosal melanoma.',
      note: 'Shares are of all melanoma, from the National Cancer Data Base: 84,836 melanomas diagnosed in the ' +
            'US in 1985–1994 — cutaneous 91.2%, ocular 5.2%, mucosal 1.3% and unknown primary 2.2%. They are ' +
            'old, from hospital registries, and no newer table splits all four: SEER counts only melanoma of ' +
            'the skin. Uveal melanoma is 85.0% of ocular melanoma in the same report. Acral melanoma\'s share ' +
            'is a floor from a different source: acral lentiginous melanoma, a histology code, was 8,036 of ' +
            '754,734 melanomas (1.1%) in US registries in 2010–2019, and acral melanomas recorded under ' +
            'another histology are not in that count. The figures on each card come from one referral cohort ' +
            'and are not population shares.' },

    { id: 'driver', label: 'Driver class (MSK)', shortLabel: 'Driver class', default: false,
      population: { label: 'Cutaneous melanoma and melanoma of unknown primary, one tumour each, sequenced mostly ' +
                           'from metastases at MSK (696 patients)',
                    short: 'skin and unknown-primary melanoma at MSK',
                    source: { ref: 'shoushtari-2021', quote: 'A total of 670 of 696 sequenced melanomas (96%) harbored an oncogenic RTK-RAS-MAPK ' +
                                                             'pathway alteration' } },
      asks: 'Which gene change switched on the growth signal, and does it pick a drug?',
      measures: 'Sequencing of the tumour on MSK-IMPACT panels of 341 to 468 genes, read for the alteration that ' +
                'activates the MAPK pathway. The study sorted every tumour into one of nine groups that do not ' +
                'overlap and records that group on each patient, so the class here is read off the record, not ' +
                'recomputed.',
      decides: 'Whether BRAF and MEK inhibitors are an option: the three approved combinations are for melanoma ' +
               'with BRAF V600E or V600K. In the same study, time to treatment failure on a PD-1 antibody alone ' +
               'differed by driver group, and on nivolumab with ipilimumab it did not.',
      note: 'Shares computed by the pipeline from MSK\'s mel_mskimpact_2020: 696 patients, one tumour each — 556 ' +
            'cutaneous melanomas and 140 of unknown primary, 592 sequenced from a recurrence or metastasis and 104 ' +
            'from the primary, none from a patient who had had targeted therapy. MSK is a referral centre, so ' +
            'these are not population shares. Mucosal and uveal melanoma are not in this cohort, and acral ' +
            'melanoma is not split out of it; the pathway axis carries those. V600E and the other V600 changes ' +
            'sit together under BRAF V600, because that is what the combination approvals are written on. The ' +
            'groups are the study\'s own, so a tumour in one class can carry a call from another: 20 of the 155 ' +
            'NF1-class tumours also carry an NRAS hotspot call. The TERT rows count any TERT call, and 572 of ' +
            'the 575 patients with one have it in the promoter. No resistance axis is drawn; the BRAF V600 card ' +
            'says why.' }
  ],

  nodes: [

  /* ============================== AXIS 1 — PATHWAY ============================== */

  {
    id: 'path-root', axis: 'pathway', parent: null,
    label: 'All melanoma', shortLabel: 'All melanoma',
    prevalence: 100,
    summary: 'Cancer of the melanocytes, the pigment-making cells of the skin, the mucous ' +
             'membranes and the eye, sorted by where it started. The 2018 WHO classification separates ' +
             'melanomas caused by sun exposure from those that are not, by their mutational signatures, ' +
             'anatomic site and epidemiology — so where a melanoma starts says a great deal about its genome. ' +
             'SEER\'s national figures count only melanoma of the skin; they are on the cutaneous card.',
    sources: [
      { label: 'Elder et al, Arch Pathol Lab Med 2020 — the 2018 WHO classification', url: 'https://pubmed.ncbi.nlm.nih.gov/32057276/' },
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, 84,836 melanomas', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version)', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' }
    ]
  },

  {
    id: 'path-cutaneous', axis: 'pathway', parent: 'path-root',
    label: 'Cutaneous melanoma', shortLabel: 'Cutaneous',
    prevalence: 91.2,
    summary: '91.2% of the 84,836 melanomas in the National Cancer Data Base. It is the melanoma SEER counts, ' +
             'and the one the AJCC system stages by thickness and ulceration. It holds ' +
             'two boxes: melanoma of the skin elsewhere on the body, and acral melanoma of the palms, soles ' +
             'and nail beds, which the WHO places among the melanomas not caused by sun exposure.',
    prognosis: {
      source: 'seer-melanoma',
      relativeOutlook: 'An estimated 8,510 US deaths from melanoma of the skin in 2026, 1.4% of all cancer deaths.',
      fiveYearNote: '94.7% five-year relative survival for melanoma of the skin — 100.0% when found localised, ' +
                    '34.0% once it has reached distant organs.',
      caveat: 'SEER\'s figures cover invasive melanoma of the skin only. A five-year figure of 100.0% cannot ' +
              'show differences that appear later.'
    },
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'SEER Cancer Stat Facts: Melanoma of the Skin', url: 'https://seer.cancer.gov/statfacts/html/melan.html' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version), staging', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' }
    ]
  },

  {
    id: 'path-skin', axis: 'pathway', parent: 'path-cutaneous',
    label: 'Skin, not acral', shortLabel: 'Skin',
    prevalence: 90.1,
    summary: 'Cutaneous melanoma anywhere but the palms, soles and nail beds: 91.2 less acral melanoma\'s 1.1, ' +
             'two figures from different studies. The WHO splits it by the sun damage of the skin around ' +
             'it — low-CSD melanomas include superficial spreading melanoma, high-CSD ones lentigo maligna and ' +
             'desmoplastic melanoma. In the MSK cohort BRAF V600 is in 31.1% (337 of 1,082), an NRAS hotspot ' +
             'in 28.1% and an NF1 mutation in 26.1%. 188 of these patients were filed as melanoma with no ' +
             'subtype recorded, which OncoTree places under skin.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 76.2, role: 'telomerase gene',
          note: '814 of the 825 patients with a TERT call have one in the promoter, outside ' +
                'the protein-coding sequence; the row counts any TERT mutation call.' },
        { gene: 'BRAF V600', alteration: 'mutation', frequency: 31.1, role: 'activating allele', druggable: true,
          note: 'V600E in 260 patients (24.0%) and V600K in 62 (5.7%).' },
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 28.1, role: 'activating allele' },
        { gene: 'NF1', alteration: 'mutation', frequency: 26.1, role: 'tumour suppressor',
          note: 'Any non-silent call, including ones that are not drivers, so the row can run high where tumours ' +
                'carry many mutations.' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 25.7, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 22.4, role: 'tumour suppressor',
          note: 'Any non-silent call, as for NF1.' },
        { gene: 'KIT', alteration: 'mutation', frequency: 5.4, role: 'receptor tyrosine kinase',
          note: 'Against 20.2% on the mucosal card.' }
      ],
      pathways: [
        { name: 'Nodular against superficial spreading histology',
          status: 'hazard ratio for death 1.55 (95% CI 1.41–1.70) in SEER, 118,508 patients, adjusted for ' +
                  'thickness, ulceration, stage and other variables',
          note: 'The analysis selected superficial spreading and nodular melanoma only, so it gives no share for ' +
                'the other subtypes. NCI\'s treatment summary calls the subtype names of historical interest, ' +
                'without independent prognostic or therapeutic significance. The two sources disagree, and both ' +
                'are cited.',
          source: ['lattanzi-2019', 'nci-melanoma-hp'] }
      ]
    },
    sources: [
      { label: 'MSK-IMPACT 50K on cBioPortal — skin melanoma codes', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' },
      { label: 'Elder et al, Arch Pathol Lab Med 2020 — low and high cumulative sun damage', url: 'https://pubmed.ncbi.nlm.nih.gov/32057276/' },
      { label: 'Holman et al, Prev Med 2023 — acral lentiginous melanoma share', url: 'https://pubmed.ncbi.nlm.nih.gov/37659614/' }
    ]
  },

  {
    id: 'path-acral', axis: 'pathway', parent: 'path-cutaneous',
    label: 'Acral melanoma', shortLabel: 'Acral',
    prevalence: 1.1,
    summary: 'Melanoma of the palms, soles and nail beds, which the WHO places among the melanomas not caused by ' +
             'sun exposure. Its share is a floor: acral lentiginous melanoma, a histology code, was 8,036 of ' +
             '754,734 melanomas (1.1%) in US registries in 2010–2019, and acral melanomas recorded under another ' +
             'histology are not in that count. In the MSK cohort its genome is one of copy-number gains — CCND1 ' +
             'amplified in 21.4%, CDK4 in 19.4% and TERT in 16.3%, against 4.5%, 2.4% and 3.0% on the skin card — ' +
             'and BRAF V600 is in 11.2%. With 98 patients, each one is about a percentage point.',
    molecular: {
      drivers: [
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 23.5, role: 'tumour suppressor' },
        { gene: 'CCND1', alteration: 'amplification', frequency: 21.4, role: 'cell-cycle oncogene' },
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 20.4, role: 'activating allele' },
        { gene: 'CDK4', alteration: 'amplification', frequency: 19.4, role: 'cell-cycle kinase' },
        { gene: 'TERT', alteration: 'amplification', frequency: 16.3, role: 'telomerase gene' },
        { gene: 'MDM2', alteration: 'amplification', frequency: 14.3, role: 'p53 regulator' },
        { gene: 'BRAF V600', alteration: 'mutation', frequency: 11.2, role: 'activating allele', druggable: true,
          note: 'All 11 are V600E.' },
        { gene: 'KIT', alteration: 'mutation', frequency: 6.1, role: 'receptor tyrosine kinase' }
      ],
      pathways: [
        { name: 'Share of melanoma, by race and ethnicity',
          status: 'acral lentiginous melanoma was 0.8% of melanomas in non-Hispanic White persons and 19.1% in ' +
                  'Hispanic Black, American Indian or Alaska Native, and Asian or Pacific Islander persons (US, 2010–2019)',
          note: 'Its rate varied far less than that of other melanomas: 2.3 per million in non-Hispanic White ' +
                'persons, 1.8 in non-Hispanic Black persons and 2.8 in Hispanic White persons, against 282.4 and ' +
                '8.2 per million for all other melanomas in non-Hispanic White and non-Hispanic Black persons. It ' +
                'is a larger share where other melanomas are rare.',
          source: { ref: 'holman-2023', quote: 'non-Hispanic Black persons (1.8 per 1,000,000) … compared to non-Hispanic White persons ' +
                                               '(2.3 per 1,000,000). Rates were significantly higher among Hispanic White persons (2.8 ' +
                                               'per 1,000,000) … The percentage of melanomas that were ALM ranged from 0.8% among ' +
                                               'non-Hispanic White persons to 19.1% among Hispanic Black, AI/AN, and API persons.' } }
      ]
    },
    sources: [
      { label: 'Holman et al, Prev Med 2023 — Table 1', url: 'https://pubmed.ncbi.nlm.nih.gov/37659614/' },
      { label: 'MSK-IMPACT 50K on cBioPortal — acral melanoma (ACRM)', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' },
      { label: 'Elder et al, Arch Pathol Lab Med 2020 — the nonsolar melanomas', url: 'https://pubmed.ncbi.nlm.nih.gov/32057276/' }
    ]
  },

  {
    id: 'path-mucosal', axis: 'pathway', parent: 'path-root',
    label: 'Mucosal melanoma', shortLabel: 'Mucosal',
    prevalence: 1.3,
    markers: { KIT: 'mutation or amplification in some' },
    summary: 'Melanoma of the mucous membranes lining the respiratory, gastrointestinal and genitourinary tracts: ' +
             '1.3% of melanomas in the National Cancer Data Base, and 1.4% in the series NCI cites. 55.4% arose in ' +
             'the head and neck, 23.8% in the anus or rectum, 18.0% in the female genital tract and 2.8% in the ' +
             'urinary tract. Its mutational signatures are unrelated to UV light, it is often diagnosed late, and ' +
             'the AJCC system for skin melanoma does not stage it. In the MSK cohort KIT is mutated in 20.2% and ' +
             'amplified in 15.8%, SF3B1 R625 is in 24.1%, and BRAF V600 in 3.0%.',
    molecular: {
      drivers: [
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 24.6, role: 'tumour suppressor' },
        { gene: 'SF3B1 R625', alteration: 'mutation', frequency: 24.1, role: 'splicing-factor hotspot' },
        { gene: 'NF1', alteration: 'mutation', frequency: 21.7, role: 'tumour suppressor',
          note: 'Any non-silent call, including ones that are not drivers.' },
        { gene: 'KIT', alteration: 'mutation', frequency: 20.2, role: 'receptor tyrosine kinase' },
        { gene: 'KIT', alteration: 'amplification', frequency: 15.8, role: 'receptor tyrosine kinase' },
        { gene: 'TP53', alteration: 'mutation', frequency: 15.8, role: 'tumour suppressor' },
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 13.8, role: 'activating allele' },
        { gene: 'BRAF V600', alteration: 'mutation', frequency: 3.0, role: 'activating allele', druggable: true }
      ]
    },
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, mucosal sites', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version), mucosal melanoma', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' },
      { label: 'MSK-IMPACT 50K on cBioPortal — mucosal melanoma codes', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' }
    ]
  },

  {
    id: 'path-ocular', axis: 'pathway', parent: 'path-root',
    label: 'Ocular melanoma', shortLabel: 'Ocular',
    prevalence: 5.2,
    summary: 'Melanoma of the eye: 5.2% of the melanomas in the National Cancer Data Base. Of those, 85.0% were ' +
             'uveal, 4.8% conjunctival and 10.2% at other sites in the eye. None of it is in SEER\'s melanoma of ' +
             'the skin figures.',
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, ocular sites', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' }
    ]
  },

  {
    id: 'path-uveal', axis: 'pathway', parent: 'path-ocular',
    label: 'Uveal melanoma', shortLabel: 'Uveal',
    prevalence: 4.4,
    markers: { GNAQ: 'Q209 or R183 hotspot in GNAQ or GNA11', BRAF: 'no V600 found in this cohort' },
    summary: 'Melanoma of the uveal tract of the eye: 85.0% of ocular melanoma, so about 4.4% of all melanoma. ' +
             'NCI notes it differs from skin melanoma in incidence, prognostic factors, molecular characteristics ' +
             'and treatment, and the AJCC system for skin melanoma does not stage it. In the MSK cohort 127 of 139 ' +
             'patients (91.4%) carry a GNAQ or GNA11 hotspot mutation — GNAQ in 64 and GNA11 in 63, never both — ' +
             'and none carries BRAF V600. 15 of these patients were filed as ocular melanoma with no site in ' +
             'the eye recorded.',
    molecular: {
      drivers: [
        { gene: 'GNAQ or GNA11 Q209/R183', alteration: 'mutation', frequency: 91.4, role: 'activating hotspot',
          note: 'GNAQ in 64 patients and GNA11 in 63; the two add to the 127 counted, so no patient has both.' },
        { gene: 'BAP1', alteration: 'mutation', frequency: 43.9, role: 'tumour suppressor',
          note: 'Mutations only. BAP1 lost with a whole chromosome arm is not a gene-level call, so this row can ' +
                'under-count.' },
        { gene: 'SF3B1 R625', alteration: 'mutation', frequency: 29.5, role: 'splicing-factor hotspot' },
        { gene: 'EIF1AX', alteration: 'mutation', frequency: 15.8, role: 'translation initiation factor' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 5.8, role: 'tumour suppressor' }
      ],
      pathways: [
        { name: 'Chromosome 3 arm loss',
          status: '3p lost in 86 of the 135 patients with a 3p call (63.7%), and 3q in 81 of 133 (60.9%)',
          note: 'From the cohort\'s arm-level copy-number profile, which the gene-level rows above do not read. ' +
                'Patients with no call for an arm are left out of that arm\'s count.',
          source: 'msk-50k-2026' }
      ]
    },
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, ocular sites', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version)', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' },
      { label: 'MSK-IMPACT 50K on cBioPortal — uveal and ocular melanoma codes', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' }
    ]
  },

  {
    id: 'path-ocular-other', axis: 'pathway', parent: 'path-ocular',
    label: 'Conjunctival or other eye site', shortLabel: 'Other eye',
    prevalence: 0.8,
    summary: 'The rest of ocular melanoma in the National Cancer Data Base: conjunctival 4.8% and other sites in ' +
             'the eye 10.2%, together about 0.8% of all melanoma. The AJCC system for skin melanoma does not stage ' +
             'conjunctival melanoma. The MSK cohort holds 6 patients with conjunctival melanoma, too few for ' +
             'figures, so this card has none.',
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, ocular sites', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version), staging', url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' }
    ]
  },

  {
    id: 'path-unknown', axis: 'pathway', parent: 'path-root',
    label: 'Melanoma of unknown primary', shortLabel: 'Unknown primary',
    prevalence: 2.2,
    summary: 'Melanoma found where it has spread, with no primary tumour found: 2.2% of melanomas in the National ' +
             'Cancer Data Base, where 43.0% presented with spread confined to one region and 57.0% at several ' +
             'sites. In the MSK cohort its figures sit near the skin card\'s — BRAF V600 in 32.6% and a TERT ' +
             'mutation in 77.1%, against 31.1% and 76.2% on skin — and a GNAQ or GNA11 hotspot is in 4.0%, against ' +
             '91.4% on the uveal card.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 77.1, role: 'telomerase gene',
          note: '134 of the 135 patients with a TERT call have one in the promoter; the row counts any TERT ' +
                'mutation call.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 34.9, role: 'tumour suppressor',
          note: 'Any non-silent call, including ones that are not drivers.' },
        { gene: 'BRAF V600', alteration: 'mutation', frequency: 32.6, role: 'activating allele', druggable: true,
          note: 'V600E in 45 patients (25.7%) and V600K in 11 (6.3%).' },
        { gene: 'NF1', alteration: 'mutation', frequency: 32.6, role: 'tumour suppressor',
          note: 'Any non-silent call, including ones that are not drivers.' },
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 25.1, role: 'activating allele' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 25.1, role: 'tumour suppressor' }
      ]
    },
    sources: [
      { label: 'Chang et al, Cancer 1998 — National Cancer Data Base, unknown primary', url: 'https://pubmed.ncbi.nlm.nih.gov/9781962/' },
      { label: 'MSK-IMPACT 50K on cBioPortal — melanoma of unknown primary (MUP)', url: 'https://www.cbioportal.org/study/summary?id=msk_impact_50k_2026' }
    ]
  },

  /* ============================== AXIS 2 — DRIVER CLASS ============================== */

  {
    id: 'drv-root', axis: 'driver', parent: null,
    label: 'Skin and unknown-primary melanoma, by driver class', shortLabel: 'All classes',
    prevalence: 100,
    summary: 'The 696 patients in MSK\'s melanoma study — 556 with cutaneous melanoma and 140 with melanoma of ' +
             'unknown primary — sorted by the alteration switching on the MAPK growth-signalling pathway. The ' +
             'study read this from its own sequencing and made nine groups that do not overlap. The first fork ' +
             'is BRAF V600, the change BRAF and MEK inhibitors are approved for.',
    molecular: {
      pathways: [
        { name: 'Time to treatment failure on a PD-1 antibody alone, by driver group',
          status: 'median 7.5 months with BRAF V600, 4.2 with NRAS Q61, 22 with NF1, and not reached with any ' +
                  'other alteration, in 181 patients',
          note: 'The study folded its nine groups into four for this. Driver group stayed significantly ' +
                'associated after adjusting for tumour mutational burden, performance status and stage. In the ' +
                '141 patients given nivolumab with ipilimumab, time to treatment failure did not differ by driver ' +
                'group, and the differences in overall survival were not significant.',
          source: { ref: 'shoushtari-2021', quote: 'TTF of PD-1 monotherapy (N = 181) varied by driver, with worse outcomes for NRAS Q61 and ' +
                                                   'BRAF V600 versus NF1 or other alterations (median 4.2, 7.5, 22, and not reached; P < ' +
                                                   '0.0001). … TTF did not vary by driver for nivolumab plus ipilimumab (N = 141).' } },
        { name: 'Where the primary melanoma arose',
          status: 'NF1-class in 41.4% of head melanomas (67 of 162) and 11.6% of trunk melanomas (21 of 181); ' +
                  'BRAF V600E in 14.8% (24 of 162) and 32.0% (58 of 181); NRAS Q61 in 11.7% (19 of 162) and ' +
                  '28.7% (52 of 181)',
          note: 'The study reports NF1 enriched on the head, where BRAF V600E and NRAS Q61 are depleted. The share ' +
                'of mutations carrying an ultraviolet signature was highest in NF1-class tumours (88%) and head ' +
                'melanomas (85%), and lowest in BRAF V600E tumours (70%) and lower-limb melanomas (74%). The ' +
                'whole table, 695 patients with a site recorded, is on the Evidence page.',
          source: ['cbio-mel-mskimpact-2020', 'shoushtari-2021'] },
        { name: 'Matched targeted therapy after checkpoint blockade, without BRAF V600',
          status: '27 of 172 patients who needed treatment beyond PD-1 and CTLA-4 blockade received a therapy ' +
                  'matched to their tumour\'s sequencing; 8 stayed free of treatment failure for more than 6 months',
          note: 'MEK or ERK inhibitors against a RAS alteration in 13 and against a BRAF class 2 alteration in 6, and ' +
                'TRK inhibitors for an NTRK fusion in 3. Median time to treatment failure was 3.2 months (range ' +
                '0.4–43.7).',
          source: { ref: 'shoushtari-2021', quote: 'Among 172 patients with BRAF V600 wild-type melanoma who progressed on checkpoint ' +
                                                   'blockade, 27 were treated with genomically matched therapy, and eight (30%) derived ' +
                                                   'clinical benefit lasting ≥6 months.' } }
      ]
    },
    related: [
      { to: 'path-cutaneous', kind: 'overlaps',
        note: '556 of the 696 patients here have cutaneous melanoma.' },
      { to: 'path-unknown', kind: 'overlaps',
        note: 'The other 140 have melanoma of unknown primary. Mucosal and uveal melanoma are not in this cohort.' }
    ],
    sources: [
      { label: 'Shoushtari et al, Clin Cancer Res 2021 — MAPK driver groups in 696 melanomas, read in full',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' },
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS and primary site',
        url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' }
    ]
  },

  {
    id: 'drv-braf-v600', axis: 'driver', parent: 'drv-root',
    label: 'BRAF V600', shortLabel: 'BRAF V600',
    prevalence: 30.9,
    markers: { BRAF: 'V600 mutation' },
    summary: '215 of the 696 patients (30.9%) carry a BRAF V600 mutation: V600E in 172 and another V600 change ' +
             'in 43. This is the class BRAF and MEK inhibitors are approved in. The three approved combinations — ' +
             'dabrafenib with trametinib, vemurafenib with cobimetinib, and encorafenib with binimetinib — are ' +
             'for unresectable or metastatic melanoma with BRAF V600E or V600K confirmed by an FDA-approved test, ' +
             'and were approved on better progression-free and overall survival than a BRAF inhibitor alone.',
    molecular: {
      biomarkers: [
        { name: 'BRAF V600E or V600K', use: 'selects a BRAF inhibitor with a MEK inhibitor',
          threshold: 'confirmed by an FDA-approved test, in unresectable or metastatic melanoma',
          source: 'nci-melanoma-hp' }
      ],
      pathways: [
        { name: 'Before and after a BRAF inhibitor given alone — why there is no resistance axis',
          status: 'NRAS mutation in 1 of 39 tumours sampled before vemurafenib or dabrafenib and 7 of 39 at ' +
                  'resistance; MAP2K2, which encodes MEK2, in 0 of 39 and 4 of 39',
          note: '45 patients with BRAF V600 metastatic melanoma, 31 given vemurafenib and 14 dabrafenib, each on ' +
                'its own. 32 have a sample from both times, and the NRAS mutation is new at resistance in 7 of ' +
                'those pairs. Two genes stay level for contrast: NF1 in 2 of 39 before and 2 after, PTEN in 7 and ' +
                '9. The authors found alterations in known or putative resistance genes in 23 of the 45 patients ' +
                '(51%), mostly reactivating the MAPK pathway, and BRAF amplification in 8.9%, which cBioPortal ' +
                'cannot show because it holds no copy-number data for the study. The regimen is the single agent ' +
                'the approved combinations were measured against, and before and after exist only in the sample ' +
                'names, so the figures are quoted here rather than drawn as an axis.',
          source: [{ ref: 'van-allen-2014', quote: 'Genetic alterations in known or putative RAF inhibitor resistance genes were observed in ' +
                                                   '23 of 45 patients (51%).' }, 'cbio-brafresist-2012'] }
      ]
    },
    related: [
      { to: 'path-skin', kind: 'overlaps',
        note: 'The same change is counted on the skin card from a different MSK cohort: BRAF V600 in 31.1% of ' +
              '1,082 skin melanomas.' },
      { to: 'path-uveal', kind: 'mutually-exclusive',
        note: 'Measured, not assumed: no BRAF V600 in 139 uveal melanomas in the MSK-IMPACT 50K cohort.' }
    ],
    sources: [
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version): BRAF and MEK inhibitors',
        url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' },
      { label: 'Van Allen et al, Cancer Discov 2014 — resistance to RAF inhibition, read in full',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3947264/' },
      { label: 'Broad skcm_broad_brafresist_2012 on cBioPortal — samples named _Pre and _Post',
        url: 'https://www.cbioportal.org/study/summary?id=skcm_broad_brafresist_2012' }
    ]
  },

  {
    id: 'drv-braf-v600e', axis: 'driver', parent: 'drv-braf-v600',
    label: 'BRAF V600E', shortLabel: 'V600E',
    prevalence: 24.7,
    markers: { BRAF: 'V600E' },
    summary: '172 of the 696 patients (24.7%). In the study this class had the lowest median tumour mutational ' +
             'burden, 7–8 mutations per megabase, shared with the unknown-driver class, and the youngest median ' +
             'age at diagnosis, 50. It arose on the trunk in 58 patients and on the head in 24.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600E', alteration: 'mutation', frequency: 100, role: 'activating allele', druggable: true },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 76.2, role: 'telomerase gene' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 27.3, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 17.4, role: 'tumour suppressor' },
        { gene: 'PTEN', alteration: 'mutation', frequency: 14.0, role: 'tumour suppressor' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-braf-v600-other', axis: 'driver', parent: 'drv-braf-v600',
    label: 'BRAF V600, not E', shortLabel: 'V600, not E',
    prevalence: 6.2,
    markers: { BRAF: 'V600K or V600R' },
    summary: '43 of the 696 patients (6.2%): V600K in 36 and V600R in 7. The approved combinations name V600E and ' +
             'V600K. The study placed tumours with BRAF V600K in its intermediate band of median tumour mutational ' +
             'burden, 14–18 mutations per megabase. 17 of the 43 arose on the head.',
    molecular: {
      drivers: [
        { gene: 'BRAF V600K', alteration: 'mutation', frequency: 83.7, role: 'activating allele', druggable: true },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 81.4, role: 'telomerase gene',
          note: '34 of the 35 patients with a TERT call have one in the promoter; the row counts any TERT ' +
                'mutation call.' },
        { gene: 'PTEN', alteration: 'mutation', frequency: 23.3, role: 'tumour suppressor' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 16.3, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 16.3, role: 'tumour suppressor' },
        { gene: 'MAP2K1', alteration: 'mutation', frequency: 14.0, role: 'MEK1 kinase' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version): BRAF and MEK inhibitors',
        url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' }
    ]
  },

  {
    id: 'drv-braf-class23', axis: 'driver', parent: 'drv-root',
    label: 'BRAF class 2 or 3', shortLabel: 'BRAF class 2/3',
    prevalence: 6.3,
    markers: { BRAF: 'class 2 or 3' },
    summary: '44 of the 696 patients (6.3%) whose BRAF alteration the study places in class 2 or 3 rather than ' +
             'V600: a BRAF mutation call in 29 and a BRAF fusion in 17. In the study, 6 patients with a class 2 ' +
             'alteration later received a MEK or ERK inhibitor matched to it.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 81.8, role: 'telomerase gene' },
        { gene: 'BRAF', alteration: 'mutation', frequency: 65.9, role: 'kinase' },
        { gene: 'BRAF', alteration: 'fusion', frequency: 38.6, role: 'kinase' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 29.5, role: 'tumour suppressor' },
        { gene: 'PTEN', alteration: 'mutation', frequency: 22.7, role: 'tumour suppressor' },
        { gene: 'BRAF V600', alteration: 'mutation', frequency: 6.8, role: 'activating allele', druggable: true,
          note: '3 of the 44 carry a V600 call as well. The class is the study\'s own label, not recomputed here.' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-nras-q61', axis: 'driver', parent: 'drv-root',
    label: 'NRAS Q61', shortLabel: 'NRAS Q61',
    prevalence: 24.7,
    markers: { NRAS: 'Q61' },
    summary: '172 of the 696 patients (24.7%). On a PD-1 antibody alone this group had the shortest median time ' +
             'to treatment failure of the study\'s four groups, 4.2 months. NRAS Q61 tumours carried a second MAPK alteration ' +
             'less often than tumours with other RAS changes (29% against 70%). It arose on the trunk in 52 ' +
             'patients and on the head in 19.',
    molecular: {
      drivers: [
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 100, role: 'activating allele',
          note: 'The row counts codons 12, 13 and 61 together; the class itself is Q61.' },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 90.7, role: 'telomerase gene' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 31.4, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 19.8, role: 'tumour suppressor' },
        { gene: 'MAP2K1', alteration: 'mutation', frequency: 7.0, role: 'MEK1 kinase' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-ras-other', axis: 'driver', parent: 'drv-root',
    label: 'Other RAS', shortLabel: 'Other RAS',
    prevalence: 3.6,
    summary: '25 of the 696 patients (3.6%) with a RAS family alteration other than NRAS Q61: an NRAS call in 12, ' +
             'KRAS in 6 and HRAS in 6. Median tumour mutational burden was 22 mutations per megabase, and 70% ' +
             'carried a second MAPK alteration. With 25 patients, each one is 4 percentage points.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 88.0, role: 'telomerase gene' },
        { gene: 'NRAS', alteration: 'mutation', frequency: 48.0, role: 'oncogene' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 36.0, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 28.0, role: 'tumour suppressor' },
        { gene: 'KRAS', alteration: 'mutation', frequency: 24.0, role: 'oncogene' },
        { gene: 'HRAS', alteration: 'mutation', frequency: 24.0, role: 'oncogene' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-nf1', axis: 'driver', parent: 'drv-root',
    label: 'NF1', shortLabel: 'NF1',
    prevalence: 22.3,
    summary: '155 of the 696 patients (22.3%). The class with the highest median tumour mutational burden in the ' +
             'study, 43 mutations per megabase, and the one most tied to where the melanoma arose: NF1-class ' +
             'tumours are 41.4% of head melanomas and 11.6% of trunk melanomas. On a PD-1 antibody alone its ' +
             'median time to treatment failure was 22 months.',
    molecular: {
      drivers: [
        { gene: 'NF1', alteration: 'mutation', frequency: 98.7, role: 'tumour suppressor' },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 89.7, role: 'telomerase gene',
          note: '138 of the 139 patients with a TERT call have one in the promoter; the row counts any TERT ' +
                'mutation call.' },
        { gene: 'TP53', alteration: 'mutation', frequency: 47.7, role: 'tumour suppressor',
          note: 'Any non-silent call, including ones that are not drivers, so the row runs high where tumours ' +
                'carry many mutations.' },
        { gene: 'CDKN2A', alteration: 'mutation', frequency: 31.6, role: 'tumour suppressor' },
        { gene: 'BRAF', alteration: 'mutation', frequency: 21.9, role: 'kinase',
          note: 'The study found NF1 most often co-altered with receptor tyrosine kinase genes, BRAF class 3 ' +
                'alterations or CBL.' },
        { gene: 'NRAS G12, G13 or Q61', alteration: 'mutation', frequency: 12.9, role: 'activating allele',
          note: '20 of the 155. The class is the study\'s own label, not recomputed here.' }
      ],
      pathways: [
        { name: 'Primary site',
          status: '67 of the 154 NF1-class patients with a site recorded (43.5%) arose on the head, and 21 (13.6%) ' +
                  'on the trunk; 88% of their mutations carried an ultraviolet signature, the highest of any class',
          source: ['cbio-mel-mskimpact-2020', 'shoushtari-2021'] }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS and primary site', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-kit', axis: 'driver', parent: 'drv-root',
    label: 'KIT or PDGFRA', shortLabel: 'KIT',
    prevalence: 2.0,
    markers: { KIT: 'mutation' },
    summary: '14 of the 696 patients (2.0%), every one with a KIT mutation. In the study this class had the oldest ' +
             'median age at diagnosis, 72, and a median tumour mutational burden of 37 mutations per megabase. ' +
             'NCI notes early data suggesting that mucosal or acral melanomas with activating KIT variants or ' +
             'amplifications may be sensitive to c-KIT inhibitors. With 14 patients, each one is about 7 ' +
             'percentage points.',
    molecular: {
      drivers: [
        { gene: 'KIT', alteration: 'mutation', frequency: 100, role: 'receptor tyrosine kinase' },
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 85.7, role: 'telomerase gene' },
        { gene: 'TP53', alteration: 'mutation', frequency: 50.0, role: 'tumour suppressor' },
        { gene: 'KIT', alteration: 'amplification', frequency: 28.6, role: 'receptor tyrosine kinase' }
      ]
    },
    related: [
      { to: 'path-mucosal', kind: 'shares-driver',
        note: 'KIT is mutated in 20.2% of mucosal melanomas on that card, from a different MSK cohort.' }
    ],
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'NCI PDQ — Melanoma Treatment (Health Professional Version): c-KIT inhibitors',
        url: 'https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq' }
    ]
  },

  {
    id: 'drv-other', axis: 'driver', parent: 'drv-root',
    label: 'Other driver', shortLabel: 'Other driver',
    prevalence: 6.2,
    summary: '43 of the 696 patients (6.2%) with a known driver outside the classes above; MAP2K1 is mutated in ' +
             '16 of them. A GNAQ or GNA11 hotspot, the change most uveal melanomas carry, is in 6. The study ' +
             'expects this group and the unknown-driver group to be better defined as more samples are analysed.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 67.4, role: 'telomerase gene',
          note: '28 of the 29 patients with a TERT call have one in the promoter; the row counts any TERT ' +
                'mutation call.' },
        { gene: 'MAP2K1', alteration: 'mutation', frequency: 37.2, role: 'MEK1 kinase' },
        { gene: 'TP53', alteration: 'mutation', frequency: 27.9, role: 'tumour suppressor' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 18.6, role: 'tumour suppressor' },
        { gene: 'GNAQ or GNA11 Q209/R183', alteration: 'mutation', frequency: 14.0, role: 'activating hotspot' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  },

  {
    id: 'drv-unknown', axis: 'driver', parent: 'drv-root',
    label: 'Unknown driver', shortLabel: 'Unknown',
    prevalence: 4.0,
    summary: '28 of the 696 patients (4.0%) in whom the study named no driver. With BRAF V600E this group had the ' +
             'lowest median tumour mutational burden in the study, 7–8 mutations per megabase.',
    molecular: {
      drivers: [
        { gene: 'TERT', alteration: 'promoter mutation', frequency: 53.6, role: 'telomerase gene' },
        { gene: 'CDKN2A', alteration: 'deep deletion', frequency: 32.1, role: 'tumour suppressor' },
        { gene: 'CDKN2A', alteration: 'mutation', frequency: 21.4, role: 'tumour suppressor' },
        { gene: 'TP53', alteration: 'mutation', frequency: 17.9, role: 'tumour suppressor' },
        { gene: 'PTEN', alteration: 'mutation', frequency: 17.9, role: 'tumour suppressor' }
      ]
    },
    sources: [
      { label: 'MSK mel_mskimpact_2020 on cBioPortal — DRIVER_CLASS', url: 'https://www.cbioportal.org/study/summary?id=mel_mskimpact_2020' },
      { label: 'Shoushtari et al, Clin Cancer Res 2021', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8046739/' }
    ]
  }
  ]
});
