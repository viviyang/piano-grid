return {url:page.url(),help:await page.locator('#how-to-enter').innerText(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
