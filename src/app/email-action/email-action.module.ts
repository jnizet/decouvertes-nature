import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailActionComponent } from './email-action/email-action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { RouterModule } from '@angular/router';
import { EMAIL_ACTION_ROUTES } from './email-action.routes';
import { PageTitleDirective } from '../page-title/page-title.directive';

@NgModule({
  declarations: [EmailActionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EMAIL_ACTION_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleDirective
  ]
})
export class EmailActionModule {}
