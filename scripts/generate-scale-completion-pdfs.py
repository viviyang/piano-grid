"""Generate the six approved Scales completion PDFs from the current master.

Uses ReportLab base Helvetica and original vector diagrams. No font or third-party
source artwork is copied into the outputs.
"""
from pathlib import Path
import hashlib
import json
import os
import runpy
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "docs" / "content" / "site-master" / "page-content.master.json"
OUT = ROOT / "public" / "downloads" / "scales"
EVIDENCE = ROOT / "checks" / "scales-completion" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)
EVIDENCE.mkdir(parents=True, exist_ok=True)
BASE = runpy.run_path(str(ROOT / "scripts" / "generate-scale-pdfs.py"))
# runpy returns a copy of the module dict. Drawing helpers keep the original
# globals, so page size has to be written to both or A4 text lands on the header.
LAYOUT = BASE["header"].__globals__
GENERATOR_VERSION = "2026-09-14-SCALES-COMPLETION-1"


def set_page(size):
    width, height = size
    content_w = min(520, width - 72)
    left = (width - content_w) / 2
    for namespace in (LAYOUT, BASE):
        namespace["PAGE_W"] = width
        namespace["PAGE_H"] = height
        namespace["CONTENT_W"] = content_w
        namespace["LEFT"] = left


def absolute_notes(names, hand="RH", direction="ascending"):
    octave = 4 if hand == "RH" and direction == "ascending" else 5 if hand == "RH" else 3 if direction == "ascending" else 4
    previous = float("-inf") if direction == "ascending" else float("inf")
    result = []
    for name in names:
        midi = BASE["parse_note"](f"{name}{octave}")["midi"]
        while midi <= previous if direction == "ascending" else midi >= previous:
            octave += 1 if direction == "ascending" else -1
            midi = BASE["parse_note"](f"{name}{octave}")["midi"]
        result.append(f"{name}{octave}")
        previous = midi
    return result


def reference_page(pdf, page_number, title, ascending_names, descending_names, scope, hand="RH", up_fingers=None, down_fingers=None):
    asc = absolute_notes(ascending_names, hand, "ascending")
    desc = absolute_notes(descending_names, hand, "descending")
    clef = "treble" if hand == "RH" else "bass"
    BASE["header"](pdf, title, "One-octave note reference · both directions", page_number)
    y = BASE["PAGE_H"] - 92
    y = BASE["direction_panel"](pdf, y, "Ascending · low to high", asc, up_fingers, clef) - 12
    y = BASE["direction_panel"](pdf, y, "Descending · high to low", desc, down_fingers, clef) - 12
    BASE["wrap"](pdf, scope, BASE["LEFT"], y, BASE["CONTENT_W"], size=7.3, leading=9, color=BASE["MUTED"])
    return {"title": title, "ascending": asc, "descending": desc, "hand": hand, "fingering": {"ascending": up_fingers, "descending": down_fingers}}


def make_pdf(path, pagesize, title, subject, page_writer):
    set_page(pagesize)
    pdf = canvas.Canvas(str(path), pagesize=pagesize, pageCompression=1)
    pdf.setTitle(title)
    pdf.setAuthor("PianoGrid")
    pdf.setSubject(subject)
    sections = page_writer(pdf)
    pdf.save()
    return sections


def major_rows(master):
    rows = master["pages"]["/scales"]["data"]["major_overview"]
    wanted = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
    by_tonic = {row["tonic"]: row for row in rows}
    return [by_tonic[tonic] for tonic in wanted]


def atlas_rows(master):
    center = master["pages"]["/scales"]["data"]
    rows = []
    for major in center["major_overview"]:
        asc = [*major["notes"], major["tonic"]]
        rows.append({"title": f"{major['tonic']} Major", "ascending": asc, "descending": list(reversed(asc)), "form": "major"})
    fields = [
        ("natural_ascending", "natural_descending", "Natural Minor", "natural_minor"),
        ("harmonic_ascending", "harmonic_descending", "Harmonic Minor", "harmonic_minor"),
        ("melodic_classical_ascending", "melodic_classical_descending", "Classical Melodic Minor", "melodic_minor_classical"),
    ]
    for asc_key, desc_key, label, form in fields:
        for minor in center["minor_overview"]:
            rows.append({"title": f"{minor['tonic']} {label}", "ascending": minor[asc_key], "descending": minor[desc_key], "form": form})
    return rows


def cover(pdf, title, subtitle, body, page_number=1):
    BASE["header"](pdf, title, subtitle, page_number)
    y = BASE["PAGE_H"] - 112
    y = BASE["wrap"](pdf, body, BASE["LEFT"], y, BASE["CONTENT_W"], size=11, leading=17)
    y -= 24
    BASE["wrap"](pdf, f"Generator: {GENERATOR_VERSION}. Current music input subset SHA-256 is recorded in the accompanying generation metadata. No third-party source PDF, image, engraving or font file is embedded.", BASE["LEFT"], y, BASE["CONTENT_W"], size=8, leading=11, color=BASE["MUTED"])
    pdf.showPage()


