import { CursoService, SeccionesService } from "@modules/materias/types/curso.service";
import { MateriaService } from "@modules/materias/types/materia.service";
import { DataBaseService } from "./dabase.service";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { FicheroService } from "./fichero";

/**
 * ProyectoService – Represents the structure of a project as used in service or API layers.
 * 
 * This type contains detailed metadata about the project, including its state, participants,
 * academic context, associated repositories, and ownership.
 * 
 * @property {number} id - The unique identifier of the project.
 * @property {string} titulo - The name or title of the project.
 * @property {string or null} descripcion - A short description of the project, or null if not provided.
 * @property {Array of objects} fav_usuarios - A list of users who favorited the project, including their ID, name, and active state.
 * @property {string} url - The deployment or access URL of the project.
 * @property {string or null} imagen - A URL string for the project's image, or null if none.
 * @property {string} estado_proyecto - The current status of the project (e.g., active, archived).
 * @property {string} estado_ejecucion - The execution status of the project (e.g., ongoing, completed).
 * @property {number} puerto - The network port the project runs on.
 * @property {string} fecha_creacion - The creation date of the project in ISO string format.
 * @property {string} tipo_proyecto - The category or type of the project (e.g., academic, personal).
 * @property {Array of UsuarioCurso} estudiantes - The list of student users involved in the project.
 * @property {object or undefined} [seccion] - Optional academic section data, including course and subject details.
 * @property {UsuarioCurso} tutor - The user who acts as the tutor or advisor for the project.
 * @property {Array of RepositorioService} repositorios - A list of repositories associated with the project.
 * @property {DataBaseService} base_de_datos - The database configuration or details used by the project.
 * @property {UsuarioCurso} creador - The user who created or registered the project.
 */
export type ProyectoService = {
  id: number;
  titulo: string;
  descripcion: string | null;
  fav_usuarios: {
    estado: "A" | "I";
    id: number;
    nombre: string;
  }[];
  url: string;
  imagen: string | null;
  estado_proyecto: string;
  estado_ejecucion: string;
  puerto: number;
  fecha_creacion: string;
  tipo_proyecto: string;
  estudiantes: Pick<UsuarioService, 'nombre' | 'apellido' | 'foto_perfil' | 'id' | 'estado'>[];
  seccion?: SeccionesService & { curso: CursoService & { materia: MateriaService } };
  tutor: UsuarioCurso;
  repositorios: RepositorioService[];
  base_de_datos: DataBaseService;
  creador: Pick<UsuarioService, 'nombre' | 'apellido' | 'foto_perfil' | 'id' | 'estado'>;
};

/**
 * RepositorioService – Describes a code repository linked to a project.
 * 
 * Each repository entry includes metadata such as type, technology stack,
 * and optional technical details like environment variables or framework.
 * 
 * @property {Partial of ProyectoService} proyecto - A partial reference to the project this repository belongs to.
 * @property {number} id - The unique identifier of the repository.
 * @property {string or null} url - The URL of the repository, or null if not available.
 * @property {string} tipo - The type of the repository (e.g., frontend, backend, integrated).
 * @property {string or null} tecnologia - The main technology used in the repository, or null if unspecified.
 * @property {string or null} variables_de_entorno - Environment variables used in the repository, or null.
 * @property {string or null} framework - The framework used in the repository, or null.
 */
export type RepositorioService = {
  proyecto: Partial<ProyectoService>;
  id: number;
  url: string | null;
  tipo: string;
  tecnologia: string | null;
  variables_de_entorno: string | null;
  framework: string | null;
  ficheros?: FicheroService[]
};
