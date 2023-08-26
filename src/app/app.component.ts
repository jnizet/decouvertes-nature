import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ValidationDefaultsComponent } from './validation/validation-defaults/validation-defaults.component';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'dn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ValidationDefaultsComponent, ToastComponent]
})
export class AppComponent {}
