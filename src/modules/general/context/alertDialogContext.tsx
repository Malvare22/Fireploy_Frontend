import React, { createContext, useContext } from "react";
import useAlertDialog, { ShowDialogParams } from "../hooks/useAlertDialog";
import { AlertDialogTypes } from "../components/alertDialog";


type AlertDialogContextType = {
  open: boolean;
  type: AlertDialogTypes;
  title: string;
  message: string;
  isLoading: boolean;
  showDialog: (options: ShowDialogParams) => void;
  handleAccept: () => void;
  handleCancel?: () => void;
  setOpen: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
};


/**
 * Internal context instance for the alert dialog.
 * Should not be accessed directly outside the provider.
 */
const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

/**
 * useAlertDialogContext hook – retrieves the context value for the AlertDialogContext.
 * Must be used within an `AlertDialogProvider` or it will throw an error.
 * 
 * @returns {AlertDialogContextType} The current context for managing the alert dialog.
 * @throws Will throw an error if used outside of `AlertDialogProvider`.
 * 
 * @example
 * ```tsx
 * const { open, showDialog } = useAlertDialogContext();
 * ```
 */
export const useAlertDialogContext = (): AlertDialogContextType => {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("useAlertDialogContext must be used within AlertDialogProvider");
  return context;
};

/**
 * AlertDialogProvider component – context provider for managing alert dialog state.
 * Wraps part of the application where the dialog state should be accessible.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the context.
 * 
 * @returns {JSX.Element} A context provider for alert dialog functionality.
 * 
 * @example
 * ```tsx
 * <AlertDialogProvider>
 *   <App />
 * </AlertDialogProvider>
 * ```
 */
export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dialog = useAlertDialog();

  return <AlertDialogContext.Provider value={dialog}>{children}</AlertDialogContext.Provider>;
};
