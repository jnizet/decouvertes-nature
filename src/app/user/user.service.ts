import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';

export interface AdministeredUser {
  uid: string;
  email: string;
  displayName: string;
  disabled: boolean;
  admin: boolean;
}

export type AdministeredUserCommand = Omit<AdministeredUser, 'uid'>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private functions: Functions) {}

  listUsers(): Observable<Array<AdministeredUser>> {
    const listUsers = httpsCallable<void, Array<AdministeredUser>>(
      this.functions,
      'listUsers'
    )(undefined);
    return from(listUsers).pipe(map(r => r.data));
  }

  get(uid: string): Observable<AdministeredUser> {
    const getUser = httpsCallable<string, AdministeredUser>(this.functions, 'getUser')(uid);
    return from(getUser).pipe(map(r => r.data));
  }

  create(command: AdministeredUserCommand): Observable<AdministeredUser> {
    const createUser = httpsCallable<AdministeredUserCommand, AdministeredUser>(
      this.functions,
      'createUser'
    )(command);
    return from(createUser).pipe(map(r => r.data));
  }

  update(uid: string, command: AdministeredUserCommand): Observable<void> {
    const updateUser = httpsCallable<AdministeredUser, void>(
      this.functions,
      'updateUser'
    )({ ...command, uid });
    return from(updateUser).pipe(map(r => r.data));
  }
}
