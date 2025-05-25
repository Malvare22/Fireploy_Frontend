export type VariablesDeEntorno = {
  clave: string;
  valor: string;
};

/**
 * Transforms a multi-line string into an array of key-value pairs (`VariablesDeEntorno`).
 * Each line must be in the format `KEY=VALUE`. It trims whitespace and handles values containing '='.
 * Invalid lines (missing key/value or containing spaces) will cause the function to return undefined.
 *
 * @function
 * @param {string} s - Multiline string with environment variable definitions.
 * @returns {VariablesDeEntorno[]} Array of parsed key-value pairs or undefined if any line is invalid.
 */
export function transformStringToKV(s: string): VariablesDeEntorno[] {
  const f = (s: string): VariablesDeEntorno => {
    let varName = '';
    let j = 0;
    for (let i = 0; i < s.length; ++i) {
      if (s[i] == '=') {
        j = i;
        break;
      };

      varName += s[i];
    }

    let varValue: string;
    varValue = s.slice(j + 1, s.length).trim();

    return {
      clave: varName.trim(),
      valor: varValue
    }
  };

  const result = s
    .split("\n")
    .map((linea) => {
      const trimmed = linea.trim();

      if (!trimmed) return { clave: "", valor: "" };

      return f(linea);
    })

  return result.filter(({ clave, valor }) => clave != '' && valor != '');
}

export function capitalizeOnlyFirstLetter(s: string) {
  const copyS = s.toLowerCase();
  return String(copyS).charAt(0).toUpperCase() + String(copyS).slice(1);
}
