import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { rutasGeneral } from "../router/router";
import { ShowDialogParams } from "./useAlertDialog";

type SpecialErrorTypes = 'FRONTEND_ERROR'
export class SpecialError extends Error {
  type: SpecialErrorTypes;

  constructor(message: string, type: SpecialErrorTypes) {
    super(message);
    this.name = "SpecialError";
    this.type = type;
  }
}

export const specialError = {type: 'FRONTEND_ERROR'};
/**
 * Type definition for the function that shows a dialog.
 * The `showDialog` function accepts a `ShowDialogParams` object to configure
 * the dialog's appearance and behavior.
 * 
 * @typedef {Function} ShowDialogFn
 * @param {ShowDialogParams} params - The parameters to configure the dialog.
 */
type ShowDialogFn = (params: ShowDialogParams) => void;

/**
 * Custom hook to handle centralized error handling and display error dialogs.
 * This hook listens for error changes and shows a dialog with the error message
 * when an error occurs. It also handles specific logic such as navigating on 401 errors.
 * 
 * @component
 * @param {ShowDialogFn} showDialog - A function used to show the dialog with the error details.
 * 
 * @returns {Object} - An object containing the `setError` function to trigger the error state.
 * @returns {Function} setError - Function to trigger the error state, causing the error dialog to be displayed.
 * 
 * @example
 * const { setError } = useErrorReader(showDialog);
 * setError(new Error("Something went wrong!"));
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
        if (error instanceof SpecialError && error.type === 'FRONTEND_ERROR') {
          navigate(rutasGeneral.detectAnomaly);
        }
      },
      onCancel: undefined,
      reload: false,
      _closeOnAccept: true
    });
  }, [error]);

  return {
    setError, // Function to set an error that triggers the dialog
  };
}

export default useErrorReader;
