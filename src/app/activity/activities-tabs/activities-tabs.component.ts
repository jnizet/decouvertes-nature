import { ChangeDetectionStrategy, Component } from '@angular/core';
import { plusCircle } from '../../bootstrap-icons/bootstrap-icons';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';

@Component({
  selector: 'dn-activities-tabs',
  templateUrl: './activities-tabs.component.html',
  styleUrls: ['./activities-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, IconDirective]
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
