import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }

  return { open, setOpen};
}

export default useAlertDialog;
