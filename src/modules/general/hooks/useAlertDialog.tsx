import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
}

export default useAlertDialog;
