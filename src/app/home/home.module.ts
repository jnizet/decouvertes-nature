import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';
import { UsernamePipeModule } from '../username-pipe/username-pipe.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(HOME_ROUTES), UsernamePipeModule]
})
export class HomeModule {}
