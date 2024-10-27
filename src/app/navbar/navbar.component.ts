import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
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
  private currentUserService = inject(CurrentUserService);
  private router = inject(Router);

  expanded = signal(false);
  user = this.currentUserService.currentUser;
  icons = icons;

  logout() {
    this.currentUserService.signOut();
    this.router.navigate(['/']);
  }

  collapse() {
    this.expanded.set(false);
  }

  toggle() {
    this.expanded.update(expanded => !expanded);
  }
}
