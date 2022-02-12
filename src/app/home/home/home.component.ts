import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';
import { boxArrowInRight } from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  vm$: Observable<{ user: User | null }>;
  icons = {
    login: boxArrowInRight
  };

  constructor(auth: Auth) {
    this.vm$ = authState(auth).pipe(map(user => ({ user })));
  }
}
