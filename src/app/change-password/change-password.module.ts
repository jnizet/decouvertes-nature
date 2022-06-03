import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ValidationModule } from '../validation/validation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CHANGE_PASSWORD_ROUTES } from './change-password.routes';
import { PageTitleDirective } from '../page-title/page-title.directive';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CHANGE_PASSWORD_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleDirective
  ]
})
export class ChangePasswordModule {}
