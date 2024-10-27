import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { from } from 'rxjs';
import { AdministeredUser, ResetPasswordLinkInfo, UserService } from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { Spinner } from '../../shared/spinner';
import { ToastService } from '../../toast/toast.service';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';
import { copied } from '../../icon/icons';

@Component({
  selector: 'dn-reset-password-link-modal',
  standalone: true,
  imports: [IconDirective, SpinningIconComponent],
  templateUrl: './reset-password-link-modal.component.html',
  styleUrls: ['./reset-password-link-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordLinkModalComponent {
  activeModal = inject(NgbActiveModal);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  readonly resetPasswordLinkInfo = signal<ResetPasswordLinkInfo | null>(null);
  readonly icons = icons;

  readonly generating = new Spinner();
  readonly user = signal<AdministeredUser>(undefined!);

  generateResetPasswordLink() {
    this.userService
      .generateResetPasswordLink(this.user()!.uid)
      .pipe(this.generating.spinUntilFinalization())
      .subscribe(resetPasswordLinkInfo => this.resetPasswordLinkInfo.set(resetPasswordLinkInfo));
  }

  copyEmail() {
    const homePath = window.location.origin;
    const email = `Bonjour ${this.user().displayName}.

Pour pouvoir créer de nouvelles activités dans l'application "Découvertes Nature",
il te faudra choisir un mot de passe en te rendant à l'adresse suivante\u00a0:
${this.resetPasswordLinkInfo()!.resetPasswordLink}.

Une fois le mot de passe choisi, tu pourras accéder à l'application à l'adresse
suivante\u00a0:
${homePath}.`;
    from(navigator.clipboard.writeText(email)).subscribe(() =>
      this.toastService.display({
        icon: copied,
        message: 'Message copié dans le presse-papier\u00a0!'
      })
    );
  }
}
