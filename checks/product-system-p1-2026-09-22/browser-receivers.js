await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
await page.addInitScript(()=>{window.__events=[];window.addEventListener('pianogrid:product-event',e=>window.__events.push(e.detail));window.print=()=>{window.dispatchEvent(new Event('beforeprint'));};});
page.setDefaultTimeout(7000);const results=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
async function check(name,fn){try{await fn();results.push({name,passed:true});}catch(e){results.push({name,passed:false,error:String(e).slice(0,800)});}}
const base='http://127.0.0.1:4350';
await page.goto(base+'/chords/finder',{waitUntil:'domcontentloaded'});
await check('Finder C/E/G bass E -> same chord first inversion',async()=>{for(const name of ['C','E','G'])await page.getByRole('button',{name,exact:true}).click();await page.getByLabel('Lowest note (optional)').selectOption('4');await page.locator('[data-chord-id="c-major"] a').click();await expect(page.locator('.cp-workspace')).toHaveAttribute('data-voicing-id','c-major--first');await expect(page.getByText(/Selected chord restored/)).toBeVisible();});
await check('refresh preserves receiver bass',async()=>{await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('.cp-workspace')).toHaveAttribute('data-voicing-id','c-major--first');});
await check('back restores Finder notes without a fake tool_start',async()=>{await page.goBack({waitUntil:'domcontentloaded'});for(const name of ['C','E','G'])await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');await expect(page.getByLabel('Lowest note (optional)')).toHaveValue('4');assert.equal(await page.evaluate(()=>window.__events.filter(e=>e.name==='p0_tool_start').length),0);});
await page.goto(base+'/chords/c-major?pg-object=c-major&pg-bass=2',{waitUntil:'domcontentloaded'});
await check('unsupported bass explicitly resets reference',async()=>{await expect(page.getByText(/requested bass is not available/)).toBeVisible();await expect(page.locator('.cp-workspace')).toHaveAttribute('data-voicing-id','c-major--root');});
await page.goto(base+'/chords/extended#ref-d-dominant9',{waitUntil:'domcontentloaded'});
await check('nondefault extended fragment selects the matching object',async()=>{await expect(page.locator('.cc-preview h3')).toContainText('D dominant 9th');await expect(page.locator('#ref-d-dominant9 button')).toHaveAttribute('aria-pressed','true');});
await page.goto(base+'/chord-progressions#progression-basic-cadence-c-major',{waitUntil:'domcontentloaded'});
await check('nondefault progression fragment sets pattern and key together',async()=>{await expect(page.getByLabel('Key context',{exact:true})).toHaveValue('basic-cadence-c-major');await expect(page.locator('[data-example="basic-cadence-c-major"]')).toBeVisible();});
await page.goto(base+'/chords/c-major',{waitUntil:'domcontentloaded'});
await check('C major -> named key -> progression preserves context',async()=>{await page.getByRole('link',{name:'See C major in its key context',exact:true}).click();await expect(page.getByLabel('Key',{exact:true})).toHaveValue('C major');await page.getByRole('link',{name:'Hear a progression in this C major context',exact:true}).click();await expect(page.getByLabel('Key context',{exact:true})).toHaveValue('pop-four-c-major');});
const path=artifactPath('p1-receivers.json');await(await import('node:fs/promises')).writeFile(path,JSON.stringify({results,errors},null,2));return {path,results,errors};
