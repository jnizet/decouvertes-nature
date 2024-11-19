import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Activity } from '../activity.service';

import { IconDirective } from '../../icon/icon.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { ActivityTypePipe } from '../../activity-type-pipe/activity-type.pipe';
import { RouterLink } from '@angular/router';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconDirective, ActivityTypePipe, ActivityDatePipe]
})
export class ActivityCardComponent {
  activity = input.required<Activity>();
  icons = icons;
}
