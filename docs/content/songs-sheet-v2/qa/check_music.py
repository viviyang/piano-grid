#!/usr/bin/env python3
"""Independent-format check. No import of the builder or its configuration.
Expected music is an independently encoded, literal bar-by-bar specification.
MusicXML + MIDI + audio FFT are decoded independently. This is not a human review.
"""
from __future__ import annotations
import argparse, json, pathlib, wave, tempfile, shutil
import xml.etree.ElementTree as ET
import numpy as np
import mido
ROOT=pathlib.Path(__file__).resolve().parents[1]
# These literals must not be regenerated from output events.json or the builder.
ORACLE={
 'step-and-hold':{'beats':4,'bpm':60,'hands':['right'],'bars':[
  [('C4',1,'right'),('D4',1,'right'),('E4',2,'right')],
  [('G4',1,'right'),('F4',1,'right'),('E4',2,'right')],
  [('D4',1,'right'),('E4',1,'right'),('C4',1,'right'),('D4',1,'right')],
  [('E4',2,'right'),('C4',2,'right')]]},
 'left-hand-answer':{'beats':3,'bpm':60,'hands':['left'],'bars':[
  [('G3',1,'left'),('E3',1,'left'),('C3',1,'left')],
  [('D3',2,'left'),('E3',1,'left')],
  [('F3',1,'left'),('E3',1,'left'),('D3',1,'left')],
  [('C3',3,'left')]]},
 'one-hand-at-a-time':{'beats':4,'bpm':72,'hands':['right','left'],'bars':[
  [('C4',1,'right'),('E4',1,'right'),('D4',2,'right')],
  [('C3',1,'left'),('E3',1,'left'),('D3',2,'left')],
  [('E4',1,'right'),('G4',1,'right'),('F4',1,'right'),('E4',1,'right')],
  [('D3',2,'left'),('C3',2,'left')]]}}
# Literal MIDI numbers and rounded reference frequencies, not the builder's conversion.
P={'C3':(48,130.812783),'D3':(50,146.832384),'E3':(52,164.813778),'F3':(53,174.614116),'G3':(55,195.997718),'C4':(60,261.625565),'D4':(62,293.664768),'E4':(64,329.627557),'F4':(65,349.228231),'G4':(67,391.995436)}
def expect_events(o):
    out=[];t=0
    for bi,bar in enumerate(o['bars'],1):
        assert sum(n[1]for n in bar)==o['beats']
        for name,dur,hand in bar:out.append((bi,t,dur,name,hand));t+=dur
    return out

