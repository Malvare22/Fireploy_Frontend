import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to manage URL search parameters.
 * This hook provides a way to access and modify the search parameters
 * of the current URL using the `useSearchParams` hook from `react-router-dom`.
 *
 * @returns An object containing:
 * - `searchParams`: The current search parameters from the URL.
 * - `setSearchParams`: A function to update the search parameters.
 * - `updateSearchParams`: A function to update a specific search parameter by key.
 */
export const useParamsCustom = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Function to update a specific search parameter in the URL.
   * This function creates a new `URLSearchParams` object, updates the parameter,
   * and then sets the new search parameters.
   *
   * @param key - The key (parameter name) to update.
   * @param value - The new value to set for the parameter.
   */
  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return {
    searchParams, // The current URL search parameters.
    setSearchParams, // Function to set new search parameters.
    updateSearchParams, // Function to update a specific search parameter.
  };
};
