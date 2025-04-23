import { TiposUsuario } from "@modules/usuarios/types/usuario";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import useAlertDialog from "../hooks/useAlertDialog";
import useErrorReader from "../hooks/useErrorReader";
import AlertDialog from "../components/alertDialog";

/**
 * @typedef {Object} AccountInformation
 * @description Represents the user account information.
 * @property {string} nombre - Full name of the user.
 * @property {string} token - Authentication token for the user.
 * @property {TiposUsuario} tipo - Type of the user (e.g., student, admin).
 * @property {string} foto - URL of the user's profile picture.
 * @property {number} id - Unique ID of the user.
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

/**
 * @constant {AccountInformation} accountInformationTemplate
 * @description Default template used when there is no logged-in user or data is unavailable.
 */
export const accountInformationTemplate: AccountInformation = {
  nombre: "Not Found",
  token: "Not Found",
  tipo: "E", // Default user type (e.g., "E" for Student)
  foto: "Not Found",
  id: -1,
  correo: "",
};

/**
 * @typedef {Object} AuthContext
 * @description Context for managing user authentication and account information.
 * @property {AccountInformation} accountInformation - The current user account information.
 * @property {React.Dispatch<AccountInformation>} setAccountInformation - Function to update the user account information.
 */
export type AuthContext = {
  accountInformation: AccountInformation;
  setAccountInformation: React.Dispatch<AccountInformation>;
};

/**
 * Context for authentication, providing user account information and update method.
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
 * @description Context provider component that supplies authentication state to the rest of the application.
 * @param {ReactNode} children - Child components to be rendered within the provider.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [localUser, setLocalUser] = useState<AccountInformation>(accountInformationTemplate);

  const { data, error } = useQuery({
    queryFn: () =>
      getUsuarioService(
        parseInt(localStorage.getItem("CURRENT_ID") ?? "-1"),
        localStorage.getItem("TOKEN") ?? ""
      ),
    queryKey: ["session", localStorage.getItem("TOKEN") ?? ""],
    refetchInterval: 60 * 1000, // Refetch data every minute.
    retry: 1, // Retry the query once in case of failure.
  });

  /**
   * @effect
   * @description Effect hook to update user information when data is fetched successfully.
   * The user information is adapted and stored in the state.
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
    }
  }, [data]);

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();
  const { setError } = useErrorReader(showDialog);

  /**
   * @effect
   * @description Effect hook to handle errors by passing them to the error reader.
   * This effect is triggered whenever an error occurs during the query.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  /**
   * @effect
   * @description Effect hook to listen for changes in local storage and update the user state accordingly.
   * This effect is not being utilized currently, but it can be used to detect storage changes.
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
 * @hook useAuth
 * @description Custom hook to access the authentication context and retrieve user account information.
 * @returns {AuthContext} - The current authentication context value, including account information and update function.
 */
export const useAuth = () => useContext(AuthContext);
