import { BaseDeDatos } from "../types/baseDeDatos";
import { DataBaseService } from "../types/dabase.service";

/**
 * adaptDataBase – Transforms a database service object into a full database object, including extracting fields like password, name, type, ID, project data, and URL.
 * 
 * @param {DataBaseService} dataBase - The database service data to transform.
 * @returns {BaseDeDatos} The full database object with all relevant details, including optional project data.
 */
export function adaptDataBase(dataBase: DataBaseService): BaseDeDatos {
  return {
    contrasenia: dataBase.contrasenia ?? "",
    nombre: dataBase.nombre ?? "",
    tipo: dataBase.tipo ?? "E",
    id: dataBase.id ?? -1,
    proyecto: dataBase.proyecto ? {
      estado_proyecto: dataBase.proyecto.estado_proyecto,
      titulo: dataBase.proyecto.titulo
    } : null,
    url: dataBase.url ?? "",
  };
}
