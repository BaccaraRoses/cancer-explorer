/* tools/rendercheck.js -- the in-page half of tools/rendercheck.py.

   Evaluated into the page after each load; defines window.__rc. Each function
   reads what a visitor sees -- boxes, pressed buttons, text -- and moves
   through the page with its own controls. The one exception is probes(): the
   search queries come from the loaded datasets, so a kind of result that stops
   being found cannot hide behind a hand-written list of queries. */
(function () {
  'use strict';

  var CONTROLS = 'button, select, input, textarea, a.sr-item, [role="button"]';

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function frames() {
    return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); });
  }
  function $(s) { return document.querySelector(s); }
  function all(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function words(s) { return String(s || '').trim().split(/\s+/).join(' '); }
  function isPhone() { return matchMedia('(max-width: 640px)').matches; }
  function px(n) { return Math.round(n); }

  function shown(el) {
    if (!el || !el.getClientRects().length) return false;
    var cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
  }

  function name(el) {
    var t = words(el.getAttribute('aria-label') || el.textContent || el.value || el.title || '');
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (t ? ' "' + t.slice(0, 40) + '"' : '');
  }

  function pressed(sel) {
    var b = all(sel + ' button').filter(function (x) { return x.getAttribute('aria-pressed') === 'true'; })[0];
    return b ? (b.dataset.lens || b.dataset.view || b.dataset.ds || words(b.textContent)) : null;
  }

  function where() {
    return { ds: $('#sel-dataset').value, lens: pressed('#lens-toggle'), view: pressed('#view-toggle'),
             axis: $('#sel-axis').value };
  }

  /* ---- moving through the page ---- */

  function plan() {
    return {
      cancers: all('#sel-dataset option').map(function (o) { return o.value; }),
      lenses: all('#lens-toggle button').filter(function (b) { return !b.hidden; })
        .map(function (b) { return b.dataset.lens; }),
      views: all('#view-toggle button').filter(function (b) { return !b.hidden; })
        .map(function (b) { return b.dataset.view; }),
      axes: all('#sel-axis option').map(function (o) { return o.value; })
    };
  }

  async function show(s) {
    if (s.ds && s.ds !== $('#sel-dataset').value) {
      var tab = $('#cancer-tabs button[data-ds="' + s.ds + '"]');
      if (isPhone() && shown(tab)) tab.click();
      else {
        var sel = $('#sel-dataset');
        sel.value = s.ds;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    if (s.lens) {
      var lb = $('#lens-toggle button[data-lens="' + s.lens + '"]');
      if (lb && lb.getAttribute('aria-pressed') !== 'true') lb.click();
    }
    if (s.axis) {
      var ax = $('#sel-axis');
      if (ax.value !== s.axis) {
        ax.value = s.axis;
        ax.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    if (s.view) {
      var vb = $('#view-toggle button[data-view="' + s.view + '"]');
      if (vb && vb.getAttribute('aria-pressed') !== 'true') vb.click();
    }
    // rendering is synchronous; reading a box below forces layout
    scrollTo(0, 0);
    return where();
  }

  /* ---- layout ---- */

  // the first box that clips el sideways, or the window; null when el is whole
  function clipOf(el, r, W) {
    for (var a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      var ox = getComputedStyle(a).overflowX;
      if (ox === 'auto' || ox === 'scroll') return null;   // reachable by scrolling that box
      if (ox === 'hidden' || ox === 'clip') {
        var ar = a.getBoundingClientRect();
        if (r.left < ar.left - 1 || r.right > ar.right + 1) {
          return 'cut off by ' + name(a).slice(0, 30) + ': spans ' + px(r.left) + '..' + px(r.right) +
            'px, the box shows ' + px(ar.left) + '..' + px(ar.right) + 'px';
        }
      }
    }
    if (r.left < -1 || r.right > W + 1) {
      return 'off-screen: spans ' + px(r.left) + '..' + px(r.right) + 'px in a ' + W + 'px window';
    }
    return null;
  }

  function insideScroller(el) {
    for (var a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      if (getComputedStyle(a).overflowX !== 'visible') return true;
    }
    return false;
  }

  // what sticks out past the right edge while its parent does not
  function culprits(W) {
    var hits = [];
    all('body *').some(function (el) {
      if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) return false;
      if (!el.getClientRects().length) return false;
      var r = el.getBoundingClientRect();
      if (r.right <= W + 1 || insideScroller(el)) return false;
      var p = el.parentElement;
      if (p && p.getBoundingClientRect().right > W + 1) return false;
      hits.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
        (el.getAttribute('class') ? '.' + el.getAttribute('class').split(' ').join('.') : '') +
        ' to ' + px(r.right) + 'px');
      return hits.length >= 3;
    });
    return hits.join(', ') || 'not found';
  }

  // fixed and sticky bars, and the search results, float over the page by
  // design; compare like with like
  function layerOf(el) {
    for (var a = el; a && a !== document.documentElement; a = a.parentElement) {
      var pos = getComputedStyle(a).position;
      if (pos === 'fixed' || pos === 'sticky' || a.id === 'search-results') return a;
    }
    return null;
  }

  function layout() {
    var out = [], W = document.documentElement.clientWidth;
    var sw = document.documentElement.scrollWidth;
    if (sw > W + 1) {
      out.push('the page scrolls sideways: ' + sw + 'px of content in a ' + W + 'px window (sticking out: ' +
        culprits(W) + ')');
    }
    var boxes = [];
    all(CONTROLS).forEach(function (el) {
      if (el instanceof SVGElement || !shown(el)) return;
      var r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      var clip = clipOf(el, r, W);
      if (clip) out.push(name(el) + ' ' + clip);
      if ((el.tagName === 'BUTTON' || el.tagName === 'A') &&
          (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)) {
        out.push(name(el) + ' has its text cut: needs ' + el.scrollWidth + 'x' + el.scrollHeight +
          'px, shows ' + el.clientWidth + 'x' + el.clientHeight + 'px');
      }
      boxes.push({ el: el, r: r, layer: layerOf(el) });
    });
    for (var i = 0; i < boxes.length; i++) {
      for (var j = i + 1; j < boxes.length; j++) {
        var a = boxes[i], b = boxes[j];
        if (a.layer !== b.layer || a.el.contains(b.el) || b.el.contains(a.el)) continue;
        var w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
        var h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
        if (w > 2 && h > 2) out.push(name(a.el) + ' overlaps ' + name(b.el) + ' by ' + px(w) + 'x' + px(h) + 'px');
      }
    }
    var bar = $('#ctl-lens');
    if (bar && shown(bar) && getComputedStyle(bar).position === 'fixed') {
      var y0 = scrollY;
      scrollTo(0, document.documentElement.scrollHeight);
      var fr = $('.foot').getBoundingClientRect(), br = bar.getBoundingClientRect();
      if (fr.bottom > br.top + 1) {
        out.push('the page end is under the lens bar: the footer ends at ' + px(fr.bottom) +
          'px, the bar starts at ' + px(br.top) + 'px');
      }
      scrollTo(0, y0);
    }
    return { problems: out, controls: boxes.length };
  }

  // the phone frame itself: if these go, the checks above would pass on nothing
  function phoneFrame() {
    var out = [];
    var bar = $('#ctl-lens'), tabs = $('#cancer-tabs'), open = $('#search-open');
    if (!shown(bar) || getComputedStyle(bar).position !== 'fixed') out.push('the lens bar is not fixed on screen');
    if (!shown(tabs)) out.push('the cancer tabs are not shown');
    if (!shown(open)) out.push('the search button is not shown');
    return out;
  }

  /* ---- search ---- */

  function probes() {
    var id = $('#sel-dataset').value;
    var d = (CancerExplorer._datasets || []).filter(function (x) { return x.id === id; })[0] || {};
    function lens(l) { var b = $('#lens-toggle button[data-lens="' + l + '"]'); return !!b && !b.hidden; }
    function enough(s) { return String(s || '').replace(/[^0-9A-Za-z]/g, '').length >= 2; }
    function last(a) { return a[a.length - 1]; }
    var out = [];
    var nodes = (d.nodes || []).filter(function (n) { return enough(n.label); });
    if (nodes.length) out.push({ kind: 'node', q: nodes[0].label });
    if (nodes.length > 1) out.push({ kind: 'node', q: last(nodes).label });
    var factors = lens('risk') ? (d.factors || []).filter(function (f) { return enough(f.label); }) : [];
    if (factors.length) out.push({ kind: 'factor', q: last(factors).label });
    var t = lens('targets') ? d.targetData : null;
    if (t) {
      var genes = Object.keys(t.genes || {});
      if (genes.length) out.push({ kind: 'target', q: last(genes) });
      if ((t.drugs || []).length) out.push({ kind: 'drug', q: last(t.drugs).name });
    }
    if (window.Glossary && lens('start')) {
      var g = last(Glossary.groups() || []);
      if (g && g.terms.length) out.push({ kind: 'term', q: last(g.terms).t });
    }
    var lit = lens('literature') ? d.literatureData : null;
    if (lit && (lit.papers || []).length) out.push({ kind: 'paper', q: last(lit.papers).title, url: last(lit.papers).url });
    return out;
  }

  function rect(el) {
    if (!el || !shown(el)) return null;
    var r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  }

  async function search(q) {
    if (isPhone() && !document.documentElement.classList.contains('search-sheet')) $('#search-open').click();
    var res = $('#search-results'), box = $('#search');
    // mark what is listed now, so the old list cannot pass for the new one
    all('*', res).forEach(function (n) { n.setAttribute('data-rc-old', ''); });
    box.focus();
    box.value = q;
    box.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(150);   // the box waits 140ms after the last key
    for (var i = 0; i < 40 && !(res.firstElementChild && !res.firstElementChild.hasAttribute('data-rc-old')); i++) {
      await sleep(25);
    }
    await frames();
    return {
      sheet: document.documentElement.classList.contains('search-sheet'),
      results: rect(res),
      width: document.documentElement.clientWidth,
      count: words((res.querySelector('.sr-count') || {}).textContent),
      note: words((res.querySelector('.sr-note') || {}).textContent),
      groups: all('.sr-group', res).map(function (g) {
        var head = g.querySelector('.sr-head');
        return {
          title: words(head && head.firstChild ? head.firstChild.textContent : ''),
          items: all('.sr-item', g).map(function (it) {
            return { label: words((it.querySelector('.sr-label') || it).textContent),
                     tag: it.tagName.toLowerCase(), href: it.getAttribute('href') || '',
                     target: it.getAttribute('target') || '' };
          })
        };
      })
    };
  }

  // what the screen shows between the sticky strip and the fixed lens bar
  function band() {
    var top = rect($('#mtop')), bar = $('#ctl-lens');
    return { top: top ? top.bottom : 0,
             bottom: rect(bar) && getComputedStyle(bar).position === 'fixed' ? rect(bar).top : innerHeight };
  }

  async function pick(title, label) {
    var group = all('#search-results .sr-group').filter(function (g) {
      var head = g.querySelector('.sr-head');
      return head && words(head.firstChild.textContent) === title;
    })[0];
    var item = group && all('.sr-item', group).filter(function (it) {
      return words((it.querySelector('.sr-label') || it).textContent) === label;
    })[0];
    if (!item) return null;
    item.click();
    await sleep(120);
    await frames();
    var found = $('.gl-term.is-found');
    return {
      at: where(),
      sheet: document.documentElement.classList.contains('search-sheet'),
      resultsShown: shown($('#search-results')),
      drawer: rect($('#drawer')),
      drawerText: words(($('#drawer') || {}).textContent).slice(0, 6000),
      found: found ? { term: found.dataset.term, box: rect(found) } : null,
      band: band()
    };
  }

  function closeSearch() {
    if (document.documentElement.classList.contains('search-sheet')) $('#search-close').click();
    var box = $('#search');
    box.value = '';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    box.blur();
  }

  /* ---- the hover tip ---- */

  // after the scroll has landed: its scroll event hides a tip by design
  async function centre(sel) {
    var el = $(sel);
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    await frames();
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function tip() {
    var t = document.getElementById('tip');
    if (!t || t.hidden || !words(t.textContent)) return null;
    var r = t.getBoundingClientRect();
    return { title: words((t.querySelector('.t-title') || t).textContent), left: r.left, right: r.right };
  }

  // a tip may show, but only for the shape under the pointer and beside it
  function tipStale(x, y) {
    var t = tip();
    if (!t) return null;
    var under = document.elementFromPoint(x, y);
    var g = under && under.closest('g.node, g.rk-row');
    if (!g) return 'a tip for "' + t.title + '" with no shape under the pointer';
    var label = g.getAttribute('aria-label') || '';
    if (label.indexOf(t.title) !== 0) return 'a tip for "' + t.title + '" over "' + label.slice(0, 40) + '"';
    if (Math.min(Math.abs(t.left - x), Math.abs(t.right - x)) > 40) return 'a tip for "' + t.title + '" away from the pointer';
    return null;
  }

  /* ---- Targets: a card opened from where it was tapped, and the way back ---- */

  function targetPlan() {
    var id = $('#sel-dataset').value;
    var d = (CancerExplorer._datasets || []).filter(function (x) { return x.id === id; })[0] || {};
    var t = d.targetData || {}, genes = t.genes || {};
    return {
      // every target on the landscape that has a card, read from the data
      expected: ((t.gaps || {}).landscape || []).map(function (r) { return r.gene; })
        .filter(function (g) { return genes[g]; }),
      buttons: all('.tg-open-row button').filter(shown).map(function (b) { return words(b.textContent); })
    };
  }

  function dotGene(g) { return (g.getAttribute('aria-label') || '').split(',')[0]; }

  function origin(kind, which) {
    if (kind === 'button') {
      return all('.tg-open-row button').filter(function (b) { return words(b.textContent) === which; })[0];
    }
    if (kind === 'row') {
      return all('.targetsview tbody tr.clickable').filter(function (tr) {
        return !which || words(tr.cells[0].textContent) === which;
      })[0];
    }
    if (kind === 'dot') {
      return all('.tg-scatter g.tg-pt').filter(function (g) { return dotGene(g) === which; })[0];
    }
    var backs = all('#drawer .tg-return').filter(shown);
    return which === 'last' ? backs[backs.length - 1] : backs[0];
  }

  // the place to tap, brought to the middle of the screen; a dot only where
  // nothing else is drawn over its centre
  async function aim(kind, which) {
    // mark the card open now, so it cannot pass for the one the tap opens
    var open = $('#drawer h2');
    if (open) open.setAttribute('data-rc-old', '');
    var els = kind === 'dot' ? all('.tg-scatter g.tg-pt') : [origin(kind, which)];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el) continue;
      var at = kind === 'dot' ? el.querySelector('circle') : kind === 'row' ? el.cells[0] : el;
      at.scrollIntoView({ block: 'center' });
      await frames();
      var r = at.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      if (kind === 'dot' && !el.contains(document.elementFromPoint(x, y))) continue;
      return { x: x, y: y, y0: scrollY,
               gene: kind === 'dot' ? dotGene(el) : words(kind === 'row' ? el.cells[0].textContent : el.textContent) };
    }
    return null;
  }

  // a smooth scroll is still moving after the click returns
  async function settle() {
    var last = -1;
    for (var i = 0; i < 90 && scrollY !== last; i++) { last = scrollY; await frames(); }
  }

  // the card the tap should open, waited for rather than slept on
  async function card(gene) {
    function fresh() {
      var h2 = $('#drawer h2');
      return h2 && !h2.hasAttribute('data-rc-old') && words(h2.textContent) === gene;
    }
    for (var i = 0; i < 80 && !fresh(); i++) await sleep(25);
    await settle();
    var h2 = $('#drawer h2');
    return { gene: h2 ? words(h2.textContent) : null, head: rect(h2), band: band(), y: scrollY,
             backs: all('#drawer .tg-return').filter(shown).map(function (b) { return words(b.textContent); }) };
  }

  // after the way back: wait for the page to leave the card first
  async function whereIs(kind, which, fromY) {
    for (var i = 0; i < 60 && scrollY === fromY; i++) await sleep(25);
    await settle();
    return { box: rect(origin(kind, which)), band: band(), y: scrollY };
  }

  // labels a chart's own edge cuts off: an svg clips what it draws past its box
  function svgCut(sel) {
    var out = [];
    all(sel).forEach(function (svg) {
      if (!shown(svg) || getComputedStyle(svg).overflow === 'visible') return;
      var s = svg.getBoundingClientRect();
      all('text', svg).forEach(function (t) {
        var txt = words(t.textContent);
        if (!txt || !t.getClientRects().length) return;
        var r = t.getBoundingClientRect();
        if (r.left < s.left - 1 || r.right > s.right + 1 || r.top < s.top - 1 || r.bottom > s.bottom + 1) {
          out.push('"' + txt.slice(0, 40) + '" is cut by the chart\'s edge: it spans ' + px(r.left - s.left) + '..' +
            px(r.right - s.left) + 'px of a ' + px(s.width) + 'px chart');
        }
      });
    });
    return out;
  }

  window.__rc = { plan: plan, show: show, where: where, layout: layout, phoneFrame: phoneFrame,
                  probes: probes, search: search, pick: pick, closeSearch: closeSearch,
                  centre: centre, tip: tip, tipStale: tipStale, targetPlan: targetPlan, aim: aim,
                  card: card, whereIs: whereIs, svgCut: svgCut };
})();
