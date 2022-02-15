import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test.describe('Login', () => {
  test('should navigate to login page and log in', async ({ page }) => {
    await page.locator('text=Identification').first().click();
    await page.fill('text=Adresse email', 'jnizet@gmail.com');
    await page.fill('text=Mot de passe', 'password');
    await page.click(`text=S'identifier`);
    await expect(page.locator('#user-dropdown')).toHaveText('Admin');
  });
});
