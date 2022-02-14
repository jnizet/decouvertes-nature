import { BehaviorSubject, defer, finalize, Observable, OperatorFunction } from 'rxjs';

export class Spinner {
  private spinning = new BehaviorSubject<boolean>(false);

  get isSpinning(): Observable<boolean> {
    return this.spinning;
  }

  spinUntilFinalization<T>(): OperatorFunction<T, T> {
    return o =>
      defer(() => {
        this.spinning.next(true);
        return o;
      }).pipe(finalize(() => this.spinning.next(false)));
  }
}
