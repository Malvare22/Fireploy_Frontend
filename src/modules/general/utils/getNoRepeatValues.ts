/**
 * getNoRepeatValues function – returns a list of unique values obtained from the input data
 * by applying a custom value extractor function.
 * 
 * This utility is useful for filtering distinct values from a dataset based on a specific property
 * or computed value. It safely ignores `undefined` and `null` results from the extractor function.
 * 
 * @function
 * 
 * @param {Array} data - An array of elements from which values will be extracted.
 * @param {Function} getValue - A function that takes an element and returns the value to be considered for uniqueness.
 * 
 * @returns {Array} An array of unique values, preserving the insertion order from the original data.
 * 
 * @example
 * ```ts
 * const users = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * const uniqueIds = getNoRepeatValues(users, user => user.id);
 * // uniqueIds = [1, 2]
 * ```
 */
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
