'use client';

import { getAnalyticsConfiguration, sendAnalyticsEvent, type AnalyticsEventValue } from '@/lib/analytics';

export type HearEventName =
  | 'one_note_view'
  | 'one_note_compare_start'
  | 'one_note_compare_complete'
  | 'one_note_replay'
  | 'one_note_single_replay'
  | 'one_note_guess'
  | 'one_note_hint'
  | 'one_note_reveal'
  | 'one_note_try_pair'
  | 'one_note_share_open'
  | 'one_note_share_native'
  | 'one_note_copy_link'
  | 'one_note_shared_landing'
  | 'one_note_audio_error'
  | 'one_note_open_reference';

const allowed = new Set([
  'pair', 'source', 'guess', 'correct', 'method', 'fromPair', 'toPair', 'side', 'target', 'phase', 'from',
]);

export function emitHearEvent(name: HearEventName, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe: Record<string, AnalyticsEventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowed.has(key)) safe[key] = value;
  const externallySent = sendAnalyticsEvent(name, safe);
  window.dispatchEvent(new CustomEvent('pianogrid:one-note-event', {
    detail: { name, properties: safe, timestamp: Date.now(), externallySent },
  }));
}

export function getHearMeasurementConfiguration() {
  const config = getAnalyticsConfiguration();
  return {
    provider: config.provider,
    externalTransportEnabled: config.externalTransportEnabled,
    status: config.status,
  } as const;
}
