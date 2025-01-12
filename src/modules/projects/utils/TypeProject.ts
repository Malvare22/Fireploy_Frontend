export interface TypeProject {
  id: string; // Identificador único del proyecto
  titulo: string;
  estado: "online" | "offline" | "pausado" | "cargando" | "error";
  ultimaModificacion: string;
  tecnologias: { imagen: string; nombre: string }[];
  colaboradores: string[]; // IDs de usuarios colaboradores
  repositorioFrontend?: {
    url: string; // URL del repositorio frontend
    tecnologia: string; // Tecnología vinculada al frontend
  };
  repositorioBackend?: {
    url: string; // URL del repositorio backend
    tecnologia: string; // Tecnología vinculada al backend
  };
  tecnologiaRelacionada: string; // Tecnología principal asociada al proyecto
  variablesEntorno: { [clave: string]: string }; // Variables de entorno como clave-valor
  baseDeDatos: {
    url: string; // URL de la base de datos
    tipo: string; // Tipo de base de datos (MongoDB, SQL, etc.)
  };
}
