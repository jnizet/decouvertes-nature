import { expect, Page } from '@playwright/test';
import * as crypto from 'crypto';
import AxeBuilder from '@axe-core/playwright';
import { initializeApp } from 'firebase-admin/app';
import { CollectionReference, getFirestore } from 'firebase-admin/firestore';

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:7070';
initializeApp({ projectId: 'decouvertes-nature' });

interface Activity {
  title: string;
}

export async function login(page: Page, email = 'jnizet@gmail.com') {
  await page.goto('/');
  await page.locator('text=Identification').first().click();
  await page.fill('text=Adresse email', email);
  await page.fill('text=Mot de passe', 'password');
  await page.click(`text=S'identifier`);
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomString(length = 10) {
  const rb = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET[rb[i] % ALPHABET.length];
  }

  return result;
}

export async function checkAccessibility(page: Page, message?: string) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules('aria-allowed-attr')
    .analyze();
  expect(accessibilityScanResults.violations, message).toEqual([]);
}

export async function deleteAllActivitiesExceptRomimine() {
  const activitiesCollection = getFirestore().collection('activities') as CollectionReference<Activity>;
  const documents = await activitiesCollection.listDocuments();
  for (let i = 0; i < documents.length; i++) {
    const document = await documents[i].get();
    const activity = document.data();
    if (activity && activity.title !== 'Romimine') {
      await documents[i].delete();
    }
  }
}
