"""Browser checks of the final prototype. No claims about human listening or real devices."""
from pathlib import Path
import json, hashlib, math, time
from playwright.sync_api import sync_playwright
from browser_config import chromium_options
import fitz
R=Path(__file__).resolve().parent.parent
HTML=(R/'index.html').read_text();DATA=json.loads((R/'inputs/page-content.json').read_text())
PAGE=DATA['pages']['/chords/a-minor'];VOICINGS=DATA['shared_data']['voicings']
RESULTS=[];LAYOUT=[];ERRORS=[]
def check(name,ok,detail=None):
 RESULTS.append({'name':name,'passed':bool(ok),'detail':detail})
 print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 (R/'checks/progress.json').write_text(json.dumps(RESULTS,ensure_ascii=False,indent=2))
def load(browser,w=1440,h=1000,pre=None,js=True):
 page=browser.new_page(viewport={'width':w,'height':h},java_script_enabled=js)
 page.set_default_timeout(6000)
 page.on('pageerror',lambda e:ERRORS.append(str(e)))
 if pre: page.evaluate(pre)
 page.set_content(HTML,wait_until='load');page.wait_for_timeout(130)
 return page

def snap(page):return page.evaluate('PianoReference.getSnapshot()')
def choose(page,vid):page.locator('input[value="'+vid+'"]').check(force=True);page.wait_for_timeout(70)
def marked(page,root='#keyboard-scroll'):
 return page.locator(root+' .key.is-selected').evaluate_all('(es)=>es.map(e=>Number(e.dataset.midi))')
def sounding(page):return page.locator('#keyboard-scroll .key.is-sounding').evaluate_all('(es)=>es.map(e=>Number(e.dataset.midi))')
def geom(page,sel):return page.locator(sel).evaluate('(e)=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};}')

