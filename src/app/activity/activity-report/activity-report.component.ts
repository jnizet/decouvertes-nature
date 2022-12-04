import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivityReport } from '../activity.service';
import { checkCircleFill, xCircleFill } from '../../bootstrap-icons/bootstrap-icons';
import { IconDirective } from '../../icon/icon.directive';
import { DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'dn-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, DecimalPipe, IconDirective]
})
export class ActivityReportComponent {
  @Input() report!: ActivityReport;
  icons = {
    cancelled: xCircleFill,
    notCancelled: checkCircleFill
  };
}
