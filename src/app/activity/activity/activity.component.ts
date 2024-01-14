import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import * as icons from '../../icon/icons';
import { ConfirmService } from '../../confirm/confirm.service';
import { CurrentUserService } from '../../current-user.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { ActivityReportComponent } from '../activity-report/activity-report.component';
import { ActivityReportEditionComponent } from '../activity-report-edition/activity-report-edition.component';
import { CurrentActivityService } from '../current-activity.service';
import { Animator, AnimatorService } from '../../animator/animator.service';
import { ConsentComponent } from '../../animator/consent/consent.component';
import { toSignal } from '@angular/core/rxjs-interop';

interface ViewModel {
  activity: Activity;
  animator: Animator;
}

@Component({
  selector: 'dn-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DecimalPipe,
    CurrencyPipe,
    RouterLink,
    PageTitleDirective,
    IconDirective,
    ActivityDatePipe,
    ActivityTypePipe,
    ActivityReportComponent,
    ActivityReportEditionComponent,
    ConsentComponent
  ]
})
export class ActivityComponent {
  vm: Signal<ViewModel | undefined>;

  icons = icons;

  constructor(
    private currentActivityService: CurrentActivityService,
    private activityService: ActivityService,
    animatorService: AnimatorService,
    private confirmService: ConfirmService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    this.vm = toSignal(
      currentActivityService.activity$.pipe(
        switchMap(activity =>
          animatorService
            .getByNameOrCreate(activity.animator)
            .pipe(map(animator => ({ activity, animator })))
        )
      )
    );
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
