import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import { proyectosPrueba } from "@modules/proyectos/test/datos/proyectos.prueba";
import Portafolio from "@modules/usuarios/components/portafolio";
import { obtenerUsuarioPorIdService } from "@modules/usuarios/services/obtenerUsuarioPorId";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerPortafolioPorId() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const token = useContext(AccountContext)?.localUser?.token;

  const {RenderAlertDialog, init, responseData} = useQuery<UsuarioService>(() => obtenerUsuarioPorIdService(parseInt(id ?? '0'), token ?? ''), 'Portafolios', false, false);

  useEffect(() => {
    if (!id || !token) return;
    const response = async () => {
     await init();
    };
    response();  
  }, [id, token]);

  useEffect(() => {
    if (!responseData) return;
    setUsuario(adaptarUsuario(responseData));
  }, [responseData]);

  return (
    <>
    <RenderAlertDialog/>
      {usuario != undefined && (
        <Portafolio usuario={usuario} proyectos={proyectosPrueba} />
      )}
    </>
  );
}

export default VerPortafolioPorId;
