# Re-derives what each chart DRAWS from the data, and checks it against what the
# chart CLAIMS. Reads the dataset by executing the JS object literal shape via a
# tolerant parser -- the data files are JS, not JSON, so json.loads is out.
import io, os, re, math, json, subprocess, sys

# The project root, wherever it is checked out (it was a hardcoded C:\ path).
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def strip_comments(s):
    """Remove // and /* */ while respecting string literals. Must run BEFORE
       brace matching: these files carry comments containing both braces and
       apostrophes, either of which desynchronises a naive scanner."""
    out, i, n = [], 0, len(s)
    while i < n:
        c = s[i]
        if c == '/' and i+1 < n and s[i+1] == '*':
            i = s.index('*/', i+2) + 2; continue
        if c == '/' and i+1 < n and s[i+1] == '/':
            j = s.find('\n', i); i = n if j < 0 else j; continue
        if c in '"\'':
            q, j = c, i+1
            while j < n:
                if s[j] == '\\': j += 2; continue
                if s[j] == q: break
                j += 1
            out.append(s[i:j+1]); i = j+1; continue
        out.append(c); i += 1
    return ''.join(out)


def load_js_object(path, anchor):
    """Extract a balanced {...} starting at the first '{' after `anchor`."""
    s = strip_comments(io.open(path, encoding='utf-8').read())
    i = s.index(anchor)
    start = s.index('{', i)
    depth, instr, esc, q = 0, False, False, ''
    for k in range(start, len(s)):
        c = s[k]
        if instr:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == q: instr = False
            continue
        if c in '"\'':
            instr, q = True, c
        elif c == '{': depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return s[start:k+1]
    raise ValueError('unbalanced')

# --- breast.js via a tiny JS-literal -> python evaluator -------------------
# Simplest reliable route: strip comments, join string concatenations, quote
# bare keys, then json.loads.
def js_to_json(src):
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c == '/' and i+1 < n and src[i+1] == '*':
            j = src.index('*/', i+2); i = j+2; continue
        if c == '/' and i+1 < n and src[i+1] == '/':
            j = src.find('\n', i)
            i = n if j < 0 else j; continue
        if c in '"\'':
            # Read a string AND any `+ "..."` continuations, merging as we go.
            # Doing it here rather than with a regex afterwards matters: a naive
            # `"\s*\+\s*"` pass eats the literal value "+" in { "ER": "+" }.
            buf = ['"']
            while True:
                q, j = src[i], i+1
                while j < n:
                    d = src[j]
                    if d == '\\':
                        nxt = src[j+1]
                        buf.append("'" if nxt == "'" else d + nxt)
                        j += 2; continue
                    if d == q: break
                    buf.append('\\"' if d == '"' else d)
                    j += 1
                i = j + 1
                m = re.match(r'\s*\+\s*(?=["\'])', src[i:])
                if not m: break
                i += m.end()
            buf.append('"')
            out.append(''.join(buf)); continue
        out.append(c); i += 1
    s = ''.join(out)
    s = re.sub(r'([{,]\s*)([A-Za-z_$][\w$]*)\s*:', r'\1"\2":', s)
    s = re.sub(r',(\s*[}\]])', r'\1', s)                 # trailing commas
    return s

ds = json.loads(js_to_json(load_js_object(os.path.join(ROOT, 'data', 'breast.js'), 'register(')))
tg = json.loads(js_to_json(load_js_object(
    os.path.join(ROOT, 'data', 'breast.targets.js'), "CancerExplorerTargets['breast']")))
fx = json.loads(js_to_json(load_js_object(
    os.path.join(ROOT, 'data', 'breast.facts.js'), "CancerExplorerFacts['breast']")))

nodes = ds['nodes']
by_id = {n['id']: n for n in nodes}
kids  = {}
for n in nodes:
    kids.setdefault(n.get('parent'), []).append(n)

issues, notes = [], []
def bad(chart, msg): issues.append((chart, msg))
def ok(chart, msg): notes.append((chart, msg))

# =========================================================================
print('=' * 74)
print('1. TREEMAP  — claim: "Area is proportional to share of cases"')
print('=' * 74)
for ax in ds['axes']:
    roots = [n for n in nodes if n['axis'] == ax['id'] and n.get('parent') is None]
    for r in roots:
        ch = [c for c in kids.get(r['id'], []) if c['axis'] == ax['id']]
        tot = sum(c.get('prevalence', 0) for c in ch)
        flag = '' if abs(tot - r.get('prevalence', 100)) < 0.6 else '  <-- MISMATCH'
        print('  %-11s children sum %6.1f  vs parent %6.1f%s'
              % (ax['id'], tot, r.get('prevalence', 100), flag))
        if flag: bad('treemap', '%s children sum %.1f != parent %.1f' % (ax['id'], tot, r.get('prevalence')))
