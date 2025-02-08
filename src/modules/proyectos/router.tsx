import LayoutStandard from "@modules/general/layouts/standard";
import { RouteObject } from "react-router-dom";
import VerProyectos from "./pages/myProjects/listar";
import VerProyecto from "./pages/myProjects/ver";

const rutaBase = "/proyectos";

export const rutasProyectos = {
  listar: rutaBase + "/listar",
  ver: rutaBase + "/ver/:id"
};

export const routerProyectos: RouteObject[] = [
  {
    path: rutasProyectos.listar,
    element: <VerProyectos/>,
  },
  {
    path: rutasProyectos.ver,
    element: <VerProyecto/>,
  },
];
