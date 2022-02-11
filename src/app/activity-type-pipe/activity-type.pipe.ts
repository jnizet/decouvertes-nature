import { Pipe, PipeTransform } from '@angular/core';
import { ALL_ACTIVITY_TYPES } from '../activity/activity.service';

@Pipe({
  name: 'activityType'
})
export class ActivityTypePipe implements PipeTransform {
  transform(key: string): string {
    return ALL_ACTIVITY_TYPES.find(a => a.key === key)?.label ?? key;
  }
}
