import { TiposUsuario } from "@modules/usuarios/types/usuario.tipos";
import { createContext } from "react";

export type AccountInformation = {
  nombre: string;
  token: string;
  tipo: TiposUsuario;
  foto: string;
  id: number;
};

/**
 * Creación de contexto para la obtención de información básica de usuario
 */
export const AccountContext = createContext<
  | {
      localUser: AccountInformation | null;
      setLocalUser: React.Dispatch<AccountInformation | null>;
    }
  | undefined
>(undefined);
