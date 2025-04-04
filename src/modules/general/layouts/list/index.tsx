import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

type LayoutListProps = {
    options: ReactNode,
    children: ReactNode
}
const LayoutList: React.FC<LayoutListProps> = ({options, children}) => {

  return (
    <Stack direction={{md: 'row', xs: 'column'}} spacing={6}>
        <Box sx={{ width: 300, height: 400}}>{options}</Box>
        {children}
    </Stack>
  );
}

export default LayoutList;
