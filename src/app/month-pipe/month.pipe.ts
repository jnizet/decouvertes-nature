import { Pipe, PipeTransform } from '@angular/core';
import { YearMonth } from '../shared/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {
  transform(value: YearMonth, mode: 'with-year' | 'without-year' = 'with-year') {
    const formatted = format(parseISO(value), mode === 'with-year' ? 'MMMM yyyy' : 'MMMM', {
      locale: fr
    });
    return formatted[0].toUpperCase() + formatted.substring(1);
  }
}
