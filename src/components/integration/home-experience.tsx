'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from '@/components/a-minor/icon';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import type { CenterItem, CenterModel } from '@/lib/chord-content';
import type { PlaybackMode } from '@/lib/a-minor-types';
import { SITE_NAME } from '@/lib/site-config';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteBrand } from '@/components/ui/site-brand';
import { RollingText } from '@/components/ui/rolling-text';
import { HomeArrow, keyPosition } from './home-visuals';

type HomeChord = Pick<CenterItem, 'id' | 'name' | 'url' | 'voicing'>;
type AudioCopy = Pick<CenterModel, 'microcopy'>['microcopy'];

function useHomeAudio(copy: AudioCopy) {
  const player = useRef<ReferenceAudio | null>(null);
  const [ready, setReady] = useState(false);
  const [audio, setAudio] = useState<{ state: AudioStatus; message: string; mode: PlaybackMode | null }>({ state: 'idle', message: '', mode: null });
  const [sounding, setSounding] = useState<number[]>([]);

  useEffect(() => {
    const instance = new ReferenceAudio((state, message, mode) => setAudio({ state, message, mode }), setSounding, copy);
    player.current = instance;
    setReady(true);
    if (!instance.available) instance.cancel();
    const hide = () => { if (document.hidden) instance.cancel('Playback stopped.', 'stopped'); };
    const leave = () => instance.cancel('', 'idle', false);
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', leave);
    return () => {
      instance.dispose();
      player.current = null;
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', leave);
    };
  }, [copy]);

  return {
    ready,
    audio,
    sounding,
    play: (voicing: HomeChord['voicing'], mode: PlaybackMode) => void player.current?.play(voicing, mode),
    playNote: (midi: number) => {
      const event={midi,frequency_hz:440*2**((midi-69)/12),onset_ms:0,duration_ms:1200};
      void player.current?.play({playback:{together:[event],ascending:[event]}},'together');
    },
    stop: (announce = true) => player.current?.cancel(announce ? 'Playback stopped.' : '', announce ? 'stopped' : 'idle', announce),
  };
}

export function HomeHeader(){
  return <header className="ph-site-header"><div className="ph-header-inner"><SiteBrand className="ph-brand" current/><SiteNavigation variant="home"/><a className="ph-header-cta" href="/tools"><RollingText>Explore tools</RollingText><HomeArrow/></a></div></header>;
}

const whiteKeys=[48,50,52,53,55,57,59,60,62,64,65,67,69,71];
const mobileWhites=[55,57,59,60,62,64,65,67];
const blackKeys=[{midi:49,edge:1},{midi:51,edge:2},{midi:54,edge:4},{midi:56,edge:5},{midi:58,edge:6},{midi:61,edge:8},{midi:63,edge:9},{midi:66,edge:11},{midi:68,edge:12},{midi:70,edge:13}];
const mobileBlacks=[{midi:56,edge:1},{midi:58,edge:2},{midi:61,edge:4},{midi:63,edge:5},{midi:66,edge:7}];
const names=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
const noteName=(midi:number)=>`${names[midi%12]}${Math.floor(midi/12)-1}`;

function PianoKeyboard({compact=false,active,onPlay}:{compact?:boolean;active:number[];onPlay:(midi:number)=>void}){
  const whites=compact?mobileWhites:whiteKeys,blacks=compact?mobileBlacks:blackKeys,keys=compact?8:14;
  function move(event:KeyboardEvent<HTMLButtonElement>,midi:number){if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const pitches=[...whites,...blacks.map(key=>key.midi)].sort((a,b)=>a-b),index=pitches.indexOf(midi),next=event.key==='Home'?0:event.key==='End'?pitches.length-1:Math.max(0,Math.min(pitches.length-1,index+(event.key==='ArrowRight'?1:-1)));event.currentTarget.closest('.ph-keyboard')?.querySelector<HTMLButtonElement>(`button[data-midi="${pitches[next]}"]`)?.focus();}
  return <div className="ph-keyboard" role="group" aria-label="Interactive piano keyboard. Use left and right arrow keys to move between notes, and Enter or Space to play.">{whites.map(midi=><button key={midi} type="button" data-midi={midi} tabIndex={midi===(compact?57:48)?0:-1} className={`ph-piano-key ph-white-key ${[57,60,64].includes(midi)?'ph-chord-key':''} ${active.includes(midi)?'ph-note-active':''}`} aria-label={`Play ${noteName(midi)}`} onClick={()=>onPlay(midi)} onKeyDown={event=>move(event,midi)}><span className="ph-key-dot" aria-hidden="true">{noteName(midi).replace(/\d+$/,'')}</span><span className="ph-key-name" aria-hidden="true">{noteName(midi)}</span></button>)}{blacks.map(({midi,edge})=><button key={midi} type="button" data-midi={midi} tabIndex={-1} className={`ph-piano-key ph-black-key ${active.includes(midi)?'ph-note-active':''}`} style={keyPosition(edge,keys)} aria-label={`Play ${noteName(midi)}`} onClick={()=>onPlay(midi)} onKeyDown={event=>move(event,midi)}><span className="ph-black-key-shine" aria-hidden="true"/></button>)}</div>;
}

