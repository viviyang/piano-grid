export const FEEDBACK_TYPES = [
  'bug',
  'content_error',
  'hard_to_understand',
  'feature_request',
  'other',
] as const;

export const PAGE_REASONS = [
  'content_error',
  'hard_to_understand',
  'missing_information',
  'bug',
  'other',
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];
export type PageReason = (typeof PAGE_REASONS)[number];
export type FeedbackSource = 'global_feedback' | 'page_feedback';

export type FeedbackInput = {
  source: FeedbackSource;
  pagePath: string;
  feedbackType: FeedbackType;
  reason?: PageReason;
  message: string;
  email?: string;
  website?: string; // Honeypot: genuine visitors never fill this field.
};

export type FeedbackResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'unavailable' | 'rate_limited' | 'delivery_failed' };
