import fs from 'node:fs';
const m=JSON.parse(fs.readFileSync('docs/pianogrid-chords-v2/evidence/models.json'));
const results=[];
const check=(name,ok)=>results.push({name,passed:!!ok});
const pc={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function midi(p){const match=/^([A-G])([#b♯♭]?)(-?\d+)$/.exec(p);if(!match)return NaN;return (+match[3]+1)*12+pc[match[1]]+(['#','♯'].includes(match[2])?1:['b','♭'].includes(match[2])?-1:0);}
for(const [url,model] of Object.entries(m)){
 const vs=url==='/chords'?model.items.map(i=>i.voicing):model.data.voicings;
 for(const v of vs){const ns=v.notes_low_to_high,ms=ns.map(n=>n.midi),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 check(`${url}/${v.voicing_id}: spelling=MIDI`,ns.every(n=>midi(n.display_pitch)===n.midi));
 check(`${url}/${v.voicing_id}: strictly ascending`,ms.every((x,i)=>i===0||x>ms[i-1]));
 check(`${url}/${v.voicing_id}: bass=lowest`,midi(v.bass_spelling)===ms[0]);
 check(`${url}/${v.voicing_id}: diagram and print`,eq(v.diagram.highlight_midi,ms)&&eq(v.print_data.highlight_midi,ms)&&eq(v.print_data.spelled_pitches,ns.map(n=>n.display_pitch)));
 check(`${url}/${v.voicing_id}: print spelling after glyph normalization`,eq(v.print_data.spelled_pitches.map(n=>n.replaceAll('♯','#').replaceAll('♭','b')),ns.map(n=>n.display_pitch.replaceAll('♯','#').replaceAll('♭','b')))&&eq(v.print_data.spelled_pitches.map(midi),ms));
 check(`${url}/${v.voicing_id}: audio pitches and frequencies`,['together','ascending'].every(mode=>eq(v.playback[mode].map(e=>e.midi),ms)&&v.playback[mode].every(e=>Math.abs(e.frequency_hz-440*2**((e.midi-69)/12))<0.001)));
 }
}
const report={scope:'Read-only model consistency; not human audition, fingering suitability, or production build approval',passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results};
fs.writeFileSync('docs/pianogrid-chords-v2/evidence/model-validation.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failed:report.failed,failures:results.filter(r=>!r.passed)}));
