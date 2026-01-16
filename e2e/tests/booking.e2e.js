const { test, expect } = require('@playwright/test');

test('homepage has Salon heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Salon');
});
