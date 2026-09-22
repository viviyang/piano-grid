import { isPageFeedbackPilot, resolveFeedbackContext } from './context.ts';
import { FEEDBACK_TYPES, PAGE_REASONS, type FeedbackInput, type FeedbackType, type PageReason } from './types.ts';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFeedbackInput(value: unknown): FeedbackInput | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (data.source !== 'global_feedback' && data.source !== 'page_feedback') return null;
  if (typeof data.pagePath !== 'string' || !resolveFeedbackContext(data.pagePath)) return null;
  if (!FEEDBACK_TYPES.includes(data.feedbackType as FeedbackType)) return null;
  if (typeof data.message !== 'string') return null;
  const message = data.message.trim();
  if (message.length > 4000) return null;
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (email.length > 254 || (email && !EMAIL_PATTERN.test(email))) return null;
  if (data.website !== undefined && typeof data.website !== 'string') return null;
  if (typeof data.website === 'string' && data.website.length > 200) return null;
  let reason: PageReason | undefined;
  if (data.source === 'page_feedback') {
    if (!isPageFeedbackPilot(data.pagePath)) return null;
    if (!PAGE_REASONS.includes(data.reason as PageReason)) return null;
    reason = data.reason as PageReason;
    if (data.feedbackType !== (reason === 'missing_information' ? 'other' : reason)) return null;
    if ((reason === 'content_error' || reason === 'bug') && message.length < 4) return null;
  } else if (message.length < 4) {
    return null;
  }
  if (!message && !reason) return null;
  return {
    source: data.source,
    pagePath: data.pagePath,
    feedbackType: data.feedbackType as FeedbackType,
    reason,
    message,
    email: email || undefined,
    website: data.website as string | undefined,
  };
}
