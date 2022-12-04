import { ChangeDetectionStrategy, Component } from '@angular/core';
import { plusCircle } from '../../bootstrap-icons/bootstrap-icons';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconDirective } from '../../icon/icon.directive';

@Component({
  selector: 'dn-activities-tabs',
  templateUrl: './activities-tabs.component.html',
  styleUrls: ['./activities-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconDirective]
})
export class ActivitiesTabsComponent {
  icons = {
    addActivity: plusCircle
  };
  routerLinkActiveOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored'
  };
}
