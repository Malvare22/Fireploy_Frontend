import { useState } from "react";

export type Order = "asc" | "desc" | undefined;

/**
 * Custom hook to manage sorting state and logic for data arrays.
 *
 * This hook allows you to define sorting orders for specific properties, including nested ones,
 * and provides a method to sort the data based on the active sorting configuration.
 *
 * @template T - The type of the objects to be sorted.
 * @returns {{
 *   orderData: (array: T[]) => T[],
 *   handleOrder: (property: string, order: Order) => void,
 *   order: Record<string, Order>,
 *   resetOrder: () => void
 * }} - Functions to sort data, update order state, and reset sorting.
 */
function useOrderSelect<T extends object>() {
  const [order, setOrder] = useState<Record<string, Order>>({});

  /**
   * Retrieves a nested value from an object based on a dot-separated path.
   *
   * @param {any} obj - The object to retrieve the value from.
   * @param {string} path - Dot-separated path to the property.
   * @returns {any} - The value at the specified path or undefined if the path doesn't exist.
   */
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  /**
   * Compares two objects based on a given key and order.
   *
   * @param {T} a - The first object to compare.
   * @param {T} b - The second object to compare.
   * @param {string} key - The key (possibly nested) to compare.
   * @param {Order} order - The sorting order ('asc' for ascending, 'desc' for descending).
   * @returns {number} - Comparison result: -1 if `a` is smaller, 1 if `b` is smaller, 0 if equal.
   */
  function comparator(a: T, b: T, key: string, order: Order): number {
    const valueA = getNestedValue(a, key);
    const valueB = getNestedValue(b, key);

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  }

  /**
   * Returns a comparator function based on the active sorting order.
   *
   * @param {Record<string, Order>} orderBy - An object mapping property names to their respective order.
   * @returns {(a: T, b: T) => number} - A comparison function to be used with the `sort` method.
   */
  function getComparator(orderBy: Record<string, Order>): (a: T, b: T) => number {
    return (a, b) => {
      for (const key of Object.keys(orderBy)) {
        const order = orderBy[key];
        if (order !== undefined) {
          const comparison = comparator(a, b, key, order);
          if (comparison !== 0) return comparison;
        }
      }
      return 0;
    };
  }

  /**
   * Updates the sorting order for a specific property.
   *
   * @param {string} property - The property name to sort by.
   * @param {Order} order - The new sorting order or `undefined` to remove the sorting.
   */
  const handleOrder = (property: string, order: Order): void => {
    setOrder((prevOrderBy) => ({
      ...prevOrderBy,
      [property]: order,
    }));
  };

  /**
   * Sorts an array of objects based on the current sorting configuration.
   *
   * @param {T[]} array - The array of data to sort.
   * @returns {T[]} - A new sorted array based on active sorting keys and orders.
   */
  const orderDataFn = (array: T[]): T[] => {
    const activeOrderBy = Object.fromEntries(
      Object.entries(order).filter(([_, order]) => order !== undefined)
    );

    if (Object.keys(activeOrderBy).length === 0) return array;

    const comparator = getComparator(activeOrderBy);
    return array.slice().sort(comparator);
  };

  /**
   * Resets the sorting order to its initial state (no sorting).
   */
  const resetOrder = (): void => {
    setOrder({});
  };

  return {
    orderDataFn,
    handleOrder,
    order,
    resetOrder
  };
}

export default useOrderSelect;
