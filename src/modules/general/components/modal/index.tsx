import * as React from "react";
import Box from "@mui/material/Box";
import { default as ModalBase, ModalProps } from "@mui/material/Modal";
import { SxProps } from "@mui/material";

/**
 * Modal component – a reusable and customizable modal dialog based on Material-UI's Modal.
 * 
 * This component wraps the default MUI Modal and adds predefined styling for positioning, responsiveness,
 * and appearance. It supports custom children, dynamic styling via `sx`, and a close handler.
 * 
 * @component
 * 
 * @param {React.ReactNode} children - The content to render inside the modal.
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {() => void} handleClose - Function called when the modal is requested to be closed.
 * @param {...ModalProps} props - Standard props supported by Material-UI's Modal component.
 * 
 * @returns {JSX.Element} A styled modal component rendered at the center of the screen.
 * 
 * @example
 * ```tsx
 * <Modal open={isOpen} handleClose={() => setOpen(false)}>
 *   <Typography id="modal-modal-title">Example Modal</Typography>
 *   <Typography id="modal-modal-description">This is some modal content.</Typography>
 * </Modal>
 * ```
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
