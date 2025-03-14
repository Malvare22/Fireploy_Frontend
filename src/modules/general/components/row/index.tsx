import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

/**
 * Componente `Row` que representa una fila flexible con soporte para 
 * disposición en columna en pantallas pequeñas y en fila en pantallas más grandes.
 * 
 * @param {BoxProps} props - Propiedades de `Box` de MUI.
 * @param {ReactNode} props.children - Elementos hijos a renderizar dentro del `Row`.
 * 
 * @returns {JSX.Element} Componente `Box` con estilos flexibles.
 */
const Row: React.FC<BoxProps & { children: ReactNode }> = (props) => {
  return (
    <Box
      {...props}
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, // Disposición flexible
        alignItems: { md: "center" }, // Centra los elementos en dispositivos medianos en adelante
        gap: { sm: 3, xs: 1 }, // Espaciado dinámico
        ...props.sx // Permite sobrescribir estilos desde las props
      }}
    >
      {props.children}
    </Box>
  );
};

export default Row;
