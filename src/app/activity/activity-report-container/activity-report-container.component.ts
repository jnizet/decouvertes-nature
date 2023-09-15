import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { Activity, ActivityReportCommand, ActivityService } from '../activity.service';
import { CurrentUser, CurrentUserService } from '../../current-user.service';
import { CurrentActivityService } from '../current-activity.service';
import { ActivityReportComponent } from '../activity-report/activity-report.component';
import { IconDirective } from '../../icon/icon.directive';
import { ConfirmService } from '../../confirm/confirm.service';
import { ActivityReportEditionComponent } from '../activity-report-edition/activity-report-edition.component';
import * as icons from '../../icon/icons';

interface ViewModel {
  currentUser: CurrentUser | null;
  activity: Activity;
}

@Component({
  selector: 'dn-activity-report-container',
  standalone: true,
  imports: [CommonModule, ActivityReportComponent, IconDirective, ActivityReportEditionComponent],
  templateUrl: './activity-report-container.component.html',
  styleUrls: ['./activity-report-container.component.scss']
})
export class ActivityReportContainerComponent {
  vm$: Observable<ViewModel>;

  editingReport = false;
  icons = icons;

  constructor(
    currentActivityService: CurrentActivityService,
    currentUserService: CurrentUserService,
    private activityService: ActivityService,
    private confirmService: ConfirmService
  ) {
    this.vm$ = combineLatest({
      activity: currentActivityService.activity$,
      currentUser: currentUserService.getCurrentUser()
    });
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
