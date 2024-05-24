import { CanActivateFn, Router, Routes } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return user(auth).pipe(map(userOrNull => !!userOrNull || router.parseUrl('/login')));
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'email-action',
    loadComponent: () =>
      import('./email-action/email-action.component').then(m => m.EmailActionComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: '',
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'activities/exportable',
        loadComponent: () =>
          import('./activity/exportable-activities/exportable-activities.component').then(
            m => m.ExportableActivitiesComponent
          )
      },
      {
        path: 'activities',
        loadChildren: () => import('./activity/activity.routes').then(m => m.ACTIVITY_ROUTES)
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calendar/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./map/activities-map/activities-map.component').then(
            m => m.ActivitiesMapComponent
          )
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./change-password/change-password.component').then(m => m.ChangePasswordComponent)
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.routes').then(m => m.USER_ROUTES),
        data: {}
      },
      {
        path: 'animators',
        loadComponent: () =>
          import('./animator/animators/animators.component').then(m => m.AnimatorsComponent)
      }
    ]
  }
];
