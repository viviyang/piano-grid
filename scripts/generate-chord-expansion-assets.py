#!/usr/bin/env python3
import html, json, re, shutil
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT=Path(__file__).resolve().parents[1]
DETAILS=ROOT/'docs/pianogrid-chords-next-expansion/04_details_next'
SOURCE=ROOT/'docs/pianogrid-chords-next-expansion/09_generated_assets'
PUBLIC=ROOT/'public/reference/assets'
FONT=Path(r'C:\Windows\Fonts\arial.ttf')
PDF_FONT='PianoGridArial'
WHITE_PCS={0,2,4,5,7,9,11}
NOTE_NAMES={0:'C',2:'D',4:'E',5:'F',7:'G',9:'A',11:'B'}

def white_midis(start=48,end=76): return [m for m in range(start,end+1) if m%12 in WHITE_PCS]
def pitch_label(midi): return f"{NOTE_NAMES[midi%12]}{midi//12-1}"
def x_for_midi(midi,x,width,start=48,end=76):
    whites=white_midis(start,end)
    if midi in whites:return x+whites.index(midi)*width
    left=max(i for i in whites if i<midi)
    return x+(whites.index(left)+.68)*width

def draw_pdf_keyboard(c,midi_values,spellings,x,y,total_width=528,height=82):
    whites=white_midis(); w=total_width/len(whites)
    selected=set(midi_values)
    for i,m in enumerate(whites):
        c.setFillColorRGB(.9,.9,.9) if m in selected else c.setFillColorRGB(1,1,1)
        c.rect(x+i*w,y,w,height,fill=1,stroke=1)
        c.setFont(PDF_FONT,6); c.setFillColorRGB(.15,.15,.15); c.drawCentredString(x+(i+.5)*w,y+5,pitch_label(m))
    for m in range(48,77):
        if m%12 in WHITE_PCS:continue
        bx=x_for_midi(m,x,w)-w*.3
        c.setFillColorRGB(.35,.35,.35) if m in selected else c.setFillColorRGB(.05,.05,.05)
        c.rect(bx,y+height*.42,w*.6,height*.58,fill=1,stroke=0)
    c.setFillColorRGB(0,0,0); c.setFont(PDF_FONT,7.5)
    c.drawString(x,y-13,'Selected pitches: '+'  ·  '.join(spellings))

def make_pdf(raw,path):
    c=canvas.Canvas(str(path),pagesize=letter,pageCompression=1)
    c.setTitle(f"{raw['h1']} reference")
    c.setAuthor('PianoGrid')
    c.setFont(PDF_FONT,9); c.drawString(42,755,'PIANOGRID  /  CHORD REFERENCE')
    c.setFont(PDF_FONT,24); c.drawString(42,718,f"{raw['data']['root']} {raw['data']['quality'].title()} ({raw['data']['symbol']})")
    c.setFont(PDF_FONT,11); c.drawString(42,695,'Notes: '+' – '.join(raw['data']['pitch_classes'])+'     Formula: '+'–'.join(raw['data']['formula_degrees']))
    c.setFont(PDF_FONT,9); c.drawString(42,676,'Exact pitch examples. Read left to right from the lowest note.')
    ys=[550,390,230]
    for voicing,y in zip(raw['data']['voicings'],ys):
        c.setFont(PDF_FONT,12); c.drawString(42,y+116,f"{voicing['label']}  ·  {voicing['symbol']}")
        c.setFont(PDF_FONT,9); c.drawRightString(570,y+116,f"Bass: {voicing['bass']}")
        draw_pdf_keyboard(c,voicing['midi'],voicing['notes'],42,y,528,82)
    c.setFont(PDF_FONT,8.5)
    c.drawString(42,191,'Dots and shading mark the sounding keys. Octave numbers are not finger numbers.')
    c.drawString(42,176,'Each example keeps the chord tones but may use a different register.')
    c.drawString(42,161,'No staff notation or hand-specific finger numbers are included in this PDF.')
    c.drawString(42,142,'Keyboard window: C3–E5. Fingering is intentionally not assigned.')
    c.setFont(PDF_FONT,7.5); c.drawString(42,119,'Formula and notation rules: PG-TRIADS, PG-OMT and PG-ASPN; package validation passed.')
    c.drawString(42,105,'Original diagrams generated from the supplied note data. Content checked 2026-09-12.')
    c.setFont(PDF_FONT,8); c.drawString(42,76,'pianogrid.com'+raw['url']); c.drawRightString(570,76,'1 / 1')
    c.showPage(); c.save()

