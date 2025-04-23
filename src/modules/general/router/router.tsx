import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import LayoutPrelogin from "../layouts/prelogin";
import Login from "../pages/login";
import Registrar from "../pages/registro";
import LayoutAuthenticated from "../layouts/auth";
import ErrorPage from "../pages/404";
import RecuperarContrasenia from "../pages/recuperar";
import ReestablecerContrasenia from "../pages/reestablecerContrasenia";
import { routerMaterias } from "@modules/materias/router/router";
import TeamView from "../pages/team";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { routerProyectos } from "@modules/proyectos/router";

/** 
 * Base route path of the application
 */
export const rutaBase = "/";

/**
 * Enum defining the general public routes of the application
 */
export enum rutasGeneral {
  home = rutaBase,
  login = rutaBase + "login",
  recuperar = rutaBase + "recuperar",
  registrar = rutaBase + "registrar",
  cambiarContrasenia = rutaBase + "reset-password/:token",
  developTeam = rutaBase + 'developTeam'
}

/**
 * Route configuration for public routes.
 * These routes use the LayoutPrelogin layout and are accessible without authentication.
 */
export const routerGeneral: RouteObject = {
  path: "/",
  element: <LayoutPrelogin />, // Use layout with navbar for pre-login pages
  children: [
    {
      path: rutasGeneral.home,
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
      path: rutasGeneral.recuperar,
      element: <RecuperarContrasenia />,
    },
    {
      path: rutasGeneral.cambiarContrasenia,
      element: <ReestablecerContrasenia />,
    },
    {
      path: rutasGeneral.developTeam,
      element: <TeamView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

/**
 * Route configuration for authenticated (private) routes.
 * These routes use the LayoutAuthenticated layout and are loaded only when the user is logged in.
 */
export const authenticatedRoutes: RouteObject = {
  path: "/app",
  element: <LayoutAuthenticated />, // Layout for private routes
  children: [
    ...(routerMaterias || []),
    ...(routerUsuarios || []),
    ...(routerProyectos || []),
  ],
};
