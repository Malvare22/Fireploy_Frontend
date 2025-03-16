import { postData } from "@core/services";
import { CursoService } from "../types/curso.service";
import { CursoModal } from "../utils/forms/schema.curso";

export const crearCursoService = async (
  token: string,
  data: CursoModal,
  materiaId: number,
  totalCursos: number
) => {
  const response = await postData<CursoService>(
    `/curso`,
    {
      estado: data.estado,
      semestre: data.semestre,
      materiaId: materiaId,
      descripcion: data.descripcion,
      grupo: String.fromCharCode(65 + totalCursos),
      docenteId: data.docente
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
