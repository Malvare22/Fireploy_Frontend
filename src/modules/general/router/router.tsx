import { Navigate, RouteObject } from "react-router-dom";
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
import { routerProyectos } from "@modules/proyectos/router/router";
import TecnologiesView from "../pages/tecnologies";
import ExplorarPortafolios from "@modules/usuarios/pages/explorarPortafolios";
import PortafolioView from "@modules/usuarios/pages/portafolio";
import { rutasGeneral } from "@modules/general/router/routes";
import ExplorarProyectos from "@modules/proyectos/pages/explorar";
import LayoutPreLoginPaper from "../layouts/preloginPaper";
import { BASE_PATH } from "./basePath";

/**
 * Route configuration for public routes using the standard pre-login layout.
 *
 * These routes are accessible without authentication and are wrapped with a layout
 * that includes a navigation bar. They handle pages such as the home page, login,
 * registration, password recovery, and informational pages.
 *
 * @constant
 *
 * @property path The base URL path for the public routes.
 * @property element The layout component that wraps all public routes. In this case, it includes the pre-login navbar.
 * @property children An array of route objects representing each individual public page.
 *
 * @returns Returns a route object used by the React Router for public sections of the app.
 *
 * @example
 * // Example usage in the router:
 * <RouterProvider router={routerGeneral} />
 */
export const routerGeneral: RouteObject = {
  element: <LayoutPrelogin />, // Use layout with navbar for pre-login pages
  children: [
    {
      path: "/",
      element: <Navigate to={rutasGeneral.home}/>
    },
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
  ],
};

/**
 * Route configuration for public routes using a layout with Paper styling.
 *
 * These routes are publicly accessible but visually distinguished with a Paper wrapper,
 * suitable for routes like portfolio exploration, public portfolios, and fallback error handling.
 *
 * @constant
 *
 * @property path The base URL path for these public routes.
 * @property element The layout component that wraps these routes, using Material UI's Paper for styling.
 * @property children An array of route objects representing portfolio and project exploration routes.
 *
 * @returns Returns a route object to be registered in the public router configuration.
 *
 * @example
 * // Example usage in the router:
 * <RouterProvider router={routerGeneralPaper} />
 */
export const routerGeneralPaper: RouteObject = {
  element: <LayoutPreLoginPaper />, // Use layout with navbar for pre-login pages
  children: [
    {
      path: rutasGeneral.portafolioPorUsuario,
      element: <PortafolioView />,
    },
    {
      path: rutasGeneral.explorarPortafolios,
      element: <ExplorarPortafolios />,
    },
    {
      path: rutasGeneral.explorarProyectos,
      element: <ExplorarProyectos />,
    },
    {
      path: rutasGeneral.detectAnomaly,
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

/**
 * Route configuration for authenticated (private) routes.
 *
 * These routes require the user to be authenticated and are wrapped in a layout
 * designed for logged-in sessions. They include modules like materias, usuarios, and proyectos.
 *
 * @constant
 *
 * @property path The base URL path for authenticated routes, typically prefixed to distinguish from public routes.
 * @property element The layout component that provides structure and navigation for authenticated pages.
 * @property children An array of route objects from feature-specific modules requiring user authentication.
 *
 * @returns Returns a route object used by React Router to handle navigation in private sections of the app.
 *
 * @example
 * // Example usage in the router:
 * <RouterProvider router={authenticatedRoutes} />
 */
export const authenticatedRoutes: RouteObject = {
  path: BASE_PATH.AUTH,
  element: <LayoutAuthenticated />, // Layout for private routes
  children: [...(routerMaterias || []), ...(routerUsuarios || []), ...(routerProyectos || [])],
};
