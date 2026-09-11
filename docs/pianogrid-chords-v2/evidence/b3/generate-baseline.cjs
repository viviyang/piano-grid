const fs=require('node:fs');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const files=[
 'package.json','package-lock.json','next.config.ts','tsconfig.json',
 'docs/design/design-system.md','docs/design/tokens.json',
 'docs/content/chords/page-content.json','docs/content/site-master/page-content.master.json',
 'src/app/globals.css','src/app/layout.tsx','src/app/chords/page.tsx','src/app/chords/a-minor/page.tsx','src/app/chords/a-minor/a-minor.css','src/app/chords/a-major/page.tsx','src/app/chords/c-major/page.tsx',
 'src/styles/tokens.css','src/styles/foundation.css',
 'src/lib/utils.ts','src/lib/site-content.ts','src/lib/site-routes.ts','src/lib/a-minor-audio.ts','src/lib/a-minor-types.ts','src/lib/a-minor-content.ts','src/lib/chord-content.ts','src/lib/chord-detail-model.ts','src/lib/chord-learning-content.ts',
 'src/components/a-minor/experience.tsx','src/components/a-minor/icon.tsx','src/components/a-minor/page-search.tsx',
 'src/components/chords/site-chrome.tsx','src/components/chords/playback-controls.tsx','src/components/chords/keyboard-viewport.tsx','src/components/chords/print-voicing.tsx','src/components/chords/detail-page.tsx','src/components/chords/center-page.tsx','src/components/chords/center-experience.tsx','src/components/chords/page-toc.tsx','src/components/chords/shared.css','src/components/chords/center.css','src/components/chords/page-toc.css','src/components/chords/fingering-guide.tsx','src/components/chords/chord-builder-practice.tsx','src/components/chords/chord-learning.css',
 'src/components/site-navigation.tsx','src/components/site-navigation.css','src/components/ui/breadcrumb.tsx','src/components/ui/breadcrumb.css','src/components/ui/rolling-text.tsx',
 'scripts/check-foundation.mjs','scripts/check-content-adapters.mjs','scripts/check-a-minor.mjs','scripts/check-chord-b2.mjs','scripts/check-chord-b3.mjs','scripts/check-chord-batch.mjs',
 'docs/pianogrid-chords-v2/B3_RESULT.md','docs/pianogrid-chords-v2/implementation-log.md',
];
const sha256=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const status=execFileSync('git',['status','--short'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
const manifest={
 schemaVersion:1,
 generatedAt:new Date().toISOString(),
 headAtB3Start:'dd1b8849cd4c303c9ddebfe794758aa14354f507',
 head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 dirty:status.length>0,
 gitStatusShort:status,
 relevantFiles:files.map(path=>({path,sha256:sha256(path)})),
 finalEvidence:[
  'docs/pianogrid-chords-v2/B3_RESULT.md',
  'docs/pianogrid-chords-v2/evidence/b3/isolated-build.json',
  'docs/pianogrid-chords-v2/evidence/b3/adapter-validation.json',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/b3-validation.json',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/',
  'docs/pianogrid-chords-v2/evidence/b3/a-minor-regression-final/page-validation.json',
  'docs/pianogrid-chords-v2/evidence/b3/b2-regression/b2-validation.json',
  'docs/pianogrid-chords-v2/evidence/b3/chord-regression/page-validation.json',
  'checks/batches/07-site-integration/data-validation.json',
  'checks/batches/07-site-integration/validation.json'
 ],
 excluded:['.git/','.next/','.next-b3/','node_modules/','secrets','docs/pianogrid-chords-v2/evidence/b3/B3_BASELINE.json']
};
fs.writeFileSync('docs/pianogrid-chords-v2/evidence/b3/B3_BASELINE.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({generatedAt:manifest.generatedAt,head:manifest.head,dirty:manifest.dirty,statusEntries:status.length,hashedFiles:manifest.relevantFiles.length},null,2));
