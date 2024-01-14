import { Injectable, Signal } from '@angular/core';
import { concat, delay, of, Subject, switchMap } from 'rxjs';
import { checkCircleFill } from '../bootstrap-icons/bootstrap-icons';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Toast {
  message: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toast: Signal<Toast | null>;

  constructor() {
    this.toast = toSignal(
      this.toastSubject.pipe(switchMap(toast => concat(of(toast), of(null).pipe(delay(3000))))),
      { initialValue: null }
    );
  }

  display(toast: Toast) {
    this.toastSubject.next(toast);
  }

  success(message: string) {
    this.display({
      icon: checkCircleFill,
      message
    });
  }
}
