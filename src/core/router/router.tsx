import LayoutBasic from "@modules/general/layouts/basic";
import ChangePassword from "@modules/general/pages/changePassword";
import Home from "@modules/general/pages/home";
import Login from "@modules/general/pages/login";
import Register from "@modules/general/pages/register";
import MyProjects from "@modules/projects/pages/myProjects/all";
import ViewProject from "@modules/projects/pages/myProjects/test";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBasic />, // Usar el Layout para rutas que necesitan el Navbar
    children: [
      {
        path: "/",
        element: <Home />, // Página principal
      },
      {
        path: "login",
        element: <Login />, // Página de login
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "recovery",
        element: <ChangePassword />,
      },
      {
        path: "myProjects/all",
        element: <MyProjects />,
      },
      {
        path: "myProjects/view",
        element: <ViewProject />,
      },
    ],
  },
]);
