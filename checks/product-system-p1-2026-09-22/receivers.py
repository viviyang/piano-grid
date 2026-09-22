from pathlib import Path
r=Path.cwd()
def edit(p,a,b):
 f=r/p;s=f.read_text(encoding='utf8');assert a in s,(p,a[:50]);f.write_text(s.replace(a,b,1),encoding='utf8')
p='src/components/chords/completion-category-experience.tsx'
edit(p,"import { useEffect", "import {readContinuation} from '@/lib/product-continuation-state';\nimport { useEffect")
edit(p,"const player = useRef<ReferenceAudio | null>(null);", """const player = useRef<ReferenceAudio | null>(null);
  const [restoreMessage,setRestoreMessage]=useState('');
  useEffect(()=>{
    if(family!=='extended')return;
    const restore=()=>{
      const state=readContinuation(location.search);let hash='';try{hash=decodeURIComponent(location.hash.slice(1));}catch{}
      const requested=state.object?items.find(item=>item.id===state.object):items.find(item=>item.destination.split('#')[1]===hash);
      const mismatch=state.object&&hash&&requested?.destination.split('#')[1]!==hash;
      const valid=requested&&!mismatch&&!state.invalidBass;
      const next=valid?requested:items.find(item=>item.id===defaultObjectId)!;
      const matching=state.bass===null?null:next.realizations.find(item=>item.bass.midi%12===state.bass);
      player.current?.cancel();setSelectedId(next.id);setRealizationId(matching?.id??next.defaultRealizationId);setRoot('');setSubtype('');setQuery('');setAnswer([]);setFeedback('');
      setRestoreMessage(valid?(state.bass!==null&&!matching?'Selected chord restored. The requested bass is unavailable; the reference voicing has been reset.':'Selected chord restored. The displayed example does not preserve your original octaves or spacing.'):(state.present||hash.startsWith('ref-')?'This reference link could not be restored. The default reference is shown.':''));
    };restore();window.addEventListener('hashchange',restore);window.addEventListener('popstate',restore);
    return()=>{window.removeEventListener('hashchange',restore);window.removeEventListener('popstate',restore);};
  },[items,defaultObjectId,family]);""")
edit(p,"const next = items.find(item => item.id === id)!; setRealizationId", "const next = items.find(item => item.id === id)!; if(family==='extended'){const url=new URL(location.href);url.searchParams.delete('pg-object');url.searchParams.delete('pg-bass');url.hash=next.destination.split('#')[1];history.pushState(history.state,'',url.pathname+url.search+url.hash);setRestoreMessage('');} setRealizationId")
edit(p,'<div className="cc-filters">','{restoreMessage&&<p role="status">{restoreMessage}</p>}<div className="cc-filters">')
p='src/components/support/progression-experience.tsx'
edit(p,'const patternExamples=useMemo',"""const [restoreMessage,setRestoreMessage]=useState('');
 useEffect(()=>{const restore=()=>{let hash='';try{hash=decodeURIComponent(location.hash.slice(1));}catch{}const contextId=new URLSearchParams(location.search).get('pg-context');const id=hash.startsWith('progression-')?hash.slice(12):hash==='c-major'||contextId==='c-major'?'pop-four-c-major':'';const match=examples.find(item=>item.id===id);if(!id&&!contextId)return;stop(false);const next=match??examples.find(item=>item.id===defaultExample)!;setSelectedId(next.id);setPatternId(next.patternId);setTempo(next.tempoBpmDefault);setRestoreMessage(match?'Selected progression restored in its named key context.':'This progression link could not be restored. The default example is shown.');};restore();window.addEventListener('hashchange',restore);window.addEventListener('popstate',restore);return()=>{window.removeEventListener('hashchange',restore);window.removeEventListener('popstate',restore);};},[examples,defaultExample]);
 function recordExample(id:string){const url=new URL(location.href);url.searchParams.delete('pg-context');url.hash=`progression-${id}`;history.pushState(history.state,'',url.pathname+url.search+url.hash);setRestoreMessage('');}
 const patternExamples=useMemo""")
edit(p,'setSelectedId(next.id);setTempo(next.tempoBpmDefault);}', 'setSelectedId(next.id);setTempo(next.tempoBpmDefault);recordExample(next.id);}')
edit(p,'<div className="pg-picker">','{restoreMessage&&<p role="status">{restoreMessage}</p>}<div className="pg-picker">')
edit(p,'setSelectedId(e.target.value);const next=', 'setSelectedId(e.target.value);recordExample(e.target.value);const next=')
p='src/components/support/by-key-experience.tsx'
edit(p,"useEffect(() => {const anchor=window.location.hash.slice(1),match=keys.find(key=>anchorFor(key)===anchor);if(match)setSelectedKey(match.key);setReady(true);}, [keys]);", """const [restoreMessage,setRestoreMessage]=useState('');
  useEffect(()=>{const restore=()=>{let anchor='';try{anchor=decodeURIComponent(location.hash.slice(1));}catch{}const match=keys.find(key=>anchorFor(key)===anchor);setSelectedKey(match?.key??defaultKey);setRestoreMessage(anchor&&!match?'This key context could not be restored. The default key is shown.':'');setReady(true);};restore();window.addEventListener('hashchange',restore);window.addEventListener('popstate',restore);return()=>{window.removeEventListener('hashchange',restore);window.removeEventListener('popstate',restore);};},[keys,defaultKey]);""")
edit(p,'onChange={event => setSelectedKey(event.target.value)}',"onChange={event => {setSelectedKey(event.target.value);const key=keys.find(item=>item.key===event.target.value)!;const url=new URL(location.href);url.searchParams.delete('pg-context');url.hash=anchorFor(key);history.pushState(history.state,'',url.pathname+url.search+url.hash);setRestoreMessage('');}}")
edit(p,'<div className="bk-key-panels">','{restoreMessage&&<p role="status">{restoreMessage}</p>}{selected.key===\'C major\'&&<p><a className="am-button am-secondary" href="/chord-progressions?pg-context=c-major#progression-pop-four-c-major">Hear a progression in this C major context</a></p>}<div className="bk-key-panels">')
