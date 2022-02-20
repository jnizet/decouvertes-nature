import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterModule } from '@angular/router';
import { CALENDAR_ROUTES } from './calendar.routes';
import { MonthPipeModule } from '../month-pipe/month-pipe.module';
import { IconModule } from '../icon/icon.module';
import { ActivityDatePipeModule } from '../activity-date-pipe/activity-date-pipe.module';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [CalendarComponent, ReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
    MonthPipeModule,
    IconModule,
    ActivityDatePipeModule
  ]
})
export class CalendarModule {}
