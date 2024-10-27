import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';
import { PageTitleDirective } from '../page-title/page-title.directive';

@Component({
  selector: 'dn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ValidationErrorsComponent,
    FormControlValidationDirective,
    PageTitleDirective
  ]
})
export class LoginComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  loginError = false;

  login() {
    if (this.form.invalid) {
      return;
    }

    const credentials = this.form.value;
    from(
      signInWithEmailAndPassword(this.auth, credentials.email!, credentials.password!)
    ).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['/']);
      },
      error: () => (this.loginError = true)
    });
  }
}
