import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUser, CurrentUserService } from '../current-user.service';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle
} from '@ng-bootstrap/ng-bootstrap';
import { UsernamePipe } from '../username-pipe/username.pipe';
import { IconDirective } from '../icon/icon.directive';
import * as icons from '../icon/icons';

@Component({
  selector: 'dn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    NgbCollapse,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    UsernamePipe,
    IconDirective,
    NgbDropdownItem
  ]
})
export class NavbarComponent {
  expanded = false;
  user: Signal<CurrentUser | null>;
  icons = icons;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {
    this.user = currentUserService.currentUser;
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
