/// <reference types="@angular/localize" />

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import '@angular/common/locales/global/fr';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    ...environment.firebaseProviders,
    provideRouter(APP_ROUTES),
    provideExperimentalZonelessChangeDetection()
  ]
});
