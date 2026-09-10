from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_config import chromium_options
import json,subprocess,sys
R=Path(__file__).resolve().parent.parent
with sync_playwright() as p:
 b=p.chromium.launch(**chromium_options())
 if not (R/'assets/a-minor-notes-inversions.pdf').exists() or '--refresh-pdf' in sys.argv:
  page=b.new_page()
  page.set_content((R/'source/pdf-layout.html').read_text(),wait_until='load')
  page.pdf(path=str(R/'assets/a-minor-notes-inversions.pdf'),format='Letter',print_background=True,prefer_css_page_size=True,display_header_footer=False)
  page.close()
 subprocess.run([sys.executable,str(R/'source/build.py')],check=True)
 measures=[]
 for w,h in [(1440,1000),(390,844),(320,800),(360,800),(768,1024),(1024,900)]:
  page=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  page.set_content((R/'index.html').read_text(),wait_until='load'); page.wait_for_timeout(250)
  page.screenshot(path=str(R/f'previews/final-{w}-top.png'))
  page.screenshot(path=str(R/f'previews/final-{w}.png'),full_page=True)
  m=page.evaluate('''() => {
  const r=selector=>{const el=document.querySelector(selector);const b=el.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom};};
  return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,heading:r('h1'),keyboard:r('.figure'),play:r('#am-play-together'),summary:r('.summary'),tool:r('.tool'),figInTool:document.querySelector('.tool').contains(document.querySelector('.figure')),status:window.PianoReference?.getSnapshot()};
  }''')
  measures.append(m);page.close()
 b.close()
(R/'checks/initial-layout.json').write_text(json.dumps(measures,indent=2))
print(json.dumps(measures,indent=2))
