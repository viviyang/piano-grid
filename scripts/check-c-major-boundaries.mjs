import { readFileSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const baseline=JSON.parse(readFileSync('checks/piano-design-system-fix/baseline-hashes.json','utf8').replace(/^\uFEFF/,''));
const allowed=new Set(['package.json','package-lock.json','src/app/chords/c-major/page.tsx']);
const results=Object.entries(baseline).filter(([path])=>!allowed.has(path)).map(([path,hash])=>({name:`Frozen: ${path}`,passed:sha(readFileSync(path))===hash.toLowerCase()}));
const source=JSON.parse(readFileSync('checks/batches/07-site-integration/source-before.json','utf8')).files;
const hashDifferences=[];
for(const entry of source){
  if(!/^(docs\/content\/site-master\/|docs\/product\/|docs\/design\/reference\/|docs\/design\/piano-final\/)/.test(entry.path)||entry.path==='docs/content/site-master/page-content.master.json')continue;
  const bytes=readFileSync(entry.path);if(sha(bytes)===entry.sha256)continue;
  const committed=execFileSync('git',['show',`HEAD:${entry.path}`],{maxBuffer:20*1024*1024});
  const onlyCRLF=sha(Buffer.from(bytes.toString('utf8').replaceAll('\r\n','\n')))===sha(committed);
  hashDifferences.push({path:entry.path,worktreeHash:sha(bytes),expectedHash:entry.sha256,committedHash:sha(committed),onlyCRLF,committedMatchesManifest:sha(committed)===entry.sha256});
}
const css=readFileSync('src/components/chords/c-major-pilot.css','utf8');
results.push({name:'No new literal palette, font family, semantic token definitions',passed:!/#(?:[0-9a-f]{3}){1,2}\b|font-family\s*:|--[\w-]+\s*:|:root/.test(css)});
const routes=execFileSync('git',['diff','--name-only','--','src/app'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
results.push({name:'Only C-major route changed',passed:routes.every(path=>path==='src/app/chords/c-major/page.tsx')});
const out={results,passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed).length,legacyIntegrationHashDifferences:hashDifferences};
writeFileSync('checks/piano-design-system-fix/boundaries.json',JSON.stringify(out,null,2));
console.log(`${out.passed} boundary checks passed, ${out.failed} failed. Legacy hash mismatches: ${hashDifferences.length}, all CRLF-only: ${hashDifferences.every(x=>x.onlyCRLF&&x.committedMatchesManifest)}`);
if(out.failed)process.exitCode=1;
