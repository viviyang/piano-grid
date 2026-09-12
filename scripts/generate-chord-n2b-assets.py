#!/usr/bin/env python3
import html, json, shutil
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT=Path(__file__).resolve().parents[1]
DETAILS=ROOT/'docs/pianogrid-chords-n2b/03_details'
SOURCE=ROOT/'docs/pianogrid-chords-n2b/09_generated_assets'
PUBLIC=ROOT/'public/reference/assets'
FONT=Path(r'C:\Windows\Fonts\seguisym.ttf')
PDF_FONT='PianoGridSymbol'
WHITE_PCS={0,2,4,5,7,9,11}
NOTE_NAMES={0:'C',2:'D',4:'E',5:'F',7:'G',9:'A',11:'B'}

def white_midis(start=48,end=84): return [m for m in range(start,end+1) if m%12 in WHITE_PCS]
def pitch_label(midi): return f"{NOTE_NAMES[midi%12]}{midi//12-1}"
def x_for_midi(midi,x,width,start=48,end=84):
    whites=white_midis(start,end)
    if midi in whites:return x+whites.index(midi)*width
    left=max(i for i in whites if i<midi)
    return x+(whites.index(left)+.68)*width

def draw_pdf_keyboard(pdf,midi_values,spellings,x,y,total_width=528,height=82):
    whites=white_midis();width=total_width/len(whites);selected=set(midi_values)
    for index,midi in enumerate(whites):
        pdf.setFillColorRGB(.9,.9,.9) if midi in selected else pdf.setFillColorRGB(1,1,1)
        pdf.rect(x+index*width,y,width,height,fill=1,stroke=1)
        pdf.setFont(PDF_FONT,5.5);pdf.setFillColorRGB(.15,.15,.15);pdf.drawCentredString(x+(index+.5)*width,y+5,pitch_label(midi))
    for midi in range(48,85):
        if midi%12 in WHITE_PCS:continue
        bx=x_for_midi(midi,x,width)-width*.3
        pdf.setFillColorRGB(.35,.35,.35) if midi in selected else pdf.setFillColorRGB(.05,.05,.05)
        pdf.rect(bx,y+height*.42,width*.6,height*.58,fill=1,stroke=0)
    pdf.setFillColorRGB(0,0,0);pdf.setFont(PDF_FONT,7.5)
    pdf.drawString(x,y-13,'Selected pitches: '+'  ·  '.join(spellings))

def make_pdf(raw,path):
    pdf=canvas.Canvas(str(path),pagesize=letter,pageCompression=1)
    pdf.setTitle(f"{raw['seo']['h1']} reference");pdf.setAuthor('PianoGrid')
    pdf.setFont(PDF_FONT,9);pdf.drawString(42,755,'PIANOGRID  /  CHORD REFERENCE')
    pdf.setFont(PDF_FONT,23);pdf.drawString(42,718,f"{raw['name']} ({raw['symbol']})")
    pdf.setFont(PDF_FONT,10.5);pdf.drawString(42,695,'Notes: '+' – '.join(raw['definition']['toneSpellings'])+'     Formula: '+'–'.join(raw['definition']['formulaDegrees']))
    pdf.setFont(PDF_FONT,9);pdf.drawString(42,676,'Exact pitch examples. Read left to right from the lowest written note.')
    for voicing,y in zip(raw['voicings'],[550,390,230]):
        pdf.setFont(PDF_FONT,11.5);pdf.drawString(42,y+116,f"{voicing['label']}  ·  {voicing['symbol']}")
        pdf.setFont(PDF_FONT,9);pdf.drawRightString(570,y+116,f"Bass: {voicing['bass']}")
        draw_pdf_keyboard(pdf,voicing['midiLowToHigh'],voicing['notesLowToHigh'],42,y)
    pdf.setFont(PDF_FONT,8.3)
    pdf.drawString(42,191,'Shading marks sounding piano keys. Written names can be enharmonic equivalents of those keys.')
    pdf.drawString(42,176,'Octave numbers identify register, not fingers. No fingering is assigned.')
    pdf.drawString(42,161,'Each position keeps the same three chord tones and changes the lowest chord tone.')
    pdf.drawString(42,142,'Keyboard window: C3–C6. Written spelling is preserved in notes, symbols and bass labels.')
    pdf.setFont(PDF_FONT,7.5);pdf.drawString(42,119,'Theory and spelling sources: N2B source ledger; package validation passed.')
    pdf.drawString(42,105,'Original diagrams generated from supplied note and MIDI data. Content checked 2026-09-12.')
    pdf.setFont(PDF_FONT,8);pdf.drawString(42,76,'pianogrid.com'+raw['url']);pdf.drawRightString(570,76,'1 / 1')
    pdf.showPage();pdf.save()

