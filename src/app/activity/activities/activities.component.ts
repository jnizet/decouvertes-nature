import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { MonthPipe } from '../../month-pipe/month.pipe';
import { groupByYearAndMonth, YearOfActivities } from '../activity-utils';

@Component({
  selector: 'dn-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    PageTitleDirective,
    LoadingSpinnerComponent,
    ActivityCardComponent,
    MonthPipe
  ]
})
export class ActivitiesComponent {
  years$: Observable<Array<YearOfActivities>>;
  mode: 'all' | 'mine';
  constructor(route: ActivatedRoute, activityService: ActivityService) {
    this.mode = route.snapshot.data['mode'];
    const activities$ =
      this.mode === 'all' ? activityService.findVisible() : activityService.findMine();
    this.years$ = activities$.pipe(map(activities => groupByYearAndMonth(activities)));
  }
}
