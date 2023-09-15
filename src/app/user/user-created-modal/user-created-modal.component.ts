import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-user-created-modal',
  templateUrl: './user-created-modal.component.html',
  styleUrls: ['./user-created-modal.component.scss'],
  standalone: true,
  imports: [IconDirective]
})
export class UserCreatedModalComponent {
  readonly icons = icons;

  userName?: string;

  constructor(public activeModal: NgbActiveModal) {}
}
