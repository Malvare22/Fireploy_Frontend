import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes";
// import '@/core/fonts/Open Sans/fonts.css'
import "@core/fonts/OpenSans/fonts.css";
import { router } from "./router/router";
import { SnackBarContext } from "../modules/general/context/snackbarContext";
import useSnackBar from "../modules/general/hooks/useSnackbar";
import SnackBar from "../modules/general/components/snackbar";


function App() {
  const {view, setView, message, setMessage, success, setSuccess} = useSnackBar();

  return (
    <ThemeProvider theme={theme}>
      <SnackBarContext.Provider value={{view, setView, message, setMessage, success, setSuccess}}>
        <SnackBar view={view} setView={setView} message={message} success={success}/>
        <RouterProvider router={router} />
      </SnackBarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
