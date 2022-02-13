import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ACTIVITY_ROUTES } from './activity.routes';
import { ActivityDatePipeModule } from '../activity-date-pipe/activity-date-pipe.module';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { ActivityTypePipeModule } from '../activity-type-pipe/activity-type-pipe.module';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { ActivityComponent } from './activity/activity.component';
import { IconModule } from '../icon/icon.module';
import { ConfirmModule } from '../confirm/confirm.module';
import { MonthPipeModule } from '../month-pipe/month-pipe.module';
import { ActivitiesTabsComponent } from './activities-tabs/activities-tabs.component';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityEditionComponent,
    MultiChoiceComponent,
    ActivityCardComponent,
    ActivityComponent,
    ActivitiesTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITY_ROUTES),
    ActivityDatePipeModule,
    ReactiveFormsModule,
    ValidationModule,
    NgbTypeaheadModule,
    ActivityTypePipeModule,
    IconModule,
    ConfirmModule,
    MonthPipeModule
  ]
})
export class ActivityModule {}
