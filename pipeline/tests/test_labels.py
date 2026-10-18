"""cxp/labels.py: an unharmonised label is still found, and a failed lookup is not "no label"."""
import sys
import unittest
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from cxp.labels import Labels  # noqa: E402


def http_error(status):
    r = requests.Response()
    r.status_code = status
    return requests.HTTPError(f"{status}", response=r)


class FakeHttp:
    """Answers each openFDA search from a dict; an unknown search is openFDA's 404."""

    def __init__(self, answers):
        self.answers = answers
        self.asked = []

    def get(self, url, params=None):
        expr = params["search"]
        self.asked.append(expr)
        ans = self.answers.get(expr, http_error(404))
        if isinstance(ans, Exception):
            raise ans
        return {"results": ans}


def unharmonised(line, set_id, effective="20240925"):
    return {"id": "spl-" + set_id, "set_id": set_id, "effective_time": effective, "openfda": {},
            "spl_product_data_elements": [line],
            "warnings_and_precautions": ["5.1 Interstitial Lung Disease/Pneumonitis ..."]}


class ProductLine(unittest.TestCase):
    def test_an_empty_openfda_block_is_found_by_its_product_line(self):
        # 2026-10-17: openFDA served TAGRISSO's label with `openfda: {}`, so both
        # harmonised searches answered 404 and the page called it investigational
        http = FakeHttp({'spl_product_data_elements:"Tagrisso"':
                         [unharmonised("TAGRISSO osimertinib OSIMERTINIB MANNITOL", "5e81")]})
        rec = Labels(http).for_drug("Osimertinib (Tagrisso)")
        self.assertIsNotNone(rec)
        self.assertEqual((rec["matched_brand"], rec["matched_generic"]), ("TAGRISSO", "osimertinib"))
        self.assertFalse(rec["harmonised"])
        self.assertIn("set-ids/5e81/", rec["url"])
        self.assertTrue(rec["openfda_url"].endswith('spl_product_data_elements:"Tagrisso"'))
        self.assertEqual(http.asked[:2], ['openfda.brand_name:"Tagrisso"',
                                          'openfda.generic_name:"Osimertinib"'])

    def test_the_line_must_start_with_the_brand_then_the_generic(self):
        # TECENTRIQ's search also returns Tecentriq Hybreza, a different product,
        # and a label that only mentions the brand further along is another one
        http = FakeHttp({'spl_product_data_elements:"Tecentriq"': [
            unharmonised("Tecentriq Hybreza atezolizumab and hyaluronidase-tqjs", "aaaa", "20260601"),
            unharmonised("OTHERBRAND foo for use with TECENTRIQ atezolizumab", "bbbb", "20260601"),
            unharmonised("BIOSIMILARX atezolizumab-abcd", "gggg", "20270101"),
            unharmonised("TECENTRIQ atezolizumab ATEZOLIZUMAB HISTIDINE", "cccc", "20260520"),
            unharmonised("TECENTRIQ atezolizumab", "hhhh", "20200101"),
        ]})
        rec = Labels(http).for_drug("Atezolizumab (Tecentriq)")
        self.assertIn("set-ids/cccc/", rec["url"])

    def test_a_biologic_suffix_still_names_the_generic(self):
        http = FakeHttp({'spl_product_data_elements:"Imdelltra"':
                         [unharmonised("IMDELLTRA tarlatamab-dlle TARLATAMAB", "dddd")]})
        rec = Labels(http).for_drug("Tarlatamab (Imdelltra)")
        self.assertEqual(rec["matched_generic"], "tarlatamab-dlle")

    def test_a_different_generic_is_refused(self):
        http = FakeHttp({'spl_product_data_elements:"Tagrisso"':
                         [unharmonised("TAGRISSO gefitinib", "eeee")]})
        self.assertIsNone(Labels(http).for_drug("Osimertinib (Tagrisso)"))

    def test_a_code_in_brackets_may_sit_between_brand_and_generic(self):
        http = FakeHttp({'spl_product_data_elements:"Imdelltra"':
                         [unharmonised("IMDELLTRA (AMG757) Tarlatamab-dlle IMDELLTRA", "iiii")]})
        rec = Labels(http).for_drug("Tarlatamab (Imdelltra)")
        self.assertEqual((rec["matched_brand"], rec["matched_generic"]), ("IMDELLTRA", "Tarlatamab-dlle"))

    def test_a_brand_list_uses_its_first_brand_with_the_first_generic(self):
        http = FakeHttp({'spl_product_data_elements:"Tukysa"':
                         [unharmonised("TUKYSA tucatinib Tucatinib Copovidone", "jjjj")]})
        rec = Labels(http).for_drug("Tucatinib + trastuzumab (Tukysa + Herceptin)")
        self.assertEqual(rec["matched_brand"], "TUKYSA")

    def test_no_brand_takes_the_one_product_that_names_the_generic(self):
        http = FakeHttp({'spl_product_data_elements:"Osimertinib"':
                         [unharmonised("TAGRISSO osimertinib OSIMERTINIB MANNITOL", "kkkk")]})
        rec = Labels(http).for_drug("Osimertinib + chemotherapy")
        self.assertEqual((rec["matched_brand"], rec["matched_generic"]), ("TAGRISSO", "osimertinib"))

    def test_no_brand_and_two_products_is_no_answer(self):
        http = FakeHttp({'spl_product_data_elements:"Atezolizumab"': [
            unharmonised("TECENTRIQ atezolizumab ATEZOLIZUMAB", "llll"),
            unharmonised("Tecentriq Hybreza atezolizumab and hyaluronidase-tqjs", "mmmm")]})
        self.assertIsNone(Labels(http).for_drug("Atezolizumab + chemotherapy"))

    def test_no_brand_and_the_generic_only_further_along_is_no_answer(self):
        http = FakeHttp({'spl_product_data_elements:"Osimertinib"':
                         [unharmonised("RYBREVANT amivantamab-vmjw AMIVANTAMAB in combination with osimertinib", "nnnn")]})
        self.assertIsNone(Labels(http).for_drug("Osimertinib + chemotherapy"))

    def test_a_harmonised_hit_is_used_first(self):
        harmonised = {"id": "x", "effective_time": "20250101",
                      "openfda": {"brand_name": ["ENHERTU"], "generic_name": ["FAM-TRASTUZUMAB DERUXTECAN-NXKI"],
                                  "spl_set_id": ["ffff"]}}
        http = FakeHttp({'openfda.brand_name:"Enhertu"': [harmonised]})
        rec = Labels(http).for_drug("Trastuzumab deruxtecan (Enhertu)")
        self.assertEqual(rec["matched_brand"], "ENHERTU")
        self.assertNotIn("harmonised", rec)
        self.assertEqual(len(http.asked), 1)


