import Navbar from "@modules/general/components/navbar";
import Home from "@modules/general/pages/home";
import Login from "@modules/general/pages/login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/></>,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
