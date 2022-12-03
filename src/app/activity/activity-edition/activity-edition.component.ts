import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { LocalDate, LocalTime } from '../../shared/types';
import {
  Activity,
  ActivityCommand,
  ActivityService,
  ALL_ACTIVITY_TYPES
} from '../activity.service';
import { ALL_MUNICIPALITIES, Municipality } from '../../shared/municipalities';
import {
  combineLatest,
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
import { fileArrowUp, journalArrowUp } from '../../bootstrap-icons/bootstrap-icons';
import { CurrentUserService } from '../../current-user.service';
import { Spinner } from '../../shared/spinner';
import { CommonModule } from '@angular/common';
import { ValidationErrorDirective, ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';
import { NgbCollapse, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { MultiChoiceComponent } from '../multi-choice/multi-choice.component';
import { PageTitleDirective } from '../../page-title/page-title.directive';

interface Timing {
  startDate: LocalDate | null;
  endDate: LocalDate | null;
  startTime: LocalTime | null;
  endTime: LocalTime | null;
}

function validateTiming(timingFormGroup: AbstractControl<Timing>) {
  const { startDate, startTime, endDate, endTime }: Timing = timingFormGroup.value;
  if (startDate && startTime && endDate && endTime) {
    return `${startDate}T${startTime}` > `${endDate}T${endTime}` ? { timing: true } : null;
  } else {
    return null;
  }
}

const KNOWN_ROOMS_TO_BOOK = ['Maison de la Nature'];
const KNOWN_LABELS = [
  'Fête de la Nature',
  'Journée Mondiale des Zones Humides',
  'Nuit de la chouette',
  'Nuit de la Chauve-souris',
  'Office du Tourisme de Saint-Etienne',
  'Refuge LPO'
];
const KNOWN_ORGANIZATIONS = ['Astrojupiter', 'Lerpt-Environnement', 'Ocivélo', 'Vélo en Forez'];
const KNOWN_EQUIPMENTS = [
  "Boîte d'observation",
  'Bottes',
  'Pique-nique',
  'Vélo',
  'Vidéo-projecteur'
];

const requiredExceptWhenDraft: ValidatorFn = ctrl => {
  return Validators.required(ctrl) ? { requiredExceptWhenDraft: true } : null;
};

class DraftManager {
  private fieldsAndValidators: Array<[AbstractControl, ValidatorFn]> = [];
  private _mode: 'draft' | 'final' = 'draft';

  initialize(form: ActivityFormGroup, maySaveAsDraft: boolean) {
    const requiredValidator = maySaveAsDraft ? requiredExceptWhenDraft : Validators.required;
    this.fieldsAndValidators = [
      [form.get('description')!, requiredValidator],
      [form.get('timing.startTime')!, requiredValidator],
      [form.get('timing.endDate')!, requiredValidator],
      [form.get('timing.endTime')!, requiredValidator],
      [form.get('location')!, requiredValidator],
      [form.get('appointmentLocation')!, requiredValidator]
    ];
  }

  switchTo(mode: 'draft' | 'final') {
    if (this._mode !== mode) {
      this._mode = mode;
      if (mode === 'draft') {
        this.fieldsAndValidators.forEach(([ctrl, validator]) => ctrl.removeValidators(validator));
      } else {
        this.fieldsAndValidators.forEach(([ctrl, validator]) => ctrl.addValidators(validator));
      }
      this.fieldsAndValidators.forEach(([ctrl]) => ctrl.updateValueAndValidity());
    }
  }

  get mode() {
    return this._mode;
  }
}

type ActivityFormGroup = FormGroup<{
  type: FormControl<string | null>;
  title: FormControl<string | null>;
  animator: FormControl<string | null>;
  description: FormControl<string | null>;
  timing: FormGroup<{
    startDate: FormControl<LocalDate | null>;
    endDate: FormControl<LocalDate | null>;
    startTime: FormControl<LocalTime | null>;
    endTime: FormControl<LocalTime | null>;
  }>;
  location: FormControl<string | Municipality | null>; // can really be null
  intercommunality: FormControl<string | null>;
  appointmentLocation: FormControl<string | null>;
  minNumberOfParticipants: FormControl<number | null>; // can really be null
  maxNumberOfParticipants: FormControl<number | null>; // can really be null
  paymentRequired: FormControl<boolean | null>;
  price: FormControl<number | null>; // can really be null
  roomToBook: FormControl<string | null>; // can really be null
  bookingMandatory: FormControl<boolean | null>;
  membersOnly: FormControl<boolean | null>;
  accessible: FormControl<boolean | null>;
  accessibleToChildren: FormControl<boolean | null>;
  minChildrenAge: FormControl<number | null>; // can really be null
  labels: FormControl<Array<string> | null>;
  associatedOrganizations: FormControl<Array<string> | null>;
  equipments: FormControl<Array<string> | null>;
  comment: FormControl<string | null>;
}>;

@Component({
  selector: 'dn-activity-edition',
  templateUrl: './activity-edition.component.html',
  styleUrls: ['./activity-edition.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTypeahead,
    NgbCollapse,
    ValidationErrorsComponent,
    ValidationErrorDirective,
    FormControlValidationDirective,
    PageTitleDirective,
    IconDirective,
    MultiChoiceComponent
  ]
})
export class ActivityEditionComponent {
  mode: 'create' | 'edit' | 'duplicate' | null = null;
  editedActivity: Activity | null = null;

  readonly form: ActivityFormGroup;
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
    m ? (typeof m === 'string' ? m : m.name) : '';
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
  readonly knownEquipments = KNOWN_EQUIPMENTS;
  readonly icons = {
    save: fileArrowUp,
    saveAsDraft: journalArrowUp
  };
  readonly saving = new Spinner();
  readonly savingAsDraft = new Spinner();
  readonly savingWhateverTheMode$ = combineLatest([
    this.saving.isSpinning,
    this.savingAsDraft.isSpinning
  ]).pipe(map(([saving, savingAsDraft]) => saving || savingAsDraft));

  readonly draftManager = new DraftManager();

  constructor(
    route: ActivatedRoute,
    private activityService: ActivityService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    const paymentRequiredCtrl = new FormControl(false);
    const priceCtrl = new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0)
    ]);

    const startDateCtrl = new FormControl<LocalDate | null>(null, Validators.required);
    const endDateCtrl = new FormControl<LocalDate | null>(null);

    const timingConfig: Record<keyof Timing, any> = {
      startDate: startDateCtrl,
      startTime: new FormControl<LocalTime | null>(null),
      endDate: endDateCtrl,
      endTime: new FormControl<LocalTime | null>(null)
    };

    const afterStartValidator: ValidatorFn = control => validateTiming(control);
    const timingFormGroup = new FormGroup(timingConfig, { validators: afterStartValidator });

    const locationCtrl = new FormControl<string | Municipality | null>(null);
    const intercommunalityCtrl = new FormControl('');
    const appointmentLocationCtrl = new FormControl('');

    const accessibleToChildrenCtrl = new FormControl<boolean | null>(false);
    const minChildrenAgeCtrl = new FormControl<number | null>(null, Validators.min(1));

    this.form = new FormGroup({
      type: new FormControl<string | null>(null, Validators.required),
      title: new FormControl('', Validators.required),
      animator: new FormControl('', Validators.required),
      description: new FormControl(''),
      timing: timingFormGroup,
      location: locationCtrl,
      intercommunality: intercommunalityCtrl,
      appointmentLocation: appointmentLocationCtrl,
      minNumberOfParticipants: new FormControl<number | null>(null, Validators.min(1)),
      maxNumberOfParticipants: new FormControl<number | null>(null, Validators.min(1)),
      paymentRequired: paymentRequiredCtrl,
      price: priceCtrl,
      roomToBook: new FormControl<string | null>(null),
      bookingMandatory: new FormControl<boolean | null>(false),
      membersOnly: new FormControl<boolean | null>(false),
      accessible: new FormControl<boolean | null>(false),
      accessibleToChildren: accessibleToChildrenCtrl,
      minChildrenAge: minChildrenAgeCtrl,
      labels: new FormControl<Array<string>>([]),
      associatedOrganizations: new FormControl<Array<string>>([]),
      equipments: new FormControl<Array<string>>([]),
      comment: new FormControl('')
    });

    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        switchMap(id => (id ? activityService.get(id) : of(null))),
        first()
      )
      .subscribe(activity => {
        this.mode = activity ? (route.snapshot.data['duplicate'] ? 'duplicate' : 'edit') : 'create';
        this.editedActivity = activity;
        this.draftManager.initialize(this.form, this.maySaveAsDraft);
        this.draftManager.switchTo('final');

        if (activity) {
          const formValue = {
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
            accessibleToChildren: activity.accessibleToChildren ?? false,
            minChildrenAge: activity.minChildrenAge ?? null,
            labels: activity.labels,
            associatedOrganizations: activity.associatedOrganizations,
            equipments: activity.equipments,
            minNumberOfParticipants: activity.minNumberOfParticipants,
            maxNumberOfParticipants: activity.maxNumberOfParticipants,
            paymentRequired: activity.paymentRequired,
            price: activity.price,
            comment: activity.comment
          };

          this.form.setValue(formValue);
        }

        paymentRequiredCtrl.valueChanges
          .pipe(startWith(paymentRequiredCtrl.value))
          .subscribe((required: boolean | null) => {
            if (required) {
              priceCtrl.enable();
            } else {
              priceCtrl.disable();
            }
          });

        accessibleToChildrenCtrl.valueChanges
          .pipe(startWith(accessibleToChildrenCtrl.value))
          .subscribe((required: boolean | null) => {
            if (required) {
              minChildrenAgeCtrl.enable();
            } else {
              minChildrenAgeCtrl.disable();
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

              if ((newLocation as Municipality).intercommunality) {
                intercommunalityCtrl.setValue((newLocation as Municipality).intercommunality);
              }
            }
          });
      });
  }

  get maySaveAsDraft() {
    return (
      this.mode === 'create' ||
      this.mode === 'duplicate' ||
      (!!this.editedActivity && this.editedActivity.draft)
    );
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const command: ActivityCommand = {
      type: formValue.type!,
      title: formValue.title!,
      description: formValue.description!,
      animator: formValue.animator!,
      minNumberOfParticipants: formValue.minNumberOfParticipants!,
      maxNumberOfParticipants: formValue.maxNumberOfParticipants!,
      paymentRequired: formValue.paymentRequired!,
      price: formValue.price ?? null,
      startDate: formValue.timing!.startDate!,
      startTime: formValue.timing!.startTime!,
      endDate: formValue.timing!.endDate!,
      endTime: formValue.timing!.endTime!,
      location: this.locationInputFormatter(formValue.location!),
      intercommunality: formValue.intercommunality!,
      appointmentLocation: formValue.appointmentLocation!,
      roomToBook: formValue.roomToBook!,
      bookingMandatory: formValue.bookingMandatory!,
      membersOnly: formValue.membersOnly!,
      accessible: formValue.accessible!,
      accessibleToChildren: formValue.accessibleToChildren!,
      minChildrenAge: formValue.minChildrenAge ?? null,
      labels: formValue.labels!,
      associatedOrganizations: formValue.associatedOrganizations!,
      equipments: formValue.equipments!,
      comment: formValue.comment!,
      author:
        this.mode === 'edit'
          ? this.editedActivity!.author
          : this.currentUserService.getCurrentAuditUser(),
      lastModifier: this.mode === 'edit' ? this.currentUserService.getCurrentAuditUser() : null,
      draft: this.draftManager.mode === 'draft'
    };

    const spinner = this.draftManager.mode === 'draft' ? this.savingAsDraft : this.saving;
    const result$ =
      this.mode === 'create' || this.mode === 'duplicate'
        ? this.activityService.create(command)
        : this.activityService
            .update(this.editedActivity!.id, command)
            .pipe(map(() => this.editedActivity!));
    result$.pipe(spinner.spinUntilFinalization()).subscribe(activity => {
      this.router.navigate(['/activities', activity.id]);
    });
  }
}
