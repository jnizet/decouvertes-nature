import { expect, Page, test } from '@playwright/test';

test.describe('Login', () => {
  test('should navigate to login page and log in', async ({ page }) => {
    await login(page);
  });
});

export async function login(page: Page) {
  await page.goto('http://localhost:4201');
  await page.locator('text=Identification').first().click();
  await page.fill('text=Adresse email', 'jnizet@gmail.com');
  await page.fill('text=Mot de passe', 'password');
  await page.click(`text=S'identifier`);
  await expect(page.locator('#user-dropdown')).toHaveText('Admin');
}
