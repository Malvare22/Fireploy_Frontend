export function getNoRepeatValues<T>(data: T[], getValue: (x: T) => unknown): unknown[] {
  const set = new Set<unknown>();

  data.forEach((item) => {
    const value = getValue(item);
    if (value !== undefined && value !== null) {
      set.add(value);
    }
  });

  return [...set];
}
