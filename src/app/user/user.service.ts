import { Injectable, inject } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';

export interface AdministeredUser {
  uid: string;
  email: string;
  displayName: string;
  disabled: boolean;
  admin: boolean;
  export: boolean;
}

export type AdministeredUserCommand = Omit<AdministeredUser, 'uid'>;

export interface ResetPasswordLinkInfo {
  resetPasswordLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private functions = inject(Functions);

  listUsers(): Observable<Array<AdministeredUser>> {
    const listUsers = httpsCallable<void, Array<AdministeredUser>>(this.functions, 'listUsers');
    return defer(() => listUsers()).pipe(
      map(r =>
        r.data.sort((a, b) => {
          const n1 = a.displayName.toLocaleLowerCase();
          const n2 = b.displayName.toLocaleLowerCase();
          return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
        })
      )
    );
  }

  get(uid: string): Observable<AdministeredUser> {
    const getUser = httpsCallable<string, AdministeredUser>(this.functions, 'getUser');
    return defer(() => getUser(uid)).pipe(map(r => r.data));
  }

  create(command: AdministeredUserCommand): Observable<AdministeredUser> {
    const createUser = httpsCallable<AdministeredUserCommand, AdministeredUser>(
      this.functions,
      'createUser'
    );
    return defer(() => createUser(command)).pipe(map(r => r.data));
  }

  update(uid: string, command: AdministeredUserCommand): Observable<void> {
    const updateUser = httpsCallable<AdministeredUser, void>(this.functions, 'updateUser');
    return defer(() => updateUser({ ...command, uid })).pipe(map(r => r.data));
  }

  generateResetPasswordLink(uid: string): Observable<ResetPasswordLinkInfo> {
    const generateResetPasswordLink = httpsCallable<string, ResetPasswordLinkInfo>(
      this.functions,
      'generateResetPasswordLink'
    );
    return defer(() => generateResetPasswordLink(uid)).pipe(map(r => r.data));
  }
}
