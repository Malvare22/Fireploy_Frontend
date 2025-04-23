import { useState } from "react";
import { AlertDialogTypes } from "../components/alertDialog";

/**
 * Type definition for the parameters passed to the `showDialog` function.
 *
 * This type specifies the options that can be used to configure the dialog's
 * appearance and behavior, such as the dialog type, message, title, loading state,
 * and callback functions for when the user accepts or closes the dialog.
 */
export type ShowDialogParams = {
  /**
   * The type of the dialog. Defaults to "default" if not provided.
   */
  type?: AlertDialogTypes;

  /**
   * The message to display in the dialog. This field is required.
   */
  message: string;

  /**
   * The title of the dialog. Defaults to "Atención" if not provided.
   */
  title?: string;

  /**
   * A flag to indicate whether the dialog should show a loading spinner.
   * Defaults to false if not provided.
   */
  isLoading?: boolean;

  /**
   * Callback function to be executed when the user accepts the dialog.
   */
  onAccept?: () => void;

  /**
   * Callback function to be executed when the dialog is closed.
   */
  onCancel?: () => void;

  /**
   * A flag to indicate whether the page should reload after accepting the dialog.
   * Defaults to false if not provided.
   */
  reload?: boolean;

  _closeOnAccept?: boolean;

};

/**
 * Custom hook that manages the state and behavior of an alert dialog.
 *
 * This hook provides functions to display the dialog (`showDialog`), handle the
 * acceptance and closing actions, and manage loading and other dialog states.
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
   * @param options - The configuration options for the dialog, including type, message,
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
      _closeOnAccept = false
    } = options;

    // Update dialog state with provided options
    setType(type);
    setMessage(message);
    setTitle(title);
    setIsLoading(isLoading);

    // Set the accept handler with the provided callback
    setHandleAccept(() => () => {
      onAccept?.();
      if(_closeOnAccept) handleClose();
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
