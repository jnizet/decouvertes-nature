import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Activity, ActivityService } from '../../activity/activity.service';
import { LocalDate, localDateToYearMonth, YearMonth } from '../../shared/types';
import { combineLatest, map } from 'rxjs';
import { parseISO } from 'date-fns';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { IconDirective } from '../../icon/icon.directive';
import { ReportComponent } from '../report/report.component';
import { MonthPipe } from '../../month-pipe/month.pipe';
import { RouterLink } from '@angular/router';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { YearService } from '../../year.service';
import { YearSelectorComponent } from '../../year-selector/year-selector.component';
import * as icons from '../../icon/icons';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

interface Month {
  month: YearMonth;
  activities: Array<ActivityWithDayRange>;
}

interface ViewModel {
  year: number;
  months: Array<Month>;
  reportActivities: Array<Activity>;
}

interface ActivityWithDayRange extends Activity {
  dayRange: string;
}

@Component({
  selector: 'dn-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective,
    MonthPipe,
    ActivityDatePipe,
    ReportComponent,
    YearSelectorComponent
  ]
})
export class CalendarComponent {
  vm: Signal<ViewModel | undefined>;
  icons = icons;

  constructor(activityService: ActivityService, yearService: YearService) {
    const vm$ = combineLatest([toObservable(yearService.year), activityService.findVisible()]).pipe(
      map(([year, activities]) => {
        // reverse to have them in chronological order, since the backend returns them in anti-chronological order
        const yearActivities = activities
          .filter(activity => this.isInYear(activity, year))
          .reverse();
        const reportActivities = yearActivities.filter(
          activity => !activity.draft && this.isStartInYear(activity, year)
        );
        const months: Array<Month> = [];
        for (let m = 1; m <= 12; m++) {
          const paddedMonth = `${m < 10 ? '0' : ''}${m}`;
          const yearMonth = `${year}-${paddedMonth}`;
          months.push({
            month: yearMonth,
            activities: yearActivities
              .filter(a => this.isInMonth(a, yearMonth))
              .map(a => this.withDayRange(a, yearMonth))
          });
        }
        return {
          year,
          reportActivities,
          months
        };
      })
    );

    this.vm = toSignal(vm$);
  }

  private isInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    const endYear = parseISO(activity.endDate ?? activity.startDate).getFullYear();
    return year >= startYear && year <= endYear;
  }

  private isStartInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    return year === startYear;
  }

  private isInMonth(activity: Activity, month: YearMonth) {
    const startMonth = localDateToYearMonth(activity.startDate);
    const endMonth = localDateToYearMonth(activity.endDate ?? activity.startDate);
    return month >= startMonth && month <= endMonth;
  }

  private withDayRange(activity: Activity, month: YearMonth): ActivityWithDayRange {
    return { ...activity, dayRange: this.getDayRange(activity, month) };
  }

  private getDayRange({ startDate, endDate }: Activity, month: YearMonth): string {
    function localDateToDay(date: LocalDate) {
      return date.substring(8);
    }

    if (startDate === endDate || !endDate) {
      return localDateToDay(startDate);
    } else {
      const startMonth = localDateToYearMonth(startDate);
      const endMonth = localDateToYearMonth(endDate ?? startDate);
      if (startMonth === endMonth) {
        return `${localDateToDay(startDate)}-${localDateToDay(endDate)}`;
      } else if (startMonth === month) {
        return `${localDateToDay(startDate)}->`;
      } else if (endMonth === month) {
        return `<-${localDateToDay(endDate)}`;
      } else {
        return `<->`;
      }
    }
  }
}
