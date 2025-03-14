import * as React from "react";
import Box from "@mui/material/Box";
import { default as ModalBase, ModalProps } from "@mui/material/Modal";
import { Card, SxProps, Typography } from "@mui/material";

/**
 * Componente Modal reutilizable basado en Material UI.
 *
 * @param {ModalProps} props - Propiedades del modal.
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro del modal.
 * @param {boolean} props.open - Controla si el modal está abierto o cerrado.
 * @param {() => void} props.handleClose - Función que cierra el modal.
 * @param {string} [props.titulo] - Título opcional del modal.
 * @param {React.ReactNode} [props.iconoTitulo] - Ícono opcional para el título del modal.
 *
 * @returns {JSX.Element} Componente modal personalizado.
 */
const Modal: React.FC<
  ModalProps & {
    children: React.ReactNode;
    open: boolean;
    handleClose: () => void;
    titulo?: string;
    iconoTitulo?: React.ReactNode;
  }
> = ({ children, open, handleClose, titulo, iconoTitulo, ...props }) => {
  /**
   * Estilos base del modal.
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
   * Fusiona los estilos base con los estilos recibidos como props.
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
          {/* Encabezado del modal */}
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
          {/* Contenido del modal */}
          {children}
        </Box>
      </ModalBase>
    </div>
  );
};

export default Modal;
