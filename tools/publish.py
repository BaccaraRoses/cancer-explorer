"""tools/publish.py -- a fresh-history snapshot of this repository for the public GitHub mirror.

    python tools/publish.py                    # dry run: export HEAD, gate it, say what would go
    python tools/publish.py --keep DIR         # the same, and leave the export in DIR to read
    python tools/publish.py --commit           # write the snapshot into the mirror clone, commit it
    python tools/publish.py --push             # commit, then push once GitHub greets the owner
    python tools/publish.py --init REMOTE --name NAME --email EMAIL
                                               # once per station: create the mirror clone

Why a mirror and not this repository: every commit here carries the user's real
name, and three carry a Windows home path. Rewriting this history would change
the hashes the notes cite, and one missed blob is permanent once public. So the
mirror gets snapshots instead: each one a new commit in a separate clone whose
history has never held anything else. This repository stays the private record.

  export   `git archive HEAD` of PATHS, plus the curated inputs of the sibling
           repository ../cancer_research/ at its HEAD (RESEARCH_PATHS), placed
           under cancer_research/ (pipeline/run.py looks there first). Committed
           files only: never the working tree, pipeline/.env or a cache.
  gate     refuses the snapshot on any of:
             file      a dot-file or dot-folder (but .gitignore, .gitattributes and
                       an .env.example whose every value is empty), __pycache__,
                       a cache or logs folder, *.pyc, *.log, a symbolic link
             identity  a token from the "## Identity" section of ~/.claude/CLAUDE.md,
                       in any file or file name, matched as sitescan matches it
             local     this station's login name, host name or home folder (read
                       at run time), or any home-folder path
             secret    a value from pipeline/.env, or a credential shape
             site      tools/sitescan.py's full rules over the four site paths
           Nothing the gate reads is written into this repository or the snapshot.
  commit   in the mirror clone (default ../cancer-explorer-mirror), as the name and
           GitHub noreply address in that clone's own .git/config, so the pseudonym
           is named nowhere in this repository. The date is midnight UTC of the day:
           neither the zone nor the hour of work shows. The message names the
           private commits the snapshot came from, and both must already be on a
           remote branch, so every snapshot traces to the private history.
  push     only through an SSH host alias, never github.com itself (the regular
           account on these stations), and only after `ssh -T` through that alias
           greets the login that owns the remote. Every commit in the mirror is
           checked first: the persona, a UTC date, and a snapshot message.

Exit 0 when the requested step finished; 1 on any refusal, with every reason.
"""
from __future__ import annotations

import argparse
import getpass
import io
import os
import re
import shutil
import socket
import subprocess
import sys
import tarfile
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sitescan  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT.parent / "cancer_research"
MIRROR = ROOT.parent / "cancer-explorer-mirror"
ENV_FILE = ROOT / "pipeline" / ".env"

# The user's ruling of 2026-10-17. notes/, HANDOFF.md and CLAUDE.md describe the
# stations and how the pseudonym is kept; tools/autophase/ is the unattended
# runner. None of them is published.
PATHS = ("index.html", "css", "js", "data", "pipeline", "tools", "README.md", "SCHEMA.md",
         "ATTRIBUTION.md", "LICENSE", ".gitattributes", ".gitignore", ":(exclude)tools/autophase")
# The sibling repository's curated inputs. Its HANDOFF.md stays private.
RESEARCH_PATHS = ("SOURCES.md", ":(glob)*.csv", ":(glob)*-landscape.md")
RESEARCH_DIR = "cancer_research"

HOSTED = ("github", "gitlab", "bitbucket", "codeberg")
# The message names no host: GitHub shows it to every reader of the repository.
MESSAGE_PREFIX = "Snapshot of "
MESSAGE = MESSAGE_PREFIX + "cancer-explorer {head}, cancer_research {research}"
NOREPLY = "@users.noreply.github.com"
REMOTE = re.compile(r"^git@(?P<alias>[^:@/\s]+):(?P<owner>[A-Za-z0-9-]+)/(?P<repo>[\w.-]+?)(?:\.git)?$")

ALLOWED_DOTFILES = {".gitignore", ".gitattributes", ".env.example"}
BAD_PART = re.compile(r"^(\..*|__pycache__|cache|logs|venv|node_modules|thumbs\.db|desktop\.ini)$", re.I)
BAD_SUFFIX = {".pyc", ".pyo", ".log", ".bak", ".tmp", ".swp"}
# A home folder in a path. Not after a word character or a dot, so the /home/ of a
# web address (example.org/home/...) is not one.
HOME = re.compile(r"(?<![\w.-])/(?:home|Users)/[A-Za-z0-9]")
SECRET_RULES = [rx for kind, rx in sitescan.TEXT_RULES if kind == "secret"]


