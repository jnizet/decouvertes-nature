import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { exclamationTriangleFill } from '../bootstrap-icons/bootstrap-icons';
import { ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { IconDirective } from '../icon/icon.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dn-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ValidationErrorsComponent,
    FormControlValidationDirective,
    PageTitleDirective,
    IconDirective
  ]
})
export class ResetPasswordComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  error = false;
  emailSent = false;
  icons = {
    warning: exclamationTriangleFill
  };

  constructor(
    private route: ActivatedRoute,
    private auth: Auth
  ) {
    this.form.setValue({ email: route.snapshot.queryParamMap.get('email') || '' });
  }

  sendEmail() {
    if (this.form.invalid) {
      return;
    }

    from(sendPasswordResetEmail(this.auth, this.form.value.email!)).subscribe({
      next: () => (this.emailSent = true),
      error: () => (this.error = true)
    });
  }
}
