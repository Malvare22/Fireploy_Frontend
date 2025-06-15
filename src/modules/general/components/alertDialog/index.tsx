import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export type AlertDialogTypes = "error" | "success" | "default" | "warning";

interface Props {
  title: string;
  body?: React.ReactNode;
  textBody?: string;
  handleAccept: () => void;
  handleCancel?: () => void;
  open: boolean;
  isLoading?: boolean;
  type?: AlertDialogTypes;
  reload?: boolean;
}

/**
 * AlertDialog component – a modal dialog built with Material-UI for displaying alerts or confirmations.
 * 
 * It supports customizable titles, body content, alert types (error, success, warning, or default),
 * and action handlers for accepting or canceling. It can optionally reload the page upon acceptance.
 * 
 * @component
 * 
 * @param title The text displayed as the dialog's header.
 * @param body Optional React element to render as custom content inside the dialog.
 * @param textBody Optional plain text string shown as the dialog content when no custom body is provided.
 * @param handleAccept Function to execute when the "Aceptar" button is clicked.
 * @param handleCancel Optional function to execute when the "Cancelar" button is clicked.
 * @param open Boolean value that determines whether the dialog is visible.
 * @param isLoading Optional boolean indicating if the "Aceptar" button should show a loading state.
 * @param type Optional string indicating the alert type: "error", "success", "warning", or "default".
 * @param reload Optional boolean that, when true, reloads the page upon acceptance.
 * 
 * @returns A Material-UI Dialog element configured for alerting or confirming user actions.
 * 
 * @example
 * ```tsx
 * <AlertDialog
 *   title="Confirm Delete"
 *   textBody="Are you sure you want to delete this item?"
 *   open={true}
 *   type="warning"
 *   handleAccept={() => deleteItem()}
 *   handleCancel={() => setOpen(false)}
 * />
 * ```
 */
const AlertDialog: React.FC<Props> = ({
  title,
  handleAccept,
  open,
  body,
  handleCancel,
  textBody,
  isLoading,
  type = "default",
  reload = false,
}) => {
  const [locked, setLocked] = React.useState<boolean>(false);

  function TypeProvider({ children }: { children: React.ReactNode }) {
    switch (type) {
      case "default":
        return children;

      case "error":
        return <Alert severity="error">{children}</Alert>;

      case "success":
        return <Alert severity="success">{children}</Alert>;

      case "warning":
        return <Alert severity="warning">{children}</Alert>;
    }
  }

  function handleButton() {
    setLocked(true);
    handleAccept();
    if (reload) {
      navigate(0);
    }
  }

  React.useEffect(() => {
    setLocked(false);
  }, [textBody, body, type, open]);

  const navigate = useNavigate();

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
        <DialogContent>
          {body || (
            <TypeProvider>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {textBody || "Operación Realizada Correctamente"}
              </Typography>
            </TypeProvider>
          )}
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2}>
            {
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  loading={isLoading || locked}
                  onClick={handleButton}
                >
                  Aceptar
                </Button>
              </Box>
            }
            {handleCancel && (
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  color="inherit"
                  disabled={isLoading}
                  onClick={handleCancel}
                >
                  Cancelar
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
