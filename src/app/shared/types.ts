export type YearMonth = string;
export type LocalDate = string;
export type LocalTime = string;

export function localDateToYearMonth(date: LocalDate) {
  return date.substring(0, date.lastIndexOf('-'));
}
