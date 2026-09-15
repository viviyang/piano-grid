import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  DEFAULT_PRACTICE_MINUTES,
  formatPracticeTime,
  PRACTICE_TIMER_BOUNDARY,
  PRACTICE_TIMER_COMPLETE,
  PRACTICE_TIMER_PRESETS,
  PracticeTimerController,
  validatePracticeMinutes,
} from '../src/lib/practice-timer.ts';

type Result = { name: string; passed: boolean; detail?: string };
const results: Result[] = [];
function test(name: string, callback: () => void) { try { callback(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, detail: (error as Error).message }); } }
function equal(name: string, actual: unknown, expected: unknown) { test(name, () => assert.deepEqual(actual, expected)); }

let now = 1_000_000;
let nextID = 0;
const active = new Map<number, () => void>();
let cleared = 0;
const scheduler = {
  setInterval(callback: () => void) { nextID += 1; active.set(nextID, callback); return nextID as unknown as ReturnType<typeof setInterval>; },
  clearInterval(id: ReturnType<typeof setInterval>) { if (active.delete(id as unknown as number)) cleared += 1; },
};
const timer = new PracticeTimerController(() => now, scheduler);
equal('default duration 10 minutes', [timer.getSnapshot().selectedMinutes,timer.getSnapshot().remainingSeconds], [DEFAULT_PRACTICE_MINUTES,600]);
equal('preset contract', PRACTICE_TIMER_PRESETS, [5,10,15,20,30]);
for (const value of ['1','120','07']) equal(`valid custom ${value}`, validatePracticeMinutes(value).message, '');
for (const value of ['','0','121','1.5','abc','-1']) test(`invalid custom ${value || 'empty'}`, () => assert.ok(validatePracticeMinutes(value).message));
equal('time formatting', [formatPracticeTime(600),formatPracticeTime(65),formatPracticeTime(0)], ['10:00','01:05','00:00']);
timer.selectPreset(5);
equal('preset selection resets duration', [timer.getSnapshot().state,timer.getSnapshot().remainingSeconds], ['idle',300]);
timer.start();
equal('start enters running with one interval', [timer.getSnapshot().state,active.size], ['running',1]);
now += 31_200; timer.tick();
equal('deadline calculation survives time jump', timer.getSnapshot().remainingSeconds, 269);
const liveAfterTick = timer.getSnapshot().announcement;
now += 1000; timer.tick();
equal('per-second render does not change announcement', timer.getSnapshot().announcement, liveAfterTick);
timer.pause();
const pausedRemaining = timer.getSnapshot().remainingSeconds;
equal('pause preserves remaining and clears interval', [timer.getSnapshot().state,active.size], ['paused',0]);
now += 90_000; timer.tick();
equal('paused time does not drain', timer.getSnapshot().remainingSeconds, pausedRemaining);
timer.resume();
equal('resume starts one interval', [timer.getSnapshot().state,active.size], ['running',1]);
timer.resume();
equal('duplicate resume does not create interval', active.size, 1);
timer.reset();
equal('reset returns selected full duration', [timer.getSnapshot().state,timer.getSnapshot().remainingSeconds,active.size], ['idle',300,0]);
timer.setCustomInput('1'); timer.start();
now += 60_000; timer.tick();
equal('completion reaches zero once', [timer.getSnapshot().state,timer.getSnapshot().remainingSeconds,timer.getSnapshot().announcement,active.size], ['complete',0,PRACTICE_TIMER_COMPLETE,0]);
const completed = timer.getSnapshot(); timer.tick();
equal('extra tick cannot duplicate completion', timer.getSnapshot(), completed);
timer.startAgain();
equal('start again uses selected duration and one interval', [timer.getSnapshot().state,timer.getSnapshot().remainingSeconds,active.size], ['running',60,1]);
timer.dispose();
equal('dispose clears interval', active.size, 0);
test('interval lifecycle cleared timers', () => assert.ok(cleared >= 4));
equal('boundary copy exact', PRACTICE_TIMER_BOUNDARY, 'This timer tracks elapsed practice time. It does not set tempo or listen to your piano.');

const pack = JSON.parse(fs.readFileSync('docs/content/PianoGrid_Practical_Tools_Final_Execution_Pack_2026-09-15/tools-content-data.json','utf8'));
equal('task groups exact', pack.groups.map((group:any) => group.id), ['find-identify','practice','print']);
equal('no generic metronome', pack.classification.metronome_rhythm, 'DEFER');
equal('no progression generator', pack.classification.chord_progression_generator, 'DROP');
const pagesSource = fs.readFileSync('src/components/integration/pages.tsx','utf8');
test('duplicate Reading removed from ToolsPage', () => assert.ok(!pagesSource.slice(pagesSource.indexOf('export function ToolsPage')).includes('<Reading')));
test('timer rendered inline', () => assert.ok(pagesSource.includes('<PracticeTimer/>')));
const keyboardPractice = fs.readFileSync('src/components/keyboard-notes/practice.tsx','utf8');
test('Note Trainer owner anchor stable', () => assert.ok(keyboardPractice.includes('id="note-trainer"')));
const seo = fs.readFileSync('src/lib/seo-editorial.ts','utf8');
test('Tools metadata exact', () => assert.ok(seo.includes(pack.page.title) && seo.includes(pack.page.description)));
test('Blank metadata exact', () => assert.ok(seo.includes(pack.blank_sheet_metadata.title) && seo.includes(pack.blank_sheet_metadata.description)));
const routesSource = fs.readFileSync('src/lib/site-routes.ts','utf8');
const routeArray = routesSource.slice(routesSource.indexOf('export const PUBLIC_ROUTES'), routesSource.indexOf(']') + 1);
const routes = [...routeArray.matchAll(/'([^']+)'/g)].map(match => match[1]);
equal('public route count unchanged', routes.length, 205);
test('route manifest has no fragment/query', () => assert.ok(routes.every(route => !route.includes('#') && !route.includes('?'))));
const sitemapSource = fs.readFileSync('src/app/sitemap.ts','utf8');
test('sitemap derives from public route manifest', () => assert.ok(sitemapSource.includes('PUBLIC_ROUTES')));
for (const asset of [
  'public/reference/assets/blank-piano-staff-letter.pdf','public/reference/assets/blank-piano-staff-a4.pdf',
  'public/assets/guides/piano-starter-and-reading.pdf','public/downloads/scales/pianogrid-12-major-scales-note-reference.pdf',
  'public/downloads/scales/pianogrid-major-minor-note-atlas.pdf','public/downloads/scales/pianogrid-c-major-two-hand-starter.pdf',
]) test(`printable exists ${asset}`, () => assert.ok(fs.statSync(asset).size > 1000));

fs.mkdirSync('practical-tools',{recursive:true});
fs.writeFileSync('practical-tools/test-results.json',JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
for(const result of results.filter(item=>!item.passed)) console.error(`FAIL ${result.name}: ${result.detail}`);
process.exitCode=results.some(item=>!item.passed)?1:0;
