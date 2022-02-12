import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import {
  bookmarkPlus,
  calendar4Event,
  emojiLaughing,
  geoFill,
  lock,
  pencilSquare,
  people,
  peopleFill,
  piggyBank,
  pinMap,
  tag,
  telephone,
  unlock
} from '../../bootstrap-icons/bootstrap-icons';
import { barredIcon, barredWheelchair, wheelchair } from '../../icon/icons';

@Component({
  selector: 'dn-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent {
  activity$: Observable<Activity>;

  icons = {
    date: calendar4Event,
    location: pinMap,
    appointmentLocation: geoFill,
    animator: emojiLaughing,
    roomToBook: bookmarkPlus,
    label: tag,
    associatedOrganization: peopleFill,
    bookingMandatory: telephone,
    bookingNotMandatory: barredIcon(telephone),
    membersOnly: lock,
    notMembersOnly: unlock,
    paymentRequired: piggyBank,
    paymentNotRequired: barredIcon(piggyBank),
    participants: people,
    edit: pencilSquare,
    accessible: wheelchair,
    notAccessible: barredWheelchair
  };

  constructor(route: ActivatedRoute, activityService: ActivityService) {
    this.activity$ = route.paramMap.pipe(
      switchMap(paramMap => activityService.get(paramMap.get('id')!))
    );
  }
}
