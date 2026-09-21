// Run inside the Tabbit browser-owned Playwright runtime; no added dependencies.
// const { verifyHeaderNavigation } = await import('file:///.../scripts/check-header-navigation.mjs');
// return await verifyHeaderNavigation({ page, expect, assert, mode: 'desktop' });
export async function verifyHeaderNavigation({ page, expect, assert, mode, base = 'http://127.0.0.1:3217' }) {
  const results = [];
  const mobile = mode === 'mobile';
  await page.setViewportSize({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900 });
  await page.goto(`${base}/tools`, { waitUntil: 'networkidle' });
  const sections = await page.locator('.site-nav-parent-link').evaluateAll(links => links.map(link => ({ label: link.textContent, href: link.getAttribute('href') })));
  assert.equal(sections.length, 7);
  const groupFor = href => page.locator(mobile ? '.site-mobile-section' : '.site-nav-group').filter({ has: page.locator(`${mobile ? '.site-mobile-parent' : '.site-nav-parent-link'}[href="${href}"]`) });
  const openMobile = async () => {
    if (mobile) await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  };
  await openMobile();
  for (const { label, href } of sections) {
    const group = groupFor(href);
    const button = group.locator(mobile ? '.site-mobile-section-trigger' : '.site-nav-trigger');
    const parent = group.locator(mobile ? '.site-mobile-parent' : '.site-nav-parent-link');
    const panel = mobile ? group.locator('.site-mobile-section-panel') : page.locator('.site-nav-panel');
    const previous = page.url();
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toHaveAttribute('aria-label', `Close ${label} menu`);
    await expect(panel).toBeVisible();
    assert(await page.locator(`[id="${await button.getAttribute('aria-controls')}"]`).isVisible());
    assert.equal(page.url(), previous);
    await expect((mobile ? group.locator('.site-mobile-overview') : page.locator('.site-nav-overview-link'))).toHaveAttribute('href', href);
    await button.click();
    await expect(panel).toBeHidden();
    await expect(button).toHaveAttribute('aria-label', `Open ${label} menu`);
    for (const target of [parent, button]) {
      const box = await target.boundingBox();
      assert(box && box.height >= 44 && box.width >= 44, `${label}: target below 44px`);
    }
    await parent.click();
    await page.waitForURL(url => url.pathname === href);
    assert.equal(new URL(page.url()).pathname, href);
    results.push(`${label}: independent link/button, open/close, URL, overview, ARIA, 44px PASS`);
    await page.goto(`${base}/tools`, { waitUntil: 'networkidle' });
    await openMobile();
  }
  for (const href of ['/chords', '/scales']) {
    const group = groupFor(href);
    await group.locator(mobile ? '.site-mobile-section-trigger' : '.site-nav-trigger').click();
    for (let index = 0; index < 2; index++) {
      const item = (mobile ? group.locator('.site-mobile-accordion') : page.locator('.site-nav-chord-item')).nth(index);
      const button = item.locator(mobile ? '.site-mobile-split-trigger' : '.site-nav-chord-submenu-trigger');
      const parent = item.locator(mobile ? '.site-mobile-catalog-parent' : '.site-nav-chord-parent-link');
      const panel = mobile ? item.locator('.site-mobile-accordion-panel') : page.locator('.site-nav-third-panel');
      const previous = page.url();
      if (await button.getAttribute('aria-expanded') === 'true') await button.press('Escape');
      await button.click();
      await expect(panel).toBeVisible();
      assert.equal(page.url(), previous);
      assert(await page.locator(`[id="${await button.getAttribute('aria-controls')}"]`).isVisible());
      assert.equal(await panel.locator(mobile ? '.site-mobile-view-all' : '.site-nav-catalog-overview').getAttribute('href'), await parent.getAttribute('href'));
      await button.press('Escape');
      await expect(panel).toBeHidden();
      await expect(button).toBeFocused();
      await button.press('Space');
      await expect(panel).toBeVisible();
      await button.press('Escape');
      await button.press('Enter');
      await expect(panel).toBeVisible();
      await button.press('Escape');
      results.push(`${href} child ${index}: split targets, overview, Space/Enter/Esc, focus return PASS`);
    }
    if (!mobile) {
      for (const index of [0, 1, 2]) {
        const item = page.locator('.site-nav-chord-item').nth(index);
        const trigger = item.locator('button');
        await item.hover();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('.site-nav-third-panel')).toBeVisible();
        assert.equal(new URL(page.url()).pathname, '/tools');
      }
      await page.keyboard.press('Escape');
      results.push(`${href}: Major/Minor/More hover consistently opens without navigation PASS`);
    } else {
      const more = group.locator('.site-mobile-accordion').nth(2);
      await more.locator('button').click();
      await expect(more.locator('.site-mobile-accordion-panel')).toBeVisible();
      await more.locator('button').click();
      await expect(more.locator('.site-mobile-accordion-panel')).toBeHidden();
    }
    await page.keyboard.press('Escape');
    await expect((mobile ? group.locator('.site-mobile-section-panel') : page.locator('.site-nav-panel'))).toBeHidden();
  }
  const chords = groupFor('/chords');
  const parent = chords.locator(mobile ? '.site-mobile-parent' : '.site-nav-parent-link');
  const button = chords.locator(mobile ? '.site-mobile-section-trigger' : '.site-nav-trigger');
  await parent.focus();
  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  if (await button.getAttribute('aria-expanded') === 'true') await page.keyboard.press('Escape');
  await button.press('Space');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await button.press('Tab');
  await expect((mobile ? chords.locator('.site-mobile-overview') : page.locator('.site-nav-overview-link'))).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  assert(await button.evaluate(element => getComputedStyle(element).outlineStyle !== 'none' && parseFloat(getComputedStyle(element).outlineWidth) >= 2));
  if (!mobile) {
    await parent.hover();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    assert(await parent.evaluate(element => getComputedStyle(element).textDecorationLine.includes('underline')));
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await page.mouse.move(10, 200);
  }
  await parent.focus();
  await parent.press('Enter');
  await page.waitForURL(url => url.pathname === '/chords');
  results.push('Tab sequence, parent Enter, button Space, Escape, visible focus PASS');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await openMobile();
  await groupFor('/chords').locator(mobile ? '.site-mobile-section-trigger' : '.site-nav-trigger').click();
  const bounds = await page.locator(mobile ? '.site-mobile-nav' : '.site-nav-panel').boundingBox();
  assert(bounds && bounds.x >= 0 && bounds.x + bounds.width <= (mobile ? 390 : 1440));
  results.push(`${mobile ? 390 : 1440}px: no horizontal page/menu overflow PASS`);
  return { mode, results };
}

