import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { RESET_PASSWORD_ROUTES } from './reset-password.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { IconDirective } from '../icon/icon.directive';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ValdemortModule } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RESET_PASSWORD_ROUTES),
    ReactiveFormsModule,
    ValdemortModule,
    FormControlValidationDirective,
    PageTitleDirective,
    IconDirective
  ]
})
export class ResetPasswordModule {}
