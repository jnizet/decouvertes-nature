import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { exhaustMap, from, map, Observable, startWith, Subject } from 'rxjs';
import { AdministeredUser, ResetPasswordLinkInfo, UserService } from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDirective } from '../../icon/icon.directive';
import { Spinner } from '../../shared/spinner';
import { ToastService } from '../../toast/toast.service';
import { clipboardCheck } from '../../bootstrap-icons/bootstrap-icons';
import { SpinningIconComponent } from '../../shared/spinning-icon/spinning-icon.component';
import * as icons from '../../icon/icons';

interface ViewModel {
  resetPasswordLinkInfo?: ResetPasswordLinkInfo;
}

@Component({
  selector: 'dn-reset-password-link-modal',
  standalone: true,
  imports: [CommonModule, IconDirective, SpinningIconComponent],
  templateUrl: './reset-password-link-modal.component.html',
  styleUrls: ['./reset-password-link-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordLinkModalComponent {
  readonly vm$: Observable<ViewModel>;
  readonly icons = icons;

  private readonly generateResetPasswordLinkSubject = new Subject<void>();
  readonly generating = new Spinner();

  user!: AdministeredUser;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.vm$ = this.generateResetPasswordLinkSubject.pipe(
      exhaustMap(() =>
        userService.generateResetPasswordLink(this.user.uid).pipe(
          this.generating.spinUntilFinalization(),
          map(resetPasswordLinkInfo => ({ resetPasswordLinkInfo }))
        )
      ),
      startWith({})
    );
  }

  generateResetPasswordLink() {
    this.generateResetPasswordLinkSubject.next();
  }

  copyEmail(resetPasswordLinkInfo: ResetPasswordLinkInfo) {
    const homePath = window.location.origin;
    const email = `Bonjour ${this.user.displayName}.

Pour pouvoir créer de nouvelles activités dans l'application "Découvertes Nature",
il te faudra choisir un mot de passe en te rendant à l'adresse suivante\u00a0:
${resetPasswordLinkInfo.resetPasswordLink}.

Une fois le mot de passe choisi, tu pourras accéder à l'application à l'adresse
suivante\u00a0:
${homePath}.`;
    from(navigator.clipboard.writeText(email)).subscribe(() =>
      this.toastService.display({
        icon: clipboardCheck,
        message: 'Message copié dans le presse-papier\u00a0!'
      })
    );
  }
}
