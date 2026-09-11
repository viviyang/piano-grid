import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const { chromium }=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3101';
const out=process.env.PIANO_CHECK_OUT||'checks/chords-next-expansion';
fs.mkdirSync(`${out}/screenshots`,{recursive:true});
const pkg='docs/pianogrid-chords-next-expansion';
const manifest=JSON.parse(fs.readFileSync(`${pkg}/manifest.json`,'utf8'));
const routePlan=JSON.parse(fs.readFileSync(`${pkg}/02_routes/routes.master.json`,'utf8'));
const categories=['major','minor'].map(name=>JSON.parse(fs.readFileSync(`${pkg}/03_categories/${name}.page.json`,'utf8')));
const details=routePlan.N1.new_detail_urls.map(url=>JSON.parse(fs.readFileSync(`${pkg}/04_details_next/${url.split('/').at(-1)}.page.json`,'utf8')));
const expectedPublic=['/','/tools','/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/chords/g-major','/chords/c-minor','/chords/e-major','/chords/b-major','/chords/a-flat-major','/chords/c-flat-major','/chords/by-key','/chords/finder','/chord-progressions','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/keyboard-notes/finger-numbers','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy','/guide','/guide/read-sheet-music','/guide/piano-chords','/tools/blank-sheet-music',...routePlan.N1.new_category_urls,...routePlan.N1.new_detail_urls];
const advanced=routePlan.later_planned_category_urls;
const expectedMobile=['/chords','/chords/major','/chords/minor','/chords/by-key','/chord-progressions','/chords/finder','/guide/piano-chords','/keyboard-notes/finger-numbers'];
const results=[],runtimeErrors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const clean=value=>value.replace(/\s+/g,' ').trim();

