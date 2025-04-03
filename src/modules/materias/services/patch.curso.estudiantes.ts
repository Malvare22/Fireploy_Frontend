import { patchData } from "@core/services";
import { CursoService } from "../types/curso.service";

export const patchEstudiantesCurso = async (
  token: string,
  data: number[],
  operacion: 'A' | 'D',
  idCurso: string
) => {
  const response = await patchData<CursoService>(
    `/curso/alumnos/${idCurso}`,
    {
      "estudiantes": data,
      "operacion": operacion
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};