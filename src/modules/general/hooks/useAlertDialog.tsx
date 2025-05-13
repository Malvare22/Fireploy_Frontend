import { useState } from "react";
import { AlertDialogTypes } from "../components/alertDialog";

/**
 * Type definition for the parameters passed to the `showDialog` function.
 *
 * This type specifies the options that can be used to configure the dialog's
 * appearance and behavior, such as the dialog type, message, title, loading state,
 * and callback functions for when the user accepts or closes the dialog.
 * 
 * @typedef {Object} ShowDialogParams
 * @property {AlertDialogTypes} [type="default"] - The type of the dialog (e.g., "default", "error", etc.).
 * @property {string} message - The message to display in the dialog. This field is required.
 * @property {string} [title="Atención"] - The title of the dialog.
 * @property {boolean} [isLoading=false] - Flag to indicate whether the dialog shows a loading spinner.
 * @property {Function} [onAccept] - Callback function executed when the user accepts the dialog.
 * @property {Function} [onCancel] - Callback function executed when the user closes the dialog.
 * @property {boolean} [reload=false] - Flag to indicate whether the page should reload after accepting the dialog.
 * @property {boolean} [_closeOnAccept=false] - Flag to close the dialog after acceptance.
 */
export type ShowDialogParams = {
  type?: AlertDialogTypes;
  message: string;
  title?: string;
  isLoading?: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
  reload?: boolean;
  _closeOnAccept?: boolean;
};

/**
 * Custom hook that manages the state and behavior of an alert dialog.
 *
 * This hook provides functions to display the dialog (`showDialog`), handle the
 * acceptance and closing actions, and manage loading and other dialog states.
 * 
 * @returns {Object} The state and actions for managing the alert dialog.
 * @returns {boolean} open - Whether the dialog is currently open.
 * @returns {AlertDialogTypes} type - The current type of the dialog (e.g., "default", "error").
 * @returns {string} title - The title of the dialog.
 * @returns {string} message - The message to display in the dialog.
 * @returns {boolean} isLoading - Whether the dialog is in a loading state.
 * @returns {Function} showDialog - Function to open the dialog with custom configuration.
 * @returns {Function} handleAccept - Function to handle the acceptance action.
 * @returns {Function} handleCancel - Function to handle the cancellation action.
 * @returns {Function} setOpen - Function to explicitly set the dialog's open state.
 * @returns {Function} setIsLoading - Function to set the loading state of the dialog.
 * @returns {Function} handleOpen - Function to open the dialog.
 * @returns {Function} handleClose - Function to close the dialog.
 */
function useAlertDialog() {
  // State variables to manage dialog properties
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Atención");
  const [type, setType] = useState<AlertDialogTypes>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [handleAccept, setHandleAccept] = useState<() => void>(() => () => {});
  const [handleCancel, setHandleCancel] = useState<undefined | (() => void)>(undefined);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
   * Function to show the dialog with the provided options.
   *
   * @param {ShowDialogParams} options - The configuration options for the dialog, including type, message,
   *                  title, loading state, and callback functions.
   */
  function showDialog(options: ShowDialogParams) {
    const {
      type = "default",
      message,
      title = "Atención",
      onAccept,
      onCancel,
      reload = false,
      _closeOnAccept = false,
      isLoading = false,
    } = options;

    // Update dialog state with provided options
    setType(type);
    setMessage(message);
    setTitle(title);
    setIsLoading(isLoading);

    // Set the accept handler with the provided callback
    setHandleAccept(() => () => {
      onAccept?.();
      if (_closeOnAccept) handleClose();
      if (reload) window.location.reload(); // Reloads the page if specified
    });

    // Set the close handler with the provided callback
    setHandleCancel(
      onCancel
        ? () => () => {
            onCancel(); // Executes if onClose is defined
            setOpen(false); // Close the dialog after closure
          }
        : undefined
    );

    setOpen(true); // Open the dialog
  }

  return {
    open,
    type,
    title,
    message,
    isLoading,
    showDialog,
    handleAccept,
    handleCancel,
    setOpen,
    setIsLoading,
    handleOpen,
    handleClose,
  };
}

export default useAlertDialog;
