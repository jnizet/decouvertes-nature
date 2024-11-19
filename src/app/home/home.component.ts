import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { map } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';
import { IconDirective } from '../icon/icon.directive';
import { RouterLink } from '@angular/router';
import { UsernamePipe } from '../username-pipe/username.pipe';
import * as icons from '../icon/icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconDirective, UsernamePipe]
})
export class HomeComponent {
  vm: Signal<{ user: User | null } | undefined> = toSignal(
    authState(inject(Auth)).pipe(map(user => ({ user })))
  );
  icons = icons;
}
