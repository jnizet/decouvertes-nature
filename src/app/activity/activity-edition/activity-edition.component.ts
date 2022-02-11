import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LocalDate, LocalTime } from '../../shared/types';
import { ActivityCommand, ActivityService, ALL_ACTIVITY_TYPES } from '../activity.service';
import { ALL_MUNICIPALITIES, Municipality } from '../../shared/municipalities';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  OperatorFunction,
  pairwise,
  startWith,
  switchMap
} from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface Timing {
  startDate: LocalDate;
  endDate: LocalDate;
  startTime: LocalTime;
  endTime: LocalTime;
}

interface FormValue {
  type: string;
  title: string;
  animator: string;
  description: string;
  timing: Timing;
  location: string | Municipality | null;
  intercommunality: string;
  appointmentLocation: string;
  maxNumberOfParticipants: number | null;
  paymentRequired: boolean;
  price: number | null;
  roomToBook: string | null;
  bookingMandatory: boolean;
  membersOnly: boolean;
  accessible: boolean;
  labels: Array<string>;
  associatedOrganizations: Array<string>;
  comment: string;
}

function validateTiming(timingFormGroup: AbstractControl) {
  const { startDate, startTime, endDate, endTime }: Timing = timingFormGroup.value;
  if (startDate && startTime && endDate && endTime) {
    return `${startDate}T${startTime}` > `${endDate}T${endTime}` ? { timing: true } : null;
  } else {
    return null;
  }
}

const KNOWN_ROOMS_TO_BOOK = ['Maison de la Nature'];
const KNOWN_LABELS = [
  'Office du Tourisme de Saint-Etienne',
  'Journée Mondiale des Zones Humides',
  'Fête de la Nature',
  'Nuit de la chouette',
  'Nuit de la Chauve-souris'
];
const KNOWN_ORGANIZATIONS = ['Ocivélo', 'Vélo en Forez', 'Lerpt-Environnement', 'Astrojupiter'];

@Component({
  selector: 'dn-activity-edition',
  templateUrl: './activity-edition.component.html',
  styleUrls: ['./activity-edition.component.scss']
})
export class ActivityEditionComponent {
  readonly form: FormGroup;
  readonly activityTypes = ALL_ACTIVITY_TYPES;
  readonly minDate: NgbDateStruct = { year: 2022, month: 1, day: 1 };

  readonly locationTypeahead: OperatorFunction<string, ReadonlyArray<Municipality>> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : ALL_MUNICIPALITIES.filter(
              m => m.name.toLowerCase().includes(term.toLowerCase()) || m.postalCode.includes(term)
            ).slice(0, 10)
      )
    );
  readonly locationInputFormatter: (m: string | Municipality) => string = m =>
    typeof m === 'string' ? m : m.name;
  readonly locationResultFormatter: (m: Municipality) => string = m =>
    `${m.name} - ${m.postalCode}`;

  readonly roomTypeahead: OperatorFunction<string, ReadonlyArray<string>> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : KNOWN_ROOMS_TO_BOOK.filter(r => r.toLowerCase().includes(term.toLowerCase())).slice(
              0,
              10
            )
      )
    );

  readonly animatorTypeahead: OperatorFunction<string, ReadonlyArray<string>> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => (term.length < 1 ? of([]) : this.activityService.suggestAnimators(term)))
    );

  readonly knownLabels = KNOWN_LABELS;
  readonly knownOrganizations = KNOWN_ORGANIZATIONS;

  constructor(private activityService: ActivityService, private router: Router) {
    const paymentRequiredCtrl = new FormControl(false);
    const priceCtrl = new FormControl(null, [Validators.required, Validators.min(0)]);

    const startDateCtrl = new FormControl(null, Validators.required);
    const endDateCtrl = new FormControl(null, Validators.required);

    const timingConfig: Record<keyof Timing, any> = {
      startDate: startDateCtrl,
      startTime: new FormControl(null, Validators.required),
      endDate: endDateCtrl,
      endTime: new FormControl(null, Validators.required)
    };

    const afterStartValidator: ValidatorFn = control => validateTiming(control);
    const timingFormGroup = new FormGroup(timingConfig, { validators: afterStartValidator });

    const locationCtrl = new FormControl(null, Validators.required);
    const intercommunalityCtrl = new FormControl('');
    const appointmentLocationCtrl = new FormControl('', Validators.required);

    const config: Record<keyof FormValue, any> = {
      type: new FormControl(null, Validators.required),
      title: new FormControl('', Validators.required),
      animator: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      timing: timingFormGroup,
      location: locationCtrl,
      intercommunality: intercommunalityCtrl,
      appointmentLocation: appointmentLocationCtrl,
      maxNumberOfParticipants: new FormControl(null),
      paymentRequired: paymentRequiredCtrl,
      price: priceCtrl,
      roomToBook: new FormControl(null),
      bookingMandatory: new FormControl(false),
      membersOnly: new FormControl(false),
      accessible: new FormControl(false),
      labels: new FormControl([]),
      associatedOrganizations: new FormControl([]),
      comment: new FormControl('')
    };
    this.form = new FormGroup(config);

    priceCtrl.disable();
    paymentRequiredCtrl.valueChanges.subscribe((required: boolean) => {
      if (required) {
        priceCtrl.enable();
      } else {
        priceCtrl.disable();
      }
    });

    startDateCtrl.valueChanges
      .pipe(startWith(startDateCtrl.value), pairwise())
      .subscribe(([oldStartDate, newStartDate]) => {
        if ((newStartDate && !endDateCtrl.value) || endDateCtrl.value === oldStartDate) {
          endDateCtrl.setValue(newStartDate);
        }
      });

    locationCtrl.valueChanges
      .pipe(startWith(locationCtrl.value), pairwise())
      .subscribe(([oldLocation, newLocation]) => {
        if (newLocation) {
          const oldLocationString = this.locationInputFormatter(oldLocation ?? '');
          const newLocationString = this.locationInputFormatter(newLocation);
          if (
            !appointmentLocationCtrl.value ||
            appointmentLocationCtrl.value === oldLocationString
          ) {
            appointmentLocationCtrl.setValue(newLocationString);
          }

          const oldInterCommunality = (oldLocation as Municipality | null)?.intercommunality;
          if (
            ((newLocation as Municipality).intercommunality && !intercommunalityCtrl.value) ||
            intercommunalityCtrl.value === oldInterCommunality
          ) {
            intercommunalityCtrl.setValue((newLocation as Municipality).intercommunality);
          }
        }
      });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const formValue: FormValue = this.form.value;
    const command: ActivityCommand = {
      type: formValue.type,
      title: formValue.title,
      description: formValue.description,
      animator: formValue.animator,
      startDate: formValue.timing.startDate,
      startTime: formValue.timing.startTime,
      endDate: formValue.timing.endDate,
      endTime: formValue.timing.endTime,
      location: this.locationInputFormatter(formValue.location!),
      intercommunality: formValue.intercommunality,
      appointmentLocation: formValue.appointmentLocation,
      roomToBook: formValue.roomToBook,
      bookingMandatory: formValue.bookingMandatory,
      membersOnly: formValue.membersOnly,
      accessible: formValue.accessible,
      labels: formValue.labels,
      associatedOrganizations: formValue.associatedOrganizations,
      comment: formValue.comment
    };
    this.activityService.create(command).subscribe(() => {
      this.router.navigate(['/activities']);
    });
  }
}
