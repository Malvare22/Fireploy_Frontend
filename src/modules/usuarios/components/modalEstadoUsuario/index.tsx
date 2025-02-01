import AlertDialog from "@modules/general/components/alertDialog";
import BotonesBasicos from "@modules/general/components/botonesBasicos";
import { LabelUsuario, obtenerDeshabilitarUsuario, obtenerHabilitarUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { Usuario } from "@modules/usuarios/types/usuario";

interface Props{
  usuario: Usuario;
  open: boolean;
  handleClose: () => void; 
}

const ModalEstadoUsuario: React.FC<Props> = ({usuario, open, handleClose}) => {

  const titulo = () => {
    return usuario.estado == 'A' ? LabelUsuario.deshabilitar : LabelUsuario.habilitar;
  };

  const cuerpo = () => {
    return usuario.estado == 'A' ? obtenerDeshabilitarUsuario(usuario) : obtenerHabilitarUsuario(usuario);
  };

  const ejecutarConsulta = () => {
    return usuario.estado == 'A' ? () => (console.log('Deshabilitado')) : () => (console.log('Habilitado'));
  };

  return (
    <>
      {<AlertDialog open={open} titulo={titulo()} cuerpo={cuerpo()} botones={<BotonesBasicos aceptar={ejecutarConsulta()} cancelar={handleClose}/>}>
      
    </AlertDialog>}
    </>
  )
}

export default ModalEstadoUsuario