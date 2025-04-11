import { postData } from "@core/services";
import { BaseDeDatosSchema } from "../utils/forms/baseDeDatos.schema";

type Body = {
  nombre: string;
  contrasenia: string;
  tipo: string;
  proyecto_id: number;
};

export async function postCreateDatabase(token: string, database: BaseDeDatosSchema) {
  const body: Body = {
    nombre: database.nombre,
    contrasenia: database.contrasenia,
    proyecto_id: database.proyectoId ?? -1,
    tipo: database.tipo,
  };
  const response = await postData<unknown>(`/base-de-datos`, body, {
    sessiontoken: token,
  });

  return response;
}
