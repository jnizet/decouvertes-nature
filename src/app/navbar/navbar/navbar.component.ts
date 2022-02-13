import { ChangeDetectionStrategy, Component } from '@angular/core';
import { authState, Auth, User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { power } from '../../bootstrap-icons/bootstrap-icons';
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
    logout: power
  };

  constructor(private currentUserService: CurrentUserService, private router: Router) {
    this.vm$ = currentUserService.getCurrentUser().pipe(map(user => ({ user })));
  }

  logout() {
    this.currentUserService.signOut();
    this.router.navigate(['/']);
  }
}
