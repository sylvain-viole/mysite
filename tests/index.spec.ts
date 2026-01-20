import { test, expect } from '@playwright/test';
import path from 'path';

const fileUrl = 'file://' + path.resolve(process.cwd(), 'index.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
});

test('TC-001 Page loads and has expected title and script', async ({ page }) => {
  await expect(page).toHaveTitle(/Sylvain Viole/);
  await expect(page.locator('script[src="./scripts.js"]')).toHaveCount(1);
});

test('TC-002 Navigation anchors scroll (hash updates)', async ({ page }) => {
  await page.locator('a[href="#who__anchor"]').first().click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#who__anchor');

  await page.locator('a[href="#what__anchor"]').first().click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#what__anchor');

  await page.locator('a[href="#need__anchor"]').first().click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#need__anchor');
});

test('TC-005 Showroom carousel navigates between projects', async ({ page }) => {
  const project1 = page.locator('#project1');
  const project2 = page.locator('#project2');

  // initial state: project1 visible
  await expect(project1).toHaveClass(/visible/);

  // click next and expect project2 to become visible
  await page.locator('#next__showroom').click();
  await expect(project2).toHaveClass(/visible/);
});

test('TC-006 External links open new tab (example: Medium)', async ({ page }) => {
  const context = page.context();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href*="medium.com"]').first().click(),
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  expect(newPage.url()).toContain('medium.com');
  await newPage.close();
});

test('TC-007 Contact links have correct hrefs (tel, mailto, CV)', async ({ page }) => {
  const tel = await page.locator('a[href^="tel:"]').first().getAttribute('href');
  const mail = await page.locator('a[href^="mailto:"]').first().getAttribute('href');
  const cv = await page.locator('a[href$=".pdf"]').first().getAttribute('href');

  expect(tel).toBeDefined();
  expect(tel).toContain('tel:');

  expect(mail).toBe('mailto:sylvainviole@gmail.com');

  expect(cv).toBeDefined();
  expect(cv!.toLowerCase()).toContain('.pdf');
});
