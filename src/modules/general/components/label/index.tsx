import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

const Label: React.FC<
  BoxProps & TypographyProps & {
    children: ReactNode;
    width?: number;
  }
> = (props) => {
  return (
    <Box {...props} width={props.width ? props.width : 180}>
      <Typography variant="titleBold">{props.children}</Typography>
    </Box>
  );
};

export default Label;
