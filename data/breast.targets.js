/* GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Produced by pipeline/run.py targets on 2026-10-18 04:56 UTC
 * Targets: 22   Drugs: 51 (41 matched to ClinicalTrials.gov)
 * Alteration cohort: brca_tcga_pub (Breast Invasive Carcinoma (TCGA, Nature 2012), n=825)
 *
 * Protein length and domains: UniProt (reviewed human entries).
 * Structure images: RCSB PDB, public domain. Static deposited renders,
 * not pocket views and not rotatable — the RCSB link is the real viewer.
 * Drugs: curated breast drug pipeline, joined to ClinicalTrials.gov by NCT id.
 *
 * The `gaps` block is arithmetic over these sources, not advice. The
 * repositioning list in particular is a list of questions to ask, and
 * mixes two classification axes on purpose — see its axis_note.
 */
window.CancerExplorerTargets = window.CancerExplorerTargets || {};
window.CancerExplorerTargets['breast'] = {
  "cancer": "breast",
  "cohort": {
    "id": "brca_tcga_pub",
    "name": "Breast Invasive Carcinoma (TCGA, Nature 2012)",
    "citation": "TCGA, Nature 2012",
    "pmid": "23000897",
    "n_samples": 825,
    "n_patients": 825
  },
  "sources": {
    "protein": "UniProt (Swiss-Prot, reviewed human entries)",
    "structure": "RCSB PDB",
    "structure_note": "Static deposited-structure renders. Not pocket views, and not rotatable — follow the RCSB link for an interactive viewer.",
    "alterations": "cBioPortal",
    "drugs": "curated breast drug pipeline",
    "trials": "ClinicalTrials.gov registry records, joined by NCT id",
    "evidence": "CIViC (Clinical Interpretation of Variants in Cancer)"
  },
  "n_targets": 22,
  "genes": {
    "ESR1": {
      "gene": "ESR1",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "ER protein by IHC selects endocrine therapy. Point mutations matter only later, as acquired resistance.",
      "uniprot": {
        "gene": "ESR1",
        "accession": "P03372",
        "entry_name": "ESR1_HUMAN",
        "protein": "Estrogen receptor",
        "length": 595,
        "domains": [
          {
            "kind": "Region",
            "name": "Modulating (transactivation AF-1); mediates interaction with MACROD1",
            "start": 1,
            "end": 184
          },
          {
            "kind": "Region",
            "name": "Interaction with DDX5; self-association",
            "start": 35,
            "end": 174
          },
          {
            "kind": "Region",
            "name": "Required for interaction with NCOA1",
            "start": 35,
            "end": 47
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 147,
            "end": 174
          },
          {
            "kind": "DNA binding",
            "name": "Nuclear receptor",
            "start": 185,
            "end": 250
          },
          {
            "kind": "Zinc finger",
            "name": "NR C4-type",
            "start": 185,
            "end": 205
          },
          {
            "kind": "Region",
            "name": "Mediates interaction with DNTTIP2",
            "start": 185,
            "end": 310
          },
          {
            "kind": "Zinc finger",
            "name": "NR C4-type",
            "start": 221,
            "end": 245
          },
          {
            "kind": "Region",
            "name": "Hinge",
            "start": 251,
            "end": 310
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 259,
            "end": 282
          },
          {
            "kind": "Region",
            "name": "Interaction with AKAP13",
            "start": 262,
            "end": 595
          },
          {
            "kind": "Region",
            "name": "Self-association",
            "start": 264,
            "end": 595
          },
          {
            "kind": "Domain",
            "name": "NR LBD",
            "start": 311,
            "end": 547
          },
          {
            "kind": "Region",
            "name": "Transactivation AF-2",
            "start": 311,
            "end": 595
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 553,
            "end": 573
          }
        ],
        "pdb_count": 478,
        "pdb_ids": [
          "1A52",
          "1ERE",
          "1ERR",
          "1G50",
          "1GWQ",
          "1GWR",
          "1HCP",
          "1HCQ",
          "1L2I",
          "1PCG",
          "1QKT",
          "1QKU",
          "1R5K",
          "1SJ0",
          "1UOM",
          "1X7E",
          "1X7R",
          "1XP1",
          "1XP6",
          "1XP9",
          "1XPC",
          "1XQC",
          "1YIM",
          "1YIN",
          "1ZKY",
          "2AYR",
          "2B1V",
          "2B1Z",
          "2B23",
          "2BJ4",
          "2FAI",
          "2G44",
          "2G5O",
          "2I0J",
          "2IOG",
          "2IOK",
          "2JF9",
          "2JFA",
          "2LLO",
          "2LLQ"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P03372",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P03372"
      },
      "structure": {
        "pdb": "3ERT",
        "title": "HUMAN ESTROGEN RECEPTOR ALPHA LIGAND-BINDING DOMAIN IN COMPLEX WITH 4-HYDROXYTAMOXIFEN",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.9,
        "ligands": [],
        "deposited": "1999-04-08",
        "url": "https://www.rcsb.org/structure/3ERT",
        "image": "img/3ert.jpg",
        "image_bytes": 69386
      },
      "hotspots": [],
      "n_mutated_samples": 2,
      "n_distinct_changes": 2,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 17,
              "of": 92,
              "pct": 18.5
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 55,
              "pct": 3.6
            },
            "deep_deletion": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "any_loss": {
              "n": 12,
              "of": 55,
              "pct": 21.8
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 2,
              "of": 216,
              "pct": 0.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 48,
              "of": 216,
              "pct": 22.2
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 1,
              "of": 124,
              "pct": 0.8
            },
            "amplification": {
              "n": 3,
              "of": 122,
              "pct": 2.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 33,
              "of": 122,
              "pct": 27.0
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            }
          }
        },
        "max_pct": 3.6,
        "max_node": "her2-enriched",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-3",
        "drug-4",
        "drug-5",
        "drug-35",
        "drug-10",
        "drug-11",
        "drug-14"
      ],
      "n_programs": 7,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 48,
        "n_accepted": 15,
        "best_level": "A",
        "levels": {
          "A": 15,
          "B": 7,
          "C": 8,
          "D": 18
        },
        "evidence_types": {
          "PREDICTIVE": 48
        },
        "top_therapies": [
          "Elacestrant",
          "Palbociclib",
          "Fulvestrant",
          "Tamoxifen",
          "Hormone Therapy",
          "Everolimus/Exemestane Regimen"
        ]
      },
      "selected_on": null
    },
    "ERBB2": {
      "gene": "ERBB2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Amplified and over-expressed; both the alteration and the protein level select therapy, which is why HER2-low exists.",
      "uniprot": {
        "gene": "ERBB2",
        "accession": "P04626",
        "entry_name": "ERBB2_HUMAN",
        "protein": "Receptor tyrosine-protein kinase erbB-2",
        "length": 1255,
        "domains": [
          {
            "kind": "Region",
            "name": "Required for interaction with KPNB1 and EEA1",
            "start": 676,
            "end": 689
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 720,
            "end": 987
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1035,
            "end": 1179
          },
          {
            "kind": "Region",
            "name": "Interaction with PIK3C2B",
            "start": 1195,
            "end": 1197
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1196,
            "end": 1255
          }
        ],
        "pdb_count": 63,
        "pdb_ids": [
          "1MFG",
          "1MFL",
          "1MW4",
          "1N8Z",
          "1QR1",
          "1S78",
          "2A91",
          "2JWA",
          "2KS1",
          "2L4K",
          "2N2A",
          "3BE1",
          "3H3B",
          "3MZW",
          "3N85",
          "3PP0",
          "3RCD",
          "3WLW",
          "3WSQ",
          "4GFU",
          "4HRL",
          "4HRM",
          "4HRN",
          "4NND",
          "5K33",
          "5KWG",
          "5MY6",
          "5O4G",
          "5OB4",
          "5TQS",
          "6ATT",
          "6BGT",
          "6J71",
          "6LBX",
          "6OGE",
          "7JXH",
          "7MN5",
          "7MN6",
          "7MN8",
          "7PCD"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P04626",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P04626"
      },
      "structure": {
        "pdb": "1N8Z",
        "title": "Crystal structure of extracellular domain of human HER2 complexed with Herceptin Fab",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.52,
        "ligands": [
          "NAG"
        ],
        "deposited": "2003-02-18",
        "url": "https://www.rcsb.org/structure/1N8Z",
        "image": "img/1n8z.jpg",
        "image_bytes": 67413
      },
      "hotspots": [
        {
          "change": "L755S",
          "pos": 755,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 7,
      "n_distinct_changes": 7,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 4,
              "of": 92,
              "pct": 4.3
            },
            "deep_deletion": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "any_loss": {
              "n": 30,
              "of": 92,
              "pct": 32.6
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 2,
              "of": 57,
              "pct": 3.5
            },
            "amplification": {
              "n": 39,
              "of": 55,
              "pct": 70.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 55,
              "pct": 5.5
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 3,
              "of": 224,
              "pct": 1.3
            },
            "amplification": {
              "n": 9,
              "of": 216,
              "pct": 4.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 30,
              "of": 216,
              "pct": 13.9
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 2,
              "of": 124,
              "pct": 1.6
            },
            "amplification": {
              "n": 14,
              "of": 122,
              "pct": 11.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 23,
              "of": 122,
              "pct": 18.9
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            }
          }
        },
        "max_pct": 70.9,
        "max_node": "her2-enriched",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-17",
        "drug-18",
        "drug-24",
        "drug-25",
        "drug-26",
        "drug-27",
        "drug-28",
        "drug-30",
        "drug-31",
        "drug-32",
        "drug-33",
        "drug-35",
        "drug-19",
        "drug-29",
        "drug-34"
      ],
      "n_programs": 15,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 91,
        "n_accepted": 51,
        "best_level": "A",
        "levels": {
          "A": 9,
          "B": 34,
          "C": 8,
          "D": 40
        },
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 87,
          "PREDISPOSING": 1,
          "PROGNOSTIC": 2
        },
        "top_therapies": [
          "Neratinib",
          "Trastuzumab",
          "Lapatinib",
          "Afatinib",
          "Capecitabine",
          "Trastuzumab Emtansine"
        ]
      },
      "selected_on": null
    },
    "ERBB3": {
      "gene": "ERBB3",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Mutations activate HER2/HER3 heterodimers.",
      "uniprot": {
        "gene": "ERBB3",
        "accession": "P21860",
        "entry_name": "ERBB3_HUMAN",
        "protein": "Receptor tyrosine-protein kinase erbB-3",
        "length": 1342,
        "domains": [
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 709,
            "end": 966
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 980,
            "end": 999
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1033,
            "end": 1152
          }
        ],
        "pdb_count": 23,
        "pdb_ids": [
          "1M6B",
          "2L9U",
          "3KEX",
          "3LMG",
          "3P11",
          "4LEO",
          "4P59",
          "4RIW",
          "4RIX",
          "4RIY",
          "5CUS",
          "5O4O",
          "5O7P",
          "6KBI",
          "6OP9",
          "7BHE",
          "7BHF",
          "7D85",
          "7MN5",
          "7MN6",
          "7MN8",
          "8YRY",
          "9I1Q"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P21860",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P21860"
      },
      "structure": {
        "pdb": "4P59",
        "title": "HER3 extracellular domain in complex with Fab fragment of MOR09825",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.4,
        "ligands": [
          "NAG"
        ],
        "deposited": "2014-04-16",
        "url": "https://www.rcsb.org/structure/4P59",
        "image": "img/4p59.jpg",
        "image_bytes": 61688
      },
      "hotspots": [],
      "n_mutated_samples": 8,
      "n_distinct_changes": 8,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 2,
              "of": 93,
              "pct": 2.2
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 30,
              "of": 92,
              "pct": 32.6
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 5,
              "of": 57,
              "pct": 8.8
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 55,
              "pct": 3.6
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 7,
              "of": 216,
              "pct": 3.2
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 122,
              "pct": 1.6
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 8.8,
        "max_node": "her2-enriched",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-31"
      ],
      "n_programs": 1,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 3,
        "n_accepted": 1,
        "best_level": "B",
        "levels": {
          "B": 2,
          "C": 1
        },
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Lapatinib",
          "Trastuzumab Emtansine",
          "Trastuzumab"
        ]
      },
      "selected_on": null
    },
    "PIK3CA": {
      "gene": "PIK3CA",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Activating hotspot mutations, directly targeted by alpelisib.",
      "uniprot": {
        "gene": "PIK3CA",
        "accession": "P42336",
        "entry_name": "PK3CA_HUMAN",
        "protein": "Phosphatidylinositol 4,5-bisphosphate 3-kinase catalytic subunit alpha isoform",
        "length": 1068,
        "domains": [
          {
            "kind": "Domain",
            "name": "PI3K-ABD",
            "start": 16,
            "end": 105
          },
          {
            "kind": "Domain",
            "name": "PI3K-RBD",
            "start": 187,
            "end": 289
          },
          {
            "kind": "Domain",
            "name": "C2 PI3K-type",
            "start": 330,
            "end": 487
          },
          {
            "kind": "Domain",
            "name": "PIK helical",
            "start": 517,
            "end": 694
          },
          {
            "kind": "Domain",
            "name": "PI3K/PI4K catalytic",
            "start": 765,
            "end": 1051
          },
          {
            "kind": "Region",
            "name": "G-loop",
            "start": 771,
            "end": 777
          },
          {
            "kind": "Region",
            "name": "Catalytic loop",
            "start": 912,
            "end": 920
          },
          {
            "kind": "Region",
            "name": "Activation loop",
            "start": 931,
            "end": 957
          }
        ],
        "pdb_count": 125,
        "pdb_ids": [
          "2ENQ",
          "2RD0",
          "3HHM",
          "3HIZ",
          "3ZIM",
          "4JPS",
          "4L1B",
          "4L23",
          "4L2Y",
          "4OVU",
          "4OVV",
          "4TUU",
          "4TV3",
          "4WAF",
          "4YKN",
          "4ZOP",
          "5DXH",
          "5DXT",
          "5FI4",
          "5ITD",
          "5SW8",
          "5SWG",
          "5SWO",
          "5SWP",
          "5SWR",
          "5SWT",
          "5SX8",
          "5SX9",
          "5SXA",
          "5SXB",
          "5SXC",
          "5SXD",
          "5SXE",
          "5SXF",
          "5SXI",
          "5SXJ",
          "5SXK",
          "5UBR",
          "5UK8",
          "5UKJ"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P42336",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P42336"
      },
      "structure": {
        "pdb": "4JPS",
        "title": "Co-crystal Structures of the Lipid Kinase PI3K alpha with Pan and Isoform Selective Inhibitors",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.2,
        "ligands": [],
        "deposited": "2014-04-02",
        "url": "https://www.rcsb.org/structure/4JPS",
        "image": "img/4jps.jpg",
        "image_bytes": 64817
      },
      "hotspots": [
        {
          "change": "H1047R",
          "pos": 1047,
          "type": "Missense_Mutation",
          "n": 75,
          "of": 507,
          "pct": 14.8
        },
        {
          "change": "E545K",
          "pos": 545,
          "type": "Missense_Mutation",
          "n": 35,
          "of": 507,
          "pct": 6.9
        },
        {
          "change": "E542K",
          "pos": 542,
          "type": "Missense_Mutation",
          "n": 20,
          "of": 507,
          "pct": 3.9
        },
        {
          "change": "N345K",
          "pos": 345,
          "type": "Missense_Mutation",
          "n": 12,
          "of": 507,
          "pct": 2.4
        },
        {
          "change": "H1047L",
          "pos": 1047,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 507,
          "pct": 1.4
        },
        {
          "change": "E726K",
          "pos": 726,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 507,
          "pct": 1.0
        },
        {
          "change": "G118D",
          "pos": 118,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "E453K",
          "pos": 453,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "Q546R",
          "pos": 546,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "Q546K",
          "pos": 546,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "R88Q",
          "pos": 88,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "E545A",
          "pos": 545,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "M1043I",
          "pos": 1043,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 179,
      "n_distinct_changes": 36,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 8,
              "of": 93,
              "pct": 8.6
            },
            "amplification": {
              "n": 7,
              "of": 92,
              "pct": 7.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 92,
              "pct": 3.3
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 23,
              "of": 57,
              "pct": 40.4
            },
            "amplification": {
              "n": 4,
              "of": 55,
              "pct": 7.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 104,
              "of": 224,
              "pct": 46.4
            },
            "amplification": {
              "n": 7,
              "of": 216,
              "pct": 3.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 216,
              "pct": 1.4
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 39,
              "of": 124,
              "pct": 31.5
            },
            "amplification": {
              "n": 4,
              "of": 122,
              "pct": 3.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            }
          },
          "normal-like": {
            "mutation": {
              "n": 4,
              "of": 8,
              "pct": 50.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 46.4,
        "max_node": "luminal-a",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-6",
        "drug-8"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 129,
        "n_accepted": 93,
        "best_level": "A",
        "levels": {
          "A": 33,
          "B": 19,
          "C": 5,
          "D": 72
        },
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 121,
          "PROGNOSTIC": 7
        },
        "top_therapies": [
          "Fulvestrant",
          "Trastuzumab",
          "Capivasertib",
          "Lapatinib",
          "Dactolisib",
          "Palbociclib"
        ]
      },
      "selected_on": null
    },
    "PIK3R1": {
      "gene": "PIK3R1",
      "basis": "genomic",
      "biomarker_gene": "PIK3CA",
      "why": "Regulatory subunit; mutations activate the same pathway as PIK3CA.",
      "uniprot": {
        "gene": "PIK3R1",
        "accession": "P27986",
        "entry_name": "P85A_HUMAN",
        "protein": "Phosphatidylinositol 3-kinase regulatory subunit alpha",
        "length": 724,
        "domains": [
          {
            "kind": "Domain",
            "name": "SH3",
            "start": 3,
            "end": 79
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 80,
            "end": 108
          },
          {
            "kind": "Domain",
            "name": "Rho-GAP",
            "start": 113,
            "end": 301
          },
          {
            "kind": "Domain",
            "name": "SH2 1",
            "start": 333,
            "end": 428
          },
          {
            "kind": "Domain",
            "name": "SH2 2",
            "start": 624,
            "end": 718
          }
        ],
        "pdb_count": 102,
        "pdb_ids": [
          "1A0N",
          "1AZG",
          "1H9O",
          "1PBW",
          "1PHT",
          "1PIC",
          "1PKS",
          "1PKT",
          "2IUG",
          "2IUH",
          "2IUI",
          "2RD0",
          "2V1Y",
          "3HHM",
          "3HIZ",
          "3I5R",
          "3I5S",
          "4A55",
          "4JPS",
          "4L1B",
          "4L23",
          "4L2Y",
          "4OVU",
          "4OVV",
          "4WAF",
          "4YKN",
          "4ZOP",
          "5AUL",
          "5FI4",
          "5GJI",
          "5ITD",
          "5M6U",
          "5SW8",
          "5SWG",
          "5SWO",
          "5SWP",
          "5SWR",
          "5SWT",
          "5SX8",
          "5SX9"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P27986",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P27986"
      },
      "structure": null,
      "hotspots": [
        {
          "change": "K567_L570del",
          "pos": 566,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 507,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 13,
      "n_distinct_changes": 12,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 2,
              "of": 93,
              "pct": 2.2
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "any_loss": {
              "n": 59,
              "of": 92,
              "pct": 64.1
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 4,
              "of": 57,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 14,
              "of": 55,
              "pct": 25.5
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 4,
              "of": 224,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 13,
              "of": 216,
              "pct": 6.0
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 3,
              "of": 124,
              "pct": 2.4
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 15,
              "of": 122,
              "pct": 12.3
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            }
          }
        },
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "D",
        "levels": {
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "MTOR Kinase Inhibitor PP242"
        ]
      },
      "selected_on": null
    },
    "AKT1": {
      "gene": "AKT1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "E17K and pathway activation select capivasertib.",
      "uniprot": {
        "gene": "AKT1",
        "accession": "P31749",
        "entry_name": "AKT1_HUMAN",
        "protein": "RAC-alpha serine/threonine-protein kinase",
        "length": 480,
        "domains": [
          {
            "kind": "Domain",
            "name": "PH",
            "start": 5,
            "end": 108
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 113,
            "end": 138
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 150,
            "end": 408
          },
          {
            "kind": "Domain",
            "name": "AGC-kinase C-terminal",
            "start": 409,
            "end": 480
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 450,
            "end": 480
          }
        ],
        "pdb_count": 43,
        "pdb_ids": [
          "1H10",
          "1UNP",
          "1UNQ",
          "1UNR",
          "2UVM",
          "2UZR",
          "2UZS",
          "3CQU",
          "3CQW",
          "3MV5",
          "3MVH",
          "3O96",
          "3OCB",
          "3OW4",
          "3QKK",
          "3QKL",
          "3QKM",
          "4EJN",
          "4EKK",
          "4EKL",
          "4GV1",
          "5KCV",
          "6BUU",
          "6CCY",
          "6HHF",
          "6HHG",
          "6HHH",
          "6HHI",
          "6HHJ",
          "6NPZ",
          "6S9W",
          "6S9X",
          "7APJ",
          "7MYX",
          "7NH4",
          "7NH5",
          "8JOW",
          "8UVY",
          "8UW2",
          "8UW7"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P31749",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P31749"
      },
      "structure": {
        "pdb": "4GV1",
        "title": "PKB alpha in complex with AZD5363",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.49,
        "ligands": [],
        "deposited": "2013-02-27",
        "url": "https://www.rcsb.org/structure/4GV1",
        "image": "img/4gv1.jpg",
        "image_bytes": 61791
      },
      "hotspots": [
        {
          "change": "E17K",
          "pos": 17,
          "type": "Missense_Mutation",
          "n": 11,
          "of": 507,
          "pct": 2.2
        }
      ],
      "n_mutated_samples": 12,
      "n_distinct_changes": 2,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 32,
              "of": 92,
              "pct": 34.8
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 55,
              "pct": 5.5
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 8,
              "of": 224,
              "pct": 3.6
            },
            "amplification": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "any_loss": {
              "n": 22,
              "of": 216,
              "pct": 10.2
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 3,
              "of": 124,
              "pct": 2.4
            },
            "amplification": {
              "n": 4,
              "of": 122,
              "pct": 3.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 31,
              "of": 122,
              "pct": 25.4
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            }
          }
        },
        "max_pct": 3.6,
        "max_node": "luminal-a",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-7",
        "drug-15"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 3,
        "best_level": "A",
        "levels": {
          "A": 2,
          "C": 2,
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Capivasertib",
          "Fulvestrant",
          "Akt Inhibitor MK2206"
        ]
      },
      "selected_on": null
    },
    "PTEN": {
      "gene": "PTEN",
      "basis": "genomic",
      "biomarker_gene": "AKT1",
      "why": "Loss activates PI3K/AKT; addressed downstream rather than directly.",
      "uniprot": {
        "gene": "PTEN",
        "accession": "P60484",
        "entry_name": "PTEN_HUMAN",
        "protein": "Phosphatidylinositol 3,4,5-trisphosphate 3-phosphatase and dual-specificity protein phosphatase PTEN",
        "length": 403,
        "domains": [
          {
            "kind": "Domain",
            "name": "Phosphatase tensin-type",
            "start": 14,
            "end": 185
          },
          {
            "kind": "Domain",
            "name": "C2 tensin-type",
            "start": 190,
            "end": 350
          },
          {
            "kind": "Region",
            "name": "Required for interaction with NOP53",
            "start": 338,
            "end": 348
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 352,
            "end": 403
          }
        ],
        "pdb_count": 12,
        "pdb_ids": [
          "1D5R",
          "2KYL",
          "4O1V",
          "5BUG",
          "5BZX",
          "5BZZ",
          "7JTX",
          "7JUK",
          "7JUL",
          "7JVX",
          "7PC7",
          "8X3S"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P60484",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P60484"
      },
      "structure": {
        "pdb": "1D5R",
        "title": "Crystal Structure of the PTEN Tumor Suppressor",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.1,
        "ligands": [],
        "deposited": "1999-11-04",
        "url": "https://www.rcsb.org/structure/1D5R",
        "image": "img/1d5r.jpg",
        "image_bytes": 55180
      },
      "hotspots": [
        {
          "change": "N48Tfs*6",
          "pos": 47,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 507,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 18,
      "n_distinct_changes": 18,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 1,
              "of": 93,
              "pct": 1.1
            },
            "amplification": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 5,
              "of": 92,
              "pct": 5.4
            },
            "any_loss": {
              "n": 32,
              "of": 92,
              "pct": 34.8
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "any_loss": {
              "n": 9,
              "of": 55,
              "pct": 16.4
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 10,
              "of": 224,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 216,
              "pct": 0.9
            },
            "any_loss": {
              "n": 27,
              "of": 216,
              "pct": 12.5
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 6,
              "of": 124,
              "pct": 4.8
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            },
            "any_loss": {
              "n": 29,
              "of": 122,
              "pct": 23.8
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            }
          }
        },
        "max_pct": 5.4,
        "max_node": "basal-like",
        "max_metric": "deep_deletion"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 30,
        "n_accepted": 25,
        "best_level": "A",
        "levels": {
          "A": 1,
          "B": 8,
          "C": 1,
          "D": 20
        },
        "evidence_types": {
          "PREDICTIVE": 30
        },
        "top_therapies": [
          "Trastuzumab",
          "Dactolisib",
          "Lapatinib",
          "Everolimus",
          "Capivasertib",
          "Fulvestrant"
        ]
      },
      "selected_on": null
    },
    "MTOR": {
      "gene": "MTOR",
      "basis": "pathway",
      "biomarker_gene": "PIK3CA",
      "why": "Downstream node; PI3K pathway activation drives the dependency.",
      "uniprot": {
        "gene": "MTOR",
        "accession": "P42345",
        "entry_name": "MTOR_HUMAN",
        "protein": "Serine/threonine-protein kinase mTOR",
        "length": 2549,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with NBN",
            "start": 1,
            "end": 651
          },
          {
            "kind": "Repeat",
            "name": "HEAT 1",
            "start": 16,
            "end": 53
          },
          {
            "kind": "Repeat",
            "name": "HEAT 2",
            "start": 55,
            "end": 99
          },
          {
            "kind": "Repeat",
            "name": "HEAT 3",
            "start": 100,
            "end": 137
          },
          {
            "kind": "Repeat",
            "name": "HEAT 4",
            "start": 138,
            "end": 179
          },
          {
            "kind": "Repeat",
            "name": "HEAT 5",
            "start": 180,
            "end": 220
          },
          {
            "kind": "Repeat",
            "name": "HEAT 6",
            "start": 222,
            "end": 276
          },
          {
            "kind": "Repeat",
            "name": "HEAT 7",
            "start": 277,
            "end": 313
          },
          {
            "kind": "Repeat",
            "name": "HEAT 8",
            "start": 314,
            "end": 364
          },
          {
            "kind": "Repeat",
            "name": "HEAT 9",
            "start": 365,
            "end": 409
          },
          {
            "kind": "Repeat",
            "name": "HEAT 10",
            "start": 410,
            "end": 445
          },
          {
            "kind": "Repeat",
            "name": "HEAT 11",
            "start": 446,
            "end": 494
          },
          {
            "kind": "Repeat",
            "name": "HEAT 12",
            "start": 495,
            "end": 529
          },
          {
            "kind": "Repeat",
            "name": "HEAT 13",
            "start": 530,
            "end": 563
          },
          {
            "kind": "Repeat",
            "name": "HEAT 14",
            "start": 564,
            "end": 596
          },
          {
            "kind": "Repeat",
            "name": "HEAT 15",
            "start": 597,
            "end": 636
          },
          {
            "kind": "Repeat",
            "name": "HEAT 16",
            "start": 637,
            "end": 683
          },
          {
            "kind": "Repeat",
            "name": "HEAT 17",
            "start": 686,
            "end": 724
          },
          {
            "kind": "Repeat",
            "name": "HEAT 18",
            "start": 727,
            "end": 766
          },
          {
            "kind": "Repeat",
            "name": "HEAT 19",
            "start": 769,
            "end": 811
          },
          {
            "kind": "Repeat",
            "name": "HEAT 20",
            "start": 814,
            "end": 853
          },
          {
            "kind": "Repeat",
            "name": "HEAT 21",
            "start": 857,
            "end": 893
          },
          {
            "kind": "Repeat",
            "name": "HEAT 22",
            "start": 894,
            "end": 942
          },
          {
            "kind": "Repeat",
            "name": "HEAT 23",
            "start": 943,
            "end": 988
          },
          {
            "kind": "Repeat",
            "name": "HEAT 24",
            "start": 989,
            "end": 1027
          },
          {
            "kind": "Repeat",
            "name": "HEAT 25",
            "start": 1029,
            "end": 1068
          },
          {
            "kind": "Repeat",
            "name": "HEAT 26",
            "start": 1069,
            "end": 1105
          },
          {
            "kind": "Repeat",
            "name": "HEAT 27",
            "start": 1106,
            "end": 1144
          },
          {
            "kind": "Repeat",
            "name": "HEAT 28",
            "start": 1145,
            "end": 1188
          },
          {
            "kind": "Repeat",
            "name": "HEAT 29",
            "start": 1189,
            "end": 1225
          },
          {
            "kind": "Repeat",
            "name": "HEAT 30",
            "start": 1226,
            "end": 1273
          },
          {
            "kind": "Repeat",
            "name": "HEAT 31",
            "start": 1274,
            "end": 1311
          },
          {
            "kind": "Repeat",
            "name": "HEAT 32",
            "start": 1312,
            "end": 1345
          },
          {
            "kind": "Repeat",
            "name": "TPR 1",
            "start": 1346,
            "end": 1382
          },
          {
            "kind": "Domain",
            "name": "FAT",
            "start": 1382,
            "end": 1982
          },
          {
            "kind": "Repeat",
            "name": "TPR 2",
            "start": 1383,
            "end": 1408
          },
          {
            "kind": "Repeat",
            "name": "TPR 3",
            "start": 1409,
            "end": 1442
          },
          {
            "kind": "Repeat",
            "name": "TPR 4",
            "start": 1443,
            "end": 1473
          },
          {
            "kind": "Repeat",
            "name": "TPR 5",
            "start": 1474,
            "end": 1507
          },
          {
            "kind": "Repeat",
            "name": "TPR 6",
            "start": 1508,
            "end": 1541
          },
          {
            "kind": "Repeat",
            "name": "TPR 7",
            "start": 1542,
            "end": 1574
          },
          {
            "kind": "Repeat",
            "name": "TPR 8",
            "start": 1575,
            "end": 1614
          },
          {
            "kind": "Repeat",
            "name": "TPR 9",
            "start": 1615,
            "end": 1649
          },
          {
            "kind": "Repeat",
            "name": "TPR 10",
            "start": 1650,
            "end": 1693
          },
          {
            "kind": "Repeat",
            "name": "TPR 11",
            "start": 1694,
            "end": 1731
          },
          {
            "kind": "Repeat",
            "name": "TPR 12",
            "start": 1732,
            "end": 1786
          },
          {
            "kind": "Repeat",
            "name": "TPR 13",
            "start": 1787,
            "end": 1846
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1812,
            "end": 1867
          },
          {
            "kind": "Repeat",
            "name": "TPR 14",
            "start": 1898,
            "end": 1930
          },
          {
            "kind": "Repeat",
            "name": "TPR 15",
            "start": 1931,
            "end": 1970
          },
          {
            "kind": "Repeat",
            "name": "TPR 16",
            "start": 1971,
            "end": 2005
          },
          {
            "kind": "Region",
            "name": "Sufficient for interaction with the FKBP1A/rapamycin complex",
            "start": 2012,
            "end": 2144
          },
          {
            "kind": "Domain",
            "name": "PI3K/PI4K catalytic",
            "start": 2156,
            "end": 2469
          },
          {
            "kind": "Region",
            "name": "G-loop",
            "start": 2162,
            "end": 2168
          },
          {
            "kind": "Region",
            "name": "Interaction with MLST8",
            "start": 2258,
            "end": 2296
          },
          {
            "kind": "Region",
            "name": "Catalytic loop",
            "start": 2335,
            "end": 2343
          },
          {
            "kind": "Region",
            "name": "Activation loop",
            "start": 2355,
            "end": 2380
          },
          {
            "kind": "Domain",
            "name": "FATC",
            "start": 2517,
            "end": 2549
          }
        ],
        "pdb_count": 70,
        "pdb_ids": [
          "1AUE",
          "1FAP",
          "1NSG",
          "2FAP",
          "2GAQ",
          "2NPU",
          "2RSE",
          "3FAP",
          "3JBZ",
          "4DRH",
          "4DRI",
          "4DRJ",
          "4FAP",
          "4JSN",
          "4JSP",
          "4JSV",
          "4JSX",
          "4JT5",
          "4JT6",
          "5FLC",
          "5GPG",
          "5H64",
          "5WBH",
          "5WBU",
          "5WBY",
          "5ZCS",
          "6BCU",
          "6BCX",
          "6M4U",
          "6M4W",
          "6SB0",
          "6SB2",
          "6ZWM",
          "6ZWO",
          "7EPD",
          "7OWG",
          "7PE7",
          "7PE8",
          "7PE9",
          "7PEA"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P42345",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P42345"
      },
      "structure": {
        "pdb": "4JSV",
        "title": "mTOR kinase structure, mechanism and regulation.",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.5,
        "ligands": [
          "ADP",
          "MG",
          "MGF"
        ],
        "deposited": "2013-05-01",
        "url": "https://www.rcsb.org/structure/4JSV",
        "image": "img/4jsv.jpg",
        "image_bytes": 81003
      },
      "hotspots": [],
      "n_mutated_samples": 9,
      "n_distinct_changes": 9,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 1,
              "of": 93,
              "pct": 1.1
            },
            "amplification": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 27,
              "of": 92,
              "pct": 29.3
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 3,
              "of": 57,
              "pct": 5.3
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 21,
              "of": 55,
              "pct": 38.2
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 5,
              "of": 224,
              "pct": 2.2
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 43,
              "of": 216,
              "pct": 19.9
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 48,
              "of": 122,
              "pct": 39.3
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 5.3,
        "max_node": "her2-enriched",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-8",
        "drug-9"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 5,
        "best_level": "D",
        "levels": {
          "D": 5
        },
        "evidence_types": {
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Sirolimus",
          "MTOR Kinase Inhibitor AZD8055",
          "RapaLink-1"
        ]
      },
      "selected_on": null
    },
    "CDK4": {
      "gene": "CDK4",
      "basis": "pathway",
      "biomarker_gene": "CCND1",
      "why": "Rarely mutated. The dependency comes from cyclin D–CDK4/6–RB deregulation upstream.",
      "uniprot": {
        "gene": "CDK4",
        "accession": "P11802",
        "entry_name": "CDK4_HUMAN",
        "protein": "Cyclin-dependent kinase 4",
        "length": 303,
        "domains": [
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 6,
            "end": 295
          },
          {
            "kind": "Region",
            "name": "Required for binding D-type cyclins",
            "start": 50,
            "end": 56
          }
        ],
        "pdb_count": 15,
        "pdb_ids": [
          "2W96",
          "2W99",
          "2W9F",
          "2W9Z",
          "3G33",
          "5FWK",
          "5FWL",
          "5FWM",
          "5FWP",
          "6P8E",
          "6P8F",
          "6P8G",
          "6P8H",
          "7SJ3",
          "9CSK"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P11802",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P11802"
      },
      "structure": {
        "pdb": "2W96",
        "title": "Crystal Structure of CDK4 in complex with a D-type cyclin",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.3,
        "ligands": [],
        "deposited": "2009-03-10",
        "url": "https://www.rcsb.org/structure/2W96",
        "image": "img/2w96.jpg",
        "image_bytes": 65672
      },
      "hotspots": [],
      "n_mutated_samples": 0,
      "n_distinct_changes": 0,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 26,
              "of": 92,
              "pct": 28.3
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 55,
              "pct": 3.6
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 216,
              "pct": 0.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 4,
              "of": 216,
              "pct": 1.9
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 6,
              "of": 122,
              "pct": 4.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 122,
              "pct": 1.6
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 4.9,
        "max_node": "luminal-b",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-0",
        "drug-1",
        "drug-2",
        "drug-12",
        "drug-13",
        "drug-36"
      ],
      "n_programs": 6,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "D",
        "levels": {
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Alpelisib"
        ]
      },
      "selected_on": null
    },
    "CDK6": {
      "gene": "CDK6",
      "basis": "pathway",
      "biomarker_gene": "CCND1",
      "why": "As CDK4 — the pathway is the target, not the gene.",
      "uniprot": {
        "gene": "CDK6",
        "accession": "Q00534",
        "entry_name": "CDK6_HUMAN",
        "protein": "Cyclin-dependent kinase 6",
        "length": 326,
        "domains": [
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 13,
            "end": 300
          }
        ],
        "pdb_count": 22,
        "pdb_ids": [
          "1BI7",
          "1BI8",
          "1BLX",
          "1G3N",
          "1JOW",
          "1XO2",
          "2EUF",
          "2F2C",
          "3NUP",
          "3NUX",
          "4AUA",
          "4EZ5",
          "4TTH",
          "5L2I",
          "5L2S",
          "5L2T",
          "6OQL",
          "6OQO",
          "8I0M",
          "9D8U",
          "9PE7",
          "9PE8"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q00534",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q00534"
      },
      "structure": {
        "pdb": "5L2I",
        "title": "The X-ray co-crystal structure of human CDK6 and Palbociclib.",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.75,
        "ligands": [],
        "deposited": "2016-08-24",
        "url": "https://www.rcsb.org/structure/5L2I",
        "image": "img/5l2i.jpg",
        "image_bytes": 59785
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 3,
              "of": 92,
              "pct": 3.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 6,
              "of": 92,
              "pct": 6.5
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 8,
              "of": 55,
              "pct": 14.5
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 14,
              "of": 216,
              "pct": 6.5
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 16,
              "of": 122,
              "pct": 13.1
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 3.3,
        "max_node": "basal-like",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-0",
        "drug-1",
        "drug-2",
        "drug-13"
      ],
      "n_programs": 4,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 4,
        "n_accepted": 2,
        "best_level": "B",
        "levels": {
          "B": 2,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 4
        },
        "top_therapies": [
          "Fulvestrant",
          "Palbociclib",
          "Abemaciclib"
        ]
      },
      "selected_on": null
    },
    "CCND1": {
      "gene": "CCND1",
      "basis": "pathway",
      "biomarker_gene": null,
      "why": "Amplified often, but drugged indirectly through CDK4/6.",
      "uniprot": {
        "gene": "CCND1",
        "accession": "P24385",
        "entry_name": "CCND1_HUMAN",
        "protein": "G1/S-specific cyclin-D1",
        "length": 295,
        "domains": [
          {
            "kind": "Domain",
            "name": "Cyclin N-terminal",
            "start": 28,
            "end": 152
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 262,
            "end": 295
          }
        ],
        "pdb_count": 11,
        "pdb_ids": [
          "2W96",
          "2W99",
          "2W9F",
          "2W9Z",
          "5VZU",
          "6P8E",
          "6P8F",
          "6P8G",
          "6P8H",
          "9CSK",
          "9IVD"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P24385",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P24385"
      },
      "structure": {
        "pdb": "2W96",
        "title": "Crystal Structure of CDK4 in complex with a D-type cyclin",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.3,
        "ligands": [],
        "deposited": "2009-03-10",
        "url": "https://www.rcsb.org/structure/2W96",
        "image": "img/2w96.jpg",
        "image_bytes": 65672
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 9,
              "of": 92,
              "pct": 9.8
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 9,
              "of": 55,
              "pct": 16.4
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 55,
              "pct": 3.6
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 32,
              "of": 216,
              "pct": 14.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 10,
              "of": 216,
              "pct": 4.6
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 36,
              "of": 122,
              "pct": 29.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 4,
              "of": 122,
              "pct": 3.3
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 29.5,
        "max_node": "luminal-b",
        "max_metric": "amplification"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 5,
        "best_level": "B",
        "levels": {
          "B": 4,
          "D": 1
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "PREDICTIVE": 3,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Tamoxifen",
          "Palbociclib"
        ]
      },
      "selected_on": null
    },
    "RB1": {
      "gene": "RB1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Loss predicts CDK4/6 inhibitor resistance — informative as a negative biomarker rather than as a target.",
      "uniprot": {
        "gene": "RB1",
        "accession": "P06400",
        "entry_name": "RB_HUMAN",
        "protein": "Retinoblastoma-associated protein",
        "length": 928,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 42
          },
          {
            "kind": "Region",
            "name": "Pocket; binds T and E1A",
            "start": 373,
            "end": 771
          },
          {
            "kind": "Region",
            "name": "Domain A",
            "start": 373,
            "end": 579
          },
          {
            "kind": "Region",
            "name": "Spacer",
            "start": 580,
            "end": 639
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 610,
            "end": 632
          },
          {
            "kind": "Region",
            "name": "Domain B",
            "start": 640,
            "end": 771
          },
          {
            "kind": "Region",
            "name": "Interaction with LIMD1",
            "start": 763,
            "end": 928
          },
          {
            "kind": "Region",
            "name": "Domain C; mediates interaction with E4F1",
            "start": 771,
            "end": 928
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 860,
            "end": 928
          }
        ],
        "pdb_count": 19,
        "pdb_ids": [
          "1AD6",
          "1GH6",
          "1GUX",
          "1H25",
          "1N4M",
          "1O9K",
          "1PJM",
          "2AZE",
          "2QDJ",
          "2R7G",
          "3N5U",
          "3POM",
          "4CRI",
          "4ELJ",
          "4ELL",
          "9DGK",
          "9DHC",
          "9DHF",
          "9DHU"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P06400",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P06400"
      },
      "structure": {
        "pdb": "1GUX",
        "title": "RB POCKET BOUND TO E7 LXCXE MOTIF",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.85,
        "ligands": [],
        "deposited": "1998-12-02",
        "url": "https://www.rcsb.org/structure/1GUX",
        "image": "img/1gux.jpg",
        "image_bytes": 53210
      },
      "hotspots": [],
      "n_mutated_samples": 9,
      "n_distinct_changes": 10,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 4,
              "of": 93,
              "pct": 4.3
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 6,
              "of": 92,
              "pct": 6.5
            },
            "any_loss": {
              "n": 40,
              "of": 92,
              "pct": 43.5
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 20,
              "of": 55,
              "pct": 36.4
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "any_loss": {
              "n": 58,
              "of": 216,
              "pct": 26.9
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 4,
              "of": 124,
              "pct": 3.2
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 55,
              "of": 122,
              "pct": 45.1
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 8,
              "pct": 37.5
            }
          }
        },
        "max_pct": 6.5,
        "max_node": "basal-like",
        "max_metric": "deep_deletion"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 9,
        "n_accepted": 4,
        "best_level": "B",
        "levels": {
          "B": 2,
          "C": 1,
          "D": 6
        },
        "evidence_types": {
          "PREDICTIVE": 9
        },
        "top_therapies": [
          "Palbociclib",
          "Fulvestrant",
          "Alpelisib",
          "Ribociclib",
          "Gemcitabine",
          "Checkpoint Kinase Inhibitor AZD7762"
        ]
      },
      "selected_on": null
    },
    "BRCA1": {
      "gene": "BRCA1",
      "basis": "synthetic-lethal",
      "biomarker_gene": "PARP1",
      "why": "The lesion that creates PARP dependency.",
      "uniprot": {
        "gene": "BRCA1",
        "accession": "P38398",
        "entry_name": "BRCA1_HUMAN",
        "protein": "Breast cancer type 1 susceptibility protein",
        "length": 1863,
        "domains": [
          {
            "kind": "Zinc finger",
            "name": "RING-type",
            "start": 24,
            "end": 65
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 230,
            "end": 270
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 306,
            "end": 338
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 534,
            "end": 570
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 654,
            "end": 709
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1181,
            "end": 1216
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1322,
            "end": 1387
          },
          {
            "kind": "Region",
            "name": "Interaction with PALB2",
            "start": 1397,
            "end": 1424
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1440,
            "end": 1505
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1565,
            "end": 1596
          },
          {
            "kind": "Domain",
            "name": "BRCT 1",
            "start": 1642,
            "end": 1736
          },
          {
            "kind": "Domain",
            "name": "BRCT 2",
            "start": 1756,
            "end": 1855
          }
        ],
        "pdb_count": 33,
        "pdb_ids": [
          "1JM7",
          "1JNX",
          "1N5O",
          "1OQA",
          "1T15",
          "1T29",
          "1T2U",
          "1T2V",
          "1Y98",
          "2ING",
          "3COJ",
          "3K0H",
          "3K0K",
          "3K15",
          "3K16",
          "3PXA",
          "3PXB",
          "3PXC",
          "3PXD",
          "3PXE",
          "4IFI",
          "4IGK",
          "4JLU",
          "4OFB",
          "4U4A",
          "4Y18",
          "4Y2G",
          "6G2I",
          "7JZV",
          "7LYB",
          "8GRQ",
          "8RS8",
          "9QPX"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P38398",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P38398"
      },
      "structure": {
        "pdb": "1JNX",
        "title": "Crystal structure of the BRCT repeat region from the breast cancer associated protein, BRCA1",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.5,
        "ligands": [
          "NI"
        ],
        "deposited": "2001-09-21",
        "url": "https://www.rcsb.org/structure/1JNX",
        "image": "img/1jnx.jpg",
        "image_bytes": 49797
      },
      "hotspots": [
        {
          "change": "C61G",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        }
      ],
      "n_mutated_samples": 18,
      "n_distinct_changes": 17,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 14,
              "of": 93,
              "pct": 15.1
            },
            "amplification": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "any_loss": {
              "n": 27,
              "of": 92,
              "pct": 29.3
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "any_loss": {
              "n": 28,
              "of": 55,
              "pct": 50.9
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 3,
              "of": 224,
              "pct": 1.3
            },
            "amplification": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 33,
              "of": 216,
              "pct": 15.3
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 29,
              "of": 122,
              "pct": 23.8
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            }
          }
        },
        "max_pct": 15.1,
        "max_node": "basal-like",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 12,
        "n_accepted": 10,
        "best_level": "A",
        "levels": {
          "A": 2,
          "B": 6,
          "C": 2,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 10,
          "PREDISPOSING": 2
        },
        "top_therapies": [
          "Olaparib",
          "Cisplatin",
          "Talazoparib",
          "Carboplatin",
          "Pidnarulex",
          "Quarfloxin"
        ]
      },
      "selected_on": null
    },
    "BRCA2": {
      "gene": "BRCA2",
      "basis": "synthetic-lethal",
      "biomarker_gene": "PARP1",
      "why": "The lesion that creates PARP dependency.",
      "uniprot": {
        "gene": "BRCA2",
        "accession": "P51587",
        "entry_name": "BRCA2_HUMAN",
        "protein": "Breast cancer type 2 susceptibility protein",
        "length": 3418,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with PALB2",
            "start": 1,
            "end": 40
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 37,
            "end": 68
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 358,
            "end": 381
          },
          {
            "kind": "Region",
            "name": "Interaction with NPM1",
            "start": 639,
            "end": 1000
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 1",
            "start": 1002,
            "end": 1036
          },
          {
            "kind": "Region",
            "name": "Interaction with RAD51",
            "start": 1003,
            "end": 2082
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 2",
            "start": 1212,
            "end": 1246
          },
          {
            "kind": "Region",
            "name": "Interaction with POLH",
            "start": 1338,
            "end": 1781
          },
          {
            "kind": "Region",
            "name": "Required for stimulation of POLH DNA polymerization activity",
            "start": 1410,
            "end": 1595
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 3",
            "start": 1421,
            "end": 1455
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 4",
            "start": 1517,
            "end": 1551
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 5",
            "start": 1664,
            "end": 1698
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 6",
            "start": 1837,
            "end": 1871
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 7",
            "start": 1971,
            "end": 2005
          },
          {
            "kind": "Repeat",
            "name": "BRCA2 8",
            "start": 2051,
            "end": 2085
          },
          {
            "kind": "Region",
            "name": "Interaction with HSF2BP",
            "start": 2270,
            "end": 2337
          },
          {
            "kind": "Region",
            "name": "Interaction with FANCD2",
            "start": 2350,
            "end": 2545
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2430,
            "end": 2450
          },
          {
            "kind": "Region",
            "name": "Interaction with SEM1",
            "start": 2481,
            "end": 2832
          },
          {
            "kind": "Region",
            "name": "TR2 region",
            "start": 3265,
            "end": 3330
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 3393,
            "end": 3418
          }
        ],
        "pdb_count": 14,
        "pdb_ids": [
          "1N0W",
          "3EU7",
          "6GY2",
          "6HQU",
          "7BDX",
          "7LDG",
          "8BR9",
          "8C3J",
          "8C3N",
          "8PBC",
          "8PBD",
          "8QQE",
          "8R2G",
          "8UVW"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P51587",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P51587"
      },
      "structure": {
        "pdb": "1MJE",
        "title": "STRUCTURE OF A BRCA2-DSS1-SSDNA COMPLEX",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.5,
        "ligands": [],
        "deposited": "2002-09-27",
        "url": "https://www.rcsb.org/structure/1MJE",
        "image": "img/1mje.jpg",
        "image_bytes": 45051
      },
      "hotspots": [],
      "n_mutated_samples": 24,
      "n_distinct_changes": 25,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 6,
              "of": 93,
              "pct": 6.5
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 4,
              "of": 92,
              "pct": 4.3
            },
            "any_loss": {
              "n": 34,
              "of": 92,
              "pct": 37.0
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 4,
              "of": 57,
              "pct": 7.0
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 18,
              "of": 55,
              "pct": 32.7
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 7,
              "of": 224,
              "pct": 3.1
            },
            "amplification": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 55,
              "of": 216,
              "pct": 25.5
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 6,
              "of": 124,
              "pct": 4.8
            },
            "amplification": {
              "n": 2,
              "of": 122,
              "pct": 1.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 51,
              "of": 122,
              "pct": 41.8
            }
          },
          "normal-like": {
            "mutation": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 8,
              "pct": 37.5
            }
          }
        },
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 11,
        "n_accepted": 10,
        "best_level": "A",
        "levels": {
          "A": 2,
          "B": 5,
          "C": 2,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 8,
          "PREDISPOSING": 2,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Olaparib",
          "Talazoparib",
          "Cisplatin",
          "Carboplatin",
          "Pidnarulex",
          "Quarfloxin"
        ]
      },
      "selected_on": null
    },
    "PARP1": {
      "gene": "PARP1",
      "basis": "synthetic-lethal",
      "biomarker_gene": "BRCA1/BRCA2",
      "why": "PARP1 is not the altered gene. Inhibiting it kills cells that have already lost homologous recombination — the biomarker is BRCA1/2, not PARP1.",
      "uniprot": {
        "gene": "PARP1",
        "accession": "P09874",
        "entry_name": "PARP1_HUMAN",
        "protein": "Poly [ADP-ribose] polymerase 1",
        "length": 1014,
        "domains": [
          {
            "kind": "Zinc finger",
            "name": "PARP-type 1",
            "start": 9,
            "end": 93
          },
          {
            "kind": "Zinc finger",
            "name": "PARP-type 2",
            "start": 113,
            "end": 203
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 198,
            "end": 233
          },
          {
            "kind": "Domain",
            "name": "PADR1 zinc-binding",
            "start": 225,
            "end": 359
          },
          {
            "kind": "Region",
            "name": "Zinc ribbon",
            "start": 290,
            "end": 332
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 361,
            "end": 385
          },
          {
            "kind": "Region",
            "name": "Automodification domain",
            "start": 373,
            "end": 524
          },
          {
            "kind": "Domain",
            "name": "BRCT",
            "start": 385,
            "end": 476
          },
          {
            "kind": "Domain",
            "name": "WGR",
            "start": 542,
            "end": 638
          },
          {
            "kind": "Domain",
            "name": "PARP alpha-helical",
            "start": 662,
            "end": 779
          },
          {
            "kind": "Domain",
            "name": "PARP catalytic",
            "start": 788,
            "end": 1014
          }
        ],
        "pdb_count": 106,
        "pdb_ids": [
          "1UK0",
          "1UK1",
          "1WOK",
          "2COK",
          "2CR9",
          "2CS2",
          "2DMJ",
          "2JVN",
          "2L30",
          "2L31",
          "2N8A",
          "2RCW",
          "2RD6",
          "2RIQ",
          "3GJW",
          "3GN7",
          "3L3L",
          "3L3M",
          "3OD8",
          "3ODA",
          "3ODC",
          "3ODE",
          "4AV1",
          "4DQY",
          "4GV7",
          "4HHY",
          "4HHZ",
          "4L6S",
          "4OPX",
          "4OQA",
          "4OQB",
          "4PJT",
          "4R5W",
          "4R6E",
          "4RV6",
          "4UND",
          "4UXB",
          "4XHU",
          "4ZZZ",
          "5A00"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P09874",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P09874"
      },
      "structure": {
        "pdb": "7KK4",
        "title": "Structure of the catalytic domain of PARP1 in complex with olaparib",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.96,
        "ligands": [],
        "deposited": "2021-01-06",
        "url": "https://www.rcsb.org/structure/7KK4",
        "image": "img/7kk4.jpg",
        "image_bytes": 65854
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 8,
              "of": 92,
              "pct": 8.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 92,
              "pct": 3.3
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 4,
              "of": 55,
              "pct": 7.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 5,
              "of": 216,
              "pct": 2.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 216,
              "pct": 1.4
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 5,
              "of": 122,
              "pct": 4.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 5,
              "of": 122,
              "pct": 4.1
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 8.7,
        "max_node": "basal-like",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-22",
        "drug-23"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 0,
        "best_level": null,
        "best_level_submitted": "D",
        "levels": {
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Olaparib"
        ]
      },
      "selected_on": null
    },
    "TACSTD2": {
      "gene": "TACSTD2",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "TROP2 is an ADC delivery address, not a driver — expression is the whole selection criterion.",
      "uniprot": {
        "gene": "TACSTD2",
        "accession": "P09758",
        "entry_name": "TACD2_HUMAN",
        "protein": "Tumor-associated calcium signal transducer 2",
        "length": 323,
        "domains": [
          {
            "kind": "Domain",
            "name": "Thyroglobulin type-1",
            "start": 70,
            "end": 145
          }
        ],
        "pdb_count": 7,
        "pdb_ids": [
          "2MAE",
          "2MVK",
          "2MVL",
          "7E5M",
          "7E5N",
          "7PEE",
          "9PI9"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P09758",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P09758"
      },
      "structure": {
        "pdb": "7PEE",
        "title": "Crystal structure of extracellular part of human Trop2",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.81,
        "ligands": [
          "NAG"
        ],
        "deposited": "2021-10-13",
        "url": "https://www.rcsb.org/structure/7PEE",
        "image": "img/7pee.jpg",
        "image_bytes": 65621
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 5,
              "of": 92,
              "pct": 5.4
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "any_loss": {
              "n": 16,
              "of": 55,
              "pct": 29.1
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "any_loss": {
              "n": 32,
              "of": 216,
              "pct": 14.8
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 34,
              "of": 122,
              "pct": 27.9
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 1.8,
        "max_node": "her2-enriched",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-20",
        "drug-21",
        "drug-39",
        "drug-40",
        "drug-41",
        "drug-16",
        "drug-42",
        "drug-43"
      ],
      "n_programs": 8,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 0,
        "best_level": null,
        "best_level_submitted": "B",
        "levels": {
          "B": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Sacituzumab Govitecan"
        ]
      },
      "selected_on": null
    },
    "CD274": {
      "gene": "CD274",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "PD-L1 by IHC (CPS) selects checkpoint blockade.",
      "uniprot": {
        "gene": "CD274",
        "accession": "Q9NZQ7",
        "entry_name": "PD1L1_HUMAN",
        "protein": "Programmed cell death 1 ligand 1",
        "length": 290,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like V-type",
            "start": 19,
            "end": 127
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type",
            "start": 133,
            "end": 225
          }
        ],
        "pdb_count": 74,
        "pdb_ids": [
          "3BIK",
          "3BIS",
          "3FN3",
          "3SBW",
          "4Z18",
          "4ZQK",
          "5C3T",
          "5GGT",
          "5GRJ",
          "5IUS",
          "5J89",
          "5J8O",
          "5JDR",
          "5JDS",
          "5N2D",
          "5N2F",
          "5NIU",
          "5O45",
          "5O4Y",
          "5X8L",
          "5X8M",
          "5XJ4",
          "5XXY",
          "6L8R",
          "6NM7",
          "6NM8",
          "6NNV",
          "6NOJ",
          "6NOS",
          "6NP9",
          "6PV9",
          "6R3K",
          "6RPG",
          "6VQN",
          "6YCR",
          "7BEA",
          "7C88",
          "7CZD",
          "7DCV",
          "7DY7"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q9NZQ7",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q9NZQ7"
      },
      "structure": {
        "pdb": "5X8L",
        "title": "PD-L1 in complex with atezolizumab",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.1,
        "ligands": [],
        "deposited": "2017-08-16",
        "url": "https://www.rcsb.org/structure/5X8L",
        "image": "img/5x8l.jpg",
        "image_bytes": 50875
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 10,
              "of": 92,
              "pct": 10.9
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 55,
              "pct": 3.6
            },
            "any_loss": {
              "n": 20,
              "of": 55,
              "pct": 36.4
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 31,
              "of": 216,
              "pct": 14.4
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 54,
              "of": 122,
              "pct": 44.3
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 1,
              "of": 8,
              "pct": 12.5
            }
          }
        },
        "max_pct": 3.6,
        "max_node": "her2-enriched",
        "max_metric": "deep_deletion"
      },
      "drugs": [
        "drug-46"
      ],
      "n_programs": 1,
      "best_phase": "discontinued",
      "best_phase_rank": -1,
      "civic": {
        "n_evidence_items": 4,
        "n_accepted": 2,
        "best_level": "B",
        "best_level_submitted": "A",
        "levels": {
          "A": 1,
          "B": 3
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "PREDICTIVE": 1,
          "PROGNOSTIC": 2
        },
        "top_therapies": [
          "Durvalumab"
        ]
      },
      "selected_on": null
    },
    "PDCD1": {
      "gene": "PDCD1",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "Target is on the T cell, not the tumour.",
      "uniprot": {
        "gene": "PDCD1",
        "accession": "Q15116",
        "entry_name": "PDCD1_HUMAN",
        "protein": "Programmed cell death protein 1",
        "length": 288,
        "domains": [
          {
            "kind": "Region",
            "name": "Nivolumab binding",
            "start": 25,
            "end": 34
          },
          {
            "kind": "Domain",
            "name": "Ig-like V-type",
            "start": 35,
            "end": 145
          },
          {
            "kind": "Region",
            "name": "Interaction with CD274/PDCD1L1",
            "start": 70,
            "end": 77
          },
          {
            "kind": "Region",
            "name": "Pembrolizumab binding",
            "start": 74,
            "end": 99
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 254,
            "end": 288
          }
        ],
        "pdb_count": 37,
        "pdb_ids": [
          "2M2D",
          "3RRQ",
          "4ZQK",
          "5B8C",
          "5GGR",
          "5GGS",
          "5IUS",
          "5JXE",
          "5WT9",
          "6HIG",
          "6J14",
          "6J15",
          "6JBT",
          "6JJP",
          "6K0Y",
          "6R5G",
          "6ROY",
          "6ROZ",
          "6UMT",
          "6UMU",
          "6UMV",
          "6XKR",
          "7BXA",
          "7CGW",
          "7CU5",
          "7E9B",
          "7VUX",
          "7WSL",
          "7WVM",
          "8AS0",
          "8EQ6",
          "8GY5",
          "8U31",
          "8U32",
          "9EHT",
          "9HK1",
          "9Q8L"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q15116",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q15116"
      },
      "structure": {
        "pdb": "5GGS",
        "title": "PD-1 in complex with pembrolizumab Fab",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.997,
        "ligands": [],
        "deposited": "2016-11-09",
        "url": "https://www.rcsb.org/structure/5GGS",
        "image": "img/5ggs.jpg",
        "image_bytes": 58536
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            },
            "any_loss": {
              "n": 30,
              "of": 92,
              "pct": 32.6
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 12,
              "of": 55,
              "pct": 21.8
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 1,
              "of": 224,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 20,
              "of": 216,
              "pct": 9.3
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 32,
              "of": 122,
              "pct": 26.2
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            }
          }
        },
        "max_pct": 2.2,
        "max_node": "basal-like",
        "max_metric": "deep_deletion"
      },
      "drugs": [
        "drug-37",
        "drug-38",
        "drug-42",
        "drug-44",
        "drug-45"
      ],
      "n_programs": 5,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "TP53": {
      "gene": "TP53",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "The most altered gene in the disease and still undrugged — no pocket, and restoring a lost function is harder than blocking one.",
      "uniprot": {
        "gene": "TP53",
        "accession": "P04637",
        "entry_name": "P53_HUMAN",
        "protein": "Cellular tumor antigen p53",
        "length": 393,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with CCAR2",
            "start": 1,
            "end": 320
          },
          {
            "kind": "Region",
            "name": "Interaction with HRMT1L2",
            "start": 1,
            "end": 83
          },
          {
            "kind": "Region",
            "name": "Transcription activation (acidic)",
            "start": 1,
            "end": 44
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 50,
            "end": 96
          },
          {
            "kind": "Region",
            "name": "Interaction with WWOX",
            "start": 66,
            "end": 110
          },
          {
            "kind": "Region",
            "name": "Interaction with HIPK1",
            "start": 100,
            "end": 370
          },
          {
            "kind": "Region",
            "name": "Required for interaction with ZNF385A",
            "start": 100,
            "end": 300
          },
          {
            "kind": "DNA binding",
            "name": "DNA binding",
            "start": 102,
            "end": 292
          },
          {
            "kind": "Region",
            "name": "Required for interaction with FBXO42",
            "start": 113,
            "end": 236
          },
          {
            "kind": "Region",
            "name": "Interaction with AXIN1",
            "start": 116,
            "end": 292
          },
          {
            "kind": "Region",
            "name": "Interaction with the 53BP2 SH3 domain",
            "start": 241,
            "end": 248
          },
          {
            "kind": "Region",
            "name": "Interaction with E4F1",
            "start": 256,
            "end": 294
          },
          {
            "kind": "Region",
            "name": "Interaction with DNA",
            "start": 273,
            "end": 280
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 282,
            "end": 325
          },
          {
            "kind": "Region",
            "name": "Interaction with CARM1",
            "start": 300,
            "end": 393
          },
          {
            "kind": "Region",
            "name": "Interaction with HIPK2",
            "start": 319,
            "end": 360
          },
          {
            "kind": "Region",
            "name": "Oligomerization",
            "start": 325,
            "end": 356
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 351,
            "end": 393
          },
          {
            "kind": "Region",
            "name": "Interaction with USP7",
            "start": 359,
            "end": 363
          },
          {
            "kind": "Region",
            "name": "Basic (repression of DNA-binding)",
            "start": 368,
            "end": 387
          },
          {
            "kind": "Region",
            "name": "Interaction with MORN3",
            "start": 374,
            "end": 393
          }
        ],
        "pdb_count": 311,
        "pdb_ids": [
          "1A1U",
          "1AIE",
          "1C26",
          "1DT7",
          "1GZH",
          "1H26",
          "1HS5",
          "1JSP",
          "1KZY",
          "1MA3",
          "1OLG",
          "1OLH",
          "1PES",
          "1PET",
          "1SAE",
          "1SAF",
          "1SAK",
          "1SAL",
          "1TSR",
          "1TUP",
          "1UOL",
          "1XQH",
          "1YC5",
          "1YCQ",
          "1YCR",
          "1YCS",
          "2AC0",
          "2ADY",
          "2AHI",
          "2ATA",
          "2B3G",
          "2BIM",
          "2BIN",
          "2BIO",
          "2BIP",
          "2BIQ",
          "2F1X",
          "2FEJ",
          "2FOJ",
          "2FOO"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P04637",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P04637"
      },
      "structure": {
        "pdb": "1TUP",
        "title": "TUMOR SUPPRESSOR P53 COMPLEXED WITH DNA",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.2,
        "ligands": [
          "ZN"
        ],
        "deposited": "1995-07-11",
        "url": "https://www.rcsb.org/structure/1TUP",
        "image": "img/1tup.jpg",
        "image_bytes": 63554
      },
      "hotspots": [
        {
          "change": "R175H",
          "pos": 175,
          "type": "Missense_Mutation",
          "n": 10,
          "of": 507,
          "pct": 2.0
        },
        {
          "change": "R196*",
          "pos": 196,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 507,
          "pct": 1.0
        },
        {
          "change": "Y220C",
          "pos": 220,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 507,
          "pct": 1.0
        },
        {
          "change": "R248W",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 507,
          "pct": 1.0
        },
        {
          "change": "R273C",
          "pos": 273,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 507,
          "pct": 1.0
        },
        {
          "change": "C176F",
          "pos": 176,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "H193R",
          "pos": 193,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "I195T",
          "pos": 195,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "R213*",
          "pos": 213,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "V216M",
          "pos": 216,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "R273H",
          "pos": 273,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "R342*",
          "pos": 342,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 507,
          "pct": 0.8
        },
        {
          "change": "G108Vfs*15",
          "pos": 108,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "G245D",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 507,
          "pct": 0.6
        },
        {
          "change": "R110Vfs*13",
          "pos": 110,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "X125_splice",
          "pos": 125,
          "type": "Splice_Site",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "T125=",
          "pos": 125,
          "type": "Splice_Region",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "X126_splice",
          "pos": 126,
          "type": "Splice_Site",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "K132N",
          "pos": 132,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "C141Y",
          "pos": 141,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "H179R",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "X187_splice",
          "pos": 187,
          "type": "Splice_Site",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "H193Y",
          "pos": 193,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "L194R",
          "pos": 194,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "R209Kfs*6",
          "pos": 209,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "X224_splice",
          "pos": 224,
          "type": "Splice_Site",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "C238Y",
          "pos": 238,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "N239*",
          "pos": 238,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "C242Afs*5",
          "pos": 241,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "R248Q",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "R282W",
          "pos": 282,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "Q331*",
          "pos": 331,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 507,
          "pct": 0.4
        },
        {
          "change": "X331_splice",
          "pos": 331,
          "type": "Splice_Site",
          "n": 2,
          "of": 507,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 190,
      "n_distinct_changes": 125,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 77,
              "of": 93,
              "pct": 82.8
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 92,
              "pct": 1.1
            },
            "any_loss": {
              "n": 40,
              "of": 92,
              "pct": 43.5
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 43,
              "of": 57,
              "pct": 75.4
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 35,
              "of": 55,
              "pct": 63.6
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 27,
              "of": 224,
              "pct": 12.1
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 216,
              "pct": 0.9
            },
            "any_loss": {
              "n": 94,
              "of": 216,
              "pct": 43.5
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 39,
              "of": 124,
              "pct": 31.5
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 122,
              "pct": 0.8
            },
            "any_loss": {
              "n": 67,
              "of": 122,
              "pct": 54.9
            }
          },
          "normal-like": {
            "mutation": {
              "n": 4,
              "of": 8,
              "pct": 50.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 4,
              "of": 8,
              "pct": 50.0
            }
          }
        },
        "max_pct": 82.8,
        "max_node": "basal-like",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 19,
        "n_accepted": 16,
        "best_level": "B",
        "levels": {
          "B": 13,
          "C": 3,
          "D": 2,
          "E": 1
        },
        "evidence_types": {
          "PREDICTIVE": 8,
          "PREDISPOSING": 1,
          "PROGNOSTIC": 10
        },
        "top_therapies": [
          "Tamoxifen",
          "Doxorubicin",
          "Bortezomib"
        ]
      },
      "selected_on": null
    },
    "MYC": {
      "gene": "MYC",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Amplified frequently. A transcription factor with a protein–protein interface rather than a druggable cleft.",
      "uniprot": {
        "gene": "MYC",
        "accession": "P01106",
        "entry_name": "MYC_HUMAN",
        "protein": "Myc proto-oncogene protein",
        "length": 454,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 219,
            "end": 310
          },
          {
            "kind": "Domain",
            "name": "bHLH",
            "start": 369,
            "end": 421
          },
          {
            "kind": "Region",
            "name": "Basic motif",
            "start": 369,
            "end": 382
          },
          {
            "kind": "Region",
            "name": "Helix-loop-helix motif",
            "start": 383,
            "end": 421
          },
          {
            "kind": "Region",
            "name": "Leucine-zipper",
            "start": 428,
            "end": 449
          }
        ],
        "pdb_count": 25,
        "pdb_ids": [
          "1A93",
          "1EE4",
          "1MV0",
          "1NKP",
          "2A93",
          "2OR9",
          "4Y7R",
          "5I4Z",
          "5I50",
          "6C4U",
          "6E16",
          "6E24",
          "6G6J",
          "6G6K",
          "6G6L",
          "7T1Y",
          "7T1Z",
          "8J2Q",
          "8OTS",
          "8OTT",
          "8Q1N",
          "8WLG",
          "8X8S",
          "8X8V",
          "9QNH"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P01106",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P01106"
      },
      "structure": {
        "pdb": "1NKP",
        "title": "Crystal structure of Myc-Max recognizing DNA",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.8,
        "ligands": [],
        "deposited": "2003-02-04",
        "url": "https://www.rcsb.org/structure/1NKP",
        "image": "img/1nkp.jpg",
        "image_bytes": 38079
      },
      "hotspots": [],
      "n_mutated_samples": 1,
      "n_distinct_changes": 1,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 1,
              "of": 93,
              "pct": 1.1
            },
            "amplification": {
              "n": 29,
              "of": 92,
              "pct": 31.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 2,
              "of": 92,
              "pct": 2.2
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 13,
              "of": 55,
              "pct": 23.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 16,
              "of": 216,
              "pct": 7.4
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 216,
              "pct": 1.4
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 19,
              "of": 122,
              "pct": 15.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 3,
              "of": 122,
              "pct": 2.5
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 31.5,
        "max_node": "basal-like",
        "max_metric": "amplification"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "AR": {
      "gene": "AR",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "AR-positive by IHC defines the LAR TNBC subset.",
      "uniprot": {
        "gene": "AR",
        "accession": "P10275",
        "entry_name": "ANDR_HUMAN",
        "protein": "Androgen receptor",
        "length": 920,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with ZNF318",
            "start": 1,
            "end": 587
          },
          {
            "kind": "Region",
            "name": "Modulating",
            "start": 1,
            "end": 559
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 36,
            "end": 167
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 195,
            "end": 228
          },
          {
            "kind": "Region",
            "name": "Interaction with LPXN",
            "start": 552,
            "end": 919
          },
          {
            "kind": "DNA binding",
            "name": "Nuclear receptor",
            "start": 560,
            "end": 632
          },
          {
            "kind": "Zinc finger",
            "name": "NR C4-type",
            "start": 560,
            "end": 580
          },
          {
            "kind": "Region",
            "name": "Interaction with HIPK3",
            "start": 572,
            "end": 662
          },
          {
            "kind": "Region",
            "name": "Interaction with CCAR1",
            "start": 592,
            "end": 919
          },
          {
            "kind": "Zinc finger",
            "name": "NR C4-type",
            "start": 596,
            "end": 620
          },
          {
            "kind": "Region",
            "name": "Interaction with KAT7",
            "start": 625,
            "end": 919
          },
          {
            "kind": "Domain",
            "name": "NR LBD",
            "start": 669,
            "end": 900
          }
        ],
        "pdb_count": 95,
        "pdb_ids": [
          "1E3G",
          "1GS4",
          "1T5Z",
          "1T63",
          "1T65",
          "1XJ7",
          "1XOW",
          "1XQ3",
          "1Z95",
          "2AM9",
          "2AMA",
          "2AMB",
          "2AO6",
          "2AX6",
          "2AX7",
          "2AX8",
          "2AX9",
          "2AXA",
          "2HVC",
          "2OZ7",
          "2PIO",
          "2PIP",
          "2PIQ",
          "2PIR",
          "2PIT",
          "2PIU",
          "2PIV",
          "2PIW",
          "2PIX",
          "2PKL",
          "2PNU",
          "2Q7I",
          "2Q7J",
          "2Q7K",
          "2Q7L",
          "2YHD",
          "2YLO",
          "2YLP",
          "2YLQ",
          "2Z4J"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P10275",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P10275"
      },
      "structure": {
        "pdb": "2AM9",
        "title": "Crystal structure of human androgen receptor ligand binding domain in complex with testosterone",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.64,
        "ligands": [
          "DTT"
        ],
        "deposited": "2006-05-16",
        "url": "https://www.rcsb.org/structure/2AM9",
        "image": "img/2am9.jpg",
        "image_bytes": 59692
      },
      "hotspots": [],
      "n_mutated_samples": 4,
      "n_distinct_changes": 4,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 3,
              "of": 93,
              "pct": 3.2
            },
            "amplification": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 1,
              "of": 57,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 55,
              "pct": 0.0
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 216,
              "pct": 0.0
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 3.2,
        "max_node": "basal-like",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "D",
        "levels": {
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Dactolisib"
        ]
      },
      "selected_on": null
    },
    "FGFR1": {
      "gene": "FGFR1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Amplification is the selector.",
      "uniprot": {
        "gene": "FGFR1",
        "accession": "P11362",
        "entry_name": "FGFR1_HUMAN",
        "protein": "Fibroblast growth factor receptor 1",
        "length": 822,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 1",
            "start": 25,
            "end": 119
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 120,
            "end": 154
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 2",
            "start": 158,
            "end": 246
          },
          {
            "kind": "Region",
            "name": "Heparin-binding",
            "start": 160,
            "end": 177
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 3",
            "start": 255,
            "end": 357
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 478,
            "end": 767
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 778,
            "end": 822
          }
        ],
        "pdb_count": 83,
        "pdb_ids": [
          "1AGW",
          "1CVS",
          "1EVT",
          "1FGI",
          "1FGK",
          "1FQ9",
          "1XR0",
          "2CR3",
          "2FGI",
          "3C4F",
          "3DPK",
          "3GQI",
          "3GQL",
          "3JS2",
          "3KRJ",
          "3KRL",
          "3KXX",
          "3KY2",
          "3OJV",
          "3RHX",
          "3TT0",
          "4F63",
          "4F64",
          "4F65",
          "4NK9",
          "4NKA",
          "4NKS",
          "4RWI",
          "4RWJ",
          "4RWK",
          "4RWL",
          "4UWB",
          "4UWC",
          "4UWY",
          "4V01",
          "4V04",
          "4V05",
          "4WUN",
          "4ZSA",
          "5A46"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P11362",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P11362"
      },
      "structure": {
        "pdb": "4V05",
        "title": "FGFR1 in complex with AZD4547.",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.57,
        "ligands": [],
        "deposited": "2014-12-10",
        "url": "https://www.rcsb.org/structure/4V05",
        "image": "img/4v05.jpg",
        "image_bytes": 61095
      },
      "hotspots": [],
      "n_mutated_samples": 0,
      "n_distinct_changes": 0,
      "sequenced_of": 507,
      "frequency": {
        "by_node": {
          "basal-like": {
            "mutation": {
              "n": 0,
              "of": 93,
              "pct": 0.0
            },
            "amplification": {
              "n": 5,
              "of": 92,
              "pct": 5.4
            },
            "deep_deletion": {
              "n": 0,
              "of": 92,
              "pct": 0.0
            },
            "any_loss": {
              "n": 22,
              "of": 92,
              "pct": 23.9
            }
          },
          "her2-enriched": {
            "mutation": {
              "n": 0,
              "of": 57,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "deep_deletion": {
              "n": 1,
              "of": 55,
              "pct": 1.8
            },
            "any_loss": {
              "n": 16,
              "of": 55,
              "pct": 29.1
            }
          },
          "luminal-a": {
            "mutation": {
              "n": 0,
              "of": 224,
              "pct": 0.0
            },
            "amplification": {
              "n": 22,
              "of": 216,
              "pct": 10.2
            },
            "deep_deletion": {
              "n": 1,
              "of": 216,
              "pct": 0.5
            },
            "any_loss": {
              "n": 34,
              "of": 216,
              "pct": 15.7
            }
          },
          "luminal-b": {
            "mutation": {
              "n": 0,
              "of": 124,
              "pct": 0.0
            },
            "amplification": {
              "n": 22,
              "of": 122,
              "pct": 18.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 122,
              "pct": 0.0
            },
            "any_loss": {
              "n": 25,
              "of": 122,
              "pct": 20.5
            }
          },
          "normal-like": {
            "mutation": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 8,
              "pct": 25.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 8,
              "pct": 0.0
            }
          }
        },
        "max_pct": 18.0,
        "max_node": "luminal-b",
        "max_metric": "amplification"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 26,
        "n_accepted": 20,
        "best_level": "B",
        "levels": {
          "B": 17,
          "C": 3,
          "D": 6
        },
        "evidence_types": {
          "PREDICTIVE": 21,
          "PROGNOSTIC": 5
        },
        "top_therapies": [
          "Lucitanib",
          "Fulvestrant",
          "Sunitinib",
          "Dovitinib",
          "Erdafitinib",
          "Palbociclib"
        ]
      },
      "selected_on": null
    }
  },
  "drugs": [
    {
      "id": "drug-0",
      "name": "Palbociclib (Ibrance)",
      "code": "PD-0332991",
      "target": "CDK4/6",
      "genes": [
        "CDK4",
        "CDK6"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "PALOMA-2 / PALOMA-3",
      "nct_id": "NCT01740427",
      "line": "1L-2L metastatic",
      "status": "approved",
      "readout": "PFS benefit with ET; OS not significant in PALOMA-2",
      "readout_date": "2015-02-03",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+ and/or PR+; HER2 IHC 0-2+/ISH-",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study of Palbociclib (PD-0332991) + Letrozole vs. Letrozole For 1st Line Treatment Of Postmenopausal Women With ER+/HER2- Advanced Breast Cancer (PALOMA-2)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 666,
        "start_date": "2013-02-22",
        "primary_completion_date": "2016-02-26",
        "last_update_posted": "2024-11-14",
        "url": "https://clinicaltrials.gov/study/NCT01740427"
      },
      "label": {
        "matched_brand": "Ibrance",
        "matched_generic": "PALBOCICLIB",
        "manufacturer": "U.S. Pharmaceuticals",
        "effective_time": "20260706",
        "spl_id": "342c459f-fe40-4422-bc31-88d16fbbd4df",
        "boxed": null,
        "warnings": [
          "Neutropenia",
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "neutropenia, infections, leukopenia, fatigue, nausea, alopecia, stomatitis, diarrhea, anemia, rash, asthenia, thrombocytopenia, vomiting, decreased appetite, dry skin, pyrexia, and dysgeusia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/89a142d5-7e61-48bf-9e77-e2cd124c4792/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Ibrance\""
      }
    },
    {
      "id": "drug-1",
      "name": "Ribociclib (Kisqali)",
      "code": "LEE011",
      "target": "CDK4/6",
      "genes": [
        "CDK4",
        "CDK6"
      ],
      "modality": "small molecule",
      "company": "Novartis",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "MONALEESA-2/3/7; NATALEE (adjuvant)",
      "nct_id": "NCT01958021",
      "line": "1L metastatic; adjuvant early",
      "status": "approved",
      "readout": "OS benefit in MONALEESA-2/3/7; iDFS benefit in NATALEE",
      "readout_date": "2017-03-13",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+ and/or PR+; HER2-negative",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study of Efficacy and Safety of LEE011 in Postmenopausal Women With Advanced Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Novartis Pharmaceuticals",
        "enrollment": 668,
        "start_date": "2013-12-17",
        "primary_completion_date": "2016-01-29",
        "last_update_posted": "2025-03-07",
        "url": "https://clinicaltrials.gov/study/NCT01958021"
      },
      "label": {
        "matched_brand": "KISQALI",
        "matched_generic": "RIBOCICLIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260701",
        "spl_id": "9466e642-f230-43f3-b78e-5a432fa040ee",
        "boxed": null,
        "warnings": [
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Severe Cutaneous Adverse Reactions (SCARs)",
          "QT Interval Prolongation",
          "Prolongation with Concomitant Use of Tamoxifen",
          "Hepatotoxicity",
          "Neutropenia",
          "Embryo-Fetal Toxicity",
          "Pointes (TdP), including those with"
        ],
        "common": {
          "text": "lymphocytes decreased, leukocytes decreased, neutrophils decreased, hemoglobin decreased, alanine aminotransferase increased, aspartate aminotransferase increased, infections, creatinine increased, platelets decreased, headache, nausea, and fatigue",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/aaeaef94-f3f5-4367-8ea2-b181d7be2da8/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Kisqali\""
      }
    },
    {
      "id": "drug-2",
      "name": "Abemaciclib (Verzenio)",
      "code": "LY2835219",
      "target": "CDK4/6",
      "genes": [
        "CDK4",
        "CDK6"
      ],
      "modality": "small molecule",
      "company": "Eli Lilly",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "MONARCH-2/3; monarchE (adjuvant)",
      "nct_id": "NCT02107703",
      "line": "1L-2L metastatic; adjuvant high-risk early",
      "status": "approved",
      "readout": "OS benefit MONARCH-2; sustained iDFS benefit monarchE",
      "readout_date": "2017-09-28",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+ and/or PR+; HER2-negative",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study of Abemaciclib (LY2835219) Combined With Fulvestrant in Women With Hormone Receptor Positive HER2 Negative Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Eli Lilly and Company",
        "enrollment": 669,
        "start_date": "2014-07-22",
        "primary_completion_date": "2017-02-14",
        "last_update_posted": "2026-10-14",
        "url": "https://clinicaltrials.gov/study/NCT02107703"
      },
      "label": {
        "matched_brand": "Verzenio",
        "matched_generic": "abemaciclib",
        "manufacturer": null,
        "effective_time": "20260713",
        "spl_id": "5b2d0f4e-5bba-4048-a2f0-bcb4b779efc0",
        "boxed": null,
        "warnings": [
          "Diarrhea",
          "Neutropenia",
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Hepatotoxicity",
          "Venous Thromboembolism",
          "Embryo-Fetal Toxicity",
          "ILD or pneumonitis of any grade"
        ],
        "common": {
          "text": "diarrhea, neutropenia, nausea, abdominal pain, infections, fatigue, anemia, leukopenia, decreased appetite, vomiting, headache, alopecia, and thrombocytopenia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/be4bc0de-0fdc-4d46-8d25-be43c79e6a06/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Verzenio\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-3",
      "name": "Elacestrant (Orserdu)",
      "code": "RAD1901",
      "target": "ER (oral SERD)",
      "genes": [
        "ESR1"
      ],
      "modality": "small molecule",
      "company": "Stemline Therapeutics",
      "partner": "Menarini Group",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "EMERALD",
      "nct_id": "NCT03778931",
      "line": "2L+ metastatic after ET",
      "status": "approved",
      "readout": "PFS benefit vs SoC ET in ESR1-mutant population",
      "readout_date": "2023-01-27",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; ESR1-mutated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Phase 3 Trial of Elacestrant Versus Standard of Care for the Treatment of ER+/HER2- Advanced Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Stemline Therapeutics, Inc.",
        "enrollment": 478,
        "start_date": "2019-05-10",
        "primary_completion_date": "2021-08-24",
        "last_update_posted": "2025-09-15",
        "url": "https://clinicaltrials.gov/study/NCT03778931"
      },
      "label": {
        "matched_brand": "ORSERDU",
        "matched_generic": "ELACESTRANT",
        "manufacturer": "Stemline Therapeutics, Inc.",
        "effective_time": "20260624",
        "spl_id": "040abaf0-7a15-11f1-b55a-0800200c9a66",
        "boxed": null,
        "warnings": [
          "Dyslipidemia",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "musculoskeletal pain, nausea, increased cholesterol, increased AST, increased triglycerides, fatigue, decreased hemoglobin, vomiting, increased ALT, decreased sodium, increased creatinine, decreased appetite, diarrhea, headache, constipation, abdominal pain, hot flush, and dyspepsia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/aa66ae5c-2bd2-4444-8178-b55651e054ef/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Orserdu\""
      }
    },
    {
      "id": "drug-4",
      "name": "Imlunestrant (Inluriyo)",
      "code": "LY3484356",
      "target": "ER (oral SERD)",
      "genes": [
        "ESR1"
      ],
      "modality": "small molecule",
      "company": "Eli Lilly",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "EMBER-3",
      "nct_id": "NCT04975308",
      "line": "2L+ metastatic after >=1 line ET",
      "status": "approved",
      "readout": "PFS HR 0.62 (p=0.0007); ~11.4 mo numerical OS advantage in ESR1m",
      "readout_date": "2025-09-25",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; ESR1-mutated",
      "source_url": "https://www.onclive.com/view/emerging-data-with-oral-serds-reframe-frontline-and-post-cdk4-6-decisions-in-er-breast-cancer",
      "registry": {
        "title": "A Study of Imlunestrant, Investigator's Choice of Endocrine Therapy, and Imlunestrant Plus Abemaciclib in Participants With ER+, HER2- Advanced Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Eli Lilly and Company",
        "enrollment": 874,
        "start_date": "2021-10-04",
        "primary_completion_date": "2024-06-24",
        "last_update_posted": "2026-07-22",
        "url": "https://clinicaltrials.gov/study/NCT04975308"
      },
      "label": {
        "matched_brand": "Inluriyo",
        "matched_generic": "imlunestrant",
        "manufacturer": null,
        "effective_time": "20260604",
        "spl_id": "d4c7332d-4da7-4d70-8813-4cecd53fff2a",
        "boxed": null,
        "warnings": [
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "hemoglobin decreased, musculoskeletal pain, calcium decreased, neutrophils decreased, AST increased, fatigue, diarrhea, ALT increased, triglycerides increased, nausea, platelets decreased, constipation, cholesterol increased, and abdominal pain",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/5bc172e4-e8a2-441a-be52-279a7f890196/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Inluriyo\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-5",
      "name": "Vepdegestrant (Veppanu)",
      "code": "ARV-471",
      "target": "ER (PROTAC degrader)",
      "genes": [
        "ESR1"
      ],
      "modality": "degrader",
      "company": "Arvinas",
      "partner": "Pfizer (prior collaboration)",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "VERITAC-2",
      "nct_id": "NCT05654623",
      "line": "2L+ advanced/metastatic",
      "status": "approved",
      "readout": "First FDA-approved PROTAC. ESR1m mPFS 5.0 vs 2.1 mo; ORR 19% vs 4%",
      "readout_date": "2026-05-01",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; ESR1-mutated",
      "source_url": "https://ir.arvinas.com/news-releases/news-release-details/arvinas-announces-fda-approval-veppanu-vepdegestrant-treatment",
      "registry": {
        "title": "A Study to Learn About a New Medicine Called Vepdegestrant (ARV-471, PF-07850327) in People Who Have Advanced Metastatic Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 624,
        "start_date": "2023-03-03",
        "primary_completion_date": "2025-01-31",
        "last_update_posted": "2026-03-18",
        "url": "https://clinicaltrials.gov/study/NCT05654623"
      },
      "label": {
        "matched_brand": "VEPPANU",
        "matched_generic": "VEPDEGESTRANT",
        "manufacturer": "Rigel Pharmaceuticals, Inc.",
        "effective_time": "20260612",
        "spl_id": "3e8ae2a7-cbca-4a8c-86d8-41892cd03b2d",
        "boxed": null,
        "warnings": [
          "QTc Interval Prolongation",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased white blood cells, increased AST, musculoskeletal pain, fatigue, decreased hemoglobin, decreased neutrophils, increased ALT, increased alkaline phosphatase, nausea, decreased blood potassium, increased bilirubin, decreased appetite, electrocardiogram QT prolonged, decreased platelets, and constipation",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/484e21ba-8fe1-4c6d-b923-8ba4cf5b2f20/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Veppanu\""
      }
    },
    {
      "id": "drug-6",
      "name": "Alpelisib (Piqray)",
      "code": "BYL719",
      "target": "PI3K-alpha",
      "genes": [
        "PIK3CA"
      ],
      "modality": "small molecule",
      "company": "Novartis",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "SOLAR-1",
      "nct_id": "NCT02437318",
      "line": "2L+ metastatic with fulvestrant",
      "status": "approved",
      "readout": "PFS 11.0 vs 5.7 mo in PIK3CA-mutant",
      "readout_date": "2019-05-24",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; PIK3CA-mutated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study Assessing the Efficacy and Safety of Alpelisib Plus Fulvestrant in Men and Postmenopausal Women With Advanced Breast Cancer Which Progressed on or After Aromatase Inhibitor Treatment.",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Novartis Pharmaceuticals",
        "enrollment": 572,
        "start_date": "2015-07-23",
        "primary_completion_date": "2018-06-12",
        "last_update_posted": "2025-02-13",
        "url": "https://clinicaltrials.gov/study/NCT02437318"
      },
      "label": {
        "matched_brand": "PIQRAY",
        "matched_generic": "ALPELISIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20251215",
        "spl_id": "b4a9e0a0-a882-485b-918f-7134992246ce",
        "boxed": null,
        "warnings": [
          "Severe Hypersensitivity",
          "Severe Cutaneous Adverse Reactions (SCARs)",
          "Hyperglycemia",
          "Pneumonitis",
          "Diarrhea or Colitis",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "glucose increased, creatinine increased, diarrhea, rash, lymphocyte count decreased, gamma-glutamyl transferase (GGT) increased, nausea, alanine aminotransferase (ALT) increased, fatigue, hemoglobin decreased, lipase increased, decreased appetite, stomatitis, vomiting, weight decreased, calcium decreased, glucose decreased, activated partial thromboplastin time (aPTT) prolonged, and alopecia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/b20b4e18-7a4b-4500-a08f-06c6dab0ee5b/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Piqray\""
      }
    },
    {
      "id": "drug-7",
      "name": "Capivasertib (Truqap)",
      "code": "AZD5363",
      "target": "AKT",
      "genes": [
        "AKT1"
      ],
      "modality": "small molecule",
      "company": "AstraZeneca",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CAPItello-291",
      "nct_id": "NCT04305496",
      "line": "2L+ metastatic with fulvestrant",
      "status": "approved",
      "readout": "PFS 7.3 vs 3.1 mo in altered population",
      "readout_date": "2023-11-16",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; PIK3CA/AKT1/PTEN-altered",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Capivasertib+Fulvestrant vs Placebo+Fulvestrant as Treatment for Locally Advanced (Inoperable) or Metastatic HR+/HER2- Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 818,
        "start_date": "2020-04-16",
        "primary_completion_date": "2023-05-09",
        "last_update_posted": "2026-04-30",
        "url": "https://clinicaltrials.gov/study/NCT04305496"
      },
      "label": {
        "matched_brand": "TRUQAP",
        "matched_generic": "capivasertib",
        "manufacturer": null,
        "effective_time": "20260612",
        "spl_id": "d2081b19-6f23-454d-b426-2710d8319f23",
        "boxed": null,
        "warnings": [
          "Hyperglycemia",
          "Diarrhea",
          "Cutaneous Adverse Reactions",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "diarrhea (72%), cutaneous adverse reactions (58%), increased random glucose (57%), decreased lymphocytes (47%), decreased hemoglobin (45%), increased fasting glucose (37%), nausea and fatigue (35% each), decreased leukocytes (32%), increased triglycerides (27%), decreased neutrophils (23%), increased creatinine (22%), vomiting (21%), and stomatitis (20%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/d698c106-2322-401e-b738-cbd83c843ecf/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Truqap\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-8",
      "name": "Gedatolisib (Revtorpyk)",
      "code": "PF-05212384",
      "target": "pan-class I PI3K + mTORC1/2",
      "genes": [
        "PIK3CA",
        "MTOR"
      ],
      "modality": "small molecule",
      "company": "Celcuity",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "VIKTORIA-1 (PIK3CA wild-type cohort)",
      "nct_id": "NCT05501886",
      "line": "2L+ metastatic after >=1 line ET",
      "status": "approved",
      "readout": "76% and 67% reduction in progression/death risk vs fulvestrant (triplet and doublet)",
      "readout_date": "2026-07-14",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; PIK3CA WILD-TYPE",
      "source_url": "https://ir.celcuity.com/news-releases/news-release-details/celcuity-announces-fda-approval-revtorpyktm-gedatolisib",
      "registry": {
        "title": "Gedatolisib Plus Fulvestrant With or Without Palbociclib vs Standard-of-Care for the Treatment of Patients With Advanced or Metastatic HR+/HER2- Breast Cancer (VIKTORIA-1)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Celcuity Inc",
        "enrollment": 701,
        "start_date": "2022-12-08",
        "primary_completion_date": "2026-06-30",
        "last_update_posted": "2026-02-10",
        "url": "https://clinicaltrials.gov/study/NCT05501886"
      },
      "label": {
        "matched_brand": "REVTORPYK",
        "matched_generic": "gedatolisib",
        "manufacturer": null,
        "effective_time": "20260714",
        "spl_id": "2102ca90-3d7d-4983-8606-6fe67b92aaef",
        "boxed": null,
        "warnings": [
          "Stomatitis",
          "Dermatologic Adverse Reactions",
          "Hyperglycemia",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased white blood cells, decreased neutrophils, decreased hemoglobin, decreased lymphocytes, stomatitis, nausea, decreased platelets, increased fasting glucose, fatigue, vomiting, rash, constipation, diarrhea, increased alanine aminotransferase (ALT), increased aspartate aminotransferase (AST), musculoskeletal pain, decreased sodium, and increased eosinophils",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/959d73ef-831f-4005-956c-210702270bda/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Revtorpyk\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-9",
      "name": "Everolimus (Afinitor)",
      "code": "RAD001",
      "target": "mTOR",
      "genes": [
        "MTOR"
      ],
      "modality": "small molecule",
      "company": "Novartis",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "BOLERO-2",
      "nct_id": "NCT00863655",
      "line": "2L+ metastatic with exemestane",
      "status": "approved",
      "readout": "PFS benefit with exemestane after NSAI failure",
      "readout_date": "2012-07-20",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Everolimus in Combination With Exemestane in the Treatment of Postmenopausal Women With Estrogen Receptor Positive Locally Advanced or Metastatic Breast Cancer Who Are Refractory to Letrozole or Anastrozole",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Novartis Pharmaceuticals",
        "enrollment": 724,
        "start_date": "2009-06-03",
        "primary_completion_date": "2014-12-04",
        "last_update_posted": "2017-05-02",
        "url": "https://clinicaltrials.gov/study/NCT00863655"
      },
      "label": {
        "matched_brand": "Afinitor",
        "matched_generic": "EVEROLIMUS",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260601",
        "spl_id": "b808a4e0-23a8-40c8-834d-b31cd642febe",
        "boxed": null,
        "warnings": [
          "Non-Infectious Pneumonitis",
          "Infections",
          "Severe Hypersensitivity Reactions",
          "Angioedema",
          "Stomatitis",
          "Renal Failure",
          "Risk of Impaired Wound Healing",
          "Geriatric Patients",
          "Metabolic Disorders",
          "Myelosuppression",
          "Reduced Immune Response with Vaccination",
          "Radiation Sensitization and Radiation Recall"
        ],
        "common": {
          "text": "stomatitis, infections, rash, fatigue, diarrhea, edema, abdominal pain, nausea, fever, asthenia, cough, headache, and decreased appetite",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2150f73a-179b-4afc-b8ce-67c85cc72f04/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Afinitor\""
      }
    },
    {
      "id": "drug-10",
      "name": "Giredestrant",
      "code": "RG6171 / GDC-9545",
      "target": "ER (oral SERD)",
      "genes": [
        "ESR1"
      ],
      "modality": "small molecule",
      "company": "Roche",
      "partner": "Genentech",
      "phase": "filed",
      "phase_rank": 6,
      "trial_name": "lidERA Breast Cancer",
      "nct_id": "NCT04961996",
      "line": "adjuvant early-stage",
      "status": "filed",
      "readout": "Significant iDFS improvement; first oral SERD positive in curative setting. PDUFA 2026-11-30",
      "readout_date": "2026-06-02",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; stage I-III early disease",
      "source_url": "https://www.roche.com/media/releases/med-cor-2026-06-02",
      "registry": {
        "title": "A Study Evaluating the Efficacy and Safety of Adjuvant Giredestrant Compared With Physician's Choice of Adjuvant Endocrine Monotherapy in Participants With Estrogen Receptor-Positive, HER2-Negative Early Breast Cancer (lidERA Breast Cancer)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 4170,
        "start_date": "2021-08-27",
        "primary_completion_date": "2025-08-08",
        "last_update_posted": "2026-10-15",
        "url": "https://clinicaltrials.gov/study/NCT04961996"
      }
    },
    {
      "id": "drug-11",
      "name": "Camizestrant",
      "code": "AZD9833",
      "target": "ER (oral SERD)",
      "genes": [
        "ESR1"
      ],
      "modality": "small molecule",
      "company": "AstraZeneca",
      "partner": "",
      "phase": "filed",
      "phase_rank": 6,
      "trial_name": "SERENA-6",
      "nct_id": "NCT04964934",
      "line": "1L switch on ctDNA-detected ESR1m",
      "status": "filed",
      "readout": "mPFS 16.0-16.6 vs 9.2 mo (HR ~0.44-0.46). ODAC voted 6-3 AGAINST 2026-04-30; FDA date extended. CHMP positive in EU",
      "readout_date": "2026-04-30",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; emergent ESR1 mutation on ctDNA",
      "source_url": "https://www.astrazeneca.com/media-centre/press-releases/2026/fda-odac-vote-on-camizestrant-breast-cancer.html",
      "registry": {
        "title": "Phase III Study to Assess AZD9833+ CDK4/6 Inhibitor in HR+/HER2-MBC With Detectable ESR1m Before Progression (SERENA-6)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 315,
        "start_date": "2021-06-30",
        "primary_completion_date": "2025-06-30",
        "last_update_posted": "2026-09-23",
        "url": "https://clinicaltrials.gov/study/NCT04964934"
      },
      "label": {
        "matched_brand": "ETCAMAH",
        "matched_generic": "CAMIZESTRANT",
        "manufacturer": "AstraZeneca Pharmaceuticals LP",
        "effective_time": "20260904",
        "spl_id": "c54223d3-f3c7-4186-afa0-429d84805826",
        "boxed": {
          "headline": "WARNING: ARRHYTHMIA RISK WITH CONCOMITANT USE OF Q",
          "text": "WARNING: ARRHYTHMIA RISK WITH CONCOMITANT USE OF QTc INTERVAL PROLONGING DRUGS ETCAMAH in combination with ribociclib, a QTc interval prolonging drug and a strong CYP3A inhibitor, or in combination with other QTc interval prolonging drugs, can increase the risk of Torsades de Pointes, other ventricular arrhythmias, and sudden death ( 5.1 , 5.2 , 7.1 ). Avoid concomitant use of ETCAMAH with products (other than ribociclib) known to prolong the QTc interval and/or have a known risk of Torsades de Pointes. If concomitant use with other products cannot be avoided, monitor the QTc interval more fre…"
        },
        "warnings": [
          "Bradycardia",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased neutrophils, decreased leukocytes, decreased hemoglobin, decreased lymphocytes, decreased platelets, visual disturbances, and fatigue",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/c54223d3-f3c7-4186-afa0-429d84805826/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Camizestrant\""
      }
    },
    {
      "id": "drug-12",
      "name": "Atirmociclib",
      "code": "PF-07220060",
      "target": "CDK4-selective (CDK6-sparing)",
      "genes": [
        "CDK4"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "FOURLIGHT-3 (with letrozole)",
      "nct_id": "NCT06760637",
      "line": "1L metastatic",
      "status": "phase 3",
      "readout": "Positive phase 2 readouts early 2026; phase 3 active. Corrected 2026-07-26 — the previously cited NCT04730349 is the phase 1/2a study and is now TERMINATED",
      "readout_date": "2026-01-01",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; post-CDK4/6i",
      "source_url": "https://clinicaltrials.gov/study/NCT06760637",
      "registry": {
        "title": "Study of PF-07220060 With Letrozole in Adults With HR-positive HER2-negative Breast Cancer Who Have Not Received Anticancer Treatment for Advanced/Metastatic Disease",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 1035,
        "start_date": "2025-01-06",
        "primary_completion_date": "2029-01-02",
        "last_update_posted": "2026-10-16",
        "url": "https://clinicaltrials.gov/study/NCT06760637"
      }
    },
    {
      "id": "drug-13",
      "name": "Culmerciclib",
      "code": "TQB3616",
      "target": "CDK2/4/6",
      "genes": [
        "CDK4",
        "CDK6"
      ],
      "modality": "small molecule",
      "company": "Chia Tai Tianqing",
      "partner": "",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "TQB3616-III-04",
      "nct_id": "",
      "line": "2L+ advanced with fulvestrant",
      "status": "phase 3",
      "readout": "Randomized double-blind phase 3 positive with fulvestrant",
      "readout_date": "2026-01-01",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; previously treated",
      "source_url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12714862/"
    },
    {
      "id": "drug-14",
      "name": "Vepdegestrant",
      "code": "ARV-471",
      "target": "ER (PROTAC degrader)",
      "genes": [
        "ESR1"
      ],
      "modality": "degrader",
      "company": "Arvinas",
      "partner": "",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "VERITAC-3",
      "nct_id": "NCT05909397",
      "line": "1L combination with CDK4/6i",
      "status": "phase 3",
      "readout": "Estimated completion August 2028",
      "readout_date": "2028-08-01",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; ESR1-mutated",
      "source_url": "https://oncodaily.com/oncolibrary/breast-oncology/oral-serd",
      "registry": {
        "title": "Vepdegestrant (ARV-471/PF-07850327) + Palbociclib vs Letrozole + Palbociclib in ER(+)/HER2(-) Advanced Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 59,
        "start_date": "2023-08-09",
        "primary_completion_date": "2026-12-30",
        "last_update_posted": "2026-02-10",
        "url": "https://clinicaltrials.gov/study/NCT05909397"
      },
      "label": {
        "matched_brand": "VEPPANU",
        "matched_generic": "VEPDEGESTRANT",
        "manufacturer": "Rigel Pharmaceuticals, Inc.",
        "effective_time": "20260612",
        "spl_id": "3e8ae2a7-cbca-4a8c-86d8-41892cd03b2d",
        "boxed": null,
        "warnings": [
          "QTc Interval Prolongation",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased white blood cells, increased AST, musculoskeletal pain, fatigue, decreased hemoglobin, decreased neutrophils, increased ALT, increased alkaline phosphatase, nausea, decreased blood potassium, increased bilirubin, decreased appetite, electrocardiogram QT prolonged, decreased platelets, and constipation",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/484e21ba-8fe1-4c6d-b923-8ba4cf5b2f20/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Vepdegestrant\""
      }
    },
    {
      "id": "drug-15",
      "name": "TER-2013",
      "code": "TER-2013",
      "target": "AKT1-selective",
      "genes": [
        "AKT1"
      ],
      "modality": "small molecule",
      "company": "Terremoto Biosciences",
      "partner": "",
      "phase": "phase 1/2",
      "phase_rank": 2,
      "trial_name": "not disclosed",
      "nct_id": "",
      "line": "2L+ after ET and CDK4/6i",
      "status": "phase 1/2",
      "readout": "FDA Fast Track designation granted 2026-06-03",
      "readout_date": "2026-06-03",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; AKT/PI3K/PTEN-altered",
      "source_url": "https://www.onclive.com/view/fda-flashback-breast-cancer-decisions-and-news-from-june-2026"
    },
    {
      "id": "drug-16",
      "name": "Sacituzumab tirumotecan",
      "code": "sac-TMT / MK-2870 / SKB264",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Merck",
      "partner": "Kelun Biotech",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "TroFuse-010",
      "nct_id": "NCT06312176",
      "line": "2L+ after ET incl. CDK4/6i",
      "status": "phase 3",
      "readout": "n=1200; +/- pembrolizumab vs TPC. Readout anticipated 2027",
      "readout_date": "2027-01-01",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; HER2-low or HER2-zero",
      "source_url": "https://clinicaltrials.gov/study/NCT06312176",
      "registry": {
        "title": "A Study of Sacituzumab Tirumotecan (MK-2870) as a Single Agent and in Combination With Pembrolizumab (MK-3475) Versus Treatment of Physician's Choice in Participants With HR+/HER2- Unresectable Locally Advanced or Metastatic Breast Cancer (MK-2870-010)",
        "overall_status": "RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 1200,
        "start_date": "2024-04-14",
        "primary_completion_date": "2027-07-11",
        "last_update_posted": "2026-10-13",
        "url": "https://clinicaltrials.gov/study/NCT06312176"
      }
    },
    {
      "id": "drug-17",
      "name": "Trastuzumab deruxtecan (Enhertu)",
      "code": "DS-8201 / T-DXd",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "DESTINY-Breast04",
      "nct_id": "NCT03734029",
      "line": "2L+ metastatic HER2-low",
      "status": "approved",
      "readout": "mPFS 9.9 vs 5.1 mo; mOS 23.4 vs 16.8 mo",
      "readout_date": "2022-08-05",
      "subtype_label": "HER2-low",
      "nodes": [
        "her2-low"
      ],
      "receptor_context": "HR+ and HER2 IHC 1+ or 2+/ISH-",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Trastuzumab Deruxtecan (DS-8201a) Versus Investigator's Choice for HER2-low Breast Cancer That Has Spread or Cannot be Surgically Removed [DESTINY-Breast04]",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Daiichi Sankyo",
        "enrollment": 557,
        "start_date": "2018-12-27",
        "primary_completion_date": "2022-01-11",
        "last_update_posted": "2026-09-28",
        "url": "https://clinicaltrials.gov/study/NCT03734029"
      },
      "label": {
        "matched_brand": "Enhertu",
        "matched_generic": "FAM-TRASTUZUMAB DERUXTECAN-NXKI",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260515",
        "spl_id": "a4106ba4-f398-4663-980c-2b7195283edd",
        "boxed": {
          "headline": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis",
          "text": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis, including severe, life-threatening, and fatal cases, have been reported with ENHERTU. Monitor for and promptly investigate signs and symptoms including cough, dyspnea, fever, and other new or worsening respiratory symptoms. Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis. Advise patients of the risk and the need to immediately report symptoms [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) ] . Embryo-Fetal Toxicity: Exposure …"
        },
        "warnings": [
          "Neutropenia",
          "Left Ventricular Dysfunction (LVD)"
        ],
        "common": {
          "text": "decreased white blood cell count (73%), nausea (72%), decreased hemoglobin (67%), decreased neutrophil count (65%), decreased lymphocyte count (60%), fatigue (55%), decreased platelet count (48%), increased aspartate aminotransferase (46%), increased alanine aminotransferase (43%), increased blood alkaline phosphatase (39%), vomiting (38%), alopecia (37%), constipation (32%), decreased blood potassium (32%), decreased appetite (31%), diarrhea (30%), and musculoskeletal pain (24%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7e67e73e-ddf4-4e4d-8b50-09d7514910b6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Enhertu\""
      }
    },
    {
      "id": "drug-18",
      "name": "Trastuzumab deruxtecan (Enhertu)",
      "code": "DS-8201 / T-DXd",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "DESTINY-Breast06",
      "nct_id": "NCT04494425",
      "line": "after >=1 line ET; chemo-naive metastatic",
      "status": "approved",
      "readout": "Extended benefit to HER2-ultralow; established the ultralow category",
      "readout_date": "2025-01-27",
      "subtype_label": "HER2-low / HER2-ultralow",
      "nodes": [
        "her2-low",
        "her2-ultralow"
      ],
      "receptor_context": "HR+ and HER2 IHC 1+/2+ISH- or IHC 0 with faint incomplete staining",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study of Trastuzumab Deruxtecan (T-DXd) vs Investigator's Choice Chemotherapy in HER2-low, Hormone Receptor Positive, Metastatic Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 866,
        "start_date": "2020-07-24",
        "primary_completion_date": "2024-03-18",
        "last_update_posted": "2026-03-04",
        "url": "https://clinicaltrials.gov/study/NCT04494425"
      },
      "label": {
        "matched_brand": "Enhertu",
        "matched_generic": "FAM-TRASTUZUMAB DERUXTECAN-NXKI",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260515",
        "spl_id": "a4106ba4-f398-4663-980c-2b7195283edd",
        "boxed": {
          "headline": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis",
          "text": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis, including severe, life-threatening, and fatal cases, have been reported with ENHERTU. Monitor for and promptly investigate signs and symptoms including cough, dyspnea, fever, and other new or worsening respiratory symptoms. Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis. Advise patients of the risk and the need to immediately report symptoms [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) ] . Embryo-Fetal Toxicity: Exposure …"
        },
        "warnings": [
          "Neutropenia",
          "Left Ventricular Dysfunction (LVD)"
        ],
        "common": {
          "text": "decreased white blood cell count (73%), nausea (72%), decreased hemoglobin (67%), decreased neutrophil count (65%), decreased lymphocyte count (60%), fatigue (55%), decreased platelet count (48%), increased aspartate aminotransferase (46%), increased alanine aminotransferase (43%), increased blood alkaline phosphatase (39%), vomiting (38%), alopecia (37%), constipation (32%), decreased blood potassium (32%), decreased appetite (31%), diarrhea (30%), and musculoskeletal pain (24%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7e67e73e-ddf4-4e4d-8b50-09d7514910b6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Enhertu\""
      }
    },
    {
      "id": "drug-19",
      "name": "BNT323 / DB-1303",
      "code": "BNT323 / DB-1303 / trastuzumab pamirtecan",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "BioNTech",
      "partner": "DualityBio",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "DYNASTY-Breast02",
      "nct_id": "NCT06018337",
      "line": "2L+ endocrine-resistant metastatic",
      "status": "phase 3",
      "readout": "n=532 vs chemotherapy; primary completion May 2026",
      "readout_date": "2026-05-01",
      "subtype_label": "HER2-low",
      "nodes": [
        "her2-low"
      ],
      "receptor_context": "HR+ endocrine-resistant HER2-low",
      "source_url": "https://clinicaltrials.gov/study/NCT06018337",
      "registry": {
        "title": "A Study of DB-1303/BNT323 vs Investigator's Choice Chemotherapy in HER2-Low, Hormone Receptor Positive Metastatic Breast Cancer (DYNASTY-Breast02)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "DualityBio Inc.",
        "enrollment": 541,
        "start_date": "2024-01-18",
        "primary_completion_date": "2026-08-12",
        "last_update_posted": "2026-09-24",
        "url": "https://clinicaltrials.gov/study/NCT06018337"
      }
    },
    {
      "id": "drug-20",
      "name": "Sacituzumab govitecan (Trodelvy)",
      "code": "IMMU-132",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Gilead Sciences",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "TROPiCS-02",
      "nct_id": "NCT03901339",
      "line": "3L+ metastatic",
      "status": "approved",
      "readout": "PFS and OS benefit vs TPC",
      "readout_date": "2023-02-03",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; HER2-negative pretreated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study of Sacituzumab Govitecan-hziy Versus Treatment of Physician's Choice in Participants With HR+/HER2- Metastatic Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Gilead Sciences",
        "enrollment": 543,
        "start_date": "2019-05-08",
        "primary_completion_date": "2023-10-20",
        "last_update_posted": "2024-10-21",
        "url": "https://clinicaltrials.gov/study/NCT03901339"
      },
      "label": {
        "matched_brand": "TRODELVY",
        "matched_generic": "SACITUZUMAB GOVITECAN",
        "manufacturer": "Gilead Sciences, Inc.",
        "effective_time": "20260624",
        "spl_id": "2085d741-19ba-4115-bbe9-0debac82c204",
        "boxed": {
          "headline": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold",
          "text": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold TRODELVY for absolute neutrophil count below 1500/mm 3 or neutropenic fever. Monitor blood cell counts periodically during treatment. Primary prophylaxis with G-CSF is recommended for all patients at increased risk of febrile neutropenia [see Dosage and Administration (2.4) ] . Initiate anti-infective treatment in patients with febrile neutropenia without delay [see Warnings and Precautions (5.1) ]. TRODELVY can cause severe diarrhea. Monitor patients with diarrhea and give fluid and e…"
        },
        "warnings": [
          "Infusion-Related Reactions",
          "Nausea/Vomiting",
          "Patients with Reduced UGT1A1 Activity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased leukocyte count, decreased neutrophil count, decreased hemoglobin, nausea, diarrhea, decreased lymphocyte count, fatigue, alopecia, increased glucose, constipation, vomiting, decreased albumin, increased alkaline phosphatase, decreased appetite, abdominal pain, decreased creatinine clearance, decreased magnesium, and decreased potassium",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/57a597d2-03f0-472e-b148-016d7169169d/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Trodelvy\""
      }
    },
    {
      "id": "drug-21",
      "name": "Datopotamab deruxtecan (Datroway)",
      "code": "DS-1062 / Dato-DXd",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "TROPION-Breast01",
      "nct_id": "NCT05104866",
      "line": "2L+ metastatic",
      "status": "approved",
      "readout": "PFS benefit vs investigator's choice chemotherapy",
      "readout_date": "2025-01-17",
      "subtype_label": "HR+/HER2-",
      "nodes": [
        "hr-pos-her2-neg"
      ],
      "receptor_context": "ER+; HER2-negative pretreated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Phase-3, Open-Label, Randomized Study of Dato-DXd Versus Investigator's Choice of Chemotherapy (ICC) in Participants With Inoperable or Metastatic HR-Positive, HER2-Negative Breast Cancer Who Have Been Treated With One or Two Prior Lines of Systemic Chemotherapy (TROPION-Breast01)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 732,
        "start_date": "2021-10-18",
        "primary_completion_date": "2024-07-24",
        "last_update_posted": "2026-08-24",
        "url": "https://clinicaltrials.gov/study/NCT05104866"
      },
      "label": {
        "matched_brand": "DATROWAY",
        "matched_generic": "DATOPOTAMAB DERUXTECAN",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260527",
        "spl_id": "c5c6cd04-1bea-4809-a830-b1fb1ba94e97",
        "boxed": null,
        "warnings": [
          "Lung Disease (ILD) and Pneumonitis",
          "Ocular Adverse Reactions",
          "Stomatitis/Oral Mucositis",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "stomatitis, nausea, alopecia, fatigue, decreased hemoglobin, decreased lymphocytes, constipation, increased calcium, increased AST, decreased white blood cell count, increased lactate dehydrogenase, musculoskeletal pain, decreased appetite, increased ALT, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2950227c-6230-4ca4-a135-46e44d9424a0/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Datroway\""
      }
    },
    {
      "id": "drug-22",
      "name": "Olaparib (Lynparza)",
      "code": "AZD2281",
      "target": "PARP",
      "genes": [
        "PARP1"
      ],
      "modality": "small molecule",
      "company": "AstraZeneca",
      "partner": "Merck",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "OlympiAD; OlympiA (adjuvant)",
      "nct_id": "NCT02000622",
      "line": "metastatic and adjuvant high-risk",
      "status": "approved",
      "readout": "PFS benefit metastatic; iDFS and OS benefit adjuvant",
      "readout_date": "2018-01-12",
      "subtype_label": "HER2-negative (HR+ or TNBC)",
      "nodes": [
        "hr-pos-her2-neg",
        "tnbc"
      ],
      "receptor_context": "germline BRCA1/2-mutated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Assessment of the Efficacy and Safety of Olaparib Monotherapy Versus Physicians Choice Chemotherapy in the Treatment of Metastatic Breast Cancer Patients With Germline BRCA1/2 Mutations.",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 302,
        "start_date": "2014-03-27",
        "primary_completion_date": "2016-12-09",
        "last_update_posted": "2026-02-13",
        "url": "https://clinicaltrials.gov/study/NCT02000622"
      },
      "label": {
        "matched_brand": "Lynparza",
        "matched_generic": "OLAPARIB",
        "manufacturer": "AstraZeneca Pharmaceuticals LP",
        "effective_time": "20250710",
        "spl_id": "0142c57f-6211-4638-8c48-c215686871b8",
        "boxed": null,
        "warnings": [
          "Syndrome/Acute Myeloid Leukemia (MDS/AML)",
          "Pneumonitis",
          "Including Drug-induced liver injury (DILI)",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "nausea, fatigue (including asthenia), anemia, vomiting, diarrhea, decreased appetite, headache, dysgeusia, cough, neutropenia, dyspnea, dizziness, dyspepsia, leukopenia, and thrombocytopenia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/741ff3e3-dc1a-45a6-84e5-2481b27131aa/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Lynparza\""
      }
    },
    {
      "id": "drug-23",
      "name": "Talazoparib (Talzenna)",
      "code": "BMN-673",
      "target": "PARP",
      "genes": [
        "PARP1"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "EMBRACA",
      "nct_id": "NCT01945775",
      "line": "metastatic",
      "status": "approved",
      "readout": "mPFS 8.6 vs 5.6 mo vs chemotherapy",
      "readout_date": "2018-10-16",
      "subtype_label": "HER2-negative (HR+ or TNBC)",
      "nodes": [
        "hr-pos-her2-neg",
        "tnbc"
      ],
      "receptor_context": "germline BRCA1/2-mutated",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study Evaluating Talazoparib (BMN 673), a PARP Inhibitor, in Advanced and/or Metastatic Breast Cancer Patients With BRCA Mutation (EMBRACA Study)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 431,
        "start_date": "2013-10-14",
        "primary_completion_date": "2017-09-15",
        "last_update_posted": "2022-01-20",
        "url": "https://clinicaltrials.gov/study/NCT01945775"
      },
      "label": {
        "matched_brand": "Talzenna",
        "matched_generic": "TALAZOPARIB",
        "manufacturer": "U.S. Pharmaceuticals",
        "effective_time": "20260601",
        "spl_id": "245347ef-49f2-4b24-9892-b43489562a46",
        "boxed": null,
        "warnings": [
          "Syndrome/Acute Myeloid Leukemia (MDS/AML)",
          "Myelosuppression",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "• Hemoglobin decreased, neutrophils decreased, lymphocytes decreased, platelets decreased, fatigue, glucose increased, aspartate aminotransferase increased, alkaline phosphatase increased, alanine aminotransferase increased, calcium decreased, nausea, headache, vomiting, alopecia, diarrhea, and decreased appetite",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/13839d4f-6acf-4ffb-a128-79df59319273/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Talzenna\""
      }
    },
    {
      "id": "drug-24",
      "name": "Trastuzumab (Herceptin)",
      "code": "",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "mAb",
      "company": "Roche",
      "partner": "Genentech",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "HERA; NSABP B-31",
      "nct_id": "",
      "line": "adjuvant and metastatic backbone",
      "status": "approved",
      "readout": "Foundational HER2 therapy; large adjuvant survival benefit",
      "readout_date": "1998-09-25",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "label": {
        "matched_brand": "Herceptin",
        "matched_generic": "TRASTUZUMAB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260529",
        "spl_id": "7517f775-6a10-4ddd-8dfb-6704ece413d0",
        "boxed": {
          "headline": "WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY WARNING: CARDIOMYOP",
          "text": "WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY See full prescribing information for complete boxed warning Cardiomyopathy: Herceptin can result in subclinical and clinical cardiac failure manifesting as CHF, and decreased LVEF, with greatest risk when administered concurrently with anthracyclines. Evaluate cardiac function prior to and during treatment. Discontinue Herceptin for cardiomyopathy. ( 2.5 , 5.1 ) Infusion Reactions, Pulmonary Toxicity: Discontinue H…"
        },
        "warnings": [],
        "common": {
          "text": "headache, diarrhea, nausea, and chills. ( 6.1 ) Metastatic Breast Cancer Most common adverse reactions (≥ 10%) are fever, chills, headache, infection, congestive heart failure, insomnia, cough, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/492dbdb2-077e-4064-bff3-372d6af0a7a2/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Herceptin\""
      }
    },
    {
      "id": "drug-25",
      "name": "Pertuzumab (Perjeta)",
      "code": "",
      "target": "HER2 dimerization",
      "genes": [
        "ERBB2"
      ],
      "modality": "mAb",
      "company": "Roche",
      "partner": "Genentech",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CLEOPATRA; APHINITY",
      "nct_id": "NCT00567190",
      "line": "1L metastatic; adjuvant",
      "status": "approved",
      "readout": "mOS 56.5 vs 40.8 mo with trastuzumab + docetaxel",
      "readout_date": "2012-06-08",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study to Evaluate Pertuzumab + Trastuzumab + Docetaxel vs. Placebo + Trastuzumab + Docetaxel in Previously Untreated HER2-Positive Metastatic Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Genentech, Inc.",
        "enrollment": 808,
        "start_date": "2008-02-12",
        "primary_completion_date": "2011-05-13",
        "last_update_posted": "2019-12-13",
        "url": "https://clinicaltrials.gov/study/NCT00567190"
      },
      "label": {
        "matched_brand": "PERJETA",
        "matched_generic": "PERTUZUMAB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260430",
        "spl_id": "dfebfe9c-a0c5-41d8-bf11-ed643627e264",
        "boxed": {
          "headline": "WARNING: LEFT VENTRICULAR DYSFUNCTION and EMBRYO-FETAL TOXICITY Left Ventricular Dysfunction: PERJETA can caus",
          "text": "WARNING: LEFT VENTRICULAR DYSFUNCTION and EMBRYO-FETAL TOXICITY Left Ventricular Dysfunction: PERJETA can cause subclinical and clinical cardiac failure manifesting as decreased LVEF and CHF. Evaluate cardiac function prior to and during treatment. Discontinue PERJETA treatment for a confirmed clinically significant decrease in left ventricular function [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) and Adverse Reactions (6.1) ]. Embryo-fetal Toxicity: Exposure to PERJETA can cause embryo-fetal death and birth defects. Advise patients of these risks and the need for effe…"
        },
        "warnings": [
          "Infusion-Related Reactions",
          "Hypersensitivity Reactions/Anaphylaxis"
        ],
        "common": {
          "text": "diarrhea, alopecia, neutropenia, nausea, fatigue, rash, and peripheral neuropathy",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/17f85d17-ab71-4f5b-9fe3-0b8c822f69ff/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Perjeta\""
      }
    },
    {
      "id": "drug-26",
      "name": "Trastuzumab emtansine (Kadcyla)",
      "code": "T-DM1",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Roche",
      "partner": "Genentech",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "EMILIA; KATHERINE",
      "nct_id": "NCT00829166",
      "line": "adjuvant residual disease; metastatic",
      "status": "approved",
      "readout": "KATHERINE: 50% reduction in iDFS events vs trastuzumab",
      "readout_date": "2013-02-22",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study of Trastuzumab Emtansine Versus Capecitabine + Lapatinib in Participants With HER2-positive Locally Advanced or Metastatic Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 991,
        "start_date": "2009-02",
        "primary_completion_date": "2012-07",
        "last_update_posted": "2016-10-31",
        "url": "https://clinicaltrials.gov/study/NCT00829166"
      },
      "label": {
        "matched_brand": "KADCYLA",
        "matched_generic": "ADO-TRASTUZUMAB EMTANSINE",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260401",
        "spl_id": "27ab596b-f625-4866-b65a-54508ffce760",
        "boxed": {
          "headline": "WARNING: HEPATOTOXICITY, CARDIAC TOXICITY, EMBRYO-FETAL TOXICITY",
          "text": "WARNING: HEPATOTOXICITY, CARDIAC TOXICITY, EMBRYO-FETAL TOXICITY Hepatotoxicity: Serious hepatotoxicity has been reported, including liver failure and death in patients treated with KADCYLA. Monitor serum transaminases and bilirubin prior to initiation of KADCYLA treatment and prior to each KADCYLA dose. Reduce dose or discontinue KADCYLA as appropriate in cases of increased serum transaminases or total bilirubin. ( 2.3 , 5.1 ) Cardiac Toxicity: KADCYLA administration may lead to reductions in left ventricular ejection fraction (LVEF). Evaluate left ventricular function in all patients prior t…"
        },
        "warnings": [
          "Pulmonary Toxicity",
          "Related Reactions, Hypersensitivity Reactions",
          "Hemorrhage",
          "Thrombocytopenia",
          "Neurotoxicity"
        ],
        "common": {
          "text": "fatigue, nausea, musculoskeletal pain, hemorrhage, thrombocytopenia, headache, increased transaminases, constipation and epistaxis",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/23f3c1f4-0fc8-4804-a9e3-04cf25dd302e/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Kadcyla\""
      }
    },
    {
      "id": "drug-27",
      "name": "Trastuzumab deruxtecan (Enhertu)",
      "code": "DS-8201 / T-DXd",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "DESTINY-Breast03",
      "nct_id": "NCT03529110",
      "line": "2L metastatic",
      "status": "approved",
      "readout": "Superior PFS and OS vs T-DM1; new 2L standard",
      "readout_date": "2022-05-04",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "DS-8201a Versus T-DM1 for Human Epidermal Growth Factor Receptor 2 (HER2)-Positive, Unresectable and/or Metastatic Breast Cancer Previously Treated With Trastuzumab and Taxane [DESTINY-Breast03]",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Daiichi Sankyo",
        "enrollment": 524,
        "start_date": "2018-08-09",
        "primary_completion_date": "2021-05-21",
        "last_update_posted": "2026-10-07",
        "url": "https://clinicaltrials.gov/study/NCT03529110"
      },
      "label": {
        "matched_brand": "Enhertu",
        "matched_generic": "FAM-TRASTUZUMAB DERUXTECAN-NXKI",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260515",
        "spl_id": "a4106ba4-f398-4663-980c-2b7195283edd",
        "boxed": {
          "headline": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis",
          "text": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis, including severe, life-threatening, and fatal cases, have been reported with ENHERTU. Monitor for and promptly investigate signs and symptoms including cough, dyspnea, fever, and other new or worsening respiratory symptoms. Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis. Advise patients of the risk and the need to immediately report symptoms [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) ] . Embryo-Fetal Toxicity: Exposure …"
        },
        "warnings": [
          "Neutropenia",
          "Left Ventricular Dysfunction (LVD)"
        ],
        "common": {
          "text": "decreased white blood cell count (73%), nausea (72%), decreased hemoglobin (67%), decreased neutrophil count (65%), decreased lymphocyte count (60%), fatigue (55%), decreased platelet count (48%), increased aspartate aminotransferase (46%), increased alanine aminotransferase (43%), increased blood alkaline phosphatase (39%), vomiting (38%), alopecia (37%), constipation (32%), decreased blood potassium (32%), decreased appetite (31%), diarrhea (30%), and musculoskeletal pain (24%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7e67e73e-ddf4-4e4d-8b50-09d7514910b6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Enhertu\""
      }
    },
    {
      "id": "drug-28",
      "name": "Trastuzumab deruxtecan (Enhertu)",
      "code": "DS-8201 / T-DXd",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "DESTINY-Breast11",
      "nct_id": "NCT05113251",
      "line": "neoadjuvant followed by THP; adjuvant residual disease",
      "status": "approved",
      "readout": "Two new early-stage indications. Higher pCR and lower toxicity vs ddAC-THP",
      "readout_date": "2026-05-15",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH+ stage II-III",
      "source_url": "https://www.astrazeneca-us.com/media/press-releases/2026/ENHERTU-fam-trastuzumab-deruxtecan-nxki-approved-in-the-US-for-two-new-indications-for-patients-with-HER2-positive-early-breast-cancer.html",
      "registry": {
        "title": "Trastuzumab Deruxtecan (T-DXd) Alone or in Sequence With THP, Versus Standard Treatment (ddAC-THP), in HER2-positive Early Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 927,
        "start_date": "2021-10-25",
        "primary_completion_date": "2025-03-12",
        "last_update_posted": "2026-08-11",
        "url": "https://clinicaltrials.gov/study/NCT05113251"
      },
      "label": {
        "matched_brand": "Enhertu",
        "matched_generic": "FAM-TRASTUZUMAB DERUXTECAN-NXKI",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260515",
        "spl_id": "a4106ba4-f398-4663-980c-2b7195283edd",
        "boxed": {
          "headline": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis",
          "text": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis, including severe, life-threatening, and fatal cases, have been reported with ENHERTU. Monitor for and promptly investigate signs and symptoms including cough, dyspnea, fever, and other new or worsening respiratory symptoms. Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis. Advise patients of the risk and the need to immediately report symptoms [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) ] . Embryo-Fetal Toxicity: Exposure …"
        },
        "warnings": [
          "Neutropenia",
          "Left Ventricular Dysfunction (LVD)"
        ],
        "common": {
          "text": "decreased white blood cell count (73%), nausea (72%), decreased hemoglobin (67%), decreased neutrophil count (65%), decreased lymphocyte count (60%), fatigue (55%), decreased platelet count (48%), increased aspartate aminotransferase (46%), increased alanine aminotransferase (43%), increased blood alkaline phosphatase (39%), vomiting (38%), alopecia (37%), constipation (32%), decreased blood potassium (32%), decreased appetite (31%), diarrhea (30%), and musculoskeletal pain (24%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7e67e73e-ddf4-4e4d-8b50-09d7514910b6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Enhertu\""
      }
    },
    {
      "id": "drug-29",
      "name": "Trastuzumab deruxtecan + pertuzumab",
      "code": "T-DXd + P",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC + mAb",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "DESTINY-Breast09",
      "nct_id": "NCT04784715",
      "line": "1L metastatic",
      "status": "phase 3",
      "readout": "mPFS 40.7 vs 26.9 mo vs THP; challenges THP as 1L standard",
      "readout_date": "2025-06-01",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://clinicaltrials.gov/study/NCT04784715",
      "registry": {
        "title": "Trastuzumab Deruxtecan (T-DXd) With or Without Pertuzumab Versus Taxane, Trastuzumab and Pertuzumab in HER2-positive Metastatic Breast Cancer (DESTINY-Breast09)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 1157,
        "start_date": "2021-04-26",
        "primary_completion_date": "2026-11-11",
        "last_update_posted": "2026-07-30",
        "url": "https://clinicaltrials.gov/study/NCT04784715"
      },
      "label": {
        "matched_brand": "Enhertu",
        "matched_generic": "FAM-TRASTUZUMAB DERUXTECAN-NXKI",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260515",
        "spl_id": "a4106ba4-f398-4663-980c-2b7195283edd",
        "boxed": {
          "headline": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis",
          "text": "WARNING: INTERSTITIAL LUNG DISEASE and EMBRYO-FETAL TOXICITY Interstitial Lung Disease (ILD) and pneumonitis, including severe, life-threatening, and fatal cases, have been reported with ENHERTU. Monitor for and promptly investigate signs and symptoms including cough, dyspnea, fever, and other new or worsening respiratory symptoms. Permanently discontinue ENHERTU in all patients with Grade 2 or higher ILD/pneumonitis. Advise patients of the risk and the need to immediately report symptoms [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) ] . Embryo-Fetal Toxicity: Exposure …"
        },
        "warnings": [
          "Neutropenia",
          "Left Ventricular Dysfunction (LVD)"
        ],
        "common": {
          "text": "decreased white blood cell count (73%), nausea (72%), decreased hemoglobin (67%), decreased neutrophil count (65%), decreased lymphocyte count (60%), fatigue (55%), decreased platelet count (48%), increased aspartate aminotransferase (46%), increased alanine aminotransferase (43%), increased blood alkaline phosphatase (39%), vomiting (38%), alopecia (37%), constipation (32%), decreased blood potassium (32%), decreased appetite (31%), diarrhea (30%), and musculoskeletal pain (24%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7e67e73e-ddf4-4e4d-8b50-09d7514910b6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Trastuzumab deruxtecan\""
      }
    },
    {
      "id": "drug-30",
      "name": "Tucatinib (Tukysa)",
      "code": "ONT-380",
      "target": "HER2 (TKI)",
      "genes": [
        "ERBB2"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "Seagen",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "HER2CLIMB",
      "nct_id": "NCT02614794",
      "line": "2L+ metastatic incl. active brain metastases",
      "status": "approved",
      "readout": "OS benefit; CNS activity",
      "readout_date": "2020-04-17",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified; brain mets",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study of Tucatinib vs. Placebo in Combination With Capecitabine & Trastuzumab in Patients With Advanced HER2+ Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Seagen Inc.",
        "enrollment": 612,
        "start_date": "2016-01-28",
        "primary_completion_date": "2019-09-04",
        "last_update_posted": "2023-08-14",
        "url": "https://clinicaltrials.gov/study/NCT02614794"
      },
      "label": {
        "matched_brand": "TUKYSA",
        "matched_generic": "tucatinib",
        "manufacturer": null,
        "effective_time": "20241104",
        "spl_id": "892c322b-be43-4180-89f7-4e3619a8b58f",
        "boxed": null,
        "warnings": [
          "Diarrhea",
          "Hepatotoxicity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "diarrhea, palmar-plantar erythrodysesthesia, nausea, hepatotoxicity, vomiting, stomatitis, decreased appetite, anemia, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f27eb1b9-b7fc-424e-988f-84dd7bb195a3/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Tukysa\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-31",
      "name": "Neratinib (Nerlynx)",
      "code": "HKI-272",
      "target": "pan-HER (TKI)",
      "genes": [
        "ERBB2",
        "ERBB3",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Puma Biotechnology",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "ExteNET; NALA",
      "nct_id": "NCT00878709",
      "line": "extended adjuvant; metastatic",
      "status": "approved",
      "readout": "Extended adjuvant iDFS benefit",
      "readout_date": "2017-07-17",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study Evaluating The Effects Of Neratinib After Adjuvant Trastuzumab In Women With Early Stage Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Puma Biotechnology, Inc.",
        "enrollment": 2840,
        "start_date": "2009-07-09",
        "primary_completion_date": "2014-08-21",
        "last_update_posted": "2021-06-11",
        "url": "https://clinicaltrials.gov/study/NCT00878709"
      },
      "label": {
        "matched_brand": "Nerlynx",
        "matched_generic": "NERATINIB",
        "manufacturer": "Puma Biotechnology, Inc.",
        "effective_time": "20260702",
        "spl_id": "55a7b5be-747b-8497-e063-6294a90a8923",
        "boxed": null,
        "warnings": [
          "Diarrhea",
          "Hepatotoxicity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "NERLYNX as a single agent: diarrhea, nausea, abdominal pain, fatigue, vomiting, rash, stomatitis, decreased appetite, muscle spasms, dyspepsia, AST or ALT increased, nail disorder, dry skin, abdominal distention, epistaxis, weight decreased, and urinary tract infection",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/d1e41dcf-e82a-47c2-a0ad-6c6eef621834/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Nerlynx\""
      }
    },
    {
      "id": "drug-32",
      "name": "Lapatinib (Tykerb)",
      "code": "GW572016",
      "target": "HER2/EGFR (TKI)",
      "genes": [
        "ERBB2",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Novartis",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "EGF100151",
      "nct_id": "",
      "line": "metastatic",
      "status": "approved",
      "readout": "Largely superseded by newer HER2 TKIs",
      "readout_date": "2007-03-13",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "label": {
        "matched_brand": "TYKERB",
        "matched_generic": "LAPATINIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260127",
        "spl_id": "940eccaf-92b4-4562-8579-24a53c1bc48d",
        "boxed": {
          "headline": "WARNING: HEPATOTOXICITY",
          "text": "WARNING: HEPATOTOXICITY Hepatotoxicity has been observed in clinical trials and postmarketing experience. The hepatotoxicity may be severe and deaths have been reported. Causality of the deaths is uncertain [see Warnings and Precautions (5.2)] . WARNING: HEPATOTOXICITY See full prescribing information for complete boxed warning. Hepatotoxicity has been observed in clinical trials and postmarketing experience. The hepatotoxicity may be severe and deaths have been reported. Causality of the deaths is uncertain. ( 5.2 )"
        },
        "warnings": [],
        "common": {
          "text": "diarrhea, palmar-plantar erythrodysesthesia, nausea, rash, vomiting, and fatigue",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/eee37f88-ec6a-4c30-b8aa-e2c71f93088c/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Tykerb\""
      }
    },
    {
      "id": "drug-33",
      "name": "Margetuximab (Margenza)",
      "code": "MGAH22",
      "target": "HER2 (Fc-engineered)",
      "genes": [
        "ERBB2"
      ],
      "modality": "mAb",
      "company": "MacroGenics",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "SOPHIA",
      "nct_id": "NCT02492711",
      "line": "3L+ metastatic",
      "status": "approved",
      "readout": "Modest PFS benefit vs trastuzumab; limited uptake",
      "readout_date": "2020-12-16",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH-amplified",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Margetuximab Plus Chemotherapy vs Trastuzumab Plus Chemotherapy in the Treatment of HER2+ Metastatic Breast Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "MacroGenics",
        "enrollment": 624,
        "start_date": "2015-08-24",
        "primary_completion_date": "2021-08-11",
        "last_update_posted": "2025-03-17",
        "url": "https://clinicaltrials.gov/study/NCT02492711"
      },
      "label": {
        "matched_brand": "MARGENZA",
        "matched_generic": "MARGETUXIMAB-CMKB",
        "manufacturer": "TerSera Therapeutics LLC",
        "effective_time": "20250211",
        "spl_id": "6a6d50c7-06ea-479c-83cc-f197a9e428c9",
        "boxed": {
          "headline": "WARNING: LEFT VENTRICULAR DYSFUNCTION AND EMBRYO-FETAL TOXICITY WARNING: LEFT VENTRICULAR DYSFUNCTION AND EMBR",
          "text": "WARNING: LEFT VENTRICULAR DYSFUNCTION AND EMBRYO-FETAL TOXICITY WARNING: LEFT VENTRICULAR DYSFUNCTION AND EMBRYO-FETAL TOXICITY See full prescribing information for complete boxed warning. Left Ventricular Dysfunction: MARGENZA may lead to reductions in left ventricular ejection fraction (LVEF). Evaluate cardiac function prior to and during treatment. Discontinue MARGENZA treatment for a confirmed clinically significant decrease in left ventricular function. ( 2.2 , 5.1 , 6.1 ) Embryo-Fetal Toxicity: Exposure to MARGENZA during pregnancy can cause embryo-fetal harm. Advise patients of the risk…"
        },
        "warnings": [
          "Infusion-Related Reactions (IRRs)"
        ],
        "common": null,
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/6a6d50c7-06ea-479c-83cc-f197a9e428c9/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Margenza\""
      }
    },
    {
      "id": "drug-34",
      "name": "Zanidatamab (Ziihera)",
      "code": "ZW25",
      "target": "HER2 biparatopic",
      "genes": [
        "ERBB2"
      ],
      "modality": "bispecific",
      "company": "Jazz Pharmaceuticals",
      "partner": "Zymeworks",
      "phase": "phase 2",
      "phase_rank": 3,
      "trial_name": "NeoZanHER",
      "nct_id": "NCT05035836",
      "line": "neoadjuvant monotherapy early-stage",
      "status": "phase 2",
      "readout": "30% pCR with neoadjuvant monotherapy; significant tumor shrinkage at 6 weeks",
      "readout_date": "2026-04-17",
      "subtype_label": "HER2+",
      "nodes": [
        "her2-pos-hr-neg",
        "triple-positive"
      ],
      "receptor_context": "HER2 IHC 3+ or ISH+ early stage",
      "source_url": "https://clinicaltrials.gov/study/NCT05035836",
      "registry": {
        "title": "A Phase 2 Single-Arm Open-Label Pilot Trial Evaluating Zanidatamab (ZW25) in Patients With Early Stage HER2/Neu Positive (HER2+) Breast Cancer (BC)",
        "overall_status": "RECRUITING",
        "phase": "Phase 2",
        "sponsor": "M.D. Anderson Cancer Center",
        "enrollment": 20,
        "start_date": "2021-11-16",
        "primary_completion_date": "2028-12-29",
        "last_update_posted": "2026-08-24",
        "url": "https://clinicaltrials.gov/study/NCT05035836"
      },
      "label": {
        "matched_brand": "ZIIHERA",
        "matched_generic": "ZANIDATAMAB-HRII",
        "manufacturer": "Jazz Pharmaceuticals, Inc.",
        "effective_time": "20260824",
        "spl_id": "526942b1-adcb-4202-82ab-3d5eaaefc812",
        "boxed": {
          "headline": "WARNING: DIARRHEA AND EMBRYO-FETAL TOXICITY ZIIHERA, in combination with fluoropyrimidine- and platinum-contai",
          "text": "WARNING: DIARRHEA AND EMBRYO-FETAL TOXICITY ZIIHERA, in combination with fluoropyrimidine- and platinum-containing chemotherapy, with or without tislelizumab-jsgr, can cause severe diarrhea, including life threatening and fatal cases. Use antidiarrheal prophylaxis during the first cycle when ZIIHERA is given in combination with these drugs. Manage with antidiarrheals and supportive measures as clinically indicated. Interrupt, reduce the dose or discontinue ZIIHERA based on severity [see Dosage and Administration ( 2.4 ), Warnings and Precautions ( 5.1 ), Use in Specific Populations ( 8.5 )] . …"
        },
        "warnings": [
          "Left Ventricular Dysfunction",
          "Infusion-Related Reactions (IRRs)"
        ],
        "common": {
          "text": "diarrhea, nausea, decreased appetite, vomiting, hypokalemia, fatigue, rash, peripheral neuropathy, and IRR",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/ae5d9425-fae5-4541-a158-150998343348/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Ziihera\""
      }
    },
    {
      "id": "drug-35",
      "name": "Trastuzumab + pertuzumab + endocrine therapy",
      "code": "THP + ET",
      "target": "HER2 + ER",
      "genes": [
        "ERBB2",
        "ESR1"
      ],
      "modality": "mAb + small molecule",
      "company": "Roche",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "PERTAIN; multiple",
      "nct_id": "",
      "line": "1L-2L metastatic",
      "status": "approved",
      "readout": "Dual HER2 blockade plus ET; ET maintenance standard in HR+/HER2+",
      "readout_date": "2016-01-01",
      "subtype_label": "Triple positive",
      "nodes": [
        "triple-positive"
      ],
      "receptor_context": "ER+ and/or PR+ AND HER2+",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "label": {
        "matched_brand": "Herceptin",
        "matched_generic": "TRASTUZUMAB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260529",
        "spl_id": "7517f775-6a10-4ddd-8dfb-6704ece413d0",
        "boxed": {
          "headline": "WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY WARNING: CARDIOMYOP",
          "text": "WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY WARNING: CARDIOMYOPATHY, INFUSION REACTIONS, EMBRYO-FETAL TOXICITY, and PULMONARY TOXICITY See full prescribing information for complete boxed warning Cardiomyopathy: Herceptin can result in subclinical and clinical cardiac failure manifesting as CHF, and decreased LVEF, with greatest risk when administered concurrently with anthracyclines. Evaluate cardiac function prior to and during treatment. Discontinue Herceptin for cardiomyopathy. ( 2.5 , 5.1 ) Infusion Reactions, Pulmonary Toxicity: Discontinue H…"
        },
        "warnings": [],
        "common": {
          "text": "headache, diarrhea, nausea, and chills. ( 6.1 ) Metastatic Breast Cancer Most common adverse reactions (≥ 10%) are fever, chills, headache, infection, congestive heart failure, insomnia, cough, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/492dbdb2-077e-4064-bff3-372d6af0a7a2/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Trastuzumab\""
      }
    },
    {
      "id": "drug-36",
      "name": "Atirmociclib + letrozole",
      "code": "PF-07220060",
      "target": "CDK4-selective",
      "genes": [
        "CDK4"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "phase 2",
      "phase_rank": 3,
      "trial_name": "Abstract P5-07-28 (SABCS)",
      "nct_id": "",
      "line": "1L metastatic HR+/HER2+",
      "status": "phase 2",
      "readout": "Investigating CDK4-selective inhibition in the triple-positive subset",
      "readout_date": "2025-12-01",
      "subtype_label": "Triple positive",
      "nodes": [
        "triple-positive"
      ],
      "receptor_context": "ER+ and/or PR+ AND HER2+",
      "source_url": "https://aacrjournals.org/clincancerres/article/31/12_Supplement/P5-07-28/752659/"
    },
    {
      "id": "drug-37",
      "name": "Pembrolizumab (Keytruda)",
      "code": "MK-3475",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "immunotherapy",
      "company": "Merck",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "KEYNOTE-522",
      "nct_id": "NCT03036488",
      "line": "neoadjuvant + adjuvant early-stage",
      "status": "approved",
      "readout": "7-year data confirm EFS and OS benefit; standard of care since 2021",
      "readout_date": "2021-07-26",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; early stage II-III",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study of Pembrolizumab (MK-3475) Plus Chemotherapy vs Placebo Plus Chemotherapy as Neoadjuvant Therapy and Pembrolizumab vs Placebo as Adjuvant Therapy in Participants With Triple Negative Breast Cancer (TNBC) (MK-3475-522/KEYNOTE-522)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 1174,
        "start_date": "2017-03-07",
        "primary_completion_date": "2025-10-14",
        "last_update_posted": "2025-10-29",
        "url": "https://clinicaltrials.gov/study/NCT03036488"
      },
      "label": {
        "matched_brand": "KEYTRUDA",
        "matched_generic": "PEMBROLIZUMAB",
        "manufacturer": "Merck Sharp & Dohme LLC",
        "effective_time": "20260710",
        "spl_id": "228e1e3f-d207-481f-8e14-9fdcbd0470e9",
        "boxed": null,
        "warnings": [
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal toxicity",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine",
          "Hypoparathyroidism Hematologic/Immune",
          "Other"
        ],
        "common": {
          "text": "KEYTRUDA as a single agent: fatigue, musculoskeletal pain, rash, diarrhea, pyrexia, cough, decreased appetite, pruritus, dyspnea, constipation, pain, abdominal pain, nausea, and hypothyroidism",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/9333c79b-d487-4538-a9f0-71b91a02b287/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Keytruda\""
      }
    },
    {
      "id": "drug-38",
      "name": "Pembrolizumab (Keytruda)",
      "code": "MK-3475",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "immunotherapy",
      "company": "Merck",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "KEYNOTE-355",
      "nct_id": "NCT02819518",
      "line": "1L metastatic PD-L1+",
      "status": "approved",
      "readout": "PFS and OS benefit with chemotherapy in CPS>=10",
      "readout_date": "2020-11-13",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; PD-L1 CPS>=10",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Study of Pembrolizumab (MK-3475) Plus Chemotherapy vs. Placebo Plus Chemotherapy for Previously Untreated Locally Recurrent Inoperable or Metastatic Triple Negative Breast Cancer (MK-3475-355/KEYNOTE-355)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 882,
        "start_date": "2016-07-27",
        "primary_completion_date": "2021-06-15",
        "last_update_posted": "2024-11-27",
        "url": "https://clinicaltrials.gov/study/NCT02819518"
      },
      "label": {
        "matched_brand": "KEYTRUDA",
        "matched_generic": "PEMBROLIZUMAB",
        "manufacturer": "Merck Sharp & Dohme LLC",
        "effective_time": "20260710",
        "spl_id": "228e1e3f-d207-481f-8e14-9fdcbd0470e9",
        "boxed": null,
        "warnings": [
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal toxicity",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine",
          "Hypoparathyroidism Hematologic/Immune",
          "Other"
        ],
        "common": {
          "text": "KEYTRUDA as a single agent: fatigue, musculoskeletal pain, rash, diarrhea, pyrexia, cough, decreased appetite, pruritus, dyspnea, constipation, pain, abdominal pain, nausea, and hypothyroidism",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/9333c79b-d487-4538-a9f0-71b91a02b287/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Keytruda\""
      }
    },
    {
      "id": "drug-39",
      "name": "Sacituzumab govitecan (Trodelvy)",
      "code": "IMMU-132",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Gilead Sciences",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "ASCENT",
      "nct_id": "NCT02574455",
      "line": "2L+ metastatic",
      "status": "approved",
      "readout": "mOS 12.1 vs 6.7 mo vs TPC",
      "readout_date": "2020-04-22",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "Trial of Sacituzumab Govitecan in Participants With Refractory/Relapsed Metastatic Triple-Negative Breast Cancer (TNBC)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Gilead Sciences",
        "enrollment": 529,
        "start_date": "2017-11-07",
        "primary_completion_date": "2020-03-30",
        "last_update_posted": "2022-06-15",
        "url": "https://clinicaltrials.gov/study/NCT02574455"
      },
      "label": {
        "matched_brand": "TRODELVY",
        "matched_generic": "SACITUZUMAB GOVITECAN",
        "manufacturer": "Gilead Sciences, Inc.",
        "effective_time": "20260624",
        "spl_id": "2085d741-19ba-4115-bbe9-0debac82c204",
        "boxed": {
          "headline": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold",
          "text": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold TRODELVY for absolute neutrophil count below 1500/mm 3 or neutropenic fever. Monitor blood cell counts periodically during treatment. Primary prophylaxis with G-CSF is recommended for all patients at increased risk of febrile neutropenia [see Dosage and Administration (2.4) ] . Initiate anti-infective treatment in patients with febrile neutropenia without delay [see Warnings and Precautions (5.1) ]. TRODELVY can cause severe diarrhea. Monitor patients with diarrhea and give fluid and e…"
        },
        "warnings": [
          "Infusion-Related Reactions",
          "Nausea/Vomiting",
          "Patients with Reduced UGT1A1 Activity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased leukocyte count, decreased neutrophil count, decreased hemoglobin, nausea, diarrhea, decreased lymphocyte count, fatigue, alopecia, increased glucose, constipation, vomiting, decreased albumin, increased alkaline phosphatase, decreased appetite, abdominal pain, decreased creatinine clearance, decreased magnesium, and decreased potassium",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/57a597d2-03f0-472e-b148-016d7169169d/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Trodelvy\""
      }
    },
    {
      "id": "drug-40",
      "name": "Sacituzumab govitecan (Trodelvy)",
      "code": "IMMU-132",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Gilead Sciences",
      "partner": "Merck (pembrolizumab combination)",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "ASCENT-03 / ASCENT-04",
      "nct_id": "NCT05382299",
      "line": "1L metastatic mono and with pembrolizumab",
      "status": "approved",
      "readout": "ASCENT-03: 38% reduction in progression risk. ASCENT-04: mPFS 11.2 vs 7.8 mo",
      "readout_date": "2026-06-24",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; 1L incl. PD-L1+ and IO-ineligible",
      "source_url": "https://www.biopharminternational.com/view/trop-2-adc-sacituzumab-govitecan-fda-approval-first-line-metastatic-tnbc",
      "registry": {
        "title": "Study of Sacituzumab Govitecan-hziy Versus Treatment of Physician's Choice in Patients With Previously Untreated Locally Advanced Inoperable or Metastatic Triple-Negative Breast Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Gilead Sciences",
        "enrollment": 623,
        "start_date": "2022-07-20",
        "primary_completion_date": "2028-07",
        "last_update_posted": "2026-04-06",
        "url": "https://clinicaltrials.gov/study/NCT05382299"
      },
      "label": {
        "matched_brand": "TRODELVY",
        "matched_generic": "SACITUZUMAB GOVITECAN",
        "manufacturer": "Gilead Sciences, Inc.",
        "effective_time": "20260624",
        "spl_id": "2085d741-19ba-4115-bbe9-0debac82c204",
        "boxed": {
          "headline": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold",
          "text": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold TRODELVY for absolute neutrophil count below 1500/mm 3 or neutropenic fever. Monitor blood cell counts periodically during treatment. Primary prophylaxis with G-CSF is recommended for all patients at increased risk of febrile neutropenia [see Dosage and Administration (2.4) ] . Initiate anti-infective treatment in patients with febrile neutropenia without delay [see Warnings and Precautions (5.1) ]. TRODELVY can cause severe diarrhea. Monitor patients with diarrhea and give fluid and e…"
        },
        "warnings": [
          "Infusion-Related Reactions",
          "Nausea/Vomiting",
          "Patients with Reduced UGT1A1 Activity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased leukocyte count, decreased neutrophil count, decreased hemoglobin, nausea, diarrhea, decreased lymphocyte count, fatigue, alopecia, increased glucose, constipation, vomiting, decreased albumin, increased alkaline phosphatase, decreased appetite, abdominal pain, decreased creatinine clearance, decreased magnesium, and decreased potassium",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/57a597d2-03f0-472e-b148-016d7169169d/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Trodelvy\""
      }
    },
    {
      "id": "drug-41",
      "name": "Datopotamab deruxtecan (Datroway)",
      "code": "DS-1062 / Dato-DXd",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "TROPION-Breast02",
      "nct_id": "NCT05374512",
      "line": "1L metastatic IO-ineligible",
      "status": "approved",
      "readout": "43% reduction in progression/death risk; first targeted OS advantage in this population",
      "readout_date": "2026-05-22",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; not PD-1/PD-L1 candidates",
      "source_url": "https://www.astrazeneca.com/media-centre/press-releases/2026/datroway-approved-in-us-for-1l-triple-negative-bc.html",
      "registry": {
        "title": "A Study of Dato-DXd Versus Investigator's Choice Chemotherapy in Patients With Locally Recurrent Inoperable or Metastatic Triple-negative Breast Cancer, Who Are Not Candidates for PD-1/PD-L1 Inhibitor Therapy (TROPION-Breast02)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 644,
        "start_date": "2022-05-16",
        "primary_completion_date": "2025-08-25",
        "last_update_posted": "2026-05-15",
        "url": "https://clinicaltrials.gov/study/NCT05374512"
      },
      "label": {
        "matched_brand": "DATROWAY",
        "matched_generic": "DATOPOTAMAB DERUXTECAN",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260527",
        "spl_id": "c5c6cd04-1bea-4809-a830-b1fb1ba94e97",
        "boxed": null,
        "warnings": [
          "Lung Disease (ILD) and Pneumonitis",
          "Ocular Adverse Reactions",
          "Stomatitis/Oral Mucositis",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "stomatitis, nausea, alopecia, fatigue, decreased hemoglobin, decreased lymphocytes, constipation, increased calcium, increased AST, decreased white blood cell count, increased lactate dehydrogenase, musculoskeletal pain, decreased appetite, increased ALT, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2950227c-6230-4ca4-a135-46e44d9424a0/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Datroway\""
      }
    },
    {
      "id": "drug-42",
      "name": "Sacituzumab govitecan + pembrolizumab",
      "code": "IMMU-132 + MK-3475",
      "target": "TROP2 + PD-1",
      "genes": [
        "TACSTD2",
        "PDCD1"
      ],
      "modality": "ADC + immunotherapy",
      "company": "Gilead Sciences",
      "partner": "Merck",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "OptimICE-RD / ASCENT-05",
      "nct_id": "NCT05633654",
      "line": "adjuvant residual disease after neoadjuvant chemo+pembro",
      "status": "phase 3",
      "readout": "vs pembrolizumab +/- capecitabine; ongoing",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; residual disease post-neoadjuvant",
      "source_url": "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026",
      "registry": {
        "title": "Study of Sacituzumab Govitecan-hziy and Pembrolizumab Versus Treatment of Physician's Choice in Patients With Triple Negative Breast Cancer Who Have Residual Invasive Disease After Surgery and Neoadjuvant Therapy (ASCENT-05/AFT-65 OptimICE-RD/GBG 119/NSABP B-63)",
        "overall_status": "RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Gilead Sciences",
        "enrollment": 1514,
        "start_date": "2022-12-12",
        "primary_completion_date": "2027-06",
        "last_update_posted": "2026-10-13",
        "url": "https://clinicaltrials.gov/study/NCT05633654"
      },
      "label": {
        "matched_brand": "TRODELVY",
        "matched_generic": "SACITUZUMAB GOVITECAN",
        "manufacturer": "Gilead Sciences, Inc.",
        "effective_time": "20260624",
        "spl_id": "2085d741-19ba-4115-bbe9-0debac82c204",
        "boxed": {
          "headline": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold",
          "text": "WARNING: NEUTROPENIA AND DIARRHEA TRODELVY can cause severe, life-threatening, or fatal neutropenia. Withhold TRODELVY for absolute neutrophil count below 1500/mm 3 or neutropenic fever. Monitor blood cell counts periodically during treatment. Primary prophylaxis with G-CSF is recommended for all patients at increased risk of febrile neutropenia [see Dosage and Administration (2.4) ] . Initiate anti-infective treatment in patients with febrile neutropenia without delay [see Warnings and Precautions (5.1) ]. TRODELVY can cause severe diarrhea. Monitor patients with diarrhea and give fluid and e…"
        },
        "warnings": [
          "Infusion-Related Reactions",
          "Nausea/Vomiting",
          "Patients with Reduced UGT1A1 Activity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "decreased leukocyte count, decreased neutrophil count, decreased hemoglobin, nausea, diarrhea, decreased lymphocyte count, fatigue, alopecia, increased glucose, constipation, vomiting, decreased albumin, increased alkaline phosphatase, decreased appetite, abdominal pain, decreased creatinine clearance, decreased magnesium, and decreased potassium",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/57a597d2-03f0-472e-b148-016d7169169d/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Sacituzumab govitecan\""
      }
    },
    {
      "id": "drug-43",
      "name": "Datopotamab deruxtecan",
      "code": "DS-1062 / Dato-DXd",
      "target": "TROP2",
      "genes": [
        "TACSTD2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "AstraZeneca",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "TROPION-Breast04",
      "nct_id": "NCT06103864",
      "line": "neoadjuvant replacing chemotherapy backbone",
      "status": "phase 3",
      "readout": "Tests full replacement of the chemotherapy backbone; readout in coming years",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026",
      "registry": {
        "title": "A Phase III Study of Dato-DXd With or Without Durvalumab Compared With Investigator's Choice of Chemotherapy in Combination With Pembrolizumab in Patients With PD-L1 Positive Locally Recurrent Inoperable or Metastatic Triple-negative Breast Cancer (TROPION-Breast05)",
        "overall_status": "RECRUITING",
        "phase": "Phase 3",
        "sponsor": "AstraZeneca",
        "enrollment": 625,
        "start_date": "2023-11-23",
        "primary_completion_date": "2027-07-28",
        "last_update_posted": "2026-09-25",
        "url": "https://clinicaltrials.gov/study/NCT06103864"
      },
      "label": {
        "matched_brand": "DATROWAY",
        "matched_generic": "DATOPOTAMAB DERUXTECAN",
        "manufacturer": "Daiichi Sankyo Inc.",
        "effective_time": "20260527",
        "spl_id": "c5c6cd04-1bea-4809-a830-b1fb1ba94e97",
        "boxed": null,
        "warnings": [
          "Lung Disease (ILD) and Pneumonitis",
          "Ocular Adverse Reactions",
          "Stomatitis/Oral Mucositis",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "stomatitis, nausea, alopecia, fatigue, decreased hemoglobin, decreased lymphocytes, constipation, increased calcium, increased AST, decreased white blood cell count, increased lactate dehydrogenase, musculoskeletal pain, decreased appetite, increased ALT, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2950227c-6230-4ca4-a135-46e44d9424a0/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Datopotamab deruxtecan\""
      }
    },
    {
      "id": "drug-44",
      "name": "Pembrolizumab (observation comparator)",
      "code": "MK-3475",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "immunotherapy",
      "company": "Merck",
      "partner": "",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "de-escalation trial in pCR patients",
      "nct_id": "",
      "line": "adjuvant de-escalation",
      "status": "phase 3",
      "readout": "Tests whether adjuvant pembrolizumab can be omitted after pCR",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-; pCR after neoadjuvant",
      "source_url": "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026",
      "label": {
        "matched_brand": "KEYTRUDA",
        "matched_generic": "PEMBROLIZUMAB",
        "manufacturer": "Merck Sharp & Dohme LLC",
        "effective_time": "20260710",
        "spl_id": "228e1e3f-d207-481f-8e14-9fdcbd0470e9",
        "boxed": null,
        "warnings": [
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal toxicity",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine",
          "Hypoparathyroidism Hematologic/Immune",
          "Other"
        ],
        "common": {
          "text": "KEYTRUDA as a single agent: fatigue, musculoskeletal pain, rash, diarrhea, pyrexia, cough, decreased appetite, pruritus, dyspnea, constipation, pain, abdominal pain, nausea, and hypothyroidism",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/9333c79b-d487-4538-a9f0-71b91a02b287/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Pembrolizumab\""
      }
    },
    {
      "id": "drug-45",
      "name": "Carboplatin + immunotherapy regimens",
      "code": "",
      "target": "platinum + PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "chemotherapy + immunotherapy",
      "company": "academic/cooperative group",
      "partner": "",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "SCARLET",
      "nct_id": "",
      "line": "neoadjuvant",
      "status": "phase 3",
      "readout": "Evaluates carboplatin-based regimens with immunotherapy",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026",
      "label": {
        "matched_brand": "CARBOPLATIN",
        "matched_generic": "CARBOPLATIN",
        "manufacturer": "Apotex Corp.",
        "effective_time": "20240107",
        "spl_id": "0e68e276-b0df-4f03-e063-6394a90a22b9",
        "boxed": {
          "headline": "Carboplatin injection should be administered under the supervision of a qualified physician experienced in the",
          "text": "Carboplatin injection should be administered under the supervision of a qualified physician experienced in the use of cancer chemotherapeutic agents. Appropriate management of therapy and complications is possible only when adequate treatment facilities are readily available. Bone marrow suppression is dose related and may be severe, resulting in infection and/or bleeding. Anemia may be cumulative and may require transfusion support. Vomiting is another frequent drug related side effect. Anaphylactic-like reactions to carboplatin have been reported and may occur within minutes of carboplatin i…"
        },
        "warnings": [],
        "common": null,
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/1c275825-0275-4c73-b650-e4c1519f13b8/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Carboplatin\""
      }
    },
    {
      "id": "drug-46",
      "name": "Atezolizumab (Tecentriq)",
      "code": "MPDL3280A",
      "target": "PD-L1",
      "genes": [
        "CD274"
      ],
      "modality": "immunotherapy",
      "company": "Roche",
      "partner": "Genentech",
      "phase": "discontinued",
      "phase_rank": -1,
      "trial_name": "IMpassion130 / IMpassion131",
      "nct_id": "NCT02425891",
      "line": "1L metastatic PD-L1+",
      "status": "discontinued",
      "readout": "US TNBC indication voluntarily withdrawn 2021 after IMpassion131 failed to confirm benefit",
      "readout_date": "2021-08-27",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs",
      "registry": {
        "title": "A Study of Atezolizumab in Combination With Nab-Paclitaxel Compared With Placebo With Nab-Paclitaxel for Participants With Previously Untreated Metastatic Triple-Negative Breast Cancer (IMpassion130)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 902,
        "start_date": "2015-06-23",
        "primary_completion_date": "2020-04-14",
        "last_update_posted": "2022-07-19",
        "url": "https://clinicaltrials.gov/study/NCT02425891"
      },
      "phase_disagreement": {
        "curated": "discontinued",
        "registry": "phase 3"
      },
      "label": {
        "matched_brand": "TECENTRIQ",
        "matched_generic": "atezolizumab",
        "manufacturer": null,
        "effective_time": "20260520",
        "spl_id": "4b922b35-c401-4189-a8b2-9f9a820878db",
        "boxed": null,
        "warnings": [
          "Infusion-Related Reactions",
          "Complications of Allogeneic HSCT",
          "Embryo-Fetal Toxicity",
          "TECENTRIQ as a Single Agent",
          "Combination with Cobimetinib and Vemurafenib",
          "Thyroiditis",
          "Hyperthyroidism",
          "Hypothyroidism",
          "Combination with Platinum-based Chemotherapy",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular"
        ],
        "common": {
          "text": "fatigue/asthenia, decreased appetite, nausea, cough, and dyspnea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/6fa682c9-a312-4932-9831-f286908660ee/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Tecentriq\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-47",
      "name": "Leronlimab",
      "code": "PRO 140",
      "target": "CCR5",
      "genes": [
        "CCR5"
      ],
      "modality": "mAb",
      "company": "CytoDyn",
      "partner": "",
      "phase": "phase 1/2",
      "phase_rank": 2,
      "trial_name": "",
      "nct_id": "",
      "line": "metastatic",
      "status": "phase 1/2",
      "readout": "Early-stage asset; limited late-stage data",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.barchart.com/story/news/33432190/"
    },
    {
      "id": "drug-48",
      "name": "Eganelisib",
      "code": "IPI-549",
      "target": "PI3K-gamma",
      "genes": [
        "PIK3CG"
      ],
      "modality": "small molecule",
      "company": "Infinity Pharmaceuticals",
      "partner": "",
      "phase": "phase 2",
      "phase_rank": 3,
      "trial_name": "MARIO-3",
      "nct_id": "NCT03961698",
      "line": "1L metastatic combination",
      "status": "phase 2",
      "readout": "Macrophage reprogramming approach",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.barchart.com/story/news/33432190/",
      "registry": {
        "title": "Evaluation of IPI-549 Combined With Front-line Treatments in Pts. With Triple-Negative Breast Cancer or Renal Cell Carcinoma",
        "overall_status": "UNKNOWN",
        "phase": "Phase 2",
        "sponsor": "Infinity Pharmaceuticals, Inc.",
        "enrollment": 91,
        "start_date": "2019-12-17",
        "primary_completion_date": "2023-08-31",
        "last_update_posted": "2023-08-14",
        "url": "https://clinicaltrials.gov/study/NCT03961698"
      }
    },
    {
      "id": "drug-49",
      "name": "MDNA11",
      "code": "MDNA11",
      "target": "IL-2 (beta-enhanced superkine)",
      "genes": [
        "IL2RB"
      ],
      "modality": "cytokine",
      "company": "Medicenna Therapeutics",
      "partner": "",
      "phase": "phase 1/2",
      "phase_rank": 2,
      "trial_name": "ABILITY-1",
      "nct_id": "NCT05086692",
      "line": "advanced solid tumors incl. TNBC",
      "status": "phase 1/2",
      "readout": "Early-phase; TNBC one of several tumor types",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.barchart.com/story/news/33432190/",
      "registry": {
        "title": "A Beta-only IL-2 ImmunoTherapY Study",
        "overall_status": "RECRUITING",
        "phase": "Phase 1/Phase 2",
        "sponsor": "Medicenna Therapeutics, Inc.",
        "enrollment": 160,
        "start_date": "2021-08-27",
        "primary_completion_date": "2026-11-30",
        "last_update_posted": "2026-10-13",
        "url": "https://clinicaltrials.gov/study/NCT05086692"
      },
      "phase_disagreement": {
        "curated": "phase 1/2",
        "registry": "phase 1/phase 2"
      }
    },
    {
      "id": "drug-50",
      "name": "CFI-400945",
      "code": "CFI-400945",
      "target": "PLK4",
      "genes": [
        "PLK4"
      ],
      "modality": "small molecule",
      "company": "Treadwell Therapeutics",
      "partner": "",
      "phase": "phase 2",
      "phase_rank": 3,
      "trial_name": "",
      "nct_id": "",
      "line": "advanced/metastatic",
      "status": "phase 2",
      "readout": "Early-stage asset in TNBC development",
      "readout_date": "",
      "subtype_label": "TNBC",
      "nodes": [
        "tnbc"
      ],
      "receptor_context": "ER- PR- HER2-",
      "source_url": "https://www.barchart.com/story/news/33432190/"
    }
  ],
  "drug_summary": {
    "n_drugs": 51,
    "registry_matched": 41,
    "phases": {
      "approved": 31,
      "filed": 2,
      "phase 3": 10,
      "phase 1/2": 3,
      "phase 2": 4,
      "discontinued": 1
    },
    "modalities": {
      "small molecule": 22,
      "degrader": 2,
      "ADC": 13,
      "mAb": 4,
      "ADC + mAb": 1,
      "bispecific": 1,
      "mAb + small molecule": 1,
      "immunotherapy": 4,
      "ADC + immunotherapy": 1,
      "chemotherapy + immunotherapy": 1,
      "cytokine": 1
    },
    "unmapped_targets": []
  },
  "gaps": {
    "druggable_untargeted": [
      {
        "gene": "TP53",
        "basis": "genomic",
        "max_pct": 82.8,
        "max_node": "basal-like",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 19,
        "civic_therapies": [
          "Tamoxifen",
          "Doxorubicin",
          "Bortezomib"
        ],
        "why": "The most altered gene in the disease and still undrugged — no pocket, and restoring a lost function is harder than blocking one."
      },
      {
        "gene": "MYC",
        "basis": "genomic",
        "max_pct": 31.5,
        "max_node": "basal-like",
        "max_metric": "amplification",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "Amplified frequently. A transcription factor with a protein–protein interface rather than a druggable cleft."
      },
      {
        "gene": "FGFR1",
        "basis": "genomic",
        "max_pct": 18.0,
        "max_node": "luminal-b",
        "max_metric": "amplification",
        "civic_best_level": "B",
        "civic_items": 26,
        "civic_therapies": [
          "Lucitanib",
          "Fulvestrant",
          "Sunitinib",
          "Dovitinib"
        ],
        "why": "Amplification is the selector."
      },
      {
        "gene": "RB1",
        "basis": "genomic",
        "max_pct": 6.5,
        "max_node": "basal-like",
        "max_metric": "deep_deletion",
        "civic_best_level": "B",
        "civic_items": 9,
        "civic_therapies": [
          "Palbociclib",
          "Fulvestrant",
          "Alpelisib",
          "Ribociclib"
        ],
        "why": "Loss predicts CDK4/6 inhibitor resistance — informative as a negative biomarker rather than as a target."
      }
    ],
    "addressed_indirectly": [
      {
        "gene": "CCND1",
        "basis": "pathway",
        "max_pct": 29.5,
        "max_node": "luminal-b",
        "max_metric": "amplification",
        "civic_best_level": "B",
        "civic_items": 5,
        "civic_therapies": [
          "Tamoxifen",
          "Palbociclib"
        ],
        "why": "Amplified often, but drugged indirectly through CDK4/6.",
        "addressed_via": [
          "CDK4",
          "CDK6"
        ],
        "via_programs": 10
      },
      {
        "gene": "BRCA1",
        "basis": "synthetic-lethal",
        "max_pct": 15.1,
        "max_node": "basal-like",
        "max_metric": "mutation",
        "civic_best_level": "A",
        "civic_items": 12,
        "civic_therapies": [
          "Olaparib",
          "Cisplatin",
          "Talazoparib",
          "Carboplatin"
        ],
        "why": "The lesion that creates PARP dependency.",
        "addressed_via": [
          "PARP1"
        ],
        "via_programs": 2
      },
      {
        "gene": "PIK3R1",
        "basis": "genomic",
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "civic_best_level": "D",
        "civic_items": 1,
        "civic_therapies": [
          "MTOR Kinase Inhibitor PP242"
        ],
        "why": "Regulatory subunit; mutations activate the same pathway as PIK3CA.",
        "addressed_via": [
          "PIK3CA"
        ],
        "via_programs": 2
      },
      {
        "gene": "BRCA2",
        "basis": "synthetic-lethal",
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "civic_best_level": "A",
        "civic_items": 11,
        "civic_therapies": [
          "Olaparib",
          "Talazoparib",
          "Cisplatin",
          "Carboplatin"
        ],
        "why": "The lesion that creates PARP dependency.",
        "addressed_via": [
          "PARP1"
        ],
        "via_programs": 2
      },
      {
        "gene": "PTEN",
        "basis": "genomic",
        "max_pct": 5.4,
        "max_node": "basal-like",
        "max_metric": "deep_deletion",
        "civic_best_level": "A",
        "civic_items": 30,
        "civic_therapies": [
          "Trastuzumab",
          "Dactolisib",
          "Lapatinib",
          "Everolimus"
        ],
        "why": "Loss activates PI3K/AKT; addressed downstream rather than directly.",
        "addressed_via": [
          "AKT1"
        ],
        "via_programs": 2
      }
    ],
    "landscape": [
      {
        "gene": "ERBB2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 15,
        "best_phase": "approved",
        "max_pct": 70.9,
        "max_node": "her2-enriched",
        "max_metric": "amplification",
        "hotspot_n": 7,
        "civic_best_level": "A"
      },
      {
        "gene": "TACSTD2",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 8,
        "best_phase": "approved",
        "max_pct": 1.8,
        "max_node": "her2-enriched",
        "max_metric": "amplification",
        "hotspot_n": 1,
        "civic_best_level": null
      },
      {
        "gene": "ESR1",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 7,
        "best_phase": "approved",
        "max_pct": 3.6,
        "max_node": "her2-enriched",
        "max_metric": "amplification",
        "hotspot_n": 2,
        "civic_best_level": "A"
      },
      {
        "gene": "CDK4",
        "basis": "pathway",
        "biomarker_gene": "CCND1",
        "comparable": false,
        "programs": 6,
        "best_phase": "approved",
        "max_pct": 4.9,
        "max_node": "luminal-b",
        "max_metric": "amplification",
        "hotspot_n": 0,
        "civic_best_level": "D"
      },
      {
        "gene": "PDCD1",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 5,
        "best_phase": "approved",
        "max_pct": 2.2,
        "max_node": "basal-like",
        "max_metric": "deep_deletion",
        "hotspot_n": 1,
        "civic_best_level": null
      },
      {
        "gene": "CDK6",
        "basis": "pathway",
        "biomarker_gene": "CCND1",
        "comparable": false,
        "programs": 4,
        "best_phase": "approved",
        "max_pct": 3.3,
        "max_node": "basal-like",
        "max_metric": "amplification",
        "hotspot_n": 1,
        "civic_best_level": "B"
      },
      {
        "gene": "PIK3CA",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 46.4,
        "max_node": "luminal-a",
        "max_metric": "mutation",
        "hotspot_n": 179,
        "civic_best_level": "A"
      },
      {
        "gene": "PARP1",
        "basis": "synthetic-lethal",
        "biomarker_gene": "BRCA1/BRCA2",
        "comparable": false,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 8.7,
        "max_node": "basal-like",
        "max_metric": "amplification",
        "hotspot_n": 1,
        "civic_best_level": null
      },
      {
        "gene": "MTOR",
        "basis": "pathway",
        "biomarker_gene": "PIK3CA",
        "comparable": false,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 5.3,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "hotspot_n": 9,
        "civic_best_level": "D"
      },
      {
        "gene": "AKT1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 3.6,
        "max_node": "luminal-a",
        "max_metric": "mutation",
        "hotspot_n": 12,
        "civic_best_level": "A"
      },
      {
        "gene": "ERBB3",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 1,
        "best_phase": "approved",
        "max_pct": 8.8,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "hotspot_n": 8,
        "civic_best_level": "B"
      },
      {
        "gene": "CD274",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 1,
        "best_phase": "discontinued",
        "max_pct": 3.6,
        "max_node": "her2-enriched",
        "max_metric": "deep_deletion",
        "hotspot_n": 1,
        "civic_best_level": "B"
      },
      {
        "gene": "TP53",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 82.8,
        "max_node": "basal-like",
        "max_metric": "mutation",
        "hotspot_n": 190,
        "civic_best_level": "B"
      },
      {
        "gene": "MYC",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 31.5,
        "max_node": "basal-like",
        "max_metric": "amplification",
        "hotspot_n": 1,
        "civic_best_level": null
      },
      {
        "gene": "CCND1",
        "basis": "pathway",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 29.5,
        "max_node": "luminal-b",
        "max_metric": "amplification",
        "hotspot_n": 1,
        "civic_best_level": "B"
      },
      {
        "gene": "FGFR1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 18.0,
        "max_node": "luminal-b",
        "max_metric": "amplification",
        "hotspot_n": 0,
        "civic_best_level": "B"
      },
      {
        "gene": "BRCA1",
        "basis": "synthetic-lethal",
        "biomarker_gene": "PARP1",
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 15.1,
        "max_node": "basal-like",
        "max_metric": "mutation",
        "hotspot_n": 18,
        "civic_best_level": "A"
      },
      {
        "gene": "PIK3R1",
        "basis": "genomic",
        "biomarker_gene": "PIK3CA",
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "hotspot_n": 13,
        "civic_best_level": "D"
      },
      {
        "gene": "BRCA2",
        "basis": "synthetic-lethal",
        "biomarker_gene": "PARP1",
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.0,
        "max_node": "her2-enriched",
        "max_metric": "mutation",
        "hotspot_n": 24,
        "civic_best_level": "A"
      },
      {
        "gene": "RB1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 6.5,
        "max_node": "basal-like",
        "max_metric": "deep_deletion",
        "hotspot_n": 9,
        "civic_best_level": "B"
      },
      {
        "gene": "PTEN",
        "basis": "genomic",
        "biomarker_gene": "AKT1",
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 5.4,
        "max_node": "basal-like",
        "max_metric": "deep_deletion",
        "hotspot_n": 18,
        "civic_best_level": "A"
      },
      {
        "gene": "AR",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 3.2,
        "max_node": "basal-like",
        "max_metric": "mutation",
        "hotspot_n": 4,
        "civic_best_level": "D"
      }
    ],
    "repositioning": [
      {
        "gene": "PIK3CA",
        "subtype_node": "her2-enriched",
        "subtype_label": "HER2-enriched",
        "majority_receptor_class": "HER2+/HR-",
        "metric": "mutation",
        "pct": 40.4,
        "n": 23,
        "of": 57,
        "approved_agents": [
          "Alpelisib (Piqray)",
          "Gedatolisib (Revtorpyk)"
        ],
        "approved_in": [
          "HR+/HER2-"
        ],
        "approved_node_ids": [
          "hr-pos-her2-neg"
        ],
        "axis_note": "approval is on the receptor-IHC axis; the frequency is on the PAM50 axis — different partitions, deliberately not merged"
      }
    ],
    "evidence_without_program": [
      {
        "gene": "SCP2",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "ONCOGENIC": 2
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "NTRK1",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "ONCOGENIC": 2
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "EGFR",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 1,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Pyrotinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "NF2",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Temsirolimus"
        ],
        "in_target_set": false
      },
      {
        "gene": "CDKN2A",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Letrozole",
          "Palbociclib"
        ],
        "in_target_set": false
      },
      {
        "gene": "FGFR3",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Pazopanib"
        ],
        "in_target_set": false
      },
      {
        "gene": "VHL",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDISPOSING": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "TOP1",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Sacituzumab Govitecan"
        ],
        "in_target_set": false
      },
      {
        "gene": "RAD51D",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDISPOSING": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "ZNF880",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Pyrotinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CCDC170",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 5,
        "evidence_types": {
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Tamoxifen",
          "Fulvestrant",
          "Lapatinib",
          "Dasatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ERBB4",
        "best_level": "D",
        "best_level_submitted": "B",
        "n_evidence_items": 4,
        "evidence_types": {
          "PREDICTIVE": 3,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Trastuzumab",
          "Lapatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "AKT3",
        "best_level": "D",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Pan-AKT Kinase Inhibitor GSK690693",
          "Akt Inhibitor MK2206"
        ],
        "in_target_set": false
      },
      {
        "gene": "MAP2K7",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 3,
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Palbociclib",
          "Tamoxifen",
          "Fulvestrant"
        ],
        "in_target_set": false
      },
      {
        "gene": "KRAS",
        "best_level": "D",
        "best_level_submitted": "B",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Cetuximab",
          "Pictilisib"
        ],
        "in_target_set": false
      },
      {
        "gene": "RET",
        "best_level": "D",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vandetanib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CCNE2",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Palbociclib",
          "CDK Inhibitor SNS-032"
        ],
        "in_target_set": false
      },
      {
        "gene": "ZNF217",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 1,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Triciribine"
        ],
        "in_target_set": false
      },
      {
        "gene": "SF3B1",
        "best_level": "D",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Spliceostatin A"
        ],
        "in_target_set": false
      },
      {
        "gene": "PTPN12",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Crizotinib",
          "Sunitinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "HDAC2",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Mocetinostat"
        ],
        "in_target_set": false
      },
      {
        "gene": "AR",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Dactolisib"
        ],
        "in_target_set": true
      },
      {
        "gene": "CDKN1B",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Lapatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ABCC3",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Paclitaxel",
          "Monomethyl Auristatin E"
        ],
        "in_target_set": false
      },
      {
        "gene": "NRG1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Lapatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PSMD4",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Talazoparib"
        ],
        "in_target_set": false
      },
      {
        "gene": "FGFR4",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "FGF/VEGF Receptor Tyrosine Kinase Inhibitor, PD173074",
          "Dovitinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "TLK2",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Go6983",
          "GF109203X"
        ],
        "in_target_set": false
      },
      {
        "gene": "XRCC3",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Cisplatin"
        ],
        "in_target_set": false
      },
      {
        "gene": "ORC1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Cisplatin"
        ],
        "in_target_set": false
      },
      {
        "gene": "YES1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Neratinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "MMP1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Sacituzumab Govitecan"
        ],
        "in_target_set": false
      },
      {
        "gene": "KDM5C",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Capivasertib"
        ],
        "in_target_set": false
      },
      {
        "gene": "MYD88",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Paclitaxel"
        ],
        "in_target_set": false
      },
      {
        "gene": "PIK3R1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "MTOR Kinase Inhibitor PP242"
        ],
        "in_target_set": true
      },
      {
        "gene": "CDH1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Foretinib",
          "Crizotinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "MTAP",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Pyrimidine Antagonist"
        ],
        "in_target_set": false
      },
      {
        "gene": "ALK",
        "best_level": "E",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Crizotinib"
        ],
        "in_target_set": false
      }
    ],
    "cohort_blind_spots": [
      {
        "gene": "ESR1",
        "basis": "expression",
        "n_mutated_samples": 2,
        "of": 507,
        "n_programs": 7,
        "best_phase": "approved",
        "reason": "Y537S / D538G and neighbours arise under aromatase-inhibitor pressure in metastatic disease. A primary-tumour cohort cannot see them by construction — an empty track here is a property of the cohort, not of the gene."
      }
    ],
    "not_mutation_selected": [
      {
        "gene": "TACSTD2",
        "basis": "expression",
        "n_mutated_samples": 1,
        "of": 507,
        "n_programs": 8,
        "best_phase": "approved",
        "reason": "TROP2 is an ADC delivery address, not a driver — expression is the whole selection criterion."
      },
      {
        "gene": "CDK4",
        "basis": "pathway",
        "n_mutated_samples": 0,
        "of": 507,
        "n_programs": 6,
        "best_phase": "approved",
        "reason": "Rarely mutated. The dependency comes from cyclin D–CDK4/6–RB deregulation upstream."
      },
      {
        "gene": "PDCD1",
        "basis": "expression",
        "n_mutated_samples": 1,
        "of": 507,
        "n_programs": 5,
        "best_phase": "approved",
        "reason": "Target is on the T cell, not the tumour."
      },
      {
        "gene": "CDK6",
        "basis": "pathway",
        "n_mutated_samples": 1,
        "of": 507,
        "n_programs": 4,
        "best_phase": "approved",
        "reason": "As CDK4 — the pathway is the target, not the gene."
      },
      {
        "gene": "PARP1",
        "basis": "synthetic-lethal",
        "n_mutated_samples": 1,
        "of": 507,
        "n_programs": 2,
        "best_phase": "approved",
        "reason": "PARP1 is not the altered gene. Inhibiting it kills cells that have already lost homologous recombination — the biomarker is BRCA1/2, not PARP1."
      },
      {
        "gene": "CD274",
        "basis": "expression",
        "n_mutated_samples": 1,
        "of": 507,
        "n_programs": 1,
        "best_phase": "discontinued",
        "reason": "PD-L1 by IHC (CPS) selects checkpoint blockade."
      }
    ],
    "thresholds": {
      "altered_pct": 5.0,
      "comparable_ratio": 0.6,
      "blind_spot_n": 5,
      "min_denominator": 20
    }
  },
  "labels_summary": {
    "source": "openFDA drug label API (US FDA Structured Product Labeling)",
    "api": "https://api.fda.gov/drug/label.json",
    "licence": "openFDA is a US federal government resource; label content is publicly available regulatory text",
    "n_drugs": 51,
    "n_with_label": 40,
    "n_boxed_warnings": 18,
    "n_with_frequencies": 6,
    "lookup_failed": [],
    "caveat": "Excerpts of US FDA labels, not a safety summary and not advice. An agent without a label here is one openFDA returned no US label for: an investigational agent has none yet, and an approved one may be approved outside the US or missed by the search. Neither means it has no side effects."
  }
};
