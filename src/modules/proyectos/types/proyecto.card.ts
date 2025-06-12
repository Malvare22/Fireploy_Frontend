import { EstadoEjecucionProyecto } from "./proyecto.tipo";
import { UsuarioCurso } from "@modules/materias/types/curso";

/**
 * RepositoryForCard type – defines the structure for repository data associated with a project card.
 * It includes the repository URL and the technology or framework used.
 * 
 * @type
 * 
 * @property url The full URL to the source code repository.
 * @property framework The name of the technology or framework used in this repository.
 */
export type RepositoryForCard = {
  url: string;
  framework: string;
};

/**
 * ProyectoCard type – represents a project summary card, including project metadata,
 * user participants, source code repositories, and execution status.
 * 
 * @type
 * 
 * @property id A numeric identifier uniquely identifying the project.
 * @property titulo The title of the project.
 * @property descripcion A brief description or summary of the project's purpose.
 * @property imagen Optional URL or path to the main project image; can be null.
 * @property integrantes A list of user objects representing team members involved in the project.
 * @property frontend Optional object containing frontend repository information; can be omitted.
 * @property backend Optional object containing backend repository information; can be omitted.
 * @property integrado Optional object containing integrated repository information; can be omitted.
 * @property dataBase Optional string indicating the name or type of database used; can be null.
 * @property fav_usuarios An array of user IDs who have marked this project as a favorite.
 * @property materia Optional name of the subject or course to which this project belongs.
 * @property grupo The group identifier or code associated with this project.
 * @property estado The current execution status of the project (e.g., not started, in progress, completed).
 * @property url Optional URL for accessing the deployed project; can be null.
 * @property puntuacion A numeric score representing the evaluation or rating of the project.
 */
export type ProyectoCard = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  integrantes: UsuarioCurso[];
  frontend?: RepositoryForCard | undefined;
  backend?: RepositoryForCard | undefined;
  integrado?: RepositoryForCard | undefined;
  dataBase?: string | null | undefined;
  fav_usuarios: number[];
  materia: string | null;
  grupo: string;
  estado: EstadoEjecucionProyecto;
  url: string | null;
  puntuacion: number;
};
