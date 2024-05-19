import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase-config';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const environment = {
  production: true,
  firebaseProviders: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions(undefined, 'europe-west1')),
    provideStorage(() => getStorage())
  ]
};
