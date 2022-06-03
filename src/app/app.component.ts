import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ValidationDefaultsComponent } from './validation/validation-defaults/validation-defaults.component';

@Component({
  selector: 'dn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, ValidationDefaultsComponent]
})
export class AppComponent {}
