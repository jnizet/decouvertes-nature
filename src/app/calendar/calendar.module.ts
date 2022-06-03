import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterModule } from '@angular/router';
import { CALENDAR_ROUTES } from './calendar.routes';
import { ReportComponent } from './report/report.component';
import { IconDirective } from '../icon/icon.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ActivityDatePipe } from '../activity-date-pipe/activity-date.pipe';
import { MonthPipe } from '../month-pipe/month.pipe';

@NgModule({
  declarations: [CalendarComponent, ReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
    MonthPipe,
    ActivityDatePipe,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective
  ]
})
export class CalendarModule {}
