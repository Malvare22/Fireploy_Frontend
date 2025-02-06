import LayoutStandard from "@modules/general/layouts/standard";
import { RouteObject } from "react-router-dom";
import VerProyectos from "./pages/myProjects/listar";

const rutaBase = "/proyectos";

export const rutasProyectos = {
  listar: rutaBase + "/listar",
};

export const routerProyectos: RouteObject[] = [
  {
    path: rutasProyectos.listar,
    element: <VerProyectos/>,
  },
];
