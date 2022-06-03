/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostBinding, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValdemortConfig } from 'ngx-valdemort';

@Directive({
  selector: '[formControlName]',
  standalone: true
})
export class FormControlValidationDirective {
  constructor(@Optional() private ngControl: NgControl, private config: ValdemortConfig) {}

  @HostBinding('class.is-invalid') get isInvalid() {
    return (
      this.ngControl &&
      this.ngControl.control &&
      this.ngControl.invalid &&
      this.config.shouldDisplayErrors(this.ngControl.control, (this.ngControl as any).formDirective)
    );
  }
}
