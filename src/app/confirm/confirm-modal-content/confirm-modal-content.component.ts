import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dn-confirm-modal-content',
  templateUrl: './confirm-modal-content.component.html',
  styleUrls: ['./confirm-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmModalContentComponent {
  @Input() message?: string;
  @Input() title?: string;

  constructor(public activeModal: NgbActiveModal) {}
}
