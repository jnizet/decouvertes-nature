import { Component } from '@angular/core';
import { envelope } from '../../bootstrap-icons/bootstrap-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';

@Component({
  selector: 'dn-user-created-modal',
  templateUrl: './user-created-modal.component.html',
  styleUrls: ['./user-created-modal.component.scss'],
  standalone: true,
  imports: [IconDirective]
})
export class UserCreatedModalComponent {
  readonly icons = {
    resetPasswordEmail: envelope
  };

  userName?: string;

  constructor(public activeModal: NgbActiveModal) {}
}
