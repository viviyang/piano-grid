"""Generate the two approved PianoGrid Scales PDFs from current master data.

Uses built-in Helvetica only; no font files or third-party visual assets are copied.
"""
from pathlib import Path
import hashlib
import json
import os
import re
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "docs" / "content" / "site-master" / "page-content.master.json"
OUT = Path(os.environ.get("PIANO_SCALE_PDF_OUT", ROOT / "public" / "downloads" / "scales"))
OUT.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4 if os.environ.get("PIANO_SCALE_PDF_PAGE") == "A4" else letter
CONTENT_W = 520  # fits inside A4 with 36pt margins as well as US Letter
LEFT = (PAGE_W - CONTENT_W) / 2
BLUE = colors.HexColor("#0066CC")
INK = colors.HexColor("#1D1D1F")
MUTED = colors.HexColor("#5C626B")
LINE = colors.HexColor("#E1E4E8")
SURFACE = colors.HexColor("#F6F7F9")
GENERATOR_VERSION = "2026-09-11-STEP2"
INPUT_SHA256 = hashlib.sha256(MASTER.read_bytes()).hexdigest()


def load_data():
    return json.loads(MASTER.read_text(encoding="utf-8"))


def header(pdf, title, subtitle, page_number):
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(LEFT, PAGE_H - 46, title)
    pdf.setFont("Helvetica", 9)
    pdf.setFillColor(MUTED)
    pdf.drawString(LEFT, PAGE_H - 62, subtitle)
    pdf.setStrokeColor(LINE)
    pdf.line(LEFT, PAGE_H - 72, LEFT + CONTENT_W, PAGE_H - 72)
    pdf.setFont("Helvetica", 8)
    pdf.drawRightString(LEFT + CONTENT_W, 25, f"PianoGrid Scales · {page_number}")


def wrap(pdf, text, x, y, width, size=9, leading=12, color=INK, font="Helvetica"):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdf.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def note_pc(note):
    base = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}[note[0]]
    for char in note[1:]:
        base += 1 if char == "#" else -1
    return base % 12


def parse_note(note):
    match = re.fullmatch(r"([A-G])([#b]{0,2})(-?\d+)", note)
    if not match:
        raise ValueError(f"Unsupported written pitch: {note}")
    letter, accidental, octave_text = match.groups()
    octave = int(octave_text)
    midi = 12 * (octave + 1) + {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}[letter]
    midi += sum(1 if symbol == "#" else -1 for symbol in accidental)
    return {"letter": letter, "accidental": accidental, "octave": octave, "midi": midi, "note": note}


def draw_clef(pdf, clef, x, y):
    """Draw original vector clef marks so no music-symbol font is embedded."""
    pdf.saveState()
    pdf.setStrokeColor(INK)
    pdf.setFillColor(INK)
    pdf.setLineWidth(1.35)
    if clef == "treble":
        center = x + 23
        path = pdf.beginPath()
        path.moveTo(center + 1, y - 9)
        path.curveTo(center - 10, y - 6, center - 10, y + 5, center + 1, y + 10)
        path.curveTo(center + 13, y + 15, center + 12, y + 27, center + 2, y + 31)
        path.curveTo(center - 7, y + 35, center - 5, y + 45, center + 1, y + 48)
        path.curveTo(center + 8, y + 44, center + 7, y + 36, center + 1, y + 29)
        path.lineTo(center - 2, y - 10)
        path.curveTo(center - 3, y - 16, center + 6, y - 17, center + 7, y - 10)
        path.curveTo(center + 7, y - 4, center - 1, y - 3, center - 3, y - 8)
        pdf.drawPath(path, fill=0, stroke=1)
        pdf.circle(center, y + 10, 2.5, fill=1, stroke=0)
    else:
        center = x + 22
        path = pdf.beginPath()
        path.moveTo(center - 7, y + 23)
        path.curveTo(center - 3, y + 34, center + 11, y + 31, center + 11, y + 19)
        path.curveTo(center + 11, y + 8, center + 2, y + 2, center - 8, y + 1)
        pdf.drawPath(path, fill=0, stroke=1)
        pdf.circle(center - 7, y + 23, 2.8, fill=1, stroke=0)
        pdf.circle(center + 17, y + 21, 1.7, fill=1, stroke=0)
        pdf.circle(center + 17, y + 14, 1.7, fill=1, stroke=0)
    pdf.restoreState()


