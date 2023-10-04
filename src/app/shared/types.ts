export type YearMonth = string;
export type LocalDate = string;
export type LocalTime = string;

export function localDateToYearMonth(date: LocalDate): YearMonth {
  return date.substring(0, date.lastIndexOf('-'));
}
export function localDateToYear(date: LocalDate): number {
  return parseInt(date.substring(0, date.indexOf('-')));
}
