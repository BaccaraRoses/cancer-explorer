/* validate.js — checks a dataset against the schema in SCHEMA.md.

   Runs in the browser (used automatically on boot, reports to the console) and
   in Node via tools/validate.mjs. Keep it dependency-free so both work.

   Validate.dataset(ds) -> { errors:[String], warnings:[String], stats:{...} }
   Errors mean the engine may misbehave. Warnings mean the data is probably
   wrong but will still render.
*/
(function (global) {
  'use strict';

  var DIRECTIONS = ['increases', 'decreases', 'mixed'];
  var EVIDENCE = ['strong', 'moderate', 'limited'];
  /* What a factor's effect size is a multiplier ON. Defaults to 'incidence',
     so every dataset written before this field existed keeps its meaning. */
  var OUTCOMES = ['incidence', 'mortality'];
  /* What a relative risk is relative TO. `population`: the whole population the
     baseline describes, so baseline × rr is the exposed group's risk.
     `unexposed`: the part of that population without the exposure (never
     smokers, non-carriers), whose own risk is LOWER than the baseline whenever
     the exposure raises it — so baseline × rr is only a bound, and for a common
     strong exposure a wildly wrong one. `other`: a comparison group outside the
     baseline population altogether (low-dose Hodgkin survivors), never
     converted. */
  var REFERENTS = ['population', 'unexposed', 'other'];
  var TRADEOFF_KINDS = ['benefit', 'harm'];
  /* `mutually-exclusive` is the odd one out: every other kind says two nodes
     have something in common, and this one says they measurably do not. It is
     a real and load-bearing relation in cancer genomics — prostate's ETS
     fusions and SPOP mutations essentially never co-occur, and that absence is
     the strongest structure on its molecular axis. `shares-driver` is its
     opposite, and there was no way to say it before. */
  var REL_KINDS = ['overlaps', 'progresses-to', 'reclassified-as', 'shares-driver',
                   'precursor-of', 'subset-of', 'mutually-exclusive'];

  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function isStr(v) { return typeof v === 'string' && v.length > 0; }

  function dataset(ds) {
    var errors = [];
    var warnings = [];

    if (!ds || typeof ds !== 'object') {
      return { errors: ['dataset is not an object'], warnings: [], stats: {} };
    }

    // ---- top level -----------------------------------------------------
    ['id', 'name'].forEach(function (k) {
      if (!isStr(ds[k])) errors.push('dataset.' + k + ' is required and must be a non-empty string');
    });

    if (!Array.isArray(ds.axes) || !ds.axes.length) {
      errors.push('dataset.axes must be a non-empty array');
    }
    if (!Array.isArray(ds.nodes) || !ds.nodes.length) {
      errors.push('dataset.nodes must be a non-empty array');
    }
    if (errors.length) return { errors: errors, warnings: warnings, stats: {} };

    // ---- baseline ------------------------------------------------------
    /* Optional, but once present it becomes the denominator the renderer uses to
       convert every factor RR into absolute terms. A wrong baseline is therefore
       worse than an absent one — check it rather than trusting it. */
    if (ds.baseline != null) {
      var b = ds.baseline;
      if (typeof b !== 'object') {
        errors.push('dataset.baseline must be an object');
      } else {
        if (!isNum(b.lifetimeRisk)) {
          errors.push('baseline.lifetimeRisk is required and must be a number (percent)');
        } else if (b.lifetimeRisk <= 0 || b.lifetimeRisk > 100) {
          errors.push('baseline.lifetimeRisk ' + b.lifetimeRisk + ' is outside 0–100 (it is a percent, not a fraction)');
        }
        if (!isStr(b.population)) {
          warnings.push('baseline has no population — "13%" is meaningless without saying 13% of whom');
        }
        if (!b.source || !isStr(b.source.label)) {
          warnings.push('baseline has no source — this number anchors every risk conversion in the app');
        }
        (b.strata || []).forEach(function (s, si) {
          if (!isStr(s.label)) errors.push('baseline.strata[' + si + '] needs a label');
          if (!isNum(s.lifetimeRisk)) errors.push('baseline.strata[' + si + '] lifetimeRisk must be a number');
        });
      }
    }

    // ---- markers -------------------------------------------------------
    var markerIds = {};
    (ds.markers || []).forEach(function (m, i) {
      if (!isStr(m.id)) { errors.push('markers[' + i + '].id is required'); return; }
      if (markerIds[m.id]) errors.push('duplicate marker id "' + m.id + '"');
      markerIds[m.id] = true;
      if (!isStr(m.label)) warnings.push('marker "' + m.id + '" has no label');
    });

    // ---- axes ----------------------------------------------------------
    var axisIds = {};
    var defaults = 0;
    ds.axes.forEach(function (a, i) {
      if (!isStr(a.id)) { errors.push('axes[' + i + '].id is required'); return; }
      if (axisIds[a.id]) errors.push('duplicate axis id "' + a.id + '"');
      axisIds[a.id] = true;
      if (!isStr(a.label)) warnings.push('axis "' + a.id + '" has no label');
      /* The plain-language triple. The front page builds a card per axis out of
         these and the Subtypes lens head repeats them, so an axis without them
         is a classification a newcomer cannot tell apart from the other three. */
      ['asks', 'measures', 'decides'].forEach(function (k) {
        if (!isStr(a[k])) {
          warnings.push('axis "' + a.id + '" has no ' + k + ' — its card on the front page ' +
            'will not say what this classification is for');
        }
      });
      if (a.default) defaults++;
      /* `partition: false` says the axis's nodes are COMPARED, not shares:
         lung's before-and-after-therapy cohorts include some of the same
         patients, so no share of anyone can be drawn for them. */
      if (a.partition != null && typeof a.partition !== 'boolean') {
        errors.push('axis "' + a.id + '" partition must be true or false');
      }
    });
    if (defaults === 0) warnings.push('no axis marked default:true — the first axis will be used');
    if (defaults > 1) warnings.push(defaults + ' axes marked default:true — the first one wins');

    // ---- references ----------------------------------------------------
    /* Citations are declared once here and referenced by id. Repeating a URL
       across ninety claims is how coverage rots; an id that resolves to nothing
       is a citation that looks real and is not. */
    var refIds = {};
    (ds.references || []).forEach(function (r, i) {
      if (!isStr(r.id)) { errors.push('references[' + i + '].id is required'); return; }
      if (refIds[r.id]) errors.push('duplicate reference id "' + r.id + '"');
      refIds[r.id] = true;
      if (!isStr(r.label)) errors.push('reference "' + r.id + '" has no label');
      if (!isStr(r.url)) warnings.push('reference "' + r.id + '" has no url — it cannot be followed');
    });

    /* ---- can a reader check the numbers? ----
       A claim carrying a digit is a claim someone may want to verify. Prose
       with no figure in it is judgement and is allowed to stand on whatever
       vouches for the block it sits in; a percentage, a survival figure or an
       approval date is not. So the rule is mechanical: if it has a number and
       no source, say so.

       Warnings rather than errors, because a dataset mid-curation should still
       render — but they are counted in stats.checkable so the gap is a number
       rather than a feeling.

       These live out here rather than inside the node loop because the claims
       that most need checking are not all on nodes. A screening harm and a
       curated target summary carry figures a reader will act on just as
       readily as a survival percentage does, and for a while only the nodes
       were being asked for provenance. */
    var claimTotals = {}, numericTotals = {}, numericCited = {};

    /* A digit inside a token is part of a NAME — HER2, p53, CDK4/6, PD-L1 —
       not a quantity anyone would check. Only a digit that starts a token is a
       figure. Without this the rule flagged "HER2 IHC / ISH" as an uncited
       statistic, which would have taught the reader that the warning means
       nothing.

       Two more kinds of name wear a figure's shape: a hyphen joining letters to
       a digit (PD-1, GÖTEBORG-2) and a digit fused to one capital (2D, 3D). Both
       were counted as uncited statistics — "PD-1" had to be written out of
       colorectal's prose to get past it. A hyphen after a space, a digit or the
       start still opens a figure: "-5 points", "3-year". */
    function claimNeedsSource(text) {
      if (!isStr(text)) return false;
      var re = /(^|[\s(~≥≤<>=+,\-])\d+([A-Za-z]*)/g, m;
      while ((m = re.exec(text)) !== null) {
        var at = m.index + m[1].length;
        if (m[1] === '-' && at >= 2 && /[A-Za-zÀ-ɏ]/.test(text.charAt(at - 2))) continue;
        if (/^[A-Z]$/.test(m[2])) continue;
        return true;
      }
      return false;
    }
    function sourceOk(src) {
      if (src == null) return false;
      if (isStr(src)) return !!refIds[src] || src.indexOf(' ') !== -1;
      if (typeof src !== 'object') return false;
      if (Object.prototype.toString.call(src) === '[object Array]') {
        return src.length > 0 && src.every(sourceOk);
      }
      /* { ref, quote }: a references[] entry plus the sentence stating the
         figure. The pipeline checks the quote verbatim; here, only its shape. */
      if (src.ref != null) return isStr(src.ref) && !!refIds[src.ref] && (src.quote == null || isStr(src.quote));
      return isStr(src.label) || isStr(src.nct) || isStr(src.url);
    }
    /* The references[] ids a source names that do not exist — as a bare id or
       as the ref of a { ref, quote }. Free text with a space is a legacy inline
       citation, not an id. */
    function unknownRefIds(src) {
      return (Object.prototype.toString.call(src) === '[object Array]' ? src : [src])
        .map(function (one) {
          if (isStr(one)) return !refIds[one] && one.indexOf(' ') === -1 ? one : null;
          if (one && typeof one === 'object' && one.ref != null) return refIds[one.ref] ? null : String(one.ref);
          return null;
        })
        .filter(function (id) { return id !== null; });
    }
    /* `vouched` is the caller saying a block-level sources[] already stands
       behind this claim — a node's sources[], or detection.sources[]. */
    function recordClaim(where, text, src, kind, vouched) {
      claimTotals[kind] = (claimTotals[kind] || 0) + 1;
      if (!claimNeedsSource(text)) { claimTotals[kind + '_prose'] = 1; return; }
      numericTotals[kind] = (numericTotals[kind] || 0) + 1;
      if (sourceOk(src)) { numericCited[kind] = (numericCited[kind] || 0) + 1; return; }
      var bad = unknownRefIds(src);
      if (bad.length) {
        errors.push(where + ' source ' + JSON.stringify(bad) + ' is not a known references[] id');
        return;
      }
      if (vouched) return;
      warnings.push(where + ' states a figure with no source, and its block has none either — ' +
        'a number nobody can check is the thing this dataset exists to avoid');
    }

    // ---- axis populations ----------------------------------------------
    /* An axis may partition only part of the disease: lung's driver classes
       apply to adenocarcinoma, its PD-L1 bands to advanced non-small-cell
       disease. Its node shares are then shares of THAT group, and a reader
       told "25%" with no "of whom" assumes all lung cancer. The label is what
       the renderer prints beside every such share, so it is required. */
    ds.axes.forEach(function (a) {
      if (a.population == null || !isStr(a.id)) return;
      var pat = 'axis "' + a.id + '" population';
      var pop = a.population;
      if (typeof pop !== 'object' || !isStr(pop.label)) {
        errors.push(pat + ' needs a label — the field exists to name who the shares on this ' +
          'axis are shares of');
        return;
      }
      if (!isStr(pop.short)) {
        warnings.push(pat + ' has no short name — every "% of …" caption will spell out the full label');
      }
      if (pop.share != null) {
        if (!isNum(pop.share) || pop.share <= 0 || pop.share > 100) {
          errors.push(pat + ' share must be a percent of the whole cancer, above 0 and at most 100');
        } else {
          recordClaim(pat + ' share', pop.share + '% of all cases', pop.source, 'axis', false);
        }
      }
    });

    /* `shareOf` names the quantity when a whole-disease axis divides something
       other than case counts (colorectal's site shares divide the age-adjusted
       incidence rate). It is printed after "of", so it must be a phrase, and it
       cannot sit beside `population`: the caption has room for one "of", and
       which one would win is a renderer detail nobody reading the data sees. */
    ds.axes.forEach(function (a) {
      if (a.shareOf == null || !isStr(a.id)) return;
      var pat = 'axis "' + a.id + '" shareOf';
      if (!isStr(a.shareOf) || !a.shareOf.trim()) {
        errors.push(pat + ' must be a phrase naming what the shares divide, such as "the incidence rate"');
        return;
      }
      if (/^of\s/i.test(a.shareOf)) {
        errors.push(pat + ' starts with "of" — the renderer supplies it, and the caption would read "of of"');
      }
      if (a.population != null) {
        errors.push(pat + ' is set beside population — a caption can name one whole, so say both in ' +
          'the population label instead');
      }
      if (a.partition === false) {
        warnings.push(pat + ' is set on an axis of compared cohorts, which carries no shares to caption');
      }
    });

    // ---- nodes ---------------------------------------------------------
    var byId = {};
    ds.nodes.forEach(function (n, i) {
      if (!isStr(n.id)) { errors.push('nodes[' + i + '].id is required'); return; }
      if (byId[n.id]) errors.push('duplicate node id "' + n.id + '"');
      byId[n.id] = n;
    });

    ds.nodes.forEach(function (n) {
      if (!isStr(n.id)) return;
      var at = 'node "' + n.id + '"';

      if (!isStr(n.label)) errors.push(at + ' has no label');

      if (!isStr(n.axis)) {
        errors.push(at + ' has no axis');
      } else if (!axisIds[n.axis]) {
        errors.push(at + ' references unknown axis "' + n.axis + '"');
      }

      if (n.parent != null) {
        var p = byId[n.parent];
        if (!p) {
          errors.push(at + ' references unknown parent "' + n.parent + '"');
        } else if (p.axis !== n.axis) {
          errors.push(at + ' has parent "' + n.parent + '" on a different axis ' +
            '("' + p.axis + '" vs "' + n.axis + '") — parents must live on the same axis');
        }
      }

      var nAxis = ds.axes.filter(function (a) { return a.id === n.axis; })[0];
      if (n.prevalence != null && nAxis && nAxis.partition === false) {
        errors.push(at + ' has a prevalence on axis "' + n.axis + '", which declares partition:false — ' +
          'its nodes are compared cohorts, and a share of the whole would be invented');
      }
      if (n.prevalence != null) {
        if (!isNum(n.prevalence)) errors.push(at + ' prevalence must be a number');
        else if (n.prevalence < 0 || n.prevalence > 100) warnings.push(at + ' prevalence ' + n.prevalence + ' is outside 0–100');
      }

      // markers referenced must be declared
      if (n.markers) {
        Object.keys(n.markers).forEach(function (k) {
          if (!markerIds[k]) errors.push(at + ' uses undeclared marker "' + k + '" (add it to dataset.markers)');
        });
      }

      // triggers
      (n.triggers || []).forEach(function (t, ti) {
        var tat = at + ' triggers[' + ti + ']';
        if (!isStr(t.factor)) errors.push(tat + ' needs a factor');
        if (t.direction && DIRECTIONS.indexOf(t.direction) === -1) {
          errors.push(tat + ' direction "' + t.direction + '" not one of ' + DIRECTIONS.join('/'));
        }
        if (t.evidence && EVIDENCE.indexOf(t.evidence) === -1) {
          warnings.push(tat + ' evidence "' + t.evidence + '" not one of ' + EVIDENCE.join('/'));
        }
        if (!isStr(t.category)) warnings.push(tat + ' has no category — it will be grouped under "Other"');
      });

      // molecular
      var mol = n.molecular || {};
      (mol.drivers || []).forEach(function (d, di) {
        var dat = at + ' drivers[' + di + ']';
        if (!isStr(d.gene)) errors.push(dat + ' needs a gene');
        if (d.frequency != null && !isNum(d.frequency)) {
          warnings.push(dat + ' frequency should be a number (percent) — got ' + JSON.stringify(d.frequency));
        }
      });

      function checkClaim(where, text, src, kind) {
        recordClaim(where, text, src, kind, (n.sources || []).length > 0);
      }

      (n.therapies || []).forEach(function (t, ti) {
        checkClaim(at + ' therapies[' + ti + '] "' + (t.name || '?') + '"',
                   [t.name, t.setting, t.status].filter(isStr).join(' '), t.source, 'therapy');
      });
      (mol.pathways || []).forEach(function (pw, pi) {
        checkClaim(at + ' pathways[' + pi + '] "' + (pw.name || '?') + '"',
                   pw.status, pw.source, 'pathway');
      });
      (mol.biomarkers || []).forEach(function (bm, bi) {
        checkClaim(at + ' biomarkers[' + bi + '] "' + (bm.name || '?') + '"',
                   [bm.use, bm.threshold].filter(isStr).join(' '), bm.source, 'biomarker');
      });
      if (n.prognosis) {
        checkClaim(at + ' prognosis', n.prognosis.fiveYearNote, n.prognosis.source, 'prognosis');
      }

      // relations
      (n.related || []).forEach(function (r, ri) {
        var rat = at + ' related[' + ri + ']';
        if (!isStr(r.to)) { errors.push(rat + ' needs a target id'); return; }
        if (!byId[r.to]) errors.push(rat + ' points at unknown node "' + r.to + '"');
        if (r.kind && REL_KINDS.indexOf(r.kind) === -1) {
          warnings.push(rat + ' kind "' + r.kind + '" not one of ' + REL_KINDS.join('/'));
        }
      });
    });

    // ---- sibling prevalence sums --------------------------------------
    var groups = {};
    ds.nodes.forEach(function (n) {
      if (!isStr(n.axis)) return;
      var key = n.axis + '||' + (n.parent == null ? '<root>' : n.parent);
      (groups[key] = groups[key] || []).push(n);
    });

    /* Prevalence is share-of-total, not share-of-parent — that is what makes the
       nested treemap geometrically honest (a child's area is its true slice of
       the whole). So children must sum to their PARENT's value, and only
       root-level siblings sum to ~100. */
    Object.keys(groups).forEach(function (key) {
      var sibs = groups[key];
      var parentId = key.split('||')[1];
      var parent = parentId === '<root>' ? null : byId[parentId];
      var withVal = sibs.filter(function (n) { return isNum(n.prevalence); });
      if (withVal.length < 2) return;

      var where = 'axis/parent group "' + key.replace('||', ' / ') + '"';

      if (withVal.length !== sibs.length) {
        warnings.push(where + ': ' + (sibs.length - withVal.length) + ' of ' + sibs.length +
          ' siblings lack prevalence — the treemap will substitute the sibling mean');
      }

      var sum = withVal.reduce(function (s, n) { return s + n.prevalence; }, 0);
      var target, tol, what;

      if (parent && isNum(parent.prevalence)) {
        target = parent.prevalence;
        tol = Math.max(2, target * 0.08);
        what = 'their parent "' + parentId + '" (' + target + '%)';
      } else {
        target = 100;
        tol = 5;
        what = '~100% (root level)';
      }

      if (Math.abs(sum - target) > tol) {
        warnings.push(where + ': children sum to ' + sum.toFixed(1) + '%, expected ' + what +
          ' — prevalence is share of the whole cancer, not share of the parent (tolerance ±' +
          tol.toFixed(1) + ')');
      }
    });

    // ---- orphan axes ---------------------------------------------------
    Object.keys(axisIds).forEach(function (a) {
      var count = ds.nodes.filter(function (n) { return n.axis === a; }).length;
      if (!count) warnings.push('axis "' + a + '" has no nodes');
      var roots = ds.nodes.filter(function (n) { return n.axis === a && n.parent == null; }).length;
      if (count && !roots) errors.push('axis "' + a + '" has no root node (one node must have parent:null)');
    });

    // ---- factors -------------------------------------------------------
    /* Runs after nodes so byId is populated — affects[] and scope both point into it.
       Factors deliberately do NOT enter the prevalence sum checks above: they overlap
       arbitrarily and partition nothing, which is why they are not an axis. */
    var factorIds = {};
    var strataLabels = {}, strataRisk = {};
    ((ds.baseline || {}).strata || []).forEach(function (s) {
      if (isStr(s.label)) strataLabels[s.label] = true;
      if (isStr(s.label) && isNum(s.lifetimeRisk)) strataRisk[s.label] = s.lifetimeRisk;
    });

    (ds.factors || []).forEach(function (f, i) {
      if (!isStr(f.id)) { errors.push('factors[' + i + '].id is required'); return; }
      if (factorIds[f.id]) errors.push('duplicate factor id "' + f.id + '"');
      factorIds[f.id] = true;

      var fat = 'factor "' + f.id + '"';
      if (!isStr(f.label)) errors.push(fat + ' has no label');
      if (!isStr(f.category)) warnings.push(fat + ' has no category — it will be grouped under "Other"');

      if (typeof f.modifiable !== 'boolean') {
        errors.push(fat + ' needs modifiable:true|false — the Risk view groups by it, and ' +
          'guessing would tell someone they can change something they cannot');
      }

      if (f.direction && DIRECTIONS.indexOf(f.direction) === -1) {
        errors.push(fat + ' direction "' + f.direction + '" not one of ' + DIRECTIONS.join('/'));
      }
      if (f.evidence && EVIDENCE.indexOf(f.evidence) === -1) {
        warnings.push(fat + ' evidence "' + f.evidence + '" not one of ' + EVIDENCE.join('/'));
      }

      // rr and absoluteLifetime are two different claims — never both
      if (f.rr != null && f.absoluteLifetime != null) {
        errors.push(fat + ' has both rr and absoluteLifetime — a multiplier on the baseline and a ' +
          'replacement for it are different claims; pick one');
      }

      function checkRange(key, lo, hi) {
        var v = f[key];
        if (v == null) return false;
        if (!Array.isArray(v) || v.length !== 2 || !isNum(v[0]) || !isNum(v[1])) {
          errors.push(fat + ' ' + key + ' must be [low, high] numbers');
          return false;
        }
        if (v[0] > v[1]) errors.push(fat + ' ' + key + ' low ' + v[0] + ' is above high ' + v[1]);
        if (v[0] < lo || v[1] > hi) {
          warnings.push(fat + ' ' + key + ' [' + v[0] + ', ' + v[1] + '] is outside the expected ' +
            lo + '–' + hi + ' range');
        }
        return true;
      }
      var hasRr = checkRange('rr', 0, 100);
      var hasAbs = checkRange('absoluteLifetime', 0, 100);

      // an RR that disagrees with its stated direction is almost always a typo
      if (hasRr && f.direction) {
        if (f.direction === 'increases' && f.rr[1] < 1) {
          errors.push(fat + ' direction is "increases" but rr [' + f.rr[0] + ', ' + f.rr[1] + '] is below 1');
        }
        if (f.direction === 'decreases' && f.rr[0] > 1) {
          errors.push(fat + ' direction is "decreases" but rr [' + f.rr[0] + ', ' + f.rr[1] + '] is above 1');
        }
      }

      if (hasRr && !isNum((ds.baseline || {}).lifetimeRisk)) {
        warnings.push(fat + ' has rr but the dataset has no baseline.lifetimeRisk — the relative ' +
          'risk will render without an absolute conversion, which is the failure mode this field exists to prevent');
      }

      if (!isStr(f.magnitude) && !hasRr && !hasAbs) {
        warnings.push(fat + ' has neither a magnitude string nor a numeric effect size — it will ' +
          'render as if every factor mattered equally');
      }

      /* scope guards the conversion: an RR measured against one subtype must never be
         multiplied by the whole-disease baseline. */
      if (f.scope != null && f.scope !== 'overall' && !byId[f.scope]) {
        errors.push(fat + ' scope "' + f.scope + '" is neither "overall" nor a known node id');
      }
      if (f.scope == null && (hasRr || hasAbs)) {
        warnings.push(fat + ' has a numeric effect size but no scope — defaulting to "overall", ' +
          'which converts it against the whole-disease baseline');
      }

      /* `outcome` is the second guard on the conversion, and it exists because
         `scope` cannot catch this one. `scope` asks "measured against which
         subtype"; `outcome` asks "a multiplier on WHAT". baseline.lifetimeRisk
         is a risk of being DIAGNOSED, so only an incidence multiplier may be
         multiplied by it. Black/African ancestry in prostate is ~1.67x the
         incidence and ~2.06x the mortality — both are true, both are scoped to
         the whole disease, and converting the second would manufacture a
         lifetime risk of diagnosis out of a death rate. */
      if (f.outcome != null && OUTCOMES.indexOf(f.outcome) === -1) {
        errors.push(fat + ' outcome "' + f.outcome + '" not one of ' + OUTCOMES.join('/'));
      }
      if (f.outcome === 'mortality' && hasAbs) {
        errors.push(fat + ' is outcome:"mortality" but carries absoluteLifetime, which is a ' +
          'lifetime risk of DIAGNOSIS — the two describe different events, so one of them is wrong');
      }
      if (f.outcome === 'mortality' && !isStr(f.magnitude)) {
        warnings.push(fat + ' is outcome:"mortality" and has no magnitude string — it is not ' +
          'converted, so the magnitude is the only figure the reader will see');
      }

      if (f.stratum != null && !strataLabels[f.stratum]) {
        errors.push(fat + ' stratum "' + f.stratum + '" does not match any baseline.strata label');
      }

      /* `referent` is the third guard. `scope` asks against which subtype and
         `outcome` asks a multiplier on what; this asks relative to WHOM. Lung
         forced it: current smokers carry a relative risk in the twenties
         against never smokers, and the population baseline is mostly made of
         smokers. Multiply the two and the exposure is counted twice — in one
         Canadian source, 13.2 × 9.6% = 127%, which is not a probability. */
      if (f.referent != null && REFERENTS.indexOf(f.referent) === -1) {
        errors.push(fat + ' referent "' + f.referent + '" not one of ' + REFERENTS.join('/'));
      }
      var convertible = hasRr && (f.scope == null || f.scope === 'overall') &&
                        f.outcome !== 'mortality' && f.referent !== 'other';
      if (convertible && f.referent == null) {
        warnings.push(fat + ' has a convertible rr but no referent — say whether it is relative to ' +
          'the whole population, to the unexposed, or to some other group, because the ' +
          'conversion means something different for each');
      }
      var baseRisk = f.stratum != null ? strataRisk[f.stratum] : (ds.baseline || {}).lifetimeRisk;
      if (convertible && isNum(baseRisk) && f.rr[1] * baseRisk > 100) {
        var product = Math.round(f.rr[1] * baseRisk * 10) / 10;
        errors.push(fat + ' rr ' + f.rr[1] + ' × ' +
          (f.stratum != null ? 'stratum "' + f.stratum + '"' : 'baseline') + ' ' + baseRisk +
          '% = ' + product + '%, which is not a probability. ' +
          (f.referent === 'unexposed' && f.stratum == null
            ? 'A relative risk measured against the unexposed has to convert against a ' +
              'baseline.strata entry for the unexposed group, because the population baseline ' +
              'already contains the exposed and multiplying counts them twice.'
            : 'The multiplier and the denominator cannot both describe the same people.'));
      }

      /* A citation that resolves to nothing is worse than an absent one: it
         looks checked. Accepts a reference id, or free text for a legacy
         inline citation. */
      if (f.source != null) {
        var fbad = unknownRefIds(f.source);
        if (fbad.length) {
          errors.push(fat + ' source "' + fbad[0] + '" is not a known references[] id');
        }
      } else {
        warnings.push(fat + ' has no source — this figure appears in the public-facing ' +
          'risk view with nothing behind it');
      }

      (f.affects || []).forEach(function (id, ai) {
        if (!byId[id]) errors.push(fat + ' affects[' + ai + '] points at unknown node "' + id + '"');
      });
      if (!(f.affects || []).length) {
        warnings.push(fat + ' affects no nodes — it will not link Book I to the subtype taxonomy');
      }
    });

    // ---- profile (Layer 0) ---------------------------------------------
    /* Runs after nodes so goTo can be resolved. The link targets are the whole
       point of the block — a primer term that lands nowhere is worse than one
       that is absent, because the reader clicks and nothing happens. */
    var LENS_IDS = { start: 1, risk: 1, subtypes: 1, targets: 1, evidence: 1 };
    if (ds.profile != null) {
      var prof = ds.profile;
      if (typeof prof !== 'object') {
        errors.push('dataset.profile must be an object');
      } else {
        if (!isStr(prof.definition)) {
          warnings.push('profile has no definition — the front page will open with no ' +
            'statement of what this cancer is');
        }
        if (prof.world && !isNum(prof.world.newCasesPerYear) && !isNum(prof.world.deathsPerYear)) {
          warnings.push('profile.world carries neither newCasesPerYear nor deathsPerYear');
        }
        if (prof.world && !prof.world.note) {
          warnings.push('profile.world has no note — modelled global estimates and registry ' +
            'counts sit side by side and must not read as comparable');
        }

        (prof.reportTerms || []).forEach(function (t, i) {
          var pat = 'profile.reportTerms[' + i + ']';
          if (!isStr(t.term)) errors.push(pat + ' needs a term');
          if (!isStr(t.plain)) warnings.push(pat + ' "' + (t.term || '?') + '" has no plain-language gloss');

          if (t.goTo != null && !byId[t.goTo]) {
            errors.push(pat + ' goTo "' + t.goTo + '" is not a known node id');
          }
          if (t.goToLens != null && !LENS_IDS[t.goToLens]) {
            errors.push(pat + ' goToLens "' + t.goToLens + '" is not a known lens');
          }
          if (t.goTo == null && t.goToLens == null) {
            warnings.push(pat + ' "' + (t.term || '?') + '" links nowhere — it explains a word ' +
              'but does not connect it to the explorer');
          }
          if (t.marker != null && !markerIds[t.marker]) {
            errors.push(pat + ' marker "' + t.marker + '" is not declared in dataset.markers');
          }
          if (t.axis != null && !axisIds[t.axis]) {
            errors.push(pat + ' axis "' + t.axis + '" is not a known axis id');
          }
        });
      }
    }

    /* ---- inline definition markers ------------------------------------

       Prose can mark a word as `{{IHC}}` and the renderer turns it into a
       clickable definition. If the glossary has no such entry the renderer
       falls back to plain text — correct behaviour, and invisible, which is
       exactly how a whole page of dead markers would accumulate unnoticed.
       So they are checked here. Skipped entirely when the glossary has not
       been loaded (Node runs, or a page that drops the script). */
    var G = global.Glossary;
    if (G && typeof G.lookup === 'function') {
      var missing = {}, seenPath = {};
      (function walk(v, path) {
        if (typeof v === 'string') {
          var m, re = /\{\{([^}|]+)(?:\|[^}]*)?\}\}/g;
          while ((m = re.exec(v))) {
            var key = m[1].trim();
            /* Resolve against THIS dataset's vocabulary, not whichever one is
               on screen. Boot validates every registered dataset in one loop,
               so a bare lookup() would check breast's markers against breast's
               glossary and prostate's against breast's too. */
            if (G.lookup(key, ds)) continue;
            if (!missing[key]) { missing[key] = true; seenPath[key] = path; }
          }
          return;
        }
        if (!v || typeof v !== 'object') return;
        if (Object.prototype.toString.call(v) === '[object Array]') {
          for (var i = 0; i < v.length; i++) walk(v[i], path + '[' + i + ']');
          return;
        }
        for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) walk(v[k], path + '.' + k);
      })(ds, 'dataset');

      Object.keys(missing).forEach(function (key) {
        warnings.push('inline definition marker {{' + key + '}} at ' + seenPath[key] +
          ' has no glossary entry — it will render as plain text, so the reader gets ' +
          'no definition and nothing says so');
      });
    }

    // ---- glossary overrides --------------------------------------------
    /* A dataset may replace an engine term outright (it supplies `d`) or just
       restate the "why it appears here" line (it does not). Both are valid;
       what is not valid is an entry with neither a definition of its own nor
       an engine entry to inherit one from, which renders as a heading with no
       meaning under it. */
    /* Every check below compares the dataset's overrides against the ENGINE's
       terms and groups. Without glossary.js loaded there is nothing to compare
       against, and the checks do not degrade — they invert, reporting every
       inherited term as undefined and every engine group as unknown. That is
       how the Node CLI runs (tools/validate.mjs loads no glossary), so a clean
       dataset produced 34 phantom errors there. Skip, and say why. */
    if (ds.glossary && !(G && G.ENGINE_TERMS && G.GROUPS)) {
      warnings.push('glossary overrides not checked — js/glossary.js is not loaded, so there is ' +
        'no engine vocabulary to check them against. Load it, or run the validator in the browser.');
    } else if (ds.glossary) {
      var gl = ds.glossary;
      var engineTerms = {};
      G.ENGINE_TERMS.forEach(function (e) { engineTerms[String(e.t).toLowerCase()] = e; });
      var groupIds = {};
      G.GROUPS.forEach(function (g) { groupIds[g.id] = true; });

      (gl.groups || []).forEach(function (g, i) {
        if (!g || !isStr(g.id)) errors.push('glossary.groups[' + i + '] needs an id');
        else {
          groupIds[g.id] = true;
          if (!isStr(g.label)) warnings.push('glossary group "' + g.id + '" has no label');
        }
      });

      var seenTerm = {};
      (gl.terms || []).forEach(function (e, i) {
        var where = 'glossary.terms[' + i + ']';
        if (!e || !isStr(e.t)) { errors.push(where + ' needs a `t` (the term itself)'); return; }
        var key = e.t.toLowerCase();
        if (seenTerm[key]) errors.push(where + ' "' + e.t + '" is declared twice');
        seenTerm[key] = true;

        var inherits = !isStr(e.d);
        if (inherits && !engineTerms[key]) {
          errors.push(where + ' "' + e.t + '" has no `d` and no engine term of that name to ' +
            'inherit one from — it would render as a term with no definition');
        }
        /* A brand-new term with no group never reaches the glossary page: the
           page is built group by group, so an unplaced term is invisible. */
        if (!inherits && !engineTerms[key] && !isStr(e.g)) {
          errors.push(where + ' "' + e.t + '" is a new term with no `g` — it would be ' +
            'defined but never shown, because the glossary page renders group by group');
        }
        if (isStr(e.g) && !groupIds[e.g]) {
          errors.push(where + ' "' + e.t + '" is in unknown group "' + e.g +
            '" — declare it in glossary.groups or use an engine group');
        }
        if (!isStr(e.w)) {
          warnings.push(where + ' "' + e.t + '" has no `w` — every entry is supposed to say ' +
            'where in this app the term appears and what it changes');
        }
      });
    }

    // ---- targets (curated layer) ---------------------------------------
    /* Deliberately NOT checked against the generated overlay: the overlay is
       optional and may be absent, and a curated note about a gene the pipeline
       has not fetched yet is a to-do, not an error. */
    var targetGenes = {};
    (ds.targets || []).forEach(function (t, i) {
      if (!isStr(t.gene)) { errors.push('targets[' + i + '].gene is required'); return; }
      if (targetGenes[t.gene]) errors.push('duplicate target entry for gene "' + t.gene + '"');
      targetGenes[t.gene] = true;
      /* A curated target note is the densest prose in the app — it is where
         alteration frequencies, screening-failure rates and approval dates get
         stated in a sentence. Nothing vouches for a targets[] entry the way a
         node's sources[] vouches for a node, so `vouched` is false here: a
         figure in one of these has to name its own source or it is flagged. */
      recordClaim('target "' + t.gene + '" summary', t.summary, t.source, 'target', false);
      recordClaim('target "' + t.gene + '" caveat', t.caveat, t.caveatSource, 'target', false);
      recordClaim('target "' + t.gene + '" watch', t.watch, t.watchSource, 'target', false);
      if (!isStr(t.summary) && !isStr(t.caveat)) {
        warnings.push('target "' + t.gene + '" has neither a summary nor a caveat — it adds ' +
          'nothing over the generated rationale');
      }
      if (t.excludedBy != null) {
        if (Object.prototype.toString.call(t.excludedBy) !== '[object Array]') {
          errors.push('target "' + t.gene + '" excludedBy must be an array');
        } else {
          t.excludedBy.forEach(function (x, xi) {
            checkExclusion('target "' + t.gene + '" excludedBy[' + xi + ']', x);
          });
        }
      }
      if (t.germline != null) {
        if (Object.prototype.toString.call(t.germline) !== '[object Array]') {
          errors.push('target "' + t.gene + '" germline must be an array');
        } else {
          t.germline.forEach(function (x, xi) {
            checkGermline('target "' + t.gene + '" germline[' + xi + ']', x);
          });
        }
      }
    });

    /* The overlay is optional, but when it is attached its `basis` and the
       curated entry have to agree on the one thing the landscape reads. A gene
       the pipeline forgets to classify falls back to `genomic`, which would plot
       a target chosen by the patient's HLA type at its tumour alteration
       frequency. The renderer refuses to plot it either way; this says why. */
    var overlayGenes = (ds.targetData || {}).genes || {};
    Object.keys(overlayGenes).forEach(function (gene) {
      var rec = overlayGenes[gene] || {};
      var cur = null;
      (ds.targets || []).forEach(function (t) { if (t.gene === gene) cur = t; });
      var curated = !!(cur && cur.germline && cur.germline.length);
      if (curated && rec.basis === 'genomic') {
        warnings.push('target "' + gene + '" carries a germline entry but is filed as basis "genomic" in the ' +
          'targets overlay — the pipeline would read its tumour alteration frequency as selection; set its ' +
          'basis in pipeline/cxp/targets.py');
      }
      if (!curated && rec.basis === 'germline') {
        warnings.push('target "' + gene + '" has basis "germline" in the targets overlay but no targets[].germline ' +
          'entry — its card cannot say which test, for which agents, or how many patients test positive');
      }
    });

    /* excludedBy — a target whose drug is ruled OUT by an alteration. EGFR in
       colorectal cancer is the case that forced it: cetuximab and panitumumab
       are not indicated for RAS-mutant disease, so what decides eligibility is
       the absence of a change in a different gene. Plotted on its own
       alteration frequency, EGFR would read as rarely broken and heavily drugged.

       The exclusion names NODES rather than typing a share, so the figure the
       renderer prints is the taxonomy's own prevalence and cannot drift from
       it. It names AGENTS because it belongs to an indication, not to the gene:
       the panitumumab label rules out RAS-mutant disease except with sotorasib
       for KRAS G12C, which is what `except` carries. */
    function isAncestor(anc, id) {
      var n = byId[id], hops = 0;
      while (n && n.parent != null && hops++ < 64) {
        if (n.parent === anc) return true;
        n = byId[n.parent];
      }
      return false;
    }
    /* The nodes a target entry names, checked the same way for excludedBy and
       germline: each exists, all sit on one partition axis, none inside
       another. `into` and `cannot` finish the two sentences that differ. */
    function checkNamedNodes(where, ids, into, cannot) {
      var known = ids.filter(function (id) {
        if (!isStr(id) || !byId[id]) { errors.push(where + ' points at unknown node "' + id + '"'); return false; }
        return true;
      });
      var axesSeen = {};
      known.forEach(function (id) { axesSeen[byId[id].axis] = true; });
      var axisIds = Object.keys(axesSeen);
      if (axisIds.length > 1) {
        errors.push(where + ' names nodes on different axes (' + axisIds.join(', ') + ') — their ' +
          'shares are of different populations and cannot be added into ' + into);
      }
      known.forEach(function (a) {
        known.forEach(function (b) {
          if (a !== b && isAncestor(a, b)) {
            errors.push(where + ' lists "' + b + '" inside "' + a + '" — its tumours would be counted twice');
          }
        });
      });
      if (axisIds.length === 1) {
        var axis = null;
        ds.axes.forEach(function (ax) { if (ax.id === axisIds[0]) axis = ax; });
        if (axis && axis.partition === false) {
          errors.push(where + ' names nodes on axis "' + axis.id + '", which is not a partition — its ' +
            'nodes are compared cohorts, so they cannot ' + cannot);
        }
      }
      return known;
    }

    function sourceError(where, src, why) {
      var unknownRefs = unknownRefIds(src);
      errors.push(unknownRefs.length
        ? where + ' source ' + JSON.stringify(unknownRefs) + ' is not a known references[] id'
        : where + ' needs a source — ' + why);
    }

    /* germline — a target whose drugs are chosen by a test of the PATIENT.
       Tebentafusp is indicated for HLA-A*02:01-positive uveal melanoma, and an
       HLA type is inherited, not carried by the tumour, so no alteration
       frequency can stand in for who is eligible. The share, when there is
       one, is counted people and the population they were counted in. A typed
       percent is refused: the figure most easily found for an HLA allele is its
       allele frequency, which counts chromosomes, not people. */
    function checkGermline(where, x) {
      if (!x || typeof x !== 'object') { errors.push(where + ' must be an object'); return; }
      function isCount(v) { return typeof v === 'number' && isFinite(v) && v >= 0 && Math.floor(v) === v; }
      if (!isStr(x.test)) {
        errors.push(where + ' needs `test` — what is tested in the patient, so no tumour result is ' +
          'taken for it');
      }
      if (!isStr(x.agents)) {
        errors.push(where + ' needs `agents` — a germline test belongs to an indication, not to the gene');
      }
      if (x.nodes != null) {
        if (Object.prototype.toString.call(x.nodes) !== '[object Array]' || !x.nodes.length) {
          errors.push(where + ' nodes must be a non-empty array when given');
        } else {
          checkNamedNodes(where, x.nodes, 'one indication', 'say where a drug is indicated');
        }
      }
      if (!sourceOk(x.source)) sourceError(where, x.source, 'it states who may receive a drug');
      if (x.share != null) {
        var s = x.share;
        if (!s || typeof s !== 'object') {
          errors.push(where + '.share must be an object');
        } else {
          if (s.n == null && s.of == null) {
            errors.push(where + '.share is counted, not typed: give n (positive) and of (tested) — a ' +
              'typed percent cannot show whether it counts people or alleles');
          } else if (!isCount(s.n) || !isCount(s.of) || s.of === 0 || s.n > s.of) {
            errors.push(where + '.share n and of must be whole numbers of people, n no larger than of ' +
              '(got ' + s.n + ' of ' + s.of + ')');
          }
          if (!isStr(s.population)) {
            errors.push(where + ' share needs `population` — who was tested; a share of one group is ' +
              'not a share of another');
          }
          if (!sourceOk(s.source)) sourceError(where + ' share', s.source, 'it says how many patients test positive');
          if (isCount(s.n) && isCount(s.of)) {
            recordClaim(where + ' share', s.n + ' of ' + s.of, s.source, 'target', false);
          }
        }
      }
      recordClaim(where + ' note', x.note, x.noteSource || x.source, 'target', false);
    }

    function checkExclusion(where, x) {
      if (!x || typeof x !== 'object') { errors.push(where + ' must be an object'); return; }
      var ids = x.nodes;
      if (Object.prototype.toString.call(ids) !== '[object Array]' || !ids.length) {
        errors.push(where + ' needs nodes[] — the groups the indication rules out, so the share ' +
          'is read from the taxonomy rather than typed');
        return;
      }
      var known = checkNamedNodes(where, ids, 'one exclusion', 'size who a drug is ruled out for');
      known.forEach(function (id) {
        if (!isNum(byId[id].prevalence)) {
          warnings.push(where + ' node "' + id + '" has no prevalence, so the exclusion renders ' +
            'without saying how many tumours it rules out');
        }
      });
      if (!isStr(x.agents)) {
        errors.push(where + ' needs `agents` — an exclusion belongs to an indication, not to the ' +
          'gene, and one gene can be ruled in and out by different agents');
      }
      if (!sourceOk(x.source)) {
        var unknownRefs = unknownRefIds(x.source);
        errors.push(unknownRefs.length
          ? where + ' source ' + JSON.stringify(unknownRefs) + ' is not a known references[] id'
          : where + ' needs a source — it states who may not receive a drug');
      }
      if (x.except != null) {
        var ex = x.except;
        var exIds = ex && Object.prototype.toString.call(ex.nodes) === '[object Array]' ? ex.nodes : [];
        if (!exIds.length) {
          errors.push(where + '.except needs nodes[] — the tumours the exception re-admits');
        }
        exIds.forEach(function (id) {
          if (!isStr(id) || !byId[id]) { errors.push(where + '.except points at unknown node "' + id + '"'); return; }
          var inside = known.some(function (k) { return isAncestor(k, id); });
          if (!inside) {
            errors.push(where + '.except node "' + id + '" is not inside the excluded nodes — an ' +
              'exception can only re-admit tumours the exclusion removed');
          }
        });
        if (!ex || !isStr(ex.agents)) {
          errors.push(where + '.except needs `agents` — which indication re-admits them');
        }
      }
      recordClaim(where + ' note', x.note, x.noteSource || x.source, 'target', false);
    }

    // ---- detection -----------------------------------------------------
    if (ds.detection != null) {
      var det = ds.detection;
      if (typeof det !== 'object') {
        errors.push('dataset.detection must be an object');
      } else {
        var stages = det.stageOutcomes || [];
        stages.forEach(function (s, si) {
          var sat = 'detection.stageOutcomes[' + si + ']';
          if (!isStr(s.stage)) errors.push(sat + ' needs a stage label');
          if (s.share != null && !isNum(s.share)) errors.push(sat + ' share must be a number (percent)');
          if (s.fiveYear != null && !isNum(s.fiveYear)) errors.push(sat + ' fiveYear must be a number (percent)');
          if (s.tenYear != null && !isNum(s.tenYear)) errors.push(sat + ' tenYear must be a number (percent)');
          if (isNum(s.tenYear) && isNum(s.fiveYear) && s.tenYear > s.fiveYear + 0.5) {
            warnings.push(sat + ' tenYear (' + s.tenYear + '%) is above fiveYear (' + s.fiveYear +
              '%) — possible, since these are RELATIVE survival, but rare enough to be worth ' +
              're-reading the source');
          }
        });
        var withShare = stages.filter(function (s) { return isNum(s.share); });
        if (withShare.length > 1) {
          var stageSum = withShare.reduce(function (t, s) { return t + s.share; }, 0);
          if (Math.abs(stageSum - 100) > 5) {
            warnings.push('detection.stageOutcomes shares sum to ' + stageSum.toFixed(1) +
              '%, expected ~100% — stage at diagnosis is a partition of all cases (tolerance ±5)');
          }
        }

        /* The window can be too short to separate two stages, and when it is,
           the table says something true that reads as something false. Prostate
           reports 100.0% five-year relative survival for BOTH localised and
           regional disease — not because the node status does not matter, but
           because five years is far inside the horizon on which this cancer
           kills. A reader concludes that spread to the lymph nodes is harmless.

           So: when the two best-surviving stages are indistinguishable at the
           stated horizon, the dataset has to say what the horizon is. */
        var five = stages.filter(function (s) { return isNum(s.fiveYear); })
                         .sort(function (a, b) { return b.fiveYear - a.fiveYear; });
        if (five.length > 1 && (five[0].fiveYear - five[1].fiveYear) < 1 && !isStr(det.horizonNote)) {
          warnings.push('detection: "' + five[0].stage + '" and "' + five[1].stage + '" both report ' +
            'about ' + five[0].fiveYear + '% five-year survival, so the table cannot tell them ' +
            'apart — add detection.horizonNote saying what the five-year window does and does ' +
            'not capture, or the reader concludes the difference does not matter');
        }

        /* detection.sources[] stands behind the whole block, so a modality
           that leans on it is vouched for rather than uncited — but the count
           below still separates "cited here" from "covered by the block", so
           the difference stays visible instead of being rounded away. */
        var detVouched = (det.sources || []).length > 0;

        (det.stageOutcomes || []).forEach(function (st, si) {
          recordClaim('detection.stageOutcomes[' + si + '] "' + (st.stage || '?') + '"',
                      st.note, st.source, 'stage', detVouched);
        });

        (det.modalities || []).forEach(function (m, mi) {
          var mat = 'detection.modalities[' + mi + ']' + (isStr(m.name) ? ' "' + m.name + '"' : '');
          if (!isStr(m.name)) errors.push('detection.modalities[' + mi + '] needs a name');
          recordClaim(mat + ' harms', m.harms, m.harmsSource || m.source, 'modality', detVouched);
          recordClaim(mat + ' catches', m.catches, m.catchesSource || m.source, 'modality', detVouched);
          recordClaim(mat + ' misses', m.misses, m.missesSource || m.source, 'modality', detVouched);
          recordClaim(mat + ' sensitivity', m.sensitivity, m.sensitivitySource || m.source,
                      'modality', detVouched);
          recordClaim(mat + ' interval', m.interval, m.intervalSource || m.source,
                      'modality', detVouched);
          /* A note is a claim like any other once it states a figure or a date —
             colorectal's blood-test note names an approval date. */
          recordClaim(mat + ' note', m.note, m.noteSource || m.source, 'modality', detVouched);
          /* catches/misses describe what a test FINDS. Neither can hold "1 in 6
             men get a false positive" or "1% of biopsies end in hospital". A
             population screening test presented with a benefit and no cost is
             the single most one-sided thing this app could render. */
          if (/screen/i.test(m.role || '') && !isStr(m.harms)) {
            warnings.push(mat + ' is a screening modality with no `harms` — it states what the ' +
              'test finds and misses but nothing it costs, which reads as a recommendation');
          }
        });

        // ---- tradeoff: benefit and harm on one denominator ----------------
        if (det.tradeoff != null) {
          var tr = det.tradeoff;
          if (typeof tr !== 'object') {
            errors.push('detection.tradeoff must be an object');
          } else {
            /* The denominator is the whole point. "8 deaths averted" and "1,376
               false positives" are only comparable because both are per 1,000
               women screened biennially from 40 to 74 over a lifetime. Printed
               once, above both columns, or the block is worse than nothing. */
            if (!isStr(tr.basis)) {
              errors.push('detection.tradeoff needs a `basis` — the denominator every row shares. ' +
                'A benefit and a harm on different denominators is exactly the comparison this ' +
                'block exists to prevent');
            }
            var nBen = 0, nHarm = 0;
            (tr.rows || []).forEach(function (r, ri) {
              var rat = 'detection.tradeoff.rows[' + ri + ']';
              if (!r || TRADEOFF_KINDS.indexOf(r.kind) === -1) {
                errors.push(rat + ' needs kind:"benefit" or kind:"harm"');
                return;
              }
              if (r.kind === 'benefit') nBen++; else nHarm++;
              if (!isStr(r.label)) errors.push(rat + ' needs a label');
              if (r.value == null || (!isStr(r.value) && !isNum(r.value))) {
                errors.push(rat + ' needs a value');
              }
            });
            if (nBen && !nHarm) {
              errors.push('detection.tradeoff lists ' + nBen + ' benefit(s) and no harms. ' +
                'Screening always costs something; a block that states only the upside is an ' +
                'advertisement');
            }
            if (nHarm && !nBen) {
              warnings.push('detection.tradeoff lists harms but no benefit — if the evidence ' +
                'shows no benefit, say so as a row rather than by omission');
            }
            var eff = tr.effect;
            if (eff) {
              if (eff.ci != null) {
                if (!Array.isArray(eff.ci) || eff.ci.length !== 2 || !isNum(eff.ci[0]) || !isNum(eff.ci[1])) {
                  errors.push('detection.tradeoff.effect.ci must be [low, high] numbers');
                } else {
                  if (eff.ci[0] > eff.ci[1]) {
                    errors.push('detection.tradeoff.effect.ci low ' + eff.ci[0] + ' is above high ' + eff.ci[1]);
                  }
                  if (isNum(eff.point) && (eff.point < eff.ci[0] || eff.point > eff.ci[1])) {
                    errors.push('detection.tradeoff.effect point ' + eff.point +
                      ' lies outside its own confidence interval');
                  }
                }
              }
              if (!isStr(eff.followUp)) {
                warnings.push('detection.tradeoff.effect has no followUp — a mortality rate ratio ' +
                  'means little without the length of follow-up behind it');
              }
            }
          }
        }
      }
    }

    return {
      errors: errors,
      warnings: warnings,
      stats: {
        nodes: ds.nodes.length,
        axes: ds.axes.length,
        markers: (ds.markers || []).length,
        factors: (ds.factors || []).length,
        references: (ds.references || []).length,
        factorsCited: (ds.factors || []).filter(function (f) { return f.source; }).length,
        targets: (ds.targets || []).length,
        reportTerms: ((ds.profile || {}).reportTerms || []).length,
        stages: ((ds.detection || {}).stageOutcomes || []).length,
        modalities: ((ds.detection || {}).modalities || []).length,
        relations: ds.nodes.reduce(function (s, n) { return s + ((n.related || []).length); }, 0),
        triggers: ds.nodes.reduce(function (s, n) { return s + ((n.triggers || []).length); }, 0),
        drivers: ds.nodes.reduce(function (s, n) { return s + (((n.molecular || {}).drivers || []).length); }, 0),
        /* How much of this dataset a reader can actually check. Only claims
           carrying a figure are counted — prose judgement is not a citation
           gap. Printed as "cited/total" per kind so the number moves as the
           curation does. */
        checkable: (function () {
          var out = {}, total = 0, cited = 0;
          Object.keys(numericTotals).forEach(function (k) {
            var t = numericTotals[k], c = numericCited[k] || 0;
            out[k] = c + '/' + t;
            total += t; cited += c;
          });
          out.all = cited + '/' + total;
          return out;
        })()
      }
    };
  }

  /* Pretty-print a result. Returns true when clean of errors. */
  function report(name, res, log) {
    log = log || console;
    var ok = res.errors.length === 0;
    var head = '[validate] ' + name + ': ' +
      res.errors.length + ' error(s), ' + res.warnings.length + ' warning(s)';
    if (ok) log.log(head); else log.error(head);
    res.errors.forEach(function (e) { log.error('  ERROR   ' + e); });
    res.warnings.forEach(function (w) { log.warn('  WARNING ' + w); });
    if (res.stats && res.stats.nodes) {
      log.log('  stats   ' + JSON.stringify(res.stats));
    }
    return ok;
  }

  var api = { dataset: dataset, report: report, DIRECTIONS: DIRECTIONS, EVIDENCE: EVIDENCE, REL_KINDS: REL_KINDS };

  global.Validate = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
