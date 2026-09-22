import 'server-only';
import type { FeedbackContext } from './context';
import type { FeedbackInput } from './types';
import { formatFeedbackIssue } from './issue-format';

export type GitHubDelivery = 'created' | 'rate_limited' | 'failed';

export async function createFeedbackIssue({
  repository,
  token,
  productId,
  productName,
  input,
  context,
}: {
  repository: string;
  token: string;
  productId: string;
  productName: string;
  input: FeedbackInput;
  context: FeedbackContext;
}): Promise<GitHubDelivery> {
  const { title, body } = formatFeedbackIssue(productId, productName, input, context);

  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/issues`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
      body: JSON.stringify({ title, body }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 201) return 'created';
    if (response.status === 429 || (response.status === 403 && response.headers.get('retry-after'))) return 'rate_limited';
  } catch {
    // The caller returns a generic error; user text and credentials never enter logs.
  }
  return 'failed';
}
