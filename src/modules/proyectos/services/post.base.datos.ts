import { postData } from "@core/services";
import { BaseDeDatosSchema } from "../utils/forms/baseDeDatos.schema";

type Body = {
  nombre: string;
  contrasenia: string;
  tipo: string;
  proyecto_id: number;
};

/**
 * Creates a new database entry by sending a POST request to the server.
 * 
 * This function takes a token for authentication and a `BaseDeDatosSchema` object, which contains
 * the details required for creating a database. It sends the data as a POST request to the server
 * and returns the server's response.
 * 
 * @param {string} token - The session token used for authentication in the request header.
 * @param {BaseDeDatosSchema} database - The database schema object containing the details to create the database.
 * 
 * @returns {Promise<unknown>} A promise that resolves to the server's response.
 * 
 * @example
 * ```ts
 * const response = await postCreateDatabase(token, {
 *   nombre: "MyDatabase",
 *   contrasenia: "securePassword123",
 *   tipo: "SQL",
 *   proyectoId: 5
 * });
 * ```
 */
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
