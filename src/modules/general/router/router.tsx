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
import TecnologiesView from "../pages/tecnologies";

/**
 * Base route path of the application.
 * This path is used as the root path for all routes in the app.
 * 
 * @constant {string} rutaBase - The root path for the application.
 * 
 * @example
 * const homeRoute = rutaBase; // '/'
 */
export const rutaBase = "/";

/**
 * Enum defining the general public routes of the application.
 * These routes are accessible without authentication and include paths for login, registration, password recovery, etc.
 * 
 * @enum {string}
 */
export enum rutasGeneral {
  home = rutaBase,
  login = rutaBase + "login",
  recuperar = rutaBase + "recuperar",
  registrar = rutaBase + "registrar",
  cambiarContrasenia = rutaBase + "reset-password/:token",
  developTeam = rutaBase + 'developTeam',
  tecnologias = rutaBase + 'tecnologias'
}

/**
 * Route configuration for public routes.
 * These routes use the LayoutPrelogin layout and are accessible without authentication.
 * The layout includes the navbar for pre-login pages.
 * 
 * @type {RouteObject}
 * @property {string} path - The base path for the public routes.
 * @property {JSX.Element} element - The layout component used for public routes.
 * @property {Array} children - A list of child routes for public pages such as login, registration, etc.
 * 
 * @example
 * // Accessing the login route:
 * const loginRoute = rutasGeneral.login; // "/login"
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
      path: rutasGeneral.tecnologias,
      element: <TecnologiesView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

/**
 * Route configuration for authenticated (private) routes.
 * These routes use the LayoutAuthenticated layout and are accessible only after the user is authenticated.
 * 
 * @type {RouteObject}
 * @property {string} path - The base path for the authenticated (private) routes.
 * @property {JSX.Element} element - The layout component used for authenticated routes.
 * @property {Array} children - A list of child routes for authenticated user pages like materias, usuarios, proyectos, etc.
 * 
 * @example
 * // Accessing a route for authenticated users:
 * const materiasRoute = authenticatedRoutes.children[0]; // First route in the authenticated routes.
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
