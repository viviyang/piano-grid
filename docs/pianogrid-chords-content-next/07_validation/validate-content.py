#!/usr/bin/env python3
"""Standalone checks for this content delivery. Standard-library only.
Not a Next.js build, browser/audio test or professional fingering review.
Run: python docs/pianogrid-chords-content-next/07_validation/validate-content.py
"""
from pathlib import Path
import json, re, sys, xml.etree.ElementTree as ET
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def ck(name,ok,detail=''):
 checks.append({'name':name,'passed':bool(ok),'detail':detail})
def load(rel):return json.loads((ROOT/rel).read_text(encoding='utf-8-sig'))
def norm(s):return s.replace('♭','b').replace('♯','#')
def pm(s):
 m=re.fullmatch(r'([A-G])([#b]*)(-?\d+)',norm(s))
 if not m:raise ValueError('Invalid pitch '+s)
 n,a,o=m.groups();return (int(o)+1)*12+dict(C=0,D=2,E=4,F=5,G=7,A=9,B=11)[n]+sum(1 if z=='#' else -1 for z in a)
def pc(s):return pm(s+'4')%12
for p in ROOT.rglob('*.json'):
 try:json.loads(p.read_text(encoding='utf-8-sig'));ck('JSON '+str(p.relative_to(ROOT)),True)
 except Exception as e:ck('JSON '+str(p.relative_to(ROOT)),False,str(e))
plan=load('08_baseline/original-plan-chord-entries.json'); allowed={p['url'] for p in plan['pages']}
details=load('02_content/details.merge.json')['pages'];support=load('02_content/support.merge.json')['pages'];learning=load('03_learning/learning.all.json');bindings=load('03_learning/adapter-bindings.json')
sources={s['id'] for s in load('04_sources/sources.new.json')['sources']}
ck('Exactly six approved detail payloads',len(details)==6 and all(r in allowed for r in details))
ck('Exactly five approved support payloads',len(support)==5 and all(r in allowed for r in support))
for route,rec in details.items():
 slug=route.rsplit('/',1)[1];d=rec['data'];L=learning[route];bd=bindings[route];rootpc=pc(d['root']);expect=[0,3,7] if d['quality']=='minor' else [0,4,7]
 ck(route+' definition intervals',[(pc(x)-rootpc)%12 for x in d['pitch_classes']]==expect)
 ck(route+' semitone formula',d['semitones_from_root']==expect)
 ck(route+' three positions', [v['id'] for v in d['voicings']]==['root','first','second'])
 ck(route+' default is root',d['default_voicing']=='root')
 ck(route+' metadata agrees',rec['title']==rec['metadata']['title'] and rec['description']==rec['metadata']['description'] and rec['metadata']['canonical_path']==route)
 ck(route+' preserved 3 raw headings',[b['heading'] for b in rec['blocks']]==['Notes and keyboard position','What to notice','Compare three positions'])
 ck(route+' new source IDs resolved',set(rec['source_ids'])<=sources)
 ck(route+' single page = merged page',load(f'02_content/details/{slug}.page.json')==rec)
 for i,v in enumerate(d['voicings']):
  ident=route+' '+v['id'];calculated=[pm(x) for x in v['notes']];m=v['midi'];tone_set={pc(n) for n in d['pitch_classes']}
  ck(ident+' MIDI matches spelling',calculated==m)
  ck(ident+' low to high',m==sorted(m) and len(set(m))==3)
  ck(ident+' note set',set(x%12 for x in m)==tone_set)
  ck(ident+' bass pitch',v['bass']==v['notes'][0] and pm(v['bass'])==min(m))
  ck(ident+' bass membership',m[0]%12==pc(d['pitch_classes'][i]))
  ck(ident+' slash label',v['symbol']==d['symbol'] if i==0 else norm(v['symbol'])==norm(d['symbol']+'/'+d['pitch_classes'][i]))
  ck(ident+' diagram highlights',[n['midi'] for n in v['keyboard_highlights']]==m)
  ck(ident+' diagram spellings',[n['spelling'] for n in v['keyboard_highlights']]==v['notes'])
  ck(ident+' playback together',v['playback']['simultaneous_midi']==m)
  ck(ident+' playback ascending',v['playback']['ascending_midi']==m)
  ck(ident+' playback descending',v['playback']['descending_midi']==list(reversed(m)))
  ck(ident+' within proposed range',all(bd['keyboard_range_midi'][0]<=x<=bd['keyboard_range_midi'][1] for x in m))
  ck(ident+' no invented raw inversion fingerings',v['fingering']=={'right':None,'left':None})
 fingers=L['fingerings'];ck(route+' fingering gate',len(fingers)==(0 if slug=='c-flat-major' else 2))
 if slug!='c-flat-major':
  ck(route+' distinct hands',{f['hand'] for f in fingers}=={'right','left'})
  for f in fingers:
   ck(route+' '+f['hand']+' exact root binding',f['voicingId']==slug+'--root' and list(map(norm,f['notes']))==d['voicings'][0]['notes'])
   ck(route+' '+f['hand']+' numbers',f['fingers']==([1,3,5] if f['hand']=='right' else [5,3,1]))
   ck(route+' '+f['hand']+' source',bool(f['sourceIds']) and set(f['sourceIds'])<=sources)
   ck(route+' '+f['hand']+' status',f['verificationStatus']=='source_verified_with_octave_adaptation' and bool(f['limitation']))
 else:ck('Cb remains unpublishable',rec['ready_for_publish'] is False and bd['detail_publish_gate']=='root_fingering_missing')
 ids=[b['block_id'] for b in L['extraBlocks']]
 ck(route+' extra IDs unique',len(ids)==len(set(ids)) and 'practice' not in ids)
 ck(route+' FAQ namespace compatible',slug+'-questions' in ids)
 ck(route+' derived practice only',L['practice']['id']=='practice' and 'correctAnswer' not in L['practice'])
 for a in d['assets']:
  f=ROOT/a['delivery_file'];ck(route+' asset '+a['format'],f.is_file() and f.stat().st_size>100)
  if a['format']=='PDF':ck(route+' PDF header',f.read_bytes().startswith(b'%PDF'))
  if a['format']=='SVG':
   try:ET.parse(f);ck(route+' SVG XML',True)
   except Exception as e:ck(route+' SVG XML',False,str(e))
