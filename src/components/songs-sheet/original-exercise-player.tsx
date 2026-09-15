'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import { prepareExerciseEvents, type ExerciseEventFile } from '@/lib/original-exercise-playback';

export function OriginalExercisePlayer({ sourceURL, label }: { sourceURL: string; label: string }) {
  const audio = useRef<ReferenceAudio | null>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AudioStatus>('idle');
  const [message, setMessage] = useState('');
  const [segment, setSegment] = useState<'all' | 'bars-1-2' | 'bars-3-4'>('all');
  const [speed, setSpeed] = useState<50 | 75 | 100>(75);
  const [volume, setVolume] = useState(70);
  const [source, setSource] = useState<ExerciseEventFile | null>(null);
  const events = useMemo(() => source ? prepareExerciseEvents(source, segment, speed) : [], [segment, source, speed]);
  useEffect(() => {
    const player = new ReferenceAudio((next, text) => { setState(next); setMessage(next === 'playing' ? 'Playing demonstration…' : text); }, () => {}, { loading: 'Preparing sound…', audio_error: 'The sound could not start. Try again, or use the written score.', audio_unavailable: 'Audio is unavailable in this browser.' });
    player.setVolume(volume / 100);
    audio.current = player;
    const stop = () => player.cancel();
    const hide = () => { if (document.hidden) stop(); };
    window.addEventListener('beforeprint', stop);
    document.addEventListener('visibilitychange', hide);
    return () => { player.dispose(); window.removeEventListener('beforeprint', stop); document.removeEventListener('visibilitychange', hide); };
  }, []);
  useEffect(() => {
    let active = true;
    setReady(false);
    fetch(sourceURL, { credentials: 'same-origin' })
      .then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
      .then((value: ExerciseEventFile) => { prepareExerciseEvents(value, 'all', 100); if (active) { setSource(value); setReady(true); setMessage('Sound demonstration ready.'); } })
      .catch(() => { if (active) { setSource(null); setMessage('The event source could not be loaded. The written reference remains available.'); } });
    return () => { active = false; audio.current?.cancel(); };
  }, [sourceURL]);
  useEffect(() => { audio.current?.setVolume(volume / 100); }, [volume]);
  function changeSegment(next: typeof segment) { audio.current?.cancel(); setSegment(next); }
  function changeSpeed(next: typeof speed) { audio.current?.cancel(); setSpeed(next); }
  function play() { if (events.length) void audio.current?.play({ playback: { ascending: events, together: events } }, 'ascending'); }
  return <section className="ss-player" aria-label={`${label} sound demonstration`}>
    <p>This is a synthesized sound demonstration. It does not listen to or assess your playing.</p>
    <div className="ss-player-controls"><label>Section<select value={segment} onChange={(event) => changeSegment(event.target.value as typeof segment)} disabled={!ready || state === 'loading'}>{(source?.segments ?? []).map((item) => <option value={item.id} key={item.id}>{item.id === 'all' ? 'All bars' : item.id.replaceAll('-', ' ')}</option>)}</select></label><label>Speed<select value={speed} onChange={(event) => changeSpeed(Number(event.target.value) as typeof speed)} disabled={!ready || state === 'loading'}>{[50,75,100].map((value) => <option value={value} key={value}>{value}%</option>)}</select></label><label>Volume<input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))}/></label><button className="am-button am-primary" type="button" onClick={play} disabled={!ready || state === 'loading' || state === 'playing'}>Play demonstration</button><button className="am-button am-secondary" type="button" onClick={() => audio.current?.cancel('Playback stopped.')} disabled={!ready || state !== 'playing'}>Stop</button></div>
    <p role="status">{message}</p>
  </section>;
}
