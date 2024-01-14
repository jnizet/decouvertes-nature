import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YearService } from '../year.service';
import { IconDirective } from '../icon/icon.directive';
import { DecimalPipe } from '@angular/common';
import * as icons from '../icon/icons';

@Component({
  selector: 'dn-year-selector',
  standalone: true,
  imports: [DecimalPipe, IconDirective],
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearSelectorComponent {
  icons = icons;

  year = this.yearService.year;

  constructor(private yearService: YearService) {}

  changeYear(year: number) {
    this.yearService.set(year);
  }
}
