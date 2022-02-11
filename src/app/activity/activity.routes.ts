import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';

export const ACTIVITY_ROUTES: Routes = [
  {
    path: '',
    component: ActivitiesComponent
  },
  {
    path: 'new',
    component: ActivityEditionComponent
  }
];
