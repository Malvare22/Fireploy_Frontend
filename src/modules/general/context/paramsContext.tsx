import { createContext } from "react";
import { URLSearchParamsInit } from "react-router";

/**
 * Context type definition for handling search parameters in the URL.
 * This type provides the structure for the context that holds the search
 * parameters and methods to update them.
 * 
 * @typedef {Object} ParamsContextType
 * @property {URLSearchParams} searchParams - The current search parameters from the URL.
 * @property {Function} setSearchParams - Function to set the search parameters in the URL.
 * @property {Function} updateSearchParams - Function to update a specific search parameter in the URL.
 */
type ParamsContextType = {
  /**
   * The current search parameters from the URL.
   * It is an instance of `URLSearchParams`.
   * 
   * @type {URLSearchParams}
   */
  searchParams: URLSearchParams;

  /**
   * Function to set the search parameters in the URL.
   * 
   * @param {URLSearchParamsInit} nextInit - The new search parameters to set.
   * @param {Object} [navigateOptions] - Options to customize navigation.
   * @param {boolean} [navigateOptions.replace] - If `true`, replaces the current history entry.
   * @returns {void}
   */
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: { replace?: boolean }) => void;

  /**
   * Function to update a specific search parameter in the URL.
   * 
   * @param {string} key - The name of the search parameter to update.
   * @param {string} value - The new value for the search parameter.
   * @returns {void}
   */
  updateSearchParams: (key: string, value: string) => void;
};

/**
 * The ParamsContext is used to provide access to search parameters
 * and methods to update them within the React component tree.
 * 
 * It is initialized with default values for `searchParams`, `setSearchParams`,
 * and `updateSearchParams`, all of which can be overridden by the context provider.
 * 
 * @constant
 * @type {React.Context<ParamsContextType>}
 */
export const ParamsContext = createContext<ParamsContextType>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  updateSearchParams: () => {},
});
