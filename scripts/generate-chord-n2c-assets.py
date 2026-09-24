#!/usr/bin/env python3
import html, json, shutil
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from chord_pdf_font import register_chord_pdf_font

ROOT=Path(__file__).resolve().parents[1]
DETAILS=ROOT/'docs/pianogrid-chords-n2c/03_details'
SOURCE=ROOT/'docs/pianogrid-chords-n2c/09_generated_assets'
PUBLIC=ROOT/'public/reference/assets'
FONT=Path(r'C:\Windows\Fonts\NotoSansSC-VF.ttf')
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

def draw_pdf_keyboard(pdf,midi_values,spellings,x,y,total_width=528,height=112):
    whites=white_midis();width=total_width/len(whites);selected=set(midi_values)
    for index,midi in enumerate(whites):
        pdf.setFillColorRGB(.9,.9,.9) if midi in selected else pdf.setFillColorRGB(1,1,1)
        pdf.rect(x+index*width,y,width,height,fill=1,stroke=1)
        pdf.setFont(PDF_FONT,6);pdf.setFillColorRGB(.15,.15,.15);pdf.drawCentredString(x+(index+.5)*width,y+6,pitch_label(midi))
    for midi in range(48,85):
        if midi%12 in WHITE_PCS:continue
        bx=x_for_midi(midi,x,width)-width*.3
        pdf.setFillColorRGB(.35,.35,.35) if midi in selected else pdf.setFillColorRGB(.05,.05,.05)
        pdf.rect(bx,y+height*.42,width*.6,height*.58,fill=1,stroke=0)
    pdf.setFillColorRGB(0,0,0);pdf.setFont(PDF_FONT,8.5)
    pdf.drawString(x,y-16,'Selected pitches: '+'  -  '.join(spellings))

def draw_pdf_page(pdf,raw,voicings,page_number):
    pdf.setFont(PDF_FONT,9);pdf.drawString(42,755,'PIANOGRID  /  SEVENTH CHORD REFERENCE')
    pdf.setFont(PDF_FONT,23);pdf.drawString(42,718,f"{raw['name']} ({raw['symbol']})")
    pdf.setFont(PDF_FONT,10.5);pdf.drawString(42,695,'Notes: '+' - '.join(raw['definition']['toneSpellings'])+'     Formula: '+'-'.join(raw['definition']['formulaDegrees']))
    pdf.setFont(PDF_FONT,9);pdf.drawString(42,676,'Exact four-note pitch examples. Read left to right from the lowest written note.')
    for voicing,y in zip(voicings,[430,205]):
        pdf.setFont(PDF_FONT,12);pdf.drawString(42,y+153,f"{voicing['label']}  -  {voicing['symbol']}")
        pdf.setFont(PDF_FONT,9);pdf.drawRightString(570,y+153,f"Bass: {voicing['bass']}")
        draw_pdf_keyboard(pdf,voicing['midiLowToHigh'],voicing['notesLowToHigh'],42,y)
    pdf.setFont(PDF_FONT,8.3)
    pdf.drawString(42,154,'Shading marks sounding piano keys. Written names can be enharmonic equivalents of those keys.')
    pdf.drawString(42,139,'Octave numbers identify register, not fingers. No fingering is assigned.')
    pdf.drawString(42,124,'All four positions keep the same pitch-class set and change the lowest chord tone.')
    pdf.drawString(42,109,'Keyboard window: C3-C6. Written spelling is preserved in notes, symbols and bass labels.')
    pdf.setFont(PDF_FONT,7.5);pdf.drawString(42,88,'Theory reference: Open Music Theory, Seventh Chords. See the chord page for scope.')
    pdf.drawString(42,74,'Original keyboard diagrams show the written notes and MIDI pitches above.')
    pdf.setFont(PDF_FONT,8);pdf.drawString(42,50,'pianogrid.com'+raw['url']);pdf.drawRightString(570,50,f'{page_number} / 2')

def make_pdf(raw,path):
    pdf=canvas.Canvas(str(path),pagesize=letter,pageCompression=1)
    pdf.setTitle(f"{raw['seo']['h1']} reference");pdf.setAuthor('PianoGrid')
    for page_number,start in enumerate((0,2),1):
        draw_pdf_page(pdf,raw,raw['voicings'][start:start+2],page_number)
        pdf.showPage()
    pdf.save()

