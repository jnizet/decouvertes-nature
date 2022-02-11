import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValdemortModule } from 'ngx-valdemort';
import { ValidationDefaultsComponent } from './validation-defaults/validation-defaults.component';
import { FormControlValidationDirective } from './validation-defaults/form-control-validation.directive';

@NgModule({
  declarations: [FormControlValidationDirective, ValidationDefaultsComponent],
  imports: [CommonModule, ValdemortModule],
  exports: [ValdemortModule, FormControlValidationDirective, ValidationDefaultsComponent]
})
export class ValidationModule {}
