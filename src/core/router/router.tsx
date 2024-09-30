import { createBrowserRouter } from "react-router-dom";
import Test from "../../modules/general/pages/index/index";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Test/>,
    },
  ]);