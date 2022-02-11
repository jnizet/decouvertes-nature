import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function padNumber(value: number): string {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

/**
 * Takes an NgbDateStruct and transforms it to an ISO date string (yyyy-MM-dd). If the given date is falsy,
 * returns null.
 */
export function dateToIso(date: NgbDateStruct): string | null {
  return date ? `${date.year}-${padNumber(date.month)}-${padNumber(date.day)}` : null;
}

/**
 * Takes an ISO date string (yyyy-MM-dd) and transforms it into an NgbDateStruct. If the given value is falsy,
 * returns null.
 */
export function isoToDate(value: string): NgbDateStruct | null {
  if (value) {
    const dateParts = value.trim().split('-');
    return {
      year: toInteger(dateParts[0]),
      month: toInteger(dateParts[1]),
      day: toInteger(dateParts[2])
    };
  }
  return null;
}

function leftPadZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}
