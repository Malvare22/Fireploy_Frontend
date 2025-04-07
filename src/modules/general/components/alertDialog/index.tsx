import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Stack, Typography } from "@mui/material";

/**
 * @interface Props
 * @description Properties for the AlertDialog component.
 * @property {string} title - Title of the dialog.
 * @property {React.ReactNode} [body] - Optional custom content inside the dialog.
 * @property {string} [textBody] - Main text of the dialog (used if `body` is not provided).
 * @property {() => void} handleAccept - Function executed when the accept button is clicked.
 * @property {() => void} [handleCancel] - Optional function executed when the cancel button is clicked.
 * @property {boolean} open - State indicating whether the dialog is open or closed.
 */
interface Props {
  title: string;
  body?: React.ReactNode;
  textBody?: string;
  handleAccept: () => void;
  handleCancel?: () => void;
  open: boolean;
  isLoading?: boolean;
}

/**
 * AlertDialog Component
 *
 * A reusable dialog component that displays a title, a message, and action buttons.
 *
 * @component
 * @param {Props} props - Properties of the AlertDialog component.
 * @param {string} props.title - The dialog's title.
 * @param {React.ReactNode} [props.body] - Optional custom content inside the dialog.
 * @param {string} [props.textBody] - The main text displayed in the dialog if `body` is not provided.
 * @param {() => void} props.handleAccept - Function executed when clicking the accept button.
 * @param {() => void} [props.handleCancel] - Optional function executed when clicking the cancel button.
 * @param {boolean} props.open - Boolean indicating whether the dialog is open or not.
 * @returns {JSX.Element} A modal dialog with an optional message and action buttons.
 */
const AlertDialog: React.FC<Props> = ({
  title,
  handleAccept,
  open,
  body,
  handleCancel,
  textBody,
  isLoading
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        </Box>
        <DialogContent>
          {body || (
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{textBody}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2}>
            {handleAccept && (
              <Box>
                <Button variant="contained" loading={isLoading} onClick={handleAccept}>
                  Accept
                </Button>
              </Box>
            )}
            {handleCancel && (
              <Box>
                <Button variant="contained" color="inherit" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
