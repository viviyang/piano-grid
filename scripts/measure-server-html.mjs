// Measure uncompressed production response bodies, never client bundle sizes.
// Usage: node scripts/measure-server-html.mjs http://127.0.0.1:3141 before
import {mkdir, writeFile} from 'node:fs/promises';
const [base, phase] = process.argv.slice(2);
if (!base || !/^(before|after)$/.test(phase)) throw new Error('Expected base URL and before|after');
const routes = ['/', '/chords', '/chords/c-major', '/scales/c-major', '/arpeggios', '/keyboard-notes/labeled', ...['add','augmented','diminished','major','minor','seventh','suspended'].map(x=>`/chords/${x}`)];
const out = `checks/html-semantics/${phase}`;
await mkdir(out, {recursive:true});
const results=[];
for (const url of routes) {
  const response=await fetch(base+url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  const html=await response.text(), bytes=s=>Buffer.byteLength(s);
  const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  const svgs=[...html.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)];
  const file=url==='/'?'home':url.slice(1).replaceAll('/','--');
  await writeFile(`${out}/${file}.html`, html);
  results.push({url,htmlBytes:bytes(html),scriptBytes:scripts.reduce((n,m)=>n+bytes(m[1]),0),svgCount:svgs.length,svgBytes:svgs.reduce((n,m)=>n+bytes(m[0]),0),h1:(html.match(/<h1\b/g)||[]).length,h2:(html.match(/<h2\b/g)||[]).length,h3:(html.match(/<h3\b/g)||[]).length});
}
await writeFile(`${out}/raw-metrics.json`, JSON.stringify(results,null,2)+'\n');
console.table(results);
