import React from "react";
import { Input, InputProps, Typography } from "@mui/material";

const CustomInput: React.FC<InputProps & { errorMessage?: string }> = ({
  errorMessage,
  ...inputProps
}) => {
  return (
    <>
      <Input {...inputProps} />
      {errorMessage && (
        <Typography variant="title" color="error" marginY={2}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default CustomInput;