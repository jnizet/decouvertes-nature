import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ActivityLocation,
  UnmappedActivityLocation
} from '../activities-map/activities-map.component';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';
import { DecimalPipe } from '@angular/common';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-location',
  standalone: true,
  imports: [DecimalPipe, RouterLink, NgbCollapse, IconDirective, ActivityDatePipe],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  @Input({ required: true }) location!: ActivityLocation | UnmappedActivityLocation;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) collapsedId!: string;

  icons = icons;
}