// Regression for pointer transitions between the catalog and Explore/Learn.
export async function verifyCatalogHover({ page, expect, assert, base = 'http://127.0.0.1:3219', sections = ['chords', 'scales'], cycles = 3 }) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/chords/minor`, { waitUntil: 'networkidle' });
  const results = [];
  for (const section of sections) {
    await page.locator(`.site-nav-parent-link[href="/${section}"]`).hover();
    await expect(page.locator('.site-nav-third-panel[data-kind="major"]')).toBeVisible();
    await expect(page.locator('.site-nav-chord-item').first()).toHaveAttribute('data-expanded', 'true');
    for (let cycle = 0; cycle < cycles; cycle++) {
      for (const [index, kind] of ['major', 'minor', 'more'].entries()) {
        const item = page.locator('.site-nav-chord-item').nth(index);
        await item.hover();
        const panel = page.locator(`.site-nav-third-panel[data-kind="${kind}"]`);
        await expect(panel).toBeVisible();
        await panel.locator('a').first().hover();
        await expect(panel).toBeVisible();
        if (cycle === 0) {
          const button = item.locator('button');
          await button.click();
          await expect(button).toHaveAttribute('aria-expanded', 'false');
          await button.click();
          await expect(button).toHaveAttribute('aria-expanded', 'true');
          await button.press('Space');
          await expect(button).toHaveAttribute('aria-expanded', 'false');
          await button.press('Enter');
          await expect(button).toHaveAttribute('aria-expanded', 'true');
        }
        const detailBounds = await panel.boundingBox();
        const explore = page.locator('.site-nav-chord-direct-groups');
        const exploreBounds = await explore.boundingBox();
        assert(detailBounds && exploreBounds && detailBounds.x + detailBounds.width <= exploreBounds.x);
        await explore.locator('h3').first().hover();
        await expect(page.locator('.site-nav-third-panel')).toHaveCount(0);
        assert.equal(new URL(page.url()).pathname, '/chords/minor');
      }
    }
    await page.keyboard.press('Escape');
    results.push(`${section}: Major first/default, ${cycles * 3} repeat hover cycles, child links reachable, Explore clears details, no overlap/navigation PASS`);
  }
  return results;
}

export async function verifyTopRowHover({page,expect,assert,sections,base='http://127.0.0.1:3217'}) {
await page.setViewportSize({width:1440,height:900});
await page.goto(`${base}/chords/minor`);
const results=[];
const items=await page.locator('.site-nav-parent-link').evaluateAll(a=>a.map(el=>({href:el.getAttribute('href'),label:el.textContent})));
for(const {href,label} of items.filter(item=>!sections || sections.includes(item.href))){
 const row=page.locator('.site-nav-group').filter({has:page.locator(`.site-nav-parent-link[href="${href}"]`)});
 const trigger=row.locator('.site-nav-trigger');
 await row.locator('.site-nav-icon').hover();
 await expect(trigger).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('.site-nav-overview-link')).toHaveText(`Browse all ${label}→`);
 await trigger.hover();
 await row.locator('.site-nav-parent-link').hover();
 await expect(trigger).toHaveAttribute('aria-expanded','true');
 await trigger.click(); await expect(trigger).toHaveAttribute('aria-expanded','false');
 await trigger.click(); await expect(trigger).toHaveAttribute('aria-expanded','true');
 await page.mouse.move(12,600);
 await expect(trigger).toHaveAttribute('aria-expanded','false');
 results.push(`${label}: icon/text/arrow hover, button toggle, leave dismissal PASS`);
}
return results;
}
