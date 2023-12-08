import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CurrentUser, CurrentUserService } from '../current-user.service';
import { AsyncPipe } from '@angular/common';
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
    AsyncPipe,
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
  vm$: Observable<{
    user: CurrentUser | null;
  }>;
  icons = icons;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {
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
