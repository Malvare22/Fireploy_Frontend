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
  onClose?: () => void;

  /**
   * A flag to indicate whether the page should reload after accepting the dialog.
   * Defaults to false if not provided.
   */
  reload?: boolean;
};

/**
 * Custom hook that manages the state and behavior of an alert dialog.
 *
 * This hook provides functions to display the dialog (`showDialog`), handle the
 * acceptance and closing actions, and manage loading and other dialog states.
 */
function useAlertDialog2() {
  // State variables to manage dialog properties
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Atención");
  const [type, setType] = useState<AlertDialogTypes>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [handleAccept, setHandleAccept] = useState<() => void>(() => () => {});
  const [handleClose, setHandleClose] = useState<() => void>(() => () => {});

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
      isLoading = false,
      onAccept,
      onClose,
      reload = false,
    } = options;

    // Update dialog state with provided options
    setType(type);
    setMessage(message);
    setTitle(title);
    setIsLoading(isLoading);

    // Set the accept handler with the provided callback
    setHandleAccept(() => () => {
      onAccept?.(); // ✅ Executes only if onAccept is defined
      if (reload) window.location.reload(); // Reloads the page if specified
    });

    // Set the close handler with the provided callback
    setHandleClose(() => () => {
      onClose?.(); // Executes if onClose is defined
      setOpen(false); // Close the dialog after closure
    });

    setOpen(true); // Open the dialog
  }

  /**
   * Function to mark the dialog as finished, typically used to stop showing the loading spinner.
   */
  function isFinish() {
    setIsLoading(false);
  }

  return {
    open,
    type,
    title,
    message,
    isLoading,
    showDialog,
    handleAccept,
    handleClose,
    isFinish,
  };
}

export default useAlertDialog2;
