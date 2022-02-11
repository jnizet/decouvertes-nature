/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, ContentChild } from '@angular/core';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component used to simplify the markup of a datepicker in a popup. It wraps the input which has the
 * ngbDatepicker directive, and prepends the toggle button to it.
 *
 * Example usage:
 *
 * <dn-datepicker-container>
 *   <input class="form-control" formControlName="date" ngbDatepicker />
 * </dn-datepicker-container>
 */
@Component({
  selector: 'dn-datepicker-container',
  templateUrl: './datepicker-container.component.html'
})
export class DatepickerContainerComponent {
  @ContentChild(NgbInputDatepicker)
  datePicker!: NgbInputDatepicker;

  toggle() {
    this.datePicker.toggle();
  }
}
