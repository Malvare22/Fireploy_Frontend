import { EstadoEjecucionProyecto } from "../types/proyecto.estadoEjecucion";

export const obtenerEstado: Record<EstadoEjecucionProyecto, string> = {
    F: "Offline",
    N: "Online",
    E: "Error",
    L: "Loading",
  };