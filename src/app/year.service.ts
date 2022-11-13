import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

function storeYear(year: number) {
  window.localStorage.setItem('year', `${year}`);
}

function readYear(): number | null {
  const readYear = window.localStorage.getItem('year');
  if (readYear) {
    const parsedReadYear = parseInt(readYear);
    if (isNaN(parsedReadYear)) {
      return null;
    } else {
      return parsedReadYear;
    }
  } else {
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class YearService {
  private yearSubject = new BehaviorSubject<number>(readYear() ?? new Date().getFullYear());

  readonly year$: Observable<number> = this.yearSubject.asObservable();

  set(year: number) {
    this.yearSubject.next(year);
    storeYear(year);
  }
}
