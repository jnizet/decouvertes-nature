import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalDate, localDateToYearMonth, YearMonth } from '../../shared/types';
import { Activity, ActivityService } from '../activity.service';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
  startWith
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ALL_INTERCOMMUNALITIES } from '../../shared/municipalities';
import { infoCircleFill } from '../../bootstrap-icons/bootstrap-icons';

interface Month {
  month: YearMonth;
  activities: Array<Activity>;
}

interface FormValue {
  intercommunality: string;
}

@Component({
  selector: 'dn-events',
  templateUrl: './exportable-activities.component.html',
  styleUrls: ['./exportable-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportableActivitiesComponent {
  readonly months$: Observable<Array<Month>>;
  readonly form: FormGroup;
  readonly intercommunalityTypeahead: OperatorFunction<string, Array<string>> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      map(text => text.trim()),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : ALL_INTERCOMMUNALITIES.filter(intercommunality =>
              intercommunality.toLowerCase().includes(term.toLowerCase())
            ).slice(0, 10)
      )
    );
  readonly icons = {
    info: infoCircleFill
  };

  constructor(route: ActivatedRoute, activityService: ActivityService) {
    const formConfig: Record<keyof FormValue, any> = {
      intercommunality: new FormControl('')
    };
    this.form = new FormGroup(formConfig);

    const activities$ = activityService.findAll();
    const filter$ = this.form.valueChanges.pipe(startWith(this.form.value));
    const filteredActivities$ = combineLatest([activities$, filter$]).pipe(
      map(([activities, filter]) => this.filteredActivities(activities, filter))
    );

    this.months$ = filteredActivities$.pipe(
      map(activities => {
        const activitiesByMonth = new Map<LocalDate, Array<Activity>>();
        activities.forEach(activity => {
          const month = localDateToYearMonth(activity.startDate);
          if (!activitiesByMonth.has(month)) {
            activitiesByMonth.set(month, []);
          }
          activitiesByMonth.get(month)?.push(activity);
        });
        return Array.from(activitiesByMonth.entries()).map(([month, activities]) => ({
          month,
          activities
        }));
      })
    );
  }

  private filteredActivities(activities: Array<Activity>, filter: FormValue): Array<Activity> {
    return activities.filter(a => this.isAcceptedByFilter(a, filter));
  }

  private isAcceptedByFilter(activity: Activity, filter: FormValue): boolean {
    const intercommunalityFilter = filter.intercommunality.trim().toLowerCase();
    if (intercommunalityFilter) {
      return activity.intercommunality.toLowerCase().includes(intercommunalityFilter);
    } else {
      return true;
    }
  }
}
