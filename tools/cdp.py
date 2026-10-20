"""tools/cdp.py -- drive a headless Chromium over the DevTools protocol, stdlib only.

    with cdp.Browser() as b:      # Chrome, Chromium or Edge; CX_CHROME names one
        b.viewport(393, 851, mobile=True)
        b.goto(Path("index.html").resolve().as_uri(), ready="!!window.CancerExplorer")
        b.eval("document.title")

No Node and no packages: verify.py runs on the pipeline's interpreter, and every
Windows 11 machine already carries Edge, which speaks the same protocol. One
page over one WebSocket. The page's uncaught exceptions and console.error
calls are kept on the object for the caller to judge.

Input goes through Input.dispatch*, not element.click(): a real tap makes the
browser synthesise the compatibility mouse events a page then reacts to, and a
script-made click does not -- the stuck hover tip of 2026-10-19 lived there.
"""
from __future__ import annotations

import base64
import itertools
import json
import os
import shutil
import socket
import struct
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

NAMES = ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome",
         "msedge", "microsoft-edge", "microsoft-edge-stable")
# under %ProgramFiles%, %ProgramFiles(x86)% and %LocalAppData% on Windows
WINDOWS_PARTS = (("Google", "Chrome", "Application", "chrome.exe"),
                 ("Microsoft", "Edge", "Application", "msedge.exe"))
MAC_PATHS = ("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
             "/Applications/Chromium.app/Contents/MacOS/Chromium",
             "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge")
CRLF = bytes((13, 10))


class BrowserMissing(RuntimeError):
    pass


class BrowserError(RuntimeError):
    pass


class PageError(RuntimeError):
    """An expression evaluated in the page threw."""


def find_browser() -> str | None:
    named = os.environ.get("CX_CHROME")
    if named:
        return named if Path(named).is_file() else None
    for name in NAMES:
        hit = shutil.which(name)
        if hit:
            return hit
    for key in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"):
        root = os.environ.get(key)
        for parts in WINDOWS_PARTS if root else ():
            p = Path(root, *parts)
            if p.is_file():
                return str(p)
    return next((p for p in MAC_PATHS if Path(p).is_file()), None)


def looked_for() -> str:
    return ("CX_CHROME, then " + ", ".join(NAMES) + " on PATH, then Chrome and Edge under "
            "Program Files and LocalAppData")


