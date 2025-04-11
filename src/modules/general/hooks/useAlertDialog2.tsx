import { useState } from "react";
import { AlertDialogTypes } from "../components/alertDialog";

export type ShowDialogParams = {
  type?: AlertDialogTypes;
  message: string;
  title?: string;
  isLoading?: boolean;
  onAccept?: () => void;
  onClose?: () => void;
  reload?: boolean;
};

function useAlertDialog2() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Atención");
  const [type, setType] = useState<AlertDialogTypes>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [handleAccept, setHandleAccept] = useState<() => void>(() => () => {});
  const [handleClose, setHandleClose] = useState<() => void>(() => () => {});

  function showDialog(options: ShowDialogParams) {
    const {
      type = "default",
      message,
      title = "Atención",
      isLoading = false,
      onAccept,
      onClose,
      reload = false,
    } = options;

    setType(type);
    setMessage(message);
    setTitle(title);
    setIsLoading(isLoading);

    setHandleAccept(() => () => {
      onAccept?.(); // ✅ ejecuta solo si está definida
      if (reload) window.location.reload();
      setOpen(false);
    });

    setHandleClose(() => () => {
      onClose?.();
      setOpen(false);
    });

    setOpen(true);
  }

  function isFinish() {
    setIsLoading(false);
  }

  return {
    open,
    type,
    title,
    message,
    isLoading,
    showDialog,
    handleAccept,
    handleClose,
    isFinish,
  };
}

export default useAlertDialog2;
