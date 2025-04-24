import { RouteObject } from "react-router-dom";
import ExplorarProyectos from "./pages/explorar";
import CrearProyecto from "./pages/crear";
import VerProyecto from "./pages/ver";
import VistaBasesDeDatos from "./pages/basesDeDatos";
import ListarProyectos from "./pages/listar";

const rutaBase = "/app/proyectos";

export const rutasProyectos = {
  listar: rutaBase + "/listar",
  ver: rutaBase + "/ver/:id",
  crear: rutaBase + "/crear",
  explorar: rutaBase + "/explorar",
  repositorios: rutaBase + "/repositorios",
  basesDeDatos: rutaBase + "/basesDeDatos",
};

export const routerProyectos: RouteObject[] = [

  {
    path: rutasProyectos.ver,
    element: <VerProyecto />,
  },
  {
    path: rutasProyectos.listar,
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
];
