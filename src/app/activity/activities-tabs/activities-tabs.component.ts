import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconDirective } from '../../icon/icon.directive';
import * as icons from '../../icon/icons';

@Component({
  selector: 'dn-activities-tabs',
  templateUrl: './activities-tabs.component.html',
  styleUrls: ['./activities-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconDirective]
})
export class ActivitiesTabsComponent {
  readonly icons = icons;
  readonly routerLinkActiveOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored'
  };
}
