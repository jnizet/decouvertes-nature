import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dn-confirm-modal-content',
  templateUrl: './confirm-modal-content.component.html',
  styleUrls: ['./confirm-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: []
})
export class ConfirmModalContentComponent {
  message = signal('');
  title = signal('');

  constructor(public activeModal: NgbActiveModal) {}
}
