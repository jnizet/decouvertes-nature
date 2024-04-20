import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase-config';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const environment = {
  production: true,
  firebaseProviders: [
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFunctions(() => getFunctions(undefined, 'europe-west1'))),
    importProvidersFrom(provideStorage(() => getStorage()))
  ]
};
