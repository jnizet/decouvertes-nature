import { Page, test } from '@playwright/test';
import { login, randomString } from './utils';

test.describe('Activity report', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should create, modify and delete report', async ({ page }) => {
    await createActivity(page);

    await page.click('text=Remplir le rapport');

    const reportForm = page.locator('dn-activity-report-edition');
    const participantsInput = reportForm.locator('text="Nombre de participants"');
    await test.expect(participantsInput).toBeVisible();
    await reportForm.locator('text="Activité annulée"').check();
    await test.expect(participantsInput).toBeHidden();
    await reportForm.locator('text="Activité annulée"').uncheck();
    await test.expect(participantsInput).toBeVisible();
    await participantsInput.fill('5');
    await page.click('text=Enregistrer');

    await test.expect(page.locator('h2')).toHaveText('Rapport');
    const report = page.locator('dn-activity-report');
    await test.expect(report).toContainText('5 personnes ont participé à cette activité');

    await page.click('text="Modifier le rapport"');
    await participantsInput.fill('5');
    await reportForm.locator('text=Commentaire').fill('Très bonne ambiance');
    await page.click('text=Enregistrer');
    await test.expect(report).toContainText('5 personnes ont participé à cette activité');
    await test.expect(report.locator('.comment')).toContainText('Très bonne ambiance');

    await page.click('text="Supprimer le rapport"');
    await page.click('text=Oui');
    await test.expect(page.locator('h2')).toHaveCount(0);
  });
});

async function createActivity(page: Page) {
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
  await page.click('#save-button');
  await test.expect(page.locator('h1')).toHaveText(title);
}
