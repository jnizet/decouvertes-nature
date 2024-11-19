import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Consent } from '../animator.service';

@Component({
  selector: 'dn-consent',
  imports: [],
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentComponent {
  consent = input.required<Consent | undefined>();
}