for(const entry of manifest.files){
 const bytes=fs.readFileSync(`${pkg}/${entry.path}`);
 check(`Package manifest ${entry.path}`,bytes.length===entry.bytes&&hash(bytes)===entry.sha256,{bytes:bytes.length,sha256:hash(bytes)});
}
check('Package declares the 18-route N1 batch',manifest.N1_new_urls===18&&details.length===16&&categories.length===2);
for(const detail of details){
 const slug=detail.url.split('/').at(-1),source=`${pkg}/09_generated_assets/chord-${slug}`;
 for(const extension of ['pdf','svg']){
  const sourceBytes=fs.readFileSync(`${source}.${extension}`),publicBytes=fs.readFileSync(`public/reference/assets/chord-${slug}.${extension}`);
  check(`${slug} ${extension.toUpperCase()} exported byte-identically`,Buffer.compare(sourceBytes,publicBytes)===0&&sourceBytes.length>1000,sourceBytes.length);
 }
 const svg=fs.readFileSync(`${source}.svg`,'utf8');
 check(`${slug} SVG is self-contained and accessible`,svg.includes('role="img"')&&svg.includes('<title')&&svg.includes('<desc')&&!/<script|javascript:|<foreignObject|href\s*=\s*["']https?:/i.test(svg));
}

const browser=await chromium.launch({channel:'chrome',headless:true});
const observed=page=>{page.on('pageerror',error=>runtimeErrors.push(error.message));page.on('console',message=>{if(message.type()==='error')runtimeErrors.push(message.text())});};
try{
 for(const raw of details){
  const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:1280,height:900}}),slug=raw.url.split('/').at(-1);observed(page);
  const response=await page.goto(base+raw.url),html=await response.text(),main=clean(await page.locator('main').innerText());
  check(`${raw.url} HTTP/static HTML`,response.status()===200&&html.includes('<h1')&&!html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING'),response.status());
  check(`${raw.url} TDK/H1/canonical`,await page.title()===raw.title&&await page.locator('meta[name=description]').getAttribute('content')===raw.description&&clean(await page.locator('h1').innerText())===raw.h1&&await page.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
  check(`${raw.url} no meta keywords`,await page.locator('meta[name=keywords]').count()===0);
  check(`${raw.url} notes/formula/inversions in raw content`,raw.data.pitch_classes.every(note=>main.includes(note))&&main.includes(raw.data.formula_degrees.join('–'))&&await page.locator('.am-inversion-table tbody tr').count()===3);
  check(`${raw.url} no invented fingering`,await page.locator('.ch-finger-map,.ch-hand-switch').count()===0&&(await page.locator(`[data-block-id="${slug}-fingering-example"]`).innerText()).includes('No verified hand-number examples'));
  check(`${raw.url} PDF exposed and SVG available`,await page.locator(`a[href="/reference/assets/chord-${slug}.pdf"][download]`).count()===2&&(await page.request.get(`${base}/reference/assets/chord-${slug}.pdf`)).status()===200&&(await page.request.get(`${base}/reference/assets/chord-${slug}.svg`)).status()===200);
  const hrefs=await page.locator('main a[href^="/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href').split('#')[0]));
  for(const href of [...new Set(hrefs.filter(href=>!href.startsWith('/reference/')))])check(`${raw.url} link ${href}`,expectedPublic.includes(href)&&(await page.request.get(base+href)).status()===200,href);
  if(raw.url==='/chords/f-sharp-major')check('F-sharp written spelling is retained',main.includes('F♯')&&main.includes('A♯')&&main.includes('C♯')&&!main.includes('G-flat Major'));
  await page.close();
 }

 for(const raw of categories){
  const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:950}});observed(nojs);
  const response=await nojs.goto(base+raw.url),html=await response.text();
  check(`${raw.url} HTTP/static HTML`,response.status()===200&&html.includes('<h1')&&!html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING'));
  check(`${raw.url} TDK/H1/canonical`,await nojs.title()===raw.title&&await nojs.locator('meta[name=description]').getAttribute('content')===raw.description&&clean(await nojs.locator('h1').innerText())===raw.h1&&await nojs.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
  check(`${raw.url} full no-JS grid`,await nojs.locator('.ch-category-card').count()===12&&await nojs.locator('.ch-category-card[hidden]').count()===0);
  const cardLinks=await nojs.locator('.ch-category-card>a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
  check(`${raw.url} twelve live detail links`,cardLinks.length===12&&new Set(cardLinks).size===12&&cardLinks.every(href=>expectedPublic.includes(href)),cardLinks);
  check(`${raw.url} theory and direct answer in initial HTML`,html.includes(raw.direct_answer)&&raw.content_blocks.every(block=>html.includes(block.heading)&&html.includes(block.body)));
  const query=await nojs.goto(base+raw.url+'?root=C');
  check(`${raw.url} query does not create another canonical`,query.status()===200&&await nojs.locator('link[rel=canonical]').getAttribute('href')===`https://pianogrid.com${raw.url}`);
  await nojs.close();
  const page=await browser.newPage({viewport:{width:1440,height:950}});observed(page);await page.goto(base+raw.url);await page.waitForFunction(()=>!document.querySelector('.ch-root-chips button').disabled);
  const root=raw.root_order[3];await page.getByRole('button',{name:root,exact:true}).click();
  check(`${raw.url} root filter enhancement`,await page.locator('.ch-category-card:visible').count()===1&&await page.getByRole('button',{name:root,exact:true}).getAttribute('aria-pressed')==='true');
  await page.setViewportSize({width:1440,height:950});await page.screenshot({path:`${out}/screenshots/${raw.url.split('/').at(-1)}-1440.png`,fullPage:true});
  await page.getByRole('button',{name:'All',exact:true}).click();await page.setViewportSize({width:390,height:844});check(`${raw.url} mobile no overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/${raw.url.split('/').at(-1)}-390.png`,fullPage:true});
  await page.close();
 }

 const page=await browser.newPage({viewport:{width:1440,height:950}});observed(page);await page.goto(base+'/chords');
 check('Hub has 25 objects and 25 unique detail links',await page.locator('.ch-result').count()===25&&await page.locator('.ch-result a[href^="/chords/"]').count()===25&&new Set(await page.locator('.ch-result a[href^="/chords/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))).size===25);
 const hubLinks=await page.locator('.ch-result a[href^="/chords/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
 for(const href of hubLinks)check(`Hub detail ${href} resolves`,(await page.request.get(base+href)).status()===200);
 const chordGroup=page.locator('.site-nav-group').filter({has:page.locator('.site-nav-parent-link[href="/chords"]')});
 await chordGroup.hover();
 check('Desktop chord IA uses Browse Explore Learn groups',JSON.stringify(await chordGroup.locator('.site-nav-link-group h3').allTextContents())===JSON.stringify(['Browse','Explore','Learn']));
 const desktopChordHrefs=await chordGroup.locator('.site-nav-child-link').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
 const advancedNavCounts=await Promise.all(advanced.map(href=>page.locator(`.site-navigation a[href="${href}"]`).count()));
 check('Desktop chord IA excludes sample and advanced links',desktopChordHrefs.length===7&&desktopChordHrefs.every(href=>expectedMobile.slice(1).includes(href))&&advancedNavCounts.every(count=>count===0),{desktopChordHrefs,advancedNavCounts});
 const mobileSection=page.locator('.site-mobile-section').filter({has:page.locator('.site-mobile-parent[href="/chords"]')});
 const mobileHrefs=[await mobileSection.locator('.site-mobile-parent').getAttribute('href'),...await mobileSection.locator('.site-mobile-children a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))];
 check('Mobile chord IA exact order',JSON.stringify(mobileHrefs)===JSON.stringify(expectedMobile),mobileHrefs);
 for(const href of [...new Set(await page.locator('.site-nav-panel a[href],.site-mobile-nav a[href]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href'))))])check(`Navigation target ${href} resolves`,(await page.request.get(base+href)).status()===200);
 await page.screenshot({path:`${out}/screenshots/hub-1440.png`,fullPage:true});await page.setViewportSize({width:390,height:844});check('Hub mobile no overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/screenshots/hub-390.png`,fullPage:true});
 const sitemapText=await (await page.request.get(base+'/sitemap.xml')).text();
 const sitemapPaths=[...sitemapText.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map(match=>match[1]||'/');
 check('Sitemap equals the 46-route registry',sitemapPaths.length===46&&JSON.stringify([...sitemapPaths].sort())===JSON.stringify([...expectedPublic].sort()),sitemapPaths);
 for(const href of advanced){check(`${href} remains deferred`,(await page.request.get(base+href)).status()===404&&!sitemapPaths.includes(href));}
 check('No runtime or hydration errors',runtimeErrors.length===0,runtimeErrors);
 await page.close();
}catch(error){check('N1 browser validation completed',false,error.stack)}finally{await browser.close();}
const report={executed_at:new Date().toISOString(),base,passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,route_counts:{planned_chord_system:33,published_site_sitemap:46,next_static_outputs:51,explanation:'The Next build output includes framework and metadata routes and groups the 16 generated details beneath one dynamic route entry; sitemap.xml lists only the 46 public business URLs.'},results,manual_checks:['real mobile/tablet touch','screen reader','human listening','physical printing','PDF tag accessibility','independent piano-teacher review']};
fs.writeFileSync(`${out}/validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Chords N1 expansion: ${report.passed} passed, ${report.failed} failed.`);process.exitCode=report.failed?1:0;
