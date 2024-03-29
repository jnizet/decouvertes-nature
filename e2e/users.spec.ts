import { test } from '@playwright/test';
import { checkAccessibility, login, randomString } from './utils';

test.describe('Users', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display, create and modify users', async ({ page }) => {
    await page.click('text=Utilisateurs');

    await checkAccessibility(page, 'Users page should be accessible');
    await test.expect(page.locator('h2', { hasText: 'Admin' })).toBeVisible();

    await page.click('text=Créer un utilisateur');
    const name = randomString();
    const email = randomString() + '@gmail.com';
    await page.fill('text=Nom', name);
    await page.fill('text=Adresse email', email);
    await page.check('text=Administrateur');
    await page.check('text=Exporteur');
    await checkAccessibility(page, 'Create user page should be accessible');
    await page.click('text=Enregistrer');

    await test.expect(page.locator('h1', { hasText: 'Utilisateur créé' })).toBeVisible();
    await page.click(`text=OK, j'ai compris`);

    await test.expect(page.locator('h2', { hasText: name })).toBeVisible();

    const card = page.locator('.card', { hasText: name });
    await test.expect(card).toContainText('Administrateur');
    await test.expect(card).toContainText('Exporteur');
    await test.expect(card).not.toContainText('désactivé');

    await card.locator('text=Modifier').click();
    await page.check('text=Désactivé');
    await page.click('text=Enregistrer');
    await test.expect(card).toContainText('désactivé');
  });

  test('should generate a reset password link', async ({ page }) => {
    await page.click('text=Utilisateurs');

    await page.click('text=Demander un lien de réinitialisation de mot de passe');
    await test
      .expect(page.locator('h1', { hasText: 'Lien de réinitialisation de mot de passe\n' }))
      .toBeVisible();

    const modal = page.locator('.modal-dialog');
    await modal.getByText('Demander un lien', { exact: true }).click();
    await test.expect(modal).toContainText('Le lien a été créé');
    await modal.locator('text=Fermer').click();
    await test.expect(modal).not.toBeVisible();
  });
});
