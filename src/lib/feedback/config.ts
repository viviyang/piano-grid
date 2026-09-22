import 'server-only';
import { analyticsEnabled } from '@/lib/analytics';

const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

export function getFeedbackConfig() {
  const repository = (process.env.FEEDBACK_GITHUB_REPOSITORY ?? '').trim();
  const token = (process.env.FEEDBACK_GITHUB_TOKEN ?? '').trim();
  const enabled = process.env.FEEDBACK_ENABLED === 'true';
  const configured = enabled && REPOSITORY_PATTERN.test(repository) && Boolean(token);
  return { enabled: configured, repository, token, productId: 'pianogrid', productName: 'PianoGrid' };
}

export function pageFeedbackEnabled() {
  return getFeedbackConfig().enabled && analyticsEnabled();
}
