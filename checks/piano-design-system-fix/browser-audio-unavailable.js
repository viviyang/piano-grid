const scratch=await context.newPage();let result;
try{
 await scratch.addInitScript(()=>{Object.defineProperty(window,'AudioContext',{value:undefined,configurable:true});Object.defineProperty(window,'webkitAudioContext',{value:undefined,configurable:true});});
 await scratch.goto('http://localhost:3127/chords/c-major',{waitUntil:'domcontentloaded'});
 await expect(scratch.locator('#audio-status')).toContainText('Visual practice is still available.');
 await expect(scratch.getByRole('button',{name:'Play chord',exact:true})).toBeDisabled();
 await scratch.getByRole('button',{name:'Start practice',exact:true}).click();
 for(const name of ['G4','C5','E4'])await scratch.getByRole('button',{name,exact:true}).click();
 await scratch.getByRole('button',{name:'Check answer',exact:true}).click();
 await expect(scratch.locator('#practice')).toHaveAttribute('data-answer-kind','independent');
 await expect(scratch.locator('.cp-result')).toContainText('first try, without help');
 await scratch.getByRole('button',{name:'C6',exact:true}).focus();await scratch.keyboard.press('Tab');
 const tabExit=await scratch.evaluate(()=>!document.activeElement.classList.contains('am-key'));assert.ok(tabExit);
 result={audioUnavailableReported:true,visualPracticeWorks:true,octaveIndependent:true,firstCorrectIndependent:true,tabLeavesKeyboard:tabExit};
}finally{await scratch.close();}
const file=artifactPath('browser-audio-unavailable.json');await (await import('node:fs/promises')).writeFile(file,JSON.stringify(result,null,2));return {result,file};