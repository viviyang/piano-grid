const results=[];
for(const port of [4348,4349]){
 await page.goto(`http://127.0.0.1:${port}/scales/c-major`,{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Start practice',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.sc-actions [role=status]')?.textContent.includes('Playing'),null,{timeout:8000});
 const started=await page.locator('#follow-along').getAttribute('data-practice-state');
 const audio=await page.locator('.sc-actions [role=status]').textContent();
 await page.getByRole('button',{name:'Stop and reset',exact:true}).click();await expect(page.locator('#follow-along')).toHaveAttribute('data-practice-state','idle');
 results.push({port,practiceStateWhileAudioPlaying:started,audioStatus:audio,stopResetPassed:true,synchronizationPassed:started==='counting'||started==='playing'});
}
const path=artifactPath('scale-practice-baseline-comparison.json');await(await import('node:fs/promises')).writeFile(path,JSON.stringify(results,null,2));return {path,results};
