import { cn } from '@/lib/utils';
import type { Voicing } from '@/lib/a-minor-types';
import { keyGeometry } from '@/lib/keyboard-geometry';

export type KeyboardInput = {
  ready: boolean; practice: boolean; labels: boolean; selected: number[]; pressed: number[];
  feedback?: 'wrong' | 'correct' | 'revealed';
  press: (midi: number, source: string) => void;
  release: (source: string) => void;
  toggle: (midi: number) => void;
};
const names = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];

export function Keyboard({ voicing, whitePitchClasses, sounding = [], print = false, input }: { voicing: Voicing; whitePitchClasses: number[]; sounding?: number[]; print?: boolean; input?: KeyboardInput }) {
  const [lo,hi] = voicing.diagram.keyboard_range_midi;
  const pitches = Array.from({length:hi-lo+1},(_,i)=>lo+i);
  const whites = pitches.filter(m=>whitePitchClasses.includes(m%12));
  const letters = ['C','D','E','F','G','A','B'];
  const selected = input?.practice ? [] : print ? voicing.print_data.highlight_midi : voicing.diagram.highlight_midi;
  return <div className={input?"am-keyboard pg-piano":"am-keyboard"}>
    <div className="am-key-bed" role={input?'group':'img'} aria-label={input?'Playable piano keyboard':voicing.diagram.alt_text}>
      {pitches.map(m=>{
        const white = whites.includes(m), index = whites.filter(w=>w<m).length;
        // Final reference black-key width=60% of a white key, centred on boundary.
        const geometry = keyGeometry(index, white, whites.length);
        const written=voicing.notes_low_to_high.find(n=>n.midi===m)?.display_pitch;
        if(input){
          const name=`${names[m%12]}${Math.floor(m/12)-1}`, chosen=input.selected.includes(m%12);
          const classes=cn('am-key',white?'am-white':'am-black',selected.includes(m)&&'am-is-selected',sounding.includes(m)&&'am-is-sounding',input.pressed.includes(m)&&'cp-pressed',chosen&&input.practice&&'cp-chosen');
          return <button key={m} type="button" disabled={!input.ready} data-midi={m} data-target={selected.includes(m)||undefined} data-feedback={chosen&&input.practice?input.feedback:undefined} className={classes} style={geometry}
            aria-label={`${name}${selected.includes(m)?', reference note':''}`} aria-pressed={input.practice?chosen:undefined}
            onPointerDown={e=>{if(e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);input.press(m,`pointer:${e.pointerId}`);}}
            onPointerUp={e=>input.release(`pointer:${e.pointerId}`)} onPointerCancel={e=>input.release(`pointer:${e.pointerId}`)} onLostPointerCapture={e=>input.release(`pointer:${e.pointerId}`)}
            onKeyDown={e=>{if(e.nativeEvent.isComposing||e.ctrlKey||e.altKey||e.metaKey||!['Enter',' '].includes(e.key))return;e.preventDefault();if(!e.repeat){input.press(m,`key:${e.code}:${m}`);if(input.practice)input.toggle(m);}}}
            onKeyUp={e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();input.release(`key:${e.code}:${m}`);}}}
            onBlur={()=>{input.release(`key:Enter:${m}`);input.release(`key:Space:${m}`);}}
            onClick={e=>{if(input.practice)input.toggle(m);if(e.detail===0){input.press(m,`assistive:${m}`);input.release(`assistive:${m}`);}}}>
            <i className="am-marker" aria-hidden="true"/>{input.labels&&<span className="cp-key-name" aria-hidden="true">{white?name:<>{names[m%12]}<span className="cp-key-octave">{Math.floor(m/12)-1}</span></>}</span>}
            {chosen&&input.practice&&<span className="cp-choice-mark" aria-hidden="true">{input.feedback==='wrong'?'?':input.feedback==='correct'?'✓':'●'}</span>}
          </button>;
        }
        return <span key={m} aria-hidden="true" data-midi={m} className={cn('am-key',white?'am-white':'am-black',selected.includes(m)&&'am-is-selected',sounding.includes(m)&&'am-is-sounding')} style={geometry}><i className="am-marker" />{!white&&written&&<span className="am-black-label">{written}</span>}</span>;
      })}
    </div>
    {!input&&<div className="am-key-labels" aria-hidden="true">{whites.map((m,i)=><span key={m} data-midi={m} className={cn('am-key-label',selected.includes(m)&&'am-is-selected')} style={{left:`${i/whites.length*100}%`,width:`${100/whites.length}%`}}>{voicing.notes_low_to_high.find(n=>n.midi===m)?.display_pitch||`${letters[whitePitchClasses.indexOf(m%12)]}${Math.floor(m/12)-1}`}</span>)}</div>}
  </div>;
}
