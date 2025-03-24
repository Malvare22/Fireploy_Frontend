import { useParams } from "react-router-dom";
import VerPerfil from "@modules/usuarios/components/perfil";
import { useContext, useEffect, useState } from "react";
import useQuery from "@modules/general/hooks/useQuery";
import { obtenerUsuarioPorIdService } from "@modules/usuarios/services/get.usuario";
import { AccountContext } from "@modules/general/context/accountContext";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";

function PerfilPorId() {
  const { id } = useParams();

  const token = useContext(AccountContext)?.localUser?.token;

  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const { RenderAlertDialog, init, responseData } = useQuery(
    () => obtenerUsuarioPorIdService(parseInt(id ?? "0") ?? 0, token ?? ""),
    "Perfil Usuario",
    false,
    false
  );

  useEffect(() => {
    if (!id || !token) return;
    const query = async () => {
      await init();
    };
    query();
  }, [id, token]);

  useEffect(() => {
    if (responseData) setUsuario(adaptarUsuario(responseData));
  }, [responseData]);

  return (
    <>
      <RenderAlertDialog />
      {usuario != undefined && <VerPerfil usuario={usuario} />}
    </>
  );
}

export default PerfilPorId;
