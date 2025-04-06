import AlertDialog from "@modules/general/components/alertDialog";
import { useAuth } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import Perfil from "@modules/usuarios/components/perfil";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function GestionarPerfil() {
  const { id } = useParams();

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const { error, handleAlertClose, initQuery, message, open, responseData } =
    useQuery<UsuarioService>(
      () => getUsuarioService(parseInt(id!!), token!!),
      false,
    );

  useEffect(() => {
    if (token && id) {
      initQuery();
    }
  }, [id, token]);

  useEffect(() => {
    if (responseData) {
      setUsuario(adapterUsuario(responseData));
    }
  }, [responseData]);

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Gestionar Usuarios"
          textBody={message}
        />
      )}
      {usuario && <Perfil usuario={usuario} />}
    </>
  );
}

export default GestionarPerfil;
