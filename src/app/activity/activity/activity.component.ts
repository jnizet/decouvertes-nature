import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import * as icons from '../../icon/icons';
import { ConfirmService } from '../../confirm/confirm.service';
import { CurrentUser, CurrentUserService } from '../../current-user.service';
import { AsyncPipe, CurrencyPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { ActivityReportComponent } from '../activity-report/activity-report.component';
import { ActivityReportEditionComponent } from '../activity-report-edition/activity-report-edition.component';
import { CurrentActivityService } from '../current-activity.service';

@Component({
  selector: 'dn-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    DecimalPipe,
    CurrencyPipe,
    RouterLink,
    PageTitleDirective,
    IconDirective,
    ActivityDatePipe,
    ActivityTypePipe,
    ActivityReportComponent,
    ActivityReportEditionComponent
  ]
})
export class ActivityComponent {
  activity$: Observable<Activity>;
  currentUser$: Observable<CurrentUser | null>;

  icons = icons;

  constructor(
    route: ActivatedRoute,
    private currentActivityService: CurrentActivityService,
    private activityService: ActivityService,
    private confirmService: ConfirmService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    this.activity$ = currentActivityService.activity$;
    this.currentUser$ = this.currentUserService.getCurrentUser();
  }

  deleteActivity(activity: Activity) {
    this.confirmService
      .confirm({
        message:
          'Voulez-vous vraiment supprimer cette activité\u00a0?\nLa suppression est définitive et irréversible.'
      })
      .pipe(switchMap(() => this.activityService.deleteActivity(activity.id)))
      .subscribe(() => this.router.navigate(['/activities']));
  }
}
