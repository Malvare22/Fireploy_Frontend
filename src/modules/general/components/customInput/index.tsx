import React from "react";
import { Box, Input, InputProps, Typography } from "@mui/material";

/**
 * Componente de entrada personalizado que admite validación de errores y modo de solo lectura.
 *
 * @component
 * @param {InputProps} inputProps - Propiedades estándar del componente Input de Material UI.
 * @param {string} [errorMessage] - Mensaje de error a mostrar si hay una validación fallida.
 * @param {boolean} [editable=true] - Indica si el campo es editable o de solo lectura.
 * @param {any} [value] - Valor del input cuando está en modo no editable.
 * @param {React.Ref<HTMLInputElement>} ref - Referencia al elemento de entrada.
 * @returns {JSX.Element} Componente de entrada personalizado.
 */
const CustomInput = React.forwardRef<
  HTMLInputElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InputProps & { errorMessage?: string; editable?: boolean; value?: any }
>(({ errorMessage, editable, value, ...inputProps }, ref) => {
  return (
    <Box width={"100%"}>
      {editable !== undefined && !editable ? (
        <Typography variant="title">{value}</Typography>
      ) : (
        <>
          <Input {...inputProps} inputRef={ref} />
          {errorMessage && (
            <Box marginY={1}>
              <Typography variant="title2" color="error">
                {errorMessage}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
});

export default CustomInput;
