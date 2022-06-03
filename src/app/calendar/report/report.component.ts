import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../../activity/activity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dn-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class ReportComponent {
  total = 0;
  cancelled = 0;
  done = 0;
  withoutReport = 0;
  participants = 0;

  @Input()
  set activities(activities: Array<Activity>) {
    this.total = 0;
    this.cancelled = 0;
    this.done = 0;
    this.withoutReport = 0;
    this.participants = 0;
    activities.forEach(activity => {
      this.total++;
      if (activity.report) {
        if (activity.report.cancelled) {
          this.cancelled++;
        } else {
          this.done++;
          this.participants += activity.report.numberOfParticipants;
        }
      } else {
        this.withoutReport++;
      }
    });
  }
}
