await page.setViewportSize({width:390,height:950});
await page.goto('http://127.0.0.1:4352/chords/c-major',{waitUntil:'domcontentloaded'});
await page.locator('[data-product-continuation]').scrollIntoViewIfNeeded();
return await page.screenshot({fullPage:false,animations:'disabled',timeout:15000});
