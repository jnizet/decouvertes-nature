import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { ActivityReport, ActivityReportCommand, ActivityService } from '../activity.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ValidationErrorsComponent } from 'ngx-valdemort';
import { FormControlValidationDirective } from '../../validation/form-control-validation.directive';
import { IconDirective } from '../../icon/icon.directive';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-activity-report-edition',
  templateUrl: './activity-report-edition.component.html',
  styleUrls: ['./activity-report-edition.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    FormControlValidationDirective,
    IconDirective
  ]
})
export class ActivityReportEditionComponent implements OnInit {
  report = input<ActivityReport>();

  @Output()
  readonly saved = new EventEmitter<ActivityReportCommand>();

  @Output()
  readonly cancelled = new EventEmitter<void>();

  readonly icons = icons;

  readonly form: FormGroup<{
    cancelled: FormControl<boolean | null>;
    numberOfParticipants: FormControl<number | null>;
    comment: FormControl<string | null>;
  }>;

  constructor(private activityService: ActivityService) {
    const numberOfParticipantsCtrl = new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0)
    ]);
    const cancelledCtrl = new FormControl(false);
    this.form = new FormGroup({
      cancelled: cancelledCtrl,
      numberOfParticipants: numberOfParticipantsCtrl,
      comment: new FormControl('')
    });

    cancelledCtrl.valueChanges.subscribe(cancelled => {
      if (cancelled) {
        numberOfParticipantsCtrl.disable();
      } else {
        numberOfParticipantsCtrl.enable();
      }
    });
  }

  ngOnInit(): void {
    const report = this.report();
    if (report) {
      this.form.setValue(report);
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const command: ActivityReportCommand = {
      cancelled: formValue.cancelled!,
      numberOfParticipants: formValue.numberOfParticipants ?? 0,
      comment: formValue.comment!
    };

    this.saved.emit(command);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
