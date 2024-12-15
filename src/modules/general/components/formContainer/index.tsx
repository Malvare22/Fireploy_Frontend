import { Box, SxProps, Theme } from "@mui/material"
import React from "react"

interface Props{
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Añadimos la prop sx
}
const FormContainer: React.FC<Props> = ({children, sx}: Props) => {
  return (
    <Box sx={{
      padding: 10,
      backgroundColor: 'backgroundX.primary',
      borderRadius: 10,
      border: '1px solid black',
      ...sx
    }}>
      {children}
    </Box>
  )
}

export default FormContainer