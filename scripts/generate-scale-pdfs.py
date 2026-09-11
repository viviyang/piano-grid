"""Generate the two approved PianoGrid Scales PDFs from current master data.

Uses built-in Helvetica only; no font files or third-party visual assets are copied.
"""
from pathlib import Path
import json
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "docs" / "content" / "site-master" / "page-content.master.json"
OUT = ROOT / "public" / "downloads" / "scales"
OUT.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = letter
CONTENT_W = 520  # fits inside A4 with 36pt margins as well as US Letter
LEFT = (PAGE_W - CONTENT_W) / 2
BLUE = colors.HexColor("#0066CC")
INK = colors.HexColor("#1D1D1F")
MUTED = colors.HexColor("#5C626B")
LINE = colors.HexColor("#E1E4E8")
SURFACE = colors.HexColor("#F6F7F9")


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


def staff(pdf, notes, x, y, width):
    pdf.setStrokeColor(colors.HexColor("#8B919A"))
    for row in range(5):
        pdf.line(x, y + row * 6, x + width, y + row * 6)
    step = width / max(len(notes), 1)
    letters = "CDEFGAB"
    for index, note in enumerate(notes):
        letter = note[0]
        octave = int(note[-1])
        pitch_step = octave * 7 + letters.index(letter)
        base_step = 4 * 7 + 2
        note_y = y + (pitch_step - base_step) * 3
        note_y = min(y + 38, max(y - 14, note_y))
        note_x = x + step * (index + .5)
        pdf.setFillColor(INK)
        pdf.ellipse(note_x - 4, note_y - 3, note_x + 4, note_y + 3, fill=1, stroke=0)
        if "#" in note or "b" in note:
            pdf.setFont("Helvetica", 7)
            pdf.drawRightString(note_x - 7, note_y - 2, "#" if "#" in note else "b")
        pdf.setFont("Helvetica", 6.5)
        pdf.drawCentredString(note_x, y - 25, note)


def keyboard(pdf, notes, x, y, width):
    pcs = {note_pc(note[:-1]) for note in notes}
    white = [0, 2, 4, 5, 7, 9, 11, 0]
    key_w = width / len(white)
    for index, pc in enumerate(white):
        pdf.setFillColor(colors.HexColor("#EAF2FF") if pc in pcs else colors.white)
        pdf.setStrokeColor(colors.HexColor("#8B919A"))
        pdf.rect(x + index * key_w, y, key_w, 34, fill=1, stroke=1)
    for index, pc in enumerate([1, 3, None, 6, 8, 10, None]):
        if pc is None:
            continue
        bx = x + (index + 1) * key_w - key_w * .28
        pdf.setFillColor(BLUE if pc in pcs else INK)
        pdf.rect(bx, y + 14, key_w * .56, 20, fill=1, stroke=0)


def reference_section(pdf, y, title, ascending, descending, up_fingers, down_fingers, scope):
    height = 265
    pdf.setFillColor(SURFACE)
    pdf.roundRect(LEFT, y - height, CONTENT_W, height, 8, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(LEFT + 16, y - 23, title)
    pdf.setFont("Helvetica", 8)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(LEFT + CONTENT_W - 16, y - 23, "1 octave · separate-hand reference")
    current = y - 47
    for label, notes, fingers in [("Ascending", ascending, up_fingers), ("Descending", descending, down_fingers)]:
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 8.5)
        pdf.drawString(LEFT + 16, current, label)
        pdf.setFont("Helvetica", 8.5)
        pdf.drawString(LEFT + 82, current, " - ".join(notes))
        pdf.setFillColor(MUTED)
        pdf.drawString(LEFT + 82, current - 12, "Fingers: " + (" - ".join(map(str, fingers)) if fingers else "Notes only - not source-checked for this direction"))
        current -= 29
    staff(pdf, ascending, LEFT + 24, current - 34, CONTENT_W - 48)
    current -= 100
    keyboard(pdf, ascending, LEFT + 24, current, CONTENT_W - 48)
    current -= 20
    wrap(pdf, scope, LEFT + 16, current, CONTENT_W - 32, size=7.5, leading=9, color=MUTED)
    return y - height - 14


def mapped(form, key):
    return [f"{item['spelling']}{item['written_octave']}" for item in form["pitch_mapping"][key]]


def generate_reference(master):
    path = OUT / "pianogrid-scales-starter-reference.pdf"
    pdf = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    pdf.setTitle("C Major & A Minor - One-Octave Piano Reference")
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
    wrap(pdf, "Source scope", LEFT + 16, 235, CONTENT_W - 32, size=11, leading=14, font="Helvetica-Bold")
    wrap(pdf, "Scale patterns and form conventions: Open Music Theory. C-major one-octave fingering: LearnMusicTheory and Music Fun. A-minor ascending fingering: named PianoScales/Hoffman records in PianoGrid. A-natural-minor descending fingering: LearnMusicTheory PDF page 2, printed page 40, A row. The right-hand PianoGrid display is one octave above that source staff and is marked as an adaptation.", LEFT + 16, 215, CONTENT_W - 32, size=8.5, leading=12, color=MUTED)
    pdf.showPage()

    c = master["pages"]["/scales/c-major"]["data"]
    objects = [("C major", None)] + [(form["label"].replace(" (classical exercise)", " - classical"), form) for form in master["pages"]["/scales/a-minor"]["data"]["forms"]]
    page_number = 2
    for name, form in objects:
        header(pdf, name, "Actual direction order · source-scoped one-octave reference", page_number)
        y = PAGE_H - 92
        if form is None:
            for hand, label in [("RH", "Right hand"), ("LH", "Left hand")]:
                y = reference_section(pdf, y, label, [item["note"] for item in c["pitch_sequences"][hand]["ascending"]], [item["note"] for item in c["pitch_sequences"][hand]["descending"]], c["fingering"][hand]["ascending"], c["fingering"][hand]["descending"], "Source-documented C-major one-octave row. The displayed register is PianoGrid's labeled reference range.")
        else:
            fingering = form["fingering"]
            for hand, label, source_name in [("right_hand", "Right hand", "right_hand"), ("left_hand", "Left hand", "left_hand")]:
                scope = "Ascending fingering retains its named source scope."
                if form["id"] == "natural_minor":
                    scope += " Natural-minor descending is transcribed from LearnMusicTheory page 2 A row; RH is an explicit octave adaptation." if hand == "right_hand" else " Natural-minor descending matches the source A3-A4 register."
                else:
                    scope += " Descending fingering is not source-checked; notes only."
                y = reference_section(pdf, y, label, mapped(form, f"{source_name}_ascending_example"), mapped(form, f"{source_name}_descending_example"), fingering["ascending"][hand], fingering["descending"][hand], scope)
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
    pdf = canvas.Canvas(str(path), pagesize=letter, pageCompression=1)
    pdf.setTitle("Piano Scale Notes - Practice Worksheet")
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
    wrap(pdf, "PianoGrid Scales: C Major and A Minor. Scale-form rules are documented in the cited Open Music Theory material. This worksheet is an original note-knowledge exercise, not a teacher-reviewed performance assessment.", LEFT, y - 22, CONTENT_W, size=9, leading=14, color=MUTED)
    pdf.showPage()
    pdf.save()
    return path


if __name__ == "__main__":
    master = load_data()
    for output in (generate_reference(master), generate_worksheet()):
        print(output.relative_to(ROOT))
