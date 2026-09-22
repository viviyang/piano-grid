const fs=await import('node:fs/promises');const results=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
async function check(name,fn){try{await fn();results.push({name,passed:true});}catch(e){results.push({name,passed:false,error:String(e)});}}
for(const [url,kind,notes] of [['/scales/c-major','scale',['C','D','E','F','G','A','B']],['/arpeggios','arpeggio',['C','E','G']]]){
 await page.goto('http://127.0.0.1:4349'+url,{waitUntil:'domcontentloaded'});
 await check(`${url} audio start/stop`,async()=>{
  await page.getByRole('button',{name:`Play ${kind}`,exact:true}).click();
  const stop=page.locator('.sc-actions').getByRole('button',{name:'Stop',exact:true});await expect(stop).toBeEnabled();await stop.click();
  await expect(page.locator('.sc-actions [role="status"]')).toContainText('Playback stopped');
 });
 await check(`${url} note checker`,async()=>{
  for(const name of notes){const key=page.locator('.sc-pitch-buttons').getByRole('button',{name,exact:true});await key.focus();await key.press('Space');await expect(key).toHaveAttribute('aria-pressed','true');}
  await page.getByRole('button',{name:'Check answer',exact:true}).click();await expect(page.locator('.sc-quiz-panel .sc-feedback')).toContainText('Correct');
 });
 await check(`${url} practice start/reset`,async()=>{
  await page.getByRole('button',{name:'Start practice',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state',/counting|playing/);
  await page.getByRole('button',{name:'Stop and reset',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','idle');
 });
 await check(`${url} print snapshot`,async()=>{
  await page.evaluate(()=>{window.print=()=>window.dispatchEvent(new Event('beforeprint'));});
  await page.getByRole('button',{name:`Print current ${kind}`,exact:true}).click();
  await page.emulateMedia({media:'print'});await expect(page.locator('.sc-print-only')).toBeVisible();await page.emulateMedia({media:'screen'});
  await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
 });
}
await page.goto('http://127.0.0.1:4349/',{waitUntil:'domcontentloaded'});
await check('Home audio and motion controls',async()=>{
 const stage=page.locator('.ph-piano-stage');await stage.getByRole('button',{name:'Hear A minor',exact:true}).click();await expect(stage).toHaveAttribute('data-audio-state','playing');
 await stage.getByRole('button',{name:'Stop sound',exact:true}).click();
 const motion=stage.locator('.ph-motion-button'),state=await motion.getAttribute('aria-pressed');await motion.click();assert.notEqual(await motion.getAttribute('aria-pressed'),state);
});
const path=artifactPath('audio-practice-print.json');await fs.writeFile(path,JSON.stringify({results,errors},null,2));return {path,results,errors};

