import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../../icon/icon.directive';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Activity } from '../activity.service';
import { Observable } from 'rxjs';
import { PageTitleDirective } from '../../page-title/page-title.directive';
import { CurrentActivityService } from '../current-activity.service';

@Component({
  selector: 'dn-activity-tabs',
  standalone: true,
  imports: [
    CommonModule,
    IconDirective,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    PageTitleDirective
  ],
  templateUrl: './activity-tabs.component.html',
  styleUrls: ['./activity-tabs.component.scss'],
  providers: [CurrentActivityService]
})
export class ActivityTabsComponent {
  activity$: Observable<Activity>;

  routerLinkActiveOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored'
  };

  constructor(private currentActivityService: CurrentActivityService) {
    this.activity$ = currentActivityService.activity$;
  }
}
