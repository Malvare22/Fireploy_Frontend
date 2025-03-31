import { BaseDeDatos } from "../types/baseDeDatos";

export function getNoRepeatValuesBasesDeDatos(
  repos: BaseDeDatos[],
  key: keyof BaseDeDatos
): Set<string> {
  const set = new Set<string>();
  repos.forEach((element) => {
    set.add(element[key] as string);
  });
  return set;
}
