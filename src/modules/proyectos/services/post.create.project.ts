import { postData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface Body {
  titulo: string;
  descripcion: string;
  seccionId: number;
  tipo_proyecto: "S" | "M";
  // tipo_proyecto: string;
  // base_de_datos: {
  //   nombre: string;
  //   contrasenia: string;
  //   tipo: string;
  // };
}

export async function postCreateProject(token: string, project: ProyectoInformationSchema) {
  const body: Body = {
    titulo: project.titulo,
    descripcion: project.descripcion,
    seccionId: project.materiaInformacion.seccionId,
    tipo_proyecto: project.tipo == "D" ? "S" : "M",
  };
  const response = await postData<{id: number}>(`/proyecto`, body, {
    sessiontoken: token,
  });

  return response;
}
