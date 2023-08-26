import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastService } from './toast.service';
import { IconDirective } from '../icon/icon.directive';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'dn-toast',
  standalone: true,
  imports: [IconDirective, AsyncPipe, NgIf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  toast$: Observable<Toast | null>;

  constructor(toastService: ToastService) {
    this.toast$ = toastService.toast$;
  }
}
