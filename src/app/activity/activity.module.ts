import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activity/activities.component';
import { ACTIVITY_ROUTES } from './activity.routes';
import { ActivityDatePipeModule } from '../activity-date-pipe/activity-date-pipe.module';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, RouterModule.forChild(ACTIVITY_ROUTES), ActivityDatePipeModule]
})
export class ActivityModule {}
