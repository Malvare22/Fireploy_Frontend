import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { rutasGeneral } from "@modules/general/router/routes";
import { ShowDialogParams } from "./useAlertDialog";

type SpecialErrorTypes = 'FRONTEND_ERROR'

/**
 * SpecialError class – custom error type for identifying frontend-specific exceptions.
 * 
 * Used to differentiate app-specific frontend errors from general errors.
 * 
 * @class
 * 
 * @extends {Error}
 * 
 * @param {string} message - The error message to be displayed.
 * @param {SpecialErrorTypes} type - The specific type of the special error.
 */
export class SpecialError extends Error {
  type: SpecialErrorTypes;

  constructor(message: string, type: SpecialErrorTypes) {
    super(message);
    this.name = "SpecialError";
    this.type = type;
  }
}

/**
 * specialError – constant instance to represent a known frontend error type.
 * 
 * @constant
 * @type {{ type: SpecialErrorTypes }}
 */
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
 * useErrorReader hook – centralized error handler with built-in dialog integration.
 * 
 * Monitors errors and displays a configured alert dialog when an error is detected.
 * Supports automatic navigation behavior on certain error codes or custom error types.
 * 
 * @hook
 * 
 * @param {ShowDialogFn} showDialog - Function used to open the error dialog with configuration options.
 * 
 * @returns {Object} An object with the `setError` function to trigger error handling behavior.
 * @returns {Function} setError - Function to trigger an error and display the corresponding dialog.
 * 
 * @example
 * ```tsx
 * const { setError } = useErrorReader(showDialog);
 * setError(new Error("Something went wrong!"));
 * ```
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
