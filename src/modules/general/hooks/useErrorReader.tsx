import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { rutasGeneral } from "../router/router";
import { ShowDialogParams } from "./useAlertDialog";

/**
 * Type definition for the function that shows a dialog.
 * The `showDialog` function accepts a `ShowDialogParams` object to configure
 * the dialog's appearance and behavior.
 */
type ShowDialogFn = (params: ShowDialogParams) => void;

/**
 * Custom hook to handle centralized error handling and display error dialogs.
 * This hook listens for error changes and shows a dialog with the error message
 * when an error occurs. It also handles specific logic such as navigating on 401 errors.
 *
 * @param showDialog - A function used to show the dialog with the error details.
 *
 * @returns An object containing the `setError` function to trigger the error state.
 */
function useErrorReader(showDialog: ShowDialogFn) {
  const [error, setError] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If there is no error, exit the effect early
    if (!error) return;

    // Show the error dialog with the provided error details
    showDialog({
      type: "error",
      title: "Error",
      message: error.message,
      isLoading: false,
      onAccept: () => {
        // Handle specific error status (e.g., 401 for unauthorized)
        if (error.statusCode === 401) {
          localStorage.clear(); // Clear the local storage on 401 error
          navigate(rutasGeneral.login); // Navigate to the login page
        }
      },
      onClose: undefined,
      reload: false,
      closeOnAccept: true
    });
  }, [error]);

  return {
    setError, // Function to set an error that triggers the dialog
  };
}

export default useErrorReader;
