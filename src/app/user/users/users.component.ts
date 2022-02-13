import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdministeredUser, UserService } from '../user.service';
import { Observable } from 'rxjs';
import {
  pencilSquare,
  plusCircle,
  shieldFill,
  xOctagonFill
} from '../../bootstrap-icons/bootstrap-icons';

@Component({
  selector: 'dn-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users$: Observable<Array<AdministeredUser>>;
  icons = {
    admin: shieldFill,
    disabled: xOctagonFill,
    edit: pencilSquare,
    addUser: plusCircle
  };

  constructor(userService: UserService) {
    this.users$ = userService.listUsers();
  }
}
