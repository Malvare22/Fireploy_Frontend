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
 * AlertDialog component - a customizable modal dialog that displays a title, body content,
 * and action buttons, with optional styling based on a type ("error", "success", "default").
 *
 * This component supports both static text and fully custom body content. It also handles
 * optional reloading behavior and button loading state.
 *
 * @component
 *
 * @param {string} title - The title displayed at the top of the dialog.
 * @param {React.ReactNode} [body] - Optional custom content to render in the dialog body. Overrides `textBody` if provided.
 * @param {string} [textBody] - Fallback plain text content shown in the dialog body if `body` is not provided.
 * @param {() => void} handleAccept - Callback triggered when the "Accept" button is clicked.
 * @param {() => void} [handleCancel] - Optional callback triggered when the "Cancel" button is clicked.
 * @param {boolean} open - Controls whether the dialog is visible or not.
 * @param {boolean} [isLoading=false] - If `true`, shows a loading state in the "Accept" button.
 * @param {"error" | "success" | "default"} [type="default"] - Determines the visual styling of the dialog content.
 * @param {boolean} [reload=false] - If `true`, triggers a full page reload when the "Accept" button is clicked.
 *
 * @returns {JSX.Element} A Material UI Dialog component with optional alert styling and customizable content.
 *
 * @example
 * ```tsx
 * <AlertDialog
 *   title="Error"
 *   textBody="An unexpected error occurred"
 *   handleAccept={() => console.log('Accepted')}
 *   handleCancel={() => console.log('Cancelled')}
 *   open={isDialogOpen}
 *   type="error"
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
