'use client';

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

type EventValue = string | number | boolean | null;

const allowedProperties = new Set([
  'page_path', 'template', 'object_id', 'family', 'form', 'view_id', 'hand', 'direction', 'octaves', 'range',
  'tempo', 'tempo_bucket', 'notes_per_beat', 'task_id', 'type', 'status', 'result', 'assisted', 'attempt',
  'first_submit', 'stop_reason', 'reason', 'report', 'asset_id', 'paper_size', 'mode', 'selected_count',
  'match_count', 'target', 'release_version',
]);

const provider = process.env.NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER ?? 'none';
const releaseVersion = process.env.NEXT_PUBLIC_PIANOGRID_RELEASE_VERSION ?? 'local-candidate';
const consentStorageKey = 'pianogrid:optional-analytics-consent';

function safeProperties(properties: Record<string, EventValue>) {
  const safe: Record<string, EventValue> = {};
  for (const [key, value] of Object.entries(properties)) if (allowedProperties.has(key)) safe[key] = value;
  safe.page_path = window.location.pathname;
  safe.release_version = releaseVersion;
  return safe;
}

function sendApprovedAnalytics(name: ScaleEventName, properties: Record<string, EventValue>) {
  try {
    if (provider !== 'ga4' || window.localStorage.getItem(consentStorageKey) !== 'granted') return false;
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== 'function') return false;
    gtag('event', name, properties);
    return true;
  } catch {
    return false;
  }
}

export function emitScaleEvent(name: ScaleEventName, properties: Record<string, EventValue> = {}) {
  if (typeof window === 'undefined') return;
  const safe = safeProperties(properties);
  const externallySent = sendApprovedAnalytics(name, safe);
  window.dispatchEvent(new CustomEvent('pianogrid:scale-event', { detail: { name, properties: safe, timestamp: Date.now(), externallySent } }));
}

export function getScaleMeasurementConfiguration() {
  return { provider, releaseVersion, externalTransportEnabled: provider === 'ga4', consentStorageKey } as const;
}
