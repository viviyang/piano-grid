// Browser-owned Tabbit program; no production writes.
const fs=await import('node:fs/promises');
const results=[],errors=[],screenshots=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
async function check(name,fn){try{await fn();results.push({name,passed:true});}catch(e){results.push({name,passed:false,error:String(e)});}}
const base='http://127.0.0.1:3142';
await page.setViewportSize({width:1440,height:1000});
await page.goto(base+'/chords/c-major',{waitUntil:'networkidle'});
await check('C major inversion',async()=>{
 await page.locator('input[name="position"]').nth(1).check();
 await expect(page.locator('.cp-pilot')).toHaveAttribute('data-position','First inversion');
});
await check('C major keyboard practice and answer checker',async()=>{
 await page.getByRole('button',{name:'Start practice',exact:true}).click();
 for(const midi of [60,64,67]){
  const key=page.locator(`button[data-midi="${midi}"]`);await key.focus();await key.press('Space');await expect(key).toHaveAttribute('aria-pressed','true');
 }
 await page.getByRole('button',{name:'Check answer',exact:true}).click();
 await expect(page.locator('#practice')).toHaveAttribute('data-practice-state','correct');
 await page.getByRole('button',{name:'Try again',exact:true}).click();
 await page.getByRole('button',{name:'Show answer',exact:true}).click();
 await expect(page.locator('#practice')).toHaveAttribute('data-practice-state','revealed');
});
await page.goto(base+'/scales/c-major',{waitUntil:'networkidle'});
await check('Scale hand and direction',async()=>{
 await page.getByRole('combobox',{name:'Hand',exact:true}).selectOption('LH');
 await page.getByRole('combobox',{name:'Direction',exact:true}).selectOption('descending');
 await expect(page.getByRole('combobox',{name:'Hand',exact:true})).toHaveValue('LH');
 await expect(page.getByRole('combobox',{name:'Direction',exact:true})).toHaveValue('descending');
});
await page.goto(base+'/keyboard-notes/labeled',{waitUntil:'networkidle'});
await check('Labeled keyboard layout and octave labels',async()=>{
 const select=page.locator('select').first();
 const values=await select.locator('option').evaluateAll(xs=>xs.map(x=>x.value));
 await select.selectOption(values.at(-1));await expect(select).toHaveValue(values.at(-1));
 await page.getByRole('checkbox',{name:'Octave numbers',exact:true}).uncheck();
 await expect(page.getByRole('checkbox',{name:'Octave numbers',exact:true})).not.toBeChecked();
 const pdf=page.locator('a.kn-labeled-desktop-only[download]');
 assert.match(await pdf.getAttribute('href'),/letters\.pdf$/);
 await expect(pdf).toHaveAccessibleName(/Download PDF of .* labeled keys/);
});
await check('Labeled reference collapse keyboard state',async()=>{
 const toggle=page.getByRole('button',{name:'View the full reference',exact:true});
 await toggle.focus();await toggle.press('Enter');await expect(toggle).toHaveAttribute('aria-expanded','false');
 await toggle.press('Enter');await expect(toggle).toHaveAttribute('aria-expanded','true');
});
const routes=['/','/chords','/chords/c-major','/scales/c-major','/arpeggios','/keyboard-notes/labeled',...['add','augmented','diminished','major','minor','seventh','suspended'].map(x=>`/chords/${x}`)];
for(const url of routes){
 await page.goto(base+url,{waitUntil:'networkidle'});
 await check(`${url} landmarks, labels and mobile overflow`,async()=>{
  assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('h1').count(),1);
  const missing=await page.locator('[aria-labelledby]').evaluateAll(xs=>xs.flatMap(e=>e.getAttribute('aria-labelledby').split(/\s+/).filter(id=>!document.getElementById(id))));assert.equal(missing.length,0);
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 });
 if(url==='/chords'){
  const path=artifactPath('after-card-390.png');await page.locator('.ch-result').first().screenshot({path});screenshots.push(path);
 }
 await page.setViewportSize({width:1440,height:1000});
}
const path=artifactPath('regression.json');await fs.writeFile(path,JSON.stringify({results,errors,screenshots},null,2));
return {path,results,errors,screenshots};
