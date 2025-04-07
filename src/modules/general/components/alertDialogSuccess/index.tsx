import { useNavigate } from "react-router";
import AlertDialog from "../alertDialog";
import { Alert, Typography } from "@mui/material";

export type CustomError = Error & {
  statusCode?: number;
};

type Props = {
  handleClose: () => void;
  open: boolean;
  title: string;
  reload?: boolean;
  message: string;
};
function AlertDialogSuccess({ handleClose, open, title, reload = true, message }: Props) {
  const navigate = useNavigate();

  function onClose() {
    if (reload) {
      navigate(0);
    } else handleClose();
  }

  function body() {
    return (
      <Alert severity="info">
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{message}</Typography>
      </Alert>
    );
  }

  return <AlertDialog handleAccept={onClose} open={open} body={body()} title={title} />;
}

export default AlertDialogSuccess;
