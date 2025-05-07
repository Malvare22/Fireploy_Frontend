import { useState, useMemo } from "react";

/**
 * Custom hook to manage pagination state and logic for data arrays.
 *
 * This hook provides functionality to paginate through a dataset, including methods to go to the next or previous page,
 * jump to a specific page, and reset pagination to the initial page.
 *
 * @template T - The type of the data items to paginate.
 * @param {T[]} data - The dataset to paginate.
 * @param {number} [itemsPerPage=10] - The number of items to display per page.
 * @param {number} [initialPage=1] - The initial page number (defaults to 1).
 * @returns {{
 *   currentPage: number,             // The current page number.
 *   totalPages: number,              // The total number of pages.
 *   paginatedData: T[],              // The data for the current page.
 *   nextPage: () => void,            // Function to go to the next page.
 *   prevPage: () => void,            // Function to go to the previous page.
 *   goToPage: (page: number) => void,// Function to go to a specific page.
 *   resetPagination: () => void,     // Function to reset pagination to the initial page.
 *   hasNextPage: boolean,            // True if there is a next page.
 *   hasPrevPage: boolean             // True if there is a previous page.
 * }}
 */
export function usePagination<T>(data: T[], itemsPerPage = 10, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  /**
   * Moves to the next page if available.
   */
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  /**
   * Moves to the previous page if available.
   */
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  /**
   * Jumps to a specific page, clamping to the valid page range.
   *
   * @param {number} page - The page number to jump to.
   */
  const goToPage = (page: number) => setCurrentPage(() => Math.min(Math.max(page, 1), totalPages));

  /**
   * Resets pagination to the initial page number.
   */
  const resetPagination = () => setCurrentPage(initialPage);

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPagination,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
