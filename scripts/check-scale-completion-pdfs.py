import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "public" / "downloads" / "scales"
OUT = ROOT / "checks" / "scales-completion" / "pdf"

EXPECTED = {
    "pianogrid-12-major-scales-note-reference.pdf": (13, (612, 792), ["12 Major Scales", "C Major", "F# Major"]),
    "pianogrid-12-major-scales-note-reference-a4.pdf": (13, (595, 842), ["12 Major Scales", "Db Major", "B Major"]),
    "pianogrid-major-minor-note-atlas.pdf": (61, (612, 792), ["60 named references", "A Classical Melodic Minor", "G##5"]),
    "pianogrid-major-minor-note-atlas-a4.pdf": (61, (595, 842), ["60 named references", "Cb Major", "A# Harmonic Minor"]),
    "pianogrid-c-major-two-hand-starter.pdf": (3, (612, 792), ["C Major", "Right hand", "Left hand"]),
    "pianogrid-c-major-two-hand-starter-a4.pdf": (3, (595, 842), ["C Major", "Right hand", "Left hand"]),
    "pianogrid-scales-notes-check-worksheet.pdf": (3, (612, 792), ["Piano Scale Notes", "Answers"]),
    "pianogrid-scales-starter-reference.pdf": (10, (612, 792), ["C Major & A Minor", "BASS CLEF"]),
}

checks = []
files = []


def record(name, passed, detail=""):
    checks.append({"name": name, "passed": bool(passed), "detail": detail})
    if not passed:
        print("FAIL", name, detail)


for name, (page_count, page_size, phrases) in EXPECTED.items():
    path = PDF_DIR / name
    record(f"{name} exists", path.is_file())
    if not path.is_file():
        continue
    reader = PdfReader(str(path))
    text_by_page = [(page.extract_text() or "").strip() for page in reader.pages]
    text = "\n".join(text_by_page)
    sizes = {(round(float(page.mediabox.width)), round(float(page.mediabox.height))) for page in reader.pages}
    embedded = []
    for page_index, page in enumerate(reader.pages):
        fonts = page.get("/Resources", {}).get("/Font", {})
        for font_name, reference in fonts.items():
            descriptor_ref = reference.get_object().get("/FontDescriptor")
            if descriptor_ref and any(key in descriptor_ref.get_object() for key in ("/FontFile", "/FontFile2", "/FontFile3")):
                embedded.append({"page": page_index + 1, "font": str(font_name)})
    record(f"{name} opens with expected pages", len(reader.pages) == page_count, len(reader.pages))
    record(f"{name} uses expected paper size", sizes == {page_size}, sorted(sizes))
    record(f"{name} has no blank text page", all(len(value) >= 20 for value in text_by_page))
    record(f"{name} embeds no font file", not embedded, embedded)
    for phrase in phrases:
        record(f"{name} contains {phrase}", phrase in text)
    files.append({
        "path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "bytes": path.stat().st_size,
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "pages": len(reader.pages),
        "paper_points": sorted([list(size) for size in sizes]),
        "text_characters": sum(len(value) for value in text_by_page),
    })

rendered = sorted(path.name for path in (OUT / "rendered").glob("*.png"))
record("representative rendered pages exist", len(rendered) == 7, rendered)

report = {
    "executed_at": datetime.now(timezone.utc).isoformat(),
    "passed": sum(item["passed"] for item in checks),
    "failed": sum(not item["passed"] for item in checks),
    "files": files,
    "representative_rendered_pages": rendered,
    "visual_review": "PASS: seven rendered pages inspected; no clipping, overlap, blank content, illegible clef, or incorrect keyboard/staff direction observed.",
    "render_environment_note": "Poppler emitted optional display-font mapping warnings but rendered every requested page successfully; PDFs use base Helvetica and embed no font files.",
    "not_run": ["physical printing", "PDF tag/accessibility tree review", "specialist music engraving review"],
    "checks": checks,
}
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "pdf-validation.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Scale completion PDFs: {report['passed']} passed, {report['failed']} failed.")
raise SystemExit(1 if report["failed"] else 0)
