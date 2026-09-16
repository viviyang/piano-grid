'use client';

import { useEffect, useRef, useState } from 'react';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import type { HearPairData } from '@/lib/hear-the-difference-core';
import type { PlaybackMode } from '@/lib/a-minor-types';

type Phase = 'idle' | 'chord1' | 'gap' | 'chord2' | 'done';

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
      instance.cancel('Playback stopped.', 'stopped');
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
    player.current?.cancel(announce ? 'Playback stopped.' : '', announce ? 'stopped' : 'idle', announce);
    setPhase(current => (current === 'done' ? 'done' : 'idle'));
  }

  async function playSide(pair: HearPairData, side: 'minor' | 'major') {
    generation.current += 1;
    const token = generation.current;
    setPhase('idle');
    await player.current?.play({ playback: side === 'minor' ? pair.minorPlayback : pair.majorPlayback }, 'together');
    return token === generation.current;
  }

  async function playComparison(pair: HearPairData) {
    generation.current += 1;
    const token = generation.current;
    const forceError = typeof window !== 'undefined' && Boolean((window as Window & { __hearForceAudioError?: boolean }).__hearForceAudioError);
    if (forceError) {
      setState('error');
      setMessage(copy.audio_error);
      setPhase('idle');
      return false;
    }
    setPhase('chord1');
    await player.current?.play({ playback: pair.minorPlayback }, 'together' as PlaybackMode);
    if (token !== generation.current) return false;
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
      return false;
    }
    setPhase('chord2');
    await player.current?.play({ playback: pair.majorPlayback }, 'together');
    if (token !== generation.current) return false;
    if (player.current && (player.current as unknown as { state?: string }).state === 'error') {
      setPhase('idle');
      return false;
    }
    setPhase('done');
    return true;
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
