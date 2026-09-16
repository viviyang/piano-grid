'use client';

import { getAnalyticsConfiguration, sendAnalyticsEvent, type AnalyticsEventValue } from '@/lib/analytics';

export type ChordEventName =
  | 'chord_lookup'
  | 'chord_result_selected'
  | 'finder_no_match'
  | 'finder_result_selected'
  | 'chord_audio_start'
  | 'chord_audio_error'
  | 'practice_started'
  | 'practice_answer'
  | 'practice_completed'
  | 'print_opened'
  | 'reference_download_clicked'
  | 'task_feedback';

export function emitChordEvent(name: ChordEventName, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return;
  const externallySent = sendAnalyticsEvent(name, properties);
  window.dispatchEvent(new CustomEvent('pianogrid:chord-event', { detail: { name, properties, timestamp: Date.now(), externallySent } }));
}

export function getChordMeasurementConfiguration() {
  return getAnalyticsConfiguration();
}
