import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
const Row: React.FC<BoxProps & { children: ReactNode }> = (props) => {
  return (
    <Box
      {...props}
      sx={{ ...props.sx, display: "flex", flexDirection: {xs: 'column', md: 'row'}, alignItems: {sm: "center"}, gap: {sm: 3, xs: 1} }}
    >
      {props.children}
    </Box>
  );
};

export default Row;
