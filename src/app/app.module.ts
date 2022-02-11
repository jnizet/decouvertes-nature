import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { NavbarModule } from './navbar/navbar.module';
import { ValidationModule } from './validation/validation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ...environment.firebaseImports,
    NavbarModule,
    ValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
