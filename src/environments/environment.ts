// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase-config';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

export const environment = {
  production: false,
  firebaseProviders: [
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(
      provideFirestore(() => {
        const firestore = getFirestore();
        connectFirestoreEmulator(firestore, 'localhost', 7070);
        return firestore;
      })
    ),
    importProvidersFrom(
      provideAuth(() => {
        const auth = getAuth();
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        return auth;
      })
    ),
    importProvidersFrom(
      provideFunctions(() => {
        const functions = getFunctions();
        connectFunctionsEmulator(functions, 'localhost', 5001);
        return functions;
      })
    ),
    importProvidersFrom(
      provideStorage(() => {
        const storage = getStorage();
        connectStorageEmulator(storage, 'localhost', 9199);
        return storage;
      })
    )
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
