import { RouteObject } from "react-router-dom";
import ListarUsuarios from "../pages/listar";
import Perfil from "../pages/perfil";
import PerfilPorId from "../pages/id";

const rutaBase = "/usuarios";

export const rutasUsuarios = {
  rutaBase: rutaBase + "/usuarios",
  perfil: rutaBase + "/perfil",
  verPerfilPorId: rutaBase + "/perfil/:id",
  listar: rutaBase + "/listar",
};

export const routerUsuarios: RouteObject[] = [
  {
    path: rutasUsuarios.perfil,
    element: <Perfil />, // Página principal
  },
  {
    path: rutasUsuarios.verPerfilPorId,
    element: <PerfilPorId />, // Ver perfil estudiante
  },
  {
    path: rutasUsuarios.listar,
    element: <ListarUsuarios />,
  },
];