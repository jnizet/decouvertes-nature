import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dn-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LoadingSpinnerComponent {}
