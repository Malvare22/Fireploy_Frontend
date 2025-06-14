import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import Perfil from "@modules/usuarios/components/perfil";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

/**
 * GestionarPerfil component – A component responsible for managing and displaying a user's profile.
 *
 * This component fetches the user's data from the API, adapts the data for use, and renders the `Perfil`
 * component to display the profile. It also handles loading and error states using dialogs and a loader
 * component. It makes use of React Query for data fetching, custom hooks for dialog management, and error handling.
 *
 * @component
 *
 * @returns {JSX.Element} A profile management interface that displays user data, or a loading/error state.
 *
 * @example
 * ```tsx
 * <GestionarPerfil />
 * ```
 */
function GestionarPerfil() {
  // Get the user ID from the route parameters
  const { id } = useParams();

  // Retrieve authentication information from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // State to store the adapted user information
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  /**
   * Query hook to fetch user data using React Query.
   * It uses the user ID and authentication token.
   *
   * @returns {object} data - The fetched user data
   * @returns {boolean} isLoading - Indicates if the request is in progress
   * @returns {boolean} isError - Indicates if there was an error
   * @returns {object} error - The error object returned from the request
   * @returns {boolean} isSuccess - Indicates if the request was successful
   */
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuarioService(parseInt(id ?? "-1"), token),
    queryKey: ["Profile Information", id, token],
  });

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  // Custom hook to control the alert dialog state
  const { setError } = useErrorReader(showDialog);

  /**
   * Effect to update the user state with adapted data
   * once the API call is successful.
   */
  useEffect(() => {
    if (isSuccess && data) {
      setUsuario(adaptUser(data));
    }
  }, [isSuccess, data]);

  /**
   * Effect to open the error dialog if the request fails.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  return (
    <>
      {/* Error dialog for failed fetch */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        type={type}
        textBody={message}
      />

      {/* Loader or profile display */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <AlertDialogProvider>
          <Box paddingX={0}>{usuario && <Perfil usuario={usuario} />}</Box>
        </AlertDialogProvider>
      )}
    </>
  );
}

export default GestionarPerfil;
