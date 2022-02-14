import { Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { toUsername } from './username-pipe/username.pipe';

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
  private currentUser$: Observable<CurrentUser | null>;

  constructor(private auth: Auth) {
    this.currentUser$ = authState(auth).pipe(
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
  }

  getCurrentUser(): Observable<CurrentUser | null> {
    return this.currentUser$;
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
