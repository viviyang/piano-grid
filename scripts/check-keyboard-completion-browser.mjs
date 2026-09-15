import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3100';
const out = process.env.PIANO_CHECK_OUT || 'checks/keyboard-completion';
await mkdir(`${out}/screenshots`, { recursive: true });
const results = [], errors = [];
function check(name, passed, detail = '') { results.push({ name, passed: !!passed, detail }); if (!passed) console.error('FAIL', name, detail); }
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', error => errors.push(error.message));
await page.addInitScript(() => {
  window.__copied = '';
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__copied = value; } } });
  const Native = window.AudioContext;
  window.__audioEvents = [];
  if (Native) window.AudioContext = class extends Native { createOscillator() { const oscillator = super.createOscillator(); const set = oscillator.frequency.setValueAtTime.bind(oscillator.frequency); oscillator.frequency.setValueAtTime = (frequency, time) => { window.__audioEvents.push(frequency); return set(frequency, time); }; return oscillator; } };
});
async function load(path) { await page.goto(base + path); const select = page.locator('select').first(); if (await select.count()) await page.waitForFunction(() => !document.querySelector('select')?.disabled); }
async function find(query) { await page.getByLabel('Find a note', { exact: true }).fill(query); await page.getByRole('button', { name: 'Find', exact: true }).click(); }
async function noOverflow(path) {
  await load(path);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    check(`${path} no page overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => `${document.documentElement.scrollWidth}/${innerWidth}`));
    await page.screenshot({ path: `${out}/screenshots/${path.slice(1).replaceAll('/', '-') || 'home'}-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 768, height: 950 });
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  check(`${path} 200% text no overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: `${out}/screenshots/${path.slice(1).replaceAll('/', '-')}-text200.png`, fullPage: true });
  await page.evaluate(() => document.documentElement.style.fontSize = '');
}

try {
  await load('/keyboard-notes');
  for (const [query, midi, heading] of [['A0','21','A0'],['C4','60','C4'],['A4','69','A4'],['C8','108','C8'],['B-sharp3','60','B♯3'],['B#4','72','B♯4'],['C-flat4','59','C♭4'],['A♭4','68','A♭4']]) { await find(query); check(`lookup ${query}`, await page.locator('.kn-result').getAttribute('data-selected-midi') === midi && await page.locator('.kn-result h2').textContent() === heading); }
  await find('D8'); check('D8 outside range UI', await page.getByText('This note is outside the selected keyboard range.', { exact: true }).count() === 1 && await page.locator('.kn-result').getAttribute('data-selected-midi') === '');
  await find('C major'); check('compound guidance UI', await page.getByText('Try a single note instead.', { exact: true }).count() === 1);
  await find('C'); check('C 88 candidates UI', JSON.stringify(await page.locator('[aria-label="Choose an octave"] button').allTextContents()) === JSON.stringify(['C1','C2','C3','C4','C5','C6','C7','C8']));
  await page.getByLabel('Keyboard layout').selectOption('61-key-C2-C7'); check('C 61 re-resolution UI', JSON.stringify(await page.locator('[aria-label="Choose an octave"] button').allTextContents()) === JSON.stringify(['C2','C3','C4','C5','C6','C7']));
  await page.locator('[aria-label="Choose an octave"] button', { hasText: 'C4' }).click();
  await page.getByRole('button', { name: 'Copy link', exact: true }).first().click();
  const lookupShare = await page.evaluate(() => window.__copied); check('lookup share state', lookupShare.endsWith('/keyboard-notes?layout=61&note=C4'), lookupShare);
  await page.goto(lookupShare); await page.waitForFunction(() => !document.querySelector('select')?.disabled); check('lookup share restore', await page.getByLabel('Keyboard layout').inputValue() === '61-key-C2-C7' && await page.locator('.kn-result').getAttribute('data-selected-midi') === '60');
  await page.getByRole('button', { name: 'Play note', exact: true }).click(); await page.waitForFunction(() => window.__audioEvents.length > 0); check('audio event uses selected MIDI', Math.abs((await page.evaluate(() => window.__audioEvents.at(-1))) - 261.6255653) < .001);
  let findPractice = page.locator('.kn-practice').first();
  check('find practice feedback live region', await findPractice.locator('.kn-practice-feedback').getAttribute('aria-live') === 'polite');
  const findTarget = (await findPractice.locator('.kn-practice-prompt').textContent()).replace(/^Find /,'').replaceAll('♯','#').replaceAll('♭','b');
  const targetKey = findPractice.locator('button.kn-key').filter({ has: page.locator(`.kn-key-text span:text-is("${findTarget}")`) }).first();
  const targetMidi = Number(await targetKey.getAttribute('data-midi'));
  const wrongOctave = findPractice.locator(`button.kn-key[data-midi="${targetMidi + 12 <= 96 ? targetMidi + 12 : targetMidi - 12}"]`);
  await wrongOctave.focus(); await wrongOctave.press('ArrowRight'); check('practice keyboard arrow navigation', Number(await page.locator(':focus').getAttribute('data-midi')) === Math.min(96, Number(await wrongOctave.getAttribute('data-midi')) + 1));
  await wrongOctave.focus(); await wrongOctave.press('Enter'); check('find practice wrong octave feedback', (await findPractice.locator('.kn-practice-feedback').textContent()).includes('octave number'));
  await page.reload(); await page.waitForFunction(() => !document.querySelector('select')?.disabled); findPractice = page.locator('.kn-practice').first();
  for (let index=0; index<10; index+=1) { const target=(await findPractice.locator('.kn-practice-prompt').textContent()).replace(/^Find /,''); await findPractice.locator(`button.kn-key[aria-label="${target.replaceAll('♯','#').replaceAll('♭','b')}"]`).click(); check(`find practice answer ${index+1}`, (await findPractice.locator('.kn-practice-feedback').textContent()).startsWith('Correct')); await findPractice.getByRole('button',{name:'Next note'}).click(); }
  check('find practice 10 summary', await findPractice.locator('[data-practice-complete="true"]').count()===1 && (await findPractice.textContent()).includes('10 / 10 correct'));
  await findPractice.getByRole('button',{name:'Practice again'}).click(); check('find practice retry', await findPractice.locator('[data-practice-index="1"]').count()===1);

  await load('/keyboard-notes/chart');
  check('Chart exposes 61-key range', await page.getByLabel('Displayed range').locator('option[value="61_keys"]').count()===1);
  await page.getByLabel('Displayed range').selectOption('61_keys'); check('61 range endpoints', await page.locator('.kn-screen .kn-keyboard button').count()===61 && await page.locator('.kn-screen button.kn-key[data-midi="36"]').count()===1 && await page.locator('.kn-screen button.kn-key[data-midi="96"]').count()===1);
  const sharp = page.locator('.kn-screen [aria-label="treble staff notes"] [data-note="F#4"]'); await sharp.click(); const before=await page.locator('.kn-result h2').textContent(); await page.getByLabel('Prefer flat spelling').check(); check('explicit staff spelling survives preference', before==='F♯4' && await page.locator('.kn-result h2').textContent()==='F♯4');
  const midiBefore=await page.locator('.kn-result').getAttribute('data-selected-midi'); await page.getByRole('combobox',{name:'Clef',exact:true}).selectOption('bass'); check('clef switch keeps MIDI',await page.locator('.kn-result').getAttribute('data-selected-midi')===midiBefore);
  await page.getByRole('button',{name:'Copy link',exact:true}).first().click(); const chartShare=await page.evaluate(()=>window.__copied); await page.goto(chartShare); await page.waitForFunction(()=>!document.querySelector('select')?.disabled); check('chart share restore',await page.getByLabel('Displayed range').inputValue()==='61_keys'&&await page.getByRole('combobox',{name:'Clef',exact:true}).inputValue()==='bass'&&await page.locator('.kn-result').getAttribute('data-selected-midi')==='66');
  let readPractice=page.locator('.kn-practice').first(); check('read practice feedback live region', await readPractice.locator('.kn-practice-feedback').getAttribute('aria-live') === 'polite'); const readTargetMidi=Number(await readPractice.locator('.kn-staff-note').getAttribute('data-midi')); await readPractice.locator(`button.kn-key[data-midi="${readTargetMidi === 96 ? 95 : readTargetMidi + 1}"]`).click(); check('read practice wrong note feedback',(await readPractice.locator('.kn-practice-feedback').textContent()).includes('Look again at the clef'));
  await page.reload(); await page.waitForFunction(()=>!document.querySelector('select')?.disabled); readPractice=page.locator('.kn-practice').first(); for(let index=0;index<10;index+=1){const midi=await readPractice.locator('.kn-staff-note').getAttribute('data-midi');await readPractice.locator(`button.kn-key[data-midi="${midi}"]`).click();check(`read practice answer ${index+1}`,(await readPractice.locator('.kn-practice-feedback').textContent()).startsWith('Correct'));await readPractice.getByRole('button',{name:'Next note'}).click();}check('read practice 10 summary',(await readPractice.textContent()).includes('10 / 10 correct'));

  await load('/keyboard-notes/labeled'); await page.getByLabel('Keyboard layout').selectOption('61-key-C2-C7'); await page.getByLabel('Show octave numbers').uncheck(); await page.getByRole('button',{name:'Copy link',exact:true}).first().click(); const labeledShare=await page.evaluate(()=>window.__copied); await page.goto(labeledShare); await page.waitForFunction(()=>!document.querySelector('select')?.disabled); check('labeled share restore',await page.getByLabel('Keyboard layout').inputValue()==='61-key-C2-C7'&&!await page.getByLabel('Show octave numbers').isChecked());

  await load('/keyboard-notes/frequencies'); await page.getByLabel('Find by note or MIDI').fill('C4'); await page.getByRole('button',{name:'Find',exact:true}).click(); check('frequency C4 lookup',(await page.locator('.kn-result').textContent()).includes('261.63 Hz')&&await page.locator('.kn-keyboard button[data-midi="60"]').getAttribute('aria-pressed')==='true'); check('frequency table 88 rows',await page.locator('.kn-frequency-table tbody tr').count()===88);
  await load('/keyboard-notes/blank'); check('blank chooser options',await page.getByLabel('Keyboard segment').locator('option').count()===2); for(const href of ['/reference/generated/keyboard-notes/blank-keyboard-13-keys.svg','/reference/generated/keyboard-notes/blank-keyboard-25-keys.svg','/reference/generated/keyboard-notes/blank-keyboard-worksheet-letter.pdf','/reference/generated/keyboard-notes/blank-keyboard-worksheet-a4.pdf']){const response=await page.request.get(base+href);check(`blank asset HTTP ${href}`,response.status()===200);}
  await load('/keyboard-notes/finger-numbers'); check('finger numbers player-view ordering', await page.locator('[data-hand="left"]').getAttribute('data-order') === '5,4,3,2,1' && await page.locator('[data-hand="right"]').getAttribute('data-order') === '1,2,3,4,5');
  for (const path of ['/keyboard-notes','/keyboard-notes/chart','/keyboard-notes/labeled','/keyboard-notes/frequencies','/keyboard-notes/blank','/keyboard-notes/finger-numbers']) await noOverflow(path);
  for (const path of ['/keyboard-notes','/keyboard-notes/chart','/keyboard-notes/labeled','/keyboard-notes/frequencies','/keyboard-notes/blank']) { await load(path); check(`${path} canonical base`,await page.locator('link[rel="canonical"]').getAttribute('href')===`https://pianogrid.com${path}`); check(`${path} index follow`,(await page.locator('meta[name="robots"]').getAttribute('content')).includes('index')); }
  const sitemap=await page.request.get(base+'/sitemap.xml'),sitemapText=await sitemap.text(); check('sitemap contains completed P1 URLs',sitemapText.includes('/keyboard-notes/blank')&&sitemapText.includes('/keyboard-notes/frequencies')); check('no runtime page errors',errors.length===0,errors.join('\n'));
} catch (error) { check('browser suite completed',false,error.stack); }
finally { await browser.close(); }
await writeFile(`${out}/browser-results.json`,JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
process.exitCode=results.some(item=>!item.passed)?1:0;
