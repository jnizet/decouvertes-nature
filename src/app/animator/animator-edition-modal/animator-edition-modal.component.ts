import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';

type ViewModel =
  | {
      mode: 'create';
    }
  | {
      mode: 'update';
      editedAnimator: Animator;
    };

@Component({
  selector: 'dn-animator-edition-modal',
  imports: [
    ReactiveFormsModule,
    SpinningIconComponent,
    ValidationErrorsComponent,
    ValidationErrorDirective,
    FormControlValidationDirective
  ],
  templateUrl: './animator-edition-modal.component.html',
  styleUrls: ['./animator-edition-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatorEditionModalComponent {
  private activeModal = inject(NgbActiveModal);
  private animatorService = inject(AnimatorService);

  vm = signal<ViewModel | undefined>(undefined);

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

  prepareForCreation() {
    this.vm.set({
      mode: 'create'
    });
  }

  prepareForUpdate(animator: Animator) {
    this.vm.set({
      mode: 'update',
      editedAnimator: animator
    });
    this.form.setValue({
      name: animator.name,
      emailConsent: animator.emailConsent ?? 'UNKNOWN',
      phoneConsent: animator.phoneConsent ?? 'UNKNOWN'
    });
    this.form.controls.name.disable();
  }

  save() {
    const vm = this.vm();
    if (!this.form.valid || !vm) {
      return;
    }

    const formValue = this.form.getRawValue();
    if (vm.mode === 'create') {
      const command: AnimatorCommand = formValue;
      this.animatorService
        .create(command)
        .pipe(this.saving.spinUntilFinalization())
        .subscribe(animator => {
          this.activeModal.close(animator);
        });
    } else if (vm.mode === 'update') {
      this.animatorService
        .update(vm.editedAnimator.id, {
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
