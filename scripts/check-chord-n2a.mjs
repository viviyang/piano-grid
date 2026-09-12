import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const results=[];
const check=(name,fn)=>{try{fn();results.push({name,passed:true});}catch(error){results.push({name,passed:false,error:error.message});console.error('FAIL',name,error.message);}};
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'pianogrid-chord-n2a-'));

function compile(name){
  const source=fs.readFileSync(`src/lib/${name}.ts`,'utf8');
  const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  const target=path.join(temp,`${name}.mjs`);
  fs.writeFileSync(target,output);
  return target;
}

try{
  const family=await import(pathToFileURL(compile('chord-family-model')));
  const fixtureDocument=JSON.parse(fs.readFileSync('docs/pianogrid-chords-next-expansion/07_model/three-note-family-fixtures.N2A.json','utf8'));
  const taxonomy=JSON.parse(fs.readFileSync('docs/pianogrid-chords-next-expansion/07_model/chord-quality-taxonomy.json','utf8'));
  const categories=JSON.parse(fs.readFileSync('docs/pianogrid-chords-next-expansion/03_categories/category-pages.master.json','utf8'));
  check('N2A fixture document stays data-only',()=>{
    assert.equal(fixtureDocument.schemaVersion,'three-note-family-fixtures-n2a-1.0');
    assert.equal(fixtureDocument.status,'data_only_not_published');
    assert.equal(JSON.stringify(fixtureDocument).includes('"url"'),false);
  });
  check('N2A covers exactly diminished, augmented, sus2, and sus4',()=>{
    assert.deepEqual(fixtureDocument.fixtures.map(item=>item.subtype).sort(),['augmented','diminished','sus2','sus4']);
  });
  for(const fixture of fixtureDocument.fixtures){
    check(`${fixture.subtype} fixture resolves through family validator`,()=>{
      const definition=family.validateThreeNoteFamilyFixture(fixture);
      assert.equal(definition.expectedNoteCount,3);
      assert.equal(definition.expectedPositionCount,3);
      assert.ok(definition.categoryRoute.startsWith('/chords/'));
      assert.ok(definition.categoryLabel.endsWith('Chords'));
    });
  }
  check('Family specs match the supplied quality taxonomy',()=>{
    const normalize=value=>value.replaceAll('♭','b').replaceAll('♯','#');
    const planned=new Map(taxonomy.next_model.filter(item=>['diminished','augmented','sus2','sus4'].includes(item.id)).map(item=>[item.id,item.formula.map(normalize)]));
    for(const subtype of ['diminished','augmented','sus2','sus4'])assert.deepEqual(family.resolveThreeNoteDefinition(subtype).formulaDegrees,planned.get(subtype));
  });
  check('Family specs match category planning formulas',()=>{
    const normalize=value=>value.replaceAll('♭','b').replaceAll('♯','#');
    const expected={
      diminished:categories.find(item=>item.id==='diminished').formula.map(normalize),
      augmented:categories.find(item=>item.id==='augmented').formula.map(normalize),
      sus2:categories.find(item=>item.id==='suspended').formula_families.sus2.map(normalize),
      sus4:categories.find(item=>item.id==='suspended').formula_families.sus4.map(normalize),
    };
    for(const [subtype,formula] of Object.entries(expected))assert.deepEqual(family.resolveThreeNoteDefinition(subtype).formulaDegrees,formula);
  });
  check('Corrupt family formula fails closed',()=>{
    const bad=structuredClone(fixtureDocument.fixtures[0]);bad.semitonesFromRoot=[0,3,7];
    assert.throws(()=>family.validateThreeNoteFamilyFixture(bad));
  });
  check('Missing inversion fails closed',()=>{
    const bad=structuredClone(fixtureDocument.fixtures[1]);bad.positions.pop();
    assert.throws(()=>family.validateThreeNoteFamilyFixture(bad));
  });
  check('Bass and written spelling drift fail closed',()=>{
    const badBass=structuredClone(fixtureDocument.fixtures[2]);badBass.positions[1].bassSpelling='F4';
    assert.throws(()=>family.validateThreeNoteFamilyFixture(badBass));
    const badSpelling=structuredClone(fixtureDocument.fixtures[3]);badSpelling.positions[0].notesLowToHigh[1].displayPitch='E♯4';
    assert.throws(()=>family.validateThreeNoteFamilyFixture(badSpelling));
  });
  check('Unverified fingering cannot enter an N2A fixture',()=>{
    const bad=structuredClone(fixtureDocument.fixtures[0]);bad.fingeringStatus='verified_examples';
    assert.throws(()=>family.validateThreeNoteFamilyFixture(bad));
  });
  const routes=await import(pathToFileURL(compile('site-routes')));
  check('N2A model remains compatible with the N2B publication boundary',()=>{
    const published=['/chords/suspended','/chords/diminished','/chords/augmented'];
    const deferred=['/chords/seventh','/chords/extended','/chords/add','/chords/altered'];
    assert.equal(routes.PUBLIC_ROUTES.length,97);
    assert.equal(published.every(route=>routes.PUBLIC_ROUTES.includes(route)),true);
    assert.equal(deferred.some(route=>routes.PUBLIC_ROUTES.includes(route)),false);
  });
}finally{
  fs.rmSync(temp,{recursive:true,force:true});
}

const report={passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};
console.log(`Chord N2A model: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode=report.failed?1:0;
