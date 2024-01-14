import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Activity } from '../activity.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';

@Component({
  selector: 'dn-exportable-activity',
  templateUrl: './exportable-activity.component.html',
  styleUrls: ['./exportable-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, ActivityTypePipe, ActivityDatePipe]
})
export class ExportableActivityComponent {
  activity = input.required<Activity>();
}
