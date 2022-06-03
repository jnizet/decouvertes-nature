import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { USER_ROUTES } from './user.routes';
import { RouterModule } from '@angular/router';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from '../validation/validation.module';
import { IconDirective } from '../icon/icon.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageTitleDirective } from '../page-title/page-title.directive';

@NgModule({
  declarations: [UsersComponent, UserEditionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    ReactiveFormsModule,
    ValidationModule,
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective
  ]
})
export class UserModule {}
