import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UsernamePipeModule } from '../username-pipe/username-pipe.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbDropdownModule,
    UsernamePipeModule,
    IconModule
  ]
})
export class NavbarModule {}
