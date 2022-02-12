import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase-config';

export const environment = {
  production: true,
  firebase: firebaseConfig,
  firebaseImports: [provideFirestore(() => getFirestore()), provideAuth(() => getAuth())]
};
