import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityReport, ActivityReportCommand, ActivityService } from '../activity.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { fileArrowUp, xSquare } from '../../bootstrap-icons/bootstrap-icons';

interface FormValue {
  cancelled: boolean;
  numberOfParticipants?: number;
  comment: string;
}

@Component({
  selector: 'dn-activity-report-edition',
  templateUrl: './activity-report-edition.component.html',
  styleUrls: ['./activity-report-edition.component.scss']
})
export class ActivityReportEditionComponent implements OnInit {
  @Input()
  report?: ActivityReport;

  @Output()
  readonly saved = new EventEmitter<ActivityReportCommand>();

  @Output()
  readonly cancelled = new EventEmitter<void>();

  readonly icons = {
    save: fileArrowUp,
    cancel: xSquare
  };

  readonly form: UntypedFormGroup;

  constructor(private activityService: ActivityService) {
    const numberOfParticipantsCtrl = new UntypedFormControl(null, [
      Validators.required,
      Validators.min(0)
    ]);
    const cancelledCtrl = new UntypedFormControl(false);
    const config: Record<keyof FormValue, any> = {
      cancelled: cancelledCtrl,
      numberOfParticipants: numberOfParticipantsCtrl,
      comment: new UntypedFormControl('')
    };
    this.form = new UntypedFormGroup(config);

    cancelledCtrl.valueChanges.subscribe(cancelled => {
      if (cancelled) {
        numberOfParticipantsCtrl.disable();
      } else {
        numberOfParticipantsCtrl.enable();
      }
    });
  }

  ngOnInit(): void {
    if (this.report) {
      const formValue: FormValue = this.report;
      this.form.setValue(formValue);
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue: FormValue = this.form.value;
    const command: ActivityReportCommand = {
      cancelled: formValue.cancelled,
      numberOfParticipants: formValue.numberOfParticipants ?? 0,
      comment: formValue.comment
    };

    this.saved.emit(command);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
