import { useNavigate } from "react-router";
import AlertDialog from "../alertDialog";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { Alert, Typography } from "@mui/material";

type CustomError = Error & {
    statusCode?: number;
  };  

type Props = {
  error: CustomError;
  handleClose: () => void;
  open: boolean;
  title: string;
};
function AlertDialogError({ error, handleClose, open, title }: Props) {
  const navigate = useNavigate();

  function onClose() {
    if (error.statusCode == 401) {
      navigate(rutasUsuarios.logout);
    } else handleClose();
  }

  function body() {
    return (
      <Alert severity="error">
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{error.message}</Typography>
      </Alert>
    );
  }

  return <AlertDialog handleAccept={onClose} open={open} body={body()} title={title} />;
}

export default AlertDialogError;
