import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministeredUser, AdministeredUserCommand, UserService } from '../user.service';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { Spinner } from '../../shared/spinner';
import { ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { IconDirective } from '../../icon/icon.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreatedModalComponent } from '../user-created-modal/user-created-modal.component';
import { AsyncPipe } from '@angular/common';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ValidationErrorsComponent,
    FormControlValidationDirective,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective,
    SpinningIconComponent
  ]
})
export class UserEditionComponent {
  form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    admin: new FormControl(false),
    export: new FormControl(false),
    disabled: new FormControl(false)
  });
  mode: 'create' | 'edit' | null = null;
  editedUser: AdministeredUser | null = null;
  icons = icons;

  saving = new Spinner();

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('uid')),
        switchMap(uid => (uid ? userService.get(uid) : of(null))),
        first()
      )
      .subscribe(user => {
        this.mode = user ? 'edit' : 'create';
        this.editedUser = user;

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
    if (this.form.invalid) {
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
      this.mode === 'create'
        ? this.userService.create(command)
        : this.userService.update(this.editedUser!.uid, command);
    result$.pipe(this.saving.spinUntilFinalization()).subscribe(() => {
      this.router.navigate(['/users']);
      if (this.mode === 'create') {
        const modalRef = this.modalService.open(UserCreatedModalComponent);
        (modalRef.componentInstance as UserCreatedModalComponent).userName = formValue.displayName!;
      }
    });
  }
}
