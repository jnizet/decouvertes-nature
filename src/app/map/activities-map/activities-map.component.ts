import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap
} from 'rxjs';
import {
  arrowLeftCircle,
  arrowRightCircle,
  plusCircle
} from '../../bootstrap-icons/bootstrap-icons';
import { Activity, ActivityService } from '../../activity/activity.service';
import { parseISO } from 'date-fns';
import { ALL_MUNICIPALITIES, Municipality } from '../../shared/municipalities';
import { CommonModule } from '@angular/common';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { IconDirective } from '../../icon/icon.directive';
import { MapComponent } from '../map/map.component';

export interface ActivityLocation {
  municipality: Municipality;
  activities: Array<Activity>;
  draftCount: number;
}

export interface UnmappedActivityLocation {
  location: string;
  activities: Array<Activity>;
  draftCount: number;
}

interface ViewModel {
  year: number;
  mappedLocations: Array<ActivityLocation>;
  unmappedLocations: Array<UnmappedActivityLocation>;
  focusedLocation: ActivityLocation | null;
}

@Component({
  selector: 'dn-activities-map',
  templateUrl: './activities-map.component.html',
  styleUrls: ['./activities-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PageTitleDirective, LoadingSpinnerComponent, IconDirective, MapComponent]
})
export class ActivitiesMapComponent {
  private yearSubject = new BehaviorSubject<number>(new Date().getFullYear());
  private focusedLocationSubject = new Subject<ActivityLocation | null>();
  vm$: Observable<ViewModel>;
  icons = {
    left: arrowLeftCircle,
    right: arrowRightCircle,
    addActivity: plusCircle
  };

  constructor(activityService: ActivityService) {
    this.vm$ = combineLatest([this.yearSubject, activityService.findVisible()]).pipe(
      map(([year, activities]) => {
        // reverse to have them in chronological order, since the backend returns them in anti-chronological order
        const yearActivities = activities
          .filter(activity => this.isInYear(activity, year))
          .reverse();
        const mappedLocations = new Map<Municipality, ActivityLocation>();
        const unmappedLocations = new Map<string, UnmappedActivityLocation>();
        for (const activity of yearActivities) {
          const municipality = ALL_MUNICIPALITIES.find(m => m.name === activity.location);
          if (municipality) {
            let location = mappedLocations.get(municipality);
            if (!location) {
              location = {
                municipality,
                activities: [],
                draftCount: 0
              };
              mappedLocations.set(municipality, location);
            }
            location.activities.push(activity);
            if (activity.draft) {
              location.draftCount++;
            }
          } else {
            let location = unmappedLocations.get(activity.location);
            if (!location) {
              location = {
                location: activity.location,
                activities: [],
                draftCount: 0
              };
              unmappedLocations.set(activity.location, location);
            }
            location.activities.push(activity);
            if (activity.draft) {
              location.draftCount++;
            }
          }
        }
        return {
          year,
          mappedLocations: [...mappedLocations.values()].sort((l1, l2) =>
            l1.municipality.name < l2.municipality.name ? -1 : 1
          ),
          unmappedLocations: [...unmappedLocations.values()].sort((l1, l2) =>
            l1.location < l2.location ? -1 : 1
          )
        };
      }),
      switchMap(partialVm =>
        this.focusedLocationSubject.pipe(
          startWith(null),
          map(focusedLocation => ({ ...partialVm, focusedLocation })),
          debounceTime(100)
        )
      )
    );
  }

  changeYear(number: number) {
    this.yearSubject.next(number);
  }

  setFocusedLocation(location: ActivityLocation | null) {
    this.focusedLocationSubject.next(location);
  }

  private isInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    const endYear = parseISO(activity.endDate ?? activity.startDate).getFullYear();
    return year >= startYear && year <= endYear;
  }
}
