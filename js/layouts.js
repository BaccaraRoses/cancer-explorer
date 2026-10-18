/* layouts.js — pure geometry. No DOM, no data assumptions, no dependencies.
   Three algorithms:
     Layouts.squarify(items, rect)     squarified treemap (Bruls, Huizing & van Wijk 2000)
     Layouts.tidyTree(root, opts)      tidy layered tree (simplified Reingold-Tilford)
     Layouts.rankedRows(items, rect)   grouped ranked rows on a log axis (risk factors)
*/
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------------
     Squarified treemap.
     items : [{ value:Number, ...anything }]  — value must be > 0 to be drawn
     rect  : { x, y, w, h }
     returns [{ ...item, x, y, w, h }] in the order laid out.

     Aspect ratios are kept near 1 by greedily growing a row while the worst
     ratio improves, then flushing it against the shorter side.
  --------------------------------------------------------------------- */
  function squarify(items, rect) {
    var out = [];
    var x = rect.x, y = rect.y, w = rect.w, h = rect.h;

    var queue = (items || []).filter(function (d) {
      return typeof d.value === 'number' && isFinite(d.value) && d.value > 0;
    });
    if (!queue.length || w <= 0 || h <= 0) return out;

    var total = queue.reduce(function (s, d) { return s + d.value; }, 0);
    var scale = (w * h) / total;

    queue = queue.map(function (d) {
      return { item: d, area: d.value * scale };
    });

    // worst aspect ratio in `row` if flushed against a side of length `len`
    function worst(row, len) {
      var sum = 0, mx = -Infinity, mn = Infinity;
      for (var i = 0; i < row.length; i++) {
        var a = row[i].area;
        sum += a;
        if (a > mx) mx = a;
        if (a < mn) mn = a;
      }
      if (sum <= 0 || len <= 0 || mn <= 0) return Infinity;
      var s2 = sum * sum, l2 = len * len;
      return Math.max((l2 * mx) / s2, s2 / (l2 * mn));
    }

    while (queue.length) {
      var horizontal = w >= h;         // stack the row along the shorter side
      var len = horizontal ? h : w;
      if (len <= 0) break;

      var row = [queue.shift()];
      while (queue.length) {
        var grown = row.concat([queue[0]]);
        if (worst(grown, len) <= worst(row, len)) row.push(queue.shift());
        else break;
      }

      var rowSum = row.reduce(function (s, d) { return s + d.area; }, 0);
      var thick = rowSum / len;        // depth of the strip we just filled

      if (horizontal) {
        var cy = y;
        for (var i = 0; i < row.length; i++) {
          var rh = row[i].area / thick;
          out.push(assign(row[i].item, x, cy, thick, rh));
          cy += rh;
        }
        x += thick; w -= thick;
      } else {
        var cx = x;
        for (var j = 0; j < row.length; j++) {
          var rw = row[j].area / thick;
          out.push(assign(row[j].item, cx, y, rw, thick));
          cx += rw;
        }
        y += thick; h -= thick;
      }

      // Floating-point dust can leave a sliver; stop before it turns negative.
      if (w < 0.01 || h < 0.01) break;
    }

    return out;

    function assign(item, rx, ry, rw, rh) {
      var o = {};
      for (var k in item) if (Object.prototype.hasOwnProperty.call(item, k)) o[k] = item[k];
      o.x = rx; o.y = ry; o.w = Math.max(0, rw); o.h = Math.max(0, rh);
      return o;
    }
  }

  /* ---------------------------------------------------------------------
     Tidy layered tree, laid out left-to-right.
     root : { children:[...] } — mutated only via the returned copies
     opts : { levelGap, nodeGap, getChildren }
     returns { nodes:[{node, depth, x, y}], links:[{source, target}], width, height }

     Leaves take successive slots; a parent centres on its children. Depth maps
     to x, slot to y. Good enough for taxonomies (tens of nodes, shallow).
  --------------------------------------------------------------------- */
  function tidyTree(root, opts) {
    opts = opts || {};
    var levelGap = opts.levelGap || 190;
    var nodeGap = opts.nodeGap || 34;
    var getChildren = opts.getChildren || function (n) { return n.children || []; };

    var nodes = [];
    var links = [];
    var slot = 0;
    var maxDepth = 0;

    function walk(n, depth, parentRec) {
      if (depth > maxDepth) maxDepth = depth;
      var kids = getChildren(n) || [];
      var rec = { node: n, depth: depth, x: depth * levelGap, y: 0 };
      nodes.push(rec);
      if (parentRec) links.push({ source: parentRec, target: rec });

      if (!kids.length) {
        rec.y = slot * nodeGap;
        slot += 1;
      } else {
        var first = null, last = null;
        for (var i = 0; i < kids.length; i++) {
          var childRec = walk(kids[i], depth + 1, rec);
          if (i === 0) first = childRec;
          last = childRec;
        }
        rec.y = (first.y + last.y) / 2;
      }
      return rec;
    }

    if (root) walk(root, 0, null);

    var height = Math.max(0, (slot - 1)) * nodeGap;
    return {
      nodes: nodes,
      links: links,
      width: maxDepth * levelGap,
      height: height
    };
  }

  /* ---------------------------------------------------------------------
     Grouped ranked rows on a logarithmic axis.

     Built for risk factors, where the quantity is a ratio: 0.75 and 1.33 are
     equal-and-opposite moves and must land equidistant from the origin. A linear
     axis would squash every protective factor into the left margin and stretch
     the one RR of 50 across the plot. Log is the only scale that reads honestly
     for ratios, which is why the origin is a parameter rather than zero.

     items : [{ value:Number > 0, group:String, ...anything }] — pre-sorted by the caller
     rect  : { x, y, w, h }   h is ignored; height is computed and returned
     opts  : { rowH, rowGap, groupGap, groupHeadH, origin, pad }

     returns { rows, groups, ticks, originX, scale, height }
       rows   [{ item, group, y, h, cx, x0, x1 }]  x0→x1 spans origin→value
       groups [{ key, y, h, headY }]
       ticks  [{ value, x }]
       scale  fn(value) -> x
  --------------------------------------------------------------------- */
  function rankedRows(items, rect, opts) {
    opts = opts || {};
    var rowH = opts.rowH || 22;
    var rowGap = opts.rowGap || 8;
    var groupGap = opts.groupGap || 26;
    var groupHeadH = opts.groupHeadH || 20;
    var origin = opts.origin == null ? 1 : opts.origin;
    var pad = opts.pad == null ? 0.18 : opts.pad;

    var list = (items || []).filter(function (d) {
      return typeof d.value === 'number' && isFinite(d.value) && d.value > 0;
    });

    var x = rect.x, w = Math.max(1, rect.w);

    // Domain must always contain the origin, or the reference line falls off-plot.
    var lo = origin, hi = origin;
    list.forEach(function (d) {
      if (d.value < lo) lo = d.value;
      if (d.value > hi) hi = d.value;
    });
    // widen by a fraction of the span, in log space so it stays symmetric
    var lg = Math.log(hi / lo) || Math.LN2;
    lo = lo * Math.exp(-lg * pad);
    hi = hi * Math.exp(lg * pad);

    var lLo = Math.log(lo), lHi = Math.log(hi);
    var span = (lHi - lLo) || 1;

    function scale(v) {
      if (!(v > 0)) return x;
      return x + ((Math.log(v) - lLo) / span) * w;
    }

    var originX = scale(origin);

    // rows, inserting a header and a gap whenever the group changes
    var rows = [];
    var groups = [];
    var y = rect.y;
    var currentKey = null;
    var currentGroup = null;

    list.forEach(function (d) {
      var key = d.group == null ? '' : String(d.group);
      if (key !== currentKey) {
        if (currentGroup) currentGroup.h = y - currentGroup.y - rowGap;
        if (currentKey !== null) y += groupGap;
        currentGroup = { key: key, y: y, headY: y + groupHeadH * 0.72, h: 0 };
        groups.push(currentGroup);
        currentKey = key;
        y += groupHeadH;
      }
      var cx = scale(d.value);
      rows.push({
        item: d,
        group: key,
        y: y,
        h: rowH,
        cx: cx,
        x0: Math.min(originX, cx),
        x1: Math.max(originX, cx)
      });
      y += rowH + rowGap;
    });
    if (currentGroup) currentGroup.h = y - currentGroup.y - rowGap;

    // Nice ratio ticks — only those the domain actually contains.
    var CANDIDATES = [0.1, 0.2, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 7, 10, 20, 30, 50, 100];
    var ticks = [];
    CANDIDATES.forEach(function (t) {
      if (t >= lo && t <= hi) ticks.push({ value: t, x: scale(t) });
    });

    return {
      rows: rows,
      groups: groups,
      ticks: ticks,
      originX: originX,
      scale: scale,
      domain: [lo, hi],
      height: Math.max(0, y - rect.y - rowGap)
    };
  }

  /* ---------------------------------------------------------------------
     Protein track: a domain ribbon with lollipops at mutated residues.

     The standard genomics idiom, and it earns its place — a hotspot list is
     just text until you can see that PIK3CA H1047R sits inside the catalytic
     domain while E545K sits in the helical one, which is the structural reason
     those two alleles behave differently.

     length   : residues (from UniProt)
     domains  : [{ name, start, end, kind }]
     hotspots : [{ change, pos, n }]
     rect     : { x, y, w, h }  h is the ribbon height; lollipops rise above it
     opts     : { stemMax, minGap }

     returns { scale, ribbon, domains, lollipops, ticks, height, top }
       lollipops carry `collide` = index within a cluster of near-neighbours, so
       the renderer can stagger labels instead of overprinting them.
  --------------------------------------------------------------------- */
  function proteinTrack(length, domains, hotspots, rect, opts) {
    opts = opts || {};
    var stemMax = opts.stemMax || 64;
    var minGap = opts.minGap == null ? 34 : opts.minGap;
    var L = length > 0 ? length : 1;

    var x = rect.x, w = Math.max(1, rect.w), ribbonH = rect.h || 18;

    function scale(pos) {
      var p = Math.max(0, Math.min(L, pos || 0));
      return x + (p / L) * w;
    }

    var maxN = 1;
    (hotspots || []).forEach(function (h) { if (h.n > maxN) maxN = h.n; });

    /* Headroom above the tallest possible stem for that stem's own label. Without
       it the label on a full-height lollipop is drawn above the viewBox and is
       simply gone — and the full-height one is always the most important. */
    var LAB_RESERVE = 18;
    var top = rect.y;                          // top of the lollipop field
    var ribbonY = top + stemMax + 10 + LAB_RESERVE;

    /* UniProt hands back everything it knows, which for p53 is a dozen short
       Regions that turn the ribbon into confetti. Structural features get the
       ribbon; sub-features are kept only when there are few enough to read and
       each is wide enough to see. Colour indices come from the major list alone
       so the palette does not skip slots. */
    var MAJOR = { 'Domain': 1, 'DNA binding': 1, 'Zinc finger': 1 };
    var all = (domains || []);
    var major = all.filter(function (d) { return MAJOR[d.kind]; });
    var minorAll = all.filter(function (d) { return !MAJOR[d.kind]; });
    var minor = minorAll.filter(function (d) {
      return (d.end - d.start) / L >= 0.012;
    });
    if (minor.length > 5) minor = [];
    if (!major.length) { major = minor; minor = []; }

    var doms = major.map(function (d, i) {
      var x0 = scale(d.start), x1 = scale(d.end);
      return { domain: d, colorIndex: i, x: x0, w: Math.max(2, x1 - x0),
               y: ribbonY, h: ribbonH, minor: false };
    }).concat(minor.map(function (d, i) {
      var x0 = scale(d.start), x1 = scale(d.end);
      return { domain: d, colorIndex: i, x: x0, w: Math.max(2, x1 - x0),
               y: ribbonY, h: ribbonH, minor: true };
    }));

    var hiddenFeatures = all.length - major.length - minor.length;

    /* Only the most recurrent few are labelled. Hotspots cluster — five of
       p53's land inside the DNA-binding domain — so labelling all of them
       guarantees overprinting. The rest stay drawn and hoverable, which is what
       every mutation mapper does. */
    var labelTop = opts.labelTop == null ? 5 : opts.labelTop;
    var labelled = {};
    (hotspots || []).slice().sort(function (a, b) { return b.n - a.n; })
      .slice(0, labelTop).forEach(function (h) { labelled[h.change] = true; });

    /* Two channels, two scales, and they are different on purpose.

       STEM is a length, so it is LINEAR in n. It used to be sqrt(n), which drew
       PIK3CA's H1047R (n=75) as only 6.1x the height of R88Q (n=2) when the true
       ratio is 37.5x — flattering every minor hotspot and hiding the fact that
       one allele dominates the gene. Length is the channel a reader measures
       against the baseline, and it has to be honest.

       HEAD is a disc, so its RADIUS is sqrt(n) — which makes its AREA linear in
       n. That is the correct pairing, not an inconsistency.

       The 8px stem floor is what keeps a rare change visible; below ~12% of the
       maximum every stem is at the floor and only the head separates them. */
    var lolli = (hotspots || []).slice().sort(function (a, b) { return a.pos - b.pos; })
      .map(function (h) {
        var lin = h.n / maxN;
        var stem = Math.max(8, lin * stemMax);
        var area = Math.sqrt(lin);
        return {
          hotspot: h,
          label: !!labelled[h.change],
          x: scale(h.pos),
          yTop: ribbonY - stem,
          yBase: ribbonY,
          r: Math.max(3.5, Math.min(8, 3 + area * 5)),
          collide: 0
        };
      });

    /* Place the labels against real geometry rather than against x-distance
       alone. Staggering by "is the previous label within minGap" was adequate
       while stems were sqrt-scaled and therefore spread out; with linear stems
       most sit at the 8px floor, so their labels all want the same y band and a
       neighbouring lollipop HEAD lands on top of one.

       So: seed the occupied list with every head, then push each label upward
       until it clears both the heads and the labels already placed. Same rule
       as the landscape scatter — a label must dodge marks, not just labels. */
    var LAB_H = 12, LAB_STEP = 12;
    var occupied = lolli.map(function (p) {
      return { x0: p.x - p.r - 1, x1: p.x + p.r + 1, y0: p.yTop - p.r, y1: p.yTop + p.r };
    });

    function clashes(x0, x1, y0, y1) {
      for (var i = 0; i < occupied.length; i++) {
        var o = occupied[i];
        if (x0 < o.x1 && x1 > o.x0 && y0 < o.y1 && y1 > o.y0) return true;
      }
      return false;
    }

    lolli.forEach(function (p) {
      if (!p.label) return;
      var halfW = String(p.hotspot.change).length * 3.2 + 3;
      var tier = 0;
      var y1 = p.yTop - p.r - 4;
      // Stop climbing at the top of the field: a slightly crowded label beats
      // one drawn outside the viewBox, where it does not exist at all.
      while (tier < 8 && (y1 - LAB_H) > top &&
             clashes(p.x - halfW, p.x + halfW, y1 - LAB_H, y1)) {
        tier += 1;
        y1 = p.yTop - p.r - 4 - tier * LAB_STEP;
      }
      p.collide = tier;
      p.labelY = y1;
      occupied.push({ x0: p.x - halfW, x1: p.x + halfW, y0: y1 - LAB_H, y1: y1 });
    });

    /* Ticks: regular steps plus the C-terminus, but the last step is dropped if
       it would collide with the total — "1000 1068" printed on top of itself
       is worse than no 1000. */
    var ticks = [];
    var step = L <= 200 ? 50 : L <= 600 ? 100 : L <= 1500 ? 250 : 500;
    for (var t = 0; t <= L - step * 0.4; t += step) ticks.push({ value: t, x: scale(t) });
    ticks.push({ value: L, x: scale(L) });
    var minTick = opts.minTickGap == null ? 30 : opts.minTickGap;
    ticks = ticks.filter(function (tk, i, arr) {
      if (i === 0 || i === arr.length - 1) return true;
      return (tk.x - arr[i - 1].x) >= minTick && (arr[arr.length - 1].x - tk.x) >= minTick;
    });

    var maxTier = lolli.reduce(function (m, p) { return Math.max(m, p.collide); }, 0);

    return {
      scale: scale,
      length: L,
      ribbon: { x: x, y: ribbonY, w: w, h: ribbonH },
      domains: doms,
      lollipops: lolli,
      ticks: ticks,
      hiddenFeatures: hiddenFeatures,
      labelTiers: maxTier + 1,
      // room below the ribbon for the minor-feature row AND the residue axis
      tickY: ribbonY + ribbonH + (minor.length ? 26 : 15),
      height: (ribbonY + ribbonH + (minor.length ? 34 : 23) + maxTier * 13) - rect.y
    };
  }

  /* Cubic bezier between two points, flat-ended — used for tree links. */
  function elbow(x1, y1, x2, y2) {
    var mx = (x1 + x2) / 2;
    return 'M' + x1 + ',' + y1 + 'C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2;
  }

  /* Arc that bows away from the tree spine — used for cross-cutting relations. */
  function arc(x1, y1, x2, y2, bow) {
    bow = bow == null ? 60 : bow;
    var mx = (x1 + x2) / 2 + bow;
    var my = (y1 + y2) / 2;
    return 'M' + x1 + ',' + y1 + 'Q' + mx + ',' + my + ' ' + x2 + ',' + y2;
  }

  global.Layouts = {
    squarify: squarify,
    tidyTree: tidyTree,
    rankedRows: rankedRows,
    proteinTrack: proteinTrack,
    elbow: elbow,
    arc: arc
  };
})(this);
