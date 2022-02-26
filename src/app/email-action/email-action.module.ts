import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailActionComponent } from './email-action/email-action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { RouterModule } from '@angular/router';
import { EMAIL_ACTION_ROUTES } from './email-action.routes';
import { PageTitleModule } from '../page-title/page-title.module';

@NgModule({
  declarations: [EmailActionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EMAIL_ACTION_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleModule
  ]
})
export class EmailActionModule {}
