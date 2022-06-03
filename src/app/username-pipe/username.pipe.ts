import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@angular/fire/auth';

export function toUsername(user: User) {
  const email: string = user.email!;
  return user.displayName || email.substring(0, email.indexOf('@'));
}

@Pipe({
  name: 'username',
  standalone: true
})
export class UsernamePipe implements PipeTransform {
  transform(value: User): string {
    return toUsername(value);
  }
}
