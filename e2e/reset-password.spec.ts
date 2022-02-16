import { test } from '@playwright/test';

test.describe('Reset password', () => {
  test('should display, create and modify users', async ({ page }) => {
    await page.goto('http://localhost:4201');
    await page.locator('text=Identification').first().click();
    await page.click(`text=j'ai oublié mon mot de passe`);
    await page.fill('text=Adresse email', 'jnizet@gmail.com');
    await page.click('text=Réinitialiser');

    await test.expect(page.locator('text=Adresse email')).toHaveCount(0);
    await test.expect(page.locator('text=Réinitialiser')).toHaveCount(0);
    await test.expect(page.locator('text=Un email vous a été envoyé')).toBeVisible();
  });
});
