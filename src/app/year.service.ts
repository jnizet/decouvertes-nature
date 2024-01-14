import { Injectable, signal } from '@angular/core';

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
  private yearSignal = signal<number>(readYear() ?? new Date().getFullYear());
  readonly year = this.yearSignal.asReadonly();

  set(year: number) {
    this.yearSignal.set(year);
    storeYear(year);
  }
}
