import { RouterProvider } from "react-router-dom";
import { PaletteMode, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getTheme } from "./themes";
import { router } from "./router/router";
import {
  AccountContext,
  AccountInformation,
} from "@modules/general/context/accountContext";

/**
 * Componente principal de la aplicación.
 * Configura el tema, el enrutamiento y la gestión del estado de la cuenta del usuario.
 *
 * @component
 * @returns {JSX.Element} - Retorna el componente raíz de la aplicación.
 */
function App(): JSX.Element {
  /**
   * Estado para almacenar la información del usuario autenticado.
   *
   * @state {AccountInformation | null} localUser - Información de la cuenta del usuario.
   * @state {React.Dispatch<React.SetStateAction<AccountInformation | null>>} setLocalUser -
   * Función para actualizar la información del usuario.
   */
  const [localUser, setLocalUser] = useState<AccountInformation | null>(null);

  const [mode, setMode] = useState<PaletteMode>('light');

  /**
   * Efecto que escucha cambios en el almacenamiento local y actualiza la información del usuario en el estado.
   * Se ejecuta al montar el componente y cada vez que cambia el almacenamiento local.
   */
  useEffect(() => {
    /**
     * Función que obtiene los datos de la cuenta del usuario desde `localStorage`
     * y actualiza el estado `localUser`.
     */
    const handleStorageChange = () => {
      if (localStorage.getItem("ACCOUNT")) {
        const user = JSON.parse(
          localStorage.getItem("ACCOUNT") as string
        ) as AccountInformation;
        setLocalUser(user);
      }
    };

    // Inicializa el estado con los datos actuales de `localStorage`
    handleStorageChange();

    // Agrega un listener para detectar cambios en `localStorage`
    window.addEventListener("storage", handleStorageChange);
  }, []);

  return (
    /**
     * Proveedor de contexto que almacena la información del usuario.
     * Permite que otros componentes accedan y actualicen el estado del usuario.
     */
    <AccountContext.Provider
      value={{ localUser: localUser, setLocalUser: setLocalUser }}
    >
      {/* Proveedor de tema para la aplicación */}
      <ThemeProvider theme={getTheme(mode)}>
        {/* Proveedor de enrutamiento para manejar la navegación */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </AccountContext.Provider>
  );
}

export default App;
