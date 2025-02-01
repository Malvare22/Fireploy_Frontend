import { useParams } from "react-router-dom";
import VerPerfil from "@modules/usuarios/components/perfil";
import { useEffect, useState } from "react";
import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";

function PerfilPorId() {
  const { id } = useParams();

  if (!id) return <></>;

  const [usuario, setUsuario] = useState<UsuarioPlano | undefined>(undefined);

  useEffect(() => {
    const _usuario = usuariosPrueba.find((_usuario) => {
      return _usuario.id == parseInt(id);
    });
    setUsuario(_usuario);
  }, []);

  return <>{usuario != undefined ? <VerPerfil usuario={usuario} /> : <></>}</>;
}

export default PerfilPorId;
