import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/prelogin";
import { ModeContext } from "@modules/general/context/modeContext";
import { Box, Stack, useTheme } from "@mui/material";
import { ReactNode, useContext } from "react";
import { Outlet } from "react-router-dom";

type LayoutListProps = {
    options: ReactNode,
    children: ReactNode
}
const LayoutList: React.FC<LayoutListProps> = ({options, children}) => {
  const theme = useTheme();

  const { mode } = useContext(ModeContext);
  return (
    <Stack direction={{md: 'row', xs: 'column'}} spacing={6}>
        <Box sx={{ width: 300, height: 400}}>{options}</Box>
        {children}
    </Stack>
  );
}

export default LayoutList;
