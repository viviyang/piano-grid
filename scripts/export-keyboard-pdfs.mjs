import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
try{await mkdir('public/reference/generated/keyboard-notes',{recursive:true});const page=await browser.newPage();await page.goto((process.env.PIANO_BASE_URL||'http://127.0.0.1:3000')+'/keyboard-notes/labeled');await page.waitForFunction(()=>!document.querySelector('select').disabled);
for(const count of [88,61])for(const octaves of [true,false]){await page.getByLabel('Keyboard layout').selectOption(count===88?'88-key-A0-C8':'61-key-C2-C7');await page.getByLabel('Show octave numbers').setChecked(octaves);await page.pdf({path:`public/reference/generated/keyboard-notes/labeled-${count}-${octaves?'octaves':'letters'}.pdf`,format:'Letter',margin:{top:'16mm',bottom:'16mm',left:'16mm',right:'16mm'},printBackground:true});console.log(count,octaves);}
}finally{await browser.close();}
