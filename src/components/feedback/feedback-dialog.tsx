'use client';

import { useId, useRef, useState, type FormEvent, type RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { submitFeedback } from '@/lib/feedback/client';
import { FEEDBACK_TYPES, type FeedbackType } from '@/lib/feedback/types';
import { useFeedbackAvailability } from './feedback-availability';
import './feedback.css';

const LABELS: Record<FeedbackType, string> = {
  bug: "Something isn't working",
  content_error: 'Something looks incorrect',
  hard_to_understand: 'Something is hard to understand',
  feature_request: 'I have an idea',
  other: 'Something else',
};

export function FeedbackDialog({
  open,
  onClose,
  pagePath,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  pagePath: string;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const { productName } = useFeedbackAvailability();
  const id = useId();
  const firstChoice = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<FeedbackType | ''>('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const busy = useRef(false);

  function closeDialog() {
    if (result === 'success') {
      setType('');
      setMessage('');
      setEmail('');
      setWebsite('');
      setResult('idle');
    }
    onClose();
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!type || busy.current) return;
    busy.current = true;
    setSending(true);
    setResult('idle');
    try {
      const response = await submitFeedback({
        source: 'global_feedback',
        pagePath,
        feedbackType: type,
        message,
        email,
        website,
      });
      if (response.ok) {
        setResult('success');
        sendAnalyticsEvent('feedback_submitted', { source: 'global_feedback', feedback_type: type });
      } else {
        setResult('error');
        sendAnalyticsEvent('feedback_failed', { source: 'global_feedback', reason: response.reason });
      }
    } catch {
      setResult('error');
      sendAnalyticsEvent('feedback_failed', { source: 'global_feedback', reason: 'network' });
    } finally {
      busy.current = false;
      setSending(false);
    }
  }

  return <Dialog open={open} onClose={closeDialog} labelledBy={`${id}-title`} returnFocusRef={returnFocusRef} initialFocusRef={firstChoice} className="fb-dialog">
    <div className="fb-dialog-head"><h2 id={`${id}-title`}>Help us improve {productName}</h2><DialogClose disabled={sending}/></div>
    {result === 'success' ? <div className="fb-success" role="status"><p>Thanks — this helps us improve {productName}.</p><Button onClick={closeDialog}>Close</Button></div> :
    <form className="fb-form" onSubmit={send}>
      <fieldset className="fb-options"><legend>What would you like to tell us?</legend>
        {FEEDBACK_TYPES.map((choice, index) => <label className="fb-option" key={choice}><input ref={index === 0 ? firstChoice : undefined} type="radio" name={`${id}-type`} value={choice} checked={type === choice} required onChange={() => { setType(choice); sendAnalyticsEvent('feedback_type_selected', { feedback_type: choice, source: 'global_feedback' }); }}/><span>{LABELS[choice]}</span></label>)}
      </fieldset>
      <label className="fb-field" htmlFor={`${id}-message`}>Tell us more<textarea id={`${id}-message`} value={message} onChange={(event) => setMessage(event.target.value)} minLength={4} maxLength={4000} rows={4} required/></label>
      <label className="fb-field" htmlFor={`${id}-email`}>Email <span>(optional, only if we need to follow up)</span><input id={`${id}-email`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254}/></label>
      <label className="fb-honeypot" aria-hidden="true" htmlFor={`${id}-website`}>Website<input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)}/></label>
      <p className="fb-privacy">Your feedback is stored with a private service and reviewed by {productName}. Please do not include passwords or sensitive information.</p>
      {result === 'error' && <p className="fb-error" role="alert">We couldn’t send your feedback. Please try again.</p>}
      <div className="fb-actions"><Button variant="secondary" onClick={closeDialog} disabled={sending}>Cancel</Button><Button type="submit" disabled={sending || !type}>{sending ? 'Sending…' : 'Send feedback'}</Button></div>
    </form>}
  </Dialog>;
}
