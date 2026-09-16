'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsEnabled } from '@/lib/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackPageView(path: string) {
  if (!analyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function GoogleAnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!analyticsEnabled()) return;
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalyticsClient() {
  if (!analyticsEnabled()) return null;
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsPageViews />
    </Suspense>
  );
}
