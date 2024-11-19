import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dn-confirm-modal-content',
  templateUrl: './confirm-modal-content.component.html',
  styleUrls: ['./confirm-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ConfirmModalContentComponent {
  activeModal = inject(NgbActiveModal);

  message = signal('');
  title = signal('');
}
