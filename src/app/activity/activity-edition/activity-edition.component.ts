import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LocalDate, LocalTime } from '../../shared/types';
import {
  Activity,
  ActivityCommand,
  ActivityService,
  ALL_ACTIVITY_TYPES
} from '../activity.service';
import { ALL_MUNICIPALITIES, Municipality } from '../../shared/municipalities';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  OperatorFunction,
  pairwise,
  startWith,
  switchMap
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { bookmarkPlus, fileArrowUp } from '../../bootstrap-icons/bootstrap-icons';
import { Auth } from '@angular/fire/auth';

interface Timing {
  startDate: LocalDate | null;
  endDate: LocalDate | null;
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
  mode: 'create' | 'edit' | 'duplicate' | null = null;
  editedActivity: Activity | null = null;

  readonly form: FormGroup;
  readonly activityTypes = ALL_ACTIVITY_TYPES;
  readonly minDate: LocalDate = '2022-01-01';

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
  icons = {
    bookToRoom: bookmarkPlus,
    save: fileArrowUp
  };

  constructor(
    route: ActivatedRoute,
    private activityService: ActivityService,
    private router: Router,
    private auth: Auth
  ) {
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

    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        switchMap(id => (id ? activityService.get(id) : of(null))),
        first()
      )
      .subscribe(activity => {
        this.mode = activity ? (route.snapshot.data['duplicate'] ? 'duplicate' : 'edit') : 'create';
        this.editedActivity = activity;

        if (activity) {
          const formValue: FormValue = {
            type: activity.type,
            title: activity.title,
            description: activity.description,
            animator: activity.animator,
            timing: {
              startDate: this.mode === 'edit' ? activity.startDate : null,
              startTime: activity.startTime,
              endDate: this.mode === 'edit' ? activity.endDate : null,
              endTime: activity.endTime
            },
            location: activity.location,
            intercommunality: activity.intercommunality,
            appointmentLocation: activity.appointmentLocation,
            roomToBook: activity.roomToBook,
            bookingMandatory: activity.bookingMandatory,
            membersOnly: activity.membersOnly,
            accessible: activity.accessible,
            labels: activity.labels,
            associatedOrganizations: activity.associatedOrganizations,
            maxNumberOfParticipants: activity.maxNumberOfParticipants,
            paymentRequired: activity.paymentRequired,
            price: activity.price,
            comment: activity.comment
          };

          this.form.setValue(formValue);
        }

        paymentRequiredCtrl.valueChanges
          .pipe(startWith(priceCtrl.value))
          .subscribe((required: boolean) => {
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
      maxNumberOfParticipants: formValue.maxNumberOfParticipants,
      paymentRequired: formValue.paymentRequired,
      price: formValue.price ?? null,
      startDate: formValue.timing.startDate!,
      startTime: formValue.timing.startTime,
      endDate: formValue.timing.endDate!,
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
      comment: formValue.comment,
      author: this.mode === 'edit' ? this.editedActivity!.author : this.auth.currentUser!.email!,
      lastModifier: this.mode === 'edit' ? this.auth.currentUser!.email! : null
    };

    const result$ =
      this.mode === 'create' || this.mode === 'duplicate'
        ? this.activityService.create(command)
        : this.activityService
            .update(this.editedActivity!.id, command)
            .pipe(map(() => this.editedActivity!));
    result$.subscribe(activity => {
      this.router.navigate(['/activities', activity.id]);
    });
  }
}
