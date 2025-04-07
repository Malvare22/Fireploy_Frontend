/**
 * VistaPerfil Component
 *
 * Displays the profile of the currently authenticated user.
 * Fetches the user data using their ID from the authentication context,
 * and shows either a loader, an error dialog, or the profile view.
 *
 * Features:
 * - Uses React Query to fetch user data
 * - Shows a loader while data is being fetched
 * - Displays an error dialog if the fetch fails
 * - Shows the user profile when data is successfully retrieved
 *
 * @component
 */

import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import VerPerfil from "@modules/usuarios/components/perfil";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function VistaPerfil() {
  /** Holds the adapted user data */
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  /** Get authentication token and user ID from context */
  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  console.log("render")

  /**
   * Fetch user profile data using React Query
   */
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getUsuarioService(id, token),
    queryKey: ["profile"],
  });

  /** Error dialog state and handlers */
  const {
    handleClose: handleCloseFailFetch,
    open: openFailFetch,
    handleOpen: handleOpenFailFetch,
  } = useAlertDialog();

  /**
   * When data is successfully fetched, adapt it and store it in state
   */
  useEffect(() => {
    if (isSuccess && data) {
      setUsuario(adaptUser(data));
    }
  }, [isSuccess, data]);

  /**
   * If there's an error during fetch, open the error dialog
   */
  useEffect(() => {
    if (isError) {
      handleOpenFailFetch();
    }
  }, [isError]);

  return (
    <>
      {/* Error dialog for failed fetch */}
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Consultar Portafolios"
        />
      )}

      {/* Loader or profile display */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Box paddingX={0}>{usuario && <VerPerfil usuario={usuario} />}</Box>
      )}
    </>
  );
}

export default VistaPerfil;
