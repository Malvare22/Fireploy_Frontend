import LayoutStandard from "@modules/general/layouts/standard";
import { routerGeneral } from "@modules/general/router/router";
import { routerProyectos } from "@modules/proyectos/router";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const allRoutes: RouteObject = {
  path: "/",
  element: <LayoutStandard />,
  children: [routerGeneral, ...routerUsuarios, ...routerProyectos],
};

export const router = createBrowserRouter([allRoutes]);
