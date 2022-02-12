import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Activity } from '../activity.service';
import {
  bookmarkPlus,
  calendar4Event,
  emojiLaughing,
  pinMap
} from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
  icons = {
    date: calendar4Event,
    location: pinMap,
    animator: emojiLaughing,
    bookToRoom: bookmarkPlus
  };
}
