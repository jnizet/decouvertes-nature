import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ALL_INTERCOMMUNALITIES } from '../../shared/municipalities';
import { ExportableActivityComponent } from '../exportable-activity/exportable-activity.component';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { IconDirective } from '../../icon/icon.directive';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { MonthPipe } from '../../month-pipe/month.pipe';
import * as icons from '../../icon/icons';
import { groupByYearAndMonth, YearOfActivities } from '../activity-utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dn-exportable-activities',
  templateUrl: './exportable-activities.component.html',
  styleUrls: ['./exportable-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeahead,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective,
    MonthPipe,
    ExportableActivityComponent
  ]
})
export class ExportableActivitiesComponent {
  readonly years: Signal<Array<YearOfActivities> | undefined>;
  readonly form = new FormGroup({
    intercommunality: new FormControl('')
  });
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
  readonly icons = icons;

  constructor() {
    const activityService = inject(ActivityService);

    const activities$ = activityService.findNonDraft();
    const filter$ = this.form.valueChanges.pipe(startWith(this.form.value));
    const filteredActivities$ = combineLatest([activities$, filter$]).pipe(
      map(([activities, filter]) =>
        this.filteredActivities(activities, { intercommunality: filter.intercommunality! })
      )
    );

    this.years = toSignal(
      filteredActivities$.pipe(map(activities => groupByYearAndMonth(activities)))
    );
  }

  private filteredActivities(
    activities: Array<Activity>,
    filter: { intercommunality: string }
  ): Array<Activity> {
    return activities.filter(a => this.isAcceptedByFilter(a, filter));
  }

  private isAcceptedByFilter(activity: Activity, filter: { intercommunality: string }): boolean {
    const intercommunalityFilter = filter.intercommunality.trim().toLowerCase();
    if (intercommunalityFilter) {
      return activity.intercommunality.toLowerCase().includes(intercommunalityFilter);
    } else {
      return true;
    }
  }
}
