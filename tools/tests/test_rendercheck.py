"""Tests for tools/rendercheck.py: the clean site passes, and each planted defect is seen.

Every mutant is one way the page could really break, planted in a copy of the
four site paths; the check then runs narrowed to what that rule needs (breast,
one width, one section) in a browser shared by the whole class, so the suite
stays quick. A survivor is fixed by strengthening the check, never by
deleting the mutant. Without Chrome, Chromium or Edge these tests skip -- and
the render check itself fails, so verify still says so.
"""
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import cdp  # noqa: E402
import rendercheck  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SITE = ("index.html", "css", "js", "data")
NL = chr(10)
PHONE_CSS = "@media (max-width: 640px) { %s }"

# id: (why, [(file, find, replace)] -- find must occur once; "" appends -- , run kwargs, words one problem must hold)
MUTANTS = {
    "tip-on-tap": (
        "the hover tip as it was before 2026-10-19: mouse events, no hiding on render or scroll",
        [("js/render.js", "g.addEventListener('pointerenter', show);", ""),
         ("js/render.js", "g.addEventListener('pointermove', show);",
          "g.addEventListener('mousemove', function (e) { tooltip(make(), e); });"),
         ("js/render.js", "g.addEventListener('pointerleave', function () { tooltip(null); });",
          "g.addEventListener('mouseleave', function () { tooltip(null); });"),
         ("js/explorer.js", "global.addEventListener('scroll', function () { Render.tooltip(null); }, { passive: true });", ""),
         ("js/explorer.js", "Render.tooltip(null);", "")],
        {"sections": ("tips",)}, ["left the hover tip"]),
    "sideways": (
        "a box wider than a phone",
        [("css/explorer.css", "", PHONE_CSS % ".foot { min-width: 480px; }")],
        {"sections": ("layout",), "widths": (393,), "lenses": ["start"]}, ["scrolls sideways", "footer"]),
    "text-cut": (
        "lens bar labels forced onto one line inside their buttons",
        [("css/explorer.css", "", PHONE_CSS % "#lens-toggle button { white-space: nowrap; overflow: hidden; }")],
        {"sections": ("layout",), "widths": (320,), "lenses": ["start"]}, ["text cut", "Risk & detection"]),
    "off-screen": (
        "the search button pushed past the right edge",
        [("css/explorer.css", "", PHONE_CSS % "#search-open { position: relative; left: 80px; }")],
        {"sections": ("layout",), "widths": (393,), "lenses": ["start"]}, ["button#search-open", "px window"]),
    "overlap": (
        "the search button pulled over the cancer tabs",
        [("css/explorer.css", "", PHONE_CSS % "#search-open { margin-left: -70px; }")],
        {"sections": ("layout",), "widths": (393,), "lenses": ["start"]}, ["overlaps", "search-open"]),
    "under-bar": (
        "no room left for the fixed lens bar at the page end",
        [("css/explorer.css", "", PHONE_CSS % ".app { padding-bottom: 0 !important; }")],
        {"sections": ("layout",), "widths": (393,), "lenses": ["start"]}, ["under the lens bar"]),
    "no-frame": (
        "the phone's lens bar back in the header",
        [("css/explorer.css", "", PHONE_CSS % "#ctl-lens { position: static !important; }")],
        {"sections": ("layout",), "widths": (393,), "lenses": ["start"]}, ["lens bar is not fixed"]),
    "results-cut": (
        "search results forced onto one line, so a long name is cut inside its button",
        [("css/explorer.css", "", ".sr-item { white-space: nowrap; overflow: hidden; }")],
        {"sections": ("search",), "widths": (393,)}, ["with the results open", "text cut"]),
    "dead-search": (
        "a search that never lists anything",
        [("js/explorer.js", "MIN_QUERY = 2", "MIN_QUERY = 99")],
        {"sections": ("search",), "widths": (393,)}, ["no Subtypes result names it"]),
    "pick-goes-nowhere": (
        "choosing a drug does nothing but close the search",
        [("js/explorer.js", "else if (e.kind === 'drug') ctx.selectDrug(e.id);", "else if (e.kind === 'drug') {}")],
        {"sections": ("search",), "widths": (393,)}, ["opened", "not targets/drugs"]),
    "sheet-stays": (
        "choosing a result leaves the search sheet over the page",
        [("js/explorer.js", "function chooseResult(e) {" + NL + "    closeSearch();", "function chooseResult(e) {")],
        {"sections": ("search",), "widths": (393,)}, ["left the search open"]),
    "empty-box": (
        "no sentence when nothing matches",
        [("js/explorer.js", "box.appendChild(mk('p', 'sr-note', 'Nothing in '", "void (mk('p', 'sr-note', 'Nothing in '")],
        {"sections": ("search",), "widths": (393,)}, ["expected a sentence", "qxzqv"]),
    "term-off-screen": (
        "the term chosen is marked but not brought into view",
        [("js/explorer.js", "card.scrollIntoView({ block: 'center' });", "")],
        {"sections": ("search",), "widths": (393,)}, ["the term chosen is not on screen"]),
    "dropdown-off-screen": (
        "the results list without its right-edge rule, at widths where the search box sits far right",
        [("js/explorer.js", "box.classList.toggle('from-right',", "box.classList.toggle('from-right-off',")],
        {"sections": ("search",), "widths": (1400,), "placement": (1200, 1800)}, ["the results run off-screen"]),
    "card-stays-below": (
        "a target's card opens under the gap tables and the page does not move, as before 2026-10-19",
        [("js/explorer.js", "if (drawerBelow() && !dom.drawer.hidden) dom.drawer.scrollIntoView({ block: 'start' });",
          "if (false) dom.drawer.scrollIntoView({ block: 'start' });")],
        {"sections": ("targets",), "target_widths": (393,)}, ["card is not on screen", "button"]),
    "no-way-back": (
        "a card opened from the chart with no button back to it",
        [("js/explorer.js", "return r && r.ds === state.dsId && r.gene === state.selectedGene ? r : null;", "return null;")],
        {"sections": ("targets",), "target_widths": (393,)}, ["has no way back"]),
    "back-goes-nowhere": (
        "a back button that does nothing",
        [("js/explorer.js", "if (state.targetReturn) global.scrollTo(0, state.targetReturn.y);", "")],
        {"sections": ("targets",), "target_widths": (393,)}, ["does not bring", "back on screen"]),
    "no-buttons": (
        "no button per target under the chart, so a phone has only the dots",
        [("js/render.js", "    targetButtons(container, ctx, plot, unplot);" + NL, "")],
        {"sections": ("targets",), "target_widths": (393,)}, ["no button opens the card"]),
    "wrong-card": (
        "every gene button in a row opens the row's first target",
        [("js/render.js", "ctx.selectTarget(r.gene, 'the chart'); });" + NL + "        line.appendChild(b);",
          "ctx.selectTarget(rows[0].gene, 'the chart'); });" + NL + "        line.appendChild(b);")],
        {"sections": ("targets",), "target_widths": (393,)}, ["button opened"]),
    "label-cut": (
        "the band's label always written in full, so a phone's svg edge cuts it",
        [("js/render.js", "return !tw || tw <= room;", "return true;")],
        {"sections": ("targets",), "target_widths": (393,)}, ["cut by the chart's edge"]),
    "page-jumps": (
        "a click on a dot sends a desktop reader to the top of the page, as before 2026-10-19",
        [("js/explorer.js", "      else if (within && global.scrollY !== y) global.scrollTo(0, y);" + NL, "")],
        {"sections": ("targets",), "target_widths": (1400,)}, ["moved the page"]),
    "exception": (
        "a lens that throws when drawn: a mistyped property path",
        [("js/explorer.js", "if (state.lens === 'evidence') return renderEvidence(d);",
          "if (state.lens === 'evidence') return renderEvidence(d.evidnce.rows);")],
        {"sections": ("layout",), "widths": (1400,), "lenses": ["evidence"]}, ["uncaught exception"]),
}


