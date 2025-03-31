import { Repositorio } from "../types/repositorio";

export function getNoRepeatValuesRepositorios(
  repos: Repositorio[],
  key: keyof Repositorio
): Set<string> {
  const set = new Set<string>();
  repos.forEach((element) => {
    set.add(element[key] as string);
  });
  return set;
}