class FailedLookup(unittest.TestCase):
    def test_a_404_everywhere_is_no_label(self):
        out = Labels(FakeHttp({})).collect([{"id": "drug-0", "name": "Newdrug (Nobrand)"}])
        self.assertEqual((out["n_with_label"], out["lookup_failed"]), (0, []))

    def test_a_failed_lookup_is_recorded_not_read_as_no_label(self):
        http = FakeHttp({'openfda.brand_name:"Tagrisso"': RuntimeError("failed after 4 attempts")})
        out = Labels(http).collect([{"id": "drug-0", "name": "Osimertinib (Tagrisso)"},
                                    {"id": "drug-1", "name": "Newdrug (Nobrand)"}])
        self.assertEqual(out["lookup_failed"], ["drug-0"])
        self.assertEqual(out["n_with_label"], 0)

    def test_a_4xx_other_than_404_is_a_failure(self):
        # a 400 is openFDA refusing the query (a quote in a brand), not "no label"
        http = FakeHttp({'openfda.brand_name:"Tagrisso"': http_error(400)})
        out = Labels(http).collect([{"id": "drug-0", "name": "Osimertinib (Tagrisso)"}])
        self.assertEqual(out["lookup_failed"], ["drug-0"])

    def test_the_caveat_never_calls_a_missing_label_investigational_alone(self):
        caveat = Labels(FakeHttp({})).collect([])["caveat"]
        self.assertIn("approved", caveat)
        self.assertIn("no side effects", caveat)


if __name__ == "__main__":
    unittest.main()
