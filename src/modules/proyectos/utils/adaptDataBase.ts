import { BaseDeDatos } from "../types/baseDeDatos";
import { DataBaseService } from "../types/dabase.service";

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
