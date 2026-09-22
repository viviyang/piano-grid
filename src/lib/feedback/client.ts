import type { FeedbackInput, FeedbackResult } from './types';

export async function submitFeedback(input: FeedbackInput): Promise<FeedbackResult> {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    credentials: 'omit',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const result = await response.json().catch(() => null) as FeedbackResult | null;
  if (result && typeof result === 'object' && typeof result.ok === 'boolean') return result;
  return { ok: false, reason: 'delivery_failed' };
}
