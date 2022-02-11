import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyADSUT-vYJyiJ2dmh7cKCVel_UhX5YQc4o',
    authDomain: 'decouvertes-nature.firebaseapp.com',
    projectId: 'decouvertes-nature',
    storageBucket: 'decouvertes-nature.appspot.com',
    messagingSenderId: '813545065309',
    appId: '1:813545065309:web:ec861a3104f67eb4b7b6b4'
  },
  firebaseImports: [provideFirestore(() => getFirestore()), provideAuth(() => getAuth())]
};