class Refusal(Exception):
    """A reason the step must not go ahead; one per line."""


def git(repo: Path, *args: str, env: dict[str, str] | None = None) -> str:
    p = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True,
                       encoding="utf-8", errors="replace", env=env)
    if p.returncode:
        raise Refusal(f"git {' '.join(a for a in args if not a.startswith('-'))[:60]} in {repo.name}: "
                      f"{(p.stderr or p.stdout).strip()[:300]}")
    return p.stdout.strip()


# --- export -------------------------------------------------------------------------
def archive(repo: Path, paths: tuple[str, ...], dest: Path) -> str:
    """Extract the files HEAD commits under paths into dest; return HEAD's hash."""
    head = git(repo, "rev-parse", "HEAD")
    p = subprocess.run(["git", "-C", str(repo), "archive", "--format=tar", head, "--", *paths],
                       capture_output=True)
    if p.returncode:
        raise Refusal(f"git archive in {repo.name}: {p.stderr.decode('utf-8', 'replace').strip()[:300]}")
    dest.mkdir(parents=True, exist_ok=True)
    safe = {"filter": "data"} if hasattr(tarfile, "data_filter") else {}
    with tarfile.open(fileobj=io.BytesIO(p.stdout)) as tf:
        tf.extractall(dest, **safe)
    return head


def export(dest: Path, root: Path = ROOT, research: Path = RESEARCH) -> tuple[str, str]:
    """The snapshot's files, in dest. Returns the two HEADs it was made from."""
    head = archive(root, PATHS, dest)
    if (dest / RESEARCH_DIR).exists():
        raise Refusal(f"{RESEARCH_DIR}/ is committed in {root.name} too: the snapshot would merge two copies")
    return head, archive(research, RESEARCH_PATHS, dest / RESEARCH_DIR)


# --- gate ---------------------------------------------------------------------------
def local_terms() -> dict[str, str]:
    """This station's login name, host name and home folder. They name a machine and
    often a person, and no fixed list could know them; read here, stored nowhere."""
    found = {"login name": getpass.getuser(), "host name": socket.gethostname().split(".")[0],
             "home folder": str(Path.home())}
    return {what: v for what, v in found.items() if len(v) >= 4}


def gate(root: Path, identity: list[str], secrets: dict[str, str], local: dict[str, str]) -> list[str]:
    """Every reason the export at root must not be published; empty means it may be."""
    problems: list[str] = []
    name_terms = [t.lower() for t in identity if t.startswith(".")]
    terms = [("identity", t, "an identity string from ~/.claude/CLAUDE.md") for t in sitescan.text_forms(identity)]
    terms += [("local", t, f"this station's {what}") for what, v in local.items() for t in sitescan.text_forms([v])]
    for p in sorted(q for q in root.rglob("*") if q.is_file() or q.is_symlink()):
        rel = p.relative_to(root).as_posix()
        parts = p.relative_to(root).parts
        if p.is_symlink():
            problems.append(f"{rel}: file: a symbolic link")
            continue
        if any(BAD_PART.match(s) and s not in ALLOWED_DOTFILES for s in parts) or p.suffix.lower() in BAD_SUFFIX:
            problems.append(f"{rel}: file: must never be published")
        if any(s.lower().startswith(t) for t in name_terms for s in parts if s not in ALLOWED_DOTFILES):
            problems.append(f"{rel}: identity: file name matches an identity token")
        data = p.read_bytes()
        low = data.decode("latin-1").lower()
        for kind, t, what in terms:
            if t in rel.lower():
                problems.append(f"{rel}: {kind}: file name contains {what}")
            i = low.find(t)
            if i >= 0:
                problems.append(f"{rel}:{low.count(chr(10), 0, i) + 1}: {kind}: contains {what}")
        for key, val in secrets.items():
            if val.encode("utf-8") in data:
                problems.append(f"{rel}: secret: contains the value of {key} from pipeline/.env")
        if b"\0" in data[:8192]:
            continue  # binary: the byte checks above are all that apply
        for lineno, line in enumerate(data.decode("utf-8", errors="replace").splitlines(), 1):
            m = HOME.search(line)
            if m:
                problems.append(f"{rel}:{lineno}: local: a home-folder path {m.group(0)!r}")
            if any(rx.search(line) for rx in SECRET_RULES):
                # the kind only: the match may be the credential itself
                problems.append(f"{rel}:{lineno}: secret: a credential shape")
            s = line.strip()
            if p.name == ".env.example" and s and not s.startswith("#") and s.partition("=")[2].strip():
                problems.append(f"{rel}:{lineno}: secret: an example env file assigns a value")
    problems += [f"site: {pr}" for pr in sitescan.scan(root, identity, secrets)]
    return problems


