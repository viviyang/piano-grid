import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3112';
const out = process.env.PIANO_CHECK_OUT || 'checks/songs-sheet-v2';
const routes = ['/songs','/songs/easy','/sheet-music','/sheet-music/easy','/sheet-music/beginner','/sheet-music/hot-cross-buns','/sheet-music/twinkle-twinkle-little-star','/sheet-music/ode-to-joy'];
const expected = {
  '/songs': ['Piano Songs: Choose Your Next Piece','Piano Songs: Choose a Version to Practice | PianoGrid'],
  '/songs/easy': ['Easy Piano Songs for Beginners','Easy Piano Songs & a 10-Minute Practice Plan | PianoGrid'],
  '/sheet-music': ['Piano Sheet Music','Piano Sheet Music: Versions and Access | PianoGrid'],
  '/sheet-music/easy': ['Easy Piano Sheet Music','Easy Piano Sheet Music: Check the Edition | PianoGrid'],
  '/sheet-music/beginner': ['Beginner Piano Sheet Music','Beginner Piano Sheet Music: Clear Versions and Access | PianoGrid'],
  '/sheet-music/hot-cross-buns': ['Hot Cross Buns Piano Sheet Music','Hot Cross Buns Piano Sheet Music: Edition & Access | PianoGrid'],
  '/sheet-music/twinkle-twinkle-little-star': ['Twinkle, Twinkle, Little Star Piano Sheet Music','Twinkle, Twinkle Piano Sheet Music: Edition & Plan | PianoGrid'],
  '/sheet-music/ode-to-joy': ['Ode to Joy Piano Sheet Music','Ode to Joy Piano Sheet Music: Edition & Access | PianoGrid'],
};
const ids = ['arr-ext-0a05b7954f5256','arr-ext-c3a78b0c5cb213','arr-ext-a60b8d92c5a325'];
const results=[]; const errors=[];
function check(name, passed, detail=''){results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);}
await mkdir(`${out}/screenshots`,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',error=>errors.push(error.message));
await page.addInitScript(()=>{window.__copied='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(value)=>{window.__copied=value;}}});});

try{
  for(const route of routes){
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    check(`${route} status 200`,response?.status()===200,String(response?.status()));
    check(`${route} one exact h1`,await page.locator('h1').count()===1&&await page.locator('h1').textContent()===expected[route][0],await page.locator('h1').allTextContents());
    check(`${route} title`,await page.title()===expected[route][1],await page.title());
    check(`${route} canonical`,await page.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${route}`,await page.locator('link[rel=canonical]').getAttribute('href'));
    check(`${route} index follow`,(await page.locator('meta[name=robots]').getAttribute('content')||'').replaceAll(' ','')==='index,follow',await page.locator('meta[name=robots]').getAttribute('content'));
    const schemas=page.locator('script[type="application/ld+json"]');
    check(`${route} one JSON-LD block`,await schemas.count()===1,String(await schemas.count()));
    const schemaText=await schemas.first().textContent();
    check(`${route} JSON-LD parses`,Boolean(schemaText)&&Boolean(JSON.parse(schemaText)['@type']),schemaText||'');
    check(`${route} no local media action`,await page.getByRole('button',{name:/Play demonstration|Print A4 score|Print US Letter score/}).count()===0);
    if(route.startsWith('/songs')){
      const cardStyle=await page.locator('.ss-version-card').first().evaluate(element=>{const style=getComputedStyle(element);return{padding:parseFloat(style.paddingTop),border:style.borderTopStyle,radius:parseFloat(style.borderTopLeftRadius)};});
      check(`${route} shared arrangement cards styled`,cardStyle.padding>0&&cardStyle.border!=='none'&&cardStyle.radius>0,JSON.stringify(cardStyle));
    }
    const html=await page.content();
    check(`${route} no staging path`,!html.includes('content-data/assets/')&&!html.includes('score-a4.pdf')&&!html.includes('demo.wav'));
    for(const width of [320,390,1440]){
      await page.setViewportSize({width,height:950});
      const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
      check(`${route} no overflow ${width}`,geometry.scroll<=geometry.width,JSON.stringify(geometry));
      await page.screenshot({path:`${out}/screenshots/${route.slice(1).replaceAll('/','-')||'home'}-${width}.png`,fullPage:true});
    }
  }

  await page.setViewportSize({width:1280,height:900});
  await page.goto(`${base}/songs/easy#pg-arr=${ids[1]}&segment=all`);
  await page.waitForFunction(()=>document.querySelector('.ss-restore-status')?.textContent==='Saved version selected.');
  check('valid share restores exact version',await page.locator(`#${ids[1]}:focus`).count()===1);
  await page.goto(`${base}/songs/easy#pg-arr=${ids[1]}&pg-arr=missing&segment=all`);
  await page.waitForFunction(()=>document.querySelector('.ss-restore-status')?.textContent?.includes('unavailable'));
  check('duplicate share rejected',(await page.locator('.ss-restore-status').textContent()).includes('unavailable'));
  await page.goto(`${base}/songs/easy#pg-arr=${ids[0]}&segment=all`);
  await page.locator(`#${ids[0]}`).getByRole('button',{name:'Copy this version link'}).click();
  const copied=await page.evaluate(()=>window.__copied);
  check('share copies exact canonical fragment',copied===`${base}/songs/easy#pg-arr=${ids[0]}&segment=all&speed=100`,copied);
  await page.goto(copied);
  await page.waitForFunction(()=>document.querySelector('.ss-restore-status')?.textContent==='Saved version selected.');
  check('generated external share restores with explicit default speed',await page.locator(`#${ids[0]}:focus`).count()===1);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new DOMException('Denied','NotAllowedError');}}}));
  await page.locator(`#${ids[1]}`).getByRole('button',{name:'Copy this version link'}).click();
  const fallback=page.locator(`#${ids[1]} input[aria-label="Exact version link to copy"]`);
  check('clipboard rejection exposes exact manual-copy URL',await fallback.count()===1&&await fallback.inputValue()===`${base}/songs/easy#pg-arr=${ids[1]}&segment=all&speed=100`,await fallback.count()?await fallback.inputValue():'missing');
  check('three named songs distinct',await page.locator('.ss-version-card').count()===3&&await page.locator('[data-arrangement-id]').evaluateAll(nodes=>new Set(nodes.map(node=>node.getAttribute('data-arrangement-id'))).size===3));
  check('original exercises not masquerading on page',await page.getByText(/Step and Hold|Left-Hand Answer|One Hand at a Time/).count()===0);
  check('existing nine featured versions retained',await page.locator('.sg-easy-chooser .sg-resource').count()===9,String(await page.locator('.sg-easy-chooser .sg-resource').count()));
  check('existing 50 collection tracks retained',await page.locator('.sg-catalog tbody tr').count()===50,String(await page.locator('.sg-catalog tbody tr').count()));

  await page.goto(`${base}/sheet-music/beginner`);
  check('P106 verified finger resource retained',await page.getByText('The inspected Amazing Grace Preparatory PDF prints starting finger numbers', {exact:false}).count()===1);
  check('three originals have separate locked status',await page.locator('[data-arrangement-id^="arr-pg-"][data-release-state="locked"]').count()===3,String(await page.locator('[data-arrangement-id^="arr-pg-"][data-release-state="locked"]').count()));
  check('locked originals expose no local actions',await page.getByRole('button',{name:/Play demonstration|Print A4 score|Print US Letter score/}).count()===0);
  await page.emulateMedia({media:'print'});
  check('share controls hidden in print',await page.locator('.ss-share').evaluateAll(nodes=>nodes.every(node=>getComputedStyle(node).display==='none')));
  await page.emulateMedia({media:'screen'});

  await page.goto(`${base}/sheet-music/twinkle-twinkle-little-star`);
  check('exact Twinkle edition shown once in primary',await page.locator(`.ss-primary [data-arrangement-id="${ids[1]}"]`).count()===1);
  check('separate letter tutorial preserved',await page.locator('[data-resource-id="d-twinkleletters"]').count()===1);
  await page.goto(`${base}/sheet-music/ode-to-joy`);
  check('Ode D major fact exact',await page.locator(`#${ids[2]}`).getByText('D major',{exact:true}).count()===1);
  check('no inferred Ode chords',!(await page.locator(`#${ids[2]}`).textContent()).includes('C / F / G'));
  await page.goto(`${base}/sheet-music`);
  check('historical Gymnopedie is not labeled checked',await page.locator('[data-resource-id="cr-18-1"] .sg-kicker').textContent()==='Preserved external reference — recheck before new claims');

  const sitemap=await (await page.request.get(`${base}/sitemap.xml`)).text();
  for(const route of routes)check(`sitemap ${route}`,sitemap.includes(`<loc>https://pianogrid.com${route}</loc>`));
  for(const route of ['/sheet-music/christmas','/songs/christmas']){
    const response=await page.request.get(base+route);
    check(`${route} remains unavailable`,response.status()===404,String(response.status()));
    check(`${route} absent sitemap`,!sitemap.includes(`<loc>https://pianogrid.com${route}</loc>`));
  }
  check('staging asset not web accessible',(await page.request.get(`${base}/content-data/assets/pg-step-and-hold-v1/score-a4.pdf`)).status()===404);
  await page.goto(`${base}/`);
  check('homepage Sheet Music destination released',await page.getByRole('link',{name:/Sheet Music/}).count()>0);
  check('desktop navigation has seven authorized sections',await page.locator('.site-nav-desktop .site-nav-parent-link').count()===7,String(await page.locator('.site-nav-desktop .site-nav-parent-link').count()));
  check('desktop navigation has thirty-one direct child links',await page.locator('.site-nav-desktop .site-nav-child-link').count()===31,String(await page.locator('.site-nav-desktop .site-nav-child-link').count()));
  await page.goto(`${base}/chords`);
  await page.waitForFunction(()=>!document.querySelector('.am-play-btn')?.disabled);
  check('Chords inherited route keeps 25 prepared results',await page.locator('.ch-result').count()===25,String(await page.locator('.ch-result').count()));
  check('Chords inherited A minor deep link remains',await page.locator('[data-chord-id="a-minor"] a[href="/chords/a-minor"]').count()===1);
  await page.goto(`${base}/scales`);
  check('Scales inherited route smoke',await page.locator('h1').count()===1&&await page.locator('.sc-tool').count()===1,await page.locator('h1').allTextContents());
  check('Scales inherited C major deep link remains',await page.locator('a[href="/scales/c-major"]').count()>0);
  await page.goto(`${base}/keyboard-notes`);
  check('Keyboard inherited route smoke',await page.locator('h1').textContent()==='Piano Keys and Notes');

  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  const nojsPage=await nojs.newPage();
  const nojsResponse=await nojsPage.goto(`${base}/sheet-music/beginner`);
  check('no-JS beginner content',nojsResponse?.status()===200&&await nojsPage.locator('h1').textContent()==='Beginner Piano Sheet Music'&&await nojsPage.locator('a[href^="https://www.hoffmanacademy.com/"]').count()>0);
  await nojs.close();
}finally{await browser.close();}

check('no page errors',errors.length===0,errors.join(' | '));
await writeFile(`${out}/browser-results.json`,JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,errors,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
process.exitCode=results.some(item=>!item.passed)?1:0;
