import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const out='docs/pianogrid-chords-v2/evidence/b2';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const phase=process.argv[2]||'before';
const files=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean).filter(path=>!path.startsWith(out+'/'));
const hashes=Object.fromEntries(files.filter(path=>fs.existsSync(path)).map(path=>[path,crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex')]));
const report={phase,head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),status:git('status','--short'),hashes};
if(phase==='after'){
  const before=JSON.parse(fs.readFileSync(`${out}/workspace-before.json`));
  report.changedExisting=Object.keys(before.hashes).filter(path=>before.hashes[path]!==hashes[path]);
  report.newFiles=Object.keys(hashes).filter(path=>!(path in before.hashes));
}
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(`${out}/workspace-${phase}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({phase,changedExisting:report.changedExisting,newFiles:report.newFiles}));
