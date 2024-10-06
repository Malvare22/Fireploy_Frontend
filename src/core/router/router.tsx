import { createBrowserRouter } from "react-router-dom";
import Test from "../../modules/general/pages/index/index";
import PreLogin from "../../modules/general/layouts/prelogin";
import Register from "../../modules/general/pages/register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <PreLogin><Test></Test></PreLogin>,
      
    },
    {
      path: "/register",
      element: <PreLogin><Register></Register></PreLogin>,
      
    },
    
  ]);