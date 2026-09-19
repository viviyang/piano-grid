#!/usr/bin/env python3
"""Read-only Title/H1 samples for sitemap members. Stops on 403/429. No new deps."""
from __future__ import annotations
import hashlib, json, re, time
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser

UA = "PianoGridSitemapAudit/1.0"
OUT = Path("docs/seo/chords/evidence-2026-09-18/competitor-xml/page_samples")
DELAY = 1.0
URLS = [
    "https://www.pianochord.org/c-add.html",
    "https://www.pianochord.org/c-sus.html",
    "https://www.pianochord.org/cm-add.html",
    "https://www.pianochord.org/cm9.html",
    "https://www.pianochord.org/b-dim.html",
    "https://www.pianochord.org/c-dim7.html",
    "https://www.pianochord.org/dm-flat.html",
    "https://www.pianochord.org/c-major.html",
    "https://www.pianochord.org/c-extended.html",
    "https://pianogrid.com/chords/b-minor",
    "https://pianogrid.com/chords/seventh",
    "https://pianogrid.com/robots.txt",
]
def fetch(url, check_robots=True, robots={}):
    p = urlparse(url)
    origin = f"{p.scheme}://{p.netloc}"
    if check_robots:
        if origin not in robots:
            robot_url = origin + "/robots.txt"
            try:
                raw = fetch(robot_url, False, robots)
                rp = RobotFileParser(robot_url)
                rp.parse(raw.decode("utf-8", errors="replace").splitlines())
            except HTTPError as e:
                if e.code in (404, 410):
                    rp = RobotFileParser(); rp.parse([])
                else:
                    raise RuntimeError(f"robots.txt access failed ({e.code}); stop rather than bypass.")
            robots[origin] = rp
        if not robots[origin].can_fetch(UA, url):
            raise RuntimeError("robots.txt disallows: " + url)
        time.sleep(DELAY)
    with urlopen(Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,text/plain,*/*;q=0.2"}), timeout=30) as r:
        return r.read(1_000_000)
def extract(html):
    text = html.decode("utf-8", errors="replace")
    def one(pattern):
        m = re.search(pattern, text, re.I | re.S)
        return re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    return {
        "title": one(r"<title[^>]*>(.*?)</title>"),
        "h1": one(r"<h1[^>]*>(.*?)</h1>"),
        "robots_meta": one(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)'),
        "canonical": one(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)'),
    }

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    robots = {}
    rows = []
    for url in URLS:
        try:
            raw = fetch(url, urlparse(url).path != "/robots.txt", robots)
            sample = extract(raw) if urlparse(url).path != "/robots.txt" else {"title": "", "h1": "", "robots_meta": "", "canonical": "", "robots_txt_has_sitemap": b"sitemap" in raw.lower()}
            name = hashlib.sha256(url.encode()).hexdigest()[:12] + Path(urlparse(url).path).name
            (OUT / name).write_bytes(raw)
            rows.append({"url": url, "ok": True, "bytes": len(raw), "sha256": hashlib.sha256(raw).hexdigest(), "file": name, **sample})
            print("OK", url, sample.get("title"), "|", sample.get("h1"))
        except Exception as e:
            rows.append({"url": url, "ok": False, "error": str(e)})
            print("ERR", url, e)
            if "403" in str(e) or "429" in str(e) or "robots.txt" in str(e):
                break
    (OUT / "SAMPLES.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
