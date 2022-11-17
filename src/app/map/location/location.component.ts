import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivityLocation,
  UnmappedActivityLocation
} from '../activities-map/activities-map.component';
import { chevronCompactUp } from '../../bootstrap-icons/bootstrap-icons';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { ActivityDatePipe } from '../../activity-date-pipe/activity-date.pipe';

@Component({
  selector: 'dn-location',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCollapseModule, IconDirective, ActivityDatePipe],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  @Input() location!: ActivityLocation | UnmappedActivityLocation;
  @Input() title!: string;
  @Input() collapsedId!: string;

  icons = {
    collapsed: chevronCompactUp
  };
}
