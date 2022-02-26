import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { USER_ROUTES } from './user.routes';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon/icon.module';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { PageTitleModule } from '../page-title/page-title.module';

@NgModule({
  declarations: [UsersComponent, UserEditionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    IconModule,
    ReactiveFormsModule,
    ValidationModule,
    PageTitleModule
  ]
})
export class UserModule {}