ck('Cb4 is B3, not B4',pm('Cb4')==pm('B3')==59 and pm('Cb4')!=pm('B4'))
for route,rec in support.items():
 ck(route+' raw metadata canonical',rec['metadata']['canonical_path']==route)
 ck(route+' single equals aggregate',load('02_content/support/'+route.strip('/').replace('/','--')+'.page.json')==rec)
ck('Guide transition exact middle chord',support['/guide/piano-chords']['data']['transition_voicings'][1]==['C4','E4','A4'])
kt=support['/chords/by-key']['data']['keys'];ck('Seven keys',len(kt)==7);ck('49 key-chord rows',sum(len(x['chords']) for x in kt)==49)
for key in kt:
 scale=key['scale']
 for row in key['chords']:
  i=row['degree']-1;expect_notes=[scale[(i+j)%7] for j in [0,2,4]]
  ck(key['key']+' '+row['roman']+' scale spelling',row['notes']==expect_notes)
  intervals=[(pc(n)-pc(row['notes'][0]))%12 for n in row['notes']]
  ck(key['key']+' '+row['roman']+' quality',intervals=={'major':[0,4,7],'minor':[0,3,7],'diminished':[0,3,6]}[row['quality']])
  ck(key['key']+' '+row['roman']+' reference tones',{pm(n)%12 for n in row['reference_voicing']}=={pc(n) for n in row['notes']})
progs=support['/chord-progressions']['data']['progressions'];ck('9 progression realizations',len(progs)==9)
for ex in progs:
 key=next(k for k in kt if k['key']==ex['key'])
 for bar in ex['bars']:
  row=next(r for r in key['chords'] if r['roman']==bar['roman'])
  ck(ex['id']+' bar'+str(bar['bar'])+' MIDI',[pm(n) for n in bar['notes']]==bar['midi'])
  ck(ex['id']+' bar'+str(bar['bar'])+' harmonic degree',{x%12 for x in bar['midi']}=={pc(n) for n in row['notes']})
  ck(ex['id']+' bar'+str(bar['bar'])+' duration',bar['duration_quarters']==4)
 ck(ex['id']+' no fake publisher authorization','edition_status' not in ex['rights'])
fd=support['/chords/finder']['data'];ck('Finder engine not invented',fd['runtime_engine'] is None)
ck('8 finder fixtures',len(fd['examples'])==8)
for i,ex in enumerate(fd['examples']):
 ck('Finder fixture '+str(i)+' MIDI',[pm(n) for n in ex['input']]==ex['input_midi'])
 ck('Finder fixture '+str(i)+' lowest bass',pm(ex['bass'])==min(ex['input_midi']))
ck('Finder C bass alternative Am7/C',fd['examples'][3]['candidates'][1]['symbol']=='Am7/C' and fd['examples'][3]['bass']=='C4')
seo=load('01_planning/url-seo-keywords.master.json')['pages'];ck('15 planned SEO records',len(seo)==15 and {p['url'] for p in seo}==allowed)
ck('No duplicate title',len({p['title'] for p in seo})==15)
for s in seo:
 ck(s['url']+' self canonical',s['canonical']=='https://pianogrid.com'+s['url'])
 ck(s['url']+' no meta keywords',s['meta_keywords'] is None)
 ck(s['url']+' primary keyword preserved',s['primary_keyword_original']==next(p for p in plan['pages'] if p['url']==s['url'])['keyword'])
cat=load('01_planning/chord-catalogue-scope.json');ck('Hub stays 19',len(cat['items'])==19)
ck('Ten hub-only objects remain without URL',sum(i['detail_url_in_original_plan'] is None for i in cat['items'])==10)
links=load('01_planning/internal-links.json')['edges'];registered={'/','/tools','/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy','/guide','/guide/read-sheet-music','/tools/blank-sheet-music'}
for e in links:
 ck(e['id']+' route target permitted',e['to'] in allowed|registered)
 ck(e['id']+' real href shape',e['href']==e['to']+('#'+e['fragment'] if e['fragment'] else ''))
 ck(e['id']+' proposed links not already live',not e['published_now'] or (e['from'] in registered and e['to'] in registered))
for route in details:
 ck(route+' inbound discovery exists',any(e['from']=='/chords' and e['to']==route for e in links))
 ck(route+' parent link exists',any(e['from']==route and e['to']=='/chords' for e in links))
report={'status':'PASS' if all(c['passed'] for c in checks) else 'FAIL','checks':len(checks),'passed':sum(c['passed'] for c in checks),'failed':[c for c in checks if not c['passed']],'scope':'Prepared content only. Does not execute current repository adapters, browser, audio, Next.js or live HTTP.','untested':['Full repository integration/build','New source professional review of chosen octaves','Real hearing/device/screen reader/physical print','Tagged PDF accessibility'],'results':checks}
(ROOT/'07_validation/content-check-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:report[k] for k in ['status','checks','passed','failed','scope']},ensure_ascii=False,indent=2))
sys.exit(0 if report['status']=='PASS' else 1)
