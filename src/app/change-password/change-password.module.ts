import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ValidationModule } from '../validation/validation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CHANGE_PASSWORD_ROUTES } from './change-password.routes';
import { PageTitleModule } from '../page-title/page-title.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CHANGE_PASSWORD_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleModule
  ]
})
export class ChangePasswordModule {}
