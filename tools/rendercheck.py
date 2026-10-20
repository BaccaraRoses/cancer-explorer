"""tools/rendercheck.py -- the page as a browser draws it: phone layout, search, hover tips.

    python tools/rendercheck.py                   # this repository's site, every cancer
    python tools/rendercheck.py --cancer lung     # one (repeatable)
    python tools/rendercheck.py <folder>          # a staged copy, before it is handed over
    python tools/rendercheck.py --shots DIR       # also save a capture of each lens at each width

Loads index.html from file:// in headless Chromium (tools/cdp.py) and fails on:

  layout   at 320 and 393px (phones), 800px and 1400px, for every cancer, lens, view
           and classification: the page scrolls sideways; a control is
           off-screen, cut off by a box or has its text cut; two controls
           overlap; on a phone, the page end sits under the lens bar, or the
           lens bar, the cancer tabs or the search button is missing.
  search   per cancer, queries taken from its data -- a subtype, a risk factor,
           a target, a drug, a glossary term, a paper -- must each find that
           item in its group, and choosing it must close the search and open
           it: the lens and view, a drawer that names it (on a phone, scrolled
           into sight), the term marked and on screen. A paper must link out
           in a new tab. Nonsense and a single letter must each get a sentence,
           never an empty box. The results must sit inside the window and
           pass the layout rules while open (on a phone, a sheet). Every
           query at 393px; the first one at the other widths, and the first
           cancer's first one at six more desktop widths, because where the box
           lands depends on how the header wraps (without its right-edge rule
           the list ran off-screen at 800, 1200 and 1800px but not at 1400).
  tips     the hover tip under real input (a tap is not a script click): a tap
           on a tile or a risk row leaves no tip, nor does switching the
           classification after it; on a desktop, hovering shows the tip,
           leaving hides it, and a tip left after a scroll or a click names the
           shape under the pointer and sits beside it.
  targets  the Targets lens, per cancer at 393px and for the first cancer at 800px,
           where the card opens under the whole lens: every target on the
           landscape has a button of its own; a tap on a button, a dot and a
           table row opens that target's card with its heading on screen and
           a way back, and the way back brings the place tapped on screen
           again. At 1400px, where the card opens beside the chart, a click
           on a dot opens it without moving the page. The landscape's labels
           must sit inside its edge (on a phone the svg cut the band's label).
  errors   any uncaught exception in the page, and any console.error that is
           not the validator's own report (the validator check judges that).

It cannot tell whether a page reads right, only that nothing is cut, hidden or
dead, and apart from the Targets landscape's labels it does not look inside the
SVG charts (tools/chartaudit.py re-derives those): look at the render as well
(INV-5). Needs Chrome, Chromium or Edge, which
CX_CHROME may name; with none it fails and says where it looked.
"""
from __future__ import annotations

import argparse
import datetime
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import cdp  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
PROBE_JS = Path(__file__).resolve().with_name("rendercheck.js")
WIDTHS = (320, 393, 800, 1400)
PLACEMENT_WIDTHS = (700, 1000, 1200, 1600, 1800, 1920)
SECTIONS = ("layout", "search", "tips", "targets")
TARGET_WIDTHS = (393, 800, 1400)
DRAWER_BELOW = 1000           # css/explorer.css puts the drawer under the lens up to this width
TAP_SETTLE = 0.1              # the Targets steps wait for the card itself
PHONE_MAX = 640          # css/explorer.css switches to the phone layout at this width
HEIGHT = {True: 851, False: 900}
READY = "!!document.querySelector('#lens-toggle button[aria-pressed=true]')"

# the result group each kind lands in, and the lens and view choosing it opens
GROUP = {"node": "Subtypes", "factor": "Risk factors", "target": "Targets", "drug": "Drugs",
         "term": "Glossary", "paper": "Papers"}
OPENS = {"node": ("subtypes", None), "factor": ("risk", None), "target": ("targets", "targets"),
         "drug": ("targets", "drugs"), "term": ("start", "glossary")}
NONSENSE = "qxzqv"


def squash(s: str) -> str:
    return " ".join(str(s or "").split())


