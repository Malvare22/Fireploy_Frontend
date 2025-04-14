import { useState } from "react";

/**
 * Custom hook for managing the state of a spring modal (a modal that can be opened and closed).
 *
 * This hook provides the state of the modal (`open`), and functions to open and close the modal (`handleOpen`, `handleClose`).
 *
 * @returns An object containing:
 * - `open`: A boolean value representing whether the modal is open or closed.
 * - `handleOpen`: A function to open the modal.
 * - `handleClose`: A function to close the modal.
 */
export default function useSpringModal() {
  const [open, setOpen] = useState(false); // State to manage the modal visibility

  /**
   * Function to open the modal by setting `open` state to true.
   */
  const handleOpen = () => setOpen(true);

  /**
   * Function to close the modal by setting `open` state to false.
   */
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose }; // Return the modal state and functions to control it
}
