import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Consent } from '../animator.service';

@Component({
  selector: 'dn-consent',
  standalone: true,
  imports: [],
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentComponent {
  @Input({ required: true }) consent: Consent | undefined;
}
