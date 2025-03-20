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
    <Stack direction={'row'} spacing={6}>
        <Box sx={{border: '1px solid black', width: 300, minHeight: 400}}>{options}</Box>
        {children}
    </Stack>
  );
}

export default LayoutList;
