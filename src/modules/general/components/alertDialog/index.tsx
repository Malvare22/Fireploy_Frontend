import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { palette } from "@core/themes";
import GeneralButton from "../buttons";
import { buttonTypes } from "@modules/general/types/buttons";

interface Props {
  titulo: string;
  botones?: React.ReactNode;
  cuerpo: string | undefined;
  children?: React.ReactNode;
  open: boolean;
  setOpen?: React.Dispatch<boolean>;
  reloader?: boolean
}

const AlertDialog: React.FC<Props> = ({
  titulo,
  cuerpo,
  botones,
  children,
  open,
  setOpen,
  reloader = false
}) => {

  const handleClose = () => {
    if(setOpen) setOpen(false);
    if(reloader) window.location.reload();
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{
          backgroundColor: palette.modalHeader.main,
          color: 'white'
        }}><DialogTitle id="alert-dialog-title">{titulo}</DialogTitle></Box>
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
            <GeneralButton mode={buttonTypes.accept} onClick={handleClose}/>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
