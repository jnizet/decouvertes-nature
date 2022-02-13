import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValdemortConfig } from 'ngx-valdemort';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dn-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationDefaultsComponent {
  constructor(config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
    config.shouldThrowOnMissingControl = () => !environment.production;
  }
}
