import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import {
  boxArrowInRight,
  calendar2Event,
  cardList,
  clipboard2,
  geoAlt,
  key,
  personCircle,
  personWorkspace,
  power
} from '../bootstrap-icons/bootstrap-icons';
import { CurrentUser, CurrentUserService } from '../current-user.service';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UsernamePipe } from '../username-pipe/username.pipe';
import { IconDirective } from '../icon/icon.directive';

@Component({
  selector: 'dn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbDropdownModule,
    UsernamePipe,
    IconDirective
  ]
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
    exports: clipboard2,
    map: geoAlt
  };

  constructor(private currentUserService: CurrentUserService, private router: Router) {
    this.vm$ = currentUserService.getCurrentUser().pipe(map(user => ({ user })));
  }

  logout() {
    this.currentUserService.signOut();
    this.router.navigate(['/']);
  }

  collapse() {
    this.expanded = false;
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
