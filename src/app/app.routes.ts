import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'email-action',
    loadChildren: () => import('./email-action/email-action.module').then(m => m.EmailActionModule)
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('/login') },
    children: [
      {
        path: 'activities',
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
      }
    ]
  }
];
