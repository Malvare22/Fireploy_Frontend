import LayoutStandard from "@modules/general/layouts/standard";
import { routerGeneral } from "@modules/general/router/router";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const allRoutes: RouteObject = {
  path: "/",
  element: <LayoutStandard />,
  children: [routerGeneral, ...routerUsuarios],
};

export const router = createBrowserRouter([allRoutes]);
