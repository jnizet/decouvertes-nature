import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import { LocalDate, localDateToYearMonth, YearMonth } from '../../shared/types';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { MonthPipe } from '../../month-pipe/month.pipe';

interface Month {
  month: YearMonth;
  activities: Array<Activity>;
}

@Component({
  selector: 'dn-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PageTitleDirective,
    LoadingSpinnerComponent,
    ActivityCardComponent,
    MonthPipe
  ]
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
