"""Tests for cxp/refcheck.py, the PMID check.

    cd pipeline
    python -m unittest discover -s tests

Hermetic: every Europe PMC record is built by hand, so nothing here touches the
network or the cache.
"""
import sys
import unittest
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE))

from cxp import refcheck  # noqa: E402


def rec(pmid="100", title="Acral lentiginous melanoma incidence by sex, race, ethnicity, and stage.",
        authors=("Holman", "King"), year="2023", journal="Prev Med", iso="Prev Med",
        pmcid=None, doi=None, types=("Journal Article",), epub=None):
    author_list = [{"collectiveName": a[1:-1]} if a.startswith("[") else {"lastName": a} for a in authors]
    return {"pmid": pmid, "title": title, "pubYear": year, "firstPublicationDate": f"{year}-09-01",
            "electronicPublicationDate": epub, "pmcid": pmcid, "doi": doi,
            "authorList": {"author": author_list},
            "journalInfo": {"journal": {"medlineAbbreviation": journal, "isoabbreviation": iso}},
            "pubTypeList": {"pubType": list(types)}}


def ref(label="Holman et al — acral lentiginous melanoma incidence by sex, race, ethnicity, and stage (Table 1)",
        journal="Prev Med 2023", pmid="100", url="https://pubmed.ncbi.nlm.nih.gov/100/"):
    return {"id": "r", "label": label, "journal": journal, "pmid": pmid, "url": url, "line": 1}


class Parsing(unittest.TestCase):
    JS = ("const X = {\n  references: [\n"
          "    { id: 'a-1', label: 'Smith et al — pathologists\\' diagnosis',\n"
          "      journal: 'BMJ 2017', pmid: '28659278', url: 'https://pubmed.ncbi.nlm.nih.gov/28659278/' },\n"
          "    { id: 'seer', label: 'SEER Stat Facts', journal: 'NCI', url: 'https://seer.cancer.gov/' },\n"
          "  ],\n  nodes: []\n};\n")

    def test_entries_fields_and_lines(self):
        refs = refcheck.parse_references(self.JS)
        self.assertEqual([r["id"] for r in refs], ["a-1", "seer"])
        self.assertEqual(refs[0]["label"], "Smith et al — pathologists' diagnosis")
        self.assertEqual(refs[0]["pmid"], "28659278")
        self.assertEqual(refs[0]["line"], 3)
        self.assertIsNone(refs[1]["pmid"])

    def test_an_unparsed_pmid_is_an_error_not_a_short_list(self):
        with self.assertRaises(RuntimeError):
            refcheck.parse_references(self.JS.replace("pmid: '28659278'", "pmid: 28659278"))

    def test_label_forms(self):
        lp = refcheck.label_parts
        self.assertEqual(lp("Holman et al — a title (Table 1)"), ("Holman", "a title"))
        self.assertEqual(lp("Chang, Karnell and Menck — t"), ("Chang", "t"))
        self.assertEqual(lp("Villeneuve & Mao — t"), ("Villeneuve", "t"))
        self.assertEqual(lp("Adamson and Welch — t"), ("Adamson", "t"))
        self.assertEqual(lp("US Preventive Services Task Force — t"), ("US Preventive Services Task Force", "t"))
        self.assertEqual(lp("Breast cancer risk in Klinefelter syndrome"), (None, None))


