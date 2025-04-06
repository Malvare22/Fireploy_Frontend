import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import LayoutPrelogin from "../layouts/prelogin";
import Login from "../pages/login";
import Registrar from "../pages/registro";
import LayoutAuthenticated from "../layouts/auth";
import ErrorPage from "../pages/404";
import { routerUsuarios } from "@modules/usuarios/router/router";

export const rutaBase = "/";

export enum rutasGeneral {
  home = rutaBase,
  login = rutaBase + "login",
  recuperar = rutaBase + "recuperar",
  registrar = rutaBase + "registrar",
}

export const routerGeneral: RouteObject = {
  path: "/",
  element: <LayoutPrelogin />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: rutasGeneral.login,
      element: <Login />,
    },
    {
      path: rutasGeneral.registrar,
      element: <Registrar />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

export const authenticatedRoutes: RouteObject = {
  path: "/app",
  element: <LayoutAuthenticated />, // Layout para rutas privadas
  children: [
    //...(routerMaterias || []),
    ...(routerUsuarios || []),
    //...(routerProyectos || []),

  ],
};
