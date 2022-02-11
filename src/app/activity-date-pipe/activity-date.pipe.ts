import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../activity/activity.service';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'activityDate'
})
export class ActivityDatePipe implements PipeTransform {
  transform({ startDate, endDate }: Activity): string {
    const options = { locale: fr };
    if (startDate === endDate) {
      return format(parseISO(startDate), 'eeee dd MMMM yyyy', options);
    } else {
      const d1 = parseISO(startDate);
      const d2 = parseISO(endDate);
      if (d1.getFullYear() === d2.getFullYear()) {
        if (d1.getMonth() === d2.getMonth()) {
          return (
            'du ' +
            format(d1, 'eeee dd', options) +
            ' au ' +
            format(d2, 'eeee dd MMMM yyyy', options)
          );
        } else {
          return (
            'du ' +
            format(d1, 'eeee dd MMMM', options) +
            ' au ' +
            format(d2, 'eeee dd MMMM yyyy', options)
          );
        }
      } else {
        return (
          'du ' +
          format(d1, 'eeee dd MMMM yyyy', options) +
          ' au ' +
          format(d2, 'eeee dd MMMM yyyy', options)
        );
      }
    }
  }
}
