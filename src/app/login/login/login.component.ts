import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

interface FormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'dn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: UntypedFormGroup;
  loginError = false;

  constructor(private auth: Auth, private router: Router) {
    const config: Record<keyof FormValue, any> = {
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required)
    };
    this.form = new UntypedFormGroup(config);
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const credentials: FormValue = this.form.value;
    from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['/']);
      },
      error: () => (this.loginError = true)
    });
  }
}
