import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailActionComponent } from './email-action/email-action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EMAIL_ACTION_ROUTES } from './email-action.routes';
import { PageTitleDirective } from '../page-title/page-title.directive';
import { ValdemortModule } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../validation/form-control-validation.directive';

@NgModule({
  declarations: [EmailActionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EMAIL_ACTION_ROUTES),
    ReactiveFormsModule,
    ValdemortModule,
    FormControlValidationDirective,
    PageTitleDirective
  ]
})
export class EmailActionModule {}
