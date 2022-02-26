import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { RESET_PASSWORD_ROUTES } from './reset-password.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { IconModule } from '../icon/icon.module';
import { PageTitleModule } from '../page-title/page-title.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RESET_PASSWORD_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    IconModule,
    PageTitleModule
  ]
})
export class ResetPasswordModule {}