# Real oscillator method instrumentation. Records actual calls, not just app state.
INSTRUMENT='''() => {
window.__oscCalls=[];
const original=AudioContext.prototype.createOscillator;
AudioContext.prototype.createOscillator=function(){
 const osc=original.call(this);const rec={starts:[],stops:[],frequencyEvents:[]};window.__oscCalls.push(rec);
 const setFreq=osc.frequency.setValueAtTime.bind(osc.frequency);osc.frequency.setValueAtTime=function(value,t){rec.frequencyEvents.push({value,t});return setFreq(value,t)};
 const start=osc.start.bind(osc),stop=osc.stop.bind(osc);
 osc.start=function(t){rec.starts.push({t,frequency:osc.frequency.value});return start(t)};
 osc.stop=function(t){rec.stops.push(t===undefined?'immediate':t);return stop(t)};
 return osc;
};
}'''
with sync_playwright() as p:
 browser=p.chromium.launch(**chromium_options())
 version=browser.version
 # Widths, all positions, hit areas and image visibility.
 for w,h in [(320,800),(360,800),(390,844),(768,1024),(1024,900),(1440,1000)]:
  pg=load(browser,w,h)
  overflow=pg.evaluate('document.documentElement.scrollWidth>innerWidth')
  check(f'{w}px: no page horizontal overflow',not overflow)
  local={"width":w,"height":h,"page_overflow":overflow,"play_button":geom(pg,'#am-play-together'),"positions":[]}
  for opt in PAGE['selection']['options']:
   id=opt['value'];v=VOICINGS[id];choose(pg,id)
   check(f'{w}px {id}: selected keys match data',marked(pg)==v['display_midi'],marked(pg))
   check(f'{w}px {id}: symbol and bass match',pg.locator('#current-symbol').inner_text()==v['chord_symbol'] and pg.locator('#current-bass').inner_text()==v['bass_spelling'])
   visible=pg.evaluate('''()=>{const s=document.querySelector('#keyboard-scroll').getBoundingClientRect();return [...document.querySelectorAll('#keyboard-scroll .key.is-selected')].every(k=>{const r=k.getBoundingClientRect();return r.left>=s.left-1&&r.right<=s.right+1;});}''')
   check(f'{w}px {id}: all current marked keys in scroll viewport',visible)
   currtext=pg.locator('#note-order').inner_text().replace('\n',' ').replace(' ','')
   check(f'{w}px {id}: ordered note text matches',currtext=='–'.join(n['display_pitch'] for n in v['notes_low_to_high']))
   check(f'{w}px {id}: switching does not play',snap(pg)['audioState']=='idle' and snap(pg)['activeNodeCount']==0)
   local['positions'].append({'id':id,'selected_keys_visible':visible})
  controls=pg.locator('.playback-actions .btn,.segment,.pan-btn:not([disabled]),.print-actions .btn,#search-trigger').evaluate_all('(es)=>es.filter(e=>e.getClientRects().length).map(e=>({label:e.innerText||e.getAttribute("aria-label"),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))')
  check(f'{w}px: primary interactive targets >=44px',all(e['w']>=43.99 and e['h']>=43.99 for e in controls),controls)
  if w==390:
   choose(pg,'a-minor--root'); pg.evaluate('scrollTo(0,0)')
   local['play_button']=geom(pg,'#am-play-together')
   check('390x844: primary Play is inside first viewport',local['play_button']['bottom']<=844,local['play_button'])
   # arrows scroll exact underlying layout, not alternate note ranges
   old=pg.locator('#keyboard-scroll').evaluate('(e)=>e.scrollLeft');pg.locator('#pan-right').click();new=pg.locator('#keyboard-scroll').evaluate('(e)=>e.scrollLeft')
   check('Mobile keyboard pan works',new>old and pg.locator('#keyboard-scroll .key.white').count()==15)
  LAYOUT.append(local);pg.close()
 # Normal audio, played pitch/timing event data.
 pg=load(browser,pre=INSTRUMENT)
 check('No auto-play or AudioContext creation on load',pg.evaluate('__oscCalls.length')==0)
 for opt in PAGE['selection']['options']:
  id=opt['value'];v=VOICINGS[id];choose(pg,id)
  for mode,btn in [('together','#am-play-together'),('ascending','#am-play-apart')]:
   pg.evaluate('__oscCalls=[]');pg.locator(btn).click()
   pg.wait_for_function('PianoReference.getSnapshot().audioState==="playing"',timeout=8000)
   pg.wait_for_timeout(90)
   s=snap(pg);calls=pg.evaluate('__oscCalls')
   expected=v['playback'][mode]
   check(f'{id} {mode}: actual oscillators use event frequencies',len(calls)==3 and all(abs(c['frequencyEvents'][0]['value']-e['frequency_hz'])<.001 for c,e in zip(calls,expected)),calls)
   starts=[c['starts'][0]['t'] for c in calls]
   check(f'{id} {mode}: onset and duration match ms events',all(abs((t-starts[0])*1000-e['onset_ms'])<.01 and abs((c['stops'][0]-t)*1000-e['duration_ms'])<.01 for t,c,e in zip(starts,calls,expected)))
   check(f'{id} {mode}: active note state differs from selection',sounding(pg)==([n['midi'] for n in expected] if mode=='together' else [expected[0]['midi']]),sounding(pg))
   pg.locator('#am-stop').click();pg.wait_for_timeout(100)
   check(f'{id} {mode}: Stop clears sound, retains selection',snap(pg)['activeNodeCount']==0 and snap(pg)['scheduled']==[] and sounding(pg)==[] and marked(pg)==v['display_midi'])
   # Waiting beyond scheduled duration verifies no late callbacks re-mark the keys.
   if mode=='ascending' and id=='a-minor--root':
    pg.wait_for_timeout(1750);check('Stop: no late note restart',sounding(pg)==[] and snap(pg)['audioState']=='idle')
 # Natural completion and rapid mode/voicing switches.
 choose(pg,'a-minor--root');pg.locator('#am-play-together').click();pg.wait_for_function('PianoReference.getSnapshot().audioState==="playing"');pg.wait_for_timeout(1350)
 check('Natural completion returns to idle',snap(pg)['activeNodeCount']==0 and snap(pg)['audioState']=='idle' and pg.locator('#am-stop').is_disabled())
 pg.locator('#am-play-apart').click();pg.wait_for_timeout(60);choose(pg,'a-minor--second');pg.wait_for_timeout(80)
 check('Changing inversion cancels old playback',snap(pg)['activeNodeCount']==0 and sounding(pg)==[] and marked(pg)==[64,69,72])
 for btn in ['#am-play-together','#am-play-apart','#am-play-together']:pg.locator(btn).click();pg.wait_for_timeout(35)
 check('Rapid replay: at most the current three nodes connected',snap(pg)['activeNodeCount']<=3 and snap(pg)['mode']=='together')
 pg.locator('#am-stop').click()
 # Keyboard radio interaction and focus.
 root=pg.locator('input[value="a-minor--root"]');root.focus();root.press('Space');root.press('ArrowRight');pg.wait_for_timeout(90)
 check('Native radio ArrowRight selects first inversion',snap(pg)['selectedVoicingId']=='a-minor--first')
 ring=pg.locator('input:checked + .segment').evaluate('(e)=>({style:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth})')
 check('Radio keyboard focus visible independently of selected state',ring['style']=='solid' and ring['width']=='2px',ring)
 pg.locator('#am-result').screenshot(path=str(R/'previews/state-selected-focus.png'))
 # FAQ native expansion via keyboard, multiple expansion.
 faq=pg.locator('.faq-item summary');faq.nth(0).focus();faq.nth(0).press('Enter');faq.nth(1).focus();faq.nth(1).press('Space')
 check('FAQ: multiple items open with keyboard',pg.locator('.faq-item[open]').count()==2)
 # local search
 pg.locator('#search-trigger').click();pg.locator('#page-search-input').fill('inversions');check('Page-local search returns actual section',pg.locator('#search-results a').count()>0)
 pg.locator('#page-search-input').press('Escape');check('Search Escape closes modal',not pg.locator('#page-search').is_visible())
 pg.locator('#search-trigger').click();pg.locator('#page-search-input').fill('impossible_nonmatching_xyz');check('Search has real empty state',pg.locator('#search-results a').count()==0 and 'No matching' in pg.locator('#search-status').inner_text());pg.locator('#search-close').click()
 # white current-selection print, actual PDF rendering at all positions
 for opt in PAGE['selection']['options']:
  id=opt['value'];choose(pg,id)
  pg.evaluate('() => {window.print=()=>window.dispatchEvent(new Event("beforeprint"));}')
  pg.locator('#am-print-current').click(); pg.emulate_media(media='print')
  v=VOICINGS[id]
  check(f'{id}: print data agrees with selection',marked(pg,'#print-content')==v['display_midi'] and pg.locator('#print-symbol').inner_text()==v['chord_symbol'])
  name=id.replace('a-minor--','')
  pg.pdf(path=str(R/f'checks/print-{name}.pdf'),format='Letter',prefer_css_page_size=True,print_background=True,display_header_footer=False)
  pdf=fitz.open(R/f'checks/print-{name}.pdf')
  check(f'{id}: current print fits one page',len(pdf)==1)
  text=pdf[0].get_text()
  check(f'{id}: print includes position, no navigation or controls',v['inversion_label'] in text and 'Play chord' not in text and 'Search this page' not in text)
  pdf[0].get_pixmap(matrix=fitz.Matrix(1.25,1.25)).save(str(R/f'previews/print-{name}.png'))
  pg.emulate_media(media='screen');pg.evaluate('window.dispatchEvent(new Event("afterprint"))')
 # Print freeze: current radio changes cannot mutate an already captured selection.
 choose(pg,'a-minor--first');pg.locator('#am-print-current').click();choose(pg,'a-minor--second')
 check('Print captures click-time selection',pg.locator('#print-content').get_attribute('data-voicing-id')=='a-minor--first')
 pg.evaluate('dispatchEvent(new Event("afterprint"))');check('Afterprint restores current selection without false success',pg.locator('#print-content').get_attribute('data-voicing-id')=='a-minor--second' and pg.locator('#resource-status').inner_text()=='')
 # PDF actual download bytes.
 with pg.expect_download() as dl:
  pg.locator('#am-download').click()
 download=dl.value; download.save_as(str(R/'checks/downloaded-reference.pdf'))
 expectedhash=hashlib.sha256((R/'assets/a-minor-notes-inversions.pdf').read_bytes()).hexdigest()
 check('PDF link downloads the actual verified asset',hashlib.sha256((R/'checks/downloaded-reference.pdf').read_bytes()).hexdigest()==expectedhash)
 # Page hiding cancels audio without a promise to resume.
 pg.locator('#am-play-apart').click();pg.wait_for_timeout(70)
 pg.evaluate('Object.defineProperty(document,"hidden",{configurable:true,get:()=>true});document.dispatchEvent(new Event("visibilitychange"));')
 check('Hidden-page event stops audio',snap(pg)['activeNodeCount']==0 and sounding(pg)==[])
 pg.close()
 # Error fallback: no AudioContext present.
 pg=load(browser,390,844,pre='() => {window.AudioContext=undefined;window.webkitAudioContext=undefined;}')
 check('Audio unavailable: clear source microcopy',pg.locator('#audio-status').inner_text()==PAGE['microcopy']['audio_unavailable'])
 check('Audio unavailable: no false playable buttons',pg.locator('#am-play-together').is_disabled() and pg.locator('#am-play-apart').is_disabled())
 choose(pg,'a-minor--second');check('Audio unavailable: position and print remain usable',marked(pg)==[64,69,72] and pg.locator('#am-print-current').is_enabled())
 pg.locator('#am-result').screenshot(path=str(R/'previews/state-audio-unavailable.png'));pg.close()
 # Explicit initialization error then retry using the original real constructor.
 pg=load(browser,pre='() => {window.__realAudio=AudioContext;window.AudioContext=function(){throw new Error("test error")};}')
 pg.locator('#am-play-together').click();check('Audio initialization error is handled',snap(pg)['audioState']=='error' and pg.locator('#audio-status').inner_text()==PAGE['microcopy']['audio_error'])
 pg.locator('#am-result').screenshot(path=str(R/'previews/state-audio-error.png'));pg.close()
 # Deferred resume cancelled: no late notes and pending start removed.
 pg=load(browser,pre='''() => { const Real=AudioContext;window.AudioContext=function(){const c=new Real();Object.defineProperty(c,'state',{get:()=> 'suspended'});c.resume=()=>new Promise(resolve=>{window.__releaseResume=resolve});return c;}; }''')
 pg.locator('#am-play-together').click();check('Deferred resume shows real loading microcopy',snap(pg)['audioState']=='loading' and pg.locator('#audio-status').inner_text()==PAGE['microcopy']['loading'])
 pg.locator('#am-result').screenshot(path=str(R/'previews/state-audio-loading.png'))
 pg.locator('#am-stop').click();pg.evaluate('__releaseResume()');pg.wait_for_timeout(120)
 check('Stop during loading prevents late scheduled audio',snap(pg)['activeNodeCount']==0 and snap(pg)['audioState']=='idle' and not snap(pg)['pendingStart']);pg.close()
 # Print error independent of diagram/audio.
 pg=load(browser);pg.evaluate('() => {window.print=()=>{throw new Error("test blocked")};}');pg.locator('#am-print-current').click()
 check('Print invocation failure shows microcopy',pg.locator('#resource-status').inner_text()==PAGE['microcopy']['print_error']);pg.close()
 # Document content and navigation gating.
 pg=load(browser)
 for block in PAGE['blocks']:
  if block['block_id'] in ['am-intro','am-next']:continue
  area=pg.locator('[data-block-id="'+block['block_id']+'"]')
  text=area.text_content()
  for value in block['content']['paragraphs']+block['content']['steps']:
   check(block['block_id']+': exact supplied copy '+value[:34],value in text)
  if block['block_id']=='am-questions':
   for q,a in block['content']['table']['rows']:check('FAQ original answer: '+q,q in text and a in text)
 check('No fake related links or undefined domain',pg.locator('a[href^="/"],a[href=" #"],a[href="#"]').count()==0 and pg.locator('[data-block-id="am-next"]').count()==0)
 check('No automatic full-site page generation',sorted(p.relative_to(R).as_posix() for p in (R/'chords').rglob('index.html'))==['chords/a-minor/index.html'])
 # Visual states, hover and sounding captured from the browser.
 pg.locator('#am-play-together').hover();pg.locator('#am-result').screenshot(path=str(R/'previews/state-hover.png'))
 pg.locator('#am-play-together').click();pg.wait_for_timeout(130);pg.locator('#am-result').screenshot(path=str(R/'previews/state-playing.png'));pg.locator('#am-stop').click()
 # 200% text-scale probe at narrow CSS viewport (not claimed identical to all browser zoom modes).
 pg.set_viewport_size({'width':390,'height':844});pg.add_style_tag(content='html{font-size:200%}')
 check('200% root font probe at390: no page overflow',pg.evaluate('document.documentElement.scrollWidth<=innerWidth'),pg.evaluate('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})'))
 pg.screenshot(path=str(R/'previews/text-scale-200.png'),full_page=True);pg.close()
 # JS-disabled reference remains useful; no pretend working controls.
 pg=load(browser,390,844,js=False)
 check('No-JS: initial answer, root diagram, table and all FAQs present',pg.locator('h1').first.inner_text()=='A Minor Piano Chord (Am)' and pg.locator('#keyboard-scroll .key.is-selected').count()==3 and pg.locator('.inversion-table tbody tr').count()==3 and pg.locator('.faq-item').count()==4)
 check('No-JS: controls disabled, PDF a real link',pg.locator('#am-play-together').is_disabled() and pg.locator('#position-fieldset input').first.is_disabled() and pg.locator('#am-download').get_attribute('href').startswith('data:application/pdf;'))
 pg.close();browser.close()