def build_major(master, suffix, pagesize):
    path = OUT / f"pianogrid-12-major-scales-note-reference{suffix}.pdf"
    rows = major_rows(master)
    def pages(pdf):
        cover(pdf, "12 Major Scales", "Note Reference", "Twelve tonic pitch classes, one written major-scale reference for each. Each entry shows one octave in both directions. This is a note reference, not an all-keys fingering method.")
        sections = []
        for index, row in enumerate(rows, 2):
            asc = [*row["notes"], row["tonic"]]
            sections.append(reference_page(pdf, index, f"{row['tonic']} Major", asc, list(reversed(asc)), "Reference register: right-hand reading range. Fingering is omitted unless a page-specific source covers the exact selection."))
            pdf.showPage()
        return sections
    return path, make_pdf(path, pagesize, "12 Major Scales - Note Reference", f"{GENERATOR_VERSION}; twelve major pitch classes", pages)


def build_atlas(master, suffix, pagesize):
    path = OUT / f"pianogrid-major-minor-note-atlas{suffix}.pdf"
    rows = atlas_rows(master)
    def pages(pdf):
        cover(pdf, "Major & Minor Scale Note Atlas", "60 named references", "Sixty named major and minor references from PianoGrid's current chart: 15 major-key spellings and natural, harmonic and classical melodic minor for 15 tonics. Enharmonic names can share piano keys. This is not a list of every scale or every fingering.")
        sections = []
        for index, row in enumerate(rows, 2):
            form_note = "Classical melodic minor prints its distinct ascent and natural-minor descent." if row["form"] == "melodic_minor_classical" else "Fingering coverage varies by selection; this atlas is a note reference."
            sections.append(reference_page(pdf, index, row["title"], row["ascending"], row["descending"], form_note))
            pdf.showPage()
        return sections
    return path, make_pdf(path, pagesize, "Major & Minor Scale Note Atlas", f"{GENERATOR_VERSION}; 60 named references", pages)


def build_two_hand(master, suffix, pagesize):
    path = OUT / f"pianogrid-c-major-two-hand-starter{suffix}.pdf"
    data = master["pages"]["/scales/c-major"]["data"]
    def pages(pdf):
        cover(pdf, "C Major Two-Hand Starter", "Separate-hand, one-octave reference", "Read the two hand references separately first. The staves are aligned to show corresponding notes one octave apart. Use this as a labeled reference, not an assessment of two-hand coordination. The website's guided-playback mode remains single-hand.")
        sections = []
        for page_number, (hand, label) in enumerate((("RH", "Right Hand · C4-C5"), ("LH", "Left Hand · C3-C4")), 2):
            asc = [item["note"] for item in data["pitch_sequences"][hand]["ascending"]]
            desc = [item["note"] for item in data["pitch_sequences"][hand]["descending"]]
            BASE["hand_page"](pdf, page_number, "C Major", "Right hand" if hand == "RH" else "Left hand", asc, desc, data["fingering"][hand]["ascending"], data["fingering"][hand]["descending"], "Source-documented one-octave row. First read each hand separately; this document does not score two-hand coordination.")
            sections.append({"title": label, "ascending": asc, "descending": desc, "fingering": data["fingering"][hand]})
            pdf.showPage()
        return sections
    return path, make_pdf(path, pagesize, "C Major Two-Hand Starter Reference", f"{GENERATOR_VERSION}; C major separate-hand reference", pages)


def main():
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    generator_hash = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    relevant = {
        "center": master["pages"]["/scales"]["data"],
        "c_major": master["pages"]["/scales/c-major"]["data"],
        "source_ids": sorted(set(master["pages"]["/scales"]["source_ids"] + master["pages"]["/scales/c-major"]["source_ids"])),
    }
    input_hash = hashlib.sha256(json.dumps(relevant, sort_keys=True, ensure_ascii=False).encode("utf-8")).hexdigest()
    outputs = []
    for suffix, pagesize, paper in (("", letter, "LETTER"), ("-a4", A4, "A4")):
        for resource_id, builder in (("R-MAJ12", build_major), ("R-ATLAS60", build_atlas), ("R-TWOHAND-C", build_two_hand)):
            path, sections = builder(master, suffix, pagesize)
            outputs.append({
                "resource_id": resource_id,
                "paper": paper,
                "path": path.relative_to(ROOT).as_posix(),
                "bytes": path.stat().st_size,
                "pages": len(sections) + 1,
                "file_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                "input_subset_sha256": input_hash,
                "generator_sha256": generator_hash,
                "objects": [section["title"] for section in sections],
            })
    metadata = {
        "generator_version": GENERATOR_VERSION,
        "master_path": MASTER.relative_to(ROOT).as_posix(),
        "input_subset_sha256": input_hash,
        "generator_sha256": generator_hash,
        "outputs": outputs,
        "pdf_tagging": "NOT_VERIFIED",
        "physical_printing": "NOT_RUN",
        "rights": "PianoGrid original text, vector diagrams and layout; source facts transcribed; no third-party source file or font file embedded.",
    }
    (EVIDENCE / "generation-metadata.json").write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"generated": len(outputs), "outputs": [{"path": item["path"], "pages": item["pages"], "bytes": item["bytes"]} for item in outputs]}, indent=2))


if __name__ == "__main__":
    main()
