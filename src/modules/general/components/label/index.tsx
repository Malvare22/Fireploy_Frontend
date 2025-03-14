import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Propiedades para el componente Label.
 */
export interface LabelProps extends BoxProps {
  /** Texto que se mostrará dentro del componente Label. */
  children: ReactNode;
  /** Ancho opcional del Label en píxeles. */
  width?: number;
}

/**
 * Componente funcional que representa una etiqueta (label) con un estilo personalizado.
 * 
 * @component
 * @param {LabelProps} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido de la etiqueta.
 * @param {number} [props.width=180] - Ancho opcional del contenedor de la etiqueta.
 * 
 * @returns {JSX.Element} Componente Label con un `Typography` dentro de un `Box`.
 */
const Label: React.FC<LabelProps> = (props) => {
  return (
    <Box {...props} width={props.width ? props.width : 180}>
      <Typography variant="titleBold">{props.children}</Typography>
    </Box>
  );
};

export default Label;
