import { test } from '@playwright/test';
import { login, randomString } from './utils';

test.describe('Activities', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display, create, modify and delete activities', async ({ page }) => {
    await page.click('text=Activités');

    const romimineCard = page.locator('.card', { hasText: 'Romimine' });
    await test.expect(romimineCard.locator('h3')).toHaveText('Romimine');

    await page.click('text=Romimine');

    await test.expect(page.locator('h1')).toHaveText('Romimine');

    await page.click('text=Activités');
    await page.click('text=Créer une activité');

    const title = randomString();
    await page.fill('text=Titre', title);
    await page.selectOption(`text=Type d'activité`, { label: 'Atelier' });
    await page.fill('text=Description', 'Learn to write tests');
    await page.fill('text=Animateur / Organisateur', 'Adama Doumbouya');
    await page.fill(`text=Commune du lieu de l'activité`, 'Api');
    await page.locator('button.dropdown-item:has-text("Apinac")').click();
    await page.fill(`text=Début de l'activité`, '2023-10-01');
    await page.fill(`text=Heure de rendez-vous`, '10:00');
    await page.fill(`text=Heure de fin de l'activité`, '15:00');
    const newLabelInput = page.locator('input[placeholder="Ajouter un label"]');
    await newLabelInput.fill('Some new label');
    await newLabelInput.press('Enter');
    page.check('text="Some new label"');

    await page.click('text=Enregistrer');

    await test.expect(page.locator('h1')).toHaveText(title);
    await page.click('text=Modifier');

    const newTitle = randomString();
    await page.fill('text=Titre', newTitle);
    await page.click('text=Enregistrer');

    await page.click('text=Activités');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(1);

    await page.click('text=Mes activités');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(1);

    await page.click('text=Exports');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(1);
    page.fill(`text="Filtre sur l'intercommunalité"`, 'oulala');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(0);
    page.fill(`text="Filtre sur l'intercommunalité"`, 'forez');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(1);

    await page.click('text=Activités');
    await page.click('text=Mes activités');
    await page.click(`text=${newTitle}`);
    await page.click('text=Supprimer');
    await page.click('text=Oui');

    await test.expect(page.locator('h1')).toHaveText('Activités');
    await test.expect(page.locator('h3', { hasText: newTitle })).toHaveCount(0);
  });
});
