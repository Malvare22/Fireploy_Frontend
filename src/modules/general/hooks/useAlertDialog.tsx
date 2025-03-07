import { useState } from "react";

function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('¿Está seguro de realizar la acción?');
  const [title, setTitle] = useState('Aviso');

  return { open, setOpen, setMessage, message, title, setTitle };
}

export default useAlertDialog;
