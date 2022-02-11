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
import { DatepickerModule } from '../shared/datepicker/datepicker.module';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { ActivityTypePipeModule } from '../activity-type-pipe/activity-type-pipe.module';
import { ActivityCardComponent } from './activity-card/activity-card.component';

@NgModule({
  declarations: [ActivitiesComponent, ActivityEditionComponent, MultiChoiceComponent, ActivityCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITY_ROUTES),
    ActivityDatePipeModule,
    ReactiveFormsModule,
    ValidationModule,
    NgbTypeaheadModule,
    DatepickerModule,
    ActivityTypePipeModule
  ]
})
export class ActivityModule {}
