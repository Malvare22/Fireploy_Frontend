import VerPerfil from "@modules/usuarios/components/perfil";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@modules/general/context/accountContext";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { obtenerUsuarioPorIdService } from "@modules/usuarios/services/obtenerUsuarioPorId";
import useQuery from "@modules/general/hooks/useQuery";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";

function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const token = useContext(AccountContext)?.localUser?.token;

  const id = useContext(AccountContext)?.localUser?.id;

  const { RenderAlertDialog, init, responseData } = useQuery<UsuarioService>(
    () => obtenerUsuarioPorIdService(id ?? -1, token ?? ""),
    "Obtener Información del Perfil",
    false,
    false
  );

  useEffect(() => {
    if (!token || !id) return;

    const response = async () => await init();

    response();
  }, [token, id]);

  useEffect(() => {
    if (!responseData) return;
    setUsuario(adaptarUsuario(responseData));
  }, [responseData]);

  return (
    <>
      <RenderAlertDialog />
      {usuario != undefined ? <VerPerfil usuario={usuario} /> : <></>}
    </>
  );
}

export default Perfil;
