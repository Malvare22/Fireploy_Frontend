import React from "react";
import { Box, Input, InputProps, Typography } from "@mui/material";

const CustomInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { errorMessage?: string; editable?: boolean; value?: any }
>(({ errorMessage, editable, value, ...inputProps }, ref) => {
  return (
    <Box width={"100%"}>
      {editable != undefined && editable == false ? (
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
