import * as React from "react";
import Box from "@mui/material/Box";
import { default as ModalBase, ModalProps } from "@mui/material/Modal";
import { SxProps } from "@mui/material";

/**
 * Reusable Modal component based on Material UI.
 *
 * @param {ModalProps} props - Modal properties.
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal.
 * @param {boolean} props.open - Controls whether the modal is open or closed.
 * @param {() => void} props.handleClose - Function that closes the modal.
 * @param {string} [props.titulo] - Optional title for the modal.
 * @param {React.ReactNode} [props.iconoTitulo] - Optional icon for the modal title.
 *
 * @returns {JSX.Element} Custom modal component.
 */
const Modal: React.FC<
  ModalProps & {
    children: React.ReactNode;
    open: boolean;
    handleClose: () => void;
  }
> = ({ children, open, handleClose, ...props }) => {
  
  /**
   * Base styles for the modal.
   */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "70%" },
    bgcolor: "background.paper",
    borderRadius: "1%",
    boxShadow: 24,
    overflowY: "auto",
    maxHeight: { xs: "80vh", md: "90vh" },
  } as SxProps;

  /**
   * Merges the base styles with any additional styles received as props.
   */
  const styles: SxProps = { ...style, ...props.sx } as SxProps;

  return (
    <div>
      <ModalBase
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          {children}
        </Box>
      </ModalBase>
    </div>
  );
};

export default Modal;
