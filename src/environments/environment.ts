// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyADSUT-vYJyiJ2dmh7cKCVel_UhX5YQc4o',
    authDomain: 'decouvertes-nature.firebaseapp.com',
    projectId: 'decouvertes-nature',
    storageBucket: 'decouvertes-nature.appspot.com',
    messagingSenderId: '813545065309',
    appId: '1:813545065309:web:ec861a3104f67eb4b7b6b4'
  },
  firebaseImports: [
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'localhost', 7070);
      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      return auth;
    })
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
