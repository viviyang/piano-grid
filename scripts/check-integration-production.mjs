import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const {chromium}=createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH||'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const master=JSON.parse(await readFile('docs/content/site-master/page-content.master.json','utf8'));
const base=process.env.PIANO_BASE_URL||'http://127.0.0.1:3001',out=process.env.PIANO_CHECK_OUT||'checks/batches/07-site-integration';
await mkdir(`${out}/screenshots`,{recursive:true});
const routes=['/','/tools','/chords','/chords/a-minor','/chords/a-major','/chords/c-major','/chords/g-major','/chords/c-minor','/chords/e-major','/chords/b-major','/chords/a-flat-major','/chords/c-flat-major','/chords/by-key','/chords/finder','/chord-progressions','/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/keyboard-notes/finger-numbers','/scales','/scales/c-major','/scales/a-minor','/songs','/songs/easy','/guide','/guide/read-sheet-music','/guide/piano-chords','/tools/blank-sheet-music'];
const homeTitle='Piano Chords, Scales & Practice Tools | PianoGrid';
const metadataTitleOverrides={
  '/chords/a-major':'A Major Piano Chord: Notes, Inversions & Keyboard Diagrams',
  '/chords/c-major':'C Major Piano Chord: Notes, Inversions & Keyboard Diagrams',
  '/guide':'How to Play Piano for Beginners: First Notes and Rhythm',
};
const forbidden=['/sheet-music','/tools/piano-cheat-sheet','/keyboard-notes/blank','/tools/anything'];
const results=[],errors=[];
const check=(name,passed,detail='')=>{results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:950}});
page.on('pageerror',error=>errors.push(error.message));

try{
  for(const route of routes){
    const response=await page.goto(base+route),html=await response.text(),source=master.pages[route],homeRoute=route==='/';
    check(`${route} production 200`,response.status()===200,response.status());
    check(`${route} production title`,await page.title()===(homeRoute?homeTitle:metadataTitleOverrides[route]||source.metadata.title));
    const robots=(await page.locator('meta[name=robots]').getAttribute('content'))||'';
    check(`${route} production index/follow`,robots.includes('index')&&robots.includes('follow')&&!robots.includes('noindex')&&!robots.includes('nofollow'),robots);
    check(`${route} production nav`,await page.locator(homeRoute?'.ph-brand[href="/"]':'.am-brand[href="/"]').count()===1&&await page.locator('.site-nav-desktop .site-nav-parent-link').count()===6&&await page.locator('.site-nav-desktop .site-nav-child-link').count()===16);
    check(`${route} excludes master payload`,!html.includes('source_usage_batches')&&!html.includes('retained_without_url')&&!html.includes('needed_to_resolve'));
  }
  await page.goto(base+'/');
  check('production home reference directory',await page.locator('.ph-reference-directory .ph-reference-group').count()===6&&await page.locator('.ph-reference-directory a[href]').count()===22);
  for(const route of ['/','/tools'])for(const width of [1440,390,320,768]){
    await page.setViewportSize({width,height:950});await page.goto(base+route);
    check(`${route} production responsive ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(width===1440||width===390){
      if(route==='/'){
        const heading=await page.locator('.ph-hero').evaluate(element=>{const h1=element.querySelector('h1'),style=getComputedStyle(h1),body=getComputedStyle(document.body),rect=element.getBoundingClientRect(),em=getComputedStyle(element.querySelector('h1 em'));return {fontSize:parseFloat(style.fontSize),lineHeight:parseFloat(style.lineHeight),fontFamily:style.fontFamily,bodyFontFamily:body.fontFamily,italic:em.fontStyle,viewportRatio:rect.height/innerHeight};});
        check(`${route} production PianoLab H1 hierarchy ${width}`,heading.fontSize>=(width===1440?58:39)&&heading.lineHeight/heading.fontSize<1.1,heading);
        check(`${route} production Foundation sans ${width}`,heading.fontFamily.includes('system-ui')&&heading.bodyFontFamily.includes('system-ui'),heading);
        check(`${route} production italic serif ${width}`,heading.italic==='italic',heading);
        check(`${route} production hero proportion ${width}`,heading.viewportRatio>.55&&heading.viewportRatio<1.35,heading);
        await page.locator('.ph-hero-image').evaluate(image=>image.complete?undefined:new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});}));
        check(`${route} production hero asset ${width}`,await page.locator('.ph-hero-image').evaluate(image=>image.complete&&image.naturalWidth>0&&image.naturalHeight>0));
        check(`${route} production illustrations ${width}`,await page.locator('.ph-task-illustration svg').count()===6&&await page.locator('.ph-collection-art,.ph-reading-art').count()===2&&await page.locator('.ph-grand-illustration svg').count()===1);
      }else{
        const heading=await page.locator('.in-heading').evaluate(element=>{const h1=element.querySelector('h1'),style=getComputedStyle(h1),rect=element.getBoundingClientRect();return {fontSize:style.fontSize,lineHeight:parseFloat(style.lineHeight),viewportRatio:rect.height/innerHeight};});
        const expectedSize=width===1440?'36px':'30px',expectedLeading=width===1440?44:36;
        check(`${route} production H1 size ${width}`,heading.fontSize===expectedSize,heading);
        check(`${route} production H1 leading ${width}`,Math.abs(heading.lineHeight-expectedLeading)<.01,heading);
        check(`${route} production compact heading ${width}`,heading.viewportRatio<.3,heading);
      }
    }
    await page.screenshot({path:`${out}/screenshots/production-${route==='/'?'home':'tools'}-${width}.png`,fullPage:true});
  }
  for(const route of forbidden)check(`production excludes ${route}`,(await page.request.get(base+route)).status()===404);
  const robotsResponse=await page.request.get(base+'/robots.txt'),robotsText=await robotsResponse.text();
  check('production robots allows indexing',robotsResponse.status()===200&&robotsText.includes('Allow: /')&&!robotsText.includes('Disallow: /')&&robotsText.includes('Sitemap: https://pianogrid.com/sitemap.xml'));
  const sitemapText=await (await page.request.get(base+'/sitemap.xml')).text();
  check('production sitemap contains all registered public routes',routes.every(route=>sitemapText.includes(`https://pianogrid.com${route}`))&&!sitemapText.includes('localhost'));
  for(const asset of ['/assets/home/east-lake-piano-hero.png','/assets/home/east-lake-grand-piano.webp','/reference/assets/blank-piano-staff-letter.pdf','/assets/guides/piano-starter-and-reading.pdf'])check(`production asset ${asset}`,(await page.request.get(base+asset)).status()===200);
  check('production has no runtime errors',errors.length===0,errors);
}finally{await browser.close();}

const report={executed_at:new Date().toISOString(),passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results};
await writeFile(`${out}/production-validation.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Integration production: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode=report.failed?1:0;
