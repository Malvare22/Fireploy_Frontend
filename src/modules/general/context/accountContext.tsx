import { TiposUsuario } from "@modules/usuarios/types/usuario";
import React, { createContext } from "react";

/**
 * **Type representing user account information.**
 *
 * @typedef {Object} AccountInformation
 * @property {string} nombre - User's full name.
 * @property {string} token - Authentication token.
 * @property {TiposUsuario} tipo - User type (e.g., student, admin).
 * @property {string} foto - Profile picture URL.
 * @property {number} id - Unique user ID.
 */
export type AccountInformation = {
  nombre: string;
  token: string;
  tipo: TiposUsuario;
  foto: string;
  id: number;
};

/**
 * **Default account information template.**
 *
 * Used when no user is logged in or data is unavailable.
 *
 * @constant {AccountInformation} accountInformationTemplate
 */
export const accountInformationTemplate: AccountInformation = {
  nombre: "Not Found",
  token: "Not Found",
  tipo: "E", // Default user type (e.g., "E" for Student)
  foto: "Not Found",
  id: -1,
};

/**
 * **React Context for user account information.**
 *
 * Provides and manages user-related data throughout the application.
 *
 * @constant {React.Context<{localUser: AccountInformation, setLocalUser: React.Dispatch<AccountInformation>} | null>} AccountContext
 */
export const AccountContext = createContext<{
  localUser: AccountInformation;
  setLocalUser: React.Dispatch<AccountInformation>;
} | null>(null);
