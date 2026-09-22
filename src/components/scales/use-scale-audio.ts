'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import type { ScalePitch } from '@/lib/scale-types';

export type ScaleSessionKind = 'demo' | 'practice';
export type ScaleCancelReason = 'stopped' | 'settings' | 'printing' | 'hidden' | 'pagehide' | 'unload' | 'superseded' | 'unmount' | 'audio_error';
export type ScaleSessionToken = { id: number; kind: ScaleSessionKind };
export type ScaleAudioStart = { ok: boolean; startedAtMs: number; reason?: 'cancelled' | 'unavailable' | 'error' };

const cancelCopy: Record<ScaleCancelReason, string> = {
  stopped: 'Playback stopped.',
  settings: 'Settings changed. The previous practice has stopped. Start again with the new settings.',
  printing: 'Practice stopped for printing. Start again when you are ready.',
  hidden: 'Practice stopped because the page was hidden. Start again when ready.',
  pagehide: '',
  unload: '',
  superseded: '',
  unmount: '',
  audio_error: '',
};

export function useScaleAudio() {
  const audio = useRef<ReferenceAudio | null>(null);
  const sessionID = useRef(0);
  const cancellationListeners = useRef(new Set<(reason: ScaleCancelReason) => void>());
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AudioStatus>('idle');
  const [message, setMessage] = useState('');
  const [sounding, setSounding] = useState<number[]>([]);

  const cancel = useCallback((reason: ScaleCancelReason = 'stopped') => {
    sessionID.current += 1;
    for (const listener of cancellationListeners.current) listener(reason);
    audio.current?.cancel(cancelCopy[reason], reason === 'stopped' ? 'stopped' : 'idle', Boolean(cancelCopy[reason]));
  }, []);

  const beginSession = useCallback((kind: ScaleSessionKind): ScaleSessionToken => {
    cancel('superseded');
    return { id: sessionID.current, kind };
  }, [cancel]);

  const isCurrent = useCallback((token: ScaleSessionToken) => token.id === sessionID.current, []);

  const registerCancellation = useCallback((listener: (reason: ScaleCancelReason) => void) => {
    cancellationListeners.current.add(listener);
    return () => { cancellationListeners.current.delete(listener); };
  }, []);

  useEffect(() => {
    const controller = new ReferenceAudio(
      (next, detail) => {
        setState(next);
        setMessage(next === 'playing' ? 'Playing scale…' : detail);
        if (next === 'error') {
          // Startup and completion are separate now: a later output failure
          // must still invalidate the visual practice's scheduled callbacks.
          sessionID.current += 1;
          for (const listener of cancellationListeners.current) listener('audio_error');
        }
      },
      setSounding,
      {
        loading: 'Preparing sound…',
        audio_error: 'Sound could not start. Try again, or continue with a silent visual guide.',
        audio_unavailable: 'Sound is unavailable in this browser. You can continue with a silent visual guide.',
      },
    );
    audio.current = controller;
    setReady(true);
    if (!controller.available) {
      setState('unavailable');
      setMessage('Sound is unavailable in this browser. You can continue with a silent visual guide.');
    }
    const beforePrint = () => cancel('printing');
    const hide = () => document.hidden && cancel('hidden');
    const pageHide = () => cancel('pagehide');
    const unload = () => cancel('unload');
    window.addEventListener('beforeprint', beforePrint);
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', pageHide);
    window.addEventListener('beforeunload', unload);
    return () => {
      for (const listener of cancellationListeners.current) listener('unmount');
      cancellationListeners.current.clear();
      controller.dispose();
      audio.current = null;
      window.removeEventListener('beforeprint', beforePrint);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', pageHide);
      window.removeEventListener('beforeunload', unload);
    };
  }, [cancel]);

  const playRawEvents = useCallback(async (
    events: Array<{ midi: number; frequency_hz: number; onset_ms: number; duration_ms: number }>,
    token: ScaleSessionToken,
  ): Promise<ScaleAudioStart> => {
    if (!audio.current?.available) return { ok: false, startedAtMs: 0, reason: 'unavailable' };
    if (!isCurrent(token)) return { ok: false, startedAtMs: 0, reason: 'cancelled' };
    return new Promise<ScaleAudioStart>((resolve) => {
      void audio.current!.play({ playback: { together: events, ascending: events } }, 'ascending', (startedAtMs) => {
        resolve(isCurrent(token)
          ? { ok: true, startedAtMs }
          : { ok: false, startedAtMs: 0, reason: 'cancelled' });
      }).then((result) => {
        // A failure/cancellation before startup must also settle the waiter.
        // After startup this is a harmless second resolve, not another start.
        resolve({ ok: false, startedAtMs: 0, reason: !isCurrent(token) || result === 'cancelled'
          ? 'cancelled' : result === 'unavailable' ? 'unavailable' : 'error' });
      });
    });
  }, [isCurrent]);

  const play = useCallback(async (pitches: ScalePitch[], tempo: number, notesPerBeat: 1 | 2 = 1) => {
    const token = beginSession('demo');
    const noteMs = 60_000 / tempo / notesPerBeat;
    const events = pitches.map((item, index) => ({
      midi: item.midi,
      frequency_hz: 440 * 2 ** ((item.midi - 69) / 12),
      onset_ms: index * noteMs,
      duration_ms: Math.max(70, noteMs * 0.8),
    }));
    return playRawEvents(events, token);
  }, [beginSession, playRawEvents]);

  return {
    ready,
    state,
    message,
    sounding,
    cancel,
    beginSession,
    isCurrent,
    registerCancellation,
    playRawEvents,
    play,
  };
}
