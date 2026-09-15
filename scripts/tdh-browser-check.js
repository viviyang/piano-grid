const results=[];
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
for (const width of [1440,390]) {
 await page.setViewportSize({width,height:900});
 for (const route of ['/','/tools','/songs','/keyboard-notes','/guide/read-sheet-music','/chords/finder','/scales/d-major']) {
  const response=await page.goto('http://127.0.0.1:3127'+route,{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  await expect(page.locator('h1')).toHaveCount(1);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  assert(!overflow,route+' overflow at '+width);
  results.push({route,width,title:await page.title(),h1:await page.locator('h1').innerText(),overflow});
 }
 await page.goto('http://127.0.0.1:3127/',{waitUntil:'networkidle'});
 if(width===1440){
  await page.getByRole('button',{name:'Open Learn menu',exact:true}).click();
  await expect(page.getByRole('link',{name:'Learn Piano Chords',exact:false}).first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Open Learn menu',exact:true})).toBeFocused();
 }else{
  await page.getByRole('button',{name:'Open navigation',exact:true}).click();
  await expect(page.getByRole('navigation',{name:'Mobile site sections'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Open navigation',exact:true})).toBeFocused();
 }
}
await page.goto('http://127.0.0.1:3127/chords/finder',{waitUntil:'networkidle'});
await page.setViewportSize({width:1440,height:900});
const active=await page.locator('.site-nav-desktop .site-nav-group[data-active] > .site-nav-parent-row .site-nav-parent-link').allTextContents();
const activeCount=await page.locator('.site-nav-desktop .site-nav-group[data-active]').count();
assert.equal(activeCount,1,'cross-links must not activate two parent sections');
assert.equal(errors.length,0,errors.join('\n'));
await page.goto('http://127.0.0.1:3127/',{waitUntil:'networkidle'});
return {results,errors,activeCount,active};
