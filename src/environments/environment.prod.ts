import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase-config';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const environment = {
  production: true,
  firebase: firebaseConfig,
  firebaseImports: [
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions())
  ]
};
