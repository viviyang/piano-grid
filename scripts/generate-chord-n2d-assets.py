#!/usr/bin/env python3
import html,json,shutil,hashlib
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from chord_pdf_font import register_chord_pdf_font

ROOT=Path(__file__).resolve().parents[1]
DETAILS=ROOT/'docs/pianogrid-chords-n2d-v2/03_content/details'
SOURCE=ROOT/'docs/pianogrid-chords-n2d-v2/09_generated_assets'
PUBLIC=ROOT/'public/reference/assets'
FONT=Path(r'C:\Windows\Fonts\NotoSansSC-VF.ttf');PDF_FONT='PianoGridSymbol'
WHITE_PCS={0,2,4,5,7,9,11};NAMES={0:'C',2:'D',4:'E',5:'F',7:'G',9:'A',11:'B'}

def whites(start=48,end=76):return [m for m in range(start,end+1) if m%12 in WHITE_PCS]
def pitch(m):return f'{NAMES[m%12]}{m//12-1}'
def x_for(m,x,w,start=48,end=76):
 ws=whites(start,end)
 if m in ws:return x+ws.index(m)*w
 left=max(v for v in ws if v<m);return x+(ws.index(left)+.68)*w
def draw_keyboard(pdf,real,x,y,width=528,height=112):
 ws=whites();kw=width/len(ws);selected=set(real['midiLowToHigh'])
 for index,midi in enumerate(ws):
  pdf.setFillColorRGB(.9,.93,.96) if midi in selected else pdf.setFillColorRGB(1,1,1)
  pdf.rect(x+index*kw,y,kw,height,fill=1,stroke=1);pdf.setFillColorRGB(.15,.15,.15);pdf.setFont(PDF_FONT,6);pdf.drawCentredString(x+(index+.5)*kw,y+6,pitch(midi))
 for midi in range(48,77):
  if midi%12 in WHITE_PCS:continue
  bx=x_for(midi,x,kw)-kw*.3;pdf.setFillColorRGB(.36,.36,.36) if midi in selected else pdf.setFillColorRGB(.05,.05,.05);pdf.rect(bx,y+height*.42,kw*.6,height*.58,fill=1,stroke=0)
 pdf.setFillColorRGB(0,0,0);pdf.setFont(PDF_FONT,8.5);pdf.drawString(x,y-16,'Selected pitches: '+'  -  '.join(real['notesLowToHigh']))
def make_pdf(raw,path):
 pdf=canvas.Canvas(str(path),pagesize=letter,pageCompression=1);pdf.setTitle(f"{raw['seo']['h1']} reference");pdf.setAuthor('PianoGrid')
 pdf.setFont(PDF_FONT,9);pdf.drawString(42,755,'PIANOGRID  /  ADD CHORD REFERENCE');pdf.setFont(PDF_FONT,23);pdf.drawString(42,718,f"{raw['name']} ({raw['symbol']})")
 tones=[item['spelling'] for item in raw['definition']['components']];pdf.setFont(PDF_FONT,10.5);pdf.drawString(42,695,'Notes: '+' - '.join(tones)+'     Formula: '+'-'.join(raw['definition']['formulaDegrees']))
 pdf.setFont(PDF_FONT,9);pdf.drawString(42,676,'Two root-bass spacing examples. They are not a complete inversion catalogue.')
 for real,y in zip(raw['realizations'],[430,205]):
  pdf.setFont(PDF_FONT,12);pdf.drawString(42,y+153,f"{real['label']}  -  {real['notationHint']}");pdf.setFont(PDF_FONT,9);pdf.drawRightString(570,y+153,f"Bass: {real['bass']['spelling']}");draw_keyboard(pdf,real,42,y)
 pdf.setFont(PDF_FONT,8.3);pdf.drawString(42,154,'The higher example places the added member 14 semitones above the root; the inside example places it 2 semitones above.')
 pdf.drawString(42,139,'Both examples keep the third and omit the seventh. Octave numbers identify register, not fingers.')
 pdf.drawString(42,124,'Keyboard window: C3-E5. Written spelling is preserved. No fingering is assigned.')
 pdf.setFont(PDF_FONT,7.5);pdf.drawString(42,92,'Theory and notation references: see Sources on the matching PianoGrid chord page.');pdf.drawString(42,77,'Original keyboard diagrams show the written notes, MIDI pitches and formulas above.')
 pdf.setFont(PDF_FONT,8);pdf.drawString(42,50,'pianogrid.com'+raw['url']);pdf.drawRightString(570,50,'2 layouts');pdf.showPage();pdf.save()
