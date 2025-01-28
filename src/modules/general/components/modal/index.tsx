import * as React from "react";
import Box from "@mui/material/Box";
import { default as ModalBase, ModalProps } from "@mui/material/Modal";
import { SxProps } from "@mui/material";

export const useModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
};

const Modal: React.FC<
  ModalProps & {
    children: React.ReactNode;
    open: boolean;
    handleClose: () => void;
  }
> = ({ children, open, handleClose, ...props }) => {
  // Definir estilos base, puedes personalizarlos según sea necesario
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY: 'auto',
    maxHeight: {xs: '80vh', md: '90vh'}
  } as SxProps;

  // Aquí estamos fusionando los estilos base con los estilos pasados como props
  const styles: SxProps = { ...style, ...props.sx } as SxProps;

  return (
    <div>
      <ModalBase
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>{children}</Box>
      </ModalBase>
    </div>
  );
};

export default Modal;