export function HomePianoDemo({ chord, copy }: { chord: HomeChord; copy: AudioCopy }) {
  const sound = useHomeAudio(copy);
  const notes = chord.voicing.notes_low_to_high.map(note => note.display_pitch);
  const [paused,setPaused]=useState(true),[motionStep,setMotionStep]=useState(3);
  useEffect(()=>{if(paused)return;const id=window.setInterval(()=>setMotionStep(step=>(step+1)%4),820);return()=>window.clearInterval(id);},[paused]);
  const motionSequence:number[][]=[[57],[57,60],[57,60,64],[]];
  const motionNotes=paused?[57,60,64]:motionSequence[motionStep] ?? [];
  const active=[...new Set([...motionNotes,...sound.sounding])];
  return <section className="ph-piano-stage" aria-labelledby="home-piano-title" data-audio-state={sound.audio.state} data-motion={paused?'paused':'running'}>
    <h2 id="home-piano-title" className="pr-sr-only">Interactive A minor keyboard</h2>
    <div className="ph-stage-label"><span>One chord, three notes</span><span className="ph-stage-line"/><span>A minor</span></div>
    <div className="ph-chord-bubble" aria-label={`A minor chord: ${notes.join(', ')}`}><span className="ph-chord-bubble-name">A minor</span><span className="ph-chord-bubble-divider"/>{notes.map(note=><span className="ph-note-chip" key={note}>{note.replace(/\d+$/,'')}<small>{note.match(/\d+$/)?.[0]}</small></span>)}</div>
    <div className="ph-instrument"><div className="ph-piano-fallboard"><span>{SITE_NAME}</span><span>A LITTLE UNDERSTANDING. A LITTLE MORE MUSIC.</span></div><div className="ph-desktop-keyboard"><PianoKeyboard active={active} onPlay={sound.playNote}/></div><div className="ph-mobile-keyboard"><PianoKeyboard compact active={active} onPlay={sound.playNote}/></div><div className="ph-piano-front"/></div>
    <div className="ph-piano-controls"><p className="ph-sound-note"><Icon name="sequence"/><span>Try a key. Sound only on tap.</span></p><button className="ph-hear-chord" type="button" disabled={!sound.ready||sound.audio.state==='unavailable'} onClick={()=>sound.audio.state==='playing'?sound.stop():sound.play(chord.voicing,'together')}><Icon name={sound.audio.state==='playing'?'stop':'play'}/><span>{sound.audio.state==='playing'?'Stop sound':'Hear A minor'}</span></button><button className="ph-motion-button" type="button" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}><Icon name={paused?'play':'stop'}/><span>{paused?'Resume motion':'Pause motion'}</span></button></div>
    <p className="ph-synth-label">Synthesized tone preview · A3–C4–E4 · Not a fingering lesson</p><p className="pr-sr-only" role="status" aria-live="polite">{sound.audio.message}</p>
  </section>;
}

export function HomeChordDiscovery({ chords, copy }: { chords: [HomeChord, HomeChord]; copy: AudioCopy }) {
  const [selectedId, setSelectedId] = useState(chords[0].id);
  const sound = useHomeAudio(copy);
  const selected = chords.find(chord => chord.id === selectedId) ?? chords[0];
  const notes = selected.voicing.notes_low_to_high.map(note => note.display_pitch.replace(/\d+$/, ''));

  function select(id: string) {
    sound.stop(false);
    setSelectedId(id);
  }

  const minor=selected.name.includes('minor');
  return <div className="ph-chord-study" data-selected-chord={selected.id} data-audio-state={sound.audio.state}>
    <div className="ph-chord-switch" role="group" aria-label="Choose a chord">
      {chords.map(chord => <button key={chord.id} type="button" aria-pressed={selected.id === chord.id} onClick={() => select(chord.id)}>{chord.name}</button>)}
    </div>
    <div className="ph-study-notes" aria-label={`${selected.name}: ${notes.join(', ')}`}>
      {notes.map((note, index) => <div key={`${selected.id}-${note}`} className={index === 1 ? 'ph-changing-note' : undefined}><strong>{note}</strong><small>{index === 0 ? 'Root' : index === 1 ? (minor ? 'Minor third' : 'Major third') : 'Fifth'}</small></div>)}
    </div>
    <div className="ph-interval-lines"><span>{minor?'3 semitones':'4 semitones'}</span><span>{minor?'4 semitones':'3 semitones'}</span></div>
    <button className="ph-study-play" type="button" disabled={!sound.ready || sound.audio.state === 'unavailable'} onClick={() => sound.audio.state==='playing'?sound.stop():sound.play(selected.voicing, 'together')}>
      <Icon name="play" /><span>Hear {selected.name}</span>
    </button>
    <p className="ph-study-footnote" role="status" aria-live="polite">{sound.audio.message || 'Synthesized tone preview'}</p>
  </div>;
}
