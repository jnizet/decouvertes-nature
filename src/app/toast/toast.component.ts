import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { IconDirective } from '../icon/icon.directive';

@Component({
  selector: 'dn-toast',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  toast = inject(ToastService).toast;
}
