'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { submitFeedback } from '@/lib/feedback/client';
import { PAGE_REASONS, type PageReason } from '@/lib/feedback/types';
import { useFeedbackAvailability } from './feedback-availability';
import './feedback.css';

const REASONS: Record<PageReason, string> = {
  content_error: 'Something looks incorrect',
  hard_to_understand: 'It was hard to understand',
  missing_information: "I couldn't find what I needed",
  bug: "Something didn't work",
  other: 'Something else',
};

export function PageFeedback({ pagePath }: { pagePath: string }) {
  const { pageEnabled, productName } = useFeedbackAvailability();
  const [choice, setChoice] = useState<'none' | 'yes' | 'no' | 'sent'>('none');
  const [reason, setReason] = useState<PageReason | ''>('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reason || sending) return;
    setSending(true);
    setError(false);
    try {
      const response = await submitFeedback({
        source: 'page_feedback',
        pagePath,
        feedbackType: reason === 'missing_information' ? 'other' : reason,
        reason,
        message,
        website,
      });
      if (response.ok) {
        setChoice('sent');
        sendAnalyticsEvent('page_feedback_negative', { page_path: pagePath, feedback_type: reason });
      } else {
        setError(true);
        sendAnalyticsEvent('feedback_failed', { source: 'page_feedback', reason: response.reason });
      }
    } catch {
      setError(true);
      sendAnalyticsEvent('feedback_failed', { source: 'page_feedback', reason: 'network' });
    } finally {
      setSending(false);
    }
  }

  if (!pageEnabled) return null;
  return <section className="fb-page-wrap am-screen" aria-labelledby="fb-page-heading"><div className="pr-container fb-page">
    <h2 id="fb-page-heading">Was this page helpful?</h2>
    {choice === 'none' && <div className="fb-page-actions"><Button variant="secondary" onClick={() => { setChoice('yes'); sendAnalyticsEvent('page_feedback_positive', { page_path: pagePath }); }}>Yes</Button><Button variant="secondary" onClick={() => setChoice('no')}>Not really</Button></div>}
    {choice === 'yes' && <p role="status">Thanks for answering.</p>}
    {choice === 'sent' && <p role="status">Thanks — this helps us improve {productName}.</p>}
    {choice === 'no' && <form className="fb-form fb-page-form" onSubmit={send}>
      <fieldset className="fb-options"><legend>What could be better?</legend>{PAGE_REASONS.map((item) => <label className="fb-option" key={item}><input type="radio" name="page-feedback-reason" value={item} checked={reason === item} required onChange={() => setReason(item)}/><span>{REASONS[item]}</span></label>)}</fieldset>
      <label className="fb-field">Tell us more <span>{reason === 'content_error' || reason === 'bug' ? '(please describe the problem)' : '(optional)'}</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} minLength={reason === 'content_error' || reason === 'bug' ? 4 : undefined} maxLength={4000} rows={3} required={reason === 'content_error' || reason === 'bug'}/></label>
      <label className="fb-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)}/></label>
      <p className="fb-privacy">Your feedback is stored with a private service and reviewed by {productName}. Please do not include sensitive information.</p>
      {error && <p className="fb-error" role="alert">We couldn’t send your feedback. Please try again.</p>}
      <div className="fb-actions"><Button variant="secondary" onClick={() => setChoice('none')} disabled={sending}>Cancel</Button><Button type="submit" disabled={!reason || sending}>{sending ? 'Sending…' : 'Send'}</Button></div>
    </form>}
  </div></section>;
}
