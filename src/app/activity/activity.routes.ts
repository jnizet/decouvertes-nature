import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivitiesTabsComponent } from './activities-tabs/activities-tabs.component';

export const ACTIVITY_ROUTES: Routes = [
  {
    path: '',
    component: ActivitiesTabsComponent,
    children: [
      {
        path: '',
        component: ActivitiesComponent,
        data: {
          mode: 'all'
        }
      },
      {
        path: 'mine',
        component: ActivitiesComponent,
        data: {
          mode: 'mine'
        }
      }
    ]
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
  },
  {
    path: ':id/duplicate',
    component: ActivityEditionComponent,
    data: {
      duplicate: true
    }
  }
];
