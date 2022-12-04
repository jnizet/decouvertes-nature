import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YearService } from '../year.service';
import { arrowLeftCircle, arrowRightCircle } from '../bootstrap-icons/bootstrap-icons';
import { IconDirective } from '../icon/icon.directive';
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'dn-year-selector',
  standalone: true,
  imports: [NgIf, AsyncPipe, DecimalPipe, IconDirective],
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearSelectorComponent {
  icons = {
    left: arrowLeftCircle,
    right: arrowRightCircle
  };

  year$ = this.yearService.year$;

  constructor(private yearService: YearService) {}

  changeYear(year: number) {
    this.yearService.set(year);
  }
}
