import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { FrenchDateParserFormatterService } from './french-date-parser-formatter.service';
import { DateStringAdapterService } from './date-string-adapter.service';
import { DatepickerContainerComponent } from './datepicker-container.component';

@Injectable()
export class CustomNgbDatepickerConfig extends NgbDatepickerConfig {
  constructor() {
    super();
    this.minDate = { year: 2022, month: 1, day: 1 };
    this.maxDate = { year: 2099, month: 12, day: 31 };
  }
}

@NgModule({
  declarations: [DatepickerContainerComponent],
  imports: [CommonModule],
  exports: [NgbDatepickerModule, DatepickerContainerComponent],
  providers: [
    { provide: NgbDateParserFormatter, useClass: FrenchDateParserFormatterService },
    { provide: NgbDateAdapter, useClass: DateStringAdapterService },
    { provide: NgbDatepickerConfig, useClass: CustomNgbDatepickerConfig }
  ]
})
export class DatepickerModule {}
