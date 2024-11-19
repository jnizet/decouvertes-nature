import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DefaultValidationErrorsDirective,
  ValdemortConfig,
  ValidationErrorDirective
} from 'ngx-valdemort';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'dn-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, DefaultValidationErrorsDirective, ValidationErrorDirective]
})
export class ValidationDefaultsComponent {
  constructor() {
    const config = inject(ValdemortConfig);

    config.errorsClasses = 'invalid-feedback';
    config.shouldThrowOnMissingControl = () => !environment.production;
  }
}
