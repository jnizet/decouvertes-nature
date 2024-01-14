import { Component, Signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { Activity, ActivityReportCommand, ActivityService } from '../activity.service';
import { CurrentUser, CurrentUserService } from '../../current-user.service';
import { CurrentActivityService } from '../current-activity.service';
import { ActivityReportComponent } from '../activity-report/activity-report.component';
import { IconDirective } from '../../icon/icon.directive';
import { ConfirmService } from '../../confirm/confirm.service';
import { ActivityReportEditionComponent } from '../activity-report-edition/activity-report-edition.component';
import * as icons from '../../icon/icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dn-activity-report-container',
  standalone: true,
  imports: [ActivityReportComponent, IconDirective, ActivityReportEditionComponent],
  templateUrl: './activity-report-container.component.html',
  styleUrls: ['./activity-report-container.component.scss']
})
export class ActivityReportContainerComponent {
  activity: Signal<Activity | undefined>;
  currentUser: Signal<CurrentUser | null>;

  editingReport = false;
  icons = icons;

  constructor(
    currentActivityService: CurrentActivityService,
    currentUserService: CurrentUserService,
    private activityService: ActivityService,
    private confirmService: ConfirmService
  ) {
    this.activity = toSignal(currentActivityService.activity$);
    this.currentUser = currentUserService.currentUser;
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
