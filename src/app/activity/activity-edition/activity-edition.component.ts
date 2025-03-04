import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
import { CurrentUserService } from '../../current-user.service';
import { Spinner } from '../../shared/spinner';
import { ValidationErrorDirective, ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';
import { NgbCollapse, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { MultiChoiceComponent } from '../multi-choice/multi-choice.component';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';
import { AnimatorEditionModalComponent } from '../../animator/animator-edition-modal/animator-edition-modal.component';
import { Animator, AnimatorService } from '../../animator/animator.service';
import { ToastService } from '../../toast/toast.service';

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
  private _mode = signal<'draft' | 'final'>('draft');
  readonly mode = this._mode.asReadonly();

  initialize(form: ActivityFormGroup, maySaveAsDraft: boolean) {
    const requiredValidator = maySaveAsDraft ? requiredExceptWhenDraft : Validators.required;
    this.fieldsAndValidators = [
      [form.controls.description, requiredValidator],
      [form.controls.timing.controls.startTime, requiredValidator],
      [form.controls.timing.controls.endDate, requiredValidator],
      [form.controls.timing.controls.endTime, requiredValidator],
      [form.controls.location, requiredValidator],
      [form.controls.appointmentLocation, requiredValidator]
    ];
  }

  switchTo(mode: 'draft' | 'final') {
    if (this._mode() !== mode) {
      this._mode.set(mode);
      if (mode === 'draft') {
        this.fieldsAndValidators.forEach(([ctrl, validator]) => ctrl.removeValidators(validator));
      } else {
        this.fieldsAndValidators.forEach(([ctrl, validator]) => ctrl.addValidators(validator));
      }
      this.fieldsAndValidators.forEach(([ctrl]) => ctrl.updateValueAndValidity());
    }
  }
}

type ActivityFormGroup = FormGroup<{
  type: FormControl<string | null>;
  title: FormControl<string | null>;
  animator: FormControl<Animator | null>;
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
  useSamePictures: FormControl<boolean | null>;
}>;

type EditionMode =
  | {
      mode: 'create';
    }
  | {
      mode: 'edit' | 'duplicate';
      editedActivity: Activity;
    };

@Component({
  selector: 'dn-activity-edition',
  templateUrl: './activity-edition.component.html',
  styleUrls: ['./activity-edition.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgbTypeahead,
    NgbCollapse,
    ValidationErrorsComponent,
    ValidationErrorDirective,
    FormControlValidationDirective,
    PageTitleDirective,
    IconDirective,
    MultiChoiceComponent,
    SpinningIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityEditionComponent {
  private activityService = inject(ActivityService);
  private animatorService = inject(AnimatorService);
  private router = inject(Router);
  private currentUserService = inject(CurrentUserService);
  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);

  mode = signal<EditionMode | undefined>(undefined);

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

  readonly animatorTypeahead: OperatorFunction<string, ReadonlyArray<Animator>> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => (term.length < 1 ? of([]) : this.animatorService.suggest(term)))
    );
  readonly animatorFormatter = (a: Animator) => a.name;

  readonly knownLabels = KNOWN_LABELS;
  readonly knownOrganizations = KNOWN_ORGANIZATIONS;
  readonly knownEquipments = KNOWN_EQUIPMENTS;
  readonly icons = icons;

  readonly saving = new Spinner();
  readonly savingAsDraft = new Spinner();
  readonly savingWhateverTheMode = computed(
    () => this.saving.isSpinning() || this.savingAsDraft.isSpinning()
  );

  readonly draftManager = new DraftManager();

  constructor() {
    const route = inject(ActivatedRoute);
    const activityService = this.activityService;
    const animatorService = this.animatorService;

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
      animator: new FormControl<Animator | null>(null, Validators.required),
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
      comment: new FormControl(''),
      useSamePictures: new FormControl<boolean | null>(false)
    });

    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        switchMap(id => (id ? activityService.get(id).pipe(first()) : of(null))),
        switchMap(activity =>
          activity
            ? animatorService
                .getByNameOrCreate(activity.animator)
                .pipe(first())
                .pipe(map(animator => ({ activity, animator })))
            : of({ activity: null, animator: null })
        )
      )
      .subscribe(({ activity, animator }) => {
        if (activity) {
          this.mode.set({
            editedActivity: activity,
            mode: route.snapshot.data['duplicate'] ? ('duplicate' as const) : ('edit' as const)
          });
        } else {
          this.mode.set({
            mode: 'create'
          });
        }
        this.draftManager.initialize(this.form, this.maySaveAsDraft);
        this.draftManager.switchTo('final');

        if (activity) {
          const formValue = {
            type: activity.type,
            title: activity.title,
            description: activity.description,
            animator: animator,
            timing: {
              startDate: this.mode()!.mode === 'edit' ? activity.startDate : null,
              startTime: activity.startTime,
              endDate: this.mode()!.mode === 'edit' ? activity.endDate : null,
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
            comment: activity.comment,
            useSamePictures: this.shouldDisplayUseSamePictures
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

  get maySaveAsDraft(): boolean {
    const editionMode = this.mode();
    return (
      !!editionMode &&
      (editionMode.mode === 'create' ||
        editionMode.mode === 'duplicate' ||
        (editionMode.mode === 'edit' && editionMode.editedActivity.draft))
    );
  }

  get shouldDisplayUseSamePictures(): boolean {
    const editionMode = this.mode();
    return (
      !!editionMode &&
      editionMode.mode === 'duplicate' &&
      (editionMode.editedActivity.pictures ?? []).length > 0
    );
  }

  save() {
    const editionMode = this.mode();
    if (this.form.invalid || !editionMode) {
      return;
    }

    const formValue = this.form.value;
    const command: ActivityCommand = {
      type: formValue.type!,
      title: formValue.title!,
      description: formValue.description!,
      animator: formValue.animator!.name,
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
        editionMode.mode === 'edit'
          ? editionMode.editedActivity.author
          : this.currentUserService.getCurrentAuditUser(),
      lastModifier:
        editionMode.mode === 'edit' ? this.currentUserService.getCurrentAuditUser() : null,
      draft: this.draftManager.mode() === 'draft'
    };

    if (editionMode.mode === 'duplicate' && formValue.useSamePictures) {
      command.pictures = editionMode.editedActivity.pictures;
    }

    const spinner = this.draftManager.mode() === 'draft' ? this.savingAsDraft : this.saving;
    const result$ =
      editionMode.mode === 'edit'
        ? this.activityService
            .update(editionMode.editedActivity.id, command)
            .pipe(map(() => editionMode.editedActivity))
        : this.activityService.create(command);
    result$.pipe(spinner.spinUntilFinalization()).subscribe(activity => {
      if (
        editionMode.mode === 'create' ||
        (editionMode.mode === 'duplicate' && !formValue.useSamePictures)
      ) {
        this.router.navigate(['/activities', activity.id, 'pictures']);
      } else {
        this.router.navigate(['/activities', activity.id]);
      }
    });
  }

  clearAnimatorIfNotSelected(animatorInput: HTMLInputElement) {
    if (!this.form.controls.animator.value) {
      animatorInput.value = '';
    }
  }

  addAnimator() {
    const modalRef = this.modalService.open(AnimatorEditionModalComponent, {
      fullscreen: 'sm'
    });
    (modalRef.componentInstance as AnimatorEditionModalComponent).prepareForCreation();
    modalRef.closed.subscribe((createdAnimator: Animator) =>
      this.form.controls.animator.setValue(createdAnimator)
    );
  }

  editAnimator() {
    this.animatorService
      .get(this.form.controls.animator.value!.id)
      .pipe(
        first(),
        switchMap(animator => {
          const modalRef = this.modalService.open(AnimatorEditionModalComponent, {
            fullscreen: 'sm'
          });
          (modalRef.componentInstance as AnimatorEditionModalComponent).prepareForUpdate(animator!);
          return modalRef.closed;
        })
      )
      .subscribe(() => this.toastService.success(`L'animateur a été modifié`));
  }
}
