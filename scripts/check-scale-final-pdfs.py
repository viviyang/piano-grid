import hashlib
import json
import os
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / os.environ.get("PIANO_SCALE_FINAL_OUT", "checks/scales-step2-final")
LETTER = ROOT / "public" / "downloads" / "scales"
A4 = EVIDENCE / "pdf-a4-proof"
checks = []


def check(name, passed, detail=""):
    checks.append({"name": name, "passed": bool(passed), "detail": detail})
    if not passed:
        print("FAIL", name, detail)


def inspect(path, expected_pages, expected_size, phrases):
    reader = PdfReader(str(path))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    sizes = {(round(float(page.mediabox.width)), round(float(page.mediabox.height))) for page in reader.pages}
    check(f"{path.name} opens", len(reader.pages) > 0, len(reader.pages))
    check(f"{path.name} page count", len(reader.pages) == expected_pages, len(reader.pages))
    check(f"{path.name} page size", sizes == {expected_size}, sorted(sizes))
    check(f"{path.name} no blank pages", all((page.extract_text() or "").strip() for page in reader.pages))
    for phrase in phrases:
        check(f"{path.name} contains {phrase}", phrase in text, phrase)
    embedded_fonts = []
    for page_index, page in enumerate(reader.pages):
        fonts = page.get("/Resources", {}).get("/Font", {})
        for name, reference in fonts.items():
            font = reference.get_object()
            descriptor_ref = font.get("/FontDescriptor")
            if descriptor_ref:
                descriptor = descriptor_ref.get_object()
                if any(key in descriptor for key in ["/FontFile", "/FontFile2", "/FontFile3"]):
                    embedded_fonts.append({"page": page_index + 1, "font": str(name)})
    check(f"{path.name} embeds no copied font file", not embedded_fonts, embedded_fonts)
    return reader, text


reference_phrases = [
    "C Major & A Minor",
    "Sources, rights & limits",
    "TREBLE CLEF",
    "BASS CLEF",
    "Ascending · low to high",
    "Descending · high to low",
    "C major · Right hand",
    "C major · Left hand",
    "Natural minor · Right hand",
    "Harmonic minor · Left hand",
    "Melodic minor - classical · Right hand",
    "Not source-checked; notes only",
    "https://viva.pressbooks.pub/openmusictheory/chapter/minor-scales/",
    "PDF page 2 (0-based page 1), printed page 40",
    "No third-party source PDF",
]
worksheet_phrases = [
    "Piano Scale Notes",
    "My practice record",
    "Answers",
    "A, B, C, D, E, F, G#",
    "Choice A",
    "Input SHA-256",
    "No third-party source PDF",
]

for folder, size, format_name in [(LETTER, (612, 792), "letter"), (A4, (595, 842), "a4")]:
    inspect(folder / "pianogrid-scales-starter-reference.pdf", 10, size, reference_phrases)
    inspect(folder / "pianogrid-scales-notes-check-worksheet.pdf", 3, size, worksheet_phrases)
    metadata_path = EVIDENCE / f"generation-metadata-{format_name}.json"
    metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
    current_hash = hashlib.sha256((ROOT / metadata["input_path"]).read_bytes()).hexdigest()
    check(f"{format_name} metadata input hash is current", metadata["input_sha256"] == current_hash, metadata["input_sha256"])
    check(f"{format_name} metadata covers eight hand/form sections", len(metadata["sections"]) == 8, len(metadata["sections"]))
    for section in metadata["sections"]:
        key = f"{section['scale']} {section['hand']}"
        check(f"{format_name} {key} ascending MIDI is ordered", all(right > left for left, right in zip(section["ascending_midi"], section["ascending_midi"][1:])), section["ascending_midi"])
        check(f"{format_name} {key} descending MIDI is ordered", all(right < left for left, right in zip(section["descending_midi"], section["descending_midi"][1:])), section["descending_midi"])
        check(f"{format_name} {key} has both direction diagrams", len(section["ascending"]) == len(section["ascending_midi"]) and len(section["descending"]) == len(section["descending_midi"]), key)
    by_key = {(item["scale"], item["hand"]): item for item in metadata["sections"]}
    check(f"{format_name} A RH keyboard uses A4-A5", by_key[("natural_minor", "right_hand")]["ascending_midi"][0] == 69 and by_key[("natural_minor", "right_hand")]["ascending_midi"][-1] == 81, by_key[("natural_minor", "right_hand")]["ascending_midi"])
    check(f"{format_name} classical ascent and descent differ", by_key[("melodic_minor_classical", "right_hand")]["ascending"] != list(reversed(by_key[("melodic_minor_classical", "right_hand")]["descending"])), by_key[("melodic_minor_classical", "right_hand")])

# Correct the exact C-major diatonic MIDI row independently of keyboard geometry.
for format_name in ["letter", "a4"]:
    metadata = json.loads((EVIDENCE / f"generation-metadata-{format_name}.json").read_text(encoding="utf-8"))
    c_lh = next(item for item in metadata["sections"] if item["scale"] == "c_major" and item["hand"] == "left_hand")
    check(f"{format_name} C LH exact pitch keys", c_lh["ascending_midi"] == [48, 50, 52, 53, 55, 57, 59, 60], c_lh["ascending_midi"])

generator_source = (ROOT / "scripts" / "generate-scale-pdfs.py").read_text(encoding="utf-8")
check("staff renderer has no vertical clamp", "max(-2, min(10" not in generator_source and "staff_step * 3" in generator_source)
check("keyboard renderer enumerates actual MIDI keys", "range(low, high + 1)" in generator_source and "labels = {item[\"midi\"]" in generator_source)

result = {
    "executed_at": __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(),
    "passed": sum(item["passed"] for item in checks),
    "failed": sum(not item["passed"] for item in checks),
    "checks": checks,
    "not_run": ["physical printing", "PDF tag/accessibility tree review", "specialist music engraving review"],
}
EVIDENCE.mkdir(parents=True, exist_ok=True)
(EVIDENCE / "pdf-validation.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Scale final PDFs: {result['passed']} passed, {result['failed']} failed.")
raise SystemExit(1 if result["failed"] else 0)
