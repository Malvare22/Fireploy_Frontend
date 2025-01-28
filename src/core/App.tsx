import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./themes";
import { SnackBarContext } from "@modules/general/context/snackbarContext";
import { router } from "./router/router";
import SnackBar from "@modules/general/components/snackbar";
import useSnackBar from "@modules/general/hooks/useSnackbar";
import { useEffect, useState } from "react";
import { AccountContext } from "../modules/context/accountContext";

function App() {
  const { view, setView, message, setMessage, success, setSuccess } =
    useSnackBar();

  const [localUser, setLocalUser] = useState<string | null>(
    localStorage.getItem("USER")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalUser(localStorage.getItem("USER"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AccountContext.Provider value={{ localUser: localUser, setLocalUser: setLocalUser }}>
      <ThemeProvider theme={theme}>
        <SnackBarContext.Provider
          value={{ view, setView, message, setMessage, success, setSuccess }}
        >
          <SnackBar
            view={view}
            setView={setView}
            message={message}
            success={success}
          />
          <RouterProvider router={router} />
        </SnackBarContext.Provider>
      </ThemeProvider>
    </AccountContext.Provider>
  );
}

export default App;
