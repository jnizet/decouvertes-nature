import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import '@angular/common/locales/global/fr';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    ...environment.firebaseProviders,
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ]
});
