import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  switchScan
} from 'rxjs';
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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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

interface FocusAction {
  type: 'focus';
  location: ActivityLocation | null;
}

interface ToggleCollapseAction {
  type: 'toggleCollapse';
  location: ActivityLocation;
}

interface ToggleCollapseUnmappedAction {
  type: 'toggleCollapseUnmapped';
  location: UnmappedActivityLocation;
}

type Action = FocusAction | ToggleCollapseAction | ToggleCollapseUnmappedAction;

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
  private actionSubject = new Subject<Action>();

  vm: Signal<ViewModel | undefined>;
  icons = icons;

  constructor(
    activityService: ActivityService,
    private yearService: YearService
  ) {
    const vm$ = combineLatest([toObservable(yearService.year), activityService.findVisible()]).pipe(
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
                draftCount: 0,
                collapsed: true
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
                draftCount: 0,
                collapsed: true
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
      map(partialVm => ({ ...partialVm, focusedLocation: null })),
      switchMap(vm =>
        this.actionSubject.pipe(
          switchScan((vm, action) => this.applyAction(vm, action), vm),
          startWith(vm)
        )
      )
    );

    this.vm = toSignal(vm$);
  }

  setFocusedLocation(location: ActivityLocation | null) {
    this.actionSubject.next({ type: 'focus', location });
  }

  toggle(location: ActivityLocation) {
    this.actionSubject.next({ type: 'toggleCollapse', location });
  }

  toggleUnmapped(location: UnmappedActivityLocation) {
    this.actionSubject.next({ type: 'toggleCollapseUnmapped', location });
  }

  private isInYear(activity: Activity, year: number) {
    const startYear = parseISO(activity.startDate).getFullYear();
    const endYear = parseISO(activity.endDate ?? activity.startDate).getFullYear();
    return year >= startYear && year <= endYear;
  }

  private applyAction(vm: ViewModel, action: Action): Observable<ViewModel> {
    switch (action.type) {
      case 'focus':
        return this.switchFocus(vm, action);
      case 'toggleCollapse':
        return this.toggleCollapse(vm, action);
      case 'toggleCollapseUnmapped':
        return this.toggleCollapseUnmapped(vm, action);
    }
  }

  private switchFocus(vm: ViewModel, action: FocusAction): Observable<ViewModel> {
    return of({ ...vm, focusedLocation: action.location }).pipe(debounceTime(100));
  }

  private toggleCollapse(vm: ViewModel, action: ToggleCollapseAction): Observable<ViewModel> {
    return of({
      ...vm,
      mappedLocations: vm.mappedLocations.map(location => {
        if (location === action.location) {
          return { ...location, collapsed: !location.collapsed };
        } else {
          return location;
        }
      })
    });
  }

  private toggleCollapseUnmapped(
    vm: ViewModel,
    action: ToggleCollapseUnmappedAction
  ): Observable<ViewModel> {
    return of({
      ...vm,
      unmappedLocations: vm.unmappedLocations.map(location => {
        if (location === action.location) {
          return { ...location, collapsed: !location.collapsed };
        } else {
          return location;
        }
      })
    });
  }
}
