'use client';

import { useEffect, useRef, useState } from 'react';
import { ReferenceAudio, type AudioPlayResult, type AudioStatus } from '@/lib/a-minor-audio';
import type { HearPairData } from '@/lib/hear-the-difference-core';
import type { PlaybackMode } from '@/lib/a-minor-types';

type Phase = 'idle' | 'chord1' | 'gap' | 'chord2' | 'done';
export type ComparisonPlayResult = {
  status: 'completed' | 'cancelled' | 'error' | 'unavailable';
  failedSide?: 'chord1' | 'chord2' | 'side';
};

export function useComparisonAudio(copy: { loading: string; audio_error: string; audio_unavailable: string }) {
  const player = useRef<ReferenceAudio | null>(null);
  const generation = useRef(0);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AudioStatus>('idle');
  const [message, setMessage] = useState('');
  const [sounding, setSounding] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const instance = new ReferenceAudio((next, text) => {
      setState(next);
      setMessage(text);
    }, setSounding, copy);
    player.current = instance;
    setReady(true);
    if (!instance.available) {
      setState('unavailable');
      setMessage(copy.audio_unavailable);
    }
    const hide = () => {
      if (!document.hidden) return;
      generation.current += 1;
      instance.cancel('Playback stopped. Replay the comparison when you are ready.', 'stopped');
      setPhase(current => (current === 'done' ? 'done' : 'idle'));
    };
    const leave = () => {
      generation.current += 1;
      instance.cancel('', 'idle', false);
      setPhase(current => (current === 'done' ? 'done' : 'idle'));
    };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', leave);
    return () => {
      generation.current += 1;
      instance.dispose();
      player.current = null;
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', leave);
    };
  }, [copy]);

  function stop(announce = true) {
    generation.current += 1;
    player.current?.cancel(
      announce ? 'Playback stopped. Replay the comparison when you are ready.' : '',
      announce ? 'stopped' : 'idle',
      announce,
    );
    setPhase(current => (current === 'done' ? 'done' : 'idle'));
  }

  async function playOwned(voicing: HearPairData['minorPlayback'] | HearPairData['majorPlayback'], token: number): Promise<AudioPlayResult> {
    const result = await player.current?.play({ playback: voicing }, 'together' as PlaybackMode);
    if (token !== generation.current) return 'cancelled';
    return result ?? 'cancelled';
  }

  async function playSide(pair: HearPairData, side: 'minor' | 'major'): Promise<ComparisonPlayResult> {
    generation.current += 1;
    const token = generation.current;
    setPhase('idle');
    const result = await playOwned(side === 'minor' ? pair.minorPlayback : pair.majorPlayback, token);
    if (token !== generation.current) return { status: 'cancelled' };
    if (result === 'error' || result === 'unavailable') return { status: result, failedSide: 'side' };
    return { status: result };
  }

  async function playComparison(pair: HearPairData): Promise<ComparisonPlayResult> {
    generation.current += 1;
    const token = generation.current;
    setPhase('chord1');
    const first = await playOwned(pair.minorPlayback, token);
    if (token !== generation.current) return { status: 'cancelled' };
    if (first === 'error' || first === 'unavailable') {
      setPhase('idle');
      return { status: first, failedSide: 'chord1' };
    }
    if (first !== 'completed') {
      setPhase(current => (current === 'done' ? 'done' : 'idle'));
      return { status: first };
    }

    setPhase('gap');
    await new Promise<void>(resolve => {
      const timer = window.setTimeout(resolve, 280);
      const watch = window.setInterval(() => {
        if (token !== generation.current) {
          window.clearTimeout(timer);
          window.clearInterval(watch);
          resolve();
        }
      }, 40);
      window.setTimeout(() => window.clearInterval(watch), 400);
    });
    if (token !== generation.current || document.hidden) {
      setPhase(current => (current === 'done' ? 'done' : 'idle'));
      return { status: 'cancelled' };
    }

    setPhase('chord2');
    const second = await playOwned(pair.majorPlayback, token);
    if (token !== generation.current) return { status: 'cancelled' };
    if (second === 'error' || second === 'unavailable') {
      setPhase('idle');
      return { status: second, failedSide: 'chord2' };
    }
    if (second !== 'completed') {
      setPhase(current => (current === 'done' ? 'done' : 'idle'));
      return { status: second };
    }
    setPhase('done');
    return { status: 'completed' };
  }

  return {
    ready,
    state,
    message,
    sounding,
    phase,
    resetPhase: () => setPhase('idle'),
    stop,
    playSide,
    playComparison,
  };
}
