'use client';

import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_RELEASE_VERSION,
  ANALYTICS_PROVIDER,
  getAnalyticsConfiguration,
  sendAnalyticsEvent,
  type AnalyticsEventValue,
} from '@/lib/analytics';

export type ScaleEventName =
  | 'scale_reference_viewed'
  | 'scale_reference_changed'
  | 'scale_playback_started'
  | 'scale_playback_stopped'
  | 'scale_playback_error'
  | 'scale_practice_started'
  | 'scale_practice_stopped'
  | 'scale_question_revealed'
  | 'scale_question_submitted'
  | 'scale_question_reset'
  | 'scale_practice_self_reported'
  | 'scale_finder_result'
  | 'scale_resource_requested'
  | 'scale_print_requested'
  | 'scale_related_reference_opened'
  | 'scale_next_task_opened';

const allowedProperties = new Set([
  'page_path', 'template', 'object_id', 'family', 'form', 'view_id', 'hand', 'direction', 'octaves', 'range',
  'tempo', 'tempo_bucket', 'notes_per_beat', 'task_id', 'type', 'status', 'result', 'assisted', 'attempt',
  'first_submit', 'stop_reason', 'reason', 'report', 'asset_id', 'paper_size', 'mode', 'selected_count',
  'match_count', 'target', 'release_version',
]);

function safeProperties(properties: Record<string, AnalyticsEventValue>) {
  const safe: Record<string, AnalyticsEventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowedProperties.has(key)) safe[key] = value;
  safe.page_path = window.location.pathname;
  safe.release_version = ANALYTICS_RELEASE_VERSION;
  return safe;
}

export function emitScaleEvent(name: ScaleEventName, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe = safeProperties(properties);
  const externallySent = sendAnalyticsEvent(name, safe);
  window.dispatchEvent(new CustomEvent('pianogrid:scale-event', { detail: { name, properties: safe, timestamp: Date.now(), externallySent } }));
}

export function getScaleMeasurementConfiguration() {
  const config = getAnalyticsConfiguration();
  return {
    provider: ANALYTICS_PROVIDER,
    releaseVersion: ANALYTICS_RELEASE_VERSION,
    externalTransportEnabled: config.externalTransportEnabled,
    consentStorageKey: ANALYTICS_CONSENT_KEY,
  } as const;
}
