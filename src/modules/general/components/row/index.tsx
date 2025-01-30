import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
const Row: React.FC<BoxProps & { children: ReactNode }> = (props) => {
  return (
    <Box
      {...props}
      sx={{ display: "flex", flexDirection: {xs: 'column', md: 'row'}, alignItems: {md: "center"}, gap: {sm: 3, xs: 1}, ...props.sx }}
    >
      {props.children}
    </Box>
  );
};

export default Row;
