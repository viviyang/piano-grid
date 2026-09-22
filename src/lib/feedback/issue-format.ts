import type { FeedbackContext } from './context.ts';
import type { FeedbackInput } from './types.ts';

function safeLine(value: string) {
  return value.replace(/[\r\n\u0000-\u001f\u007f]/g, ' ').trim();
}

function quotedText(value: string) {
  return value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').split(/\r?\n/)
    .map((line) => `> ${line.replaceAll('@', '＠').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}`).join('\n');
}

export function formatFeedbackIssue(productId: string, productName: string, input: FeedbackInput, context: FeedbackContext) {
  const title = `[${safeLine(productId)}] ${safeLine(input.feedbackType)} · ${safeLine(context.pagePath)}`;
  const body = [
    `${safeLine(productName)} feedback (schema v1)`,
    '',
    `Product: ${productId}`,
    `Source: ${input.source}`,
    `Page: ${context.pagePath}`,
    `Area: ${context.productArea}`,
    context.entityType ? `Entity type: ${context.entityType}` : '',
    context.entityId ? `Entity ID: ${context.entityId}` : '',
    `Type: ${input.feedbackType}`,
    input.reason ? `Reason: ${input.reason}` : '',
    input.email ? `Reply email: ${safeLine(input.email)}` : '',
    '',
    'Message:',
    quotedText(input.message),
  ].filter((line) => line !== '').join('\n');
  return { title, body };
}
