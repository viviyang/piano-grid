import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.PIANO_PLAYWRIGHT_PATH;
if (!playwrightPath) throw new Error('Set PIANO_PLAYWRIGHT_PATH to the installed Playwright package before running browser QA.');
const { chromium } = require(playwrightPath);
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3120';
const out = process.env.PIANO_CHECK_OUT || 'practical-tools';
await mkdir(`${out}/screenshots`,{recursive:true});
const results=[]; const errors=[];
function check(name,passed,detail=''){results.push({name,passed:Boolean(passed),detail});if(!passed)console.error('FAIL',name,detail);}
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.addInitScript(()=>{window.__practiceNow=1_000_000;Date.now=()=>window.__practiceNow;});
const page=await context.newPage();
page.on('pageerror',error=>errors.push(error.message));

try{
  let response=await page.goto(`${base}/tools`,{waitUntil:'networkidle'});
  check('/tools status 200',response?.status()===200,String(response?.status()));
  check('/tools exact h1',await page.locator('h1').textContent()==='Piano Tools and Printables',await page.locator('h1').textContent());
  check('/tools exact title',await page.title()==='Piano Tools: Notes, Chords, Scales & Printables | PianoGrid',await page.title());
  check('/tools exact description',await page.locator('meta[name=description]').getAttribute('content')==='Find piano notes, identify chords, match scales, use a simple practice timer, and download printable piano references from one task-based hub.');
  check('/tools canonical',await page.locator('link[rel=canonical]').getAttribute('href')==='https://pianogrid.com/tools');
  check('/tools index follow',(await page.locator('meta[name=robots]').getAttribute('content')||'').replaceAll(' ','')==='index,follow');
  check('find group six unique cards',await page.locator('[aria-labelledby="in-find-title"] .in-tool-task-card').count()===6);
  check('practice group four unique cards',await page.locator('[aria-labelledby="in-practice-title"] .in-tool-task-card').count()===4);
  check('print group four unique cards',await page.locator('[aria-labelledby="in-printables-title"] .in-print-card').count()===4);
  check('old duplicate reading absent',await page.locator('main .in-reading').count()===0);
  for(const href of ['/keyboard-notes','/keyboard-notes/chart','/chords','/chords/finder','/scales','/scales#find-by-notes','/scales#follow-along','/tools#practice-timer','/keyboard-notes#note-trainer','/chord-progressions','/tools/blank-sheet-music','/keyboard-notes/labeled']) check(`task link ${href}`,await page.locator(`main a[href="${href}"]`).count()>=1,String(await page.locator(`main a[href="${href}"]`).count()));
  check('no generic metronome card',await page.getByText('Metronome',{exact:true}).count()===0);
  check('boundary copy exact',await page.getByText('This timer tracks elapsed practice time. It does not set tempo or listen to your piano.',{exact:true}).count()===1);
  check('timer default 10:00',await page.getByRole('timer').textContent()==='10:00');
  check('five timer presets',await page.locator('.in-timer-presets button').count()===5);
  await page.getByRole('button',{name:'5 min',exact:true}).focus(); await page.keyboard.press('Space');
  check('preset keyboard activation changes countdown',await page.getByRole('timer').textContent()==='05:00');
  const custom=page.getByLabel('Custom minutes');
  await custom.fill('0');
  check('invalid custom explains range',await page.getByText('Enter a whole number from 1 to 120.',{exact:true}).count()===1&&await page.getByRole('button',{name:'Start',exact:true}).isDisabled());
  await custom.fill('1');
  await page.getByRole('button',{name:'Start',exact:true}).focus(); await page.keyboard.press('Enter');
  check('start enters running',await page.getByText('running',{exact:true}).count()===1&&await page.getByRole('button',{name:'Pause',exact:true}).count()===1);
  const startAnnouncement=await page.locator('.in-timer-announcement').textContent();
  await page.evaluate(()=>{window.__practiceNow+=1_100;}); await page.waitForTimeout(350);
  check('countdown renders elapsed second',await page.getByRole('timer').textContent()==='00:59',await page.getByRole('timer').textContent());
  check('countdown does not spam live announcement',await page.locator('.in-timer-announcement').textContent()===startAnnouncement);
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  const paused=await page.getByRole('timer').textContent();
  await page.evaluate(()=>{window.__practiceNow+=10_000;}); await page.waitForTimeout(350);
  check('pause preserves remaining',await page.getByRole('timer').textContent()===paused);
  await page.getByRole('button',{name:'Resume',exact:true}).click();
  check('resume returns running',await page.getByRole('button',{name:'Pause',exact:true}).count()===1);
  await page.getByRole('button',{name:'Reset',exact:true}).focus(); await page.keyboard.press('Enter');
  check('reset returns selected full duration',await page.getByRole('timer').textContent()==='01:00'&&await page.getByRole('button',{name:'Start',exact:true}).count()===1);
  await page.getByRole('button',{name:'Start',exact:true}).click();
  await page.evaluate(()=>{window.__practiceNow+=60_500;}); await page.waitForTimeout(350);
  check('time jump completes once',await page.getByText('Practice block complete.',{exact:true}).count()===1&&await page.getByRole('timer').textContent()==='00:00');
  check('completion actions',await page.getByRole('button',{name:'Start again',exact:true}).count()===1&&await page.getByRole('button',{name:'Reset',exact:true}).count()===1);
  await page.getByRole('button',{name:'Start again',exact:true}).click();
  check('start again uses full selected duration',await page.getByRole('timer').textContent()==='01:00');

  for(const width of [320,360,390,1440]){
    await page.setViewportSize({width,height:950}); await page.goto(`${base}/tools`,{waitUntil:'networkidle'});
    const geometry=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
    check(`/tools no overflow ${width}`,geometry.scroll<=geometry.width,JSON.stringify(geometry));
    await page.screenshot({path:`${out}/screenshots/tools-${width}.png`,fullPage:true});
  }

  const owners=[
    ['/chords/finder','Piano Chord Finder'],['/scales','Piano Scales'],['/keyboard-notes','Piano Keys and Notes'],
    ['/tools/blank-sheet-music','Blank Piano Sheet Music'],['/chord-progressions','Piano Chord Progressions'],
  ];
  await page.setViewportSize({width:1280,height:900});
  for(const [route,h1] of owners){response=await page.goto(base+route,{waitUntil:'networkidle'});check(`${route} status 200`,response?.status()===200,String(response?.status()));check(`${route} owner h1`,await page.locator('h1').textContent()===h1,await page.locator('h1').textContent());}
  await page.goto(`${base}/scales#find-by-notes`);check('scale finder stable anchor',await page.locator('#find-by-notes').count()===1);await page.goto(`${base}/scales#follow-along`);check('scale pulse stable anchor',await page.locator('#follow-along').count()===1);
  await page.goto(`${base}/keyboard-notes#note-trainer`);check('Note Trainer owner anchor',await page.locator('#note-trainer').count()===1&&await page.locator('#note-trainer h2').textContent()==='Find your way around the keys.');
  await page.goto(`${base}/tools/blank-sheet-music`);check('Blank exact title',await page.title()==='Blank Piano Sheet Music PDF — Letter & A4 | PianoGrid',await page.title());check('Blank size choices',await page.locator('input[name="paper"]').count()===2);for(const asset of ['/reference/assets/blank-piano-staff-letter.pdf','/reference/assets/blank-piano-staff-a4.pdf'])check(`${asset} status 200`,(await page.request.get(base+asset)).status()===200);
  const sitemap=await (await page.request.get(`${base}/sitemap.xml`)).text();
  check('sitemap has no fragment/query',!sitemap.includes('#')&&!/<loc>[^<]*\?/.test(sitemap));
  check('sitemap keeps tools routes',sitemap.includes('<loc>https://pianogrid.com/tools</loc>')&&sitemap.includes('<loc>https://pianogrid.com/tools/blank-sheet-music</loc>'));
}catch(error){check('browser suite completed',false,error.stack||String(error));}
finally{await browser.close();}
check('no page errors',errors.length===0,errors.join(' | '));
await writeFile(`${out}/browser-results.json`,JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,errors,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
process.exitCode=results.some(item=>!item.passed)?1:0;