# --- provenance and persona ---------------------------------------------------------
def provenance_problems(repo: Path) -> list[str]:
    """The private repository must have no hosted remote, and its HEAD must be on a
    remote branch, so the snapshot's message names a commit the private remote holds."""
    out = []
    remotes = {ln.split()[0]: ln.split()[1] for ln in git(repo, "remote", "-v").splitlines() if ln.strip()}
    for name, url in sorted(remotes.items()):
        if any(h in url.lower() for h in HOSTED):
            out.append(f"{repo.name}: remote {name} points at a hosted service; this history never leaves the stations")
    if not git(repo, "branch", "-r", "--contains", "HEAD"):
        out.append(f"{repo.name}: HEAD is on no remote branch; push it first")
    return out


def persona(mirror: Path) -> tuple[str, str, str]:
    """The mirror clone's own user.name, user.email and origin URL. --local only: the
    global config here holds the real name, and must never fill a gap."""
    if not (mirror / ".git").is_dir():
        raise Refusal(f"no mirror clone at {mirror}; create it once with --init")

    def local(key: str) -> str:
        p = subprocess.run(["git", "-C", str(mirror), "config", "--local", "--get", key],
                           capture_output=True, text=True)
        return p.stdout.strip()
    return local("user.name"), local("user.email"), local("remote.origin.url")


def persona_problems(name: str, email: str, url: str, identity: list[str]) -> list[str]:
    out = []
    m = REMOTE.match(url)
    if not m:
        out.append("remote: not an SSH remote of the form git@<alias>:<owner>/<repo>.git")
    elif m["alias"].lower() == "github.com":
        out.append("remote: github.com itself is the regular account on these stations; use the pseudonym's host alias")
    if not name.strip():
        out.append("name: empty")
    if not email.lower().endswith(NOREPLY):
        out.append(f"email: not a GitHub noreply address (...{NOREPLY})")
    elif m and email.lower()[:-len(NOREPLY)].split("+")[-1] != m["owner"].lower():
        out.append("email: the noreply address is another account's than the remote's owner")
    forms = sitescan.text_forms(identity)
    for field, value in (("name", name), ("email", email), ("remote", url)):
        if any(t in value.lower() for t in forms):
            out.append(f"{field}: contains an identity string from ~/.claude/CLAUDE.md")
    return out


def history_problems(mirror: Path, name: str, email: str, identity: list[str]) -> list[str]:
    """Every commit in the mirror must be one this tool made."""
    if subprocess.run(["git", "-C", str(mirror), "rev-parse", "-q", "--verify", "HEAD"],
                      capture_output=True).returncode:
        return []  # no commit yet
    log = git(mirror, "log", "--date=raw", "--format=%h%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%ad%x1f%cd%x1f%B%x1e")
    forms = sitescan.text_forms(identity)
    out = []
    for rec in filter(None, (r.strip() for r in log.split("\x1e"))):
        h, an, ae, cn, ce, ad, cd, body = rec.split("\x1f")
        if (an, ae, cn, ce) != (name, email, name, email):
            out.append(f"{h}: commit: author or committer is not the mirror's persona")
        if not (ad.endswith(" +0000") and cd.endswith(" +0000")):
            out.append(f"{h}: commit: date not in UTC")
        if not body.startswith(MESSAGE_PREFIX):
            out.append(f"{h}: commit: not a snapshot made by tools/publish.py")
        if any(t in rec.lower() for t in forms):
            out.append(f"{h}: commit: metadata contains an identity string")
    return out


# --- commit and push ----------------------------------------------------------------
def utc_day(now: datetime | None = None) -> str:
    """Git's date for a snapshot: midnight UTC of the day."""
    now = (now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    midnight = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)
    return f"@{int(midnight.timestamp())} +0000"


