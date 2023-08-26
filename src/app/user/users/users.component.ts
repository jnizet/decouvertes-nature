import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdministeredUser, UserService } from '../user.service';
import { from, Observable } from 'rxjs';
import {
  clipboard2Fill,
  clipboardCheck,
  envelope,
  pencilSquare,
  plusCircle,
  shieldFill,
  shieldLock,
  xOctagonFill
} from '../../bootstrap-icons/bootstrap-icons';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { IconDirective } from '../../icon/icon.directive';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordLinkModalComponent } from '../reset-password-link-modal/reset-password-link-modal.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'dn-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective
  ]
})
export class UsersComponent {
  users$: Observable<Array<AdministeredUser>>;
  icons = {
    admin: shieldFill,
    export: clipboard2Fill,
    disabled: xOctagonFill,
    edit: pencilSquare,
    addUser: plusCircle,
    resetPasswordEmail: envelope,
    resetPasswordLink: shieldLock
  };

  constructor(
    userService: UserService,
    private ngbModal: NgbModal,
    private toastService: ToastService
  ) {
    this.users$ = userService.listUsers();
  }

  copyEmail(user: AdministeredUser) {
    const resetPasswordPath =
      window.location.origin + '/reset-password?email=' + encodeURIComponent(user.email);
    const homePath = window.location.origin;
    const email = `Bonjour ${user.displayName}.

Pour pouvoir créer de nouvelles activités dans l'application "Découvertes Nature",
il te faudra choisir un mot de passe en te rendant à l'adresse suivante\u00a0:
${resetPasswordPath}.

Une fois le mot de passe choisi, tu pourras accéder à l'application à l'adresse
suivante\u00a0:
${homePath}.`;
    from(navigator.clipboard.writeText(email)).subscribe(() =>
      this.toastService.display({
        icon: clipboardCheck,
        message: 'Email copié dans le presse-papier\u00a0!'
      })
    );
  }

  generateResetPasswordLink(user: AdministeredUser) {
    const modal = this.ngbModal.open(ResetPasswordLinkModalComponent);
    const modalComponent: ResetPasswordLinkModalComponent = modal.componentInstance;
    modalComponent.user = user;
  }
}
