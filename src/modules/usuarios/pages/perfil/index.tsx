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

import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
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

  /**
   * Fetch user profile data using React Query
   */
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUsuarioService(id, token),
    queryKey: ["Profile", id],
  });

  /** Error dialog state and handlers */
  const { handleAccept, message, open, showDialog, title, type } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  /**
   * When data is successfully fetched, adapt it and store it in state
   */
  useEffect(() => {
    if (data) {
      setUsuario(adaptUser(data));
    }
  }, [data]);

  /**
   * If there's an error during fetch, open the error dialog
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
        <Box paddingX={0}>{usuario && <VerPerfil usuario={usuario} />}</Box>
      )}
    </>
  );
}

export default VistaPerfil;
