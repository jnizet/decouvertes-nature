import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, ActivityService } from '../activity.service';
import { plusCircle } from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-events',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
  activities$: Observable<Array<Activity>>;
  icons = {
    addActivity: plusCircle
  };

  constructor(eventService: ActivityService) {
    this.activities$ = eventService.findAll();
  }
}
