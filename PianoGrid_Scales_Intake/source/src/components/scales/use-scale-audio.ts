'use client';

import { useEffect, useRef, useState } from 'react';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import type { ScalePitch } from '@/lib/scale-types';

export function useScaleAudio() {
  const audio = useRef<ReferenceAudio | null>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AudioStatus>('idle');
  const [message, setMessage] = useState('');
  const [sounding, setSounding] = useState<number[]>([]);

  useEffect(() => {
    const controller = new ReferenceAudio(
      (next, detail) => {
        setState(next);
        setMessage(next === 'playing' ? 'Playing scale…' : detail);
      },
      setSounding,
      {
        loading: 'Preparing sound…',
        audio_error: 'Sound could not start. Try Play scale again.',
        audio_unavailable: 'Sound is unavailable in this browser.',
      },
    );
    audio.current = controller;
    setReady(true);
    if (!controller.available) {
      setState('unavailable');
      setMessage('Sound is unavailable in this browser.');
    }
    const cancel = () => controller.cancel();
    const hide = () => document.hidden && cancel();
    window.addEventListener('beforeprint', cancel);
    document.addEventListener('visibilitychange', hide);
    return () => {
      controller.dispose();
      window.removeEventListener('beforeprint', cancel);
      document.removeEventListener('visibilitychange', hide);
    };
  }, []);

  return {
    ready,
    state,
    message,
    sounding,
    cancel: () => audio.current?.cancel(),
    play: (pitches: ScalePitch[], tempo: number) => {
      const beat = 60_000 / tempo;
      const events = pitches.map((item, index) => ({
        midi: item.midi,
        frequency_hz: 440 * 2 ** ((item.midi - 69) / 12),
        onset_ms: index * beat,
        duration_ms: Math.max(180, beat * 0.82),
      }));
      void audio.current?.play({ playback: { together: events, ascending: events } }, 'ascending');
    },
  };
}
