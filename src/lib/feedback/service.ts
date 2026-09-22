import 'server-only';

import { getFeedbackConfig } from './config';
import { resolveFeedbackContext } from './context';
import { createFeedbackIssue } from './github-adapter';
import { validateFeedbackInput } from './validation';
import type { FeedbackResult } from './types';

export async function deliverFeedback(value: unknown): Promise<FeedbackResult> {
  const config = getFeedbackConfig();
  if (!config.enabled) return { ok: false, reason: 'unavailable' };
  const input = validateFeedbackInput(value);
  if (!input) return { ok: false, reason: 'invalid' };
  if (input.website) return { ok: true }; // Honeypot: do not create an issue.
  const context = resolveFeedbackContext(input.pagePath);
  if (!context) return { ok: false, reason: 'invalid' };
  const delivery = await createFeedbackIssue({
    repository: config.repository,
    token: config.token,
    productId: config.productId,
    productName: config.productName,
    input,
    context,
  });
  if (delivery === 'created') return { ok: true };
  return { ok: false, reason: delivery === 'rate_limited' ? 'rate_limited' : 'delivery_failed' };
}
