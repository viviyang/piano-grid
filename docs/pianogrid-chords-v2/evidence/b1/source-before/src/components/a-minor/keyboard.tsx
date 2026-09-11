import { cn } from '@/lib/utils';
import type { Voicing } from '@/lib/a-minor-types';
import { keyGeometry } from '@/lib/keyboard-geometry';

export function Keyboard({ voicing, whitePitchClasses, sounding = [], print = false }: { voicing: Voicing; whitePitchClasses: number[]; sounding?: number[]; print?: boolean }) {
  const [lo,hi] = voicing.diagram.keyboard_range_midi;
  const pitches = Array.from({length:hi-lo+1},(_,i)=>lo+i);
  const whites = pitches.filter(m=>whitePitchClasses.includes(m%12));
  const letters = ['C','D','E','F','G','A','B'];
  const selected = print ? voicing.print_data.highlight_midi : voicing.diagram.highlight_midi;
  return <div className="am-keyboard">
    <div className="am-key-bed" role="img" aria-label={voicing.diagram.alt_text}>
      {pitches.map(m=>{
        const white = whites.includes(m), index = whites.filter(w=>w<m).length;
        // Final reference black-key width=60% of a white key, centred on boundary.
        const geometry = keyGeometry(index, white, whites.length);
        const written=voicing.notes_low_to_high.find(n=>n.midi===m)?.display_pitch;
        return <span key={m} aria-hidden="true" data-midi={m} className={cn('am-key',white?'am-white':'am-black',selected.includes(m)&&'am-is-selected',sounding.includes(m)&&'am-is-sounding')} style={geometry}><i className="am-marker" />{!white&&written&&<span className="am-black-label">{written}</span>}</span>;
      })}
    </div>
    <div className="am-key-labels" aria-hidden="true">{whites.map((m,i)=><span key={m} data-midi={m} className={cn('am-key-label',selected.includes(m)&&'am-is-selected')} style={{left:`${i/whites.length*100}%`,width:`${100/whites.length}%`}}>{voicing.notes_low_to_high.find(n=>n.midi===m)?.display_pitch||`${letters[whitePitchClasses.indexOf(m%12)]}${Math.floor(m/12)-1}`}</span>)}</div>
  </div>;
}
