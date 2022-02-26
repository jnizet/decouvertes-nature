import { test } from '@playwright/test';

test.describe('Reset password', () => {
  test('should ask for a password reset', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=Identification').first().click();
    await page.click(`text=j'ai oublié mon mot de passe`);
    await page.fill('text=Adresse email', 'jnizet@gmail.com');
    await page.click('text=Réinitialiser');

    await test.expect(page.locator('text=Adresse email')).toBeHidden();
    await test.expect(page.locator('text=Réinitialiser')).toBeHidden();
    await test.expect(page.locator('text=Un email vous a été envoyé')).toBeVisible();
  });
});
