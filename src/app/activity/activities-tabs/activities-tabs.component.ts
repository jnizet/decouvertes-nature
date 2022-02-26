import { ChangeDetectionStrategy, Component } from '@angular/core';
import { plusCircle } from '../../bootstrap-icons/bootstrap-icons';
import { IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'dn-activities-tabs',
  templateUrl: './activities-tabs.component.html',
  styleUrls: ['./activities-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
