/* GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Produced by pipeline/run.py targets on 2026-10-18 04:56 UTC
 * Targets: 24   Drugs: 28 (28 matched to ClinicalTrials.gov)
 * Alteration cohort: crc_msk_2017 (Metastatic Colorectal Cancer (MSK, Cancer Cell 2018), n=1134)
 *
 * Protein length and domains: UniProt (reviewed human entries).
 * Structure images: RCSB PDB, public domain. Static deposited renders,
 * not pocket views and not rotatable — the RCSB link is the real viewer.
 * Drugs: curated colorectal drug pipeline, joined to ClinicalTrials.gov by NCT id.
 *
 * The `gaps` block is arithmetic over these sources, not advice. The
 * repositioning list in particular is a list of questions to ask, and
 * mixes two classification axes on purpose — see its axis_note.
 */
window.CancerExplorerTargets = window.CancerExplorerTargets || {};
window.CancerExplorerTargets['colorectal'] = {
  "cancer": "colorectal",
  "cohort": {
    "id": "crc_msk_2017",
    "name": "Metastatic Colorectal Cancer (MSK, Cancer Cell 2018)",
    "citation": "Yaeger et al. Cancer Cell 2018",
    "pmid": "29316426",
    "n_samples": 1134,
    "n_patients": 1099
  },
  "sources": {
    "protein": "UniProt (Swiss-Prot, reviewed human entries)",
    "structure": "RCSB PDB",
    "structure_note": "Static deposited-structure renders. Not pocket views, and not rotatable — follow the RCSB link for an interactive viewer.",
    "alterations": "cBioPortal",
    "drugs": "curated colorectal drug pipeline",
    "trials": "ClinicalTrials.gov registry records, joined by NCT id",
    "evidence": "CIViC (Clinical Interpretation of Variants in Cancer)"
  },
  "n_targets": 24,
  "genes": {
    "KRAS": {
      "gene": "KRAS",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Only G12C has approved drugs in colorectal cancer, each given with an anti-EGFR antibody. Any other KRAS change rules those antibodies out.",
      "uniprot": {
        "gene": "KRAS",
        "accession": "P01116",
        "entry_name": "RASK_HUMAN",
        "protein": "GTPase KRas",
        "length": 189,
        "domains": [
          {
            "kind": "Region",
            "name": "Hypervariable region",
            "start": 166,
            "end": 185
          }
        ],
        "pdb_count": 488,
        "pdb_ids": [
          "10JT",
          "10NU",
          "10NV",
          "11QE",
          "1D8D",
          "1D8E",
          "1KZO",
          "1KZP",
          "1N4P",
          "1N4Q",
          "1N4R",
          "1N4S",
          "2MSC",
          "2MSD",
          "2MSE",
          "3GFT",
          "4DSN",
          "4DSO",
          "4EPR",
          "4EPT",
          "4EPV",
          "4EPW",
          "4EPX",
          "4EPY",
          "4L8G",
          "4LDJ",
          "4LPK",
          "4LRW",
          "4LUC",
          "4LV6",
          "4LYF",
          "4LYH",
          "4LYJ",
          "4M1O",
          "4M1S",
          "4M1T",
          "4M1W",
          "4M1Y",
          "4M21",
          "4M22"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P01116",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P01116"
      },
      "structure": {
        "pdb": "6OIM",
        "title": "Crystal Structure of human KRAS G12C covalently bound to AMG 510",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.65,
        "ligands": [
          "GDP",
          "MG",
          "MOV"
        ],
        "deposited": "2019-11-06",
        "url": "https://www.rcsb.org/structure/6OIM",
        "image": "img/6oim.jpg",
        "image_bytes": 55103
      },
      "hotspots": [
        {
          "change": "G12D",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 136,
          "of": 1099,
          "pct": 12.4
        },
        {
          "change": "G12V",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 99,
          "of": 1099,
          "pct": 9.0
        },
        {
          "change": "G13D",
          "pos": 13,
          "type": "Missense_Mutation",
          "n": 87,
          "of": 1099,
          "pct": 7.9
        },
        {
          "change": "A146T",
          "pos": 146,
          "type": "Missense_Mutation",
          "n": 32,
          "of": 1099,
          "pct": 2.9
        },
        {
          "change": "G12C",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 31,
          "of": 1099,
          "pct": 2.8
        },
        {
          "change": "G12A",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 26,
          "of": 1099,
          "pct": 2.4
        },
        {
          "change": "G12S",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 20,
          "of": 1099,
          "pct": 1.8
        },
        {
          "change": "Q61H",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 10,
          "of": 1099,
          "pct": 0.9
        },
        {
          "change": "K117N",
          "pos": 117,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "G12R",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q61K",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "A146V",
          "pos": 146,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q61R",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "G13C",
          "pos": 13,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "D33E",
          "pos": 33,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "D57N",
          "pos": 57,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "A59T",
          "pos": 59,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "A146P",
          "pos": 146,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 486,
      "n_distinct_changes": 31,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 31,
              "of": 31,
              "pct": 100.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 402,
              "of": 438,
              "pct": 91.8
            },
            "amplification": {
              "n": 4,
              "of": 438,
              "pct": 0.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 5,
              "of": 450,
              "pct": 1.1
            },
            "amplification": {
              "n": 9,
              "of": 450,
              "pct": 2.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 100.0,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-4",
        "drug-5"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 269,
        "n_accepted": 99,
        "best_level": "A",
        "levels": {
          "A": 8,
          "B": 80,
          "C": 125,
          "D": 56
        },
        "evidence_types": {
          "DIAGNOSTIC": 3,
          "ONCOGENIC": 6,
          "PREDICTIVE": 244,
          "PROGNOSTIC": 16
        },
        "top_therapies": [
          "Cetuximab",
          "Panitumumab",
          "Chemotherapy",
          "Regorafenib Anhydrous",
          "Selumetinib",
          "Irinotecan"
        ]
      },
      "selected_on": "allele"
    },
    "NRAS": {
      "gene": "NRAS",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A mutation rules out the anti-EGFR antibodies, whose panitumumab label defines wild type in both KRAS and NRAS. No agent here is aimed at NRAS.",
      "uniprot": {
        "gene": "NRAS",
        "accession": "P01111",
        "entry_name": "RASN_HUMAN",
        "protein": "GTPase NRas",
        "length": 189,
        "domains": [
          {
            "kind": "Region",
            "name": "Hypervariable region",
            "start": 166,
            "end": 185
          }
        ],
        "pdb_count": 35,
        "pdb_ids": [
          "2N9C",
          "3CON",
          "5UHV",
          "6E6H",
          "6MPP",
          "6ULI",
          "6ULK",
          "6ULN",
          "6ULR",
          "6UON",
          "6WGH",
          "6ZIO",
          "6ZIR",
          "6ZIZ",
          "7F68",
          "7OW3",
          "7OW4",
          "7OW5",
          "7OW6",
          "7PB2",
          "8TBI",
          "8VM2",
          "9BG0",
          "9BG3",
          "9BG8",
          "9BGD",
          "9BTM",
          "9GLW",
          "9GLX",
          "9Y0G",
          "9Y1W",
          "9Y1X",
          "9Y1Y",
          "9Y1Z",
          "9Y3W"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P01111",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P01111"
      },
      "structure": {
        "pdb": "3CON",
        "title": "Crystal structure of the human NRAS GTPase bound with GDP",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.649,
        "ligands": [
          "GDP",
          "MG"
        ],
        "deposited": "2008-04-08",
        "url": "https://www.rcsb.org/structure/3CON",
        "image": "img/3con.jpg",
        "image_bytes": 55893
      },
      "hotspots": [
        {
          "change": "Q61K",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 9,
          "of": 1099,
          "pct": 0.8
        },
        {
          "change": "G12D",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "Q61R",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q61L",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "G12C",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G13R",
          "pos": 13,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G13D",
          "pos": 13,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "A91V",
          "pos": 91,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 46,
      "n_distinct_changes": 18,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 38,
              "of": 438,
              "pct": 8.7
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            },
            "any_loss": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 8.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 39,
        "n_accepted": 17,
        "best_level": "A",
        "levels": {
          "A": 2,
          "B": 9,
          "C": 8,
          "D": 20
        },
        "evidence_types": {
          "PREDICTIVE": 37,
          "PROGNOSTIC": 2
        },
        "top_therapies": [
          "Cetuximab",
          "Dactolisib",
          "Chemotherapy",
          "Irinotecan",
          "Selumetinib",
          "Panitumumab"
        ]
      },
      "selected_on": null
    },
    "BRAF": {
      "gene": "BRAF",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "V600E selects encorafenib, labelled only with cetuximab. The dabrafenib label says it is not indicated for colorectal cancer because of known intrinsic resistance to BRAF inhibition.",
      "uniprot": {
        "gene": "BRAF",
        "accession": "P15056",
        "entry_name": "BRAF_HUMAN",
        "protein": "Serine/threonine-protein kinase B-raf",
        "length": 766,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 38
          },
          {
            "kind": "Domain",
            "name": "RBD",
            "start": 155,
            "end": 227
          },
          {
            "kind": "Zinc finger",
            "name": "Phorbol-ester/DAG-type",
            "start": 234,
            "end": 280
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 308,
            "end": 454
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 457,
            "end": 717
          }
        ],
        "pdb_count": 131,
        "pdb_ids": [
          "1UWH",
          "1UWJ",
          "2FB8",
          "2L05",
          "3C4C",
          "3D4Q",
          "3IDP",
          "3II5",
          "3NY5",
          "3OG7",
          "3PPJ",
          "3PPK",
          "3PRF",
          "3PRI",
          "3PSB",
          "3PSD",
          "3Q4C",
          "3Q96",
          "3SKC",
          "3TV4",
          "3TV6",
          "4CQE",
          "4DBN",
          "4E26",
          "4E4X",
          "4EHE",
          "4EHG",
          "4FC0",
          "4FK3",
          "4G9C",
          "4G9R",
          "4H58",
          "4JVG",
          "4KSP",
          "4KSQ",
          "4MBJ",
          "4MNE",
          "4MNF",
          "4PP7",
          "4R5Y"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P15056",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P15056"
      },
      "structure": {
        "pdb": "4XV2",
        "title": "B-Raf Kinase V600E oncogenic mutant in complex with Dabrafenib",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.5,
        "ligands": [],
        "deposited": "2015-10-28",
        "url": "https://www.rcsb.org/structure/4XV2",
        "image": "img/4xv2.jpg",
        "image_bytes": 56623
      },
      "hotspots": [
        {
          "change": "V600E",
          "pos": 600,
          "type": "Missense_Mutation",
          "n": 74,
          "of": 1099,
          "pct": 6.7
        },
        {
          "change": "D594G",
          "pos": 594,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "G469A",
          "pos": 469,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "D594N",
          "pos": 594,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "K601E",
          "pos": 601,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "A404Cfs*9",
          "pos": 403,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "P403Lfs*8",
          "pos": 403,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G466V",
          "pos": 466,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R558Q",
          "pos": 558,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "N581S",
          "pos": 581,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "T599delinsIP",
          "pos": 599,
          "type": "In_Frame_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 119,
      "n_distinct_changes": 35,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 50,
              "of": 50,
              "pct": 100.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 10,
              "of": 438,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 24,
              "of": 450,
              "pct": 5.3
            },
            "amplification": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            }
          }
        },
        "max_pct": 100.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-6",
        "drug-7"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 109,
        "n_accepted": 69,
        "best_level": "A",
        "levels": {
          "A": 2,
          "B": 59,
          "C": 21,
          "D": 26,
          "E": 1
        },
        "evidence_types": {
          "ONCOGENIC": 5,
          "PREDICTIVE": 84,
          "PROGNOSTIC": 20
        },
        "top_therapies": [
          "Cetuximab",
          "Vemurafenib",
          "Panitumumab",
          "Irinotecan",
          "Encorafenib",
          "Oxaliplatin"
        ]
      },
      "selected_on": "allele"
    },
    "ERBB2": {
      "gene": "ERBB2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "HER2 positivity selects tucatinib with trastuzumab only in RAS wild-type disease; trastuzumab deruxtecan is labelled for HER2-positive (IHC 3+) solid tumours.",
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
          "change": "R678Q",
          "pos": 678,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "V842I",
          "pos": 842,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S310F",
          "pos": 310,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "V777L",
          "pos": 777,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "A293T",
          "pos": 293,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 52,
      "n_distinct_changes": 36,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 3,
              "of": 26,
              "pct": 11.5
            },
            "amplification": {
              "n": 26,
              "of": 26,
              "pct": 100.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 10,
              "of": 438,
              "pct": 2.3
            },
            "amplification": {
              "n": 7,
              "of": 438,
              "pct": 1.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 17,
              "of": 450,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 100.0,
        "max_node": "drv-her2-amp",
        "max_metric": "amplification"
      },
      "drugs": [
        "drug-8",
        "drug-9"
      ],
      "n_programs": 2,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 28,
        "n_accepted": 19,
        "best_level": "B",
        "best_level_submitted": "A",
        "levels": {
          "A": 1,
          "B": 13,
          "C": 1,
          "D": 13
        },
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 27
        },
        "top_therapies": [
          "Trastuzumab",
          "Cetuximab",
          "Lapatinib",
          "Neratinib",
          "Pertuzumab",
          "Tucatinib"
        ]
      },
      "selected_on": null
    },
    "NTRK1": {
      "gene": "NTRK1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A fusion selects a TRK inhibitor under a label written for any solid tumour.",
      "uniprot": {
        "gene": "NTRK1",
        "accession": "P04629",
        "entry_name": "NTRK1_HUMAN",
        "protein": "High affinity nerve growth factor receptor",
        "length": 796,
        "domains": [
          {
            "kind": "Repeat",
            "name": "LRR 1",
            "start": 90,
            "end": 113
          },
          {
            "kind": "Repeat",
            "name": "LRR 2",
            "start": 116,
            "end": 137
          },
          {
            "kind": "Domain",
            "name": "LRRCT",
            "start": 148,
            "end": 193
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 1",
            "start": 194,
            "end": 283
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 2",
            "start": 299,
            "end": 365
          },
          {
            "kind": "Region",
            "name": "Interaction with SQSTM1",
            "start": 469,
            "end": 490
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 510,
            "end": 781
          }
        ],
        "pdb_count": 65,
        "pdb_ids": [
          "1HE7",
          "1SHC",
          "1WWA",
          "1WWW",
          "2IFG",
          "2N90",
          "4AOJ",
          "4CRP",
          "4F0I",
          "4GT5",
          "4PMM",
          "4PMP",
          "4PMS",
          "4PMT",
          "4YNE",
          "4YPS",
          "5H3Q",
          "5I8A",
          "5JFS",
          "5JFV",
          "5JFW",
          "5JFX",
          "5KMI",
          "5KMJ",
          "5KMK",
          "5KML",
          "5KMM",
          "5KMN",
          "5KMO",
          "5KVT",
          "5WR7",
          "6D1Y",
          "6D1Z",
          "6D20",
          "6D22",
          "6DKB",
          "6DKG",
          "6DKI",
          "6DKW",
          "6IQN"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P04629",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P04629"
      },
      "structure": {
        "pdb": "4AOJ",
        "title": "Human TrkA in complex with the inhibitor AZ-23",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.75,
        "ligands": [
          "ZN"
        ],
        "deposited": "2012-08-15",
        "url": "https://www.rcsb.org/structure/4AOJ",
        "image": "img/4aoj.jpg",
        "image_bytes": 97824
      },
      "hotspots": [
        {
          "change": "A107V",
          "pos": 107,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "D738N",
          "pos": 738,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 35,
      "n_distinct_changes": 37,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 7,
              "of": 438,
              "pct": 1.6
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            }
          }
        },
        "max_pct": 0.2,
        "max_node": "drv-wild-type",
        "max_metric": "fusion"
      },
      "drugs": [
        "drug-22",
        "drug-23",
        "drug-24"
      ],
      "n_programs": 3,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 6,
        "n_accepted": 6,
        "best_level": "C",
        "levels": {
          "C": 4,
          "D": 2
        },
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Entrectinib",
          "Larotrectinib",
          "Lestaurtinib"
        ]
      },
      "selected_on": "fusion"
    },
    "RET": {
      "gene": "RET",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A fusion selects selpercatinib under a label written for any solid tumour.",
      "uniprot": {
        "gene": "RET",
        "accession": "P07949",
        "entry_name": "RET_HUMAN",
        "protein": "Proto-oncogene tyrosine-protein kinase receptor Ret",
        "length": 1114,
        "domains": [
          {
            "kind": "Region",
            "name": "Cadherin-like region 1 (CLD1)",
            "start": 29,
            "end": 153
          },
          {
            "kind": "Domain",
            "name": "Cadherin",
            "start": 168,
            "end": 272
          },
          {
            "kind": "Region",
            "name": "Cadherin-like region 3 (CLD3)",
            "start": 265,
            "end": 379
          },
          {
            "kind": "Region",
            "name": "Cadherin-like region 4 (CLD4)",
            "start": 405,
            "end": 506
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 724,
            "end": 1016
          }
        ],
        "pdb_count": 34,
        "pdb_ids": [
          "2IVS",
          "2IVT",
          "2IVU",
          "2IVV",
          "2X2K",
          "2X2L",
          "2X2M",
          "2X2U",
          "4CKI",
          "4CKJ",
          "4UX8",
          "5AMN",
          "5FM2",
          "5FM3",
          "6FEK",
          "6GL7",
          "6I82",
          "6I83",
          "6NE7",
          "6NEC",
          "6NJA",
          "6Q2J",
          "6Q2N",
          "6Q2O",
          "6Q2R",
          "6Q2S",
          "6VHG",
          "7DU8",
          "7DU9",
          "7DUA",
          "7JU5",
          "7JU6",
          "7NZN",
          "7RUN"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P07949",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P07949"
      },
      "structure": {
        "pdb": "7JU6",
        "title": "Structure of RET protein tyrosine kinase in complex with selpercatinib",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.06,
        "ligands": [
          "FMT"
        ],
        "deposited": "2020-11-11",
        "url": "https://www.rcsb.org/structure/7JU6",
        "image": "img/7ju6.jpg",
        "image_bytes": 71009
      },
      "hotspots": [
        {
          "change": "A306V",
          "pos": 306,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "A373V",
          "pos": 373,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 27,
      "n_distinct_changes": 25,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 3,
              "of": 50,
              "pct": 6.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 2,
              "of": 31,
              "pct": 6.5
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "any_loss": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            }
          }
        },
        "max_pct": 0.2,
        "max_node": "drv-wild-type",
        "max_metric": "fusion"
      },
      "drugs": [
        "drug-25"
      ],
      "n_programs": 1,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "C",
        "levels": {
          "C": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Agerafenib"
        ]
      },
      "selected_on": "fusion"
    },
    "EGFR": {
      "gene": "EGFR",
      "basis": "expression",
      "biomarker_gene": null,
      "why": "The test that decides eligibility is for RAS, not EGFR; cetuximab's label also asks for EGFR-expressing disease.",
      "uniprot": {
        "gene": "EGFR",
        "accession": "P00533",
        "entry_name": "EGFR_HUMAN",
        "protein": "Epidermal growth factor receptor",
        "length": 1210,
        "domains": [
          {
            "kind": "Repeat",
            "name": "Approximate",
            "start": 75,
            "end": 300
          },
          {
            "kind": "Repeat",
            "name": "Approximate",
            "start": 390,
            "end": 600
          },
          {
            "kind": "Region",
            "name": "Important for dimerization, phosphorylation and activation",
            "start": 688,
            "end": 704
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 712,
            "end": 979
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1097,
            "end": 1137
          }
        ],
        "pdb_count": 385,
        "pdb_ids": [
          "1IVO",
          "1M14",
          "1M17",
          "1MOX",
          "1NQL",
          "1XKK",
          "1YY9",
          "1Z9I",
          "2EB2",
          "2EB3",
          "2GS2",
          "2GS6",
          "2GS7",
          "2ITN",
          "2ITO",
          "2ITP",
          "2ITQ",
          "2ITT",
          "2ITU",
          "2ITV",
          "2ITW",
          "2ITX",
          "2ITY",
          "2ITZ",
          "2J5E",
          "2J5F",
          "2J6M",
          "2JIT",
          "2JIU",
          "2JIV",
          "2KS1",
          "2M0B",
          "2M20",
          "2N5S",
          "2RF9",
          "2RFD",
          "2RFE",
          "2RGP",
          "3B2U",
          "3B2V"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P00533",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P00533"
      },
      "structure": {
        "pdb": "1YY9",
        "title": "Structure of the extracellular domain of the epidermal growth factor receptor in complex with the Fab fragment of cetuximab/Erbitux/IMC-C225",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.605,
        "ligands": [
          "NAG"
        ],
        "deposited": "2005-04-26",
        "url": "https://www.rcsb.org/structure/1YY9",
        "image": "img/1yy9.jpg",
        "image_bytes": 52784
      },
      "hotspots": [
        {
          "change": "L861Q",
          "pos": 861,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 30,
      "n_distinct_changes": 32,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 4,
              "of": 438,
              "pct": 0.9
            },
            "amplification": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 8,
              "of": 450,
              "pct": 1.8
            },
            "amplification": {
              "n": 13,
              "of": 450,
              "pct": 2.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            }
          }
        },
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-0",
        "drug-1",
        "drug-2",
        "drug-3",
        "drug-4",
        "drug-5",
        "drug-6",
        "drug-7"
      ],
      "n_programs": 8,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 52,
        "n_accepted": 18,
        "best_level": "B",
        "levels": {
          "B": 31,
          "C": 6,
          "D": 14,
          "E": 1
        },
        "evidence_types": {
          "PREDICTIVE": 51,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Cetuximab",
          "Panitumumab",
          "Futuximab/Modotuximab Mixture",
          "Erlotinib",
          "Panitumumab Regimen",
          "Chemotherapy"
        ]
      },
      "selected_on": null
    },
    "KDR": {
      "gene": "KDR",
      "basis": "unselected",
      "biomarker_gene": null,
      "why": "No tumour test selects ramucirumab, fruquintinib or regorafenib. The receptor is on the cells lining blood vessels, not on the tumour.",
      "uniprot": {
        "gene": "KDR",
        "accession": "P35968",
        "entry_name": "VGFR2_HUMAN",
        "protein": "Vascular endothelial growth factor receptor 2",
        "length": 1356,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 1",
            "start": 46,
            "end": 110
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 2",
            "start": 141,
            "end": 207
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 3",
            "start": 224,
            "end": 320
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 4",
            "start": 328,
            "end": 414
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 5",
            "start": 421,
            "end": 548
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 6",
            "start": 551,
            "end": 660
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 7",
            "start": 667,
            "end": 753
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 834,
            "end": 1162
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1274,
            "end": 1318
          }
        ],
        "pdb_count": 54,
        "pdb_ids": [
          "1VR2",
          "1Y6A",
          "1Y6B",
          "1YWN",
          "2M59",
          "2MET",
          "2MEU",
          "2OH4",
          "2P2H",
          "2P2I",
          "2QU5",
          "2QU6",
          "2RL5",
          "2X1W",
          "2X1X",
          "2XIR",
          "3B8Q",
          "3B8R",
          "3BE2",
          "3C7Q",
          "3CJF",
          "3CJG",
          "3CP9",
          "3CPB",
          "3CPC",
          "3DTW",
          "3EFL",
          "3EWH",
          "3KVQ",
          "3S35",
          "3S36",
          "3S37",
          "3U6J",
          "3V2A",
          "3V6B",
          "3VHE",
          "3VHK",
          "3VID",
          "3VNT",
          "3VO3"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P35968",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P35968"
      },
      "structure": {
        "pdb": "3V2A",
        "title": "VEGFR-2/VEGF-A COMPLEX STRUCTURE",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.204,
        "ligands": [],
        "deposited": "2012-01-18",
        "url": "https://www.rcsb.org/structure/3V2A",
        "image": "img/3v2a.jpg",
        "image_bytes": 51160
      },
      "hotspots": [
        {
          "change": "R347H",
          "pos": 347,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E685K",
          "pos": 685,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 32,
      "n_distinct_changes": 38,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "any_loss": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 7,
              "of": 438,
              "pct": 1.6
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 7,
              "of": 450,
              "pct": 1.6
            },
            "amplification": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-12",
        "drug-14",
        "drug-15"
      ],
      "n_programs": 3,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 10,
        "n_accepted": 2,
        "best_level": "C",
        "levels": {
          "C": 1,
          "D": 9
        },
        "evidence_types": {
          "ONCOGENIC": 8,
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Axitinib",
          "Cabozantinib",
          "Dovitinib",
          "Lenvatinib",
          "Regorafenib Anhydrous"
        ]
      },
      "selected_on": null
    },
    "VEGFA": {
      "gene": "VEGFA",
      "basis": "unselected",
      "biomarker_gene": null,
      "why": "Bevacizumab and ziv-aflibercept bind the growth factor itself, and no tumour test selects either.",
      "uniprot": {
        "gene": "VEGFA",
        "accession": "P15692",
        "entry_name": "VEGFA_HUMAN",
        "protein": "Vascular endothelial growth factor A, long form",
        "length": 395,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 45
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 73,
            "end": 175
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 314,
            "end": 344
          }
        ],
        "pdb_count": 56,
        "pdb_ids": [
          "1BJ1",
          "1CZ8",
          "1FLT",
          "1KAT",
          "1KMX",
          "1MJV",
          "1MKG",
          "1MKK",
          "1QTY",
          "1TZH",
          "1TZI",
          "1VGH",
          "1VPF",
          "1VPP",
          "2FJG",
          "2FJH",
          "2QR0",
          "2VGH",
          "2VPF",
          "3BDY",
          "3P9W",
          "3QTK",
          "3S1B",
          "3S1K",
          "3V2A",
          "4DEQ",
          "4GLN",
          "4GLS",
          "4KZN",
          "4QAF",
          "4WPB",
          "4ZFF",
          "5DN2",
          "5FV1",
          "5FV2",
          "5HHC",
          "5HHD",
          "5O4E",
          "5T89",
          "6BFT"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P15692",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P15692"
      },
      "structure": {
        "pdb": "6BFT",
        "title": "Structure of Bevacizumab Fab mutant in complex with VEGF",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.55,
        "ligands": [],
        "deposited": "2018-10-31",
        "url": "https://www.rcsb.org/structure/6BFT",
        "image": "img/6bft.jpg",
        "image_bytes": 41116
      },
      "hotspots": [],
      "n_mutated_samples": 5,
      "n_distinct_changes": 5,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 40,
              "pct": 2.5
            },
            "amplification": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 356,
              "pct": 0.3
            },
            "amplification": {
              "n": 2,
              "of": 356,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "amplification": {
              "n": 4,
              "of": 363,
              "pct": 1.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            }
          }
        },
        "max_pct": 2.5,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-10",
        "drug-11",
        "drug-13",
        "drug-17"
      ],
      "n_programs": 4,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 3,
        "n_accepted": 1,
        "best_level": "B",
        "levels": {
          "B": 2,
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Bevacizumab",
          "Levoleucovorin",
          "Irinotecan",
          "Fluorouracil"
        ]
      },
      "selected_on": null
    },
    "PDCD1": {
      "gene": "PDCD1",
      "basis": "marker",
      "biomarker_gene": "mismatch repair status",
      "why": "The target is on the T cell. In colorectal cancer the labels select by mismatch repair deficiency or MSI-H, not by PD-L1.",
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
      "hotspots": [
        {
          "change": "T36Pfs*9",
          "pos": 35,
          "type": "Frame_Shift_Del",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "T36Hfs*70",
          "pos": 35,
          "type": "Frame_Shift_Ins",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 18,
      "n_distinct_changes": 9,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 0.4,
        "max_node": "drv-wild-type",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-18",
        "drug-19",
        "drug-20",
        "drug-21",
        "drug-27"
      ],
      "n_programs": 5,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "MLH1": {
      "gene": "MLH1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "One of the four repair proteins on the stain. MSI-H tumours are outside the driver-class nodes these figures come from.",
      "uniprot": {
        "gene": "MLH1",
        "accession": "P40692",
        "entry_name": "MLH1_HUMAN",
        "protein": "DNA mismatch repair protein Mlh1",
        "length": 756,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 355,
            "end": 378
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 400,
            "end": 491
          },
          {
            "kind": "Region",
            "name": "Interaction with EXO1",
            "start": 410,
            "end": 650
          }
        ],
        "pdb_count": 7,
        "pdb_ids": [
          "3RBN",
          "4P7A",
          "5U5P",
          "6WBA",
          "6WBB",
          "6WBC",
          "7M60"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P40692",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P40692"
      },
      "structure": {
        "pdb": "4P7A",
        "title": "Crystal Structure of human MLH1",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.3,
        "ligands": [
          "ADP",
          "MG"
        ],
        "deposited": "2014-04-09",
        "url": "https://www.rcsb.org/structure/4P7A",
        "image": "img/4p7a.jpg",
        "image_bytes": 78929
      },
      "hotspots": [],
      "n_mutated_samples": 20,
      "n_distinct_changes": 24,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 0.2,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 21,
        "n_accepted": 21,
        "best_level": "C",
        "levels": {
          "C": 21
        },
        "evidence_types": {
          "ONCOGENIC": 21
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "MSH2": {
      "gene": "MSH2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "One of the four repair proteins on the stain. MSI-H tumours are outside the driver-class nodes these figures come from.",
      "uniprot": {
        "gene": "MSH2",
        "accession": "P43246",
        "entry_name": "MSH2_HUMAN",
        "protein": "DNA mismatch repair protein Msh2",
        "length": 934,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with EXO1",
            "start": 601,
            "end": 671
          }
        ],
        "pdb_count": 30,
        "pdb_ids": [
          "2O8B",
          "2O8C",
          "2O8D",
          "2O8E",
          "2O8F",
          "3THW",
          "3THX",
          "3THY",
          "3THZ",
          "8AG6",
          "8OLX",
          "8OM5",
          "8OM9",
          "8OMA",
          "8OMO",
          "8OMQ",
          "8R7C",
          "8R7E",
          "8R7V",
          "8RAU",
          "8RAV",
          "8RAW",
          "8RAX",
          "8RAZ",
          "8RB0",
          "8RB1",
          "8RB2",
          "8RZ7",
          "8RZ8",
          "8RZ9"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P43246",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P43246"
      },
      "structure": {
        "pdb": "2O8B",
        "title": "human MutSalpha (MSH2/MSH6) bound to ADP and a G T mispair",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.75,
        "ligands": [
          "ADP",
          "MG"
        ],
        "deposited": "2007-06-05",
        "url": "https://www.rcsb.org/structure/2O8B",
        "image": "img/2o8b.jpg",
        "image_bytes": 92113
      },
      "hotspots": [
        {
          "change": "E580*",
          "pos": 580,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "A230Lfs*16",
          "pos": 227,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R680*",
          "pos": 680,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 31,
      "n_distinct_changes": 39,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "amplification": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 3,
        "n_accepted": 3,
        "best_level": "C",
        "levels": {
          "C": 3
        },
        "evidence_types": {
          "ONCOGENIC": 3
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "MSH6": {
      "gene": "MSH6",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "One of the four repair proteins on the stain. MSI-H tumours are outside the driver-class nodes these figures come from.",
      "uniprot": {
        "gene": "MSH6",
        "accession": "P52701",
        "entry_name": "MSH6_HUMAN",
        "protein": "DNA mismatch repair protein Msh6",
        "length": 1360,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 84
          },
          {
            "kind": "Domain",
            "name": "PWWP",
            "start": 92,
            "end": 154
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 195,
            "end": 362
          }
        ],
        "pdb_count": 8,
        "pdb_ids": [
          "2GFU",
          "2O8B",
          "2O8C",
          "2O8D",
          "2O8E",
          "2O8F",
          "6OQM",
          "8AG6"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P52701",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P52701"
      },
      "structure": {
        "pdb": "2O8B",
        "title": "human MutSalpha (MSH2/MSH6) bound to ADP and a G T mispair",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.75,
        "ligands": [
          "ADP",
          "MG"
        ],
        "deposited": "2007-06-05",
        "url": "https://www.rcsb.org/structure/2O8B",
        "image": "img/2o8b.jpg",
        "image_bytes": 92113
      },
      "hotspots": [
        {
          "change": "F1088Lfs*5",
          "pos": 1085,
          "type": "Frame_Shift_Ins",
          "n": 10,
          "of": 1099,
          "pct": 0.9
        },
        {
          "change": "E807K",
          "pos": 807,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E1234*",
          "pos": 1234,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 39,
      "n_distinct_changes": 40,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "amplification": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 5,
              "of": 450,
              "pct": 1.1
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 2.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 4,
        "best_level": "C",
        "levels": {
          "C": 5
        },
        "evidence_types": {
          "ONCOGENIC": 5
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "PMS2": {
      "gene": "PMS2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "One of the four repair proteins on the stain. MSI-H tumours are outside the driver-class nodes these figures come from.",
      "uniprot": {
        "gene": "PMS2",
        "accession": "P54278",
        "entry_name": "PMS2_HUMAN",
        "protein": "Mismatch repair endonuclease PMS2",
        "length": 862,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 391,
            "end": 552
          }
        ],
        "pdb_count": 8,
        "pdb_ids": [
          "1EA6",
          "1H7S",
          "1H7U",
          "5U5R",
          "6MFQ",
          "7RCB",
          "7RCI",
          "7RCK"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P54278",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P54278"
      },
      "structure": {
        "pdb": "1H7S",
        "title": "N-terminal 40kDa fragment of human PMS2",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.95,
        "ligands": [],
        "deposited": "2001-11-27",
        "url": "https://www.rcsb.org/structure/1H7S",
        "image": "img/1h7s.jpg",
        "image_bytes": 57249
      },
      "hotspots": [
        {
          "change": "E109Kfs*3",
          "pos": 109,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y268Tfs*39",
          "pos": 268,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 14,
      "n_distinct_changes": 13,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 4,
              "of": 438,
              "pct": 0.9
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "amplification": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 0.9,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "POLE": {
      "gene": "POLE",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Proofreading-domain mutations leave a tumour hypermutated. POLE-mutant tumours are outside the driver-class nodes these figures come from.",
      "uniprot": {
        "gene": "POLE",
        "accession": "Q07864",
        "entry_name": "DPOE1_HUMAN",
        "protein": "DNA polymerase epsilon catalytic subunit A",
        "length": 2286,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 30
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1939,
            "end": 1969
          },
          {
            "kind": "Zinc finger",
            "name": "CysA-type",
            "start": 2158,
            "end": 2190
          }
        ],
        "pdb_count": 18,
        "pdb_ids": [
          "5VBN",
          "7PFO",
          "7PLO",
          "9B8S",
          "9B8T",
          "9F6D",
          "9F6E",
          "9F6F",
          "9F6I",
          "9F6J",
          "9F6K",
          "9F6L",
          "9NE6",
          "9NE7",
          "9NE8",
          "9NE9",
          "9NEA",
          "9SRI"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q07864",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q07864"
      },
      "structure": null,
      "hotspots": [
        {
          "change": "P286R",
          "pos": 286,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "V411L",
          "pos": 411,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S459F",
          "pos": 459,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K1550Nfs*12",
          "pos": 1549,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 58,
      "n_distinct_changes": 65,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 50,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 8,
              "of": 438,
              "pct": 1.8
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "any_loss": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 4.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 3,
        "best_level": "B",
        "levels": {
          "B": 3,
          "C": 2
        },
        "evidence_types": {
          "PREDICTIVE": 2,
          "PROGNOSTIC": 3
        },
        "top_therapies": [
          "Pembrolizumab"
        ]
      },
      "selected_on": null
    },
    "APC": {
      "gene": "APC",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A tumour suppressor in WNT signalling. What is lost cannot be blocked, and no agent here is aimed at it.",
      "uniprot": {
        "gene": "APC",
        "accession": "P25054",
        "entry_name": "APC_HUMAN",
        "protein": "Adenomatous polyposis coli protein",
        "length": 2843,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 239,
            "end": 305
          },
          {
            "kind": "Repeat",
            "name": "ARM 1",
            "start": 453,
            "end": 495
          },
          {
            "kind": "Repeat",
            "name": "ARM 2",
            "start": 505,
            "end": 547
          },
          {
            "kind": "Repeat",
            "name": "ARM 3",
            "start": 548,
            "end": 591
          },
          {
            "kind": "Repeat",
            "name": "ARM 4",
            "start": 592,
            "end": 638
          },
          {
            "kind": "Repeat",
            "name": "ARM 5",
            "start": 639,
            "end": 683
          },
          {
            "kind": "Repeat",
            "name": "ARM 6",
            "start": 684,
            "end": 725
          },
          {
            "kind": "Repeat",
            "name": "ARM 7",
            "start": 726,
            "end": 767
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 828,
            "end": 878
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 923,
            "end": 943
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 958,
            "end": 987
          },
          {
            "kind": "Region",
            "name": "Responsible for down-regulation through a process mediated by direct ubiquitination",
            "start": 960,
            "end": 1337
          },
          {
            "kind": "Region",
            "name": "Interaction with catenins",
            "start": 1020,
            "end": 1169
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1099,
            "end": 1169
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1190,
            "end": 1244
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1311,
            "end": 1376
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1403,
            "end": 1475
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1526,
            "end": 1569
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1583,
            "end": 1611
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1664,
            "end": 1717
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1729,
            "end": 1836
          },
          {
            "kind": "Region",
            "name": "Highly charged",
            "start": 1866,
            "end": 1893
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1881,
            "end": 1950
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1965,
            "end": 2011
          },
          {
            "kind": "Region",
            "name": "Interaction with AXIN1",
            "start": 2035,
            "end": 2059
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2043,
            "end": 2072
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2147,
            "end": 2635
          },
          {
            "kind": "Region",
            "name": "Basic region",
            "start": 2167,
            "end": 2674
          },
          {
            "kind": "Region",
            "name": "Interaction with DLG1",
            "start": 2475,
            "end": 2843
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2667,
            "end": 2714
          },
          {
            "kind": "Region",
            "name": "Interaction with MAPRE1",
            "start": 2674,
            "end": 2843
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2729,
            "end": 2843
          }
        ],
        "pdb_count": 31,
        "pdb_ids": [
          "1DEB",
          "1EMU",
          "1JPP",
          "1M5I",
          "1T08",
          "1TH1",
          "1V18",
          "2RQU",
          "3AU3",
          "3NMW",
          "3NMX",
          "3NMZ",
          "3QHE",
          "3RL7",
          "3RL8",
          "3T7U",
          "4G69",
          "4YJE",
          "4YJL",
          "4YK6",
          "5B6G",
          "5IZ6",
          "5IZ8",
          "5IZ9",
          "5IZA",
          "5Z8H",
          "7F6M",
          "7F7O",
          "7XTY",
          "8GSJ",
          "8X2Q"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P25054",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P25054"
      },
      "structure": {
        "pdb": "1TH1",
        "title": "Beta-catenin in complex with a phosphorylated APC 20aa repeat fragment",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.5,
        "ligands": [],
        "deposited": "2004-09-07",
        "url": "https://www.rcsb.org/structure/1TH1",
        "image": "img/1th1.jpg",
        "image_bytes": 47038
      },
      "hotspots": [
        {
          "change": "R876*",
          "pos": 876,
          "type": "Nonsense_Mutation",
          "n": 53,
          "of": 1099,
          "pct": 4.8
        },
        {
          "change": "R1450*",
          "pos": 1450,
          "type": "Nonsense_Mutation",
          "n": 44,
          "of": 1099,
          "pct": 4.0
        },
        {
          "change": "R216*",
          "pos": 216,
          "type": "Nonsense_Mutation",
          "n": 35,
          "of": 1099,
          "pct": 3.2
        },
        {
          "change": "G279Ffs*10",
          "pos": 279,
          "type": "Frame_Shift_Ins",
          "n": 35,
          "of": 1099,
          "pct": 3.2
        },
        {
          "change": "R213*",
          "pos": 213,
          "type": "Nonsense_Mutation",
          "n": 31,
          "of": 1099,
          "pct": 2.8
        },
        {
          "change": "E1309Dfs*4",
          "pos": 1307,
          "type": "Frame_Shift_Del",
          "n": 29,
          "of": 1099,
          "pct": 2.6
        },
        {
          "change": "T1556Nfs*3",
          "pos": 1554,
          "type": "Frame_Shift_Ins",
          "n": 29,
          "of": 1099,
          "pct": 2.6
        },
        {
          "change": "R232*",
          "pos": 232,
          "type": "Nonsense_Mutation",
          "n": 28,
          "of": 1099,
          "pct": 2.5
        },
        {
          "change": "S1465Wfs*3",
          "pos": 1462,
          "type": "Frame_Shift_Del",
          "n": 24,
          "of": 1099,
          "pct": 2.2
        },
        {
          "change": "R283*",
          "pos": 283,
          "type": "Nonsense_Mutation",
          "n": 23,
          "of": 1099,
          "pct": 2.1
        },
        {
          "change": "Q1429*",
          "pos": 1429,
          "type": "Nonsense_Mutation",
          "n": 20,
          "of": 1099,
          "pct": 1.8
        },
        {
          "change": "R1114*",
          "pos": 1114,
          "type": "Nonsense_Mutation",
          "n": 18,
          "of": 1099,
          "pct": 1.6
        },
        {
          "change": "R554*",
          "pos": 554,
          "type": "Nonsense_Mutation",
          "n": 17,
          "of": 1099,
          "pct": 1.5
        },
        {
          "change": "R499*",
          "pos": 499,
          "type": "Nonsense_Mutation",
          "n": 16,
          "of": 1099,
          "pct": 1.5
        },
        {
          "change": "Q1367*",
          "pos": 1367,
          "type": "Nonsense_Mutation",
          "n": 16,
          "of": 1099,
          "pct": 1.5
        },
        {
          "change": "R805*",
          "pos": 805,
          "type": "Nonsense_Mutation",
          "n": 15,
          "of": 1099,
          "pct": 1.4
        },
        {
          "change": "Y935*",
          "pos": 935,
          "type": "Nonsense_Mutation",
          "n": 13,
          "of": 1099,
          "pct": 1.2
        },
        {
          "change": "R302*",
          "pos": 302,
          "type": "Nonsense_Mutation",
          "n": 12,
          "of": 1099,
          "pct": 1.1
        },
        {
          "change": "R564*",
          "pos": 564,
          "type": "Nonsense_Mutation",
          "n": 12,
          "of": 1099,
          "pct": 1.1
        },
        {
          "change": "E1322*",
          "pos": 1322,
          "type": "Nonsense_Mutation",
          "n": 12,
          "of": 1099,
          "pct": 1.1
        },
        {
          "change": "Q1406*",
          "pos": 1406,
          "type": "Nonsense_Mutation",
          "n": 12,
          "of": 1099,
          "pct": 1.1
        },
        {
          "change": "E1306*",
          "pos": 1306,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 1099,
          "pct": 1.0
        },
        {
          "change": "Q1338*",
          "pos": 1338,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 1099,
          "pct": 1.0
        },
        {
          "change": "E1353*",
          "pos": 1353,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 1099,
          "pct": 1.0
        },
        {
          "change": "Q1378*",
          "pos": 1378,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 1099,
          "pct": 1.0
        },
        {
          "change": "E1397*",
          "pos": 1397,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 1099,
          "pct": 1.0
        },
        {
          "change": "E1309*",
          "pos": 1309,
          "type": "Nonsense_Mutation",
          "n": 10,
          "of": 1099,
          "pct": 0.9
        },
        {
          "change": "P1319Lfs*2",
          "pos": 1319,
          "type": "Frame_Shift_Del",
          "n": 10,
          "of": 1099,
          "pct": 0.9
        },
        {
          "change": "E1379*",
          "pos": 1379,
          "type": "Nonsense_Mutation",
          "n": 9,
          "of": 1099,
          "pct": 0.8
        },
        {
          "change": "Q1303*",
          "pos": 1303,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "S1315*",
          "pos": 1315,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "E1408*",
          "pos": 1408,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "R1463Gfs*11",
          "pos": 1462,
          "type": "Frame_Shift_Ins",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "L1488Yfs*19",
          "pos": 1487,
          "type": "Frame_Shift_Del",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "K534*",
          "pos": 534,
          "type": "Nonsense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "I1307Nfs*8",
          "pos": 1306,
          "type": "Frame_Shift_Ins",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "E1345*",
          "pos": 1345,
          "type": "Nonsense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q879*",
          "pos": 879,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "E941*",
          "pos": 941,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "E1295*",
          "pos": 1295,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q1328*",
          "pos": 1328,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S1346*",
          "pos": 1346,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Y1376*",
          "pos": 1376,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "E1464Vfs*8",
          "pos": 1462,
          "type": "Frame_Shift_Del",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "X278_splice",
          "pos": 278,
          "type": "Splice_Site",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "K1165*",
          "pos": 1165,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "K1182*",
          "pos": 1182,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "Q1291*",
          "pos": 1291,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "Q1294*",
          "pos": 1294,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "A1296Qfs*9",
          "pos": 1295,
          "type": "Frame_Shift_Del",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "E1317*",
          "pos": 1317,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "S1356*",
          "pos": 1356,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "S1400*",
          "pos": 1400,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "D1486Ifs*21",
          "pos": 1485,
          "type": "Frame_Shift_Del",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "A1492Cfs*22",
          "pos": 1490,
          "type": "Frame_Shift_Ins",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "T1493Rfs*14",
          "pos": 1492,
          "type": "Frame_Shift_Del",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "D170Vfs*4",
          "pos": 169,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R332*",
          "pos": 332,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "N436Kfs*8",
          "pos": 435,
          "type": "Frame_Shift_Ins",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X438_splice",
          "pos": 438,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X582_splice",
          "pos": 582,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Q789*",
          "pos": 789,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "S895*",
          "pos": 895,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "L954*",
          "pos": 954,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Q1193*",
          "pos": 1193,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "T1208Pfs*57",
          "pos": 1207,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "S1276*",
          "pos": 1276,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G1357*",
          "pos": 1357,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "E1374*",
          "pos": 1374,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Y1376Cfs*9",
          "pos": 1376,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R1399Ffs*9",
          "pos": 1397,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "S1415Rfs*4",
          "pos": 1415,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Q1444*",
          "pos": 1444,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "T1487Nfs*27",
          "pos": 1487,
          "type": "Frame_Shift_Ins",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "L1488Ffs*19",
          "pos": 1488,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "F1491Lfs*16",
          "pos": 1490,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "E1521*",
          "pos": 1521,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "I1580Ffs*70",
          "pos": 1579,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R1920*",
          "pos": 1920,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R2166Q",
          "pos": 2166,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R2237*",
          "pos": 2237,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X178_splice",
          "pos": 178,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X215_splice",
          "pos": 215,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X216_splice",
          "pos": 216,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "H298Lfs*28",
          "pos": 296,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R405*",
          "pos": 405,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q412*",
          "pos": 412,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W423*",
          "pos": 423,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V452Sfs*7",
          "pos": 449,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S457*",
          "pos": 457,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X470_splice",
          "pos": 470,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W553*",
          "pos": 553,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "T562M",
          "pos": 562,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K581Rfs*9",
          "pos": 580,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S583*",
          "pos": 583,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "L592*",
          "pos": 592,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "N627Lfs*2",
          "pos": 625,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q625*",
          "pos": 625,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y737*",
          "pos": 737,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S747*",
          "pos": 747,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "H791Qfs*7",
          "pos": 790,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y796Wfs*2",
          "pos": 793,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E847*",
          "pos": 847,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E853Gfs*9",
          "pos": 853,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S932*",
          "pos": 932,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S943*",
          "pos": 943,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q1071*",
          "pos": 1071,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q1175*",
          "pos": 1175,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q1237Efs*2",
          "pos": 1236,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q1260Dfs*15",
          "pos": 1259,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E1286*",
          "pos": 1286,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1298Lfs*7",
          "pos": 1297,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "T1301Nfs*14",
          "pos": 1301,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R1314Sfs*7",
          "pos": 1314,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1344*",
          "pos": 1344,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E1353Vfs*20",
          "pos": 1353,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1392*",
          "pos": 1392,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "F1396Lfs*19",
          "pos": 1395,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1411Rfs*4",
          "pos": 1411,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1421Vfs*52",
          "pos": 1419,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "P1424Qfs*49",
          "pos": 1424,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R1435Kfs*38",
          "pos": 1435,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "T1438Hfs*35",
          "pos": 1437,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K1449Sfs*24",
          "pos": 1449,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "N1455Kfs*2",
          "pos": 1453,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "N1455Ifs*18",
          "pos": 1454,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1465Rfs*9",
          "pos": 1462,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q1477*",
          "pos": 1477,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "L1489Yfs*18",
          "pos": 1489,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E1494Vfs*12",
          "pos": 1493,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1495Vfs*12",
          "pos": 1494,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S1501Lfs*6",
          "pos": 1500,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E1536*",
          "pos": 1536,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "T1556Lfs*9",
          "pos": 1554,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K1561Rfs*4",
          "pos": 1560,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "P1639S",
          "pos": 1639,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V2194Ffs*5",
          "pos": 2191,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R2204*",
          "pos": 2204,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R2439C",
          "pos": 2439,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 846,
      "n_distinct_changes": 597,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 19,
              "of": 50,
              "pct": 38.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 20,
              "of": 26,
              "pct": 76.9
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 27,
              "of": 31,
              "pct": 87.1
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 354,
              "of": 438,
              "pct": 80.8
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 359,
              "of": 450,
              "pct": 79.8
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            },
            "any_loss": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            },
            "fusion": {
              "n": 6,
              "of": 450,
              "pct": 1.3
            }
          }
        },
        "max_pct": 87.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 4,
        "n_accepted": 2,
        "best_level": "D",
        "best_level_submitted": "B",
        "levels": {
          "B": 1,
          "C": 1,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 3,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Regorafenib",
          "G007-LK",
          "JW55"
        ]
      },
      "selected_on": null
    },
    "TP53": {
      "gene": "TP53",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Still undrugged: restoring a lost function is harder than blocking one.",
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
          "n": 74,
          "of": 1099,
          "pct": 6.7
        },
        {
          "change": "R282W",
          "pos": 282,
          "type": "Missense_Mutation",
          "n": 40,
          "of": 1099,
          "pct": 3.6
        },
        {
          "change": "R273H",
          "pos": 273,
          "type": "Missense_Mutation",
          "n": 38,
          "of": 1099,
          "pct": 3.5
        },
        {
          "change": "R273C",
          "pos": 273,
          "type": "Missense_Mutation",
          "n": 38,
          "of": 1099,
          "pct": 3.5
        },
        {
          "change": "R248Q",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 36,
          "of": 1099,
          "pct": 3.3
        },
        {
          "change": "R213*",
          "pos": 213,
          "type": "Nonsense_Mutation",
          "n": 32,
          "of": 1099,
          "pct": 2.9
        },
        {
          "change": "G245S",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 28,
          "of": 1099,
          "pct": 2.5
        },
        {
          "change": "R248W",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 28,
          "of": 1099,
          "pct": 2.5
        },
        {
          "change": "R342*",
          "pos": 342,
          "type": "Nonsense_Mutation",
          "n": 21,
          "of": 1099,
          "pct": 1.9
        },
        {
          "change": "R196*",
          "pos": 196,
          "type": "Nonsense_Mutation",
          "n": 17,
          "of": 1099,
          "pct": 1.5
        },
        {
          "change": "P152L",
          "pos": 152,
          "type": "Missense_Mutation",
          "n": 9,
          "of": 1099,
          "pct": 0.8
        },
        {
          "change": "R306*",
          "pos": 306,
          "type": "Nonsense_Mutation",
          "n": 9,
          "of": 1099,
          "pct": 0.8
        },
        {
          "change": "V173L",
          "pos": 173,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 1099,
          "pct": 0.7
        },
        {
          "change": "M237I",
          "pos": 237,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 1099,
          "pct": 0.7
        },
        {
          "change": "X307_splice",
          "pos": 307,
          "type": "Splice_Site",
          "n": 8,
          "of": 1099,
          "pct": 0.7
        },
        {
          "change": "G266E",
          "pos": 266,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "X331_splice",
          "pos": 331,
          "type": "Splice_Site",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "X126_splice",
          "pos": 126,
          "type": "Splice_Site",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "P151S",
          "pos": 151,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R158H",
          "pos": 158,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "C176F",
          "pos": 176,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R209Kfs*6",
          "pos": 209,
          "type": "Frame_Shift_Del",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "V73Rfs*76",
          "pos": 72,
          "type": "Frame_Shift_Ins",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "T125M",
          "pos": 125,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S127F",
          "pos": 127,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "P190L",
          "pos": 190,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Y220C",
          "pos": 220,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S241F",
          "pos": 241,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R337C",
          "pos": 337,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "X33_splice",
          "pos": 33,
          "type": "Splice_Site",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "L130V",
          "pos": 130,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "S90Lfs*59",
          "pos": 89,
          "type": "Frame_Shift_Ins",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "S90Pfs*33",
          "pos": 89,
          "type": "Frame_Shift_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Q104*",
          "pos": 104,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X125_splice",
          "pos": 125,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Y163C",
          "pos": 163,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "H168R",
          "pos": 168,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "V173M",
          "pos": 173,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "C176Y",
          "pos": 176,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "H179Y",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X187_splice",
          "pos": 187,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R213L",
          "pos": 213,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X224_splice",
          "pos": 224,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "Y236C",
          "pos": 236,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "C242F",
          "pos": 242,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G245C",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "P250L",
          "pos": 250,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "I255del",
          "pos": 255,
          "type": "In_Frame_Del",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X261_splice",
          "pos": 261,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "E271*",
          "pos": 271,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "P278T",
          "pos": 278,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "P278S",
          "pos": 278,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "E286K",
          "pos": 286,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "E294*",
          "pos": 294,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X332_splice",
          "pos": 332,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X32_splice",
          "pos": 32,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W53*",
          "pos": 53,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V73Wfs*50",
          "pos": 72,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W91*",
          "pos": 91,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R110L",
          "pos": 110,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V122Dfs*26",
          "pos": 122,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y126C",
          "pos": 126,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y126*",
          "pos": 126,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K132E",
          "pos": 132,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K132R",
          "pos": 132,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "F134L",
          "pos": 134,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C135Y",
          "pos": 135,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C141Y",
          "pos": 141,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q144Sfs*26",
          "pos": 144,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "P153Afs*28",
          "pos": 152,
          "type": "Frame_Shift_Ins",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G154V",
          "pos": 154,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V157F",
          "pos": 157,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "A161T",
          "pos": 161,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K164E",
          "pos": 164,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S166*",
          "pos": 166,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q167*",
          "pos": 167,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "H179Q",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "H179D",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R181H",
          "pos": 181,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V197M",
          "pos": 197,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E198*",
          "pos": 198,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y205C",
          "pos": 205,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "F212Sfs*3",
          "pos": 212,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R213Q",
          "pos": 213,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "H214Qfs*7",
          "pos": 214,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S215N",
          "pos": 215,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S215R",
          "pos": 215,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X225_splice",
          "pos": 225,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C229Yfs*10",
          "pos": 229,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y234H",
          "pos": 234,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y234C",
          "pos": 234,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y236D",
          "pos": 236,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C238Y",
          "pos": 238,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C242Y",
          "pos": 242,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G244S",
          "pos": 244,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G245D",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "L257P",
          "pos": 257,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "D259Y",
          "pos": 259,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G266R",
          "pos": 266,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R267W",
          "pos": 267,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V272L",
          "pos": 272,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R273L",
          "pos": 273,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V274A",
          "pos": 274,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E285K",
          "pos": 285,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q317*",
          "pos": 317,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K382Nfs*40",
          "pos": 382,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 798,
      "n_distinct_changes": 310,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 37,
              "of": 50,
              "pct": 74.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 50,
              "pct": 4.0
            },
            "any_loss": {
              "n": 2,
              "of": 50,
              "pct": 4.0
            },
            "fusion": {
              "n": 2,
              "of": 50,
              "pct": 4.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 22,
              "of": 26,
              "pct": 84.6
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "any_loss": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 18,
              "of": 31,
              "pct": 58.1
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 279,
              "of": 438,
              "pct": 63.7
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "any_loss": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "fusion": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 407,
              "of": 450,
              "pct": 90.4
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "any_loss": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "fusion": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            }
          }
        },
        "max_pct": 90.4,
        "max_node": "drv-wild-type",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 4,
        "n_accepted": 2,
        "best_level": "B",
        "levels": {
          "B": 2,
          "C": 2
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "PREDICTIVE": 2,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Cetuximab",
          "Capecitabine",
          "Oxaliplatin",
          "Pazopanib",
          "Vorinostat"
        ]
      },
      "selected_on": null
    },
    "SMAD4": {
      "gene": "SMAD4",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A tumour suppressor in TGF-beta signalling, lost rather than switched on, with no agent here aimed at it.",
      "uniprot": {
        "gene": "SMAD4",
        "accession": "Q13485",
        "entry_name": "SMAD4_HUMAN",
        "protein": "SMAD family member 4",
        "length": 552,
        "domains": [
          {
            "kind": "Region",
            "name": "Mediates interaction with ZBTB7A",
            "start": 1,
            "end": 322
          },
          {
            "kind": "Domain",
            "name": "MH1",
            "start": 18,
            "end": 142
          },
          {
            "kind": "Region",
            "name": "Required for interaction with TSC22D1",
            "start": 44,
            "end": 69
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 168,
            "end": 194
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 236,
            "end": 256
          },
          {
            "kind": "Region",
            "name": "SAD",
            "start": 275,
            "end": 320
          },
          {
            "kind": "Domain",
            "name": "MH2",
            "start": 323,
            "end": 552
          }
        ],
        "pdb_count": 12,
        "pdb_ids": [
          "1DD1",
          "1G88",
          "1MR1",
          "1U7F",
          "1U7V",
          "1YGS",
          "5C4V",
          "5MEY",
          "5MEZ",
          "5MF0",
          "5UWU",
          "6YIC"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q13485",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q13485"
      },
      "structure": {
        "pdb": "1DD1",
        "title": "CRYSTAL STRUCTURE ANALYSIS OF THE SMAD4 ACTIVE FRAGMENT",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.62,
        "ligands": [],
        "deposited": "1999-11-27",
        "url": "https://www.rcsb.org/structure/1DD1",
        "image": "img/1dd1.jpg",
        "image_bytes": 71224
      },
      "hotspots": [
        {
          "change": "R361H",
          "pos": 361,
          "type": "Missense_Mutation",
          "n": 20,
          "of": 1099,
          "pct": 1.8
        },
        {
          "change": "R361C",
          "pos": 361,
          "type": "Missense_Mutation",
          "n": 13,
          "of": 1099,
          "pct": 1.2
        },
        {
          "change": "D537G",
          "pos": 537,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 1099,
          "pct": 0.6
        },
        {
          "change": "E520*",
          "pos": 520,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S32*",
          "pos": 30,
          "type": "Frame_Shift_Del",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "A118V",
          "pos": 118,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "P356L",
          "pos": 356,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "G419W",
          "pos": 419,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "E330K",
          "pos": 330,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "A406V",
          "pos": 406,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G419V",
          "pos": 419,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G419R",
          "pos": 419,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R496H",
          "pos": 496,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "C499R",
          "pos": 499,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W524C",
          "pos": 524,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q534*",
          "pos": 534,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "D537Y",
          "pos": 537,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E538*",
          "pos": 538,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 166,
      "n_distinct_changes": 113,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 15,
              "of": 50,
              "pct": 30.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "any_loss": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "fusion": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 4,
              "of": 26,
              "pct": 15.4
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 7,
              "of": 31,
              "pct": 22.6
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 75,
              "of": 438,
              "pct": 17.1
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 24,
              "of": 438,
              "pct": 5.5
            },
            "any_loss": {
              "n": 24,
              "of": 438,
              "pct": 5.5
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 51,
              "of": 450,
              "pct": 11.3
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 14,
              "of": 450,
              "pct": 3.1
            },
            "any_loss": {
              "n": 14,
              "of": 450,
              "pct": 3.1
            },
            "fusion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            }
          }
        },
        "max_pct": 30.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 5,
        "n_accepted": 2,
        "best_level": "B",
        "levels": {
          "B": 5
        },
        "evidence_types": {
          "PREDICTIVE": 4,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Lysine",
          "Fluorouracil",
          "Cetuximab",
          "Panitumumab",
          "Regorafenib"
        ]
      },
      "selected_on": null
    },
    "PIK3CA": {
      "gene": "PIK3CA",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Activating mutations, as in breast cancer, with no agent here aimed at them in colorectal cancer.",
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
          "change": "E545K",
          "pos": 545,
          "type": "Missense_Mutation",
          "n": 55,
          "of": 1099,
          "pct": 5.0
        },
        {
          "change": "E542K",
          "pos": 542,
          "type": "Missense_Mutation",
          "n": 36,
          "of": 1099,
          "pct": 3.3
        },
        {
          "change": "H1047R",
          "pos": 1047,
          "type": "Missense_Mutation",
          "n": 33,
          "of": 1099,
          "pct": 3.0
        },
        {
          "change": "Q546K",
          "pos": 546,
          "type": "Missense_Mutation",
          "n": 10,
          "of": 1099,
          "pct": 0.9
        },
        {
          "change": "R108H",
          "pos": 108,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "N345K",
          "pos": 345,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "C420R",
          "pos": 420,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "Q546R",
          "pos": 546,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R88Q",
          "pos": 88,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "V344G",
          "pos": 344,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "E545G",
          "pos": 545,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "H1047L",
          "pos": 1047,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "R38C",
          "pos": 38,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R38H",
          "pos": 38,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "M1043I",
          "pos": 1043,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "G1049R",
          "pos": 1049,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R93Q",
          "pos": 93,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G106_R108del",
          "pos": 106,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E110del",
          "pos": 109,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K111N",
          "pos": 111,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G118D",
          "pos": 118,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E365K",
          "pos": 365,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q546P",
          "pos": 546,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E726K",
          "pos": 726,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Y1021C",
          "pos": 1021,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 223,
      "n_distinct_changes": 75,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 12,
              "of": 50,
              "pct": 24.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 2,
              "of": 26,
              "pct": 7.7
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 4,
              "of": 31,
              "pct": 12.9
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 107,
              "of": 438,
              "pct": 24.4
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 48,
              "of": 450,
              "pct": 10.7
            },
            "amplification": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 24.4,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 61,
        "n_accepted": 48,
        "best_level": "B",
        "levels": {
          "B": 33,
          "C": 23,
          "D": 5
        },
        "evidence_types": {
          "PREDICTIVE": 54,
          "PROGNOSTIC": 7
        },
        "top_therapies": [
          "Cetuximab",
          "Aspirin",
          "Panitumumab",
          "Irinotecan",
          "Chemotherapy",
          "Oxaliplatin"
        ]
      },
      "selected_on": null
    },
    "FBXW7": {
      "gene": "FBXW7",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A tumour suppressor that marks growth proteins for destruction; no agent here is aimed at it.",
      "uniprot": {
        "gene": "FBXW7",
        "accession": "Q969H0",
        "entry_name": "FBXW7_HUMAN",
        "protein": "F-box/WD repeat-containing protein 7",
        "length": 707,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 151
          },
          {
            "kind": "Domain",
            "name": "F-box",
            "start": 278,
            "end": 324
          },
          {
            "kind": "Repeat",
            "name": "WD 1",
            "start": 378,
            "end": 418
          },
          {
            "kind": "Repeat",
            "name": "WD 2",
            "start": 420,
            "end": 456
          },
          {
            "kind": "Repeat",
            "name": "WD 3",
            "start": 459,
            "end": 498
          },
          {
            "kind": "Repeat",
            "name": "WD 4",
            "start": 500,
            "end": 536
          },
          {
            "kind": "Repeat",
            "name": "WD 5",
            "start": 539,
            "end": 578
          },
          {
            "kind": "Repeat",
            "name": "WD 6",
            "start": 580,
            "end": 618
          },
          {
            "kind": "Repeat",
            "name": "WD 7",
            "start": 622,
            "end": 659
          }
        ],
        "pdb_count": 7,
        "pdb_ids": [
          "2OVP",
          "2OVQ",
          "2OVR",
          "5IBK",
          "5V4B",
          "7T1Y",
          "7T1Z"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q969H0",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q969H0"
      },
      "structure": {
        "pdb": "2OVP",
        "title": "Structure of the Skp1-Fbw7 complex",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.9,
        "ligands": [],
        "deposited": "2007-04-24",
        "url": "https://www.rcsb.org/structure/2OVP",
        "image": "img/2ovp.jpg",
        "image_bytes": 63313
      },
      "hotspots": [
        {
          "change": "R505C",
          "pos": 505,
          "type": "Missense_Mutation",
          "n": 16,
          "of": 1099,
          "pct": 1.5
        },
        {
          "change": "R465C",
          "pos": 465,
          "type": "Missense_Mutation",
          "n": 14,
          "of": 1099,
          "pct": 1.3
        },
        {
          "change": "R465H",
          "pos": 465,
          "type": "Missense_Mutation",
          "n": 14,
          "of": 1099,
          "pct": 1.3
        },
        {
          "change": "R278*",
          "pos": 278,
          "type": "Nonsense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S582L",
          "pos": 582,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S668Vfs*39",
          "pos": 667,
          "type": "Frame_Shift_Del",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R479Q",
          "pos": 479,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "R658*",
          "pos": 658,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "S596F",
          "pos": 596,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R689W",
          "pos": 689,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R367*",
          "pos": 367,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X413_splice",
          "pos": 413,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G423V",
          "pos": 423,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "G437V",
          "pos": 437,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R479*",
          "pos": 479,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S582P",
          "pos": 582,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "N598H",
          "pos": 598,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 139,
      "n_distinct_changes": 83,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 3,
              "of": 50,
              "pct": 6.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "any_loss": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 2,
              "of": 31,
              "pct": 6.5
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 52,
              "of": 438,
              "pct": 11.9
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "any_loss": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 35,
              "of": 450,
              "pct": 7.8
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 11.9,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 7,
        "n_accepted": 1,
        "best_level": "B",
        "levels": {
          "B": 1,
          "D": 6
        },
        "evidence_types": {
          "PREDICTIVE": 7
        },
        "top_therapies": [
          "Regorafenib Anhydrous",
          "Cetuximab",
          "Panitumumab"
        ]
      },
      "selected_on": null
    },
    "CTNNB1": {
      "gene": "CTNNB1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Beta-catenin, which APC normally helps break down; no agent here is aimed at it.",
      "uniprot": {
        "gene": "CTNNB1",
        "accession": "P35222",
        "entry_name": "CTNB1_HUMAN",
        "protein": "Catenin beta-1",
        "length": 781,
        "domains": [
          {
            "kind": "Region",
            "name": "Interaction with VCL",
            "start": 2,
            "end": 23
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 34,
            "end": 57
          },
          {
            "kind": "Repeat",
            "name": "ARM 1",
            "start": 151,
            "end": 191
          },
          {
            "kind": "Region",
            "name": "Interaction with BCL9",
            "start": 156,
            "end": 178
          },
          {
            "kind": "Repeat",
            "name": "ARM 2",
            "start": 193,
            "end": 234
          },
          {
            "kind": "Repeat",
            "name": "ARM 3",
            "start": 235,
            "end": 276
          },
          {
            "kind": "Repeat",
            "name": "ARM 4",
            "start": 277,
            "end": 318
          },
          {
            "kind": "Repeat",
            "name": "ARM 5",
            "start": 319,
            "end": 360
          },
          {
            "kind": "Repeat",
            "name": "ARM 6",
            "start": 361,
            "end": 389
          },
          {
            "kind": "Repeat",
            "name": "ARM 7",
            "start": 400,
            "end": 441
          },
          {
            "kind": "Repeat",
            "name": "ARM 8",
            "start": 442,
            "end": 484
          },
          {
            "kind": "Repeat",
            "name": "ARM 9",
            "start": 489,
            "end": 530
          },
          {
            "kind": "Repeat",
            "name": "ARM 10",
            "start": 531,
            "end": 571
          },
          {
            "kind": "Repeat",
            "name": "ARM 11",
            "start": 594,
            "end": 636
          },
          {
            "kind": "Repeat",
            "name": "ARM 12",
            "start": 637,
            "end": 666
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 705,
            "end": 781
          },
          {
            "kind": "Region",
            "name": "Interaction with SCRIB",
            "start": 772,
            "end": 781
          }
        ],
        "pdb_count": 50,
        "pdb_ids": [
          "1G3J",
          "1JDH",
          "1JPW",
          "1LUJ",
          "1P22",
          "1QZ7",
          "1T08",
          "1TH1",
          "2G57",
          "2GL7",
          "2Z6H",
          "3DIW",
          "3FQN",
          "3FQR",
          "3SL9",
          "3SLA",
          "3TX7",
          "4DJS",
          "6M90",
          "6M91",
          "6M92",
          "6M93",
          "6M94",
          "6O9B",
          "6O9C",
          "6WLX",
          "6WNX",
          "7AFW",
          "7AR4",
          "7UWI",
          "7UWO",
          "7ZRB",
          "8EI9",
          "8EIA",
          "8EIB",
          "8EIC",
          "8RU3",
          "8RU4",
          "8VME",
          "8VMF"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P35222",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P35222"
      },
      "structure": {
        "pdb": "1JDH",
        "title": "CRYSTAL STRUCTURE OF BETA-CATENIN AND HTCF-4",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.9,
        "ligands": [],
        "deposited": "2001-12-05",
        "url": "https://www.rcsb.org/structure/1JDH",
        "image": "img/1jdh.jpg",
        "image_bytes": 38128
      },
      "hotspots": [
        {
          "change": "A5_D81del",
          "pos": 5,
          "type": "In_Frame_Del",
          "n": 9,
          "of": 1099,
          "pct": 0.8
        },
        {
          "change": "T41A",
          "pos": 41,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S45F",
          "pos": 45,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R582W",
          "pos": 582,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "E334K",
          "pos": 334,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "K335I",
          "pos": 335,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "A5_Q68del",
          "pos": 5,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "A5_Q72del",
          "pos": 5,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E9_D81del",
          "pos": 9,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R486C",
          "pos": 486,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R661Q",
          "pos": 661,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 81,
      "n_distinct_changes": 56,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 50,
              "pct": 2.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 26,
              "pct": 3.8
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 5,
              "of": 31,
              "pct": 16.1
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 31,
              "pct": 6.5
            },
            "any_loss": {
              "n": 2,
              "of": 31,
              "pct": 6.5
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 26,
              "of": 438,
              "pct": 5.9
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "any_loss": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            },
            "fusion": {
              "n": 2,
              "of": 438,
              "pct": 0.5
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 20,
              "of": 450,
              "pct": 4.4
            },
            "amplification": {
              "n": 2,
              "of": 450,
              "pct": 0.4
            },
            "deep_deletion": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            },
            "any_loss": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            },
            "fusion": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            }
          }
        },
        "max_pct": 16.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 0,
        "best_level": null,
        "best_level_submitted": "B",
        "levels": {
          "B": 1
        },
        "evidence_types": {
          "PROGNOSTIC": 1
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "SOX9": {
      "gene": "SOX9",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A transcription factor; no agent here is aimed at it.",
      "uniprot": {
        "gene": "SOX9",
        "accession": "P48436",
        "entry_name": "SOX9_HUMAN",
        "protein": "Transcription factor SOX-9",
        "length": 509,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 67
          },
          {
            "kind": "Region",
            "name": "Dimerization (DIM)",
            "start": 63,
            "end": 103
          },
          {
            "kind": "Region",
            "name": "PQA",
            "start": 63,
            "end": 103
          },
          {
            "kind": "DNA binding",
            "name": "HMG box",
            "start": 105,
            "end": 173
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 160,
            "end": 273
          },
          {
            "kind": "Region",
            "name": "Transactivation domain (TAM)",
            "start": 224,
            "end": 307
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 330,
            "end": 415
          },
          {
            "kind": "Region",
            "name": "Transactivation domain (TAC)",
            "start": 394,
            "end": 509
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 479,
            "end": 509
          }
        ],
        "pdb_count": 1,
        "pdb_ids": [
          "4EUW"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P48436",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P48436"
      },
      "structure": {
        "pdb": "4EUW",
        "title": "Crystal structure of a HMG domain of transcription factor SOX-9 bound to DNA (SOX-9/DNA) from Homo sapiens at 2.77 A resolution",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.77,
        "ligands": [],
        "deposited": "2012-06-13",
        "url": "https://www.rcsb.org/structure/4EUW",
        "image": "img/4euw.jpg",
        "image_bytes": 48817
      },
      "hotspots": [
        {
          "change": "G263Afs*16",
          "pos": 261,
          "type": "Frame_Shift_Del",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "S23Afs*38",
          "pos": 21,
          "type": "Frame_Shift_Del",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "W143*",
          "pos": 143,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S215Pfs*4",
          "pos": 215,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "S228*",
          "pos": 228,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X229_splice",
          "pos": 229,
          "type": "Splice_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "V306Cfs*77",
          "pos": 304,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W335*",
          "pos": 335,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "P374Rfs*9",
          "pos": 373,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "Q412*",
          "pos": 412,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 105,
      "n_distinct_changes": 103,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 3,
              "of": 50,
              "pct": 6.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 3,
              "of": 31,
              "pct": 9.7
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "any_loss": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 47,
              "of": 438,
              "pct": 10.7
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 438,
              "pct": 0.2
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 29,
              "of": 450,
              "pct": 6.4
            },
            "amplification": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "deep_deletion": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            },
            "any_loss": {
              "n": 3,
              "of": 450,
              "pct": 0.7
            },
            "fusion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            }
          }
        },
        "max_pct": 10.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "AMER1": {
      "gene": "AMER1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Binds APC in the complex that breaks beta-catenin down; no agent here is aimed at it.",
      "uniprot": {
        "gene": "AMER1",
        "accession": "Q5JTC6",
        "entry_name": "AMER1_HUMAN",
        "protein": "APC membrane recruitment protein 1",
        "length": 1135,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 115
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 156,
            "end": 308
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 339,
            "end": 405
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 447,
            "end": 484
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 736,
            "end": 764
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 921,
            "end": 948
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1007,
            "end": 1135
          }
        ],
        "pdb_count": 3,
        "pdb_ids": [
          "4YJE",
          "4YJL",
          "4YK6"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q5JTC6",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q5JTC6"
      },
      "structure": {
        "pdb": "4YJE",
        "title": "Crystal structure of APC-ARM in complexed with Amer1-A1",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.9,
        "ligands": [],
        "deposited": "2016-03-09",
        "url": "https://www.rcsb.org/structure/4YJE",
        "image": "img/4yje.jpg",
        "image_bytes": 44112
      },
      "hotspots": [
        {
          "change": "R353*",
          "pos": 353,
          "type": "Nonsense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "R358*",
          "pos": 358,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "R531*",
          "pos": 531,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "R631*",
          "pos": 631,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R601*",
          "pos": 601,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R626*",
          "pos": 626,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R641*",
          "pos": 641,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 65,
      "n_distinct_changes": 59,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 50,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 26,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 1,
              "of": 31,
              "pct": 3.2
            },
            "amplification": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 31,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 32,
              "of": 438,
              "pct": 7.3
            },
            "amplification": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 438,
              "pct": 0.0
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 9,
              "of": 450,
              "pct": 2.0
            },
            "amplification": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "any_loss": {
              "n": 1,
              "of": 450,
              "pct": 0.2
            },
            "fusion": {
              "n": 0,
              "of": 450,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.3,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "TCF7L2": {
      "gene": "TCF7L2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "TCF4, the transcription factor beta-catenin binds; no agent here is aimed at it.",
      "uniprot": {
        "gene": "TCF7L2",
        "accession": "Q9NQB0",
        "entry_name": "TF7L2_HUMAN",
        "protein": "Transcription factor 7-like 2",
        "length": 619,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 96
          },
          {
            "kind": "Region",
            "name": "CTNNB1-binding",
            "start": 1,
            "end": 53
          },
          {
            "kind": "Region",
            "name": "Mediates interaction with MAD2L2",
            "start": 201,
            "end": 395
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 318,
            "end": 350
          },
          {
            "kind": "DNA binding",
            "name": "HMG box",
            "start": 350,
            "end": 418
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 420,
            "end": 441
          },
          {
            "kind": "Region",
            "name": "Promoter-specific activation domain",
            "start": 459,
            "end": 505
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 496,
            "end": 547
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 574,
            "end": 619
          }
        ],
        "pdb_count": 3,
        "pdb_ids": [
          "1JDH",
          "1JPW",
          "2GL7"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q9NQB0",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q9NQB0"
      },
      "structure": {
        "pdb": "1JDH",
        "title": "CRYSTAL STRUCTURE OF BETA-CATENIN AND HTCF-4",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.9,
        "ligands": [],
        "deposited": "2001-12-05",
        "url": "https://www.rcsb.org/structure/1JDH",
        "image": "img/1jdh.jpg",
        "image_bytes": 38128
      },
      "hotspots": [
        {
          "change": "K468Sfs*23",
          "pos": 465,
          "type": "Frame_Shift_Del",
          "n": 20,
          "of": 1099,
          "pct": 1.8
        },
        {
          "change": "R471C",
          "pos": 471,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "L200Sfs*25",
          "pos": 198,
          "type": "Frame_Shift_Del",
          "n": 5,
          "of": 1099,
          "pct": 0.5
        },
        {
          "change": "G452R",
          "pos": 452,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 1099,
          "pct": 0.4
        },
        {
          "change": "R407*",
          "pos": 407,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "R420W",
          "pos": 420,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "X424_splice",
          "pos": 424,
          "type": "Splice_Site",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "C469Vfs*8",
          "pos": 465,
          "type": "Frame_Shift_Ins",
          "n": 3,
          "of": 1099,
          "pct": 0.3
        },
        {
          "change": "M1?",
          "pos": 1,
          "type": "Translation_Start_Site",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "E51*",
          "pos": 51,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "X127_splice",
          "pos": 127,
          "type": "Splice_Region",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "W259*",
          "pos": 259,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K446T",
          "pos": 446,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R448Q",
          "pos": 448,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "R455*",
          "pos": 455,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "L458Yfs*33",
          "pos": 457,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        },
        {
          "change": "K468Vfs*8",
          "pos": 465,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 1099,
          "pct": 0.2
        }
      ],
      "n_mutated_samples": 122,
      "n_distinct_changes": 83,
      "sequenced_of": 1099,
      "frequency": {
        "by_node": {
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 40,
              "pct": 2.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 40,
              "pct": 0.0
            }
          },
          "drv-her2-amp": {
            "mutation": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 21,
              "pct": 0.0
            }
          },
          "drv-kras-g12c": {
            "mutation": {
              "n": 4,
              "of": 24,
              "pct": 16.7
            },
            "amplification": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 24,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 38,
              "of": 356,
              "pct": 10.7
            },
            "amplification": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 356,
              "pct": 0.0
            },
            "fusion": {
              "n": 2,
              "of": 356,
              "pct": 0.6
            }
          },
          "drv-wild-type": {
            "mutation": {
              "n": 41,
              "of": 363,
              "pct": 11.3
            },
            "amplification": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 363,
              "pct": 0.0
            }
          }
        },
        "max_pct": 16.7,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    }
  },
  "drugs": [
    {
      "id": "drug-0",
      "name": "Cetuximab + FOLFIRI (Erbitux)",
      "code": "IMC-C225",
      "target": "EGFR",
      "genes": [
        "EGFR"
      ],
      "modality": "antibody",
      "company": "Merck KGaA, Darmstadt, Germany",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CRYSTAL",
      "nct_id": "NCT00154102",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Cetuximab with FOLFIRI versus FOLFIRI, first line",
      "readout_date": "",
      "subtype_label": "RAS wild type",
      "nodes": [
        "drv-ras-wt"
      ],
      "receptor_context": "K-Ras wild-type, EGFR-expressing; with FOLFIRI",
      "source_url": "https://clinicaltrials.gov/study/NCT00154102",
      "registry": {
        "title": "Cetuximab Combined With Irinotecan in First-line Therapy for Metastatic Colorectal Cancer (CRYSTAL)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Merck KGaA, Darmstadt, Germany",
        "enrollment": 1221,
        "start_date": "2004-05",
        "primary_completion_date": "2006-12",
        "last_update_posted": "2017-01-30",
        "url": "https://clinicaltrials.gov/study/NCT00154102"
      },
      "label": {
        "matched_brand": "ERBITUX",
        "matched_generic": "CETUXIMAB",
        "manufacturer": "ImClone LLC",
        "effective_time": "20260416",
        "spl_id": "1cd448bd-5230-450c-ad4c-359e6d54cd2b",
        "boxed": {
          "headline": "WARNING: INFUSION REACTIONS and CARDIOPULMONARY ARREST Infusion Reactions: ERBITUX can cause serious and fatal",
          "text": "WARNING: INFUSION REACTIONS and CARDIOPULMONARY ARREST Infusion Reactions: ERBITUX can cause serious and fatal infusion reactions [see Warnings and Precautions ( 5.1 ), Adverse Reactions ( 6 )] . Immediately interrupt and permanently discontinue ERBITUX for serious infusion reactions [see Dosage and Administration ( 2.5 )] . Cardiopulmonary Arrest: Cardiopulmonary arrest or sudden death occurred in patients with squamous cell carcinoma of the head and neck receiving ERBITUX with radiation therapy or a cetuximab product with platinum-based therapy and fluorouracil. Monitor serum electrolytes, i…"
        },
        "warnings": [
          "Infusion Reactions",
          "Cardiopulmonary Arrest",
          "Pulmonary Toxicity",
          "Dermatologic Toxicity",
          "Accompanying Electrolyte Abnormalities",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "fatigue, nausea, diarrhea, dermatitis acneiform, abdominal pain, decreased appetite, arthralgia, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/8bc6397e-4bd8-4d37-a007-a327e4da34d9/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Erbitux\""
      }
    },
    {
      "id": "drug-1",
      "name": "Cetuximab (Erbitux)",
      "code": "IMC-C225",
      "target": "EGFR",
      "genes": [
        "EGFR"
      ],
      "modality": "antibody",
      "company": "NCIC Clinical Trials Group",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CA225-025 (CO.17)",
      "nct_id": "NCT00079066",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Cetuximab plus best supportive care versus best supportive care alone",
      "readout_date": "",
      "subtype_label": "RAS wild type",
      "nodes": [
        "drv-ras-wt"
      ],
      "receptor_context": "K-Ras wild-type, EGFR-expressing; previously treated",
      "source_url": "https://clinicaltrials.gov/study/NCT00079066",
      "registry": {
        "title": "Cetuximab + Best Supportive Care Compared With Best Supportive Care Alone in Metastatic Epidermal Growth Factor Receptor-Positive Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "NCIC Clinical Trials Group",
        "enrollment": 572,
        "start_date": "2003-12-30",
        "primary_completion_date": "2006-11-03",
        "last_update_posted": "2023-08-04",
        "url": "https://clinicaltrials.gov/study/NCT00079066"
      },
      "label": {
        "matched_brand": "ERBITUX",
        "matched_generic": "CETUXIMAB",
        "manufacturer": "ImClone LLC",
        "effective_time": "20260416",
        "spl_id": "1cd448bd-5230-450c-ad4c-359e6d54cd2b",
        "boxed": {
          "headline": "WARNING: INFUSION REACTIONS and CARDIOPULMONARY ARREST Infusion Reactions: ERBITUX can cause serious and fatal",
          "text": "WARNING: INFUSION REACTIONS and CARDIOPULMONARY ARREST Infusion Reactions: ERBITUX can cause serious and fatal infusion reactions [see Warnings and Precautions ( 5.1 ), Adverse Reactions ( 6 )] . Immediately interrupt and permanently discontinue ERBITUX for serious infusion reactions [see Dosage and Administration ( 2.5 )] . Cardiopulmonary Arrest: Cardiopulmonary arrest or sudden death occurred in patients with squamous cell carcinoma of the head and neck receiving ERBITUX with radiation therapy or a cetuximab product with platinum-based therapy and fluorouracil. Monitor serum electrolytes, i…"
        },
        "warnings": [
          "Infusion Reactions",
          "Cardiopulmonary Arrest",
          "Pulmonary Toxicity",
          "Dermatologic Toxicity",
          "Accompanying Electrolyte Abnormalities",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "fatigue, nausea, diarrhea, dermatitis acneiform, abdominal pain, decreased appetite, arthralgia, and rash",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/8bc6397e-4bd8-4d37-a007-a327e4da34d9/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Erbitux\""
      }
    },
    {
      "id": "drug-2",
      "name": "Panitumumab + FOLFOX (Vectibix)",
      "code": "ABX-EGF",
      "target": "EGFR",
      "genes": [
        "EGFR"
      ],
      "modality": "antibody",
      "company": "Amgen",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "PRIME",
      "nct_id": "NCT00364013",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Panitumumab with FOLFOX versus FOLFOX, first line",
      "readout_date": "",
      "subtype_label": "RAS wild type",
      "nodes": [
        "drv-ras-wt"
      ],
      "receptor_context": "wild-type in both KRAS and NRAS; with FOLFOX",
      "source_url": "https://clinicaltrials.gov/study/NCT00364013",
      "registry": {
        "title": "PRIME: Panitumumab Randomized Trial In Combination With Chemotherapy for Metastatic Colorectal Cancer to Determine Efficacy",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Amgen",
        "enrollment": 1183,
        "start_date": "2006-08-01",
        "primary_completion_date": "2009-08-01",
        "last_update_posted": "2022-11-07",
        "url": "https://clinicaltrials.gov/study/NCT00364013"
      },
      "label": {
        "matched_brand": "Vectibix",
        "matched_generic": "PANITUMUMAB",
        "manufacturer": "Amgen, Inc",
        "effective_time": "20260623",
        "spl_id": "a46c4cd4-282a-4920-9372-759f83c286fa",
        "boxed": {
          "headline": "WARNING: DERMATOLOGIC TOXICITY",
          "text": "WARNING: DERMATOLOGIC TOXICITY Dermatologic Toxicity: Dermatologic toxicities occurred in 90% of patients and were severe (NCI-CTC Grade 3 and higher) in 15% of patients receiving Vectibix monotherapy [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) and Adverse Reactions (6.1) ] . WARNING: DERMATOLOGIC TOXICITY See full prescribing information for complete boxed warning . Dermatologic toxicities were reported in 90% of patients and were severe in 15% of patients receiving monotherapy. ( 2.3 , 5.1 , 6.1 )"
        },
        "warnings": [
          "Dermatologic and Soft Tissue Toxicity",
          "Electrolyte Depletion/Monitoring",
          "Infusion Reactions",
          "Fibrosis/Interstitial Lung Disease (ILD)",
          "Ocular Toxicities",
          "Embryo-fetal Toxicity"
        ],
        "common": {
          "text": "skin rash with variable presentations, paronychia, fatigue, nausea, and diarrhea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/e0fa4bca-f245-4d92-ae29-b0c630a315c2/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Vectibix\""
      }
    },
    {
      "id": "drug-3",
      "name": "Panitumumab (Vectibix)",
      "code": "ABX-EGF",
      "target": "EGFR",
      "genes": [
        "EGFR"
      ],
      "modality": "antibody",
      "company": "Amgen",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "20020408",
      "nct_id": "NCT00113763",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Panitumumab plus best supportive care versus best supportive care",
      "readout_date": "",
      "subtype_label": "RAS wild type",
      "nodes": [
        "drv-ras-wt"
      ],
      "receptor_context": "wild-type in both KRAS and NRAS; previously treated",
      "source_url": "https://clinicaltrials.gov/study/NCT00113763",
      "registry": {
        "title": "Evaluating Panitumumab (ABX-EGF) Plus Best Supportive Care Versus Best Supportive Care in Patients With Metastatic Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Amgen",
        "enrollment": 463,
        "start_date": "2004-01-01",
        "primary_completion_date": "2008-10-01",
        "last_update_posted": "2022-11-07",
        "url": "https://clinicaltrials.gov/study/NCT00113763"
      },
      "label": {
        "matched_brand": "Vectibix",
        "matched_generic": "PANITUMUMAB",
        "manufacturer": "Amgen, Inc",
        "effective_time": "20260623",
        "spl_id": "a46c4cd4-282a-4920-9372-759f83c286fa",
        "boxed": {
          "headline": "WARNING: DERMATOLOGIC TOXICITY",
          "text": "WARNING: DERMATOLOGIC TOXICITY Dermatologic Toxicity: Dermatologic toxicities occurred in 90% of patients and were severe (NCI-CTC Grade 3 and higher) in 15% of patients receiving Vectibix monotherapy [see Dosage and Administration (2.3) , Warnings and Precautions (5.1) and Adverse Reactions (6.1) ] . WARNING: DERMATOLOGIC TOXICITY See full prescribing information for complete boxed warning . Dermatologic toxicities were reported in 90% of patients and were severe in 15% of patients receiving monotherapy. ( 2.3 , 5.1 , 6.1 )"
        },
        "warnings": [
          "Dermatologic and Soft Tissue Toxicity",
          "Electrolyte Depletion/Monitoring",
          "Infusion Reactions",
          "Fibrosis/Interstitial Lung Disease (ILD)",
          "Ocular Toxicities",
          "Embryo-fetal Toxicity"
        ],
        "common": {
          "text": "skin rash with variable presentations, paronychia, fatigue, nausea, and diarrhea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/e0fa4bca-f245-4d92-ae29-b0c630a315c2/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Vectibix\""
      }
    },
    {
      "id": "drug-4",
      "name": "Sotorasib + panitumumab (Lumakras + Vectibix)",
      "code": "AMG 510",
      "target": "KRAS G12C + EGFR",
      "genes": [
        "KRAS",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Amgen",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CodeBreaK 300",
      "nct_id": "NCT05198934",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Sotorasib and panitumumab versus investigator's choice",
      "readout_date": "",
      "subtype_label": "KRAS G12C",
      "nodes": [
        "drv-kras-g12c"
      ],
      "receptor_context": "after fluoropyrimidine, oxaliplatin and irinotecan",
      "source_url": "https://clinicaltrials.gov/study/NCT05198934",
      "registry": {
        "title": "Sotorasib and Panitumumab Versus Investigator's Choice for Participants With Kirsten Rat Sarcoma (KRAS) p.G12C Mutation",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Amgen",
        "enrollment": 160,
        "start_date": "2022-04-19",
        "primary_completion_date": "2025-07-16",
        "last_update_posted": "2026-07-22",
        "url": "https://clinicaltrials.gov/study/NCT05198934"
      },
      "label": {
        "matched_brand": "LUMAKRAS",
        "matched_generic": "SOTORASIB",
        "manufacturer": "Amgen Inc",
        "effective_time": "20250122",
        "spl_id": "8f611e67-8c58-4413-8b81-a200fa7f30e8",
        "boxed": null,
        "warnings": [
          "Hepatotoxicity",
          "Interstitial Lung Disease (ILD)/Pneumonitis"
        ],
        "common": {
          "text": "diarrhea, musculoskeletal pain, nausea, fatigue, hepatotoxicity, and cough",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/c80a362c-7ac3-4894-a076-0691e68ef8c1/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Sotorasib\""
      }
    },
    {
      "id": "drug-5",
      "name": "Adagrasib + cetuximab (Krazati + Erbitux)",
      "code": "MRTX849",
      "target": "KRAS G12C + EGFR",
      "genes": [
        "KRAS",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Mirati Therapeutics Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "KRYSTAL-1",
      "nct_id": "NCT03785249",
      "line": "after chemotherapy (accelerated)",
      "status": "approved",
      "readout": "Adagrasib alone and with cetuximab in KRAS G12C-mutated cancers",
      "readout_date": "",
      "subtype_label": "KRAS G12C",
      "nodes": [
        "drv-kras-g12c"
      ],
      "receptor_context": "locally advanced or metastatic; after fluoropyrimidine, oxaliplatin and irinotecan",
      "source_url": "https://clinicaltrials.gov/study/NCT03785249",
      "registry": {
        "title": "Phase 1/2 Study of MRTX849 in Patients With Cancer Having a KRAS G12C Mutation KRYSTAL-1",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 1/Phase 2",
        "sponsor": "Mirati Therapeutics Inc.",
        "enrollment": 731,
        "start_date": "2019-01-15",
        "primary_completion_date": "2026-06-23",
        "last_update_posted": "2026-07-29",
        "url": "https://clinicaltrials.gov/study/NCT03785249"
      },
      "label": {
        "matched_brand": "KRAZATI",
        "matched_generic": "ADAGRASIB",
        "manufacturer": "Mirati Therapeutics, Inc",
        "effective_time": "20260325",
        "spl_id": "65724d4c-78ab-4d85-83b5-73b9da5c2cc3",
        "boxed": null,
        "warnings": [
          "Gastrointestinal Adverse Reactions",
          "QTc Interval Prolongation",
          "Hepatotoxicity",
          "Interstitial Lung Disease (ILD) / Pneumonitis"
        ],
        "common": {
          "text": "nausea, diarrhea, vomiting, fatigue, musculoskeletal pain, hepatotoxicity, renal impairment, edema, dyspnea, and decreased appetite",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/0b8bf078-34c2-4f45-9012-38a8ac082b01/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Adagrasib\""
      }
    },
    {
      "id": "drug-6",
      "name": "Encorafenib + cetuximab + chemotherapy (Braftovi + Erbitux)",
      "code": "LGX818",
      "target": "BRAF + EGFR",
      "genes": [
        "BRAF",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "BREAKWATER",
      "nct_id": "NCT04607421",
      "line": "metastatic",
      "status": "approved",
      "readout": "Encorafenib and cetuximab with or without chemotherapy, previously untreated",
      "readout_date": "",
      "subtype_label": "BRAF V600E",
      "nodes": [
        "drv-braf-v600e"
      ],
      "receptor_context": "with fluorouracil-based chemotherapy",
      "source_url": "https://clinicaltrials.gov/study/NCT04607421",
      "registry": {
        "title": "A Study of Encorafenib Plus Cetuximab With or Without Chemotherapy in People With Previously Untreated Metastatic Colorectal Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 841,
        "start_date": "2020-12-21",
        "primary_completion_date": "2025-03-01",
        "last_update_posted": "2026-06-11",
        "url": "https://clinicaltrials.gov/study/NCT04607421"
      },
      "label": {
        "matched_brand": "BRAFTOVI",
        "matched_generic": "ENCORAFENIB",
        "manufacturer": "Array BioPharma Inc.",
        "effective_time": "20260226",
        "spl_id": "7dd6ed01-4c55-49ef-b55d-6d82c5dfc02e",
        "boxed": null,
        "warnings": [
          "Malignancies, cutaneous and noncutaneous",
          "Tumor Promotion in BRAF Wild-Type Tumors",
          "Cardiomyopathy",
          "Hepatotoxicity",
          "Hemorrhage",
          "Uveitis",
          "QT Prolongation",
          "Embryo-Fetal Toxicity",
          "Associated with BRAFTOVI as a Single Agent",
          "Risks Associated with Combination Treatment",
          "OVI in combination with cetuximab and mFOLFOX6"
        ],
        "common": {
          "text": "fatigue, nausea, vomiting, abdominal pain, and arthralgia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/235dfc38-0f0b-4037-b501-7a9f4294740c/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Encorafenib\""
      }
    },
    {
      "id": "drug-7",
      "name": "Encorafenib + cetuximab (Braftovi + Erbitux)",
      "code": "LGX818",
      "target": "BRAF + EGFR",
      "genes": [
        "BRAF",
        "EGFR"
      ],
      "modality": "small molecule",
      "company": "Pfizer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "BEACON CRC",
      "nct_id": "NCT02928224",
      "line": "after prior therapy",
      "status": "approved",
      "readout": "Encorafenib and cetuximab, with or without binimetinib, versus irinotecan or FOLFIRI with cetuximab",
      "readout_date": "",
      "subtype_label": "BRAF V600E",
      "nodes": [
        "drv-braf-v600e"
      ],
      "receptor_context": "after prior therapy",
      "source_url": "https://clinicaltrials.gov/study/NCT02928224",
      "registry": {
        "title": "Study of Encorafenib + Cetuximab Plus or Minus Binimetinib vs. Irinotecan/Cetuximab or Infusional 5-Fluorouracil (5-FU)/Folinic Acid (FA)/Irinotecan (FOLFIRI)/Cetuximab With a Safety Lead-in of Encorafenib + Binimetinib + Cetuximab in Patients With BRAF V600E-mutant Metastatic Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 702,
        "start_date": "2016-10-13",
        "primary_completion_date": "2019-02-11",
        "last_update_posted": "2023-12-21",
        "url": "https://clinicaltrials.gov/study/NCT02928224"
      },
      "label": {
        "matched_brand": "BRAFTOVI",
        "matched_generic": "ENCORAFENIB",
        "manufacturer": "Array BioPharma Inc.",
        "effective_time": "20260226",
        "spl_id": "7dd6ed01-4c55-49ef-b55d-6d82c5dfc02e",
        "boxed": null,
        "warnings": [
          "Malignancies, cutaneous and noncutaneous",
          "Tumor Promotion in BRAF Wild-Type Tumors",
          "Cardiomyopathy",
          "Hepatotoxicity",
          "Hemorrhage",
          "Uveitis",
          "QT Prolongation",
          "Embryo-Fetal Toxicity",
          "Associated with BRAFTOVI as a Single Agent",
          "Risks Associated with Combination Treatment",
          "OVI in combination with cetuximab and mFOLFOX6"
        ],
        "common": {
          "text": "fatigue, nausea, vomiting, abdominal pain, and arthralgia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/235dfc38-0f0b-4037-b501-7a9f4294740c/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Encorafenib\""
      }
    },
    {
      "id": "drug-8",
      "name": "Tucatinib + trastuzumab (Tukysa + Herceptin)",
      "code": "ONT-380",
      "target": "HER2 (TKI + antibody)",
      "genes": [
        "ERBB2"
      ],
      "modality": "small molecule",
      "company": "Seagen Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "MOUNTAINEER",
      "nct_id": "NCT03043313",
      "line": "after chemotherapy (accelerated)",
      "status": "approved",
      "readout": "Tucatinib plus trastuzumab in HER2-positive colorectal cancer",
      "readout_date": "",
      "subtype_label": "HER2-positive, RAS wild type",
      "nodes": [
        "drv-her2-amp"
      ],
      "receptor_context": "after fluoropyrimidine, oxaliplatin and irinotecan",
      "source_url": "https://clinicaltrials.gov/study/NCT03043313",
      "registry": {
        "title": "Tucatinib Plus Trastuzumab in Patients With HER2+ Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Seagen Inc.",
        "enrollment": 117,
        "start_date": "2017-06-23",
        "primary_completion_date": "2022-03-28",
        "last_update_posted": "2024-11-26",
        "url": "https://clinicaltrials.gov/study/NCT03043313"
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
      "id": "drug-9",
      "name": "Trastuzumab deruxtecan (Enhertu)",
      "code": "DS-8201a",
      "target": "HER2",
      "genes": [
        "ERBB2"
      ],
      "modality": "ADC",
      "company": "Daiichi Sankyo",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "DESTINY-CRC02",
      "nct_id": "NCT04744831",
      "line": "after prior therapy",
      "status": "approved",
      "readout": "Trastuzumab deruxtecan at two doses in HER2-overexpressing colorectal cancer",
      "readout_date": "",
      "subtype_label": "HER2-positive (IHC 3+), tissue-agnostic",
      "nodes": [
        "drv-her2-amp"
      ],
      "receptor_context": "HER2 IHC 3+; after prior systemic treatment",
      "source_url": "https://clinicaltrials.gov/study/NCT04744831",
      "registry": {
        "title": "Trastuzumab Deruxtecan in Participants With HER2-overexpressing Advanced or Metastatic Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Daiichi Sankyo",
        "enrollment": 122,
        "start_date": "2021-03-05",
        "primary_completion_date": "2022-11-01",
        "last_update_posted": "2026-01-14",
        "url": "https://clinicaltrials.gov/study/NCT04744831"
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
      "id": "drug-10",
      "name": "Bevacizumab (Avastin)",
      "code": "",
      "target": "VEGF-A",
      "genes": [
        "VEGFA"
      ],
      "modality": "antibody",
      "company": "Genentech, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "AVF2107g",
      "nct_id": "NCT00109070",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Bevacizumab with standard chemotherapy",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "with fluorouracil-based chemotherapy",
      "source_url": "https://clinicaltrials.gov/study/NCT00109070",
      "registry": {
        "title": "A Study to Evaluate Avastin in Combination With Standard Chemotherapy to Treat Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Genentech, Inc.",
        "enrollment": null,
        "start_date": "2000-09",
        "primary_completion_date": null,
        "last_update_posted": "2013-06-21",
        "url": "https://clinicaltrials.gov/study/NCT00109070"
      },
      "label": {
        "matched_brand": "Avastin",
        "matched_generic": "BEVACIZUMAB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20250106",
        "spl_id": "8debebf6-af94-4ba7-8d67-c801f4ea27eb",
        "boxed": null,
        "warnings": [
          "Gastrointestinal Perforations and Fistula",
          "Surgery and Wound Healing Complications",
          "Hemorrhage",
          "Arterial Thromboembolic Events (ATE)",
          "Venous Thromboembolic Events (VTE)",
          "Hypertension",
          "Reversible Encephalopathy Syndrome (PRES )",
          "Renal Injury and Proteinuria",
          "Infusion-Related Reactions",
          "Embryo-Fetal Toxicity",
          "Ovarian Failure",
          "Congestive Heart Failure (CHF)"
        ],
        "common": {
          "text": "epistaxis, headache, hypertension, rhinitis, proteinuria, taste alteration, dry skin, hemorrhage, lacrimation disorder, back pain and exfoliative dermatitis",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/939b5d1f-9fb2-4499-80ef-0607aa6b114e/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Avastin\""
      }
    },
    {
      "id": "drug-11",
      "name": "Bevacizumab + FOLFOX4 (Avastin)",
      "code": "",
      "target": "VEGF-A",
      "genes": [
        "VEGFA"
      ],
      "modality": "antibody",
      "company": "National Cancer Institute (NCI)",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "E3200",
      "nct_id": "NCT00025337",
      "line": "2L metastatic",
      "status": "approved",
      "readout": "Chemotherapy with or without bevacizumab after prior treatment",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "with FOLFOX4 after irinotecan and fluorouracil",
      "source_url": "https://clinicaltrials.gov/study/NCT00025337",
      "registry": {
        "title": "Combination Chemotherapy With or Without Bevacizumab Compared With Bevacizumab Alone in Treating Patients With Advanced or Metastatic Colorectal Cancer That Has Been Previously Treated",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "National Cancer Institute (NCI)",
        "enrollment": 880,
        "start_date": "2001-09",
        "primary_completion_date": "2007-04",
        "last_update_posted": "2013-01-24",
        "url": "https://clinicaltrials.gov/study/NCT00025337"
      },
      "label": {
        "matched_brand": "Avastin",
        "matched_generic": "BEVACIZUMAB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20250106",
        "spl_id": "8debebf6-af94-4ba7-8d67-c801f4ea27eb",
        "boxed": null,
        "warnings": [
          "Gastrointestinal Perforations and Fistula",
          "Surgery and Wound Healing Complications",
          "Hemorrhage",
          "Arterial Thromboembolic Events (ATE)",
          "Venous Thromboembolic Events (VTE)",
          "Hypertension",
          "Reversible Encephalopathy Syndrome (PRES )",
          "Renal Injury and Proteinuria",
          "Infusion-Related Reactions",
          "Embryo-Fetal Toxicity",
          "Ovarian Failure",
          "Congestive Heart Failure (CHF)"
        ],
        "common": {
          "text": "epistaxis, headache, hypertension, rhinitis, proteinuria, taste alteration, dry skin, hemorrhage, lacrimation disorder, back pain and exfoliative dermatitis",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/939b5d1f-9fb2-4499-80ef-0607aa6b114e/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Avastin\""
      }
    },
    {
      "id": "drug-12",
      "name": "Ramucirumab + FOLFIRI (Cyramza)",
      "code": "IMC-1121B",
      "target": "VEGFR2",
      "genes": [
        "KDR"
      ],
      "modality": "antibody",
      "company": "Eli Lilly and Company",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "RAISE",
      "nct_id": "NCT01183780",
      "line": "2L metastatic",
      "status": "approved",
      "readout": "Ramucirumab or placebo with FOLFIRI after first-line treatment",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "after bevacizumab, oxaliplatin and a fluoropyrimidine",
      "source_url": "https://clinicaltrials.gov/study/NCT01183780",
      "registry": {
        "title": "A Study in Second Line Metastatic Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Eli Lilly and Company",
        "enrollment": 1072,
        "start_date": "2010-12-02",
        "primary_completion_date": "2014-07-17",
        "last_update_posted": "2019-09-25",
        "url": "https://clinicaltrials.gov/study/NCT01183780"
      },
      "label": {
        "matched_brand": "CYRAMZA",
        "matched_generic": "RAMUCIRUMAB",
        "manufacturer": "Eli Lilly and Company",
        "effective_time": "20260609",
        "spl_id": "161cb5e7-7955-45e5-bdde-9be94fdbe76a",
        "boxed": null,
        "warnings": [
          "Hemorrhage",
          "Gastrointestinal Perforations",
          "Impaired Wound Healing",
          "Arterial Thromboembolic Events (ATEs)",
          "Hypertension",
          "Infusion-Related Reactions (IRR)",
          "Worsening of Pre-existing Hepatic Impairment",
          "Posterior Reversible Encephalopathy Syndrome",
          "Proteinuria Including Nephrotic Syndrome",
          "Thyroid Dysfunction",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "anemia (3.8%) and intestinal obstruction (2.1%)",
          "has_frequencies": true
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/c6080942-dee6-423e-b688-1272c2ae90d4/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Cyramza\""
      }
    },
    {
      "id": "drug-13",
      "name": "Ziv-aflibercept + FOLFIRI (Zaltrap)",
      "code": "AVE0005",
      "target": "VEGF-A, VEGF-B, PlGF",
      "genes": [
        "VEGFA",
        "VEGFB",
        "PGF"
      ],
      "modality": "fusion protein",
      "company": "Sanofi",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "VELOUR",
      "nct_id": "NCT00561470",
      "line": "2L metastatic",
      "status": "approved",
      "readout": "Aflibercept or placebo with FOLFIRI after an oxaliplatin-based regimen",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "after an oxaliplatin-containing regimen",
      "source_url": "https://clinicaltrials.gov/study/NCT00561470",
      "registry": {
        "title": "Aflibercept Versus Placebo in Combination With Irinotecan and 5-FU in the Treatment of Patients With Metastatic Colorectal Cancer After Failure of an Oxaliplatin Based Regimen",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Sanofi",
        "enrollment": 1226,
        "start_date": "2007-11",
        "primary_completion_date": "2011-02",
        "last_update_posted": "2012-09-28",
        "url": "https://clinicaltrials.gov/study/NCT00561470"
      },
      "label": {
        "matched_brand": "ZALTRAP",
        "matched_generic": "ZIV-AFLIBERCEPT",
        "manufacturer": "sanofi-aventis U.S. LLC",
        "effective_time": "20251006",
        "spl_id": "14431dcb-cda7-4ae4-aa2b-6480d6ac459f",
        "boxed": null,
        "warnings": [
          "Hemorrhage",
          "Gastrointestinal Perforation",
          "Impaired Wound Healing",
          "Fistula Formation",
          "Hypertension",
          "Arterial Thromboembolic Events (ATE)",
          "Proteinuria",
          "Neutropenia and Neutropenic Complications",
          "Diarrhea and Dehydration",
          "Posterior Leukoencephalopathy Syndrome",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "leukopenia, diarrhea, neutropenia, proteinuria, AST increased, stomatitis, fatigue, thrombocytopenia, ALT increased, hypertension, weight decreased, decreased appetite, epistaxis, abdominal pain, dysphonia, serum creatinine increased, and headache",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f6725df6-50ee-4b0a-b900-d02ba634395d/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Zaltrap\""
      }
    },
    {
      "id": "drug-14",
      "name": "Regorafenib (Stivarga)",
      "code": "BAY73-4506",
      "target": "multikinase (VEGFR1-3 and others)",
      "genes": [
        "FLT1",
        "KDR",
        "FLT4"
      ],
      "modality": "small molecule",
      "company": "Bayer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CORRECT",
      "nct_id": "NCT01103323",
      "line": "after standard therapy",
      "status": "approved",
      "readout": "Regorafenib or placebo after standard therapy",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "after chemotherapy, anti-VEGF therapy and, if RAS wild type, anti-EGFR therapy",
      "source_url": "https://clinicaltrials.gov/study/NCT01103323",
      "registry": {
        "title": "Patients With Metastatic Colorectal Cancer Treated With Regorafenib or Placebo After Failure of Standard Therapy",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Bayer",
        "enrollment": 760,
        "start_date": "2010-04",
        "primary_completion_date": "2011-07",
        "last_update_posted": "2015-06-24",
        "url": "https://clinicaltrials.gov/study/NCT01103323"
      },
      "label": {
        "matched_brand": "Stivarga",
        "matched_generic": "REGORAFENIB",
        "manufacturer": "Bayer HealthCare Pharmaceuticals Inc.",
        "effective_time": "20260209",
        "spl_id": "8f47fb28-9855-4482-b807-e98c425c2a4e",
        "boxed": {
          "headline": "WARNING: HEPATOTOXICITY • Severe and sometimes fatal hepatotoxicity has occurred in clinical trials [see Warni",
          "text": "WARNING: HEPATOTOXICITY • Severe and sometimes fatal hepatotoxicity has occurred in clinical trials [see Warnings and Precautions ( 5.1 )] . • Monitor hepatic function prior to and during treatment [see Warnings and Precautions ( 5.1 )]. • Interrupt and then reduce or discontinue STIVARGA for hepatotoxicity as manifested by elevated liver function tests or hepatocellular necrosis, depending upon severity and persistence [see Dosage and Administration ( 2.2 )] . WARNING: HEPATOTOXICITY See full prescribing information for complete boxed warning. • Severe and sometimes fatal hepatotoxicity has o…"
        },
        "warnings": [
          "Hepatotoxicity",
          "Infections",
          "Hemorrhage",
          "Gastrointestinal perforation or fistula",
          "Dermatologic toxicity",
          "Hypertension",
          "Cardiac ischemia and infarction",
          "Risk of impaired wound healing",
          "Embryo-fetal toxicity",
          "Grade 3"
        ],
        "common": {
          "text": "pain (including gastrointestinal and abdominal pain), HFSR, asthenia/fatigue, diarrhea, decreased appetite/food intake, hypertension, infection, dysphonia, hyperbilirubinemia, fever, mucositis, weight loss, rash, and nausea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/824f19c9-0546-4a8a-8d8f-c4055c04f7c7/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Stivarga\""
      }
    },
    {
      "id": "drug-15",
      "name": "Fruquintinib (Fruzaqla)",
      "code": "HMPL-013",
      "target": "VEGFR1-3",
      "genes": [
        "FLT1",
        "KDR",
        "FLT4"
      ],
      "modality": "small molecule",
      "company": "Hutchison Medipharma Limited",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "FRESCO-2",
      "nct_id": "NCT04322539",
      "line": "after standard therapy",
      "status": "approved",
      "readout": "Fruquintinib or placebo after standard therapy",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "after chemotherapy, anti-VEGF therapy and, if RAS wild type, anti-EGFR therapy",
      "source_url": "https://clinicaltrials.gov/study/NCT04322539",
      "registry": {
        "title": "A Study of Efficacy and Safety of Fruquintinib (HMPL-013) in Participants With Metastatic Colorectal Cancer",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hutchison Medipharma Limited",
        "enrollment": 691,
        "start_date": "2020-08-12",
        "primary_completion_date": "2022-07-29",
        "last_update_posted": "2025-04-04",
        "url": "https://clinicaltrials.gov/study/NCT04322539"
      },
      "label": {
        "matched_brand": "Fruzaqla",
        "matched_generic": "FRUQUINTINIB",
        "manufacturer": "Takeda Pharmaceuticals America, Inc.",
        "effective_time": "20260731",
        "spl_id": "8e86a087-ef8d-424c-8cfe-208bf8d4e122",
        "boxed": null,
        "warnings": [
          "WARNINGS AND PRECAUTIONS Hypertension",
          "Hemorrhagic Events",
          "Infections",
          "Gastrointestinal (GI) Perforation",
          "Hepatotoxicity",
          "Proteinuria",
          "Palmar-Plantar Erythrodysesthesia",
          "Reversible Encephalopathy Syndrome (PRES)",
          "Impaired Wound Healing",
          "Arterial Thromboembolic Events",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "hypertension, palmar-plantar erythrodysesthesia, proteinuria, dysphonia, abdominal pain, diarrhea, and asthenia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/186d786e-dc8a-45f2-b5e1-01ac0201879f/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Fruzaqla\""
      }
    },
    {
      "id": "drug-16",
      "name": "Trifluridine and tipiracil (Lonsurf)",
      "code": "TAS-102",
      "target": "DNA synthesis (nucleoside analogue)",
      "genes": [],
      "modality": "chemotherapy",
      "company": "Taiho Oncology, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "RECOURSE",
      "nct_id": "NCT01607957",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Trifluridine/tipiracil or placebo in refractory disease",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "after fluoropyrimidine, oxaliplatin and irinotecan",
      "source_url": "https://clinicaltrials.gov/study/NCT01607957",
      "registry": {
        "title": "Study of TAS-102 in Patients With Metastatic Colorectal Cancer Refractory to Standard Chemotherapies",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Taiho Oncology, Inc.",
        "enrollment": 800,
        "start_date": "2012-06-17",
        "primary_completion_date": "2014-01-31",
        "last_update_posted": "2024-09-19",
        "url": "https://clinicaltrials.gov/study/NCT01607957"
      },
      "label": {
        "matched_brand": "LONSURF",
        "matched_generic": "TRIFLURIDINE AND TIPIRACIL",
        "manufacturer": "Taiho Pharmaceutical Co., Ltd.",
        "effective_time": "20251105",
        "spl_id": "15b86e86-8940-44e3-921c-2e0b97180ea1",
        "boxed": null,
        "warnings": [
          "Severe Myelosuppression",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "neutropenia, anemia, thrombocytopenia, fatigue, nausea, decreased appetite, diarrhea, vomiting, abdominal pain, and pyrexia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f5beed22-d71d-4c0d-8dca-2c7317d65d85/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Lonsurf\""
      }
    },
    {
      "id": "drug-17",
      "name": "Trifluridine and tipiracil + bevacizumab (Lonsurf + Avastin)",
      "code": "TAS-102",
      "target": "DNA synthesis + VEGF-A",
      "genes": [
        "VEGFA"
      ],
      "modality": "chemotherapy",
      "company": "Taiho Oncology, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "SUNLIGHT",
      "nct_id": "NCT04737187",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Trifluridine/tipiracil with and without bevacizumab in refractory disease",
      "readout_date": "",
      "subtype_label": "Metastatic, any molecular class",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "with bevacizumab",
      "source_url": "https://clinicaltrials.gov/study/NCT04737187",
      "registry": {
        "title": "Phase III Study of Trifluridine/Tipiracil With and Without Bevacizumab in Refractory Metastatic Colorectal Cancer Patients",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Taiho Oncology, Inc.",
        "enrollment": 492,
        "start_date": "2020-11-25",
        "primary_completion_date": "2022-07-19",
        "last_update_posted": "2024-09-24",
        "url": "https://clinicaltrials.gov/study/NCT04737187"
      },
      "label": {
        "matched_brand": "LONSURF",
        "matched_generic": "TRIFLURIDINE AND TIPIRACIL",
        "manufacturer": "Taiho Pharmaceutical Co., Ltd.",
        "effective_time": "20251105",
        "spl_id": "15b86e86-8940-44e3-921c-2e0b97180ea1",
        "boxed": null,
        "warnings": [
          "Severe Myelosuppression",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "neutropenia, anemia, thrombocytopenia, fatigue, nausea, decreased appetite, diarrhea, vomiting, abdominal pain, and pyrexia",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f5beed22-d71d-4c0d-8dca-2c7317d65d85/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Trifluridine and tipiracil\""
      }
    },
    {
      "id": "drug-18",
      "name": "Pembrolizumab (Keytruda)",
      "code": "MK-3475",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "Merck Sharp & Dohme LLC",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "KEYNOTE-177",
      "nct_id": "NCT02563002",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Pembrolizumab versus standard chemotherapy",
      "readout_date": "",
      "subtype_label": "MSI-H or dMMR",
      "nodes": [
        "rep-dmmr"
      ],
      "receptor_context": "unresectable or metastatic",
      "source_url": "https://clinicaltrials.gov/study/NCT02563002",
      "registry": {
        "title": "Study of Pembrolizumab (MK-3475) vs Standard Therapy in Participants With Microsatellite Instability-High (MSI-H) or Mismatch Repair Deficient (dMMR) Stage IV Colorectal Carcinoma (MK-3475-177/KEYNOTE-177)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 307,
        "start_date": "2015-11-30",
        "primary_completion_date": "2021-02-19",
        "last_update_posted": "2024-10-03",
        "url": "https://clinicaltrials.gov/study/NCT02563002"
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
      "id": "drug-19",
      "name": "Nivolumab + ipilimumab (Opdivo + Yervoy)",
      "code": "BMS-936558",
      "target": "PD-1 + CTLA-4",
      "genes": [
        "PDCD1",
        "CTLA4"
      ],
      "modality": "antibody",
      "company": "Bristol-Myers Squibb",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 8HW",
      "nct_id": "NCT04008030",
      "line": "unresectable or metastatic",
      "status": "approved",
      "readout": "Nivolumab, nivolumab plus ipilimumab, or chemotherapy",
      "readout_date": "",
      "subtype_label": "MSI-H or dMMR",
      "nodes": [
        "rep-dmmr"
      ],
      "receptor_context": "unresectable or metastatic",
      "source_url": "https://clinicaltrials.gov/study/NCT04008030",
      "registry": {
        "title": "A Study of Nivolumab, Nivolumab Plus Ipilimumab, or Investigator's Choice Chemotherapy for the Treatment of Participants With Deficient Mismatch Repair (dMMR)/Microsatellite Instability High (MSI-H) Metastatic Colorectal Cancer (mCRC)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 839,
        "start_date": "2019-08-05",
        "primary_completion_date": "2024-08-28",
        "last_update_posted": "2026-08-20",
        "url": "https://clinicaltrials.gov/study/NCT04008030"
      },
      "label": {
        "matched_brand": "OPDIVO",
        "matched_generic": "NIVOLUMAB",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20260812",
        "spl_id": "1fce9e6a-6a7c-4fc0-a3a4-a0099f7bd2ce",
        "boxed": null,
        "warnings": [
          "Immune-Mediated Adverse Reactions",
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal toxicity",
          "OPDIVO 3 mg/kg with Ipilimumab 1 mg/kg",
          "OPDIVO 1 mg/kg with Ipilimumab 3 mg/kg",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine"
        ],
        "common": {
          "text": "• As a single agent: fatigue, rash, musculoskeletal pain, pruritus, diarrhea, nausea, asthenia, cough, dyspnea, constipation, decreased appetite, back pain, arthralgia, upper respiratory tract infection, pyrexia, headache, abdominal pain, vomiting, and urinary tract infection",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f570b9c4-6846-4de2-abfa-4d0a4ae4e394/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Nivolumab\""
      }
    },
    {
      "id": "drug-20",
      "name": "Nivolumab (Opdivo)",
      "code": "BMS-936558",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "Bristol-Myers Squibb",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 142",
      "nct_id": "NCT02060188",
      "line": "after chemotherapy",
      "status": "approved",
      "readout": "Nivolumab alone or in combination in recurrent or metastatic disease",
      "readout_date": "",
      "subtype_label": "MSI-H or dMMR",
      "nodes": [
        "rep-dmmr"
      ],
      "receptor_context": "after fluoropyrimidine, oxaliplatin and irinotecan",
      "source_url": "https://clinicaltrials.gov/study/NCT02060188",
      "registry": {
        "title": "A Study of Nivolumab Alone or Nivolumab Combination Therapy in Colon Cancer That Has Come Back or Has Spread",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 385,
        "start_date": "2014-03-12",
        "primary_completion_date": "2024-10-22",
        "last_update_posted": "2025-11-06",
        "url": "https://clinicaltrials.gov/study/NCT02060188"
      },
      "label": {
        "matched_brand": "OPDIVO",
        "matched_generic": "NIVOLUMAB",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20260812",
        "spl_id": "1fce9e6a-6a7c-4fc0-a3a4-a0099f7bd2ce",
        "boxed": null,
        "warnings": [
          "Immune-Mediated Adverse Reactions",
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal toxicity",
          "OPDIVO 3 mg/kg with Ipilimumab 1 mg/kg",
          "OPDIVO 1 mg/kg with Ipilimumab 3 mg/kg",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine"
        ],
        "common": {
          "text": "• As a single agent: fatigue, rash, musculoskeletal pain, pruritus, diarrhea, nausea, asthenia, cough, dyspnea, constipation, decreased appetite, back pain, arthralgia, upper respiratory tract infection, pyrexia, headache, abdominal pain, vomiting, and urinary tract infection",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/f570b9c4-6846-4de2-abfa-4d0a4ae4e394/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Opdivo\""
      }
    },
    {
      "id": "drug-21",
      "name": "Dostarlimab (Jemperli)",
      "code": "TSR-042",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "Tesaro, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "GARNET",
      "nct_id": "NCT02715284",
      "line": "tissue-agnostic (accelerated)",
      "status": "approved",
      "readout": "Dostarlimab in advanced solid tumours",
      "readout_date": "",
      "subtype_label": "dMMR, tissue-agnostic",
      "nodes": [
        "rep-dmmr"
      ],
      "receptor_context": "recurrent or advanced; after prior treatment",
      "source_url": "https://clinicaltrials.gov/study/NCT02715284",
      "registry": {
        "title": "Study of TSR-042, an Anti-programmed Cell Death-1 Receptor (PD-1) Monoclonal Antibody, in Participants With Advanced Solid Tumors",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 1",
        "sponsor": "Tesaro, Inc.",
        "enrollment": 729,
        "start_date": "2016-03-07",
        "primary_completion_date": "2026-05-18",
        "last_update_posted": "2026-08-25",
        "url": "https://clinicaltrials.gov/study/NCT02715284"
      },
      "label": {
        "matched_brand": "Jemperli",
        "matched_generic": "DOSTARLIMAB",
        "manufacturer": "GlaxoSmithKline LLC",
        "effective_time": "20250902",
        "spl_id": "da2ad681-d178-42c9-aa55-47c619cc7cb1",
        "boxed": null,
        "warnings": [
          "Infusion-related reactions",
          "Embryo-fetal toxicity",
          "Endocrinopathies Adrenal Insufficiency",
          "Hypophysitis",
          "Combination with Carboplatin and Paclitaxel",
          "JEMPERLI as a Single Agent",
          "Thyroid Disorders",
          "Thyroiditis",
          "Hypothyroidism",
          "Hyperthyroidism",
          "Which Can Present with Diabetic Ketoacidosis",
          "Nervous System"
        ],
        "common": {
          "text": "fatigue/asthenia, anemia, diarrhea, and nausea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/095eab9f-545a-4f12-bfb7-19477fb901a5/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Jemperli\""
      }
    },
    {
      "id": "drug-22",
      "name": "Larotrectinib (Vitrakvi)",
      "code": "LOXO-101",
      "target": "TRK",
      "genes": [
        "NTRK1"
      ],
      "modality": "small molecule",
      "company": "Bayer",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "NAVIGATE",
      "nct_id": "NCT02576431",
      "line": "tissue-agnostic",
      "status": "approved",
      "readout": "Larotrectinib in NTRK fusion-positive solid tumours",
      "readout_date": "",
      "subtype_label": "NTRK fusion, tissue-agnostic",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "NTRK gene fusion",
      "source_url": "https://clinicaltrials.gov/study/NCT02576431",
      "registry": {
        "title": "A Study to Test the Effect of the Drug Larotrectinib in Adults and Children With NTRK-fusion Positive Solid Tumors",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Bayer",
        "enrollment": 215,
        "start_date": "2015-09-30",
        "primary_completion_date": "2025-09-29",
        "last_update_posted": "2026-07-01",
        "url": "https://clinicaltrials.gov/study/NCT02576431"
      },
      "label": {
        "matched_brand": "VITRAKVI",
        "matched_generic": "LAROTRECTINIB",
        "manufacturer": "Bayer HealthCare Pharmaceuticals Inc.",
        "effective_time": "20260522",
        "spl_id": "0e3ba6e7-af8d-4840-9409-a537a09e1263",
        "boxed": null,
        "warnings": [
          "Central Nervous System (CNS) Effects",
          "Skeletal Fractures",
          "Hepatotoxicity",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "increased AST, increased ALT, anemia, hypoalbuminemia, musculoskeletal pain, increased alkaline phosphatase, leukopenia, lymphopenia, neutropenia, hypocalcemia, fatigue, vomiting, cough, constipation, pyrexia, diarrhea, nausea, abdominal pain, dizziness, and rash ( 6 )",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/0c8ca614-58b2-4aa4-83d3-0387a8f782fd/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Vitrakvi\""
      }
    },
    {
      "id": "drug-23",
      "name": "Entrectinib (Rozlytrek)",
      "code": "RXDX-101",
      "target": "TRK",
      "genes": [
        "NTRK1"
      ],
      "modality": "small molecule",
      "company": "Hoffmann-La Roche",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "STARTRK-2",
      "nct_id": "NCT02568267",
      "line": "tissue-agnostic",
      "status": "approved",
      "readout": "Basket study in tumours with NTRK1/2/3, ROS1 or ALK rearrangements",
      "readout_date": "",
      "subtype_label": "NTRK fusion, tissue-agnostic",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "NTRK gene fusion",
      "source_url": "https://clinicaltrials.gov/study/NCT02568267",
      "registry": {
        "title": "Basket Study of Entrectinib (RXDX-101) for the Treatment of Patients With Solid Tumors Harboring NTRK 1/2/3 (Trk A/B/C), ROS1, or ALK Gene Rearrangements (Fusions)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 2",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 534,
        "start_date": "2015-11-19",
        "primary_completion_date": "2027-06-30",
        "last_update_posted": "2026-08-25",
        "url": "https://clinicaltrials.gov/study/NCT02568267"
      },
      "label": {
        "matched_brand": "Rozlytrek",
        "matched_generic": "ENTRECTINIB",
        "manufacturer": null,
        "effective_time": "20251204",
        "spl_id": "b93e1fc0-614a-4e49-a91d-a409fb2db9f0",
        "boxed": null,
        "warnings": [
          "Congestive Heart Failure (CHF)",
          "Central Nervous System (CNS) Effects",
          "Skeletal Fractures",
          "Hepatotoxicity",
          "Hyperuricemia",
          "QT Interval Prolongation",
          "Vision Disorders",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "fatigue, constipation, dysgeusia, edema, dizziness, diarrhea, nausea, dysesthesia, dyspnea, myalgia, cognitive impairment, increased weight, cough, vomiting, pyrexia, arthralgia, and vision disorders",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/c7c71b0c-2549-4495-86b6-c2807fa54908/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Rozlytrek\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-24",
      "name": "Repotrectinib (Augtyro)",
      "code": "TPX-0005",
      "target": "TRK",
      "genes": [
        "NTRK1"
      ],
      "modality": "small molecule",
      "company": "Turning Point Therapeutics, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "TRIDENT-1",
      "nct_id": "NCT03093116",
      "line": "tissue-agnostic",
      "status": "approved",
      "readout": "Repotrectinib in tumours with ALK, ROS1 or NTRK1-3 rearrangements",
      "readout_date": "",
      "subtype_label": "NTRK fusion, tissue-agnostic",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "NTRK gene fusion",
      "source_url": "https://clinicaltrials.gov/study/NCT03093116",
      "registry": {
        "title": "A Study of Repotrectinib (TPX-0005) in Patients With Advanced Solid Tumors Harboring ALK, ROS1, or NTRK1-3 Rearrangements",
        "overall_status": "RECRUITING",
        "phase": "Phase 1/Phase 2",
        "sponsor": "Turning Point Therapeutics, Inc.",
        "enrollment": 500,
        "start_date": "2017-03-07",
        "primary_completion_date": "2028-02-29",
        "last_update_posted": "2026-05-27",
        "url": "https://clinicaltrials.gov/study/NCT03093116"
      },
      "label": {
        "matched_brand": "Augtyro",
        "matched_generic": "REPOTRECTINIB",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20240613",
        "spl_id": "9fa5a47f-24bf-464a-aed7-54ad81abf121",
        "boxed": null,
        "warnings": [
          "Central Nervous System (CNS) Effects",
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Hepatotoxicity",
          "Creatine Phosphokinase (CPK) Elevation",
          "Hyperuricemia",
          "Skeletal Fractures",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "dizziness, dysgeusia, peripheral neuropathy, constipation, dyspnea, fatigue, ataxia, cognitive impairment, muscular weakness, and nausea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/fb526827-40ba-4462-94cf-179ae3b0cb8a/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Augtyro\""
      }
    },
    {
      "id": "drug-25",
      "name": "Selpercatinib (Retevmo)",
      "code": "LOXO-292",
      "target": "RET",
      "genes": [
        "RET"
      ],
      "modality": "small molecule",
      "company": "Eli Lilly and Company",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "LIBRETTO-001",
      "nct_id": "NCT03157128",
      "line": "tissue-agnostic",
      "status": "approved",
      "readout": "Selpercatinib in RET-altered solid tumours",
      "readout_date": "",
      "subtype_label": "RET fusion, tissue-agnostic",
      "nodes": [
        "site-root"
      ],
      "receptor_context": "RET gene fusion",
      "source_url": "https://clinicaltrials.gov/study/NCT03157128",
      "registry": {
        "title": "A Study of Selpercatinib (LOXO-292) in Participants With Advanced Solid Tumors, RET Fusion-Positive Solid Tumors, and Medullary Thyroid Cancer (LIBRETTO-001)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 1/Phase 2",
        "sponsor": "Eli Lilly and Company",
        "enrollment": 857,
        "start_date": "2017-05-02",
        "primary_completion_date": "2025-02-14",
        "last_update_posted": "2026-04-16",
        "url": "https://clinicaltrials.gov/study/NCT03157128"
      },
      "label": {
        "matched_brand": "RETEVMO",
        "matched_generic": "selpercatinib",
        "manufacturer": null,
        "effective_time": "20260714",
        "spl_id": "8aaf7f3e-9dc1-4e71-af62-4943f4284e81",
        "boxed": null,
        "warnings": [
          "Hepatotoxicity",
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Hypertension",
          "QT Interval Prolongation",
          "Hemorrhagic Events",
          "Hypersensitivity",
          "Tumor Lysis Syndrome",
          "Risk of Impaired Wound Healing",
          "Hypothyroidism",
          "Embryo-Fetal Toxicity",
          "Epiphysis (SCFE/SUFE) in Pediatric Patients"
        ],
        "common": {
          "text": "Adult patients with solid tumors: musculoskeletal pain, edema, diarrhea, fatigue, dry mouth, hypertension, abdominal pain, rash, nausea, constipation, cough, headache, vomiting, dyspnea, and hemorrhage",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/7fa848ba-a59c-4144-9f52-64d090f4d828/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Retevmo\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-26",
      "name": "Zanzalintinib + atezolizumab",
      "code": "XL092",
      "target": "multikinase + PD-L1",
      "genes": [
        "CD274"
      ],
      "modality": "small molecule",
      "company": "Exelixis",
      "partner": "",
      "phase": "filed",
      "phase_rank": 6,
      "trial_name": "STELLAR-303",
      "nct_id": "NCT05425940",
      "line": "after standard therapy",
      "status": "filed",
      "readout": "NDA review extended by three months after a major amendment; target action date 2027-03-03",
      "readout_date": "2027-03-03",
      "subtype_label": "MSS or MSI-low metastatic",
      "nodes": [
        "rep-pmmr"
      ],
      "receptor_context": "after standard therapy",
      "source_url": "https://www.sec.gov/Archives/edgar/data/0000939767/000093976726000108/exel-20260910.htm",
      "registry": {
        "title": "Study of XL092 + Atezolizumab vs Regorafenib in Participants With Metastatic Colorectal Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Exelixis",
        "enrollment": 901,
        "start_date": "2022-09-07",
        "primary_completion_date": "2026-06-16",
        "last_update_posted": "2026-07-17",
        "url": "https://clinicaltrials.gov/study/NCT05425940"
      }
    },
    {
      "id": "drug-27",
      "name": "Dostarlimab (Jemperli)",
      "code": "TSR-042",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "GlaxoSmithKline",
      "partner": "",
      "phase": "filed",
      "phase_rank": 6,
      "trial_name": "AZUR-1",
      "nct_id": "NCT05723562",
      "line": "previously untreated",
      "status": "filed",
      "readout": "sBLA accepted for priority review; target action date February 2027",
      "readout_date": "2027-02",
      "subtype_label": "dMMR/MSI-H locally advanced rectal",
      "nodes": [
        "rep-dmmr",
        "site-rectum"
      ],
      "receptor_context": "stage II and III, previously untreated",
      "source_url": "https://us.gsk.com/en-us/media/press-releases/jemperli-dostarlimab-gxly-accepted-for-priority-review-by-the-us-fda/",
      "registry": {
        "title": "A Study of Dostarlimab in Untreated dMMR/MSI-H Locally Advanced Rectal Cancer",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 2",
        "sponsor": "GlaxoSmithKline",
        "enrollment": 154,
        "start_date": "2023-04-03",
        "primary_completion_date": "2026-11-02",
        "last_update_posted": "2026-05-26",
        "url": "https://clinicaltrials.gov/study/NCT05723562"
      },
      "label": {
        "matched_brand": "Jemperli",
        "matched_generic": "DOSTARLIMAB",
        "manufacturer": "GlaxoSmithKline LLC",
        "effective_time": "20250902",
        "spl_id": "da2ad681-d178-42c9-aa55-47c619cc7cb1",
        "boxed": null,
        "warnings": [
          "Infusion-related reactions",
          "Embryo-fetal toxicity",
          "Endocrinopathies Adrenal Insufficiency",
          "Hypophysitis",
          "Combination with Carboplatin and Paclitaxel",
          "JEMPERLI as a Single Agent",
          "Thyroid Disorders",
          "Thyroiditis",
          "Hypothyroidism",
          "Hyperthyroidism",
          "Which Can Present with Diabetic Ketoacidosis",
          "Nervous System"
        ],
        "common": {
          "text": "fatigue/asthenia, anemia, diarrhea, and nausea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/095eab9f-545a-4f12-bfb7-19477fb901a5/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Jemperli\""
      }
    }
  ],
  "drug_summary": {
    "n_drugs": 28,
    "registry_matched": 28,
    "phases": {
      "approved": 26,
      "filed": 2
    },
    "modalities": {
      "antibody": 12,
      "small molecule": 12,
      "ADC": 1,
      "fusion protein": 1,
      "chemotherapy": 2
    },
    "unmapped_targets": []
  },
  "gaps": {
    "druggable_untargeted": [
      {
        "gene": "TP53",
        "basis": "genomic",
        "max_pct": 90.4,
        "max_node": "drv-wild-type",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 4,
        "civic_therapies": [
          "Cetuximab",
          "Capecitabine",
          "Oxaliplatin",
          "Pazopanib"
        ],
        "why": "Still undrugged: restoring a lost function is harder than blocking one."
      },
      {
        "gene": "APC",
        "basis": "genomic",
        "max_pct": 87.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "civic_best_level": "D",
        "civic_best_level_submitted": "B",
        "civic_items": 4,
        "civic_therapies": [
          "Regorafenib",
          "G007-LK",
          "JW55"
        ],
        "why": "A tumour suppressor in WNT signalling. What is lost cannot be blocked, and no agent here is aimed at it."
      },
      {
        "gene": "SMAD4",
        "basis": "genomic",
        "max_pct": 30.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 5,
        "civic_therapies": [
          "Lysine",
          "Fluorouracil",
          "Cetuximab",
          "Panitumumab"
        ],
        "why": "A tumour suppressor in TGF-beta signalling, lost rather than switched on, with no agent here aimed at it."
      },
      {
        "gene": "PIK3CA",
        "basis": "genomic",
        "max_pct": 24.4,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 61,
        "civic_therapies": [
          "Cetuximab",
          "Aspirin",
          "Panitumumab",
          "Irinotecan"
        ],
        "why": "Activating mutations, as in breast cancer, with no agent here aimed at them in colorectal cancer."
      },
      {
        "gene": "TCF7L2",
        "basis": "genomic",
        "max_pct": 16.7,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "TCF4, the transcription factor beta-catenin binds; no agent here is aimed at it."
      },
      {
        "gene": "CTNNB1",
        "basis": "genomic",
        "max_pct": 16.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_best_level_submitted": "B",
        "civic_items": 1,
        "civic_therapies": [],
        "why": "Beta-catenin, which APC normally helps break down; no agent here is aimed at it."
      },
      {
        "gene": "FBXW7",
        "basis": "genomic",
        "max_pct": 11.9,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 7,
        "civic_therapies": [
          "Regorafenib Anhydrous",
          "Cetuximab",
          "Panitumumab"
        ],
        "why": "A tumour suppressor that marks growth proteins for destruction; no agent here is aimed at it."
      },
      {
        "gene": "SOX9",
        "basis": "genomic",
        "max_pct": 10.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "A transcription factor; no agent here is aimed at it."
      },
      {
        "gene": "NRAS",
        "basis": "genomic",
        "max_pct": 8.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": "A",
        "civic_items": 39,
        "civic_therapies": [
          "Cetuximab",
          "Dactolisib",
          "Chemotherapy",
          "Irinotecan"
        ],
        "why": "A mutation rules out the anti-EGFR antibodies, whose panitumumab label defines wild type in both KRAS and NRAS. No agent here is aimed at NRAS."
      },
      {
        "gene": "AMER1",
        "basis": "genomic",
        "max_pct": 7.3,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "Binds APC in the complex that breaks beta-catenin down; no agent here is aimed at it."
      }
    ],
    "addressed_indirectly": [],
    "landscape": [
      {
        "gene": "EGFR",
        "basis": "expression",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 8,
        "best_phase": "approved",
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation",
        "hotspot_n": 30,
        "civic_best_level": "B"
      },
      {
        "gene": "PDCD1",
        "basis": "marker",
        "biomarker_gene": "mismatch repair status",
        "comparable": false,
        "programs": 5,
        "best_phase": "approved",
        "max_pct": 0.4,
        "max_node": "drv-wild-type",
        "max_metric": "mutation",
        "hotspot_n": 18,
        "civic_best_level": null
      },
      {
        "gene": "VEGFA",
        "basis": "unselected",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 4,
        "best_phase": "approved",
        "max_pct": 2.5,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "hotspot_n": 5,
        "civic_best_level": "B"
      },
      {
        "gene": "KDR",
        "basis": "unselected",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 3,
        "best_phase": "approved",
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation",
        "hotspot_n": 32,
        "civic_best_level": "C"
      },
      {
        "gene": "NTRK1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 3,
        "best_phase": "approved",
        "max_pct": 0.2,
        "max_node": "drv-wild-type",
        "max_metric": "fusion",
        "hotspot_n": 35,
        "civic_best_level": "C"
      },
      {
        "gene": "KRAS",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 100.0,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "hotspot_n": 486,
        "civic_best_level": "A"
      },
      {
        "gene": "BRAF",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 100.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "hotspot_n": 119,
        "civic_best_level": "A"
      },
      {
        "gene": "ERBB2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 2,
        "best_phase": "approved",
        "max_pct": 100.0,
        "max_node": "drv-her2-amp",
        "max_metric": "amplification",
        "hotspot_n": 52,
        "civic_best_level": "B"
      },
      {
        "gene": "RET",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 1,
        "best_phase": "approved",
        "max_pct": 0.2,
        "max_node": "drv-wild-type",
        "max_metric": "fusion",
        "hotspot_n": 27,
        "civic_best_level": "C"
      },
      {
        "gene": "TP53",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 90.4,
        "max_node": "drv-wild-type",
        "max_metric": "mutation",
        "hotspot_n": 798,
        "civic_best_level": "B"
      },
      {
        "gene": "APC",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 87.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "hotspot_n": 846,
        "civic_best_level": "D"
      },
      {
        "gene": "SMAD4",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 30.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "hotspot_n": 166,
        "civic_best_level": "B"
      },
      {
        "gene": "PIK3CA",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 24.4,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 223,
        "civic_best_level": "B"
      },
      {
        "gene": "TCF7L2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 16.7,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "hotspot_n": 122,
        "civic_best_level": null
      },
      {
        "gene": "CTNNB1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 16.1,
        "max_node": "drv-kras-g12c",
        "max_metric": "mutation",
        "hotspot_n": 81,
        "civic_best_level": null
      },
      {
        "gene": "FBXW7",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 11.9,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 139,
        "civic_best_level": "B"
      },
      {
        "gene": "SOX9",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 10.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 105,
        "civic_best_level": null
      },
      {
        "gene": "NRAS",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 8.7,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 46,
        "civic_best_level": "A"
      },
      {
        "gene": "AMER1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.3,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 65,
        "civic_best_level": null
      },
      {
        "gene": "POLE",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 4.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "hotspot_n": 58,
        "civic_best_level": "B"
      },
      {
        "gene": "MSH2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 3.8,
        "max_node": "drv-her2-amp",
        "max_metric": "mutation",
        "hotspot_n": 31,
        "civic_best_level": "C"
      },
      {
        "gene": "MSH6",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 2.0,
        "max_node": "drv-braf-v600e",
        "max_metric": "mutation",
        "hotspot_n": 39,
        "civic_best_level": "C"
      },
      {
        "gene": "PMS2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 0.9,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 14,
        "civic_best_level": null
      },
      {
        "gene": "MLH1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 0.2,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 20,
        "civic_best_level": "C"
      }
    ],
    "repositioning": [],
    "evidence_without_program": [
      {
        "gene": "MLH1",
        "best_level": "C",
        "n_evidence_items": 21,
        "evidence_types": {
          "ONCOGENIC": 21
        },
        "top_therapies": [],
        "in_target_set": true
      },
      {
        "gene": "MAP2K1",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 6,
        "evidence_types": {
          "PREDICTIVE": 6
        },
        "top_therapies": [
          "Cetuximab",
          "Vemurafenib",
          "Irinotecan",
          "Dabrafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "MET",
        "best_level": "C",
        "best_level_submitted": "B",
        "n_evidence_items": 5,
        "evidence_types": {
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Crizotinib",
          "SAIT301",
          "Vemurafenib",
          "Panitumumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "MSH6",
        "best_level": "C",
        "n_evidence_items": 5,
        "evidence_types": {
          "ONCOGENIC": 5
        },
        "top_therapies": [],
        "in_target_set": true
      },
      {
        "gene": "LMNA",
        "best_level": "C",
        "n_evidence_items": 4,
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Entrectinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ALK",
        "best_level": "C",
        "n_evidence_items": 4,
        "evidence_types": {
          "PREDICTIVE": 4
        },
        "top_therapies": [
          "Entrectinib",
          "Nivolumab",
          "Crizotinib",
          "Ceritinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "HRAS",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Cetuximab",
          "Epidermal Growth Factor Receptor Tyrosine Kinase Inhibitor"
        ],
        "in_target_set": false
      },
      {
        "gene": "EML4",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "ONCOGENIC": 2,
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Nivolumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "MSH2",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "ONCOGENIC": 3
        },
        "top_therapies": [],
        "in_target_set": true
      },
      {
        "gene": "NTRK3",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "ONCOGENIC": 3
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "TPR",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Larotrectinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "HLA-C",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Therapeutic Tumor Infiltrating Lymphocytes"
        ],
        "in_target_set": false
      },
      {
        "gene": "CCDC6",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Agerafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CAD",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Entrectinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ARAF",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib",
          "Cetuximab",
          "Irinotecan"
        ],
        "in_target_set": false
      },
      {
        "gene": "VPS18",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "ONCOGENIC": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "JUN",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Irbesartan"
        ],
        "in_target_set": false
      },
      {
        "gene": "STRN",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Ceritinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "FOS",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Irbesartan"
        ],
        "in_target_set": false
      },
      {
        "gene": "SEPTIN14",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Erlotinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "APC",
        "best_level": "D",
        "best_level_submitted": "B",
        "n_evidence_items": 4,
        "evidence_types": {
          "PREDICTIVE": 3,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Regorafenib",
          "G007-LK",
          "JW55"
        ],
        "in_target_set": true
      },
      {
        "gene": "FGFR1",
        "best_level": "D",
        "best_level_submitted": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Regorafenib",
          "Infigratinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "POLD1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "ATR Inhibitor",
          "Chk1 Inhibitor"
        ],
        "in_target_set": false
      },
      {
        "gene": "CIC",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Trametinib",
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "NRG1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Cetuximab"
        ],
        "in_target_set": false
      },
      {
        "gene": "FOXC2",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Oxaliplatin"
        ],
        "in_target_set": false
      },
      {
        "gene": "FOXF1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Bevacizumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "DHFR",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "GGH",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "UCK2",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "NT5C",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "NME1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "UNG",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "RRM1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "DPYS",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "UGT1A",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Ganetespib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PTP4A3",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Cetuximab"
        ],
        "in_target_set": false
      },
      {
        "gene": "ARID1A",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Dasatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "BARD1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Olaparib"
        ],
        "in_target_set": false
      },
      {
        "gene": "IRS2",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Dual IGF-1R/InsR Inhibitor BMS-754807"
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
          "Carfilzomib"
        ],
        "in_target_set": false
      },
      {
        "gene": "LGR5",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "ERCC6",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "FPGS",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "DTYMK",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "DUT",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "UMPS",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Fluorouracil"
        ],
        "in_target_set": false
      },
      {
        "gene": "SLFN11",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "7-Ethyl-10-Hydroxycamptothecin"
        ],
        "in_target_set": false
      },
      {
        "gene": "EIF4EBP1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "WYE354",
          "MTOR Kinase Inhibitor PP242",
          "Dactolisib"
        ],
        "in_target_set": false
      },
      {
        "gene": "TPM3",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Larotrectinib",
          "Lestaurtinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "BIRC7",
        "best_level": "D",
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
        "gene": "POU5F1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Oxaliplatin"
        ],
        "in_target_set": false
      },
      {
        "gene": "MSH3",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Oxaliplatin",
          "7-Ethyl-10-Hydroxycamptothecin"
        ],
        "in_target_set": false
      },
      {
        "gene": "NOTCH3",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Tarextumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "WNT6",
        "best_level": "E",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Aspirin"
        ],
        "in_target_set": false
      },
      {
        "gene": "ROS1",
        "best_level": "E",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Crizotinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "KIT",
        "best_level": "E",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Imatinib"
        ],
        "in_target_set": false
      }
    ],
    "cohort_blind_spots": [],
    "not_mutation_selected": [],
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
    "n_drugs": 28,
    "n_with_label": 27,
    "n_boxed_warnings": 6,
    "n_with_frequencies": 2,
    "lookup_failed": [],
    "caveat": "Excerpts of US FDA labels, not a safety summary and not advice. An agent without a label here is one openFDA returned no US label for: an investigational agent has none yet, and an approved one may be approved outside the US or missed by the search. Neither means it has no side effects."
  }
};
