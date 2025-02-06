import Portafolio from "@modules/usuarios/components/portafolio";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptarUsuario } from "@modules/usuarios/utils/usuario.adapter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerPortafolioPorId() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const _usuario = usuariosPrueba.find(
        (usuario) => usuario.id == parseInt(id as string)
      );
      if (_usuario) {
        setUsuario(adaptarUsuario(_usuario));
      }
      console.log(_usuario);
    }
  }, []);

  return (
    <>
      {usuario != undefined && (
        <Portafolio usuario={usuario} proyectos={usuario.proyectos} />
      )}
    </>
  );
}

export default VerPortafolioPorId;
