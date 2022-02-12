import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../activity/activity.service';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'activityDate'
})
export class ActivityDatePipe implements PipeTransform {
  transform(
    { startDate, endDate, startTime, endTime }: Activity,
    mode: 'date' | 'time' = 'date'
  ): string {
    const options = { locale: fr };
    const d1 = parseISO(`${startDate}T${startTime}`);
    const d2 = parseISO(`${endDate}T${endTime}`);
    if (startDate === endDate) {
      let result = format(d1, 'eeee dd MMMM yyyy', options);
      if (mode === 'time') {
        result += ' de ' + format(d1, 'HH:mm', options) + ' à ' + format(d2, 'HH:mm', options);
      }
      return result;
    } else {
      const patternSuffix = mode === 'date' ? '' : ' à HH:mm';
      if (d1.getFullYear() === d2.getFullYear()) {
        if (d1.getMonth() === d2.getMonth()) {
          return (
            'du ' +
            format(d1, 'eeee dd' + patternSuffix, options) +
            ' au ' +
            format(d2, 'eeee dd MMMM yyyy' + patternSuffix, options)
          );
        } else {
          return (
            'du ' +
            format(d1, 'eeee dd MMMM' + patternSuffix, options) +
            ' au ' +
            format(d2, 'eeee dd MMMM yyyy' + patternSuffix, options)
          );
        }
      } else {
        return (
          'du ' +
          format(d1, 'eeee dd MMMM yyyy + patternSuffix', options) +
          ' au ' +
          format(d2, 'eeee dd MMMM yyyy' + patternSuffix, options)
        );
      }
    }
  }
}
