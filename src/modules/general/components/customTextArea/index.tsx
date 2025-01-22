import {
  TextareaAutosize,
  TextareaAutosizeProps,
  useTheme,
} from "@mui/material";
import React from "react";


const CustomTextArea: React.FC<{props?: TextareaAutosizeProps}> = ({props}) => {
  const theme = useTheme();
  return (
    <TextareaAutosize
      {...props}
      style={{
        fontFamily: theme.typography.title2?.fontFamily,
        fontSize: theme.typography.title2?.fontSize,
        fontWeight: theme.typography.title2?.fontWeight,
        width: '100%'
      }}
      minRows={4}
    />
  );
};

export default CustomTextArea;