class Check:
    def __init__(self, b: cdp.Browser, root: Path, lenses: list[str] | None = None):
        self.b = b
        self.url = (root / "index.html").resolve().as_uri()
        self.js = PROBE_JS.read_text(encoding="utf-8")
        self.lenses = lenses
        self.problems: list[tuple[str, str]] = []
        self.stats = {"cancers": 0, "views": 0, "controls": 0, "searches": 0, "tips": 0, "taps": 0}
        self._seen = (0, 0)

    def flag(self, where: str, msg: str) -> None:
        self.problems.append((where, msg))

    def drain(self, where: str) -> None:
        """Page errors raised since the last call, put on the step that raised them."""
        n_exc, n_err = self._seen
        for e in self.b.exceptions[n_exc:]:
            self.flag(where, f"uncaught exception: {e}")
        for e in self.b.console_errors[n_err:]:
            if not e.startswith(("[validate]", "  ERROR")):
                self.flag(where, f"console.error: {e[:160]}")
        self._seen = (len(self.b.exceptions), len(self.b.console_errors))

    def load(self, width: int, hash_: str = "") -> bool:
        phone = width <= PHONE_MAX
        self.b.viewport(width, HEIGHT[phone], mobile=phone)
        self.b.goto(self.url + hash_, ready=READY)
        self.b.eval(self.js)
        return phone

    def rc(self, fn: str, *args):
        return self.b.eval(f"window.__rc.{fn}({', '.join(json.dumps(a) for a in args)})")

    # --- layout -------------------------------------------------------------------

    def layout(self, width: int, ids: list[str], shots: Path | None) -> None:
        phone = self.load(width)
        stamp = datetime.date.today().isoformat()
        for cid in ids:
            self.rc("show", {"ds": cid})
            plan = self.rc("plan")
            if phone:
                for msg in self.rc("phoneFrame"):
                    self.flag(f"{width}px {cid}", msg)
            for lens in plan["lenses"]:
                if self.lenses and lens not in self.lenses:
                    continue
                self.rc("show", {"lens": lens})
                axes = plan["axes"] if lens == "subtypes" else [None]
                for vi, view in enumerate(self.rc("plan")["views"]):
                    for ai, axis in enumerate(axes):
                        tag = f"{width}px {cid} {lens}/{view}" + (f"/{axis}" if axis else "")
                        at = self.rc("show", {"view": view, "axis": axis})
                        if (at["ds"], at["lens"], at["view"]) != (cid, lens, view):
                            self.flag(tag, f"asked for this view, the page shows {at['ds']} {at['lens']}/{at['view']}")
                        res = self.rc("layout")
                        self.stats["views"] += 1
                        self.stats["controls"] += res["controls"]
                        for msg in res["problems"]:
                            self.flag(tag, msg)
                        self.drain(tag)
                        if shots and vi == 0 and ai == 0:
                            self.b.screenshot(shots / f"render-{stamp}-{width}-{cid}-{lens}-{view}.png")

    # --- search -------------------------------------------------------------------

    def search(self, width: int, ids: list[str], full: bool) -> None:
        phone = self.load(width)
        for cid in ids:
            self.rc("show", {"ds": cid})
            probes = self.rc("probes")
            if not probes:
                self.flag(f"{width}px {cid} search", "no search query could be drawn from the data")
            for p in probes if full else probes[:1]:
                self.search_one(width, cid, p, phone)
            if full:
                self.empty_answers(width, cid)

    def search_one(self, width: int, cid: str, p: dict, phone: bool) -> None:
        q, kind = squash(p["q"]), p["kind"]
        where = f"{width}px {cid} search for a {kind} {q[:48]!r}"
        res = self.rc("search", p["q"])
        self.stats["searches"] += 1
        if phone and not res["sheet"]:
            self.flag(where, "the search sheet did not open")
        box = res["results"]
        if not box:
            self.flag(where, "no results are shown")
            self.rc("closeSearch")
            return
        if box["left"] < -1 or box["right"] > res["width"] + 1:
            self.flag(where, f"the results run off-screen: {box['left']:.0f}..{box['right']:.0f}px "
                             f"in a {res['width']}px window")
        for msg in self.rc("layout")["problems"]:
            self.flag(where + ", with the results open", msg)
        title = GROUP[kind]
        group = next((g for g in res["groups"] if g["title"] == title), {"items": []})
        item = next((it for it in group["items"]
                     if it["label"] == q or (kind == "term" and it["label"].endswith(f"({q})"))), None)
        if not item:
            said = res["count"] or res["note"] or "nothing"
            groups = ", ".join(g["title"] for g in res["groups"]) or "none"
            self.flag(where, f"no {title} result names it (the box says: {said}; groups: {groups})")
            self.rc("closeSearch")
            return
        if kind == "paper":
            if (item["tag"], item["href"], item["target"]) != ("a", p["url"], "_blank"):
                self.flag(where, f"the paper does not link to its page in a new tab ({item['tag']}, "
                                 f"href {item['href'][:60]!r}, target {item['target']!r})")
            self.rc("closeSearch")
            self.drain(where)
            return
        out = self.rc("pick", title, item["label"])
        if out["sheet"] or out["resultsShown"]:
            self.flag(where, "choosing the result left the search open")
        lens, view = OPENS[kind]
        if out["at"]["lens"] != lens or (view and out["at"]["view"] != view):
            self.flag(where, f"choosing it opened {out['at']['lens']}/{out['at']['view']}, not "
                             + (f"{lens}/{view}" if view else lens))
        band = out["band"]
        if kind == "term":
            found = out["found"]
            if not found or found["term"] != q:
                self.flag(where, "the glossary does not mark the term chosen")
            elif not found["box"] or found["box"]["top"] < band["top"] - 1 or found["box"]["bottom"] > band["bottom"] + 1:
                self.flag(where, "the term chosen is not on screen")
        elif q not in out["drawerText"]:
            self.flag(where, "the drawer does not name what was chosen")
        elif phone:
            d = out["drawer"]
            if not d or d["top"] > band["bottom"] - 40 or d["bottom"] < band["top"] + 40:
                self.flag(where, "the drawer is not on screen after choosing")
        for msg in self.rc("layout")["problems"]:
            self.flag(where + ", after choosing it", msg)
        self.rc("closeSearch")
        self.drain(where)

    def placement(self, width: int, cid: str) -> None:
        self.load(width)
        self.rc("show", {"ds": cid})
        probes = self.rc("probes")[:1]
        for p in probes:
            where = f"{width}px {cid} search for a {p['kind']} {squash(p['q'])[:48]!r}"
            res = self.rc("search", p["q"])
            self.stats["searches"] += 1
            box = res["results"]
            if not box:
                self.flag(where, "no results are shown")
            elif box["left"] < -1 or box["right"] > res["width"] + 1:
                self.flag(where, f"the results run off-screen: {box['left']:.0f}..{box['right']:.0f}px "
                                 f"in a {res['width']}px window")
            self.rc("closeSearch")
            self.drain(where)

    def empty_answers(self, width: int, cid: str) -> None:
        """No query may leave an empty box: it reads as "searched, nothing here"
        when the search did not run."""
        for q, must in ((NONSENSE, NONSENSE), ("q", "")):
            where = f"{width}px {cid} search for {q!r}"
            res = self.rc("search", q)
            self.stats["searches"] += 1
            if res["groups"] or not res["note"] or must not in res["note"]:
                said = res["note"] or res["count"] or "nothing"
                self.flag(where, f"expected a sentence saying why nothing is listed; the box says: {said}")
            self.rc("closeSearch")
            self.drain(where)

    # --- the hover tip ------------------------------------------------------------

    def tips(self, cid: str) -> None:
        where = f"393px {cid} tips"
        self.load(393, f"#{cid}/subtypes/-/-/treemap")
        lenses = self.rc("plan")["lenses"]
        p = self.rc("centre", "#viz g.node")
        if not p:
            self.flag(where, "no treemap tile to tap")
        else:
            self.b.tap(p["x"], p["y"])
            self.stats["tips"] += 1
            t = self.rc("tip")
            if t:
                self.flag(where, f"a tap on a treemap tile left the hover tip for {t['title']!r} on screen")
            ax = self.rc("centre", ".ah-switch .segmented button[aria-pressed=false]")
            if ax:
                self.b.tap(ax["x"], ax["y"])
                self.stats["tips"] += 1
                t = self.rc("tip")
                if t:
                    self.flag(where, f"after switching the classification, the tip for {t['title']!r} is still on screen")
        if "risk" in lenses:
            self.rc("show", {"lens": "risk", "view": "ranked"})
            p = self.rc("centre", "#viz g.rk-row")
            if p:
                self.b.tap(p["x"], p["y"])
                self.stats["tips"] += 1
                t = self.rc("tip")
                if t:
                    self.flag(where, f"a tap on a risk row left the hover tip for {t['title']!r} on screen")
        self.drain(where)

        where = f"1400px {cid} tips"
        self.load(1400, f"#{cid}/subtypes/-/-/treemap")
        p = self.rc("centre", "#viz g.node")
        if not p:
            self.flag(where, "no treemap tile to hover")
            return
        x, y = p["x"], p["y"]
        self.b.mouse_move(x, y)
        if not self.rc("tip"):
            self.flag(where, "hovering a treemap tile shows no tip")
        self.b.mouse_move(5, 5)
        if self.rc("tip"):
            self.flag(where, "leaving a treemap tile does not hide its tip")
        self.b.mouse_move(x, y)
        self.b.wheel(x, y, 300)
        stale = self.rc("tipStale", x, y)
        if stale:
            self.flag(where, f"after a scroll: {stale}")
        p = self.rc("centre", "#viz g.node")
        x, y = p["x"], p["y"]
        self.b.mouse_move(x, y)
        self.b.click(x, y)
        stale = self.rc("tipStale", x, y)
        if stale:
            self.flag(where, f"after a click: {stale}")
        self.b.mouse_move(x + 2, y + 2)
        if not self.rc("tip"):
            self.flag(where, "after a click, moving over the new tile shows no tip")
        if "risk" in lenses:
            self.rc("show", {"lens": "risk", "view": "ranked"})
            p = self.rc("centre", "#viz g.rk-row")
            if p:
                self.b.mouse_move(p["x"], p["y"])
                if not self.rc("tip"):
                    self.flag(where, "hovering a risk row shows no tip")
                self.b.mouse_move(5, 5)
                if self.rc("tip"):
                    self.flag(where, "leaving a risk row does not hide its tip")
        self.stats["tips"] += 8
        self.drain(where)

    # --- the Targets lens: a card opened from where it was tapped ----------------

    NOUN = {"button": "button", "dot": "dot", "row": "table row"}

    def targets(self, width: int, cid: str) -> None:
        where = f"{width}px {cid} targets"
        self.load(width, f"#{cid}/targets")
        if "targets" not in self.rc("plan")["lenses"]:
            return
        if self.rc("where")["lens"] != "targets":
            self.flag(where, "the Targets lens did not open from its link")
            return
        for msg in self.rc("svgCut", ".tg-scatter svg"):
            self.flag(where, msg)
        tp = self.rc("targetPlan")
        missing = [g for g in tp["expected"] if g not in tp["buttons"]]
        if missing:
            self.flag(where, f"no button opens the card of {', '.join(missing[:6])}"
                             + (f" and {len(missing) - 6} more" if len(missing) > 6 else "")
                             + " (on a phone the dots sit too close to tap)")
        aims = [("button", g) for g in dict.fromkeys(tp["buttons"][:1] + tp["buttons"][-1:])]
        for kind, which in aims + [("dot", None), ("row", None)]:
            a = self.rc("aim", kind, which)
            if not a:
                if kind != "button":
                    self.flag(where, f"no {self.NOUN[kind]} to tap")
                continue
            gene, noun = a["gene"], self.NOUN[kind]
            self.b.tap(a["x"], a["y"], settle=TAP_SETTLE)
            self.stats["taps"] += 1
            c = self.rc("card", gene)
            if c["gene"] != gene:
                self.flag(where, f"a tap on {gene}'s {noun} opened {c['gene'] or 'no card'}")
                continue
            band, head = c["band"], c["head"]
            if not head or head["top"] < band["top"] - 1 or head["bottom"] > band["bottom"] + 1:
                at = f"{head['top']:.0f}px" if head else "nowhere"
                self.flag(where, f"{gene}'s card is not on screen after a tap on its {noun}: its heading is at "
                                 f"{at}, the screen shows {band['top']:.0f}..{band['bottom']:.0f}px")
            if not c["backs"]:
                self.flag(where, f"{gene}'s card, opened from its {noun}, has no way back")
                continue
            # the bottom one for the table row, which is read after the whole card
            end = "last" if kind == "row" else "first"
            bk = self.rc("aim", "back", end)
            self.b.tap(bk["x"], bk["y"], settle=TAP_SETTLE)
            self.stats["taps"] += 1
            w = self.rc("whereIs", kind, gene, c["y"])
            box, band = w["box"], w["band"]
            if not box or box["bottom"] < band["top"] + 1 or box["top"] > band["bottom"] - 1:
                said = c["backs"][-1 if end == "last" else 0]
                self.flag(where, f"{said!r} at the {'end' if end == 'last' else 'top'} of {gene}'s card does not "
                                 f"bring its {noun} back on screen")
        self.drain(where)

    def targets_beside(self, width: int, cid: str) -> None:
        where = f"{width}px {cid} targets"
        self.load(width, f"#{cid}/targets")
        if "targets" not in self.rc("plan")["lenses"]:
            return
        a = self.rc("aim", "dot", None)
        if not a:
            self.flag(where, "no dot to click")
            return
        self.b.mouse_move(a["x"], a["y"])
        self.b.click(a["x"], a["y"], settle=TAP_SETTLE)
        self.stats["taps"] += 1
        c = self.rc("card", a["gene"])
        if c["gene"] != a["gene"]:
            self.flag(where, f"a click on {a['gene']}'s dot opened {c['gene'] or 'no card'}")
        if abs(c["y"] - a["y0"]) > 2:
            self.flag(where, f"a click on a dot moved the page from {a['y0']:.0f} to {c['y']:.0f}px, where the card "
                             "opens beside the chart")
        if c["backs"]:
            self.flag(where, f"{c['backs'][0]!r} shows where the card opens beside the chart")
        self.drain(where)

    def report(self) -> list[str]:
        """One line per distinct problem: the first place it showed, and how many more."""
        by_msg: dict[str, list[str]] = {}
        for where, msg in self.problems:
            by_msg.setdefault(msg, []).append(where)
        return [f"{ws[0]}: {msg}" + (f" (and {len(ws) - 1} more)" if len(ws) > 1 else "")
                for msg, ws in by_msg.items()]


