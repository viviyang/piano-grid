await page.setViewportSize({width:1440,height:900});
await page.goto('http://127.0.0.1:4348/chords/finder',{waitUntil:'domcontentloaded'});
const desktop=await page.screenshot({fullPage:false});
await page.setViewportSize({width:390,height:900});
const mobile=await page.screenshot({fullPage:false});
return {desktop,mobile};