import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import { LocalDate, localDateToYearMonth, YearMonth } from '../../shared/types';
import { ActivatedRoute } from '@angular/router';

interface Month {
  month: YearMonth;
  activities: Array<Activity>;
}

@Component({
  selector: 'dn-events',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
  months$: Observable<Array<Month>>;
  mode: 'all' | 'mine';
  constructor(route: ActivatedRoute, activityService: ActivityService) {
    this.mode = route.snapshot.data['mode'];
    const activities$ =
      this.mode === 'all' ? activityService.findVisible() : activityService.findMine();
    this.months$ = activities$.pipe(
      map(activities => {
        const activitiesByMonth = new Map<LocalDate, Array<Activity>>();
        activities.forEach(activity => {
          const month = localDateToYearMonth(activity.startDate);
          if (!activitiesByMonth.has(month)) {
            activitiesByMonth.set(month, []);
          }
          activitiesByMonth.get(month)?.push(activity);
        });
        return Array.from(activitiesByMonth.entries()).map(([month, activities]) => ({
          month,
          activities
        }));
      })
    );
  }
}
