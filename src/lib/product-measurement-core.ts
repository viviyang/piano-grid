export const P0_PATHS = ['/chords','/chords/finder','/chords/c-major','/chords/a-minor','/chords/c-maj7','/chords/c-diminished','/chords/c-add9','/scales/c-major','/keyboard-notes'] as const;
export const RESULT_SETTLE_MS = 300;
export function isP0Path(path: string) { return (P0_PATHS as readonly string[]).includes(path); }
export function finderFingerprint(notes: number[], bass: number|null, mode: string) {
  return `${[...new Set(notes)].sort((a,b)=>a-b).join('-')}:${bass??'none'}:${mode==='root'?'root':'interpret'}`;
}
export function createMeasurementSession() {
  const seen = new Set<string>(), engaged = new Set<string>();
  return {
    once(key: string) { if(seen.has(key))return false;seen.add(key);return true; },
    engage(key: string) { if(!seen.has(`seen:${key}`)||engaged.has(key))return false;engaged.add(key);return true; },
    rate() { const denominator=[...seen].filter(key=>key.startsWith('seen:')).length;return denominator?engaged.size/denominator:null; },
  };
}
export function createSettler(schedule: (callback:()=>void, ms:number)=>unknown, cancel:(id:unknown)=>void) {
  let generation=0, timer:unknown;
  return { update(callback:()=>void) { generation++;const own=generation;cancel(timer);timer=schedule(()=>{if(own===generation)callback();},RESULT_SETTLE_MS); }, cancel(){generation++;cancel(timer);} };
}
export function createPracticeAttempt() {
  let started=false,assisted=false,completed=false,number=1;
  return {
    start(){if(started)return null;started=true;return number;},
    reveal(){assisted=true;},
    reset(){started=false;completed=false;number++;},
    complete(helped=false){if(completed)return null;completed=true;return {attempt:number,assisted:assisted||helped,outcome:'exercise_success'};},
  };
}
