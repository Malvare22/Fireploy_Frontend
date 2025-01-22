import React from "react";
import {
  Box,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
  useTheme,
} from "@mui/material";

// Usamos forwardRef para pasar la referencia correctamente
const CustomTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps & { errorMessage?: string }
>(({ errorMessage, ...inputProps }, ref) => {
  const theme = useTheme();
  return (
    <>
      <TextareaAutosize
        {...inputProps}
        ref={ref} // Usamos `ref` aquí
        style={{
          fontFamily: theme.typography.title2?.fontFamily,
          fontSize: theme.typography.title2?.fontSize,
          fontWeight: theme.typography.title2?.fontWeight,
          width: "100%",
        }}
        minRows={4}
      />
      {errorMessage && (
        <Box marginY={1}>
          <Typography variant="title" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </>
  );
});

export default CustomTextArea;
