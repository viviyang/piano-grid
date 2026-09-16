export type AnalyticsConsent = 'granted' | 'denied';
export type AnalyticsEventValue = string | number | boolean | null;

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim();
export const ANALYTICS_PROVIDER =
  process.env.NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER ??
  (GA_MEASUREMENT_ID ? 'ga4' : 'none');
export const ANALYTICS_RELEASE_VERSION = process.env.NEXT_PUBLIC_PIANOGRID_RELEASE_VERSION ?? 'local-candidate';
export const ANALYTICS_CONSENT_KEY = 'pianogrid:optional-analytics-consent';

export function analyticsEnabled() {
  return ANALYTICS_PROVIDER === 'ga4' && Boolean(GA_MEASUREMENT_ID);
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (value === 'granted' || value === 'denied') return value;
  } catch {
    /* ignore storage failures */
  }
  return null;
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent() === 'granted';
}

export function writeAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    /* ignore storage failures */
  }
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: value === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }
  window.dispatchEvent(new CustomEvent('pianogrid:analytics-consent', { detail: { value } }));
}

export function sendAnalyticsEvent(name: string, properties: Record<string, AnalyticsEventValue> = {}) {
  if (typeof window === 'undefined') return false;
  if (!analyticsEnabled() || !hasAnalyticsConsent()) return false;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return false;
  try {
    gtag('event', name, {
      ...properties,
      page_path: typeof properties.page_path === 'string' ? properties.page_path : window.location.pathname,
      release_version: ANALYTICS_RELEASE_VERSION,
    });
    return true;
  } catch {
    return false;
  }
}

export function getAnalyticsConfiguration() {
  return {
    provider: ANALYTICS_PROVIDER,
    measurementId: GA_MEASUREMENT_ID || null,
    releaseVersion: ANALYTICS_RELEASE_VERSION,
    externalTransportEnabled: analyticsEnabled(),
    consentStorageKey: ANALYTICS_CONSENT_KEY,
    status: analyticsEnabled() ? ('CONFIGURED_CONSENT_GATED' as const) : ('ANALYTICS_NOT_CONFIGURED' as const),
  } as const;
}
