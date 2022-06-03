import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { PageTitleDirective } from '../page-title/page-title.directive';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LOGIN_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleDirective
  ]
})
export class LoginModule {}
