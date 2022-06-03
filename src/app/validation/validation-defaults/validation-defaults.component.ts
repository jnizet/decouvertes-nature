import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValdemortConfig, ValdemortModule } from 'ngx-valdemort';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dn-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ValdemortModule]
})
export class ValidationDefaultsComponent {
  constructor(config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
    config.shouldThrowOnMissingControl = () => !environment.production;
  }
}
