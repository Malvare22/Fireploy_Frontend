import { Fichero } from "./fichero";
import { LogFileService } from "./logFile.service";

/**
 * Repositorio type – represents a code repository associated with a project.
 * Includes metadata such as type, URL, technology information, environment variables, and logs.
 * 
 * @type
 * 
 * @property id Optional numeric identifier for the repository.
 * @property proyecto Optional identifier or reference to the associated project.
 * @property url The URL of the repository (e.g., GitHub or GitLab link).
 * @property tipo Indicates the repository type: "B" for backend, "F" for frontend, or "I" for integrated.
 * @property variables A string containing the environment variables used in the repository.
 * @property informacion Optional object with technology and framework names used in the repository.
 * @property logs Optional list of log objects related to this repository; can be null.
 * @property file Optional flag indicating if this repository includes attached files.
 * @property ficheros Optional array of file objects associated with the repository.
 */
export type Repositorio = {
  id?: number | undefined;
  proyecto?: string;
  url: string;
  tipo: "B" | "F" | "I";
  variables: string;
  informacion?: { tecnologia: string | null; framework: string | null };
  logs?: null | LogFileService[];
  file?: boolean | null | undefined;
  ficheros?: Fichero[]
};

/**
 * VariableDeEntorno type – represents a single environment variable used in a project or repository.
 * 
 * @type
 * 
 * @property clave The name or key of the environment variable.
 * @property valor The assigned value for the environment variable.
 */
export type VariableDeEntorno = {
  clave: string;
  valor: string;
};