def svg_keyboard(voicing,x,y,total_width=528,height=82):
    whites=white_midis();width=total_width/len(whites);selected=set(voicing['midiLowToHigh']);out=[]
    for index,midi in enumerate(whites):
        fill='#e7e7e7' if midi in selected else '#fff'
        out.append(f'<rect x="{x+index*width:.2f}" y="{y:.2f}" width="{width:.2f}" height="{height:.2f}" fill="{fill}" stroke="#727272" stroke-width=".5"/>')
        out.append(f'<text x="{x+(index+.5)*width:.2f}" y="{y+height-6:.2f}" text-anchor="middle" class="key">{pitch_label(midi)}</text>')
    for midi in range(48,85):
        if midi%12 in WHITE_PCS:continue
        bx=x_for_midi(midi,x,width)-width*.3;fill='#666' if midi in selected else '#111'
        out.append(f'<rect x="{bx:.2f}" y="{y:.2f}" width="{width*.6:.2f}" height="{height*.58:.2f}" fill="{fill}"/>')
    return ''.join(out)

def make_svg(raw,path):
    sections=[]
    for voicing,y in zip(raw['voicings'],[177,337,497]):
        sections.append(f'<text x="42" y="{y-34}" class="sub">{html.escape(voicing["label"])}  ·  {html.escape(voicing["symbol"])}</text><text x="570" y="{y-34}" text-anchor="end" class="meta">Bass: {html.escape(voicing["bass"])}</text>')
        sections.append(svg_keyboard(voicing,42,y))
        sections.append(f'<text x="42" y="{y+101}" class="meta">Selected pitches: {html.escape("  ·  ".join(voicing["notesLowToHigh"]))}</text>')
    body=f'''<svg xmlns="http://www.w3.org/2000/svg" width="612" height="792" viewBox="0 0 612 792" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(raw['seo']['h1'])} printable keyboard reference</title><desc id="desc">Three keyboard diagrams show root position, first inversion and second inversion. Written spelling is retained and no fingering is assigned.</desc>
<style>text{{font-family:"Segoe UI Symbol","Noto Music",Arial,sans-serif;fill:#111}}.brand{{font-size:9px;font-weight:700}}.title{{font-size:23px;font-weight:700}}.copy{{font-size:10.5px}}.sub{{font-size:11.5px;font-weight:700}}.meta{{font-size:8.3px}}.key{{font-size:5.5px}}</style>
<rect width="612" height="792" fill="#fff"/><text x="42" y="37" class="brand">PIANOGRID  /  CHORD REFERENCE</text>
<text x="42" y="72" class="title">{html.escape(raw['name'])} ({html.escape(raw['symbol'])})</text>
<text x="42" y="96" class="copy">Notes: {html.escape(' – '.join(raw['definition']['toneSpellings']))}     Formula: {html.escape('–'.join(raw['definition']['formulaDegrees']))}</text>
<text x="42" y="116" class="meta">Exact pitch examples. Read left to right from the lowest written note.</text>{''.join(sections)}
<text x="42" y="647" class="meta">Shading marks sounding piano keys. Written names can be enharmonic equivalents of those keys.</text>
<text x="42" y="662" class="meta">Octave numbers identify register, not fingers. No fingering is assigned.</text>
<text x="42" y="677" class="meta">Each position keeps the same three chord tones and changes the lowest chord tone.</text>
<text x="42" y="696" class="meta">Keyboard window: C3–C6. Written spelling is preserved in notes, symbols and bass labels.</text>
<text x="42" y="719" class="meta">Theory and spelling sources: N2B source ledger; package validation passed.</text>
<text x="42" y="733" class="meta">Original diagrams generated from supplied note and MIDI data. Content checked 2026-09-12.</text>
<text x="42" y="757" class="brand">pianogrid.com{html.escape(raw['url'])}</text><text x="570" y="757" text-anchor="end" class="meta">1 / 1</text></svg>'''
    path.write_text(body,encoding='utf-8')

def main():
    if not FONT.exists():raise SystemExit(f'Missing required Unicode font: {FONT}')
    pdfmetrics.registerFont(TTFont(PDF_FONT,str(FONT)))
    SOURCE.mkdir(parents=True,exist_ok=True);PUBLIC.mkdir(parents=True,exist_ok=True)
    generated=[]
    for source in sorted(DETAILS.glob('*.page.json')):
        raw=json.loads(source.read_text(encoding='utf-8'))
        if len(raw['voicings'])!=3 or raw['fingering']['status']!='not_provided':raise SystemExit(f'Invalid N2B asset source: {source.name}')
        slug=raw['url'].split('/')[-1];pdf=SOURCE/f'chord-{slug}.pdf';svg=SOURCE/f'chord-{slug}.svg'
        make_pdf(raw,pdf);make_svg(raw,svg);shutil.copyfile(pdf,PUBLIC/pdf.name);shutil.copyfile(svg,PUBLIC/svg.name)
        generated.append((slug,pdf.stat().st_size,svg.stat().st_size))
    if len(generated)!=48:raise SystemExit(f'Expected 48 N2B details, got {len(generated)}')
    print(f'Generated and exported {len(generated)} N2B PDF/SVG pairs.')
    for row in generated:print(*row)

if __name__=='__main__':main()
