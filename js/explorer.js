/* explorer.js — dataset registry, application state, and wiring.

   Datasets self-register (see data/_template.js). They are plain <script> files
   rather than fetched JSON on purpose: browsers block fetch() from file://, so
   JSON would force everyone through a local web server. This way index.html
   works on a double-click.
*/
(function (global) {
  'use strict';

  var datasets = [];      // registration order == picker order
  var byDsId = {};

  /* A lens chooses WHAT the canvas partitions; an axis chooses which tree over
     tumours, and only applies inside the subtypes lens. Risk factors overlap
     arbitrarily and partition nothing, which is why they are a lens rather than
     a fifth axis — see SCHEMA.md. */
  var LENS_VIEWS = {
    start: ['start', 'glossary'],
    risk: ['ranked', 'detection', 'table'],
    subtypes: ['treemap', 'tree', 'table'],
    /* Drugs are a VIEW here, not an axis and not a lens. An axis is a tree over
       tumours summing to 100%; one agent serves several subtypes and every
       subtype has several agents, so drugs partition nothing. */
    targets: ['targets', 'drugs'],
    literature: ['literature'],
    evidence: ['evidence']
  };
  var LENS_ORDER = ['start', 'risk', 'subtypes', 'targets', 'literature', 'evidence'];

  var state = {
    dsId: null,
    /* Layer 0 is the default on a bare load. Every existing hash still names its
       own lens, and a legacy 4-part hash still resolves to `subtypes`, so no
       link anyone already has changes behaviour. */
    lens: 'start',
    axisId: null,
    focusId: null,        // treemap zoom / tree root
    selectedId: null,     // drawer subject (subtypes lens)
    selectedFactorId: null, // drawer subject (risk lens)
    selectedGene: null,   // drawer subject (targets lens, targets view)
    selectedDrugId: null, // drawer subject (targets lens, drugs view)
    litTier: 'all',       // evidence-tier filter in the literature lens
    /* Where the last cross-lens jump came from. Crossing lenses used to be
       one-way and silent: click PIK3CA in a subtype drawer and the subtype is
       simply gone, with no way back and no record that you were ever there. */
    cameFrom: null,       // { lens, view, axisId, nodeId, gene, factorId, label }
    /* Where a target was opened from inside its own lens, on a screen where the
       drawer sits under the lens: the card is then thousands of pixels below
       the dot, and the way back has to be a button, not a long scroll. */
    targetReturn: null,   // { ds, gene, y, label }
    view: 'treemap',
    showRelated: true,
    query: ''
  };

  var dom = {};
  var index = { nodes: {}, children: {}, factors: {} };

  /* ---------------- registration ---------------- */

  function register(ds) {
    if (!ds || !ds.id) {
      console.error('[explorer] register() needs a dataset with an id');
      return;
    }
    if (byDsId[ds.id]) {
      console.warn('[explorer] dataset "' + ds.id + '" registered twice — keeping the first');
      return;
    }
    byDsId[ds.id] = ds;
    datasets.push(ds);
  }

  /* ---------------- indexing ---------------- */

  function reindex(ds) {
    /* The glossary is per-dataset from here on: the engine holds the neutral
       definitions and each dataset supplies its own words and examples. This
       is the one place every change of active dataset passes through, so it is
       where the vocabulary swaps too — miss it and a reader gets the previous
       cancer's definitions under this cancer's nodes. */
    if (global.Glossary && global.Glossary.use) global.Glossary.use(ds);

    index.nodes = {};
    index.children = {};
    index.factors = {};
    (ds.nodes || []).forEach(function (n) { index.nodes[n.id] = n; });
    (ds.nodes || []).forEach(function (n) {
      var key = n.parent == null ? ('__root__' + n.axis) : n.parent;
      (index.children[key] = index.children[key] || []).push(n);
    });
    (ds.factors || []).forEach(function (f) { index.factors[f.id] = f; });
  }

  function ds() { return byDsId[state.dsId]; }
  function nodeById(id) { return index.nodes[id] || null; }
  function factorById(id) { return index.factors[id] || null; }

  /* Views are lens-scoped: "treemap" is meaningless in the risk lens and
     "ranked" is meaningless in the subtypes lens. */
  function viewsFor(lens) { return LENS_VIEWS[lens] || LENS_VIEWS.subtypes; }

  function normaliseView() {
    var allowed = viewsFor(state.lens);
    if (allowed.indexOf(state.view) === -1) state.view = allowed[0];
  }

  function hasFactors() { return ((ds() || {}).factors || []).length > 0; }

  /* One place that decides whether a lens has anything to show, used both to
     hide its button and to skip its card on the Start page. */
  /* Snapshot enough of the current position to come back to it. Taken before a
     cross-lens jump, never during an in-lens move. */
  function snapshot() {
    var label = '';
    if (state.lens === 'subtypes' && state.selectedId) {
      label = (nodeById(state.selectedId) || {}).label || '';
    } else if (state.lens === 'targets' && state.selectedGene) {
      label = state.selectedGene;
    } else if (state.lens === 'risk' && state.selectedFactorId) {
      label = (factorById(state.selectedFactorId) || {}).label || '';
    }
    return {
      lens: state.lens, view: state.view, axisId: state.axisId,
      nodeId: state.selectedId, focusId: state.focusId,
      gene: state.selectedGene, factorId: state.selectedFactorId,
      label: label || LENS_TITLE[state.lens] || state.lens
    };
  }

  function goBack() {
    var f = state.cameFrom;
    if (!f) return;
    state.cameFrom = null;
    state.lens = f.lens;
    state.view = f.view;
    if (f.axisId) state.axisId = f.axisId;
    state.selectedId = f.nodeId;
    state.focusId = f.focusId;
    state.selectedGene = f.gene;
    state.selectedFactorId = f.factorId;
    normaliseView();
    render();
  }

  var LENS_TITLE = {
    start: 'Start', risk: 'Risk & detection', subtypes: 'Subtypes',
    targets: 'Targets', literature: 'Literature', evidence: 'Evidence'
  };

  function lensAvailable(lens) {
    var d = ds() || {};
    if (lens === 'start') return !!(d.profile || (d.facts || {}).overview);
    if (lens === 'risk') return hasFactors() || !!d.detection;
    if (lens === 'targets') return hasTargets();
    if (lens === 'literature') return !!(literatureData() || {}).papers;
    if (lens === 'evidence') return !!d.facts;
    return true;                      // subtypes always exists
  }

  /* The targets overlay is a separate generated file and entirely optional —
     without it the lens simply does not appear. */
  function targetData() { return (ds() || {}).targetData || null; }
  function literatureData() { return (ds() || {}).literatureData || null; }

  function drugById(id) {
    var t = targetData();
    if (!t || !id) return null;
    var list = t.drugs || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* Agents against one gene, furthest along first — so a "DRUGGABLE" flag in a
     subtype drawer can name what actually hits it. */
  function drugsForGene(gene) {
    var t = targetData();
    if (!t || !gene) return [];
    var list = t.drugs || [];
    var hits = list.filter(function (d) { return (d.genes || []).indexOf(gene) !== -1; });
    /* A driver row may name an allele ('BRAF V600E', 'KRAS G12C', 'EGFR exon 20
       insertion') while the overlay indexes agents by gene symbol, so every
       drugged allele row read "flagged druggable, but no agent against it".
       Falling back to the whole gene would over-claim — osimertinib on lung's
       exon 20 row — so an agent counts only when its own indication text names
       the allele. */
    if (!hits.length) {
      var m = /^([A-Z][A-Z0-9-]*)\s+(.+)$/.exec(gene);
      if (m) {
        hits = list.filter(function (d) {
          var text = [d.subtype_label, d.receptor_context, d.target].join(' ');
          return (d.genes || []).indexOf(m[1]) !== -1 && text.indexOf(m[2]) !== -1;
        });
      }
    }
    return hits.sort(function (a, b) { return (b.phase_rank || 0) - (a.phase_rank || 0); });
  }

  /* Papers touching one gene, newest first — used by the target drawer so the
     chain runs protein → drug → its problems → what is being published. */
  function literatureFor(gene) {
    var lit = literatureData();
    if (!lit || !gene) return [];
    return (lit.papers || []).filter(function (p) {
      return (p.genes || []).indexOf(gene) !== -1;
    });
  }

  /* Papers reaching a subtype node, by two routes, in order of directness:
       1. the pipeline's gene->subtype map (an agent used in this subtype)
       2. this node's own driver genes
     A parent node also inherits its children's papers, so selecting
     "HR-positive / HER2-negative" is not empty just because the agents were
     mapped one level down. */
  function literatureForNode(nodeId) {
    var lit = literatureData();
    var node = nodeById(nodeId);
    if (!lit || !node) return [];

    var ids = {};
    ids[nodeId] = true;
    (function walk(id) {
      childrenOf(id).forEach(function (c) { ids[c.id] = true; walk(c.id); });
    })(nodeId);

    var genes = {};
    (((node.molecular || {}).drivers) || []).forEach(function (d) {
      if (d.gene) genes[d.gene] = true;
    });

    return (lit.papers || []).filter(function (p) {
      if ((p.nodes || []).some(function (n) { return ids[n]; })) return true;
      return (p.genes || []).some(function (g) { return genes[g]; });
    });
  }
  function targetByGene(g) { return ((targetData() || {}).genes || {})[g] || null; }
  function hasTargets() {
    var t = targetData();
    return !!(t && t.genes && Object.keys(t.genes).length);
  }

  function childrenOf(id) {
    var n = nodeById(id);
    if (!n) return [];
    return (index.children[id] || []).slice();
  }

  function rootOf(axisId) {
    var list = index.children['__root__' + axisId] || [];
    return list[0] || null;
  }

  function pathOf(id) {
    var out = [], n = nodeById(id), guard = 0;
    while (n && guard++ < 50) { out.unshift(n); n = n.parent ? nodeById(n.parent) : null; }
    return out;
  }

  /* Colour follows the entity's top-level group, never its rank in the current
     view — so filtering or zooming never repaints the survivors. */
  function colorIndexOf(node) {
    var root = rootOf(node.axis);
    if (!root) return 0;
    if (node.id === root.id) return 0;
    var path = pathOf(node.id);
    var top = path.length > 1 ? path[1] : node;
    var tops = childrenOf(root.id);
    var i = tops.findIndex(function (t) { return t.id === top.id; });
    return i < 0 ? 0 : i;
  }

  function legendGroups() {
    var root = rootOf(state.axisId);
    if (!root) return [];
    return childrenOf(root.id).map(function (n, i) {
      return { label: n.shortLabel || n.label, colorIndex: i, id: n.id };
    });
  }

  /* ---------------- search ----------------

     One box, two effects. Typing dims what does not match in the view on
     screen (treemap, tree, ranked factors), and lists every match in this
     cancer under the box, whichever lens holds it. The dimming alone was the
     whole search once: in every other lens it did nothing, and on a phone the
     view it dimmed sat a screen below the box, so typing looked broken.

     Matching is by words, against a copy of each field with punctuation turned
     into spaces: "triple negative" finds "Triple-negative", "cdk4/6" finds
     "CDK4/6". All the words must sit in one field, so a result can say which
     field it matched in. A match in a drug's company name says so, rather than
     passing for a match on the drug. */

  var MIN_QUERY = 2;

  /* One character out for each character in, so a match found in the copy marks
     the same span in the original. */
  function fold(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, ' ');
  }

  function queryWords(q) {
    var f = fold(q).trim();
    if (f.replace(/\s+/g, '').length < MIN_QUERY) return [];
    return f.split(/\s+/);
  }

  var wordsMemo = { q: null, words: [] };
  function words() {
    if (wordsMemo.q !== state.query) wordsMemo = { q: state.query, words: queryWords(state.query) };
    return wordsMemo.words;
  }

  /* A field is [why, text]. `why` null means the text is the item's own name;
     otherwise it is what the result line says the match was in. Order is
     priority: the first field holding every word is the one reported. */
  function nodeFields(n) {
    var m = n.molecular || {};
    var out = [[null, n.label], ['short name', n.shortLabel]];
    (m.drivers || []).forEach(function (d) { out.push(['driver', d.gene]); });
    (m.biomarkers || []).forEach(function (b) { out.push(['biomarker', b.name]); });
    (m.pathways || []).forEach(function (p) { out.push(['pathway', p.name]); });
    (n.triggers || []).forEach(function (t) { out.push(['trigger', t.factor]); });
    (n.therapies || []).forEach(function (t) { out.push(['therapy', t.name]); });
    out.push(['description', n.summary]);
    return out;
  }

  /* Also matches the labels of the subtypes a factor affects, so searching
     "triple-negative" surfaces the factors that push toward it. */
  function factorFields(f) {
    var out = [[null, f.label], ['category', f.category]];
    (f.affects || []).forEach(function (id) {
      var n = nodeById(id);
      out.push(['affects', n ? n.label : id]);
      if (n && n.shortLabel) out.push(['affects', n.shortLabel]);
    });
    out.push(['magnitude', f.magnitude], ['note', f.note]);
    return out;
  }

  /* Prose fields are named, never quoted: a sentence cut out of a summary would
     carry its figures into the result list without their footnotes. */
  var PROSE_FIELDS = { description: 1, note: 1, magnitude: 1, definition: 1 };

  // Lowest rank wins: 0 exact name, 1 name starts with it, 2 a word of the name
  // does, 3 elsewhere in the name, 4 another field. null when nothing matches.
  function scoreFields(fields, ws) {
    var best = null, whole = ws.join(' ');
    for (var i = 0; i < fields.length; i++) {
      var text = fields[i][1];
      if (!text) continue;
      var f = fold(text);
      if (!ws.every(function (w) { return f.indexOf(w) !== -1; })) continue;
      var r = 4;
      if (fields[i][0] === null) {
        var t = f.trim().replace(/\s+/g, ' ');
        r = t === whole ? 0 : t.indexOf(whole) === 0 ? 1 :
          (' ' + t).indexOf(' ' + ws[0]) !== -1 ? 2 : 3;
      }
      if (!best || r < best.rank) best = { rank: r, field: fields[i] };
      if (r === 0) break;
    }
    return best;
  }

  function isDimmed(node) {
    var ws = words();
    if (!ws.length) return false;
    if (scoreFields(nodeFields(node), ws)) return false;
    // keep a node lit if any descendant matches
    var kids = childrenOf(node.id);
    for (var i = 0; i < kids.length; i++) if (!isDimmed(kids[i])) return false;
    return true;
  }

  function isFactorDimmed(f) {
    var ws = words();
    if (!ws.length) return false;
    return !scoreFields(factorFields(f), ws);
  }

  /* The kinds a search reaches, in ladder order — the order groups fall back to
     when their best matches tie. `lens` is the lens a result opens. */
  var SEARCH_GROUPS = [
    { kind: 'term', title: 'Glossary', lens: 'start' },
    { kind: 'factor', title: 'Risk factors', lens: 'risk' },
    { kind: 'node', title: 'Subtypes', lens: 'subtypes' },
    { kind: 'target', title: 'Targets', lens: 'targets' },
    { kind: 'drug', title: 'Drugs', lens: 'targets' },
    { kind: 'paper', title: 'Papers', lens: 'literature' }
  ];
  var GROUP_SHOWN = 5;

  var searchIndex = { dsId: null, entries: [] };

  /* Built once per cancer, from the same records the lenses draw: a result
     cannot name something the lens it opens does not show. */
  function searchEntries() {
    if (searchIndex.dsId === state.dsId) return searchIndex.entries;
    var d = ds() || {}, out = [];

    (d.nodes || []).forEach(function (n) {
      out.push({ kind: 'node', id: n.id, label: n.label, sub: ctx.axisLabelOf(n.axis), fields: nodeFields(n) });
    });
    if (lensAvailable('risk')) {
      (d.factors || []).forEach(function (f) {
        out.push({ kind: 'factor', id: f.id, label: f.label, sub: f.category, fields: factorFields(f) });
      });
    }
    var t = targetData();
    if (t && lensAvailable('targets')) {
      Object.keys(t.genes || {}).forEach(function (g) {
        var protein = ((t.genes[g] || {}).uniprot || {}).protein;
        out.push({ kind: 'target', id: g, label: g, sub: protein,
          fields: [[null, g], ['protein', protein], ['description', (t.genes[g] || {}).why]] });
      });
      (t.drugs || []).forEach(function (x) {
        var f = [[null, x.name], ['code', x.code], ['target', x.target]];
        (x.genes || []).forEach(function (g) { f.push(['gene', g]); });
        f.push(['modality', x.modality], ['company', x.company], ['trial', x.trial_name]);
        // one row per trial, so the trial is what tells two Tagrisso rows apart
        out.push({ kind: 'drug', id: x.id, label: x.name,
          sub: [x.target, x.modality, x.trial_name].filter(Boolean).join(' · '), fields: f });
      });
    }
    if (global.Glossary && lensAvailable('start')) {
      // the groups, not Glossary.all(): a term outside every group is not on the page
      global.Glossary.groups().forEach(function (g) {
        g.terms.forEach(function (e) {
          /* The name shown is what was matched: "EGFR" found only the full
             name once, so the result gave no sign of why it was there. */
          var both = e.full && e.full.toLowerCase() !== e.t.toLowerCase();
          var f = [[null, both ? e.full + ' (' + e.t + ')' : e.t]];
          (e.alias || []).forEach(function (a) { f.push(['also called', a]); });
          f.push(['definition', e.d]);
          out.push({ kind: 'term', id: e.t, label: f[0][1], sub: g.label, fields: f });
        });
      });
    }
    var lit = literatureData();
    if (lit && lensAvailable('literature')) {
      (lit.papers || []).forEach(function (p) {
        var f = [[null, p.title]];
        (p.genes || []).forEach(function (g) { f.push(['about', g]); });
        (p.matched || []).forEach(function (m) { f.push(['mentions', m]); });
        f.push(['authors', p.authors]);
        /* The Literature lens's rule holds here too: no title without its tier
           and species beside it, and unclear printed as unclear. "species"
           goes with it only there, where the bare word would not say what is
           unclear. */
        var species = p.species === 'unclear' ? 'species unclear' : p.species;
        var sub = [p.tier, species, p.journal];
        out.push({ kind: 'paper', id: p.id, label: p.title, url: p.url,
          sub: sub.filter(Boolean).join(' · '), fields: f });
      });
    }
    searchIndex = { dsId: state.dsId, entries: out };
    return out;
  }

  var search = { open: false, expanded: {} };

  function matchedGroups(ws) {
    var byKind = {};
    searchEntries().forEach(function (e, i) {
      var s = scoreFields(e.fields, ws);
      if (!s) return;
      (byKind[e.kind] = byKind[e.kind] || []).push({ e: e, s: s, i: i });
    });
    var groups = [];
    SEARCH_GROUPS.forEach(function (g, order) {
      var hits = byKind[g.kind];
      if (!hits) return;
      hits.sort(function (a, b) { return a.s.rank - b.s.rank || a.i - b.i; });
      groups.push({ def: g, hits: hits, order: order });
    });
    /* Best match first, except papers, which go last: a title that opens with
       "BRCA1" is about the gene, and should not outrank the gene. */
    groups.sort(function (a, b) {
      return (a.def.kind === 'paper') - (b.def.kind === 'paper') ||
        a.hits[0].s.rank - b.hits[0].s.rank || a.order - b.order;
    });
    return groups;
  }

  function mk(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // The name with the first word's first hit marked, built from text nodes.
  function markedLabel(label, ws) {
    var span = mk('span', 'sr-label');
    var f = fold(label), at = f.indexOf(ws[0]);
    if (at === -1 || f.length !== label.length) { span.textContent = label; return span; }
    span.appendChild(document.createTextNode(label.slice(0, at)));
    span.appendChild(mk('mark', null, label.slice(at, at + ws[0].length)));
    span.appendChild(document.createTextNode(label.slice(at + ws[0].length)));
    return span;
  }

  function resultItem(hit, ws) {
    var e = hit.e, item;
    if (e.kind === 'paper') {
      // a paper's detail lives at its publisher, as in the Literature lens
      item = mk('a', 'sr-item sr-paper');
      item.href = e.url; item.target = '_blank'; item.rel = 'noopener';
    } else {
      item = mk('button', 'sr-item');
      item.type = 'button';
      item.addEventListener('click', function () { chooseResult(e); });
    }
    item.appendChild(markedLabel(e.label, ws));
    if (e.sub) item.appendChild(mk('span', 'sr-sub', e.sub));
    var why = hit.s.field[0];
    if (why) {
      item.appendChild(mk('span', 'sr-why', PROSE_FIELDS[why]
        ? 'matched in its ' + why : why + ': ' + hit.s.field[1]));
    }
    return item;
  }

  function renderSearch() {
    var box = dom.searchResults;
    if (!box) return;
    clearNode(box);
    var typed = fold(state.query).replace(/\s+/g, '');
    var show = search.open && typed.length > 0;
    box.hidden = !show;
    dom.search.setAttribute('aria-expanded', String(show));
    if (!show) return;
    var at = dom.searchCtl.getBoundingClientRect();
    box.classList.toggle('from-right', at.left + box.offsetWidth > document.documentElement.clientWidth - 8);

    var ws = words(), name = (ds() || {}).name || '';
    if (!ws.length) {
      box.appendChild(mk('p', 'sr-note', 'Type at least ' + MIN_QUERY + ' letters.'));
      return;
    }
    var groups = matchedGroups(ws);
    var total = groups.reduce(function (s, g) { return s + g.hits.length; }, 0);

    if (!total) {
      // what was searched, generated from what this cancer carries
      var kinds = SEARCH_GROUPS.filter(function (g) {
        return searchEntries().some(function (e) { return e.kind === g.kind; });
      }).map(function (g) { return g.title.toLowerCase(); });
      box.appendChild(mk('p', 'sr-note', 'Nothing in ' + name + ' matches “' + state.query.trim() +
        '”. Searched: ' + kinds.join(', ') + '.'));
      return;
    }

    var count = mk('p', 'sr-count', total + (total === 1 ? ' match' : ' matches') + ' in ' + name);
    count.setAttribute('aria-live', 'polite');
    box.appendChild(count);

    groups.forEach(function (g, gi) {
      var sec = mk('div', 'sr-group');
      var head = mk('div', 'sr-head', g.def.title + ' ');
      head.appendChild(mk('span', 'n', String(g.hits.length)));
      sec.appendChild(head);
      var all = search.expanded[g.def.kind];
      g.hits.slice(0, all ? g.hits.length : GROUP_SHOWN).forEach(function (hit) {
        sec.appendChild(resultItem(hit, ws));
      });
      if (!all && g.hits.length > GROUP_SHOWN) {
        var more = mk('button', 'sr-more', 'Show all ' + g.hits.length);
        more.type = 'button';
        more.addEventListener('click', function () {
          search.expanded[g.def.kind] = true;
          renderSearch();
          // keep the keyboard where it was: on the first item the button revealed
          var shown = box.querySelectorAll('.sr-group')[gi].querySelectorAll('.sr-item');
          if (shown[GROUP_SHOWN]) shown[GROUP_SHOWN].focus();
        });
        sec.appendChild(more);
      }
      box.appendChild(sec);
    });
  }

  function isPhone() { return !!(global.matchMedia && global.matchMedia('(max-width: 640px)').matches); }

  function openSearch() {
    search.open = true;
    if (isPhone()) document.documentElement.classList.add('search-sheet');
    renderSearch();
  }

  function closeSearch() {
    search.open = false;
    // on a phone the box is gone with the sheet, and so should the keyboard be
    if (document.documentElement.classList.contains('search-sheet')) dom.search.blur();
    document.documentElement.classList.remove('search-sheet');
    renderSearch();
  }

  /* Every result goes through the same moves a click inside the lenses makes,
     so a jump across lenses leaves the same "← back" pill behind. */
  function chooseResult(e) {
    closeSearch();
    if (e.kind === 'node') ctx.activate(e.id);
    else if (e.kind === 'factor') {
      if (state.lens !== 'risk') {
        state.cameFrom = snapshot();
        state.lens = 'risk';
        normaliseView();
      }
      state.selectedFactorId = e.id;
      render();
    } else if (e.kind === 'target') {
      if (state.lens === 'targets') state.view = 'targets';
      ctx.selectTarget(e.id);
    } else if (e.kind === 'drug') ctx.selectDrug(e.id);
    else if (e.kind === 'term') {
      if (state.lens !== 'start') state.cameFrom = snapshot();
      state.lens = 'start';
      state.view = 'glossary';
      render();
      var card = dom.tableview.querySelector('.gl-term[data-term="' + global.CSS.escape(e.id) + '"]');
      if (card) {
        card.classList.add('is-found');
        card.scrollIntoView({ block: 'center' });
      }
      return;
    }
    /* Where the drawer sits under the canvas, the thing you picked is a screen
       below where you picked it. */
    if (!dom.drawer.hidden && drawerBelow()) dom.drawer.scrollIntoView({ block: 'start' });
  }

  // css/explorer.css stacks the drawer under the lens at this width
  function drawerBelow() {
    return !!(global.matchMedia && global.matchMedia('(max-width: 1000px)').matches);
  }

  // Arrow keys walk the results; Escape goes back to the box.
  function searchKeys(ev) {
    var items = Array.prototype.slice.call(dom.searchResults.querySelectorAll('.sr-item, .sr-more'));
    var at = items.indexOf(document.activeElement);
    if (ev.key === 'Escape') {
      ev.preventDefault();
      closeSearch();
      dom.search.focus();
    } else if (ev.key === 'ArrowDown' && items.length) {
      ev.preventDefault();
      items[Math.min(at + 1, items.length - 1)].focus();
    } else if (ev.key === 'ArrowUp' && at !== -1) {
      ev.preventDefault();
      if (at === 0) dom.search.focus(); else items[at - 1].focus();
    } else if (ev.key === 'Enter' && ev.target === dom.search && items.length && !dom.searchResults.hidden) {
      ev.preventDefault();
      items[0].click();
    }
  }

  /* ---------------- context handed to the renderer ---------------- */

  var ctx = {
    get axisId() { return state.axisId; },
    get focusId() { return state.focusId; },
    get selectedId() { return state.selectedId; },
    get selectedFactorId() { return state.selectedFactorId; },
    get selectedGene() { return state.selectedGene; },
    get lens() { return state.lens; },
    get view() { return state.view; },
    get showRelated() { return state.showRelated; },
    get markerOrder() { return ((ds() || {}).markers || []).map(function (m) { return m.id; }); },
    dataset: ds,
    nodeById: nodeById,
    factorById: factorById,
    childrenOf: childrenOf,
    rootOf: rootOf,
    pathOf: pathOf,
    colorIndexOf: colorIndexOf,
    legendGroups: legendGroups,
    isDimmed: isDimmed,
    isFactorDimmed: isFactorDimmed,
    axisLabel: function () {
      var a = ((ds() || {}).axes || []).find(function (x) { return x.id === state.axisId; });
      return a ? a.label : '';
    },
    axisLabelOf: function (axisId) {
      var a = ((ds() || {}).axes || []).find(function (x) { return x.id === axisId; });
      return a ? a.label : axisId;
    },
    selectFactor: function (id) {
      state.selectedFactorId = id;
      Render.factorDrawer(dom.drawer, factorById(id), ctx);
      syncHash();
      paintFactorSelection();
    },
    /* Citations are declared once in references[] and cited by id, so anything
       rendering a source has to resolve it here. Free text is passed through
       for legacy inline citations. */
    reference: function (idOrText) {
      if (!idOrText) return null;
      var list = (ds() || {}).references || [];
      for (var i = 0; i < list.length; i++) if (list[i].id === idOrText) return list[i];
      return { label: idOrText };
    },
    axes: function () { return (ds() || {}).axes || []; },
    axisById: function (id) {
      var list = (ds() || {}).axes || [];
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },
    /* Switching classification is the one move the top-bar picker makes silently
       and nothing explains. Reached from the front page's axis cards and from the
       Subtypes lens head, so like activate() it may cross the lens boundary. */
    setAxis: function (axisId, view) {
      var a = ctx.axisById(axisId);
      if (!a) return;
      if (state.lens !== 'subtypes') {
        state.cameFrom = snapshot();
        state.lens = 'subtypes';
        state.view = view && viewsFor('subtypes').indexOf(view) !== -1 ? view : 'treemap';
        syncLensUI();
      } else if (view && viewsFor('subtypes').indexOf(view) !== -1) {
        state.view = view;
      }
      state.axisId = axisId;
      var r = rootOf(axisId);
      state.focusId = r ? r.id : null;
      state.selectedId = null;
      render();
    },
    lensAvailable: lensAvailable,
    setLens: function (lens, view) {
      if (!LENS_VIEWS[lens] || !lensAvailable(lens)) return;
      state.lens = lens;
      if (view && viewsFor(lens).indexOf(view) !== -1) state.view = view;
      normaliseView();
      render();
    },
    literatureData: literatureData,
    literatureFor: literatureFor,
    literatureForNode: literatureForNode,
    get litTier() { return state.litTier; },
    setLitTier: function (t) { state.litTier = t; render(); },
    targetData: targetData,
    targetByGene: targetByGene,
    drugsForGene: drugsForGene,
    get selectedDrugId() { return state.selectedDrugId; },
    selectDrug: function (id) {
      if (!drugById(id)) return;
      // reachable from a druggable driver in a subtype drawer, so it may cross
      // the lens boundary — remember where it came from
      if (state.lens !== 'targets' || state.view !== 'drugs') {
        state.cameFrom = snapshot();
        state.lens = 'targets';
        state.view = 'drugs';
      }
      state.selectedDrugId = id;
      render();
    },
    curatedTarget: function (gene) {
      var list = (ds() || {}).targets || [];
      for (var i = 0; i < list.length; i++) if (list[i].gene === gene) return list[i];
      return null;
    },
    curatedTargets: function () { return (ds() || {}).targets || []; },
    hasTarget: function (g) { return !!targetByGene(g); },
    /* `from` names the place in the lens the target was opened from (a dot,
       a gene button, a table), for the way back. */
    selectTarget: function (gene, from) {
      if (!targetByGene(gene)) return;
      // Reached from a driver bar in the subtype drawer as well as from within
      // the lens, so it may have to cross the lens boundary — and if it does,
      // remember where it came from.
      var within = state.lens === 'targets';
      if (!within) {
        state.cameFrom = snapshot();
        state.lens = 'targets';
        state.view = 'targets';
      }
      state.selectedGene = gene;
      var y = global.scrollY;
      state.targetReturn = within && from && drawerBelow()
        ? { ds: state.dsId, gene: gene, y: y, label: from } : null;
      render();
      /* On a phone the card opened under the gap tables, about five screens
         below the dot that was tapped, and the page did not move. */
      if (drawerBelow() && !dom.drawer.hidden) dom.drawer.scrollIntoView({ block: 'start' });
      /* Beside the chart the card needs no scroll, but rebuilding the lens
         reads the chart's width while it is half-built, the page is briefly
         too short for where the reader is, and the browser clamped the
         scroll: a click on a dot sent a desktop reader to the top. */
      else if (within && global.scrollY !== y) global.scrollTo(0, y);
    },
    get targetReturn() {
      var r = state.targetReturn;
      return r && r.ds === state.dsId && r.gene === state.selectedGene ? r : null;
    },
    returnFromTarget: function () {
      if (state.targetReturn) global.scrollTo(0, state.targetReturn.y);
    },
    get cameFrom() { return state.cameFrom; },
    goBack: goBack,
    select: function (id) {
      if (state.selectedId === id) return;
      state.selectedId = id;
      Render.drawer(dom.drawer, nodeById(id), ctx);
      syncHash();
      paintSelection();
    },
    activate: function (id) {
      var n = nodeById(id);
      if (!n) return;
      /* Reached from a factor's "where it shows up" list, this is the hand-off
         from Book I to Book II — so it may have to cross the lens boundary as
         well as the axis boundary. */
      if (state.lens !== 'subtypes') {
        state.cameFrom = snapshot();
        state.lens = 'subtypes';
        state.view = 'treemap';
        syncLensUI();
      }
      state.axisId = n.axis;
      state.selectedId = id;
      // zoom only when there is somewhere to zoom to
      if (childrenOf(id).length) state.focusId = id;
      else state.focusId = n.parent;
      render();
    }
  };

  /* ---------------- rendering ---------------- */

  function paintSelection() {
    // cheap re-mark without a full redraw
    var groups = dom.svg.querySelectorAll('.node');
    Array.prototype.forEach.call(groups, function (g) {
      var lbl = g.getAttribute('aria-label') || '';
      g.classList.toggle('is-selected', !!state.selectedId &&
        lbl.indexOf((nodeById(state.selectedId) || {}).label || '') === 0);
    });
  }

  function paintFactorSelection() {
    var groups = dom.svg.querySelectorAll('.rk-row');
    Array.prototype.forEach.call(groups, function (g) {
      var lbl = g.getAttribute('aria-label') || '';
      var f = factorById(state.selectedFactorId);
      g.classList.toggle('is-selected', !!f && lbl.indexOf(f.label) === 0);
    });
  }

  function render() {
    var d = ds();
    if (!d) return;

    if (!LENS_VIEWS[state.lens] || !lensAvailable(state.lens)) state.lens = 'subtypes';
    normaliseView();
    syncLensUI();

    // Start has no per-item detail, so it hides the drawer; every other lens
    // needs it back. Reset here rather than in four separate renderers.
    dom.drawer.hidden = false;
    if (dom.main) dom.main.classList.remove('no-drawer');
    renderLadder();
    syncCancerTabs();
    // the shape a tip described is about to be replaced, with no leave event
    Render.tooltip(null);

    if (state.lens === 'start') return renderStart(d);
    if (state.lens === 'risk') return renderRisk(d);
    if (state.lens === 'targets') return renderTargets(d);
    if (state.lens === 'literature') return renderLiterature(d);
    if (state.lens === 'evidence') return renderEvidence(d);
    return renderSubtypes(d);
  }

  /* ---- Layer 0 ---- */

  function renderStart(d) {
    var isGlossary = state.view === 'glossary';
    dom.axisNote.textContent = isGlossary
      ? 'Every term this site assumes you already know, in plain words.' : '';
    clearNode(dom.crumbs);
    clearNode(dom.legend);
    clearNode(dom.drawer);
    if (dom.lensHead) { clearNode(dom.lensHead); dom.lensHead.hidden = true; }

    dom.svg.hidden = true;
    dom.svg.style.display = 'none';
    dom.tableview.hidden = false;
    dom.tableview.className = 'tableview detectionview startview';
    if (isGlossary) Render.glossary(dom.tableview, ctx);
    else Render.start(dom.tableview, ctx);

    // the drawer has nothing to hold here, so it gets out of the way entirely
    dom.drawer.hidden = true;
    if (dom.main) dom.main.classList.add('no-drawer');
    syncHash();
  }

  /* ---- Book IV ---- */

  function renderTargets(d) {
    var isDrugs = state.view === 'drugs';
    dom.axisNote.textContent = isDrugs
      ? 'Every agent in the pipeline, with what its FDA label warns about. Label text, not advice.'
      : 'One row per druggable target: where it is altered, what binds it, ' +
        'how far along that is — and what nobody is doing.';
    clearNode(dom.crumbs);
    clearNode(dom.legend);
    if (dom.lensHead) { clearNode(dom.lensHead); dom.lensHead.hidden = true; }

    dom.svg.hidden = true;
    dom.svg.style.display = 'none';
    dom.tableview.hidden = false;
    dom.tableview.className = 'tableview detectionview ' + (isDrugs ? 'drugsview' : 'targetsview');

    if (isDrugs) {
      Render.drugs(dom.tableview, ctx);
      Render.drugDrawer(dom.drawer, drugById(state.selectedDrugId), ctx);
    } else {
      Render.targets(dom.tableview, ctx);
      Render.targetDrawer(dom.drawer, targetByGene(state.selectedGene), ctx);
    }
    syncHash();
  }

  /* ---- Book V ---- */

  function renderLiterature(d) {
    dom.axisNote.textContent = 'The frontier — what is being published about the problems ' +
      'with the drugs in the Targets lens. Nothing here is ranked by promise.';
    clearNode(dom.crumbs);
    clearNode(dom.legend);
    if (dom.lensHead) { clearNode(dom.lensHead); dom.lensHead.hidden = true; }

    dom.svg.hidden = true;
    dom.svg.style.display = 'none';
    dom.tableview.hidden = false;
    dom.tableview.className = 'tableview detectionview litview';
    Render.literature(dom.tableview, ctx);

    // no per-paper drawer — a paper's detail lives at its publisher
    dom.drawer.hidden = true;
    if (dom.main) dom.main.classList.add('no-drawer');
    syncHash();
  }

  /* ---- Book III ---- */

  function renderEvidence(d) {
    dom.axisNote.textContent = 'Where every number came from, and where the sources disagree with ' +
      'each other. Nothing here is resolved for you.';
    clearNode(dom.crumbs);
    clearNode(dom.legend);
    if (dom.lensHead) { clearNode(dom.lensHead); dom.lensHead.hidden = true; }

    dom.svg.hidden = true;
    dom.svg.style.display = 'none';
    dom.tableview.hidden = false;
    dom.tableview.className = 'tableview detectionview';
    Render.evidence(dom.tableview, ctx);

    Render.drawer(dom.drawer, nodeById(state.selectedId), ctx);
    syncHash();
  }

  /* ---- Book I ---- */

  function renderRisk(d) {
    dom.axisNote.textContent = 'Risk factors overlap and do not partition anything — this is a ranked ' +
      'index over the same evidence the subtype drawers cite, not a fifth classification.';
    clearNode(dom.crumbs);

    Render.riskHead(dom.lensHead, ctx);

    var isTable = state.view === 'table';
    var isDetection = state.view === 'detection';
    var svgHidden = isTable || isDetection;

    dom.svg.hidden = svgHidden;
    dom.svg.style.display = svgHidden ? 'none' : 'block';
    dom.tableview.hidden = !(isTable || isDetection);

    if (isTable) {
      dom.tableview.className = 'tableview riskview';
      Render.riskTable(dom.tableview, ctx);
    } else if (isDetection) {
      dom.tableview.className = 'tableview detectionview';
      Render.detection(dom.tableview, ctx);
    } else {
      dom.svg.style.height = '';
      Render.ranked(dom.svg, ctx);
    }

    if (isDetection) clearNode(dom.legend);
    else Render.riskLegend(dom.legend, ctx);

    Render.factorDrawer(dom.drawer, factorById(state.selectedFactorId), ctx);
    syncHash();
  }

  /* ---- Book II — unchanged behaviour ---- */

  function renderSubtypes(d) {
    var axis = (d.axes || []).find(function (a) { return a.id === state.axisId; }) || d.axes[0];
    state.axisId = axis.id;

    // focus must belong to the current axis
    var f = nodeById(state.focusId);
    if (!f || f.axis !== state.axisId) {
      var r = rootOf(state.axisId);
      state.focusId = r ? r.id : null;
    }

    dom.axisNote.textContent = axis.note || '';
    /* Which of the four ways you are currently looking through, and the other
       three one click away. Without this the axis picker is a bare <select> in
       the top bar and nothing says the four views are alternatives. */
    Render.axisHead(dom.lensHead, ctx);

    var isTable = state.view === 'table';
    dom.svg.hidden = isTable;
    dom.svg.style.display = isTable ? 'none' : 'block';
    dom.tableview.hidden = !isTable;
    dom.tableview.className = 'tableview';

    if (isTable) {
      Render.table(dom.tableview, ctx);
    } else if (state.view === 'tree') {
      dom.svg.style.height = '';
      Render.tree(dom.svg, ctx);
    } else {
      dom.svg.style.height = '';
      Render.treemap(dom.svg, ctx);
    }

    Render.legend(dom.legend, ctx);
    Render.drawer(dom.drawer, nodeById(state.selectedId), ctx);
    renderCrumbs();
    syncHash();
  }

  function clearNode(n) { if (n) while (n.firstChild) n.removeChild(n.firstChild); }

  /* The six lenses are an ordered ladder, not six unrelated tools. Showing the
     rung you are on — and the return path when you arrived by a cross-lens
     link — is what makes them read as one structure. */
  function renderLadder() {
    var bar = dom.ladder;
    if (!bar) return;
    clearNode(bar);

    var f = state.cameFrom;
    if (f) {
      var back = document.createElement('button');
      back.type = 'button';
      back.className = 'back';
      back.textContent = '← back to ' + f.label;
      back.title = 'Return to where you were in the ' + (LENS_TITLE[f.lens] || f.lens) + ' lens';
      back.addEventListener('click', goBack);
      bar.appendChild(back);
    }

    var rungs = LENS_ORDER.filter(lensAvailable);
    var idx = rungs.indexOf(state.lens);
    rungs.forEach(function (id, i) {
      var s = document.createElement('button');
      s.type = 'button';
      s.className = 'rung' + (id === state.lens ? ' on' : '') + (i < idx ? ' below' : '');
      s.textContent = LENS_TITLE[id] || id;
      s.setAttribute('aria-current', id === state.lens ? 'true' : 'false');
      s.title = (i < idx ? 'Closer to everyday knowledge' :
                 i > idx ? 'Closer to the research frontier' : 'You are here');
      s.addEventListener('click', function () {
        if (id === state.lens) return;
        state.cameFrom = null;
        state.lens = id;
        normaliseView();
        render();
      });
      bar.appendChild(s);
    });

    var note = document.createElement('span');
    note.className = 'ladder-note';
    note.textContent = idx <= 0 ? 'everyday knowledge →'
      : idx >= rungs.length - 1 ? '← where the numbers come from'
      : 'everyday knowledge ← → research frontier';
    bar.appendChild(note);
  }

  /* A lens whose data the dataset does not carry is removed, not disabled —
     a dead button invites a click that does nothing. */
  function syncLensAvailability() {
    if (!dom.lensToggle) return;
    Array.prototype.forEach.call(dom.lensToggle.querySelectorAll('button'), function (b) {
      b.hidden = !lensAvailable(b.dataset.lens);
    });
  }

  /* Lens buttons, the axis picker's visibility, and the view toggle's contents
     all depend on the lens — keep them in one place so they cannot drift. */
  function syncLensUI() {
    if (dom.lensToggle) {
      Array.prototype.forEach.call(dom.lensToggle.querySelectorAll('button'), function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.lens === state.lens));
      });
    }
    if (dom.axisCtl) dom.axisCtl.hidden = state.lens !== 'subtypes';
    if (dom.relatedCtl) dom.relatedCtl.hidden = state.lens !== 'subtypes';

    /* The axis is set from four other places besides this picker — setAxis(),
       activate() crossing an axis, applyHash(), and the renderSubtypes fallback.
       Syncing here rather than in each of them means the picker cannot drift out
       of step with the canvas. Guarded because assigning an id with no matching
       <option> blanks the select instead of erroring. */
    if (dom.selAxis && state.axisId &&
        dom.selAxis.querySelector('option[value="' + state.axisId + '"]')) {
      dom.selAxis.value = state.axisId;
    }

    var allowed = viewsFor(state.lens);
    if (dom.viewToggle) {
      Array.prototype.forEach.call(dom.viewToggle.querySelectorAll('button'), function (b) {
        var ok = allowed.indexOf(b.dataset.view) !== -1;
        b.hidden = !ok;
        b.setAttribute('aria-pressed', String(ok && b.dataset.view === state.view));
      });
    }
    // a one-view lens does not need a picker
    if (dom.viewCtl) dom.viewCtl.hidden = allowed.length < 2;
  }

  function renderCrumbs() {
    var c = dom.crumbs;
    while (c.firstChild) c.removeChild(c.firstChild);
    var path = state.focusId ? pathOf(state.focusId) : [];
    path.forEach(function (n, i) {
      if (i) {
        var sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = '›';
        c.appendChild(sep);
      }
      if (i === path.length - 1) {
        var cur = document.createElement('span');
        cur.className = 'current';
        cur.textContent = n.label;
        c.appendChild(cur);
      } else {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = n.label;
        b.addEventListener('click', function () {
          state.focusId = n.id;
          state.selectedId = n.id;
          render();
        });
        c.appendChild(b);
      }
    });
  }

  /* ---------------- hash routing ---------------- */

  var suppressHash = false;

  function syncHash() {
    if (suppressHash) return;
    // #<dataset>/<lens>/<axis|->/<selected|->/<view>
    var slot3 = state.lens === 'subtypes' ? (state.axisId || '-') : '-';
    var slot4 = state.lens === 'subtypes' ? (state.selectedId || '-')
      : state.lens === 'targets' ? (state.view === 'drugs'
          ? (state.selectedDrugId || '-') : (state.selectedGene || '-'))
      : (state.selectedFactorId || '-');
    var next = '#' + [state.dsId, state.lens, slot3, slot4, state.view].join('/');
    if (global.location.hash !== next) {
      suppressHash = true;
      global.history.replaceState(null, '', next);
      suppressHash = false;
    }
  }

  /* Accepts both the current 5-part form and the original
     #<dataset>/<axis>/<selected>/<view>, so links written before the lens
     existed still land where they used to. The two are told apart by whether
     slot 1 names a lens or an axis. */
  function applyHash() {
    var raw = (global.location.hash || '').replace(/^#/, '');
    if (!raw) return false;
    var p = raw.split('/');

    if (p[0] && byDsId[p[0]]) {
      state.dsId = p[0];
      reindex(ds());
    }
    var d = ds();
    if (!d) return false;
    /* The axis carried over from the previous dataset (at start-up, always
       the first one's default) may not exist here. Left alone, a link like
       #lung/subtypes/-/-/treemap kept breast's axis and the Classify-by
       picker showed blank. */
    if (!(d.axes || []).some(function (a) { return a.id === state.axisId; })) {
      state.axisId = ((d.axes || []).find(function (a) { return a.default; }) || (d.axes || [])[0] || {}).id;
    }

    var isLegacy = !LENS_VIEWS[p[1]];
    if (isLegacy) {
      state.lens = 'subtypes';
      p = [p[0], 'subtypes', p[1], p[2], p[3]];
    } else {
      state.lens = p[1];
    }
    if (!lensAvailable(state.lens)) state.lens = 'subtypes';

    if (p[2] && (d.axes || []).some(function (a) { return a.id === p[2]; })) state.axisId = p[2];

    if (p[3] && p[3] !== '-') {
      if (state.lens === 'risk' && index.factors[p[3]]) {
        state.selectedFactorId = p[3];
      } else if (state.lens === 'targets' && targetByGene(p[3])) {
        state.selectedGene = p[3];
      } else if (state.lens === 'targets' && drugById(p[3])) {
        state.selectedDrugId = p[3];
        state.view = 'drugs';
      } else if (index.nodes[p[3]]) {
        state.selectedId = p[3];
        var n = index.nodes[p[3]];
        state.axisId = n.axis;
        state.focusId = childrenOf(n.id).length ? n.id : n.parent;
      }
    }

    if (p[4] && viewsFor(state.lens).indexOf(p[4]) !== -1) state.view = p[4];
    normaliseView();
    return true;
  }

  /* ---------------- boot ---------------- */

  function boot() {
    dom = {
      dsName: document.getElementById('ds-name'),
      dsSub: document.getElementById('ds-sub'),
      selDataset: document.getElementById('sel-dataset'),
      selAxis: document.getElementById('sel-axis'),
      axisCtl: document.getElementById('ctl-axis'),
      lensToggle: document.getElementById('lens-toggle'),
      lensHead: document.getElementById('lenshead'),
      viewCtl: document.getElementById('ctl-view'),
      viewToggle: document.getElementById('view-toggle'),
      chkRelated: document.getElementById('chk-related'),
      relatedCtl: document.getElementById('ctl-related'),
      search: document.getElementById('search'),
      searchCtl: document.getElementById('ctl-search'),
      searchResults: document.getElementById('search-results'),
      searchOpen: document.getElementById('search-open'),
      searchClose: document.getElementById('search-close'),
      cancerTabs: document.getElementById('cancer-tabs'),
      themeToggle: document.getElementById('theme-toggle'),
      axisNote: document.getElementById('axis-note'),
      ladder: document.getElementById('ladder'),
      crumbs: document.getElementById('crumbs'),
      svg: document.getElementById('viz'),
      tableview: document.getElementById('tableview'),
      legend: document.getElementById('legend'),
      drawer: document.getElementById('drawer'),
      empty: document.getElementById('empty'),
      canvas: document.getElementById('canvas'),
      main: document.querySelector('.main'),
      footMeta: document.getElementById('foot-meta')
    };

    if (!datasets.length) return showEmpty();

    // merge computed overlays before validating, so the schema check sees the
    // dataset the viewer will actually render
    datasets.forEach(function (d) {
      Facts.report(d.id, Facts.apply(d));
      /* The targets overlay is attached whole rather than merged onto nodes:
         its subject is the protein, not the subtype, so there is nothing to
         merge it onto. Absent overlay simply means no targets lens. */
      var tt = (global.CancerExplorerTargets || {})[d.id];
      if (tt) {
        d.targetData = tt;
        console.info('[targets] ' + d.id + ': ' + Object.keys(tt.genes || {}).length +
          ' target(s), ' + ((tt.drugs || []).length) + ' agent(s)');
      }
      var lt = (global.CancerExplorerLiterature || {})[d.id];
      if (lt) {
        d.literatureData = lt;
        console.info('[literature] ' + d.id + ': ' + lt.n_papers + ' paper(s) since ' +
          lt.since + ' — ' + ((lt.by_tier || {}).preprint || 0) + ' preprint(s), ' +
          ((lt.by_species || {}).mouse || 0) + ' mouse study/studies');
      }
    });

    // validate every registered dataset; report to console, keep going
    datasets.forEach(function (d) {
      var res = Validate.dataset(d);
      Validate.report(d.id, res);
      if (res.errors.length) {
        console.warn('[explorer] "' + d.id + '" has schema errors — rendering anyway, expect gaps.');
      }
    });

    state.dsId = datasets[0].id;
    reindex(ds());
    state.axisId = (ds().axes.find(function (a) { return a.default; }) || ds().axes[0]).id;
    applyHash();
    if (!byDsId[state.dsId]) state.dsId = datasets[0].id;
    reindex(ds());

    // dataset picker
    dom.selDataset.innerHTML = '';
    datasets.forEach(function (d) {
      var o = document.createElement('option');
      o.value = d.id; o.textContent = d.name;
      dom.selDataset.appendChild(o);
    });
    dom.selDataset.value = state.dsId;
    dom.selDataset.disabled = datasets.length < 2;
    dom.selDataset.addEventListener('change', function () { switchDataset(dom.selDataset.value); });

    // the same picker as tabs, for the phone's top strip
    if (dom.cancerTabs) {
      datasets.forEach(function (d) {
        var b = document.createElement('button');
        b.type = 'button';
        b.dataset.ds = d.id;
        b.textContent = d.name.replace(/\s+cancer$/i, '');
        b.title = d.name;
        b.addEventListener('click', function () { switchDataset(d.id); });
        dom.cancerTabs.appendChild(b);
      });
    }

    dom.chkRelated.checked = state.showRelated;
    dom.chkRelated.addEventListener('change', function () {
      state.showRelated = dom.chkRelated.checked;
      render();
    });

    // hide the whole lens control when a dataset has no Book I material at all
    if (dom.lensToggle) {
      dom.lensToggle.hidden = LENS_ORDER.filter(lensAvailable).length < 2;
      syncLensAvailability();
      Array.prototype.forEach.call(dom.lensToggle.querySelectorAll('button'), function (b) {
        b.addEventListener('click', function () {
          if (state.lens === b.dataset.lens) return;
          state.lens = b.dataset.lens;
          normaliseView();
          render();
        });
      });
    }

    Array.prototype.forEach.call(dom.viewToggle.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        if (viewsFor(state.lens).indexOf(b.dataset.view) === -1) return;
        state.view = b.dataset.view;
        render();
      });
    });

    var searchTimer = null;
    dom.search.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        state.query = dom.search.value.trim();
        search.expanded = {};
        search.open = true;
        render();
        renderSearch();
      }, 140);
    });
    dom.search.addEventListener('focus', function () { if (!search.open) openSearch(); });
    dom.search.addEventListener('click', function () { if (!search.open) openSearch(); });
    dom.search.addEventListener('keydown', searchKeys);
    dom.searchResults.addEventListener('keydown', searchKeys);
    // a click anywhere outside the box and its list closes the list
    document.addEventListener('pointerdown', function (ev) {
      if (search.open && !dom.searchCtl.contains(ev.target) &&
          !(dom.searchOpen && dom.searchOpen.contains(ev.target))) closeSearch();
    });
    if (dom.searchOpen) {
      dom.searchOpen.addEventListener('click', function () {
        openSearch();
        dom.search.focus();
      });
    }
    if (dom.searchClose) dom.searchClose.addEventListener('click', closeSearch);

    dom.themeToggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : cur === 'light' ? 'dark'
        : (Render.mode() === 'dark' ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', next);
      render();
    });

    global.addEventListener('hashchange', function () {
      if (suppressHash) return;
      if (applyHash()) { fillAxes(); render(); }
    });

    // a fixed tip stays put while the page moves under it
    global.addEventListener('scroll', function () { Render.tooltip(null); }, { passive: true });

    var resizeTimer = null;
    global.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 160);
    });

    // clicking the background zooms out one level — only the subtypes lens zooms
    dom.canvas.addEventListener('click', function () {
      if (state.lens !== 'subtypes') return;
      var f = nodeById(state.focusId);
      if (f && f.parent) { state.focusId = f.parent; render(); }
    });

    fillAxes();
    applyMeta();
    render();
  }

  /* The one way the cancer changes, from the picker or a tab. Selections are
     ids into the old cancer's records, so they go (a drug id like drug-0 would
     silently name another cancer's drug), and so does the way back, which would
     land on a subtype this cancer does not have. The gene stays: a symbol names
     the same protein in every cancer. */
  function switchDataset(id) {
    if (!byDsId[id] || id === state.dsId) return;
    state.dsId = id;
    reindex(ds());
    state.axisId = (ds().axes.find(function (a) { return a.default; }) || ds().axes[0]).id;
    state.focusId = null;
    state.selectedId = null;
    state.selectedFactorId = null;
    state.selectedDrugId = null;
    state.cameFrom = null;
    dom.selDataset.value = id;
    if (dom.lensToggle) {
      dom.lensToggle.hidden = LENS_ORDER.filter(lensAvailable).length < 2;
      syncLensAvailability();
    }
    fillAxes();
    applyMeta();
    render();
    renderSearch();
  }

  function syncCancerTabs() {
    var bar = dom.cancerTabs;
    if (!bar) return;
    Array.prototype.forEach.call(bar.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.ds === state.dsId));
    });
  }

  function fillAxes() {
    var d = ds();
    dom.selAxis.innerHTML = '';
    (d.axes || []).forEach(function (a) {
      var o = document.createElement('option');
      o.value = a.id; o.textContent = a.label;
      dom.selAxis.appendChild(o);
    });
    dom.selAxis.value = state.axisId;
    dom.selAxis.onchange = function () {
      state.axisId = dom.selAxis.value;
      state.focusId = null;
      state.selectedId = null;
      render();
    };
  }

  function applyMeta() {
    var d = ds();
    dom.dsName.textContent = d.name + ' — Subtype Explorer';
    dom.dsSub.textContent = d.overview || '';
    var bits = [];
    if (d.incidence) bits.push(d.incidence);
    if (d.lastVerified) bits.push('Data verified ' + d.lastVerified);
    dom.footMeta.textContent = bits.join('  ·  ');
  }

  function showEmpty() {
    dom.empty.hidden = false;
    dom.svg.style.display = 'none';
    dom.legend.style.display = 'none';
    dom.empty.innerHTML = '';
    var hd = document.createElement('h2');
    hd.textContent = 'No dataset loaded';
    var p = document.createElement('p');
    p.innerHTML = 'Copy <code>data/_template.js</code>, fill it in, and add a ' +
      '<code>&lt;script&gt;</code> tag for it in <code>index.html</code>. ' +
      'See <code>README.md</code>.';
    dom.empty.appendChild(hd);
    dom.empty.appendChild(p);
    dom.dsSub.textContent = 'Waiting for a dataset.';
  }

  global.CancerExplorer = {
    register: register,
    boot: boot,
    _state: state,
    _datasets: datasets
  };
})(this);
