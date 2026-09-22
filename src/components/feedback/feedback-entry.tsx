'use client';

import { useRef, useState } from 'react';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { FeedbackDialog } from './feedback-dialog';
import { useFeedbackAvailability } from './feedback-availability';

export function FeedbackEntry({ pagePath, className }: { pagePath: string; className?: string }) {
  const { enabled } = useFeedbackAvailability();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  if (!enabled) return null;
  return <>
    <button ref={trigger} type="button" className={className ?? 'fb-footer-link'} onClick={() => { setOpen(true); sendAnalyticsEvent('feedback_opened', { source: 'global_feedback' }); }}>Feedback</button>
    <FeedbackDialog open={open} onClose={() => setOpen(false)} pagePath={pagePath} returnFocusRef={trigger}/>
  </>;
}
