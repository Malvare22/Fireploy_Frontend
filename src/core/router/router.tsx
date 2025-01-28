import { routerGeneral } from "@modules/general/router/router";
import { routerUsuarios } from "@modules/usuarios/router/router";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([routerGeneral, routerUsuarios]);