def check_one(slug,folder):
    o=ORACLE[slug];expected=expect_events(o);checks=[]
    s=ET.parse(folder/'score.musicxml').getroot();div=int(s.findtext('.//divisions'));assert div==4
    assert s.findtext('.//key/fifths')=='0';assert s.findtext('.//key/mode')=='major'
    assert int(s.findtext('.//time/beats'))==o['beats'];assert s.findtext('.//time/beat-type')=='4'
    assert float(s.find('.//sound').get('tempo'))==o['bpm']
    assert [(x.findtext('sign'),x.findtext('line'))for x in s.findall('.//clef')]==[('G','2')if h=='right' else ('F','4')for h in o['hands']]
    xml_events=[]
    for me in s.findall('.//part/measure'):
        bi=int(me.get('number'));pos=0;voice_totals={}
        for child in me:
            if child.tag=='backup':pos-=int(child.findtext('duration'))/div;assert pos>=0
            if child.tag!='note':continue
            dur=int(child.findtext('duration'))/div;voice=int(child.findtext('voice'));voice_totals[voice]=voice_totals.get(voice,0)+dur
            if child.find('pitch') is not None:
                name=child.findtext('pitch/step')+child.findtext('pitch/octave');hand=o['hands'][voice-1]
                notated=(1 if child.findtext('type')=='quarter' else 2)*(1.5 if child.find('dot')is not None else 1)
                assert notated==dur,('wrong note type/dot',bi)
                xml_events.append((bi,(bi-1)*o['beats']+pos,dur,name,hand))
            else:assert child.find('rest').get('measure')=='yes' and dur==o['beats']
            pos+=dur
        assert list(voice_totals.values())==[o['beats']]*len(o['hands'])
    assert sorted(xml_events)==sorted(expected),'MusicXML differs from independent literal score'
    checks+=['MusicXML pitches/octaves/durations','time/key/tempo/clefs','all voices fill bars; rests correct','notated type and dot match duration']
    data=json.load(open(folder/'events.json'));j=[(e['measure'],e['onset_quarters'],e['duration_quarters'],e['pitch'],e['hand'])for e in data['events']]
    assert j==expected;assert all(e['midi']==P[e['pitch']][0]for e in data['events']);checks.append('JSON event timeline vs independent oracle')
    mf=mido.MidiFile(folder/'score.mid');assert mf.ticks_per_beat==480
    ticks=[];tempo=[]
    for tr in mf.tracks:
        t=0;ons={};name=None
        for msg in tr:
            t+=msg.time
            if msg.type=='track_name':name=msg.name
            if msg.type=='set_tempo':tempo.append(msg.tempo)
            if msg.type=='note_on' and msg.velocity>0:
                assert msg.note not in ons;ons[msg.note]=t
            if msg.type=='note_off' or(msg.type=='note_on'and msg.velocity==0):
                assert msg.note in ons;st=ons.pop(msg.note);ticks.append((st/480,(t-st)/480,msg.note,name))
        assert not ons
    assert sorted(ticks)==sorted((t,d,P[n][0],h)for _,t,d,n,h in expected)
    assert tempo==[mido.bpm2tempo(o['bpm'])];checks+=['MIDI decoded note-on/off timing; no stuck notes','MIDI tempo and hand tracks']
    with wave.open(str(folder/'demo.wav'),'rb') as f:
        assert f.getnchannels()==1 and f.getsampwidth()==2;sr=f.getframerate();pcm=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(float)/32768
    assert sr==22050;wantduration=.5+4*o['beats']*60/o['bpm'];assert abs(len(pcm)/sr-wantduration)<2/sr
    assert np.max(np.abs(pcm))<.99;assert np.max(np.abs(pcm[:round(.24*sr)]))==0;assert np.max(np.abs(pcm[-round(.24*sr):]))==0
    cents=[]
    for _,t,d,n,h in expected:
        st=.25+t*60/o['bpm'];length=d*60/o['bpm'];lo=round((st+.12*length)*sr);hi=round((st+.65*length)*sr);chunk=pcm[lo:hi]
        assert np.sqrt(np.mean(chunk**2))>.05
        nfft=2**int(np.ceil(np.log2(max(4096,len(chunk)*16))));spectrum=abs(np.fft.rfft(chunk*np.hanning(len(chunk)),n=nfft));fpeak=np.argmax(spectrum)*sr/nfft
        err=abs(1200*np.log2(fpeak/P[n][1]));assert err<6,(n,fpeak,err);cents.append(float(err))
        gap=pcm[round((st+.94*length)*sr):round((st+.99*length)*sr)];assert np.max(np.abs(gap))==0
    checks+=['WAV independently estimated spectral pitches','WAV duration, envelope gaps, silence and no clipping']
    # Inspect rendered SVG notehead count independently of file references.
    svg=ET.parse(folder/'score.svg').getroot();ns={'s':'http://www.w3.org/2000/svg'}
    assert len(svg.findall('s:ellipse',ns))==len(expected);assert len(svg.findall('s:circle',ns))==sum(d==3 for _,t,d,n,h in expected)
    checks.append('SVG notehead/dot inventory (visual staff placement separately inspected)')
    return {'slug':slug,'status':'PASS_FORMAT_AND_SIGNAL_CHECKS','note_events':len(expected),'checks':checks,'max_pitch_error_cents':max(cents),'professional_review':False,'human_listening':False}

def mutation_checks():
    detected=[];src=ROOT/'content-data/assets/pg-step-and-hold-v1'
    with tempfile.TemporaryDirectory() as temp:
        p=pathlib.Path(temp)
        for kind in ['xml_pitch','midi_pitch','audio_silence']:
            q=p/kind;shutil.copytree(src,q)
            if kind=='xml_pitch':
                t=ET.parse(q/'score.musicxml');t.find('.//pitch/step').text='D';t.write(q/'score.musicxml')
            if kind=='midi_pitch':
                f=mido.MidiFile(q/'score.mid')
                for tr in f.tracks:
                    for msg in tr:
                        if msg.type in ['note_on','note_off'] and msg.note==60:msg.note=61
                f.save(q/'score.mid')
            if kind=='audio_silence':
                with wave.open(str(q/'demo.wav'),'rb')as f:params=f.getparams();raw=f.readframes(f.getnframes())
                with wave.open(str(q/'demo.wav'),'wb')as f:f.setparams(params);f.writeframes(bytes(len(raw)))
            try:check_one('step-and-hold',q)
            except AssertionError:detected.append(kind)
            else:raise AssertionError('Validator accepted corruption: '+kind)
    return detected

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--output');args=ap.parse_args()
    results=[check_one(slug,ROOT/('content-data/assets/pg-'+slug+'-v1'))for slug in ORACLE]
    out={'scope':'Package assets only; not site, teacher review, device listening or physical printing','status':'PASS','results':results,'negative_controls_detected':mutation_checks(),'independence_limit':'Different decoding methods and fixed literals; same assistant supplied the specification and checks, not an independent human reviewer.'}
    text=json.dumps(out,ensure_ascii=False,indent=2)+'\n'
    if args.output:pathlib.Path(args.output).write_text(text,encoding='utf-8')
    print(text)
if __name__=='__main__':main()
