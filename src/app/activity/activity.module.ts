import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ACTIVITY_ROUTES } from './activity.routes';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivitiesTabsComponent } from './activities-tabs/activities-tabs.component';
import { IconDirective } from '../icon/icon.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ActivityTypePipe } from '../activity-type-pipe/activity-type.pipe';
import { ActivityDatePipe } from '../activity-date-pipe/activity-date.pipe';
import { MonthPipe } from '../month-pipe/month.pipe';
import { ValdemortModule } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';
import { ConfirmModalContentComponent } from '../confirm/confirm-modal-content/confirm-modal-content.component';

@NgModule({
  declarations: [ActivitiesComponent, ActivityEditionComponent, ActivitiesTabsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITY_ROUTES),
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    ValdemortModule,
    ConfirmModalContentComponent,
    FormControlValidationDirective,
    MonthPipe,
    ActivityDatePipe,
    ActivityTypePipe,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective,
    ActivityCardComponent,
    MultiChoiceComponent,
    ActivityComponent
  ]
})
export class ActivityModule {}