class _Socket:
    """The client half of RFC 6455, as much of it as one DevTools page needs."""

    def __init__(self, url: str, timeout: float):
        hostport, _, path = url.split("://", 1)[1].partition("/")
        host, _, port = hostport.rpartition(":")
        self.sock = socket.create_connection((host, int(port)), timeout=timeout)
        key = base64.b64encode(os.urandom(16)).decode("ascii")
        lines = [f"GET /{path} HTTP/1.1", f"Host: {hostport}", "Upgrade: websocket", "Connection: Upgrade",
                 f"Sec-WebSocket-Key: {key}", "Sec-WebSocket-Version: 13", "", ""]
        self.sock.sendall(CRLF.join(s.encode("ascii") for s in lines))
        self.buf = bytearray()
        while CRLF + CRLF not in self.buf:
            self._fill()
        head, _, rest = bytes(self.buf).partition(CRLF + CRLF)
        if b" 101 " not in head.split(CRLF)[0] + b" ":
            raise BrowserError("DevTools refused the WebSocket: " + head.split(CRLF)[0].decode("latin-1"))
        self.buf = bytearray(rest)

    def _fill(self) -> None:
        chunk = self.sock.recv(1 << 16)
        if not chunk:
            raise BrowserError("DevTools closed the connection")
        self.buf += chunk

    def _take(self, n: int) -> bytes:
        while len(self.buf) < n:
            self._fill()
        out = bytes(self.buf[:n])
        del self.buf[:n]
        return out

    @staticmethod
    def _xor(data: bytes, mask: bytes) -> bytes:
        n = len(data)
        if not n:
            return data
        pad = (mask * (n // 4 + 1))[:n]
        return (int.from_bytes(data, "big") ^ int.from_bytes(pad, "big")).to_bytes(n, "big")

    def _frame(self, opcode: int, data: bytes) -> None:
        n, mask = len(data), os.urandom(4)
        if n < 126:
            head = struct.pack("!BB", 0x80 | opcode, 0x80 | n)
        elif n < 1 << 16:
            head = struct.pack("!BBH", 0x80 | opcode, 0x80 | 126, n)
        else:
            head = struct.pack("!BBQ", 0x80 | opcode, 0x80 | 127, n)
        self.sock.sendall(head + mask + self._xor(data, mask))

    def send(self, text: str) -> None:
        self._frame(0x1, text.encode("utf-8"))

    def recv(self) -> str:
        parts = []
        while True:
            b1, b2 = self._take(2)
            opcode, n = b1 & 0x0F, b2 & 0x7F
            if n == 126:
                n = struct.unpack("!H", self._take(2))[0]
            elif n == 127:
                n = struct.unpack("!Q", self._take(8))[0]
            mask = self._take(4) if b2 & 0x80 else None
            data = self._take(n)
            if mask:
                data = self._xor(data, mask)
            if opcode == 0x8:
                raise BrowserError("DevTools closed the WebSocket")
            if opcode == 0x9:
                self._frame(0xA, data)
                continue
            if opcode == 0xA:
                continue
            parts.append(data)
            if b1 & 0x80:
                return b"".join(parts).decode("utf-8")

    def settimeout(self, s: float) -> None:
        self.sock.settimeout(s)

    def close(self) -> None:
        try:
            self.sock.close()
        except OSError:
            pass


class Browser:
    def __init__(self, exe: str | None = None, timeout: float = 30.0):
        self.exe = exe or find_browser()
        if not self.exe:
            raise BrowserMissing("no Chrome, Chromium or Edge found (looked for " + looked_for() + ")")
        self.timeout = timeout
        self.profile = tempfile.mkdtemp(prefix="cx-chrome-")
        self.exceptions: list[str] = []
        self.console_errors: list[str] = []
        self._ids = itertools.count(1)
        args = [self.exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
                "--no-default-browser-check", "--disable-extensions", "--mute-audio",
                "--remote-debugging-port=0", f"--user-data-dir={self.profile}", "about:blank"]
        if sys.platform.startswith("linux"):
            # the page is this repository's own files; many Linux hosts refuse the sandbox
            args.insert(1, "--no-sandbox")
        self.proc = subprocess.Popen(args, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                     stderr=subprocess.DEVNULL)
        self.ws = None
        try:
            self._connect()
        except BaseException:
            self.close()
            raise

    def _connect(self) -> None:
        port_file = Path(self.profile, "DevToolsActivePort")
        deadline = time.time() + self.timeout
        port = None
        while port is None:
            if self.proc.poll() is not None:
                raise BrowserError(f"{self.exe} exited ({self.proc.returncode}) before DevTools started")
            if time.time() > deadline:
                raise BrowserError(f"{self.exe}: DevTools did not start in {self.timeout:.0f}s")
            try:
                first = port_file.read_text(encoding="ascii").split()
                port = int(first[0]) if first else None
            except (OSError, ValueError):
                pass
            if port is None:
                time.sleep(0.1)
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))   # never through a proxy
        page = None
        while page is None and time.time() < deadline:
            with opener.open(f"http://127.0.0.1:{port}/json/list", timeout=10) as r:
                page = next((t for t in json.load(r) if t.get("type") == "page"), None)
            if page is None:
                time.sleep(0.1)
        if page is None:
            raise BrowserError("DevTools lists no page")
        self.ws = _Socket(page["webSocketDebuggerUrl"], self.timeout)
        self.call("Runtime.enable")
        self.call("Page.enable")

    # --- protocol ---------------------------------------------------------------

    def call(self, method: str, timeout: float | None = None, **params):
        i = next(self._ids)
        self.ws.settimeout(timeout or self.timeout)
        self.ws.send(json.dumps({"id": i, "method": method, "params": params}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == i:
                if "error" in m:
                    raise BrowserError(f"{method}: {m['error'].get('message')}")
                return m.get("result", {})
            self._event(m)

    def _event(self, m: dict) -> None:
        method, p = m.get("method"), m.get("params") or {}
        if method == "Runtime.exceptionThrown":
            d = p.get("exceptionDetails") or {}
            self.exceptions.append(((d.get("exception") or {}).get("description") or d.get("text") or "?")
                                   .splitlines()[0])
        elif method == "Runtime.consoleAPICalled" and p.get("type") == "error":
            self.console_errors.append(" ".join(str(a.get("value", a.get("description", "")))
                                                for a in p.get("args") or []))

    def eval(self, expr: str, timeout: float | None = None):
        r = self.call("Runtime.evaluate", timeout=timeout, expression=expr, returnByValue=True,
                      awaitPromise=True)
        if "exceptionDetails" in r:
            d = r["exceptionDetails"]
            raise PageError(((d.get("exception") or {}).get("description") or d.get("text") or "?")
                            .splitlines()[0])
        return (r.get("result") or {}).get("value")

    def wait_for(self, expr: str, timeout: float = 15.0, every: float = 0.05):
        deadline = time.time() + timeout
        while True:
            try:
                v = self.eval(expr)
            except PageError:
                v = None
            if v:
                return v
            if time.time() > deadline:
                raise BrowserError(f"timed out after {timeout:.0f}s waiting for: {expr[:80]}")
            time.sleep(every)

    # --- page -------------------------------------------------------------------

    def goto(self, url: str, ready: str = "document.readyState === 'complete'", timeout: float = 30.0) -> None:
        """A full load every time: a URL that differs only in its #hash would
        otherwise be a same-document jump, and boot would not run again."""
        self.call("Page.navigate", url="about:blank")
        self.wait_for("location.href === 'about:blank'", timeout)
        self.call("Page.navigate", url=url)
        # the hash is left out: a page may rewrite its own once it boots
        page = json.dumps(url.split("#", 1)[0])
        self.wait_for(f"location.href.split('#')[0] === {page} && document.readyState === 'complete' && ({ready})",
                      timeout)

    def viewport(self, width: int, height: int, mobile: bool) -> None:
        self.call("Emulation.setDeviceMetricsOverride", width=width, height=height,
                  deviceScaleFactor=2 if mobile else 1, mobile=mobile)
        self.call("Emulation.setTouchEmulationEnabled", enabled=mobile, maxTouchPoints=5 if mobile else 1)

    def tap(self, x: float, y: float, settle: float = 0.7) -> None:
        self.call("Input.dispatchTouchEvent", type="touchStart", touchPoints=[{"x": x, "y": y}])
        time.sleep(0.06)
        self.call("Input.dispatchTouchEvent", type="touchEnd", touchPoints=[])
        time.sleep(settle)

    def mouse_move(self, x: float, y: float, settle: float = 0.25) -> None:
        self.call("Input.dispatchMouseEvent", type="mouseMoved", x=x, y=y)
        time.sleep(settle)

    def click(self, x: float, y: float, settle: float = 0.6) -> None:
        for kind in ("mousePressed", "mouseReleased"):
            self.call("Input.dispatchMouseEvent", type=kind, x=x, y=y, button="left", clickCount=1)
        time.sleep(settle)

    def wheel(self, x: float, y: float, dy: float, settle: float = 0.5) -> None:
        self.call("Input.dispatchMouseEvent", type="mouseWheel", x=x, y=y, deltaX=0, deltaY=dy)
        time.sleep(settle)

    def screenshot(self, path: Path) -> None:
        shot = self.call("Page.captureScreenshot", timeout=60, format="png")
        Path(path).write_bytes(base64.b64decode(shot["data"]))

    # --- lifetime ---------------------------------------------------------------

    def close(self) -> None:
        if self.ws:
            self.ws.close()
        if self.proc.poll() is None:
            self.proc.kill()
            try:
                self.proc.wait(10)
            except subprocess.TimeoutExpired:
                pass
        for _ in range(10):   # Windows keeps the profile locked for a moment after exit
            shutil.rmtree(self.profile, ignore_errors=True)
            if not os.path.exists(self.profile):
                break
            time.sleep(0.3)

    def __enter__(self) -> "Browser":
        return self

    def __exit__(self, *exc) -> None:
        self.close()
