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
import { rutasMaterias } from "./routes";
import VistaProyectosDeMisEstudiantes from "../pages/proyectosMisEstudiantes";

/**
 * routerMaterias – Array of route configuration objects used to define 
 * the routing structure for the subject and course management module.
 * 
 * Each route maps a specific path to its corresponding page component.
 * These routes include functionality for exploring subjects, viewing and 
 * editing courses, listing and creating subjects, and managing student projects.
 * 
 * @constant
 * @type {Array} Array of route definitions following the RouteObject structure from React Router.
 * 
 * @example
 * ```tsx
 * import { useRoutes } from "react-router-dom";
 * const routes = useRoutes(routerMaterias);
 * ```
 * 
 * @see {@link rutasMaterias} for the list of available route paths.
 */
export const routerMaterias: RouteObject[] = [
  {
    path: rutasMaterias.explorar,
    element: <ExplorarMaterias />,
  },
  {
    path: rutasMaterias.listarMaterias,
    element: <ListarMaterias/>
  },
  {
    path: rutasMaterias.listarCursos,
    element: <ListarCursos/>
  },
  {
    path: rutasMaterias.listarMisCursos,
    element: <ListarMisCursos/>
  },
  {
    path: rutasMaterias.verCurso,
    element: <VerInformacionCurso />,
  },
  {
    path: rutasMaterias.editarCurso,
    element: <EditCourseView />,
  },
  {
    path: rutasMaterias.crearCurso,
    element: <CreateCourseView />,
  },
  {
    path: rutasMaterias.explorarCursos,
    element: <VerCursosMateria />,
  },
  {
    path: rutasMaterias.crearMateria,
    element: <VistaCrearMateria />,
  },
  {
    path: rutasMaterias.solicitudes,
    element: <VistaSolicitudes />,
  },
  {
    path: rutasMaterias.proyectosDeMisEstudiantes,
    element: <VistaProyectosDeMisEstudiantes/>
  }
 

];
