import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./themes";
import { router } from "./router/router";
import { AuthProvider } from "@modules/general/context/accountContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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

  return (
    /**
     * Proveedor de contexto que almacena la información del usuario.
     * Permite que otros componentes accedan y actualicen el estado del usuario.
     */
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={getTheme}>
          {/* Proveedor de enrutamiento para manejar la navegación */}
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
