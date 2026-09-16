'use client';

import { useEffect, useState } from 'react';
import {
  writeAnalyticsConsent,
  readAnalyticsConsent,
  type AnalyticsConsent,
} from '@/lib/analytics';

export function AnalyticsConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readAnalyticsConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: AnalyticsConsent) => {
    writeAnalyticsConsent(value);
    setVisible(false);
  };

  return (
    <div className="pg-analytics-consent" role="dialog" aria-label="Optional analytics">
      <p>
        PianoGrid can use optional Google Analytics to understand which pages and tools are used. It does not listen to your playing, and free tools work either way.
      </p>
      <div className="pg-analytics-consent-actions">
        <button type="button" className="am-button am-tertiary" onClick={() => choose('denied')}>
          No thanks
        </button>
        <button type="button" className="am-button am-primary" onClick={() => choose('granted')}>
          Allow analytics
        </button>
      </div>
    </div>
  );
}
