import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';
import { boxArrowInRight, calendar2Event, cardList } from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  vm$: Observable<{ user: User | null }>;
  icons = {
    login: boxArrowInRight,
    activities: cardList,
    calendar: calendar2Event
  };

  rollingIcon$ = interval(1000).pipe(
    map(i => (i % 2 === 0 ? this.icons.login : this.icons.calendar))
  );

  constructor(auth: Auth) {
    this.vm$ = authState(auth).pipe(map(user => ({ user })));
  }
}
