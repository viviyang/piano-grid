#!/usr/bin/env python3
"""Offline semantic validation. Standard library only; no network, no project writes.
This validates this handoff's reference data, NOT the user's app or musicianship.
"""
import argparse, copy, json, re
from pathlib import Path
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]
NAT={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11};LETTERS='CDEFGAB';ACC={'':0,'♭':-1,'♯':1,'𝄫':-2,'𝄪':2}
# Independent reference tables, not imported from the data producer.
AUTH={
'dominant9':('extended',['1','3','5','b7','9'],['1','3','b7','9']),
'major9':('extended',['1','3','5','7','9'],['1','3','7','9']),
'minor9':('extended',['1','b3','5','b7','9'],['1','b3','b7','9']),
'dominant11':('extended',['1','3','5','b7','9','11'],['1','b7','9','11']),
'major11':('extended',['1','3','5','7','9','11'],['1','3','7','11']),
'minor11':('extended',['1','b3','5','b7','9','11'],['1','b3','b7','9','11']),
'dominant13':('extended',['1','3','5','b7','9','11','13'],['1','3','b7','9','13']),
'major13':('extended',['1','3','5','7','9','11','13'],['1','3','7','9','13']),
'minor13':('extended',['1','b3','5','b7','9','11','13'],['1','b3','b7','9','13']),
'dominant7Flat9':('altered',['1','3','5','b7','b9'],['1','3','b7','b9']),
'dominant7Sharp9':('altered',['1','3','5','b7','#9'],['1','3','b7','#9']),
'dominant7Flat5':('altered',['1','3','b5','b7'],['1','3','b5','b7']),
'dominant7Sharp5':('altered',['1','3','#5','b7'],['1','3','#5','b7']),
'dominant7Sharp11':('altered',['1','3','5','b7','#11'],['1','3','b7','#11']),
'dominant7Flat13':('altered',['1','3','5','b7','b13'],['1','3','b7','b13']),
'dominant7Flat9Flat13':('altered',['1','3','5','b7','b9','b13'],['1','3','b7','b9','b13']),
'dominant7Sharp5Sharp9':('altered',['1','3','#5','b7','#9'],['1','3','#5','b7','#9']),
'power5':('power',['1','5'],['1','5']),
'major6':('sixth',['1','3','5','6'],['1','3','5','6']),
'minor6':('sixth',['1','b3','5','6'],['1','b3','5','6']),
'sixNine':('sixth',['1','3','5','6','9'],['1','3','5','6','9']),
'diminished7':('seventh',['1','b3','b5','bb7'],['1','b3','b5','bb7']),
'minorMajor7':('seventh',['1','b3','5','7'],['1','b3','5','7']),
'dominant7sus4':('suspended',['1','4','5','b7'],['1','4','5','b7'])}
def read(p):return json.loads((ROOT/p).read_text(encoding='utf-8'))
def need(test,msg):
    if not test:raise ValueError(msg)
def parse(note):
    m=re.fullmatch(r'([A-G])(𝄫|𝄪|♭|♯)?(-?\d+)?',note)
    need(m is not None,'unparseable written pitch '+str(note))
    letter,ac,octave=m.groups();raw=NAT[letter]+ACC[ac or ''];return letter,raw, None if octave is None else int(octave)
def pc(note):return parse(note)[1]%12
def midi(note):
    _,raw,octave=parse(note);need(octave is not None,'octave missing');return 12*(octave+1)+raw
DEG={'1':(0,0),'2':(1,2),'3':(2,4),'b3':(2,3),'4':(3,5),'5':(4,7),'b5':(4,6),'#5':(4,8),
'6':(5,9),'7':(6,11),'b7':(6,10),'bb7':(6,9),'9':(1,14),'b9':(1,13),'#9':(1,15),'11':(3,17),'#11':(3,18),'13':(5,21),'b13':(5,20)}
def validate_spelling(root,degree,spelling):
    step,semi=DEG[degree]
    need(parse(spelling)[0]==LETTERS[(LETTERS.index(root[0])+step)%7],'wrong letter spelling for '+degree)
    need((pc(spelling)-pc(root))%12==semi%12,'wrong interval for '+degree)
