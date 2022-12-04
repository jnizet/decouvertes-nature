import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../activity.service';
import { CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';

@Component({
  selector: 'dn-exportable-activity',
  templateUrl: './exportable-activity.component.html',
  styleUrls: ['./exportable-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, CurrencyPipe, DecimalPipe, ActivityTypePipe, ActivityDatePipe]
})
export class ExportableActivityComponent {
  @Input() activity!: Activity;
}
