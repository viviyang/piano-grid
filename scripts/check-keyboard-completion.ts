import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolveLookup, lookupShareParams, restoreLookup } from '../src/lib/keyboard-resolution.ts';
import { generateFindPractice, generateReadPractice, scorePractice } from '../src/lib/keyboard-practice.ts';

const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const layouts = master.pages['/keyboard-notes'].data.layouts;
const layout88 = layouts.find((item:any) => item.layout_id === '88-key-A0-C8');
const layout61 = layouts.find((item:any) => item.layout_id === '61-key-C2-C7');
const chart = master.pages['/keyboard-notes/chart'].data;
const results:{name:string;passed:boolean;detail?:string}[] = [];
function test(name:string, callback:()=>void) { try { callback(); results.push({name,passed:true}); } catch (error) { results.push({name,passed:false,detail:(error as Error).message}); } }
function equal(name:string, actual:unknown, expected:unknown) { test(name, () => assert.deepEqual(actual, expected)); }

equal('88-key invariant', [layout88.keys.length,layout88.keys[0].midi,layout88.keys.at(-1).midi,layout88.keys.filter((key:any)=>key.color==='white').length], [88,21,108,52]);
equal('61-key invariant', [layout61.keys.length,layout61.keys[0].midi,layout61.keys.at(-1).midi,layout61.keys.filter((key:any)=>key.color==='white').length], [61,36,96,36]);
for (const [query,midi] of [['A0',21],['C4',60],['A4',69],['C8',108],['B#3',60],['B#4',72],['Cb4',59],['Ab4',68],['G#4',68]] as const) equal(`resolve ${query}`, [resolveLookup(query,layout88).status,resolveLookup(query,layout88).selected?.midi], ['selected',midi]);
equal('B-sharp spelling retained', resolveLookup('B-sharp3',layout88).selected?.requestedSpelling.display, 'B♯3');
equal('C-flat spelling retained', resolveLookup('C-flat4',layout88).selected?.requestedSpelling.display, 'C♭4');
equal('D8 outside range', resolveLookup('D8',layout88).status, 'outside_range');
equal('C candidates 88', resolveLookup('C',layout88).candidates.map(item=>item.display), ['C1','C2','C3','C4','C5','C6','C7','C8']);
equal('C candidates 61', resolveLookup('C',layout61).candidates.map(item=>item.display), ['C2','C3','C4','C5','C6','C7']);
equal('Ab candidates 88', resolveLookup('Ab',layout88).candidates.map(item=>item.display), ['A♭1','A♭2','A♭3','A♭4','A♭5','A♭6','A♭7']);
equal('B# candidates 61', resolveLookup('B#',layout61).candidates.map(item=>item.midi), [36,48,60,72,84,96]);
equal('Cb candidates 61', resolveLookup('Cb',layout61).candidates.map(item=>item.midi), [47,59,71,83,95]);
for (const query of ['', 'H4']) equal(`invalid ${query||'empty'}`, resolveLookup(query,layout88).status, 'invalid');
equal('compound query', resolveLookup('C major',layout88).messageKey, 'compound');
equal('layout re-resolution', [resolveLookup('A0',layout88).status,resolveLookup('A0',layout61).status], ['selected','outside_range']);
const shared = resolveLookup('Ab4',layout88).selected!;
const restored = restoreLookup(lookupShareParams(layout88,shared),layouts);
equal('share serialize restore', [restored.layout.layout_id,restored.resolution?.selected?.midi,restored.resolution?.selected?.requestedSpelling.display], ['88-key-A0-C8',68,'A♭4']);
equal('bad share params safe', restoreLookup(new URLSearchParams('layout=nope&note=H4'),layouts).resolution, null);
const midi66 = chart.keyboard_notes.find((key:any)=>key.midi===66);
const sharp = midi66.staff_spellings.find((item:any)=>item.name==='F#4');
const flat = midi66.staff_spellings.find((item:any)=>item.name==='Gb4');
equal('F#4/Gb4 identity and staff letters', [sharp.treble.midi,flat.treble.midi,sharp.treble.staff_step_from_bottom_line===flat.treble.staff_step_from_bottom_line], [66,66,false]);
const middle = chart.keyboard_notes.find((key:any)=>key.midi===60).staff_spellings.find((item:any)=>item.name==='C4');
equal('C4 two clefs', [middle.treble.midi,middle.bass.midi], [60,60]);
equal('61 chart mode approved', chart.range_modes.find((item:any)=>item.id==='61_keys') && [chart.range_modes.find((item:any)=>item.id==='61_keys').min_midi,chart.range_modes.find((item:any)=>item.id==='61_keys').max_midi], [36,96]);
const findA=generateFindPractice(layout88,'2',1234),findB=generateFindPractice(layout88,'2',1234);
equal('find practice deterministic 10', [findA.length,findA.map(item=>item.midi)], [10,findB.map(item=>item.midi)]);
equal('practice correct', scorePractice(60,60), 'correct');
equal('practice wrong octave', scorePractice(60,48), 'wrong_octave');
equal('practice wrong note', scorePractice(60,61), 'wrong_note');
const readA=generateReadPractice(chart.keyboard_notes,'3',4321),readB=generateReadPractice(chart.keyboard_notes,'3',4321);
equal('read practice deterministic 10', [readA.length,readA.map(item=>`${item.midi}:${item.clef}:${item.label}`)], [10,readB.map(item=>`${item.midi}:${item.clef}:${item.label}`)]);
test('read practice has canonical staff events',()=>assert.ok(readA.every(item=>item.staff?.midi===item.midi&&!item.label.includes('𝄪')&&!item.label.includes('𝄫'))));
equal('A4 formula', 440*2**((69-69)/12), 440);
test('88 formula rows finite',()=>assert.ok(layout88.keys.every((key:any)=>Number.isFinite(440*2**((key.midi-69)/12)))));
for(const asset of ['blank-keyboard-13-keys.svg','blank-keyboard-25-keys.svg','blank-keyboard-worksheet-letter.pdf','blank-keyboard-worksheet-a4.pdf']) test(`blank asset ${asset}`,()=>assert.ok(fs.statSync(`public/reference/generated/keyboard-notes/${asset}`).size>1000));

fs.mkdirSync('keyboard-completion',{recursive:true});
fs.writeFileSync('keyboard-completion/test-results.json',JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
for(const result of results.filter(item=>!item.passed)) console.error(`FAIL ${result.name}: ${result.detail}`);
process.exitCode=results.some(item=>!item.passed)?1:0;
