import { useState } from "react";

/**
 * useModal – custom React hook for managing modal open/close state.
 * 
 * This hook encapsulates the logic for controlling the visibility of a modal component.
 * It provides a boolean state `open`, along with handler functions `handleOpen` and `handleClose`
 * to update that state accordingly.
 * 
 * @hook
 * 
 * @returns {{ open: boolean, handleOpen: () => void, handleClose: () => void }} 
 * An object containing the modal's open state and control functions.
 * 
 * @example
 * ```tsx
 * const { open, handleOpen, handleClose } = useModal();
 * 
 * return (
 *   <>
 *     <Button onClick={handleOpen}>Open Modal</Button>
 *     <Modal open={open} handleClose={handleClose}>
 *       <p>Modal content here</p>
 *     </Modal>
 *   </>
 * );
 * ```
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
