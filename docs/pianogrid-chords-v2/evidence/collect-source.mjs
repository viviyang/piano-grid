import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
const out='docs/pianogrid-chords-v2/evidence';
// Review-only executable copies; production files are only read.
fs.mkdirSync(`${out}/adapter`,{recursive:true});
for(const name of ['chord-content','a-minor-content','site-content','site-routes']){
 const source=fs.readFileSync(`src/lib/${name}.ts`,'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
 fs.writeFileSync(`${out}/adapter/${name}.mjs`,js);
}
const chord=await import('./adapter/chord-content.mjs'),am=await import('./adapter/a-minor-content.mjs');
const models={'/chords':chord.getChordCenter(),'/chords/a-minor':am.getAMinorContent(),'/chords/a-major':chord.getChordDetail('/chords/a-major'),'/chords/c-major':chord.getChordDetail('/chords/c-major')};
fs.writeFileSync(`${out}/models.json`,JSON.stringify(models,null,2));
const records=[];
for(const route of Object.keys(models)){
 const name=route.slice(1).replaceAll('/','--');
 for(const [label,base] of [['local','http://127.0.0.1:3000'],['live','https://pianogrid.com']]){
  try{const r=await fetch(base+route);const html=await r.text();fs.writeFileSync(`${out}/${label}-${name}.html`,html);records.push({route,label,status:r.status,headers:Object.fromEntries(r.headers),sha256:crypto.createHash('sha256').update(html).digest('hex')});}catch(e){records.push({route,label,error:String(e)});}
 }
}
fs.writeFileSync(`${out}/http.json`,JSON.stringify(records,null,2));
console.log(JSON.stringify({models:Object.keys(models),http:records.map(({route,label,status,error})=>({route,label,status,error}))}));
