import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { Activity, ActivityService } from '../../activity/activity.service';
import { parseISO } from 'date-fns';
import { ALL_MUNICIPALITIES, Municipality } from '../../shared/municipalities';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { IconDirective } from '../../icon/icon.directive';
import { MapComponent } from '../map/map.component';
import { LocationComponent } from '../location/location.component';
import { YearService } from '../../year.service';
import { YearSelectorComponent } from '../../year-selector/year-selector.component';
import { RouterLink } from '@angular/router';
import * as icons from '../../icon/icons';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, startWith, Subject } from 'rxjs';

export interface ActivityLocation {
  municipality: Municipality;
  activities: Array<Activity>;
  draftCount: number;
  collapsed: boolean;
}

export interface UnmappedActivityLocation {
  location: string;
  activities: Array<Activity>;
  draftCount: number;
  collapsed: boolean;
}

interface ViewModel {
  year: number;
  mappedLocations: Array<ActivityLocation>;
  unmappedLocations: Array<UnmappedActivityLocation>;
  focusedLocation: ActivityLocation | null;
}

function mappedLocationId(municipality: Municipality): string {
  return `mapped-${municipality.postalCode}-${municipality.name}`;
}
function unmappedLocationId(location: string): string {
  return `unmapped-${location}`;
}

@Component({
  selector: 'dn-activities-map',
  templateUrl: './activities-map.component.html',
  styleUrls: ['./activities-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective,
    MapComponent,
    LocationComponent,
    YearSelectorComponent
  ]
})
export class ActivitiesMapComponent {
  vm: Signal<ViewModel | undefined>;
  icons = icons;

  private expandedLocationIds = signal<Array<string>>([]);
  private focusedLocationIdSubject = new Subject<string | null>();
  private focusedLocationId = toSignal(
    this.focusedLocationIdSubject.pipe(startWith(null), debounceTime(100))
  );

  constructor(activityService: ActivityService, yearService: YearService) {
    const visibleActivities = toSignal(activityService.findVisible());
    this.vm = computed(() => {
      const activities = visibleActivities();
      const year = yearService.year();
      const expandedLocationIds = this.expandedLocationIds();
      const focusedLocationId = this.focusedLocationId();

      if (!activities) {
        return undefined;
      }

      const yearActivities = activities.filter(activity => this.isInYear(activity, year)).reverse();
      const mappedLocations = new Map<string, ActivityLocation>();
      const unmappedLocations = new Map<string, UnmappedActivityLocation>();
      for (const activity of yearActivities) {
        const municipality = ALL_MUNICIPALITIES.find(m => m.name === activity.location);
        if (municipality) {
          const locationId = mappedLocationId(municipality);
          let location = mappedLocations.get(locationId);
          if (!location) {
            location = {
              municipality,
              activities: [],
              draftCount: 0,
              collapsed: true
            };
            mappedLocations.set(locationId, location);
          }
          location.activities.push(activity);
          if (activity.draft) {
            location.draftCount++;
          }
          location.collapsed = !expandedLocationIds.includes(locationId);
        } else {
          const locationId = unmappedLocationId(activity.location);
          let location = unmappedLocations.get(locationId);
          if (!location) {
            location = {
              location: activity.location,
              activities: [],
              draftCount: 0,
              collapsed: true
            };
            unmappedLocations.set(activity.location, location);
          }
          location.activities.push(activity);
          if (activity.draft) {
            location.draftCount++;
          }
          location.collapsed = !expandedLocationIds.includes(locationId);
        }
      }

      const focusedLocation: ActivityLocation | null =
        focusedLocationId == null ? null : (mappedLocations.get(focusedLocationId) ?? null);

      return {
        year,
        mappedLocations: [...mappedLocations.values()].sort((l1, l2) =>
          l1.municipality.name < l2.municipality.name ? -1 : 1
        ),
        unmappedLocations: [...unmappedLocations.values()].sort((l1, l2) =>
          l1.location < l2.location ? -1 : 1
        ),
        focusedLocation
      };
    });
  }

  setFocusedLocation(location: ActivityLocation | null) {
    this.focusedLocationIdSubject.next(
      location == null ? null : mappedLocationId(location.municipality)
    );
  }

  toggleMapped(location: ActivityLocation) {
    this.toggle(mappedLocationId(location.municipality), location.collapsed);
  }

  toggleUnmapped(location: UnmappedActivityLocation) {
    this.toggle(unmappedLocationId(location.location), location.collapsed);
  }

  private toggle(locationId: string, collapsed: boolean) {
    this.expandedLocationIds.update(ids => {
      if (collapsed) {
        return [...ids, locationId];
      } else {
        return ids.filter(id => id !== locationId);
      }
    });
  }

  private isInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    const endYear = parseISO(activity.endDate ?? activity.startDate).getFullYear();
    return year >= startYear && year <= endYear;
  }
}
