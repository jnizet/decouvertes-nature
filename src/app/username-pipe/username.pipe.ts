import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@angular/fire/auth';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {
  transform(value: User): string {
    const email: string = value.email!!;
    return value.displayName || email.substring(0, email.indexOf('@'));
  }
}
