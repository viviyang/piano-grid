from pathlib import Path
r=Path.cwd()
def edit(p,a,b):
 f=r/p;s=f.read_text(encoding='utf8');assert a in s,(p,a[:60]);f.write_text(s.replace(a,b,1),encoding='utf8')
def imports(p,s):edit(p,"'use client';","'use client';\n"+s)
p='src/components/product-continuation.tsx';edit(p,'event="scale_next_task_opened" properties={{object_id:item.sourceObjectId,target:link.href}}','event="related"')
for p in ['src/components/a-minor/experience.tsx','src/components/chords/c-major-experience.tsx']:
 imports(p,"import {ProductContinuation} from '@/components/product-continuation';\nimport {useDetailContinuation} from '@/lib/use-continuation-state';")
edit('src/components/a-minor/experience.tsx','const printSnapshot=useRef<string|null>(null);',"const continuationMessage=useDetailContinuation(data,id=>{setSelected(id);selected.current=id;},()=>player.current?.cancel());\n  const printSnapshot=useRef<string|null>(null);")
edit('src/components/a-minor/experience.tsx','{introduction}<div className="am-reading">','{continuationMessage&&<p role="status">{continuationMessage}</p>}<ProductContinuation path={data.url}/>{introduction}<div className="am-reading">')
edit('src/components/chords/c-major-experience.tsx','const positionSettings=useCallback',"const continuationMessage=useDetailContinuation(data,id=>{setPosition(id);currentPosition.current=id;},()=>player.current?.cancel());\n  const positionSettings=useCallback")
edit('src/components/chords/c-major-experience.tsx','<div className="cp-panels">','{continuationMessage&&<p role="status">{continuationMessage}</p>}<ProductContinuation path={data.url}/><div className="cp-panels">')
p='src/components/chords/center-experience.tsx';imports(p,"import {ProductContinuation} from '@/components/product-continuation';");edit(p,'<div className="am-reading">{children}</div>','<ProductContinuation path="/chords"/><div className="am-reading">{children}</div>')
p='src/components/scales/detail-experience.tsx';imports(p,"import {ProductContinuation} from '@/components/product-continuation';");edit(p,'<ScaleQuiz key=',"{option.tonic==='C'&&option.form==='major'&&<ProductContinuation path=\"/scales/c-major\"/>}\n      <ScaleQuiz key=")
p='src/components/keyboard-notes/keyboard-notes-workspace.tsx';imports(p,"import {ProductContinuation} from '@/components/product-continuation';");edit(p,'<p className="kn-hub-live" aria-live="polite">',"<ProductContinuation path=\"/keyboard-notes\" primaryHref={selected?`/keyboard-notes?${lookupShareParams(layout,selected)}#note-trainer`:'#note-trainer'}/>\n    <p className=\"kn-hub-live\" aria-live=\"polite\">")
p='src/components/support/finder-experience.tsx';edit(p,"import { useMemo, useState, useRef }", "import { useEffect, useMemo, useState, useRef }");imports(p,"import {ProductContinuation} from '@/components/product-continuation';\nimport {finderDestination,finderQuery,restoreFinder} from '@/lib/product-continuation-state';")
edit(p,'const [interacted,setInteracted]=useState(false);',"""const [interacted,setInteracted]=useState(false),[restored,setRestored]=useState(false),[restoreMessage,setRestoreMessage]=useState('');
 useEffect(()=>{const restore=()=>{const next=restoreFinder(location.search);setSelected(next.notes);setBass(next.bass);setBassConstraint(next.mode);setRestoreMessage(next.invalid?'This note selection could not be restored. Choose the notes again.':'');setRestored(true);};restore();window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore);},[]);
 useEffect(()=>{if(!restored)return;const url=new URL(location.href);for(const key of ['pg-notes','pg-bass','pg-mode'])url.searchParams.delete(key);finderQuery(selected,bass,bassConstraint).forEach((value,key)=>url.searchParams.set(key,value));history.replaceState(history.state,'',url.pathname+url.search+url.hash);},[restored,selected,bass,bassConstraint]);""")
edit(p,'selected.length>=2&&settled===fingerprint','selected.length>=2&&((!interacted&&restored)||settled===fingerprint)')
edit(p,'href={chord.destination}', 'href={finderDestination(chord.destination,chord.id,bass)}')
edit(p,'<noscript><p className="fd-noscript">','{restoreMessage&&<p role="status">{restoreMessage}</p>}<ProductContinuation path="/chords/finder"/><noscript><p className="fd-noscript">')
# Foundation keeps an exact list, not a widened glob.
edit('scripts/check-foundation.mjs',"allowedComponents.push('src/components/chords/c-major-experience.tsx'","allowedComponents.push('src/components/product-continuation.tsx');\n  allowedComponents.push('src/components/chords/c-major-experience.tsx'")
