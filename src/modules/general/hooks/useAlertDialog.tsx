import { useState } from "react";
import { AlertDialogTypes } from "../components/alertDialog";

function useAlertDialog() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [type, setType] = useState<AlertDialogTypes>("default");

  const [handleAcceptFn, setHandleAcceptFn] = useState<() => void>(() => () => {});
  const [handleCloseFn, setHandleCloseFn] = useState<() => void>(() => () => {});

  function resetAlerDialog(
    type: AlertDialogTypes,
    message: string,
    handleAcceptFn: () => {},
    handleCloseFn?: () => {}
  ) {
    setMessage(message);
    setHandleAcceptFn(handleAcceptFn);
    if (handleCloseFn) {
      setHandleCloseFn(handleCloseFn);
    }
    setType(type);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return {
    open,
    setOpen,
    handleClose,
    handleOpen,
    resetAlerDialog,
    handleAcceptFn,
    handleCloseFn,
    type,
    message
  };
}

export default useAlertDialog;
