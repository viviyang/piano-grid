#!/usr/bin/env python3
import json,hashlib,textwrap
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
ROOT=Path(__file__).resolve().parents[1];PACK=ROOT/'docs/pianogrid-chords-completion';PUBLIC=ROOT/'public/reference/assets';OUT=ROOT/'checks/chords-completion/generated-assets';FONT=Path(r'C:\Windows\Fonts\seguisym.ttf');NAME='PianoGridSymbol'
def line(pdf,text,x,y,size=9,bold=False):pdf.setFont(NAME,size);pdf.setFillColorRGB(.11,.14,.19);pdf.drawString(x,y,text);return y-14
def wrapped(pdf,text,x,y,width=92,size=8.5):
 for part in textwrap.wrap(text,width=width):y=line(pdf,part,x,y,size)
 return y
def header(pdf,title,scope):
 pdf.setFillColorRGB(.12,.15,.12);pdf.rect(0,744,612,48,fill=1,stroke=0);pdf.setFillColorRGB(1,1,1);pdf.setFont(NAME,9);pdf.drawString(40,774,'PIANOGRID  /  CHORD REFERENCE');pdf.setFont(NAME,19);pdf.drawString(40,752,title);pdf.setFillColorRGB(.11,.14,.19);return wrapped(pdf,scope,40,724,88,9)
def footer(pdf,page):pdf.setFont(NAME,7.5);pdf.setFillColorRGB(.35,.38,.43);pdf.drawString(40,32,'pianogrid.com  ·  Reference examples; no fingering assigned unless explicitly stated.');pdf.drawRightString(572,32,f'Page {page}')
def load(name):return json.loads((PACK/'04_music'/name).read_text(encoding='utf8'))
def object_pdf(path,title,scope,objects):
 pdf=canvas.Canvas(str(path),pagesize=letter,pageCompression=1);pdf.setTitle(title);pdf.setAuthor('PianoGrid');pdf.setSubject(scope);page=1;y=header(pdf,title,scope)
 for obj in objects:
  real=next((r for r in obj['realizations'] if r['id']==obj['realizationPolicy']['default']),obj['realizations'][0]);need=108
  if y<need:footer(pdf,page);pdf.showPage();page+=1;y=header(pdf,title,scope)
  pdf.setFillColorRGB(.94,.96,.98);pdf.roundRect(40,y-92,532,98,7,fill=1,stroke=0);pdf.setFillColorRGB(.11,.14,.19);pdf.setFont(NAME,13);pdf.drawString(52,y-13,f"{obj['symbol']}  ·  {obj['name']}");pdf.setFont(NAME,8.5);pdf.drawString(52,y-31,'Formula: '+' - '.join(obj['definition']['displayFormula']));pdf.drawString(52,y-47,'Written tones: '+' · '.join(obj['definition']['toneSpellings']));pdf.drawString(52,y-63,'Playing example: '+' · '.join(real['notesLowToHigh']));pdf.drawString(52,y-79,real['displayNote']);y-=112
 footer(pdf,page);pdf.showPage();pdf.save()
def practice_pdf(path):
 pdf=canvas.Canvas(str(path),pagesize=letter,pageCompression=1);pdf.setTitle('Piano chord practice starter');pdf.setAuthor('PianoGrid');y=header(pdf,'Piano chord practice starter','Three bounded tasks: identify formula tones, compare inversions and connect two named voicings. Answers are separated below.');
 tasks=[('1. Build C major','Select the pitch classes C, E and G. Octave doublings do not change the answer.'),('2. Read an inversion','C4 - E4 - G4 changes to E4 - G4 - C5. Name the lowest note and the position.'),('3. Connect two chords','Play C4 - E4 - G4, then C4 - E4 - A4. Circle the common tones and name the moving tone.')]
 for title,body in tasks:y=line(pdf,title,40,y,12);y=wrapped(pdf,body,40,y,88,9);y-=34
 y=line(pdf,'Answers',40,y,14);answers=['1. C, E and G.','2. E is lowest; this is first inversion, written C/E.','3. C and E are common tones; G moves to A. The second voicing is Am/C.']
 for answer in answers:y=wrapped(pdf,answer,52,y,84,9);y-=8
 footer(pdf,1);pdf.showPage();pdf.save()
def main():
 if not FONT.exists():raise SystemExit('Missing Segoe UI Symbol font')
 pdfmetrics.registerFont(TTFont(NAME,str(FONT)));PUBLIC.mkdir(parents=True,exist_ok=True);OUT.mkdir(parents=True,exist_ok=True)
 ext=load('extended.objects.json');alt=load('altered.objects.json');sup=load('supplement.objects.json');jobs=[]
 specs=[('chords-extended-starter-reference.pdf','Extended chord starter reference','Nine structures on C. Full formula inventory and the explicit rooted example are shown separately.',[x for x in ext if x['rootSpelling']=='C']),('chords-altered-starter-reference.pdf','Altered chord starter reference','Eight explicit altered structures on C. Written altered intervals are preserved.',[x for x in alt if x['rootSpelling']=='C']),('piano-power-fifths-reference.pdf','Piano power fifths reference','Twelve root-and-fifth examples. A symbol such as C5 is distinct from the single pitch C5.',[x for x in sup if x['subtype']=='power5'])]
 for filename,title,scope,objects in specs:
  target=PUBLIC/filename;object_pdf(target,title,scope,objects);jobs.append((filename,target))
 target=PUBLIC/'piano-chord-practice-starter.pdf';practice_pdf(target);jobs.append((target.name,target))
 manifest={'count':len(jobs),'assets':[{'file':f,'path':str(p.relative_to(ROOT)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for f,p in jobs]}
 (OUT/'asset-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8');print(json.dumps(manifest,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