def staff(pdf, notes, x, y, width, clef):
    parsed = [parse_note(note) for note in notes]
    letters = "CDEFGAB"
    bottom_line = 4 * 7 + 2 if clef == "treble" else 2 * 7 + 4
    steps = [item["octave"] * 7 + letters.index(item["letter"]) - bottom_line for item in parsed]
    pdf.setStrokeColor(colors.HexColor("#8B919A"))
    for row in range(5):
        pdf.line(x, y + row * 6, x + width, y + row * 6)
    pdf.setFont("Helvetica-Bold", 7)
    pdf.setFillColor(MUTED)
    pdf.drawString(x, y + 30, "TREBLE CLEF" if clef == "treble" else "BASS CLEF")
    draw_clef(pdf, clef, x, y)
    usable_x = x + 66
    step_x = (width - 70) / max(len(notes), 1)
    for index, (item, staff_step) in enumerate(zip(parsed, steps)):
        note_y = y + staff_step * 3
        note_x = usable_x + step_x * (index + .5)
        ledger_steps = list(range(-2, staff_step - 1, -2)) if staff_step < 0 else list(range(10, staff_step + 1, 2)) if staff_step > 8 else []
        for ledger in ledger_steps:
            pdf.setStrokeColor(INK)
            pdf.line(note_x - 8, y + ledger * 3, note_x + 8, y + ledger * 3)
        pdf.setFillColor(INK)
        pdf.ellipse(note_x - 4, note_y - 3, note_x + 4, note_y + 3, fill=1, stroke=0)
        if item["accidental"]:
            pdf.setFont("Helvetica", 7)
            pdf.drawRightString(note_x - 7, note_y - 2, item["accidental"])
        pdf.setFont("Helvetica", 6.5)
        pdf.drawCentredString(note_x, y - 25, item["note"])


def keyboard(pdf, notes, x, y, width):
    parsed = [parse_note(note) for note in notes]
    labels = {item["midi"]: item["note"] for item in parsed}
    marked = set(labels)
    low, high = min(marked), max(marked)
    white_pcs = {0, 2, 4, 5, 7, 9, 11}
    white = [midi for midi in range(low, high + 1) if midi % 12 in white_pcs]
    black = [midi for midi in range(low, high + 1) if midi % 12 not in white_pcs]
    key_w = width / len(white)
    white_x = {midi: x + index * key_w for index, midi in enumerate(white)}
    for midi in white:
        pdf.setFillColor(colors.HexColor("#EAF2FF") if midi in marked else colors.white)
        pdf.setStrokeColor(colors.HexColor("#8B919A"))
        pdf.rect(white_x[midi], y, key_w, 40, fill=1, stroke=1)
        if midi in labels:
            pdf.setFillColor(INK)
            pdf.setFont("Helvetica-Bold", 6.5)
            pdf.drawCentredString(white_x[midi] + key_w / 2, y + 4, labels[midi])
    for midi in black:
        next_white = next((value for value in white if value > midi), None)
        previous_white = next((value for value in reversed(white) if value < midi), None)
        if next_white is not None:
            boundary = white_x[next_white]
        elif previous_white is not None:
            boundary = white_x[previous_white] + key_w
        else:
            continue
        bx = boundary - key_w * .28
        pdf.setFillColor(BLUE if midi in marked else INK)
        pdf.rect(bx, y + 14, key_w * .56, 20, fill=1, stroke=0)
        if midi in labels:
            pdf.setFillColor(colors.white)
            pdf.setFont("Helvetica-Bold", 5.5)
            pdf.drawCentredString(boundary, y + 17, labels[midi])


