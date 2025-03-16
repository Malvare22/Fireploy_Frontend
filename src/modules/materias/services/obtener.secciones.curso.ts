import { getData } from "@core/services";
import { EstadoMateria } from "../types/materia.estado";
import { SeccionService } from "../types/seccion.services";

type ObtenerSeccionesPorCursoHeaders = {
    estado?: EstadoMateria,
    curso: string
};

export const obtenerSeccionesPorCurso = async (token: string, headers: ObtenerSeccionesPorCursoHeaders) => {
  const response = await getData<SeccionService[]>(
    `/seccion`,
    headers,
    {
      sessiontoken: token,
    }
  );

  return response;
};
