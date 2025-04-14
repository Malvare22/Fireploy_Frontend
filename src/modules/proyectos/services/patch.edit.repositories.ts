import { patchData } from "@core/services";
import { ProyectoRepositoriesSchema } from "../utils/forms/proyecto.schema";
import { transformStringToKV, VariablesDeEntorno } from "@modules/general/utils/string";
import { Repositorio } from "../types/repositorio";

type Body = {
  url: string;
  tecnologia: string | null;
  version: string | null;
  variables_de_entorno: VariablesDeEntorno[] | null;
};

async function query(repository: Repositorio, token: string) {
  const t = transformStringToKV(repository.variables);
  const body: Body = {
    tecnologia: repository.docker?.tecnologia ?? null,
    url: repository.url,
    version: repository.docker?.tag ?? null,
    variables_de_entorno: t == undefined || repository.variables == "" ? null : t,
  };

  return await patchData<unknown>(`/repositorio/${repository.id}`, body, {
    sessiontoken: token,
  });
}

export function patchEditRepository(
  token: string,
  repositories: ProyectoRepositoriesSchema
): Promise<unknown[]>;
export function patchEditRepository(token: string, repository: Repositorio): Promise<unknown>;

export async function patchEditRepository(
  token: string,
  repoOrRepos: ProyectoRepositoriesSchema | Repositorio
): Promise<unknown | unknown[]> {
  const allowedKeys: (keyof ProyectoRepositoriesSchema)[] = ["backend", "frontend", "integrado"];

  if ("id" in repoOrRepos) {
    return await query(repoOrRepos, token);
  }

  const validEntries = Object.entries(repoOrRepos).filter(
    ([key, value]) =>
      allowedKeys.includes(key as keyof ProyectoRepositoriesSchema) && value?.id !== -1
  );

  const promises = validEntries.map(async ([_key, value]) => {
    return await query(value, token);
  });

  return await Promise.all(promises);
}
