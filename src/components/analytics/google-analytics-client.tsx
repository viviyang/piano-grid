'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsEnabled, hasAnalyticsConsent, readAnalyticsConsent } from '@/lib/analytics';
import { AnalyticsConsentBanner } from './analytics-consent';
import './analytics.css';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackPageView(path: string) {
  if (!analyticsEnabled() || !hasAnalyticsConsent() || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function GoogleAnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const enabled = analyticsEnabled();

  useEffect(() => {
    setConsent(readAnalyticsConsent());
    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<{ value: 'granted' | 'denied' }>).detail?.value;
      if (value === 'granted' || value === 'denied') setConsent(value);
    };
    window.addEventListener('pianogrid:analytics-consent', onConsent);
    return () => window.removeEventListener('pianogrid:analytics-consent', onConsent);
  }, []);

  useEffect(() => {
    if (!enabled || consent !== 'granted') return;
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [enabled, consent, pathname, searchParams]);

  return null;
}

export function GoogleAnalyticsClient() {
  if (!analyticsEnabled()) return null;
  return (
    <>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageViews />
      </Suspense>
      <AnalyticsConsentBanner />
    </>
  );
}
