import VerPerfil from "@modules/usuarios/components/perfil";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@modules/general/context/accountContext";
import { LoaderContext } from "@modules/general/context/loaderContext";
import { obtenerUsuarioPorId } from "@modules/usuarios/services/obtenerUsuarioPorId";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/adaptar.usuario";

function Perfil() {
  
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const setLoader = useContext(LoaderContext)?.setLoading;

  const localUser = useContext(AccountContext)?.localUser;

  
  useEffect(() => {
        
    if (!localUser) return;

    const _id = localUser.id;
    const _token = localUser.token; 
    
    // setLoader(true);

    const consulta = async () => {
      const _usuario = await obtenerUsuarioPorId(_id, _token);

      if(_usuario.data) setUsuario(adaptarUsuario(_usuario.data));
    };

    consulta();

    return () => {
      // setLoader(false);
    };

  }, [localUser?.id]);

  return <>{usuario != undefined ? <VerPerfil usuario={usuario} /> : <></>}</>;
}

export default Perfil;
