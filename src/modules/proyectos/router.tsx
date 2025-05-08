import { RouteObject } from "react-router-dom";
import ExplorarProyectos from "./pages/explorar";
import CrearProyecto from "./pages/crear";
import VerProyecto from "./pages/ver";
import VistaBasesDeDatos from "./pages/basesDeDatos";
import ListarProyectos from "./pages/listar";
import MisProyectos from "./pages/misProyectos";

/**
 * Base route for project-related pages.
 * This is the root path for the project section.
 */
const rutaBase = "/app/proyectos";

/**
 * Object containing all the routes for the project pages.
 * 
 * Each property in this object is a route path that corresponds to a specific page or feature of the projects section.
 * - menu: Path for listing projects.
 * - misProyectos: Path for viewing the user's own projects.
 * - ver: Path for viewing a specific project by its ID.
 * - crear: Path for creating a new project.
 * - explorar: Path for exploring all projects.
 * - repositorios: (Commented-out route) Path for viewing repositories.
 * - basesDeDatos: Path for viewing databases associated with projects.
 */
export const rutasProyectos = {
  menu: rutaBase + "/menu",
  misProyectos: rutaBase + '/misProyectos',
  ver: rutaBase + "/ver/:id",
  crear: rutaBase + "/crear",
  explorar: rutaBase + "/explorar",
  repositorios: rutaBase + "/repositorios",
  basesDeDatos: rutaBase + "/basesDeDatos",
};

/**
 * Array of route objects that define the routes and their corresponding components for the projects section.
 * 
 * Each object contains:
 * - path: The URL path for the route.
 * - element: The React component to be rendered for that route.
 * 
 * This array maps each route to its corresponding page component:
 * - VerProyecto: For viewing a project.
 * - ListarProyectos: For listing all projects.
 * - CrearProyecto: For creating a new project.
 * - ExplorarProyectos: For exploring projects.
 * - VistaBasesDeDatos: For viewing databases.
 * - MisProyectos: For viewing the user's own projects.
 */
export const routerProyectos: RouteObject[] = [

  {
    path: rutasProyectos.ver,
    element: <VerProyecto />,
  },
  {
    path: rutasProyectos.menu,
    element: <ListarProyectos />,
  },
  {
    path: rutasProyectos.crear,
    element: <CrearProyecto />,
  },
  {
    path: rutasProyectos.explorar,
    element: <ExplorarProyectos />,
  },
  // {
  //   path: rutasProyectos.repositorios,
  //   element: <VistaRepositorios />,
  // },
  {
    path: rutasProyectos.basesDeDatos,
    element: <VistaBasesDeDatos />,
  },
  {
    path: rutasProyectos.misProyectos,
    element: <MisProyectos />,
  },
];
