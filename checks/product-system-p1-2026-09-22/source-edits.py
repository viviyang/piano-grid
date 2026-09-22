from pathlib import Path
r=Path.cwd()
def edit(p,a,b):
 f=r/p;s=f.read_text(encoding='utf8');assert a in s,(p,a[:50]);f.write_text(s.replace(a,b,1),encoding='utf8')
p='src/components/keyboard-notes/keyboard-notes-workspace.tsx';edit(p,'lookupShareParams(layout,selected)','lookupShareParams(layout,resolution.selected!)')
p='src/components/support/finder-experience.tsx';edit(p,"onChange={event=>setBass(event.target.value===''?null:Number(event.target.value))}","onChange={event=>{userInput();setBass(event.target.value===''?null:Number(event.target.value));}}")
edit(p,"onChange={event=>setBassConstraint(event.target.value as 'interpret'|'root')}","onChange={event=>{userInput();setBassConstraint(event.target.value as 'interpret'|'root');}}")
p='src/lib/chord-learning-content.ts';edit(p,'type PreparedChordLearning=',"""// Only these two P1 core references inherit the existing detail source records.
export function getPilotCoreSourceIDs(url:string|null):string[] {
  return url==='/chords/c-major'||url==='/chords/a-minor' ? [...pageSourceIds[url]] : [];
}

type PreparedChordLearning=""")
p='src/lib/chord-completion-content.ts';edit(p,"import { readFileSync }", "import {getPilotCoreSourceIDs} from './chord-learning-content';\nimport { readFileSync }")
edit(p,'sourceIDs: [], teacherReviewed: false','sourceIDs: getPilotCoreSourceIDs(item.url), teacherReviewed: false')
p='src/components/scales/detail-experience.tsx'
edit(p,'<ProductContinuation path="/scales/c-major"/>','<><ProductContinuation path="/scales/c-major"/><p className="sc-boundary">Reference edition: 2026-09-22. The sources below apply to the stated hand, direction and one-octave range. The two-hand starter PDF is a fixed reference, not a snapshot of these controls. No independent teacher review is claimed.</p></>')
edit(p,'<p className="sc-print-foot">',"{print.option.tonic==='C'&&print.option.form==='major'&&<p>Reference edition: 2026-09-22. Current hand and direction are shown above. Source scope is listed with the reference; no independent teacher review is claimed.</p>}<p className=\"sc-print-foot\">")
