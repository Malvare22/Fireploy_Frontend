import LayoutStandard from "@modules/general/layouts/auth";
import { RouteObject } from "react-router-dom";
import VerProyecto from "./pages/ver";
import CrearProyecto from "./pages/crear";

const rutaBase = "/app/proyectos";

export const rutasProyectos = {
  listar: rutaBase + "/listar",
  ver: rutaBase + "/listar/ver/:id",
  crear: rutaBase + "/crear",
};

export const routerProyectos: RouteObject[] = [
  // {
  //   path: rutasProyectos.listar,
  //   element: <VerProyectos/>,
  // },
  {
    path: rutasProyectos.ver,
    element: <VerProyecto />,
  },
  {
    path: rutasProyectos.crear,
    element: <CrearProyecto />,
  },
];
