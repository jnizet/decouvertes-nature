import { inject, Injectable, Signal } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { toUsername } from './username-pipe/username.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

export interface CurrentUser {
  user: User;
  admin: boolean;
  export: boolean;
}

export interface AuditUser {
  uid: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private auth = inject(Auth);

  readonly currentUser$: Observable<CurrentUser | null>;
  readonly currentUser: Signal<CurrentUser | null>;

  constructor() {
    this.currentUser$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          return from(user.getIdTokenResult()).pipe(
            map(token => ({
              user,
              admin: !!token.claims['admin'],
              export: !!token.claims['export']
            }))
          );
        } else {
          return of(null);
        }
      })
    );
    this.currentUser = toSignal(this.currentUser$, { initialValue: null });
  }

  getCurrentAuditUser(): AuditUser {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('No current user');
    }
    return { uid: user.uid, displayName: toUsername(user) };
  }

  signOut() {
    return this.auth.signOut();
  }
}
