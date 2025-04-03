import { postData } from "@core/services";
import { Seccion } from "../types/seccion";
import { SeccionesService } from "../types/curso.service";

export const postCreateSeccion = async (token: string, seccion: Seccion) => {
  type Body = {
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: "A" | "I";
    cursoId: string;
  };

  const body: Body = {
    titulo: seccion.titulo,
    descripcion: seccion.descripcion,
    fecha_inicio: seccion.fechaDeInicio,
    fecha_fin: seccion.fechaDeCierre,
    estado: seccion.estado,
    cursoId: seccion.cursoId ?? "", // Asegura que tenga un valor
  };

  const response = await postData<SeccionesService>(`/seccion`, body, {
    sessiontoken: token,
  });

  return response;
};
