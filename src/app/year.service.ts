import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  private yearSubject = new BehaviorSubject<number>(new Date().getFullYear());

  readonly year$: Observable<number> = this.yearSubject.asObservable();

  set(year: number) {
    this.yearSubject.next(year);
  }
}
