import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';
import { ActivityComponent } from './activity/activity.component';

export const ACTIVITY_ROUTES: Routes = [
  {
    path: '',
    component: ActivitiesComponent
  },
  {
    path: 'new',
    component: ActivityEditionComponent
  },
  {
    path: ':id',
    component: ActivityComponent
  },
  {
    path: ':id/edit',
    component: ActivityEditionComponent
  }
];
