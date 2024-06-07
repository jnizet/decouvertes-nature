/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValdemortConfig } from 'ngx-valdemort';

@Directive({
  selector: '[formControlName]',
  standalone: true,
  host: {
    '[class.is-invalid]': 'isInvalid'
  }
})
export class FormControlValidationDirective {
  private ngControl = inject(NgControl, { optional: true });
  private config = inject(ValdemortConfig);

  get isInvalid() {
    return (
      this.ngControl &&
      this.ngControl.control &&
      this.ngControl.invalid &&
      this.config.shouldDisplayErrors(this.ngControl.control, (this.ngControl as any).formDirective)
    );
  }
}
