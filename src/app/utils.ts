export function sortedBy<T>(
  array: ReadonlyArray<T>,
  extractor: (t: T) => any,
  order: 'asc' | 'desc' = 'asc'
): Array<T> {
  const result = [...array];
  return result.sort((a, b) => {
    const p1 = extractor(a);
    const p2 = extractor(b);
    let result: number;
    if (p1 < p2) {
      result = -1;
    } else if (p1 > p2) {
      result = 1;
    } else {
      result = 0;
    }
    if (order === 'desc') {
      result = -result;
    }
    return result;
  });
}