check('No uncaught browser errors',len(ERRORS)==0,ERRORS)
# File protection
saved=json.loads((R/'checks/earlier-artifacts-before.json').read_text())
SKIPPED=[]
for path,expected_hash in saved.items():
 original=R.parent/path
 if original.exists():
  check('Earlier artifact unchanged: '+path,hashlib.sha256(original.read_bytes()).hexdigest()==expected_hash)
 else:
  SKIPPED.append({'name':'Earlier artifact unchanged: '+path,'reason':'Original comparison artifact is not in this extracted bundle.'})
provenance=json.loads((R/'checks/provenance.json').read_text())
input_hashes={item['name']:item['sha256'] for item in provenance['inputs']}
for name in ['page-content.json','content-pack.md','url-plan.final(1).json','Piano_Final_Build_Prompt.md']:
 source=R/'inputs'/name
 original=R.parent/name
 agrees=hashlib.sha256(source.read_bytes()).hexdigest()==input_hashes[name]
 if original.exists(): agrees=agrees and source.read_bytes()==original.read_bytes()
 check('Input unchanged: '+name,agrees)
report={'date':'2026-09-09','runtime':'Headless Chromium '+version,'loading_method':'HTML bytes passed to browser set_content; file:// navigation blocked by runtime policy. No external browser deployment.', 'checks':RESULTS,'skipped':SKIPPED,'passed':sum(x['passed'] for x in RESULTS),'failed':[x for x in RESULTS if not x['passed']],'layouts':LAYOUT,'not_tested':['Real iPhone/Android device','Safari / Firefox / Windows Edge','Human audio audition or speaker output','Physical printer output','Native print dialog interaction','Full screen-reader audit','Full WCAG 2.2 conformance audit','Production deployment']}
(R/'checks/acceptance.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'passed':report['passed'],'total':len(RESULTS),'failed':report['failed']},ensure_ascii=False,indent=2))

if report["failed"]:
 raise SystemExit(1)
