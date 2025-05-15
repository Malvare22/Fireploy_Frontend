import { patchData } from "@core/services";
import { ProyectoRepositoriesSchema } from "../utils/forms/proyecto.schema";
import { transformStringToKV, VariablesDeEntorno } from "@modules/general/utils/string";
import { Repositorio } from "../types/repositorio";
import { TECNOLOGIES } from "../utils/docker";

type Body = {
  url: string;
  tecnologia: string | null;
  version: string | null;
  framework: string | null;
  variables_de_entorno: VariablesDeEntorno[] | null;
};

/**
 * query function – Sends a PATCH request to update the details of a single repository.
 *
 * This function constructs the request body for updating the repository details
 * and sends the request to the API to modify the repository data.
 *
 * @param {Repositorio} repository - The repository to update.
 * @param {string} token - The authentication token for the session.
 *
 * @returns {Promise<unknown>} A promise that resolves with the response from the PATCH request.
 */
async function query(repository: Repositorio, token: string) {
  const t = transformStringToKV(repository.variables ?? "");

  const tecnologia = repository.informacion?.tecnologia ?? null;
  const version = repository.informacion?.version ?? null;
  const framework = repository.informacion?.framework ?? null;

  const findMe = (s: string | null) => {
    return Object.keys(TECNOLOGIES)[Object.values(TECNOLOGIES).indexOf(s as TECNOLOGIES)];
  };

    console.log(findMe(tecnologia), findMe(framework));


  const body: Body = {
    tecnologia: findMe(tecnologia),
    url: repository.url,
    version: version,
    framework: findMe(framework),
    variables_de_entorno: t == undefined || repository.variables == "" ? null : t,
  };

  return await patchData<unknown>(`/repositorio/${repository.id}`, body, {
    sessiontoken: token,
  });
}

/**
 * patchEditRepository function (overload 1) – Updates the repositories for a project.
 *
 * This overload of the function accepts a single repository object and sends a PATCH request
 * to the API to update the repository details.
 *
 * @param {string} token - The authentication token for the session.
 * @param {Repositorio} repository - The repository object to update.
 *
 * @returns {Promise<unknown>} A promise that resolves with the response from the PATCH request.
 */
export function patchEditRepository(
  token: string,
  repositories: ProyectoRepositoriesSchema
): Promise<unknown[]>;

/**
 * patchEditRepository function (overload 2) – Updates multiple repositories for a project.
 *
 * This overload of the function accepts an array of repository objects (e.g., "backend", "frontend", "integrado")
 * and sends individual PATCH requests for each repository to update their details.
 *
 * @param {string} token - The authentication token for the session.
 * @param {ProyectoRepositoriesSchema} repositories - The repository schema object containing multiple repositories to update.
 *
 * @returns {Promise<unknown[]>} A promise that resolves with the array of responses from the PATCH requests.
 *
 * @example
 * const updatedRepositories = await patchEditRepository(token, repositories);
 * console.log('Repositories updated:', updatedRepositories);
 */
export function patchEditRepository(token: string, repository: Repositorio): Promise<unknown>;

/**
 * patchEditRepository function – Overloaded function to handle both single repository and multiple repositories update.
 *
 * This function updates repositories for a project either as a single repository or multiple repositories.
 * It sends individual PATCH requests for each repository object.
 *
 * @param {string} token - The authentication token for the session.
 * @param {Repositorio | ProyectoRepositoriesSchema} repoOrRepos - A single repository object or a schema object containing multiple repositories to update.
 *
 * @returns {Promise<unknown | unknown[]>} A promise that resolves with the response from the PATCH request or an array of responses.
 *
 * @example
 * const updatedRepository = await patchEditRepository(token, repository);
 * const updatedRepositories = await patchEditRepository(token, repositories);
 * console.log('Repository updated:', updatedRepository);
 * console.log('Repositories updated:', updatedRepositories);
 */
export async function patchEditRepository(
  token: string,
  repoOrRepos: ProyectoRepositoriesSchema | Repositorio
): Promise<unknown | unknown[]> {
  const allowedKeys: (keyof ProyectoRepositoriesSchema)[] = ["backend", "frontend", "integrado"];

  if ("variables" in repoOrRepos) {
    return await query(repoOrRepos, token);
  }

  const validEntries = Object.entries(repoOrRepos).filter(([key, value]) => {
    return allowedKeys.includes(key as keyof ProyectoRepositoriesSchema) && value;
  });

  const promises = validEntries.map(async ([_key, value]) => {
    return await query(value, token);
  });

  return await Promise.all(promises);
}