def run(root: Path, ids: list[str] | None = None, widths: tuple[int, ...] = WIDTHS,
        sections: tuple[str, ...] = SECTIONS, shots: Path | None = None,
        lenses: list[str] | None = None, browser: cdp.Browser | None = None,
        placement: tuple[int, ...] = PLACEMENT_WIDTHS,
        target_widths: tuple[int, ...] = TARGET_WIDTHS) -> tuple[list[str], dict]:
    b = browser or cdp.Browser()
    try:
        b.exceptions.clear()
        b.console_errors.clear()
        chk = Check(b, root, lenses)
        chk.load(widths[0])
        on_page = chk.rc("plan")["cancers"]
        if not on_page:
            chk.flag("page", "index.html registered no cancer")
        for cid in ids or []:
            if cid not in on_page:
                chk.flag("page", f"{cid} is not among the cancers index.html loads ({', '.join(on_page)})")
        want = [c for c in (ids or on_page) if c in on_page]
        chk.stats["cancers"] = len(want)
        chk.drain("page load")
        if shots:
            shots.mkdir(parents=True, exist_ok=True)
        if "layout" in sections:
            for w in widths:
                chk.layout(w, want, shots)
        if "search" in sections:
            full_at = max([w for w in widths if w <= PHONE_MAX] or [widths[0]])
            for w in widths:
                chk.search(w, want, full=w == full_at)
            for w in placement if want else ():
                if w not in widths:
                    chk.placement(w, want[0])
        if "tips" in sections and want:
            chk.tips(want[0])
        if "targets" in sections and want:
            for w in target_widths:
                if w > DRAWER_BELOW:
                    chk.targets_beside(w, want[0])
                    continue
                for cid in want if w <= PHONE_MAX else want[:1]:
                    chk.targets(w, cid)
        chk.drain("page")
        return chk.report(), chk.stats
    finally:
        if browser is None:
            b.close()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Render the site in headless Chromium and check what a visitor gets.")
    ap.add_argument("root", nargs="?", default=str(ROOT),
                    help="a folder holding index.html, css/, js/ and data/ (default: this repository)")
    ap.add_argument("--cancer", action="append", help="limit to this cancer (repeatable)")
    ap.add_argument("--lens", action="append", help="limit the layout sweep to this lens (repeatable)")
    ap.add_argument("--widths", default=",".join(map(str, WIDTHS)), help="comma-separated CSS pixel widths")
    ap.add_argument("--only", default=",".join(SECTIONS), help="comma-separated: " + ", ".join(SECTIONS))
    ap.add_argument("--shots", metavar="DIR", help="save a capture of the first view of each lens at each width")
    args = ap.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    root = Path(args.root).resolve()
    sections = tuple(s for s in args.only.split(",") if s)
    unknown = sorted(set(sections) - set(SECTIONS))
    if unknown:
        ap.error(f"unknown section(s): {', '.join(unknown)}")
    widths = tuple(int(w) for w in args.widths.split(","))
    if not (root / "index.html").is_file():
        print("render: FAIL -- no index.html in the folder given")
        return 2
    t0 = time.time()
    try:
        problems, stats = run(root, args.cancer, widths, sections, Path(args.shots) if args.shots else None,
                              args.lens)
    except cdp.BrowserMissing as e:
        print(f"render: FAIL -- {e}")
        return 2
    except (cdp.BrowserError, cdp.PageError, OSError) as e:
        print(f"render: FAIL -- the browser run broke: {e}")
        return 2
    for line in problems:
        print(line)
    summary = (f"{stats['cancers']} cancer(s), {stats['views']} views at {'/'.join(map(str, widths))}px, "
               f"{stats['controls']} controls, {stats['searches']} searches, {stats['tips']} tip steps, "
               f"{stats['taps']} Targets taps "
               f"in {time.time() - t0:.0f}s")
    print(f"render: {'FAIL' if problems else 'PASS'} -- "
          + (f"{len(problems)} problem(s); {summary}" if problems else summary))
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
