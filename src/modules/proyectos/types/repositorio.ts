import { LogFileService } from "./logFile.service";

/**
 * Repositorio – Defines a project repository with its URL, type ("B" = Backend, "F" = Frontend, "I" = Integrated), environment variables, optional Docker metadata (technology, version, framework), and an optional display name for the technology.
 */
export type Repositorio = {
  id?: number | undefined;
  proyecto?: string;
  url: string;
  tipo: "B" | "F" | "I";
  variables: string;
  informacion?: { tecnologia: string | null; framework: string | null; };
  logs?: null | LogFileService[]
};

/**
 * VariableDeEntorno – Represents a key-value pair used as an environment variable for configuration purposes.
 */
export type VariableDeEntorno = {
  clave: string;
  valor: string;
};