def svg_keyboard(voicing,x,y,total_width=528,height=92):
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
    for voicing,y in zip(raw['voicings'],[165,355,545,735]):
        sections.append(f'<text x="42" y="{y-30}" class="sub">{html.escape(voicing["label"])}  -  {html.escape(voicing["symbol"])}</text><text x="570" y="{y-30}" text-anchor="end" class="meta">Bass: {html.escape(voicing["bass"])}</text>')
        sections.append(svg_keyboard(voicing,42,y))
        sections.append(f'<text x="42" y="{y+114}" class="meta">Selected pitches: {html.escape("  -  ".join(voicing["notesLowToHigh"]))}</text>')
    body=f'''<svg xmlns="http://www.w3.org/2000/svg" width="612" height="1000" viewBox="0 0 612 1000" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(raw['seo']['h1'])} printable keyboard reference</title><desc id="desc">Four keyboard diagrams show root position and three inversions. Written spelling is retained and no fingering is assigned.</desc>
<style>text{{font-family:"Segoe UI Symbol","Noto Music",Arial,sans-serif;fill:#111}}.brand{{font-size:9px;font-weight:700}}.title{{font-size:23px;font-weight:700}}.copy{{font-size:10.5px}}.sub{{font-size:11.5px;font-weight:700}}.meta{{font-size:8.3px}}.key{{font-size:5.5px}}</style>
<rect width="612" height="1000" fill="#fff"/><text x="42" y="37" class="brand">PIANOGRID  /  SEVENTH CHORD REFERENCE</text>
<text x="42" y="72" class="title">{html.escape(raw['name'])} ({html.escape(raw['symbol'])})</text>
<text x="42" y="96" class="copy">Notes: {html.escape(' - '.join(raw['definition']['toneSpellings']))}     Formula: {html.escape('-'.join(raw['definition']['formulaDegrees']))}</text>
<text x="42" y="116" class="meta">Exact four-note pitch examples. Read left to right from the lowest written note.</text>{''.join(sections)}
<text x="42" y="878" class="meta">Shading marks sounding piano keys. Written names can be enharmonic equivalents of those keys.</text>
<text x="42" y="893" class="meta">Octave numbers identify register, not fingers. No fingering is assigned.</text>
<text x="42" y="908" class="meta">All four positions keep the same pitch-class set and change the lowest chord tone.</text>
<text x="42" y="923" class="meta">Keyboard window: C3-C6. Written spelling is preserved in notes, symbols and bass labels.</text>
<text x="42" y="946" class="meta">Theory reference: Open Music Theory, Seventh Chords. See the chord page for scope.</text>
<text x="42" y="974" class="brand">pianogrid.com{html.escape(raw['url'])}</text><text x="570" y="974" text-anchor="end" class="meta">4 positions</text></svg>'''
    path.write_text(body,encoding='utf-8')

def export_spelling(value):
    """ReportLab text extraction truncates supplementary-plane music glyphs.

    Two BMP accidentals retain the same written spelling and copy cleanly.
    Source JSON is unchanged; only the exported PDF/SVG text is normalized.
    """
    if isinstance(value,str):return value.replace('𝄫','♭♭').replace('𝄪','♯♯')
    if isinstance(value,list):return [export_spelling(item) for item in value]
    if isinstance(value,dict):return {key:export_spelling(item) for key,item in value.items()}
    return value

def main():
    register_chord_pdf_font(FONT, PDF_FONT)
    SOURCE.mkdir(parents=True,exist_ok=True);PUBLIC.mkdir(parents=True,exist_ok=True)
    generated=[]
    for source in sorted(DETAILS.glob('*.page.json')):
        raw=export_spelling(json.loads(source.read_text(encoding='utf-8')))
        if len(raw['voicings'])!=4 or raw['expectedNoteCount']!=4 or raw['fingering']['status']!='not_provided':raise SystemExit(f'Invalid N2C asset source: {source.name}')
        slug=raw['url'].split('/')[-1];pdf=SOURCE/f'chord-{slug}.pdf';svg=SOURCE/f'chord-{slug}.svg'
        make_pdf(raw,pdf);make_svg(raw,svg);shutil.copyfile(pdf,PUBLIC/pdf.name);shutil.copyfile(svg,PUBLIC/svg.name)
        generated.append((slug,pdf.stat().st_size,svg.stat().st_size))
    if len(generated)!=48:raise SystemExit(f'Expected 48 N2C details, got {len(generated)}')
    print(f'Generated and exported {len(generated)} N2C PDF/SVG pairs.')
    for row in generated:print(*row)

if __name__=='__main__':main()
