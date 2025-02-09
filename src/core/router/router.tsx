import { routerGeneral } from "@modules/general/router/router";
import { routerProyectos } from "@modules/proyectos/router";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const allRoutes: RouteObject = {
  path: "/",
  children: [routerGeneral, routerUsuarios, ...routerProyectos],
};

export const router = createBrowserRouter([allRoutes]);
