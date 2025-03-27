import { NavigateFunction } from "react-router-dom";
import { AccountInformation } from "../context/accountContext";
import { rutasGeneral } from "../../usuarios/components/router/router";

/**
 *
 * @param navigate objeto para el redireccionamiento de rutas
 * @param setLocalUser objeto set del useState AccountContext
 */
export function cerrarSession(
  navigate: NavigateFunction,
  setLocalUser: React.Dispatch<AccountInformation | null>
) {
  localStorage.clear();
  setLocalUser(null);
  navigate(rutasGeneral.home);
}
