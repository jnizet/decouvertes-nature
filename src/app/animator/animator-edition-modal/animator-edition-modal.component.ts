import { Component, inject } from '@angular/core';
import {
  AsyncValidatorFn,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import { ValidationErrorDirective, ValidationErrorsComponent } from 'ngx-valdemort';
import { Spinner } from '../../shared/spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, map } from 'rxjs';
import { Animator, AnimatorCommand, AnimatorService, Consent } from '../animator.service';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-animator-edition-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinningIconComponent,
    ValidationErrorsComponent,
    ValidationErrorDirective
  ],
  templateUrl: './animator-edition-modal.component.html',
  styleUrls: ['./animator-edition-modal.component.scss']
})
export class AnimatorEditionModalComponent {
  mode!: 'create' | 'update';
  editedAnimator?: Animator;

  private uniqueNameAsyncValidator: AsyncValidatorFn = control => {
    return this.animatorService.getByName(control.value).pipe(
      first(),
      map(animator => (animator ? { nameUnique: true } : null))
    );
  };

  form = inject(NonNullableFormBuilder).group({
    name: ['', Validators.required, this.uniqueNameAsyncValidator],
    emailConsent: ['UNKNOWN' as Consent],
    phoneConsent: ['UNKNOWN' as Consent]
  });

  saving = new Spinner();

  icons = icons;

  constructor(
    private activeModal: NgbActiveModal,
    private animatorService: AnimatorService
  ) {}

  prepareForCreation() {
    this.mode = 'create';
  }

  prepareForUpdate(animator: Animator) {
    this.mode = 'update';
    this.editedAnimator = animator;
    this.form.setValue({
      name: animator.name,
      emailConsent: animator.emailConsent ?? 'UNKNOWN',
      phoneConsent: animator.phoneConsent ?? 'UNKNOWN'
    });
    this.form.controls.name.disable();
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const formValue = this.form.getRawValue();
    if (this.mode === 'create') {
      const command: AnimatorCommand = formValue;
      this.animatorService
        .create(command)
        .pipe(this.saving.spinUntilFinalization())
        .subscribe(animator => {
          this.activeModal.close(animator);
        });
    } else if (this.mode === 'update') {
      this.animatorService
        .update(this.editedAnimator!.id, {
          emailConsent: formValue.emailConsent,
          phoneConsent: formValue.phoneConsent
        })
        .subscribe(() => this.activeModal.close());
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
