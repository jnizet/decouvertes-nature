import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ACTIVITY_ROUTES } from './activity.routes';
import { ActivityDatePipeModule } from '../activity-date-pipe/activity-date-pipe.module';
import { ActivityEditionComponent } from './activity-edition/activity-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { ActivityTypePipeModule } from '../activity-type-pipe/activity-type-pipe.module';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { ActivityComponent } from './activity/activity.component';
import { IconModule } from '../icon/icon.module';
import { ConfirmModule } from '../confirm/confirm.module';
import { MonthPipeModule } from '../month-pipe/month-pipe.module';
import { ActivitiesTabsComponent } from './activities-tabs/activities-tabs.component';
import { ExportableActivitiesComponent } from './exportable-activities/exportable-activities.component';
import { ExportableActivityComponent } from './exportable-activity/exportable-activity.component';
import { ActivityReportComponent } from './activity-report/activity-report.component';
import { ActivityReportEditionComponent } from './activity-report-edition/activity-report-edition.component';
import { PageTitleModule } from '../page-title/page-title.module';

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
    ActivityDatePipeModule,
    ReactiveFormsModule,
    ValidationModule,
    NgbTypeaheadModule,
    ActivityTypePipeModule,
    IconModule,
    ConfirmModule,
    MonthPipeModule,
    PageTitleModule,
    NgbCollapseModule
  ]
})
export class ActivityModule {}
