/* data/_template.js — scaffold for a new cancer.
 *
 * TO ADD A CANCER:
 *   1. Copy this file to data/<yourcancer>.js
 *   2. Fill it in (delete the example nodes; keep the shape)
 *   3. Add <script src="data/<yourcancer>.js"></script> to index.html,
 *      after the engine scripts and before the boot() call
 *   4. Reload. The console prints a validation report on every boot.
 *
 * Nothing in js/ needs to change. If you find yourself wanting to edit the
 * renderer to fit your data, the schema is probably the thing to extend —
 * see SCHEMA.md.
 *
 * This file is NOT loaded by default. It exists to be copied.
 */
CancerExplorer.register({

  /* ---- identity ---------------------------------------------------- */
  id: 'template',                       // REQUIRED, unique, url-safe (used in the hash route)
  name: 'Template Cancer',              // REQUIRED, shown in the picker
  synonyms: [],
  overview: 'One or two sentences shown under the title.',
  incidence: '~X new cases per year',
  lastVerified: 'YYYY-MM-DD',

  /* ---- profile (Layer 0) --------------------------------------------
     OPTIONAL, and the first thing anyone reads. Present it and the Start lens
     appears as the default landing; omit it and the app opens on the taxonomy
     as it did before.

     The NUMBERS do not go here — they move, so they belong in the generated
     overlay at ds.facts.overview. What lives here is framing: what the disease
     is, why it is classified the way it is, and the words a patient meets on a
     report.
  -------------------------------------------------------------------- */
  profile: {
    definition: 'One paragraph. What this cancer is, in words a newcomer can follow.',
    definitionMore: 'Optional second paragraph — the plain facts people actually lack.',

    /* Global estimates, kept apart from any registry column in the UI. A
       modelled figure and a counted one are different kinds of number. */
    world: {
      newCasesPerYear: 0,
      deathsPerYear: 0,
      label: 'World',
      note: 'REQUIRED in spirit: say that these are modelled and not comparable with the '
            + 'registry column beside them.',
      source: { label: 'WHO / IARC GLOBOCAN', url: 'https://gco.iarc.fr/' }
    },

    classification: 'Why this cancer is sorted the way it is — and, if several systems '
                  + 'disagree, say so here rather than hiding it.',

    /* The bridge into the explorer. Each term is a button. Point it at a node
       with `goTo`, or at a lens with `goToLens` (+ optional `goToView`).
       `marker` / `biomarker` pull the assay and threshold from markers[] and
       molecular.biomarkers instead of restating them. */
    reportTerms: [
      { term: 'MARKER1', marker: 'MARKER1',
        plain: 'What this word means, in one or two plain sentences.',
        goTo: 'primary-root' },
      { term: 'Stage',
        plain: 'How far it has spread.',
        goToLens: 'risk', goToView: 'detection' }
    ],

    sources: [{ label: 'Registry or statistics source', url: 'https://example.org' }]
  },

  /* ---- baseline -----------------------------------------------------
     OPTIONAL, but it unlocks the risk lens's whole reason for existing: with a
     baseline present, every convertible `rr` in factors[] is also rendered in
     absolute terms. A relative risk shown alone is read as an absolute one by
     almost every non-specialist.

     A wrong baseline silently rescales every factor, so cite it.
  -------------------------------------------------------------------- */
  baseline: {
    population: 'e.g. US women',
    lifetimeRisk: 13,                   // percent, as a NUMBER — the conversion denominator
    lifetimeRiskLabel: 'about 1 in 8',
    note: 'Say what the number is averaged over. It is not one person\'s risk.',
    strata: [
      // Only where the denominator genuinely differs — men, an age band, an ancestry group.
      { label: 'e.g. US men', lifetimeRisk: 0.13, note: 'Optional context.' }
    ],
    source: { label: 'Registry / source name', url: 'https://example.org' }
  },

  /* ---- factors ------------------------------------------------------
     OPTIONAL. Risk factors, deduplicated across the whole cancer and rankable.
     This is an INDEX over the same evidence as the per-node triggers[], not a
     replacement for them — keep both.

     They are not a fifth axis and must not be modelled as one: risk factors
     overlap freely (one person can carry several at once), so they partition
     nothing and the prevalence sum rule would be meaningless over them.
  -------------------------------------------------------------------- */
  factors: [
    {
      id: 'example-factor',             // REQUIRED, unique among factors
      label: 'Factor name',             // REQUIRED
      category: 'Lifestyle',            // free text, groups the view
      modifiable: true,                 // REQUIRED boolean — never guess this one
      direction: 'increases',           // increases | decreases | mixed

      /* Give EITHER rr OR absoluteLifetime, never both. `rr` multiplies the
         baseline; `absoluteLifetime` replaces it (use it for high-penetrance
         germline variants, which are published as absolute risks). */
      rr: [1.2, 1.5],
      // absoluteLifetime: [55, 72],

      per: '',                          // the unit the rr applies to, e.g. 'drink/day'
      magnitude: 'RR ~1.2–1.5',         // the display string — keep the published wording
      evidence: 'strong',               // strong | moderate | limited

      /* THE OTHER GUARD ON THE CONVERSION, and the one `scope` cannot catch.
         baseline.lifetimeRisk is a risk of being DIAGNOSED, so only a
         multiplier on incidence may be multiplied by it. 'mortality' is never
         converted and the UI says why. Defaults to 'incidence'. */
      outcome: 'incidence',             // incidence | mortality


      /* THE GUARD ON THE CONVERSION. 'overall' means the effect size was
         measured against the whole disease and may be multiplied by the
         baseline. A node id means it was measured against that subtype only —
         the renderer then refuses to convert and says why. */
      scope: 'overall',

      // stratum: 'e.g. US men',        // a baseline.strata label, when the denominator differs

      affects: ['primary-root'],        // node ids — the link from this lens into the taxonomy
      note: 'One or two sentences.',
      source: { label: 'Citation', url: 'https://example.org' }
    }
  ],

  /* ---- detection ----------------------------------------------------
     OPTIONAL, and the layer that keeps a risk page honest. If most of your
     factors are unmodifiable — as they are in breast — a page built on
     factors[] alone implies people control more than they do. stageOutcomes is
     usually the largest effect in the whole dataset.
  -------------------------------------------------------------------- */
  detection: {
    note: 'The one-sentence version of why this section matters.',

    /* What the reporting window does NOT capture. Required in spirit whenever
       the window is too short to separate your stages — the validator warns
       when the top two are within a percentage point of each other, because a
       table that cannot tell them apart reads as "the difference does not
       matter". Prostate reports 100.0% for both localised AND regional. */
    horizonNote: 'What five years does and does not cover for this cancer.',

    stageOutcomes: [                    // shares are a partition of all cases; checked against ~100%
      // tenYear is optional and renders BESIDE fiveYear — the gap is the point.
      { stage: 'Localised', share: 65, fiveYear: 99.6, tenYear: 95.1, note: 'Optional.' },
      { stage: 'Regional',  share: 27, fiveYear: 86.8, note: 'Optional.' },
      { stage: 'Distant',   share: 6,  fiveYear: 31.9, note: 'Optional.' }
    ],

    /* What screening buys and what it costs, on ONE denominator, rendered side
       by side. `basis` is required and benefits-without-harms is an ERROR:
       screening always costs something, and a block listing only the upside is
       an advertisement. */
    tradeoff: {
      note: 'Optional one-liner.',
      basis: 'REQUIRED — the denominator every row shares, e.g. "per 1,000 people screened".',
      rows: [
        { kind: 'benefit', value: '8.2', label: 'deaths averted', note: 'Optional.' },
        { kind: 'harm', value: '1,376', label: 'false-positive results', note: 'Optional.' }
      ],
      effect: {
        measure: 'RR', point: 0.85, ci: [0.73, 0.98],   // point must lie inside ci
        of: 'what the ratio is a ratio OF',
        followUp: 'how long — a rate ratio without this is not a finding',
        note: 'Optional.'
      },
      disagreement: 'Where sources contradict each other. Say it; do not resolve it silently.',
      sources: [{ label: 'Citation', url: 'https://example.org' }]
    },

    modalities: [
      { name: 'Screening test', role: 'Population screening',
        catches: 'What it finds.', misses: 'What it does not — say this plainly.',
        // Required in spirit for anything whose role mentions screening: catches
        // and misses are both about accuracy, and neither holds what the test
        // costs the people who take it.
        harms: 'False positives, overdiagnosis, complications — with numbers.',
        sensitivity: '', interval: '', note: 'Optional.' }
    ],
    signs: ['A change worth reporting promptly'],
    sources: [{ label: 'Citation', url: 'https://example.org' }]
  },

  /* ---- markers ------------------------------------------------------
     The biomarkers this cancer is classified by. Breast declares ER/PR/HER2;
     lung would declare EGFR/ALK/ROS1/PD-L1. Any key used in a node's
     `markers` object must be declared here or validation errors.
  -------------------------------------------------------------------- */
  markers: [
    { id: 'MARKER1', label: 'Full marker name', assay: 'IHC', positiveThreshold: 'e.g. ≥1% of cells' }
  ],

  /* ---- glossary -----------------------------------------------------
     OPTIONAL, and the thing most likely to be forgotten. js/glossary.js holds
     ~71 terms that are true of ANY cancer. Anything that names YOUR biology
     belongs here instead, or a reader of another cancer will be served your
     definitions.

     Two shapes:
       - with `d` → replaces the engine entry outright. For words this cancer
         owns, or words the engine has never heard of.
       - without `d` → keeps the engine definition, replaces only what you name
         (in practice `w`). Use this when the definition is fine but the
         example is somebody else's.

     The validator errors on an entry with no `d` and no engine term to inherit
     from, and on a new term with no group.
  -------------------------------------------------------------------- */
  glossary: {
    groups: [
      // Override an engine group label, or declare a new group.
      { id: 'classification', label: 'How this cancer is sorted' }
    ],
    terms: [
      { t: 'MARKER1', g: 'classification', alias: ['ALTNAME'],
        d: 'What this word means, in plain language.',
        w: 'Where it appears in this app and what it changes.' },
      { t: 'ADC', w: 'Which agents here are ADCs, and why that matters for this cancer.' }
    ]
  },

  /* OPTIONAL. Extra "also written" names and structure captions, merged over
     the engine's shared tables — the engine keeps TP53, MYC, PARP1 and the
     like, you add whatever is yours. */
  // geneAliases: { FOLH1: ['PSMA'] },
  // pdbGloss: { '2AM9': 'The androgen receptor holding testosterone.' },

  /* ---- axes ---------------------------------------------------------
     Each axis is an independent tree. Use one per classification system
     that genuinely disagrees with the others — do not merge them into a
     single hierarchy just because it looks tidier.
  -------------------------------------------------------------------- */
  /* Two registers, both required in practice.

     `asks` / `measures` / `decides` are plain language for someone who has never
     met this classification. The front page builds one card per axis out of
     them and the Subtypes lens head repeats them, so they are what makes four
     rival taxonomies distinguishable rather than four mystery options in a
     dropdown. Write them for a reader, not a colleague.

     `note` is the caveat for someone who already understands the axis. */
  axes: [
    { id: 'primary', label: 'Primary classification', shortLabel: 'Primary', default: true,
      asks: 'The question this way of sorting answers, in one line.',
      measures: 'What is physically measured, and by whom.',
      decides: 'What changes as a result. If nothing does, say so.',
      note: 'Shown above the chart. Say what this lens is and what it is not.' },
    { id: 'molecular', label: 'Molecular subtype', shortLabel: 'Molecular',
      asks: 'Which genes is the tumour actually using?',
      measures: 'A laboratory assay rather than a look down a microscope.',
      decides: 'Often little directly — but it is where disagreement with the primary ' +
               'classification shows up, and that disagreement is the point.',
      note: 'A second, disagreeing taxonomy.' }
  ],

  /* ---- nodes --------------------------------------------------------
     Every axis needs exactly one root (parent: null). A node's parent must
     live on the same axis. Cross-axis links go in `related`, not `parent`.
     `prevalence` is percent of the WHOLE cancer, not of the parent — so a
     node's children sum to the node's own value (root-level siblings sum
     to ~100). That is what keeps nested treemap areas honest.
  -------------------------------------------------------------------- */
  nodes: [
    {
      id: 'primary-root',               // REQUIRED, unique across the whole dataset
      axis: 'primary',                  // REQUIRED, must match an axis id
      parent: null,                     // null == this axis's root
      label: 'All template cancer',     // REQUIRED
      shortLabel: 'All',                // optional; used where space is tight
      prevalence: 100,                  // percent — drives treemap area and circle size
      summary: 'What this node is, in one or two sentences.',

      /* Marker values are free text so you can express '+', '−', '1+', '≥50%'. */
      markers: { MARKER1: '+' },

      /* Why people get it. Grouped by `category` in the drawer. */
      triggers: [
        {
          factor: 'Risk factor name',
          category: 'Germline',                 // Germline | Hormonal | Lifestyle | Environmental | Demographic | Infectious | …
          direction: 'increases',               // increases | decreases | mixed
          magnitude: 'RR ~2.0',                 // free text — quote the actual effect size
          evidence: 'strong',                   // strong | moderate | limited
          note: 'One sentence of context.',
          source: 'optional citation string'
        }
      ],

      /* Down to the molecular level. */
      molecular: {
        drivers: [
          {
            gene: 'GENE1',
            alteration: 'activating mutation',  // or amplification / loss / fusion / …
            frequency: 42,                      // percent, as a number — drives the bar
            frequencyNote: '',                  // use instead of `frequency` when no clean number exists
            role: 'oncogene',
            druggable: true,                    // renders a "druggable" tag and recolours the bar
            note: 'Why this matters clinically.'
          }
        ],
        pathways: [
          { name: 'Pathway name', status: 'activated in ~40%', note: 'Optional.' }
        ],
        biomarkers: [
          { name: 'Assay name', use: 'what decision it drives', threshold: 'the cutoff' }
        ]
      },

      prognosis: {
        relativeOutlook: 'How this compares with sibling subtypes.',
        fiveYearNote: 'Survival context if you have it.',
        caveat: 'Anything that would mislead if omitted.'
      },

      therapies: [
        { name: 'Drug or regimen', class: 'mechanism', setting: 'line of therapy', status: 'approved' }
      ],

      /* Cross-cutting links — these may point at nodes on OTHER axes.
         That is the whole point: it is how you model a category that refuses
         to nest cleanly. */
      related: [
        { to: 'molecular-root', kind: 'overlaps', strength: 0.8, note: 'How and how much they overlap.' }
        // kind: overlaps | progresses-to | reclassified-as | shares-driver | precursor-of | subset-of
      ],

      sources: [
        { label: 'Citation shown in the drawer', url: 'https://example.org' }
      ]
    },

    {
      id: 'molecular-root',
      axis: 'molecular',
      parent: null,
      label: 'Molecular subtypes',
      prevalence: 100,
      summary: 'Root of the second axis.'
    }
  ]
});
