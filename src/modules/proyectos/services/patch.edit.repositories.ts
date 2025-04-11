import { patchData } from "@core/services";
import { ProyectoRepositoriesSchema } from "../utils/forms/proyecto.schema";

type Body = {
  url: string;
  tecnologia: string | null;
  version: string | null;
  variables_de_entorno?: VariablesDeEntorno[];
};

type VariablesDeEntorno = {
  clave: string;
  valor: string;
};

export function adaptStringToKV(s: string): VariablesDeEntorno[] {
  return s.split("\n").map((_s) => {
    const [clave, valor] = _s.split(":");
    return { clave, valor };
  });
}

const allowedKeys: (keyof ProyectoRepositoriesSchema)[] = ["backend", "frontend", "integrado"];

export async function patchEditRepository(token: string, repositories: ProyectoRepositoriesSchema) {
  const validEntries = Object.entries(repositories).filter(
    ([key, value]) =>
      allowedKeys.includes(key as keyof ProyectoRepositoriesSchema) && value?.id !== -1
  );
  console.log("valid ", validEntries);

  const promises = validEntries.map(async ([_key, value]) => {
    const body: Body = {
      tecnologia: value.docker?.tecnologia ?? null,
      url: value.url,
      version: value.docker?.tag ?? null,
    };

    return await patchData<unknown>(`/repositorio/${value.id}`, body, {
      sessiontoken: token,
    });
  });

  const responses = await Promise.all(promises);
  return responses;
}
