/* glossary.js — what every term on this site means, in plain words.

   The app renders controlled vocabularies in known places: a modality cell says
   "ADC", a badge says "preprint", a chip says "synthetic-lethal". Those are
   precise words doing real work, and they are invisible to anyone who already
   knows them and opaque to everyone else. "Modality: ADC" is not a definition
   of anything.

   Two rules held throughout:

   1. Every entry has a `why` line saying where in THIS app the term appears and
      what it changes. A definition without that is a dictionary entry; the
      point here is to unblock someone mid-page.
   2. Where a term is routinely MISREAD, the misreading is named. "Relative
      survival" and "relative risk" get their traps spelled out, because those
      two mislead more readers on this site than any other words on it.

   Lookup is by exact token, never by scanning prose — "stage" is also a verb,
   "primary" means two different things here, and gene symbols collide with
   ordinary English. A wrong definition is worse than an absent one.

   ---- Engine terms vs dataset terms -------------------------------------

   Everything in this file must be true of ANY cancer. A definition that names
   ER, PAM50 or a mammogram belongs to a dataset, not to the engine — with one
   dataset that distinction was invisible, and with two it becomes the
   difference between a definition and a wrong definition. Someone reading
   about Gleason patterns must not be handed the meaning of a HER2 stain.

   So a dataset may declare its own vocabulary:

     glossary: {
       groups: [{ id: 'classification', label: 'How breast cancer is sorted' }],
       terms:  [
         { t: 'HER2', g: 'classification', d: 'A protein…', w: 'One of three stains…' },
         { t: 'ADC',  w: 'The modality of 13 agents here, including Enhertu.' }
       ]
     }

   Two override shapes, and the difference is deliberate:

   - **A term carrying its own `d`** replaces the engine entry outright. Use it
     for a word this cancer owns — HER2, PAM50, Gleason — or when the engine
     has no entry at all.
   - **A term with no `d`** keeps the engine's neutral definition and replaces
     only the fields it names, in practice the `w` line. Most overrides are
     this shape, because the definition of "ADC" does not change between
     cancers but the agents it points at do.

   What is NOT possible is one dataset inheriting another's text: the base is
   always the engine's neutral entry, never a sibling dataset's. That is the
   failure this whole mechanism exists to prevent — someone reading about
   Gleason patterns handed the meaning of a HER2 stain.

   Group labels are overridden by id; unknown group ids are appended.
*/
(function (global) {
  'use strict';

  var ENGINE_GROUPS = [
    { id: 'drugs', label: 'Drugs and treatment' },
    { id: 'classification', label: 'How this cancer is sorted' },
    { id: 'molecular', label: 'Genes and proteins' },
    { id: 'numbers', label: 'Numbers, risk and survival' },
    { id: 'evidence', label: 'Evidence and publications' },
    { id: 'detection', label: 'Finding it early' }
  ];

  var ENGINE_TERMS = [

    /* ---------------- drugs and treatment ---------------- */
    { t: 'modality', g: 'drugs',
      d: 'What kind of thing the drug physically is — a pill small enough to get inside a ' +
         'cell, an antibody too big to, an antibody carrying a payload, and so on. Not what it ' +
         'aims at, but how it is built.',
      w: 'The column heading on the drugs table. It is the first thing that constrains a ' +
         'target: a protein floating inside the cell can only be reached by something small ' +
         'enough to get in, which is why some targets have pills and others have antibodies.' },

    { t: 'ADC', g: 'drugs', full: 'Antibody-drug conjugate',
      d: 'An antibody used as a delivery van. It finds a protein sitting on the cancer cell, ' +
         'sticks to it, and carries a chemotherapy payload inside — so the toxic part acts ' +
         'mostly where the target is rather than everywhere at once.',
      w: 'The modality behind several agents here. It is why a protein on the cell surface can ' +
         'matter as a target even when it is never mutated: it is an address, not a driver.' },

    { t: 'mAb', g: 'drugs', full: 'Monoclonal antibody',
      d: 'A lab-made antibody, all copies identical, designed to stick to one specific ' +
         'protein. On its own it can block a signal or flag the cell for the immune system.',
      w: 'Shown in the modality column. An antibody can only reach a target on the outside of ' +
         'the cell, which is what separates these from pills.' },

    { t: 'small molecule', g: 'drugs',
      d: 'A drug small enough to get inside a cell, usually taken as a pill. Antibodies are ' +
         'far too big to do that, which is why some targets need one approach and some the other.',
      w: 'The most common modality here, and the only one that can reach a target sitting ' +
         'inside the cell rather than on its surface.' },

    { t: 'TKI', g: 'drugs', full: 'Tyrosine kinase inhibitor',
      d: 'A small molecule that jams the switch on a signalling protein, stopping it telling ' +
         'the cell to grow.',
      w: 'A large share of the small molecules here are kinase inhibitors — the kinase is the ' +
         'most heavily drugged protein class in oncology.' },

    { t: 'degrader', g: 'drugs', alias: ['PROTAC'],
      d: 'Instead of blocking a protein, it tags the protein for the cell\'s own disposal ' +
         'system so it is destroyed. Blocking is temporary; destroying is not.',
      w: 'Worth noticing when the same protein appears twice in the drugs table under two ' +
         'modalities: one agent is blocking it, the newer one is destroying it.' },

    { t: 'bispecific', g: 'drugs',
      d: 'An antibody built to grab two different things at once — often one on the cancer ' +
         'cell and one on an immune cell, pulling them together.',
      w: 'Shown in the modality column. Grabbing two spots at once can work where blocking ' +
         'one does not.' },

    { t: 'immunotherapy', g: 'drugs', alias: ['checkpoint inhibitor'],
      d: 'A drug that releases a brake on the immune system so it can attack the tumour. It ' +
         'does not attack the cancer directly — it takes the handcuffs off the T cells.',
      w: 'This is why PD-1 and PD-L1 can appear as targets even though PD-1 sits on the ' +
         'immune cell rather than on the tumour.' },

    { t: 'phase 1', g: 'drugs',
      d: 'The first test in people. Small, mostly asking "is this safe and at what dose" ' +
         'rather than "does it work".',
      w: 'Shown on every agent. A phase 1 result is a very long way from a treatment.' },

    { t: 'phase 2', g: 'drugs',
      d: 'A larger study asking whether the drug does anything useful, usually without a ' +
         'comparison group.',
      w: 'Encouraging phase 2 results routinely fail to survive phase 3.' },

    { t: 'phase 3', g: 'drugs',
      d: 'The big one: hundreds or thousands of people, randomly assigned to the new drug or ' +
         'the current standard, to see which does better. This is the evidence regulators want.',
      w: 'The closest tier to approval that is still a question rather than an answer. The ' +
         'drugs table says how many agents here have reached it.' },

    { t: 'filed', g: 'drugs',
      d: 'The company has submitted its evidence to the regulator and is waiting for a decision.',
      w: 'Shown as its own status in the drugs table, because filing is not approval and the ' +
         'gap between them is where drugs still fail.' },

    { t: 'approved', g: 'drugs',
      d: 'A regulator has judged the benefits to outweigh the harms for a defined group of ' +
         'patients, and the drug can be prescribed.',
      w: 'Approval is always for a specific situation, never for a cancer in general — the ' +
         '"used at" line on each agent says which one.' },

    { t: 'line of therapy', g: 'drugs', alias: ['1L', '2L', 'first-line', 'second-line'],
      d: 'Where in the sequence a treatment is used. First-line (1L) is what you get first; ' +
         'second-line (2L) is what you move to if that stops working.',
      w: 'The same drug can be excellent in one line and useless in another, so every agent ' +
         'here records the line it is used at.' },

    { t: 'adjuvant', g: 'drugs', alias: ['neoadjuvant'],
      d: 'Treatment given around surgery to lower the chance of the cancer returning — after ' +
         'surgery is adjuvant, before it is neoadjuvant. The tumour is already gone or going; ' +
         'this is insurance against what might be left.',
      w: 'Distinct from metastatic treatment, where the disease has already spread.' },

    { t: 'metastatic', g: 'drugs', alias: ['advanced', 'secondary'],
      d: 'The cancer has spread beyond where it started and its nearby lymph nodes, to other ' +
         'organs. Treatment aims to control it for as long as possible rather than remove it.',
      w: 'Most agents in this pipeline are used in the metastatic setting.' },

    { t: 'boxed warning', g: 'drugs', alias: ['black box warning'],
      d: 'The most serious warning a regulator can put on a drug label, reserved for risks ' +
         'that can be severe, life-threatening or fatal. It sits in a black box at the top of ' +
         'the label so nobody misses it.',
      w: '17 of the agents here carry one. It does not mean the drug is bad — it means this ' +
         'specific risk has to be watched for.' },

    /* The three families a reader meets before any brand name. Named as a set,
       because the distinction between them is the whole reason receptor status
       decides treatment. */
    { t: 'chemotherapy', g: 'drugs', alias: ['chemo'],
      d: 'Drugs that poison cells which are dividing fast. Cancer cells divide fast, but so do ' +
         'hair, gut lining and bone marrow — which is where the familiar side effects come ' +
         'from. It does not aim at anything specific to the tumour.',
      w: 'The fallback when nothing targeted applies, which is why triple-negative disease ' +
         'relied on it for so long.' },

    { t: 'endocrine therapy', g: 'drugs', alias: ['hormone therapy'],
      d: 'Treatment that cuts off the hormone a tumour depends on, or blocks its ability to ' +
         'use it — usually a daily pill taken for years. It only works if the tumour carries ' +
         'the receptor for that hormone.',
      w: 'Where a cancer is hormone-driven this is the switch that makes the option exist, ' +
         'which is why the receptor test is worth doing on every tumour.' },

    { t: 'program', g: 'drugs', full: 'Drug development program', alias: ['programme', 'programs'],
      d: 'One effort to develop one drug against one target — a specific molecule with a name, ' +
         'an owner and a place in the testing sequence. Counting programs counts attempts, not ' +
         'successes: most fail, and several may be chasing the same idea.',
      w: 'The vertical axis of the landscape chart. Zero programs against a frequently broken ' +
         'protein is the thing that chart exists to make visible — and it usually means the ' +
         'protein is hard to drug, not that nobody thought of it.' },

    { t: 'targeted therapy', g: 'drugs',
      d: 'A drug aimed at one specific broken protein rather than at fast-dividing cells in ' +
         'general. It only helps if the tumour has that particular thing wrong with it, which ' +
         'is why the tumour is tested first.',
      w: 'The entire Targets lens is about this: find the broken protein, find what binds it. ' +
         'A target that no tumour depends on is a drug that helps nobody.' },

    /* ---------------- classification ----------------

       The first four entries are the ones the front page leans on hardest. A
       reader who does not know what a pathology report IS cannot use a page
       built out of the words on one. */
    { t: 'pathology report', g: 'classification', alias: ['pathology'],
      d: 'The document written after a piece of the tumour has been looked at under a ' +
         'microscope and stained. It says what the cells look like, which of the three ' +
         'switches are on, how abnormal they are, and how far they had spread. It is a ' +
         'description of the tumour, not a plan.',
      w: 'Every one of the four classifications on this site is read off this one document. ' +
         'The words in "The words on a pathology report" are literally its vocabulary.' },

    { t: 'biopsy', g: 'classification',
      d: 'Taking a small piece of the lump — usually through a needle — so it can be examined. ' +
         'Nothing about a tumour\'s type is known until this has happened; a scan can show ' +
         'that something is there, but not what it is.',
      w: 'It is the event that starts everything downstream on this site. No biopsy, no ' +
         'receptor status, no subtype, no target.' },

    { t: 'pathologist', g: 'classification',
      d: 'The doctor who examines the tissue and writes the report. They do not usually meet ' +
         'the patient, and they are the person who actually decides what kind of cancer it is.',
      w: 'Worth knowing because the classifications here are human judgements about stained ' +
         'slides, not machine readouts — which is why borderline calls genuinely differ.' },

    { t: 'gene expression', g: 'classification', alias: ['expression', 'mRNA'],
      d: 'Which genes a cell is actively using, and how hard. Every cell carries the same ' +
         'genes; what makes cells behave differently is which ones are switched on. Measuring ' +
         'this reads the cell\'s current behaviour rather than its instruction manual.',
      w: 'Where a dataset carries an expression-based classification, this is what it is built ' +
         'from — and why it can disagree with a stain-based one: they measure two different ' +
         'things about the same tumour.' },

    { t: 'IHC', g: 'classification', full: 'Immunohistochemistry',
      d: 'A stain. A slice of the tumour is treated with an antibody that changes colour where ' +
         'a particular protein is present, and a pathologist looks down a microscope and ' +
         'judges how much is there.',
      w: 'Several classifications here rest on stains like these. It is a human judgement ' +
         'about a colour, which is why borderline calls are genuinely difficult.' },

    { t: 'ISH', g: 'classification', full: 'In situ hybridisation',
      d: 'A test that counts how many copies of a gene a cell has, used when a stain is ' +
         'borderline.',
      w: 'Used to settle a stain that came back ambiguous, by counting gene copies instead ' +
         'of judging a colour.' },

    { t: 'histology', g: 'classification',
      d: 'What the tumour looks like under a microscope and how it grows — the shape and ' +
         'arrangement of the cells, and which structure they came from. Largely separate from ' +
         'what its molecules say.',
      w: 'One of the classification axes here. It usually runs largely independent of the ' +
         'molecular ones — where it does not, the node says so.' },

    { t: 'in situ', g: 'classification', alias: ['stage 0'],
      d: 'Abnormal cells that have not broken out of the structure they started in. Not yet ' +
         'invasive; some would never become so, and we cannot reliably tell which.',
      w: 'In-situ diagnoses rise sharply once screening begins — that is detection, not a rise ' +
         'in disease, and it is why over-diagnosis is a real argument in screening.' },

    { t: 'grade', g: 'classification',
      d: 'How abnormal the cells look next to the normal tissue they came from, and so how ' +
         'fast they are likely to grow. It is about appearance, and the scale differs by cancer.',
      w: 'Routinely confused with stage. Grade is how the cells look; stage is how far they ' +
         'have spread. Stage matters far more for outlook.' },

    { t: 'carcinoma', g: 'classification',
      d: 'A cancer that started in the lining cells of an organ — the cells that form surfaces ' +
         'and tubes. Most common cancers are carcinomas; the word narrows things much less ' +
         'than it sounds like it does.',
      w: 'It is the noun in most subtype names here. The informative part of such a name is ' +
         'always the adjective in front of it.' },

    { t: 'invasive', g: 'classification',
      d: 'The cells have broken out of the duct or lobule they started in and into the ' +
         'surrounding tissue. This is the line that separates a cancer that can spread from ' +
         'one that, so far, cannot.',
      w: 'The opposite of in situ, and the single most consequential word on a report. Almost ' +
         'everything else on this site is about invasive disease.' },

    { t: 'subtype', g: 'classification',
      d: 'One of the groups a cancer gets sorted into. Not a fixed thing: a tumour has a ' +
         'different subtype under each way of sorting, each answering a different question.',
      w: 'The word is used loosely everywhere else and precisely here — always say which ' +
         'classification a subtype belongs to, or the label means nothing on its own.' },

    { t: 'classification axis', g: 'classification', alias: ['axis', 'classify by'],
      d: 'One complete way of sorting every tumour into groups, where the groups do not ' +
         'overlap and together account for all of them. A cancer can have several in routine ' +
         'use at once, answering different questions.',
      w: 'The "Classify by" picker chooses which one the Subtypes lens draws. Risk factors and ' +
         'drugs are deliberately NOT axes — a tumour can have many of either, so they sort ' +
         'nothing.' },

    /* ---------------- molecular ---------------- */
    { t: 'driver', g: 'molecular',
      d: 'A genetic change that actively pushes the cancer along, as opposed to one that is ' +
         'just along for the ride. Tumours carry thousands of changes and only a handful drive.',
      w: 'The "molecular drivers" list in every subtype panel.' },

    { t: 'mutation', g: 'molecular',
      d: 'A typo in the gene\'s instructions. Some break the protein, some jam it permanently on.',
      w: 'PIK3CA H1047R is a typo that jams the growth switch on — which is why a drug can be ' +
         'aimed at it.' },

    { t: 'amplification', g: 'molecular',
      d: 'The cell has made extra copies of a gene — sometimes dozens — so it produces far too ' +
         'much of that protein. The instructions are fine; there are just too many of them.',
      w: 'It is why a gene can matter as a target without any typo being involved — nothing ' +
         'is wrong with the instructions, there are simply too many copies of them.' },

    { t: 'deep deletion', g: 'molecular', alias: ['loss'],
      d: 'The gene has been lost outright. This is how tumours switch off the brakes.',
      w: 'PTEN and RB1 appear here through loss rather than mutation — you cannot drug a gene ' +
         'that is gone, which is why both are addressed downstream instead.' },

    { t: 'oncogene', g: 'molecular',
      d: 'A gene that drives growth when it goes wrong. Because the fault makes it too active, ' +
         'a drug can block it.',
      w: 'Most of the druggable targets here are oncogenes. That is not a coincidence — see ' +
         'tumour suppressor for the other half of the story.' },

    { t: 'tumour suppressor', g: 'molecular',
      d: 'A gene that normally stops cells growing out of control — a brake. Cancer breaks it. ' +
         'Restoring something that is broken is far harder than blocking something overactive, ' +
         'which is why these are mostly undruggable.',
      w: 'TP53 is among the most altered genes in almost every cancer and still has no drug ' +
         'against it. That is the reason.' },

    { t: 'germline', g: 'molecular', alias: ['inherited'],
      d: 'A change you were born with, present in every cell, and inheritable. The opposite is ' +
         'somatic — a change that happened in the tumour during life.',
      w: 'BRCA1 and BRCA2 are the familiar examples. Only a small share of any common cancer ' +
         'is inherited this way — the risk lens gives the figure for this one.' },

    { t: 'hotspot', g: 'molecular',
      d: 'A specific position in a protein that is mutated over and over across many different ' +
         'patients. Recurrence that strong usually means the change is doing something useful ' +
         'for the tumour.',
      w: 'The lollipops on the protein tracks. PIK3CA H1047R appears in 75 tumours of 507.' },

    { t: 'domain', g: 'molecular',
      d: 'A distinct working part of a protein, like a component in a machine. Where a mutation ' +
         'lands matters: the same gene broken in two different domains can behave differently.',
      w: 'The coloured blocks on each protein track. PIK3CA H1047R sits in the engine; E545K ' +
         'sits in a different part, and they are not interchangeable.' },

    { t: 'druggable', g: 'molecular',
      d: 'There is a physical way to interfere with this protein — usually a pocket a small ' +
         'molecule can sit in, or an exposed surface an antibody can grab.',
      w: 'A flag on drivers here. Where it is set, the agents that hit it are now listed ' +
         'underneath; where it is set with nothing behind it, the app says so.' },

    { t: 'synthetic lethality', g: 'molecular',
      d: 'Two things that are each survivable alone but fatal together. The cancer already has ' +
         'one broken; the drug breaks the other, and only the cancer dies.',
      w: 'How PARP inhibitors work. The target is PARP1, but the lesion is in BRCA1/2 — the ' +
         'biomarker and the target are different proteins, which is easy to miss.' },

    { t: 'pathway', g: 'molecular',
      d: 'A chain of proteins passing a signal along, like a relay. Blocking one runner can ' +
         'stop the message, and cancers often escape by routing around the block.',
      w: 'PI3K/AKT/mTOR is the most common escape route in this app — the way round a block ' +
         'that was working.' },

    { t: 'biomarker', g: 'molecular',
      d: 'Something measurable that tells you what to do — most usefully, which treatment is ' +
         'likely to work for this particular person.',
      w: 'Every marker this cancer is classified by is a biomarker, and so is any mutation ' +
         'that picks a drug: each one selects or rules out a therapy.' },

    { t: 'alteration frequency', g: 'molecular', alias: ['altered', 'alteration'],
      d: 'What share of tumours of a given kind carry a change in this gene — mutated, ' +
         'amplified or deleted, all counted together. "Altered in 60%" means 6 in 10 of the ' +
         'tumours tested had something wrong with it.',
      w: 'Always quoted for the subtype where it is highest, not averaged across the whole ' +
         'disease, because a gene broken in 80% of one subtype and never elsewhere is a real ' +
         'target — and averaging would hide it.' },

    /* ---------------- numbers ---------------- */
    { t: 'relative survival', g: 'numbers', alias: ['5-year relative survival'],
      d: 'Compares people who have the diagnosis with people of the same age and sex who do ' +
         'not. 100% means five-year survival is no different from the general population — it ' +
         'does NOT mean nobody dies of it, and the figure can even exceed 100%.',
      w: 'Every survival number on this site is relative, including the 100% for localised ' +
         'disease on the front page. This is the most misread number here.' },

    { t: 'relative risk', g: 'numbers', alias: ['RR', 'odds ratio', 'OR'],
      d: 'How much a factor multiplies your chances, not what your chances are. "Raises risk ' +
         '30%" means 30% more than whatever your baseline was — which could be very small.',
      w: 'Every risk factor here is shown both ways for exactly this reason. A multiplier is ' +
         'read as a probability by almost everyone, so the absolute version is printed beside ' +
         'it rather than left to be worked out.' },

    { t: 'lifetime risk', g: 'numbers',
      d: 'The chance of being diagnosed at some point across a whole life. It is averaged ' +
         'over an entire lifetime and an entire population — it is not your risk this year, ' +
         'and it is not one person\'s risk. The Risk lens gives the figure for this cancer.',
      w: 'The anchor every relative risk on this site is converted against.' },

    { t: 'incidence', g: 'numbers',
      d: 'How many new cases appear in a population in a year. Different from how many people ' +
         'have the disease, and different from how many die of it.',
      w: 'The Start lens quotes it per 100,000 people per year, age-adjusted.',
      /* The example used to be breast's own rate, and every other cancer
         inherited it. Read it off the active dataset's registry figures
         instead, so it cannot quote one cancer's number under another's name. */
      wFrom: function (ds) {
        var ov = ((ds && ds.facts) || {}).overview;
        var r = ov && ov.rates_per_100k;
        if (!r || typeof r.new_cases !== 'number') return null;
        return r.new_cases + ' new cases per 100,000 US ' + (ov.population_sex || 'people') +
          ' per year, age-adjusted (' + (ov.source || 'SEER') + ').';
      } },

    { t: 'age-adjusted', g: 'numbers',
      d: 'A rate mathematically corrected so populations with different age profiles can be ' +
         'compared. Without it, an older country looks like it has more cancer purely because ' +
         'it is older.',
      w: 'Both headline rates on the front page are age-adjusted.' },

    { t: 'prevalence', g: 'numbers',
      d: 'On this site, what share of the whole cancer a subtype makes up.',
      w: 'Drives the size of every box in the treemap and every circle in the tree — a box\'s ' +
         'area is its share of the whole disease, not of its parent, so depths compare. Nested ' +
         'boxes sit inside the parent\'s label strip and so run a little small.' },

    { t: 'stage', g: 'numbers',
      d: 'How far the cancer has spread, from 0 to IV. Localised means still confined to the ' +
         'organ it started in; distant means it has reached other organs.',
      w: 'Usually the single largest effect on this site — the localised-to-distant gap is ' +
         'wider than the gap between any two subtypes. The detection view has the figures for ' +
         'this cancer, and they are relative survival, so read that entry too.' },

    { t: 'median age', g: 'numbers',
      d: 'The middle value: half of diagnoses happen before this age and half after. Not the ' +
         'average, and not the most common age.',
      w: '64 at diagnosis. Most of the lifetime risk arrives late.' },

    { t: 'modifiable', g: 'numbers',
      d: 'Something you could in principle change. Age, sex and inherited genes are not; ' +
         'alcohol and physical activity are.',
      w: 'The Risk lens splits factors on this, and the split is usually uncomfortable: far ' +
         'less of the risk is under anyone\'s control than a list of "lifestyle tips" implies.' },

    { t: 'n/N', g: 'numbers', alias: ['numerator and denominator'],
      d: 'How many out of how many. "29/92" means 29 of the 92 tumours tested. A percentage ' +
         'without this is unanchored — 50% of 8 is four samples.',
      w: 'Shown beside every computed figure so you can see what it rests on.' },

    /* The two kinds of number on the front page, side by side and NOT the same
       kind of thing. Stated as vocabulary so the "not comparable" note has a
       word to hang on. */
    { t: 'cancer registry', g: 'numbers', alias: ['registry', 'SEER'],
      d: 'An organisation that is told about every cancer diagnosed in the area it covers, and ' +
         'counts them. SEER covers a large sample of the US population this way. A registry ' +
         'figure is a count of real recorded cases.',
      w: 'The US column on the front page comes from one. It is the most trustworthy kind of ' +
         'number here, and it only exists for countries that fund the counting.' },

    { t: 'modelled estimate', g: 'numbers', alias: ['GLOBOCAN', 'modelled'],
      d: 'A figure calculated for places where nobody counted, by taking the places that did ' +
         'count and extrapolating. It is the best available answer, and it is not a ' +
         'measurement.',
      w: 'The World column is modelled; the US column is counted. Putting the two side by side ' +
         'and treating them as the same kind of number is the mistake that page is arranged to ' +
         'prevent.' },

    /* ---------------- evidence ---------------- */
    { t: 'preprint', g: 'evidence',
      d: 'A paper the authors have posted publicly before any independent expert has checked ' +
         'it. It may be excellent or it may be wrong; nobody has looked yet.',
      w: 'Badged in the Literature lens as clearly as possible. Preprints are the newest work ' +
         'here, which is the point — and the least checked, which is the risk.' },

    { t: 'peer review', g: 'evidence',
      d: 'Other specialists read a paper before publication and can demand changes or reject ' +
         'it. It filters out a lot, but it is not a guarantee of truth.',
      w: 'The line between a preprint and everything else in the Literature lens.' },

    { t: 'meta-analysis', g: 'evidence', alias: ['systematic review'],
      d: 'A study of studies — pooling many separate results to get a more reliable answer than ' +
         'any one gives alone. Generally the strongest evidence available.',
      w: 'The top tier in the Literature lens.' },

    { t: 'in vitro', g: 'evidence', alias: ['cell line'],
      d: 'Done in cells in a dish, not in a living body. Useful for working out mechanism, and ' +
         'a long way from showing a treatment works in people.',
      w: 'Flagged on every paper. Most published cancer research is at this stage.' },

    { t: 'xenograft', g: 'evidence', alias: ['mouse model', 'in vivo'],
      d: 'Human tumour tissue grown in a mouse. Closer to a real body than a dish, still not a ' +
         'person — most things that cure cancer in mice do not work in humans.',
      w: 'A large share of the papers in the Literature lens are mouse work, and each one ' +
         'says so on its own record rather than leaving you to guess.' },

    { t: 'cohort', g: 'evidence',
      d: 'A defined group of people whose data is analysed together. Which group matters ' +
         'enormously: findings from one may not hold in another.',
      w: 'The genomic figures here come from one named cohort, shown beside every one of ' +
         'them. A cohort of primary tumours cannot see resistance mutations that only appear ' +
         'after treatment has been given.' },

    { t: 'curated vs computed', g: 'evidence',
      d: 'Curated means a person wrote it down; computed means the pipeline calculated it from ' +
         'a source. Where the two disagree this site shows both rather than picking one.',
      w: 'The Evidence lens exists to make those disagreements visible instead of resolving ' +
         'them silently.' },

    { t: 'CIViC level', g: 'evidence',
      d: 'A grade for how solid a gene-drug link is, from A (used in practice guidelines) down ' +
         'to E (inferred). D means preclinical — real evidence, but not from people. CIViC lists ' +
         'new evidence as submitted, pending, until one of its editors accepts it.',
      w: 'Shown on each target. Only accepted evidence sets the level here; a higher level on ' +
         'pending items is shown beside it, not in its place. A level-D association is a long ' +
         'way from a treatment.' },

    /* ---------------- detection ---------------- */
    { t: 'screening', g: 'detection',
      d: 'Testing people who feel completely well, to find disease before it causes symptoms. ' +
         'Different from testing someone who has found a lump.',
      w: 'The detection view. Finding it early moves survival more than any modifiable risk ' +
         'factor on this site.' },

    { t: 'sensitivity', g: 'detection',
      d: 'How good a test is at finding what is there. A test that is 85% sensitive misses ' +
         'roughly 1 in 7 of the cancers present at the time.',
      w: 'Shown for each screening test in the detection view. Sensitivity is not a fixed ' +
         'property of a test — it drops in exactly the conditions that make a cancer hard to see.' },

    { t: 'over-diagnosis', g: 'detection',
      d: 'Finding a cancer that would never have caused harm in that person\'s lifetime. The ' +
         'person is still treated, because we cannot tell which ones those are.',
      w: 'The real argument against screening more, and why a rise in early-stage diagnoses ' +
         'is not automatically good news.' }
  ];

  /* ---------------- merge: engine terms + the active dataset's ----------------

     Built once per dataset and cached, because lookup() runs on every rendered
     controlled-vocabulary value and the merge is not free. Datasets are static
     script files, so nothing invalidates the cache. */

  var built = {};       // cache key -> { terms, byTerm, groups }
  var active = null;    // dataset whose overlay lookup()/all()/groups() use

  /* The overlay is merged onto a dataset at boot, and the validator can look a
     term up before that happens. An engine example computed from the overlay
     (`wFrom`) would then be cached without it for the rest of the session, so
     whether the overlay was present is part of the key. */
  function cacheKey(ds) {
    if (!(ds && ds.id)) return '<engine>';
    return 'ds:' + ds.id + (ds.facts ? '+facts' : '');
  }

  function build(ds) {
    var over = (ds && ds.glossary) || {};

    /* Replace in place so an overridden term keeps its position in the group,
       rather than jumping to the end of the glossary page. An engine entry
       with `wFrom` computes its example from the dataset; a copy carries it,
       so ENGINE_TERMS itself is never written to. A dataset's own `w` below
       still wins over the computed one. */
    var terms = ENGINE_TERMS.map(function (e) {
      if (typeof e.wFrom !== 'function') return e;
      var got = e.wFrom(ds);
      if (!got) return e;
      var copy = {};
      Object.keys(e).forEach(function (key) { copy[key] = e[key]; });
      copy.w = got;
      return copy;
    });
    var at = {};
    terms.forEach(function (e, i) { at[e.t.toLowerCase()] = i; });
    (over.terms || []).forEach(function (e) {
      if (!e || !e.t) return;
      var k = String(e.t).toLowerCase();
      var i = at[k];
      if (i == null) { at[k] = terms.length; terms.push(e); return; }
      /* Carrying a `d` means "this word is mine" — take the whole entry. Not
         carrying one means "the definition is fine, the example is not", so
         only the named fields land on top of the engine's neutral base. */
      if (e.d) { terms[i] = e; return; }
      var merged = {}, base = terms[i];
      Object.keys(base).forEach(function (key) { merged[key] = base[key]; });
      Object.keys(e).forEach(function (key) { merged[key] = e[key]; });
      terms[i] = merged;
    });

    /* Primary names claim their key first, then aliases fill the gaps. A term
       someone actually declared must never lose its own name to another
       entry's alias — which is exactly what a single pass would allow. */
    var byTerm = {};
    terms.forEach(function (e) { byTerm[e.t.toLowerCase()] = e; });
    terms.forEach(function (e) {
      (e.alias || []).forEach(function (a) {
        var k = String(a).toLowerCase();
        if (!byTerm[k]) byTerm[k] = e;
      });
    });

    var labels = {};
    (over.groups || []).forEach(function (g) { if (g && g.id) labels[g.id] = g.label; });
    var groupList = ENGINE_GROUPS.map(function (g) {
      return { id: g.id, label: labels[g.id] || g.label };
    });
    var seen = {};
    groupList.forEach(function (g) { seen[g.id] = true; });
    (over.groups || []).forEach(function (g) {
      if (g && g.id && !seen[g.id]) { seen[g.id] = true; groupList.push({ id: g.id, label: g.label || g.id }); }
    });

    return { terms: terms, byTerm: byTerm, groupList: groupList };
  }

  function tableFor(ds) {
    var key = cacheKey(ds);
    return (built[key] || (built[key] = build(ds)));
  }

  /* Which dataset's vocabulary the bare calls resolve against. Called on boot
     and on every change of the cancer picker. */
  function use(ds) { active = ds || null; return tableFor(ds); }

  /* Exact-token lookup only. Never scan prose: "stage" is also a verb, "primary"
     means two different things on this site, and gene symbols collide with
     ordinary words. A wrong definition is worse than an absent one.

     `ds` is optional and overrides the active dataset — the validator needs it,
     because it checks every registered dataset in one pass and must judge each
     against its own vocabulary rather than whichever one happens to be on
     screen. */
  function lookup(token, ds) {
    if (!token) return null;
    var byTerm = tableFor(ds === undefined ? active : ds).byTerm;
    var k = String(token).trim().toLowerCase();
    if (byTerm[k]) return byTerm[k];
    // controlled vocabularies arrive with punctuation or qualifiers attached:
    // "ADC + mAb", "phase 1/2", "systematic review"
    k = k.replace(/\s*\+.*$/, '').replace(/[.,;:]$/, '').trim();
    return byTerm[k] || null;
  }

  function all(ds) { return tableFor(ds === undefined ? active : ds).terms.slice(); }

  function groups(ds) {
    var t = tableFor(ds === undefined ? active : ds);
    return t.groupList.map(function (g) {
      return {
        id: g.id, label: g.label,
        terms: t.terms.filter(function (e) { return e.g === g.id; })
      };
    });
  }

  global.Glossary = {
    use: use, lookup: lookup, all: all, groups: groups,
    GROUPS: ENGINE_GROUPS, ENGINE_TERMS: ENGINE_TERMS
  };
})(this);
