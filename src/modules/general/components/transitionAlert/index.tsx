import { Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode, useState } from "react";
import Alert, { AlertProps } from "@mui/material/Alert";

interface Props extends AlertProps {
  children: ReactNode;
}

/**
 * TransitionAlert component – displays a dismissible alert message with a collapse transition.
 *
 * This component wraps Material UI's Alert with a smooth opening/closing animation
 * and an integrated close button. The alert remains visible until manually dismissed.
 *
 * Accepts all standard Alert props and custom content as children.
 *
 * @component
 *
 * @param {content to be displayed inside the alert box} children - The message or elements shown within the alert.
 * @param {additional props passed to the underlying Material UI Alert, such as severity or variant} ...props - Alert-specific properties.
 *
 * @returns {an animated alert message with dismiss functionality}
 *
 * @example
 * ```tsx
 * <TransitionAlert severity="success">
 *   Operation completed successfully!
 * </TransitionAlert>
 * ```
 */
export default function TransitionAlert({ children, ...props }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          {...props}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            mb: 2,
            "& .MuiAlert-icon": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
}