def direction_panel(pdf, y, label, notes, fingers, clef):
    height = 252
    pdf.setFillColor(SURFACE)
    pdf.roundRect(LEFT, y - height, CONTENT_W, height, 8, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(LEFT + 16, y - 22, label)
    pdf.setFont("Helvetica", 8.5)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(LEFT + CONTENT_W - 16, y - 22, "Actual ordered pitches")
    wrap(pdf, "Notes: " + " - ".join(notes), LEFT + 16, y - 42, CONTENT_W - 32, size=8.5, leading=11)
    wrap(pdf, "Fingers: " + (" - ".join(map(str, fingers)) if fingers else "Not source-checked; notes only"), LEFT + 16, y - 66, CONTENT_W - 32, size=8, leading=10, color=MUTED)
    staff(pdf, notes, LEFT + 24, y - 142, CONTENT_W - 48, clef)
    keyboard(pdf, notes, LEFT + 24, y - 232, CONTENT_W - 48)
    return y - height


def hand_page(pdf, page_number, form_name, hand_label, ascending, descending, up_fingers, down_fingers, scope):
    clef = "treble" if hand_label == "Right hand" else "bass"
    header(pdf, f"{form_name} · {hand_label}", "One octave · separate-hand reference · both directions shown", page_number)
    y = PAGE_H - 92
    y = direction_panel(pdf, y, "Ascending · low to high", ascending, up_fingers, clef) - 12
    y = direction_panel(pdf, y, "Descending · high to low", descending, down_fingers, clef) - 16
    wrap(pdf, scope, LEFT, y, CONTENT_W, size=7.5, leading=9, color=MUTED)


def source_rows(master, source_ids):
    by_id = {item["source_id"]: item for item in master["sources"]}
    return [by_id[source_id] for source_id in source_ids if source_id in by_id]


def mapped(form, key):
    return [f"{item['spelling']}{item['written_octave']}" for item in form["pitch_mapping"][key]]


def generate_reference(master):
    path = OUT / "pianogrid-scales-starter-reference.pdf"
    pdf = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("C Major & A Minor - One-Octave Piano Reference")
    pdf.setAuthor("PianoGrid")
    pdf.setSubject(f"Generator {GENERATOR_VERSION}; input SHA-256 {INPUT_SHA256}")
    header(pdf, "C Major & A Minor", "One-Octave Piano Reference · hands shown separately", 1)
    y = PAGE_H - 115
    y = wrap(pdf, "This reference contains C major plus natural, harmonic and classical melodic A minor. It is not an all-scales book, a two-octave fingering guide or a two-hand synchronization exercise.", LEFT, y, CONTENT_W, size=11, leading=16)
    y -= 18
    for item in ["Read the form and direction before using a note row.", "Finger numbers appear only where the exact hand, direction and one-octave scope has a source.", "Notes-only rows keep their staff, keyboard and note sequence without borrowing finger numbers."]:
        pdf.setFillColor(BLUE)
        pdf.circle(LEFT + 4, y + 3, 2, fill=1, stroke=0)
        y = wrap(pdf, item, LEFT + 14, y + 6, CONTENT_W - 14, size=10, leading=15) - 4
    pdf.setFillColor(SURFACE)
    pdf.roundRect(LEFT, 110, CONTENT_W, 150, 8, fill=1, stroke=0)
    wrap(pdf, "Coverage and build identity", LEFT + 16, 235, CONTENT_W - 32, size=11, leading=14, font="Helvetica-Bold")
    wrap(pdf, f"Generator: {GENERATOR_VERSION}. Input SHA-256: {INPUT_SHA256}. Coverage: C major plus A natural, harmonic and classical melodic minor; one octave; separate hands; ascending and descending pitch diagrams. Finger numbers are omitted when the required source scope is unavailable.", LEFT + 16, 215, CONTENT_W - 32, size=8.5, leading=12, color=MUTED)
    pdf.showPage()

    header(pdf, "Sources, rights & limits", "Human-readable URLs and source locators", 2)
    source_ids = ["AM-NOTES-C-MAJOR", "AM-FINGER-LMT", "AM-FINGER-MF", "AN-OMT", "AN-PS-NAT", "AN-PS-HAR", "AN-PS-MEL", "AN-DENTON", "AN-HA-A"]
    y = PAGE_H - 96
    for source in source_rows(master, source_ids):
        y = wrap(pdf, f"{source['source_id']} · {source['title']}", LEFT, y, CONTENT_W, size=8.5, leading=10, font="Helvetica-Bold")
        y = wrap(pdf, source["url"], LEFT, y - 1, CONTENT_W, size=7.5, leading=9, color=BLUE)
        y = wrap(pdf, f"Locator: {source.get('locator') or 'not supplied'}", LEFT, y - 1, CONTENT_W, size=7.5, leading=9, color=MUTED) - 7
    y -= 2
    y = wrap(pdf, "Rights and provenance", LEFT, y, CONTENT_W, size=9, leading=11, font="Helvetica-Bold")
    wrap(pdf, "Scale facts, note spellings and source-scoped fingering facts are transcribed from the named references. PianoGrid created this PDF's text, diagrams and layout. No third-party source PDF, image, music engraving or font file is embedded. Helvetica is a built-in PDF base font.", LEFT, y - 2, CONTENT_W, size=7.5, leading=9, color=MUTED)
    pdf.showPage()

    c = master["pages"]["/scales/c-major"]["data"]
    objects = [("C major", None)] + [(form["label"].replace(" (classical exercise)", " - classical"), form) for form in master["pages"]["/scales/a-minor"]["data"]["forms"]]
    page_number = 3
    for name, form in objects:
        if form is None:
            for hand, label in [("RH", "Right hand"), ("LH", "Left hand")]:
                hand_page(pdf, page_number, name, label, [item["note"] for item in c["pitch_sequences"][hand]["ascending"]], [item["note"] for item in c["pitch_sequences"][hand]["descending"]], c["fingering"][hand]["ascending"], c["fingering"][hand]["descending"], "Source-documented C-major one-octave row. The displayed register is PianoGrid's labeled reference range.")
                pdf.showPage()
                page_number += 1
        else:
            fingering = form["fingering"]
            for hand, label, source_name in [("right_hand", "Right hand", "right_hand"), ("left_hand", "Left hand", "left_hand")]:
                scope = "Ascending fingering retains its named source scope."
                if form["id"] == "natural_minor":
                    scope += " Natural-minor descending is transcribed from LearnMusicTheory page 2 A row; RH is an explicit octave adaptation." if hand == "right_hand" else " Natural-minor descending matches the source A3-A4 register."
                else:
                    scope += " Descending fingering is not source-checked; notes only."
                hand_page(pdf, page_number, name, label, mapped(form, f"{source_name}_ascending_example"), mapped(form, f"{source_name}_descending_example"), fingering["ascending"][hand], fingering["descending"][hand], scope)
                pdf.showPage()
                page_number += 1
    pdf.save()
    return path


def answer_rule(pdf, y, number, answer):
    pdf.setFillColor(BLUE)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(LEFT, y, str(number))
    return wrap(pdf, answer, LEFT + 22, y, CONTENT_W - 22, size=10, leading=15)


def generate_worksheet():
    path = OUT / "pianogrid-scales-notes-check-worksheet.pdf"
    pdf = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("Piano Scale Notes - Practice Worksheet")
    pdf.setAuthor("PianoGrid")
    pdf.setSubject(f"Generator {GENERATOR_VERSION}; input SHA-256 {INPUT_SHA256}")
    header(pdf, "Piano Scale Notes", "Practice Worksheet · note knowledge, not performance scoring", 1)
    pdf.setFont("Helvetica", 10)
    pdf.setFillColor(INK)
    pdf.drawString(LEFT, PAGE_H - 96, "Name: ______________________________")
    pdf.drawRightString(LEFT + CONTENT_W, PAGE_H - 96, "Date: ____________________")
    y = PAGE_H - 130
    y = wrap(pdf, "Use the note references to check the scale name, form and direction. These questions check note knowledge, not piano technique.", LEFT, y, CONTENT_W, size=10, leading=15) - 18
    for number, title, lines in [
        (1, "Select the notes", ["Circle every note used in A harmonic minor ascending:", "A     B     C     D     E     F     G     G#", "Which natural-minor note changes? ______________________________"]),
        (2, "Complete the octave", ["Fill the two blanks to complete C major ascending:", "C4     D4     ______     F4     G4     A4     B4     ______"]),
        (3, "Choose the classical descent", ["For A melodic minor descending under the classical scale-exercise convention, choose one:", "A. A5-G5-F5-E5-D5-C5-B4-A4", "B. A5-G#5-F#5-E5-D5-C5-B4-A4", "Explain what happens to F and G: _________________________________", "________________________________________________________________"]),
    ]:
        pdf.setFillColor(SURFACE)
        box_h = 120 if number < 3 else 172
        pdf.roundRect(LEFT, y - box_h + 12, CONTENT_W, box_h, 8, fill=1, stroke=0)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(LEFT + 16, y - 10, f"{number}. {title}")
        row_y = y - 34
        for line in lines:
            row_y = wrap(pdf, line, LEFT + 16, row_y, CONTENT_W - 32, size=9.5, leading=14) - 6
        y -= box_h + 14
    pdf.showPage()

    header(pdf, "My practice record", "Self-reported · no microphone, MIDI or performance score", 2)
    y = PAGE_H - 105
    columns = [130, 130, 110, 150]
    labels = ["Scale / form", "Hand / direction", "Tempo / notes per beat", "What I noticed"]
    x = LEFT
    pdf.setFillColor(SURFACE)
    pdf.rect(LEFT, y - 30, CONTENT_W, 30, fill=1, stroke=0)
    for width, label in zip(columns, labels):
        pdf.setFont("Helvetica-Bold", 7.5)
        pdf.setFillColor(INK)
        pdf.drawString(x + 5, y - 18, label)
        x += width
    for row in range(5):
        top = y - 30 - row * 64
        pdf.setStrokeColor(LINE)
        pdf.rect(LEFT, top - 64, CONTENT_W, 64, fill=0, stroke=1)
        x = LEFT
        for width in columns[:-1]:
            x += width
            pdf.line(x, top, x, top - 64)
    wrap(pdf, "I marked this practice complete: __________", LEFT, y - 385, CONTENT_W, size=10, leading=14)
    wrap(pdf, "I would like to try again: __________", LEFT + 280, y - 385, CONTENT_W - 280, size=10, leading=14)
    y2 = y - 440
    wrap(pdf, "Reminder", LEFT, y2, CONTENT_W, size=11, leading=14, font="Helvetica-Bold")
    wrap(pdf, "A completion mark records your own session. It does not mean the website heard your piano or measured accuracy.", LEFT, y2 - 20, CONTENT_W, size=9.5, leading=14, color=MUTED)
    pdf.showPage()

    header(pdf, "Answers", "Keep this page separate while completing the worksheet", 3)
    y = PAGE_H - 110
    y = answer_rule(pdf, y, 1, "A, B, C, D, E, F, G#. G is raised to G#.") - 22
    y = answer_rule(pdf, y, 2, "E4 and C5. The final C is an octave above the first C.") - 22
    y = answer_rule(pdf, y, 3, "Choice A. F and G return to their natural-minor values in this classical descending exercise.") - 32
    wrap(pdf, "Reference and scope", LEFT, y, CONTENT_W, size=11, leading=14, font="Helvetica-Bold")
    y = wrap(pdf, "PianoGrid Scales: C Major and A Minor. Scale-form rules are documented in Open Music Theory: https://viva.pressbooks.pub/openmusictheory/chapter/minor-scales/ . This worksheet is an original note-knowledge exercise, not a teacher-reviewed performance assessment.", LEFT, y - 22, CONTENT_W, size=9, leading=14, color=MUTED)
    wrap(pdf, f"Generator: {GENERATOR_VERSION}. Input SHA-256: {INPUT_SHA256}. No third-party source PDF, image, engraving or font file is embedded.", LEFT, y - 12, CONTENT_W, size=7.5, leading=10, color=MUTED)
    pdf.showPage()
    pdf.save()
    return path


def write_generation_metadata(master, outputs):
    c = master["pages"]["/scales/c-major"]["data"]
    sections = []
    for hand, label in [("RH", "right_hand"), ("LH", "left_hand")]:
        sections.append({
            "scale": "c_major",
            "hand": label,
            "ascending": [item["note"] for item in c["pitch_sequences"][hand]["ascending"]],
            "descending": [item["note"] for item in c["pitch_sequences"][hand]["descending"]],
            "ascending_fingering": c["fingering"][hand]["ascending"],
            "descending_fingering": c["fingering"][hand]["descending"],
        })
    for form in master["pages"]["/scales/a-minor"]["data"]["forms"]:
        for hand in ["right_hand", "left_hand"]:
            sections.append({
                "scale": form["id"],
                "hand": hand,
                "ascending": mapped(form, f"{hand}_ascending_example"),
                "descending": mapped(form, f"{hand}_descending_example"),
                "ascending_fingering": form["fingering"]["ascending"][hand],
                "descending_fingering": form["fingering"]["descending"][hand],
            })
    for section in sections:
        section["ascending_midi"] = [parse_note(note)["midi"] for note in section["ascending"]]
        section["descending_midi"] = [parse_note(note)["midi"] for note in section["descending"]]
    metadata = {
        "generator_version": GENERATOR_VERSION,
        "input_path": MASTER.relative_to(ROOT).as_posix(),
        "input_sha256": INPUT_SHA256,
        "page_format": "A4" if os.environ.get("PIANO_SCALE_PDF_PAGE") == "A4" else "LETTER",
        "page_size_points": [PAGE_W, PAGE_H],
        "coverage": {
            "forms": ["c_major", "natural_minor", "harmonic_minor", "melodic_minor_classical"],
            "hands": ["right_hand", "left_hand"],
            "directions": ["ascending", "descending"],
            "range": "one_octave",
        },
        "rights": "PianoGrid original text, diagrams and layout; source facts transcribed; no third-party source file or font file embedded.",
        "outputs": [Path(output).name for output in outputs],
        "sections": sections,
    }
    default_metadata = ROOT / "checks" / "scales-step2-final" / f"generation-metadata-{metadata['page_format'].lower()}.json"
    path = Path(os.environ.get("PIANO_SCALE_PDF_METADATA", default_metadata))
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return path


if __name__ == "__main__":
    master = load_data()
    outputs = (generate_reference(master), generate_worksheet())
    metadata = write_generation_metadata(master, outputs)
    for output in (*outputs, metadata):
        print(output.relative_to(ROOT))
