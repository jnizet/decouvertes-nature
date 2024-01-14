import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { map } from 'rxjs';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { MonthPipe } from '../../month-pipe/month.pipe';
import { groupByYearAndMonth, YearOfActivities } from '../activity-utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dn-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageTitleDirective, LoadingSpinnerComponent, ActivityCardComponent, MonthPipe]
})
export class ActivitiesComponent {
  years: Signal<Array<YearOfActivities> | undefined>;
  mode: 'all' | 'mine';
  constructor(route: ActivatedRoute, activityService: ActivityService) {
    this.mode = route.snapshot.data['mode'];
    const activities$ =
      this.mode === 'all' ? activityService.findVisible() : activityService.findMine();
    this.years = toSignal(activities$.pipe(map(activities => groupByYearAndMonth(activities))));
  }
}