def svg_keyboard(real,x,y,width=528,height=92):
 ws=whites();kw=width/len(ws);selected=set(real['midiLowToHigh']);out=[]
 for index,midi in enumerate(ws):
  fill='#e7edf4' if midi in selected else '#fff';out.append(f'<rect x="{x+index*kw:.2f}" y="{y}" width="{kw:.2f}" height="{height}" fill="{fill}" stroke="#727272" stroke-width=".5"/>');out.append(f'<text x="{x+(index+.5)*kw:.2f}" y="{y+height-6}" text-anchor="middle" class="key">{pitch(midi)}</text>')
 for midi in range(48,77):
  if midi%12 in WHITE_PCS:continue
  bx=x_for(midi,x,kw)-kw*.3;fill='#666' if midi in selected else '#111';out.append(f'<rect x="{bx:.2f}" y="{y}" width="{kw*.6:.2f}" height="{height*.58:.2f}" fill="{fill}"/>')
 return ''.join(out)
def make_svg(raw,path):
 tones=' - '.join(item['spelling'] for item in raw['definition']['components']);sections=[]
 for real,y in zip(raw['realizations'],[170,365]):
  sections.append(f'<text x="42" y="{y-28}" class="sub">{html.escape(real["label"])}  -  {html.escape(real["notationHint"])}</text><text x="570" y="{y-28}" text-anchor="end" class="meta">Bass: {html.escape(real["bass"]["spelling"])}</text>');sections.append(svg_keyboard(real,42,y));sections.append(f'<text x="42" y="{y+114}" class="meta">Selected pitches: {html.escape("  -  ".join(real["notesLowToHigh"]))}</text>')
 body=f'''<svg xmlns="http://www.w3.org/2000/svg" width="612" height="620" viewBox="0 0 612 620" role="img" aria-labelledby="title desc"><title id="title">{html.escape(raw['seo']['h1'])} printable keyboard reference</title><desc id="desc">Two root-bass keyboard layouts show the added note higher and inside the chord. No fingering is assigned.</desc><style>text{{font-family:"Segoe UI Symbol",Arial,sans-serif;fill:#111}}.brand{{font-size:9px;font-weight:700}}.title{{font-size:23px;font-weight:700}}.copy{{font-size:10.5px}}.sub{{font-size:11.5px;font-weight:700}}.meta{{font-size:8.3px}}.key{{font-size:5.5px}}</style><rect width="612" height="620" fill="#fff"/><text x="42" y="37" class="brand">PIANOGRID  /  ADD CHORD REFERENCE</text><text x="42" y="72" class="title">{html.escape(raw['name'])} ({html.escape(raw['symbol'])})</text><text x="42" y="96" class="copy">Notes: {html.escape(tones)}     Formula: {html.escape('-'.join(raw['definition']['formulaDegrees']))}</text><text x="42" y="116" class="meta">Two root-bass spacing examples, not a complete inversion catalogue.</text>{''.join(sections)}<text x="42" y="535" class="meta">Higher added member: 14 semitones. Inside added member: 2 semitones. Both keep the third and omit the seventh.</text><text x="42" y="552" class="meta">Keyboard window: C3-E5. Octave numbers identify register, not fingers. No fingering is assigned.</text><text x="42" y="592" class="brand">pianogrid.com{html.escape(raw['url'])}</text><text x="570" y="592" text-anchor="end" class="meta">2 layouts</text></svg>''';path.write_text(body,encoding='utf8')
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
 register_chord_pdf_font(FONT, PDF_FONT);SOURCE.mkdir(parents=True,exist_ok=True);PUBLIC.mkdir(parents=True,exist_ok=True);manifest=[]
 for source in sorted(DETAILS.glob('*.page.json')):
  raw=export_spelling(json.loads(source.read_text(encoding='utf8')));slug=raw['url'].split('/')[-1]
  if raw['family']!='add' or len(raw['realizations'])!=2 or raw['fingering']['status']!='not_provided':raise SystemExit(f'Invalid N2D asset source: {source.name}')
  pdf=SOURCE/f'chord-{slug}.pdf';svg=SOURCE/f'chord-{slug}.svg';make_pdf(raw,pdf);make_svg(raw,svg);shutil.copyfile(pdf,PUBLIC/pdf.name);shutil.copyfile(svg,PUBLIC/svg.name)
  manifest.append({'slug':slug,'pdf':str(pdf.relative_to(ROOT)).replace('\\','/'),'svg':str(svg.relative_to(ROOT)).replace('\\','/'),'publicPdf':str((PUBLIC/pdf.name).relative_to(ROOT)).replace('\\','/'),'publicSvg':str((PUBLIC/svg.name).relative_to(ROOT)).replace('\\','/'),'pdfBytes':pdf.stat().st_size,'svgBytes':svg.stat().st_size,'pdfSha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'svgSha256':hashlib.sha256(svg.read_bytes()).hexdigest()})
 if len(manifest)!=24:raise SystemExit(f'Expected 24 N2D details, got {len(manifest)}')
 (SOURCE/'asset-manifest.json').write_text(json.dumps({'count':24,'pairs':manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf8');print('Generated and exported 24 N2D PDF/SVG pairs.')
if __name__=='__main__':main()
