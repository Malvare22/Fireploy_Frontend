import { authenticatedRoutes, routerGeneral } from "@modules/usuarios/components/router/router";
// import { routerMaterias } from "@modules/materias/router/router";
// import { routerProyectos } from "@modules/proyectos/router";
// import { routerUsuarios } from "@modules/usuarios/router/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";

/**
 * Objeto que define todas las rutas principales de la aplicación.
 * Contiene rutas agrupadas en diferentes módulos, como rutas generales,
 * de usuarios, materias y proyectos.
 *
 * @constant {RouteObject} allRoutes - Configuración de las rutas principales.
 * @property {string} path - Ruta base de la aplicación ("/").
 * @property {RouteObject[]} children - Rutas hijas que incluyen los módulos de la aplicación.
 */
const allRoutes: RouteObject = {
  path: "/",
  children: [routerGeneral, authenticatedRoutes],
};

/**
 * Creación del enrutador de la aplicación utilizando `createBrowserRouter`.
 * Este enrutador se basa en la configuración de `allRoutes` y es utilizado 
 * para gestionar la navegación en la aplicación.
 *
 * @constant {ReturnType<typeof createBrowserRouter>} router - Enrutador de la aplicación.
 */
export const router = createBrowserRouter([allRoutes]);

