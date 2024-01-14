import { defer, finalize, OperatorFunction } from 'rxjs';
import { signal } from '@angular/core';

export class Spinner {
  private spinning = signal(false);
  readonly isSpinning = this.spinning.asReadonly();

  spinUntilFinalization<T>(): OperatorFunction<T, T> {
    return o =>
      defer(() => {
        this.spinning.set(true);
        return o;
      }).pipe(finalize(() => this.spinning.set(false)));
  }
}
