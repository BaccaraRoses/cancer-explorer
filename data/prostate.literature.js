/* GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Produced by pipeline/run.py literature on 2026-10-18 00:46 UTC
 * 392 papers since 2024-01-01  (from 488 raw hits, deduplicated)
 * By tier: meta-analysis 7, preprint 25, primary 223, review 77, systematic review 12, trial 48
 * By kind: new-approach 109, resistance 127, toxicity 156
 *
 * Source: Europe PMC (PubMed + PMC + preprint servers), no API key.
 *
 * THIS IS A DATED SNAPSHOT of a literature that moves daily, and most of
 * it is preclinical. Every record carries an evidence tier, a species
 * flag, and the terms that matched it, so a preprint about mice cannot
 * be mistaken for a result. Nothing is ranked by promise: citation
 * counts are zero for recent work and no heuristic can tell which new
 * mechanism will succeed.
 */
window.CancerExplorerLiterature = window.CancerExplorerLiterature || {};
window.CancerExplorerLiterature['prostate'] = {
 "source": "Europe PMC (PubMed + PMC + preprint servers)",
 "api": "https://www.ebi.ac.uk/europepmc/webservices/rest/search",
 "licence": "metadata under Europe PMC terms; abstracts not redistributed here",
 "since": "2024-01-01",
 "n_papers": 392,
 "n_raw_hits": 488,
 "agents_queried": [
  "AKT inhibition (capivasertib)",
  "AR pathway inhibitors (abiraterone, enzalutamide)",
  "Androgen deprivation (GnRH)",
  "CYP11A1 inhibition (opevesostat)",
  "Checkpoint inhibitors",
  "PARP inhibitors",
  "PSMA radioligand therapy",
  "Radium-223",
  "T-cell engagers (STEAP1)",
  "Taxanes"
 ],
 "genes_queried": [
  "AR",
  "FOLH1",
  "PARP1",
  "BRCA1",
  "BRCA2",
  "ATM",
  "CDK12",
  "CHEK2",
  "PALB2",
  "PTEN",
  "AKT1",
  "PIK3CA",
  "TP53",
  "RB1",
  "MYC",
  "SPOP",
  "FOXA1",
  "CHD1",
  "STEAP1",
  "CYP17A1",
  "MSH2",
  "ERG"
 ],
 "by_tier": {
  "preprint": 25,
  "primary": 223,
  "review": 77,
  "meta-analysis": 7,
  "trial": 48,
  "systematic review": 12
 },
 "by_kind": {
  "resistance": 127,
  "new-approach": 109,
  "toxicity": 156
 },
 "by_species": {
  "human": 270,
  "mouse": 90,
  "unclear": 21,
  "cell line": 11
 },
 "caveat": "A dated snapshot of a moving literature. Evidence tier and species are shown on every row because most of this is preclinical. Nothing here is ranked by promise — that cannot be computed.",
 "papers": [
  {
   "id": "PPR1337732",
   "src": "PPR",
   "pmid": null,
   "doi": "10.21203/rs.3.rs-11183780/v1",
   "title": "Cancer type-specific profiling of chromatin regulator mutations identifies recurrent and co-occurring gene sets associated with improved survival following immune checkpoint therapy",
   "journal": null,
   "date": "2026-10-09",
   "authors": "Bukovec D, Gjorgjievska M, Kocevska S, Nikolova M, Mirkovikj L, Kungulovski I, M",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1337732",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42855516",
   "src": "MED",
   "pmid": "42855516",
   "doi": "10.1038/s41589-026-02347-2",
   "title": "Proteome-guided drug discovery maps and mitigates therapeutic degrader toxicity.",
   "journal": "Nature chemical biology",
   "date": "2026-10-09",
   "authors": "Basu S, Yu JSL, Bosak J, Bagal SK, Crafter C, Fallan C, Lemke O, Freiwald A, Whi",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42855516",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42854175",
   "src": "MED",
   "pmid": "42854175",
   "doi": "10.1200/jco-25-02995",
   "title": "Phase I/II Study of Bavdegalutamide, a Proteolysis-Targeting Chimera Androgen Receptor Degrader, in Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Journal of clinical oncology : official journal of the American Society of Clinical Oncology",
   "date": "2026-10-09",
   "authors": "Gao X, Garmezy B, Vuky J, Shen J, Sartor O, Sternberg CN, Dreicer R, Hussain M, ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42854175",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42847673",
   "src": "MED",
   "pmid": "42847673",
   "doi": "10.1093/oncolo/oyag390",
   "title": "Nivolumab and Cabozantinib in People with HIV and Advanced Solid Tumors: A Pilot Trial and Systematic Review.",
   "journal": "The oncologist",
   "date": "2026-10-08",
   "authors": "Cheng H, Cali E, Lalla M, Wang S, Wang H, Xue X, Gartrell BA, Sparano J, Rajdev ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42847673",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42838799",
   "src": "MED",
   "pmid": "42838799",
   "doi": "10.1016/j.eururo.2026.09.001",
   "title": "Major Adverse Cardiovascular Events in Men with High-risk Localized or Metastatic Prostate Cancer Starting Long-term Hormone Therapy in the STAMPEDE Trial.",
   "journal": "European urology",
   "date": "2026-10-06",
   "authors": "El-Taji O, Dutey-Magni P, Brown M, Murray M, Amos C, Gilbert D, Parmar M, Brown ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42838799",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42838467",
   "src": "MED",
   "pmid": "42838467",
   "doi": "10.1016/j.critrevonc.2026.105637",
   "title": "The impact of the tumor microenvironment on immune checkpoint inhibitor resistance in prostate cancer: Mechanistic insights and therapeutic strategies.",
   "journal": "Critical reviews in oncology/hematology",
   "date": "2026-10-06",
   "authors": "Zhou S, Bi Y, Xiong Z, Guo Y, Cui X, Zhang M.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42838467",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42296139",
   "src": "MED",
   "pmid": "42296139",
   "doi": "10.1093/jjco/hyag093",
   "title": "Bayesian re-analysis of ERA223 and PEACE-3 temporal dynamics and bone protection in radium-223-treated metastatic castration-resistant prostate cancer.",
   "journal": "Japanese journal of clinical oncology",
   "date": "2026-10-01",
   "authors": "Chen W, Yoshida S, Yajima S, Fujiwara M, Sato H, Hirakawa A, Fukushima H, Yasuda",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42296139",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42804714",
   "src": "MED",
   "pmid": "42804714",
   "doi": "10.1200/op-26-00312",
   "title": "Cardiovascular Risk Triage Schema for Patients With Prostate Cancer Treated With Hormone Therapy.",
   "journal": "JCO oncology practice",
   "date": "2026-09-28",
   "authors": "Guha A, Barac A, Ryan MJ, Hamdan R, Devgan G, Marshall CH, Gillessen S, Loeb S, ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42804714",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42805760",
   "src": "MED",
   "pmid": "42805760",
   "doi": "10.1136/jitc-2026-015348",
   "title": "Temporal dynamics of the immune response to neoadjuvant androgen deprivation therapy suggest a window of opportunity for checkpoint inhibitor therapy in prostate cancer.",
   "journal": "Journal for immunotherapy of cancer",
   "date": "2026-09-28",
   "authors": "Jamroze A, Zhang R, Dougherty E, Ahuja K, Deng L, Jatwani K, Nguyen UV, Farmer B",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42805760",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "immune cold"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42801730",
   "src": "MED",
   "pmid": "42801730",
   "doi": "10.1002/pros.70254",
   "title": "Androgen Receptor-Immune Crosstalk in Metastatic Castration-Resistant Prostate Cancer: From Context-Dependent Remodeling to Biomarker-Guided Translation.",
   "journal": "The Prostate",
   "date": "2026-09-27",
   "authors": "Li L, Feng R, Zha B, Yang S, Wang G, Jiang Z, Mou J, Gao F.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42801730",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42784510",
   "src": "MED",
   "pmid": "42784510",
   "doi": "10.1073/pnas.2603564123",
   "title": "Follistatin drives AR-independent prostate cancer through BMP signaling inactivation and microenvironmental remodeling.",
   "journal": "Proceedings of the National Academy of Sciences of the United States of America",
   "date": "2026-09-24",
   "authors": "Shi X, Fan Z, Qu M, Lin C, Ji Z, Tan C, Dai B, Chen R, Du Y, Bao Y, Ding Z, Xia ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42784510",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42786231",
   "src": "MED",
   "pmid": "42786231",
   "doi": "10.1007/s00280-026-04962-1",
   "title": "Association of androgen deprivation therapy and acute kidney injury in patients with prostate cancer: a systematic review and meta-analysis of 72,980 patients.",
   "journal": "Cancer chemotherapy and pharmacology",
   "date": "2026-09-24",
   "authors": "Pires IZ, Fujimura AY, da Silva Gobbo MO, Sudo RYU, Milbradt TL, Filho NM, Carva",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42786231",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42802891",
   "src": "MED",
   "pmid": "42802891",
   "doi": "10.1097/mnm.0000000000002243",
   "title": "Kidney impairment post 177Lu-PSMA radioligand therapy in metastatic prostate cancer.",
   "journal": "Nuclear medicine communications",
   "date": "2026-09-23",
   "authors": "Osbourne J, Hofman MS, Ruderman I.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42802891",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42778841",
   "src": "MED",
   "pmid": "42778841",
   "doi": "10.1245/s10434-026-20602-7",
   "title": "Ferroptosis at the Metabolic-Immune Interface in Metastatic Castration-Resistant Prostate Cancer: Mechanistic Evidence, Translational Gaps, and Combination Strategies.",
   "journal": "Annals of surgical oncology",
   "date": "2026-09-23",
   "authors": "Chen CC, Wang CJ, Lin HY.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42778841",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42766044",
   "src": "MED",
   "pmid": "42766044",
   "doi": "10.1186/s43046-026-00411-5",
   "title": "Recent advances in hormone-based biopharmaceuticals for cancer therapy.",
   "journal": "Journal of the Egyptian National Cancer Institute",
   "date": "2026-09-21",
   "authors": "Sarifulnazwan SN, Mohd Tajuddin NAF, Mohd Nasaruddin SNN, Muhammad Mukmin NMI, E",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42766044",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader",
    "PROTAC",
    "targeted protein degradation"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42795015",
   "src": "MED",
   "pmid": "42795015",
   "doi": "10.3390/cancers18183049",
   "title": "Pharmacovigilance of Androgen Receptor Pathway Inhibitors in Prostate Cancer: The Impact of Docetaxel Co-Reporting.",
   "journal": "Cancers",
   "date": "2026-09-20",
   "authors": "Alkan O, Nazlı İ, Başgöze A, Gümüş M.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42795015",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "Taxanes"
    }
   ]
  },
  {
   "id": "42762423",
   "src": "MED",
   "pmid": "42762423",
   "doi": "10.1007/s10147-026-03178-w",
   "title": "Prognostic impact of diabetes or hypertension in smokers with CRPC receiving enzalutamide or abiraterone.",
   "journal": "International journal of clinical oncology",
   "date": "2026-09-19",
   "authors": "Fukagai T, Izumi K, Yamagishi M, Shima T, Kato Y, Mita K, Okamura T, Inoue S, Ta",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42762423",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "hypertension"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42757823",
   "src": "MED",
   "pmid": "42757823",
   "doi": "10.1158/0008-5472.can-26-0874",
   "title": "BUB1B Mitotic Kinase Dependency Reveals CENP-E Inhibition as a Tractable Approach for Castration and Enzalutamide Resistant Prostate Cancer.",
   "journal": "Cancer research",
   "date": "2026-09-18",
   "authors": "Martinez MJ, Blanco C, Peinetti N, Cooke M, Lyles RD, Revuelta MV, Corey E, Stat",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42757823",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "PPR1321647",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.09.16.751805",
   "title": "SRPK1 is a determinant of chemoresistance to Docetaxel in prostate cancer",
   "journal": null,
   "date": "2026-09-17",
   "authors": "Duzgun D, Read W, Oltean S.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1321647",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "tubulin"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42845167",
   "src": "MED",
   "pmid": "42845167",
   "doi": "10.5534/wjmh.260107",
   "title": "Testosterone Recovery after Androgen Deprivation Therapy in Prostate Cancer: Differential Effects of Gonadotropin-Releasing Hormone Agonist Monotherapy and Maximal Androgen Blockade.",
   "journal": "The world journal of men's health",
   "date": "2026-09-16",
   "authors": "Yu J, Kang J, Song W, Kang M, Sung HH, Jeon HG, Jeong BC, Seo SI, Jeon SS.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42845167",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1321895",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.09.15.26363151",
   "title": "Cancer type-specific profiling of chromatin regulator mutations identifies recurrent and co-occurring gene sets associated with improved survival following immune checkpoint therapy",
   "journal": null,
   "date": "2026-09-16",
   "authors": "Bukovec D, Gjorgjievska M, Kocevska S, Nikolova M, Mirkovikj L, Kungulovski I, M",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1321895",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42748971",
   "src": "MED",
   "pmid": "42748971",
   "doi": "10.1055/a-2927-6325",
   "title": "[Molecular Diagnostics and Personalized Therapy for Metastatic Castration-Resistant Prostate Cancer (mCRPC)].",
   "journal": "Aktuelle Urologie",
   "date": "2026-09-16",
   "authors": "Semmler M, Casuscelli J, Zschäbitz S, Jann JC.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42748971",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR",
    "PTEN",
    "TP53",
    "RB1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "RB1"
    }
   ]
  },
  {
   "id": "42743770",
   "src": "MED",
   "pmid": "42743770",
   "doi": "10.1016/j.ctarc.2026.101440",
   "title": "Racial and ethnic disparities in metabolic syndrome care among prostate cancer patients on androgen deprivation therapy.",
   "journal": "Cancer treatment and research communications",
   "date": "2026-09-15",
   "authors": "Barqawi YK, Moturi KR, Hashemi-Sadraei N, Roberts MH, Thompson TA, Alashqar MT, ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42743770",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "metabolic syndrome"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42732376",
   "src": "MED",
   "pmid": "42732376",
   "doi": "10.1155/aiu/8111761",
   "title": "Neutropenia in Patients With Castration-Resistant Prostate Cancer Treated Using Cabazitaxel and Prophylactic Administration of Pegfilgrastim.",
   "journal": "Advances in urology",
   "date": "2026-09-12",
   "authors": "Oshinomi K, Kikuchi S, Kurokawa M, Mugita T, Inoue T, Yamagishi M, Nakagami Y, N",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42732376",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42777289",
   "src": "MED",
   "pmid": "42777289",
   "doi": "10.1016/j.ejca.2026.117041",
   "title": "Steroidogenesis inhibitor ODM-209 for metastatic castration-resistant prostate cancer and advanced breast cancer: Results from the first-in-human STESIDES study.",
   "journal": "European journal of cancer (Oxford, England : 1990)",
   "date": "2026-09-12",
   "authors": "Bernard-Tessier A, Spanggaard I, Utriainen T, Tanner M, Rohrberg K, Naoun N, Iko",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42777289",
   "kind": "toxicity",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "adrenal insufficiency"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "CYP11A1 inhibition (opevesostat)"
    }
   ]
  },
  {
   "id": "42762808",
   "src": "MED",
   "pmid": "42762808",
   "doi": "10.1016/j.seminoncol.2026.152559",
   "title": "Rhabdomyolysis resulting from the interaction of rosuvastatin and abiraterone: A case study.",
   "journal": "Seminars in oncology",
   "date": "2026-09-11",
   "authors": "Blagojevic C, Kim RB, Juurlink DN, Zipursky JS.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42762808",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42794467",
   "src": "MED",
   "pmid": "42794467",
   "doi": "10.3390/ijms27188037",
   "title": "Docosahexaenoic Acid Enhances the Cytotoxic Effects of Enzalutamide and the PARP Inhibitor in Castration-Resistant Prostate Cancer Cell Lines.",
   "journal": "International journal of molecular sciences",
   "date": "2026-09-09",
   "authors": "da Silva ADT, Ferreira LDP, Ribeiro DL, Tamarindo GH, Góes RM.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42794467",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42725474",
   "src": "MED",
   "pmid": "42725474",
   "doi": "10.1097/rlu.0000000000006689",
   "title": "¹⁷⁷Lu-PSMA Radioligand Therapy in Metastatic Castration-resistant Prostate Cancer With Complex Renal Conditions: A Case Series.",
   "journal": "Clinical nuclear medicine",
   "date": "2026-09-09",
   "authors": "Usmani S, Al Balushi A, Al Saadi S, Jain A, Al Harthy M, Ismaila A, Al Busaidi A",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42725474",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42795739",
   "src": "MED",
   "pmid": "42795739",
   "doi": "10.3390/jcm15186966",
   "title": "Association of Cabazitaxel Treatment Beyond 10 Cycles with Survival Outcomes in Metastatic Castration-Resistant Prostate Cancer: A Retrospective 8-Month Landmark Analysis.",
   "journal": "Journal of clinical medicine",
   "date": "2026-09-08",
   "authors": "Taban H, Aksoy S, Evlendi Y, Aktaş BY, Aslan F, Erman M.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42795739",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42711192",
   "src": "MED",
   "pmid": "42711192",
   "doi": "10.1016/j.eururo.2026.08.012",
   "title": "Impact of Treatment Intensification with Abiraterone on Fracture-related Hospitalisation in Newly Diagnosed Prostate Cancer: A Secondary Analysis of Two Randomised Phase 3 Trials Within the STAMPEDE Trial Platform.",
   "journal": "European urology",
   "date": "2026-09-08",
   "authors": "Gray S, Dutey-Magni P, Jones C, Murphy LR, Murray ML, Brown JE, McCloskey E, Bro",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42711192",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "bone mineral density"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42775139",
   "src": "MED",
   "pmid": "42775139",
   "doi": "10.3389/fcimb.2026.1882172",
   "title": "Gut-prostate axis in prostate cancer: microbiome signatures, mechanistic insights, and therapeutic opportunities.",
   "journal": "Frontiers in cellular and infection microbiology",
   "date": "2026-09-08",
   "authors": "Wang K, Tang Q, Fan W, Su Q.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42775139",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42705946",
   "src": "MED",
   "pmid": "42705946",
   "doi": "10.1016/j.euo.2026.08.011",
   "title": "Transdermal Estradiol for Treating Prostate Cancer: Revisiting Huggins and Hodges' Revolutionary Breakthrough.",
   "journal": "European urology oncology",
   "date": "2026-09-07",
   "authors": "Benjamin DJ, Rezazadeh Kalebasty A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42705946",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "hot flashes"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42697217",
   "src": "MED",
   "pmid": "42697217",
   "doi": "10.1016/s1470-2045(26)00304-9",
   "title": "An integrated lifestyle intervention for mitigation of adverse effects associated with androgen deprivation therapy for prostate cancer (STAMINA): a multicentre, randomised trial.",
   "journal": "The Lancet. Oncology",
   "date": "2026-09-04",
   "authors": "Bourke L, Rosario DJ, Reale S, Ibeggazene S, Innes A, Scope A, Price G, Taylor S",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42697217",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42790063",
   "src": "MED",
   "pmid": "42790063",
   "doi": "10.1016/j.clgc.2026.102657",
   "title": "Efficacy and Safety of Every Other Week Gemcitabine and Docetaxel (GEMDOC) in Heavily Pretreated Metastatic Castration Resistant Prostate Cancer: A Retrospective Real-world Analysis.",
   "journal": "Clinical genitourinary cancer",
   "date": "2026-09-03",
   "authors": "Ciuro J, Yildirim A, Liu Y, Marra A, Bilen MA, Ahmed S, Carthon B, Brown J, Berc",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42790063",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR1311267",
   "src": "PPR",
   "pmid": null,
   "doi": "10.20944/preprints202609.0219.v1",
   "title": "Treatment Sequencing in ARPI-Pre-Exposed Metastatic Castration-Resistant Prostate Cancer: Radioligand Therapy, PARP Inhibitors, and Antibody–Drug Conjugates",
   "journal": null,
   "date": "2026-09-03",
   "authors": "Sharaf B, Al-Rwashdeh M, El Khatib O, Al-Ibraheem A, Abu Fara A, Ismail A, Alkas",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1311267",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1",
    "BRCA2",
    "CDK12"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "CDK12"
    }
   ]
  },
  {
   "id": "42756742",
   "src": "MED",
   "pmid": "42756742",
   "doi": "10.1021/acsomega.6c05272",
   "title": "Overcoming Docetaxel Resistance in Prostate Cancer by Targeting Cell Cycle Progression with Narciclasine-Based Compounds.",
   "journal": "ACS omega",
   "date": "2026-09-02",
   "authors": "Silva Machado R, S Gomes K, B Farias A, Meneses Araújo N, Barbosa Chanes G, Pint",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42756742",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42276785",
   "src": "MED",
   "pmid": "42276785",
   "doi": "10.2967/jnumed.125.271531",
   "title": "Nonsteroidal 18F-Labeled PET Tracer for Imaging Androgen Receptors.",
   "journal": "Journal of nuclear medicine : official publication, Society of Nuclear Medicine",
   "date": "2026-09-02",
   "authors": "Jallinoja VIJ, Mun JS, Campanella A, Sasson A, Kalidindi TM, Caxeiro G, Veach DR",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42276785",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "first-in-class"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42817762",
   "src": "MED",
   "pmid": "42817762",
   "doi": "10.82687/actaurojp.72.9_279",
   "title": "[AGRANULOCYTOSIS CAUSED BY APALUTAMIDE : A CASE REPORT].",
   "journal": "Hinyokika kiyo. Acta urologica Japonica",
   "date": "2026-09-01",
   "authors": "Fujiwara Y, Shibamori K, Nakayama S.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42817762",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42227954",
   "src": "MED",
   "pmid": "42227954",
   "doi": "10.1158/1078-0432.ccr-26-0253",
   "title": "Phase Ib Trial of Bavdegalutamide (ARV-110) in Combination with Abiraterone for Metastatic Prostate Cancer.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2026-09-01",
   "authors": "Smoragiewicz M, Bernard-Tessier A, Linch M, Shen J, Shore ND, Parikh O, Chi KN, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42227954",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "42746692",
   "src": "MED",
   "pmid": "42746692",
   "doi": "10.1002/ctm2.70835",
   "title": "TMEM59L promotes neuroendocrine differentiation and enzalutamide resistance in prostate cancer by regulating MUC1/β-catenin/MYC axis.",
   "journal": "Clinical and translational medicine",
   "date": "2026-09-01",
   "authors": "Guo X, Liu Y, Huang J, Chen Z, Liao H, Xu Y, Cui X, Yu Y.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42746692",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42661511",
   "src": "MED",
   "pmid": "42661511",
   "doi": "10.1111/iju.70626",
   "title": "Real-World Outcomes of Olaparib in Japanese Patients With BRCA-Mutated Metastatic Castration-Resistant Prostate Cancer: Exploratory Analysis of BRCA2 Loss and Microsatellite Instability Status.",
   "journal": "International journal of urology : official journal of the Japanese Urological Association",
   "date": "2026-09-01",
   "authors": "Nukaya T, Naiki T, Watanabe H, Nakane K, Inamoto T, Yasui T, Koie T, Takahara K.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42661511",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42669076",
   "src": "MED",
   "pmid": "42669076",
   "doi": "10.1016/j.jaccao.2026.08.001",
   "title": "Identifying Patients With Prostate Cancer Who Benefit Most From Routine Cardiovascular Specialist Referral.",
   "journal": "JACC. CardioOncology",
   "date": "2026-08-30",
   "authors": "Cano Garcia C, Pinthus J, Avezum A, Devereaux PJ, Klotz L, Higano C, Fradet V, S",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42669076",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42669035",
   "src": "MED",
   "pmid": "42669035",
   "doi": "10.1001/jamainternmed.2026.4773",
   "title": "Specialist Referral for Cardiovascular Risk in Patients With Prostate Cancer: A Randomized Clinical Trial.",
   "journal": "JAMA internal medicine",
   "date": "2026-08-30",
   "authors": "Leong DP, Higano C, Cano Garcia C, Fradet V, Siemens DR, Niazi T, Shayegan B, Gu",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42669035",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42667368",
   "src": "MED",
   "pmid": "42667368",
   "doi": "10.1007/s00280-026-04933-6",
   "title": "Safety and preliminary efficacy results of a new micellar formulation of docetaxel in patients with metastatic castration-resistant prostate cancer - SAKK 67/20 trial.",
   "journal": "Cancer chemotherapy and pharmacology",
   "date": "2026-08-29",
   "authors": "Colombo I, Rietveld PCS, Fischer S, Merlo S, Vogl U, Cathomas R, Koolen SLW, Zoe",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42667368",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia",
    "alopecia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42681619",
   "src": "MED",
   "pmid": "42681619",
   "doi": "10.1186/s12885-026-16791-9",
   "title": "Prognostic value of circulating tumor DNA and copy-number alterations in patients receiving tandem [225Ac]Ac-/[177Lu]Lu-PSMA-617 therapy for metastatic castration-resistant prostate cancer: a prospective observational study.",
   "journal": "BMC cancer",
   "date": "2026-08-29",
   "authors": "Amghar M, Hielscher T, Rausch T, Özgür H, Bauder-Wüst U, Rathke H, Bruchertseife",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42681619",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA2",
    "ATM",
    "PTEN",
    "TP53",
    "RB1"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    },
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "RB1"
    }
   ]
  },
  {
   "id": "42729213",
   "src": "MED",
   "pmid": "42729213",
   "doi": "10.3389/fonc.2026.1831393",
   "title": "PSMA-RECAP: [177Lu]Lu-PSMA-617 retreatment in metastatic castration-resistant prostate cancer.",
   "journal": "Frontiers in oncology",
   "date": "2026-08-28",
   "authors": "Belge Bilgin G, Bilgin C, Packard AT, Burkett BJ, Oztekin ES, Thorpe MP, Childs ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42729213",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42811758",
   "src": "MED",
   "pmid": "42811758",
   "doi": "10.2174/011570159x477221260817120345",
   "title": "Association of Androgen Deprivation Therapy with Cerebral Small Vessel Disease Burden in Prostate Cancer.",
   "journal": "Current neuropharmacology",
   "date": "2026-08-27",
   "authors": "Zeng L, Bi R, Yang Z, Liu Q, Qiu Y, Wei Y, Peng H, Xiong W, Hu B, Li Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42811758",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42713055",
   "src": "MED",
   "pmid": "42713055",
   "doi": "10.3389/fonc.2026.1935673",
   "title": "FDG/PSMA discordance in [177Lu]Lu-PSMA radioligand therapy for mCRPC: a provisional target-sufficiency framework.",
   "journal": "Frontiers in oncology",
   "date": "2026-08-25",
   "authors": "Deng J, Ma G, Chen W, Wen S, Chen N.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42713055",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative",
    "PSMA heterogeneity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42637058",
   "src": "MED",
   "pmid": "42637058",
   "doi": "10.1016/j.bbcan.2026.189692",
   "title": "Post-translational modifications in prostate cancer: coordinated oncogenic networks and clinical implications.",
   "journal": "Biochimica et biophysica acta. Reviews on cancer",
   "date": "2026-08-24",
   "authors": "Ren H, Li X, Jiang Z, Bai Y, Ai J.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42637058",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "targeted protein degradation"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PTEN",
    "MYC",
    "FOXA1",
    "ERG"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "MYC"
    },
    {
     "kind": "new-approach",
     "subject": "FOXA1"
    },
    {
     "kind": "new-approach",
     "subject": "ERG"
    }
   ]
  },
  {
   "id": "42693870",
   "src": "MED",
   "pmid": "42693870",
   "doi": "10.2174/0115680096502346260817094745",
   "title": "Ubiquitination-Androgen Receptor Coupling in Prostate Cancer Therapeutics.",
   "journal": "Current cancer drug targets",
   "date": "2026-08-22",
   "authors": "Reddy GSVSR, Samanta K, Kar P.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42693870",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "targeted protein degradation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42652891",
   "src": "MED",
   "pmid": "42652891",
   "doi": "10.3390/jcm15166488",
   "title": "Reprogramming the Evolution of High-Risk Prostate Cancer: Multidisciplinary Strategies to Delay Castration Resistance.",
   "journal": "Journal of clinical medicine",
   "date": "2026-08-21",
   "authors": "Sim Y, Choi JW, Kim DS, Kim JH, Yoon SG, Jo JK.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42652891",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "Androgen deprivation (GnRH)"
    },
    {
     "kind": "new-approach",
     "subject": "AR"
    },
    {
     "kind": "new-approach",
     "subject": "PTEN"
    }
   ]
  },
  {
   "id": "42682049",
   "src": "MED",
   "pmid": "42682049",
   "doi": "10.32604/cju.2026.069559",
   "title": "Impact of leuprolide and goserelin on androgen suppression and adverse events in patients with prostate cancer.",
   "journal": "The Canadian journal of urology",
   "date": "2026-08-21",
   "authors": "Freitas CSM, Rocha-Silva F, Marques-Silva TA, de Oliveira ACR, da Silva SG, Sant",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42682049",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular",
    "hot flashes"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42628007",
   "src": "MED",
   "pmid": "42628007",
   "doi": "10.1200/po-25-01012",
   "title": "APUC-6 Genes as a Potential Prognostic and Predictive Biomarker in the CHAARTED Prostate Cancer Trial.",
   "journal": "JCO precision oncology",
   "date": "2026-08-21",
   "authors": "Shi X, Shetty AC, Wang J, Song Y, Sutera PA, Deek MP, Patel KR, Madan RA, Tang C",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42628007",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42624527",
   "src": "MED",
   "pmid": "42624527",
   "doi": "10.1080/1120009x.2026.2718574",
   "title": "The emerging trends in prostate cancer treatment: a systematic review of the literature.",
   "journal": "Journal of chemotherapy (Florence, Italy)",
   "date": "2026-08-20",
   "authors": "Fatima SA, Haider KH, Qutubuddin S, Begum Y, Stevenson M, Fatima K, Anwar EI, Ba",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42624527",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42635935",
   "src": "MED",
   "pmid": "42635935",
   "doi": "10.1186/s13550-026-01481-1",
   "title": "Biodistribution and dosimetry of the carbon-11 labelled PARP1-selective PET radiopharmaceutical [11C]AZ14193391.",
   "journal": "EJNMMI research",
   "date": "2026-08-19",
   "authors": "Törnblom A, He C, Bolin M, Tzortzakakis A, Fernebro J, Li C, Fridsten S, Altena ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42635935",
   "kind": "new-approach",
   "subject": "PARP1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "PARP1",
    "BRCA1"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA1"
    }
   ]
  },
  {
   "id": "42613815",
   "src": "MED",
   "pmid": "42613815",
   "doi": "10.1177/08971900261478840",
   "title": "Standardized Bone Health Assessment and Treatment Among Prostate Cancer Patients on Androgen Deprivation Therapy in a Large Integrated Managed Care Delivery System.",
   "journal": "Journal of pharmacy practice",
   "date": "2026-08-18",
   "authors": "Shulman MJ, Horton BH, Lo JC, Meganck MJ, Miller MK, Park-Sigal JJ, Avins AL.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42613815",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "bone mineral density"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42607762",
   "src": "MED",
   "pmid": "42607762",
   "doi": "10.1016/j.annonc.2026.07.412",
   "title": "Eight-year outcomes of testosterone suppression plus enzalutamide or a nonsteroidal antiandrogen for metastatic hormone-sensitive prostate cancer (ENZAMET; ANZUP 1304).",
   "journal": "Annals of oncology : official journal of the European Society for Medical Oncology",
   "date": "2026-08-17",
   "authors": "Zhang AY, Thomas H, Begbie S, Cheung L, Chi KN, Chowdhury S, Frydenberg M, Herbe",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42607762",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "falls"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42593785",
   "src": "MED",
   "pmid": "42593785",
   "doi": "10.1001/jamaoncol.2026.2790",
   "title": "Metabolic Dysfunction After Initiation of Androgen Receptor Pathway Inhibitors in Prostate Cancer.",
   "journal": "JAMA oncology",
   "date": "2026-08-13",
   "authors": "Shaver AL, Zarrabi KK, Nikita N, Sharma S, Wen KY, Lu-Yao G.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42593785",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "hypertension"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "Androgen deprivation (GnRH)"
    }
   ]
  },
  {
   "id": "42617299",
   "src": "MED",
   "pmid": "42617299",
   "doi": "10.1016/j.ejca.2026.116982",
   "title": "Evaluating safety: Number needed to harm analyses of androgen receptor inhibitors in advanced prostate cancer.",
   "journal": "European journal of cancer (Oxford, England : 1990)",
   "date": "2026-08-08",
   "authors": "George DJ, Fizazi K, Morgans AK, McManus HD, Yip YY, Srinivasan S, Duflot M, Upt",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42617299",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue",
    "hypertension",
    "falls",
    "cognitive"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42570199",
   "src": "MED",
   "pmid": "42570199",
   "doi": "10.1007/s11255-026-05329-4",
   "title": "Efficacy, safety, and quality of life outcomes of [177Lu] Lu-PSMA radioligand therapy in metastatic castration-resistant prostate cancer: a GRADE-assessed systematic review, meta-analysis and trial sequential analysis.",
   "journal": "International urology and nephrology",
   "date": "2026-08-08",
   "authors": "Mubarika M, Maaz M, Muhammad A, Emmama S, Mazhar Z, Khalid M, Kumari J, Alamin M",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42570199",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia",
    "thrombocytopenia"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42567299",
   "src": "MED",
   "pmid": "42567299",
   "doi": "10.1016/j.ejphar.2026.179218",
   "title": "Preclinical evaluation of itraconazole in docetaxel-resistant prostate cancer xenograft models.",
   "journal": "European journal of pharmacology",
   "date": "2026-08-07",
   "authors": "Souza LO, Bartels A, Moreira JMA.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42567299",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42562963",
   "src": "MED",
   "pmid": "42562963",
   "doi": "10.1038/s41391-026-01142-3",
   "title": "From fungus fighter to cancer slayer: itraconazole as a multifaceted candidate for drug-resistant prostate cancer.",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2026-08-06",
   "authors": "Souza LO, Papoutsi DG, Moreira JMA.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42562963",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance",
    "ABCB1"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42542970",
   "src": "MED",
   "pmid": "42542970",
   "doi": "10.1002/pros.70229",
   "title": "Treatment of Hot Flashes in Men With Prostate Cancer Undergoing Androgen Deprivation Therapy.",
   "journal": "The Prostate",
   "date": "2026-08-02",
   "authors": "Schaldemose EL, Poulsen MH, Nørby B, Madsen CV.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42542970",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "hot flashes"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42546543",
   "src": "MED",
   "pmid": "42546543",
   "doi": "10.1016/j.drup.2026.101463",
   "title": "MZF1-mediated GAPDH overexpression drives glycolytic reprogramming and neuroendocrine progression in advanced prostate cancer.",
   "journal": "Drug resistance updates : reviews and commentaries in antimicrobial and anticancer chemotherapy",
   "date": "2026-08-01",
   "authors": "Liu W, He L, Zhong C, Wang Y, Zhang D, Mirza M, Li B.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42546543",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42559798",
   "src": "MED",
   "pmid": "42559798",
   "doi": "10.1111/iju.70590",
   "title": "Real-World Outcomes of Olaparib Treatment in Japanese Patients With Metastatic Castration-Resistant Prostate Cancer Harboring BRCA Pathogenic or Likely Pathogenic Variants.",
   "journal": "International journal of urology : official journal of the Japanese Urological Association",
   "date": "2026-08-01",
   "authors": "Yasuda Y, Yoshida S, Yonese I, Sano Y, Matsumoto S, Urasaki T, Tamiya T, Tanaka ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42559798",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42693686",
   "src": "MED",
   "pmid": "42693686",
   "doi": "10.82687/actaurojp.72.8_249",
   "title": "[EFFICACY OF KEISHIBUKURYOGAN FOR HOT FLASH ASSOCIATED WITH HORMONE THERAPY IN PATIENTS WITH PROSTATE CANCER].",
   "journal": "Hinyokika kiyo. Acta urologica Japonica",
   "date": "2026-08-01",
   "authors": "Shigehara K, Sinzawa R, Takada S, Fukukawa K, Kawaguchi S, Nohara T, Izumi K, Mi",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42693686",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "hot flashes"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42615451",
   "src": "MED",
   "pmid": "42615451",
   "doi": "10.1016/j.jaccao.2026.07.007",
   "title": "Divergent Effects of GnRH Agonist and GnRH Antagonist Treatment on Platelet Activity and Transcriptome.",
   "journal": "JACC. CardioOncology",
   "date": "2026-08-01",
   "authors": "Beitzen-Heineke A, Siskin M, Muller M, Bhatt A, Hafertepe KC, Xia Y, Economides ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42615451",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42053993",
   "src": "MED",
   "pmid": "42053993",
   "doi": "10.1158/1078-0432.ccr-26-0642",
   "title": "Evaluation of Tissue from Patients with Prostate Cancer Identifies B7-H3 as an Androgen-Regulated, Broadly Expressed, Combinatorial Therapeutic Target.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2026-08-01",
   "authors": "Sharma S, Mundhara N, Tekoglu E, Amaral A, Gu P, Luo J, Xie S, Konchou MM, Pepra",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42053993",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "bispecific"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42290280",
   "src": "MED",
   "pmid": "42290280",
   "doi": "10.1158/0008-5472.can-25-4954",
   "title": "Reprogramming of TLR-Ferroptosis Signaling and Immunometabolic Pathways Overcomes Myeloid Suppression to Improve Checkpoint Blockade in Prostate Cancer.",
   "journal": "Cancer research",
   "date": "2026-08-01",
   "authors": "Siddiqui NA, Zhang L, DeLeon G, Naguib N, Zhang T, Quinn TP, Chen F, Aragon Sana",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42290280",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "first-in-class"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "42730149",
   "src": "MED",
   "pmid": "42730149",
   "doi": "10.14740/wjon2799",
   "title": "Targeting the Fatty Acid Binding Protein 5-Specificity Protein 1 Axis Restores Enzalutamide Sensitivity by Suppressing Androgen Receptor/Androgen Receptor Splice Variant 7 Signaling: Implications for Prostate Cancer Therapy.",
   "journal": "World journal of oncology",
   "date": "2026-07-30",
   "authors": "Abdulsamad SA, Naeem AA, Baashar A, Aldarmahi AA, Alamri FF, Abuarab NK, Alsahaf",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42730149",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42530436",
   "src": "MED",
   "pmid": "42530436",
   "doi": "10.1158/1541-7786.mcr-25-1300",
   "title": "DNMT3B drives neuroendocrine lineage plasticity and aggressive progression in prostate cancer.",
   "journal": "Molecular cancer research : MCR",
   "date": "2026-07-30",
   "authors": "Jo Y, Jung H, Wang Z, Lee D, Tran A, Tsai B, Zhao T, Huang F, Jung I, Hong C, Li",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42530436",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42527846",
   "src": "MED",
   "pmid": "42527846",
   "doi": "10.1007/s40265-026-02355-5",
   "title": "DLL3-Targeted Strategies in Advanced Prostate Cancer: Current Evidence and Future Perspectives.",
   "journal": "Drugs",
   "date": "2026-07-29",
   "authors": "Pecoraro G, De Giorgi A, Montelatici G, Salfi G, Lin HM, Turco F, Taha T, Beltra",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42527846",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "bispecific",
    "antibody-drug conjugate",
    "trispecific"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42517216",
   "src": "MED",
   "pmid": "42517216",
   "doi": "10.1161/circimaging.126.019636",
   "title": "Longitudinal [18F]FDG PET/MR Assessment of Arterial Inflammation in Patients With Prostate Cancer Undergoing Androgen Deprivation Therapy.",
   "journal": "Circulation. Cardiovascular imaging",
   "date": "2026-07-28",
   "authors": "Xue S, Hu C, Li L, Einspieler H, Kiss A, Podesser BK, Bergler-Klein J, Hacker M,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42517216",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42522232",
   "src": "MED",
   "pmid": "42522232",
   "doi": "10.4103/aja202614",
   "title": "Dynamic changes of serum albumin-to-globulin ratio predict major adverse cardiovascular events in prostate cancer patients undergoing androgen deprivation therapy.",
   "journal": "Asian journal of andrology",
   "date": "2026-07-28",
   "authors": "Zhou YH, Lee YHA, Tang YX, Dai YB, Chiu PK, Teoh JY, Ng CF.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42522232",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42396977",
   "src": "MED",
   "pmid": "42396977",
   "doi": "10.1080/13543776.2026.2699768",
   "title": "AKR1C3 inhibitors and exploiters for the treatment and therapeutic monitoring of cancer: a patent review (2020-present).",
   "journal": "Expert opinion on therapeutic patents",
   "date": "2026-07-28",
   "authors": "Case AM, Smith MM, Mack CA, Trippier PC.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42396977",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42509416",
   "src": "MED",
   "pmid": "42509416",
   "doi": "10.1038/s41388-026-03921-7",
   "title": "Enhancing the efficacy of B7-H3-targeting antibody-drug conjugate DS-7300a in TP53-deficient tumors by inducing ferroptosis.",
   "journal": "Oncogene",
   "date": "2026-07-27",
   "authors": "Leo J, Chen F, Shi W, Liang X, Meng C, Gu Q, Albittar Y, Fan Z, Zhang J, Gan B, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42509416",
   "kind": "new-approach",
   "subject": "ATM",
   "matched": [
    "antibody-drug conjugate"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "ATM",
    "TP53"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "TP53"
    }
   ]
  },
  {
   "id": "42492625",
   "src": "MED",
   "pmid": "42492625",
   "doi": "10.1016/j.bmcl.2026.130743",
   "title": "An optimized RNF126-targeting covalent handle for molecular glue degraders.",
   "journal": "Bioorganic & medicinal chemistry letters",
   "date": "2026-07-23",
   "authors": "Modi A, Toriki ES, Stieger CE, Lau EA, Song C, Chew A, Tsao A, Nishikawa K, McKe",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42492625",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "42515880",
   "src": "MED",
   "pmid": "42515880",
   "doi": "10.2174/0115748928464095260706163130",
   "title": "Innovations in Diagnosis Immunotherapy and Combination Therapy of Prostate Cancer: A Patent-driven Analysis.",
   "journal": "Recent patents on anti-cancer drug discovery",
   "date": "2026-07-22",
   "authors": "Relan R, Sambar B, Dudam AK, Kanugo A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42515880",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "CAR-T"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR",
    "ERG"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ERG"
    }
   ]
  },
  {
   "id": "42471290",
   "src": "MED",
   "pmid": "42471290",
   "doi": "10.1016/j.urolonc.2026.06.028",
   "title": "Lutetium-177-PSMA radioligand therapy in metastatic hormone-sensitive prostate cancer: A systematic review of efficacy, safety, and combination strategies.",
   "journal": "Urologic oncology",
   "date": "2026-07-18",
   "authors": "McGrath J, Willis R, Balaji S, Ishiyama Y, Sceats H, Bandyk M, Balaji KC.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42471290",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42514251",
   "src": "MED",
   "pmid": "42514251",
   "doi": "10.3390/life16071184",
   "title": "Abiraterone Acetate Affects Gene Expression Profile in a Human Male Neuronal Cell Line: Potential Mechanism for Cognitive Deficits with Prostate Cancer Therapy.",
   "journal": "Life (Basel, Switzerland)",
   "date": "2026-07-16",
   "authors": "Gulkarov S, Reiss AB, Srivastava A, Lim-Goyette J, Renna HA, Laccetti A, Katz AE",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42514251",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "cognitive"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42455461",
   "src": "MED",
   "pmid": "42455461",
   "doi": "10.1007/s10147-026-03137-5",
   "title": "Real-world evaluation of primary prophylactic use of granulocyte colony-stimulating factor in patients with metastatic castration-sensitive prostate cancer treated with triplet therapy.",
   "journal": "International journal of clinical oncology",
   "date": "2026-07-15",
   "authors": "Kubo M, Urabe F, Tashiro K, Kagawa H, Iwamoto Y, Kondo Y, Saito S, Kawano S, Har",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42455461",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42455319",
   "src": "MED",
   "pmid": "42455319",
   "doi": "10.1007/s11033-026-12340-6",
   "title": "Immunotherapeutic strategies for castration-resistant prostate cancer: A systematic review of mechanisms, clinical advances and emerging approaches.",
   "journal": "Molecular biology reports",
   "date": "2026-07-15",
   "authors": "Xu Z, Xia Z, Li J, Yuan S, Zhao L, Wang X.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42455319",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment",
    "low tumor mutational burden"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-crpc",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "42446704",
   "src": "MED",
   "pmid": "42446704",
   "doi": "10.1007/s00345-026-06597-6",
   "title": "Comparative safety profiles of enzalutamide, olaparib, and lutetium Lu-177 vipivotide tetraxetan in patients with prostate cancer: a real-world disproportionality analysis of the FAERS database.",
   "journal": "World journal of urology",
   "date": "2026-07-14",
   "authors": "Li R, Li T, Yu J, Niu Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42446704",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia",
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42515765",
   "src": "MED",
   "pmid": "42515765",
   "doi": "10.3390/ph19071084",
   "title": "Baseline PSMA PET/CT Biomarkers for Patient Selection in [177Lu]Lu-PSMA Radioligand Therapy: Clinical Promise, Methodological Heterogeneity and Future Standardization.",
   "journal": "Pharmaceuticals (Basel, Switzerland)",
   "date": "2026-07-14",
   "authors": "Galnaitienė G, Šimkus M, Balčiūnaitė I, Lušaitė K, Wen F, Hoffmann M, Saar M, Mo",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42515765",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42513328",
   "src": "MED",
   "pmid": "42513328",
   "doi": "10.3390/jcm15145414",
   "title": "Medical Management of Modifiable Risks: Improving Survival in High-Risk Prostate Cancer Patients Receiving Brachytherapy.",
   "journal": "Journal of clinical medicine",
   "date": "2026-07-10",
   "authors": "Moningi S, Mirić G, Galbreath RW, Fiano R, Wallner KE, Sayan M, Orio PF, King M.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42513328",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42505218",
   "src": "MED",
   "pmid": "42505218",
   "doi": "10.3390/curroncol33070416",
   "title": "NGS-Based Genomic Profiling Identifies Independent Predictors of Time to Castration Resistance in Hormone-Sensitive Prostate Cancer: A Retrospective Real-World Study.",
   "journal": "Current oncology (Toronto, Ont.)",
   "date": "2026-07-10",
   "authors": "Turan M, Balta MÇ.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42505218",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42430428",
   "src": "MED",
   "pmid": "42430428",
   "doi": "10.1021/acs.jmedchem.6c01590",
   "title": "Discovery of Potential First-in-Class Dual Ligand-Directed Degrader and Antagonist of the Androgen Receptor: BMS-986365.",
   "journal": "Journal of medicinal chemistry",
   "date": "2026-07-10",
   "authors": "Mortensen DS, Nayak S, Plantevin-Krenitsky V, Horn EJ, Meiring J, Reiss S, Peaco",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42430428",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "first-in-class",
    "degrader",
    "targeted protein degradation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42425824",
   "src": "MED",
   "pmid": "42425824",
   "doi": "10.1016/j.bulcan.2026.04.009",
   "title": "[How to prevent and manage PARP inhibitor-related hematological toxicities in prostate cancer?]",
   "journal": "Bulletin du cancer",
   "date": "2026-07-09",
   "authors": "Cassuto O, Schmitt A, Helissey C, Gobert A, Mathieu R, Bouteleux C, Mourey L, Jo",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42425824",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia",
    "thrombocytopenia"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42450213",
   "src": "MED",
   "pmid": "42450213",
   "doi": "10.3390/ijms27135945",
   "title": "Glutamate Ionotropic Kainate Receptors as Therapeutic Targets in Enzalutamide-Resistant and Neuroendocrine Prostate Cancer.",
   "journal": "International journal of molecular sciences",
   "date": "2026-07-02",
   "authors": "Qu H, Xu P, Yang JC, Wei F, Zhao J, Wang L, Corey E, Mitsiades N, Lam K, Iczkows",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42450213",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42508291",
   "src": "MED",
   "pmid": "42508291",
   "doi": "10.1016/j.clgc.2026.102610",
   "title": "Safety Profile Comparison of Androgen Receptor Pathway Inhibitors: A Pharmacovigilance Signal Detection Analysis Using Disproportionality Methods and Age-Stratified Comparison of 37,875 FAERS Reports.",
   "journal": "Clinical genitourinary cancer",
   "date": "2026-07-01",
   "authors": "Beypınar İ, Kurtuluş A, Balçık OY.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42508291",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42389933",
   "src": "MED",
   "pmid": "42389933",
   "doi": "10.1210/endocr/bqag076",
   "title": "Long noncoding RNAs mediate endocrine signaling and resistance in prostate cancer.",
   "journal": "Endocrinology",
   "date": "2026-07-01",
   "authors": "Gioeli D.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42389933",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR splice variant",
    "lineage plasticity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42615966",
   "src": "MED",
   "pmid": "42615966",
   "doi": "10.1080/13543784.2026.2713042",
   "title": "Taxane therapy in mCRPC: current positioning and emerging strategies to overcome resistance.",
   "journal": "Expert opinion on investigational drugs",
   "date": "2026-07-01",
   "authors": "Wang L, Tang Y, Liu M, Zhou H, Zeng H, Tang B.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42615966",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "42608357",
   "src": "MED",
   "pmid": "42608357",
   "doi": "10.56434/j.arch.esp.urol.20267906.103",
   "title": "Bone Health in Patients With Prostate Cancer Treated With Androgen Deprivation Therapy: Risk Assessment and Practical Recommendations.",
   "journal": "Archivos espanoles de urologia",
   "date": "2026-07-01",
   "authors": "Guardado González S, López-Campos F, Gaztañaga Boronat M, Fernández Alonso S, Za",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42608357",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "bone mineral density"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42432982",
   "src": "MED",
   "pmid": "42432982",
   "doi": "10.1097/md.0000000000049716",
   "title": "The relationship between prostate cancer and metabolic syndrome: A bibliometric analysis (2021-2023).",
   "journal": "Medicine",
   "date": "2026-07-01",
   "authors": "Wang F, Wu J, Wang W, Hu M, Xi Q.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42432982",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "metabolic syndrome"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42386405",
   "src": "MED",
   "pmid": "42386405",
   "doi": "10.1016/j.ejim.2026.107051",
   "title": "Cardiovascular complications of antineoplastic treatment in prostate cancer patients and compensatory strategies for clinical management.",
   "journal": "European journal of internal medicine",
   "date": "2026-07-01",
   "authors": "Tsiamis N, Toulgaridis F, Stefanou E, Tountas C, Tsitsinakis G, Ballas E, Maurog",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42386405",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42576472",
   "src": "MED",
   "pmid": "42576472",
   "doi": "10.21037/apm-2026-0041",
   "title": "Metastasis-directed therapy in oligoprogressive prostate cancer: current evidence and future directions.",
   "journal": "Annals of palliative medicine",
   "date": "2026-07-01",
   "authors": "Wang JH, Huang D, Amoateng EJ, Tipirneni A, Zhang H, Bylund K, Cummings M, Tran ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42576472",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42488736",
   "src": "MED",
   "pmid": "42488736",
   "doi": "10.5114/jcb.2026.163318",
   "title": "Concurrent chemoradiation and high-dose-rate brachytherapy for synchronous muscle-invasive bladder carcinoma and very high-risk prostate adenocarcinoma: A case report.",
   "journal": "Journal of contemporary brachytherapy",
   "date": "2026-06-30",
   "authors": "Watts S, Hanus E, Awan S, Badkul R, Caracioni AA, Shiao JC.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42488736",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42381373",
   "src": "MED",
   "pmid": "42381373",
   "doi": "10.1177/10781552261463637",
   "title": "Polypharmacy and clinical outcomes in geriatric patients with metastatic hormone-sensitive prostate cancer treated with androgen receptor pathway inhibitors.",
   "journal": "Journal of oncology pharmacy practice : official publication of the International Society of Oncology Pharmacy Practitioners",
   "date": "2026-06-30",
   "authors": "Kapagan T, Bulut N, Oflas U, Erdem GU.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42381373",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42385348",
   "src": "MED",
   "pmid": "42385348",
   "doi": "10.1016/j.ejmech.2026.119107",
   "title": "Design, synthesis, and biological evaluation of HSP70-mediated HEMTACs as novel androgen receptor degraders.",
   "journal": "European journal of medicinal chemistry",
   "date": "2026-06-29",
   "authors": "Li Z, Han X, Guo S, Du L.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42385348",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "degrader",
    "PROTAC",
    "targeted protein degradation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "PPR1261302",
   "src": "PPR",
   "pmid": null,
   "doi": "10.21203/rs.3.rs-9737806/v1",
   "title": "Prognostic value of circulating tumor DNA and copy-number alterations in patients receiving tandem [225 Ac]Ac-/[177 Lu]Lu-PSMA-617 therapy for metastatic castration- resistant prostate cancer: a prospective observational study",
   "journal": null,
   "date": "2026-06-29",
   "authors": "Amghar M, Hielscher T, Rausch T, Ozgur H, Bauder-Wüst U, Rathke H, Bruchertseife",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1261302",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA2",
    "ATM",
    "PTEN",
    "TP53",
    "RB1"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    },
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "RB1"
    }
   ]
  },
  {
   "id": "42350616",
   "src": "MED",
   "pmid": "42350616",
   "doi": "10.1007/s00259-026-08028-5",
   "title": "Comparison of [18F]DCFPyL and [18F]FAPI-74 PET/CT imaging in metastatic prostate cancer.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2026-06-26",
   "authors": "Hyväkkä A, Seppänen M, Sundvall M, Sivonen V, Mattila K, Anttinen M, Ettala O, H",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42350616",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42359636",
   "src": "MED",
   "pmid": "42359636",
   "doi": "10.1080/15384047.2026.2694128",
   "title": "Targeting the PI3K/AKT pathway in prostate cancer: the role of PTEN deficiency and biomarker-guided therapy.",
   "journal": "Cancer biology & therapy",
   "date": "2026-06-26",
   "authors": "Staton A, Abel M, Figg WD.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42359636",
   "kind": "toxicity",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "hyperglycemia",
    "rash",
    "diarrhea"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "42400916",
   "src": "MED",
   "pmid": "42400916",
   "doi": "10.1097/mou.0000000000001423",
   "title": "Personalized therapy in metastatic hormone-sensitive prostate cancer: a 2026 update on navigating therapeutic complexity.",
   "journal": "Current opinion in urology",
   "date": "2026-06-26",
   "authors": "Koett M, Artamonova N, Heidegger I.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42400916",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PTEN"
   ],
   "nodes": []
  },
  {
   "id": "42334408",
   "src": "MED",
   "pmid": "42334408",
   "doi": "10.23736/s2724-6051.26.06453-0",
   "title": "Darolutamide versus abiraterone acetate-based triplets in patients with hormone-sensitive prostate cancer: real-world, head-to-head comparison from the ARON-3 study.",
   "journal": "Minerva urology and nephrology",
   "date": "2026-06-23",
   "authors": "Rescigno P, Taha T, Fita MJ, Matthews D, Fujita K, Lolli C, DI Costanzo F, Juáre",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42334408",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42337054",
   "src": "MED",
   "pmid": "42337054",
   "doi": "10.1038/s41401-026-01856-z",
   "title": "Development of XYD113 as a potent and highly selective GSPT1 degrader for cancer therapy.",
   "journal": "Acta pharmacologica Sinica",
   "date": "2026-06-23",
   "authors": "Shen H, Luo XY, Jing XY, Jin WQ, Xu HR, Hu JK, Zhong ZX, Zhang J, Liang HZ, Zhua",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42337054",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "degrader",
    "molecular glue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "42331201",
   "src": "MED",
   "pmid": "42331201",
   "doi": "10.1016/j.cellsig.2026.112690",
   "title": "NUSAP1 mediates enzalutamide resistance in prostate cancer via Wnt/β-catenin signalling-dependent regulation of AR and AR-V7.",
   "journal": "Cellular signalling",
   "date": "2026-06-22",
   "authors": "Wang N, Li Y, Li J, Jiang C, Jia Y, Yang X, Wang L, Zhao R, Nie L.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42331201",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42324414",
   "src": "MED",
   "pmid": "42324414",
   "doi": "10.1007/s11307-026-02118-4",
   "title": "Direct Androgen Receptor Antagonism Enhances Therapeutic PSMA Radioligand Uptake in Prostate Cancer Models.",
   "journal": "Molecular imaging and biology",
   "date": "2026-06-21",
   "authors": "Hartrampf PE, Serfling SE, Hasenauer N, Buck AK, Rogoll D, Kalogirou C, Weich A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42324414",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42315637",
   "src": "MED",
   "pmid": "42315637",
   "doi": "10.1007/s00259-026-08006-x",
   "title": "Lutetium-177-PSMA I&T (Lu-PSMA) with radiosensitising capecitabine in patients with metastatic castration-resistant prostate cancer (mCRPC): results of phase Ia study.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2026-06-19",
   "authors": "Leslie C, Al-Ogaili Z, Oh L, Slattery T, Shaji S, Marsavela G, Mills A, Stone C,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42315637",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42320339",
   "src": "MED",
   "pmid": "42320339",
   "doi": "10.1016/j.ctarc.2026.101293",
   "title": "Theranostic strategies in prostate cancer: Advances in PSMA PET imaging and radioligand therapy.",
   "journal": "Cancer treatment and research communications",
   "date": "2026-06-19",
   "authors": "Al-Assil T, Han J, Hasan N, Gibson S, Seneriches J, Kim M, Yang J, Srinivas S, K",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42320339",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42312474",
   "src": "MED",
   "pmid": "42312474",
   "doi": "10.1080/14796694.2026.2681674",
   "title": "Rucaparib - drug evaluation: a PARP inhibitor for the treatment of BRCA-mutated metastatic castration-resistant prostate cancer.",
   "journal": "Future oncology (London, England)",
   "date": "2026-06-18",
   "authors": "Bryce AH, Nash P, Roessler A, Mandair D.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42312474",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "PARP inhibitors"
    }
   ]
  },
  {
   "id": "42313934",
   "src": "MED",
   "pmid": "42313934",
   "doi": "10.1073/pnas.2525431123",
   "title": "Targeting the DNA methylation-H3K27me3 switch reverses castration resistance and immunosuppression via ADAMTS1-driven collagenolysis.",
   "journal": "Proceedings of the National Academy of Sciences of the United States of America",
   "date": "2026-06-18",
   "authors": "Wu X, Song X, Li B, Yang Y, Li K, Zhu J, Li Y, Yang X, Dai Y, Zhang Z.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42313934",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42356187",
   "src": "MED",
   "pmid": "42356187",
   "doi": "10.3390/medicina62061175",
   "title": "Quality of Life and Psychological Factors in Patients with Metastatic Prostate Cancer Receiving Androgen Receptor-Targeted Therapies: A Prospective Cross-Sectional Real-World Study.",
   "journal": "Medicina (Kaunas, Lithuania)",
   "date": "2026-06-17",
   "authors": "Çelik S, Karatlı S, Atak M, Sevim HA, İmamoğlu Gİ, Rahatlı S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42356187",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "cognitive"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42352498",
   "src": "MED",
   "pmid": "42352498",
   "doi": "10.3390/cancers18121966",
   "title": "Evolving Systemic Therapy for Prostate Cancer: Pivotal Clinical Trials, Biomarker-Driven Combinations, and Practical Sequencing in the ARSI-PARP-Radioligand Era.",
   "journal": "Cancers",
   "date": "2026-06-17",
   "authors": "Somoto T, Utsumi T, Ikeda R, Sugimoto T, Ishitsuka N, Kadono Y, Noro T, Suzuki Y",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42352498",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA heterogeneity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic",
    "state-crpc",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "42370172",
   "src": "MED",
   "pmid": "42370172",
   "doi": "10.7150/thno.131907",
   "title": "CDK9 degrader induces BRCAness and sensitizes castration-resistant prostate cancer to PARP inhibitor.",
   "journal": "Theranostics",
   "date": "2026-06-17",
   "authors": "Li J, Sun J, Tan W, Li G, Xiao W, Wu J, Yang W, Chen C, Li Y, Liu J, Liu Y, Liu ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42370172",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "degrader"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "42286315",
   "src": "MED",
   "pmid": "42286315",
   "doi": "10.1038/s41391-026-01128-1",
   "title": "Association between concomitant ACEI/ARBs use and survival of patients with prostate cancer receiving abiraterone acetate: A post-hoc analysis of two randomized trials.",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2026-06-12",
   "authors": "Zhao J, Cai X, Mo Z, Zhao D, Wang J, Yang Z, Long X, Li Y, Chen D, Li J, Zhou Z,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42286315",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "hypertension"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42276910",
   "src": "MED",
   "pmid": "42276910",
   "doi": "10.1016/j.euf.2026.05.014",
   "title": "How Will PSMAddition Impact the Management of Prostate Cancer?",
   "journal": "European urology focus",
   "date": "2026-06-11",
   "authors": "Marulanda-Corzo V, Holmes AN, Giri VK, Osborne JR, Tagawa ST.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42276910",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "PARP inhibitors"
    }
   ]
  },
  {
   "id": "42264967",
   "src": "MED",
   "pmid": "42264967",
   "doi": "10.1053/j.semnuclmed.2026.05.004",
   "title": "Feasibility of treating neuroendocrine prostate cancer with anti-SSTR radioligands: A systematic review of imaging and treatment studies.",
   "journal": "Seminars in nuclear medicine",
   "date": "2026-06-10",
   "authors": "Valizadeh P, Jannatdoust P, Shahgholianghahfarokhi M, Heidari P, Menda Y, Sharif",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42264967",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42243460",
   "src": "MED",
   "pmid": "42243460",
   "doi": "10.1007/s10928-026-10038-7",
   "title": "Exposure-safety analyses of talazoparib in combination with enzalutamide in patients with metastatic castration-resistant prostate cancer (mCRPC) in the TALAPRO-2 trial.",
   "journal": "Journal of pharmacokinetics and pharmacodynamics",
   "date": "2026-06-04",
   "authors": "Wang Y, Hadigol M, Lincha VR, Hoffman J, Azad AA, Agarwal N, Matsubara N, Zohren",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42243460",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "thrombocytopenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42431109",
   "src": "MED",
   "pmid": "42431109",
   "doi": "10.1016/j.clgc.2026.102588",
   "title": "Evaluation of Efficacy and Safety of Olaparib in Combination With Abiraterone for the Treatment of Metastatic Castration-Resistant Prostate Cancer (mCRPC) With Homologous Recombination Repair Gene Mutations.",
   "journal": "Clinical genitourinary cancer",
   "date": "2026-06-02",
   "authors": "Wang Y, Zhan P.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42431109",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue",
    "hypertension"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "PARP inhibitors"
    }
   ]
  },
  {
   "id": "42438869",
   "src": "MED",
   "pmid": "42438869",
   "doi": "10.56434/j.arch.esp.urol.20267905.87",
   "title": "Androgen Deprivation Therapy and Cardiovascular Health: Challenges and Opportunities in Prostate Cancer Care.",
   "journal": "Archivos espanoles de urologia",
   "date": "2026-06-01",
   "authors": "Fernández Alonso S, López Campos F, Büchser D, Guardado S, Andreescu J, Vásquez ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42438869",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "hypertension"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42229758",
   "src": "MED",
   "pmid": "42229758",
   "doi": "10.1016/j.fjurol.2026.103139",
   "title": "Beyond GnRH analogues: The renaissance of estrogens in prostate cancer management.",
   "journal": "The French journal of urology",
   "date": "2026-06-01",
   "authors": "Matthys M, Klein C, Roumeguère T, Bladou F, Robert G, Tombal B.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42229758",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "bone mineral density"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41818713",
   "src": "MED",
   "pmid": "41818713",
   "doi": "10.1093/jjco/hyag042",
   "title": "Real-world comparison of enzalutamide and apalutamide in metastatic hormone-sensitive prostate cancer: a multi-institutional propensity score-matched analysis.",
   "journal": "Japanese journal of clinical oncology",
   "date": "2026-06-01",
   "authors": "Nishimura K, Hirosuna K, Niigawa H, Kakumae S, Morinaka H, Fukuokaya W, Yoshizaw",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41818713",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42223064",
   "src": "MED",
   "pmid": "42223064",
   "doi": "10.1056/nejmoa2604126",
   "title": "PARP and Androgen-Signaling Inhibition plus ADT in Metastatic Prostate Cancer.",
   "journal": "The New England journal of medicine",
   "date": "2026-05-30",
   "authors": "Agarwal N, Matsubara N, Azad AA, Saad F, Mateo J, Jiang S, Ye D, Voog E, Shore N",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42223064",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "PARP inhibitors"
    }
   ]
  },
  {
   "id": "42218069",
   "src": "MED",
   "pmid": "42218069",
   "doi": "10.1016/j.euf.2026.05.015",
   "title": "New Paradigms in Theranostics of Prostate Cancer: The Rise of α-Emitters and Next-generation Targets.",
   "journal": "European urology focus",
   "date": "2026-05-30",
   "authors": "Deandreis D, Deutsch E.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42218069",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42218356",
   "src": "MED",
   "pmid": "42218356",
   "doi": "10.1007/s10147-026-03061-8",
   "title": "Primary site- and metastasis-directed therapies in patients with metastatic prostate cancer: A narrative review.",
   "journal": "International journal of clinical oncology",
   "date": "2026-05-30",
   "authors": "Goto T, Mizuno K, Sumiyoshi T, Kita Y, Masui K, Ogata T, Aizawa R, Sawada A, Sai",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42218356",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42294321",
   "src": "MED",
   "pmid": "42294321",
   "doi": "10.3389/fonc.2026.1803812",
   "title": "Case Report: [225Ac]Ac-PSMA-617 therapy in a patient with metastatic castration-resistant prostate cancer (mCRPC) and intracranial meningioma.",
   "journal": "Frontiers in oncology",
   "date": "2026-05-29",
   "authors": "Musabaev I, Goryaynov S, Yu Kochetova T, Krylov V, Ivanov S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42294321",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "PPR1241752",
   "src": "PPR",
   "pmid": null,
   "doi": "10.21203/rs.3.rs-9282736/v1",
   "title": "Pharmacovigilance analysis of adverse event signals associated with radium-223 based on the FAERS database",
   "journal": null,
   "date": "2026-05-29",
   "authors": "Ling T, Zhang L, Chen X, Huang L.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1241752",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture",
    "thrombocytopenia"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42220127",
   "src": "MED",
   "pmid": "42220127",
   "doi": "10.2174/0115665232490462260522095123",
   "title": "APOL3 Orchestrates Metastasis and Enzalutamide Resistance via STAT3-DAB2IP Signaling in Prostate Cancer.",
   "journal": "Current gene therapy",
   "date": "2026-05-25",
   "authors": "Wang Q, Zuo S, Chen L, Wan F, Hong Z, Xu W, Hou W, Ye D.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42220127",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "glucocorticoid receptor"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42208277",
   "src": "MED",
   "pmid": "42208277",
   "doi": "10.1016/j.ejca.2026.116821",
   "title": "Dendrimer-nanoparticle (DEP) delivery of cabazitaxel (DEP-cabazitaxel): A first-in-human phase 1/2 trial in patients with advanced solid tumours.",
   "journal": "European journal of cancer (Oxford, England : 1990)",
   "date": "2026-05-22",
   "authors": "Jones RH, Pinato DJ, Forster MD, Joshua AM, Korolewicz J, Aboud K, Morton C, Liu",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42208277",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "peripheral neuropathy",
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42159963",
   "src": "MED",
   "pmid": "42159963",
   "doi": "10.1186/s41181-026-00456-w",
   "title": "Radiochemistry and comparative in vitro assessment of PSMA-617 labeled with lead-212 (212Pb), actinium-225 (225Ac), and lutetium-177 (177Lu).",
   "journal": "EJNMMI radiopharmacy and chemistry",
   "date": "2026-05-20",
   "authors": "Bera A, Ragland G, Zhang Y, Madel PG, B'Lanton J, Siriki A, Chen CT, Szmulewitz ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42159963",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42141162",
   "src": "MED",
   "pmid": "42141162",
   "doi": "10.1007/s10637-026-01619-x",
   "title": "A Phase I trial of the anti-IL23 monoclonal antibody tildrakizumab, in combination with abiraterone acetate, for the treatment of metastatic castration-resistant prostate cancer.",
   "journal": "Investigational new drugs",
   "date": "2026-05-16",
   "authors": "Chandran K, Guo C, Pacey S, Villacampa G, Matthews R, Prout T, Fernandes J, Turn",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42141162",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42129801",
   "src": "MED",
   "pmid": "42129801",
   "doi": "10.1186/s12943-026-02686-7",
   "title": "An orally bioavailable pan-αv/α5β1 integrin antagonist prevents aggressive prostate cancer progression via suppressing both oncogenic signals and CD47-mediated immune escape.",
   "journal": "Molecular cancer",
   "date": "2026-05-13",
   "authors": "Gu Y, Dong B, Teng X, Chen L, Yang Y, Sun X, Song S, Qian B, Sun Y, Zhang J, Zhe",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42129801",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "42127891",
   "src": "MED",
   "pmid": "42127891",
   "doi": "10.1016/j.medj.2026.101140",
   "title": "Impact of lead-in ADT on grade ≥3 neutropenia in patients with metastatic hormone-sensitive prostate cancer treated with triplet therapy.",
   "journal": "Med (New York, N.Y.)",
   "date": "2026-05-12",
   "authors": "Ni X, Zhao Y, Wang S, Zhong L, Shi X, Li X, Ma Q, Wu Y, Ye D, Zhu Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42127891",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42115448",
   "src": "MED",
   "pmid": "42115448",
   "doi": "10.1007/s00345-026-06460-8",
   "title": "Olaparib combined with abiraterone in HRR-mutated metastatic hormone-sensitive prostate cancer: a single-arm phase II trial.",
   "journal": "World journal of urology",
   "date": "2026-05-11",
   "authors": "Zhang X, Wu Z, Hao L, Qiu X, Xu L, Zhang S, Guo H, Zhuang J.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42115448",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42244988",
   "src": "MED",
   "pmid": "42244988",
   "doi": "10.7150/thno.134940",
   "title": "Therapeutic pressure drives the evolution of a protective ecotype characterized by AR-loss-induced senescence in prostate cancer.",
   "journal": "Theranostics",
   "date": "2026-05-11",
   "authors": "He L, Jiang J, Liu S, Song H, Lu T, Hu Z, Li Y, Zhu H, Zhou Y, Li Z, Yang F, Zha",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42244988",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "42114950",
   "src": "MED",
   "pmid": "42114950",
   "doi": "10.1136/jitc-2025-014242",
   "title": "Phase 2 study of talabostat, a small molecule inhibitor of dipeptidyl peptidases (DPP), administered in combination with pembrolizumab in patients with small cell neuroendocrine prostate cancer.",
   "journal": "Journal for immunotherapy of cancer",
   "date": "2026-05-11",
   "authors": "Aggarwal R, Zhang J, Monk P, Zhu X, Jones R, Linch M, Costin D, de Bono J, Karsh",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42114950",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "low tumor mutational burden"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR1187868",
   "src": "PPR",
   "pmid": null,
   "doi": "10.20944/preprints202605.0732.v1",
   "title": "Immune Checkpoint Inhibitor Resistance in Genitourinary Cancers: Mechanisms, Biomarkers, and Emerging Therapeutic Strategies",
   "journal": null,
   "date": "2026-05-11",
   "authors": "Chaux A.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1187868",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment",
    "low tumor mutational burden"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42577021",
   "src": "MED",
   "pmid": "42577021",
   "doi": "10.31662/jmaj.2026-0045",
   "title": "Triplet Therapy (Androgen Deprivation Therapy + Darolutamide + Biweekly Docetaxel) for High-risk Metastatic Castration-sensitive Prostate Cancer (TRIC Study): A Study Protocol for Open-labelled Single-Arm Phase II Clinical Trial.",
   "journal": "JMA journal",
   "date": "2026-05-08",
   "authors": "Iwamoto H, Hori T, Inaba T, Nakagawa R, Kamijima T, Kano H, Makino T, Naito R, Y",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42577021",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "pubtype",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1211161",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.05.05.722958",
   "title": "Improve the Efficacy of B7-H3-Targeting Antibody-Drug Conjugate DS-7300a in TP53-deficient Tumors by Inducing Ferroptosis",
   "journal": null,
   "date": "2026-05-08",
   "authors": "Leo J, Chen F, Shi W, Liang X, Meng C, Gu Q, Albittar Y, Fan Z, Zhang J, Gan B, ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1211161",
   "kind": "new-approach",
   "subject": "ATM",
   "matched": [
    "antibody-drug conjugate"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "ATM",
    "TP53"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "TP53"
    }
   ]
  },
  {
   "id": "42096662",
   "src": "MED",
   "pmid": "42096662",
   "doi": "10.1200/jco-25-02835",
   "title": "Multicenter, Randomized, Phase II Trial of Olaparib Plus Radium-223 Versus Radium-223 in Men With Castration-Resistant Prostate Cancer With Bone Metastases (COMRADE).",
   "journal": "Journal of clinical oncology : official journal of the American Society of Clinical Oncology",
   "date": "2026-05-07",
   "authors": "McKay RR, Xie W, Ajmera A, Araneta A, Jamieson C, Folefac E, Hussain A, Kyriakop",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42096662",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "thrombocytopenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "Radium-223"
    }
   ]
  },
  {
   "id": "42089687",
   "src": "MED",
   "pmid": "42089687",
   "doi": "10.1080/14737140.2026.2657914",
   "title": "177Lu-PSMA-617 radioligand therapy as an immune modulator in prostate cancer.",
   "journal": "Expert review of anticancer therapy",
   "date": "2026-05-07",
   "authors": "Sciortino C, Nuzzo A, Stellato M, Claps M, Rametta A, Guadalupi V, Gusmaroli E, ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42089687",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA heterogeneity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42091458",
   "src": "MED",
   "pmid": "42091458",
   "doi": "10.2169/internalmedicine.7038-25",
   "title": "Diagnostic Challenge in Treatment-Emergent Neuroendocrine Prostate Cancer: A Case Requiring Prostate Rebiopsy After an Inconclusive Metastatic Lung Biopsy.",
   "journal": "Internal medicine (Tokyo, Japan)",
   "date": "2026-05-05",
   "authors": "Nakagaki S, Ito T, Sugiura K, Suzuki H, Morishita T, Taki S, Miyazawa A, Hayashi",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42091458",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41779000",
   "src": "MED",
   "pmid": "41779000",
   "doi": "10.1158/1078-0432.ccr-25-4948",
   "title": "131I-LNTH-1095 Radioligand Therapy plus Enzalutamide versus Enzalutamide Alone in Men with PSMA-Avid Metastatic Castration-Resistant Prostate Cancer: A Phase II Study.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2026-05-01",
   "authors": "Yu EY, Narayan V, Esposito G, Szmulewitz R, Lu Y, Lilly MB, Calais J, Bratslavsk",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41779000",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42049400",
   "src": "MED",
   "pmid": "42049400",
   "doi": "10.21873/invivo.14313",
   "title": "Risk Factors and Clinical Significance of Grade ≥3 Neutropenia During the First Cycle of Cabazitaxel Therapy With Primary Pegfilgrastim Prophylaxis in Metastatic Castration-resistant Prostate Cancer.",
   "journal": "In vivo (Athens, Greece)",
   "date": "2026-05-01",
   "authors": "Sato R, Yoshimi Y, Nishio T, Matsunaga YU, Matsumoto R.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42049400",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41632522",
   "src": "MED",
   "pmid": "41632522",
   "doi": "10.1093/jjco/hyag011",
   "title": "Age-stratified clinical outcomes and adverse events in patients with metastatic castration-sensitive prostate cancer receiving triplet therapy with darolutamide, androgen deprivation therapy, and docetaxel.",
   "journal": "Japanese journal of clinical oncology",
   "date": "2026-05-01",
   "authors": "Uchimoto T, Hirosuna K, Niigawa H, Jo T, Morinaka H, Fukuokaya W, Yoshizawa A, S",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41632522",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42087269",
   "src": "MED",
   "pmid": "42087269",
   "doi": "10.1210/endocr/bqag056",
   "title": "Breaking the bonds: targeting protein dimerization for prostate cancer therapy.",
   "journal": "Endocrinology",
   "date": "2026-05-01",
   "authors": "Singh N, Heemers HV.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42087269",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1184315",
   "src": "PPR",
   "pmid": null,
   "doi": "10.21203/rs.3.rs-9419820/v1",
   "title": "Radiochemistry and Comparative In Vitro Assessment of PSMA-617 Labeled with Lead-212 (212Pb), Actinium-225 (225Ac), and Lutetium-177 (177Lu).",
   "journal": null,
   "date": "2026-04-30",
   "authors": "Bera A, Ragland G, Zhang Y, Madel PG, B'Lanton J, Siriki A, Chen C, Szmulewitz R",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1184315",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42045150",
   "src": "MED",
   "pmid": "42045150",
   "doi": "10.1038/s41392-026-02642-3",
   "title": "Drugging the intrinsically disordered transactivation domain of androgen receptor.",
   "journal": "Signal transduction and targeted therapy",
   "date": "2026-04-28",
   "authors": "Obst JK, Banuelos CA, Jian K, Tien AH, Shkrabak OA, Wang J, Mawji NR, Tam T, Vuc",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42045150",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "PPR1212977",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.04.24.720638",
   "title": "Rewiring Oncogenic Transcriptional Complexes with Domain-ALTerAtion Chimeras (DALTACs) in Prostate Cancer",
   "journal": null,
   "date": "2026-04-28",
   "authors": "Luo J, Yang J, Tien JC, Wang M, Das S, Wang X, Young E, Tošović J, Mannan R, Xia",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1212977",
   "kind": "new-approach",
   "subject": "ERG",
   "matched": [
    "first-in-class"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "ERG"
   ],
   "nodes": []
  },
  {
   "id": "42036010",
   "src": "MED",
   "pmid": "42036010",
   "doi": "10.1016/j.canlet.2026.218535",
   "title": "Canagliflozin is a novel androgen receptor pathway inhibitor for castrate-sensitive and castrate-resistant prostate cancer.",
   "journal": "Cancer letters",
   "date": "2026-04-24",
   "authors": "Ali A, Di Pastena F, Biziotis OD, Wang S, Tsakiridis EE, Del Rosso D, Fredenburg",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42036010",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42030508",
   "src": "MED",
   "pmid": "42030508",
   "doi": "10.1200/op-25-01161",
   "title": "Efficacy and Safety of 177Lu-PSMA-617 in Elderly Patients With Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "JCO oncology practice",
   "date": "2026-04-24",
   "authors": "Sentana-Lledo D, Rami A, Zhong C, Muniz M, Xie W, Tchitchkan E, Stoltenberg H, R",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42030508",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42035902",
   "src": "MED",
   "pmid": "42035902",
   "doi": "10.1016/j.bone.2026.117906",
   "title": "Multiparametric assessment of bone health in metastatic hormone-sensitive prostate cancer patients receiving androgen deprivation + enzalutamide ± zoledronic acid (BonEnza study).",
   "journal": "Bone",
   "date": "2026-04-24",
   "authors": "Caramella I, Dalla Volta A, Valcamonico F, Bergamini M, Buffoni M, Zivi A, Proco",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42035902",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "bone mineral density"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1182144",
   "src": "PPR",
   "pmid": null,
   "doi": "10.21203/rs.3.rs-9194287/v1",
   "title": "Development of a STEAP1-Targeted Prostate Cancer Specific Antibody Drug Conjugate Platform with Immunostimulatory Properties",
   "journal": null,
   "date": "2026-04-24",
   "authors": "Wang JS, Sodhi SS, Tsao L, Lin GH, Moon N, Zhang Q, Liu B, Penaranda J, Trotter ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1182144",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "radioligand"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41997904",
   "src": "MED",
   "pmid": "41997904",
   "doi": "10.1038/s41420-026-03110-1",
   "title": "Nicotinamide N-methyltransferase as a therapeutic target in taxane-resistant castration-resistant prostate cancer.",
   "journal": "Cell death discovery",
   "date": "2026-04-17",
   "authors": "Cevatemre B, Karyemez E, Bulut I, Syed H, Gönen M, Baykal AT, Bagci-Onder T, Aci",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41997904",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "42000630",
   "src": "MED",
   "pmid": "42000630",
   "doi": "10.1016/j.bbrc.2026.153767",
   "title": "Vindoline, a vinca alkaloid derived from Catharanthus roseus, targets ABCB1 to overcome docetaxel resistance in prostate cancer.",
   "journal": "Biochemical and biophysical research communications",
   "date": "2026-04-15",
   "authors": "Shao X, Lin R, Yu T, Hou X, Sun Y, Cheng W, Liu J, Feng W.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42000630",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41986660",
   "src": "MED",
   "pmid": "41986660",
   "doi": "10.1038/s41416-026-03442-w",
   "title": "SUMOylation of EphB4 enhances its stability in prostate cancer.",
   "journal": "British journal of cancer",
   "date": "2026-04-15",
   "authors": "Maharaj MSN, Mertens-Walker I, Lisle JE, Herington A, Stephens C, Chai M, Meuter",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41986660",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "novel mechanism"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "41979035",
   "src": "MED",
   "pmid": "41979035",
   "doi": "10.1080/14796694.2026.2655433",
   "title": "Saruparib in combination with androgen receptor pathway inhibitors in metastatic hormone-sensitive prostate cancer: EvoPAR-Prostate01.",
   "journal": "Future oncology (London, England)",
   "date": "2026-04-14",
   "authors": "Azad AA, Agarwal N, Armstrong AJ, Hellmis E, Sugimoto M, Ürün Y, Xing N, Aregay ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41979035",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "myelodysplastic syndrome"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41984598",
   "src": "MED",
   "pmid": "41984598",
   "doi": "10.1172/jci199838",
   "title": "Therapeutic targeting of the eIF4E cap-binding domain reveals control of lineage fate in prostate cancer.",
   "journal": "The Journal of clinical investigation",
   "date": "2026-04-14",
   "authors": "Mishra R, Song S, Choradia D, Rudoy D, Wladyka CL, Hoang P, Kim JY, Coleman IM, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41984598",
   "kind": "new-approach",
   "subject": "AR",
   "matched": [
    "first-in-class"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41973209",
   "src": "MED",
   "pmid": "41973209",
   "doi": "10.1007/s00120-026-02817-4",
   "title": "[Update of S3 guideline on metastatic prostate cancer-guideline recommendations and expert consensus].",
   "journal": "Urologie (Heidelberg, Germany)",
   "date": "2026-04-13",
   "authors": "Grimm MO, Gratzke C, Hadaschik B, Eiber M, Herrmann K, Hellmis E, Klier J, Krist",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41973209",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "42022555",
   "src": "MED",
   "pmid": "42022555",
   "doi": "10.3389/fphar.2026.1769271",
   "title": "Characteristics and therapeutic resistance mechanisms of the prostate cancer immune microenvironment: a comprehensive analysis from bench to clinic.",
   "journal": "Frontiers in pharmacology",
   "date": "2026-04-07",
   "authors": "Li J, Wang X, Tang X.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42022555",
   "kind": "new-approach",
   "subject": "CDK12",
   "matched": [
    "degrader",
    "bispecific"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "CDK12"
   ],
   "nodes": []
  },
  {
   "id": "41922546",
   "src": "MED",
   "pmid": "41922546",
   "doi": "10.1038/s41391-026-01113-8",
   "title": "Cytoplasmic versus nuclear localization of androgen receptor splice variant 7 as a predictor of benefit from androgen receptor pathway inhibitors in metastatic castration-resistant prostate cancer (PROPHECY trial).",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2026-04-02",
   "authors": "Gupta S, Guo S, Halabi S, Yu C, Kim H, McKenzie J, George DJ, Nanus DM, Szmulewi",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41922546",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41966583",
   "src": "MED",
   "pmid": "41966583",
   "doi": "10.1016/j.ejmech.2026.118824",
   "title": "Dual BRD4/AKT inhibition overcomes c-MYC-driven resistance in metastatic castration-resistant prostate cancer.",
   "journal": "European journal of medicinal chemistry",
   "date": "2026-04-02",
   "authors": "Zhang F, Guan D, Zhang W, Zhou Y, Zhou J, Zhang H, Wang H, Tian J, Yang Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41966583",
   "kind": "new-approach",
   "subject": "AKT1",
   "matched": [
    "first-in-class"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "MYC"
   ],
   "nodes": [
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "41926960",
   "src": "MED",
   "pmid": "41926960",
   "doi": "10.1016/s1470-2045(25)00762-4",
   "title": "[177Lu]-PSMA-617-PSMA-617 in oligometastatic hormone sensitive prostate cancer (BULLSEYE): an open-label, randomised, phase 2 study.",
   "journal": "The Lancet. Oncology",
   "date": "2026-04-01",
   "authors": "Privé BM, Noordzij W, Muselaers CHJ, de Jong IJ, van Oort IM, Janssen MJR, Van R",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41926960",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "dry mouth"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42199608",
   "src": "MED",
   "pmid": "42199608",
   "doi": "10.36401/jipo-25-22",
   "title": "Emerging Therapeutic Strategies in Metastatic Hormone-Sensitive Prostate Cancer.",
   "journal": "Journal of immunotherapy and precision oncology",
   "date": "2026-04-01",
   "authors": "Castro EA, Jani YC, Bilen MA.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42199608",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41926961",
   "src": "MED",
   "pmid": "41926961",
   "doi": "10.1016/s1470-2045(26)00017-3",
   "title": "[177Lu]Lu-PSMA-617 in combination with pembrolizumab for treatment of metastatic castration resistant prostate cancer (PRINCE): a single-arm, phase 1b/2 study.",
   "journal": "The Lancet. Oncology",
   "date": "2026-04-01",
   "authors": "Sandhu S, Joshua AM, Emmett L, Bressel M, Anton A, Spain L, Horvath LG, Pasam A,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41926961",
   "kind": "toxicity",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "immune-related adverse event",
    "colitis",
    "pneumonitis"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41379983",
   "src": "MED",
   "pmid": "41379983",
   "doi": "10.1158/1535-7163.mct-25-0505",
   "title": "Targeting Tumor Microenvironment-Derived NRG1-HER2/3 Signaling with Zenocutuzumab Restores Sensitivity to AR Inhibition in PTEN Wild-type Prostate Cancer.",
   "journal": "Molecular cancer therapeutics",
   "date": "2026-04-01",
   "authors": "Shinder BM, Lee YS, Mao N, Salsabeel N, Zhang Z, Kaur H, Chen X, Chang Q, de Sta",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41379983",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "bispecific"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PTEN"
   ],
   "nodes": []
  },
  {
   "id": "41988531",
   "src": "MED",
   "pmid": "41988531",
   "doi": "10.3389/fphar.2026.1769906",
   "title": "CRIP1 promotes docetaxel resistance and immune-associated cell death modulation in prostate cancer.",
   "journal": "Frontiers in pharmacology",
   "date": "2026-03-31",
   "authors": "Zhang D, Han M, Yan N, Zhang Y, Wang C, Shi W, Jia W, Cao J.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41988531",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41997765",
   "src": "MED",
   "pmid": "41997765",
   "doi": "10.1016/j.clgc.2026.102552",
   "title": "LuRa: Efficacy and Safety of Radium-223 Following [177Lu]Lu-PSMA-617 in Patients With Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Clinical genitourinary cancer",
   "date": "2026-03-27",
   "authors": "Zarka J, Juthani R, Sartor O, Muniz M, Kase AM, Riaz IB, Naqvi A, Heath E, Orme ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41997765",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture",
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41976311",
   "src": "MED",
   "pmid": "41976311",
   "doi": "10.3390/cancers18071088",
   "title": "Precision-Engineered CD3 T-Cell Engagers for Solid Tumours: Conditional Activation, Microenvironment Modulation, and Clinical Translation.",
   "journal": "Cancers",
   "date": "2026-03-27",
   "authors": "Zeyaullah M, AlShahrani AM, Khan MS, Ahmad MF, Altijani AAG, Mohamed AOA, Hummad",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41976311",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "T-cell engagers (STEAP1)"
    },
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "41972679",
   "src": "MED",
   "pmid": "41972679",
   "doi": "10.3390/cells15070588",
   "title": "PARP Inhibition in Prostate Cancer: Current Status, Resistance Mechanisms, and Clinical Challenges.",
   "journal": "Cells",
   "date": "2026-03-26",
   "authors": "Matsuoka T, Akamatsu S, Ong CJ, Gleave ME, Wang Y.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41972679",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "BRCA2"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    }
   ]
  },
  {
   "id": "41881959",
   "src": "MED",
   "pmid": "41881959",
   "doi": "10.1038/s41420-026-03068-0",
   "title": "SMARCA4 promotes lineage plasticity and enzalutamide resistance in prostate cancer by regulating PROX1 via H3K27 acetylation.",
   "journal": "Cell death discovery",
   "date": "2026-03-25",
   "authors": "Wu C, Luo M, Wu C, Yuan Y, Li Y, Liao Y, Zhang Y, Huang X, Wang M, Lv S, Wei Q.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41881959",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41877195",
   "src": "MED",
   "pmid": "41877195",
   "doi": "10.1186/s12964-026-02795-2",
   "title": "Deciphering double-negative prostate cancer: from aggressive subtype to novel therapeutic paradigms.",
   "journal": "Cell communication and signaling : CCS",
   "date": "2026-03-25",
   "authors": "Wang J, Wu R, Tuo Z, Okoli UA, Wang Z, Chaipanichkul P, Koh SB, Li D, Lyu Z, Umb",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41877195",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "degrader"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PTEN",
    "RB1",
    "MYC"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "RB1"
    },
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "41872691",
   "src": "MED",
   "pmid": "41872691",
   "doi": "10.1038/s41388-026-03723-x",
   "title": "Aryl hydrocarbon receptor is critical for both AR-dependent and AR-indifferent enzalutamide resistance in castration-resistant prostate cancer.",
   "journal": "Oncogene",
   "date": "2026-03-23",
   "authors": "Chen CH, Brown R, Vander Griend DJ, Gao AC, Wu BJ.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41872691",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "glucocorticoid receptor"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41872814",
   "src": "MED",
   "pmid": "41872814",
   "doi": "10.1186/s12885-026-15900-y",
   "title": "Beyond [177Lu]Lu-PSMA: a meta-analysis of safety and efficacy of emerging PSMA radioligand therapy agents.",
   "journal": "BMC cancer",
   "date": "2026-03-23",
   "authors": "Abdlkadir AS, Al-Adhami D, Moghrabi S, Sathekge MM, Kreissl M, Estrada-Lobato E,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41872814",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "42368572",
   "src": "MED",
   "pmid": "42368572",
   "doi": "10.1016/j.apsb.2026.03.029",
   "title": "RAD51-targeting small molecule degrader sensitizes BRCA-proficient prostate cancer cells to PARP inhibitors via synthetic lethality.",
   "journal": "Acta pharmaceutica Sinica. B",
   "date": "2026-03-19",
   "authors": "Jian Y, Gao Y, Zhou T, Xu S, Wang B, Fan Y, Ma J, Gao Y, Liu J, Ma B, Li L.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/42368572",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "41850431",
   "src": "MED",
   "pmid": "41850431",
   "doi": "10.1016/j.remnie.2026.500306",
   "title": "Renal and Hematologic Toxicity Profile of [177] Lu-labeled PSMA-targeted radioligand-therapy (177Lu-PSMA-RLT): A Retrospective Cohort Study.",
   "journal": "Revista espanola de medicina nuclear e imagen molecular",
   "date": "2026-03-16",
   "authors": "Yalçınkaya M, Demir F, Karaçavuş S, Demir M.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41850431",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41834128",
   "src": "MED",
   "pmid": "41834128",
   "doi": "10.1093/gpbjnl/qzag024",
   "title": "Granulin+ Macrophages Promote Lineage Plasticity in Prostate Cancer Through Paracrine Signaling Loops.",
   "journal": "Genomics, proteomics & bioinformatics",
   "date": "2026-03-15",
   "authors": "Zhu Z, Zhang M, Song Y, Jiang W, Cao F, Yao Y, Yu X, Zhao H, Baiyin H, Chang, Wu",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41834128",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41845983",
   "src": "MED",
   "pmid": "41845983",
   "doi": "10.1016/j.critrevonc.2026.105283",
   "title": "From cold to hot: A 'Prime, Activate, Sustain' framework for precision remodeling of the tumor microenvironment in prostate cancer.",
   "journal": "Critical reviews in oncology/hematology",
   "date": "2026-03-15",
   "authors": "Li H, Liao K, Zhang M.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41845983",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-crpc",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "AR"
    }
   ]
  },
  {
   "id": "41817839",
   "src": "MED",
   "pmid": "41817839",
   "doi": "10.1007/s40271-026-00811-8",
   "title": "Stated Preferences for Systemic Treatments for Prostate Cancer: A Targeted Review of the Discrete-Choice Experiment Literature.",
   "journal": "The patient",
   "date": "2026-03-12",
   "authors": "Agarwal N, Hauber B, Hong A, Coulter J, Russell D, Ryan M, Darnell S, Watson V, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41817839",
   "kind": "toxicity",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "cardiovascular"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41883973",
   "src": "MED",
   "pmid": "41883973",
   "doi": "10.3389/fonc.2026.1744007",
   "title": "Actinium-225-PSMA versus lutetium-177-PSMA radioligand therapy for metastatic castration-resistant prostate cancer: results of an observational study.",
   "journal": "Frontiers in oncology",
   "date": "2026-03-10",
   "authors": "Kochetova TY, Potievskiy MB, Nekrasova LA, Krylov VV, Shegai PV, Ivanov SA, Kapr",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41883973",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41945087",
   "src": "MED",
   "pmid": "41945087",
   "doi": "10.1016/j.clgc.2026.102536",
   "title": "Advances in Androgen Deprivation Therapy-Sparing Strategies: Ongoing Studies in Metastatic Castration-Sensitive Prostate Cancer.",
   "journal": "Clinical genitourinary cancer",
   "date": "2026-03-09",
   "authors": "Morgans AK, Sentana-Lledo D, Wildgust M, Santos AD.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41945087",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41787526",
   "src": "MED",
   "pmid": "41787526",
   "doi": "10.1186/s12943-026-02602-z",
   "title": "KDM5B-driven glucose metabolic reprogramming promotes enzalutamide resistance in prostate cancer via the lactate/hnRNPA1 lactylation/AR-V7 axis.",
   "journal": "Molecular cancer",
   "date": "2026-03-05",
   "authors": "Sun R, Huang Y, He H, Li Q, Wang L, Zhang G, Wei Z, Cao Y, Li J, Wang X, Yang F,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41787526",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41773644",
   "src": "MED",
   "pmid": "41773644",
   "doi": "10.1002/pros.70152",
   "title": "Defining Favorable Prognosis in Bone Metastatic Hormone-Sensitive Prostate Cancer Treated With Androgen Receptor Signaling Inhibitors.",
   "journal": "The Prostate",
   "date": "2026-03-03",
   "authors": "Koguchi D, Tsumura H, Tabata KI, Satoh T, Mori K, Hirano S, Ikeda M, Kurosaka S,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41773644",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41774055",
   "src": "MED",
   "pmid": "41774055",
   "doi": "10.4103/aja202598",
   "title": "Real-world effectiveness and safety of radium-223 therapy in castration-resistant prostate cancer with bone metastases.",
   "journal": "Asian journal of andrology",
   "date": "2026-03-03",
   "authors": "Wang HK, Hang Z, Liu C, Dai B, Zhu Y, Qin XJ, Lin GW, Deng YB, Jiang HX, Wang Y,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41774055",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41765957",
   "src": "MED",
   "pmid": "41765957",
   "doi": "10.1007/s00259-026-07817-2",
   "title": "[177Lu]Lu-PSMA radioligand therapy in younger prostate cancer patients: A matched-pair analysis between patients ≤ 65 and ≥ 70 years old.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2026-03-02",
   "authors": "Hornfeck J, Dahlmann PJ, Siegmund SC, Gildehaus FJ, Delker A, Schmidt-Hegemann N",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41765957",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41778249",
   "src": "MED",
   "pmid": "41778249",
   "doi": "10.21873/cdp.10529",
   "title": "Real-world Treatment Selection and Shared Decision-making in De Novo Metastatic Castration-sensitive Prostate Cancer in Japan.",
   "journal": "Cancer diagnosis & prognosis",
   "date": "2026-03-01",
   "authors": "Furubayashi N, Tsujita J, Takayama A, Shiraishi Y, Nakamura M, Negishi T.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41778249",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "peripheral neuropathy",
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41770148",
   "src": "MED",
   "pmid": "41770148",
   "doi": "10.1097/jxx.0000000000001240",
   "title": "Metastatic prostate cancer in the genomic era: Guideline-concordant strategies for diagnosis, treatment, and survivorship.",
   "journal": "Journal of the American Association of Nurse Practitioners",
   "date": "2026-03-01",
   "authors": "Connors LM.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41770148",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "41889024",
   "src": "MED",
   "pmid": "41889024",
   "doi": "10.1080/14656566.2026.2652456",
   "title": "Evaluation of novel treatments for metastatic castration-resistant prostate cancer.",
   "journal": "Expert opinion on pharmacotherapy",
   "date": "2026-03-01",
   "authors": "Güner G, Arslan C.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41889024",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "antibody-drug conjugate",
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PTEN"
   ],
   "nodes": []
  },
  {
   "id": "41668284",
   "src": "MED",
   "pmid": "41668284",
   "doi": "10.1093/toxsci/kfag015",
   "title": "Characterization of an anti-STEAP1 T-cell dependent bispecific antibody for the treatment of prostate cancer and associated toxicity in cynomolgus monkeys.",
   "journal": "Toxicological sciences : an official journal of the Society of Toxicology",
   "date": "2026-03-01",
   "authors": "Tonkin EG, Lepherd M, Davies J, Gampa G, Hötzel I, Koeppen H, Liu W, Melnikov F,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41668284",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41760602",
   "src": "MED",
   "pmid": "41760602",
   "doi": "10.1038/s41419-026-08511-9",
   "title": "UHRF1 regulates AR ubiquitination to promote the loss of AR signaling and enzalutamide resistance in progression of prostate cancer.",
   "journal": "Cell death & disease",
   "date": "2026-02-27",
   "authors": "Zhang Y, Yu Z, Li Y, Luo M, Hou W, Li S, He J, Lv S, Wei Q, Hu H.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41760602",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41773084",
   "src": "MED",
   "pmid": "41773084",
   "doi": "10.37349/etat.2026.1002360",
   "title": "Comparison of weekly docetaxel regimens in prostate cancer: a systematic review and frequentist network meta-analysis.",
   "journal": "Exploration of targeted anti-tumor therapy",
   "date": "2026-02-27",
   "authors": "Rath S, Sajjad F, Rehman KA, Bacha Z, Saleh AO, Hayat U, Alam U, Ullah W, Brohi ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41773084",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41742135",
   "src": "MED",
   "pmid": "41742135",
   "doi": "10.1186/s12885-026-15792-y",
   "title": "Inhibition of nuclear import suppresses androgen receptor action and overcomes resistance in prostate cancer.",
   "journal": "BMC cancer",
   "date": "2026-02-25",
   "authors": "Wang X, Xu X, Fang S, Shi X, Yang Y.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41742135",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7",
    "AR splice variant"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "42569093",
   "src": "MED",
   "pmid": "42569093",
   "doi": "10.1155/aiu/2359934",
   "title": "Real-World Outcomes of Combination Therapy With Radium-223 and Enzalutamide Compared With Enzalutamide Alone in Patients With Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Advances in urology",
   "date": "2026-02-25",
   "authors": "Hata K, Goto Y, Hashimoto M, Takahashi Y, Takiguchi Y, Saito S, Iwamoto Y, Enei ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42569093",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41743623",
   "src": "MED",
   "pmid": "41743623",
   "doi": "10.34133/research.1128",
   "title": "Intratumoral Androgens and Genetic Variants Driving Therapy Resistance in Prostate Cancer.",
   "journal": "Research (Washington, D.C.)",
   "date": "2026-02-24",
   "authors": "Ye J, Xie Y, Wang J, Wu R, Li D, Yoo KH, Wusiman D, Cho WC, Lyu Z, Feng D.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41743623",
   "kind": "resistance",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "androgen synthesis"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41732008",
   "src": "MED",
   "pmid": "41732008",
   "doi": "10.1080/14796694.2025.2595914",
   "title": "Steroidogenesis inhibitor opevesostat (MK-5684) for metastatic castration-resistant prostate cancer: OMAHA-003 and OMAHA-004 trial designs.",
   "journal": "Future oncology (London, England)",
   "date": "2026-02-23",
   "authors": "Yu EY, Gratzke C, Burotto M, Zhang AY, Lévesque E, Ortega F, Peer A, Vile D, Che",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41732008",
   "kind": "resistance",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "steroidogenesis"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41749900",
   "src": "MED",
   "pmid": "41749900",
   "doi": "10.3390/cancers18040648",
   "title": "Chemotherapy-Forward Management of Advanced Prostate Cancer: Taxane Timing, Sequencing and the Real-World Place of Immunotherapy.",
   "journal": "Cancers",
   "date": "2026-02-17",
   "authors": "Noro T, Utsumi T, Ikeda R, Ishitsuka N, Suzuki Y, Iijima S, Sugizaki Y, Somoto T",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41749900",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41690905",
   "src": "MED",
   "pmid": "41690905",
   "doi": "10.1038/s41467-026-69556-0",
   "title": "FOXJ1 mediates taxane resistance through regulation of microtubule dynamics.",
   "journal": "Nature communications",
   "date": "2026-02-14",
   "authors": "Xie F, Gjyrezi A, Fein D, Labaf M, Poluben L, Ersoy-Fazlioglu B, Dennehy CM, Voz",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41690905",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41766852",
   "src": "MED",
   "pmid": "41766852",
   "doi": "10.3389/fimmu.2026.1753718",
   "title": "Clinically oriented immune heterogeneity in prostate cancer: emerging targets and strategies.",
   "journal": "Frontiers in immunology",
   "date": "2026-02-12",
   "authors": "Zhan M, Zhao B, Wu J, Li K, Chen Y, Chen H, Zhao L, Zhu J.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41766852",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific",
    "CAR-T"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41663653",
   "src": "MED",
   "pmid": "41663653",
   "doi": "10.1038/s41585-026-01129-8",
   "title": "ADT and activation of HGF and WNT axes in double-null prostate cancer.",
   "journal": "Nature reviews. Urology",
   "date": "2026-02-09",
   "authors": "Leung DHL, Adzavon YM, Chu G, Park TJ, Nikias K, Kim CW, Liu C, Sun Z.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41663653",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "lineage plasticity"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41666761",
   "src": "MED",
   "pmid": "41666761",
   "doi": "10.1016/j.ejmech.2026.118617",
   "title": "Structural optimization of AR and AR-V7 degraders incorporating silicon-based hydrophobic tags for treatment of castration-resistant prostate cancer.",
   "journal": "European journal of medicinal chemistry",
   "date": "2026-02-09",
   "authors": "Xu L, Wang M, Cheng Y, Kuang H, Zhu Y, Liu N, Wang Q, Li S, Wang J, Wang J, Huan",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41666761",
   "kind": "resistance",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "AR-V7"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41650352",
   "src": "MED",
   "pmid": "41650352",
   "doi": "10.1021/acs.jmedchem.5c03168",
   "title": "Discovery of Novel CBP/p300 and BRD4 Dual-Target PROTACs with Potent Antitumor Activity in Prostate Cancer.",
   "journal": "Journal of medicinal chemistry",
   "date": "2026-02-06",
   "authors": "Zhang YZ, Zhu HJ, Zhou XX, Li SJ, Han D, Liu FX, Zhou HM, Jiang XY, Guan YY, Ren",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41650352",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "41617441",
   "src": "MED",
   "pmid": "41617441",
   "doi": "10.21873/anticanres.18013",
   "title": "Prolonged Castration Prior to Docetaxel Reduces Febrile Neutropenia in Patients With Metastatic Hormone-sensitive Prostate Cancer Receiving Triple Therapy.",
   "journal": "Anticancer research",
   "date": "2026-02-01",
   "authors": "Yamada Y, Shirafuji T, Sato K, Tsujino T, Yamamoto S, Arai T, Sato H, Higuchi K,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41617441",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41628742",
   "src": "MED",
   "pmid": "41628742",
   "doi": "10.1016/j.bmcl.2026.130567",
   "title": "Design, synthesis, and biological evaluation of cytochrome P450 CYP11A1 inhibitors.",
   "journal": "Bioorganic & medicinal chemistry letters",
   "date": "2026-01-31",
   "authors": "Wang D, Cui S, Yuan J, Li Y, Zhang Y, Zhang Y, Fan W, Tang C.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41628742",
   "kind": "resistance",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "androgen synthesis"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41655462",
   "src": "MED",
   "pmid": "41655462",
   "doi": "10.1016/j.ejca.2026.116264",
   "title": "Use of concomitant G-CSF in maintaining efficacious dose and safe delivery of docetaxel in combination with darolutamide in ARASENS: A phase III study.",
   "journal": "European journal of cancer (Oxford, England : 1990)",
   "date": "2026-01-30",
   "authors": "Ong M, Suzuki H, Smith M, Tombal B, Hussain M, Saad F, Fizazi K, Verholen F, Pha",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41655462",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia",
    "febrile neutropenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41604536",
   "src": "MED",
   "pmid": "41604536",
   "doi": "10.1097/js9.0000000000004227",
   "title": "Myeloid-derived suppressor cells promote therapy-induced resistance in prostate cancer.",
   "journal": "International journal of surgery (London, England)",
   "date": "2026-01-28",
   "authors": "Liu A, Song P, Liu Z, Colucci M, Lai P, Yang L, Yan X, Qiu H, Dong Q.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41604536",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41553971",
   "src": "MED",
   "pmid": "41553971",
   "doi": "10.1159/000550580",
   "title": "Extended versus Standard Docetaxel in Metastatic Hormone-Sensitive Prostate Cancer: A Real-World Cohort Study.",
   "journal": "Urologia internationalis",
   "date": "2026-01-19",
   "authors": "Aydogdu C, Urban F, Berg E, Götz M, Rodler S, Brinkmann I, Enzinger B, Semmler M",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41553971",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "peripheral neuropathy"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR1225708",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.01.18.700172",
   "title": "Cytoplasmic FKBP7 reflux sustains NFE2L1 levels in an adaptive response to chemotherapy in prostate cancer cells",
   "journal": null,
   "date": "2026-01-19",
   "authors": "DRENO L, OUSALEM F, ALBORNOZ-LOAIZA A, CELIK B, TIRABOSCHI C, CLAPS G, AL-NAKOUZ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1225708",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41544173",
   "src": "MED",
   "pmid": "41544173",
   "doi": "10.1126/sciadv.ady5324",
   "title": "Lactate derived from cancer-associated fibroblasts promotes alternative splicing and castration resistance in prostate cancer.",
   "journal": "Science advances",
   "date": "2026-01-16",
   "authors": "Zhao D, Mo Z, Zhang T, Cai X, Yang Z, Chen D, Zhao J, Li Y, Zhou F, Li Z, Li Y, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41544173",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41530551",
   "src": "MED",
   "pmid": "41530551",
   "doi": "10.1007/s00259-025-07744-8",
   "title": "Systematic evaluation of response and adverse events in mCRPC patients treated with different combinations of [225Ac]Ac/[177Lu]Lu-PSMA-therapy.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2026-01-14",
   "authors": "Sheikh GT, Siegmund SC, Widjaja L, Takayama Fouladgar SL, Delker A, Casuscelli J",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41530551",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia",
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41598623",
   "src": "MED",
   "pmid": "41598623",
   "doi": "10.3390/jcm15020685",
   "title": "Emerging Therapeutic Strategies in Prostate Cancer: Targeted Approaches Using PARP Inhibition, PSMA-Directed Therapy, and Androgen Receptor Blockade with Olaparib, Lutetium (177Lu)Vipivotide Tetraxetan, and Abiraterone.",
   "journal": "Journal of clinical medicine",
   "date": "2026-01-14",
   "authors": "Kawczak P, Bączek T.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41598623",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "PPR1269979",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2026.01.10.26343859",
   "title": "The temporal dynamics of the immune response to neoadjuvant androgen deprivation therapy suggests a window-of-opportunity for checkpoint inhibitor therapy in prostate cancer",
   "journal": null,
   "date": "2026-01-13",
   "authors": "Jamroze A, Zhang R, Ahuja K, Deng L, Jatwani K, Nguyen U, Farmer B, James G, Mas",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1269979",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "immune cold"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41561751",
   "src": "MED",
   "pmid": "41561751",
   "doi": "10.3389/fonc.2025.1716931",
   "title": "Fracture risk and survival outcomes of radium-223 therapy for bone metastases in mCRPC and the modulatory role of bone-protective therapy: a systematic review and meta-analysis.",
   "journal": "Frontiers in oncology",
   "date": "2026-01-05",
   "authors": "Xiao M, Liu F, Duan H.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41561751",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41538264",
   "src": "MED",
   "pmid": "41538264",
   "doi": "10.1002/cam4.71489",
   "title": "Emergence of BRCA Reversion Mutations in Prostate Cancer Prior to PARP Inhibitor Exposure: Clinical and Therapeutic Implications.",
   "journal": "Cancer medicine",
   "date": "2026-01-01",
   "authors": "Lin DI, Lawrence E, Danziger N, Ye H, Decker B, Gjoerup O, Graf RP, Ross JS, Hua",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41538264",
   "kind": "resistance",
   "subject": "PARP inhibitors",
   "matched": [
    "BRCA reversion",
    "reversion mutation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41540521",
   "src": "MED",
   "pmid": "41540521",
   "doi": "10.2174/0115672018415982251117074725",
   "title": "Hyaluronic Acid-Modified Nanoparticles Loaded with Cabazitaxel: A Promising Nanomedicine for Malignant Prostate Tumors.",
   "journal": "Current drug delivery",
   "date": "2026-01-01",
   "authors": "Qu N, Ji Y, Zhang M, Li Z, Li Z, Chen L.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41540521",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41449150",
   "src": "MED",
   "pmid": "41449150",
   "doi": "10.1016/s1470-2045(25)00566-2",
   "title": "Nivolumab plus docetaxel versus placebo plus docetaxel for androgen receptor pathway inhibitor-pretreated and chemotherapy-naive metastatic castration-resistant prostate cancer (CheckMate 7DX): a double-blind, randomised, phase 3 trial.",
   "journal": "The Lancet. Oncology",
   "date": "2026-01-01",
   "authors": "Fizazi K, Saad F, Alonso-Gordoa T, Żurawski B, Barthélémy P, Voog E, Javier Cutu",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41449150",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "Checkpoint inhibitors"
    }
   ]
  },
  {
   "id": "41503910",
   "src": "MED",
   "pmid": "41503910",
   "doi": "10.2174/0118715206405420251117053720",
   "title": "CD24 and Mutant p53: Emerging Therapeutic Targets in Prostate Cancer Progression.",
   "journal": "Anti-cancer agents in medicinal chemistry",
   "date": "2026-01-01",
   "authors": "Qinzhamusu Y, Xintian L, Zhihao G, Tiezheng H, Ming Z, Ruishi X, Yi G, Yong W.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41503910",
   "kind": "new-approach",
   "subject": "TP53",
   "matched": [
    "CAR-T"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TP53"
   ],
   "nodes": []
  },
  {
   "id": "42683068",
   "src": "MED",
   "pmid": "42683068",
   "doi": "10.22038/ijbms.2026.92122.19891",
   "title": "Comparative analysis of second and third-generation nanobody-based CAR-NK cells targeting PSMA in prostate cancer immunotherapy: In silico and in vitro studies.",
   "journal": "Iranian journal of basic medical sciences",
   "date": "2026-01-01",
   "authors": "Gandomkar Ghalhar M, Karami Vandishi A, Ramazani A, Hajari Taheri F, Sharifzadeh",
   "oa": true,
   "url": "https://europepmc.org/article/MED/42683068",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "CAR T"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "41532714",
   "src": "MED",
   "pmid": "41532714",
   "doi": "10.1002/cbic.202500914",
   "title": "Systematic Characterization of Cancer-Associated SPOP Mutants Reveals Novel and Reprogrammable Degradative Activities.",
   "journal": "Chembiochem : a European journal of chemical biology",
   "date": "2026-01-01",
   "authors": "Caldwell AG, Parmar H, Jin X, Zhou C, Zhang X.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41532714",
   "kind": "new-approach",
   "subject": "SPOP",
   "matched": [
    "targeted protein degradation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "SPOP"
   ],
   "nodes": []
  },
  {
   "id": "41474760",
   "src": "MED",
   "pmid": "41474760",
   "doi": "10.1097/rlu.0000000000006293",
   "title": "Imaging Discordance Between [⁶⁸Ga]-PSMA PET and [¹⁷⁷Lu]-PSMA SPECT in mCRPC.",
   "journal": "Clinical nuclear medicine",
   "date": "2025-12-30",
   "authors": "Küçüker C, Kaya G, Ergün EL, Uğur Ö, Tuncel M.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41474760",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41595588",
   "src": "MED",
   "pmid": "41595588",
   "doi": "10.3390/biomedicines14010052",
   "title": "Precision Medicine in Prostate Cancer with a Focus on Emerging Therapeutic Strategies.",
   "journal": "Biomedicines",
   "date": "2025-12-25",
   "authors": "Watanabe R, Miura N, Kikugawa T, Saika T.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41595588",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1",
    "BRCA2",
    "ATM",
    "CDK12",
    "PTEN",
    "SPOP"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "ATM"
    },
    {
     "kind": "new-approach",
     "subject": "CDK12"
    },
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "SPOP"
    }
   ]
  },
  {
   "id": "41444470",
   "src": "MED",
   "pmid": "41444470",
   "doi": "10.1038/s41391-025-01066-4",
   "title": "Systematic profiling of tumor-associated antigen expression for antibody-drug conjugate in prostate cancer.",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2025-12-24",
   "authors": "Mulati Y, Shen Q, Chen Y, Tian Y, Yao K, Yu W, Cui Y, Shi X, Pang X, Chang D, He",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41444470",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "antibody-drug conjugate"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41422640",
   "src": "MED",
   "pmid": "41422640",
   "doi": "10.1016/j.compbiomed.2025.111388",
   "title": "Patient-derived geometry-integrated multiphysics framework: Computational optimization of immunotherapeutic nanoparticle delivery via tumor microenvironment reprogramming in prostate cancer.",
   "journal": "Computers in biology and medicine",
   "date": "2025-12-20",
   "authors": "Mirala F, Soltani M.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41422640",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41413907",
   "src": "MED",
   "pmid": "41413907",
   "doi": "10.1186/s12964-025-02594-1",
   "title": "Menin-driven mTOR signaling sustains taxane resistance in CRPC and reveals a targetable vulnerability for combination therapy.",
   "journal": "Cell communication and signaling : CCS",
   "date": "2025-12-18",
   "authors": "Bulut I, Cevatemre B, Yuksel-Catal N, Syed H, Onder T, Acilan C.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41413907",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41387022",
   "src": "MED",
   "pmid": "41387022",
   "doi": "10.1016/j.euf.2025.12.001",
   "title": "Impact of Metastatic Hormone-sensitive Prostate Cancer Treatments on Health-related Quality of Life: A Systematic Review and Network Meta-analysis.",
   "journal": "European urology focus",
   "date": "2025-12-11",
   "authors": "van Elst T, Lopez P, Buffart LM, Custers JAE, Wever L, de Bie JC, Mulders PFA, B",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41387022",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "PPR1232049",
   "src": "PPR",
   "pmid": null,
   "doi": "10.64898/2025.12.08.693072",
   "title": "Armoring STEAP1 CAR T cells with IL-18 potentiates antitumor activity in Ewing sarcoma",
   "journal": null,
   "date": "2025-12-11",
   "authors": "Bhatia V, Tsao A, Chong T, Challita PP, Liang K, Sayar E, Huang J, Lawlor ER, Ha",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1232049",
   "kind": "resistance",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "antigen loss"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "41364813",
   "src": "MED",
   "pmid": "41364813",
   "doi": "10.1097/ju.0000000000004890",
   "title": "Treatment of High-Risk Biochemically Recurrent Prostate Cancer With Enzalutamide in Combination With Leuprolide: Secondary End Points From the EMBARK Trial.",
   "journal": "The Journal of urology",
   "date": "2025-12-09",
   "authors": "Shore ND, Gleave M, De Giorgi U, Rannikko A, Pieczonka CM, Sridharan S, Brasso K",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41364813",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41353294",
   "src": "MED",
   "pmid": "41353294",
   "doi": "10.1007/s11255-025-04943-y",
   "title": "Androgen deprivation therapy with apalutamide in the treatment of metastatic castration-sensitive prostate cancer: the systematic review of its effectiveness and applicability for Asian men in the targeted investigational treatment analysis of novel anti-androgen (TITAN) trial.",
   "journal": "International urology and nephrology",
   "date": "2025-12-06",
   "authors": "Yang F, Feng L, Liu W, Liang S.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41353294",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41373813",
   "src": "MED",
   "pmid": "41373813",
   "doi": "10.3390/ijms262311665",
   "title": "Therapeutic Advances in Metastatic Prostate Cancer: A Journey from Standard of Care to New Emerging Treatment.",
   "journal": "International journal of molecular sciences",
   "date": "2025-12-02",
   "authors": "Cicchetti R, Basconi M, Litterio G, Orsini A, Mascitti M, Digiacomo A, Salzano G",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41373813",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "PTEN",
    "TP53"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    }
   ]
  },
  {
   "id": "41397370",
   "src": "MED",
   "pmid": "41397370",
   "doi": "10.5489/cuaj.9401",
   "title": "Expert opinion on the management of anemia in prostate cancer patients receiving PARP inhibitors.",
   "journal": "Canadian Urological Association journal = Journal de l'Association des urologues du Canada",
   "date": "2025-12-01",
   "authors": "Hanna L, O'Dwyer R, Hamilou Z, Noonan K, Doucette S, Sridhar SS.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41397370",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41231232",
   "src": "MED",
   "pmid": "41231232",
   "doi": "10.1158/2767-9764.crc-25-0651",
   "title": "BrUOG360: A Phase Ib/II Study of Copanlisib in Combination with Rucaparib in Patients with Metastatic Castration-Resistant Prostate Cancer (mCRPC).",
   "journal": "Cancer research communications",
   "date": "2025-12-01",
   "authors": "De Souza AL, Hadfield MJ, Lu S, Golijanin DJ, Wood R, Margolis J, Anderson K, Ol",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41231232",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41081632",
   "src": "MED",
   "pmid": "41081632",
   "doi": "10.1158/1078-0432.ccr-25-2121",
   "title": "Liquid Biopsy Identifies Taxane Resistance and Clonal Selection in Castration-Resistant Prostate Cancer.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2025-12-01",
   "authors": "Brighi N, Wetterskog D, Vainauskas O, Orlando F, Ciani Y, Gurioli G, Conteduca V",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41081632",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41423433",
   "src": "MED",
   "pmid": "41423433",
   "doi": "10.1002/cam4.71406",
   "title": "Integrating NLP to Enhance Algorithmic Identification of Metastatic and Castration-Resistant Prostate Cancer in Large Claims-Based Studies.",
   "journal": "Cancer medicine",
   "date": "2025-12-01",
   "authors": "Stock SR, Parrish JA, Burns MT, Janes JL, Waller J, De Hoedt AM, Ghate S, Kim J,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41423433",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41318731",
   "src": "MED",
   "pmid": "41318731",
   "doi": "10.1038/s41598-025-29785-7",
   "title": "Cytotoxicity and cell cycle changes in prostate cancer cells with differing PSMA expression and p53 status after treatment with PSMA-targeting radioligand [212Pb]Pb-AB001.",
   "journal": "Scientific reports",
   "date": "2025-11-29",
   "authors": "Stenberg VY, Liukaityte R, Kristiansen SK, Wangen-Riise R, Kleinauskas A, Dunne ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41318731",
   "kind": "new-approach",
   "subject": "TP53",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TP53"
   ],
   "nodes": []
  },
  {
   "id": "41309998",
   "src": "MED",
   "pmid": "41309998",
   "doi": "10.1007/s00259-025-07682-5",
   "title": "Comparison of mCRPC [177Lu]Lu-PSMA-617 radioligand therapy with and without concurrent enzalutamide medication in a real-world setting.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2025-11-28",
   "authors": "Rosar F, Khreish F, Burgard C, Fursov A, Blickle A, Bartholomä M, Maus S, Bastia",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41309998",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia",
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41330005",
   "src": "MED",
   "pmid": "41330005",
   "doi": "10.1016/j.ctrv.2025.103061",
   "title": "Cellular senescence: A novel mechanism of therapeutic resistance in prostate cancer.",
   "journal": "Cancer treatment reviews",
   "date": "2025-11-28",
   "authors": "Lin C, Hadfield MJ, Rathore A, Pinho-Schwermann M, Zhang S, Lu S, Hollander PD, ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41330005",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41316348",
   "src": "MED",
   "pmid": "41316348",
   "doi": "10.1186/s12957-025-04096-3",
   "title": "Pathological complete response to pembrolizumab in recurrent retroperitoneal dedifferentiated liposarcoma with high tumor mutational burden: a case report.",
   "journal": "World journal of surgical oncology",
   "date": "2025-11-28",
   "authors": "Abe S, Zhou Q, Ariizumi T, Sugai M, Kawachi Y, Ando T, Hirose Y, Ishikawa H, Miu",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41316348",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41456466",
   "src": "MED",
   "pmid": "41456466",
   "doi": "10.1016/j.clgc.2025.102476",
   "title": "Real-World Treatment Outcomes in Patients With Ga68-PSMA-PET Positive Metastatic Hormone-Sensitive Prostate Cancer With or Without Conventional Imaging Correlates.",
   "journal": "Clinical genitourinary cancer",
   "date": "2025-11-25",
   "authors": "Issa W, Aliru M, Zhang S, Gunenc D, Jiang C, Qin Q, Cole S, Arafat W, Wang J, Ya",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41456466",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1124564",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2025.11.21.689851",
   "title": "Systematic characterization of cancer-associated SPOP mutants reveals novel and reprogrammable degradative activities",
   "journal": null,
   "date": "2025-11-23",
   "authors": "Caldwell AG, Parmar H, Jin X, Zhou C, Zhang X.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1124564",
   "kind": "new-approach",
   "subject": "SPOP",
   "matched": [
    "targeted protein degradation"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "SPOP"
   ],
   "nodes": []
  },
  {
   "id": "PPR1122023",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2025.11.18.689150",
   "title": "CDH3 as a Novel Therapeutic Target in Basal-like Double-Negative Prostate Cancer",
   "journal": null,
   "date": "2025-11-19",
   "authors": "Liu G, Wang S, Duong L, Zeng Z, Yang J, Zhao Y, Rahmy S, Feng S, Arce A, Jia L, ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1122023",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "CAR T",
    "antibody-drug conjugate"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "PTEN"
   ],
   "nodes": []
  },
  {
   "id": "41249719",
   "src": "MED",
   "pmid": "41249719",
   "doi": "10.1007/s00259-025-07627-y",
   "title": "Therapeutic outcomes of ²²⁵Ac/¹⁷⁷Lu-PSMA combination therapy in advanced metastatic Castration-Resistant prostate cancer: A systematic review and Meta-Analysis.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2025-11-18",
   "authors": "Belabaci Z, Brignoli G, Zilli T, Grujić M, Mohamad I, Al-Ibraheem A, Shelan M, A",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41249719",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia",
    "thrombocytopenia"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41252201",
   "src": "MED",
   "pmid": "41252201",
   "doi": "10.1172/jci195840",
   "title": "EZH2 crosstalk with RNA methylation promotes prostate cancer progression through modulation of m6A autoregulation pathway.",
   "journal": "The Journal of clinical investigation",
   "date": "2025-11-18",
   "authors": "Yi Y, Fry J, Yum C, Wang R, Wu S, Narayan S, Liu Q, Zhang X, Oo HZ, Xie N, Li Y,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41252201",
   "kind": "new-approach",
   "subject": "FOXA1",
   "matched": [
    "degrader"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOXA1"
   ],
   "nodes": []
  },
  {
   "id": "41236620",
   "src": "MED",
   "pmid": "41236620",
   "doi": "10.1007/s00345-025-06075-5",
   "title": "Bispecific antibodies in metastatic castration-resistant prostate cancer: therapeutic strategies and frontier advances.",
   "journal": "World journal of urology",
   "date": "2025-11-14",
   "authors": "He JW, Li PZ, Huang ZX.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41236620",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "41217772",
   "src": "MED",
   "pmid": "41217772",
   "doi": "10.1177/10781552251392083",
   "title": "Lutetium Lu 177 vipivotide tetraxetan: A literature review.",
   "journal": "Journal of oncology pharmacy practice : official publication of the International Society of Oncology Pharmacy Practitioners",
   "date": "2025-11-11",
   "authors": "Morrison G, Holle LM.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41217772",
   "kind": "toxicity",
   "subject": "AR pathway inhibitors (abiraterone, enzalutamide)",
   "matched": [
    "fatigue"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AR",
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12",
    "TUBB",
    "PTEN",
    "MYC"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno",
    "state-metastatic",
    "state-hspc",
    "state-confined"
   ]
  },
  {
   "id": "41219112",
   "src": "MED",
   "pmid": "41219112",
   "doi": "10.1016/j.euo.2025.10.011",
   "title": "PARP Inhibitors in Metastatic Castration-resistant Prostate Cancer: Rationale, Mechanisms, and Clinical Applications.",
   "journal": "European urology oncology",
   "date": "2025-11-11",
   "authors": "Oudard S, Timsit MO, Maillet D, Mouillet G, Campedel L, Colomba E, Dourthe LM, E",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41219112",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "CDK12",
    "PALB2"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "CDK12"
    },
    {
     "kind": "new-approach",
     "subject": "PALB2"
    }
   ]
  },
  {
   "id": "41496857",
   "src": "MED",
   "pmid": "41496857",
   "doi": "10.55730/1300-0152.2778",
   "title": "Identification of epigenetic monotherapy candidates in taxane-resistant CRPC.",
   "journal": "Turkish journal of biology = Turk biyoloji dergisi",
   "date": "2025-11-05",
   "authors": "Cevatemre B, Bulut İ, Karyemez E, Açilan C.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41496857",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41186991",
   "src": "MED",
   "pmid": "41186991",
   "doi": "10.1172/jci.insight.196505",
   "title": "Chromosomal instability in circulating tumor cells and cabazitaxel resistance in metastatic castration-resistant prostate cancer.",
   "journal": "JCI insight",
   "date": "2025-11-04",
   "authors": "Longoria O, Rekowski J, Gupta S, Beije N, Pantel K, Efstathiou E, Sternberg C, C",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41186991",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41186130",
   "src": "MED",
   "pmid": "41186130",
   "doi": "10.1002/pros.70089",
   "title": "The Germline HSD3B1 Variant Is Associated With Response to Androgen Deprivation Therapy and Abiraterone but not With Response to Enzalutamide in Chinese Prostate Cancer Patients.",
   "journal": "The Prostate",
   "date": "2025-11-04",
   "authors": "Shi R, Du Q, Yao C, Huang D, Ruan X, Lam ACY, Chan K, Chun TTS, Wu YP, Kam TY, A",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41186130",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance",
    "time to castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41269739",
   "src": "MED",
   "pmid": "41269739",
   "doi": "10.1188/25.cjon.s1.e28-e33",
   "title": "Managing Prostate Cancer During [177Lu]Lu-PSMA-617 Radioligand Therapy: Tips for Oncology Nurses.",
   "journal": "Clinical journal of oncology nursing",
   "date": "2025-11-01",
   "authors": "Spitz A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41269739",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41167216",
   "src": "MED",
   "pmid": "41167216",
   "doi": "10.1016/s1470-2045(25)00475-9",
   "title": "Abemaciclib plus abiraterone in patients with metastatic castration-resistant prostate cancer (CYCLONE 2): a randomised, double-blind, placebo-controlled, phase 3 trial.",
   "journal": "The Lancet. Oncology",
   "date": "2025-11-01",
   "authors": "Smith M, Piulats J, Todenhöfer T, Lee JL, Arija JA, Mazilu L, Azad A, Alonso-Gor",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41167216",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41174820",
   "src": "MED",
   "pmid": "41174820",
   "doi": "10.1186/s13643-025-02958-1",
   "title": "Comparative efficacy and safety of cabazitaxel versus other taxanes: a systematic review and meta-analysis.",
   "journal": "Systematic reviews",
   "date": "2025-10-31",
   "authors": "Abdu SA, Caiyun H, Asaad WA, Tufail M, Yazhou L, Elayah SA, Zhen R, Chen S, Shub",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41174820",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41472905",
   "src": "MED",
   "pmid": "41472905",
   "doi": "10.1002/iju5.70110",
   "title": "Successful Treatment of Granulocyte Colony-Stimulating Factor-Related Aortitis in Prostate Cancer.",
   "journal": "IJU case reports",
   "date": "2025-10-30",
   "authors": "Yamada S, Amamoto K, Maekawa N, Hara K, Iwata T, Imasato Y, Matsuo T, Furukawa M",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41472905",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41168066",
   "src": "MED",
   "pmid": "41168066",
   "doi": "10.1016/j.eururo.2025.08.015",
   "title": "Baseline and Early On-treatment Circulating Tumour DNA Fraction Are a Key Prognostic Biomarker in Metastatic Castration-resistant Prostate Cancer Treated with [177Lu]Lu-PSMA-617.",
   "journal": "European urology",
   "date": "2025-10-29",
   "authors": "Fettke H, Kostos L, Docanto M, Bukczynska P, Ng N, Medhurst E, Awad M, Buteau JP",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41168066",
   "kind": "new-approach",
   "subject": "FOLH1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41145121",
   "src": "MED",
   "pmid": "41145121",
   "doi": "10.1055/a-2669-8781",
   "title": "[Therapy Management of PARP Inhibitor Combinations in mCRPC Clinical Practice].",
   "journal": "Aktuelle Urologie",
   "date": "2025-10-27",
   "authors": "Retz M, Borkowetz A, Wittenzellner K, Aga-Barfknecht H, von Amsberg G.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41145121",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia",
    "thrombocytopenia",
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41131283",
   "src": "MED",
   "pmid": "41131283",
   "doi": "10.1038/s41391-025-01038-8",
   "title": "STEAP1-targeted strategies in advanced prostate cancer: a review on therapeutic and diagnostic implications.",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2025-10-23",
   "authors": "Heo JY, Sheng M, Khalaf D, Leong HS, Emmenegger U.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41131283",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific",
    "CAR-T",
    "antibody-drug conjugate"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41125870",
   "src": "MED",
   "pmid": "41125870",
   "doi": "10.1038/s41551-025-01508-3",
   "title": "Collagen-binding IL-12-armoured STEAP1 CAR-T cells reduce toxicity and treat prostate cancer in mouse models.",
   "journal": "Nature biomedical engineering",
   "date": "2025-10-23",
   "authors": "Sasaki K, Bhatia V, Asano Y, Bakhtiari J, Kaur P, Wang C, Matsuo T, Dubois O, Ch",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41125870",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "CAR-T"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41121782",
   "src": "MED",
   "pmid": "41121782",
   "doi": "10.1002/pros.70082",
   "title": "Efficacy of Early Switching From Docetaxel to Cabazitaxel in Castration-Resistant Prostate Cancer.",
   "journal": "The Prostate",
   "date": "2025-10-21",
   "authors": "Kawai T, Maki K, Taguchi S, Fujii Y, Tanaka T, Miyakawa J, Kamei J, Kakutani S, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41121782",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "peripheral neuropathy",
    "alopecia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "41120017",
   "src": "MED",
   "pmid": "41120017",
   "doi": "10.1016/j.annonc.2025.10.004",
   "title": "Capivasertib plus abiraterone in PTEN-deficient metastatic hormone-sensitive prostate cancer: CAPItello-281 phase III study.",
   "journal": "Annals of oncology : official journal of the European Society for Medical Oncology",
   "date": "2025-10-19",
   "authors": "Fizazi K, Clarke NW, De Santis M, Uemura H, Fay AP, Karadurmus N, Kwiatkowski M,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41120017",
   "kind": "toxicity",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "hyperglycemia",
    "rash",
    "diarrhea"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "AKT inhibition (capivasertib)"
    }
   ]
  },
  {
   "id": "41088025",
   "src": "MED",
   "pmid": "41088025",
   "doi": "10.1186/s12885-025-14982-4",
   "title": "A Phase I open-label study to assess the pharmacokinetics, safety, and tolerability of capivasertib alone or in combination with paclitaxel in Chinese patients with advanced solid tumors.",
   "journal": "BMC cancer",
   "date": "2025-10-14",
   "authors": "Zhang J, Liu X, Du Y, Mu Y, Meng Y, Sun Y, Zhang L, Chen C, Cullberg M, Fan E, H",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41088025",
   "kind": "toxicity",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "hyperglycemia",
    "rash",
    "diarrhea"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "41076453",
   "src": "MED",
   "pmid": "41076453",
   "doi": "10.1038/s41391-025-01041-z",
   "title": "Integrating systemic therapy and metastasis-directed therapy in oligometastatic hormone-sensitive prostate cancer.",
   "journal": "Prostate cancer and prostatic diseases",
   "date": "2025-10-11",
   "authors": "Shi X, Wang JH, Chapin BF, Aparicio A, Subudhi SK, Tran PT, Park RJ, Deek MP, Zh",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41076453",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "41062500",
   "src": "MED",
   "pmid": "41062500",
   "doi": "10.1038/s41467-025-64042-5",
   "title": "Elucidating molecularly stratified single agent, and combination, therapeutic strategies targeting MCL1 for lethal prostate cancer.",
   "journal": "Nature communications",
   "date": "2025-10-08",
   "authors": "Jiménez-Vacas JM, Westaby D, Figueiredo I, De Haven Brandon A, Padilha A, Yuan W",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41062500",
   "kind": "resistance",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "41057655",
   "src": "MED",
   "pmid": "41057655",
   "doi": "10.1038/s41591-025-03961-8",
   "title": "Niraparib and abiraterone acetate plus prednisone for HRR-deficient metastatic castration-sensitive prostate cancer: a randomized phase 3 trial.",
   "journal": "Nature medicine",
   "date": "2025-10-07",
   "authors": "Attard G, Agarwal N, Graff JN, Sandhu S, Efstathiou E, Özgüroğlu M, Pereira de S",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41057655",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41172964",
   "src": "MED",
   "pmid": "41172964",
   "doi": "10.1016/j.clgc.2025.102452",
   "title": "Oral Toxicities of PSMA-Targeted Therapies: Mitigation Strategies and Translational Opportunities.",
   "journal": "Clinical genitourinary cancer",
   "date": "2025-10-06",
   "authors": "Emperumal CP, Kannan N, Childs DS, Keenan BP.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41172964",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41049269",
   "src": "MED",
   "pmid": "41049269",
   "doi": "10.1002/mco2.70401",
   "title": "Proteolysis-Targeting Chimera (PROTAC): Current Applications and Future Directions.",
   "journal": "MedComm",
   "date": "2025-10-04",
   "authors": "Fan G, Chen S, Zhang Q, Yu N, Shen Z, Liu Z, Guo W, Tang Z, Yang J, Liu M.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41049269",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "degrader",
    "PROTAC",
    "targeted protein degradation"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "41145991",
   "src": "MED",
   "pmid": "41145991",
   "doi": "10.1691/ph.2025.5591",
   "title": "Prediction of cabazitaxel-induced severe neutropenia based on dose-to-albumin ratio and evaluation of clinical utility.",
   "journal": "Die Pharmazie",
   "date": "2025-10-01",
   "authors": "Kageyama A, Nakazawa Y, Harada D, Kawakubo T, Asano K.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41145991",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40548863",
   "src": "MED",
   "pmid": "40548863",
   "doi": "10.1158/1541-7786.mcr-25-0104",
   "title": "A Novel Bispecific Integrin α5β1/αv Antibody Reprograms the Myc-Regulated Basal Phenotype of Prostate Cancer with NK Cell-Mediated Tumor Elimination.",
   "journal": "Molecular cancer research : MCR",
   "date": "2025-10-01",
   "authors": "Joshi R, Zhou M, Lin JH, Song F, Fein D, Morrissey C, Hu K, Poltorak A, Mathew P",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40548863",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "bispecific"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "40991193",
   "src": "MED",
   "pmid": "40991193",
   "doi": "10.1007/s11255-025-04804-8",
   "title": "177Lu-vipivotide tetraxetan (PSMA-617) vs cabazitaxel in metastatic castration-resistant prostate cancer: a real-world analysis using the TriNetX database.",
   "journal": "International urology and nephrology",
   "date": "2025-09-24",
   "authors": "Aijaz P, Eby A, Collins J, Kamran A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40991193",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "dry mouth"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic",
    "state-crpc"
   ],
   "also": [
    {
     "kind": "toxicity",
     "subject": "Taxanes"
    }
   ]
  },
  {
   "id": "40975747",
   "src": "MED",
   "pmid": "40975747",
   "doi": "10.1038/s41418-025-01582-9",
   "title": "TRIM24-mediated K27-linked ubiquitination of ULK1 alleviates energy stress-induced autophagy and promote prostate cancer growth in the context of SPOP mutation.",
   "journal": "Cell death and differentiation",
   "date": "2025-09-20",
   "authors": "Chen S, Lin J, Yang Z, Wang Y, Wang Q, Wang D, Qu Y, Lin Q, Liu J, Yan S, Wang Z",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40975747",
   "kind": "new-approach",
   "subject": "SPOP",
   "matched": [
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "SPOP"
   ],
   "nodes": []
  },
  {
   "id": "40956994",
   "src": "MED",
   "pmid": "40956994",
   "doi": "10.1200/po-25-00457",
   "title": "Multicenter Phase II Study of Olaparib and the ATR Inhibitor Ceralasertib in Metastatic Castration-Resistant Prostate Cancer (TRAP).",
   "journal": "JCO precision oncology",
   "date": "2025-09-16",
   "authors": "Tsung I, Smith DC, Heath EI, Cackowski F, Devitt ME, Braun TM, Yentz S, Nguyen C",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40956994",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41076395",
   "src": "MED",
   "pmid": "41076395",
   "doi": "10.1016/j.clgc.2025.102437",
   "title": "Comprehensive Evaluation of Androgen Receptor Pathway Inhibitors in Metastatic Castration-Sensitive Prostate Cancer: A Multicenter Inverse Probability of Treatment Weighting-Based Study.",
   "journal": "Clinical genitourinary cancer",
   "date": "2025-09-16",
   "authors": "Kobayashi K, Tokunaga T, Nagao K, Fujikawa K, Oba K, Takai K, Matsumoto H, Sakan",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41076395",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40955339",
   "src": "MED",
   "pmid": "40955339",
   "doi": "10.1177/17588359251367308",
   "title": "Prevention and management of PARP inhibitor-related haematological toxicities in prostate cancer: French expert opinion using the Delphi method.",
   "journal": "Therapeutic advances in medical oncology",
   "date": "2025-09-13",
   "authors": "Cassuto O, Mathieu R, Helissey C, Schmitt A, Gobert A, Mourey L, Jovenin N, Bout",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40955339",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia",
    "thrombocytopenia",
    "myelodysplastic syndrome"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40673886",
   "src": "MED",
   "pmid": "40673886",
   "doi": "10.1158/1078-0432.ccr-25-0883",
   "title": "FDA Approval Summary: Niraparib plus Abiraterone Acetate Fixed-Dose Combination for BRCA-Mutated Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2025-09-01",
   "authors": "Maguire WF, Chi DC, Agrawal S, Joeng HK, Kim-McOlash S, Manheng W, Bulatao I, Sa",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40673886",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40689871",
   "src": "MED",
   "pmid": "40689871",
   "doi": "10.1158/1078-0432.ccr-25-1211",
   "title": "Safety and Efficacy of Tarlatamab in Patients with Neuroendocrine Prostate Cancer: Results from the Phase 1b DeLLpro-300 Study.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2025-09-01",
   "authors": "Aggarwal R, Rottey S, Bernard-Tessier A, Mellado B, Kosaka T, Stadler WM, Horvat",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40689871",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40729484",
   "src": "MED",
   "pmid": "40729484",
   "doi": "10.1158/0008-5472.can-24-4096",
   "title": "A Peptide-Based PROTAC Degrader of BRCA2 Sensitizes Metastatic Castration-Resistant Prostate Cancer to PARP Inhibition.",
   "journal": "Cancer research",
   "date": "2025-09-01",
   "authors": "Ye Q, Ma B, Li L, Wang Z, Lu M, Kang J, Lei Y, Xu S, Wang K, Jian Y, Fan Y, Wang",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40729484",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "BRCA2"
   ],
   "nodes": []
  },
  {
   "id": "40979134",
   "src": "MED",
   "pmid": "40979134",
   "doi": "10.1007/s13139-025-00946-w",
   "title": "Bridging the Gap: PSMA Radioligand Therapy for Asian Men with Prostate Cancer.",
   "journal": "Nuclear medicine and molecular imaging",
   "date": "2025-08-26",
   "authors": "Suh M, O JH.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40979134",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PTEN",
    "TP53",
    "SPOP",
    "FOXA1",
    "ERG"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "SPOP"
    },
    {
     "kind": "new-approach",
     "subject": "FOXA1"
    },
    {
     "kind": "new-approach",
     "subject": "ERG"
    }
   ]
  },
  {
   "id": "40851054",
   "src": "MED",
   "pmid": "40851054",
   "doi": "10.1007/s00259-025-07519-1",
   "title": "Radioligand treatment with [177Lu]Lu-PSMA I&T in elderly Patients - Safety, efficacy, and prognostic factors for survival.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2025-08-25",
   "authors": "Schwinger M, Kalogirou C, Scheper V, Däuwel M, Weber S, Seitz AK, Kübler H, Buck",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40851054",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40812718",
   "src": "MED",
   "pmid": "40812718",
   "doi": "10.1016/j.canlet.2025.217986",
   "title": "Chimeric antigen receptor-engineered (CAR)-T cell therapy for metastatic prostate cancer.",
   "journal": "Cancer letters",
   "date": "2025-08-12",
   "authors": "Tharian L, Verma S, Feinberg D, Parameswaran R, Gupta S.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40812718",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40782071",
   "src": "MED",
   "pmid": "40782071",
   "doi": "10.1021/acs.jmedchem.5c01294",
   "title": "A Novel PSMA/FAP-Specific Radiotracer 99mTc-HFaPSMA for Diagnosis of PSMA-Negative Prostate Cancer: From Preclinical Validation to Clinical Translation.",
   "journal": "Journal of medicinal chemistry",
   "date": "2025-08-09",
   "authors": "Wang Y, Li X, Li C, Xing H, Gao R, Jia B.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40782071",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative",
    "PSMA heterogeneity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40779218",
   "src": "MED",
   "pmid": "40779218",
   "doi": "10.1007/s10147-025-02846-7",
   "title": "Post-marketing surveillance of radium-223 chloride in Japanese patients with castration-resistant prostate cancer with bone metastasis-final analysis of 3-year extended follow-up focusing on bone fractures.",
   "journal": "International journal of clinical oncology",
   "date": "2025-08-08",
   "authors": "Masumori N, Hosono M, Takahashi S, Kakehi Y, Uemura H, Sunaya T, Shimotsumagari ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40779218",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40784137",
   "src": "MED",
   "pmid": "40784137",
   "doi": "10.1016/j.dnarep.2025.103884",
   "title": "Inhibition of both SWI/SNF ATPases by BRM014 impairs homologous recombination, sensitizes cells to DNA damage and PARP inhibitors, and activates the cGAS/STING response.",
   "journal": "DNA repair",
   "date": "2025-08-08",
   "authors": "Alfano P, Rocha F, Dille A, Kirk F, Kendall M, Paul E, Lyon M, Ramakrishnan U, P",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40784137",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "40765197",
   "src": "MED",
   "pmid": "40765197",
   "doi": "10.1002/jcph.70074",
   "title": "Clinical Pharmacology Characterization and Dose Selection of Xaluritamig, a Next Generation XmAb® 2+1 T-Cell Engager, in Prostate Cancer Patients.",
   "journal": "Journal of clinical pharmacology",
   "date": "2025-08-05",
   "authors": "Kuipers-Connarn JN, Pourzanjani A, Bose M, Modi S, Stieglmaier J, Murphy A, Meht",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40765197",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40906325",
   "src": "MED",
   "pmid": "40906325",
   "doi": "10.1007/s10637-025-01580-1",
   "title": "A phase 1b/2 study of intermittent talazoparib plus temozolomide in patients with metastatic castration-resistant prostate cancer and no mutations in DNA damage response genes.",
   "journal": "Investigational new drugs",
   "date": "2025-08-01",
   "authors": "Autio KA, Kyriakopoulos CE, Palyca P, Xiao H, Emamekhoo H, Danila D, Jan M, Cath",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40906325",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "thrombocytopenia",
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40800095",
   "src": "MED",
   "pmid": "40800095",
   "doi": "10.21037/tau-2025-167",
   "title": "The RNA helicase DDX17 enhances androgen receptor stability by interacting with the E3 ubiquitin ligase SPOP in prostate cancer.",
   "journal": "Translational andrology and urology",
   "date": "2025-07-28",
   "authors": "Maheremu M, Zheng B, Wen H, Wei Q, Lv S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40800095",
   "kind": "new-approach",
   "subject": "SPOP",
   "matched": [
    "novel mechanism"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "SPOP"
   ],
   "nodes": []
  },
  {
   "id": "41132855",
   "src": "MED",
   "pmid": "41132855",
   "doi": "10.1016/j.apsb.2025.07.035",
   "title": "Dissecting the effects of 223Radium on the bone microenvironment.",
   "journal": "Acta pharmaceutica Sinica. B",
   "date": "2025-07-26",
   "authors": "Barrios S, Serafini E, La Posta L, Meyers DN, Dunbar NJ, Corn PG, Elefteriou F, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/41132855",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40705094",
   "src": "MED",
   "pmid": "40705094",
   "doi": "10.1007/s00259-025-07438-1",
   "title": "Efficacy and safety of rechallenge therapy with [177Lu]Lu-PSMA in metastatic castration-resistant prostate cancer: a systematic review and meta-analysis.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2025-07-24",
   "authors": "Belabaci Z, Schmidt L, Sleiay M, Couñago F, López Campos F, Tolba M, Zilli T, Af",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40705094",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40683290",
   "src": "MED",
   "pmid": "40683290",
   "doi": "10.1016/s0140-6736(25)00684-1",
   "title": "Talazoparib plus enzalutamide in men with metastatic castration-resistant prostate cancer: final overall survival results from the randomised, placebo-controlled, phase 3 TALAPRO-2 trial.",
   "journal": "Lancet (London, England)",
   "date": "2025-07-16",
   "authors": "Agarwal N, Azad AA, Carles J, Fay AP, Matsubara N, Szczylik C, De Giorgi U, Youn",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40683290",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40683287",
   "src": "MED",
   "pmid": "40683287",
   "doi": "10.1016/s0140-6736(25)00683-x",
   "title": "Talazoparib plus enzalutamide in men with HRR-deficient metastatic castration-resistant prostate cancer: final overall survival results from the randomised, placebo-controlled, phase 3 TALAPRO-2 trial.",
   "journal": "Lancet (London, England)",
   "date": "2025-07-16",
   "authors": "Fizazi K, Azad AA, Matsubara N, Carles J, Fay AP, De Giorgi U, Young Joung J, Fo",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40683287",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anaemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40601121",
   "src": "MED",
   "pmid": "40601121",
   "doi": "10.1007/s00345-025-05760-9",
   "title": "Piperlongumine enhances the antitumor efficacy of PD-1 inhibitors by inducing immunogenic cell death in prostate cancer cells.",
   "journal": "World journal of urology",
   "date": "2025-07-02",
   "authors": "Jiang Z, Maggs L, Zhou K, Zou C, Huang J, Wang X, Zhang Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40601121",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40702793",
   "src": "MED",
   "pmid": "40702793",
   "doi": "10.1002/ardp.70031",
   "title": "Isoxazole-Based Compounds Targeting the Taxane-Binding Site of Tubulin.",
   "journal": "Archiv der Pharmazie",
   "date": "2025-07-01",
   "authors": "Peřina M, Kiss MA, Bělíček J, Vojáčková V, Veselá D, Minorics R, Zupko I, Frank ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40702793",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "tubulin"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40277461",
   "src": "MED",
   "pmid": "40277461",
   "doi": "10.1158/1078-0432.ccr-24-3848",
   "title": "p-AKT Protein Expression Predicts Response to AKT Inhibitor Combined with Docetaxel Therapy in Adenocarcinoma and Neuroendocrine Prostate Cancer.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2025-07-01",
   "authors": "Werneck Gomes H, Lister NL, Keerthikumar S, Niranjan B, Richards MG, Ryan A, Kwa",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40277461",
   "kind": "resistance",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "PTEN loss"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "40579287",
   "src": "MED",
   "pmid": "40579287",
   "doi": "10.1016/j.euo.2025.06.002",
   "title": "Radium-223 in Men with Metastatic Castration-resistant Prostate Cancer: A Systematic Literature Review of Real-world Outcomes in Observational Studies.",
   "journal": "European urology oncology",
   "date": "2025-06-27",
   "authors": "Lunan-Taylor M, Raval AD, Nhan Phan NT, Korn MJ, Quintero V, McKay RR.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40579287",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40578041",
   "src": "MED",
   "pmid": "40578041",
   "doi": "10.1016/j.seminoncol.2025.152375",
   "title": "Breaking barriers: Deciphering the mechanisms of Olaparib resistance in prostate cancer.",
   "journal": "Seminars in oncology",
   "date": "2025-06-26",
   "authors": "El-Sehrawy AAMA, Mukhlif MY, Khalaf AA, Uthirapathy S, Ballal S, Singh A, Kavith",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40578041",
   "kind": "resistance",
   "subject": "PARP inhibitors",
   "matched": [
    "restoration of homologous recombination"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40569526",
   "src": "MED",
   "pmid": "40569526",
   "doi": "10.1007/s10495-025-02136-7",
   "title": "DNA damage repair inhibitors boost targeted radionuclide therapy and immunotherapy of prostate cancer.",
   "journal": "Apoptosis : an international journal on programmed cell death",
   "date": "2025-06-26",
   "authors": "Xu B, Tao L, Sun J, Yang J, Meng F, Zhong Z.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40569526",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40578344",
   "src": "MED",
   "pmid": "40578344",
   "doi": "10.1016/j.molcel.2025.06.004",
   "title": "Isoform-specific function of NSD3 in DNA replication stress confers resistance to PARP inhibitors in prostate cancer.",
   "journal": "Molecular cell",
   "date": "2025-06-26",
   "authors": "Zhu S, Gao H, Jiang D, Guo G, Hou J, Han Y, Zhang C, Hu X, Indulkar S, Kloeber J",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40578344",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "40649754",
   "src": "MED",
   "pmid": "40649754",
   "doi": "10.3390/ijms26135970",
   "title": "Exploring the Therapeutic Potential of 177Lu-PSMA-617 in a Mouse Model of Prostate Cancer Bone Metastases.",
   "journal": "International journal of molecular sciences",
   "date": "2025-06-21",
   "authors": "Peng CL, Chen CT, Tang IC.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40649754",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40460119",
   "src": "MED",
   "pmid": "40460119",
   "doi": "10.1073/pnas.2426743122",
   "title": "BRCA2 reversion mutation-independent resistance to PARP inhibition through impaired DNA prereplication complex function.",
   "journal": "Proceedings of the National Academy of Sciences of the United States of America",
   "date": "2025-06-03",
   "authors": "Pappas K, Ferrari M, Smith P, Nandakumar S, Khan Z, Young SB, LaClair J, Russo M",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40460119",
   "kind": "resistance",
   "subject": "PARP inhibitors",
   "matched": [
    "reversion mutation"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40450573",
   "src": "MED",
   "pmid": "40450573",
   "doi": "10.1200/jco-25-00678",
   "title": "Pasritamig, a First-in-Class, Bispecific T-Cell Engager Targeting Human Kallikrein 2, in Metastatic Castration-Resistant Prostate Cancer: A Phase I Study.",
   "journal": "Journal of clinical oncology : official journal of the American Society of Clinical Oncology",
   "date": "2025-06-01",
   "authors": "Stein MN, Vinceneux A, Robbrecht D, Doger B, Autio KA, Schweizer MT, Calvo E, Me",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40450573",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome",
    "fatigue"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40450503",
   "src": "MED",
   "pmid": "40450503",
   "doi": "10.1016/j.annonc.2025.05.011",
   "title": "Enzalutamide plus radium-223 in metastatic castration-resistant prostate cancer: results of the EORTC 1333/PEACE-3 trial.",
   "journal": "Annals of oncology : official journal of the European Society for Medical Oncology",
   "date": "2025-05-30",
   "authors": "Tombal B, Choudhury A, Saad F, Gallardo E, Soares A, Loriot Y, McDermott R, Rodr",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40450503",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40442869",
   "src": "MED",
   "pmid": "40442869",
   "doi": "10.1111/ajco.14195",
   "title": "Safety and Efficacy of Lutetium-177 PSMA Radioligand Therapy in Metastatic Castration-Resistant Prostate Cancer with Diffuse Bone Metastases (Asian Population Study).",
   "journal": "Asia-Pacific journal of clinical oncology",
   "date": "2025-05-29",
   "authors": "Ng CWQ, Chua WM, Lam WW, Tong AK, Ng DCE, Tang CYL, Tham WY, Kanesvaran R, Wong ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40442869",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40507301",
   "src": "MED",
   "pmid": "40507301",
   "doi": "10.3390/cancers17111820",
   "title": "T-Cell Engager Therapy in Prostate Cancer: Molecular Insights into a New Frontier in Immunotherapy.",
   "journal": "Cancers",
   "date": "2025-05-29",
   "authors": "Kwon WA, Joung JY.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40507301",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "40425844",
   "src": "MED",
   "pmid": "40425844",
   "doi": "10.1038/s41591-025-03704-9",
   "title": "Lutetium-177-PSMA-617 or cabazitaxel in metastatic prostate cancer: circulating tumor DNA analysis of the randomized phase 2 TheraP trial.",
   "journal": "Nature medicine",
   "date": "2025-05-27",
   "authors": "Kwan EM, Ng SWS, Tolmeijer SH, Emmett L, Sandhu S, Buteau JP, Iravani A, Joshua ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40425844",
   "kind": "new-approach",
   "subject": "FOLH1",
   "matched": [
    "radioligand"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "ATM",
    "PTEN"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    },
    {
     "kind": "new-approach",
     "subject": "PTEN"
    }
   ]
  },
  {
   "id": "40418331",
   "src": "MED",
   "pmid": "40418331",
   "doi": "10.1007/s00259-025-07346-4",
   "title": "Expanding the scope of PSMA-RLT: evaluating treatment in challenging mCRPC patients with poor performance status (ECOG 3).",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2025-05-26",
   "authors": "Bastian MB, Wörl B, Blickle A, Burgard C, Speicher T, Bartholomä M, Schaefer-Sch",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40418331",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "xerostomia",
    "thrombocytopenia",
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40418317",
   "src": "MED",
   "pmid": "40418317",
   "doi": "10.1007/s11523-025-01151-7",
   "title": "PSMA PET Imaging in the Management of Patients with Metastatic Castration-Resistant Prostate Cancer Treated with Radioligand Therapy.",
   "journal": "Targeted oncology",
   "date": "2025-05-26",
   "authors": "Kuo PH, Calais J, Crosby M.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40418317",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40386921",
   "src": "MED",
   "pmid": "40386921",
   "doi": "10.4149/neo_2025_250308n112",
   "title": "Survival benefit of early radium-223 dichloride therapy in castration-resistant prostate cancer patients with osteoblastic bone metastases.",
   "journal": "Neoplasma",
   "date": "2025-05-20",
   "authors": "Takacsova E, Bartovic M, Ivancik J, Waczulikova I.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40386921",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR1022668",
   "src": "PPR",
   "pmid": null,
   "doi": "10.20944/preprints202505.1265.v1",
   "title": "T-Cell Engager Therapy in Prostate Cancer: Molecular Insights into a New Frontier in Immunotherapy",
   "journal": null,
   "date": "2025-05-16",
   "authors": "Kwon W, Joung JY.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1022668",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "40350343",
   "src": "MED",
   "pmid": "40350343",
   "doi": "10.1016/j.euo.2025.04.022",
   "title": "Prevalence of Potential Candidates for Targeted Therapies According to Treatment-related Transcriptomic Signatures Among 140 548 Patients with Nonmetastatic Prostate Cancer.",
   "journal": "European urology oncology",
   "date": "2025-05-10",
   "authors": "Handa N, Li EV, Michael J, Proudfoot JA, Weiner AB, Alam R, Alshalalfa M, Hao Y,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40350343",
   "kind": "new-approach",
   "subject": "FOLH1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "PTEN"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    }
   ]
  },
  {
   "id": "40325961",
   "src": "MED",
   "pmid": "40325961",
   "doi": "10.1097/mou.0000000000001300",
   "title": "Toxicities of radioligand and radioisotope therapy in prostate cancer: a systematic review and meta-analysis.",
   "journal": "Current opinion in urology",
   "date": "2025-05-05",
   "authors": "Ventura D, Noto B, Jauregui NR, Roll W, Rahbar K.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40325961",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40361461",
   "src": "MED",
   "pmid": "40361461",
   "doi": "10.3390/cancers17091535",
   "title": "Inhibition of Mitochondrial-Associated Protein MAGMAS Resensitizes Chemoresistant Prostate Cancer Cells to Docetaxel.",
   "journal": "Cancers",
   "date": "2025-04-30",
   "authors": "Durán AM, Whitley K, Santiago K, Yoo C, Valdez G, Cheng KW, Ochoa P, de Semir D,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40361461",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40383703",
   "src": "MED",
   "pmid": "40383703",
   "doi": "10.1016/j.clgc.2025.102368",
   "title": "Dose-Dense Docetaxel and Radium-223 in Bone-Dominant Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Clinical genitourinary cancer",
   "date": "2025-04-29",
   "authors": "Connell B, Hwang C, Folefac E, Lawlor C, Koethe B, Mathew P.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40383703",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "myelosuppression"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40299225",
   "src": "MED",
   "pmid": "40299225",
   "doi": "10.1007/s11864-025-01323-7",
   "title": "Advances in Targeted Therapy for Metastatic Prostate Cancer.",
   "journal": "Current treatment options in oncology",
   "date": "2025-04-29",
   "authors": "Grewal K, Dorff TB, Mukhida SS, Agarwal N, Hahn AW.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40299225",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "degrader",
    "bispecific",
    "antibody-drug conjugate",
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "BRCA2",
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "STEAP1"
    }
   ]
  },
  {
   "id": "40362489",
   "src": "MED",
   "pmid": "40362489",
   "doi": "10.3390/ijms26094253",
   "title": "Inorganic Arsenic Induces Elevated p53 Levels with Altered Functionality Impacting the Expression of Toll-like Receptor 3 and Other Target Genes in Immortalized Prostate Epithelial Cells.",
   "journal": "International journal of molecular sciences",
   "date": "2025-04-29",
   "authors": "Pacheco-Castillo NC, Gómez-Montalvo J, Olivares-Illana V, Recillas-Targa F, Toka",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40362489",
   "kind": "new-approach",
   "subject": "TP53",
   "matched": [
    "novel mechanism"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TP53"
   ],
   "nodes": []
  },
  {
   "id": "40427518",
   "src": "MED",
   "pmid": "40427518",
   "doi": "10.3390/biom15050625",
   "title": "Precision Targeting in Metastatic Prostate Cancer: Molecular Insights to Therapeutic Frontiers.",
   "journal": "Biomolecules",
   "date": "2025-04-27",
   "authors": "Kwon WA, Joung JY.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40427518",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA2",
    "ATM"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    }
   ]
  },
  {
   "id": "40285804",
   "src": "MED",
   "pmid": "40285804",
   "doi": "10.1007/s11255-025-04465-7",
   "title": "Short-term outcomes of triplet therapy in metastatic hormone-sensitive prostate cancer in older adults: a retrospective, single-center real-world cohort study.",
   "journal": "International urology and nephrology",
   "date": "2025-04-26",
   "authors": "Usui K, Kubo H, Matsumoto T, Aigase T, Suzuki A, Kishida T, Nakaigawa N.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40285804",
   "kind": "toxicity",
   "subject": "Taxanes",
   "matched": [
    "neutropenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR1009557",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2025.04.20.649668",
   "title": "BRCA2 reversion mutation-independent resistance to PARP inhibition in prostate cancer through loss of function perturbations in the DNA pre-replication complex",
   "journal": null,
   "date": "2025-04-24",
   "authors": "Pappas K, Ferrari M, Smith P, Nandakumar S, Khan Z, Young SB, LaClair J, Russo M",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR1009557",
   "kind": "resistance",
   "subject": "PARP inhibitors",
   "matched": [
    "reversion mutation"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40266437",
   "src": "MED",
   "pmid": "40266437",
   "doi": "10.1007/s11864-025-01317-5",
   "title": "PSMA-based Therapies and Novel Therapies in Advanced Prostate Cancer: The Now and the Future.",
   "journal": "Current treatment options in oncology",
   "date": "2025-04-23",
   "authors": "Ayzman A, Pachynski RK, Reimers MA.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40266437",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40267193",
   "src": "MED",
   "pmid": "40267193",
   "doi": "10.1126/sciadv.adu0847",
   "title": "Acute BRCAness induction and AR pathway blockage through CDK12/7/9 degradation enhances PARP inhibitor sensitivity in prostate cancer.",
   "journal": "Science advances",
   "date": "2025-04-23",
   "authors": "Gui F, Jiang B, Jiang J, He Z, Tsujino T, Takai T, Arai S, Pana C, Köllermann J,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40267193",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "BRCA2",
    "CDK12"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "CDK12"
    }
   ]
  },
  {
   "id": "40430845",
   "src": "MED",
   "pmid": "40430845",
   "doi": "10.3390/pharmaceutics17050552",
   "title": "The Development of Al18F-NOTA-FAP-2286 as an FAP-Targeted PET Tracer and the Translational Application in the Diagnosis of Acquired Drug Resistance in Progressive Prostate Cancer.",
   "journal": "Pharmaceutics",
   "date": "2025-04-23",
   "authors": "Du X, Zhang Y, Jia Y, Gao B.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40430845",
   "kind": "new-approach",
   "subject": "ATM",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "ATM"
   ],
   "nodes": []
  },
  {
   "id": "40270044",
   "src": "MED",
   "pmid": "40270044",
   "doi": "10.1186/s13104-025-07249-5",
   "title": "Thermal potentiation improves IFN-γ production but not cytotoxicity in human CAR-T cells.",
   "journal": "BMC research notes",
   "date": "2025-04-23",
   "authors": "Pati NB, Jin Y, Kumar S, Kyte JA, Ciosk R.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40270044",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "CAR-T",
    "CAR T"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40172632",
   "src": "MED",
   "pmid": "40172632",
   "doi": "10.1007/s00120-025-02574-w",
   "title": "[Bispecific antibodies in prostate cancer therapy].",
   "journal": "Urologie (Heidelberg, Germany)",
   "date": "2025-04-02",
   "authors": "Jung S, Heitmann J, Pflügler M, Jung G, Rausch S, Salih H.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40172632",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40169837",
   "src": "MED",
   "pmid": "40169837",
   "doi": "10.1038/s41585-025-01014-w",
   "title": "Targeting the tumour cell surface in advanced prostate cancer.",
   "journal": "Nature reviews. Urology",
   "date": "2025-04-01",
   "authors": "Boixareu C, Taha T, Venkadakrishnan VB, de Bono J, Beltran H.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/40169837",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "antibody-drug conjugate"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40678419",
   "src": "MED",
   "pmid": "40678419",
   "doi": "10.55730/1300-0152.2743",
   "title": "Butyrylcholinesterase (BChE) downregulation in taxane resistance: implications for prostate cancer.",
   "journal": "Turkish journal of biology = Turk biyoloji dergisi",
   "date": "2025-03-26",
   "authors": "Cevatemre B, Işiklar A, Bulut İ, Karyemez E, Syed H, Açilan C.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40678419",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40299363",
   "src": "MED",
   "pmid": "40299363",
   "doi": "10.3390/biomedicines13040794",
   "title": "The Role of STEAP1 in Prostate Cancer: Implications for Diagnosis and Therapeutic Strategies.",
   "journal": "Biomedicines",
   "date": "2025-03-26",
   "authors": "Zhang L, Ren X, An R, Song H, Tian Y, Wei X, Shi M, Wang Z.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40299363",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "CAR-T",
    "antibody-drug conjugate"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40161494",
   "src": "MED",
   "pmid": "40161494",
   "doi": "10.1155/ijog/6681711",
   "title": "Establishing a Prognostic Model Correlates to Inflammatory Response Pathways for Prostate Cancer via Multiomic Analysis of Lactylation-Related Genes.",
   "journal": "International journal of genomics",
   "date": "2025-03-21",
   "authors": "Du Q, Meng C, Zhang W, Huang L, Xue C.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40161494",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR992838",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2025.03.19.644145",
   "title": "Collagen-binding IL-12 expressing STEAP1 CAR-T cells reduce toxicity and eradicate mouse prostate cancer in combination with checkpoint inhibitors",
   "journal": null,
   "date": "2025-03-19",
   "authors": "Sasaki K, Bhatia V, Asano Y, Bakhtiari J, Kaur P, Wang C, Matsuo T, Nikolaidi M,",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR992838",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "CAR-T"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "40225003",
   "src": "MED",
   "pmid": "40225003",
   "doi": "10.21037/tcr-24-812",
   "title": "Predicting bone marrow suppression from urinal 8-hydroxy-2'-deoxyguanosine level during the treatment with radium-223 in patients with cancer bone metastasis.",
   "journal": "Translational cancer research",
   "date": "2025-03-18",
   "authors": "Monzen S, Kasai Y, Kinbara R, Suto K, Morino Y, Terada K, Wojcik A, Mariya Y.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40225003",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "40142641",
   "src": "MED",
   "pmid": "40142641",
   "doi": "10.3390/jcm14061833",
   "title": "Added Value of Whole-Body Diffusion-Weighted Imaging in Patients Undergoing Prostate-Specific Membrane Antigen Positron Emission Tomography.",
   "journal": "Journal of clinical medicine",
   "date": "2025-03-08",
   "authors": "Hong CW, Behr SC, Jiang F, Wang Y, Houshmand S, Hope TA.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40142641",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "40043230",
   "src": "MED",
   "pmid": "40043230",
   "doi": "10.1200/jco-24-01283",
   "title": "Pembrolizumab Plus Docetaxel Versus Docetaxel for Previously Treated Metastatic Castration-Resistant Prostate Cancer: The Randomized, Double-Blind, Phase III KEYNOTE-921 Trial.",
   "journal": "Journal of clinical oncology : official journal of the American Society of Clinical Oncology",
   "date": "2025-03-05",
   "authors": "Petrylak DP, Ratta R, Matsubara N, Korbenfeld E, Gafanov R, Mourey L, Todenhöfer",
   "oa": true,
   "url": "https://europepmc.org/article/MED/40043230",
   "kind": "toxicity",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "pneumonitis"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR985837",
   "src": "PPR",
   "pmid": null,
   "doi": "10.20944/preprints202503.0213.v1",
   "title": "Precision Targeting in Metastatic Prostate Cancer: Molecular Insights to Therapeutic Frontiers",
   "journal": null,
   "date": "2025-03-04",
   "authors": "Kwon W, Joung JY.",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR985837",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA2",
    "ATM"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    }
   ]
  },
  {
   "id": "39985785",
   "src": "MED",
   "pmid": "39985785",
   "doi": "10.1080/10286020.2025.2464695",
   "title": "Genistein resists castration-resistant prostate cancer by inhibiting the androgen receptor pathway.",
   "journal": "Journal of Asian natural products research",
   "date": "2025-02-22",
   "authors": "Yu XP, Zheng LJ, Yan JL, Luo Y, Song XL, Fu TY, Peng XL, Du JC, Han B, Li F, Zhu",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39985785",
   "kind": "resistance",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "androgen synthesis"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39935034",
   "src": "MED",
   "pmid": "39935034",
   "doi": "10.1080/14740338.2025.2466673",
   "title": "Postmarketing safety of [177Lu]Lu-PSMA-617 radioligand therapy for prostate cancer: a disproportionality analysis of the FDA adverse event reporting system.",
   "journal": "Expert opinion on drug safety",
   "date": "2025-02-17",
   "authors": "Zhao Y, Wang N, Zhang Z, Zhao X.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39935034",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "39920014",
   "src": "MED",
   "pmid": "39920014",
   "doi": "10.1016/j.euo.2025.01.002",
   "title": "Association of Prior PARP Inhibitor Exposure with Clinical Outcomes after 177Lu-PSMA-617 in Men with Castration-resistant Prostate Cancer and Mutations in DNA Homologous Recombination Repair Genes.",
   "journal": "European urology oncology",
   "date": "2025-02-07",
   "authors": "Raychaudhuri R, Tuchayi AM, Low SK, Arafa AT, Graham LS, Gulati R, Pritchard CC,",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39920014",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA2",
    "ATM"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    }
   ]
  },
  {
   "id": "39941843",
   "src": "MED",
   "pmid": "39941843",
   "doi": "10.3390/cancers17030476",
   "title": "Is Extraordinary Response and Long-Term Remission of Metastatic Castration-Resistant Prostate Cancer (mCRPC) After [¹⁷⁷Lu]Lu-PSMA Radioligand Therapy Due to an Immunomodulatory Effect (Radiovaccination)? A Dual Center Experience on Super-Responders.",
   "journal": "Cancers",
   "date": "2025-01-31",
   "authors": "Maharaj M, Perrone E, Wirtz RM, Heslop L, Govender T, Korowlay NA, Ghai K, Parka",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39941843",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "39884884",
   "src": "MED",
   "pmid": "39884884",
   "doi": "10.1016/j.eururo.2024.12.015",
   "title": "Final Overall Survival and Molecular Data Associated with Clinical Outcomes in Patients Receiving Ipatasertib and Abiraterone in the Phase 3 IPATential150 Trial.",
   "journal": "European urology",
   "date": "2025-01-30",
   "authors": "de Bono JS, He M, Shi Z, Nowicka M, Bracarda S, Sternberg CN, Chi KN, Olmos D, S",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39884884",
   "kind": "resistance",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "PTEN loss"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "PPR970155",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2025.01.21.632253",
   "title": "B7-H3 as a Dual Clinically Relevant Checkpoint and Antibody Drug Conjugate Target Expressed Across Adenocarcinoma and Neuroendocrine Prostate Cancers",
   "journal": null,
   "date": "2025-01-24",
   "authors": "Sharma S, Mundhara N, Tekoglu E, Amaral A, Lotan TL, Gu P, Luo J, Baraban EG, La",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR970155",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39836208",
   "src": "MED",
   "pmid": "39836208",
   "doi": "10.1007/s00120-024-02493-2",
   "title": "[Next generation sequencing (NGS)-based molecular panel analysis for metastatic prostate cancer: how often can we detect druggable mutations? : NGS for metastatic adenocarcinoma of the prostate].",
   "journal": "Urologie (Heidelberg, Germany)",
   "date": "2025-01-21",
   "authors": "Steenbock O, Paffenholz P, Rieger C, Heidenreich J, Pfister D, von Brandenstein ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39836208",
   "kind": "new-approach",
   "subject": "ATM",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "ATM",
    "PTEN"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    }
   ]
  },
  {
   "id": "39827019",
   "src": "MED",
   "pmid": "39827019",
   "doi": "10.1016/j.eururo.2024.11.027",
   "title": "Decrease in Fracture Rate with Mandatory Bone-protecting Agents in the EORTC 1333/PEACE-3 Trial Comparing Radium-223 Combined with Enzalutamide Versus Enzalutamide Alone: A Safety Analysis.",
   "journal": "European urology",
   "date": "2025-01-17",
   "authors": "Gillessen S, Tombal B, Turco F, Choudhury A, Rodriguez-Vida A, Gallardo E, Velho",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39827019",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "39791476",
   "src": "MED",
   "pmid": "39791476",
   "doi": "10.1021/acs.jmedchem.4c02768",
   "title": "PSMA and SSTR2 Dual-Targeting Theranostic Agents for Neuroendocrine-Differentiated Prostate Cancer (NEPC).",
   "journal": "Journal of medicinal chemistry",
   "date": "2025-01-10",
   "authors": "Jin W, Yan L, Li L, Luo Y, Qiao J, Peng Q, Zhu Z, Zhu L, Kung HF.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39791476",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "41165145",
   "src": "MED",
   "pmid": "41165145",
   "doi": "10.1097/mnm.0000000000002078",
   "title": "A standardised attenuated dosing of 177 lutetium-prostate-specific membrane antigen therapy for patients with metastatic castration-resistant prostate carcinoma and preexisting renal impairment.",
   "journal": "Nuclear medicine communications",
   "date": "2025-01-06",
   "authors": "Du D, Khoo V, Huddart R, Du Y.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/41165145",
   "kind": "toxicity",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "renal toxicity"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "39760809",
   "src": "MED",
   "pmid": "39760809",
   "doi": "10.1007/s12033-024-01322-3",
   "title": "Identification and Validation of Alkaliptosis Resistance-Associated Genes in Prostate Cancer Via Transcriptome Sequencing and Prediction of Biochemical Recurrence.",
   "journal": "Molecular biotechnology",
   "date": "2025-01-06",
   "authors": "Song X, Zhang Y, Li T, Wang W, Xie Z, Han B.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39760809",
   "kind": "resistance",
   "subject": "Androgen deprivation (GnRH)",
   "matched": [
    "castration resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "39761938",
   "src": "MED",
   "pmid": "39761938",
   "doi": "10.1016/j.critrevonc.2024.104609",
   "title": "Efficacy and safety of PARP inhibitors in prostate cancer: An umbrella review of systematic reviews and meta-analyses.",
   "journal": "Critical reviews in oncology/hematology",
   "date": "2025-01-04",
   "authors": "Tzang CC, Wu HW, Luo CA, Li YT, Kang YF, Hsieh CM, Lee CY, Hsu TC, Tzang BS.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39761938",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "thrombocytopenia",
    "fatigue"
   ],
   "tier": "meta-analysis",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "39746330",
   "src": "MED",
   "pmid": "39746330",
   "doi": "10.1021/acs.jmedchem.4c02205",
   "title": "Discovery of a Potent and Selective GSPT1 Molecular Glue Degrader for the Treatment of Castration-Resistant Prostate Cancer.",
   "journal": "Journal of medicinal chemistry",
   "date": "2025-01-02",
   "authors": "Shen H, Xu H, Jin W, Wu T, Hu J, Zhang C, Zhong Z, Li J, Li J, Mao R, Zhang S, Z",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39746330",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "degrader",
    "molecular glue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "39737542",
   "src": "MED",
   "pmid": "39737542",
   "doi": "10.1002/cam4.70333",
   "title": "Phase 3 Study of Talazoparib Plus Enzalutamide Versus Placebo Plus Enzalutamide as First-Line Treatment in Patients With Metastatic Castration-Resistant Prostate Cancer: TALAPRO-2 Japanese Subgroup Analysis.",
   "journal": "Cancer medicine",
   "date": "2025-01-01",
   "authors": "Matsubara N, Miyake H, Uemura H, Mizokami A, Kikukawa H, Kosaka T, Nishimura K, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39737542",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "38967076",
   "src": "MED",
   "pmid": "38967076",
   "doi": "10.2174/0115680096307629240611104728",
   "title": "Development of CDK12 as a Cancer Therapeutic Target and Related Inhibitors.",
   "journal": "Current cancer drug targets",
   "date": "2025-01-01",
   "authors": "Chen B, Liu J.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38967076",
   "kind": "new-approach",
   "subject": "CDK12",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "CDK12"
   ],
   "nodes": []
  },
  {
   "id": "39657662",
   "src": "MED",
   "pmid": "39657662",
   "doi": "10.1016/j.xcrm.2024.101868",
   "title": "Castrate-resistant prostate cancer response to taxane is determined by an HNF1-dependent apoptosis resistance circuit.",
   "journal": "Cell reports. Medicine",
   "date": "2024-12-09",
   "authors": "Senatorov IS, Bowman J, Jansson KH, Alilin AN, Capaldo BJ, Lake R, Riba M, Abbey",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39657662",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39642328",
   "src": "MED",
   "pmid": "39642328",
   "doi": "10.1200/po-24-00645",
   "title": "Cancer-Control Outcomes of Patients With Metastatic Castration-Resistant Prostate Cancer With BRCA Gene or Tumor Suppressor Mutations Undergoing 177-Lutetium Prostate-Specific Membrane Antigen Radioligand Therapy.",
   "journal": "JCO precision oncology",
   "date": "2024-12-06",
   "authors": "Wenzel M, Koll F, Hoeh B, Humke C, Reis H, Wild P, Steuber T, Graefen M, Tilki D",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39642328",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "PTEN",
    "TP53",
    "RB1"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "RB1"
    }
   ]
  },
  {
   "id": "PPR951094",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2024.12.03.626600",
   "title": "IGFs regulate cancer cell immune evasion in prostate cancer",
   "journal": null,
   "date": "2024-12-06",
   "authors": "Nandakumar AM, Barberis A, Kim J, Lang CR, Mills JV, Rieunier G, Doultsinos D, T",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR951094",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "novel mechanism"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "39638687",
   "src": "MED",
   "pmid": "39638687",
   "doi": "10.1016/j.euo.2024.11.011",
   "title": "Recent and Future Developments in the Use of Poly (ADP-ribose) Polymerase Inhibitors for Prostate Cancer.",
   "journal": "European urology oncology",
   "date": "2024-12-05",
   "authors": "Zacchi F, Abida W, Antonarakis ES, Bryce AH, Castro E, Cheng HH, Shandhu S, Mate",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39638687",
   "kind": "toxicity",
   "subject": "PARP inhibitors",
   "matched": [
    "anemia",
    "fatigue"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PARP1",
    "BRCA2",
    "BRCA1",
    "ATM",
    "CDK12"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "39508435",
   "src": "MED",
   "pmid": "39508435",
   "doi": "10.1021/acs.jmedchem.4c01172",
   "title": "Discovery of CHD1 Antagonists for PTEN-Deficient Prostate Cancer.",
   "journal": "Journal of medicinal chemistry",
   "date": "2024-11-07",
   "authors": "Johnson RL, Graboski AL, Li F, Norris-Drouin JL, Walton WG, Arrowsmith CH, Redin",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39508435",
   "kind": "new-approach",
   "subject": "PTEN",
   "matched": [
    "first-in-class"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PTEN",
    "CHD1"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "CHD1"
    }
   ]
  },
  {
   "id": "39526247",
   "src": "MED",
   "pmid": "39526247",
   "doi": "10.3389/fmed.2024.1460212",
   "title": "Treatment intensification with radium-223 plus enzalutamide in patients with metastatic castration-resistant prostate cancer.",
   "journal": "Frontiers in medicine",
   "date": "2024-10-24",
   "authors": "Shore N, Carles J, McDermott R, Agarwal N, Tombal B.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39526247",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "39395327",
   "src": "MED",
   "pmid": "39395327",
   "doi": "10.1016/j.drup.2024.101158",
   "title": "Acetate utilization promotes hormone therapy resistance in prostate cancer through neuroendocrine differentiation.",
   "journal": "Drug resistance updates : reviews and commentaries in antimicrobial and anticancer chemotherapy",
   "date": "2024-10-06",
   "authors": "Gao D, Shen Y, Xu L, Sun Y, Hu H, Xu B, Wang Z, Xu H.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39395327",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "novel mechanism"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "MYC"
   ],
   "nodes": []
  },
  {
   "id": "39353441",
   "src": "MED",
   "pmid": "39353441",
   "doi": "10.1016/j.xcrm.2024.101752",
   "title": "Development of an orally bioavailable CDK12/13 degrader and induction of synthetic lethality with AKT pathway inhibition.",
   "journal": "Cell reports. Medicine",
   "date": "2024-09-30",
   "authors": "Chang Y, Wang X, Yang J, Tien JC, Mannan R, Cruz G, Zhang Y, Vo JN, Magnuson B, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39353441",
   "kind": "new-approach",
   "subject": "CDK12",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "CDK12"
   ],
   "nodes": []
  },
  {
   "id": "39306478",
   "src": "MED",
   "pmid": "39306478",
   "doi": "10.1016/j.eururo.2024.09.008",
   "title": "Intensification Approaches and Treatment Sequencing in Metastatic Castration-resistant Prostate Cancer: A Systematic Review.",
   "journal": "European urology",
   "date": "2024-09-20",
   "authors": "Francini E, Agarwal N, Castro E, Cheng HH, Chi KN, Clarke N, Mateo J, Rathkopf D",
   "oa": false,
   "url": "https://europepmc.org/article/MED/39306478",
   "kind": "resistance",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "PTEN loss"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "39251788",
   "src": "MED",
   "pmid": "39251788",
   "doi": "10.1038/s41588-024-01893-6",
   "title": "NSD2 is a requisite subunit of the AR/FOXA1 neo-enhanceosome in promoting prostate tumorigenesis.",
   "journal": "Nature genetics",
   "date": "2024-09-09",
   "authors": "Parolia A, Eyunni S, Verma BK, Young E, Liu Y, Liu L, George J, Aras S, Das CK, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39251788",
   "kind": "new-approach",
   "subject": "FOXA1",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOXA1"
   ],
   "nodes": []
  },
  {
   "id": "39272956",
   "src": "MED",
   "pmid": "39272956",
   "doi": "10.3390/cancers16173098",
   "title": "Developmental Therapeutics in Metastatic Prostate Cancer: New Targets and New Strategies.",
   "journal": "Cancers",
   "date": "2024-09-06",
   "authors": "Zhang J, Chadha JS.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39272956",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific",
    "CAR T",
    "antibody-drug conjugate",
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39207485",
   "src": "MED",
   "pmid": "39207485",
   "doi": "10.1007/s00259-024-06891-8",
   "title": "Detection of tumour heterogeneity in patients with advanced, metastatic castration-resistant prostate cancer on [68Ga]Ga-/[18F]F-PSMA-11/-1007, [68Ga]Ga-FAPI-46 and 2-[18F]FDG PET/CT: a pilot study.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2024-08-29",
   "authors": "Pabst KM, Mei R, Lückerath K, Hadaschik BA, Kesch C, Rawitzer J, Kessler L, Bode",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39207485",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "39183332",
   "src": "MED",
   "pmid": "39183332",
   "doi": "10.1038/s41419-024-06916-y",
   "title": "Understanding the function of Pax5 in development of docetaxel-resistant neuroendocrine-like prostate cancers.",
   "journal": "Cell death & disease",
   "date": "2024-08-25",
   "authors": "Bhattacharya S, Harris HL, Islam R, Bodas S, Polavaram N, Mishra J, Das D, Sesha",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39183332",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39090086",
   "src": "MED",
   "pmid": "39090086",
   "doi": "10.1038/s41419-024-06949-3",
   "title": "Overcoming ABCB1 mediated multidrug resistance in castration resistant prostate cancer.",
   "journal": "Cell death & disease",
   "date": "2024-08-01",
   "authors": "Sarwar S, Morozov VM, Newcomb MA, Yan B, Brant JO, Opavsky R, Guryanova OA, Isho",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39090086",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "39239510",
   "src": "MED",
   "pmid": "39239510",
   "doi": "10.7150/thno.96322",
   "title": "Impact of TP53 loss-of-function alterations on the response to PSMA radioligand therapy in metastatic castration-resistant prostate cancer patients.",
   "journal": "Theranostics",
   "date": "2024-08-01",
   "authors": "Slootbeek PHJ, Luna-Velez MV, Privé BM, van der Doelen MJ, Kloots ISH, Pamidimar",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39239510",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "BRCA2",
    "TP53",
    "MYC"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "39061241",
   "src": "MED",
   "pmid": "39061241",
   "doi": "10.3390/cancers16142603",
   "title": "Radium-223 Treatment Produces Prolonged Suppression of Resident Osteoblasts and Decreased Bone Mineral Density in Trabecular Bone in Osteoblast Reporter Mice.",
   "journal": "Cancers",
   "date": "2024-07-21",
   "authors": "Lin SC, Yu G, Corn PG, Damasco J, Lee YC, Song JH, Navone NM, Logothetis CJ, Mel",
   "oa": true,
   "url": "https://europepmc.org/article/MED/39061241",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "fracture"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "PPR878905",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2024.07.09.602803",
   "title": "Acute BRCAness Induction and AR Signaling Blockage through CDK12/7/9 Degradation Enhances PARP Inhibitor Sensitivity in Prostate Cancer",
   "journal": null,
   "date": "2024-07-10",
   "authors": "Gui F, Jiang B, Jiang J, He Z, Tsujino T, Takai T, Arai S, Pana C, Köllermann J,",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR878905",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "PROTAC"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "BRCA1",
    "BRCA2",
    "CDK12"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "BRCA2"
    },
    {
     "kind": "new-approach",
     "subject": "CDK12"
    }
   ]
  },
  {
   "id": "38977769",
   "src": "MED",
   "pmid": "38977769",
   "doi": "10.1038/s41585-024-00900-z",
   "title": "Biological determinants of PSMA expression, regulation and heterogeneity in prostate cancer.",
   "journal": "Nature reviews. Urology",
   "date": "2024-07-08",
   "authors": "Bakht MK, Beltran H.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38977769",
   "kind": "new-approach",
   "subject": "FOLH1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "38968122",
   "src": "MED",
   "pmid": "38968122",
   "doi": "10.1073/pnas.2322203121",
   "title": "Single-cell analysis of treatment-resistant prostate cancer: Implications of cell state changes for cell surface antigen-targeted therapies.",
   "journal": "Proceedings of the National Academy of Sciences of the United States of America",
   "date": "2024-07-05",
   "authors": "Zaidi S, Park J, Chan JM, Roudier MP, Zhao JL, Gopalan A, Wadosky KM, Patel RA, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38968122",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38907236",
   "src": "MED",
   "pmid": "38907236",
   "doi": "10.1186/s13000-024-01511-3",
   "title": "Rare histologic transformation of a CTNNB1 (β-catenin) mutated prostate cancer with aggressive clinical course.",
   "journal": "Diagnostic pathology",
   "date": "2024-06-21",
   "authors": "Akhoundova D, Fischer S, Triscott J, Lehner M, Thienger P, Maletti S, Jacquet M,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38907236",
   "kind": "new-approach",
   "subject": "ERG",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "ERG"
   ],
   "nodes": []
  },
  {
   "id": "38856975",
   "src": "MED",
   "pmid": "38856975",
   "doi": "10.1021/acs.molpharmaceut.4c00020",
   "title": "Novel [68Ga/177Lu]Ga/Lu-AZ-093 as PSMA-Targeting Agent for Diagnosis and Radiotherapy.",
   "journal": "Molecular pharmaceutics",
   "date": "2024-06-10",
   "authors": "Wang R, Jin W, Luo Y, Hong H, Zhao R, Li L, Yan L, Qiao J, Ploessl K, Zhu L, Kun",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38856975",
   "kind": "new-approach",
   "subject": "FOLH1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "FOLH1"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "38552171",
   "src": "MED",
   "pmid": "38552171",
   "doi": "10.1158/2326-6066.cir-22-0306",
   "title": "Randomized Phase II Study Evaluating the Addition of Pembrolizumab to Radium-223 in Metastatic Castration-resistant Prostate Cancer.",
   "journal": "Cancer immunology research",
   "date": "2024-06-01",
   "authors": "Choudhury AD, Kwak L, Cheung A, Allaire KM, Marquez J, Yang DD, Tripathi A, Kila",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38552171",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38824003",
   "src": "MED",
   "pmid": "38824003",
   "doi": "10.1016/j.euo.2024.05.003",
   "title": "Circulating Biomarkers Predictive of Treatment Response in Patients with Hormone-sensitive or Castration-resistant Metastatic Prostate Cancer: A Systematic Review.",
   "journal": "European urology oncology",
   "date": "2024-05-31",
   "authors": "Baboudjian M, Peyrottes A, Dariane C, Fromont G, Denis JA, Fiard G, Kassab D, La",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38824003",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "systematic review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "BRCA1",
    "ATM",
    "TP53"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "ATM"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    }
   ]
  },
  {
   "id": "38801069",
   "src": "MED",
   "pmid": "38801069",
   "doi": "10.1080/15384047.2024.2356820",
   "title": "T-Cell redirecting bispecific antibodies: a review of a novel class of immuno-oncology for advanced prostate cancer.",
   "journal": "Cancer biology & therapy",
   "date": "2024-05-27",
   "authors": "Palecki J, Bhasin A, Bernstein A, Mille PJ, Tester WJ, Kelly WK, Zarrabi KK.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38801069",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38765461",
   "src": "MED",
   "pmid": "38765461",
   "doi": "10.1016/j.eucr.2024.102750",
   "title": "mCRPC progression of disease after [177Lu]Lu-PSMA-617 detected on [18F]Choline: a case of PCa heterogeneity.",
   "journal": "Urology case reports",
   "date": "2024-05-08",
   "authors": "Laudicella R, Minutoli F, Russo S, Siracusa M, Bambaci M, Pagano B, Baldari S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38765461",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [
    "PSMA-negative"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "38729054",
   "src": "MED",
   "pmid": "38729054",
   "doi": "10.1016/j.ejca.2024.114103",
   "title": "Capivasertib in combination with enzalutamide for metastatic castration resistant prostate cancer after docetaxel and abiraterone: Results from the randomized phase II RE-AKT trial.",
   "journal": "European journal of cancer (Oxford, England : 1990)",
   "date": "2024-05-08",
   "authors": "Rescigno P, Porta N, Finneran L, Riisnaes R, Figueiredo I, Carreira S, Flohr P, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38729054",
   "kind": "toxicity",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [
    "diarrhea"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "AKT inhibition (capivasertib)"
    }
   ]
  },
  {
   "id": "38712529",
   "src": "MED",
   "pmid": "38712529",
   "doi": "10.1111/febs.17135",
   "title": "ABCB1-mediated docetaxel resistance reversed by erastin in prostate cancer.",
   "journal": "The FEBS journal",
   "date": "2024-05-07",
   "authors": "Chen F, Wu S, Kuang N, Zeng Y, Li M, Xu C.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38712529",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38774416",
   "src": "MED",
   "pmid": "38774416",
   "doi": "10.3389/fonc.2024.1385466",
   "title": "Outcomes and patterns of use of Radium-223 in metastatic castration-resistant prostate cancer.",
   "journal": "Frontiers in oncology",
   "date": "2024-05-07",
   "authors": "Anido-Herranz U, Fernandez-Calvo O, Ruiz-Bañobre J, Martinez-Breijo S, Fernandez",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38774416",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [],
   "nodes": []
  },
  {
   "id": "38652426",
   "src": "MED",
   "pmid": "38652426",
   "doi": "10.1007/s11912-024-01524-7",
   "title": "Antibody Drug Conjugates in Urological Cancers: A Review of the Current Landscape.",
   "journal": "Current oncology reports",
   "date": "2024-04-23",
   "authors": "Ghose A, Lapitan P, Apte V, Ghosh A, Kandala A, Basu S, Parkes J, Shinde SD, Bou",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38652426",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "antibody-drug conjugate"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38774467",
   "src": "MED",
   "pmid": "38774467",
   "doi": "10.1097/ju9.0000000000000138",
   "title": "Expert Perspectives on Controversies in Metastatic Castration-Resistant Prostate Cancer Management: Narrative Review and Report of the First US Prostate Cancer Conference Part 2.",
   "journal": "JU open plus",
   "date": "2024-04-15",
   "authors": "Bryce AH, Crawford ED, Agarwal N, Hussain MH, Beltran H, Cooperberg MR, Petrylak",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38774467",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "PPR837225",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2024.04.09.588340",
   "title": "Single Cell Analysis of Treatment–Resistant Prostate Cancer: Implications of Cell State Changes for Cell Surface Antigen Targeted Therapies",
   "journal": null,
   "date": "2024-04-12",
   "authors": "Zaidi S, Park J, Chan JM, Roudier MP, Zhao JL, Gopalan A, Wadosky KM, Patel RA, ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR837225",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "radioligand"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38300720",
   "src": "MED",
   "pmid": "38300720",
   "doi": "10.1158/1078-0432.ccr-23-2978",
   "title": "A Phase I Study of Acapatamab, a Half-life Extended, PSMA-Targeting Bispecific T-cell Engager for Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Clinical cancer research : an official journal of the American Association for Cancer Research",
   "date": "2024-04-01",
   "authors": "Dorff T, Horvath LG, Autio K, Bernard-Tessier A, Rettig MB, Machiels JP, Bilen M",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38300720",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38534761",
   "src": "MED",
   "pmid": "38534761",
   "doi": "10.3390/cimb46030145",
   "title": "Genetic Signatures for Distinguishing Chemo-Sensitive from Chemo-Resistant Responders in Prostate Cancer Patients.",
   "journal": "Current issues in molecular biology",
   "date": "2024-03-11",
   "authors": "Gumenku L, Sekhoacha M, Abrahams B, Mashele S, Shoko A, Erukainure OL.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38534761",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "PPR811485",
   "src": "PPR",
   "pmid": null,
   "doi": "10.1101/2024.02.22.581560",
   "title": "NSD2 is a requisite subunit of the AR/FOXA1 neo-enhanceosome in promoting prostate tumorigenesis",
   "journal": null,
   "date": "2024-02-27",
   "authors": "Parolia A, Eyunni S, Verma BK, Young E, Liu L, George J, Aras S, Das CK, Mannan ",
   "oa": false,
   "url": "https://europepmc.org/article/PPR/PPR811485",
   "kind": "new-approach",
   "subject": "MYC",
   "matched": [
    "degrader",
    "PROTAC"
   ],
   "tier": "preprint",
   "peer_reviewed": false,
   "species": "unclear",
   "species_from": "none",
   "genes": [
    "MYC",
    "FOXA1"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "FOXA1"
    }
   ]
  },
  {
   "id": "38573209",
   "src": "MED",
   "pmid": "38573209",
   "doi": "10.1097/cco.0000000000001032",
   "title": "Targeting androgen biosynthesis in prostate cancer: implications on endocrine physiology.",
   "journal": "Current opinion in oncology",
   "date": "2024-02-26",
   "authors": "Kango G, Malek R, Mannuel H, Hussain A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38573209",
   "kind": "toxicity",
   "subject": "CYP11A1 inhibition (opevesostat)",
   "matched": [
    "adrenal insufficiency"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "CYP17A1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ],
   "also": [
    {
     "kind": "resistance",
     "subject": "CYP11A1 inhibition (opevesostat)"
    }
   ]
  },
  {
   "id": "38375594",
   "src": "MED",
   "pmid": "38375594",
   "doi": "10.1002/pros.24678",
   "title": "A novel HDAC6 inhibitor interferes microtubule dynamics and spindle assembly checkpoint and sensitizes cisplatin-induced apoptosis in castration-resistant prostate cancer.",
   "journal": "The Prostate",
   "date": "2024-02-20",
   "authors": "Ye PC, Leu WJ, Yeh TY, Hsu YT, Lin YC, Wei ZY, Chen YC, Chiang YC, Hsu JL, Chan ",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38375594",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "tubulin"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38346967",
   "src": "MED",
   "pmid": "38346967",
   "doi": "10.1038/s41419-024-06422-1",
   "title": "Exploiting epigenetic targets to overcome taxane resistance in prostate cancer.",
   "journal": "Cell death & disease",
   "date": "2024-02-12",
   "authors": "Cevatemre B, Bulut I, Dedeoglu B, Isiklar A, Syed H, Bayram OY, Bagci-Onder T, A",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38346967",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "taxane resistance",
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38340349",
   "src": "MED",
   "pmid": "38340349",
   "doi": "10.1002/cncr.35221",
   "title": "Safety and effectiveness of the radium-223-taxane treatment sequence in patients with metastatic castration-resistant prostate cancer in a global observational study (REASSURE).",
   "journal": "Cancer",
   "date": "2024-02-10",
   "authors": "Higano CS, Dizdarevic S, Logue J, Richardson T, George S, de Jong I, Tomaszewski",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38340349",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "38324085",
   "src": "MED",
   "pmid": "38324085",
   "doi": "10.1007/s10637-023-01410-2",
   "title": "CXCR2 antagonist navarixin in combination with pembrolizumab in select advanced solid tumors: a phase 2 randomized trial.",
   "journal": "Investigational new drugs",
   "date": "2024-02-07",
   "authors": "Armstrong AJ, Geva R, Chung HC, Lemech C, Miller WH, Hansen AR, Lee JS, Tsai F, ",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38324085",
   "kind": "toxicity",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "pneumonitis"
   ],
   "tier": "trial",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38318527",
   "src": "MED",
   "pmid": "38318527",
   "doi": "10.20517/cdr.2023.136",
   "title": "Ritonavir reverses resistance to docetaxel and cabazitaxel in prostate cancer cells with acquired resistance to docetaxel.",
   "journal": "Cancer drug resistance (Alhambra, Calif.)",
   "date": "2024-01-31",
   "authors": "van der Putten E, Wosikowski K, Beijnen JH, Imre G, Freund CR.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38318527",
   "kind": "resistance",
   "subject": "Taxanes",
   "matched": [
    "ABCB1"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "cell line",
   "species_from": "keywords",
   "genes": [
    "TUBB",
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38318136",
   "src": "MED",
   "pmid": "38318136",
   "doi": "10.3389/fphar.2024.1331648",
   "title": "Dual inhibition of MEK and PI3Kβ/δ-a potential therapeutic strategy in PTEN-wild-type docetaxel-resistant metastatic prostate cancer.",
   "journal": "Frontiers in pharmacology",
   "date": "2024-01-22",
   "authors": "Ruiz de Porras V, Bernat-Peguera A, Alcon C, Laguia F, Fernández-Saorin M, Jimén",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38318136",
   "kind": "resistance",
   "subject": "AKT inhibition (capivasertib)",
   "matched": [],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "keywords",
   "genes": [
    "AKT1",
    "PTEN",
    "PIK3CA"
   ],
   "nodes": [
    "state-metastatic"
   ]
  },
  {
   "id": "38223983",
   "src": "MED",
   "pmid": "38223983",
   "doi": "10.1097/pap.0000000000000431",
   "title": "Treatment-related Neuroendocrine Prostate Carcinoma-Diagnostic and Molecular Correlates.",
   "journal": "Advances in anatomic pathology",
   "date": "2024-01-15",
   "authors": "Gopalan A.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38223983",
   "kind": "new-approach",
   "subject": "TP53",
   "matched": [
    "antibody-drug conjugate",
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "TP53",
    "RB1",
    "MYC"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "RB1"
    },
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "38200396",
   "src": "MED",
   "pmid": "38200396",
   "doi": "10.1007/s00259-023-06585-7",
   "title": "Combination of [18F]FDG and [18F]PSMA-1007 PET/CT predicts tumour aggressiveness at staging and biochemical failure postoperatively in patients with prostate cancer.",
   "journal": "European journal of nuclear medicine and molecular imaging",
   "date": "2024-01-11",
   "authors": "Kim J, Lee S, Kim D, Kim HJ, Oh KT, Kim SJ, Choi YD, Giesel FL, Kopka K, Hoeppin",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38200396",
   "kind": "resistance",
   "subject": "PSMA radioligand therapy",
   "matched": [],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "FOLH1",
    "TUBB",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno",
    "state-metastatic"
   ]
  },
  {
   "id": "38218192",
   "src": "MED",
   "pmid": "38218192",
   "doi": "10.1016/s1470-2045(23)00638-1",
   "title": "Actinium-225-PSMA radioligand therapy of metastatic castration-resistant prostate cancer (WARMTH Act): a multicentre, retrospective study.",
   "journal": "The Lancet. Oncology",
   "date": "2024-01-11",
   "authors": "Sathekge MM, Lawal IO, Bal C, Bruchertseifer F, Ballal S, Cardaci G, Davis C, Ei",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38218192",
   "kind": "toxicity",
   "subject": "Radium-223",
   "matched": [
    "thrombocytopenia"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [],
   "nodes": []
  },
  {
   "id": "38205078",
   "src": "MED",
   "pmid": "38205078",
   "doi": "10.1177/17588359231221337",
   "title": "Development of PARP inhibitors in advanced prostate cancer.",
   "journal": "Therapeutic advances in medical oncology",
   "date": "2024-01-09",
   "authors": "Bourlon MT, Valdez P, Castro E.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38205078",
   "kind": "new-approach",
   "subject": "BRCA1",
   "matched": [
    "radioligand"
   ],
   "tier": "review",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA1"
   ],
   "nodes": []
  },
  {
   "id": "38203757",
   "src": "MED",
   "pmid": "38203757",
   "doi": "10.3390/ijms25010586",
   "title": "Comparative Evaluation of STEAP1 Targeting Chimeric Antigen Receptors with Different Costimulatory Domains and Spacers.",
   "journal": "International journal of molecular sciences",
   "date": "2024-01-02",
   "authors": "Jin Y, Dunn C, Persiconi I, Sike A, Skorstad G, Beck C, Kyte JA.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38203757",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "CAR T"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "mouse",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38846356",
   "src": "MED",
   "pmid": "38846356",
   "doi": "10.33696/cancerimmunol.6.078",
   "title": "The Role of Tumor and Host Microbiome on Immunotherapy Response in Urologic Cancers.",
   "journal": "Journal of cancer immunology",
   "date": "2024-01-01",
   "authors": "Pfail J, Drobner J, Doppalapudi K, Saraiya B, Packiam V, Ghodoussipour S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38846356",
   "kind": "resistance",
   "subject": "Checkpoint inhibitors",
   "matched": [
    "tumor microenvironment"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "PDCD1",
    "MSH2",
    "AR"
   ],
   "nodes": [
    "state-crpc-adeno"
   ]
  },
  {
   "id": "37861461",
   "src": "MED",
   "pmid": "37861461",
   "doi": "10.1158/2159-8290.cd-23-0964",
   "title": "Xaluritamig, a STEAP1 × CD3 XmAb 2+1 Immune Therapy for Metastatic Castration-Resistant Prostate Cancer: Results from Dose Exploration in a First-in-Human Study.",
   "journal": "Cancer discovery",
   "date": "2024-01-01",
   "authors": "Kelly WK, Danila DC, Lin CC, Lee JL, Matsubara N, Ward PJ, Armstrong AJ, Pook D,",
   "oa": true,
   "url": "https://europepmc.org/article/MED/37861461",
   "kind": "toxicity",
   "subject": "T-cell engagers (STEAP1)",
   "matched": [
    "cytokine release syndrome",
    "fatigue"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  },
  {
   "id": "38415240",
   "src": "MED",
   "pmid": "38415240",
   "doi": "10.33393/jcb.2024.2636",
   "title": "Detection of PSMA expression on circulating tumor cells by blood-based liquid biopsy in prostate cancer.",
   "journal": "Journal of circulating biomarkers",
   "date": "2024-01-01",
   "authors": "Gupta S, Fernandez L, Bourdon D, Hamid AA, Pasam A, Lam E, Wenstrup R, Sandhu S.",
   "oa": true,
   "url": "https://europepmc.org/article/MED/38415240",
   "kind": "new-approach",
   "subject": "BRCA2",
   "matched": [
    "radioligand"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "keywords",
   "genes": [
    "BRCA2",
    "PTEN",
    "TP53",
    "RB1",
    "MYC"
   ],
   "nodes": [],
   "also": [
    {
     "kind": "new-approach",
     "subject": "PTEN"
    },
    {
     "kind": "new-approach",
     "subject": "TP53"
    },
    {
     "kind": "new-approach",
     "subject": "RB1"
    },
    {
     "kind": "new-approach",
     "subject": "MYC"
    }
   ]
  },
  {
   "id": "38213299",
   "src": "MED",
   "pmid": "38213299",
   "doi": "10.1158/2159-8290.cd-23-1230",
   "title": "Bispecific T-cell Engagers in Metastatic Castration-Resistant Prostate Cancer.",
   "journal": "Cancer discovery",
   "date": "2024-01-01",
   "authors": "Hage Chehade C, Gebrael G, Agarwal N.",
   "oa": false,
   "url": "https://europepmc.org/article/MED/38213299",
   "kind": "new-approach",
   "subject": "STEAP1",
   "matched": [
    "bispecific"
   ],
   "tier": "primary",
   "peer_reviewed": true,
   "species": "human",
   "species_from": "mesh",
   "genes": [
    "STEAP1"
   ],
   "nodes": [
    "state-crpc",
    "state-crpc-adeno"
   ]
  }
 ],
 "cancer": "prostate",
 "gene_to_nodes": {
  "CYP17A1": [
   "state-crpc",
   "state-crpc-adeno"
  ],
  "AR": [
   "state-crpc",
   "state-crpc-adeno",
   "state-metastatic",
   "state-hspc",
   "state-confined"
  ],
  "GNRHR": [
   "state-metastatic"
  ],
  "TUBB": [
   "state-crpc",
   "state-crpc-adeno"
  ],
  "ACPP": [
   "state-crpc",
   "state-crpc-adeno"
  ],
  "PARP1": [
   "state-crpc-adeno",
   "state-metastatic"
  ],
  "FOLH1": [
   "state-crpc-adeno",
   "state-metastatic"
  ],
  "AKT1": [
   "state-metastatic"
  ],
  "PDCD1": [
   "state-crpc-adeno"
  ],
  "CYP11A1": [
   "state-crpc",
   "state-crpc-adeno"
  ],
  "STEAP1": [
   "state-crpc",
   "state-crpc-adeno"
  ]
 }
};
