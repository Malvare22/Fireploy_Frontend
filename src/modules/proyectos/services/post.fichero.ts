import axios from "axios";
import { Fichero } from "../types/fichero";


export async function postFichero(
  token: string,
  fichero: Fichero,
  repositoryId: number
): Promise<unknown | unknown[]> {
  if (!fichero.contenido) return;
  const body = new FormData();
  body.append("contenido", fichero.contenido);
  body.append("nombre", fichero.nombre);
  body.append("repositorio", repositoryId.toString());
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/ficheros`,

    headers: {
      sessiontoken: token,
    },
    data: body,
  }).then((response: unknown) => response);

  return response;
}

export async function deleteFichero(
  token: string,
  ficheroId: number
): Promise<unknown | unknown[]> {

  const response = await axios({
    method: "delete",
    url: `${import.meta.env.VITE_URL_BACKEND}/ficheros/${ficheroId}`,
    headers: {
      sessiontoken: token,
    },
  }).then((response: unknown) => response);

  return response;
}