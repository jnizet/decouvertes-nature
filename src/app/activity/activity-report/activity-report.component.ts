import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivityReport } from '../activity.service';
import { IconDirective } from '../../icon/icon.directive';
import { DecimalPipe } from '@angular/common';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecimalPipe, IconDirective]
})
export class ActivityReportComponent {
  @Input({ required: true }) report!: ActivityReport;
  icons = icons;
}
