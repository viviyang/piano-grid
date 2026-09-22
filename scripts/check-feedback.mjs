import assert from 'node:assert/strict';
import { resolveFeedbackContext } from '../src/lib/feedback/context.ts';
import { validateFeedbackInput } from '../src/lib/feedback/validation.ts';
import { formatFeedbackIssue } from '../src/lib/feedback/issue-format.ts';

const global = {
  source: 'global_feedback',
  pagePath: '/chords/c-major',
  feedbackType: 'content_error',
  message: 'The second note is incorrect.',
  email: 'reader@example.com',
};
assert.ok(validateFeedbackInput(global));
assert.equal(resolveFeedbackContext('/chords/c-major')?.entityId, 'c-major');
assert.deepEqual(resolveFeedbackContext('/chords/finder'), { pagePath: '/chords/finder', productArea: 'chords' });
assert.equal(validateFeedbackInput({ ...global, pagePath: '/chords/c-major?token=secret' }), null);
assert.equal(validateFeedbackInput({ ...global, feedbackType: 'untrusted' }), null);
assert.equal(validateFeedbackInput({ ...global, email: 'invalid' }), null);
assert.equal(validateFeedbackInput({ ...global, message: '' }), null);

const page = {
  source: 'page_feedback',
  pagePath: '/scales/c-major',
  feedbackType: 'hard_to_understand',
  reason: 'hard_to_understand',
  message: '',
};
assert.ok(validateFeedbackInput(page));
assert.equal(validateFeedbackInput({ ...page, pagePath: '/guide' }), null);
assert.equal(validateFeedbackInput({ ...page, feedbackType: 'bug' }), null);
assert.equal(validateFeedbackInput({ ...page, reason: 'content_error', feedbackType: 'content_error' }), null);

const issue = formatFeedbackIssue('pianogrid', 'PianoGrid', { ...global, message: '@staff\n<script>alert(1)</script>' }, resolveFeedbackContext(global.pagePath));
assert.match(issue.title, /\[pianogrid\] content_error · \/chords\/c-major/);
assert.ok(!issue.body.includes('@staff'));
assert.ok(!issue.body.includes('<script>'));
assert.ok(issue.body.includes('Entity ID: c-major'));
console.log('Feedback validation, context and issue formatting passed.');
