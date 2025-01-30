import { RouteObject } from "react-router-dom";
import LayoutStandard from "@modules/general/layouts/standard";
import VerPerfil from "../pages/perfil";
import ListarEstudiantes from "../pages/listar";

export const routerUsuarios: RouteObject = {
  path: "/",
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: "/perfil",
      element: <VerPerfil />, // Página principal
    },
    {
      path: "/listar/estudiantes",
      element: <ListarEstudiantes />,
    },
    
  ],
};