import { RouteObject } from "react-router-dom";
import VerInformacionCurso from "../pages/explorar/grupos/id";
import ExplorarMaterias from "../pages/explorar";
import VerCursosMateria from "../pages/explorar/grupos";
import ListarMaterias from "../pages/listarMaterias";
import ListarCursos from "../pages/listarCursos";
import VistaCrearMateria from "../pages/crearMateria";
import EditCourseView from "../pages/editarCurso";
import CreateCourseView from "../pages/crearCurso";
import ListarMisCursos from "../pages/misCursos";
import VistaSolicitudes from "../pages/vistaSolicitudes";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  //verInformacionCursos = rutaBase + "/:id",
  listarMaterias = rutaBase + "/listar",
  listarCursos = rutaBase + '/:idMateria/cursos/listar',
  listarMisCursos = rutaBase + '/misCursos',
  verCurso = rutaBase + "/cursos/:idCurso",
  crearCurso = rutaBase + "/cursos/crear/:idMateria",
  editarCurso = rutaBase + "/cursos/editar/:idCurso",
  crearMateria = rutaBase + '/crear',
  editarMateria = rutaBase + '/editar/:idMateria',
  explorarCursos = rutaBase + '/explorar/:idMateria/cursos',
  solicitudes = rutaBase + '/solicitudes'
}

/**
 * Routing configuration for the "Materias" section of the application.
 *
 * This configuration defines the routes for all pages related to courses, subjects, and requests in the application.
 * The routes include pages for exploring subjects, listing courses, viewing and editing courses, creating new subjects and courses, and viewing promotion requests.
 * 
 * The `rutaBase` variable defines the base URL path for all routes in this section. The `rutasMaterias` enum holds the individual route paths,
 * which are then used in the `routerMaterias` array to map each route to its corresponding component.
 *
 * @module
 * 
 * @constant {string} rutaBase - The base URL path for all routes related to courses and subjects.
 * 
 * @enum {string} rutasMaterias - Enum containing the route paths for different sections in the "Materias" module:
 * - explorar: Route for the exploring page.
 * - listarMaterias: Route for listing subjects.
 * - listarCursos: Route for listing courses for a specific subject.
 * - listarMisCursos: Route for listing the current user's courses.
 * - verCurso: Route for viewing details of a specific course.
 * - crearCurso: Route for creating a new course.
 * - editarCurso: Route for editing an existing course.
 * - explorarCursos: Route for exploring courses within a subject.
 * - crearMateria: Route for creating a new subject.
 * - editarMateria: Route for editing an existing subject.
 * - solicitudes: Route for viewing promotion requests.
 * 
 * @constant {RouteObject[]} routerMaterias - Array of route objects, each defining a path and the corresponding component for that route.
 * 
 * @example
 * ```tsx
 * const routes = routerMaterias; // Use this array in your routing configuration (e.g., with React Router)
 * ```
 */
export const routerMaterias: RouteObject[] = [
  {
    path: rutasMaterias.explorar,
    element: <ExplorarMaterias />,
  },
  // {
  //   path: rutasMaterias.listarMaterias,
  //   element: <ListarMaterias/>
  // },
  // {
  //   path: rutasMaterias.listarCursos,
  //   element: <ListarCursos/>
  // },
  // {
  //   path: rutasMaterias.listarMisCursos,
  //   element: <ListarMisCursos/>
  // },
  // {
  //   path: rutasMaterias.verCurso,
  //   element: <VerInformacionCurso />,
  // },
  // {
  //   path: rutasMaterias.editarCurso,
  //   element: <EditCourseView />,
  // },
  // {
  //   path: rutasMaterias.crearCurso,
  //   element: <CreateCourseView />,
  // },
  // {
  //   path: rutasMaterias.explorarCursos,
  //   element: <VerCursosMateria />,
  // },
  // {
  //   path: rutasMaterias.crearMateria,
  //   element: <VistaCrearMateria />,
  // },
  // {
  //   path: rutasMaterias.solicitudes,
  //   element: <VistaSolicitudes />,
  // },
 

];
