import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkProtectedBytes, sha256 } from './protected-source-hash.mjs';

const allowed = 'docs/design/reference/final-a-minor.html';
test('only an explicitly reviewed text path accepts CRLF/LF equivalence', () => {
  const expected = sha256(Buffer.from('alpha\nbeta\n'));
  assert.equal(checkProtectedBytes(allowed, Buffer.from('alpha\r\nbeta\r\n'), expected).passed, true);
  assert.equal(checkProtectedBytes('public/unlisted.html', Buffer.from('alpha\r\nbeta\r\n'), expected).passed, false);
  assert.equal(checkProtectedBytes('public/file.pdf', Buffer.from('alpha\r\nbeta\r\n'), expected).passed, false);
});
test('reads current file bytes and rejects a one-character edit, whitespace edits and BOM', () => {
  const directory = mkdtempSync(join(tmpdir(), 'piano-protected-test-'));
  const file = join(directory, 'fixture.txt');
  try {
    const expected = sha256(Buffer.from('alpha\nbeta\n'));
    writeFileSync(file, 'alpha\r\nbeta\r\n');
    assert.equal(checkProtectedBytes(allowed, readFileSync(file), expected).passed, true);
    for (const text of ['Alpha\r\nbeta\r\n', 'alpha \nbeta\n', 'alpha\nbeta', '\ufeffalpha\nbeta\n']) {
      writeFileSync(file, text);
      assert.equal(checkProtectedBytes(allowed, readFileSync(file), expected).passed, false);
    }
  } finally { rmSync(file, { force: true }); rmdirSync(directory); }
});
test('invalid UTF8 is rejected; exact binary bytes retain byte-exact behavior', () => {
  const bytes = Buffer.from([0xff, 13, 10]);
  assert.equal(checkProtectedBytes(allowed, bytes, 'incorrect').passed, false);
  assert.equal(checkProtectedBytes('asset.pdf', bytes, sha256(bytes)).passed, true);
});
test('all 23 reviewed repository files match the historical hash, but a byte edit fails', () => {
  const paths = JSON.parse(readFileSync(new URL('./protected-source-text-paths.json', import.meta.url), 'utf8'));
  const manifest = JSON.parse(readFileSync('checks/batches/07-site-integration/source-before.json', 'utf8')).files;
  assert.equal(paths.length, 23);
  for (const path of paths) {
    const expected = manifest.find(item => item.path === path).sha256;
    const bytes = readFileSync(path);
    assert.equal(checkProtectedBytes(path, bytes, expected).passed, true, path);
    const altered = Buffer.from(bytes);
    const index = altered.findIndex(byte => byte >= 65 && byte <= 90 || byte >= 97 && byte <= 122);
    assert.ok(index >= 0);
    altered[index] = altered[index] === 65 ? 66 : 65;
    assert.equal(checkProtectedBytes(path, altered, expected).passed, false, path);
  }
});
