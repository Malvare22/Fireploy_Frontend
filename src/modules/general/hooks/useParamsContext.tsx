import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to manage URL search parameters.
 * 
 * This hook provides a way to access and modify the search parameters
 * of the current URL using the `useSearchParams` hook from `react-router-dom`.
 * It allows for reading the current search parameters and updating them
 * with specific values, providing an easier interface for working with URL parameters.
 *
 * @returns {{
 *   searchParams: URLSearchParams,     // The current search parameters from the URL.
 *   setSearchParams: (params: URLSearchParams) => void, // Function to set new search parameters.
 *   updateSearchParams: (key: string, value: string) => void // Function to update a specific search parameter.
 * }}
 */
export const useParamsCustom = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Function to update a specific search parameter in the URL.
   * This function creates a new `URLSearchParams` object, updates the parameter,
   * and then sets the new search parameters.
   *
   * @param {string} key - The key (parameter name) to update.
   * @param {string} value - The new value to set for the parameter.
   */
  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return {
    searchParams,    // The current URL search parameters.
    setSearchParams,  // Function to set new search parameters.
    updateSearchParams, // Function to update a specific search parameter.
  };
};