# nested inset distortion
W, H = 960.0, 560.0
print('\n  Nested cells are drawn inside the parent MINUS a 26px header and 4px inset.')
for ax in ds['axes']:
    r = [n for n in nodes if n['axis'] == ax['id'] and n.get('parent') is None][0]
    ch = [c for c in kids.get(r['id'], []) if c['axis'] == ax['id']]
    tot = sum(c.get('prevalence', 0) for c in ch) or 100.0
    for c in ch:
        gk = [g for g in kids.get(c['id'], []) if g['axis'] == ax['id']]
        if not gk: continue
        area = (c.get('prevalence', 0)/tot) * W * H
        side = math.sqrt(area)                     # approx square cell
        cw, chh = side, side
        if not (cw > 132 and chh > 78): continue
        inner = (cw - 8) * (chh - 26 - 4)
        loss = 1 - inner/area
        print('    %-22s parent %5.1f%%  nested area lost to header: %4.1f%%'
              % (c['id'], c.get('prevalence', 0), loss*100))
        if loss > 0.18:
            bad('treemap', 'nested cells under %s are %.0f%% under-sized vs their true share'
                % (c['id'], loss*100))

# =========================================================================
print()
print('=' * 74)
print('2. TREE  — claim: "Circle size is proportional to share of cases"')
print('=' * 74)
def rad(p): return max(3.5, math.sqrt(p) * 1.7)
prevs = sorted({round(n['prevalence'], 2) for n in nodes if isinstance(n.get('prevalence'), (int, float))})
print('  %-8s %-7s %-9s %-12s' % ('share', 'radius', 'area', 'area/share'))
ratios = []
for p in prevs:
    r = rad(p); a = math.pi * r * r
    ratios.append(a / p)
    print('  %-8.2f %-7.2f %-9.0f %-12.1f' % (p, r, a, a/p))
spread = max(ratios) / min(ratios)
# Separate "the scale is wrong" from "the disclosed floor is binding". Only the
# first is a defect; the second is a stated departure and must be stated.
FLOOR, K = 3.5, 1.7
exact_above = (FLOOR / K) ** 2
free = [math.pi*rad(p)**2/p for p in prevs if p > exact_above]
nfloor = len([p for p in prevs if p <= exact_above])
print('\n  area-per-percent varies %.1fx overall' % spread)
print('  ABOVE the %.2f%% floor: varies %.4fx  (%d of %d values)'
      % (exact_above, max(free)/min(free), len(free), len(prevs)))
print('  AT the floor (disclosed in the legend): %d values, largest overstatement %.1fx'
      % (nfloor, max(ratios)/min(free)))
print('  100%% -> r=%.1f and 70%% -> r=%.1f : %s'
      % (rad(100), rad(70), 'IDENTICAL (clamped)' if abs(rad(100)-rad(70)) < 0.01 else 'distinct'))
if max(free)/min(free) > 1.02:
    bad('tree', 'circle AREA per unit share varies %.2fx even above the floor' % (max(free)/min(free)))

# =========================================================================
print()
print('=' * 74)
print('3. RANKED RISK  — claim: "Distance from centre is proportional to effect size"')
print('=' * 74)
base = ds['baseline']['lifetimeRisk']
strata = {s['label']: s['lifetimeRisk'] for s in ds['baseline'].get('strata', [])}
def gmean(r): return math.sqrt(r[0]*r[1])
plot, unplot = [], []
for f in ds['factors']:
    if f.get('rr'): v = gmean(f['rr'])
    elif f.get('absoluteLifetime'):
        b = strata.get(f.get('stratum'), base)
        v = gmean(f['absoluteLifetime']) / b
    else: v = None
    (plot if v else unplot).append((f, v))
lo = min([v for _, v in plot] + [1]); hi = max([v for _, v in plot] + [1])
lg = math.log(hi/lo); lo2 = lo*math.exp(-lg*0.18); hi2 = hi*math.exp(lg*0.18)
span = math.log(hi2) - math.log(lo2)
def sx(v): return (math.log(v) - math.log(lo2)) / span
ox = sx(1)
print('  domain %.3f .. %.1f   origin at %.1f%% of width' % (lo2, hi2, ox*100))
for f, v in sorted(plot, key=lambda t: -abs(math.log(t[1]))):
    d = (sx(v) - ox) * 100
    print('  %-42s x%-7.2f  %+6.1f%% from origin   %s'
          % (f['label'][:42], v, d, f.get('magnitude', '')[:26]))
print('\n  not plotted (%d):' % len(unplot))
for f, _ in unplot:
    print('    %-42s %s' % (f['label'][:42], f.get('magnitude', 'no figure')))
# symmetry check
for a, b in [(0.75, 1/0.75), (0.5, 2.0)]:
    if lo2 <= a <= hi2 and lo2 <= b <= hi2:
        da, db = abs(sx(a)-ox), abs(sx(b)-ox)
        s = 'symmetric' if abs(da-db) < 1e-9 else 'ASYMMETRIC'
        print('  x%.2f and x%.2f are equidistant from origin: %s' % (a, b, s))
        if s != 'symmetric': bad('ranked', 'log axis not symmetric for reciprocal ratios')
# direction vs value
for f, v in plot:
    d = f.get('direction')
    if d == 'increases' and v < 1: bad('ranked', '%s: direction increases but value %.2f < 1' % (f['id'], v))
    if d == 'decreases' and v > 1: bad('ranked', '%s: direction decreases but value %.2f > 1' % (f['id'], v))

