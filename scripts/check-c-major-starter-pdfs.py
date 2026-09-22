"""Bounded QA for the two authorized C-major PDFs; no asset writes."""
from pathlib import Path
import json
import sys
import pdfplumber
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
master = json.loads((ROOT / "docs/content/site-master/page-content.master.json").read_text(encoding="utf8"))
data = master["pages"]["/scales/c-major"]["data"]
results = []
for suffix, size in [("", (612, 792)), ("-a4", (595.276, 841.89))]:
    path = ROOT / f"public/downloads/scales/pianogrid-c-major-two-hand-starter{suffix}.pdf"
    reader = PdfReader(path, strict=True)
    assert len(reader.pages) == 3
    assert all(abs(float(reader.pages[0].mediabox[i + 2]) - size[i]) < .01 for i in range(2))
    with pdfplumber.open(path) as pdf:
        # A header and body using different page-height globals used to overlap.
        cover = pdf.pages[0]
        subtitle = [c for c in cover.chars if abs(c["size"] - 9) < .1]
        body = [c for c in cover.chars if abs(c["size"] - 11) < .1]
        assert min(c["top"] for c in body) > max(c["bottom"] for c in subtitle) + 12
        for index, hand in [(1, "RH"), (2, "LH")]:
            page = pdf.pages[index]
            text = page.extract_text()
            for direction in ["ascending", "descending"]:
                notes = " - ".join(row["note"] for row in data["pitch_sequences"][hand][direction])
                fingers = " - ".join(map(str, data["fingering"][hand][direction]))
                assert "Notes: " + notes in text
                assert "Fingers: " + fingers in text
            # Five actual vector black keys per octave, in both directions.
            black = [r for r in page.rects if abs(r["height"] - 20) < .01 and r["fill"] and not r["stroke"]]
            assert len(black) == 10
            for top in set(round(r["top"], 2) for r in black):
                row = sorted([r for r in black if round(r["top"], 2) == top], key=lambda r: r["x0"])
                assert len(row) == 5
                assert all(a["x1"] < b["x0"] for a, b in zip(row, row[1:]))
            assert all(20 < c["x0"] < c["x1"] < page.width - 20 and 15 < c["top"] < c["bottom"] < page.height - 15 for c in page.chars if c["text"].strip())
    results.append({"path": path.relative_to(ROOT).as_posix(), "strict_parse": "PASS", "pages": 3,
                    "paper_points": size, "notes_and_fingers": "PASS", "black_keys_per_row": 5, "cover_spacing": "PASS", "text_bounds": "PASS"})
report = {"status": "PASS", "results": results, "visual_review": "Separate rendered-page inspection required", "physical_printing": "NOT_RUN", "pdf_accessibility": "MANUAL_PENDING"}
if len(sys.argv) > 1:
    Path(sys.argv[1]).write_text(json.dumps(report, indent=2) + "\n", encoding="utf8")
print(json.dumps(report, indent=2))
