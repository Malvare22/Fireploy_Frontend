import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const defaultTitle = 'Aviso';

  return { open, setOpen, defaultTitle, setMessage, message };
}

export default useAlertDialog;
