from pathlib import Path
r=Path.cwd()
def edit(p,a,b):
 f=r/p;s=f.read_text(encoding='utf8');assert a in s,(p,a[:45]);f.write_text(s.replace(a,b,1),encoding='utf8')
p='src/components/support/progression-experience.tsx';edit(p,'const restore=()=>{let hash=', 'const restore=(event?:Event)=>{let hash=');edit(p,'if(!id&&!contextId)return;',"if(!id&&!contextId&&event?.type!=='popstate')return;")
p='src/components/chords/completion-category-experience.tsx';edit(p,'const valid=requested&&!mismatch&&!state.invalidBass;','const valid=requested&&!mismatch&&!state.invalidBass&&(state.context===null||state.context===\'c-major\');')
p='src/lib/product-measurement.ts';edit(p,"'hand','direction','status'","'hand','direction','status','context_id','relation','task_id'")
edit(p,"if(!legacyScale)emitPilotEvent('p0_next_step_click',{object_id:objectId,result_state:resultState,target:url.pathname});", "const relation=link.getAttribute('data-relation');const context=url.searchParams.get('pg-context')==='c-major'?'c-major':null;\n      if(!legacyScale)emitPilotEvent('p0_next_step_click',{object_id:objectId,result_state:resultState,target:url.pathname,context_id:context,relation:relation&&['practice','context','scale','compare','browse','identify','chord'].includes(relation)?relation:null});")
