import { useMemo, useState } from 'react';

/**
 * Custom hook for paginating an array of data.
 *
 * @template T - The type of data items.
 * @param {[T[], number]} params - A tuple containing the full data array and the number of items per page.
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   paginatedData: T[],
 *   setPage: (page: number) => void
 * }} An object containing the current page, total pages, paginated data, and a function to set the current page.
 */
function usePagination<T>([data, itemsPerPage]: [T[], number]) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page, itemsPerPage]);

  return {
    currentPage: page,
    totalPages,
    paginatedData,
    setPage,
  };
}

export default usePagination;
