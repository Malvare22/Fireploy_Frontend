export interface TypeProyecto {
  id: number; // Identificador único del proyecto
  titulo: string;
  estado: "online" | "offline" | "pausado" | "cargando" | "error";
  ultimaModificacion: string;
  repositorioFrontend?: {
    url: string; // URL del repositorio frontend
    tecnologia: number; // Tecnología vinculada al frontend
  };
  repositorioBackend?: {
    url: string; // URL del repositorio backend
    tecnologia: number; // Tecnología vinculada al backend
  };
  variablesEntorno: { [clave: string]: string }; // Variables de entorno como clave-valor
  baseDeDatos: {
    url: string; // URL de la base de datos
    tipo: string; // Tipo de base de datos (MongoDB, SQL, etc.)
  };
  colaboradores: { id: number; nombre: string }[];
}
