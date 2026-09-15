#!/usr/bin/env python3
"""Build only the newly authored exercise fixtures. Does not fetch any music.
Run from package root: python tools/build_original_assets.py
Build-tool requirements: numpy, mido, reportlab, fonttools, svglib.
A local NotoMusic font is used for clef outlines only; no font file is exported.
Use --font PATH on Windows. The existing website's dependencies are unchanged.
"""
from __future__ import annotations
import argparse, hashlib, json, math, pathlib, wave
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape
import numpy as np
import mido
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, letter
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF

ROOT=pathlib.Path(__file__).resolve().parents[1]
DATA=ROOT/'content-data'; ASSETS=DATA/'assets'
CONFIG=[
 {'slug':'step-and-hold','title':'Step and Hold','meter':[4,4],'bpm':60,'hands':['right'],'goal':'Keep an even count while moving between quarter notes and half notes.','level':'Starter: one hand; quarter and half notes','steps':['Find C4, D4, E4, F4 and G4. Middle C is C4 in this score.','Count 1-2-3-4 through each bar. Hold every half note for two beats.','Practise bars 1-2, then bars 3-4. Join them without changing the pulse.'],'rows':[[('C4',1,'right'),('D4',1,'right'),('E4',2,'right')],[('G4',1,'right'),('F4',1,'right'),('E4',2,'right')],[('D4',1,'right'),('E4',1,'right'),('C4',1,'right'),('D4',1,'right')],[('E4',2,'right'),('C4',2,'right')]]},
 {'slug':'left-hand-answer','title':'Left-Hand Answer','meter':[3,4],'bpm':60,'hands':['left'],'goal':'Read a short bass-clef phrase and keep three beats in each bar.','level':'Starter: left hand; quarter, half and dotted-half notes','steps':['Find C3, D3, E3, F3 and G3. C3 is one octave below middle C.','Count 1-2-3 in each bar; the final dotted half note lasts all three beats.','Practise bars 1-2, then bars 3-4. Keep your hand comfortable; no pedal is needed.'],'rows':[[('G3',1,'left'),('E3',1,'left'),('C3',1,'left')],[('D3',2,'left'),('E3',1,'left')],[('F3',1,'left'),('E3',1,'left'),('D3',1,'left')],[('C3',3,'left')]]},
 {'slug':'one-hand-at-a-time','title':'One Hand at a Time','meter':[4,4],'bpm':72,'hands':['right','left'],'goal':'Switch hands between bars without playing both hands together.','level':'Next step: alternating hands; no simultaneous notes','steps':['Prepare right-hand C4-G4 and left-hand C3-E3. Use the written registers.','The right hand plays bars 1 and 3; the left hand plays bars 2 and 4. Rest the other hand.','Practise bars 1-2, then bars 3-4. Stop and reset before replaying a section.'],'rows':[[('C4',1,'right'),('E4',1,'right'),('D4',2,'right')],[('C3',1,'left'),('E3',1,'left'),('D3',2,'left')],[('E4',1,'right'),('G4',1,'right'),('F4',1,'right'),('E4',1,'right')],[('D3',2,'left'),('C3',2,'left')]]}
]
PITCH={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}; DIA={'C':0,'D':1,'E':2,'F':3,'G':4,'A':5,'B':6}
def midi(s):return (int(s[-1])+1)*12+PITCH[s[0]]
def diatonic(s):return int(s[-1])*7+DIA[s[0]]
def put(parent,name,text=None,**attrs):
    e=ET.SubElement(parent,name,attrs)
    if text is not None:e.text=str(text)
    return e

def build_xml(c,path):
    s=ET.Element('score-partwise',version='4.0');w=put(s,'work');put(w,'work-title',c['title'])
    ident=put(s,'identification');put(ident,'creator','AI-generated original exercise for PianoGrid',type='composer');put(ident,'rights','Created for this project; no third-party melody or recording was supplied. Not teacher-reviewed.')
    pl=put(s,'part-list');sp=put(pl,'score-part',id='P1');put(sp,'part-name','Piano')
    p=put(s,'part',id='P1');both=len(c['hands'])==2;beats=c['meter'][0]
    for idx,row in enumerate(c['rows'],1):
        me=put(p,'measure',number=str(idx))
        if idx==1:
            at=put(me,'attributes');put(at,'divisions',4);k=put(at,'key');put(k,'fifths',0);put(k,'mode','major')
            t=put(at,'time');put(t,'beats',beats);put(t,'beat-type',4)
            if both:put(at,'staves',2)
            for st,hand in enumerate(c['hands'],1):
                cl=put(at,'clef',**({'number':str(st)} if both else {}));put(cl,'sign','G' if hand=='right' else 'F');put(cl,'line',2 if hand=='right' else 4)
            dr=put(me,'direction',placement='above');dt=put(dr,'direction-type');mt=put(dt,'metronome');put(mt,'beat-unit','quarter');put(mt,'per-minute',c['bpm']);put(dr,'sound',tempo=str(c['bpm']))
        for st,hand in enumerate(c['hands'],1):
            if st>1:bk=put(me,'backup');put(bk,'duration',beats*4)
            notes=[v for v in row if v[2]==hand]
            if not notes:
                n=put(me,'note');put(n,'rest',measure='yes');put(n,'duration',beats*4);put(n,'voice',st)
                if both:put(n,'staff',st)
            for name,dur,h in notes:
                n=put(me,'note');pi=put(n,'pitch');put(pi,'step',name[0]);put(pi,'octave',name[-1]);put(n,'duration',int(dur*4));put(n,'voice',st);put(n,'type','quarter' if dur==1 else 'half')
                if dur==3:put(n,'dot')
                put(n,'stem','up')
                if both:put(n,'staff',st)
        if idx==len(c['rows']):bl=put(me,'barline',location='right');put(bl,'bar-style','light-heavy')
    ET.indent(s,space='  ');ET.ElementTree(s).write(path,encoding='utf-8',xml_declaration=True)

