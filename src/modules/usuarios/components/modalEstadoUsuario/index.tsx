import AlertDialog from "@modules/general/components/alertDialog";
import BotonesBasicos from "@modules/general/components/botonesBasicos";
import { AccountContext } from "@modules/general/context/accountContext";
import { LabelDialog } from "@modules/general/enums/labelDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import {
  LabelUsuario,
  obtenerDeshabilitarUsuario,
  obtenerHabilitarUsuario,
} from "@modules/usuarios/enum/LabelUsuario";
import { modificarEstadoUsuario } from "@modules/usuarios/services/modificarUsuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { useContext } from "react";

interface Props {
  usuario: Usuario;
  open: boolean;
  handleClose: () => void;
}

const ModalEstadoUsuario: React.FC<Props> = ({
  usuario,
  open,
  handleClose,
}) => {
  const token = useContext(AccountContext)?.localUser?.token;

  const titulo = () => {
    return usuario.estado == "A"
      ? LabelUsuario.deshabilitar
      : LabelUsuario.habilitar;
  };

  const cuerpo = () => {
    return usuario.estado == "A"
      ? obtenerDeshabilitarUsuario(usuario)
      : obtenerHabilitarUsuario(usuario);
  };

  const {
    message,
    open: _open,
    setMessage,
    setOpen: _setOpen,
    title,
    setTitle,
  } = useAlertDialog();

  const ejecutarConsulta = async () => {
    if (!token) return;
    const nuevoEstado = usuario.estado == "A" ? "I" : "A";
    const response = await modificarEstadoUsuario(
      usuario.id,
      token,
      nuevoEstado
    );
    if (response.error) {
      _setOpen(true);
      setTitle(response.error.error);
      setMessage(response.error.message[0]);
    }
    else{
      _setOpen(true);
      setMessage(LabelDialog.guardadoExitoso);
    }
  };

  return (
    <>
      <AlertDialog
        cuerpo={message}
        open={_open}
        titulo={title}
        reloader={true}
        setOpen={_setOpen}
      />
      {
        <AlertDialog
          open={open}
          titulo={titulo()}
          cuerpo={cuerpo()}
          botones={
            <BotonesBasicos aceptar={ejecutarConsulta} cancelar={handleClose} />
          }
        ></AlertDialog>
      }
    </>
  );
};

export default ModalEstadoUsuario;
