import fs from 'node:fs';
import crypto from 'node:crypto';

const master=JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json','utf8'));
const batch=JSON.parse(fs.readFileSync('docs/content/site-master/A-Scales/batch-page-content.json','utf8'));
const before=JSON.parse(fs.readFileSync('checks/batches/03-scales/source-before.json','utf8').replace(/^\uFEFF/,''));
const out='checks/batches/03-scales';
const results=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const pitchClass={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function split(note){const m=note.match(/^([A-G])(#{1,2}|b{1,2})?$/);if(!m)throw Error(`Invalid note ${note}`);return {letter:m[1],accidental:m[2]||''};}
function accidental(value){return [...value].reduce((sum,symbol)=>sum+(symbol==='#'?1:-1),0);}
function pc(note){const {letter,accidental:a}=split(note);return (pitchClass[letter]+accidental(a)+24)%12;}
function midi(note){const m=note.match(/^([A-G](?:#{1,2}|b{1,2})?)(-?\d+)$/);return (Number(m[2])+1)*12+pc(m[1]);}
function steps(notes){return notes.slice(1).map((note,index)=>(pc(note)-pc(notes[index])+12)%12);}
const urls=['/scales','/scales/c-major','/scales/a-minor'];

for(const url of urls){
 const source=batch.pages.find(page=>page.url===url),page=master.pages[url];
 check(`${url} exists in master`,Boolean(page));
 check(`${url} matches A-Scales source page`,JSON.stringify(page)===JSON.stringify(source));
 check(`${url} template`,page.template_id===(url==='/scales'?'T11':'T12'),page.template_id);
 check(`${url} unpublished`,page.ready_for_publish===false&&page.deployment_status==='planning_only');
 check(`${url} metadata canonical`,page.metadata.canonical_path===url,page.metadata.canonical_path);
 for(const group of page.source_groups)check(`${url} source group ${group.id} has required output`,Boolean(group.required_output),group.required_output);
}

const center=master.pages['/scales'].data;
check('Center default is C major one octave RH ascending',JSON.stringify(center.default_selection)===JSON.stringify({tonic:'C',form:'major',range_octaves:1,hand:'right',direction:'ascending'}));
check('Center has fifteen major spellings',center.major_overview.length===15,center.major_overview.length);
check('Center has fifteen minor tonic records',center.minor_overview.length===15,center.minor_overview.length);
check('Center has four form comparisons',center.form_comparison.length===4,center.form_comparison.length);
check('Center print asset remains null',center.print_assets===null);
check('Center audio asset remains null',center.audio_assets===null);

for(const row of center.major_overview){
 const notes=[...row.notes,row.tonic];
 check(`Major ${row.tonic} uses seven distinct letters`,new Set(row.notes.map(note=>split(note).letter)).size===7,row.notes.join(' '));
 check(`Major ${row.tonic} semitone pattern`,JSON.stringify(steps(notes))===JSON.stringify([2,2,1,2,2,2,1]),steps(notes));
}

for(const row of center.minor_overview){
 for(const [form,up,down,pattern] of [
  ['natural',row.natural_ascending,row.natural_descending,[2,1,2,2,1,2,2]],
  ['harmonic',row.harmonic_ascending,row.harmonic_descending,[2,1,2,2,1,3,1]],
  ['melodic',row.melodic_classical_ascending,row.melodic_classical_descending,[2,1,2,2,2,2,1]],
 ]){
  check(`${row.tonic} ${form} has tonic endpoints`,up[0]===row.tonic&&up.at(-1)===row.tonic&&down[0]===row.tonic&&down.at(-1)===row.tonic);
  check(`${row.tonic} ${form} ascending pattern`,JSON.stringify(steps(up))===JSON.stringify(pattern),steps(up));
  check(`${row.tonic} ${form} descending is strictly descending in pitch class`,down.slice(1).every((note,index)=>((pc(down[index])-pc(note)+12)%12)>0));
 }
 check(`${row.tonic} melodic descent equals natural descent`,JSON.stringify(row.melodic_classical_descending)===JSON.stringify(row.natural_descending));
 check(`${row.tonic} center fingering remains null`,row.fingering===null);
}

const c=master.pages['/scales/c-major'].data;
check('C major only one octave fingering',c.fingering.octaves===1&&c.fingering.additional_octave_fingerings===null);
for(const hand of ['RH','LH'])for(const direction of ['ascending','descending']){
 const pitches=c.pitch_sequences[hand][direction],fingers=c.fingering[hand][direction];
 check(`C major ${hand} ${direction} eight pitches`,pitches.length===8,pitches.length);
 check(`C major ${hand} ${direction} eight fingers`,fingers.length===8,fingers.length);
 for(const item of pitches)check(`C major ${hand} ${direction} MIDI ${item.note}`,midi(item.note)===item.midi,item.midi);
}
check('C major RH ascending fingers',JSON.stringify(c.fingering.RH.ascending)===JSON.stringify([1,2,3,1,2,3,4,5]));
check('C major RH descending fingers',JSON.stringify(c.fingering.RH.descending)===JSON.stringify([5,4,3,2,1,3,2,1]));
check('C major LH ascending fingers',JSON.stringify(c.fingering.LH.ascending)===JSON.stringify([5,4,3,2,1,3,2,1]));
check('C major LH descending fingers',JSON.stringify(c.fingering.LH.descending)===JSON.stringify([1,2,3,1,2,3,4,5]));

const a=master.pages['/scales/a-minor'].data;
check('A minor has three forms',a.forms.length===3,a.forms.length);
check('A minor only one approved playback octave',JSON.stringify(a.approved_playback_octaves)===JSON.stringify([1]));
check('A minor hands-together fingering remains null',a.scope.hands_together_fingering===null);
check('A minor turnaround fingering remains null',a.scope.continuous_turnaround_fingering===null);
for(const form of a.forms){
 check(`${form.id} ascent and descent stay distinct source arrays`,Array.isArray(form.notes_ascending)&&Array.isArray(form.notes_descending));
 for(const hand of ['right','left'])for(const direction of ['ascending','descending']){
  const values=form.pitch_mapping[`${hand}_hand_${direction}_example`];
  check(`${form.id} ${hand} ${direction} eight mapped pitches`,values.length===8,values.length);
  for(const item of values)check(`${form.id} ${hand} ${direction} MIDI ${item.spelling}${item.written_octave}`,midi(`${item.spelling}${item.written_octave}`)===item.midi,item.midi);
 }
 check(`${form.id} ascending RH fingering source present`,form.fingering.ascending.right_hand.length===8);
 check(`${form.id} ascending LH fingering source present`,form.fingering.ascending.left_hand.length===8);
 check(`${form.id} descending RH fingering remains null`,form.fingering.descending.right_hand===null);
 check(`${form.id} descending LH fingering remains null`,form.fingering.descending.left_hand===null);
}
check('A melodic ascent differs from descent',JSON.stringify(a.forms[2].notes_ascending)!==JSON.stringify([...a.forms[2].notes_descending].reverse()));
check('A minor has seven natural-scale triads',a.natural_scale_chords.items.length===7,a.natural_scale_chords.items.length);

const keyboard=master.pages['/keyboard-notes'].data.layouts.find(layout=>layout.layout_id==='88-key-A0-C8');
for(const page of [c,...a.forms]){
 const mappings=page.pitch_sequences
  ? ['RH','LH'].flatMap(hand=>['ascending','descending'].map(direction=>page.pitch_sequences[hand][direction]))
  : ['right_hand_ascending_example','left_hand_ascending_example','right_hand_descending_example','left_hand_descending_example'].map(key=>page.pitch_mapping[key]);
 for(const sequence of mappings)for(const item of sequence){const value=item.note??`${item.spelling}${item.written_octave}`;check(`Scale pitch exists on 88-key layout: ${value}`,keyboard.keys.some(key=>key.midi===item.midi));}
}

for(const file of before.filter(item=>item.path.startsWith('docs/content/site-master/')||item.path.startsWith('docs/product/')||item.path.startsWith('docs/design/reference/'))){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex');
 check(`Read-only source unchanged: ${file.path}`,hash===file.sha256,hash);
}

const report={executed_at:new Date().toISOString(),runtime:process.version,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};
fs.writeFileSync(`${out}/data-validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Scale data: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode=report.failed?1:0;
