/* GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Produced by pipeline/run.py targets on 2026-10-18 04:56 UTC
 * Targets: 24   Drugs: 23 (23 matched to ClinicalTrials.gov)
 * Alteration cohort: mel_mskimpact_2020 (Melanoma (MSK, Clin Cancer Res 2021), n=696)
 *
 * Protein length and domains: UniProt (reviewed human entries).
 * Structure images: RCSB PDB, public domain. Static deposited renders,
 * not pocket views and not rotatable — the RCSB link is the real viewer.
 * Drugs: curated melanoma drug pipeline, joined to ClinicalTrials.gov by NCT id.
 *
 * The `gaps` block is arithmetic over these sources, not advice. The
 * repositioning list in particular is a list of questions to ask, and
 * mixes two classification axes on purpose — see its axis_note.
 */
window.CancerExplorerTargets = window.CancerExplorerTargets || {};
window.CancerExplorerTargets['melanoma'] = {
  "cancer": "melanoma",
  "cohort": {
    "id": "mel_mskimpact_2020",
    "name": "Melanoma (MSK, Clin Cancer Res 2021)",
    "citation": "Alexander N et al. Clin Cancer Res 2021",
    "pmid": "33509808",
    "n_samples": 696,
    "n_patients": 696
  },
  "sources": {
    "protein": "UniProt (Swiss-Prot, reviewed human entries)",
    "structure": "RCSB PDB",
    "structure_note": "Static deposited-structure renders. Not pocket views, and not rotatable — follow the RCSB link for an interactive viewer.",
    "alterations": "cBioPortal",
    "drugs": "curated melanoma drug pipeline",
    "trials": "ClinicalTrials.gov registry records, joined by NCT id",
    "evidence": "CIViC (Clinical Interpretation of Variants in Cancer)"
  },
  "n_targets": 24,
  "genes": {
    "BRAF": {
      "gene": "BRAF",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A V600E or V600K result selects a BRAF inhibitor with a MEK inhibitor. The labels name those two changes, not the gene.",
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
          "n": 172,
          "of": 696,
          "pct": 24.7
        },
        {
          "change": "V600K",
          "pos": 600,
          "type": "Missense_Mutation",
          "n": 36,
          "of": 696,
          "pct": 5.2
        },
        {
          "change": "D594N",
          "pos": 594,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "V600R",
          "pos": 600,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "S467L",
          "pos": 467,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "G469A",
          "pos": 469,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "G469R",
          "pos": 469,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "L584F",
          "pos": 584,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "L597S",
          "pos": 597,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "S363F",
          "pos": 363,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "G466R",
          "pos": 466,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "D594G",
          "pos": 594,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "L597Q",
          "pos": 597,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "T599dup",
          "pos": 599,
          "type": "In_Frame_Ins",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "K601E",
          "pos": 601,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "R239Q",
          "pos": 239,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P367L",
          "pos": 367,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P367S",
          "pos": 367,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G466E",
          "pos": 466,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G469S",
          "pos": 469,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "L485W",
          "pos": 485,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "N581I",
          "pos": 581,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "N581S",
          "pos": 581,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "L597R",
          "pos": 597,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P708S",
          "pos": 708,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 301,
      "n_distinct_changes": 75,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 43,
              "of": 43,
              "pct": 100.0
            },
            "amplification": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 172,
              "of": 172,
              "pct": 100.0
            },
            "amplification": {
              "n": 3,
              "of": 172,
              "pct": 1.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 29,
              "of": 44,
              "pct": 65.9
            },
            "amplification": {
              "n": 2,
              "of": 44,
              "pct": 4.5
            },
            "deep_deletion": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "any_loss": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "fusion": {
              "n": 17,
              "of": 44,
              "pct": 38.6
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 34,
              "of": 155,
              "pct": 21.9
            },
            "amplification": {
              "n": 2,
              "of": 155,
              "pct": 1.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 11,
              "of": 172,
              "pct": 6.4
            },
            "amplification": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 7,
              "of": 25,
              "pct": 28.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 100.0,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-0",
        "drug-1",
        "drug-2",
        "drug-4",
        "drug-5",
        "drug-6",
        "drug-7"
      ],
      "n_programs": 7,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 182,
        "n_accepted": 97,
        "best_level": "A",
        "levels": {
          "A": 8,
          "B": 72,
          "C": 40,
          "D": 59,
          "E": 3
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "ONCOGENIC": 11,
          "PREDICTIVE": 168,
          "PROGNOSTIC": 2
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "Trametinib",
          "BRAF Inhibitor",
          "Mitogen-Activated Protein Kinase Kinase Inhibitor",
          "Cobimetinib"
        ]
      },
      "selected_on": "allele"
    },
    "NRAS": {
      "gene": "NRAS",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "No agent here is aimed at NRAS. It appears instead where a BRAF inhibitor stops working, which is why it sits on the BRAF V600 card.",
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
          "change": "Q61R",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 74,
          "of": 696,
          "pct": 10.6
        },
        {
          "change": "Q61K",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 61,
          "of": 696,
          "pct": 8.8
        },
        {
          "change": "Q61L",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 34,
          "of": 696,
          "pct": 4.9
        },
        {
          "change": "Q61H",
          "pos": 61,
          "type": "Missense_Mutation",
          "n": 11,
          "of": 696,
          "pct": 1.6
        },
        {
          "change": "G12D",
          "pos": 12,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 696,
          "pct": 1.1
        },
        {
          "change": "G13R",
          "pos": 13,
          "type": "Missense_Mutation",
          "n": 6,
          "of": 696,
          "pct": 0.9
        },
        {
          "change": "T50I",
          "pos": 50,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        }
      ],
      "n_mutated_samples": 207,
      "n_distinct_changes": 21,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 21,
              "of": 155,
              "pct": 13.5
            },
            "amplification": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "any_loss": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 172,
              "of": 172,
              "pct": 100.0
            },
            "amplification": {
              "n": 6,
              "of": 172,
              "pct": 3.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 12,
              "of": 25,
              "pct": 48.0
            },
            "amplification": {
              "n": 2,
              "of": 25,
              "pct": 8.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 100.0,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 49,
        "n_accepted": 30,
        "best_level": "B",
        "levels": {
          "B": 15,
          "C": 19,
          "D": 15
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "PREDICTIVE": 43,
          "PREDISPOSING": 2,
          "PROGNOSTIC": 3
        },
        "top_therapies": [
          "Vemurafenib",
          "Belvarafenib",
          "Binimetinib",
          "Trametinib",
          "Dabrafenib",
          "Temozolomide"
        ]
      },
      "selected_on": null
    },
    "KIT": {
      "gene": "KIT",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Mutated most often in mucosal melanoma, and no KIT inhibitor carries a US melanoma indication.",
      "uniprot": {
        "gene": "KIT",
        "accession": "P10721",
        "entry_name": "KIT_HUMAN",
        "protein": "Mast/stem cell growth factor receptor Kit",
        "length": 976,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 1",
            "start": 27,
            "end": 112
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 2",
            "start": 121,
            "end": 205
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 3",
            "start": 212,
            "end": 308
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 4",
            "start": 317,
            "end": 410
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 5",
            "start": 413,
            "end": 507
          },
          {
            "kind": "Region",
            "name": "Important for interaction with phosphotyrosine-binding proteins",
            "start": 568,
            "end": 570
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 589,
            "end": 937
          }
        ],
        "pdb_count": 52,
        "pdb_ids": [
          "1PKG",
          "1T45",
          "1T46",
          "2E9W",
          "2EC8",
          "2IUH",
          "2VIF",
          "3G0E",
          "3G0F",
          "4HVS",
          "4K94",
          "4K9E",
          "4PGZ",
          "4U0I",
          "6GQJ",
          "6GQK",
          "6GQL",
          "6GQM",
          "6HH1",
          "6ITT",
          "6ITV",
          "6KLA",
          "6MOB",
          "6XV9",
          "6XVA",
          "6XVB",
          "7KHG",
          "7KHJ",
          "7KHK",
          "7ZW8",
          "7ZY6",
          "8DFM",
          "8DFP",
          "8DFQ",
          "8PQ9",
          "8PQA",
          "8PQB",
          "8PQC",
          "8PQD",
          "8PQE"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P10721",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P10721"
      },
      "structure": {
        "pdb": "1T46",
        "title": "STRUCTURAL BASIS FOR THE AUTOINHIBITION AND STI-571 INHIBITION OF C-KIT TYROSINE KINASE",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.6,
        "ligands": [],
        "deposited": "2004-06-15",
        "url": "https://www.rcsb.org/structure/1T46",
        "image": "img/1t46.jpg",
        "image_bytes": 61388
      },
      "hotspots": [
        {
          "change": "L576P",
          "pos": 576,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 696,
          "pct": 0.7
        },
        {
          "change": "K642E",
          "pos": 642,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "D579del",
          "pos": 578,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 39,
      "n_distinct_changes": 34,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 14,
              "of": 14,
              "pct": 100.0
            },
            "amplification": {
              "n": 4,
              "of": 14,
              "pct": 28.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 11,
              "of": 155,
              "pct": 7.1
            },
            "amplification": {
              "n": 4,
              "of": 155,
              "pct": 2.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 3,
              "of": 25,
              "pct": 12.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 12.0,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 20,
        "n_accepted": 13,
        "best_level": "B",
        "levels": {
          "B": 6,
          "C": 9,
          "D": 5
        },
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "PREDICTIVE": 18,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Imatinib",
          "Dasatinib",
          "Nilotinib",
          "Sunitinib",
          "Sorafenib"
        ]
      },
      "selected_on": null
    },
    "MAP2K1": {
      "gene": "MAP2K1",
      "basis": "pathway",
      "biomarker_gene": "BRAF",
      "why": "MEK1 is what the MEK inhibitors block, but a BRAF result is what selects them; a change in MEK1 selects nothing.",
      "uniprot": {
        "gene": "MAP2K1",
        "accession": "Q02750",
        "entry_name": "MP2K1_HUMAN",
        "protein": "Dual specificity mitogen-activated protein kinase kinase 1",
        "length": 393,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 27
          },
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 68,
            "end": 361
          },
          {
            "kind": "Region",
            "name": "RAF1-binding",
            "start": 270,
            "end": 307
          }
        ],
        "pdb_count": 94,
        "pdb_ids": [
          "1S9J",
          "2P55",
          "3DV3",
          "3DY7",
          "3E8N",
          "3EQB",
          "3EQC",
          "3EQD",
          "3EQF",
          "3EQG",
          "3EQH",
          "3EQI",
          "3MBL",
          "3ORN",
          "3OS3",
          "3PP1",
          "3SLS",
          "3V01",
          "3V04",
          "3VVH",
          "3W8Q",
          "3WIG",
          "3ZLS",
          "3ZLW",
          "3ZLX",
          "3ZLY",
          "3ZM4",
          "4AN2",
          "4AN3",
          "4AN9",
          "4ANB",
          "4ARK",
          "4LMN",
          "4MNE",
          "4U7Z",
          "4U80",
          "4U81",
          "5BX0",
          "5EYM",
          "5HZE"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q02750",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q02750"
      },
      "structure": {
        "pdb": "3EQC",
        "title": "X-ray structure of the human mitogen-activated protein kinase kinase 1 (MEK1) in a ternary complex with compound 1, ATP-GS AND MG2P",
        "method": "X-RAY DIFFRACTION",
        "resolution": 1.8,
        "ligands": [
          "AGS",
          "CA",
          "MG",
          "NA"
        ],
        "deposited": "2009-02-24",
        "url": "https://www.rcsb.org/structure/3EQC",
        "image": "img/3eqc.jpg",
        "image_bytes": 64057
      },
      "hotspots": [
        {
          "change": "E203K",
          "pos": 203,
          "type": "Missense_Mutation",
          "n": 12,
          "of": 696,
          "pct": 1.7
        },
        {
          "change": "P124L",
          "pos": 124,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 696,
          "pct": 1.1
        },
        {
          "change": "P124S",
          "pos": 124,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 696,
          "pct": 0.7
        },
        {
          "change": "K57E",
          "pos": 57,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "L50F",
          "pos": 50,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "F53L",
          "pos": 53,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "I99_K104del",
          "pos": 98,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "I103_K104del",
          "pos": 103,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "N109_R113del",
          "pos": 108,
          "type": "In_Frame_Del",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 59,
      "n_distinct_changes": 32,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 6,
              "of": 43,
              "pct": 14.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 2,
              "of": 44,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 14,
              "of": 155,
              "pct": 9.0
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 12,
              "of": 172,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 16,
              "of": 43,
              "pct": 37.2
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 2,
              "of": 28,
              "pct": 7.1
            },
            "amplification": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 37.2,
        "max_node": "drv-other",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-1",
        "drug-3",
        "drug-4",
        "drug-5",
        "drug-6",
        "drug-7"
      ],
      "n_programs": 6,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 13,
        "n_accepted": 3,
        "best_level": "C",
        "levels": {
          "C": 11,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 13
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "Selumetinib"
        ]
      },
      "selected_on": null
    },
    "MAP2K2": {
      "gene": "MAP2K2",
      "basis": "pathway",
      "biomarker_gene": "BRAF",
      "why": "MEK2, blocked by the same drugs and selected by the same BRAF result.",
      "uniprot": {
        "gene": "MAP2K2",
        "accession": "P36507",
        "entry_name": "MP2K2_HUMAN",
        "protein": "Dual specificity mitogen-activated protein kinase kinase 2",
        "length": 400,
        "domains": [
          {
            "kind": "Domain",
            "name": "Protein kinase",
            "start": 72,
            "end": 369
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 286,
            "end": 310
          }
        ],
        "pdb_count": 2,
        "pdb_ids": [
          "1S9I",
          "4H3Q"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P36507",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P36507"
      },
      "structure": {
        "pdb": "1S9I",
        "title": "X-ray structure of the human mitogen-activated protein kinase kinase 2 (MEK2)in a complex with ligand and MgATP",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.2,
        "ligands": [
          "ATP",
          "MG"
        ],
        "deposited": "2004-11-23",
        "url": "https://www.rcsb.org/structure/1S9I",
        "image": "img/1s9i.jpg",
        "image_bytes": 74095
      },
      "hotspots": [],
      "n_mutated_samples": 20,
      "n_distinct_changes": 20,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 2,
              "of": 44,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 8,
              "of": 155,
              "pct": 5.2
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "amplification": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 4,
              "of": 25,
              "pct": 16.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 16.0,
        "max_node": "drv-ras-other",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-1",
        "drug-3",
        "drug-4",
        "drug-5",
        "drug-6",
        "drug-7"
      ],
      "n_programs": 6,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": {
        "n_evidence_items": 6,
        "n_accepted": 3,
        "best_level": "D",
        "best_level_submitted": "C",
        "levels": {
          "C": 3,
          "D": 3
        },
        "evidence_types": {
          "PREDICTIVE": 6
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "Trametinib"
        ]
      },
      "selected_on": null
    },
    "NF1": {
      "gene": "NF1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Loss releases the brake on RAS. What is lost cannot be blocked, and no agent here is aimed at it.",
      "uniprot": {
        "gene": "NF1",
        "accession": "P21359",
        "entry_name": "NF1_HUMAN",
        "protein": "Neurofibromin",
        "length": 2839,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ras-GAP",
            "start": 1251,
            "end": 1482
          },
          {
            "kind": "Domain",
            "name": "CRAL-TRIO",
            "start": 1580,
            "end": 1738
          },
          {
            "kind": "Region",
            "name": "Lipid binding",
            "start": 1580,
            "end": 1837
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 2787,
            "end": 2839
          }
        ],
        "pdb_count": 26,
        "pdb_ids": [
          "1NF1",
          "2D4Q",
          "2E2X",
          "3P7Z",
          "3PEG",
          "3PG7",
          "6OB2",
          "6OB3",
          "6V65",
          "6V6F",
          "7MOC",
          "7MP5",
          "7MP6",
          "7PGP",
          "7PGQ",
          "7PGR",
          "7PGS",
          "7PGT",
          "7PGU",
          "7R03",
          "7R04",
          "8E20",
          "8EDL",
          "8EDM",
          "8EDN",
          "8EDO"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P21359",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P21359"
      },
      "structure": {
        "pdb": "1NF1",
        "title": "THE GAP RELATED DOMAIN OF NEUROFIBROMIN",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.5,
        "ligands": [],
        "deposited": "1999-07-20",
        "url": "https://www.rcsb.org/structure/1NF1",
        "image": "img/1nf1.jpg",
        "image_bytes": 50626
      },
      "hotspots": [
        {
          "change": "R440*",
          "pos": 440,
          "type": "Nonsense_Mutation",
          "n": 15,
          "of": 696,
          "pct": 2.2
        },
        {
          "change": "R1241*",
          "pos": 1241,
          "type": "Nonsense_Mutation",
          "n": 9,
          "of": 696,
          "pct": 1.3
        },
        {
          "change": "R416*",
          "pos": 416,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "R1362*",
          "pos": 1362,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "Q912*",
          "pos": 912,
          "type": "Nonsense_Mutation",
          "n": 5,
          "of": 696,
          "pct": 0.7
        },
        {
          "change": "Q282*",
          "pos": 282,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "Q1070*",
          "pos": 1070,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "Q1174*",
          "pos": 1174,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "R1276*",
          "pos": 1276,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "Q2239*",
          "pos": 2239,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "X2397_splice",
          "pos": 2397,
          "type": "Splice_Site",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "X160_splice",
          "pos": 160,
          "type": "Splice_Site",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "X465_splice",
          "pos": 465,
          "type": "Splice_Site",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "Q531*",
          "pos": 530,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "X1325_splice",
          "pos": 1325,
          "type": "Splice_Site",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "S1599F",
          "pos": 1599,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "Q1822*",
          "pos": 1822,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "G2397R",
          "pos": 2397,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "R2517*",
          "pos": 2517,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "Q236*",
          "pos": 236,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X354_splice",
          "pos": 354,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q392*",
          "pos": 392,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q400*",
          "pos": 400,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "W571*",
          "pos": 571,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "W599*",
          "pos": 599,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "W696*",
          "pos": 696,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "W784*",
          "pos": 784,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X951_splice",
          "pos": 951,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X1066_splice",
          "pos": 1066,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q1218*",
          "pos": 1218,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q1235*",
          "pos": 1235,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X1237_splice",
          "pos": 1237,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q1336*",
          "pos": 1336,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X1445_splice",
          "pos": 1445,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q1595*",
          "pos": 1595,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Y1634*",
          "pos": 1634,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X1870_splice",
          "pos": 1870,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P1901S",
          "pos": 1901,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X2273_splice",
          "pos": 2273,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X2486_splice",
          "pos": 2486,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 194,
      "n_distinct_changes": 209,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 7,
              "of": 172,
              "pct": 4.1
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 4,
              "of": 44,
              "pct": 9.1
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 153,
              "of": 155,
              "pct": 98.7
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "any_loss": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "fusion": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 8,
              "of": 172,
              "pct": 4.7
            },
            "amplification": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 6,
              "of": 25,
              "pct": 24.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 8,
              "of": 43,
              "pct": 18.6
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 4,
              "of": 28,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 98.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 9,
        "n_accepted": 5,
        "best_level": "C",
        "levels": {
          "C": 2,
          "D": 7
        },
        "evidence_types": {
          "PREDICTIVE": 9
        },
        "top_therapies": [
          "Vemurafenib",
          "Pan-RAF/MEK Molecular Glue NST-628",
          "Mirdametinib",
          "Sirolimus",
          "Dabrafenib",
          "Cetuximab"
        ]
      },
      "selected_on": null
    },
    "PMEL": {
      "gene": "PMEL",
      "basis": "germline",
      "biomarker_gene": "HLA-A*02:01",
      "why": "Tebentafusp binds a gp100 peptide only where HLA-A*02:01 presents it, so a blood test of the PATIENT decides eligibility. Nothing measured in the tumour, PMEL included, says who can receive it, and the dataset's targets[].germline carries the counted share.",
      "uniprot": {
        "gene": "PMEL",
        "accession": "P40967",
        "entry_name": "PMEL_HUMAN",
        "protein": "Melanocyte protein PMEL",
        "length": 661,
        "domains": [
          {
            "kind": "Region",
            "name": "Amyloidogenic unit",
            "start": 148,
            "end": 223
          },
          {
            "kind": "Region",
            "name": "Antigenic peptide; presented by A*02:01",
            "start": 154,
            "end": 162
          },
          {
            "kind": "Region",
            "name": "Antigenic peptide; presented by A*02:01",
            "start": 209,
            "end": 217
          },
          {
            "kind": "Domain",
            "name": "PKD",
            "start": 255,
            "end": 292
          },
          {
            "kind": "Region",
            "name": "Antigenic peptide; presented by A*02:01",
            "start": 280,
            "end": 288
          },
          {
            "kind": "Repeat",
            "name": "1",
            "start": 302,
            "end": 314
          },
          {
            "kind": "Region",
            "name": "12 X 13 AA approximate tandem repeats, RPT domain",
            "start": 302,
            "end": 457
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 302,
            "end": 353
          },
          {
            "kind": "Repeat",
            "name": "2",
            "start": 315,
            "end": 327
          },
          {
            "kind": "Repeat",
            "name": "3",
            "start": 328,
            "end": 340
          },
          {
            "kind": "Repeat",
            "name": "4",
            "start": 341,
            "end": 353
          },
          {
            "kind": "Repeat",
            "name": "5",
            "start": 354,
            "end": 366
          },
          {
            "kind": "Repeat",
            "name": "6",
            "start": 367,
            "end": 379
          },
          {
            "kind": "Repeat",
            "name": "7",
            "start": 380,
            "end": 392
          },
          {
            "kind": "Repeat",
            "name": "8",
            "start": 393,
            "end": 405
          },
          {
            "kind": "Repeat",
            "name": "9",
            "start": 406,
            "end": 418
          },
          {
            "kind": "Repeat",
            "name": "10",
            "start": 419,
            "end": 431
          },
          {
            "kind": "Repeat",
            "name": "11",
            "start": 432,
            "end": 444
          },
          {
            "kind": "Repeat",
            "name": "12",
            "start": 445,
            "end": 457
          },
          {
            "kind": "Region",
            "name": "Kringle-like fold",
            "start": 516,
            "end": 566
          }
        ],
        "pdb_count": 20,
        "pdb_ids": [
          "1TVB",
          "1TVH",
          "3CC5",
          "4IS6",
          "5EU3",
          "5EU4",
          "5EU5",
          "5EU6",
          "6VM7",
          "6VM8",
          "6VM9",
          "6VMA",
          "6VMC",
          "7PHR",
          "9JST",
          "9JSU",
          "9JSV",
          "9JSW",
          "9JSX",
          "9LIP"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P40967",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P40967"
      },
      "structure": {
        "pdb": "6VM7",
        "title": "SILv44 T cell receptor bound to HLA-A2 presenting gp100 peptide (ITDQVPFSV)",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.41,
        "ligands": [],
        "deposited": "2021-01-20",
        "url": "https://www.rcsb.org/structure/6VM7",
        "image": "img/6vm7.jpg",
        "image_bytes": 55952
      },
      "hotspots": [],
      "n_mutated_samples": 0,
      "n_distinct_changes": 0,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {},
        "max_pct": 0.0,
        "max_node": null,
        "max_metric": null
      },
      "drugs": [
        "drug-21"
      ],
      "n_programs": 1,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "PDCD1": {
      "gene": "PDCD1",
      "basis": "unselected",
      "biomarker_gene": null,
      "why": "The target is on the T cell. No melanoma label asks for a PD-L1 or any other tumour test before a PD-1 antibody.",
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
      "n_mutated_samples": 13,
      "n_distinct_changes": 13,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "any_loss": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 7,
              "of": 155,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 155,
              "pct": 1.3
            },
            "any_loss": {
              "n": 2,
              "of": 155,
              "pct": 1.3
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "any_loss": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "any_loss": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 4.5,
        "max_node": "drv-nf1",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-10",
        "drug-11",
        "drug-12",
        "drug-13",
        "drug-14",
        "drug-15",
        "drug-16",
        "drug-17",
        "drug-19",
        "drug-22"
      ],
      "n_programs": 10,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "CTLA4": {
      "gene": "CTLA4",
      "basis": "unselected",
      "biomarker_gene": null,
      "why": "Also on the T cell, and also selected by no tumour test.",
      "uniprot": {
        "gene": "CTLA4",
        "accession": "P16410",
        "entry_name": "CTLA4_HUMAN",
        "protein": "Cytotoxic T-lymphocyte protein 4",
        "length": 223,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like V-type",
            "start": 39,
            "end": 140
          },
          {
            "kind": "Region",
            "name": "Homodimerization",
            "start": 46,
            "end": 50
          },
          {
            "kind": "Region",
            "name": "Important for interaction with CD80 and CD86",
            "start": 134,
            "end": 139
          },
          {
            "kind": "Region",
            "name": "Homodimerization",
            "start": 150,
            "end": 155
          }
        ],
        "pdb_count": 22,
        "pdb_ids": [
          "1AH1",
          "1H6E",
          "1I85",
          "1I8L",
          "2X44",
          "3BX7",
          "3OSK",
          "5GGV",
          "5TRU",
          "5XJ3",
          "6RP8",
          "6RPJ",
          "6RQM",
          "6XY2",
          "7CIO",
          "7DV4",
          "7ELX",
          "7SU0",
          "7SU1",
          "8GAB",
          "8HIT",
          "9DQ3"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P16410",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P16410"
      },
      "structure": {
        "pdb": "5TRU",
        "title": "Structure of the first-in-class checkpoint inhibitor Ipilimumab bound to human CTLA-4",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.0,
        "ligands": [],
        "deposited": "2017-05-10",
        "url": "https://www.rcsb.org/structure/5TRU",
        "image": "img/5tru.jpg",
        "image_bytes": 53389
      },
      "hotspots": [],
      "n_mutated_samples": 16,
      "n_distinct_changes": 16,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 7,
              "of": 155,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 4.7,
        "max_node": "drv-other",
        "max_metric": "mutation"
      },
      "drugs": [
        "drug-8",
        "drug-9",
        "drug-11"
      ],
      "n_programs": 3,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "LAG3": {
      "gene": "LAG3",
      "basis": "unselected",
      "biomarker_gene": null,
      "why": "The third checkpoint with a melanoma label, given with a PD-1 antibody and selected by no tumour test.",
      "uniprot": {
        "gene": "LAG3",
        "accession": "P18627",
        "entry_name": "LAG3_HUMAN",
        "protein": "Lymphocyte activation gene 3 protein",
        "length": 525,
        "domains": [
          {
            "kind": "Domain",
            "name": "Ig-like V-type",
            "start": 37,
            "end": 167
          },
          {
            "kind": "Region",
            "name": "Interaction with FGL1",
            "start": 37,
            "end": 252
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 62,
            "end": 97
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 1",
            "start": 168,
            "end": 252
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 2",
            "start": 265,
            "end": 343
          },
          {
            "kind": "Domain",
            "name": "Ig-like C2-type 3",
            "start": 348,
            "end": 419
          },
          {
            "kind": "Region",
            "name": "Connecting peptide",
            "start": 429,
            "end": 450
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 487,
            "end": 525
          },
          {
            "kind": "Region",
            "name": "12 X 2 AA tandem repeats of E-X",
            "start": 501,
            "end": 524
          }
        ],
        "pdb_count": 6,
        "pdb_ids": [
          "7TZG",
          "7TZH",
          "7UM3",
          "8SO3",
          "8SR0",
          "9BF9"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P18627",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P18627"
      },
      "structure": {
        "pdb": "9BF9",
        "title": "Human LAG-3-HLA-DR1 complex",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.4,
        "ligands": [
          "NAG"
        ],
        "deposited": "2024-12-25",
        "url": "https://www.rcsb.org/structure/9BF9",
        "image": "img/9bf9.jpg",
        "image_bytes": 61525
      },
      "hotspots": [],
      "n_mutated_samples": 0,
      "n_distinct_changes": 0,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {},
        "max_pct": 0.0,
        "max_node": null,
        "max_metric": null
      },
      "drugs": [
        "drug-17"
      ],
      "n_programs": 1,
      "best_phase": "approved",
      "best_phase_rank": 7,
      "civic": null,
      "selected_on": null
    },
    "GNAQ": {
      "gene": "GNAQ",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "The hotspot most uveal melanomas carry, with nothing aimed at it. The cohort behind these figures holds skin and unknown-primary melanoma, so the number here is not uveal melanoma's.",
      "uniprot": {
        "gene": "GNAQ",
        "accession": "P50148",
        "entry_name": "GNAQ_HUMAN",
        "protein": "Guanine nucleotide-binding protein G(q) subunit alpha",
        "length": 359,
        "domains": [
          {
            "kind": "Domain",
            "name": "G-alpha",
            "start": 38,
            "end": 359
          },
          {
            "kind": "Region",
            "name": "G1 motif",
            "start": 41,
            "end": 54
          },
          {
            "kind": "Region",
            "name": "G2 motif",
            "start": 178,
            "end": 186
          },
          {
            "kind": "Region",
            "name": "G3 motif",
            "start": 201,
            "end": 210
          },
          {
            "kind": "Region",
            "name": "G4 motif",
            "start": 270,
            "end": 277
          },
          {
            "kind": "Region",
            "name": "G5 motif",
            "start": 329,
            "end": 334
          }
        ],
        "pdb_count": 36,
        "pdb_ids": [
          "6VU5",
          "7DFL",
          "7EZM",
          "7F6G",
          "7F6H",
          "7F6I",
          "7F8W",
          "7W3Z",
          "7W40",
          "7XOW",
          "8G59",
          "8IA7",
          "8IYS",
          "8J9N",
          "8JPB",
          "8JPC",
          "8JPE",
          "8SZG",
          "8THK",
          "8THL",
          "8UQN",
          "8UQO",
          "8XGO",
          "8XGS",
          "8Y51",
          "8Y52",
          "8YYW",
          "8YYX",
          "8ZJD",
          "8ZJE",
          "9D0A",
          "9K27",
          "9LL9",
          "9LLA",
          "9LLB",
          "9M1H"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P50148",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P50148"
      },
      "structure": {
        "pdb": "3AH8",
        "title": "Structure of heterotrimeric G protein Galpha-q beta gamma in complex with an inhibitor YM-254890",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.9,
        "ligands": [],
        "deposited": "2010-07-21",
        "url": "https://www.rcsb.org/structure/3AH8",
        "image": "img/3ah8.jpg",
        "image_bytes": 70620
      },
      "hotspots": [
        {
          "change": "Q209L",
          "pos": 209,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "Q209R",
          "pos": 209,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 18,
      "n_distinct_changes": 15,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 1,
              "of": 14,
              "pct": 7.1
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 8,
              "of": 155,
              "pct": 5.2
            },
            "amplification": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 5,
              "of": 43,
              "pct": 11.6
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 11.6,
        "max_node": "drv-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 8,
        "n_accepted": 8,
        "best_level": "B",
        "levels": {
          "B": 3,
          "C": 2,
          "D": 3
        },
        "evidence_types": {
          "PREDICTIVE": 8
        },
        "top_therapies": [
          "Selumetinib",
          "Trametinib",
          "Cabozantinib",
          "Refametinib",
          "Vemurafenib",
          "Sotrastaurin Acetate"
        ]
      },
      "selected_on": null
    },
    "GNA11": {
      "gene": "GNA11",
      "basis": "genomic",
      "biomarker_gene": "GNAQ",
      "why": "The same hotspot in the other alpha subunit; the two are counted together on the uveal card and neither is drugged.",
      "uniprot": {
        "gene": "GNA11",
        "accession": "P29992",
        "entry_name": "GNA11_HUMAN",
        "protein": "Guanine nucleotide-binding protein subunit alpha-11",
        "length": 359,
        "domains": [
          {
            "kind": "Domain",
            "name": "G-alpha",
            "start": 38,
            "end": 359
          },
          {
            "kind": "Region",
            "name": "G1 motif",
            "start": 41,
            "end": 54
          },
          {
            "kind": "Region",
            "name": "G2 motif",
            "start": 178,
            "end": 186
          },
          {
            "kind": "Region",
            "name": "G3 motif",
            "start": 201,
            "end": 210
          },
          {
            "kind": "Region",
            "name": "G4 motif",
            "start": 270,
            "end": 277
          },
          {
            "kind": "Region",
            "name": "G5 motif",
            "start": 329,
            "end": 334
          }
        ],
        "pdb_count": 13,
        "pdb_ids": [
          "6OIJ",
          "7RKF",
          "7TRY",
          "7XXH",
          "8QEG",
          "8QEH",
          "9P86",
          "9P87",
          "9P88",
          "9P89",
          "9P8A",
          "9UAP",
          "9UCP"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P29992",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P29992"
      },
      "structure": null,
      "hotspots": [
        {
          "change": "R183C",
          "pos": 183,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "H218Y",
          "pos": 218,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 12,
      "n_distinct_changes": 10,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 6,
              "of": 155,
              "pct": 3.9
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "mutation"
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
          "B": 2,
          "C": 1,
          "D": 2
        },
        "evidence_types": {
          "PREDICTIVE": 5
        },
        "top_therapies": [
          "Selumetinib",
          "Cabozantinib",
          "Trametinib",
          "Sotrastaurin Acetate",
          "Mirdametinib",
          "JQ1"
        ]
      },
      "selected_on": null
    },
    "SF3B1": {
      "gene": "SF3B1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A splicing-factor hotspot in uveal and mucosal melanoma, undrugged.",
      "uniprot": {
        "gene": "SF3B1",
        "accession": "O75533",
        "entry_name": "SF3B1_HUMAN",
        "protein": "Splicing factor 3B subunit 1",
        "length": 1304,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 100,
            "end": 119
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 124,
            "end": 148
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 173,
            "end": 360
          },
          {
            "kind": "Region",
            "name": "U2AF homology region; mediates interaction with RBM39",
            "start": 190,
            "end": 342
          },
          {
            "kind": "Region",
            "name": "Interaction with PPP1R8",
            "start": 223,
            "end": 491
          },
          {
            "kind": "Repeat",
            "name": "HEAT 1",
            "start": 529,
            "end": 568
          },
          {
            "kind": "Region",
            "name": "Interaction with SF3B14",
            "start": 529,
            "end": 568
          },
          {
            "kind": "Region",
            "name": "Interaction with PHF5A",
            "start": 547,
            "end": 550
          },
          {
            "kind": "Repeat",
            "name": "HEAT 2",
            "start": 569,
            "end": 603
          },
          {
            "kind": "Repeat",
            "name": "HEAT 3",
            "start": 604,
            "end": 641
          },
          {
            "kind": "Repeat",
            "name": "HEAT 4",
            "start": 643,
            "end": 677
          },
          {
            "kind": "Repeat",
            "name": "HEAT 5",
            "start": 680,
            "end": 718
          },
          {
            "kind": "Repeat",
            "name": "HEAT 6",
            "start": 763,
            "end": 801
          },
          {
            "kind": "Repeat",
            "name": "HEAT 7",
            "start": 843,
            "end": 881
          },
          {
            "kind": "Repeat",
            "name": "HEAT 8",
            "start": 1010,
            "end": 1048
          },
          {
            "kind": "Repeat",
            "name": "HEAT 9",
            "start": 1052,
            "end": 1090
          },
          {
            "kind": "Repeat",
            "name": "HEAT 10",
            "start": 1122,
            "end": 1160
          },
          {
            "kind": "Region",
            "name": "Interaction with PHF5A",
            "start": 1156,
            "end": 1157
          },
          {
            "kind": "Repeat",
            "name": "HEAT 11",
            "start": 1163,
            "end": 1201
          },
          {
            "kind": "Region",
            "name": "Interaction with SF3B3 and SF3B5",
            "start": 1248,
            "end": 1304
          }
        ],
        "pdb_count": 71,
        "pdb_ids": [
          "2F9D",
          "2F9J",
          "2FHO",
          "2PEH",
          "3LQV",
          "4OZ1",
          "5IFE",
          "5O9Z",
          "5Z56",
          "5Z57",
          "5Z58",
          "5ZYA",
          "6AH0",
          "6AHD",
          "6EN4",
          "6FF4",
          "6FF7",
          "6N3E",
          "6N3F",
          "6QX9",
          "6Y50",
          "6Y53",
          "6Y5Q",
          "7ABG",
          "7ABH",
          "7ABI",
          "7B0I",
          "7B91",
          "7B92",
          "7B9C",
          "7DVQ",
          "7EVN",
          "7EVO",
          "7OMF",
          "7ONB",
          "7OPI",
          "7Q3L",
          "7Q4O",
          "7Q4P",
          "7QTT"
        ],
        "url": "https://www.uniprot.org/uniprotkb/O75533",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/O75533"
      },
      "structure": {
        "pdb": "6EN4",
        "title": "SF3b core in complex with a splicing modulator",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.08,
        "ligands": [
          "ZN"
        ],
        "deposited": "2018-06-20",
        "url": "https://www.rcsb.org/structure/6EN4",
        "image": "img/6en4.jpg",
        "image_bytes": 73172
      },
      "hotspots": [],
      "n_mutated_samples": 40,
      "n_distinct_changes": 41,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 3,
              "of": 44,
              "pct": 6.8
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 1,
              "of": 14,
              "pct": 7.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 19,
              "of": 155,
              "pct": 12.3
            },
            "amplification": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 8,
              "of": 172,
              "pct": 4.7
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 2,
              "of": 25,
              "pct": 8.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 12.3,
        "max_node": "drv-nf1",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "BAP1": {
      "gene": "BAP1",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Lost in much uveal melanoma and read as a prognostic marker, not a target.",
      "uniprot": {
        "gene": "BAP1",
        "accession": "Q96QZ7",
        "entry_name": "MAGI1_HUMAN",
        "protein": "Membrane-associated guanylate kinase, WW and PDZ domain-containing protein 1",
        "length": 1491,
        "domains": [
          {
            "kind": "Domain",
            "name": "PDZ 1",
            "start": 17,
            "end": 105
          },
          {
            "kind": "Domain",
            "name": "Guanylate kinase-like",
            "start": 96,
            "end": 287
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 236,
            "end": 267
          },
          {
            "kind": "Domain",
            "name": "WW 1",
            "start": 300,
            "end": 333
          },
          {
            "kind": "Domain",
            "name": "WW 2",
            "start": 359,
            "end": 392
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 411,
            "end": 462
          },
          {
            "kind": "Domain",
            "name": "PDZ 2",
            "start": 472,
            "end": 554
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 586,
            "end": 623
          },
          {
            "kind": "Domain",
            "name": "PDZ 3",
            "start": 643,
            "end": 721
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 720,
            "end": 832
          },
          {
            "kind": "Domain",
            "name": "PDZ 4",
            "start": 813,
            "end": 895
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 932,
            "end": 987
          },
          {
            "kind": "Domain",
            "name": "PDZ 5",
            "start": 970,
            "end": 1066
          },
          {
            "kind": "Region",
            "name": "Interaction with FCHSD2",
            "start": 970,
            "end": 1066
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1112,
            "end": 1143
          },
          {
            "kind": "Domain",
            "name": "PDZ 6",
            "start": 1124,
            "end": 1206
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1234,
            "end": 1491
          }
        ],
        "pdb_count": 16,
        "pdb_ids": [
          "1WBP",
          "2KPK",
          "2KPL",
          "2Q9V",
          "2R4H",
          "2YSD",
          "2YSE",
          "2ZAJ",
          "3BPU",
          "5N7D",
          "5N7F",
          "5N7G",
          "6TWU",
          "6TWX",
          "6TWY",
          "7P71"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q96QZ7",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q96QZ7"
      },
      "structure": {
        "pdb": "8SVF",
        "title": "BAP1/ASXL1 bound to the H2AK119Ub Nucleosome",
        "method": "ELECTRON MICROSCOPY",
        "resolution": 3.2,
        "ligands": [],
        "deposited": "2023-08-30",
        "url": "https://www.rcsb.org/structure/8SVF",
        "image": "img/8svf.jpg",
        "image_bytes": 99356
      },
      "hotspots": [
        {
          "change": "H169Y",
          "pos": 169,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 23,
      "n_distinct_changes": 23,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 7,
              "of": 155,
              "pct": 4.5
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 6,
              "of": 172,
              "pct": 3.5
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 28,
              "pct": 7.1
            },
            "any_loss": {
              "n": 2,
              "of": 28,
              "pct": 7.1
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.1,
        "max_node": "drv-unknown",
        "max_metric": "deep_deletion"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 2,
        "n_accepted": 2,
        "best_level": "B",
        "levels": {
          "B": 1,
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "Valproic Acid",
          "Panobinostat",
          "Vorinostat",
          "Trichostatin A"
        ]
      },
      "selected_on": null
    },
    "EIF1AX": {
      "gene": "EIF1AX",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "The third uveal driver, and the one with the least aimed at it.",
      "uniprot": {
        "gene": "EIF1AX",
        "accession": "P47813",
        "entry_name": "IF1AX_HUMAN",
        "protein": "Eukaryotic translation initiation factor 1A, X-chromosomal",
        "length": 144,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 26
          },
          {
            "kind": "Domain",
            "name": "S1-like",
            "start": 22,
            "end": 96
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 114,
            "end": 144
          }
        ],
        "pdb_count": 28,
        "pdb_ids": [
          "1D7Q",
          "3ZJY",
          "4KZY",
          "4KZZ",
          "6YBW",
          "6ZMW",
          "6ZP4",
          "7A09",
          "7QP6",
          "7QP7",
          "7SYQ",
          "7SYR",
          "7SYS",
          "7SYV",
          "7SYW",
          "7SYX",
          "7TQL",
          "8OZ0",
          "8PJ1",
          "8PJ2",
          "8PJ3",
          "8PJ4",
          "8PJ5",
          "8PJ6",
          "8PPL",
          "9H74",
          "9KN5",
          "9KN6"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P47813",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P47813"
      },
      "structure": {
        "pdb": "1D7Q",
        "title": "HUMAN TRANSLATION INITIATION FACTOR EIF1A",
        "method": "SOLUTION NMR",
        "resolution": null,
        "ligands": [],
        "deposited": "2000-03-17",
        "url": "https://www.rcsb.org/structure/1D7Q",
        "image": "img/1d7q.jpg",
        "image_bytes": 30173
      },
      "hotspots": [
        {
          "change": "G8R",
          "pos": 8,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G43E",
          "pos": 43,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 15,
      "n_distinct_changes": 13,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 1,
              "of": 14,
              "pct": 7.1
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 4,
              "of": 155,
              "pct": 2.6
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.0,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "C",
        "levels": {
          "C": 1
        },
        "evidence_types": {
          "PROGNOSTIC": 1
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "CYSLTR2": {
      "gene": "CYSLTR2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "A receptor that switches on the same pathway as GNAQ in a minority of uveal melanomas; on neither MSK panel here, so it carries no frequency.",
      "uniprot": {
        "gene": "CYSLTR2",
        "accession": "Q9NS75",
        "entry_name": "CLTR2_HUMAN",
        "protein": "Cysteinyl leukotriene receptor 2",
        "length": 346,
        "domains": [],
        "pdb_count": 9,
        "pdb_ids": [
          "6RZ6",
          "6RZ7",
          "6RZ8",
          "6RZ9",
          "9IXX",
          "9JH5",
          "9JH6",
          "9UAM",
          "9UAN"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q9NS75",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q9NS75"
      },
      "structure": {
        "pdb": "6RZ9",
        "title": "Crystal structure of the human cysteinyl leukotriene receptor 2 in complex with ONO-2770372",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.73,
        "ligands": [],
        "deposited": "2019-12-11",
        "url": "https://www.rcsb.org/structure/6RZ9",
        "image": "img/6rz9.jpg",
        "image_bytes": 55656
      },
      "hotspots": [],
      "n_mutated_samples": 11,
      "n_distinct_changes": 11,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 107,
              "pct": 0.9
            },
            "amplification": {
              "n": 0,
              "of": 107,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 107,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 107,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 107,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 29,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 29,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 29,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 29,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 29,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 1,
              "of": 11,
              "pct": 9.1
            },
            "amplification": {
              "n": 0,
              "of": 11,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 11,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 11,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 11,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 4,
              "of": 97,
              "pct": 4.1
            },
            "amplification": {
              "n": 0,
              "of": 97,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 97,
              "pct": 1.0
            },
            "any_loss": {
              "n": 1,
              "of": 97,
              "pct": 1.0
            },
            "fusion": {
              "n": 0,
              "of": 97,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 4,
              "of": 110,
              "pct": 3.6
            },
            "amplification": {
              "n": 0,
              "of": 110,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 110,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 110,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 110,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 16,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 16,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 16,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 16,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 16,
              "pct": 0.0
            }
          }
        },
        "max_pct": 4.1,
        "max_node": "drv-nf1",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "CDKN2A": {
      "gene": "CDKN2A",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Deleted across every pathway. Its loss is studied as a reason BRAF inhibitors stop working rather than as a target.",
      "uniprot": {
        "gene": "CDKN2A",
        "accession": "P42771",
        "entry_name": "CDN2A_HUMAN",
        "protein": "Cyclin-dependent kinase inhibitor 2A",
        "length": 156,
        "domains": [
          {
            "kind": "Repeat",
            "name": "ANK 1",
            "start": 11,
            "end": 40
          },
          {
            "kind": "Repeat",
            "name": "ANK 2",
            "start": 44,
            "end": 72
          },
          {
            "kind": "Repeat",
            "name": "ANK 3",
            "start": 77,
            "end": 106
          },
          {
            "kind": "Repeat",
            "name": "ANK 4",
            "start": 110,
            "end": 139
          }
        ],
        "pdb_count": 5,
        "pdb_ids": [
          "1A5E",
          "1BI7",
          "1DC2",
          "2A5E",
          "7OZT"
        ],
        "url": "https://www.uniprot.org/uniprotkb/P42771",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/P42771"
      },
      "structure": {
        "pdb": "1BI7",
        "title": "MECHANISM OF G1 CYCLIN DEPENDENT KINASE INHIBITION FROM THE STRUCTURE OF THE CDK6-P16INK4A TUMOR SUPPRESSOR COMPLEX",
        "method": "X-RAY DIFFRACTION",
        "resolution": 3.4,
        "ligands": [],
        "deposited": "1999-01-13",
        "url": "https://www.rcsb.org/structure/1BI7",
        "image": "img/1bi7.jpg",
        "image_bytes": 75783
      },
      "hotspots": [
        {
          "change": "R80*",
          "pos": 79,
          "type": "Nonsense_Mutation",
          "n": 25,
          "of": 696,
          "pct": 3.6
        },
        {
          "change": "R58*",
          "pos": 58,
          "type": "Nonsense_Mutation",
          "n": 12,
          "of": 696,
          "pct": 1.7
        },
        {
          "change": "P48L",
          "pos": 48,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 696,
          "pct": 1.1
        },
        {
          "change": "X51_splice",
          "pos": 51,
          "type": "Splice_Site",
          "n": 8,
          "of": 696,
          "pct": 1.1
        },
        {
          "change": "P114L",
          "pos": 114,
          "type": "Missense_Mutation",
          "n": 8,
          "of": 696,
          "pct": 1.1
        },
        {
          "change": "P81L",
          "pos": 81,
          "type": "Missense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "E88*",
          "pos": 88,
          "type": "Nonsense_Mutation",
          "n": 6,
          "of": 696,
          "pct": 0.9
        },
        {
          "change": "W110*",
          "pos": 110,
          "type": "Nonsense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "L32_L37del",
          "pos": 32,
          "type": "In_Frame_Del",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "H83Y",
          "pos": 83,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "Q50*",
          "pos": 50,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "E88K",
          "pos": 88,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G89S",
          "pos": 88,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "D153N",
          "pos": 153,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X153_splice",
          "pos": 153,
          "type": "Splice_Region",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 140,
      "n_distinct_changes": 74,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 5,
              "of": 43,
              "pct": 11.6
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 7,
              "of": 43,
              "pct": 16.3
            },
            "any_loss": {
              "n": 7,
              "of": 43,
              "pct": 16.3
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 28,
              "of": 172,
              "pct": 16.3
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 47,
              "of": 172,
              "pct": 27.3
            },
            "any_loss": {
              "n": 47,
              "of": 172,
              "pct": 27.3
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 6,
              "of": 44,
              "pct": 13.6
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 13,
              "of": 44,
              "pct": 29.5
            },
            "any_loss": {
              "n": 13,
              "of": 44,
              "pct": 29.5
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 3,
              "of": 14,
              "pct": 21.4
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "any_loss": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 49,
              "of": 155,
              "pct": 31.6
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 31,
              "of": 155,
              "pct": 20.0
            },
            "any_loss": {
              "n": 31,
              "of": 155,
              "pct": 20.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 30,
              "of": 172,
              "pct": 17.4
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 54,
              "of": 172,
              "pct": 31.4
            },
            "any_loss": {
              "n": 54,
              "of": 172,
              "pct": 31.4
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 4,
              "of": 25,
              "pct": 16.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 9,
              "of": 25,
              "pct": 36.0
            },
            "any_loss": {
              "n": 9,
              "of": 25,
              "pct": 36.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 9,
              "of": 43,
              "pct": 20.9
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 8,
              "of": 43,
              "pct": 18.6
            },
            "any_loss": {
              "n": 8,
              "of": 43,
              "pct": 18.6
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 6,
              "of": 28,
              "pct": 21.4
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 9,
              "of": 28,
              "pct": 32.1
            },
            "any_loss": {
              "n": 9,
              "of": 28,
              "pct": 32.1
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 36.0,
        "max_node": "drv-ras-other",
        "max_metric": "deep_deletion"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 6,
        "n_accepted": 3,
        "best_level": "C",
        "best_level_submitted": "B",
        "levels": {
          "B": 1,
          "C": 1,
          "D": 4
        },
        "evidence_types": {
          "PREDICTIVE": 5,
          "PREDISPOSING": 1
        },
        "top_therapies": [
          "Palbociclib",
          "Vemurafenib",
          "Dabrafenib",
          "Alvocidib"
        ]
      },
      "selected_on": null
    },
    "CDK4": {
      "gene": "CDK4",
      "basis": "pathway",
      "biomarker_gene": "CCND1",
      "why": "Amplified in acral melanoma. No CDK4/6 inhibitor carries a melanoma indication, so the dependency is shown, not drugged.",
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
      "hotspots": [
        {
          "change": "R24C",
          "pos": 24,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "R24H",
          "pos": 24,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 16,
      "n_distinct_changes": 13,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 6,
              "of": 172,
              "pct": 3.5
            },
            "amplification": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "amplification": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 1,
              "of": 14,
              "pct": 7.1
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 2,
              "of": 155,
              "pct": 1.3
            },
            "amplification": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 3,
              "of": 172,
              "pct": 1.7
            },
            "deep_deletion": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "any_loss": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 2,
              "of": 28,
              "pct": 7.1
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.1,
        "max_node": "drv-unknown",
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
          "Palbociclib"
        ]
      },
      "selected_on": null
    },
    "CCND1": {
      "gene": "CCND1",
      "basis": "pathway",
      "biomarker_gene": null,
      "why": "Amplified with CDK4 in acral melanoma, and addressed only through CDK4/6.",
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
      "hotspots": [
        {
          "change": "P287L",
          "pos": 287,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 6,
      "n_distinct_changes": 5,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "amplification": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 3,
              "of": 14,
              "pct": 21.4
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 4,
              "of": 155,
              "pct": 2.6
            },
            "amplification": {
              "n": 6,
              "of": 155,
              "pct": 3.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 10,
              "of": 172,
              "pct": 5.8
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 5,
              "of": 25,
              "pct": 20.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 20.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 1,
        "n_accepted": 1,
        "best_level": "B",
        "levels": {
          "B": 1
        },
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Carboplatin",
          "Paclitaxel",
          "Sorafenib"
        ]
      },
      "selected_on": null
    },
    "TERT": {
      "gene": "TERT",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "The commonest change in skin melanoma and almost always in the promoter, outside the protein. There is nothing to block.",
      "uniprot": {
        "gene": "TERT",
        "accession": "O14746",
        "entry_name": "TERT_HUMAN",
        "protein": "Telomerase reverse transcriptase",
        "length": 1132,
        "domains": [
          {
            "kind": "Region",
            "name": "RNA-interacting domain 1",
            "start": 1,
            "end": 230
          },
          {
            "kind": "Region",
            "name": "GQ motif",
            "start": 58,
            "end": 197
          },
          {
            "kind": "Region",
            "name": "Required for regulating specificity for telomeric DNA and for processivity for primer elongation",
            "start": 137,
            "end": 141
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 210,
            "end": 320
          },
          {
            "kind": "Region",
            "name": "Linker",
            "start": 231,
            "end": 324
          },
          {
            "kind": "Region",
            "name": "Required for oligomerization",
            "start": 301,
            "end": 538
          },
          {
            "kind": "Region",
            "name": "RNA-interacting domain 2",
            "start": 325,
            "end": 550
          },
          {
            "kind": "Region",
            "name": "QFP motif",
            "start": 376,
            "end": 521
          },
          {
            "kind": "Region",
            "name": "CP motif",
            "start": 397,
            "end": 417
          },
          {
            "kind": "Domain",
            "name": "Reverse transcriptase",
            "start": 605,
            "end": 935
          },
          {
            "kind": "Region",
            "name": "Required for oligomerization",
            "start": 914,
            "end": 928
          },
          {
            "kind": "Region",
            "name": "Primer grip sequence",
            "start": 930,
            "end": 934
          },
          {
            "kind": "Region",
            "name": "CTE",
            "start": 936,
            "end": 1132
          }
        ],
        "pdb_count": 23,
        "pdb_ids": [
          "2BCK",
          "4B18",
          "4MNQ",
          "5MEN",
          "5MEO",
          "5MEP",
          "5MEQ",
          "5MER",
          "5UGW",
          "7BG9",
          "7QXA",
          "7QXB",
          "7QXS",
          "7TRD",
          "7TRE",
          "7TRF",
          "7V99",
          "9QAX",
          "9QAY",
          "9QAZ",
          "9SHY",
          "9SHZ",
          "9SI0"
        ],
        "url": "https://www.uniprot.org/uniprotkb/O14746",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/O14746"
      },
      "structure": {
        "pdb": "5UGW",
        "title": "STRUCTURE OF THE HUMAN TELOMERASE THUMB DOMAIN",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.31,
        "ligands": [],
        "deposited": "2017-02-08",
        "url": "https://www.rcsb.org/structure/5UGW",
        "image": "img/5ugw.jpg",
        "image_bytes": 48016
      },
      "hotspots": [
        {
          "change": "Promoter",
          "pos": -1,
          "type": "5'Flank",
          "n": 572,
          "of": 696,
          "pct": 82.2
        },
        {
          "change": "E280K",
          "pos": 280,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P376S",
          "pos": 376,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "E440K",
          "pos": 440,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P524S",
          "pos": 524,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 575,
      "n_distinct_changes": 74,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 35,
              "of": 43,
              "pct": 81.4
            },
            "amplification": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 131,
              "of": 172,
              "pct": 76.2
            },
            "amplification": {
              "n": 7,
              "of": 172,
              "pct": 4.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 36,
              "of": 44,
              "pct": 81.8
            },
            "amplification": {
              "n": 2,
              "of": 44,
              "pct": 4.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 12,
              "of": 14,
              "pct": 85.7
            },
            "amplification": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 139,
              "of": 155,
              "pct": 89.7
            },
            "amplification": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "deep_deletion": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "any_loss": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 156,
              "of": 172,
              "pct": 90.7
            },
            "amplification": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 22,
              "of": 25,
              "pct": 88.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 29,
              "of": 43,
              "pct": 67.4
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 15,
              "of": 28,
              "pct": 53.6
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 90.7,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 2,
        "n_accepted": 2,
        "best_level": "B",
        "levels": {
          "B": 2
        },
        "evidence_types": {
          "PROGNOSTIC": 2
        },
        "top_therapies": []
      },
      "selected_on": null
    },
    "PTEN": {
      "gene": "PTEN",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Loss activates PI3K/AKT. No agent here is aimed at it.",
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
          "change": "P38S",
          "pos": 38,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X85_splice",
          "pos": 85,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G132S",
          "pos": 132,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G165*",
          "pos": 165,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P244S",
          "pos": 244,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X268_splice",
          "pos": 268,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "R335*",
          "pos": 334,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X343_splice",
          "pos": 343,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 82,
      "n_distinct_changes": 77,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 10,
              "of": 43,
              "pct": 23.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "any_loss": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 24,
              "of": 172,
              "pct": 14.0
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 13,
              "of": 172,
              "pct": 7.6
            },
            "any_loss": {
              "n": 13,
              "of": 172,
              "pct": 7.6
            },
            "fusion": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 10,
              "of": 44,
              "pct": 22.7
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 13,
              "of": 155,
              "pct": 8.4
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "any_loss": {
              "n": 3,
              "of": 155,
              "pct": 1.9
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 14,
              "of": 172,
              "pct": 8.1
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "any_loss": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 2,
              "of": 25,
              "pct": 8.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "any_loss": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 5,
              "of": 28,
              "pct": 17.9
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 3,
              "of": 28,
              "pct": 10.7
            },
            "any_loss": {
              "n": 3,
              "of": 28,
              "pct": 10.7
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 23.3,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 4,
        "n_accepted": 3,
        "best_level": "D",
        "levels": {
          "D": 4
        },
        "evidence_types": {
          "PREDICTIVE": 4
        },
        "top_therapies": [
          "Uprosertib",
          "Vemurafenib",
          "Akt Inhibitor MK2206",
          "MEK Inhibitor CI-1040",
          "Dabrafenib"
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
          "change": "R213*",
          "pos": 213,
          "type": "Nonsense_Mutation",
          "n": 11,
          "of": 696,
          "pct": 1.6
        },
        {
          "change": "S241F",
          "pos": 241,
          "type": "Missense_Mutation",
          "n": 9,
          "of": 696,
          "pct": 1.3
        },
        {
          "change": "R248W",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 9,
          "of": 696,
          "pct": 1.3
        },
        {
          "change": "R342*",
          "pos": 342,
          "type": "Nonsense_Mutation",
          "n": 9,
          "of": 696,
          "pct": 1.3
        },
        {
          "change": "Q317*",
          "pos": 317,
          "type": "Nonsense_Mutation",
          "n": 7,
          "of": 696,
          "pct": 1.0
        },
        {
          "change": "S127F",
          "pos": 127,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 696,
          "pct": 0.7
        },
        {
          "change": "H179Y",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 5,
          "of": 696,
          "pct": 0.7
        },
        {
          "change": "P27S",
          "pos": 27,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "G266R",
          "pos": 266,
          "type": "Missense_Mutation",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "X307_splice",
          "pos": 307,
          "type": "Splice_Site",
          "n": 4,
          "of": 696,
          "pct": 0.6
        },
        {
          "change": "P151S",
          "pos": 151,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "R196*",
          "pos": 196,
          "type": "Nonsense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "E285K",
          "pos": 285,
          "type": "Missense_Mutation",
          "n": 3,
          "of": 696,
          "pct": 0.4
        },
        {
          "change": "A86Vfs*55",
          "pos": 86,
          "type": "Frame_Shift_Del",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P89L",
          "pos": 89,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P98S",
          "pos": 98,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q100*",
          "pos": 100,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X125_splice",
          "pos": 125,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X126_splice",
          "pos": 126,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "R158C",
          "pos": 158,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "A159V",
          "pos": 159,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P177S",
          "pos": 177,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "H179L",
          "pos": 179,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q192*",
          "pos": 192,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X225_splice",
          "pos": 225,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G245S",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G245D",
          "pos": 245,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "R248Q",
          "pos": 248,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "G266K",
          "pos": 266,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "P278L",
          "pos": 278,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "R280K",
          "pos": 280,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "X331_splice",
          "pos": 331,
          "type": "Splice_Site",
          "n": 2,
          "of": 696,
          "pct": 0.3
        },
        {
          "change": "Q331*",
          "pos": 331,
          "type": "Nonsense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 183,
      "n_distinct_changes": 131,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 7,
              "of": 43,
              "pct": 16.3
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "any_loss": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 30,
              "of": 172,
              "pct": 17.4
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 7,
              "of": 44,
              "pct": 15.9
            },
            "amplification": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 7,
              "of": 14,
              "pct": 50.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 74,
              "of": 155,
              "pct": 47.7
            },
            "amplification": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 34,
              "of": 172,
              "pct": 19.8
            },
            "amplification": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "any_loss": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "fusion": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 7,
              "of": 25,
              "pct": 28.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 12,
              "of": 43,
              "pct": 27.9
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 5,
              "of": 28,
              "pct": 17.9
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "any_loss": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 47.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": null,
      "selected_on": null
    },
    "MITF": {
      "gene": "MITF",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "The melanocyte lineage's master transcription factor, amplified in a minority and with no pocket to bind.",
      "uniprot": {
        "gene": "MITF",
        "accession": "O75030",
        "entry_name": "MITF_HUMAN",
        "protein": "Microphthalmia-associated transcription factor",
        "length": 526,
        "domains": [
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 1,
            "end": 54
          },
          {
            "kind": "Region",
            "name": "Transactivation",
            "start": 224,
            "end": 295
          },
          {
            "kind": "Domain",
            "name": "bHLH",
            "start": 311,
            "end": 364
          },
          {
            "kind": "Region",
            "name": "Leucine-zipper",
            "start": 374,
            "end": 395
          },
          {
            "kind": "Region",
            "name": "DNA-binding regulation",
            "start": 401,
            "end": 431
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 496,
            "end": 526
          }
        ],
        "pdb_count": 12,
        "pdb_ids": [
          "4C7N",
          "7D8R",
          "7D8S",
          "7D8T",
          "7EOD",
          "8E1D",
          "9H5F",
          "9H5H",
          "9H7Q",
          "9H7R",
          "9H7S",
          "9H7T"
        ],
        "url": "https://www.uniprot.org/uniprotkb/O75030",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/O75030"
      },
      "structure": {
        "pdb": "4ATI",
        "title": "MITF:M-box complex",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.6,
        "ligands": [],
        "deposited": "2012-12-12",
        "url": "https://www.rcsb.org/structure/4ATI",
        "image": "img/4ati.jpg",
        "image_bytes": 46625
      },
      "hotspots": [
        {
          "change": "Q141R",
          "pos": 141,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 15,
      "n_distinct_changes": 14,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 5,
              "of": 172,
              "pct": 2.9
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 44,
              "pct": 4.5
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 2,
              "of": 14,
              "pct": 14.3
            },
            "amplification": {
              "n": 1,
              "of": 14,
              "pct": 7.1
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 5,
              "of": 155,
              "pct": 3.2
            },
            "amplification": {
              "n": 5,
              "of": 155,
              "pct": 3.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "amplification": {
              "n": 4,
              "of": 172,
              "pct": 2.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "amplification": {
              "n": 2,
              "of": 25,
              "pct": 8.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 1,
              "of": 43,
              "pct": 2.3
            },
            "amplification": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "amplification": {
              "n": 1,
              "of": 28,
              "pct": 3.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 8.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification"
      },
      "drugs": [],
      "n_programs": 0,
      "best_phase": null,
      "best_phase_rank": null,
      "civic": {
        "n_evidence_items": 2,
        "n_accepted": 0,
        "best_level": null,
        "best_level_submitted": "C",
        "levels": {
          "C": 1,
          "D": 1
        },
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "PLX4720",
          "Selumetinib"
        ]
      },
      "selected_on": null
    },
    "MDM2": {
      "gene": "MDM2",
      "basis": "genomic",
      "biomarker_gene": null,
      "why": "Amplified in acral melanoma, where it holds p53 down.",
      "uniprot": {
        "gene": "MDM2",
        "accession": "Q00987",
        "entry_name": "MDM2_HUMAN",
        "protein": "E3 ubiquitin-protein ligase Mdm2",
        "length": 491,
        "domains": [
          {
            "kind": "Region",
            "name": "Necessary for interaction with USP2",
            "start": 1,
            "end": 110
          },
          {
            "kind": "Region",
            "name": "Sufficient to promote the mitochondrial pathway of apoptosis",
            "start": 1,
            "end": 101
          },
          {
            "kind": "Domain",
            "name": "SWIB/MDM2",
            "start": 26,
            "end": 109
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 141,
            "end": 187
          },
          {
            "kind": "Region",
            "name": "Interaction with PYHIN1 and necessary for interaction with RFFL and RNF34",
            "start": 150,
            "end": 230
          },
          {
            "kind": "Region",
            "name": "Interaction with MTBP",
            "start": 170,
            "end": 306
          },
          {
            "kind": "Region",
            "name": "Mediates interaction with RAD54B",
            "start": 200,
            "end": 290
          },
          {
            "kind": "Region",
            "name": "ARF-binding",
            "start": 210,
            "end": 304
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 211,
            "end": 237
          },
          {
            "kind": "Region",
            "name": "Interaction with USP7",
            "start": 223,
            "end": 232
          },
          {
            "kind": "Region",
            "name": "Region II",
            "start": 242,
            "end": 331
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 253,
            "end": 274
          },
          {
            "kind": "Region",
            "name": "Necessary for interaction with USP2",
            "start": 276,
            "end": 491
          },
          {
            "kind": "Zinc finger",
            "name": "RanBP2-type",
            "start": 299,
            "end": 328
          },
          {
            "kind": "Region",
            "name": "Disordered",
            "start": 371,
            "end": 427
          },
          {
            "kind": "Zinc finger",
            "name": "RING-type",
            "start": 438,
            "end": 479
          }
        ],
        "pdb_count": 147,
        "pdb_ids": [
          "1RV1",
          "1T4E",
          "1T4F",
          "1YCR",
          "1Z1M",
          "2AXI",
          "2C6A",
          "2C6B",
          "2F1Y",
          "2FOP",
          "2GV2",
          "2HDP",
          "2LZG",
          "2M86",
          "2MPS",
          "2RUH",
          "2VJE",
          "2VJF",
          "3EQS",
          "3G03",
          "3IUX",
          "3IWY",
          "3JZK",
          "3JZR",
          "3JZS",
          "3LBK",
          "3LBL",
          "3LNJ",
          "3LNZ",
          "3MQS",
          "3TJ2",
          "3TPX",
          "3TU1",
          "3V3B",
          "3VBG",
          "3VZV",
          "3W69",
          "4DIJ",
          "4ERE",
          "4ERF"
        ],
        "url": "https://www.uniprot.org/uniprotkb/Q00987",
        "alphafold": "https://alphafold.ebi.ac.uk/entry/Q00987"
      },
      "structure": {
        "pdb": "1YCR",
        "title": "MDM2 BOUND TO THE TRANSACTIVATION DOMAIN OF P53",
        "method": "X-RAY DIFFRACTION",
        "resolution": 2.6,
        "ligands": [],
        "deposited": "1997-11-19",
        "url": "https://www.rcsb.org/structure/1YCR",
        "image": "img/1ycr.jpg",
        "image_bytes": 39630
      },
      "hotspots": [
        {
          "change": "S304F",
          "pos": 304,
          "type": "Missense_Mutation",
          "n": 2,
          "of": 696,
          "pct": 0.3
        }
      ],
      "n_mutated_samples": 16,
      "n_distinct_changes": 15,
      "sequenced_of": 696,
      "frequency": {
        "by_node": {
          "drv-braf-v600-other": {
            "mutation": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-braf-v600e": {
            "mutation": {
              "n": 1,
              "of": 172,
              "pct": 0.6
            },
            "amplification": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-braf-class23": {
            "mutation": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "amplification": {
              "n": 1,
              "of": 44,
              "pct": 2.3
            },
            "deep_deletion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 44,
              "pct": 0.0
            }
          },
          "drv-kit": {
            "mutation": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 14,
              "pct": 0.0
            }
          },
          "drv-nf1": {
            "mutation": {
              "n": 8,
              "of": 155,
              "pct": 5.2
            },
            "amplification": {
              "n": 1,
              "of": 155,
              "pct": 0.6
            },
            "deep_deletion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 155,
              "pct": 0.0
            }
          },
          "drv-nras-q61": {
            "mutation": {
              "n": 4,
              "of": 172,
              "pct": 2.3
            },
            "amplification": {
              "n": 2,
              "of": 172,
              "pct": 1.2
            },
            "deep_deletion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 172,
              "pct": 0.0
            }
          },
          "drv-ras-other": {
            "mutation": {
              "n": 1,
              "of": 25,
              "pct": 4.0
            },
            "amplification": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 25,
              "pct": 0.0
            }
          },
          "drv-other": {
            "mutation": {
              "n": 2,
              "of": 43,
              "pct": 4.7
            },
            "amplification": {
              "n": 3,
              "of": 43,
              "pct": 7.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 43,
              "pct": 0.0
            }
          },
          "drv-unknown": {
            "mutation": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "amplification": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "deep_deletion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "any_loss": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            },
            "fusion": {
              "n": 0,
              "of": 28,
              "pct": 0.0
            }
          }
        },
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "amplification"
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
      "name": "Vemurafenib (Zelboraf)",
      "code": "RO5185426",
      "target": "BRAF",
      "genes": [
        "BRAF"
      ],
      "modality": "small molecule",
      "company": "Genentech, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "BRIM-3",
      "nct_id": "NCT01006980",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Vemurafenib compared with dacarbazine in previously untreated BRAF V600E melanoma",
      "readout_date": "",
      "subtype_label": "BRAF V600E",
      "nodes": [
        "drv-braf-v600e"
      ],
      "receptor_context": "BRAF V600E by an FDA-approved test; unresectable or metastatic",
      "source_url": "https://clinicaltrials.gov/study/NCT01006980",
      "registry": {
        "title": "A Study of Vemurafenib (RO5185426) in Comparison With Dacarbazine in Previously Untreated Patients With Metastatic Melanoma (BRIM 3)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 675,
        "start_date": "2010-01",
        "primary_completion_date": "2010-12",
        "last_update_posted": "2016-09-28",
        "url": "https://clinicaltrials.gov/study/NCT01006980"
      },
      "label": {
        "matched_brand": "ZELBORAF",
        "matched_generic": "VEMURAFENIB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260828",
        "spl_id": "fa75c9ca-ecdf-4906-9cd3-0552e59b91ca",
        "boxed": null,
        "warnings": [
          "New Primary Cutaneous Malignancies",
          "New Non-Cutaneous Squamous Cell Carcinoma",
          "Other Malignancies",
          "Tumor Promotion in BRAF Wild-Type Melanoma",
          "Systemic Symptoms (DRESS Syndrome)",
          "Syndrome and Toxic Epidermal Necrolysis",
          "QT Prolongation",
          "Hepatotoxicity",
          "Photosensitivity",
          "Serious Ophthalmologic Reactions",
          "Embryo-Fetal Toxicity",
          "Radiation Sensitization and Radiation Recall"
        ],
        "common": {
          "text": "arthralgia, rash, alopecia, fatigue, photosensitivity reaction, nausea, pruritus, and skin papilloma",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/38eea320-7e0c-485a-bc30-98c3c45e2763/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Zelboraf\""
      }
    },
    {
      "id": "drug-1",
      "name": "Cobimetinib + vemurafenib (Cotellic + Zelboraf)",
      "code": "",
      "target": "BRAF + MEK",
      "genes": [
        "BRAF",
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "small molecule",
      "company": "Genentech, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "coBRIM",
      "nct_id": "NCT01689519",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Vemurafenib with cobimetinib compared with vemurafenib alone",
      "readout_date": "",
      "subtype_label": "BRAF V600E or V600K",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "BRAF V600E or V600K by an FDA-approved test; with vemurafenib",
      "source_url": "https://clinicaltrials.gov/study/NCT01689519",
      "registry": {
        "title": "A Study Comparing Vemurafenib Versus Vemurafenib Plus Cobimetinib in Participants With Metastatic Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 495,
        "start_date": "2013-01-08",
        "primary_completion_date": "2014-05-09",
        "last_update_posted": "2022-05-02",
        "url": "https://clinicaltrials.gov/study/NCT01689519"
      },
      "label": {
        "matched_brand": "Cotellic",
        "matched_generic": "COBIMETINIB",
        "manufacturer": "Genentech, Inc.",
        "effective_time": "20260729",
        "spl_id": "59075332-49ef-4998-98c4-81e61f57d424",
        "boxed": null,
        "warnings": [
          "Hemorrhage",
          "Cardiomyopathy",
          "Severe Dermatologic Reactions",
          "Serous Retinopathy and Retinal Vein Occlusion",
          "Hepatotoxicity",
          "Rhabdomyolysis",
          "Severe Photosensitivity",
          "Embryo-Fetal Toxicity",
          "Cutaneous Malignancies",
          "Non-Cutaneous Malignancies",
          "COTELLIC with vemurafenib"
        ],
        "common": {
          "text": "diarrhea, photosensitivity reaction, nausea, pyrexia, and vomiting",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/c387579e-cee0-4334-bd1e-73f93ac1bde6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Cobimetinib\""
      }
    },
    {
      "id": "drug-2",
      "name": "Dabrafenib (Tafinlar)",
      "code": "GSK2118436",
      "target": "BRAF",
      "genes": [
        "BRAF"
      ],
      "modality": "small molecule",
      "company": "Novartis Pharmaceuticals Corporation",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "BREAK-3",
      "nct_id": "NCT01227889",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Dabrafenib compared with dacarbazine in previously untreated BRAF V600E melanoma",
      "readout_date": "",
      "subtype_label": "BRAF V600E",
      "nodes": [
        "drv-braf-v600e"
      ],
      "receptor_context": "BRAF V600E by an FDA-approved test; single agent",
      "source_url": "https://clinicaltrials.gov/study/NCT01227889",
      "registry": {
        "title": "A Study Comparing GSK2118436 to Dacarbazine (DTIC) in Previously Untreated Subjects With BRAF Mutation Positive Advanced (Stage III) or Metastatic (Stage IV) Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "GlaxoSmithKline",
        "enrollment": 251,
        "start_date": "2010-12-23",
        "primary_completion_date": "2011-12-19",
        "last_update_posted": "2017-10-04",
        "url": "https://clinicaltrials.gov/study/NCT01227889"
      },
      "label": {
        "matched_brand": "Tafinlar",
        "matched_generic": "DABRAFENIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260520",
        "spl_id": "6c546993-1f7f-409b-b108-60f22e9b948a",
        "boxed": null,
        "warnings": [
          "Malignancies, Cutaneous and Non-Cutaneous",
          "Tumor Promotion in BRAF Wild-type Tumors",
          "Hemorrhage",
          "Cardiomyopathy",
          "Uveitis",
          "Serious Febrile Reactions",
          "Serious Skin Toxicities",
          "Hyperglycemia",
          "Dehydrogenase Deficiency (G6PD)",
          "Hemophagocytic Lymphohistiocytosis (HLH)",
          "Embryo-Fetal Toxicity",
          "Malignancies TAFINLAR Monotherapy (Adult)"
        ],
        "common": {
          "text": "hyperkeratosis, headache, pyrexia, arthralgia, papilloma, alopecia, and palmar-plantar erythrodysesthesia syndrome",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Tafinlar\""
      }
    },
    {
      "id": "drug-3",
      "name": "Trametinib (Mekinist)",
      "code": "GSK1120212",
      "target": "MEK",
      "genes": [
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "small molecule",
      "company": "Novartis Pharmaceuticals Corporation",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "METRIC",
      "nct_id": "NCT01245062",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Trametinib compared with chemotherapy in BRAF V600E or V600K melanoma",
      "readout_date": "",
      "subtype_label": "BRAF V600E or V600K",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "BRAF V600E or V600K; BRAF-inhibitor treatment-naive; single agent",
      "source_url": "https://clinicaltrials.gov/study/NCT01245062",
      "registry": {
        "title": "GSK1120212 vs Chemotherapy in Advanced or Metastatic BRAF V600E/K Mutation-positive Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "GlaxoSmithKline",
        "enrollment": 322,
        "start_date": "2010-11-22",
        "primary_completion_date": "2011-10-26",
        "last_update_posted": "2018-04-05",
        "url": "https://clinicaltrials.gov/study/NCT01245062"
      },
      "label": {
        "matched_brand": "Mekinist",
        "matched_generic": "TRAMETINIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260507",
        "spl_id": "235e3bc1-099b-4587-9d72-b02fcc3387d1",
        "boxed": null,
        "warnings": [
          "Malignancies, Cutaneous and Non-Cutaneous",
          "Hemorrhage",
          "Colitis and Gastrointestinal Perforation",
          "Venous Thromboembolic Events",
          "Cardiomyopathy",
          "Ocular Toxicities",
          "Interstitial Lung Disease (ILD)/Pneumonitis",
          "Serious Febrile Reactions",
          "Serious Skin Toxicities",
          "Hyperglycemia",
          "Hemophagocytic Lymphohistiocytosis (HLH)",
          "Embryo-Fetal Toxicity"
        ],
        "common": {
          "text": "rash, diarrhea, and lymphedema. ( 6.1 ) Most common adverse reactions (≥ 20%) for MEKINIST in combination with dabrafenib include: Unresectable or metastatic melanoma: pyrexia, nausea, rash, chills, diarrhea, vomiting, hypertension, and peripheral edema",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/0002ad27-779d-42ab-83b5-bc65453412a1/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Mekinist\""
      }
    },
    {
      "id": "drug-4",
      "name": "Dabrafenib + trametinib (Tafinlar + Mekinist)",
      "code": "",
      "target": "BRAF + MEK",
      "genes": [
        "BRAF",
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "small molecule",
      "company": "Novartis Pharmaceuticals Corporation",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "COMBI-d",
      "nct_id": "NCT01584648",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Dabrafenib with trametinib compared with dabrafenib alone",
      "readout_date": "",
      "subtype_label": "BRAF V600E or V600K",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "BRAF V600E or V600K by an FDA-approved test; unresectable or metastatic",
      "source_url": "https://clinicaltrials.gov/study/NCT01584648",
      "registry": {
        "title": "A Study Comparing Trametinib and Dabrafenib Combination Therapy to Dabrafenib Monotherapy in Subjects With BRAF-mutant Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Novartis Pharmaceuticals",
        "enrollment": 423,
        "start_date": "2012-05-04",
        "primary_completion_date": "2013-08-26",
        "last_update_posted": "2021-02-17",
        "url": "https://clinicaltrials.gov/study/NCT01584648"
      },
      "label": {
        "matched_brand": "Tafinlar",
        "matched_generic": "DABRAFENIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260520",
        "spl_id": "6c546993-1f7f-409b-b108-60f22e9b948a",
        "boxed": null,
        "warnings": [
          "Malignancies, Cutaneous and Non-Cutaneous",
          "Tumor Promotion in BRAF Wild-type Tumors",
          "Hemorrhage",
          "Cardiomyopathy",
          "Uveitis",
          "Serious Febrile Reactions",
          "Serious Skin Toxicities",
          "Hyperglycemia",
          "Dehydrogenase Deficiency (G6PD)",
          "Hemophagocytic Lymphohistiocytosis (HLH)",
          "Embryo-Fetal Toxicity",
          "Malignancies TAFINLAR Monotherapy (Adult)"
        ],
        "common": {
          "text": "hyperkeratosis, headache, pyrexia, arthralgia, papilloma, alopecia, and palmar-plantar erythrodysesthesia syndrome",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Dabrafenib\""
      }
    },
    {
      "id": "drug-5",
      "name": "Dabrafenib + trametinib (Tafinlar + Mekinist)",
      "code": "",
      "target": "BRAF + MEK",
      "genes": [
        "BRAF",
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "small molecule",
      "company": "Novartis Pharmaceuticals Corporation",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "COMBI-AD",
      "nct_id": "NCT01682083",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Dabrafenib with trametinib compared with placebo after complete resection",
      "readout_date": "",
      "subtype_label": "BRAF V600E or V600K, resected",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "lymph node involvement after complete resection",
      "source_url": "https://clinicaltrials.gov/study/NCT01682083",
      "registry": {
        "title": "Dabrafenib With Trametinib in the Adjuvant Treatment of High-risk BRAF V600 Mutation-positive Melanoma (COMBI-AD).",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Novartis Pharmaceuticals",
        "enrollment": 870,
        "start_date": "2013-01-08",
        "primary_completion_date": "2017-06-30",
        "last_update_posted": "2026-04-21",
        "url": "https://clinicaltrials.gov/study/NCT01682083"
      },
      "label": {
        "matched_brand": "Tafinlar",
        "matched_generic": "DABRAFENIB",
        "manufacturer": "Novartis Pharmaceuticals Corporation",
        "effective_time": "20260520",
        "spl_id": "6c546993-1f7f-409b-b108-60f22e9b948a",
        "boxed": null,
        "warnings": [
          "Malignancies, Cutaneous and Non-Cutaneous",
          "Tumor Promotion in BRAF Wild-type Tumors",
          "Hemorrhage",
          "Cardiomyopathy",
          "Uveitis",
          "Serious Febrile Reactions",
          "Serious Skin Toxicities",
          "Hyperglycemia",
          "Dehydrogenase Deficiency (G6PD)",
          "Hemophagocytic Lymphohistiocytosis (HLH)",
          "Embryo-Fetal Toxicity",
          "Malignancies TAFINLAR Monotherapy (Adult)"
        ],
        "common": {
          "text": "hyperkeratosis, headache, pyrexia, arthralgia, papilloma, alopecia, and palmar-plantar erythrodysesthesia syndrome",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.generic_name:\"Dabrafenib\""
      }
    },
    {
      "id": "drug-6",
      "name": "Encorafenib + binimetinib (Braftovi + Mektovi)",
      "code": "LGX818",
      "target": "BRAF + MEK",
      "genes": [
        "BRAF",
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "small molecule",
      "company": "Array BioPharma Inc.",
      "partner": "Pfizer",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "COLUMBUS",
      "nct_id": "NCT01909453",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Encorafenib with binimetinib compared with vemurafenib and with encorafenib alone",
      "readout_date": "",
      "subtype_label": "BRAF V600E or V600K",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "BRAF V600E or V600K by an FDA-authorized test; with binimetinib",
      "source_url": "https://clinicaltrials.gov/study/NCT01909453",
      "registry": {
        "title": "Study Comparing Combination of LGX818 Plus MEK162 Versus Vemurafenib and LGX818 Monotherapy in BRAF Mutant Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Pfizer",
        "enrollment": 921,
        "start_date": "2013-09-12",
        "primary_completion_date": "2016-11-09",
        "last_update_posted": "2026-02-27",
        "url": "https://clinicaltrials.gov/study/NCT01909453"
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
      "name": "Atezolizumab + cobimetinib + vemurafenib (Tecentriq + Cotellic + Zelboraf)",
      "code": "MPDL3280A",
      "target": "PD-L1 + BRAF + MEK",
      "genes": [
        "CD274",
        "BRAF",
        "MAP2K1",
        "MAP2K2"
      ],
      "modality": "antibody",
      "company": "Genentech, Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "IMspire150",
      "nct_id": "NCT02908672",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Atezolizumab or placebo added to cobimetinib and vemurafenib, first line",
      "readout_date": "",
      "subtype_label": "BRAF V600",
      "nodes": [
        "drv-braf-v600"
      ],
      "receptor_context": "BRAF V600 mutation-positive; with cobimetinib and vemurafenib",
      "source_url": "https://clinicaltrials.gov/study/NCT02908672",
      "registry": {
        "title": "A Study of Atezolizumab Plus Cobimetinib and Vemurafenib Versus Placebo Plus Cobimetinib and Vemurafenib in Previously Untreated BRAFv600 Mutation-Positive Patients With Metastatic or Unresectable Locally Advanced Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Hoffmann-La Roche",
        "enrollment": 514,
        "start_date": "2017-01-13",
        "primary_completion_date": "2019-10-11",
        "last_update_posted": "2025-07-20",
        "url": "https://clinicaltrials.gov/study/NCT02908672"
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
      "id": "drug-8",
      "name": "Ipilimumab (Yervoy)",
      "code": "MDX-010",
      "target": "CTLA-4",
      "genes": [
        "CTLA4"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "MDX010-20",
      "nct_id": "NCT00094653",
      "line": "after prior therapy",
      "status": "approved",
      "readout": "Ipilimumab, ipilimumab with a gp100 peptide vaccine, or the vaccine alone",
      "readout_date": "",
      "subtype_label": "Unresectable or metastatic melanoma",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "adults and children 12 years and older; single agent or with nivolumab",
      "source_url": "https://clinicaltrials.gov/study/NCT00094653",
      "registry": {
        "title": "MDX-010 Antibody, MDX-1379 Melanoma Vaccine, or MDX-010/MDX-1379 Combination Treatment for Patients With Unresectable or Metastatic Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 1783,
        "start_date": "2004-09",
        "primary_completion_date": "2009-08",
        "last_update_posted": "2011-07-11",
        "url": "https://clinicaltrials.gov/study/NCT00094653"
      },
      "label": {
        "matched_brand": "YERVOY",
        "matched_generic": "IPILIMUMAB",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20260820",
        "spl_id": "72755838-4a55-4245-949e-16cea13f2584",
        "boxed": null,
        "warnings": [
          "Fatal Immune-Mediated Adverse Reactions",
          "Infusion-Related Reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal Toxicity",
          "OY 1 mg/kg with 3 mg/kg Nivolumab Hypophysitis",
          "Adrenal Insufficiency",
          "Hyperthyroidism",
          "Hypothyroidism",
          "Thyroiditis",
          "Type 1 Diabetes Mellitus",
          "OY 3 mg/kg with 1 mg/kg Nivolumab Hypophysitis",
          "Nervous System"
        ],
        "common": {
          "text": "fatigue, diarrhea, pruritus, rash, nausea, and headache",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2265ef30-253e-11df-8a39-0800200c9a66/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Yervoy\""
      }
    },
    {
      "id": "drug-9",
      "name": "Ipilimumab (Yervoy)",
      "code": "MDX-010",
      "target": "CTLA-4",
      "genes": [
        "CTLA4"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "E1609",
      "nct_id": "NCT01274338",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Ipilimumab at two doses compared with high-dose interferon alfa-2b after resection",
      "readout_date": "",
      "subtype_label": "Resected melanoma, node-positive",
      "nodes": [
        "path-cutaneous"
      ],
      "receptor_context": "cutaneous melanoma, regional nodes over 1 mm, completely resected",
      "source_url": "https://clinicaltrials.gov/study/NCT01274338",
      "registry": {
        "title": "Ipilimumab or High-Dose Interferon Alfa-2b in Treating Patients With High-Risk Stage III-IV Melanoma That Has Been Removed by Surgery",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "National Cancer Institute (NCI)",
        "enrollment": 1673,
        "start_date": "2011-06-17",
        "primary_completion_date": "2019-02-15",
        "last_update_posted": "2026-10-01",
        "url": "https://clinicaltrials.gov/study/NCT01274338"
      },
      "label": {
        "matched_brand": "YERVOY",
        "matched_generic": "IPILIMUMAB",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20260820",
        "spl_id": "72755838-4a55-4245-949e-16cea13f2584",
        "boxed": null,
        "warnings": [
          "Fatal Immune-Mediated Adverse Reactions",
          "Infusion-Related Reactions",
          "Complications of allogeneic HSCT",
          "Embryo-Fetal Toxicity",
          "OY 1 mg/kg with 3 mg/kg Nivolumab Hypophysitis",
          "Adrenal Insufficiency",
          "Hyperthyroidism",
          "Hypothyroidism",
          "Thyroiditis",
          "Type 1 Diabetes Mellitus",
          "OY 3 mg/kg with 1 mg/kg Nivolumab Hypophysitis",
          "Nervous System"
        ],
        "common": {
          "text": "fatigue, diarrhea, pruritus, rash, nausea, and headache",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/2265ef30-253e-11df-8a39-0800200c9a66/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Yervoy\""
      }
    },
    {
      "id": "drug-10",
      "name": "Nivolumab (Opdivo)",
      "code": "BMS-936558",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 066",
      "nct_id": "NCT01721772",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Nivolumab compared with dacarbazine in untreated BRAF wild-type melanoma",
      "readout_date": "",
      "subtype_label": "Unresectable or metastatic melanoma",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "adults and children 12 years and older; single agent",
      "source_url": "https://clinicaltrials.gov/study/NCT01721772",
      "registry": {
        "title": "Study of Nivolumab (BMS-936558) Compared With Dacarbazine in Untreated, Unresectable, or Metastatic Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 418,
        "start_date": "2013-01-18",
        "primary_completion_date": "2014-06-24",
        "last_update_posted": "2022-07-12",
        "url": "https://clinicaltrials.gov/study/NCT01721772"
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
      "id": "drug-11",
      "name": "Nivolumab + ipilimumab (Opdivo + Yervoy)",
      "code": "BMS-936558",
      "target": "PD-1 + CTLA-4",
      "genes": [
        "PDCD1",
        "CTLA4"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 067",
      "nct_id": "NCT01844505",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Nivolumab, nivolumab with ipilimumab, or ipilimumab alone",
      "readout_date": "",
      "subtype_label": "Unresectable or metastatic melanoma",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "with ipilimumab",
      "source_url": "https://clinicaltrials.gov/study/NCT01844505",
      "registry": {
        "title": "Phase 3 Study of Nivolumab or Nivolumab Plus Ipilimumab Versus Ipilimumab Alone in Previously Untreated Advanced Melanoma (CheckMate 067)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 945,
        "start_date": "2013-06-11",
        "primary_completion_date": "2016-08-01",
        "last_update_posted": "2025-05-21",
        "url": "https://clinicaltrials.gov/study/NCT01844505"
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
      "id": "drug-12",
      "name": "Nivolumab (Opdivo)",
      "code": "BMS-936558",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 238",
      "nct_id": "NCT02388906",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Nivolumab compared with ipilimumab after complete resection",
      "readout_date": "",
      "subtype_label": "Resected melanoma, stage III or IV",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "completely resected",
      "source_url": "https://clinicaltrials.gov/study/NCT02388906",
      "registry": {
        "title": "Efficacy Study of Nivolumab Compared to Ipilimumab in Prevention of Recurrence of Melanoma After Complete Resection of Stage IIIb/c or Stage IV Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 906,
        "start_date": "2015-03-16",
        "primary_completion_date": "2018-11-26",
        "last_update_posted": "2025-04-24",
        "url": "https://clinicaltrials.gov/study/NCT02388906"
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
      "id": "drug-13",
      "name": "Nivolumab (Opdivo)",
      "code": "BMS-936558",
      "target": "PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "CheckMate 76K",
      "nct_id": "NCT04099251",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Nivolumab compared with placebo after resection of stage IIB or IIC melanoma",
      "readout_date": "",
      "subtype_label": "Resected melanoma, stage IIB or IIC",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "completely resected",
      "source_url": "https://clinicaltrials.gov/study/NCT04099251",
      "registry": {
        "title": "Effectiveness Study of Nivolumab Compared to Placebo in Prevention of Recurrent Melanoma After Complete Resection of Stage IIB/C Melanoma",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 790,
        "start_date": "2019-10-28",
        "primary_completion_date": "2022-06-28",
        "last_update_posted": "2026-08-07",
        "url": "https://clinicaltrials.gov/study/NCT04099251"
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
      "id": "drug-14",
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
      "trial_name": "KEYNOTE-006",
      "nct_id": "NCT01866319",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Pembrolizumab on two schedules compared with ipilimumab",
      "readout_date": "",
      "subtype_label": "Unresectable or metastatic melanoma",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "single agent",
      "source_url": "https://clinicaltrials.gov/study/NCT01866319",
      "registry": {
        "title": "Study to Evaluate the Safety and Efficacy of Two Different Dosing Schedules of Pembrolizumab (MK-3475) Compared to Ipilimumab in Participants With Advanced Melanoma (MK-3475-006/KEYNOTE-006)",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 834,
        "start_date": "2013-08-28",
        "primary_completion_date": "2015-03-03",
        "last_update_posted": "2020-06-02",
        "url": "https://clinicaltrials.gov/study/NCT01866319"
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
      "id": "drug-15",
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
      "trial_name": "KEYNOTE-054",
      "nct_id": "NCT02362594",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Pembrolizumab compared with placebo after complete resection of stage III melanoma",
      "readout_date": "",
      "subtype_label": "Resected melanoma, stage IIB, IIC or III",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "after complete resection; adults and children 12 years and older",
      "source_url": "https://clinicaltrials.gov/study/NCT02362594",
      "registry": {
        "title": "Study of Pembrolizumab (MK-3475) Versus Placebo After Complete Resection of High-Risk Stage III Melanoma (MK-3475-054/1325-MG/KEYNOTE-054)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 1019,
        "start_date": "2015-07-16",
        "primary_completion_date": "2018-01-08",
        "last_update_posted": "2026-03-05",
        "url": "https://clinicaltrials.gov/study/NCT02362594"
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
      "id": "drug-16",
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
      "trial_name": "KEYNOTE-716",
      "nct_id": "NCT03553836",
      "line": "adjuvant",
      "status": "approved",
      "readout": "Pembrolizumab compared with placebo after resection of stage IIB or IIC melanoma",
      "readout_date": "",
      "subtype_label": "Resected melanoma, stage IIB or IIC",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "after complete resection",
      "source_url": "https://clinicaltrials.gov/study/NCT03553836",
      "registry": {
        "title": "Safety and Efficacy of Pembrolizumab Compared to Placebo in Resected High-risk Stage II Melanoma (MK-3475-716/KEYNOTE-716)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 976,
        "start_date": "2018-09-12",
        "primary_completion_date": "2021-06-21",
        "last_update_posted": "2024-11-29",
        "url": "https://clinicaltrials.gov/study/NCT03553836"
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
      "id": "drug-17",
      "name": "Nivolumab + relatlimab (Opdualag)",
      "code": "",
      "target": "PD-1 + LAG-3",
      "genes": [
        "PDCD1",
        "LAG3"
      ],
      "modality": "antibody",
      "company": "E.R. Squibb & Sons, L.L.C.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "RELATIVITY-047",
      "nct_id": "NCT03470922",
      "line": "1L metastatic",
      "status": "approved",
      "readout": "Relatlimab with nivolumab compared with nivolumab alone in previously untreated melanoma",
      "readout_date": "",
      "subtype_label": "Unresectable or metastatic melanoma",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "adults and children 12 years and older",
      "source_url": "https://clinicaltrials.gov/study/NCT03470922",
      "registry": {
        "title": "A Study of Relatlimab Plus Nivolumab Versus Nivolumab Alone in Participants With Advanced Melanoma",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 2/Phase 3",
        "sponsor": "Bristol-Myers Squibb",
        "enrollment": 714,
        "start_date": "2018-04-11",
        "primary_completion_date": "2021-01-25",
        "last_update_posted": "2025-09-09",
        "url": "https://clinicaltrials.gov/study/NCT03470922"
      },
      "label": {
        "matched_brand": "OPDUALAG",
        "matched_generic": "NIVOLUMAB AND RELATLIMAB-RMBW",
        "manufacturer": "E.R. Squibb & Sons, L.L.C.",
        "effective_time": "20260608",
        "spl_id": "7c285448-d5b9-4eca-b117-0d791b1b4de3",
        "boxed": null,
        "warnings": [
          "Immune-Mediated Adverse Reactions",
          "Infusion-related reactions",
          "Complications of allogeneic HSCT",
          "Embryo-fetal toxicity",
          "Cardiac/Vascular",
          "Nervous System",
          "Ocular",
          "Gastrointestinal",
          "Musculoskeletal and Connective Tissue",
          "Endocrine",
          "Hematologic/Immune",
          "Other"
        ],
        "common": {
          "text": "musculoskeletal pain, fatigue, rash, pruritus, and diarrhea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/b22c9d83-3256-4e17-85f7-f331a504adc6/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Opdualag\""
      }
    },
    {
      "id": "drug-18",
      "name": "Talimogene laherparepvec (Imlygic)",
      "code": "OncoVEX GM-CSF",
      "target": "oncolytic virus (HSV-1, GM-CSF)",
      "genes": [],
      "modality": "oncolytic virus",
      "company": "Amgen Inc",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "OPTiM",
      "nct_id": "NCT00769704",
      "line": "after surgery",
      "status": "approved",
      "readout": "Talimogene laherparepvec compared with subcutaneous GM-CSF in unresectable stage IIIB to IV melanoma",
      "readout_date": "",
      "subtype_label": "Melanoma recurrent after surgery",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "unresectable cutaneous, subcutaneous and nodal lesions, injected locally",
      "source_url": "https://clinicaltrials.gov/study/NCT00769704",
      "registry": {
        "title": "Efficacy and Safety Study of Talimogene Laherparepvec Compared to Granulocyte Macrophage Colony Stimulating Factor (GM-CSF) in Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 3",
        "sponsor": "BioVex Limited",
        "enrollment": 437,
        "start_date": "2009-04",
        "primary_completion_date": "2013-02",
        "last_update_posted": "2016-07-13",
        "url": "https://clinicaltrials.gov/study/NCT00769704"
      },
      "label": {
        "matched_brand": "Imlygic",
        "matched_generic": "TALIMOGENE LAHERPAREPVEC",
        "manufacturer": "Amgen Inc",
        "effective_time": "20250404",
        "spl_id": "4d1843a8-7a83-4062-ba8c-4f97e2f1427b",
        "boxed": null,
        "warnings": [
          "Accidental Exposure to IMLYGIC",
          "Accidental Exposure to IMLYGIC continued",
          "Herpetic Infection",
          "Injection Site Complications",
          "Immune-Mediated Events",
          "Plasmacytoma at the Injection Site",
          "Obstructive Airway Disorder",
          "Intrahepatic Route of Administration"
        ],
        "common": null,
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/64ffb680-ea8c-42fc-9649-9e8c0eb77ddb/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Imlygic\""
      }
    },
    {
      "id": "drug-19",
      "name": "Vusolimogene oderparepvec + nivolumab (Tudriqev + Opdivo)",
      "code": "RP1",
      "target": "oncolytic virus (HSV-1) + PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "oncolytic virus",
      "company": "Replimune, Inc.",
      "partner": "Bristol-Myers Squibb",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "IGNYTE",
      "nct_id": "NCT03767348",
      "line": "after a PD-1 antibody (accelerated)",
      "status": "approved",
      "readout": "Objective response rate 24.2% (15.8, 34.3) and median duration of response 14.1 months in 91 efficacy-evaluable of 140 patients",
      "readout_date": "2026-08-06",
      "subtype_label": "Cutaneous melanoma after PD-1",
      "nodes": [
        "path-cutaneous"
      ],
      "receptor_context": "unresectable advanced cutaneous melanoma after progression on a PD-1-based regimen; with nivolumab",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-vusolimogene-oderparepvec-wtpg-combination-nivolumab-melanoma",
      "registry": {
        "title": "Study of RP1 Monotherapy and RP1 in Combination With Nivolumab (IGNYTE)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 2",
        "sponsor": "Replimune, Inc.",
        "enrollment": 340,
        "start_date": "2017-09-20",
        "primary_completion_date": "2028-06",
        "last_update_posted": "2026-02-13",
        "url": "https://clinicaltrials.gov/study/NCT03767348"
      },
      "label": {
        "matched_brand": "Tudriqev",
        "matched_generic": "vusolimogene oderparepvec-wtpg",
        "manufacturer": null,
        "effective_time": "20260901",
        "spl_id": "5a6cd8e9-9d15-d428-e063-6294a90a4dfb",
        "boxed": null,
        "warnings": [
          "Accidental exposure to TUDRIQEV",
          "Herpetic infection or reactivation",
          "Immune-mediated events"
        ],
        "common": {
          "text": "fatigue, pyrexia, infections, chills, musculoskeletal pain, nausea, diarrhea, injection site reaction, headache, cough, influenza like illness, rash, vomiting, pruritus, arthralgia, constipation, decreased appetite, dizziness, dyspnea, hemorrhage, edema, and abdominal pain",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/26627b8d-91ac-4f76-a213-7e25efd024d1/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=spl_product_data_elements:\"Tudriqev\"",
        "harmonised": false
      }
    },
    {
      "id": "drug-20",
      "name": "Lifileucel (Amtagvi)",
      "code": "LN-144",
      "target": "autologous tumour-infiltrating lymphocytes",
      "genes": [],
      "modality": "cell therapy",
      "company": "Iovance Biotherapeutics Inc.",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "C-144-01",
      "nct_id": "NCT02360579",
      "line": "after a PD-1 antibody (accelerated)",
      "status": "approved",
      "readout": "Objective response rate 31.5% (21.1, 43.4) in the 73 patients treated within the recommended dose range",
      "readout_date": "2024-02-16",
      "subtype_label": "After a PD-1 antibody",
      "nodes": [
        "path-root"
      ],
      "receptor_context": "previously treated with a PD-1 antibody and, if BRAF V600-positive, a BRAF inhibitor with or without a MEK inhibitor",
      "source_url": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-lifileucel-unresectable-or-metastatic-melanoma",
      "registry": {
        "title": "Study of Lifileucel (LN-144), Autologous Tumor Infiltrating Lymphocytes, in the Treatment of Patients With Metastatic Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Iovance Biotherapeutics, Inc.",
        "enrollment": 220,
        "start_date": "2015-09-24",
        "primary_completion_date": "2024-10-24",
        "last_update_posted": "2026-03-25",
        "url": "https://clinicaltrials.gov/study/NCT02360579"
      },
      "label": {
        "matched_brand": "AMTAGVI",
        "matched_generic": "LIFILEUCEL",
        "manufacturer": "Iovance Biotherapeutics Inc.",
        "effective_time": "20251014",
        "spl_id": "4120d6b2-93d7-e0bf-e063-6294a90a6e7f",
        "boxed": {
          "headline": "WARNING: TREATMENT-RELATED MORTALITY, PROLONGED SEVERE CYTOPENIA, SEVERE INFECTION, CARDIOPULMONARY and RENAL",
          "text": "WARNING: TREATMENT-RELATED MORTALITY, PROLONGED SEVERE CYTOPENIA, SEVERE INFECTION, CARDIOPULMONARY and RENAL IMPAIRMENT Monitor patients for prolonged severe cytopenia and monitor for internal organ hemorrhage [see Warnings and Precautions (5.1 , 5.2 , 5.3) ]. Administer filgrastim or a biosimilar product to patients beginning Day 1 after AMTAGVI and continuing daily until the absolute neutrophil count (ANC) is greater than 1000 per mm 3 for 3 consecutive days, or per institutional standard. Treat severe infections [see Warnings and Precautions (5.1 , 5.4) ]. Monitor cardiopulmonary and renal…"
        },
        "warnings": [
          "Hypersensitivity reactions"
        ],
        "common": {
          "text": "chills, pyrexia, fatigue, tachycardia, diarrhea, febrile neutropenia, edema, rash, hypotension, alopecia, infection, hypoxia, and dyspnea",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/4121bd3f-2d6e-3bdd-e063-6294a90a3088/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Amtagvi\""
      }
    },
    {
      "id": "drug-21",
      "name": "Tebentafusp (Kimmtrak)",
      "code": "IMCgp100",
      "target": "gp100 peptide-HLA-A*02:01 + CD3",
      "genes": [
        "PMEL"
      ],
      "modality": "bispecific T-cell engager",
      "company": "Immunocore Commercial LLC",
      "partner": "",
      "phase": "approved",
      "phase_rank": 7,
      "trial_name": "IMCgp100-202",
      "nct_id": "NCT03070392",
      "line": "1L metastatic uveal",
      "status": "approved",
      "readout": "Tebentafusp compared with the investigator's choice of therapy in previously untreated metastatic uveal melanoma",
      "readout_date": "",
      "subtype_label": "HLA-A*02:01-positive uveal melanoma",
      "nodes": [
        "path-uveal"
      ],
      "receptor_context": "unresectable or metastatic uveal melanoma, HLA-A*02:01-positive by a blood test",
      "source_url": "https://clinicaltrials.gov/study/NCT03070392",
      "registry": {
        "title": "Safety and Efficacy of IMCgp100 Versus Investigator Choice in Advanced Uveal Melanoma",
        "overall_status": "COMPLETED",
        "phase": "Phase 2",
        "sponsor": "Immunocore Ltd",
        "enrollment": 378,
        "start_date": "2017-10-16",
        "primary_completion_date": "2020-10-13",
        "last_update_posted": "2026-03-17",
        "url": "https://clinicaltrials.gov/study/NCT03070392"
      },
      "label": {
        "matched_brand": "KIMMTRAK",
        "matched_generic": "TEBENTAFUSP",
        "manufacturer": "Immunocore Commercial LLC",
        "effective_time": "20260820",
        "spl_id": "6da26ba2-92a2-4c0f-b733-946f25c71338",
        "boxed": {
          "headline": "BOXED WARNING: CYTOKINE RELEASE SYNDROME Cytokine Release Syndrome (CRS), which may be serious or life-threate",
          "text": "BOXED WARNING: CYTOKINE RELEASE SYNDROME Cytokine Release Syndrome (CRS), which may be serious or life-threatening, occurred in patients receiving KIMMTRAK. Monitor for at least 16 hours following first three infusions and then as clinically indicated [(see Dosage and Administration (2.2) , see Warnings and Precautions (5.1) ] . WARNING: CYTOKINE RELEASE SYNDROME Cytokine Release Syndrome (CRS), which may be serious or life-threatening, occurred in patients receiving KIMMTRAK. Monitor for at least 16 hours following first three infusions and then as clinically indicated ( 2.2 , 5.1 )."
        },
        "warnings": [
          "Skin reactions",
          "Elevated liver enzymes",
          "Embryo-Fetal toxicity"
        ],
        "common": {
          "text": "cytokine release syndrome, rash, pyrexia, pruritus, fatigue, nausea, chills, abdominal pain, edema, hypotension, dry skin, headache and vomiting ( 6.1 )",
          "has_frequencies": false
        },
        "url": "https://nctr-crs.fda.gov/fdalabel/services/spl/set-ids/24a49f57-d2fc-4ffe-9eb1-fe0460c6b067/spl-doc",
        "openfda_url": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Kimmtrak\""
      }
    },
    {
      "id": "drug-22",
      "name": "Intismeran autogene + pembrolizumab (V940 + Keytruda)",
      "code": "mRNA-4157",
      "target": "individualised neoantigen mRNA + PD-1",
      "genes": [
        "PDCD1"
      ],
      "modality": "mRNA vaccine",
      "company": "Merck Sharp & Dohme LLC",
      "partner": "ModernaTX, Inc.",
      "phase": "phase 3",
      "phase_rank": 5,
      "trial_name": "INTerpath-001 (V940-001)",
      "nct_id": "NCT05933577",
      "line": "adjuvant",
      "status": "active, not recruiting",
      "readout": "Adjuvant intismeran autogene with pembrolizumab compared with pembrolizumab alone after complete resection",
      "readout_date": "",
      "subtype_label": "Resected cutaneous melanoma, stage IIB to IV",
      "nodes": [
        "path-cutaneous"
      ],
      "receptor_context": "high-risk resected cutaneous melanoma, with pembrolizumab; ocular and mucosal melanoma excluded",
      "source_url": "https://clinicaltrials.gov/study/NCT05933577",
      "registry": {
        "title": "A Clinical Study of Intismeran Autogene (V940) Plus Pembrolizumab in People With High-Risk Melanoma (V940-001)",
        "overall_status": "ACTIVE_NOT_RECRUITING",
        "phase": "Phase 3",
        "sponsor": "Merck Sharp & Dohme LLC",
        "enrollment": 1089,
        "start_date": "2023-07-19",
        "primary_completion_date": "2029-10-26",
        "last_update_posted": "2025-09-24",
        "url": "https://clinicaltrials.gov/study/NCT05933577"
      }
    }
  ],
  "drug_summary": {
    "n_drugs": 23,
    "registry_matched": 23,
    "phases": {
      "approved": 22,
      "phase 3": 1
    },
    "modalities": {
      "small molecule": 7,
      "antibody": 11,
      "oncolytic virus": 2,
      "cell therapy": 1,
      "bispecific T-cell engager": 1,
      "mRNA vaccine": 1
    },
    "unmapped_targets": []
  },
  "gaps": {
    "druggable_untargeted": [
      {
        "gene": "NRAS",
        "basis": "genomic",
        "max_pct": 100.0,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 49,
        "civic_therapies": [
          "Vemurafenib",
          "Belvarafenib",
          "Binimetinib",
          "Trametinib"
        ],
        "why": "No agent here is aimed at NRAS. It appears instead where a BRAF inhibitor stops working, which is why it sits on the BRAF V600 card."
      },
      {
        "gene": "NF1",
        "basis": "genomic",
        "max_pct": 98.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "civic_best_level": "C",
        "civic_items": 9,
        "civic_therapies": [
          "Vemurafenib",
          "Pan-RAF/MEK Molecular Glue NST-628",
          "Mirdametinib",
          "Sirolimus"
        ],
        "why": "Loss releases the brake on RAS. What is lost cannot be blocked, and no agent here is aimed at it."
      },
      {
        "gene": "TERT",
        "basis": "genomic",
        "max_pct": 90.7,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 2,
        "civic_therapies": [],
        "why": "The commonest change in skin melanoma and almost always in the promoter, outside the protein. There is nothing to block."
      },
      {
        "gene": "TP53",
        "basis": "genomic",
        "max_pct": 47.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "Still undrugged: restoring a lost function is harder than blocking one."
      },
      {
        "gene": "CDKN2A",
        "basis": "genomic",
        "max_pct": 36.0,
        "max_node": "drv-ras-other",
        "max_metric": "deep_deletion",
        "civic_best_level": "C",
        "civic_best_level_submitted": "B",
        "civic_items": 6,
        "civic_therapies": [
          "Palbociclib",
          "Vemurafenib",
          "Dabrafenib",
          "Alvocidib"
        ],
        "why": "Deleted across every pathway. Its loss is studied as a reason BRAF inhibitors stop working rather than as a target."
      },
      {
        "gene": "PTEN",
        "basis": "genomic",
        "max_pct": 23.3,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation",
        "civic_best_level": "D",
        "civic_items": 4,
        "civic_therapies": [
          "Uprosertib",
          "Vemurafenib",
          "Akt Inhibitor MK2206",
          "MEK Inhibitor CI-1040"
        ],
        "why": "Loss activates PI3K/AKT. No agent here is aimed at it."
      },
      {
        "gene": "CCND1",
        "basis": "pathway",
        "max_pct": 20.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification",
        "civic_best_level": "B",
        "civic_items": 1,
        "civic_therapies": [
          "Carboplatin",
          "Paclitaxel",
          "Sorafenib"
        ],
        "why": "Amplified with CDK4 in acral melanoma, and addressed only through CDK4/6."
      },
      {
        "gene": "SF3B1",
        "basis": "genomic",
        "max_pct": 12.3,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "A splicing-factor hotspot in uveal and mucosal melanoma, undrugged."
      },
      {
        "gene": "KIT",
        "basis": "genomic",
        "max_pct": 12.0,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 20,
        "civic_therapies": [
          "Imatinib",
          "Dasatinib",
          "Nilotinib",
          "Sunitinib"
        ],
        "why": "Mutated most often in mucosal melanoma, and no KIT inhibitor carries a US melanoma indication."
      },
      {
        "gene": "GNAQ",
        "basis": "genomic",
        "max_pct": 11.6,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 8,
        "civic_therapies": [
          "Selumetinib",
          "Trametinib",
          "Cabozantinib",
          "Refametinib"
        ],
        "why": "The hotspot most uveal melanomas carry, with nothing aimed at it. The cohort behind these figures holds skin and unknown-primary melanoma, so the number here is not uveal melanoma's."
      },
      {
        "gene": "MITF",
        "basis": "genomic",
        "max_pct": 8.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification",
        "civic_best_level": null,
        "civic_best_level_submitted": "C",
        "civic_items": 2,
        "civic_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "PLX4720",
          "Selumetinib"
        ],
        "why": "The melanocyte lineage's master transcription factor, amplified in a minority and with no pocket to bind."
      },
      {
        "gene": "BAP1",
        "basis": "genomic",
        "max_pct": 7.1,
        "max_node": "drv-unknown",
        "max_metric": "deep_deletion",
        "civic_best_level": "B",
        "civic_items": 2,
        "civic_therapies": [
          "Valproic Acid",
          "Panobinostat",
          "Vorinostat",
          "Trichostatin A"
        ],
        "why": "Lost in much uveal melanoma and read as a prognostic marker, not a target."
      },
      {
        "gene": "CDK4",
        "basis": "pathway",
        "max_pct": 7.1,
        "max_node": "drv-unknown",
        "max_metric": "mutation",
        "civic_best_level": "D",
        "civic_items": 1,
        "civic_therapies": [
          "Palbociclib"
        ],
        "why": "Amplified in acral melanoma. No CDK4/6 inhibitor carries a melanoma indication, so the dependency is shown, not drugged."
      },
      {
        "gene": "GNA11",
        "basis": "genomic",
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "civic_best_level": "B",
        "civic_items": 5,
        "civic_therapies": [
          "Selumetinib",
          "Cabozantinib",
          "Trametinib",
          "Sotrastaurin Acetate"
        ],
        "why": "The same hotspot in the other alpha subunit; the two are counted together on the uveal card and neither is drugged."
      },
      {
        "gene": "EIF1AX",
        "basis": "genomic",
        "max_pct": 7.0,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation",
        "civic_best_level": "C",
        "civic_items": 1,
        "civic_therapies": [],
        "why": "The third uveal driver, and the one with the least aimed at it."
      },
      {
        "gene": "MDM2",
        "basis": "genomic",
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "amplification",
        "civic_best_level": null,
        "civic_items": null,
        "civic_therapies": [],
        "why": "Amplified in acral melanoma, where it holds p53 down."
      }
    ],
    "addressed_indirectly": [],
    "landscape": [
      {
        "gene": "PDCD1",
        "basis": "unselected",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 10,
        "best_phase": "approved",
        "max_pct": 4.5,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "hotspot_n": 13,
        "civic_best_level": null
      },
      {
        "gene": "BRAF",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 7,
        "best_phase": "approved",
        "max_pct": 100.0,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation",
        "hotspot_n": 301,
        "civic_best_level": "A"
      },
      {
        "gene": "MAP2K1",
        "basis": "pathway",
        "biomarker_gene": "BRAF",
        "comparable": false,
        "programs": 6,
        "best_phase": "approved",
        "max_pct": 37.2,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "hotspot_n": 59,
        "civic_best_level": "C"
      },
      {
        "gene": "MAP2K2",
        "basis": "pathway",
        "biomarker_gene": "BRAF",
        "comparable": false,
        "programs": 6,
        "best_phase": "approved",
        "max_pct": 16.0,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 20,
        "civic_best_level": "D"
      },
      {
        "gene": "CTLA4",
        "basis": "unselected",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 3,
        "best_phase": "approved",
        "max_pct": 4.7,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "hotspot_n": 16,
        "civic_best_level": null
      },
      {
        "gene": "PMEL",
        "basis": "germline",
        "biomarker_gene": "HLA-A*02:01",
        "comparable": false,
        "programs": 1,
        "best_phase": "approved",
        "max_pct": 0,
        "max_node": null,
        "max_metric": null,
        "hotspot_n": 0,
        "civic_best_level": null
      },
      {
        "gene": "LAG3",
        "basis": "unselected",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 1,
        "best_phase": "approved",
        "max_pct": 0,
        "max_node": null,
        "max_metric": null,
        "hotspot_n": 0,
        "civic_best_level": null
      },
      {
        "gene": "NRAS",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 100.0,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation",
        "hotspot_n": 207,
        "civic_best_level": "B"
      },
      {
        "gene": "NF1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 98.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "hotspot_n": 194,
        "civic_best_level": "C"
      },
      {
        "gene": "TERT",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 90.7,
        "max_node": "drv-nras-q61",
        "max_metric": "mutation",
        "hotspot_n": 575,
        "civic_best_level": "B"
      },
      {
        "gene": "TP53",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 47.7,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "hotspot_n": 183,
        "civic_best_level": null
      },
      {
        "gene": "CDKN2A",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 36.0,
        "max_node": "drv-ras-other",
        "max_metric": "deep_deletion",
        "hotspot_n": 140,
        "civic_best_level": "C"
      },
      {
        "gene": "PTEN",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 23.3,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation",
        "hotspot_n": 82,
        "civic_best_level": "D"
      },
      {
        "gene": "CCND1",
        "basis": "pathway",
        "biomarker_gene": null,
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 20.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification",
        "hotspot_n": 6,
        "civic_best_level": "B"
      },
      {
        "gene": "SF3B1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 12.3,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "hotspot_n": 40,
        "civic_best_level": null
      },
      {
        "gene": "KIT",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 12.0,
        "max_node": "drv-ras-other",
        "max_metric": "mutation",
        "hotspot_n": 39,
        "civic_best_level": "B"
      },
      {
        "gene": "GNAQ",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 11.6,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "hotspot_n": 18,
        "civic_best_level": "B"
      },
      {
        "gene": "MITF",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 8.0,
        "max_node": "drv-ras-other",
        "max_metric": "amplification",
        "hotspot_n": 15,
        "civic_best_level": null
      },
      {
        "gene": "BAP1",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.1,
        "max_node": "drv-unknown",
        "max_metric": "deep_deletion",
        "hotspot_n": 23,
        "civic_best_level": "B"
      },
      {
        "gene": "CDK4",
        "basis": "pathway",
        "biomarker_gene": "CCND1",
        "comparable": false,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.1,
        "max_node": "drv-unknown",
        "max_metric": "mutation",
        "hotspot_n": 16,
        "civic_best_level": "D"
      },
      {
        "gene": "GNA11",
        "basis": "genomic",
        "biomarker_gene": "GNAQ",
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "mutation",
        "hotspot_n": 12,
        "civic_best_level": "B"
      },
      {
        "gene": "EIF1AX",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.0,
        "max_node": "drv-braf-v600-other",
        "max_metric": "mutation",
        "hotspot_n": 15,
        "civic_best_level": "C"
      },
      {
        "gene": "MDM2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 7.0,
        "max_node": "drv-other",
        "max_metric": "amplification",
        "hotspot_n": 16,
        "civic_best_level": null
      },
      {
        "gene": "CYSLTR2",
        "basis": "genomic",
        "biomarker_gene": null,
        "comparable": true,
        "programs": 0,
        "best_phase": null,
        "max_pct": 4.1,
        "max_node": "drv-nf1",
        "max_metric": "mutation",
        "hotspot_n": 11,
        "civic_best_level": null
      }
    ],
    "repositioning": [],
    "evidence_without_program": [
      {
        "gene": "NF1",
        "best_level": "C",
        "n_evidence_items": 9,
        "evidence_types": {
          "PREDICTIVE": 9
        },
        "top_therapies": [
          "Vemurafenib",
          "Pan-RAF/MEK Molecular Glue NST-628",
          "Mirdametinib",
          "Sirolimus"
        ],
        "in_target_set": true
      },
      {
        "gene": "AKT1",
        "best_level": "C",
        "n_evidence_items": 7,
        "evidence_types": {
          "PREDICTIVE": 7
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "Uprosertib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CDKN2A",
        "best_level": "C",
        "best_level_submitted": "B",
        "n_evidence_items": 6,
        "evidence_types": {
          "PREDICTIVE": 5,
          "PREDISPOSING": 1
        },
        "top_therapies": [
          "Palbociclib",
          "Vemurafenib",
          "Dabrafenib",
          "Alvocidib"
        ],
        "in_target_set": true
      },
      {
        "gene": "NTRK1",
        "best_level": "C",
        "n_evidence_items": 5,
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "ONCOGENIC": 1,
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Larotrectinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ALK",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Crizotinib",
          "Entrectinib",
          "Ceritinib",
          "ALK Inhibitor ASP3026"
        ],
        "in_target_set": false
      },
      {
        "gene": "AGK",
        "best_level": "C",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Belvarafenib",
          "Sorafenib",
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "GOLGA4",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Trametinib",
          "Cobimetinib",
          "Binimetinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "JAK1",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Pembrolizumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "JAK2",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Pembrolizumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "MITF",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "PLX4720",
          "Selumetinib"
        ],
        "in_target_set": true
      },
      {
        "gene": "B2M",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Pembrolizumab",
          "Immune Checkpoint Inhibitor"
        ],
        "in_target_set": false
      },
      {
        "gene": "LMNA",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "DIAGNOSTIC": 1,
          "ONCOGENIC": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "NTRK3",
        "best_level": "C",
        "n_evidence_items": 2,
        "evidence_types": {
          "ONCOGENIC": 1,
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Entrectinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "EIF1AX",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PROGNOSTIC": 1
        },
        "top_therapies": [],
        "in_target_set": true
      },
      {
        "gene": "MBD4",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "PD1 Inhibitor"
        ],
        "in_target_set": false
      },
      {
        "gene": "ANO10",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "GOPC",
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
        "gene": "ROS1",
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
        "gene": "ZKSCAN1",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "ETV6",
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
        "gene": "GCC2",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Binimetinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "MIPOL1",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Belvarafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PPFIBP2",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PREX2",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "HOXD8",
        "best_level": "C",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "EMSY",
        "best_level": "C",
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
        "gene": "DPP10",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "ONCOGENIC": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "RUFY1",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Binimetinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "AGAP3",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "KIAA1549",
        "best_level": "C",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PDGFRA",
        "best_level": "D",
        "n_evidence_items": 6,
        "evidence_types": {
          "PREDICTIVE": 6
        },
        "top_therapies": [
          "Crenolanib",
          "Imatinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PTEN",
        "best_level": "D",
        "n_evidence_items": 4,
        "evidence_types": {
          "PREDICTIVE": 4
        },
        "top_therapies": [
          "Uprosertib",
          "Vemurafenib",
          "Akt Inhibitor MK2206",
          "MEK Inhibitor CI-1040"
        ],
        "in_target_set": true
      },
      {
        "gene": "PIK3CA",
        "best_level": "D",
        "n_evidence_items": 4,
        "evidence_types": {
          "PREDICTIVE": 4
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "RAC1",
        "best_level": "D",
        "best_level_submitted": "B",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 3
        },
        "top_therapies": [
          "Vemurafenib",
          "Dabrafenib",
          "PLX4720"
        ],
        "in_target_set": false
      },
      {
        "gene": "EZH2",
        "best_level": "D",
        "n_evidence_items": 3,
        "evidence_types": {
          "PREDICTIVE": 2,
          "PROGNOSTIC": 1
        },
        "top_therapies": [
          "JQEZ5",
          "GSK126"
        ],
        "in_target_set": false
      },
      {
        "gene": "ERBB3",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Trametinib",
          "Selumetinib",
          "Pertuzumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "PAPSS1",
        "best_level": "D",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vemurafenib",
          "Trametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "TRIM24",
        "best_level": "D",
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
        "gene": "AKT3",
        "best_level": "D",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "PIK3R2",
        "best_level": "D",
        "n_evidence_items": 2,
        "evidence_types": {
          "PREDICTIVE": 2
        },
        "top_therapies": [
          "Vemurafenib"
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
        "gene": "FGFR3",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CDK5",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PROGNOSTIC": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "ERBB4",
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
        "gene": "DDX43",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Mirdametinib",
          "Trametinib",
          "Selumetinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "STAG2",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "STAG3",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "SOX10",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "CTNNB1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Anti-CTLA-4 Monoclonal Antibody",
          "Anti-PD-L1 Monoclonal Antibody"
        ],
        "in_target_set": false
      },
      {
        "gene": "SETDB1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Anti-PD1 Monoclonal Antibody"
        ],
        "in_target_set": false
      },
      {
        "gene": "ATM",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Temozolomide"
        ],
        "in_target_set": false
      },
      {
        "gene": "MERTK",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "UNC1062"
        ],
        "in_target_set": false
      },
      {
        "gene": "TF",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "BRD4",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [],
        "in_target_set": false
      },
      {
        "gene": "TBK1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "AZ909",
          "Selumetinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "AEBP1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Vemurafenib"
        ],
        "in_target_set": false
      },
      {
        "gene": "TPT1",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Sertraline"
        ],
        "in_target_set": false
      },
      {
        "gene": "TCF19",
        "best_level": "D",
        "pending": true,
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Birabresib",
          "Mirdametinib"
        ],
        "in_target_set": false
      },
      {
        "gene": "IFNGR1",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Ipilimumab"
        ],
        "in_target_set": false
      },
      {
        "gene": "CDK4",
        "best_level": "D",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Palbociclib"
        ],
        "in_target_set": true
      },
      {
        "gene": "TRIM63",
        "best_level": "E",
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
        "gene": "DDR2",
        "best_level": "E",
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
        "gene": "GON4L",
        "best_level": "E",
        "n_evidence_items": 1,
        "evidence_types": {
          "PREDICTIVE": 1
        },
        "top_therapies": [
          "Larotrectinib"
        ],
        "in_target_set": false
      }
    ],
    "cohort_blind_spots": [],
    "not_mutation_selected": [
      {
        "gene": "PMEL",
        "basis": "germline",
        "n_mutated_samples": 0,
        "of": 696,
        "n_programs": 1,
        "best_phase": "approved",
        "reason": "Tebentafusp binds a gp100 peptide only where HLA-A*02:01 presents it, so a blood test of the PATIENT decides eligibility. Nothing measured in the tumour, PMEL included, says who can receive it, and the dataset's targets[].germline carries the counted share."
      },
      {
        "gene": "LAG3",
        "basis": "unselected",
        "n_mutated_samples": 0,
        "of": 696,
        "n_programs": 1,
        "best_phase": "approved",
        "reason": "The third checkpoint with a melanoma label, given with a PD-1 antibody and selected by no tumour test."
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
    "n_drugs": 23,
    "n_with_label": 22,
    "n_boxed_warnings": 2,
    "n_with_frequencies": 0,
    "lookup_failed": [],
    "caveat": "Excerpts of US FDA labels, not a safety summary and not advice. An agent without a label here is one openFDA returned no US label for: an investigational agent has none yet, and an approved one may be approved outside the US or missed by the search. Neither means it has no side effects."
  }
};
