import LayoutStandard from "@modules/general/layouts/auth";
import { RouteObject } from "react-router-dom";
import VerProyectos from "./pages/listar";
import VerProyecto from "./pages/ver";

const rutaBase = "/proyectos";

export const rutasProyectos = {
  listar: rutaBase + "/listar",
  ver: rutaBase + "/listar/ver/:id"
};


export const routerProyectos: RouteObject = {
  path: "/",
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: rutasProyectos.listar,
      element: <VerProyectos/>,
    },
    {
      path: rutasProyectos.ver,
      element: <VerProyecto/>
    }
   
  ],
};
