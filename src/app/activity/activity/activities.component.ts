import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';

@Component({
  selector: 'dn-events',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
  activities$: Observable<Array<Activity>>;

  constructor(eventService: ActivityService) {
    this.activities$ = eventService.findAll();
  }
}
