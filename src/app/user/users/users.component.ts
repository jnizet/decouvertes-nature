import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdministeredUser, UserService } from '../user.service';
import { BehaviorSubject, from, Observable, switchMap, tap, timer } from 'rxjs';
import {
  clipboard2Fill,
  envelope,
  pencilSquare,
  plusCircle,
  shieldFill,
  xOctagonFill
} from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users$: Observable<Array<AdministeredUser>>;
  icons = {
    admin: shieldFill,
    export: clipboard2Fill,
    disabled: xOctagonFill,
    edit: pencilSquare,
    addUser: plusCircle,
    resetPasswordEmail: envelope
  };

  copied = new BehaviorSubject(false);

  constructor(userService: UserService) {
    this.users$ = userService.listUsers();
  }

  copyEmail(user: AdministeredUser) {
    const path = window.location.origin + '/reset-password?email=' + encodeURIComponent(user.email);
    const email = `Bonjour ${user.displayName}.

Pour pouvoir créer de nouvelles activités dans l'application "Découvertes Nature",
il te faudra choisir un mot de passe en te rendant à l'adresse suivante:
${path}.
`;
    from(navigator.clipboard.writeText(email))
      .pipe(
        tap(() => this.copied.next(true)),
        switchMap(() => timer(3000)),
        tap(() => this.copied.next(false))
      )
      .subscribe();
  }
}
