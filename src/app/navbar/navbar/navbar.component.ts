import { ChangeDetectionStrategy, Component } from '@angular/core';
import { authState, Auth, User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { power } from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  expanded = false;
  vm$: Observable<{
    user: User | null;
  }>;
  icons = {
    logout: power
  };

  constructor(private auth: Auth, private router: Router) {
    this.vm$ = authState(auth).pipe(map(user => ({ user })));
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}
