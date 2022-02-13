import { Injectable } from '@angular/core';
import { Auth, authState, getIdToken, idToken, User } from '@angular/fire/auth';
import {
  distinctUntilChanged,
  first,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError
} from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { toUsername } from './username-pipe/username.pipe';

export interface CurrentUser {
  user: User;
  admin: boolean;
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
              admin: !!token.claims['admin']
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
