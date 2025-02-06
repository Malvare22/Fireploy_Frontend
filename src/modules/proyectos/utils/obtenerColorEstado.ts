import { theme } from "@core/themes";
import { EstadoEjecucionProyecto } from "../types/proyecto.estadoEjecucion";

export const obtenerColorEstado = (status: EstadoEjecucionProyecto): string => {
  switch (status) {
    case "F":
      return theme.palette.customGrey.main;
    case "N":
      return theme.palette.success.main;
    case "L":
      return theme.palette.customGrey.main;
    case "E":
      return theme.palette.error.main;
  }
};
