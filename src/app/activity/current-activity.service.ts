import { Injectable } from '@angular/core';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { Activity, ActivityService } from './activity.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CurrentActivityService {
  activity$: Observable<Activity>;

  constructor(route: ActivatedRoute, activityService: ActivityService) {
    this.activity$ = route.paramMap.pipe(
      switchMap(paramMap => activityService.get(paramMap.get('id')!)),
      shareReplay(1)
    );
  }
}
