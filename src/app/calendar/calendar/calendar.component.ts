import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Activity, ActivityService } from '../../activity/activity.service';
import { LocalDate, localDateToYearMonth, YearMonth } from '../../shared/types';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { parseISO } from 'date-fns';
import {
  arrowLeftCircle,
  arrowRightCircle,
  plusCircle
} from '../../bootstrap-icons/bootstrap-icons';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  private yearSubject = new BehaviorSubject<number>(new Date().getFullYear());
  vm$: Observable<ViewModel>;
  icons = {
    left: arrowLeftCircle,
    right: arrowRightCircle,
    addActivity: plusCircle
  };

  constructor(activityService: ActivityService) {
    this.vm$ = combineLatest([this.yearSubject, activityService.findAll()]).pipe(
      map(([year, activities]) => {
        const yearActivities = activities.filter(activity => this.isInYear(activity, year));
        const reportActivities = yearActivities.filter(activity =>
          this.isStartInYear(activity, year)
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
  }

  private isInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    const endYear = parseISO(activity.startDate).getFullYear();
    return year >= startYear && year <= endYear;
  }

  private isStartInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    return year === startYear;
  }

  private isInMonth(activity: Activity, month: YearMonth) {
    const startMonth = localDateToYearMonth(activity.startDate);
    const endMonth = localDateToYearMonth(activity.endDate);
    return month >= startMonth && month <= endMonth;
  }

  changeYear(number: number) {
    this.yearSubject.next(number);
  }

  private withDayRange(activity: Activity, month: YearMonth): ActivityWithDayRange {
    return { ...activity, dayRange: this.getDayRange(activity, month) };
  }

  private getDayRange({ startDate, endDate }: Activity, month: YearMonth): string {
    function localDateToDay(date: LocalDate) {
      return date.substring(8);
    }

    if (startDate === endDate) {
      return localDateToDay(startDate);
    } else {
      const startMonth = localDateToYearMonth(startDate);
      const endMonth = localDateToYearMonth(endDate);
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
