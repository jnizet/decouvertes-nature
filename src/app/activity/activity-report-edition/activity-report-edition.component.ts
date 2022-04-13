import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityReport, ActivityReportCommand, ActivityService } from '../activity.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fileArrowUp, xSquare } from '../../bootstrap-icons/bootstrap-icons';

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
    if (this.report) {
      this.form.setValue(this.report);
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
