import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const defaultTitle = 'Aviso';
  const [title, setTitle] = useState(defaultTitle);

  return { open, setOpen, defaultTitle, setMessage, message, title, setTitle };
}

export default useAlertDialog;
