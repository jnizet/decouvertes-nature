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
import { ConfirmModule } from '../confirm/confirm.module';
import { ActivitiesTabsComponent } from './activities-tabs/activities-tabs.component';
import { ExportableActivitiesComponent } from './exportable-activities/exportable-activities.component';
import { ExportableActivityComponent } from './exportable-activity/exportable-activity.component';
import { ActivityReportComponent } from './activity-report/activity-report.component';
import { ActivityReportEditionComponent } from './activity-report-edition/activity-report-edition.component';
import { IconDirective } from '../icon/icon.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ActivityTypePipe } from '../activity-type-pipe/activity-type.pipe';
import { ActivityDatePipe } from '../activity-date-pipe/activity-date.pipe';
import { MonthPipe } from '../month-pipe/month.pipe';
import { ValdemortModule } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityEditionComponent,
    MultiChoiceComponent,
    ActivityCardComponent,
    ActivityComponent,
    ActivitiesTabsComponent,
    ExportableActivitiesComponent,
    ExportableActivityComponent,
    ActivityReportComponent,
    ActivityReportEditionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITY_ROUTES),
    ReactiveFormsModule,
    NgbTypeaheadModule,
    ConfirmModule,
    NgbCollapseModule,
    ValdemortModule,
    FormControlValidationDirective,
    MonthPipe,
    ActivityDatePipe,
    ActivityTypePipe,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective
  ]
})
export class ActivityModule {}
