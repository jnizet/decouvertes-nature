import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { Activity } from '../../activity/activity.service';
import { DecimalPipe, PercentPipe } from '@angular/common';

interface ViewModel {
  total: number;
  cancelled: number;
  done: number;
  withoutReport: number;
  participants: number;
}

@Component({
  selector: 'dn-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe, PercentPipe]
})
export class ReportComponent {
  activities = input.required<Array<Activity>>();
  vm: Signal<ViewModel> = computed(() => {
    let total = 0;
    let cancelled = 0;
    let done = 0;
    let withoutReport = 0;
    let participants = 0;
    this.activities().forEach(activity => {
      total++;
      if (activity.report) {
        if (activity.report.cancelled) {
          cancelled++;
        } else {
          done++;
          participants += activity.report.numberOfParticipants;
        }
      } else {
        withoutReport++;
      }
    });
    return {
      total,
      cancelled,
      done,
      withoutReport,
      participants
    };
  });
}
