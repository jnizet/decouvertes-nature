import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserEditionComponent } from './user-edition/user-edition.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'new',
    component: UserEditionComponent
  },
  {
    path: ':uid/edit',
    component: UserEditionComponent
  }
];
