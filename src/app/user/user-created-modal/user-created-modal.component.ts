import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-user-created-modal',
  templateUrl: './user-created-modal.component.html',
  styleUrls: ['./user-created-modal.component.scss'],
  imports: [IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreatedModalComponent {
  readonly activeModal = inject(NgbActiveModal);
  readonly icons = icons;
  readonly userName = signal<string | undefined>(undefined);
}
