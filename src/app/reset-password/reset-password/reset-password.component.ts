import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { from } from 'rxjs';

interface FormValue {
  email: string;
}

@Component({
  selector: 'dn-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup;
  error = false;
  emailSent = false;

  constructor(private auth: Auth) {
    const config: Record<keyof FormValue, any> = {
      email: new FormControl('', [Validators.required, Validators.email])
    };
    this.form = new FormGroup(config);
  }

  sendEmail() {
    if (this.form.invalid) {
      return;
    }

    const formValue: FormValue = this.form.value;
    from(sendPasswordResetEmail(this.auth, formValue.email)).subscribe({
      next: () => (this.emailSent = true),
      error: () => (this.error = true)
    });
  }
}
