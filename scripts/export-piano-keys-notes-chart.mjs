import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const master = JSON.parse(readFileSync(resolve(root, 'docs/content/site-master/page-content.master.json'), 'utf8'));
const layout = master.pages['/keyboard-notes'].data.layouts.find((item) => item.layout_id === '88-key-A0-C8');
if (!layout) throw new Error('Missing 88-key layout');

const octave = layout.keys.filter((key) => key.midi >= 60 && key.midi <= 72);
const whites = octave.filter((key) => key.color === 'white');
const blacks = octave.filter((key) => key.color === 'black');
if (whites.length !== 8 || blacks.length !== 5) throw new Error(`Unexpected octave contents: ${whites.length} white, ${blacks.length} black`);

const whiteNames = whites.map((key) => key.label_with_octave.split(' / ')[0]);
if (whiteNames.join() !== 'C4,D4,E4,F4,G4,A4,B4,C5') throw new Error(`Unexpected white-key order: ${whiteNames.join()}`);

function display(note) {
  return String(note).replaceAll('#', '♯').replaceAll('b', '♭');
}

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

const width = 1200;
const height = 440;
const padX = 36;
const top = 78;
const keyboardHeight = 270;
const whiteWidth = (width - padX * 2) / whites.length;
const blackWidth = whiteWidth * 0.58;
const blackHeight = keyboardHeight * 0.58;
const whiteY = top;
const labelY = top + keyboardHeight + 32;

const whiteRects = whites.map((key, index) => {
  const x = padX + index * whiteWidth;
  const isC4 = key.midi === 60;
  const fill = isC4 ? '#EAF2FF' : '#FFFFFF';
  const stroke = isC4 ? '#0066CC' : '#D4D8DE';
  const strokeWidth = isC4 ? 3 : 1.5;
  const label = display(key.label_with_octave.split(' / ')[0]);
  const parts = [
    `<rect data-key="${escapeXml(label)}" data-color="white" x="${x.toFixed(2)}" y="${whiteY}" width="${whiteWidth.toFixed(2)}" height="${keyboardHeight}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`,
    `<text x="${(x + whiteWidth / 2).toFixed(2)}" y="${labelY}" text-anchor="middle" fill="${isC4 ? '#0066CC' : '#1D1D1F'}" font-size="22" font-weight="${isC4 ? '700' : '650'}">${escapeXml(label)}</text>`,
  ];
  if (isC4) {
    const cx = x + whiteWidth / 2;
    const cy = whiteY + keyboardHeight - 36;
    parts.push(`<circle data-marker="middle-c" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="7" fill="#0066CC"/>`);
    parts.push(`<text x="${cx.toFixed(2)}" y="${labelY + 20}" text-anchor="middle" fill="#0066CC" font-size="14" font-weight="700">Middle C</text>`);
  }
  return parts.join('\n');
});

const blackRects = blacks.map((key) => {
  const leftWhite = whites.findLast((item) => item.midi < key.midi);
  const leftIndex = whites.findIndex((item) => item.midi === leftWhite.midi);
  const boundary = padX + (leftIndex + 1) * whiteWidth;
  const x = boundary - blackWidth / 2;
  const names = key.label_with_octave.split(' / ').map(display);
  const sharp = names[0];
  const flat = names[1] ?? '';
  return [
    `<rect data-key="${escapeXml(names.join('/'))}" data-color="black" x="${x.toFixed(2)}" y="${whiteY}" width="${blackWidth.toFixed(2)}" height="${blackHeight.toFixed(2)}" fill="#202124" stroke="#202124" stroke-width="1"/>`,
    `<text x="${(x + blackWidth / 2).toFixed(2)}" y="${whiteY - 28}" text-anchor="middle" fill="#1D1D1F" font-size="16" font-weight="650">${escapeXml(sharp)}</text>`,
    flat ? `<text x="${(x + blackWidth / 2).toFixed(2)}" y="${whiteY - 10}" text-anchor="middle" fill="#555B65" font-size="15">${escapeXml(flat)}</text>` : '',
  ].filter(Boolean).join('\n');
});

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
<title>Piano keys notes chart, C4 to C5</title>
<rect width="${width}" height="${height}" fill="#FFFFFF"/>
<g font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
${whiteRects.join('\n')}
${blackRects.join('\n')}
</g>
</svg>
`;

const out = resolve(root, 'public/images/keyboard-notes/piano-keys-notes-chart.svg');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg);
console.log(`Wrote ${out} (${Buffer.byteLength(svg)} bytes)`);
