from __future__ import annotations

import json
import subprocess
from pathlib import Path

from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "checks" / "batches" / "06-blank-sheet"
RENDER = OUT / "pdf-render"
RENDER.mkdir(parents=True, exist_ok=True)
POPPLER = Path(r"C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
results: list[dict[str, object]] = []


def check(name: str, passed: bool, detail: object = "") -> None:
    results.append({"name": name, "passed": bool(passed), "detail": detail})
    if not passed:
        print("FAIL", name, detail)


specs = {
    "letter": {"points": (612.0, 792.0), "bytes": 45614},
    "a4": {"points": (595.276, 841.89), "bytes": 45738},
}
for paper, spec in specs.items():
    source = ROOT / "docs" / "content" / "site-master" / "assets" / f"blank-piano-staff-{paper}.pdf"
    public = ROOT / "public" / "reference" / "assets" / f"blank-piano-staff-{paper}.pdf"
    reader = PdfReader(source)
    check(f"{paper} one page", len(reader.pages) == 1, len(reader.pages))
    page = reader.pages[0]
    size = (float(page.mediabox.width), float(page.mediabox.height))
    check(f"{paper} exact page size", all(abs(actual - expected) < 0.02 for actual, expected in zip(size, spec["points"])), size)
    check(f"{paper} no encryption", not reader.is_encrypted)
    check(f"{paper} exact source bytes", source.stat().st_size == spec["bytes"], source.stat().st_size)
    check(f"{paper} public bytes", public.read_bytes() == source.read_bytes(), public.stat().st_size)
    extracted = page.extract_text() or ""
    check(f"{paper} title text", "Blank Piano Staff" in extracted)
    check(f"{paper} print instruction", "Print at 100% or fit to printable area" in extracted)
    prefix = RENDER / paper
    subprocess.run([str(POPPLER), "-png", "-r", "150", "-singlefile", str(source), str(prefix)], check=True)
    image = Image.open(prefix.with_suffix(".png")).convert("L")
    check(f"{paper} portrait render", image.height > image.width, image.size)
    pixels = image.load()
    width, height = image.size
    dark_rows = []
    for y in range(height):
        dark = sum(1 for x in range(width) if pixels[x, y] < 80)
        if dark > width * 0.72:
            dark_rows.append(y)
    clusters = []
    for y in dark_rows:
        if not clusters or y > clusters[-1][-1] + 1:
            clusters.append([y])
        else:
            clusters[-1].append(y)
    check(f"{paper} sixty full staff lines", len(clusters) == 60, len(clusters))
    left = int(width * 0.035)
    right = int(width * 0.965)
    top = int(height * 0.03)
    bottom = int(height * 0.97)
    border_dark = sum(1 for x in range(left, right) if pixels[x, top] < 30 or pixels[x, bottom] < 30)
    check(f"{paper} printable margins are clear", border_dark < width * 0.03, border_dark)

report = {
    "executed_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
    "passed": sum(1 for item in results if item["passed"]),
    "failed": sum(1 for item in results if not item["passed"]),
    "results": results,
}
(OUT / "pdf-validation.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(f"Blank sheet PDFs: {report['passed']} passed, {report['failed']} failed.")
raise SystemExit(1 if report["failed"] else 0)
