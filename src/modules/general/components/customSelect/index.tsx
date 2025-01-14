import React from "react";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

type CustomSelectProps = SelectProps & {
  variantDelta: "primary" | "secondary";
  children: React.ReactNode;
};

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
  width: '100%'
}));

const CustomSelect: React.FC<CustomSelectProps> = ({
  variantDelta,
  children,
  ...props
}) => {
  return (
    <StyledSelect variantDelta={variantDelta} {...props}>
      {children}
    </StyledSelect>
  );
};

export default CustomSelect;
