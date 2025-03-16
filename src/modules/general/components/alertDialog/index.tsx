import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import GeneralButton from "../buttons";
import { buttonTypes } from "@modules/general/types/buttons";

/**
 * @interface Props
 * @description Propiedades del componente AlertDialog.
 * @property {string} titulo - Título del diálogo.
 * @property {React.ReactNode} [botones] - Botones personalizados a mostrar en el diálogo.
 * @property {string | undefined} cuerpo - Texto principal del diálogo.
 * @property {React.ReactNode} [children] - Contenido adicional dentro del diálogo.
 * @property {boolean} open - Estado que indica si el diálogo está abierto o cerrado.
 * @property {React.Dispatch<boolean>} [setOpen] - Función para actualizar el estado de apertura del diálogo.
 * @property {boolean} [reloader] - Indica si se debe recargar la página al cerrar el diálogo.
 */
interface Props {
  titulo: string;
  botones?: React.ReactNode;
  cuerpo: string | undefined;
  children?: React.ReactNode;
  open: boolean;
  setOpen?: React.Dispatch<boolean>;
  reloader?: boolean;
}

/**
 * Componente AlertDialog
 * 
 * Muestra un cuadro de diálogo con un título, un cuerpo de mensaje y botones de acción.
 * Puede incluir contenido adicional a través de `children` y permite definir botones personalizados.
 *
 * @component
 * @param {Props} props - Propiedades del componente.
 * @param {string} props.titulo - Título del cuadro de diálogo.
 * @param {string | undefined} props.cuerpo - Contenido principal del diálogo.
 * @param {React.ReactNode} [props.botones] - Botones personalizados.
 * @param {React.ReactNode} [props.children] - Contenido adicional dentro del diálogo.
 * @param {boolean} props.open - Controla si el diálogo está abierto o cerrado.
 * @param {React.Dispatch<boolean>} [props.setOpen] - Función para actualizar el estado de apertura.
 * @param {boolean} [props.reloader] - Si es `true`, recarga la página al cerrar el diálogo.
 * @returns {JSX.Element} Componente de diálogo.
 */
const AlertDialog: React.FC<Props> = ({
  titulo,
  cuerpo,
  botones,
  children,
  open,
  setOpen,
  reloader = false
}) => {

  /**
   * Cierra el diálogo. Si `reloader` es `true`, recarga la página.
   */
  const handleClose = () => {
    if (setOpen) setOpen(false);
    if (reloader) window.location.reload();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{
          color: 'white'
        }}>
          <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        </Box>
        <DialogContent>
          {cuerpo && (
            <DialogContentText id="alert-dialog-description">
              {cuerpo}
            </DialogContentText>
          )}
          {children && <Box>{children}</Box>}
        </DialogContent>
        <DialogActions>
          {botones ? (
            botones
          ) : setOpen ? (
            <GeneralButton mode={buttonTypes.accept} onClick={handleClose} />
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
