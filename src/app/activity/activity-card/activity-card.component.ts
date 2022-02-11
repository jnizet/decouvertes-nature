import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Activity } from '../activity.service';

@Component({
  selector: 'dn-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
}
