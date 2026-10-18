"""Compute molecular facts from cBioPortal instead of transcribing them.

Two outputs that the hand-written dataset could only assert:

  1. driver alteration frequency per intrinsic subtype, with real numerators
     and denominators
  2. the PAM50 x receptor-IHC concordance matrix -- i.e. the actual measured
     answer to "how much does TNBC overlap basal-like?", which the hand-built
     data carried as a round "~80%"

Cohort choice matters. `brca_tcga_pub` IS the TCGA Nature 2012 cohort (n=825)
that the published frequencies come from, and it carries PAM50_SUBTYPE plus
ER/PR/HER2_STATUS -- so comparisons against the paper are like-for-like.
Auditing against PanCanAtlas (n=1084) would manufacture differences that are
really just a different cohort.

Three rules added for lung, each of which the TCGA cohorts satisfied only by
accident:

  * ONE SAMPLE PER PATIENT. TCGA ships one tumour per patient. MSK's lung
    cohort ships 915 samples from 860 patients, so counting samples would
    count a patient with two biopsies twice. Every count here is taken over
    one sample per patient -- the first by sample id, preferring one that was
    actually profiled.
  * FUSIONS ARE ALTERATIONS. ALK, ROS1 and RET are drivers because they are
    rearranged, and mutation plus copy-number calls cannot see that. So the
    structural-variant profile is read too, as a fourth metric.
  * A GENE NOT ON THE PANEL WAS NOT TESTED. MSK samples were sequenced on
    targeted panels (IMPACT341, IMPACT410...). A gene absent from a sample's
    panel is excluded from that gene's denominator rather than counted as
    wild-type. Whole-exome cohorts carry no panel, and nothing changes for them.
"""
from __future__ import annotations

import logging
import re
from collections import Counter, defaultdict
from typing import Any

from . import cancers
from .http import Http

log = logging.getLogger("cxp.cbioportal")

API = "https://www.cbioportal.org/api"

# Kept as a name because callers imported it; the real answer now comes from
# cxp/cancers.py, which is where a second cohort can be declared without
# editing this file.
DEFAULT_STUDY = cancers.BREAST.study


def allele_matches(rule: cancers.Allele, row: dict) -> bool:
    """Does one mutation call satisfy an allele rule (gene already checked)?"""
    if rule.protein and not re.search(rule.protein, row.get("proteinChange") or ""):
        return False
    if rule.types and (row.get("mutationType") or "") not in rule.types:
        return False
    if rule.pos:
        p = row.get("proteinPosStart")
        if not isinstance(p, int) or not (rule.pos[0] <= p <= rule.pos[1]):
            return False
    return True