# =========================================================================
print()
print('=' * 74)
print('4. STAGE SURVIVAL BARS  — bar width = fiveYear / max(fiveYear)')
print('=' * 74)
st = ds['detection']['stageOutcomes']
mx = max([s['fiveYear'] for s in st] + [100])
for s in st:
    w = s['fiveYear']/mx*100
    print('  %-12s %5.1f%%  ->  bar %5.1f%% of track   (true share of 100 = %5.1f%%)'
          % (s['stage'], s['fiveYear'], w, s['fiveYear']))
print('  max = %.1f, so every bar is inflated by x%.4f' % (mx, 100/mx))
if abs(mx - 100) > 0.001:
    bad('detection', 'bars normalised to max (%.1f) not to 100; a %.1f%% survival draws a FULL bar'
        % (mx, mx))

# =========================================================================
print()
print('=' * 74)
print('5. DRIVER BARS in subtype drawers — width = frequency / max(frequency in THAT drawer)')
print('=' * 74)
print('  Same frequency, different drawer -> different bar length?')
seen = {}
for n in nodes:
    drv = (n.get('molecular') or {}).get('drivers') or []
    fr = [d['frequency'] for d in drv if isinstance(d.get('frequency'), (int, float))]
    if not fr: continue
    mxf = max(fr)
    for d in drv:
        f = d.get('frequency')
        if not isinstance(f, (int, float)): continue
        seen.setdefault(f, []).append((n['id'], min(100, f), mxf))
conflicts = {k: v for k, v in seen.items() if len({round(x[1]) for x in v}) > 1}
for freq in sorted(conflicts, reverse=True)[:6]:
    rows = conflicts[freq]
    print('  frequency %-5.1f%% draws:' % freq)
    for nid, w, mxf in sorted(rows, key=lambda r: -r[1])[:4]:
        print('      %-22s bar %5.1f%% of track  (drawer max %.0f%%)' % (nid, w, mxf))
if conflicts:
    bad('driver bars', '%d frequencies draw different-length bars in different drawers '
        '(each drawer is normalised to its own maximum)' % len(conflicts))

# =========================================================================
print()
print('=' * 74)
print('6. PROTEIN TRACK — stem length = sqrt(n)/sqrt(maxN)')
print('=' * 74)
_genes = tg.get('genes') or {}
_genes = list(_genes.values()) if isinstance(_genes, dict) else _genes
for g in _genes:
    hs = g.get('hotspots') or []
    if len(hs) < 2: continue
    mn = max(h['n'] for h in hs)
    a, b = max(hs, key=lambda h: h['n']), min(hs, key=lambda h: h['n'])
    if a['n'] == b['n']: continue
    true_r = a['n']/b['n']
    STEM_MAX, STEM_MIN = 58.0, 8.0
    raw_a, raw_b = a['n']/mn*STEM_MAX, b['n']/mn*STEM_MAX
    sa, sb = max(STEM_MIN, raw_a), max(STEM_MIN, raw_b)
    drawn_r = sa/sb
    floored = ' (shorter stem is AT the 8px floor)' if raw_b < STEM_MIN else ''
    print('  %-8s %-10s n=%-4d vs %-10s n=%-4d   true %5.1fx  drawn %4.1fx%s'
          % (g['gene'], a['change'], a['n'], b['change'], b['n'], true_r, drawn_r, floored))
    # Only a defect when BOTH stems are above the floor: then the scale itself
    # is lying. Below the floor the caption tells the reader to use the head.
    if not floored and abs(true_r - drawn_r) / true_r > 0.02:
        bad('protein track', '%s: stem ratio %.1fx drawn as %.1fx with neither at the floor'
            % (g['gene'], true_r, drawn_r))

# =========================================================================
print()
print('=' * 74)
print('7. AGE DISTRIBUTION + CONCORDANCE MATRIX')
print('=' * 74)
ages = fx['overview']['age_distribution']['new_cases']
tot = sum(a['percent'] for a in ages)
print('  age bands sum to %.1f%%  (%s)' % (tot, 'ok' if abs(tot-100) < 1.5 else 'DOES NOT SUM TO 100'))
if abs(tot - 100) > 1.5: bad('age band', 'shares sum to %.1f' % tot)
conc = fx.get('concordance') or {}
if conc.get('matrix'):
    gt = 0
    for rk, row in conc['matrix'].items():
        rt = sum(row.values()); gt += rt
        print('  %-14s row total %4d' % (rk, rt))
    print('  grand total %d   vs n_classified %s' % (gt, conc.get('n_classified')))
    if conc.get('n_classified') and gt != conc['n_classified']:
        bad('concordance', 'cells sum to %d but header says %s' % (gt, conc['n_classified']))

# =========================================================================
print()
print('=' * 74)
print('VERDICT')
print('=' * 74)
if not issues:
    print('  no problems found')
for c, m in issues:
    print('  [%s] %s' % (c, m))
# A problem found is a failed run, so tools/verify.py can gate on it.
sys.exit(1 if issues else 0)
