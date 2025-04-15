export type VariablesDeEntorno = {
  clave: string;
  valor: string;
};

function spacesBetween(s: string) {
  let flag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == " " && flag) return true;
    if (s[i] != " ") flag = true;
  }
  return false;
}

export function transformStringToKV(s: string): VariablesDeEntorno[] | undefined {
  let isInvalid = false;
  console.log('Fijate',s)

  const result = s
    .split("\n")
    .map((linea) => {
      const trimmed = linea.trim();

      if (!trimmed) return { clave: "", valor: "" }; // Línea vacía (opcional: podrías omitirla)

      const parts = trimmed.split("=");

      // 🔥 Verifica que existan al menos dos partes
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
      const valor = parts.slice(1).join("=").trim(); // En caso de que haya `=` en el valor

      return { clave, valor };
    })
    .filter(({ clave, valor }) => clave !== "" || valor !== ""); // eliminar vacíos (opcional)

  if (isInvalid) return undefined;
  return result;
}
