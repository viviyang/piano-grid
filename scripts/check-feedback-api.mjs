import assert from 'node:assert/strict';

const base = process.env.PIANO_BASE_URL || 'http://localhost:3117';
const endpoint = `${base}/api/feedback`;
const validShape = {
  source: 'global_feedback',
  pagePath: '/chords/c-major',
  feedbackType: 'content_error',
  message: 'A note is wrong.',
};

async function post(body, headers = {}) {
  return fetch(endpoint, { method: 'POST', headers, body });
}

assert.equal((await fetch(endpoint)).status, 405);
assert.equal((await post(JSON.stringify(validShape), { 'Content-Type': 'application/json' })).status, 403);
assert.equal((await post(JSON.stringify(validShape), { Origin: 'https://other.example', 'Content-Type': 'application/json' })).status, 403);
assert.equal((await post(JSON.stringify(validShape), { Origin: base, 'Content-Type': 'text/plain' })).status, 415);
assert.equal((await post(JSON.stringify({ ...validShape, pagePath: '/chords/c-major?token=secret' }), { Origin: base, 'Content-Type': 'application/json' })).status, 400);
assert.equal((await post('x'.repeat(16_385), { Origin: base, 'Content-Type': 'application/json' })).status, 413);
console.log('Feedback API rejects wrong origin, type, path and oversized input.');
