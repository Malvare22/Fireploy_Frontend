import React, { CSSProperties } from "react";
import {
  Box,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
  useTheme,
} from "@mui/material";

/**
 * Componente `CustomTextArea` basado en `TextareaAutosize` de Material-UI.
 * Proporciona un área de texto redimensionable con estilos personalizados y mensajes de error opcionales.
 * @component
 * @param {TextareaAutosizeProps} inputProps - Propiedades estándar del `TextareaAutosize`.
 * @param {string} [errorMessage] - Mensaje de error opcional a mostrar debajo del área de texto.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Referencia para el área de texto.
 * @returns {JSX.Element} Componente de área de texto personalizado.
 */
const CustomTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps & { errorMessage?: string }
>(({ errorMessage, ...inputProps }, ref) => {
  const theme = useTheme();

  const style = {
    fontFamily: theme.typography.title2?.fontFamily,
    fontSize: theme.typography.title2?.fontSize,
    fontWeight: theme.typography.title2?.fontWeight,
    width: "100%",
    resize: "vertical",
  } as CSSProperties;

  return (
    <>
      <TextareaAutosize
        {...inputProps}
        ref={ref}
        style={style}
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
