import { Repositorio } from "../types/repositorio";

export function getNoRepeatValuesRepositorios<T>(
  repos: Repositorio[],
  getValue: (repo: Repositorio) => T
): Set<T> {
  const set = new Set<T>();
  repos.forEach((repo) => {
    const value = getValue(repo);
    if (value !== undefined && value !== null) {
      set.add(value);
    }
  });
  return set;
}