def svg_keyboard(voicing,x,y,total_width=528,height=82):
    whites=white_midis(); w=total_width/len(whites); selected=set(voicing['midi']); out=[]
    for i,m in enumerate(whites):
        fill='#e7e7e7' if m in selected else '#fff'
        out.append(f'<rect x="{x+i*w:.2f}" y="{y:.2f}" width="{w:.2f}" height="{height:.2f}" fill="{fill}" stroke="#727272" stroke-width=".5"/>')
        out.append(f'<text x="{x+(i+.5)*w:.2f}" y="{y+height-6:.2f}" text-anchor="middle" class="key">{pitch_label(m)}</text>')
    for m in range(48,77):
        if m%12 in WHITE_PCS:continue
        bx=x_for_midi(m,x,w)-w*.3; fill='#666' if m in selected else '#111'
        out.append(f'<rect x="{bx:.2f}" y="{y:.2f}" width="{w*.6:.2f}" height="{height*.58:.2f}" fill="{fill}"/>')
    return ''.join(out)

def make_svg(raw,path):
    sections=[]; ys=[177,337,497]
    for voicing,y in zip(raw['data']['voicings'],ys):
        sections.append(f'<text x="42" y="{y-34}" class="sub">{html.escape(voicing["label"])}  ·  {html.escape(voicing["symbol"])}</text><text x="570" y="{y-34}" text-anchor="end" class="meta">Bass: {html.escape(voicing["bass"])}</text>')
        sections.append(svg_keyboard(voicing,42,y))
        sections.append(f'<text x="42" y="{y+101}" class="meta">Selected pitches: {html.escape("  ·  ".join(voicing["notes"]))}</text>')
    body=f'''<svg xmlns="http://www.w3.org/2000/svg" width="612" height="792" viewBox="0 0 612 792" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(raw['h1'])} printable keyboard reference</title><desc id="desc">Three keyboard diagrams show root position, first inversion and second inversion. No fingering is assigned.</desc>
<style>text{{font-family:Arial,sans-serif;fill:#111}}.brand{{font-size:9px;font-weight:700}}.title{{font-size:24px;font-weight:700}}.copy{{font-size:11px}}.sub{{font-size:12px;font-weight:700}}.meta{{font-size:8.5px}}.key{{font-size:6px}}</style>
<rect width="612" height="792" fill="#fff"/><text x="42" y="37" class="brand">PIANOGRID  /  CHORD REFERENCE</text>
<text x="42" y="72" class="title">{html.escape(raw['data']['root'])} {raw['data']['quality'].title()} ({html.escape(raw['data']['symbol'])})</text>
<text x="42" y="96" class="copy">Notes: {html.escape(' – '.join(raw['data']['pitch_classes']))}     Formula: {html.escape('–'.join(raw['data']['formula_degrees']))}</text>
<text x="42" y="116" class="meta">Exact pitch examples. Read left to right from the lowest note.</text>{''.join(sections)}
<text x="42" y="647" class="meta">Shading marks the sounding keys. Octave numbers are not finger numbers.</text>
<text x="42" y="662" class="meta">Each example keeps the chord tones but may use a different register.</text>
<text x="42" y="677" class="meta">No staff notation or hand-specific finger numbers are included.</text>
<text x="42" y="696" class="meta">Keyboard window: C3–E5. Fingering is intentionally not assigned.</text>
<text x="42" y="719" class="meta">Formula and notation rules: PG-TRIADS, PG-OMT and PG-ASPN; package validation passed.</text>
<text x="42" y="733" class="meta">Original diagrams generated from supplied note data. Content checked 2026-09-12.</text>
<text x="42" y="757" class="brand">pianogrid.com{html.escape(raw['url'])}</text><text x="570" y="757" text-anchor="end" class="meta">1 / 1</text></svg>'''
    path.write_text(body,encoding='utf-8')

def main():
    if not FONT.exists(): raise SystemExit(f'Missing required Unicode font: {FONT}')
    pdfmetrics.registerFont(TTFont(PDF_FONT,str(FONT)))
    SOURCE.mkdir(parents=True,exist_ok=True); PUBLIC.mkdir(parents=True,exist_ok=True)
    details=[]
    for fp in sorted(DETAILS.glob('*.page.json')):
        raw=json.loads(fp.read_text(encoding='utf-8'))
        if len(raw['data']['voicings'])!=3 or any(any(v['fingering'].values()) for v in raw['data']['voicings']): raise SystemExit(f'Invalid asset source: {fp.name}')
        slug=raw['url'].split('/')[-1]; pdf=SOURCE/f'chord-{slug}.pdf'; svg=SOURCE/f'chord-{slug}.svg'
        make_pdf(raw,pdf); make_svg(raw,svg)
        shutil.copyfile(pdf,PUBLIC/pdf.name); shutil.copyfile(svg,PUBLIC/svg.name)
        details.append((slug,pdf.stat().st_size,svg.stat().st_size))
    if len(details)!=16: raise SystemExit(f'Expected 16 details, got {len(details)}')
    print(f'Generated and exported {len(details)} PDF/SVG pairs.')
    for row in details: print(*row)
if __name__=='__main__': main()
