import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconDirective } from '../../icon/icon.directive';
import { Spinner } from '../spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'dn-spinning-icon',
  standalone: true,
  imports: [IconDirective, AsyncPipe],
  templateUrl: './spinning-icon.component.html',
  styleUrls: ['./spinning-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinningIconComponent {
  icon = input.required<string>();
  spinner = input.required<Spinner>();
  message = input.required<string>();
}
