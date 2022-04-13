import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministeredUser, UserService } from '../user.service';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { fileArrowUp } from '../../bootstrap-icons/bootstrap-icons';
import { Spinner } from '../../shared/spinner';

interface FormValue {
  displayName: string;
  email: string;
  admin: boolean;
  export: boolean;
  disabled: boolean;
}

@Component({
  selector: 'dn-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.scss']
})
export class UserEditionComponent {
  form: UntypedFormGroup;
  mode: 'create' | 'edit' | null = null;
  editedUser: AdministeredUser | null = null;
  icons = {
    save: fileArrowUp
  };
  saving = new Spinner();

  constructor(route: ActivatedRoute, private router: Router, private userService: UserService) {
    const config: Record<keyof FormValue, any> = {
      displayName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      admin: new UntypedFormControl(false),
      export: new UntypedFormControl(false),
      disabled: new UntypedFormControl(false)
    };
    this.form = new UntypedFormGroup(config);

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
          const formValue: FormValue = {
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

    const formValue: FormValue = this.form.value;
    const result$: Observable<unknown> =
      this.mode === 'create'
        ? this.userService.create(formValue)
        : this.userService.update(this.editedUser!.uid, formValue);
    result$.pipe(this.saving.spinUntilFinalization()).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
