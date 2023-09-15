import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from '../activity.service';
import { NgIf } from '@angular/common';
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
  standalone: true,
  imports: [NgIf, RouterLink, IconDirective, ActivityTypePipe, ActivityDatePipe]
})
export class ActivityCardComponent {
  @Input({ required: true }) activity!: Activity;
  icons = icons;
}