def glyph_outline(font,cp):
    gs=font.getGlyphSet();name=font.getBestCmap()[cp];pen=SVGPathPen(gs);gs[name].draw(pen);b=BoundsPen(gs);gs[name].draw(b)
    return pen.getCommands(),b.bounds

def build_svg(c,font,path):
    both=len(c['hands'])==2;W=720;H=440 if both else 276;left=68;right=700;start=135;barw=(right-start)/2;gap=10
    lines=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="score-title score-desc">',f'<title id="score-title">{escape(c["title"])} — four-bar original exercise</title>',f'<desc id="score-desc">{escape(c["goal"])}. Use the accompanying accessible event table for exact notes and durations.</desc>','<rect width="720" height="'+str(H)+'" fill="white"/>']
    def line(x1,y1,x2,y2,width=1):lines.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#111" stroke-width="{width}"/>')
    def text(x,y,txt,size=13,weight='normal',anchor='start'):lines.append(f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#111">{escape(str(txt))}</text>')
    text(8,18,f'{c["meter"][0]}/4  •  quarter note = {c["bpm"]}  •  no pedal',13)
    for system in range(2):
        top=54+system*(188 if both else 111)
        for st,hand in enumerate(c['hands']):
            ytop=top+st*87;bottom=ytop+40;baseline=diatonic('E4' if hand=='right' else 'G2')
            for k in range(5):line(left,ytop+k*gap,right,ytop+k*gap,.8)
            text(8,ytop+24,'RH' if hand=='right' else 'LH',12,'bold')
            # Unicode clef glyph outlines, scaled to a readable fixed bbox. No font file in output.
            d,b=glyph_outline(font,0x1D11E if hand=='right' else 0x1D122)
            targeth=72 if hand=='right' else 39;scale=targeth/(b[3]-b[1]);xx=left+4-b[0]*scale;yy=(ytop-15 if hand=='right' else ytop)+b[3]*scale
            lines.append(f'<path d="{d}" transform="translate({xx:.3f} {yy:.3f}) scale({scale:.6f} {-scale:.6f})" fill="#111"/>')
            text(115,ytop+16,c['meter'][0],17,'bold','middle');text(115,ytop+35,4,17,'bold','middle')
            for local in range(2):
                bi=system*2+local;bx=start+local*barw;text(bx+5,ytop-12,bi+1,11)
                if local==0:line(left,ytop,left,bottom)
                line(bx+barw,ytop,bx+barw,bottom,2 if bi==3 else 1)
                if bi==3:line(bx+barw-5,ytop,bx+barw-5,bottom,.8)
                row=c['rows'][bi];offset=0
                if not any(n[2]==hand for n in row):
                    # Whole-bar rest hangs under the second line from the top.
                    lines.append(f'<rect x="{bx+barw/2-6}" y="{ytop+10}" width="12" height="5" fill="#111"/>')
                for name,dur,h in row:
                    nx=bx+30+offset/c['meter'][0]*(barw-48);offset+=dur
                    if h!=hand:continue
                    ny=bottom-(diatonic(name)-baseline)*5
                    # Ledger lines: every other diatonic step outside staff.
                    if ny>bottom:
                        ly=bottom+10
                        while ly<=ny:line(nx-10,ly,nx+10,ly,.8);ly+=10
                    if ny<ytop:
                        ly=ytop-10
                        while ly>=ny:line(nx-10,ly,nx+10,ly,.8);ly-=10
                    fill='#111' if dur==1 else 'white'
                    lines.append(f'<ellipse cx="{nx}" cy="{ny}" rx="6.4" ry="4.2" transform="rotate(-18 {nx} {ny})" fill="{fill}" stroke="#111" stroke-width="1.4"/>')
                    line(nx+5.7,ny-1,nx+5.7,ny-32,1.1)
                    if dur==3:lines.append(f'<circle cx="{nx+14}" cy="{ny-2.5}" r="2" fill="#111"/>')
                    text(nx,bottom+30,name,11,anchor='middle')  # engraving rev2: clear ledger-note heads
    lines.append('</svg>');path.write_text('\n'.join(lines),encoding='utf-8')

def wrapped(c,text,x,y,width,size=10,leading=15):
    from reportlab.pdfbase.pdfmetrics import stringWidth
    words=text.split();row='';c.setFont('Helvetica',size)
    for w in words:
        test=(row+' '+w).strip()
        if stringWidth(test,'Helvetica',size)>width and row:c.drawString(x,y,row);y-=leading;row=w
        else:row=test
    if row:c.drawString(x,y,row);y-=leading
    return y

def build_pdf(c,svg,out,sz):
    w,h=sz;pdf=canvas.Canvas(str(out),pagesize=sz,pageCompression=1);pdf.setTitle(c['title']+' | PianoGrid original exercise');pdf.setAuthor('PianoGrid — AI-generated exercise fixture')
    margin=42;pdf.setFont('Helvetica-Bold',11);pdf.drawString(margin,h-43,'PIANOGRID  /  ORIGINAL EXERCISE');pdf.setFont('Helvetica-Bold',23);pdf.drawString(margin,h-77,c['title'])
    y=wrapped(pdf,c['goal'],margin,h-103,w-2*margin,10.5,15)
    y=wrapped(pdf,c['level']+'. All note labels include the octave.',margin,y-4,w-2*margin,9,13)
    score=svg2rlg(str(svg));scale=(w-2*margin)/score.width;score.scale(scale,scale);score.width*=scale;score.height*=scale
    y-=12+score.height;renderPDF.draw(score,pdf,margin,y);y-=19
    pdf.setFont('Helvetica-Bold',11);pdf.drawString(margin,y,'Start here');y-=18
    for i,s in enumerate(c['steps'],1):y=wrapped(pdf,f'{i}. {s}',margin,y,w-2*margin,10,15)-5
    y=wrapped(pdf,'Self-check: keep the written pulse, observe held notes and stop at the end. The audio demonstrates this score; it does not listen to or assess your playing.',margin,y-2,w-2*margin,9,13)
    if y<110:raise ValueError('PDF text would overlap footer')
    pdf.setLineWidth(.5);pdf.line(margin,90,w-margin,90);pdf.setFont('Helvetica',8)
    pdf.drawString(margin,76,'AI-generated original practice exercise. Not a named-song arrangement. Not teacher-reviewed.')
    pdf.drawString(margin,63,'Synthesized-tone demonstration, not a sampled piano recording. Version: 1.0; engraving rev2 | 2026-09-15')
    # Stable approved parent URL, not a fabricated song page. Fragment activated only after integration.
    target='https://pianogrid.com/sheet-music/beginner#pg-ex='+c['slug']
    pdf.drawString(margin,50,'PianoGrid: '+target.replace('https://',''))
    pdf.linkURL(target,(margin,46,w-margin,60),relative=0)
    pdf.showPage();pdf.save()

def build_audio(c,path,events):
    sr=22050;start_padding=.25;beat_s=60/c['bpm'];length=start_padding+sum(sum(x[1] for x in row) for row in c['rows'])*beat_s+.25
    waveout=np.zeros(round(length*sr),dtype=np.float64)
    for e in events:
        st=start_padding+e['onset_quarters']*beat_s;dur=e['duration_quarters']*beat_s;gate=dur*.9
        n=round(gate*sr);t=np.arange(n)/sr;freq=440*2**((e['midi']-69)/12)
        sig=np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*2*freq*t)+.08*np.sin(2*np.pi*3*freq*t)
        attack=min(round(.012*sr),n//4);release=min(round(.04*sr),n//4);env=np.ones(n);env[:attack]=np.linspace(0,1,attack);env[-release:]=np.linspace(1,0,release)
        sig=sig*env*.24;start=round(st*sr);waveout[start:start+n]+=sig
    raw=(np.clip(waveout,-1,1)*32767).astype('<i2')
    with wave.open(str(path),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes(raw.tobytes())
    return {'sample_rate_hz':sr,'duration_seconds':len(raw)/sr,'leading_silence_seconds':start_padding,'trailing_silence_seconds':.25,'gate_ratio':.9,'timbre':'mathematically synthesized additive tone; no recorded samples','peak':float(np.max(np.abs(waveout)))}

def build_midi(c,path,events):
    mf=mido.MidiFile(type=1,ticks_per_beat=480);meta=mido.MidiTrack();mf.tracks.append(meta)
    meta.append(mido.MetaMessage('set_tempo',tempo=mido.bpm2tempo(c['bpm']),time=0));meta.append(mido.MetaMessage('time_signature',numerator=c['meter'][0],denominator=4,time=0));meta.append(mido.MetaMessage('key_signature',key='C',time=0));meta.append(mido.MetaMessage('end_of_track',time=0))
    for channel,hand in enumerate(c['hands']):
        tr=mido.MidiTrack();mf.tracks.append(tr);tr.append(mido.MetaMessage('track_name',name=hand,time=0));tr.append(mido.Message('program_change',program=0,channel=channel,time=0));messages=[]
        for e in events:
            if e['hand']!=hand:continue
            messages.extend([(round(e['onset_quarters']*480),1,e),(round((e['onset_quarters']+e['duration_quarters'])*480),0,e)])
        last=0
        for tick,on,e in sorted(messages,key=lambda x:(x[0],x[1])):
            tr.append(mido.Message('note_on' if on else 'note_off',note=e['midi'],velocity=75 if on else 0,channel=channel,time=tick-last));last=tick
        tr.append(mido.MetaMessage('end_of_track',time=c['meter'][0]*4*480-last))
    mf.save(path)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--font',default='/usr/share/fonts/truetype/noto/NotoMusic-Regular.ttf');args=ap.parse_args()
    font=TTFont(args.font);out=[]
    for c in CONFIG:
        folder=ASSETS/('pg-'+c['slug']+'-v1');folder.mkdir(parents=True,exist_ok=True)
        events=[];onset=0
        for bi,row in enumerate(c['rows'],1):
            for name,dur,hand in row:events.append({'measure':bi,'onset_quarters':onset,'duration_quarters':dur,'pitch':name,'midi':midi(name),'hand':hand});onset+=dur
        xml=folder/'score.musicxml';svg=folder/'score.svg';build_xml(c,xml);build_svg(c,font,svg);build_midi(c,folder/'score.mid',events);a=build_audio(c,folder/'demo.wav',events)
        for suffix,sz in [('a4',A4),('letter',letter)]:build_pdf(c,svg,folder/f'score-{suffix}.pdf',sz)
        eventdoc={'arrangement_id':'arr-pg-'+c['slug']+'-v1','title':c['title'],'key':'C major','meter':c['meter'],'tempo_bpm':c['bpm'],'measure_count':4,'duration_quarters':onset,'events':events,'audio_render':a,'segments':[{'id':'all','start_measure':1,'end_measure':4},{'id':'bars-1-2','start_measure':1,'end_measure':2},{'id':'bars-3-4','start_measure':3,'end_measure':4}]}
        (folder/'events.json').write_text(json.dumps(eventdoc,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        text=['# '+c['title'],'','Original exercise, not a famous-song edition. AI-generated; not teacher-reviewed.','',c['goal'],'','| Bar | Hand | Pitch | Quarter-note beats |','|---|---|---|---|']
        text.extend(f"| {e['measure']} | {e['hand']} | {e['pitch']} | {e['duration_quarters']} |"for e in events)
        (folder/'accessible-score.md').write_text('\n'.join(text)+'\n',encoding='utf-8')
        out.append({'work_id':'work-pg-'+c['slug'],'arrangement_id':eventdoc['arrangement_id'],'score_asset_id':'score-pg-'+c['slug']+'-v1','audio_asset_id':'audio-pg-'+c['slug']+'-v1','title':c['title'],'kind':'ORIGINAL_EXERCISE_NOT_KNOWN_SONG','key':'C major','meter':c['meter'],'hands':c['hands'],'hand_mode':'single_hand' if len(c['hands'])==1 else 'alternating','finger_numbers_verified':False,'range_midi':[min(e['midi']for e in events),max(e['midi']for e in events)],'pitch_set':sorted(set(e['pitch']for e in events),key=midi),'chords':[],'chord_evidence':'No simultaneous notes or supplied chord symbols; do not infer chords from key.','tempo_bpm':c['bpm'],'difficulty_label':c['level'],'difficulty_basis':'[推断] editorial placement based on exact event duration/hand/range; not an exam grade or teacher assessment','goal':c['goal'],'start_steps':c['steps'],'measure_count':4,'assets':{x.name:str(x.relative_to(ROOT)).replace('\\','/') for x in folder.iterdir() if x.is_file()},'availability':'LOCAL_ASSETS_CREATED_NOT_DEPLOYED','release_status':'INTEGRATION_FIXTURE; needs independent acceptance and human smoke tests before public enablement','professional_review_status':'NOT_REVIEWED','evidence_status':'[已核实] generated file/event facts; [推断] difficulty and pedagogy','rights_id':'RIGHTS-PG-ORIGINAL-20260915','segments':eventdoc['segments']})
    (DATA/'original-exercises.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if __name__=='__main__':main()
