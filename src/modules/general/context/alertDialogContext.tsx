import React, { createContext, useContext } from "react";
import useAlertDialog, { ShowDialogParams } from "../hooks/useAlertDialog";
import AlertDialog, { AlertDialogTypes } from "../components/alertDialog";

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

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export const useAlertDialogContext = (): AlertDialogContextType => {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("useAlertDialogContext must be used within AlertDialogProvider");
  return context;
};

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dialog = useAlertDialog();

  const { handleAccept, handleCancel, isLoading, open, title, type, message } = dialog;

  return (
    <AlertDialogContext.Provider value={dialog}>
      {children}
      {open && (
        <AlertDialog
          handleAccept={handleAccept}
          open={open}
          title={title}
          isLoading={isLoading}
          type={type}
          textBody={message}
          handleCancel={handleCancel}
        />
      )}
    </AlertDialogContext.Provider>
  );
};