def validate_object(o):
    sub=o['subtype'];need(sub in AUTH,'unknown subtype');fam,form,play=AUTH[sub]
    need(o['rootPitchClass']==pc(o['rootSpelling']),'root pitch-class mismatch')
    need(o['family']==fam,'wrong family');d=o['definition'];need(d['formulaDegrees']==form,'formula changed')
    need(len(d['toneSpellings'])==len(form),'definition length')
    for deg,n in zip(form,d['toneSpellings']):validate_spelling(o['rootSpelling'],deg,n)
    need(d['referenceCompoundIntervals']==[DEG[x][1] for x in form],'compound interval table')
    need(d['pitchClassIntervals']==[DEG[x][1]%12 for x in form],'pitch-class table')
    need(d['uniquePitchClassCount']==len(set(pc(x) for x in d['toneSpellings'])),'definition unique count')
    need(o['realizationPolicy']['suppliedExampleRequired']==play,'required degree policy')
    need(o['realizationPolicy']['suppliedExampleAllowedOmissions']==[x for x in form if x not in play],'omission policy changed')
    rs=o['realizations'];need(len({r['id'] for r in rs})==len(rs),'duplicate realization IDs')
    need(o['realizationPolicy']['default'] in {r['id'] for r in rs},'default realization missing')
    for r in rs:
        p=r['notesLowToHigh'];m=r['midiLowToHigh'];degrees=r['realizedDegrees']
        need(r['referenceRootMidi']%12==pc(o['rootSpelling']),'reference root pitch-class mismatch')
        need(len(p)==len(m)==len(degrees),'realization array length')
        need([midi(x) for x in p]==m,'written pitch/MIDI mismatch')
        need(m==sorted(set(m)),'unordered or duplicated MIDI')
        need(all(21<=x<=108 for x in m),'piano range')
        need(all(x in form for x in degrees),'unlicensed realized degree')
        for deg,n in zip(degrees,p):validate_spelling(o['rootSpelling'],deg,n)
        missing=[x for x in form if x not in degrees]
        need(r['omittedDegrees']==missing,'hidden/wrong omissions')
        need(r['doubledDegrees']==[x for x in dict.fromkeys(degrees) if degrees.count(x)>1],'wrong doubled list')
        expected=form if r['id']=='formula-stack' else ['1','5','1'] if r['id']=='octave-doubled' else play
        need(degrees==expected,'wrong supplied realization members/order')
        expm=[r['referenceRootMidi']+DEG[x][1] for x in expected]
        if r['id']=='octave-doubled':expm[-1]+=12
        need(m==expm,'different register from the explicitly supplied example')
        b=r['bass'];need(b['midi']==m[0] and b['pitch']==p[0],'wrong bass')
        need(b['spelling']==re.sub(r'-?\d+$','',p[0]),'bass written name')
        need(b['formulaDegree']==degrees[0] and b['chordToneIndex']==form.index(degrees[0]),'bass role confusion')
        need(r['symbol']==o['symbol'],'symbol mismatch')
        k=r['keyboard'];need(k['minMidi']<=m[0]<=m[-1]<=k['maxMidi'],'keyboard clips pitches')
        need(k['highlights']==[{'midi':v,'writtenPitch':n} for v,n in zip(m,p)],'keyboard divergence')
        need(r['printPitches']==p,'print divergence')
        for mode,onsets,duration in [('block',[0]*len(m),1400),('ascending',[600*i for i in range(len(m))],1200)]:
            need(r['audio'][mode]==[{'midi':v,'onsetMs':t,'durationMs':duration} for v,t in zip(m,onsets)],'audio divergence '+mode)
        h=r['handDistribution']
        if h:
            need(sorted(h['leftMidi']+h['rightMidi'])==m,'hand split loses notes')
            need(not(set(h['leftMidi']) & set(h['rightMidi'])),'duplicated hand role')
            need(h['fingerNumbers'] is None,'invented fingering')
        need(r['fingering']['status']=='not_provided','invented fingering status')
        need(r['evidence']['teacher_review'] is False,'false teacher review')
    return True

def load_all():return read('04_music/extended.objects.json')+read('04_music/altered.objects.json')+read('04_music/supplement.objects.json')
def candidates(selected,objects,legacy):
    """Reference finder: exact definitions plus explicitly approved omissions. Never arbitrary subsets."""
    pcs={m%12 for m in selected};out=[]
    if len(pcs)<2:return []
    for x in legacy:
        if {pc(n) for n in x['toneSpellings']}==pcs:out.append((x['symbol'],'exact_formula'))
    for o in objects:
        if {pc(n) for n in o['definition']['toneSpellings']}==pcs:out.append((o['symbol'],'exact_formula'))
        else:
            for r in o['realizations']:
                if r['purpose']=='playing_example' and {m%12 for m in r['midiLowToHigh']}==pcs:
                    out.append((o['symbol'],'approved_omission_example'));break
    return out