class Checks(unittest.TestCase):
    def test_a_correct_entry_is_ok(self):
        row = refcheck.judge(ref(), rec())
        self.assertEqual(row["verdict"], "OK", row["problems"])

    def test_same_title_letter_is_caught_by_the_author(self):
        # breast cgh-menarche, 2026-09-19: the PMID was Britt's letter, whose
        # title is the meta-analysis's short title. Only the author differs.
        letter = rec(title="Menarche, menopause, and breast cancer risk.", authors=("Britt",),
                     journal="Lancet Oncol", iso="Lancet Oncol", year="2012", types=("Letter", "Comment"))
        r = ref(label="Collaborative Group on Hormonal Factors in Breast Cancer — menarche, menopause, "
                      "and breast cancer risk", journal="Lancet Oncol 2012")
        row = refcheck.judge(r, letter)
        self.assertEqual(row["verdict"], "MISMATCH")
        self.assertEqual(row["checks"]["author"], "fail")
        self.assertEqual(row["checks"]["title"], "ok")

    def test_a_group_listed_after_its_people_is_an_author(self):
        paper = rec(authors=("Hamajima", "Hirose", "[Collaborative Group on Hormonal Factors in Breast Cancer]"))
        r = ref(label="Collaborative Group on Hormonal Factors in Breast Cancer — acral lentiginous "
                      "melanoma incidence by sex, race, ethnicity, and stage")
        self.assertEqual(refcheck.check_author(r, paper)[0], "ok")

    def test_a_group_filed_first_may_be_named_by_its_first_person(self):
        paper = rec(authors=("[US Preventive Services Task Force]", "Mangione", "Barry"))
        self.assertEqual(refcheck.check_author(ref(label="Mangione et al — t"), paper)[0], "ok")
        self.assertEqual(refcheck.check_author(ref(label="Barry et al — t"), paper)[0], "fail")

    def test_accents_and_hyphens_do_not_split_a_name(self):
        paper = rec(authors=("Ji-Xu", "Müller"))
        self.assertEqual(refcheck.check_author(ref(label="Ji-Xu, Dinnes and Matin — t"), paper)[0], "ok")
        self.assertEqual(refcheck.check_author(ref(label="Jixu et al — t"), paper)[0], "ok")

    def test_the_wrong_first_author_fails(self):
        self.assertEqual(refcheck.check_author(ref(label="Palmer et al — t"), rec(authors=("Ma", "Palmer")))[0],
                         "fail")

    def test_a_label_without_author_and_title_fails(self):
        row = refcheck.judge(ref(label="Acral lentiginous melanoma incidence"), rec())
        self.assertEqual(row["verdict"], "MISMATCH")
        self.assertEqual(row["checks"]["author"], "fail")
        self.assertEqual(row["checks"]["title"], "fail")

    def test_a_different_paper_on_the_same_disease_fails_the_title(self):
        other = rec(title="Survival after acral melanoma in Asia: a registry study.")
        self.assertEqual(refcheck.check_title(ref(), other)[0], "fail")

    def test_a_paraphrased_title_passes(self):
        # Sentence case, a dropped subtitle and a label's own "(Table 1)".
        paper = rec(title="Acral Lentiginous Melanoma Incidence by Sex, Race, Ethnicity, and Stage in the "
                          "United States, 2010-2019.")
        self.assertEqual(refcheck.check_title(ref(), paper)[0], "ok")

    def test_year_accepts_the_epub_year(self):
        paper = rec(year="2024", epub="2023-12-20")
        self.assertEqual(refcheck.check_year(ref(journal="Prev Med 2023"), paper)[0], "ok")
        self.assertEqual(refcheck.check_year(ref(journal="Prev Med 2021"), paper)[0], "fail")

    def test_journal_by_medline_or_iso_name(self):
        paper = rec(journal="Cancer Prev Res (Phila)", iso="Cancer Prev Res (Phila)")
        self.assertEqual(refcheck.check_journal(ref(journal="Cancer Prev Res 2023"), paper)[0], "ok")
        # prostate mcrpc-epi, 2026-09-19: right year, wrong journal.
        paper = rec(journal="J Natl Compr Canc Netw", iso="J Natl Compr Canc Netw")
        self.assertEqual(refcheck.check_journal(ref(journal="Eur Urol Oncol 2023"), paper)[0], "fail")

    def test_url_must_name_the_same_paper(self):
        paper = rec(pmcid="PMC10949133", doi="10.1016/j.ypmed.2023.107692")
        cu = refcheck.check_url
        self.assertEqual(cu(ref(url="https://pubmed.ncbi.nlm.nih.gov/999/"), paper)[0], "fail")
        self.assertEqual(cu(ref(url="https://pmc.ncbi.nlm.nih.gov/articles/PMC10949133/"), paper)[0], "ok")
        self.assertEqual(cu(ref(url="https://pmc.ncbi.nlm.nih.gov/articles/PMC1/"), paper)[0], "fail")
        self.assertEqual(cu(ref(url="https://doi.org/10.1016/J.YPMED.2023.107692"), paper)[0], "ok")
        self.assertEqual(cu(ref(url="https://doi.org/10.1016/j.ypmed.2023.999"), paper)[0], "fail")
        self.assertEqual(cu(ref(url="https://www.cbioportal.org/study/summary?id=x"), paper)[0], "skip")

    def test_a_swapped_sibling_fails_though_its_title_share_passes(self):
        # Dinnes 2018: one author, year and journal; the titles differ by a word.
        # Swapped consistently (pmid and url together) only `swap` sees it.
        visual = rec(pmid="1", authors=("Dinnes",), year="2018", journal="Cochrane Database Syst Rev",
                     iso="Cochrane Database Syst Rev",
                     title="Visual inspection for diagnosing cutaneous melanoma in adults.")
        dermo = rec(pmid="2", authors=("Dinnes",), year="2018", journal="Cochrane Database Syst Rev",
                    iso="Cochrane Database Syst Rev",
                    title="Dermoscopy, with and without visual inspection, for diagnosing melanoma in adults.")
        r_visual = ref(label="Dinnes et al — visual inspection for diagnosing cutaneous melanoma in adults",
                       journal="Cochrane Database Syst Rev 2018", pmid="2", url="https://pubmed.ncbi.nlm.nih.gov/2/")
        r_dermo = ref(label="Dinnes et al — dermoscopy, with and without visual inspection, for diagnosing "
                            "melanoma in adults",
                      journal="Cochrane Database Syst Rev 2018", pmid="1", url="https://pubmed.ncbi.nlm.nih.gov/1/")
        pairs = [(r_visual, dermo, refcheck.judge(r_visual, dermo)),
                 (r_dermo, visual, refcheck.judge(r_dermo, visual))]
        self.assertEqual(pairs[0][2]["checks"]["title"], "ok")      # 83% clears TITLE_MIN
        refcheck.check_swaps(pairs)
        self.assertEqual([p[2]["verdict"] for p in pairs], ["MISMATCH", "MISMATCH"])
        self.assertEqual(pairs[0][2]["checks"]["swap"], "fail")

    def test_unswapped_siblings_pass(self):
        visual = rec(pmid="1", title="Visual inspection for diagnosing cutaneous melanoma in adults.")
        dermo = rec(pmid="2", title="Dermoscopy, with and without visual inspection, for diagnosing melanoma in adults.")
        r_visual = ref(label="Holman et al — visual inspection for diagnosing cutaneous melanoma in adults", pmid="1",
                       url="")
        r_dermo = ref(label="Holman et al — dermoscopy with and without visual inspection for diagnosing melanoma",
                      pmid="2", url="")
        pairs = [(r_visual, visual, refcheck.judge(r_visual, visual)),
                 (r_dermo, dermo, refcheck.judge(r_dermo, dermo))]
        refcheck.check_swaps(pairs)
        self.assertEqual([p[2]["verdict"] for p in pairs], ["OK", "OK"])

    def test_a_bare_less_than_is_text_not_a_tag(self):
        # Europe PMC abstracts print "<15" and "P<0.001" unescaped.
        s = refcheck.normalise("naevi compared with <15 (RR = 6.89) and P<0.001; <i>N</i> = 181 > 5")
        self.assertEqual(s, "naevi compared with <15 (rr = 6.89) and p<0.001; n = 181 > 5")

    def test_inline_tags_leave_no_space_and_block_tags_do(self):
        self.assertEqual(refcheck.normalise("(<i>N</i> = 181)<h4>Results</h4>10<sup>5</sup>"),
                         "(n = 181) results 105")

    def test_retyped_dashes_quotes_and_mid_dot_decimals_still_match(self):
        body = {"abstract": refcheck.normalise("NNB was 8·6 (range 2·3–19·6), the ‘problematic’ ones")}
        self.assertEqual(refcheck._found("NNB was 8.6 (range 2.3-19.6)", body), "abstract")
        self.assertEqual(refcheck._found("the 'problematic' ones", body), "abstract")
        self.assertIsNone(refcheck._found("NNB was 8.7 (range 2.3-19.6)", body))

    def test_an_ellipsis_needs_its_pieces_in_order(self):
        body = {"abstract": refcheck.normalise("First 1.8 per million. Then 2.3 per million.")}
        self.assertEqual(refcheck._found("First 1.8 … 2.3 per million", body), "abstract")
        self.assertIsNone(refcheck._found("2.3 per million … First 1.8", body))

    def test_quote_parsing_joins_concatenation_and_refuses_what_it_cannot_read(self):
        js = ("x: { ref: 'a-1', quote: 'one ' +\n 'two 3' }, y: { ref: 'b', quote: 'it\\'s 4' }")
        qs = refcheck.parse_quotes(js)
        self.assertEqual([(q["ref"], q["quote"], q["line"]) for q in qs],
                         [("a-1", "one two 3", 1), ("b", "it's 4", 2)])
        with self.assertRaises(RuntimeError):
            refcheck.parse_quotes("x: { quote: 'ref second 5', ref: 'a' }")

    def test_a_retracted_paper_fails(self):
        row = refcheck.judge(ref(), rec(types=("Journal Article", "Retracted Publication")))
        self.assertEqual(row["verdict"], "MISMATCH")
        self.assertEqual(row["checks"]["retracted"], "fail")

    def test_an_unknown_pmid_is_unresolved(self):
        self.assertEqual(refcheck.judge(ref(), None)["verdict"], "UNRESOLVED")


if __name__ == "__main__":
    unittest.main()
