import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  boxArrowInRight,
  calendar2Event,
  cardList,
  clipboard2,
  key,
  personCircle,
  personWorkspace,
  power
} from '../../bootstrap-icons/bootstrap-icons';
import { CurrentUser, CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'dn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  expanded = false;
  vm$: Observable<{
    user: CurrentUser | null;
  }>;
  icons = {
    logout: power,
    login: boxArrowInRight,
    activities: cardList,
    calendar: calendar2Event,
    users: personWorkspace,
    user: personCircle,
    changePassword: key,
    exports: clipboard2
  };

  constructor(private currentUserService: CurrentUserService, private router: Router) {
    this.vm$ = currentUserService.getCurrentUser().pipe(map(user => ({ user })));
  }

  logout() {
    this.currentUserService.signOut();
    this.router.navigate(['/']);
  }
}
