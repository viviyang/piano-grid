'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clarityEnabled } from '@/lib/analytics';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export function MicrosoftClarityClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (!clarityEnabled() || typeof window.clarity !== 'function') return;
    window.clarity('set', 'page', pathname);
  }, [pathname]);

  return null;
}
