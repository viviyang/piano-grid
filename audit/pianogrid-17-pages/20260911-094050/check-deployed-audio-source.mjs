import { writeFile } from 'node:fs/promises';

const origin = 'https://pianogrid.com';
const html = await (await fetch(origin + '/chords/a-minor', { cache: 'no-store' })).text();
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => new URL(match[1], origin).href);
const hits = [];
for (const url of scripts) {
  const source = await (await fetch(url, { cache: 'no-store' })).text();
  if (source.includes('audioSession') || source.includes('silent after the page has been backgrounded')) {
    hits.push({ url, audioSession: source.includes('audioSession'), backgroundedComment: source.includes('silent after the page has been backgrounded') });
  }
}
const result = { checkedAt: new Date().toISOString(), scriptCount: scripts.length, hits };
await writeFile('audit/pianogrid-17-pages/20260911-094050/evidence/postdeploy-audio-bundle.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
