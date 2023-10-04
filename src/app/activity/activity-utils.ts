import { localDateToYear, localDateToYearMonth, YearMonth } from '../shared/types';
import { Activity } from './activity.service';
import { sortedBy } from '../utils';

/**
 * A year of activities, where activities are grouped by month inside the year, in chronological order
 */
export interface YearOfActivities {
  year: number;
  months: Array<MonthOfActivities>;
}

/**
 * A month of activities, where activities are sorted in chronological order
 */
export interface MonthOfActivities {
  month: YearMonth;
  activities: Array<Activity>;
}

/**
 * Groups activities by year, and then by month, and return the years in antichronological order (but the months
 * inside the year in chronological order, and the activities inside the month in chronological order)
 */
export function groupByYearAndMonth(activities: ReadonlyArray<Activity>): Array<YearOfActivities> {
  const activitiesByYearAndMonth = new Map<number, Map<YearMonth, Array<Activity>>>();
  activities.forEach(activity => {
    const month = localDateToYearMonth(activity.startDate);
    const year = localDateToYear(activity.startDate);
    if (!activitiesByYearAndMonth.has(year)) {
      activitiesByYearAndMonth.set(year, new Map<YearMonth, Array<Activity>>());
    }
    const activitiesByMonth = activitiesByYearAndMonth.get(year)!;
    if (!activitiesByMonth.has(month)) {
      activitiesByMonth.set(month, []);
    }
    activitiesByMonth.get(month)!.push(activity);
  });
  const yearsOfActivities: Array<YearOfActivities> = Array.from(
    activitiesByYearAndMonth.entries()
  ).map(([year, activitiesByMonth]) => {
    let monthsOfActivities = Array.from(activitiesByMonth.entries()).map(([month, activities]) => ({
      month,
      activities: sortedBy(activities, a => a.startDate, 'asc')
    }));
    monthsOfActivities = sortedBy(monthsOfActivities, m => m.month, 'asc');
    return {
      year,
      months: monthsOfActivities
    };
  });
  return sortedBy(yearsOfActivities, y => y.year, 'desc');
}
