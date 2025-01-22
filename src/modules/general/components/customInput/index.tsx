import React from "react";
import { Box, Input, InputProps, Typography } from "@mui/material";

const CustomInput: React.FC<InputProps & { errorMessage?: string }> = ({
  errorMessage,
  ...inputProps
}) => {
  return (
    <Box width={"100%"}>
      <Input {...inputProps} />
      {errorMessage && (
        <Box marginY={1}>
          <Typography variant="title2" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CustomInput;
