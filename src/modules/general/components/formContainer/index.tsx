import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Añadimos la prop sx
}
const FormContainer: React.FC<Props> = ({ children, sx }: Props) => {
  return (
    <Box
      sx={{
        padding: { md: 10, xs: 4 },
        backgroundColor: "backgroundX.primary",
        borderRadius: 10,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        margin: 6,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
