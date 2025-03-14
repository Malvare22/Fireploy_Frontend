import { useState } from "react";

/**
 * Hook personalizado para gestionar el estado de un modal.
 * 
 * @returns {object} Un objeto con el estado del modal y funciones para abrir y cerrar.
 * @property {boolean} open - Indica si el modal está abierto o cerrado.
 * @property {() => void} handleOpen - Función para abrir el modal.
 * @property {() => void} handleClose - Función para cerrar el modal.
 */
export const useModal = () => {
  const [open, setOpen] = useState(false);

  /**
   * Abre el modal estableciendo el estado en `true`.
   */
  const handleOpen = () => setOpen(true);

  /**
   * Cierra el modal estableciendo el estado en `false`.
   */
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
};
