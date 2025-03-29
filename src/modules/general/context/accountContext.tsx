import { TiposUsuario } from "@modules/usuarios/types/usuario";
import React, { createContext } from "react";

export type AccountInformation = {
  nombre: string;
  token: string;
  tipo: TiposUsuario;
  foto: string;
  id: number;
};

export const accountInformationTemplate: AccountInformation = {
  nombre: "Not Found",
  token: "Not Found",
  tipo: "E",
  foto: "Not Found",
  id: -1,
};

/**
 * Creación de contexto para la obtención de información básica de usuario
 */
export const AccountContext = createContext<{
  localUser: AccountInformation;
  setLocalUser: React.Dispatch<AccountInformation>;
} | null>(null);
