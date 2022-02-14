import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../activity.service';

@Component({
  selector: 'dn-exportable-activity',
  templateUrl: './exportable-activity.component.html',
  styleUrls: ['./exportable-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportableActivityComponent {
  @Input() activity!: Activity;
}
