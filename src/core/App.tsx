import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./themes";
import { SnackBarContext } from "@modules/general/context/snackbarContext";
import { router } from "./router/router";
import SnackBar from "@modules/general/components/snackbar";
import useSnackBar from "@modules/general/hooks/useSnackbar";
import { useEffect, useState } from "react";
import {
  AccountContext,
  AccountInformation,
} from "@modules/general/context/accountContext";

function App() {
  const { view, setView, message, setMessage, success, setSuccess } =
    useSnackBar();

  const [localUser, setLocalUser] = useState<AccountInformation | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("ACCOUNT")) {
        const user = JSON.parse(
          localStorage.getItem("ACCOUNT") as string
        ) as AccountInformation;
        setLocalUser(user);
      }
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);

  return (
    <AccountContext.Provider
      value={{ localUser: localUser, setLocalUser: setLocalUser }}
    >
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
