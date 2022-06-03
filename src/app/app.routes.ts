import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

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
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('/login') },
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
      }
    ]
  }
];
