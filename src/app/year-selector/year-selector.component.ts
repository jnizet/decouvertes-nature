import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { YearService } from '../year.service';
import { IconDirective } from '../icon/icon.directive';
import { DecimalPipe } from '@angular/common';
import * as icons from '../icon/icons';

@Component({
  selector: 'dn-year-selector',
  imports: [DecimalPipe, IconDirective],
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearSelectorComponent {
  icons = icons;

  private yearService = inject(YearService);
  year = this.yearService.year;

  changeYear(year: number) {
    this.yearService.set(year);
  }
}
