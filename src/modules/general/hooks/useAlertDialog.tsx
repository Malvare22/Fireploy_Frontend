import { useState } from "react";

/**
 * Hook para el uso de componentes AlertDialog
 * @returns {Object} Estado y funciones para controlar el AlertDialog.
 * @returns {boolean} open - Estado que indica si el diálogo está abierto o cerrado.
 * @returns {Function} setOpen - Función para actualizar el estado de `open`.
 * @returns {string} message - Mensaje mostrado en el diálogo.
 * @returns {Function} setMessage - Función para actualizar el mensaje del diálogo.
 * @returns {string} title - Título del diálogo.
 * @returns {Function} setTitle - Función para actualizar el título del diálogo.
 */
function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('¿Está seguro de realizar la acción?');
  const [title, setTitle] = useState('Aviso');

  return { open, setOpen, setMessage, message, title, setTitle };
}

export default useAlertDialog;
