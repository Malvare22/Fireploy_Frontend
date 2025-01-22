import {
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const CustomTextArea: React.FC<
  TextareaAutosizeProps & { errorMessage?: string }
> = ({ errorMessage, ...inputProps }) => {
  const theme = useTheme();
  return (
    <>
      <TextareaAutosize
        {...inputProps}
        style={{
          fontFamily: theme.typography.title2?.fontFamily,
          fontSize: theme.typography.title2?.fontSize,
          fontWeight: theme.typography.title2?.fontWeight,
          width: "100%",
        }}
        minRows={4}
      />
      {errorMessage && (
        <Typography variant="title" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default CustomTextArea;
