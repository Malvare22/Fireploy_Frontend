import { RouteObject } from "react-router-dom";
import VistaPerfil from "../pages/perfil";
import ListarPortafolios from "../pages/explorarPortafolios";
import Portafolio from "../components/portafolio";
import ListarUsuarios from "../pages/listar";
import GestionarPerfil from "../pages/admin/modificarPerfil";
import CrearUsuario from "../pages/admin/crearUsuario";
import Logout from "@modules/general/pages/logout";
import VistaSolicitudes from "../pages/solicitudes";
import NewEntriesView from "../pages/newEntries";

const rutaBase = "/app/usuarios";

export enum rutasUsuarios {
  perfil = rutaBase + "/perfil",
  explorarPortafolios = rutaBase + "/explorar",
  portafolio = rutaBase + "/portafolio/:id",
  listarUsuarios = rutaBase + "/listar",
  modificarPerfil = rutaBase + "/perfil/:id",
  agregarUsuario = rutaBase + '/agregar',
  logout = rutaBase + '/logout',
  solicitudes = rutaBase + '/solicitudes',
  newEntries = rutaBase + '/newEntries'
}

/**
 * Router configuration for the Usuarios (Users) module.
 * 
 * This configuration defines the available routes for user-related pages, including profile management, 
 * portfolio exploration, user list, request management, and admin pages. Each route is associated with 
 * a corresponding component that will be rendered when the user navigates to the respective URL.
 * 
 * @constant {RouteObject[]} routerUsuarios - An array of route objects that define paths and associated components.
 * 
 * @example
 * ```tsx
 * const routes = routerUsuarios; // Use this array for routing in a React application
 * ```
 */
export const routerUsuarios: RouteObject[] = [
  {
    path: rutasUsuarios.perfil,
    element: <VistaPerfil />,
  },
  {
    path: rutasUsuarios.explorarPortafolios,
    element: <ListarPortafolios />,
  },
  {
    path: rutasUsuarios.portafolio,
    element: <Portafolio/>
  },
  {
    path: rutasUsuarios.listarUsuarios,
    element: <ListarUsuarios/>
  },
  {
    path: rutasUsuarios.modificarPerfil,
    element: <GestionarPerfil/>
  },
  {
    path: rutasUsuarios.agregarUsuario,
    element: <CrearUsuario/>
  },
  {
    path: rutasUsuarios.logout,
    element: <Logout />,
  },
  {
    path: rutasUsuarios.solicitudes,
    element: <VistaSolicitudes />,
  },
  {
    path: rutasUsuarios.newEntries,
    element: <NewEntriesView />,
  },
];
