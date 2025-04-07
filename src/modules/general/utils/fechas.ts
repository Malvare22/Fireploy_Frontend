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
