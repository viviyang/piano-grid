return {url:page.url(),visibility:await page.evaluate(()=>document.visibilityState),buttons:await page.getByRole('button').allTextContents()};
