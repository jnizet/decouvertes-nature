import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalContentComponent } from './confirm-modal-content/confirm-modal-content.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmModalContentComponent],
  imports: [CommonModule, NgbModalModule]
})
export class ConfirmModule {}
