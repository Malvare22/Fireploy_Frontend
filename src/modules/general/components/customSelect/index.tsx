import React from "react";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

// Definimos el tipo de propiedades para CustomSelect
type CustomSelectProps = SelectProps & {
  variantDelta: "primary" | "secondary";
  children: React.ReactNode;
  errorMessage?: string;
};

// Estilizamos el select con styled-components
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

// Usamos React.forwardRef para pasar la referencia correctamente
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
