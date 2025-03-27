// import { RouteObject } from "react-router-dom";
// import ListarUsuarios from "../pages/listar";
// import Perfil from "../pages/perfil";
// import PerfilPorId from "../pages/id";
// import VerPortafolioPorId from "../pages/portafolio";
// import LayoutStandard from "@modules/general/layouts/standard";
// import BuscarPortafolio from "../pages/buscarPortafolio";

import { RouteObject } from "react-router-dom";
import VistaPerfil from "../pages/perfil";
import ListarPortafolios from "../pages/explorarPortafolios";
import Portafolio from "../components/portafolio";
import ListarUsuarios from "../pages/listar";
import GestionarPerfil from "../pages/admin/modificarPerfil";
import CrearUsuario from "../pages/admin/crearUsuario";
import Logout from "@modules/general/pages/logout";

const rutaBase = "/app/usuarios";

export enum rutasUsuarios {
  perfil = rutaBase + "/perfil",
  explorarPortafolios = rutaBase + "/explorar",
  portafolio = rutaBase + "/portafolio/:id",
  listarUsuarios = rutaBase + "/listar",
  modificarPerfil = rutaBase + "/perfil/:id",
  agregarUsuario = rutaBase + '/agregar',
  logout = rutaBase + '/logout'
}

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
];
