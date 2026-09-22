import { deliverFeedback } from '@/lib/feedback/service';
import type { FeedbackResult } from '@/lib/feedback/types';

const MAX_BODY_BYTES = 16_384;

function reply(result: FeedbackResult, status: number) {
  return Response.json(result, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return reply({ ok: false, reason: 'invalid' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({ ok: false, reason: 'invalid' }, 415);
  const declaredSize = Number(request.headers.get('content-length') ?? 0);
  if (!Number.isFinite(declaredSize) || declaredSize > MAX_BODY_BYTES) return reply({ ok: false, reason: 'invalid' }, 413);

  let value: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return reply({ ok: false, reason: 'invalid' }, 413);
    value = JSON.parse(body);
  } catch {
    return reply({ ok: false, reason: 'invalid' }, 400);
  }

  const result = await deliverFeedback(value);
  if (result.ok) return reply(result, 201);
  const status = result.reason === 'invalid' ? 400 : result.reason === 'rate_limited' ? 429 : 503;
  return reply(result, status);
}
