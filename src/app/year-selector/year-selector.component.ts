import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearService } from '../year.service';
import { arrowLeftCircle, arrowRightCircle } from '../bootstrap-icons/bootstrap-icons';
import { IconDirective } from '../icon/icon.directive';

@Component({
  selector: 'dn-year-selector',
  standalone: true,
  imports: [CommonModule, IconDirective],
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
