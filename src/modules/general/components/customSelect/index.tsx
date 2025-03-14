import React from "react";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

/**
 * Propiedades personalizadas para el componente `CustomSelect`.
 * @typedef {SelectProps} CustomSelectProps
 * @property {"primary" | "secondary"} variantDelta - Define la variante de estilo del select.
 * @property {React.ReactNode} children - Elementos secundarios dentro del select.
 * @property {string} [errorMessage] - Mensaje de error opcional a mostrar debajo del select.
 */
type CustomSelectProps = SelectProps & {
  variantDelta: "primary" | "secondary";
  children: React.ReactNode;
  errorMessage?: string;
};

/**
 * Componente estilizado de `Select` utilizando Material-UI.
 * Aplica estilos personalizados según la variante `variantDelta`.
 */
const StyledSelect = styled(MuiSelect, {
  shouldForwardProp: (prop) => prop !== "variantDelta",
})<CustomSelectProps>(({ theme, variantDelta }) => ({
  fontSize:
    variantDelta === "primary"
      ? theme.typography?.h5?.fontSize
      : theme.typography?.body1?.fontSize,
  fontFamily:
    variantDelta === "primary"
      ? theme.typography?.h5?.fontFamily
      : theme.typography?.body1?.fontFamily,
  fontWeight:
    variantDelta === "primary"
      ? theme.typography?.h5?.fontWeight
      : theme.typography?.body1?.fontWeight,
  width: "100%",
}));

/**
 * Componente `CustomSelect` basado en `Select` de Material-UI con estilos personalizados y mensajes de error.
 * @component
 * @param {CustomSelectProps} props - Propiedades del componente.
 * @param {React.Ref<HTMLSelectElement>} ref - Referencia para el select.
 * @returns {JSX.Element} Componente de select personalizado.
 */
const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ variantDelta, children, errorMessage, ...props }, ref) => {
    return (
      <>
        <StyledSelect ref={ref} variantDelta={variantDelta} {...props}>
          {children}
        </StyledSelect>
        {errorMessage && (
          <Typography variant="title2" marginY={2}>
            {errorMessage}
          </Typography>
        )}
      </>
    );
  }
);

export default CustomSelect;
