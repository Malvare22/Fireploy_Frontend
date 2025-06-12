import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface Props {
  title: string;
  content: React.ReactNode;
  actions: React.ReactNode;
  open: boolean;
}

/**
 * AlertDialogCustom component – a flexible and reusable Material-UI dialog 
 * for displaying custom content and actions within a modal window.
 * 
 * This component allows full control over the dialog body and action buttons
 * by accepting external elements as props, enabling high customization.
 * 
 * @component
 * 
 * @param title The text displayed as the dialog's title at the top.
 * @param content A React element rendered inside the dialog's main content area.
 * @param actions A React element rendered inside the dialog's action area (typically buttons).
 * @param open Boolean value that determines whether the dialog is visible.
 * 
 * @returns A customizable Material-UI Dialog component with user-defined content and actions.
 * 
 * @example
 * ```tsx
 * <AlertDialogCustom
 *   title="Custom Dialog"
 *   open={true}
 *   content={<div>This is the dialog content</div>}
 *   actions={
 *     <Button onClick={handleClose}>Close</Button>
 *   }
 * />
 * ```
 */
const AlertDialogCustom: React.FC<Props> = ({ actions, content, open, title }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ maxHeight: "70vh", overflowY: "scroll" }}
      >
        <Box>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        </Box>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialogCustom;
