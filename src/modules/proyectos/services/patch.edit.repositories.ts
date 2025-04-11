import { patchData } from "@core/services";
import { ProyectoRepositoriesSchema } from "../utils/forms/proyecto.schema";
import { transformStringToKV, VariablesDeEntorno } from "@modules/general/utils/string";

type Body = {
  url: string;
  tecnologia: string | null;
  version: string | null;
  variables_de_entorno: VariablesDeEntorno[] | null;
};

const allowedKeys: (keyof ProyectoRepositoriesSchema)[] = ["backend", "frontend", "integrado"];
export async function patchEditRepository(token: string, repositories: ProyectoRepositoriesSchema) {
  const validEntries = Object.entries(repositories).filter(
    ([key, value]) =>
      allowedKeys.includes(key as keyof ProyectoRepositoriesSchema) && value?.id !== -1
  );
  const promises = validEntries.map(async ([_key, value]) => {
    const t = transformStringToKV(value.variables);
    console.log(t, t == undefined || value.variables == '')
    const body: Body = {
      tecnologia: value.docker?.tecnologia ?? null,
      url: value.url,
      version: value.docker?.tag ?? null,
      variables_de_entorno: t == undefined || value.variables == '' ? null : t
    };

    return await patchData<unknown>(`/repositorio/${value.id}`, body, {
      sessiontoken: token,
    });
  });

  const responses = await Promise.all(promises);
  return responses;
}
