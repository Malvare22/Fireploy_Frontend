import AlertDialog from "@modules/general/components/alertDialog";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import VerPerfil from "@modules/usuarios/components/perfil";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";

function VistaPerfil() {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const {localUser} = useContext(AccountContext);

  const {error, handleAlertClose, initQuery, open, responseData, message, setOpen} = useQuery<UsuarioService>(() => getUsuarioService(localUser?.id ?? 0, localUser?.token ?? ''), false);

  useEffect(
    () => {
      if(localUser == null) return;
      initQuery();
    }, [localUser]
  );

  useEffect(
    () => {
      if(!responseData) return;
      setUsuario(adapterUsuario(responseData));
    }, [responseData]
  );

  console.log(usuario)

  return (
    <Box paddingX={0}>
      {error && <AlertDialog handleAction={handleAlertClose} open={open} setOpen={setOpen} title="Información Perfil" textBody={message}/>}
      {usuario && <VerPerfil usuario={usuario} />}
    </Box>
  );
}

export default VistaPerfil;
