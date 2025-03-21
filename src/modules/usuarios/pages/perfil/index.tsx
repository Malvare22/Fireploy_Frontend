import VerPerfil from "@modules/usuarios/components/perfil";
import { Usuario, usuarioEjemplo, usuarios } from "@modules/usuarios/types/usuario";


function VistaPerfil() {
  const usuario: Usuario = usuarios[0];

  return (

      <VerPerfil usuario={usuario} />

  );
}

export default VistaPerfil;
