"""cxp — Cancer Explorer Pipeline.

Deterministic fetch + compute layer that feeds ../data/*.js.

Design rule: machine-derived facts and human judgement live in separate files
and are merged, never interleaved. A re-run may freely overwrite `facts/`;
it must never overwrite `curation/`. That is what keeps an assertion from
being laundered into looking like a fetched fact.
"""

__version__ = "0.1.0"
