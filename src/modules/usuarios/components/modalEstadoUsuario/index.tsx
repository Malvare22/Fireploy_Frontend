import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton, { ButtonContainer } from "@modules/general/components/buttons";
import { AccountContext } from "@modules/general/context/accountContext";
import { LabelDialog } from "@modules/general/enums/labelDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import {
  LabelUsuario,
  obtenerDeshabilitarUsuario,
  obtenerHabilitarUsuario,
} from "@modules/usuarios/enum/labelGestionUsuarios";
import { modificarEstadoUsuario } from "@modules/usuarios/services/post.modificar.usuario";
import { Usuario } from "@modules/usuarios/types/usuario";
import { useContext } from "react";

/**
 * Propiedades del componente ModalEstadoUsuario.
 */
interface Props {
  /** Usuario a modificar */
  usuario: Usuario;
  /** Estado de apertura del modal */
  open: boolean;
  /** Función para cerrar el modal */
  handleClose: () => void;
}

/**
 * Componente ModalEstadoUsuario
 * 
 * Muestra un diálogo de confirmación para habilitar o deshabilitar un usuario.
 * 
 * @param {Usuario} usuario - Usuario al que se le cambiará el estado.
 * @param {boolean} open - Estado de visibilidad del modal.
 * @param {Function} handleClose - Función para cerrar el modal.
 * @returns {JSX.Element} Modal para cambiar el estado del usuario.
 */
const ModalEstadoUsuario: React.FC<Props> = ({ usuario, open, handleClose }) => {
  /** Token de autenticación del usuario */
  const token = useContext(AccountContext)?.localUser?.token;

  /**
   * Obtiene el título del modal dependiendo del estado del usuario.
   * 
   * @returns {string} Título del modal.
   */
  const titulo = () => {
    return usuario.estado == "A"
      ? LabelUsuario.deshabilitar
      : LabelUsuario.habilitar;
  };

  /**
   * Obtiene el mensaje del cuerpo del modal dependiendo del estado del usuario.
   * 
   * @returns {string} Mensaje del cuerpo del modal.
   */
  const cuerpo = () => {
    return usuario.estado == "A"
      ? obtenerDeshabilitarUsuario(usuario)
      : obtenerHabilitarUsuario(usuario);
  };

  /** Estados y funciones para manejar alertas */
  const {
    message,
    open: _open,
    setMessage,
    setOpen: _setOpen,
    title,
    setTitle,
  } = useAlertDialog();

  /**
   * Ejecuta la consulta para modificar el estado del usuario.
   * Si el usuario está activo ("A"), se deshabilita ("I") y viceversa.
   */
  const ejecutarConsulta = async () => {
    if (!token) return;
    const nuevoEstado = usuario.estado == "A" ? "I" : "A";
    const response = await modificarEstadoUsuario(usuario.id, token, nuevoEstado);

    if (response.error) {
      _setOpen(true);
      setTitle(response.error.error);
      setMessage(response.error.message[0]);
    } else {
      _setOpen(true);
      setMessage(LabelDialog.guardadoExitoso);
    }
  };

  return (
    <>
      {/* Modal de alerta en caso de error o éxito */}
      <AlertDialog
        cuerpo={message}
        open={_open}
        titulo={title}
        reloader={true}
        setOpen={_setOpen}
      />

      {/* Modal de confirmación para cambiar el estado del usuario */}
      <AlertDialog
        open={open}
        titulo={titulo()}
        cuerpo={cuerpo()}
        botones={
          <ButtonContainer>
            <GeneralButton mode={buttonTypes.save} onClick={ejecutarConsulta} />
            <GeneralButton mode={buttonTypes.cancel} onClick={handleClose} />
          </ButtonContainer>
        }
      />
    </>
  );
};

export default ModalEstadoUsuario;