def plant(root: Path, edits) -> None:
    for rel, find, replace in edits:
        p = root / rel
        text = p.read_text(encoding="utf-8")
        if find:
            n = text.count(find)
            if n != 1:
                raise AssertionError(f"mutant anchor occurs {n} times in {rel}: {find[:60]!r}")
            text = text.replace(find, replace)
        else:
            text += NL + replace + NL
        p.write_bytes(text.encode("utf-8"))


class RenderCheck(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not cdp.find_browser():
            raise unittest.SkipTest("no Chrome, Chromium or Edge: " + cdp.looked_for())
        cls.browser = cdp.Browser()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()

    def site(self, edits=()) -> Path:
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        root = Path(tmp.name)
        for rel in SITE:
            src = ROOT / rel
            if src.is_dir():
                shutil.copytree(src, root / rel)
            else:
                shutil.copy2(src, root / rel)
        plant(root, edits)
        return root

    def check(self, root: Path, **kw):
        kw.setdefault("ids", ["breast"])
        kw.setdefault("placement", ())
        return rendercheck.run(root, browser=self.browser, **kw)

    def test_clean_copy_passes(self):
        problems, stats = self.check(self.site(), widths=(320, 1400), lenses=["start", "subtypes"])
        self.assertEqual(problems, [])
        self.assertGreater(stats["views"], 4)
        self.assertGreater(stats["searches"], 6)
        self.assertGreater(stats["tips"], 3)
        self.assertGreater(stats["taps"], 8)

    def test_every_mutant_is_seen(self):
        for mid, (why, edits, kw, words) in MUTANTS.items():
            with self.subTest(mutant=mid, why=why):
                problems, _ = self.check(self.site(edits), **kw)
                hit = [p for p in problems if all(w in p for w in words)]
                self.assertTrue(hit, f"{mid} survived ({why}); expected a problem with {words}, got {problems}")

    def test_a_cancer_not_on_the_page_fails(self):
        problems, _ = self.check(self.site(), ids=["nosuch"], sections=())
        self.assertTrue(any("nosuch is not among the cancers" in p for p in problems), problems)


class NoBrowser(unittest.TestCase):
    def test_fails_and_says_where_it_looked(self):
        import contextlib
        import io
        import os
        old = os.environ.get("CX_CHROME")
        os.environ["CX_CHROME"] = str(ROOT / "no-such-browser")
        out = io.StringIO()
        try:
            with contextlib.redirect_stdout(out):
                code = rendercheck.main([])
        finally:
            if old is None:
                os.environ.pop("CX_CHROME")
            else:
                os.environ["CX_CHROME"] = old
        self.assertEqual(code, 2)
        self.assertIn("render: FAIL", out.getvalue())
        self.assertIn("looked for", out.getvalue())


if __name__ == "__main__":
    unittest.main()
