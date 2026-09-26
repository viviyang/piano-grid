// Small CDP smoke test using the runner's Chrome and Node's native WebSocket.
// No application dependencies, production writes, or external site requests.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const base = process.env.PIANO_AUDIT_BASE || 'http://127.0.0.1:8123';
const binary = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const out = path.resolve('checks/url-audit-final/browser');
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'pianogrid-browser-'));
const chrome = spawn(binary, ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=9223', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let spawnError;
chrome.on('error', error => { spawnError = error; });
let socket, nextID = 0;
const pending = new Map(), rows = [], errors = [];
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextID;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, 15000);
    pending.set(id, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const value = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (value.exceptionDetails) throw new Error(JSON.stringify(value.exceptionDetails));
  return value.result.value;
}
try {
  let target;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (spawnError) throw spawnError;
    try { target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json(); break; } catch { await delay(200); }
  }
  if (!target?.webSocketDebuggerUrl) throw new Error('Chrome did not start; browser checks were not run.');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id); pending.delete(message.id);
      message.error ? request.reject(new Error(JSON.stringify(message.error))) : request.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  });
  await command('Page.enable'); await command('Runtime.enable');
  const paths = ['/chords/c-major', '/chords/f-m7', '/scales/f-major', '/sheet-music/hot-cross-buns', '/sheet-music/twinkle-twinkle-little-star', '/scales'];
  for (const width of [1440, 390]) for (const route of paths) {
    const height = width === 390 ? 844 : 1000;
    await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width === 390 });
    await command('Page.navigate', { url: base + route });
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { ready = await evaluate(`location.pathname === ${JSON.stringify(route)} && document.readyState === 'complete' && Boolean(document.querySelector('main'))`); } catch { /* navigation replaced the context */ }
      if (ready) break;
      await delay(100);
    }
    if (!ready) throw new Error(`${route} did not load`);
    await delay(750);
    const state = await evaluate(`(() => {
      document.querySelectorAll('main details').forEach(node => { node.open = true; });
      const main = document.querySelector('main');
      const headings = [...main.querySelectorAll('h1')].map(node => node.textContent.trim());
      const text = main.textContent;
      return { headings, width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        auditWording: /competitor family coverage|Source record:|source ledger|turn\\d+(?:view|search)\\d+|independent fingering dataset is authorized/.test(text),
        sourcesKeepScope: ${JSON.stringify(route)} !== '/chords/f-m7' || /no fingering is assigned/i.test(text),
        title: document.title };
    })()`);
    if (route === '/chords/c-major') {
      const panelHeadings = ['What to notice', 'Compare three positions', 'Root-position fingering examples'];
      for (const label of panelHeadings) {
        const count = await evaluate(`(async () => { const label=${JSON.stringify(label)}; const button=[...document.querySelectorAll('main button')].find(node=>node.textContent.trim()===label); if(button?.getAttribute('aria-expanded')==='false')button.click(); await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))); return [...document.querySelectorAll('main h2,main h3')].filter(node=>node.getClientRects().length&&node.textContent.trim()===label).length; })()`);
        if (count > 1) throw new Error(`Duplicated visible panel heading: ${label}`);
      }
    }
    const passed = state.headings.length === 1 && !state.auditWording && state.sourcesKeepScope && state.scrollWidth <= state.width + 1;
    rows.push({ route, width, passed, ...state });
    const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(out, `${width}-${route.slice(1).replaceAll('/', '-')}.png`), Buffer.from(shot.data, 'base64'));
  }
} catch (error) {
  errors.push(error.message);
} finally {
  socket?.close(); chrome.kill();
  const report = { pages: rows.length, failures: rows.filter(row => !row.passed).length, errors, rows,
    scope: 'Chrome desktop/mobile-emulated DOM, source wording, overflow and screenshots; not physical devices, listening or screen-reader testing.' };
  fs.writeFileSync(path.join(out, 'BROWSER_AUDIT.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = errors.length || report.failures || rows.length !== 12 ? 1 : 0;
}
