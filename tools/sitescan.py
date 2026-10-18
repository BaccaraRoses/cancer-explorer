"""tools/sitescan.py -- nothing that identifies the user, a machine or a secret reaches the site.

    python tools/sitescan.py                  # the project's four site paths
    python tools/sitescan.py C:/Developer/cancer-explorer-deploy-2026-09-28
                                              # a staged copy, before it is uploaded

The site is published under a pseudonym (Netlify Drop), and a drag-and-drop
upload ships every byte of the folder. Until 2026-09-28 the Targets lens printed
`../cancer_research/pipeline.csv` and `pipeline/facts/<cancer>.trials.json` to
every visitor, and each targets overlay carried `cancer_research\\pipeline.csv`:
no check read the site for local paths. This one does, and fails on:

  file       a file that must never ship: .env*, .git*, a pipeline/ folder,
             Python, logs, source maps, OS litter. A staged copy must also hold
             exactly the four site paths and nothing beside them.
  identity   the identity strings listed in ~/.claude/CLAUDE.md ("## Identity"),
             read at run time. They are never copied into this repository: that
             file is where they live so no project has to carry them. A token
             starting with "." (".env") is a file name, not text.
  secret     a value from pipeline/.env found in any site file (the value is
             never printed), or a credential shape: sk-, AKIA, gh?_, a private
             key block, an api_key= / token= / email= URL parameter.
  path       a drive path, a home folder, AppData or a conda env, the sibling
             cancer_research/ folder, the pipeline's drug_source key, or a
             pipeline/facts|cache path inside a string literal (source comments
             may name the tools; strings can reach the page).
  host       localhost, a private LAN address, a *.local host, or the host of
             one of this repository's git remotes (read at run time, so no
             station's git host is named here; hosted services are skipped).
  email      any e-mail address.
  metadata   EXIF/XMP (APP1), Photoshop/IPTC (APP13) or a comment in a JPEG;
             text chunks in a PNG.

If the identity list cannot be read the scan fails: a check that silently
skipped its main job would read as a pass.
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE_PATHS = ("index.html", "css", "js", "data")
IDENTITY_FILE = Path.home() / ".claude" / "CLAUDE.md"
ENV_FILE = ROOT / "pipeline" / ".env"
TEXT_SUFFIXES = {".js", ".html", ".htm", ".css", ".json", ".md", ".txt", ".svg", ".xml", ".csv"}

BAD_NAME = re.compile(r"^(\.env.*|\.git.*|thumbs\.db|desktop\.ini|\.ds_store)$", re.I)
BAD_SUFFIX = {".py", ".pyc", ".log", ".map", ".ps1", ".hta", ".bak", ".tmp"}

TEXT_RULES: list[tuple[str, re.Pattern]] = [
    ("path", re.compile(r"(?<![A-Za-z])[A-Za-z]:(?:\\\\|\\|/)(?=[A-Za-z])")),
    ("path", re.compile(r"/(?:Users|home)/[A-Za-z]")),
    ("path", re.compile(r"AppData|anaconda3|\.conda[\\/]", re.I)),
    ("path", re.compile(r"cancer_research")),
    ("path", re.compile(r"drug_source")),
    ("path", re.compile(r"[\"'][^\"'\n]*\bpipeline/(?:facts|cache|\.env)")),
    ("host", re.compile(r"\blocalhost\b|\b127\.0\.0\.1\b|\b192\.168\.\d|\b[\w-]+\.local\b", re.I)),
    ("email", re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b")),
    ("secret", re.compile(r"\bsk-[A-Za-z0-9_-]{20,}|\bAKIA[0-9A-Z]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}"
                          r"|-----BEGIN [A-Z ]*PRIVATE KEY")),
    ("secret", re.compile(r"[?&](?:api_?key|apikey|token|access_token|client_secret|email)=", re.I)),
]


HOSTED = ("github", "gitlab", "bitbucket", "codeberg")
REMOTE_HOST = re.compile(r"^[a-z][\w+.-]*://(?:[^@/]+@)?(?P<url>[^:/]+)|^(?:[^@/:]+@)?(?P<scp>[^:/]{2,}):(?!//)")


def git_hosts(repo: Path = ROOT) -> list[str]:
    """The host of each of the repository's git remotes, minus hosted services. A
    private git host names a station, and each station reaches it under its own name."""
    try:
        out = subprocess.run(["git", "-C", str(repo), "remote", "-v"], capture_output=True,
                             text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        return []
    hosts = set()
    for ln in out.splitlines():
        m = REMOTE_HOST.match(ln.split()[1]) if len(ln.split()) > 1 else None
        host = m and (m.group("url") or m.group("scp")).lower()
        if host and not any(h in host for h in HOSTED):
            hosts.add(host)
    return sorted(hosts)


def identity_terms(path: Path = IDENTITY_FILE) -> list[str] | None:
    """The backticked tokens in the "## Identity" section, or None when there are none."""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError:
        return None
    m = re.search(r"^## Identity\s*$(.*?)(?=^## |\Z)", text, re.M | re.S)
    terms = re.findall(r"`([^`]+)`", m.group(1)) if m else []
    return terms or None


def env_values(path: Path = ENV_FILE) -> dict[str, str]:
    """KEY -> value for each real assignment in a .env file. Short values are skipped:
    they would match by chance and identify nothing."""
    out: dict[str, str] = {}
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except OSError:
        return out
    for ln in lines:
        ln = ln.strip()
        if not ln or ln.startswith("#") or "=" not in ln:
            continue
        key, _, val = ln.partition("=")
        val = val.strip().strip("\"'")
        if len(val) >= 8:
            out[key.strip()] = val
    return out


def site_files(root: Path, staged: bool) -> tuple[list[Path], list[str]]:
    problems = []
    if staged:
        extra = sorted(p.name for p in root.iterdir() if p.name not in SITE_PATHS)
        missing = [s for s in SITE_PATHS if not (root / s).exists()]
        problems += [f"{n}: file: not one of the four site paths" for n in extra]
        problems += [f"{n}: file: site path missing" for n in missing]
        tops = [root / p.name for p in root.iterdir()]
    else:
        tops = [root / s for s in SITE_PATHS if (root / s).exists()]
    files = []
    for t in tops:
        files += [t] if t.is_file() else sorted(p for p in t.rglob("*") if p.is_file())
        if t.is_dir() and t.name.lower() == "pipeline":
            problems.append(f"{t.name}/: file: the pipeline folder never ships")
    return files, problems


def image_metadata(data: bytes, suffix: str) -> list[str]:
    found = []
    if suffix in (".jpg", ".jpeg") and data[:2] == b"\xff\xd8":
        i = 2
        while i + 4 <= len(data) and data[i] == 0xFF:
            marker = data[i + 1]
            if marker == 0xDA:  # start of scan: no metadata after this
                break
            if marker == 0xE1:
                found.append("EXIF/XMP (APP1)")
            elif marker == 0xED:
                found.append("Photoshop/IPTC (APP13)")
            elif marker == 0xFE:
                found.append("comment (COM)")
            i += 2 + int.from_bytes(data[i + 2:i + 4], "big")
    elif suffix == ".png" and data[:8] == b"\x89PNG\r\n\x1a\n":
        i = 8
        while i + 8 <= len(data):
            n = int.from_bytes(data[i:i + 4], "big")
            kind = data[i + 4:i + 8]
            if kind in (b"tEXt", b"iTXt", b"zTXt", b"eXIf"):
                found.append(f"{kind.decode()} chunk")
            i += 12 + n
    return found


def text_forms(identity: list[str]) -> list[str]:
    """The identity tokens that are text (not file names), lowercased, each also as
    JSON and JS write it (backslash doubled) and with forward slashes: data/*.js is
    JSON, so a Windows home path ships with its backslashes doubled."""
    return sorted({v.lower() for t in identity if not t.startswith(".")
                   for v in (t, t.replace("\\", "\\\\"), t.replace("\\", "/"))})


def scan(root: Path, identity: list[str], secrets: dict[str, str], staged: bool = False,
         hosts: list[str] = ()) -> list[str]:
    files, problems = site_files(root, staged)
    rules = list(TEXT_RULES)
    extra = [h for h in hosts if not any(k == "host" and rx.search(h) for k, rx in TEXT_RULES)]
    if extra:  # whole names only: a remote host "box" must not flag "boxplot"
        rules.append(("host", re.compile("|".join(rf"(?<![\w.-]){re.escape(h)}(?![\w-])" for h in extra), re.I)))
    name_terms = [t for t in identity if t.startswith(".")]
    text_terms = text_forms(identity)
    for p in files:
        rel = p.relative_to(root).as_posix()
        low_parts = [s.lower() for s in p.relative_to(root).parts]
        if any(BAD_NAME.match(s) for s in low_parts) or p.suffix.lower() in BAD_SUFFIX:
            problems.append(f"{rel}: file: must never ship")
        if any(s.startswith(t.lower()) for t in name_terms for s in low_parts):
            problems.append(f"{rel}: identity: file name matches an identity token")
        if "pipeline" in low_parts[:-1]:
            problems.append(f"{rel}: file: inside a pipeline folder")
        data = p.read_bytes()
        low = data.decode("latin-1").lower()
        for t in text_terms:
            if t in low:
                problems.append(f"{rel}: identity: contains an identity string from ~/.claude/CLAUDE.md")
        for key, val in secrets.items():
            if val.encode("utf-8") in data:
                problems.append(f"{rel}: secret: contains the value of {key} from pipeline/.env")
        problems += [f"{rel}: metadata: {m}" for m in image_metadata(data, p.suffix.lower())]
        if p.suffix.lower() in TEXT_SUFFIXES:
            text = data.decode("utf-8", errors="replace")
            for lineno, line in enumerate(text.splitlines(), 1):
                for kind, rx in rules:
                    m = rx.search(line)
                    if m:
                        # show the match, not the line: a line may itself hold what we guard
                        problems.append(f"{rel}:{lineno}: {kind}: {m.group(0)[:60]!r}")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description="Scan the site (or a staged copy) for identity, secrets and local paths.")
    ap.add_argument("site", nargs="?", help="a staged folder; omitted, the project's four site paths")
    ap.add_argument("--identity", default=str(IDENTITY_FILE), help="file with the '## Identity' section")
    args = ap.parse_args()
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    identity = identity_terms(Path(args.identity))
    if identity is None:
        print(f"sitescan: FAIL -- no identity list in {args.identity} (a '## Identity' section with `tokens`)")
        return 1
    root = Path(args.site).resolve() if args.site else ROOT
    problems = scan(root, identity, env_values(), staged=bool(args.site), hosts=git_hosts())
    n = len(site_files(root, bool(args.site))[0])
    for pr in problems:
        print(pr)
    print(f"sitescan: {'PASS' if not problems else 'FAIL'} -- {n} files, {len(identity)} identity tokens, "
          f"{len(problems)} problem(s)")
    return 0 if not problems else 1


if __name__ == "__main__":
    raise SystemExit(main())
