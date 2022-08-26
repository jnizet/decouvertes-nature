import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';
import { boxArrowInRight, calendar2Event, cardList } from '../bootstrap-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../icon/icon.directive';
import { RouterLinkWithHref } from '@angular/router';
import { UsernamePipe } from '../username-pipe/username.pipe';

@Component({
  selector: 'dn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, IconDirective, UsernamePipe]
})
export class HomeComponent {
  vm$: Observable<{ user: User | null }>;
  icons = {
    login: boxArrowInRight,
    activities: cardList,
    calendar: calendar2Event
  };

  constructor(auth: Auth) {
    this.vm$ = authState(auth).pipe(map(user => ({ user })));
  }
}
