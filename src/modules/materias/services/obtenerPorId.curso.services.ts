import { getData } from "@core/services";
import { CursoService } from "../types/curso.service";

export const obtenerCursoPorIdService = async (token: string, id: string) => {
  const response = await getData<CursoService>(
    `/curso/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const obtenerMultiplesCursoPorIdService = async (
  token: string,
  id: string[]
) => {
  const _cursos: CursoService[] = [];

  for (let i = 0; i < id.length; i++) {
    const response = await getData<CursoService>(
      `/curso/${id[i]}`,
      {},
      {
        sessiontoken: token,
      }
    );

    if (response.error) return undefined;
    if (response.data) _cursos.push(response.data);
  }

  return _cursos;
};
