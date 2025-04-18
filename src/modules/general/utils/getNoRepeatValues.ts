/**
 * Extracts unique, non-null and non-undefined values from an array of items using a value selector function.
 *
 * @template T - The type of items in the input array.
 * @param {T[]} data - The array of items to extract values from.
 * @param {(x: T) => unknown} getValue - A function that selects the value to extract from each item.
 * @returns {Set<unknown>} A set containing unique values extracted from the items.
 */
export function getNoRepeatValuess<T>(data: T[], getValue: (x: T) => unknown): Set<unknown> {
  const set = new Set<unknown>();

  data.forEach((item) => {
    const value = getValue(item);
    if (value !== undefined && value !== null) {
      set.add(value);
    }
  });

  return set;
}
