import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';
import { UsernamePipe } from '../username-pipe/username.pipe';
import { IconDirective } from '../icon/icon.directive';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(HOME_ROUTES), UsernamePipe, IconDirective]
})
export class HomeModule {}
