import { useState } from "react";

/**
 * Custom hook to manage dynamic filters on objects of type T.
 *
 * This hook allows you to define filters by providing keys (including nested keys using dot notation)
 * and corresponding conditions (predicate functions). It returns a method to set filters and another to apply them.
 *
 * @template T - The shape of the data objects being filtered.
 * @returns {{
 *   toggleFilter: (key: string, condition: (value: any) => boolean) => void;
 *   filterData: (data: T[]) => T[];
 *   filters: Record<string, (value: any) => boolean>;
 * }}
 */
export const useFilters = <T extends object>() => {
  /**
   * Stores active filters, where each key represents an attribute (dot notation supported)
   * and the value is a condition function to test against.
   */
  const [filters, setFilters] = useState<Record<string, (value: any) => boolean>>({});

  /**
   * Adds or updates a filter for a specific attribute.
   *
   * @param {string} key - Attribute identifier (can be nested using dot notation, e.g. "profile.name").
   * @param {(value: any) => boolean} condition - Predicate function to evaluate values of the given attribute.
   */
  const handleFilter = (key: string, condition: (value: any) => boolean): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: condition,
    }));
  };

  /**
   * Retrieves the value of a nested property in an object using dot notation.
   *
   * @param {object} obj - The object from which to retrieve the value.
   * @param {string} path - Dot-notated path to the desired value (e.g., "profile.name").
   * @returns {any} - The value found at the specified path, or undefined if not found.
   */
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  /**
   * Applies all active filters to a list of data.
   *
   * @param {T[]} data - Array of items to be filtered.
   * @returns {T[]} - Filtered data, including only items that match all conditions.
   */
  const filterDataFn = (data: T[]): T[] => {
    return Object.entries(filters).reduce((filteredData, [key, condition]) => {
      return filteredData.filter((element) => condition(getNestedValue(element, key)));
    }, data);
  };

  return { handleFilter, filterDataFn, filters };
};
