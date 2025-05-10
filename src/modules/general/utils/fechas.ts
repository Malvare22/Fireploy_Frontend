/**
 * Validates whether a given date string is not in the future.
 *
 * @param {string} fecha - A date string to validate.
 * @returns {boolean} True if the date is today or in the past, false if invalid or in the future.
 */
export const validDateWithCurrentDate = (fecha: string) => {
  try {
    const fechaTemporal = new Date(fecha);
    return fechaTemporal <= new Date();
  } catch (e) {
    return false;
  }
};

/**
 * Gets the current date formatted as 'YYYY-MM-DD'.
 *
 * @returns {string} The current date string in ISO format, trimmed to date only.
 */
export const getCurrentDate = () => {
  const fechaActual = new Date().toISOString().slice(0, 10);
  return fechaActual;
};

/**
 * Adapts a given date string to ensure it follows the 'YYYY-MM-DD' format
 * (in case it contains extra time information).
 *
 * @param {string} fecha - The date string to adapt.
 * @returns {string} A properly formatted 'YYYY-MM-DD' string.
 */
export const adaptDateBackend = (fecha: string) => {
  const _fecha = fecha.split("-");
  return `${_fecha[0]}-${_fecha[1]}-${_fecha[2].slice(0, 2)}`;
};

export function getSemestre() {
  return "2025-1";
}

/**
 * Evaluates whether a target date falls within a specified date range.
 *
 * This function checks if the third date is between the first and second date, inclusive.
 * All dates should be provided in the format "YYYY-MM-DD". It converts the string
 * representations into numeric values to perform the comparison.
 *
 * @function
 *
 * @param a - The start date of the range in "YYYY-MM-DD" format.
 * @param b - The end date of the range in "YYYY-MM-DD" format.
 * @param c - The target date to evaluate in "YYYY-MM-DD" format.
 *
 * @returns A boolean indicating whether the target date is within the range.
 *
 * @example
 * ```ts
 * evaluateDate("2023-01-01", "2023-12-31", "2023-06-15"); // returns true
 * evaluateDate("2023-01-01", "2023-12-31", "2024-01-01"); // returns false
 * ```
 */
export function evaluateDate(a: string, b: string, c: string) {
  let valueA = parseInt(a.split("-").join(""));
  let valueB = parseInt(b.split("-").join(""));
  let valueC = parseInt(c.split("-").join(""));

  return valueA <= valueC && valueC <= valueB;
}
