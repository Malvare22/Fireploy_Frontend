import { useState } from "react";

/**
 * useScore hook – manages a numerical score state with optional initial value.
 * 
 * Returns a score value and a setter function. If no initial value is provided,
 * the score defaults to `null`.
 * 
 * @hook
 * 
 * @param {number} [initialValue] - Optional initial score value.
 * 
 * @returns {Object} An object containing the current score and a setter function.
 * @returns {number | null} value - The current score value or `null` if not set.
 * @returns {Function} setValue - Function to update the score value.
 * 
 * @example
 * ```tsx
 * const { value, setValue } = useScore(5);
 * setValue(10);
 * ```
 */
function useScore(initialValue?: number) {
  const [value, setValue] = useState<number | null>(!initialValue ? null : initialValue);

  return {
    value,
    setValue,
  };
}

export default useScore;
