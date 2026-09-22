from pathlib import Path
root=Path('src/components')
def edit(path, changes):
 p=root/path;s=p.read_text(encoding='utf-8')
 for old,new in changes:
  if old not in s:raise Exception((path,old[:90]))
  s=s.replace(old,new,1)
 p.write_text(s,encoding='utf-8')
imp="import { emitPilotEvent, useResultExposure, usePilotAudio, usePilotPractice } from '@/lib/product-measurement';\n"
edit('support/finder-experience.tsx',[
 ('<div className="fd-results"','<div ref={resultRef} className="fd-results"'),
 ('href={chord.destination}>','href={chord.destination} onClick={()=>emitPilotEvent(\'finder_result_selected\',{object_id:chord.id,result_state:fingerprint,match_kind:kind,target:chord.destination.split(\'#\')[0]})}>'),
])
edit('a-minor/experience.tsx',[
 ("'use client';","'use client';\n"+imp),
 ('  const notes=voicing.notes_low_to_high;','  const resultRef=useRef<HTMLDivElement>(null);\n  useResultExposure(resultRef,data.namespace,selectedVoicingId);\n  usePilotAudio(audio.state,data.namespace,audio.mode);\n  const notes=voicing.notes_low_to_high;'),
 ('<div className="am-current-result">','<div ref={resultRef} className="am-current-result">'),
 ('  function print() {','  function print() {\n    emitPilotEvent(\'p0_print_request\',{object_id:data.namespace});'),
])
edit('chords/center-experience.tsx',[
 ("'use client';","'use client';\n"+imp),
 (' const current=filtered.find',' const resultRef=useRef<HTMLDivElement>(null);\n useResultExposure(resultRef,\'chord-chart\',`${root||\'all\'}:${quality||\'all\'}`,filtered.length>0);\n usePilotAudio(audio.state,audioId||\'chord-chart\',audio.mode);\n const current=filtered.find'),
 ('<div className="ch-results-bar">','<div ref={resultRef} className="ch-results-bar">'),
 ('function print(items:CenterItem[]){if(!items.length)return;','function print(items:CenterItem[]){if(!items.length)return;emitPilotEvent(\'p0_print_request\',{object_id:\'chord-chart\',selected_count:items.length});'),
])
edit('scales/detail-experience.tsx',[
 ("'use client';","'use client';\n"+imp),
 ('  const lastReference = useRef(',"  const resultRef=useRef<HTMLElement>(null);\n  useResultExposure(resultRef,option.id,`${hand}:${direction}`);\n  const lastReference = useRef("),
 ('<section className="am-tool sc-tool sc-screen"','<section ref={resultRef} className="am-tool sc-tool sc-screen"'),
])
edit('keyboard-notes/keyboard-notes-workspace.tsx',[
 ("'use client';","'use client';\n"+imp),
 ('  const whiteSpan = compact ? 12 : 24;',"  const resultRef=useRef<HTMLDivElement>(null);\n  useResultExposure(resultRef,selected?`midi-${selected.midi}`:'no-note',layout.layout_id,active&&!!selected);\n  usePilotAudio(audio.state,selected?`midi-${selected.midi}`:'no-note');\n  const whiteSpan = compact ? 12 : 24;"),
 ('<div className="kn-v2-explore-head"','<div ref={resultRef} className="kn-v2-explore-head"'),
])
