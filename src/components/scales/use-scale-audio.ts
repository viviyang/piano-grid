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
    playRawEvents: (events: Array<{ midi: number; frequency_hz: number; onset_ms: number; duration_ms: number }>) => {
      void audio.current?.play({ playback: { together: events, ascending: events } }, 'ascending');
    },
    playEvents: (items: Array<{ pitch: ScalePitch; onsetMs: number; durationMs: number }>) => {
      const events = items.map(({ pitch: item, onsetMs, durationMs }) => ({
        midi: item.midi,
        frequency_hz: 440 * 2 ** ((item.midi - 69) / 12),
        onset_ms: onsetMs,
        duration_ms: durationMs,
      }));
      void audio.current?.play({ playback: { together: events, ascending: events } }, 'ascending');
    },
    play: (pitches: ScalePitch[], tempo: number, notesPerBeat: 1 | 2 = 1) => {
      const noteMs = 60_000 / tempo / notesPerBeat;
      const events = pitches.map((item, index) => ({
        midi: item.midi,
        frequency_hz: 440 * 2 ** ((item.midi - 69) / 12),
        onset_ms: index * noteMs,
        duration_ms: Math.max(70, noteMs * 0.8),
      }));
      void audio.current?.play({ playback: { together: events, ascending: events } }, 'ascending');
    },
  };
}
