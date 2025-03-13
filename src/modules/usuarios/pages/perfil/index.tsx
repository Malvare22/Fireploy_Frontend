import VerPerfil from "@modules/usuarios/components/perfil";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@modules/general/context/accountContext";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";
import { obtenerUsuarioPorIdService } from "@modules/usuarios/services/obtenerUsuarioPorId";

function Perfil() {
  
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  // const setLoader = useContext(LoaderContext)?.setLoading;

  const localUser = useContext(AccountContext)?.localUser;

  
  useEffect(() => {
        
    if (!localUser) return;

    const _id = localUser.id;
    const _token = localUser.token;
    
    // setLoader(true);

    const consulta = async () => {
      const _usuario = await obtenerUsuarioPorIdService(_id, _token);

      if(_usuario.data) setUsuario(adaptarUsuario(_usuario.data));
    };

    consulta();

  }, [localUser?.id]);

  return <>{usuario != undefined ? <VerPerfil usuario={usuario} /> : <></>}</>;
}

export default Perfil;
