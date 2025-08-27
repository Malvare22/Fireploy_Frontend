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

export function getSemestreActual() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth() + 1; // getMonth() devuelve 0-11

  // Primer semestre: enero (1) a junio (6)
  // Segundo semestre: julio (7) a diciembre (12)
  const semestre = mes <= 6 ? 1 : 2;

  return `${anio}-${semestre}`;
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

/**
 * Sorts two date strings chronologically.
 *
 * @param {string} a - The first date string in a parseable format (e.g. 'YYYY-MM-DD').
 * @param {string} b - The second date string in a parseable format.
 * @returns {number} A negative number if `a` is earlier than `b`, positive if `a` is later, 0 if equal.
 */
export function sortDates(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}

/**
 * Formats a datetime string into a human-readable format 'YYYY-MM-DD HH:mm:ss'.
 *
 * @param {string} a - The datetime string in ISO 8601 format (e.g., '2025-06-12T14:30:00.000Z').
 * @returns {string} A string containing only the date and time up to seconds.
 *
 * @example
 * ```ts
 * getFormatDayTime('2025-06-12T14:30:00.000Z'); // returns '2025-06-12 14:30:00'
 * ```
 */
export function getFormatDayTime(a: string) {
  const aux = a.split('T');

  return aux[0] + ' ' + aux[1].slice(0, 8);
}

/**
 * Calculates the age in years from a given birthdate string.
 *
 * @param {string} date - The birthdate string in a format parsable by `Date`.
 * @returns {number} The calculated age in full years.
 *
 * @example
 * ```ts
 * calculateAge("2000-01-01"); // returns age based on current date
 * ```
 */
export function calculateAge(date: string) {
  const currentDate = new Date(date);
  var ageDifMs = Date.now() - currentDate.getTime();
  var diff = new Date(ageDifMs);
  return Math.abs(diff.getUTCFullYear() - 1970);
}