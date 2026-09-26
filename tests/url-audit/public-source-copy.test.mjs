import assert from 'node:assert/strict';
import { test } from 'node:test';
import { publicSourceText, publicTriadDescription } from '../../src/lib/public-source-copy.ts';

test('unverified source caveat is preserved', () => {
  const value = 'lead to two-octave fingering resource only; no contents verified';
  assert.equal(publicSourceText(value), value);
});
test('scope, page locator and rights are not bookkeeping', () => {
  for (const value of [
    'Supports theory and spelling only; keyboard layouts are PianoGrid examples, and no fingering is assigned.',
    'PDF page 2 (0-based page 1), printed page 40, Natural minor scales A row; RH above/LH below',
    'No source prose, artwork, fingering or PDF is copied.',
  ]) assert.equal(publicSourceText(value), value);
});
test('review IDs disappear but comparison scope remains', () => {
  assert.equal(publicSourceText('competitor family coverage; cross-check examples only'), 'Example comparison only');
  assert.equal(publicSourceText('Checked 2026-09-12 · N2B-OMT-TRIADS'), '');
  assert.equal(publicSourceText('Source record: AM-FINGER-LMT'), '');
  assert.equal(publicSourceText('PDF page 2; visually checked in the approved Scales plan evidence'), 'PDF page 2');
  assert.equal(publicSourceText('PDF pages 3,4. Screenshots: turn655244view0; turn641788view0'), 'PDF pages 3,4.');
});
test('no fingering evidence is explained rather than silently deleted', () => {
  assert.match(publicSourceText('No independent fingering dataset is authorized for N2B.'), /Fingerings are not provided/);
});
test('cleanup is idempotent and does not strip musical symbols', () => {
  for (const value of ['C♭4 is B3; D𝄫 and C share a key.', 'competitor family coverage; cross-check examples only', 'Source record: AM-FINGER-LMT']) {
    assert.equal(publicSourceText(publicSourceText(value)), publicSourceText(value));
  }
});
test('only triad descriptions change; titles, scales and sevenths do not', () => {
  const text = 'See keyboard positions, compare three inversions, hear the notes and print a reference.';
  assert.equal(publicTriadDescription('/chords/d-flat-major', text), 'See keyboard positions, compare root position and two inversions, hear the notes and print a reference.');
  for (const path of ['/chords/f-maj7', '/chords/a-7', '/scales/d-flat-major', '/chords/major']) assert.equal(publicTriadDescription(path, text), text);
});
