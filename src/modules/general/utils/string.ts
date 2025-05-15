export type VariablesDeEntorno = {
  clave: string;
  valor: string;
};

/**
 * Checks if the string contains internal spaces after leading ones.
 * For example, returns true for `"HELLO WORLD"` and false for `"   VALUE"`.
 *
 * @param {string} s - The input string to check.
 * @returns {boolean} True if a space is found after non-space characters.
 */
function spacesBetween(s: string): boolean {
  let flag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " " && flag) return true;
    if (s[i] !== " ") flag = true;
  }
  return false;
}

/**
 * Transforms a multi-line string into an array of key-value pairs (`VariablesDeEntorno`).
 * Each line must be in the format `KEY=VALUE`. It trims whitespace and handles values containing '='.
 * Invalid lines (missing key/value or containing spaces) will cause the function to return undefined.
 *
 * @function
 * @param {string} s - Multiline string with environment variable definitions.
 * @returns {VariablesDeEntorno[] | undefined} Array of parsed key-value pairs or undefined if any line is invalid.
 */
export function transformStringToKV(s: string): VariablesDeEntorno[] | undefined {
  let isInvalid = false;

  const result = s
    .split("\n")
    .map((linea) => {
      const trimmed = linea.trim();

      if (!trimmed) return { clave: "", valor: "" }; // Optional: empty line

      const parts = trimmed.split("=");

      if (
        parts.length < 2 ||
        !parts[0].trim() ||
        spacesBetween(parts[0].trim()) ||
        !parts[1].trim() ||
        spacesBetween(parts[1].trim())
      ) {
        isInvalid = true;
        return { clave: "", valor: "" };
      }

      const clave = parts[0].trim();
      const valor = parts.slice(1).join("=").trim(); // Handles '=' in value

      return { clave, valor };
    })
    .filter(({ clave, valor }) => clave !== "" || valor !== "");

  if (isInvalid) return undefined;
  return result;
}

export function capitalizeOnlyFirstLetter(s: string) {
  const copyS = s.toLowerCase();
  return String(copyS).charAt(0).toUpperCase() + String(copyS).slice(1);
}
