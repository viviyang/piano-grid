import fs from 'node:fs';
import ts from 'typescript';
const file='scripts/check-keyboard-completion.ts';
let code=fs.readFileSync(file,'utf8').replaceAll("'../src/","'"+new URL('../../src/',import.meta.url).href).replaceAll("'keyboard-completion'","'checks/product-system-p0-2026-09-22/final/keyboard-completion'").replaceAll("'keyboard-completion/test-results.json'","'checks/product-system-p0-2026-09-22/final/keyboard-completion/test-results.json'");
// Keep the original test assertions; only relocate imports/output into this evidence folder.
const temp=new URL('./keyboard-contract.generated.mjs',import.meta.url);fs.writeFileSync(temp,ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);await import(temp.href);

