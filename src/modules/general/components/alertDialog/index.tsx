import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  title: string;
  textContent?: string;
  children?: React.ReactNode;
}

const AlertDialog: React.FC<Props> = ({
  open,
  setOpen,
  title,
  textContent,
  children,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {textContent && (
            <DialogContentText id="alert-dialog-description">
              {textContent}
            </DialogContentText>
          )}
          {children && <Box>{children}</Box>}
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClose}>
            Rechazar
          </Button>
          <Button color="warning" onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
