import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User
} from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { Router } from '@angular/router';

interface FormValue {
  currentPassword: string;
  newPassword: string;
}

@Component({
  selector: 'dn-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form: FormGroup;
  error = false;

  constructor(private auth: Auth, private router: Router) {
    const config: Record<keyof FormValue, any> = {
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    };
    this.form = new FormGroup(config);
  }

  changePassword() {
    if (this.form.invalid) {
      return;
    }

    const formValue: FormValue = this.form.value;
    const user: User = this.auth.currentUser!;
    from(
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email!, formValue.currentPassword)
      )
    )
      .pipe(switchMap(() => from(updatePassword(user, formValue.newPassword))))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.error = true)
      });
  }
}
