import * as React from "react";
import Box from "@mui/material/Box";
import { default as ModalBase, ModalProps } from "@mui/material/Modal";
import { Card, SxProps, Typography } from "@mui/material";

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
    titulo?: string;
    iconoTitulo?: React.ReactNode;
  }
> = ({ children, open, handleClose, titulo, iconoTitulo, ...props }) => {
  // Definir estilos base, puedes personalizarlos según sea necesario
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    borderRadius: "1%",
    boxShadow: 24,
    overflowY: "auto",
    maxHeight: { xs: "80vh", md: "90vh" },
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
        <Box sx={styles}>
          {/* Encabezado */}
          {titulo && (
            <Card
              sx={{
                backgroundColor: "#607d8b",
                padding: 2,
                marginBottom: 1,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="h4Bold" color="white">
                {titulo}
              </Typography>
              <Box
                sx={{
                  color: "white",
                  fontSize: 48,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {iconoTitulo && iconoTitulo}
              </Box>
            </Card>
          )}
          {children}
        </Box>
      </ModalBase>
    </div>
  );
};

export default Modal;
