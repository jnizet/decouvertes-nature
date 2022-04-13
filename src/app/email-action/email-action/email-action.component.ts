import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Auth,
  confirmPasswordReset,
  signInWithEmailAndPassword,
  verifyPasswordResetCode
} from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, switchMap } from 'rxjs';

@Component({
  selector: 'dn-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.scss']
})
export class EmailActionComponent {
  private actionCode: string;
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  email: string | null = null;
  verificationError = false;
  resetError = false;

  constructor(route: ActivatedRoute, private auth: Auth, private router: Router) {
    const params = route.snapshot.queryParamMap;
    const mode = params.get('mode');
    if (mode !== 'resetPassword') {
      throw new Error(`unhandled mode: ${mode}`);
    }
    this.actionCode = params.get('oobCode')!;

    from(verifyPasswordResetCode(auth, this.actionCode)).subscribe({
      next: email => (this.email = email),
      error: () => (this.verificationError = true)
    });
  }

  resetPassword() {
    if (this.form.invalid) {
      return;
    }

    // Save the new password.
    const password = this.form.value.password!;
    from(confirmPasswordReset(this.auth, this.actionCode, password))
      .pipe(switchMap(() => from(signInWithEmailAndPassword(this.auth, this.email!, password))))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.resetError = true)
      });
  }
}
