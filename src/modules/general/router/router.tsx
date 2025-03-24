import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import LayoutPrelogin from "../layouts/prelogin";
import Login from "../pages/login";
import Registrar from "../pages/registro";
import TablaUsuarios from "@modules/usuarios/components/tablaUsuarios";
import Portafolio from "@modules/usuarios/components/portafolio";
import LayoutAuthenticated from "../layouts/auth";
import Dashboard from "../pages/dashboard";
import MisProyectos from "@modules/proyectos/pages/misProyectos";
import { routerMaterias } from "@modules/materias/router/router";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { routerProyectos } from "@modules/proyectos/router";

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
  ],
};

export const authenticatedRoutes: RouteObject = {
  path: "/app",
  element: <LayoutAuthenticated />, // Layout para rutas privadas
  children: [
    {
      path: "dashboard",
      element: <Dashboard />, // Dashboard del usuario
    },
    {
      path: "test1",
      element: <MisProyectos />, // Dashboard del usuario
    },
    ...(routerMaterias || []),
    ...(routerUsuarios || []),
    ...(routerProyectos || []),
  ],
};
