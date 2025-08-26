import { RouteObject } from "react-router-dom";
import ExplorarProyectos from "../pages/explorar";
import CrearProyecto from "../pages/crear";
import VerProyecto from "../pages/ver";
import VistaBasesDeDatos from "../pages/basesDeDatos";
import ListarProyectos from "../pages/menuProyectos";
import MisProyectos from "../pages/misProyectos";
import { rutasProyectos } from "./routes";
import VistaAdministrarProyectos from "../pages/adminProjects";

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
  {
    path: rutasProyectos.basesDeDatos,
    element: <VistaBasesDeDatos />,
  },
  {
    path: rutasProyectos.misProyectos,
    element: <MisProyectos />,
  },
  {
    path: rutasProyectos.adminProyectos,
    element: <VistaAdministrarProyectos />,
  },
];
