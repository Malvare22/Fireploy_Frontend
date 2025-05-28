import { TiposUsuario } from "@modules/usuarios/types/usuario";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import useAlertDialog from "../hooks/useAlertDialog";
import useErrorReader from "../hooks/useErrorReader";
import AlertDialog from "../components/alertDialog";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { ACCOUNT_INITIAL_VALUES } from "../enums/accountInfoValues";

/**
 * Represents the account information structure for authenticated users.
 *
 * @typedef {Object} AccountInformation
 * @property {string} nombre - Full name of the user.
 * @property {string} token - Authentication token.
 * @property {TiposUsuario} tipo - Type of user (e.g., "E" for student).
 * @property {string} foto - Profile photo URL.
 * @property {number} id - Unique identifier for the user.
 * @property {string} correo - Email address of the user.
 */
export type AccountInformation = {
  nombre: string;
  token: string;
  tipo: TiposUsuario;
  foto: string;
  id: number;
  correo: string;
};


export const accountInformationTemplate: AccountInformation = {
  nombre: ACCOUNT_INITIAL_VALUES.TIPO,
  token: ACCOUNT_INITIAL_VALUES.TOKEN,
  tipo: "E",
  foto: ACCOUNT_INITIAL_VALUES.FOTO,
  id: -1,
  correo: "",
};

/**
 * Context value structure for authentication state.
 *
 * @typedef {Object} AuthContext
 * @property {AccountInformation} accountInformation - Current user's account info.
 * @property {Function} setAccountInformation - Function to update account info.
 */
export type AuthContext = {
  accountInformation: AccountInformation;
  setAccountInformation: React.Dispatch<AccountInformation>;
};

/**
 * Authentication context used to access user information throughout the app.
 *
 * @constant
 * @type {React.Context<AuthContext>}
 */
export const AuthContext = createContext<AuthContext>({
  accountInformation: accountInformationTemplate,
  setAccountInformation: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * @component AuthProvider
 * @description Context provider component that supplies authentication state and user data to child components.
 *
 * @param {ReactNode} children - Components that consume the authentication context.
 *
 * @returns {JSX.Element} A provider with user authentication information and alert dialog.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [localUser, setLocalUser] = useState<AccountInformation>(accountInformationTemplate);

  const navigate = useNavigate();

  function handleCompleteData() {
    navigate(rutasUsuarios.newEntries);
  }

  const { data, error } = useQuery({
    queryFn: () =>
      getUsuarioService(
        parseInt(localStorage.getItem("CURRENT_ID") ?? "-1"),
        localStorage.getItem("TOKEN") ?? ""
      ),
    queryKey: [
      "Profile",
      localStorage.getItem("CURRENT_ID") ?? "-1",
      localStorage.getItem("TOKEN") ?? "",
    ],
    refetchInterval: 60 * 1000,
    retry: 1,
  });

  /**
   * @effect
   * Updates the local user state when new data is fetched and adapted.
   */
  useEffect(() => {
    if (data) {
      const localData = adaptUser(data);

      setLocalUser({
        correo: localData.correo,
        foto: localData.fotoDePerfil,
        id: localData.id ?? -1,
        nombre: localData.nombres + " " + localData.apellidos,
        tipo: localData.tipo ?? "E",
        token: localStorage.getItem("TOKEN") ?? "",
      });

      if (data.sexo == "") {
        handleCompleteData();
      }
    }
  }, [data]);

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();
  const { setError } = useErrorReader(showDialog);

  /**
   * @effect
   * Triggers the error handler when an error occurs in the query.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  /**
   * @effect
   * Placeholder effect to listen for local storage changes (not implemented).
   */
  useEffect(() => {
    // Effect to listen for changes in local storage can be added here if needed.
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accountInformation: localUser,
        setAccountInformation: setLocalUser,
      }}
    >
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 *
 * @returns {AuthContext} The authentication state and updater function.
 *
 * @example
 * ```tsx
 * const { accountInformation } = useAuth();
 * ```
 */
export const useAuth = () => useContext(AuthContext);
