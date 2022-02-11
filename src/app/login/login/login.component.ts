import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  loginError = false;

  constructor(private auth: Auth, private router: Router) {
    const config: Record<keyof FormValue, any> = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    };
    this.form = new FormGroup(config);
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
