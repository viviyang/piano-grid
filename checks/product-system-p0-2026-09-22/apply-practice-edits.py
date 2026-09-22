from pathlib import Path
p=Path('src/components/chords/chord-builder-practice.tsx');s=p.read_text(encoding='utf-8')
s=s.replace("'use client';","'use client';\nimport { usePilotPractice } from '@/lib/product-measurement';",1)
def replace(a,b,count=1):
 global s
 assert s.count(a)>=count,a
 s=s.replace(a,b,count)
replace(' useEffect(()=>setReady(true),[]);'," const measurement=usePilotPractice(data.namespace,'chord-builder');\n useEffect(()=>{if(feedback?.kind==='success')measurement.complete();},[feedback]);\n useEffect(()=>setReady(true),[]);",2)
replace('function toggle(value:number){', 'function toggle(value:number){measurement.start();')
replace('function toggle(midi:number){','function toggle(midi:number){measurement.start();')
replace('function check(){','function check(){measurement.start();',2)
replace('onClick={()=>{setSelected([]);setFeedback(null);}}','onClick={()=>{measurement.reset();setSelected([]);setFeedback(null);}}')
replace('onClick={()=>{setSelected([...answer]);','onClick={()=>{measurement.reveal();setSelected([...answer]);')
replace('function show(){','function show(){measurement.reveal();')
replace('function clear(){','function clear(){measurement.reset();')
p.write_text(s,encoding='utf-8')
p=Path('src/components/chords/c-major-experience.tsx');s=p.read_text(encoding='utf-8')
s=s.replace('setAttempt(clearChordAttempt);','measurement.reset();setAttempt(clearChordAttempt);')
s=s.replace('onClick={()=>setAttempt(clearChordAttempt)}','onClick={()=>{measurement.reset();setAttempt(clearChordAttempt);}}')
s=s.replace("onClick={()=>{reference();openPanel('theory');}}", "onClick={()=>{emitPilotEvent('p0_next_step_click',{object_id:data.namespace,target:'/chords/c-major',mode:'connections'});reference();openPanel('theory');}}")
p.write_text(s,encoding='utf-8')
