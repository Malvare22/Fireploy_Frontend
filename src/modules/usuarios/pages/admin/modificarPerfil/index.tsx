import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import Perfil from "@modules/usuarios/components/perfil";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

/**
 * Component responsible for managing and displaying a user's profile.
 * It fetches the user's data from the API, adapts it, and renders the
 * <Perfil /> component. Also handles loading and error states using 
 * dialogs and a loader component.
 *
 * @component
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
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getUsuarioService(parseInt(id ?? "-1"), token),
    queryKey: ["profileInformation"],
  });

  // Custom hook to control the alert dialog state
  const { handleClose, open, handleOpen } = useAlertDialog();

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
    if (isError) {
      handleOpen();
    }
  }, [isError]);

  return (
    <>
      {/* Display error dialog if an error occurred */}
      {error && (
        <AlertDialogError
          open={open}
          error={error}
          handleClose={handleClose}
          title="User Information Fetch Error"
        />
      )}

      {/* Show loading indicator or user profile if data is available */}
      {isLoading ? <LoaderElement /> : <>{usuario && <Perfil usuario={usuario} />}</>}
    </>
  );
}

export default GestionarPerfil;
