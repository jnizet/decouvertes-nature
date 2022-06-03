import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ValdemortModule } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LOGIN_ROUTES),
    ReactiveFormsModule,
    ValdemortModule,
    FormControlValidationDirective,
    PageTitleDirective
  ]
})
export class LoginModule {}
