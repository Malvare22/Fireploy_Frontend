import Perfil from "@modules/usuarios/components/perfil";
import { usuarioTemplate } from "@modules/usuarios/types/usuario";

function CrearUsuario() {

    const usuario = usuarioTemplate;

    return (
        <>
          { <Perfil usuario={usuario} type="crear"/>}
        </>
      );
}

export default CrearUsuario;