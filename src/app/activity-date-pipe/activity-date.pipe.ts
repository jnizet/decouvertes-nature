import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../activity/activity.service';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'activityDate',
  standalone: true
})
export class ActivityDatePipe implements PipeTransform {
  transform(
    { startDate, endDate, startTime, endTime }: Activity,
    mode: 'date' | 'time' = 'date'
  ): string {
    const options = { locale: fr };
    const d1 = parseISO(`${startDate}T${startTime ?? '00:00'}`);
    const d2 = parseISO(`${endDate}T${endTime ?? '00:00'}`);
    if (startDate === endDate) {
      let result = format(d1, 'eeee d MMMM yyyy', options);
      if (mode === 'time' && startTime && endTime) {
        result += ' de ' + format(d1, 'HH:mm', options) + ' à ' + format(d2, 'HH:mm', options);
      }
      return result;
    } else {
      const startPatternSuffix = mode === 'time' && startTime ? ' à HH:mm' : '';
      const endPatternSuffix = mode === 'time' && endTime ? ' à HH:mm' : '';
      if (d1.getFullYear() === d2.getFullYear()) {
        if (d1.getMonth() === d2.getMonth()) {
          return (
            'du ' +
            format(d1, 'eeee d' + startPatternSuffix, options) +
            ' au ' +
            format(d2, 'eeee d MMMM yyyy' + endPatternSuffix, options)
          );
        } else {
          return (
            'du ' +
            format(d1, 'eeee d MMMM' + startPatternSuffix, options) +
            ' au ' +
            format(d2, 'eeee d MMMM yyyy' + endPatternSuffix, options)
          );
        }
      } else {
        return (
          'du ' +
          format(d1, 'eeee d MMMM yyyy' + startPatternSuffix, options) +
          ' au ' +
          format(d2, 'eeee d MMMM yyyy' + endPatternSuffix, options)
        );
      }
    }
  }
}
