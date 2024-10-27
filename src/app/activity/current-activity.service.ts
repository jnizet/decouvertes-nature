import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { Activity, ActivityService } from './activity.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CurrentActivityService {
  activity$: Observable<Activity>;

  constructor() {
    const route = inject(ActivatedRoute);
    const activityService = inject(ActivityService);

    this.activity$ = route.paramMap.pipe(
      switchMap(paramMap => activityService.get(paramMap.get('id')!)),
      shareReplay(1)
    );
  }
}