def commit_snapshot(mirror: Path, snapshot: Path, message: str, name: str, email: str) -> str | None:
    """Replace the mirror clone's tree with the snapshot and commit it as the persona.
    The new commit's hash, or None when nothing changed since the last snapshot."""
    if git(mirror, "status", "--porcelain"):
        raise Refusal("the mirror clone has uncommitted changes; only this tool writes there")
    for p in mirror.iterdir():
        if p.name != ".git":
            shutil.rmtree(p) if p.is_dir() and not p.is_symlink() else p.unlink()
    shutil.copytree(snapshot, mirror, dirs_exist_ok=True)
    git(mirror, "add", "-A")
    # The snapshot's own .gitignore must not drop a file from it unseen.
    staged = set(filter(None, git(mirror, "ls-files", "-z").split("\0")))
    wanted = {p.relative_to(snapshot).as_posix() for p in snapshot.rglob("*") if p.is_file()}
    if staged != wanted:
        raise Refusal(f"the mirror's index is not the snapshot: {len(wanted - staged)} file(s) unstaged, "
                      f"{len(staged - wanted)} extra; `git -C {mirror} reset --hard` restores the last snapshot")
    if subprocess.run(["git", "-C", str(mirror), "diff", "--cached", "--quiet"]).returncode == 0:
        return None
    day = utc_day()
    env = {**os.environ, "GIT_AUTHOR_NAME": name, "GIT_AUTHOR_EMAIL": email, "GIT_AUTHOR_DATE": day,
           "GIT_COMMITTER_NAME": name, "GIT_COMMITTER_EMAIL": email, "GIT_COMMITTER_DATE": day}
    # No signing (a global signing key would carry the real name) and no hooks.
    git(mirror, "-c", "commit.gpgsign=false", "commit", "--no-verify", "-q", "-m", message, env=env)
    return git(mirror, "rev-parse", "HEAD")


def alias_problems(alias: str) -> list[str]:
    """ssh must resolve the alias to github.com and offer only the alias's own key:
    otherwise the agent's key order, not the alias, decides who pushes."""
    p = subprocess.run(["ssh", "-G", alias], capture_output=True, text=True)
    conf = dict(ln.split(" ", 1) for ln in p.stdout.splitlines() if " " in ln)
    out = []
    if conf.get("hostname") != "github.com":
        out.append(f"ssh: {alias} does not resolve to github.com")
    if conf.get("identitiesonly") != "yes":
        out.append(f"ssh: {alias} is not IdentitiesOnly, so another key could be offered")
    return out


def greeting(alias: str) -> str | None:
    """The login GitHub greets through alias (`ssh -T`), or None."""
    try:
        p = subprocess.run(["ssh", "-T", "-o", "BatchMode=yes", f"git@{alias}"],
                           capture_output=True, text=True, timeout=60)
    except (OSError, subprocess.TimeoutExpired):
        return None
    m = re.search(r"^Hi ([A-Za-z0-9-]+)!", p.stdout + p.stderr, re.M)
    return m.group(1) if m else None


def account_problems(url: str) -> list[str]:
    m = REMOTE.match(url)
    if not m:
        return ["remote: not an SSH remote of the form git@<alias>:<owner>/<repo>.git"]
    out = alias_problems(m["alias"])
    who = greeting(m["alias"])
    if who is None:
        out.append(f"ssh: GitHub greeted no one through {m['alias']}")
    elif who.lower() != m["owner"].lower():
        out.append(f"ssh: {m['alias']} logs in as {who}, not {m['owner']}, who owns the remote")
    return out


def init(mirror: Path, url: str, name: str, email: str, identity: list[str]) -> None:
    problems = persona_problems(name, email, url, identity)
    if mirror.exists() and any(mirror.iterdir()):
        problems.append(f"{mirror} exists and is not empty")
    problems = problems or account_problems(url)
    if problems:
        raise Refusal("\n".join(problems))
    p = subprocess.run(["git", "ls-remote", url], capture_output=True, text=True)
    if p.returncode:
        raise Refusal(f"git ls-remote: {p.stderr.strip()[:300]}")
    mirror.parent.mkdir(parents=True, exist_ok=True)
    if p.stdout.strip():  # another station published already: continue its history
        git(mirror.parent, "clone", "-q", url, mirror.name)
    else:
        mirror.mkdir(exist_ok=True)
        git(mirror, "init", "-q", "-b", "main")
        git(mirror, "remote", "add", "origin", url)
    git(mirror, "config", "--local", "user.name", name)
    git(mirror, "config", "--local", "user.email", email)
    git(mirror, "config", "--local", "commit.gpgsign", "false")


