import { authenticatedRoutes, routerGeneral } from "@modules/general/router/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";

/**
 * Main route object defining the root structure of the application.
 * Includes child routes grouped by modules such as general routes and authenticated routes.
 *
 * @constant {RouteObject} allRoutes - The complete configuration for application routing.
 * @property {string} path - The base path for the application ("/").
 * @property {RouteObject[]} children - Nested child routes representing app modules.
 */
const allRoutes: RouteObject = {
  path: "/",
  children: [routerGeneral, authenticatedRoutes],
};

/**
 * Creates the browser router instance for the application using `createBrowserRouter`.
 * This router handles client-side navigation based on the configuration provided in `allRoutes`.
 *
 * @constant {ReturnType<typeof createBrowserRouter>} router - The application’s router instance.
 */
export const router = createBrowserRouter([allRoutes]);