class CBioPortal:
    def __init__(self, http: Http, study: str | None = None,
                 cancer: cancers.Cancer | None = None):
        self.http = http
        self.cancer = cancer or cancers.BREAST
        # An explicit --study overrides the cancer's default cohort, which is
        # how you audit the same dataset against a different one on purpose.
        self.study = study or self.cancer.study
        self._patient_of: dict[str, str] | None = None
        self._classified: dict[str, Any] | None = None

    # ---- primitives --------------------------------------------------

    def study_meta(self) -> dict:
        return self.http.get(f"{API}/studies/{self.study}")

    def profiles(self) -> list[dict]:
        return self.http.get(f"{API}/studies/{self.study}/molecular-profiles")

    def profile_id(self, alteration_type: str) -> str | None:
        """Pick a profile by type rather than guessing its id string."""
        wanted = [p for p in self.profiles() if p["molecularAlterationType"] == alteration_type]
        if not wanted:
            return None
        # prefer the plain gistic/mutation profile over z-score variants
        wanted.sort(key=lambda p: ("zscore" in p["molecularProfileId"].lower(), len(p["molecularProfileId"])))
        return wanted[0]["molecularProfileId"]

    def sample_ids(self, list_suffix: str) -> list[str]:
        return self.http.get(f"{API}/sample-lists/{self.study}_{list_suffix}/sample-ids")

    def gene(self, symbol: str) -> dict:
        return self.http.get(f"{API}/genes/{symbol}")

    def clinical(self, attribute_id: str, patient_level: bool) -> list[dict]:
        return self.http.get(
            f"{API}/studies/{self.study}/clinical-data",
            params={
                "clinicalDataType": "PATIENT" if patient_level else "SAMPLE",
                "attributeId": attribute_id,
                "projection": "SUMMARY",
            },
        )

    def attribute_index(self) -> dict[str, dict]:
        attrs = self.http.get(f"{API}/studies/{self.study}/clinical-attributes")
        return {a["clinicalAttributeId"]: a for a in attrs}

    def patient_of(self) -> dict[str, str]:
        """{sampleId: patientId} for the whole study."""
        if self._patient_of is None:
            samples = self.http.get(f"{API}/studies/{self.study}/samples")
            self._patient_of = {s["sampleId"]: s["patientId"] for s in samples}
        return self._patient_of

    def one_per_patient(self, samples, prefer=None) -> set[str]:
        """Keep one sample per patient: the first by id, preferring `prefer`.

        Sample ids sort into collection order in both TCGA (-01, -02) and MSK
        (-T01-, -T02-) naming, so "first" is the earliest tumour sampled. A
        patient whose first sample was never profiled keeps a later one that
        was, rather than silently dropping out of every denominator.
        """
        pof = self.patient_of()
        by: dict[str, list[str]] = defaultdict(list)
        for s in samples:
            by[pof.get(s, s)].append(s)
        keep = set()
        for group in by.values():
            group.sort()
            if prefer is not None:
                profiled = [s for s in group if s in prefer]
                keep.add((profiled or group)[0])
            else:
                keep.add(group[0])
        return keep

    def _clinical_by_sample(self, attribute_id: str) -> dict[str, str]:
        """Return {sampleId: value}, lifting patient-level attributes onto samples."""
        attrs = self.attribute_index()
        if attribute_id not in attrs:
            return {}
        is_patient = attrs[attribute_id]["patientAttribute"]
        rows = self.clinical(attribute_id, is_patient)
        if not is_patient:
            return {r["sampleId"]: r["value"] for r in rows}

        by_patient = {r["patientId"]: r["value"] for r in rows}
        samples = self.http.get(f"{API}/studies/{self.study}/samples")
        return {
            s["sampleId"]: by_patient[s["patientId"]]
            for s in samples
            if s["patientId"] in by_patient
        }

    def _try_sample_ids(self, list_suffix: str) -> set[str]:
        try:
            return set(self.sample_ids(list_suffix))
        except Exception:  # noqa: BLE001 - a study without the list simply lacks the profile
            return set()

    # ---- which genes each sample was actually tested for ---------------

    def profiled_by_gene(self, alteration_type: str, list_suffix: str,
                         symbols: list[str]) -> dict[str, set[str]] | None:
        """{gene: samples whose panel covers it}, or None when no panel applies.

        None means whole-exome (or no panel metadata): every gene was profiled
        in every sample on the list, which is what the callers assumed before
        panels were considered.
        """
        prof = self.profile_id(alteration_type)
        if not prof:
            return None
        try:
            rows = self.http.post(f"{API}/molecular-profiles/{prof}/gene-panel-data/fetch",
                                  json_body={"sampleListId": f"{self.study}_{list_suffix}"})
        except Exception:  # noqa: BLE001
            return None
        panel_ids = sorted({r["genePanelId"] for r in rows if r.get("genePanelId")})
        if not panel_ids:
            return None
        genes_of = {
            pid: {g["hugoGeneSymbol"] for g in (self.http.get(f"{API}/gene-panels/{pid}").get("genes") or [])}
            for pid in panel_ids
        }
        out: dict[str, set[str]] = {}
        for sym in symbols:
            out[sym] = {
                r["sampleId"] for r in rows
                if r.get("profiled", True) and (not r.get("genePanelId") or sym in genes_of[r["genePanelId"]])
            }
        missing = [s for s in symbols if not out[s]]
        if missing:
            log.warning("%s: %s not on any %s panel in this study — no denominator, figures omitted",
                        self.study, ", ".join(missing), alteration_type.lower())
        return out

    # ---- alteration calls --------------------------------------------

    def mutation_rows(self, symbols: list[str]) -> list[dict]:
        """Raw mutation calls, each tagged with its gene symbol as `_sym`."""
        prof = self.profile_id("MUTATION_EXTENDED")
        if not prof:
            return []
        ids = {s: self.gene(s)["entrezGeneId"] for s in symbols}
        rows = self.http.post(
            f"{API}/molecular-profiles/{prof}/mutations/fetch",
            json_body={"entrezGeneIds": list(ids.values()),
                       "sampleListId": f"{self.study}_sequenced"},
            params={"projection": "SUMMARY"},
        )
        back = {v: k for k, v in ids.items()}
        out = []
        for r in rows:
            sym = back.get(r["entrezGeneId"])
            if sym:
                out.append({**r, "_sym": sym})
        return out

    def mutated_samples(self, symbols: list[str], rows: list[dict] | None = None) -> dict[str, set[str]]:
        rows = self.mutation_rows(symbols) if rows is None else rows
        out: dict[str, set[str]] = defaultdict(set)
        for r in rows:
            out[r["_sym"]].add(r["sampleId"])
        return out

    def allele_samples(self, rules, rows: list[dict]) -> dict[str, set[str]]:
        """{allele label: samples carrying it}, from calls already fetched."""
        out: dict[str, set[str]] = {rule.label: set() for rule in rules}
        for r in rows:
            for rule in rules:
                if r["_sym"] == rule.gene and allele_matches(rule, r):
                    out[rule.label].add(r["sampleId"])
        return out

    def mutation_hotspots(self, symbols: list[str], min_n: int = 2) -> dict[str, Any]:
        """Recurrent protein changes per gene, with their residue positions.

        Same endpoint as mutated_samples(), but asks for DETAILED rather than
        SUMMARY so the response carries proteinChange and proteinPosStart. The
        position is what turns a mutation list into a picture: H1047R sitting in
        the kinase domain and E545K in the helical domain is the whole reason
        those two alleles behave differently.

        `of` is the sequenced denominator, so a hotspot count is a share of
        tumours that were actually tested, never of the whole cohort.
        """
        prof = self.profile_id("MUTATION_EXTENDED")
        if not prof:
            return {}
        ids = {s: self.gene(s)["entrezGeneId"] for s in symbols}
        back = {v: k for k, v in ids.items()}
        # One sample per patient, like every other count here: MSK's 915 samples
        # are 860 patients, and a hotspot seen in two biopsies is one tumour.
        seq_all = set(self.sample_ids("sequenced"))
        chosen = self.one_per_patient(seq_all, prefer=seq_all)
        denom = len(chosen)

        rows = self.http.post(
            f"{API}/molecular-profiles/{prof}/mutations/fetch",
            json_body={"entrezGeneIds": list(ids.values()),
                       "sampleListId": f"{self.study}_sequenced"},
            params={"projection": "DETAILED"},
        )

        # gene -> proteinChange -> {n, pos, type, samples}
        acc: dict[str, dict[str, dict]] = defaultdict(dict)
        for r in rows:
            sym = back.get(r["entrezGeneId"])
            change = r.get("proteinChange")
            if not sym or not change or r["sampleId"] not in chosen:
                continue
            rec = acc[sym].setdefault(change, {
                "change": change,
                "pos": r.get("proteinPosStart"),
                "type": r.get("mutationType"),
                "samples": set(),
            })
            rec["samples"].add(r["sampleId"])

        out: dict[str, Any] = {}
        for sym in symbols:
            changes = acc.get(sym, {})
            listed = []
            for rec in changes.values():
                n = len(rec["samples"])
                if n < min_n or not isinstance(rec["pos"], int):
                    continue
                listed.append({
                    "change": rec["change"],
                    "pos": rec["pos"],
                    "type": rec["type"],
                    "n": n,
                    "of": denom,
                    "pct": round(100.0 * n / denom, 1) if denom else None,
                })
            listed.sort(key=lambda d: (-d["n"], d["pos"]))
            mutated = set()
            for rec in changes.values():
                mutated |= rec["samples"]
            out[sym] = {
                "hotspots": listed,
                "n_distinct_changes": len(changes),
                "n_mutated_samples": len(mutated),
                "of": denom,
                "min_n": min_n,
            }
        return out

    def cna_samples(self, symbols: list[str], event: str) -> dict[str, set[str]]:
        """event: AMP (high-level amplification) or HOMDEL (deep deletion)."""
        prof = self.profile_id("COPY_NUMBER_ALTERATION")
        if not prof:
            return {}
        ids = {s: self.gene(s)["entrezGeneId"] for s in symbols}
        rows = self.http.post(
            f"{API}/molecular-profiles/{prof}/discrete-copy-number/fetch",
            json_body={"entrezGeneIds": list(ids.values()),
                       "sampleListId": f"{self.study}_cna"},
            params={"discreteCopyNumberEventType": event, "projection": "SUMMARY"},
        )
        back = {v: k for k, v in ids.items()}
        out: dict[str, set[str]] = defaultdict(set)
        for r in rows:
            sym = back.get(r["entrezGeneId"])
            if sym:
                out[sym].add(r["sampleId"])
        return out

    def sv_samples(self, symbols: list[str]) -> dict[str, set[str]]:
        """Samples with a structural variant touching each gene, at either breakpoint.

        This counts rearrangements, not only in-frame fusions: an ALK
        breakpoint with an unnamed partner is still counted. That is the same
        definition cBioPortal's own "structural variant" frequency uses, and it
        is stated in the README rather than tightened silently.
        """
        prof = self.profile_id("STRUCTURAL_VARIANT")
        if not prof:
            return {}
        ids = {s: self.gene(s)["entrezGeneId"] for s in symbols}
        rows = self.http.post(
            f"{API}/structural-variant/fetch",
            json_body={"entrezGeneIds": list(ids.values()), "molecularProfileIds": [prof]},
        )
        wanted = set(symbols)
        out: dict[str, set[str]] = defaultdict(set)
        for r in rows or []:
            for side in ("site1HugoSymbol", "site2HugoSymbol"):
                sym = r.get(side)
                if sym in wanted:
                    out[sym].add(r["sampleId"])
        return out

    # ---- the shared counting core --------------------------------------

    def _alterations(self, genes: list[str]) -> dict[str, Any]:
        """Every call and every denominator the frequency functions need, once."""
        cancer = self.cancer
        alleles = list(cancer.alleles)
        fetch = list(genes) + [a.gene for a in alleles if a.gene not in genes]

        seq = self._try_sample_ids("sequenced")
        cna_list = self._try_sample_ids("cna")
        sv_list = self._try_sample_ids("sv") if self.profile_id("STRUCTURAL_VARIANT") else set()

        rows = self.mutation_rows(fetch)
        muts = self.mutated_samples(fetch, rows)
        amps = self.cna_samples(genes, "AMP") if cna_list else {}
        dels = self.cna_samples(genes, "HOMDEL") if cna_list else {}
        # Published "PTEN loss ~35%" style figures count hemizygous loss too,
        # so expose the union as well as the deep-deletion-only number.
        shallow = self.cna_samples(genes, "HETLOSS") if cna_list else {}
        fus = self.sv_samples(genes) if sv_list else {}

        prof_mut = self.profiled_by_gene("MUTATION_EXTENDED", "sequenced", fetch)
        prof_cna = self.profiled_by_gene("COPY_NUMBER_ALTERATION", "cna", genes) if cna_list else None
        prof_sv = self.profiled_by_gene("STRUCTURAL_VARIANT", "sv", genes) if sv_list else None

        # Named alleles (KRAS G12C, EGFR T790M) are mutation-only labels: the
        # drug is selected by the exact change, not by the gene being altered.
        allele_hits = self.allele_samples(alleles, rows)
        for rule in alleles:
            muts[rule.label] = allele_hits[rule.label]
            if prof_mut is not None:
                prof_mut[rule.label] = prof_mut.get(rule.gene, set())

        # Labels the hand-written data uses that are unions of real genes --
        # BRCA1/2 for breast, HRR and MMR for prostate, because that is how the
        # drug indications are written rather than gene by gene. A union is
        # profiled only where EVERY member was.
        #
        # A union of named alleles (melanoma: a GNAQ or GNA11 hotspot, one fact
        # about uveal melanoma spread over two genes) stays mutation-only, like
        # its members. Copy-number entries for it would print an amplification
        # count for a label no copy-number call can describe.
        allele_names = {a.label for a in alleles}
        combos = {k: list(v) for k, v in cancer.combos.items()}
        gene_combos: list[str] = []
        allele_combos: list[str] = []
        for label, members in combos.items():
            if members and all(m in allele_names for m in members):
                muts[label] = set().union(*(muts[m] for m in members))
                if prof_mut is not None:
                    prof_mut[label] = set.intersection(*(prof_mut[m] for m in members))
                allele_combos.append(label)
                continue
            gene_combos.append(label)
            muts[label] = set().union(*(muts.get(m, set()) for m in members))
            amps[label] = set().union(*(amps.get(m, set()) for m in members))
            dels[label] = set().union(*(dels.get(m, set()) for m in members))
            shallow[label] = set().union(*(shallow.get(m, set()) for m in members))
            fus[label] = set().union(*(fus.get(m, set()) for m in members))
            for pmap in (prof_mut, prof_cna, prof_sv):
                if pmap is not None:
                    sets = [pmap.get(m, set()) for m in members]
                    pmap[label] = set.intersection(*sets) if sets else set()

        return {
            "seq": seq, "cna": cna_list, "sv": sv_list,
            "muts": muts, "amps": amps, "dels": dels, "shallow": shallow, "fus": fus,
            "prof_mut": prof_mut, "prof_cna": prof_cna, "prof_sv": prof_sv,
            "labels": list(genes) + gene_combos,
            "allele_labels": [a.label for a in alleles] + allele_combos,
            "rows": rows,
        }

    @staticmethod
    def _gene_entries(alt: dict[str, Any], universe: set[str]) -> dict[str, Any]:
        """Per-gene metric records over one set of samples."""
        def rec(n: int, of: int) -> dict:
            return {"n": n, "of": of, "pct": round(100 * n / of, 1)}

        def covered(pmap, label, base: set[str]) -> set[str]:
            return base if pmap is None else base & pmap.get(label, set())

        seq_u = universe & alt["seq"]
        cna_u = universe & alt["cna"]
        sv_u = universe & alt["sv"]
        out: dict[str, Any] = {}
        for g in alt["labels"]:
            entry: dict[str, Any] = {}
            m_scope = covered(alt["prof_mut"], g, seq_u)
            if m_scope:
                entry["mutation"] = rec(len(alt["muts"].get(g, set()) & m_scope), len(m_scope))
            c_scope = covered(alt["prof_cna"], g, cna_u)
            if c_scope:
                na = len(alt["amps"].get(g, set()) & c_scope)
                nd = len(alt["dels"].get(g, set()) & c_scope)
                nl = len((alt["dels"].get(g, set()) | alt["shallow"].get(g, set())) & c_scope)
                entry["amplification"] = rec(na, len(c_scope))
                entry["deep_deletion"] = rec(nd, len(c_scope))
                entry["any_loss"] = rec(nl, len(c_scope))
            s_scope = covered(alt["prof_sv"], g, sv_u)
            if s_scope:
                entry["fusion"] = rec(len(alt["fus"].get(g, set()) & s_scope), len(s_scope))
            out[g] = entry
        for label in alt["allele_labels"]:
            m_scope = covered(alt["prof_mut"], label, seq_u)
            out[label] = {"mutation": rec(len(alt["muts"].get(label, set()) & m_scope), len(m_scope))} \
                if m_scope else {}
        return out

    # ---- the two products --------------------------------------------

    def _first_attr(self, names: tuple[str, ...]) -> dict[str, str]:
        """The first of several candidate attributes this cohort actually has.

        Cohorts spell the same classification differently -- PAM50_SUBTYPE in
        the published breast study, SUBTYPE in PanCanAtlas -- so the config
        lists them in preference order rather than picking one and hoping.
        """
        for name in names:
            got = self._clinical_by_sample(name)
            if got:
                return got
        return {}

    # ---- a classification derived from the calls ----------------------

    def classify(self) -> dict[str, Any]:
        """Assign each sample to the first rule of the cancer's classifier it satisfies.

        For cohorts that ship no label for the classification a treatment
        decision is made on (see cancers.Classifier). The rules live in the
        config; what "satisfies" means lives here.

        Absence is the hard part. A tumour never tested for an alteration has
        not been shown to lack it. So when a rule does not match and its test
        could not be read -- a gene off the sample's panel, a sample with no
        copy-number profile, an attribute value the rule does not list as a
        "no" -- classification STOPS for that sample. It is counted as
        unreadable at that rule and given no label, instead of falling through
        into a later class. Without this, every untested tumour would land in
        wild type, the one class that is defined by nothing being found.

        Returns {"labels": {sample: label}, "unreadable": {rule label: samples},
        "unlisted_values": {attribute: {value: samples}}}. Computed once.
        """
        if self._classified is not None:
            return self._classified
        spec = self.cancer.subtype_classifier
        if spec is None:
            raise RuntimeError(f"{self.cancer.id} declares no subtype_classifier")

        alleles = [a for r in spec.rules for a in r.alleles]
        mut_genes = sorted({a.gene for a in alleles})
        amp_genes = sorted({g for r in spec.rules for g in r.amplified})

        seq = self._try_sample_ids("sequenced")
        cna = self._try_sample_ids("cna") if amp_genes else set()
        rows = self.mutation_rows(mut_genes) if mut_genes else []
        hits = self.allele_samples(alleles, rows)
        amps = self.cna_samples(amp_genes, "AMP") if cna else {}
        prof_mut = self.profiled_by_gene("MUTATION_EXTENDED", "sequenced", mut_genes) if mut_genes else None
        prof_cna = self.profiled_by_gene("COPY_NUMBER_ALTERATION", "cna", amp_genes) if cna else None
        attrs = {r.attr: self._clinical_by_sample(r.attr) for r in spec.rules if r.attr}

        def tested(pmap, gene: str, base: set[str], sample: str) -> bool:
            return sample in base and (pmap is None or sample in pmap.get(gene, set()))

        labels: dict[str, str] = {}
        unreadable: dict[str, int] = defaultdict(int)
        unlisted: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        for sample in sorted(self.patient_of()):
            for rule in spec.rules:
                hit, readable = False, True
                if rule.attr:
                    value = attrs[rule.attr].get(sample)
                    if value in rule.positive:
                        hit = True
                    elif value not in rule.negative:
                        readable = False
                        unlisted[rule.attr][str(value)] += 1
                for a in rule.alleles:
                    if sample in hits[a.label]:
                        hit = True
                    elif not tested(prof_mut, a.gene, seq, sample):
                        readable = False
                for g in rule.amplified:
                    if sample in amps.get(g, set()):
                        hit = True
                    elif not tested(prof_cna, g, cna, sample):
                        readable = False
                if hit or (readable and rule.is_remainder):
                    labels[sample] = rule.label
                    break
                if not readable:
                    unreadable[rule.label] += 1
                    break

        if unreadable:
            log.warning("%s: %s — samples left unclassified rather than guessed",
                        self.study, ", ".join(f"{n} unreadable at '{k}'" for k, n in unreadable.items()))
        self._classified = {
            "labels": labels,
            "unreadable": dict(unreadable),
            "unlisted_values": {k: dict(v) for k, v in unlisted.items()},
        }
        return self._classified

    def classification_summary(self) -> dict[str, Any]:
        """How the classifier split the cohort, one sample per patient, every class listed."""
        cancer = self.cancer
        spec = cancer.subtype_classifier
        got = self.classify()
        chosen = self.one_per_patient(got["labels"].keys(), prefer=self._try_sample_ids("sequenced"))
        counts = Counter(got["labels"][s] for s in chosen)
        n = len(chosen)
        return {
            "name": spec.name,
            "note": spec.note,
            "n_patients": len(set(self.patient_of().values())),
            "n_classified": n,
            "classes": [{
                "label": r.label,
                "n": counts.get(r.label, 0),
                "of": n,
                "pct": round(100 * counts.get(r.label, 0) / n, 1) if n else None,
                "node": cancer.subtype_to_node.get(r.label),
                "excluded": r.label in cancer.subtype_excluded,
            } for r in spec.rules],
            "unreadable_samples": got["unreadable"],
            "unlisted_values": got["unlisted_values"],
        }

    def driver_frequencies(self, genes: list[str] | None = None) -> dict[str, Any]:
        cancer = self.cancer
        genes = list(genes or cancer.genes)
        if cancer.subtype_classifier is not None:
            subtype = self.classify()["labels"]
            if not subtype:
                raise RuntimeError(f"{self.study}: classifier {cancer.subtype_classifier.name} labelled nothing")
        else:
            subtype = self._first_attr(cancer.subtype_attr)
        if not subtype:
            raise RuntimeError(
                f"{self.study}: none of {'/'.join(cancer.subtype_attr)} is available"
            )

        alt = self._alterations(genes)
        chosen = self.one_per_patient(subtype.keys(), prefer=alt["seq"])
        if len(chosen) != len(subtype):
            log.info("%s: %d labelled samples from %d patients — counting one sample per patient",
                     self.study, len(subtype), len(chosen))

        # Cohorts spell the same call differently (PanCanAtlas uses BRCA_LumA,
        # TCGA prostate ships 1-ERG); the config carries the mapping.
        def norm(v: str) -> str:
            return cancer.subtype_labels.get(v, v)

        by_subtype: dict[str, list[str]] = defaultdict(list)
        for sample in chosen:
            by_subtype[norm(subtype[sample])].append(sample)

        result: dict[str, Any] = {}
        unmapped: list[str] = []
        for label, samples in sorted(by_subtype.items()):
            node = cancer.subtype_to_node.get(label)
            if node is None:
                # A class kept off every node on purpose (colorectal's MSI-H
                # tumours, which belong to the repair axis) is not a typo.
                if label not in cancer.subtype_excluded:
                    unmapped.append(label)
                continue
            s_set = set(samples)
            result[node] = {
                # Named for the classification this cohort used, not for PAM50
                # specifically -- every cancer has to satisfy this contract.
                "subtype_label": label,
                "n_samples": len(s_set),
                "n_sequenced": len(s_set & alt["seq"]),
                "n_cna_profiled": len(s_set & alt["cna"]),
                "genes": self._gene_entries(alt, s_set),
            }
            if alt["sv"]:
                result[node]["n_sv_profiled"] = len(s_set & alt["sv"])

        # A label the cohort uses and the config does not map is a silent hole:
        # the overlay simply has no figures for that subtype and nothing says
        # so. Cheap to say out loud, and it is how a typo in subtype_to_node
        # gets caught on the first run rather than in the rendered page.
        if unmapped:
            log.warning("%s: %d cohort label(s) map to no node id and were dropped: %s",
                        self.cancer.id, len(unmapped), ", ".join(sorted(unmapped)))
        return result

    def whole_cohort_frequencies(self, genes: list[str] | None = None,
                                 node: cancers.CohortNode | None = None) -> dict[str, Any]:
        """The same gene panel over an ENTIRE study, or a declared slice of one.

        `driver_frequencies` asks "how do these genes differ between subtypes of
        one cohort". This asks "what does this whole cohort look like", so that
        several cohorts can be compared with each other — which is the only way
        to show what a disease does after treatment, because the treated disease
        is a different cohort and not a subtype of the untreated one.

        A CohortNode may narrow the study first: by clinical attribute values
        (samples taken after targeted therapy) and by genotype (tumours carrying
        EGFR L858R or an exon 19 deletion). Both sides of a before-and-after
        contrast can then come from one study, which is how lung's resistance
        figures are built.

        Returns the same record shape, so the emitter and the viewer need no new
        vocabulary for it.
        """
        genes = list(genes or self.cancer.genes)
        alt = self._alterations(genes)

        universe = set(self.patient_of())
        if node is not None:
            if node.sample_scope:
                # Choose each patient's one sample within the scope FIRST, so
                # nodes that partition the same patients cannot share one.
                for attr, allowed in node.sample_scope:
                    vals = self._clinical_by_sample(attr)
                    universe = {s for s in universe if vals.get(s) in allowed}
                universe = self.one_per_patient(universe, prefer=alt["seq"])
            for attr, allowed in node.sample_filter:
                vals = self._clinical_by_sample(attr)
                universe = {s for s in universe if vals.get(s) in allowed}
            if node.requires:
                req_genes = sorted({r.gene for r in node.requires})
                req_rows = self.mutation_rows(req_genes)
                hit: set[str] = set()
                for r in req_rows:
                    if any(r["_sym"] == rule.gene and allele_matches(rule, r) for rule in node.requires):
                        hit.add(r["sampleId"])
                universe &= hit
        universe = self.one_per_patient(universe, prefer=alt["seq"])

        meta = self.study_meta()
        out = {
            "n_samples": len(universe),
            "n_sequenced": len(universe & alt["seq"]),
            "n_cna_profiled": len(universe & alt["cna"]),
            "genes": self._gene_entries(alt, universe),
            "n_study_samples": meta.get("allSampleCount"),
        }
        if alt["sv"]:
            out["n_sv_profiled"] = len(universe & alt["sv"])
        return out

    # ---- concordance -------------------------------------------------
    #
    # Two classifications cross-tabulated on the same samples: the measured
    # answer to "how much do these two systems actually disagree?".
    #
    # The rows always come from a clinical attribute. The columns come either
    # from another attribute -- prostate reads a Gleason category straight off
    # the record -- or from a DERIVATION, because breast's receptor class is not
    # stored anywhere: it is composed from three separate stains, each of which
    # can come back equivocal. That composition is logic, not configuration, so
    # it lives here and the config names it.

    def _derive_breast_ihc(self) -> dict[str, str]:
        """ER/PR/HER2 -> one of four receptor classes.

        Samples whose ER or HER2 stain is equivocal, missing or indeterminate
        are left out entirely rather than guessed into a box -- a wrong receptor
        class would move a tumour between the two groups this matrix exists to
        compare.
        """
        er = self._clinical_by_sample("ER_STATUS")
        pr = self._clinical_by_sample("PR_STATUS")
        her2 = self._clinical_by_sample("HER2_STATUS")
        if not (er and her2):
            return {}

        def pos(v: str | None) -> bool | None:
            if v is None:
                return None
            v = v.strip().lower()
            if v.startswith("pos"):
                return True
            if v.startswith("neg"):
                return False
            return None  # equivocal / not performed / indeterminate

        out: dict[str, str] = {}
        for s in er:
            e, p, h = pos(er.get(s)), pos(pr.get(s)), pos(her2.get(s))
            if e is None or h is None:
                continue
            hr = e or (p is True)
            if hr and not h:
                out[s] = "HR+/HER2-"
            elif hr and h:
                out[s] = "Triple positive"
            elif not hr and h:
                out[s] = "HER2+/HR-"
            elif p is None and not e:
                continue          # PR unknown and ER negative -- not callable
            else:
                out[s] = "TNBC"
        return out

    DERIVATIONS = {"breast_ihc": "_derive_breast_ihc"}

    def concordance(self) -> dict[str, Any]:
        spec = self.cancer.concordance
        if spec is None:
            return {"available": False,
                    "reason": f"{self.cancer.id} declares no concordance pair"}

        if spec.row_classifier:
            # The same derived classes the driver split uses, so a row of the
            # matrix and a node on the axis cannot disagree about a tumour.
            rows = self.classify()["labels"]
            no_rows = f"{self.study}: classifier {self.cancer.subtype_classifier.name} labelled nothing"
        else:
            rows = self._first_attr(spec.row_attr)
            no_rows = f"{self.study} has none of {'/'.join(spec.row_attr)}"
        if not rows:
            return {"available": False, "reason": no_rows}

        if spec.col_derive:
            cols = getattr(self, self.DERIVATIONS[spec.col_derive])()
            col_source = f"derived: {spec.col_derive}"
        else:
            cols = self._first_attr(spec.col_attr)
            col_source = "/".join(spec.col_attr)
        if not cols:
            return {"available": False,
                    "reason": f"{self.study} has no usable column classification ({col_source})"}

        # One sample per patient, chosen among samples carrying BOTH calls. A
        # patient with two biopsies is one person in a table about people, and
        # lifting a patient-level attribute onto every sample would otherwise
        # count them once per sample.
        chosen = self.one_per_patient(rows.keys(), prefer=set(cols))

        matrix: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        n = 0
        for sample in sorted(chosen):
            raw_row = rows[sample]
            raw_col = cols.get(sample)
            if raw_col is None:
                continue
            matrix[spec.row_labels.get(raw_row, raw_row)][spec.col_labels.get(raw_col, raw_col)] += 1
            n += 1

        def pct(a: int, b: int) -> float | None:
            return round(100 * a / b, 1) if b else None

        # Every headline cell is quoted BOTH ways, because the two shares are
        # different numbers and quoting one implies the other. 83% of basal-like
        # tumours being TNBC does not mean 83% of TNBC is basal-like.
        headline: dict[str, Any] = {}
        for cell in spec.headline:
            row = matrix.get(cell.row, {})
            hit = row.get(cell.col, 0)
            row_total = sum(row.values())
            col_total = sum(v.get(cell.col, 0) for v in matrix.values())
            headline[cell.forward_key] = {
                "n": hit, "of": row_total, "pct": pct(hit, row_total),
                "label": cell.forward_label or cell.forward_key,
                "claim": cell.claim,
            }
            headline[cell.reverse_key] = {
                "n": hit, "of": col_total, "pct": pct(hit, col_total),
                "label": cell.reverse_label or cell.reverse_key,
                "claim": cell.claim,
            }

        out: dict[str, Any] = {
            "available": True,
            "n_classified": n,
            "row_label": spec.row_label,
            "col_label": spec.col_label,
            "matrix": {k: dict(v) for k, v in matrix.items()},
            "headline": headline,
        }
        # Declared order first, then anything the cohort produced that the
        # config did not anticipate -- a new label must appear rather than
        # vanish because it was left out of the order tuple.
        if spec.row_order:
            seen = [r for r in spec.row_order if r in matrix]
            out["row_order"] = seen + [r for r in matrix if r not in seen]
        if spec.col_order:
            col_seen = []
            for row in matrix.values():
                for c in row:
                    if c not in col_seen:
                        col_seen.append(c)
            seen_c = [c for c in spec.col_order if c in col_seen]
            out["col_order"] = seen_c + [c for c in col_seen if c not in seen_c]
        if spec.note:
            out["note"] = spec.note
        return out

    def survival(self, subtype_attr: str | None = None) -> dict[str, Any]:
        """Median overall survival per subtype.

        Cohort choice is not cosmetic here. Median OS is undefined until more
        than half the group has had the event, and TCGA has far too few deaths
        (11 of 98 basal-like) — every subtype would read "not reached". METABRIC
        has mature follow-up and can support it. We return null with a reason
        rather than a number computed from a minority of events.
        """
        import statistics

        subtype_attr = subtype_attr or self.cancer.survival_attr
        months = self._clinical_by_sample("OS_MONTHS")
        status = self._clinical_by_sample("OS_STATUS")
        subtype = self._clinical_by_sample(subtype_attr)
        if not (months and status and subtype):
            return {"available": False,
                    "reason": f"{self.study} lacks OS_MONTHS / OS_STATUS / {subtype_attr}"}

        groups: dict[str, list[tuple[float, bool]]] = defaultdict(list)
        for sample in self.one_per_patient(subtype.keys(), prefer=set(months)):
            label = subtype[sample]
            if sample not in months:
                continue
            try:
                m = float(months[sample])
            except (TypeError, ValueError):
                continue
            dead = str(status.get(sample, "")).strip().startswith("1")
            groups[label].append((m, dead))

        out: dict[str, Any] = {}
        for label, rows in sorted(groups.items()):
            deaths = sum(1 for _, d in rows if d)
            n = len(rows)
            event_times = sorted(m for m, d in rows if d)
            if n and deaths / n > 0.5:
                median = round(statistics.median(event_times), 1)
                note = None
            else:
                median = None
                note = (f"median not reached — only {deaths}/{n} events "
                        "(>50% required for a defined median)")
            out[label] = {"n": n, "deaths": deaths,
                          "median_os_months": median, "note": note}

        return {"available": True, "subtype_attribute": subtype_attr, "by_subtype": out}

    def collect(self) -> dict[str, Any]:
        meta = self.study_meta()
        out = {
            "source": "cBioPortal",
            "api": API,
            # Stamped so a facts file can never be read as the wrong cancer's.
            "cancer": self.cancer.id,
            "study": {
                "id": self.study,
                "name": meta.get("name"),
                "citation": meta.get("citation"),
                "pmid": meta.get("pmid"),
                "n_samples": meta.get("allSampleCount"),
                "n_patients": len(set(self.patient_of().values())),
            },
            "drivers_by_subtype": self.driver_frequencies(),
            "concordance": self.concordance(),
        }
        if self.cancer.subtype_classifier is not None:
            out["classification"] = self.classification_summary()
        return out
