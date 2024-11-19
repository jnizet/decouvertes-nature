import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  imports: [DecimalPipe, RouterLink, NgbCollapse, IconDirective, ActivityDatePipe],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  location = input.required<ActivityLocation | UnmappedActivityLocation>();
  title = input.required<string>();
  collapsedId = input.required<string>();

  icons = icons;
}
