import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Exact reviewed text paths only. No extension-wide normalization or JSON rewriting.
const textPaths = new Set(JSON.parse(readFileSync(new URL('./protected-source-text-paths.json', import.meta.url), 'utf8')));
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function checkProtectedBytes(path, bytes, expected) {
  const rawHash = sha256(bytes);
  if (rawHash === expected) return { passed: true, mode: 'byte-exact', expected, rawHash };
  if (!textPaths.has(path)) return { passed: false, mode: 'byte-mismatch', expected, rawHash };
  // Fatal decoding prevents binary/invalid UTF-8 data from being silently replaced.
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); }
  catch { return { passed: false, mode: 'invalid-utf8', expected, rawHash }; }
  const lfHash = sha256(Buffer.from(text.replaceAll('\r\n', '\n'), 'utf8'));
  return { passed: lfHash === expected, mode: lfHash === expected ? 'crlf-equivalent' : 'content-mismatch', expected, rawHash, lfHash };
}
