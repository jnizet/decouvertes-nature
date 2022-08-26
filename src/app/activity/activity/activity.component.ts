import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Activity, ActivityReportCommand, ActivityService } from '../activity.service';
import {
  bookmarkPlus,
  bucket,
  calendar4Event,
  emojiLaughing,
  geoFill,
  lock,
  pencilSquare,
  people,
  peopleFill,
  personHearts,
  piggyBank,
  pinMap,
  subtract,
  tag,
  telephone,
  trash3,
  unlock
} from '../../bootstrap-icons/bootstrap-icons';
import { barredIcon, barredWheelchair, wheelchair } from '../../icon/icons';
import { ConfirmService } from '../../confirm/confirm.service';
import { CurrentUser, CurrentUserService } from '../../current-user.service';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { ActivityReportComponent } from '../activity-report/activity-report.component';
import { ActivityReportEditionComponent } from '../activity-report-edition/activity-report-edition.component';

@Component({
  selector: 'dn-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
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
  editingReport = false;

  icons = {
    date: calendar4Event,
    location: pinMap,
    appointmentLocation: geoFill,
    animator: emojiLaughing,
    roomToBook: bookmarkPlus,
    label: tag,
    associatedOrganization: peopleFill,
    bookingMandatory: telephone,
    bookingNotMandatory: barredIcon(telephone),
    membersOnly: lock,
    notMembersOnly: unlock,
    paymentRequired: piggyBank,
    paymentNotRequired: barredIcon(piggyBank),
    participants: people,
    edit: pencilSquare,
    accessible: wheelchair,
    notAccessible: barredWheelchair,
    delete: trash3,
    duplicate: subtract,
    equipment: bucket,
    accessibleToChildren: personHearts,
    notAccessibleToChildren: barredIcon(personHearts)
  };

  constructor(
    route: ActivatedRoute,
    private activityService: ActivityService,
    private confirmService: ConfirmService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    this.activity$ = route.paramMap.pipe(
      switchMap(paramMap => activityService.get(paramMap.get('id')!))
    );
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

  updateReport(activity: Activity, command: ActivityReportCommand) {
    this.activityService
      .updateReport(activity.id, command)
      .subscribe(() => (this.editingReport = false));
  }

  deleteReport(activity: Activity) {
    this.confirmService
      .confirm({
        message:
          'Voulez-vous vraiment supprimer ce rapport\u00a0?\nLa suppression est définitive et irréversible.'
      })
      .pipe(switchMap(() => this.activityService.deleteReport(activity.id)))
      .subscribe();
  }
}
