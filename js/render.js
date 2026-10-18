/* render.js — all SVG/DOM drawing. Cancer-agnostic: it only knows the schema.

   Render.treemap / Render.tree / Render.table draw the current view.
   Render.drawer fills the detail panel. Render.legend draws the key.

   The categorical palette is duplicated here (it also lives in explorer.css)
   because we need the resolved hex to compute label contrast — var() cannot be
   read back out of a presentation attribute. Keep the two in sync; the order is
   the dataviz reference instance and is a CVD-safety mechanism, not cosmetic.
*/
(function (global) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  var PALETTE = {
    light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
    dark:  ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767']
  };
  var SURFACE = { light: '#fcfcfb', dark: '#1a1a19' };
  var INK = { light: '#0b0b0b', dark: '#ffffff' };

  /* ---------------- helpers ---------------- */

  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVG_NS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function mode() {
    var stamped = document.documentElement.getAttribute('data-theme');
    if (stamped === 'dark') return 'dark';
    if (stamped === 'light') return 'light';
    return global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  }

  function luminance(hex) {
    var c = hexToRgb(hex).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  /* Ink that actually contrasts with the fill — never assume white. */
  function inkOn(hex) {
    return luminance(hex) > 0.42 ? '#0b0b0b' : '#ffffff';
  }

  function mix(hex, pct, towardHex) {
    var a = hexToRgb(hex), b = hexToRgb(towardHex), f = pct / 100;
    var r = Math.round(a[0] * f + b[0] * (1 - f));
    var g = Math.round(a[1] * f + b[1] * (1 - f));
    var bl = Math.round(a[2] * f + b[2] * (1 - f));
    return '#' + [r, g, bl].map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
  }

  function seriesColor(i) {
    var p = PALETTE[mode()];
    return p[i % p.length];
  }

  function fmtPct(v) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    return (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10) + '%';
  }

  /* A computed figure has an explicit denominator, so it keeps the decimal
     that a curated estimate does not earn. */
  function fmtExact(v) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    return (Math.round(v * 10) / 10) + '%';
  }

  /* SEER publishes these to one decimal. Printing 13.0 as "13%" and 0.0 as
     "0%" drops precision the source has, and "0%" reads as "nobody" where
     the table means under 0.05%. */
  function fmtPub(v, unit) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    return v.toFixed(1) + (unit == null ? '%' : unit);
  }

  function truncate(s, max) {
    if (!s) return '';
    return s.length <= max ? s : s.slice(0, Math.max(0, max - 1)) + '…';
  }

  /* Which subtype of THIS cancer a generated record describes. The field was
     once `pam50_label`, named for breast's classifier; every overlay has
     since been regenerated, so only the neutral name is read. */
  function subtypeLabelOf(rec) {
    if (!rec) return '';
    return rec.subtype_label != null ? rec.subtype_label : '';
  }

  /* A node id as a reader would name it. The gap tables printed raw ids —
     harmless for breast's "basal-like", unreadable for lung's "drv-other". */
  function nodeName(ctx, id) {
    var n = id && ctx && ctx.nodeById ? ctx.nodeById(id) : null;
    return n ? (n.shortLabel || n.label) : (id || '');
  }

  /* The dataset's own name, for sentences that have to say which disease a
     figure describes — the scope guard especially, where "not of breast cancer
     overall" was a literal and would have lied under any other dataset. Used
     verbatim rather than lower-cased: "Hodgkin Lymphoma" must not become
     "hodgkin lymphoma" to save one capital letter. */
  function cancerName(ctx) {
    var d = ctx && typeof ctx.dataset === 'function' ? ctx.dataset() : null;
    return (d && d.name) ? d.name : 'this cancer';
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------------- inline definitions ----------------

     Used only where the app renders a CONTROLLED VOCABULARY — a modality cell,
     a phase badge, an evidence tier, a basis chip. Those are known positions
     with known values, so the lookup is exact and cannot mislabel prose.
     Nothing here scans running text.
  ------------------------------------------------------ */

  var defPanel = null;

  function closeDef() {
    if (defPanel && defPanel.parentNode) defPanel.parentNode.removeChild(defPanel);
    defPanel = null;
  }

  function openDef(entry, anchor) {
    closeDef();
    if (!entry) return;
    var p = h('div', 'defpop');

    var head = h('div', 'dp-head');
    head.appendChild(h('span', 'tm', entry.full || entry.t));
    if (entry.full && entry.full.toLowerCase() !== entry.t.toLowerCase()) {
      head.appendChild(h('span', 'ab', entry.t));
    }
    var close = h('button', 'x', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close definition');
    close.addEventListener('click', function (e) { e.stopPropagation(); closeDef(); });
    head.appendChild(close);
    p.appendChild(head);

    p.appendChild(h('p', 'd', entry.d));
    if (entry.w) {
      var w = h('p', 'w');
      w.appendChild(h('span', 'k', 'Why it matters here'));
      w.appendChild(document.createTextNode(entry.w));
      p.appendChild(w);
    }

    document.body.appendChild(p);
    defPanel = p;

    var r = anchor.getBoundingClientRect();
    var pr = p.getBoundingClientRect();
    var left = Math.min(Math.max(8, r.left), global.innerWidth - pr.width - 8);
    var top = r.bottom + 6;
    if (top + pr.height > global.innerHeight - 8) top = Math.max(8, r.top - pr.height - 6);
    p.style.left = left + 'px';
    p.style.top = top + 'px';
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
      if (defPanel && !defPanel.contains(e.target) && !e.target.closest('.term')) closeDef();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDef(); });
  }

  /* Wrap a controlled-vocabulary value so it can explain itself. Returns a plain
     span when the term is not in the glossary, so callers never have to check. */
  function term(text, cls, lookupAs) {
    var entry = global.Glossary && global.Glossary.lookup(lookupAs || text);
    if (!entry) return h('span', cls || null, text);
    var b = h('button', (cls ? cls + ' ' : '') + 'term');
    b.type = 'button';
    b.textContent = text;
    b.title = (entry.full || entry.t) + ' — click for a plain-language definition';
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      openDef(entry, b);
    });
    return b;
  }

  /* Narrative text with definitions the AUTHOR marked, written `{{IHC}}` or
     `{{pathology report|the report}}` when the displayed words differ from the
     glossary key.

     This is the same rule as term(), not a loophole in it: nothing is scanned
     and nothing is guessed. A person decided that this occurrence of this word,
     in this sentence, is where a reader gets stuck. An unmatched marker degrades
     to plain text — and the validator reports it, so it cannot rot quietly. */
  var deadMarkers = {};

  function prose(text, cls, tag) {
    var p = h(tag || 'p', cls || null);
    String(text == null ? '' : text).split(/(\{\{[^}]*\}\})/).forEach(function (part) {
      var m = /^\{\{([^}|]+)(?:\|([^}]*))?\}\}$/.exec(part);
      if (!m) { if (part) p.appendChild(document.createTextNode(part)); return; }
      var key = m[1].trim();
      /* The validator walks the dataset for these, but ledes written in this
         file are not in the dataset — so the check has to live here too, or
         half of them go unchecked. Once per key, not once per render. */
      if (!deadMarkers[key] && !(global.Glossary && global.Glossary.lookup(key)) &&
          global.console && console.warn) {
        deadMarkers[key] = true;
        console.warn('render: inline definition marker {{' + key + '}} has no glossary entry — ' +
          'it renders as plain text');
      }
      p.appendChild(term((m[2] || m[1]).trim(), null, key));
    });
    return p;
  }

  /* One headline figure with its caption. Shared by both drawers. */
  function stat(v, k) {
    var d = h('div', 'stat');
    d.appendChild(h('span', 'v', v));
    d.appendChild(h('span', 'k', k));
    return d;
  }

  /* ---------------- tooltip ---------------- */

  var tipEl = null;

  function tooltip(html, evt) {
    if (!tipEl) tipEl = document.getElementById('tip');
    if (!tipEl) return;
    if (!html) { tipEl.hidden = true; return; }
    tipEl.hidden = false;
    clear(tipEl);
    tipEl.appendChild(html);
    var pad = 14;
    var r = tipEl.getBoundingClientRect();
    var x = evt.clientX + pad;
    var y = evt.clientY + pad;
    if (x + r.width > global.innerWidth - 8) x = evt.clientX - r.width - pad;
    if (y + r.height > global.innerHeight - 8) y = evt.clientY - r.height - pad;
    tipEl.style.left = Math.max(8, x) + 'px';
    tipEl.style.top = Math.max(8, y) + 'px';
  }

  /* "cases" — unless the axis partitions only part of the disease, in which
     case every share names the part. Lung's driver classes are shares of
     adenocarcinoma; "25% of cases" beside KRAS would say all lung cancer. One
     rule for every place a share is captioned — tooltip, drawer, Start card and
     the treemap and tree legends — so no one of them can drift back to "cases".

     `shareOf` is the other way a share can fail to be of cases: the whole
     disease, but a different quantity. Colorectal's site shares divide the
     age-adjusted incidence RATE, and "37.7% of cases" beside the proximal colon
     contradicted the axis note printed above the same chart. */
  function shareWhole(axis) {
    var pop = axis && axis.population;
    if (pop && pop.label) return pop.short || pop.label;
    return axis && axis.shareOf ? axis.shareOf : 'cases';
  }

  function shareCaption(ctx, node) {
    var ax = node && ctx && ctx.axisById ? ctx.axisById(node.axis) : null;
    return 'of ' + shareWhole(ax);
  }

  function populationLine(pop, axis) {
    var s = pop.label;
    if (typeof pop.share === 'number') s += ' — about ' + fmtExact(pop.share) + ' of all cases';
    if (axis && axis.partition === false) {
      return s + '. The nodes on this axis are compared cohorts drawn from this group, not shares of it.';
    }
    return s + '. Every share on this axis is a share of this group, not of every case.';
  }

  function nodeTip(node, ctx) {
    var box = document.createDocumentFragment();
    box.appendChild(h('div', 't-title', node.label));
    if (typeof node.prevalence === 'number') {
      box.appendChild(h('div', 't-row', fmtPct(node.prevalence) + ' ' + shareCaption(ctx, node)));
    }
    if (node.markers && ctx.markerOrder.length) {
      var bits = ctx.markerOrder.filter(function (m) { return node.markers[m] != null; })
        .map(function (m) { return m + ' ' + node.markers[m]; });
      if (bits.length) box.appendChild(h('div', 't-row', bits.join('  ·  ')));
    }
    var drivers = (node.molecular || {}).drivers || [];
    if (drivers.length) {
      box.appendChild(h('div', 't-row', 'Top driver: ' + drivers[0].gene +
        (typeof drivers[0].frequency === 'number' ? ' ' + fmtPct(drivers[0].frequency) : '')));
    }
    var kids = ctx.childrenOf(node.id).length;
    box.appendChild(h('div', 't-hint', kids ? 'Click to zoom in · ' + kids + ' subtype(s)' : 'Click for detail'));
    return box;
  }

  /* ---------------- treemap ---------------- */

  function treemap(svg, ctx) {
    clear(svg);
    var W = svg.clientWidth || svg.parentNode.clientWidth || 800;
    var H = svg.clientHeight || 560;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var kids = ctx.childrenOf(ctx.focusId);
    if (!kids.length) {
      var t = el('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', fill: 'currentColor', opacity: 0.6 }, svg);
      t.textContent = 'No sub-types below this level — see the detail panel.';
      return;
    }

    // Nodes without prevalence still need to appear; give them the sibling mean.
    var known = kids.filter(function (n) { return typeof n.prevalence === 'number'; });
    var fallback = known.length ? known.reduce(function (s, n) { return s + n.prevalence; }, 0) / known.length : 1;

    var items = kids.map(function (n, i) {
      return { node: n, idx: i, value: typeof n.prevalence === 'number' ? n.prevalence : fallback };
    });

    var cells = global.Layouts.squarify(items, { x: 0, y: 0, w: W, h: H });
    var m = mode();

    cells.forEach(function (c) {
      var base = seriesColor(ctx.colorIndexOf(c.node));
      var g = el('g', { class: 'node' + (ctx.selectedId === c.node.id ? ' is-selected' : '') +
        (ctx.isDimmed(c.node) ? ' is-dimmed' : ''), tabindex: '0', role: 'button' }, svg);
      g.setAttribute('aria-label', c.node.label + ', ' + fmtPct(c.node.value != null ? c.node.value : c.node.prevalence));

      var rect = el('rect', { x: c.x, y: c.y, width: c.w, height: c.h, rx: 4 }, g);
      rect.style.fill = base;

      var ink = inkOn(base);
      var grandkids = ctx.childrenOf(c.node.id);
      var nest = grandkids.length && c.w > 132 && c.h > 78;
      var headH = nest ? 26 : 0;

      // label block
      if (c.w > 54 && c.h > 26) {
        var maxChars = Math.max(3, Math.floor((c.w - 14) / 7.1));
        var lb = el('text', { x: c.x + 8, y: c.y + 18, class: 'n-label', fill: ink }, g);
        lb.textContent = truncate(c.node.shortLabel || c.node.label, maxChars);
        if (c.h > 44 && !nest) {
          var vt = el('text', { x: c.x + 8, y: c.y + 34, class: 'n-value', fill: ink, opacity: 0.85 }, g);
          // A node with no share (a compared cohort) prints nothing, not a dash.
          vt.textContent = typeof c.node.prevalence === 'number' ? fmtPct(c.node.prevalence) : '';
        } else if (nest) {
          var vt2 = el('text', { x: c.x + c.w - 8, y: c.y + 18, class: 'n-value', fill: ink,
            opacity: 0.85, 'text-anchor': 'end' }, g);
          vt2.textContent = typeof c.node.prevalence === 'number' ? fmtPct(c.node.prevalence) : '';
        }
      }

      bindNode(g, c.node, ctx);

      // one nested level, tinted toward the surface so depth reads
      if (nest) {
        var inner = { x: c.x + 4, y: c.y + headH, w: c.w - 8, h: c.h - headH - 4 };
        var gk = grandkids.filter(function (n) { return typeof n.prevalence === 'number'; });
        if (!gk.length) gk = grandkids.map(function (n) { return n; });
        var sub = global.Layouts.squarify(gk.map(function (n, i) {
          return { node: n, value: typeof n.prevalence === 'number' ? n.prevalence : 1 };
        }), inner);

        var tint = mix(base, 52, SURFACE[m]);
        var subInk = inkOn(tint);

        sub.forEach(function (s) {
          var sg = el('g', { class: 'node' + (ctx.selectedId === s.node.id ? ' is-selected' : '') +
            (ctx.isDimmed(s.node) ? ' is-dimmed' : ''), tabindex: '0', role: 'button' }, svg);
          sg.setAttribute('aria-label', s.node.label + ', ' + fmtPct(s.node.prevalence));
          var sr = el('rect', { x: s.x, y: s.y, width: s.w, height: s.h, rx: 3 }, sg);
          sr.style.fill = tint;
          if (s.w > 46 && s.h > 20) {
            var maxC = Math.max(3, Math.floor((s.w - 10) / 6.2));
            var st = el('text', { x: s.x + 6, y: s.y + 15, class: 'n-sub', fill: subInk }, sg);
            st.textContent = truncate(s.node.shortLabel || s.node.label, maxC);
            if (s.h > 32) {
              var sv = el('text', { x: s.x + 6, y: s.y + 28, class: 'n-sub', fill: subInk, opacity: 0.8 }, sg);
              sv.textContent = typeof s.node.prevalence === 'number' ? fmtPct(s.node.prevalence) : '';
            }
          }
          bindNode(sg, s.node, ctx);
        });
      }
    });
  }

  /* ---------------- tree ---------------- */

  /* Floor on the node radius, shared with the legend so the two cannot drift.
     3.5px rather than 5: the whole <g> is the hit target — circle AND label —
     so a small dot is still easy to click, and every px of floor is a px of
     exaggeration. At 3.5 the floor binds below ~4.2% instead of ~8.6%, which
     halves the number of nodes drawn bigger than they are. */
  var TREE_R_MIN = 3.5;
  var TREE_R_K = 1.7;
  // Below this share the floor binds and the circle is bigger than its value.
  var TREE_R_EXACT_ABOVE = (TREE_R_MIN / TREE_R_K) * (TREE_R_MIN / TREE_R_K);

  function tree(svg, ctx) {
    clear(svg);
    var root = ctx.nodeById(ctx.focusId) || ctx.rootOf(ctx.axisId);
    if (!root) return;

    // nodeGap must clear two stacked text lines (label 12.5px + sub 11px) or
    // sibling labels collide — 40 leaves visible breathing room.
    var built = global.Layouts.tidyTree(root, {
      levelGap: 208,
      nodeGap: 40,
      getChildren: function (n) { return ctx.childrenOf(n.id); }
    });

    var padL = 26, padT = 28, padR = 250, padB = 26;
    var W = Math.max((svg.clientWidth || 800), built.width + padL + padR);
    var H = Math.max(360, built.height + padT + padB);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.height = H + 'px';

    var pos = {};
    built.nodes.forEach(function (r) {
      pos[r.node.id] = { x: r.x + padL, y: r.y + padT, node: r.node };
    });

    // hierarchy links first (under the marks)
    built.links.forEach(function (l) {
      var a = pos[l.source.node.id], b = pos[l.target.node.id];
      el('path', { class: 'link', d: global.Layouts.elbow(a.x, a.y, b.x, b.y) }, svg);
    });

    // cross-cutting relationships
    if (ctx.showRelated) {
      built.nodes.forEach(function (r) {
        (r.node.related || []).forEach(function (rel) {
          var a = pos[r.node.id], b = pos[rel.to];
          if (!a || !b) return;                    // target lives on another axis
          if (a.y > b.y) return;                   // draw each pair once
          var bow = 40 + Math.abs(a.y - b.y) * 0.18;
          var p = el('path', { class: 'rel-link', d: global.Layouts.arc(a.x, a.y, b.x, b.y, bow) }, svg);
          var ttl = el('title', null, p);
          ttl.textContent = (rel.kind || 'related') + ': ' + r.node.label + ' ↔ ' +
            (ctx.nodeById(rel.to) || {}).label + (rel.note ? ' — ' + rel.note : '');
        });
      });
    }

    built.nodes.forEach(function (r) {
      var n = r.node, p = pos[n.id];
      var base = seriesColor(ctx.colorIndexOf(n));
      var g = el('g', { class: 'node' + (ctx.selectedId === n.id ? ' is-selected' : '') +
        (ctx.isDimmed(n) ? ' is-dimmed' : ''), tabindex: '0', role: 'button' }, svg);
      g.setAttribute('aria-label', n.label);

      /* AREA proportional to share: r = k·√p, with no additive term. The old
         `4.5 + √p·1.9` clamped at 17 drew 100%, 70.1% and 55.7% as the same
         circle and varied area-per-percent 23-fold, while the legend claimed
         proportionality. k = 1.7 puts the 100% root at exactly r=17.

         The 5px floor is a real departure and is disclosed in the legend: it
         only binds below ~8.6% share, and a 1px circle is neither visible nor
         clickable. Everything above that is exact. */
      var rad = typeof n.prevalence === 'number'
        ? Math.max(TREE_R_MIN, Math.sqrt(n.prevalence) * TREE_R_K)
        : 6;
      var c = el('circle', { cx: p.x, cy: p.y, r: rad }, g);
      c.style.fill = base;

      var lab = el('text', { x: p.x + rad + 8, y: p.y - 1, class: 'tree-label' }, g);
      lab.textContent = truncate(n.label, 34);
      if (typeof n.prevalence === 'number') {
        var s = el('text', { x: p.x + rad + 8, y: p.y + 12, class: 'tree-sub' }, g);
        var kidn = ctx.childrenOf(n.id).length;
        s.textContent = fmtPct(n.prevalence) + (kidn ? '  ·  ' + kidn + ' sub' : '');
      }

      bindNode(g, n, ctx);
    });
  }

  /* ---------------- table view (the accessible fallback) ---------------- */

  function table(container, ctx) {
    clear(container);
    var tbl = h('table');
    var thead = h('thead');
    var hr = h('tr');
    ['Subtype', 'Share', ctx.markerOrder.length ? ctx.markerOrder.join(' / ') : 'Markers', 'Top drivers', 'Leading trigger']
      .forEach(function (t) { hr.appendChild(h('th', null, t)); });
    thead.appendChild(hr);
    tbl.appendChild(thead);

    var tbody = h('tbody');
    var root = ctx.nodeById(ctx.focusId) || ctx.rootOf(ctx.axisId);

    (function walk(n, depth) {
      if (!n) return;
      var tr = h('tr');
      tr.tabIndex = 0;

      var name = h('td', depth ? 'depth-' + Math.min(depth, 2) : null);
      name.appendChild(h('span', 'name', n.label));
      tr.appendChild(name);

      var pv = h('td', 'num', fmtPct(n.prevalence));
      tr.appendChild(pv);

      var mk = ctx.markerOrder
        .filter(function (m) { return n.markers && n.markers[m] != null; })
        .map(function (m) { return n.markers[m]; }).join(' / ');
      tr.appendChild(h('td', null, mk || '—'));

      var drv = ((n.molecular || {}).drivers || []).slice(0, 3).map(function (d) {
        return d.gene + (typeof d.frequency === 'number' ? ' ' + fmtPct(d.frequency) : '');
      }).join(', ');
      tr.appendChild(h('td', null, drv || '—'));

      var trig = (n.triggers || [])[0];
      tr.appendChild(h('td', null, trig ? trig.factor : '—'));

      tr.addEventListener('click', function () { ctx.select(n.id); });
      tr.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.select(n.id); }
      });
      tbody.appendChild(tr);

      ctx.childrenOf(n.id).forEach(function (k) { walk(k, depth + 1); });
    })(root, 0);

    tbl.appendChild(tbody);
    container.appendChild(tbl);
  }

  /* ---------------- shared node interaction ---------------- */

  function bindNode(g, node, ctx) {
    g.addEventListener('click', function (e) {
      e.stopPropagation();
      ctx.activate(node.id);
    });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.activate(node.id); }
    });
    g.addEventListener('mousemove', function (e) { tooltip(nodeTip(node, ctx), e); });
    g.addEventListener('mouseleave', function () { tooltip(null); });
    g.addEventListener('focus', function () { ctx.select(node.id); });
  }

  /* ---------------- legend ---------------- */

  function legend(container, ctx) {
    clear(container);
    var groups = ctx.legendGroups();
    if (!groups.length) return;

    groups.forEach(function (grp) {
      var item = h('span', 'item');
      var sw = h('span', 'swatch');
      sw.style.background = seriesColor(grp.colorIndex);
      item.appendChild(sw);
      item.appendChild(h('span', null, grp.label));
      container.appendChild(item);
    });

    /* The size note only makes sense where something is actually sized — and it
       states the DEPARTURES from proportionality rather than the ideal, because
       a legend that overclaims is worse than none. Both notes are true of what
       is drawn: the treemap's nested cells lose the parent's header strip, and
       the tree's circles are floored so a 0.5% node stays clickable. */
    var curAxis = ctx.axisById ? ctx.axisById(ctx.axisId) : null;
    if (curAxis && curAxis.partition === false && (ctx.view === 'treemap' || ctx.view === 'tree')) {
      /* The legend normally promises that size means share. On an axis of
         compared cohorts that promise would be false, so it is withdrawn. */
      container.appendChild(h('span', 'item note',
        'Not a partition · these nodes are compared cohorts, drawn the same size on purpose — ' +
        'size means nothing here'));
    } else if (ctx.view === 'treemap') {
      container.appendChild(h('span', 'item note',
        'Area ∝ share of ' + shareWhole(curAxis) + ' · nested cells sit inside the parent’s label strip, ' +
        'so they run slightly small'));
    } else if (ctx.view === 'tree') {
      container.appendChild(h('span', 'item note',
        'Circle area ∝ share of ' + shareWhole(curAxis) + ', above ' + fmtExact(TREE_R_EXACT_ABOVE) +
        ' · smaller nodes are floored so they stay clickable'));
    }

    if (ctx.view === 'tree' && ctx.showRelated) {
      var rel = h('span', 'item note', 'Dashed = cross-cutting relationship');
      container.appendChild(rel);
    }
  }

  /* ================= Layer 0 — the front door =================

     Answers, in order, the five questions someone arriving cold actually asks:
     what is this, how common is it, how bad is it, how is it sorted out, and
     where do I click. Everything else in the app assumes the first four are
     already known.

     The hard part is section 2. SEER's headline figures have four different
     denominators, and a KPI row that lines them up without saying so invites
     "91.9% survive, so 8.1% die" — wrong twice over. So no figure is ever drawn
     without its denominator attached.
  ============================================================= */

  /* The front-door cards. `who` and `q` are true of any cancer and stay
     literal; `eg` is the concrete illustration and used to be five breast
     facts spelled out here — "HR+/HER2− is 70% of cases", "only 3 of 22 risk
     factors are lifestyle ones". Under a second dataset those become confident
     lies on the first screen a reader sees.

     So `eg` is now a function of the loaded data. A dataset may override any
     of them with `profile.lensExamples[lens]`; where it does not, the card
     computes its own example, and a card that cannot compute one simply omits
     the line rather than showing someone else's. This is the same rule the
     landscape-chart key already follows: generate the example, never type it. */
  var LENS_CARDS = [
    { lens: 'risk', view: 'ranked', title: 'Risk & detection',
      who: 'If you want to know whether this affects you',
      q: 'What raises or lowers the odds, and how is it caught early?',
      eg: function (ctx, d) {
        var fs = d.factors || [];
        if (!fs.length) return null;
        var mod = 0;
        fs.forEach(function (f) { if (f.modifiable === true) mod++; });
        var s = 'Only ' + mod + ' of ' + fs.length + ' risk factors here ' +
                (mod === 1 ? 'is something' : 'are things') + ' anyone can change.';
        /* Counted from the conversions actually drawn. This used to say "every
           multiplier is converted", which was already false for prostate's
           mortality rows and is false again for anything that converts only as
           a bound or not at all. */
        var b = d.baseline;
        if (b && typeof b.lifetimeRisk === 'number') {
          var exact = 0, bounded = 0, refused = 0;
          fs.forEach(function (f) {
            if (!f.rr) return;
            var c = conversion(d, f);
            if (!c) refused++; else if (c.bound) bounded++; else exact++;
          });
          var parts = [];
          if (exact) parts.push(exact + (exact === 1 ? ' converts exactly' : ' convert exactly'));
          if (bounded) parts.push(bounded + ' only as a limit');
          if (refused) parts.push(refused + ' not at all');
          if (parts.length) {
            s += ' Against the ' + fmtRisk(b.lifetimeRisk) + ' baseline, ' +
                 (parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1]
                                   : parts[0]) +
                 ', and each says why.';
          }
        }
        return s;
      } },
    { lens: 'subtypes', view: 'treemap', title: 'Subtypes',
      who: 'If you have a diagnosis, or a report to make sense of',
      q: 'What kinds are there, and how do they behave?',
      eg: function (ctx, d) {
        var axes = d.axes || [], nodes = d.nodes || [], axis = null, i;
        for (i = 0; i < axes.length; i++) if (axes[i].default) { axis = axes[i]; break; }
        if (!axis) axis = axes[0];
        if (!axis) return null;
        var root = null;
        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].axis === axis.id && nodes[i].parent == null) { root = nodes[i]; break; }
        }
        if (!root) return null;
        var kids = [];
        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].parent === root.id && typeof nodes[i].prevalence === 'number') kids.push(nodes[i]);
        }
        if (kids.length < 2) return null;
        kids.sort(function (a, b) { return b.prevalence - a.prevalence; });
        var a0 = kids[0], b0 = kids[1];
        var ofWhom = ' of ' + shareWhole(axis);
        return (a0.shortLabel || a0.label) + ' is ' + fmtExact(a0.prevalence) + ofWhom + '; ' +
               (b0.shortLabel || b0.label) + ' is ' + fmtExact(b0.prevalence) +
               ' and behaves very differently.';
      } },
    { lens: 'targets', view: 'targets', title: 'Targets',
      who: 'If you follow the biology or the drug pipeline',
      q: 'Where is the protein broken, what binds it, and how far along is that?',
      eg: function (ctx) {
        var t = typeof ctx.targetData === 'function' ? ctx.targetData() : null;
        if (!t || !t.n_targets) return null;
        var nd = (t.drug_summary || {}).n_drugs;
        return t.n_targets + ' proteins, each with its domains, its hotspots and what binds them' +
               (nd ? ' — and ' + nd + ' agents aimed at them' : '') + '.';
      } },
    { lens: 'literature', view: 'literature', title: 'Literature',
      who: 'If the pipeline is already too old for you',
      q: 'What is being published right now about the problems with these drugs?',
      eg: function (ctx) {
        var lit = typeof ctx.literatureData === 'function' ? ctx.literatureData() : null;
        if (!lit || !lit.n_papers) return null;
        var kinds = [];
        for (var k in (lit.by_kind || {})) {
          if (Object.prototype.hasOwnProperty.call(lit.by_kind, k)) kinds.push(k);
        }
        return lit.n_papers + ' papers' + (lit.since ? ' since ' + String(lit.since).slice(0, 4) : '') +
               (kinds.length ? ', grouped by the problem they address — ' + kinds.join(', ') : '') +
               '. Nothing here is ranked by promise.';
      } },
    { lens: 'evidence', view: 'evidence', title: 'Evidence',
      who: 'If you want to check the numbers yourself',
      q: 'Where did each figure come from, and where do the sources disagree?',
      eg: function (ctx, d) {
        var f = d.facts || {}, c = f.concordance;
        /* Named from the matrix itself. "Two of the classifications disagree"
           was true for breast and prostate and false for lung, whose matrix
           sets a tumour classification against a person's smoking history. */
        if (c && c.available && c.n_classified) {
          return c.n_classified + ' tumours sorted two ways at once — ' +
                 (c.row_label || 'one classification') + ' against ' + (c.col_label || 'another') +
                 ' — and where the two line up and where they do not.';
        }
        if (f.attribution) {
          return 'Every figure on this site beside the source it came from, and a count of how ' +
                 'many are actually cited.';
        }
        return null;
      } }
  ];

  /* A dataset's own wording wins; otherwise the card generates one; otherwise
     the line is left out. A thrown generator must not blank the whole front
     page, so it is caught and reported rather than propagated. */
  function lensExample(card, ctx) {
    var d = (typeof ctx.dataset === 'function' ? ctx.dataset() : null) || {};
    var supplied = ((d.profile || {}).lensExamples || {})[card.lens];
    if (supplied) return supplied;
    if (typeof card.eg !== 'function') return card.eg || null;
    try {
      return card.eg(ctx, d) || null;
    } catch (err) {
      if (global.console && console.warn) {
        console.warn('render: lens card example for "' + card.lens + '" failed', err);
      }
      return null;
    }
  }

  var COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  function countWord(n) { return COUNT_WORDS[n] || String(n); }

  /* A labelled line inside an axis card. Same shape as dtLine, kept separate
     because these sit in a grid rather than a drawer. */
  function axLine(k, v) {
    var p = h('p', 'ax-line');
    p.appendChild(h('span', 'k', k));
    p.appendChild(h('span', 'v', v));
    return p;
  }

  function fmtBig(n) {
    if (typeof n !== 'number' || !isFinite(n)) return '—';
    if (n >= 1000000) return (Math.round(n / 100000) / 10) + 'M';
    if (n >= 1000) return Math.round(n / 1000) + 'k';
    return String(n);
  }

  function fmtCount(n) {
    if (typeof n !== 'number' || !isFinite(n)) return '—';
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* A figure and, inseparably, what it is a figure OF. */
  function figure(value, label, denom) {
    var d = h('div', 'fg');
    d.appendChild(h('span', 'v', value));
    d.appendChild(h('span', 'k', label));
    if (denom) d.appendChild(h('span', 'd', denom));
    return d;
  }

  function start(container, ctx) {
    clear(container);
    var ds = ctx.dataset() || {};
    var prof = ds.profile || {};
    var ov = (ds.facts || {}).overview || null;

    // --- 1. what it is ---
    if (prof.definition) {
      container.appendChild(prose(prof.definition, 'st-lede'));
    }
    if (prof.definitionMore) {
      container.appendChild(prose(prof.definitionMore, 'st-body'));
    }

    // --- 2. the numbers, each with its own denominator ---
    container.appendChild(h('h3', null, 'How common, and how serious'));

    var cols = h('div', 'st-cols');

    if (ov) {
      var us = h('div', 'st-col');
      var uh = h('div', 'st-colhead');
      uh.appendChild(h('span', 'nm', ov.population || 'United States'));
      // the two column subtitles are the whole "not comparable" argument in
      // miniature, so both carry their definition
      uh.appendChild(prose('{{cancer registry|SEER registry}} · read from the published tables',
        'src', 'span'));
      us.appendChild(uh);

      var g = ov.at_a_glance || {}, r = ov.rates_per_100k || {};
      /* Who the registry counted. The pipeline reads this off the SEER page
         rather than assuming, because these captions used to say "US women"
         over a cancer only men get. */
      var who = ov.population_sex || 'people';
      /* What the registry counted, when that is narrower than the dataset.
         SEER's melanoma page is melanoma of the skin, while the dataset also
         covers mucosal and uveal melanoma — a tile read on its own must not
         describe the part as the whole, so every caption carries it. */
      var covers = prof.registryCovers ? ' · ' + prof.registryCovers + ' only' : '';
      var grid = h('div', 'st-figs');
      if (r.new_cases != null) {
        grid.appendChild(figure(fmtPub(r.new_cases, ''), 'new cases per 100,000',
          'US ' + who + ', per year, age-adjusted' + covers));
      }
      if (r.deaths != null) {
        grid.appendChild(figure(fmtPub(r.deaths, ''), 'deaths per 100,000',
          'US ' + who + ', per year, age-adjusted' + covers));
      }
      if (ov.lifetime_risk_pct != null) {
        grid.appendChild(figure(fmtPub(ov.lifetime_risk_pct), 'lifetime risk',
          'US ' + who + ', over an entire life' + covers));
      }
      if (g.five_year_relative_survival != null) {
        grid.appendChild(figure(fmtPub(g.five_year_relative_survival), 'alive at five years',
          'of those diagnosed, relative to a matched population' + covers));
      }
      if (g.estimated_new_cases != null) {
        grid.appendChild(figure(fmtCount(g.estimated_new_cases),
          'new cases in ' + (ov.estimate_year || 'the year'),
          'projected US total' + (g.pct_of_all_new_cancers != null
            ? ' · ' + g.pct_of_all_new_cancers + '% of all cancers' : '') + covers));
      }
      if (g.estimated_deaths != null) {
        grid.appendChild(figure(fmtCount(g.estimated_deaths),
          'deaths in ' + (ov.estimate_year || 'the year'),
          'projected US total' + (g.pct_of_all_cancer_deaths != null
            ? ' · ' + g.pct_of_all_cancer_deaths + '% of all cancer deaths' : '') + covers));
      }
      if ((ov.median_age || {}).diagnosis != null) {
        grid.appendChild(figure(fmtCount(ov.median_age.diagnosis), 'median age at diagnosis',
          'half of cases are found after this age' + covers));
      }
      us.appendChild(grid);
      cols.appendChild(us);
    }

    var w = prof.world;
    if (w) {
      var wc = h('div', 'st-col');
      var wh = h('div', 'st-colhead');
      wh.appendChild(h('span', 'nm', w.label || 'World'));
      wh.appendChild(prose('{{modelled estimate}}, not a registry count', 'src', 'span'));
      wc.appendChild(wh);
      var wg = h('div', 'st-figs');
      if (w.newCasesPerYear) {
        wg.appendChild(figure('~' + fmtBig(w.newCasesPerYear), 'new cases per year', 'all countries'));
      }
      if (w.deathsPerYear) {
        wg.appendChild(figure('~' + fmtBig(w.deathsPerYear), 'deaths per year', 'all countries'));
      }
      wc.appendChild(wg);
      if (w.note) wc.appendChild(h('p', 'st-colnote', w.note));
      wc.appendChild(h('p', 'st-colnote',
        'Survival is not shown here because it is not one number: it depends far more on the ' +
        'health system than on anything biological on this site.'));
      cols.appendChild(wc);
    }
    container.appendChild(cols);

    /* The guard. Stated once, plainly, immediately under the tiles. */
    container.appendChild(h('p', 'st-warn',
      'These figures do not divide into one another. A yearly rate, a lifetime risk, and a ' +
      'five-year survival are three different quantities with three different denominators — ' +
      'and this year\'s deaths come from many earlier years\' diagnoses, so dividing deaths by ' +
      'new cases does not give a death rate.'));

    var relNote = (ds.detection || {}).relativeSurvivalNote;
    if (relNote) container.appendChild(h('p', 'st-warn subtle', relNote));

    // --- 3. who it happens to ---
    var ages = ((ov || {}).age_distribution || {}).new_cases || [];
    if (ages.length) {
      container.appendChild(h('h3', null, 'Who it happens to'));
      /* "risk rises steeply after 40" was breast's saying and is wrong for a
         cancer whose curve lifts twenty years later. Name the biggest band
         instead, read off the distribution being drawn — it cannot disagree
         with the bars underneath it. */
      var top = ages[0];
      ages.forEach(function (a) { if ((a.percent || 0) > (top.percent || 0)) top = a; });
      container.appendChild(h('p', 'st-body',
        'Share of new diagnoses by age. Most of the lifetime risk arrives late — the largest ' +
        'single share is the ' + top.range + ' band, at ' + fmtPub(top.percent) + ' of cases.'));
      var maxA = ages.reduce(function (m, a) { return Math.max(m, a.percent || 0); }, 1);
      var band = h('div', 'st-ages');
      ages.forEach(function (a) {
        var row = h('div', 'st-age');
        row.appendChild(h('span', 'lbl', a.range));
        var bw = h('div', 'bar');
        var fill = h('div', 'fill');
        fill.style.width = Math.max(0.6, (a.percent / maxA) * 100) + '%';
        // One series, one hue — bar length already carries the magnitude.
        fill.style.background = seriesColor(0);
        bw.appendChild(fill);
        row.appendChild(bw);
        row.appendChild(h('span', 'val', fmtPub(a.percent)));
        band.appendChild(row);
      });
      container.appendChild(band);

      /* Age is the strongest factor there is, and it is the only one this page
         shows — say where the other 21 live rather than letting the section end. */
      if (ctx.lensAvailable('risk')) {
        var toRisk = h('button', 'st-next', 'Age is the strongest single factor, and it is not ' +
          'one you can change. What else moves the odds →');
        toRisk.type = 'button';
        toRisk.addEventListener('click', function () { ctx.setLens('risk', 'ranked'); });
        container.appendChild(toRisk);
      }
    }

    /* --- 4. why it is classified several ways ---

       This used to be a paragraph asserting that four classifications exist
       without naming them, which left the reader to work out that the "Classify
       by" picker in the top bar was the same four. Now each one is a card built
       from the axis record itself — so the count in the heading, the names, and
       the picker cannot drift apart, and every card is the door into that axis. */
    var axes = ds.axes || [];
    if (axes.length) {
      container.appendChild(h('h3', null,
        'Why it is classified ' + countWord(axes.length) + ' different ways'));
      if (prof.classification) container.appendChild(prose(prof.classification, 'st-body'));

      var grid = h('div', 'st-axes');
      axes.forEach(function (a, i) {
        var root = ctx.rootOf(a.id);
        var kids = root ? ctx.childrenOf(root.id) : [];

        var card = h('div', 'st-axis');
        var top = h('div', 'top');
        top.appendChild(h('span', 'n', String(i + 1)));
        top.appendChild(h('span', 'nm', a.label));
        card.appendChild(top);

        if (a.asks) card.appendChild(h('p', 'asks', '“' + a.asks + '”'));
        if (a.measures) card.appendChild(axLine('Measured by', a.measures));
        if (a.decides) card.appendChild(axLine('It decides', a.decides));
        if (a.population && a.population.label) card.appendChild(axLine('Covers', populationLine(a.population, a)));
        if (kids.length) {
          card.appendChild(axLine('Splits into', kids.length + ' groups · ' +
            kids.map(function (n) { return n.shortLabel || n.label; }).join(', ')));
        }

        var b = h('button', 'go', 'Sort by this →');
        b.type = 'button';
        b.addEventListener('click', function () { ctx.setAxis(a.id); });
        card.appendChild(b);
        grid.appendChild(card);
      });
      container.appendChild(grid);

      if (prof.classificationClose) {
        container.appendChild(prose(prof.classificationClose, 'st-body'));
      }
    }

    /* --- 5. the words on a report ---

       Section 4 ends at four classifications; this one is where they come FROM.
       Without saying that, the page reads as two unrelated lists — so the bridge
       sentence is not decoration, it is the join. */
    var terms = prof.reportTerms || [];
    if (terms.length) {
      container.appendChild(h('h3', null, 'The words on a pathology report'));
      if (prof.reportIntro) container.appendChild(prose(prof.reportIntro, 'st-body'));
      container.appendChild(h('p', 'st-body subtle',
        'Each card names which of the ' + countWord(axes.length) + ' classifications above the word feeds, and opens ' +
        'the part of this site that explains it. Underlined words inside carry their own ' +
        'definition.'));
      var list = h('div', 'st-terms');
      terms.forEach(function (t) {
        /* A div, not a button: the plain-language line now contains definition
           buttons of its own, and a button inside a button is invalid and eats
           the inner click. The "Opens" line is the real control. */
        var b = h('div', 'st-term');

        var head = h('div', 'top');
        head.appendChild(h('span', 'tm', t.term));
        // assay and threshold are pulled from markers[] rather than restated
        var mk = t.marker && (ds.markers || []).filter(function (m) { return m.id === t.marker; })[0];
        var bm = t.biomarker && (((ctx.nodeById('ihc-root') || {}).molecular || {}).biomarkers || [])
          .filter(function (x) { return x.name === t.biomarker; })[0];
        var meta = mk ? [mk.assay, mk.positiveThreshold].filter(Boolean).join(' · ')
          : bm ? [bm.use, bm.threshold].filter(Boolean).join(' · ') : '';
        if (meta) head.appendChild(h('span', 'meta', meta));
        b.appendChild(head);

        // which of the four ways above this word belongs to — the visible join
        var ax = t.axis && ctx.axisById && ctx.axisById(t.axis);
        if (ax) {
          var fb = h('button', 'st-feeds', (t.axisRole || 'sorts by') + ': ' + ax.label);
          fb.type = 'button';
          fb.title = ax.asks || '';
          fb.addEventListener('click', function () { ctx.setAxis(ax.id); });
          b.appendChild(fb);
        }

        if (t.plain) b.appendChild(prose(t.plain, 'pl', 'div'));

        var dest = t.goTo ? (ctx.nodeById(t.goTo) || {}).label
          : t.goToLens ? (LENS_CARDS.filter(function (c) { return c.lens === t.goToLens; })[0] || {}).title
          : null;
        if (dest) {
          var go = h('button', 'go', 'Opens: ' + dest + ' →');
          go.type = 'button';
          go.addEventListener('click', function () {
            if (t.goTo) ctx.activate(t.goTo);
            else if (t.goToLens) ctx.setLens(t.goToLens, t.goToView);
          });
          b.appendChild(go);
        }
        list.appendChild(b);
      });
      container.appendChild(list);
    }

    // --- 6. where to go next ---
    container.appendChild(h('h3', null, 'Where to go from here'));
    container.appendChild(h('p', 'st-body',
      'These are in order, and the order is deliberate: each one assumes the one before it. ' +
      'They run from what affects whole populations down to single proteins and then out to ' +
      'the papers written last month. You do not have to go in order — but if a page assumes ' +
      'something you have not met, it will be on an earlier rung.'));
    var cards = h('div', 'st-cards');
    LENS_CARDS.forEach(function (c) {
      if (!ctx.lensAvailable(c.lens)) return;
      var card = h('button', 'st-card');
      card.type = 'button';
      card.appendChild(h('span', 'who', c.who));
      card.appendChild(h('span', 'ttl', c.title));
      card.appendChild(h('span', 'q', c.q));
      var eg = lensExample(c, ctx);
      if (eg) card.appendChild(h('span', 'eg', eg));
      card.addEventListener('click', function () { ctx.setLens(c.lens, c.view); });
      cards.appendChild(card);
    });
    container.appendChild(cards);

    // --- sources ---
    var srcs = (prof.sources || []).concat(w && w.source ? [w.source] : []);
    if (ov && ov.url) srcs.push({ label: ov.source || 'SEER Cancer Stat Facts', url: ov.url });
    if (srcs.length) {
      container.appendChild(h('h3', null, 'Sources for this page'));
      var ul = h('ul', 'srcs');
      var seen = {};
      srcs.forEach(function (s) {
        if (!s || !s.label || seen[s.label]) return;
        seen[s.label] = true;
        var li = h('li');
        if (s.url) {
          var a = h('a', null, s.label);
          a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
          li.appendChild(a);
        } else li.textContent = s.label;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }

    container.appendChild(h('p', 'st-disclaimer',
      'Research and educational reference only. Not medical advice, and not a substitute for ' +
      'a conversation with a clinician who can see the actual report.'));
  }

  /* ---------------- the glossary, in full ---------------- */

  function glossary(container, ctx) {
    clear(container);
    var G = global.Glossary;
    if (!G) {
      container.appendChild(h('p', 'dt-note', 'Glossary not loaded.'));
      return;
    }
    var groups = G.groups();
    var total = G.all().length;

    container.appendChild(h('p', 'st-lede',
      'Every term this site uses that assumes you already know it. ' + total + ' of them.'));
    container.appendChild(h('p', 'st-body',
      'Each entry says what the word means and why it appears here. Where a term is routinely ' +
      'misread — "relative survival" and "relative risk" especially — the misreading is named ' +
      'rather than left to catch you.'));

    // jump strip
    var jump = h('div', 'gl-jump');
    groups.forEach(function (g) {
      if (!g.terms.length) return;
      var b = h('button', 'chipbtn');
      b.type = 'button';
      b.textContent = g.label + ' (' + g.terms.length + ')';
      b.addEventListener('click', function () {
        var el = document.getElementById('gl-' + g.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      jump.appendChild(b);
    });
    container.appendChild(jump);

    groups.forEach(function (g) {
      if (!g.terms.length) return;
      var head = h('h3', null, g.label);
      head.id = 'gl-' + g.id;
      container.appendChild(head);

      g.terms.forEach(function (e) {
        var card = h('div', 'gl-term');
        var top = h('div', 'top');
        top.appendChild(h('span', 'tm', e.full || e.t));
        if (e.full && e.full.toLowerCase() !== e.t.toLowerCase()) {
          top.appendChild(h('span', 'ab', e.t));
        }
        (e.alias || []).forEach(function (a) { top.appendChild(h('span', 'ab alias', a)); });
        card.appendChild(top);
        card.appendChild(h('p', 'd', e.d));
        if (e.w) {
          var w = h('p', 'w');
          w.appendChild(h('span', 'k', 'Why it matters here'));
          w.appendChild(document.createTextNode(e.w));
          card.appendChild(w);
        }
        container.appendChild(card);
      });
    });

    container.appendChild(h('p', 'st-disclaimer',
      'Plain-language explanations written for this site, not formal definitions. Where a ' +
      'clinician\'s usage is narrower than the sentence here, theirs is the one that counts.'));
  }

  /* ================= Book I — risk, baseline and detection =================

     The arithmetic here is the whole reason this view exists. A relative risk
     shown on its own ("alcohol raises your risk 7–10%") is read by almost
     everyone as an absolute one. So every RR that is convertible gets converted,
     and every RR that is NOT convertible is prevented from being converted — see
     `scope` in SCHEMA.md. The two failure modes are symmetrical and this module
     is where both are handled.
  ========================================================================= */

  var RISK_HUE = { increases: 1, decreases: 0 };  // warm / cool — a diverging pair

  function riskColor(dir) {
    return seriesColor(dir === 'decreases' ? RISK_HUE.decreases : RISK_HUE.increases);
  }

  /* The denominator for a factor: the named stratum when it has one, else the
     dataset baseline. BRCA2 is ~45–70% in women and ~6–8% in men; using one
     number for both would be wrong by a factor of seven. */
  function baselineFor(ds, f) {
    var b = (ds || {}).baseline;
    if (!b || typeof b.lifetimeRisk !== 'number') return null;
    if (f && f.stratum) {
      var hit = (b.strata || []).filter(function (s) { return s.label === f.stratum; })[0];
      if (hit && typeof hit.lifetimeRisk === 'number') {
        return { risk: hit.lifetimeRisk, population: hit.label };
      }
    }
    return { risk: b.lifetimeRisk, population: b.population || '' };
  }

  function geoMean(range) {
    if (!range) return null;
    var lo = range[0], hi = range[1];
    if (!(lo > 0) || !(hi > 0)) return null;
    return Math.sqrt(lo * hi);
  }

  /* Position on the log axis. RR is used directly; an absolute lifetime risk is
     divided by its baseline to get an IMPLIED ratio, used for position only —
     the row is still labelled with the absolute figure, which is the real claim. */
  function effectValue(ds, f) {
    if (f.rr) return geoMean(f.rr);
    if (f.absoluteLifetime) {
      var base = baselineFor(ds, f);
      var m = geoMean(f.absoluteLifetime);
      if (base && m) return m / base.risk;
    }
    return null;
  }

  /* Returns the absolute-risk conversion, or null when converting would lie.
     Guarded on four things: an RR must exist, it must be scoped to the whole
     disease, it must be a multiplier on INCIDENCE, and a baseline must be
     present to convert against.

     The outcome guard is the one that is easy to miss, because such a factor
     passes every other check. `baseline.lifetimeRisk` is a probability of being
     diagnosed. A mortality rate ratio multiplied by it produces a number that
     is neither a risk of diagnosis nor a risk of death, and it looks entirely
     plausible on the page. */
  function conversion(ds, f) {
    if (!f.rr) return null;
    if (f.scope != null && f.scope !== 'overall') return null;
    if (f.outcome === 'mortality') return null;
    /* A comparison group outside the baseline population (low-dose Hodgkin
       survivors, say) shares no denominator with it at all. */
    if (f.referent === 'other') return null;
    var base = baselineFor(ds, f);
    if (!base) return null;
    var lo = base.risk * f.rr[0];
    var hi = base.risk * f.rr[1];
    var out = {
      from: base.risk,
      lo: Math.min(lo, hi),
      hi: Math.max(lo, hi),
      population: base.population,
      per: f.per || null,
      bound: null
    };
    /* Relative to the unexposed, with no stratum giving the unexposed group's
       own risk. That group's risk sits below the baseline when the exposure
       raises risk (and above it when it lowers risk), so the true figure lies
       between the baseline and baseline × rr. Only the far end is known
       without knowing how common the exposure is, and it is shown AS a bound —
       close for a rare exposure, far off for a common strong one. */
    if (f.referent === 'unexposed' && !f.stratum) {
      if (f.rr[0] >= 1) { out.lo = base.risk; out.bound = 'upper'; }
      else if (f.rr[1] <= 1) { out.hi = base.risk; out.bound = 'lower'; }
      else out.bound = 'range';
    }
    return out;
  }

  function fmtRisk(v) {
    if (typeof v !== 'number' || !isFinite(v)) return '—';
    if (v < 1) return (Math.round(v * 100) / 100) + '%';
    if (v < 10) return (Math.round(v * 10) / 10) + '%';
    return Math.round(v) + '%';
  }

  /* Collapse on the RENDERED strings, not the raw values: 13.91 and 14.3 are
     0.39 apart but both print as "14%", and "14%–14%" reads as a bug. */
  function fmtRange(lo, hi) {
    var a = fmtRisk(lo), b = fmtRisk(hi);
    return a === b ? a : a + '–' + b;
  }

  function conversionText(c) {
    if (!c) return '';
    var per = c.per ? ' per ' + c.per : '';
    var from = 'about ' + fmtRisk(c.from) + '  →  ';
    if (c.bound === 'upper') return from + 'at most about ' + fmtRisk(c.hi) + per;
    if (c.bound === 'lower') return from + 'at least about ' + fmtRisk(c.lo) + per;
    if (c.bound === 'range') return from + 'somewhere in about ' + fmtRange(c.lo, c.hi) + per;
    return from + 'about ' + fmtRange(c.lo, c.hi) + per;
  }

  var MODIFIABLE_GROUP = 'What you can change';
  var FIXED_GROUP = 'What you cannot change';

  /* Sorted factor list with everything the views need precomputed once. */
  function riskRows(ctx) {
    var ds = ctx.dataset() || {};
    var out = (ds.factors || []).map(function (f) {
      return {
        factor: f,
        value: effectValue(ds, f),
        conv: conversion(ds, f),
        group: f.modifiable ? MODIFIABLE_GROUP : FIXED_GROUP,
        dimmed: ctx.isFactorDimmed ? ctx.isFactorDimmed(f) : false
      };
    });

    // Rank by distance from 1.0 in log space, so a protective 0.75 and a
    // harmful 1.33 count as equally large moves.
    function weight(r) {
      return r.value > 0 ? Math.abs(Math.log(r.value)) : -1;
    }
    var groupOrder = {};
    groupOrder[MODIFIABLE_GROUP] = 0;
    groupOrder[FIXED_GROUP] = 1;

    out.sort(function (a, b) {
      var g = groupOrder[a.group] - groupOrder[b.group];
      if (g) return g;
      return weight(b) - weight(a);
    });
    return out;
  }

  /* ---------------- Book I header — layer 1, the anchor ---------------- */

  function riskHead(container, ctx) {
    clear(container);
    var ds = ctx.dataset() || {};
    var b = ds.baseline;
    if (!b) { container.hidden = true; return; }
    container.hidden = false;

    var wrap = h('div', 'bl-wrap');

    var hero = h('div', 'bl-hero');
    hero.appendChild(h('span', 'bl-num', fmtRisk(b.lifetimeRisk)));
    var side = h('div', 'bl-side');
    side.appendChild(h('span', 'bl-label', b.lifetimeRiskLabel || ''));
    side.appendChild(h('span', 'bl-pop', 'lifetime risk · ' + (b.population || '')));
    hero.appendChild(side);
    wrap.appendChild(hero);

    if (b.note) wrap.appendChild(h('p', 'bl-note', b.note));

    if ((b.strata || []).length) {
      var st = h('div', 'bl-strata');
      b.strata.forEach(function (s) {
        var cell = h('div', 'bl-stratum');
        cell.appendChild(h('span', 'v', fmtRisk(s.lifetimeRisk)));
        cell.appendChild(h('span', 'k', s.label));
        if (s.note) cell.appendChild(h('span', 'n', s.note));
        st.appendChild(cell);
      });
      wrap.appendChild(st);
    }

    /* The non-goal, stated where people will try to do it.

       "several change with menopausal status" used to sit in the middle of this
       sentence — true of breast and meaningless over a cancer only men get. The
       general claim is the one that matters anyway: these numbers were measured
       under different circumstances and do not compose. */
    wrap.appendChild(h('p', 'bl-warn',
      'These factors do not add up. Relative risks come from different studies and different ' +
      'populations, they overlap, and several depend on circumstances that change over a ' +
      'lifetime — so multiplying them together does not give a personal risk. This page ' +
      'deliberately will not compute one. A clinician using a validated tool can.'));

    if (b.source && b.source.label) {
      var src = h('p', 'bl-src');
      if (b.source.url) {
        var a = h('a', null, b.source.label);
        a.href = b.source.url; a.target = '_blank'; a.rel = 'noopener';
        src.appendChild(a);
      } else src.textContent = b.source.label;
      wrap.appendChild(src);
    }

    container.appendChild(wrap);
  }

  /* ---------------- Book II header — which of the ways you are using ----------

     The axis picker is a <select> labelled "Classify by" and nothing else on the
     page says that the four options are rival descriptions of the same tumours
     rather than four different levels of detail. That is the single easiest
     misreading of this whole app, so it gets answered at the top of the lens
     rather than in a note underneath the chart.
  --------------------------------------------------------------------------- */

  function axisHead(container, ctx) {
    if (!container) return;
    clear(container);
    var axes = ctx.axes ? ctx.axes() : [];
    var cur = ctx.axisById ? ctx.axisById(ctx.axisId) : null;
    if (!cur || axes.length < 2) { container.hidden = true; return; }
    container.hidden = false;

    var wrap = h('div', 'ah-wrap');

    /* The switcher leads the block and borrows the top bar's segmented control.
       It used to be a row of unfilled pills sitting below the prose at caption
       size, and readers took it for part of the paragraph — so the other three
       classifications went unfound. Every axis is listed, current one pressed,
       because "which are there" is the thing that was invisible. */
    var sw = h('div', 'ah-switch');
    sw.appendChild(h('span', 'k', 'Sorted by'));

    var seg = h('div', 'segmented');
    seg.setAttribute('role', 'group');
    seg.setAttribute('aria-label', 'Classification');
    axes.forEach(function (a) {
      var b = h('button', null, a.shortLabel || a.label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(a.id === cur.id));
      b.title = a.asks ? a.label + ' — ' + a.asks : a.label;
      b.addEventListener('click', function () { ctx.setAxis(a.id); });
      seg.appendChild(b);
    });
    sw.appendChild(seg);

    /* This used to say "all five are true at once". It is not true of a
       disease-state axis: that one sorts by the furthest point the disease ever
       reaches, which nobody knows on the day it is found. What does hold for
       every axis is the point the line exists to make -- these are rival
       classifications of the same cancers, not levels of detail. */
    sw.appendChild(h('span', 'of',
      countWord(axes.length) + ' classifications of the same cancers'));
    wrap.appendChild(sw);

    if (cur.asks) wrap.appendChild(h('p', 'ah-asks', '“' + cur.asks + '”'));
    if (cur.measures) wrap.appendChild(axLine('Measured by', cur.measures));
    if (cur.decides) wrap.appendChild(axLine('It decides', cur.decides));
    if (cur.population && cur.population.label) wrap.appendChild(axLine('Covers', populationLine(cur.population, cur)));

    container.appendChild(wrap);
  }

  /* ---------------- ranked factor plot — layer 2 ---------------- */

  function ranked(svg, ctx) {
    clear(svg);
    var rows = riskRows(ctx);
    var W = svg.clientWidth || svg.parentNode.clientWidth || 800;

    if (!rows.length) {
      svg.setAttribute('viewBox', '0 0 ' + W + ' 80');
      var none = el('text', { x: W / 2, y: 40, 'text-anchor': 'middle', fill: 'currentColor', opacity: 0.6 }, svg);
      none.textContent = 'This dataset has no factors[] block yet.';
      return;
    }

    var gutter = Math.min(260, Math.max(132, W * 0.30));
    /* Wide enough that the longest value label still fits to the RIGHT of the
       furthest dot. Flipping a label back across its own stem is the fallback,
       not the plan — a label struck through by its own line is unreadable. */
    var rightPad = Math.min(240, Math.max(110, W * 0.16));
    var axisBand = 34;
    var plotX = gutter;
    var plotW = Math.max(60, W - gutter - rightPad);

    /* A factor with no numeric effect size cannot be given a position — but
       dropping it would silently delete "increasing age", the strongest factor
       there is, from a chart about risk. So the unplottable ones get an explicit
       band below the axis instead of vanishing. */
    var plottable = [], unplotted = [];
    rows.forEach(function (r) { (r.value > 0 ? plottable : unplotted).push(r); });

    var lay = global.Layouts.rankedRows(plottable.map(function (r) {
      return { value: r.value, group: r.group, row: r };
    }), {
      x: plotX, y: axisBand + 8, w: plotW, h: 0
    }, { rowH: 22, rowGap: 9, groupGap: 30, groupHeadH: 22, origin: 1 });

    var unplotTop = axisBand + 8 + lay.height + 34;
    var unplotH = unplotted.length ? (24 + unplotted.length * 22) : 0;
    var H = unplotTop + unplotH + 46;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.height = H + 'px';

    var m = mode();
    var surface = SURFACE[m];

    // --- axis: hairline ticks, solid, one shade off the surface ---
    var axis = el('g', { class: 'rk-axis' }, svg);
    /* Gridlines are cheap; labels are not. On a log axis the ticks bunch up at
       the low end, so a label is only drawn where it clears the last one. */
    var lastLabelX = -Infinity;
    var MIN_TICK_GAP = 34;
    lay.ticks.forEach(function (t) {
      el('line', {
        x1: t.x, x2: t.x, y1: axisBand, y2: axisBand + 8 + lay.height,
        class: 'rk-grid'
      }, axis);
      // the origin carries the "no change" label instead — two labels collide
      if (t.value === 1) { lastLabelX = t.x; return; }
      if (t.x - lastLabelX < MIN_TICK_GAP) return;
      // "no change" is wider than a tick label, so give it room on both sides
      if (Math.abs(t.x - lay.originX) < 42) return;
      lastLabelX = t.x;
      var lb = el('text', { x: t.x, y: axisBand - 10, 'text-anchor': 'middle', class: 'rk-tick' }, axis);
      lb.textContent = '×' + t.value;
    });

    // the origin — the only line that means something, so it is drawn heavier
    el('line', {
      x1: lay.originX, x2: lay.originX, y1: axisBand, y2: axisBand + 8 + lay.height,
      class: 'rk-origin'
    }, axis);
    var ol = el('text', { x: lay.originX, y: 16, 'text-anchor': 'middle', class: 'rk-originlab' }, axis);
    ol.textContent = 'no change';

    // --- group headings ---
    lay.groups.forEach(function (g) {
      var t = el('text', { x: 8, y: g.headY, class: 'rk-group' }, svg);
      t.textContent = g.key;
    });

    // --- rows ---
    lay.rows.forEach(function (r) {
      var rec = r.item.row;
      var f = rec.factor;
      var dir = f.direction || 'increases';
      var fill = riskColor(dir);
      var mid = r.y + r.h / 2;

      var g = el('g', {
        class: 'rk-row' + (rec.dimmed ? ' is-dim' : '') +
               (ctx.selectedFactorId === f.id ? ' is-selected' : ''),
        role: 'button', tabindex: '0',
        'aria-label': f.label + ', ' + (f.magnitude || '') + ', ' +
                      (dir === 'decreases' ? 'lowers risk' : 'raises risk') +
                      (f.outcome === 'mortality' ? ', a multiplier on dying of it rather than on getting it' : '') +
                      (rec.conv ? ', ' + conversionText(rec.conv) : '')
      }, svg);

      // generous hit target — covers the row band, not just the dot
      el('rect', {
        x: 0, y: r.y - 4, width: W, height: r.h + 8,
        fill: 'transparent', class: 'rk-hit'
      }, g);

      // name in the gutter
      var nm = el('text', { x: gutter - 12, y: mid + 4, 'text-anchor': 'end', class: 'rk-name' }, g);
      nm.textContent = truncate(f.label, Math.floor((gutter - 20) / 6.4));

      /* One line when it fits on either side of the dot. Otherwise the stratum
         drops to a second line, and a line that still does not fit is cut to
         the room there is. The label never crosses into the gutter: lung's
         smoking rows ran over it, and their knockout erased the row's name. */
      var parts = [f.magnitude || ''];
      if (f.stratum) parts.push(f.stratum);
      var txt = parts.join('  ·  ');
      var wid = function (s) { return s.length * 6.1; };
      var roomR = W - 6 - (r.cx + 14), roomL = (r.cx - 14) - plotX;
      var lines, toRight;
      if (wid(txt) <= roomR) { lines = [txt]; toRight = true; }
      else if (wid(txt) <= roomL) { lines = [txt]; toRight = false; }
      else {
        var longest = Math.max.apply(null, parts.map(wid));
        toRight = longest <= roomR || (longest > roomL && roomR >= roomL);
        var room = toRight ? roomR : roomL;
        lines = parts.map(function (s) { return wid(s) <= room ? s : truncate(s, Math.floor(room / 6.1)); });
      }
      var estW = Math.max.apply(null, lines.map(wid));
      var lift = (lines.length - 1) * 7;

      // connector from the origin to the value — 2px, rounded ends
      el('line', {
        x1: lay.originX, x2: r.cx, y1: mid, y2: mid,
        stroke: fill, 'stroke-width': 2, 'stroke-linecap': 'round',
        class: 'rk-stem'
      }, g);

      /* When the label has to flip back across its own stem, knock the stem out
         behind it. A halo via paint-order is not dependable enough to rely on
         for legibility. */
      if (!toRight) {
        el('rect', {
          x: r.cx - 16 - estW, y: mid - 8 - lift, width: estW + 6, height: 16 + 2 * lift,
          fill: surface, class: 'rk-knockout'
        }, g);
      }

      // 2px surface ring so the dot reads against the origin line it may sit on
      el('circle', { cx: r.cx, cy: mid, r: 8, fill: surface, class: 'rk-ring' }, g);
      el('circle', { cx: r.cx, cy: mid, r: 6, fill: fill, class: 'rk-dot' }, g);

      // direction arrow — identity is never colour alone
      var ar = el('text', { x: r.cx, y: mid + 3.5, 'text-anchor': 'middle', class: 'rk-arrow',
                            fill: inkOn(fill) }, g);
      ar.textContent = dir === 'decreases' ? '↓' : dir === 'mixed' ? '↕' : '↑';

      var vl = el('text', {
        x: toRight ? r.cx + 14 : r.cx - 14,
        y: mid + 4 - lift,
        'text-anchor': toRight ? 'start' : 'end',
        class: 'rk-val'
      }, g);
      lines.forEach(function (s, i) {
        var ts = el('tspan', { x: toRight ? r.cx + 14 : r.cx - 14, dy: i ? 14 : 0 }, vl);
        ts.textContent = s;
      });
      // the whole label on hover, in case a line was cut
      if (lines.join('  ·  ') !== txt || lines.length > 1) el('title', {}, vl).textContent = txt;

      g.addEventListener('mouseenter', function (e) { tooltip(factorTip(rec, ctx), e); });
      g.addEventListener('mousemove', function (e) { tooltip(factorTip(rec, ctx), e); });
      g.addEventListener('mouseleave', function () { tooltip(null); });
      g.addEventListener('click', function () { ctx.selectFactor(f.id); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.selectFactor(f.id); }
      });
    });

    // --- factors that cannot be positioned, listed rather than dropped ---
    if (unplotted.length) {
      el('line', { x1: 8, x2: W - 8, y1: unplotTop - 14, y2: unplotTop - 14, class: 'rk-grid' }, svg);
      var uh = el('text', { x: 8, y: unplotTop + 2, class: 'rk-group' }, svg);
      uh.textContent = 'No comparable effect size — shown, not ranked';

      unplotted.forEach(function (rec, i) {
        var f = rec.factor;
        var uy = unplotTop + 22 + i * 22;
        var g = el('g', {
          class: 'rk-row rk-unplotted' + (rec.dimmed ? ' is-dim' : '') +
                 (ctx.selectedFactorId === f.id ? ' is-selected' : ''),
          role: 'button', tabindex: '0',
          'aria-label': f.label + ', ' + (f.magnitude || 'no published effect size') +
                        ', not plotted because it has no comparable numeric effect size'
        }, svg);

        el('rect', { x: 0, y: uy - 14, width: W, height: 22, fill: 'transparent', class: 'rk-hit' }, g);

        var nm = el('text', { x: gutter - 12, y: uy, 'text-anchor': 'end', class: 'rk-name' }, g);
        nm.textContent = truncate(f.label, Math.floor((gutter - 20) / 6.4));

        var mg = el('text', { x: plotX, y: uy, class: 'rk-val' }, g);
        var full = (f.direction === 'decreases' ? '↓ ' : f.direction === 'mixed' ? '↕ ' : '↑ ') +
                   (f.magnitude || 'no published figure') +
                   (f.modifiable ? '' : '  ·  not modifiable');
        /* Cut to the width there is, not past the card's edge (colorectal's
           race-ethnicity row ran off it); the whole line is on hover. */
        var fit = Math.floor((W - 8 - plotX) / 6.1);
        mg.textContent = truncate(full, fit);
        if (full.length > fit) el('title', {}, mg).textContent = full;

        g.addEventListener('mouseenter', function (e) { tooltip(factorTip(rec, ctx), e); });
        g.addEventListener('mousemove', function (e) { tooltip(factorTip(rec, ctx), e); });
        g.addEventListener('mouseleave', function () { tooltip(null); });
        g.addEventListener('click', function () { ctx.selectFactor(f.id); });
        g.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.selectFactor(f.id); }
        });
      });
    }

    // --- footnote: what the axis actually is ---
    var fn1 = el('text', { x: 8, y: H - 30, class: 'rk-foot' }, svg);
    fn1.textContent = 'Horizontal position is the effect size on a ratio scale. Absolute risks (germline variants) ' +
                      'are placed by that risk divided by the baseline, roughly; the label shows the real figure.';
    /* Without this line the male-BRCA2 row reads as the largest risk on the
       chart, when it is a large multiple of a very small baseline. */
    var fn2 = el('text', { x: 8, y: H - 14, class: 'rk-foot' }, svg);
    fn2.textContent = 'Rows marked for a specific population (men, for instance) are placed against that ' +
                      'population\'s own baseline, so their position is not comparable with the rest.';
  }

  /* Two series, so a legend is mandatory — but direction is also carried by the
     arrow glyph and by which side of the origin the dot sits on, so a reader who
     cannot separate the hues loses nothing. */
  function riskLegend(container, ctx) {
    clear(container);

    [['increases', '↑ raises risk'], ['decreases', '↓ lowers risk']].forEach(function (pair) {
      var item = h('span', 'item');
      var sw = h('span', 'swatch');
      sw.style.background = riskColor(pair[0]);
      item.appendChild(sw);
      item.appendChild(h('span', null, pair[1]));
      container.appendChild(item);
    });

    if (ctx.view === 'ranked') {
      container.appendChild(h('span', 'item note', 'Distance from the centre line ∝ effect size (ratio scale)'));
    }
    if (ctx.view !== 'detection') {
      container.appendChild(h('span', 'item note', 'Grouped by whether you can change it'));
    }
  }

  function factorTip(rec, ctx) {
    var f = rec.factor;
    var box = document.createDocumentFragment();
    box.appendChild(h('div', 't-title', f.label));
    if (f.magnitude) box.appendChild(h('div', 't-row', f.magnitude));
    if (rec.conv) box.appendChild(h('div', 't-row', conversionText(rec.conv)));
    else if (f.rr && f.outcome === 'mortality') {
      box.appendChild(h('div', 't-row', 'a multiplier on dying of it, not on getting it'));
    } else if (f.rr && f.referent === 'other') {
      box.appendChild(h('div', 't-row', 'relative to a group outside this population — not converted'));
    } else if (f.rr && f.scope && f.scope !== 'overall') {
      var sn = ctx.nodeById(f.scope);
      box.appendChild(h('div', 't-row', 'of ' + (sn ? sn.label : f.scope) +
        ' specifically — not of ' + cancerName(ctx) + ' overall'));
    }
    box.appendChild(h('div', 't-row', (f.modifiable ? 'Modifiable' : 'Not modifiable') +
      (f.evidence ? '  ·  ' + f.evidence + ' evidence' : '')));
    box.appendChild(h('div', 't-hint', 'Click for detail'));
    return box;
  }

  /* ---------------- risk table — the accessible twin ---------------- */

  function riskTable(container, ctx) {
    clear(container);
    var rows = riskRows(ctx);
    var tbl = h('table');
    var thead = h('thead');
    var hr = h('tr');
    /* "Modifiable: yes/no" rather than the group's prose name — the sentence
       "What you can change" wraps to one word per line in a table cell. */
    ['Factor', 'Modifiable', 'Category', 'Direction', 'Effect size', 'In absolute terms', 'Evidence', 'Applies to']
      .forEach(function (c) { hr.appendChild(h('th', null, c)); });
    thead.appendChild(hr);
    tbl.appendChild(thead);

    var tb = h('tbody');
    rows.forEach(function (rec) {
      var f = rec.factor;
      var tr = h('tr', (ctx.selectedFactorId === f.id ? 'is-selected' : '') +
                       (rec.dimmed ? ' is-dim' : ''));
      tr.addEventListener('click', function () { ctx.selectFactor(f.id); });

      tr.appendChild(h('td', 'f-name', f.label));
      tr.appendChild(h('td', 'nw', f.modifiable ? 'yes' : 'no'));
      tr.appendChild(h('td', 'nw', f.category || '—'));
      tr.appendChild(h('td', 'nw',
        f.direction === 'decreases' ? '↓ lowers' : f.direction === 'mixed' ? '↕ mixed' : '↑ raises'));
      tr.appendChild(h('td', 'num', f.magnitude || '—'));

      var absCell = h('td', 'num');
      if (rec.conv) absCell.textContent = conversionText(rec.conv);
      else if (f.absoluteLifetime) absCell.textContent = 'already absolute (the effect size column)';
      else if (f.outcome === 'mortality') {
        absCell.textContent = 'not convertible — a mortality multiplier, not an incidence one';
      } else if (f.rr && f.referent === 'other') {
        absCell.textContent = 'not convertible — measured against a group outside this population';
      } else if (f.scope && f.scope !== 'overall') {
        var sn = ctx.nodeById(f.scope);
        absCell.textContent = 'not convertible — scoped to ' + (sn ? sn.label : f.scope);
      } else absCell.textContent = '—';
      tr.appendChild(absCell);

      tr.appendChild(h('td', 'nw', f.evidence || '—'));
      tr.appendChild(h('td', null, (f.affects || []).map(function (id) {
        var n = ctx.nodeById(id);
        return n ? (n.shortLabel || n.label) : id;
      }).join(', ') || '—'));

      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    container.appendChild(tbl);
  }

  /* ---------------- detection — layer 3 ---------------- */

  function detection(container, ctx) {
    clear(container);
    citeReset();
    var ds = ctx.dataset() || {};
    var det = ds.detection;
    if (!det) {
      container.appendChild(h('p', 'dt-note', 'This dataset has no detection block yet.'));
      return;
    }

    if (det.note) container.appendChild(h('p', 'dt-lede', det.note));

    // --- stage outcomes: the comparison that carries the whole argument ---
    var stages = det.stageOutcomes || [];
    if (stages.length) {
      container.appendChild(h('h3', null, 'Survival by stage at diagnosis'));

      /* The window this table is measured over, stated before the numbers
         rather than after them. Five years is long enough to separate the
         stages of a fast cancer and far too short for a slow one — prostate
         reports the same 100.0% for localised and regional disease, which is
         true and reads as "spread to the nodes does not matter". Where the
         dataset knows its window is doing that, it says so here. */
      if (det.horizonNote) container.appendChild(h('p', 'dt-horizon', det.horizonNote));

      /* 100 is the domain, not the largest observed value. These are percentages
         and the reader reads them as such; normalising to the maximum would make
         a 70%-best dataset draw a full bar for 70%. It happens to be exactly 100
         today (SEER's localised figure), which is precisely why the bug would
         have gone unnoticed until the source moved. Relative survival can exceed
         100%, so the domain widens rather than clipping. */
      var maxFive = stages.reduce(function (mx, s) {
        return typeof s.fiveYear === 'number' && s.fiveYear > mx ? s.fiveYear : mx;
      }, 100);

      var wrap = h('div', 'dt-stages');
      stages.forEach(function (s, i) {
        var row = h('div', 'dt-stage');

        var head = h('div', 'dt-stage-head');
        head.appendChild(h('span', 'nm', s.stage));
        if (typeof s.share === 'number') {
          head.appendChild(h('span', 'sh', fmtPct(s.share) + ' of cases'));
        }
        row.appendChild(head);

        var barWrap = h('div', 'dt-bar');
        var bar = h('div', 'dt-bar-fill');
        bar.style.width = Math.max(1, (s.fiveYear / maxFive) * 100) + '%';
        /* One series, one colour. Bar length already carries the magnitude, so
           colouring the stages green/amber/red would double-encode it — and it
           would spend the reserved status palette on something that is not a
           status. The stage name is the label; the number is beside it. */
        bar.style.background = seriesColor(0);
        barWrap.appendChild(bar);
        row.appendChild(barWrap);

        var val = h('div', 'dt-stage-val');
        /* fmtExact, not fmtRisk: 99.6 must not render as "100%". */
        val.appendChild(h('span', 'v', typeof s.fiveYear === 'number' ? fmtExact(s.fiveYear) : '—'));
        val.appendChild(citeInto(h('span', 'k', '5-year relative survival'), s.source, ctx));
        /* A second horizon where the source has one. It sits beside the first
           rather than replacing it, because the point is the gap between them:
           two stages that look identical at five years can be far apart at ten. */
        if (typeof s.tenYear === 'number') {
          val.appendChild(h('span', 'v2', fmtExact(s.tenYear)));
          val.appendChild(h('span', 'k', 'at 10 years'));
        }
        row.appendChild(val);

        if (s.note) row.appendChild(h('p', 'dt-stage-note', s.note));
        wrap.appendChild(row);
      });
      container.appendChild(wrap);
    }

    // --- the trade-off, benefit and harm side by side ---
    if (det.tradeoff) tradeoff(container, det.tradeoff);

    // --- modalities ---
    if ((det.modalities || []).length) {
      container.appendChild(h('h3', null, 'How it gets found'));
      det.modalities.forEach(function (mo) {
        var card = h('div', 'dt-mod');
        var top = h('div', 'top');
        top.appendChild(h('span', 'nm', mo.name));
        if (mo.role) top.appendChild(h('span', 'tag', mo.role));
        card.appendChild(top);
        if (mo.catches) card.appendChild(dtLine('Catches', mo.catches, mo.catchesSource, ctx));
        if (mo.misses) card.appendChild(dtLine('Misses', mo.misses, mo.missesSource, ctx));
        /* `catches` and `misses` are both about accuracy. Neither can hold what
           the test costs the people who take it, and a screening test described
           only by what it finds reads as a recommendation to take it. */
        if (mo.harms) card.appendChild(dtLine('Costs', mo.harms, mo.harmsSource || mo.source, ctx));
        if (mo.sensitivity) card.appendChild(dtLine('Sensitivity', mo.sensitivity, mo.sensitivitySource, ctx));
        if (mo.interval) card.appendChild(dtLine('Interval', mo.interval, mo.intervalSource, ctx));
        if (mo.note) card.appendChild(citeInto(h('p', 'n', mo.note), mo.noteSource, ctx));
        container.appendChild(card);
      });
    }

    // --- signs ---
    if ((det.signs || []).length) {
      container.appendChild(h('h3', null, 'Changes worth reporting promptly'));
      var ul = h('ul', 'dt-signs');
      det.signs.forEach(function (s) { ul.appendChild(h('li', null, s)); });
      container.appendChild(ul);
    }

    citeList(container, 'References for the figures above');

    var detExtra = (det.sources || []).filter(function (s) { return !citeHas(s); });
    if (detExtra.length) {
      container.appendChild(h('h3', null, 'Other sources for this section'));
      var sl = h('ul', 'srcs');
      detExtra.forEach(function (s) {
        var li = h('li');
        if (s.url) {
          var a = h('a', null, s.label);
          a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
          li.appendChild(a);
        } else li.textContent = s.label;
        sl.appendChild(li);
      });
      container.appendChild(sl);
    }
  }

  /* How many decimal places a number was written with. JS discards the
     trailing zero in 0.80, so the source of truth is the literal's own
     precision, not the value. */
  function decimalsOf(v) {
    var s = String(v), i = s.indexOf('.');
    return i === -1 ? 0 : s.length - i - 1;
  }

  function dtLine(k, v, src, ctx) {
    var p = h('p', 'dt-line');
    p.appendChild(h('span', 'k', k));
    p.appendChild(citeInto(h('span', 'v', v), src, ctx));
    return p;
  }

  /* What screening buys and what it costs, rendered together.

     Both columns are drawn from one `basis`, printed once above them, because
     the numbers are only comparable on a shared denominator — "8 deaths
     averted" against "1,376 false positives" means nothing until you know both
     are per 1,000 women screened biennially from 40 to 74 over a lifetime.

     They are laid out side by side and never one after the other. A benefit
     paragraph followed three screens later by a harms paragraph is how this
     material is normally presented and is why almost nobody can state the cost
     of the test they have been advised to take. */
  function tradeoff(container, tr) {
    container.appendChild(h('h3', null, 'What screening buys, and what it costs'));
    if (tr.note) container.appendChild(h('p', 'dt-lede', tr.note));

    if (tr.basis) {
      var b = h('p', 'to-basis');
      b.appendChild(h('span', 'k', 'Both columns are'));
      b.appendChild(h('span', 'v', tr.basis));
      container.appendChild(b);
    }

    var rows = tr.rows || [];
    var cols = h('div', 'to-cols');
    [['benefit', 'What it buys'], ['harm', 'What it costs']].forEach(function (pair) {
      var mine = rows.filter(function (r) { return r.kind === pair[0]; });
      if (!mine.length) return;
      var col = h('div', 'to-col ' + pair[0]);
      col.appendChild(h('h4', null, pair[1]));
      mine.forEach(function (r) {
        var item = h('div', 'to-row');
        item.appendChild(h('span', 'v', String(r.value)));
        item.appendChild(h('span', 'k', r.label));
        if (r.note) item.appendChild(h('p', 'n', r.note));
        col.appendChild(item);
      });
      cols.appendChild(col);
    });
    if (cols.childNodes.length) container.appendChild(cols);

    /* The effect size the whole argument rests on, with its interval and its
       follow-up. A rate ratio without the length of follow-up behind it is not
       a finding, and the interval is what separates "it works" from "it might". */
    var e = tr.effect;
    if (e) {
      var box = h('div', 'to-effect');
      var head = h('p', 'hd');
      /* Pad the bounds and the point estimate to a common number of decimals.
         [0.80, 0.95] arrives as the numbers 0.8 and 0.95 and would otherwise
         print "0.8–0.95", which reads as a typo in a confidence interval. */
      var dp = 0;
      if (e.ci) dp = Math.max(decimalsOf(e.ci[0]), decimalsOf(e.ci[1]));
      if (typeof e.point === 'number') dp = Math.max(dp, decimalsOf(e.point));
      var val = (e.measure ? e.measure + ' ' : '') +
                (typeof e.point === 'number' ? e.point.toFixed(dp) : '—') +
                (e.ci ? ' (95% CI ' + e.ci[0].toFixed(dp) + '–' + e.ci[1].toFixed(dp) + ')' : '');
      head.appendChild(h('span', 'v', val));
      if (e.of) head.appendChild(h('span', 'k', 'for ' + e.of));
      box.appendChild(head);
      if (e.followUp) box.appendChild(dtLine('Follow-up', e.followUp));
      if (e.note) box.appendChild(h('p', 'n', e.note));
      container.appendChild(box);
    }

    /* Where the sources disagree, said here rather than resolved silently.
       This is the same rule the Evidence lens follows: a contested number is a
       finding about the evidence, not a problem to be tidied away. */
    if (tr.disagreement) {
      var d = h('div', 'to-disagree');
      d.appendChild(h('h4', null, 'Where the sources disagree'));
      d.appendChild(h('p', 'n', tr.disagreement));
      container.appendChild(d);
    }

    if ((tr.sources || []).length) {
      var ul = h('ul', 'srcs');
      tr.sources.forEach(function (s) {
        var li = h('li');
        if (s.url) {
          var a = h('a', null, s.label);
          a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
          li.appendChild(a);
        } else li.textContent = s.label;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }
  }

  /* ---------------- factor drawer ---------------- */

  function factorDrawer(container, factor, ctx) {
    clear(container);
    if (!factor) {
      container.appendChild(h('div', 'drawer-empty',
        'Select a factor to see its effect size, what it applies to, and how it converts.'));
      return;
    }

    var ds = ctx.dataset() || {};
    var conv = conversion(ds, factor);
    var base = baselineFor(ds, factor);

    container.appendChild(h('h2', null, factor.label));

    var meta = [factor.category || 'Other',
                factor.modifiable ? MODIFIABLE_GROUP : FIXED_GROUP].join('  ›  ');
    container.appendChild(h('p', 'd-path', meta));

    var chips = h('div', 'chips');
    var dchip = h('span', 'chip ' + (factor.direction === 'decreases' ? 'pos' : 'neg'));
    dchip.appendChild(h('span', 'k', factor.direction === 'decreases' ? '↓' : factor.direction === 'mixed' ? '↕' : '↑'));
    dchip.appendChild(h('span', null, factor.direction === 'decreases' ? 'lowers risk'
      : factor.direction === 'mixed' ? 'mixed' : 'raises risk'));
    chips.appendChild(dchip);
    if (factor.evidence) {
      var echip = h('span', 'chip var');
      echip.appendChild(h('span', 'k', 'evidence'));
      echip.appendChild(h('span', null, factor.evidence));
      chips.appendChild(echip);
    }
    container.appendChild(chips);

    // headline effect size
    var stats = h('div', 'stat-row');
    if (factor.magnitude) stats.appendChild(stat(factor.magnitude, 'effect size'));
    /* Most absolute figures are counted to an age ("72% by age 80"), not over a
       lifetime, and the magnitude already names it. A second stat labelled
       "lifetime risk" restated the figure under the wrong name. */
    if (factor.absoluteLifetime && !factor.magnitude) {
      stats.appendChild(stat(fmtRange(factor.absoluteLifetime[0], factor.absoluteLifetime[1]),
        'absolute risk'));
    }
    if (stats.childNodes.length) container.appendChild(stats);

    // the conversion, or an explicit statement of why there isn't one
    container.appendChild(h('h3', null, 'In absolute terms'));
    if (conv) {
      var cv = h('div', 'conv');
      cv.appendChild(h('span', 'from', 'about ' + fmtRisk(conv.from)));
      cv.appendChild(h('span', 'arrow', '→'));
      cv.appendChild(h('span', 'to',
        conv.bound === 'upper' ? 'at most about ' + fmtRisk(conv.hi)
        : conv.bound === 'lower' ? 'at least about ' + fmtRisk(conv.lo)
        : conv.bound === 'range' ? 'somewhere in about ' + fmtRange(conv.lo, conv.hi)
        : 'about ' + fmtRange(conv.lo, conv.hi)));
      container.appendChild(cv);
      var who = 'Lifetime risk for ' + (conv.population || 'this population') +
        (conv.per ? ', per ' + conv.per + ' sustained over time' : '') + '. ';
      container.appendChild(h('p', 'conv-note', conv.bound
        ? who + 'This is a limit, not an estimate. The studies compared people with the ' +
          'exposure against people without it, and the ' + fmtRisk(conv.from) + ' baseline counts ' +
          'both groups together — so the unexposed group\'s own risk is ' +
          (conv.bound === 'lower' ? 'higher' : 'lower') + ' than the baseline, and multiplying the ' +
          'baseline by the relative risk gives the ' +
          (conv.bound === 'lower' ? 'lowest' : conv.bound === 'upper' ? 'highest' : 'furthest') +
          ' the figure could be. It is close when few people are exposed and far off when many are.'
        : who + 'The relative figure is the same number the studies report; this line is ' +
          'only it multiplied by the baseline.'));
    } else if (factor.rr && factor.referent === 'other') {
      container.appendChild(h('p', 'conv-note',
        'Not converted on purpose. This relative risk compares people with the exposure against ' +
        'the study\'s own comparison group, which is not part of the ' +
        (base ? fmtRisk(base.risk) + ' ' : '') + 'baseline population at all — so the two numbers ' +
        'share no denominator, and multiplying them would describe nobody.'));
    } else if (factor.absoluteLifetime) {
      container.appendChild(h('p', 'conv-note',
        /* With a stratum, the stratum is the comparison group (never smokers
           beside current smokers), not a baseline being replaced — saying
           "replaces the 1.3% baseline" read as though 1.3% were the average. */
        (factor.stratum && base
          ? 'Already absolute. The figure above is a chance of being diagnosed, set beside ' +
            fmtRisk(base.risk) + ' for ' + base.population + '. Neither number is multiplied by anything.'
          : 'Already absolute. The figure above is a chance of being diagnosed, counted over the ages it ' +
            'names, not a multiplier, so it stands on its own instead of multiplying the ' +
            (base ? fmtRisk(base.risk) + ' ' : '') + 'lifetime baseline.')));
    } else if (factor.rr && factor.outcome === 'mortality') {
      container.appendChild(h('p', 'conv-note',
        'Not converted on purpose, and for a different reason than the scoped factors. This ' +
        'multiplier is on the chance of DYING of ' + cancerName(ctx) + '. The ' +
        (base ? fmtRisk(base.risk) : 'baseline') + ' figure everything else on this page converts ' +
        'against is the chance of being DIAGNOSED. Multiplying one by the other would produce a ' +
        'number that is neither — and it would look entirely reasonable, which is why it is ' +
        'blocked here rather than left to the reader.'));
    } else if (factor.rr && factor.scope && factor.scope !== 'overall') {
      var scopeNode = ctx.nodeById(factor.scope);
      container.appendChild(h('p', 'conv-note',
        'Not converted on purpose. This multiplier was measured against ' +
        (scopeNode ? scopeNode.label : factor.scope) + ', not against ' + cancerName(ctx) + ' overall, ' +
        'so multiplying it by the ' + (base ? fmtRisk(base.risk) : 'overall') +
        ' baseline would produce a number no study supports.'));
    } else if (/(^|[\s(~<>=+,])\d/.test(factor.magnitude || '')) {
      /* A figure is printed above, so "none is shown" would contradict the
         page: say why it stays unconverted instead. */
      container.appendChild(h('p', 'conv-note',
        'Not converted to a lifetime risk. The figure above is not a single multiplier on the whole ' +
        'population\'s risk: it is a rate, an age, a comparison between two groups, or a ratio that holds ' +
        'only under particular conditions. Multiplying the ' + (base ? fmtRisk(base.risk) + ' ' : '') +
        'baseline by it would produce a number no study reports.'));
    } else {
      container.appendChild(h('p', 'conv-note',
        'No numeric effect size is published here in a form that converts cleanly, so none is shown. ' +
        'The qualitative magnitude above is what the evidence supports.'));
    }

    if (factor.note) {
      container.appendChild(h('h3', null, 'Detail'));
      container.appendChild(h('p', 'summary', factor.note));
    }

    // links back into Book II
    if ((factor.affects || []).length) {
      container.appendChild(h('h3', null, 'Where it shows up'));
      factor.affects.forEach(function (id) {
        var n = ctx.nodeById(id);
        if (!n) return;
        var b = h('button', 'rel-item');
        b.type = 'button';
        b.appendChild(h('span', 'name', n.label));
        b.appendChild(document.createTextNode(' '));
        b.appendChild(h('span', 'kind', ctx.axisLabelOf(n.axis)));
        b.addEventListener('click', function () { ctx.activate(id); });
        container.appendChild(b);
      });
    }

    container.appendChild(h('h3', null, 'Source'));
    /* A source may be one of the forms resolveSource reads, or an array of
       them. One paper cited twice, for two figures, prints once with both
       sentences under it. */
    var fsrcs = Object.prototype.toString.call(factor.source) === '[object Array]'
      ? factor.source : (factor.source ? [factor.source] : []);
    var printed = [];
    fsrcs.forEach(function (one) {
      var r = resolveSource(one, ctx);
      if (!r) return;
      var key = r.url || r.label, group = null;
      for (var i = 0; i < printed.length; i++) if (printed[i].key === key) group = printed[i];
      if (!group) { group = { key: key, ref: r, quotes: [] }; printed.push(group); }
      if (r.quote && group.quotes.indexOf(r.quote) === -1) group.quotes.push(r.quote);
    });
    printed.forEach(function (g) {
      container.appendChild(citation(g.ref));
      g.quotes.forEach(function (q) { container.appendChild(h('q', 'fn-quote', q)); });
    });
    if (!printed.length) {
      /* Said plainly rather than left blank — an uncited effect size in the
         public-facing view is exactly what the citation audit exists to find. */
      container.appendChild(h('p', 'conv-note',
        'No citation recorded for this figure. It is curated judgement, not a fetched ' +
        'number — treat it accordingly.'));
    }
  }

  /* One citation, rendered the same way everywhere it appears. */
  /* ================= footnotes =================

     Every claim carrying a number — a therapy, a pathway share, a biomarker
     threshold, a prognosis figure — should be checkable without leaving the
     page guessing. Printing a full citation beside each one would bury the
     claim; so each gets a superscript marker and the drawer ends with the
     numbered list.

     A source may be written four ways, all resolved here:
       'ref-id'                  an entry in references[]
       { ref: 'ref-id', quote }  the same entry, plus the sentence in the paper
                                 that states the figure (checked verbatim by
                                 the pipeline); printed under the footnote
       { label, url }            a one-off citation
       { nct: 'NCT01740427' }    a trial, turned into a registry link

     The registry form is the one worth preferring where it fits: an NCT id is
     re-verified against ClinicalTrials.gov on every pipeline run, so it cannot
     rot into a dead URL the way a hand-typed link does.
  ============================================================= */

  var footnotes = { seen: {}, list: [] };

  function citeReset() { footnotes = { seen: {}, list: [] }; }

  /* Normalise any of the four forms into { label, url, journal, pmid } — plus
     `quote` for the { ref, quote } form. The reference itself is copied, never
     written to: it is shared by every drawer that cites it. */
  function resolveSource(src, ctx) {
    if (!src) return null;
    if (typeof src === 'string') {
      var ref = ctx && ctx.reference ? ctx.reference(src) : null;
      return ref && ref.label ? ref : { label: src };
    }
    if (src.ref) {
      var base = resolveSource(src.ref, ctx);
      if (!base || !src.quote) return base;
      return { label: base.label, url: base.url, journal: base.journal, pmid: base.pmid, quote: src.quote };
    }
    if (src.nct) {
      return {
        label: (src.label ? src.label + ' — ' : '') + src.nct,
        url: 'https://clinicaltrials.gov/study/' + src.nct,
        journal: src.journal || 'ClinicalTrials.gov'
      };
    }
    return src.label ? src : null;
  }

  /* A superscript marker. Same source twice in one drawer gets one number. */
  function citeMark(src, ctx) {
    var ref = resolveSource(src, ctx);
    if (!ref) return null;
    var key = ref.url || ref.label;
    var n = footnotes.seen[key];
    if (!n) {
      n = footnotes.list.length + 1;
      footnotes.seen[key] = n;
      footnotes.list.push({ label: ref.label, url: ref.url, journal: ref.journal, pmid: ref.pmid, quotes: [] });
    }
    /* One paper can back several figures in a drawer, each with its own
       sentence: the footnote keeps every distinct one. */
    var entry = footnotes.list[n - 1];
    if (ref.quote && entry.quotes.indexOf(ref.quote) === -1) entry.quotes.push(ref.quote);
    var s = h('sup', 'fn-mark', String(n));
    s.title = ref.label + (ref.quote ? '\n“' + ref.quote + '”' : '');
    return s;
  }

  /* Append the marker(s) to an element. `source` may be one source or several:
     a therapy naming three drugs is three claims and gets three numbers. Two
     quotes from one paper on the same claim still file both quotes under its
     footnote, but print its number once ("2 3", not "2 2 3"). */
  function citeInto(el_, src, ctx) {
    if (!src) return el_;
    var list = Object.prototype.toString.call(src) === '[object Array]' ? src : [src];
    var printed = {};
    list.forEach(function (one) {
      var m = citeMark(one, ctx);
      if (!m || printed[m.textContent]) return;
      printed[m.textContent] = true;
      el_.appendChild(m);
    });
    return el_;
  }

  /* Has this source already been given a number in this drawer? Used to keep
     a block-level sources[] list from repeating, immediately underneath, the
     same paper the footnotes just cited by number. */
  function citeHas(s) {
    if (!s) return false;
    return !!footnotes.seen[s.url || s.label];
  }

  /* The numbered list, rendered at the end of whatever collected them. */
  function citeList(container, heading) {
    if (!footnotes.list.length) return;
    container.appendChild(h('h3', null, heading || 'Sources for the figures above'));
    var ol = h('ol', 'fn-list');
    footnotes.list.forEach(function (ref) {
      var li = h('li');
      if (ref.url) {
        var a = h('a', null, ref.label);
        a.href = ref.url; a.target = '_blank'; a.rel = 'noopener';
        li.appendChild(a);
      } else {
        li.appendChild(h('span', null, ref.label));
      }
      var bits = [ref.journal, ref.pmid ? 'PMID ' + ref.pmid : null].filter(Boolean);
      if (bits.length) li.appendChild(h('span', 'meta', bits.join(' · ')));
      (ref.quotes || []).forEach(function (q) {
        li.appendChild(h('q', 'fn-quote', q));
      });
      ol.appendChild(li);
    });
    container.appendChild(ol);
  }

  function citation(ref) {
    var p = h('p', 'cite');
    if (ref.url) {
      var a = h('a', null, ref.label);
      a.href = ref.url; a.target = '_blank'; a.rel = 'noopener';
      p.appendChild(a);
    } else {
      p.appendChild(h('span', null, ref.label));
    }
    var bits = [ref.journal, ref.pmid ? 'PMID ' + ref.pmid : null].filter(Boolean);
    if (bits.length) p.appendChild(h('span', 'meta', bits.join(' · ')));
    return p;
  }

  /* ================= Book V — the frontier =================

     The top of the ladder: what is being published about the problems with the
     drugs the Targets lens ends on. A trial register is already history; the
     mechanism that will limit or replace an agent shows up here first.

     This is also the layer where it would be easiest to mislead, because most
     of it is preclinical and "cured in mice" is the most misreported category
     of science writing there is. So the renderer enforces what prose cannot:
     no title is ever drawn without its evidence tier and species beside it,
     `unclear` is printed as `unclear`, every row states which term actually
     matched, and nothing anywhere is sorted or styled by promise.
  ========================================================= */

  var KIND_LABEL = {
    'toxicity': 'Work on the side-effects that limit a drug',
    'resistance': 'Work on why a drug stops working',
    'new-approach': 'Other things being aimed at the same target'
  };
  var KIND_ORDER = ['resistance', 'toxicity', 'new-approach'];

  var TIER_ORDER = ['meta-analysis', 'systematic review', 'trial', 'review', 'primary', 'preprint'];

  function tierClass(t) { return 'tier-' + String(t || '').replace(/[^a-z]/gi, '-'); }

  function paperCard(p, ctx) {
    var card = h('div', 'lit-paper');

    /* The badges come FIRST and are part of the title block, not a footnote.
       A reader who takes only the headline still cannot miss that this is a
       preprint about mice. */
    var badges = h('div', 'badges');
    badges.appendChild(term(p.tier, 'badge ' + tierClass(p.tier)));
    if (!p.peer_reviewed) {
      badges.appendChild(h('span', 'badge warn', 'not peer reviewed'));
    }
    var sp = term(p.species, 'badge species sp-' + String(p.species).replace(/\s+/g, '-'));
    if (p.species_from === 'keywords') sp.title = 'inferred from the title and abstract, not from MeSH indexing';
    if (p.species_from === 'none') sp.title = 'could not be determined — shown as unclear rather than guessed';
    badges.appendChild(sp);
    if (p.oa) badges.appendChild(h('span', 'badge oa', 'open access'));
    card.appendChild(badges);

    var t = h('a', 'ttl', p.title);
    t.href = p.url; t.target = '_blank'; t.rel = 'noopener';
    card.appendChild(t);

    var meta = [p.journal, p.date].filter(Boolean).join(' · ');
    if (meta) card.appendChild(h('div', 'meta', meta));
    if (p.authors) card.appendChild(h('div', 'auth', p.authors));

    // why this paper is on this page — so a bad match reads as a bad match
    var why = h('div', 'why');
    why.appendChild(h('span', 'k', p.subject));
    if ((p.matched || []).length) {
      why.appendChild(h('span', null, 'mentions ' + p.matched.join(', ')));
    } else {
      why.appendChild(h('span', 'weak', 'matched on full text only — the terms are not in the title or abstract'));
    }
    card.appendChild(why);

    if ((p.also || []).length) {
      card.appendChild(h('div', 'also', 'also answers: ' + p.also.map(function (a) {
        return a.kind + ' / ' + a.subject;
      }).join('; ')));
    }
    return card;
  }

  function literature(container, ctx) {
    clear(container);
    var lit = ctx.literatureData();
    if (!lit) {
      container.appendChild(h('p', 'dt-note',
        'This dataset has no literature overlay. Run `python run.py literature` in pipeline/.'));
      return;
    }

    container.appendChild(h('p', 'dt-lede',
      'The drug pipeline in the Targets lens is already history — an agent reaches a trial ' +
      'register years after the idea. This is the layer above it: what is being published ' +
      'right now about the problems with those drugs, and what else is being aimed at the ' +
      'same targets.'));

    /* Said once, at the top, in the same voice as the risk lens's no-score rule. */
    container.appendChild(h('p', 'lit-warn',
      'Nothing here is ranked by promise, because that cannot be computed. Citation counts ' +
      'are zero for recent work, and no rule can tell which new mechanism will succeed. What ' +
      'each row does tell you is its evidence tier, whether it was done in people, and which ' +
      'search term it actually matched. Most of this is preclinical: ' +
      (lit.by_species || {}).mouse + ' of ' + lit.n_papers + ' papers are mouse work and ' +
      (lit.by_tier || {}).preprint + ' are preprints that no reviewer has seen.'));

    var snap = h('p', 'lit-snap');
    snap.appendChild(h('span', 'k', 'Snapshot'));
    snap.appendChild(document.createTextNode(
      lit.n_papers + ' papers published since ' + lit.since + ', fetched from ' +
      (lit.source || 'Europe PMC') + '. Literature moves daily; re-run the pipeline to refresh.'));
    container.appendChild(snap);

    // tier filter — the one control that matters here
    var bar = h('div', 'lit-filter');
    bar.appendChild(h('span', 'lbl', 'Show'));
    var tiers = ['all'].concat(TIER_ORDER.filter(function (t) {
      return (lit.by_tier || {})[t];
    }));
    tiers.forEach(function (t) {
      var b = h('button', 'chipbtn' + (ctx.litTier === t ? ' on' : ''));
      b.type = 'button';
      b.textContent = t === 'all' ? 'everything (' + lit.n_papers + ')'
        : t + ' (' + lit.by_tier[t] + ')';
      b.addEventListener('click', function () { ctx.setLitTier(t); });
      bar.appendChild(b);
    });
    container.appendChild(bar);

    var papers = (lit.papers || []).filter(function (p) {
      return ctx.litTier === 'all' || p.tier === ctx.litTier;
    });

    KIND_ORDER.forEach(function (kind) {
      var rows = papers.filter(function (p) { return p.kind === kind; });
      if (!rows.length) return;
      container.appendChild(h('h3', null, KIND_LABEL[kind] + ' (' + rows.length + ')'));

      // group by the agent or gene the question is about
      var bySubject = {};
      var order = [];
      rows.forEach(function (p) {
        if (!bySubject[p.subject]) { bySubject[p.subject] = []; order.push(p.subject); }
        bySubject[p.subject].push(p);
      });
      order.sort(function (a, b) { return bySubject[b].length - bySubject[a].length; });

      order.forEach(function (subj) {
        var list = bySubject[subj];
        var grp = h('div', 'lit-group');
        var gh = h('div', 'ghead');
        gh.appendChild(h('span', 'nm', subj));
        gh.appendChild(h('span', 'n', list.length + ' paper' + (list.length === 1 ? '' : 's')));
        grp.appendChild(gh);
        list.slice(0, 8).forEach(function (p) { grp.appendChild(paperCard(p, ctx)); });
        if (list.length > 8) {
          grp.appendChild(h('p', 'more', 'and ' + (list.length - 8) +
            ' more, newest shown first — narrow by tier above'));
        }
        container.appendChild(grp);
      });
    });

    if (!papers.length) {
      container.appendChild(h('p', 'dt-note', 'No papers at this evidence tier.'));
    }

    container.appendChild(h('h3', null, 'How this list was built'));
    var ul = h('ul', 'srcs');
    ul.appendChild(h('li', null, 'Source: ' + lit.source));
    ul.appendChild(h('li', null, 'Agent classes searched: ' + (lit.agents_queried || []).join(', ')));
    /* The two worked examples that used to sit here were T-DXd and CDK4/6, i.e.
       breast's. The overlay carries `agents_queried` but not the problem each
       was paired with, so the honest version states the method and points at
       the list above rather than inventing an example for whichever cancer is
       loaded. Restore named pairs here once the pipeline emits them. */
    ul.appendChild(h('li', null,
      'Each search pairs one of the classes above with the problems reported for it — its own ' +
      'toxicities and its own resistance mechanisms — rather than running a generic ' +
      '"resistance" sweep. Every search is scoped to ' + cancerName(ctx) + '.'));
    ul.appendChild(h('li', null, lit.caveat));
    container.appendChild(ul);
  }

  /* ================= Book III — evidence =================

     Everything here already existed as files; none of it was reachable from the
     UI. The concordance matrix in particular is the quantitative form of the
     README's central claim — that the classification axes genuinely disagree —
     and it was sitting unused in the generated overlay.
  ======================================================= */

  function evidence(container, ctx) {
    clear(container);
    var ds = ctx.dataset() || {};
    var facts = ds.facts || {};

    /* This lens used to open cold on "Computed figures come from", which reads
       as an answer to a question nobody asked. Say what it is for first. */
    container.appendChild(prose(
      'Every other lens shows you a number. This one shows you where the number came from, ' +
      'and it is the reason the rest can be trusted or argued with. Two kinds of figure sit ' +
      'side by side throughout this site: ones counted by a {{cancer registry}}, and ones ' +
      'computed here from a research cohort. They do not always agree, and where they do not, ' +
      'both are shown.', 'dt-lede'));

    // ---- cohort provenance ----
    if (facts.cohort) {
      container.appendChild(h('h3', null, 'Computed figures come from'));
      /* Some subtypes are computed from a cohort of their own (metastatic
         breast from MSK, castration-resistant prostate from SU2C). Naming only
         the default cohort told the reader every figure below came from it. */
      var others = [], byStudy = {};
      (ds.nodes || []).forEach(function (n) {
        var co = n.computed && n.computed.cohort;
        if (!co || !co.study || co.study === facts.cohort.study) return;
        if (!byStudy[co.study]) { byStudy[co.study] = { cohort: co, nodes: [] }; others.push(byStudy[co.study]); }
        byStudy[co.study].nodes.push(n.shortLabel || n.label);
      });
      var cohortCard = function (co, usedFor) {
        var c = h('div', 'ev-cohort');
        var nm = h('div', 'nm');
        if (co.url) {
          var a = h('a', null, co.name || co.study);
          a.href = co.url; a.target = '_blank'; a.rel = 'noopener';
          nm.appendChild(a);
        } else nm.textContent = co.name || co.study;
        c.appendChild(nm);
        /* Every computed figure counts one sample per patient. Where a cohort has
           more samples than patients (MSK lung: 915 from 860), the n shown must be
           the one the figures rest on. */
        var nPat = co.n_patients, nAll = co.n;
        if (typeof nPat === 'number' && typeof nAll === 'number' && nPat !== nAll) {
          c.appendChild(h('div', 'n', 'n = ' + nPat + ' patients · ' + nAll +
            ' samples, one counted per patient'));
        } else if (typeof nAll === 'number') {
          c.appendChild(h('div', 'n', 'n = ' + nAll + ' tumours'));
        }
        if (usedFor) c.appendChild(h('div', 'n', usedFor));
        return c;
      };
      var first = cohortCard(facts.cohort, others.length ? 'Every subtype not listed below' : null);
      first.appendChild(h('p', 'note',
        'Curated prose lives in the dataset file and is never overwritten by the pipeline. ' +
        'Where a computed figure disagrees with a curated one, both are shown and the gap is ' +
        'labelled — resolving it silently would hide that there was ever a question.'));
      container.appendChild(first);
      others.forEach(function (o) {
        container.appendChild(cohortCard(o.cohort, 'Used for: ' + o.nodes.join(', ')));
      });
    }

    // ---- concordance: the axes disagreeing, quantified ----
    var conc = facts.concordance;
    if (conc && conc.available && conc.matrix) {
      container.appendChild(h('h3', null, 'Two ways of sorting the same tumours'));
      /* The axis names come from the overlay. They used to be the literals
         "Intrinsic subtype" and "receptor status", which are breast's — under
         prostate that sentence described a pair of classifications the page
         was not showing. */
      container.appendChild(h('p', 'ev-lede',
        (conc.row_label || 'One classification') + ' (rows) against ' +
        (conc.col_label || 'another') + ' (columns), for the ' +
        (conc.n_classified || '') + ' tumours classified both ways. Shading is the share of ' +
        'each row. If the two told you nothing about each other, every row would be shaded like ' +
        'the column totals; where a row departs from them, the two are linked — and where it ' +
        'departs completely, they are nearly the same thing under two names.'));

      /* Draw in the declared order where there is one. Falling back to the
         order the samples arrived in is meaningless for a nominal scale and
         misleading for an ordinal one: prostate's Gleason columns arrived as
         3+3, 4+3, ≥8, 3+4, which reads as no gradient at all. */
      var rowKeys = (conc.row_order || []).slice();
      if (!rowKeys.length) rowKeys = Object.keys(conc.matrix);
      var colKeys = (conc.col_order || []).slice();
      if (!colKeys.length) {
        rowKeys.forEach(function (rk) {
          Object.keys(conc.matrix[rk] || {}).forEach(function (ck) {
            if (colKeys.indexOf(ck) === -1) colKeys.push(ck);
          });
        });
      }

      var wrap = h('div', 'ev-scroll');
      var tbl = h('table', 'ev-matrix');
      var thead = h('thead');
      var hr = h('tr');
      hr.appendChild(h('th', null, ''));
      colKeys.forEach(function (ck) { hr.appendChild(h('th', null, ck)); });
      hr.appendChild(h('th', null, 'row total'));
      thead.appendChild(hr);
      tbl.appendChild(thead);

      var tb = h('tbody');
      var base = seriesColor(0);
      rowKeys.forEach(function (rk) {
        var row = conc.matrix[rk];
        var total = colKeys.reduce(function (s, ck) { return s + (row[ck] || 0); }, 0);
        var tr = h('tr');
        tr.appendChild(h('th', 'rowhead', rk));
        colKeys.forEach(function (ck) {
          var v = row[ck] || 0;
          var share = total ? v / total : 0;
          var td = h('td', 'cell');
          /* Sequential, one hue, light→dark by magnitude — the correct colour
             job for a grid of counts. The ramp is alpha on the BACKGROUND, not
             opacity on the cell: fading the element fades its label too, and a
             count you cannot read is not a data point. */
          if (v) {
            td.style.background = 'color-mix(in srgb, ' + base + ' ' +
              Math.round(10 + share * 82) + '%, transparent)';
            td.style.color = share > 0.55 ? inkOn(base) : 'var(--text-primary)';
          }
          td.textContent = v ? (v + '  ' + Math.round(share * 100) + '%') : '·';
          td.title = rk + ' × ' + ck + ': ' + v + ' of ' + total;
          tr.appendChild(td);
        });
        tr.appendChild(h('td', 'num total', String(total)));
        tb.appendChild(tr);
      });
      tbl.appendChild(tb);
      wrap.appendChild(tbl);
      container.appendChild(wrap);
    }

    // ---- curated vs computed, every gap in one place ----
    var gaps = [];
    (ds.nodes || []).forEach(function (n) {
      ((n.molecular || {}).drivers || []).forEach(function (d) {
        if (d.computed && typeof d.computed.delta === 'number') {
          gaps.push({ node: n, driver: d });
        }
      });
    });
    gaps.sort(function (a, b) {
      return Math.abs(b.driver.computed.delta) - Math.abs(a.driver.computed.delta);
    });

    if (gaps.length) {
      container.appendChild(h('h3', null, 'Curated figure vs computed figure'));
      container.appendChild(h('p', 'ev-lede',
        gaps.length + ' driver frequencies can be checked against the cohort. Sorted by the size ' +
        'of the disagreement, largest first.'));

      var w2 = h('div', 'ev-scroll');
      var t2 = h('table');
      var th2 = h('thead');
      var hr2 = h('tr');
      ['Subtype', 'Gene', 'Alteration', 'Curated', 'Computed', 'n / N', 'Gap']
        .forEach(function (col) { hr2.appendChild(h('th', null, col)); });
      th2.appendChild(hr2);
      t2.appendChild(th2);

      var tb2 = h('tbody');
      gaps.forEach(function (g) {
        var d = g.driver, cp = d.computed;
        var tr = h('tr');
        tr.addEventListener('click', function () { ctx.activate(g.node.id); });
        tr.appendChild(h('td', 'nw', g.node.shortLabel || g.node.label));
        tr.appendChild(h('td', 'nw gene', d.gene));
        tr.appendChild(h('td', null, cp.metric || d.alteration || '—'));
        tr.appendChild(h('td', 'num', typeof d.frequency === 'number' ? fmtPct(d.frequency) : '—'));
        tr.appendChild(h('td', 'num', fmtExact(cp.frequency)));
        tr.appendChild(h('td', 'num', (cp.n != null && cp.of != null) ? (cp.n + ' / ' + cp.of) : '—'));
        var gap = h('td', 'num gap' + (Math.abs(cp.delta) >= 10 ? ' wide' : ''));
        gap.textContent = (cp.delta > 0 ? '+' : '') + cp.delta + ' pts';
        tr.appendChild(gap);
        tb2.appendChild(tr);
      });
      t2.appendChild(tb2);
      w2.appendChild(t2);
      container.appendChild(w2);
    }

    // ---- every citation in the dataset, deduplicated ----
    /* Walked, not enumerated. This list used to read four places — baseline,
       detection, factors, nodes — and keep only sources written inline as
       { label, url }. Every source written as a reference id or a list of ids
       was dropped, and targets, modality harms, caveats and axis populations
       were never read, so colorectal's fifteen drug labels were cited on the
       Targets lens and absent here. Any key named source, sources or
       <something>Source is a citation. Skipped: the computed overlay (`facts`),
       the glossary, and the targets and literature overlays explorer.js attaches
       whole — their `source` strings ("openFDA drug label API", "Europe PMC")
       name a data feed, which the attribution table below already lists with
       its terms, not a citation an author wrote. */
    var seen = {}, srcs = [];
    function addSrc(s) {
      var ref = resolveSource(s, ctx);
      if (!ref || !ref.label) return;
      var key = ref.url || ref.label;
      if (seen[key]) return;
      seen[key] = true;
      srcs.push(ref);
    }
    function isList(v) { return Object.prototype.toString.call(v) === '[object Array]'; }
    var SRC_KEY = /(^s|S)ources?$/, SKIP_TOP = { facts: 1, glossary: 1, references: 1, targetData: 1, literatureData: 1 }, onPath = [];
    function walkSources(v, depth) {
      if (!v || typeof v !== 'object' || depth > 12 || onPath.indexOf(v) !== -1) return;
      onPath.push(v);
      if (isList(v)) v.forEach(function (x) { walkSources(x, depth + 1); });
      else Object.keys(v).forEach(function (k) {
        if (depth === 0 && SKIP_TOP[k]) return;
        if (SRC_KEY.test(k)) (isList(v[k]) ? v[k] : [v[k]]).forEach(addSrc);
        else walkSources(v[k], depth + 1);
      });
      onPath.pop();
    }
    walkSources(ds, 0);

    if (srcs.length) {
      container.appendChild(h('h3', null, 'Every citation in this dataset (' + srcs.length + ')'));
      var ul = h('ul', 'srcs ev-srcs');
      srcs.forEach(function (s) {
        var li = h('li');
        if (s.url) {
          var a = h('a', null, s.label);
          a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
          li.appendChild(a);
        } else li.textContent = s.label;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }

    // ---- whose data this is, and what each source says about reuse ----
    var attr = facts.attribution;
    if (attr && (attr.sources || []).length) {
      container.appendChild(h('h3', null, 'Data sources and their terms (' + attr.n_sources + ')'));
      container.appendChild(h('p', 'ev-lede', attr.disclaimer));

      var verify = attr.needs_verification || [];
      var redist = attr.binary_redistribution || [];
      if (verify.length || redist.length) {
        var flags = h('div', 'attr-flags');
        if (verify.length) {
          flags.appendChild(h('p', 'f warn',
            verify.length + ' source(s) whose terms have not been read for this project: ' +
            verify.join(', ') + '. Read them before publishing.'));
        }
        if (redist.length) {
          flags.appendChild(h('p', 'f',
            'Content copied into this repository rather than linked: ' + redist.join(', ') +
            '. Shipping a copy is a different act from linking to it.'));
        }
        container.appendChild(flags);
      }

      var w = h('div', 'ev-scroll');
      var tb = h('table');
      var head = h('thead');
      var hr3 = h('tr');
      ['Source', 'Used for', 'Licence as stated', 'Confidence', 'Copied here?']
        .forEach(function (c) { hr3.appendChild(h('th', null, c)); });
      head.appendChild(hr3);
      tb.appendChild(head);

      var body = h('tbody');
      attr.sources.forEach(function (s) {
        var tr = h('tr');
        var nameCell = h('td', 'nw');
        if (s.url || s.licence_url) {
          var a = h('a', null, s.name);
          a.href = s.url || s.licence_url; a.target = '_blank'; a.rel = 'noopener';
          nameCell.appendChild(a);
        } else nameCell.textContent = s.name;
        if (s.attribution_required) nameCell.appendChild(h('span', 'attr-req', 'attribution required'));
        tr.appendChild(nameCell);
        tr.appendChild(h('td', 'why', s.used_for));
        tr.appendChild(h('td', 'why', s.licence));
        var confCell = h('td', 'nw');
        confCell.appendChild(h('span', 'conf conf-' + s.confidence, s.confidence));
        tr.appendChild(confCell);
        tr.appendChild(h('td', 'why', s.redistributed || '—'));
        body.appendChild(tr);
      });
      tb.appendChild(body);
      w.appendChild(tb);
      container.appendChild(w);
    }

    if (!facts.cohort && !gaps.length && !srcs.length) {
      container.appendChild(h('p', 'dt-note',
        'This dataset has no computed overlay and no citations yet.'));
    }
  }

  /* ================= Book IV — molecules =================

     The chain a professional actually walks: where on the protein it is
     altered, what that does, what binds it, why that works, how far along that
     is, and what nobody is doing. Five sources are joined per gene and every
     one of them is named in the UI, because the join is the fragile part.
  ======================================================= */

  /* The handles a reader may already know. TP53 becoming "Cellular tumor
     antigen p53" between two lenses is a vocabulary jump with no bridge — the
     gene symbol stays the primary handle everywhere and the aliases sit beside
     it, so nothing shifts under you. */
  var GENE_ALIASES = {
    TP53: ['p53', 'tumour protein p53'],
    ERBB2: ['HER2', 'neu', 'CD340'],
    ERBB3: ['HER3'],
    ESR1: ['ERα', 'estrogen receptor alpha'],
    TACSTD2: ['TROP2'],
    CD274: ['PD-L1', 'B7-H1'],
    PDCD1: ['PD-1'],
    MYC: ['c-Myc'],
    CDKN2A: ['p16'],
    PIK3CA: ['p110α'],
    AKT1: ['PKBα'],
    MTOR: ['FRAP1'],
    RB1: ['retinoblastoma protein', 'pRB'],
    AR: ['androgen receptor'],
    CCND1: ['cyclin D1']
  };

  /* Plain-language gloss for the curated structures, because a PDB id is
     opaque and the deposited title is ALL-CAPS jargon. */
  var PDB_GLOSS = {
    '1TUP': 'p53 gripping DNA. The mutation hotspots on the track above are the residues that do the gripping — which is why losing them matters.',
    '1NKP': 'Myc locked to its partner MAX, on DNA. The business end is a long interface, not a pocket — look at it and the undruggability is obvious.',
    '4JPS': 'The PI3Kα enzyme with inhibitors bound. H1047R sits in the kinase domain shown here.',
    '1N8Z': 'The outside of HER2 with the trastuzumab antibody fragment attached — the actual drug–target contact.',
    '8VB5': 'The HER2 kinase engine with tucatinib wedged into it.',
    '3ERT': 'The estrogen receptor holding 4-hydroxytamoxifen instead of estrogen — how endocrine therapy works, in one picture.',
    '4GV1': 'AKT1 with AZD5363 bound. That compound is capivasertib.',
    '5L2I': 'CDK6 with palbociclib in its ATP pocket.',
    '2W96': 'CDK4 clamped to its cyclin partner — the pair that CDK4/6 inhibitors break up.',
    '7KK4': 'The catalytic end of PARP1 with olaparib bound.',
    '1JNX': 'The BRCT end of BRCA1, the region most disrupted by pathogenic variants.',
    '1MJE': 'BRCA2 holding single-stranded DNA with DSS1 — the repair machinery that PARP inhibitors exploit when it is broken.',
    '1GUX': 'The RB pocket gripped by a viral motif, showing the surface CDK4/6 signalling controls.',
    '1D5R': 'The PTEN phosphatase, the brake on PI3K signalling.',
    '7PEE': 'The outside of TROP2 — not a driver, but the address an antibody-drug conjugate delivers to.',
    '5X8L': 'PD-L1 held by atezolizumab, blocking the off-switch it would otherwise press on a T cell.',
    '5GGS': 'PD-1 held by pembrolizumab — the same brake, blocked from the other side.',
    /* Kept free of any one cancer's framing: AR is breast's AR-positive TNBC
       target and prostate's central driver, and this caption is shared. Either
       dataset can add its own angle through `pdbGloss`. */
    '2AM9': 'The androgen receptor holding testosterone — the hormone switch that androgen-blocking therapy shuts off.',
    '4V05': 'FGFR1 with an inhibitor bound.',
    '4JSV': 'The mTOR kinase, downstream of PI3K and AKT.',
    '4P59': 'The outside of HER3 with an antibody fragment attached.'
  };

  /* Both tables above are keyed by gene symbol and PDB id, so a second cancer
     mostly just misses the entries it has no use for — no wrong text, only
     absent text. What it cannot do is ADD its own, and the entries it would
     want (AR-V7, FOLH1/PSMA, a structure caption for a radioligand target) are
     exactly the ones the engine has no business knowing. So a dataset may
     extend either table; the engine's shared entries stay shared, and a
     dataset key wins where both define one.

     Merged per dataset and cached, because the drawer re-renders on every
     selection and this must not rebuild each time. */
  var extendedTables = {};

  function extendedFor(ctx, key, base) {
    var d = (typeof ctx.dataset === 'function' ? ctx.dataset() : null) || {};
    var slot = extendedTables[d.id || '<none>'] || (extendedTables[d.id || '<none>'] = {});
    if (slot[key]) return slot[key];
    var over = d[key];
    if (!over) return (slot[key] = base);
    var merged = {}, k;
    for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) merged[k] = base[k];
    for (k in over) if (Object.prototype.hasOwnProperty.call(over, k)) merged[k] = over[k];
    return (slot[key] = merged);
  }

  function geneAliasesFor(ctx) { return extendedFor(ctx, 'geneAliases', GENE_ALIASES); }
  function pdbGlossFor(ctx) { return extendedFor(ctx, 'pdbGloss', PDB_GLOSS); }

  var BASIS_LABEL = {
    'genomic': 'selected by genomic alteration',
    'expression': 'selected by protein expression',
    'pathway': 'pathway dependency',
    'synthetic-lethal': 'synthetic lethality',
    // Colorectal added these two. Anti-angiogenic agents are given with no tumour
    // test at all; PD-1 blockade there is picked by repair status, which is neither
    // PD-L1 expression nor a synthetic-lethal mechanism.
    'unselected': 'not selected by a tumour test',
    'marker': 'selected by another marker',
    // Melanoma added this one: tebentafusp needs HLA-A*02:01, a type the patient
    // inherits, so no test of the tumour selects it.
    'germline': 'selected by a germline test'
  };

  /* Who a target's drugs are chosen for by a test of the patient rather than the
     tumour (`targets[].germline`, SCHEMA.md → Targets). The share is counted
     people in a named population — never a node's prevalence and never the
     overlay's alteration frequency, which for PMEL describes tumours and says
     nothing about HLA type. */
  function countedPct(share) {
    if (!share || typeof share.n !== 'number' || typeof share.of !== 'number' || !(share.of > 0)) return null;
    return Math.round(share.n / share.of * 1000) / 10;
  }

  function germlineFor(ctx, gene) {
    var cur = ctx && ctx.curatedTarget ? ctx.curatedTarget(gene) : null;
    return ((cur && cur.germline) || []).map(function (x) {
      return {
        entry: x,
        nodes: (x.nodes || []).map(function (id) { return ctx.nodeById ? ctx.nodeById(id) : null; })
          .filter(Boolean),
        pct: countedPct(x.share)
      };
    });
  }

  /* Either the curated entry or the overlay's basis is enough. The basis is
     written in the pipeline, and a gene it forgets falls back to `genomic` —
     which on its own would put PMEL on the alteration-frequency axis. */
  function germlineGene(ctx, gene) {
    var t = ctx && ctx.targetData ? ctx.targetData() : null;
    var rec = t && t.genes ? t.genes[gene] : null;
    return (rec && rec.basis === 'germline') || germlineFor(ctx, gene).length > 0;
  }

  /* The label a germline-selected target is shown under. A synthetic-lethal
     target keeps its own (breast's PARP1 works through BRCA loss whoever's
     test found it); a gene filed `genomic` does not, because that label is the
     misreading this guards against. */
  function basisShown(ctx, gene, basis) {
    if (germlineGene(ctx, gene) && (!basis || basis === 'genomic' || basis === 'germline')) return 'germline';
    return basis;
  }

  function germlineShare(g) {
    return fmtExact(g.pct) + ' of ' + g.entry.share.population;
  }

  // A partner row (BRCA1 reached through PARP1) whose agents a germline test chooses.
  function partnerGermline(ctx, r) {
    return (r.addressed_via || []).some(function (p) { return germlineGene(ctx, p); });
  }

  /* Who a target's drugs are ruled OUT for (`targets[].excludedBy`, SCHEMA.md →
     Targets). Every basis above says what rules a drug in; EGFR in colorectal
     cancer is chosen by what the tumour lacks, and on its own alteration
     frequency it reads as rarely broken and heavily drugged. The share is read
     off the nodes the entry names, never typed, so the drawer, the off-chart
     list and the scatter all say the same number and none can outlive the
     taxonomy it describes. */
  function exclusionsFor(ctx, gene) {
    var cur = ctx && ctx.curatedTarget ? ctx.curatedTarget(gene) : null;
    var list = (cur && cur.excludedBy) || [];
    function resolve(ids) {
      return (ids || []).map(function (id) { return ctx.nodeById ? ctx.nodeById(id) : null; })
        .filter(Boolean);
    }
    function sized(nodes) {
      if (!nodes.length || !nodes.every(function (n) { return typeof n.prevalence === 'number'; })) return null;
      return nodes.reduce(function (s, n) { return s + n.prevalence; }, 0);
    }
    return list.map(function (x) {
      var nodes = resolve(x.nodes);
      var axis = nodes.length && ctx.axisById ? ctx.axisById(nodes[0].axis) : null;
      var exNodes = x.except ? resolve(x.except.nodes) : [];
      return { entry: x, nodes: nodes, share: sized(nodes), whole: shareWhole(axis),
               exNodes: exNodes, exShare: sized(exNodes) };
    });
  }

  function nodeList(nodes) {
    var names = nodes.map(function (n) { return n.label; });
    if (names.length < 2) return names.join('');
    return names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1];
  }

  /* One clause for places with no room for the whole block. Several entries can
     name overlapping groups (lung's PD-1 labels: EGFR and ALK for two drugs,
     plus ROS1 for a third), so their shares are not added — the largest is
     quoted as "up to". */
  function exclusionSpan(xs) {
    var top = null;
    xs.forEach(function (x) { if (x.share != null && (!top || x.share > top.share)) top = x; });
    if (!top) return 'its labels rule its drugs out in part of the disease';
    return 'its labels rule out ' + (xs.length > 1 ? 'up to ' : '') + fmtPct(top.share) + ' of ' + top.whole;
  }

  /* The exclusion whose groups contain this node, if any. A repositioning row
     — altered here, approved elsewhere — inside a group the label rules out is
     not an open question: the label has already answered it. */
  function exclusionCovering(ctx, gene, nodeId) {
    var xs = exclusionsFor(ctx, gene);
    for (var i = 0; i < xs.length; i++) {
      var ids = {};
      xs[i].nodes.forEach(function (n) { ids[n.id] = true; });
      var n = ctx.nodeById ? ctx.nodeById(nodeId) : null, hops = 0;
      while (n && hops++ < 64) {
        if (ids[n.id]) return xs[i];
        n = n.parent != null ? ctx.nodeById(n.parent) : null;
      }
    }
    return null;
  }

  // Colour by what the mutation does to the protein, not by identity.
  function mutClass(type) {
    var t = String(type || '').toLowerCase();
    if (t.indexOf('nonsense') !== -1 || t.indexOf('frame') !== -1 ||
        t.indexOf('splice') !== -1 || t.indexOf('nonstop') !== -1) return 'trunc';
    if (t.indexOf('missense') !== -1) return 'missense';
    return 'other';
  }

  function phaseRank(p) {
    var order = ['discontinued', 'preclinical', 'phase 1', 'phase 1/2', 'phase 2',
                 'phase 2/3', 'phase 3', 'filed', 'approved'];
    var i = order.indexOf(String(p || '').toLowerCase());
    return i < 0 ? 0 : i;
  }

  /* ---------------- protein track ---------------- */

  function proteinTrack(svg, target, ctx) {
    clear(svg);
    var uni = target.uniprot || {};
    var W = svg.clientWidth || svg.parentNode.clientWidth || 620;
    var padL = 10, padR = 10;

    if (!uni.length) {
      svg.setAttribute('viewBox', '0 0 ' + W + ' 40');
      var m = el('text', { x: 10, y: 24, class: 'pt-note' }, svg);
      m.textContent = 'No protein record resolved for this gene.';
      return;
    }

    /* The drawer is ~340px wide and a kinase is a thousand residues long, so the
       limit is legibility, not data: eight labelled lollipops fit, fourteen
       overprint each other. The full list stays in the count below the track. */
    var maxLolli = W < 460 ? 10 : W < 700 ? 12 : 14;
    var hs = (target.hotspots || []).slice(0, maxLolli);
    var lay = global.Layouts.proteinTrack(uni.length, uni.domains || [], hs,
      { x: padL + 6, y: 8, w: W - padL - padR - 12, h: 16 },
      { stemMax: 58, minGap: W < 460 ? 54 : 42, minTickGap: 34,
        labelTop: W < 460 ? 4 : 6 });

    var H = 8 + lay.height + 6;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.height = H + 'px';

    // backbone
    el('rect', { x: lay.ribbon.x, y: lay.ribbon.y + lay.ribbon.h / 2 - 1.5,
                 width: lay.ribbon.w, height: 3, rx: 1.5, class: 'pt-backbone' }, svg);

    // domains
    lay.domains.forEach(function (d) {
      var minor = d.minor;
      var col = seriesColor(d.colorIndex % 8);
      var dh = minor ? 6 : d.h;
      var y = minor ? d.y + d.h + 4 : d.y;
      var g = el('g', { class: 'pt-domain' + (minor ? ' minor' : '') }, svg);
      el('rect', {
        x: d.x, y: y, width: d.w, height: dh, rx: 3,
        fill: minor ? 'none' : col,
        stroke: minor ? col : 'none',
        'stroke-width': minor ? 1.4 : 0,
        'fill-opacity': minor ? 0 : 0.85
      }, g);
      var title = el('title', null, g);
      title.textContent = d.domain.name + '  ' + d.domain.start + '–' + d.domain.end;

      // Only label a domain when its own box can hold the text.
      if (!minor && d.w > d.domain.name.length * 5.4 + 10) {
        var t = el('text', {
          x: d.x + d.w / 2, y: y + dh / 2 + 3.5, 'text-anchor': 'middle',
          class: 'pt-domlab', fill: inkOn(col)
        }, g);
        t.textContent = d.domain.name;
      }
    });

    // residue axis
    lay.ticks.forEach(function (t, i) {
      // clamp the end labels inward so neither is clipped by the viewBox
      var x = i === 0 ? Math.max(t.x, padL + 8)
        : i === lay.ticks.length - 1 ? Math.min(t.x, W - padR - 12) : t.x;
      var lb = el('text', { x: x, y: lay.tickY, 'text-anchor': 'middle', class: 'pt-tick' }, svg);
      lb.textContent = t.value;
    });

    // lollipops
    lay.lollipops.forEach(function (p) {
      var h = p.hotspot;
      var g = el('g', { class: 'pt-lolli ' + mutClass(h.type) }, svg);
      el('line', { x1: p.x, x2: p.x, y1: p.yBase, y2: p.yTop, class: 'pt-stem' }, g);
      el('circle', { cx: p.x, cy: p.yTop, r: p.r + 1.5, class: 'pt-ring' }, g);
      el('circle', { cx: p.x, cy: p.yTop, r: p.r, class: 'pt-head' }, g);
      var tt = el('title', null, g);
      tt.textContent = h.change + '  ' + h.n + '/' + h.of + ' tumours (' + h.pct + '%)  ' +
                       (h.type || '');
      // Unlabelled lollipops still carry their <title>, so nothing is lost —
      // only the printed name is rationed.
      if (!p.label) return;
      // pull labels in at the edges so the C-terminal hotspot is not sliced off
      var half = String(h.change).length * 2.7;
      var lx = Math.max(padL + half, Math.min(W - padR - half, p.x));
      // y comes from the layout's collision pass, which knows about every head
      // as well as every other label; the renderer only clamps x to the frame.
      var lab = el('text', {
        x: lx, y: p.labelY, 'text-anchor': 'middle', class: 'pt-lab'
      }, g);
      lab.textContent = h.change;
      // A label pushed off its own stem needs a thread back to it.
      if (p.collide > 0) {
        el('line', { x1: p.x, y1: p.yTop - p.r - 2, x2: lx, y2: p.labelY + 2,
                     class: 'pt-leader' }, g);
      }
    });

    return lay;
  }

  /* ---------------- target drawer: the chain ---------------- */

  function targetDrawer(container, target, ctx) {
    clear(container);
    citeReset();
    if (!target) {
      container.appendChild(h('div', 'drawer-empty',
        'Select a target to see where it is altered, what binds it, and how far along that is.'));
      return;
    }

    var uni = target.uniprot || {};
    var tg = ctx.targetData() || {};
    var drugIndex = {};
    (tg.drugs || []).forEach(function (d) { drugIndex[d.id] = d; });

    container.appendChild(h('h2', null, target.gene));

    /* Gene symbol stays the headline; the formal protein name and the common
       aliases sit under it. Arriving from a subtype drawer that said "TP53"
       and meeting "Cellular tumor antigen p53" with no bridge is a needless
       jolt. */
    var names = h('p', 'd-path');
    var alias = geneAliasesFor(ctx)[target.gene] || [];
    if (alias.length) {
      names.appendChild(h('span', 'alias', 'also written ' + alias.join(', ')));
    }
    if (uni.protein) {
      if (alias.length) names.appendChild(document.createTextNode('  ·  '));
      names.appendChild(h('span', null, 'formally: ' + uni.protein));
    }
    if (names.childNodes.length) container.appendChild(names);

    // --- 1. why this is a target at all ---
    var chips = h('div', 'chips');
    var gsel = germlineGene(ctx, target.gene);
    var basis = basisShown(ctx, target.gene, target.basis);
    if (basis) {
      var bc = h('span', 'chip basis ' + basis);
      bc.appendChild(h('span', 'k', 'basis'));
      bc.appendChild(term(BASIS_LABEL[basis] || basis, null, basis));
      chips.appendChild(bc);
    }
    if (uni.length) {
      var lc = h('span', 'chip var');
      lc.appendChild(h('span', 'k', 'length'));
      lc.appendChild(h('span', null, uni.length + ' aa'));
      chips.appendChild(lc);
    }
    if (uni.accession) {
      var uc = h('span', 'chip code');
      uc.appendChild(h('span', 'k', 'UniProt'));
      uc.appendChild(h('span', null, uni.accession));
      chips.appendChild(uc);
    }
    container.appendChild(chips);

    /* Curated narrative first, computed rationale second. The overlay's `why`
       is a one-liner produced alongside the numbers; the dataset's entry is
       judgement and outranks it. */
    var cur = ctx.curatedTarget(target.gene);
    if (cur && cur.summary) {
      container.appendChild(citeInto(h('p', 'summary', cur.summary), cur.source, ctx));
    }
    if (target.why) {
      container.appendChild(h('p', cur && cur.summary ? 'tg-rationale' : 'summary', target.why));
    }
    if (cur && cur.caveat) {
      container.appendChild(citeInto(h('p', 'tg-curated-caveat', cur.caveat), cur.caveatSource, ctx));
    }
    if (cur && cur.watch) {
      var w = h('p', 'tg-watch');
      w.appendChild(h('span', 'k', 'Worth watching'));
      w.appendChild(document.createTextNode(cur.watch));
      citeInto(w, cur.watchSource, ctx);
      container.appendChild(w);
    }
    if (target.biomarker_gene) {
      container.appendChild(h('p', 'tg-biomarker',
        'Selected by ' + target.biomarker_gene + ', not by ' + target.gene + ' itself.'));
    }

    /* Before the exclusions and the alteration track: for these agents the test
       is of the patient, so nothing drawn below says who may receive them. The
       share printed is the entry's counted one or none — never a figure from
       the tumour cohort. */
    var germ = germlineFor(ctx, target.gene);
    germ.forEach(function (gx) {
      var box = h('div', 'tg-excluded tg-germline');
      box.appendChild(h('span', 'k', 'Selected by a germline test, not the tumour'));
      if (gx.pct != null) {
        var s = gx.entry.share;
        box.appendChild(citeInto(h('span', 'share', germlineShare(gx) + ' tested positive (' +
          fmtCount(s.n) + ' of ' + fmtCount(s.of) + ')'), s.source, ctx));
      }
      box.appendChild(h('span', 'ln', 'Test: ' + gx.entry.test));
      box.appendChild(citeInto(h('span', 'ln', 'For ' + gx.entry.agents), gx.entry.source, ctx));
      if (gx.nodes.length) box.appendChild(h('span', 'ln', 'In ' + nodeList(gx.nodes)));
      if (gx.entry.note) {
        box.appendChild(citeInto(h('span', 'ln note', gx.entry.note), gx.entry.noteSource || gx.entry.source, ctx));
      }
      container.appendChild(box);
    });

    /* Before the structure and the alteration track, because both describe the
       gene — and for a target like this the gene is not all that decides who
       may receive the drug. */
    var excl = exclusionsFor(ctx, target.gene);
    excl.forEach(function (x) {
      var box = h('div', 'tg-excluded');
      box.appendChild(h('span', 'k', 'Ruled out by the label'));
      if (x.share != null) box.appendChild(h('span', 'share', fmtPct(x.share) + ' of ' + x.whole));
      box.appendChild(h('span', 'ln', 'Not indicated in ' + nodeList(x.nodes)));
      box.appendChild(citeInto(h('span', 'ln', 'For ' + x.entry.agents), x.entry.source, ctx));
      if (x.entry.except) {
        box.appendChild(h('span', 'ln', 'Except ' + x.entry.except.agents + ' in ' + nodeList(x.exNodes) +
          (x.exShare != null ? ' (' + fmtPct(x.exShare) + ')' : '')));
      }
      if (x.entry.note) {
        box.appendChild(citeInto(h('span', 'ln note', x.entry.note), x.entry.noteSource, ctx));
      }
      container.appendChild(box);
    });

    // --- 2. the structure ---
    var st = target.structure;
    if (st) {
      container.appendChild(h('h3', null, 'Structure'));
      if (st.image) {
        var fig = h('figure', 'tg-struct');
        var img = document.createElement('img');
        img.src = 'data/' + st.image;
        img.alt = 'Deposited structure ' + st.pdb + ': ' + (st.title || '');
        img.loading = 'lazy';
        fig.appendChild(img);
        var cap = h('figcaption');
        /* Plain gloss first, accession and deposited title after. "1TUP" and
           "TUMOR SUPPRESSOR P53 COMPLEXED WITH DNA" tell you nothing unless you
           already knew; "p53 gripping DNA" tells you what you are looking at. */
        var gloss = pdbGlossFor(ctx)[st.pdb];
        if (gloss) cap.appendChild(h('span', 'gloss', gloss));
        cap.appendChild(h('span', 'pdbid', st.pdb));
        cap.appendChild(h('span', 'meta',
          [st.method, st.resolution ? st.resolution + ' Å' : null].filter(Boolean).join(' · ')));
        if (st.title) cap.appendChild(h('span', 't', st.title));
        fig.appendChild(cap);
        container.appendChild(fig);
      }
      var links = h('p', 'tg-links');
      [[st.url, 'RCSB ' + st.pdb], [uni.alphafold, 'AlphaFold'], [uni.url, 'UniProt']]
        .forEach(function (pair) {
          if (!pair[0]) return;
          var a = h('a', null, pair[1]);
          a.href = pair[0]; a.target = '_blank'; a.rel = 'noopener';
          links.appendChild(a);
        });
      container.appendChild(links);
      container.appendChild(h('p', 'tg-caveat',
        'A static deposited render, not a pocket view composed for the drug, and not rotatable. ' +
        'The links above open the interactive viewers.'));
    }

    // --- 3. where it is altered ---
    container.appendChild(h('h3', null, 'Where it is altered'));
    /* A germline-selected target says so whether or not the curated entry is
       there: the overlay's basis alone is enough to know these bars are not
       who can receive the drug. */
    if (gsel) {
      container.appendChild(h('p', 'tg-note',
        'What the tumours carry, not who is eligible: its agents are chosen by a germline test' +
        (germ.length ? ', named above.' : '.')));
    }
    /* The track and the frequency bars below are the "0% altered" a reader
       would otherwise take as the whole story. */
    if (excl.length) {
      container.appendChild(h('p', 'tg-note',
        'This track is not the whole selection: ' + exclusionSpan(excl) + ', named above.'));
    }
    if ((target.hotspots || []).length) {
      var wrap = h('div', 'tg-track');
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', 'ptrack');
      wrap.appendChild(svg);
      container.appendChild(wrap);
      // width is only known once it is in the document
      proteinTrack(svg, target, ctx);

      var shown = Math.min(14, target.hotspots.length);
      container.appendChild(h('p', 'tg-note',
        target.n_mutated_samples + ' of ' + target.sequenced_of + ' sequenced tumours mutated · ' +
        target.n_distinct_changes + ' distinct changes · ' + shown + ' most recurrent drawn, ' +
        'the largest few labelled — hover any lollipop for its count.'));
      // What the height means, said once. Without it a reader has no way to
      // know whether a tall stem is twice another or ten times it.
      container.appendChild(h('p', 'tg-note subtle',
        'Stem height is how many tumours carry that exact change, on a straight ' +
        'scale — a stem twice as tall is twice as many. The shortest are held at ' +
        'a minimum so they stay visible, so read those from the head size and the ' +
        'hover instead.'));
    } else {
      container.appendChild(h('p', 'tg-note',
        'No recurrent protein change reached the reporting threshold in this cohort.' +
        (basis && basis !== 'genomic'
          ? ' Expected — this target is ' + (BASIS_LABEL[basis] || basis) + '.'
          : '')));
    }

    // --- 4. how often, by subtype ---
    var fq = (target.frequency || {}).by_node || {};
    var nodeIds = Object.keys(fq);
    if (nodeIds.length) {
      /* Named for the classification the cohort was split by: PAM50 for breast,
         molecular class for prostate, driver class for lung. */
      var fqNode = ctx.nodeById ? ctx.nodeById(nodeIds[0]) : null;
      var fqAxis = fqNode && ctx.axisLabelOf ? ctx.axisLabelOf(fqNode.axis) : null;
      container.appendChild(h('h3', null, 'Alteration frequency by ' + (fqAxis || 'subtype')));
      /* Fixed 0–100, for the same reason as the driver bars in the subtype
         drawer: these panels are read one gene after another, and normalising
         each to its own maximum would draw TROP2's 1.8% and ERBB2's 70.9% as
         the same full bar. TROP2 being flat here is the finding, not a
         rendering problem. */
      container.appendChild(h('p', 'drv-scale',
        'Bars run 0–100% of tumours in that subtype, so they compare across genes.'));
      nodeIds.forEach(function (id) {
        var n = ctx.nodeById(id);
        var metrics = fq[id];
        var best = null, bestK = null;
        Object.keys(metrics).forEach(function (k) {
          if (k === 'any_loss') return;
          if (!best || (metrics[k].pct || 0) > best.pct) { best = metrics[k]; bestK = k; }
        });
        if (!best) return;
        var row = h('div', 'driver');
        var top = h('div', 'top');
        top.appendChild(h('span', 'gene', n ? (n.shortLabel || n.label) : id));
        top.appendChild(h('span', 'freq', fmtExact(best.pct)));
        row.appendChild(top);
        var bar = h('div', 'bar');
        var fill = h('div', 'fill');
        fill.style.width = Math.max(1.5, Math.min(100, best.pct)) + '%';
        bar.appendChild(fill);
        row.appendChild(bar);
        var mnote = h('span', 'note');
        mnote.appendChild(term(bestK.replace(/_/g, ' '), null));
        mnote.appendChild(document.createTextNode(' · ' + best.n + '/' + best.of +
          (best.of < 20 ? ' — too few to rank' : '')));
        row.appendChild(mnote);
        container.appendChild(row);
      });
    }

    // --- 5. what targets it, and how far along ---
    var agents = (target.drugs || []).map(function (id) { return drugIndex[id]; })
      .filter(Boolean)
      .sort(function (a, b) { return phaseRank(b.phase) - phaseRank(a.phase); });

    container.appendChild(h('h3', null, 'What targets it (' + agents.length + ')'));
    if (!agents.length) {
      container.appendChild(h('p', 'tg-note',
        'Nothing in the tracked pipeline is aimed at this protein.'));
    }
    agents.forEach(function (d) {
      container.appendChild(drugCard(d));
    });

    // --- 6. the evidence ---
    var cv = target.civic;
    if (cv && cv.n_evidence_items) {
      container.appendChild(h('h3', null, 'Evidence (CIViC)'));
      var ev = h('div', 'tg-civic');
      var head = h('div', 'top');
      /* The level counts only items a CIViC editor has accepted (cxp/civic.py).
         A higher level held by items still pending review is named beside it,
         never in its place: one pending item put "level A" on lung KEAP1. */
      head.appendChild(h('span', 'lvl lvl-' + (cv.best_level || 'x'),
        cv.best_level ? 'level ' + cv.best_level : 'no accepted level'));
      head.appendChild(h('span', 'n', cv.n_evidence_items + ' evidence items' +
        (typeof cv.n_accepted === 'number' && cv.n_accepted < cv.n_evidence_items
          ? ', ' + cv.n_accepted + ' accepted by an editor' : '')));
      ev.appendChild(head);
      if (cv.best_level_submitted) {
        ev.appendChild(h('p', 'n', 'level ' + cv.best_level_submitted +
          ' on items still pending CIViC review'));
      }
      if (cv.evidence_types) {
        ev.appendChild(h('p', 'n', Object.keys(cv.evidence_types).map(function (k) {
          return k.toLowerCase() + ' ' + cv.evidence_types[k];
        }).join(' · ')));
      }
      if ((cv.top_therapies || []).length) {
        ev.appendChild(h('p', 'n', 'therapies cited: ' + cv.top_therapies.slice(0, 6).join(', ')));
      }
      container.appendChild(ev);
    }

    // --- 7. what is missing ---
    var gaps = (tg.gaps || {});
    var mine = [];
    /* A germline-selected target gets none of the rows that read its tumour
       frequency as a question about who could be treated. */
    (gaps.druggable_untargeted || []).forEach(function (r) {
      if (r.gene === target.gene && !gsel) mine.push('Nothing in the tracked pipeline targets it, despite ' +
        fmtExact(r.max_pct) + ' ' + String(r.max_metric).replace(/_/g, ' ') + ' in ' + nodeName(ctx, r.max_node) + '.');
    });
    (gaps.addressed_indirectly || []).forEach(function (r) {
      if (r.gene === target.gene) mine.push('Addressed only through ' + r.addressed_via.join(' / ') +
        ' (' + r.via_programs + ' programs), never directly.' +
        (partnerGermline(ctx, r) ? ' Its agents are chosen by a germline test, not by the tumour.' : ''));
    });
    (gaps.cohort_blind_spots || []).forEach(function (r) {
      if (r.gene === target.gene && !gsel) mine.push(r.reason);
    });
    (gaps.repositioning || []).forEach(function (r) {
      if (r.gene === target.gene && !gsel) {
        var ro = exclusionCovering(ctx, r.gene, r.subtype_node);
        mine.push('Altered in ' + fmtExact(r.pct) + ' of ' + (subtypeLabelOf(r) || nodeName(ctx, r.subtype_node)) +
          ' tumours (' + r.n + '/' + r.of + '), but the approved agents are indicated for ' +
          r.approved_in.join(', ') + '.' +
          (ro ? ' The label rules this group out for ' + ro.entry.agents + ', so it is not an open question.' : ''));
      }
    });
    if (mine.length) {
      container.appendChild(h('h3', null, 'What is missing'));
      var ul = h('ul', 'tg-gaps');
      mine.forEach(function (s) { ul.appendChild(h('li', null, s)); });
      container.appendChild(ul);
      container.appendChild(h('p', 'tg-caveat',
        'Observations from joining alteration frequency to the drug pipeline — questions to ask, ' +
        'not conclusions, and never treatment advice.'));
    }

    /* Before the literature, not after it. The numbers being footnoted are all
       above this point, and a reader who follows a marker down past forty rows
       of papers has been sent on an errand rather than given a source. */
    citeList(container, 'References for the figures above');

    // --- 8. the frontier, so the chain does not stop at the trial register ---
    var lit = ctx.literatureFor(target.gene);
    if (lit && lit.length) {
      container.appendChild(h('h3', null, 'What is being published now'));
      var counts = {};
      lit.forEach(function (p) { counts[p.kind] = (counts[p.kind] || 0) + 1; });
      container.appendChild(h('p', 'tg-note',
        Object.keys(counts).map(function (k) { return counts[k] + ' on ' + k; }).join(' · ') +
        ' — newest first. Evidence tier and species are on every row because most of it is preclinical.'));
      lit.slice(0, 5).forEach(function (p) { container.appendChild(paperCard(p, ctx)); });
      if (lit.length > 5) {
        var b = h('button', 'rel-item');
        b.type = 'button';
        b.appendChild(h('span', 'name', 'See all ' + lit.length + ' papers for ' + target.gene));
        b.appendChild(h('span', 'kind', 'literature lens'));
        b.addEventListener('click', function () { ctx.setLens('literature'); });
        container.appendChild(b);
      }
    }
  }

  /* ---------------- targets lens: the landscape and the gaps ---------------- */

  function targets(container, ctx) {
    clear(container);
    var tg = ctx.targetData();
    if (!tg) {
      container.appendChild(h('p', 'dt-note',
        'This dataset has no targets overlay. Run `python run.py targets` in pipeline/.'));
      return;
    }
    var gaps = tg.gaps || {};

    /* The largest jump on the ladder: the rung above is about kinds of tumour,
       this one is about single proteins. Said in plain words before the
       provenance sentence, which assumes the reader already knows what a target
       is and what five database names are. */
    container.appendChild(prose(
      'The Subtypes lens says what kind of tumour it is. This one asks the next question down: ' +
      'which single protein inside the cell is broken, and is there anything that binds it. ' +
      'A {{targeted therapy}} only helps if the tumour actually depends on the thing the drug ' +
      'hits — so a target is a protein worth attacking, and everything here is about whether ' +
      'that case holds.', 'dt-lede'));

    container.appendChild(h('p', 'dt-note',
      'Every target joined across five sources: UniProt for the protein, cBioPortal for where it ' +
      'is altered, RCSB for what it looks like, the curated drug pipeline for what binds it, and ' +
      'CIViC for what the evidence says. The sections below are arithmetic over that join — ' +
      'questions worth asking, not answers.'));

    // --- landscape scatter ---
    var land = (gaps.landscape || []);
    /* A germline-selected target is never plotted, whatever the overlay says is
       comparable: its x would be a share of tumours read as who can be treated. */
    var plot = land.filter(function (r) { return r.comparable && !germlineGene(ctx, r.gene); });
    var unplot = land.filter(function (r) { return !r.comparable || germlineGene(ctx, r.gene); });

    container.appendChild(h('h3', null, 'Crowded targets and open ones'));

    /* This chart was labelled with one corner and left the reader to infer the
       other three — and the obvious inference is wrong, because "nothing in
       development" is the whole bottom ROW, not the bottom-right corner. What
       makes the right side a gap is the combination. So both axes are said in
       plain words, and all four regions are named, including the boring one. */
    container.appendChild(prose(
      'Each dot is one protein. Left to right is how often it is broken — its ' +
      '{{alteration frequency}} in whichever subtype it is worst in, not averaged. Bottom to ' +
      'top is how many drug {{program|programs}} in the tracked pipeline are aimed at it, so ' +
      'the bottom row is everything with nothing in development. Click any dot for its ' +
      'structure and hotspots.', 'dt-lede'));

    if (plot.length) {
      var wrap = h('div', 'tg-scatter');
      var svg = document.createElementNS(SVG_NS, 'svg');
      wrap.appendChild(svg);
      container.appendChild(wrap);
      landscapeScatter(svg, plot, ctx);
      var ringed = plot.filter(function (r) { return exclusionsFor(ctx, r.gene).length; })
                       .map(function (r) { return r.gene; });
      if (ringed.length) {
        container.appendChild(h('p', 'tg-note',
          'A dashed ring marks a target whose labels also rule its drugs out in part of the disease: ' +
          ringed.join(', ') + '. Its place on this axis is not the whole selection — its card says ' +
          'who is ruled out.'));
      }
    }

    /* Described from the data rather than as four idealised quadrants, because
       on this cohort the top-left is EMPTY and a key that invents an example for
       it would be teaching a chart that is not on screen. The regions named are
       the ones that have points in them. */
    if (plot.length) {
      var zero = plot.filter(function (r) { return !r.programs; });
      var top = plot.slice().sort(function (a, b) { return b.programs - a.programs; })[0];
      /* The example for "often broken, and still nobody on it" has to come from
         that corner. Taking the most-altered target overall named ERBB2 in lung —
         three programs, the opposite of the claim beside it. */
      var worst = plot.filter(function (r) { return (r.programs || 0) <= 1; })
                      .sort(function (a, b) { return b.max_pct - a.max_pct; })[0];
      var quiet = zero.slice().sort(function (a, b) { return a.max_pct - b.max_pct; })[0];
      /* Only the off-chart entries that actually carry programs support the
         "the field is more crowded than it looks" claim — four of the twelve
         have none, and counting those would overstate it. */
      var offWorked = unplot.filter(function (r) { return r.programs > 0; });
      var offProg = offWorked.reduce(function (s, r) { return s + r.programs; }, 0);

      container.appendChild(h('p', 'dt-note', 'Reading it:'));
      var key = h('div', 'tg-key');

      function keyCell(cls, pos, ttl, body) {
        var cell = h('div', 'tg-keycell' + (cls ? ' ' + cls : ''));
        cell.appendChild(h('span', 'pos', pos));
        cell.appendChild(h('span', 'ttl', ttl));
        cell.appendChild(h('span', 'd', body));
        key.appendChild(cell);
      }

      keyCell('mute', 'the bottom row', 'Nothing in development is normal',
        zero.length + ' of the ' + plot.length + ' plotted proteins have no program at all, ' +
        'and the row is the single most crowded part of the chart. Sitting on it is not, by ' +
        'itself, a finding.');

      keyCell('mute', 'bottom left', 'Rarely broken as well — and that is fine',
        (quiet ? quiet.gene + ' peaks at ' + fmtExact(quiet.max_pct) + ' and has nobody on it. ' : '') +
        'Few tumours depend on these, so no programs is the correct allocation of effort, not ' +
        'a missed opportunity. This is the part of the chart with nothing to argue about.');

      keyCell('on', 'bottom right (shaded)', 'Often broken, and still nobody on it',
        'The same zero, against proteins that are broken constantly — which is why the ' +
        'combination is the gap and the row on its own is not. ' +
        (worst ? worst.gene + ' is altered in ' + fmtExact(worst.max_pct) + ' of ' +
          nodeName(ctx, worst.max_node) + ' tumours with ' + worst.programs +
          (worst.programs === 1 ? ' program' : ' programs') + ' against it. ' : '') +
        'Usually it means the protein is hard to drug, not that nobody thought of it.');

      keyCell('', 'the top', 'Thin here, and misleadingly so',
        /* Only an example if something is actually up there. Prostate plots
           no gene with a program, and this used to name SPOP as "carrying 0
           programs and nearly alone up there". */
        (top && top.programs ? top.gene + ' carries ' + top.programs +
          (top.programs === 1 ? ' program' : ' programs') + ' and is nearly alone up there. '
          : 'Nothing plotted here carries a program at all. ') +
        'But ' + offWorked.length + ' heavily worked-on targets — ' + offProg + ' programs ' +
        'between them — cannot be plotted on an alteration-frequency axis at all, and are ' +
        'listed immediately below. The field is more crowded than this shape suggests.');

      container.appendChild(key);
    }

    if (unplot.length) {
      container.appendChild(h('p', 'tg-note',
        'Not on the chart, because an alteration-frequency axis does not describe them: ' +
        unplot.map(function (r) {
          /* A genomically-selected gene lands here only when the cohort never
             measured it (NRG1 is on neither MSK panel) — say that, rather than
             implying it was measured and found at 0%. */
          var shown = basisShown(ctx, r.gene, r.basis);
          var why = shown === 'genomic' && !r.max_node ? 'not sequenced in this cohort'
                  : (BASIS_LABEL[shown] || shown);
          var rx = exclusionsFor(ctx, r.gene);
          /* The counted share, where the entry has one. A target that keeps its
             own basis (PARP1) also says a germline test chooses its agents. */
          var gtail = '';
          if (germlineGene(ctx, r.gene)) {
            var counted = germlineFor(ctx, r.gene).filter(function (x) { return x.pct != null; })[0];
            var pos = counted ? 'positive in ' + germlineShare(counted) : '';
            gtail = shown === 'germline' ? (pos ? '; ' + pos : '')
                  : '; chosen by a germline test' + (pos ? ', ' + pos : '');
          }
          return r.gene + ' (' + why + ', ' + r.programs + (r.programs === 1 ? ' program' : ' programs') +
            gtail + (rx.length ? '; ' + exclusionSpan(rx) : '') + ')';
        }).join('; ') + '. Ranking these by mutation rate would say nobody should drug them, ' +
        'which is the opposite of the truth.'));
    }

    // --- the four gap surfaces ---
    /* A germline-selected target has no row in the tables that read a tumour
       frequency as a question about who could be treated. */
    function notGermline(rows) {
      return (rows || []).filter(function (r) { return !germlineGene(ctx, r.gene); });
    }
    gapSection(container, ctx, 'Altered often, nothing against it',
      'No agent in the tracked pipeline, and no partner target standing in for it.',
      notGermline(gaps.druggable_untargeted), function (r) {
        return [r.gene, fmtExact(r.max_pct) + ' ' + String(r.max_metric).replace(/_/g, ' ') +
          ' in ' + nodeName(ctx, r.max_node),
          r.civic_best_level ? 'CIViC ' + r.civic_best_level +
            (r.civic_best_level_submitted ? ' (' + r.civic_best_level_submitted + ' pending review)' : '')
            : r.civic_best_level_submitted ? 'CIViC ' + r.civic_best_level_submitted + ', pending review' : '—',
          r.why];
      });

    gapSection(container, ctx, 'Reached only through a partner',
      'Frequently altered, but every agent hits a different protein. Not a gap — a detour worth seeing.',
      gaps.addressed_indirectly, function (r) {
        return [r.gene, fmtExact(r.max_pct) + ' ' + String(r.max_metric).replace(/_/g, ' '),
          'via ' + r.addressed_via.join(' / ') + ' (' + r.via_programs + ')' +
          (partnerGermline(ctx, r) ? '; its agents are chosen by a germline test' : ''), r.why];
      });

    gapSection(container, ctx, 'Approved elsewhere, altered here',
      'An approved agent whose target is comparably altered in a subtype it is not indicated for. ' +
      'The approval and the frequency can sit on different classifications of the same tumours — ' +
      'deliberately not merged — so treat these as questions, not gaps.',
      notGermline(gaps.repositioning), function (r) {
        var ro = exclusionCovering(ctx, r.gene, r.subtype_node);
        return [r.gene, fmtExact(r.pct) + ' ' + r.metric + ' in ' + (subtypeLabelOf(r) || nodeName(ctx, r.subtype_node)) +
          ' (' + r.n + '/' + r.of + ')', 'approved in ' + r.approved_in.join(', '),
          r.approved_agents.join(', ') +
          (ro ? ' — the label rules this group out for ' + ro.entry.agents : '')];
      });

    gapSection(container, ctx, 'Evidence without a programme',
      'CIViC carries case-study or preclinical evidence for these genes, and the tracked pipeline ' +
      'carries no agent against them.',
      (gaps.evidence_without_program || []).slice(0, 20), function (r) {
        return [r.gene, 'level ' + r.best_level + (r.pending ? ', pending review' :
            r.best_level_submitted ? ' (' + r.best_level_submitted + ' pending review)' : ''),
          r.n_evidence_items + ' items',
          (r.top_therapies || []).join(', ')];
      });

    gapSection(container, ctx, 'What this cohort cannot see',
      'Drugged targets that are barely mutated here — because the cohort is primary tumours.',
      notGermline(gaps.cohort_blind_spots), function (r) {
        return [r.gene, r.n_mutated_samples + '/' + r.of + ' mutated',
          r.n_programs + ' programs', r.reason];
      });

    // provenance
    var src = tg.sources || {};
    container.appendChild(h('h3', null, 'Sources for this lens'));
    var ul = h('ul', 'srcs');
    ['protein', 'alterations', 'structure', 'drugs', 'trials', 'evidence'].forEach(function (k) {
      if (!src[k]) return;
      ul.appendChild(h('li', null, k + ': ' + src[k]));
    });
    if (src.structure_note) ul.appendChild(h('li', null, 'structure caveat: ' + src.structure_note));
    container.appendChild(ul);
  }

  function gapSection(container, ctx, title, lede, rows, cells) {
    if (!rows || !rows.length) return;
    container.appendChild(h('h3', null, title + ' (' + rows.length + ')'));
    if (lede) container.appendChild(h('p', 'dt-lede', lede));
    var wrap = h('div', 'ev-scroll');
    var tbl = h('table');
    var tb = h('tbody');
    rows.forEach(function (r) {
      var tr = h('tr');
      var vals = cells(r);
      tr.appendChild(h('td', 'nw gene', vals[0]));
      tr.appendChild(h('td', 'nw', vals[1] || '—'));
      tr.appendChild(h('td', 'nw', vals[2] || '—'));
      tr.appendChild(h('td', 'why', vals[3] || ''));
      if (r.gene && ctx.hasTarget(r.gene)) {
        tr.addEventListener('click', function () { ctx.selectTarget(r.gene); });
        tr.className = 'clickable';
      }
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    wrap.appendChild(tbl);
    container.appendChild(wrap);
  }

  function landscapeScatter(svg, rows, ctx) {
    var W = svg.clientWidth || svg.parentNode.clientWidth || 700;
    /* Most targets have 0-2 programs while the scale runs to 15, so the bottom
       row is a pile-up and the label staggering needs vertical room to climb
       into. That empty upper area is not waste — it IS the finding, and the
       stacked labels below it are what the extra height buys. */
    var H = 430;
    var padL = 46, padR = 18, padT = 18, padB = 44;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.height = H + 'px';

    var maxPct = Math.max.apply(null, rows.map(function (r) { return r.max_pct; }).concat([10]));
    var maxProg = Math.max.apply(null, rows.map(function (r) { return r.programs; }).concat([4]));
    var pw = W - padL - padR, ph = H - padT - padB;

    /* Headroom so the rightmost dot is not welded to the edge — but capped at
       100, because this axis is a share of tumours and cannot exceed it. Without
       the cap, prostate's SPOP (definitionally 100% of its own class) pushed the
       domain to 108 and the axis printed a "108%" tick, which is not a quantity
       that exists. Breast never hit it: its peak is around 26%. */
    var domainX = Math.min(100, maxPct * 1.08);

    function X(v) { return padL + (v / domainX) * pw; }
    function Y(v) { return padT + ph - (v / (maxProg * 1.15)) * ph; }

    // grid + axes. Programs are a count, so the ticks are whole numbers on a
    // sensible step rather than quarters of the maximum.
    var g = el('g', null, svg);
    var yStep = maxProg <= 6 ? 1 : maxProg <= 12 ? 3 : 5;
    for (var yv = 0; yv <= maxProg; yv += yStep) {
      el('line', { x1: padL, x2: W - padR, y1: Y(yv), y2: Y(yv), class: 'rk-grid' }, g);
      var lb = el('text', { x: padL - 8, y: Y(yv) + 4, 'text-anchor': 'end', class: 'rk-tick' }, g);
      lb.textContent = yv;
    }
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
      var xv = domainX * f;
      var lb = el('text', { x: X(xv), y: H - padB + 16, 'text-anchor': 'middle', class: 'rk-tick' }, g);
      lb.textContent = Math.round(xv) + '%';
    });

    var ax = el('text', { x: padL + pw / 2, y: H - 6, 'text-anchor': 'middle', class: 'rk-foot' }, g);
    ax.textContent = 'peak alteration frequency in any subtype';
    var ay = el('text', { x: 12, y: padT + ph / 2, class: 'rk-foot',
                          transform: 'rotate(-90 12 ' + (padT + ph / 2) + ')',
                          'text-anchor': 'middle' }, g);
    ay.textContent = 'programs';

    /* The open corner. It needs a drawn LEFT edge: an unbounded shaded strip
       along the bottom reads as a label for the whole zero-programs row, and the
       row is not the point — the combination is. The edge is where "often
       altered" starts, so it is given a value rather than left implicit. */
    var bandX = X(maxPct * 0.35), bandY = Y(1.4);
    el('rect', { x: bandX, y: bandY, width: (W - padR) - bandX,
                 height: (padT + ph) - bandY, class: 'tg-quad' }, svg);
    el('line', { x1: bandX, y1: bandY, x2: bandX, y2: padT + ph, class: 'tg-quadedge' }, svg);

    /* Anchored at the band's own left edge, in the empty strip above the y=1
       row, so it cannot be mistaken for a caption on the axis. */
    var ql = el('text', { x: bandX + 7, y: bandY + 13, 'text-anchor': 'start',
                          class: 'tg-quadlab' }, svg);
    ql.textContent = 'altered above ' + Math.round(maxPct * 0.35) +
      '% · at most one program';

    /* Genes with no programs all sit on y=0, so their labels would overprint.
       Placed points are remembered and a colliding label is pushed to the row
       above instead of being dropped — the gene name is the whole point here. */
    var placed = [];
    var PASSES = 14, STEP = 13;

    /* Seed the map with every MARKER, not just the labels placed so far. Labels
       used to dodge each other and then land squarely on a neighbouring dot —
       which is how RB1 ended up printed through PTEN's point. A label's own
       marker cannot block it: placement starts 9px out and the box is 7px. */
    rows.forEach(function (r) {
      var mx = X(r.max_pct), my = Y(r.programs) + 4;
      placed.push({ x0: mx - 7, x1: mx + 7, y: my });
    });
    function place(cx, cy, w) {
      // try right of the point, then left, stepping upward on each failure
      for (var pass = 0; pass < PASSES; pass++) {
        for (var s = 0; s < 2; s++) {
          var side = s === 0 ? 1 : -1;
          var y = cy + 4 - pass * STEP;
          if (y < padT + 8) break;          // never climb out of the plot
          var x0 = side > 0 ? cx + 9 : cx - 9 - w;
          /* Inside the drawing, or it is clipped: a dot at 100% put "ERBB2" to
             its right and the svg edge printed "ERBB". */
          if (x0 < 2 || x0 + w > W - 2) continue;
          var clash = placed.some(function (p) {
            return Math.abs(p.y - y) < 12 && x0 < p.x1 && (x0 + w) > p.x0;
          });
          if (!clash) {
            placed.push({ x0: x0, x1: x0 + w, y: y });
            return { x: side > 0 ? cx + 9 : cx - 9, y: y, side: side };
          }
        }
      }
      /* Exhausted. Stack it above everything already placed rather than dropping
         it on the point — the previous fallback overprinted, which is how RB1
         and PTEN ended up on top of each other. A wrong-looking leader line is
         recoverable; an unreadable gene name is not. */
      var top = placed.reduce(function (m, p) { return Math.min(m, p.y); }, cy + 4);
      var fy = Math.max(padT + 8, top - STEP);
      var fside = cx + 9 + w > W - 2 ? -1 : 1;
      var fx0 = fside > 0 ? cx + 9 : cx - 9 - w;
      placed.push({ x0: fx0, x1: fx0 + w, y: fy });
      return { x: fside > 0 ? cx + 9 : cx - 9, y: fy, side: fside };
    }

    rows.slice().sort(function (a, b) { return a.max_pct - b.max_pct; }).forEach(function (r) {
      var cx = X(r.max_pct), cy = Y(r.programs);
      /* Dashed where the labels also rule the drugs out in part of the disease:
         the dot's x is then not the whole selection. */
      var rx = exclusionsFor(ctx, r.gene);
      var node = el('g', { class: 'tg-pt', role: 'button', tabindex: '0',
        'aria-label': r.gene + ', ' + r.programs + ' programs, peak ' + r.max_pct + '%' +
          (rx.length ? '; ' + exclusionSpan(rx) : '') }, svg);
      el('circle', { cx: cx, cy: cy, r: 9, fill: 'transparent' }, node);
      el('circle', { cx: cx, cy: cy, r: 5.5, class: rx.length ? 'ring excl' : 'ring' }, node);
      el('circle', { cx: cx, cy: cy, r: 4, fill: seriesColor(0) }, node);
      /* Measured, not estimated. 6.4px a character undercounts capitals and
         digits at 11px, so "PMS2" and "POLE" each believed the other had room
         and printed as "PMS2POLE". The estimate stays only for an svg that is
         not laid out yet, where the measurement returns 0. */
      var lab = el('text', { class: 'tg-ptlab' }, node);
      lab.textContent = r.gene;
      var tw = 0;
      try { tw = lab.getComputedTextLength(); } catch (e) { tw = 0; }
      var pos = place(cx, cy, (tw || r.gene.length * 7.4) + 3);
      lab.setAttribute('x', pos.x);
      lab.setAttribute('y', pos.y);
      lab.setAttribute('text-anchor', pos.side > 0 ? 'start' : 'end');
      if (pos.y !== cy + 4) {
        node.insertBefore(el('line', { x1: cx, y1: cy - 5, x2: pos.x, y2: pos.y - 3, class: 'tg-leader' }, node), lab);
      }
      var t = el('title', null, node);
      t.textContent = r.gene + ' — ' + r.programs + ' programs (' + (r.best_phase || 'none') +
        '), peak ' + r.max_pct + '% ' + String(r.max_metric || '').replace(/_/g, ' ') +
        ' in ' + nodeName(ctx, r.max_node) + (rx.length ? '; ' + exclusionSpan(rx) : '');
      if (ctx.hasTarget(r.gene)) {
        node.addEventListener('click', function () { ctx.selectTarget(r.gene); });
        node.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.selectTarget(r.gene); }
        });
      }
    });
  }

  /* ---------------- drugs: the intervention, and what it costs ----------------

     Drugs are deliberately NOT an axis. An axis is a tree over tumours whose
     prevalence sums to 100%; one agent serves several subtypes and every
     subtype has several agents, so drugs partition nothing. They are a view
     over the same records the Targets lens already holds.
  --------------------------------------------------------------------------- */

  function noLabelText(d) {
    if (d.label_lookup === 'failed') {
      return 'The US FDA label lookup for this agent failed on the last pipeline run, so whether ' +
        'it has a label is unknown here. That is not the same as having no side effects.';
    }
    if (d.phase === 'approved') {
      return 'Approved, but openFDA returned no US label for it: it may be approved outside the ' +
        'US, or the search missed it. That says nothing about its side effects; trial-reported ' +
        'harms live in the publications.';
    }
    return 'No US FDA label — this agent is ' + (d.phase || 'not approved') +
      ', so no approved-label safety profile exists yet. That is not the same as ' +
      'having no side effects; trial-reported harms live in the publications.';
  }

  function safetyBlock(d, opts) {
    opts = opts || {};
    var L = d.label;
    var wrap = h('div', 'dg-safety');

    if (!L) {
      /* An investigational agent has no label because it is not approved — that
         is a different statement from "no side effects", and saying nothing
         here would let a reader infer the wrong one. An approved agent without
         one is a different case again: on 2026-10-17 openFDA's search lost 24
         labels it still served, and this sentence then called approved drugs
         investigational. */
      wrap.appendChild(h('p', 'none', noLabelText(d)));
      return wrap;
    }

    if (L.boxed) {
      var bx = h('div', 'boxed');
      bx.appendChild(h('span', 'k', 'Boxed warning'));
      bx.appendChild(h('span', 'hd', L.boxed.headline));
      if (!opts.compact && L.boxed.text) bx.appendChild(h('p', 't', L.boxed.text));
      wrap.appendChild(bx);
    }

    if ((L.warnings || []).length) {
      var w = h('div', 'warns');
      w.appendChild(h('span', 'k', 'Warnings and precautions'));
      var ul = h('ul');
      L.warnings.slice(0, opts.compact ? 4 : 12).forEach(function (x) {
        ul.appendChild(h('li', null, x));
      });
      w.appendChild(ul);
      wrap.appendChild(w);
    }

    if (L.common && !opts.compact) {
      var c = h('div', 'common');
      c.appendChild(h('span', 'k', 'Most common reactions' +
        (L.common.has_frequencies ? ', as reported' : '')));
      c.appendChild(h('p', 't', L.common.text));
      if (!L.common.has_frequencies) {
        c.appendChild(h('p', 'n',
          'The label lists these without frequencies, so they are not ordered by how ' +
          'often they happen.'));
      }
      wrap.appendChild(c);
    }

    if (!opts.compact) {
      var prov = h('p', 'prov');
      prov.appendChild(document.createTextNode(
        'Excerpted from the US FDA label for ' + (L.matched_brand || '') +
        (L.matched_generic ? ' (' + L.matched_generic.toLowerCase() + ')' : '') +
        (L.effective_time ? ', effective ' + L.effective_time.slice(0, 4) : '') + '. '));
      if (L.openfda_url) {
        var a = h('a', null, 'source record');
        a.href = L.openfda_url; a.target = '_blank'; a.rel = 'noopener';
        prov.appendChild(a);
      }
      wrap.appendChild(prov);
      wrap.appendChild(h('p', 'n',
        'Label text, not a safety summary and not advice. Frequencies and severity ' +
        'depend on dose, combination and the population studied.'));
    }
    return wrap;
  }

  function drugDrawer(container, d, ctx) {
    clear(container);
    if (!d) {
      container.appendChild(h('div', 'drawer-empty',
        'Select an agent to see what it targets, how far along it is, and what its label warns about.'));
      return;
    }
    container.appendChild(h('h2', null, d.name));

    var sub = [d.code, d.modality, d.company].filter(Boolean).join(' · ');
    if (sub) container.appendChild(h('p', 'd-path', sub));

    var chips = h('div', 'chips');
    var ph = h('span', 'chip var');
    ph.appendChild(h('span', 'k', 'phase'));
    ph.appendChild(h('span', null, d.phase || 'unknown'));
    chips.appendChild(ph);
    if (d.target) {
      var tg = h('span', 'chip code');
      tg.appendChild(h('span', 'k', 'target'));
      tg.appendChild(h('span', null, d.target));
      chips.appendChild(tg);
    }
    container.appendChild(chips);

    if (d.line) container.appendChild(h('p', 'summary', 'Used at: ' + d.line));
    if (d.readout) container.appendChild(h('p', 'tg-note', d.readout));

    // the genes it hits — the way back into the Targets chain
    if ((d.genes || []).length) {
      container.appendChild(h('h3', null, 'What it targets'));
      d.genes.forEach(function (g) {
        if (!ctx.hasTarget(g)) {
          container.appendChild(h('p', 'tg-note', g));
          return;
        }
        var b = h('button', 'rel-item');
        b.type = 'button';
        b.appendChild(h('span', 'name', g));
        b.appendChild(h('span', 'kind', 'protein, structure, hotspots'));
        b.addEventListener('click', function () { ctx.selectTarget(g); });
        container.appendChild(b);
      });
    }

    container.appendChild(h('h3', null, 'Safety, from the label'));
    container.appendChild(safetyBlock(d, {}));

    if (d.trial_name || d.nct_id) {
      container.appendChild(h('h3', null, 'Trial'));
      container.appendChild(drugCard(d));
    }
  }

  function drugs(container, ctx) {
    clear(container);
    var tg = ctx.targetData();
    if (!tg) {
      container.appendChild(h('p', 'dt-note', 'No targets overlay — run `python run.py targets`.'));
      return;
    }
    var list = (tg.drugs || []).slice();
    var ls = tg.labels_summary || {};
    // Counted from the rows, so the sentence cannot call an approved agent investigational.
    var unlabelled = list.filter(function (d) { return !d.label; });
    var nFailed = unlabelled.filter(function (d) { return d.label_lookup === 'failed'; }).length;
    var nApproved = unlabelled.filter(function (d) {
      return d.label_lookup !== 'failed' && d.phase === 'approved';
    }).length;
    var nRest = unlabelled.length - nFailed - nApproved;
    var plural = function (n, one, many) { return n + ' ' + (n === 1 ? one : many); };
    var rest = (nApproved ? plural(nApproved, 'approved agent has', 'approved agents have') +
        ' no US label returned by openFDA (see the row). ' : '') +
      (nFailed ? plural(nFailed, 'label lookup', 'label lookups') + ' failed, so ' +
        (nFailed === 1 ? 'that label is' : 'those labels are') + ' unknown here. ' : '') +
      (nRest ? (nApproved || nFailed ? 'The other ' + nRest : 'The rest') +
        ' are investigational, which is why they have no label rather than no harms.' : '');

    container.appendChild(prose(
      'The same pipeline as the Targets view, listed by drug instead of by protein. Each agent ' +
      'names the protein it binds, what {{modality|kind of molecule}} it is, how far through ' +
      'testing it has got, and what its label warns about. ' +
      (ls.n_with_label || 0) + ' of ' + (ls.n_drugs || list.length) +
      ' have a US FDA label; ' + (ls.n_boxed_warnings || 0) + ' carry a {{boxed warning}}. ' + rest,
      'dt-lede'));

    container.appendChild(h('p', 'lit-warn',
      'Safety text here is excerpted from FDA labels. It is regulatory text, not a safety ' +
      'summary and not advice — what any of it means for one person depends on dose, ' +
      'combination, other conditions and much else that a label cannot know.'));

    // ordered by how far along, then by target
    var order = { 'approved': 0, 'filed': 1, 'phase 3': 2, 'phase 2': 3,
                  'phase 1/2': 4, 'phase 1': 5, 'discontinued': 9 };
    list.sort(function (a, b) {
      var d = (order[a.phase] == null ? 6 : order[a.phase]) -
              (order[b.phase] == null ? 6 : order[b.phase]);
      return d || String(a.target).localeCompare(String(b.target));
    });

    var wrap = h('div', 'ev-scroll');
    var tbl = h('table');
    var thead = h('thead');
    var hr = h('tr');
    ['Agent', 'Target', 'Modality', 'Phase', 'Boxed warning', 'Label warnings']
      .forEach(function (c) { hr.appendChild(h('th', null, c)); });
    thead.appendChild(hr);
    tbl.appendChild(thead);

    var tb = h('tbody');
    list.forEach(function (d) {
      var tr = h('tr', 'clickable' + (ctx.selectedDrugId === d.id ? ' is-selected' : ''));
      tr.addEventListener('click', function () { ctx.selectDrug(d.id); });
      tr.appendChild(h('td', 'f-name', d.name));
      tr.appendChild(h('td', 'nw', d.target || '—'));
      var mc = h('td', 'nw');
      mc.appendChild(d.modality ? term(d.modality, null) : document.createTextNode('—'));
      tr.appendChild(mc);
      var pc = h('td', 'nw');
      pc.appendChild(term(d.phase || 'unknown',
        'phase ph-' + String(d.phase || '').replace(/[^a-z0-9]/gi, '-')));
      tr.appendChild(pc);

      var bx = h('td', 'nw');
      if (d.label && d.label.boxed) {
        bx.appendChild(h('span', 'boxed-flag', 'boxed'));
      } else if (d.label) {
        bx.appendChild(h('span', 'muted', 'none'));
      } else {
        bx.appendChild(h('span', 'muted', 'no label'));
      }
      tr.appendChild(bx);

      tr.appendChild(h('td', 'why',
        d.label ? (d.label.warnings || []).slice(0, 3).join(' · ') || '—'
          : d.label_lookup === 'failed' ? 'label lookup failed'
          : d.phase === 'approved' ? 'approved — no US label found'
          : 'investigational — not approved'));
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    wrap.appendChild(tbl);
    container.appendChild(wrap);

    container.appendChild(h('h3', null, 'Source'));
    var ul = h('ul', 'srcs');
    ul.appendChild(h('li', null, ls.source || 'openFDA drug label API'));
    if (ls.caveat) ul.appendChild(h('li', null, ls.caveat));
    container.appendChild(ul);
  }

  function drugCard(d) {
    var card = h('div', 'tg-drug');

    var top = h('div', 'top');
    top.appendChild(h('span', 'nm', d.name));
    top.appendChild(term(d.phase || 'unknown',
      'phase ph-' + String(d.phase || '').replace(/[^a-z0-9]/gi, '-')));
    card.appendChild(top);

    var meta = [d.modality, d.company, d.line].filter(Boolean).join(' · ');
    if (meta) card.appendChild(h('p', 'meta', meta));

    if (d.readout) card.appendChild(h('p', 'readout', d.readout));

    var reg = d.registry;
    var line = h('p', 'trial');
    if (d.trial_name) line.appendChild(h('span', 'tn', d.trial_name));
    if (d.nct_id) {
      var a = h('a', null, d.nct_id);
      a.href = (reg && reg.url) || ('https://clinicaltrials.gov/study/' + d.nct_id);
      a.target = '_blank'; a.rel = 'noopener';
      line.appendChild(a);
    }
    if (line.childNodes.length) card.appendChild(line);

    if (reg) {
      var bits = [reg.overall_status, reg.phase,
                  reg.enrollment ? 'n=' + reg.enrollment : null,
                  reg.primary_completion_date ? 'primary completion ' + reg.primary_completion_date : null]
        .filter(Boolean).join(' · ');
      card.appendChild(h('p', 'registry', 'registry: ' + bits));
    }
    /* A curated phase that the registry contradicts is shown, not resolved —
       the same rule the driver frequencies follow. */
    if (d.phase_disagreement) {
      card.appendChild(h('p', 'disagree',
        'curated says "' + d.phase_disagreement.curated + '", registry says "' +
        d.phase_disagreement.registry + '"'));
    }
    return card;
  }

  /* ---------------- detail drawer ---------------- */

  function drawer(container, node, ctx) {
    clear(container);
    citeReset();

    if (!node) {
      /* Only name triggers where this dataset has them (breast, today); the
         other cancers' drawers never show a trigger section. */
      var hasTriggers = ((ctx.dataset() || {}).nodes || []).some(function (n) {
        return (n.triggers || []).length > 0;
      });
      container.appendChild(h('div', 'drawer-empty',
        'Select a subtype to see ' + (hasTriggers ? 'its trigger causes and ' : 'its ') + 'molecular profile.'));
      return;
    }

    container.appendChild(h('h2', null, node.label));

    var path = ctx.pathOf(node.id).map(function (n) { return n.label; });
    var pl = h('p', 'd-path', path.join('  ›  ') + '  ·  ' + ctx.axisLabel());
    container.appendChild(pl);

    /* A node on an axis that covers part of the disease names that part in its
       own drawer, so a reader who arrives by search or a cross-link — never
       seeing the axis head — still learns who the figures describe. */
    var nodeAxis = ctx.axisById ? ctx.axisById(node.axis) : null;
    if (nodeAxis && nodeAxis.population && nodeAxis.population.label) {
      container.appendChild(h('p', 'd-path', 'Covers: ' + populationLine(nodeAxis.population, nodeAxis)));
    }


    // marker chips
    if (node.markers && ctx.markerOrder.length) {
      var chips = h('div', 'chips');
      ctx.markerOrder.forEach(function (mid) {
        var v = node.markers[mid];
        if (v == null) return;
        var cls = 'chip ' + (v === '+' ? 'pos' : v === '−' || v === '-' ? 'neg' : 'var');
        var c = h('span', cls);
        c.appendChild(h('span', 'k', mid));
        c.appendChild(h('span', null, String(v)));
        chips.appendChild(c);
      });
      if (chips.childNodes.length) container.appendChild(chips);
    }

    // canonical codes, when the pipeline resolved them
    if (node.codes) {
      var cc = h('div', 'chips');
      [['OncoTree', node.codes.oncotree && node.codes.oncotree.code]]
        .forEach(function (pair) {
          if (!pair[1]) return;
          var c = h('span', 'chip code');
          c.appendChild(h('span', 'k', pair[0]));
          c.appendChild(h('span', null, pair[1]));
          cc.appendChild(c);
        });
      if (cc.childNodes.length) container.appendChild(cc);
    }

    // headline stats
    var stats = h('div', 'stat-row');
    if (typeof node.prevalence === 'number') stats.appendChild(stat(fmtPct(node.prevalence), shareCaption(ctx, node)));
    var drivers = (node.molecular || {}).drivers || [];
    if (drivers.length) stats.appendChild(stat(String(drivers.length), 'drivers'));
    if ((node.triggers || []).length) stats.appendChild(stat(String(node.triggers.length), 'triggers'));
    if (stats.childNodes.length) container.appendChild(stats);

    if (node.summary) {
      var p = h('p', 'summary', node.summary);
      container.appendChild(p);
    }

    /* Groups a label rules a target's drugs out for (`targets[].excludedBy`).
       The driver list does not name the target gene, so without this section
       "ruled out" reads the same as "never considered". Only nodes an entry
       names directly. A section of its own, under the headline figure, because
       lung's EGFR group is named by three checkpoint-inhibitor entries and as
       lines above the figure they pushed it half a screen down. */
    var exclusions = [];
    if (ctx.curatedTargets) {
      ctx.curatedTargets().forEach(function (t) {
        (t.excludedBy || []).forEach(function (x) {
          if ((x.nodes || []).indexOf(node.id) !== -1) exclusions.push({ gene: t.gene, x: x });
        });
      });
    }
    function geneLinkOrName(gene, opens) {
      if (!(ctx.hasTarget && ctx.hasTarget(gene))) return h('span', 'name', gene);
      var gb = h('button', 'genelink');
      gb.type = 'button';
      gb.textContent = gene;
      gb.title = 'Open the ' + gene + ' target page — ' + opens;
      gb.appendChild(h('span', 'arw', '↗'));
      gb.addEventListener('click', function (ev) {
        ev.stopPropagation();
        ctx.selectTarget(gene);
      });
      return gb;
    }
    if (exclusions.length) {
      container.appendChild(h('h3', null, 'Drugs ruled out here'));
      var xl = h('ul', 'plist d-excl');
      exclusions.forEach(function (e) {
        var li = h('li');
        li.appendChild(geneLinkOrName(e.gene, 'who its drugs are ruled out for, and why'));
        li.appendChild(document.createTextNode(' — ' + e.x.agents + '.'));
        if (e.x.except && e.x.except.agents) {
          var exNodes = (e.x.except.nodes || []).map(function (id) { return ctx.nodeById(id); }).filter(Boolean);
          li.appendChild(document.createTextNode(' Except ' + e.x.except.agents +
            (exNodes.length ? ', in ' + nodeList(exNodes) : '') + '.'));
        }
        citeInto(li, e.x.source, ctx);
        xl.appendChild(li);
      });
      container.appendChild(xl);
    }

    /* Agents chosen by a test of the patient, not the tumour
       (`targets[].germline`), for nodes an entry names directly. The driver
       list cannot show them: an HLA type is not an alteration the tumour
       carries, and PMEL is not a driver. */
    var germlines = [];
    if (ctx.curatedTargets) {
      ctx.curatedTargets().forEach(function (t) {
        (t.germline || []).forEach(function (x) {
          if ((x.nodes || []).indexOf(node.id) !== -1) germlines.push({ gene: t.gene, x: x });
        });
      });
    }
    if (germlines.length) {
      container.appendChild(h('h3', null, 'Drugs chosen by a germline test'));
      var gl = h('ul', 'plist d-excl');
      germlines.forEach(function (e) {
        var li = h('li');
        li.appendChild(geneLinkOrName(e.gene, 'which test chooses its drugs, and how many test positive'));
        li.appendChild(document.createTextNode(' — ' + e.x.agents + '. Test: ' + e.x.test + '.'));
        citeInto(li, e.x.source, ctx);
        var pct = countedPct(e.x.share);
        if (pct != null) {
          li.appendChild(document.createTextNode(' Positive in ' + fmtExact(pct) + ' of ' + e.x.share.population +
            ' (' + fmtCount(e.x.share.n) + ' of ' + fmtCount(e.x.share.of) + ').'));
          citeInto(li, e.x.share.source, ctx);
        }
        gl.appendChild(li);
      });
      container.appendChild(gl);
    }

    // ---- triggers, grouped by category ----
    if ((node.triggers || []).length) {
      container.appendChild(h('h3', null, 'Trigger causes'));
      var byCat = {};
      node.triggers.forEach(function (t) {
        var c = t.category || 'Other';
        (byCat[c] = byCat[c] || []).push(t);
      });
      Object.keys(byCat).forEach(function (cat) {
        var grp = h('div', 'trigger-group');
        grp.appendChild(h('div', 'gname', cat));
        byCat[cat].forEach(function (t) {
          var row = h('div', 'trigger');
          var up = t.direction !== 'decreases';
          var dir = h('span', 'dir ' + (t.direction === 'decreases' ? 'down' : 'up'),
            t.direction === 'decreases' ? '↓' : t.direction === 'mixed' ? '↕' : '↑');
          row.appendChild(dir);

          var body = h('div');
          var line = h('span');
          line.appendChild(h('span', 'f', t.factor));
          if (t.magnitude) {
            line.appendChild(document.createTextNode(' '));
            line.appendChild(h('span', 'm', t.magnitude));
          }
          if (t.evidence) {
            line.appendChild(h('span', 'ev ' + t.evidence, t.evidence));
          }
          /* A trigger's figure is footnoted like a pathway's: the source was
             declared, validated and quoted, and printed nowhere until now. */
          citeInto(line, t.source, ctx);
          body.appendChild(line);
          if (t.note) body.appendChild(h('span', 'n', t.note));
          row.appendChild(body);
          grp.appendChild(row);
        });
        container.appendChild(grp);
      });
    }

    // ---- molecular ----
    var mol = node.molecular || {};
    if ((mol.drivers || []).length) {
      container.appendChild(h('h3', null, 'Molecular drivers'));
      /* Fixed 0–100 domain, NOT the drawer's own maximum. Normalising per drawer
         made 45% in the ER/PR-positive panel and 80% in the TNBC panel draw the
         identical full-length bar — and comparing one subtype's drawer against
         another's is the entire point of this app. The cost is that a 4% driver
         is a sliver, which is what 4% looks like. */
      container.appendChild(h('p', 'drv-scale',
        'Bars run 0–100% of tumours in this subtype, so they compare across subtypes.'));

      mol.drivers.forEach(function (d) {
        var wrap = h('div', 'driver' + (d.druggable ? ' druggable' : ''));
        var top = h('div', 'top');
        var left = h('span');

        /* A gene that has a target page becomes the way in to it — the protein
           structure, its hotspots, what binds it. Without this the two lenses
           hold the same gene and never mention each other. */
        if (ctx.hasTarget && ctx.hasTarget(d.gene)) {
          var gb = h('button', 'gene genelink');
          gb.type = 'button';
          gb.textContent = d.gene;
          gb.title = 'Open the ' + d.gene + ' target page — structure, hotspots, what binds it';
          gb.appendChild(h('span', 'arw', '↗'));
          gb.addEventListener('click', function (e) {
            e.stopPropagation();
            ctx.selectTarget(d.gene);
          });
          left.appendChild(gb);
        } else {
          left.appendChild(h('span', 'gene', d.gene));
        }

        if (d.alteration) {
          left.appendChild(document.createTextNode(' '));
          left.appendChild(h('span', 'alt', d.alteration));
        }
        if (d.druggable) left.appendChild(h('span', 'tag drug', 'druggable'));
        top.appendChild(left);
        top.appendChild(h('span', 'freq',
          typeof d.frequency === 'number' ? fmtPct(d.frequency) : (d.frequencyNote || '')));
        wrap.appendChild(top);

        if (typeof d.frequency === 'number') {
          var bar = h('div', 'bar');
          var fill = h('span');
          fill.style.width = Math.max(1.5, Math.min(100, d.frequency)) + '%';
          bar.appendChild(fill);
          wrap.appendChild(bar);
        }
        /* The computed figure sits under the curated one rather than
           replacing it. Where they disagree by more than the audit's
           tolerance, say so in the UI instead of quietly picking a winner. */
        if (d.computed) {
          var c = d.computed;
          // audit.MATCH_PP (pipeline/cxp/audit.py): past it the gate fails the row
          var drift = c.delta != null && Math.abs(c.delta) > 2;
          var cf = h('div', 'computed' + (drift ? ' drift' : ''));
          cf.appendChild(h('span', 'k', 'computed'));
          cf.appendChild(h('span', 'v', fmtExact(c.frequency)));
          cf.appendChild(h('span', 'n', c.n + '/' + c.of + ' · ' + c.metric));
          if (drift) {
            cf.appendChild(h('span', 'delta',
              (c.delta > 0 ? '+' : '') + c.delta + ' pts vs curated'));
          }
          wrap.appendChild(cf);
        }
        if (d.role || d.note) {
          wrap.appendChild(h('div', 'note', [d.role, d.note].filter(Boolean).join(' — ')));
        }

        /* "DRUGGABLE" is a claim, and a claim should name its evidence. These
           are the agents that actually hit it, with a boxed-warning flag where
           the label carries one — the cost, beside the promise. */
        var agents = ctx.drugsForGene ? ctx.drugsForGene(d.gene) : [];
        if (agents.length) {
          var row = h('div', 'drv-agents');
          row.appendChild(h('span', 'k', agents.length + ' agent' +
            (agents.length === 1 ? '' : 's') + ':'));
          agents.slice(0, 4).forEach(function (ag) {
            var b = h('button', 'ag');
            b.type = 'button';
            b.textContent = ag.name.replace(/\s*\([^)]*\)\s*$/, '');
            b.title = [ag.phase, ag.modality].filter(Boolean).join(' · ') +
              (ag.label && ag.label.boxed ? ' — boxed warning: ' + ag.label.boxed.headline : '');
            if (ag.label && ag.label.boxed) b.appendChild(h('span', 'bx', '!'));
            b.addEventListener('click', function (e) {
              e.stopPropagation();
              ctx.selectDrug(ag.id);
            });
            row.appendChild(b);
          });
          if (agents.length > 4) row.appendChild(h('span', 'more', '+' + (agents.length - 4)));
          wrap.appendChild(row);
        } else if (d.druggable) {
          /* Flagged druggable with nothing behind it is exactly the kind of
             claim the Targets lens exists to catch. */
          wrap.appendChild(h('div', 'drv-agents none',
            'flagged druggable, but no agent against it in the tracked pipeline'));
        }

        container.appendChild(wrap);
      });

      if (node.computed && node.computed.cohort) {
        var co = node.computed;
        var prov = h('p', 'provenance');
        prov.appendChild(document.createTextNode(
          'Computed from ' + co.cohort.name + ' — ' + co.subtypeLabel + ', n=' + co.nSamples +
          ' (' + co.nSequenced + ' sequenced, ' + co.nCnaProfiled + ' CNA-profiled). '));
        if (co.cohort.url) {
          var ca = document.createElement('a');
          ca.href = co.cohort.url;
          ca.target = '_blank';
          ca.rel = 'noopener noreferrer';
          ca.textContent = co.cohort.study;
          prov.appendChild(ca);
        }
        container.appendChild(prov);
      }
    }

    if ((mol.pathways || []).length) {
      container.appendChild(h('h3', null, 'Pathways'));
      var ul = h('ul', 'plist');
      mol.pathways.forEach(function (p) {
        var li = h('li');
        li.appendChild(h('span', 'name', p.name));
        if (p.status) li.appendChild(document.createTextNode(' — ' + p.status));
        citeInto(li, p.source, ctx);
        if (p.note) li.appendChild(h('span', 'n', ' ' + p.note));
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }

    if ((mol.biomarkers || []).length) {
      container.appendChild(h('h3', null, 'Biomarkers'));
      var bl = h('ul', 'plist');
      mol.biomarkers.forEach(function (b) {
        var li = h('li');
        li.appendChild(h('span', 'name', b.name));
        var tail = [b.use, b.threshold].filter(Boolean).join(' · ');
        if (tail) li.appendChild(document.createTextNode(' — ' + tail));
        citeInto(li, b.source, ctx);
        bl.appendChild(li);
      });
      container.appendChild(bl);
    }

    // ---- prognosis ----
    if (node.prognosis && (node.prognosis.relativeOutlook || node.prognosis.fiveYearNote)) {
      container.appendChild(h('h3', null, 'Prognosis'));
      if (node.prognosis.relativeOutlook) container.appendChild(h('p', null, node.prognosis.relativeOutlook));
      if (node.prognosis.fiveYearNote) {
        container.appendChild(citeInto(h('p', null, node.prognosis.fiveYearNote),
                                       node.prognosis.source, ctx));
      }
      if (node.prognosis.caveat) {
        var cav = h('p', null, node.prognosis.caveat);
        cav.style.fontStyle = 'italic';
        container.appendChild(cav);
      }
    }

    // ---- therapies ----
    if ((node.therapies || []).length) {
      container.appendChild(h('h3', null, 'Therapies'));
      var tl = h('ul', 'plist');
      node.therapies.forEach(function (t) {
        var li = h('li');
        li.appendChild(h('span', 'name', t.name));
        var tail = [t.class, t.setting].filter(Boolean).join(' · ');
        if (tail) li.appendChild(document.createTextNode(' — ' + tail));
        if (t.status) li.appendChild(h('span', 'tag', t.status));
        citeInto(li, t.source, ctx);
        tl.appendChild(li);
      });
      container.appendChild(tl);
    }

    // ---- relationships ----
    if ((node.related || []).length) {
      container.appendChild(h('h3', null, 'Related subtypes'));
      node.related.forEach(function (r) {
        var target = ctx.nodeById(r.to);
        var btn = h('button', 'rel-item');
        btn.type = 'button';
        btn.appendChild(h('span', 'kind', (r.kind || 'related').replace(/-/g, ' ') + ' → '));
        btn.appendChild(h('span', 'name', target ? target.label : r.to));
        if (r.note) btn.appendChild(h('span', 'n', r.note));
        btn.addEventListener('click', function () { ctx.activate(r.to); });
        container.appendChild(btn);
      });
    }

    // ---- sources ----
    citeList(container, 'References for the figures above');

    /* Only what the numbered list did not already cover. A node whose every
       source is now attached to a specific figure has nothing left to say
       here, and printing the same two papers twice, one block apart, makes
       the numbered list look decorative rather than load-bearing. */
    var extraSources = (node.sources || []).filter(function (s) { return !citeHas(s); });
    if (extraSources.length) {
      container.appendChild(h('h3', null, 'Other sources for this subtype'));
      var sl = h('ul', 'plist srcs');
      extraSources.forEach(function (s) {
        var li = h('li');
        if (s.url) {
          var a = document.createElement('a');
          a.href = s.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = s.label || s.url;
          li.appendChild(a);
        } else {
          li.textContent = s.label || '';
        }
        sl.appendChild(li);
      });
      container.appendChild(sl);
    }

    /* Recent work on the drugs used in THIS subtype. Placed last, after the
       curated profile and its sources, because it is the least settled thing
       on the panel — and every row still carries its tier and species. */
    var lit = ctx.literatureForNode ? ctx.literatureForNode(node.id) : [];
    if (lit && lit.length) {
      container.appendChild(h('h3', null, 'Recent literature for this subtype'));
      var kinds = {};
      lit.forEach(function (p) { kinds[p.kind] = (kinds[p.kind] || 0) + 1; });
      container.appendChild(h('p', 'tg-note',
        lit.length + ' paper' + (lit.length === 1 ? '' : 's') + ' since 2024 on the agents used ' +
        'here — ' + Object.keys(kinds).map(function (k) { return kinds[k] + ' on ' + k; }).join(', ') +
        '. Newest first.'));
      lit.slice(0, 4).forEach(function (p) { container.appendChild(paperCard(p, ctx)); });
      if (lit.length > 4) {
        var more = h('button', 'rel-item');
        more.type = 'button';
        more.appendChild(h('span', 'name', 'See all ' + lit.length + ' papers'));
        more.appendChild(h('span', 'kind', 'literature lens'));
        more.addEventListener('click', function () { ctx.setLens('literature'); });
        container.appendChild(more);
      }
    }
  }

  global.Render = {
    axisHead: axisHead,
    treemap: treemap,
    tree: tree,
    table: table,
    legend: legend,
    drawer: drawer,
    tooltip: tooltip,
    seriesColor: seriesColor,
    mode: mode,

    // Layer 0
    start: start,
    glossary: glossary,
    term: term,
    prose: prose,

    // Book I
    riskHead: riskHead,
    ranked: ranked,
    riskTable: riskTable,
    riskLegend: riskLegend,
    detection: detection,
    factorDrawer: factorDrawer,

    // Book III
    evidence: evidence,

    // Book IV
    targets: targets,
    targetDrawer: targetDrawer,
    proteinTrack: proteinTrack,
    drugs: drugs,
    drugDrawer: drugDrawer,

    // Book V
    literature: literature
  };
})(this);
