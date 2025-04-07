import { TiposUsuario } from "@modules/usuarios/types/usuario";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import AlertDialogError from "../components/alertDialogError";
import useAlertDialog from "../hooks/useAlertDialog";

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
  correo: string;
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
  correo: "",
};

export type AuthContext = {
  accountInformation: AccountInformation | null;
  setAccountInformation: React.Dispatch<AccountInformation | null>;
};

export const AuthContext = createContext<AuthContext>({
  accountInformation: accountInformationTemplate,
  setAccountInformation: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [localUser, setLocalUser] = useState<AccountInformation | null>(null);

  const { data, error } = useQuery({
    queryFn: () =>
      getUsuarioService(
        parseInt(localStorage.getItem("CURRENT_ID") ?? "-1"),
        localStorage.getItem("TOKEN") ?? ""
      ),
    queryKey: ["session"],
    refetchInterval: 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      const localData = adaptUser(data);
      setLocalUser({
        correo: localData.correo,
        foto: localData.fotoDePerfil,
        id: localData.id ?? -1,
        nombre: localData.tipo ?? "",
        tipo: localData.tipo ?? "E",
        token: localStorage.getItem("TOKEN") ?? "",
      });
    }
  }, [data]);

  const { handleClose, handleOpen, open } = useAlertDialog();

  useEffect(() => {
    if (error) {
      handleOpen();
    }
  }, [error]);

  // const [preload, setPreload] = useState(false);
  /**
   * Efecto que escucha cambios en el almacenamiento local y actualiza la información del usuario en el estado.
   * Se ejecuta al montar el componente y cada vez que cambia el almacenamiento local.
   */
  useEffect(() => {
    // /**
    //  * Función que obtiene los datos de la cuenta del usuario desde `localStorage`
    //  * y actualiza el estado `localUser`.
    //  */
    // const handleStorageChange = () => {
    //   if (localStorage.getItem("ACCOUNT")) {
    //     const user = JSON.parse(localStorage.getItem("ACCOUNT") as string) as AccountInformation;
    //     setLocalUser(user);
    //   }
    // };
    // // Inicializa el estado con los datos actuales de `localStorage`
    // handleStorageChange();
    // // Agrega un listener para detectar cambios en `localStorage`
    // window.addEventListener("storage", handleStorageChange);
    // setPreload(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accountInformation: localUser,
        setAccountInformation: setLocalUser,
      }}
    >
      {error && (
        <AlertDialogError
          open={open}
          title="Sesión de Usuario"
          error={error}
          handleClose={handleClose}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
