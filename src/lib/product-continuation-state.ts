// URL state references published objects only; it never defines music data.
export const PILOT_DETAILS = ['/chords/c-major','/chords/a-minor','/chords/c-maj7','/chords/c-diminished','/chords/c-add9'] as const;
export function isPilotDetail(path: string) { return (PILOT_DETAILS as readonly string[]).includes(path); }
export function readContinuation(search: string) {
  const p = new URLSearchParams(search);
  const bass = p.get('pg-bass');
  return { present: ['pg-object','pg-bass','pg-context'].some(key => p.has(key)), object: p.get('pg-object'), bass: bass !== null && /^(?:[0-9]|1[01])$/.test(bass) ? Number(bass) : null, invalidBass: bass !== null && !/^(?:[0-9]|1[01])$/.test(bass), context: p.get('pg-context') };
}
export function restoreVoicing(search: string, object: string, voicings: {voicing_id:string;notes_low_to_high:{midi:number}[]}[], fallback: string) {
  const state=readContinuation(search);
  if(!state.present)return {id:fallback,message:''};
  if(state.object!==object || state.invalidBass || (state.context!==null&&state.context!=='c-major'))return {id:fallback,message:'This reference link could not be restored. The default reference is shown.'};
  const match=state.bass===null?voicings.find(v=>v.voicing_id===fallback):voicings.find(v=>v.notes_low_to_high[0].midi%12===state.bass);
  return {id:match?.voicing_id??fallback,message:match?'Selected chord restored. This is a published reference voicing; the original octaves and spacing are not preserved.':'The requested bass is not available in these examples. The reference voicing has been reset.'};
}
export function finderDestination(destination: string, object: string, bass: number|null) {
  const url=new URL(destination,'https://pianogrid.com');
  if(!isPilotDetail(url.pathname)&&url.pathname!=='/chords/extended')return destination;
  url.searchParams.set('pg-object',object);
  if(bass!==null)url.searchParams.set('pg-bass',String(bass));
  return url.pathname+url.search+url.hash;
}
export function finderQuery(notes:number[],bass:number|null,mode:string) {
  const p=new URLSearchParams();
  if(notes.length)p.set('pg-notes',[...new Set(notes)].sort((a,b)=>a-b).join(','));
  if(bass!==null)p.set('pg-bass',String(bass));
  if(mode==='root')p.set('pg-mode','root');
  return p;
}
export function restoreFinder(search:string) {
  const p=new URLSearchParams(search),raw=p.get('pg-notes');
  if(raw===null)return {notes:[] as number[],bass:null as number|null,mode:'interpret' as const,invalid:false};
  const values=raw.split(',');const notes=[...new Set(values.map(Number))].sort((a,b)=>a-b);
  const b=p.get('pg-bass'),bass=b===null?null:Number(b),mode=p.get('pg-mode');
  const invalid=values.length>12||values.some(v=>!/^(?:[0-9]|1[01])$/.test(v))||(b!==null&&(!/^(?:[0-9]|1[01])$/.test(b)||!notes.includes(bass!)))||(mode!==null&&mode!=='root');
  return invalid?{notes:[],bass:null,mode:'interpret' as const,invalid:true}:{notes,bass,mode:mode==='root'?'root' as const:'interpret' as const,invalid:false};
}
