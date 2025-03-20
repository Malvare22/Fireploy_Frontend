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
  title: string;
  body: React.ReactNode;
  actions: React.ReactNode;
  open: boolean;
  handleClose: () => void
}

const AlertDialog: React.FC<Props> = ({
  title,
  actions,
  open,
  body
}) => {

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
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        </Box>
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
