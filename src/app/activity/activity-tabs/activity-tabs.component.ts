import { Component, inject } from '@angular/core';
import { IconDirective } from '../../icon/icon.directive';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { CurrentActivityService } from '../current-activity.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'dn-activity-tabs',
  standalone: true,
  imports: [
    IconDirective,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    PageTitleDirective,
    DecimalPipe
  ],
  templateUrl: './activity-tabs.component.html',
  styleUrls: ['./activity-tabs.component.scss'],
  providers: [CurrentActivityService]
})
export class ActivityTabsComponent {
  activity = toSignal(inject(CurrentActivityService).activity$);

  routerLinkActiveOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored'
  };
}
