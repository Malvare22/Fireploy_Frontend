import { TypeTecnologia } from "./typeTecnologia";

export interface TypeProyecto {
  id: number; // Identificador único del proyecto
  titulo: string;
  estado: "online" | "offline" | "pausado" | "cargando" | "error";
  ultimaModificacion: string;
  repositorioFrontend?: {
    id: number;
    url: string;
  };
  repositorioBackend: {
    id: number;
    url: string;
  };
  variablesEntorno: { [clave: string]: string }; // Variables de entorno como clave-valor
  baseDeDatos: {
    id: number;
    url: string;
  };
  colaboradores: { id: number; nombre: string }[];
}
