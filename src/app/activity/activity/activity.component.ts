import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import * as icons from '../../icon/icons';
import { ConfirmService } from '../../confirm/confirm.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
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
  imports: [
    DecimalPipe,
    CurrencyPipe,
    RouterLink,
    PageTitleDirective,
    IconDirective,
    ActivityDatePipe,
    ActivityTypePipe,
    ConsentComponent
  ]
})
export class ActivityComponent {
  private activityService = inject(ActivityService);
  private confirmService = inject(ConfirmService);
  private router = inject(Router);

  vm: Signal<ViewModel | undefined>;

  icons = icons;

  constructor() {
    const currentActivityService = inject(CurrentActivityService);
    const animatorService = inject(AnimatorService);

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
