import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministeredUser, AdministeredUserCommand, UserService } from '../user.service';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { Spinner } from '../../shared/spinner';
import { ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreatedModalComponent } from '../user-created-modal/user-created-modal.component';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';

type ViewModel =
  | {
      mode: 'create';
    }
  | {
      mode: 'update';
      editedUser: AdministeredUser;
    };

@Component({
  selector: 'dn-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.scss'],
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    FormControlValidationDirective,
    PageTitleDirective,
    LoadingSpinnerComponent,
    SpinningIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditionComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private modalService = inject(NgbModal);

  form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    admin: new FormControl(false),
    export: new FormControl(false),
    disabled: new FormControl(false)
  });
  vm = signal<ViewModel | undefined>(undefined);
  icons = icons;

  saving = new Spinner();

  constructor() {
    const route = inject(ActivatedRoute);

    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('uid')),
        switchMap(uid => (uid ? this.userService.get(uid) : of(null))),
        first()
      )
      .subscribe(user => {
        if (user) {
          this.vm.set({ mode: 'update', editedUser: user });
        } else {
          this.vm.set({ mode: 'create' });
        }

        if (user) {
          const formValue = {
            displayName: user.displayName,
            email: user.email,
            admin: user.admin,
            export: user.export,
            disabled: user.disabled
          };

          this.form.setValue(formValue);
        }
      });
  }

  save() {
    const vm = this.vm();
    if (this.form.invalid || !vm) {
      return;
    }

    const formValue = this.form.value;
    const command: AdministeredUserCommand = {
      email: formValue.email!,
      displayName: formValue.displayName!,
      disabled: formValue.disabled!,
      admin: formValue.admin!,
      export: formValue.export!
    };
    const result$: Observable<unknown> =
      vm.mode === 'create'
        ? this.userService.create(command)
        : this.userService.update(vm.editedUser.uid, command);
    result$.pipe(this.saving.spinUntilFinalization()).subscribe(() => {
      this.router.navigate(['/users']);
      if (vm.mode === 'create') {
        const modalRef = this.modalService.open(UserCreatedModalComponent);
        (modalRef.componentInstance as UserCreatedModalComponent).userName.set(
          formValue.displayName!
        );
      }
    });
  }
}
