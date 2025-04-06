import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return { open, setOpen, handleClose, handleOpen };
}

export default useAlertDialog;
