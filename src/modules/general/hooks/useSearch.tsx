import { useState } from "react";

/**
 * Custom hook for managing search functionality.
 * 
 * This hook provides state management for the search input value, a buffer for temporary search input,
 * and a function to filter the provided data based on the current search value. It also includes an event handler
 * for the "Enter" key to submit the search input.
 *
 * @returns {{
 *   searchValue: string,              // The current value of the search input.
 *   setSearchValue: (value: string) => void, // Function to update the search value.
 *   buffer: string,                   // Temporary value used for typing in the search input.
 *   setBuffer: (value: string) => void, // Function to update the buffer.
 *   handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, // Event handler for the "Enter" key press.
 *   filteredData: <T>(data: T[] | undefined, filter: (items: T[], s: string) => T[]) => T[] // Function to filter the data based on search value.
 * }}
 */
function useSearch() {
  const [searchValue, setSearchValue] = useState(""); // State to store the search input value
  const [buffer, setBuffer] = useState(""); // Temporary buffer for the search input

  /**
   * Function to filter the data based on the current search value.
   * It checks if the `searchValue` is empty, in which case all data is returned.
   * If there is a `searchValue`, the provided filter function is applied to the data.
   *
   * @param {T[]} data - The data array to filter.
   * @param {(items: T[], s: string) => T[]} filter - A filtering function that applies the filter logic.
   * @returns {T[]} - The filtered data array based on the search value.
   */
  const filteredData = <T,>(data: T[] | undefined, filter: (items: T[], s: string) => T[]): T[] => {
    if (!data) return []; // Return an empty array if data is undefined
    if (searchValue.trim() === "") return data; // If search value is empty, return all data
    return filter(data, searchValue); // Apply the filter function to the data
  };

  /**
   * Event handler for keydown events in the search input field.
   * It listens for the "Enter" key press and updates the search value
   * with the value from the `buffer` when "Enter" is pressed.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event triggered by the key press.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(buffer); // Update the search value when "Enter" is pressed
    }
  };

  return {
    searchValue, // The current value of the search input
    setSearchValue, // Function to update the search value
    buffer, // Temporary value used for search input
    setBuffer, // Function to update the buffer
    handleKeyDown, // Function to handle keydown events, particularly "Enter"
    filteredData, // Function to filter the data based on search value
  };
}

export default useSearch;
