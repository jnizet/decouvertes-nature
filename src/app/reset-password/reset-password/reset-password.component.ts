import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { exclamationTriangleFill } from '../../bootstrap-icons/bootstrap-icons';

interface FormValue {
  email: string;
}

@Component({
  selector: 'dn-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: UntypedFormGroup;
  error = false;
  emailSent = false;
  icons = {
    warning: exclamationTriangleFill
  };

  constructor(private route: ActivatedRoute, private auth: Auth) {
    const config: Record<keyof FormValue, any> = {
      email: new UntypedFormControl(route.snapshot.queryParamMap.get('email') || '', [
        Validators.required,
        Validators.email
      ])
    };
    this.form = new UntypedFormGroup(config);
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
