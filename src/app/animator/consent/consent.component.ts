import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Consent } from '../animator.service';

@Component({
  selector: 'dn-consent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentComponent {
  @Input({ required: true }) consent: Consent | undefined;
}