def run():
    objs=load_all();need(len(objs)==288,'new object count');need(len({o['id'] for o in objs})==288,'duplicate object id')
    for o in objs:validate_object(o)
    by={o['id']:o for o in objs}
    golden={
    'c-dominant13':['C','E','G','B♭','D','F','A'],
    'c-major11':['C','E','G','B','D','F'],
    'c-minor13':['C','E♭','G','B♭','D','F','A'],
    'c-dominant7Sharp9':['C','E','G','B♭','D♯'],
    'c-dominant7Sharp11':['C','E','G','B♭','F♯'],
    'c-dominant7Flat5':['C','E','G♭','B♭'],
    'f-sharp-major13':['F♯','A♯','C♯','E♯','G♯','B','D♯'],
    'a-flat-diminished7':['A♭','C♭','E𝄫','G𝄫'],
    'd-flat-minor6':['D♭','F♭','A♭','B♭'],
    'c-sixNine':['C','E','G','A','D']}
    for oid,notes in golden.items():need(by[oid]['definition']['toneSpellings']==notes,'golden note error '+oid)
    # Mutations deliberately sync several output channels to wrong inputs; semantic validation must still fail.
    tests=[]
    def test_mutation(name,oid,mutate):
        x=copy.deepcopy(by[oid]);mutate(x)
        try:validate_object(x)
        except (ValueError,KeyError,IndexError,TypeError):tests.append({'test':name,'result':'rejected'});return
        raise ValueError('MUTATION ESCAPED: '+name)
    def wrong_synced(x):
        r=x['realizations'][1];i=1;r['notesLowToHigh'][i]='F3';r['midiLowToHigh'][i]=53
        r['printPitches'][i]='F3';r['keyboard']['highlights'][i]={'midi':53,'writtenPitch':'F3'}
        for mode in ['block','ascending']:r['audio'][mode][i]['midi']=53
    test_mutation('wrong tone synced across outputs','c-dominant9',wrong_synced)
    test_mutation('wrong formula','c-dominant9',lambda x:x['definition']['formulaDegrees'].__setitem__(1,'4'))
    test_mutation('wrong sharp9 letter enharmonic','c-dominant7Sharp9',lambda x:x['definition']['toneSpellings'].__setitem__(-1,'E♭'))
    test_mutation('major11 silently sharp','c-major11',lambda x:x['definition']['toneSpellings'].__setitem__(-1,'F♯'))
    test_mutation('minor13 silently natural-minor b13','c-minor13',lambda x:x['definition']['toneSpellings'].__setitem__(-1,'A♭'))
    test_mutation('hidden omitted11','c-dominant13',lambda x:x['realizations'][1].__setitem__('omittedDegrees',['5']))
    test_mutation('drop altered fifth from policy','c-dominant7Sharp5',lambda x:x['realizationPolicy'].__setitem__('suppliedExampleRequired',['1','3','b7']))
    test_mutation('wrong bass midi','c-dominant9',lambda x:x['realizations'][1]['bass'].__setitem__('midi',52))
    test_mutation('wrong bass degree','c-dominant9',lambda x:x['realizations'][1]['bass'].__setitem__('formulaDegree','7'))
    test_mutation('clipped keyboard','c-dominant13',lambda x:x['realizations'][1]['keyboard'].__setitem__('maxMidi',60))
    test_mutation('print stale','c-dominant9',lambda x:x['realizations'][1]['printPitches'].__setitem__(-1,'D3'))
    test_mutation('audio truncated','c-dominant13',lambda x:x['realizations'][1]['audio']['block'].pop())
    test_mutation('invented fingering','c-dominant9',lambda x:x['realizations'][1]['handDistribution'].__setitem__('fingerNumbers',[1,2,3,5]))
    test_mutation('invented teacher','c-dominant9',lambda x:x['realizations'][1]['evidence'].__setitem__('teacher_review',True))
    test_mutation('default missing','c-dominant9',lambda x:x['realizationPolicy'].__setitem__('default','none'))
    test_mutation('unannounced doubling','c-power5',lambda x:x['realizations'][-1].__setitem__('doubledDegrees',[]))
    legacy=read('07_validation/legacy145.definitions.oracle.json');finder=[]
    for c in read('05_interaction/finder.golden-cases.json'):
        found=candidates(c['selectedMidi'],objs,legacy);syms={s for s,k in found}
        for symbol in c.get('expectSymbols',[]):need(symbol in syms,c['id']+' missing '+symbol)
        for symbol in c.get('rejectSymbols',[]):need(symbol not in syms,c['id']+' unexpected '+symbol)
        if 'doNotClaimExact' in c:need((c['doNotClaimExact'],'exact_formula') not in found,'false exact')
        if c.get('matchKind'):
            for symbol in c.get('expectSymbols',[]):need((symbol,c['matchKind']) in found,'wrong match kind')
        if c.get('doNotClaimUnique'):
            need(syms!={c['doNotClaimUnique']},'unsupported unique rootless inference')
        if c.get('expectState') in ['empty','need_more_notes']:need(not found,'unexpected match for empty or one pitch class')
        fixture_only=c['id']=='nonchord-slash'
        finder.append({'id':c['id'],'matches':found,'status':'input_fixture_for_project_UI_test' if fixture_only else 'reference_set_assertions_passed'})
    keys=read('04_music/by-key.contexts.json');need(len(keys)==24,'key count')
    scale_refs={'major':[0,2,4,5,7,9,11],'natural_minor':[0,2,3,5,7,8,10]}
    for key in keys:
        need([(pc(n)-pc(key['tonic']))%12 for n in key['scaleNotes']]==scale_refs[key['mode']],'scale notes')
        need(len(key['rows'])==14,'key table length')
        for r in key['rows']:
            count=len(r['toneSpellings']);i=r['scaleDegree']-1
            need(r['toneSpellings']==[key['scaleNotes'][(i+2*j)%7] for j in range(count)],'diatonic chord spelling')
    progs=read('04_music/progressions.examples.json');need(len(progs)==96,'progression count')
    kindex={k['id']:k for k in keys};pindex={p['id']:p for p in read('04_music/progressions.patterns.json')}
    standard={'major':['1','3','5'],'minor':['1','b3','5'],
        'major7':['1','3','5','7'],'minor7':['1','b3','5','b7'],
        'dominant7':['1','3','5','b7'],'halfDiminished7':['1','b3','b5','b7']}
    progress_steps=0
    for p in progs:
        k=kindex[p['keyId']];pat=pindex[p['patternId']]
        need(p['tonic']==k['tonic'],'progression key tonic mismatch')
        need(k['mode']==pat['mode'],'progression mode mismatch')
        need(len(p['steps'])==len(pat['steps']),'progression step count')
        for row,expected in zip(p['steps'],pat['steps']):
            progress_steps+=1;deg,sub=expected
            need(row['degree']==deg and row['subtype']==sub,'pattern deviation')
            need(row['rootSpelling']==k['scaleNotes'][deg-1],'progression chord root')
            formula=standard[sub] if sub in standard else AUTH[sub][1]
            need(row['formulaDegrees']==formula,'progression formula')
            need(len(row['referenceTones'])==len(formula),'progression tone count')
            for d,n in zip(formula,row['referenceTones']):validate_spelling(row['rootSpelling'],d,n)
            outside=[n for n in row['referenceTones'] if pc(n) not in {pc(z) for z in k['scaleNotes']}]
            need(row['nonDiatonicTones']==outside,'unannounced chromatic context')
            need(bool(row['notDiatonicReason'])==bool(outside),'chromatic reason missing')
            need(row['beats']==4,'unexpected beat duration')
    source_ids={s['id'] for s in read('09_sources/source-ledger.json')}
    for o in objs:
        need(set(o['sources'])<=source_ids,'unknown source ID')
        for r in o['realizations']:need(set(r['sourceRuleIds'])<=source_ids,'unknown realization source')
    for p in progs:need(set(p['sourceIds'])<=source_ids,'unknown progression source')
    for k in keys:need(set(k['sources'])<=source_ids,'unknown key source')
    need(len(read('02_routes/current-chord-routes.reported.json'))==158,'route count')
    need(len(read('02_routes/original38.tasks.json'))==38,'source task count')
    need(len(read('02_routes/new-routes.allowlist.json'))==2,'allowlist changed')
    return {'status':'PASS_FOR_HANDOFF_DATA_ONLY','objectsValidated':len(objs),'realizationsValidated':sum(len(o['realizations']) for o in objs),
    'independentGoldenDefinitions':len(golden),'negativeTestsRejected':len(tests),'negativeTests':tests,
    'finderCases':finder,'contextKeys':len(keys),'diatonicRows':sum(len(k['rows']) for k in keys),
    'progressionExamples':96,'progressionStepsValidated':progress_steps,'sourceIdsResolvable':True,'notVerified':['current_repository','current_deployment','actual_audio','touch_device','screen_reader','physical_print','PDF_tags','teacher_review','Search_Console_or_GA4']}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--out');args=parser.parse_args()
    result=run();s=json.dumps(result,ensure_ascii=False,indent=2)
    if args.out:Path(args.out).write_text(s+'\n',encoding='utf-8')
    print(s)