# --- the run ------------------------------------------------------------------------
def summary(snapshot: Path, head: str, research_head: str) -> list[str]:
    files = [p for p in snapshot.rglob("*") if p.is_file()]
    size = sum(p.stat().st_size for p in files)
    tops = Counter(p.relative_to(snapshot).parts[0] for p in files)
    return [f"snapshot of cancer-explorer {head[:12]} + cancer_research {research_head[:12]}: "
            f"{len(files)} files, {size / 1e6:.1f} MB",
            "  " + ", ".join(f"{k} {n}" for k, n in sorted(tops.items()))]


def uncommitted(repo: Path) -> str | None:
    n = len(git(repo, "status", "--porcelain").splitlines())
    return f"note: {repo.name} has {n} uncommitted change(s); the snapshot is HEAD only" if n else None


def run(args: argparse.Namespace, identity: list[str]) -> list[str]:
    """The requested step; returns the lines to print. Raises Refusal."""
    mirror, research = Path(args.mirror).resolve(), Path(args.research).resolve()
    if args.init:
        init(mirror, args.init, args.name, args.email, identity)
        return [f"publish: mirror clone ready at {mirror}"]
    out = [n for n in (uncommitted(ROOT), uncommitted(research)) if n]
    with tempfile.TemporaryDirectory(prefix="cx-publish-") as tmp:
        snapshot = Path(args.keep).resolve() if args.keep else Path(tmp) / "snapshot"
        if snapshot.exists() and any(snapshot.iterdir()):
            raise Refusal(f"{snapshot} is not empty")
        head, research_head = export(snapshot, ROOT, research)
        out += summary(snapshot, head, research_head)
        problems = gate(snapshot, identity, sitescan.env_values(ENV_FILE), local_terms())
        if problems:
            raise Refusal("\n".join(out + problems + ["nothing was written to the mirror"]))
        if not (args.commit or args.push):
            return out + ["publish: PASS -- dry run; --commit writes it to the mirror clone"]
        name, email, url = persona(mirror)
        problems = (provenance_problems(ROOT) + provenance_problems(research)
                    + persona_problems(name, email, url, identity) + history_problems(mirror, name, email, identity))
        if problems:
            raise Refusal("\n".join(out + problems))
        message = MESSAGE.format(head=head[:12], research=research_head[:12])
        new = commit_snapshot(mirror, snapshot, message, name, email)
    problems = history_problems(mirror, name, email, identity)
    if problems:
        raise Refusal("\n".join(out + problems + ["the commit stays in the mirror clone, unpushed"]))
    out.append(f"committed {new[:12]}: {message}" if new else "no change since the last snapshot")
    if args.push:
        problems = account_problems(url)
        if problems:
            raise Refusal("\n".join(out + problems + ["nothing was pushed"]))
        git(mirror, "push", "-q", "origin", "HEAD:refs/heads/main")
        out.append(f"publish: PASS -- pushed to {url}")
    else:
        out.append("publish: PASS -- committed in the mirror clone; --push sends it")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Publish a gated, fresh-history snapshot to the GitHub mirror.")
    mode = ap.add_mutually_exclusive_group()
    mode.add_argument("--commit", action="store_true", help="write the snapshot into the mirror clone and commit")
    mode.add_argument("--push", action="store_true", help="commit, then push through the pseudonym's host alias")
    mode.add_argument("--init", metavar="REMOTE", help="create the mirror clone for git@<alias>:<owner>/<repo>.git")
    ap.add_argument("--name", help="with --init: the commit name (the pseudonym)")
    ap.add_argument("--email", help="with --init: the pseudonym's GitHub noreply address")
    ap.add_argument("--mirror", default=str(MIRROR), help="the mirror clone (default ../cancer-explorer-mirror)")
    ap.add_argument("--research", default=str(RESEARCH), help="the curated-inputs repository")
    ap.add_argument("--keep", metavar="DIR", help="export into DIR and leave it there")
    ap.add_argument("--identity", default=str(sitescan.IDENTITY_FILE), help="file with the '## Identity' section")
    args = ap.parse_args()
    if args.init and not (args.name and args.email):
        ap.error("--init needs --name and --email")
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    identity = sitescan.identity_terms(Path(args.identity))
    if identity is None:
        print(f"publish: FAIL -- no identity list in {args.identity} (a '## Identity' section with `tokens`)")
        return 1
    try:
        lines = run(args, identity)
    except Refusal as e:
        print(str(e))
        print("publish: FAIL")
        return 1
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
