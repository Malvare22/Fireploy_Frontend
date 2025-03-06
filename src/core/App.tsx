import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./themes";
import { router } from "./router/router";
import { useEffect, useState } from "react";
import {
  AccountContext,
  AccountInformation,
} from "@modules/general/context/accountContext";

function App() {
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
        <RouterProvider router={router} />
      </ThemeProvider>
    </AccountContext.Provider>
  );
}

export default App;
