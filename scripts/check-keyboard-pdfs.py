from __future__ import annotations

import sys
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else "tmp/pdfs/keyboard-notes-final")
EXPECTED = {
    "labeled-88-octaves.pdf": (3, "88 keys", "Octave numbers: shown."),
    "labeled-88-letters.pdf": (3, "88 keys", "Octave numbers: hidden."),
    "labeled-61-octaves.pdf": (2, "61 keys", "Octave numbers: shown."),
    "labeled-61-letters.pdf": (2, "61 keys", "Octave numbers: hidden."),
}

passed = 0


def check(condition: bool, message: str) -> None:
    global passed
    if not condition:
        raise AssertionError(message)
    passed += 1


for name, (page_count, layout_label, octave_label) in EXPECTED.items():
    path = ROOT / name
    check(path.is_file(), f"missing {path}")
    reader = PdfReader(path)
    check(len(reader.pages) == page_count, f"{name}: expected {page_count} pages")
    with pdfplumber.open(path) as document:
        for index, page in enumerate(document.pages, start=1):
            check(round(page.width) == 792 and round(page.height) == 612, f"{name} page {index}: not Letter landscape")
            text = page.extract_text() or ""
            check("Labeled Piano Keys" in text, f"{name} page {index}: missing title")
            check(layout_label in text, f"{name} page {index}: missing layout label")
            check(f"Part {index} of {page_count}" in text, f"{name} page {index}: missing part label")
            check(octave_label in text, f"{name} page {index}: wrong octave mode")
            check("Middle C = C4." in text, f"{name} page {index}: missing Middle C convention")
            check("not a full-size sticker template" in text, f"{name} page {index}: missing scale warning")
            check("pianogrid.com/keyboard-notes/labeled" in text, f"{name} page {index}: missing product URL")
            check("BK-KORG" in text and "BK-HOFFMAN" in text, f"{name} page {index}: missing source ledger")

print(f"Keyboard PDF checks: {passed} passed, 0 failed")
