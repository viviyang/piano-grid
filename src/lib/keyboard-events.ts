'use client';

export type KeyboardPracticeEventName =
  | 'keyboard_practice_started'
  | 'keyboard_practice_answered'
  | 'keyboard_practice_hint_used'
  | 'keyboard_practice_answer_revealed'
  | 'keyboard_practice_completed'
  | 'keyboard_practice_review_started'
  | 'keyboard_practice_share_copy'
  | 'keyboard_practice_share_native';

type EventValue = string | number | boolean | null;

const allowedProperties = new Set(['mode', 'option', 'question', 'count', 'outcome', 'first', 'assisted', 'revealed', 'status']);

export function emitKeyboardPracticeEvent(name: KeyboardPracticeEventName, properties: Record<string, EventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe: Record<string, EventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowedProperties.has(key)) safe[key] = value;
  safe.mode = safe.mode ?? 'find-note';
  window.dispatchEvent(new CustomEvent('pianogrid:keyboard-practice-event', { detail: { name, properties: safe, timestamp: Date.now(), externallySent: false } }));
}

export function getKeyboardPracticeMeasurementConfiguration() {
  return { provider: 'none', externalTransportEnabled: false, status: 'ANALYTICS_NOT_CONFIGURED' } as const;
}
